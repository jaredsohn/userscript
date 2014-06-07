// ==UserScript==
// @name        Lodash Documentation Aliases
// @namespace   http://userscripts.org/users/delapouite
// @description Add function aliases in TOC
// @include     http://lodash.com/docs*
// @updateURL   https://github.com/Delapouite/userscripts/raw/master/Lodash_Documentation_Aliases.user.js
// @downloadURL https://github.com/Delapouite/userscripts/raw/master/Lodash_Documentation_Aliases.user.js
// @version     3.0
// ==/UserScript==

// Lodash is available on this page

// TOC is the first div in the page
var TOC = document.getElementsByTagName('div')[0],
	nav = document.getElementsByTagName('h1')[0];

// add faded aliases
_.forEach(TOC.getElementsByTagName('a'), function(a) {
	var target = a.href.split('#')[1];
	if (target && target !== '_' && a.textContent.trim() !== '_.' + target.replace('_', '.')) {
		var alias = document.createElement('span');
		alias.innerHTML = ' -> ' + target;
		a.style.opacity = 0.5;
		a.className = 'alias';
		a.getElementsByTagName('code')[0].appendChild(alias);
	}
});

// add link to home
var homeLink = document.createElement('a');
homeLink.textContent = 'Lo-Dash';
homeLink.href = '//lodash.com';
homeLink.style.marginRight = '0.5em';
nav.childNodes[0].textContent = '';
nav.insertBefore(homeLink, nav.firstChild);

// build menu
_.forEach(TOC.getElementsByTagName('h2'), function(h2) {
	h2.id = h2.textContent;
	var a = document.createElement('a');
	a.textContent = h2.textContent;
	a.href = '#' + h2.textContent;
	a.style.fontSize = '0.5em';
	a.style.margin = '0 1em';
	nav.appendChild(a);
});

// methods count by category
_.forEach(TOC.getElementsByTagName('div'), function(section) {
	var entriesCount = section.getElementsByTagName('li').length,
		aliasCount = section.getElementsByClassName('alias').length;
	section.querySelector('h2 code').innerHTML += ' (' + (entriesCount - aliasCount) + '/' + entriesCount + ')';
});