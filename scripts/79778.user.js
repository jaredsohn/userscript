// ==UserScript==
// @name           Better4ChanImageTabber
// @namespace      MediocreGopher
// @description    Opens each image in a topic in a new tab
// @include        http://*.4chan.org/*/res/*
// ==/UserScript==



var newDiv = document.createElement('div');
newDiv.setAttribute('id','NEW_DIV');
var images = document.getElementsByTagName('img');

function openTabs() {
	for (var i = 0; i < images.length; i++) {
		if (images[i].src.match(/\/thumb\//)) {
			GM_openInTab(images[i].parentNode.href);
		}
	}
}

newDiv.innerHTML = '<br><a href="javascript:void(0)">Open All Images</a>';
var bod = document.getElementsByTagName('body');
bod[0].appendChild(newDiv);


document.getElementById('NEW_DIV').addEventListener("click",openTabs,true);
