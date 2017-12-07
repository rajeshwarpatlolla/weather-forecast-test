import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: ['data', 'options', 'labels'],
  watch: {
    data: {
      handler(newData) {
        this.data = newData;
        if (newData) {
          this.configGraph();
        }
      },
    },
  },
  mounted() {
    this.configGraph();
  },
  methods: {
    configGraph() {
      this.renderChart({
        labels: this.labels,
        datasets: [
          {
            label: 'Temperature',
            backgroundColor: '#f87979',
            data: this.data,
          },
        ],
      }, this.options);
    },
  },
};
