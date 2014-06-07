// ==UserScript==
// @name          			OGame Redesign: Cyber-Tools
// @description				Suite d'outils pour faciliter la vie des joueurs sur OGame.
// @namespace      			Cyber-Alliance
// @version        			1.1.5
// @author       			TNP
// @homepage      			http://userscripts.org/scripts/show/112942
// @updateURL				https://userscripts.org/scripts/source/112942.meta.js
// @include 				http://*.ogame.*/game/*
// ==/UserScript==


// fonctions diverses
function sizeof(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};
function is_int(num) {
	if(num<0) num*(-1);
	if(num-parseInt(num)==0)
		return true;
	else
		return false;
}
function intval(str) {
	if(str==null)
		return 0;
	else {
		var tmp='';
		for(var i=0; i<str.length; i++) tmp+=(isNaN(str[i]) || !isFinite(str[i]) || str[i]==' ') ? '' : str[i];
		if(tmp=='') tmp=0;
		return tmp;
	}
}
function in_array(needle, haystack) {
    for(var key in haystack) {
        if(haystack[key] == needle) return true;
    }
    return false;
}

function number_format (number, decimals, dec_point, thousands_sep) {
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec);
			return '' + Math.round(n * k) / k;
		};
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if (s[0].length > 3)
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}
function array_keys (input, search_value, argStrict) {
	var search = typeof search_value !== 'undefined',
		tmp_arr = [],
		strict = !!argStrict,
		include = true,
		key = '';
	if (input && typeof input === 'object' && input.change_key_case)
		return input.keys(search_value, argStrict);
	for (key in input) {
		if (input.hasOwnProperty(key)) {
			include = true;
			if (search) {
				if (strict && input[key] !== search_value)
					include = false;
				else if (input[key] != search_value)
					include = false;
			}
			if (include)
				tmp_arr[tmp_arr.length] = key;
		}
	}
	return tmp_arr;
}
//cout construction des vaisseaux
Cost = {
	am204: { Metal: 3000, Cristal: 1000, Deuterium: 0 },
	am205: { Metal: 6000, Cristal: 4000, Deuterium: 0 },
	am206: { Metal: 20000, Cristal: 7000, Deuterium: 2000 },
	am207: { Metal: 45000, Cristal: 15000, Deuterium: 0 },
	am202: { Metal: 2000, Cristal: 2000, Deuterium: 0 },
	am203: { Metal: 6000, Cristal: 6000, Deuterium:  0},
	am208: { Metal: 10000, Cristal: 20000, Deuterium: 10000 },
	am215: { Metal: 30000, Cristal: 40000, Deuterium: 15000 },
	am211: { Metal: 50000, Cristal: 25000, Deuterium: 15000 },
	am213: { Metal: 60000, Cristal: 50000, Deuterium: 15000 },
	am214: { Metal: 5000000, Cristal: 4000000, Deuterium: 1000000 },
	am212: { Metal:0, Cristal: 2000, Deuterium: 500 },
	am209: { Metal: 10000, Cristal: 6000, Deuterium: 2000 },
	am210: { Metal: 0, Cristal: 1000, Deuterium: 0 },
	am041: { Metal: 0, Cristal: 2000, Deuterium: 500 },
	am402: { Metal: 2000, Cristal: 0, Deuterium: 0 },
	am403: { Metal: 1500, Cristal: 500, Deuterium: 0 },
	am404: { Metal: 6000, Cristal: 5000, Deuterium: 0 },
	am405: { Metal: 20000, Cristal: 15000, Deuterium: 2000 },
	am406: { Metal: 2000, Cristal: 6000, Deuterium: 0 },
	am407: { Metal: 50000, Cristal: 50000, Deuterium: 30000 },
	am408: { Metal: 10000, Cristal: 10000, Deuterium: 0 },
	am409: { Metal: 50000, Cristal: 50000, Deuterium: 0 },
	am502: { Metal: 8000, Cristal: 0, Deuterium: 2000 },
	am503: { Metal: 12500, Cristal: 2500, Deuterium: 10000 },
}





//ouverture du fichier
var OgameServeur = document.location.href.split('/')[2];
var UserSession = document.location.href.replace(/^.*&session=([0-9a-f]*).*$/i,"$1");
var RTfile = 'CyberTools_'+OgameServeur;
var gmfile = GM_getValue(RTfile, false);
InitFile();
function InitFile()
{
	if(!gmfile)
		gmfile = { rapports: {}, attaques: {}, option: {}, temp: {} };
	else
		gmfile = JSON.parse(gmfile);
	
	// on charge le fichier de langue
	LANG = SelectLanguage(gmfile.option['General_Language']);
	
	// on ajoute les options
	OptionsList = {
		General: {
			Language: { inputtype: "select", value: ["Français,English"] },
			ReplyCirculaire: { inputtype: "radio", value: ["yes|"+LANG.Options.Yes, "no|"+LANG.Options.No] },
			HideHeaders: { inputtype: "radio", value: ["yes|"+LANG.Options.Yes, "no|"+LANG.Options.No] },
		},
		Espionnage: {
			ColorAttaque: { inputtype: "text", value:"#D43635" },
			ColorInactif: { inputtype: "text", value:"#98CC00" },
			PillageMin: { inputtype:"text", value:"0" },
			PillageMinWithCDR: { inputtype:"radio", value:["yes|"+LANG.Options.Yes, "no|"+LANG.Options.No] },
			MaxTime: { inputtype: "select", value: ["0->31|"+LANG.Options.Jours, "0->23|"+LANG.Options.Heures, "0->59|"+LANG.Options.Minutes] },
			Max24HProtect: { inputtype:"radio", value:["yes|"+LANG.Options.Yes, "no|"+LANG.Options.No] },
			AutoTransporteur: { inputtype:"radio", value:["yes|"+LANG.Options.Yes, "no|"+LANG.Options.No] },
			AutoTransporteurFirst: { inputtype:"radio", value:["am202|"+LANG.Fleet.am202, "am203|"+LANG.Fleet.am203] },
			TypeDate: { inputtype:"radio", value: ["chrono|"+LANG.Options.Espionnage.Chrono, "date|"+LANG.Options.Espionnage.Dates] },
			CDRpc: { inputtype: "text", value:"30" },
			MissilesInDef: { inputtype: "radio", value:["yes|"+LANG.Options.Yes, "no|"+LANG.Options.No] },
		},
		Galaxie: {
			ColorSpy: { inputtype: "text", value:"#808080" },
			ColorAlliance: { inputtype: "text", value:"", rem: LANG.Options.Galaxie.ColorAllianceRem, size: "100%" },
			ColorFriends: { inputtype: "text", value:"" },
		},
		Alliance: {
			MiniChat: { inputtype: "textarea", value:"", size: "100%" },
		}
	};
	for(var opt in OptionsList)
	{
		for(var key in OptionsList[opt])
		{
			if(typeof(gmfile.option[opt+'_'+key])=="undefined")
			{
				if(typeof(OptionsList[opt][key].value)=="object")
				{
					var val = OptionsList[opt][key].value[0];
					if(val.indexOf('|')>=0)val = OptionsList[opt][key].value[0].split('|')[0];
					gmfile.option[opt+'_'+key] = val;
				}
				else
					gmfile.option[opt+'_'+key] = OptionsList[opt][key].value;
			}
		}
	}
	// on réccupère la liste d'amis
	if(typeof(gmfile.option.ListeAmis)=="undefined")
	{
		gmfile.option['ListeAmis'] = {};
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: document.location.href.split('?')[0]+'?page=buddies&session='+UserSession,
		    onload: function(reponse) {
		        var html = reponse.responseText;
		        ReadFriends(html);
		    }
		});
	}
	Save();
}
// suppression du fichier
function Reset()
{
	GM_deleteValue(RTfile);
	delete gmfile;
	gmfile=false;
	InitFile();
	Options();
}
// sauvegarder l'objet dans le fichier
function Save()
{
	GM_setValue(RTfile,JSON.stringify(gmfile));
}
// variables de langue
function SelectLanguage(langue)
{
	switch(langue)
	{
		case "English":
			var LANG = {
				Text: {
					Ressources: "Resources on", // must be the same in spy report !!
					Attaquer: "Attack", // must be the same in fleet movement page !!
				},
				Menu: {
					Espionnage: "Spying",
					Options: "Options",
					General: "General",
					Galaxie: "Galaxy",
					Alliance: "Alliance",
				},
				Show: {
					Rapport: "View report",
					Defenses: "Defense",
					Flottes: "Fleet",
					Coordonnees: "Position",
					Spy: "Spy",
					Pillage: "Plunder",
					DetailsFleet: "Fleet information",
					DetailsDef: "Defense information",
					DetailsCDR: "Debris fields",
					DetailsRes: "Resources information",
					CDR: "DF",
					Metal: "Metal",
					Cristal: "Cristal",
					Deuterium: "Deuterium",
					Chrono: "Date",
					Delete: "Delete",
					Attaquer: "Attack",
					Attaque24H: "Attack in 24H",
					RapportDelete: "Report deleted",
					MaxAttaque: "You have already attack this planet in 24H",
				},
				Fleet: { // must be the same in spy report !!
					am204: "Light Fighter",
					am205: "Heavy Fighter",
					am206: "Cruiser",
					am207: "Battleship",
					am202: "Small Cargo",
					am203: "Large Cargo",
					am208: "Colony Ship",
					am215: "Battlecruiser",
					am211: "Bomber",
					am213: "Destroyer",
					am214: "Deathstar",
					am209: "Recycler",
					am210: "Espionage Probe",
					am212: "Solar Satellite"
				},
				Def: { // must be the same in spy report !!
					am401: "Rocket Launcher",
					am402: "Light Laser",
					am403: "Heavy Laser",
					am404: "Gauss Cannon",
					am405: "Ion Cannon",
					am406: "Plasma Turret",
					am407: "Small Shield Dome",
					am408: "Large Shield Dome",
					am502: "Anti-Ballistic Missile",
					am503: "Interplanetary Missile"
				},
				Alliance: {
					MiniChat: "Mini-Chat",
				},
				Options: {
					General: {
						Language: "Language",
						ReplyCirculaire: "Reply to circular messages",
						HideHeaders: "Hide header picture",
					},
					Espionnage: {
						ColorAttaque: "Color : Attacking",
						ColorInactif: "Color : Inactive player",
						PillageMin: "Minimum plunder",
						PillageMinWithCDR: "Add DF in minimum plunder",
						Max24HProtect: "Protect of attacks in 24H",
						AutoTransporteur: "Select cargo number",
						AutoTransporteurFirst: "Type of fovorite cargo",
						TypeDate: "Date display",
						FleetView: "Fleet display",
						DefView: "Defense display",
						Points: "Points",
						Nombre: "Nunber",
						Chrono: "Chrono",
						Dates: "Date",
						MaxTime: "Deleter reports after",
						CDRpc: "Pourcentage of DF",
						MissilesInDef: "Include IPM/ABM in defense",
					},
					Galaxie: {
						ColorSpy: "Color : Planet already spied",
						ColorAlliance: "Color : Player of the alliance",
						ColorAllianceRem: "exemple: TAG=#color, TAG2=#color,...",
						ColorFriends: "Color : Player in my friends list",
					},
					Alliance: {
						MiniChat: "Mini-Chat : Source code",
					},
					Langue: "Language",
					Reset: "Reset",
					ResetConfirm: "Would yoi like delete all data ?",
					SaveButton: "Save",
					Save: "Options save",
					Jours: "Days",
					Heures: "Hours",
					Minutes: "Minutes",
					Yes: "Yes",
					No: "No",
				},
				Message: {
					Send: "Send",
					Character: "Characters",
					Reply: "reply",
					Response: "Response",
				}
			};
			break;
			
		default:
			var LANG = {
				Text: {
					Ressources: "Ressources sur", // doit être identique au rapport d'espionnage !!
					Attaquer: "Attaquer", // doit être identique aux mouvements de flottes !!
				},
				Menu: {
					Espionnage: "Espionnage",
					Options: "Options",
					General: "Général",
					Galaxie: "Galaxie",
					Alliance: "Alliance",
				},
				Show: {
					Rapport: "Afficher le rapport",
					Defenses: "Défense",
					Flottes: "Flotte",
					Coordonnees: "Position",
					Spy: "Espionner",
					Pillage: "Pillage",
					DetailsFleet: "Détails de le flotte",
					DetailsDef: "Détails de la défense",
					DetailsCDR: "Champ de ruines",
					DetailsRes: "Détails des ressources",
					CDR: "CDR",
					Metal: "Métal",
					Cristal: "Cristal",
					Deuterium: "Deutérium",
					Chrono: "Date",
					Delete: "Supprimer",
					Attaquer: "Attaquer",
					Attaque24H: "Attaques en 24H",
					RapportDelete: "Rapport effacé",
					MaxAttaque: "Vous avez déjà attaqué 6 fois cette planète en 24H",
				},
				Fleet: { // doit être identique aux rapports d'espionnage !!
					am204: "Chasseur léger",
					am205: "Chasseur lourd",
					am206: "Croiseur",
					am207: "Vaisseau de bataille",
					am202: "Petit transporteur",
					am203: "Grand transporteur",
					am208: "Vaisseau de colonisation",
					am215: "Traqueur",
					am211: "Bombardier",
					am213: "Destructeur",
					am214: "Étoile de la mort",
					am209: "Recycleur",
					am210: "Sonde d`espionnage",
					am212: "Satellite solaire"
				},
				Def: { // doit être identique aux rapports d'espionnage !!
					am401: "Lanceur de missiles",
					am402: "Artillerie laser légère",
					am403: "Artillerie laser lourde",
					am404: "Canon de Gauss",
					am405: "Artillerie à ions",
					am406: "Lanceur de plasma",
					am407: "Petit bouclier",
					am408: "Grand bouclier",
					am502: "Missile d`interception",
					am503: "Missile Interplanétaire"
				},
				Alliance: {
					MiniChat: "Mini-Chat",
				},
				Options: {
					General: {
						Language: "Langue",
						ReplyCirculaire: "Réponse messages circulaire",
						HideHeaders: "Masquer les images d'en-tête",
					},
					Espionnage: {
						ColorAttaque: "Couleur : Attaque en cours",
						ColorInactif: "Couleur : Joueur inactif",
						PillageMin: "Pillage minimum",
						PillageMinWithCDR: "Compter le CDR dans le pillage minimum",
						Max24HProtect: "Protection du nombre d'attaques en 24H",
						AutoTransporteur: "Sélectionner le nombre de transporteurs",
						AutoTransporteurFirst: "Type de transpoteur préféré",
						TypeDate: "Affichage de la date",
						FleetView: "Affichage de la flotte",
						DefView: "Affichage de la défense",
						Points: "Points",
						Nombre: "Nombre",
						Chrono: "Chrono",
						Dates: "Date",
						MaxTime: "Supprimer les rapports après",
						CDRpc: "Pourcentage du CDR",
						MissilesInDef: "Compter les MIP/MInt dans la défense",
					},
					Galaxie: {
						ColorSpy: "Couleur : Planète déjà espionné",
						ColorAlliance: "Couleur : Joueur de l'alliance",
						ColorAllianceRem: "exemple: TAG=#coleur, TAG2=#coleur,...",
						ColorFriends: "Couleur : Joueur dans ma liste d'amis",
					},
					Alliance: {
						MiniChat: "Mini-Chat : Code source",
					},
					Langue: "Langue",
					Reset: "Reset",
					ResetConfirm: "Voulez-vous vraiment supprimer toutes les données ?",
					SaveButton: "Sauvegarder",
					Save: "Options sauvegardées",
					Jours: "Jours",
					Heures: "Heures",
					Minutes: "Minutes",
					Yes: "Oui",
					No: "Non",
				},
				Message: {
					Send: "Envoyer",
					Character: "Caractères",
					Reply: "répondre",
					Response: "Réponse",
				}
			};
	}
	return LANG;
}





// si on est dans la liste d'amis
if(document.location.href.search('page=buddies')>=0)
{
	delete gmfile.option['ListeAmis'];
	gmfile.option['ListeAmis'] = {};
	ReadFriends(document.getElementById('buddylist').innerHTML);
}
// si on affiche un message
else if(document.location.href.search("page=showmessage")>=0)
{
	// si c'est un rapport d'espionnage
	if(typeof(document.getElementById('messagebox').getElementsByClassName('material spy')[0])!="undefined")
	{
		var url = location.search.substring(1).split('&');
		var IdRapport='';
		for(var i=0; i<url.length; i++)
		{
			var parametre = url[i].split('=');
			if(parametre[0]=='msg_id')
				IdRapport=parametre[1];
		}
		ReadRapport(document.getElementById("messagebox"),IdRapport);
	}
	// si c'est un message circulaire
	else if(typeof(document.getElementById('messagebox').getElementsByClassName('playerName')[0])!="undefined" && document.getElementById('messagebox').getElementsByClassName('playerName')[0].innerHTML.indexOf('[')>=0)
	{
		if(gmfile.option['General_ReplyCirculaire']=="yes") ReplyCirculaire();
	}
}
// si on est sur une page du jeu
else if(document.getElementById("menuTable"))
{	
	// liste des éléments Ogame
	var OgameMenu = document.getElementById("menuTable");
	var OgamePage = document.getElementById("contentWrapper");
	
	// on ajoute le script dans le menu
	var ScriptMenu = document.createElement("li");
	ScriptMenu.innerHTML = '<span class="menu_icon"><img src="http://gf1.geo.gfsrv.net/cdn70/fca390c937463b33442bcb7b255d1f.gif" height="29" width="38"></span>';
	ScriptMenu.innerHTML += '<a id="CTButton" class="menubutton" href="#" onclick="return false" target="_self"><span class="textlabel">Cyber-Tools</span></a>';
	OgameMenu.appendChild(ScriptMenu);
	
	// récupère les paramètres de l'url
	var url = location.search.substring(1).split('&');
	var ScriptAction='';
	for(var i=0; i<url.length; i++)	{
		var parametre = url[i].split('=');
		if(parametre[0]=='CyberTools')
			ScriptAction=parametre[1];
		else if(parametre[0]=="RapportId")
			var RapportId = parametre[1];
	}
	
	// sinon on vérifie si on est sur la page des message
	if(document.location.href.search("page=messages")>=0)
	{
		ScanMessages();
		
		// si le joueur a un compte commandant
		var url = location.href;
		function safeWrap(f) { return function() { setTimeout.apply(window, [f, 0].concat([].slice.call(arguments))); }; }
		unsafeWindow.$(".mailWrapper").ajaxSuccess(safeWrap(function(e,xhr,settings){
			if(settings.url.indexOf("page=messages")==-1) return;
			if(settings.data.indexOf("displayPage")==-1) return; 
			var cat = settings.data.replace(/^.*displayCategory=([\d-]*).*$/,"$1");
			switch(cat) {
				// onglets : 7 espionner , 5 combat , 6 joueur , 8 expé , 2 alli, 4 divers
				case "7":	ReadMessage();
							break;
			}
		}));
	}
	// si on est sur la page des mouvements de flottes
	else if(document.location.href.search("page=movement")>=0)
	{
		ScanMouvements();
	}
	//si on est sur la page de la galaxie
	else if(document.location.href.search("page=galaxy")>=0)
	{
		function safeWrap(f)
		{
			return function()
			{
				setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
			};
		}
		unsafeWindow.$("#galaxyContent").ajaxSuccess(safeWrap(function(e,xhr,settings)
		{
			if(settings.url.indexOf("page=galaxyContent")>=0 && document.getElementById('galaxytable'))
			{
				var reg=new RegExp(":", "g");
				for(var i=0 ; i<document.getElementById('galaxytable').getElementsByTagName('tr').length ; i++)
				{
					var color = '';
					if(document.getElementById('galaxytable').getElementsByTagName('tr')[i].getElementsByClassName('ListImage')[0])
					{
						var pos = document.getElementById('galaxytable').getElementsByTagName('tr')[i].getElementsByClassName('ListImage')[0].getElementsByTagName('li')[0].getElementsByTagName('span')[0].innerHTML.replace('[','').replace(']','').replace(reg, '_');
						if(pos+'_1' in gmfile.rapports || pos+'_3' in gmfile.rapports)
						{
							var color = gmfile.option['Galaxie_ColorSpy'];
						}
					}
					if(document.getElementById('galaxytable').getElementsByTagName('tr')[i].getElementsByClassName('allytagwrapper')[0])
					{
						var alli = document.getElementById('galaxytable').getElementsByTagName('tr')[i].getElementsByClassName('allytagwrapper')[0].innerHTML.split('<div')[0];
						var list = gmfile.option['Galaxie_ColorAlliance'].split(',');
						for(var x=0; x<list.length; x++)
						{
							if(alli==list[x].split('=')[0].replace(' ','')) 
							{
								var color = list[x].split('=')[1];
								break;
							}
						}
					}
					if(document.getElementById('galaxytable').getElementsByTagName('tr')[i].getElementsByClassName('playername')[0])
					{
						var joueur = document.getElementById('galaxytable').getElementsByTagName('tr')[i].getElementsByClassName('playername')[0].getElementsByTagName('span')[0].innerHTML;
						if(typeof(gmfile.option['ListeAmis'][joueur])!="undefined") color = gmfile.option['Galaxie_ColorFriends'];
					}
					
					document.getElementById('galaxytable').getElementsByTagName('tr')[i].style.backgroundColor = color;
				}
			}
		}));
	}
	
	// on vérifie si on clic sur le bouton du script
	document.getElementById("CTButton").addEventListener('click', function(){ ShowEspionnage();	}, false);
	
	// si on a ajouté une url au mini-chat, on l'affiche
	if(gmfile.option['Alliance_MiniChat']!='' && document.location.href.search("page=galaxy")<0) MiniChat();
	
	// si on doit masquer les en-têtes
	if(gmfile.option['General_HideHeaders']=="yes")
	{
		function Hide()
		{
			if(document.getElementsByClassName('fleetStatus')[0]) document.getElementsByClassName('fleetStatus')[0].style.marginTop = (parseInt(document.getElementById('planet').offsetHeight)*(-1))+'px';
			else if(document.getElementById('buttonz')) document.getElementById('buttonz').style.marginTop = (parseInt(document.getElementById('planet').offsetHeight)*(-1))+'px';
			else if(document.getElementById('content')) document.getElementById('content').style.marginTop = (parseInt(document.getElementById('planet').offsetHeight)*(-1))+'px';
			else if(document.getElementById('tabs')) document.getElementById('tabs').style.marginTop = (parseInt(document.getElementById('planet').offsetHeight)*(-1))+'px';
			document.getElementById('planet').style.visibility = "hidden";
			document.getElementsByClassName('c-left')[0].style.visibility = "hidden";
			document.getElementsByClassName('c-right')[0].style.visibility = "hidden";
			document.getElementById('planet').style.background = "";
			document.getElementById('planet').getElementsByTagName('h2')[0].style.visibility = "hidden";
			if(document.getElementById('slot01')) document.getElementById('slot01').style.visibility = "hidden";
		}
		function Show()
		{
			document.getElementById('buttonz').style.marginTop = "";
			document.getElementById('planet').style.visibility = "visible";
		}
		if(document.getElementById('planet') && document.location.href.search("page=overview")<0) 
		{
			if(document.getElementById('slot01'))
			{
				document.getElementById('buttonz').getElementsByTagName('h2')[0].innerHTML += '<div id="planet" style="float:right; height:auto; font-weight:normal;"><div id="slot01" class="slot" style="margin:-291px 10px 0 0;">'+document.getElementById('slot01').innerHTML+'</div></div>';
			}
			Hide();
		}
		
		// on vérifie si on doit afficher les détails d'une construction
		if(document.getElementById('buttonz'))
		{
			var button = document.getElementById('buttonz').getElementsByTagName('li');
			for(var i=0; i<button.length; i++)
			{
				button[i].addEventListener('click', function(){ 
					if(document.getElementById('detail') && document.getElementById('planet').style.visibility=="hidden")
						Show();
					else if(document.getElementById('detail') && document.getElementById('detail').childNodes.length>1)
						Hide();
				}, false);
			}
		}
	}
}





// mise en page des onglets
function Tabs(nom)
{
	var tab = document.getElementById("CTMenuTabs").getElementsByTagName("li");
	for(var i=0; i<tab.length; i++)
	{
		if(tab[i].getElementsByTagName("a")[0].innerHTML==nom)
		{
			tab[i].className = "aktiv";
			tab[i].getElementsByTagName("a")[0].style.color = "#FFFFFF";
		}
		else
		{
			tab[i].className = "";
			tab[i].getElementsByTagName("a")[0].style.color = "";
		}
	}
}





// mise en page
function Page(html)
{
	var page = '<div id="messages">';
		page += '<div id="netz">';
			page += '<div id="inhalt">';
				page += '<div id="tabs">';
					page += '<ul class="tabsbelow" id="CTMenuTabs">';
					page += '<li><div style="width:150px; height:23px;"><span style="display:block; font-weight:700; padding-top:3px;"><a href="#" id="CTButtonEspionnage">'+LANG.Menu.Espionnage+'</a></span></div></li>';
					page += '<li><div style="width:150px; height:23px;"><span style="display:block; font-weight:700; padding-top:3px;"><a href="#" id="CTButtonOptions">'+LANG.Menu.Options+'</a></span></div></li>';
					page += '</ul>';
				page += '</div>';
				page += '<div class="clearfloat"></div>';
				page += '<div id="eins">';
					page += html;
				page += '</div>';
				page += '<div class="new_footer"></div>';
			page += '</div>';
		page += '</div>';
	page += '</div>';
	
	OgamePage.innerHTML = page;	

	// pour ne pas rafraichir la page
	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.setAttribute("language","javascript");
	script.text = 'function reload_page() {' +
	'}';
	document.body.appendChild(script);
	
	document.getElementById("CTButtonEspionnage").addEventListener('click', function(){ ShowEspionnage(); }, false);
	document.getElementById("CTButtonOptions").addEventListener('click', function(){ Options(); }, false);
	if(document.getElementById("CTButtonReset"))document.getElementById("CTButtonReset").addEventListener('click', function(){ if(confirm(LANG.Options.ResetConfirm)){ Reset(); } }, false);
	
	var menu = document.getElementById("menuTable").getElementsByTagName('li');
	for(i=0; i<menu.length; i++)
	{
		if(menu[i].getElementsByClassName('selected')[0])
		{
			menu[i].getElementsByClassName('selected')[0].className = "menubutton";
			menu[i].getElementsByTagName('img')[0].src = menu[i].getElementsByTagName('img')[0].src.replace('_b.gif','_a.gif');
			break;
		}
	}
	document.getElementById('CTButton').className = "menubutton selected";
}
function popup(message, failed, temps)
{
	var $; 
	try { $ = unsafeWindow.$; } 
	catch(e) { $ = window.$; } 
	var unsafe = window;
	try {unsafe = unsafeWindow} catch (e) {}
	unsafe.tb_remove();
	if(failed) {
		$("#fadeBoxStyle").attr("class", "failed");
	} else {
		$("#fadeBoxStyle").attr("class", "success");
	}
	if(temps==null)temps = 1000;
	$("#fadeBoxContent").html(message);
	$("#fadeBox").stop(false, true).show();
	setTimeout(function(){$("#fadeBox").fadeOut(1000);},temps);
}





// page des options
function Options()
{
	// affichage de la liste
	var Form={}, key='', opt='';
	for(opt in OptionsList)
	{
		Form[opt]='';
		for(key in OptionsList[opt])
		{
			if(OptionsList[opt][key].inputtype=="text")
			{
				var champ = '<input type="text" name="CTOptions_'+opt+'_'+key+'" id="CTOptions_'+opt+'_'+key+'" value="'+gmfile.option[opt+'_'+key]+'"';
				if(typeof(OptionsList[opt][key].size)!="undefined") champ += ' style="width:'+OptionsList[opt][key].size+';"';
				champ += ' />';
			}
			else if(OptionsList[opt][key].inputtype=="radio")
			{
				var champ = '';
				for(var i=0; i<OptionsList[opt][key].value.length; i++)
				{
					var value = OptionsList[opt][key].value[i];
					var text = OptionsList[opt][key].value[i];
					if(OptionsList[opt][key].value[i].indexOf('|')>=0)
					{
						value = OptionsList[opt][key].value[i].split("|")[0];
						text = OptionsList[opt][key].value[i].split("|")[1];
					}
					champ += '<input type="radio" name="CTOptions_'+opt+'_'+key+'" id="CTOptions_'+opt+'_'+key+'" value="'+value+'"';
					if(gmfile.option[opt+'_'+key]==value) champ += ' checked="checked"';
					champ += ' /><label style="padding:0 20px 0 5px;">'+text+'</label>';
				}
			}
			else if(OptionsList[opt][key].inputtype=="select")
			{
				var champ = '';
				for(var i=0; i<OptionsList[opt][key].value.length; i++)
				{
					var value = OptionsList[opt][key].value[i];
					var text = '';
					var attr = opt+'_'+key;
					if(OptionsList[opt][key].value[i].indexOf('|')>=0)
					{
						value = OptionsList[opt][key].value[i].split("|")[0];
						text = OptionsList[opt][key].value[i].split("|")[1];
						attr += '_'+text
					}
					
					champ += '<select name="CTOptions_'+attr+'" id="CTOptions_'+attr+'">';
					if(value.search("->")>=0)
					{
						for(var x=value.split("->")[0]; x<=value.split("->")[1]; x++)
						{
							champ += '<option value="'+x+'"';
							if(gmfile.option[attr]==x) champ += ' selected="selected"';
							champ += ' style="padding-right:5px;">'+x+'</option>';
						}
					}
					else
					{
						var val = value.split(",");
						for(var x=0; x<val.length; x++)
						{
							champ += '<option value="'+val[x]+'"';
							if(gmfile.option[attr]==val[x]) champ += ' selected="selected"';
							champ += ' style="padding-right:5px;">'+val[x]+'</option>';
						}
					}
					champ += '</select><label style="padding:0 20px 0 5px;">'+text+'</label>';
				}
			}
			else if(OptionsList[opt][key].inputtype=="textarea")
			{
				var champ = '<textarea name="CTOptions_'+opt+'_'+key+'" id="CTOptions_'+opt+'_'+key+'"';
				if(typeof(OptionsList[opt][key].size)!="undefined") champ += ' style="width:'+OptionsList[opt][key].size+';"';
				champ += '>'+gmfile.option[opt+'_'+key]+'</textarea>';
			}
			
			if(typeof(OptionsList[opt][key].rem)!="undefined")
			{
				champ += ' <span style="font-size:10px;">'+OptionsList[opt][key].rem+'</span>';
			}
			
			Form[opt] += '<tr>';
			Form[opt] += '<td width="50%">'+LANG.Options[opt][key]+'</td><td>'+champ+'</td>';
			Form[opt] += '</tr>';
		}
	}
	var ScriptOptions = '<form id="CTOptions" name="CTOptions">';
	var key='';
	for(key in Form)
	{
		ScriptOptions += '<div class="section"><h3><a href="#"><span>'+LANG.Menu[key]+'</span></a></h3></div>';
		ScriptOptions += '<div class="sectioncontent" style="display:block;">';
			ScriptOptions += '<div class="contentz"><table border="0" cellspacing="0" cellpadding="0" class="bborder" style="width:95%; cursor:default; border:0px;">'+Form[key]+'</table></div>';
			ScriptOptions += '<div class="footer"></div>';
		ScriptOptions += '</div>';
	}
	ScriptOptions += '<div id="showSpyReportsNow" style="border:0px;">';
		ScriptOptions += '<input id="CTOptionsSave" type="button" class="buttonSave" style="color:#FFFFFF" value="'+LANG.Options.SaveButton+'" />';
		ScriptOptions += '<a href="#" id="CTButtonReset" style="margin-left:10px;"><input type="button" class="buttonSave" style="color:#FFFFFF" value="'+LANG.Options.Reset+'" /></a>';
	ScriptOptions += '</div>';
	ScriptOptions += '</form>';
	Page(ScriptOptions);
	Tabs(LANG.Menu.Options);
	
	// sauvegarde des otions
	document.getElementById("CTOptionsSave").addEventListener('click', function(){ 
		var formulaire = document.getElementById('CTOptions');
		for(var i=0; i<formulaire.elements.length; i++)
		{
			if(formulaire.elements[i].type=="text" || formulaire.elements[i].type=="textarea")
				gmfile['option'][formulaire.elements[i].id.replace("CTOptions_","")] = formulaire.elements[i].value;
			else if(formulaire.elements[i].type=="radio" && formulaire.elements[i].checked)
				gmfile['option'][formulaire.elements[i].id.replace("CTOptions_","")] = formulaire.elements[i].value;
			else if(formulaire.elements[i].type.search("select")>=0)
				gmfile['option'][formulaire.elements[i].id.replace("CTOptions_","")] = formulaire.elements[i].options[formulaire.elements[i].selectedIndex].value;
		}
		
		// on vérifie l'intégrité des champs
		gmfile.option['Espionnage_PillageMin'] = intval(gmfile.option['Espionnage_PillageMin']);
		gmfile.option['Espionnage_MaxTime_'+LANG.Options.Jours] = intval(gmfile.option['Espionnage_MaxTime_'+LANG.Options.Jours]);
		gmfile.option['Espionnage_MaxTime_'+LANG.Options.Heures] = intval(gmfile.option['Espionnage_MaxTime_'+LANG.Options.Heures]);
		gmfile.option['Espionnage_MaxTime_'+LANG.Options.Minutes] = intval(gmfile.option['Espionnage_MaxTime_'+LANG.Options.Minutes]);
		gmfile.option['Espionnage_FleetPC'] = intval(gmfile.option['Espionnage_FleetPC']);
		
		Save();
		popup(LANG.Options.Save);
	}, false);
}





// on vérifie la liste d'amis
function ReadFriends(html)
{
    for(var i=1; i<html.split('</tr>').length-1; i++)
    {
    	var nom = html.split('</tr>')[i].split('<td><span style="float: left">')[1].split('</span>')[0];
    	gmfile.option['ListeAmis'][nom] = '1';
    }
	Save();
}





// suppression d'un rapport dans la liste
function DeleteRapport(id)
{
	delete gmfile.rapports[id];
	Save();
	popup(LANG.Show.RapportDelete);
	ShowEspionnage();
}





// affichage des rapports enregistrés
function ShowEspionnage(tab)
{
	// on réouvre le fichier pour si de nouveaux rapports on été enregistés
	gmfile = GM_getValue(RTfile, false);
	InitFile();
	
	var Galaxy = {1:'',2:'',3:'',4:'',5:'',6:'',7:'',8:'',9:''};
	var key = '';
	var retour = true;
	
	// lecture des rapports enregistres
	if(tab==null)
	{
		retour=false;
		SortEspionnage('CTButtonSortChrono_0');
		tab = gmfile.rapports;
	}
	for(key in tab)
	{
		var rapport = {};
		rapport = tab[key];
		var visible = 1;
		
		var timenow = new Date();
		var timerapport = new Date();
		timerapport.setFullYear(rapport.infos.date.substr(0,4));
		timerapport.setMonth(rapport.infos.date.substr(5,2)-1);
		timerapport.setDate(rapport.infos.date.substr(8,2));
		timerapport.setHours(rapport.infos.date.substr(11,2));
		timerapport.setMinutes(rapport.infos.date.substr(14,2));
		timerapport.setSeconds(rapport.infos.date.substr(17,2));
		timerapport.setMilliseconds(0);
		var diff = Math.floor((timenow.getTime()-timerapport.getTime())/1000);
		var times = (intval(gmfile.option['Espionnage_MaxTime_'+LANG.Options.Jours])*86400)+(intval(gmfile.option['Espionnage_MaxTime_'+LANG.Options.Heures])*3600)+(intval(gmfile.option['Espionnage_MaxTime_'+LANG.Options.Minutes])*60);
		
		// si le rapport est trop ancien ou que le pillage ne suffit pas on ne l'affiche pas
		var pillage = Math.floor((parseInt(rapport.ressources.metal) + parseInt(rapport.ressources.cristal) + parseInt(rapport.ressources.deuterium)) / 2);
		var nbmetal=0;
		var nbcristal=0;
		for(var keyy in rapport.flottes)
		{
			if(typeof(Cost[keyy])!="undefined")
			{
				nbmetal += ((Cost[keyy].Metal/100)*gmfile.option['Espionnage_CDRpc'])*rapport.flottes[keyy].nbr;
				nbcristal += ((Cost[keyy].Cristal/100)*gmfile.option['Espionnage_CDRpc'])*rapport.flottes[keyy].nbr;
			}
		}
		if(gmfile.option['Espionnage_PillageMinWithCDR']=="yes") pillage += (nbmetal+nbcristal);
		if((diff > times && times > 0) || (pillage < gmfile.option['Espionnage_PillageMin']))
		{
			visible = 0;
		}
		
		// si on n'a pas masqué le rapport 
		if(visible==1)
		{
			// on vérifie si on doit mettre de la couleur
			var color = '';
			if(typeof(gmfile.attaques[key])!="undefined")
			{
				var key2 = '';
				for(key2 in gmfile.attaques[key])
				{
					if(gmfile.attaques[key][key2].retour > timenow.getTime()) color = gmfile.option['Espionnage_ColorAttaque'];
				}
			}
			else if(rapport.infos.inactif==1)
			{
				color = gmfile.option['Espionnage_ColorInactif'];
			}
			
			var html = '<tr class="alt">';
			
			// colone date
			if(gmfile.option['Espionnage_TypeDate']=="chrono")
			{
				var j = Math.floor(diff/86400);
				diff -= (j*86400);
				var h = Math.floor(diff/3600);
				diff -= (h*3600);
				var m = Math.floor(diff/60);
				diff -= (m*60);
				html += '<td style="border-right:1px #619FC8 solid; text-align:center; padding:0px;';
				if(color!='')
				{
					html += ' color:'+color+';';
				}
				html += '" valign="middle" height="30">'+j+'j '+h+'h '+m+'m '+diff+'s</td>';
			}
			else
			{
				html += '<td style="border-right:1px #619FC8 solid; text-align:center; padding:0px;';
				if(color!='')
				{
					html += ' color:'+color+';';
				}
				html += '" valign="middle" height="30">'+rapport.infos.date+'</td>';
			}
			// colone coordonnées
			var link_coordonnees = '<a onclick="self.parent.tb_remove();" target="_parent" href="javascript:showGalaxy('+rapport.infos.coordonnees.split(':')[0]+','+rapport.infos.coordonnees.split(':')[1]+','+rapport.infos.coordonnees.split(':')[2]+')" class="tipsStandard" title="'+rapport.infos.joueur+': '+rapport.infos.planete+'">['+rapport.infos.coordonnees+']</a>';
			if(intval(key.split('_')[3])==3) link_coordonnees += ' M';
			html += '<td style="border-right:1px #619FC8 solid; text-align:center; padding:0px;" valign="middle" height="30">'+link_coordonnees+'</td>';
			
			// colone flottes
			var div = '<div id="fleet_'+key+'" style="display:none; position:absolute; margin-left:70px; z-index:9999;"><div class="TTInner" id="TTWrapper">';
				div += '<h4><span class="spacing">'+LANG.Show.DetailsFleet+'</span></h4>';
				div += '<div class="body" style="color:#FFFFFF;">';
					div += '<ul style="float:left; margin-left:15px;">';
					for(var keyy in rapport.flottes)
					{
						div += '<li>'+rapport.flottes[keyy].nom+'</li>';
					}
					div += '</ul>';
					div += '<ul style="float:right; margin-right:15px;">';
					var nbfleet=0;
					for(var keyy in rapport.flottes)
					{
						div += '<li style="text-align:right;">'+number_format(rapport.flottes[keyy].nbr,0,'','.')+'</li>';
						nbfleet += parseInt(rapport.flottes[keyy].nbr);
					}
					div += '</ul>';
					div += '<br class="clearfloat">';
				div += '</div>';
				div += '<span style="display:block;" class="footer"></span>';
			div += '</div></div>';
			html += '<td style="border-right:1px #619FC8 solid; text-align:center; padding:0px;';
			if(color!='')
			{
				html += ' color:'+color+';';
			}
			html += '" valign="middle" height="30">'+div+'<span';
			if(sizeof(rapport.flottes)>0)
				html += ' style="cursor:help;" onmouseover="document.getElementById(\'fleet_'+key+'\').style.display=\'block\';" onmouseout="document.getElementById(\'fleet_'+key+'\').style.display=\'none\';"';
			html += '>'+number_format(nbfleet,0,'','.')+'</span></td>';
			
			// colone defenses
			var div = '<div id="def_'+key+'" style="display:none; position:absolute; margin-left:70px; z-index:9999;"><div class="TTInner" id="TTWrapper">';
				div += '<h4><span class="spacing">'+LANG.Show.DetailsDef+'</span></h4>';
				div += '<div class="body" style="color:#FFFFFF;">';
					div += '<ul style="float:left; margin-left:15px;">';
					for(var keyy in rapport.defenses)
					{
						div += '<li>'+rapport.defenses[keyy].nom+'</li>';
					}
					div += '</ul>';
					div += '<ul style="float:right; margin-right:15px;">';
					var nbdef=0;
					for(var keyy in rapport.defenses)
					{
						div += '<li style="text-align:right;">'+number_format(rapport.defenses[keyy].nbr,0,'','.')+'</li>';
						if((keyy!="am502" && keyy!="am503" && gmfile.option['Espionnage_MissilesInDef']=="no") || gmfile.option['Espionnage_MissilesInDef']=="yes")
							nbdef += parseInt(rapport.defenses[keyy].nbr);
					}
					div += '</ul>';
					div += '<br class="clearfloat">';
				div += '</div>';
				div += '<span style="display:block;" class="footer"></span>';
			div += '</div></div>';
			html += '<td style="border-right:1px #619FC8 solid; text-align:center; padding:0px;';
			if(color!='')
			{
				html += ' color:'+color+';';
			}
			html += '" valign="middle" height="30">'+div+'<span';
			if(sizeof(rapport.defenses)>0)
				html += ' style="cursor:help;" onmouseover="document.getElementById(\'def_'+key+'\').style.display=\'block\';" onmouseout="document.getElementById(\'def_'+key+'\').style.display=\'none\';"';
			html += '>'+number_format(nbdef,0,'','.')+'</span></td>';
			
			// colone pillage
			var resmetal = Math.floor(rapport.ressources.metal/2);
			var rescristal = Math.floor(rapport.ressources.cristal/2);
			var resdeut = Math.floor(rapport.ressources.deuterium/2);
			var ressources = resmetal+rescristal+resdeut;
			var div = '<div id="res_'+key+'" style="display:none; position:absolute; margin-left:90px; z-index:9999;"><div class="TTInner" id="TTWrapper">';
				div += '<h4><span class="spacing">'+LANG.Show.DetailsRes+'</span></h4>';
				div += '<div class="body" style="color:#FFFFFF;">';
					div += '<ul style="float:left; margin-left:15px;">';
						div += '<li>'+LANG.Show.Metal+'</li>';
						div += '<li>'+LANG.Show.Cristal+'</li>';
						div += '<li>'+LANG.Show.Deuterium+'</li>';
					div += '</ul>';
					div += '<ul style="float:right; margin-right:15px;">';
						div += '<li style="text-align:right;">'+number_format(resmetal,0,'','.')+'</li>';
						div += '<li style="text-align:right;">'+number_format(rescristal,0,'','.')+'</li>';
						div += '<li style="text-align:right;">'+number_format(resdeut,0,'','.')+'</li>';
					div += '</ul>';
					div += '<br class="clearfloat">';
				div += '</div>';
				div += '<span style="display:block;" class="footer"></span>';
			div += '</div></div>';
			html += '<td style="border-right:1px #619FC8 solid; text-align:center; padding:0px;';
			if(color!='')
			{
				html += ' color:'+color+';';
			}
			html += '" valign="middle" height="30">'+div;
			if(ressources>0)
				html += '<span style="cursor:help;" onmouseover="document.getElementById(\'res_'+key+'\').style.display=\'block\';" onmouseout="document.getElementById(\'res_'+key+'\').style.display=\'none\';">'+number_format(ressources,0,'','.')+'</span>';
			else
				html += '0';
			html += '</td>';
			
			// colone CRD
			var div = '<div id="CDR_'+key+'" style="display:none; position:absolute; margin-left:60px; z-index:9999;"><div class="TTInner" id="TTWrapper">';
				div += '<h4><span class="spacing">'+LANG.Show.DetailsCDR+'</span></h4>';
				div += '<div class="body" style="color:#FFFFFF;">';
					div += '<ul style="float:left; margin-left:15px;">';
						if(nbmetal > 0) div += '<li>'+LANG.Show.Metal+'</li>';
						if(nbcristal > 0) div += '<li>'+LANG.Show.Cristal+'</li>';
					div += '</ul>';
					div += '<ul style="float:right; margin-right:15px;">';
						if(nbmetal > 0) div += '<li>'+number_format(nbmetal,0,'','.')+'</li>';
						if(nbcristal > 0) div += '<li>'+number_format(nbcristal,0,'','.')+'</li>';
					div += '</ul>';
					div += '<br class="clearfloat">';
					div += LANG.Fleet.am209+': '+Math.ceil((nbmetal+nbcristal)/20000);
				div += '</div>';
				div += '<span style="display:block;" class="footer"></span>';
			div += '</div></div>';
			html += '<td style="border-right:1px #619FC8 solid; text-align:center; padding:0px;" valign="middle" height="30">'+div;
			if(nbmetal+nbcristal>0)
				html += '<img src="http://gf1.geo.gfsrv.net/cdndd/3ca961edd69ea535317329e75b0e13.gif" width="30" height="30" style="cursor:help; margin:0px;" onmouseover="document.getElementById(\'CDR_'+key+'\').style.display=\'block\';" onmouseout="document.getElementById(\'CDR_'+key+'\').style.display=\'none\';" />';
			html += '</td>';
			
			// colone icones
				// afficher le rapport
				var url = 'index.php?page=showmessage&session='+UserSession+'&ajax=1&msg_id='+rapport.infos.id+'&cat=7&height=600&width=770&TB_iframe=1';
				var icons = '<a class="ajax_thickbox tipsStandard" style="margin-left:3px;" id="'+rapport.infos.coordonnees+'" title="'+LANG.Show.Rapport+'" href="'+url+'" onclick="tb_show(\'Afficher le rapport\',\''+url+'\',false); return false"><img src="http://gf1.geo.gfsrv.net/cdn98/41d4162c26d63b52ae9154f0042066.gif" width="16" height="16" style="margin-top:3px;" /></a>';
				// espionner
				icons += '<a class="tipsStandard" style="margin-left:3px;" target="_top" href="index.php?page=galaxy&session='+UserSession+'&galaxy='+key.split('_')[0]+'&system='+key.split('_')[1]+'&position='+key.split('_')[2]+'&planetType='+key.split('_')[3]+'&doScan=1" title="'+LANG.Show.Spy+'"><img src="http://gf1.geo.gfsrv.net/cdn45/f8eacc254f16d0bafb85e1b1972d80.gif" width="16" height="16" style="margin-top:3px;" /></a>';
				// supprimer
				icons += '<a class="tipsStandard" style="margin-left:3px;" href="#" title="'+LANG.Show.Delete+'"><img src="http://gf1.geo.gfsrv.net/cdn99/ebaf268859295cdfe4721d3914bf7e.gif" width="16" height="16" style="margin-top:3px;" class="CTButtonDelete" id="'+key+'" /></a>';
				// attaquer
				var fleetlink = '';
				if(gmfile.option['Espionnage_AutoTransporteur']=="yes")
				{
					if(gmfile.option['Espionnage_AutoTransporteurFirst']=="am203")
						var nbr = Math.ceil(ressources / 25000);
					else
						var nbr = Math.ceil(ressources / 5000);
					fleetlink = '&'+gmfile.option['Espionnage_AutoTransporteurFirst']+'='+nbr;
				}
				icons += '<a class="tipsStandard CTButtonAttaque" id="'+key+'" onclick="return false" style="margin-left:3px;" target="_top" href="index.php?page=fleet1&session='+UserSession+'&galaxy='+key.split('_')[0]+'&system='+key.split('_')[1]+'&position='+key.split('_')[2]+'&type='+key.split('_')[3]+'&amp;mission=1'+fleetlink+'" title="'+LANG.Show.Attaquer+'"><img src="http://gf1.geo.gfsrv.net/cdn73/d324f444e6a74acbe6346b3545061e.gif" width="16" height="16" style="margin-top:3px;" /></a>';
			html += '<td class="actions" valign="middle" height="30" style="padding:0px;">'+icons+'</td>';
			html += '</tr>';
			Galaxy[intval(rapport.infos.coordonnees.split(':')[0])] += html;
		}
	}
	
	// affichage de la liste
	var ScriptTable = '';
	for(var i=1; i<=9; i++)
	{
		if(Galaxy[i]!='')
		{
			if(!retour) ScriptTable += '<div class="section"><h3><a href="#"><span>Galaxie '+i+'</span></a></h3></div>';
			if(!retour) ScriptTable += '<div class="sectioncontent" id="CyberToolsTabG'+i+'" style="display:block;">';
			if(!retour) ScriptTable += '<div class="contentz">';
				if(!retour) ScriptTable += '<div class="h10"></div>';
					if(!retour) ScriptTable += '<table border="0" cellspacing="0" cellpadding="0" class="bborder" style="width:95%; cursor:default;" id="CTEspionnage_'+i+'">';
					ScriptTable += '<tr>';
					ScriptTable += '<td style="text-align:center; color:#6F9FC8; border-bottom:1px #619FC8 solid;" width="140"><span style="cursor:pointer;" id="CTButtonSortChrono_'+i+'">'+LANG.Show.Chrono+'</span></td>';
					ScriptTable += '<td style="text-align:center; color:#6F9FC8; border-bottom:1px #619FC8 solid;" width="90"><span style="cursor:pointer;" id="CTButtonSortCoord_'+i+'">'+LANG.Show.Coordonnees+'</span></td>';
					ScriptTable += '<td style="text-align:center; color:#6F9FC8; border-bottom:1px #619FC8 solid;" width="70"><span style="cursor:pointer;" id="CTButtonSortFlottes_'+i+'">'+LANG.Show.Flottes+'</span></td>';
					ScriptTable += '<td style="text-align:center; color:#6F9FC8; border-bottom:1px #619FC8 solid;" width="70"><span style="cursor:pointer;" id="CTButtonSortDefenses_'+i+'">'+LANG.Show.Defenses+'</span></td>';
					ScriptTable += '<td style="text-align:center; color:#6F9FC8; border-bottom:1px #619FC8 solid;" width="90"><span style="cursor:pointer;" id="CTButtonSortPillage_'+i+'">'+LANG.Show.Pillage+'</span></td>';
					ScriptTable += '<td style="text-align:center; color:#6F9FC8; border-bottom:1px #619FC8 solid;" width="50"><span style="cursor:pointer;" id="CTButtonSortCDR_'+i+'">'+LANG.Show.CDR+'</span></td>';
					ScriptTable += '<td style="text-align:center; color:#6F9FC8; border-bottom:1px #619FC8 solid;">&nbsp;</td>';
					ScriptTable += '</tr>';
					ScriptTable += Galaxy[i];
					if(!retour) ScriptTable += '</table>';
				if(!retour) ScriptTable += '</div>';
				if(!retour) ScriptTable += '<input type="hidden" id="CTSort_'+i+'" value="1" />';
				if(!retour) ScriptTable += '<div class="footer"></div>';
			if(!retour) ScriptTable += '</div>';
		}
	}
	
	if(!retour)
	{
		Page(ScriptTable);
		ButtonEspionnage();
		Tabs(LANG.Menu.Espionnage);
	}
	else
	{
		return ScriptTable;
	}
}




// onclick button espionnage
function ButtonEspionnage()
{
	var button = document.getElementsByClassName("CTButtonDelete");
	for(var i=0; i<button.length; i++)
	{
		button[i].addEventListener('click', function(){ DeleteRapport(this.id) }, false);
	}
	var button = document.getElementsByClassName("CTButtonAttaque");
	for(var i=0; i<button.length; i++) // Max 24H protect
	{
		button[i].addEventListener('click', function(){ 
			if(sizeof(gmfile.attaques[this.id])>=6)
				popup(LANG.Show.MaxAttaque);
			else
				document.location.href = this.getAttribute('href');
		}, false);
	}
	for(var i=1; i<=9; i++)
	{
		if(document.getElementById("CTButtonSortChrono_"+i))
		{
			document.getElementById("CTButtonSortChrono_"+i).addEventListener('click', function(){ SortEspionnage(this.id) }, false);
			document.getElementById("CTButtonSortCoord_"+i).addEventListener('click', function(){ SortEspionnage(this.id) }, false);
			document.getElementById("CTButtonSortFlottes_"+i).addEventListener('click', function(){ SortEspionnage(this.id) }, false);
			document.getElementById("CTButtonSortDefenses_"+i).addEventListener('click', function(){ SortEspionnage(this.id) }, false);
			document.getElementById("CTButtonSortPillage_"+i).addEventListener('click', function(){ SortEspionnage(this.id) }, false);
			document.getElementById("CTButtonSortCDR_"+i).addEventListener('click', function(){ SortEspionnage(this.id) }, false);
		}
	}
}





// trier le tableau d'epsionnage
function SortEspionnage(id)
{
	var temp = new Array();
	var newtab = {};
	var key = '';
	for(key in gmfile.rapports)
	{
		if(key.split('_')[0]==id.split('_')[1] || id.split('_')[1]==0)
		{
			var value=0;
			switch(id.split('_')[0])
			{
				case "CTButtonSortChrono":
					value = intval(gmfile.rapports[key].infos.date);
					break;
				case "CTButtonSortCoord":
					value = intval(gmfile.rapports[key].infos.coordonnees);
					break;
				case "CTButtonSortPillage":
					value = Math.floor((parseInt(gmfile.rapports[key].ressources.metal) + parseInt(gmfile.rapports[key].ressources.cristal) + parseInt(gmfile.rapports[key].ressources.deuterium)) / 2);
					var nbmetal=0;
					var nbcristal=0;
					for(var keyy in gmfile.rapports[key].flottes)
					{
						if(typeof(Cost[keyy])!="undefined")
						{
							nbmetal += ((Cost[keyy].Metal/100)*gmfile.option['Espionnage_CDRpc'])*gmfile.rapports[key].flottes[keyy].nbr;
							nbcristal += ((Cost[keyy].Cristal/100)*gmfile.option['Espionnage_CDRpc'])*gmfile.rapports[key].flottes[keyy].nbr;
						}
					}
					if(gmfile.option['Espionnage_PillageMinWithCDR']=="yes") value += (nbmetal+nbcristal);
					break;
				case "CTButtonSortCDR":
					for(var i in gmfile.rapports[key].flottes)
					{
						value += ((Cost[i].Metal/100)*gmfile.option['Espionnage_CDRpc'])*gmfile.rapports[key].flottes[i].nbr;
						value += ((Cost[i].Cristal/100)*gmfile.option['Espionnage_CDRpc'])*gmfile.rapports[key].flottes[i].nbr;
					}
					break;
				case "CTButtonSortFlottes":
					for(var i in gmfile.rapports[key].flottes)
					{
						value += intval(gmfile.rapports[key].flottes[i].nbr);
					}
					break;
				case "CTButtonSortDefenses":
					for(var i in gmfile.rapports[key].defenses)
					{
						if((i!="am502" && i!="am503" && gmfile.option['Espionnage_MissilesInDef']=="no") || gmfile.option['Espionnage_MissilesInDef']=="yes")
							value += intval(gmfile.rapports[key].defenses[i].nbr);
					}
					break;
			}
			temp[key] = value;
		}
	}
	function sortObj(arr, ordre)
	{
		function sortNumber(a,b)
		{
			return a - b;
		}
		var sortedKeys = new Array();
		var sortedObj = {};
		for(var i in arr) // on copie les valeurs dans un array
		{
			sortedKeys.push(arr[i]);
		}
		
		sortedKeys.sort(sortNumber);
		if(ordre==1 || ordre==null) sortedKeys.reverse();
		
		for(var i in sortedKeys) // on réécrit le nouvel objet
		{
			for(var key in arr)
			{
				if(sortedKeys[i]==arr[key]) // si la valeur triée correspond à celle de départ, on réccupère la clé
				{
					sortedObj[key] = arr[key];
					delete arr[key];
				}
			}
		}
		return sortedObj;
	}
	if(id.split('_')[1]>0)
	{
		var ordre = document.getElementById("CTSort_"+id.split('_')[1]).getAttribute('value');
		document.getElementById("CTSort_"+id.split('_')[1]).value = ordre*(-1);
	}
	temp = sortObj(temp, ordre);
	for(key in temp)
	{
		newtab[key] = gmfile.rapports[key];
	}
	if(id.split('_')[1]>0)
	{
		var html = ShowEspionnage(newtab);
		document.getElementById("CTEspionnage_"+id.split('_')[1]).innerHTML = html;
		ButtonEspionnage();
	}
	else
	{
		delete gmfile.rapports;
		gmfile.rapports = newtab;
		Save();
	}
}





// lecture d'un rapport d'espionnage
function ReadRapport(rapport_id,idd)
{
	var reg=new RegExp(":", "g");
	
	var table_material = rapport_id.getElementsByClassName('material spy')[0];
	var table_aktiv = rapport_id.getElementsByClassName('aktiv spy')[0];
	var table_fleet = rapport_id.getElementsByClassName('fleetdefbuildings spy')[0];
	var table_def = rapport_id.getElementsByClassName('fleetdefbuildings spy')[1];
	
	// infos sur le rapport
	var date = new Date();
	var info_date = table_material.getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML.split('\') ')[1];
	var info_date = date.getFullYear()+'-'+info_date.split(' ')[1]+' '+info_date.split(' ')[2]; // ex: 08-14 14:50:52
	var info_joueur = table_material.getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML.split('</a>')[1].split(' \'')[1].split('\') ')[0];
		// si antigame est installé et interfere dans le nom du joueur
		if(info_joueur.indexOf('war-riders.de') != -1){ info_joueur = table_material.getElementsByTagName('tr')[0].getElementsByTagName('th')[0].getElementById("player_name").innerHTML; }
	var info_coordonnees = table_material.getElementsByClassName('area')[0].getElementsByTagName('a')[0].innerHTML.replace('[','').replace(']','');
	var info_planete = table_material.getElementsByClassName('area')[0].innerHTML.split(' <a')[0].replace(LANG.Text.Ressources+" ","");
	
	var key = info_coordonnees.replace(reg,'_');

	// liste des ressources
	var tmp = rapport_id.getElementsByClassName('areadetail')[0].getElementsByClassName('fragment spy2')[0].getElementsByTagName('tbody')[0].getElementsByTagName('td');
	var res_metal = intval(tmp[1].innerHTML);
	var res_cristal = intval(tmp[3].innerHTML);
	var res_deuterium = intval(tmp[5].innerHTML);
	
	// derniere activite
	var info_activite =  intval(table_aktiv.getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerHTML.split('</span>')[1]);

	// liste des flottes
	var list_flottes = {};
	if(typeof(table_fleet)!="undefined")
	{
		var tmp = table_fleet.getElementsByTagName('td');
		for(var i=0; i<tmp.length/2; i++)
		{
			if(in_array(tmp[(i*2)].innerHTML, LANG.Fleet)) list_flottes[array_keys(LANG.Fleet, tmp[(i*2)].innerHTML)] = { nom: tmp[(i*2)].innerHTML, nbr: tmp[((i*2)+1)].innerHTML.replace('.','') };
		}
	}

	// liste des defenses
	var list_defenses = {};
	if(typeof(table_def)!="undefined")
	{
		var tmp = table_def.getElementsByTagName('td');
		for(var i=0; i<tmp.length/2; i++)
		{
			if(in_array(tmp[(i*2)].innerHTML, LANG.Def)) list_defenses[array_keys(LANG.Def, tmp[(i*2)].innerHTML)] = { nom: tmp[(i*2)].innerHTML, nbr: tmp[((i*2)+1)].innerHTML.replace('.','') };
		}
	}
	
	// lune ou planete ?
	var info_type = 1;
	if(rapport_id.getElementsByClassName('attack')[0].getElementsByTagName('a')[0].getAttribute('href').indexOf('type=3')>=0) info_type = 3;
	
	// on va vérifier si le joueur est inactif
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: document.location.href.split('?')[0]+'?page=galaxyContent&galaxy='+info_coordonnees.split(':')[0]+'&system='+info_coordonnees.split(':')[1]+'&planet='+info_coordonnees.split(':')[2]+'&session='+UserSession,
	    onload: function(reponse) {
	        var html = reponse.responseText;
			var position = parseInt(info_coordonnees.split(':')[2]);
			var position2 = position + 1;
			var start = html.indexOf('<td class="position">'+position+'</td>');
			var end = html.indexOf('<td class="position">'+position2+'</td>');
			if(end<0) html.indexOf('<span id="colonized">');
			html = html.substr(start, end-start);
		    
			// si le joueur est inactif
			var info_inactif = 0;
		    if(html.indexOf('status_abbr_longinactive')>=0 || html.indexOf('status_abbr_inactive')>=0) info_inactif = 1
		    
			var save_rapport = {};
			save_rapport.infos = { date: info_date, joueur: info_joueur, coordonnees: info_coordonnees, planete: info_planete, activite: info_activite, id: idd, inactif: info_inactif };
			save_rapport.ressources = { metal: res_metal, cristal: res_cristal, deuterium: res_deuterium };
			save_rapport.flottes = list_flottes;
			save_rapport.defenses = list_defenses;
			
			// on véirifie si on a pas un plus récent
			key = info_coordonnees.replace(reg,'_')+'_'+info_type;
			if(!(key in gmfile.rapports) || intval(gmfile.rapports[key].infos.date) < intval(info_date))
			{
				gmfile.rapports[key] = save_rapport;
				Save();
			}
	    }
	});	
}






// scanner les messages
function ScanMessages()
{
	// si les rapports sont affichés dans les messages on les enregistre
	window.ReadMessage = function()
	{
		if(document.getElementById("mailz"))
		{
			var mails = document.getElementById("mailz").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
			for(var i=0; i<mails.length; i++)
			{
				if(mails[i].id.search("spioDetails_")>=0) ReadRapport(mails[i], mails[i].id.replace("spioDetails_",""));
			}
		}
		else
			setTimeout(ScanMessages,500);
	}
	ReadMessage();
}





// scan des mouvements de flottes
function ScanMouvements()
{
	var reg=new RegExp(":", "g");
	var mouvement = document.getElementById("inhalt").getElementsByClassName("fleetDetails");
	for(var i=0; i<mouvement.length; i++)
	{
		if(mouvement[i].id.search("fleet")>=0)
		{
			// on vérifie si on fait bien attaquer
			if(mouvement[i].getElementsByClassName("mission")[0].innerHTML==LANG.Text.Attaquer)
			{
				var fleetid = mouvement[i].id;
				var dest = mouvement[i].getElementsByClassName("destinationCoords")[0].getElementsByTagName("a")[0].innerHTML.replace('[','').replace(']','').replace(reg,'_');
				var planete = mouvement[i].getElementsByClassName("destinationPlanet")[0].innerHTML;
				
				if(mouvement[i].getElementsByClassName('destination')[0].getElementsByTagName('img')[0].getAttribute('src').indexOf('/moon/')>=0)
					dest+='_3';
				else
					dest+='_1';
				
				if(typeof(gmfile.attaques[dest])=="undefined") gmfile.attaques[dest] = {};
				
				// on vérifie si on a pas déjà enregistré l'attaque
				if(typeof(gmfile.attaques[dest][fleetid])=="undefined" && mouvement[i].getElementsByClassName("reversal").length>0)
				{
					gmfile.attaques[dest][fleetid] = {};
					
					var date_arrive = mouvement[i].getElementsByClassName("timer")[0].getAttribute("title").replace('|',''); // ex: 05.09.2011 13:26:44
					
					// si on est sur le traject du retour, on enregistre pas
					if(typeof(mouvement[i].getElementsByClassName("nextTimer")[0])!="undefined")
					{
						var date_return = mouvement[i].getElementsByClassName("nextTimer")[0].getAttribute("title").replace('|',''); // ex: 05.09.2011 14:46:32
					
						var timefly = new Date();
						timefly.setFullYear(date_arrive.substr(6,4));
						timefly.setMonth(date_arrive.substr(3,2)-1);
						timefly.setDate(date_arrive.substr(0,2));
						timefly.setHours(date_arrive.substr(11,2));
						timefly.setMinutes(date_arrive.substr(14,2));
						timefly.setSeconds(date_arrive.substr(17,2));
						timefly.setMilliseconds(0);
						var times_arrive = timefly.getTime();
						timefly.setFullYear(date_return.substr(6,4));
						timefly.setMonth(date_return.substr(3,2)-1);
						timefly.setDate(date_return.substr(0,2));
						timefly.setHours(date_return.substr(11,2));
						timefly.setMinutes(date_return.substr(14,2));
						timefly.setSeconds(date_return.substr(17,2));
						var times_return = timefly.getTime();
						
						gmfile.attaques[dest][fleetid] = {aller: times_arrive, retour: times_return};
					}
				}
				else if(typeof(gmfile.attaques[dest][fleetid])!="undefined" && gmfile.attaques[dest][fleetid].aller > (new Date).getTime() && mouvement[i].getElementsByClassName("reversal").length==0) // si on a fait retour
				{
					delete gmfile.attaques[dest][fleetid];
					Save();
				}
			}
		}
	}
	// on supprime les attaques de plus de 24h
	var key1, key2 = '';
	for(key1 in gmfile.attaques)
	{
		for(key2 in gmfile.attaques[key1])
		{
			if((gmfile.attaques[key1][key2].retour<(new Date).getTime()-86400000) || !document.getElementById(key2)) 
					delete gmfile.attaques[key1][key2];
		}
		if(sizeof(gmfile.attaques[key1])==0) delete gmfile.attaques[key1];
	}
	Save();
}





// répondre à un message circulaire
function ReplyCirculaire()
{
	if(typeof(document.getElementById('messagebox').getElementsByClassName('textWrapper')[0])!="undefined")
	{
		document.getElementById('messagebox').getElementsByClassName('textWrapper')[0].className="textWrapperSmall";
		var sujet = document.getElementById('messagebox').getElementsByTagName('table')[0].getElementsByTagName('td')[2].innerHTML.trim();
		var form = '<div class="answerHeadline open">'+LANG.Message.Reply+' <a id="openCloseForm" href="#"></a></div>';
		form += '<div id="answerForm" class="textWrapperSmall">';
			form += '<form target="_parent" method="post" action="index.php?page=networkkommunikation&session='+UserSession+'&empfaenger=200" name="asdf">';
				form += '<input type="hidden" name="empfaenger" value="0" />';
				form += '<div class="answerText">';
					form += '<textarea tabindex="3" name="text" class="mailnew" onkeyup="javascript:cntchar(2000)"></textarea>';
					form += '<input type="hidden" name="betreff" value="RE:'+sujet+'" />';
				form += '</div> ';
				form += '<div class="answerText">';
					form += '<div class="fleft count textBeefy">'+LANG.Message.Response+' (<span id="cntChars">0</span> / 2000 '+LANG.Message.Character+')</div>';
					form += '<div class="fleft buttonbox">';
						form += '<input tabindex="4" name="submitMail" class="button188" value="'+LANG.Message.Send+'" type="submit">';
					form += '</div>';
					form += '<br class="clearfloat">';
				form += '</div>';
			form += '</form>';
		form += '</div>';
		document.getElementById('messagebox').innerHTML += form;
	}
}




// afficher le mini-chat de l'alliance
function MiniChat()
{
	if(document.getElementById('inhalt'))
	{
		var chat = '<div id="eventListWrap"><div id="eventHeader"><h4>'+LANG.Alliance.MiniChat+'</h4></div>';
		chat += '<table id="eventContent"><tbody><tr class="eventFleet"><td style="padding-left:10px;">';
		chat += gmfile.option['Alliance_MiniChat'];
		chat += '</td></tr></table>';
		chat += '<div id="eventFooter"></div></div>';
		
		document.getElementById('eventboxContent').id = "CTMiniChat";
		document.getElementById('CTMiniChat').innerHTML = chat+'<div id="eventboxContent" style="display: none;">'+document.getElementById('CTMiniChat').innerHTML+'</div>';
		document.getElementById('CTMiniChat').style.display = "block";
	}
}