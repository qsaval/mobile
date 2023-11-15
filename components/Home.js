import {Button, FlatList, Image, Text, View} from 'react-native'
import React, {useState} from "react";
import BdCarousel from "./BdCarousel";
import categorie from "./Categorie";


export default function Home(){

    const [image, setImage] = useState({
        bd: [
            require('../assets/image/eigyr.jpeg'),
            require('../assets/image/marvel_comic_n19.jpeg'),
            require('../assets/image/sakamoto_days_t1.jpeg')
        ],
        categories: [
            {
                id: 1,
                nom_categorie: 'bd',
                image: require('../assets/image/bd.png')
            },
            {
                id: 2,
                nom_categorie: 'comic',
                image: require('../assets/image/comic.png')
            },
            {
                id: 3,
                nom_categorie: 'manga',
                image: require('../assets/image/manga.png')
            }
        ]
    })

    return (
        <View>
            <View style={{alignItems: 'center'}}>
                <Image source={require('../assets/image/logo.png')} style={{width:100, height:100, marginBottom: 30, padding: 24, marginTop: 20 }}/>
            </View>
            <BdCarousel bds={image.bd}/>
            <View style={{ padding: 24, marginTop: 20 }}>
                <View style={{flexDirection: 'row', margin:20}}>
                    {image.categories.map((categorie) =>
                        <View key={categorie.id} style={{marginEnd:10}} >
                            <Image style={{width: 100, height: 100}} source={categorie.image}/>
                            <Button title={categorie.nom_categorie}/>
                        </View>
                    )}
                </View>
            </View>
        </View>

    )
}