// ==UserScript==
// @name RepFuck Button - HackForums.net - by Intercept/Zelos
// @namespace http://userscripts.org/scripts/show/116389
// @description Adds an automatic repfuck button all posts on HackForums.
// @include http://www.hackforums.net/showthread.php*
// ==/UserScript==

stole = /by this user" class="quimby_search_image">/gi;
repd = 'by this user" class="quimby_search_image"></a>&nbsp;<a href=/repfuck.php?verify=true><img src="http://cdn.hackforums.net/images/blackreign/english/repfuck.gif" alt="Repfuck this user" title="Repfuck this user" class="quimby_search_image"></a>';
page = document.body.innerHTML;
document.body.innerHTML = page.replace(stole,repd);
