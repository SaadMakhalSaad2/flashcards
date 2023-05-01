import { useState } from 'react'

function InputsPanel(props) {
  const onChangeHandler = function (e) {
    if (props.count != count) props.updateCount(count)
  }
  const [count, setCount] = useState(props.count)

  const updateCount = (e) => {
    setCount(e.target.value)
  }

  return (
    <div className="">
      <small>How many words to dispay</small>{' '}
      <input
        id="zip"
        className="form-control"
        type="number"
        placeholder="count"
        onChange={updateCount}
        defaultValue={props.count}
      ></input>
      <button onClick={onChangeHandler} className="btn btn-secondary m-2">
        &#x21bb;
      </button>
    </div>
  )
}

export default InputsPanel
