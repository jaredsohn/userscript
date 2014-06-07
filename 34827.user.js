// ==UserScript==
// @name          4chan Enhanced
// @namespace     http://www.4chan.org
// @description   4chan enhancements
// @include       *.4chan.org/*
// @include       *.4chan.org/*/imgboard.php?res=*
// @version       0.1.75
// ==/UserScript==

d = document;

/* redirects 404 pages to the archive + fucking CloudFlare */
if(d.title == "4chan - 404" || d.title == "Website is currently unreachable" || d.evaluate("//b[text() = 'Error: Thread specified does not exist.']", d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
    board = window.location.pathname.match(/[^/]+/);
    thread = window.location.href.match(/\d+(?=#|$)/);
    hash = window.location.hash;

    if(!thread) return;
    if(/^(?:a|m|tv|u)$/.test(board))
        window.location.replace("http://archive.foolz.us/" + board + "/thread/" + thread + hash);

    hash = hash.replace("#", "#p");
    if(/^(?:jp|lit|tg)$/.test(board))
        window.location.replace("http://fuuka.warosu.org/" + board + "/thread/" + thread + hash);
    if(/^(?:dyi|g|sci)$/.test(board))
        window.location.replace("http://archive.installgentoo.net/cgi-board.pl/" + board + "/thread/" + thread + hash);
    if(/^(?:t|hr)$/.test(board))
        window.location.replace("http://no-info.no-ip.info/board.pl/" + board + "/thread/" + thread + hash);
    if(/^(?:3|adv|an|ck|co|fa|fit|int|k|mu|n|new|o|p|po|pol|r9k|soc|sp|toy|trv|v|vp|x)$/.test(board)) // offline intermittently
        window.location.replace("http://archive.no-ip.org/" + board + "/thread/" + thread + hash);
    if(/^(?:e)$/.test(board)) // facelpalm.tiff
        window.location.replace("https://md401.homelinux.net/4chan/cgi-board.pl/" + board + "/thread/" + thread + hash);
}

/* Add sage/noko buttons */
newspan = d.createElement("span");
newspan.appendChild(d.createTextNode(" ["));

noko = d.createElement("a");
noko.textContent = "noko";
noko.setAttribute("onclick", "this.parentNode.parentNode.firstChild.value = 'noko'; this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.submit();");
noko.setAttribute("style", "cursor: pointer;");

newspan.appendChild(noko);
newspan.appendChild(d.createTextNode("] ["));

sage = d.createElement("a");
sage.textContent = "sage";
sage.setAttribute("onclick", "this.parentNode.parentNode.firstChild.value = 'sage'; this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.submit();");
sage.setAttribute("style", "cursor: pointer;");

newspan.appendChild(sage);
newspan.appendChild(d.createTextNode("]"));

email = d.evaluate("//input[@name='email']", d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
email.parentNode.appendChild(newspan);

d.body.addEventListener("DOMNodeInserted", function(e) {
    var nodes = d.evaluate(".//a[contains(text(), "No.")]", e.target, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i = 0, n = null; n = nodes.snapshotItem(i++); ) {
        n.setAttribute("onclick", "replyhl('" + n.href.toString().replace(/.*#p/, '') + "')");
    }
}, true);