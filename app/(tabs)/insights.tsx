import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PieChart, pieDataItem } from 'react-native-gifted-charts';
import { useExpenses } from '@/store/ExpensesProvider';
import { useMemo } from 'react';
import { categories } from '@/constants/categories';
import { ExpenseType, InsightCategoryType } from '@/typings';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function InsightsScreen() {
  const { expenses } = useExpenses();

  const groupExpensesByCategory = (expenses: Array<ExpenseType>) => {
    console.log("processing the expenses");
    const totalExpenses = expenses.reduce((acc, expense) => acc += expense.amount, 0);

    const pieChartData: Array<pieDataItem> = [];
    const flatListData: Array<InsightCategoryType> = [];

    categories.forEach(category => {
      const expensesUnderCategory = expenses.filter(expense => expense.category === category.id);

      if (expensesUnderCategory.length > 0) {
        const categoryTotal= expensesUnderCategory.reduce((acc, expense) => acc += expense.amount, 0);
        const percentage = (categoryTotal / totalExpenses) * 100;

        pieChartData.push({ text: `${percentage.toFixed(2)}%`, value: categoryTotal, textBackgroundColor: category.color });

        flatListData.push({ title: category.title, amount: categoryTotal, percentage, color: category.color });
      }
    });

    return { pieChartData, flatListData };

  };

    const { pieChartData, flatListData } = useMemo(() => groupExpensesByCategory(expenses), [expenses]);

  const renderItem = (item: InsightCategoryType) => {
    return (
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingVertical: 16 }}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Ionicons name='ellipse' size={12} color={item.color} style={{ marginRight: 8 }} />
          <Text>
            {item.title}
          </Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>
            ${item.amount.toFixed(2)}
          </Text>
          <Text style={{ textAlign: "right" }}>
            {item.percentage.toFixed(2)}%
          </Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 32, fontWeight: "bold", textAlign: "center" }}>Spending Summary</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <PieChart showText donut data={pieChartData} textColor="#ffffff" innerRadius={50} />
        </View>
        <FlatList showsVerticalScrollIndicator={false} data={flatListData} renderItem={({ item }) => renderItem(item)} keyExtractor={(item) => item.title} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#efefef",
    paddingVertical: 24,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
});
