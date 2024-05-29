import { dva } from './dev.js'
import { base, kkk } from './test/base.js'
import dayjs from 'dayjs'
dva()
console.log('time', dayjs().format('YYYY-MM-DD HH:mm:ss'));
console.log('base', base);
console.log('kkk', kkk);