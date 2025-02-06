const express = require('express');
const router = express.Router();
const Category = require("../db/category");
const { addCategory, updateCategory, deleteCategory } = require('../handlers/category-handler');

// post request
router.post("", async (req, res) => {
    try {
        console.log("Body:", req.body.name);

        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Category name is required" });
        }

        let result =await addCategory(name);

        // res.send(result);
        if(result){
        return res.status(200).json({ message: "Category added sucessfully." });

        }
    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// put request
router.put("/:id", async (req, res) => {
    try {
        console.log("Updating Category:", req.params.id, "with data:", req.body.name);

        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Category name is required" });
        }

        let result =await updateCategory(id,name);

        if (!result) {
            return res.status(404).json({ error: "Category not found" });
        }

        // res.send(result);
        return res.status(200).json({ message: "Category updated sucessfully." });

    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// delete request
router.delete("/:id", async (req, res) => {
    try {
        console.log("Updating Category:", req.params.id, "with data:", req.body.name);

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Category not found" });
        }

        let result =await deleteCategory(id);

        if (!result) {
            return res.status(404).json({ error: "Something went wrong." });
        }

        // res.send(result);
        return res.status(200).json({ message: "Category deleted sucessfully." });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



module.exports = router;