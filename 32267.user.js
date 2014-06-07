// ==UserScript==
// @namespace
// @name          Yixia
// @description   Click to open next page, click again to close current page
// @include       http://www.yixia.net/*
// @exclude
// ==/UserScript==

// add a note
var clickNote=document.createElement('div');
clickNote.setAttribute('style', '-moz-opacity: 0.5; position:absolute; z-index:99; top:300px; left:1px; font-family:Tahoma; font-size:9px; background-color:#f00; color:#fff; margin:0; padding:0 1px 0 1px;');
clickNote.innerHTML='Next';
clickNote.id='clickNote';
document.body.appendChild(clickNote);

// open next page or close current page
var doOnEvent = 'if(document.getElementById("clickNote").innerHTML=="Close"){ window.close(); }else{ document.getElementById("clickNote").innerHTML="Close"; window.open("' + (document.getElementById('hl_next')? document.getElementById('hl_next').href : document.getElementById('oHTML').getElementsByTagName('a')[1].href) + '"); }'
document.body.setAttribute('onclick', doOnEvent);
document.body.setAttribute('onkeyup', 'if(event.which==27 || event.which==32){'+doOnEvent+'}'); 