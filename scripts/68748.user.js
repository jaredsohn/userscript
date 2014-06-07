// ==UserScript==
// @name           Gelbooru visible source
// @description    Makes image sources visible on gelbooru
// @include        http://www.gelbooru.com/index.php?page=post&s=view&id=*
// @include        http://gelbooru.com/index.php?page=post&s=view&id=*
// ==/UserScript==

function truncate(str) {
    if (str.substr(0, 7) == "http://") {
        str = str.substr(7);
    }
    if (str.length > 23) {
        return str.substr(0, 20) + "\u2026";
    } else {
        return str;
    }
}

function resolver(prefix) {
    return prefix === 'x' ? 'http://www.w3.org/1999/xhtml' : null;
}

var source = document.getElementById("source");
if (source.value != "") {
    var ratingli = document.evaluate( "id('stats')/x:ul/x:li[4]", document.body, resolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    ratingli = (ratingli.snapshotLength > 0) ? ratingli.snapshotItem(0) : null;
    if (ratingli != null) {
        var sourceli = document.createElement("li");
        sourceli.appendChild(document.createTextNode("Source: "));
        if (source.value.substr(0, 7) == "http://") {
            var sourcelink = document.createElement("a");
            var pixivinfo = source.value.match(/^http:\/\/img\d+\.pixiv\.net\/img\/[^\/]+\/(\d+)\./);
            if (pixivinfo != null && pixivinfo.length > 0) {
                sourcelink.href = "http://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + pixivinfo[1];
                sourcelink.appendChild(document.createTextNode("pixiv"));
            } else {
                sourcelink.href = source.value;
                sourcelink.appendChild(document.createTextNode(truncate(source.value)));
            }
            sourceli.appendChild(sourcelink);
        } else {
            sourceli.appendChild(document.createTextNode(source.value));
        }
        ratingli.parentNode.insertBefore(sourceli, ratingli);
    }
}