// ==UserScript==
// @name           Unpaginate vBulletin threads (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/?.user.js
// @description    Marks up vBulletin threads with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        *showthread.php?*
// ==/UserScript==

var body_xpath = '//div[@id="posts"]//div[starts-with(@id, "edit")]';
var next_link_xpath = '(//div[@class="pagenav"]/table/tbody/tr[child::td[@class="vbmenu_control"]])[last()]//a[.=">"]';
var nav_bar_xpath = '(//div[@class="pagenav"]/table/tbody/tr[child::td[@class="vbmenu_control"]])[last()]';

function xpath_valid(xpath)
{
	var result = document.evaluate('count('+xpath+')', document, null, XPathResult.NUMBER_TYPE, null);
	if(result.numberValue)
		return true;
	else
		return false;
}

if(xpath_valid(body_xpath) && xpath_valid(next_link_xpath) && xpath_valid(nav_bar_xpath)){
	unpaginate(body_xpath, next_link_xpath, nav_bar_xpath);
}