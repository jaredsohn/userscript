// ==UserScript==
// @name           Shoutbox NaszaMandriva.pl
// @namespace      http://userscripts.org/users/105735
// @description    Limit znakow w shoutboxie
// @include        http://naszamandriva.pl/*
// @exclude        http://naszamandriva.pl/administration/*
// ==/UserScript==

function check(){
it = document.getElementsByName('shout_message')[0];
if(it.value.length > 200) {
it.style.backgroundColor='#FFDDDD'; 
button.disabled = 'disabled';
}
else {
it.style.backgroundColor='';  
button.removeAttribute("disabled");
}
}    
var that = document.getElementsByName('shout_message')[0];
var button = document.getElementsByName('post_shout')[0];

that.addEventListener("keyup", check, true)