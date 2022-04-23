const Animal = require('../models/Animal');

class AnimalController {
    async index(req, res, next) {
        try {
            const animals = await Animal.find({});
            return res.json(animals);
        } catch (error) {
            return next(error);
        }
    }

    async show(req, res, next) {
        try {
            const animal = await Animal.findById(req.params.id);
            return res.json(animal);
        } catch (error) {
            return next(error);
        }
    }

    // async showByIdUser(req, res, next) {
    //     try {
    //         const categories = await Category.find({ idUser: req.user._id });
    //         return res.json(categories);
    //     } catch (error) {
    //         return next(error);
    //     }
    // }

    async destroy(req, res, next) {
        try {
            await Animal.deleteOne({ _id: req.params.id });
            return res.json('Deleted successfully!');
        } catch (error) {
            return next(error);
        }
    }

    async store(req, res, next) {
        if (!req.files) {
            next(new Error('No file uploaded!'));
            return;
        }

        const newAnimal = new Animal({
            ...req.body,
            sampleCollector: req.user.name,
        });

        for (let i = 0; i < req.files.length; i++) {
            let imageUrl = {
                url: req.files[i].path,
            };
            newAnimal.media.push(imageUrl);
        }

        for (let i = 0; i < req.body.coordinatesArray.split(',').length; i++) {
            let coordinateObj = {
                coordinate: req.body.coordinatesArray.split(',')[i],
            };
            newAnimal.coordinates.push(coordinateObj);
        }

        try {
            await newAnimal.save();
            return res.json('Created successfully!');
        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next) {
        try {
            let animal = await Animal.findById(req.params.id);

            if (req.files.length !== 0) {
                animal.media = [];
            }

            for (let i = 0; i < req.files.length; i++) {
                let imageUrl = {
                    url: req.files[i].path,
                };
                animal.media.push(imageUrl);
            }

            if (req.body.coordinatesArray?.split(',').length !== undefined) {
                animal.coordinates = [];
            }

            for (let i = 0; i < req.body.coordinatesArray?.split(',').length; i++) {
                let coordinateObj = {
                    coordinate: req.body.coordinatesArray?.split(',')[i],
                };
                animal.coordinates.push(coordinateObj);
            }

            animal.scienceName = req.body.scienceName || animal.scienceName;
            animal.vietnameseName = req.body.vietnameseName || animal.vietnameseName;
            animal.localName = req.body.localName || animal.localName;
            animal.kingdom = req.body.kingdom || animal.kingdom;
            animal.phylum = req.body.phylum || animal.phylum;
            animal.class = req.body.class || animal.class;
            animal.order = req.body.order || animal.order;
            animal.family = req.body.family || animal.family;
            animal.ecologicalCharacteristics = req.body.ecologicalCharacteristics || animal.ecologicalCharacteristics;
            animal.morphologicalCharacteristics = req.body.morphologicalCharacteristics || animal.morphologicalCharacteristics;
            animal.useValue = req.body.useValue || animal.useValue;
            animal.distribution = req.body.distribution || animal.distribution;
            animal.specimenCondition = req.body.specimenCondition || animal.specimenCondition;
            animal.habitat = req.body.habitat || animal.habitat;
            animal.place = req.body.place || animal.place;
            animal.sampleCollectionDate = req.body.sampleCollectionDate || animal.sampleCollectionDate;
            animal.conservationStatus = req.body.conservationStatus || animal.conservationStatus;

            await animal.save();
            return res.json('Updated successfully!');
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new AnimalController();
