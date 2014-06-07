// ==UserScript==
// @name        C2C list items into tabs
// @description	Ouvre les items cochés d'une liste dans des onglets séparés sur le site de camptocamp.org
// @namespace   http://www.camptocamp.org
// @include     http://www.camptocamp.org/*/list/*
// @version     1.0
// ==/UserScript==

function openlinks (){
	// on récupere les liens (2e colonne)
    var linksnew = document.evaluate(
       "//*[@class='list']/tbody/tr/td[2]/a",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

	// on récupere les checkbox (1ere colonne)	
	var checkbox = document.evaluate(
        "//*[@class='list']/tbody/tr/td[1]/input",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
	// --ouverture des onglets -- 
	
	// on parcours les lignes	
	for (var i = checkbox.snapshotLength - 1; i >= 0; i--) {
        var elmbox = checkbox.snapshotItem(i);
		// on verifie si la case est cochée
		if (elmbox.checked){
			// ouverture du nouvel onglet
			var elm = linksnew.snapshotItem(i);        
			GM_openInTab(elm.href);
		}	
    }
}


// insertion du lien dans la page 

var elmNewContent = document.createElement('a');

elmNewContent.href = '#';
elmNewContent.appendChild(document.createTextNode(' Ouvrir les éléments cochés --'));

var elmFoo = document.getElementById('filterform');
elmFoo.parentNode.insertBefore(elmNewContent, elmFoo);
elmNewContent.style.cssFloat = 'right';
elmNewContent.addEventListener("click", openlinks, true);

