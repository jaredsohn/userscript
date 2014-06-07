// ==UserScript==
// @name           Filmtipset mark nicks.
// @version        0.1.1
// @description  Mark your own and friends names with a little square.
// @namespace  http://userscripts.org/users/121410
// @include        http://nyheter24.se/filmtipset/*
// ==/UserScript==

function isChrome()
{
   return navigator.userAgent.toLowerCase().indexOf('chrome') > -1 && GM_info == undefined;
}

/**
 * Peform a get xmlhttpRequest with a callback function
 */
function get(url, callBack)
{
     GM_xmlhttpRequest({
     method: "GET",
     url: url,
     onload: function(xhr) { callBack(xhr.responseText); }
    });
}

/**
 * Add css style to the document.
 */
function addStyle(css)
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    try {
        style.innerHTML = css;
    } catch(err) {
        style.innerText = css;
    }
    head.appendChild(style);
}

function FriendHandler()
{
    var friends;
    try {
        friends = JSON.parse(GM_getValue("filmtipsetFriends"))
    } catch(err) {
        /**
            If using Google Chrome add a list of people you would like to
            mark as friend in the forum, i.e
            friends = ['Morgan','Powha','Skeletor'];
        **/
        friends = [];
    }

    var me = document.querySelectorAll(
        'div.menuitemtitle'
    )[7].innerHTML.replace(/<.+>/,'');

    var updateFriends = function (friendPageContent)
    {
        var offset = 21600000;
        var nextUpdate = new Date().getTime() + offset;
        friends = [];
        friendPageContent.replace(
            /<a class="member" .*?>(.*?)(,|)&nbsp;<\/a>/gm,
            function(m, n) {friends.push(n)}
        )
        GM_setValue("filmtipsetFriends", JSON.stringify(friends));
        GM_setValue("filmtipsetNextFriendUpdate", nextUpdate.toString());
    }

    this.checkUpdate = function()
    {
        var nextUpdate = + GM_getValue("filmtipsetNextFriendUpdate");
        var url = 'http://nyheter24.se/filmtipset/yourpage.cgi?page=friends_online';
        var now = new Date().getTime();
        if(nextUpdate < now || !nextUpdate) {
            get(url, updateFriends);
        }
    }

    this.getFriends = function()
    {
        return friends;
    }

    this.isFriend = function(name)
    {
       return friends.indexOf(name) > -1;
    }

    this.isMe = function(name)
    {
       return me == name;
    }

    if(!isChrome())
        this.checkUpdate();

}

addStyle(
'a.friend, a.me {' +
'    padding-left: 10px;' +
'    background: url("http://filmtipset.powha.net/ext/friend.png") no-repeat 0 50%;' +
'}' +
'a.me {' +
'    background: url("http://filmtipset.powha.net/ext/me.png") no-repeat 0 50%;' +
'}'
);

var friends = new FriendHandler();
var persons = document.querySelectorAll('.member');

for(var i in persons) {
    if(friends.isFriend(persons[i].innerHTML))
        persons[i].className += ' friend';

    if(friends.isMe(persons[i].innerHTML))
        persons[i].className += ' me';
}
