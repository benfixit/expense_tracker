import { connect } from 'react-redux';
import ExpenseList from '../presentation/ExpenseList'

const mapStateToProps = state => {
    return {
        expenses: state.expenses
    }
}

const ExpenseListContainer = connect(mapStateToProps, null)(ExpenseList)

export default ExpenseListContainer;

