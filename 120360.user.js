// ==UserScript==
// @name        iCKarea
// @namespace   iCkarea
// @auther      Zac
// @description 顯示隱藏的訊息
// @include     http://tellfriendsfast.com/bbs/forum.php*
// @include     http://v.ckarea.com/bbs/forum.php*
// @version     1.5
// ==/UserScript==



var img = document.getElementsByTagName("img");
var regex =/www\.ckarea/;

for (var i = 0; i < img.length; i++)
{
    if(regex.test(img[i].src))
        img[i].src = img[i].src.replace(regex,"v.ckarea");
}

if(document.getElementById("pushGood") != null){
    document.getElementById("pushGood").style.display="none";
    document.getElementById("realContent").style.display="";
}

