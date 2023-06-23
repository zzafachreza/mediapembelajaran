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



export default function AASubbab({ navigation, route }) {

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
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [key, setKey] = useState('');
    const [key2, setKey2] = useState('');
    const isFocused = useIsFocused();
    useEffect(() => {


        if (isFocused) {
            __getTransaction();
        }

    }, [isFocused]);

    const [comp, setComp] = useState({});
    const [cek, setCek] = useState(false);
    const [cek2, setCek2] = useState(false);
    const __getTransaction = () => {
        getData('user').then(res => {
            setUser(res);

            axios.post(apiURL + 'cek_sudah', {
                fid_subbab: route.params.id,
                fid_siswa: res.id_siswa,
                table: 'data_nilaitesawal'
            }).then(resz => {
                console.log('cek', resz.data);
                if (resz.data > 0) {
                    setCek(true)
                } else {
                    setCek(false)
                }
            })

            axios.post(apiURL + 'company').then(res => {
                console.log('company', res.data.data);
                setComp(res.data.data);
            })



            axios.post(apiURL + 'cek_sudah', {
                fid_subbab: route.params.id,
                fid_siswa: res.id_siswa,
                table: 'data_nilaitesakhir'
            }).then(resz2 => {
                console.log('cek', resz2.data);
                if (resz2.data > 0) {
                    setCek2(true)
                } else {
                    setCek2(false)
                }
            })

        });

        axios.post(apiURL + 'materi', {
            fid_subbab: route.params.id
        }).then(res => {
            console.log(res.data);
            setData(res.data);
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

                <TouchableOpacity onPress={() => {

                    if (!cek) {

                        setOpen(true);
                    } else {
                        Alert.alert(MYAPP, 'Maaf kamu sudah mengerjakan ini !')
                    }

                }}>
                    <LinearGradient colors={[colors.foourty, colors.foourty]}

                        start={{ x: 0.0, y: 0.50 }} end={{ x: 1.2, y: 0.0 }}

                        style={{
                            padding: 5,
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
                            <Image source={require('../../assets/AZ.png')} style={{
                                width: 30,
                                height: 30,
                            }} />
                        </View>
                        <View>
                            <Text style={{
                                left: 10,
                                fontFamily: fonts.secondary[600],
                                color: colors.white,
                                fontSize: windowWidth / 25
                            }}>TES AWAL</Text>
                            <Text style={{
                                left: 10,
                                fontFamily: fonts.secondary[400],
                                color: colors.white,
                                fontSize: windowWidth / 40
                            }}>Silahkan kerjakan tes berikut sebelum mengerjakan materi yang disediakan</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
                {open && <View style={{
                    backgroundColor: colors.white,
                    padding: 10,
                }}>
                    <TouchableOpacity onPress={() => setOpen(false)} style={{
                        width: 80,
                        padding: 5,
                        borderRadius: 10,
                        alignSelf: 'flex-end',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.black
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                        }}>Tutup</Text>
                    </TouchableOpacity>
                    <MyInput iconname="lock-closed" value={key} onChangeText={x => setKey(x)} label="Kode Akses" placeholder="Masukan kode akses" />
                    <MyGap jarak={10} />
                    <MyButton onPress={() => {
                        if (key == comp.akses) {
                            // alert('oke')
                            navigation.navigate('AATesawal', route.params);
                            setOpen(false);
                        } else {
                            Alert.alert(MYAPP, 'Maaf Kode akses salah !');
                            setKey('');
                        }
                    }} title="Submit" warna={colors.primary} />
                </View>}
                <FlatList data={data} renderItem={__renderItem} />
                <TouchableOpacity onPress={() => {
                    if (!cek) {
                        // navigation.navigate('AATesAkhir', route.params)
                        setOpen2(true);
                    } else {
                        Alert.alert(MYAPP, 'Maaf kamu sudah mengerjakan ini !')
                    }
                }

                }>
                    <LinearGradient colors={[colors.foourty, colors.foourty]}

                        start={{ x: 0.0, y: 0.50 }} end={{ x: 1.2, y: 0.0 }}

                        style={{
                            padding: 5,
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
                            <Image source={require('../../assets/AZ.png')} style={{
                                width: 30,
                                height: 30,
                            }} />
                        </View>
                        <View>
                            <Text style={{
                                left: 10,
                                fontFamily: fonts.secondary[600],
                                color: colors.white,
                                fontSize: windowWidth / 25
                            }}>TES AKHIR</Text>
                            <Text style={{
                                left: 10,
                                fontFamily: fonts.secondary[400],
                                color: colors.white,
                                fontSize: windowWidth / 40
                            }}>Silahkan kerjakan tes berikut sebelum mengerjakan materi yang disediakan</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
                {open2 && <View style={{
                    backgroundColor: colors.white,
                    padding: 10,
                }}>
                    <TouchableOpacity onPress={() => setOpen2(false)} style={{
                        width: 80,
                        padding: 5,
                        borderRadius: 10,
                        alignSelf: 'flex-end',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.black
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                        }}>Tutup</Text>
                    </TouchableOpacity>
                    <MyInput iconname="lock-closed" value={key2} onChangeText={x => setKey2(x)} label="Kode Akses" placeholder="Masukan kode akses" />
                    <MyGap jarak={10} />
                    <MyButton onPress={() => {
                        if (key2 == comp.akses) {
                            // alert('oke')
                            navigation.navigate('AATesAkhir', route.params);
                            setOpen2(false);
                        } else {
                            Alert.alert(MYAPP, 'Maaf Kode akses salah !');
                            setKey2('');
                        }
                    }} title="Submit" warna={colors.primary} />
                </View>}
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