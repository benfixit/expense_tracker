import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function EmptyExpenses() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.icon}>
            📝
          </Text>
          <Text style={styles.greeting}>
            No Expenses yet.
          </Text>
          <Text style={styles.message}>Add a new expense to see it in your list.</Text>
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
  icon: { 
    fontSize: 40, 
    marginBottom: 16, 
    textAlign: "center" 
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
