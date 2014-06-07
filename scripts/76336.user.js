// ==UserScript==
// @name           eSDK naredjenja
// @namespace      www.erepublik.com
// @description    Naredjenja eSDK
// @Author         Komandant Pavle
// @version        1.00
// @include        http://www.erepublik.com/en
// ==/UserScript==

var bo_version = '1.00'

String.prototype.trim = function()
{
	return this.replace(/^\s+|\s+$/g, '');
};

GM_xmlhttpRequest( {
	method: 'GET',
	url: 'http://www.kide83.com/erepublik/ses/ses.htm',  // VAZNO! eSDK udara sutra u 18:00 u
	