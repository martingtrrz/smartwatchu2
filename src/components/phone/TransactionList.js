import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconRenderer from '../common/IconRenderer';

const CATEGORY_ICONS = {
  Alimentos: { icon: 'utensils', color: '#10b981' },
  Transporte: { icon: 'bus', color: '#0ea5e9' },
  Tienda: { icon: 'shopping-bag', color: '#f59e0b' },
  Varios: { icon: 'zap', color: '#8b5cf6' },
  Ocio: { icon: 'coffee', color: '#ec4899' },
  Servicios: { icon: 'wallet', color: '#6366f1' },
};

export default function TransactionList({ transactions, onDeleteTransaction }) {
  const [filterSource, setFilterSource] = useState('all');

  const formatTime = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  const filtered = transactions.filter((tx) => {
    if (filterSource === 'watch') return tx.source === 'watch';
    if (filterSource === 'phone') return tx.source === 'phone';
    return true;
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>HISTORIAL DE MOVIMIENTOS</Text>
        <Text style={styles.badge}>{transactions.length} registros</Text>
      </View>

      {/* Filter by device origin */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, filterSource === 'all' && styles.activeFilterBtn]}
          onPress={() => setFilterSource('all')}
          activeOpacity={0.7}
        >
          <Text style={[styles.filterText, filterSource === 'all' && styles.activeFilterText]}>
            Todos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filterSource === 'watch' && styles.activeFilterBtn]}
          onPress={() => setFilterSource('watch')}
          activeOpacity={0.7}
        >
          <IconRenderer
            name="watch"
            size={11}
            color={filterSource === 'watch' ? '#ffffff' : '#71717a'}
          />
          <Text style={[styles.filterText, filterSource === 'watch' && styles.activeFilterText]}>
            Smartwatch
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filterSource === 'phone' && styles.activeFilterBtn]}
          onPress={() => setFilterSource('phone')}
          activeOpacity={0.7}
        >
          <IconRenderer
            name="smartphone"
            size={11}
            color={filterSource === 'phone' ? '#ffffff' : '#71717a'}
          />
          <Text style={[styles.filterText, filterSource === 'phone' && styles.activeFilterText]}>
            Smartphone
          </Text>
        </TouchableOpacity>
      </View>

      {filtered.length === 0 ? (
        <View style={styles.emptyContainer}>
          <IconRenderer name="wallet" size={24} color="#52525b" />
          <Text style={styles.emptyText}>Sin movimientos</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {filtered.map((tx) => {
            const isWatch = tx.source === 'watch';
            const catMeta = CATEGORY_ICONS[tx.category] || { icon: 'zap', color: '#71717a' };

            return (
              <View key={tx.id} style={styles.txItem}>
                <View style={styles.leftRow}>
                  <View style={[styles.iconBox, { backgroundColor: catMeta.color }]}>
                    <IconRenderer name={catMeta.icon} size={13} color="#ffffff" strokeWidth={2.4} />
                  </View>
                  <View style={styles.infoCol}>
                    <Text style={styles.txTitle} numberOfLines={1}>
                      {tx.title}
                    </Text>
                    <View style={styles.metaRow}>
                      <Text style={styles.txTime}>{formatTime(tx.timestamp)}</Text>
                      {/* Device origin badge */}
                      <View style={styles.sourceTag}>
                        <IconRenderer
                          name={isWatch ? 'watch' : 'smartphone'}
                          size={10}
                          color="#a1a1aa"
                          strokeWidth={2}
                        />
                        <Text style={styles.sourceText}>
                          {isWatch ? 'Smartwatch' : 'Smartphone'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.rightRow}>
                  <Text style={styles.amountText}>-${tx.amount.toFixed(2)}</Text>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => onDeleteTransaction(tx.id)}
                    activeOpacity={0.7}
                  >
                    <IconRenderer name="trash" size={12} color="#71717a" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#121215',
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#24242a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  badge: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#0c0c0e',
    padding: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1e1e24',
    marginBottom: 12,
    gap: 3,
  },
  filterBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 6,
    borderRadius: 6,
  },
  activeFilterBtn: {
    backgroundColor: '#1e1e24',
  },
  filterText: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  list: {
    gap: 8,
  },
  txItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0c0c0e',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1e1e24',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  infoCol: {
    flex: 1,
  },
  txTitle: {
    color: '#f4f4f5',
    fontSize: 12,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  txTime: {
    color: '#71717a',
    fontSize: 10,
  },
  sourceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#18181c',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#24242a',
  },
  sourceText: {
    color: '#a1a1aa',
    fontSize: 9,
    fontWeight: '500',
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amountText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '700',
  },
  deleteBtn: {
    padding: 5,
    borderRadius: 6,
    backgroundColor: '#18181c',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 6,
  },
  emptyText: {
    color: '#71717a',
    fontSize: 11,
    fontWeight: '500',
  },
});
