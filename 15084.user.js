// ==UserScript==
// @name           Antispam Reddit
// @namespace      http://loudambiance.com/
// @description    Removes spam posts from reddit
// @include        http://reddit.com/
// @include        http://*.reddit.com/
// @include        http://reddit.com/?*
// @include        http://*.reddit.com/?*
// @include        http://reddit.com/new*
// @include        http://*.reddit.com/new*
// @include        http://reddit.com/browse*
// @include        http://*.reddit.com/browse*
// @include        http://reddit.com/#*
// @include        http://*.reddit.com/#*
// @exclude        http://blog.reddit.com/*
// ==/UserScript==

// List of know spammer users
var spammers = new Array("effektz", "alexw", "yahooxjeffektz", "nitsujw", "perfektxj", "TimmyCracKorn", "iTouch", "MyTouch", "TheTeenVote", "submit555",
"larkeyanel", "kingul", "patelti", "onil_j", "kentre6", "mcbride_ke", "terressa8", "anete777", "mikellan", "misisandra", "humblest8", "tomije", "ramijuli", 
"ggreeggor", "ellfang", "alaleina", "jefrryw", "kboonek", "jerryb554", "kenala_t", "binghamsco", "applebee_j", "brezinapau", "carver_o", "brooksmra");

var removed = 0;
var storyVis="none";

function toggle()
{
	var posts = document.getElementById("siteTable").childNodes[0].childNodes;
	for(var cnt=0; cnt < posts.length; cnt++)
	{ 
		if(posts[cnt].id.match(/pre.*/))
			continue;
		if(spammers.indexOf(posts[cnt].childNodes[2].childNodes[0].childNodes[1].childNodes[2].childNodes[0].data) != -1) 
		{ 
			posts[cnt].style.display=storyVis;
			removed++;
		}
	}
	if(storyVis=="none")
	{
		storyVis="";
	}else{
		storyVis="none";
	}
}

toggle();
// This section adds a menu item to show how many stories have been removed
var link = document.createElement('a');
link.setAttribute('href', '#');
link.innerHTML='Removed: ' + removed;
//to disable removed count display, comment out the next line
document.getElementById("topstrip").appendChild(link);
document.getElementById("topstrip").addEventListener("click", toggle, true);
