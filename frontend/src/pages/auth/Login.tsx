import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoginRequest } from '../../types/auth.types';
import { ROUTES } from '../../utils/constants';
import { validators, getValidationMessage } from '../../utils/validators';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onFinish = async (values: LoginRequest) => {
    setLoading(true);
    try {
      await login(values);
    } catch (error) {
      // Error is handled in AuthContext
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={2}>Giriş Yap</Title>
        <Text type="secondary">Hesabınıza giriş yapın</Text>
      </div>

      <Form
        name="login"
        initialValues={{ rememberMe: true }}
        onFinish={onFinish}
        autoComplete="off"
        size="large"
      >
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
            prefix={<UserOutlined />}
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

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item name="rememberMe" valuePropName="checked" noStyle>
              <Checkbox>Beni hatırla</Checkbox>
            </Form.Item>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              message.info('Şifre sıfırlama özelliği yakında eklenecek.');
            }}>
              Şifremi unuttum
            </a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Giriş Yap
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          <Text>
            Hesabınız yok mu? <Link to={ROUTES.REGISTER}>Kayıt Ol</Link>
          </Text>
        </div>
      </Form>
    </Card>
  );
};

export default Login;
