import React from 'react'

const withCondition = conditionalRenderingFxn => Component => props => {
    return (
        conditionalRenderingFxn(props) ? <p>No Expenses has been entered. Make some purchases.</p> : <Component {...props} />
    );
}

export default withCondition;
