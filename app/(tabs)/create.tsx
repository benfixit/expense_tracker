import 'react-native-get-random-values';
import { View, Text, StyleSheet, TextInput, Pressable, Alert, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { router, UnknownOutputParams, useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import Toast from 'react-native-toast-message';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { categories } from '@/constants/categories';
import { CategoryType, ExpenseType } from '@/typings';
import { useExpenses } from '@/store/ExpensesProvider';

export default function CreateScreen() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [category, setCategory] = useState<CategoryType>(categories[0]);
  const params = useLocalSearchParams<UnknownOutputParams & { category: string, expenseId: ExpenseType['id']}>();
  const { expenses, addExpense, editExpense } = useExpenses();
  const [newExpense, setNewExpense] = useState<ExpenseType | null>(null);

  useEffect(() => {
    if (params.expenseId) {
      const expense = expenses.find(expense => expense.id === params.expenseId) as ExpenseType;
      setNewExpense(expense);

      const selectedCategory = categories.find(category => category.id === expense.category) as CategoryType;

      setTitle(expense.title);
      setAmount(expense.amount);
      setCategory(selectedCategory);
      setDate(new Date(expense.date));
    }
  }, [params.expenseId]);

  useEffect(() => {
    if (params.category) {
      const selectedCategory = categories.find(category => category.id === Number(params.category)) as CategoryType;

      setCategory(selectedCategory);
    }
  }, [params.category]);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const { type } = event;

    if (type === "set") {
      setDate(selectedDate as Date);
    }

    if (Platform.OS === "android") {
      togglePicker();
    }
  }

  const iosHandleDateChange = (selectedDate?: Date) => {
      setDate(selectedDate as Date);

      togglePicker();
  }

  const togglePicker = () => {
    setShowPicker(!showPicker);
  }

  const handleAmount = (amount: string) => {
    const trimmedAmount = amount.replace(/[^0-9]/g, "");
    setAmount(Number(trimmedAmount));
  }

  const submitExpense = () => {
    if (!title) {
      Alert.alert("The title field is required");
      return;
    }

    if (!amount) {
      Alert.alert("The amount field is required");
      return;
    }

    let message = "Expense successfully added";

    // Edit operation
    if (newExpense !== null) {
      newExpense.title = title;
      newExpense.amount = amount;
      newExpense.category = category.id;
      newExpense.date = date.toDateString();

      message = "Expense successfully edited";

      setNewExpense(newExpense);
      editExpense(newExpense);
    } else {
      const expense: ExpenseType = {
        id: uuidv4(),
        title, 
        amount,
        category: category.id,
        date: date.toDateString()
      }

      addExpense(expense);
    }

    Toast.show({
      type: "success",
      text1: message,
    });

    // Reset form data
    setTitle('');
    setAmount(0);
    setDate(new Date());
    setCategory(categories[0]);

    router.navigate({ pathname: "/" });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.heading}>
            <Text style={styles.caption}>Add new expense</Text>
            <Text style={styles.meta}>Enter the details of your expense to help you track your spending</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.itemView}>
              <Text style={styles.itemText}>Title</Text>
              <TextInput placeholder="What was it for" value={title} onChangeText={setTitle} style={styles.textInput} />
            </View>
            <View style={styles.itemView}>
              <Text style={styles.itemText}>Amount</Text>
              <TextInput 
                placeholder="$0.00" 
                value={amount.toString()} 
                onChangeText={handleAmount} 
                style={styles.textInput} 
                keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"} 
              />
            </View>
            <View style={styles.itemView}>
              <Text style={styles.itemText}>Category</Text>
              <Pressable 
                style={styles.categoryPressable}
                onPress={() => router.navigate("/categories")}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text>{category.title}</Text>
              </Pressable>
            </View>
            <View>
              <Text style={styles.itemText}>Date</Text>
              <Pressable onPress={togglePicker}>
                <TextInput 
                  placeholder={(new Date()).toDateString()} 
                  value={date.toDateString()} 
                  style={styles.textInput} 
                  editable={false}
                  onPressIn={togglePicker}
                />
              </Pressable>
              {showPicker && (
                <>
                  <DateTimePicker mode='date' display='spinner' value={date} onChange={handleDateChange} style={styles.datePicker} />
                  {Platform.OS === "ios" && (
                    <View style={styles.datePickerView}>
                      <Pressable onPress={togglePicker} style={styles.datePickerCancel}>
                        <Text>Cancel</Text>
                      </Pressable>
                      <Pressable onPress={() => iosHandleDateChange(date)} style={styles.datePickerOk}>
                        <Text style={styles.datePickerOkText}>OK</Text>
                      </Pressable>
                    </View>
                  )}
                </>
              )}
            </View>
          </View>
          <View>
              <Pressable 
                style={styles.submitPressable}
                onPress={submitExpense}
              >
                <Text style={styles.submitText}>Add Expense</Text>
              </Pressable>
          </View>
          <Toast />
        </SafeAreaView>
      </SafeAreaProvider>
    </TouchableWithoutFeedback>
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
  itemView: {
    marginBottom: 24
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8
  },
  amountView: {},
  amountText: {},
  categoryPressable: { 
    borderWidth: 1, 
    borderColor: "#888888", 
    borderRadius: 10, 
    paddingHorizontal: 16, 
    paddingBottom: 16, 
    paddingTop: 16, 
    display: "flex", 
    flexDirection: "row" 
  },
  categoryIcon: { 
    marginRight: 8 
  },
  datePicker: {
    maxHeight: 120,
    marginTop: -20,
  },
  datePickerView: { 
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "space-around", 
    columnGap: 8 
  },
  datePickerCancel: { 
    flex: 1, 
    height: 40, 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#ffffff", 
    borderColor: "#888888", 
    borderRadius: 8, 
    borderWidth: 1 
  },
  datePickerOk: { 
    flex: 1, 
    height: 40, 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#000000", 
    borderRadius: 8
  },
  datePickerOkText: { 
    color: "#ffffff"
  },
  textInput: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderColor: "#888888",
    borderWidth: 1,
    borderRadius: 10
  },
  submitPressable: { 
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
  },
  submitText: { 
    color: "#ffffff", 
    fontSize: 20 
  }
});
