// ==UserScript==
// @name Ogame knoppen / Omega
// @namespace Omega add-on
// @description Voegt knoppen toe aan het linkermenu voor het Omega Forum/GT, infuza en de kokx cr converter.
// @author blaargh
// @include http://s17-nl.ogame.gameforge.com/*
// ==/UserScript==


var LinkDiv = document.createElement('div');		// van de afbeeldingen, scr = normaal, rel = mouse-over
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<li><span class="menu_icon"><a href="http://www.omega-ogame.nl/galaxytools/uni17/" class="" target="_blank"><img class="mouseSwitch" src="http://omega-ogame.nl/forum/wcf/images/photos/photo-10-57cb26c8.gif" height="29" width="38" rel="http://omega-ogame.nl/forum/wcf/images/photos/photo-13-c089aac8.gif"/></a></span><a class="menubutton " href="http://omega-ogame.nl/forum/" accesskey="" target="_blank"><span class="textlabel">Omega Forum</span></a></li>';
LinkDiv.innerHTML += '<li><span class="menu_icon"><a href="http://websim.speedsim.net/index.php?lang=nl" class="" target="_blank"><img class="mouseSwitch" src="http://omega-ogame.nl/forum/wcf/images/photos/photo-19-5855ccb1.gif" height="29" width="38" rel="http://omega-ogame.nl/forum/wcf/images/photos/photo-19-5855ccb1.gif"/></a></span><a class="menubutton " href="http://www.infuza.com/nl/ogame.nl/universe17" accesskey="" target="_blank"><span class="textlabel">Infuza</span></a></li>';
LinkDiv.innerHTML += '<li><span class="menu_icon"><a href="http://converter.dijkman-winters.nl/public/" class="" target="_blank"><img class="mouseSwitch" src="http://omega-ogame.nl/forum/wcf/images/photos/photo-17-472b862d.gif" height="29" width="38" rel="http://omega-ogame.nl/forum/wcf/images/photos/photo-18-33ad3fa0.gif"/></a></span><a class="menubutton " href="http://www.ogniter.org/nl/287/ranking/1/0" accesskey="" target="_blank"><span class="textlabel">Ogniter</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);