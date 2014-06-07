// ==UserScript==
// @name        Community Tab Compactor
// @namespace   ex
// @description Compacts the forum listing on the Kongregate Community tab
// @include     http://www.kongregate.com/community
// @version     1.0.1
// @author      BobtheCoolGuy
// ==/UserScript==

// If set to false, this will hide the post statistics that normally show up under each forum title
var showPostStats = false;

// If set to false, this will hide the description of each forum
var showDescription = false;

// The height of the margin abouve the forum group tiles
var topMargin = '5px';

var padding = '5px';

if(!showDescription)
{
	var descs = document.getElementsByClassName('desc');
	for(var i=0; i<descs.length; ++i)
	{
		descs[i].style.display="none";//parentNode.removeChild(descs[i]);
	}
}

if(!showPostStats)
{
	var posts = document.getElementsByClassName('h6 h6_alt last_activity');
	for(var i=0; i<posts.length; ++i)
	{
		posts[i].style.display="none";//.parentNode.removeChild(posts[i]);
	}
}

var titles = document.getElementsByClassName('forum_group_title h2 mtl');
for(var i=0; i<titles.length; ++i)
{
	titles[i].style.setProperty('margin-top', topMargin, 'important' );
	titles[i].style.setProperty('font-size', '12px', 'important' );
}

var header = document.getElementById('forums_title');
header.style.setProperty('margin-top', topMargin, 'important' );
header.style.setProperty('margin-bottom', topMargin, 'important' );