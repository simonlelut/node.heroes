import * as mongoose from "mongoose";


export type HeroesModel = mongoose.Document & {
    name: string
};

let HeroesSchema = new mongoose.Schema({
    name        : String

});

const Heroes = mongoose.model("Heroes", HeroesSchema);
export default Heroes;
