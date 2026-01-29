import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Select, Space, message, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { userApi } from '../../api/user.api';
import { UserRole, UserStatus, CreateUserRequest, UpdateUserRequest } from '../../types/user.types';
import { ROUTES, MESSAGES } from '../../utils/constants';
import { validators, getValidationMessage } from '../../utils/validators';

const { Option } = Select;

const UserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      fetchUser(Number(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditMode]);

  const fetchUser = async (userId: number) => {
    setLoading(true);
    try {
      const user = await userApi.getUser(userId);
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } catch (error) {
      message.error('Kullanıcı bilgileri yüklenirken hata oluştu.');
      navigate(ROUTES.USERS);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: CreateUserRequest | UpdateUserRequest) => {
    setSubmitting(true);
    try {
      if (isEditMode) {
        await userApi.updateUser(Number(id), values as UpdateUserRequest);
        message.success(MESSAGES.UPDATE_SUCCESS);
      } else {
        await userApi.createUser(values as CreateUserRequest);
        message.success(MESSAGES.SAVE_SUCCESS);
      }
      navigate(ROUTES.USERS);
    } catch (error) {
      message.error(isEditMode ? MESSAGES.UPDATE_ERROR : MESSAGES.SAVE_ERROR);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(ROUTES.USERS)}
        style={{ marginBottom: 16 }}
      >
        Geri
      </Button>

      <Card title={isEditMode ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Oluştur'}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            role: UserRole.USER,
            status: UserStatus.ACTIVE,
          }}
        >
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

          {!isEditMode && (
            <Form.Item
              label="Şifre"
              name="password"
              rules={[
                { required: true, message: getValidationMessage.required('Şifre') },
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
              <Input.Password placeholder="Şifre giriniz" />
            </Form.Item>
          )}

          <Form.Item
            label="Rol"
            name="role"
            rules={[{ required: true, message: getValidationMessage.required('Rol') }]}
          >
            <Select placeholder="Rol seçiniz">
              <Option value={UserRole.USER}>Kullanıcı</Option>
              <Option value={UserRole.MANAGER}>Müdür</Option>
              <Option value={UserRole.ADMIN}>Yönetici</Option>
            </Select>
          </Form.Item>

          {isEditMode && (
            <Form.Item
              label="Durum"
              name="status"
              rules={[{ required: true, message: getValidationMessage.required('Durum') }]}
            >
              <Select placeholder="Durum seçiniz">
                <Option value={UserStatus.ACTIVE}>Aktif</Option>
                <Option value={UserStatus.INACTIVE}>Pasif</Option>
                <Option value={UserStatus.PENDING}>Beklemede</Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting}>
                {isEditMode ? 'Güncelle' : 'Oluştur'}
              </Button>
              <Button onClick={() => navigate(ROUTES.USERS)}>İptal</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserForm;
