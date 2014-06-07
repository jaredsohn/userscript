// ==UserScript==
// @name           Corrosive, stfu please. 
// @namespace      harddrop.com
// @description    Hides Corrosive's comments in the shoutbox.
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
setInterval (CheckComments, 10000);