// ==UserScript==
	// @name              Gallery Description Shortener
	// @namespace	        tag:shekvl@gmail.com,2013-11-11:gallery
	// @description	      Make the description in Forum Ancient Coins' galleries shortened down to the particular limit with a possibility of on-click expansion
	// @include           http://www.forumancientcoins.com/gallery/*
	// @grant       none
// ==/UserScript==

var limit = 250;

var snapCaption = document.evaluate("//*[@class='thumb_caption']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
for (var i = snapCaption.snapshotLength - 1; i >= 0; i--) {
		var elm = snapCaption.snapshotItem(i);
		var h = elm.innerHTML;
		if (h.length >= limit) {
    		
    		var rest = h.substr(limit,h.length-limit);
            
            var spoiler_or_dots = "<span id=\"spoiler"+i+"\" style=\"display:none\">"+ rest + "</span>" +
            "<span id=\"dots"+i+"\" style=\"display:all\">...</span>";
            
            var start =   "<span onclick=\"if(document.getElementById('spoiler"+i+"').style.display=='none') "+
            "{document.getElementById('spoiler"+i+"').style.display='';document.getElementById('dots"+i+"').style.display='none'}"+
            "else{document.getElementById('spoiler"+i+"').style.display='none';document.getElementById('dots"+i+"').style.display=''}\">";
            
            var end = "</span>";
       		
       		elm.innerHTML = start + h.substr(0,limit) + spoiler_or_dots + end;
    	}
}