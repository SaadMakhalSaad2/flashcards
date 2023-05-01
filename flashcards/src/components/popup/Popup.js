import React from 'react'
export const Popup = ({ text, closePopup, lists, onSelected, newList }) => {
  const [title, setTitle] = React.useState('')

  const onSelect = (e) => {
    onSelected(
      e.target.getAttribute('index'),
      e.target.nodeName == 'BUTTON',
      title,
    )
  }

  return (
    <div className="popup-container">
      <div className="popup-body">
        <button onClick={closePopup} className="btn btn-warning m-2">
          X
        </button>
        <h5 className="m-1">{text}</h5>
        <ul onClick={onSelect} className="list-group m-1">
          {lists.map((l, i) => {
            return i == 0 ? (
              ''
            ) : (
              <li index={i} key={i} className="list-group-item">
                {l}
              </li>
            )
          })}
        </ul>
        <div>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="name"
          ></input>
          <button className="btn btn-secondary m-3" onClick={onSelect}>
            New list
          </button>
        </div>
      </div>
    </div>
  )
}
