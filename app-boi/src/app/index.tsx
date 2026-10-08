import {
  StyleSheet,
  View,
  Text,
  Alert,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { fetch } from 'expo/fetch';
import { File } from 'expo-file-system';

export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [resultado, setResultado] = useState<string | null>(null);
  const [confianca, setConfianca] = useState<number | null>(null);

  const [classificando, setClassificando] = useState(false);

  const tirarFoto = async () => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de acesso à câmera para tirar a foto.'
      );

      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    const uri = result.assets[0].uri;

    setImage(uri);
    setResultado(null);
    setConfianca(null);

    await classificarImagem(uri);
  };

  const classificarImagem = async (uri: string) => {
    setClassificando(true);

    try {
      const file = new File(uri);

      const formData = new FormData();

      formData.append('file', file);

      const API_URL = process.env.EXPO_PUBLIC_API_URL;

      const response = await fetch(
        `${API_URL}/api/classification`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const resultado = await response.json();
      console.log('resultado', resultado);
      setResultado(resultado.classe);
      setConfianca(resultado.confianca);

      if (!response.ok) {
        throw new Error(
          `Erro HTTP ${response.status}: ${JSON.stringify(resultado)}`
        );
      }

      console.log('Resultado:', resultado);

    } catch (error) {
      console.error('Erro ao classificar imagem:', error);
    } finally {
      setClassificando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Que Boi É Teu?
      </Text>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}

      
      <Button
        title={
          classificando
            ? 'Classificando...'
            : 'Tirar foto'
        }
        onPress={tirarFoto}
        disabled={classificando}
      />
      

      {classificando && (
        <View style={styles.loading}>
          <ActivityIndicator size="small" />

          <Text style={styles.loadingText}>
            Analisando resultado...
          </Text>
        </View>
      )}

      {resultado && confianca !== null && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoLabel}>
            Resultado
          </Text>

          <Text style={styles.resultado}>
            {resultado}
          </Text>

          <Text style={styles.confianca}>
            Confiança: {(confianca * 100).toFixed(2)}%
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginBottom: 30,
    resizeMode: 'cover',
  },

  loading: {
    alignItems: 'center',
    marginTop: 20,
  },

  loadingText: {
    marginTop: 8,
    color: '#555',
  },

  resultadoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },

  resultadoLabel: {
    fontSize: 16,
    color: '#666',
  },

  resultado: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },

  confianca: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
});