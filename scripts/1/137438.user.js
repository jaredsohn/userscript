// ==UserScript==
// @name           MinecraftJVC
// @namespace      http://www.jeuxvideo.com
// @description    Module de réponse rapide pour le forum Minecraft
// @include        http://www.jeuxvideo.com/forums/*-24777*
// @include		   http://forum-minecraft-serveurs.forumjv.com/3-83652*
// ==/UserScript==

//Initialisation du module de réponse rapide.
function init()
{
	//Vérification premier lancement
	if (localStorage['premierLancementMinecraftJVC'] != 0)
	{
		localStorage['lengthReponseRapide'] = 1;
		localStorage['premierLancementMinecraftJVC'] = 0;
	}
	if (location.href[44] == 3)
	{
		//Chargement des valeurs de réponse rapide
		value_options = new Array();
		var lengthReponseRapide = localStorage['lengthReponseRapide'];
		for (i = 0 ; i < lengthReponseRapide ; i++)
		{
			value_options[i] = new Array();
			value_options[i]['intitule'] = localStorage['intitule' + i];
			value_options[i]['contenu'] = localStorage['contenu' + i];
		}
		var eltPost = document.getElementById('post').getElementsByTagName('p')[0].getElementsByTagName('span')[0];
		var brPost = document.querySelector('textarea');
		var liste = document.createElement('select');
		liste.id = "choix_reponse";
		liste.innerHTML = "<option selected></option>"
		for (var i = 0 ; i < value_options.length ; i++) 
		{       
			var valOption = value_options[i]["contenu"];          
			liste.innerHTML += "<option value=\""+valOption+"\" onClick=\"document.getElementById(\"newmessage\").value = \""+valOption+"\"\">"+value_options[i]['intitule']+"</option>";
		}
		liste.addEventListener('click', function() {document.getElementById("newmessage").value = this.value;})
		document.getElementById('post').getElementsByTagName('p')[0].insertBefore(liste, brPost);
		document.getElementById("choix_reponse").insertAdjacentHTML("beforebegin", "<br><br>");
	}
	else
	{
		//Initialisation de la page de Configuration
		initPageConfiguration();
		//Initialisation de l'interface de Configuration
		interfaceConfiguration();
		//Initialisation du Module de Reponse Rapide
		if (location.href[32] == 3)
		{
			//Chargement des valeurs de réponse rapide
			value_options = new Array();
			var lengthReponseRapide = localStorage['lengthReponseRapide'];
			for (i = 0 ; i < lengthReponseRapide ; i++)
			{
				value_options[i] = new Array();
				value_options[i]['intitule'] = localStorage['intitule' + i];
				value_options[i]['contenu'] = localStorage['contenu' + i];
			}
			var eltPost = document.getElementById('post').getElementsByTagName('p')[0].getElementsByTagName('textarea')[0];
			var brPost = document.getElementById('post').getElementsByTagName('p')[0].getElementsByTagName('select')[0];
			var liste = document.createElement('select');
			liste.id = "choix_reponse";
			liste.innerHTML = "<option selected></option>"
			for (var i = 0 ; i < value_options.length ; i++) 
			{       
				var valOption = value_options[i]["contenu"];          
				liste.innerHTML += "<option value=\""+valOption+"\" onClick=\"document.getElementById(\"newmessage\").value = \""+valOption+"\"\">"+value_options[i]['intitule']+"</option>";
			}
			liste.addEventListener('click', function() {document.getElementById("newmessage").value = this.value;})
			document.getElementById('post').getElementsByTagName('p')[0].insertBefore(liste, eltPost);
			document.getElementById("choix_reponse").insertAdjacentHTML("beforebegin", "<br><br>");
		}
	}
};

function initPageConfiguration()
{
	var content = function interfacePageConfiguration()
	{
		var changeInterface = function changeInterface()
		{
			//Initialisation de l'interface de la page de Configuration
			//Chargement des valeurs de réponse rapide
			value_options = new Array();
			var lengthReponseRapide = localStorage['lengthReponseRapide'];
			for (i = 0 ; i < lengthReponseRapide ; i++)
			{
				value_options[i] = new Array();
				value_options[i]['intitule'] = localStorage['intitule' + i];
				value_options[i]['contenu'] = localStorage['contenu' + i];
			}
			//Initialisation du nombre de réponse rapide
			var innerHTML = 'Nombre de Messages Rapides : ' + lengthReponseRapide + '<br>';
			var innerHTML2 = '<input name="addMessage" value="Ajouter" type="button"><input name="delMessage" value="Supprimer" type="button"><br><br>';
			for (i = 0 ; i < lengthReponseRapide ; i++)
			{
				innerHTML2 += 'Titre du Message Rapide<br><input value="'+ value_options[i]["intitule"] +'" name="intitule'+ i +'"><br>Contenu du Message Rapide<br><textarea  cols="40" rows="5" name="contenu' + i + '">'+ value_options[i]["contenu"] +'</textarea><br>'
			}
			//Modification de l'interface déjà présente
			configurationWindow.document.querySelector(".titre_page").innerHTML = "<span>CONFIGURATION DES REPONSES RAPIDES</span>";
			configurationWindow.document.querySelector(".bloc_inner").style.padding='10px 5px';
			configurationWindow.document.querySelector(".bloc_inner").style.textAlign='center';
			configurationWindow.document.querySelector(".alerte").style.color='#000000';
			configurationWindow.document.querySelector(".alerte").style.fontWeight='bold';
			configurationWindow.document.querySelector(".alerte").innerHTML = innerHTML + innerHTML2;
			configurationWindow.document.querySelector(".lien_base").innerHTML = '<a href="javascript:void(0);">Confirmer les changements</a>';
			configurationWindow.document.getElementsByName("addMessage")[0].addEventListener("click", function()
			{
				lengthReponseRapide = localStorage['lengthReponseRapide'];
				lengthReponseRapide++;
				localStorage['lengthReponseRapide'] = lengthReponseRapide;
				var innerHTML = 'Nombre de Messages Rapides : ' + lengthReponseRapide + '<br>';
				configurationWindow.document.querySelector(".alerte").innerHTML = innerHTML + innerHTML2;
				changeInterface();
			}, false);
			configurationWindow.document.getElementsByName("delMessage")[0].addEventListener("click", function()
			{
				lengthReponseRapide = localStorage['lengthReponseRapide'];
				if (lengthReponseRapide == 1)
				{
					configurationWindow.alert("Vous ne pouvez pas avoir moins d'un message rapide.");
				}
				else
				{
					lengthReponseRapide--;
					localStorage['lengthReponseRapide'] = lengthReponseRapide;
					var innerHTML = 'Nombre de Messages Rapides : ' + lengthReponseRapide + '<br>';
					configurationWindow.document.querySelector(".alerte").innerHTML = innerHTML + innerHTML2;
					changeInterface();
				}
			}, false);
			configurationWindow.document.querySelector(".lien_base a").addEventListener("click", function()
			{
				//Sauvegarde des valeurs de réponse automatique
				var lengthReponseRapide = 0;
				for (i = 0 ; i < value_options.length ; i++)
				{
					value_options[i]["intitule"] = configurationWindow.document.getElementsByName("intitule" + i)[0].value;
					value_options[i]["contenu"] = configurationWindow.document.getElementsByName("contenu" + i)[0].value;
				}
				for (i = 0 ; i < value_options.length ; i++)
				{
					localStorage['intitule' + i] = value_options[i]["intitule"];
					localStorage['contenu' + i] = value_options[i]["contenu"];
					lengthReponseRapide++;
					localStorage['lengthReponseRapide'] = lengthReponseRapide;
					configurationWindow.close();
					location.reload();
				}
			}, false);
		};
		var configurationWindow = window.open("http://www.jeuxvideo.com/forums/options.htm", '_blank');
		configurationWindow.onload = changeInterface;
	};
	createFunction("Configuration", content);
};

function interfaceConfiguration()
{
	//Initialisation du Module de Configuration
	var interfaceReponseRapide = document.createElement('div');
	interfaceReponseRapide.className = "bloc3";
	interfaceReponseRapide.id = "interfaceReponseRapide";
	var pubSelector = document.querySelector("#pub_carre1");
	document.querySelector("#col2").insertBefore(interfaceReponseRapide, pubSelector);
	
	var interfaceReponseRapideBloc = document.createElement('h3');
	interfaceReponseRapideBloc.className = "titre_bloc";
	interfaceReponseRapideBloc.id = "interfaceReponseRapideBloc";
	document.querySelector("#interfaceReponseRapide").appendChild(interfaceReponseRapideBloc);
	
	var interfaceReponseRapideTitre = document.createElement('span');
	interfaceReponseRapideTitre.id = "bloc_config_img";
	interfaceReponseRapideTitre.innerHTML = "Configuration";
	document.querySelector("#interfaceReponseRapideBloc").appendChild(interfaceReponseRapideTitre);
	
	var interfaceReponseRapideBlocInner = document.createElement('div');
	interfaceReponseRapideBlocInner.className = "bloc_inner";
	interfaceReponseRapideBlocInner.id = "ConfigurationInner";
	document.querySelector("#interfaceReponseRapide").appendChild(interfaceReponseRapideBlocInner);
	
	var interfaceReponseRapideConfiguration = document.createElement('ul');
	interfaceReponseRapideConfiguration.className = "liste_liens ui-sortable";
	interfaceReponseRapideConfiguration.id = "liste_configuration";
	var interfaceReponseRapidePageConfiguration = document.createElement('li');
	interfaceReponseRapidePageConfiguration.id = "page_configuration";
	var interfaceReponseRapidePageConfigurationLien = document.createElement('a');
	interfaceReponseRapidePageConfigurationLien.href = "javascript:interfacePageConfiguration();";
	interfaceReponseRapidePageConfigurationLien.innerHTML = "Configuration des Réponses Rapides";
	
	document.querySelector("#ConfigurationInner").appendChild(interfaceReponseRapideConfiguration);
	document.querySelector("#liste_configuration").appendChild(interfaceReponseRapidePageConfiguration);
	document.querySelector("#page_configuration").appendChild(interfaceReponseRapidePageConfigurationLien);
};

//Initialisation de fonction raccourcis.
function createTextNode(functionText)
{
	return document.createTextNode(functionText);
};

//Initialisation de fonction raccourcis.
function createFunction(idFunction, contentFunction)
{
	var createFunction = document.createElement('script');
	createFunction.type = "text/javascript";
	createFunction.id = idFunction;
	document.getElementsByTagName("head")[0].appendChild(createFunction);
	createFunction.appendChild(createTextNode(contentFunction.toString()));
};

init();