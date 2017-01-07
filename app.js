// Buttons
const remote = require('electron').remote
document.getElementById('min-btn').addEventListener('click', (e) => {
  const window = remote.getCurrentWindow()
  window.minimize()
})
document.getElementById('max-btn').addEventListener('click', (e) => {
  const window = remote.getCurrentWindow()
  if (!window.isMaximized()) {
    window.maximize()
  } else {
    window.unmaximize()
  }
})
document.getElementById('close-btn').addEventListener('click', (e) => {
  const window = remote.getCurrentWindow()
  window.close()
})

// Chart
const Highcharts = require('highcharts/js/highcharts')
require('highcharts/js/highcharts-more')(Highcharts)

const options = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'Live Bitcoin Price'
  },
  xAxis: {
    type: 'datetime'
  },
  yAxis: {
    title: {
      text: 'Price (USD)'
    }
  },
  legend: {
    enabled: false
  },
  exporting: {
    enabled: false
  },
  series: [{
    name: 'Live Bitcoint Price [USD]',
    data: []
  }]
}
const chart = Highcharts.chart('container', options)

// Data
const getData = () => {
  setInterval(() => {
    window.fetch('https://api.cryptonator.com/api/ticker/btc-usd').then((response) => {
      return response.json()
    }).then((data) => {
      chart.series[0].addPoint({ x: data.timestamp * 1000, y: Number(data.ticker.price) })
    })
  }, 3000)
}
getData()
