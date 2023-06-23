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
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

export default function AccountEdit({ navigation, route }) {


    const [kirim, setKirim] = useState(route.params);
    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'update_profile', kirim).then(res => {

            setLoading(false);

            if (res.data.status == 200) {
                Alert.alert(MYAPP, res.data.message);
                console.log(res.data.data);
                storeData('user', res.data.data);
                navigation.replace('Home');
            }
        })
    }

    return (
        <LinearGradient colors={[colors.secondary, colors.primary]} style={{
            flex: 1,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <MyInput label="NISN" iconname="card" value={kirim.nisn} onChangeText={x => setKirim({ ...kirim, nisn: x })} />
                <MyGap jarak={10} />
                <MyInput label="Nama Siswa" iconname="person" value={kirim.nama_siswa} onChangeText={x => setKirim({ ...kirim, nama_siswa: x })} />
                <MyGap jarak={10} />
                <MyInput label="Asal Sekolah" iconname="school" value={kirim.asal_sekolah} onChangeText={x => setKirim({ ...kirim, asal_sekolah: x })} />


                {/* <MyGap jarak={10} />
                <MyInput label="Password" iconname="key" secureTextEntry={true} onChangeText={x => setKirim({ ...kirim, newpassword: x })} placeholder="Kosongkan jika tidak diubah" /> */}
                <MyGap jarak={20} />
                {loading && <ActivityIndicator color={colors.primary} size="large" />}

                {!loading && <MyButton onPress={sendServer} warna={colors.foourty} title="Simpan Perubahan" Icons="download-outline" />}
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({})