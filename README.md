# Configuração do Projeto

Este README fornece instruções detalhadas para configurar e iniciar o ambiente de desenvolvimento do projeto.

## Inicialização do Projeto

```sh
npm init
```

## Instalação das Dependências

### Dependências de Desenvolvimento

```sh
npm i typescript @types/node tsx -D
npm i @biomejs/biome -D
```

### Dependências Principais

```sh
npm i fastify @fastify/cors zod fastify-type-provider-zod
```

## Configuração do TypeScript

```sh
tsc --init
```

Copie o `tsconfig.json` base da Microsoft para garantir as melhores configurações.

## Configuração dos Scripts no `package.json`

Adicione o seguinte script:

```json
"scripts": {
  "dev": "tsx watch src/infra/http/server.ts"
}
```

## Configuração do BiomeJS

```sh
npx @biomejs/biome init
```

Adicione o seguinte em `workspace settings`:

```json
{
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome"
  },
  "editor.codeActionsOnSave": {
    "source.organizeImports.biome": "explict"
  }
}
```

## Configuração do Git e Docker

Crie um arquivo `.gitignore` adequado e configure o Docker Compose:

```sh
docker-compose up -d
```

Se precisar instalar o Docker Compose manualmente:

```sh
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Alerta - Caso Retorne Erro na Porta 5432

```sh
sudo lsof -i :5432
sudo kill -9 <PID>
```

## Atualização do Script de Desenvolvimento

```json
"scripts": {
  "dev": "tsx watch --env-file .env src/infra/http/server.ts"
}
```

## Instalação de Dependências Adicionais

### Swagger para Documentação da API

```sh
npm i @fastify/swagger @fastify/swagger-ui
```

### Suporte a Upload de Arquivos

```sh
npm i @fastify/multipart
```

### Testes e Utilitários

```sh
npm i vitest -D
npm i vite-tsconfig-paths -D
npm i dotenv-cli -D
```

### Configuração do ORM

```sh
npm i drizzle-orm
npm i drizzle-kit -D
npm i postgres
npm i uuidv7
```

### Configuração do Cliente AWS

```sh
npm i @aws-sdk/lib-storage @aws-sdk/client-s3
```

### Biblioteca para Testes

```sh
npm i @faker-js/faker -D
```

### Manipulação de Datas

```sh
npm i dayjs
```

### Biblioteca para exportação de dados

```sh
npm i csv-stringify
```

## Observação para Testes

No `Vitest`, podemos usar `pre` ou `post` antes ou depois de cada `test`.

### Biblioteca para buildar a aplicação

```sh
npm i tsup -D
```

---

Com essas configurações, seu ambiente estará pronto para desenvolvimento. Certifique-se de seguir cada passo corretamente!
