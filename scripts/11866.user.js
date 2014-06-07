// ==UserScript==
// @name		Ogame dodatni meni, v1.0
// @namespace	Dodaje link u lijevom meniju za simulatore borbe, link za kruznu poruku, kao i link za pregled kaznjenih igraca, v0.2
// @description Dodaje linkove simulatora: DragoSim (bosanski), SpeedSim, vrijeme leta, konvertor borbi takanacity, link za kruznu poruku, kao i link za pregled kaznjenih igraca, prilagodjeno za .ba servere. U v1.0 ispravljena prethodna dva bug-a u meniju.
// @author      unixash
// @date        2007-09-02
// @version     1.0
// @include	    http://*/game/leftmenu.php?session=*
// @exclude	   
// ==/UserScript==    

//Start.Ogame_Menu.v1.0.js
//############################################################################
	
element = document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[27]/TD[1]/DIV[1]/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
var session = document.URL.substr(document.URL.indexOf("session=") + 8,12);
element.innerHTML ='<tr><td><div align="center"><a href="http://drago-sim.com/index.php?lang=bosnian" target="blank"><font color="#9AACCB">DragoSim 2</a></div></td></tr></div>'+
'<tr><td><div align="center"><a href="http://websim.speedsim.net/index.php?lang=ba" target="blank"><font color="#9AACCB">SpeedSim</a></div></td></tr></div>'+
'<tr><td><div align="center"><a href="http://www.halo-online.hr/ogameFlight.aspx" target="blank"><font color="#9AACCB">Vrijeme leta</a></div></td></tr></div>'+
'<tr><td><div align="center"><a href="http://www.takanacity.com/main.php?tag=crconverter" target="blank"><font color="#9AACCB">Konvertor</a></div></td></tr></div>'+
'<tr><td><div align="center"><a href="pranger.php" target="Hauptframe"><font color="red">Kaznjeni</font></a></div></td></tr></div>'+
'<tr><td><div align="center"><a href="allianzen.php?session=' + session + '&a=17" target="Hauptframe"><font color="red">Kruzna poruka</font></a></div></td></tr></div>'+

'';
//End.Ogame_Menu.v1.0.js
//############################################################################

