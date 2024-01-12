import SmartView from "./smart-view";
import { Chart } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { countMoneyTotal, countTypeTotal, countTimeTotal } from "../utils/statistics";
import { POINT_TYPES } from "../utils/const";
import { makeItemsUniq } from "../utils/statistics";
import { intervalConvert , humanizeDateDuration, humanizeDate} from "../utils/common";
 // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
 const BAR_HEIGHT = 55;


const createMoneyChart = (chart,points)=>{ 
  const types = points.map((point)=>point.pointType); 
  const uniquePoints = makeItemsUniq(types); 
  const totalMoney = countMoneyTotal(points) ;  
  const totalMoneyArray = Object.entries(totalMoney)
  .filter(([key, value]) => uniquePoints.includes(key))
  .map(([key, value]) => value);

  const moneyChart = new Chart(chart, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: uniquePoints,
      datasets: [{
        data: totalMoneyArray,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: () => totalMoneyArray.forEach((item)=>{`€ ${item}`}),
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
  return moneyChart;
}

const createTypeChart = (chart,points)=>{
  const types = points.map((point)=>point.pointType); 
  const uniquePoints = makeItemsUniq(types); 
  const totalType = countTypeTotal(points) ;  
  const totalTypeArray = Object.entries(totalType)
  .filter(([key, value]) => uniquePoints.includes(key))
  .map(([key, value]) => value);
totalTypeArray.forEach((item)=>console.log(item));
  const typeChart = new Chart(chart, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: uniquePoints,
      datasets: [{
        data: totalTypeArray,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: () =>  totalTypeArray.forEach((type)=>`${type}x`),
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
  return typeChart;
};

const createTimeChart = (chart,points)=>{
  console.log(points);
  const types = points.map((point)=>point.pointType); 
  const uniquePoints = makeItemsUniq(types); 
  const totalType = countTimeTotal(points) ;  
  const totalTimeArray = Object.entries(totalType)
  .filter(([key, value]) => uniquePoints.includes(key))
  .map(([key, value]) => value);
  console.log(totalTimeArray);
  // const convertedTimeArray = totalTimeArray.map((item)=>intervalConvert(item/100000));
  // console.log(convertedTimeArray);
  // convertedTimeArray.forEach((type)=>console.log(type));

  const timeChart = new Chart(chart, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: uniquePoints,// Сюда нужно передать названия уникальных типов, они станут ярлыками
      datasets: [{
        data: totalTimeArray,// Сюда нужно передать в том же порядке количество пунктов по каждому типу
        backgroundColor: '#ffffff',// Сюда нужно передать в том же порядке HEX каждого цвета
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${intervalConvert(val)}`,
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
  return timeChart;
}
const createStatsTemplate = ()=>{
  return `<section class="statistics">
            <h2 class="visually-hidden">Trip statistics</h2>
  
            <div class="statistics__item">
              <canvas class="statistics__chart statistics__chart--money" id="money" width="900"></canvas>
            </div>
  
            <div class="statistics__item">
              <canvas class="statistics__chart statistics__chart--type" id="type" width="900"></canvas>
            </div>
  
            <div class="statistics__item">
              <canvas class="statistics__chart statistics__chart--time" id="time-spend" width="900"></canvas>
            </div>
          </section>
        `;  
}

export default class StatsView extends SmartView {
  constructor(points){
    super();
    this._data = points;
    console.log(this._data);
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;
    this._setCharts();
  }
  getTemplate(){
    return createStatsTemplate();
  }

  removeElement() {
    super.removeElement();
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts(){
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    };

    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    const typeCtx = this.getElement().querySelector('.statistics__chart--type');
    const timeCtx = this.getElement().querySelector('.statistics__chart--time');
    moneyCtx.height = BAR_HEIGHT * 5;
    typeCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;

    this._moneyChart = createMoneyChart(moneyCtx,this._data);
    this._typeChart = createTypeChart(typeCtx,this._data);
    this._timeChart = createTimeChart(timeCtx,this._data);
  }
}