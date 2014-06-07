// ==UserScript==
// @name        Feedly Colorful Listview and Tweaks (read/unread version)
// @namespace   http://feedly.colorful.listview.and.tweaks.read.unread
// @description Colorizes items headers based on their source and tweaks for the entry only view for better readability. Contains a read/unread color changing code.
// @version     2014-01-11
// @updateURL   http://userscripts.org/scripts/source/238919.user.js
// @author      Kenijo
// @include     http*://*feedly.com/*
// @grant       GM_addStyle
// @run-at      document-end
// ==/UserScript==

(function () {    
    var colors = {};
    var currentColor = "";
    
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
            uncoloredEntry.addEventListener("click", swapReadStatus, false);
            
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
            var readStatus = $x("//div[@class='u0Entry '][not(@colored)]//a[@class='title unread']", uncoloredEntry);
            if (readStatus) {
                uncoloredEntry.setAttribute("colored", "unread_" + colorID);
            } else {
                uncoloredEntry.setAttribute("colored", "read_" + colorID);
            }
            
            if (colors[colorID] === undefined) {
                var color = computeColor(colorID);
                GM_addStyle(
                    "div[colored='unread_" + colorID + "'] {background: hsl(" + color + ", 70%, 80%) !important; }" +
                    "div[colored='unread_" + colorID + "']:hover {background: hsl(" + color + ", 90%, 85%) !important; }" +
                    "div[colored='read_" + colorID + "']{background: hsl(" + color + ", 70%, 90%) !important; }" +
                    "div[colored='read_" + colorID + "']:hover {background: hsl(" + color + ", 90%, 95%) !important; }"
                );
            }
        } catch (e) {}
    }
    
    function swapReadStatus(evt) {
        try {           
            var attrs = this.attributes;
            currentColor = attrs["colored"].value;
            var attrColored = currentColor;
            
            if (evt.target.className == "unread") {
                if (attrColored.substring(0, 4) == "read") {
                    attrColored = attrColored.substring(4, attrColored.length);
                    this.setAttribute("colored", "unread" + attrColored);
                }
            } else {
                if (attrColored.substring(0, 6) == "unread") {
                    attrColored = attrColored.substring(6, attrColored.length);
                    this.setAttribute("colored", "read" + attrColored);
                }
            }
        } catch (e) {}
    }
    
    document.addEventListener("DOMNodeInserted", colorizeListview, false);   
})();
