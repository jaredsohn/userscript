// ==UserScript==
// @name           PDJJoin
// @include        *plug.dj/*/*
// ==/UserScript==

API.addEventListener(API.USER_JOIN, callback);
function callback(user)
{
    alert(user.username + " joined the room");
}


API.addEventListener(API.USER_LEAVE, callback);
function callback(user)
{
    alert(user.username + " left the room");
}