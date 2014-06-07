// ==UserScript==
// @name           Fix SW
// @namespace      http://mywebsite.com/myscripts
// @description    Fixes various problems with the SW website
// @include        http://www.stripperweb.com/*
// ==/UserScript==

	//Fix the URLs to allow Clubs & Reviews to work correclty
    var links = document.getElementsByTagName("a");
    for (var lnk = null, i = 0; (lnk = links[i]); i++) {
    	var onclick = lnk.getAttribute("href");
    	if (onclick != null) {
			if (onclick.indexOf("forum/?") > 0) {
				var test = onclick;
				onclick = onclick.replace("forum/", "stripclubs/index.php");
				lnk.setAttribute("href",onclick);
			}
		}
	}
	

	//Fix the "Go to first new post" issue - the style attribute is missing the ending quote, which throws off everything else
    var tds = document.getElementsByTagName("td");
    for (var td = null, i = 0; (td = tds[i]); i++) {
    	var cp = td.getAttribute("currentpost");
//    	GM_log(cp);
    	if (cp != null) {
    		td.setAttribute("id", "currentPost");
		}
	}
    
    //Allow clicking on Change Mood or the mood icon at the top of the page
    var mood = document.getElementById('moods');
	if (mood != null) {
		mood.setAttribute('onclick', 'javascript:var md = document.getElementById("moods_menu"); if (md.getAttribute("style").indexOf("inline") > 0) { md.setAttribute("style", "display:none;") } else {md.setAttribute("style", "display:inline;")}');
	}