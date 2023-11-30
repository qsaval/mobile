import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Home from './components/Home';
import Categorie from "./components/Categorie";

const tab = createBottomTabNavigator()

export default function App(){

    return(
        <NavigationContainer>
            <tab.Navigator screenOptions={{
                tabBarActiveBackgroundColor: '#65A9F6',
                tabBarStyle: { backgroundColor: '#0078FF'},
                tabBarLabelStyle: { display: 'none' }
            }}>
                <tab.Screen name="Home" component={Home} options={{ tabBarIcon: () => (
                        <Entypo name="home" size={24} color="white" />
                    ),
                    headerShown: false
                }}/>
                <tab.Screen name="listeCategorie" component={Categorie} options={{ tabBarIcon: () => (
                        <AntDesign name="book" size={24} color="white" />
                    ),
                    headerShown: false
                }}/>
            </tab.Navigator>
        </NavigationContainer>)
}