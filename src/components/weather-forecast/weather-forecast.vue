<template>
  <el-container>
    <el-header class="p-0">
      <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1">Weather Forecast</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <div class="hello">
        <h1>{{view}}</h1>
      </div>
      <el-row :gutter="20" class="pt-10 pb-10">
        <el-col :span="20">
          <h3 class="m-0">Weather report in Hyderabad</h3>
        </el-col>
        <el-col :span="4" class="text-right">
          <span class="fs-24" @click="changeView('table')"><i class="fa fa-table" aria-hidden="true" :class="{ 'active': (view === 'table') }"></i></span>
          <span class="fs-24 pl-10" @click="changeView('chart')"><i class="fa fa-line-chart" aria-hidden="true" :class="{ 'active': (view !== 'table') }"></i></span>
        </el-col>
      </el-row>
      <div class="block pt-10">
        <el-row :gutter="20">
          <el-col :span="2">
            <el-button type="text" @click="formatData(-1)"><i class="fa fa-arrow-left" aria-hidden="true"></i> Prev</el-button>
          </el-col>
          <el-col :span="2" :offset="20" class="text-right">
            <el-button type="text" @click="formatData(1)">Next <i class="fa fa-arrow-right" aria-hidden="true"></i></el-button>
          </el-col>
        </el-row>
      </div>
      <div class="chart_view" v-if="weatherData && view === 'chart'">
        <div class="" v-if="dataSet.length > 0">
          <linechart :data="dataSet" :options="{responsive: true, maintainAspectRatio: false}" :labels="graphLabels" :width="500" :height="300"></linechart>
        </div>
      </div>
      <div class="table_view" v-if="weatherData && view === 'table'">
        <el-table :data="currentDayData" border>
          <el-table-column prop="dt_txt" label="Time"></el-table-column>
          <el-table-column prop="main.temp_min" label="Min. Temp"></el-table-column>
          <el-table-column prop="main.temp_max" label="Max. Temp"></el-table-column>
          <el-table-column prop="weather[0].description" label="Description"></el-table-column>
        </el-table>
      </div>
    </el-main>
    <el-footer class="p-0">
      <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <div class="align_right">
          <el-menu-item index="1"><a href="https://www.github.com/rajeshwarpatlolla" target="_blank"><i class="fa fa-github-square" aria-hidden="true"></i></a></el-menu-item>
          <el-menu-item index="2"><a href="https://www.linkedin.com/in/rajeshwar-patlolla-b4a797117/" target="_blank"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a></el-menu-item>
          <el-menu-item index="3"><a href="https://twitter.com/rajeshwar_9032" target="_blank"><i class="fa fa-twitter-square" aria-hidden="true"></i></a></el-menu-item>
          <el-menu-item index="4"><a href="https://www.facebook.com/rajeshwarpatlolla" target="_blank"><i class="fa fa-facebook-official" aria-hidden="true"></i></a></el-menu-item>
        </div>
      </el-menu>
    </el-footer>
  </el-container>
</template>

<script>
  import _ from 'lodash';
  import LineChart from '../graphs/line-graph';

  export default {
    name: 'weather-forecast',
    data() {
      return {
        weatherData: null,
        allDaysData: null,
        currentDayData: null,
        currentIndex: 0,
        view: 'table',
        dataSet: null,
        graphLabels: null,
      };
    },
    mounted() {
      this.getTempDetails();
    },
    components: { linechart: LineChart },
    methods: {
      changeView(view) {
        this.view = view;
      },
      getTempDetails() {
        this.$http.get('http://samples.openweathermap.org/data/2.5/forecast?id=1269843&appid=999903a6fc3491a4e3ef55fb06300e13')
          .then((response) => {
            window.console.log(response);
            this.weatherData = response.body;
            _.forEach(this.weatherData.list, (val) => {
              val.day = this.removeHMS(val.dt);   // eslint-disable-line
            });
            // grouping the values day wise
            this.allDaysData = _.values(_.groupBy(this.weatherData.list, 'day'));
            this.formatData(this.currentIndex);
          }, (error) => {
            window.console.log(error);
          });
      },
      removeHMS(val) {  // removing hours, minutes, seconds and milliseconds to get the exact day
        const tempEpoch = new Date(val * 1000);
        tempEpoch.setHours(0);
        tempEpoch.setMinutes(0);
        tempEpoch.setSeconds(0);
        tempEpoch.setMilliseconds(0);
        return tempEpoch.getTime();
      },
      formatData(index) { // preparing the data for single day
        this.graphLabels = [];
        this.currentIndex = this.currentIndex + index;
        this.currentIndex = (this.currentIndex === -1) ? 5 : this.currentIndex;  // eslint-disable-line
        this.currentIndex = (this.currentIndex === this.allDaysData.length) ? 0 : this.currentIndex;  // eslint-disable-line
        this.currentDayData = this.allDaysData[this.currentIndex];
        this.dataSet = _.map(_.map(this.allDaysData[this.currentIndex], 'main'), 'temp');
        const dates = _.map(this.allDaysData[this.currentIndex], 'day');
        _.forEach(dates, (val) => {
          const d = new Date(val);
          this.graphLabels.push(d.getDate() + '-' + (d.getMonth() + 1) + '-' + new Date(val).getFullYear());  // eslint-disable-line
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  .el-header, .el-footer {
    position: fixed;
    width: 100%;
    z-index: 99;
  }
  .el-header {
    .el-menu-item {
      font-size: 24px;
      font-weight: bold;
    }
  }
  .el-footer {
    bottom: 0px;
    background-color: rgb(84, 92, 100);
    .fa {
      font-size: 24px;
      color: #fff;
    }
    .align_right {
      position: absolute;
      display: flex;
      right: 0;
    }
    .el-menu {
      border-color: rgb(84, 92, 100);
    }
  }
  .el-main {
    margin: 60px 0;
    .active {
      color: #66b1ff;
    }
    .chart_view, .table_view {
    }
  }
</style>
