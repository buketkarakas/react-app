import './App.css'
import UserForm from './UserForm'
import { AppBar, Toolbar, Typography } from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import React from 'react'

function App () {
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
  )
}

export default App
