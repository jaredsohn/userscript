// ==UserScript==
// @name           Google Reader - Colorful Expanded View
// @namespace      http://google.reader.colorful.list.view/kepp
// @include        http://www.google.com/reader/*
// @description    Colorizes the item in Google Reader expanded view
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

    var entries = document.getElementById("entries");

    entries.addEventListener("DOMNodeInserted", function() {

        var uncolored = $x("div[contains(@class,'entry')][last()]"
                            , entries);
        try {

            var title = $x(    "table[contains(@class,'card')]/"+
                            "tbody/tr/td/div/div[contains(@class,'entry-main')]/"+
                            "div[@class='entry-author']/span[@class='entry-source-title-parent']/a", uncolored).textContent;
            title = title.replace(/\W/g, "-");
            //alert(title);
            var cellToColor=$x("table[contains(@class,'card')]/"+
                            "/tr/td/div/div[contains(@class,'entry-main')]"
                            , uncolored);
            cellToColor.setAttribute("colored", title);

            if (colors[title] == undefined) {
                var color = computeColor(title);
                GM_addStyle(
                    "div[colored='" + title + "'] {" +
                    "   background: hsl(" + color + ",70%,80%) !important; padding:10px;}" +
                    "div[colored='" + title + "']:hover {" +
                    "   background: hsl(" + color + ",90%,85%) !important; }" +
                    ".read div[colored='" + title + "'] {" +
                    "   background: hsl(" + color + ",70%,90%) !important; }" +
                   ".read div[colored='" + title + "']:hover {" +
                    "   background: hsl(" + color + ",90%,95%) !important; }");
            }

        } catch (e) {
        }

    }, false);

})();

