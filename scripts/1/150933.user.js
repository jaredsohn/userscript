// ==UserScript==
// @name           testa
// @namespace      Personal
// @include        www.jiggmin.com*
// @include        jiggmin.com*
// @include        *jiggmin.com*
// @include        jiggmin.com/forum.php*
// @description    test
// ==/UserScript==

document.body.style.background = "#0000FF";
var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    if(ilist[i].src == "http://jiggmin.com/-images/jiggmin-logo.png") {
         ilist[i].src = "http://i.imgur.com/3fBuc.png";
    }
}
var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    if(ilist[i].src == "http://jiggmin.com/styles/halloween/logo.jpg") {
         ilist[i].src = "http://i.imgur.com/3fBuc.png";
    }
}
document.getElementById("entries").addEventListener('DOMNodeInserted', nWT, false);

function nWT(e){
	var fonts = e.target.getElementsByTagName('FONT');

	for(var i = 0; i < fonts.length; i++)
		if(fonts[i].color)
			if(fonts[i].getAttribute('color').toLowerCase() == '#047B7B')
   	 			fonts[i].setAttribute('color', '#FF0000');

	var spans = e.target.getElementsByTagName('SPAN');

	for(var i = 0; i < spans.length; i++)
		if(spans[i].style.color)
			if(spans[i].getAttribute('style').toLowerCase() == 'color:#047B7B')
   	 			spans[i].setAttribute('style', 'color:#FF0000');
}