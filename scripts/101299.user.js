// ==UserScript==
// @id             wikipediasummaryscript@userscripts.org
// @name           Wikipedia Summary
// @version        1.1
// @release        2011-9-5
// @author         Benjamin Harris
// @license        Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License
// @namespace      wikipediasummaryscript@userscripts.org
// @updateURL      http://userscripts.org/scripts/source/101299.meta.js
// @description    On mousing over a link to a Wikipedia article, this displays the summary of the relevant article in a neat box.
// @updateURL      http://userscripts.org/scripts/source/101299.meta.js
// @include        *
// @exclude        *.wikipedia.org*
// @exclude        *.google.com*
// @exclude        *.yahoo.com*
// @exclude        *.bing.com*
// @run-at         document-end
// ==/UserScript==

// insertAfter() function
function insertAfter(refNode, newNode) {
    var parent = refNode.parentNode;
    if (parent.lastChild === refNode) {
		parent.appendChild(newNode);  
    } else {
        parent.insertBefore(newNode, refNode.nextSibling);
    }
}

// Insert tooltip style
var tooltipStyle = document.createElement("style");
tooltipStyle.type = "text/css";
tooltipStyle.innerHTML = "#tooltip{ position:absolute; width:350px; border:2px solid #333; text-align:justify; font-size:14px; font-family:sans-serif; background:#FFFFFF; padding:5px; color:#000000; display:none; }";
document.head.insertBefore(tooltipStyle, document.head.firstChild);
// Insert tooltip script
var tooltipScript = document.createElement("script");
tooltipScript.type = "text/javascript";
tooltipScript.src = "http://yourjavascript.com/4511987112/main.js";
document.head.insertBefore(tooltipScript, document.head.firstChild);
// Insert jquery script
var jqueryScript = document.createElement("script");
jqueryScript.type = "text/javascript";
jqueryScript.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.2.3/jquery.min.js";
document.head.insertBefore(jqueryScript, document.head.firstChild);

var wikiPattern = /[a-z]{2}\.wikipedia.org\/wiki\//i;
var nona = /\/[a-zA-Z]*?\:|\/Main_page/img;

// insertImage() function
function insertImage(link) {
	var sup = document.createElement('sup');
	sup.innerHTML = '<img src="http://en.wikipedia.org/favicon.ico" style="height:10px; width:10px; border:solid black 1px; text-decoration:none; z-index:9999999999;" />';
	insertAfter(link, sup);
}

// Get data from a Wikipedia article
function scrapeLink(id, elink, callback) {
	GM_xmlhttpRequest({
		method: "GET",
		url: elink,
		onload: function(response) {
			callback(response.responseText, id);
		}
	});
}

// Recognize wiki links and add code
var link;
var i;
var summaryText;
for (i=0; i<document.getElementsByTagName('a').length; i++) {
	var id = 'wsbi' + String(i);
	var link = document.getElementsByTagName('a')[i];
	if (wikiPattern.test(link.href) && nona.test(link.href) === false) {
		insertImage(link);
		summaryText = 'Retreiving data';
		link.setAttribute('class', 'tooltip');
		link.setAttribute('id', id);
		link.setAttribute('title', summaryText + "<span><b>...</b></span>");
		var elink = link.href.toLowerCase();
		elink = elink.replace('wikipedia.org/wiki/', 'wikipedia.org/w/index.php?title=');
		elink = elink + '&redirect=yes&action=raw&section=0';
		var ftparse = /.*?wikipedia.org/i;
		var ftlink = elink.match(ftparse)[0];
		ftlink = ftlink.replace('wikipedia.org', '');
		GM_setValue('ftlink', ftlink);
		scrapeLink(id, elink, function(text, id) {
			var summaryText = text;
			var pPattern = /\{\{[\s\S]*?\}\}[\s\S]*/img;
			if (pPattern.test(text) === false) {
				summaryText = text.match(pPattern)[0];
			}
			summaryText = summaryText.replace(/\[\[|\]\]|'''|''|<[^<]+?>|\{\{[\s\S]*?\}\}|\||\|\w*?\]\]|\s\s/gim, '');
			summaryText = summaryText.slice(0, 500);
			document.getElementById(id).setAttribute('title', "<b>Summary: </b><br />" + summaryText + "<span><b>...</b></span>");
		});
	}
}