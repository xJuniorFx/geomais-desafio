import "./Form.css";
import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";

const { Option } = Select;

const Formulario = () => {
  // State e hooks para gerenciar o formulário
  const [form] = Form.useForm(); // Criação do formulário usando o hook 'useForm' do Ant Design
  const [submittable, setSubmittable] = React.useState(false); // Estado para controlar se o formulário pode ser submetido
  const [textoBotao, setTextoBotao] = useState("Cadastrar"); // Estado para controlar o texto do botão de submissão

  // Estado e função para controlar o status da mensagem de sucesso ou erro
  const initialStatus = {
    success: "",
    message: "",
  };

  const [status, setStatus] = useState(initialStatus); // Estado para armazenar o status da mensagem de sucesso ou erro
  const [showMessage, setShowMessage] = useState(false); // Estado para controlar a exibição da mensagem

  // Função para lidar com a submissão do formulário
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    setTextoBotao("Cadastrando...");

    try {
      const response = await fetch("http://localhost:3000/api/v1/clientes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        console.log(response);
        setShowMessage(true);
        setStatus({
          success: "false",
          message: "Erro ao cadastrar o cliente",
        });
        setTextoBotao("Cadastrar");
        return;
      }

      setShowMessage(true);
      setStatus({
        success: "true",
        message:
          "Cliente cadastrado, atualize a tabela para exibir informações",
      });
      setTextoBotao("Cadastrar");
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  // Efeitos para controlar a exibição da mensagem de sucesso ou erro
  useEffect(() => {
    if (showMessage) {
      const timeout = setTimeout(() => {
        setShowMessage(false);
      }, 2500);

      return () => clearTimeout(timeout);
    }
  }, [showMessage]);

  // Função auxiliar para formatar o campo de CPF
  function formatarCPF(value: string) {
    let cpfValue = value.replace(/\D/g, "");

    if (cpfValue.length === 11) {
      cpfValue = cpfValue.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4"
      );
    }

    return cpfValue;
  }

  // Função auxiliar para formatar o campo de CPF
  function formatarRG(value: string) {
    let rgValue = value.replace(/\D/g, "");

    if (rgValue.length === 7) {
      rgValue = rgValue.replace(/(\d{1})(\d{3})(\d{3})/, "$1.$2.$3");
    }

    return rgValue;
  }

  // Hook 'useWatch' para observar mudanças nos campos do formulário
  const values = Form.useWatch([], form);

  // Efeito para validar o formulário e atualizar o estado 'submittable'
  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        style={{ width: "400px" }}
      >
        <Form.Item
          name="nome"
          label="Nome"
          rules={[
            {
              required: true,
              message: "Por favor, insira o nome!",
              pattern: /^[A-Za-z]{2}/,
            },
          ]}
        >
          <Input placeholder="Nome" />
        </Form.Item>
        <Form.Item
          name="cpf"
          label="CPF"
          rules={[
            { required: true, message: "Por favor, insira o CPF!" },
            {
              pattern: /^[0-9.-]{14}$/,
              message: "Por favor, insira um CPF válido!",
            },
          ]}
        >
          <Input
            placeholder="CPF"
            maxLength={11}
            onChange={(e) =>
              form.setFieldsValue({ cpf: formatarCPF(e.target.value) })
            }
          />
        </Form.Item>

        <Form.Item
          name="rg"
          label="RG"
          rules={[
            { required: true, message: "Por favor, insira o RG!" },
            {
              pattern: /^[0-9.]{9}$/,
              message: "Por favor, insira um RG válido!",
            },
          ]}
        >
          <Input
            placeholder="RG"
            maxLength={7}
            onChange={(e) =>
              form.setFieldsValue({ rg: formatarRG(e.target.value) })
            }
          />
        </Form.Item>

        <Form.Item
          name="data_nasc"
          label="Data de nascimento"
          rules={[
            {
              required: true,
              message: "Por favor, insira a data de nascimento!",
            },
          ]}
        >
          <Input type="date" placeholder="Data de Nascimento" />
        </Form.Item>

        <Form.Item
          name="sexo"
          label="Sexo"
          rules={[{ required: true, message: "Por favor, selecione o sexo!" }]}
        >
          <Select placeholder="Selecione o Sexo">
            <Option value="Masculino">Masculino</Option>
            <Option value="Feminino">Feminino</Option>
            <Option value="Outro">Outro</Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Button type="primary" htmlType="submit" disabled={!submittable}>
            {textoBotao}
          </Button>
          {showMessage && (
            <p className={status.success === "false" ? "danger" : "success"}>
              {status.message}
            </p>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Formulario;
