import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function CrownDialGauge({ amount, max = 500 }) {
  // Generate 21 graduation tick marks for the rotary ruler
  const totalTicks = 21;
  const normalizedValue = Math.min(amount / max, 1);
  const activeIndex = Math.round(normalizedValue * (totalTicks - 1));

  const ticks = Array.from({ length: totalTicks }, (_, index) => {
    const isMajor = index % 5 === 0;
    const isCenter = index === activeIndex;
    const isPassed = index <= activeIndex;

    return (
      <View
        key={index}
        style={[
          styles.tick,
          isMajor ? styles.majorTick : styles.minorTick,
          isPassed && styles.passedTick,
          isCenter && styles.centerTick,
        ]}
      />
    );
  });

  return (
    <View style={styles.gaugeContainer}>
      <View style={styles.ticksRow}>{ticks}</View>
      <View style={styles.centerIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  gaugeContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    position: 'relative',
  },
  ticksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 32,
  },
  tick: {
    width: 2,
    backgroundColor: '#27272a',
    borderRadius: 1,
  },
  minorTick: {
    height: 12,
  },
  majorTick: {
    height: 20,
    backgroundColor: '#3f3f46',
  },
  passedTick: {
    backgroundColor: '#10b981',
  },
  centerTick: {
    height: 26,
    width: 3,
    backgroundColor: '#ffffff',
    shadowColor: '#10b981',
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  centerIndicator: {
    position: 'absolute',
    bottom: -4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
});

