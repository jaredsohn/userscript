// ==UserScript==
// @name           LyricWiki.org: embed YouTube video
// @namespace      http://userscripts.org/lyricwiki.org/embed_youtube
// @description    LyricWiki.org: embed YouTube video on song pages
// @include        http://lyricwiki.org/*:*
// @exclude        http://lyricwiki.org/index.php?*
// ==/UserScript==

function xpath(query, nodeType) {
	return document.evaluate(query, document, null, nodeType, null);
}

var ytid = xpath("substring-after(//a[starts-with(@href," +
		"'http://youtube.com/watch?v=')]/@href, '?v=')",
		XPathResult.STRING_TYPE).stringValue;
var footer = xpath("//div[@class='printfooter']",
		XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;

if (ytid && footer) {
	var ytplayer = document.createElement("div");
	ytplayer.innerHTML =
		'<object width="425" height="344">' +
		'<param name="movie" value="http://www.youtube.com/v/' +
		ytid +
		'&fs=1"></param>' +
		'<param name="allowFullScreen" value="true"></param>' +
		'<embed src="http://www.youtube.com/v/' +
		ytid +
		'&fs=1" type="application/x-shockwave-flash" ' +
		'allowfullscreen="true" width="425" height="344"></embed>' +
		'</object>';
	footer.parentNode.insertBefore(ytplayer, footer);
}

