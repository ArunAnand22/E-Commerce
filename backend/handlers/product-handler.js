const { model } = require("mongoose")
const Product = require("../db/product")

async function getProduct() {
    let products =await Product.find();
    return products.map(c=>c.toObject());
}

async function addProduct(model) {
    let product = new Product({
        ...model,
    });
    await product.save();
    return product.toObject();
}

async function updateProduct(id, model) {
    await Product.findOneAndUpdate({ _id: id },
     {
        name: model
     });
    return 200;
}

async function deleteProduct(id) {

    await Product.findOneAndDelete({_id: id});
    return 200;
}

async function getProductbyId(id) {
    let category =await Product.findOne({_id: id});

    return category.toObject();
}

module.exports = { getProduct,addProduct,updateProduct,deleteProduct,getProductbyId }
