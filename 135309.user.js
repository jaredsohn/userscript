// ==UserScript==
// @name           TrollBlock
// @namespace      theo148@gmail.com
// @description    Hides Neoboard posts from intolerable Neopets users
// @version        1.1
// @include        http://www.neopets.com/neoboards/topic.phtml*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

// Simple style used for this script's clicky components
GM_addStyle(".link_like {cursor: pointer;}");
// And for any table rows that need to be inserted
GM_addStyle(".td_blend {text-align: center; border-bottom: 1px solid black; background-color: #f6f6f6}");
// For the usernames of blocked users
GM_addStyle(".blocked_user {font-weight: bold;}");

// Standard elements
var click_show = $("<tr style=\"display:none;\"><td colspan=\"3\" class=\"td_blend\"><span class=\"link_like\">&dArr; (click to show post from <span class=\"blocked_user\"></span>) &dArr;</span></td></tr>");
var click_hide = $("<tr style=\"display:none;\"><td colspan=\"3\" class=\"td_blend\"><span class=\"link_like\">&uArr; (click to hide post) &uArr;</span></td></tr>");
var block_me = $("<span style=\"display:none;\"><br><span class=\"link_like\">(block this user)</span></span>");
var unblock_me = $("<span style=\"display:none;\"><br><span class=\"link_like\">(unblock this user)</span></span>");

// Pull in existing config
var bad_users;

if ((bad_users = GM_getValue("bad_users", -1)) === -1) {
    // Sane defaults
    bad_users = [];
} else {
    bad_users = JSON.parse(bad_users);
}

/*
 * Saves the current config from global vars in memory.
 */
function save_users() {
    GM_setValue("bad_users", JSON.stringify(bad_users));
}

/*
 * Add a blocked username to the config (and triggers a config save). The
 * appropriate username is pulled from the jQuery data attached to the
 * triggering object, under the "username" key.
 */
function block_user() {
    var username = $(this).data("username");
    bad_users.push(username);
    refresh_user(username);
    save_users();
}

/*
 * Removes a blocked username from the config (and triggers a config save). The
 * appropriate username is pulled from the jQuery data attached to the
 * triggering object, under the "username" key.
 */
function unblock_user() {
    var username = $(this).data("username"), target_idx = bad_users.indexOf(username);
    if (target_idx !== -1) {
        bad_users.splice(target_idx, 1);
    }
    refresh_user(username);
    save_users();
}

/*
 * Checks a username against the blocked usernames list in the config.
 * 
 * @param name Username to check, should be a string.
 * @return True if the username should be blocked, false otherwise.
 */
function is_blocked(name) {
    return bad_users.indexOf(name) !== -1;
}

/*
 * Handles the messy stuff to get a Neoboard post displayed (assuming the
 * triggering element is a Neoboard post or associated clicky thingy).
 */
function show_post() {
    var showthis, trigger = $(this);
    if (trigger.data("username") !== undefined) {
        showthis = trigger;
    } else {
        showthis = trigger.data("showthis");
    }
    showthis.data("shower").hide();
    // Only show the hide option for blocked users
    if (is_blocked(showthis.data("username"))) {
        showthis.data("hider").show();
    } else {
        showthis.data("hider").hide();
    }
    showthis.show();
    showthis.data("message").show();
}

/*
 * Handles the messy stuff to get a Neoboard post hidden (assuming the
 * triggering element is a Neoboard post or associated clicky thingy).
 */
function hide_post() {
    var hidethis, trigger = $(this);
    if (trigger.data("username") !== undefined) {
        hidethis = trigger;
    } else {
        hidethis = trigger.data("hidethis");
    }
    hidethis.data("shower").show();
    hidethis.data("hider").hide();
    hidethis.hide();
    hidethis.data("message").hide();
}

/*
 * Attaches the required data and elements to the page's Neoboard posts.
 */
function setup() {
    $("#boards_table > tbody > tr").each(function () {
        var target = $(this), blocker, unblocker, shower, hider, username = target.find("strong.medText");
        // Only proceed if we actually found a username
        if (username.length) {
            // Prep elements
            blocker = block_me.clone().data("username", username.text()).click(block_user);
            unblocker = unblock_me.clone().data("username", username.text()).click(unblock_user);
            shower = click_show.clone();
            shower.find("span.link_like").data("showthis", target).click(show_post);
            shower.find("span.blocked_user").text(username.text());
            hider = click_hide.clone();
            hider.find("span.link_like").data("hidethis", target).click(hide_post);
            // Attach element data
            target.data("username", username.text());
            target.data("message", target.next());
            target.data("blocker", blocker);
            target.data("unblocker", unblocker);
            target.data("shower", shower);
            target.data("hider", hider);
            // Insert elements into DOM
            username.closest("a").after(blocker, unblocker);
            target.data("message").after(shower, hider);
        }
    });
}

/*
 * Runs through all the posts on the page and shows/hides them as appropriate.
 * Make sure setup() is run first.
 */
function refresh() {
    $("#boards_table > tbody > tr").each(function () {
        var target = $(this), username = target.data("username");
        // Only proceed if we actually found a username, meaning this is a post
        if (username !== undefined) {
            if (is_blocked(username)) {
                hide_post.call(target);
                target.data("blocker").hide();
                target.data("unblocker").show();
            } else {
                show_post.call(target);
                target.data("blocker").show();
                target.data("unblocker").hide();
            }
        }
    });
}

/*
 * Runs through all the posts on the page from a particular user and shows/hides
 * them as appropriate. Make sure setup() is run first.
 *
 * @param name Name of the user whose posts need refreshing.
 */
function refresh_user(name) {
    $("#boards_table > tbody > tr").each(function () {
        var target = $(this), username = target.data("username");
        // Only proceed if this is a post belonging to our user
        if (username === name) {
            if (is_blocked(username)) {
                hide_post.call(target);
                target.data("blocker").hide();
                target.data("unblocker").show();
            } else {
                show_post.call(target);
                target.data("blocker").show();
                target.data("unblocker").hide();
            }
        }
    });
}

setup();
refresh();

// vim:set shiftwidth=4 softtabstop=4 expandtab
