import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from "react-native";
import axios from "axios";
import Moment from 'moment';

const Detail = ({route}) => {
    const [bd, setBd] = useState(null);

     let image = {
        'Eigyr': require('../assets/image/eigyr.jpeg'),
        "Pendragon - L'épee perdue - Tome 1":  require('../assets/image/pendragon_lepee_perdue_t1.jpeg'),
        'Webster & Jones': require('../assets/image/websterjones.jpeg'),
        'Marvel Comic n°19': require('../assets/image/marvel_comic_n19.jpeg'),
        'X-Men - Proteus': require('../assets/image/x-men_proteus.jpeg'),
        'Punisher - La fin du punisher - Tome 3': require('../assets/image/punisher_la_fin_du_punisher_t3.jpeg'),
        'Flash infinite - Tome 3': require('../assets/image/flash_infinite_t3.jpeg'),
        'Harley Quinn infinite - Tome 3': require('../assets/image/harley_quinn_infinite_t3.jpeg'),
        'Superman Aventures - Tome 6': require('../assets/image/superman_aventures_t6.jpeg'),
        'Sakamoto Days - Tome 1': require('../assets/image/sakamoto_days_t1.jpeg'),
        'Dandadan - Tome 6': require('../assets/image/dandadan6.jpeg'),
        'Jujutsu Kaisen - Tome 1': require('../assets/image/jujutsu_kaisen1.jpeg'),
        'Alpi - The Soul Sender - Tome 1': require('../assets/image/alpi_the_soul_sender_t1.jpeg'),
        'Villageois lvl 999 - Tome 1': require('../assets/image/villageois_lvl_999.jpeg'),
        'Gantz :E - Tome 4': require('../assets/image/gantz4.jpeg')
    }

    useEffect(() => {
        axios.get('http://10.0.2.2:8000/lire1bd.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9&id=' + route.params.id)
            .then((res) => {
                setBd(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    },[])

    Moment.locale('fr')

    return (
        <View style={{ flex: 1, padding: 20, marginBottom: 20 }}>
            <View style={{flexDirection: "row", marginStart: 20}}>
                {/*{bd && <Image source={{uri: `http://10.0.2.2:8001/image/${bd.image_bd}`}}/>}*/}
                {bd && <Image source={image[bd.titre]}/>}
                <View style={{flex: 1, justifyContent: 'center', marginStart:5}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Auteur:</Text>
                    <Text style={{fontSize: 17}}>{bd && bd.auteur}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Editeur:</Text>
                    <Text style={{fontSize: 17}}>{bd && bd.editeur}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Date d'edition:</Text>
                    <Text style={{fontSize: 17}}>{bd && Moment(bd.date_edition).format('DD/MM/YYYY')}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Prix:</Text>
                    <Text style={{fontSize: 17}}>{bd && bd.prix}€</Text>
                </View>
            </View>
            <ScrollView style={{backgroundColor: '#97C5FA', paddingHorizontal: 20, marginVertical: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Resume :</Text>
                <Text style={{fontSize: 17}}>{bd && bd.resume}</Text>
            </ScrollView>
        </View>
    );
};

export default Detail;