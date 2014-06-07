// ==UserScript==
// @name           4chan.b.showPostNumbers
// @include        http://boards.4chan.org/b/*
// ==/UserScript==


var re = (window.location == "http://boards.4chan.org/b/") ?
    /res\/\d+#q(\d+)$/ : /^javascript:quote\('(\d+)'\)$/;

for (var n = 0; n < document.links.length; n++) {
    link = document.links[n];
    if (link.className == "quotejs") {
        var result = re.exec(link.href);
        if (result !== null) link.innerHTML = result[1];
    }
}
