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
              xAxis: {
                  categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
              },
              yAxis: {
                  min: 0,
                  title: {
                      text: 'Total fruit consumption'
                  }
              },                  
              series: [
                          {
                            data: [{
                                name: 'John',
                                data: [5, 3, 4, 7, 2]
                            }, {
                                name: 'Jane',
                                data: [2, 2, 3, 2, 1]
                            }, {
                                name: 'Joe',
                                data: [3, 4, 4, 2, 5]
                            }]
                          },
                        ],
          }
      },
      computed: {
          chartOptions() { 
              return {
                      chart: {  type: "bar" },
                      title: {  text: this.title  },
                      series: this.series,
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