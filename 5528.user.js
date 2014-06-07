// ==UserScript==
// @name          AnimeMusicVideo.org Relinker
// @description   Changes links on the video download info page to point directly to the downloads, skipping the pledge/proceed page.
// @namespace     (none)
// @include       http://www.animemusicvideos.org/members/members_videoinfo.php?v=*
// by Jeremy Christian
// ==/UserScript==

(function() {
    
	var links = document.getElementsByTagName("a");
	var link = "";

	for( i=0; i<links.length; i++ ) {
		link = links[i].innerHTML.toLowerCase();		
		if(link == "local") {
			links[i].href += "&thead=yep&actionz=proceed";
		}
		else if(link == "indirect" || link == "direct") {		
			link = links[i].href.replace(/.*download.php\?v=.*d=.*url=/gi,"");
			link = link.replace(/%3A/gi,":");
			link = link.replace(/%2F/gi,"/");			
			links[i].href = link;			
		}
	}
}
)();
