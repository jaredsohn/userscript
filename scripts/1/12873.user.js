// This is the beginnings of a fully functional ignore script for ChiefsPlanet,
// an Internet message board using vBulletin 3.0.0.  This script may be useful
// for other vBulletin based forums, but testing has not been performed by the
// author.  Use at your own risk.
//
// TODO: Identify posts by users in your list and remove them.
// TODO: Find quoted text in replies by users in your list and remove them.
// TODO: Replace any rep comments with "I'm a tool".
// 
// ==UserScript==
// @name           CPIggy
// @namespace      chiefsplanet
// @description    The beginnings of a fully functional ignore script for ChiefsPlanet
// @include        http://www.chiefsplanet.com/BB/*
// ==/UserScript==

// Initialize preferences to sane values
if (GM_getValue("iggyList") == undefined) {
    GM_setValue("iggyList", "");
}
if (GM_getValue("iggyText") == undefined) {
    GM_setValue("iggyText", "I'm a tool.");
}


var iggyList = GM_getValue("iggyList", "").split(" ");
var iggyText = GM_getValue("iggyText", "I'm a tool.");

GM_registerMenuCommand('CPIggy Iggy List', setIggy);
function setIggy() {
    var ans = prompt("Ignored users seperated by spaces:", GM_getValue("iggyList"));
    GM_setValue('iggyList', ans);
}

GM_registerMenuCommand('CPIggy Text', setText);
function setText() {
    var ans = prompt("Enter text for ignored user replacement:", GM_getValue("iggyText"));
    GM_setValue('iggyText', ans);
}


// CP doesn't use id for it's elements, so we need to find them by 
// non-traditional means.
function getElementsByClass(searchClass, node, tag) {
    var classElements = new Array();
    if (node == null) { node = document; }
    if (tag == null) { tag = '*'; }
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    for (var i = 0, j = 0; i < elsLen; i++) {
        if (pattern.test(els[i].className)) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

// Common function to generate show/hide script
function getShowHide(text, ctlIds) {
    var jsl = "";
    for (var i = 0; i < ctlIds.length; i++) {
        jsl = jsl + "var c" + ctlIds[i] + "=document.getElementById('" + ctlIds[i] + "');if(c" + ctlIds[i] + ".style.display=='none'){c" + ctlIds[i] + ".style.display='table-row';}else{c" + ctlIds[i] + ".style.display='none';}"
    }
    var link = "<a href=\"#\" onClick=\"javascript:" + jsl + " return false;\">" + text + "</a>";
    return link;
}

// If we're in a forum listing...
if (window.location.toString().match("forumdisplay")) {
    // The first element with this class is the header for the forum listing,
    // the second is the thread listing.  It's parent's parent is the TBODY
    // that contains all the threads.
    try {
        var rows = getElementsByClass('tcat')[1].parentNode.parentNode.rows;
        for (var i = 0; i < rows.length; i++) {
            // Handle rows that are too short (such as the table head, foot, etc).  We
            // need to handle this in this manner in case the total number of threads
            // displayed on each page isn't the same.
            try {
                if (rows[i].getElementsByTagName("td").length < 4) { continue; }
                if (iggyList.indexOf(rows[i].getElementsByTagName("td")[3].getElementsByTagName("a")[0].innerHTML) > -1) {
                   rows[i].parentNode.removeChild(rows[i]);
                }
            }
            catch (e) { }
        }
    }
    catch (e) { // This is a sub-forum
        var rows = getElementsByClass('tborder')[1].getElementsByTagName("tbody")[0].rows[0].getElementsByTagName("td")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].rows;
        for (var i = 0; i < rows.length; i++) {
            try {
                if (rows[i].getElementsByTagName("td").length < 4) { continue; }
                if (iggyList.indexOf(rows[i].getElementsByTagName("td")[3].getElementsByTagName("a")[0].innerHTML) > -1) {
                    
                   rows[i].parentNode.removeChild(rows[i]);
                }
            }
            catch (e) { }
        }
    }
}
// If we're viewing a thread...
else if (window.location.toString().match("showthread")) {
    var totalX = 0;
    var rows = document.getElementById("poststable").getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].rows;
    for (var i = 0; i < rows.length; i++) {
        try {
            // Handle posts by users on iggy
            var iggdUser = iggyList.indexOf(rows[i].getElementsByTagName("td")[0].getElementsByTagName("b")[0].innerHTML);
            if (iggdUser > -1) {
                // The section that normally displays a post title is changed
                // to a link that shows/hides the post
                var postId = "post" + i;
                var footId = "foot" + i;
                var showLink = getShowHide("Show/Hide post by CPIggy'd user " + iggyList[iggdUser], new Array(postId, footId));
                rows[i-1].getElementsByTagName("td")[3].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].rows[0].getElementsByTagName("td")[0].innerHTML = showLink;
                // The post and the footer are hidden by default
                rows[i].id = postId
                rows[i+1].id = footId
                rows[i].style.display = 'none';
                rows[i+1].style.display = 'none';
            }
            // Handle users who quote text by users on iggy
            else {
                try{
                    var quotes = rows[i].getElementsByTagName("td")[1].getElementsByTagName("blockquote");
                    for (var x = 0; x < quotes.length; x++) {
                        try {
                            var iggdUser = iggyList.indexOf(quotes[x].getElementsByTagName("b")[0].innerHTML);
                        } catch (e) { iggdUser = -1; }
                        if ( iggdUser > -1) {
                            oldQStart = quotes[x].parentNode.innerHTML.indexOf("<blockquote>");
                            oldQEnd = quotes[x].parentNode.innerHTML.indexOf("</blockquote>") + 13;
                            oldQ = quotes[x].parentNode.innerHTML.slice(oldQStart, oldQEnd);
                            qStart = quotes[x].parentNode.innerHTML.slice(0, oldQStart);
                            qEnd = quotes[x].parentNode.innerHTML.slice(oldQEnd, quotes[x].parentNode.innerHTML.length);
                            //alert("len="+quotes[x].parentNode.innerHTML.length+"::"+quotes[x].parentNode.innerHTML);
                            quoteId = "quote" + totalX;
                            var showLink = getShowHide("Show/Hide quote of CPIggy'd user " + iggyList[iggdUser], new Array(quoteId));
                            newQ = qStart + "<div class=\"smallfont\" style=\"padding-bottom:5px;\">" + showLink + "</div><div id=\"" + quoteId + "\">" + oldQ + "</div>" + qEnd;
                            quotes[x].parentNode.innerHTML = newQ;
                            document.getElementById(quoteId).style.display = 'none';
                            totalX = totalX + 1;
                        }
                    }
                }
                catch (e) { }
            }
        }
        catch (e) { }
    }
}
// If we're viewing our rep...
else if (window.location.toString().match("usercp.php?")) {
    var rows = document.getElementById("cat").parentNode.rows;
    for (var i = 0; i < rows.length; i++) {
        try {
            if (iggyList.indexOf(rows[i].getElementsByTagName("td")[3].getElementsByTagName("a")[0].innerHTML) > -1) {
                rows[i].getElementsByTagName("td")[4].innerHTML = "<span class=\"smallfont\">" + iggyText + "  (fixed by CPIggy)</span>";
            }
        }
        catch (e) { }
    }
}
