// ==UserScript==
// @name           Digg filter 2
// @namespace      userscripts.org
// @author         inxilpro
// @description    Another keyword-based filter for digg
// @include        http://digg.com*
// @include        http://www.digg.com*
// ==/UserScript==

// List partial keywords here. The keywords need not be full words;
// for example, "atheis" matches both "atheism" and "atheist"
var keywords = ["potter", "deathly hallows"];

// Should the entries be hidden entirely or just replaced with a filter notice
var hideStory = false;

function filterOnKeywords(node, keywords, searchtext)
{
	var xpath = "div[@class='news-body']/h3/a | h3/a";
	var title = document.evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
	
	if (searchtext)
	{
		xpath = "div[@class='news-body']/p[not(@class='news-submitted')]";
		var text = document.evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
	}
	
	for(var i = 0; i < keywords.length; i++)
	{
		var shouldFilter = false;
		
		if (title.toLowerCase().indexOf(keywords[i].toLowerCase()) != -1) shouldFilter = true;
		if (searchtext && text.toLowerCase().indexOf(keywords[i].toLowerCase()) != -1) shouldFilter = true;

		if (shouldFilter)
		{
			var empty = document.createElement("div");
			empty.className = "diggfiltered";
			empty.title = title;
			empty.textContent = 'Content filtered on keyword "' + keywords[i] + '"';
			node.parentNode.replaceChild(empty, node);
			return true;
		}
	}
	
	return true;
}

function addGlobalStyle(css)
{
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;
	
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

if (hideStory) addGlobalStyle(".diggfiltered { display: none; }");
else addGlobalStyle(".diggfiltered { padding: 2px 5px; border: 1px solid #eee; overflow: none; color: #aaa; margin: 5px 0; }");

var xpath  = "//div[@class='main']/div[@class='news-summary']";
var result = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for ( var i = 0; i < result.snapshotLength; i++ )
{
	filterOnKeywords(result.snapshotItem(i), keywords, true);
}

xpath = "//div[@class='sidebar']/div[@class='side-container']/div[@class='news-summary']";
var result = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for ( var i = 0; i < result.snapshotLength; i++ )
{
	filterOnKeywords(result.snapshotItem(i), keywords, false);
}