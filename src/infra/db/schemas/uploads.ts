import { pgTable, text, timestamp } from 'drizzle-orm/pg-core' // Utilizamos o pg por causa do psotgresql
import { randomUUID } from 'node:crypto'

export const uploads = pgTable('uploads', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text('name').notNull(),
  remoteKey: text('remote_key').notNull().unique(),
  remoteUrl: text('remote_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(), // Podemos utilizar isso em um dado mais especifico { withTimezone: true }
})
