// ==UserScript==
// @name           Plea topics on Suspensions and Bans
// @namespace     hollow life/sonicandfffan
// @description    Places a link to the user's previous plea topics next to Tag message
// @include        http://boards.endoftheinter.net/showmessages.php?board=-86*
// @include        https://boards.endoftheinter.net/showmessages.php?board=-86*
// @include        http://archives.endoftheinter.net/showmessages.php?board=-86*
// @include        https://archives.endoftheinter.net/showmessages.php?board=-86*

// ==/UserScript==

prefix = parent.location.protocol;

k = document.getElementsByTagName('h2');
j= k[0].innerHTML

{
if (j[0]=="B")
username=j.slice(7)
else
{    if (j[0]=="S")
    username=j.slice(10)
  else
      if (j[2]=="B")
username=j.slice(9)
else
username=j.slice(12)
}}

function insertAfter(newNode, target)
{
	var parent = target.parentNode;
	var refChild = target.nextSibling;
	if(refChild != null)
		parent.insertBefore(newNode, refChild);
	else
		parent.appendChild(newNode);
};

var a=document.getElementsByTagName("a");
for (var i=0; i<a.length; i++)
{
	if (a[i].innerHTML=="Tag")
	{
		var m=document.createElement("a");
		m.innerHTML=" | <a href='" + prefix + "//boards.endoftheinter.net/search.php?s_aw=" + username + "&board=-86&submit=Submit'>Recent Pleas</a> | <a href='" + prefix + "//archives.endoftheinter.net/search.php?s_aw=" + username + "&board=-86&submit=Submit'>Archived Pleas</a>";
		insertAfter(m, a[i]);
		break;
	}
}