// ==UserScript==
// @name		4chan - quick and dirty tineye hack
// @namespace		3
// @description		Adds buttons to search tineye
// @include		http://boards.4chan.org/*
// ==/UserScript==


function update() {
	var spans=document.getElementsByTagName("span");
	for (i=0; i<spans.length; i++) {
		if(spans[i].className == "filesize") {
			var check = spans[i].getElementsByClassName("tineye");
			if(check.length == 0) {
				var links = spans[i].getElementsByTagName("a");
				var tineye = "http://www.tineye.com/search?url="+escape(links[0].href);
				spans[i].innerHTML+=" <a class= \"tineye\" href=\""+tineye+"\" target=\"_blank\">Tineye</a>";
			}
		}
	}
}

setInterval(update,500);
//document.addEventListener('DOMContentLoaded', update, false); //sadly this doesn't work with updaters.
