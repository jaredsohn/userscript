// ==UserScript==
// @name           Pokec.sk - Automaticke zatvaranie RP okna
// @namespace      http://usersscripts.org/users/87435
// @description    Zavrie okno rychlej posty po odoslani na chate pokec.sk.
// @include        http://rpx.azet.sk/*
// ==/UserScript==

es = document.getElementsByTagName("p");

for(i=0;i<es.length;i++){

	e = es[i];
	if(e.innerHTML.indexOf("Vaša správa bola odoslaná a uložená do") >= 0) 
	 
	 window.close();
	
}

