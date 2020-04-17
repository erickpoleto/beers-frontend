import data from '../data/db.json';

import * as _ from "lodash";

//functions

export const getCategories = () => {
  return _.map(_.groupBy(data, "category"), (o, idx) => {
    if(o[0].category === undefined){
      o[0].category = '';
    }
    return {
      category: o[0].category,
    }
  });
};