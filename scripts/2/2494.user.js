// LJ New Comments script
// version 1.6 
// $Id: ljnewcomments.user.js,v 1.16 2010/08/08 23:41:04 paul Exp $
// Copyright (c) 2005-2010, Paul Wright
// With the exception of the EventManager, which belongs to someone else,
// this code is released under the MIT licence which you can find at
// the bottom of this file.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "LJ New Comments", and click Uninstall.
//
// --------------------------------------------------------------------
// 
// ==UserScript==
// @name          LJ New Comments
// @namespace     http://www.noctua.org.uk/paul/
// @description   Remember which comments we've seen on LiveJournal and Dreamwidth.
// @include       http://*.livejournal.com/*
// @include       http://*.dreamwidth.org/*
// ==/UserScript==

if (!GM_log || !GM_setValue || !GM_getValue)
{
    alert("LJ New Comments script requires a more recent version of Greasemonkey. Please upgrade to the latest version.");
    return;
}

if (GM_getValue("debug"))
{
    // Log the given string with the current millisecond time, for profiling.
    function td_log(what)
    {
        var now = new Date();
        GM_log(now.valueOf() + ":" + what);
    }
}
else
{
    function td_log(what) {}
}

// Compatibility with LJ clones
var sitename = document.location.hostname.match(/\w+\.\w+$/)[0];
var site_prefix;
if (sitename == "livejournal.com")
{
    // The original, accessed without a prefix.
    site_prefix = "";
}
else
{
    site_prefix = sitename + "_";
}



// Work around Firefox 1.5 memory leak with event listeners.
// See http://www.squarefree.com/2006/02/04/memory-leak-progress/
// and http://thread.gmane.org/gmane.comp.mozilla.firefox.greasemonkey/7321
// Code from Andre (gm at andrecgn dot de)
EventManager= {
   _registry: null,
   Initialise: function() {
     if (this._registry == null) {
       this._registry = [];
       EventManager.Add(window, "_unload", this.CleanUp);
     }
   },
   Add: function(obj, type, fn, useCapture) {
     this.Initialise();
     if (typeof obj == "string")
       obj = document.getElementById(obj);
     if (obj == null || fn == null)
       return false;
     if (type=="unload") {
         // call later when CleanUp is called. don't hook up
         this._registry.push({obj:obj, type:type, fn:fn,
useCapture:useCapture});
         return true
     }
     var realType=(type=="_unload"?"unload":type);
     obj.addEventListener(realType, fn, useCapture);
     this._registry.push({obj:obj, type:type, fn:fn,
useCapture:useCapture});
     return true;
   },
   CleanUp: function() {
     for (var i = 0; i < EventManager._registry.length; i++) {
       with(EventManager._registry[i]) {
         if(type=="unload") {
             fn();
         } else {
             if (type=="_unload") type = "unload";
             obj.removeEventListener(type,fn,useCapture);
         }
       }
     }
     td_log("Cleaned up events");
     EventManager._registry = null;
   }
};


// Given an URL referring to LJ, return either an array of 2 elements being
// 0. user name
// 1. entry ID
// or return undefined if the URL is not an entry in someone's LJ.

var siteregex = sitename.replace(".", "\\.");
// This is the old form, retained for completeness.
// www.livejournal.com/users/fred/666.html
var url1regex = new RegExp("^http:\\/\\/www\\." + siteregex + "\\/(users|community)\\/([\\w-]+)\\/(\\d+)\\.html");
// pw201.livejournal.com/666.html
var url2regex = new RegExp("^http:\\/\\/([\\w-\\.]+)\\." + siteregex + "\\/(\\d+)\\.html");
// community.livejournal.com/polybdsmfurrygoths/666.html
var url3regex = new RegExp("^http:\\/\\/(users|community|syndicated)\\." + siteregex + "\\/([\\w-]+)\\/(\\d+)\\.html");

function parse_lj_link(url)
{
    var m;
    if (m = url.match(url1regex))
    {
        return m.slice(2);
    }
    else if (m = url.match(url2regex))
    {
        return m.slice(1);
    }
    else if (m = url.match(url3regex))
    {
        return m.slice(2);
    }
    else
    {
        return undefined;
    }
}

// Find a descendant with the specified XPath, and if you can't, find a follower
function desc_or_follow(obj, xpath)
{
    var retval = document.evaluate(
            'descendant::' + xpath,
            obj,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null).singleNodeValue;
    if (!retval)
    {
        retval = document.evaluate(
                'following::' + xpath,
                obj,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null).singleNodeValue;
    }
    return retval;
}


// Find a thing in an array. Return the index or -1 if it's not found.
function find_in_array(what, array)
{
    for (var i = 0; i < array.length; i += 1)
    {
        if (array[i] == what)
            return i;
    }
    return -1;
}

// Retrieve a comma separated list as an Array, using GM_getValue
function get_list(key)
{
    var l;
    if (l = GM_getValue(site_prefix + key))
        return l.split(",");
    else
        return [];
}

// How the read comment storage works:
//
// We want to prevent the comment database growing without limit, but there's
// no GM_deleteValue at the time of writing. A trick suggested by Mark
// Pilgrim is to use a pool of keys and re-cycle them, so that old values
// are continually being overwritten.
//
// So, there's a pool of keys called "entry_N" where N is a number. We'll call
// them slots. In each slot there's a comma separated array of comment numbers
// for a particular entry.
//
// There are two arrays to keep track of entries. access_order holds the
// entries we know about in order of access, with the more recent ones at the
// head of the list. Each entry is kept in this list as the string
// userName!entryId eg "pw201!666"
// 
// slot_order holds the entries we know about in order of the slots they're
// using. That is, if slot_order[5] = "pw201!666", then the GM key "entry_5"
// holds the comment numbers for pw201's entry number 666.
// 
// When we run out of spare slots, we take the key off the end of access_order
// (which is an entry the user hasn't looked at in a while), find which slot it
// uses and re-use that for the entry we're currently looking at.

// Store an array of the comment numbers we've seen for a given entry, given
// the username and entry id.
// HERE: this doesn't cope with someone decreasing max_entries.
function store_comment_array(username, id, comment_list)
{
    // Usernames are coming out of LJ, which puts dashes for underscores
    // in the new personalised sub-domains. Store them as underscores to
    // preserve the history from previous versions.
    username = username.replace(/-/,'_');
    var entry_key = username + "!" + id;
    var slot_order = get_list("slot_order");
    var access_order = get_list("access_order");
    var max_entries = GM_getValue("max_entries", 500);
    var slot_index = find_in_array(entry_key, slot_order);
    var access_index = find_in_array(entry_key, access_order);
    td_log("slot_index " + slot_index + " access_index " + access_index);
    if (slot_index != -1)
    {
        td_log("Known entry, moving to head of access_list");
        access_order.splice(access_index, 1);
        access_order.unshift(entry_key);
    }
    else
    {
        // Entry isn't known, either drop an entry to create space, or create
        // a new key.
        access_order.unshift(entry_key);
        if (access_order.length > max_entries)
        {
            // Too long, drop the oldest read entry
            var oldest_entry_key = access_order.pop();
            slot_index = find_in_array(oldest_entry_key, slot_order);
            slot_order[slot_index] = entry_key;
            td_log("Recycling slot " + slot_index + " holding " + oldest_entry_key);
        }
        else
        {
            // Use the next index until we start running out.
            slot_index = slot_order.length;
            slot_order.push(entry_key);
            td_log("Using new slot " + slot_index);
        }
    }
    td_log("Storing " + entry_key + "'s comments in slot " + slot_index);
    GM_setValue(site_prefix + "slot_order", slot_order.join(","));
    GM_setValue(site_prefix + "access_order", access_order.join(","));
    GM_setValue(site_prefix + "entry_" + slot_index, comment_list.join(","));
}

// Retrieve an array of the comment numbers we've seen for a given entry, given
// the user name and entry id. Returns an empty list if the entry isn't one
// we've seen.
function get_comment_array(username, id)
{
    username = username.replace(/-/,'_');
    var entry_key = username + "!" + id;
    var slot_order = get_list("slot_order");
    var access_order = get_list("access_order");
    var comment_list;
    var slot_index = find_in_array(entry_key, slot_order);
    var access_index = find_in_array(entry_key, access_order);
    if (slot_index == -1)
    {
        // Not found. For backwards compatibility with old versions of the
        // script, we also look for the old style keys, which just used
        // the entry_key as a GM_key.
        var comment_list = get_list(entry_key);
        if (comment_list.length > 0)
        {
            // If we found an old style key, remove the text in it, and
            // store it in our new slot arrangement, so that the seen
            // comments are not lost.
            GM_setValue(site_prefix + entry_key,"");
            store_comment_array(username, id, comment_list);
            td_log("Converted old key " + entry_key);
        }
    }
    else
    {
        comment_list = get_list("entry_" + slot_index);
        td_log("Retrieved slot " + slot_index);
        // We remember reads as well, in case someone's looking at a 
        // friends or entry page to see whether there are new comments.
        access_order.splice(access_index,1);
        access_order.unshift(entry_key);
        GM_setValue(site_prefix + "access_order", access_order.join(","));
    }

    return comment_list;
}


var thisLocation, userName, entryId; 
// array of [name, object] pairs. The name is null for entry list/friends list
// pages, and contains the comment number (the NNNN part) as a string for
// entries themselves. The object is an anchor on flist plages and whatever
// happened to have a comment ID attached on the entry itself.
var newCommentAnchors = new Array(); 
var nextComment = 0;

if (thisLocation = parse_lj_link(document.location.href))
{
    // We're on an entry page, store the relevant information from its URL.
    userName = thisLocation[0];
    entryId = thisLocation[1];
}
else
{
    // Could be a friends or recent entries page, in which case we look for
    // links with nc=N on this page and add our knowledge of the number of new
    // comments to them, and then return. As a double check, we require the
    // link text to contain the same number as the nc=N parameter.
    var links = document.evaluate(
            '//a[contains(@href,"?nc=") or contains(@href,"&nc=")]',
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null);
    var seenNew = false; 
    for (var i = 0; i < links.snapshotLength; i++)
    {
        var thisLink = links.snapshotItem(i);
        var parsedLink, ncMatch, linkTextMatch;
        if ((parsedLink = parse_lj_link(thisLink.href))
                && (ncMatch = thisLink.href.match(/[\?&]nc=(\d+)/))
                && thisLink.firstChild.nodeValue
                && (linkTextMatch = thisLink.firstChild.nodeValue.match(/\d+/))
                && (ncMatch[1] == linkTextMatch[0]))
        {
            // Deleted comments make the new number negative as we've no
            // way of knowing they've gone, so ensure we never mark an
            // entry with (-1 new) or similar.
            var commentArray = get_comment_array(parsedLink[0], parsedLink[1]);
            var num_new = ncMatch[1] - commentArray.length;
            if (num_new >= 0)
                thisLink.firstChild.nodeValue += " (" + num_new + " new)";
            if (num_new > 0)
            {
                // Use the same format for newCommentAnchors as we do on an
                // actual entry page, so set the comment number to the null string.
                newCommentAnchors.push(["", thisLink]);
                seenNew = true;
            }
            td_log(parsedLink[0] + "!" + parsedLink[1]);
            td_log(thisLink.href + " has " + num_new + " new");
        }
    }
    // We can use the same keypress_handler as we do on entry pages.
    if (seenNew)
        EventManager.Add(document, "keypress", keypress_handler, true);

    return;
}
td_log("userName " + userName);
td_log("entryId " + entryId);


// To test whether we've seen a number, we first convert the list into an
// associative array with keys as comment numbers (because there's no array
// indexOf method in the JS version I have, and a hash is probably quicker
// anyway).
// 
// We also use commentHash as a way of preferring elements with an id (which
// might be a div or a table we can draw a box around to indicate the selected
// comment) to elements with a name (which will just be an anchor). Some styles
// have both for some comments and we'd like to draw a box around all the
// comments if we can. We keep track of which comment ID's are where in
// newCommentAnchors by making the index into newCommentAnchors the value of
// the hash, so we can always go back and substitute for an element if we
// encounter one we like more.
var commentArray = get_comment_array(userName, entryId);
commentHash = new Object();
if (commentArray)
{
    for (var i = 0; i < commentArray.length; i++)
        commentHash[commentArray[i]] = -1;
}

td_log("Retrieved seen comments");

var allAnchors;

// Comments seem to be introduced with either elements with id attributes of
// the form ljcmtNNNN or tNNNN or anchors named tNNNN, or possibly both. To
// preserve the thread ordering, we need to find both with a single search
// using XPath, so we assume that anything with an ID or name of the right form
// is what we're after. God, I love LJ.
allAnchors = document.evaluate(
    '//*[starts-with(@id,"ljcmt") or starts-with(@id,"cmt") or starts-with(@name,"t") or starts-with(@id,"t")]',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allAnchors.snapshotLength; i++)
{
    var thisAnchor = allAnchors.snapshotItem(i);
    var m;
    // No xpath 2.0 regex support in Firefox, apparently, so filter more here. 
    var attr = thisAnchor.id || thisAnchor.name;
    if (attr && ((m = attr.match(/^ljcmt(\d+)$/)) ||
                (m = attr.match(/^cmt(\d+)$/)) ||
            (m = attr.match(/^t(\d+)$/))))
    {
        td_log("Matched " + m);
        // We prefer elements with an id to elements with a name, as
        // the latter might be something we can draw a box around.
        if (m[1] in commentHash)
        {
            var index = commentHash[m[1]];
            if (index != -1 &&
                    newCommentAnchors[index][1].name && thisAnchor.id)
            {
                newCommentAnchors[index] = [m[1], thisAnchor];
            }
        }
        else
        {
            newCommentAnchors.push([m[1], thisAnchor]);
            commentHash[m[1]] = newCommentAnchors.length - 1;
        }
    }
}

// HERE: try a bit harder. Look in LJcmt hash thing that LJ provides, and
// look for thread links for the new ones, and mark them up. Better than
// nothing for styles which don't provide named anchors or elements for
// collapsed comments. LJ's standardisation wins again!

// If there's nothing to do here, stop now.
if (newCommentAnchors.length == 0)
    return;

var newElement;
var elementIndex = 0;
var last_obj, last_outlineStyle;

function select_obj(obj, isComment)
{
    if (last_obj)
        last_obj.style.outlineStyle = last_outlineStyle;
    last_outlineStyle = obj.style.outlineStyle;
    last_obj = obj;
    obj.style.outlineStyle = 'dotted';
    // We put the element at the top of the screen for comments, at the bottom
    // for entries. This probably works with most styles.
    obj.scrollIntoView(isComment); 
}

function min(a, b)
{
    if (a < b)
        return a;
    else
        return b;
}

// We batch up marking up comments as new, otherwise we lock out Firefox for ages on
// pages with hundreds of comments, which causes it to warn the user that our
// Javascript hasn't stopped running.
function markup_new_comments()
{
    var last_comment = min(newCommentAnchors.length, elementIndex + 50);
    td_log("Marking up comments");
    for (; elementIndex < last_comment; elementIndex++)
    {
        var commentNumber = newCommentAnchors[elementIndex][0];
        var thisAnchor = newCommentAnchors[elementIndex][1];

        td_log("commentNumber " + commentNumber);

        // Find a thread link following this anchor. This is probably a good place
        // to put a note that this is new, as in most styles it's pretty prominent
        // in the header or footer. Since LJ has no consistency in div class or
        // span names for different parts of the page, it's the best I can do. 
        var thisLink = desc_or_follow(thisAnchor,
                'a[contains(@href,"' + commentNumber + '")]');

        if (thisLink)
        {
            // Make each entry on a new comment a link to the next new comment
            newElement = document.createElement('a');
            newElement.innerHTML = '<a href="javascript:void(0);">NEW</a>';
            thisLink.parentNode.insertBefore(newElement, thisLink);
            newElement.parentNode.insertBefore(document.createTextNode(" "), thisLink);
            // When the link is clicked, update our value of the next comment for
            // the key bindings, and move the highlighted box to the comment we clicked.
            // This needs a closure, because the click handler needs to
            // remember the elementIndex for its specific object.
            EventManager.Add(newElement, "click", 
                    function (ei) {
                    return function()
                    {
                    select_obj(newCommentAnchors[ei][1], true);
                    nextComment = ((ei + 1) % newCommentAnchors.length);
                    }
                    } (elementIndex))
            td_log("comment " + commentNumber + " is marked");
        }
    }
    if (elementIndex < newCommentAnchors.length)
    {
        td_log("Back later");
        window.setTimeout(markup_new_comments, 400);
    }
}

// Markup some new comments, arrange to come back for more if there are lots
markup_new_comments();

// Remember the comments we saw. GM can only store strings, so we stuff
// everything back into a string, via an array's join method.    
var storedArray = new Array();
// There doesn't appear to be anything like Python's keys() method for
// associative arrays, pace all those web pages which claim that Javascript is
// a real programming language.
for (commentNumber in commentHash)
    storedArray.push(commentNumber);


if (storedArray.length > 0)
{
    store_comment_array(userName, entryId, storedArray);
    td_log("Storing " + storedArray);
}


// Handle keypresses on the individual entry and on entries/friendlist pages
function keypress_handler(event)
{
    var t = event.target;
    if (t && t.nodeName && (t.nodeName == "INPUT" || t.nodeName == "SELECT" || t.nodeName == "TEXTAREA"))
        return;

    // Return if any modifier is active, so we don't handle e.g. ctrl+n
    if(event.ctrlKey || event.altKey  || event.ctrlKey  || event.metaKey  || event.shiftKey)
        return;

    // Allow return key to follow link to entry with new comments.
    if (event.which == 13 && last_obj && last_obj.nodeName == 'A')
    {
        window.location.href = last_obj.href;
        return;
    }

    if (event.which != 110 && event.which != 112 && event.which != 1090 && event.which != 1079)
        return;
    var isComment = (newCommentAnchors[nextComment][0] != "");
    var obj;
    var commentNumber;
    if (event.which == 110 || event.which == 1090) // 'n', or 'n' in Russian
    {
        obj = newCommentAnchors[nextComment][1];
        commentNumber = newCommentAnchors[nextComment][0];
        nextComment = (nextComment + 1) % newCommentAnchors.length;
    }
    else if (event.which == 112 || event.which == 1079) // 'p', or "p" in Russian
    {
        nextComment = (nextComment + newCommentAnchors.length - 1) % newCommentAnchors.length;
        obj = newCommentAnchors[(nextComment + newCommentAnchors.length - 1) % newCommentAnchors.length][1];
        commentNumber = newCommentAnchors[(nextComment + newCommentAnchors.length - 1) % newCommentAnchors.length][0];
    }
    select_obj(obj, isComment);
    if (isComment)
    {
        var expander = desc_or_follow(obj,
                'a[contains(@href,"' + commentNumber + '")]/child::text()[string(.)="Expand"]');
        var replylink = desc_or_follow(obj,
                'a[contains(@href,"?replyto=' + commentNumber + '")]');
        if (expander && !replylink)
        {
            var evt = document.createEvent("MouseEvents");
            if(evt && evt.initMouseEvent) {
                evt.initMouseEvent("click",true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);
                expander.parentNode.dispatchEvent(evt);
            } 
        }
    }
}


EventManager.Add(document, "keypress", keypress_handler, true);
td_log("added event listener");

// HERE: have mark all as read/unread option. Have mark thread as unread option
// using the JS array for the thread structure which LJ provide. Markup expanded
// threads using LJ's expander code.

// Version  Date        Comment
// 0.1      2006-01-02  First version
// 0.2      2006-01-03  Cope with ljcmt ids and absence of comment permalinks,
//                      use scrollIntoView, add "p" key, make debug optional
// 0.3      2006-01-04  Yet more varieties of comment anchor/id thingies.
// 0.4      2006-01-04  Broke javascript, fixed it.
// 0.5      2006-01-19  New LJ URL style, limit history of seen entries.
// 0.6      2006-01-19  - becomes _ in stored name, for backwards compat.
// 0.7      2006-02-08  Work around sieve-like FF1.5. Don't display (-3 new) or similar.
// 0.8      2006-02-09  Fix bug in EventManager.
// 0.9      2006-06-04  "n" and "p" work on friendlists. Box around selected comment.
// 1.0      2007-02-20  Fix bug with CTRL+N intercept, courtesy of Legolas.
//                      Try harder to draw boxes.
// 1.1      2008-03-31  XPath speedups, make NEW links work better.
// 1.2      2008-09-24  Russian keyboards, make threads expand.
// 1.3      2009-01-27  Independentminds journals now recognised.
// 1.4      2009-05-04  Dreamwidth support.
// 1.5      2009-09-22  Dreamwidth support amended.
// 1.6      2010-08-09  Make syndicated journals work

// Copyright (c) 2005-2009 Paul Wright
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.

