import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import IconRenderer from '../common/IconRenderer';

export default function EditBudgetModal({
  visible,
  onClose,
  dailyBudget,
  monthlyBudget,
  onSave,
}) {
  const [daily, setDaily] = useState(String(dailyBudget));
  const [monthly, setMonthly] = useState(String(monthlyBudget));

  if (!visible) return null;

  const handleSave = () => {
    onSave(parseFloat(daily) || 200, parseFloat(monthly) || 4500);
    onClose();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Límites de presupuesto</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
            <IconRenderer name="close" size={14} color="#a1a1aa" />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Presupuesto diario ($ MXN)</Text>
          <TextInput
            style={styles.input}
            value={daily}
            onChangeText={setDaily}
            keyboardType="numeric"
            placeholder="200"
            placeholderTextColor="#52525b"
          />

          <Text style={styles.label}>Presupuesto mensual ($ MXN)</Text>
          <TextInput
            style={styles.input}
            value={monthly}
            onChangeText={setMonthly}
            keyboardType="numeric"
            placeholder="4500"
            placeholderTextColor="#52525b"
          />
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
            <Text style={styles.saveText}>Guardar</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    zIndex: 100,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#121214',
    borderRadius: 16,
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
    color: '#ffffff',
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
    gap: 6,
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
    fontSize: 14,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 18,
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
  saveBtn: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveText: {
    color: '#09090b',
    fontSize: 12,
    fontWeight: '600',
  },
});
