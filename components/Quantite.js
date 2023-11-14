import React, {useState} from 'react';
import {Button, Text, View} from "react-native";

const Quantite = ({value}) => {

    const [quantite, setQuantite] = useState(value);
    const handlePlus = (e) => {
        setQuantite( q => q + 1);
    }

    const handleMoins = (e) => {
        setQuantite(q => q - 1);
    }

    return (
        <View style={{flexDirection: 'row'}}>
            <View style={{width: 40, height: 40}}>
                <Button title='-' onPress={handleMoins}/>
            </View>
            <Text style={{fontSize: 20, marginHorizontal: 20}}>{quantite}</Text>
            <View style={{width: 40, height: 40}}>
                <Button title='+' onPress={handlePlus}/>
            </View>
        </View>
    );
};

export default Quantite;