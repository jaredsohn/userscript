// ==UserScript==
// @name           NFO Assistant
// @namespace      
// @include        http://*

// ==/UserScript==
// version                     0.02 07 Aug 2009
var local_version = new Number(0.02);

find_nfo_links();

function find_nfo_links(){
	var regex_nfo = /\/readnfo\,/gi;
	var links = document.getElementsByTagName('a');

    var xpathotherlinks = "//a[contains(@href,\'" +"readnfo,"+ "\')]";
    var allLinks, thisLink;
    allLinks = document.evaluate( xpathotherlinks,    document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var ii = 0; ii < allLinks.snapshotLength; ii++) {
      	var thisLink = allLinks.snapshotItem(ii);
    	thisLink.style.backgroundColor = "blue";
    	
    	var btn = document.createElement('btn');
    	thisLink.parentNode.insertBefore(btn, thisLink.nextSibling);
    	btn.id = "nfo_" + ii;
    	btn.innerHTML = "<button style='font-size:75%' type=button >View NFO</button>";
    	btn.setAttribute("nfo_url", thisLink.href);
		//btn.addEventListener("click", nfo, true);
		nfo(btn);
    }
}

function nfo(btn){
	//var btn = document.getElementById(this.id);
	var nfo_url = btn.getAttribute('nfo_url');

    GM_xmlhttpRequest({
        method: "GET",
        url: nfo_url,
        headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
        data:'',
        onload:function(result) {
            var res = result.responseText;
            btn.innerHTML = "<pre>" + res + "</pre>";
        }
    });
}