# Marvel Character App

## Visão Geral do Projeto
Aplicativo feito em React Native para listagem de personagens da Marvel com funcionalidades de busca, favoritos e compartilhamento. O App consome consome a Api Marvel disponibilizada pela coleção feita pelo Alex Lifa(https://www.postman.com/alex-postman-workspace/marvel-api-workspace/documentation/989e351/marvel-api), pois não consegui acessar a API oficial da Marvel, já que a mesma estava apresentando erros internos de servidor.

## Funcionalidades Implementadas
- Listagem de personagens(20 por página);
- Detalhes do personage;
- Busca eficiente com uso de debounce, para que só seja feita a busca após o usuário não digitar mais nada por 500ms;
- Favoritos com persistência local através do AsyncStorage;
- Compartilhamento da lista de favoritos através do React-Native-Share;
- Tratamento básico de erros.
- Retry automático para quando há um erro na página de Home;
- Uso de throttling para que o botão de compartilhar não seja acionado repetidas vezes;
- Paginação infinita, usuário pode só ir rolando a lista e ao chegar próximo ao final dela será acionado o onEndReached que carregará mais personagens.

## Tecnologias Utilizadas
- React Native;
- Expo;
- Context API;
- AsyncStorage;
- React Navigation(Bottom Tabs e Native Stack);
- Axios;
- CryptoJS;
- Expo-Linear-Gradient.

## Decisões de Arquitetura
### Estrutura de Pastas
```
  
/components
├── Character
│   ├── CharacterItem.js
│   └── CharacterList.js
└── UI
│   ├── ErrorScreen.js
│   ├── IconButton.js
│   ├── LoadingOverlay.js
│   └── PrimaryButton.js
│   └── SearchBar.js
/contexts
└── FavoriteContext.js
/hooks
├── useDebounce.js
└── useThrottle.js
/screens
├── CharacterDetailsScreen.js
├── FavoritesScreen.js
└── HomeScreen.js
/services
├── api.js
└── marvelService.js
/styles
├── theme.js
/utils
├── constants.js
└── helpers.js
```

### Principais Desisões
1. Gerenciamento de Estado: Como o escopo do desafio não era muito grande, optei por utilizar o Context API ao invés de Redux ou Zustand.
2. Persistência: AsyncStorage para os favoritos por ser nativo da biblioteca e suficiente para as necessidades desse projeto.
3. Navegação: Utilizei o React Navigation por ser bem conhecida e dispor de diversas funcionalidades que ajudariam no decorrer do projeto.
4. Organização: Separação clara entre components, telas e serviços, além da criação de auxiliadores globais como styles, hooks, contexts e utils.

## Como Executar o Projeto
### Pré-requisitos
- Node.js(16 ou superior);
- npm ou yarn;
- Android Studio/Xcode(para emulador) ou dispositivo físico.

### Instalação
- Clone o repositório;
- Instale as dependências;
- Configure as variáveis de ambiente em um arquivo .env na raiz:
```
REACT_APP_BASE_URL=url_base_da_api_marvel
REACT_APP_PUBLIC_KEY=sua_chave_publica
REACT_APP_PRIVATE_KEY=sua_chave_privada
```
  Ambas as chaves podem ser obtidas pela coleção que citei mais acima, porém elas podem ser obtidas no site oficial da API(http://developer.marvel.com) na parte de "get keys" caso o site normalize.
- Inicie o projeto com npm start;

## Melhorias Futuras
1. Testes Automatizados(Tentei desenvolver os testes unitários, porém obtive alguns erros que não consegui resolver em tempo hábil):
  - Implementar testes unitários com Jest;
  - Testes de integração para fluxos críticos;
  - Testes de components com React Testing Library
2. Performance:
  - Implementar ajustes na lista para grandes conjuntos de dados para evitar problemas de memória, responsividade ou "áreas em branco";
  - Criar cache para renderização de imagens dos personagens favoritos;
  - Otimização de re-renders.
3. Tratamento de Erros:
  - Incrementar o meu interceptor em api.js para que ele repasse as informações de erros com mais detalhes e organização;
4. Funcionalidades:
  - Criação de login para que a pessoa possa se cadastrar no app e com isso possa acessar a lista de favoritos de outros dispositivos;
  - Integração com Firebase para que a lista de favoritos seja armazenada em um banco na nuvem e não gaste o armazenamento interno do dispositivo;
  - Opção de filtragem de personagens;
  - Acredito que a aplicação esteja com um visual bem neutro, porém poderia ser visto um caso para adicionar um dark mode;
  - Disponibilizar as outras informações que a API envia, como em que séries o personagem apareceu, os eventos que ele participou, etc.
5. Testes em plataformas com IOS:
  - Não tenho acesso a nenhum dispositivo com IOS, portanto não tive como visualizar como o app está para plataformas iphone;

## Imagens da aplicação rodando:
- Tela de Home:
  
  ![image](https://github.com/user-attachments/assets/0df36f0f-cc6f-4aaf-a853-9c0dc7124bd1) 

- Tela de Favorites:

  ![image](https://github.com/user-attachments/assets/5eb34274-dd11-4c82-bb0a-de99b0affdc5)

- Tela de Character Details:
  
  ![image](https://github.com/user-attachments/assets/f3bb8e0b-fbb6-49da-bfcc-8bc6124b5144)
  
- Tela de home ao usar SearchBar para pesquisar personagens que o nome comece com Spider:
  
  ![image](https://github.com/user-attachments/assets/a8ca347c-8337-479a-8b79-918a9f68eb9e)

- Tela de home ao chegar no fim da lista e ativar busca por mais personagens:
  
  ![image](https://github.com/user-attachments/assets/d9473d9d-e5c2-4105-924b-0c9a53a0a3d2)



