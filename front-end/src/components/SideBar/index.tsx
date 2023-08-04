import React from "react";
import { DatabaseOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = React.useState(true);

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          selectable={false}
          items={[
            {
              key: "1",
              label: "Geomais",
              style: { color: "#008F3A", fontSize: "20px", fontWeight: "bold" },
            },
            {
              key: "2",
              icon: <DatabaseOutlined />,
              label: "Clientes",
            },
          ]}
        />
      </Sider>
    </Layout>
  );
};

export default SideBar;
