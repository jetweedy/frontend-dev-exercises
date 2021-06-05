Vue.use(HighchartsVue.default)

/// GOAL: Populate this with my data
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

function loadDataByGroup(group) {
  if (typeof groups[group] != "undefined") {
    app.group = group;
  }
}


var app;
window.onload = () => {
  axios.get("/data")
      .then(response => {
        for (var g in groups) {
          groups[g].categories = response.data[g].categories;
          groups[g].series = response.data[g].series;
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
      })
      .catch(err => {
        console.log("error", err);
      })
}