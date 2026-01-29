import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Tag, Form, Input, Button, Space, message } from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { userApi } from '../../api/user.api';
import { authApi } from '../../api/auth.api';
import { UserRole, UserStatus, UpdateUserRequest } from '../../types/user.types';
import { ChangePasswordRequest } from '../../types/auth.types';
import { getUserRoleLabel, getUserStatusLabel, formatDateTime } from '../../utils/helpers';
import { validators, getValidationMessage } from '../../utils/validators';
import { MESSAGES } from '../../utils/constants';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, form]);

  const handleUpdate = async (values: UpdateUserRequest) => {
    setLoading(true);
    try {
      const updatedUser = await userApi.updateProfile(values);
      updateUser(updatedUser);
      message.success(MESSAGES.UPDATE_SUCCESS);
      setEditMode(false);
    } catch (error) {
      message.error(MESSAGES.UPDATE_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (values: ChangePasswordRequest) => {
    setChangingPassword(true);
    try {
      await authApi.changePassword(values);
      message.success('Şifre başarıyla değiştirildi.');
      passwordForm.resetFields();
    } catch (error) {
      message.error('Şifre değiştirme başarısız.');
    } finally {
      setChangingPassword(false);
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

  if (!user) {
    return null;
  }

  return (
    <div>
      <Card
        title="Profil Bilgileri"
        extra={
          !editMode ? (
            <Button icon={<EditOutlined />} onClick={() => setEditMode(true)}>
              Düzenle
            </Button>
          ) : null
        }
      >
        {!editMode ? (
          <Descriptions bordered column={1}>
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
        ) : (
          <Form form={form} layout="vertical" onFinish={handleUpdate}>
            <Form.Item
              label="Ad Soyad"
              name="name"
              rules={[
                { required: true, message: getValidationMessage.required('Ad Soyad') },
                {
                  validator: (_, value) => {
                    if (!value || validators.minLength(value, 3)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(getValidationMessage.minLength('Ad Soyad', 3)));
                  },
                },
              ]}
            >
              <Input placeholder="Ad Soyad giriniz" />
            </Form.Item>

            <Form.Item
              label="E-posta"
              name="email"
              rules={[
                { required: true, message: getValidationMessage.required('E-posta') },
                {
                  validator: (_, value) => {
                    if (!value || validators.email(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(getValidationMessage.email()));
                  },
                },
              ]}
            >
              <Input placeholder="E-posta giriniz" type="email" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                  Kaydet
                </Button>
                <Button
                  icon={<CloseOutlined />}
                  onClick={() => {
                    setEditMode(false);
                    form.resetFields();
                  }}
                >
                  İptal
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Card>

      <Card title="Şifre Değiştir" style={{ marginTop: 24 }}>
        <Form form={passwordForm} layout="vertical" onFinish={handlePasswordChange}>
          <Form.Item
            label="Mevcut Şifre"
            name="currentPassword"
            rules={[{ required: true, message: getValidationMessage.required('Mevcut Şifre') }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mevcut şifrenizi giriniz" />
          </Form.Item>

          <Form.Item
            label="Yeni Şifre"
            name="newPassword"
            rules={[
              { required: true, message: getValidationMessage.required('Yeni Şifre') },
              {
                validator: (_, value) => {
                  if (!value || validators.password(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(getValidationMessage.password()));
                },
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Yeni şifrenizi giriniz" />
          </Form.Item>

          <Form.Item
            label="Yeni Şifre Tekrar"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: getValidationMessage.required('Yeni Şifre Tekrar') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(getValidationMessage.passwordMatch()));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Yeni şifrenizi tekrar giriniz" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={changingPassword}>
              Şifreyi Değiştir
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
