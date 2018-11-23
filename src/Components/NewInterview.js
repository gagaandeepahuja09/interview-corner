import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from '../axios-interviews';
import { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } from './Questions';
import { Form, Select, Input, Button, Card, Modal, Icon } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const formStyle = { 
  fontSize: '200px',
   };

let dataSource = ['Thapar Institute Patiala', 'BIT Mesra', 'CGC Landran', 'NIT Jamshedpur', 'NIT Durgapur', 'Baba Farid Group Of Institutions Bhatinda'];   

class NewInterview extends Component {
	constructor(props) {
    super(props);
		this.state = {
      visible: false,
      confirmLoading: false,
      ModalText: 'The form would be validated by the admins and would get live within 7 days.', 
			name: '',
			college: '',
			company: '',
      branch: '',
      year: '',
			q1: '',
			q1: '',
			q2: '',
			q3: '',
			q4: '',
			q5: '',
			q6: '',
			q7: '',
			q8: '',
			q9: '',
			q10: '',
		};
	}

  handleChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({ college: value });
  }

  handleBlur = (value) => {
    console.log('blur');
  }

  handleFocus = (value) => {
    console.log('focus');
  }

	onNameChange = (event) => {
		this.setState({ name: event.target.value });
	}

  onYearChange = (event) => {
    this.setState({ year: event.target.value });
    console.log(this.state.year);
  }

  onBranchChange = (event) => {
    this.setState({ branch: event.target.value });
    console.log(this.state.branch);
  }

	onCompanyChange = (event) => {
		this.setState({ company: event.target.value });
	}

	 onCollegeChange = (event) => {
    this.setState({ college: event.target.value });
  }

	onq1Change = (event) => {
		this.setState({ q1: event.target.value });
	}

	onq2Change = (event) => {
		this.setState({ q2: event.target.value });
	}

	onq3Change = (event) => {
		this.setState({ q3: event.target.value });
	}

	onq4Change = (event) => {
		this.setState({ q4: event.target.value });
	}

	onq5Change = (event) => {
		this.setState({ q5: event.target.value });
	}

	onq6Change = (event) => {
		this.setState({ q6: event.target.value });
	}

	onq7Change = (event) => {
		this.setState({ q7: event.target.value });
	}

	onq8Change = (event) => {
		this.setState({ q8: event.target.value });
	}

	onq9Change = (event) => {
		this.setState({ q9: event.target.value });
	}

	onq10Change = (event) => {
		this.setState({ q10: event.target.value });
	}

	onSubmitForm = (event) => {
		event.preventDefault();
	}

	showModal = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          this.setState({
            visible: true,
          });
        }
      },
    );
  }

  handleOk = () => {
		this.setState({
		ModalText: 'Thank You for sharing your experience to others. Completing form submission',
		confirmLoading: true,
		});
		const interview = {
			name: this.state.name,
			company: this.state.company,
			college: this.state.college,
      branch: this.state.branch,
      year: this.state.year,
			questions: {
				q1: this.state.q1, q2: this.state.q2, q3: this.state.q3, 
				q4: this.state.q1, q5: this.state.q5, q6: this.state.q6,
				q7: this.state.q7, q8: this.state.q8, q9: this.state.q9,
				q10: this.state.q10
			}
		}
		axios.post('/interviews.json', interview)
		.then(response => {
			console.log(response);
			this.setState({
        		visible: false,
        		confirmLoading: false,
      		});
		})
		.catch(error => console.log(error.response));
    this.setState({
      name: '',
      college: '',
      company: '',
      branch: '',
      year: '',
      q1: '',
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: '',
      q6: '',
      q7: '',
      q8: '',
      q9: '',
      q10: '',
    });
    this.props.history.push({
      pathname: '/interview-corner/', });
  }

  handleSelectChange = (value) => {
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
  	const { visible, confirmLoading,ModalText } = this.state;
    const options = dataSource.map(src => { return  <Option value={src}>{src}</Option>
    });
    return (
    <div style = {formStyle}>
    <Card title="Add Interview Experience" style = {formStyle}>
      <Form onSubmit={this.handleSubmit}>
        <FormItem required 
          label="Full Name"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
        {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your Name!' }],
          })(
            <Input size="large" value={this.state.name}
        onChange={this.onNameChange} />
          )}

        </FormItem>
        <FormItem required 
          label="Your Branch"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
        {getFieldDecorator('branch', {
            rules: [{ required: true, message: 'Please input your Branch!' }],
          })(
            <Input size="large" value={this.state.branch} 
        onChange={this.onBranchChange}  /> )}
        </FormItem>
        <FormItem required 
          label="Institute"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
        {getFieldDecorator('college', {
            rules: [{ required: true, message: 'Please select your Institute!' }],
          })(
          <Select
            showSearch size="large"
            placeholder="Select an Institute"
            optionFilterProp="children"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
          {options}
            
            <Option value="LPU Jalandhar">LPU Jalandhar</Option>
            <Option value="VIT Vellore">VIT Vellore</Option>
          </Select>,
           )}
        </FormItem>
        <FormItem required
          label="Company Name"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
        {getFieldDecorator('company', {
            rules: [{ required: true, message: 'Please input your Company!' }],
          })(
            <Input size="large" value={this.state.company}
        onChange={this.onCompanyChange}  />)}
        </FormItem>
        <FormItem required
          label="Year Of Degree Completion"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
        {getFieldDecorator('year', {
            rules: [{ required: true, message: 'Please input Year Of Degree Completion!' }],
          })(
            <Input size="large" value={this.state.year}
        onChange={this.onYearChange}  />)}
        </FormItem>
        <FormItem required
          label= {q1}
          labelCol={{ span: 11 }}
          wrapperCol={{ span: 16, offset: 1 }}
        >
        {getFieldDecorator('q1', {
            rules: [{ required: true, message: 'Please answer this question' }],
          })(
            <Input size="large" value={this.state.q1}
        onChange={this.onq1Change}  />)}
        </FormItem>
        <FormItem required
          label={q2}
          labelCol={{ span: 11 }}
          wrapperCol={{ span: 16, offset: 1 }}
        >
        {getFieldDecorator('q2', {
            rules: [{ required: true, message: 'Please answer this question' }],
          })(
            <Input size="large" value={this.state.q2}
        onChange={this.onq2Change}  />    )}
        </FormItem>
        <FormItem required
          label={q6}
          labelCol={{ span: 5, offset: 1 }}
          wrapperCol={{ span: 1 }}
        >
        {getFieldDecorator('q6', {
            rules: [{ required: true, message: 'Please answer this question' }],
          })(
            <Input size="large" value={this.state.q6}
        onChange={this.onq6Change}  />    )}
        </FormItem>
        <FormItem required
          label={q3}
          labelCol={{ span: 11 }}
          wrapperCol={{ span: 16, offset: 1 }}
        >
        {getFieldDecorator('q3', {
            rules: [{ required: true, message: 'Please answer this question' }],
          })(
            <TextArea value={this.state.q3}
        onChange={this.onq3Change} rows = {6} />   )}
        </FormItem>
        <FormItem required
          label={q4}
         labelCol={{ span: 11 }}
          wrapperCol={{ span: 16, offset: 1 }}
        >
        {getFieldDecorator('q4', {
            rules: [{ required: true, message: 'Please answer this question' }],
          })(
            <Input size="large" value={this.state.q4}
        onChange={this.onq4Change}  />    )}
        </FormItem>
        <FormItem required
          label={q5}
         labelCol={{ span: 11 }}
          wrapperCol={{ span: 16, offset: 1 }}
        >
        {getFieldDecorator('q5', {
            rules: [{ required: true, message: 'Please answer this question' }],
          })(
            <TextArea value={this.state.q5}
        onChange={this.onq5Change} rows = {5} />   )}
        </FormItem>
        <FormItem required
          label={q7}
         labelCol={{ span: 11 }}
          wrapperCol={{ span: 16, offset: 1 }}
        >
        {getFieldDecorator('q7', {
            rules: [{ required: true, message: 'Please answer this question' }],
          })(
            <Input size="large" value={this.state.q7}
        onChange={this.onq7Change}  />    )}
        </FormItem>
        <FormItem required
          label={q8}
         labelCol={{ span: 11 }}
          wrapperCol={{ span: 16, offset: 1 }}
        >
        {getFieldDecorator('q8', {
            rules: [{ required: true, message: 'Please answer this question' }],
          })(
            <TextArea value={this.state.q8}
        onChange={this.onq8Change} rows = {7} />   )}
        </FormItem>
        <FormItem required
          label={q9}
         labelCol={{ span: 11 }}
          wrapperCol={{ span: 16, offset: 1 }}
        >
        {getFieldDecorator('q9', {
            rules: [{ required: true, message: 'Please answer this question' }],
          })(
            <TextArea value={this.state.q9}
        onChange={this.onq9Change} rows = {4} />   )}
        </FormItem>
        <FormItem required
          label={q10}
          labelCol={{ span: 11 }}
          wrapperCol={{ span: 16, offset: 1 }}
        >
        {getFieldDecorator('q10', {
            rules: [{ required: true, message: 'Please answer this question' }],
          })(
            <Input size="large" value={this.state.q10}
        onChange={this.onq10Change}  />    )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 5 }}
        >
          <Button type="primary" onClick = {this.showModal} size="large">
            Submit
          </Button>
          <Modal title="Confirm Form Submission"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
        <p>{ModalText}</p>
        </Modal>
        </FormItem>
      </Form>
     </Card>
     </div>
    );
  }
}

const WrappedForm = Form.create()(NewInterview);
export default WrappedForm;