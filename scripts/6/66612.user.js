// ==UserScript==
// @name           Fullshare.net Ad closer
// @namespace      fullshare.net
// @description    Removes forced popups and closes the annoying ad before you can watch a stream
// @include        http://fullshare.net/show/*
// ==/UserScript==

if(document.getElementById('wait')) {
    location.href = "javascript:(" + function() {
        document.getElementById('submit').onclick = "";
    } + ")()";
}
if(document.getElementById('page')) document.getElementById('page').style.visibility='visible';
if(document.getElementById('apDiv1')) document.getElementById('apDiv1').style.visibility='hidden';
if(document.getElementById('closer')) document.getElementById('closer').style.visibility='hidden';
if(document.getElementById('myplayer')) document.getElementById('myplayer').style.visibility='visible';
if(document.getElementById('myform')) document.getElementById('myform').submit();