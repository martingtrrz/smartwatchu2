import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { INITIAL_PRESETS, INITIAL_TRANSACTIONS, INITIAL_SETTINGS } from '../data/initialData';

const AppContext = createContext();

const STORAGE_KEY = 'spendpulse_app_state_v1';

export const AppProvider = ({ children }) => {
  // Initialize from localStorage if available
  const [transactions, setTransactions] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = window.localStorage.getItem(`${STORAGE_KEY}_tx`);
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_TRANSACTIONS;
  });

  const [presets, setPresets] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = window.localStorage.getItem(`${STORAGE_KEY}_presets`);
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_PRESETS;
  });

  const [dailyBudget, setDailyBudget] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = window.localStorage.getItem(`${STORAGE_KEY}_daily`);
        if (saved) return parseFloat(saved);
      } catch (e) {}
    }
    return INITIAL_SETTINGS.dailyBudget;
  });

  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = window.localStorage.getItem(`${STORAGE_KEY}_monthly`);
        if (saved) return parseFloat(saved);
      } catch (e) {}
    }
    return INITIAL_SETTINGS.monthlyBudget;
  });

  const [isConnected, setIsConnected] = useState(true);
  const [offlineQueue, setOfflineQueue] = useState([]);
  const [viewMode, setViewMode] = useState('dual');
  const [toastMessage, setToastMessage] = useState(null);
  const [lastWatchActionTime, setLastWatchActionTime] = useState(null);

  const channelRef = useRef(null);

  // BroadcastChannel for cross-tab realtime sync
  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('spendpulse_channel');
      channelRef.current = channel;

      channel.onmessage = (event) => {
        const { type, payload } = event.data || {};
        if (type === 'STATE_UPDATE') {
          if (payload.transactions) setTransactions(payload.transactions);
          if (payload.presets) setPresets(payload.presets);
          if (payload.dailyBudget) setDailyBudget(payload.dailyBudget);
          if (payload.monthlyBudget) setMonthlyBudget(payload.monthlyBudget);
        }
      };

      return () => {
        channel.close();
      };
    }
  }, []);

  const broadcastUpdate = (updates) => {
    if (channelRef.current) {
      try {
        channelRef.current.postMessage({
          type: 'STATE_UPDATE',
          payload: updates,
        });
      } catch (e) {}
    }
  };

  // Persist to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(`${STORAGE_KEY}_tx`, JSON.stringify(transactions));
      } catch (e) {}
    }
  }, [transactions]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(`${STORAGE_KEY}_presets`, JSON.stringify(presets));
      } catch (e) {}
    }
  }, [presets]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(`${STORAGE_KEY}_daily`, String(dailyBudget));
        window.localStorage.setItem(`${STORAGE_KEY}_monthly`, String(monthlyBudget));
      } catch (e) {}
    }
  }, [dailyBudget, monthlyBudget]);

  const triggerHaptic = (pattern = [25, 20]) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add an expense
  const addExpense = ({ title, amount, category, source = 'watch' }) => {
    const numAmount = parseFloat(amount) || 0;
    if (numAmount <= 0) return;

    const newTx = {
      id: 'tx-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      title: title ? title.trim() : 'Gasto general',
      amount: Math.round(numAmount * 100) / 100,
      category: category || 'Varios',
      timestamp: new Date().toISOString(),
      source,
    };

    triggerHaptic([30, 20]);

    if (source === 'watch') {
      setLastWatchActionTime(Date.now());
      if (!isConnected) {
        setOfflineQueue((prev) => [newTx, ...prev]);
        showToast(`Smartwatch: $${newTx.amount.toFixed(2)} guardado en cola`);
        return;
      }
      showToast(`Smartwatch: $${newTx.amount.toFixed(2)} registrado`);
    } else {
      showToast(`Smartphone: $${newTx.amount.toFixed(2)} registrado`);
    }

    setTransactions((prev) => {
      const updated = [newTx, ...prev];
      broadcastUpdate({ transactions: updated });
      return updated;
    });
  };

  // Undo last transaction
  const undoLastExpense = () => {
    if (offlineQueue.length > 0) {
      const removed = offlineQueue[0];
      setOfflineQueue((prev) => prev.slice(1));
      showToast(`Gasto de $${removed.amount.toFixed(2)} cancelado`);
      triggerHaptic([20, 20]);
      return;
    }

    if (transactions.length > 0) {
      const removed = transactions[0];
      setTransactions((prev) => {
        const updated = prev.slice(1);
        broadcastUpdate({ transactions: updated });
        return updated;
      });
      showToast(`Movimiento de $${removed.amount.toFixed(2)} deshecho`);
      triggerHaptic([20, 20]);
    }
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions((prev) => {
      const updated = prev.filter((tx) => tx.id !== id);
      broadcastUpdate({ transactions: updated });
      return updated;
    });
    showToast('Transacción eliminada');
  };

  // Toggle connection
  const toggleConnection = () => {
    setIsConnected((prev) => {
      const nextState = !prev;
      if (nextState) {
        if (offlineQueue.length > 0) {
          setTransactions((t) => {
            const updated = [...offlineQueue, ...t];
            broadcastUpdate({ transactions: updated });
            return updated;
          });
          showToast(`Sincronizados ${offlineQueue.length} registro(s)`);
          setOfflineQueue([]);
        } else {
          showToast('Bluetooth activo');
        }
      } else {
        showToast('Bluetooth en pausa');
      }
      triggerHaptic([40, 20]);
      return nextState;
    });
  };

  // Update preset from phone
  const updatePreset = (id, updatedFields) => {
    setPresets((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
      broadcastUpdate({ presets: updated });
      return updated;
    });
    showToast('Acceso directo actualizado');
  };

  // Update budgets
  const updateBudgets = (daily, monthly) => {
    setDailyBudget(daily);
    setMonthlyBudget(monthly);
    broadcastUpdate({ dailyBudget: daily, monthlyBudget: monthly });
    showToast('Presupuesto actualizado');
  };

  // Reset demo
  const resetDemoData = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem(`${STORAGE_KEY}_tx`);
        window.localStorage.removeItem(`${STORAGE_KEY}_presets`);
        window.localStorage.removeItem(`${STORAGE_KEY}_daily`);
        window.localStorage.removeItem(`${STORAGE_KEY}_monthly`);
      } catch (e) {}
    }
    setTransactions(INITIAL_TRANSACTIONS);
    setPresets(INITIAL_PRESETS);
    setDailyBudget(INITIAL_SETTINGS.dailyBudget);
    setMonthlyBudget(INITIAL_SETTINGS.monthlyBudget);
    setIsConnected(true);
    setOfflineQueue([]);
    broadcastUpdate({
      transactions: INITIAL_TRANSACTIONS,
      presets: INITIAL_PRESETS,
      dailyBudget: INITIAL_SETTINGS.dailyBudget,
      monthlyBudget: INITIAL_SETTINGS.monthlyBudget,
    });
    showToast('Datos reiniciados');
  };

  const todayTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.timestamp).toDateString();
    const todayDate = new Date().toDateString();
    return txDate === todayDate;
  });

  const totalSpentToday = todayTransactions.reduce((acc, tx) => acc + tx.amount, 0);
  const remainingDailyBudget = dailyBudget - totalSpentToday;
  const budgetPercentage = dailyBudget > 0 ? (totalSpentToday / dailyBudget) * 100 : 0;

  const categoryTotals = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  return (
    <AppContext.Provider
      value={{
        transactions,
        presets,
        dailyBudget,
        monthlyBudget,
        isConnected,
        offlineQueue,
        viewMode,
        toastMessage,
        lastWatchActionTime,
        totalSpentToday,
        remainingDailyBudget,
        budgetPercentage,
        categoryTotals,
        setViewMode,
        addExpense,
        undoLastExpense,
        deleteTransaction,
        toggleConnection,
        updatePreset,
        setDailyBudget: (d) => updateBudgets(d, monthlyBudget),
        setMonthlyBudget: (m) => updateBudgets(dailyBudget, m),
        resetDemoData,
        triggerHaptic,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
