// ==UserScript==
// @name           abovetopsecret.com forum enhancer
// @namespace      tukkek
// @description    Cleans out the page. Use left and right arrows to scroll to posts.
// @include        http://www.abovetopsecret.com/forum/thread*
// ==/UserScript==
GM_addStyle("br[clear='all'] + div,blockquote,.info2,#copyright { display:none; }\
  #guestpost {width:100%}");
document.body.innerHTML= document.getElementById('guestthread').innerHTML;

var navigated = new Array();
var fill=0;
var outerChildren = document.body.childNodes;
function checkId(element,id){
  return element.id&&element.id==id;
}
outer: for (node in outerChildren){
  var outerElement=outerChildren[node];
  if (outerElement instanceof HTMLElement&&checkId(outerElement,"guestpost")){
    var innerParent = outerElement.childNodes;
    for (inn in innerParent) {
      var innerElement = innerParent[inn];
      if (checkId(innerElement,"content")) {
	navigated[fill++]=innerElement;
	continue outer;
      }
    }
    navigated[fill++]=innerParent[0]; 
  }
}

function nextPage(){
  var pages = document.getElementById('gmultipage').childNodes;
  var found=false;
  for (p in pages){
    var page = pages[p];
    if (!found && page.tagName=="SPAN"){
      found = true;
    } else if (found&&page&&page.href){
      if (location.href!=page.href){
	location.href=page.href;
      }
      return;
    }
  }
}
navigated.push(nextPage);

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
var lastOffset=0;
registerNavigator(navigated,function(callbackelement){
  if (callbackelement==nextPage){
    nextPage();
    return;
  }
  
  var scrolled = window.pageYOffset;
  callbackelement.scrollIntoView();
  if (scrolled != window.pageYOffset){
    lastOffset=0;
  } else if (lastOffset==0){
    lastOffset = callbackelement.offsetTop;
  } else if (lastOffset>callbackelement.offsetTop){
    lastOffset=0;
  } else {
    nextPage();
  }
});