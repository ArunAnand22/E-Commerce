const { model } = require("mongoose")
const Brand = require("../db/brand")

async function getBrands(){
    let brands =await Brand.find();
    return brands.map(c=>c.toObject());
}

async function findBrandById(id){
    let brands =await Brand.findOne({_id: id});
    return brands.toObject();
}

async function addBrand(model) {
    let brand = new Brand({
        name: model
    });
    await brand.save();
    return brand.toObject();
}

async function updateBrand(id, model) {
    await Brand.findOneAndUpdate({ _id: id },
     {
        name: model
     });
    return 200;
}

async function deleteBrand(id) {

    await Brand.findOneAndDelete({_id: id});
    return 200;
}

module.exports = { getBrands,findBrandById,addBrand,updateBrand,deleteBrand }
