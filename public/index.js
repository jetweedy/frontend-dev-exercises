Vue.use(HighchartsVue.default)


var groups = {
  race:{
    label:"Race"
    ,
    col:"race"
  },
  education:{
    label:"Education Level"
    ,
    col:"education"
  }  
}

function getSalaryDataByGroup(group) {
  return [{
              name: 'True',
              data: [60, 40, 70]
          }, {
              name: 'False',
              data: [40, 60, 30]
          }];
}


var app;
window.onload = () => {
  app = new Vue({
      el: "#highchart",
      data: () => {
          return {
              group: 'race',
              series: [{
                    name: 'Over $50k ',
                    data: [60, 40, 70]
                }, {
                    name: 'Under $50k',
                    data: [40, 60, 30]
                }],
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
                series: this.series
            }
          },
      },
      template:`
      <div>
      <div class="title-row">
              <span>Chart title:</span>
              <input type="text" v-model="title">
          </div>
           
          <highcharts :options="chartOptions" ></highcharts>
      </div>
      `
  })

}