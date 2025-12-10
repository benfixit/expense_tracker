import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { format } from "date-fns";
import { SwipeListView } from 'react-native-swipe-list-view';
import { CategoryType, CurrencyOptionsType, ExpenseType } from "@/typings";
import { categories } from '@/constants/categories';
import EmptyExpenses from '@/components/EmptyExpenses';
import { useExpenses } from '@/store/ExpensesProvider';
import { useSettings } from '@/store/SettingsProvider';
import { currencyOptions } from '@/constants/app';
import Ionicons from '@react-native-vector-icons/ionicons';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { expenses, totalExpenses, deleteExpense } = useExpenses();
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
          <Text style={{ ...styles.category, backgroundColor: category.color }}>{category.title}</Text>
        </View>
        <View style={styles.price}>
          <Text style={styles.amount}>{currency.symbol}{expense.amount}</Text>
          <Text style={styles.date}>{format(expense.date, 'yyyy-MM-dd')}</Text>
        </View>
      </View>
    );
  }

  const renderHiddenItem = (expense: ExpenseType) => {
    return (
      <View style={styles.hiddenView}>
        <Pressable style={{ ...styles.hiddenPressable, ...styles.hiddenPressableEdit }} onPress={() => {
          // navigate to the create page and pass in the param
          router.navigate({ pathname: "/create", params: { expenseId: expense.id }});
        }}>
            <Ionicons name='create' size={24} color={"#ffffff"}></Ionicons>
        </Pressable>
        <Pressable style={{ ...styles.hiddenPressable, ...styles.hiddenPressableDelete }} onPress={() => deleteExpense(expense)}>
            <Ionicons name='trash' size={24} color={"#ffffff"}></Ionicons>
        </Pressable>
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
          <Text style={styles.spent}>Spent so far</Text>
          <Text style={styles.symbol}>{currency.symbol}{totalExpenses}</Text>
        </View>
        {expenses.length ? 
          <SwipeListView
            data={expenses}
            renderItem={({ item }) => renderExpenses(item)}
            renderHiddenItem={({ item }) => renderHiddenItem(item)}
            rightOpenValue={-128}
            disableRightSwipe
          /> : 
          <EmptyExpenses />
        }
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
    borderRadius: 8
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
  },
  amount: { 
    fontWeight: "bold", 
    textAlign: "right" 
  },
  date: { 
    textAlign: "right" 
  },
  category: { 
    borderRadius: 8, 
    paddingHorizontal: 8, 
    paddingVertical: 2 
  },
  spent: { 
    fontSize: 16, 
    color: "#cdcdcd", 
    textAlign: "center" 
  },
  symbol: { 
    fontSize: 40, 
    color: "#ffffff", 
    textAlign: "center" 
  },
  hiddenView: { 
    display: "flex", 
    flexDirection: 'row', 
    justifyContent: "flex-end", 
    flex: 1, 
    alignItems: 'center',
    columnGap: 4
  },
  hiddenPressable: { 
    width: 60, 
    height: "80%", 
    alignItems: "center", 
    justifyContent: "center",
    borderRadius: 8
  },
  hiddenPressableEdit: {
    backgroundColor: "#009900"
  },
  hiddenPressableDelete: {
    backgroundColor: "#990000"
  }
});
