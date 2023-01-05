const express = require("express");
const router= express.Router()
const customercontroller= require("../controllers/customerController")
const cardController= require("../controllers/cardController");

// customer
router.post("/register",customercontroller.registerCustomer )
router.get("/getCustomers", customercontroller.getCustomers)
router.delete("/delete", customercontroller.customerDelete)
// CARD 
router.post("/createCard", cardController.createCard)
router.get("/getCards", cardController.getCardList)

module.exports =router