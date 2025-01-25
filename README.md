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
== Criar o gitignore =============================
== Criar docker-compose.yml ======================
docker-compose up -d
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
== ALERTA - CASO RETORNE ERRO ====================
sudo lsof -i :5432
sudo kill -9 <PID>
==================================================
"dev": "tsx watch --env-file .env src/infra/http/server.ts"
npm i @fastify/swagger @fastify/swagger-ui
npm i @fastify/multipart
npm i vitest -D
npm i vite-tsconfig-paths -D
npm i dotenv-cli -D
npm i drizzle-orm
npm i drizzle-kit -D
npm i postgres
npm i uuidv7
