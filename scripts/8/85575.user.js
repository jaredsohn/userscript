// ==UserScript==
// @name			Complaints Department TCF Link
// @author			shaldengeki
// @namespace		shaldengeki
// @description		Adds a link to CD on The Cheese Factory.
// @include			http://boards.endoftheinter.net/showtopics.php?board=-84
// @include			https://boards.endoftheinter.net/showtopics.php?board=-84
// ==/UserScript==

var as = document.getElementsByTagName("a");
for (var i=0; i<as.length; i++)
{
	if (as[i].innerHTML=="Suspensions and Bans") {
		var cdrow=document.createElement("tr");
		var cdboardlink=document.createElement("td");
		var cdtopics=document.createElement("td");
		var cdmsgs=document.createElement("td");
		var cdlastpost=document.createElement("td");
		cdboardlink.innerHTML="<div><b><a href='/showtopics.php?board=56'>Complaints Department</a></b><br />Post complaints about vote spamming or rule infractions here</div>";
		cdrow.appendChild(cdboardlink);
		cdrow.appendChild(cdtopics);
		cdrow.appendChild(cdmsgs);
		cdrow.appendChild(cdlastpost);
		as[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(cdrow);
	}
}