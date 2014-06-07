// ==UserScript==
// @name        c2cEditMultiTab
// @description	Permet d'ouvrir en mode edition les items cochés d'une liste sur le site de camptocamp.org
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
		
		if (elmbox.checked){ // on verifie si la case est cochée
						
			// url			
			var url = linksnew.snapshotItem(i).href;
			// pos pour inserer le /edit/
			var idx = url.indexOf("/",28);  
			// pos debut du nom de la fiche 			
			var idx1 = url.lastIndexOf("/");
			// url pour edition
			var urlEdit = url.substring(0,idx)+"/edit/"+url.substring(idx+1,idx1);

			// ouverture du nouvel onglet 
			GM_openInTab(urlEdit);
		}	
    }
}

// -- insertion du lien dans la page --

var elmNewContent = document.createElement('a');

elmNewContent.href = '#';
elmNewContent.appendChild(document.createTextNode('-- Editer les éléments cochés -- '));

var elmFoo = document.getElementById('filterform');
elmFoo.parentNode.insertBefore(elmNewContent, elmFoo);
elmNewContent.style.cssFloat = 'right';
elmNewContent.addEventListener("click", openlinks, true);

