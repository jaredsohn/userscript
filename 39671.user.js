// ==UserScript==
// @name           Ocado: hide alternative products
// @namespace      http://raines.me.uk/
// @description    When a product is out of stock on ocado.com up to two alternatives are shown underneath it. In a search for similar out of stock products, these alternatives appear over and over again making it hard to browse the genuine results. This script hides the alternative products initially, but you can still view them by clicking "Alternatives".
// @include        http://www.ocado.com/*
// ==/UserScript==

var headings = document.evaluate(
    "//div[@class='productDetails high']/h4",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < headings.snapshotLength; ++i) {
    var heading = headings.snapshotItem(i);
    if (heading.firstChild.nodeValue == "Alternatives") {
        var div = document.createElement("div");
        div.style.display = "none";
        while (heading.nextSibling) {
            div.appendChild(heading.nextSibling);
        }
        heading.parentNode.appendChild(div);
        heading.style.cursor = "pointer";
        heading.addEventListener("click", function() { this.nextSibling.style.display = this.nextSibling.style.display == "none" ? "block" : "none"; }, true);
    }
}

