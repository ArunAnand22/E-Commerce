const { model } = require("mongoose")
const Category = require("../db/category")


async function getCategory() {
    let categories =await Category.find();
    return categories.map(c=>c.toObject());
}

async function addCategory(model) {
    let category = new Category({
        name: model
    });
    await category.save();
    return category.toObject();
}

async function updateCategory(id, model) {
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

async function getCategorybyId(id) {
    let category =await Category.findOne({_id: id});

    return category.toObject();
}

module.exports = { addCategory, updateCategory,deleteCategory,getCategory,getCategorybyId }