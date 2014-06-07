// ==UserScript==
// @name           Colorier interieur messages
// @namespace      Snaquekiller
// @description    colorie l'intérieur des messages de l'utilisateur
// @include        http://*.ogame.fr/game/index.php?page=showmessage*
// @include        http://*.ogame.fr/game/index.php?page=over*
// @date 2011-04-28
// @version        0.1
// @author       snaquekiller
// @creator       snaquekiller
// ==/UserScript==


	
{/**** function de vulca pour autre navigateur que firefox ***/
	var FireFox = navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1;
	var nomScript = FireFox? '' : 'colorfriend';
	var Opera = navigator.userAgent.indexOf('Opera')>-1;

	// Google Chrome 
	if(!FireFox) 
	{
		function GM_getValue(key,defaultVal) 
		{
			var retValue = localStorage.getItem(key);
			if ( !retValue ) 
			{
				return defaultVal;
			}
			return retValue;
		}

		function GM_setValue(key,value) 
		{
			localStorage.setItem(key, value);
		}
	}
}
	
	var url = location.href;
	var serveur = url.split('/')[2];
	var color_own = GM_getValue('messages_color_interieur_own'+serveur,'#167B8F');
	var color_other = GM_getValue('messages_color_interieur_other'+serveur,'#820682');
	
if(url.indexOf('index.php?page=over',0)>=0){/****************  Partie option ************************/
	//function petit rectangle affiche (genre pop up) 0 V , 1 erreur
	function fadeBoxx(message, failed, temps){
		if(FireFox)
		{
			var $; 
			try { $ = unsafeWindow.$; } 
			catch(e) { $ = window.$; } 
			
			var unsafe = window;
			try {unsafe = unsafeWindow} catch (e) {}
			unsafe.tb_remove();

			if (failed) {
				$("#fadeBoxStyle").attr("class", "failed");
			} else {
				$("#fadeBoxStyle").attr("class", "success");
			}
			$("#fadeBoxContent").html(message);
			$("#fadeBox").stop(false, true).show().fadeOut(temps);
		}else{
			alert(message);
		}
	}

	//-----------------------------------------------
	// AJOUT BOUTON
	//-----------------------------------------------
	function addButton(){ // @Copyright Terminator By Lame Noire
		var buttonPosition = document.getElementById("links");
		if(!buttonPosition) 
		{
			return;
		}

		var button = document.createElement("li");
		button.innerHTML = '<span class="menu_icon" id="IconeScript"><img src="http://img810.imageshack.us/img810/3261/imgestionscript.png" ></span/><a target="_self" accesskey="" href="' + location.href + "&Scripts" + '" class="menubutton "><span class="textlabel">Gestion Scripts</span></a>';
		buttonPosition = document.getElementById("links").getElementsByTagName("ul")[0].getElementsByTagName("li")[10];
		insertAfter(button, buttonPosition);
	}
	
	//-----------------------------------------------
	// INSERT AFTER
	//-----------------------------------------------
	function insertAfter(elem, after){// @copyright Terminator By Lame Noire
		var dad = after.parentNode;
		if(dad.lastchild == after)
			dad.appendChild(elem);
		else 
			dad.insertBefore(elem, after.nextSibling);
	}
	
	if(!document.getElementById('IconeScript')){
		addButton();
	}
	
	//-----------------------------------------------
	// SAVE OPTIONS
	//-----------------------------------------------
	function save(){ // sauvegarde des options saisies à suite à l'appui du bouton save
		GM_setValue('messages_color_interieur_own'+serveur, document.getElementById('input_color_color_own').value);
		GM_setValue('messages_color_interieur_other'+serveur, document.getElementById('input_color_other').value);
		fadeBoxx("Sauvegardé",0,2000); // affichage d'une fadebox
	}
	
	//-----------------------------------------------
	// TEXT OPTIONS
	//-----------------------------------------------
	
	function displayOptions(){
		var texte_a_afficher = '<table bgcolor="#333333" style="border: 1px solid #606060 !important;" ><tr><td><center><font size=3 color=#009999><b>'+
				'Messages color interieur </b></font></center><center>'+
					'Couleur de vos messages :<input type="text" id="input_color_color_own" value="'+ color_own +'" style="width:60px;background-color:'+ color_own+ ';" /><br/>'+
					'Couleur des messages de votre correspondant :<input type="text" id="input_color_other" value="'+ color_other +'" style="width:60px;background-color:'+ color_other+ ';" /><br/>'+
					'<input type="submit" id="messages_color_interieur_submit_save" value="Sauvegarder options Messages color interieur"/><br><br></center>'+
				'<center><font color=#333333>_____________________________________________________________________________________</font></center></td></tr></table>';// On affiche les options
				
		if(!document.getElementById('headGestionScript')){ // Si ce script est le script racine (le premier a être traité)
			var html_a_rajouter = ' <span id="headGestionScript"><center><h2>Gestionnaire des Scripts</h2></center></span>'; // On affiche le titre
			document.getElementById('inhalt').innerHTML = html_a_rajouter + texte_a_afficher;
			document.getElementById("messages_color_interieur_submit_save").addEventListener("click", function(event){save();}, true); // on ajoute l'évenement au bouton Submit
		}
		else{
			var text = texte_a_afficher;
			// LE BUT EST DE RAJOUTER LE TEXTE SANS TOUCHER AU addEventListener précédent, pour ne pas qu'il soit désactivé = INDISPENSABLE
			var sp1 = document.createElement("span"); // on crée une balise span
			sp1.setAttribute("id", "messages_color_interieur_element_affichage"); // on y ajoute un id
			var sp1_content = document.createTextNode('');
			sp1.appendChild(sp1_content);
			var sp2 = document.getElementById('headGestionScript') ; // Lieu où on veut afficher (A remplacer par ce que vous voulez
			var parentDiv = sp2.parentNode;
			parentDiv.insertBefore(sp1, sp2.nextSibling);
			var tableau = document.createElement("span");
			tableau.innerHTML = text; // Ce qu'on veut afficher
			document.getElementById('messages_color_interieur_element_affichage').insertBefore(tableau, document.getElementById('messages_color_interieur_element_affichage').firstChild); // Affichage

			document.getElementById("messages_color_interieur_submit_save").addEventListener("click", function(event){save();}, true);// ajout du nouvel évenement de sauvegarde
		}
	}
	
	if (location.href.indexOf('Scripts') != -1){ // si dans la partie 'Scripts'
		displayOptions(); // affichage des options
	}
	

}

/*************** SCRIPT EN LUI MEME *******************/
else if(document.getElementsByClassName('mailnew')[0]){
	for(var u = 0; u<document.getElementsByClassName('own').length; u ++)
	{
		document.getElementsByClassName('own')[u].style.backgroundColor = color_own;	
	}
	for(var f = 0; f<document.getElementsByClassName('other').length; f ++)
	{
		document.getElementsByClassName('other')[f].style.backgroundColor = color_other;	
	}
	document.getElementsByClassName('new')[0].style.backgroundColor = color_other;
}
	

	
	