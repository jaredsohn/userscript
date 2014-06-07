// ==UserScript==
// @name           Penny Arcade Click-On-Comic
// @description	   Click on a comic to advance to the next one on Penny-Arcade and use the left/right keys to navigate.
// @include       http://penny-arcade.com/comic*
// @include       http://*.penny-arcade.com/comic*
// ==/UserScript==

var first = 'http://www.penny-arcade.com/comic/1998/11/18/'; //getLink('first', 1);
var back  = getLink('back', 3);
var news  = getLink('news', 5);
var next  = getLink('next', 7);
var last  = 'http://www.penny-arcade.com/comic/'; //getLink('new', 9);

addLinkToComic(next);

window.addEventListener('keydown', keyDown, true);

function keyDown(e){
	switch(e.keyCode)
	{
		case 39: if (e.ctrlKey) location.href = last;  else location.href = next;  break;
		case 37: if (e.ctrlKey) location.href = first; else location.href = back;  break;
		case 78: location.href = news; break;
	}
}

function addLinkToComic(href){
	var link = document.createElement('a');
	link.href = href;

	var comic;
	try{
		comic = document.body.childNodes[1].childNodes[9].childNodes[5].childNodes[7];
	}
	catch(err){
		var divs = document.getElementsByTagName('div');
		for (var i = 0; i < divs.length; i++){
	 		if (divs[i].getAttribute('class') == 'body') {
	 			comic = divs[i]; break;
	 		}
		}
	}

	if (comic == null){
		return;
	}
	
	link.appendChild(comic.removeChild(comic.childNodes[1]));
	comic.appendChild(link);
	
}

function getLink(name, id){
	var href;
	try{
		href = document.body.childNodes[1].childNodes[9].childNodes[1].childNodes[1].childNodes[id].childNodes[0].href;
	}
	catch(err){
		var lis = document.getElementsByTagName('li');
		for (var i = 0; i < lis.length; i++){
  		if(lis[i].getAttribute('class') == name){
    		  href = lis[i].getElementsByTagName('a')[0].href;
      		break;
  		} 
		}
	}
	
	if (href == null){
		throw("error");
	}
	return href;
}