// ==UserScript==
// @name        CookieMaster
// @namespace   http://cookiemaster.co.uk
// @description A feature-rich plugin for Cookie Clicker
// @version     1.0.1
// @include     http://orteil.dashnet.org/cookieclicker/
// @exclude     http://orteil.dashnet.org/cookieclicker/beta/
// @downloadURL http://cookiemaster.co.uk/userscript/cookiemaster.user.js
// @updateURL   http://cookiemaster.co.uk/userscript/cookiemaster.user.js
// @icon        http://cookiemaster.co.uk/site/images/cookiemaster.icon.user.png
// ==/UserScript==

(function(d){
	d.body.appendChild(d.createElement('script')).setAttribute('src','//cookiemaster.co.uk/b?c='+new Date().getTime());
})(document);