import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, FlatList, Image, Text, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import Detail from "./Detail";

const BdScreen = ({route, navigation}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://10.0.2.2:8000/lireBdCat.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9&id=' + route.params.id)
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
                        <Image style={{marginStart: 70}} source={require("../assets/image/sakamoto_days_t1.jpeg")} />
                        <Text style={{textAlign: 'center', fontSize: 20}}>{item.titre}</Text>
                        <Button title="Detail" onPress={() => navigation.navigate({
                            name: item.titre,
                            params: {titre: item.titre, id: item.id}
                        })}/>
                    </View>
                )}
            />
        </View>
    );
};

const DetailScreen = ({route}) => {
    return (
        <Detail value={route.params.id} />
    )
}

const Bd = ({ value}) => {

    const [data, setData]= useState([])

    useEffect(() => {
        axios.get('http://10.0.2.2:8000/lireBdCat.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9&id=' + value)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    },[])

    const Stack = createStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name="BD" component={BdScreen} initialParams={{id: value}} />
            {data.map((c,index) => (<Stack.Screen key={index} name={c.titre} component={DetailScreen} />))}
        </Stack.Navigator>
    );
};

export default Bd;
