import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Tag, Button, Space, Spin, message } from 'antd';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { userApi } from '../../api/user.api';
import { User, UserRole, UserStatus } from '../../types/user.types';
import { ROUTES } from '../../utils/constants';
import { getUserRoleLabel, getUserStatusLabel, formatDateTime } from '../../utils/helpers';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchUser(Number(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchUser = async (userId: number) => {
    setLoading(true);
    try {
      const response = await userApi.getUser(userId);
      setUser(response);
    } catch (error) {
      message.error('Kullanıcı bilgileri yüklenirken hata oluştu.');
      navigate(ROUTES.USERS);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: UserRole): string => {
    const colors: Record<UserRole, string> = {
      [UserRole.ADMIN]: 'red',
      [UserRole.MANAGER]: 'blue',
      [UserRole.USER]: 'green',
    };
    return colors[role];
  };

  const getStatusColor = (status: UserStatus): string => {
    const colors: Record<UserStatus, string> = {
      [UserStatus.ACTIVE]: 'success',
      [UserStatus.INACTIVE]: 'default',
      [UserStatus.PENDING]: 'warning',
    };
    return colors[status];
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(ROUTES.USERS)}>
          Geri
        </Button>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => navigate(ROUTES.USER_EDIT.replace(':id', String(user.id)))}
        >
          Düzenle
        </Button>
      </Space>

      <Card title="Kullanıcı Detayları">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
          <Descriptions.Item label="Ad Soyad">{user.name}</Descriptions.Item>
          <Descriptions.Item label="E-posta">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Rol">
            <Tag color={getRoleColor(user.role)}>{getUserRoleLabel(user.role)}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Durum">
            <Tag color={getStatusColor(user.status)}>{getUserStatusLabel(user.status)}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Oluşturma Tarihi">
            {formatDateTime(user.createdAt)}
          </Descriptions.Item>
          {user.updatedAt && (
            <Descriptions.Item label="Güncelleme Tarihi">
              {formatDateTime(user.updatedAt)}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    </div>
  );
};

export default UserDetail;
