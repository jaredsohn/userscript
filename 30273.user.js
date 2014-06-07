// ==UserScript==
// @name           Hindu Printer Friendly Redirect
// @namespace      http://www.arunrocks.com/blog/
// @description    Redirects to a more readable version of an article
// @include        http://www.hindu.com/*
// @include        http://www.thehindu.com/*
// ==/UserScript==

(function() {
    match_re = 	/\.com\/([^s]+)stories\/([^\/]+)/;
    var redirectToPrinterFriendly = function() {
	mm = document.location.href.match(match_re)
        if ( mm != null) 
        {
            document.location.href = "http://www.hinduonnet.com/thehindu/thscrip/print.pl?file="+mm[2]+"&date="+mm[1]+"&prd=th&";
        }
    }
    
    var processArticleLinks = function() {
        var links = document.links;
        for (var i = 0; i < links.length; i++) 
        {
            articleLink = links[i];
            articleLink.target = "";
	    mm = articleLink.href.match(match_re);
            if (mm != null) 
            {
                unsafeWindow.console.info(mm[0]);
                articleLink.href = "http://www.hinduonnet.com/thehindu/thscrip/print.pl?file="+mm[2]+"&date="+mm[1]+"&prd=th&";
            }
        }
    }
    
    redirectToPrinterFriendly();
    processArticleLinks();
})();
