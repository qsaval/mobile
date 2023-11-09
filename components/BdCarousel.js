import React, {useState} from 'react';
import {Animated, Dimensions, Image, PanResponder, Text, View} from "react-native";

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

    return (
        <Animated.View {...panResponder.panHandlers} style={{backgroundColor: '#8fadf8', flexDirection: 'row', width: bds.length * state.width, left: (state.page + 1) * -1 * state.width, transform: [{translateX: state.translate}]}}>
            <View style={{width: state.width}}></View>
            {bds.map((produit,k) => {
                return(
                    <View key={k} style={{width: state.width, flexDirection: 'row', backgroundColor: '#8fadf8', paddingVertical: 20 }}>
                        <Image style={{marginStart: 20}} source={produit}/>
                        <View style={{marginStart: 20}}>
                            <Text style={{fontSize: 30, fontWeight: 'bold'}}>titre</Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Auteur:</Text>
                            <Text style={{fontSize: 15}}>dsfcsd</Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Editeur:</Text>
                            <Text style={{fontSize: 15}}>sfdsxc</Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Date d'edition:</Text>
                            <Text style={{fontSize: 15}}>fghdf</Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>prix:</Text>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 40}}>35.20€</Text>
                            </View>
                        </View>
                    </View>
                )
            })}
            <View style={{width: state.width, backgroundColor: '#8fadf8'}}></View>
        </Animated.View>
    );
};

export default BdCarousel;