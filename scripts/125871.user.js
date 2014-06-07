// ==UserScript==
// @name           nzbmatrix IMDB ratings
// @author         nekz
// @description    Adds imdb movie rating
// @include        *nzbmatrix.com*
// @version        1.1
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head').item(0);
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.imdbrating { font-family:Tahoma; font-size:9px; background:#FDD017; padding:1px 2px;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px; vertical-align:text-top; }');

var links = document.links;

for (i = 0; i < links.length; i++) { 

	if (links[i].href.indexOf("/title/") != -1 && links[i].href.indexOf("imdb.com") != -1){
	
		fullurl = links[i].href;
		full = fullurl.toString();
		imdburl = full.split('url=');

		GM_xmlhttpRequest({
			method: 'get',
			url: imdburl[1],
			onload: function (i) {return function(result) { 
			
			rating = result.responseText.match(/<span itemprop="ratingValue">(.*)<\/span>/);
					
			newdiv = document.createElement("a");
			newdiv.innerHTML = rating[1].substring(0,3);
			links[i].className = "imdbrating";
			links[i].innerHTML = newdiv.innerHTML;

			}}(i)
		});
	}
}