const express = require('express');
const router = express.Router();
const Product = require("../db/product");

// post request
router.post("", async (req, res) => {
    try {

        let model = req.body;
        if (!model) {
            return res.status(400).json({ status:400,error: "Data is missing." });
        }

        let result =await addCategory(model);

        // res.send(result);
        if(result){
        return res.status(200).json({ status:200,message: "Product added sucessfully." });

        }
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});