// ==UserScript==
// @name         سكربت أجزاء الثانية في اوقات الارسال
// @include       http://*.tribalwars.net/*
// @exclude       http://forum.tribalwars.net/*
// @include       http://*.tribalwars.ae/*
// @exclude       http://forum.tribalwars.ae/*
// ==/UserScript==


// version = 1.0
// screenshot: http://img243.imageshack.us/img243/3746/51351352.png

// مع تحيات اخوكم : ناصر حمد الموسى - Renter

var color = 'red';
var size = '100%';

var elist = document.getElementsByClassName('small hidden')
for(var i = 0; i < elist.length; i++)
  {
  elist[i].style.color = color;
  elist[i].style.fontSize = size;
  }