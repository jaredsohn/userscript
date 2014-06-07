// ==UserScript==
// @name           Torrentz kickasstorrents & h33t Url Changer
// @description    Simply replaces the kickasstorrents & h33t URL to the proxy version URL. Can be used to trick firewalls that have blocked the original URL
// @include        http://www.torrentz.eu/*
// @include        http://torrentz.eu/*
// @include        https://www.torrentz.eu/*
// @include        https://torrentz.eu/*
// @version        1.0
// ==/UserScript==


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
	
    if (thisLink.href.match('www.kickasstorrents.com')) {
		thisLink.href = thisLink.href.replace('www.kickasstorrents.com', 'www.kickassunblock.info');
	}

	if (thisLink.href.match('h33t.com')) {
		thisLink.href = thisLink.href.replace('h33t.com', 'h33tunblock.info');
	}	
}

var url = window.location.href;

if(url.indexOf("http://www.")==0) {
window.location.replace(location.href.replace(url.substring(0,11), "http://hi-in."));