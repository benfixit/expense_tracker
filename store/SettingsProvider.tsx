import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { APP_NAME } from "@/constants/app";
import { Currency, SettingsType } from "@/typings";

type Props = {
    children: ReactNode;
};

type ValueType = {
    currency: Currency;
    updateSettings: (settings: SettingsType) => void;
}

const STORAGE_KEY = `${APP_NAME}_settings`;

const SettingsContext = createContext<ValueType>({ currency: "NGN", updateSettings: () => {} });

const SettingsProvider = ({ children }: Props) => {
    const [settings, setSettings] = useState<SettingsType>({ currency: "NGN" });
    const { getItem, setItem } = useAsyncStorage(STORAGE_KEY);

    useEffect(() => {
        const fetchSettings = async () => {
            const data = await getItem();

            if (data) {
                const settings = JSON.parse(data) as SettingsType;
                setSettings(settings);
            }
        }

        fetchSettings();

    }, []);

    const updateSettings = async (data: Partial<SettingsType>) => {
        const newSettings = {...settings, ...data};

        setSettings(newSettings);
        await setItem(JSON.stringify(newSettings));
    }

    return (
        <SettingsContext.Provider value={{ currency: settings["currency"], updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => {
    const { currency, ...rest } = useContext(SettingsContext);

    if (!currency) {
        throw new Error("Couldn't find settings. Do not forget to wrap your component with the Settings Provider?");
    }

    return { currency, ...rest }
}

export default SettingsProvider;