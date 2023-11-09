import React, {useEffect, useState} from 'react';
import {Button, Image, Text, View} from "react-native";
import axios from "axios";

const Detail = ({title, value}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/lire1bd.php?key=eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlF1ZW50aW4gU2F2YWwiLCJpYXQiOjE1MTYyMzkwMjJ9&id=' + value)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    },[])

    return (
        <View style={{ flex: 1, padding: 20 }}>

            <View style={{flexDirection: "row", marginStart: 20}}>
                <Image source={require("../assets/image/sakamoto_days_t1.jpeg")} />
                <View style={{flex: 1, justifyContent: 'center', marginStart:5}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Auteur:</Text>
                    <Text style={{fontSize: 17}}>sdfs</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Editeur:</Text>
                    <Text style={{fontSize: 17}}>dsdfs</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Date d'edition:</Text>
                    <Text style={{fontSize: 17}}>dsfdsdqs</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Prix:</Text>
                    <Text style={{fontSize: 17}}>dgfezd</Text>
                </View>
            </View>
            <View style={{marginTop: 20}}>
                <Button title="panier"/>
            </View>
            <View style={{backgroundColor: '#8fadf8', padding: 20, marginVertical: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Resume :</Text>
                <Text style={{fontSize: 17}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad aperiam aspernatur atque doloremque eaque eius eum exercitationem fuga iure, laudantium molestias mollitia nisi non nulla numquam pariatur quaerat, quas qui quidem quisquam quod ratione recusandae reprehenderit sunt tenetur veniam?</Text>
            </View>

        </View>
    );
};

export default Detail;