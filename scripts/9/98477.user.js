// ==UserScript==
// @name            The West - Vote Jeux-Alternatifs [SOM]
// @namespace       http://userscripts.org/scripts/show/98477
// @description     Script pour The-West: Vote sur Jeux-Alternatifs.com [SOM - Scripts-O-Maniacs] (v1.0.2)
// @copyright       2010-2011, Zyphir Randrott (The-West fr1)
// @author          Zyphir Randrott
// @release	        Zyphir Randrott
// @website         http://scripts-o-maniacs.leforum.eu
// @license         GPL version 3 or any later version; http://www.gnu.org/licenses/gpl.html
// @license         (CC); http://creativecommons.org/licenses/by-nc-sa/2.0/be/
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/review/98477*
// @include         http://userscripts.org/scripts/source/98477.meta.js*
// @version         1.0.2
//
// @history         1.0.2|01/06/2011 Sortie publique
// @history         1.0.1|28/05/2011 Nouveau système de vote sur JA + intégration updater
// @history         1.0.0|06/03/2011 Version beta en test
// ==/UserScript==

// ------------------------------------------------------------------------
// ©Copyright 2010-2011 Zyphir Randrott <zyphir.randrott@gmail.com>
// This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
// -------------------------------------------------------------------------------------
//    Content licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 2.0 Belgium License.
//    See <http://creativecommons.org/licenses/by-nc-sa/2.0/be/>.
// -------------------------------------------------------------------------------------------------------



// Pour la mise à jour
var url = window.location.href;

//Cas du script exécuté dans le jeu (ou fenêtre principale)
if (url.indexOf(".the-west.") != -1) {

	(function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){

	/////////////////////////////////////////////////////////
	//
	// DÉCLARATION DES CONSTANTES
	//
	/////////////////////////////////////////////////////////

	//MISE À JOUR
	var VERSION 			= "1.0.2" ;
	var NUMERO_SCRIPT		= "98477" ;
	var NB_HISTORY			= 10 ;
	var MENU_maj			= "ZYPH_" + NUMERO_SCRIPT + "_MAJ" ;
	var DELTA_maj 			= 24 * 3600 ; // 24 h en s


  var ja_world_switch = localStorage.getItem("JA_world_off");

  function ja_showMessage(){
	  var ja_world_switch = localStorage.getItem("JA_world_off");
	  var ja_content = '<div id="ja_div" style="width:692px;height:345px;overflow:scroll"><iframe id="ja_iframe" name="ja_iframe" src="http://www.jeux-alternatifs.com/The-West-jeu55_hit-parade_1_1.html" width="1000" height="2200" scrolling="no"></iframe></div><div style="text-align:center;margin-top:8px;">A voté ?</div>';
	  showMessage(ja_content, "Votez sur<br>[<a style='font-size:15px' href='http://www.jeux-alternatifs.com/The-West-jeu55_hit-parade_1_1.html' target='_blank'>Jeux-Alternatifs.com</a>]", 722, 315, [["yes", function () {localStorage.setItem('JA_day_voted', String(get_server_date().getDate()));}],["no", function () {localStorage.setItem('JA_day_voted', '0');}]], true);			
	  $('ja_div').parentNode.parentNode.parentNode.childNodes[9].style.paddingBottom = "20px";
	  var ja_insertAfter = $('ja_div').parentNode.parentNode.parentNode.childNodes[9];
	  var ja_newElement = document.createElement('div');
	  ja_newElement.style.cssText = "position:absolute;font-Size:10px;bottom:8px;left:8px"
	  ja_newElement.innerHTML = '<input type="checkbox" title="Vous pouvez toujours rouvrir cette fenêtre en cliquant sur l\'icône<br>de jeux-alternatifs.com située en bas à droite de votre écran." onclick="javascript:localStorage.setItem(\'JA_world_off\', String(this.checked));"'+(ja_world_switch == "true"?"checked":"")+'>Ne plus afficher sur ce monde</input>';
	  ja_insertAfter.appendChild(ja_newElement);
	  $('ja_div').parentNode.parentNode.parentNode.childNodes[9].firstChild.title="La fenêtre s'ouvrira automatiquement à partir de<br>demain 00h01 pour un nouveau vote.";
	  $('ja_div').parentNode.parentNode.parentNode.childNodes[9].childNodes[1].title="La fenêtre s'ouvrira automatiquement<br>à la prochaine actualisation.";
	  $('ja_div').scrollTo(10, 375);
  }

  if((ja_world_switch == null || ja_world_switch == "false") && localStorage.getItem("JA_day_voted") != String(get_server_date().getDate())){
	  ja_showMessage();
	  // fix for iframe bad content loading
	  var f=document.getElementsByTagName("iframe");
	  for(var i=0;i<f.length;i++){
		  if(f[i].src.substr(f[i].src.length-1)=="#") f[i].src=f[i].src.substr(0,f[i].src.length-1);
		  else {
			  f[i].src=f[i].src+"#";
			  f[i].src=f[i].src.substr(0,f[i].src.length-1); // hack for Chrome
		  }
	  }
  }

  if(typeof window.JA == 'undefined'){try{
	  window.JA = {};
	  JA.ja_showMessage = ja_showMessage;
	  }catch(e){alert(e)}
  }

  var ja_button = document.createElement('div');
  ja_button.style.cssText = "position:absolute;float:right;font-Size:10px;right:-100px;top:18px";
  ja_button.innerHTML = '<div><a href="javascript:JA.ja_showMessage();"><img title="Votez sur Jeux-Alternatifs.com" src="http://www.jeux-alternatifs.com/favicon.png"></a></div>';
  document.getElementById('main_footnotes').appendChild(ja_button);


///////////* SOM Manager by Zyphir */////////////
/*
  var som_scripts_list = [[20110529],['TW Pro+','92'+'414','Zyphir'],['Wardrobe','94'+'811','Dun'],['Shortcuts','92'+'957','Gzahab'],['Forts Manager','86'+'724','Zyphir'],['Notepad','99'+'336','Dun'],['ChatRoom','95'+'135','Y.'],['Duel Page','96'+'794','Dun'],['Vote on JA (fr)','98'+'477','Zyphir']];
  som_scripts_list[8].push(1, VERSION);

  function create_som_div(){
	  var som_scripts_div = document.createElement('div');
	  som_scripts_div.id = "som_scripts_div";
	  som_scripts_div.style.cssText = "position:absolute;float:left;font-Size:10px;left:-100px;bottom:15px;display:none;z-index:9999";
	  var som_scripts_div_table = '<table style="border: solid 1px #666666;background: url(../images/profile/settings_profile_input_bg.png);font-size:12px;vertical-align:top;">';
	  for(i=1;i<som_scripts_list.length;i++){
		som_scripts_div_table += '<tr><td><img id="active_som_script_'+som_scripts_list[i][1]+'" src="/images/confirm_buttons/'+(som_scripts_list[i][3]==1?'yes':'no')+'.png" width="16" height="16" title="'+(som_scripts_list[i][4]?'<b>'+som_scripts_list[i][4]+'</b>':'')+'"></td><td><a href="http://userscripts.org/scripts/show/'+som_scripts_list[i][1]+'" target="_blank">'+som_scripts_list[i][0]+'</a></td><td>'+som_scripts_list[i][2]+'</td></tr>';
	  }
	  som_scripts_div_table += '</table>';
	  som_scripts_div.innerHTML = som_scripts_div_table;
	  document.getElementById('main_footnotes').appendChild(som_scripts_div);
  }

 if(document.getElementById('som_scripts_manager')){
	if(som_scripts_list[0] > document.getElementById('som_button').name){
		for(i=1;i<som_scripts_list.length;i++){
			if(document.getElementById('active_som_script_'+som_scripts_list[i][1])){
				if(document.getElementById('active_som_script_'+som_scripts_list[i][1]).src.indexOf('yes.png')!=-1){
					som_scripts_list[i].push(1, document.getElementById('active_som_script_'+som_scripts_list[i][1]).title);
				}
			}			
		}
		document.getElementById('som_scripts_div').parentNode.removeChild(document.getElementById('som_scripts_div'));
		create_som_div();
	}
	else if(document.getElementById('active_som_script_98'+'477')){
		document.getElementById('active_som_script_98'+'477').src="/images/confirm_buttons/yes.png";
		document.getElementById('active_som_script_98'+'477').title='<b>'+VERSION+'</b>';
	}
	else{
		document.getElementById('som_scripts_div').innerHTML = document.getElementById('som_scripts_div').innerHTML.replace("</table>","<tr><td><img id='active_som_script_98477' src='/images/confirm_buttons/yes.png' width='16' height='16' title='<b>"+VERSION+"</b>'></td><td><a href='http://userscripts.org/scripts/show/98477' target='_blank'>Vote on JA (fr)</a></td><td>Zyphir</td></tr></table>");
	}
 }
 else{
	function show_som_scripts(){
		if(document.getElementById('workbar_left')){
			if(document.getElementById('som_scripts_div').style.display == "none"){
			  document.getElementById('workbar_left').style.zIndex="1";
			  document.getElementById('som_scripts_div').style.display = "block";}
			else{
  			  document.getElementById('workbar_left').style.zIndex="5";
			  document.getElementById('som_scripts_div').style.display = "none";
			}
		}
	}
	window.show_som_scripts = show_som_scripts;
	var som_button = document.createElement('div');
	som_button.style.cssText = "position:absolute;float:left;font-Size:10px;left:-100px;top:5px";
	som_button.id = "som_button";
	som_button.name = som_scripts_list[0];
	som_button.innerHTML = '<div id="som_scripts_manager"><a href="javascript:window.show_som_scripts();"><img title="<b>SOM Scripts</b>" src="http://img574.imageshack.us/img574/6460/greasemonkeyico.png"></a></div>';
	document.getElementById('main_footnotes').appendChild(som_button);
	create_som_div();
 }
*/
///////////* end SOM Manager */////////////



	function maj_a_verifier()
	{
		//
		// Gestion de la màj toute les 24 h
		//

		var heure_dernier_maj = 0 ;
		//Lit le contenu de la variable
		var donnee = localStorage.getItem(MENU_maj) ;
		if (donnee != null)
		{
			heure_dernier_maj = donnee ;
		}

		//Récupération de l'heure actuelle (en s depuis 1970)
		var heure_actuelle = new Date().getTime() / 1000 ;
				
		//Calcul le delta entre la dernière vérif et maintenant
		var delta = heure_actuelle - heure_dernier_maj ;
		if (delta < DELTA_maj) 
		{
			return false ; //Pas de màj à vérifier
//			return true ; //Force la màj
		}
		else
		{
			return true ;
		}
	}

	//Fonction de traitement du retour du source de l'iframe
	function trait_ret_iframe(contenu_iframe)
	{
		if (contenu_iframe.origin != "http://userscripts.org") return; //Sort si le retour n'est pas le contenu d'un script
		var version_recuperee = unescape(contenu_iframe.data);
		if (version_recuperee.match(/^\d+/) == NUMERO_SCRIPT) //vérifie si le message commence par le bon numéro de script 
		{
			var script_version = version_recuperee.match(/\/\/ @version+\s*(.*)/)[1]; //Récupération du contenu après @version
			if (script_version != VERSION) //Ne fais rien si la version est identique
			{
				var script_nom = version_recuperee.match(/\/\/ @name+\s*(.*)/)[1]; //Récupération du contenu après @name
				var script_auteur = version_recuperee.match(/\/\/ @release+\s*(.*)/)[1]; //Récupération du contenu après @release 
				//
				//Travaille sur les variables @history
				//
				var tab_history = version_recuperee.match(/\/\/ @history+\s*(.*)/g); //Récupération du tableau des lignes

				//Initialisation des variables
				var version_history_precedente	= "" ;
				var nb_version_history_trouvee	= 0 ;
				var contenu_fenetre_history		= "<DIV STYLE='text-align:center;font-weight:bold'>"+script_nom+"<span style='font-size:9px'> "+VERSION+"</span><span style='font-size:11px'>";
				contenu_fenetre_history	+= eval(TheWestApi.displayOutdated.toString().match(/(currentVersionMsg *= *)([^;]+)/)[2].replace("this.version", "\"<span style='color:rgb(34,34,136)'>"+script_version+"</span></span>\""));
				contenu_fenetre_history	+= "</DIV><DIV STYLE='border:1px #DABF83 inset;overflow:auto;height: 250px;margin-top:3px;'><TABLE>";

				//Boucle qui parcours les @history
				for (var i=0 ; i<tab_history.length ; i++)
				{
					ligne 				= tab_history[i].match(/\/\/ @history+\s*(.*)/)[1];
					version_history_avec_espace	= ligne.match(/^[a-zA-Z0-9\.\-\|\/]*\s/)[0] ; //contient les n° de version
					version_history_full = version_history_avec_espace.replace(/(^\s*)|(\s*$)/g,""); //suppression des espaces
					version_history = version_history_full.split("|")[0];
					version_history_date = version_history_full.split("|")[1] || "";

					//Teste si la version a changée
					if (version_history != version_history_precedente)
					{
					if (i>0) contenu_fenetre_history += "</UL></TD></TR>";
						contenu_fenetre_history += "<TR><TD width='500px' style='border: solid 1px #666666;background: url(../images/profile/settings_profile_input_bg.png);font-size:12px;vertical-align:top;'><B>" + version_history + "</B> <span style='float:right;font-size:10px;font-style:italic'>"+version_history_date+"</span><BR><UL style='margin-bottom:4px;'>" ;
						nb_version_history_trouvee++ ;
						version_history_precedente = version_history ;
					}
					version_history_full=version_history_full.replace("|","\\|");
					var reg = new RegExp(version_history_full + "+\s*(.*)");
					texte_history = ligne.match(reg)[1];
					contenu_fenetre_history += "<LI>" + texte_history + "</LI>" ;
					
					if (i==tab_history.length-1) contenu_fenetre_history += "</UL></TD></TR>";

					//Sort si le nb maximum d'historique est atteint
					if (nb_version_history_trouvee == NB_HISTORY) break ;
				}

				contenu_fenetre_history += "</TABLE></DIV>";
				contenu_fenetre_history	+= "<DIV style='float:left;font-size:10px;margin-top:2px;margin-left:4px'>"+eval(TheWestApi.displayOutdated.toString().match(/api.website *\?.+(?=['"]['"]\)*,'*\)* *"*\)*<\/div)/)[0].replace(" | ", "").replace(/api.website/g, "\"http://userscripts.org/scripts/show/"+NUMERO_SCRIPT+"\\\"\"+\"\\\" target='_blank'\"")+"\"\"")+"</DIV>";
				contenu_fenetre_history	+= "<DIV style='float:right;font-size:10px;margin-top:2px;margin-right:4px'>"+eval(TheWestApi.displayOutdated.toString().match(/api.author *\?.+(?=['"]['"]\)*,\(* *api.website *\?)/)[0].replace(" | ", "").replace(/api.author/g, "\""+script_auteur+"\"")+"\"\"")+"</DIV>";
				contenu_fenetre_history	+= "<BR><DIV STYLE='margin-bottom:-10px;text-align:center;font-weight:bold'>Install ?</DIV>";

				showMessage(contenu_fenetre_history, "Script Updater by [<a href='http://scripts-o-maniacs.leforum.eu' target='_blank'>SOM</a>]", 400, undefined, [["ok", function () {try{(typeof(safari) != "undefined" && safari)?window.open("http://userscripts.org/scripts/show/" + NUMERO_SCRIPT):location.href = "http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".user.js";}catch(e){}}], ["cancel"]]);			
			}

			//Stocke l'heure de la dernière vérif
			var heure_actuelle = new Date().getTime() / 1000 ;
			localStorage.setItem(MENU_maj,heure_actuelle) ;
		}
	}

	if (maj_a_verifier())
	{
		//Test safari
		var navigateur = navigator.userAgent.toLowerCase();
		//Initialisation de la variable
		var scr_script = "http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".meta.js";

		//Vu que pour chrome, il y a "safari", je teste avant la présence de chrome
		var chrome = navigateur.indexOf("chrome") + 1 ;
		if (!chrome)
		{
			safari = navigateur.indexOf("safari") + 1 ;
			if (safari)
			{
				var scr_script = "http://userscripts.org/scripts/review/" + NUMERO_SCRIPT;
			}
		}

		//
		//IFRAME
		//

		//Écriture dans une iframe le contenu de la source de l'en-tête du script
		var source_script=document.createElement('iframe');

		source_script.setAttribute('id', 'maj_' + NUMERO_SCRIPT);
		source_script.setAttribute('style', 'display:none;');
		//source_script.setAttribute('style', 'display:inline; position:absolute; width:500px; height:600px;');
		source_script.src = scr_script ;

		document.body.appendChild(source_script);
		// Fin de la génération de l'iframe

		// fix for iframe bad content loading
		var f=document.getElementsByTagName("iframe");
		for(var i=0;i<f.length;i++){
			if(f[i].src.substring(0,31)=="http://www.jeux-alternatifs.com") continue;
			if(f[i].src.substr(f[i].src.length-1)=="#") f[i].src=f[i].src.substr(0,f[i].src.length-1);
			else f[i].src=f[i].src+"#";
		} 

		//Ajout d'un évènement pour récupérer le contenu de l'iframe
		window.addEventListener('message', trait_ret_iframe, true);
	}

	})
}
else	//Cas du script exécuté dans l'iframe pour la mise à jour
{
	//Création d'une fonction globale pour tout le script
	(function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){

	/////////////////////////////////////////////////////////
	//
	// DÉCLARATION DES CONSTANTES
	//
	/////////////////////////////////////////////////////////

	var NUMERO_SCRIPT	= "98477" ;

	/////////////////////////////////////////////////////////
	//
	// FONCTIONS
	//
	/////////////////////////////////////////////////////////

	//Envoi des informations à la fenêtre principale
	function envoi_info(){
		var destination = window.parent;
		message = String(escape(document.body.textContent));

		//Indiquer le n° du script pour identifier la communication
		if(destination.postMessage) {
			destination.postMessage(NUMERO_SCRIPT + message, '*');
		}
	}

	/////////////////////////////////////////////////////////
	//
	// PROGRAMME PRINCIPAL
	//
	/////////////////////////////////////////////////////////

	envoi_info();
	})
}
