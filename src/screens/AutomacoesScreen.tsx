import { StyleSheet, Text, View } from 'react-native';

export function AutomacoesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Automações</Text>
      <Text style={styles.placeholder}>Em breve: cenários e rotinas.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  placeholder: {
    fontSize: 14,
    color: '#666',
  },
});
