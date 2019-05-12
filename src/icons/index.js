const requireAll = require.context('./svg', false, /\.svg$/)

const iconsMap = requireAll.keys().map(icon => {
  return requireAll(icon)
})

// console.dir(iconsMap)
