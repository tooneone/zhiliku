import axios from '@/libs/api.request'
export const home = {
  getHomeInfo: (params) => {
    return axios.request({
      url: 'order/list',
      data: params,
      method: 'post'
    })
  }
}
