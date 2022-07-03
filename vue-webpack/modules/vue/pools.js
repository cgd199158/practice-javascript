import { checkExpressionHasData, checkFunctionHasArgs } from './shared/utils'
import { vEvent } from './shared/propTypes';


export const eventPool = new Map();
export const exprPool = new Map();

const regContent = /\{\{(.+?)\}\}/
export default function (vm, methods) {
  const { $node } = vm

  const allNodes = $node.querySelectorAll('*')
  const { vClick } = vEvent

  allNodes.forEach(node => {
    const vExpression = node.textContent;
    const matchExpression = vExpression.match(regContent)
    const vClickVal = node.getAttribute(`@${vClick}`)

    if(matchExpression){
      const poolInfo = checkExpressionHasData(vm.$data, matchExpression[1].trim())
      if (poolInfo) {
        exprPool.set(node, poolInfo)
      }
    }

    if (vClickVal) {
      const fnInfo = checkFunctionHasArgs(vClickVal)
      const handler = methods[fnInfo.methodName].bind(vm, ...fnInfo.args)
      eventPool.set(node, {
        type: vClick,
        handler
      })
      node.removeAttribute(`@${vClick}`)
    }
  });
}


// // expPool
// [
//   {
//     h1: {
//       key: count,
//       expression: key + 1,
//     }
//   }
// ]

// //eventPool
// [
//   {
//     button: {
//       type: 'click',
//       handler: METHODS.plus.bind(vm, ...args)
//     }
//   }
// ]