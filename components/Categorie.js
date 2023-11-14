import React, {useEffect, useState} from 'react';
import {Button, FlatList, Image, Text, View} from 'react-native';
import axios from "axios";
import {createStackNavigator} from "@react-navigation/stack";
import Liste from "./Liste";
import Detail from "./Detail";
import {NavigationContainer} from "@react-navigation/native";

function CategorieScreen({navigation}) {
    const [data, setData] = useState([{
        id: 10,
        nom_categorie: "bd",
        image: require('../assets/image/bd.png')
    },
        {
            id: 23,
            nom_categorie: "dc",
            image: require('../assets/image/dc.png')
        },
        {
            id: 24,
            nom_categorie: "marvel",
            image: require('../assets/image/marvel.png')
        },
        {
            id: 25,
            nom_categorie: "shonen",
            image: require('../assets/image/shonen.png')
        },
        {
            id: 26,
            nom_categorie: "seinen",
            image: require('../assets/image/seinen.png')
        }]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/lireCategorie.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    },[])

    return (
        <View style={{flex: 1, padding: 24}}>

            <FlatList
                data={data}
                keyExtractor={({id}) => id}
                renderItem={({item}) => (
                    <View style={{marginBottom: 20}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Image style={{justifyContent: "center", width: 290, height: 170}} source={item.image} />
                        </View>
                        <Button title={item.nom_categorie}  onPress={() => navigation.navigate({
                            name: item.nom_categorie,
                            params: { id: item.id, nom_categorie: item.nom_categorie }
                        })} />
                    </View>
                )}
            />
        </View>
    );
}
const ListeScreen = ({route, navigation}) => {

  return(
      <Liste value={route.params.id} titre={route.params.nom_categorie} navigation={navigation}/>
  )
}
const DetailScreen = ({route}) => {

    return(
        <Detail title={route.params.titre} value={route.params.id}/>
    )
}

const Categorie = () => {
    const [categories, setCategories] = useState([{
        id: 10,
        nom_categorie: "bd"
    },
        {
            id: 23,
            nom_categorie: "dc"
        },
        {
            id: 24,
            nom_categorie: "marvel"
        },
        {
            id: 25,
            nom_categorie: "shonen"
        },
        {
            id: 26,
            nom_categorie: "seinen"
        }]);
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name="Categorie" component={CategorieScreen} />
            {categories.map((categorie) => (<Stack.Screen name={categorie.nom_categorie} component={ListeScreen} />))}
            <Stack.Screen name="toto" component={DetailScreen} />
            <Stack.Screen name="tutu" component={DetailScreen} />
            <Stack.Screen name="titi" component={DetailScreen} />
        </Stack.Navigator>
    );
};

export default Categorie;