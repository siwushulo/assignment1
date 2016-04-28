var app = angular.module('simple-chart', []);
google.load("visualization", "1", {packages:["corechart"]});

app.controller('MainCtrl', ['$scope', '$http',  function($scope, $http) {
  $http.get("/data").success(function (data) {
        formatDataTable(data);
  });
}]);


function formatDataTable(chartdata) {
  var data = [];
  var header = ['Year', 'Income'];
  

  
  data.push(header);
  console.table(chartdata);
  
  for (var i = 0; i < chartdata.length; i++) {
    var temp = [];
    temp.push(chartdata[i].Year);
    temp.push(chartdata[i].Income_Statement_Amount);
    data.push(temp);
  }
   
   console.table(data);
   
  var g_data = google.visualization.arrayToDataTable(data);
  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(g_data, getOptions());
}

function getOptions()
{
     var options = {
        title: 'San Francisco Chinese Hospital Annual Income',
        
        chartArea: {width: '50%'},
        hAxis: {
          title: 'Year',
          minValue: 0
        },
        vAxis: {
          title: 'Income'
        }
      };

    return options;
}