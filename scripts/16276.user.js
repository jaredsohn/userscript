// ==UserScript==
// @name          Google Reader - Hide Button
// @description	  Adds buttons to hide posts or set "text only" mode on Google Reader
// @include       http://www.google.com/reader/*
// @include       https://www.google.com/reader/*
// ==/UserScript==

var i = 0;

var entries=document.getElementById("entries");
if(entries)
	entries.addEventListener('DOMNodeInserted', function(event){ nodeInserted(event); },true);

function nodeInserted(event) {	
	if (event.target.tagName=="DIV") {
			var linkbar;

			if (event.target.firstChild && event.target.firstChild.className=="card") {
				linkbar=event.target.firstChild.firstChild.childNodes[1].childNodes[1].firstChild.childNodes[1].childNodes[2];
				mode="expanded";
			}
			else
				return;
		
			var span = document.createElement("span");
			var a_link1 = document.createElement("a");
			var a_link2 = document.createElement("a");


			a_link1.id = "lnkHide" + i++;
			a_link1.href = "#";
			a_link1.addEventListener('click', function(event){ hidePost(a_link1.id); },true);
			a_link1.appendChild(document.createTextNode("[Hide]"));

			a_link2.id = "lnkHideImg" + i++;
			a_link2.href = "#";
			a_link2.addEventListener('click', function(event){ hidePostImages(a_link2.id); },true);
			a_link2.appendChild(document.createTextNode("[Text Only]"));

			span.appendChild(a_link1);
			span.appendChild(document.createTextNode("  "));
			span.appendChild(a_link2);
			span.setAttribute('style','padding-left:10px;');

			linkbar.appendChild(span);
	}
}

function hidePost(id) {
	var refL = document.getElementById( id );
	var refI = refL.parentNode.parentNode.parentNode.childNodes[3];
	refI.style.display = refI.style.display != 'none' ? 'none' : '';
	refL.innerHTML = refL.innerHTML == '[Hide]' ? '[Show]' : '[Hide]';
}

function hidePostImages(id) {
	var refL = document.getElementById( id );
	var refI = refL.parentNode.parentNode.parentNode.childNodes[3];
	var imgs = refI.getElementsByTagName('IMG');
	var embeds = refI.getElementsByTagName('EMBED');

	for(var i=0; i < imgs.length; i++) {
		imgs[i].style.display = imgs[i].style.display != 'none' ? 'none' : '';
	}

	for(var i=0; i < embeds.length; i++) {
		embeds[i].style.display = embeds[i].style.display != 'none' ? 'none' : '';
	}

	refL.innerHTML = refL.innerHTML == '[Text Only]' ? '[Show All]' : '[Text Only]';
}