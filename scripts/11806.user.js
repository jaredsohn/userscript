// ==UserScript==
// @name          OiNK request check - Revised
// @description   Adds a "check for requests" link to search results - Revised version of http://userscripts.org/scripts/show/9150 to work with the new domain name and fit in better with the layout
// @include       http://oink.cd/browse.php?search=*
// @include       http://85.17.40.71/browse.php?search=*
// ==/UserScript==

function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
/* Copyright Robert Nyman, http://www.robertnyman.com Free to use if this text is included */
 var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
 var arrReturnElements = new Array();
 var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\s)" + strAttributeValue + "(\s|$)") : null;
 var oCurrent;
 var oAttribute;
 for(var i=0; i<arrElements.length; i++){
  oCurrent = arrElements[i];
  oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
  if(typeof oAttribute == "string" && oAttribute.length > 0){
   if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
 arrReturnElements.push(oCurrent);
   }
  }
 }
 return arrReturnElements;
}

var found=true;
linkhtml = " <a href=\"http://oink.cd/viewrequests.php?search=" + getElementsByAttribute(document,"input","name","search")[3].value + "&x=53&y=13\">Check for requests</a>.";
h2s = document.getElementsByTagName("h2");
for(i=0;i<h2s.length;i++) {
 if(h2s[i].innerHTML=="Nothing found!") {
  //GM_log("Nothing found!");
  found=false;
  h2s[i].innerHTML += linkhtml;
 }
}

if(found)
for(i=0;i<h2s.length;i++) {
 if(h2s[i].innerHTML.substr(0,20)=="Search results for \"") {
  h2s[i].innerHTML += "." + linkhtml;
 }
}

//if(found) GM_log("Something found!");

/*
x=getElementsByAttribute(document,"input","name","search");
for(i=0;i<x.length;i++) GM_log(x[i].value);
*/