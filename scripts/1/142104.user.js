// ==UserScript==
// @name            Gmod Tower - Add Unread Posts Button
// @description     Adds a button for unread posts to the navbar
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @include         http://gmtower.org/forums/*
// @include         http://*.gmtower.org/forums/*
// ==/UserScript==

var menu = document.getElementById("menu_nav");

var newBtn = document.createElement("li");
newBtn.innerHTML = "<a class=\"last firstlevel\" href=\"http://www.gmtower.org/forums/index.php?action=unread\"><span class=\"last firstlevel\">Unread</span></a>";
newBtn.setAttribute("id", "button_unread");
newBtn.setAttribute("class", "firstlevel");

menu.appendChild(newBtn);