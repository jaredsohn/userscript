// ==UserScript==
// @name			Last Post Viewed For Arlong Park
// @namespace		http://www.apforums.net/member.php?u=15390
// @author			Fire-Fist 
// @description   	adds a [l] next to each topic clicking which takes you to last post you read of that topic
// @include        http://www.apforums.net/forumdisplay.php?f=*
// @include        http://apforums.net/forumdisplay.php?f=*
// @include        http://forums.arlongpark.net/forumdisplay.php?f=*
// ==/UserScript==

var i = document.getElementsByTagName('a');
	
for ( var j = i.length-1; j>1; j-- ) 
{
	if ( i[j].id.match("thread_title_") == "thread_title_" ) 
	{
				var lastread = document.createElement("a");
				lastread.href = i[j].href + "&goto=newpost";
				lastread.appendChild(document.createTextNode(" [L]"));
				i[j].parentNode.insertBefore( lastread ,i[j].nextSibling);
	}
}	
