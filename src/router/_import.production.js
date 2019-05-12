// 按需加载
module.exports = file => resolve => import('@/views/' + file + '.vue').then(resolve)