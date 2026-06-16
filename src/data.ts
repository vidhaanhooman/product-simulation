export type BadgeKind =
  | 'next-turn'
  | 'conversation'
  | 'agent-message'
  | 'tool-call'
  | 'completed';

export interface Scenario {
  id: string;
  name: string;
  type: { label: string; kind: BadgeKind };
  description: string;
  expected: { label: string; kind: BadgeKind } | null;
  updated: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    name: 'Incorrect Website Link',
    type: { label: 'Next-turn', kind: 'next-turn' },
    description: 'Agent shared an incorrect website link. It should have been',
    expected: { label: 'agent-message', kind: 'agent-message' },
    updated: '26 May 2026, 12:32',
  },
  {
    id: 's2',
    name: 'hello-hello',
    type: { label: 'Next-turn', kind: 'next-turn' },
    description: '0eJeQZPG8JL3Rha6QAKm · 3 args',
    expected: { label: 'tool-call', kind: 'tool-call' },
    updated: '19 May 2026, 08:51',
  },
  {
    id: 's3',
    name: 'Booking appointment',
    type: { label: 'Conversation', kind: 'conversation' },
    description: 'On this call, cover the full booking flow for scheduling a call',
    expected: { label: 'completed', kind: 'completed' },
    updated: '06 May 2026, 20:16',
  },
  {
    id: 's4',
    name: 'Languages',
    type: { label: 'Next-turn', kind: 'next-turn' },
    description: 'Agent should concisely mention that we offer all requested',
    expected: { label: 'agent-message', kind: 'agent-message' },
    updated: '05 May 2026, 08:53',
  },
  {
    id: 's5',
    name: 'Incorrect language switch',
    type: { label: 'Next-turn', kind: 'next-turn' },
    description: 'Agent should have responded in Hindi.',
    expected: { label: 'agent-message', kind: 'agent-message' },
    updated: '15 Apr 2026, 23:28',
  },
  {
    id: 's6',
    name: 'Discount in words',
    type: { label: 'Next-turn', kind: 'next-turn' },
    description: 'Agent must mention discount percent in words like "ten per',
    expected: { label: 'agent-message', kind: 'agent-message' },
    updated: '02 Apr 2026, 19:15',
  },
  {
    id: 's7',
    name: 'send_wa_message',
    type: { label: 'Next-turn', kind: 'next-turn' },
    description: 'Agent should send the message directly without asking for',
    expected: { label: 'agent-message', kind: 'agent-message' },
    updated: '28 Mar 2026, 18:31',
  },
];

export interface Idea {
  id: string;
  title: string;
  text: string;
}

export const GENERATED_IDEAS: Idea[] = [
  {
    id: 'i1',
    title: 'Cancel premium plan',
    text: 'User wants to cancel their premium plan but cannot find the button in their account settings.',
  },
  {
    id: 'i2',
    title: 'Delayed package complaint',
    text: "User is frustrated because their package is 3 days late and the tracking hasn't updated.",
  },
  {
    id: 'i3',
    title: 'Broken item refund',
    text: 'Customer received a broken vase and wants an immediate refund instead of a replacement.',
  },
  {
    id: 'i4',
    title: 'Forgot password reset',
    text: 'User cannot log in and the password reset email never arrives in their inbox.',
  },
  {
    id: 'i5',
    title: 'Double charged',
    text: 'Customer was charged twice for a single order and wants one of the charges reversed.',
  },
  {
    id: 'i6',
    title: 'Wrong size delivered',
    text: 'User ordered a medium shirt but received an extra-large and wants a free exchange.',
  },
  {
    id: 'i7',
    title: 'Discount code rejected',
    text: 'Customer is upset that a valid promo code is being rejected at checkout.',
  },
  {
    id: 'i8',
    title: 'Change delivery address',
    text: 'User wants to update the shipping address for an order that has not yet been dispatched.',
  },
  {
    id: 'i9',
    title: 'Subscription auto-renewed',
    text: 'Customer was auto-renewed without notice and is requesting a full refund.',
  },
  {
    id: 'i10',
    title: 'Missing order item',
    text: 'User received their parcel but one of the three items is missing from the box.',
  },
  {
    id: 'i11',
    title: 'Warranty claim',
    text: 'Customer wants to claim warranty on a blender that stopped working after two months.',
  },
  {
    id: 'i12',
    title: 'Account locked out',
    text: 'User is locked out after too many login attempts and needs the account unlocked urgently.',
  },
  {
    id: 'i13',
    title: 'Gift card not working',
    text: 'Customer has a gift card balance that is not being applied to their purchase.',
  },
  {
    id: 'i14',
    title: 'Late refund follow-up',
    text: 'User returned an item two weeks ago and the refund has still not been processed.',
  },
  {
    id: 'i15',
    title: 'Upgrade plan question',
    text: 'Customer is unsure which plan to upgrade to and wants a recommendation for their usage.',
  },
];

export const BADGE_STYLES: Record<BadgeKind, { bg: string; color: string }> = {
  'next-turn': { bg: '#1c3321', color: '#68b871' },
  conversation: { bg: '#2b213b', color: '#9a7ad6' },
  'agent-message': { bg: '#1c2936', color: '#6fa5d9' },
  'tool-call': { bg: '#33231a', color: '#c77840' },
  completed: { bg: 'transparent', color: '#888888' },
};
