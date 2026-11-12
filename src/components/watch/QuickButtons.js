import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconRenderer from '../common/IconRenderer';

export default function QuickButtons({ presets, onSelectPreset, onOpenCustom }) {
  return (
    <View style={styles.container}>
      {presets.slice(0, 4).map((preset) => (
        <TouchableOpacity
          key={preset.id}
          style={styles.pillButton}
          onPress={() => onSelectPreset(preset)}
          activeOpacity={0.7}
        >
          <View style={[styles.iconBox, { backgroundColor: preset.color || '#3b82f6' }]}>
            <IconRenderer name={preset.icon} size={14} color="#ffffff" strokeWidth={2.4} />
          </View>
          <Text style={styles.titleText} numberOfLines={1}>
            {preset.title}
          </Text>
          <Text style={styles.amountText}>${preset.amount}</Text>
        </TouchableOpacity>
      ))}

      {/* Custom amount pill */}
      <TouchableOpacity
        style={[styles.pillButton, styles.customPill]}
        onPress={onOpenCustom}
        activeOpacity={0.7}
      >
        <View style={styles.customIconBox}>
          <IconRenderer name="plus" size={14} color="#ffffff" strokeWidth={2.4} />
        </View>
        <Text style={styles.customTitle}>Otro importe</Text>
        <Text style={styles.customHint}>...</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 6,
  },
  pillButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#121214',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  customPill: {
    backgroundColor: '#18181b',
    borderColor: '#323238',
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  customIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  titleText: {
    color: '#f4f4f5',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  amountText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  customTitle: {
    color: '#d4d4d8',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  customHint: {
    color: '#71717a',
    fontSize: 14,
    fontWeight: '700',
  },
});
