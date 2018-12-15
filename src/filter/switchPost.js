import axios from 'axios'
let qs = require('qs');

export function qsData(param) {
  return qs.stringify(param)
}

