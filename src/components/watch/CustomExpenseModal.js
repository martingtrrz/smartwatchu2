import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconRenderer from '../common/IconRenderer';

const QUICK_AMOUNTS = [10, 20, 50, 100, 150];

const CATEGORIES = [
  { name: 'Alimentos', icon: 'utensils' },
  { name: 'Transporte', icon: 'bus' },
  { name: 'Tienda', icon: 'shopping-bag' },
  { name: 'Varios', icon: 'zap' },
];

export default function CustomExpenseModal({ visible, onClose, onConfirm }) {
  const [amount, setAmount] = useState(50);
  const [category, setCategory] = useState('Varios');

  if (!visible) return null;

  const handleConfirm = () => {
    onConfirm({
      title: `Gasto ${category}`,
      amount: amount,
      category: category,
      source: 'watch',
    });
    onClose();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.dialog}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nuevo importe</Text>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
            <IconRenderer name="close" size={14} color="#a1a1aa" />
          </TouchableOpacity>
        </View>

        {/* Big Amount */}
        <Text style={styles.amountText}>${amount}</Text>

        {/* Chunky Quick Amount Chips */}
        <View style={styles.chipRow}>
          {QUICK_AMOUNTS.map((amt) => {
            const active = amount === amt;
            return (
              <TouchableOpacity
                key={amt}
                style={[styles.chip, active && styles.activeChip]}
                onPress={() => setAmount(amt)}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, active && styles.activeChipText]}>
                  ${amt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Category icons with large touch targets */}
        <View style={styles.categoryRow}>
          {CATEGORIES.map((cat) => {
            const active = category === cat.name;
            return (
              <TouchableOpacity
                key={cat.name}
                style={[styles.catBtn, active && styles.activeCatBtn]}
                onPress={() => setCategory(cat.name)}
                activeOpacity={0.7}
              >
                <IconRenderer
                  name={cat.icon}
                  size={16}
                  color={active ? '#ffffff' : '#71717a'}
                  strokeWidth={2.2}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Full-width Confirm CTA */}
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} activeOpacity={0.8}>
          <IconRenderer name="check" size={15} color="#09090b" strokeWidth={2.6} />
          <Text style={styles.confirmText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    zIndex: 100,
  },
  dialog: {
    width: '100%',
    backgroundColor: '#121214',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#27272a',
    alignItems: 'center',
    padding: 12,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '600',
  },
  closeBtn: {
    padding: 4,
  },
  amountText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
    marginVertical: 4,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 10,
  },
  chip: {
    minWidth: 44,
    height: 32,
    backgroundColor: '#18181b',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  activeChip: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  chipText: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '700',
  },
  activeChipText: {
    color: '#09090b',
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  catBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCatBtn: {
    backgroundColor: '#27272a',
    borderColor: '#52525b',
  },
  confirmBtn: {
    width: '100%',
    height: 42,
    backgroundColor: '#22c55e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 12,
  },
  confirmText: {
    color: '#09090b',
    fontSize: 13,
    fontWeight: '700',
  },
});
