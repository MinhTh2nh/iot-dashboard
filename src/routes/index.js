import config from '../config/index.js';

// Pages
import Home from '../pages/Home/index.js';
import Control from '../pages/Control/index.js';
import Visualize from '../pages/Visualize/index.js';
import Login from '../pages/Login/index.js';
import Register from '../pages/Register/index.js';


// Public routes
const publicRoutes = [
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.home, component: Home, layout: null },
    { path: config.routes.control, component: Control, layout: null },
    { path: config.routes.visualize, component: Visualize, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };