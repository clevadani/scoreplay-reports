import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { generateColors } from "../utils";

const PercentageChange = ({data, data2, startDate, endDate, rangeStart}) => {
    const productPercentages = {};

    const dataKeys = Object.keys(data)
    const dataKeys2 = Object.keys(data2)
    
    const mainArray = dataKeys.length > dataKeys2.length ? dataKeys: dataKeys2;
    
    mainArray.map(item => {
        // console.log(`${item} => data(${data[item]}) - data2(${data2[item]})`)
        if(data[item] && data2[item]){
          const sum = data[item] + data2[item];
          const difference = Math.abs(data[item] - data2[item]);
            productPercentages[item] = Math.ceil(difference/sum * 100)
      } else {
            productPercentages[item] = 100
      }
        return item;
    })
    const dataArray = Object.values(productPercentages);

    const dataBar = {
      labels: Object.keys(productPercentages),
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
        <h3 className="mt-5">Percentage change with previous date range</h3>
        <p>{rangeStart.split(" ")[0]} - {startDate} and {startDate} - {endDate}</p>
        <Bar data={dataBar} options={barChartOptions} />
      </MDBContainer>
    );
}

export default PercentageChange;