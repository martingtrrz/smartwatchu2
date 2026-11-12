import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WatchDial({ budgetPercentage, remaining, dailyBudget, totalSpent }) {
  const clampedProgress = Math.min(Math.max(budgetPercentage, 0), 100);

  let statusColor = '#22c55e'; // Emerald
  let statusText = 'DISPONIBLE';
  const isOverBudget = remaining < 0;

  if (budgetPercentage >= 100 || isOverBudget) {
    statusColor = '#ef4444';
    statusText = 'EXCEDIDO';
  } else if (budgetPercentage >= 65) {
    statusColor = '#eab308';
    statusText = 'PRECAUCIÓN';
  }

  return (
    <View style={styles.card}>
      {/* Status & percentage */}
      <View style={styles.headerRow}>
        <View style={styles.statusGroup}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
        </View>
        <Text style={styles.percentText}>{clampedProgress.toFixed(0)}%</Text>
      </View>

      {/* Glanceable remaining balance */}
      <View style={styles.amountRow}>
        <Text style={[styles.amountText, isOverBudget && styles.overBudgetText]}>
          ${Math.abs(remaining).toFixed(0)}
        </Text>
        <Text style={styles.currencyText}>MXN</Text>
      </View>

      {/* Progress track */}
      <View style={styles.meterTrack}>
        <View
          style={[
            styles.meterFill,
            { width: `${clampedProgress}%`, backgroundColor: statusColor },
          ]}
        />
      </View>

      {/* Compact stats */}
      <View style={styles.footerRow}>
        <Text style={styles.statLabel}>
          Gasto: <Text style={styles.statBold}>${totalSpent.toFixed(0)}</Text>
        </Text>
        <Text style={styles.statLabel}>
          Límite: <Text style={styles.statBold}>${dailyBudget.toFixed(0)}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#121214',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#27272a',
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  statusGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  percentText: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '600',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginVertical: 2,
  },
  amountText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  currencyText: {
    fontSize: 13,
    color: '#71717a',
    fontWeight: '600',
  },
  overBudgetText: {
    color: '#ef4444',
  },
  meterTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#27272a',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 6,
    marginBottom: 6,
  },
  meterFill: {
    height: '100%',
    borderRadius: 3,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statLabel: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '500',
  },
  statBold: {
    color: '#d4d4d8',
    fontWeight: '600',
  },
});
