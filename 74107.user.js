// ==UserScript==

// @name		Extension GOD

// @namespace		http://godsofdamned.in-goo.com/

// @description		Permet la modification de la page OGame (raccourcis)
// @include		http://*.ogame.*/*

// ==/UserScript==

	// On récupère l'identifiant de la session du joueur
	var usersession = unsafeWindow.session;
	
	
	// On créé le 1er ajout : Liens du menu
	var LinkDiv = document.createElement('div');
	
	LinkDiv.id = 'LinkDiv';
		LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_network_a.gif" height="29" width="38"></span><a class="menubutton " href="index.php?page=messages&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Messages</span></a></li>';
		LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_premium_a.gif" height="29" width="38"></span><a class="menubutton " href="index.php?page=networkkommunikation&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Communication</span></a></li>';
		LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="http://img180.imageshack.us/img180/6338/godnt.png" height="29" width="38"></span><a class="menubutton " href="http://godsofdamned.in-goo.com/" target="_blank"><span class="textlabel">Forum GOD</span></a></li>';
		LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_trader_a.gif" height="29" width="38"></span><a class="menubutton " href="http://www.supportduweb.com/ftp/ybouane/scripts_astuces/javascript/calculatrice/calculatrice.html" target="popup" onclick="window.open(\'\',\'popup\',\'width=325,height=325,left=100,top=100,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,status=no\')"><span class="textlabel">Calculatrice</span></a></li>';
	
	// On ajoute LinkDiv à la fin de l'élément menuTable
	document.getElementById('menuTable').appendChild(LinkDiv);


	// On créé le 2ème ajout : Liens de mise à jour
	var LinkDiv2 = document.createElement('span');
	
	LinkDiv2.id = 'LinkDiv2';
		LinkDiv2.innerHTML += ' - <a href="http://userscripts.org/scripts/source/74107.user.js">Mettre à jour l\'Extension</a>';
		
	// On ajoute LinkDiv2 à côté du nom du Joueur
	document.getElementById('playerName').appendChild(LinkDiv2);