import express from 'express';
var router = express.Router();
import testPlantController from '../controllers/testPlant.controller.js';

    // Create a new testPlant
    router.post("/", testPlantController.create);

    // Retrieve all testPlantController
    router.get("/", testPlantController.findAll);

    // Retrieve a single testPlant with id
    router.get("/:id", testPlantController.findOne);

    // Update a testPlant with id
    router.put("/:id", testPlantController.update);

    // Delete a testPlant with id
    router.delete("/:id", testPlantController.remove);

    // Delete all testPlantController
    router.delete("/", testPlantController.deleteAll);

export default router;