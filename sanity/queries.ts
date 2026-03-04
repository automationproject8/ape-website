import { client } from './client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export function urlFor(source: object) {
  return builder.image(source)
}

export async function getAllPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      publishedAt,
      mainImage,
      "readTime": round(length(pt::text(body)) / 5 / 200) + " min read"
    }
  `)
}

export async function getPostBySlug(slug: string) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      publishedAt,
      mainImage,
      body,
      "readTime": round(length(pt::text(body)) / 5 / 200) + " min read"
    }
  `, { slug })
}

export async function getAllSlugs() {
  return client.fetch(`*[_type == "post"]{ "slug": slug.current }`)
}
