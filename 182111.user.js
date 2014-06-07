// ==UserScript==
// @name LinkForo
// @namespace  Miembros y foro Odin

// @description Agrega el link en la barra izquierda  ogame


// @include http://*ogame.*/game/index.php?page=overview*

// @include http://*ogame.*/game/index.php?page=resource*

// @include http://*ogame.*/game/index.php?page=station*

// @include http://*ogame.*/game/index.php?page=research*

// @include http://*ogame.*/game/index.php?page=defense*

// @include http://*ogame.*/game/index.php?page=preferences*

// @include http://*ogame.*/game/index.php?page=globalTechtree*

// @include http://*ogame.*/game/index.php?page=movement*

// @include http://*ogame.*/game/index.php?page=shipyard*

// @include http://*ogame.*/game/index.php?page=statistics*

// @include http://*ogame.*/game/index.php?page=highscore*

// @include http://*ogame.*/game/index.php?page=empire*

// @include http://*ogame.*/game/index.php?page=fleet*

// @include http://*ogame.*/game/index.php?page=galaxy*

// @include http://*ogame.*/game/index.php?page=network*

// @include http://*ogame.*/game/index.php?page=messages*

// @include http://*ogame.*/game/index.php?page=trader*

// @include http://*ogame.*/game/index.php?page=premium*

// @include http://*ogame.*/game/index.php?page=alliance*

// @include http://*ogame.*/game/index.php?page=combatreport*

// @include http://www.toolsforogame.com/battle/alcance_phalanx.aspx?idi=es-es*

// @include http://www.toolsforogame.com/misiles/misiles.aspx?idi=es-es*

// @include http://*ogame.*/game/index.php?page=showmessage*

// @includ http://*ogametools.*edit_profil*


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

afficheLeftMenu ( 'Odin Foro', 'http://odin.foro-activo.com/') ; // 





var sp1 = document.createElement("span");sp1.setAttribute("id", "MAJ gal");
var sp1_content = document.createTextNode('');
sp1.appendChild(sp1_content);
var sp2 = document.getElementById('menuTable').getElementsByTagName('li')[10];
var parentDiv = sp2.parentNode; parentDiv.insertBefore(sp1, sp2.nextSibling);

function afficheLeftMenu ( nom , lien)

{
  var aff_newVersion =' <li><span class="menu_icon"></span><a class="menubutton" target="blank_"  href="'+lien+'" accesskey="" target="_self"><span class="textlabel">'+nom+'</span></a></li>';
var tableau = document.createElement("span");
tableau.innerHTML = aff_newVersion;
document.getElementById('MAJ gal').insertBefore(tableau,document.getElementById('MAJ gal').firstChild);
}

 afficheLeftMenu ( 'ODIN Miembros', 'http://www.war-riders.de/es/122/search/ally/ODIN') ; //


var sp1 = document.createElement("span");sp1.setAttribute("id", "MAJ gal");
var sp1_content = document.createTextNode('');
sp1.appendChild(sp1_content);
var sp3 = document.getElementById('menuTable').getElementsByTagName('li')[10];
var parentDiv = sp3.parentNode; parentDiv.insertBefore(sp2, sp3.nextSibling);

function afficheLeftMenu ( nom , lien)

{
  var aff_newVersion =' <li><span class="menu_icon"></span><a class="menubutton" target="blank_"  href="'+lien+'" accesskey="" target="_self"><span class="textlabel">'+nom+'</span></a></li>';
var tableau = document.createElement("span");
tableau.innerHTML = aff_newVersion;
document.getElementById('MAJ gal').insertBefore(tableau,document.getElementById('MAJ gal').firstChild);
}

 afficheLeftMenu ( 'CEO Miembros', 'http://www.war-riders.de/es/122/search/ally/C%20E%20O') ; //

