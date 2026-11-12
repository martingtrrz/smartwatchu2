import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import IconRenderer from '../common/IconRenderer';
import { WATCH_CATEGORIES } from '../../data/initialData';

export default function CategoryListView({ onSelectCategory, remainingDailyBudget }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Subtle daily balance glance chip */}
      <View style={styles.glanceRow}>
        <Text style={styles.glanceLabel}>Disponible hoy</Text>
        <Text
          style={[
            styles.glanceAmount,
            remainingDailyBudget < 0 && styles.glanceOverbudget,
          ]}
        >
          ${remainingDailyBudget.toFixed(0)} MXN
        </Text>
      </View>

      {/* Category Cards */}
      <View style={styles.categoryList}>
        {WATCH_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.card}
            onPress={() => onSelectCategory(cat)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconBox, { backgroundColor: cat.color }]}>
              <IconRenderer name={cat.icon} size={15} color="#ffffff" strokeWidth={2.4} />
            </View>
            <Text style={styles.catName} numberOfLines={1}>
              {cat.name}
            </Text>
            <IconRenderer name="arrowRight" size={12} color="#52525b" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 20,
    width: '100%',
  },
  glanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#121214',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27272a',
    marginBottom: 8,
  },
  glanceLabel: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '600',
  },
  glanceAmount: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: '700',
  },
  glanceOverbudget: {
    color: '#ef4444',
  },
  categoryList: {
    gap: 6,
    width: '100%',
  },
  card: {
    width: '100%',
    height: 46,
    backgroundColor: '#121214',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  catName: {
    color: '#f4f4f5',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
});

