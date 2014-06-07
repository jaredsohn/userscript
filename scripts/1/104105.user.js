// ==UserScript==
// @name           Missives
// @namespace      Premier-Empire
// @description    Ajoute une signature aux missives
// @include        http://www.premier-empire.net/jeu/index.php
// @include        http://www.premier-empire.net/jeu/courrier.php
// ==/UserScript==

// Commande du menu Greasemonkey pour personnaliser la signature
GM_registerMenuCommand('Configurer la signature', function() {
		var signature;
		signature = prompt('Saisissez votre signature', GM_getValue('signature'));
		GM_setValue('signature', signature);
		unsafeWindow.remiseZeroCourrier()
	} );

// Réécriture de la fonction des courriers pour instertion de la signature
unsafeWindow.ajaxGetCourrier = function(dt_courrier, expediteur, blnAll)
{
	if (blnAll == 0)
		unsafeWindow.switchDivs ("imgRepondreSimple", "imgLoaderCourrierLu");
	else if (blnAll == 1)
		unsafeWindow.switchDivs ("imgRepondreTous", "imgLoaderCourrierLu");
	var data = "date=" + dt_courrier + "&exp=" + expediteur + "&tous=" + blnAll;
	
	//alert (data);
	
	//nouvelle connexion
	var xhr_object = unsafeWindow.setNewXMLHttpRequest();
	if (xhr_object == null) return;
	
	//on fait le traitement
	xhr_object.open("POST", "courrier_repondre.php", true); 
	xhr_object.onreadystatechange = function() 
	{ 
	   if(xhr_object.readyState == 4)
	   {	
			var tabElements = xhr_object.responseText.split (";;;;;");
			//alert (tabElements[2]);
			if (document.getElementById ("divCourrierNouveau") != null)
				unsafeWindow.ouvrirDiv ("divCourrierNouveau");
			var titre = document.getElementById ("txtTitre");
			titre.value = "Re : " + tabElements[0];
			var contenu = document.getElementById ("taContenu");
			contenu.value = "\n\n\n"+GM_getValue('signature')+"\n----------\n" + tabElements[1];
			contenu.value.caretPos = 1;
			contenu.focus();
			var destinataire = document.getElementById ("txtDestinataire");
			destinataire.value = tabElements[2];
			
			//on remet comme avant
			if (blnAll == 0)
				unsafeWindow.switchDivs ("imgLoaderCourrierLu", "imgRepondreSimple");
			else if (blnAll == 1)
				unsafeWindow.switchDivs ("imgLoaderCourrierLu", "imgRepondreTous");
	   } 
	} 
	
	xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=iso-8859-1");
	xhr_object.send(data);
}

// Idem sur la fonction de remise à zéro
unsafeWindow.remiseZeroCourrier = function()
{
	var divCourrierNouveau = document.getElementById ("divCourrierNouveau");
	if (divCourrierNouveau != null && divCourrierNouveau.style.display == 'none') return;
	
	document.getElementById ("txtDestinataire").value = "";
	document.getElementById ("txtTitre").value = "";
	document.getElementById ("taContenu").value = "\n\n\n"+GM_getValue('signature');
	unsafeWindow.ouvrirFermerDiv("divCourrierEnvoyerResultat");
	
}

// Lancement de la remise à zéro pour rajouter la signature dès le premier nouveau courrier (inutile en cas de réponse)
unsafeWindow.remiseZeroCourrier();