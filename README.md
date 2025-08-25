

npm init -y

npm install @11ty/eleventy

#sempre gera todas as páginas.
npx @11ty/eleventy

# Gera todas as páginas inicialmente, mas depois passa a ser incremental, monitorando as alterações e recompilando apenas o que é necessário para otimizar o fluxo de trabalho de desenvolvimento.
npx @11ty/eleventy --serve



firebase deploy