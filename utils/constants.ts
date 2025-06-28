import { isDev } from './helpers';
import { Variants } from 'motion/react';



export const pricing_Plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    description: 'Perfect for a occasional use',
    items: [
      '5 PDF summaries per month',
      'Standard processing speed',
      'Email support',
    ],
    paymentLink: isDev
      ? 'https://buy.stripe.com/test_dRm28t0fY7cN5OAgLv0x202'
      : '',
    priceId: isDev ? 'price_1RdU5rP4liOuGwhqMNcnPyEt' : '',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19,
    description: 'For professionals and terms',
    items: [
      'Unlimited PDF summaries',
      'Priority Processing',
      '24/7 priority support',
      'Markdown Export',
    ],
    paymentLink: isDev
      ? 'https://buy.stripe.com/test_6oU28t9QyfJjel6gLv0x201'
      : '',
    priceId: isDev ? 'price_1RdU5rP4liOuGwhqR0q0CnVG' : '',
  },
];

export const containerVarients: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
};

export const buttonVarient = {
  scale: 1.05,
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 10,
  },
} as const;
