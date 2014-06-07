// ==UserScript==
// @name           Phenixland marche prix rapport
// @description	Affiche dans chaque produit de la cooperative le rapport prix du marche / prix mini
// @namespace      *phenix-land.com*
// @include        http://www.phenix-land.com/marche2.php?cat=*&choix=*&nom_e=*
// ==/UserScript==

var prixMarche = getPrixMarche();
//alert(prixMarche);
transformTable(prixMarche);

function getPrixMarche() {
	var el = getElementsByClass("titre",document,"p");
	el = el[1].innerHTML;
	el = el.split(' ');
	var i = 0;
	while( el[i] != ':' && i < el.length ) {
		i++;
	}
	return(parseFloat(el[i+1]));
}

function transformTable(prixMarche) {
	var el = getElementsByClass("ttitre",document,"p")[0].parentNode;
	el = el.getElementsByTagName('div')[0];
	el = el.getElementsByTagName('tr');
	for( i = 0 ; i < el.length ; i++ ) {
		var tmpel = el[i].childNodes[1].firstChild.childNodes[2];
		if ( tmpel ) {
			var tmpprix = parseFloat(tmpel.nodeValue.split(' ')[0]);
			tmpel.nodeValue += ' soit ' + (prixMarche / tmpprix).toFixed(3);
			//alert(parseFloat(el[i].childNodes[1].firstChild.childNodes[2].nodeValue.split(' ')[0]));
		}
	}
	//alert(el[0].innerHTML);
}



/***************************************************************/

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}