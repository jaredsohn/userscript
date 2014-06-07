// ==UserScript==
// @name        GameFAQs Collapsible Spoilers
// @namespace   OTACON120
// @author      OTACON120
// @version     1.0.1
// @description Replaces GameFAQs obscured-text spoilers with collapsible spoilers
// @updateURL   http://userscripts.org/scripts/source/134043.meta.js
// @downloadURL http://userscripts.org/scripts/source/134043.user.js
// @website     http://otacon120.com/user-scripts/gamefaqs-related/collapsible-spoilers
// @include     http://www.gamefaqs.com/boards/*-*
// @match       http://www.gamefaqs.com/boards/*-*
// @grant       GM_addStyle
// ==/UserScript==

// Fallback for Chrome
if (!GM_addStyle) {
	function GM_addStyle(aCss) {
	  'use strict';
	  let head = document.getElementsByTagName('head')[0];
	  if (head) {
	    let style = document.createElement('style');
	    style.setAttribute('type', 'text/css');
	    style.textContent = aCss;
	    head.appendChild(style);
	    return style;
	  }
	  return null;
	}
}

function actSpoiler() {
	if (this.id.indexOf('revealSpoiler') != -1) {
		x = this.id.replace('revealSpoiler-', '');
		spoilers[x].style.display = 'inline';
		spoilers[x].innerHTML = ' ' + spoilers[x].innerHTML;
		spoilers[x].className += ' hideSpoiler';
		this.id = 'hideSpoiler-' + x;
		this.textContent = 'X';
		this.title = 'Click to hide this spoiler';
	} else if (this.id.indexOf('hideSpoiler') != -1) {
		x = this.id.replace('hideSpoiler-', '');
		spoilers[x].removeAttribute('style');
		spoilers[x].removeAttribute('title');
		this.removeAttribute('title');
		spoilers[x].className = 'fspoiler';
		this.id = 'revealSpoiler-' + x;
		this.textContent = 'Reveal Spoiler';
	}
}

var i,
	spoilers = document.getElementsByClassName('fspoiler'),
	revealSpoilers = [],
	x;

GM_addStyle('\
#content .fspoiler,\
#content .fspoiler:hover,\
#content .fspoiler a,\
#content .fspoiler a:hover {\
	background: transparent;\
	color: inherit;\
}\
\
#content .fspoiler {\
	display: inline-block;\
	width: 0;\
	height: 0;\
	overflow: hidden;\
}\
\
.hideSpoiler {\
	border: 1px dotted;\
	border-width: 0 0 1px;\
}\
\
.hideSpoiler .hideSpoiler {\
	border-width: 0 1px 0 0;\
}\
');

for (i = 0; i < spoilers.length; i++) {
	spoilers[i].id = 'spoiler-' + i;
	revealSpoilers[i] = document.createElement('button');
	revealSpoilers[i].id = 'revealSpoiler-' + i;
	revealSpoilers[i].onclick = actSpoiler;
	revealSpoilers[i].textContent = 'Reveal Spoiler';
	spoilers[i].parentNode.insertBefore(revealSpoilers[i], spoilers[i]);
}