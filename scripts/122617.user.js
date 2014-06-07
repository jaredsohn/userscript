// ==UserScript==
// @name           Gear Echo Bazaar
// @namespace      http://userscripts.org
// @description    Allows for easy creation of bookmarklets containing a gear combination.
// @include        http://echobazaar.failbettergames.com/*
// ==/UserScript==


var create = document.createElement("div");

create.innerHTML = '<script>function run() {items = document.getElementsByClassName("you_mid_mid")[0].getElementsByClassName("tooltip ");stuff="";'+

'for (i=0;i<items.length;i++){stuff += items[i].onclick}'+


'stuff = stuff.toString();'+
'stuff = stuff.replace(/.*\{/g,"");'+
'stuff = stuff.replace(/    un/g,"");'+
'stuff = stuff.replace(/}/g,"");'+
'stuff = stuff.replace(/[^adoptThing(, false)0123456789;]/g,"");'+

'stuff = "javascript:" + stuff;'+
'confirm(stuff);}'+
'</script>'+

'<button type="button" onclick="run();" class="tweet_btn">Outfit</button>';
document.body.insertBefore(create, document.body.firstChild);
