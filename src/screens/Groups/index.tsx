import {Header} from '@components/Header';
import {Highlight} from '@components/HighLight'
import {Container} from './styles';
import {GroupCard} from '@components/GroupCard';
import {useState} from "react";
import {FlatList} from "react-native";
import {ListEmpty} from '@components/ListEmpty';
import {Button} from "@components/Button";

export function Groups() {
    const [groups, setGroups] = useState([]);
    return (
        <Container>
            <Header showBackButton/>

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
            />


        </Container>
    );
}
