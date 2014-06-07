// ==UserScript==
// @name The Lord-atarak Tools Exclusive
// @version 06
// @namespace Lord-atarak
// @author Gboz (modded by lord-atarak)
// @description The Lord-atarak Tools 
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
alliancefullnm='Icariam Mermidon Warroirs';
alliancenm='Lord-Atarak';
alliance=[ ['?o alliance' , NoAlliance],
[ alliancenm , Alliance ],
//['ADGT' , Allies],
['AGTA' , Allies],
['-SUN-' , Allies],
['AETN' , Allies],
['LORDS' , Enemies ],
['NVA' , Enemies ]];



//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
chaturl='.';
//chaturl='http://m-m-lords.forumeiros.com/forum.htm';
//forumurl='.';
forumurl='http://m-m-lords.forumeiros.com/forum.htm';
//forumurlnew='.';
forumurlnew='http://m-m-lords.forumeiros.com/search.forum?search_id=newposts';
break;


}


var showbubble=Math.floor(Math.random()*10);
if (showbubble%2) { //If Even
addsbubble('mayor',"está a crescer!", 58);
addsbubble('general',"Temos gajas Boas aqui na aliança!", 63);
addsbubble('diplomat',"so tem tarados sexuais !", 66);
addsbubble('scientist',"sempre que veem uma mulher so pensao em SEXO!", 68);
addsbubble('diplomat',"Nunca se rende a beber uns copos !", 71);
addsbubble('general',"Não queremos quem brinca as casinha!", 75);
addsbubble('general',"Pois isto é uma aliança de bebados !", 79);
addsbubble('diplomat',"Quem não gostar a porta da rua e serventia da casa!", 83);
} else {
addsbubble('diplomat',"vamos beber uns copos...", 86);
addsbubble('scientist',"e dar umas fodas ...", 89);
addsbubble('general',"Nunca desistir ...", 92);
addsbubble('mayor',"É ser unido ...", 95);
addsbubble('general',"Vamos para a guerra e mais nada ", 99);

}