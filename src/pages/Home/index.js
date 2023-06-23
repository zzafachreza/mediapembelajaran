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



export default function Home({ navigation }) {

  const __renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('AASubbab', item)}>
        <LinearGradient colors={index % 2 != 0 ? [colors.foourty, colors.tertiary] : [colors.tertiary, colors.foourty]}

          start={{ x: 0.0, y: 0.50 }} end={{ x: 1.2, y: 0.0 }}

          style={{
            elevation: 1,
            padding: 5,
            borderRadius: 5,
            borderColor: colors.border,
            borderWidth: 1,
            marginVertical: 3,
          }}
        >
          <View style={{

            flexDirection: 'row'
          }}>
            <View>
              <Image style={{
                resizeMode: 'contain',
                width: 100,
                height: 120,
                borderRadius: 5,
              }} source={{
                uri: item.cover
              }} />
            </View>
            <View style={{
              flex: 1,
              paddingLeft: 5,
            }}>
              <Text style={{
                fontFamily: fonts.secondary[800],
                color: colors.white,
                fontSize: windowWidth / 25
              }}>{item.mata_pelajaran}</Text>
              <Text style={{
                fontFamily: fonts.secondary[400],
                color: colors.white,
                fontSize: windowWidth / 30
              }}>[{index + 1}] {item.nama_subbab}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity >
    )
  }

  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState('');
  const [comp, setComp] = useState({});
  const isFocused = useIsFocused();
  useEffect(() => {


    if (isFocused) {
      __getTransaction();
    }

  }, [isFocused]);



  const [cek, setCek] = useState(false);

  const __getTransaction = () => {
    getData('user').then(res => {
      setUser(res);
      axios.post(apiURL + 'cek_sudah', {
        fid_siswa: res.id_siswa,
        table: 'data_nilaiglobal'
      }).then(resz2 => {
        console.log('cek', resz2.data);
        if (resz2.data > 0) {
          setCek(true)
        } else {
          setCek(false)
        }
      })
    });

    axios.post(apiURL + 'subbab').then(res => {
      console.log(res.data);
      setData(res.data);
    })

    axios.post(apiURL + 'company').then(res => {
      console.log('company', res.data.data);
      setComp(res.data.data);
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
          }}>Materi Pilihan</Text>
        </LinearGradient>
        <FlatList data={data} renderItem={__renderItem} />
        <TouchableOpacity onPress={() => {
          // navigation.navigate('AATesglobal')

          setOpen(true);

          // if (!cek) {
          //   navigation.navigate('AATesglobal')
          // } else {
          //   Alert.alert(MYAPP, 'Kamu sudah mengerjakan tes ini !')
          // }
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
            <Text style={{
              left: 10,
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: windowWidth / 20
            }}>TES AKHIR</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

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
            navigation.navigate('AATesglobal');
            setOpen(false);
          } else {
            Alert.alert(MYAPP, 'Maaf Kode akses salah !');
            setKey('');
          }
        }} title="Submit" warna={colors.primary} />
      </View>}
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