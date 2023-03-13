import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const testPlantSchema = new Schema({
    name: String,
    scname: String,
    description: String
}, { timestamps: true });

testPlantSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

const TestPlant = model('TestPlant', testPlantSchema);

export default TestPlant;