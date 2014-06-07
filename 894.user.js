// ==UserScript==
// @name          Bloglines Sidebar Squeezer
// @namespace     http://www.allpeers.com/blog/greasemonkey
// @description		Squeezes the feeds in the Bloglines side panel so that as many as possible are visible at once
// @include       http://www.bloglines.com/myblogs_subs*

// ==/UserScript==

(function() {
	if (document.title == "Bloglines | My Blogs")
	{
		document.body.style["font"] = "x-small/1.2em Verdana, Arial, Helvetica, sans-serif;";
		
		var divs = document.getElementsByTagName("div");
		var menudiv = null;
		var i;
		for(i = 0; i < divs.length; i++) {
			var divclass = divs[i].getAttribute("class");
			if (divclass == "header-list" || divclass == "tabs")
				divs[i].style["display"] = "none";		  
			else if (divclass == "hnav")
					menudiv = divs[i].parentNode.removeChild(divs[i]);
			else if (divclass == "account" && menudiv != null)
				divs[i].parentNode.insertBefore(menudiv, divs[i]);
		}
		
		var tables = document.getElementsByTagName("table");
		tables[0].setAttribute("cellpadding", "0");

		var imgs = document.getElementsByTagName("img");
		for(i = 0; i < imgs.length; i++) {
			imgs[i].setAttribute("height", "13");
		}
	}
})();