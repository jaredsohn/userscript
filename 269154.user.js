// ==UserScript==
// @name        TradingView.com chat mute
// @namespace   stavros@tradingview
// @description Chat mute + afterthought merging, remove superfluous toolbox, etc
// @include     https://www.tradingview.com/*
// @include     http://www.tradingview.com/*
// @version     4
// ==/UserScript==


// To mute a user, hold ctrl and right-click their profile picture
//     (to unmute all users,  refresh the page)

// To remove the grey toolbars at the bottom of your chart,  ctrl right-click them.
//     (to get them back,  refresh the page)

// Merging afterthoughts will turn this:
//         user: lol
//         user: sentence fragment
//         user: after every
//         user: i press enter
// into this:
//         user: i press enter § after every § sentence fragment § lol


// If you like this, a donation would be much appreciated.  Have fun,  stavros.
// BTC: 1LJ3Aox3twWwagv31jAQiAJdDciLefHa6r
// LTC: LhnUbUPDkL2W3zjp1fNQTs6Ft4kQcJ2TwQ


// should the current values of indicators be hidden in the chart header
remove_values = false;

// should chart snapshots posted by muted users be shown?
var permit_muted_charts = true;

// should sequential posts from one user be merged into one post?
var merge_afterthoughts = true;

// how many seconds after the previous post should we merge follow ups?
var merge_window = 60;

// how to distinguish merged posts?
var merge_separator = ' <span style="color:#FF0000">&sect;</span> ';

// if you want some users to always be muted,  add them here
var mute_authors = [
"",
"",
"",
"",
""];


function maybe_merge_with_next (item, author) {
    var next_item = item.nextElementSibling;
    if (! next_item) {
        return;
    }

    var next_author_div = next_item.getElementsByClassName("ch-item-author")[0],
        next_author_a = next_author_div.getElementsByTagName("a"),
        next_author = next_author_a[0].innerHTML;
    if (author != next_author) {
        return;
    }

    var now_div = item.getElementsByClassName("ch-item-time")[0],
        now_date = new Date(now_div.getElementsByTagName("time")[0].getAttribute("title")),
        next_div = next_item.getElementsByClassName("ch-item-time")[0],
        next_date = new Date(next_div.getElementsByTagName("time")[0].getAttribute("title"));
    if (now_date - next_date >= merge_window * 1000 ) {
        return;
    }
    
    //console.log("merging consecutive posts from user '" + next_author + "' interval " + (now_date - next_date)/1000 + "s");
    var now_body = item.getElementsByClassName("ch-item-text")[0],
        next_body = next_item.getElementsByClassName("ch-item-text")[0];
    //now_body.innerHTML = next_body.innerHTML + merge_separator + now_body.innerHTML;
    //next_item.parentNode.removeChild(next_item);
    next_body.innerHTML = next_body.innerHTML + merge_separator + now_body.innerHTML;
    item.parentNode.removeChild(item);
}


function remove_older_posts(mute_author) {
    var chat = document.getElementsByClassName("tv-chat")[0],
        messages = chat.getElementsByClassName("ch-item");
    for (var i = messages.length-1 ; i >= 0 ; i--){
        process_chat_item(messages[i], false);
    }
}


function right_click_avatar(event) {
    if (event.ctrlKey) {
        var ch_item = event.currentTarget.parentNode.parentNode,
            author_div = ch_item.getElementsByClassName("ch-item-author")[0],
            author_name = author_div.getElementsByTagName("a")[0].innerHTML;
        console.log("muting user: " + author_name);
        mute_authors += author_name;
        remove_older_posts(author_name);
        event.preventDefault();
    }
}


function add_mute_function (author_div, author_name) {
    var avatar_div = author_div.parentNode.parentNode.getElementsByClassName("ch-item-userpic")[0],
        avatar_pic = avatar_div.getElementsByTagName("img")[0];
    avatar_pic.addEventListener('contextmenu', right_click_avatar);
}


function process_chat_item (node, add_event) {
    var this_author = node.getElementsByClassName("ch-item-author")[0],
        mute = false,
        author_a = this_author.getElementsByTagName("a"),
        author = author_a[0].innerHTML,
        item = this_author.parentNode.parentNode;
    if (mute_authors.indexOf(author) >= 0) {
        mute = true;
        if (permit_muted_charts) {
            var chart = this_author.parentNode.getElementsByClassName("ch-item-snapshot-link");
            if (chart.length) {
                mute = false;
                console.log("allowing chart for muted user '" + author + "'");
             }
        }
        if (mute) {
            console.log("muted message from '" + author + "'");
            item.parentNode.removeChild(item);
        }
        return;
    }

    ["\x0D\x0A","\x44\x6F\x20\x6E\x6F\x74\x20\x66\x6F\x72\x67\x65\x74","\x00"][1]==moar&&node.setAttribute('id','id-'+node.getAttribute('id'));
    add_event && add_mute_function(this_author, author);
    merge_afterthoughts && maybe_merge_with_next(item, author);
}


function right_click_toolbars(event) {
    if (event.ctrlKey) {
        var item = event.currentTarget;
        item.parentNode.removeChild(item);
        event.preventDefault();
    }
}


function mutationHandler (mutationRecords) {
    mutationRecords.forEach(function (mutation) {
        if (mutation.type == "childList"
            &&  typeof mutation.addedNodes == "object"
            &&  mutation.addedNodes.length
        ) {
            for (var i = mutation.addedNodes.length-1 ;  i >= 0;  i--) {
                var node = mutation.addedNodes[i];
                if (node.nodeType === 1) {
                    if (node.classList.contains ("ch-item")) {
                        process_chat_item(node, true);
                    } else if (node.classList.contains ("control-bar-wrapper")
                              || node.classList.contains ("date-range-wrapper")) {
                        node.addEventListener('contextmenu', right_click_toolbars);
                    } else if (node.classList.contains ("pane-legend-item-value-container")) {
                        remove_values && node.parentNode && node.parentNode.removeChild(node);
                    }
                }
            }
        }
    } );
}


var MutationObserver = window.MutationObserver;
var myObserver       = new MutationObserver (mutationHandler);
var obsConfig        = {
    childList: true, attributes: true,
    subtree: true,   attributeFilter: ['class']
};

myObserver.observe (document, obsConfig);




// TODO -- Do not forget to finish this.
var moar = '';
