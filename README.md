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
| **IoT** | Integração com serviços de IoT (APIs REST, MQTT, WebSockets) para controle e monitoramento de dispositivos. |
| **UX mobile** | Interface pensada para controle rápido, feedback visual e estados de conexão. |

---

## Stack técnico

- **React Native** 0.84 (CLI)
- **React** 19.x
- **TypeScript**
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
├── App.tsx                 # Componente raiz da aplicação
├── index.js                # Entry point
├── android/                # Projeto nativo Android
├── ios/                    # Projeto nativo iOS
├── __tests__/              # Testes (Jest)
├── metro.config.js         # Configuração do Metro
├── babel.config.js
├── tsconfig.json
└── package.json
```

Conforme o app crescer, a organização pode incluir pastas como `src/screens`, `src/components`, `src/services` (IoT/API), `src/hooks`, etc.

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

- [ ] Telas de listagem e detalhe de dispositivos
- [ ] Integração com API REST ou MQTT/WebSocket para IoT
- [ ] Controle de dispositivos (ligar/desligar, ajustar parâmetros)
- [ ] Indicadores de conexão e estado dos dispositivos
- [ ] Persistência local (ex.: AsyncStorage) para preferências

---

## Referências

- [React Native – Documentação](https://reactnative.dev/docs/getting-started)
- [React Native – Configuração do ambiente](https://reactnative.dev/docs/set-up-your-environment)
- [Troubleshooting React Native](https://reactnative.dev/docs/troubleshooting)

---

*Projeto de portfólio – React Native CLI e IoT.*
