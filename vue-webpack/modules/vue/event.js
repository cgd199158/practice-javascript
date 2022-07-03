import { eventPool } from "./pools";


export default function (vm) {
  console.log('eventPool', eventPool)
  for (const [node, info] of eventPool) {
    let { type, handler } = info
    vm[handler.name] = handler
    node.addEventListener(type, vm[handler.name], false);
  }
}