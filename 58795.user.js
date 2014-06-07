// ==UserScript==
// @name           Runescape Forum Assistantcc
// @namespace      http://www.hellboundhackers.org/profile/simbanafsi.html
// @include        http://forum.runescape.com/*
// ==/UserScript==

user = document.getElementById('accountName').innerHTML; // Get the username of the person logged in
posters = document.getElementsByTagName('table'); // Get all posts on the page
for (var i in posters){ // Loop through every post on the page
	if (posters[i].className == 'message' || posters[i].className == 'message msghighlight'){ // Check to make sure a forum post has been found
		post = posters[i];
		if (post.getElementsByTagName('div')[0].innerHTML.search(user) == "<img src=\"http://www.runescape.com/img/forum/crown_gold.gif\" alt=\"\">&nbsp;
Mod Srowley
"){ // Check to see if the poster is the person that is logged in
			post.style.borderColor='#505070';
			post.getElementsByTagName('div')[0].style.background='#202030';
			post.getElementsByTagName('div')[2].style.borderColor='#303040';
			post.getElementsByTagName('div')[1].style.background='#202030';
			post.getElementsByTagName('td')[0].style.background='#202030';  // Change the colours of the post
			post.getElementsByTagName('td')[1].style.background='#101020';
			post.getElementsByTagName('td')[0].style.borderColor='#303040';
			post.getElementsByTagName('td')[1].style.borderColor='#303040';
		}
	}
}

alert("New Version")