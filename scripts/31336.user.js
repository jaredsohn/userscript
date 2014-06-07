// ==UserScript==
// @name           FXWARS
// @namespace      fxwars
// @description    Tweaking cgtalk's FXwars thread for Highlighting admin Roberto Ortiz and other minor tweaks like removing add banners
// @include        http://forums.cgsociety.org/*
// ==/UserScript==



function getElementsByClass(node,searchClass,tag) {
  var classElements = new Array();
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("\b"+searchClass+"\b");
  for (i = 0, j = 0; i < elsLen; i++) {
    if ( pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}


function getTagsWithText(node, tag, text)
{
  var ret= new Array();
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  for (i = 0, j = 0; i < elsLen; i++) 
    if ( els[i].innerHTML.toLowerCase().indexOf(text.toLowerCase())> 0) {
      ret[j] = els[i];
      j++;
    }
  return ret;
}
function changeStyleByTag(tag, style, value)
{
	var as= document.getElementsByTagName(tag);
	for (i=0; i< as.length; i++) {
		eval("as[i].style."+style+"=\""+value+"\";");
	}
}

changeStyleByTag("iframe", "display", "none");
changeStyleByTag("a", "textDecoration", "none");
changeStyleByTag("a", "color", "#AACCFF");

var size= "8pt";
changeStyleByTag("td", "fontSize", size);
changeStyleByTag("p", "fontSize", size);
changeStyleByTag("li", "fontSize", size);
changeStyleByTag("span", "fontSize", size);
changeStyleByTag("div", "fontSize",  size);

var RO= getTagsWithText(document, "*", "RobertoOrtiz");
for (i=0; i< RO.length; i++){
	RO[i].style.backgroundColor="#555555";
}
