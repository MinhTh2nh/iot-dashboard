import React, { Component } from "react";
import TopMenu from "../../components/TopMenu";
import LeftMenu from "../../components/LeftMenu";
import SensorChart3 from "../../components/SensorChart";
import SensorChart1 from "../../components/SensorChart1";
import SensorChart2 from "../../components/SensorChart2";
import { Button, Dropdown, Grid } from "semantic-ui-react";
import { CSVLink } from "react-csv";

class Visualize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorData: [],
            filteredData: [],
            filterOption: 'all',
        };
    }

    componentDidMount() {
        this.fetchData();
        this.intervalId = setInterval(this.fetchData, 6000); // Fetch data every 6 seconds
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/sensor/get");
            const responseData = await response.json();
    
            // Assuming responseData is an object with a 'data' property containing the array
            const data = responseData.data || []; 
    
            this.setState({ sensorData: data, filteredData: data });
        } catch (error) {
            console.error("Error fetching sensor data:", error);
        }
    };
    

    handleFilterChange = (e, { value }) => {
        this.setState({ filterOption: value }, this.applyFilter);
    };

    applyFilter = () => {
        const { sensorData, filterOption } = this.state;
        let filteredData = sensorData;

        if (filterOption !== 'all') {
            filteredData = sensorData.filter(item => item.type === filterOption);
        }

        this.setState({ filteredData });
    };

    render() {
        const { filteredData } = this.state;
        const filterOptions = [
            { key: 'all', value: 'all', text: 'All' },
            { key: 'temperature', value: 'temperature', text: 'Temperature' },
            { key: 'humidity', value: 'humidity', text: 'Humidity' },
            { key: 'light', value: 'light', text: 'Light' },
        ];

        return (
            <div>
                <TopMenu />
                <LeftMenu />
                <Grid centered style={{ marginTop: '50px' }}>
                    <Grid.Row>
                        <Dropdown
                            placeholder='Select Data Type'
                            selection
                            options={filterOptions}
                            onChange={this.handleFilterChange}
                            style={{ marginBottom: '20px' }}
                        />
                    </Grid.Row>
                    <Grid.Row>
                        <SensorChart1 data={filteredData.filter(item => item.type === 'humidity')} />
                    </Grid.Row>
                    <Grid.Row>
                        <SensorChart3 data={filteredData.filter(item => item.type === 'light')} />
                    </Grid.Row>
                    <Grid.Row>
                        <SensorChart2 data={filteredData.filter(item => item.type === 'temperature')} />
                    </Grid.Row>
                    <Grid.Row>
                        <Button>
                            <CSVLink data={filteredData} filename={"sensor-data.csv"}>
                                Download CSV
                            </CSVLink>
                        </Button>
                        {/* Add similar buttons for Excel export using libraries like SheetJS */}
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Visualize;
