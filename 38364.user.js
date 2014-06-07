// ==Credits==
// =Original Code=
// By: Anony Mouse 
// Last Release: Nov 25, 2008
// Last Release link: http://userscripts.org/scripts/show/37519
// =Updated Code=
// By: Optik264
// Release Date: Dec 08, 2008
// Release Link: n/a for 1.0.0
// ==/Credits==

// ==Version==
//      1.0.0
// Dec 08, 2008
// ==/Version

// ==UserScript==
// @name           4chan cleaner
// @namespace      http://4chan.org/
// @include        http://*.4chan.org/*/*.html*
// @exclude       http://*.4chan.org/*/*imgboard.html
// ==/UserScript==

replies = document.getElementsByClassName("reply");
for (i=0;i<replies.length;i++){
	curr = replies[i];
	if(curr.innerHTML.match("For every single second that AT"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - every single second spam</span>";
	else if(curr.innerHTML.match("<blockquote>shock</blockquote>"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - shock spam</span>";
	else if(curr.innerHTML.match("<blockquote>Yippie-kai-yay, motherfucker.</blockquote>"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - Yippie-kai-yay motherfucker spam</span>";
	else if(curr.innerHTML.match("http://tinyurl.com/6xbd58"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - tinyurl virus link</span>";
	else if(curr.innerHTML.match("http://www.sexymichel.com"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - sexymichel link</span>";
	else if(curr.innerHTML.match("4chan Quality Control"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - 4chan Quality Control spam</span>";
	else if(curr.innerHTML.match("You, sir, are and idiot."))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - You, Sir, are and idiot</span>";
	else if(curr.innerHTML.match("This comment was posted with 4chan Auto Poster"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - 4chan auto poster</span>";
	else if(curr.innerHTML.match("1. Go to poolsclosed.net"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - poolsclosed.net link</span>";
	else if(curr.innerHTML.match("[Ss]amefag(.|)</blockquote>"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - Samefag spam</span>";
	else if(curr.innerHTML.match("y8pF4hsbeGw"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - y8pF4hsbeGw</span>";
	else if(curr.innerHTML.match("http://www.ihateyoujulia.com/"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - ihateyoujulia link</span>";
	else if(curr.parentNode.innerHTML.match("s1.zetaboards.com/Neko_Forest/"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - neko_forest link</span>";
	else if(curr.innerHTML.match("your an amerifag right?"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - your an amerifag right? spam</span>";
	else if(curr.innerHTML.match("/b/ sucks, 100M GET"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - /b/ sucks, 100M get spam</span>";
	else if(curr.innerHTML.match("FUCK YOU /b/ GET"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - fuck u /b/ get spam</span>";
	else if(curr.innerHTML.match("This post brought to you by Dial Soap"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - dial soap spam</span>";
	else if(curr.innerHTML.match("When you finally realize that you have been a retard hanging around here and are ready to move on to a better life."))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - anon talk spam</span>";
	else if(curr.innerHTML.match("irritating-game.rar"))
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - irritating-game virus link</span>";
	else if(curr.innerHTML.match("26 KB, 126x126,"))
		if(curr.innerHTML.match("WHERE ARE YOU DBZ/DIVISIONBYZERO BRO WE MISS YOU")){
		curr.innerHTML = "<span style='color:#ff0000> ## Post Removed ## - raidchan radio spam </span>";
		}
	if(curr.innerHTML == ""){
		curr.parentNode.innerHTML = "----<br>";
		i--;
	}
}