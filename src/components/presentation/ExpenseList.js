import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import withCondition from '../HOCs/withCondition';

const conditionalRenderingFxn = props => !props.expenses.length;

const ExpenseList = props => {
    const { expenses } = props;
    return (
        <ul>
            {
                expenses.map(expense => <li key={expense.id}>{expense.title}</li>)
            }
        </ul>
    );
}

ExpenseList.defaultProps = {
    expenses: []
}

ExpenseList.propTypes = {
    expenses: PropTypes.array
}

export default compose(withCondition(conditionalRenderingFxn))(ExpenseList);