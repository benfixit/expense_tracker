import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function EmptyInsights() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={{ fontSize: 40, marginBottom: 16, textAlign: "center" }}>
            📝
          </Text>
          <Text style={styles.greeting}>
            No Insights yet.
          </Text>
          <Text style={styles.message}>Add a new expense to see some insights.</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#efefef",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
},
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8
  },
  message: {
    color: "#666666"
  }
});
