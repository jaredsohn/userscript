// ==UserScript==
// @name                Ogame Pro Alliance Menu v1.1 Dutch translation
// @namespace	 Ogame Pro Alliance Menu v1.1 Dutch translation
// @description     Ogame Pro Alliance Menu v1.1 - Voegt snelkoppelingen in de linker lijst toe
// @author              klandestino, translated by Dozer
// @date                 klandestino's version 2007-02-14   translated in 2007-5-29
// @version            1.1
// @include http://*.ogame.*/game/leftmenu.php*
// @include http://*.gfsrv.net/game/leftmenu.php*
// ==/UserScript==

//Start.Ogame_Pro.Alliance.Menu.v1.0.user.js
//############################################################################
(function() {	
	var Session = document.body.innerHTML.substr(document.body.innerHTML.indexOf("session=") + 8,12);
	var trs = document.getElementsByTagName('tr');
	
	for (var i = 0; i < trs.length; i++) {
		if(trs[i].innerHTML.indexOf("Info Comandante</font>") != -1){
			trs[i].parentNode.removeChild(trs[i]);			
		}
	}	

trs[trs.length-1].innerHTML =
'<tr><td><center><img src="http://ogame441.de/evolution/gfx/info-help.jpg" width="110" height="20"></center></td></tr>'+
'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=5" target="Hauptframe">Beheer Alliantie </a></font></div></td></tr>'+
'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=7" target="Hauptframe">Beheer Leden</a></font></div></td></tr>'+
'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=6" target="Hauptframe">Beheer Rechten</a></font></div></td></tr>'+
'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=17"target="Hauptframe">Rondgaande Post</a></font></div></td></tr>'+
'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=4"target="Hauptframe">Ledenlijst</a></font></div></td></tr>'+
'<tr><td><div align="center"><font color="#FFFFFF"><a href="stat.php?session='  + Session +  'a=4&sort1=3&sort2=1" target="Hauptframe">Alliantie stats</a></font></div></td></tr>'+
'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=10" target="Hauptframe">Alliantie Naam</a></font></div></td></tr>'+
'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=9" target="Hauptframe">Alliantie Tag</a></font></div></td></tr>'+
//'<tr><td><center><img src="http://ogame441.de/evolution/gfx/info-help.jpg" width="110" height="5"></center></td></tr>'+
'';
})();
//End.Ogame_Pro.Alliance.Menu.v1.0.user.js
//############################################################################



