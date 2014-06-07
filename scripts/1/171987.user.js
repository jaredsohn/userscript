// ==UserScript==
// @name           Yahoo! Mail Basic - Without Ads
// @description    Remove ads in Yahoo! Mail Basic.
// @version        1.1
// @date           27.06.2013
// @author         Volkan K.
// @namespace      http://userscripts.org/users/volkan
// @include        http://*.mail.yahoo.com/*
// @include        https://*.mail.yahoo.com/*
// ==/UserScript==

div_elems = document.getElementsByTagName('div');
for (var i = 0; i < div_elems.length; i++) {
	current_class=div_elems[i].getAttribute('class');
	if (/with-ads/i.test(current_class)) {
		result = current_class.replace(/with-ads/ig, "without-ads");
		div_elems[i].setAttribute('class',result);
	}
}

addGlobalStyle = function(css)
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.sky-ad { display:none !important; }');