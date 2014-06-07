// ==UserScript==
// @name           Reddit - Unread Comment Helper
// @description    On topic pages, show "X unread comments (Y total)"; on comment pages, highlight unread comments. Local storage only -- does not work across multiple computers.
// @author         Sam Angove <sam a-inna-circle rephrase period network>
// @namespace      http://rephrase.net/box/user-js/
// @include        http://reddit.com/*
// @include        http://www.reddit.com/*
// @exclude        */submit
// @exclude        */stats
// @exclude        */search*
// @exclude        */message*
// @exclude        */prefs*
// @exclude        */help*
// @exclude        */ad_inq*
// @exclude        */user/*/comments
// @exclude        */comscore*
// ==/UserScript==

/*
Features:

 * Replaces "10 comments" with "5 unread comments (10 total)"
 * The unread comments link goes directly to the first unread comment
 * Unread comments are highlighted for ease of skimming

There are a few issues to be aware of.

 1. The unread comment count isn't always accurate. I *think* it has something
    to do with deleted comments.

Version history:

 0.1.0 - 2007-06-18 - initial release
 0.2.0 - 2008-05-27 - revise to work with new Reddit, and finally remove
                      the (long superfluous) cross-subdomain messaging crap
 0.2.1 - 2008-07-23 - update to work with new URL form
 0.2.2 - 2009-02-03 - update to work with new HTML
 0.2.3 - 2009-06-03 - update to handle additional classnames with "entry"
 0.2.4 - 2009-06-03 - fix "jump to new comment"
 0.3.0 - 2010-02-19 - rewrite to use localStorage instead of Google Gears;
                      exclude comscore iframe

TODO:
 * Only keep records of the last n items visited to avoid the localStorage
   size quota.
*/
(function(){

    /* Shove an item into local storage */
    function getData(id) {
        var data = localStorage.getItem("t" + id);
        //console.log("getData", document.location.href, id, data);
        if (data === null || data.substr(0, 1) != "{")
            return null;
        return JSON.parse(data);
    }
    /* Get an item out of local storage */
    function setData(id, data) {
        //console.log("setData", document.location.href, id, data);
        localStorage.setItem("t" + id, JSON.stringify(data));
    }
    /* Apply a style to highlight unread comments */
    function highlightUnread(comment) {
        comment.style.setProperty("border-left", "2px solid orange", null);
        comment.style.setProperty("padding-left", "5px", null);
    }
    /*
    Jump to the first new comment. (Not actually guaranteed to be the
    first, but it usually will be. Certainty would be a performance
    hit.)
    */
    function jumpToNewComment(cid) {
        var url = document.location.href.split("#")[0];
        document.location.href = url + "#c" + cid;
    }

    /*
    Handle a list page, adding "n unread comments" links etc.
    */
    function handleListPage() {
        var snap = document.evaluate('//a[@class="comments"][contains(@href, "/comments")]',
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        var b36tid, row, match, comments, seen, newcomments, newlink;
        for(var elm = null, i = 0; (elm = snap.snapshotItem(i)); i++) {
            match = elm.firstChild.nodeValue.match(/(\d+) comment/);
            // No comments; bail early.
            if (!match)
                continue;

            comments = match[1];

            // Alphanumeric base-36 id, like "1lp5".
            b36tid = elm.getAttribute("href").match(/\/comments\/([^\/]+)/)[1];
            row = getData(b36tid);

            seen = row ? row["seencount"] : 0;

            newcomments = comments - seen;
            // Can be negative if comments are deleted.
            if (newcomments < 0) newcomments = 0;

            newlink = elm.cloneNode(false);
            if (newcomments > 0)
                newlink.style.color = "#333";

            var cstring = "unread comment" + (newcomments != 1 ? "s" : "");

            newlink.appendChild( document.createTextNode(newcomments + " " + cstring) );
            elm.parentNode.insertBefore(newlink, elm);

            // Some comments have been read already.
            // Show both read and unread counts.
            if (comments > newcomments) {
                // Magic fragment causes a jump to the first unread comment.
                newlink.href += "#new";
                elm.removeChild(elm.firstChild);
                elm.appendChild(document.createTextNode("(" + comments + " total)"));
                elm.style.setProperty("background-color", "#fff", null);
            } else {
                // All comments are unread.
                elm.parentNode.removeChild(elm);
            }
        }
    }

    /*
    Handle a comments page: highlight new comments, save the ID of the highest
    comment, etc.
    */
    function handleCommentsPage() {
        var url = document.location.href.split("#");
        var frag = url.length > 1 ? url[1] : false;
        var b36tid = url[0].match(/\/comments\/([^\/]+)/)[1];

        var row = getData(b36tid);

        var update, max_cid = 0, newmax = 0, seencount = 0;
        if (row) {
            newmax = max_cid = row["max_cid"];
            seencount = row["seencount"];
        }

        // One named anchor per comment, including deleted ones.
        // This matches the link itself now, but eh.
        var snap = document.evaluate('//div[contains(@class, "entry")]',
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        var elm, i, b36cid, cid, parentClass, comments = 0, jumped = false;
        for(elm = null, i = 0; (elm = snap.snapshotItem(i)); ++i) {
            // Check that this is an extant comment.
            parentClass = elm.parentNode.className;
            if (!parentClass.match('comment'))
                continue;

            ++comments;
            b36cid = parentClass.split("_")[1].split(' ')[0].substr(1);
            cid = parseInt(b36cid, 36);
            if (cid > max_cid) {
                highlightUnread(elm);
                if (cid > newmax) {
                    newmax = cid;
                    if (frag == "new" && !jumped) {
                        jumpToNewComment(b36cid);
                        jumped = true;
                    }
                }
            }
        }

        if (comments > 0) {
            setData(b36tid, {"max_cid": newmax, "seencount": comments});
        }

    }


    if (document.location.href.match(/\/comments/)) {
        handleCommentsPage();
    } else {
        handleListPage();
    }
})();