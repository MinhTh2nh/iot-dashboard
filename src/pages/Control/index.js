import React, { Component } from "react";
import TopMenu from "../../components/TopMenu";
import LeftMenu from "../../components/LeftMenu";
import { Grid, Card } from "semantic-ui-react";
import humidityIcon from '../../6393411.png';
import temperatureIcon from '../../tải xuống.png';
import lightIcon from '../../tải xuống.jpg';

class Control extends Component {
    constructor(props) {
        super(props);
        this.state = {
            climateData: [],
            lightData: []
        };
    }

    componentDidMount() {
        this.fetchClimateData();
        this.climateIntervalId = setInterval(this.fetchClimateData, 3000);
        
        this.fetchLightData();
        this.lightIntervalId = setInterval(this.fetchLightData, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.climateIntervalId);
        clearInterval(this.lightIntervalId);
    }

    fetchClimateData = () => {
        fetch("http://localhost:3001/api/sensor/get/lastest")
            .then(response => response.json())
            .then(data => {
                this.setState({ climateData: data ? [data] : [] });
            })
            .catch(error => console.error("Error fetching climate data:", error));
    };

    fetchLightData = () => {
        fetch("http://localhost:3001/api/sensor/get/lastest/lightsensor")
            .then(response => response.json())
            .then(data => {
                this.setState({ lightData: data ? [data] : [] });
            })
            .catch(error => console.error("Error fetching light data:", error));
    };

    render() {
        const { climateData, lightData } = this.state;

        return (
            <div>
                <TopMenu />
                <LeftMenu />
                <Grid>
                    <Grid.Column
                        width={10}
                        style={{ paddingTop: "20px", paddingLeft: "30%", paddingRight: "30%" }}
                    >
                        <div style={{ padding: "20px", border: "1px solid #ccc", marginBottom: "20px", textAlign: "center" }}>
                            <div className="home-text-section1">
                                <h1 className="primary-heading1">Sensor Status</h1>
                                <table style={{ margin: "auto" }}>
                                    <tbody>
                                        {climateData.map((data, index) => (
                                            <tr key={index} className="container">
                                                <td className="primary-text1">
                                                    <Card>
                                                        <Card.Content>
                                                            <Card.Header>
                                                                <img src={temperatureIcon} alt="Temperature Icon" style={{ width: "100px", height: "100px" }} />
                                                                Temperature Room
                                                            </Card.Header>
                                                            <Card.Description>
                                                                {data && data.data.temperature !== null ? data.data.temperature : "Loading..."}
                                                            </Card.Description>
                                                        </Card.Content>
                                                    </Card>
                                                </td>
                                                <td className="primary-text1">
                                                    <Card>
                                                        <Card.Content>
                                                            <Card.Header>
                                                                <img src={humidityIcon} alt="Humidity Icon" style={{ width: "100px", height: "100px" }} />
                                                                Humidity Room
                                                            </Card.Header>
                                                            <Card.Description>
                                                                {data && data.data.humidity !== null ? data.data.humidity : "Loading..."}
                                                            </Card.Description>
                                                        </Card.Content>
                                                    </Card>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tbody>
                                        {lightData.map((data, index) => (
                                            <tr key={index} className="container">
                                                <td className="primary-text1">
                                                    <Card>
                                                        <Card.Content>
                                                            <Card.Header>
                                                                <img src={lightIcon} alt="Light Icon" style={{ width: "100px", height: "100px" }} />
                                                                Light
                                                            </Card.Header>
                                                            <Card.Description>
                                                                {data && data.data.light !== null ? data.data.light : "Loading..."}
                                                            </Card.Description>
                                                        </Card.Content>
                                                    </Card>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Control;
