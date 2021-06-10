Vue.use(HighchartsVue.default)

var groups = {
  race:{
    label:"Race"
    ,
    categories:[]
    ,
    series:[]
  },
  education_level:{
    label:"Education Level"
    ,
    categories:[]
    ,
    series:[]
  }
}
var bycols = ["race","education_level"];
var staticdata = require("./census.csv");
var formatteddata = formatDataForCharts(staticdata);

function formatDataForCharts(rows) {
  var data = [[],[]];
  var json = {};
  bycols.forEach((col) => {
    json[col] = {data:{}};
    rows.forEach((row) => {
      var val = row[col];
      if (typeof json[col].data[val] == "undefined") {
        json[col].data[val] = {y:0, n:0};
      }
      if (row.over_50k=="1") {
        json[col].data[val].y++;
      } else {
        json[col].data[val].n++;
      }
    });
  });
  for (var c in json) {
    json[c].categories = [];
    json[c].series = [{name:"Over $50k",data:[]}, {name:"Under $50k",data:[]}];
    for (var v in json[c].data) {
      var t = json[c].data[v].y + json[c].data[v].n;
      var yp = (json[c].data[v].y/t)*100;
      var np = (json[c].data[v].n/t)*100;
      json[c].categories.push(v);
      json[c].series[0].data.push(yp);
      json[c].series[1].data.push(np);
    }
  }
  return json;
}


function loadDataByGroup(group) {
  if (typeof groups[group] != "undefined") {
    app.group = group;
  }
}

var app;
window.onload = () => {

  for (var g in groups) {
    groups[g].categories = formatteddata[g].categories;
    groups[g].series = formatteddata[g].series;
  }
  var byvar = document.querySelector("#byvar");
  byvar.focus();
  byvar.addEventListener("change", function() {
    var group = this.value;
    loadDataByGroup(group);
  });
  app = new Vue({
      el: "#highchart",
      data: () => {
          return {
              group: 'education_level',
          }
      },
      computed: {
          chartOptions() { 
              return {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: "Salary Breakdown by " + groups[this.group].label
                },
                xAxis: {
                    categories: groups[this.group].categories
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    title: {
                        text: ''
                    },
                    labels: {
                      format: '{value}%'
                    }                    
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: groups[this.group].series
            }
          },
      }
//      , template:``
  })

}


