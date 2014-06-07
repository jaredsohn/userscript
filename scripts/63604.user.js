// ==UserScript==
// @name           Stabi-Ausleihsystem
// @namespace      panyasan
// @description    Ads missing call numbers to  http://ausleihe.staatsbibliothek-berlin.de/
// @include        http://ausleihe.staatsbibliothek-berlin.de/opac/
// ==/UserScript==


// Slightly modified code from http://userscripts.org/scripts/review/1295 

(function () {
    const urlRegex = /\b(([A-Za-z]+|[0-9]A|[0-9]B|Ser\.|[0-9]Per|[0-9]+SA)?([0-9\-\/]+))/ig;
    var allowedParents = [ "td" ];
    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")]";
	var prefix = "http://stabikat.sbb.spk-berlin.de/DB=1/CMD?ACT=SRCHA&IKT=54&SRT=YOP&TRM=";
    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
        if (urlRegex.test(cand.nodeValue)) {
            var span = document.createElement("span");
            var source = cand.nodeValue;            
            cand.parentNode.replaceChild(span, cand);
            urlRegex.lastIndex = 0;
            for (var match = null, lastLastIndex = 0; (match = urlRegex.exec(source)); ) {
                span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
                var a = document.createElement("a");
                a.setAttribute("href", prefix+ match[0]);
                a.setAttribute("target", "_blank");
                a.appendChild(document.createTextNode(match[0]));
                span.appendChild(a);
                lastLastIndex = urlRegex.lastIndex;
            }
            span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
            span.normalize();
        }
    }
})();
