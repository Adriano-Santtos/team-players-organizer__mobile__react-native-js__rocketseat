import { Header } from '@components/Header';
import { Highlight } from '@components/HighLight'
import { Container } from './styles';

export function Groups() {
  return (
    <Container>
      <Header showBackButton/>

      <Highlight 
        title='Turmas'
        subTitle='jogue com a sua turma'
      />
      
    </Container>
  );
}
