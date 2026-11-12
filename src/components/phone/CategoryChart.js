import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconRenderer from '../common/IconRenderer';

const CATEGORY_META = {
  Alimentos: { icon: 'utensils', color: '#10b981' },
  Transporte: { icon: 'bus', color: '#0ea5e9' },
  Tienda: { icon: 'shopping-bag', color: '#f59e0b' },
  Varios: { icon: 'zap', color: '#8b5cf6' },
  Ocio: { icon: 'coffee', color: '#ec4899' },
  Servicios: { icon: 'wallet', color: '#6366f1' },
};

export default function CategoryChart({ categoryTotals }) {
  const totalExpenses = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  const categories = Object.keys(CATEGORY_META).map((name) => {
    const amount = categoryTotals[name] || 0;
    const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
    return {
      name,
      amount,
      percentage,
      ...CATEGORY_META[name],
    };
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>DISTRIBUCIÓN POR CATEGORÍA</Text>
        <Text style={styles.totalBadge}>Total: ${totalExpenses.toFixed(2)}</Text>
      </View>

      <View style={styles.categoryList}>
        {categories.map((cat) => (
          <View key={cat.name} style={styles.categoryItem}>
            <View style={styles.categoryInfo}>
              <View style={[styles.iconBox, { backgroundColor: cat.color }]}>
                <IconRenderer name={cat.icon} size={11} color="#ffffff" strokeWidth={2.4} />
              </View>
              <Text style={styles.catName}>{cat.name}</Text>
              <Text style={styles.catAmount}>${cat.amount.toFixed(2)}</Text>
              <Text style={styles.catPercent}>{cat.percentage.toFixed(0)}%</Text>
            </View>

            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { width: `${cat.percentage}%`, backgroundColor: cat.color },
                ]}
              />
            </View>
          </View>
        ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  totalBadge: {
    color: '#d4d4d8',
    fontSize: 11,
    fontWeight: '600',
  },
  categoryList: {
    gap: 12,
  },
  categoryItem: {
    gap: 6,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  catName: {
    color: '#e4e4e7',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  catAmount: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 8,
  },
  catPercent: {
    color: '#71717a',
    fontSize: 11,
    fontWeight: '600',
    width: 32,
    textAlign: 'right',
  },
  barTrack: {
    width: '100%',
    height: 4,
    backgroundColor: '#1c1c22',
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
});
