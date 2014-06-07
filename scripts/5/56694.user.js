// ==UserScript==
// @name			Display New York Times Today's Paper in Full Width
// @author			Erik Vold
// @namespace		nytFullWidthArticles
// @include			http://*.nytimes.com/pages/todayspaper/index.html
// @include			https://*.nytimes.com/pages/todayspaper/index.html
// @include			http://nytimes.com/pages/todayspaper/index.html
// @include			https://nytimes.com/pages/todayspaper/index.html
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-30
// @lastupdated		2009-08-30
// @description		This userscript removes the extra columns for the 'Today's Paper' page.
// ==/UserScript==

var nytFullWidthTodaysPaper = {};
nytFullWidthTodaysPaper.setup = function() {
	var cColumn = document.evaluate("//div[@id='main']/div[@class='cColumn']", document, null, 9, null).singleNodeValue;
	cColumn.parentNode.removeChild( cColumn );
	var bColumn = document.evaluate("//div[@id='abColumns']/div[@class='bColumn']", document, null, 9, null).singleNodeValue;
	bColumn.parentNode.removeChild( bColumn );
	//GM_addStyle( 'div#shell div#page div#main div#abColumns, div#shell div#page div#main div#abColumns div.aColumn { width:99%; } div#shell div#page div#main, #abColumns { background:#FFFFFF; } .jumptonav {width:875px;}' );
	GM_addStyle((<><![CDATA[
		div#shell div#page div#main div#abColumns, div#shell div#page div#main div#abColumns div.aColumn, div.headline, .section-headline { width:99%; }
		div#shell div#page div#main, #abColumns { background:#FFFFFF; }
		.jumptonav {width:875px;}
	]]></>).toString());
	return true;
}
window.addEventListener( "load", nytFullWidthTodaysPaper.setup, false );