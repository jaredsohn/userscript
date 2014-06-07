// ==UserScript==
// @name           Mangareader
// @namespace      Snaquekiller
// @version        0.1
// @author       snaquekiller
// @creator       snaquekiller
// @description   Mangareader 
// @date 2013-01-28
// @include       http://*mangareader.net/*
// @grant none
// ==/UserScript==

/*=================================================================================================================*/

var nom_mangamoi = new Array("Ability","Assasination Classroom","All You Need Is Kill","Absolute Duo","Bleach","Black Bullet","Bakudan! - Bakumatsu Danshi","Claymore","Code Breaker","Dragons rioting","D.Gray-Man","drifters","Dr. Duo","Fairy Tail","Flow","id","half prince","head trick","kenichi","kurogane","Mahouka Koukou no Rettousei","Naruto","One piece","Owari no Seraph","rosario+vampire","Shinmai Mao no Keiyakusha","Tail star","The Breaker New Waves","Toriko","The gamer","taboo tatoo","World Trigger", "Crepuscule");
var nom_manga = '';
for(var i =0; i <document.getElementsByClassName("c3").length;i++){
	nom_manga = document.getElementsByClassName("c3")[i].getElementsByTagName('strong')[0].innerHTML;
	for(var j=0; j <nom_mangamoi.length;j++){
    	if(nom_manga == nom_mangamoi[j]){
			//alert(nom_manga);
    		document.getElementsByClassName("c3")[i].getElementsByTagName('strong')[0].innerHTML = '<span style="color:#660000;font-size:18px;position:relative;left:100px;background-color:" >'+nom_manga +' </span>';
			document.getElementsByClassName("c3")[i].style.background="#83E983"; 
    	}
	}
}