import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../../context/AppContext';
import CategoryListView from './CategoryListView';
import CrownAmountView from './CrownAmountView';
import IconRenderer from '../common/IconRenderer';

export default function WatchScreen({ crownDelta = 0 }) {
  const {
    remainingDailyBudget,
    isConnected,
    addExpense,
    triggerHaptic,
  } = useApp();

  const [currentTime, setCurrentTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectCategory = (cat) => {
    triggerHaptic([20]);
    setSelectedCategory(cat);
  };

  const handleConfirmAmount = (amount) => {
    if (selectedCategory) {
      addExpense({
        title: selectedCategory.name,
        amount: amount,
        category: selectedCategory.name,
        source: 'watch',
      });
      setSelectedCategory(null);
    }
  };

  const handleCancelAmount = () => {
    triggerHaptic([15]);
    setSelectedCategory(null);
  };

  return (
    <View style={styles.container}>
      {/* Top Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.timeText}>{currentTime || '12:00'}</Text>
        <View style={styles.statusIcons}>
          <IconRenderer
            name={isConnected ? 'bluetooth' : 'bluetooth-off'}
            size={13}
            color={isConnected ? '#22c55e' : '#eab308'}
            strokeWidth={2.4}
          />
          <Text style={styles.batteryText}>92%</Text>
        </View>
      </View>

      {/* Screen Body: Categories or Crown Amount Mode */}
      <View style={styles.contentArea}>
        {selectedCategory ? (
          <CrownAmountView
            category={selectedCategory}
            onConfirm={handleConfirmAmount}
            onCancel={handleCancelAmount}
            crownDelta={crownDelta}
          />
        ) : (
          <CategoryListView
            onSelectCategory={handleSelectCategory}
            remainingDailyBudget={remainingDailyBudget}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 284,
    height: 356,
    borderRadius: 36,
    backgroundColor: '#000000',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  statusBar: {
    paddingTop: 10,
    paddingHorizontal: 14,
    paddingBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  timeText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  batteryText: {
    color: '#71717a',
    fontSize: 11,
    fontWeight: '600',
  },
  contentArea: {
    flex: 1,
    width: '100%',
  },
});
