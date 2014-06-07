// ==UserScript==
// @name           OgOverview Transported Resources (Fr, En, Bg, ....)
// @namespace      Ogame
// @version        0.986
// @include        http://uni*.ogame.*/game/index.php?page=overview*
// @exclude	   		http://uni42.ogame.org/*
// @source  	   http://userscripts.org/scripts/source/42338.user.js
// @description     Fr/Dk/US/Bg.org - Permet d'afficher les ressources transportées dans la page principale; avec un choix de séléction des ressources à visualiser. Récapitulatif selon les missions, destinations, provenances, ... Paramétrable. Mis à jour régulièrement :)
// Support des serveurs .fr, .dk, beta pour .us et uniX.bg.ogame.org; Temps de chargement ~50ms;\nAutoUpdate
// -------------------------------------------------------------------------------------------------
// Shows transported resources in overview page. Allow you to select which mission you want to sum. Shows a summary for each mission type. Loading time about 50ms. Frequently updated :)
// Supports .fr, .dk, beta for .us et uniX.bg.ogame.org servers
// --------------------------------------------------------------------------------------------------
// Any new translation is welcome!
// Auto-update checker
// ==/UserScript==

// Info : Le script crée un span id "extensionsBarreEvenements" vide après le total des ressources transportées

//alert("pageOk");

version_script=0.986;

var t0=new Date();
function checkPage() {
	var url = window.location.href;
	if(url.indexOf('page=overview')!=-1) return true;
	return false;
}
if(typeof J=="undefined") var J={};
if(typeof J.overview=="undefined") J.overview={};

J.overview.version=0.986

J.DEBUG=false;

J.Debug=function(msg) { if(J.DEBUG) alert(msg); }
J.get=function(name, defaut) { if(typeof(GM_getValue)!="undefined") return GM_getValue(name, defaut);return defaut;}
//J.set=function(name, value) { if(typeof(GM_setValue)!="undefined")return GM_setValue(name, value);return value;}
J.getPartage=function(name, defaut)
{
	var pt=document.getElementById("partage_"+name);
	if(pt==null) return defaut;
	try 
	{
		return unserialize(pt.innerHTML);
	}catch(e){return defaut;}
}
J.set=function(name, value) 
{ 
	try 
	{ 
		var pt=document.getElementById("partage_"+name);
		if(pt==null)
		{
			pt=document.createElement('div');
			pt.id="partage_"+name;
			J.partage.appendChild(pt);
		}
		var value2=serialize(value);
		pt.innerHTML=value2;
	}catch(e)
	{
	}
	if(typeof(GM_setValue)!="undefined")return GM_setValue(name, value);
	return value;
}

J.undef=function(elt){return typeof elt=="undefined"?true:false;};


J.reperes=
{
	fr:
	{
		getResources:{
			titleTransporter:"Transporter: Métal: ",
			 strMetal:'Métal',
			 strCristal:'Cristal',
			 strDeut:'Deutérium'
		},
		getTdEvenements:
		{
			strEvts:" Evènements "
		}
	},
	cz:
	{
		getResources:{
			titleTransporter:"Transport: Kov: ",
			 strMetal:'Kov',
			 strCristal:'Krystaly',
			 strDeut:'Deuterium'
		},
		getTdEvenements:
		{
			strEvts:" Události "
		}
	},
	de:
	{
		getResources:{
			titleTransporter:"Transport: Metall: ",
			 strMetal:'Metall',
			 strCristal:'Kristall',
			 strDeut:'Deuterium'
		},
		getTdEvenements:
		{
			strEvts:" Ereignisse "
		}
	},
	it:
	{
		getResources:{
			titleTransporter:"Trasporto: Metallo: ",
			 strMetal:'Metallo',
			 strCristal:'Cristallo',
			 strDeut:'Deuterio'
		},
		getTdEvenements:
		{
			strEvts:" Eventi "
		}
	},
	es:
	{
		getResources:{
			titleTransporter:"Transportar: Metal: ",
			 strMetal:'Metal',
			 strCristal:'Cristal',
			 strDeut:'Deuterio'
		},
		getTdEvenements:
		{
			strEvts:" Eventos "
		}
	},
	en:
	{
		getResources:{
			titleTransporter:"Transport: Metal:",
			 strMetal:'Metal',
			 strCristal:'Crystal',
			 strDeut:'Deuterium'
		},
		getTdEvenements:
		{
			strEvts:" Events "
		}
	},
	bg:
	{
		getResources:{
			titleTransporter:"Транспортирай: Метал:",
			 strMetal:'Метал',
			 strCristal:'Кристали',
			 strDeut:'Деутерий'
		},
		getTdEvenements:
		{
			strEvts:"Събития "
		}
	},
	br:
	{
		getResources:{
			titleTransporter:"Transportar: Metal: ",
			 strMetal:'Metal',
			 strCristal:'Cristal',
			 strDeut:'Deutério'
		},
		getTdEvenements:
		{
			strEvts:" Eventos "
		}
	},
	dk:
	{
		getResources:{
			titleTransporter:"Transportere: Metal: ",
			 strMetal:'Metal',
			 strCristal:'Krystal',
			 strDeut:'Deuterium'
		},
		getTdEvenements:
		{
			strEvts:" Begivenheder "
		}
	}

}

J.Lang=
{
	actualLang:"fr",
	defaultLang:"fr",
	getStr:function(strName, langue)
	{
		if(typeof(langue)=="undefined")
			langue=J.Lang.actualLang;
		if(typeof(J.Lang.str[langue])!="undefined"&&typeof(J.Lang.str[langue][strName])!="undefined")
			return J.Lang.str[langue][strName];
		if(typeof(J.Lang.str[J.Lang.actualLang])!="undefined"&&typeof(J.Lang.str[J.Lang.actualLang][strName])!="undefined")
			return J.Lang.str[J.Lang.actualLang][strName];
		
		return J.Lang.str[J.Lang.defaultLang][strName];
	},
	str: 
	{
		fr : 
		{
			lang:"Français",
			flight:"A",
			"return" :"R",
			holding:"E",
			owntransport:"Transporter",
			owndeploy:"Stationner",
			ownharvest:"Exploiter",
			ownattack:"Attaquer",
			ownespionage:"Espionner",
			ownhold:"Stationner chez un allié",

			transport:"Transport(ext)",
			attack:"Attaque(ext)",
			espionage:"Espionnage(ext)",
			
			metal:'Métal',
			cristal:'Cristal',
			deut:'Deutérium',
			total:"Total",
			
			ships:"Vaisseaux",
			quantity:"Qté",
			
			ressourcesEnTransit:"En transit",
			missions:"Missions",
			sourceDuScript:"Source du script",
			lastVersion:'Dernière version du script',
			MAJ:'MAJ',
			avecPlanetes:"Avec Planètes",
			checked:"Cochées",
			withActivePlanet:"+Planète active",
			showOptions:"Afficher les options OGOverview",
			showCalcul:"Afficher les options de calcul",
			hideCalcul:"Cacher les options de calcul",
			activerAutoclick:"Activer l'autoclick",
			display:"Afficher",
			afficherEnGras:"Afficher en gras",
			color:"Couleur",
			language:"Langue d'affichage",
			styleTr : "Style tr additionnel",
			styleTd : "Style td additionnel",
			styleTh : "Style th additionnel",
			
			ressourcesTransportees:"Ressources Transportées",
			tous:"Tous",
			allers:"Allers",
			retours:"Retours",
			to:"Vers",
			from:"Provenance de ",
			
			tempsChargement:"Temps de chargement du script",
			general:"Général",
			dispDetails:"Toujours afficher les détails (plus long au chargement)",
			dispCalculs:"Toujours afficher les calculs",
			autoUpdate:"Activer l'autoUpdate (vérif 1 fois par jour)",
			typeDeTableau:" Type de tableau (td ou th suivant votre skin)", 
			classeDesTr:" Classe des tr", 
			ligneTotauxParMissionIndividuels:"Ligne totaux par mission individuels",
			ligneTotalTransporte:"Ligne total transporté",
			ligneTotalTransportePlusPlanetes: "Ligne total transporté + planètes",
			ligneTotauxParMissionIndividuelsCheckees:"Ligne totaux par mission individuels (checkées)",
			ligneTotalDesMissionsCheckees:"Ligne total des missions checkées",
			ligneTotalDesMissionsCheckeesPlusPlaneteActive:"Ligne total des missions checkées + planète active",
			
			tableauSelectionRapide:"Tableau de séléction rapide de missions (carré rouge)",
			
			flyingShips:"Afficher la flotte en vol",
			
			// Calculs
			showFavorites:"(Favoris)",
			showMyPlanets:"(Mes planètes)",
			
			only:"  uniquement.",
			activateResourcesTo:" Activer ressources vers ",
			resourcesNeeded : "Ressources à obtenir",
			planet:"planète",
			missing:"Manque",
			checked:"checkées",
			ogTotalResources1:"Vous ne disposez pas du script OG Total Resources, qui permet de ",
			ogTotalResources2:"visualiser les ressources de l'empire ainsi que les batiments de l'empire.",
			scriptDescription:"Description du script",
			scriptInstall:"Installation du script",


			
		},
		en : 
		{
			lang:"English",
			flight:"F",
			"return" :"R",
			holding:"E",
			owntransport:"Transport",
			owndeploy:"Deploy",
			ownharvest:"Harvest",
			ownattack:"Attack",
			ownespionage:"Espionage",
			ownhold:"Stationner chez un allié",

			transport:"Transport(ext)",
			attack:"Attack(ext)",
			espionage:"Espionage(ext)",
			
			metal:'Metal',
			cristal:'Crystal',
			deut:'Deuterium',
			total:"Total",

			ships:"Ships",
			quantity:"Qty",
			
			ressourcesEnTransit:"In transit",
			missions:"Missions",
			sourceDuScript:"Script source",
			lastVersion:'Latest version of the script',
			MAJ:'Update',
			avecPlanetes:"With Planets",
			checked:"Checked",
			withActivePlanet:"+active planet",
			showOptions:"Display options for OGOverview",
			showCalcul:"Show calcul boxes",
			hideCalcul:"Hide calcul boxes",
			styleTr : "Additional tr style",
			styleTd : "Additional td style",
			styleTh : "Additional th style",
			
			activerAutoclick:"Activate autoclick",
			display:"Display",
			afficherEnGras:"Display in boldface",
			color:"Color",
			language:"Language",
			
			flyingShips:"Show flying ships",
			
			ressourcesTransportees:"Transported resources",
			tous:"All",
			allers:"Outgoing",
			retours:"Returning",
			to:"Flying to ",
			from:"Flying from ",
			
			tempsChargement:"Loading duration",
			dispDetails:"Always display details (a bit longer to load: +50ms)",
			dispCalculs:"Always display calculus table (+80ms)",
			autoUpdate:"Activate AutoUpdate (checks once a day)",

			general:"General",
			typeDeTableau:" Table type (td or th according to your skin)", 
			classeDesTr:" Class of tr", 
			ligneTotauxParMissionIndividuels:"Totals for individual missions",
			ligneTotalTransporte:"Transported totals",
			ligneTotalTransportePlusPlanetes: "Transported totals + planets",
			ligneTotauxParMissionIndividuelsCheckees:"Totals for individual missions (checked)",
			ligneTotalDesMissionsCheckees:"Totals for checked missions",
			ligneTotalDesMissionsCheckeesPlusPlaneteActive:"Totals for checked missions + active planet",
			
			tableauSelectionRapide:"Table for quick missions selection (red square)",
			
			showFavorites:"(Favorites)",
			showMyPlanets:"(My planets)",
			
			only:"  only.",
			activateResourcesTo:" Activate resources to ",
			planet:"planet",
			missing:"Missing",
			checked:"checked",
			resourcesNeeded : "Resources needed",
			
			ogTotalResources1:"You don't have the script Og Total Resources which allows to",
			ogTotalResources2:"supervise the whole empire resources and buildings.",
			scriptDescription:"Script description",
			scriptInstall:"Script installation",



		},
		bg : 
		{	
			lang:"Bulgarian",
			flight:"О",
			"return" :"В",
			holding:"З",
			owntransport:"Транспортиране",
			owndeploy:"Стациониране",
			ownharvest:"Рециклиране",
			ownattack:"Атака",
			ownespionage:"Шпиониране", 

			transport:"Транспорт (чужд)",
			attack:"Атака (чужда)",
			espionage:"Шпионаж (чужд)",
		
			metal:'Метал',
			cristal:'Кристали',
			deut:'Деутерий',
			total:"Общо",
			
			ressourcesEnTransit:"Ресурси на път",
			missions:"Задачи",
			sourceDuScript:"Източник на скрипта",
			lastVersion:'Последна версия на скрипта',
			MAJ:'Обновяване',
			avecPlanetes:"С планетите",
			checked:"Селектирани",
			withActivePlanet:"+Текущата планета",
			showOptions:"Показване на опциите",
			activerAutoclick:"Активиране на autoclick",
			display:"Показване",
			afficherEnGras:"Показване с дебел шрифт",
			color:"Цвят",
			language:"Език",
			
			ressourcesTransportees:"Транспортирани ресурси",
			tous:"Всички",
			allers:"Излитащи",
			retours:"Връщащи се",
			to:"Към ",
			from:"Идващи от ",

			general:"Общи",
			typeDeTableau:" Тип на таблицата (td или th според скина)", 
			classeDesTr:" Клас на tr", 
			ligneTotauxParMissionIndividuels:"Ред със суми от индивидуални полети",
			ligneTotalTransporte:"Ред с общи суми",
			ligneTotalTransportePlusPlanetes: "Ред с общи суми + планети",
			ligneTotauxParMissionIndividuelsCheckees:"Ред със суми от индивидуални полети (селектирани)",
			ligneTotalDesMissionsCheckees:"Ред с общи суми от слектираните полети",
			ligneTotalDesMissionsCheckeesPlusPlaneteActive:"Ред с общи суми от слектираните полети + текущата планета"
		}
	}
}
J.SERVER_LANG="fr";

try
{
	var url = window.location.href.toLowerCase();
	var match=url.match("/uni[0-9]+.*\.ogame.([a-z]+)/","");
	var match2=url.match("/uni[0-9]+.*\.ogame.com.([a-z]+)/","");
	if(match!=null && match.length>1 && (typeof(J.reperes[match[1]])!="undefined" || match[1] == "org" || match[1] == "com"))
	{
		J.SERVER_LANG=match[1];
		if(match[1]=="org")
		{
			match = url.match ("/uni[0-9]+\.([a-z]+)\.ogame.org/","");
			if(match!=null && match.length>1 && typeof(J.reperes[match[1]])!="undefined")
			{
				switch(match[1])
				{
					case "bg":
						J.SERVER_LANG="bg";
						break;
					default:
						J.SERVER_LANG="en";
				}
			}
			else
			{
				J.SERVER_LANG="en";
			}
		}
	}
	else if(match2!=null && match2.length>1 && (typeof(J.reperes[match2[1]])!="undefined"))
	{
		J.SERVER_LANG=match2[1];
	}
	else J.Debug("Langue du serveur non supportée...");
	
	if(J.get("Options_Lang", "").length==0)
	{
		if(typeof(J.Lang.str[J.SERVER_LANG])!="undefined")
			J.Lang.actualLang=J.SERVER_LANG;
		else
			J.Lang.actualLang=J.Lang.defaultLang;
	}
	else J.Lang.actualLang=J.get("Options_Lang", J.Lang.defaultLang);
	
}catch(e){J.Debug('Impossible de récupérer la langue serveur...')}

J.Options=
{
	autoClick:J.get('Options_AutoClick',true),
	autoUpdate:J.get('Options_AutoUpdate',true),
	dispDetails:J.get('Options_DispDetails', false),
	dispCalculs:J.get('Options_DispCalculs', false),
	styleTr:J.get('Options_StyleTr', ""),
	styleTd:J.get('Options_StyleTd', ""),
	styleTh:J.get('Options_StyleTh', ""),
	activerCalculVers:J.get('Options_ActiverCalculVers', true),
	updaterInterval:J.get('Options_UpdateInterval', 1),
}

J.Css=
{
	tableSelectionRapide:
	{
		color:J.get('Options_SelectionRapideColor',"#ffffff"), 
	},
	tableRessources:
	{
		entetes:
		{
			tdTh:J.get('Options_EntetesTdTh',"td"),
			className:J.get('Options_EntetesClassName',"")
		},
		trStatiques:
		{
			color:J.get('Options_TrStatiqueColor',""), 
			bold:J.get('Options_TrStatiqueBold',false),
			display:J.get('Options_AfficherTrStatique',false)
		},
		trTotal:
		{
			color:J.get('Options_TrTotalColor',"#dddd00"), 
			bold:J.get('Options_TrTotalBold',true),
			display: J.get('Options_AfficherTrTotal',true) // mettre none pour ne pas afficher...
		},
		trAvecPlanetes:
		{
			color:J.get('Options_TrTotalAvecPlanetesColor',"#ddbb00"), 
			bold:J.get('Options_TrTotalAvecPlanetesBold',true),
			display:J.get('Options_AfficherTrTotalAvecPlanetes',true)
		},
		trChecked:
		{
			color:J.get('Options_TrCheckedColor',"#ffffff"), 
			bold:J.get('Options_TrCheckedBold',true),
			display:J.get('Options_AfficherTrChecked',true)
		},
		trTotalChecked:
		{
			color:J.get('Options_TrTotalCheckedColor',"#dd8800"), 
			bold:J.get('Options_TrTotalCheckedBold',true),
			display:J.get('Options_AfficherTrTotalChecked',true)
		},
		trAvecPlaneteActive:
		{
			color:J.get('Options_TrTotalAvecPlaneteActiveColor',"#dd6600"), 
			bold:J.get('Options_TrTotalAvecPlaneteActiveBold',true),
			display:J.get('Options_AfficherTrTotalAvecPlaneteActive',true)
		}
	}
}





function updateCheck(forced)
{
	var version_scriptNum = 42338; // Change this to the number given to the script by userscripts.org (check the address bar)
	if ((forced) ||(J.Options.autoUpdate && (parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime())))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
	{
		try
		{
			GM_xmlhttpRequest(
			{
				method: "GET",
				url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),
				headers: {'Cache-Control': 'no-cache'},
				onload: function(xhrResponse)
				{
		try
		{
					GM_setValue("lastUpdate", new Date().getTime() + "");
					var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "");
					var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
					if (parseFloat(/version_script\s*=\s*([0-9\.]+)/.exec(rt)[1]) > version_script)
					{
						if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?"))
							{GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}
					}
					else if (forced)
						{alert("No update is available for \"" + scriptName + ".\"");}
		}
		catch (err)
		{
//			alert("An error occurred while checking for updates:\n" + err);
		}
				}
			});
		}
		catch (err)
		{
			if (forced)
				{alert("An error occurred while checking for updates:\n" + err);}
		}
	}
}



J.Ressources={
	flight : {
		owntransport:[],
		owndeploy:[],
		ownharvest:[],
		ownattack:[],
		ownespionage:[],
		ownhold :[],

		transport:[],
		attack:[],
		espionage:[]
	},
	"return" : {
		owntransport:[],
		owndeploy:[],
		ownharvest:[],
		ownattack:[],
		ownespionage:[],
		ownhold :[],
	},
	from:{},
	to:{},
	calc:function()
	{
		try{
		var chkbx;
		if(J.Ressources.spanRessources==null)return;
		var tot=new J.resources(0,0,0);
		  
		for(var sstype in J.Ressources.flight)
			for(var id in J.Ressources.flight[sstype])
			{
				chkbx=J.Ressources.flight[sstype][id];
				if(chkbx.checked=="checked"||chkbx.checked==true)
				{
					tot=tot.plus(chkbx.ressources);
				}
			}
		for(var sstype in J.Ressources["return"])
			for(var id in J.Ressources["return"][sstype])
			{
				chkbx=J.Ressources["return"][sstype][id];
				if(chkbx.checked=="checked"||chkbx.checked==true)
				{
					tot=tot.plus(chkbx.ressources);
				}
			}
		J.Ressources.spanRessources.innerHTML=tot.toString(true);

		try {
		J.set(J.overview.GM_Variables.checkedResources, tot);
		}
		catch(e){}
		if(document.getElementById("trTableauRecap")!=null)
		{
			var oldTable=document.getElementById("tableRessourcesCheckees");
			if(oldTable==null)J.Debug('null');
//			oldTable.id="old_tableRessourcesCheckees"
			
			var table=document.createElement('table');
			table.id="tableRessourcesCheckees";
			table.setAttribute("width", 500);
			for(var sstype in J.Ressources.flight)
			{
				if(J.isEmpty(J.Ressources.flight[sstype])) continue;
				tmp=J.createTrAction(["flight", sstype],null,  function(){}, true);
				if(tmp==null) continue;
	//			total=total.plus(tmp[1]);
				table.appendChild(tmp[0]);
			}
			
			for(var sstype in J.Ressources["return"])
			{
				if(J.isEmpty(J.Ressources["return"][sstype])) continue;
				tmp=J.createTrAction(["return", sstype],null,  function(){}, true);
				if(tmp==null) continue;
	//			total=total.plus(tmp[1]);
				table.appendChild(tmp[0]);
			}

			
			var tr=document.createElement('tr');//.getElementById("trChecked");
			tr.id="trChecked";
			tr.style.fontWeight=J.Css.tableRessources.trTotalChecked.bold?"bold":"";
			tr.style.color=J.Css.tableRessources.trTotalChecked.color;
			tr.style.display=J.Css.tableRessources.trTotalChecked.display?"":"none";
			var td=J.createTdTh();
			td.appendChild(document.createTextNode(J.Lang.getStr("checked")+" :"));
			tr.appendChild(td);
			tr.appendChild(tot.getTdM());
			tr.appendChild(tot.getTdC());
			tr.appendChild(tot.getTdD());
			tr.appendChild(tot.getTdTotal());
			table.appendChild(tr);
			
			if(J.Ressources.ressourcesPlaneteActive!=null)
			{
				var tr=document.createElement('tr');
				tr.id="trAvecPlaneteActive";
				tr.style.fontWeight=J.Css.tableRessources.trAvecPlaneteActive.bold?"bold":"";
				tr.style.color=J.Css.tableRessources.trAvecPlaneteActive.color;
				tr.style.display=J.Css.tableRessources.trAvecPlaneteActive.display?"":"none";
				var totPlusPlanete=tot.plus(J.Ressources.ressourcesPlaneteActive);
				td=J.createTdTh();
				td.appendChild(document.createTextNode(J.Lang.getStr("withActivePlanet")+" :"));
				tr.appendChild(td);
				tr.appendChild(totPlusPlanete.getTdM());
				tr.appendChild(totPlusPlanete.getTdC());
				tr.appendChild(totPlusPlanete.getTdD());
				tr.appendChild(totPlusPlanete.getTdTotal());
				table.appendChild(tr);
			}

			oldTable.parentNode.insertBefore(table, oldTable);
			oldTable.parentNode.removeChild(oldTable);
			
			if(J.Options.dispCalculs)
			{
				var oldTable=document.getElementById("tableCalcul");
				if(oldTable==null)J.Debug('null');
				
				var table=document.createElement('table');
				table.id="tableCalcul";
				table.setAttribute("width", 500);
				var calculTotal=function()
				{
					var res=new J.resources(document.getElementById("inputCalculMetal").value,document.getElementById("inputCalculCristal").value,document.getElementById("inputCalculDeut").value);
					document.getElementById("inputCalculTotal").value=res.total();
				}
				var mkTdInput=function(variableName, id) 
				{
					var td=J.createTd();
					td.style.width="85px";
					var input=document.createElement("input");
					td.appendChild(input);
					input.id=id;
					input.type="input";
					input.style.width="100%";
					input.style.padding="0";
					input.style.margin="0";
					input.style.textAlign="center";
					if(typeof(variableName)=="string" && variableName.length>0)
					{
						input.value=J.get(variableName, 0);
						input.setAttribute("option", variableName);
						J.register(input, "change", function(){if(this.value.indexOf('.')!=-1)this.value=this.value.replace(/\./g, "");});
						J.register(input, "change", J.fxOptionInput);
					}
					
					J.register(input, "change", calculTotal);
					return td;
				}
				var mkTd=function(value) 
				{
					var td=J.createTd();
					td.style.width="85px";
					td.appendChild(J.createTxt(value));
					return td;
				}
				
				var tr=J.createTr();
				var td=J.createTdTh();
				td.appendChild(J.createTxt(J.Lang.getStr("resourcesNeeded")));
				tr.appendChild(td)
				tr.appendChild(mkTdInput("calculMetal", "inputCalculMetal"));
				tr.appendChild(mkTdInput("calculCristal", "inputCalculCristal"));
				tr.appendChild(mkTdInput("calculDeut", "inputCalculDeut"));
				tr.appendChild(mkTdInput("calculTotal", "inputCalculTotal"));
				tr.style.fontWeight="bold";
				table.appendChild(tr);
				
				
				
				
				// Tr Total checkées
				var tr=J.createTr();
				tr.style.fontWeight=J.Css.tableRessources.trTotalChecked.bold?"bold":"";
				tr.style.color=J.Css.tableRessources.trTotalChecked.color;
				tr.style.display=J.Css.tableRessources.trTotalChecked.display?"":"none";
				var td=J.createTdTh();
				td.appendChild(J.createTxt(J.Lang.getStr("missing")+" ("+J.Lang.getStr("checked")+")")); 
				tr.appendChild(td)
				var manq=new J.resources(J.get("calculMetal",0), J.get("calculCristal",0), J.get("calculDeut",0));
				var manqMinChk=manq.minus(tot);
				tr.appendChild(manqMinChk.getTdM());
				tr.appendChild(manqMinChk.getTdC());
				tr.appendChild(manqMinChk.getTdD());
				tr.appendChild(manqMinChk.getTdTotal());
				table.appendChild(tr);
				// Tr Total checkées+planete
				if(J.Ressources.ressourcesPlaneteActive!=null)
				{
					var tr=J.createTr();
					tr.style.fontWeight=J.Css.tableRessources.trAvecPlaneteActive.bold?"bold":"";
					tr.style.color=J.Css.tableRessources.trAvecPlaneteActive.color;
					tr.style.display=J.Css.tableRessources.trAvecPlaneteActive.display?"":"none";
					var td=J.createTdTh();
					td.appendChild(J.createTxt(J.Lang.getStr("missing")+" ("+J.Lang.getStr("checked")+"+"+J.Lang.getStr("planet")+")")); 
					tr.appendChild(td)
					var manqMinChk=manq.minus(totPlusPlanete);
					tr.appendChild(manqMinChk.getTdM());
					tr.appendChild(manqMinChk.getTdC());
					tr.appendChild(manqMinChk.getTdD());
					tr.appendChild(manqMinChk.getTdTotal());
					table.appendChild(tr);
				}
				

								// Ligne destination
				var tr=J.createTr();
				var td=J.createTdTh();
				var chkbx=document.createElement("input");
				td.appendChild(chkbx);
				
				td.appendChild(document.createTextNode(J.Lang.getStr("activateResourcesTo")));

				var input1=mkTdInput("coordUniquementVers", "inputCoordUniquementVers");
				var inputVers=input1.firstChild;
				inputVers.style.width="60px";
				td.appendChild(inputVers);
				td.appendChild(document.createTextNode(J.Lang.getStr("only")));
				td.setAttribute("colspan",5);
				tr.appendChild(td);
				

				J.getId(chkbx);
				chkbx.type="checkbox";

				chkbx.checked=J.get("Options_ActiverCalculVers", J.Options.activerCalculVers);
				chkbx.setAttribute("option", "Options_ActiverCalculVers");
				chkbx.setAttribute("chemin", "J.Options.activerCalculVers");
			
				var fxOptionChkbx=function()
				{
					var variable=this.getAttribute("option");
					J.set(variable, this.checked);
					var chemin=this.getAttribute("chemin");
					eval(chemin+"="+this.checked);
					J.Ressources.calc();
				}
				J.register(chkbx, "click", fxOptionChkbx);

				var txt=document.createTextNode("      ");
				td.appendChild(txt);
				
				var trTxtBox=tr;

				
				var bt=document.createElement("a");
				bt.appendChild(J.createTxt(J.Lang.getStr("showFavorites")));
				bt.setAttribute("href", "#");
				bt.style.textAlign="center";
				bt.id="inputShowFavorites";
				td.appendChild(bt);
				J.register(bt, "click", 
						function(){
								if(document.getElementById("myFavorites")!=null)return;
								var tr2=J.createTr();
								tr2.id="myFavorites";

								var td=J.createTdTh();

								td.setAttribute("colspan", 5);
								tr2.appendChild(td);
								
								td.innerHTML="ToDo";
								
								
								
								if(trTxtBox.nextSibling!=null)
									trTxtBox.parentNode.insertBefore(tr2,trTxtBox.nextSibling);
								else trTxtBox.parentNode.appendChild(tr2);
									
							});

				var txt=document.createTextNode("   ");
				td.appendChild(txt);
				
							
				var bt=document.createElement("a");
				bt.innerHTML=J.Lang.getStr("showMyPlanets");
				bt.setAttribute("href", "#");
				bt.style.textAlign="center";
				bt.id="inputShowMyPlanets";
				td.appendChild(bt);
				J.register(bt, "click", 
						function(){
						if(document.getElementById("myPlanets")!=null)return;
								var tr2=J.createTr();
								tr2.id="myPlanets";
								var td=J.createTdTh();
								td.setAttribute("colspan", 5);
								tr2.appendChild(td);
								
								
								var select=document.getElementsByTagName("select")[0];
								var dests={};
								for(var i=0;i<select.childNodes.length;i++)
								{
									var opt=select.childNodes[i];
									if(opt.nodeName.toUpperCase()!="OPTION") continue;
									var dest=opt.innerHTML.match("\\[[0-9]+:[0-9]+:[0-9]+\\]","g").toString();
									dest=dest.match("[0-9]+:[0-9]+:[0-9]+","g");
									if(typeof(dests[dest])!="undefined")continue;
									dests[dest]=true;
									var bt2=document.createElement("a");
									bt2.innerHTML=opt.innerHTML;
									bt2.coords=dest;
									bt2.setAttribute("href", "#");
									bt2.style.textAlign="center";
									J.register(bt2, "click", function(){
										var input=document.getElementById("inputCoordUniquementVers");
										input.value= this.coords;
											
										J.set("coordUniquementVers", this.coords);
										J.Options.activerCalculVers=this.coords;
										J.Ressources.calc();
									});
									td.appendChild(bt2);
									td.appendChild(document.createElement("BR"));
								}
								
								
								if(trTxtBox.nextSibling!=null)
									trTxtBox.parentNode.insertBefore(tr2,trTxtBox.nextSibling);
								else trTxtBox.parentNode.appendChild(tr2);
									
							});
							
				td.appendChild(bt);
		
				tr.appendChild(td)

				
				
				tr.style.fontWeight="bold";
				table.appendChild(tr);

				// Tr Total dest
				if(J.Options.activerCalculVers)
					try 
					{
						var resDest=J.calculRessourcesDestination(inputVers.value);
						var tr=J.createTr();
						tr.style.fontWeight=J.Css.tableRessources.trTotalChecked.bold?"bold":"";
						tr.style.color=J.Css.tableRessources.trTotalChecked.color;
						tr.style.display=J.Css.tableRessources.trTotalChecked.display?"":"none";
						var td=J.createTdTh();
						td.appendChild(J.createTxt(J.Lang.getStr("missing")+" "));
						tr.appendChild(td)
						var manq=new J.resources(J.get("calculMetal",0), J.get("calculCristal",0), J.get("calculDeut",0));
						var manqMinChk=manq.minus(resDest);
						tr.appendChild(manqMinChk.getTdM());
						tr.appendChild(manqMinChk.getTdC());
						tr.appendChild(manqMinChk.getTdD());
						tr.appendChild(manqMinChk.getTdTotal());
						table.appendChild(tr);
						
						//
						var tr=J.createTr();
						tr.style.fontWeight=J.Css.tableRessources.trAvecPlaneteActive.bold?"bold":"";
						tr.style.color=J.Css.tableRessources.trAvecPlaneteActive.color;
						tr.style.display=J.Css.tableRessources.trAvecPlaneteActive.display?"":"none";
						var td=J.createTdTh();
						td.appendChild(J.createTxt(J.Lang.getStr("missing")+" (+"+J.Lang.getStr("planet")+")"));
						tr.appendChild(td)
						var manq=new J.resources(J.get("calculMetal",0), J.get("calculCristal",0), J.get("calculDeut",0));
						manq=manq.minus(J.Ressources.ressourcesPlaneteActive);
						var manqMinChk=manq.minus(resDest);
						tr.appendChild(manqMinChk.getTdM());
						tr.appendChild(manqMinChk.getTdC());
						tr.appendChild(manqMinChk.getTdD());
						tr.appendChild(manqMinChk.getTdTotal());
						table.appendChild(tr);
						
						try
						{
							var allRess =unserialize(J.getPartage(J.tR.GM_Variables.resources, null)); 
							var ress = new J.resources(0,0,0);
							if(allRess!=null)
							{
								var vers = "["+inputVers.value.replace(/\[/g, "").replace(/]/g, "")+"]";
								for(var cp in allRess)
								{
									var pl = allRess[cp];
									var coords="["+pl.planet.coordinates.replace(/\[/g, "").replace(/]/g, "")+"]";
									if(coords == vers)
									{
										ress = ress.plus(pl.resources);
									}
								}
								if(ress.total()>0)
								{
									var tr=J.createTr();
									tr.style.fontWeight=J.Css.tableRessources.trAvecPlaneteActive.bold?"bold":"";
									tr.style.color=J.Css.tableRessources.trAvecPlaneteActive.color;
									tr.style.display=J.Css.tableRessources.trAvecPlaneteActive.display?"":"none";
									var td=J.createTdTh();
									td.appendChild(J.createTxt(J.Lang.getStr("missing")+" (+"+vers+")"));
									tr.appendChild(td)
									var manq=new J.resources(J.get("calculMetal",0), J.get("calculCristal",0), J.get("calculDeut",0));
									manq=manq.minus(ress);
									var manqMinChk=manq.minus(resDest);
									tr.appendChild(manqMinChk.getTdM());
									tr.appendChild(manqMinChk.getTdC());
									tr.appendChild(manqMinChk.getTdD());
									tr.appendChild(manqMinChk.getTdTotal());
									table.appendChild(tr);
								}
							}
						}catch(e){alert(e.message)}
						
					}catch(e){}


				
				
				oldTable.parentNode.insertBefore(table, oldTable);
				oldTable.parentNode.removeChild(oldTable);
				calculTotal();
				
			}
			else 				
			{
				var oldTable=document.getElementById("tableCalcul");
				if(oldTable!=null)oldTable.innerHTML="";
			}

			
		}
		} catch(e){J.Debug(e)}
	},
	spanRessources:null,
	ressourcesPlaneteActive:null
}

J.Fleets={
	flight : {
		owntransport:[],
		owndeploy:[],
		ownharvest:[],
		ownattack:[],
		ownespionage:[],
		ownhold :[],

		transport:[],
		attack:[],
		espionage:[]
	},
	"return" : {
		owntransport:[],
		owndeploy:[],
		ownharvest:[],
		ownattack:[],
		ownespionage:[],
		ownhold :[]
	},
	action : {
		flight : {
			owntransport:
			{
			// Fonction exemple
				fonctionTest : { fx:function(span/* span entier correspondant à l'évènement*/, type /*flight ou return */, sstype /*...*/, arg1, arg2){},args:["arg1", "arg2"]}
			},
			owndeploy:{},
			ownharvest:{},
			ownattack:{},
			ownespionage:{},
			owntransport:{},
			ownhold:{},

			transport:{},
			attack:{},
			espionage:{}
		},
		"return" : {
			owntransport:{},
			owndeploy:{},
			ownharvest:{},
			ownattack:{},
			ownespionage:{},
			ownhold:{}
		},
		all:{}
	},
	str :
	{
		fr : 
		{
			flight:"A",
			"return" :"R",
			owntransport:"Transporter",
			owndeploy:"Stationner",
			ownharvest:"Exploiter",
			ownattack:"Attaquer",
			ownespionage:"Espionner",
			ownhold:"Stationner chez un allié",

			transport:"Transport(ext)",
			attack:"Attaque(ext)",
			espionage:"Espionnage(ext)"
		}
	},
	STRFLIGHT:"flight ",
	STRRETURN:"return "
};
J.resources=function (M,C,D, from, to) {
	this.from=from;
	this.to=to;
	this.M=parseInt(M);
	this.C=parseInt(C);
	this.D=parseInt(D);
	this.plus=function(ressources) {
		return new J.resources(ressources.M+this.M, ressources.C+this.C, ressources.D+this.D);
	}
	
	this.minus=function(ressources) {
		var res= new J.resources(this.M-ressources.M, this.C-ressources.C, this.D-ressources.D);
		res.M=res.M>0?res.M:0;
		res.C=res.C>0?res.C:0;
		res.D=res.D>0?res.D:0;
		return res;
	}
	

	this.toString=function(html) 
	{
		var m="", m2=""+this.M;
		var c="", c2=""+this.C;
		var d="", d2=""+this.D;
		m=this.getString(m2);
		c=this.getString(c2);
		d=this.getString(d2);
		return (html?"<font style=\"color:"+J.Css.tableRessources.trAvecPlanetes.color+"\">":"")+"M: "+(html?"</font>":"")+m+
		       (html?"<font style=\"color:"+J.Css.tableRessources.trAvecPlanetes.color+"\">":"")+" C: "+(html?"</font>":"")+c+
			   (html?"<font style=\"color:"+J.Css.tableRessources.trAvecPlanetes.color+"\">":"")+" D: "+(html?"</font>":"")+d;
	}
	this.td=function(nbr)
	{		
		var td=J.createTd();
		td.appendChild(document.createTextNode(this.getString(nbr)));
		td.setAttribute("title", "(PT:"+(Math.ceil(nbr/5000))+" GT:"+(Math.ceil(nbr/25000))+")")
		td.style.width="85px";
		return td;
	}

	this.getTdM=function() {return this.td(this.M);}
	this.getTdC=function() {return this.td(this.C);}
	this.getTdD=function() {return this.td(this.D);}
	this.getTdTotal=function() {return this.td(this.total());}
	this.total=function() 
	{
		return this.M+this.C+this.D;
	}
}
J.resources.prototype.getString=function (nb) 
{
	var nbr=""+nb;
	var m="";
	while(nbr.length>3)
	{
		m=nbr.substring(nbr.length-3)+(m.length>0?'.'+m:'');
		nbr=nbr.substring(0, nbr.length-3);
	}
	m=nbr+(m.length>0?'.'+m:'');
	return m;
}

J.overview.parseUrl=function()
{
	var url = window.location.href;
	// http://uni4.ogame.fr/game/index.php?page=overview&session=54e9f184dd10
	var args=url.substring(url.indexOf("?")+1).split('&');
	var argsObj={};
	for(var arg in args)
	{
		if(J.undef(arg)) continue;
		var myArg=args[arg].split('=');
		if(J.undef(myArg)) continue;
//		if(J.undef(arf)) continue;
		argsObj[myArg[0]]=myArg[1];
	}
	if(J.undef(J.overview.sessionID)) J.overview.sessionID="unknown";
	if(!J.undef(argsObj["session"])) J.overview.sessionID=argsObj["session"];
	if(!J.undef(argsObj["page"])) J.overview.page=argsObj["page"];	
}

J.initPartage=function()
{
	var partage=document.getElementById("partage");
	if(partage==null)
	{
		partage=document.createElement("div");
		partage.id="partage";
		partage.style.display="none";
		document.body.appendChild(partage);
	}
	J.partage=partage;
}

J.overview.GM_Variables = 
{
	checkedResources:"J.overview.checkedResources",
	update:"J.overview.update",
	version : "J.overview.version",
	flyingShips:"J.overview.flyingShips",
}

J.tR={
	GM_Variables :
	{
		planets:"J.tR.planets", // Serialisation de l'ensemble des planètes (obsolète)
		planet:"J.tR.planet_", // une variable par planète : J.tR.planet_ + code_planète
		options:"J.tR.options", // serialisation des options
		planetsSessions : "J.tR.planetsSessions", // objet des planetes de la session, type {cpPlanetNonActive:false, cpPlanetActive:true, cpPlanetNonActive2:false }
		sessions : "J.tR.sessions",
		version : "J.tR.version",
		resources : "J.tR.resources",
	}
}



J.isEmpty=function(elt)
{
    for (var prop in elt) {
        if (elt.hasOwnProperty(prop)) return false;
    }
    return true;
};

J.getId = function(elt)
{
  if(!elt.id) {
	  var idNum=Math.floor(Math.random()*100000);
	  while(document.getElementById('autoId'+idNum))
		  idNum=Math.floor(Math.random()*100000);
	  elt.id='autoId'+idNum;
	}
  return elt.id;
}

J.getElementsByClassNameFrom = function(classe, elements)
{
	var elts=(elements && elements!= "undefined"?elements:document.getElementsByTagName("*"));
	var resultat=[];
	for(var i in elts)
		if(J.estDeClasse(elts[i], classe))resultat.push(elts[i]);
	return resultat;
}

J.estDeClasse = function(elt, classe)
{
	if(!elt.className ) return false;
	var classes=elt.className.split(" ");
	for(var i=0; i<classes.length; i++)
		if(classes[i] == classe) return true;
	return false;
}
J.estDeType = function(elt, type)
{
  return (elt && elt.tagName && elt.tagName.toLowerCase() == type.toLowerCase());
}
J.getChildsByType=function(parent, type, rec)
{
  var elts=new Array();
  var fils=parent.childNodes;
  for(var i=0; i<fils.length; i++)
  {
	  if(fils[i].nodeType != 1) continue;
	  if(J.estDeType(fils[i],type)) elts[elts.length]=fils[i];
	  if(rec) elts=elts.concat(J.getChildsByType(fils[i],type, true));
  }
  return elts;
}


J.register=function(elt,evt,func)
{
  if (document.addEventListener)
	elt.addEventListener(evt,func, false);
  else if (document.attachEvent)
	elt.attachEvent('on'+evt, func);
}


// From PHP.Js Library & modified	
function serialize(mixed_value){
	var _getType=function(inp){var type=typeof inp,match;var key;if(type=='object'&&!inp){return'null';}
		if(type=="object")
		{
		if(!inp.constructor){return'object';}
		var cons=inp.constructor.toString();
		match=cons.match(/(\w+)\(/);
		if(match){cons=match[1].toLowerCase();}
		var types=["boolean","number","string","array","date"];
		for(key in types){if(cons.toLowerCase()==types[key]){type=types[key];break;}}}
		return type;
	};
	var type=_getType(mixed_value);
	var val,ktype='';
	switch(type){
		case"function":val="";break;
		case"boolean":val="b:"+(mixed_value?"1":"0");break;
		case"number":val=(Math.round(mixed_value)==mixed_value?"i":"d")+":"+mixed_value;break;
		case"string":val="s:"+encodeURIComponent(mixed_value).length+":\""+encodeURIComponent(mixed_value)+"\"";break;
		case"date":val="t:"+mixed_value.getTime(); break;
		case"array":
		case"object":
			val="a";
			var count=0;
			var vals="";var okey;var key;
			for(key in mixed_value)
			{
				ktype=_getType(mixed_value[key]);if(ktype=="function"){continue;}
				okey=(key.match(/^[0-9]+$/)?parseInt(key,10):key);
				vals+=serialize(okey)+serialize(mixed_value[key]);count++;
			}
			val+=":"+count+":{"+vals+"}";break;
		case"undefined":
		default:val="N";break;
	}
	if(type!="object"&&type!="array"){val+=";";}
	return val;
}
// From PHP.Js Library & modified	
function unserialize(data){
	if(data==""||J.isEmpty(data))return {};
	var error=function(type,msg,filename,line){throw new this.window[type](msg,filename,line);};
	var read_until=function(data,offset,stopchr){
		var buf=[];
		var chr=data.slice(offset,offset+1);
		var i=2;
		while(chr!=stopchr) {
			if((i+offset)>data.length){error('Error','Invalid');}
			buf.push(chr);
			chr=data.slice(offset+(i-1),offset+i);
			i+=1;
		}
		return[buf.length,buf.join('')];
	};
	var read_chrs=function(data,offset,length){
		var buf;
		buf=[];
		for(var i=0;i<length;i++){
			var chr=data.slice(offset+(i-1),offset+i);
			buf.push(chr);
		}
		return[buf.length,buf.join('')];
	};
	var _unserialize=function(data,offset)
	{
		var readdata;var readData;var chrs=0;var ccount;var stringlength;var keyandchrs;var keys;
		if(!offset){offset=0;}
		var dtype=(data.slice(offset,offset+1)).toLowerCase();
		var dataoffset=offset+2;
		var typeconvert=new Function('x','return x');
		switch(dtype){
			case'i':typeconvert=function(x){return parseInt(x,10);};
				readData=read_until(data,dataoffset,';');
				chrs=readData[0];
				readdata=readData[1];
				dataoffset+=chrs+1;
				break;
			case'b':
				typeconvert=function(x){return parseInt(x,10)==1;};
				readData=read_until(data,dataoffset,';');
				chrs=readData[0];
				readdata=readData[1];
				dataoffset+=chrs+1;
				break;
			case'd':
				typeconvert=function(x){return parseFloat(x);};
				readData=read_until(data,dataoffset,';');
				chrs=readData[0];
				readdata=readData[1];
				dataoffset+=chrs+1;
				break;
			case't':
				typeconvert=function(x){var d=new Date(); d.setTime(x);return d;};
				readData=read_until(data,dataoffset,';');
				chrs=readData[0];
				readdata=readData[1];
				dataoffset+=chrs+1;
				break;
			case'n':
				readdata=null;
				break;
			case's':
				ccount=read_until(data,dataoffset,':');
				chrs=ccount[0];
				stringlength=ccount[1];
				dataoffset+=chrs+2;
				readData=read_chrs(data,dataoffset+1,parseInt(stringlength,10));
				chrs=readData[0];
				readdata=readData[1];
				dataoffset+=chrs+2;
				if(chrs!=parseInt(stringlength,10)&&chrs!=readdata.length){error('SyntaxError','String length mismatch');}
				readdata=decodeURIComponent(readdata);
				break;
			case'a':
				readdata={};
				keyandchrs=read_until(data,dataoffset,':');
				chrs=keyandchrs[0];
				keys=keyandchrs[1];
				dataoffset+=chrs+2;
				for(var i=0;i<parseInt(keys,10);i++){
					var kprops=_unserialize(data,dataoffset);
					var kchrs=kprops[1];
					var key=kprops[2];
					dataoffset+=kchrs;
					var vprops=_unserialize(data,dataoffset);
					var vchrs=vprops[1];
					var value=vprops[2];
					dataoffset+=vchrs;
					readdata[key]=value;
				}
				dataoffset+=1;
				break;
			default:
				error('SyntaxError','Unknown / Unhandled data type(s): '+dtype);
				break;
		}
		return[dtype,dataoffset-offset,typeconvert(readdata)];
	};
return _unserialize(data,0)[2];}



J.getResources=function(elt)
{
	var str=escape(elt.innerHTML);
	if(str.match(escape("title=\""+J.reperes[J.SERVER_LANG].getResources.titleTransporter))==null) return new J.resources(0,0,0);
	try 
	{
//		var flotte=str.substring(str.indexOf(escape("title=\"")));
//		flotte=flotte.substring(flotte.indexOf(escape(":")));
//		flotte=unescape(flotte.substring(0, flotte.indexOf("%22"))).replace(/([0-9]+)/g, "$1\n");

		var dest=unescape(str).match("\\[([0-9:]+)]", "g");
		var from=dest[0];
		var to=dest[1];
	}
	catch(e)
	{
		J.Debug('Impossible de récupérer les origines et destinations');
	}
	var M=parseInt(str.match(escape(J.reperes[J.SERVER_LANG].getResources.strMetal)+"%3A%20([0-9\.]+)")[1].replace(/\./g, ""));
	var C=parseInt(str.match(escape(J.reperes[J.SERVER_LANG].getResources.strCristal)+"%3A%20([0-9\.]+)")[1].replace(/\./g, ""));
	var D=parseInt(str.match(escape(J.reperes[J.SERVER_LANG].getResources.strDeut)+"%3A%20([0-9\.]+)")[1].replace(/\./g, ""));
	return new J.resources(M, C, D, from, to);
}

////////////////////////////////////////////////////////////FX A VOIR
// Ajoute un chkBox au parent, et met à jour le span de calcul 'span'
J.createChkBx=function(parent, ressources)
{

	var clk=function(){
		J.Ressources.calc(); 
	}
//	var add=function(id){
//		if(!document.span.elts)document.span.elts={};
//		document.span.elts[id]=document.ress[id];
//	}
	var chkbx=document.createElement("input");
	chkbx=parent.parentNode.insertBefore(chkbx, parent);
	chkbx=document.getElementById(J.getId(chkbx));
	chkbx.type="checkbox";
	chkbx.checked="checked";
	chkbx.value="b";
//	chkbx.add=add;
//	chkbx.rem=rem;
	chkbx.ressources=ressources;
	J.register(chkbx,"click", clk);
	if(J.Options.autoClick)
		J.register(chkbx, "mouseover", function(){this.click()});
	return chkbx;
}


J.estDeClasse = function(elt, classe)
{
	if(!elt.className ) return false;
	var classes=elt.className.split(" ");
	for(var i=0; i<classes.length; i++)
		if(classes[i] == classe) return true;
	return false;
}
J.GetClasses = function(elt)
{
	if(!elt) return [];
	return elt.className.split(" ");
}

J.Fleets.action.all.parseElt=
{
	fx:function(type, sstype) 
	{
		if(type=="return") this.style.fontStyle="italic";
		var ressources=J.getResources(this);
		if(ressources.total()==0)return;
		chkbx=J.createChkBx(this, ressources);
		J.Ressources[type][sstype][J.getId(chkbx)]=chkbx;
		if(typeof(ressources.to)!="undefined")
		{
			if(typeof(J.Ressources.to[ressources.to])=="undefined")J.Ressources.to[ressources.to]=[];
			J.Ressources.to[ressources.to].push(chkbx);
		}
		if(typeof(ressources.from)!="undefined")
		{
			if(typeof(J.Ressources.from[ressources.from])=="undefined")J.Ressources.from[ressources.from]=[];
			J.Ressources.from[ressources.from].push(chkbx);
		}
	}, 
	args:[]
}


// -----------  Flottes -------------
J.fleets4Ships=
{ 
	all:[],
	owndeploy:[] ,
	owntransport:[],
	ownharvest:[],
	ownattack:[],
	ownespionage:[]
}

J.saveFleets4Ships=function(type, sstype)
{
	J.fleets4Ships.all.push(this);
	J.fleets4Ships[sstype].push(this);
}

J.Fleets.action.flight.owndeploy.getFleets4Ships = {fx : J.saveFleets4Ships , args : []};
J.Fleets.action["return"].owndeploy.getFleets4Ships = {fx : J.saveFleets4Ships , args : []};
J.Fleets.action["return"].owntransport.getFleets4Ships = {fx : J.saveFleets4Ships , args : []};
J.Fleets.action["return"].ownharvest.getFleets4Ships = {fx : J.saveFleets4Ships , args : []};
J.Fleets.action["return"].ownattack.getFleets4Ships = {fx : J.saveFleets4Ships , args : []};
J.Fleets.action["return"].ownespionage.getFleets4Ships = {fx : J.saveFleets4Ships , args : []};
J.Fleets.action["return"].ownhold.getFleets4Ships = {fx : J.saveFleets4Ships , args : []};
		


// ---------- Fin flottes ---------------

	// Crée un tr représentant une action, classes=["flight", "ownharvest"]; texte éventuellement null => traduction des classes
J.createTrAction=function(classes, text, fonction, chkchecked)
{
if(typeof(chkchecked)=="undefined")chkchecked=false;

	var nbr=0;
	
	var tr=J.createTr();
	tr.style.fontWeight=J.Css.tableRessources.trChecked.bold?"bold":"";
	tr.style.color=J.Css.tableRessources.trChecked.color;
	tr.style.display=J.Css.tableRessources.trChecked.display?"":"none";
	
	var td=J.createTdTh();
	td.className=J.Css.tableRessources.entetes.className;

	var strtmp,texte="", texteClasses="";
	for(var i=0; i<classes.length; i++)
	{
		strtmp=J.Lang.getStr(classes[i]);
		if(typeof(strtmp)!="undefined") texte+=strtmp;
		else texte+=classes[i];
		texteClasses+=classes[i];
		if(i+1<classes.length) {texte+=" ";texteClasses+=" ";}
	}
	var tot;
	if(classes[0]=="flight"||classes[0]=="return")
	{
		tot=new J.resources(0,0,0);
		for(var id in J.Ressources[classes[0]][classes[1]])
		{
			var chkbx2=J.Ressources[classes[0]][classes[1]][id];
			if(!chkchecked||chkbx2.checked==true)
			{
				nbr++;
				tot=tot.plus(chkbx2.ressources);
			}
		}
	}

	var txt=document.createTextNode(texte);
	if(tot.total()==0){tr.style.display="none"; return null; }
	td.appendChild(text!=null?document.createTextNode(text):txt);
	td.appendChild(document.createTextNode(" ("+nbr+")"));
	tr.appendChild(td);
	tr.appendChild(tot.getTdM());
	tr.appendChild(tot.getTdC());
	tr.appendChild(tot.getTdD());
	tr.appendChild(tot.getTdTotal());
	

	return [tr, tot];
}

J.fxOptionInput=function()
{
	var variable=this.getAttribute("option");
	J.set(variable, this.value);
	var chemin=this.getAttribute("chemin");
	if(chemin!=null)
		eval(chemin+"='"+this.value+"'");
	J.Ressources.calc();
	
}

J.createTxt = function(txt) { return document.createTextNode(txt)}
J.createTr = function() { var tr=document.createElement("tr"); tr.setAttribute("style",J.Options.styleTr); return tr;}
J.createTd = function() { var td=document.createElement("td"); td.setAttribute("style",J.Options.styleTd); return td; }
J.createTh = function() { var th=document.createElement("th"); th.setAttribute("style",J.Options.styleTh); return th; }
J.createTable = function() { var tbl=document.createElement("table"); return tbl; }
J.createTdTh = function() 
{ 
	var th=document.createElement(J.Css.tableRessources.entetes.tdTh); 
	if(J.Css.tableRessources.entetes.tdTh=="td")
		th.setAttribute("style",J.Options.styleTd); 
	else
		th.setAttribute("style",J.Options.styleTh); 
	return th; 
}

J.calculRessourcesDestination=function(dest)
{
	var dest="["+dest.replace(/\[/g, "").replace(/]/g, "")+"]";
	var res=new J.resources(0,0,0);
	if(typeof(J.Ressources.to[dest])!="undefined")
	{
		for(var i=0;i<J.Ressources.to[dest].length;i++)
		{
			res=res.plus(J.Ressources.to[dest][i].ressources);
		}
	}
	return res;
}

J.overview.parse=function()  
{
	// Parse les éléments span de missions.
	var parseMissions=function() 
	{
		// if(document.getElementById("content"))
		// { // V 0.84
			listeElements 	= document.getElementsByTagName('span');
			var tmpTableau, tmpName, tmpElt;
			for (var i = 0; i < listeElements.length; i++)
			{
				tmpElt=listeElements[i];
				if(tmpElt.className.indexOf(J.Fleets.STRFLIGHT)>=0)
				{
					tmpName=tmpElt.className.substr(J.Fleets.STRFLIGHT.length);
					if(tmpName.length>0 && typeof(J.Fleets.flight[tmpName]) != "undefined")
					{
						tmpTableau=J.Fleets.flight[tmpName];
						tmpTableau[tmpTableau.length]=tmpElt;
					}
				} else if(tmpElt.className.indexOf(J.Fleets.STRRETURN)>=0)
				{
					tmpName=tmpElt.className.substr(J.Fleets.STRRETURN.length);
					if(tmpName.length>0 && typeof(J.Fleets.flight[tmpName]) != "undefined")
					{
						tmpTableau=J.Fleets["return"][tmpName];
						tmpTableau[tmpTableau.length]=tmpElt;
					}
				} else continue;
			}
		// }
		// else 
		// {
			
		// }
	}
	// Execute les actions de type type (flight ou return)
	var executeActions=function(type) 
	{
		var fxx, span;
		for(var sstype in J.Fleets[type])
			if(J.Fleets[type][sstype].length>0)
			{
				for(var i=0; i<J.Fleets[type][sstype].length; i++)
				{
					span=J.Fleets[type][sstype][i];
					for(var fx in J.Fleets.action[type][sstype])
						try {
							fxx=J.Fleets.action[type][sstype][fx];
							fxx.fx.apply(span, [type, sstype].concat(fxx.args));
						} catch(exc){throw exc}
					for(var fx in J.Fleets.action.all)
						try {
							fxx=J.Fleets.action.all[fx];
							fxx.fx.apply(span, [type, sstype].concat(fxx.args));
						} catch(exc){throw exc}
				}
			}
	}
	var getTdEvt=function() 
	{
//				if(escape(tds[i].innerHTML).toLowerCase().indexOf(escape(J.reperes[J.SERVER_LANG].getTdEvenements.strEvts))!=-1)

		var tds=document.getElementsByTagName("td");
		for(var i=0;i<tds.length; i++)
			if(escape(tds[i].innerHTML).toLowerCase().indexOf(escape(J.reperes[J.SERVER_LANG].getTdEvenements.strEvts).toLowerCase())!=-1)
			{
				return tds[i];
			}
			
		// V 1.0
		if(document.getElementById('inhalt'))
		{
			var d=document.getElementById('inhalt');
			var div=document.createElement('div');
			div.style.width='100%';
			div.id="divEvenements";
			div.style.backgroundColor='#334466';
			d.insertBefore(div, d.firstChild);
			var table=document.createElement('table');
			div.appendChild(table);
			table.style.zIndex="999";
			var tr=document.createElement('tr');
			table.appendChild(tr);
			var td=document.createElement('td');
			tr.appendChild(td);
			td.id="tdEvenements";
			return td;
		}
		throw "Impossible de récupérer le <TD> Evènements.";
		return null;
	}

	
	
	var prepareTdEvt = function()
	{
		var tdEvenements=document.getElementById("tdEvenements") || getTdEvt();
		tdEvenements.id="tdEvenements";
		var spanJOG=document.getElementById("spanJOG");
		if(spanJOG==null)
		{
			spanJOG=document.createElement("span");
			spanJOG.id="spanJOG";
			tdEvenements.appendChild(J.createTxt(" - "))
			tdEvenements.appendChild(spanJOG);
		}
		var spanExtensions=document.getElementById("extensionsBarreEvenements");
		if(spanExtensions==null)
		{
			spanExtensions=document.createElement("span");
			spanExtensions.id="extensionsBarreEvenements";
			spanJOG.appendChild(spanExtensions);
		}
		var spanOptions=document.getElementById("optionsJogScripts");
		var tdOptions=document.getElementById("tdTableauOptionsJog");
		if(spanOptions==null)
		{
			spanOptions=document.createElement("span");
			spanOptions.id="optionsJogScripts";
			spanOptions.innerHTML="Options";
			spanOptions.style.cursor="pointer"			
			spanJOG.insertBefore(spanOptions, spanExtensions);
			var tdOptions=creerTableauOptions();
			tdOptions.parentNode.style.display="none";
			tdOptions.style.textAlign="center"
			try
			{
				spanOptions.style.color=J.Css.tableRessources.trAvecPlanetes.color;
				J.register(spanOptions, "click",  function()
				{
					afficherTableauOptions();
				})
			}catch(e){}
		}
		
		var input=document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("value", J.Lang.getStr("showOptions"));
		input.style.textAlign="center";
		tdOptions.appendChild(input);
		J.register(input, "click", createTableOptionsJog);

		
		return {tdEvenements:tdEvenements, spanJOG:spanJOG, spanExtensions:spanExtensions, spanOptions:spanOptions, tdOptions:tdOptions};
	//		spanExtensions.innerHTML="Ressources - Options";
		
	}


	var creerTableauOptions=function()
	{
		if(document.getElementById("trTableauOptionsJog")==null)
		{
			var table=afficherTableau("trTableauOptionsJog", "tdTableauOptionsJog", document.getElementById("tdEvenements").parentNode);
			if (table!=null)document.getElementById("tdTableauOptionsJog").removeChild(table);
		}
		return document.getElementById("tdTableauOptionsJog");
	}
	var afficherTableauOptions=function()
	{
		var tr=document.getElementById("trTableauOptionsJog");
		if(tr.style.display=="none") tr.style.display="";
		else tr.style.display="none";
	}
	var afficherTableau=function(trId, tdId, previousSibling)
	{
		var tr=document.getElementById(trId);
		if(tr!=null)
		{
			tr.parentNode.removeChild(tr);
			return null;
		}
		var td;
		tr=J.createTr();
		td=J.createTd();
		td.setAttribute("colspan", 5);
		td.id=tdId;
		var tbl=J.createTable();
		tbl.style.margin="auto";
		td.appendChild(tbl);
		tr.appendChild(td);
		tr.id=trId;
		previousSibling.parentNode.insertBefore(tr, previousSibling.nextSibling);
		return tbl;
	}


	// Crée le span d'affichage 
	var createSpanRessources=function() 
	{
		var spans=prepareTdEvt();
		var tdEvenements=document.getElementById("tdEvenements") || getTdEvt();
		tdEvenements.id="tdEvenements";
		
		try{
		// Carré rouge
		var spanActions=document.createElement("span");
//		var spanActions=document.createElement("td");
		spanActions.style.backgroundColor="#ee2222";
//		spanActions.style.paddingLeft="15px";
		
		if(document.getElementById("content"))
		{ // V 0.84
			spanActions.style.left=(parseInt(document.getElementById("content").offsetWidth)/2+parseInt(spans.tdEvenements.offsetWidth)/2-25)+"px";
		}
		else
		{ // V 1.0
			spanActions.style.left=(parseInt(document.getElementById("divEvenements").offsetWidth)-25)+"px";
		}
		spanActions.style.width="15px";
		spanActions.style.height="15px";
		spanActions.style.position="absolute";
		spanActions.id="spanActions";
		spans.tdEvenements.appendChild(spanActions);
		}catch(e){alert(e.message)}

		// Emplacement ressources
		var span1=document.createElement("span");
		span1.innerHTML="<b id=\"spanSpanRessourcesTransit\" style=\"color:"+J.Css.tableRessources.trAvecPlanetes.color+"\">"+J.Lang.getStr("ressourcesEnTransit")+": </b>";
		span1.id="spanRessourcesTransit";
		spans.spanJOG.insertBefore(span1, spans.spanOptions);
		var spanRessources=document.createElement("span");
		spanRessources.id="";
		span1.appendChild(spanRessources);		
		J.Ressources.spanRessources=spanRessources;

		spans.spanJOG.insertBefore(J.createTxt(" - "), spans.spanOptions);
		
		var spanFleet=document.createElement("span");
		spanFleet.innerHTML="F";
		spanFleet.id="JOG_spanFleet";
		spanFleet.style.color=J.Css.tableRessources.trAvecPlanetes.color;
		spans.spanJOG.insertBefore(spanFleet, spans.spanOptions);
		spans.spanJOG.insertBefore(J.createTxt(" - "), spans.spanOptions);

		J.register(spanActions, "mouseover", function()
		{
			if(document.getElementById("divActions")==null)
			{
				creerDivRessources();
				createCheckBoxesActions();
				createCheckBoxesProvenance();
				createCheckBoxesDestination();
				J.Ressources.calc();
			}
			document.getElementById("divActions").style.display="";
		});
		J.register(document.getElementById("spanSpanRessourcesTransit"), "click", afficherTableauRecap);
		spanFleet.setAttribute("title", J.Lang.getStr("flyingShips"));
		J.register(spanFleet, "click", afficherFleet);
		spanFleet.style.cursor="pointer";
		
		document.getElementById("spanSpanRessourcesTransit").style.cursor="pointer";
		return spanRessources;
	}
	
	var getRessourcesPlaneteActive=function()
	{
		var firstChild=function(elt)
		{
			var i=1;
			var child=elt.firstChild;
			while(child.nodeType!=null && child.nodeType!=1)child=child.nextSibling;
			return child;
		}
		var childNode=function(elt, num)
		{
			var i=-1;
			var j=0;
			
			var child=elt.firstChild;
			while( child!=null && num>i)
			{
				if(child.nodeType==1 && (++i)==num) return child;
				child=child.nextSibling;
			}
			return null;
		}
		
		try 
		{
			var ress=document.getElementById("resources");
			var i=0;
			ress=firstChild(ress);
			ress=childNode(ress, 2);
			var M=parseInt((firstChild(firstChild(ress)).innerHTML).replace(/\./g, ""));
			var C=parseInt((firstChild(childNode(ress, 1)).innerHTML).replace(/\./g, ""));
			var D=parseInt((firstChild(childNode(ress, 2)).innerHTML).replace(/\./g, ""));
			J.Ressources.ressourcesPlaneteActive=new J.resources(M,C,D);

			}catch(e)
		{
			J.debug("getRessourcesPlaneteActive:\n"+e);
		}
	}
	var afficherTableauRecap=function()
	{
		if(J.Ressources.ressourcesPlaneteActive==null)
			getRessourcesPlaneteActive();
		var tr=document.getElementById("trTableauRecap");
		if(tr!=null)
		{
			tr.parentNode.removeChild(tr.nextSibling);
			tr.parentNode.removeChild(tr.nextSibling);
			tr.parentNode.removeChild(tr);
//			if(tr.style.display=="none")
//				tr.style.display="";
//			else tr.style.display="none";
			return;
		}
		var evts=document.getElementById("tdEvenements").parentNode;
		tr=J.createTr();
		
		var td=J.createTd();
		td.setAttribute("colspan", 5);
		td.id="tdTableauRecap";
		tr.appendChild(td);
		tr.id="trTableauRecap";
		evts.parentNode.insertBefore(tr, evts.nextSibling);
		
		tr=J.createTr();
		td=J.createTd();
		td.setAttribute("colspan", 5);
		td.id="tdBtOptionsOGOverview";
		td.style.textAlign="center";
		tr.appendChild(td);
		evts.parentNode.insertBefore(tr, document.getElementById("trTableauRecap").nextSibling);
		
		tr=J.createTr();
		td=J.createTd();
		td.setAttribute("colspan", 5);
		td.id="tdOptionsOGOverview";
		td.style.display="none";
		td.style.textAlign="center";
		tr.appendChild(td);
		evts.parentNode.insertBefore(tr, document.getElementById("trTableauRecap").nextSibling.nextSibling);
		
		var table=document.createElement("table");
		var tr=J.createTr();
		tr.setAttribute("style", tr.getAttribute("style")+";font-weight:bold");
		var tdTh=J.createTdTh();
		var a=document.createElement("a");
		a.innerHTML=J.Lang.getStr("missions");
		a.setAttribute("href", "http://userscripts.org/scripts/show/42338");
		a.setAttribute('title',J.Lang.getStr("sourceDuScript"));
		a.setAttribute('target',"blank");
		tdTh.appendChild(a);
		tdTh.appendChild(J.createTxt(" "));
		var a=document.createElement("a");
		a.innerHTML="("+J.Lang.getStr("MAJ")+")";
		a.setAttribute("href", "http://userscripts.org/scripts/source/42338.user.js");
		a.setAttribute('title',J.Lang.getStr("lastVersion"));
		a.setAttribute('target',"blank");



		if(J.overview.update && J.overview.update.need)
		{
			a.style.color="#ff0000";
			a.style.fontWeight="bold";
			a.style.backgroundColor="#fff";
			a.setAttribute('title',J.Lang.getStr("lastVersion")+ " : "+J.overview.update.version);
		}

		tdTh.appendChild(a);
		tr.appendChild(tdTh);
		var th=J.createTh();
		th.appendChild(J.createTxt(J.Lang.getStr("metal")));
		tr.appendChild(th);
		var th=J.createTh();
		th.appendChild(J.createTxt(J.Lang.getStr("cristal")));
		tr.appendChild(th);
		var th=J.createTh();
		th.appendChild(J.createTxt(J.Lang.getStr("deut")));
		tr.appendChild(th);
		var th=J.createTh();
		th.appendChild(J.createTxt(J.Lang.getStr("total")));
		tr.appendChild(th);
		table.appendChild(tr);
		table.setAttribute("width", 500);
		var total=new J.resources(0,0,0);
		var tmp;
		for(var sstype in J.Ressources.flight)
		{
			if(J.isEmpty(J.Ressources.flight[sstype])) continue;
			tmp=J.createTrAction(["flight", sstype],null,  function(){});
			if(tmp==null) continue;
			total=total.plus(tmp[1]);
			tmp[0].style.display=J.Css.tableRessources.trStatiques.display?"":"none";
			tmp[0].style.fontWeight=J.Css.tableRessources.trStatiques.bold?"bold":"";
			tmp[0].style.color=J.Css.tableRessources.trStatiques.color;
			table.appendChild(tmp[0]);
		}
		
		for(var sstype in J.Ressources["return"])
		{
			if(J.isEmpty(J.Ressources["return"][sstype])) continue;
			tmp=J.createTrAction(["return", sstype],null,  function(){});
			if(tmp==null) continue;
			total=total.plus(tmp[1]);
			tmp[0].style.display=J.Css.tableRessources.trStatiques.display?"":"none";
			tmp[0].style.fontWeight=J.Css.tableRessources.trStatiques.bold?"bold":"";
			tmp[0].style.color=J.Css.tableRessources.trStatiques.color;
			table.appendChild(tmp[0]);
		}

		
		tr=J.createTr();
		var td2=J.createTdTh();
		td2.appendChild(document.createTextNode(J.Lang.getStr("total")+" : "));
		tr.appendChild(td2);
		tr.appendChild(total.getTdM());
		tr.appendChild(total.getTdC());
		tr.appendChild(total.getTdD());
		tr.appendChild(total.getTdTotal());
		tr.style.color=J.Css.tableRessources.trTotal.color;
		tr.style.fontWeight=J.Css.tableRessources.trTotal.bold?"bold":"";
		tr.style.display=J.Css.tableRessources.trTotal.display?"":"none";
		table.appendChild(tr);

		// Recupération des totaux de ressources si OG Transfert
		try {
			var retourcesTotal="";
			var sessionsString=J.getPartage(J.tR.GM_Variables.sessions, null);
			var sessions=null;
			var resSession=null;
			if(sessionsString!=null)sessions=unserialize(sessionsString);
			if(sessions!=null && !J.undef(sessions[J.overview.sessionID]) 
				&&!J.undef(sessions[J.overview.sessionID].totalResources ))
			{
				resSession=sessions[J.overview.sessionID].totalResources;
			}
			if(sessions!=null && !J.undef(sessions[J.overview.sessionID]) && !J.undef(sessions[J.overview.sessionID].totalResources))
			{
				var resourcesTotal=new J.resources(resSession.M, resSession.C, resSession.D);
				
				var somme=resourcesTotal.plus(total);
				tr=J.createTr();
				td2=J.createTdTh();
				td2.appendChild(document.createTextNode(J.Lang.getStr("avecPlanetes")+" :"))
				tr.appendChild(td2);
				tr.appendChild(somme.getTdM());
				tr.appendChild(somme.getTdC());
				tr.appendChild(somme.getTdD());
				tr.appendChild(somme.getTdTotal());
				tr.style.fontWeight=J.Css.tableRessources.trAvecPlanetes.bold?"bold":"";
				tr.style.color=J.Css.tableRessources.trAvecPlanetes.color;
				tr.style.display=J.Css.tableRessources.trAvecPlanetes.display?"":"none";
				table.appendChild(tr);
			}
		} 
		catch(e)
		{
			if(
			document.getElementById("ResourcesDiv")!=null && document.getElementById("planetResources")!=null)
			{
				var getRes=function(id) {return parseInt(document.getElementById(id).innerHTML.toString().replace(/\./g, "")); }
				var resourcesTotal=new J.resources(getRes("MetalTotal"),getRes("CrystalTotal"), getRes("DeuteriumTotal"));
				var somme=resourcesTotal.plus(total);
				tr=J.createTr();
				td2=J.createTdTh();
				td2.appendChild(document.createTextNode(J.Lang.getStr("avecPlanetes")+" :"))
				tr.appendChild(td2);
				tr.appendChild(somme.getTdM());
				tr.appendChild(somme.getTdC());
				tr.appendChild(somme.getTdD());
				tr.appendChild(somme.getTdTotal());
				tr.style.fontWeight=J.Css.tableRessources.trAvecPlanetes.bold?"bold":"";
				tr.style.color=J.Css.tableRessources.trAvecPlanetes.color;
				tr.style.display=J.Css.tableRessources.trAvecPlanetes.display?"":"none";
				table.appendChild(tr);
			}
		}
		
		// Ressources checkées

		table.style.width="500px";
		var center=document.createElement("center");
		center.appendChild(table);
		var table=document.createElement("table");
		table.setAttribute("width", 500);
		table.id="tableRessourcesCheckees";
		center.appendChild(table);
		table=document.createElement("table");
		table.setAttribute("width", 500);
		table.id="tableCalcul";
		center.appendChild(table);

		document.getElementById("tdTableauRecap").appendChild(center);
		J.Ressources.calc();
		
		
		
		var td=document.getElementById("tdBtOptionsOGOverview");
		
		var input=document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("value", J.Lang.getStr("showCalcul"));
		input.style.textAlign="center";
		input.id="inputShowCalcul";
		td.appendChild(input);
		J.register(input, "click", 
				function(){
					J.Options.dispCalculs=!J.Options.dispCalculs;
					this.setAttribute("value",J.Options.dispCalculs? J.Lang.getStr("hideCalcul"): J.Lang.getStr("showCalcul"));
					J.Ressources.calc();
					});
		
		var input=document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("value", J.Lang.getStr("showOptions"));
		input.style.textAlign="center";
		td.appendChild(input);
		J.register(input, "click", createTableOptionsOver);
		J.Ressources.calc();
	}
	

	var afficherFleet=function()
	{
		var ships=calculerFleets();
		var evts=document.getElementById("tdEvenements").parentNode;
		var table=afficherTableau("trOgOverviewFlottes", "tdOgOverviewFlottes", evts);
		if(table==null)return;
		var tdFlottes=document.getElementById("tdOgOverviewFlottes");
		tdFlottes.style.textAlign="center";
		table.style.fontWeight="bold";
		var tr=J.createTr();
		table.appendChild(tr);
		var td=J.createTdTh();
		td.innerHTML=J.Lang.getStr("ships");
		td.style.minWidth="80px"
		tr.appendChild(td);
		td=J.createTdTh();
		td.innerHTML=J.Lang.getStr("quantity");
		
		td.style.minWidth="60px"
		tr.appendChild(td);
		for(var ship in ships)
		{
			var tr=J.createTr();
			table.appendChild(tr);
			var td=J.createTdTh();
			td.innerHTML=ship;
			tr.appendChild(td);
			td=J.createTdTh();
			td.innerHTML=ships[ship];
			tr.appendChild(td);
		}
		tdFlottes.appendChild(table);
		
		J.set(J.overview.GM_Variables.flyingShips, serialize(ships));
		
	}
	var calculerFleets=function()
	{
		var ships={};
		try 
		{
		for(var span =0;span<J.fleets4Ships.all.length;span++)
		{
			try 
			{
				var a=J.getChildsByType(J.fleets4Ships.all[span], "a", false)[1];
				var over=a.getAttribute("title")
				var reg=new RegExp("([^0-9]+) ([0-9\\.]+)", "g");
				if(!reg.test(over)) return;
				var res=over.match(reg);
				for(var i=0;i<res.length;i++)
				{
					var res2=res[i].toString().match(reg);
					if(typeof(ships[RegExp.$1])=="undefined")
						ships[RegExp.$1]=parseInt(RegExp.$2.replace(/\./g, ""));
					else ships[RegExp.$1]+=parseInt(RegExp.$2.replace(/\./g, "")); 
				}
			}catch(e){}
		}
		}catch(e){}
		return ships;
	}
	
	var createTableOptionsJog=function()
	{
		var tr;
		var table=afficherTableau('trOptionsOverview', 'tdOptionsOverview', document.getElementById("trTableauOptionsJog"));
		if(table!=null) 
		{
			document.getElementById('tdOptionsOverview').removeChild(table);
			createTableOptions("tdOptionsOverview");
		}
		
	}
	var createTableOptionsOver=function()
	{
		createTableOptions("tdOptionsOGOverview");
	}
	var createTableOptions=function(idTd)
	{
		var td=document.getElementById(idTd);
		if(td.childNodes.length>0){td.innerHTML="";td.style.display="none";return;}
		td.style.display="";
		var table=document.createElement("table");
		var creerTrSimple=function(txt)
		{
			var tr=J.createTr();
			var td=J.createTdTh();
			td.appendChild(document.createTextNode(txt));
			td.style.fontWeight="bold";
			tr.appendChild(td);
			return tr;
		}
		if(J.getPartage(J.tR.GM_Variables.version, "") == "")
		{
			var tr=creerTrSimple(J.Lang.getStr("ogTotalResources1"));
			tr.style.color="yellow";
			var td1=tr.firstChild;
			td1.setAttribute("colspan", 5);
			td1.appendChild(document.createElement("br"));
			td1.innerHTML+=J.Lang.getStr("ogTotalResources2");
			td1.appendChild(document.createElement("br"));
			td1.innerHTML+="<a href=\"http://userscripts.org/scripts/show/53190\">"+J.Lang.getStr("scriptDescription")+"Description du script</a> - <a href=\"http://userscripts.org/scripts/source/53190.user.js\">"+J.Lang.getStr("scriptInstall")+"Installer le script</a><br/>"
			td1.appendChild(document.createElement("br"));
			table.appendChild(tr)
		}

		if(J.tempsChargementOgOverview!=null)
			table.appendChild(creerTrSimple( J.Lang.getStr("tempsChargement")+" : "+J.tempsChargementOgOverview.toLocaleString() +" ms"));
		table.appendChild(creerTrSimple( J.Lang.getStr("general")+" :"));
		
		
		
		var tr=createRadioLangOption(
			"Options_Lang",
			J.Lang.getStr("language"), 
			"J.Lang.actualLang"
			);
		table.appendChild(tr);
		
		var tr=createChechBoxOption(
			"Options_AutoClick", 
			" "+J.Lang.getStr("activerAutoclick"), 
			"J.Options.autoClick");
		table.appendChild(tr);

		var tr=createChechBoxOption(
			"Options_DispDetails", 
			" "+J.Lang.getStr("dispDetails"), 
			"J.Options.dispDetails");
		table.appendChild(tr);

		var tr=createChechBoxOption(
			"Options_DispCalculs", 
			" "+J.Lang.getStr("dispCalculs"), 
			"J.Options.dispCalculs");
		table.appendChild(tr);

		var tr=createChechBoxOption(
			"Options_AutoUpdate", 
			" "+J.Lang.getStr("autoUpdate"), 
			"J.Options.autoUpdate");
		table.appendChild(tr);

		var tr=createRadioOption(
			"Options_EntetesTdTh",
			J.Lang.getStr("typeDeTableau"), 
			"J.Css.tableRessources.entetes.tdTh",
			{td:"td", th:"th"}
			);
		table.appendChild(tr);
		
//		var tr=createInputOption(
//			"Options_EntetesTdTh", 
//			" "+J.Lang.getStr("typeDeTableau"), 
//			"J.Css.tableRessources.entetes.tdTh");
//		table.appendChild(tr);
		
		var tr=createInputOption(
			"Options_EntetesClassName", 
			" "+J.Lang.getStr("classeDesTr"), 
			"J.Css.tableRessources.entetes.className");
		table.appendChild(tr);
		
		
		
		var tr=createInputOption(
			"Options_StyleTr", 
			" "+J.Lang.getStr("styleTr"), 
			"J.Options.styleTr");
		table.appendChild(tr);
		var tr=createInputOption(
			"Options_StyleTd", 
			" "+J.Lang.getStr("styleTd"), 
			"J.Options.styleTd");
		table.appendChild(tr);

		var tr=createInputOption(
			"Options_StyleTh", 
			" "+J.Lang.getStr("styleTh"), 
			"J.Options.styleTh");
		table.appendChild(tr);

		var tr=J.createTr();
		var tdd=J.createTdTh();
		tdd.appendChild(J.createTxt("(Ex : font-size:10px;color:red;)"));
		tr.appendChild(tdd);
		table.appendChild(tr);

		
// Tr statiques		
		table.appendChild(creerTrSimple(J.Lang.getStr("ligneTotauxParMissionIndividuels")+ " :"));
		var tr=createChechBoxOption(
			"Options_AfficherTrStatique", 
			" "+J.Lang.getStr("display"), 
			"J.Css.tableRessources.trStatiques.display");
		table.appendChild(tr);

		var tr=createChechBoxOption(
			"Options_TrStatiqueBold", 
			" "+J.Lang.getStr("afficherEnGras"), 
			"J.Css.tableRessources.trStatiques.bold");
		table.appendChild(tr);
		
		var tr=createInputOption(
			"Options_TrStatiqueColor", 
			" "+J.Lang.getStr("color"), 
			"J.Css.tableRessources.trStatiques.color");
		table.appendChild(tr);

// Tr Total		
		table.appendChild(creerTrSimple( J.Lang.getStr("ligneTotalTransporte")+" :"));
		var tr=createChechBoxOption(
			"Options_AfficherTrTotal", 
			" "+J.Lang.getStr("display"), 
			"J.Css.tableRessources.trTotal.display");
		table.appendChild(tr);

		var tr=createChechBoxOption(
			"Options_TrTotalBold", 
			" "+J.Lang.getStr("afficherEnGras"), 
			"J.Css.tableRessources.trTotal.bold");
		table.appendChild(tr);
		
		var tr=createInputOption(
			"Options_TrTotalColor", 
			" "+J.Lang.getStr("color"), 
			"J.Css.tableRessources.trTotal.color");
		table.appendChild(tr);

// Tr Total avec planetes		
		if(document.getElementById("ResourcesDiv")!=null && document.getElementById("planetResources")!=null)
		{
			table.appendChild(creerTrSimple(J.Lang.getStr("ligneTotalTransportePlusPlanetes")+" :"));
			var tr=createChechBoxOption(
				"Options_AfficherTrTotalAvecPlanetes", 
			" "+J.Lang.getStr("display"), 
				"J.Css.tableRessources.trAvecPlanetes.display");
			table.appendChild(tr);

			var tr=createChechBoxOption(
				"Options_TrTotalAvecPlanètesBold", 
			" "+J.Lang.getStr("afficherEnGras"), 
				"J.Css.tableRessources.trAvecPlanetes.bold");
			table.appendChild(tr);

			var tr=createInputOption(
				"Options_TrTotalAvecPlanetesColor", 
			" "+J.Lang.getStr("color"), 
				"J.Css.tableRessources.trAvecPlanetes.color");
			table.appendChild(tr);
		}

		// Tr trChecked		
		table.appendChild(creerTrSimple( J.Lang.getStr("ligneTotauxParMissionIndividuelsCheckees")+" :"));
		var tr=createChechBoxOption(
			"Options_AfficherTrChecked", 
			" "+J.Lang.getStr("display"), 
			"J.Css.tableRessources.trChecked.display");
		table.appendChild(tr);

		var tr=createChechBoxOption(
			"Options_TrCheckedBold", 
			" "+J.Lang.getStr("afficherEnGras"), 
			"J.Css.tableRessources.trChecked.bold");
		table.appendChild(tr);
		
		var tr=createInputOption(
			"Options_TrCheckedColor", 
			" "+J.Lang.getStr("color"), 
			"J.Css.tableRessources.trChecked.color");
		table.appendChild(tr);

		// Tr trTotalChecked		
		table.appendChild(creerTrSimple(J.Lang.getStr("ligneTotalDesMissionsCheckees")+" :"));
		var tr=createChechBoxOption(
			"Options_AfficherTrTotalChecked", 
			" "+J.Lang.getStr("display"), 
			"J.Css.tableRessources.trTotalChecked.display");
		table.appendChild(tr);

		var tr=createChechBoxOption(
			"Options_TrTotalCheckedBold", 
			" "+J.Lang.getStr("afficherEnGras"), 
			"J.Css.tableRessources.trTotalChecked.bold");
		table.appendChild(tr);
		
		var tr=createInputOption(
			"Options_TrTotalCheckedColor", 
			" "+J.Lang.getStr("color"), 
			"J.Css.tableRessources.trTotalChecked.color");
		table.appendChild(tr);

// Tr AvecPlaneteActive
		table.appendChild(creerTrSimple( J.Lang.getStr("ligneTotalDesMissionsCheckeesPlusPlaneteActive")+" :"));
		var tr=createChechBoxOption(
			"Options_AfficherTrTotalAvecPlaneteActive", 
			" "+J.Lang.getStr("display"), 
			"J.Css.tableRessources.trAvecPlanetes.display");
		table.appendChild(tr);

		var tr=createChechBoxOption(
			"Options_TrTotalAvecPlaneteActiveBold", 
			" "+J.Lang.getStr("afficherEnGras"), 
			"J.Css.tableRessources.trAvecPlanetes.bold");
		table.appendChild(tr);

		var tr=createInputOption(
			"Options_TrTotalAvecPlaneteActiveColor", 
			" "+J.Lang.getStr("color"), 
			"J.Css.tableRessources.trAvecPlanetes.color");
		table.appendChild(tr);

		
		table.appendChild(creerTrSimple( J.Lang.getStr("tableauSelectionRapide")+" :"));
		var tr=createInputOption(
			"Options_SelectionRapideColor", 
			" "+J.Lang.getStr("color"), 
			"J.Css.tableSelectionRapide.color");
		table.appendChild(tr);


		
		
		var center=document.createElement("center");
		center.appendChild(table);
		td.appendChild(center);
	}
	
	var fxOptionChkbx=function()
	{
		var variable=this.getAttribute("option");
		J.set(variable, this.checked);
		var chemin=this.getAttribute("chemin");
		eval(chemin+"="+this.checked);
		J.Ressources.calc();
	}
	
	var creerDivRessources=function()
	{
		var spanActions=document.getElementById("spanActions");
		
		//// Définition de la boite englobante. -----------------------
		var div=document.createElement("table");

		div.id="divActions";
		//		div.style.backgroundColor="#FFFF00";
		div.style.position="absolute";
		div.style.top="15px";
		div.style.right="-10px";
		div.style.width="380px";
		div.style.zIndex=3001;
		div.style.display="none";
		div.style.color=J.Css.tableSelectionRapide.color;
		

		var tr=J.createTr();
		var td=J.createTd();
		td.appendChild(J.createTxt(J.Lang.getStr("ressourcesTransportees")+" :"));
		td.className="c";
		tr.appendChild(td);
		div.appendChild(tr);
		//// ------------------------------------------------------------
		
		//// Définition de la première ligne. ---------------------------
		tr=J.createTr();
		td=J.createTd();
//		td.style.padding="25px";
//		td.id="tdRessourcesTransportees";
		var label=createChechBoxAction(["Tous"], J.Lang.getStr("tous"), function(){
				var td=document.getElementById("tdRessourcesTransportees");
				var elt;
				try {
				for(var i=0;i<td.childNodes.length; i++)
					if(J.estDeType(td.childNodes[i], "label") && td.childNodes[i].firstChild.checked!=this.checked)
						td.childNodes[i].firstChild.click();
					} catch(e) {J.Debug(e.message)};
				td=document.getElementById("tdRessourcesDestination");
				var elt;
				try {
				for(var i=0;i<td.childNodes.length; i++)
					if(J.estDeType(td.childNodes[i], "label") && td.childNodes[i].firstChild.checked!=this.checked)
						td.childNodes[i].firstChild.click();
					} catch(e) {J.Debug(e.message)};
				td=document.getElementById("tdRessourcesProvenance");
				var elt;
				try {
				for(var i=0;i<td.childNodes.length; i++)
					if(J.estDeType(td.childNodes[i], "label") && td.childNodes[i].firstChild.checked!=this.checked)
						td.childNodes[i].firstChild.click();
					} catch(e) {J.Debug(e.message)};	return false;			});/*
		var label=createChechBoxAction("Inverser", function(){
				var td=document.getElementById("tdRessourcesTransportees");
				var elt;
				try {
				for(var i=0;i<td.childNodes.length; i++)
					if(J.estDeType(td.childNodes[i], "label"))
						td.childNodes[i].firstChild.click();
					} catch(e) {J.Debug(e.message)};
				});*/
		td.appendChild(label);
		
		tr.appendChild(td);
		div.appendChild(tr);
		
		tr=J.createTr();
		td=J.createTd();
		
		label=createChechBoxAction(["A"], J.Lang.getStr("allers"), function(){
				var td=document.getElementById("tdRessourcesTransportees");
				var elt;
				try 
				{
				for(var i=0;i<td.childNodes.length; i++)
					if(J.estDeType(td.childNodes[i], "label")&&td.childNodes[i].firstChild.nextSibling.firstChild.nodeValue.indexOf(J.Fleets.STRFLIGHT)==0 && td.childNodes[i].firstChild.checked!=this.checked)
					{
						td.childNodes[i].firstChild.click();
					}
				} catch(e) {J.Debug(e.message)};return false;
				});
		td.appendChild(label);
		label=createChechBoxAction(["R"], J.Lang.getStr("retours"), function(){
				var td=document.getElementById("tdRessourcesTransportees");
				var elt;
				try {
				for(var i=0;i<td.childNodes.length; i++)
					if(J.estDeType(td.childNodes[i], "label")&&td.childNodes[i].firstChild.nextSibling.firstChild.nodeValue.indexOf(J.Fleets.STRRETURN)==0&& td.childNodes[i].firstChild.checked!=this.checked)
						td.childNodes[i].firstChild.click();
					} catch(e) {J.Debug(e.message)};return false;
				});
		td.appendChild(label);
		tr.appendChild(td);
		div.appendChild(tr);
		//// ------------------------------------------------------------
		//// ------------------------------------------------------------
		
		tr=J.createTr();
		td=J.createTd();
		td.style.paddingLeft="25px";
		td.style.paddingRight="5px";
		td.style.textAlign="left";
		td.id="tdRessourcesTransportees";
		tr.appendChild(td);
		div.appendChild(tr);
		
		tr=J.createTr();
		td=J.createTd();
		td.style.textAlign="left";
		tr.appendChild(td);
		div.appendChild(tr);
		
		tr=J.createTr();
		td=J.createTd();
		td.style.paddingLeft="25px";
		td.style.paddingRight="5px";
		td.style.textAlign="left";
		td.id="tdRessourcesDestination";
		tr.appendChild(td);
		div.appendChild(tr);
		
		tr=J.createTr();
		td=J.createTd();
		td.style.paddingLeft="25px";
		td.style.paddingRight="5px";
		td.style.textAlign="left";
		td.id="tdRessourcesProvenance";
		tr.appendChild(td);
		div.appendChild(tr);

		tr=J.createTr();
		td=J.createTd();
		tr.appendChild(td);
		div.appendChild(tr);
		
		spanActions.appendChild(div);
		J.register(div, "mouseout", function(){document.getElementById("divActions").style.display="none";});
		
		return td;
		
	}
	

	var createChechBoxOption=function(variableName, texte, strCheminAcces)
	{
		var td=J.createTd();//J.Css.tableRessources.entetes.tdTh);
		td.className="Option chkbxOption";
		var tr=J.createTr();
		tr.appendChild(td)

		var chkbx=document.createElement("input");
		td.appendChild(chkbx);
		
		var id=J.getId(chkbx);
		chkbx.type="checkbox";
		
		chkbx.checked=J.get(variableName, eval(strCheminAcces));
		chkbx.setAttribute("option", variableName);
		chkbx.setAttribute("chemin", strCheminAcces);
			
		var txt=document.createTextNode(texte);
		J.register(txt,"click", function(){this.parentNode.firstChild.click(); return false;});
		td.appendChild(txt);
		J.register(chkbx, "click", fxOptionChkbx);
		return tr;
	}

	var fxOptionRadio=function()
	{
		if(!this.checked)return;
		var variable=this.getAttribute("option");
		var valeur=this.getAttribute("valeur");
		J.set(variable, valeur);
		var chemin=this.getAttribute("chemin");
		
		var toEval=""+chemin+"='"+valeur+"';";
		eval(toEval);
		J.Ressources.calc();
	}
	
	var createRadioOption=function(variableName, texte, strCheminAcces, valeurs)
	{
		function getLabel(langue, text)
		{
			if(typeof(text)=="undefined")text=langue;
			var label=document.createElement("label");
			var radio=document.createElement("input");
			label.appendChild(radio);
			var id=J.getId(radio);
			radio.type="radio";
			radio.checked=(J.get(variableName, eval(strCheminAcces))==langue);
			radio.setAttribute("valeur", langue);
			radio.setAttribute("name",name);
			radio.setAttribute("option", variableName);
			radio.setAttribute("chemin", strCheminAcces);
			var txt=document.createTextNode(text);
			J.register(txt,"click", function(){this.parentNode.firstChild.click(); return false;});
			label.appendChild(txt);
			J.register(radio, "click", fxOptionRadio);
			J.register(radio, "change", fxOptionRadio);
			return label;
		}
		var td=J.createTd();//J.Css.tableRessources.entetes.tdTh);
		td.className="Option radioOption";
		var tr=J.createTr();
		tr.appendChild(td)
		var txt=document.createTextNode(texte);
		td.appendChild(txt);
		var name=J.getId(td)+"Radio";
		var label;
		for(var valeur in valeurs)
		{
			label=getLabel(valeur, valeurs[valeur]);
			td.appendChild(label);
		}
		return tr;
	}



	var createRadioLangOption=function(variableName, texte, strCheminAcces)
	{
		function getLabel(langue, text)
		{
			if(typeof(text)=="undefined")text=langue;
			var label=document.createElement("label");
			var radio=document.createElement("input");
			label.appendChild(radio);
			var id=J.getId(radio);
			radio.type="radio";
			radio.checked=(J.get(variableName, eval(strCheminAcces))==langue);
			radio.setAttribute("valeur", langue);
			radio.setAttribute("name",name);
			radio.setAttribute("option", variableName);
			radio.setAttribute("chemin", strCheminAcces);
			var txt=document.createTextNode(text);
			J.register(txt,"click", function(){this.parentNode.firstChild.click(); return false;});
			label.appendChild(txt);
			J.register(radio, "click", fxOptionRadio);
			J.register(radio, "change", fxOptionRadio);
			return label;
		}
		var td=J.createTd();//J.Css.tableRessources.entetes.tdTh);
		td.className="Option radioOption";
		var tr=J.createTr();
		tr.appendChild(td)
		var txt=document.createTextNode(texte);
		td.appendChild(txt);
		var name=J.getId(td)+"Radio";
		var label;
		td.appendChild(getLabel("", "Serveur"));
		for(var langue in J.Lang.str)
		{
			label=getLabel(langue, J.Lang.getStr("lang", langue));
			td.appendChild(label);
		}
		return tr;
	}


	var createInputOption=function(variableName, texte, strCheminAcces)
	{
		var td=J.createTdTh();

		td.className="Option inputOption";
		var txt=document.createTextNode(texte+" ");
		td.appendChild(txt);
		var chkbx=document.createElement("input");
		td.appendChild(chkbx);
		var id=J.getId(chkbx);
		chkbx.type="input";
		chkbx.value=J.get(variableName, eval(strCheminAcces));
		chkbx.setAttribute("option", variableName);
		chkbx.setAttribute("chemin", strCheminAcces);
		J.register(chkbx, "change", J.fxOptionInput);
		var tr=J.createTr();
		tr.appendChild(td)
		return tr;
	}

	
	// Crée une chkbox, classes=["classe1", "classe2"]; texte éventuellement null => traduction des classes
	var createChechBoxAction=function(classes, text, fonction)
	{
		var div=document.createElement("div");
		var chkbx=document.createElement("input");
		div.appendChild(chkbx);
		var id=J.getId(chkbx);
		chkbx.type="checkbox";
		chkbx.checked=true;
		chkbx.action=texte;
		var label=document.createElement("label");
		var span=document.createElement("span");
		span.style.display="none";

		var strtmp,texte="", texteClasses="";
		for(var i=0; i<classes.length; i++)
		{
			strtmp=J.Lang.getStr(classes[i]);
			if(typeof(strtmp)!="undefined") texte+=strtmp;
			else texte+=classes[i];
			texteClasses+=classes[i];
			if(i+1<classes.length) {texte+=" ";texteClasses+=" ";}
		}
		
		if(classes[0]=="flight"||classes[0]=="return")
		{
			var tot=new J.resources(0,0,0);
			for(var id in J.Ressources[classes[0]][classes[1]])
			{
				var chkbx2=J.Ressources[classes[0]][classes[1]][id];
				if(chkbx2.checked==true)
				{
					tot=tot.plus(chkbx2.ressources);
				}
			}
			if(tot.total()>0)texte+=" :  "+tot.toString();
		}
		
		
		var txt=document.createTextNode(texte);
		var txt2=document.createTextNode(texteClasses);
		span.appendChild(txt2);
		
//		label.setAttribute("for", id);
		J.register(txt,"click", function(){this.parentNode.firstChild.click(); return false;});
		J.register(txt2,"click", function(){this.parentNode.firstChild.click(); return false;});
		label.appendChild(chkbx);
		label.appendChild(span);
		label.appendChild(text!=null?document.createTextNode(text):txt);
		J.register(chkbx, "click", fonction);
		return label;
	}
	var createCheckBoxesActions=function()
	{
		var clik=function()
		{
			var tmp=this.nextSibling.firstChild.nodeValue.split(" ");
			var type=tmp[0];
			var sstype=tmp[1];

//			var chk=(this.checked=="checked"||this.checked==true)?"checked":"unchecked";
			var chk=this.checked;
			for(var id in J.Ressources[type][sstype])
			{
				J.Ressources[type][sstype][id].checked=chk;
			}
			J.Ressources.calc();
			return false;
		}
		var label, td, br;
		td=document.getElementById("tdRessourcesTransportees");
		for(var sstype in J.Ressources.flight)
		{
			if(J.isEmpty(J.Ressources.flight[sstype])) continue;
			label=createChechBoxAction(["flight", sstype],null,  clik);
			if(J.Options.autoClick)
				J.register(label.firstChild, "mouseover", function(){this.click()});
			td.appendChild(label);
			br=document.createElement("br");
			td.appendChild(br);
		}
		for(var sstype in J.Ressources["return"])
		{
			if(J.isEmpty(J.Ressources["return"][sstype])) continue;
			label=createChechBoxAction(["return", sstype], null,clik);
			if(J.Options.autoClick)
				J.register(label.firstChild, "mouseover", function(){this.click()});
			td.appendChild(label);
			br=document.createElement("br");
			td.appendChild(br);
		}
	}
	
	var createCheckBoxesDestination=function()
	{
		var clik=function()
		{
			var to=this.nextSibling.firstChild.nodeValue;

			var chk=this.checked;
			for(var i in J.Ressources.to[to])
			{
				J.Ressources.to[to][i].checked=chk;
			}
			J.Ressources.calc();
			return false;
		}
		var label, td, br;
		td=document.getElementById("tdRessourcesDestination");
		for(var dest in J.Ressources.to)
		{
			if(J.isEmpty(J.Ressources.to[dest])) continue;
			label=createChechBoxAction([dest],J.Lang.getStr("to")+" "+dest,  clik);
			if(J.Options.autoClick)
				J.register(label.firstChild, "mouseover", function(){this.click()});
			td.appendChild(label);
			br=document.createElement("br");
			td.appendChild(br);
		}
	}
	var createCheckBoxesProvenance=function()
	{
		var clik=function()
		{
			var from=this.nextSibling.firstChild.nodeValue;

			var chk=this.checked;
			for(var i in J.Ressources.from[from])
			{
				J.Ressources.from[from][i].checked=chk;
			}
			J.Ressources.calc();
		}
		var label, td, br;
		td=document.getElementById("tdRessourcesProvenance");
		for(var dest in J.Ressources.from)
		{
			if(J.isEmpty(J.Ressources.from[dest])) continue;
			label=createChechBoxAction([dest],J.Lang.getStr("from")+" "+dest,  clik);
			if(J.Options.autoClick)
				J.register(label.firstChild, "mouseover", function(){this.click()});
			td.appendChild(label);
			br=document.createElement("br");
			td.appendChild(br);
		}
	}
	
	var checkUpdate= function(force) {
		var date=new Date();date.setTime(0);
		var lastCheck=unserialize(J.get(J.overview.GM_Variables.update, serialize({lastCheck:date})));
		if(force || lastCheck.lastCheck.getTime()+J.Options.updaterInterval*3600000*24<(new Date().getTime()))
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://userscripts.org/scripts/source/42338.meta.js",
				onload: function(xhr) {
					var next=new Date();

					var match = xhr.responseText.match(/@version\s+([\.\d]+)/);
					if (match) {
					  var newVersion = parseFloat(match[1]);
					  if (newVersion > J.overview.version) {
						GM_setValue(J.overview.GM_Variables.update, serialize({need:true, version:''+newVersion, lastCheck:next}));
					  }
					  else
						GM_setValue(J.overview.GM_Variables.update, serialize({need:false, version:''+J.overview.version, lastCheck:next}));
					}
				  else
					GM_setValue(J.overview.GM_Variables.update, serialize({need:false, version:''+J.overview.version, lastCheck:next}));
				}
			});
	}


	try 
	{
	
		J.initPartage();
		try {
			var old_version=parseFloat(unserialize(J.get(J.overview.GM_Variables.version, serialize(0))));
			if(parseFloat(old_version)<parseFloat(J.overview.version)) 	//&& J.get(J.overview.GM_Variables.update))
				GM_setValue(J.overview.GM_Variables.update, serialize({need:false, version:''+J.overview.version, lastCheck:new Date()}));
			if(parseFloat(old_version)<0.978)
				J.set('Options_UpdateInterval', 1);
			try{
				checkUpdate(false)
			}catch(e){}
			J.overview.update=unserialize(J.get(J.overview.GM_Variables.update, ""));
		}
		catch(e){}
		try
		{
			J.set(J.overview.GM_Variables.version,  serialize(J.overview.version));
		} catch(e) {}
		
		try {J.overview.parseUrl()}catch(e){}
		
		parseMissions();
		createSpanRessources();
	//	alert('span ok');
		executeActions("flight");
	//	alert('flight ok');
		executeActions("return");
	//	alert('return ok');
	//	creerDivRessources();
	//	createCheckBoxesActions();
		if(J.Options.dispDetails)
			afficherTableauRecap();
		J.Ressources.calc();
	//	alert("ok");
		J.tempsChargementOgOverview=(new Date())-t0;
		

	} catch(e) { 
		J.Debug("Erreur, impossible d'executer OgOverview : "+e.message); 
//	for(var r in e) alert(r+":"+e[r]);
	throw e;}
}

var bodys=document.getElementsByTagName("body");
if(checkPage())
	if(bodys.length==0) // Opera
		J.register(document, "load", J.overview.parse);
	else
		J.overview.parse();