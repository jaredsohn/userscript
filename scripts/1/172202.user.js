// ==UserScript==
// @name feedly fullsize with colorful listview
// @author arambl4&X4lldux
// @description feedly fullsize with colorful listview
// @create 2013-6-29
// @lastmodified 2013-6-29
// @namespace  https://userscripts.org/users/
// @updateURL http://userscripts.org/scripts/source/172201.user.js
// @version 0.1
// @include http*://*.feedly.com/*

// ==/UserScript==
//based on http://userstyles.org/styles/53766 & http://userscripts.org/scripts/show/162256
//fullsize
(function() {
var css = "#feedlyTabsHolder, #fusionModule_part, #portfolioModule_part, #sponsorsModule_part, #mobileModule_part {display:none !important;}\n#mainBar {margin-left: 0px !important; }\n#feedlyPart {width: 98% !important;}\n#feedlyPage, #mainArea, .u100Entry, .selectedEntry {width: 100% !important;}\n.u4Entry {width: 100% !important; max-width: 100%!important;}\n.marginMaker {margin-left: 0px !important; width: 100% !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();


//colorful listview
//if you dong't like the colorful style, you can change color in line 87.
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