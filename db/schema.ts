import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const items = pgTable('items', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    sku: text('sku').unique().notNull(),
    category: text('category'),
    stock: integer('stock').notNull().default(0),
    minStock: integer('min_stock').notNull().default(5),
    createdAt: timestamp('created_at').defaultNow(),
});

export const transactions = pgTable('transactions', {
    id: serial('id').primaryKey(),
    itemId: integer('item_id').references(() => items.id).notNull(),
    type: text('type').notNull(), // 'in' or 'out'
    quantity: integer('quantity').notNull(),
    notes: text('notes'),
    date: timestamp('date').defaultNow().notNull(),
});
