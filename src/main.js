import '@/styles/index.scss'

import Token from '@/utils'

const token = new Token()

token.setToken('123')

const arr = [1, 2, 3, 45, 6]

console.log(...arr)
