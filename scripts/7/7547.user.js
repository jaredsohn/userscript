// ==UserScript==
// @name        Ogame Pro Alliance Menu v1.0
// @namespace	Ogame Pro Alliance Menu v1.0
// @description Ogame Pro Alliance Menu v1.0 - Adds an Alliance Administration Menu on the Left Bar.
// @author      klandestino
// @date        2007-02-14
// @version     1.0
// @include http://ogame*.de/game/leftmenu.php*
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

trs[trs.length-1].innerHTML ='<tr><td><div align="center"><img src="http://ogame441.de/evolution/gfx/ogame-produktion.jpg" width="110" height="40" /></div></td></tr>'+
'<tr><td><div align="center""><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '" target="Hauptframe">Alliance Page </a></font></div></td></tr>'+
'<tr><td><center><img src="http://ogame441.de/evolution/gfx/info-help.jpg" width="110" height="3"></center></td></tr>'+
'<tr><td><div align="center""><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=5" target="Hauptframe">Manage Aliance</a></font></div></td></tr>'+
'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=7" target="Hauptframe">Manage Members </a></font></div></td></tr>'+
'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=6" target="Hauptframe">Rights / Ranks</a></font></div></td></tr>'+
'<tr><td><center><img src="http://ogame441.de/evolution/gfx/info-help.jpg" width="110" height="3"></center></td></tr>'+
'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=17"target="Hauptframe">Circular Message</a></font></div></td></tr>'+
'<tr><td><center><img src="http://ogame441.de/evolution/gfx/info-help.jpg" width="110" height="3"></center></td></tr>'+
'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=4"target="Hauptframe">Member List</a></font></div></td></tr>'+
'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=4&sort1=3&sort2=0" target="Hauptframe">Member Ranking</a></font></div></td></tr>'+
'<tr><td><center><img src="http://ogame441.de/evolution/gfx/info-help.jpg" width="110" height="5"></center></td></tr>'+

//'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=10" target="Hauptframe">Alliance Name</a></font></div></td></tr>'+
//'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=9" target="Hauptframe">Alliance TAG</a></font></div></td></tr>'+
//'<tr><td><center><img src="http://ogame441.de/evolution/gfx/info-help.jpg" width="110" height="5"></center></td></tr>'+
'';
})();
//End.Ogame_Pro.Alliance.Menu.v1.0.user.js
//############################################################################



