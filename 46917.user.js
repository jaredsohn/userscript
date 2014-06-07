// ==UserScript==
// @name          SVZ - Age
// @namespace     http://google.de
// @description   Lass dir einfach das Alter deines Freundes oder eines Profils anzeigen!
// @include       http://www.studivz.net/*
// @include       http://studivz.net/*
// @include       http://www.schuelervz.net/*
// @include       http://schuelervz.net/*
// @include       http://www.meinvz.net/*
// @include       http://meinvz.net/*
// ==/UserScript==


var profil_infos = document.getElementById('Profile_InformationSnipplet').innerHTML;
var date_s = profil_infos.substr(profil_infos.search("Geburtstag:"),150);
date_s = date_s.substring(date_s.search('">')+2,date_s.search("</a>"));
     
var temp = new Array();
temp = date_s.split('.');

var new_date = temp[1] + "/" + temp[0] + "/" + temp[2];

var Birthday = new Date(new_date);
var now = new Date();
var Jahr = now.getYear()
Alter = new String
var Alter =Math.floor(Jahr-(Birthday.getYear())-1);
if (Alter>99) //Jahrtausendproblem ?
{
var Alter = Alter-1900
}
     
var einfPos = profil_infos.search(date_s)+20;
var teil1 = profil_infos.substr(0, einfPos);
var teil2 = profil_infos.substr(einfPos, profil_infos.length - einfPos);


//profil_infos = teil1 + " (" + Alter + ") " + teil2;
profil_infos = teil1 + "<dt>Alter:</dt><dd>"+Alter+"</dd>" + teil2;
document.getElementById('Profile_InformationSnipplet').innerHTML = profil_infos;