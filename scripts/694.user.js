// ==UserScript==
// @name            Trenitalia Link Fixer
// @namespace	  http://dunck.us/code/greasemonkey
// @description     Fixes wrong links in Trenitalia (Italy's public railways) website (onclick="javascript:location.href('...'))
// @include http://orario.trenitalia.com/*
// @include http://orario.trenitalia.it/*
// ==/UserScript==

(function () {

    var candidates = document.getElementsByTagName("input");

    for (var cand = null, i = 0; (cand = candidates[i]); i++) {
	    if (cand.getAttribute("onclick") != null && cand.getAttribute("onclick").toLowerCase().indexOf("javascript:location.href(") == 0) {
			var inizio = cand.getAttribute("onclick").indexOf("'");
			var fine = cand.getAttribute("onclick").lastIndexOf("'");
			var link =  cand.getAttribute("onclick").substring(inizio+1,fine);
                cand.setAttribute("onclick", "javascript:location.href=\"" + link + "\"");
		   
            
        }
    }

})();