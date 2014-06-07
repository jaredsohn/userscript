// ==UserScript==
// @name           New Erepublik dmg and HIT calculator
// @namespace      http://dl.dropbox.com/u/3789873/military.js
// @include        http://www.erepublik.com/*/military/*
// ==/UserScript==
// Created by sw1ft
// Simple script for counting damage.
// You can recalculate your dmg, and number of hits.

function zaok(a){
a = a*100; 
a = Math.round(a);
a = a/100;
return a;
} 


function Main(){
	var ss1 = document.getElementById('fighter_skill').firstChild.data;
	var str1 = ss1.replace("," , "");
	var ww1 = document.getElementById('scroller').firstChild.data;
	var ss2 = document.getElementById('enemy_skill').firstChild.data;
	var str2 = ss2.replace("," , "");
	
	var ww2 = document.getElementById('enemy_weapon').src;
	var w22 = ww2.replace("http://www.erepublik.com/images/modules/pvp/weapons/weapon_q" , "");
	var www2 = w22.replace(".png" , "");
	
	var ww1 = document.getElementById('scroller');
	var tmp1 = ww1.getElementsByTagName('img');
	var tmp2 = tmp1[0].src;
	var w11 = tmp2.replace("http://www.erepublik.com/images/modules/pvp/weapons/weapon_q" , "");
	var www1 = w11.replace(".png" , "");

	var hpo = document.getElementById('enemy_life').title;
	var hpo1 = hpo.replace("Opponent health: " , "");
	
	var wynik=30 + ((Number(str1)-Number(str2))/100)*5 + (Number(www1)-Number(www2))*2;
	var hitsy = zaok(hpo1/wynik);
	var hitsy2 = Math.floor(hitsy+1);
	
	var koniec = document.createElement("p");
	koniec.innerHTML = "<b><h1>&nbsp</h1><p align='right' style=\"border: medium none; color: #FF0000; font-size: 14px; font-weight: bold; line-height: 2px; margin: 0; padding: 0;\">" + hitsy2 + " x </b><img title='" + hitsy + "' src='http://www.erepublik.com/images/icons/industry/2/q" + www1 + ".png' height=30 width=30>" + zaok(wynik) + " dmg</h3></font><br><br><a align=center href='?' style=\"padding-top:8px; padding-left:2px; width:67px; height:22px; color: #FFFFFF; float: right; font-size: 12px; line-height: 12px; margin-top: 12px; margin-right: 30px; text-shadow: 0 -1px 0 #509ABC; background-image:url('http://dl.dropbox.com/u/3789873/img/button.png');\"><strong>Recalculate</strong></a>";	
	p2 = document.getElementById('eatFoodTooltip');
	p2.parentNode.insertBefore(koniec, p2);
	


document.getElementById('recalc').addEventListener("click", function(e)
{
	var sURL = unescape(window.location.pathname);
	window.location.href = sURL;
}, false);

}

window.addEventListener('load', Main, false);

 


 


