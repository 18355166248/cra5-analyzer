import "./App.css";
import IsFunctionComp from "./pages/IsFunctionComp";
import MiDesign from "./pages/MiDesign";
import Checkstand from "./pages/PreCheckstand";

function App() {
  return (
    <div className="App">
      <MiDesign />
      <IsFunctionComp />
      <Checkstand title="收银台" />
    </div>
  );
}

export default App;
