// ==UserScript==
// @name           Unpaginate vBulletin index (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/?.user.js
// @description    Marks up vBulletin index with the pagination microformat.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        *forumdisplay.php?*
// @include        *search.php?*
// ==/UserScript==

var body_xpath = '//table[@id="threadslist"]/tbody[last()]/tr[child::td[@class="alt1"]]';
var next_link_xpath = '//div[@class="pagenav"]/table/tbody/tr[child::td[@class="vbmenu_control"]]/td//a[.=">"]';
var nav_bar_xpath = '(//div[@class="pagenav"]/table[child::tbody[child::tr[child::td[@class="vbmenu_control"]]]])[last()]';

function xpath_valid(xpath)
{
	var result = document.evaluate('boolean('+xpath+')', document, null, XPathResult.BOOLEAN_TYPE, null);
	return result.booleanValue;
}

if(xpath_valid(body_xpath) && xpath_valid(next_link_xpath) && xpath_valid(nav_bar_xpath)){
	unpaginate(body_xpath, next_link_xpath, nav_bar_xpath);
}