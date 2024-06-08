import React, {useEffect, useRef, useState} from "react";
import {Alert, FlatList, TextInput} from "react-native";
import {useRoute} from "@react-navigation/native";

import {AppError} from "@utils/AppError";

import {Header} from "@components/Header";
import {Highlight} from "@components/HighLight";
import {Button} from "@components/Button";
import {Input} from "@components/Input";
import {Filter} from "@components/Filter";
import {PlayerCard} from "@components/PlayerCard";
import {ButtonIcon} from "@components/ButtonIcon";
import {ListEmpty} from "@components/ListEmpty";

import {playerAddByGroup} from "@storage/players/playerAddByGroup";
import {playersGetByGroupAndTeam} from "@storage/players/playersGetByGroupAndTeam";
import {PlayersStorageDTO} from "@storage/players/PlayersStorageDTO";

import {Container, Form, HeaderList, NumbersOfPlayers} from "@screens/Players/styles";
import {playerRemoveByGroup} from "@storage/players/playerRemoveByGroup";

type RouteParams = {
    group: string;
}

export function Players() {
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayersStorageDTO[]>([]);
    const [newPlayerName, setNewPlayerName] = useState('');

    const newPlayerNameInputRef = useRef<TextInput>(null)

    const route = useRoute();
    const {group} = route.params as RouteParams

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.');
        }

        const newPlayer = {
            name: newPlayerName,
            team: team,
        }

        try {
            await playerAddByGroup(newPlayer, group);

            newPlayerNameInputRef.current?.blur();

            setNewPlayerName('');

            await fetchPlayersByTeam();
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            const playerByTeam = await playersGetByGroupAndTeam(group, team)
            setPlayers(playerByTeam)
        } catch (error) {
            console.log(error)
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.');
        }
    }

    async function handleRemovePlayer(playerName: string) {
        try {
            await playerRemoveByGroup(group, playerName)
            await fetchPlayersByTeam()
        } catch (error) {
            console.log(error)
            Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.')
        }
    }

    useEffect(() => {
            fetchPlayersByTeam()
        }, [team]
    )

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
                    inputRef={newPlayerNameInputRef}
                    value={newPlayerName}
                    placeholder='Nome da pessoa'
                    autoCorrect={false} //corretor não vai tentar corrigir a entrada
                    onChangeText={setNewPlayerName}
                    onSubmitEditing={handleAddPlayer} // config para o enter do teclado disparar a ação
                    returnKeyType="done" // idem de cima
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
                    {players.length}
                </NumbersOfPlayers>
            </HeaderList>
            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                    <PlayerCard
                        name={item.name}
                        onRemove={() => handleRemovePlayer(item.name)}
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
                    players.length === 0 && {flex: 1} // caso não há dados na lista
                ]} // aumentar o espaçamento entre a borda e o último elemento
            />

            <Button
                title="Remover turma"
                type="SECUNDARY"
            />

        </Container>

    )
}
