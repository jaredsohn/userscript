// ==UserScript==
// @name          charlietown
// @namespace     http://www.charliewilkins.com
// @description   charlietown
// @include       *
// @require       http://nh-cwilkins-dt2/stuff/jquery-1.3.2.min.js
// ==/UserScript==

//var jQueryExists = ( ( typeof $ )=="function" );
//alert(jQueryExists)
var url;
function charlietown() {
    url = String(window.location);

    if (url.indexOf('#') > -1)
    url = url.substring(0, url.indexOf('#'));
    if (url.indexOf('?') > -1)
    url = url.substring(0, url.indexOf('?'));
    GM_log(url);

    if (url.indexOf("google.com/calendar") > 0) {
        GM_log("gcal");
        window.addEventListener("DOMMouseScroll", gcal_scrollHandler, true);
    }
    if (url.indexOf("google.com/mail") > 0) {
        GM_log("gmail");
        window.addEventListener('keydown', gmail_keyHandler, false);
    }
    if (url.indexOf("google.com/reader") > 0) {
        GM_log("greader");
        //document.getElementById('gbar').style.display = 'none';
        //document.getElementById('global-info').style.display = 'none';
        document.getElementById('logo-container').style.display = 'none';
        document.getElementById('search').style.display = 'none';
        document.getElementById('chrome-header').style.display = 'none';

        // move the main div to the top
        document.getElementById('main').style.top = "25px";
        window.addEventListener('keydown', greader_keyHandler, false);
    }
    if (url.indexOf("google.com/ig/add") > 0) {
        google_autoAddToReader()
    }

    window.addEventListener('keydown', keyScroll, false);



}

function google_autoAddToReader() {
    var anchors = document.getElementsByTagName('a');
    for (var i = 0; i < anchors.length; i++) {
        if (anchors[i].innerHTML == "Add to Google Reader") {
            document.location.href = anchors[i].href;
        }
    }
}
// gcal scroll trapper
function gcal_scrollHandler(e) {
    mainbody = document.getElementById("mainbody");

    if (mainbody.style.display == "") {
        e.preventDefault();
        e.stopPropagation();
    }

}

function gmail_keyHandler(e) {

    var spans = document.getElementsByTagName("span");
    var unread = null;
    for (var i = 0; i < spans.length; i++) {
        if (spans[i].textContent == "Unread") {
            unread = spans[i];
            break;
        }
    }

    var divs = document.getElementsByClassName("goog-imageless-button-content");
    var markread = null;

    for (var i = 0; i < divs.length; i++) {
        if (divs[i].textContent.indexOf("Mark as read") > -1) {
            markread = divs[i];
            break;
        }
    }


    // goog-imageless-button-content
    var tagName = e.target.tagName;
	var pn = e.target.parentNode;
	
    if (tagName == "TEXTAREA" || tagName == "INPUT" || e.metaKey || e.ctrlKey) {
        return;
    }

	if (tagName == "HTML") {
		var targ = $(e.target);
		if ($("BODY",targ)[0].className.indexOf("editable") > -1) {
			return;
		}
	}

    var key = String.fromCharCode(e.which || e.keyCode);
    switch (key) {
    case 'D':
        clk_evt = document.createEvent('MouseEvents');
        clk_evt.initEvent("click", true, true)
        unread.dispatchEvent(clk_evt);

        key_evt = document.createEvent('KeyEvents');
        key_evt.initKeyEvent("keypress", true, true, null,
        false, false, true, false,
        0, 73)
        e.target.dispatchEvent(key_evt);

        break;
    }
    return false;
}

function greader_keyHandler(e) {
    var tagName = e.target.tagName;
    if (tagName == "TEXTAREA" || tagName == "INPUT" || e.metaKey) {
        return;
    }

    var key = String.fromCharCode(e.which || e.keyCode);
    GM_log(key)
    switch (key) {
    case 'Q':
        // Open link in new tab.
        next_button = document.getElementById('entries-down');
        next_button_evt = document.createEvent('MouseEvents');
        next_button_evt.initEvent('click', true, true);
        next_button.dispatchEvent(next_button_evt);
        break;
    case 'W':
        // Open link in new tab.
        next_button = document.getElementById('entries-up');
        next_button_evt = document.createEvent('MouseEvents');
        next_button_evt.initEvent('click', true, true);
        next_button.dispatchEvent(next_button_evt);
        break;
    case 'E':
        // Open link in new tab.
        show_all = document.getElementById('show-all');
        show_new = document.getElementById('show-new');
        show_evt = document.createEvent('MouseEvents');
        show_evt.initEvent("click", true, true);

        if (show_all.className.indexOf("link-selected") > -1) {
            show_new.dispatchEvent(show_evt);
        } else {
            show_all.dispatchEvent(show_evt)
        }

        break;
    case 'F':
        // Open link in new tab.
        friends = document.getElementById('friends-tree-item-0-link');
        friends_evt = document.createEvent('MouseEvents');
        friends_evt.initEvent('click', true, true);
        friends.dispatchEvent(friends_evt);
        break;
    case 'D':
        // Open link in new tab.
        all_read_button = document.getElementById('mark-all-as-read');
        all_read_button_evt = document.createEvent('MouseEvents');
        all_read_button_evt.initEvent('click', true, true);
        all_read_button.dispatchEvent(all_read_button_evt);
        break;
    case '3':
        // Open next feed or first feed;
        // find the currently selected sub

        currentFeed = null;
        selectedElements = document.getElementsByClassName("tree-link-selected");
        if (selectedElements.length < 1) {
            // no feed selected
            GM_log("no feed selected")
            subTree = document.getElementById('sub-tree-container');
            subsLinks = subTree.getElementsByClassName('link');
            for (var i = 0; i < subsLinks.length; i++) {
                nextFeed = subsLinks[i];
                feedParent = nextFeed.parentNode;
                if (feedParent.className.indexOf('sub') > -1 && feedParent.className.indexOf('unread') > -1) {

                    feed_click_evt = document.createEvent('MouseEvents');
                    feed_click_evt.initEvent('click', true, true);
                    nextFeed.dispatchEvent(feed_click_evt);
                    return;
                }
            }
            break;
        }
        else {
            GM_log("poshooo")
            currentFeed = selectedElements[0];
        }
        subTree = document.getElementById('sub-tree-container');
        subsLinks = subTree.getElementsByClassName('link');
        for (var i = 0; i < subsLinks.length; i++) {

            if (currentFeed.id == subsLinks[i].id) {
                GM_log("get the next feed item")
                // get the next feed item
                for (var j = i + 1; j < subsLinks.length; j++) {
                    nextFeed = subsLinks[j];
                    feedParent = nextFeed.parentNode;
                    if (feedParent.className.indexOf('sub') > -1 && feedParent.className.indexOf('unread') > -1) {

                        feed_click_evt = document.createEvent('MouseEvents');
                        feed_click_evt.initEvent('click', true, true);
                        nextFeed.dispatchEvent(feed_click_evt);
                        GM_log("foosh next feed")
                        return;
                    }
                }



                break;
            }
        }

        // go to the first feed in subs list if all else fails
        for (var i = 0; i < subsLinks.length; i++) {
            if (subsLinks[i].parentNode.className.indexOf('sub') > -1 && subsLinks[i].parentNode.className.indexOf('unread') > -1) {
                feed_click_evt = document.createEvent('MouseEvents');
                feed_click_evt.initEvent('click', true, true);
                subsLinks[i].dispatchEvent(feed_click_evt);
                return;
            }
        }
        break;
    case '4':
        // Open previous feed or first feed;
        // find the currently selected sub
        currentFeed = null;
        selectedElements = document.getElementsByClassName("tree-link-selected");
        if (selectedElements.length < 1) {
            // no feed selected
            subTree = document.getElementById('sub-tree-container');
            subsLinks = subTree.getElementsByClassName('link');
            for (var i = 0; i < subsLinks.length; i++) {
                nextFeed = subsLinks[i];
                feedParent = nextFeed.parentNode;
                if (feedParent.className.indexOf('sub') > -1 && feedParent.className.indexOf('unread') > -1) {

                    feed_click_evt = document.createEvent('MouseEvents');
                    feed_click_evt.initEvent('click', true, true);
                    nextFeed.dispatchEvent(feed_click_evt);
                    return;
                }
            }
            break;
        }
        else {
            currentFeed = selectedElements[0];
        }
        subTree = document.getElementById('sub-tree-container');
        subsLinks = subTree.getElementsByClassName('link');
        for (var i = 0; i < subsLinks.length; i++) {

            if (currentFeed.id == subsLinks[i].id) {
                // get the next feed item
                for (var j = (i - 1); j > 0; j--) {
                    nextFeed = subsLinks[j];
                    feedParent = nextFeed.parentNode;
                    if (feedParent.className.indexOf('sub') > -1 && feedParent.className.indexOf('unread') > -1) {

                        feed_click_evt = document.createEvent('MouseEvents');
                        feed_click_evt.initEvent('click', true, true);
                        nextFeed.dispatchEvent(feed_click_evt);
                        return;
                    }
                }



                break;
            }
        }

        // go to the last feed in subs list if all else fails
        for (var i = (subsLinks.length - 1); i > 0; i--) {
            if (subsLinks[i].parentNode.className.indexOf('sub') > -1 && subsLinks[i].parentNode.className.indexOf('unread') > -1) {
                feed_click_evt = document.createEvent('MouseEvents');
                feed_click_evt.initEvent('click', true, true);
                subsLinks[i].dispatchEvent(feed_click_evt);
                return;
            }
        }
        break;
    }
    return false;
}

var SCROLL_HEIGHT = 300;
var h = document.documentElement.scrollTop;
var intervalID = 0;
var scrollElement = $(window);

function keyScroll(e) {
    if (url.indexOf("google.com/reader") > 0 && $("#entries").length > 0 && $("BODY").css("overflow") == "hidden") {
        scrollElement = $("#entries");
    }

    h = scrollElement.scrollTop()

    var key = String.fromCharCode(e.which || e.keyCode);
    var tagName = e.target.tagName;
    if (tagName == "TEXTAREA" || tagName == "INPUT" || e.metaKey || e.ctrlKey) {
        return;
    }

	if (tagName == "HTML") {
		var targ = $(e.target);
		if ($("BODY",targ)[0].className.indexOf("editable") > -1) {
			return;
		}
	}

    if (key.toLowerCase() == 'z') {
        h += SCROLL_HEIGHT;
    }
    if (key.toLowerCase() == 'x') {
        h += SCROLL_HEIGHT * -1;
    }
    scrollElement.scrollTop(h)
    e.preventDefault();
    e.stopPropagation();


}

charlietown();



