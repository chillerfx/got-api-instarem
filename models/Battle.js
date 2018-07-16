import mongoose from 'mongoose';

const battleSchema = new mongoose.Schema({
    name: String,
    year: Date,
    battle_number: Number,
    attacker_king: String,
    defender_king: String,
    attacker_1: String,
    attacker_2: String,
    attacker_3: String,
    attacker_4: String,
    defender_1: String,
    defender_2: String,
    defender_3: String,
    defender_4: String,
    attacker_outcome: String,
    battle_type: String,
    major_death: { type: Boolean,
        get: v => {
             if(v === "") {
                return null;
             } else {
                 return v
             }
        },
        set: v => {
            if(v === "") {
               return null;
            } else {
                return v
            }
       }
    },
    major_capture: { type: Boolean,
        get: v => {
             if(v === "") {
                return null;
             } else {
                 return v
             }
        },
        set: v => {
            if(v === "") {
               return null;
            } else {
                return v
            }
       }
    },
    attacker_size: Number,
    defender_size: Number,
    attacker_commander: String,
    defender_commander: String,
    summer: { type: Boolean,
        get: v => {
             if(v === "") {
                return null;
             } else {
                 return v
             }
        },
        set: v => {
            if(v === "") {
               return null;
            } else {
                return v
            }
       }
    },
    location: String,
    region: String,
    note: String 	
})

const Battle = mongoose.model('Battle', battleSchema);
module.exports = Battle;