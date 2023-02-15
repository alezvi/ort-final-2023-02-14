const { Op } = require('sequelize');
const { Call } = require('../../db/models')

const registerCall = async (phoneNumberFrom, phoneNumberTo, timeInit) => {
    return await Call.create(
        {
            phoneNumberFrom,
            phoneNumberTo,
            timeInit
        }
    )
};

const findCallById = async (idCallRegistered) => {
    return await Call.findOne({
        where: {
            id: idCallRegistered
        }
    })
};

const hasFinished = async (idCallRegistered) => {
    let callRegister = await Call.findOne({
        where: {
            id: idCallRegistered
        }
    })
    return callRegister.timeFinish != null;
};

const setFinishTime = async (idCallRegistered, timeFinish) => {
    await Call.update(
        {
            timeFinish
        },
        {
            where: {
                id: idCallRegistered
            }
        }
    );
    return await Call.findOne({
        where: {
            id: idCallRegistered
        }
    })
};

const getAllCalls = async (phoneNumberFrom) => {
    return await Call.findAll({
        where: {
            phoneNumberFrom
        }
    })
};

module.exports = {
    registerCall,
    findCallById,
    hasFinished,
    setFinishTime,
    getAllCalls
}