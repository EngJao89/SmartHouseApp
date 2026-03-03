# SmartHouseApp

Aplicativo mobile desenvolvido para demonstrar conhecimentos técnicos em **React Native CLI** e **IoT (Internet das Coisas)**. O projeto simula o controle de uma casa inteligente pelo celular.

---

## Sobre o sistema

O **SmartHouseApp** é um app de controle residencial que permite:

- **Monitorar** dispositivos conectados (lâmpadas, termostatos, sensores, etc.)
- **Controlar** equipamentos em tempo (quase) real via interface mobile
- **Visualizar** estado dos ambientes e dispositivos em um único lugar

A ideia é representar um ecossistema típico de IoT: dispositivos reais ou simulados comunicando-se com um backend (ou broker MQTT/WebSocket), e o app React Native como cliente que consome e envia comandos. O foco do repositório está na **arquitetura do app**, na **integração com APIs/serviços IoT** e nas **boas práticas** de desenvolvimento com React Native CLI.

### Conceitos abordados

| Área | Descrição |
|------|-----------|
| **React Native CLI** | Projeto nativo (Android/iOS) sem Expo; configuração de Metro, Babel, TypeScript e builds nativos. |
| **Navegação** | React Navigation com Bottom Tabs e Stack aninhado; tipagem de rotas e params com `useNavigation` e `useRoute`. |
| **Estado** | Redux Toolkit com slice de dispositivos (`toggleDevice`, `updateBrightness`) e RTK Query para simular API. |
| **Offline First** | Cache em AsyncStorage; Redux Persist persiste estado (devices + cache RTK Query) e reidrata na abertura; sincronização em background. |
| **IoT** | Integração com serviços de IoT (APIs REST, MQTT, WebSockets) para controle e monitoramento de dispositivos. |
| **UX mobile** | Interface pensada para controle rápido, feedback visual e estados de conexão. |

---

## Stack técnico

- **React Native** 0.84 (CLI)
- **React** 19.x
- **TypeScript**
- **React Navigation** – navegação (Bottom Tabs + Native Stack), com tipagem para `useNavigation` e `useRoute`
- **react-native-vector-icons** – ícones nas Bottom Tabs (Ionicons: home, flash, person)
- **Redux Toolkit** – estado global (createSlice), RTK Query para simular chamadas de API (getDevices, updateDevice)
- **redux-persist** + **@react-native-async-storage/async-storage** – Offline First: cache do estado em AsyncStorage, reidratação na abertura, persistência em background
- **Node.js** ≥ 22.11 (ver `engines` no `package.json`)
- **Metro** – bundler JavaScript
- **ESLint** + **Prettier** – qualidade e formatação de código
- **Commitizen** – commits padronizados (Conventional Commits)

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) ≥ 22.11
- [React Native – ambiente](https://reactnative.dev/docs/set-up-your-environment) configurado (Android Studio e/ou Xcode, JDK, etc.)
- **iOS**: [CocoaPods](https://cocoapods.org/) e Ruby (geralmente já no macOS)

---

## Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar o Metro

No terminal, na raiz do projeto:

```bash
npm start
```

Deixe o Metro rodando.

### 3. Build e execução

Em **outro** terminal, na raiz do projeto:

**Android:**

```bash
npm run android
```

**iOS** (primeira vez ou após mudar dependências nativas):

```bash
bundle install
bundle exec pod install
```

Depois:

```bash
npm run ios
```

O app deve abrir no emulador/simulador ou dispositivo conectado.

### 4. Recarregar o app

- **Android**: <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) ou <kbd>Cmd</kbd> + <kbd>M</kbd> (macOS) → "Reload", ou pressione <kbd>R</kbd> duas vezes.
- **iOS**: <kbd>R</kbd> no simulador.

### 5. Ícones (react-native-vector-icons)

Os ícones das abas usam fontes nativas. Se os ícones não aparecerem após instalar a lib:

- **Android**: o `android/app/build.gradle` já inclui `apply from: .../fonts.gradle`. Faça um **rebuild completo** (não basta reload):
  ```bash
  cd android && ./gradlew clean && cd .. && npm run android
  ```
- **iOS**: o `Info.plist` deve ter a chave **UIAppFonts** com `Ionicons.ttf`. Depois rode **pod install** e reconstrua:
  ```bash
  cd ios && pod install && cd .. && npm run ios
  ```

---

## Estrutura do projeto

```
SmartHouseApp/
├── App.tsx                 # Componente raiz (SafeAreaProvider + NavigationContainer)
├── index.js                # Entry point
├── src/
│   ├── navigation/         # Configuração de rotas
│   │   ├── types.ts        # Tipos das rotas (ParamList) e declare global (RootParamList)
│   │   ├── RootNavigator.tsx   # Bottom Tabs com ícones (Ionicons) e tema
│   │   └── DispositivosStack.tsx   # Stack dentro da tab Dispositivos (lista → detalhe)
│   ├── store/              # Redux Toolkit
│   │   ├── deviceTypes.ts  # Interface Device (id, name, on, brightness?)
│   │   ├── devicesSlice.ts # Slice: toggleDevice, updateBrightness, setDevices
│   │   ├── devicesApi.ts    # RTK Query: getDevices (query), updateDevice (mutation)
│   │   └── index.ts        # configureStore, persistReducer (AsyncStorage), persistor; App usa PersistGate
│   └── screens/
│       ├── DispositivosListScreen.tsx   # Lista (useGetDevicesQuery + useSelector)
│       ├── DeviceDetailScreen.tsx       # Detalhe + Switch/Slider (dispatch + useUpdateDeviceMutation)
│       ├── AutomacoesScreen.tsx
│       └── PerfilScreen.tsx
├── android/                # Projeto nativo Android
├── ios/                    # Projeto nativo iOS
├── __tests__/              # Testes (Jest)
├── metro.config.js
├── babel.config.js
├── tsconfig.json
└── package.json
```

---

## Navegação (React Navigation)

A navegação usa **React Navigation** com tipagem em TypeScript.

### Estrutura de rotas

- **Bottom Tabs** (raiz): três abas — **Dispositivos**, **Automações**, **Perfil** — com ícones do **Ionicons** (react-native-vector-icons): home/home-outline, flash/flash-outline, person/person-outline (preenchido quando ativo).
- **Stack** na aba **Dispositivos**:
  - **DispositivosList** – lista de dispositivos (estado em Redux); ao tocar em um item, navega para o detalhe.
  - **DeviceDetail** – tela de detalhe que recebe `deviceId` e `deviceName` pela rota; controles de ligar/desligar e brilho (Redux + RTK Query).

### Tipagem

- **`src/navigation/types.ts`** define os *param lists* (`DispositivosStackParamList`, `RootTabParamList`) e o `declare global` para `ReactNavigation.RootParamList`, permitindo que `useNavigation()` e `useRoute()` sejam inferidos corretamente em todo o app.
- **`useNavigation`**: nas telas do stack (ex.: `DispositivosListScreen`), o hook é tipado com `NativeStackNavigationProp<DispositivosStackParamList, 'DispositivosList'>` para navegação type-safe (ex.: `navigation.navigate('DeviceDetail', { deviceId, deviceName })`).
- **`useRoute`**: na tela de detalhe, o hook é tipado com `RouteProp<DispositivosStackParamList, 'DeviceDetail'>` para acessar `route.params.deviceId` e `route.params.deviceName` com autocomplete e checagem de tipos.

---

## Gerenciamento de estado (Redux Toolkit)

O estado global usa **Redux Toolkit** com uma slice para dispositivos e **RTK Query** para simular chamadas de API.

### Slice `devices` (`src/store/devicesSlice.ts`)

- **Estado**: `items: Device[]`, onde cada `Device` tem `id`, `name`, `on` (boolean) e opcionalmente `brightness` (0–100).
- **Ações**:
  - **`toggleDevice(id)`** – alterna ligado/desligado.
  - **`updateBrightness({ id, brightness })`** – atualiza o brilho (apenas dispositivos que suportam).
  - **`setDevices(devices)`** – define a lista (usado ao receber dados da query).

### RTK Query (`src/store/devicesApi.ts`)

- **`getDevices`** – query que simula uma API (delay ~600 ms) e retorna a lista de dispositivos; a lista é sincronizada para a slice via `setDevices`.
- **`updateDevice`** – mutation que simula PATCH (delay ~400 ms) com `{ id, on?, brightness? }`; usada ao ligar/desligar e ao soltar o slider de brilho.
- Tags `['Devices']` para invalidação e refetch automático após mutations.

### Uso nas telas

- **DispositivosListScreen**: `useGetDevicesQuery()` para carregar da “API”; quando os dados chegam, dispara `setDevices`. A lista é lida com `useSelector(state => state.devices.items)`. Exibe estado (Ligado/Desligado) e brilho quando existir.
- **DeviceDetailScreen**: `useSelector` para o dispositivo por `deviceId`; **Switch** dispara `toggleDevice` + `updateDevice({ id, on })`; **Slider** de brilho (apenas se o dispositivo tiver `brightness`) atualiza a slice em tempo real e chama a mutation em `onSlidingComplete`. Indicador “Sincronizando...” durante a mutation.

O **App** está envolvido em `<Provider store={store}>` e `<PersistGate persistor={persistor}>` (em `App.tsx`).

---

## Offline First (Redux Persist + AsyncStorage)

A estratégia é **cache primeiro**: os dados ficam disponíveis offline e são sincronizados em background quando há conexão.

### Como funciona

- **AsyncStorage** é a camada de armazenamento local (chave `smartHouse`).
- **redux-persist** persiste as fatias `devices` e `devicesApi` (cache das queries). Toda alteração de estado nesses reducers é gravada em background no AsyncStorage.
- Na **abertura do app**, o `PersistGate` segura a renderização até a **reidratação** terminar: o estado salvo é restaurado e a UI já mostra a última lista e o último estado dos dispositivos, mesmo sem rede.
- **Em background**: quando o usuário usa o app com rede, RTK Query refaz as queries (ex.: `getDevices`), o estado é atualizado e o redux-persist persiste de novo. Não é necessário “sincronizar manualmente”; a persistência é contínua.

### Configuração (`src/store/index.ts`)

- `persistConfig`: `key: 'smartHouse'`, `storage: AsyncStorage`, `whitelist: ['devices', 'devicesApi']`.
- `persistedReducer = persistReducer(persistConfig, rootReducer)`.
- `persistor = persistStore(store)`; o `App` usa `<PersistGate loading={null} persistor={persistor}>`.
- As actions do redux-persist (`persist/PERSIST`, `persist/REHYDRATE`, etc.) estão em `ignoredActions` do `serializableCheck` do middleware para evitar avisos.

### Fluxo resumido

1. **Primeira abertura / com rede**: busca da API → estado atualizado → gravado no AsyncStorage.
2. **Próximas aberturas**: reidratação do AsyncStorage → tela mostra dados em cache de imediato; se houver rede, RTK Query pode refetch e o cache é atualizado em background.
3. **Offline**: apenas o estado persistido é exibido; mutations (toggle, brilho) atualizam o estado local e serão persistidas; quando voltar online, um refetch traria dados do servidor (no projeto atual a “API” é simulada).

---

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o Metro bundler |
| `npm run android` | Roda o app no Android |
| `npm run ios` | Roda o app no iOS |
| `npm run lint` | Executa o ESLint |
| `npm test` | Roda os testes com Jest |
| `npm run commit` | Abre o Commitizen para commit convencional |

---

## Próximos passos (roadmap)

- [x] Navegação com React Navigation (Bottom Tabs + Stack em Dispositivos)
- [x] Telas de listagem e detalhe de dispositivos (com `useNavigation` e `useRoute` tipados)
- [x] Gerenciamento de estado com Redux Toolkit (slice devices + RTK Query)
- [x] Controle de dispositivos (ligar/desligar, ajustar brilho)
- [x] Offline First com AsyncStorage e Redux Persist (cache + reidratação + persistência em background)
- [ ] Integração com API REST ou MQTT/WebSocket para IoT (substituir mock)
- [ ] Indicadores de conexão e estado dos dispositivos

---

## Referências

- [React Native – Documentação](https://reactnative.dev/docs/getting-started)
- [React Native – Configuração do ambiente](https://reactnative.dev/docs/set-up-your-environment)
- [Troubleshooting React Native](https://reactnative.dev/docs/troubleshooting)
- [React Navigation – Documentação](https://reactnavigation.org/docs/getting-started)
- [React Navigation – TypeScript](https://reactnavigation.org/docs/typescript)
- [Redux Toolkit – Documentação](https://redux-toolkit.js.org/introduction/getting-started)
- [RTK Query – Overview](https://redux-toolkit.js.org/rtk-query/overview)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) – ícones (Ionicons, MaterialIcons, etc.)
- [redux-persist](https://github.com/rt2zz/redux-persist) – persistência do Redux (ex.: com AsyncStorage)
- [React Native AsyncStorage](https://react-native-async-storage.github.io/async-storage/) – armazenamento local assíncrono

---

*Projeto de portfólio – React Native CLI e IoT.*
