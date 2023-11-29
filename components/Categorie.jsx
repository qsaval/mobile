import React, {useEffect, useState} from 'react';
import {Button, FlatList, Image, Text, View} from 'react-native';
import axios from "axios";
import {createStackNavigator} from "@react-navigation/stack";
import Liste from "./Liste";


function CategorieScreen({navigation}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://10.0.2.2:8000/lireCategorie.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')
            .then((res) => {
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
const ListeScreen = ({route}) => {

  return(
      <Liste value={route.params.id} categorie={route.params.nom_categorie}/>
  )
}

const Categorie = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://10.0.2.2:8000/lireCategorie.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9')
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    },[])


    const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name="Categorie" component={CategorieScreen}/>
            {categories.map((c,index) => (<Stack.Screen key={index} name={c.nom_categorie} component={ListeScreen} options={{headerShown: false}}/>))}
        </Stack.Navigator>
    );
};

export default Categorie;