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
		curr.innerHTML = "";
	else if(curr.innerHTML.match("<blockquote>shock</blockquote>"))
		curr.innerHTML = "";
	else if(curr.innerHTML.match("<blockquote>Yippie-kai-yay, motherfucker.</blockquote>"))
		curr.innerHTML = "";
	else if(curr.innerHTML.match("http://tinyurl.com/6xbd58"))
		curr.innerHTML = "";
	else if(curr.innerHTML.match("http://www.sexymichel.com"))
		curr.innerHTML = "";
	else if(curr.innerHTML.match("This thread has been flagged for extermination by 4chan Quality Control."))
		curr.innerHTML = "";
	else if(curr.innerHTML.match("You, sir, are and idiot."))
		curr.innerHTML = "";
	else if(curr.innerHTML.match("This comment was posted with 4chan Auto Poster"))
		curr.innerHTML = "";
	else if(curr.innerHTML.match("1. Go to poolsclosed.net"))
		curr.innerHTML = "";
	else if(curr.innerHTML.match("[Ss]amefag(.|)</blockquote>"))
		curr.innerHTML = "";
	else if(curr.innerHTML.match("y8pF4hsbeGw"))
		curr.innerHTML = "";
	else if(curr.innerHTML.match("http://www.ihateyoujulia.com/"))
		curr.innerHTML = "";
	else if(curr.parentNode.innerHTML.match("s1.zetaboards.com/Neko_Forest/"))
		curr.innerHTML = "";
	else if(curr.innerHTML.match("your an amerifag right?"))
		curr.innerHTML = "";
		
	if(curr.innerHTML == ""){
		curr.parentNode.innerHTML = "----<br>";
		i--;
	}
}