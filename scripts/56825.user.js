// ==UserScript==
// @name           npmark
// @namespace      http://userscripts.org/users/ans
// @description    Mark NPM ready threads
// @include        http://www.joker.si/mn3njalnik/*npm=yes*
// @include        http://www.joker.si/mn3njalnik/*showforum=17*
// ==/UserScript==

var ps = document.getElementsByName("Post");
if (ps.length == 1) {
    ps[0].innerHTML = "npm";
    document.getElementsByName("dosubmit")[0].click();
} else {
    var es = document.evaluate("//a[contains(@href, 'who_posted')]", document,
        null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < es.snapshotLength; i++) {
        var e = es.snapshotItem(i);
        // Plus one because what we actually have here is number of replies
        var all = parseInt(e.innerHTML) + 1;
        // This is the number of posts on the last page only
        var posts = all - (Math.floor(all / 40) * 40);

        if (posts == 0) {
            e.style.color = "red";
            e.style.fontSize = "xx-large";
            var id = e.getAttribute("href").match(/\(([0-9]+)\)/)[1];
            e.setAttribute("href", "?act=post&do=reply_post&f=17&npm=yes&t=" + id);
        }
        else if (posts >= 38) {
            e.style.color = "green";
        } else if (posts >= 36) {
            e.style.color = "blue";
        }
    }
}
