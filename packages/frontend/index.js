import isUrl from 'is-url'

let obj1 ={
  name: 1
}
let obj2 = {
  name: 2
}

export let obj = {
  ...obj1,
  ...obj2
}
export default function (n) {
  return `result ${isUrl(n)}`
}
