var GMSU_meta_78758 = <><![CDATA[
// ==UserScript==
// @name           tvtv.de
// @namespace      http://userscripts.org/users/176677
// @description    removes ad-bar at the top of the page
// @include        http://www.tvtv.de/*
// @version        1.1.1
// @require        http://userscripts.org/scripts/source/51513.user.js
// @uso:script     78758
// @history        1.1.1 little rewrite
// @history        1.1.0 imdb ratings added
// @history        1.0.3 micro optimization
// @history        1.0.2 corrected namespace
// @history        1.0.1 trying to get autoupdate running
// @require        http://userscripts.org/scripts/source/79348.user.js
// ==/UserScript==
]]></>;
GMSU.init(78758);

function trim (string) 
{
		string = string.replace(/^[\s\n\f\r\t\v]+/,'');
		string = string.replace(/[\s\n\f\r\t\v]+$/,'');
		return string;
}



var header = document.getElementById("header");
header.parentNode.removeChild(header);
document.getElementById("main_right").style.top = "0px";
document.getElementById("main_left").style.top = "0px";

var imgs = document.getElementsByTagName("img");
for (x in imgs) {
	if (imgs[x].title == 'tvtv.de ist ein Partner von tvmovie.de') {
		imgs[x].parentNode.parentNode.removeChild(imgs[x].parentNode);
		break;
	}
}


var movies = document.evaluate("//img[@src='http://www.tvtv.de/tvtv/configResource?resource=attr.format.icon.9']/../../../td/div[@id='eventTitle']/../div/a | //img[@src='http://www.tvtv.de/tvtv/configResource?resource=attr.format.icon.9']/../../../td/div[@id='eventTitle']/../div[@id='eventSubtitle']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < movies.snapshotLength; i += 2) {
	try {
		var title = trim(movies.snapshotItem(i).innerHTML);
		var year = movies.snapshotItem(i+1).innerHTML.match(/(19|20)\d\d/)[0];
	} catch (err) { continue; }
	get_ratings("\"" + title + "\" " + year, function (rating, element) {
		element.innerHTML += "<p>" + rating + "</p";
	}, movies.snapshotItem(i+1));
}

function get_ratings (search, callback, element) {
	imdb_util.get_ratings(search, function (rating) {
		callback(rating, element)
	});
}



