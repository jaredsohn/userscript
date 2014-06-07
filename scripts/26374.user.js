// ==UserScript==
// @name           TotalIgnore VB7 1.0
// @namespace      http://zorachus.net
// @include        applicablesite/*

//It seems like this should have been taken care of by now.
//Below, replace "Example" with the user that you want to block on a VB7 forum.
//You must also add the user to your ignore list.
//Now, you won't see the user's post, and you won't see posts that quote the user.
//Good for getting rid of absolutely useless trolls.
//Will upload a version with multiple user support if requested.
//Enjoy.

var quotes, quote, user;
user="Example";
quotes=document.getElementsByTagName("strong");
for(var i=0; quotes[i]; i++)
{
	quote=quotes[i].firstChild;
    if (quote.nodeValue == user && quote.parentNode.parentNode.getAttribute("class")!="smallfont") 
	{
		quote=quote.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		quote.innerHTML=user+" is on your ignore list.";
	}
}