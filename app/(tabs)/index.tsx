import { View, Text, StyleSheet, FlatList } from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CategoryType, ExpenseType } from "@/typings";
import { categories } from '@/constants/categories';
import { expenses } from '@/constants/expenses';
import EmptyExpenses from '@/components/EmptyExpenses';

export default function HomeScreen() {
  const renderExpenses = (expense: ExpenseType) => {
    const category = categories.find(category => category.id === expense.category) as CategoryType;

    return (
      <View style={styles.itemWrapper}>
        <Text style={styles.icon}>{category.icon}</Text>
        <View style={styles.title}>
          <Text>{expense.title}</Text>
          <Text style={{ backgroundColor: category.color, borderRadius: 8, paddingHorizontal: 4, paddingVertical: 2 }}>{category.title}</Text>
        </View>
        <View style={styles.price}>
          <Text>${expense.amount}</Text>
          <Text>{expense.date}</Text>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.intro}>
          <Text style={styles.greeting}>
            Hello 👋
          </Text>
          <Text style={styles.message}>Start tracking your expenses easily.</Text>
        </View>
        <View style={styles.summary}>
          <Text style={{ fontSize: 16, color: "#cdcdcd", textAlign: "center" }}>Spent so far</Text>
          <Text style={{ fontSize: 40, color: "#ffffff", textAlign: "center" }}>$1000</Text>
        </View>
        {expenses ? <FlatList style={styles.list} showsVerticalScrollIndicator={false} renderItem={({ item }) => renderExpenses(item)} data={expenses} keyExtractor={(item) => item.id} /> : <EmptyExpenses />}
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
    gap: 8,
  },
  intro: {
    marginBottom: 16
  },
  greeting: {
    fontSize: 32,
    fontWeight: "bold"
  },
  message: {
    color: "#666666"
  },
  summary: {
    backgroundColor: "#000000",
    color: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  itemWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 8,
    marginBottom: 8,
    padding: 12,
    backgroundColor: "#ffffff",
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 12
  },
  icon: {
    width: 60,
    height: 60,
    backgroundColor: "#eeeeee",
    borderRadius: 12,
    borderColor: "transparent",
    borderWidth: 1,
    display: "flex",
    marginRight: 16,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 24
  },
  title: {
    flex: 3,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
  },
  price: {
    flex: 1
  }
});
