// ==UserScript==
// @name           Kaybolmayan Baslik
// @description    Basliklar kaybolmasin!
// @namespace      http://userscripts.org/users/ocanal
// @version        0.2
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://antik.eksisozluk.com/*
// @include        https://antik.eksisozluk.com/*
// ==/UserScript==


function xpath(xpath, element) {
        if (!element)
            element = document;
        return document.evaluate(xpath, element, null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

if (window.location.pathname.match(/\/show\.asp/)) {
    var baslik = xpath("//input[@name='t']");
    var divtitle = xpath("//h1[@class='title']")
    console.log(baslik);
    if (baslik.snapshotLength > 0 && divtitle.snapshotLength == 0) {
        var topic = document.getElementById("topic");
        var h = document.createElement("h1");
        h.className = "title";
        h.innerHTML = '<a href="show.asp?t='+encodeURIComponent(baslik.snapshotItem(0).value)+'">'+baslik.snapshotItem(0).value+'</a>';
        topic.insertBefore(h, topic.firstChild);
    }
}