// ==UserScript==
// @author         	Kornk
// @name           	Hide horrible threads.
// @namespace      	kornk/awesomescripts
// @description    	Hides horrible threads.
// @include       	http://*.hackforums.net/forumdisplay.php?fid=203*
// @version			1.0.1
// ==/UserScript==
var posts = document.getElementsByClassName('trow1 forumdisplay_regular');
var posts2 = document.getElementsByClassName('trow2 forumdisplay_regular');

var blacklist = new Array( "team", "help", "recruit");

for(x=0; x <blacklist.length; x++){
	for (i=0; i<posts.length; i++)
	{
		if(posts[i].innerHTML.toLowerCase().indexOf(blacklist[x]) != -1){
			posts[i].parentNode.removeChild(posts[i]);
			posts[i].parentNode.removeChild(posts[i]);
			posts[i].parentNode.removeChild(posts[i]);
			posts[i - 1].parentNode.removeChild(posts[i - 1]);
		}
	}
	for (i=0; i<posts2.length; i++)
	{
		if(posts2[i].innerHTML.toLowerCase().indexOf(blacklist[x]) != -1){
			posts2[i].parentNode.removeChild(posts2[i]);
			posts2[i].parentNode.removeChild(posts2[i]);
			posts2[i].parentNode.removeChild(posts2[i]);
			posts2[i - 1].parentNode.removeChild(posts2[i - 1]);
		}
	}
}
