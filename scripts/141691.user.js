// ==UserScript==
// @name        Topic List Button
// @namespace   aurens
// @description Adds a topic list button for idiots that literally can't deal with change
// @include     http://*boards*.endoftheinter.net/showmessages.php*
// @include     https://*boards*.endoftheinter.net/showmessages.php*
// @version     1
// ==/UserScript==

// the name of the bookmark that you want the 'topic list' button to point to
// for most people this will be:
// var topicListName = 'LUE';
var topicListName = '';


var topicListURL = "";
var bookmarks = document.getElementById('bookmarks').getElementsByTagName('a');
var temp = "";

for (var i = 0; i < bookmarks.length; i++)
{	
	if(bookmarks[i].innerHTML.toLowerCase() == topicListName.toLowerCase())
	{
		topicListURL = bookmarks[i].href;
		temp = document.getElementsByClassName('userbar', 'div')[0].getElementsByTagName('a')[2].outerHTML;
		document.getElementsByClassName('userbar', 'div')[0].getElementsByTagName('a')[2].outerHTML = "<a href=\"" + topicListURL + "\">Topic List</a> | " + temp;
		break;
	}
}

