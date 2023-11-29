## Sobre
Este projeto é para concentrar o aprendizado da Google Cloud.

- Next Auth para Login com Google e outros;
- [Google Document AI para extrair informações de documento](#document-ai);

## Iniciar

- Para instalar as dependências do projeto:
```bash
npm install
# or
yarn --no-lockfile
```

- Clone **.env.example** e troque o nome para **.env** e configure as variaveis ambientes;

- Para iniciar o projeto em localhost:

```bash
npm run dev
# or
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) em seu navegador.

## Document AI
- Entrei no console da Google cloud, configurei a conta e também criei chave de acesso para conta de serviço no IAM da Cloud e me retornou um JSON: 
  - Na hora de criar uma nova chave diz: **"É feito o download de um arquivo contendo a chave privada. Armazene o arquivo com segurança porque essa chave não pode ser recuperada em caso de perda."** 
  - Mas não utilizei, então fiquei em dúvida de onde utilizar esses dados.

- Criei um processador da Document AI e então retornou as informações iniciais para iniciar a implementação da API.

- Na visão geral tem o link para a **[documentação da implementação da API](https://cloud.google.com/document-ai/docs/process-documents-ocr)**.

- Quando tentei implementar via API REST, retornava erro de oAuth na chamada à API, e então passei a utilizar a **[Google-Cloud document ai da NPM](https://www.npmjs.com/package/@google-cloud/documentai)** e consegui implementar para upar arquivo .PDF e retornar os dados do documento.
  - Inclusive, vendo alguns vídeos de documentação, na qual mostra em Python, eu pude perceber que utiliza de uma biblioteca, talvez não é seja muito usado a API REST neste caso?

- Após isso, consegui utilizar a API REST, pois instalei o gCloud CLI na minha máquina e executei o comando **[gcloud auth application-default print-access-token](https://cloud.google.com/document-ai/docs/setup#auth-test)** para pegar o Token de Acesso e então configurei no Authorization da requisição.
  - Para mim, está foi a parte mais díficil, pois eu fiquei um tempo tentando executar via REST, e só depois de usar a CLI eu consegui, então teoricamente eu estou limitado a usar o sistema apenas na minha máquina? **[link explicando autenticação usando gcloud](https://cloud.google.com/docs/authentication/rest?hl=pt-br#powershell)**

- Estou tentando entender o porque na documentação diz os **[tipos de arquivos que a API aceita](https://cloud.google.com/document-ai/docs/file-types#file_types)**, mas quando implementei, consegui apenas com .PDF, então limitei ao sistema só aceitar .PDF.

- Criei uma página google-document-ai para exibir um Input para o usuário upar o arquivo e abaixo exibir os dados do arquivo upado. Nesta página, utilizei da estrutura de API o NextJS, então fiz toda a lógica de enviar para o Google Document AI lá, deixando a parte do cliente apenas para o consumo da própria API.