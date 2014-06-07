// ==UserScript==
// @name          GoogleDifferent
// @description   Add different search engines.
// @include       *encrypted.google.*
// @version		1.20101210
// ==/UserScript==

positionLinks = function (event) {
	if(document.getElementById("GoogleDifferent")) { return;	}
	var results;
	try{
		results = document.getElementById("resultStats").parentNode;
	} catch (e) { return; }
	DiferentEngines = document.createElement('div');
    var strReplaceAll = window.location.href;
    var gy = strReplaceAll.split("&");
    for (i=0;i<gy.length;i++) {
        ft = gy[i].split("=");
        if (ft[0] == 'q') {
            var strReplaceAll = ft[1];
        }
    }

	DiferentEngines.setAttribute("style", "width: 600px; display: block; font-size: 18px;");
	links = '<a href="http://www.google.com/images?q='+strReplaceAll+'">' + 'Imágenes</a>, ' +
            '<a href="http://picasaweb.google.com/lh/view?q='+strReplaceAll+'">' + 'Picasa</a>, ' +
			'<a href="http://www.bing.com/search?q='+strReplaceAll+'&go=&form=QBLH&filt=all">' + 'Bing</a>, ' +
			//~ '<a href="http://www.google.es/custom?hl=es&client=pub-6128671125211971&cof=FORID%3A1%3BGL%3A1%3BS%3Ahttp%3A%2F%2Fwww.infojardin.com%3BL%3Ahttp%3A%2F%2Fwww.infojardin.com%2Freforma-home%2Fvolver-infojardin.gif%3BLH%3A26%3BLW%3A215%3BLBGC%3AECF2ED%3BT%3A%23333333%3BLC%3A%230000ff%3BVLC%3A%23663399%3BGFNT%3A%237077bc%3BGIMP%3A%237077bc%3BDIV%3A%23006667%3B&domains=infojardin.com%3Bwww.infojardin.net&channel=6161809398&flav=0000&sig=2DDoap1mf7QCRuY4&ie=ISO-8859-1&oe=ISO-8859-1&q='+strReplaceAll+'&btnG=Buscar&sitesearch=infojardin.com&meta=">' + 'Infojardin</a>, ' +
			'<a href="http://foofind.com/es/search/?q='+strReplaceAll+'&submit=Buscar&src=wftge">' + 'Foofind</a>, '+
			'<a href="http://search.yahoo.com/search?p='+strReplaceAll+'">' + 'Yahoo</a>, ' +
			'<a href="http://www.flickr.com/search/?q='+strReplaceAll+'">' + 'Flickr</a>, '+
			'<a href="https://search.twitter.com/search?lang=es&q='+strReplaceAll+'">' + 'Twitter</a>, '+
			'<a href="https://duckduckgo.com/?q='+strReplaceAll+'">' + 'DuckDuckGo</a>';
	DiferentEngines.innerHTML = links;
	DiferentEngines.id = "GoogleDifferent";
	results.parentNode.insertBefore(DiferentEngines, results.nextSibling);
	return;
}

document.addEventListener('DOMAttrModified', function (event) {positionLinks(event);}, false);
document.addEventListener('DOMNodeInserted', function (event) {positionLinks(event);}, false);
return;
