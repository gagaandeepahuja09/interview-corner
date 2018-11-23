import React, { Component } from 'react';
import { Radio } from 'antd';

const { RadioGroup } = Radio.Group;

class Answers extends Component {
    state = {
    value: 1,
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
    });
    }

    render() {
    return (
        <RadioGroup onChange={this.onChange} value={this.state.value}>
            <Radio value={1}>{}</Radio>
            <Radio value={2}>{}</Radio>
            <Radio value={3}>{}</Radio>
            <Radio value={4}>{}</Radio>
      </RadioGroup>
    );
    }
}

export default Answers;