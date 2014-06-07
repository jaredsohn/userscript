// ==UserScript==
// @name         Lets fight erweiterung Direkter angrifsbutton
// @namespace      by basti1012 http://pennerhack.foren-city.de
// @description      Zeigt hinter den letzen 15 kapfn in direk button um wider anzugreifen 
// @include         *pennergame.de/fight/overview/*
// @include         *pennergame.de/fight/fightlog/*

// ==/UserScript==


document.title = 'Lets Fight direktangriffs Script By Basti1012';

var url = document.location.href;


if (url.indexOf("http://www.berlin.pennergame")>=0) {
var link = "http://berlin.pennergame.de"
}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
}
if (url.indexOf("http://pennergame")>=0) {
var link = "http://pennergame.de"
}
if (url.indexOf("http://www.dossergame")>=0) {                               
var link = "http://www.dossergame.co.uk"        
}                                             
if (url.indexOf("http://www.menelgame")>=0) { 			
var link = "http://www.menelgame.pl"
}		
if (url.indexOf("http://www.clodogame")>=0) {				*
var link = "http://www.clodogame.fr"		
}						
if (url.indexOf("http://www.mendigogame")>=0) {				*
var link = "http://www.mendigogame.es"		
}

var ifanzahl = '15';
x=0;						
wechseln();
if (url.indexOf("/fight/fightlog/")>=0) {	
var ifanzahl = '21';
x=0;						
}






function wechseln(){

if(x <= Number(ifanzahl)){
tr{
var my_table = document.getElementsByTagName("table")[1];
var info_id = my_table.getElementsByTagName("tr")[x+1];


	var id = info_id.innerHTML.split('/">')[2].split('</a>')[0];
	var fightid = info_id.innerHTML.split('<td><a href="')[1].split('"><img')[0];

		info_id.innerHTML +='<a href="/fight/?to='+id+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
x++;
wechseln();

}catch(){}


	}
}

copy right by basti1012