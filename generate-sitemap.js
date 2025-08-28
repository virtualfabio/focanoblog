const fs = require('fs');
const path = require('path');

// Diretório base dos artigos
const baseDir = 'artigos';

// URL base do seu site
const baseUrl = 'https://focanoblog.web.app';

let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Função recursiva para percorrer os diretórios
function walkDir(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Se for um diretório, chama a função recursivamente
            walkDir(filePath);
        } else if (file.endsWith('.md')) {
            // Se for um index.html, processa o arquivo
            const relativePath = path.relative('.', filePath);
            let articleUrl = `${baseUrl}/${relativePath.replace(/\\/g, '/')}`;
            articleUrl = articleUrl.replace('.md', '/index.html');
            const lastMod = stat.mtime.toISOString().split('T')[0];
            sitemapContent += `
                <url>
                    <loc>${articleUrl}</loc>
                    <lastmod>${lastMod}</lastmod>
                </url>
            `;
        }
    }
}

// Inicia o processo a partir do diretório base
if (fs.existsSync(baseDir)) {
    walkDir(baseDir);

    // Finaliza o conteúdo do sitemap
    sitemapContent += `
</urlset>`;

    // Salva o arquivo
    fs.writeFileSync('sitemap.xml', sitemapContent.trim());

    console.log('sitemap.xml atualizado com sucesso!');
} else {
    console.error(`Erro: O diretório '${baseDir}' não foi encontrado.`);
}