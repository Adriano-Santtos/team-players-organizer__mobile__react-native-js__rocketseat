import {ThemeProvider} from 'styled-components/native';
import {StatusBar} from 'react-native';

import {Loading} from '@components/Loading';

import {Routes} from "./src/routes";

import theme from 'src/theme';
import {Roboto_400Regular, Roboto_700Bold, useFonts} from '@expo-google-fonts/roboto';


export default function App() {
    const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_700Bold});

    return (
        <ThemeProvider theme={theme}>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor="transparent"
                translucent
            />
            {fontsLoaded ? <Routes/> : <Loading/>}
        </ThemeProvider>
    );
}
