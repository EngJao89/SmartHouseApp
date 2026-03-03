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
| **IoT** | Integração com serviços de IoT (APIs REST, MQTT, WebSockets) para controle e monitoramento de dispositivos. |
| **UX mobile** | Interface pensada para controle rápido, feedback visual e estados de conexão. |

---

## Stack técnico

- **React Native** 0.84 (CLI)
- **React** 19.x
- **TypeScript**
- **React Navigation** – navegação (Bottom Tabs + Native Stack), com tipagem para `useNavigation` e `useRoute`
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

---

## Estrutura do projeto

```
SmartHouseApp/
├── App.tsx                 # Componente raiz (SafeAreaProvider + NavigationContainer)
├── index.js                # Entry point
├── src/
│   ├── navigation/         # Configuração de rotas
│   │   ├── types.ts        # Tipos das rotas (ParamList) e declare global (RootParamList)
│   │   ├── RootNavigator.tsx   # Bottom Tabs (Dispositivos, Automações, Perfil)
│   │   └── DispositivosStack.tsx   # Stack dentro da tab Dispositivos (lista → detalhe)
│   └── screens/
│       ├── DispositivosListScreen.tsx   # Lista de dispositivos (useNavigation tipado)
│       ├── DeviceDetailScreen.tsx       # Detalhe do dispositivo (useRoute tipado)
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

- **Bottom Tabs** (raiz): três abas — **Dispositivos**, **Automações**, **Perfil**.
- **Stack** na aba **Dispositivos**:
  - **DispositivosList** – lista de dispositivos (mock); ao tocar em um item, navega para o detalhe.
  - **DeviceDetail** – tela de detalhe que recebe `deviceId` e `deviceName` pelos parâmetros da rota.

### Tipagem

- **`src/navigation/types.ts`** define os *param lists* (`DispositivosStackParamList`, `RootTabParamList`) e o `declare global` para `ReactNavigation.RootParamList`, permitindo que `useNavigation()` e `useRoute()` sejam inferidos corretamente em todo o app.
- **`useNavigation`**: nas telas do stack (ex.: `DispositivosListScreen`), o hook é tipado com `NativeStackNavigationProp<DispositivosStackParamList, 'DispositivosList'>` para navegação type-safe (ex.: `navigation.navigate('DeviceDetail', { deviceId, deviceName })`).
- **`useRoute`**: na tela de detalhe, o hook é tipado com `RouteProp<DispositivosStackParamList, 'DeviceDetail'>` para acessar `route.params.deviceId` e `route.params.deviceName` com autocomplete e checagem de tipos.

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
- [ ] Integração com API REST ou MQTT/WebSocket para IoT
- [ ] Controle de dispositivos (ligar/desligar, ajustar parâmetros)
- [ ] Indicadores de conexão e estado dos dispositivos
- [ ] Persistência local (ex.: AsyncStorage) para preferências

---

## Referências

- [React Native – Documentação](https://reactnative.dev/docs/getting-started)
- [React Native – Configuração do ambiente](https://reactnative.dev/docs/set-up-your-environment)
- [Troubleshooting React Native](https://reactnative.dev/docs/troubleshooting)
- [React Navigation – Documentação](https://reactnavigation.org/docs/getting-started)
- [React Navigation – TypeScript](https://reactnavigation.org/docs/typescript)

---

*Projeto de portfólio – React Native CLI e IoT.*
