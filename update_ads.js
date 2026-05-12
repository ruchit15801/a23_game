const fs = require('fs');
const path = require('path');

const files = [
    'index.html',
    'about.html',
    'contact.html',
    'privacy.html',
    'terms.html',
    'game-details.html'
];

const targetPattern = /<!-- Google AdSense -->\s*<script async src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-1818899363641893" crossorigin="anonymous"><\/script>/g;

const replacement = `<!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1417519623217292" crossorigin="anonymous"></script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1818899363641893" crossorigin="anonymous"></script>`;

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.match(targetPattern)) {
            content = content.replace(targetPattern, replacement);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated AdSense in ${file}`);
        } else {
            console.log(`Target pattern not found in ${file}`);
        }
    }
});
