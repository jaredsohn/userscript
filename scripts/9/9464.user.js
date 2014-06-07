// ==UserScript==
// @name           Remove "Block Poster" buttons
// @namespace      http://www.outeverywhere.com
// @description    Removes the "Block Poster" option from Out's forums
// @include        http://www.outeverywhere.com/opinions/*
// @include        http://www.journalhound.com/opinions/*
// ==/UserScript==

document.getElementsByClassName = function(clsName){
  var retVal = new Array();
  var elements = document.getElementsByTagName("*");
  for (var i = 0; i < elements.length; ++i){
    if (elements[i].className.indexOf(" ") >= 0){
      var classes = elements[i].className.split(" ");
      for (var j = 0; j < classes.length; ++j){
      if (classes[j] == clsName)
         retVal.push(elements[i]);
      }
    } else if(elements[i].className == clsName)
             retVal.push(elements[i]);
  }
  return retVal;
}



  var buttonBlocks = document.getElementsByClassName("postbot");
  
  for (var ii = 0; ii < buttonBlocks.length; ++ii) {
  
    var links = buttonBlocks[ii].getElementsByTagName("a");
    
    for (var jj = 0; jj < links.length; ++jj) {
    
      if (links[jj].innerHTML.toLowerCase() == "block poster") {
        links[jj].parentNode.removeChild(links[jj]);
      }
    
    }
    
  }