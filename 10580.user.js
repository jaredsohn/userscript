// ==UserScript==
// @name           Digg filter
// @namespace      userscripts.org
// @author         listrophy@gmail.com
// @description    Keyword-based filter for digg
// @include        http://digg.com*
// @include        http://www.digg.com*
// ==/UserScript==

//make a list of partial keywords. The keywords need not be full words. For example, "atheis" matches
//both "atheism" and "atheist"
var keywords = ["atheis", "ron paul", "creationism", "iphone"];

function filterOnKeywords(node, keywords){
	var xpath  = "div[@class='news-body']/h3/a";
	var title =
		document.evaluate ( xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
		null ).singleNodeValue.textContent;
	xpath = "div[@class='news-body']/p[not(@class='news-submitted')]";
	var text =
		document.evaluate ( xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
		null ).singleNodeValue.textContent;
	
	for(var i = 0;i<keywords.length;i++){
		//titleElement.textContent = titleElement.textContent + " !!";
		
		if(title.toLowerCase().indexOf(keywords[i].toLowerCase()) != -1 ||
				text.toLowerCase().indexOf(keywords[i].toLowerCase()) != -1){
			var empty = document.createElement("div");
			empty.className = "diggfiltered";
			empty.title = title;
			node.parentNode.replaceChild(empty,node);
			return true;
		}
		
		
	}
	return true;
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

//addGlobalStyle(".diggfiltered { display: none; }");
addGlobalStyle(".diggfiltered { height: 3px !important; border: 1px solid #aaa; overflow:none;}");

var xpath  = "//div[@class='main']/div[@class='news-summary']";
var result = document.evaluate ( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

for ( var i = 0; i < result.snapshotLength; i++ )
{
	filterOnKeywords(result.snapshotItem(i), keywords);
}



