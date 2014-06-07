// ==UserScript==
// @name            Clickable links passfornod32
// @namespace       passfornod32
// @description     Make the urls clickable with the displayed user:pass like: http://user:pass@url.
// @include         http://www.passfornod32.com/index.php?p=pass_xxx*
// ==/UserScript==

function replaceregex(doc, element, match_re, replace_string) {
    match_re = new RegExp(match_re);
    if (element.innerHTML) {
        element.innerHTML = element.innerHTML.replace(match_re, replace_string);
    }
}

function grablinks() {
    replaceregex(window.document, document.evaluate('/HTML[1]/BODY[1]/CENTER[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue, /<td>http:\/\/([^<]+)<\/td>\s+<td>([^<]+)<\/td>\s+<td>([^<]+)<\/td>/gi, '<td><a href="http://$2:$3@$1">http://$1</td><td>$2</td><td>$3</td>', null);
}
window.addEventListener("load", function () {
    grablinks();
}, false);