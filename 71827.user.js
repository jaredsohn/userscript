// ==UserScript==
// @name           HP
// @namespace      http://fb.wlb.com.tw
// @description   HP
// @include        http://fb.wlb.com.tw/*
// ==/UserScript==


var img = document.getElementsById('city_slot_7');
alert(img);
if (img == null)
{
abc();
}
else
{
alert("od");
img.src="./images/c/2.png";
}

function abc()
{

alert("ok");
img = document.getElementsById('city_slot_7');
if (img == null)
{

abc();
}
else
{

alert("od");
img.src="./images/c/2.png";
}


}