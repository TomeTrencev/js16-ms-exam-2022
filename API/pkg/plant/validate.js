const { Validator } = require('node-input-validator');

const Plant = {
    name: 'required|string',
    likes_sun: 'required|number',
    likes_water: 'required|number',
    has_flower: 'required|boolean',
    has_thorns: 'required|boolean',
    found_on_continent: 'required|array',
    current_location: 'required|object',
    last_watering_date: 'required|date',
    created: 'requied|date'
};

const PlantPartial = {
    name: 'string',
    likes_sun: 'number',
    likes_water: 'number',
    has_flower: 'boolean',
    has_thorns: 'boolean',
    found_on_continent: 'array',
    current_location: 'object',
    last_watering_date: 'date',
    created: 'date'
};

const validate = async (data, schema) => {
    let v = new Validator(data, schema);
    let e = await v.check(); 
    if (!e) {
        throw {
            code: 400,
            error: v.errors
        };
    }
};

module.exports = {
    Plant,
    PlantPartial,
    validate
}