// ==UserScript==
// @name Gemini knoppen / GT/Speedsim/Forum
// @namespace S.S.  add-on
// @description Voegt knoppen toe aan het linkermenu voor o.a. het Gemini Forum/GT, infuza en speedsim.
// @author Gier
// @include http://uni107.ogame.nl/*
// ==/UserScript==


var LinkDiv = document.createElement('div');		// van de afbeeldingen, scr = normaal, rel = mouse-over
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<li><span class="menu_icon"><a href="http://samurai.ogamespelergier.nl/GT/" class="" target="_blank"><img class="mouseSwitch" src="http://www.ogamespelergier.nl/gierGTextra.gif" height="29" width="38" rel="http://www.ogamespelergier.nl/gierGTextraRd.gif"/></a></span><a class="menubutton " href="http://board.ogame.nl/board692-in-het-universum/board718-gemini-uni-24/?s=c1177ad0c82e49729f21aa000765afcc8347e741" accesskey="" target="_blank"><span class="textlabel">Forum Gemini</span></a></li>';
LinkDiv.innerHTML += '<li><span class="menu_icon"><a href="http://ogamespelergier.nl/chat.htm" class="" target="_blank"><img class="mouseSwitch" src="http://www.ogamespelergier.nl/chatOgamegrijs.gif" height="29" width="38" rel="http://www.ogamespelergier.nl/chatOgameoranje.gif"/></a></span><a class="menubutton " href="http://ogamespelergier.nl" accesskey="" target="_blank"><span class="textlabel">Site Gier</span></a></li>';
LinkDiv.innerHTML += '<li><span class="menu_icon"><a href="http://converter.noxxie.nl/public/" class="" target="_blank"><img class="mouseSwitch" src="http://omega-ogame.nl/forum/wcf/images/photos/photo-17-472b862d.gif" height="29" width="38" rel="http://omega-ogame.nl/forum/wcf/images/photos/photo-18-33ad3fa0.gif"/></a></span><a class="menubutton " href="http://websim.speedsim.net/index.php?lang=nl" accesskey="" target="_blank"><span class="textlabel">SpeedSim</span></a></li>';
LinkDiv.innerHTML += '<li><span class="menu_icon"><a href="http://board.ogame.org/board684-ogame-org/board199-help-questions/board200-faqs-guides/639175-list-of-tolerated-ogame-addons/" class="" target="_blank"><img class="mouseSwitch" src="http://omega-ogame.nl/forum/wcf/images/photos/photo-19-5855ccb1.gif" height="29" width="38" rel="http://omega-ogame.nl/forum/wcf/images/photos/photo-19-5855ccb1.gif"/></a></span><a class="menubutton " href="http://www.infuza.com/nl/ogame.nl/Fornax" accesskey="" target="_blank"><span class="textlabel">Infuza</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);



/*	
1e links : S.S forum
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