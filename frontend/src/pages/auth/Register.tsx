import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { RegisterRequest } from '../../types/auth.types';
import { ROUTES } from '../../utils/constants';
import { validators, getValidationMessage } from '../../utils/validators';

const { Title, Text } = Typography;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const onFinish = async (values: RegisterRequest) => {
    setLoading(true);
    try {
      await register(values);
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={2}>Kayıt Ol</Title>
        <Text type="secondary">Yeni hesap oluşturun</Text>
      </div>

      <Form
        name="register"
        onFinish={onFinish}
        autoComplete="off"
        size="large"
      >
        <Form.Item
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
          <Input
            prefix={<UserOutlined />}
            placeholder="Ad Soyad"
          />
        </Form.Item>

        <Form.Item
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
          <Input
            prefix={<MailOutlined />}
            placeholder="E-posta"
            type="email"
          />
        </Form.Item>

        <Form.Item
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
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Şifre"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: getValidationMessage.required('Şifre Tekrar') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(getValidationMessage.passwordMatch()));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Şifre Tekrar"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Kayıt Ol
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          <Text>
            Zaten hesabınız var mı? <Link to={ROUTES.LOGIN}>Giriş Yap</Link>
          </Text>
        </div>
      </Form>
    </Card>
  );
};

export default Register;
