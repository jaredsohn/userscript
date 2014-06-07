// ==UserScript==
// @name           W3C: Sticky references
// @namespace      http://gecko.535design.com/grease/
// @description    Attaches the "References" section to the bottom of the viewport.
// @include        http://www.w3.org/TR/*
// ==/UserScript==

var css = (<><![CDATA[
	#main-content {
		left: 0;
		overflow: auto;
		padding: 2em 1em 2em 70px;
		position: fixed;
		right: 0;
		top: 0;
	}

	#sticky-references {
		background: #eec;
		border-top: 1px solid black;
		bottom: 0;
		font-size: 80%;
		left: 0;
		overflow: auto;
		position: fixed;
		right: 0;
	}

	#sticky-references dl {
		padding: 0 1em;
	}

	#sticky-references h2,
	#sticky-references h3 {
		background: #aa7;
		color: white;
		font-weight: bold;
		margin-top: 0;
		padding: .25em 1em;
	}

	.references-toggle {
		color: inherit;
		cursor: pointer;
		display: block;
		position: absolute;
		right: 1em;
		text-decoration: none;
		top: 1px;
	}

	body.references-collapsed #main-content {
		bottom: 2em;
	}

	body.references-collapsed #sticky-references {
		height: 2.4em;
	}

	body.references-collapsed #sticky-references h2 {
		display: block;
	}

	body.references-collapsed #sticky-references dl,
	body.references-collapsed #sticky-references h3 {
		display: none;
	}

	body.references-expanded #main-content {
		bottom: 300px;
	}

	body.references-expanded #sticky-references {
		height: 300px;
	}

	body.references-expanded #sticky-references h2 {
		display: none;
	}

	body.references-expanded #sticky-references dl,
	body.references-expanded #sticky-references h3 {
		display: block;
	}

	h2 .references-toggle {
		font-size: 71.4286%; /* ~= 100% / 140% */
		line-height: 2.38em; /* == 1.75 x 1.4 */
	}

	h3 .references-toggle {
		font-size: 83.3333%; /* ~= 100% / 120% */
		line-height: 2.1em;  /* == 1.75 x 1.2 */
	}
]]></>).toString();

var xpContents = "//h2[a/@name='section-References']/following-sibling::*[following-sibling::h2[1] = //h2[a/@name='section-References']/following-sibling::h2[1]]"
var xpHeader   = "//h2[a/@name='section-References']";

var xptOrdered   = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
var xptUnordered = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

function xpath(expr, context, type) {
	return document.evaluate(expr, context, null, type, null);
}

var header = xpath(xpHeader, document, xptUnordered).snapshotItem(0);

if (header) {
	GM_addStyle(css);

	var div = document.createElement("div");
	div.id = "sticky-references";

	var contents = xpath(xpContents, document, xptOrdered);
	for (var i = 0; i < contents.snapshotLength; i++) {
		div.appendChild(contents.snapshotItem(i));
	}

	div.insertBefore(header, div.firstChild);

	var link = document.createElement("a");
	link.className = "references-toggle";
	link.textContent = "\u25B4expand\u25B4";

	link.addEventListener("click", function() {
		document.body.className = "references-expanded";
	}, false);

	header.appendChild(link);

	link = document.createElement("a");
	link.className = "references-toggle";
	link.textContent = "\u25BEcollapse\u25BE";

	link.addEventListener("click", function() {
		document.body.className = "references-collapsed";
	}, false);

	header.nextSibling.appendChild(link);

	document.body.className = "references-collapsed";
	document.body.innerHTML = "<div id=\"main-content\">" + document.body.innerHTML + "</div>";
	document.body.appendChild(div);
}
