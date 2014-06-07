var GMSU_meta_79348 = <><![CDATA[
// ==UserScript==
// @name           imdb utils
// @exclude        *
// @version        1.0.2
// @history        1.0.2 bug fix
// @history        1.0.1 bug fix
// @history        1.0.0 initial release
// @uso:script     79348
// @namespace      http://userscripts.org/users/176677
// @description    utility functions to retrieve IMDB ratings
// @require        http://userscripts.org/scripts/source/51513.user.js
// ==/UserScript==
]]></>;
GMSU.init(79348);

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}

var imdb_util = {};

imdb_util.google = (function (search, callback) {
	GM_xmlhttpRequest({
		 method: "GET",
		 url: "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=" + encodeURI(search),
		 onload: function(xhr) {
		  var data = eval("(" + xhr.responseText + ")");
		  callback(data);
		}
	});
});

imdb_util.get_imdb_url = (function (search, callback) {
	imdb_util.google(search + " site:www.imdb.com/title/", function (data) {
		
			var j = data.responseData.results.length;
			for (var i = 0; i < j; ++i) {
				var match = data.responseData.results[i].url.match(/http:\/\/www.imdb.com\/title\/tt[\d]+\//);
				if (match) {
					callback(match[0]);
					break;
				}
			}
		
	});
});

// argument function callback (document)
//						document - returns html document for url
imdb_util.getDocument = (function (url, callback) {
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function (resp) {
			if (resp.status != 200) return;
			var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
			var doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');
			html.innerHTML = resp.responseText;
			doc.appendChild(html);
			
			callback(doc);
		}
	});
});

imdb_util.parse_ratings = (function (url, callback) {
	imdb_util.getDocument(url + "ratings", function (doc) {
		try {
			var s = doc.evaluate("//a[@href='/help/show_leaf?ratingsexplanation']/..", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
			var match = s.match(/(([\d]+\,)*([\d]+)) IMDb users have given a weighted average vote of (\d.\d) \/ 10/);
			callback("<a href=\"" + url + "\">" + match[match.length - 1] + "(" + match[1] + ")</a>");
		} catch (err) {
			callback("<a href=\"" + url + "\">IMDb</a>");
		}
	});
});


imdb_util.get_ratings = (function (search, callback) {
	imdb_util.get_imdb_url(search, function (url) {
		imdb_util.parse_ratings(url, function (rating) {
			callback(rating);
		});
	});
});


/*
(function () {

	// Sample usage
	imdb_util.get_ratings("\"The Matrix\" 1999", function (rating) {
		GM_log(rating);
	});
	

})();

*/