var express = require('express');
var router = express.Router();
var calls = require('../src/repositories/calls')

// Recibi los datos de la llamada de telefono
router.post('/initial_calls', async function(req, res, next) {
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

    let callRegistered = await calls.registerCall(phoneNumberFrom, phoneNumberTo, timeInit);
    res.status(201).json(callRegistered);

  }catch(error) {
    res.status(400).json({message: error.message});
  }
  
});

// Para finalizar una llamada
router.put('/finish_calls/:id', async function(req, res, next) {
  let idCallRegistered = req.params.id;
  let endTimeCall = req.body;
  let { timeFinish } = endTimeCall
  try{
    if(Object.keys(endTimeCall).length === 0) {
      throw new Error('BAD REQUEST: ALL FIELDS ARE REQUIRED')
    }

    //Verifica si existe la llamada
    let callRegistered = await calls.findCallById(idCallRegistered);
    if(!callRegistered) {
      throw new Error('CALL NOT FOUND')
    }

    //Verifica si la llamada no ha finalizado previamente
    if(await calls.hasFinished(idCallRegistered)) {
      throw new Error('THE CALL HAS FINISHED')
    }
    
    let responseMethod = await calls.setFinishTime(idCallRegistered, timeFinish);
    res.status(201).json(responseMethod);

  }catch(error) {
    res.status(400).json({message: error.message});
  }
  
});

module.exports = router;
