// ==UserScript==
// @name           Forum GDC
// @namespace      Forum GDC
// @description    Lien direct vers forum GDC
// @include        http://*.ogame.*
// @exclude       


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

			afficheLeftMenu ( 'Forum GDC', 'http://les-guerriers-du-chaos.xooit.fr/index.php') ;


// ==/UserScript==