import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import Item from 'antd/es/list/Item';
const { Header, Content, Footer } = Layout;
const items = [ "Home", "Form" , "Table" , "Charts"]
const Navbar = () => {

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
                  {items.map((item, index) => (
        <Menu.Item key={index}>
          <Link to={`/${item.toLowerCase()}`}>{item}</Link>
        </Menu.Item>
      ))}

        </Menu>
      </Header>
      {/* <Content
        style={{
          padding: '0 48px',
        }}
      >
    <Breadcrumb>
      {items.map((item, index) => (
        <Item key={index}>
          <Link to={`/${item.toLowerCase()}`}>{item}</Link>
        </Item>
      ))}
    </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
         
        </div>
      </Content> */}
      {/* <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer> */}
    </Layout>
  );
};
export default Navbar;