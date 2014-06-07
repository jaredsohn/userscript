// ==UserScript==
// @name		Ogame Pro BattleSims Menu v1.0
// @namespace	Ogame Pro BattleSims Menu v1.0
// @description Replaces the help link with two links to ogame battle simulators: DragoSim 2 & GPL OGame Simulator (csim)
// @author      klandestino
// @date        2007-02-14
// @version     1.0
// @include	    http://*/game/leftmenu.php?session=*
// @exclude	   
// ==/UserScript==    

//Start.Ogame_Pro.BattleSims_Menu.v1.0.user.js
//############################################################################
element = document.evaluate('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[18]/TD[1]/DIV[1]/FONT[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
element.innerHTML = '<tr><td><div align="center"><img src="http://ogame441.de/evolution/gfx/ogame-produktion.jpg" width="110" height="40" /></div></td></tr>'+
'<tr><td><div align="center" style="font-color:#FFFFFF"><a href="http://drago-sim.com/index.php?lang=english" target="blank">DragoSim 2</a></div></td></tr></div>'+
'<tr><td><div align="center" style="font-color:#FFFFFF"><a href="http://www.o-o-d.com/tool/sim/index.cgi?lang=en" target="blank">Ogame Simulator</a></div></td></tr></div>'+
'';
//End.Ogame_Pro.BattleSims_Menu.v1.0.user.js
//############################################################################

