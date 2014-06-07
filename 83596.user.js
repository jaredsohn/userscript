// ==UserScript==
// @name           Block Meebo toolbar
// @namespace      MeeboRemoveToolbar
// @include        *
// ==/UserScript==

removeContent('meebo');

function removeContent(id) {

  var node = document.getElementById(id);

  if (node) {
	  node.parentNode.removeChild(node);
	  node = null;
  }
}

function removeClass(cls) {
  
  var cool = document.getElementsByClassName(cls);
 
  if (cool.length > 0) {
    for(var d = 0; d < cool.length; d++) {
      cool[d].parentNode.removeChild(cool[d]);
      cool[d] = null;
    }
  }
}

document.getElementsByClassName = function(clsName){
    var retVal = new Array();
    var elements = document.getElementsByTagName("*");
    for(var i = 0;i < elements.length;i++){
        if(elements[i].className.indexOf(" ") >= 0){
            var classes = elements[i].className.split(" ");
            for(var j = 0;j < classes.length;j++){
                if(classes[j] == clsName)
                    retVal.push(elements[i]);
            }
        }
        else if(elements[i].className == clsName)
            retVal.push(elements[i]);
    }
    return retVal;
}