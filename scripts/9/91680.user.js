// ==UserScript==
// @name KAMIK TOOLS 2011 v1.0b
// @version 06
// @namespace KAMIK
// @author Gboz (modded by Rafazeta)
// @description KAMIK ALLIANCE TOOLS - based on ika-core
// @include http://s*.ikariam.*/*
// @require http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched.
// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=04;
var scriptlocation="http://www.ika-core.org/scripts/ika-core-tools.user.js";

// Set the highlight colors for every case
//can be red, green, blue etc
//also #123 or #112233 (#rrggbb) for example Alliance = [ 'Blue' ,'#000000' ];
//or rgb(100,100,100) with a max of 255 for example Alliance = [ 'rgb(100,255,255)' ,'Blue' ];
//if u still dont understand google for html style color
Alliance = [ 'Blue' ,'Blue' ];
Allies = [ 'Cyan' ,'Green'];
NoAlliance = [ 'Yellow','Brown'];
Enemies = [ 'Red' ,'Red' ];


// Settings for every server
switch (location.host) {
default:
alliancefullnm='KAMIKAZES';
alliancenm='KAMIK';
alliance=[ ['?o alliance' , NoAlliance],
[ alliancenm , Alliance ],
//['KAMIK' , Alliance ],
['LEGA3' , Allies ],
['Arcani' , Allies ],
['BSG_S' , Enemies ],
['OleP' , Enemies ],
['GOE-s' , Enemies ],
['PRIDE' , Enemies ]];


//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
chaturl='.';
//chaturl='http://argonaftes.forum-motion.com/chatbox/chatbox.forum';
//forumurl='.';
forumurl='http://kamiks.forumeiros.com';
//forumurlnew='.';
forumurlnew='http://kamiks.forumeiros.com/search.forum?search_id=newposts';
break;


}


var showbubble=Math.floor(Math.random()*10);
if (showbubble%2) { //If Even
addsbubble('mayor',"Somos os maiores ladrões do zeta", 68);
addsbubble('general',"BANZAAAAI !!", 71);
addsbubble('diplomat',"Queremos recursos...", 72);
addsbubble('scientist',"Vamos roubar, vamos roubar...", 74);
addsbubble('diplomat',"Cara#$%", 77);
addsbubble('general',"Gosto deles fraquinhos e gordinhos", 71);

} else {
addsbubble('diplomat',"Nós roubamos...", 68);
addsbubble('scientist',"Por que gostamos...", 71);
addsbubble('general',"e aonde houver recursos", 72);
addsbubble('mayor',"por la estamos !!!", 74);
addsbubble('general',"KAMIKASES !!!", 77);

}