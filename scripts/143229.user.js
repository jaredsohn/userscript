// ==UserScript==
// @name          MyEpisodes - New today calendar colour
// @version       0.3.1
// @include       http://www.myepisodes.com/*
// @include       http://myepisodes.com/*
// @namespace     http://myepisodes.com/cal.php
// ==/UserScript==


document.getElementsByClassName('cal_today')[0].style.backgroundImage = "url(http://img9.imageshack.us/img9/8999/todaysmall.png)";
document.getElementsByClassName('cal_today')[0].style.backgroundColor = "#EBFE9E";