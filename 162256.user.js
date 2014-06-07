// ==UserScript==
// @name        Feedly Colorful Listview
// @namespace   http://feedly.colorful.list.view
// @description COlorizes items headers based on their source
// @include     http://www.feedly.com/home#*
// @version     0.3
// @grant       GM_addStyle
// ==/UserScript==


var colors = {};

function $x(query, context) {
    return document.evaluate(query, (context || document), null, 
           XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
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

(function() {
    GM_addStyle(
        ".collapsed { border-color: transparent !important; }" +
        "#entries.list #current-entry .collapsed {" + 
        "   border: 2px solid #8181DC !important; }" +
        "#entries.list #current-entry.expanded .collapsed {" + 
        "   border-bottom-color: transparent !important;" + 
        "   border-width: 2px 0 !important; }");

    var timeline = document.getElementById("box");
    timeline.addEventListener("DOMNodeInserted", function() {
        try {
	    var uncolored = $x('//div[@class="u0Entry "][not(@colored)]', timeline);
	    
            if (uncolored == null) {return;};

            var titleA = $x("//div[@class='u0Entry '][not(@colored)]//span[@class='sourceTitle']/a", uncolored)
            titleA.setAttribute("style", "color: black;");
            var title = titleA.textContent;
            title = title.replace(/\W/g, "-");

            uncolored.setAttribute("colored", title);

            if (colors[title] == undefined) {
                var color = computeColor(title);
                GM_addStyle(
                    "div[colored='" + title + "'] {" +
                    "   background: hsl(" + color + ",70%,80%) !important; }" +
                    "div[colored='" + title + "']:hover {" +
                    "   background: hsl(" + color + ",90%,85%) !important; }" +
                    "div[colored='" + title + "']//a[contains(@class, 'read')] {" +
                    "   background: hsl(" + color + ",70%,90%) !important; }" +
                   "div[colored='" + title + "']//a[contains(@class, 'read')]:hover {" +
                    "   background: hsl(" + color + ",90%,95%) !important; }");
            }

        } catch (e) {
        }

    }, false);

})();
