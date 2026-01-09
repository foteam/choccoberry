import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'


import MenuScreen from './src/screens/MenuScreen'

const Stack = createNativeStackNavigator()

const queryClient = new QueryClient()

export default function App() {
    return (
        <>
            {/* ✅ UI Kitten Icons */}

            {/* ✅ UI Kitten Theme */}
            <ApplicationProvider {...eva} theme={eva.light}>
                {/* ✅ React Query */}
                <QueryClientProvider client={queryClient}>
                    {/* ✅ Navigation */}
                    <NavigationContainer>
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="Menu" component={MenuScreen} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </QueryClientProvider>
            </ApplicationProvider>
        </>
    )
}
