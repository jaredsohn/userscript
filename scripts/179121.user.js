// ==UserScript==
// @name           Reddit - Unread Comment Helper (fork)
// @description    On topic pages, show "X unread comments (Y total)"; on comment pages, highlight unread comments. Local storage only -- does not work across multiple computers.
// @author         Sam Angove <sam a-inna-circle rephrase period network>
// @namespace      http://rephrase.net/box/user-js/
// @include        http://reddit.com/
// @include        http://reddit.com/?*
// @include        http://reddit.com/r/*
// @include        http://www.reddit.com/
// @include        http://www.reddit.com/*
// @include        http://www.reddit.com/r/*
// @version        f.5.2
// ==/UserScript==

/*
Features:

 * Replaces "10 comments" with "5 unread comments (10 total)"
 * The unread comments link goes directly to the first unread comment
 * Unread comments are highlighted for ease of skimming
 * You can navigate through unread comments with the following hotkeys:
   Alt+Q / Alt+W -or- Ctrl+Up arrow / Ctrl+Down arrow

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
 0.3.1 - 2010-02-24 - don't @exclude valid links with 'help' etc. in title,
                      version stored data, use non-b36 separator
 f.4.0 - 2013-10-03 - fix bugs with incorrect unread count, allow to
                      navigate through unread comments
 f.5.0 - 2013-10-27 - delete items older than 7 days to avoid the
                      localStorage size quota
 f.5.1 - 2013-11-06 - fixed a bug in deletion date calculation
 f.5.2 - 2014-03-21 - fixed a breakage due to an update of Reddit
*/
(function(){

    var DATA_VERSION = 'ruch2';
    var DELETE_OLDER_THAN = 1000*60*60*24*7; // Items older than 7 days
    /* Shove an item into local storage */
    function getData(id) {
        var data = localStorage.getItem(DATA_VERSION + '|' + id);
        //console.log("getData", document.location.href, id, data);
        if (data === null || data.substr(0, 1) != "{")
            return null;
        return JSON.parse(data);
    }
    /* Get an item out of local storage */
    function setData(id, data) {
        //console.log("setData", document.location.href, id, data);
        localStorage.setItem(DATA_VERSION + '|' + id, JSON.stringify(data));
    }
    /* Delete old items out of local storage */
    function deleteOldItems() {
		var data = localStorage.getItem(DATA_VERSION + '_last_clean_time');
		if (data !== null && Date.now() - data < 1000*60*60*24) { // Cleanup every 24 hours
			return;
		}
		var key, row;
		for (var i = 0; i < localStorage.length; i++) {
			//console.log(localStorage.key(i));
			key = localStorage.key(i);
			if (key.lastIndexOf(DATA_VERSION + '|', 0) !== 0) {
				continue;
			}
			data = localStorage.getItem(key);
			if (data === null || data.substr(0, 1) != "{") {
				continue;
			}
			row = JSON.parse(data);
			if (Date.now() - row["seentime"] < DELETE_OLDER_THAN) {
				continue;
			}
			localStorage.removeItem(key);
		}
        localStorage.setItem(DATA_VERSION + '_last_clean_time', Date.now());
    }
    /* Apply a style to highlight unread comments */
    function highlightUnread(comment) {
        comment.style.setProperty("border-left", "2px solid orange", null);
        comment.style.setProperty("padding-left", "5px", null);
		comment.classList.add('unreadHighlighted');
    }
    /* Get sorted array of unread comments offsets. */
	function getCommentsOffsetTop() {
		var comments = document.getElementsByClassName('unreadHighlighted');
		var arr = new Array(comments.length);
		for (var i = 0; i < comments.length; i++) {
			arr[i] = comments[i].offsetTop;
		}
		arr.sort(function(a, b) {
			return a - b;
		});
		return arr;
	}
    /* Jump to the next new comment. */
    function jumpToNextComment() {
		var unread = getCommentsOffsetTop();
		var scrollUnread;
		for (var i = 0; i < unread.length; i++) {
			scrollUnread = unread[i] - Math.round(window.innerHeight/2);
			if (scrollUnread > document.documentElement.scrollTop) {
				window.scrollTo(0, scrollUnread);
				break;
			}
		}
    }
    /* Jump to the previous new comment. */
    function jumpToPrevComment() {
		var unread = getCommentsOffsetTop().reverse(); 
		var scrollUnread;
		for (var i = 0; i < unread.length; i++) {
			scrollUnread = unread[i] - Math.round(window.innerHeight/2);
			if (scrollUnread < document.documentElement.scrollTop) {
				window.scrollTo(0, scrollUnread);
				break;
			}
		}
    }

    /*
    Handle a list page, adding "n unread comments" links etc.
    */
    function handleListPage() {
        var snap = document.evaluate("//a" +
				"[contains(concat(' ', normalize-space(@class), ' '), ' comments ')]" +
				"[contains(@href, '/comments')]",
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

		var comments, i, split, b36cid, cid;
		comments = document.getElementsByClassName('comment');
		for(i=0; i<comments.length; i++) {
            split = comments[i].className.split("_");
			if(split.length == 2)
			{
				b36cid = split[1].split(' ')[0].substr(1);
				cid = parseInt(b36cid, 36);
				if (cid > max_cid) {
					highlightUnread(comments[i].getElementsByClassName("entry")[0]);
					if (cid > newmax) {
						newmax = cid;
					}
				}
			}
		}

		if (frag == "new") {
			jumpToNextComment();
		}

		var elm = document.getElementsByClassName('comments')[0];

		comments = elm.innerHTML.match(/\b\d+\b/);
		if (comments) {
			comments = comments[0];
			if (comments > 0) {
				setData(b36tid, {"max_cid": newmax, "seencount": comments, "seentime": Date.now()});
			}
		}
    }

    if (document.location.href.match(/\/comments(\/|\?|#|$)/)) {
		if (document.location.href.match(/\/comments\/[^\/?#]+(\/([^\/?#]+\/?)?)?(\?|#|$)/)) {
			deleteOldItems();
			handleCommentsPage();

			document.addEventListener('keydown', function(e) {
				// Alt+Q
				if (e.keyCode == "Q".charCodeAt(0) && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
					jumpToPrevComment();
				}
				// Alt+W
				if (e.keyCode == "W".charCodeAt(0) && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
					jumpToNextComment();
				}

				// Ctrl+up
				if (e.keyCode == 38 && !e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey) {
					jumpToPrevComment();
				}
				// Ctrl+down
				if (e.keyCode == 40 && !e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey) {
					jumpToNextComment();
				}
			}, false);
		}
    } else {
        handleListPage();
    }

})();
