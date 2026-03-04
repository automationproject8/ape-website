import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '9zsvd89s',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
