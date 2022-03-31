import React, { useContext, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Data from "./data.js";
import Detail from "./Detail.js";
import axios from "axios";

import { Link, Route, Switch } from "react-router-dom";

let 재고context = React.createContext();

function App() {
  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10, 11, 12]);

  console.log(shoes[0]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">슈즈샵</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                Detail
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <div className="main">
            <h1>20% Season off</h1>
            <p>시즌오프</p>
            <p>
              <button>버튼</button>
            </p>
          </div>

          <div className="container">
            <재고context.Provider value={재고}>
              <div className="row">
                {shoes.map((a, i) => {
                  return <Card shoes={shoes[i]} i={i} key={i} />; //shoes={a}라고 적어도됨
                })}

                {/* <Card shoes={shoes[0]} />
                        <Card shoes={shoes[1]} />
                        <Card shoes={shoes[2]} /> */}
              </div>
            </재고context.Provider>

            <button
              className="btn btn-primary"
              onClick={() => {
                axios.post("서버URL", { id: "codingapple", pw: 1234 });
                //로딩중이라는 UI띄움
                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((result) => {
                    //로딩중이라는 UI안보이게 처리
                    console.log(result.data);
                    shoes변경([...shoes, ...result.data]);
                  })
                  .catch(() => {
                    //로딩중이라는 UI안보이게 처리
                    console.log("실패했어요");
                  });
              }}
            >
              더보기
            </button>
          </div>
        </Route>

        <Route path="/detail/:id">
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
        </Route>

        <Route path="/:id">
          <div>아무거나 적었을때 이게 보여라</div>
        </Route>
      </Switch>
      {/* 안에 담은 Route 들이 하나씩만 보임 */}
      {/* <Route path="/어쩌구" component={Modal} /> */}
    </div>
  );
}

function Card(props) {
  console.log(props);

  let 재고 = useContext(재고context);

  return (
    <div className="col-md-4">
      <img
        alt="신발"
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="100%"
      />
      <h4>{props.shoes.title}</h4>
      <p>
        {props.shoes.content} & {props.shoes.price}
      </p>
      <Test></Test>
      {/* {재고[props.i]} */}
    </div>
  );
}
Function Text(){
  let 재고 = useContext(재고context)
  return <p>{재고}</p>
}

export default App;
