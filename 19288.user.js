// Download Axialis stuff - circumvents their Internet Explorer only
// download function by redefining it.
// Created on 2008-01-06 by Otto de Voogd (7is7.com)
// This script is released under the "do whatever the f*ck you want
// with this code as long as you don't come running to me and don't
// claim it as your own" license.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Download Axialis Stuff
// @namespace     http://www.7is7.com/
// @description   redefine the download function to work for all browsers
// @include       http://axialis.com/objects/*
// @include       http://*.axialis.com/objects/*
// ==/UserScript==

function download_it(id){
key=prompt('Enter Key:','');
top.location.replace("http://www.axialis.com/cgi-bin/getstuff?action=download&id="+id+"&key="+key);
}

function embedFunction(s) {
document.body.appendChild(document.createElement('script'))
.innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

embedFunction(download_it);