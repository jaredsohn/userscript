// ==UserScript==
// @name           Ignore user
// @namespace      ebon-hawn.net
// @description    Hides comments in the shoutbox.
// @include        http://www.ebon-hawk.net/
// ==/UserScript==


var messages = document.getElementsByClassName('chat-entry');

function CheckComments(){
for ( var i=0, len=messages.length; i<len; ++i ){
var usermatch = messages[i].innerHTML.search(/xxxxxx/i);
if (usermatch > 0) {
messages[i].style.display="none";
}
}  
}
CheckComments
setInterval (CheckComments, 10000);
