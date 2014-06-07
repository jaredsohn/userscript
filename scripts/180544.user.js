// ==UserScript==
// @name            Nofollow display
// @namespace       http://speed.insane.com/files
// @description     Styles nofollow links red
// @include         *
// ==/UserScript==

(function () {

    var re = /nofollow/i;  
    var candidates = document.getElementsByTagName("a");

    for (var cand = null, i = 0; (cand = candidates[i]); i++) 
    {
        if (re.test(cand.getAttribute("rel")))
        {
        	theStyle = cand.getAttribute("style");
        	if(theStyle == null)
        		theStyle = "";
        	else 
        		theStyle += ";";
        	theStyle += "color;yellow;";
        	cand.setAttribute("style",theStyle);
        }
    }

})();