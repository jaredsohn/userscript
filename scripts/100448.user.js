// ==UserScript==
// @name           epr0nAdDisabl0r
// @namespace      http://userscripts.org/scripts/show/100448
// @author         Anonymous1337, KingSword
// @include        http://www.eporner.com/hd-porn/*
// ==/UserScript==

//Copy pasted from http://wiki.greasespot.net/Content_Scope_Runner
//So we can access the "so" object which contains the URL to the config, in which again the plain URL to the MP4 is.
if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

function removeNodeById(id) {
	var n=document.getElementById(id);
	if(n)removeNode(document.getElementById(id));
}

function removeNodesByTagName(name) {
	var elements = document.getElementsByTagName(name);

	for(var i = 0; i < elements.length; i++) {
		removeNode(elements[i]);
	}
}

function removeNode(node) {
	node.parentNode.removeChild(node);
}

function getCurrentId() {
	var location = '' + self.location;
	var locationSplitted = location.split('/');
	var id = locationSplitted[4];
	return id;
}

function getConfigUrl(){
	return (''+so.attributes.swf).replace('/player','/config');
}

function getDownloadLinkByVideoId(id) {
	var xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.open("GET",getConfigUrl(), false);
	xmlHttpRequest.send();
	xmlDocument = xmlHttpRequest.responseXML; 
	var link = xmlDocument.getElementsByTagName('file')[0].childNodes[0].nodeValue;
	return link;
}

function findDownloadLink(){
	if(typeof so != 'undefined'){
		clearInterval(soint);
		var dlbutton  =document.getElementById('mfdown').childNodes[0];
		dlbutton.href = getDownloadLinkByVideoId(getConfigUrl());
		dlbutton.onclick=null;
	}
}

document.addEventListener('load', function() {
	removeNodeById('subcontent2_mediaspace');
	removeNodeById('subcontent_mediaspace');
	removeNodeById('movieplayer-right');
	removeNodesByTagName('iframe');
	if(!soint)soint=setInterval(findDownloadLink,1000);
}, true);

var soint;
