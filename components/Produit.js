import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../components/colors';
import { connect } from 'react-redux'

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function Produits(props) {

    const [selectedQuantity, setSelectedQuantity] = useState(props.produitQuantity);

    // console.log('props.produitQuantity :', props.produitQuantity);
    // console.log('selectedQuantity :', selectedQuantity);


    useEffect(() => {
        const setQuantity = async () => {

            setSelectedQuantity(props.produitQuantity)

        }
        setQuantity();
    
      }, []);

    var addProduct = (produit) => {
        if (selectedQuantity >= 0) {
            setSelectedQuantity(selectedQuantity+1)
            props.addToBasket(produit)
        }
    }

    var deleteProduct = (produit) => {
        if (selectedQuantity > 0) {
            setSelectedQuantity(selectedQuantity-1)
            props.removeFromBasket(produit)
        }
    }

    if (props.produitQuantity > 0) {
        var displayBoutonMoins = <TouchableOpacity
                            style={styles.btn}
                            onPress={() => {deleteProduct(props)}} 
                            >
                            <Text style={styles.txt}>-</Text>
                        </TouchableOpacity>
        var displayQantity = <Text style={[styles.txt, {fontSize: 18, marginTop: '20%', color: '#000'}]}>{props.produitQuantity}</Text>
    } else {
        var displayQantity = null;
        var displayBoutonMoins = null;
    }

    return (
        <View style={styles.container}>

            <View style={{width: wp('65%')}}>
                <View style={{marginLeft: '10%'}}>
                    <Text style={styles.nomProduit}>{props.produitName} (25cl)</Text>
                    <Text style={styles.prixProduit}>{props.produitPrice}€</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row', width: hp('20%')}}>
                <View style={{width: hp('5.1%'), height: '100%'}}>
                    {displayBoutonMoins}
                </View>
                <View style={{width: hp('5.3%'), height: '100%'}}>
                    {displayQantity}
                </View>
                <View style={{width: hp('5.3%'), height: '100%'}}>
                    <TouchableOpacity
                        style={[styles.btn]}
                        onPress={() => {addProduct(props)
                        console.log("click ok")
                        }} 
                        >
                        <Text style={[styles.txt, {fontSize: 18, marginTop: '18%'}]}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
        );

}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: hp('10%'),
        backgroundColor: colors.tertiary,
    },
    // img: {
    //     width: 126,
    //     height: 80,
    // },
    btn: {
        height: hp('4.5%'),
        width: hp('4.5%'),
        backgroundColor: colors.secondary,
        borderRadius: 400/2,
    },
    nomProduit: {
        fontWeight: '700',
        fontSize: 16
    },
    txt: {
        color: colors.tertiary,
        marginTop: '5%',
        fontSize: 25, 
        width: '100%',
        height: '100%',
        textAlign: 'center',
    }
  });

function mapDispatchToProps(dispatch) {
    return {
        addToBasket: function(produit) {
            dispatch( {type: 'addProduit', produitName: produit.produitName, produitPrice: produit.produitPrice, produitQuantity: produit.produitQuantity }) 
        },
        removeFromBasket: function(produit) {
            dispatch( {type: 'deleteProduit', produitName: produit.produitName, produitPrice: produit.produitPrice, produitQuantity: produit.produitQuantity })
        }
    }
}

export default connect(
    null, 
    mapDispatchToProps
)(Produits);