import React, {useEffect, useState} from 'react';
import {Image, Text, View} from "react-native";
import axios from "axios";
import Moment from 'moment';

const Detail = ({value}) => {
    const [bd, setBd] = useState(null);

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
                <Image source={require("../assets/image/sakamoto_days_t1.jpeg")} />
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