// import Vue from 'vue';
import weatherForecast from '@/components/weather-forecast/weather-forecast';

describe('checking hooks and methods', () => {
  // it('should render correct content', () => {
  //   const Constructor = Vue.extend(weatherForecast);
  //   const vm = new Constructor().$mount();
  //   expect(vm.$el.querySelector('h1').textContent).to.be('table');
  //   expect(typeof weatherForecast.mounted).toBe('function');
  // });
  it('should define data', () => {
    expect(weatherForecast.data).to.be.a('function');
  });
  it('should create a mounted hook', () => {
    expect(weatherForecast.mounted).to.be.a('function');
  });
  it('should define components', () => {
    expect(weatherForecast.components).to.be.a('object');
  });
  it('should define methods', () => {
    expect(weatherForecast.methods).to.be.a('object');
  });
});

describe('checking methods', () => {
  it('should have getTempDetails method', () => {
    expect(weatherForecast.methods.getTempDetails).to.be.a('function');
  });
  it('should have changeView method', () => {
    expect(weatherForecast.methods.changeView).to.be.a('function');
  });
  it('should have removeHMS method', () => {
    expect(weatherForecast.methods.removeHMS).to.be.a('function');
  });
  it('should have formatData method', () => {
    expect(weatherForecast.methods.formatData).to.be.a('function');
  });
});

describe('initialisation of variables', () => {
  it('sets the correct weatherData', () => {
    expect(weatherForecast.data().weatherData).to.equal(null);
  });

  it('sets the correct current allDaysData', () => {
    expect(weatherForecast.data().allDaysData).to.equal(null);
  });

  it('sets the correct currentDayData', () => {
    expect(weatherForecast.data().currentDayData).to.equal(null);
  });

  it('sets the correct currentIndex', () => {
    expect(weatherForecast.data().currentIndex).to.equal(0);
  });

  it('sets the correct view', () => {
    expect(weatherForecast.data().view).to.equal('table');
  });

  it('sets the correct whetherData', () => {
    expect(weatherForecast.data().dataSet).to.equal(null);
  });

  it('sets the correct view Type', () => {
    expect(weatherForecast.data().graphLabels).to.equal(null);
  });
});
