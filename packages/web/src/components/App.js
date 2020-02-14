import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

export const calculatorQuery = operation => gql`
  query Calculator($left: Int!, $right: Int!) {
    ${operation}(input: { left: $left, right: $right }) {
      result
    }
  }
`

const Operation = ({ operation, left, right }) => {
  const { loading, error, data } = useQuery(calculatorQuery(operation), {
    variables: { left, right },
  });

  if (loading) return null;

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>Result: {data[operation].result}</div>
  )
}

const Values = ({ name, value, onChange }) => (
  <select name={name} value={value} onChange={onChange}>
    {Array.from(Array(10).keys()).map(value => (
      <option key={value + 1} value={value + 1}>
        {value + 1}
      </option>
    ))}
  </select>
)

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      operation: 'add',
      left: 1,
      right: 1,
    }
  }

  onChangeOperation = ({ target }) => {
    this.setState(previous => ({ ...previous, operation: target.value }))
  }

  onChangeValue = key => ({ target }) => {
    this.setState(previous => ({ ...previous, [key]: +target.value }))
  }

  render() {
    return (
      <div>
        <select name="operation" value={this.state.operation} onChange={this.onChangeOperation}>
          <option value="add">
            Add
          </option>
          <option value="divide">
            Divide
          </option>
          <option value="multiply">
            Multiply
          </option>
          <option value="subtract">
            Subtract
          </option>
        </select>
        <Values name="left" value={this.state.left} onChange={this.onChangeValue('left')}/>
        <Values name="right" value={this.state.right} onChange={this.onChangeValue('right')}/>
        <br/>
        <Operation {...this.state}/>
      </div>
    )
  }
}

export default App
