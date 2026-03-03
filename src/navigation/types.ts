import type { NavigatorScreenParams } from '@react-navigation/native';

/**
 * Stack dentro da tab "Dispositivos": lista + tela de detalhe.
 */
export type DispositivosStackParamList = {
  DispositivosList: undefined;
  DeviceDetail: {
    deviceId: string;
    deviceName?: string;
  };
};

/**
 * Bottom Tabs: Dispositivos (com stack interno), Automações, Perfil.
 */
export type RootTabParamList = {
  Dispositivos: NavigatorScreenParams<DispositivosStackParamList>;
  Automacoes: undefined;
  Perfil: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
