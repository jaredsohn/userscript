// ==UserScript==
// @name         Market/Play to AppBrain Link
// @namespace    http://userscripts.org/user/skittleys
// @version      2.1
// @description  Adds an AppBrain link to the Android Market (Google Play) website.
// @include      /https?://market\.android\.com/details\?/
// @include      /https?://play\.google\.com/store/apps/details\?/
// @copyright    2011-2, skittleys (CM)
// ==/UserScript==

var abUrl, mktUrl, newLink;

/* Build new url. */
mktUrl = document.location.search;
abUrl = 'http://www.appbrain.com/app/' + mktUrl.replace(/^\?.*id\=([\w\.]+).*$/,"$1");

/* Create a new tab with the AppBrain link*/
newLink = document.createElement('li');
newLink.setAttribute('role','tab');
newLink.setAttribute('class', 'tab goog-inline-block');
newLink.setAttribute('style', '-moz-user-select: none; -webkit-user-select:none; border-bottom-color:#88B131;');
newLink.innerHTML = '<span class="tab-text"><a href='+abUrl+' style="color:#fff !important;text-decoration:none!important;">View on AppBrain</a></span>';

/* Make tab hover style similar to that of other tabs */
newLink.onmouseover = function() { this.style.filter = "alpha(opacity=100)"; this.style.opacity="1"; };
newLink.onmouseout = function() { this.style.filter = "alpha(opacity=45)"; this.style.opacity="0.45"; };

/* Add to tab bar */
document.getElementById('details').appendChild(newLink);