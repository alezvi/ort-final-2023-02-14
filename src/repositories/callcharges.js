const { CallCharge, Call } = require('../../db/models')
const TO_60 = 1;
const TO_180 = 0.85;
const MORE_180 = 0.75;

const setCallCharges = async (idCallRegistered) => {
    let callRegister = await Call.findOne({
        where: {
            id: idCallRegistered
        }
    });
    let dateFinish = callRegister.timeFinish;
    let dateInit = callRegister.timeInit;

    let totalCallTime = calculateTotalTime(dateInit, dateFinish);
    let totalToPay = calculateTotalToPay(totalCallTime);

    return await CallCharge.create({
        totalCallTime,
        totalToPay,
        callId: idCallRegistered
    })
}

const calculateTotalTime = (dateInit, dateFinish) => {
    let difference = dateFinish.getTime() - dateInit.getTime();
    let minutes = Math.round(difference / 60000);
    return minutes;
};

const calculateTotalToPay = (totalCallTime) => {
    if(totalCallTime <= 60) {
        return totalCallTime * TO_60
    }else if(totalCallTime > 60 && totalCallTime <= 180) {
        return totalCallTime * TO_180
    }else {
        return totalCallTime * MORE_180
    }
}

module.exports = {
    setCallCharges
}