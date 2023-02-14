var express = require('express');
var router = express.Router();

// Recibi los datos de la llamada de telefono
router.post('/initial_calls', function(req, res, next) {
  let callData = req.body;
  let { phoneNumberFrom, phoneNumberTo, timeInit } = callData
  try{
    if(Object.keys(callData).length === 0) {
      throw new Error('BAD REQUEST: ALL FIELDS ARE REQUIRED')
    }
    if(!phoneNumberFrom) {
      throw new Error('BAD REQUEST: PHONE NUMBER FROM IS REQUIRED')
    }
    if(!phoneNumberTo) {
      throw new Error('BAD REQUEST: PHONE NUMBER TO IS REQUIRED')
    }
    if(!timeInit) {
      throw new Error('BAD REQUEST: TIME INIT IS REQUIRED')
    }
    
  }catch(error) {
    res.status(400).json({message: error.message});
  }
  
});

module.exports = router;
