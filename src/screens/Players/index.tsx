import {useState} from "react";
import {FlatList} from "react-native";

import {Header} from "@components/Header";
import {Highlight} from "@components/HighLight";
import {Button} from "@components/Button";
import {ButtonIcon} from "@components/ButtonIcon";
import {Input} from "@components/Input";
import {Filter} from "@components/Filter";
import {PlayerCard} from "@components/PlayerCard";
import {ListEmpty} from "@components/ListEmpty";

import {Container, Form, HeaderList, NumbersOfPlayers} from "@screens/Players/styles";


export function Players() {
    const [team, setTeam] = useState('Time A');
    const [player, setPlayer] = useState([]);

    return (
        <Container>
            <Header
                showBackButton
            />

            <Highlight
                title="Nome da turma"
                subTitle="adicione a galera e separe os times"
            />

            <Form>
                <Input
                    placeholder='Nome da pessoa'
                    autoCorrect={false} //corretor não vai tentar corrigir a entrada
                />
                <ButtonIcon
                    icon='add'
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
