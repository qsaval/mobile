import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Home from './components/Home';
import Categorie from "./components/Categorie";
import Panier from "./components/Panier";


const tab = createBottomTabNavigator()

export default function App(){

    return(
        <NavigationContainer>
            <tab.Navigator screenOptions={{
                tabBarActiveBackgroundColor: '#4173ef',
                tabBarStyle: { backgroundColor: 'blue'},
                tabBarLabelStyle: { display: 'none' }
            }}>
                <tab.Screen name="Home" component={Home} options={{ tabBarIcon: () => (
                        <Entypo name="home" size={24} color="white" />
                    ),
                    headerShown: false
                }}/>
                <tab.Screen name="Categorie" component={Categorie} options={{ tabBarIcon: () => (
                        <AntDesign name="book" size={24} color="white" />
                    ),
                    headerShown: false
                }}/>
                <tab.Screen name="Panier" component={Panier} options={{ tabBarIcon: () => (
                        <AntDesign name="shoppingcart" size={24} color="white" />
                    )
                }}/>
            </tab.Navigator>
        </NavigationContainer>)
}