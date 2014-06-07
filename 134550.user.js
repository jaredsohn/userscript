// ==UserScript==
// @name Io knoppen / XLR8
// @namespace XLR8  add-on
// @description Voegt knoppen toe aan het linkermenu voor o.a. XLR8, het  Forum/GT, infuza en speedsim.
// @author blaargh/Gier
// @include http://uni109.ogame.nl/*
// ==/UserScript==


var LinkDiv = document.createElement('div');		// van de afbeeldingen, scr = normaal, rel = mouse-over
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<li><span class="menu_icon"><a href="http://www.lo.ogamespelergier.nl/galaxytool/secret/index.php" class="" target="_blank"><img class="mouseSwitch" src="http://www.ogamespelergier.nl/gierGTextra.gif" height="29" width="38" rel="http://www.ogamespelergier.nl/gierGTextraRd.gif"/></a></span><a class="menubutton " href="http://board.ogame.nl/board692-in-het-universum/board737-io/" accesskey="" target="_blank"><span class="textlabel">Io Forum</span></a></li>';
LinkDiv.innerHTML += '<li><span class="menu_icon"><a href="http://lo.ogamespelergier.nl/chatIo/" class="" target="_blank"><img class="mouseSwitch" src="http://www.ogamespelergier.nl/chatOgamegrijs.gif" height="29" width="38" rel="http://www.ogamespelergier.nl/chatOgameoranje.gif"/></a></span><a class="menubutton " href="http://lo.ogamespelergier.nl/indexXLR8ontsnapping.htm" accesskey="" target="_blank"><span class="textlabel">Ontsnapping</span></a></li>';
LinkDiv.innerHTML += '<li><span class="menu_icon"><a href="http://converter.noxxie.nl/public/" class="" target="_blank"><img class="mouseSwitch" src="http://ogamespelergier.nl/vakjeknoppenkokx.gif"/height="29" width="38" rel="http://www.ogamespelergier.nl/vakjeknoppenkokxgeel.gif"/></a></span><a class="menubutton " href="http://websim.speedsim.net/index.php?lang=nl" accesskey="" target="_blank"><span class="textlabel">SpeedSim</span></a></li>';
LinkDiv.innerHTML += '<li><span class="menu_icon"><a href="http://www.lo.ogamespelergier.nl/" class="" target="_blank"><img class="mouseSwitch" src="http://www.ogamespelergier.nl/vakjeknoppenrood.gif"/height="29" width="38" rel="http://www.ogamespelergier.nl/vakjeknoppengeel.gif"/></a></span><a class="menubutton "  href="http://ogamespelergier.nl/stopwatch.htm" accesskey="" target="_blank"><span class="textlabel">Stopwatch</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);



/*	
1e links : Io forum
1e rechts: GT 
2e links : http://ogamespelergier.nl  website Gier
2e rechts: wikia: http://ogame.wikia.com/wiki/Main_Page
3e links : SpeedSim
3e rechts: kokx cr converter: http://converter.noxxie.nl/public/
4e links : Infuza
4e rechts: een van de volgende twee:
	- faqs and guides: http://board.ogame.org/board684-ogame-org/board199-help-questions/board200-faqs-guides/?s=f4d9e62c9ee452543d1da60075df58253cc1c911
	- tolerated ogame addons: http://board.ogame.org/board684-ogame-org/board199-help-questions/board200-faqs-guides/639175-list-of-tolerated-ogame-addons/
*/