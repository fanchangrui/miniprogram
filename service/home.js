import request from './network.js'
export function getMultData() {
    return request({
      url: '/home/multidata'
    })
  }