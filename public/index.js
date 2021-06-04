Vue.use(HighchartsVue.default)

window.onload = () => {
  var app = new Vue({
      el: "#highchart",
      data: () => {
          return {
              title: '',
              type: 'bar',
              plotOptions: {
                  series: {
                      stacking: 'normal'
                  }
              },
              series: [{
                    name: 'True',
                    data: [60, 40, 70]
                }, {
                    name: 'False',
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
                    text: this.title
                },
                xAxis: {
                    categories: ['Doctorate', 'Masters', 'Bachelors']
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    title: {
                        text: 'Total fruit consumption'
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