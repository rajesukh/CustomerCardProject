const cardModel = require("../models/cardModel")
const customerModel = require("../models/customerModel")


const createCard = async (req, res) => {
    try {

        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "enter the  data" })
        }

        let { cardType, customerName, customerID } = data

        if (!cardType) {
            return res.status(400).send({ status: false, msg: "cardType missing" })
        }

        if (!["REGULAR", "SPECIAL"].includes(cardType)) {
            return res.status(400).send({ status: false, msg: "cardType issue" })
        }
        if (!customerName) {
            return res.status(400).send({ status: false, msg: "customername missing" })
        }
        if (!/^[a-zA-Z]*$/.test(customerName.trim())) {
            return res.status(400).send({ status: false, msg: "customerName in wrong format" })

        }


        let customer = await customerModel.findOne({ customerID: customerID })

        if (!customer) {
            return res.status(404)
            .send({ status: false, msg: "customerID not found" })
        }
        let uniqCustomer = await cardModel.findOne({ customerID: customerID })

        if (uniqCustomer) {
            return res.status(400)
            .send({ status: false, message: "Card already exist" })
        }

        let cards = await cardModel.find()
        data.cardNumber = "C" + (cards.length + 1).toString().padStart((4 - cards.length.toString().length), '0');

        let savedData = await cardModel.create(data)
        return res.status(201)
        .send({ status: true, data: savedData })

    } catch (err) {
        return res.status(500)
        .send({ status: false, message: err.message })
    }
}

//  GET CARDLIST

const getCardList = async (req, res) => {
    try {
        let cards = await cardModel.find()
        if (cards.length == 0) {
            return res.status(404)
            .send({ status: false, msg: "Didn't get card" })
        }

        return res.status(200)
        .send({ status: true, data: cards })

    } catch (err) {
        return res.status(500)
        .send({ status: false, message: err.message })
    }
}



module.exports = { createCard, getCardList }
