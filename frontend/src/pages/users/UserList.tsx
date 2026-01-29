import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Input, Tag, Modal, message, Card } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../api/user.api';
import { User, UserRole, UserStatus } from '../../types/user.types';
import { ROUTES, MESSAGES, PAGE_SIZE } from '../../utils/constants';
import { getUserRoleLabel, getUserStatusLabel } from '../../utils/helpers';
import { debounce } from '../../utils/helpers';

const { confirm } = Modal;

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: PAGE_SIZE,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [pagination.current, pagination.pageSize, searchText]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userApi.getUsers({
        page: pagination.current,
        pageSize: pagination.pageSize,
        search: searchText,
      });
      setUsers(response.users);
      setPagination((prev) => ({ ...prev, total: response.total }));
    } catch (error) {
      message.error('Kullanıcılar yüklenirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination({
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || PAGE_SIZE,
      total: pagination.total,
    });
  };

  const handleSearch = debounce((value: string) => {
    setSearchText(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  }, 500);

  const handleDelete = (user: User) => {
    confirm({
      title: 'Kullanıcı Silme',
      content: `${user.name} kullanıcısını silmek istediğinizden emin misiniz?`,
      okText: 'Evet',
      cancelText: 'Hayır',
      okType: 'danger',
      onOk: async () => {
        try {
          await userApi.deleteUser(user.id);
          message.success(MESSAGES.DELETE_SUCCESS);
          fetchUsers();
        } catch (error) {
          message.error(MESSAGES.DELETE_ERROR);
        }
      },
    });
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

  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Ad Soyad',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'E-posta',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (role: UserRole) => (
        <Tag color={getRoleColor(role)}>{getUserRoleLabel(role)}</Tag>
      ),
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      render: (status: UserStatus) => (
        <Tag color={getStatusColor(status)}>{getUserStatusLabel(status)}</Tag>
      ),
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => navigate(ROUTES.USER_DETAIL.replace(':id', String(record.id)))}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => navigate(ROUTES.USER_EDIT.replace(':id', String(record.id)))}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="Kullanıcı ara..."
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(ROUTES.USER_CREATE)}
        >
          Yeni Kullanıcı
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </Card>
  );
};

export default UserList;
