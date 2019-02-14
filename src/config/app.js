const root = 'platform/api/'/*王鹏*/
// const root = '/api/'
// http://172.16.97.115 /*测试*/
// http://172.16.98.57:8080/api/ /*王鹏*/
// http://172.16.98.36 /*金晗汝*/
// http://172.16.98.43 /*杨宏伟*/
// http://172.16.97.131 /*线上地址*/

export const IS_MOCK = false
export const API_BASE_URL = IS_MOCK ? '/mock/' : (process.env.NODE_ENV === 'development' ? ' http://172.16.97.131:8080' + root : '/platform/api/')
// export const API_BASE_URL = IS_MOCK ? '/mock/' : (process.env.NODE_ENV === 'development' ? 'http://www.xhuachina.com/platform' + root : '/platform/api/')
export const TOKEN_KEY = 'X-Token'
export const HISTORY_KEY = 'History-Key'
