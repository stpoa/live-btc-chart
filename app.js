// Buttons
const remote = require('electron').remote;
document.getElementById("min-btn").addEventListener("click", function (e) {
  var window = remote.getCurrentWindow()
  window.minimize();
})
document.getElementById("max-btn").addEventListener("click", function (e) {
  var window = remote.getCurrentWindow()
  if (!window.isMaximized()) {
    window.maximize()
  } else {
    window.unmaximize()
  }
})
document.getElementById("close-btn").addEventListener("click", function (e) {
  var window = remote.getCurrentWindow();
  window.close()
})

// Chart
var Highcharts = require('highcharts/js/highcharts');
require('highcharts/js/highcharts-more')(Highcharts);

var options = {
  chart: {
    type: 'spline'
  },
  title: {
    text: 'Live Bitcoin Price'
  },
  xAxis: {
    type: 'datetime',
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
};
var chart = Highcharts.chart('container', options);

// Data
var getData = function() {
  setInterval(function() {
    fetch('https://api.cryptonator.com/api/ticker/btc-usd').then(function(response) {
      return response.json()
    }).then(function(data) {
      chart.series[0].addPoint({ x: data.timestamp * 1000, y: Number(data.ticker.price) })
    })
  }, 3000)
}
getData()
