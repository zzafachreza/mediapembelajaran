import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

export default function ({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);



    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {

                setOpen(true);
                setUser(res);

            });
        }




    }, [isFocused]);

    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.replace('Login');
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    marginVertical: 3,
                    padding: 5,
                    backgroundColor: colors.white,
                    borderRadius: 5,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.primary,
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <LinearGradient colors={[colors.secondary, colors.primary]} style={{
            flex: 1,
            padding: 10,
        }}>

            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}

            {open && <>


                {/* data detail */}
                <View style={{ padding: 10, flex: 1 }}>
                    <MyList label="NISN" value={user.nisn} />
                    <MyList label="Nama Siswa" value={user.nama_siswa} />
                    <MyList label="Asal Sekolah" value={user.asal_sekolah} />
                </View>
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-around' }}>

                    <View style={{
                        flex: 1,
                        margin: 5
                    }}>
                        <MyButton
                            onPress={() => navigation.navigate('AccountEdit', user)}
                            title="Edit Profile"

                            warna={colors.foourty}
                            Icons="create-outline"
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        margin: 5
                    }}>
                        <MyButton
                            onPress={btnKeluar}
                            title="Keluar"
                            colorText={colors.black}
                            iconColor={colors.black}
                            warna={colors.secondary}
                            Icons="log-out-outline"
                        />
                    </View>

                </View>
            </>}
        </LinearGradient >
    );
}

const styles = StyleSheet.create({});
