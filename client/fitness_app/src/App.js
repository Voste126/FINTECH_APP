// import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// // Import Routes instead of Switch 
// import { Routes } from 'react-router-dom';

// import Login from './components/login';
// import Register from './components/register';  
// import Home from './components/dashboard';

// function App() {
//   return (
//     function App() {
//       return (
//         <BrowserRouter>
//           <div className="App">
//             <h1>Fitness App</h1>
//             <nav>
//               <ul>
//                 <li>
//                   <Link to="/">Home</Link>
//                 </li>
//                 <li>
//                   <Link to="/login">Login</Link>
//                 </li>
//                 <li>
//                   <Link to="/register">register</Link>
//                 </li>
//                 <li>
               
//                 </li>
//               </ul>
//             </nav>
    
//             <Router>
//         <div>
//         {/* Use Routes instead of Switch */}
//         <Routes>
//           <Route exact path="/" element={<Home />} /> 
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
          
//           {/* Other routes */}
//         </Routes>
//       </div>
//     </Router>
//           </div>
//         </BrowserRouter>
//       );
//     }
    
   

//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

import Login from './components/login/login';
import Register from './components/register/register';
import Home from './components/Dashboard/dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Fitness App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            {/* Add other navigation links as needed */}
          </ul>
        </nav>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
