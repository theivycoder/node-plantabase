// module.exports = mongoose => {
//     const schema = mongoose.model(
//         "testplant",
//         mongoose.Schema(
//             {
//                 name: String,
//                 scname: String,
//                 description: String
//             },
//             { timestamps: true }
//         )
//     );

//     schema.method("toJSON", function() {
//         const { __v, _id, ...object } = this.toObject();
//         object.id = _id;
//         return object;
//     });

//     const Testplant = mongoose.model("testplant", schema);
//     return Testplant;
// };
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