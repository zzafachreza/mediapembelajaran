import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, Modal, TouchableNativeFeedback } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData, webURL } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
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

import YoutubePlayer from "react-native-youtube-iframe";
import Pdf from 'react-native-pdf';
export default function AAMateriPdf({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState({});
    const [user, setUser] = useState({});
    const [kirim, setKirim] = useState({
        komentar: '',
    })
    const [item, setItem] = useState(route.params);
    const isFocused = useIsFocused();
    useEffect(() => {


        if (isFocused) {
            __getTransaction();
        }

    }, [isFocused]);

    const [komentar, setKomentar] = useState([]);

    const inputRef = useRef();
    const __getTransaction = () => {
        getData('user').then(uu => {
            setUser(uu);


            axios.post(apiURL + 'pdf', {
                fid_materi: route.params.id_materi
            }).then(resz => {

                axios.post(apiURL + 'komentar', {
                    fid_pdf: resz.data.id_pdf
                }).then(ko => {

                    setKomentar(ko.data);
                })
                setKirim({
                    ...kirim,
                    fid_siswa: uu.id_siswa,
                    fid_pdf: resz.data.id_pdf
                })

                setData(resz.data);
            })

        });






    }


    const scrollViewRef = useRef();

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
                        marginVertical: 2,
                    }}
                >
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: windowWidth / 25
                    }}>Materi Pembelajaran</Text>
                </LinearGradient>


                <View style={{
                    flex: 1,
                    backgroundColor: colors.white
                }}>

                    <Pdf
                        trustAllCerts={false}
                        source={{ uri: webURL + data.foto_pdf, cache: true }}
                        // source={{
                        //     uri: 'https://mediapembelajaran.okeadmin.com/datafoto/1cab8655ee0c476a44339029a38ee5d1f270131d.pdf'
                        // }}

                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                        style={{
                            flex: 1,

                        }} />
                </View>



            </View>

            <View style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
            }}>
                <TouchableOpacity onPress={() => {
                    setModalVisible(true);
                    setTimeout(() => {
                        inputRef.current.focus();
                    }, 200)
                }} style={{
                    width: 60,
                    height: 60,
                    elevation: 4,
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                }}>
                    <Icon color={colors.white} type='ionicon' name='chatbubbles-outline' size={30} />
                </TouchableOpacity>
            </View>


            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={{
                    flex: 1,
                    padding: 10,

                    backgroundColor: '#000000BF'
                }}>
                    <View style={{
                        height: windowHeight / 2,
                        backgroundColor: colors.white,
                    }}>
                        <View style={{
                            padding: 10,
                            backgroundColor: colors.primary,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: 15,
                                color: colors.white
                            }}>{item.nama_subbab}</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: 15,
                                color: colors.white
                            }}>{item.nama_materi}</Text>
                        </View>
                        <ScrollView

                            ref={scrollViewRef}
                            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                            style={{
                                flex: 1,
                            }}>

                            {komentar.length == 0 && <Text style={{
                                margin: 10,
                                fontFamily: fonts.secondary[400],
                                color: colors.border
                            }}>Belum ada komentar . . .</Text>}
                            {komentar.length > 0 && komentar.map(i => {
                                return (
                                    <View style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        marginVertical: 5,
                                        marginHorizontal: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.zavalabs,
                                        flexDirection: 'row',
                                        alignItems: 'center'

                                    }}>
                                        <View style={{
                                            flex: 1,
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                                <Text style={{
                                                    fontFamily: fonts.secondary[600],
                                                    fontSize: 12,
                                                    color: colors.black,
                                                    marginRight: 2,
                                                }}>{i.nama_siswa}</Text>
                                                <Image source={require('../../assets/cek.png')} style={{
                                                    width: 10,
                                                    height: 10,
                                                }} />

                                            </View>

                                            <Text style={{
                                                fontFamily: fonts.secondary[400],
                                                fontSize: 12,
                                                color: colors.black
                                            }}>{i.komentar}</Text>
                                            <Text style={{
                                                fontFamily: fonts.secondary[400],
                                                fontSize: 12,
                                                color: colors.border,
                                                marginRight: 2,
                                            }}>{i.tanggal}</Text>
                                        </View>

                                        {user.id_siswa == i.fid_siswa &&
                                            <TouchableNativeFeedback style={{
                                                flex: 1,
                                                backgroundColor: 'red',
                                                paddingHorizontal: 10,
                                                zIndex: 99
                                            }} onPress={() => {
                                                Alert.alert(MYAPP, 'Hapus komentar ini ?', [
                                                    { text: 'TIDAK' },
                                                    {
                                                        text: 'HAPUS',
                                                        onPress: () => {
                                                            axios.post(apiURL + 'komentar_delete', {
                                                                id: i.id
                                                            }).then(xz => {
                                                                showMessage({
                                                                    message: 'Komentar berhasil dihapus !',
                                                                    type: 'success'
                                                                })
                                                                axios.post(apiURL + 'pdf', {
                                                                    fid_materi: route.params.id_materi
                                                                }).then(resz => {

                                                                    axios.post(apiURL + 'komentar', {
                                                                        fid_pdf: resz.data.id_pdf
                                                                    }).then(ko => {

                                                                        setKomentar(ko.data);
                                                                    })

                                                                    setData(resz.data);
                                                                })
                                                            })
                                                        }
                                                    }
                                                ])
                                            }}>
                                                <Icon type='ionicon' name='trash' color={colors.danger} size={20} />
                                            </TouchableNativeFeedback>

                                        }

                                    </View>
                                )
                            })}

                        </ScrollView>
                        <View style={{
                            padding: 10,

                        }}>
                            <TextInput autoCapitalize='none' onSubmitEditing={x => {

                                inputRef.current.value = ''
                                console.log(x.nativeEvent.text);

                                setKirim({
                                    ...kirim,
                                    komentar: ''
                                });

                                axios.post(apiURL + 'komentar_add', kirim).then(res => {
                                    console.log(res.data);

                                    axios.post(apiURL + 'pdf', {
                                        fid_materi: route.params.id_materi
                                    }).then(resz => {

                                        axios.post(apiURL + 'komentar', {
                                            fid_pdf: resz.data.id_pdf
                                        }).then(ko => {

                                            setKomentar(ko.data);
                                        })

                                        setData(resz.data);
                                    })
                                    // __getTransaction();
                                })


                            }} onChangeText={x => {
                                setKirim({
                                    ...kirim,
                                    komentar: x
                                })
                            }} ref={inputRef} value={kirim.komentar} placeholder='Tulis komentar . . .' style={{
                                fontFamily: fonts.secondary[400],
                                borderWidth: 1,
                                paddingLeft: 10,
                                borderColor: colors.zavalabs
                            }} />
                        </View>







                    </View>
                </View>
            </Modal>


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