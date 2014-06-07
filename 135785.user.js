// ==UserScript==
// @name           TPB Link Redirector
// @namespace      http://userscripts.org/users/437040
// @description    Redirects Links for The Pirate Bay's .se domain through a proxy.
// @include        http*://*
// @exclude        http*://thepiratebay.se.ipv4.sixxs.org/*
// @version        0.1
// ==/UserScript==


//use this variable below to change your proxy, DO NOT include http or www.
//example malaysiabay.org
//http://about.piratereverse.info/proxy/list.html
var proxySite = 'SET THIS TO YOU PROXIES ADDRESS';


function get_anchors(){
       var anchors = new Array();
       var elms = document.getElementsByTagName('a');
       for(var i=0; i<elms.length; i++){
            if(elms[i].href) anchors.push(elms[i]);
       }
       return anchors;
    }

var allLinks, thisLink;
allLinks = get_anchors();

for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];
	
    if (thisLink.href.match('www.thepiratebay.pe')) {
		thisLink.href = thisLink.href.replace('www.thepiratebay.pe', proxySite);
	}
	
	else if (thisLink.href.match('thepiratebay.pe')) {
		thisLink.href = thisLink.href.replace('thepiratebay.pe', proxySite);
	}
}

/*var url = window.location.href;

if(url.indexOf("http://www.")==0) {
window.location.replace(location.href.replace(url.substring(0,11), "http://hi-in."));
}*/