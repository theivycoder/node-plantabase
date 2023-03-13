// import { TestPlant } from '../models/testPlant.model.js';
import TestPlant from "../models/testPlant.model.js";
// const TestPlant = models.Testplant;

// Create and Save a new testPlant
const create = (req, res) => {
    const testPlant = new TestPlant({
        name: req.body.name,
        scname: req.body.scname,
        description: req.body.description
        });
    
    testPlant.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the testPlant."
            });
        });

}

// Retrieve all testPlants from the database.
const findAll = (req, res) => {
    TestPlant.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving testPlants."
            });
        });

}

// Find a single testPlant with an id
const findOne = (req, res) => {
    const id = req.params.id;
    TestPlant.findById(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Not found testPlant with id " + id
                });
            }
            res.send(data);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Not found testPlant with id " + id
                });
            }
            return res.status(500).send({
                message: "Error retrieving testPlant with id " + id
            });
        });

}

// Update a testPlant by the id in the request
const update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    TestPlant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot update testPlant with id=${id}. Maybe testPlant was not found!`
                });
            }
            res.send({ message: "testPlant was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating testPlant with id=" + id
            });
        });
  
}

// Delete a testPlant with the specified id in the request
const remove = (req, res) => {
    const id = req.params.id;

    TestPlant.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: `Cannot delete testPlant with id=${id}. Maybe testPlant was not found!`
                });
            }
            res.send({
                message: "testPlant was deleted successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete testPlant with id=" + id
            });
        });

};

// Delete all testPlants from the database.
const deleteAll = (req, res) => {
  TestPlant.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} testPlants were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all testPlants."
        });
    });

}

export default {create, findAll, findOne, update, deleteAll, remove};