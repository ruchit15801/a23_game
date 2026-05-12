const fs = require('fs');

// Mock window object to load games.js
global.window = {};
require('./js/games.js');

const games = window.GAMES;
const domain = 'https://a23game.in';
const today = new Date().toISOString().split('T')[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const staticPages = [
    '/',
    '/about.html',
    '/contact.html',
    '/privacy.html',
    '/terms.html'
];

// Add static pages
staticPages.forEach(page => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${domain}${page}</loc>\n`;
    sitemap += `    <lastmod>${today}</lastmod>\n`;
    sitemap += `    <changefreq>${page === '/' ? 'daily' : 'monthly'}</changefreq>\n`;
    sitemap += `    <priority>${page === '/' ? '1.0' : '0.8'}</priority>\n`;
    sitemap += `  </url>\n`;
});

// Add all games
games.forEach(game => {
    // For SEO, use the canonical URL structure that matches details.js
    const gameUrl = `${domain}/games/${game.slug || game.id}`;
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${gameUrl.replace(/&/g, '&amp;')}</loc>\n`;
    sitemap += `    <lastmod>${today}</lastmod>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>0.9</priority>\n`;
    sitemap += `  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync('sitemap.xml', sitemap);
console.log('Sitemap generated successfully! Total URLs:', staticPages.length + games.length);
