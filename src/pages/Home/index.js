import React, { Component } from "react";
import TopMenu from "../../components/TopMenu";
import LeftMenu from "../../components/LeftMenu";
import { Grid, Header } from "semantic-ui-react";
import wemosImg from '../../mach-wemos-d1-OGUZ-s2-1024x1024.jpg';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardsData: []
        };
    }

    componentDidMount() {
        this.fetchData();
        this.intervalId = setInterval(this.fetchData, 6000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    fetchData = () => {
        fetch("http://localhost:3001/api/device/get")
            .then(response => response.json())
            .then(data => this.setState({ boardsData: data }))
            .catch(error => console.error("Error fetching boards data:", error));
    };  

    getDateColor = (isActive) => {
        return isActive == false ? "red" : "green";
    };
    

    render() {
        const { boardsData } = this.state;

        return (
            <div>
                <div>
                    <h2>Hi My Customers</h2>
                </div>
                <TopMenu />
                <LeftMenu />
                <Grid>
                    <Grid.Column width={10} style={{ paddingTop: "20px", paddingLeft: "30%", paddingRight: "30%" }}>
                        <div style={{ padding: "20px", border: "1px solid #ccc", marginBottom: "20px", marginRight: "20%", marginLeft: "20%" }}>
                            <Header as="h3">Welcome to IoT System Group 08</Header>
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: "left" }}>Member :</td>
                                        <td style={{ textAlign: "right" }}>Nguyen Minh Thanh</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: "left" }}>Student ID :</td>
                                        <td style={{ textAlign: "right" }}>20521920</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: "left" }}>Member :</td>
                                        <td style={{ textAlign: "right" }}>Nguyen Van Tan</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: "left" }}>Student ID :</td>
                                        <td style={{ textAlign: "right" }}>20521880</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h2>Status of Devices</h2>
                        <div style={{ padding: "20px", border: "1px solid #ccc", marginBottom: "20px" }}>
                        <div style={{ padding: "20px", border: "1px solid #ccc", marginBottom: "20px", textAlign: "center" }}>
                            <table style={{ margin: "auto" }}>
                                <tbody>
                                    {boardsData.map(board => (
                                        <tr className="container" key={board._id}>
                                            <td className="primary-text1">
                                                <img src={wemosImg} alt="Wemos Board" style={{ width: "100px", height: "100px" }} />
                                            </td>
                                            <td className="primary-text1">
                                                <div>
                                                    <div>
                                                        <span className="date" style={{ color: this.getDateColor(board.isActive) }}>{board.lastActive}</span>
                                                    </div>
                                                    <div>
                                                        <span>{board.sensor_type}</span>
                                                    </div>
                                                </div>
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

export default Home;
