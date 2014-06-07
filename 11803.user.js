// ==UserScript==
// @name		Dodatni meni, v0.2
// @namespace	Dodaje link u lijevom meniju za simulatore borbe, link za kruznu poruku, kao i link za pregled kaznjenih igraca, v0.2
// @description Dodaje linkove simulatora: DragoSim (bosanski) & websim & halo-online.hr, konvertor borbi takanacity, link za kruznu poruku, kao i link za pregled kaznjenih igraca, prilagodjeno za .ba servere
// @author      unixash
// @date        2007-08-30
// @version     2.0
// @include	    http://*/game/leftmenu.php?session=*
// @exclude	   
// ==/UserScript==    

//Start.Ogame_Menu.v0.2.js
//############################################################################
element = document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[18]/TD[1]/DIV[1]/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
element.innerHTML = '<a href="pranger.php" target="Hauptframe"><font color="red">Kaznjeni</font></a>';

var session = document.URL.substr(document.URL.indexOf("session=") + 8,12);
element = document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[19]/TD[1]/DIV[1]/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
element.innerHTML = '<a href="allianzen.php?session=' + session + '&a=17" target="Hauptframe"><font color="red">Kruzna poruka</font></a>';
	
element = document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[17]/TD[1]/DIV[1]/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
element.innerHTML = '<tr><td><div align="center"><img src="http://uni12.ogame.ba/evolution/gfx/info-help.jpg" width="110" height="19" /></div></td></tr>'+
'<tr><td><div align="center" style="font-color:#FFFFFF"><a href="http://drago-sim.com/index.php?lang=bosnian" target="blank">DragoSim 2</a></div></td></tr></div>'+
'<tr><td><div align="center" style="font-color:#FFFFFF"><a href="http://websim.speedsim.net/index.php?lang=ba" target="blank">Ogame Simulator</a></div></td></tr></div>'+
'<tr><td><div align="center" style="font-color:#FFFFFF"><a href="http://www.halo-online.hr/ogameFlight.aspx" target="blank">Vrijeme leta</a></div></td></tr></div>'+
'<tr><td><div align="center" style="font-color:#FFFFFF"><a href="http://www.takanacity.com/main.php?tag=crconverter" target="blank">Konvertor</a></div></td></tr></div>'+




'';
//End.Ogame_Menu.v0.2.js
//############################################################################

