// ==UserScript==
// @name       Twitter bigger UI.
// @namespace  http://userscripts.org/users/180777
// @version    0.1
// @downloadURL http://userscripts.org/scripts/source/180777.user.js
// @updateURL http://userscripts.org/scripts/source/180777.meta.js
// @description  Twitter bigger UI.
// @match      https://twitter.com/
// @copyright  2013+, Me
// ==/UserScript==

(function () {
	var s = document.createElement('style');
    s.innerHTML = '.dashboard, .content-main{float:auto !important;width: 100% !important;}.wtf-module .import-prompt, .trends, .site-footer{display: none;}.tweet .js-tweet-text {font-size: 18px;margin: 5px 0;}#page-container{width:90%;}';

	var body = document.querySelector('body');
	body.appendChild(s);

})();