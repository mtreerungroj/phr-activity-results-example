import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MyChart from './components/MyChart'

class App extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <MyChart />
      </MuiThemeProvider>
    )
  }
}

export default App
