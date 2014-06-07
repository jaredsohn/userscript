// ==UserScript==
// @name        AddLink
// @namespace   vulca
// @include     http://*.ogame.*/game/index.php*
// @version     1
// ==/UserScript==


var link=       ' <li><span class="menu_icon"><img src="http://img11.hostingpics.net/pics/517700LOGOLRM.png" height="29" width="38"></span>';
link+= ' <a class="menubutton " href="http://lrmizarienne.xooit.fr/index.php" accesskey="" target="_self">';
link+= ' <span class="textlabel">Forum</span></a></li>';

link+=       ' <li><span class="menu_icon"><img src="http://img11.hostingpics.net/pics/517700LOGOLRM.png" height="29" width="38"></span>';
link+= ' <a class="menubutton " href="http://lrmizarienne.byethost4.com" accesskey="" target="_self">';
link+= ' <span class="textlabel">Site</span></a></li>';

link+=       ' <li><span class="menu_icon"><img src="http://img11.hostingpics.net/pics/517700LOGOLRM.png" height="29" width="38"></span>';
link+= ' <a class="menubutton " href="http://ebrow21.byethost11.com" accesskey="" target="_self">';
link+= ' <span class="textlabel">OGspy</span></a></li>';

link+=       ' <li><span class="menu_icon"><img src="http://img11.hostingpics.net/pics/517700LOGOLRM.png" height="29" width="38"></span>';
link+= ' <a class="menubutton " href="http://www.war-riders.de/fr/Mizar/" accesskey="" target="_self">';
link+= ' <span class="textlabel">War Rider</span></a></li>';

link+=       ' <li><span class="menu_icon"><img src="http://img11.hostingpics.net/pics/517700LOGOLRM.png" height="29" width="38"></span>';
link+= ' <a class="menubutton " href="http://www.gamewinner.fr/ogame-simulateur-combat.html" accesskey="" target="_self">';
link+= ' <span class="textlabel">GameWinner</span></a></li>';


	
		var sp1 = document.createElement("span");
		sp1.setAttribute("id", "option_g");
		var sp1_content = document.createTextNode('');
		sp1.appendChild(sp1_content);
		var sp2 = document.getElementById('menuTable').getElementsByTagName('li')[10];
		var parentDiv = sp2.parentNode;
		parentDiv.insertBefore(sp1, sp2.nextSibling);
		var tableau = document.createElement("span");
		tableau.innerHTML = link;
		document.getElementById('option_g').insertBefore(tableau, document.getElementById('option_g').firstChild);

//document.getElementById('menuTable').insertBefore(tableau, document.getElementById('menuTable').firstChild );

