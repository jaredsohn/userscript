// ==UserScript==
// @name          KG perm links
// @namespace     http://userscripts.org/users/helmut
// @description   Adds a permanent KG link to the film on each announce page.
// @include       *://karagarga.net/*
// @include       *://www.karagarga.net/*
// ==/UserScript==

function addLink() {
    var st = xpath("//td[@class='heading']");
    var i = 0;
    while(i < st.snapshotLength && st.snapshotItem(i).innerHTML != "Internet Link") i++;
    if(i < st.snapshotLength) {
        var node = st.snapshotItem(i).nextSibling;
        var imdb = getImdb(node.firstChild.href);
        if(imdb != null) {
            node.appendChild(document.createElement("br"));
            node.appendChild(makeLink(imdb));
        }
    }
}

function getImdb(href) {
    var from = href.indexOf("imdb.com/title/tt") + 17;
    if(from < 17)
        return null;
    var to = href.indexOf("/", from);
    if(to < 0)
        to = href.length;
    return href.substring(from, to);
}

function makeLink(imdb) {
    var link = document.createElement("input");
    link.type = "text";
    link.id = "permlink";
    link.readOnly = "readonly";
    link.size = "100";
    link.value = "[url='http://karagarga.net/browse.php?search_type=imdb&search=" + imdb + "'][color=red]KG[/color][/url]"
    link.addEventListener('click', SelectPerm, true);
    return link;
}

function SelectPerm()
{
    document.getElementById("permlink").focus();
    document.getElementById("permlink").select();
}

String.prototype.contains = function(it) {
    return this.indexOf(it) != -1;
}

function xpath(query) {
    return document.evaluate(query, document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

(function () {
    var href = window.location.href;
    if(href.contains("karagarga.net/details.php"))
        addLink();
})();
