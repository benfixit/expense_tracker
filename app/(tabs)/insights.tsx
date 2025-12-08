import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PieChart, pieDataItem } from 'react-native-gifted-charts';
import { useExpenses } from '@/store/ExpensesProvider';
import { useMemo } from 'react';
import { categories } from '@/constants/categories';
import { ExpenseType, InsightCategoryType } from '@/typings';
import Ionicons from '@react-native-vector-icons/ionicons';
import EmptyInsights from '@/components/EmptyInsights';

export default function InsightsScreen() {
  const { expenses, totalExpenses } = useExpenses();

  const groupExpensesByCategory = (expenses: Array<ExpenseType>) => {
    console.log("processing the expenses");

    const pieChartData: Array<pieDataItem> = [];
    const flatListData: Array<InsightCategoryType> = [];

    categories.forEach(category => {
      const expensesUnderCategory = expenses.filter(expense => expense.category === category.id);

      if (expensesUnderCategory.length > 0) {
        const categoryTotal= expensesUnderCategory.reduce((acc, expense) => acc += expense.amount, 0);
        const percentage = (categoryTotal / totalExpenses) * 100;

        pieChartData.push({ text: `${percentage.toFixed(2)}%`, value: categoryTotal, color: category.color, labelPosition: "outward" });

        flatListData.push({ title: category.title, amount: categoryTotal, percentage, color: category.color });
      }
    });

    return { pieChartData, flatListData };

  };

  const { pieChartData, flatListData } = useMemo(() => groupExpensesByCategory(expenses), [expenses]);

  const renderItem = (item: InsightCategoryType) => {
    return (
      <View style={styles.renderItemView}>
        <View style={styles.renderIconView}>
          <Ionicons name='ellipse' size={12} color={item.color} style={styles.renderIcon} />
          <Text>
            {item.title}
          </Text>
        </View>
        <View>
          <Text style={styles.itemAmount}>
            ${item.amount.toFixed(2)}
          </Text>
          <Text style={styles.itemPercentage}>
            {item.percentage.toFixed(2)}%
          </Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <Text style={styles.summary}>Spending Summary</Text>
        </View>
        {expenses.length ? (
          <>
            <View style={styles.viewChart}>
              <PieChart 
                // showText 
                donut 
                data={pieChartData} 
                // textColor="#ffffff" 
                innerRadius={50}
                // textColor="black"
                radius={150}
                // textSize={10}
                // showTextBackground
                // textBackgroundRadius={26}
              />
            </View>
            <FlatList 
              showsVerticalScrollIndicator={false} 
              data={flatListData} 
              renderItem={({ item }) => renderItem(item)} 
              keyExtractor={(item) => item.title} 
            />
          </>
        ) : <EmptyInsights />}
        
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
  view: { 
    marginBottom: 24 
  },
  summary: { 
    fontSize: 32, 
    fontWeight: "bold", 
    textAlign: "center" 
  },
  viewChart: { 
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "center" 
  },
  renderItemView: { 
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "space-between", 
    paddingVertical: 16 
  },
  renderIconView: { 
    display: "flex", 
    flexDirection: "row",
    alignItems: "center"
  },
  renderIcon: { 
    marginRight: 8 
  },
  itemAmount: { 
    fontWeight: "bold" 
  },
  itemPercentage: { 
    textAlign: "right" 
  }
});
