import { Component, ErrorInfo, ReactNode } from 'react';
import { Result, Button } from 'antd';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '50px' }}>
          <Result
            status="error"
            title="Bir Hata Oluştu"
            subTitle="Üzgünüz, beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin."
            extra={[
              <Button type="primary" key="reload" onClick={() => window.location.reload()}>
                Sayfayı Yenile
              </Button>,
              <Button key="reset" onClick={this.handleReset}>
                Tekrar Dene
              </Button>,
            ]}
          >
            {this.state.error && (
              <div style={{ textAlign: 'left', marginTop: '20px' }}>
                <h4>Hata Detayları:</h4>
                <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
          </Result>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
