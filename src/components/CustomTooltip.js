import React, { Component } from 'react'

class CustomTooltip extends Component {
  render () {
    const { active } = this.props

    if (active) {
      const { payload, label } = this.props
      return (
        <div className='custom-tooltip' style={styles.container}>
          <p className='label'>{`Date: ${label}`}</p>
          <p className='intro'>{`Time: ${payload[0].payload.time}`}</p>
          <p className='desc'>{`Assistant: ${payload[0].payload.assistant}`}</p>
        </div>
      )
    }
    return null
  }
}

var styles = {
  container: {
    backgroundColor: '#EEEEEE'
  }
}

export default CustomTooltip
