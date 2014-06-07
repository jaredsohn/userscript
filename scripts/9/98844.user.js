// ==UserScript==
// @name			lastlogin
// @author			snakelp
// @description		nemexia last login without premium
// @include			http://game.nemexia.*/galaxy.php*
// ==/UserScript==



opera.addEventListener('BeforeExternalScript',function (e) {
  if( e.element.getAttribute('src').match(/js\/galaxy\.js$/) ) {	// takoi galaxy.js nam ne nujen
    e.preventDefault();												// otkluchaem nahui 
  }
},false);


var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://dl.dropbox.com/u/23240034/nemexia/gal.js';		// za mesto nego pravel'nii
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
