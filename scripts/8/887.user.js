// ==UserScript==
// @name          Inline Mp3 Player
// @description	  Replace every link to mp3 file on page with a tiny inline player button to hear without leave the page.
// @namespace     http://musicplayer.sourceforge.net/greasemonkey
// @include       *
// @include       http://webjay.org/*
// @include       http://www.webjay.org/*
// @include       http://3hive.org/*
// @include       http://www.3hive.org/*
// @include       http://mysteryandmisery.com/*
// @include       http://www.mysteryandmisery.com/*
// @include       http://sixeyes.blogspot.com/*

//by Fabricio Zuardi (http://www.hideout.com.br)
// ==/UserScript==

(function() {
	var code_str = "";
	
	var page_links = document.links;
	var abs = 0;
	var hasbeen = false;
	var span;
	for (var i=0; i<page_links.length; i++){
		if (page_links[i].href.match(/\.mp3$/i)) 
		{
			var lURL =  page_links[i].href.toString().split("/");
			var url = "file:///C:/Programme/Mozilla Firefox/plugins/musicplayer.swf?&b_colors=7F0000,009D00,003FFF,FF0000&song_url="+escape(page_links[i].href)+"&song_title="+escape(lURL[lURL.length-1]);
			var width = 17;
			var height = 17;

			if(!hasbeen)
			{
				span = document.createElement("div");
				span.id = "spmp3";
				code_str += "<div style=\"font:8pt sans-serif;color:#000000;margin:20px;\">MP3 List";
				code_str += "<table width=\"1\" border=\"0\" style=\"background-color:#FFFFFF;opacity:0.5;padding:3px;border:2px solid grey;\">";
				hasbeen = true;
			}
			
			code_str += "<tr><td>";
			

			code_str += " <object type=\"application/x-shockwave-flash\"\n";
			code_str += "data=\""+url+"\" \n";
			code_str += "width=\""+width+"\" height=\""+height+"\" style=\"z-index:99\">\n";
			code_str += "<param name=\"movie\" \n";
			code_str += "value=\""+url+"\" />\n";
			code_str += "<param name=\"wmode\" \n";
			code_str +=	"value=\"transparent\" />\n";
			code_str += "</object>\n";
			code_str += "</td><td>";
			
			var namestr = unescape(lURL[lURL.length-1]);
			
			while(1)
			{
				var newstr = namestr.replace(" ", "&nbsp;");
				if(newstr == namestr)
					break;
				namestr = newstr;
			}
			code_str += "<p style=\"font:8pt sans-serif ;color:#888888;letter-spacing:0.001em;\">";
			code_str += namestr;
			code_str += "</p>";
			code_str += "</td></tr>";
			
		}
	}
	if(hasbeen)
	{
		code_str += "</table></div>";
		

		span.innerHTML = code_str;
		page_links[0].parentNode.insertBefore(span, page_links[0].nextSibling)

		document.getElementById("spmp3").style.position = "fixed";
		document.getElementById("spmp3").style.left = "0";
		document.getElementById("spmp3").style.top = "0";
		document.getElementById("spmp3").style.zindex = "50";
	}

})();