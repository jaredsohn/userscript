
// Butler
// version 0.3 BETA!
// 2005-04-14
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF BUTLER, go to
// Tools/Manage User Scripts and manually uninstall the previous
// version before installing this one.  Sorry, this is a limitation
// of Greasemonkey.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "Butler", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// www.google.com (Google web search):
// - removes ads
// - adds links to other web search sites
// - in news results, adds links to other news search sites
// - in movie results, adds links to other movie review sites
// - in weather results, adds links to other weather sites
// - in product results, add links to other product search sites
//
// images.google.com (Google image search):
// - adds links to other image/photo/art search sites
//
// groups-beta.google.com (Google Groups):
// - removes ads
//
// news.google.com (Google News):
// - adds links to other news search sites
//
// froogle.google.com (Froogle):
// - removes ads
// - adds links to other product search sites
//
// answers.google.com (Google Answers):
// - removes ads
//
// print.google.com (Google Print):
// - adds links to book review sites
//
// toolbar.google.com (Google Toolbar):
// - adds links to other Firefox-friendly Google-related extensions
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Butler
// @namespace       http://diveintomark.org/projects/butler/
// @description     Link to competitors from Google search results
// @include         http://*.google.*/*
// ==/UserScript==
	
(function() {

    // CUSTOMIZE THESE TO YOUR HEART'S DELIGHT
    var ButlerServices = {

	_otherWebSearches: function(q) {
	    var s = '';
	    s += '<a href="http://search.yahoo.com/search?p=' + q + '">Yahoo</a>, ';
	    s += '<a href="http://web.ask.com/web?q=' + q + '">Ask Jeeves</a>, ';
	    s += '<a href="http://www.alltheweb.com/search?q=' + q + '">AlltheWeb</a>, ';
	    s += '<a href="http://s.teoma.com/search?q=' + q + '">Teoma</a>, ';
	    s += '<a href="http://search.msn.com/results.aspx?q=' + q + '">MSN</a>, ';
	    s += '<a href="http://search.lycos.com/default.asp?query=' + q + '">Lycos</a>, ';
	    s += '<a href="http://www.technorati.com/cosmos/search.html?url=' + q + '">Technorati</a>, ';
	    s += '<a href="http://www.feedster.com/search.php?q=' + q + '">Feedster</a>, ';
	    s += '<a href="http://www.daypop.com/search?q=' + q +'">Daypop</a>, ';
	    s += '<a href="http://www.bloglines.com/search?t=1&amp;q=' + q + '>Bloglines</a>';
	    return s;
	},

	_otherMovieReviews: function(q) {
	    var s = '';
	    s += '<a href="http://www.rottentomatoes.com/search/search.php?searchby=movies&amp;search=' + q + '">Rotten Tomatoes</a>, ';
	    s += '<a href="http://www.metacritic.com/search/process?ty=1&amp;ts=' + q + '">Metacritic</a>, ';
	    s += '<a href="http://movies.yahoo.com/mv/search?p=' + q + '">Yahoo Movies</a>, ';
	    s += '<a href="http://search.movies.go.com/movieSearch?search=' + q + '">Movies.com</a>, ';
	    s += '<a href="http://www.imdb.com/find?q=' + q + ';tt=on;mx=20">IMDb</a>';
	    return s;
	},

	_otherNewsResults: function(q) {
	    var s = '';
	    s += '<a href="http://news.search.yahoo.com/search/news/?p=' + q + '">Yahoo News</a>, ';
	    s += '<a href="http://news.ask.com/news?q=' + q + '">Ask Jeeves</a>, ';
	    s += '<a href="http://www.alltheweb.com/search?cat=news&q=' + q + '">AllTheWeb</a>, ';
	    s += '<a href="http://search.msn.com/news/results.aspx?q=' + q + '">MSN</a>, ';
	    s += '<a href="http://search.lycos.com/default.asp?tab=news&query=' + q + '">Lycos</a>, ';
	    s += '<a href="http://www.technorati.com/cosmos/search.html?url=' + q + '">Technorati</a>, ';
	    s += '<a href="http://www.feedster.com/search.php?q=' + q + '">Feedster</a>, ';
	    s += '<a href="http://www.daypop.com/search?q=' + q +'">Daypop</a>, ';
	    s += '<a href="http://www.bloglines.com/search?t=1&amp;q=' + q + '>Bloglines</a>';
	    return s;
	},

	_otherWeatherForecasts: function(q) {
	    var s = '';
	    s += '<a href="http://weather.yahoo.com/search/weather2?p=' + q + '">Yahoo</a>, ';
	    s += '<a href="http://web.ask.com/web?q=weather+' + q + '">Ask Jeeves</a>, ';
	    s += '<a href="http://channels.netscape.com/ns/weather/c_select2.jsp?where=' + q + '">Netscape</a>, ';
	    s += '<a href="http://weather.cnn.com/weather/search?wsearch=' + q + '">CNN</a>, ';
	    s += '<a href="http://asp.usatoday.com/weather/CityForecast.aspx?source=both&amp;txtSearchCriteria=' + q + '">USA Today</a>, ';
	    s += '<a href="http://www.wxforecasts.com/ameriwx/ameriwx.php?pands=' + q + '">Ameriwx</a>, ';
	    s += '<a href="http://www.wunderground.com/cgi-bin/findweather/getForecast?query=' + q + '">Weather Underground</a>';
	    s += '<br>&#x2605; Download <a href="http://forecastfox.mozdev.org/">ForecastFox</a> to get weather forecasts in your Firefox status bar';
	    return s;
	},

	_otherProductSearches: function(q) {
	    var s = '';
	    s += '<a href="http://shopping.yahoo.com/search?p=' + q + '">Yahoo Shopping</a>, ';
	    s += '<a href="http://search.mysimon.com/search?qt=' + q + '">MySimon</a>, ';
	    s += '<a href="http://shopper-search.cnet.com/search?q=' + q + '">CNET Shopper</a>, ';
	    s += '<a href="http://www.nextag.com/serv/main/buyer/OutPDir.jsp?search=' + q + '">NexTag</a>, ';
	    s += '<a href="http://www.streetprices.com/x/search.cgi?query=' + q + '">StreetPrices.com</a>, ';
	    s += '<a href="http://www.shopping.com/xFS?KW=' + q + '">Shopping.com</a>';
	    return s;
	},

	_otherImageSearches: function(q) {
	    var s = '';
	    s += '<a href="http://images.search.yahoo.com/search/images?p=' + q + '">Yahoo</a>, ';
	    s += '<a href="http://pictures.ask.com/pictures?q=' + q + '">Ask Jeeves</a>, ';
	    s += '<a href="http://www.alltheweb.com/search?cat=img&q=' + q + '">AlltheWeb</a>, ';
	    s += '<a href="http://search.msn.com/images/results.aspx?q=' + q + '">MSN</a>, ';
	    s += '<a href="http://www.picsearch.com/search.cgi?q=' + q + '">PicSearch</a>, ';
	    s += '<a href="http://www.ditto.com/searchResults.asp?ss=' + q + '">Ditto</a>, ';
	    s += '<a href="http://creative.gettyimages.com/source/classes/FrameSet.aspx?s=ImagesSearchState|3|5|0|15|2|1|0|0|1|60|ffff.ffff.ffff.ffff.ffff.ffff|1|0|' + q + '||1|0&pk=4">Getty</a>, ';
	    s += '<a href="http://www.creatas.com/searchResults.aspx?searchString=' + q + '">Creatas</a>, ';
	    s += '<a href="http://www.freefoto.com/search.jsp?queryString=' + q + '">FreeFoto</a>, ';
	    s += '<a href="http://www.webshots.com/search?query=' + q + '">WebShots</a>, ';
	    s += '<a href="http://nix.larc.nasa.gov/search?qa=' + q + '">NASA</a>, ';
	    s += '<a href="http://www.flickr.com/photos/search/text:' + q + '">Flickr</a>';
	    return s;
	},

	_otherExtensions: function() {
	    var s = '';
	    s += '<font size="-1">&#x2605; You may also be interested in these Google-related Firefox extensions:<ul>'
	    s += '<li><a href="http://quirk.co.za/searchstatus/">SearchStatus</a> displays PageRank and Alexa information in status bar</li>';
	    s += '<li><a href="http://bettersearch.g-blog.net/">BetterSearch</a> adds thumbnails and other features to search results</li>';
	    s += '<li><a href="http://www.squarefree.com/extensions/search-keys/">Search Keys</a> adds keyboard shortcuts to search results</li>';
	    s += '</ul></font>';
	    return s;
	}
    }

    var Butler = {

	// add arbitrary CSS styles to page
	addGlobalStyle: function(css) {
            var style = document.createElement("style");
	    style.type = "text/css";
            style.innerHTML = css;
            document.getElementsByTagName('head')[0].appendChild(style);
        },
       
	// remove sponsored links along top and sides
	removeSponsoredLinks: function() {
	    var aw1 = document.getElementById('aw1');
	    while (aw1) {
		var table = aw1.parentNode;
		while (table.nodeName != 'TABLE') {
		    table = table.parentNode;
		}
		table.parentNode.removeChild(table);
		// yes Virginia, some Google pages have more than one link with the same ID
		aw1 = document.getElementById('aw1');
	    }
	    
	    var tpa1 = document.getElementById('tpa1');
	    if (tpa1) {
		var p = tpa1.parentNode.parentNode.parentNode.parentNode;
		p.parentNode.removeChild(p);
	    }

	    this.addGlobalStyle('iframe[name="google_ads_frame"] { display: none ! important }');
	},
	
	// change Arial to Verdana, see http://www.ms-studio.com/articles.html
	fixTypography: function() {
	    this.addGlobalStyle('body,td,font,div,p,.p,a{font-family: Verdana, sans-serif ! important }');
	    var fonts = document.evaluate("//font[contains(translate(@face, 'ARIAL', 'arial'), 'arial')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	    var font, i;
	    for(font = null, i = 0; (font = fonts.snapshotItem(i)); i++) {
		font.face = "Verdana, sans-serif";
	    }
	},

	// add our logo at top of page, with explanatory link to embedded help page
	addLogo: function() {
	    // You would think that you could simply do this directly,
	    // instead of setting an immediate timeout to do it.
	    // And you would be wrong.  Funky unexplainable things happen.
	    window.setTimeout((function() {
		var logo = document.createElement("div");
		logo.innerHTML = '<div style="margin: 0 auto 0 auto; border-bottom: 1px solid #000000; margin-bottom: 5px; font-size: small; background-color: #000000; color: #ffffff;"><center><p style="margin: 2px 0 1px 0;">&#x2605; Enhanced by <img align="absmiddle" width="80" height="15" alt="Butler" title="" src="data:application/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAPCAIAAAD8q9%2FYAAAAjklEQVR4nOVVQQqAMAxrZP%2F%2FcjxUSsGhonEbNKcySkhIu4KklUIpwyRbVHOlDAAAM9tmyxiNcoabisgHxtJ2APA6F7kn3rsMZ0IJlAmTJBlCuw12acAZnhO%2BgCxhS5l8ZMgzYusnLGT443boEw6VMY0Xum8jdRKhc8gZl4XbLHeWyhk%2Bdlj79a%2BMEtubsQNK8W70iBeojgAAAABJRU5ErkJggg%3D%3D"> (<a id="_helplink" style="background: black; color: white;" title="Learn more about Butler, the Google enhancer" href="#">what\'s this?</a>) &#x2605;</p></center></div>';
		document.body.insertBefore(logo, document.body.firstChild);
		var a = document.getElementById('_helplink');
		a.onclick = (function() {
                    var body = document.body;
		    while (body.firstChild) {
			body.removeChild(body.firstChild);
		    }
		    var style = document.createElement("style");
		    style.type = "text/css";
		    style.innerHTML = ' \
html>body { \
  font-size: 100%; \
  font-family: Verdana, sans-serif; \
  background-color: #000; \
  color: #fff; \
} \
html>body a:link, \
html>body a:visited { \
  background-color: transparent; \
  color: #fff; \
  font-family: Verdana, sans-serif; \
} \
html>body h1 { \
  width: 100%; \
  background-color: #ffffff; \
  color: #000000; \
  font-size: 120%; \
  text-align: center; \
  margin: 0 0 0 0; \
  padding: 3px 0 3px 0; \
  font-family: Verdana, sans-serif; \
} \
html>body .main { \
  width: 500px; \
  margin: 0 auto 0 auto; \
  line-height: 120%; \
} \
html>body h2 { \
  background-color: transparent; \
  color: #ffffff; \
  font-size: 110%; \
  text-align: center; \
  border-top: 4px double #ffffff; \
  border-bottom: 4px double #ffffff; \
  font-family: Verdana, sans-serif; \
} \
html>body p, \
html>body li { \
  background-color: transparent; \
  color: #fff; \
  font-size: small; \
  font-family: Verdana, sans-serif; \
} \
html>body p.tagline { \
  text-align: center; \
  margin: 0 auto 0 auto; \
  padding: 0 0 5px 0; \
  background-color: #ffffff; \
  color: #000000; \
} \
html>body .footer { \
  text-align: center; \
} \
';
		    document.getElementsByTagName('head')[0].appendChild(style);
		    var div = document.createElement('div');
		    var s = ' \
<h1>Butler</h1> \
<p class="tagline">a Google enhancer<br>version 0.3 BETA!</p> \
<div class="main"> \
<h2>WHAT DOES IT DO?</h2> \
<ul> \
<li>removes ads on most Google pages</li> \
<li>fixes fonts on most Google pages</li> \
<li><a href="http://www.google.com/">Google web search</a>: \
<ul> \
<li>adds links to other search sites ("Try your search on...")</li> \
<li>in news results, adds links to other news sites</li> \
<li>in movie results, adds links to other movie sites</li> \
<li>in weather results, adds links to other weather sites</li> \
<li>in product results, adds links to other product sites</li> \
</ul> \
</li> \
<li><a href="http://images.google.com/">Google image search</a>: \
<ul> \
<li>adds links to other image/photo/art sites</li> \
</ul> \
</li> \
<li><a href="http://news.google.com/">Google News</a>: \
<ul> \
<li>adds links to other news sites</li> \
</ul> \
</li> \
<li><a href="http://froogle.google.com/">Froogle</a>: \
<ul> \
<li>adds links to other product sites</li> \
</ul> \
</li> \
<li><a href="http://print.google.com/">Google Print</a>: \
<ul> \
<li>Removes image copying restrictions</li> \
<li>adds links to other book sites</li> \
</ul> \
</li> \
<li><a href="http://toolbar.google.com/googlebar.html">Google Toolbar Firefox page</a>: \
<ul> \
<li>adds links to other Firefox-friendly toolbars</li> \
</ul> \
</li></ul> \
<h2>IS IT SPYWARE?</h2> \
<p>No, Butler is not spyware.  It does not track the pages you visit, display ads, hijack Amazon affiliate links, log keystrokes, steal passwords, set cookies, "phone home," or install any bundled software on your computer.  It is simply a Firefox script that modifies a few Google services in ways that I find useful.  If you don\'t like it, you can easily uninstall it.</p> \
<h2>HOW DO I UNINSTALL IT?</h2> \
<p>In the Tools menu, go to "Manage User Scripts," select Butler, and click Uninstall.  Refresh the page and Butler will be gone.  You do not need to reboot; you do not even need to relaunch Firefox.</p> \
<h2>HOW MUCH DOES IT COST?</h2> \
<p>Nothing.  Butler is Free Software, released under the GPL license.</p> \
</div> \
<hr> \
<div class="footer"> \
<p><a href="#" onclick="window.location.reload()">Return to Google</a></p> \
</div> \
';
		    div.innerHTML = s;
		    document.body.appendChild(div);
		    document.title = 'Butler Help';
                });
            }), 2);
	},
	
	// add other search sites to web search
	addOtherWebSearches: function() {
	    var header = document.evaluate("//table[@bgcolor='#e5ecf9']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    if (!header) return;
	    var q = escape(document.gs.q.value);
	    var other = document.createElement('div');
	    var s = '<p style="font-size: small">&#x2605; Try your search on ';
	    s += ButlerServices._otherWebSearches(q);
	    s += '</p>';
	    other.innerHTML = s;
	    header.parentNode.insertBefore(other, header.nextSibling);
	},

	// add other movie sites to inline movie results in web search
	addOtherInlineMovieReviews: function() {
	    var showtimes = document.evaluate("//a[contains(@href, 'oi=showtimes')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    if (showtimes) {
		var table = document.evaluate("//a[contains(@href, 'oi=showtimes')]/ancestor::table", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (!table) return;
		q = escape(document.gs.q.value);
		var other = document.createElement('div');
		var s = '<p style="font-size: small; margin: 0 0 0 40px;">&#x2605; Find more reviews at ';
		s += ButlerServices._otherMovieReviews(q);
		s += '</p>';
		other.innerHTML = s;
		table.parentNode.insertBefore(other, table.nextSibling);
	    }
	    else {
		var reviews = document.evaluate("//a[starts-with(@href, '/reviews')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var title = reviews.snapshotItem(0);
		if (!title) return;
		title = title.innerHTML;
		title = title.replace(/<b>/g, '');
		title = title.replace(/<\/b>/g, '');
		var reviewslink = reviews.snapshotItem(2);
		var div = reviewslink.parentNode;
		while (div.nodeName != 'DIV') {
		    div = div.parentNode;
		}
		var q = escape(title);
		var other = document.createElement('div');
		var s = '<p style="margin: 0; padding-bottom: 3px;">&#x2605; Find more reviews at ';
		s += ButlerServices._otherMovieReviews(q);
		s += '</p>';
		other.innerHTML = s;
		div.appendChild(other);
	    }
	},

	// add other news sites to inline news results in web search
	addOtherInlineNewsResults: function() {
	    var news = document.evaluate("//a[starts-with(@href, 'http://news.google.com/')][contains(@href, 'oi=newsr')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    if (!news) return;
	    var td = news.parentNode;
	    while (td.nodeName != 'TD') {
		td = td.parentNode;
	    }
	    td = td.parentNode.nextSibling.lastChild;
	    var q = escape(document.gs.q.value);
	    var other = document.createElement('div');
	    var s = '<div style="margin-top: 3px; font-size: small;">&#x2605; Find more news at ';
	    s += ButlerServices._otherNewsResults(q);
	    s += '</div>';
	    other.innerHTML = s;
	    td.appendChild(other);
	},

	// add other weather sites to inline weather results in web search
	addOtherInlineForecasts: function() {
	    var table = document.evaluate("//img[starts-with(@src, '/images/weather/')]/ancestor::table", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    if (!table) return;
	    var q = document.gs.q.value;
	    q = q.replace(/\s*weather\s*/ig, '');
	    q = q.replace(/\s*forecast\s*/ig, '');
	    q = escape(q);
	    var other = document.createElement('div');
	    var s = '<div style="margin-top: 7px; line-height: 140%; font-size: small;">&#x2605; Find more forecasts at ';
	    s += ButlerServices._otherWeatherForecasts(q);
	    s += '</div>';
	    other.innerHTML = s;
	    table.parentNode.insertBefore(other, table.nextSibling);
	},

	// add other product search sites to inline product results in web search
	addOtherInlineProductSearches: function() {
	    var table = document.evaluate("//a[contains(@href, 'oi=froogler')]/ancestor::table", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    if (!table) return;
	    var q = document.gs.q.value;
	    q = escape(q);
	    var other = document.createElement('div');
	    var s = '<div style="margin-left: 40px; line-height: 140%; font-size: small;">&#x2605; Find more products at ';
	    s += ButlerServices._otherProductSearches(q);
	    s += '</div>';
	    other.innerHTML = s;
	    table.parentNode.insertBefore(other, table.nextSibling);
	},

	// add other image search sites to image search
	addOtherImageSearches: function() {
	    var table = document.evaluate("//a[starts-with(@href, '/images?q=')]/ancestor::table[@width='100%'][@border='0'][@cellpadding='0'][@cellspacing='0']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    var tr = document.createElement('tr');
	    var q = escape(document.gs.q.value);
	    var s = '<td align="left"><span style="font-size: small">&#x2605; Try your search on ';
	    s += ButlerServices._otherImageSearches(q);
	    s += '</span></td>';
	    tr.innerHTML = s;
	    table.appendChild(tr);
	},

	// add other news search sites to Google News
	addOtherNewsSearches: function() {
	    var table = document.evaluate("//a[@id='r-0']/ancestor::table", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    if (!table) return;
	    var div = document.createElement('div');
	    var q = escape(document.gs.q.value);
	    var s = '<p style="font-size: small; margin: 0;">&#x2605; Try your search on ';
	    s += ButlerServices._otherNewsResults(q);
	    s += '</p>';
	    div.innerHTML = s;
	    table.parentNode.insertBefore(div, table);
	},

	// add other product search sites to Froogle
	addOtherProductSearches: function() {
	    var table = document.evaluate("//tr[@bgcolor='#ddf8cc']/ancestor::table[@width='100%'][@border='0'][@cellpadding='0'][@cellspacing='0']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    var q = escape(document.gs.q.value);
	    var other = document.createElement('div');
	    var s = '<p style="font-size: small;">&#x2605; Try your search on ';
	    s += ButlerServices._otherProductSearches(q);
	    s += '</p>';
	    other.innerHTML = s;
	    table.parentNode.insertBefore(other, table.nextSibling);
	},

	// restore normal browser functionality in Google Print
	restoreGooglePrint: function() {
	    // remove clear GIFs that obscure divs with background images
	    var cleardots = document.evaluate("//img[@src='images/cleardot.gif']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	    var cleardot, i, div, theimg;
	    for(cleardot = null, i = 0; (cleardot = cleardots.snapshotItem(i)); i++) {
		div = cleardot.parentNode;
		if (div.nodeName != "DIV") {
		    div = div.parentNode;
		}
		theimg = document.defaultView.getComputedStyle(div, '').backgroundImage;
		theimg = theimg.replace(/url\((.*?)\)/g, "$1");
		cleardot.style.border = "none";
		cleardot.src = theimg;
	    }

	    // restore right-click context menu
	    document.oncontextmenu = null;
	},
	
	// add links to book review sites in Google Print
	addOtherBookReviews: function() {
	    var froogle = document.evaluate("//a[contains(@href, 'froogle.com')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    if (!froogle) return;
	    var isbn = escape(unescape(froogle.href).split('q=')[1].split('&')[0]);
	    
	    var ac = document.createElement("a");
	    ac.href = 'http://allconsuming.net/item.cgi?isbn=' + isbn;
	    ac.style.display = "block";
	    ac.innerHTML = "<br>Reviews @<br>AllConsuming.net";
	    froogle.parentNode.insertBefore(ac, froogle.nextSibling);
	    
	    var isbnnu = document.createElement("a");
	    isbnnu.href = 'http://isbn.nu/' + isbn;
	    isbnnu.style.display = "block";
	    isbnnu.appendChild(document.createTextNode("ISBN.nu"));
	    froogle.parentNode.insertBefore(isbnnu, froogle.nextSibling);
	},

	// link to other Firefox-friendly toolbars on the "sorry you use Firefox" page of toolbar.google.com
	addOtherExtensions: function() {
	    var screenshot = document.evaluate("//img[@src='googlebar_screenshot.gif']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	    if (!screenshot) return;
	    var p = document.createElement("p");
	    p.style.textAlign = "left";
	    p.innerHTML = ButlerServices._otherExtensions();
	    screenshot.parentNode.parentNode.insertBefore(p, screenshot.parentNode.nextSibling);
	}
    }

    var href = window.location.href;

    // Google web search
    //if (href.match(/^http:\/\/www\.google\.com\/search/i)) {
    if (href.match(/^http:\/\/www\.google\.[\w\.]+\/search/i)) { // patch to make Butler work with non-US sites, thanks Matt W.
	Butler.addLogo();
	Butler.removeSponsoredLinks();
	Butler.addOtherWebSearches();
	Butler.addOtherInlineMovieReviews();
	Butler.addOtherInlineNewsResults();
	Butler.addOtherInlineForecasts();
	Butler.addOtherInlineProductSearches();
    }

    // Google image search
    //if (href.match(/^http:\/\/images\.google\.com\/images/i)) {
    if (href.match(/^http:\/\/images\.google\.[\w\.]+\/images/i)) {
	Butler.addLogo();
	Butler.removeSponsoredLinks();
	Butler.addOtherImageSearches();
    }

    // Google Groups
    //if ((href.match(/^http:\/\/groups-beta\.google\.com\/groups/i)) ||
    if ((href.match(/^http:\/\/groups-beta\.google\.com\/groups?/i)) ||
	(href.match(/^http:\/\/groups\.google\.com\/groups?/i))) {
	Butler.addLogo();
	Butler.removeSponsoredLinks();
    }

    // Google News
    //if (href.match(/^http:\/\/news\.google\.com\/news/i)) {
    if (href.match(/^http:\/\/news\.google\.[\w\.]+\/news/i)) {
	Butler.addLogo();
	Butler.addOtherNewsSearches();
    }

    // Froogle
    if (href.match(/^http:\/\/froogle\.google\.com\/froogle/i)) {
	Butler.addLogo();
	Butler.removeSponsoredLinks();
	Butler.addOtherProductSearches();
    }
    
    // Google Print
    if (href.match(/^http:\/\/print\.google\.com\/print/i)) {
	Butler.addLogo();
    	Butler.restoreGooglePrint();
	Butler.addOtherBookReviews();
    }
    
    // Google Answers
    if (href.match(/^http:\/\/answers\.google\.com\/answers/i)) {
	Butler.addLogo();
    	Butler.removeSponsoredLinks();
    }

    // Google Toolbar ("sorry you use Firefox" page)
    if (href == 'http://toolbar.google.com/googlebar.html') {
	Butler.addLogo();
	Butler.addOtherExtensions();
    }

    // all Google sites except GMail
    if (!href.match(/^http:\/\/gmail\.google\.com\//i)) {
	Butler.fixTypography();
    }

    //alert('completed Butler successfully at ' + href);

})();

/*
TODO:
- remove ads in gmail
- inline image results in web search

CHANGELOG:
0.3 - 2005-04-14 - made variables local, compatibility with Firefox 1.0.3
0.2 - 2005-03-31 - added support for non-US sites (thanks Matt W.)
0.1 - 2005-03-14 - initial release
*/

// END FILE
