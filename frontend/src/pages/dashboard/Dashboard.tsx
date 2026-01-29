import React from 'react';
import { Card, Row, Col, Statistic, Typography, Table } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const recentActivities = [
    {
      key: '1',
      action: 'Yeni kullanıcı eklendi',
      user: 'Admin',
      time: '2 saat önce',
    },
    {
      key: '2',
      action: 'Kullanıcı güncellendi',
      user: 'Yönetici',
      time: '5 saat önce',
    },
    {
      key: '3',
      action: 'Kullanıcı silindi',
      user: 'Admin',
      time: '1 gün önce',
    },
  ];

  const columns = [
    {
      title: 'İşlem',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Kullanıcı',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Zaman',
      dataIndex: 'time',
      key: 'time',
    },
  ];

  return (
    <div>
      <Title level={2}>Hoş Geldiniz, {user?.name}!</Title>
      <p style={{ marginBottom: 24 }}>
        CRM uygulamasına hoş geldiniz. Aşağıda güncel istatistikleri görebilirsiniz.
      </p>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Toplam Kullanıcı"
              value={156}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Aktif Kullanıcı"
              value={128}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tamamlanan İşlemler"
              value={93}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Bekleyen İşlemler"
              value={12}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Son Aktiviteler" style={{ marginTop: 24 }}>
        <Table
          columns={columns}
          dataSource={recentActivities}
          pagination={false}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default Dashboard;
