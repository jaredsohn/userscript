// ==UserScript==
// @name          4-ch.net menu
// @version       1.0 2008-06-10
// @namespace     http://4-ch.net/req/kareha.pl/1212565492/7
// @description   Adds a collapsible board menu on pages on 4-ch.net. Some options are configurable in the code. When new boards are added, you will need to modify the script, or to download an update. Code granted to the public domain. 
// @include       http://4-ch.net/tv/*
// @include       http://4-ch.net/anime/*
// @include       http://4-ch.net/manga/*
// @include       http://4-ch.net/games/*
// @include       http://4-ch.net/music/*
// @include       http://4-ch.net/book/*
// @include       http://4-ch.net/ascii/*
// @include       http://4-ch.net/fashion/*
// @include       http://4-ch.net/food/*
// @include       http://4-ch.net/hobby/*
// @include       http://4-ch.net/love/*
// @include       http://4-ch.net/personal/*
// @include       http://4-ch.net/sexual/*
// @include       http://4-ch.net/code/*
// @include       http://4-ch.net/tech/*
// @include       http://4-ch.net/net/*
// @include       http://4-ch.net/news/*
// @include       http://4-ch.net/politics/*
// @include       http://4-ch.net/science/*
// @include       http://4-ch.net/sports/*
// @include       http://4-ch.net/language/*
// @include       http://4-ch.net/nihongo/*
// @include       http://4-ch.net/nordic/*
// @include       http://4-ch.net/general/*
// @include       http://4-ch.net/dqn/*
// @include       http://4-ch.net/iaa/*
// @include       http://4-ch.net/req/*
// ==/UserScript==
//
// To add new boards:
// 1. Add their URL in the @include section
// 2. Add their URL in the HTML snippet a few lines below below.
//
// You can also configure the 2 following options:

var remember    = false; // Remember the status (open/closed) of the menu? (Bad idea, will get in your way)
var defaultOpen = false; // If not, default to open (true) or closed (false)?

// List of boards displayed, adding an entry should be self-explanatory.
var list = '<li><a href="http://4-ch.net/tv/">Film &amp; TV</a></li>' +
           '<li><a href="http://4-ch.net/anime/">Anime</a></li>' +
           '<li><a href="http://4-ch.net/manga/">Manga</a></li>' +
           '<li><a href="http://4-ch.net/games/">Games</a></li>' +
           '<li><a href="http://4-ch.net/music/">Music</a></li>' +
           '<li><a href="http://4-ch.net/book/">Literature</a></li>' +
           '<li><a href="http://4-ch.net/ascii/">AA Bar</a></li>' +
           '<li><a href="http://4-ch.net/fashion/">Fashion</a></li>' +
           '<li><a href="http://4-ch.net/food/">Food</a></li>' +
           '<li><a href="http://4-ch.net/hobby/">Hobbies</a></li>' +
           '<li><a href="http://4-ch.net/love/">Romance</a></li>' +
           '<li><a href="http://4-ch.net/personal/">Personal Issues</a></li>' +
           '<li><a href="http://4-ch.net/sexual/">Sexuality</a></li>' +
           '<li><a href="http://4-ch.net/code/">Programming</a></li>' +
           '<li><a href="http://4-ch.net/tech/">Tech Support</a></li>' +
           '<li><a href="http://4-ch.net/net/">Net Culture</a></li>' +
           '<li><a href="http://4-ch.net/news/">News</a></li>' +
           '<li><a href="http://4-ch.net/politics/">Politics</a></li>' +
           '<li><a href="http://4-ch.net/science/">Science</a></li>' +
           '<li><a href="http://4-ch.net/sports/">Sports</a></li>' +
           '<li><a href="http://4-ch.net/language/">Language</a></li>' +
           '<li><a href="http://4-ch.net/nihongo/" title="Japanese">日本語</a></li>' +
           '<li><a href="http://4-ch.net/nordic/">Nordic</a></li>' +
           '<li><a href="http://4-ch.net/general/">General</a></li>' +
           '<li><a href="http://4-ch.net/dqn/">DQN</a></li>' +
           '<li><a href="http://4-ch.net/iaa/">Internet Addicts</a></li>' +
           '<li><a href="http://4-ch.net/req/">Requests</a></li>' +
           '<li><a href="http://4-ch.net/4ch">Homepage</a></li>';

// The toggle button. Default is the AA of Security Kitten, you can choose something less DQN if you wish.
var button = '　　へ-ﾍ<br />' +
             '　 ﾐ*´ｰ｀ﾐ<br />' + 
             '〜(,_ｕｕﾉ<br />';

// This CSS is injected into the document
var css  = '#greasemonkeymenu { position: absolute; z-index: 9001; right:0px;}' + 
           '#greasemonkeymenulink { text-decoration: none; font-size: 60%; line-height: 110%; display: block;}' +
           '#greasemonkeymenulist { margin: 10px 0 0 0; padding: 0; }' +
           '#greasemonkeymenulist li { font-size: 80%; list-style-type: none; }';

           
// You probably don't need to change anything beyond this line, and it's unsightly from there on. 

// This is just a fancy way of saying "if (you click on the kitten) { toggle(); }"
document.addEventListener('click', function(event) {
  var clicked = String(event.target);
  var clickedToggleLink = clicked.search(/togglemenu/);
  if (clickedToggleLink > -1) {
    toggle();
    event.stopPropagation();
    event.preventDefault();
  }
}, true);

// Toggles the visibility of the ul containing the list element, and remembers it
function toggle(){
  list = document.getElementById("greasemonkeymenulist")
  if ("none" == list.style.display) {
    list.style.display = "block";
    GM_setValue(status, "open");
  } else {
    list.style.display = "none";
    GM_setValue(status, "closed");
  }
}

// We add our menu to the board
var menu = document.createElement("div");
menu.innerHTML =  '<style type="text/css">' + css + '</style>' +
                  '<div id="greasemonkeymenu" class="outerbox"><div class="innerbox">' +
                  '<a id="greasemonkeymenulink" href="#togglemenu">' + button + '</a>' +
                  '<ul id="greasemonkeymenulist">' + list + '</ul>' +
                  '</div></div>';
document.body.insertBefore(menu, document.body.firstChild);

// Whether to display the menu by default
if (defaultOpen) {
  document.getElementById("greasemonkeymenulist").style.display = "block";
} else {
  document.getElementById("greasemonkeymenulist").style.display = "none";
}

if (remember) {
  if ("open" == GM_getValue(status, "closed")) {
    document.getElementById("greasemonkeymenulist").style.display = "block";
  } else {
    document.getElementById("greasemonkeymenulist").style.display = "none";
  }
}