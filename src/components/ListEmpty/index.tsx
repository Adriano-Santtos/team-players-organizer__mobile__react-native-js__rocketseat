import { Container, Message } from "./style";

type Props = {
    message: String;
}

export function ListEmpty({message}: Props){
    return(
        <Container>
            <Message>
                {message}
            </Message>
        </Container>
    )
}