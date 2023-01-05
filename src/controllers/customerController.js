
const customerModel = require("../models/customerModel")

const uuidValidate = require("uuid-validate")

const registerCustomer = async (req, res) => {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400)
            .send({ status: false, msg: "enter data" })
        }

        let { firstName, lastName, mobileNumber, DOB, emailID, address } = data
        if (!firstName) {
            return res.status(400)
            .send({ status: false, msg: "enter firstName" })
        }

        if (!lastName) {
            return res.status(400)
            .send({ status: false, msg: "lastName missing" })
        }
       
        if (!mobileNumber) {
            return res.status(400)
            .send({ status: false, msg: "enter mobileNumber" })
        }

        if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
            return res.status(400)
            .send({ status: false, msg: "mob number I=invalid"})
        }
        if (!DOB) {
            return res.status(400)
            .send({ status: false, msg: "DOB missing" })
        }
       
        if (!emailID) {
            return res.status(400)
            .send({ status: false, msg: "enter emailID" })
        }
        if (!/^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(emailID)) {
            return res.status(400)
            .send({ status: false, message: "invalid emai lId" });
        }
        if (!address) {
            return res.status(400)
            .send({ status: false, msg: "enter address" })
        }

        const savedData = await customerModel.create(data)
        
        res.status(201)
        .send({ status: true, data: savedData })

    } catch (err) {
        return res.send({ message: err.message })
    }

}


// GET CUSTOMERS 

const getCustomers = async (req, res) => {
    try {

        let data = await customerModel.find({ status: "ACTIVE" })

        if (data.length==0) {
            return res.status(404).send({ status: false, message: "customer not found" })
        }

        return res.status(200).send({ status: true, data: data })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }

}


// DELETING CUSTOMER BY ID 
const customerDelete = async (req, res) => {
    try {

        let id = req.query.customerID          
        if (!id) {
            return res.status(400)
            .send({ status: false, msg: "enter customerID"})
        }                  
        if (!uuidValidate(id)) {                          
            return res.status(400)
            .send({ status: false, msg: "uuid invalid" })
        }
        let customer = await customerModel.findOne({ customerID: id, isDeleted: false })

        if (!customer) {
            return res.status(404)
            .send({ status: false, message: "customer data not available"})
        }

        customer.isDeleted = true
        await customer.save()
        return res.status(200)
        .send({ status: true, msg: "Customer deleted sucesfully" })

    } catch (err) {
        return res.status(500)
        .send({ status: false, message: err.message })
    }
}

module.exports = { registerCustomer, getCustomers, customerDelete }