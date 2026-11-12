import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import IconRenderer from '../common/IconRenderer';

const CATEGORIES = [
  { name: 'Alimentos', icon: 'utensils', color: '#10b981' },
  { name: 'Transporte', icon: 'bus', color: '#0ea5e9' },
  { name: 'Tienda', icon: 'shopping-bag', color: '#f59e0b' },
  { name: 'Varios', icon: 'zap', color: '#8b5cf6' },
];

export default function AddExpenseModal({ visible, onClose, onAddExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Alimentos');

  if (!visible) return null;

  const handleSave = () => {
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) return;

    onAddExpense({
      title: title.trim() || `Gasto ${category}`,
      amount: parsedAmount,
      category,
      source: 'phone',
    });

    setTitle('');
    setAmount('');
    setCategory('Alimentos');
    onClose();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Nuevo gasto</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
            <IconRenderer name="close" size={14} color="#a1a1aa" />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Concepto</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Ej. Supermercado, Farmacia, Gasolina"
            placeholderTextColor="#52525b"
          />

          <Text style={styles.label}>Monto ($ MXN)</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor="#52525b"
            autoFocus
          />

          <Text style={styles.label}>Categoría</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => {
              const active = category === cat.name;
              return (
                <TouchableOpacity
                  key={cat.name}
                  style={[styles.categoryTile, active && styles.activeTile]}
                  onPress={() => setCategory(cat.name)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconWrapper, { backgroundColor: cat.color }]}>
                    <IconRenderer name={cat.icon} size={12} color="#ffffff" strokeWidth={2.2} />
                  </View>
                  <Text style={[styles.categoryText, active && styles.activeCategoryText]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSave} activeOpacity={0.8}>
            <IconRenderer name="check" size={14} color="#09090b" strokeWidth={2.5} />
            <Text style={styles.submitText}>Registrar</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  container: {
    backgroundColor: '#121214',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    color: '#f4f4f5',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#1c1c1f',
  },
  form: {
    gap: 8,
  },
  label: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  input: {
    backgroundColor: '#18181b',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },
  categoryTile: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#18181b',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  activeTile: {
    backgroundColor: '#27272a',
    borderColor: '#52525b',
  },
  iconWrapper: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#18181b',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  cancelText: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '600',
  },
  submitBtn: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  submitText: {
    color: '#09090b',
    fontSize: 12,
    fontWeight: '700',
  },
});

