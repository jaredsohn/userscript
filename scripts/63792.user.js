// ==UserScript==
// @name			IGN - Single Page View '09
// @namespace		http://vestitools.pbworks.com/
// @description		Displays multi-page articles on IGN as single pages
// @include			http://*.ign.com/*
// @include			http://ign.com/*
// @exclude			http://boards.ign.com/*
// @copyright		2009+, Andrew Hurle
// @version			1.0.0 12/8/09
// ==/UserScript==

//Original but currently broken version that I don't like:
//http://userscripts.org/scripts/show/1377
//IGN - Single Page View
//by Julien Couvreur


//Mine: 

//If you go to page x of an article, it will get all of the next pages
//no iframes yay
//Unfortunately, it leaves the little latest media section on the right
//I could get rid of it, but it's too much of a pain atm

//1. Get new page with XHR
//2. Put response into temporary element and filter out malicious stuff
//3. Insert after last articleBody


var href = window.location.href;

//Gets the given page and injects it, recurses to get moar pages as necessary
function getNextPage(p) {
	
	GM_log('IGN SP 09 - Getting page ' + p + ', ' + href.replace(/(\d+)p(\d+)/i, '$1p'+p));
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: href.replace(/(\d+)p(\d+)/i, '$1p'+p),
		headers: {
			'User-agent': navigator.userAgent,
			'Accept': 'text/html, text/plain',
			},
		onload: function(details) {
			//if this is a valid page that gave us a valid response (it will always try to fetch one more than it should)
			if(good(details.status)) {
				var dt = details.responseText;
				
				var thatArticle = getBody(dt, p);
				if(!thatArticle) return;
				
				var thisArticle = document.getElementsByClassName("articleBody");
				if(!thisArticle[0]) return;
				thisArticle = thisArticle[thisArticle.length-1];

				thisArticle.parentNode.insertBefore(thatArticle, thisArticle.nextSibling);
				
				getNextPage(p+1);
				}
			}
		});
	
	}
	
//returns the current page number of the article
function isArticle(t) {
	var m = t.match(/\/articles\/.*p(\d+)\.htm(l)?/);
	if(m) return m[1];
	return 0;
	}
	
//string/1 is an easy parseInt()
var start = 0, mult;
//if we're in an article and there are multiple pages
if((start = isArticle(href)) && (mult = document.getElementsByClassName("ui-page-list")[0])) getNextPage(start/1+1);
//GM_log(start);
	
//consumes an HTTP status code
//returns true if it's considered good
function good(n) { return n==304 || n >= 100 || n < 300; }

//consumes text of an xhr response
//produces document fragment with the text's article body
//p is the page number, used for little title element
//no p given, no title element added
function getBody(text, p) {
	
	//chop text down to only the contents of center column
	//so we don't have to make unnecessary nodes with innerHTML
	var y, x = text.indexOf('<!-- START main content -->');
	x = text.indexOf('class="content"', x);
	if(x==-1) return null;
	x = text.indexOf('>', x)+1;
	if(x==-1) return null;
	y = text.indexOf('<!-- END: main article content -->',x);
	if(y==-1) return null;
	y = text.lastIndexOf('</div>', y);
	if(y==-1) return null;
	
	text = text.slice(x,y);
	
	var frag = document.createDocumentFragment();
	var temp = document.createElement('div');
	
	temp.innerHTML = text;
	var article = temp.getElementsByClassName("articleBody")[0];
	
	if(!article) return null;
	
	//remove paginator
	var pgs = article.getElementsByClassName("ui-page-list");
	if(pgs) pgs[0].parentNode.removeChild(pgs[0]);
	
	removeAds(article);
	//at one point I thought IGN was hiding crazy crap in comments that was read with javascript already on the page
	//and that's why ads were breaking out.  Turns out I just screwed up removeAds.  Leaving here for fun, but function is gone now
	//removeComments(article);
	
	//alert(article.innerHTML);
	
	//Add little page indicator
	if(p) {
		var title = document.createElement("div");
		title.className = "inlineImageCaption";
		var s = '<br><b>Page ' + p + '</b>';
		title.innerHTML = s;
		article.insertBefore(title, article.firstChild);
		}
	
	//put article in fragment, return fragment
	frag.appendChild(article);
	return frag;
	
	}
	
//IGN likes to hide naughty things in articles that redirect the page to ads
//when content is inserted
//remove them from the given node
function removeAds(that) {
	
	var targets, thisTarget, nonos = ["link", "script", "noscript", "iframe", "noembed"];
	
	for(i=0, len=nonos.length; i<len; i++) {
		targets = that.getElementsByTagName(nonos[i]);
		
		for(j=0, ln=targets.length; j<ln; j++){
			thisTarget = targets[j];
			
			thisTarget.parentNode.removeChild(thisTarget);
			//since there will be one less childnode, move index back and shrink length
			j--;
			ln--;
			}

		}
	
	}