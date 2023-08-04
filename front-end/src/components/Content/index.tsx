import React from "react";
import { Layout } from "antd";
import CustomForm from "../Form";
import Tabela from "../Table";
import { Content } from "antd/es/layout/layout";

const Conteudo = () => {
  return (
    <Layout className="site-layout" style={{ marginLeft: 80 }}>
      <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
        <section style={{ padding: 24, textAlign: "center" }}>
          <h1
            style={{
              color: "#008F3A",
              fontSize: "30px",
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
          >
            Cadastro de Clientes
          </h1>
          <CustomForm />
        </section>
        <section style={{ padding: 24, textAlign: "center" }}>
          <h1
            style={{
              color: "#008F3A",
              fontSize: "30px",
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
          >
            Tabela de Clientes
          </h1>

          <Tabela />
        </section>
      </Content>
    </Layout>
  );
};

export default Conteudo;
