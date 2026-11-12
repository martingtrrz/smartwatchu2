import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import IconRenderer from '../common/IconRenderer';

const CATEGORIES = ['Alimentos', 'Transporte', 'Tienda', 'Varios'];
const COLOR_OPTIONS = ['#10b981', '#6366f1', '#0ea5e9', '#f59e0b', '#8b5cf6', '#64748b'];

export default function WatchConfigModal({ visible, onClose, presets, onUpdatePreset }) {
  const [selectedPreset, setSelectedPreset] = useState(presets[0]);
  const [title, setTitle] = useState(presets[0]?.title || '');
  const [amount, setAmount] = useState(String(presets[0]?.amount || ''));
  const [category, setCategory] = useState(presets[0]?.category || 'Alimentos');
  const [color, setColor] = useState(presets[0]?.color || '#10b981');

  if (!visible) return null;

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setTitle(preset.title);
    setAmount(String(preset.amount));
    setCategory(preset.category);
    setColor(preset.color);
  };

  const handleSave = () => {
    if (selectedPreset) {
      onUpdatePreset(selectedPreset.id, {
        title: title.trim() || selectedPreset.title,
        amount: parseFloat(amount) || selectedPreset.amount,
        category,
        color,
      });
      onClose();
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Configurar accesos del reloj</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
            <IconRenderer name="close" size={14} color="#a1a1aa" />
          </TouchableOpacity>
        </View>

        {/* Preset selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.presetChipScroll}
        >
          {presets.map((preset) => (
            <TouchableOpacity
              key={preset.id}
              style={[
                styles.presetChip,
                selectedPreset?.id === preset.id && styles.activePresetChip,
              ]}
              onPress={() => handleSelectPreset(preset)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.presetChipText,
                  selectedPreset?.id === preset.id && styles.activePresetChipText,
                ]}
              >
                {preset.title} (${preset.amount})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Form fields */}
        <View style={styles.form}>
          <Text style={styles.fieldLabel}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Nombre del acceso"
            placeholderTextColor="#52525b"
          />

          <Text style={styles.fieldLabel}>Monto ($ MXN)</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="#52525b"
          />

          <Text style={styles.fieldLabel}>Categoría</Text>
          <View style={styles.categoryRow}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.catOption,
                  category === cat && styles.activeCatOption,
                ]}
                onPress={() => setCategory(cat)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.catOptionText,
                    category === cat && styles.activeCatOptionText,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.fieldLabel}>Color</Text>
          <View style={styles.colorRow}>
            {COLOR_OPTIONS.map((c) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.colorCircle,
                  { backgroundColor: c },
                  color === c && styles.activeColorCircle,
                ]}
                onPress={() => setColor(c)}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
          <IconRenderer name="check" size={14} color="#09090b" strokeWidth={2.5} />
          <Text style={styles.saveText}>Guardar cambios</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  modalContent: {
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
    marginBottom: 12,
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
  presetChipScroll: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  presetChip: {
    backgroundColor: '#18181b',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  activePresetChip: {
    backgroundColor: '#27272a',
    borderColor: '#52525b',
  },
  presetChipText: {
    color: '#71717a',
    fontSize: 11,
    fontWeight: '500',
  },
  activePresetChipText: {
    color: '#ffffff',
  },
  form: {
    gap: 4,
  },
  fieldLabel: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 6,
    marginBottom: 3,
  },
  input: {
    backgroundColor: '#18181b',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  catOption: {
    backgroundColor: '#18181b',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  activeCatOption: {
    backgroundColor: '#27272a',
    borderColor: '#52525b',
  },
  catOptionText: {
    color: '#71717a',
    fontSize: 11,
    fontWeight: '500',
  },
  activeCatOptionText: {
    color: '#ffffff',
  },
  colorRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 4,
  },
  colorCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  activeColorCircle: {
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  saveBtn: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderRadius: 10,
    paddingVertical: 11,
    marginTop: 16,
  },
  saveText: {
    color: '#09090b',
    fontSize: 12,
    fontWeight: '700',
  },
});
