// ==UserScript==
// @name           Linkify bug numbers
// @namespace      http://pile0nades.wordpress.com/
// @description    Looks for bug numbers that aren't hyperlinked, linkifies them. Based on the original linkify script.
// @include        *
// ==/UserScript==

(function () {
    const urlRegex = /\bbug\s?#*\s?\d+(?:\s?com+ent\s?#*\s?\d+)?/ig;

    // tags we will scan looking for un-hyperlinked urls
    var allowedParents = [
        "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
        "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em", 
        "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
        "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
        "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
    ];
    
    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ") and " +
                "contains(translate(., 'BUG', 'bug'), 'bug')]";

    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    var t0 = new Date().getTime();
    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
        if (urlRegex.test(cand.nodeValue)) {
            var parent = cand.parentNode;
            var source = cand.nodeValue;

            urlRegex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = urlRegex.exec(source)); ) {
                parent.insertBefore(document.createTextNode(source.substring(lastLastIndex, match.index)), cand);
                
                var parts = match[0].split(/\s?(?:bug|com+ent)\s?#*\s?/i);
                var a = document.createElement("a");
                a.setAttribute("href", "https://bugzilla.mozilla.org/show_bug.cgi?id=" + parts[1] + (parts[2]? "#c" + parts[2] : ""));
                a.appendChild(document.createTextNode(match[0]));
                parent.insertBefore(a, cand);

                lastLastIndex = urlRegex.lastIndex;
            }

            parent.insertBefore(document.createTextNode(source.substring(lastLastIndex)), cand);
            parent.removeChild(cand);
            parent.normalize();
        }
    }
    var t1 = new Date().getTime();
    //alert((t1 - t0) / 1000);

})();
;