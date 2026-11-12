export const WATCH_CATEGORIES = [
  { id: 'cat-1', name: 'Alimentos', icon: 'utensils', color: '#10b981', defaultAmount: 40 },
  { id: 'cat-2', name: 'Transporte', icon: 'bus', color: '#0ea5e9', defaultAmount: 15 },
  { id: 'cat-3', name: 'Tienda', icon: 'shopping-bag', color: '#f59e0b', defaultAmount: 35 },
  { id: 'cat-4', name: 'Varios', icon: 'zap', color: '#8b5cf6', defaultAmount: 50 },
  { id: 'cat-5', name: 'Ocio', icon: 'coffee', color: '#ec4899', defaultAmount: 60 },
  { id: 'cat-6', name: 'Servicios', icon: 'wallet', color: '#6366f1', defaultAmount: 80 },
];

export const INITIAL_PRESETS = [
  { id: '1', title: 'Alimentos', amount: 40, category: 'Alimentos', icon: 'utensils', color: '#10b981' },
  { id: '2', title: 'Transporte', amount: 15, category: 'Transporte', icon: 'bus', color: '#0ea5e9' },
  { id: '3', title: 'Tienda', amount: 35, category: 'Tienda', icon: 'shopping-bag', color: '#f59e0b' },
  { id: '4', title: 'Varios', amount: 50, category: 'Varios', icon: 'zap', color: '#8b5cf6' },
];

export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-1',
    title: 'Transporte',
    amount: 15,
    category: 'Transporte',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    source: 'watch',
  },
  {
    id: 'tx-2',
    title: 'Alimentos',
    amount: 40,
    category: 'Alimentos',
    timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    source: 'watch',
  },
];

export const INITIAL_SETTINGS = {
  dailyBudget: 200,
  monthlyBudget: 4500,
  currency: 'MXN',
};
