// ==UserScript==
// @name        Auto Skip Youtube Intro
// @namespace   test
// @description Skip the first x seconds of youtube videos
// @include http://www.youtube.com/watch*
// @include https://www.youtube.com/watch*
// @exclude http://www.youtube.com/*#t=*
// @exclude https://www.youtube.com/*#t=*
// @version     0.03
// @grant       none
// ==/UserScript==

/*USAGE
To get the youtube channel name, copy link from youtube channel name(not the display name, because it's not always the same)

sample
http://www.youtube.com/user/TOTO?feature=watch

add to skip fonction all the users you need
users['TOTO'] = 20;  //skip all videos from TOTO for 20 seconds

*/

/* Array of users */
var users = new Object();
users['TOTO'] = 20;

var timeSet = "#t=0m";
var timeSetSec = "s";

/*Extract the channel name*/
var url = document.URL; //current url on display
var doc = document.getElementsByClassName('yt-user-photo'); //Get class with names
var name = doc[0].attributes[2].nodeValue; //Get channel name
var userName = name.substring(name.lastIndexOf("/")+1,name.lastIndexOf("")); //Extract the name

if(users[userName] != null) //name exist?
        window.location.href = (url + timeSet + users[userName] + timeSetSec); //change url and add time to skip

