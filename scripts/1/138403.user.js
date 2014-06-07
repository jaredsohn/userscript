// ==UserScript==
// @name           plug.dj test 1.0.0
// @namespace      http://userscripts.org/users/226660
// @description    123
// @include        *plug.dj/*/*
// @version 1.2.1-dev
// ==/UserScript==

USER_SKIP
This is called when the current DJ skips their own turn. It passes the user object of the dj who skipped.

USAGE
API.addEventListener(API.USER_SKIP, callback);
function callback(user)
{
alert(user.username + ” skipped their turn”);
}


USER_JOIN
This is called when a user joins the room. It passes a user object.

USAGE
API.addEventListener(API.USER_JOIN, callback);
function callback(user)
{
alert(user.username + ” joined the room”);
}


USER_LEAVE
This is called when a user leaves the room. It passes a user object.

USAGE
API.addEventListener(API.USER_LEAVE, callback);
function callback(user)
{
alert(user.username + ” left the room”);
}



VOTE_UPDATE
This is called when somebody in the room (including you) votes. It passes an object with a user object and the vote, -1 for negative, 1 for positive.

USAGE
API.addEventListener(API.VOTE_UPDATE, callback);
function callback(obj)
{
var vote = obj.vote == 1 ? “woot” : “meh”;
alert(obj.user.username + ” voted ” + vote);
}



DJ_ADVANCE
This is called when the dj advances to the next play. It passes an object with the array of user objects and the current media object.  The first DJ in the array is the current DJ, and the remaining ones are waiting to play in that order. This is also called when the last DJ leaves the booth, in which case it passes null.

USAGE
API.addEventListener(API.DJ_ADVANCE, callback);
function callback(obj)
{
if (obj == null) return; // no dj
var str = “”;
var currentDJ = obj.dj;
str += currentDJ.username;
var total = currentDJ.djPoints + currentDJ.listenerPoints + currentDJ.curatorPoints;
str += ” points: ” + total;
str += “, fans: ” + currentDJ.fans;
str += ” || ” + obj.media.author + ” – ” + obj.media.title;
alert(str);
}



VOTE_SKIP
This is called when the room votes down enough to skip the curent DJ. Null is passed.

USAGE
API.addEventListener(API.VOTE_SKIP, callback);
function callback()
{
alert(“The room has voted to skip”);
}