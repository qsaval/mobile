import {Button, FlatList, Image, StatusBar, Text, View} from 'react-native'
import React, {useEffect, useState} from "react";
import BdCarousel from "./BdCarousel";
import {createStackNavigator} from "@react-navigation/stack";
import axios from "axios";
import Detail from "./Detail";
import FilleCategorie from "./FilleCategorie";
import Bd from "./Bd";

function HomeScreen({navigation}){
    const [cat, setCat] = useState([])
    const [bd, setBd] = useState([])

    useEffect(()=>{
        axios.get('http://10.0.2.2:8000/lireFirstBd.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')
            .then(r => setBd(r.data))
            .catch(e => console.log(e))
    },[])

    useEffect(()=>{
        axios.get('http://10.0.2.2:8000/lireCatMere.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')
            .then(r => setCat(r.data))
            .catch(e => console.log(e))
    },[])

    return (
        <View>
            <StatusBar hidden={true}/>
            <View style={{alignItems: 'center'}}>
                <Image source={require('../assets/image/logo.png')} style={{width:100, height:100, marginBottom: 30, padding: 24, marginTop: 20 }}/>
            </View>
            <BdCarousel bds={bd} />
            <View style={{ padding: 24, marginTop: 20 }}>
                <View style={{flexDirection: 'row', margin:20}}>
                    <View style={{marginEnd:10}} >
                        {/*<Image style={{width: 100, height: 100}} source={categorie.image}/>*/}
                        <Button title="bd" onPress={() => navigation.navigate({
                            name: "BD",
                            params: { id: 1, nom_categorie: "bd" }
                        })}/>
                    </View>
                    {cat.map((categorie) =>
                        <View key={categorie.id} style={{marginEnd:10}} >
                            {/*<Image style={{width: 100, height: 100}} source={categorie.image}/>*/}
                            <Button title={categorie.nom_categorie} onPress={() => navigation.navigate({
                                name: categorie.nom_categorie,
                                params: { id: categorie.id, nom_categorie: categorie.nom_categorie }
                            })}/>
                        </View>
                    )}
                </View>
            </View>
        </View>

    )
}

const BdScreen = ({route}) => {
    return (
        <Bd value={route.params.id}/>
    )
};

const ComicScreen = ({route}) => {
    return (
        <FilleCategorie value={route.params.id} categorie={route.params.nom_categorie}/>
    )
};



const Home = () => {

    const Stack = createStackNavigator()
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="home" component={HomeScreen}/>
            <Stack.Screen name="BD" component={BdScreen}/>
            <Stack.Screen name="Comic" component={ComicScreen}/>
            <Stack.Screen name="Manga" component={ComicScreen}/>
        </Stack.Navigator>
    );
};

export default Home;