// ==UserScript==
// @name           Plug.dj
// @namespace      http://www.plug.dj/
// @description    Code
// @include        http://www.plug.dj/
// @include        http://www.plug.dj/riot-roof/
// ==/UserScript==

API.addEventListener(API.USER_JOIN, join);
function join(user) 
{ 
API.sendChat("@" + user.username + " Welcome to the RiotRoof. Wolf Pack")
}

API.addEventListener(API.USER_LEAVE, leave);
function leave(user)
{
API.sendChat(user.username + " left the room")
}
 
API.addEventListener(API.MOD_SKIP, skip);
function skip(user)
{
API.sendChat("Sorry, your song has violated one of the room's rules.")
}