// ==UserScript==
// @name           slashignore
// @namespace      http://qatfy.at/
// @description    
// @include        http://*.flamer-scene.com/forum/viewtopic.php?*
// ==/UserScript==
//

var allposts = document.evaluate(
        "//a[@href='profile.php?id=11']/../../../../../../..",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

for (var i = 0; i < allposts.snapshotLength; i++) {
    var post = allposts.snapshotItem(i);
    var notice = document.createElement("div");
    notice.id = "note_"+post.id;
    notice.className = "blockpost roweven";
    notice.style.backgroundColor = "#888";
    notice.style.color = "#000";
    notice.innerHTML = "ignored";
    post.parentNode.insertBefore(notice, post);

    // dump dat shiaaat
    post.parentNode.removeChild(post);
}
