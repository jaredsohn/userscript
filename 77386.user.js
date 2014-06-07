// ==UserScript==
// @name           FunOrb Replacesx2
// @namespace      http://www.hellboundhackers.org/profile/simbanafsi.html
// @description     Changes your posts on the FunOrb forums to blue so you can easily see which posts are yours
// @include        http://services.funorb.com/*
// @include        http://services.runescape.com/*
// ==/UserScript==

user = "vX&nbsp;Runis&nbsp;Xv";
posters = document.getElementsByTagName('table'); // Get all posts on the page
for (var i in posters){ // Loop through every post on the page
        if (posters[i].className == 'message'){ // Check to make sure a forum post has been found
                post = posters[i];
				if (post.getElementsByTagName('div')[0].innerHTML.search(user) != -1 || post.getElementsByTagName('div')[0].innerHTML.search(userers) != -1)
				{ // Check to see if the poster is the person that is logged in
						post.style.borderColor='#A05050';
						post.getElementsByTagName('div')[0].style.background='#602020';
						post.getElementsByTagName('div')[2].style.borderColor='#703030';
						post.getElementsByTagName('div')[1].style.background='#602020';
						post.getElementsByTagName('td')[0].style.background='#602020'; // Change the colours of the post
						post.getElementsByTagName('td')[1].style.background='#501010';
						post.getElementsByTagName('td')[0].style.borderColor='#703030';
						post.getElementsByTagName('td')[1].style.borderColor='#703030'
                }
        }
}