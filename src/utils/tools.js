export function redux(arr, resouce) {
  if (!arr instanceof Array) throw `the first argument must be an array`

  return arr.reduce((result, current) => result ? result[current] : null, resouce)
}