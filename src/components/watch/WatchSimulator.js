import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import WatchScreen from './WatchScreen';
import { useApp } from '../../context/AppContext';

export default function WatchSimulator() {
  const { undoLastExpense, triggerHaptic } = useApp();
  const [crownDelta, setCrownDelta] = useState(0);
  const [crownTeethOffset, setCrownTeethOffset] = useState(0);
  const dragStartY = useRef(null);

  // Trigger crown rotation step
  const rotateCrown = (direction) => {
    triggerHaptic([10]);
    setCrownDelta(direction);
    setCrownTeethOffset((prev) => (prev + direction * 4) % 12);
    // Reset delta tick after notifying
    setTimeout(() => setCrownDelta(0), 40);
  };

  // Mouse wheel handler on crown or watch
  const handleWheel = (e) => {
    if (e.deltaY) {
      const dir = e.deltaY < 0 ? 1 : -1;
      rotateCrown(dir);
    }
  };

  // Touch / Mouse drag handlers on physical crown
  const handleMouseDown = (e) => {
    dragStartY.current = e.clientY || (e.touches && e.touches[0]?.clientY);
  };

  const handleMouseMove = (e) => {
    if (dragStartY.current === null) return;
    const currentY = e.clientY || (e.touches && e.touches[0]?.clientY);
    const diff = dragStartY.current - currentY;
    if (Math.abs(diff) > 10) {
      rotateCrown(diff > 0 ? 1 : -1);
      dragStartY.current = currentY;
    }
  };

  const handleMouseUp = () => {
    dragStartY.current = null;
  };

  const handleSideButton = () => {
    triggerHaptic([25]);
    undoLastExpense();
  };

  return (
    <View
      style={styles.outerContainer}
      // @ts-ignore Web event support
      onWheel={handleWheel}
    >
      {/* Top Strap */}
      <View style={styles.strapTop} />

      {/* Watch Case */}
      <View style={styles.watchBody}>
        {/* Interactive Rotatable Digital Crown */}
        <View
          style={styles.crownContainer}
          // @ts-ignore Web mouse/touch events
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          title="Gira la perilla (arrastra o rueda del mouse)"
        >
          <View style={styles.digitalCrown}>
            {/* Visual animated knurling grooves */}
            <View
              style={[
                styles.knurlingTeeth,
                { transform: [{ translateY: crownTeethOffset }] },
              ]}
            >
              <View style={styles.tooth} />
              <View style={styles.tooth} />
              <View style={styles.tooth} />
              <View style={styles.tooth} />
              <View style={styles.tooth} />
              <View style={styles.tooth} />
              <View style={styles.tooth} />
            </View>
          </View>
        </View>

        {/* Physical Side Button (Flush) */}
        <TouchableOpacity
          style={styles.sideButton}
          onPress={handleSideButton}
          activeOpacity={0.7}
          title="Botón lateral: Deshacer"
        />

        {/* Outer Titanium Chassis */}
        <View style={styles.caseOuter}>
          <View style={styles.caseInner}>
            <WatchScreen crownDelta={crownDelta} />
          </View>
        </View>
      </View>

      {/* Bottom Strap */}
      <View style={styles.strapBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  strapTop: {
    width: 136,
    height: 38,
    backgroundColor: '#161618',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: '#242428',
    borderBottomWidth: 0,
  },
  strapBottom: {
    width: 136,
    height: 38,
    backgroundColor: '#161618',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: '#242428',
    borderTopWidth: 0,
  },
  watchBody: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: -2,
    zIndex: 10,
  },
  crownContainer: {
    position: 'absolute',
    right: -10,
    top: 70,
    width: 16,
    height: 52,
    zIndex: 30,
    cursor: 'ns-resize',
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitalCrown: {
    width: 10,
    height: 50,
    backgroundColor: '#38383e',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#52525b',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  knurlingTeeth: {
    width: '100%',
    alignItems: 'center',
    gap: 3,
  },
  tooth: {
    width: 6,
    height: 3,
    backgroundColor: '#18181b',
    borderRadius: 1,
  },
  sideButton: {
    position: 'absolute',
    right: -6,
    top: 154,
    width: 6,
    height: 44,
    backgroundColor: '#2e2e34',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    borderWidth: 1,
    borderColor: '#45454e',
    zIndex: 20,
    cursor: 'pointer',
  },
  caseOuter: {
    width: 304,
    height: 376,
    borderRadius: 46,
    backgroundColor: '#16161a',
    borderWidth: 5,
    borderColor: '#27272c',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.55,
    shadowRadius: 28,
  },
  caseInner: {
    width: 284,
    height: 356,
    borderRadius: 36,
    backgroundColor: '#000000',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
