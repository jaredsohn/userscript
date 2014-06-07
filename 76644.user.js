// ==UserScript==
// @name           Filestube --> rapidwarex
// @include        http://www.filestube.com/*/*.html
// @namespace      http://userscripts.org/scripts/show/76644
// @description    Puts a (submit) button on FilesTube to RapidwareX Rapidshare DivX Player 
// @version        20110307
// ==/UserScript==


links=document.getElementById('copy_paste_links').innerHTML;
document.getElementById('d_clip_button').innerHTML=document.getElementById('d_clip_button').innerHTML+
'<form target=_blank action="http://localhost:8080/PlayerBridge" method=get><textarea style="display:none;" name=list>'+links+'</textarea>'+
'<input type=hidden name=type value=AUT>'+
'<input type=submit value=RapidwareX></form>';