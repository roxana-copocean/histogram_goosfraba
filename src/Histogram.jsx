import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './Histogram.css';
import * as d3 from 'd3';

const POSTS_QUERY = gql`
	query allPosts {
		allPosts(count: 200) {
			id
			title
			body
			published
			createdAt
			author {
				id
				firstName
				lastName
				avatar
			}
		}
	}
`;

const Hisogram = ({ width, height }) => {
	const { data, loading, error } = useQuery(POSTS_QUERY);
	const [ chartData, setChartData ] = useState([]);
	const [ displayChart, setDisplayChart ] = useState(false);

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	useEffect(
		() => {
			if (data) {
				let postsByMonth = {};
				data.allPosts.forEach((post) => {
					if (post.author != null) {
						const date = new Date(post.createdAt * 1000);

						const month = months[date.getMonth()];

						if (month in postsByMonth) {
							postsByMonth[month]++;
						} else {
							postsByMonth[month] = 1;
						}
					}
				});
				const chartData = Object.entries(postsByMonth).map(([ month, count ]) => ({ month, count }));
				chartData.sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month));
				setChartData(chartData);
				// drawChart();
				setDisplayChart(true);
			}
			if (displayChart) {
				drawChart();
			}
		},
		[ data, displayChart ]
	);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	const drawChart = () => {
		const margin = { top: 70, right: 50, bottom: 70, left: 50 };
		const svg = d3
			.select('#histogram')
			.append('svg')
			.style('background-color', 'white')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', `translate(0,-${margin.bottom - 10})`);

		const xScale = d3
			.scaleBand()
			.domain(chartData.map((d) => d.month))
			.rangeRound([ margin.left, width - margin.right ])
			.padding(0.1);

		const yScale = d3
			.scaleLinear()
			.domain([ 0, d3.max(chartData, (d) => d.count) ])
			.range([ height - margin.bottom, margin.top ]);

		const barColors = d3
			.scaleLinear()
			.domain([ 0, d3.max(chartData, (d) => d.count) ])
			.range([ '#153539', '#45C4B0' ]);

		svg
			.append('g')
			.attr('transform', `translate(0,${height - margin.bottom})`)
			.call(d3.axisBottom(xScale))
			.selectAll('text')
			.style('text-anchor', 'end')
			.attr('dx', '-.8em')
			.attr('dy', '.15em')
			.attr('transform', 'rotate(-65)');

		svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(yScale));

		const bars = svg
			.selectAll('rect')
			.data(chartData)
			.enter()
			.append('rect')
			.attr('x', (d) => xScale(d.month))
			.attr('y', (d) => yScale(d.count))
			.attr('width', xScale.bandwidth())
			.attr('height', (d) => yScale(0) - yScale(d.count))
			.style('padding', '3px')
			.style('margin', '1px')
			.style('width', (d) => `${d * 10}px`)
			.attr('fill', function(d) {
				return barColors(d.count);
			})
			.attr('stroke', 'black')
			.attr('stroke-width', 1);
	};

	return (
		<div>
			<h4> Histogram </h4>
			<div id="histogram" />
		</div>
	);
};

export default Hisogram;
