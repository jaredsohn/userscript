// ==UserScript==
// @name           Jagex Forum Highlighter
// @namespace      http://www.hellboundhackers.org/profile/simbanafsi.html
// @description    Highlights your posts on Jagex forums in red
// @include        http://services.runescape.com/*
// @include        http://services.funorb.com/*
// @include        http://services.jagex.com/*
// ==/UserScript==

user = "vX&nbsp;Runis&nbsp;Xv"; // Your username goes here, spaces replaced with &nbsp;, usernames are case sensitive
posters = document.getElementsByTagName('table'); // Get all posts on the page
for (var i in posters){ // Loop through every post on the page
        if (posters[i].className == 'message' || posters[i].className == 'message msghighlight'){ // Check to make sure a forum post has been found
                post = posters[i];
                if (post.getElementsByTagName('div')[0].innerHTML.search(user) != -1){ // Check to see if the poster is the person that is logged in
                  document.getElementById("msgcreator uname").style.backgroundColor="#00FF00"
                }
        }
}