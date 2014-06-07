// ==UserScript==
// @name           Wowhead WOTLK Theme
// @namespace      wowhead.com
// @include        http://www.wowhead.com/
// @include        http://wowhead.com/
// @include        http://www.wowhead.com/?*
// @include        http://wowhead.com/?*
// ==/UserScript==

// Add borders below and above the menu
var topbar, newElement;
topbar = document.getElementById('topbar');
if (topbar) {
    newElement = document.createElement('div');
    newElement.id = 'topbar-topborder';
    topbar.parentNode.insertBefore(newElement, topbar);
    GM_addStyle('#topbar-topborder { background: url(http://wow.tecnobrat.com/wowhead/menu-top.png) !important; height: 5px !important; }');
}

var topbar, newElement;
if (topbar) {
    newElement = document.createElement('div');
    newElement.id = 'topbar-bottomborder';
    topbar.parentNode.insertBefore(newElement, topbar.nextSibling);
    GM_addStyle('#topbar-bottomborder { background: url(http://wow.tecnobrat.com/wowhead/menu-bottom.png) !important; height: 5px !important; }');
}

if (document.getElementById('toptabs-right') && document.getElementById('topbar-right')) {
  toprighttabs = document.getElementById('toptabs-right').innerHTML;
  topbarright = document.getElementById('topbar-right').innerHTML;

  document.getElementById('topbar-right').innerHTML = toprighttabs;
  document.getElementById('toptabs-right').innerHTML = topbarright;
  
  unsafeWindow.LiveSearch.attach(unsafeWindow.ge('oh2345v5ks'));
}

var menu, newElement;
menu = document.getElementById('kbl34h6b43');
if (menu) {
    newElement = document.createElement('div');
    newElement.id = 'ending-separator';
    menu.parentNode.insertBefore(newElement, menu.nextSibling);
    GM_addStyle('#ending-separator { background:transparent url(http://wow.tecnobrat.com/wowhead/menu-separator.png) no-repeat scroll left center; padding-right:16px; display: inline; height: 16px; }');
}

var menu2, newElement;
menu2 = document.getElementById('h43jv6jk346');
if (menu2) {
    newElement = document.createElement('div');
    newElement.id = 'ending-separator';
    menu2.parentNode.insertBefore(newElement, menu2.nextSibling);
    GM_addStyle('#ending-separator { background:transparent url(http://wow.tecnobrat.com/wowhead/menu-separator.png) no-repeat scroll left center; padding-right:16px; display: inline; height: 16px; }');
}

(function() {

  var utime = new Date().getTime();

  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild( document.createTextNode("@import url( http://wow.tecnobrat.com/wowhead/style.css?003 );") );
  head.appendChild(style);

})();