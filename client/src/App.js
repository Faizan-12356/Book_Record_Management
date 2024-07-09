import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css';
import Book from "./component/Book";
import Update from "./component/Update";
import Add from "./component/Add";
import "./style.css"

function App() {
  return (
    < >
    <div className="App">
  <Router>
    <Routes>
    <Route path="/" element={<Book/>}/>
    <Route path="/add" element={<Add/>}/>
    <Route path="/update/:id" element={<Update />} />
    </Routes>
  </Router>
    </div>
    </>
  );
}

export default App;