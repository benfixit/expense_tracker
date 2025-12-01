import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';

import { router, UnknownOutputParams, useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { categories } from '@/constants/categories';
import { CategoryType, ExpenseType } from '@/typings';
import { useExpenses } from '@/store/ExpensesProvider';

export default function CreateScreen() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<CategoryType>(categories[0]);
  const params = useLocalSearchParams<UnknownOutputParams & { category: string}>();
  const { updateExpenses } = useExpenses();

  useEffect(() => {
    if (params.category) {
      const selectedCategory = categories.find(category => category.id === Number(params.category)) as CategoryType;

      setCategory(selectedCategory);
    }
  }, []);

  const submitExpense = () => {
    if (!amount || !title) {
      Alert.alert("All fields are required");
      return;
    }

    const expense: ExpenseType = {
      id: "",
      title, 
      amount: Number(amount),
      category: category.id,
      date: "today"
    }

    updateExpenses(expense);

    Alert.alert("Successfully added");

    console.log("data ::: ", amount, title)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.caption}>Add new expense</Text>
          <Text style={styles.meta}>Enter the details of your expense to help you track your spending</Text>
        </View>
        <View style={styles.form}>
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>Title</Text>
            <TextInput placeholder="What was it for" value={title} onChangeText={setTitle} style={styles.textInput} />
          </View>
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>Amount</Text>
            <TextInput placeholder="$0.00" value={amount} onChangeText={setAmount} style={styles.textInput} />
          </View>
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>Category</Text>
            <Pressable 
              style={{ borderWidth: 1, borderColor: "#888888", borderRadius: 10, paddingHorizontal: 16, paddingBottom: 16, paddingTop: 16, display: "flex", flexDirection: "row" }}
              onPress={() => router.navigate("/categories")}>
              <Text style={{ marginRight: 8 }}>{category.icon}</Text>
              <Text>{category.title}</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.submit}>
            <Pressable style={{ 
                          borderWidth: 1, 
                          borderColor: "#888888", 
                          borderRadius: 10, 
                          paddingHorizontal: 24, 
                          paddingBottom: 24, 
                          paddingTop: 24, 
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "row", 
                          backgroundColor: "#000000" 
                        }}
                        onPress={submitExpense}>
              <Text style={{ color: "#ffffff", fontSize: 20 }}>Add Expense</Text>
            </Pressable>
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
    gap: 8,
  },
  heading: {
    marginBottom: 24
  },
  caption: {
    fontSize: 32,
    fontWeight: "bold"
  },
  meta: {
    fontSize: 16,
    color: "#555555"
  },
  form: {
    marginBottom: 24
  },
  textInput: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderColor: "#888888",
    borderWidth: 1,
    borderRadius: 10
  },
  submit: {
  }
});
