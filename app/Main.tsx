'use client'

import { motion } from 'framer-motion'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import CustomLink from '@/components/Link'
import Image from 'next/image'

const MAX_DISPLAY = 3
const FEATURED_DISPLAY = 4

// Variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

export default function Home({ posts }) {
  const featuredPosts = posts.slice(0, FEATURED_DISPLAY)
  const remainingPosts = posts.slice(FEATURED_DISPLAY, FEATURED_DISPLAY + MAX_DISPLAY)

  return (
    <>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative -z-10 dark:text-gray-100"
      >
        <div className="container mx-auto max-w-6xl space-y-6 p-6 sm:space-y-12">
          <motion.div
            variants={containerVariants}
            className="relative -z-10 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-4"
          >
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className={`relative overflow-hidden rounded-lg ${
                  index === 0 ? 'col-span-1 md:col-span-2 md:row-span-2' : 'col-span-1 row-span-1'
                } aspect-square`}
              >
                <CustomLink
                  href={`/blog/${post.slug}`}
                  className="group relative block h-full w-full"
                >
                  <div className="absolute inset-0 z-10 flex flex-col justify-end bg-black bg-opacity-40 p-3 text-white md:p-4">
                    <h3
                      className={`mb-1 line-clamp-2 font-semibold ${index === 0 ? 'text-lg md:text-2xl' : 'text-sm md:text-base'} `}
                    >
                      {post.title}
                    </h3>
                    {index === 0 && (
                      <p className="mb-2 line-clamp-3 hidden text-xs md:block md:text-sm">
                        {post.summary.length > 150
                          ? `${post.summary.slice(0, 150)}...`
                          : post.summary}
                      </p>
                    )}
                    <span className="text-xs opacity-75">
                      {formatDate(post.date, siteMetadata.locale)}
                    </span>
                  </div>
                  <Image
                    src={post.images?.[0] || `https://source.unsplash.com/random/400x400?${index}`}
                    alt={post.title}
                    width={400}  // Specify a width
                    height={400} // Specify a height
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </CustomLink>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Rest of the component remains the same */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="divide-y divide-gray-200 dark:divide-gray-700"
      >
        <div className="space-y-3 pb-8 pt-6 md:space-y-6">
          <h1 className="text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
        </div>
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {!posts.length && 'No posts found.'}
          {remainingPosts.map((post) => (
            <motion.li key={post.slug} variants={itemVariants} className="py-12">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <CustomLink
                            href={`/blog/${post.slug}`}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            {post.title}
                          </CustomLink>
                        </h2>
                        <dl className="space-y-2">
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={post.date}>
                              {formatDate(post.date, siteMetadata.locale)}
                            </time>
                          </dd>
                        </dl>
                        <div className="flex flex-wrap">
                          {post.tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {post.summary.length > 200
                          ? `${post.summary.slice(0, 200)}...`
                          : post.summary}
                      </div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <CustomLink
                        href={`/blog/${post.slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Read more: "${post.title}"`}
                      >
                        Read more &rarr;
                      </CustomLink>
                    </div>
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {posts.length > FEATURED_DISPLAY + MAX_DISPLAY && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-end text-base font-medium leading-6"
        >
          <CustomLink
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </CustomLink>
        </motion.div>
      )}

      {siteMetadata.newsletter?.provider && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center pt-4"
        >
          <NewsletterForm />
        </motion.div>
      )}
    </>
  )
}
