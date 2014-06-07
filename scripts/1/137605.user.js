// ==UserScript==
// @name        Lifehacker No Tips Gallery
// @namespace   https://userscripts.org/users/364147
// @license			(CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include     http://lifehacker.com/*/gallery/1
// @include    	http://www.lifehacker.com/*/gallery/1
// @description	Redirects Lifehackers's gallery page to All-On-One-Page.
// @version     0.1
// ==/UserScript==
// Author: Kashif Iqbal Khan - kashiif@gmail.com - www.kashiif.com

(function() {
var galleryUrl = document.location.href;
var pos = galleryUrl.indexOf('gallery/1');
var onePage = galleryUrl.substr(0, pos);
window.location.href = onePage;
})();
