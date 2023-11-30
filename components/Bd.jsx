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

     let image = {
        'Eigyr': require('../assets/image/eigyr.jpeg'),
        'Pendragon - L\'épee perdue - Tome 1':  require('../assets/image/pendragon_lepee_perdue_t1.jpeg'),
        'Webster & Jones': require('../assets/image/websterjones.jpeg'),
        'Marvel Comic n°19': require('../assets/image/marvel_comic_n19.jpeg'),
        'X-Men - Proteus': require('../assets/image/x-men_proteus.jpeg'),
        'Punisher - La fin du punisher - Tome 3': require('../assets/image/punisher_la_fin_du_punisher_t3.jpeg'),
        'Flash infinite - Tome 3': require('../assets/image/flash_infinite_t3.jpeg'),
        'Harley Quinn infinite - Tome 3': require('../assets/image/harley_quinn_infinite_t3.jpeg'),
        'Superman Aventures - Tome 6': require('../assets/image/superman_aventures_t6.jpeg'),
        'Sakamoto Days - Tome 1': require('../assets/image/sakamoto_days_t1.jpeg'),
        'Dandadan - Tome 6': require('../assets/image/dandadan6.jpeg'),
        'jujutsu kaisen - Tome 1': require('../assets/image/jujutsu_kaisen1.jpeg'),
        'Alpi - The Soul Sender - Tome 1': require('../assets/image/alpi_the_soul_sender_t1.jpeg'),
        'Villageois lvl 999 - Tome 1': require('../assets/image/villageois_lvl_999.jpeg'),
        'Gantz :E - Tome 4': require('../assets/image/gantz4.jpeg')
    }

    return (
        <View style={{flex: 1, padding: 24}}>
            <FlatList
                data={data}
                keyExtractor={({id}) => id}
                renderItem={({item}) => (
                    <View style={{marginBottom: 20}}>
                        {/*<Image style={{marginStart: 70}} source={{uri: `https://127.0.0.1:8001/image/${item.image_bd}`}} />*/}
                        <Image style={{marginStart: 70}} source={image[item.titre]} />
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
