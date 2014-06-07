// Allows users to unfollow individual subforums or topics from a phpbb3 forum,
// so that such forums/topics no longer show up in their "View unread posts" or
// "View new posts" pages. Designed for the lifein19x19.com subsilver2 theme. By
// modifying the @include fields below, it should work on any phpbb3 forum
// running the subsilver2 theme. Other themes are not currently supported.

// Copyright 2013 Dusk Eagle (duskeagle.com)
 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// ==UserScript==
// @name          Unfollow Forums and Topics
// @version       1.0
// @description   Allows you to filter individual threads or entire subforums from lifein19x19.com so that they don't show up in your "View unread posts" or "View new posts" pages.
// @require       http://code.jquery.com/jquery-latest.js
// @namespace     http://duskeagle.com
// @include       http://lifein19x19.com/*
// @include       http://www.lifein19x19.com/*
// ==/UserScript==

// The phrase "check box" is used throughout the code as a generic term for
// anything that toggles the follow/unfollow state of a forum or topic.
// Sometimes they refer to actual checkboxes, other times to text links.
// Yes, this is a bit of a poor naming choice.

var UNFOLLOW = 0;
var FOLLOW = 1;
var SHOW_UNFOLLOWED = "show_unfollowed";

// Does check box already exist on page? We don't want to add more than one.
var check_box_exists = false;

// Adds check boxes (real ones!) to any page that displays a list of forums
// or topics.
function addCheckBoxes () {
    //***** Format the top row *****//
    $("td[colspan=6]").attr('colspan', 7);
    
    $("td[colspan=5]").eq(0).attr('colspan', 6);
    $("td[class=catdiv]").attr('colspan', 4);
    
    $("th[colspan=2]").after('<th width="50">&nbsp;Follow?&nbsp;</th>');
    
    //***** Format the search.php page. *****//
    if (getCurrentPage().match (/^search\.php/)) {
        // Add a link to allow user to see all unread posts, not just ones being
        // followed.
        if (GM_getValue (SHOW_UNFOLLOWED) != 1) {
            var view_unfollowed_html = '<br><span><a class="viewunfollowed" href="javascript:void(0)">View unfollowed posts</a></span>';
        }
        else {
            var view_unfollowed_html = '<br><span><a class="viewunfollowed" href="javascript:void(0)">View followed posts only</a></span>';
        }
        $("span[class=titles]").after (view_unfollowed_html);
        
        if (GM_getValue (SHOW_UNFOLLOWED, 0) == 0) {
            $("[class=viewunfollowed]")[0].addEventListener ("click", viewUnfollowedTopics, true);
        }
        else {
            $("[class=viewunfollowed]")[0].addEventListener ("click", function () {location.reload();}, true);
        }
            
        // Fixes the bottom row of the search.php page (Not a problem for other
        // pages).
        $("td[class=cat]").attr('colspan', 8);
    }
    
    //***** Add the checkboxes  *****//
    var subforums = $("[class=forumlink]"); 
    
    for (var i=0; i < subforums.length; i++) {
        
        var page = getPageIDFromIndex (i, true);
        if (GM_getValue (page, "undef") == "undef" || GM_getValue (page) == FOLLOW) {
            $(subforums.eq(i).closest('td')).after ('<td class="row2" align="center"><input type="checkbox" name="followforum" class="followforum" checked></td>');
        }
        else {
            $(subforums.eq(i).closest('td')).after ('<td class="row2" align="center"><input type="checkbox" name="followforum" class="followforum"></td>');
        }
    }
    
    var topics = $("a[class=topictitle]", ".row1");
    
    for (var i=0; i < topics.length; i++) {
        
        var page = getPageIDFromIndex (i, false);
        var forum_id = page.split('&')[0];

        if (GM_getValue(page) == FOLLOW || 
        (GM_getValue(forum_id) != UNFOLLOW && GM_getValue(page) != UNFOLLOW)) {
            topics.eq(i).parent().after ('<td class="row2" align="center"><input type="checkbox" name="followtopic" class="followtopic" checked></td>');
        }
        else {
            topics.eq(i).parent().after ('<td class="row2" align="center"><input type="checkbox" name="followtopic" class="followtopic"></td>');
        }
    }
    
    var forum_checkboxes = $("[class=followforum]");
    for (var i=0; i < forum_checkboxes.length; i++) {
        forum_checkboxes[i].index_param = i;
        forum_checkboxes[i].is_forum_param = true;
        forum_checkboxes[i].addEventListener ("click", checkBoxClicked, true);
    }
    
    var topic_checkboxes = $("[class=followtopic]");
    for (var i=0; i < topic_checkboxes.length; i++) {
        topic_checkboxes[i].index_param = i;
        topic_checkboxes[i].is_forum_param = false;
        topic_checkboxes[i].addEventListener ("click", checkBoxClicked, true);
    }
    
}

function addCheckBoxToCurrentTopic () {
//     window.alert ("addCheckBoxToCurrentTopic");
    var page = getPageIDOfCurrentPage ();
    var forum_id = page.split('&')[0];
    
    var follow_topic_text = '<a title="Follow topic" class="followtopic" href="javascript:void(0)">Follow topic</a>';
    var unfollow_topic_text = '<a title="Unfollow topic" class="followtopic" href="javascript:void(0)">Unfollow topic</a>';
    
    if (GM_getValue(page) == FOLLOW || 
        (GM_getValue(forum_id) != UNFOLLOW && GM_getValue(page) != UNFOLLOW)) {
        if (check_box_exists) {
            $('[class=followtopic]').html ('Unfollow topic');
            $('[class=followtopic]').prop ('title', 'Unfollow topic');
        }
        else {
            $('a[title="Subscribe topic"]').before (unfollow_topic_text + ' | ');
            
            /* Currently there is no "Follow/Unfollow Topic" link on the bottom
            of a topic page. If in the future I add one, this is the starting
            code for it. However, you can't just uncomment these lines and have
            everything work - there's more to it than that.*/
            //$('form[name="viewtopic"]').closest('td').before ('<td class="cat">' + unfollow_topic_text + '</td>');
            //$('form[name="viewtopic"]').closest('table').prop ('cellspacing', 0);
        }
    }
    else {
        if (check_box_exists) {
            $('[class=followtopic]').html ('Follow topic');
            $('[class=followtopic]').prop ('title', 'Follow topic');
        }
        else {
            $('a[title="Subscribe topic"]').before (follow_topic_text + ' | ');
        }
    }
    
    var checkbox = $('[class=followtopic]');
    checkbox[0].index_param = -1;
    checkbox[0].is_forum_param = false;
    checkbox[0].addEventListener ("click", checkBoxClicked, true);
    check_box_exists = true;
}

function viewUnfollowedTopics () { 
    GM_setValue (SHOW_UNFOLLOWED, 1);
    location.reload();
}

// Given a 0-based index and a boolean indicating whether we're looking for a 
// forum or topic, returns the forum or topic full URL at that index.
// Sample Input: 0
// Sample Output: "http://lifein19x19.com/forum/viewforum.php?f=5"
function getURLFromIndex (index, is_forum) {
    if (is_forum) {
        return $("a[class=forumlink]").eq(index).attr('href');
    }
    else {
        return $("a[class=topictitle]").eq(index).attr('href');
    }
}

// Sample Input: 0, true
// Sample Output: "f=5"
// Sample Input: 3, false
// Sample Output: "f=10&t=1337"
function getPageIDFromIndex (index, is_forum) {
    return getURLFromIndex (index, is_forum).split ("?")[1];
    
}

// Won't work if called from forum listing rather topic page.
// The fix would be simple, but there's no need for it at this time.
// Sample Output: "f=10&t=1337"
function getPageIDOfCurrentPage () {
    var temp_url_array = window.location.href.split("?")[1].split("&").slice(0, 2);
    return temp_url_array [0] + "&" + temp_url_array [1];
}

// Called when check box is clicked.
// index is the index of the checkbox clicked, is_forum is a boolean for
// whether the checkbox represents a subforum or a topic.
// If index = -1, then we're being asked to follow/unfollow a topic from
// within that topic itself, rather than from the list of topics.
function checkBoxClicked (caller) {
    var index = caller.target.index_param;
    var is_forum = caller.target.is_forum_param;
    
    // page is what gets remembered as followed or unfollowed. It could be a
    // forum or a topic (check is_forum for type).
    if (index == -1) {
        var page = getPageIDOfCurrentPage ();
    }
    else {
        var page = getPageIDFromIndex (index, is_forum);
    }

    if (is_forum) {
        if (GM_getValue (page, "undef") == "undef" || GM_getValue (page) == FOLLOW) {
            GM_setValue (page, UNFOLLOW);
        }
        else {
            // We could set to FOLLOW, we just remove entry entirely, and this is
            // treated as being followed.
            GM_deleteValue (page);
        }
    }
    else {
        var forum_id = page.split('&')[0];

        if (GM_getValue (forum_id, "undef") == "undef" || GM_getValue (forum_id) == FOLLOW) {
            if (GM_getValue (page, "undef") == "undef" || GM_getValue (page) == FOLLOW) {
                GM_setValue (page, UNFOLLOW);
            }
            else {
                // Don't explicitly follow, it's enough that we're following
                // the forum that this topic is in.
                GM_deleteValue (page);
            }
        }
        else {
            if (GM_getValue (page, "undef") == "undef" || GM_getValue (page) == UNFOLLOW) {
                GM_setValue (page, FOLLOW);
            }
            else {
                // Don't explicitly unfollow, it's enough that we're not
                // following the forum that this topic is in.
                GM_deleteValue (page);
            }
        }
    }
    
    if (index == -1) {
        // We call addCheckBoxToCurrentTopic to change the text displayed
        // from "Follow topic" to "Unfollow topic" or vice versa.
        addCheckBoxToCurrentTopic ();
    }
    
}

// Sample Output: "index.html"
function getCurrentPage () {
    // pop() is a nice one-liner to get the last element after the split.
    return window.location.pathname.split('/').pop();
}

function filterTopics () {
    var topics = $("tr[valign=middle]");
    for (var i = 0; i < topics.length; i++) {
        var topic_id = $("a", topics.eq(i)).eq(1).attr("href").split('?')[1];
        var forum_id = topic_id.split('&')[0];
        
        // Prefetch for faster comparisons.
        var topic_id_follow = GM_getValue (topic_id);
        var forum_id_follow = GM_getValue (forum_id);
        
        /* Follow rules work as follows (haha funny pun):
        Absense of follow or unfollow tag on forum implies follow.
        if following forum:
            display all topics in forum except those EXPLICITLY marked unfollow.
        if not following forum:
            don't display any topics in forum except those EXPLICITLY marked follow.
        */
        if (((forum_id_follow != UNFOLLOW) && (topic_id_follow == UNFOLLOW))
        || ((forum_id_follow == UNFOLLOW) && (topic_id_follow != FOLLOW))) {
            topics.eq(i).remove();
        }
    }
}

function main () {
    check_box_exists = false;
    var current_page = getCurrentPage();
    if (current_page.match (/^search\.php/)) {
        addCheckBoxes();
        if (GM_getValue (SHOW_UNFOLLOWED) != 1) {
            filterTopics ();
        }
        GM_deleteValue (SHOW_UNFOLLOWED);
    }
    else if (current_page.match (/^viewtopic\.php/)) {
        addCheckBoxToCurrentTopic();
    }
    else if (current_page.match (/^index\.php/) || current_page.match (/^viewforum\.php/)) {
        addCheckBoxes();
    }
}

main();

/*
"So you're looking for somepony to take you under their wing, huh? Yeah, I might
be up for something like that."
PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPPPPPPPPPPIIIIIIIIIIIIIIIIIPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPPPPPPIIIIIIIIIIIIIIIIIIII??IINPPPPPPPPP+++?PPPPPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPPPPIIII7PIIIIIIIIII?III?IIII?I7IPPPPPP+~~~++PPPPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPP77PPP7IIIIIII?IIIIIIIIIII:::::::I7P$+~~~~~+IPPPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPPPPP7IIIII??IIIIIIIIIII+::::::::::::+~~~~~~~+PPPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPPPPIIIIIIIIIIIIIIIIIII:::::::::::::+~~~~~~~~:+PPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPP8III?7IIIIIIIIIIIII::::::::::::::~~~~~~~~~~~+PPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPP$7I?7IIIIIIIIIIIIII:::::::::,III~~~~~~~~~~~~~+PPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPP7IIPI?IIIIIIIIIII=:::::::,II=:~~~~~~~~~~~~~~~~NPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPIINPN7IIIIIIIIIII:::,::::II~~~~~~~~~~~~~~~~~~~~PPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPIPPPIIIIIIIIIIII:::I:::I=~~~~~~~~~~~~~~~~~+~~~+PPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPIPPPIIIIIIIIIIII:+7~,:77:~~~~~~~~~~~~~~~~~~~~~~+PPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPPPIIIIIIIIIIIII~~I:I~~~~PPPPP~~~~~~~~~~~~~~~~+PPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPPIIIIIIIIIII~~~~~II:~:P:~~~~~:P:~~~~~~~~~~~~+7PPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPPIIIIIIII7~P~~~~~I~~~P~~~~~~~~~PDD~~~~~~~~~+?7PPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPII??IIIPP~~~~~~~~~~~P~~~~~~~~~~~~IP~~~~~~~+?77$PPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPP7IIIIPPPPZN~~~~~~~~~~P~~~~~~~~~~~~~~~~~~~~~+=777IPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPDIPPPPPPPPPPI~~~~~~~~~~P~~~~~~~~~~~~~~~~~~~~~~I777IPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPPPPPPPPP~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~777IIPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPPPPPPPPP+~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~I$77IIPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPPPPPPPPZ=::~~~~~~~~~~~~~~~~~~~~~~~~~~~~~I7777IIDPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPPPPPP$7+++~~~~~~~~~~~~~~~~~~~~~~~~~~~~~=I777IIIIPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPPP77++7+:~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~II7777IIIIPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPPP7+++++7=:~~~~~+~~~~~~~~~~~~~~~~~~~~~~I77777IIIIIPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPPP7+I++++77+~~~~+~~~~~~~~~~~~~~~~~~~~~~77777$IIIIIIPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPZ$+++++++777++=+~~~~~~~~~~~~~~~~~~~~~I7777777IIIIIIPPPPPPPPPPPPPPPP
PPPPPPPPPPPPZZ7=++++++?7777++?~~~~~~~~~~~~~~~~~7IIIIII777IIIII7IPPPPPPPPPPPPPPPP
PPPPPPPPPPPPZ7I+++++++=7777777++++++++++++++7~~Z~~~~I777IIIIII$IPPPPPPPPPPPPPPPP
PPPPPPPPPPPZZ7++++++++++$7777777I777777777Z+7~:IZ~~I77$IIIIII$7IPPPPPPPPPPPPPPPP
PPPPPPPPPPPZ77?++++++++++$77777777777777777ZI~Z77:II77IIIIII7$IIPPPPPPPPPPPPPPPP
PPPPPPPPPPPZ7777++++++++++7777Z777Z77777777777777ZI$7IIIIIII$$IPPPPPPPPPPPPPPPPP
PPPPPPPPPPPZZ77+++++++++++Z777ZZ777Z777777777777$I7IIIIIIII$$$IPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPZ77+++++++++++Z77Z++ZI777Z7777777777ZIIIIIIIIII$$7IPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPZ77++++PO++?P+Z7Z++++=$7777Z777777Z:IIIIIIIIII$$$IPPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPOZ7+++P=+++++=O=++++++++$Z$I7$ZZZ:~~IIIII+III$$$$IPPPPPPPPPPPPPPPPPP
PPPPPPPPPPPPPZ7$+P++++++++++++++++++=++++P+7~~~7IIII7+III$$$$7PPPPPPPP?+=PPPPPPP
PPPPPPPPPPPPPP7++P+++++++++=++++++++++++++$~~~~7IIII++7I$$$$IPPPPPP?+~~~:+PPPPPP
PPPPPPPPPPPPPPI+=++++++++++N+++++++++++++OZ~~~~7III=++7I$$$$IPPPP+~=:~~~::+PPPPP
PPPPPPPPPPPPPZZ7+++++++++++?++++++8++++++N~~~~~~III++++I$$$$IPP+~~+~~~~~~~+PPPPP
PPPPPPPPPPPPPPZZ7+++++++++++++++++++++++=7~~~~~~I7+++++7I$$$I+~~~=~~~~~~~~+PPPPP
PPPPPPPPPPPPP++$$7+++++++++++++++++++++=7~~~~7I==I+77$~~II$$I~~~~~~~~~~~~++PPPPP
PPPPPPPPPPPP+~~~~+++++++++++$+++++++++7=~~~~7++++?+++7I~~II$I++:++++~~~~+~+PPPPP
PPPPPPPPPPPP+~~~~~~~~++++++7++++++++7?++~~~~$++++++++7~:~~+7I~~:~~~~+~~+~+8PPPPP
PPPPPPPPPPPPP+~~~~~~~~~?+7I++?7777++7+++~~~7++++++++7:+~~~~~I=~~~~~~++~~~+PPPPPP
PPPPPPPPPPPPP+:~~~~~~~~~~++++++++++++7++~~I?+++++++7~:=~~~~~~~~~~~~~+~~~+?PPPPPP
PPPPPPPPPPPPP+~~~~~~~~~~~~~++++++++++7++:77+++++++7~~~+~~~~~~~~~~~~~~+~=+PPPPPPP
PPPPPPPPPPPPPP+~~~~~~~~~~~~~+++++++++++++++++++++7~~~++~~~~~~~~~~~~~~+:+++PPPPPP
PPPPPPPPPPPPPP+~~~~~~~~~~~~~:++++++++++++++++++77~~~~+++~~~~~~~~~~~~~++~~++PPPII
PPPPPPPPPPPPPP+~~~~~~~~~+~~~~~+++++++++++++++77~~~~~~~+++:~~~~~~~~~=+~~~~~:+NI$$
PPPPPPPPPPPPPP+~~~~~~~~~++~~~~++?77+++++?$77~:~~~~~~~:+~++=~~~~~~+++~~~~~~~++$$$
                             Sweetest moment ever.                              
*/