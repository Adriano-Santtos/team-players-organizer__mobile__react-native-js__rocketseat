import React, {useState} from "react";
import {Alert, FlatList} from "react-native";
import {useRoute} from "@react-navigation/native";

import {Header} from "@components/Header";
import {Highlight} from "@components/HighLight";
import {Button} from "@components/Button";
import {ButtonIcon} from "@components/ButtonIcon";
import {Input} from "@components/Input";
import {Filter} from "@components/Filter";
import {PlayerCard} from "@components/PlayerCard";
import {ListEmpty} from "@components/ListEmpty";

import {Container, Form, HeaderList, NumbersOfPlayers} from "@screens/Players/styles";
import {playerAddByGroup} from "@storage/players/playerAddByGroup";
import {AppError} from "@utils/AppError";

type RouteParams = {
    group: string;
}

export function Players() {
    const [team, setTeam] = useState('Time A');
    const [player, setPlayer] = useState([]);
    const [playerName, setPlayerName] = useState('');

    const route = useRoute();
    const {group} = route.params as RouteParams

    async function handleAddPlayer() {
        if (playerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.');
        }

        const newPlayer = {
            name: playerName,
            team: team,
        }

        try {
            await playerAddByGroup(newPlayer, group)

        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
            }
        }

    }

    return (
        <Container>
            <Header
                showBackButton
            />

            <Highlight
                title={group}
                subTitle="adicione a galera e separe os times"
            />

            <Form>
                <Input
                    placeholder='Nome da pessoa'
                    autoCorrect={false} //corretor não vai tentar corrigir a entrada
                    onChangeText={setPlayerName}
                />
                <ButtonIcon
                    icon='add'
                    onPress={handleAddPlayer}
                />
            </Form>

            <HeaderList>
                <FlatList
                    horizontal
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}
                />

                <NumbersOfPlayers>
                    {player.length}
                </NumbersOfPlayers>
            </HeaderList>
            <FlatList
                data={player}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <PlayerCard
                        name={item}
                        onRemove={() => {
                        }}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty
                        message="Não há pessaos nesse time."
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    {paddingBottom: 100},
                    player.length === 0 && {flex: 1} // caso não há dados na lista
                ]} // aumentar o espaçamento entre a borda e o último elemento
            />

            <Button
                title="Remover turma"
                type="SECUNDARY"
            />

        </Container>

    )
}
