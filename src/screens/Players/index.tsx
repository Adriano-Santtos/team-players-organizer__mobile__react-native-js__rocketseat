import {Container} from "@screens/Players/styles";
import {Header} from "@components/Header";
import {Highlight} from "@components/HighLight";
import {ButtonIcon} from "@components/ButtonIcon";

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
            <ButtonIcon/>
        </Container>

    )
}
