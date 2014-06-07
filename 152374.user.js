// ==UserScript==
// @name           testagainandagain
// @namespace      Personal
// @include        www.jiggmin.com*
// @include        jiggmin.com*
// @include        *jiggmin.com*
// @include        jiggmin.com/forum.php*
// @description    test
// ==/UserScript==

document.body.style.background = "#0000FF";
var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    if(ilist[i].src == "http://jiggmin.com/-images/jiggmin-logo.png") {
         ilist[i].src = "http://i.imgur.com/3fBuc.png";
    }
}
var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    if(ilist[i].src == "http://jiggmin.com/styles/halloween/logo.jpg") {
         ilist[i].src = "http://i.imgur.com/3fBuc.png";
    }
}
document.body.style.member.color="#FF0000";