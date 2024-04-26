import {Container, Content, Icon} from "@screens/NewGroup/styles";
import {Header} from "@components/Header";
import {Highlight} from "@components/HighLight";
import {Button} from "@components/Button";

export function NewGroup() {
    return (
        <Container>
            <Header showBackButton/>
            <Content>
                <Icon/>
                <Highlight
                    title={"Nova Turma"}
                    subTitle={"Crie a turma para adicionar as pessoas "}
                />
                <Button title={"Criar"}/>
            </Content>
        </Container>
    )
}
