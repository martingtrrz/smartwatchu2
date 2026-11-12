import React from 'react';
import {
  Coffee,
  Cookie,
  Bus,
  ShoppingBag,
  Utensils,
  Zap,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  Check,
  X,
  Sliders,
  Bluetooth,
  BluetoothOff,
  Watch,
  Smartphone,
  AlertCircle,
  TrendingUp,
  Wallet,
  Clock,
  ArrowRight,
  HelpCircle,
} from 'lucide-react-native';

const ICONS = {
  coffee: Coffee,
  cookie: Cookie,
  bus: Bus,
  'shopping-bag': ShoppingBag,
  utensils: Utensils,
  zap: Zap,
  plus: Plus,
  trash: Trash2,
  edit: Edit2,
  undo: RotateCcw,
  check: Check,
  close: X,
  sliders: Sliders,
  bluetooth: Bluetooth,
  'bluetooth-off': BluetoothOff,
  watch: Watch,
  smartphone: Smartphone,
  alert: AlertCircle,
  trending: TrendingUp,
  wallet: Wallet,
  clock: Clock,
  arrowRight: ArrowRight,
};

export default function IconRenderer({ name, size = 18, color = '#ffffff', strokeWidth = 2, style }) {
  const IconComponent = ICONS[name] || HelpCircle;
  return <IconComponent size={size} color={color} strokeWidth={strokeWidth} style={style} />;
}

