// ==UserScript==
// @name           Fixed menu
// @namespace      http://www.outeverywhere.com
// @include        http://www.outeverywhere.com/*
// @include        http://www.journalhound.com/*
// @include        http://tools.outeverywhere.com/*
// @include        http://tools.journalhound.com/*
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



var content1 = document.getElementById("content");
var menu = document.getElementById("menu");



if (content1 && menu) {

  var fixedHeight = document.getElementById("nav").parentNode.offsetHeight;
  var scrollPosition = window.pageYOffset - fixedHeight;

  var container = document.createElement("div");
  container.id = "container";
  content1.parentNode.insertBefore(container, content1);
  container.appendChild(menu);
  container.appendChild(content1);
  
  //
  // Remove allheaders if it's empty - it creates a problem when using the 
  // classic stylesheet otherwise
  //
  var allheaders = document.getElementsByClassName("allheaders", "div");
  if (allheaders.length > 0) {
    if (!/\w/.test(allheaders[0].innerHTML)) {
      allheaders[0].parentNode.removeChild(allheaders[0]);
    }
  }
  
  var fixedStyles = "html, body { " +
                      "max-height:100%; " + 
                      "overflow:hidden; " +
                      "padding:0; " +
                      "margin:0; " +
                      "border:0; " +
                    "}" +
                    
                    "#container { " +
                      "display:block; " +
                      "overflow:auto; " +
                      "position:absolute; " +
                      "top:" + fixedHeight + "px; " +
                      "bottom:0; " +
                      "left:0%; " +
                      "width:100%; " +
                      "border:0" +
                    "} " + 
                    "#container:active{outline: none;}" +
                    "#container:focus{-moz-outline-style: none;}" +
                    "a:active{outline: none;}" +
                    "a:focus{-moz-outline-style: none;}" +
                    ".fixed {position:static !important}";
  GM_addStyle(fixedStyles);   
  var anchors = content1.getElementsByTagName("a");
  if (anchors.length) {
    anchors[0].focus();
  } else {
    container.focus();
  }
  if (scrollPosition > 0) {
    container.scrollTop = scrollPosition;
  }

}