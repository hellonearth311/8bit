export type CartridgeRoute = {
    id: 'info' | 'rules' | 'faq' | 'rsvp';
    label: string;
    href: '/home/info' | '/home/rules' | '/home/faq' | '/home/rsvp';
};

export const cartridgeRoutes: CartridgeRoute[] = [
    { id: 'info', label: 'INFO', href: '/home/info' },
    { id: 'rules', label: 'RULES', href: '/home/rules' },
    { id: 'faq', label: 'FAQ', href: '/home/faq' },
    { id: 'rsvp', label: 'RSVP', href: '/home/rsvp' },
];
