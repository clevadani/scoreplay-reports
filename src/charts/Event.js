import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { generateColors } from "../utils";

const Event = ({data}) => {

    const dataArray = Object.values(data);

    const dataBar = {
      labels: Object.keys(data),
      datasets: [
        {
          label: "Number of events per product",
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
        <h3 className="mt-5">Events</h3>
        <Bar data={dataBar} options={barChartOptions} />
      </MDBContainer>
    );
}

export default Event;