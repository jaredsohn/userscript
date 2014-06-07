// ==UserScript==
// @name          Refine Your Search
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   adds a "refine your search" list on Google search results
// @include       http://www.google.tld/search*
// ==/UserScript==

function getCurrentSearchText(  ) {
    var elmForm = document.forms.namedItem('gs');
    if (!elmForm) { return; }
    var elmSearchBox = elmForm.elements.namedItem('q');
    if (!elmSearchBox) { return; }
    var usQuery = elmSearchBox.value;
    if (!usQuery) { return; }
    return usQuery;
}

function getFirstSearchResult(  ) {
    var results = document.evaluate("//p[@class='g']", document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    return results.snapshotLength ? results.snapshotItem(0) : null;
}

function parseRefineYourSearchResults(oResponse) {
    if (oResponse.responseText.indexOf('new Array(') == -1) return;
    var arResults = oResponse.responseText.split(
        'new Array("')[1].split('")')[0].split('", "');
    var usQuery = getCurrentSearchText(  );
    var htmlArResults = new Array(  );
    for (var i = 0; i < arResults.length; i++) {
        if (!arResults[i] || (arResults[i] == usQuery)) continue;
        htmlArResults.push('<a href="http://www.google.com/search?q=' +
                           escape(arResults[i]) + '">' +
                           arResults[i] + '</a>');
    }
    if (!htmlArResults.length) return;
    var elmRefine = document.createElement('div');
    elmRefine.id = 'refineyoursearch';
    elmRefine.style.fontSize = 'small';
    elmRefine.style.paddingTop = elmRefine.style.paddingBottom = '1em';
    var html = 'Refine your search: ' + htmlArResults.join(' &middot; ');
    elmRefine.innerHTML = html;
    var elmFirstResult = getFirstSearchResult(  );
    elmFirstResult.parentNode.insertBefore(elmRefine, elmFirstResult);
}

var usQuery = getCurrentSearchText(  );
if (!usQuery) return;
if (!getFirstSearchResult(  )) return;
GM_xmlhttpRequest({
    method: "GET",
    url:    "http://www.google.com/complete/search?hl=en&js=true&qu=" +
            escape(usQuery + ' '),
    onload: parseRefineYourSearchResults
});
