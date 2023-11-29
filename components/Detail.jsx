import React, {useEffect, useState} from 'react';
import {Image, Text, View} from "react-native";
import axios from "axios";
import Moment from 'moment';

const Detail = ({value}) => {
    const [bd, setBd] = useState(null);

    var image = {
        'Eigyr': require('../assets/image/eigyr.jpeg'),
        'Pendragon - L\'épee perdue - Tome 1':  require('../assets/image/pendragon:lepee_perdue_t1.jpeg'),
        'Webster & Jones': require('../assets/image/webster&jones.jpeg'),
        'Marvel Comic n°19': require('../assets/image/marvel_comic_n19.jpeg'),
        'X-Men - Proteus': require('../assets/image/x-men:proteus.jpeg'),
        'Punisher - La fin du punisher - Tome 3': require('../assets/image/punisher:la_fin_du_punisher_t3.jpeg'),
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

    useEffect(() => {
        axios.get('http://10.0.2.2:8000/lire1bd.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9&id=' + value)
            .then((res) => {
                setBd(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    },[])

    Moment.locale('fr')

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <View style={{flexDirection: "row", marginStart: 20}}>
                {bd && <Image source={image[bd.titre]}/>}
                <View style={{flex: 1, justifyContent: 'center', marginStart:5}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Auteur:</Text>
                    <Text style={{fontSize: 17}}>{bd && bd.auteur}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Editeur:</Text>
                    <Text style={{fontSize: 17}}>{bd && bd.editeur}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Date d'edition:</Text>
                    <Text style={{fontSize: 17}}>{bd && Moment(bd.date_edition).format('d/MM/YYYY')}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Prix:</Text>
                    <Text style={{fontSize: 17}}>{bd && bd.prix}€</Text>
                </View>
            </View>
            <View style={{backgroundColor: '#97C5FA', padding: 20, marginVertical: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Resume :</Text>
                <Text style={{fontSize: 17}}>{bd && bd.resume}</Text>
            </View>
        </View>
    );
};

export default Detail;