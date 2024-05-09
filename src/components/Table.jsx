import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, Layout, Modal, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addData, removeData, updateData } from '../redux/slicers/dataSlice';
import moment from 'moment';

const Display_Table = () =>{
    const dispatch = useDispatch();
    const { Content } = Layout;

    const [editing, setEditing] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'DOB',
            dataIndex: 'dob',
            key: 'dob',
            sorter: (a, b) => {
                const dateA = new Date(a.dob);
                const dateB = new Date(b.dob);
                return dateA - dateB;
            },
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_,record) => (
                <Space size="middle">
                    <EditOutlined style={{ cursor:'pointer', color:'green', marginRight:'30px', height:'30px', width:'50px' }} onClick={() => handleUpdate(record)}/>
                    <DeleteOutlined style={{ cursor:'pointer', color:'red' }} onClick={() => handleDelete(record.id)}/>
                </Space>
            ),
        },
    ];

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete?',
            type: 'danger',
            okText: 'Yes',
            onOk: async () => {
                await axios.delete(`http://localhost:4000/data/${id}`);
                dispatch(removeData(id));
            }
        });
    };

    const handleUpdate = (record) => {
        setEditing(true);
        setEditingData({...record});
    };

    const resetUpdating = () => {
        setEditing(false);
        setEditingData(null);
    };

    const { data: infos, isLoading, isError, refetch } = useQuery("data", async () => {
        const response = await axios.get("http://localhost:4000/data");
        return response.data;
    }, { enabled: false });

    useEffect(() => {
        refetch();
    }, [refetch,infos]);

    useEffect(() => {
        if (infos) {
            infos.forEach((d) => {
                dispatch(addData(d));
            });
        }
    }, [infos, dispatch]);

    if (isLoading) return <h2>Loading....</h2>;
    if (isError) return <h2>Error</h2>;

    return (
        <Content 
            style={{ 
                padding: '20px',  // Adds 20 pixels of padding to all four sides
                margin: '30px'    // Adds 30 pixels of margin around the component
            }}
        >
            <Table columns={columns} dataSource={infos} pagination={{ pageSize: 5 }} rowKey='id' />
            <Modal
                title="Edit"
                visible={editing}
                onCancel={() => resetUpdating()}
                onOk={async () => {
                    try {
                        dispatch(updateData(editingData));
                        resetUpdating();
                        await axios.put(
                            `http://localhost:4000/data/${editingData.id}`,
                            editingData,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                    } catch (error) {
                        console.error('Error updating task:', error);
                        throw error;
                    }
                }}
                okText="Save"
            >
                <Form>
                    <Form.Item label="Name">
                        <Input
                            onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
                            value={editingData?.name}
                        />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input
                            onChange={(e) => setEditingData({ ...editingData, email: e.target.value })}
                            value={editingData?.email}
                        />
                    </Form.Item>
                    <Form.Item label="Address">
                        <Input
                            onChange={(e) => setEditingData({ ...editingData, address: e.target.value })}
                            value={editingData?.address}
                        />
                    </Form.Item>
                    <Form.Item label="DOB">
                        <DatePicker
                            onChange={(date, dateString) => setEditingData({ ...editingData, dob: dateString })}
                            value={editingData?.dob ? moment(editingData.dob) : null}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Content>
    );
};

export default Display_Table;
