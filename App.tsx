import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import MapView, { Marker, Region } from 'react-native-maps';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  Login: undefined;
  Dashboard: { name: string };
  Map: { name: string };
};

type AuthUser = {
  name: string;
  email: string;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthContext = createContext<ReturnType<typeof useAuthMock> | null>(null);

function useAuthMock() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (!email.includes('@') || password.length < 4) {
      setIsLoading(false);
      throw new Error('Use um e-mail valido e senha com no minimo 4 caracteres.');
    }

    const name = email.split('@')[0];
    setUser({
      email,
      name: name.charAt(0).toUpperCase() + name.slice(1),
    });
    setIsLoading(false);
    return name;
  };

  const logout = () => setUser(null);

  return { user, isLoading, login, logout };
}

function LoginScreen({ navigation }: any) {
  const { login, isLoading } = useAuthMockContext();
  const [email, setEmail] = useState('aluno@usjt.br');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');

  const canSubmit = useMemo(() => email.trim() !== '' && password.trim() !== '', [email, password]);

  const onLogin = async () => {
    try {
      setError('');
      const name = await login(email.trim(), password.trim());
      navigation.replace('Dashboard', { name: name.charAt(0).toUpperCase() + name.slice(1) });
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.centeredBlock}>
        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.subtitle}>Use um login mocado para a demo.</Text>

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
        />

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <Pressable
          style={[styles.button, (!canSubmit || isLoading) && styles.buttonDisabled]}
          disabled={!canSubmit || isLoading}
          onPress={onLogin}
        >
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Fazer login</Text>}
        </Pressable>
      </KeyboardAvoidingView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

function DashboardScreen({ route, navigation }: any) {
  const { logout } = useAuthMockContext();
  const name = route.params?.name ?? 'Aluno';

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.contentWrap}>
        <Text style={styles.title}>Ola, {name}. Seja bem-vindo.</Text>
        <Text style={styles.subtitle}>Resumo rapido da aula:</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Status</Text>
          <Text style={styles.cardText}>Aplicacao pronta para abrir o mapa.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dica de UX</Text>
          <Text style={styles.cardText}>Sempre mostre loading, erro e estado de sucesso.</Text>
        </View>

        <Pressable style={styles.button} onPress={() => navigation.navigate('Map', { name })}>
          <Text style={styles.buttonText}>Ver minha localizacao</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.secondaryButton]}
          onPress={() => {
            logout();
            navigation.replace('Login');
          }}
        >
          <Text style={styles.secondaryButtonText}>Sair</Text>
        </Pressable>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

function MapScreen({ route }: any) {
  const name = route.params?.name ?? 'Aluno';
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState('');
  const [region, setRegion] = useState<Region | null>(null);

  useEffect(() => {
    const loadLocation = async () => {
      try {
        // Primeiro pede permissao em tempo de execucao (ponto-chave no mobile).
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocationError('Permissao negada. Ative a localizacao para visualizar o mapa.');
          setIsLoading(false);
          return;
        }

        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setRegion({
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } catch {
        setLocationError('Nao foi possivel obter sua localizacao no momento.');
      } finally {
        setIsLoading(false);
      }
    };

    loadLocation();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centeredBlock}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <Text style={styles.subtitle}>Buscando sua localizacao...</Text>
      </SafeAreaView>
    );
  }

  if (locationError || !region) {
    return (
      <SafeAreaView style={styles.centeredBlock}>
        <Text style={styles.errorText}>{locationError || 'Sem dados de localizacao.'}</Text>
        <Pressable style={styles.button} onPress={() => Alert.alert('Dica', 'Verifique as permissoes do app no celular.') }>
          <Text style={styles.buttonText}>Como resolver</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.mapHeader}>
        <Text style={styles.title}>Mapa de {name}</Text>
        <Text style={styles.subtitle}>Localizacao atual no dispositivo.</Text>
      </View>
      <MapView style={styles.map} initialRegion={region}>
        <Marker coordinate={region} title="Voce esta aqui" />
      </MapView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

function useAuthMockContext() {
  const contextValue = useContext(AuthContext);
  if (!contextValue) {
    throw new Error('Auth context nao inicializado.');
  }
  return contextValue;
}

export default function App() {
  const auth = useAuthMock();

  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerBackTitle: 'Voltar' }}>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
          <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Mapa' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f7fb',
  },
  centeredBlock: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f3f7fb',
  },
  contentWrap: {
    padding: 20,
    gap: 12,
  },
  mapHeader: {
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#152238',
  },
  subtitle: {
    fontSize: 14,
    color: '#4a5d78',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c8d6e5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginTop: 12,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#0a7ea4',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#0a7ea4',
  },
  secondaryButtonText: {
    color: '#0a7ea4',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#deebf5',
    gap: 4,
  },
  cardTitle: {
    color: '#152238',
    fontWeight: '700',
  },
  cardText: {
    color: '#334e68',
  },
  errorText: {
    marginTop: 8,
    color: '#b42318',
    fontWeight: '600',
  },
  map: {
    flex: 1,
    marginTop: 12,
  },
});
