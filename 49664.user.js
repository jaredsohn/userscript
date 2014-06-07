// ==UserScript==
// @name The LEGA3 Tools Exclusive
// @version 06
// @namespace LEGA3
// @author Gboz (modded by lord-atarak)
// @description The LEGA3 alliance Tools 
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
alliancefullnm='300legA';
alliancenm='LEGA3';
alliance=[ ['?o alliance' , NoAlliance],
[ alliancenm , Alliance ],
//['LEGA3' , Alliance ],
['-A-' , Allies ],
['L-T' , Allies ],
['LEG3R' , Allies ],
['GOE-s' , Allies ],
['GoesE' , Allies ],
['H3K' , Allies ],
['Com' , Allies ],
['Ole' , Enemies ],
['UVS' , Enemies ],
['BSG' , Enemies ],
['PRIDE' , Enemies ]];


//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
chaturl='.';
//chaturl='http://300lega.forumeiros.com/forum-300lega-f1/';
//forumurl='.';
forumurl='http://300lega.forumeiros.com/forum.htm';
//forumurlnew='.';
forumurlnew='http://300lega.forumeiros.com/forum-300lega-f1/';
break;


}


var showbubble=Math.floor(Math.random()*10);
if (showbubble%2) { //If Even
addsbubble('mayor',"LEGA3 é crescer!", 68);
addsbubble('general',"Ser temido!", 71);
addsbubble('diplomat',"LEGA3 Honra os seus compromissos!", 72);
addsbubble('scientist',"Ataca até o ultimo fundeiro!", 74);
addsbubble('diplomat',"Nunca se rende!", 77);
addsbubble('general',"Não deixamos companheiros de guerra !", 71);
addsbubble('general',"Pois isto é uma aliança de guerra!", 71);
addsbubble('diplomat',"Quem não gostar a porta da rua e serventia da casa!", 77);
} else {
addsbubble('diplomat',"Ser um LEGA3 é ser forte...", 68);
addsbubble('scientist',"é ser duro ...", 71);
addsbubble('general',"Nunca desistir ...", 72);
addsbubble('mayor',"É ser unido ...", 74);
addsbubble('general',"Para o ataque final!", 77);

}