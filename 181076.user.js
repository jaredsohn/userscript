// ==UserScript==
// @name           Liens ogame INFINITY
// @namespace      nouveau lien alliance Infinity univers wasat
// @description    nouveau lien dans la barre de gauche ogame

// @include        http://*ogame.*/game/index.php?page=overview*
// @include        http://*ogame.*/game/index.php?page=resource*
// @include        http://*ogame.*/game/index.php?page=station*
// @include        http://*ogame.*/game/index.php?page=research*
// @include        http://*ogame.*/game/index.php?page=defense*
// @include        http://*ogame.*/game/index.php?page=preferences*
// @include        http://*ogame.*/game/index.php?page=globalTechtree*
// @include        http://*ogame.*/game/index.php?page=movement*
// @include        http://*ogame.*/game/index.php?page=shipyard*
// @include        http://*ogame.*/game/index.php?page=statistics*
// @include        http://*ogame.*/game/index.php?page=highscore*
// @include        http://*ogame.*/game/index.php?page=empire*
// @include        http://*ogame.*/game/index.php?page=fleet*
// @include        http://*ogame.*/game/index.php?page=galaxy*
// @include        http://*ogame.*/game/index.php?page=network*
// @include        http://*ogame.*/game/index.php?page=messages*
// @include        http://*ogame.*/game/index.php?page=trader*
// @include        http://*ogame.*/game/index.php?page=premium*
// @include        http://*ogame.*/game/index.php?page=alliance*
// @include        http://*vulca.projet-alternative.fr/infoCompte/index.php?page=signature*
// @include        http://*ogame.*/game/index.php?page=combatreport*
// @include        http://mines.webinpact.com/index.php?*do=prod*
// @include        http://mines.oprojekt.net/*/mines/?id=*
// @include        http://*vulca.projet-alternative.fr/infoCompte/news*
// @include        http://*ogame.*/game/index.php?page=showmessage*
// @include        http://*ogametools.*edit_profil*

// ==/UserScript==

var sp1 = document.createElement("span");
			sp1.setAttribute("id", "MAJ gal");
			var sp1_content = document.createTextNode('');
			sp1.appendChild(sp1_content);
			var sp2 = document.getElementById('menuTable').getElementsByTagName('li')[10];
			var parentDiv = sp2.parentNode;
			parentDiv.insertBefore(sp1, sp2.nextSibling);

			function afficheLeftMenu ( nom , lien)
			{
				var aff_newVersion =' <li><span class="menu_icon"></span><a class="menubutton" target="blank_"  href="'+lien+'" accesskey="" target="popup"><span class="textlabel">'+nom+'</span></a></li>';
				var tableau = document.createElement("span");
				tableau.innerHTML = aff_newVersion;
				document.getElementById('MAJ gal').insertBefore(tableau, document.getElementById('MAJ gal').firstChild);
			}

			afficheLeftMenu ( 'Infinity Forum', 'http://infinity.ogamewar.com/') ; // 



var sp1 = document.createElement("span");
			sp1.setAttribute("id", "MAJ gal");
			var sp1_content = document.createTextNode('');
			sp1.appendChild(sp1_content);
			var sp2 = document.getElementById('menuTable').getElementsByTagName('li')[10];
			var parentDiv = sp2.parentNode;
			parentDiv.insertBefore(sp1, sp2.nextSibling);

			function afficheLeftMenu ( nom , lien)

                        {
                                var aff_newVersion =' <li><span class="menu_icon"></span><a class="menubutton" target="blank_"  href="'+lien+'" accesskey="" target="_self"><span class="textlabel">'+nom+'</span></a></li>';
				var tableau = document.createElement("span");
				tableau.innerHTML = aff_newVersion;
				document.getElementById('MAJ gal').insertBefore(tableau, document.getElementById('MAJ gal').firstChild);
			}

			afficheLeftMenu ( 'Infinity W-R', 'http://www.war-riders.de/fr/123/search/ally/Infinity') ; //
