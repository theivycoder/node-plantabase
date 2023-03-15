import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const testPlantSchema = new mongoose.Schema({
    name: String,
    scname: String,
    description: String
}, 
    { timestamps: true }
);

testPlantSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

const TestPlant = model('TestPlant', testPlantSchema);

export default TestPlant;