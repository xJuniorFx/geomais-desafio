import React from "react";
import { Form, Input, InputNumber, Typography } from "antd";
import { Cliente } from "./Cliente";
import { ColumnType } from "antd/es/table";

// Props da coluna personalizada (celulas editaveis)
export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text" | "date";
  record: Cliente;
}
// Tipo da coluna personalizada (celulas editaveis)
export interface EditableColumnType<RecordType> extends ColumnType<RecordType> {
  editable?: boolean;
  onCell?: (record: RecordType) => EditableCellProps;
}
// Componente EditableCell para renderizar células na tabela com suporte a edição
export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  children,
  ...restProps
}) => {
  // Determina o componente de entrada (input) baseado no tipo de entrada (inputType)
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  // Renderiza um input para edição ou mostra o conteúdo original para o modo não edição
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
