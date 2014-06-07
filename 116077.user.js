// ==UserScript==
// @name           Moviemeter to CouchPotato
// @namespace      kra
// @include        http://www.moviemeter.nl/film/*
// ==/UserScript==


var couchpotato = "localhost:5000";


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head').item(0);
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.ifrm { border:none; overflow: hidden; height:45px; width:180px; position: absolute; top:154px; left:725px; }');
addGlobalStyle('.couchpotato { position: absolute !important; top:132px; left:765px; }');

if(document.location.href.indexOf('moviemeter.nl') > -1) 
{ 
	
	var releases = document.evaluate('//div[@class="options_links"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	function getfullname(link)
	{
	
			imdblink = link.getElementsByTagName("a").item(0);
			imdblink = imdblink.toString();
			
			if(imdblink.indexOf("imdb") >= 0)
			{
			imdbid = imdblink.split("/");
			var newTD = document.createElement("td");
			un2link = document.createElement("iframe");
			un2link.name = 'ifrm';
			un2link.className = 'ifrm';
			unlink = document.createElement("a");
			unlink.className ='couchpotato';
			unlink.href = 'http://'+ couchpotato +'/movie/imdbAdd/?id='+ imdbid[4];
			unlink.setAttribute("target","ifrm");
			unlink.innerHTML = "Add to CouchPotato";
			newTD.appendChild(unlink);
			newTD.appendChild(un2link);
			link.innerHTML += newTD.innerHTML;
			}
			
			
	}
	
	for (var i=0; i<releases.snapshotLength; i++)
		getfullname(releases.snapshotItem(i));		
	
}