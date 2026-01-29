import React from 'react';
import { Layout, Avatar, Dropdown, Space, Switch, Typography } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const menuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profil',
      onClick: () => navigate(ROUTES.PROFILE),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Çıkış Yap',
      onClick: logout,
    },
  ];

  return (
    <AntHeader
      style={{
        padding: '0 24px',
        background: isDark ? '#001529' : '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: 'bold', color: isDark ? '#fff' : '#000' }}>
        CRM Application
      </div>

      <Space size="large">
        <Space>
          {isDark ? <BulbFilled style={{ color: '#ffc53d' }} /> : <BulbOutlined />}
          <Switch checked={isDark} onChange={toggleTheme} />
        </Space>

        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Space style={{ cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} />
            <Text style={{ color: isDark ? '#fff' : '#000' }}>{user?.name || 'User'}</Text>
          </Space>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;
