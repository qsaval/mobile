import React, {useState} from 'react';
import {Animated, Dimensions, Image, PanResponder, Text, View} from "react-native";
import Moment from 'moment';

const BdCarousel = ({bds}) => {
    let {width} = Dimensions.get('window')
    const [state, setState] = useState({
        width: width,
        page: 0,
        translate: new Animated.Value(0)
    })
    const panResponder =
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 7,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            onPanResponderMove: Animated.event([null, {dx: state.translate}], {useNativeDriver: false}),
            onPanResponderRelease: endGesture,
            onPanResponderTerminate: (evt, gestureState) => {
                console.log('terminate')
            },
            onShouldBlockNativeResponder: (evt, gestureState) => true,
        });

     function endGesture (evt, gestureState){
        let toValue = 0
        if (Math.abs(gestureState.dx)/state.width > 0.2){
            if(gestureState.dx < 0){
                toValue = state.width * -1
            }
            else {
                toValue = state.width
            }
        }
        Animated.timing(
            state.translate,
            {
                toValue: toValue,
                duration: 300,
                useNativeDriver: true
            }
        ).start(() => {
            state.translate.setValue(0)
            if (toValue < 0){
                nextPage()
            }
            else if (toValue > 0) {
                prevPage()
            }
        })
    }

    function nextPage(){
        let page = state.page + 1

        if (page >= bds.length ) {
            page = 0;
        }
        setState({width: state.width ,page: page, translate: state.translate})
    }

    function prevPage(){
         let page = state.page - 1

        if (page < 0){
            page = bds.length -1;
        }
        setState({width: state.width ,page: page, translate: state.translate})
    }

    Moment.locale('fr')

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

    return (
        <Animated.View {...panResponder.panHandlers} style={{backgroundColor: '#97C5FA', flexDirection: 'row', width: bds.length * state.width, left: (state.page + 1) * -1 * state.width, transform: [{translateX: state.translate}]}}>
            <View style={{width: state.width}}></View>
            {bds.map((produit,k) => {
                return(
                    <View key={k} style={{width: state.width, flexDirection: 'row', backgroundColor: '#97C5FA', paddingVertical: 20 }}>
                        <Image style={{marginStart: 20}} source={image[produit.titre]}/>
                        <View style={{marginStart: 20}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{produit.titre}</Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Auteur:</Text>
                            <Text style={{fontSize: 15}}>{produit.auteur}</Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Editeur:</Text>
                            <Text style={{fontSize: 15}}>{produit.editeur}</Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Date d'edition:</Text>
                            <Text style={{fontSize: 15}}>{Moment(produit.date_edition).format('d/MM/YYYY')}</Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>prix:</Text>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 40}}>{produit.prix}€</Text>
                            </View>
                        </View>
                    </View>
                )
            })}
            <View style={{width: state.width, backgroundColor: '#97C5FA'}}></View>
        </Animated.View>
    );
};

export default BdCarousel;