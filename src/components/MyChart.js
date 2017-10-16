import React, { Component } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import moment from 'moment'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import CustomTooltip from './CustomTooltip'

const SERVER_IP = 'http://172.20.10.9:5000/'
const ACTIVITY_RESULT_1 = 'activity_result/1'
const ACTIVITY_RESULT_1_ALL = 'activity_result/1/all'

const mock = [
  {
    activity_result_1: {
      assistant: '1',
      date: '2017-09-08',
      duration: '120000',
      max_level: '6',
      note: 'Fantasic!',
      post_bp: '122/95',
      post_hr: '116',
      pre_bp: '102/75',
      pre_hr: '81',
      recorder: 'nurse_id',
      start_time: 'Thu Sep 8 2017 08:09:00 GMT+0700 (SE Asia Standard Time)',
      stop_time: 'Thu Sep 8 2017 08:11:00 GMT+0700 (SE Asia Standard Time)',
      time: '08:11:00',
      timestamp: ''
    }
  },
  {
    activity_result_1: {
      assistant: '2',
      date: '2017-09-09',
      duration: '2000',
      max_level: '9',
      note: 'This is amazing!',
      post_bp: '130/85',
      post_hr: '112',
      pre_bp: '110/70',
      pre_hr: '72',
      recorder: '99999',
      start_time: 'Mon Sep 11 2017 18:15:28 GMT+0700 (SE Asia Standard Time)',
      stop_time: 'Mon Sep 11 2017 18:23:28 GMT+0700 (SE Asia Standard Time)',
      time: '17:30:15',
      timestamp: ''
    }
  },
  {
    activity_result_1: {
      assistant: '2',
      date: '2017-09-12',
      duration: '60000',
      max_level: '9',
      note: 'This is amazing!',
      post_bp: '130/85',
      post_hr: '112',
      pre_bp: '110/70',
      pre_hr: '72',
      recorder: 'nurse_id',
      start_time: 'Mon Sep 12 2017 18:14:28 GMT+0700 (SE Asia Standard Time)',
      stop_time: 'Mon Sep 12 2017 18:15:28 GMT+0700 (SE Asia Standard Time)',
      time: '18:15:28',
      timestamp: ''
    }
  },
  {
    activity_result_1: {
      assistant: '1',
      date: '2017-09-16',
      duration: '20000',
      max_level: '5',
      note: 'This is amazing!',
      post_bp: '1120/81',
      post_hr: '98',
      pre_bp: '105/71',
      pre_hr: '62',
      recorder: '88888',
      start_time: 'Thu Sep 14 2017 09:55:30 GMT+0700 (SE Asia Standard Time)',
      stop_time: 'Thu Sep 14 2017 10:02:15 GMT+0700 (SE Asia Standard Time)',
      time: '15:10:00',
      timestamp: ''
    }
  },
  {
    activity_result_1: {
      assistant: '1',
      date: '2017-09-17',
      duration: '420000',
      max_level: '5',
      note: 'This is amazing!',
      post_bp: '120/81',
      post_hr: '98',
      pre_bp: '105/71',
      pre_hr: '62',
      recorder: 'nurse_id',
      start_time: 'Thu Sep 17 2017 09:55:30 GMT+0700 (SE Asia Standard Time)',
      stop_time: 'Thu Sep 17 2017 10:02:15 GMT+0700 (SE Asia Standard Time)',
      time: '10:02:15',
      timestamp: ''
    }
  }
]

export default class MyChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      startDate: '',
      endDate: ''
    }
  }

  getChartData = async () => {
    var chartData = []
    await mock.forEach(d => {
      chartData.push({
        date: d.activity_result_1.date,
        time: d.activity_result_1.time,
        assistant: Number(d.activity_result_1.assistant),
        max_level: Number(d.activity_result_1.max_level)
      })
    })
    this.setState({
      data: chartData
    })
  }

  fetchChartData = async () => {
    const path = `${SERVER_IP}${ACTIVITY_RESULT_1_ALL}`
    var data = []

    await fetch(path).then(results => results.json()).then(results => {
      results.data.forEach(r => {
        var result = r.activity_result_1
        data.push({
          date: result.date,
          time: result.time,
          assistant: Number(result.assistant),
          max_level: Number(result.max_level)
        })
      })
    })

    this.setState({ data })
  }

  componentDidMount () {
    this.getChartData()
    // this.fetchChartData()
  }

  handleChangeStartDate = (event, date) => {
    let startDate = moment(date).format('YYYY-MM-DD')
    this.setState({ startDate })
  }

  handleChangeEndDate = (event, date) => {
    let endDate = moment(date).format('YYYY-MM-DD')
    this.setState({ endDate })
  }

  render () {
    return (
      <div>
        <section>
          <DatePicker onChange={this.handleChangeStartDate} autoOk floatingLabelText='Start Date' disableYearSelection={this.state.disableYearSelection} />
          <DatePicker onChange={this.handleChangeEndDate} autoOk floatingLabelText='Start Date' disableYearSelection={this.state.disableYearSelection} />
          <RaisedButton label='Submit' primary style={{ margin: 12 }} />
        </section>
        <section>
          <LineChart width={600} height={320} data={this.state.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey='date' padding={{ left: 30, right: 30 }} />
            <YAxis />
            <CartesianGrid strokeDasharray='5 5' />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type='monotone' dataKey='max_level' stroke='#03A9F4' activeDot={{ r: 8 }} fill='#03A9F4' strokeWidth={3} />
          </LineChart>
        </section>
      </div>
    )
  }
}
