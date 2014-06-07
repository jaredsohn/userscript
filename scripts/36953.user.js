// ==UserScript==
// @name moreMore
// @namespace more
// @description Adds more More to reddit
// @include http://www.reddit.com/*
// ==/UserScript==

var theMorebar, newMorebar;

var username = 'yourusername' // Or detect it...

theMorebar = document.getElementById('header-bottom-left');

newMorebar = "<a id='header-img-a' href='http://www.reddit.com/'>" +
    "<img id='header-img' alt=' reddit.com' src='http://static.reddit.com/reddit.com.header.png'/></a>" +
    "<ul class='tabmenu'> <li class='selected'><a href='http://www.reddit.com/'>what's hot</a></li> <li> <a href='http://www.reddit.com/new/'>new</a>" +
    "</li> <li><a href='http://www.reddit.com/controversial/'>controversial</a></li> <li><a href='http://www.reddit.com/top/'>top</a></li> </ul>" +
    "<div onmouseover='hover_open_menu(this)' onclick='open_menu(this)' class='dropdown tabdrop'>" + 
    "<span class='selected title'>more</span> </div>" +
    "<div class='drop-choices tabdrop' style='top: 65px; left: 426px; display: none;'>" +
    "<a class='choice' href='http://www.reddit.com/saved/'>saved</a>" +
    "<a class='choice' href='http://www.reddit.com/recommended/'>recommended</a>" +
    "<a class='choice' href='http://www.reddit.com/user/$USERNAME/liked/'>liked</a>" +
    "<a class='choice' href='http://www.reddit.com/user/$USERNAME/disliked/'>disliked</a>" +
    "<a class='choice' href='http://www.reddit.com/user/$USERNAME/hidden/'>hidden</a> </div>";

if (theMorebar) {
    theMorebar.innerHTML = newMorebar.replace(/\$USERNAME/g, username);
}