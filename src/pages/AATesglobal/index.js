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

import YoutubePlayer from "react-native-youtube-iframe";
import CountDown from 'react-native-countdown-component';
export default function AATesglobal({ navigation, route }) {
    const __renderItem = ({ item, index }) => {
        return (

            <LinearGradient colors={index % 2 != 0 ? [colors.foourty, colors.tertiary] : [colors.tertiary, colors.foourty]}

                start={{ x: 0.0, y: 0.50 }} end={{ x: 1.2, y: 0.0 }}

                style={{
                    borderRadius: 10,
                    marginVertical: 5,
                    elevation: 2,
                    overflow: 'hidden'
                }}
            >
                <YoutubePlayer
                    height={220}
                    play={false}
                    videoId={item.link_video}
                />
                <View style={{
                    padding: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.white,
                        fontSize: windowWidth / 25
                    }}>{item.judul_video}</Text>
                </View>
            </LinearGradient>

        )
    }

    const [data, setData] = useState([]);
    const [ragu, setRagu] = useState([])
    const [betul, setBetul] = useState([]);
    const [user, setUser] = useState({});
    const [nomor, setNomor] = useState(0);
    const [open, setOpen] = useState(false)
    const isFocused = useIsFocused();

    const sendServer = () => {

        let totalNilai = skor.reduce((a, b) => a + b, 0);

        let kirim = {
            nilai: (totalNilai / data.length) * 100,
            fid_siswa: user.id_siswa,
        }

        console.log(kirim);
        axios.post(apiURL + 'add_tesglobal', kirim).then(res => {
            console.log(res.data);
            if (res.data.status == 200) {

                Alert.alert(MYAPP, 'Nilai Tes Keseluruhan Kamu : ' + (totalNilai / data.length) * 100);
                showMessage({
                    type: 'success',
                    message: res.data.message
                })
                navigation.goBack();
            }
        })

    }

    useEffect(() => {

        if (isFocused) {
            __getTransaction();
        }




    }, [isFocused]);

    const __getTransaction = () => {
        getData('user').then(res => {
            setUser(res);
        });

        axios.post(apiURL + 'tesglobal').then(res => {

            console.log(res.data);
            if (res.data.length > 0) {
                res.data.map(i => {
                    skor.push(0);
                    ragu.push(false);
                    betul.push(false);
                    pilih.push(
                        {
                            a: false,
                            b: false,
                            c: false,
                            d: false
                        }
                    )
                })

                setData(res.data);
                setTimeout(() => {
                    setOpen(true);
                }, 200)
            } else {
                Alert.alert(MYAPP, 'Soal Belum Ada !');

            }
        })



    };

    const [pilih, setPilih] = useState([]);
    const [skor, setSkor] = useState([]);



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
                    }}>Tes Akhir Semua Bab</Text>
                </LinearGradient>

                {open && <View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    padding: 5,
                }}>
                    {/* SOAL */}
                    <Text style={{ fontFamily: fonts.secondary[400], fontSize: 14, left: 5, }}>JUMLAH SOAL ADA {data.length}</Text>
                    <View style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: colors.foourty
                    }}>

                        <Text style={{ flex: 1, fontFamily: fonts.secondary[800], fontSize: 20 }}> SOAL NOMOR <Text style={{ backgroundColor: colors.background, color: colors.white, }}>  {data[nomor].nomor}  </Text></Text>

                        <View style={{}}>
                            <Text style={{ flex: 1, fontFamily: fonts.secondary[600] }}>Sisa Waktu : </Text>
                            <CountDown
                                until={60 * 60}
                                size={15}
                                onFinish={sendServer}
                                digitStyle={{ backgroundColor: colors.primary }}
                                digitTxtStyle={{ color: colors.white }}
                                timeToShow={['M', 'S']}
                                timeLabels={{ m: 'Menit', s: 'Detik' }}
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={{
                            fontFamily: fonts.primary[400], fontSize: 14
                        }}>{data[nomor].soal} </Text>

                        <TouchableOpacity

                            onPress={() => {



                                if (!pilih[nomor].a) {
                                    pilih[nomor] = { b: false, c: false, d: false, a: true };
                                    setPilih([...pilih])

                                    if (data[nomor].jawaban == 'A' && !betul[nomor]) {

                                        betul[nomor] = true;
                                        setBetul([...betul])


                                        skor[nomor] = 1;
                                    } else if (data[nomor].jawaban == 'A' && betul[nomor]) {
                                        betul[nomor] = false;
                                        setBetul([...betul])
                                        skor[nomor] = skor[nomor] - 1;
                                    } else if (data[nomor].jawaban !== 'A' && betul[nomor]) {
                                        betul[nomor] = false;
                                        setBetul([...betul])
                                        skor[nomor] = skor[nomor] - 1;
                                    }
                                } else {
                                    pilih[nomor] = { ...pilih[nomor], a: false };
                                    setPilih([...pilih])
                                    if (data[nomor].jawaban == 'A' && betul[nomor]) {
                                        betul[nomor] = false;
                                        setBetul([...betul])
                                        skor[nomor] = skor[0] - 1;
                                    }

                                }

                            }}

                            style={{ flexDirection: 'row', marginVertical: 5, position: 'relative', paddingLeft: 5 }}>

                            <Text style={{ fontFamily: fonts.primary[400], fontSize: 14 }}>A. </Text>
                            {pilih[nomor].a && <View style={{
                                position: 'absolute',
                                left: -1,
                                top: -2
                            }}><Icon type='ionicon' name='close' size={20} color={colors.primary} /></View>}
                            <Text style={{ left: 10, fontFamily: fonts.primary[400], fontSize: 14 }}>{data[nomor].a}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity

                            onPress={() => {

                                if (!pilih[nomor].b) {
                                    pilih[nomor] = { a: false, c: false, d: false, b: true };
                                    setPilih([...pilih])
                                    if (data[nomor].jawaban == 'B' && !betul[nomor]) {
                                        betul[nomor] = true;
                                        setBetul([...betul])

                                        skor[nomor] = 1;
                                    } else if (data[nomor].jawaban == 'B' && betul[nomor]) {
                                        betul[nomor] = false;
                                        setBetul([...betul])
                                        skor[nomor] = skor[nomor] - 1;
                                    } else if (data[nomor].jawaban !== 'B' && betul[nomor]) {
                                        betul[nomor] = false;
                                        setBetul([...betul])
                                        skor[nomor] = skor[nomor] - 1;
                                    }
                                } else {
                                    pilih[nomor] = { ...pilih[nomor], b: false };
                                    setPilih([...pilih])
                                    if (data[nomor].jawaban == 'B' && betul[nomor]) {
                                        betul[nomor] = false;
                                        setBetul([...betul])
                                        skor[nomor] = skor[0] - 1;
                                    }

                                }

                            }}

                            style={{ flexDirection: 'row', marginVertical: 5, position: 'relative', paddingLeft: 5 }}>

                            <Text style={{ fontFamily: fonts.primary[400], fontSize: 14 }}>B. </Text>
                            {pilih[nomor].b && <View style={{
                                position: 'absolute',
                                left: -1,
                                top: -2
                            }}><Icon type='ionicon' name='close' size={20} color={colors.primary} /></View>}
                            <Text style={{ left: 10, fontFamily: fonts.primary[400], fontSize: 14 }}>{data[nomor].b} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity

                            onPress={() => {

                                if (!pilih[nomor].c) {
                                    pilih[nomor] = { b: false, a: false, d: false, c: true };
                                    setPilih([...pilih])
                                    if (data[nomor].jawaban == 'C' && !betul[nomor]) {
                                        betul[nomor] = true;
                                        setBetul([...betul])
                                        skor[nomor] = 1;
                                    } else if (data[nomor].jawaban == 'C' && betul[nomor]) {
                                        betul[nomor] = false;
                                        setBetul([...betul])
                                        skor[nomor] = skor[nomor] - 1;
                                    } else if (data[nomor].jawaban !== 'C' && betul[nomor]) {
                                        betul[nomor] = false;
                                        setBetul([...betul])
                                        skor[nomor] = skor[nomor] - 1;
                                    }
                                } else {
                                    pilih[nomor] = { ...pilih[nomor], c: false };
                                    setPilih([...pilih])
                                    if (data[nomor].jawaban == 'C' && betul[nomor]) {
                                        betul[nomor] = false;
                                        setBetul([...betul])
                                        skor[nomor] = skor[0] - 1;
                                    }

                                }

                            }}

                            style={{ flexDirection: 'row', marginVertical: 5, position: 'relative', paddingLeft: 5 }}>

                            <Text style={{ fontFamily: fonts.primary[400], fontSize: 14 }}>C. </Text>
                            {pilih[nomor].c && <View style={{
                                position: 'absolute',
                                left: -1,
                                top: -2
                            }}><Icon type='ionicon' name='close' size={20} color={colors.primary} /></View>}
                            <Text style={{ left: 10, fontFamily: fonts.primary[400], fontSize: 14 }}>{data[nomor].c} </Text>
                        </TouchableOpacity>

                        <TouchableOpacity

                            onPress={() => {

                                if (!pilih[nomor].d) {
                                    pilih[nomor] = { b: false, c: false, a: false, d: true };
                                    setPilih([...pilih])
                                    if (data[nomor].jawaban == 'D' && !betul[nomor]) {
                                        betul[nomor] = true;
                                        setBetul([...betul])
                                        skor[nomor] = 1;
                                    } else if (data[nomor].jawaban == 'D' && betul[nomor]) {
                                        betul[nomor] = false;
                                        setBetul([...betul])
                                        skor[nomor] = skor[nomor] - 1;
                                    } else if (data[nomor].jawaban !== 'D' && betul[nomor]) {
                                        betul[nomor] = false;
                                        setBetul([...betul])
                                        skor[nomor] = skor[nomor] - 1;
                                    }
                                } else {
                                    pilih[nomor] = { ...pilih[nomor], d: false };
                                    setPilih([...pilih])
                                    if (data[nomor].jawaban == 'D' && betul[nomor]) {
                                        betul[nomor] = false;
                                        setBetul([...betul])
                                        skor[nomor] = skor[0] - 1;
                                    }

                                }

                            }}

                            style={{ flexDirection: 'row', marginVertical: 5, position: 'relative', paddingLeft: 5 }}>

                            <Text style={{ fontFamily: fonts.primary[400], fontSize: 14 }}>D. </Text>
                            {pilih[nomor].d && <View style={{
                                position: 'absolute',
                                left: -1,
                                top: -2
                            }}><Icon type='ionicon' name='close' size={20} color={colors.primary} /></View>}
                            <Text style={{ left: 10, fontFamily: fonts.primary[400], fontSize: 14 }}>{data[nomor].d} </Text>
                        </TouchableOpacity>

                    </View>

                </View>}

            </View>
            <View style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {ragu[nomor] && <Text style={{ fontFamily: fonts.secondary[800], fontSize: 20, color: colors.white }}>Ragu-ragu</Text>}
            </View>
            <View style={{
                flexDirection: 'row',
                height: 40,
            }}>
                <View style={{
                    flex: 1,
                    padding: 2,
                }}>
                    {nomor > 0 && <TouchableOpacity onPress={() => {
                        // data.length
                        setNomor(nomor - 1);
                    }} style={{
                        padding: 5,
                        height: 40,
                        flexDirection: 'row',
                        backgroundColor: colors.mybutton,
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <Icon type='ionicon' name='arrow-back-outline' color={colors.white} size={14} />
                        <Text style={{
                            left: 5,
                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            fontSize: windowWidth / 32
                        }}>Soal Sebelumnya</Text>
                    </TouchableOpacity>}
                </View>
                <View style={{
                    flex: 0.8,
                    padding: 2,
                    height: 40,

                }}>
                    <TouchableOpacity onPress={() => {
                        ragu[nomor] = true;
                        setRagu([...ragu])
                    }} style={{
                        padding: 5,
                        height: 40,
                        flexDirection: 'row',
                        backgroundColor: colors.primary,
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}>
                        <Icon type='ionicon' name='stop' color={colors.white} size={15} />
                        <Text style={{
                            left: 5,
                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            fontSize: windowWidth / 32
                        }}>Ragu-ragu</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    padding: 2,
                    height: 40,
                }}>
                    {nomor < (data.length - 1) &&
                        <TouchableOpacity onPress={() => {
                            // data.length
                            setNomor(nomor + 1);
                        }} style={{
                            padding: 5,
                            height: 40,
                            flexDirection: 'row',
                            backgroundColor: colors.mybutton,
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>

                            <Text style={{
                                right: 5,

                                fontFamily: fonts.secondary[600],
                                color: colors.white,
                                fontSize: windowWidth / 32
                            }}>Soal Berikutnya</Text>
                            <Icon type='ionicon' name='arrow-forward' color={colors.white} size={15} />
                        </TouchableOpacity>}

                    {nomor == (data.length - 1) &&
                        <TouchableOpacity onPress={sendServer} style={{
                            padding: 5,
                            height: 40,
                            flexDirection: 'row',
                            backgroundColor: colors.success,
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>

                            <Text style={{
                                right: 5,

                                fontFamily: fonts.secondary[600],
                                color: colors.black,
                                fontSize: windowWidth / 32
                            }}>Selesai</Text>
                            <Icon type='ionicon' name='checkmark-circle' color={colors.black} size={15} />
                        </TouchableOpacity>}
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