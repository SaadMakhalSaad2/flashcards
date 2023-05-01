function ControlPanel(props) {
  return (
    <div>
      <button onClick={props.movePrevious} className="btn btn-outline-secondary m-2">
        {'<'}
      </button>

      <button onClick={props.moveNext} className="btn btn-outline-success">
        {'>'}
      </button>
      
    </div>
  )
}

export default ControlPanel
