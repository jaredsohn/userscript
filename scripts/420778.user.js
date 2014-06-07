// ==UserScript==
// @name       Survivor Sucks EmoSlayer
// @version    0.3
// @description  Creates a "Block" button on Sucks posts and hides all posts for
//               the user when the button is pressed. Also creates a list of blocked
//               users at the bottom of each page.
// @match      http://survivorsucks.com/*
// @match      http://survivorsucks.yuku.com/*
// @copyright  2013+, jkalderash, MisterRisible
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js
// ==/UserScript==

var j$ = jQuery.noConflict();

// hide all posts for a blocked username
function hideAll(username) {
    j$("tbody.thread-post." + getFullName(username) ).hide();
    if(username.blockQuotes) {
	    j$("strong.quote-title:contains(\"" + username.text + " wrote:\")").parent().contents(":not(strong)").remove();
    	j$("strong.quote-title:contains(\"" + username.uname + " wrote:\")").parent().contents(":not(strong)").remove();
    }
    if(username.blockThreads) {
        j$("td.author").children("p.user-name").children("a[href=\"" + username.url + "\"]").parent().parent().parent().remove();
    }
}

// modify the permanent blacklist variable
function updateBlacklist() {
    GM_setValue("blacklist", blacklist);
}

// inserts a username into the blacklist. returns true if the user was not
// already blacklisted. case insensitive.
function insertIntoBlacklist(username) {
    var usernameLower = username.text.toLowerCase();
    for (var i = 0; i < blacklist.length; i++) {
        otherUsernameLower = blacklist[i].text.toLowerCase();
        if (usernameLower == otherUsernameLower) {
            return false;
        }
        if (usernameLower < otherUsernameLower) {
            break;
        }
    }
    blacklist.splice(i, 0, username);
    GM_log("New blacklist: " + j$.map(blacklist, function(v) { return v.text; } ).join(" "));
    updateBlacklist();
    return true;
}

// adds a "Block" link to each post
function addBlockLink(element, username) {
    var newItem = j$('<li><a href=\"javascript:\">Block</a></li>');
    newItem.click(function() {
        if(confirm("Are you sure you want to block " + username.text + "?") == true) {
            if(confirm("Click OK to block all quotes by " + username.text + ". Click Cancel to leave their quotes visible.") == false) {
                username.blockQuotes = false;
            }
            if(confirm("Click OK to block all threads by " + username.text + ". Click Cancel to leave their threads visible.") == false) {
                username.blockThreads = false;
            }
        	GM_log("BLOCK " + username.text);
        	if (insertIntoBlacklist(username)) {
	            hideAll(username);
	            addUnblockLink(username);
	            window.alert("Blocked " + username.text);
	        }
        }
    });
    j$(element).parents("tbody.thread-post." + getFullName(username) )
    .find("ul.reply-options").append(newItem);
}

// adds a link to unblock a blocked user
function addUnblockLink(username) {
    var newItem = j$("<a href=\"javascript:\">"
                    + username.text + "</a>");
    newItem.click(function() {
        var r = confirm("Are you sure you want to unblock " + username.text + "?");
        if(r == true) {
        	blacklist.splice(blacklist.indexOf(username), 1);
        	GM_log("New blacklist: " + j$.map(blacklist, function(v) { return v.text; } ).join(" "));
        	updateBlacklist();
        	j$(this).hide();
        	j$("tbody.thread-post." + getFullName(username) ).show();
        	alert("Unblocked " + username.text);
            location.reload(true);
        }
    });
    var list = j$("#blacklist");
    j$(list).append(" ");
    j$(list).append(newItem);
}

function Username(a){
    this.text = j$(a).text();
    this.url = j$(a).attr("href");
    
    // remove http and yuku parts of the url
    var href = j$(a).attr("href").replace(/.*?:\/\//g, "").replace(".yuku.com", "");    
        
    if (href.indexOf(".u", href.length - 2) > 0
        || href.indexOf(".e", href.length - 2) > 0) {
        href = href.substr(0, href.length - 2).replace("-", " ");
        this.uname = href;
        this.domain = null;
    } else {
        href = href.split(".");
        this.uname = href[0];
        this.domain = href[1];
    }

    this.blockQuotes = true;
    this.blockThreads = true;
}

function isNumber(n) {
  return (!isNaN(parseFloat(n)) && isFinite(n));
}

function getFullName(un) {
    if(un.uname) {
        return (isNumber(un.uname[0]) ? ("n-" + un.uname) : un.uname).replace(" ", "-") + (un.domain ? ("-" + un.domain) : "");
    } else return "";
}

j$(document).ready(function() {
    // retrieve the stored value of the blacklist
    window.blacklist = GM_getValue("blacklist", []);
    GM_log("Blacklist: " + j$.map(blacklist, function(v) { return v.text; } ).join(" "));
    if (blacklist.length == 1 && blacklist[0] == "") {
        // split() on an empty string returns [""]
        blacklist.pop();
    }
    
    // hide the posts of each blacklisted user
    if(blacklist.length > 0) {
        blacklist.forEach(hideAll);
    }
    
    // for each post, create a "Block" link
    j$("span.user-name a").each(function() {
        var username = new Username(this);
        addBlockLink(this, username);
    });
    
    // create a list of blocked users at the end of the page
    var footer = j$("div.myfooter");
    var list = j$("<p id=\"blacklist\">LIST OF BLOCKED USERNAMES (click to unblock):</p>");
    footer.append(list);
    if(blacklist.length > 0) {
        blacklist.forEach(addUnblockLink);
    }
    var clearAll = j$("<p><a href=\"javascript:\">Click here to clear all blocked usernames</a></p>");
    clearAll.click(function() {
        if(blacklist.length > 0) {
            var r = confirm("Are you sure you want to unblock all users?");
            if(r == true) {
            	window.blacklist = [];
        		updateBlacklist();
        		j$("tbody.thread-post.").show();
        		list.find("a").detach();
        		alert("Cleared all blocked usernames");
            }
        }
    });
    footer.append(clearAll);
});