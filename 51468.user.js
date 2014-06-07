// ==UserScript==
// @name The Kamik Tools Exclusive
// @version 	9
// @namespace Kamik
// @author Gboz (modded by Bruttus)
// @description The kamik alliance Tools - based on ika-core
// @include http://s*.ikariam.*/*
// @require http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched. Your not allowed to edit or copy ika-core.js, read license inside the file.
// You can create a copy of Ika-core-SearchTools.user.js and host it anywhere, when a new version of ika-core.js comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=9;
var scriptlocation="http://userscripts.org/scripts/source/35976.user.js";

// Settings for every server
switch (location.host) {
default:
alliancefullnm='KAMIKAZES';
alliancenm='Kamik';
alliance=[ ['?o alliance' , NoAlliance],
[ alliancenm , Alliance ],
//['kamik' , Alliance ],
['BSG-A' , Enemies ],
['BSG' , Enemies ],
['GOE-s' , Enemies ],
['Lega3' , Enemies ],
['PirPT' , Enemies ],
['BSG-T' , Enemies ],
['BSG-N' , Enemies ],
['BSG-X' , Enemies ],
['PirRB' , Enemies ],
['HZA' , Enemies ],
['NO-FX' , Enemies ],
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
forumurl='http://covilkamik.forumeiros.com';
//forumurlnew='.';
forumurlnew='http://covilkamik.forumeiros.com/search.forum?search_id=newposts';
break;


}


var showbubble=Math.floor(Math.random()*10);
if (showbubble%2) { //If Even
addsbubble('mayor',"Kamik Rulez!", 68);
addsbubble('general',"Nós possuimos o nível base!", 71);
addsbubble('diplomat',"Kamik não chora!", 72);
addsbubble('scientist',"Ataca até o ultimo fundeiro!", 74);
addsbubble('diplomat',"Nunca se rende!", 77);
addsbubble('general',"Porrada neles todos!", 71);

} else {
addsbubble('diplomat',"Se um kamik ataca...", 68);
addsbubble('scientist',"é porque...", 71);
addsbubble('general',"está...", 72);
addsbubble('mayor',"está a precisar de recursos...", 74);
addsbubble('general',"para fazer tropa!", 77);


   }
