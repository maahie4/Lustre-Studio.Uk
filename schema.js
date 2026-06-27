/**
 * schema.js — Shared JSON-LD Schema Injection for lustrestudio.uk
 * Injects structured data into each page for Google Rich Results,
 * AI search engines, and entity SEO.
 */

const SCHEMA_CONFIG = {
    orgName: 'Lustre Studio',
    alternateName: 'lustrestudio',
    url: 'https://lustrestudio.uk',
    email: 'hello@lustrestudio.uk',
    description: 'Lustre Studio is a 100% custom web design and SEO agency serving businesses across the United States and United Kingdom. We build bespoke, conversion-focused websites engineered to rank higher on Google and AI search engines.',
    foundingDate: '2025',
    sameAs: [
        'https://instagram.com/lustrestudiouk',
        'https://pinterest.com/lustrestudiouk'
    ],
    areaServed: [
        { '@type': 'Country', 'name': 'United States' },
        { '@type': 'Country', 'name': 'United Kingdom' }
    ],
    knowsAbout: [
        'Web Design', 'Custom Website Design', 'Website Development',
        'Search Engine Optimization', 'Local SEO', 'Technical SEO',
        'AI Search Optimization', 'Conversion Rate Optimization',
        'Landing Page Design', 'WordPress Development', 'Shopify Development',
        'Website Redesign', 'Website Maintenance', 'Google Business Profile Optimization',
        'Custom Web Tools', 'UX Design', 'Responsive Web Design'
    ]
};

function injectSchema(schemaObject) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaObject);
    document.head.appendChild(script);
}

function injectMultipleSchemas(schemas) {
    schemas.forEach(schema => injectSchema(schema));
}

// ─── Organization Schema ───
function injectOrganizationSchema() {
    injectSchema({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': SCHEMA_CONFIG.url + '/#organization',
        'name': SCHEMA_CONFIG.orgName,
        'alternateName': SCHEMA_CONFIG.alternateName,
        'url': SCHEMA_CONFIG.url,
        'email': SCHEMA_CONFIG.email,
        'description': SCHEMA_CONFIG.description,
        'foundingDate': SCHEMA_CONFIG.foundingDate,
        'sameAs': SCHEMA_CONFIG.sameAs,
        'areaServed': SCHEMA_CONFIG.areaServed,
        'knowsAbout': SCHEMA_CONFIG.knowsAbout,
        'hasOfferCatalog': {
            '@type': 'OfferCatalog',
            'name': 'Web Design & SEO Services',
            'itemListElement': [
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Custom Web Design', 'url': SCHEMA_CONFIG.url + '/services/web-design' }},
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Website Development', 'url': SCHEMA_CONFIG.url + '/services/website-development' }},
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Local SEO', 'url': SCHEMA_CONFIG.url + '/services/local-seo' }},
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Technical SEO', 'url': SCHEMA_CONFIG.url + '/services/technical-seo' }},
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'AI Search Optimization', 'url': SCHEMA_CONFIG.url + '/services/ai-search-optimization' }},
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Conversion Rate Optimization', 'url': SCHEMA_CONFIG.url + '/services/conversion-rate-optimization' }},
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Landing Page Design', 'url': SCHEMA_CONFIG.url + '/services/landing-page-design' }},
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'WordPress Development', 'url': SCHEMA_CONFIG.url + '/services/wordpress-development' }},
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Shopify Development', 'url': SCHEMA_CONFIG.url + '/services/shopify-development' }},
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Website Redesign', 'url': SCHEMA_CONFIG.url + '/services/website-redesign' }},
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Website Maintenance', 'url': SCHEMA_CONFIG.url + '/services/website-maintenance' }},
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Google Business Profile Optimization', 'url': SCHEMA_CONFIG.url + '/services/google-business-profile-optimization' }},
                { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Custom Web Tools', 'url': SCHEMA_CONFIG.url + '/services/custom-tools' }}
            ]
        }
    });
}

// ─── WebSite Schema ───
function injectWebSiteSchema() {
    injectSchema({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': SCHEMA_CONFIG.url + '/#website',
        'name': SCHEMA_CONFIG.orgName,
        'alternateName': SCHEMA_CONFIG.alternateName,
        'url': SCHEMA_CONFIG.url,
        'publisher': { '@id': SCHEMA_CONFIG.url + '/#organization' }
    });
}

// ─── WebPage Schema ───
function injectWebPageSchema(name, description, url, breadcrumbItems) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': name,
        'description': description,
        'url': url,
        'isPartOf': { '@id': SCHEMA_CONFIG.url + '/#website' },
        'about': { '@id': SCHEMA_CONFIG.url + '/#organization' }
    };
    if (breadcrumbItems) {
        schema.breadcrumb = buildBreadcrumbSchema(breadcrumbItems);
    }
    injectSchema(schema);
}

// ─── Service Schema ───
function injectServiceSchema(serviceName, description, url, priceFrom, priceCurrency) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': serviceName,
        'description': description,
        'url': url,
        'provider': {
            '@type': 'Organization',
            '@id': SCHEMA_CONFIG.url + '/#organization',
            'name': SCHEMA_CONFIG.orgName
        },
        'areaServed': SCHEMA_CONFIG.areaServed
    };
    if (priceFrom && priceCurrency) {
        schema.offers = {
            '@type': 'Offer',
            'priceSpecification': {
                '@type': 'UnitPriceSpecification',
                'price': priceFrom,
                'priceCurrency': priceCurrency,
                'unitText': 'project'
            }
        };
    }
    injectSchema(schema);
}

// ─── FAQ Schema ───
function injectFAQSchema(faqArray) {
    if (!faqArray || faqArray.length === 0) return;
    injectSchema({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqArray.map(faq => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer
            }
        }))
    });
}

// ─── Breadcrumb Schema ───
function buildBreadcrumbSchema(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': items.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': item.name,
            'item': item.url
        }))
    };
}

function injectBreadcrumbSchema(items) {
    injectSchema(buildBreadcrumbSchema(items));
}

// ─── Review Schema ───
function injectReviewSchema(reviewerName, reviewBody, ratingValue) {
    injectSchema({
        '@context': 'https://schema.org',
        '@type': 'Review',
        'author': { '@type': 'Person', 'name': reviewerName },
        'reviewBody': reviewBody,
        'reviewRating': {
            '@type': 'Rating',
            'ratingValue': ratingValue || '5',
            'bestRating': '5'
        },
        'itemReviewed': {
            '@type': 'Organization',
            '@id': SCHEMA_CONFIG.url + '/#organization',
            'name': SCHEMA_CONFIG.orgName
        }
    });
}

// ─── Article Schema ───
function injectArticleSchema(headline, description, url, datePublished, dateModified) {
    injectSchema({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': headline,
        'description': description,
        'url': url,
        'datePublished': datePublished,
        'dateModified': dateModified || datePublished,
        'author': { '@id': SCHEMA_CONFIG.url + '/#organization' },
        'publisher': { '@id': SCHEMA_CONFIG.url + '/#organization' }
    });
}

// ─── Convenience: Full Homepage Schema ───
function injectHomepageSchemas() {
    injectOrganizationSchema();
    injectWebSiteSchema();
    injectWebPageSchema(
        'Lustre Studio — 100% Custom Web Design & SEO Agency',
        SCHEMA_CONFIG.description,
        SCHEMA_CONFIG.url + '/',
        [{ name: 'Home', url: SCHEMA_CONFIG.url + '/' }]
    );
}

// ─── Convenience: Service Page Schema ───
function injectServicePageSchemas(serviceName, description, url, priceFrom, priceCurrency, breadcrumbs, faqs) {
    injectServiceSchema(serviceName, description, url, priceFrom, priceCurrency);
    injectWebPageSchema(serviceName + ' | Lustre Studio', description, url, breadcrumbs);
    if (faqs && faqs.length > 0) {
        injectFAQSchema(faqs);
    }
    if (breadcrumbs) {
        injectBreadcrumbSchema(breadcrumbs);
    }
}

// ─── Video Schema ───
function injectVideoSchema(videos) {
    if (!videos || videos.length === 0) return;
    videos.forEach(video => {
        injectSchema({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            'name': video.name,
            'description': video.description,
            'thumbnailUrl': video.thumbnailUrl,
            'uploadDate': video.uploadDate,
            'contentUrl': video.contentUrl,
            'embedUrl': video.embedUrl || video.contentUrl
        });
    });
}

