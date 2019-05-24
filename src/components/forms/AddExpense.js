import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpense } from '../../actions'

class AddExpense extends Component {
  constructor(props){
      super(props);
      this.state = {
        title: '',
        amount: 0
      }
  }
  
  handleChange = event => {
      const { target: {
          name, value
      }} = event;
      this.setState({
          [name]: value
      });
  }

  handleSubmit = event => {
      event.preventDefault();
      const { title } = this.state;
      const { addExpense } = this.props;
      addExpense({title});
  }

  render() {
    const { handleChange, handleSubmit } = this;  
    return (
      <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Expense Title" onChange={handleChange} />
            <button type="submit">Submit Expense</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {
        addExpense: payload => dispatch(addExpense(payload))
    }
}

export default connect(null, mapDispatchToProps)(AddExpense);
