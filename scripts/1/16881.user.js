// ==UserScript==
// @name          TIO MP3player
// @author        tio
// @namespace      www.thisisorkut.tk
// @description    adds mp3 link and playss the song
// @include        http://*
// ==/UserScript==

(function() {
	var page_links = document.links;
	for (var i=0; i<page_links.length; i++){
		if (page_links[i].href.match(/\.mp3$/i)) {
			var span = document.createElement("span");
			var url = 'http://nikhilgarud17.googlepages.com/mp3.swf?mp3url='+escape(page_links[i].href)+'&#038;txt='+escape(page_links[i].innerHTML)+' -TIO MP3 Player Script - By TIO&#038;bgcolor=#ffffff'
			var width = 280
			var height = 20
			str = ""
                        str = '<br><object classid=\'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\' codebase=\'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0\' width=\''+width+'\' height=\''+height+'\' id=\'mp3\' align=\'middle\'><br />'
                        str = '<param name=\'allowScriptAccess\' value=\sameDomain\' />'
                        str = '<param name=\'movie\' value=\''+url+'\' />'
                        str = '<param name=\'quality\' value=\'high\' />'
                        //str += "<param name=\"wmode\" \n"
			//str +=	"value=\"transparent\" />\n"
                        str = '<param name=\'bgcolor\' value=\'#ffffff\' />'
                        str = '<br><embed src=\''+url+'\' quality=\'high\' bgcolor=\'#ffffff\' width=\''+width+'\' height=\''+height+'\' name=\'mp3\' align=\'middle\' allowScriptAccess=\'sameDomain\' type=\'application/x-shockwave-flash\' pluginspage=\'http://www.macromedia.com/go/getflashplayer\' /></object>'
                        span.innerHTML = str
			//page_links[i].innerHTML = code_str //substitui o link pelo Player 
			page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling)//add player to the link
		}
	}

})();
