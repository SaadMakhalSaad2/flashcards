import React from 'react'
import ControlPanel from '../controls/ControlsPanel'

class FlashCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { index: 0, count: props.listToRender.length }
    this.data = props.listToRender
    this.title = props.title
    this.isMainList = props.isMainList
    this.onClick = this.onClick.bind(this)
  }

  onClick = () => {
    this.props.addWord(this.state.index)
  }

  nextWord = () => {
    const i = this.state.index + 1
    this.setState({ index: i % this.data.length })
  }

  previousWord = () => {
    const i = this.state.index - 1
    if (i >= 0) this.setState({ index: i })
    else this.setState({ index: this.data.length - 1 })
  }

  render() {
    return (
      <div>
        <button type="button" className="word-btn mt-5">
          <p>{this.title}</p>
          <h4>{this.data[this.state.index].raw}</h4>
          <hr className="" />
          <h4>{this.data[this.state.index].translated}</h4>
          <p>{this.state.index + 1 + '/' + this.state.count}</p>

          <ControlPanel
            moveNext={this.nextWord}
            movePrevious={this.previousWord}
          />
        </button>
        {this.isMainList ? (
          <button onClick={this.onClick} className="btn btn-primary">
            +
          </button>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default FlashCard
