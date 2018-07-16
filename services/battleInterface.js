import Battle from "../models/Battle";
import csv from 'csvtojson';
import path from 'path';

export class battleInterface {
  
  initData() {
    Battle.find({}, (err, res) => {
      if(res.length < 1) {
        //** Galėčiau ir protiniau kažkaip**/
        const csvPath = path.join(__dirname, '/battles.csv') 
        console.log(csvPath)
        csv()
        .fromFile(csvPath)
        .then((data)=>{
          Battle.insertMany(data)
        })
      }
    })
  }

  getBattleList() {
    return Battle.find({}, "name location region").then(data => {
      return data
    })
  }

  getBattleCount() {
    return Battle.find({}).count()
  }

  async getBattleStats() {
    const attacker = await this.getAttacker()
    const defender = await this.getDefender()
    const region = await this.getRegion()
    const battle_types = await this.getBattleTypes()

    return {
      most_active: {
        attacker_king:  attacker[0]._id,
        defender_king:  defender[0]._id,
        region: region[0]._id
      },
      attacker_outcome: {
        win:  attacker[0].totalBattlesWon,
        loss:  attacker[0].totalBattlesLost
      },
      battle_type: battle_types,
      defender_size: {
        average: defender[0].average,
        min: defender[0].min,
        max: defender[0].max
      }
    }
  }
  getBattleTypes() {
    return Battle.aggregate({})
      .group({
        _id: "$battle_type"
      })
  }
  getRegion() {
    return Battle.aggregate({})
    .group({
      _id: "$region",
      count: {$sum : 1}
    })
    .sort({"count": "desc"})
    .limit(1)
  }

  getDefender() {
    return Battle.aggregate({})
    .group({
      _id: '$defender_king', 
      average: {
        $avg: "$defender_size"
      },
      min: {
        $min: "$defender_size"
      },
      max: {
        $max: "$defender_size"
      },
      totalBattles: {
        $sum: { 
          $cond: [ 
            {$or : [  { $eq: [ "$attacker_outcome", "win"] },
                      { $eq: [ "$attacker_outcome", "loss"] }
            ]}, 1, 0] 
        }
      }
    })      
    .sort({"totalBattles": "desc"})
    .limit(1)
    .then(res => {
      return res
    })
  }

  getAttacker() {
    return Battle.aggregate({})
      .group({
        _id: '$attacker_king', 
        totalBattlesWon: {
          $sum: {
            $cond: [
              { $eq: [ "$attacker_outcome", "win" ] }, 1, 0
            ]
          }
        },
        totalBattlesLost: {
          $sum: {
            $cond: [
              { $eq: [ "$attacker_outcome", "loss" ] }, 1, 0
            ]
          }
        },
        totalBattles: {
          $sum: { 
            $cond: [ 
              {$or : [  { $eq: [ "$attacker_outcome", "win"] },
                        { $eq: [ "$attacker_outcome", "loss"] }
              ]}, 1, 0] 
          }
        }
      })
      .sort({"totalBattles": "desc"})
      .limit(1)
      .then(res => {
        return res
      })
  }
  getSearch(params = {}) {
    return Battle.find(params)
  }
}
