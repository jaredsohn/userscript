// ==UserScript==
// @name           Newgrounds: User is BigBadRon
// @namespace      iamgrimreaper
// @description    Don't forget to change the variables!
// @include        http://*.newgrounds.com/bbs/*
// ==/UserScript==

user = "iamgrimreaper";
usernew = "bigbadron";

dbody = document.body.innerHTML;

if(dbody.indexOf('<h3><a href="http://' + user + '.newgrounds.com/">' + user + '</a></h3>')){
where = dbody.indexOf('<h3><a href="http://' + user + '.newgrounds.com/">' + user + '</a></h');
linklength = 20 + user.length + 16 + user.length + 7;
document.body.innerHTML = dbody.substring(0,where) + '<h3><a href="http://' + usernew + '.newgrounds.com/">' + usernew + '</a></h3>' + dbody.substring(where + linklength);
}