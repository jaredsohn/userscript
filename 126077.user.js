// ==UserScript==
// @name Doujinstyles v3
// @namespace Fairies_ate_tMS
// @include http://www.doujinstyle.com/*
// ==/UserScript==

function HideUnnecessaryBS(bullshit){
bullshit.style.display = "none";
}

// Stealing functions huehuehue
function get_lastchild(n)
{
x=n.lastChild;
while (x.nodeType!=1)
  {
  x=x.previousSibling;
  }
return x;
}

if ((document.location.href == "http://www.doujinstyle.com/forum/index.php") || (document.location.href == "http://www.doujinstyle.com/forum/"))
{
	var tmsSection = document.getElementById("forum22").getElementsByTagName("p");
	tmsSection[0].innerHTML = "Miss Me?";


	var computerSection = document.getElementById("forum10").getElementsByTagName("p");
	computerSection[0].innerHTML = "Discuss computer related topics in here, such as how to download more RAM.";

	var vydiagameSection = document.getElementById("forum12").getElementsByTagName("p");
	vydiagameSection[0].innerHTML = "Steam Sale";

	var tohomusicSection = document.getElementById("forum14").getElementsByTagName("p");
	tohomusicSection[0].innerHTML = "Border of Life remix #460";
}

var posts = document.getElementsByClassName("author-info");

for (selectedPost = 0; selectedPost <= posts.length; selectedPost++)
{
	HideUnnecessaryBS(get_lastchild(posts[selectedPost]));
}