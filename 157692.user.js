// ==UserScript==
// @id             iframe.reader.google@blunet.cc
// @name           google.com/reader - Inline Articles
// @author         bernstein
// @description    Replaces the article summary with the actual website after clicking the article's title.
// @updateURL      https://userscripts.org/scripts/source/157692.user.js
// @version        0.9
// @domain         www.google.com
// @include        http*://www.google.com/reader/*
// @run-at         document-end
// @namespace      cc.blunet.userscripts
// @grant          GM_addStyle
// ==/UserScript==
// TODO do xmlhttprequest & extract article(depagerized) including styles.

GM_addStyle(".entry-body > div { overflow: hidden; } .entry-body, .entry-title { max-width: inherit !important; }");

var c = document.querySelector('#viewer-entries-container');
var oldHeight = c.clientHeight;
var iframe = null;

var overideTitleLink = function(event)
{
	if (event.target.className != 'entry-container') return;
	
	var link = event.target.querySelector('.entry-title-link');
	if (link == null) return;
	
	var href = link.href;
	
	link.setAttribute('href','#'); 
	link.removeAttribute('target');

	link.parentNode.addEventListener('click', function(e)
	{
		var e = event.target;

		var b = e.querySelector('.entry-body');
		if (b == null) return;
		
		iframe = document.createElement('iframe');
		iframe.src = href;
		iframe.width = '100%';
		iframe.height = (c.clientHeight - e.previousSibling.offsetHeight
			- e.nextSibling.offsetHeight
			- (e.offsetHeight - b.children[0].offsetHeight) - 3) + 'px';
		
		while (b.hasChildNodes()) b.removeChild(b.lastChild);
		b.appendChild(iframe);
		
		c.scrollTop = e.parentNode.offsetTop;
	}, false);
};
/*(new MutationObserver(function(m,o){
    for(i=0;i<m.length;i++) for(j=0;j<m[i].addedNodes.length;j++) console.log(m[i].addedNodes[j].className);
}).observe(document.getElementById('entries'),{childList: true, subtree: true});*/
document.body.addEventListener('DOMNodeInserted', overideTitleLink, false);

window.addEventListener('resize', function()
{
	var d = c.clientHeight - oldHeight;
	oldHeight = c.clientHeight;
	if(iframe) iframe.height = parseFloat(iframe.height) + d + 'px';
}, true);