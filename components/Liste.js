import React, {useEffect, useState} from 'react';
import {Button, FlatList, Image, Text, View} from "react-native";
import axios from "axios";

const Liste = ({ value, navigation}) => {
    const [data, setData] = useState([{
        titre: 'toto',
        id: 10
    },
        {
            titre: 'tutu',
            id: 20
        },
        {
            titre: 'titi',
            id: 21
        }])


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/lireBdCat.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9&id=&id=' + value)
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

export default Liste;