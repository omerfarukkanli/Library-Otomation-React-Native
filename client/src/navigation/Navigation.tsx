import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "../screens/Login/LoginScreen"
import RegisterScreen from "../screens/Register/RegisterScreen"
import HomeScreen from "../screens/Home/HomeScreen"
import BookDetailScreen from "../screens/BookDetail/BookDetailScreen"
import ProfileScreen from "../screens/Profile/ProfileScreen"
import HeaderButton from "../components/HeaderButton/HeaderButton"

const Stack = createStackNavigator()

const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{
            headerRight: () => (
                <HeaderButton />
            ),
            headerTitleAlign: "center",
            headerStyle: {
                backgroundColor: "tomato"
            },
            headerTintColor: "white",
            headerTitleStyle: {
                fontWeight: "bold",
            }
        }
        }>
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={HomeScreen} options={{ title: "Ana Sayfa" }} />
            <Stack.Screen name='Bookdetail' component={BookDetailScreen}options={{ title: "Kitap Detay" }} />
            <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerRight: undefined ,title:"Profil"}} />

        </Stack.Navigator>
    )
}

export default Navigation 