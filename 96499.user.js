// ==UserScript==
// @name           Facebook My Face When
// @namespace      about:blank
// @description    Changes one's display picture to his/hers face when
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

//Checks all comment containers of the argument, and replaces images accordingly
function changeDisplayPicForThread(container){
	var comments = container.getElementsByClassName('uiUfiComment');
	for(var i = 0 ; i < comments.length ; i++){
		changeDisplayPicForComment(comments[i]);
	}
}

function changeDisplayPicForComment(container)
{
	var matches = container.getElementsByTagName('span')[0].innerHTML.match(/(mfw.?\d+)|(myfacewhen.com(\/i)?\/\d+)/i);
	if(matches){
		var dp = container.getElementsByTagName('img')[0];
		dp.setAttribute('width', 50);
		dp.setAttribute('height', 50);
		dp.setAttribute('src', 'http://myfacewhen.com/images/'+matches[0].match(/\d+/)[0]+'.jpg');
	}
}

//thread headers
var threadHeaders = document.getElementsByClassName('storyContent');
for(var i = 0 ; i < threadHeaders.length ; i++){
	changeDisplayPicForComment(threadHeaders[i]);
}

//thread contents
var threads = document.getElementsByClassName('uiUfiComments');
for(var i = 0 ; i < threads.length; i++){//add event to the comment container, on addition (and on init) scan for regex, replace image with result as required.
	changeDisplayPicForThread(threads[i]);
	threads[i].addEventListener("DOMNodeInserted", function(e){
		changeDisplayPicForComment(e.target)
	},false);
}