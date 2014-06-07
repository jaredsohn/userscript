// ==UserScript==
// @name            Nofollow display
// @namespace       http://speed.insane.com/files
// @description     Styles nofollow links with a strike through
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
        	theStyle += "text-decoration:line-through;";
        	cand.setAttribute("style",theStyle);
        }
    }

})();
