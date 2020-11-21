'use strict'

import mongoose from 'mongoose';
import app from './app';
import config from './config'

mongoose.connect(config.database, config.databaseConfig, err => {
  if (err) {
    return console.log('DB connection error ' + err)
  }
  console.log('DB connection success')

  app.listen(config.port, () => {
    console.log('API REST running at http://localhost:'+ config.port)
  })
})
