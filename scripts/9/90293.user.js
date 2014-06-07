// ==UserScript==
// @name           4chanImageGrid
// @namespace      MediocreGopher
// @include        http://*.4chan.org/*/res/*
// ==/UserScript==

var bod = document.getElementsByTagName('body');

if (document.location.toString().match(/#grid$/)) {
	var images = document.getElementsByTagName('img');
	var src = '';
	for (var i = 0; i < images.length; i++) {
		if (images[i].src.match(/\/thumb\//)) {
			src += '<img src="'+images[i].parentNode.href+'" style="float:left;border:5px solid black;padding:1px;margin:1px;"/>';
		}
	}
	bod[0].innerHTML = src;
}

else {
	var newDiv = document.createElement('div');
	newDiv.setAttribute('id','NEW_DIV_IMAGE_GRID');

	function openTab() {
		GM_openInTab(document.location+"#grid");
	}

	newDiv.innerHTML = '<br><a href="javascript:void(0)">Open Image Grid</a>';
	bod[0].appendChild(newDiv);

	document.getElementById('NEW_DIV_IMAGE_GRID').addEventListener("click",openTab,true);
}
