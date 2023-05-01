import React from 'react'
import InputsPanel from '../user_inputs/InputsPanel'
import li from './ListItem'

const SideBar = (props) => {
  const sidebarClass = props.isOpen ? 'sidebar open' : 'sidebar'

 
  const [listsHtml, setListHtml] = React.useState(
    props.lists.map((list, i) =>
      li(i == 0 ? 'list-group-item active' : 'list-group-item', list, i, props.counts[i]),
    ),
  )

  const onSelect = (e) => {
    console.log(e.target)
    const i = e.target.getAttribute('index')
    const newListsHtml = props.lists.map((list, index) =>
      i != index
        ? li('list-group-item', list, index, props.counts[index])
        : li('list-group-item active', list, index, props.counts[index]),
    )

    setListHtml(newListsHtml)
    props.updateFlashcard(props.lists[i], i)
  }

  return (
    <div className={sidebarClass}>
      <div className="p-2">
        <InputsPanel updateCount={props.updateCount} count={props.count} />
        <button
          onClick={props.toggleSidebar}
          className="sidebar-toggle btn btn-outline-success"
        >
          &#xF790;
        </button>
      </div>
      <ul onClick={onSelect} className="list-group m-1">
        {listsHtml}
      </ul>
    </div>
  )
}
export default SideBar
