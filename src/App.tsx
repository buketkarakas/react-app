import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserForm from './UserForm';
import { AppBar, Toolbar, Icon, Typography } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
function App() {
  return (
    <div className="App">
      <AppBar position='static' enableColorOnDark color='secondary'>
      <Toolbar>
          <LightbulbIcon/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Form Demo Application
          </Typography>
        </Toolbar>
      </AppBar>
      <UserForm/>
    </div>
  );
}

export default App;
