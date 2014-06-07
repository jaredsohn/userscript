// twitter.com-demotion.user.js
//
// ==UserScript==
// @name          Twitter.com Demotion
// @description   Hides any promoted content
// @include       http://twitter.com/*
// @include       http://www.twitter.com/*
// @include       https://twitter.com/*
// @include       https://www.twitter.com/*
// ==/UserScript==

void((function() {
var c = document.createElement("div");
c.innerHTML = '<style type="text/css">li.promoted-trend,.promoted-tweet,.promoted-account,.trends {display: none ! important;}</style>';
document.body.appendChild(c);
})());

void(function(){document.addEventListener("mousedown", tcoToLinkTitleURL, true); function tcoToLinkTitleURL(ev) { var target = ev.target; if(/^http:\/\/t.co\//.test(target.href)) target.href=target.title; } }());

/*
function demotion() 
{
	var elements = document.getElementsByTagName('li');
	for (var i=0; i<elements.length; i++)
	  if (elements[i].className.match(/promoted/))
	  {
	    if (elements[i].style['display'].match(/none/)) continue;
	    elements[i].style['display'] = 'none';
	  }

window.setInterval(demotion,5000);
*/
