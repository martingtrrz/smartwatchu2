import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';
import IconRenderer from './IconRenderer';

export default function PresentationBar() {
  const {
    viewMode,
    setViewMode,
    isConnected,
    toggleConnection,
    resetDemoData,
    toastMessage,
  } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.brandGroup}>
          <Text style={styles.brandTitle}>SpendPulse</Text>
        </View>

        {/* View Switcher Tabs */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[styles.segmentBtn, viewMode === 'dual' && styles.activeSegmentBtn]}
            onPress={() => setViewMode('dual')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.segmentText,
                viewMode === 'dual' && styles.activeSegmentText,
              ]}
            >
              Dual
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.segmentBtn, viewMode === 'watch' && styles.activeSegmentBtn]}
            onPress={() => setViewMode('watch')}
            activeOpacity={0.7}
          >
            <IconRenderer
              name="watch"
              size={12}
              color={viewMode === 'watch' ? '#ffffff' : '#71717a'}
            />
            <Text
              style={[
                styles.segmentText,
                viewMode === 'watch' && styles.activeSegmentText,
              ]}
            >
              Reloj
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.segmentBtn, viewMode === 'phone' && styles.activeSegmentBtn]}
            onPress={() => setViewMode('phone')}
            activeOpacity={0.7}
          >
            <IconRenderer
              name="smartphone"
              size={12}
              color={viewMode === 'phone' ? '#ffffff' : '#71717a'}
            />
            <Text
              style={[
                styles.segmentText,
                viewMode === 'phone' && styles.activeSegmentText,
              ]}
            >
              Celular
            </Text>
          </TouchableOpacity>
        </View>

        {/* Utility controls */}
        <View style={styles.utilityGroup}>
          <TouchableOpacity
            style={[
              styles.connectionToggle,
              !isConnected && styles.connectionToggleDisconnected,
            ]}
            onPress={toggleConnection}
            activeOpacity={0.7}
          >
            <IconRenderer
              name={isConnected ? 'bluetooth' : 'bluetooth-off'}
              size={12}
              color={isConnected ? '#22c55e' : '#eab308'}
              strokeWidth={2.2}
            />
            <Text
              style={[
                styles.connectionText,
                !isConnected && { color: '#eab308' },
              ]}
            >
              {isConnected ? 'Bluetooth' : 'Sin conexión'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetDemoData}
            activeOpacity={0.7}
          >
            <Text style={styles.resetText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating Status Notification */}
      {toastMessage && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#09090b',
    borderBottomWidth: 1,
    borderBottomColor: '#18181b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    zIndex: 100,
  },
  topRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  brandGroup: {
    flexDirection: 'column',
  },
  brandTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#18181b',
    padding: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#27272a',
    gap: 2,
  },
  segmentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  activeSegmentBtn: {
    backgroundColor: '#27272a',
  },
  segmentText: {
    color: '#71717a',
    fontSize: 11,
    fontWeight: '500',
  },
  activeSegmentText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  utilityGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  connectionToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#18181b',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  connectionToggleDisconnected: {
    borderColor: '#3f3f46',
  },
  connectionText: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '500',
  },
  resetButton: {
    backgroundColor: '#18181b',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  resetText: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '500',
  },
  toast: {
    marginTop: 8,
    backgroundColor: '#18181b',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
  },
  toastText: {
    color: '#e4e4e7',
    fontSize: 11,
    fontWeight: '500',
  },
});
