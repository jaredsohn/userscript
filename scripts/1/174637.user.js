// ==UserScript==
// @name        TT-RSS Colorful Listview
// @namespace   http://tt-rss.colorful.listview
// @description Colorizes items headers based on their source
// @include     http*://*/tt-rss/*
// @include     http*://*/ttrss/*
// @version     2013-07-30
// @updateURL   http://userscripts.org/scripts/source/174637.user.js
// @author      Kenijo
// ==/UserScript==

var colors = {};

function $x(query, context) {
    return document.evaluate(query, (context || document), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function computeColor(title) {
    var h = 0;
    
    for each (var c in title) {
        h += c.charCodeAt(0);
    }
    h = h % 360;
    
    colors[title] = h;
    
    return h;
}

function alertAncestorsUntilID(node, id) {
    var parent = node;
    while(parent.id != id) {
    	parent = parent.parentNode;
    	alert(parent.id);
    }
}

(function() {      
    var timeline = document.getElementById("headlines-frame");
    timeline.addEventListener("DOMNodeInserted", function() {
        try {
            //var author = timeline.getElementsByClassName("author");
            //timeline.removeChild(author);      
            
            var node = timeline.getElementsByClassName("author");           
            if (node[0].parentNode != null) {
                node[0].parentNode.removeChild(node[0]);
            }
            
            var article = $x("//div/div[@class='cdmHeader'][not(@colored)]", timeline);          
            if (article == null) { 
                return;
            }
            
            var titleAtt = $x("//div/div[@class='cdmHeader'][not(@colored)]/div[@class='hlFeed']/a", article)
            var title = titleAtt.textContent;
            title = title.replace(/\W/g, "-");
                                               
            article.setAttribute("colored", title);
            
            if (colors[title] == undefined) {
                var color = computeColor(title);
                
                GM_addStyle(
                    "div[colored='" + title + "'] { background: hsl(" + color + ",70%,80%) !important; }" +
                    " div[colored='" + title + "']:hover { background: hsl(" + color + ",90%,85%) !important; }");
            }
            
        } catch (e) {
        }     
        
    }, false);
    
})();