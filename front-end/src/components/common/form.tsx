import { Button, Form, Input, Select } from 'antd';
import React from 'react';

const { Option } = Select;

const Formulario: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        style={{ width: '400px' }}
      >
        <Form.Item
          name="name"
          label="Nome"
          rules={[{ required: true, message: 'Por favor, insira o nome!', pattern: /^[A-Za-z]{2}/}]}
        >
          <Input placeholder="Nome"/>
        </Form.Item>
        <Form.Item
          name="cpf"
          label="CPF"
          rules={[
            { required: true, message: 'Por favor, insira o CPF!' },
            {
              pattern: /^[0-9]{11}$/,
              message: 'Por favor, insira um CPF válido!',
            },
          ]}
        >
          <Input placeholder="CPF" />
        </Form.Item>

        <Form.Item
          name="rg"
          label="RG"
          rules={[
            { required: true, message: 'Por favor, insira o RG!'},
            {
              pattern: /^[0-9]{10}$/, // Apenas caracteres numéricos, 10 caracteres
              message: 'Por favor, insira um RG válido!',
            },
          ]}
        >
          <Input placeholder="RG" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Sexo"
          rules={[{ required: true, message: 'Por favor, selecione o sexo!' }]}
        >
          <Select placeholder="Selecione o sexo">
            <Option value="male">Masculino</Option>
            <Option value="female">Feminino</Option>
            <Option value="other">Outro</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="birthdate"
          label="Data de nascimento"
          rules={[{ required: true, message: 'Por favor, insira a data de nascimento!' }]}
        >
          <Input type="date" placeholder="Data de Nascimento" />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'O e-mail não é válido!',
            },
            {
              required: true,
              message: 'Por favor, insira seu e-mail!',
            },
          ]}
        >
          <Input placeholder="E-mail" />
        </Form.Item>

        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" htmlType="submit">
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Formulario;
