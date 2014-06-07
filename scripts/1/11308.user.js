// ==UserScript==
// @name				Slashdot + Spotback
// @namespace			http://www.dp.cx/userscript
// @description			Allow the user to rate a page from within Fark
// @include				http://*.slashdot.org/*
// @include				http://slashdot.org/*
// ==/UserScript==


//Constants
//NORMALIZE=false leaves the tags alone
//NORMALIZE=true converts tags to proper case and replaces -'s with spaces, like reader should itself
var DEFAULT_LABEL="";
var WIDGETID = 5676;
var NORMALIZE=true;
var MAX_ARTICLES = 30;

var sc = document.createElement('script');
sc.src = 'http://spotback.com/scripts/widgets/prepare.js?wid=' + WIDGETID;
document.getElementsByTagName('head')[0].appendChild(sc);

// fetch the appropriate number of articles
var articles = document.getElementById('articles');
for(var articlecount = 0; articlecount < articles.childNodes.length; articlecount++) {
	if (articles.childNodes[articlecount].id && articles.childNodes[articlecount].id.match(/^art\d+$/)) {
		MAX_ARTICLES = articlecount * 2;
	}
}

for(var article = 1; article <= MAX_ARTICLES; article+=2) {
	var c_article = document.getElementById('art' + article.toString());
	if (!c_article) { break; }
	var c_article_header_pt = c_article.childNodes[1].childNodes[1].childNodes[1];
	if (c_article_header_pt.childNodes.length > 3) {
		c_article_header = c_article_header_pt.childNodes[3];
		c_article_tags = c_article.nextSibling.nextSibling.nextSibling.childNodes[1];
	} else {
		c_article_header = c_article_header_pt.childNodes[1];
		c_article_tags = c_article.nextSibling.childNodes[1];
	}
	var c_link = c_article_header.href;
	var c_title = c_article_header.text;

	var c_tags = "";
	for(var tags = 0; tags < c_article_tags.childNodes.length; tags++) {
		if (c_article_tags.childNodes[tags].className == "tagname") {
			c_tags += c_article_tags.childNodes[tags].firstChild.text + " ";
		}
	}
	c_tags = c_tags.replace(/ $/, "");
	
	// create the rater in the Read More section below the story
	var c_rater_parent = document.getElementById('slink'+(article+1)).childNodes[1].childNodes[1];
	var url = c_link;
	var categories = c_tags;
	var title = c_title;
	
	var p = [];
	p.push("window.sb_when_to_load = 'immediate';");
	p.push("window.sb_url_to_rate = '" + url + "';");
	p.push("window.sb_rated_title = '" + title + "';");
	p.push("window.sb_categories = '" + categories + "';");
	
	var c_rater = document.createElement("li");
	c_rater.style.cssText = 'display:none;visibility:hidden;';
	c_rater.className = 'sb_widget_ph_' + WIDGETID;
	c_rater.appendChild(document.createTextNode(p.join('')));
	c_rater_parent.appendChild(c_rater);
}