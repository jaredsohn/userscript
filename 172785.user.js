// ==UserScript==
// @name           Omni
// @namespace      Swirl & -zYMTOM'
// @include     *hackforums.net/*
// ==/UserScript==
var pic1 = "http://www.hackforums.net:8080/uploads/avatars/avatar_1.png";
var pic = "https://si0.twimg.com/profile_images/322446605/hackforumsnet_bigger.png";
var pic2 = "http://img64.imageshack.us/img64/6200/81c289ddaa71a68769adeac.png";
var pic3 = "http://d13pix9kaak6wt.cloudfront.net/avatar/hackforums_1310401479_01.jpg";
var a = "-1";
while (a<document.images.length) {
a++;
document.images[a].src=pic;
a++;
document.images[a].src=pic1;
a++;
document.images[a].src=pic2;
a++;
document.images[a].src=pic3;
}
