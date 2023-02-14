const { Call } = require('../../db/models')

const registerCall = async (phoneNumberFrom, phoneNumberTo, timeInit) => {
    return await Call.create(
        {
            phoneNumberFrom,
            phoneNumberTo,
            timeInit
        }
    )
}

module.exports = {
    registerCall,
}