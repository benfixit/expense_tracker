import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useSettings } from '@/store/SettingsProvider';
import { Currency } from '@/typings';
import { currencyOptions } from '@/constants/app';

export default function InsightsScreen() {
  const { currency, updateSettings } = useSettings();

  const onSetCurrency = (currency: Currency) => {
    updateSettings({ currency })

  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Currency</Text>
          <Picker 
            selectedValue={currency} 
            onValueChange={onSetCurrency}
            prompt='Select currency'
          >
            {currencyOptions.map(option => (
              <Picker.Item label={option.title} value={option.value} />
            ))}
          </Picker>
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
});
