// ==UserScript==
// @name           Ignore polls
// @namespace      http://www.outeverywhere.com
// @description    Removes polls from the forum listings
// @include        http://www.outeverywhere.com/opinions/*
// ==/UserScript==

//
//  Add getElementsByClassName method to the document object
//
//  tagName paremter is option.  If null or omitted, all tags
//  are returned
//
document.getElementsByClassName = function(clsName, tagName) {
  var retVal = new Array();
  var elements = document.getElementsByTagName(tagName ? tagName : "*");
  for (var i = 0; i < elements.length; ++i){
    if (elements[i].className.indexOf(" ") >= 0) {
      var classes = elements[i].className.split(" ");
      for (var j = 0; j < classes.length; ++j) {
      if (classes[j] == clsName)
         retVal.push(elements[i]);
      }
    } else if(elements[i].className == clsName) {
      retVal.push(elements[i]);
    }
  }
  return retVal;
}

var rows = document.getElementsByClassName("new", "tr");
  
for (var ii = 0; ii< rows.length; ++ii) {
  var anchors = rows[ii].getElementsByTagName("a");
  
  if (anchors.length > 0 && anchors[0].innerHTML.indexOf("Poll:") == 0) {
    rows[ii].parentNode.removeChild(rows[ii]);
  }
}