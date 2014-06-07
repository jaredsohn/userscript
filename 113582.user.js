// ==UserScript==
// @name           Cleaner facebook (No ticker and count on lists)
// @namespace      facebook
// @description    Removes the unpalatable news ticker on the right side of FB's homescreen and the unread count on lists.
// @include        *.facebook.*
// @date           9/21/2011
// @author         Terw
// ==/UserScript==

function fixFacebook() {
  var t   = document.createElement('style');
  t.type  = 'text/css';
  t.innerHTML = "#pagelet_ticker, .fbSidebarGripper, #listsNav .uiSideNavCount {display:none!important} .fbChatSidebarBody {height:"+ (window.innerHeight - 25) +"px!important}";
  var s = document.getElementsByTagName('style')[document.getElementsByTagName('style').length - 1];
  s.parentNode.insertBefore(t, s);
}
fixFacebook()