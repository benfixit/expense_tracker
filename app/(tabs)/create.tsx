import { View, Text, StyleSheet, TextInput, Pressable, Alert, Platform } from 'react-native';
import { router, UnknownOutputParams, useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { v4 } from "uuid";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { categories } from '@/constants/categories';
import { CategoryType, ExpenseType } from '@/typings';
import { useExpenses } from '@/store/ExpensesProvider';

export default function CreateScreen() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [category, setCategory] = useState<CategoryType>(categories[0]);
  const params = useLocalSearchParams<UnknownOutputParams & { category: string}>();
  const { updateExpenses } = useExpenses();

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

  const submitExpense = () => {
    if (!amount || !title) {
      Alert.alert("All fields are required");
      return;
    }

    const expense: ExpenseType = {
      id: v4(),
      title, 
      amount: Number(amount),
      category: category.id,
      date: date.toString()
    }

    console.log("data ::: ", expense);

    return;

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
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>Date</Text>
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
                  <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", columnGap: 8 }}>
                    <Pressable onPress={togglePicker} style={{ flex: 1, height: 40, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", borderColor: "#888888", borderRadius: 8, borderWidth: 1 }}><Text>Cancel</Text></Pressable>
                    <Pressable onPress={() => iosHandleDateChange(date)} style={{ flex: 1, height: 40, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#000000", borderRadius: 8, }}><Text style={{ color: "#ffffff" }}>OK</Text></Pressable>
                  </View>
                )}
              </>
            )}
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
  datePicker: {
    maxHeight: 120,
    marginTop: -20,
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
