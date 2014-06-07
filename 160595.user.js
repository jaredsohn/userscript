// ==UserScript==
// @name       Write a note!
// @version    0.2
// @description  You can edit a note on all websites!
// @match      http*
// @copyright  2014+, ich01
// @namespace https://greasyfork.org/scripts/92
// ==/UserScript==

if (navigator.language.indexOf("de")>-1) {
var text1 = "Nach dem Neuladen geloescht!";
var text2 = "Neue Notiz"; 
var text3 = "Gib deine Notiz ein(Wird nach dem Neuladen angezeigt):";
} else {
var text1 = "Deleted after reload!";
var text2 = "New Note";
var text3 = "Enter your note (Appears after reload):";    
}
var _url = document.location.toString();
var _notes = "";
if (_url.indexOf("?")) {
_url = _url.slice(0,_url.indexOf("?"));
}
if (localStorage.getItem(_url + "__notf")!="null" && localStorage.getItem(_url + "__notf")!="undefined" && localStorage.getItem(_url + "__notf")!="" && localStorage.getItem(_url + "__notf")!=undefined) {
_notes = localStorage.getItem(_url + "__notf"); 
document.body.appendChild(document.createElement("wnote"));
var notef = document.getElementsByTagName("wnote")[0];
notef.setAttribute("urlnotef",_url);
notef.style.textAlign="left";
notef.style.lineHeight="14px";
notef.style.color="black";
notef.style.position="fixed";
notef.style.zIndex="9999999999999";
notef.style.fontSize="14px";
notef.style.top="0px";
notef.style.left="0px";
notef.style.background="yellow";
notef.style.border="2px solid black";
notef.style.display="block";
notef.style.padding="5px";
notef.style.maxHeight="30px";
notef.style.maxWidth="175px";
notef.style.textOverflow="ellipsis";
notef.style.cursor="pointer";
notef.style.borderBottomRightRadius="3px";  
notef.innerHTML="<span onclick=\"localStorage.setItem((document.getElementsByTagName('wnote')[0].getAttribute('urlnotef'))+'__notf','undefined');\" onmousedown=\"alert('"+text1+"');\">X</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span onclick=\"localStorage.setItem((document.getElementsByTagName('wnote')[0].getAttribute('urlnotef'))+'__notf',prompt('"+text3+"',''));\">E</span>&nbsp;&nbsp;|&nbsp;&nbsp<span onclick=\"alert('"+_notes+"');\" oncontextmenu=\"this.parentNode.style.display='none';\">"+_notes.slice(0,20)+"</span>";
} else {
document.body.appendChild(document.createElement("wnote"));
var notef = document.getElementsByTagName("wnote")[0];
notef.setAttribute("urlnotef",_url);
notef.style.textAlign="left";
notef.style.lineHeight="14px";
notef.style.color="black";
notef.style.position="fixed";
notef.style.zIndex="9999999999999";
notef.style.fontSize="14px";
notef.style.top="0px";
notef.style.left="0px";
notef.style.background="yellow";
notef.style.border="2px solid black";
notef.style.display="block";
notef.style.padding="5px";
notef.style.maxHeight="30px";
notef.style.maxWidth="175px";
notef.style.textOverflow="ellipsis";
notef.style.cursor="pointer";
notef.style.borderBottomRightRadius="3px";  
notef.innerHTML="<span onclick=\"localStorage.setItem((document.getElementsByTagName('wnote')[0].getAttribute('urlnotef'))+'__notf',prompt('"+text3+"','"+_notes+"'));\" oncontextmenu=\"this.parentNode.style.display='none';\">"+text2+"</span>";  
}