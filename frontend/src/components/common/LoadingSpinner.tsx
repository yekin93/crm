import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingSpinnerProps {
  size?: 'small' | 'default' | 'large';
  tip?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  tip = 'Yükleniyor...',
  fullScreen = false,
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size === 'large' ? 48 : 24 }} spin />;

  if (fullScreen) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <Spin indicator={antIcon} tip={tip} size={size} />
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Spin indicator={antIcon} tip={tip} size={size} />
    </div>
  );
};

export default LoadingSpinner;
