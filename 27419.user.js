/*globals document,XPathResult,DOMParser,GM_log,GM_xmlhttpRequest */
// ==UserScript==
// @name           Penny Arcade -- Comic on Front Page
// @namespace      http://ianen.org/greasemonkey/
// @description    Display the current Penny Arcade comic on the front page
// @include        http://penny-arcade.com/
// @include        http://penny-arcade.com/20*
// @include        http://www.penny-arcade.com/
// @include        http://www.penny-arcade.com/20*
// ==/UserScript==

(function () {

var resolve_ns = function (prefix)
{
	return {"h": "http://www.w3.org/1999/xhtml"}[prefix];
};

var find = function (xpath, doc, f)
{
	var snapshot = doc.evaluate (xpath, doc, resolve_ns,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	return f ({
		"at": function (ii) { return snapshot.snapshotItem(ii); },
		"length": snapshot.snapshotLength
	});
};

var comicpage = find ("//*[@class='actionbar']//a[starts-with(@href, '/comic/')]", document, function (elems)
{ return elems.at (0).href; });

GM_xmlhttpRequest({ "method": "GET", "url": comicpage, "onload": function (result)
{
	var dom = (new DOMParser ()).parseFromString (result.responseText, "application/xhtml+xml");
	
	var title = find ("//*[@class='title']//h:h1", dom, function (elems)
	{ return elems.at (0).textContent; });
	
	var img = find ("//*[@class='body']//h:img", dom, function (elems)
	{ return elems.at (0); });
	
	var img_div = document.createElement ("div");
	var title_div = document.createElement ("div");
	var body_div = document.createElement ("div");
	img_div.className = "post";
	title_div.className = "title";
	body_div.className = "body";
	
	var title_h1 = document.createElement ("h1");
	title_h1.style.marginBottom = "0.3em";
	title_h1.textContent = title;
	title_div.appendChild (title_h1);
	
	title_div.style.textAlign = "center";
	title_div.style.width = "auto";
	title_div.style.height = "auto";
	
	img_div.style.textAlign = "center";
	img_div.style.marginBottom = "1em";
	
	img_div.style.display = "table";
	img_div.style.marginLeft = "auto";
	img_div.style.marginRight = "auto";
	body_div.style.display = "table";
	
	body_div.appendChild(img);
	img_div.appendChild (title_div);
	img_div.appendChild (body_div);
	
	var posts = find ("//*[@class='posts']", document, function (elems)
	{ return elems.at (0); });
	
	posts.insertBefore (img_div, posts.firstChild);
}});

})();