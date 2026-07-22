import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./layouts/NavBar";
import { Home } from "./pages/Home";
import { Learn } from "./pages/Learn";
import { CategoryPage } from "./pages/CategoryPage";
import { AlgorithmPage } from "./pages/AlgorithmPage";
import { About } from "./pages/About";
import { Playground } from "./pages/Playground";
import { Compare } from "./pages/Compare";
import { Interview } from "./pages/Interview";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:category" element={<CategoryPage />} />
        <Route path="/learn/:category/:algorithm" element={<AlgorithmPage />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
