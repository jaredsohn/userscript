// ==UserScript==
// @name           Jagex Forum Highlighter
// @namespace      http://www.hellboundhackers.org/profile/simbanafsi.html
// @description    Highlights your posts on Jagex forums in red
// @include        http://services.runescape.com/*
// @include        http://services.funorb.com/*
// @include        http://services.jagex.com/*
// @include        http://services.stellardawn.com/*
// ==/UserScript==

user = "Your&nbsp;Username"; // Your username goes here, spaces replaced with &nbsp;, usernames are case sensitive
posters = document.getElementsByTagName('table'); // Get all posts on the page
for (var i in posters){ // Loop through every post on the page
        if (posters[i].className == 'message' || posters[i].className == 'message msghighlight'){ // Check to make sure a forum post has been found
                post = posters[i];
                if (post.getElementsByTagName('div')[0].innerHTML.search(user) != -1){ // Check to see if the poster is the person that is logged in
                        post.getElementsByTagName('div') [0].style.background='#602020';
                        post.getElementsByTagName('div')[2].style.borderColor='#703030';
                        post.getElementsByTagName('div')[1].style.background='#602020';
                        post.getElementsByTagName('td')[0].style.background='#602020';  // Change the colours of the post
                        post.getElementsByTagName('td')[0].style.borderColor='#703030';
                        post.getElementsByTagName('td')[1].style.borderColor='#703030';
                }
        }
}