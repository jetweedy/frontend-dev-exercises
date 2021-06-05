Vue.use(HighchartsVue.default)

/// GOAL: Populate this with my data
var groups = {
  race:{
    label:"Race"
    ,
    categories:["Black", "White", "Other"]
    ,
    col:"race"
    ,
    series:[{
        name: 'Over $50k ',
        data: [30, 40, 50]
    }, {
        name: 'Under $50k',
        data: [70, 60, 50]
    }]
  },
  sex:{
    label:"Sex"
    ,
    categories:["Black", "White", "Other"]
    ,
    col:"sex"
    ,
    series:[{
        name: 'Over $50k ',
        data: [30, 40, 50]
    }, {
        name: 'Under $50k',
        data: [70, 60, 50]
    }]
  },
  education:{
    label:"Education Level"
    ,
    categories:["Doctorate", "Masters", "Bachelors", "High School", "Other"]
    ,
    col:"education_level"
    ,
    series:[{
        name: 'Over $50k ',
        data: [70, 60, 50, 40, 30]
    }, {
        name: 'Under $50k',
        data: [30, 40, 50, 60, 70]
    }]
  }
}

function loadDataByGroup(group) {
  if (typeof groups[group] != "undefined") {
    console.log("Switch to group: ", group);
    app.group = group;
  }
}


var app;
window.onload = () => {

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
              group: 'race',
              series: [],
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
                    categories: ['Other', 'Black', 'White']
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