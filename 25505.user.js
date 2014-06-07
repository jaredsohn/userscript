// ==UserScript==
// @name           AddSend
// @namespace      realillusions
// @description    Adds the Send button back to dAmn
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==


//Simply unhiding and restyling the send button!
function showSend(){
show=document.createElement('style')
show.innerHTML=".damncrc-iconbar-ctrls input{display:inline!important;border:1px solid;background:transparent;cursor:pointer;position:relative;top:-3px;}"
document.getElementsByTagName('head')[0].appendChild(show);
}

showSend();