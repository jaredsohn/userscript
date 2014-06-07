// ==UserScript==
// @name           Color alliance [Redesign]
// @namespace      Snaquekiller
// @version        0.3
// @author       snaquekiller (100% ) 
// @description   Color alliance v0.3
// @date 2011-04-16
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// @include        http://*.ogame.*/game/index.php?page=over*
// ==/UserScript==

//http://userscripts.org/scripts/show/86378
var url = location.href;
var serveur = url.split('/')[2];

/**** function de vulca pour autre navigateur que firefox ***/
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

	
/***************** Vous pouvez editer sa / you can edit this *******************/
// this color #167B8F is hexadecimal color
var couleur = GM_getValue('color_alliance'+'couleur'+serveur,'#167B8F/color2');

// add alliance like exemple without [  and ]. / ajouté les ally comme l'exemple sans les [}
var ally_add = GM_getValue('color_alliance'+'amis'+serveur, 'tag_ally1/tag_ally2');



{/****************  Partie option ************************/
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
		GM_setValue('color_alliance'+'couleur'+serveur, document.getElementById('input_color_color_alliance').value);
		GM_setValue('color_alliance'+'amis'+serveur, document.getElementById('input_friends_color_alliance').value);
		fadeBoxx("Sauvegardé",0,2000); // affichage d'une fadebox
	}
	
	//-----------------------------------------------
	// TEXT OPTIONS
	//-----------------------------------------------
	
	function displayOptions(){
		var texte_a_afficher = '<table bgcolor="#333333" style="border: 1px solid #606060 !important;" ><tr><td><center><font size=3 color=#009999><b>'+
				'Color Alliance </b></font></center><center>'+
					'Colors : <input type="text" id="input_color_color_alliance" value="'+ couleur +'" style="width:250px;" /><br/>'+
					'Alliances : <input type="text" id="input_friends_color_alliance" value="'+ ally_add +'" style="width:250px;"/><br/>'+
				'<input type="submit" id="color_alliance_submit_save" value="Sauvegarder options Color Alliance "/><br><br></center>'+
				'<center><font color=#333333>_____________________________________________________________________________________</font></center></td></tr></table>';// On affiche les options
				
		if(!document.getElementById('headGestionScript')){ // Si ce script est le script racine (le premier a être traité)
			var html_a_rajouter = ' <span id="headGestionScript"><center><h2>Gestionnaire des Scripts</h2></center></span>'; // On affiche le titre
			document.getElementById('inhalt').innerHTML = html_a_rajouter + texte_a_afficher;
			document.getElementById("color_alliance_submit_save").addEventListener("click", function(event){save();}, true); // on ajoute l'évenement au bouton Submit
		}
		else{
			var text = texte_a_afficher;
			// LE BUT EST DE RAJOUTER LE TEXTE SANS TOUCHER AU addEventListener précédent, pour ne pas qu'il soit désactivé = INDISPENSABLE
			var sp1 = document.createElement("span"); // on crée une balise span
			sp1.setAttribute("id", "color_alliance_element_affichage"); // on y ajoute un id
			var sp1_content = document.createTextNode('');
			sp1.appendChild(sp1_content);
			var sp2 = document.getElementById('headGestionScript') ; // Lieu où on veut afficher (A remplacer par ce que vous voulez
			var parentDiv = sp2.parentNode;
			parentDiv.insertBefore(sp1, sp2.nextSibling);
			var tableau = document.createElement("span");
			tableau.innerHTML = text; // Ce qu'on veut afficher
			document.getElementById('color_alliance_element_affichage').insertBefore(tableau, document.getElementById('color_alliance_element_affichage').firstChild); // Affichage

			document.getElementById("color_alliance_submit_save").addEventListener("click", function(event){save();}, true);// ajout du nouvel évenement de sauvegarde
		}
	}
	
	if (location.href.indexOf('Scripts') != -1){ // si dans la partie 'Scripts'
		displayOptions(); // affichage des options
	}
	

}
{/************** Script en lui Meme **************************/		
	//raccourcisseur de noms 
	function raccourcir(nomAraccourcir, nb){
	
		// conditions ? si c'est vrai : si c'est faut
		return nomAraccourcir.length >= nb ? nomAraccourcir.substring(0,nb) : nomAraccourcir;
	}
	if(url.indexOf('index.php?page=galaxy')>= 0){
		function compare_pseudo()
		{
			var ally = ally_add.split('/');
			var color = couleur.split('/');
			var ally_court;
			var status1;


			if(document.getElementById('galaxytable'))
			{
				for (var i=0 ; i<15 ; i++)
				{

					if(document.getElementById('galaxytable').getElementsByTagName('tr')[i].getElementsByClassName('allytag')[0])
					{
						if(document.getElementById('galaxytable').getElementsByTagName('tr')[i].getElementsByClassName('allytag')[0].getElementsByTagName('span')[0])
						{
							status1 = document.getElementById('galaxytable').getElementsByTagName('tr')[i].getElementsByClassName('allytag')[0].getElementsByTagName('span')[0].innerHTML;
							status1 = status1.split('<div')[0];
						}else{status1 = '';}
					}
					else{status1 = '';}
					
					if(status1 != ''){					
						for(var g=0 ; g<ally.length; g++)
						{
							if(ally[g].length >= 10){ally[g] = raccourcir(ally[g], 10) +'...'; ally_court = raccourcir(ally[g], 8);}
							else{ally_court = ally[g];}
							if(status1 == ally[g] || status1.indexOf(ally_court)>= 0 )
							{
								document.getElementById('galaxytable').getElementsByTagName('tr')[i].style.backgroundColor = color[g];			
								// document.getElementById('galaxytable').getElementsByTagName('tr')[i].getElementsByClassName('playername')[0].getElementsByTagName('span')[0].style.backgroundColor = '#167B8F';
							}
						}	
					}	
				}
			}
		}

		if(FireFox) 
		{
			function safeWrap(f)
			{
				return function()
				{
					setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
				};
			}
			//la division dans lequel le résultat de la requête ajax est placé a l'id galaxyContent
			unsafeWindow.$("#galaxyContent").ajaxSuccess(safeWrap(function(e,xhr,settings)
			{
				//l'url de la requête ajax contient page=galaxyContent
				if (settings.url.indexOf("page=galaxyContent") == -1) return;

				// Taper votre code a executer ici
				compare_pseudo();

			}));
		}else
		{ setInterval(compare_pseudo,1000);}
	}
}	