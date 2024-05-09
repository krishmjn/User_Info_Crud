import React, { useCallback } from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addData } from '../redux/slicers/dataSlice';
import { useMutation } from 'react-query';
import axios from 'axios';
import shortid from 'shortid';



const Formm = () => {
const dispatch=useDispatch()
const [form]=Form.useForm()

const{mutate,isLoading,isError}=useMutation({
    mutationFn:(values)=>
        axios.post ("http://localhost:4000/data",values)
    
})

if (isLoading) <h2>Loading....</h2>
if(isError) <h2>Error....   </h2>

const onFinish=(values)=>{
    values.dob = values.dob.format('YYYY-MM-DD');
    dispatch(addData({
        id:shortid.generate(),
        name:values.name,
        email:values.email,
        address:values.address,
        dob:values.dob,
        age: new Date().getFullYear() - new Date(values.dob).getFullYear()
       
    }))
    mutate({
        id:shortid.generate(),
        name:values.name,
        email:values.email,
        address:values.address,
        dob:values.dob,
        age: new Date().getFullYear() - new Date(values.dob).getFullYear()
       
        

    
    })
    form.resetFields()
}
    
    
    return (
      
    <div style={{width:'60%', marginTop:"20px"}}>
    {/* <h1>Form</h1> */}

    <Form 
      name="basic"
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item
        label="email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="address"
        name="address"
        rules={[
          {
            required: true,
            message: 'Please input your address!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="DOB"
        name="dob"
        rules={[
          {
            required: true,
            message: 'Please input your date of birth!',
          },
        ]}
      >
        <DatePicker/>
      </Form.Item>
  
      
  
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    

    {/* <Link to="/charts">Charts </Link> */}
    </div>
)}
 

export default Formm;