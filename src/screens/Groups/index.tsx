import {useCallback, useState} from "react";
import {FlatList} from "react-native";

import {useFocusEffect, useNavigation} from '@react-navigation/native'

import {Header} from '@components/Header';
import {Highlight} from '@components/HighLight'
import {GroupCard} from '@components/GroupCard';
import {ListEmpty} from '@components/ListEmpty';
import {Button} from "@components/Button";

import {Container} from './styles';
import {groupGetAll} from "@storage/group/groupGetAll";

export function Groups() {
    const [groups, setGroups] = useState<string[]>([]);

    const navigation = useNavigation();

    function handleNewGroup() {
        navigation.navigate('new')
    }

    function handleOpenGroup(group: string) {
        navigation.navigate('players', {group})
    }

    async function fetchGroups() {
        try {
            const data = await groupGetAll();
            setGroups(data)
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchGroups()
    }, []))


    return (
        <Container>
            <Header/>

            <Highlight
                title='Turmas'
                subTitle='jogue com a sua turma'
            />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <GroupCard
                        title={item}
                        onPress={() => handleOpenGroup(item)}
                    />
                )}
                contentContainerStyle={groups.length === 0 && {flex: 1}}
                ListEmptyComponent={() => (
                    <ListEmpty
                        message="Que tal cadastrar a primeira turma?"
                    />
                )}
            />
            <Button
                title={"Criar nova turma"}
                onPress={handleNewGroup}
            />

        </Container>
    );
}
