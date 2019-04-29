var graph1 = document.getElementById('userCountByMonth');
var userPerMonth = JSON.parse(graph1.dataset.chartviz)
console.log(userPerMonth);

var userPerMonthLabel = [];
for (var i = 0; i < userPerMonth.length; i++) {
  var data = userPerMonth[i]._id.Year + '-' + userPerMonth[i]._id.Month
  userPerMonthLabel.push(data)
}

var userPerMonthData = [];
for (var i = 0; i < userPerMonth.length; i++) {
  var data = userPerMonth[i].countUsers
  userPerMonthData.push(data)
}

new Chart (graph1, {
  type: 'line',
  data: {
    labels: userPerMonthLabel,
    datasets: [{
      data: userPerMonthData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
      ],
      borderWidth: 1
    }]
  }
})
