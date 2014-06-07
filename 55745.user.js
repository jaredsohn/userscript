// ==UserScript==
// @name           HackerBlacker
// @namespace      http://jasonfager.com
// @description    Blacklist Hacker News users.
// @include        http://news.ycombinator.com/*
// ==/UserScript==

// The require header is weird, so load jquery manually.
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery;
        doStuff();
    }
}

GM_wait();

function profileUsername() {
    return /Hacker News \| Profile: (\w+)/.exec(document.title);
}

function initList(listName) {
    var list = GM_getValue(listName, '');
    return (list == '') ? [] : list.split(',');
}

function initUserList(listName) {
    var userList = {};
    userList.name = listName;
    userList.users = initList(listName);
    userList.has = function(username) {
        return $.inArray(username, userList.users) >= 0;
    };
    userList.add = function(username) {
        if(!userList.has(username)) {
            userList.users.push(username);
            window.setTimeout(function() {
                GM_setValue(listName, userList.users.join(','));
            }, 0);
        }
    };
    userList.remove = function(username) {
        var index = $.inArray(username, userList.users);
        if(index >= 0) {
            userList.users.splice(index, 1);
            window.setTimeout(function() {
                GM_setValue(listName, userList.users.join(','));
            }, 0);
        }
    };
    userList.clear = function() {
        userList.users = [];
        window.setTimeout(function() {
            GM_setValue(listName, '');
        }, 0);
    };
    return userList;
}

var blacklist = initUserList('blacklist');
var whitelist = initUserList('whitelist');

function addOption(username, userList) {
    var n = userList.name;
    var add = $('<a href="' + n + '"><u>' + n + '</u></a>');
    var rem = $('<a href="un' + n + '"><u>un' + n + '</u></a>');

    add.click(function() {
                  userList.add(username);
                  add.toggle(); rem.toggle();
                  return false;
              });
    rem.click(function() {
                  userList.remove(username);
                  add.toggle(); rem.toggle();
                  return false;
              });

    var button = userList.has(username) ? add.hide() : rem.hide();
    $("td:contains('user:')").next().append('&nbsp;').append(add).append(rem);
}

function addBlacklistOption(username) {
    return addOption(username, blacklist);
}

function addWhitelistOption(username) {
    return addOption(username, whitelist);
}

function addOptions(username) {
    addBlacklistOption(username);
    addWhitelistOption(username);
}

function buildSelector(userList) {
    return $.map(userList.users, function(item) {
        return "a[href='user?id=" + item + "']";
    }).join(',');
}

function collapseComments() {
    var comments = $(buildSelector(blacklist))
                       .closest("td")
                       .find(".comment");

    comments.each(function(i) {
                      var comment = $(this);
                      var toggler = $('<span>...</span>');
                      toggler.click(function() {comment.toggle();});
                      comment.before(toggler).before('&nbsp;').hide();
                  });
}

function highlightComments() {
    $(buildSelector(whitelist)).css('color', '#ff6200');
}

function filterComments() {
    collapseComments();
    highlightComments();
}

function doStuff() {
    //blacklist.clear();
    var user = profileUsername();
    if(user) {
        addOptions(user[1]);
    } else  {
        filterComments();
    }
}

