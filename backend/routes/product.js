const express = require('express');
const router = express.Router();
const Product = require("../db/product");
const { getProduct,addProduct,updateProduct,deleteProduct,getProductbyId } = require('../handlers/product-handler');

//get request
router.get("", async (req, res) => {
    try {
        let result = await getProduct();

        if (result && result.length > 0) {
            return res.status(200).json({ data: result });
        } else {
            return res.status(404).json({ message: "No data found." });
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ status:500,message: "Internal server error." });
    }
});
// post request
router.post("", async (req, res) => {
    try {

        let model = req.body;
        if (!model) {
            return res.status(400).json({ status:400,error: "Data is missing." });
        }

        let result =await addProduct(model);

        // res.send(result);
        if(result){
        return res.status(200).json({ status:200,data:result,message: "Product added sucessfully." });

        }
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//put request
router.put("/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ status:400,error: "Items are missing." });
        }

        let result =await updateProduct(id,name);

        if (!result) {
            return res.status(404).json({ status:404,error: "Product not found" });
        }

        // res.send(result);
        return res.status(200).json({ status:200,message: "Product updated sucessfully." });

    } catch (error) {
        console.error("Error updating Product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// delete request
router.delete("/:id", async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ status:400,error: "Product not found" });
        }

        let result =await deleteProduct(id);

        if (!result) {
            return res.status(404).json({ status:404,error: "Something went wrong." });
        }

        // res.send(result);
        return res.status(200).json({ status:200,message: "Product deleted sucessfully." });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//get product by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let result = await getProductbyId(id);

        if (result) {
            return res.status(200).json({ data: result });
        } else {
            return res.status(404).json({ message: "No data found." });
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json({ status:500,message: "Internal server error." });
    }
});

module.exports = router;