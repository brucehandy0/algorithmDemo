import {createElement,render} from './virtualDom'
import domDiff from './domDiff'
import doPatch from './doPatch'
const vDom = createElement(
    'ul',{class:'list',style:'width:300px;background-color:orange'},
    [
        createElement('li',{class:'item','data-index':0},[createElement('p',{class:'text'},['第一个列表项'])]),
        createElement('li',{class:'item','data-index':1},[createElement('p',{class:'text'},[createElement('span',{class:'title'},['第二个列表项'])])]),
        createElement('li',{class:'item','data-index':2},['第三个列表项'])
    ]
);

const vDom2 = createElement(
    'ul',{class:'list-wrap',style:'width:300px;background-color:orange'},
    [
        createElement('li',{class:'item','data-index':0},[createElement('p',{class:'little'},['特殊'])]),
        createElement('li',{class:'item','data-index':1},[createElement('p',{class:'text'})]),
        createElement('div',{class:'item','data-index':2},['第三个列表项'])
    ]
);

let dom = render(vDom);


let patches = domDiff(vDom,vDom2);
// console.log(patches)

doPatch(dom,patches)

document.getElementById('app').appendChild(dom)



/**
 * patch的数据结构
 */
// const patches = {
//     0:[
//         {
//             type:"ATTR",
//             attrs:{
//                 class:'list-wrap'
//             }
//         }
//     ],
//     3:[
//         {
//             type:"TEXT",
//             text:"列表值"
//         }
//     ],
//     6:[
//         {
//             type:"REMOVE",
//             index:6
//         }
//     ],
//     7:[
//         {
//             type:"REPLACE",
//             newNode:newNode
//         }
//     ]
// }