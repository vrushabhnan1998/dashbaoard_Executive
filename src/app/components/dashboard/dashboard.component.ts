import { Component, OnInit, Renderer2 } from "@angular/core";
import { FormsModule } from "@angular/forms";

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexXAxis,
  ApexDataLabels,
  ApexYAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
  ApexPlotOptions,
  ApexGrid
} from "ng-apexcharts";
import { RangeDatePickerComponent } from "../shared/range-date-picker/range-date-picker.component";
import { DateRangeTypes } from "../shared/common-enum";
import { CommonService } from "../shared/common.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule,FormsModule,RangeDatePickerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends CommonService implements OnInit{
  public bubbleChart:any;
  public columnChart:any;
  public pieChart:any;
  dateRangeTypes = DateRangeTypes;

  constructor(public renderer2 : Renderer2) {
    super(renderer2);
  }

  autoDateRange=[
    {id:0,name:"This Month"},
    {id:1,name:"Last Month"},
    {id:2,name:"Year To Date"},
    {id:3,name:"Custom Range"}
  ]
 
  ngOnInit(): void {
    this.initChart();
  }

  // #region Filter Data

  range(event: any) {
    const currentDate = new Date();
    let fromdate, todate;
  
    if (this.dateRangeTypes.ThisMonth === event) {
      fromdate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      todate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    } else if (this.dateRangeTypes.LastMonth === event) {
      fromdate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      todate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    } else if (this.dateRangeTypes.YearToDate === event) {
      fromdate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate() + 1);  // Starting from the next day last year
      todate = currentDate;
    }
  
    if (fromdate && todate) {
      this.bubbleChart.series = this.filterDataByDateRange(fromdate, todate);
      this.columnChart.series = this.filterColumnData(fromdate,todate);
    }
  }
  
  filterDataByDateRange(startDate: Date, endDate: Date): any[] {
    if (!this.bubbleChart?.series) return [];
    return this.bubbleChart.series.map((item: { name: any; data: any[]; }) => ({
      name: item.name,
      data: item.data.filter(([x, y, z, dateString]) => {
        const date = new Date(dateString);
        return date >= startDate && date <= endDate;
      })
    }))
  }


  filterColumnData(startDate: Date, endDate: Date): any[] {
    const filteredSeries: any[] = [];
  
    this.columnChart.series.forEach((seriesItem: { data: any[]; name: any; }) => {
      const filteredData = seriesItem.data.filter(dataItem => {
        const dataDate = new Date(dataItem.x);
        return dataDate >= startDate && dataDate <= endDate;
      });
  
      if (filteredData.length > 0) {
        filteredSeries.push({ name: seriesItem.name, data: filteredData });
      }
    });
  
    return filteredSeries;
  }

  // #region Filter Data

initChart(){
// #region Bubble Chart

  this.bubbleChart = {
    
    series: [
      {
        "name": "United States",
        "data": [
          [350, 6000, 10, '2024-01-01T00:00:00',],
          [200, 13000, 20, '2024-02-01T00:00:00'],
          [400, 13000, 20, '2024-03-01T00:00:00'],
          [700, 4000, 20, '2024-04-01T00:00:00'],
          [200, 5000, 20, '2024-05-01T00:00:00']
        ]
      },
      {
        "name": "Australia",
        "data": [
          [450, 4000, 33, '2024-01-01T00:00:00'],
          [500, 6000, 42, '2024-02-01T00:00:00'],
          [600, 12000, 48, '2024-03-01T00:00:00']
        ]
      },
      {
        "name": "Canada",
        "data": [
          [100, 1000, 55, '2024-01-01T00:00:00'],
          [200, 2500, 60, '2024-02-01T00:00:00'],
          [300, 5000, 45, '2024-03-01T00:00:00'],
          [400, 1000, 48, '2024-04-01T00:00:00'],
          [500, 4949, 50, '2024-05-01T00:00:00']
        ]
      },
      {
        "name": "United Kingdom",
        "data": [
          [150, 3938, 55, '2024-01-01T00:00:00'],
          [250, 2726, 60, '2024-02-01T00:00:00'],
          [350, 4467, 42, '2024-03-01T00:00:00']
        ]
      }
    ],
    grid:{
   show:false
    },
    legend: {
      color: '#5a5858',
      fontSize: '12px',
      fontWeight:700
    },
    colors:[,"#719ad2","#fec845","#74b264",'#ffa027'],

    chart: {
      height: 350,
      type: "bubble",
      toolbar: {
        show: false
      },
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 0.6
    },
    plotOptions: {
      bubble: {
        zScaling: false,
        minBubbleRadius: 60,
        maxBubbleRadius: 40,
    }
    },
   
    title: {
      text: "MRR Stats By Country",
      style: {
        color: '#5a5858',
        fontSize: '17px',
        fontFamily: 'Verdana, sans-serif',
        fontWeight:700
      },
    },
    xaxis: {
      min:0,
      max: 700,
      labels: {
        style: {
          colors: '#b3b0b0',
          fontSize: '12px',
          fontFamily: 'Verdana, sans-serif',
          fontWeight:700
        },
        formatter: (val: number) => `$${val}`
      },
      tickAmount: 7,
      type: "category",
      axisBorder: {
        show: true, 
        color: '#78909C',
        height: 1,
        width: '100%'
      }
    },
    
    yaxis: {
      min: -4000,
      max: 14000,
      labels: {
        style: {
          colors: '#b3b0b0', // Can be an array or single color
          fontSize: '12px',
          fontFamily: 'Verdana, sans-serif',
          fontWeight:700
        },
        formatter: (val: number) => `$${val / 1000}.0`
      },
      axisBorder: {
        show: true,
        color: '#78909C', 
        width: 1 
      }
    }}

  // #region Column Chart

  this.columnChart = {
    series: [
      {
        name: 'PRODUCT A',
        data: [
          { x: '2024-01-01T00:00:00', y: 1200 },
          { x: '2024-02-01T00:00:00', y: 1400 },
          { x: '2024-03-01T00:00:00', y: 1600 },
          { x: '2024-04-01T00:00:00', y: 1800 },
          { x: '2024-05-01T00:00:00', y: 2000 }
        ]
      },
      {
        name: 'PRODUCT B',
        data: [
          { x: '2024-01-01T00:00:00', y: 1000 },
          { x: '2024-02-01T00:00:00', y: 1100 },
          { x: '2024-03-01T00:00:00', y: 1200 },
          { x: '2024-04-01T00:00:00', y: 1300 },
          { x: '2024-05-01T00:00:00', y: 1400 }
        ]
      },
      {
        name: "PRODUCT C",
        data: [
          {x: '2024-01-01T00:00:00', y: 6000 },
          {x: '2024-02-01T00:00:00', y: 4000 },
          {x: '2024-03-01T00:00:00', y: 5000 },
          {x: '2024-04-01T00:00:00', y: 6000 },
          {x: '2024-05-01T00:00:00', y: 5400 },
          {x: '2024-06-01T00:00:00', y: 2000 },
        ]
      },
      {
        name: "PRODUCT D",
        data: [
          { x: '2024-01-01T00:00:00', y: -1000 },
          { x: '2024-02-01T00:00:00', y: -2000 },
          { x: '2024-03-01T00:00:00', y: -3000 },
          { x: '2024-04-01T00:00:00', y: -2400 },
          { x: '2024-05-01T00:00:00', y: -3500 },
          { x: '2024-06-01T00:00:00', y: -1300 },
        ]
      }
      // Add more series as needed
    ]
    
,    
    colors:["#74b264","#fec845","#fea026","#719ad2"],
    title: {
      style: {
        color: '#5a5858',
        fontSize: '17px',
        fontFamily: 'Verdana, sans-serif',
        fontWeight:700
      },
      text: "MRP"
    },
    dataLabels: {
      enabled: false
    },
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: false
      },

    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth:40
      }
    },
    xaxis: {
      type: "category",
      labels: {
        style: {
          colors: '#b3b0b0',
          fontSize: '12px',
          fontFamily: 'Verdana, sans-serif',
          fontWeight:700
        },
      },
      categories: [
        "Jan-Feb",
        "Mar-Apr",
        "May-Jun",
        "Jul-Aug",
        "Sep-Oct",
        "Nov-Dec",
        
      ]
    },
    yaxis: {
      min: -4000,
      max: 14000,
      labels: {
        style: {
          colors: '#b3b0b0', 
          fontSize: '12px',
          fontFamily: 'Verdana, sans-serif',
          fontWeight:700
        },
        formatter: (val: number) => `$${val / 1000}k`
      }
    },
    legend: {
      show:false,
    },
    fill: {
      opacity: 1
    }
  };

  // #region Pie Chart

  this.pieChart={
    series: [5,15,80],
    colors:["#fec845","#719ad2","#74b264"],
    labels: ['Referral', 'Direct', 'Organic Search'],
    chart: {
      type: "donut",
    },
    title: {
      style: {
        color: '#5a5858',
        fontSize: '17px',
        fontFamily: 'Verdana, sans-serif',
        fontWeight:700
      },
      text: "Page Views"
    },
    legend: {
      show:false,
    },
    plotOptions:{
      pie:{
        donut: {
          size: '45%',
          labels: {
            show: false}
        }
      },
    
    },
  };
}

}
export type ChartOptions = {
  series?: ApexAxisChartSeries;
  chart?: ApexChart;
  apexXAxis?:ApexXAxis;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  title?: ApexTitleSubtitle;
  plotOptions?: ApexPlotOptions;
  grid?:ApexGrid;
  fill?: ApexFill;
  dataLabels?: ApexDataLabels;
  colors?: string[];

};