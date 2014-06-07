// ==UserScript==
// @name          mapping 360
// @namespace     http://brainoff.com/greasemonkey/
// @description	  insert a worldkit blog map on 360!
// @include       http://*360.yahoo.com/*


// ==/UserScript==

(function() {
  

  function insertMapAndLink() {
     var l = document.location.href;
     if (l.indexOf("-") == -1) { return; }
     var start = l.indexOf("-") + 1;
     var end = l.indexOf("?");
     var hash;

     if (end != -1) { hash = l.substring(start, end); } else { hash = l.substring(start); }

     var dataurl = "http://brainoff.com/greasemonkey/get.pl?http://blog.360.yahoo.com/rss-" + hash;
     var mapurl = "http://blog.360.yahoo.com/blog-" + hash + "?#map";
     var blogurl = "http://blog.360.yahoo.com/blog-" + hash;

     var divs = document.getElementsByTagName("div");

     for (var i=0; i < divs.length; i++) {
	if (document.location.href.indexOf("#map") != -1) {
	 if (divs[i].id == "ymgl-blog") {
		var worldkiturl = "http://brainoff.com/worldkit/res/worldkit.swf?confurl=&window=_self&dataurl=" + dataurl + "&showload=true&toolbar=true&controlscale=70&plotinterval=0&textinterval=0&zoomselect=true&plotshape=circle&restingplotcolor=0xff0000&locfield=description&width=600&height=300&displaytype=day&dayimg=http://brainoff.com/worldkit/res/day.jpg&update=0";
		divs[i].innerHTML = "<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\"600\" HEIGHT=\"300\" id=\"worldkit\"><param NAME=movie VALUE=\"" + worldkiturl + "<param NAME=quality VALUE=\"high\"><param NAME=bgcolor VALUE=\"#000000\"><embed src=\"" + worldkiturl + "\" quality=\"high\" bgcolor=\"#000000\" WIDTH=\"600\" HEIGHT=\"300\" NAME=\"worldkit\" ALIGN=\"\" TYPE=\"application/x-shockwave-flash\" swLiveConnect=\"true\" PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></embed></object>";
		break;
	 }
	}
	
	if (divs[i].id == "ymgl-profile") {
		var p = divs[i].getElementsByTagName("p");
		var content = p[0].innerHTML;
		if (l.indexOf("?#map") != -1) {
			var tmp = content.split("Blog");
			p[0].innerHTML = tmp[0] + "<a href=\"" + blogurl + "\">Blog</a>" + tmp[1]
				 + "&nbsp;|&nbsp;Map";
		} else {
			p[0].innerHTML = content + "&nbsp;|&nbsp;<a href=\"" + mapurl + "\">Map</a>";
		}
	}
     }
  }

  insertMapAndLink();

})();
