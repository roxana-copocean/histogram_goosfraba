# Histogram Chart with D3 and React

This project is a histogram chart built with D3 and React. It displays the number of posts created by month using data from a GraphQL API.

**Getting Started**

* Clone the repository by running `git clone https://github.com/roxana-copocean/histogram_goosfraba.git` in your command line.
* Run `npm install` to install all the dependencies.
* Run `npm start` to start the development server.
* The application will be running on `http://localhost:3000/.`

**Dependencies**

* `@apollo/client` for making GraphQL requests.
* `d3` for creating the chart.
* `react` and `react-dom` for 
building the user interface.

<br>

**Code Structure**
<br>
The main code for the histogram chart can be found in *src/Histogram.js.*
<br>
This is the main component that renders the histogram chart. It takes in the width and height props to set the size of the chart.

The *useQuery hook* from @apollo/client is used to fetch data from the GraphQL API.
<br>
<br>
**chartData** 
<br>
Is the state variable that holds the data for the chart. *setChartData* is the function used to update the state.

The useEffect hook is used to fetch the data and update the state when the component is mounted.
If the data is returned from the API, it is processed to create an object that has the number of posts for each month.
The processed data is then mapped to an array of objects where each object has the month and count of posts.
<br>
<br>
**drawChart()**
<br>
The *drawChart* function is called to render the chart with the updated data.
<br>
If *displayChart* is true, the *drawChart* function is called. This function creates the chart using D3.js.
<br>
The *bars* are then rendered using the *chartData* state, with their heights and colors determined by the scales.

The component also has simple *error* and *loading* state handling, displaying a message if there is an error or if the data is still loading.


**Challenges Faced**

This was my first time using GraphQL and d3, so I faced some challenges while building this project.

* Working with GraphQL was new to me, so it took some time to understand the concepts and how to use the @apollo/client library to fetch data from the API. I also had to learn how to structure the GraphQL query and how to handle the returned data.

* I was also unfamiliar with D3, so I had to learn how to utilize it to produce the histogram chart. I had to learn about scales and axes, as well as how to link data to a chart. I also had to learn about other scales, such as band and linear scales, and how to utilize them in the chart.

Overall, working with these technologies was a both rewarding and challenging experience, and I learnt a lot while developing this project.