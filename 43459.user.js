// ==UserScript==
// @name           FLAMERscene killfile
// @namespace      http://qatfy.at/
// @description    www.flamer-scene.com forum killfile (running FluxBB forum-software). written by flo lauber dev@qatfy.at
// @include        http://*.flamer-scene.com/forum/viewtopic.php?*
// ==/UserScript==
//
var allposts;
var author;

var blocked_users = new Array(
        'username1',
        'username2'
        );


// XPath query finds all posts
allposts = document.evaluate(
    "//div[@class='postright']/../../..",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allposts.snapshotLength; i++) {
    var post_div = allposts.snapshotItem(i);
    // this XPath query finds the <a> containing the authors nick
    author = document.evaluate(
            "div/div/div[1]//a",
            post_div, 
            null, 
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
            null);                    

    author = author.snapshotItem(0);
    if (blocked_users.indexOf(author.textContent) > -1) {
        // author is in killfile
        // prepare notification div ('Post by .. blocked, etc')
        var note_div = document.createElement("div");
        note_div.id = "note_"+post_div.id;
        note_div.className = "blockpost roweven";
        note_div.style.backgroundColor = "#555";
        note_div.style.color = "#fff";
        note_div.innerHTML = "Post by <b>"+author.textContent+"</b> hidden <a href='#' onclick='document.getElementById(\""+post_div.id+"\").style.display = \"block\"; document.getElementById(\"note_"+post_div.id+"\").style.display=\"none\"; return false;'> &darr; show</a>";
        post_div.parentNode.insertBefore(note_div, post_div);

        // note has been placed, hide actual post
        post_div.style.display = "none";
    }
}

