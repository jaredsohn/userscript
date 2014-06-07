// ==UserScript==
// @name           tvspielfilm
// @namespace      tag:neokolor@gmx.de,2011-05-03:leobm
// @include        http://www.tvspielfilm.de/*
// @version        20110501 0.2
// ==/UserScript==

(function(d) {

var abouts = query(d,'.about');
for each (var about in abouts) {
	var an = query(about,'a');
	var tmpTitle = (an.length>0 && an[0].textContent || '');
    var pn = query(about,'p');
	var tmpGenreYear = (pn.length>0 && pn[0].textContent || '');
	var year = tmpGenreYear.match(/\d{4}/);
	if (year) {
		var url = 'http://www.imdbapi.com/?t='+tmpTitle+'&y='+year;
		getJSON(url,bind(about, function(movieInfo) {
			if (movieInfo['Title']) {
				showMovieInfo(this, movieInfo);
			}
		}));
		var urlYoutubeSearch = 'http://gdata.youtube.com/feeds/api/videos?q='+tmpTitle+'&format=5&max-results=1&v=2&alt=jsonc';
		getJSON(urlYoutubeSearch, bind(about, function(youtubeInfo) {		
			if (youtubeInfo['data'] && youtubeInfo['data']['items'] && youtubeInfo['data']['items'][0] ) {
				showYoutubeInfo(this, youtubeInfo);
			}
		}));
		getDOC("http://de.wikipedia.org/w/api.php?action=opensearch&search="+tmpTitle+"&format=xml&limit=1", bind(about, function(doc) {	
			var un = query(doc,'Url');
			var wikipediaUrl = (un.length>0 && un[0].textContent || null);
			if (wikipediaUrl) {
				showWikipediaInfo(this, wikipediaUrl);
			}
		}));
	}		
}
var showWikipediaInfo = function(aboutEl, wikipediaUrl) {
	var cssPathOfAboutEl = cssPath(aboutEl);
	appendJavascript(
		"var wiEl = document.createElement('a');"
		+"wiEl.setAttribute('href', '"+wikipediaUrl+"');"
		+"wiEl.setAttribute('target', '_blank');"
		+"wiEl.setAttribute('style', 'display:block; width:17px; padding:1px;border:1px solid #000;');"
		+"wiEl.innerHTML = '<img src=\"http://profiles.google.com/c/favicons?domain=wikipedia.de\" border=\"0\" />"
		+ "';"
		+ "document.querySelector('"
			+cssPathOfAboutEl
		+"').appendChild(wiEl);"
	);	
};
var showYoutubeInfo = function(aboutEl, youtubeInfo) {
	var cssPathOfAboutEl = cssPath(aboutEl);
	if (!cssPathOfAboutEl) return;
	var item = youtubeInfo['data']['items'][0];
	var youtubeId =  item['id'];
	var thumbnailImage =  item['thumbnail'] && item['thumbnail']['sqDefault'] || '';
	var contentUrl =  item['content'] && item['content']['5'] || '#';
	appendJavascript(
		"try { var ytEl = document.createElement('a');"
		+"ytEl.setAttribute('href', '"+contentUrl+"');"
		+"ytEl.setAttribute('target', '_blank');"
		+"ytEl.innerHTML = '<img src=\""+thumbnailImage+"\" border=\"0\" />"
		+ "';"
		+ "document.querySelector('"
			+cssPathOfAboutEl
			+"').appendChild(ytEl);} catch(ex) {};"
	);	
};

var showMovieInfo = function(aboutEl, movieInfo) {
	var cssPathOfAboutEl = cssPath(aboutEl);
	appendJavascript(
		"try {var miEl = document.createElement('p');"		
		+ "miEl.innerHTML = '<span style=\"color:red\">Rating:"
			+ (movieInfo['Rating'] || '').replace(/'/g,"\'")
		+ "</span><br />"
		+ "<span style=\"color:#338\">Plot:"
		+ (movieInfo['Plot'] || '')
		+ "</span><br />"
		+ "<a href=\"http://www.imdb.com/title/"+movieInfo['ID']+"/\" target=\"_blank\">"
		+ "<img src=\"http://profiles.google.com/c/favicons?domain=imdb.com\" border=\"0\" />"
		+ "</a>"
		+ "';"
		+ "document.querySelector('"
			+cssPathOfAboutEl
		+"').appendChild(miEl);} catch(ex) {};"
	);
}
function getJSON(url, callback) {
	GM_xmlhttpRequest({
        method: 'GET',
        headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'application/json,text/javascript'},
        url: url,
        onload: function (responseDetails) {
        	var obj = eval('(' + responseDetails.responseText + ')');
        	callback(obj);
        }        
    });
}

function getDOC(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
       		if (/^Content-Type: text\/xml/m.test(responseDetails.responseHeaders)) {
    			var doc = new DOMParser().parseFromString(responseDetails.responseText, "text/xml");
    			callback(doc);			
			} else if (/^Content-Type: text\/html/m.test(responseDetails.responseHeaders)) {
	          var dt = document.implementation.createDocumentType("html", 
	              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
	            doc = document.implementation.createDocument('', '', dt),
	            html = doc.createElement('html');
	
	          html.innerHTML = responseDetails.responseText;
	          doc.appendChild(html);
	          callback(doc);
			}
        }
    });
}

function query(doc, selector) {
	try {
		var nodes = Array.prototype.slice.call(
   			doc.querySelectorAll(selector));
 		return nodes;	
	} catch(e){}
	return [];
}

function findImdbID(url) {
  var m = url.match(/^http:\/\/(.*\.)?imdb.com\/title\/(tt\d*)/i);
  if (m) return m[2];
  return null;
}

var appendJavascript = function(scriptCode) {
	var script = d.createElement("script");
	script.type = "application/javascript";
	script.textContent = scriptCode; 
	d.getElementsByTagName('head')[0].appendChild(script);
}

var cssPath = function(el) {
    if (!el) return;
    var path = [];
    while (el.nodeType === d.ELEMENT_NODE) {
        var selector = el.nodeName.toLowerCase();
        if (el.id) {
            selector += '#' + el.id;
            path.unshift(selector);
            return path.join(" > ");
        } else {
            var sib = el, nth = 1;
            while (sib.nodeType === d.ELEMENT_NODE && (sib = sib.previousSibling) && nth++);
            selector += ":nth-child("+nth+")";
        }
        path.unshift(selector);        
        el = el.parentNode;
    }
    return path.join(" > ");
}

function bind(scope, fn) {
    return function () {
        return fn.apply(scope, toArray(arguments));
    };
}
function toArray(obj) {
    return Array.prototype.slice.call(obj);
}

}(document));