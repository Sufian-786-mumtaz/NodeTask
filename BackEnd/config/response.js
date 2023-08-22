const response = (res, data, messgae, resStatus) =>{
    return res.status(resStatus).send({ data: data , message: messgae });
}
module.exports = { response }
