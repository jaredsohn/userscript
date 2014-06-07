// ==UserScript==
// @name           Gmail
// @namespace      GmailCrapRemover
// @description    Remove message "Your filters are forwarding some of your emails"
// @include        https://mail.google.com/mail/*
// ==/UserScript==

var EkiEntered = false;	//a flag so that it is run only once
function EkiScript()	//function workaround for IE6/7
{	if (EkiEntered)	return;
	EkiEntered = true;
}
if (window.frameElement && (window.frameElement.id == 'canvas_frame'))  //run only in specific iframe
{
    document.getElementsByTagName("body")[0].addEventListener ("DOMNodeInserted", function () {
                  document.getElementsByClassName('fVKDI')[0].style.display = "none";
              }, false);
}

//Bookmarklet code
javascript:(function(){
    document.getElementById("canvas_frame").contentDocument.getElementsByClassName('fVKDI')[0].style.display = "none";
})()