import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DropdownPicker from 'react-native-dropdown-picker';
import { useSettings } from '@/store/SettingsProvider';
import { currencyOptions } from '@/constants/app';

const items = currencyOptions.map(item => {
  return {
    label: item.title,
    value: item.value
  }
})

export default function SettingsScreen() {
  const { currency, updateSettings } = useSettings();
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectValue, setSelectValue] = useState(currency);
  const [selectItems, setSelectItems] = useState(items);
  const [themeEnabled, setThemeEnabled] = useState(false);

  useEffect(() => {
    updateSettings({ currency: selectValue })
  }, [selectValue]);

  const toggleSwitch = () => {
    setThemeEnabled(!themeEnabled);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.themeWrapper}>
          <Text style={styles.themeText}>Theme</Text>
          <View style={styles.themeView}>
            <Text>Dark Mode</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#009900" }}
              thumbColor={ themeEnabled ? "#ffffff" : '#f4f3f4' }
              ios_backgroundColor={"#3e3e3e"}
              onValueChange={toggleSwitch}
              value={themeEnabled}
              style={styles.themeSwitch} // Example of resizing
            />
          </View>
        </View>
        <View style={styles.currencyView}>
          <Text style={styles.currencyText}>Currency</Text>
          <DropdownPicker
            open={selectOpen}
            value={selectValue}
            items={selectItems}
            setOpen={setSelectOpen}
            setValue={setSelectValue}
            setItems={setSelectItems}
            placeholder='Choose a currency.'
            style={styles.dropdownPicker}
          />
        </View>
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
  themeWrapper: { 
    marginBottom: 16 
  },
  themeText: { 
    fontWeight: "bold", 
    fontSize: 20, 
    marginBottom: 16 
  },
  themeView: { 
    borderWidth: 1, 
    borderColor: "#888888", 
    borderRadius: 10, 
    paddingHorizontal: 8, 
    paddingVertical: 10, 
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between" 
  },
  themeSwitch: { 
    transform: [{ scaleX: 0.7 }, { scaleY: 0.8 }] 
  },
  currencyView: { 
    marginBottom: 16 
  },
  currencyText: { 
    fontWeight: "bold", 
    fontSize: 20, 
    marginBottom: 16 
  },
  dropdownPicker: { 
    borderColor: "#888888" 
  }
});
