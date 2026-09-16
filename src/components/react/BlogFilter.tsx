import React, { useState } from 'react';

interface ArticleSummary {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  category: string;
  featuredImage: string;
  imageAlt?: string;
  author: string;
}

interface BlogFilterProps {
  articles: ArticleSummary[];
}

export default function BlogFilter({ articles }: BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Technology', 'Manufacturing', 'Engineering', 'Industry', 'Sustainability'];

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div>
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'bg-white border border-border text-secondary hover:text-dark hover:border-dark/30'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <article
            key={article.slug}
            className="group bg-white rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-surface">
              <img
                src={article.featuredImage}
                alt={article.imageAlt || article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-md text-[11px] font-bold text-brand-700 uppercase tracking-wider shadow-sm">
                {article.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-secondary mb-2.5">
                  <time dateTime={article.pubDate}>
                    {new Date(article.pubDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <span>•</span>
                  <span>{article.author}</span>
                </div>

                <h3 className="text-lg font-bold text-dark group-hover:text-brand-600 transition-colors leading-snug mb-2">
                  <a href={`/blog/${article.slug}`}>
                    {article.title}
                  </a>
                </h3>

                <p className="text-xs text-secondary line-clamp-3 leading-relaxed mb-4">
                  {article.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/60">
                <a
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 group-hover:text-brand-700 transition-colors"
                >
                  <span>Read Full Article</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-border">
          <p className="text-secondary text-sm">No articles available in the "{selectedCategory}" category yet.</p>
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className="mt-3 text-xs font-semibold text-brand-600 underline"
          >
            Show All Articles
          </button>
        </div>
      )}
    </div>
  );
}
