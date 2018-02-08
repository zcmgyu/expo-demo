import React from 'react';
import { Button, View, Text } from 'react-native';
import { List, InputItem, Toast, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';

class BasicInput extends React.Component {
  state = {
    phoneNumber: '',
    hasPhoneNumberError: false,
    name: '',
    hasNameError: false
  };

  onErrorClick = errorName => value => {
    if (this.state[errorName]) {
      this.showMessage(errorName);
    }
  };

  showMessage = errorName => {
    let message = 'Something went wrong';
    if (errorName === 'hasPhoneNumberError')
      message = 'Please enter less 8 digits';
    Toast.info(message);
  };

  onChange = name => value => {
    if (name === 'phoneNumber') {
      console.log(value);
      if (value.replace(/\s/g, '').length < 8) {
        this.setState({
          hasPhoneNumberError: true
        });
      } else {
        this.setState({
          hasPhoneNumberError: false
        });
      }
    }
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <View>
        <List renderHeader={() => 'Confirm when typing'}>
          <InputItem
            type="text"
            placeholder="Input your name"
            error={this.state.hasNameError}
            onErrorClick={this.onErrorClick('hasNameError')}
            onChange={this.onChange('name')}
            value={this.state.name}
          >
            Name
          </InputItem>
          <InputItem
            type="phone"
            placeholder="Input your phone"
            error={this.state.hasPhoneNumberError}
            onErrorClick={this.onErrorClick('hasPhoneNumberError')}
            onChange={this.onChange('phoneNumber')}
            value={this.state.phoneNumber}
          >
            Phone number
          </InputItem>
        </List>
        <WhiteSpace />
        <List renderHeader={() => 'Result'}>
          <InputItem value={this.state.name} editable={false}>
            Name
          </InputItem>
          <InputItem value={this.state.phoneNumber} disabled>
            Phone
          </InputItem>
        </List>
      </View>
    );
  }
}

const BasicInputWrapper = createForm()(BasicInput);

export default BasicInputWrapper;
