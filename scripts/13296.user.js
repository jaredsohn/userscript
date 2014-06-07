// ==UserScript==
// @name           Cinemark + Rotten Tomatoes
// @namespace      http://everynothing.net/cinemarktomatoes/
// @description    Displays Rotten Tomatoes ratings for Cinemark movies
// @include        http://www.cinemark.com/theater_showtimes.asp?theater_id=*
// ==/UserScript==

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://i.rottentomatoes.com/syndication/rss/in_theaters.xml',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,
            "application/xml");
        var entries = dom.getElementsByTagName('item');
        var title;
        for (var i = 0; i < entries.length; i++) {
            updatemovie(
				entries[i].getElementsByTagName('title')[0].textContent, 
				entries[i].getElementsByTagName('link')[0].textContent,
				entries[i].getElementsByTagName('description')[0].textContent);
        }
	if (i == 0) alert('Rotten Tomatoes returned 0 movies.');
	
    }
});

var x, y, tds, alltds;
document.getElementsByTagName('table')[0].width='95%';


function updatemovie(xmlttl,xmlurl,xmldesc) {
	var ttl,pct;
	var anch = '', url='';
	var fontcol='';

	if ((xmlttl.indexOf('%') > 0) && (xmlttl.indexOf('%') < xmlttl.indexOf(' '))) {
		ttl = xmlttl.substr(xmlttl.indexOf('%')+2).toUpperCase();
		pct = xmlttl.substr(0,xmlttl.indexOf('%'));
		if (parseInt(pct) >= 60) {
			fontcol='FF0000';
		} else {
			fontcol='007800';
		}
	} else {
		ttl = xmlttl.toUpperCase();
		pct = '??';
		fontcol='0000FF';
	}

	var pctdiv = document.createElement('span');
	pctdiv.innerHTML='&nbsp;<a href="'+xmlurl+'" target="_blank"><font color="#'+fontcol+'">'+pct+'%</font></a>';
	var descdiv = document.createElement('span');
	descdiv.innerHTML='<br/><font size="1">'+xmldesc+'</font><br/>';

	var links = document.getElementsByTagName('a');
	for (var x = 0; x < links.length; x++) {
		if (links[x].href.indexOf('imdb.com')>0) {
			url = links[x].href.toUpperCase();
			if (url.indexOf('?') > 0) url = url.substr(url.indexOf('?')+1);
			url = url.replace(/\+/g, " ");
			anch = links[x].innerHTML;
			anch = anch.replace(/  /g, " ");

			url = url.replace(/^THE /, "");
			anch = anch.replace(/^THE /, "");
			ttl = ttl.replace(/^THE /, "");			
			if (
				(ttl.indexOf(anch) == 0) || 
				(anch.indexOf(ttl) == 0) ||
				(ttl.indexOf(url) == 0) || 
				(url.indexOf(ttl) == 0)
			) {
				links[x].parentNode.insertBefore(pctdiv,links[x].nextSibling);
				pctdiv.parentNode.insertBefore(descdiv,pctdiv.nextSibling);
				return;
			}
		}
	}
}