import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { format } from "date-fns";
import { CategoryType, CurrencyOptionsType, ExpenseType } from "@/typings";
import { categories } from '@/constants/categories';
import EmptyExpenses from '@/components/EmptyExpenses';
import { useExpenses } from '@/store/ExpensesProvider';
import { useSettings } from '@/store/SettingsProvider';
import { currencyOptions } from '@/constants/app';

export default function HomeScreen() {
  const { expenses, totalExpenses } = useExpenses();
  const { currency: currencyValue } = useSettings();
  const currency = currencyOptions.find(option => option.value === currencyValue) as CurrencyOptionsType;

  const renderExpenses = (expense: ExpenseType) => {
    const category = categories.find(category => category.id === expense.category) as CategoryType;

    return (
      <View style={styles.itemWrapper}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>{category.icon}</Text>
        </View>
        <View style={styles.title}>
          <Text>{expense.title}</Text>
          <Text style={{ backgroundColor: category.color, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 }}>{category.title}</Text>
        </View>
        <View style={styles.price}>
          <Text style={{ fontWeight: "bold", textAlign: "right" }}>{currency.symbol}{expense.amount}</Text>
          <Text style={{ textAlign: "right" }}>{format(expense.date, 'yyyy-MM-dd')}</Text>
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
          <Text style={{ fontSize: 40, color: "#ffffff", textAlign: "center" }}>{currency.symbol}{totalExpenses}</Text>
        </View>
        {expenses.length ? <FlatList style={styles.list} showsVerticalScrollIndicator={false} renderItem={({ item }) => renderExpenses(item)} data={expenses} keyExtractor={(item) => item.id} /> : <EmptyExpenses />}
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconText: {
    fontSize: 24
  },
  title: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  price: {
    display: "flex",
    justifyContent: "center"
  }
});
