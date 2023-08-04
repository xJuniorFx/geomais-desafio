import { Col, Divider, Layout, Row } from "antd";
import React from "react";
import imagem from "../../assets/logo-expanded.png";

const { Header } = Layout;

const CustomHeader = () => {
  return (
    <Header color="dark" style={{ padding: "0" }}>
      <Row justify="end">
        <Col style={{ padding: "5px 10px" }} span="md">
          <img src={imagem} alt="Logo Geomais" />
        </Col>
      </Row>
    </Header>
  );
};

export default CustomHeader;
