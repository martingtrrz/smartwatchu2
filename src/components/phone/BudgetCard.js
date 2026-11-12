import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconRenderer from '../common/IconRenderer';

export default function BudgetCard({
  dailyBudget,
  totalSpentToday,
  remainingDailyBudget,
  budgetPercentage,
  onEditBudget,
}) {
  const isOver = remainingDailyBudget < 0;
  const progressClamped = Math.min(Math.max(budgetPercentage, 0), 100);

  let barColor = '#22c55e'; // Emerald
  let barGlow = 'rgba(34, 197, 94, 0.3)';
  if (budgetPercentage >= 100 || isOver) {
    barColor = '#ef4444';
    barGlow = 'rgba(239, 68, 68, 0.3)';
  } else if (budgetPercentage >= 65) {
    barColor = '#eab308';
    barGlow = 'rgba(234, 179, 8, 0.3)';
  }

  return (
    <View style={styles.card}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <View style={styles.badgeRow}>
          <View style={[styles.statusDot, { backgroundColor: barColor, shadowColor: barColor }]} />
          <Text style={styles.subtitle}>PRESUPUESTO DIARIO</Text>
        </View>

        <TouchableOpacity style={styles.editBtn} onPress={onEditBudget} activeOpacity={0.7}>
          <IconRenderer name="edit" size={11} color="#a1a1aa" />
          <Text style={styles.editBtnText}>Ajustar</Text>
        </TouchableOpacity>
      </View>

      {/* Main Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balancePrefix}>$</Text>
        <Text style={[styles.balanceNumber, isOver && styles.balanceOver]}>
          {Math.abs(remainingDailyBudget).toFixed(2)}
        </Text>
        <Text style={styles.currencyTag}>MXN</Text>
      </View>

      <Text style={styles.statusNote}>
        {isOver
          ? `Límite rebasado por $${Math.abs(remainingDailyBudget).toFixed(2)}`
          : `Disponible: ${(100 - budgetPercentage).toFixed(0)}% del límite asignado`}
      </Text>

      {/* Modern Gradient Progress Track */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${progressClamped}%`, backgroundColor: barColor, shadowColor: barGlow },
          ]}
        />
      </View>

      {/* Footer Details */}
      <View style={styles.footerRow}>
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>Gastado hoy</Text>
          <Text style={styles.statValue}>${totalSpentToday.toFixed(2)}</Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statCol}>
          <Text style={styles.statLabel}>Límite diario</Text>
          <Text style={styles.statValue}>${dailyBudget.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#121215',
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#24242a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  subtitle: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1c1c22',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2e2e36',
  },
  editBtnText: {
    color: '#d4d4d8',
    fontSize: 11,
    fontWeight: '600',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 4,
  },
  balancePrefix: {
    color: '#71717a',
    fontSize: 20,
    fontWeight: '700',
    marginRight: 2,
  },
  balanceNumber: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
  },
  balanceOver: {
    color: '#ef4444',
  },
  currencyTag: {
    fontSize: 12,
    color: '#71717a',
    fontWeight: '600',
    marginLeft: 5,
  },
  statusNote: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 12,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#1c1c22',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#1c1c22',
  },
  statCol: {
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#24242a',
    marginHorizontal: 12,
  },
  statLabel: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '500',
  },
  statValue: {
    color: '#f4f4f5',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 1,
  },
});
