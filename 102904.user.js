// ==UserScript==
// @name           esl.eu gather join
// @namespace      http://phpentwicklung.com/esl
// @description    This script allows players of the european sports league to join a gather match directly via the gathers overview page.
// @include        http://*.esl.eu/*
// ==/UserScript==

window.updateMatches = function () {
    var snapResults = document.evaluate("//td[@class='TextM']//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
        var elm = snapResults.snapshotItem(i);
        var url = elm.getAttribute('href');
        var result = url.match(/\/gather\/([0-9]+)\/$/);
        if (result && result[1] && !document.getElementById("direct_join_"+result[1])) {
            var link = document.createElement('a');
            link.id = "direct_join_"+result[1];
            link.innerHTML = 'Join!';
            link.setAttribute("href", "javascript:");
            link.setAttribute("onclick", "javascript:window.open('/interface/gather/index.html?id="+result[1]+"', 'Gather', 'toolbar=no, directories=no, location=no, left=300, top=100, status=yes, menubar=no, resizable=no, scrollbars=no, width=778, height=700');");

            var cell = document.createElement('td');
            cell.appendChild(link);

            elm.parentNode.parentNode.appendChild(cell);
        }
    }
}

window.setInterval(updateMatches, 1000);