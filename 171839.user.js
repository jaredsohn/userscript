// ==UserScript==
// @name       Survivor Sucks Block Users
// @version    0.31
// @description  Creates a "Block" button on Sucks posts and hides all posts for
//               the user when the button is pressed. Also creates a list of blocked
//               users at the bottom of each page.
// @match      http://survivorsucks.com/*
// @match      http://survivorsucks.yuku.com/*
// @copyright  2013+, jkalderash
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js
// ==/UserScript==

// hide all posts/threads/quotes for a blocked username
function hideAll(username) {
    $("tbody.thread-post." + username).hide();
    
    // From MisterRisible! Removes the text from quotes of the blocked user.
    $("strong.quote-title:contains(\"" + stripUsername(username) + " wrote:\")").parent().contents(":not(strong)").detach();
    
    // Hide threads created by the user.
    $("td.author:contains('" + stripUsername(username) + "')").parent("tr").hide();
}

// unhide posts/threads for an unblocked username
function unhideAll(username) {
    $("tbody.thread-post." + username).show();
    $("td.author:contains('" + stripUsername(username) + "')").parent("tr").show();
}

// modify the permanent blacklist variable
function updateBlacklist() {
    GM_setValue("blacklist", blacklist.join(" "));
}

// inserts a username into the blacklist. returns true if the user was not
// already blacklisted. case insensitive.
function insertIntoBlacklist(username) {
    var usernameLower = username.toLowerCase();
    for (var i = 0; i < blacklist.length; i++) {
        otherUsernameLower = blacklist[i].toLowerCase();
        if (usernameLower == otherUsernameLower) {
            return false;
        }
        if (usernameLower < otherUsernameLower) {
            break;
        }
    }
    blacklist.splice(i, 0, username);
    GM_log("New blacklist: " + blacklist.join(" "));
    updateBlacklist();
    return true;
}

// adds a "Block" link to each post
function addBlockLink(element, username) {
    var newItem = $('<li><a href=\"javascript:\">Block</a></li>');
    newItem.click(function() {
        GM_log("BLOCK " + username);
        if (insertIntoBlacklist(username)) {
            hideAll(username);
            makeUnblockList();
            window.alert("Blocked " + stripUsername(username));
        }
    });
    $(element).parents("tbody.thread-post." + username).find("ul.reply-options").append(newItem);
}

// returns a link to unblock a blocked user
function makeUnblockLink(username) {
    var newItem = $("<a href=\"javascript:\">"
                    + stripUsername(username) + "</a>");
    newItem.click(function() {
        blacklist.splice(blacklist.indexOf(username), 1);
        GM_log("New blacklist: " + blacklist.join(" "));
        updateBlacklist();
        $(this).hide();
        unhideAll(username);
        alert("Unblocked " + stripUsername(username));
    });
    return newItem;
}

// Helper function for sorting the unblock list at the bottom of the page.
function sortUnblockLinks(link1, link2) {
    s1 = link1.html().toLowerCase();
    s2 = link2.html().toLowerCase();
    if (s1 > s2) {
        return 1;
    }
    if (s2 > s1) {
        return -1;
    }
    return 0;
}

// Clear and rebuild the unblock list.
function makeUnblockList() {
    var list = $("#blacklist");
    list.find("a").detach();
    unblockLinks = blacklist.map(makeUnblockLink).sort(sortUnblockLinks);
    unblockLinks.forEach(function(unblockLink) {
        $(list).append(" ");
        $(list).append(unblockLink); 
    });
}

// strips -survivorsucks off a username
// also strips n- off the front
// and translates any remaining hyphens to spaces
function stripUsername(username) {
    var suffix = "-survivorsucks";
    if (username.indexOf(suffix, username.length - suffix.length) >= 0) {
        username = username.substring(0, username.length - suffix.length);
    }
    if (username.substr(0, 2) == "n-") {
        username = username.substr(2);
    }
    username = username.replace(/-/g, " ");
    return username;
}

// get the username from the URL of the profile page
function convertUrlToUsername(url) {
    url = url.substr(7);
    url = url.substr(0, url.length - 9);
    if (url.indexOf(".u", url.length - 2) > 0
        || url.indexOf(".e", url.length - 2) > 0) {
        url = url.substr(0, url.length - 2);
    } else {
        var dot = url.lastIndexOf(".");
        url = url.substr(0, dot) + "-" + url.substr(dot + 1);
    }
    var firstChar = url.charAt(0)
    if (firstChar >= '0' && firstChar <= '9') {
        url = "n-" + url;
    }
    return url;
}

$(document).ready(function() {
    // retrieve the stored value of the blacklist
    window.blacklist = GM_getValue("blacklist", "").split(" ");
    GM_log("Blacklist: " + blacklist.join(" "));
    if (blacklist.length == 1 && blacklist[0] == "") {
        // split() on an empty string returns [""]
        blacklist.pop();
    }
    
    // hide the posts of each blacklisted user
    blacklist.forEach(hideAll);
    
    // for each post, create a "Block" link
    $("span.user-name a").each(function() {
        var username = convertUrlToUsername($(this).attr("href"));
        addBlockLink(this, username);
    });
    
    // create a list of blocked users at the end of the page
    var footer = $("div.myfooter");
    var list = $("<p id=\"blacklist\">LIST OF BLOCKED USERNAMES (click to unblock):</p>");
    footer.append(list);
    makeUnblockList();
    var clearAll = $("<p><a href=\"javascript:\">Click here to clear all blocked usernames</a></p>");
    clearAll.click(function() {
        window.blacklist = [];
        updateBlacklist();
        $("tbody.thread-post.").show();
        list.find("a").detach();
        alert("Cleared all blocked usernames");
    });
    footer.append(clearAll);
});



