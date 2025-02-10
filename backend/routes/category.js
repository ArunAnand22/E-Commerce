const express = require('express');
const router = express.Router();
const Category = require("../db/category");
const { addCategory, updateCategory, deleteCategory,getCategory,getCategorybyId } = require('../handlers/category-handler');

//get request
router.get("", async (req, res) => {
    try {
        let result = await getCategory();

        if (result && result.length > 0) {
            return res.status(200).json({ data: result });
        } else {
            return res.status(404).json({ message: "No data found." });
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ status:500,message: "Internal server error." });
    }
});



// post request
router.post("", async (req, res) => {
    try {

        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ status:400,error: "Category name is required" });
        }

        let result =await addCategory(name);

        // res.send(result);
        if(result){
        return res.status(200).json({ status:200,message: "Category added sucessfully." });

        }
    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// put request
router.put("/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ status:400,error: "Category name is required" });
        }

        let result =await updateCategory(id,name);

        if (!result) {
            return res.status(404).json({ status:404,error: "Category not found" });
        }

        // res.send(result);
        return res.status(200).json({ status:200,message: "Category updated sucessfully." });

    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// delete request
router.delete("/:id", async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ status:400,error: "Category not found" });
        }

        let result =await deleteCategory(id);

        if (!result) {
            return res.status(404).json({ status:404,error: "Something went wrong." });
        }

        // res.send(result);
        return res.status(200).json({ status:200,message: "Category deleted sucessfully." });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//get category by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let result = await getCategorybyId(id);

        if (result) {
            return res.status(200).json({ data: result });
        } else {
            return res.status(404).json({ message: "No data found." });
        }
    } catch (error) {
        console.error("Error fetching category:", error);
        return res.status(500).json({ status:500,message: "Internal server error." });
    }
});



module.exports = router;