/* Thanks to tools4origins for this script */

// ==UserScript==

// @name           Capteurs_V3.1

// @namespace      None

// @description    Change le skin des capteurs V3.1

// @include        http://unialpha.origins-return.fr/index.php?page=Capteurs

// @include        http://unipegase.origins-return.fr/index.php?page=Capteurs

// @include        http://uniorion.origins-return.fr/index.php?page=Capteurs

// @include        http://uniida.origins-return.fr/index.php?page=Capteurs

// @include        http://unieridan.origins-return.fr/index.php?page=Capteurs

// @include        http://unicentaure.origins-return.fr/index.php?page=Capteurs

// @include        http://unitaurus.origins-return.fr/index.php?page=Capteurs

// @include        http://unisateda.origins-return.fr/index.php?page=Capteurs

// ==/UserScript==


//Recupere le nom de domaine

var href = 'http://' + window.location.host + '/';



//Fonction appelée a intervals de temps reguliers afin de changer les images et le design si ce n'est pas les bons

function verif()

{

	//Recupere toutes les images

	
	var allsuspects=document.getElementsByTagName("link") //Array de toutes les balises <link>

	for(var i=0; allsuspects[i]; i++) //Parcours tout ces link

		if (allsuspects[i].href.indexOf("design/officiel%20v2/capteurv31.css")!=-1) //Si c'est celui qu'on cherche

			allsuspects[i].href="http://www.amplurimedia.net/cssor/oldstyle.css"; //On le remplace

}



verif();

setInterval(function(){verif();}, 100);
