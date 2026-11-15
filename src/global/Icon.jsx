import React from 'react';
import * as LucideIcons from 'lucide-react';

const iconAliases = {
  'toy-brick': 'ToyBrick',
  'refresh-cw': 'RefreshCw',
  'shield-check': 'ShieldCheck',
  'message-circle': 'MessageCircle',
  'credit-card': 'CreditCard',
  'shopping-bag': 'ShoppingBag',
  'map-pin': 'MapPin',
  'log-out': 'LogOut',
  'twitter': 'Twitter',
  'facebook': 'Facebook',
  'instagram': 'Instagram',
};

function toPascalCase(str) {
  if (!str) return '';
  return str
    .split(/[-_ ]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

export default function Icon({ i, name, size = 18, className = '', ...props }) {
  const iconKey = i || name;
  if (!iconKey) return null;

  const targetName = iconAliases[iconKey] || toPascalCase(iconKey);
  const IconComponent = LucideIcons[targetName] || LucideIcons[toPascalCase(iconKey)] || LucideIcons.HelpCircle;

  return <IconComponent size={size} className={className} {...props} />;
}

