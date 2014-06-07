// ==UserScript==
// @name           imdb.com : message board enhancer
// @namespace      tukkek
// @description    Shows cleaner posts only on topic pages and navigate with left and right arrows.
// @include        http://www.imdb.com/title/tt*/board/*/*
// @exclude      http://www.imdb.com/title/tt*/board/reply/*
// ==/UserScript==
function registerNavigator(nodes,callback){
  var i=-1;
  document.addEventListener("keypress", function doKey(keypressevent){
    switch(keypressevent.keyCode){
    case 37:
      i--;
      break;
    case 39:
      i++;
      break;
    default:
      return;
    }
    if (i<0){
      i=0;
    } else if (i>=nodes.length) {
      i=nodes.length-1;
    }
    callback.call(this,nodes[i]);
  }, true);
}
function add(array,element){
  array.splice(array.length,0,element);
}
function isTable(element){
  return element.tagName == 'TABLE';
}
function isClass(element,className){
  return element.classList&&element.classList.contains(className);
}

GM_addStyle('body>table>tbody>tr>td>table:first-child{display:none;}');
document.body.innerHTML=document.getElementById('tn15').getElementsByTagName('table')[3].innerHTML;

var navigated=[];
count=0;
for (child in document.body.children){
  var c = document.body.children[child];
  var ignore=count<2;
  if (!ignore && isClass(c,'pages')){
    add(navigated,c);
    break;
  }
  if (!isTable(c)) {
    continue;
  }
  if (ignore){
    count++;
    continue;
  }
  add(navigated,c);
}
registerNavigator(navigated,function(node){
  if (isTable(node)) {
    node.scrollIntoView();
    return;
  }
  var current=false;
  for (child in node.children){
    var page=node.children[child];
    if (current){
      location.href=page.getElementsByTagName('a')[0].href;
      return;
    } else if (isClass(page,'current')) {
      current=true;
    }      
  }
});