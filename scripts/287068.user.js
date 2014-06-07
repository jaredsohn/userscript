// ==UserScript==
// @name       appy-geek url redirector
// @author         Pirlouwi
// @version        0.1
// @namespace      http://
// @description  Redirect appy-geek article to original article
// @match      http://www.appy-geek.com/Web/ArticleWeb.aspx?*
// @updateURL      http://userscripts.org/scripts/show/287068
// @download       http://userscripts.org/scripts/show/287068
// ==/UserScript==

(function () {
	var timer;
    
    function appygeekredirector(e) {
        clearInterval(timer);
    	a=document.getElementById("HyperLinkOriginal");
		href=a.href;
        document.location.href = href;
    }
        
    document.addEventListener('DOMNodeInserted', appygeekredirector);
    
})();
