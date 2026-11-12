import React from 'react';
import { View, StyleSheet } from 'react-native';
import PhoneScreen from './PhoneScreen';

export default function PhoneSimulator() {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.chassis}>
        {/* Hardware side accents */}
        <View style={styles.sideButtonLeft} />
        <View style={styles.sideButtonRight} />

        {/* Outer Phone Bezel */}
        <View style={styles.phoneFrame}>
          {/* Top Notch / Camera Cutout */}
          <View style={styles.island}>
            <View style={styles.cameraLens} />
          </View>

          {/* Screen Content */}
          <View style={styles.screenContainer}>
            <PhoneScreen />
          </View>

          {/* Bottom Home Indicator */}
          <View style={styles.homeIndicatorContainer}>
            <View style={styles.homeIndicator} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  chassis: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideButtonLeft: {
    position: 'absolute',
    left: -4,
    top: 110,
    width: 4,
    height: 48,
    backgroundColor: '#3f3f46',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  sideButtonRight: {
    position: 'absolute',
    right: -4,
    top: 130,
    width: 4,
    height: 56,
    backgroundColor: '#3f3f46',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  phoneFrame: {
    width: 340,
    height: 640,
    backgroundColor: '#09090b',
    borderRadius: 36,
    borderWidth: 6,
    borderColor: '#18181b',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
  },
  island: {
    position: 'absolute',
    top: 6,
    alignSelf: 'center',
    width: 76,
    height: 14,
    backgroundColor: '#000000',
    borderRadius: 7,
    zIndex: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraLens: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#18181b',
  },
  screenContainer: {
    flex: 1,
    paddingTop: 18,
  },
  homeIndicatorContainer: {
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#09090b',
  },
  homeIndicator: {
    width: 110,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#3f3f46',
  },
});
