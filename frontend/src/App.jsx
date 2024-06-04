import '@radix-ui/themes/styles.css';
import{configureWeb3Modal} from "./connection";
import './App.css';
import { Container } from '@radix-ui/themes';
import { Header } from './components/Header';

configureWeb3Modal();
function App() {

  return (
    <Container>
      <Header/>
    </Container>
  )
}

export default App
