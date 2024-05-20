import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { BrowserView} from "react-device-detect";
import "./App.css";

function App() {
    return (
        <BrowserView >
        <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                            <Page />
                                    }
                                />
                            );
                        })}{' '}
                    </Routes>
                </div>
            </Router>
        </BrowserView>
    );
}

export default App;