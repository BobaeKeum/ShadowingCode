import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";

import { Nav } from "react-bootstrap";

import { CSSTransition } from "react-transition-group";

let 박스 = styled.div`
  padding: 20px;
`;
let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

function Detail(props) {
  let [alert, alert변경] = useState(true);
  let [inputData, inputData변경] = useState("");

  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);

  useEffect(() => {
    axios.get();

    let 타이머 = setTimeout(() => {
      alert변경(false);
    }, 2000);

    console.log("안녕");

    return () => {
      clearTimeout(타이머);
    };
  }, []);

  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (상품) {
    return 상품.id == id;
  });

  let history = useHistory();

  return (
    <div className="container">
      <박스>
        <제목 색상="blue">상세페이지</제목>
        <제목 className="red">상세페이지</제목>
      </박스>
      <div className="my-alert2">
        <p>재고가 얼마 남지 않았습니다.</p>
      </div>
      <div className="row">
        <div className="col-md-6">
          <img
            alt="신발"
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>

        <div className="col-md-6 mt-4">
          {/* <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].contents}</p>
          <p>{props.shoes[id].price}</p> */}

          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.contents}</p>
          <p>{찾은상품.price}</p>

          <Info 재고={props.재고} />

          <button
            className="btn btn-danger"
            onClick={() => {
              props.재고변경([9, 10, 11]);
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.push("/");
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav
        className="mt-5"
        defaultActiveKey="link-0"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        variant="tab"
      >
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              스위치변경(false);
              누른탭변경(0);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              스위치변경(false);
              누른탭변경(1);
            }}
          >
            Link
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              스위치변경(false);
              누른탭변경(2);
            }}
          >
            Link
          </Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item> */}
      </Nav>

      <CSSTransition in={스위치} classNames="wow" timeout={500}>
        <TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
      </CSSTransition>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.스위치변경(true);
  });

  if (props.누른탭 === 0) {
    return <div>0번째</div>;
  } else if (props.누른탭 === 1) {
    return <div>1번째</div>;
  } else if (props.누른탭 === 2) {
    return <div>2번째</div>;
  }
}

function Info(props) {
  return <p>재고 : {props.재고[0]}</p>;
}

export default Detail;
