// ==UserScript==
// @name           xkcd: Visible comic titles
// @namespace      http://gecko.535design.com/grease/
// @description    Extracts the title= attribute of xkcd comics and displays it below the image.
// @include        http://xkcd.tld/*
// @include        http://www.xkcd.tld/*
// ==/UserScript==

var comic, comics, i, parentNode, title;

GM_addStyle(".comic-title {\n\tfont-size: smaller;\n\tfont-style: italic;\n\tfont-variant: normal;\n}");

comics = document.evaluate('//img[string-length(@title) > 0 and starts-with(@src,"http://imgs.xkcd.com/comics/")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (i = 0; i < comics.snapshotLength; i++) {
	comic = comics.snapshotItem(i);

	title = document.createElement("span");
	title.className = "comic-title";
	title.appendChild(document.createTextNode(comic.title));

	parentNode = comic.parentNode;
	parentNode.normalize();

	if (comic.nextSibling) {
			parentNode.insertBefore(title, comic.nextSibling);
			parentNode.insertBefore(document.createElement("br"), comic.nextSibling);
	} else {
		parentNode.appendChild(document.createElement("br"));
		parentNode.appendChild(title);
	}
}