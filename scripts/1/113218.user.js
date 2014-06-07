// ==UserScript==
// @name           Idiots, stfu please. 
// @namespace      harddrop.com
// @description    Hides stupid comments in the shoutbox.
// @include        http://harddrop.com/
// ==/UserScript==


var TheShoutBox= document.getElementsByName('Shoutbox');

function CheckComments(){
var shoutboxinside = TheShoutBox[0].contentDocument;
var messagecontainer = shoutboxinside.getElementById("ShoutCloud-MsgBox");
var messages = messagecontainer.childNodes;
for ( var i=0, len=messages.length; i<len; ++i ){
var usermatch = messages[i].innerHTML.search(/Corrosive/i);
if (usermatch > 0) {
messages[i].style.display="none";
}
}  
}
CheckComments
setInterval (CheckComments, 10000);

function CheckComments2(){
var shoutboxinside = TheShoutBox[0].contentDocument;
var messagecontainer = shoutboxinside.getElementById("ShoutCloud-MsgBox");
var messages = messagecontainer.childNodes;
for ( var i=0, len=messages.length; i<len; ++i ){
var usermatch = messages[i].innerHTML.search(/MzSlowmo/i);
if (usermatch > 0) {
messages[i].style.display="none";
}
}  
}
CheckComments2
setInterval (CheckComments2, 10000);