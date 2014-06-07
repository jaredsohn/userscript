// Copyright (c) 2007, Vitorio Damas
// ==UserScript==
// @name Gmail - Zip Attachments and Download
// @namespace http://www.vitoriodamas.net
// @description Direct Download Attachments
// @include https://mail.google.com/*
// ==/UserScript==

var allAttClip, thisAttClip, AttClip, newElement;
allAttClip = document.evaluate("//img[@src='images/paperclip.gif']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var k = 0; k < allAttClip.snapshotLength; k++) { thisAttClip = allAttClip.snapshotItem(k); AttClip = thisAttClip; if (AttClip) { th = getTh(AttClip.title); newElement = document.createElement('a'); newElement.href = '?disp=zip&view=att&th='+ th; newElement.target = '_blank'; AttClip.parentNode.insertBefore(newElement, AttClip); newElement.appendChild(thisAttClip);}}
function getTh(th){ var scripts = document.getElementsByTagName('script'); allScript = document.evaluate("//script",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); for (var l = 0; l < allScript.snapshotLength; l++) { esteScript = allScript.snapshotItem(l); Script = esteScript; if (Script){ if ((Script.innerHTML.indexOf('D(["t",')==5) && (Script.innerHTML.indexOf(th)!=-1)) {xpto=Script.innerHTML.substr(Script.innerHTML.indexOf(th),500); inicio=xpto.indexOf('","')+3; temp=xpto.substr(inicio,20); fim= temp.indexOf('"'); xpto=xpto.substr(inicio,fim);}}}return xpto;}