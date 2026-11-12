import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconRenderer from '../common/IconRenderer';
import CrownDialGauge from './CrownDialGauge';
import { useApp } from '../../context/AppContext';

export default function CrownAmountView({
  category,
  onConfirm,
  onCancel,
  crownDelta,
}) {
  const { triggerHaptic } = useApp();
  const [amount, setAmount] = useState(category.defaultAmount || 30);
  const [confirmed, setConfirmed] = useState(false);

  // When crownDelta changes (from physical crown rotation or wheel), update amount
  useEffect(() => {
    if (crownDelta !== 0) {
      setAmount((prev) => {
        const step = 5;
        const next = Math.max(5, Math.min(2000, prev + crownDelta * step));
        triggerHaptic([12]);
        return next;
      });
    }
  }, [crownDelta]);

  // Adjust amount with on-screen step buttons
  const stepAmount = (delta) => {
    setAmount((prev) => {
      const next = Math.max(5, Math.min(2000, prev + delta));
      triggerHaptic([15]);
      return next;
    });
  };

  const handleAccept = () => {
    setConfirmed(true);
    triggerHaptic([30, 20]);
    setTimeout(() => {
      onConfirm(amount);
    }, 400);
  };

  // Wheel listener for desktop mouse scroll directly over this screen
  const handleWheel = (e) => {
    if (e.deltaY) {
      const delta = e.deltaY < 0 ? 1 : -1;
      stepAmount(delta * 5);
    }
  };

  return (
    <View
      style={styles.container}
      // @ts-ignore Web event support
      onWheel={handleWheel}
    >
      {/* Category header tag */}
      <View style={styles.categoryHeader}>
        <View style={[styles.catIconBox, { backgroundColor: category.color || '#10b981' }]}>
          <IconRenderer name={category.icon} size={13} color="#ffffff" strokeWidth={2.4} />
        </View>
        <Text style={styles.catNameText}>{category.name}</Text>
      </View>

      {/* Main Amount Readout */}
      <View style={styles.amountDisplay}>
        <Text style={styles.currencyPrefix}>$</Text>
        <Text style={styles.amountNumber}>{amount}</Text>
        <Text style={styles.currencySuffix}>MXN</Text>
      </View>

      {/* Graduation ticks gauge */}
      <CrownDialGauge amount={amount} max={300} />

      {/* Crown interaction prompt / Quick stepper */}
      <View style={styles.stepperRow}>
        <TouchableOpacity
          style={styles.stepBtn}
          onPress={() => stepAmount(-5)}
          activeOpacity={0.7}
        >
          <Text style={styles.stepText}>-5</Text>
        </TouchableOpacity>

        <View style={styles.crownHint}>
          <IconRenderer name="sliders" size={11} color="#71717a" />
          <Text style={styles.crownHintText}>Gira la perilla</Text>
        </View>

        <TouchableOpacity
          style={styles.stepBtn}
          onPress={() => stepAmount(5)}
          activeOpacity={0.7}
        >
          <Text style={styles.stepText}>+5</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons: Cancel (✕) and Accept (✓) */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={onCancel}
          activeOpacity={0.7}
        >
          <IconRenderer name="close" size={16} color="#a1a1aa" strokeWidth={2.2} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.acceptBtn, confirmed && styles.confirmedBtn]}
          onPress={handleAccept}
          activeOpacity={0.8}
        >
          <IconRenderer
            name="check"
            size={18}
            color={confirmed ? '#ffffff' : '#09090b'}
            strokeWidth={2.8}
          />
          <Text style={[styles.acceptText, confirmed && styles.confirmedText]}>
            {confirmed ? 'Registrado' : 'Aceptar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#121214',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  catIconBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catNameText: {
    color: '#e4e4e7',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  amountDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginTop: 6,
  },
  currencyPrefix: {
    color: '#71717a',
    fontSize: 22,
    fontWeight: '700',
    marginRight: 2,
  },
  amountNumber: {
    color: '#ffffff',
    fontSize: 46,
    fontWeight: '800',
    letterSpacing: -1,
  },
  currencySuffix: {
    color: '#71717a',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 6,
    marginVertical: 4,
  },
  stepBtn: {
    width: 36,
    height: 28,
    backgroundColor: '#18181b',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '700',
  },
  crownHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  crownHintText: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    marginTop: 4,
  },
  cancelBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptBtn: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#22c55e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#22c55e',
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  confirmedBtn: {
    backgroundColor: '#10b981',
  },
  acceptText: {
    color: '#09090b',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  confirmedText: {
    color: '#ffffff',
  },
});

