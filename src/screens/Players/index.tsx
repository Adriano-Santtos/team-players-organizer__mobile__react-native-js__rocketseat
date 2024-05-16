import {Container, Form} from "@screens/Players/styles";
import {Header} from "@components/Header";
import {Highlight} from "@components/HighLight";
import {ButtonIcon} from "@components/ButtonIcon";
import {Input} from "@components/Input";

export function Players() {
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
        </Container>

    )
}
