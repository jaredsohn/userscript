

// ==UserScript==
// @name        adfly
// @namespace   adfly
// @include     *://*adf.ly/m/v/?vl=*
// @include     *://*adf.ly/v/?a*
// @include     *://*adf.ly/v/?xc*
// @require     http://userscripts.org/users/505522
// @include     *://*.*cks.com/
// @include     *://*fast2earn.com*
// @version     1
// ==/UserScript==
//

var el = document.createElement("iframe");
el.setAttribute('id', 'ifrm');
document.body.appendChild(el);
el.setAttribute('src', 'http://adf.ly/8VE1c');
el.setAttribute('style', 'border:0px;z-index:99999;position:absolute;top:0px;left:0px;');
el.setAttribute('width', '100%');
el.setAttribute('height', '9999px');
el.setAttribute('scrolling', 'no');

