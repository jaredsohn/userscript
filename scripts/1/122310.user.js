// ==UserScript==
// @name          remove nk
// @namespace     http://htmlblog.net
// @description   basic Greasemonkey script
// @include       http://nk.pl/#show_invites
// ==/UserScript==


window.setTimeout(function(){
try{
window.frames[0].document.getElementsByClassName("invites_from_me")[0].getElementsByTagName('form')[3].submit()
}catch(er){
	window.setTimeout(window.location.reload,10000);
}
},4000)