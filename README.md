npm init
npm i typescript @types/node tsx -D
npm i @biomejs/biome -D
npm i fastify @fastify/cors zod fastify-type-provider-zod
tsc --init
== Copiar o tsconfig do bases da microsoft =======
Criar o script: "dev": "tsx watch src/infra/http/server.ts"
npx @biomejs/biome init
== Colar isso em workspace settings ==============
{
"editor.formatOnSave": true,
"[typescript]": {
"editor.defaultFormatter": "biomejs.biome"
},
"editor.codeActionsOnSave": {
"source.organizeImports.biome": "explict"
}
}
==================================================
