// ==UserScript==
// @name           pixiv middle thumbnail
// @namespace      http://pickup2pixiv.blog130.fc2.com/
// @include        http://www.pixiv.net/*illust.php*
// @include        http://www.pixiv.net/bookmark.php*
// @include        http://www.pixiv.net/ranking*
// @include        http://www.pixiv.net/search.php*
// @include        http://www.pixiv.net/tags.php*
// @exclude        http://www.pixiv.net/bookmark.php?type=user*
// ==/UserScript==

function createMiddleThumbnail() {
    var imgs = document.evaluate('//img[@alt and contains(@src, "_s.")]', document, null, 7, null);
    for(i = 0, length = imgs.snapshotLength; i < length; i++) {
        imgs.snapshotItem(i).src = imgs.snapshotItem(i).src.replace(/_s\.(gif|jpg|png)$/, '_m.$1');
        imgs.snapshotItem(i).style.width = '100%';
    }
}

createMiddleThumbnail();

if (AutoPagerize) {
    AutoPagerize.addFilter(function () {
        createMiddleThumbnail();
    });
}
