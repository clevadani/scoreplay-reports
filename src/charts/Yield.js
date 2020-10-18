import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { generateColors } from "../utils";

const Yield = ({data, data2, startDate, endDate, rangeStart, revenue, revenue2}) => {

    const dataKeys = Object.keys(data)
    const dataKeys2 = Object.keys(data2)

    const yieldObject = {};
    const yieldObject2 = {};
    
    
    dataKeys.map(item => {
        yieldObject[item] = Math.floor(revenue[item] / data[item]);
      return item;
    });
    
    dataKeys2.map(item => {
        yieldObject2[item] = Math.floor(revenue2[item] / data2[item]);
      return item;
    });
    /* 
    */
    
    const revenueKeys = Object.keys(yieldObject)
    const revenueKeys2 = Object.keys(yieldObject2)
    
    const mainArray = revenueKeys.length > revenueKeys2.length ? revenueKeys: revenueKeys2;
    
    const yieldPercetageObject = {}
    
    mainArray.map(item => {
      if(data[item] && data2[item]){
        const sum = yieldObject[item] + yieldObject2[item];
        const difference = Math.abs(yieldObject[item] - yieldObject2[item]);
        yieldPercetageObject[item] = Math.floor(difference/sum * 100)
      } else {
        yieldPercetageObject[item] = 100
      }
      return item;
    });
    const dataArray = Object.values(yieldPercetageObject);

    const dataBar = {
      labels: Object.keys(yieldPercetageObject),
      datasets: [
        {
          label: "% change with previous date range",
          data: dataArray,
          backgroundColor: generateColors(dataArray.length, 0.4),
          borderWidth: 2,
          borderColor: generateColors(dataArray.length, 1)
        }
      ]
    }
    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }

    return (
      <MDBContainer>
        <h3 className="mt-5">Average yield per product</h3>
        <p>{rangeStart.split(" ")[0]} - {startDate} and {startDate} - {endDate}</p>
        <Bar data={dataBar} options={barChartOptions} />
      </MDBContainer>
    );
}

export default Yield;