const plant = require('../pkg/plant');
const {
    Plant,
    PlantPartial,
    validate
} = require('../pkg/plant/validate');

const getAll = async (req, res) => {
    try {
        let cvece = await plant.getAll(req.user.id);
        return res.send(cvece);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
};

const getOne = async (req, res) => {
    try {
        let cvece = await plant.getById(req.user.id, req.params.id);
        if (!cvece) {
            throw {
                code: 404,
                error: 'Post not found'
            }
        }
        return res.send(cvece);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
};

const create = async (req, res) => {
    try {
       await validate(req.body, Plant);
       let data = {
        ...req.body,
        user_id: req.user.id
    };
    let cvece = await plant.create(data);
    return res.status(201).send(cvece);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
};

const update = async (req, res) => {
    try {
        await validate(req.body, Plant);
        let data = {
            ...req.body,
            user_id: req.user.id
        };
        await plant.update(req.params.id, data);
        return res.status(204).send('');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
};

const updatePartial = async (req, res) => {
    try {
        await validate(req.body, PlantPartial);
        let data = {
            ...req.body,
            user_id: req.user.id
        };
        await plant.update(req.params.id, data);
        return res.status(204).send('');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
};

const remove = async (req, res) => {
    try {
        await plant.remove(req.params.id);
        return res.status(204).send('')
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server error');
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    updatePartial,
    remove
};

