// ==UserScript==
// @name LL Ignorator
// @description Lets you make people GTFO your LUElinks.
// @author citizenray
// @include http://endoftheinter.net/*
// @include http://boards.endoftheinter.net/*
// @include http://links.endoftheinter.net/*
// @include https://endoftheinter.net/*
// @include https://boards.endoftheinter.net/*
// @include https://links.endoftheinter.net/*
// @include http://archives.endoftheinter.net/*
// ==/UserScript==

var users = new Array();
//Add user ID's below the line, using the following format:
//users.push(userID);
//For example, if you wanted to ignore user #12422, you would add the following line (without the slashes):
//users.push(12422);
//For multiple users, use multiple lines.
//Add them below this line

users.push(I took mine out of here);

///Add user ID's above this line ^^

//Removes topics on the topic list by the user
if (location.pathname == "/showtopics.php" || location.pathname == "/priv.php" || location.pathname == "/search.php") {
var trs = document.getElementsByTagName("tr");

for (var i = 0; i < trs.length; i++) {
//If the first link in the second td element contains the user number, clear it out
var tds = trs[i].getElementsByTagName("td");
if (tds.length > 0) {
var as = tds[1].getElementsByTagName("a");
as = as[0].href.slice(as[0].href.lastIndexOf("user=") + 5);
if (as.indexOf("&") > 0) {
as = as.slice(0, as.indexOf("&"));
}
for (var j = 0; j < users.length; j++) {
if (as == users[j]) {
trs[i].parentNode.removeChild(trs[i]);
i--;
break;
}
}
}
}
}
else if (location.pathname == "/showmessages.php") {
var divs = document.getElementsByTagName("div");

for (var i = 0; i < divs.length; i++) {
if (divs[i].className == "message-top") {
var as = divs[i].getElementsByTagName("a");
as = as[0].href.slice(as[0].href.lastIndexOf("user=") + 5);

if (as.indexOf("&") > 0) {
as = as.slice(0, as.indexOf("&"));
}

for (var j = 0; j < users.length; j++) {
if (as == users[j]) {

var np = divs[i].nextSibling;

np.parentNode.removeChild(np);

if (divs[i].parentNode.className == "quoted-message") {
divs[i].parentNode.parentNode.removeChild(divs[i].parentNode);
}
else {
divs[i].parentNode.removeChild(divs[i]);
}
i--;
}
}
}
}
}