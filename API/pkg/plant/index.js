const mongoose = require('mongoose');

const Plant = mongoose.model(
    'plants',
    {
        name: String,
        likes_sun: Number,
        likes_water: Number,
        has_flower: Boolean,
        has_thorns: Boolean,
        found_on_continent: Array,
        current_location: Object,
        last_watering_date: Date,
        created: Date
    },
    'plants'
);

const getAll = async () => {
    return await Plant.find({});
};

const getById = async (id) => {
    return await Plant.findOne({ _id: id });
};

const create = async (plant) => {
    let cvece = new Plant(plant);
    return await cvece.save();
};

const update = async (id, plant) => {
    return await Plant.updateOne({ _id: id }, plant);
};

const remove = async (id) => {
    return await Plant.deleteOne({ _id: id });
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};