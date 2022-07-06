const tauk = require('../tauk/tauk_webdriver')
// import {tauk} from './tauk/tauk_webdriver'

let t = tauk.Tauk.getInstance()
t.val = 'new test'
console.log(t.val)
let t2 = tauk.Tauk.getInstance()
console.log(t2)
