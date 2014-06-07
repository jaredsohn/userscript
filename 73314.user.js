// ==UserScript==
// @name            CPA-Delete
// @namespace       http://tegasinho.blogspot.com
// @description     Bypasses CPALead and others CPA providers popup which blocks users from viewing content unless they fill out a survey.
// @include         http://watchitsalwayssunny.com/*
// @include         http://www.watchitsalwayssunny.com/*
// @include         http://officeepisodesonline.com/*
// @include         http://www.officeepisodesonline.com/*
// @include         http://www.officeepisodesonline.com/*
// @include         http://www.rslinkgens.info/*
// ==/UserScript==


// Start code of CPALead Bypass by Nick Colgan 

var cpalead = document.getElementById('cpalead');
if (cpalead) {
  cpalead.parentNode.removeChild(cpalead);
}

// thanks to chink255@hotmail.com
var overlay = document.getElementById('overlay');
if (overlay) {
  overlay.parentNode.removeChild(overlay);
}

unsafeWindow.dontscroll = function() {};

// End code of CPALead Bypass by Nick Colgan 


// Start code of CPA-Delete

alert("CPA-Delete - Version 0.01");
alert("This version is the first release ,you need to download last release from cpa-delete.blogspot.com");
alert("In the second release this messages will not appear...");




void(window.dontscroll%20=%20function()%20{return%20null;})

var%20objText%20=%20document.ge
ElementById('cpalead');%20objText.style.display
%20=%20'none';%20var%20objOverlay%20=%
20document.getElementById('overlay');%20obj
Overlay.style.display%20=%20'none';
%20embed_tags(1);%20object_tags(1);%20nomo
reajax%20=%201;%20alert("
Premium%20Content%20Unlocked!");

