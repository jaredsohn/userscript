// ==UserScript==
// @name           dontmindthisscriptplease
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

document.body.style.fontSize = "14px";

<span id="member">Change the span tag color </span>
function spanColorChange()
{
document.getElementById('member').style.color = '#FF0000';
}

<span class id="member">Change the span tag color </span>
function spanColorChange()
{
document.getElementById('member').style.color = '#FF0000';
}