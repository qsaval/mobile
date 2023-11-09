import {Button, Image, Text, View} from 'react-native'
import {useState} from "react";
import BdCarousel from "./BdCarousel";


export default function Home(){

    const [image, setImage] = useState({
        bd: [
            require('../assets/image/eigyr.jpeg'),
            require('../assets/image/marvel_comic_n19.jpeg'),
            require('../assets/image/sakamoto_days_t1.jpeg')
        ]
    })

    return (
        <View>
            <View style={{alignItems: 'center'}}>
                <Image source={require('../assets/image/logo.png')} style={{width:100, height:100, fontSize: 25, marginBottom: 30, padding: 24, marginTop: 20 }}/>
            </View>


            <BdCarousel bds={image.bd}/>
            <View style={{ padding: 24, marginTop: 20 }}>
                <View style={{flexDirection: 'row', margin:20}}>
                    <View style={{marginEnd:10}}>
                        <Image style={{width: 100, height: 100}} source={require('../assets/image/bd.png')}/>
                        <Button title="bd"/>
                    </View>
                    <View style={{marginEnd:10}}>
                        <Image style={{width: 100, height: 100}} source={require('../assets/image/comic.png')}/>
                        <Button title="comic"/>
                    </View>
                    <View>
                        <Image style={{width: 100, height: 100}} source={require('../assets/image/manga.png')}/>
                        <Button title="manga"/>
                    </View>
                </View>
            </View>
        </View>

    )
}