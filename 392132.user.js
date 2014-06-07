// ==UserScript==
// @id             org.hoverlink.shazang
// @name           What is this link?!
// @version        19.2.2014
// @author         StartsAsNewRedditor
// @description    Adds alt text to every link telling you where it goes
// @include        http*
// ==/UserScript==

var allLinksOnPage = document.getElementsByTagName("a");

for (var i = 0; i < allLinksOnPage.length; i++) {
    if (allLinksOnPage[i].getAttribute("title") != null) {
        var linkAltText = allLinksOnPage[i].getAttribute("title");
        allLinksOnPage[i].setAttribute("title", allLinksOnPage[i].getAttribute("href") + " :: " + linkAltText);
    }
    else {
        allLinksOnPage[i].setAttribute("title", allLinksOnPage[i].getAttribute("href"));
    }
}