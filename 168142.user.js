// ==UserScript==
// @name        Remove facebook link-up message from Disqus
// @namespace   http://userscripts.org/users/lorriman
// @description Disqus doesn't allow you to banish a facebook message - this script gets rid of it.
// @include     http://disqus.com/dashboard/
// @match       http://disqus.com/dashboard/
// @grant       none
// @version     .1
// ==/UserScript==

link=document.getElementsByClassName('find-fb-friends');
p=link[0].parentNode;
if(p.getAttribute('class')=='message'){
    p.setAttribute('style','display:none');
}