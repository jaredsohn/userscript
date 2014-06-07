// ==UserScript==
// @name           Bing
// @namespace      localhost
// @description    Adds alternate links to other web and image search engines.
// @include        http://www.bing.*/search*
// @version       1.0
// ==/UserScript==

if(window.location.pathname.indexOf("\/images/")==0){
	results = document.getElementById("sw_main").firstChild.nextSibling;
	other = document.createElement('div');
	other.setAttribute("style", "width: 1000px; font-size: small; margin: 5px 0 5px 10px; position: relative; display: block; z-index: 3;");
	document.getElementById("mm_header").setAttribute("style", "font-size: small; top: -1px; display: block; position:relative; z-index: 3;");
	document.getElementById("scroll_panel").style.top = "45px";
	query = window.location.href.match(/\?q=[^&]*/gi)[0].substr(3);
	query = query.replace(/\+filterui%3[^&^+]*/gi,"");
	query2 = query.replace(/\+/g," ");
	links = "Try your search on " +
			"<a href =\"http://images.google.com/images?q=" + query + "\">Google</a>, " +
			"<a href =\"http://images.search.yahoo.com/search/images?p=" + query + "\">Yahoo</a>, " +
			"<a href =\"http://www.flickr.com/search/?q=" + query + "\">Flickr</a>, " +
			"<a href =\"http://photobucket.com/images/" + query + "\">Photobucket</a>, " +
			"<a href =\"http://www.picsearch.com/search.cgi?q=" + query + "\">PicSearch</a>, " +
			"<a href =\"http://pictures.ask.com/pictures?q=" + query + "\">Ask</a>, " +
			"<a href =\"http://www.alltheweb.com/search?cat=img&q=" + query + "\">AllTheWeb</a>";
	other.innerHTML = links;
	results.parentNode.insertBefore(other, results);
	setTimeout(function() {
		document.getElementById("scroll_panel").style.top = "45px";
	}, 300);
} else if(window.location.pathname.indexOf("\/search")==0){
	results = document.getElementById("results_area");
	other = document.createElement('div');
	other.setAttribute("style", "width: 1000px; font-size: small; margin: -10px 0px 5px 15px;");
	query = window.location.href.match(/\?q=[^&]*/gi)[0].substr(3);
	query = query.replace(/\+filterui%3[^&^+]*/gi,"");
	links = "Try your search on " +
			"<a href =\"http://www.google.com/search?q=" + query + "\">Google</a>, " +
			"<a href =\"http://search.yahoo.com/search?p=" + query + "\">Yahoo</a>, " +
			"<a href =\"http://web.ask.com/web?q=" + query + "\">Ask</a>, " +
			"<a href =\"http://www.wolframalpha.com/input/?i=" + query + "\">WolframAlpha</a>, " +
			"<a href =\"http://twitter.com/search?q=" + query + "\">Twitter</a>";
	other.innerHTML = links;
	results.parentNode.insertBefore(other, results);
}
