// ==UserScript==
// @name The HZA Tools Exclusive
// @version 06
// @namespace HZA
// @author Gboz (modded by zuperman,kadu)
// @description The HZA alliance Tools - based on ika-core
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
alliancefullnm='Hezbola';
alliancenm='HZA';
alliance=[ ['?o alliance' , NoAlliance],
[ alliancenm , Alliance ],
//['HZA' , Alliance ],
['BSG-A' , Allies ],
['BSG' , Allies ],
['GOE-s' , Allies ],
['Lega3' , Allies ],
['PirPT' , Allies ],
['BSG-T' , Allies ],
['BSG-N' , Allies ],
['BSG-X' , Allies ],
['PirRB' , Allies ],
['Kamik' , Allies ],
['NO-FX' , Enemies  ],
['Ole' , Enemies ],
['-100-' , Enemies ],
['UVS-D' , Enemies ],
['UVSsi' , Enemies ],
['UVS-M' , Enemies ],
['R100' , Enemies ],
['OLEr' , Enemies ],
['-100-' , Enemies ],
['PRIDE' , Enemies ]];


//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
chaturl='.';
//chaturl='http://argonaftes.forum-motion.com/chatbox/chatbox.forum';
//forumurl='.';
forumurl='http://amizade.allgoo.us/forum.htm';
//forumurlnew='.';
forumurlnew='http://amizade.allgoo.us/forum.htm/search.forum?search_id=newposts';
break;


}


var showbubble=Math.floor(Math.random()*10);
if (showbubble%2) { //If Even
addsbubble('mayor',"HZA Rulez!", 68);
addsbubble('general',"Nós possuimos o nível base!", 71);
addsbubble('diplomat',"HZA não chora!", 72);
addsbubble('scientist',"Ataca até o ultimo fundeiro!", 74);
addsbubble('diplomat',"Nunca se rende!", 77);
addsbubble('general',"Porrada neles todos!", 71);

} else {
addsbubble('diplomat',"Se um HZA cair...", 68);
addsbubble('scientist',"é porque...", 71);
addsbubble('general',"está...", 72);
addsbubble('mayor',"acumulando forças...", 74);
addsbubble('general',"Para o ataque final!", 77);

}