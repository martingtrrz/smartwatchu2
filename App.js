import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { AppProvider, useApp } from './src/context/AppContext';
import PresentationBar from './src/components/common/PresentationBar';
import WatchSimulator from './src/components/watch/WatchSimulator';
import PhoneSimulator from './src/components/phone/PhoneSimulator';

function MainLayout() {
  const { viewMode } = useApp();
  const { width } = useWindowDimensions();
  const isWide = width >= 860;

  return (
    <View style={styles.container}>
      <PresentationBar />

      <ScrollView
        contentContainerStyle={styles.mainScroll}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.stage,
            viewMode === 'dual' && isWide && styles.stageDualWide,
          ]}
        >
          {/* Smartwatch Module */}
          {(viewMode === 'dual' || viewMode === 'watch') && (
            <View style={styles.deviceColumn}>
              <WatchSimulator />
            </View>
          )}

          {/* Smartphone Module */}
          {(viewMode === 'dual' || viewMode === 'phone') && (
            <View style={styles.deviceColumn}>
              <PhoneSimulator />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  mainScroll: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  stage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    width: '100%',
    maxWidth: 1040,
  },
  stageDualWide: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 60,
  },
  deviceColumn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
