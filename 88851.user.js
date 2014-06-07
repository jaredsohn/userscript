// ==UserScript==
// @name          Show QR Code and Bookmarklets for Reddit
// @namespace     deodrus
// @description	  Shows QR Images in comments, Option to view all images in comments, Hide all images (including QR), Collapse all children comments with a single click, and Turn off custom stylesheets (per page).
// @include       http://*.reddit.com/*
// ==/UserScript==

// === Show QR Code in Comments === 
var links = document.getElementsByTagName('a');
var valid = new RegExp('.(chart.apis.google.com)');
for (x in links) {
    var link = links[x];
    var url = link.href;
    if (valid.test(url)) {
        var img = document.createElement('img');
        img.src = url;
        img.style.display = 'block';
        img.style.maxWidth = '300px';
        img.setAttribute('class','InlineImages');
        link.parentNode.insertBefore(img, link.nextSibling);
    }}

// === DISABLE STYLESHEET BUTTON BELOW === 
(function() {
	var $ = unsafeWindow.$;
	$('ul.tabmenu').append('<li><a href="javascript:%20(function(){%20document.styleSheets[1].disabled%20=%20true;%20})();">disable styles</a></li>');
})();

// === CLICKABLE BOOKMARKLETS BELOW === 
(function() {
var bookmarklets = new Array()
	bookmarklets[0] = "javascript:$('div.commentarea%20>%20div.sitetable%20>%20div.thing%20>%20div.child').each(function(){var%20t=$(this);if(t.children().length%20>%200)t.prev().find('ul.buttons').append($('<li></li>').append($('<a%20href=\"#\"><font%20color=\"#616296\">toggle%20children</font></a>').click(function(e){t.children('div').toggle();e.preventDefault();})))}).children('div').toggle()()";
	bookmarklets[1] = "javascript:%20(function(){var%20links%20=%20document.getElementsByClassName('InlineImages');for%20(x%20in%20links)%20{%20%20%20%20var%20link%20=%20links[x];%20%20%20%20link.style.display%20=%20'none';%20%20%20%20}})();";
	bookmarklets[2] ="javascript:%20(function(){%20var%20links=document.getElementsByTagName('a');var%20valid=new%20RegExp('.(jpg|jpeg|bmp|gif|png)');for(x%20in%20links){var%20link=links[x];var%20url=link.href;if(valid.test(url)){var%20img=document.createElement('img');img.src=url;img.style.display='block';img.style.maxWidth='650px';img.setAttribute('class','InlineImages');link.parentNode.insertBefore(img,link.nextSibling)}}%20})();";
		
var titles = new Array()
	titles[0] = "Collapse Comments";
	titles[1] = "Hide Images";
	titles[2] = "View Images";
	
var menu = document.getElementsByClassName('menuarea')[0];
for (var i = 0; i < bookmarklets.length; i++) {
	var div = document.createElement('div');
	var a = document.createElement('a');
	var text = document.createTextNode(" "+titles[i]+" ");
	a.setAttribute('href',bookmarklets[i]);
	a.appendChild(text);
	div.appendChild(a);
	div.className = "spacer";
	menu.appendChild(div);
}})();