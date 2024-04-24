import {Header} from '@components/Header';
import {Highlight} from '@components/HighLight'
import {Container} from './styles';
import {GroupCard} from '@components/GroupCard';
import {useState} from "react";
import {FlatList} from "react-native";

export function Groups() {
    const [groups, setGroups] = useState(['galera da Rocket','grupo da igreja']);
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
            />


        </Container>
    );
}
