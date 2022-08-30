import DrawBoard from "./components/DrawBoard";
import Header from "./components/Header";
import { StyledApp } from "./StyledApp";

function App() {
  return (
    <StyledApp>
      <Header />
      <DrawBoard />
    </StyledApp>
  );
}

export default App;
