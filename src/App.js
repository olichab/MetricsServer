import React from "react";
import { Container } from "reactstrap";
import DashBoard from "./components/DashBoard";
import TopBar from "./components/TopBar";
import "./scss/App.scss";

function App() {
  return (
    <Container className="App">
      <h2>Metrics server</h2>
      <TopBar />
      <DashBoard />
    </Container>
  );
}

export default App;
