// ==UserScript==
// @name        Flibuster
// @namespace   basilevs
// @description Adds  links to flibusta.net site
// @include     http://books.imhonet.ru/element/*
// @include     http://*flibusta.*/makebooklist*
// @include     http://*flibusta.*/b/*
// @include     http://zmw2cyw2vj7f6obx3msmdvdepdhnw2ctc4okza2zjxlukkdfckhq.b32.i2p/b/*
// @version     5
// @require            https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_log
// @grant              GM_registerMenuCommand
// @grant              GM_log
// ==/UserScript==

var log = console.log;

var debug = console.log;

var frame = document.createElement('div');
document.body.appendChild(frame);
GM_config.init(
{
  'id': 'Flibuster', // The id used for this instance of GM_config
  'fields': // Fields object
  {
    'flibHost': // This is the id of the field
    {
      'label': 'Адрес Флибусты. proxy.flibusta.net, flibusta.i2p, и т.п.', // Appears next to field
      'type': 'text', // Makes this setting a text field
      'default': 'flibusta.net' // Default value if user doesn't change it
    }
  },
  'frame': frame // Element used for the panel
});

var FLIB_HOST = GM_config.get("flibHost");

debug("Flibuster start");

function xpath(context, expression, callback) {
    log("Performing Xpath: " + expression);
    var i = document.evaluate(expression, context, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE , null);
    if (!i)
        throw new Error("Invalid query: "+expression);
    var data;
	var count = 0;
    while (data = i.iterateNext()) {
		count++;
        if (!callback(data))
            return;
    }
    log("Xpath: " + expression + " succeeded. Nodes found: " + count);
}

function xpathNodes(context, expression) {
	var rv = [];
	function callback(node) {
		rv.push(node);
		return true;
	}
	xpath(context, expression, callback);
	return rv;
}

function xpathOnlyNode(context, expression) {
	var rv = xpathNodes(context, expression);
	console.assert(rv.length == 1, "Wrongs count of nodes for %s : %d", expression, rv.length)
	return rv[0];
}

function Element(author, title) {
	this.author = author;
	this.title = title;
	log("Element: %s, %s", author, title);
}

function createLink(href, text) {
	var link = document.createElement("a");
	link.href = href;
	link.text = text;
	return link;
}

function searchUrl(author, title) {
	var url = new URL("http://"+FLIB_HOST+"/makebooklist");
	url.search += "?t="+title;
	var names = author.split(" ");
	var ln = names[names.length-1];
	url.search += "&ln="+ln;
	return createLink(url.href, "\"" + this.title + "\" на Флибусте");
}

function extractCurrentBook() {
	var title = xpathOnlyNode(document, "id('wrapper')//h1").textContent;
	var author = xpathOnlyNode(document, "id('elementDescription')//span[text()='Автор книги:']/../a/span").textContent;
	return new Element(author, title);	
}

function wrapInParagraph(element) {
	var p = document.createElement("p");
	p.appendChild(element);
	return p;
}

function processBookPage() {
	var element = extractCurrentBook();
	var text = "На Флибусте";
	var link = createLink(searchUrl(element.author, element.title).href, text);
	link.classList.add("btn", "use-way", "btn-inverse", "btn-theme", "is-masked");
	var insertNode = xpathOnlyNode(document, "id('wrapper')//div[@class ='m-usewayblock']");
	insertNode.insertBefore(link, insertNode.firstChild);
}

function processSearchResult() {
	var bookLinks = xpathNodes(document, "//div/a[1]");
	if (bookLinks.length == 1) {
		location.replace(bookLinks[0].href); //No history update if replace is used.	
	}	
}

function processFlibustaBookPage() {
	var nodes = xpathNodes(document, "id('main')/h1");
	if (nodes.length == 0) {
		log("No book header found");
		return;
	}
	var header = nodes[0].textContent;
	header = header.replace(/ \(fb2\)/, "");
	debug("Header: %s", header);
	
	nodes =  xpathNodes(document, "id('main')/a");
	if (nodes.length == 0) {
		log("No book author found");
		return;
	}
	var author = nodes[0].textContent;
	var names = author.split(" ");
	if (names.length == 3)
		author = names[0] + " " + names[2];
	var node = xpathNodes(document, "id('main')/div/p[@class='genre']/..")[0];
	var url = new URL("http://imhonet.ru/search/?books=on&search=");
	url.search += header;
	url.search += " " + author;
	node.appendChild(createLink(url.href, " (imhonet)"));
}

var host = location.host;
debug("Host: " + host);
debug("Path: " + location.pathname);
function open_config() {
	GM_config.open()
}

GM_registerMenuCommand("Flibuster config", open_config);

var flibustaBookEx = /\/b\/\d+/;

if (host == "books.imhonet.ru")
	processBookPage();
else if (host == FLIB_HOST && location.pathname=="/makebooklist")
	processSearchResult();
else if (flibustaBookEx.test(location.pathname))
	processFlibustaBookPage();




