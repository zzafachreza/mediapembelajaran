import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { color } from 'react-native-elements/dist/helpers';



export default function AAMateri({ navigation, route }) {

    const __renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('AAMateri', item)}>
                <LinearGradient colors={index % 2 != 0 ? [colors.foourty, colors.tertiary] : [colors.tertiary, colors.foourty]}

                    start={{ x: 0.0, y: 0.50 }} end={{ x: 1.2, y: 0.0 }}

                    style={{
                        elevation: 1,
                        padding: 5,
                        borderColor: colors.border,
                        borderWidth: 1,
                        marginVertical: 3,
                    }}
                >
                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            width: 30,
                            height: 30,
                            backgroundColor: colors.background,
                            borderRadius: 5,
                        }} />
                        <View style={{
                            flex: 1,
                            paddingLeft: 5,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[800],
                                color: colors.white,
                                fontSize: windowWidth / 30
                            }}>{item.nama_materi}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity >
        )
    }

    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const isFocused = useIsFocused();
    useEffect(() => {


        if (isFocused) {
            __getTransaction();
        }

    }, [isFocused]);

    const __getTransaction = () => {
        getData('user').then(res => {
            setUser(res);
        });

        axios.post(apiURL + 'materi', {
            fid_subbab: route.params.id
        }).then(res => {
            console.log(res.data);
            // setData(res.data);
        })



    }




    return (






        <LinearGradient colors={[colors.foourty, colors.tertiary]} style={{
            flex: 1,
        }}>

            <Image
                source={require('../../assets/head.png')}
                style={
                    {
                        width: windowWidth,
                        height: 80,

                    }
                }
            />
            <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
                padding: 10,

            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: windowWidth / 20
                }}>{user.nama_siswa} [ {user.nisn} ]</Text>

            </TouchableOpacity>


            <View style={{
                flex: 1,
                padding: 10,
            }}>
                <LinearGradient colors={[colors.tertiary, colors.foourty]}

                    start={{ x: 0.0, y: 0.50 }} end={{ x: 1.2, y: 0.0 }}

                    style={{
                        padding: 5,
                        marginVertical: 3,
                    }}
                >
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: windowWidth / 20
                    }}>{route.params.nama_subbab}</Text>
                </LinearGradient>
                <LinearGradient colors={[colors.tertiary, colors.foourty]}

                    start={{ x: 0.0, y: 0.50 }} end={{ x: 1.2, y: 0.0 }}

                    style={{
                        padding: 5,
                        marginVertical: 3,
                    }}
                >
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.white,
                        fontSize: windowWidth / 30
                    }}>{route.params.nama_materi}</Text>
                </LinearGradient>


                <View style={{
                    marginTop: 20
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('AAMateriVideo', route.params)}>
                        <LinearGradient colors={[colors.foourty, colors.foourty]}

                            start={{ x: 0.0, y: 0.50 }} end={{ x: 1.2, y: 0.0 }}

                            style={{
                                padding: 5,
                                borderWidth: 1,
                                borderColor: colors.border,
                                marginVertical: 3,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <View style={{
                                width: 40,
                                height: 40,
                                backgroundColor: colors.white,
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/AM1.png')} style={{
                                    width: 30,
                                    height: 20,
                                }} />
                            </View>
                            <View>
                                <Text style={{
                                    left: 10,
                                    fontFamily: fonts.secondary[600],
                                    color: colors.white,
                                    fontSize: windowWidth / 25
                                }}>VIDEO PEMBELAJARAN</Text>
                                <Text style={{
                                    left: 10,
                                    fontFamily: fonts.secondary[400],
                                    color: colors.white,
                                    fontSize: windowWidth / 40
                                }}>Silahkan buka dan pelajari video pembelajaran</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AAMateriPdf', route.params)}>
                        <LinearGradient colors={[colors.foourty, colors.foourty]}

                            start={{ x: 0.0, y: 0.50 }} end={{ x: 1.2, y: 0.0 }}

                            style={{
                                padding: 5,
                                borderWidth: 1,
                                borderColor: colors.border,
                                marginVertical: 10,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <View style={{
                                width: 40,
                                height: 40,
                                backgroundColor: colors.white,
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/AM2.png')} style={{
                                    width: 25,
                                    height: 25,
                                }} />
                            </View>
                            <View>
                                <Text style={{
                                    left: 10,
                                    fontFamily: fonts.secondary[600],
                                    color: colors.white,
                                    fontSize: windowWidth / 25
                                }}>MATERI PEMBELAJARAN</Text>
                                <Text style={{
                                    left: 10,
                                    fontFamily: fonts.secondary[400],
                                    color: colors.white,
                                    fontSize: windowWidth / 40
                                }}>Silahkan buka dan pelajari materi pembelajaran</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>


            </View>


        </LinearGradient>




    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: windowHeight,
        height: windowWidth / 2,
    },
    imageContainer: {
        flex: 1,
        marginBottom: 1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});