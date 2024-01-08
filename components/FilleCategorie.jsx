import React, {useEffect, useState} from 'react';
import {Button, FlatList, Image, View} from "react-native";
import axios from "axios";
import {createStackNavigator} from "@react-navigation/stack";
import Liste from "./Liste";

const FilleCategorieScreen = ({route,navigation}) => {
    const [data, setData] = useState()

    useEffect(() => {
        axios.get('http://10.0.2.2:8000/lireCat.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9&id=' + route.params.id)
            .then(r=> setData(r.data))
            .catch(e => console.log(e))
    }, []);

      let image ={
        'BD': require('../assets/image/bd.png'),
        'Comic': require('../assets/image/comic.png'),
        'Manga': require('../assets/image/manga.png'),
        'Marvel': require('../assets/image/marvel.png'),
        'DC': require('../assets/image/dc.png'),
        'Shonen': require('../assets/image/shonen.png'),
        'Seinen': require('../assets/image/seinen.png'),
    }

    return (
        <View style={{flex: 1, padding: 24}}>

            <FlatList
                data={data}
                keyExtractor={({id}) => id}
                renderItem={({item}) => (
                    <View style={{marginBottom: 20}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            {/*<Image style={{width:225, height:125, marginBottom: 30, padding: 24, marginTop: 20 }} source={{uri: `https://127.0.0.1:8001/image/${item.image_caregorie}`}}/>*/}
                            <Image style={{width:225, height:125, marginBottom: 30, padding: 24, marginTop: 20 }} source={image[item.nom_categorie]}/>
                        </View>
                        <Button title={item.nom_categorie}  onPress={() => navigation.navigate({
                            name: `list${item.nom_categorie}`,
                            params: { id: item.id, nom_categorie: item.nom_categorie }
                        })} />
                    </View>
                )}
            />
        </View>

    );
};
const FilleCategorie = ({route}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://10.0.2.2:8000/lireCat.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9&id=' + route.params.id)
            .then(r=> setData(r.data))
            .catch(e => console.log(e))
    }, []);

    const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name={route.params.nom_categorie} component={FilleCategorieScreen} initialParams={{id: route.params.id}}/>
            {data.map((d,index) => (<Stack.Screen key={index} name={ `list${d.nom_categorie}`} component={Liste} options={{headerShown: false}}/>))}
        </Stack.Navigator>
    );
}


export default FilleCategorie;