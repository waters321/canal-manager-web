import axios from 'axios'
import qs from 'qs'
import 'es6-promise'
import {Message} from 'element-ui'

export function getHttp(url,params) {
   return new Promise((resolve,reject) => {
     axios.get(url,{
       params:params
     }).then(response =>{
       resolve(response.data)
     }).catch(err => {
       reject(err)
     })
   })
}

export function postHttp(url,data) {
  return new Promise((resolve,reject) => {
    axios.post(url,qs.stringify(data)).then(response =>{
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
