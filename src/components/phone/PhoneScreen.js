import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useApp } from '../../context/AppContext';
import BudgetCard from './BudgetCard';
import CategoryChart from './CategoryChart';
import TransactionList from './TransactionList';
import WatchConfigModal from './WatchConfigModal';
import EditBudgetModal from './EditBudgetModal';
import AddExpenseModal from './AddExpenseModal';
import IconRenderer from '../common/IconRenderer';

export default function PhoneScreen() {
  const {
    transactions,
    presets,
    dailyBudget,
    monthlyBudget,
    totalSpentToday,
    remainingDailyBudget,
    budgetPercentage,
    categoryTotals,
    isConnected,
    toggleConnection,
    deleteTransaction,
    updatePreset,
    setDailyBudget,
    setMonthlyBudget,
    addExpense,
  } = useApp();

  const [watchConfigVisible, setWatchConfigVisible] = useState(false);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);
  const [addExpenseVisible, setAddExpenseVisible] = useState(false);

  const handleSaveBudget = (newDaily, newMonthly) => {
    setDailyBudget(newDaily);
    setMonthlyBudget(newMonthly);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>SpendPulse</Text>

        {/* Bluetooth status pill */}
        <TouchableOpacity
          style={[styles.syncBadge, isConnected ? styles.syncActive : styles.syncInactive]}
          onPress={toggleConnection}
          activeOpacity={0.7}
        >
          <IconRenderer
            name={isConnected ? 'bluetooth' : 'bluetooth-off'}
            size={11}
            color={isConnected ? '#22c55e' : '#eab308'}
            strokeWidth={2.2}
          />
          <Text style={styles.syncText}>
            {isConnected ? 'Conectado' : 'Sin conexión'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setWatchConfigVisible(true)}
          activeOpacity={0.7}
        >
          <IconRenderer name="sliders" size={13} color="#a1a1aa" />
          <Text style={styles.actionText}>Configurar reloj</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.addPhoneBtn]}
          onPress={() => setAddExpenseVisible(true)}
          activeOpacity={0.7}
        >
          <IconRenderer name="plus" size={13} color="#ffffff" strokeWidth={2.4} />
          <Text style={[styles.actionText, { color: '#ffffff' }]}>Añadir gasto</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <BudgetCard
          dailyBudget={dailyBudget}
          totalSpentToday={totalSpentToday}
          remainingDailyBudget={remainingDailyBudget}
          budgetPercentage={budgetPercentage}
          onEditBudget={() => setBudgetModalVisible(true)}
        />

        <CategoryChart categoryTotals={categoryTotals} />

        <TransactionList
          transactions={transactions}
          onDeleteTransaction={deleteTransaction}
        />
      </ScrollView>

      {/* In-Frame Modals */}
      <WatchConfigModal
        visible={watchConfigVisible}
        onClose={() => setWatchConfigVisible(false)}
        presets={presets}
        onUpdatePreset={updatePreset}
      />

      <EditBudgetModal
        visible={budgetModalVisible}
        onClose={() => setBudgetModalVisible(false)}
        dailyBudget={dailyBudget}
        monthlyBudget={monthlyBudget}
        onSave={handleSaveBudget}
      />

      <AddExpenseModal
        visible={addExpenseVisible}
        onClose={() => setAddExpenseVisible(false)}
        onAddExpense={addExpense}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#18181c',
  },
  appName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
  },
  syncActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: 'rgba(34, 197, 94, 0.25)',
  },
  syncInactive: {
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderColor: 'rgba(234, 179, 8, 0.25)',
  },
  syncText: {
    color: '#e4e4e7',
    fontSize: 10,
    fontWeight: '600',
  },
  actionBar: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#121215',
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#24242a',
  },
  addPhoneBtn: {
    backgroundColor: '#1c1c22',
    borderColor: '#32323c',
  },
  actionText: {
    color: '#d4d4d8',
    fontSize: 11,
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
