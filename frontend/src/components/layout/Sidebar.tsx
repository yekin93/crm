import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { ROUTES } from '../../utils/constants';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      key: ROUTES.DASHBOARD,
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: ROUTES.USERS,
      icon: <TeamOutlined />,
      label: 'Kullanıcılar',
    },
    {
      key: ROUTES.PROFILE,
      icon: <UserOutlined />,
      label: 'Profil',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Sider
      width={250}
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          height: '32px',
          margin: '16px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '6px',
        }}
      />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default Sidebar;
