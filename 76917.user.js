// ==UserScript==
// @name           View WSJ Full Article
// @namespace      http://nullpointers.wordpress.com
// @description    OUpon clicking on a WSJ search result, it opens up the full article, even without a subscription.
// @include        http://online.wsj.com/article/*
// @version        v0.9
// ==/UserScript==

(function(){
        var modifyLinks = function() {

			//get all the anchors
			var url = window.location.href;
			var urlModifier = 'WSJ_WSJ_US_News_5'				
			var strURL = url.toString();
			strURL = strURL.match(/(.+\\bmod=\b)/); 
			//window.replace(strURL + urlModifier);
                        url.href = 'http://online.wsj.com/article/SB10001424052748704614204575246563928195950.html?mod=WSJ_WSJ_US_News_5';
						
            alert("Hello, world!");
            return ;
        }
        document.addEventListener( "DOMNodeInserted", modifyLinks, false );
        modifyLinks();
})();