// ==UserScript==
// @name        Feedly Colorful Listview and Tweaks
// @namespace   http://feedly.colorful.listview.and.tweaks
// @description Colorizes items headers based on their source and tweaks for the entry only view for better readability.
// @version     2014-01-11
// @updateURL   http://userscripts.org/scripts/source/248261.user.js
// @author      Kenijo
// @include     http*://*feedly.com/*
// @grant       GM_addStyle
// @run-at      document-end
// ==/UserScript==

(function () {    
    var colors = {};
    
    function $x(query, context) {
        return document.evaluate(query, (context || document), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    
    function computeColor(colorID) {
        var str = colorID.substring(0, 100);
        var h = "";
        for each(var c in str) {
            h += c.charCodeAt(0);
        }
        h = h % 360;
        colors[colorID] = h;
        return h;
    }
    
    function colorizeListview() {
        try {
            var uncoloredEntry = $x("//div[@class='u0Entry '][not(@colored)]", document);
            if (uncoloredEntry === null) return;
            
            // Remove summary
            var summary = $x("//div[@class='u0Entry '][not(@colored)]//span[@class='u0Summary']", uncoloredEntry);
            if (summary !== null) summary.parentNode.removeChild(summary);
            
            // Remove recommendation count
            var nbrRecommendations = $x("//div[@class='u0Entry '][not(@colored)]//span[@class='nbrRecommendations ']", uncoloredEntry);
            if (nbrRecommendations !== null) nbrRecommendations.parentNode.removeChild(nbrRecommendations);
            
            // Keep title black
            var title = $x("//div[@class='u0Entry '][not(@colored)]//span[@class='sourceTitle']/a", uncoloredEntry);
            if (title !== null) title.setAttribute("style", "color: #000;");
            
            // Add id to colorize the entry
            var dataURI = $x("//div[@class='u0Entry '][not(@colored)]//span[@class='sourceTitle']//a", uncoloredEntry).attributes["data-uri"].value.split("subscription/feed/")[1];
            var dataSource = $x("//div[@class='u0Entry '][not(@colored)]/div[@class='condensedTools']/a[2]", uncoloredEntry).attributes["data-source"].value;           
            var colorID = dataSource + "_" + dataURI;
            colorID = colorID.replace(/\s/g, "");
            uncoloredEntry.setAttribute("colored", colorID);
            
            if (colors[colorID] === undefined) {
                var color = computeColor(colorID);
                GM_addStyle(
                    "div[colored='" + colorID + "'] {background: hsl(" + color + ", 70%, 80%) !important; }" +
                    "div[colored='" + colorID + "']:hover {background: hsl(" + color + ", 90%, 85%) !important; }"
                );
            }
        } catch (e) {}
    }
    
    document.addEventListener("DOMNodeInserted", colorizeListview, false);   
})();        