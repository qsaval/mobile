import React, {useState} from 'react';
import {Button, FlatList, Image, Pressable, Text, TextInput, View} from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import Quantite from "./Quantite";

const Panier = () => {

    const [state, setState] = useState([
        {
            titre: 'toto',
            id: 10,
            prix: 8,
            qty: 8
        },
        {
            titre: 'tutu',
            id: 20,
            prix: 10,
            qty: 5
        },
        {
            titre: 'titi',
            id: 21,
            prix: 7,
            qty: 7
        }
    ])

    const handlePress = (id) => {
        const stateCopy = [...state]
        const stateCopyUpdated = stateCopy.filter((produit) => produit.id !== id)
        setState(stateCopyUpdated)
    }



    return (
       <View style={{ flex: 1, padding: 24 }}>
           <FlatList
               data={state}
               keyExtractor={({id}) => id}
               renderItem={({item}) => (
                   <View style={{marginBottom:20}}>
                       <View style={{flexDirection: "row", marginBottom:10}}>
                           <View>
                               <Image style={{width:  100, height: 150}} source={require("../assets/image/sakamoto_days_t1.jpeg")} />
                           </View>
                           <View style={{marginStart: 10}}>
                               <Text style={{fontSize: 30, fontWeight: 'bold'}}>{item.titre}</Text>
                               <Text style={{fontSize: 15, fontWeight: 'bold'}}>Auteur:</Text>
                               <Text style={{fontSize: 15}}>csfsc</Text>
                               <Text style={{fontSize: 15, fontWeight: 'bold'}}>Editeur:</Text>
                               <Text style={{fontSize: 15}}>dsqf</Text>
                           </View>
                           <View style={{flex:1, alignItems: 'flex-end'}}>
                               <Text style={{fontSize: 30, fontWeight: 'bold', flex: 1, justifyContent: 'center', alignItems: 'center',}}>{item.prix * item.qty}€</Text>
                           </View>
                       </View>

                       <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                           <Quantite value={item.qty}/>
                           <Pressable onPress={() => handlePress(item.id)}><EvilIcons name="trash" size={24} color="black" /></Pressable>
                       </View>
                   </View>
               )}
           />

           <View style={{marginTop:20}}>
               <Button title='Valider mon panier'/>
           </View>


       </View>
    );
};

export default Panier;