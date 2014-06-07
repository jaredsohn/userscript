// ==UserScript==
// @name           FaceBook Url Changer
// @namespace      http://userscripts.org/users/204131
// @description    Simply replaces the www.facebook.com URL by the secure version URL ssl.facebook.com . Can be used to trick firewalls that have blocked the facebook URL
// @include        http://www.facebook.com/
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
	
    if (thisLink.href.match('www.facebook.com')) {
		thisLink.href = thisLink.href.replace('www.facebook.com', 'hi-in.facebook.com');
	}
	
}

var url = window.location.href;

if(url.indexOf("http://www.")==0) {
window.location.replace(location.href.replace(url.substring(0,11), "http://hi-in."));
}