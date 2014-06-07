// ==UserScript==
// @name           Phenixland coop tuning
// @namespace      *phenix-land.com*
// @description	Supprime les produits non disponibles de la cooperative, et affiche le rapport prix du marche / prix mini
// @include        http://www.phenix-land.com/marche2.php?cat=*
// @exclude        http://www.phenix-land.com/marche2.php?cat=*&choix=*&nom_e=*
// ==/UserScript==

/*GM_registerMenuCommand( "Supprimer Non disponible", supprNonDispo );
GM_registerMenuCommand( "Reorganiser", reOrder );*/

function supprNonDispo() {
	tmptbody = getTbodyEl();
	var tmptds = tmptbody.getElementsByTagName('td');
	for ( var i = 0 ; i < tmptds.length ; i++ ) {
		//alert( i + " " + tmptds.length)
		var tmpchild = tmptds.item(i);
		var tmpfont = tmpchild.getElementsByTagName('font');
		if ( tmpfont.length && tmpfont[0].textContent == "Non disponible" ) {
			tmpchild.parentNode.removeChild(tmpchild.previousSibling);
			//alert(tmpchild.innerHTML);
			tmpchild.parentNode.removeChild(tmpchild);
			i -= 2;
		}
	}
}

function reOrder() {
	var tmptbody = getTbodyEl();
	var tmptds = tmptbody.getElementsByTagName('td');
	var newtds = new Array();
	for ( var i = 0 ; i < tmptds.length ; i++ ) {
		newtds[i] = tmptds[i].cloneNode(true);
	}
	while ( tmptbody.childNodes.length ) {
		tmptbody.removeChild(tmptbody.firstChild);
	}
	//alert(parseInt(newtds.length/8));
	for ( var i = 0 ; i <= parseInt(newtds.length/8) ; i++ ) {
		var trEl = document.createElement('tr');
		for ( j = i*8 ; j < (i+1)*8 && j < newtds.length ; j++) {
			trEl.appendChild(newtds[j]);
		}
		tmptbody.appendChild(trEl);
	}
	
}

function rajoutPrix() {
	var tmptbody = getTbodyEl();
	var tmpa = tmptbody.getElementsByTagName('a');
	var tmpfont = tmptbody.getElementsByTagName('font');
	for ( i = 0 ; i < tmpa.length ; i++ ) {
		getPrice(tmpa[i].href,tmpfont[i]);
	}
}

supprNonDispo();
reOrder();
rajoutPrix();

function getTbodyEl() {
	var tmpel = document.getElementsByTagName('font');
	var tmptbody;

	var i = 0;
	while ( i < tmpel.length && tmpel[i].textContent != "Disponible" && tmpel[i].textContent != "Non disponible" ) {
		i++;
	}
	return i < tmpel.length ? tmpel[i].parentNode.parentNode.parentNode.parentNode.parentNode : false;
}

function getPrice(href,fontEl) {
	var req = new XMLHttpRequest();
	req.open('GET', href, true); /* 3rd argument, true, marks this as async */
	req.overrideMimeType('text/xml');
	req.onreadystatechange = function (aEvt) {
		if (req.readyState == 4) {
			if(req.status == 200) {
				var chaine1 = req.responseText.substring(0,req.responseText.indexOf(' patars le Kg au march'));
				var prixmarche = parseFloat(chaine1.substring(chaine1.lastIndexOf(':') + 2));
				//alert(parseFloat(chaine2));
				fontEl.textContent = prixmarche;
				
				var chaine1 = req.responseText.substring(0,req.responseText.indexOf(' patars/Kg'));
				var prixmini = parseFloat(chaine1.substring(chaine1.lastIndexOf('>') + 1));
				
				fontEl.textContent = prixmarche + "p/Kg " + prixmini + "p/Kg " + (prixmarche / prixmini).toFixed(3);
				
			}
			//else
				//alert("Error loading page\n");
		}
	};
	req.send(null); 
}

