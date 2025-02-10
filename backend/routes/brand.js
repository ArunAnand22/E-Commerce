const express = require('express');
const router = express.Router();
const Category = require("../db/brand");
const { getBrands,findBrandById,addBrand,updateBrand,deleteBrand } = require('../handlers/brand-handler');


//get request
router.get("", async (req, res) => {
    try {
        let result = await getBrands();

        if (result && result.length > 0) {
            return res.status(200).json({ data: result });
        } else {
            return res.status(404).json({ message: "No data found." });
        }
    } catch (error) {
        console.error("Error fetching brands:", error);
        return res.status(500).json({ status:500,message: "Internal server error." });
    }
});

// post request
router.post("", async (req, res) => {
    try {

        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ status:400,error: "Brand name is required" });
        }

        let result =await addBrand(name);

        // res.send(result);
        if(result){
        return res.status(200).json({ status:200,message: "Brand added sucessfully." });

        }
    } catch (error) {
        console.error("Error saving brand:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// put request
router.put("/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ status:400,error: "Brand name is required" });
        }

        let result =await updateBrand(id,name);

        if (!result) {
            return res.status(404).json({ status:404,error: "Brand not found" });
        }

        // res.send(result);
        return res.status(200).json({ status:200,message: "Brand updated sucessfully." });

    } catch (error) {
        console.error("Error updating brand:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// delete request
router.delete("/:id", async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ status:400,error: "Brand not found" });
        }

        let result =await deleteBrand(id);

        if (!result) {
            return res.status(404).json({ status:404,error: "Something went wrong." });
        }

        // res.send(result);
        return res.status(200).json({ status:200,message: "Brand deleted sucessfully." });
    } catch (error) {
        console.error("Error deleting brand:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


//get category by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let result = await findBrandById(id);

        if (result) {
            return res.status(200).json({ data: result });
        } else {
            return res.status(404).json({ message: "No data found." });
        }
    } catch (error) {
        console.error("Error fetching brand:", error);
        return res.status(500).json({ status:500,message: "Internal server error." });
    }
});

module.exports = router;

