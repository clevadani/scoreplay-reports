import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import Event from "../../charts/Event"
import PercentageChange from "../../charts/PercentageChange"
import Revenue from "../../charts/Revenue"
import Yield from "../../charts/Yield"
const PAGE_UPDATE_INTERVAL = 1000 * 60 * 5; // 5 minutes

const ChartsPage = () => {

	const [startDate, handleStartDate] = useState(moment().subtract(7,'d').format('YYYY-MM-DD'));
	const [endDate, handleEndtDate] = useState(moment().format('YYYY-MM-DD'));
	const [facilityId, handleFacilityId] = useState();
	const [filteredData, handleFilteredData] = useState({});
	const [filteredData2, handleFilteredData2] = useState({});
	const [revenue, handleRevenue] = useState({});
	const [revenue2, handleRevenue2] = useState({});
	const [previousRangeStartDate, handlePreviousRangeStartDate] = useState();
	const [userId] = useState(0);
	const [loading, updateLoading] = useState(true);

	async function fetchData() {

		const body = {
			"query": {
					"start_date": `${startDate} 00:00:00`,
					"end_date": `${endDate} 23:59:59`
			}
		}
		const dateRange = moment.duration(moment(endDate).diff(moment(startDate))).asDays();
		const previousRangeStart = `${moment().subtract(dateRange*2,'d').format('YYYY-MM-DD')} 00:00:00`;
		const body2 = {
			"query": {
					"start_date": previousRangeStart,
					"end_date": `${startDate} 23:59:59`
			}
		}
		handlePreviousRangeStartDate(previousRangeStart)
		if(facilityId) body.query.facility_id = facilityId
		const options = {
			headers: {
				'Authorization': 'Bearer jiMb2jr9d1sGL8Za6Kb4VJnty0K98MqW',
				'Content-Type': 'application/json'
			}
		};

		const apiCall = await axios.post('https://erp.sofive.com/report/sales', body, options);
		const apiCall2 = await axios.post('https://erp.sofive.com/report/sales', body2, options);
		
		const data = apiCall.data;
		const data2 = apiCall2.data;


    const productDict = {};
    const productDict2 = {};
    const revenueDict = {};
    const revenueDict2 = {};
    data.map(item => {
			if(!productDict[`${item.product_type.name}`]){
				productDict[`${item.product_type.name}`] = 1;
				revenueDict[`${item.product_type.name}`] = item.amount;
			} else {
				productDict[`${item.product_type.name}`]++;
				revenueDict[`${item.product_type.name}`] += item.amount;
			}
      return item;
		})
    data2.map(item => {
			if(!productDict2[`${item.product_type.name}`]){
				productDict2[`${item.product_type.name}`] = 1;
				revenueDict2[`${item.product_type.name}`] = item.amount;
			} else {
				productDict2[`${item.product_type.name}`]++;
				revenueDict2[`${item.product_type.name}`] += item.amount;
			}
      return item;
		})
		
		handleFilteredData(productDict);
		handleRevenue(revenueDict);
		handleFilteredData2(productDict2);
		handleRevenue2(revenueDict2);
		updateLoading(false);
	}


  useEffect(() => {
		fetchData();
		setInterval(function(){ fetchData() }, PAGE_UPDATE_INTERVAL);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);
	
	const handleSubmit = e => {
		e.preventDefault();
		fetchData();
	}

	return (
		<Container>
			<Row>
				<Col>
					<Form inline>
						<Form.Group>
							<Form.Label htmlFor="startDate">Start Date:</Form.Label>
							<Form.Control
								type="date"
								className="mx-sm-3"
								id="startDate"
								value={startDate}
								onChange={e => handleStartDate(e.target.value)}
								aria-describedby="startDate"
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="endDate">End Date:</Form.Label>
							<Form.Control
								type="date"
								className="mx-sm-3"
								id="endDate"
								value={endDate}
								onChange={e => handleEndtDate(e.target.value)}
								aria-describedby="endDate"
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="facilityId">Facility id:</Form.Label>
							<Form.Control
								type="number"
								className="mx-sm-3"
								id="facilityId"
								value={facilityId}
								onChange={e => handleFacilityId(e.target.value)}
								aria-describedby="facilityId"
							/>
						</Form.Group>
						<Button onClick={handleSubmit} className="mx-sm-3">
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
			{
				!loading && 
				<div>
					{Object.keys(filteredData).length && <Event data={filteredData} />}
					{Object.keys(filteredData).length && <PercentageChange data={filteredData} data2={filteredData2} rangeStart={previousRangeStartDate} startDate={startDate} endDate={endDate} />}
					{Object.keys(filteredData).length && <Yield data={filteredData} data2={filteredData2} rangeStart={previousRangeStartDate} startDate={startDate} endDate={endDate} revenue={revenue} revenue2={revenue2}/>}
					{Object.keys(revenue).length && <Revenue data={revenue} />}
				</div>
			}
		</Container>
	);
}

export default ChartsPage;