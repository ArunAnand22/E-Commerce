const { model } = require("mongoose")
const Category = require("../db/category")



async function addCategory(model) {
    console.log("Model name:",model)
    let category = new Category({
        name: model
    });
    await category.save();
    return category.toObject();
}

async function updateCategory(id, model) {
    console.log("Update category: ",model)
    await Category.findOneAndUpdate({ _id: id },
     {
        name: model
     });
    return 200;
}

async function deleteCategory(id) {

    await Category.findOneAndDelete({_id: id});
    return 200;
}

module.exports = { addCategory, updateCategory,deleteCategory }