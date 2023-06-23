import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, ImageBackground } from 'react-native';
import { fonts, windowWidth, colors } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';

export default function ({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    nisn: null,
    password: null
  });
  const [loading, setLoading] = useState(false);



  const masuk = () => {


    if (kirim.nisn == null && kirim.password == null) {
      alert('nisn dan Passwoord tidak boleh kosong !');
    } else if (kirim.nisn == null) {
      alert('nisn tidak boleh kosong !');
    } else if (kirim.password == null) {
      alert('Passwoord tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);

      axios
        .post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            showMessage({
              type: 'danger',
              message: res.data.message
            })
          } else {
            storeData('user', res.data.data);
            navigation.replace('Home')
          }

        });



    }




  }

  useEffect(() => {

    // const backAction = () => {
    //   Alert.alert("Info Wks", "Apakah kamu yakin akan keluar aplikasi ?", [
    //     {
    //       text: "Cancel",
    //       onPress: () => null,
    //       style: "cancel"
    //     },
    //     { text: "YES", onPress: () => BackHandler.exitApp() }
    //   ]);
    //   return true;
    // };

    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );

    // return () => backHandler.remove();
  }, [])

  return (
    <LinearGradient colors={[colors.secondary, colors.primary]} style={{
      flex: 1,
    }}>
      <ScrollView style={{ padding: 0, flex: 1, }}>
        <Image
          source={require('../../assets/head.png')}
          style={
            {
              width: windowWidth,
              height: 80,

            }
          }
        />

        <ImageBackground source={require('../../assets/upi.png')} style={{ marginVertical: 10, marginHorizontal: 20, flex: 1, }}>
          <View style={{
            backgroundColor: colors.black,
            padding: 10,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              textAlign: 'center',
              fontSize: windowWidth / 15
            }}>MASUK</Text>
          </View>
          <View style={{
            padding: 10,
          }}>
            <MyInput colorIcon={colors.white} styleLabel={{
              color: colors.white
            }} label="NISN*" onChangeText={val => setKirim({
              ...kirim,
              nisn: val
            })}
              iconname="card" placeholder="Masukan nisn Anda" />
            <MyGap jarak={20} />
            <MyInput colorIcon={colors.white} styleLabel={{
              color: colors.white
            }}
              onChangeText={val => setKirim({
                ...kirim,
                password: val
              })}
              secureTextEntry={true}
              label="Password*"
              iconname="lock-closed"
              placeholder="Masukan password Anda"
            />
            <MyGap jarak={40} />


            <MyButton
              onPress={masuk}
              title="Masuk"
              warna={colors.background}
              Icons="log-in-outline"
            />


          </View>

        </ImageBackground>
        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
