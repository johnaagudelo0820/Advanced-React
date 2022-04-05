import { integer, relationship, text, virtual } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import formatMoney from '../lib/formatMoney';

export const Order = list({
  fields: {
    label: virtual({
      graphQLReturnType: 'string',
      resolver(item) {
        return `John is cool ${formatMoney(item?.total)}}]`;
      },
    }),
    total: integer(),
    items: relationship({
      ref: 'OrderItem.order',
      many: true,
    }),
    user: relationship({
      ref: 'User.orders',
    }),
    charge: text(),
    // TODO: photo
  },
});
