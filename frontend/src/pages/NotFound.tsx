import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '50px' }}>
      <Result
        status="404"
        title="404"
        subTitle="Üzgünüz, aradığınız sayfa bulunamadı."
        extra={
          <Button type="primary" onClick={() => navigate(ROUTES.DASHBOARD)}>
            Ana Sayfaya Dön
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
