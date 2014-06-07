// ==UserScript==
// @name           DinkNetwork Post Hider
// @namespace      derp
// @description    Hides posts.
// @include        http://*dinksmallwood.net
// @include        http://*dinknetwork.com/forum.cgi*
// @exclude			http://*dinknetwork.com/forum.cgi?Modify
// @license			Released into the public domain
// @version			1.1
// ==/UserScript==


var Spammers = [/Absolution/i]
var rows = document.getElementsByTagName('tr');
var posts = document.getElementsByClassName('infoboxheader');
var things = document.getElementsByTagName('h2');
var lurkers = new Array();
var spams = new Array();
var x = 0;

if (things[0].innerHTML.match(/Modify:/)) {
x = 1;
GM_log(things[0].innerHTML);
}


for (n=0; n < Spammers.length; n++)
{

for (i = 0; i < rows.length; i++) {

    // See if we've found the table division of a spammer of your choosing. Modified this to not be case sensitive for best results.
    if (rows[i].innerHTML.match(Spammers[n])) {
        lurkers.push(rows[i]);
    }

	
	
}


for (i=0;i < posts.length;i++) {
//Does the same, but for posts in a thread
if (posts[i].innerHTML.match(Spammers[n])) {
	spams.push(posts[i]);
	}
}

}

//Checks to see if thread is being modified
if (x != 1)
{

for (i = 0; i < lurkers.length; i++) {

	//GM_log(lurkers.length);
    var lurker_div = lurkers[i];
	lurker_div.innerHTML = "";

 }
//Deletey bit for posts
 for (i = 0; i < spams.length; i++)
 {
 //GM_log(spams[i].innerHTML);
 var posty = spams[i];
 posty.parentNode.innerHTML = "";
 }
 
}