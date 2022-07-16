import React from "react";
import Addorder from "./Components/Addorder";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Style from "./App.css";
import Footer from "./Components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Detail from "./Components/Detail";
function App(){
    return(
        <>
           <Router>
            <Header/>
         <main className="main_clas">
         <Routes>
            <Route path="/addorder" element={<Addorder />} />
            <Route path="/" element={ <Home />} />
            <Route path="/detail/:product_id" element={ <Detail />} /> 
         </Routes>
         </main>
         <Footer />
           </Router>
        </>
    )
}

export default App;