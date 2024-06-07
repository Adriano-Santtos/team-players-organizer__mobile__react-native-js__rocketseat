import {TextInput, TextInputProps} from 'react-native';
import {Container} from "@components/Input/styles";
import {useTheme} from "styled-components/native";
import React from "react";

type Props = TextInputProps & {
    inputRef?: React.RefObject<TextInput>;
}

export function Input({...rest}: Props) {
    const {COLORS} = useTheme();

    return (
        <Container
            placeholderTextColor={COLORS.GRAY_300}
            {...rest}
        />
    );
}
