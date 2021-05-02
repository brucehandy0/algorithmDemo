import {
    ATTR,
    TEXT,
    REPLACE,
    REMOVE
} from './type.js'

let patches = {}
let outIndex = 0;
function domDiff(oldVDom, newVDom) {
    let index = 0;
    vNodeWalk(oldVDom,newVDom,index)
    return patches;
}
function vNodeWalk(oldNode,newNode,index){
    let vnPatch=[];

    console.log(newNode)
    if(!newNode){
        vnPatch.push({
            type:REMOVE,
            index
        })
    }else if (typeof oldNode ==='string' && typeof newNode === 'string'){
        if(oldNode!==newNode){
            vnPatch.push({
                type:TEXT,
                text:newNode
            })
        }
    }else if(oldNode.type=== newNode.type){
        const attrPatch = attrsWalk(oldNode.props,newNode.props);
        // console.log(attrPatch)
        if(Object.keys(attrPatch).length>0){
            vnPatch.push({
                type:ATTR,
                attrs:attrPatch
            })
        }
        // console.log();
        childrenWalk(oldNode.children,newNode.children)

    }else{
        vnPatch.push({
            type:REPLACE,
            newNode
        });
    }

    if(vnPatch.length>0){
        patches[index] = vnPatch
    }
  
}

function attrsWalk(oldAttrs,newAttrs){
    let attrPath = {}
    //变化
    for(let key in oldAttrs){
        if(oldAttrs[key]!== newAttrs[key]){
            attrPath[key]= newAttrs[key];
        }
    }
    //新增
    for(let key in newAttrs){
        if(!oldAttrs.hasOwnProperty(key)){
            attrPath[key]= newAttrs[key];
        }
    }

    return attrPath
}
function childrenWalk(oldChildren,newChildren){
    oldChildren.map((c,i)=>{
        try {
            vNodeWalk(c,newChildren[i],++outIndex)
        } catch (error) {
            vNodeWalk(c,[],++outIndex)
        }
    })
}
export default domDiff;