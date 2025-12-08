import { router } from 'expo-router';
import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { categories } from '@/constants/categories';
import { CategoryType } from '@/typings';

export default function CategoriesScreen() {
  const renderCategories = (category: CategoryType) => {
    return (
      <Pressable 
        style={styles.catPressable} 
        onPress={() => {
          router.dismissTo({ pathname: "/create", params: { category: category.id }});
        }}>
        <Text style={styles.catIcon}>
          {category.icon}
        </Text>
        <Text>
          {category.title}
        </Text>
      </Pressable>
    );
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <Text style={styles.categoryText}>Select Category</Text>
          <Text>Select a category that best describes what you spent money on</Text>
        </View>
        <FlatList 
          style={styles.flatList} 
          showsVerticalScrollIndicator={false} 
          renderItem={({ item }) => renderCategories(item)} 
          data={categories} 
          numColumns={2} 
          keyExtractor={category => category.id.toString()} 
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  view: { 
    marginBottom: 16
  },
  categoryText: { 
    fontWeight: "bold", 
    fontSize: 32, 
    marginBottom: 8
  },
  flatList: { 
    width: "100%"
  },
  link: {
    marginTop: 16,
    paddingVertical: 16,
  },
  catPressable: { 
    alignItems: "center", 
    backgroundColor: "#ffffff", 
    borderColor: "transparent", 
    borderRadius: 8, 
    borderWidth: 1, 
    display: "flex", 
    flex: 1,
    flexDirection: "column",
    justifyContent: "center", 
    margin: 8, 
    padding: 24 
  },
  catIcon: { 
    marginBottom: 8 
  }
});
