// ==UserScript==
// @name          Bokuchan Media Relinker
// @include       http://bokuchan.org/Media/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () {

createLinks();
window.addEventListener("resize", createLinks, true);

function createLinks() {
    var bokuLinks = document.evaluate('//a[contains(@href, "/src/")]', document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var link, tlink;
    for (var i = 0; i < bokuLinks.snapshotLength; i++) {
        link = bokuLinks.snapshotItem(i);
	tlink = '/src/' + link.innerHTML;
	link.href = link.href.replace( /\/src\/.+/, tlink );
    }
}

})();