// ==UserScript==
// @name            Nofollow display
// @namespace       http://xurble.org/userscripts
// @description     Styles nofollow links with a strike through
// @include         *
// ==/UserScript==

(function () {

	  
    var candidates = document.getElementsByTagName("a");

    for (var cand = null, i = 0; (cand = candidates[i]); i++) 
    {
        if (cand.getAttribute("rel") == "nofollow")
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