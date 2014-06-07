// ==UserScript==
// @name           Og Total Resources
// @namespace      Ogame
// @include        http://uni*.ogame.*/game/index.php?page=*
// @exclude        http://*.ogame.*/game/index.php?page=notizen*
// @exclude        http://*.ogame.*/game/index.php?page=bericht*
// @exclude        http://*.ogame.*/game/index.php?page=flottenversand*
// @version        0.968
// @source         http://userscripts.org/scripts/show/53190
// ==/UserScript==

if(typeof J=="undefined") var J={};
if(typeof J.tR=="undefined")  J.tR={};
if(typeof J.totalResources=="undefined")  J.totalResources={};
if(typeof J.dateDocument=="undefined") J.dateDocument = new Date(document.lastModified);
if(parseInt(J.dateDocument.getFullYear())<2000)J.dateDocument = new Date();
var t0=new Date();

J.tR.version="0.968";

J.DEBUG=false;


function checkPage() {
	var url = window.location.href;
	if(url.indexOf('.ogame.')!=-1) return true;
	return false;
}
J.checkPageResources=function() {
	var url = window.location.href;
	return (url.indexOf('/game/index.php?page=resources')!=-1);
}
J.checkPageGalaxy=function() {
	var url = window.location.href;
	return (url.indexOf('/game/index.php?page=galaxy')!=-1);
}
J.checkPageBuildings=function() {
	var url = window.location.href;
	return (url.indexOf('/game/index.php?page=b_building')!=-1);
}
J.checkPageDefenses=function() {
	var url = window.location.href;
	return (url.indexOf('/game/index.php?page=building')!=-1) && url.indexOf("&mode=Verteidigung")!=-1;
}
J.checkPageOverview=function() {
	var url = window.location.href;
	return (url.indexOf('/game/index.php?page=overview')!=-1);
}
J.checkPageFleet=function() {
	var url = window.location.href;
	return (url.indexOf('/game/index.php?page=flotten1')!=-1);
}
J.checkPageFleet2=function() {
	var url = window.location.href;
	return (url.indexOf('/game/index.php?page=flotten2')!=-1);
}
J.checkPageFleet3=function() {
	var url = window.location.href;
	return (url.indexOf('/game/index.php?page=flotten3')!=-1);
}
J.checkPageFleet4=function() {
	var url = window.location.href;
	return (url.indexOf('/game/index.php?page=flottenversand')!=-1);
}
J.checkPageCS=function() {
	var url = window.location.href;
	return (url.indexOf('/game/index.php?page=building')!=-1) && url.indexOf("&mode=Flotte")!=-1;
}
J.checkPageTechno=function() {
	var url = window.location.href;
	return (url.indexOf('/game/index.php?page=building')!=-1) && url.indexOf("&mode=Forschung")!=-1;
}



J.serverLang="fr";
J.getServerLang=function()
{
	try
	{
		var url = window.location.href.toLowerCase();
		var match=url.match("/uni[0-9]+.*\.ogame.([a-z]+)/","");
		var match2=url.match("/uni[0-9]+.*\.ogame.com.([a-z]+)/","");
		if(match!=null && match.length>1 && (typeof(J.tR.reperes[match[1]])!="undefined" || match[1] == "org" || match[1] == "com"))
		{
			J.serverLang=match[1];
			if(match[1]=="org")
			{
				match = url.match ("/uni[0-9]+\.([a-z]+)\.ogame.org/","");
				if(match!=null && match.length>1 && typeof(J.tR.reperes[match[1]])!="undefined")
				{
					switch(match[1])
					{
						case "bg":
							J.serverLang="bg";
							break;
						default:
							J.serverLang="en";
					}
				}
				else
				{
					J.serverLang="en";
				}
			}
			else if(match[1]=="us")
				J.serverLang="en";
		}
		else if(match2!=null && match2.length>1 && (typeof(J.tR.reperes[match2[1]])!="undefined"))
		{
			J.serverLang=match2[1];
		}
		else J.Debug("Non supported language...");
		/*
		if(J.get("Options_Lang", "").length==0)
		{
			if(typeof(J.Lang.str[J.SERVER_LANG])!="undefined")
				J.Lang.actualLang=J.SERVER_LANG;
			else
				J.Lang.actualLang=J.Lang.defaultLang;
		}
		else J.Lang.actualLang=J.get("Options_Lang", J.Lang.defaultLang);
		*/
	}catch(e){J.Debug("Could not recover server language")}
}
J.tR.getRepere=function(title, lang)
{
	if(J.undef(lang))lang=J.serverLang;
	return J.tR.reperes[lang][title]||"azerezfjsk353";
}
J.tR.reperes = 
{
	fr:
	{
		serverTime: "Heure du serveur",
		capaciteDesDepots: "Capacité des dépôts",
		productionTotale : "Total:",
		strEvts:" Evènements ",
		moon : "Lune",
		strMetal:'Métal',
		strCristal:'Cristal',
		strDeut:'Deutérium'
	},
/*
	:
	{
		serverTime: "",
		capaciteDesDepots: "",
		productionTotale : ""
	},
	*/
	en:
	{
		serverTime: "Server time",
		capaciteDesDepots: "Storage Capacity",
		productionTotale : "Total:",
		strEvts:" Events ",
		moon:"Moon",
		strMetal:'Metal',
		strCristal:'Crystal',
		strDeut:'Deuterium'

	},
	bg:
	{
		serverTime: "Време на сървъра",
		capaciteDesDepots: "Капацитет на складовете",
		productionTotale : "Общо:",
		strEvts:"Събития ",
		moon : "Луна",
		strMetal:'Метал',
		strCristal:'Кристали',
		strDeut:'Деутерий'
	},
	de:
	{
		serverTime: "Serverzeit",
		capaciteDesDepots: "Lagerkapazität",
		productionTotale : "Gesamt:",
		strEvts:" Ereignisse ",
		moon : "Mond",
		strMetal:'Metall',
		strCristal:'Kristall',
		strDeut:'Deuterium'
	},
	it:
	{
		serverTime: "Ora del server",
		capaciteDesDepots: "Capacità di deposito",
		productionTotale : "Somma:",
		strEvts:" Eventi ",
		moon : "Luna",
		strMetal:'Metallo',
		strCristal:'Cristallo',
		strDeut:'Deuterio'
	},
	es:
	{
		serverTime: "Hora del servidor",
		capaciteDesDepots: "Capacidad de los almacenes",
		productionTotale : "Suma:",
		strEvts:" Eventos ",
		moon : "Luna",
		strMetal:'Metal',
		strCristal:'Cristal',
		strDeut:'Deuterio'
	},

	dk:
	{
		serverTime: "Servertid",
		capaciteDesDepots: "Lagerkapacitet",
		productionTotale : "Samlet:",
		strEvts:" Begivenheder ",
		moon : "Måne",
		strMetal:'Metal',
		strCristal:'Krystal',
		strDeut:'Deuterium'
	},
	cz :
	{
		serverTime: "Čas serveru",
		capaciteDesDepots: "Kapacita skladů",
		productionTotale : "Souhrn:",
		strEvts:" Události ",
		moon : "Měsíc",
		strMetal:'Kov',
		strCristal:'Krystaly',
		strDeut:'Deuterium'
	}
}

J.tR.GM_Variables =
{
	planets:"J.tR.planets", // Serialisation de l'ensemble des planètes (obsolète)
	planet:"J.tR.planet_", // une variable par planète : J.tR.planet_ + code_planète
	planetB:"J.tR.planetB_", // Buildings
	planetD:"J.tR.planetD_", // Defenses
	planetT:"J.tR.planetT_", // Technos
	technologiesName:"J.tR.technologiesName",
	technologiesCosts:"J.tR.technologiesCosts",
	buildingsName:"J.tR.buildingsName",
	buildingsCosts:"J.tR.buildingCosts",
	defensesName:"J.tR.defensesName",
	defensesCosts:"J.tR.defensesCosts",
	planetS:"J.tR.planetS_", // Ships
	shipsName:"J.tR.shipsName",
	shipsCosts:"J.tR.shipsCosts",
	options:"J.tR.options", // serialisation des options
	planetsSessions : "J.tR.planetsSessions", // objet des planetes de la session, type {cpPlanetNonActive:false, cpPlanetActive:true, cpPlanetNonActive2:false }
	sessions : "J.tR.sessions",
	version : "J.tR.version",
	update : "J.tR.update", // {need:true,version:"0.435", lastCheck:...}
	deleteDefenses:"J.tR.deleteDefense",
	deleteFleets:"J.tR.deleteFleets",
	deleteBuildings:"J.tR.deleteBuildings",
	resources : "J.tR.resources",
}

J.overview=
{
	GM_Variables :
	{
		version : "J.overview.version",
		flyingShips:"J.overview.flyingShips",
		checkedResources:"J.overview.checkedResources",
	}
}

J.tR.setOption=function(optionPath, value, partage)
{
	if(J.undef(partage))var partage=true;
	eval("J.tR.options."+optionPath+"=unserialize('"+serialize(value)+"')");
	J.set(J.tR.GM_Variables.options,serialize( J.tR.options), partage);
	return value;
}
J.tR.getOption = function(optionPath)
{
	var opt=null;
	try 
	{
		opt=eval("J.tR.options."+optionPath);
		if(J.undef(opt)||opt==null)throw "";
		return opt;
	}
	catch(e)
	{
		try
		{
			opt=J.tR.setOption(optionPath, eval("J.tR.defaultOptions."+optionPath));
//		opt=eval("J.tR.defaultOptions."+optionPath);
//		eval("J.tR.options."+optionPath+"=opt");
//			J.set(J.tR.GM_Variables.options,serialize( J.tR.options));
		}catch(e){}
		return opt;
	}

}

J.tR.defaultOptions =
{
	getTechnologiesCosts:true,
	getBuildingsCosts:true,
	getDefensesCosts:true,
	getShipsCosts:true,
	updaterInterval:2, // Screen update
	lang:"fr",
	displayPanel:true,
	
	displayPanelOv:false,
	displayPanelB:true,
	displayPanelRes:true,
	displayPanelLab:true,
	displayPanelCS:true,
	displayPanelFl:true,
	displayPanelF2:true,
	displayPanelF3:true,
	displayPanelGal:false,
	displayPanelDef:true,
	
	displayStaticPanel:false,
	dispSPBuildings:false,
	dispSPFleets:false,
	dispSPDefenses:false,
	dispSPBottom:false,
	dispFPBottom:false,
	dispEmptyShip:false,
	dispShipTotal:true,
	planetExpanded:false,
	resourcesExpanded:true,
	orientation:"vertical",
	displayMoons:true,
	displayTotal:true,
	displayTransit:true,
	displayTotals:true,
	dispTimeFull:false,
	totalsLimit:-1,
	siloFilling:true,
	styleFilled:"background:#644566",
	styleEmpty:"background:#347566",
	
	classOverflow : "planetOverflow",
	styleOverflow : "background:#992222",

	panelDockTop:false,
	panelDockLeft:false,
	panelX:0,
	panelY:0,
	
	classThFull : "siloFull",
	styleThFull : "background:red",
	
	// Buildings
	displayBuildingsPlanet:false,
	dispBPBottom:false,
	dispBNotConstr:true, // Building not constructed
	// Technos
	displayTechnologiesPlanet:false,
	dispTPBottom:false,
	dispTNotConstr:true, // Techno not constructed
	// Defenses
	displayDefensesPlanet:false,
	dispDPBottom:false,
	dispDefTotal:true,
	dispDNotConstr:false, // Defenses not constructed
}

J.tR.options =
{
getTechnologiesCosts:true,
getBuildingsCosts:true,
getDefensesCosts:true,
getShipsCosts:true,
	updaterInterval:3,
	lang:"fr",
	displayPanel:true,
	displayPanelOv:false,
	displayPanelB:true,
	displayPanelRes:true,
	displayPanelLab:true,
	displayPanelCS:true,
	displayPanelFl:true,
	displayPanelF2:true,
	displayPanelF3:true,
	displayPanelGal:false,
	displayPanelDef:true,
	
	displayStaticPanel:false,
	dispSPBottom:false,
	dispFPBottom:false,
	dispEmptyShip:false,
	dispShipTotal:true,
	dispSPBuildings:false,
	dispSPFleets:false,
	dispSPDefenses:false,
	planetExpanded:false,
	resourcesExpanded:true,
	orientation:"vertical",
	displayMoons:true,
	displayTotal:true,
	displayTransit:true,
	displayTotals:true,
	dispTimeFull:false,
	totalsLimit:-1,
	siloFilling:true,
	styleFilled:"background:#644566",
	styleEmpty:"background:#347566",
	
	classOverflow : "planetOverflow",
	styleOverflow : "background:#992222",


	panelDockTop:false,
	panelDockLeft:false,
	panelX:0,
	panelY:0,
	
	classThFull : "siloFull",
	styleThFull : "background:red",
	
	// Buildings
	displayBuildingsPlanet:false,
	dispBPBottom:false,
	dispBNotConstr:true,
	// Technos
	displayTechnologiesPlanet:false,
	dispTPBottom:false,
	dispTNotConstr:true, // Techno not constructed
	// Defenses
	displayDefensesPlanet:false,
	dispDPBottom:false,
	dispDefTotal:true,
	dispDNotConstr:false, // Defenses not constructed
}


J.tR.CSS =
{
	fontSize:9,
	thLune :
	{
		fontcolor : "#FFDF33"
	},
	thPlanet :
	{
		fontcolor : "#FFBC33"
	},
	evtsSpanColor : "#ddbb00"
}

J.tR.Lang =
{
	actualLang:"fr",
	defaultLang:"en",
	getStr:function(strName, langue)
	{
		if(typeof(langue)=="undefined")
			langue=J.tR.Lang.actualLang;
		if(typeof(J.tR.Lang.str[langue])!="undefined"&&typeof(J.tR.Lang.str[langue][strName])!="undefined")
			return J.tR.Lang.str[langue][strName];
		if(typeof(J.tR.Lang.str[J.tR.Lang.actualLang])!="undefined"&&typeof(J.tR.Lang.str[J.tR.Lang.actualLang][strName])!="undefined")
			return J.tR.Lang.str[J.tR.Lang.actualLang][strName];
		
		return J.tR.Lang.str[J.tR.Lang.defaultLang][strName]||strName;
	},
	str: 
	{
		fr : 
		{
			lang:"Français",
			Planet : "Planète",
			planet : "planète",
			metal:'Métal',
			cristal:'Cristal',
			deut:'Deutérium',
			total:"Total",
			totals:"totaux",
			transit:'transit',
			displayTransit: "Afficher les ressources en transit",
			Ressources:"Ress",
			RessourcesTitle:"Ressources",
			lastVersion:'Dernière version',
			dispMoons : 'Montrer les lunes',
			disp : 'Afficher',
			displayPanel:"Afficher le panneau des ressources mobile",
			
			displayPanelOv:"Afficher le PRM sur la page overview",
			displayPanelB:"Afficher le PRM sur la page des batiments",
			displayPanelRes:"Afficher le PRM sur la page des ressources",
			displayPanelLab:"Afficher le PRM sur la page laboratoire",
			displayPanelCS:"Afficher le PRM sur la page chantier spacial",
			displayPanelFl:"Afficher le PRM sur la page flotte",
			displayPanelF2:"Afficher le PRM sur la page flotte 2",
			displayPanelF3:"Afficher le PRM sur la page flotte 3",
			displayPanelGal:"Afficher le PRM sur la page galaxie",
			displayPanelDef:"Afficher le PRM sur la page défenses",
			
			displayBuildingsPlanet:"Toujours afficher les batiments de la planète",
			displaySPBuilings:"Toujours afficher les batiments de l'empire",
			displaySPFleets:"Toujours afficher les flottes de l'empire",
			displaySPDefenses:"Toujours afficher les défenses de l'empire",
			dispBPBottom:"Afficher les batiments en bas de page",
			dispFPBottom:"Afficher les flottes en bas de page",
			dispBNotConstr:"Afficher les batiments non construits",
			dispDPBottom:"Afficher les défenses en bas de page",

			showDefenses:"Afficher les défenses de la planète",
			showDefensesPlanets:"Afficher les défenses de toutes les planètes",
			showTechnologies:"Afficher les technologies de la planète",
			clickFToShow:"Pour comptabiliser les ressources en vol, if faut disposer script OG Overview (v>0.977), et avoir clické une fois sur F avant.",
			flying:'Vol',
			displayStaticPanel:"Toujours afficher le panneau de ressources intégré",
			
			dispSPBottom:"Afficher le panneau statique en bas de la page",
			displayTotal : 'Afficher le total',
			displayTotals : "Afficher les totaux",
			dispTimeFull : "Afficher le temps restant avant remplissage",
			siloFilling:"Afficher le degré de remplissage des silos en couleur de fond",
			updateInterval:"Intervalle de rafraichissement (s)",
			planetExpanded:"Afficher les planètes",
			resourcesExpanded:"Afficher les ressources",
			totalsLimit:"Limite des totaux de ressources avant changement de couleur (-1 = désactivé)",
			styleOverflow:"Style css",
			showOptions: "Options pr Og Total Resources",
			showAllFleet:"Afficher les flottes de l'empire",
			showBuildings:"Afficher les batiments de la planète",
			showBuildingsPlanets:"Afficher les batiments de toutes les planètes",
			totalProd:"Prod totale",
			panelDockTop:"Positionner le tableau par rapport au haut de page",
			panelDockLeft:"Positionner le tableau par rapport à la gauche",
			MAJ:'(MAJ)',
			movingPanel:"Panneau mobile des ressources",
			staticPanels: "Panneaux statiques"
			
		},
		en : 
		{
			lang:"English",
			Planet : "Planet",
			planet : "planet",
			metal:'Metal',
			cristal:'Crystal',
			deut:'Deuterium',
			total:"Total",
			totals:"totals",
			transit:'transit',
			flying:'Flying',
			displayTransit:"Show resources in transit",
			Ressources:"Res",
			RessourcesTitle:"Resources",
			lastVersion:'Last version',
			dispMoons : 'Show moons',
			disp : 'Show',

			clickFToShow:"If you want to display flying fleet, you must have OG Overview script (v>0.977), and click on F once before",

			displayPanel:"Display resources panel",
			
			displayPanelOv:"Display resources panel on overview page",
			displayPanelB:"Display resources panel on des buildings page",
			displayPanelRes:"Display resources panel on des resources page",
			displayPanelLab:"Display resources panel on laboratory page",
			displayPanelCS:"Display resources panel on shipsyard",
			displayPanelFl:"Display resources panel on fleet",
			displayPanelF2:"Display resources panel on fleet 2 page",
			displayPanelF3:"Display resources panel on fleet 3 page",
			displayPanelGal:"Display resources panel on galaxy page",
			displayPanelDef:"Display resources panel on defenses page",
			
			displayStaticPanel:"Always display the static panel",
			displayBuildingsPlanet:"Always display planet's buildings",
			displaySPBuilings:"Always display buildings of empire",
			displaySPFleets:"Always display fleets of empire",
			displaySPDefenses:"Always display defenses of empire",
			dispBNotConstr:"Display 0-level buildings",
			dispBPBottom:"Display buildings at the end of the page",
			dispFPBottom:"Display fleet at the end of the page",
			dispSPBottom:"Display static panel at the end of the main table",
			dispBPBottom:"Display defenses at the end of the page",
			siloFilling:"Show filling status as background color",
			displayTotal : 'Show total',
			displayTotals : 'Show totals',
			dispTimeFull : "Show time left before silos are full",
			updateInterval:"Update interval (s)",
			planetExpanded:"Show all planets",
			resourcesExpanded:"Show resources",
			totalsLimit:"Resources totals limit before showing (-1 = desactivated)",
			styleOverflow:"Css style",
			showOptions: "Options for Og Total Resources",
			showAllFleet:"Show fleet of empire",
			showBuildings:"Show planet's buildings",
			showBuildingsPlanets:"Show all planets buildings",
			showDefenses:"Show planet's defenses",
			showDefensesPlanets:"Show all planets defenses",
			showTechnologies:"Show planet's technologies",
			totalProd:"Total prod",
			panelDockTop:"Dock the panel from top",
			panelDockLeft:"Dock panel from left",
			MAJ:'(Update)',
			movingPanel:"Moving resources panel",
			staticPanels:"Static panels",
		}

	}
}


/*
planet =
{
	id : xxxxx,
	coordinates : "xxx:xxx:xxx",
	link:...,
	name : "xxxxxx",
	metal : xxxxx,
	cristal : xxxx,
	deuterium : xxxx,
	prodMetal : xxxxx,
	prodCristal : xxxx,
	prodDeuterium : xxxx,
	maxMetal : xxx,
	maxCristal : xxxx,
	maxDeuterium : xxxx,
	updateTime : xxxx,
	updateSession : xxxx
}

planetB = 
{
	lvlM: xxxx, // lvl metal 
	lvlMU:false, // updating?
	lvlC: xxxx,
	lvlCU: xxxx,
	lvlD: xxxx,
	lvlDU: xxxx,
}
*/

/*
J.tR.resources=function (M,C,D) {
	this.M=parseInt(M);
	this.C=parseInt(C);
	this.D=parseInt(D);
	this.plus=function(ressources) {
		return new J.tR.resources(ressources.M+this.M, ressources.C+this.C, ressources.D+this.D);
	}
	
	this.minus=function(ressources) {
		var res= new J.tR.resources(this.M-ressources.M, this.C-ressources.C, this.D-ressources.D);
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
//		return (html?"<font style=\"color:"+J.Css.tableRessources.trAvecPlanetes.color+"\">":"")+"M: "+(html?"</font>":"")+m+
//		       (html?"<font style=\"color:"+J.Css.tableRessources.trAvecPlanetes.color+"\">":"")+" C: "+(html?"</font>":"")+c+
//			   (html?"<font style=\"color:"+J.Css.tableRessources.trAvecPlanetes.color+"\">":"")+" D: "+(html?"</font>":"")+d;
	}
	this.td=function(nbr)
	{		
		var td=document.createElement("th");
		td.appendChild(document.createTextNode(this.getString(nbr)));
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
}*/



J.Debug=function(msg) { if(J.DEBUG) alert(msg); }

J.get=function(name, defaut) {
	if(name==null) throw "Warning : J.get with name null";
	if(typeof(GM_getValue)!="undefined") return GM_getValue(name, defaut);
	return defaut;
}
J.getPartage=function(name, defaut)
{
	if(name==null) throw "Warning : J.getPartage with name null";
	var pt=document.getElementById("partage_"+name);
	if(pt==null) return defaut;
	return unserialize(pt.innerHTML);
}
J.set=function(name, value, partage) 
{ 
	if(name==null) throw "Warning : J.set with name null";
	if(J.undef(partage)||partage)
		J.setPartage(name,value);
	if(typeof(GM_setValue)!="undefined")return GM_setValue(name, value);
	return value;
}
J.setPartage=function(name, value) 
{ 
	if(name==null) throw "Warning : J.setPartage with name null";
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
	}
	catch(e)
	{
	//J.Debug(e.message)
	}
	return value;
}

J.images=
{
	down:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAMAAABBPP0LAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAADFcOFGMQGW4VGnAPH3IUG3wVHXgUKFshIXMTIHUYJXQcJ3UeK20gKGwhJHMiJH0iNHgvIYEeOJkwOoFCPsQvQI87QLMyRbwyS70/T748U79BZL9SQc0qRMc2RckzTsw2T8s5T8k8RNMqS9AuUMU7Uc42UNIzUtQyVdU3VtY1W9Y+XNg/YNg+Y946WsVCWsZLX8tCX9lAZ8pGYMNQYthAad1Fad1IbthJcctcddxOdd9NaORFb+VGauFJbeNJc+BMcetJd+lcfeVSeetSeutTfO5VevBOgfFahvFdg+9kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsWQEowAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAIdEVYdENvbW1lbnQA9syWvwAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAINJREFUGFdj+I8GGEQggIeHi4sLxGBgFLM0tvb0cHe2MlOTEBfmYPgvKOPl5uri6GChq6koyfyf4f9/PhMne1sbc1MtNWmm/yCB//wGdnpG2hoqqixADkjgP6++jqG6shIriA0W+M8ppSArzw5mQgT+c4vKsUFYUIH/QgJQB8IE4O4FABBkY46Q4GnFAAAAAElFTkSuQmCC",
	right:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAQCAIAAAE42CK/AAAABnRSTlMA/wAAAP+JwC+QAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAACXRFWHRDb21tZW50AACJKo0GAAABPElEQVR4nGP4z/AfiEDQ7og+mJHxxBVEB5wzg0okHA4A0RrRilDFwefN5ItEQKyqD37xp51ArPRTbgijHDYbiSQLQPhQodI7fkk3HFwua0nXiEKF2j7G5j72jDrqhKSx3xquCyRg1eiEzvfea4/gK5RKhF41DzhqjeDn3fAMumLketIYxFcvlSt87Rl/08HvjJlioxxIf9Xr4KyHnorFwlDzmt+nqBQrIcw3qdBHcThQyGKmgWSeKLJD0FW47jHyP20ZvN9RqoAfiwqgszLvuibcsAu7Zup9Qc//pI1shQiKCqBDa58GFT/wybzrEX3NLuCSseNZLZfjZiq1SghbGj9GVb4Oyn/qlnzPKuaGvf8+G9USGRR3lN73rXkXWv4yJuqYt3auAhaXFp6OSdkfpJGjiNMvPOF8WL0KRAC2SRnFpr5kKQAAAABJRU5ErkJggg==",
	up:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAMAAABBPP0LAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAADFcOFGMQGW4VGnAPH3IUG3wVHXgUKFshIXMTIHUYJXQcJ3UeK20gKGwhJHMiJH0iNHgvIYEeOJkwOoFCPsQvQI87QLMyRbwyS70/T748U79BZL9SQc0qRMc2RckzTsw2T8s5T8k8RNMqS9AuUMU7Uc42UNIzUtQyVdU3VtY1W9Y+XNg/YNg+Y946WsVCWsZLX8tCX9lAZ8pGYMNQYthAad1Fad1IbthJcctcddxOdd9NaORFb+VGauFJbeNJc+BMcetJd+lcfeVSeetSeutTfO5VevBOgfFahvFdg+9kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsWQEowAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAB2SURBVBhXY/iPBhigfCEBKAMqwC0qxwYRgQhwSinIyrMjBHj1dQzVlZVYYSr4Dez0jLQ1VFRZIFr4TJzsbW3MTbXUpJlAAoIyXm6uLo4OFrqaipLM/xkYxSyNrT093J2tzNQkxIU5GEQggIeHi4sLxIA5DO5eALl0Y44A7w/wAAAAAElFTkSuQmCC",
	left:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAQCAMAAAD3Y3VMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAADFcOFGMQGW4VGnAPH3IUG3wVHXgUKFshIXMTIHUYJXQcJ3UeK20gKGwhJHMiJH0iNHgvIYEeOJkwOoFCPsQvQI87QLMyRbwyS70/T748U79BZL9SQc0qRMc2RckzTsw2T8s5T8k8RNMqS9AuUMU7Uc42UNIzUtQyVdU3VtY1W9Y+XNg/YNg+Y946WsVCWsZLX8tCX9lAZ8pGYMNQYthAad1Fad1IbthJcctcddxOdd9NaORFb+VGauFJbeNJc+BMcetJd+lcfeVSeetSeutTfO5VevBOgfFahvFdg+9kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsWQEowAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAIdEVYdENvbW1lbnQA9syWvwAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAHlJREFUGFdj+A8FHCL/GaBMZmE4m0lSHMZmkVaUgLJZVdU01bjA6tmVVLR0zcBsNnllDVMLKxBbQE5WXdvcwZkHyBYSVTA0snF0B7H/c0vp6Nm6eEDM4dS3s3f1hJrJa+DkZg2zi9/EyxjuBj4ZS4TbBMUQ7P+MIv8BbhdjjndWSrEAAAAASUVORK5CYII=",
	turnRight:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAWZJREFUOE9jYKAHWHY4i3HevjiFVceKFFYfK2IB2Tn/UJjIosPxwQTtX34023zBoch1sw/6XJx9yOf/3MMB/2cf9L264FDEnLmH/U4DDTqG05A1x0qY5x0Iz519wOfnzIPu/3HhOQf932480SiK1aBFh+I7p+1x+z91j+v/6bt9/8/fnvN/ybaG/4u3V/6fvscLLD4NJLfH8//8fbGqGIbM2RMZOHGb6z8g/j97W/KjVZtnFW7evJkZpHDu7vjNk4DiE7e5wPHCfcklKIZsOF4nMXGz572eDY7/p22J2rVocwsPsoKV+6uNl23pbF2ypal/wZaK6Qu31FyauSPaEcWQ6dvC2tpX2/2fuCHw5ertExQIhjy6gj3np3H2r/N90LLU5v/sLRllJBsA0jBne5JqyxKH/x3LXf8v3FHIRZYh87ZnRtfOtf7fsyLgzNaD8xnJMmT5/lLZ+ZsrmmZvzvIly4DhpQkA6BS9+5vBMo4AAAAASUVORK5CYII="
}

	
J.estDeType = function(elt, type)
{
  return (elt && elt.tagName && elt.tagName.toLowerCase() == type.toLowerCase());
}

J.getFirstChildOfType=function(elt, type)
{
	var child=elt.firstChild;
	while(child!=null && (child.nodeType!=1 || child.nodeName.toLowerCase()!=type.toLowerCase()))child=child.nextSibling;
	return child;
}


J.register=function(elt,evt,func)
{
  if (document.addEventListener)
	elt.addEventListener(evt,func, false);
  else if (document.attachEvent)
	elt.attachEvent('on'+evt, func);
}
J.unregisterDirect = function(elt, type, fx) {
	if (elt.removeEventListener) 
		elt.removeEventListener(type, fx, false)
	else if (elt.detachEvent) 
		elt.detachEvent('on' + type, fx);
}

J.undef=function(elt){return typeof elt=="undefined"?true:false;};
J.isDef=function(elt){return !J.undef(elt)};
J.isNum=function(elt){return typeof elt=="number"?true:false};
J.isStr=function(elt){return typeof elt=="string"?true:false};
J.getFloat=function(a){a=parseFloat(a);return isNaN(a)?0:a;}
J.relatif = function(elt,pos){return J.getFloat(J.readStyle(elt,pos));} //pos= top, left, right, bottom
J.isEmpty=function(elt){ for(var i in elt) { return false; } return true; }

J.readStyle = function(elt, prop) {
		if(elt==document||!elt)return null;
		if (elt.style&&(elt.style[prop]||J.isDef(elt.style[prop]))) 
			return parseFloat(elt.style[prop]); 
		else if (elt.currentStyle&&(elt.currentStyle[prop]||J.isDef(elt.currentStyle[prop])))
			return elt.currentStyle[prop];
		else if (window.getComputedStyle)
			return window.getComputedStyle(elt,'')[prop];
		else if (document.defaultView && document.defaultView.getComputedStyle)
			return document.defaultView.getComputedStyle(elt, null).getPropertyValue(prop);
		else
			return ''
	}


// function from SuperOgame
function xpath(path){
var xpathR = document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
return xpathR.singleNodeValue;}

J.tR.getServerDate = function() {
	var tbody= xpath('//body/div[starts-with(@id,"content")]/center/table/tbody');
	var ok=false;
	for(var tr in tbody.childNodes)
	{
		if(!J.estDeType(tr, "tr"))continue;
		for(var th in tr.childNodes)
		{
			if(!J.estDeType(th, "th"))continue;
			if(th.innerHTML.indexOf(J.tR.getRepere("serverTime"))!=-1)
			{
				var thTime=th.nextSibling;
				for(var i=0;i<4;i++)
				{
					if(!J.estDeType( thTime, "th")) {thTime=thTime.nextSibling; continue;}
					J.tR.thServerTime=thTime;
					ok=true;
				}
			}
			break;
		}
		if(ok)break;
	}
	
	if(typeof(J.tR.thServerTime)!="undefined")
		J.tR.serverTime= new Date(new Date().getFullYear()+" "+ thTime.innerHTML);
	else if(typeof(J.tR.serverTime)!="undefined")
		J.tR.serverTime=new Date();
		
}

J.tR.activePlanet="";

J.savedCosts={}
J.Costs = 
{
	getCost:function(elt, lvl)
	{
		if(J.undef(J.Costs[elt])) return null;
		var cost=J.Costs[elt];
		var f=cost.f.replace(/n/g, lvl);
//		alert(f+' '+eval(f))
		return new J.resources(parseInt(cost.M*eval(f)), parseInt(cost.C*eval(f)), parseInt(cost.D*eval(f)));
	},
	getTotalCost:function(elt, lvl)
	{
		if(J.undef(J.Costs[elt])) return null;
		var cost=J.Costs[elt];
		var M=0, C=0, D=0;
		for(var i=1;i<=eval(lvl);i++)
		{
			var f=cost.f.replace(/n/g, ''+i);
			M+=parseInt(cost.M*eval(f));
			C+=parseInt(cost.C*eval(f));
			D+=parseInt(cost.D*eval(f));
		}
		return new J.resources(M, C, D);
	},
	B1 : 
	{
		M:60,
		C:15,
		D:0,
		f:"Math.pow( 1.5,n-1)",
	},
	B2 :
	{
		M:48,
		C:24,
		D:0,
		f:"Math.pow( 1.6,n-1)",
	},
	B3 :
	{
		M:225,
		C:75,
		D:0,
		f:"Math.pow( 1.5,n-1)",
	},
	B4 :
	{
		M:75,
		C:30,
		D:0,
		f:"Math.pow( 1.5,n-1)",
	},
	B12 :
	{
		M:900,
		C:360,
		D:180,
		f:"Math.pow( 1.8,n-1)",
	},
	B14:
	{
		M:400 ,
		C: 120 ,
		D: 200 ,
		f:"Math.pow( 2,n-1)",
	},

	B15:
	{
		f:"Math.pow( 2,n-1)",
		M:1000000 ,
		C: 500000 ,
		D: 100000 
	},
	B21:
	{
		f:"Math.pow( 2,n-1)",
		M:400 ,
		C: 200 ,
		D: 100 
	},
	B22:
	{
		f:"Math.pow( 2,n-1)",
		M:2000,
		C:0,
		D:0
	},
	B23:
	{
		f:"Math.pow( 2,n-1)",
		M:2000 ,
		C: 1000 ,
		D:0
	},
	B24:
	{
		f:"Math.pow( 2,n-1)",
		M:2000 ,
		C: 2000 ,
		D:0
	},
	B31:
	{
		f:"Math.pow( 2,n-1)",
		M:200 ,
		C: 400 ,
		D: 200 
	},
	B33:
	{
		f:"Math.pow( 2,n-1)",
		M:0,
		C:50000,
		D:100000
	},
	B44:
	{
		f:"Math.pow( 2,n-1)",
		M:20000 ,
		C: 20000 ,
		D: 1000 
	},
	B41:
	{
		f:"Math.pow( 2,n-1)",
		M:20000 ,
		C: 40000 ,
		D: 20000 
	},
	B42:
	{
		f:"Math.pow( 2,n-1)",
		M:20000 ,
		C: 40000 ,
		D: 20000 
	},
	B43:
	{
		f:"Math.pow( 2,n-1)",
		M:2000000 ,
		C: 4000000 ,
		D: 2000000 
	},
	B34:
	{
		f:"Math.pow( 2,n-1)",
		M:20000 ,
		C:40000 ,
		D:0
	},

//# Espionnage : 200 M, 1 000 C, 200 D.
T106:
	{
		f:"Math.pow( 2,n-1)",
		M:200 ,
		C:1000 ,
		D:200
	},
//# Ordinateur : 400 C, 600 D.
T108:
	{
		f:"Math.pow( 2,n-1)",
		M:0 ,
		C:400 ,
		D:600
	},
//# Armes : 800 M, 200 C.
T109:
	{
		f:"Math.pow( 2,n-1)",
		M:800 ,
		C:200 ,
		D:0
	},
//# Bouclier : 200 M, 600 C.
T110:
	{
		f:"Math.pow( 2,n-1)",
		M:200 ,
		C:600 ,
		D:0
	},
//# Protection des vaisseaux spatiaux : 1 000 M.
T111:
	{
		f:"Math.pow( 2,n-1)",
		M:1000 ,
		C:0 ,
		D:0
	},
//# Energie : 800 C, 400 D.
T113:
	{
		f:"Math.pow( 2,n-1)",
		M:0 ,
		C:800 ,
		D:400
	},
//# Hyperespace : 4 000 C, 2 000 D.
T114:
	{
		f:"Math.pow( 2,n-1)",
		M:0 ,
		C:4000 ,
		D:2000
	},
//# Réacteur à combustion : 400 M, 600 D.
T115:
	{
		f:"Math.pow( 2,n-1)",
		M:400 ,
		C:0 ,
		D:600
	},
//# Réacteur à impulsion : 2 000 M, 4 000 C, 600 D.
T117:
	{
		f:"Math.pow( 2,n-1)",
		M:2000 ,
		C:4000 ,
		D:600
	},
//# Propulsion hyperespace : 10 000 M, 20 000 C, 6 000 D.
T118:
	{
		f:"Math.pow( 2,n-1)",
		M:10000 ,
		C:20000 ,
		D:6000
	},
//# Laser : 200 M, 100 C.
T120:
	{
		f:"Math.pow( 2,n-1)",
		M:200 ,
		C:100 ,
		D:0
	},
//# Ions : 1 000 M, 300 C, 100 D.
T121:
	{
		f:"Math.pow( 2,n-1)",
		M:1000 ,
		C:300 ,
		D:100
	},
//# Plasma : 2 000 M, 4 000 C, 1 000 D.
T122:
	{
		f:"Math.pow( 2,n-1)",
		M:2000 ,
		C:4000 ,
		D:1000
	},
//# Réseau de recherche intergalactique : 240 000 M, 400 000 C, 160 000 D.
T123:
	{
		f:"Math.pow( 2,n-1)",
		M:240000 ,
		C:400000 ,
		D:160000
	},
//# Expédition : 4 000 M, 8 000 C, 4 000 D
T124:
	{
		f:"Math.pow( 2,n-1)",
		M:4000 ,
		C:8000 ,
		D:4000
	},

T199:
	{
		f:"Math.pow( 2,n-1)",
		M:0 ,
		C:0 ,
		D:0
	},


}

J.tools = 
{
	firstChild:function(elt) {
		var child=elt.firstChild;
		while(child.nodeType!=null && child.nodeType!=1)child=child.nextSibling;
		return child;
	},
	
	planetToString:function(planet) {
		return planet.id+"\t"+planet.coordinates+"\n\tResources "+planet.metal+"/"+planet.maxMetal+" "+planet.cristal+"/"+planet.maxCristal+" "+planet.deuterium+"/"+planet.maxDeuterium+"\n\tLast update "+planet.updateTime.toLocaleString();
	},
	planetName:function(cp) {
		var planet=unserialize(J.get(J.tR.GM_Variables.planet+cp, {name:""}));
		return planet.name.replace("("+J.tR.getRepere("moon")+")","(L)");
	},
	
	createAPlanet:function(planet)
	{
		var a=document.createElement("a");
		if(J.tR.isLune(planet))
		{
			a.innerHTML=planet.name.replace("("+J.tR.getRepere("moon")+")","(L)");
			a.style.color= J.tR.CSS.thLune.fontcolor;
		}
		else
		{
			a.innerHTML=planet.name;
			a.style.color= J.tR.CSS.thPlanet.fontcolor;
		}
		a.href=planet.link;
		a.setAttribute("title", planet.coordinates);
		if(planet.id==J.tR.activePlanet)a.style.color="#88FF88"
		return a;
	},

	initPartage:function() {
		var partage=document.getElementById("partage");
		if(partage==null)
		{
			partage=document.createElement("div");
			partage.id="partage";
			partage.style.display="none";
			document.body.appendChild(partage);
		}
		J.partage=partage;
	},

	repos : function(elt,x,y,SX,SY) {
		var sX=SX||"left";
		var sY=SY||"top";
		elt.style[sX]=x+"px";
		elt.style[sY]=y+"px";
	},

	mettreEnMouvement : function(even,elt) {
		if(!elt)elt=this;
		if( !elt.getAttribute("canMove"))return;//,true) !elt.canMove) return;
		elt=document.getElementById(elt.getAttribute('toMove'));
		J.drags={}
		
		J.drags.coordX=J.relatif(elt, J.tR.getOption("panelDockLeft")?'left':'right');
		J.drags.coordY=J.relatif(elt, J.tR.getOption("panelDockTop")?'top':'bottom');
		if(!J.isNum(J.drags.sourisX))
		{
			J.drags.sourisX=J.tools.mouseOffsetX(even);
			J.drags.sourisY=J.tools.mouseOffsetY(even);
			J.drags.sourisOldX=J.tools.mouseOffsetX(even);
			J.drags.sourisOldY=J.tools.mouseOffsetY(even);
		}
		J.eltEnMouvement=elt;
		J.tR.dontUpdate=true;
		J.register(document, 'mousemove', J.tools.bougeSimple);

		return true;
	},

	bougeSimple : function(even) {
		var elt=J.eltEnMouvement||J.tools.stoppe();
		if(!J.isNum(J.drags.sourisX))
		{
//		alert('k');
			J.drags.sourisX=J.tools.mouseOffsetX(even);
			J.drags.sourisY=J.tools.mouseOffsetY(even);
			J.drags.sourisOldX=J.tools.mouseOffsetX(even);
			J.drags.sourisOldY=J.tools.mouseOffsetY(even);
		}
		J.drags.sourisX=J.tools.mouseOffsetX(even);
		J.drags.sourisY=J.tools.mouseOffsetY(even);
		
		J.drags.deltaX=J.drags.sourisX-J.drags.sourisOldX;
		J.drags.deltaY=J.drags.sourisY-J.drags.sourisOldY;
		
		J.drags.sourisOldX=J.drags.sourisX;
		J.drags.sourisOldY=J.drags.sourisY;
		if(J.tR.getOption("panelDockLeft"))
			J.drags.coordX+=J.drags.deltaX;
		else
			J.drags.coordX-=J.drags.deltaX;
		if(J.tR.getOption("panelDockTop"))
			J.drags.coordY+=J.drags.deltaY;
		else
			J.drags.coordY-=J.drags.deltaY;
		J.tools.repos(elt, J.drags.coordX,J.drags.coordY,J.tR.getOption("panelDockLeft")?'left':'right',  J.tR.getOption("panelDockTop")?'top':'bottom')
		J.tR.setOption("panelX",J.drags.coordX);
		J.tR.setOption("panelY",J.drags.coordY);
	},

	// Fonction gérant le lacher de l'élément
	stoppe : function() {
		try 
		{
		J.tR.dontUpdate=false;
			if(J.eltEnMouvement != null)
			{
				var elt=J.eltEnMouvement;
				J.drags={}
				J.unregister(document, 'mousemove', J.tools.bougeSimple);
			}
		}catch(exc){}
		J.eltEnMouvement=null;
		document.onmousemove=null;
		window.onmousemove=null;
		window.onmousemove=null;
	},
	mouseOffsetX : function(evt) {
		return J.isNum(evt.pageX)?evt.pageX:J.isNum(evt.clientX)?(evt.clientX)+J.tools.scrollOffsetX():0;
	},
	mouseOffsetY : function(evt) {
		return J.isNum(evt.pageX)?evt.pageY:J.isNum(evt.clientX)?(evt.clientY)+J.tools.scrollOffsetY():0;
	},
	scrollOffsetX : function() {
		
		return J.isNum(window.pageYOffset)?window.pageXOffset:
           document.documentElement?document.body.scrollLeft + document.documentElement.scrollLeft:
           J.isNum(document.body.scrollLeft)?document.body.scrollLeft:
           J.isNum(window.scrollX)?window.scrollX: 0;
	},
	scrollOffsetY : function() {
		return J.isNum(window.pageYOffset)?window.pageYOffset:
           document.documentElement?document.body.scrollTop + document.documentElement.scrollTop:
           J.isNum(document.body.scrollLeft)?document.body.scrollTop:
           J.isNum(window.scrollX)?window.scrollY: 0;
	},
	
	addStyle:function(cssStr) {
		var head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = cssStr;
		head.appendChild(style);
	},

	checkUpdate: function(force) {
		var d=new Date();d.setTime(0);
		var lastCheck=unserialize(J.get(J.tR.GM_Variables.update, serialize({lastCheck:d})));
		if(force || lastCheck.lastCheck.getTime()+J.tR.getOption("updaterInterval")*3600000*24<new Date().getTime())
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://userscripts.org/scripts/source/53190.meta.js",
				onload: function(xhr) {
					var next=new Date();

					var match = xhr.responseText.match(/@version\s+([\.\d]+)/);
					if (match) {
					  var newVersion = parseFloat(match[1]);
					  if (newVersion > J.tR.version) {
						GM_setValue(J.tR.GM_Variables.update, serialize({need:true, version:''+newVersion, lastCheck:next}));
					  }
					  else
						GM_setValue(J.tR.GM_Variables.update, serialize({need:false, version:''+J.tR.version, lastCheck:next}));
					}
					  else
						GM_setValue(J.tR.GM_Variables.update, serialize({need:false, version:''+J.tR.version, lastCheck:next}));
				}
			});
	},
	
	exportToForum:function(elt, shortF) {
		
		if(elt.nodeName.toLowerCase()!="table") 
			throw "Can only export tables";
		var s="[size=9][table]";
		for(var i=0;i<elt.childNodes.length;i++)
		{
			if(elt.childNodes[i].nodeType==1)
				s+=J.tools.exportEltToForum(elt.childNodes[i],(i%2==0&&!shortF?"Goldenrod":false), shortF).replace("\n","");
		}
		s+="[/table][/size]\n";
		return s;
	},
	exportEltToForum:function(elt, color, shortF) {
		var s="";
		if(elt.nodeType!=1) return elt.nodeValue || elt.innerHTML || elt;
		if(elt.className.indexOf("noExport")!=-1) return "";
		switch(elt.nodeName.toLowerCase())
		{
			case "thead":
			case "tbody":
			case "tfoot":
				for(var i=0;i<elt.childNodes.length;i++)
					s+=J.tools.exportEltToForum(elt.childNodes[i],(i%2==0 && !shortF?"Goldenrod":false))
				return s;
			case "tr":
				for(var i=0;i<elt.childNodes.length;i++)
					s+=J.tools.exportEltToForum(elt.childNodes[i], color)
				return "[tr]"+s+"[/tr]";
			case "th":
			case "td":
				for(var i=0;i<elt.childNodes.length;i++)
					s+=(color?"[color="+color+"]":"")+J.tools.exportEltToForum(elt.childNodes[i])+(color?"[/color]":"")
				return "[td]"+s+"[/td]";
			case "a":
				for(var i=0;i<elt.childNodes.length;i++)
					s+=J.tools.exportEltToForum(elt.childNodes[i])
				var href=elt.getAttribute("href");
				if(href.indexOf("?page=")!=-1 && href.indexOf("&session=")!=-1) return s;
				return "[url="+href+"][color=Magenta]"+s+"[/color][/url]";
			default: return elt.innerHTML;
		}
		return "";
	},
	
	addSpan:function(id, text, funcToRegister, spanAfter, color, title)
	{
		if(color==null||J.undef(color))
			try 
			{
				color=J.tR.CSS.evtsSpanColor;
			}catch(e){}
		var span=document.createElement("span");
		span.id=id;
		span.innerHTML=text;
		span.style.cursor="pointer";
		spanAfter.parentNode.insertBefore(span, spanAfter);
		if(!J.undef(title))
			span.setAttribute("title",title);			
		spanAfter.parentNode.insertBefore(J.factory.createTxt(" - "), spanAfter);
		try
		{
			span.style.color=color;
			J.register(span, "click",  function()
			{
				funcToRegister();
			})
		}catch(e){}
		return span;
		
	},

}

J.factory =
{
	createTable:function()
	{
		var a=document.createElement("table");
		a.style.fontSize=J.tR.CSS.fontSize;
		return a;
	},
	createTHead:function()
	{
		var a=document.createElement("thead");
		a.style.fontSize=J.tR.CSS.fontSize;
		return a;
	},
	createTBody:function()
	{
		var a=document.createElement("tbody");
		a.style.fontSize=J.tR.CSS.fontSize;
		return a;
	},
	createTFoot:function()
	{
		var a=document.createElement("tfoot");
		a.style.fontSize=J.tR.CSS.fontSize;
		return a;
	},
	createTr:function()
	{
		var a=document.createElement("tr");
		a.style.fontSize=J.tR.CSS.fontSize;
		return a;
	},
	createMagicTh:function(elt)
	{
		var a=J.factory.createTh(elt);
		J.register(a, "click", 
			function(){
				try {
				var newColor="SteelBlue";
				if(this.parentNode.style.backgroundColor=="")
				{
					this.parentNode.style.backgroundColor=newColor;
					var nodes=this.parentNode.getElementsByTagName("th")
					for(var i=0;i<nodes.length;i++)
					{
						var node=nodes[i];
						node.oldBkg=node.style.backgroundColor;
						node.style.backgroundColor=newColor;
					}
				}
				else
				{				
					this.parentNode.style.backgroundColor="";
					var nodes=this.parentNode.getElementsByTagName("th")
					for(var i=0;i<nodes.length;i++)
					{
						var node=nodes[i];
						node.style.backgroundColor=node.oldBkg;
					}

				}
				}catch(e){}
				}
				);
		return a;
	},
	createTh:function(elt)
	{
		var a=document.createElement("th");
		a.style.fontSize=J.tR.CSS.fontSize;
		if(!J.undef(elt))
			if(J.isStr(elt)) a.appendChild(J.factory.createTxt(elt));
			else a.appendChild(elt);
		return a;
	},
	createThResources:function(qt)
	{
		var a=document.createElement("th");
		a.style.fontSize=J.tR.CSS.fontSize;
		a.appendChild(J.factory.createTxt(J.tR.getString(qt)));
		a.title="(PT:"+Math.ceil(qt/5000)+" "+"GT:"+Math.ceil(qt/25000)+")";
		return a;
	},
	createThResourcesWithFillStatus:function(qt, max)
	{
		if(qt>=max && max<=0) return J.factory.createThResources(qt);
		
		var th=J.factory.createThResources(qt);//#344566
		th.style.backgroundColor="rgb("+parseInt(52+150*qt/max)+","+parseInt(69*(1-0.5*qt/max))+","+parseInt(102*(1-0.5*qt/max))+")"
		return th;
		
		var a=document.createElement("th");
		a.setAttribute("style", J.tR.getOption("styleEmpty"));
		a.style.fontSize=J.tR.CSS.fontSize;
		a.style.padding=0;
//		a.style.display="inline-block";
		var d=document.createElement("div");
		d.style.width=d.style.height="100%";
		d.style.display="block";
		d.style.margin="0";
		d.style.padding="0";
		
		var b=document.createElement("div");
		b.appendChild(J.factory.createTxt(' '));
		b.setAttribute("style", J.tR.getOption("styleFilled"));
//		b.style.position="absolute";
		b.style.width="100%";
		b.style.height=''+(100*qt/max)+"%";
//		b.style.height="15px";
		b.style.display="block";
		b.style.bottom=b.style.left="0";
		d.appendChild(b);
		var c=document.createElement("span");
		c.style.fontSize=J.tR.CSS.fontSize;
//		c.style.top=c.style.left="0";
//		c.style.position="absolute";
		c.appendChild(J.factory.createTxt(J.tR.getString(qt)));
		c.title="(PT:"+Math.ceil(qt/5000)+" "+"GT:"+Math.ceil(qt/25000)+")";
		d.appendChild(c);
		a.appendChild(d);
		return a;
	},
	createFilledTr:function(values)
	{
		var tr=J.factory.createTr();
		for(var i=0;i<values.length;i++)
			tr.appendChild(J.factory.createTh(values[i]));
		return tr;
	},
	createFilledTrWith:function(values)
	{
		var tr=J.factory.createTr();
		for(var i=0;i<values.length;i++)
			tr.appendChild(values[i]);
		return tr;
	},
	createTd:function(elt)
	{
		var a=document.createElement("td");
		a.style.fontSize=J.tR.CSS.fontSize;
		if(!J.undef(elt))
			if(J.isStr(elt)) a.appendChild(J.factory.createTxt(elt));
			else a.appendChild(elt);
		return a;
	},
	createTxt:function(txt)
	{
		var a=document.createTextNode(txt);
		return a;
	}
	
}


J.resources=function (M,C,D) {
	this.M=parseInt(M)||0;
	this.C=parseInt(C)||0;
	this.D=parseInt(D)||0;	
}
J.resources.prototype=
{
	getTdM:function() {return this.td(this.M);},
	getTdC:function() {return this.td(this.C);},
	getTdD:function() {return this.td(this.D);},
	getTdTotal:function() {return this.td(this.total());},
	total:function() {return this.M+this.C+this.D;},
	td:function(nbr) {return J.factory.createTd(J.tR.getString(nbr));},
	th:function(nbr) {return J.factory.createTh(J.tR.getString(nbr));},
	plus:function(ressources) {return new J.resources(ressources.M+this.M, ressources.C+this.C, ressources.D+this.D);},
	minus:function(ressources) {	return new J.resources(Math.max(this.M-ressources.M,0), Math.max(this.C-ressources.C,0), Math.max(this.D-ressources.D,0));},
	multiply:function(nb){return new J.resources(this.M*nb, this.C*nb, this.D*nb)},
	toThs:function(title, totals) {
		totals=J.undef(totals)?true:totals;
		var ths=[]; 
		if(!J.undef(title)) ths.push(J.factory.createTh(title));
		ths.push(J.factory.createThResources(this.M));
		ths.push(J.factory.createThResources(this.C));
		ths.push(J.factory.createThResources(this.D));
		if(totals)
		{
			ths.push(J.factory.createThResources(this.total()));
		}
		return ths;
	},
	toThsWithFillStatus:function(title, totals, maxResources)
	{
		totals=J.undef(totals)?true:totals;
		var ths=[]; 
		if(!J.undef(title)) ths.push(J.factory.createTh(title));
		ths.push(J.factory.createThResourcesWithFillStatus(this.M, maxResources.M));
		ths.push(J.factory.createThResourcesWithFillStatus(this.C, maxResources.C));
		ths.push(J.factory.createThResourcesWithFillStatus(this.D, maxResources.D));
		if(totals)
		{
			ths.push(J.factory.createThResources(this.total()));
		}
		return ths;
	}
}

J.tR.planets= { }
J.tR.sessions={}
J.tR.session={}

J.tR.planetsSession =
{
}
J.tR.planetsSessions =
{
}
J.tR.tableIdsToRefresh=
{
}
J.tR.func =
{
	parseUrl:function()
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
		J.session="unknown";
		if(!J.undef(argsObj["session"])) J.session=argsObj["session"];
		if(!J.undef(argsObj["page"])) J.page=argsObj["page"];	
	},

	getResourcesActivePlanete:function()
	{
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
			ress=J.tools.firstChild(ress);
			ress=childNode(ress, 2);
			var actPlanet=J.tR.planets[J.tR.activePlanet];
			actPlanet.metal=parseInt((J.tools.firstChild(J.tools.firstChild(ress)).innerHTML).replace(/\./g, ""));
	//		alert(actPlanet.metal);
			actPlanet.cristal=parseInt((J.tools.firstChild(childNode(ress, 1)).innerHTML).replace(/\./g, ""));
			actPlanet.deuterium=parseInt((J.tools.firstChild(childNode(ress, 2)).innerHTML).replace(/\./g, ""));
			actPlanet.updateTime=new Date();
			actPlanet.updateSession=window.session;
		}catch(e)
		{
			J.debug("getResourcesActivePlanete:\n"+e);
		}
	},

	getPlanets : function()
	{
		if(J.undef(J.session))
			J.session="unknown";

	//	J.tR.planetsSessions[J.session]={}
		var select=document.getElementsByTagName("select")[0];
		for(var i=0;i<select.childNodes.length;i++)
		{
			var opt=select.childNodes[i];
			if(opt.nodeName.toUpperCase()!="OPTION") continue;
			var coords=opt.innerHTML.match("\\[[0-9]+:[0-9]+:[0-9]+\\]","g").toString();
			coords=coords.match("[0-9]+:[0-9]+:[0-9]+","g").toString();
			var link=opt.getAttribute("value");
			var cp=link.match("&cp=([0-9]+)&")[1].toString();
			var planet=J.tR.loadPlanet(cp);
			planet.id=cp;
			planet.name=opt.innerHTML.substring(0,opt.innerHTML.indexOf("[")).replace(new RegExp("[\x20\x09\\s]*$","g"),"");
			planet.link=link;
			
			J.tR.planetsSession[cp]=false;
			
			if(opt.selected) 
			{ 
				J.tR.activePlanet=cp; 
				J.tR.planetsSession[cp]=true;
			}
			planet.coordinates=coords;
			J.tR.planets[cp]=planet;
			if(typeof(planet.metal)!="undefined") continue;
			planet.metal=planet.cristal=planet.deuterium=0;
			planet.updateTime=new Date(0);
			planet.updateSession=0;
	//		J.tR.planets[cp]=planet;
			if(typeof(planet.maxMetal)=="undefined")
			{
				planet.maxMetal=planet.maxCristal=planet.maxDeuterium=0;
				planet.prodMetal=planet.prodCristal=planet.prodDeuterium=0;
			}
			J.tR.planets[cp]=planet;
		}
		J.tR.planetsSession.lastUpdate=new Date();
		J.tR.session.planets=J.tR.planetsSession
		J.tR.sessions[J.session]=J.tR.session;
//		J.set( J.tR.GM_Variables.sessions, serialize(J.tR.sessions));
	},

	startDisplayTable : function()
	{
		J.tR.func.displayTable();
		try {clearInterval(J.tR.interval);}catch(e){}
		J.tR.interval = setInterval(J.tR.func.displayResourcesOnly, J.tR.getOption("updaterInterval")*1000);
	},
	displayTable : function()
	{
		J.tR.sessions=unserialize(J.getPartage(J.tR.GM_Variables.sessions, null)||J.get(J.tR.GM_Variables.sessions, "a:0:{}"));

		var div=document.getElementById("div_totalResources");

		if(!J.tR.getOption("displayPanel") 
		|| (J.checkPageResources() && !J.tR.getOption("displayPanelRes"))
		|| (J.checkPageBuildings() && !J.tR.getOption("displayPanelB"))
		|| (J.checkPageGalaxy() && !J.tR.getOption("displayPanelGal"))
		|| (J.checkPageDefenses() && !J.tR.getOption("displayPanelDef"))
		|| (J.checkPageOverview() && !J.tR.getOption("displayPanelOv"))
		|| (J.checkPageFleet() && !J.tR.getOption("displayPanelFl"))
		|| (J.checkPageFleet2() && !J.tR.getOption("displayPanelF2"))
		|| (J.checkPageFleet3() && !J.tR.getOption("displayPanelF3"))
		|| (J.checkPageCS() && !J.tR.getOption("displayPanelCS"))
		|| (J.checkPageTechno() && !J.tR.getOption("displayPanelLab"))
		)
		{
			if(div!=null)div.style.display="none";
			return;
		}
		if(div==null)
		{
			div=document.createElement("div");
			div.id="div_totalResources";
			div.style.zIndex=9900;
			div.style.position="absolute";


			if(J.tR.getOption("panelDockLeft"))
				div.style.left=J.tR.getOption("panelX")+"px";
			else
				div.style.right=J.tR.getOption("panelX")+"px";

			if(J.tR.getOption("panelDockTop"))
				div.style.top=J.tR.getOption("panelY")+"px";
			else
				div.style.bottom=J.tR.getOption("panelY")+"px";
			document.body.appendChild(div);
			var tete=document.createElement("table");
			tete.cellSpacing="0";
			var tr=document.createElement("tr");
			var td=document.createElement("td");
			td.className="c";
	//		tete.style.width="100%";
			tr.style.width=td.style.width="100%";
			td.style.height="15px";
			var a=document.createElement("a");
			a.innerHTML=" "+J.tR.Lang.getStr("MAJ");
			a.setAttribute("href", "http://userscripts.org/scripts/source/53190.user.js");
			a.setAttribute('title',J.tR.Lang.getStr("lastVersion"));
			a.setAttribute('target',"blank");
			a.style.display='block';
			a.style.fontSize="10px";
			a.style.height="14px";
			if(J.tR.update && J.tR.update.need)
			{
				a.style.color="#ff0000";
				a.style.fontWeight="bold";
				a.style.backgroundColor="#fff";
				a.setAttribute('title',J.tR.Lang.getStr("lastVersion")+ " : "+J.tR.update.version);
			}
			a.style.float='right';
			a.style.position='absolute';
			a.style.top='3px';
			a.style.right='3px';
			a.style.cursor="pointer";
			td.appendChild(a);
			
			var img=document.createElement('img');
			img.src=J.images.turnRight;
			img.alt=img.title="Switch";
			img.style.cursor="pointer";
			img.style.height="14px";
			J.register(img, "click", function()
			{
				var vertical=((J.tR.options.orientation=="horizontal")?false:true)
				J.tR.setOption("orientation", ((! vertical)?"vertical":"horizontal"));
				var div=document.getElementById("div_totalResources");
				div.parentNode.removeChild(div);
				J.tR.tableIdsToRefresh.tbodyMoveDefault.orientation= ((! vertical)?"vertical":"horizontal");
				if(!vertical)
				{
					J.tR.setOption("panelDockTop",false);
					J.tR.setOption("panelDockLeft",false);
					J.tR.setOption("panelX",0);
					J.tR.setOption("panelY",0);
				}
				if(vertical)
				{
					J.tR.setOption("panelDockTop",true);
					J.tR.setOption("panelDockLeft",false);
					J.tR.setOption("panelX",0);
					J.tR.setOption("panelY",0);
				}
				J.tR.func.displayTable();
			});

			
			td.appendChild(img);
			var chkbx=document.createElement('input');
			chkbx.type="checkbox";
			chkbx.checked=J.tR.getOption("displayMoons");
			chkbx.title=J.tR.Lang.getStr("dispMoons");
			chkbx.style.padding=chkbx.style.margin=0;
			chkbx.style.height="14px";
			J.register(chkbx, "change", function()
			{
				J.tR.setOption("displayMoons", this.checked);
				J.tR.tableIdsToRefresh.tbodyMoveDefault.displayMoons=this.checked;
				var div=document.getElementById("div_totalResources");
				div.parentNode.removeChild(div);
				J.tR.func.displayTable();
			});
			td.appendChild(chkbx)
			
			var chkbx=document.createElement('input');
			chkbx.type="checkbox";
			chkbx.checked=J.tR.getOption("displayTotal");
			chkbx.title=J.tR.Lang.getStr("disp")+" "+J.tR.Lang.getStr("total");
			chkbx.style.padding=chkbx.style.margin=0;
			chkbx.style.height="14px";
			J.register(chkbx, "change", function()
			{
				J.tR.setOption("displayTotal", this.checked);
				J.tR.tableIdsToRefresh.tbodyMoveDefault.displayTotal=this.checked;
				var div=document.getElementById("div_totalResources");
				div.parentNode.removeChild(div);
				J.tR.func.displayTable();
			});
			td.appendChild(chkbx)
			
			var chkbx=document.createElement('input');
			chkbx.type="checkbox";
			chkbx.checked=J.tR.getOption("displayTransit");
			chkbx.title=J.tR.Lang.getStr("disp")+" "+J.tR.Lang.getStr("transit");
			chkbx.style.padding=chkbx.style.margin=0;
			chkbx.style.height="14px";
			J.register(chkbx, "change", function()
			{
				J.tR.setOption("displayTransit", this.checked);
				J.tR.tableIdsToRefresh.tbodyMoveDefault.displayTransit=this.checked;
				var div=document.getElementById("div_totalResources");
				div.parentNode.removeChild(div);
				J.tR.func.displayTable();
			});
			td.appendChild(chkbx)
			
			var chkbx=document.createElement('input');
			chkbx.type="checkbox";
			chkbx.checked=J.tR.getOption("displayTotals");
			chkbx.title=J.tR.Lang.getStr("disp")+" "+J.tR.Lang.getStr("totals");
			chkbx.style.padding=chkbx.style.margin=0;
			chkbx.style.height="14px";
			J.register(chkbx, "change", function()
			{
				J.tR.setOption("displayTotals", this.checked);
				J.tR.tableIdsToRefresh.tbodyMoveDefault.displayTotals=this.checked;
				var div=document.getElementById("div_totalResources");
				div.parentNode.removeChild(div);
				J.tR.func.displayTable();
			});
			td.appendChild(chkbx)
			
			tr.appendChild(td);
			tete.appendChild(tr);
			//td.style.backgroundColor='yellow';
			div.appendChild(tete);
			tete.style.cursor="move";
			tete.setAttribute("canMove",true);
			tete.setAttribute('toMove', "div_totalResources");
			tete.eltToMove=div;
			tete.id='table_enteteResources';
			J.register(tete, "mousedown", J.tools.mettreEnMouvement);
			
			var table=document.createElement("table");
			table.id="idTableResources";
			div.appendChild(table);

			/*
			var divDown=document.createElement('div');
			divDown.style.height="7px";
			divDown.style.minWidth="30px";
			divDown.style.width="100%";
			divDown.backgroundColor="#ff00ff"
			divDown.style.cursor="move";
			divDown.eltToMove=div;
			div.appendChild(divDown)
			divDown.id='div_bottomResources';
			J.register(divDown, "mousedown", J.tools.mettreEnMouvement);
			*/
		}

		div.style.display="block";

	//	div.innerHTML="";
		var debut=new Date();
		var horizontal=J.tR.getOption("orientation")=="horizontal";
		var table=J.factory.createTable();
		
		var thead=J.factory.createTHead();
		table.appendChild(thead);
		
		var switchPlanets=function()
		{
			J.tR.setOption("planetExpanded", !J.tR.options.planetExpanded);
			J.tR.tableIdsToRefresh.tbodyMoveDefault.planets= J.tR.getOption("planetExpanded");
			var div=document.getElementById("div_totalResources");
			div.parentNode.removeChild(div);
			J.tR.func.displayTable();
		}
		var switchResources=function()
		{
			J.tR.setOption("resourcesExpanded", !J.tR.options.resourcesExpanded);
			J.tR.tableIdsToRefresh.tbodyMoveDefault.resources=J.tR.getOption("resourcesExpanded");
			var div=document.getElementById("div_totalResources");
			div.parentNode.removeChild(div);
			J.tR.func.displayTable();
		}
		
		
		//entete
		var tr=J.factory.createTr();
		var th=J.factory.createTh(J.tR.Lang.getStr('Planet'));
		var img=document.createElement("img");
		img.alt="";
//		img.src=J.images.down;

		J.register(img, "click", function()
		{
			if(J.tR.getOption("orientation")=="horizontal")
				switchResources();
			else
				switchPlanets();
		});
		th.appendChild(img);
		var img1=img;
		var img=document.createElement("img");
		img.alt="";
		img.height=14;
		img.src=J.tR.getOption("panelDockLeft")?J.images.left: J.images.right;
//		img.src=J.images.right;
		J.register(img, "click", function()
		{
			if(J.tR.getOption("orientation")=="vertical")
				switchResources();
			else
				switchPlanets();
		});
		
		if(J.tR.getOption("orientation")=="horizontal")
		{
			if(J.tR.getOption("resourcesExpanded"))
			{
				img1.src=J.tR.getOption("panelDockTop") ?J.images.up: J.images.down;
			}
			else
			{
				img1.src=!J.tR.getOption("panelDockTop") ?J.images.up: J.images.down;
			}
			if(J.tR.getOption("planetExpanded"))
			{
				img.src=J.tR.getOption("panelDockLeft") ?J.images.left: J.images.right;
			}
			else
			{
				img.src=!J.tR.getOption("panelDockLeft") ?J.images.left: J.images.right;
			}
		}
		else
		{
			if(J.tR.getOption("planetExpanded"))
			{
				img1.src=J.tR.getOption("panelDockTop") ?J.images.up: J.images.down;
			}
			else
			{
				img1.src=!J.tR.getOption("panelDockTop") ?J.images.up: J.images.down;
			}
			if(J.tR.getOption("resourcesExpanded"))
			{
				img.src=J.tR.getOption("panelDockLeft") ?J.images.left: J.images.right;
			}
			else
			{
				img.src=!J.tR.getOption("panelDockLeft") ?J.images.left: J.images.right;
			}
		
		}
		
//		

		
		th.appendChild(img);
		th.style.display="block"
		tr.appendChild(th);

		

		var tbody=J.factory.createTBody();
		table.appendChild(tbody);
		
		var ress=J.tR.func.getEmpireResources();



//		for(var i=0;i<trs.length;i++)
//			tbody.appendChild(trs[i]);


		
		if(horizontal)
			if(J.tR.getOption("planetExpanded") || J.tR.getOption("resourcesExpanded"))
			{
				var trs=J.tR.func.createResourcesTrs(ress, J.tR.getOption("orientation"),J.tR.getOption("resourcesExpanded"), J.tR.getOption("planetExpanded"),  J.tR.getOption("displayMoons"),  J.tR.getOption("displayTotal"),  J.tR.getOption("displayTransit"),  J.tR.getOption("displayTotals"));
				trs[0].insertBefore(th, trs[0].firstChild);
				trs[0].style.maxHeight="18px"
				thead.appendChild(trs[0]);
			}
					thead.appendChild(tr);
		if(!horizontal)
			if(J.tR.getOption("resourcesExpanded"))
			{
				th=J.factory.createTh(J.tR.Lang.getStr('metal'));
				tr.appendChild(th);
				th=J.factory.createTh(J.tR.Lang.getStr('cristal'));
				tr.appendChild(th);
				th=J.factory.createTh(J.tR.Lang.getStr('deut'));
				tr.appendChild(th);
				if(J.tR.getOption("displayTotals"))
				{
					th=J.factory.createTh(J.tR.Lang.getStr('total'));
					tr.appendChild(th);
				}
				thead.appendChild(tr);
			}
			else thead.appendChild(tr);

						
		table.style.fontSize=J.tR.CSS.fontSize;
		table.setAttribute("cellspacing", 0);
		
		var tfoot=J.factory.createTFoot();
		table.appendChild(tfoot);

		if(horizontal)
		{
			// thead.style.display=tbody.style.display=tfoot.style.display="block";
			// thead.style.float=tbody.style.float=tfoot.style.float="left";
		}

		tr=J.factory.createTr();
		th=J.factory.createTh();
		th.style.display="none";
		tr.appendChild(th);
		th=J.factory.createTh();
		th.innerHTML=''+(new Date().getTime()-debut.getTime())+'ms';
		//th.setAttribute("colspan",2);
//		tr.appendChild(th);

		th=J.factory.createTh();
		th.innerHTML="Stop";
		J.register(th, "click", function(){
			clearInterval(J.tR.interval);
			this.innerHTML="Start";

			J.register(this, "click", function(){J.tR.func.startDisplayTable();});
		});
		th.id="bt_stop_interval_refreshResources";
//		th.setAttribute("colspan",2);
		tr.appendChild(th);
		tfoot.appendChild(tr);
		
		table.id="idTableResources";
		tbody.id="tbodyMoveDefault";
		
		J.tR.tableIdsToRefresh.tbodyMoveDefault = 
		{
			orientation:J.tR.getOption("orientation"),
			resources:J.tR.getOption("resourcesExpanded"), 
			planets: J.tR.getOption("planetExpanded"),
			displayMoons:J.tR.getOption("displayMoons"),
			displayTotal:J.tR.getOption("displayTotal"),
			displayTransit:J.tR.getOption("displayTransit"),
			displayTotals:J.tR.getOption("displayTotals"),
		}
		
		try
		{
			var oldTable=document.getElementById("idTableResources");
			div.replaceChild(table,oldTable);
			table.id="idTableResources"
		}
		catch(exc)
		{
			div.appendChild(table);
			table.id="idTableResources"
		}
		table.id="idTableResources"

		if(J.eltEnMouvement==null)
			document.getElementById('table_enteteResources').style.width=table.offsetWidth;

				
		if(parseInt(div.offsetTop)<0) 
		{
			if(J.tR.getOption("panelDockTop"))
				div.style.Top="0px";
			else
				div.style.bottom=(parseInt(div.style.bottom)+ parseInt(div.offsetTop))+"px";
		}
		
		
		try
		{
			J.tR.session.lastUpdate=new Date();
			J.tR.sessions[J.session]=J.tR.session;	
			J.set(J.tR.GM_Variables.sessions, serialize(J.tR.sessions)); 
		} catch(e){}
		setTimeout(J.tR.func.displayResourcesOnly, 100)
	},

	parseResourcesPage : function()
	{
		var firstNext=function(elt)
		{
			var child=elt.nextSibling;
			while(child.nodeType!=null && child.nodeType!=1)child=child.nextSibling;
			return child;
		}

		var form=document.getElementById("ressourcen");
		var table=J.getFirstChildOfType(form, "table")
		var tbody=J.getFirstChildOfType(table, "tbody")
		var planet=J.tR.planets[J.tR.activePlanet];
		for(var i=0; i<tbody.childNodes.length;i++)
		{
			var tr=tbody.childNodes[i];
			if(!J.estDeType(tr,"tr")) continue;
			
			
			var th=J.getFirstChildOfType(tr, "th");
			if(th==null)continue;
			if(th.innerHTML.indexOf(J.tR.getRepere("capaciteDesDepots"))!=-1)
			{
				var td=firstNext(th);
				var font=J.tools.firstChild(td);
				planet.maxMetal= parseInt(font.innerHTML.replace(/\./g, "").replace("k", "000").replace("M", "000000"))
				td=firstNext(td);
				font=J.tools.firstChild(td);
				planet.maxCristal= parseInt(font.innerHTML.replace(/\./g, "").replace("k", "000").replace("M", "000000"))
				td=firstNext(td);
				font=J.tools.firstChild(td);
				planet.maxDeuterium= parseInt(font.innerHTML.replace(/\./g, "").replace("k", "000").replace("M", "000000"))
			}
			if(th.innerHTML.indexOf(J.tR.getRepere("productionTotale"))!=-1)
			{
				var td=firstNext(th);
				var font=J.tools.firstChild(td);
				planet.prodMetal= parseInt(font.innerHTML.replace(/\./g, "").replace("k", "000").replace("M", "000000"));
				td=firstNext(td);
				font=J.tools.firstChild(td);
				planet.prodCristal= parseInt(font.innerHTML.replace(/\./g, "").replace("k", "000").replace("M", "000000"))
				td=firstNext(td);
				font=J.tools.firstChild(td);
				planet.prodDeuterium= parseInt(font.innerHTML.replace(/\./g, "").replace("k", "000").replace("M", "000000"))
			}
		}
		J.tR.planets[J.tR.activePlanet]=planet;
	},

	parseBuildingsPage:function()
	{
		var planetB=unserialize(J.get(J.tR.GM_Variables.planetB+J.tR.activePlanet, serialize({
																					lvl1: 0, // Metal
																					lvl1U:false, 
																					lvl2: 0, // Cri
																					lvl2U: false,
																					lvl3: 0, // Deut
																					lvl3U: false,
																				})));
		var buildingsName=unserialize(J.get(J.tR.GM_Variables.buildingsName, serialize({"B1":"Mine de métal", "B2":"Mine de cristal", B3:"Mine de deutérium"})));
		
		var trs=document.getElementById('content').getElementsByTagName("center")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
//		document.getElementById('content').getElementsByTagName("center")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].innerHTML


		var getCosts = false &&  J.tR.getOption("getBuildingsCosts");
		var strM = J.tR.getRepere("strMetal");
		var strC = J.tR.getRepere("strCristal");
		var strD = J.tR.getRepere("strDeut");
		
		var buiCosts  = unserialize(J.get(J.tR.GM_Variables.buildingsCosts, serialize({})));
		

		var getLvl=function(tr, building)
		{
		try{
			var reduced=0;
			if(tr.getElementsByTagName("td").length==2)
				reduced=-1;
			
			var tds=tr.getElementsByTagName("td");
			var a=tds[1+reduced].getElementsByTagName("a")[0]
			buildingsName["B"+building]=a.innerHTML;
			try {
				var lvl=a.nextSibling.nodeValue;
				var match2=lvl.match(/[^d]([\d]+)[^d]/);
				if(match2)planetB["lvl"+building]=parseInt(match2[1]);
			}catch(e){
				planetB["lvl"+building]=0;
			}
			var divs=tr.getElementsByTagName("div");
			planetB["lvl"+building+"U"]=false;
			for(var i=0;i<divs.length;i++)
			{
				if(divs[i].id=="bxx")
				{
					planetB["lvl"+building+"U"]=true;
					try 
					{
						var timeLeft=divs[i].innerHTML.substring(0, divs[i].innerHTML.indexOf("<")).split(":");
						var dte=new Date().getTime();
						dte=dte+(parseInt(timeLeft[2])+parseInt(timeLeft[1])*60+parseInt(timeLeft[0])*3600)*1000;
						var date=new Date();date.setTime(dte);
						planetB["lvl"+building+"UF"]=date;
					}catch(e){}
					if(getCosts)
					{
						try 
						{
							var bs = tds[1+reduced].getElementsByTagName("b");
							var res = new J.resources(0,0,0);
							for(var i=0;i<bs.length;i++)
							{
								var b = bs[i];
								var val;
								var match2=b.innerHTML.match(/([\d\.]+)/);
								if(match2)val=parseInt(match2[1].toString().replace(/\./g, ""));
								else val=0;
								var ps = b.previousSibling;
								if(ps==null)continue;
								if(ps.nodeValue.indexOf(strM)!=-1)
									res.M = val;
								else if(ps.nodeValue.indexOf(strC)!=-1)
									res.C = val;
								else if(ps.nodeValue.indexOf(strD)!=-1)
									res.D = val;
							}
							buiCosts["B"+building+"M"]=res.M;
							buiCosts["B"+building+"C"]=res.C;
							buiCosts["B"+building+"D"]=res.D;
						}catch(e){}
					}

					break;
				}
			}
			}catch(e){}
		}
		
		for(var i=0;i<trs.length;i++)
		{
		try{
			var tr=trs[i];
			var href=tr.getElementsByTagName("td")[0].getElementsByTagName("a")[0].getAttribute("href");
			var match=href.match(/index[\.]php[\?]page[=]infos[&]session[=][a-z\w\d]+[&]gid[=]([0-9]+)/);
			if(match)
			{
				var gid=match[1].toString();
				try
				{
				getLvl(tr, gid);
				// switch(parseInt(gid))
				// {
					// case 1: // Metal
						
						// break;
					// case 2: // Cristal
						// getLvl(tr, "C")
						// break;
					// case 3: // Deut
						// getLvl(tr, "D")
						// break;
					// case 4: // Centrale solaire
						// getLvl(tr, "CS")
						// break;
					// case 12: // centrale fusion
						// getLvl(tr, "CF")
						// break;
					// case 14: // Robots
						// getLvl(tr, "R")
						// break;
					// case 15: // Nanites
						// getLvl(tr, "N")
						// break;
					// case 21: // Chantier
						// getLvl(tr, "ChS")
						// break;
					// case 22: // Hangar metal
						// getLvl(tr, "HM")
						// break;
					// case 23: // Hangar Cri
						// getLvl(tr, "HC")
						// break;
					// case 24: // Hangar Deut
						// getLvl(tr, "HD")
						// break;
					// case 31: // Labo
						// getLvl(tr, "LR")
						// break;
					// case 44: // Silos missiles
						// getLvl(tr, "SM")
						// break;
						
				// }
				}catch(e){}
			}
			}catch(e)
			{}
		}
		
		J.set(J.tR.GM_Variables.planetB+J.tR.activePlanet, serialize(planetB));
		J.set(J.tR.GM_Variables.buildingsName, serialize(buildingsName));
		if(getCosts)
			J.set(J.tR.GM_Variables.buildingsCosts, serialize(buiCosts));
	},
	
	parseDefensesPage:function()
	{
		var planetD=unserialize(J.get(J.tR.GM_Variables.planetD+J.tR.activePlanet, serialize({
																		})));
		var defensesName=unserialize(J.get(J.tR.GM_Variables.defensesName, serialize({})));
		
		var trs=document.getElementById('content').getElementsByTagName("center")[0].getElementsByTagName("form")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
//		document.getElementById('content').getElementsByTagName("center")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].innerHTML
		
		var getCosts = J.tR.getOption("getDefensesCosts");
		var strM = J.tR.getRepere("strMetal");
		var strC = J.tR.getRepere("strCristal");
		var strD = J.tR.getRepere("strDeut");
		
		var defCosts  = unserialize(J.get(J.tR.GM_Variables.defensesCosts, serialize({})));
		
		try {
		var getLvl=function(tr, building)
		{
			try
			{
				var reduced=0;
				if(tr.getElementsByTagName("td").length==2)
					reduced=-1;
				
				var tds=tr.getElementsByTagName("td");
				var a=tds[1+reduced].getElementsByTagName("a")[0]
				defensesName["D"+building]=a.innerHTML;
				try {
					var lvl=a.nextSibling.nodeValue;
					var match2=lvl.match(/[^d]([\d\.]+)[^d]/);
					if(match2)planetD["NB"+building]=parseInt(match2[1].toString().replace(/\./g, ""));
					else planetD["NB"+building]=0;
				}catch(e){
					planetD["NB"+building]=0;
				}
				if(getCosts)
				{
					try 
					{
						var bs = tds[1+reduced].getElementsByTagName("b");
						var res = new J.resources(0,0,0);
						for(var i=0;i<bs.length;i++)
						{
							var b = bs[i];
							var val;
							var match2=b.innerHTML.match(/([\d\.]+)/);
							if(match2)val=parseInt(match2[1].toString().replace(/\./g, ""));
							else val=0;
							var ps = b.previousSibling;
							if(ps==null)continue;
							if(ps.nodeValue.indexOf(strM)!=-1)
								res.M = val;
							else if(ps.nodeValue.indexOf(strC)!=-1)
								res.C = val;
							else if(ps.nodeValue.indexOf(strD)!=-1)
								res.D = val;
						}
						defCosts["D"+building+"M"]=res.M;
						defCosts["D"+building+"C"]=res.C;
						defCosts["D"+building+"D"]=res.D;
					}catch(e){}
				}

			}catch(e){}
		}
	//					alert("dd")

		for(var i=0;i<trs.length;i++)
		{
		try{
			var tr=trs[i];
			var href=tr.getElementsByTagName("td")[0].getElementsByTagName("a")[0].getAttribute("href");
			var match=href.match(/index[\.]php[\?]page[=]infos[&]session[=][a-z\w\d]+[&]gid[=]([0-9]+)/);
			if(match)
			{
				var gid=match[1].toString();
				try
				{
				getLvl(tr, gid);
				}catch(e){}
			}
			}catch(e)
			{}
		}
		try {
//		alert(serialize(planetD))
		J.set(J.tR.GM_Variables.planetD+J.tR.activePlanet, serialize(planetD));
		J.set(J.tR.GM_Variables.defensesName, serialize(defensesName));
		if(getCosts)
			J.set(J.tR.GM_Variables.defensesCosts, serialize(defCosts));

		}catch(e){}
		
	}catch(e){}
	
	},
	
	parseChantierSpatialPage:function()
	{
		var planetS=unserialize(J.get(J.tR.GM_Variables.planetS+J.tR.activePlanet, serialize({
																		})));
		var shipsName=unserialize(J.get(J.tR.GM_Variables.shipsName, serialize({})));
		
		var trs=document.getElementById('content').getElementsByTagName("center")[0].getElementsByTagName("form")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
//		document.getElementById('content').getElementsByTagName("center")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].innerHTML
		
		var getCosts = J.tR.getOption("getShipsCosts");
		var strM = J.tR.getRepere("strMetal");
		var strC = J.tR.getRepere("strCristal");
		var strD = J.tR.getRepere("strDeut");
		
		var shiCosts  = unserialize(J.get(J.tR.GM_Variables.shipsCosts, serialize({})));

		try {
		var getLvl=function(tr, building)
		{
			try
			{
				var reduced=0;
				if(tr.getElementsByTagName("td").length==2)
					reduced=-1;
				
				var tds=tr.getElementsByTagName("td");
				var a=tds[1+reduced].getElementsByTagName("a")[0]
				shipsName["F"+building]=a.innerHTML;
				try {
					var lvl=a.nextSibling.nodeValue;
					var match2=lvl.match(/[^d]([\d\.]+)[^d]/);
					if(match2)planetS["F"+building]=parseInt(match2[1].toString().replace(/\./g, ""));
					else planetS["F"+building]=0;
				}catch(e){
					planetS["F"+building]=0;
				}

				if(getCosts)
				{
					try 
					{
						var bs = tds[1+reduced].getElementsByTagName("b");
						var res = new J.resources(0,0,0);
						for(var i=0;i<bs.length;i++)
						{
							var b = bs[i];
							var val;
							var match2=b.innerHTML.match(/([\d\.]+)/);
							if(match2)val=parseInt(match2[1].toString().replace(/\./g, ""));
							else val=0;
							var ps = b.previousSibling;
							if(ps==null)continue;
							if(ps.nodeValue.indexOf(strM)!=-1)
								res.M = val;
							else if(ps.nodeValue.indexOf(strC)!=-1)
								res.C = val;
							else if(ps.nodeValue.indexOf(strD)!=-1)
								res.D = val;
						}
						shiCosts["F"+building+"M"]=res.M;
						shiCosts["F"+building+"C"]=res.C;
						shiCosts["F"+building+"D"]=res.D;
					}catch(e){}
				}

			}catch(e){}
		}
	//					alert("dd")

		for(var i=0;i<trs.length;i++)
		{
		try{
			var tr=trs[i];
			var href=tr.getElementsByTagName("td")[0].getElementsByTagName("a")[0].getAttribute("href");
			var match=href.match(/index[\.]php[\?]page[=]infos[&]session[=][a-z\w\d]+[&]gid[=]([0-9]+)/);
			if(match)
			{
				var gid=match[1].toString();
				try
				{
				getLvl(tr, gid);
				}catch(e){}
			}
			}catch(e)
			{}
		}
		try {
//		alert(serialize(planetD))
		J.set(J.tR.GM_Variables.planetS+J.tR.activePlanet, serialize(planetS));
		J.set(J.tR.GM_Variables.shipsName, serialize(shipsName));
		if(getCosts)
			J.set(J.tR.GM_Variables.shipsCosts, serialize(shiCosts));

		}catch(e){}
		
	}catch(e){}
	
	},
	
	
	parseTechnologyPage:function()
	{
	
		var planetB=unserialize(J.get(J.tR.GM_Variables.planetT+J.tR.activePlanet, serialize({
																				})));
		var buildingsName=unserialize(J.get(J.tR.GM_Variables.technologiesName, serialize({})));
		
		var trs=document.getElementById('content').getElementsByTagName("center")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
//		document.getElementById('content').getElementsByTagName("center")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].innerHTML


		var getCosts =false &&  J.tR.getOption("getTechnologiesCosts");
		var strM = J.tR.getRepere("strMetal");
		var strC = J.tR.getRepere("strCristal");
		var strD = J.tR.getRepere("strDeut");
		
		var buiCosts  = unserialize(J.get(J.tR.GM_Variables.technologiesCosts, serialize({})));
		

		var getLvl=function(tr, building)
		{
		try{
			var reduced=0;
			if(tr.getElementsByTagName("td").length==2)
				reduced=-1;
			
			var tds=tr.getElementsByTagName("td");
			var a=tds[1+reduced].getElementsByTagName("a")[0]
			buildingsName["T"+building]=a.innerHTML;
			try {
				var lvl=a.nextSibling.nodeValue;
				var match2=lvl.match(/[^d]([\d]+)[^d]/);
				if(match2)planetB["lvl"+building]=parseInt(match2[1]);
			}catch(e){
				planetB["lvl"+building]=0;
			}
			var divs=tr.getElementsByTagName("div");
			planetB["lvl"+building+"U"]=false;
			for(var i=0;i<divs.length;i++)
			{
				if(divs[i].id=="bxx")
				{
					planetB["lvl"+building+"U"]=true;
					try 
					{
						var timeLeft=divs[i].innerHTML.substring(0, divs[i].innerHTML.indexOf("<")).split(":");
						var dte=new Date().getTime();
						dte=dte+(parseInt(timeLeft[2])+parseInt(timeLeft[1])*60+parseInt(timeLeft[0])*3600)*1000;
						var date=new Date();date.setTime(dte);
						planetB["lvl"+building+"UF"]=date;
					}catch(e){}
					if(getCosts)
					{
						try 
						{
							var bs = tds[1+reduced].getElementsByTagName("b");
							var res = new J.resources(0,0,0);
							for(var i=0;i<bs.length;i++)
							{
								var b = bs[i];
								var val;
								var match2=b.innerHTML.match(/([\d\.]+)/);
								if(match2)val=parseInt(match2[1].toString().replace(/\./g, ""));
								else val=0;
								var ps = b.previousSibling;
								if(ps==null)continue;
								if(ps.nodeValue.indexOf(strM)!=-1)
									res.M = val;
								else if(ps.nodeValue.indexOf(strC)!=-1)
									res.C = val;
								else if(ps.nodeValue.indexOf(strD)!=-1)
									res.D = val;
							}
							buiCosts["T"+building+"M"]=res.M;
							buiCosts["T"+building+"C"]=res.C;
							buiCosts["T"+building+"D"]=res.D;
						}catch(e){}
					}

					break;
				}
			}
			}catch(e){}
		}
		
		for(var i=0;i<trs.length;i++)
		{
		try{
			var tr=trs[i];
			var href=tr.getElementsByTagName("td")[0].getElementsByTagName("a")[0].getAttribute("href");
			var match=href.match(/index[\.]php[\?]page[=]infos[&]session[=][a-z\w\d]+[&]gid[=]([0-9]+)/);
			if(match)
			{
				var gid=match[1].toString();
				try
				{
				getLvl(tr, gid);
				}catch(e){}
			}
			}catch(e)
			{}
		}
		
		J.set(J.tR.GM_Variables.planetT+J.tR.activePlanet, serialize(planetB));
		J.set(J.tR.GM_Variables.technologiesName, serialize(buildingsName));
		if(getCosts)
			J.set(J.tR.GM_Variables.technologiesCosts, serialize(buiCosts));
			
	},

	
	parseFleetPage:function()
	{
		var ships={};
		var inputs=document.getElementById("content").getElementsByTagName("input");
		var shipsName=unserialize(J.get(J.tR.GM_Variables.shipsName, serialize({"F202":"Petit transporteur"})));
		for(var i=0;i<inputs.length;i++)
		{
			try
			{
			var input=inputs[i];
			var name=input.getAttribute('name');
			if(name==null||name.substring(0, 7)!="maxship")continue;
			var num="F"+name.substring(7);
			var nb=parseInt(input.getAttribute("value"));
			ships[num]=nb;
			var name=input.parentNode.parentNode.getElementsByTagName("th")[0].getElementsByTagName("a")[0].innerHTML;
			shipsName[num]=name;
			}catch(e){}
		}
		J.set(J.tR.GM_Variables.planetS+J.tR.activePlanet, serialize(ships));
		J.set(J.tR.GM_Variables.shipsName, serialize(shipsName));
	},
	displayResourcesOnly:function()
	{
		var ress;
		var timeBfFull=J.tR.getOption("dispTimeFull");
		for(var id in J.tR.tableIdsToRefresh)
		{
			if(J.undef(ress))ress=J.tR.func.getEmpireResources();
			try 
			{
				var tbody=document.getElementById(id);
				if(tbody==null)continue;
	//			alert(" "+J.tR.tableIdsToRefresh.orientation+" "+
				var tbl=J.tR.tableIdsToRefresh[id];
				var displayMoons=J.undef(tbl.displayMoons)?true:tbl.displayMoons;
				var displayTotal=J.undef(tbl.displayTotal)?true:tbl.displayTotal;
				var displayTransit=J.undef(tbl.displayTransit)?true:tbl.displayTransit;
				var displayTotals=J.undef(tbl.displayTotals)?true:tbl.displayTotals;
				var trs=J.tR.func.createResourcesTrs(ress,J.tR.tableIdsToRefresh[id].orientation,J.tR.tableIdsToRefresh[id].resources, J.tR.tableIdsToRefresh[id].planets, displayMoons, displayTotal , displayTransit, displayTotals);

				tbody.innerHTML="";

				var horizontal=J.tR.tableIdsToRefresh[id].orientation=="horizontal";
//				alert(horizontal)
				if(horizontal)
				{
					if(J.tR.getOption("resourcesExpanded"))
					{
						var th=J.factory.createTh(J.tR.Lang.getStr('metal'));
						trs[1].insertBefore(th, trs[1].firstChild);
						th=J.factory.createTh(J.tR.Lang.getStr('cristal'));
						trs[2].insertBefore(th, trs[2].firstChild);
						th=J.factory.createTh(J.tR.Lang.getStr('deut'));
						trs[3].insertBefore(th, trs[3].firstChild);
						if(displayTotals)
						{
							th=J.factory.createTh(J.tR.Lang.getStr('total'));
							trs[4].insertBefore(th, trs[4].firstChild);
						}
						if(timeBfFull)
						{
							th=J.factory.createTh("");
							trs[4+(displayTotals?1:0)].insertBefore(th, trs[4+(displayTotals?1:0)].firstChild);
						}
						for(var i=1;i<trs.length;i++) 
						{
							tbody.appendChild(trs[i]);
						}
					}
				}
				else
					for(var i=0;i<trs.length;i++) 
					{
						tbody.appendChild(trs[i]);
					}
			}
			catch(e)
			{
				
			}
		}
	},

	getEmpireResources : function()
	{
		var pls={};
		var met=0;
		var cris=0;
		var deut=0;
		var tot=0;
		var timeBfFull=J.tR.getOption("dispTimeFull");
	//	var totRes=new J.resources(0,0,0);
	//			totRes=totRes.plus(res);
		for(var cp in J.tR.planetsSession)
		{
			if(cp=="lastUpdate") continue;
			try
			{
				var planet=J.tR.planets[cp];
				var diffTime=J.tR.func.getTimeSinceUpdate(planet.updateTime);
				var res=new J.resources(
					parseInt(Math.max(planet.metal, Math.min(planet.maxMetal, planet.metal+diffTime*planet.prodMetal))),
					parseInt(Math.max(planet.cristal, Math.min(planet.maxCristal, planet.cristal+diffTime*planet.prodCristal))),
					parseInt(Math.max(planet.deuterium, Math.min(planet.maxDeuterium, planet.deuterium+diffTime*planet.prodDeuterium)))
					);
				if(cp==J.tR.activePlanet)
					try {
						J.tR.session.activePlanetResources=res;
					}catch(e){}
				
				if(timeBfFull)
				{
					var date=new Date();date.setTime(0);
					if(res.M>=planet.maxMetal || res.C>=planet.maxCristal || res.D>=planet.maxDeuterium)
						;
					else
					{	
						var hr=1.0*Math.min((planet.maxMetal-res.M)/planet.prodMetal,(planet.maxCristal-res.C)/planet.prodCristal, (planet.maxDeuterium-res.D)/planet.prodDeuterium);
//						date.setHours(hr);
						if(hr==Number.Infinity) date.setYear(1);
						else date.setMinutes(hr*60);
					}
					pls[cp]={resources:res, planet:planet, timeLeft:date}
				}
				else
					pls[cp]={resources:res, planet:planet}
			}
			catch(e)
			{
			}
		}
		try {
			J.setPartage(J.tR.GM_Variables.resources, serialize(pls));
		}catch(e){}
		return pls;
	},
	getTotalProd : function()
	{
		var pls={};
		var met=0;
		var cris=0;
		var deut=0;
		for(var cp in J.tR.planetsSession)
		{
			if(cp=="lastUpdate") continue;
			try
			{
				var planet=J.tR.planets[cp];
				met+=planet.prodMetal;
				cris+=planet.prodCristal;
				deut+=planet.prodDeuterium;
			}
			catch(e)
			{
			}
		}
		return new J.resources(met,cris,deut);
	},

	createResourcesTrs : function(ress, orientation, resources, planets, displayMoons, displayTotal, displayTransit, displayTotals)
	{
		displayMoons=J.undef(displayMoons)?true:displayMoons;
		displayTransit=J.undef(displayTransit)?true:displayTransit;
		displayTotal=J.undef(displayTotal)?true:displayTotal;
		displayTotals=J.undef(displayTotals)?true:displayTotals;
		var timeBfFull=J.tR.getOption("dispTimeFull");
		var trs=[];
		var tot=new J.resources(0,0,0);

		var dispFillStatus=J.tR.getOption("siloFilling");

		var totalsLimit=J.tR.getOption("totalsLimit");
		var checkTotalsLimit=totalsLimit>0;
		var totalsOverflowClass=J.tR.getOption("classOverflow");
		switch(orientation)
		{
			case "vertical":
			{
				var tr, th, res, title;
				for(var cp in ress)
				{
					res=ress[cp];
						
					if(planets &&(displayMoons || !J.tR.isLune(res.planet)))
					{
						if(resources)
						{
							if(dispFillStatus && !J.tR.isLune(res.planet))
								ths=res.resources.toThsWithFillStatus(J.tools.createAPlanet(res.planet), displayTotals, new J.resources(res.planet.maxMetal,res.planet.maxCristal,res.planet.maxDeuterium));
							else
								ths=res.resources.toThs(J.tools.createAPlanet(res.planet), displayTotals);
							if(!J.tR.isLune(res.planet))
							{
								if(res.resources.M>=res.planet.maxMetal)
									ths[1].className+=" "+J.tR.getOption("classThFull");
								if(res.resources.C>=res.planet.maxCristal)
									ths[2].className+=" "+J.tR.getOption("classThFull");
								if(res.resources.D>=res.planet.maxDeuterium)
									ths[3].className+=" "+J.tR.getOption("classThFull");
								if(ths.length>4 && checkTotalsLimit && res.resources.total()>totalsLimit )
									ths[4].className+=" "+J.tR.getOption("classOverflow");	
								if(timeBfFull)
								{
									var min=res.timeLeft.getUTCMinutes();
									var s=""+parseInt(res.timeLeft.getTime()/3600000)+"h "+(min>9?min:"0"+min)+"m";
									ths.push(J.factory.createTh(s));
								}
							}
							
							tr=J.factory.createFilledTrWith(ths);
						}
						else tr=J.factory.createFilledTrWith([J.factory.createTh(J.tools.createAPlanet(res.planet))])
							
						trs.push(tr);
					}
					tot=tot.plus(res.resources);
				}
				
				
				
				try {
					J.tR.session.totalResources=tot;
				}catch(e){}

				if(resources)
				{
					if(displayTotal)
					{
						if(displayTotals)
							tr=J.factory.createFilledTr([
									J.tR.Lang.getStr("total"),
									J.tR.getString(tot.M),
									J.tR.getString(tot.C),
									J.tR.getString(tot.D),
									J.tR.getString(tot.total())])
						else
							tr=J.factory.createFilledTr([
									J.tR.Lang.getStr("total"),
									J.tR.getString(tot.M),
									J.tR.getString(tot.C),
									J.tR.getString(tot.D)])
						trs.push(tr);
					}
					var totTrans=J.getPartage(J.overview.GM_Variables.checkedResources);
					if(displayTransit && !J.undef(totTrans)&& totTrans!=null && !J.undef(totTrans.C))
					{

						var totTot=tot.plus(totTrans);
						
						if(displayTotals)
							tr=J.factory.createFilledTr([
									"+"+J.tR.Lang.getStr("transit"),
									J.tR.getString(totTot.M),
									J.tR.getString(totTot.C),
									J.tR.getString(totTot.D),
									J.tR.getString(totTot.total())])
						else
							tr=J.factory.createFilledTr([
									"+"+J.tR.Lang.getStr("transit"),
									J.tR.getString(totTot.M),
									J.tR.getString(totTot.C),
									J.tR.getString(totTot.D)])
						trs.push(tr);
						
					}
				}			
				return trs;
			}
			case "horizontal":
				var tr, th, res, title;
				var trPlanets=J.factory.createTr();
				var trMetal=J.factory.createTr();
				var trCristal=J.factory.createTr();
				var trDeut=J.factory.createTr();
				var trTotal=J.factory.createTr();
				var trFullTime=J.factory.createTr();

				for(var cp in ress)
				{
					res=ress[cp];
					if(planets)
					{
						if(displayMoons || !J.tR.isLune(res.planet))
						{
							if(resources)
							{
								
								if(dispFillStatus&&!J.tR.isLune(res.planet))
									ths=res.resources.toThsWithFillStatus(J.tools.createAPlanet(res.planet), true, new J.resources(res.planet.maxMetal,res.planet.maxCristal,res.planet.maxDeuterium));
								else
									ths=res.resources.toThs(J.tools.createAPlanet(res.planet));
								if(!J.tR.isLune(res.planet))
								{
									if(res.resources.M>=res.planet.maxMetal)
										ths[1].className+=" "+J.tR.getOption("classThFull");
									if(res.resources.C>=res.planet.maxCristal)
										ths[2].className+=" "+J.tR.getOption("classThFull");
									if(res.resources.D>=res.planet.maxDeuterium)
										ths[3].className+=" "+J.tR.getOption("classThFull");
									if(ths.length>4 && checkTotalsLimit && res.resources.total()>totalsLimit )
										ths[4].className+=" "+J.tR.getOption("classOverflow");
								}

								trPlanets.appendChild(ths[0])
								trMetal.appendChild(ths[1])
								trCristal.appendChild(ths[2])
								trDeut.appendChild(ths[3])
								trTotal.appendChild(ths[4])
								if(timeBfFull)
								{
									if(!J.tR.isLune(res.planet))
									{
										var min=res.timeLeft.getUTCMinutes();
										var s=""+parseInt(res.timeLeft.getTime()/3600000)+"h "+(min>9?min:"0"+min)+"m";
										trFullTime.appendChild(J.factory.createTh(s));
									}
									else trFullTime.appendChild(J.factory.createTh());
								}

							}
							else trPlanets.appendChild(J.factory.createTh(J.tools.createAPlanet(res.planet)));
						}
					}
					tot=tot.plus(res.resources);
				}
				
				

				try {
					J.tR.session.totalResources=tot;
				}catch(e){}

				if(resources)
				{
					if(displayTotal)
					{
						trPlanets.appendChild(J.factory.createTh(J.tR.Lang.getStr("total")))
						trMetal.appendChild(J.factory.createTh(J.tR.getString(tot.M)))
						trCristal.appendChild(J.factory.createTh(J.tR.getString(tot.C)))
						trDeut.appendChild(J.factory.createTh(J.tR.getString(tot.D)))
						trTotal.appendChild(J.factory.createTh(J.tR.getString(tot.total())))
					}
					var totTrans=J.getPartage(J.overview.GM_Variables.checkedResources);
					if(displayTransit && !J.undef(totTrans)&& totTrans!=null && !J.undef(totTrans.C))
					{
						var totTot=tot.plus(totTrans);
						trPlanets.appendChild(J.factory.createTh("+"+J.tR.Lang.getStr("transit")))
						trMetal.appendChild(J.factory.createTh(J.tR.getString(totTot.M)))
						trCristal.appendChild(J.factory.createTh(J.tR.getString(totTot.C)))
						trDeut.appendChild(J.factory.createTh(J.tR.getString(totTot.D)))
						trTotal.appendChild(J.factory.createTh(J.tR.getString(totTot.total())))						
					}
				}	
				if(resources)
				{
					var trs=[trPlanets,trMetal,trCristal,trDeut];
					if(displayTotals) trs.push(trTotal);
					if(timeBfFull) trs.push(trFullTime);
					return trs;
				}
				else if(timeBfFull) return [trPlanets,trFullTime];
				else return [trPlanets];
		}
	},
		//Useless
	getTimeSinceRefresh:function()
	{
		return (new Date().getTime()-J.dateDocument.getTime())/3600000.0;
		//J.tR.serverTime
	},
	getTimeSinceUpdate:function(updateDate)
	{
		return (new Date().getTime()-updateDate.getTime())/3600000.0;
		//J.tR.serverTime
	},

	getTdEvt:function()
	{
		var tds=document.getElementsByTagName("td");
		for(var i=0;i<tds.length; i++)
		{
			if(escape(tds[i].innerHTML).toLowerCase().indexOf(escape(J.tR.getRepere("strEvts")).toLowerCase())!=-1)
			{
				return tds[i];
			}
		}
		throw "Impossible de récupérer le <TD> Evènements.";
		return null;
	},

	prepareTdEvt :function()
	{
		var tdEvenements=document.getElementById("tdEvenements") || J.tR.func.getTdEvt();
		tdEvenements.id="tdEvenements";
		var spanJOG=document.getElementById("spanJOG");
		if(spanJOG==null)
		{
			spanJOG=document.createElement("span");
			spanJOG.id="spanJOG";
			tdEvenements.appendChild(J.factory.createTxt(" - "))
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
			var tdOptions=J.tR.func.creerTableauOptions();
			tdOptions.parentNode.style.display="none";
			tdOptions.style.textAlign="center"
			try
			{
				spanOptions.style.color=J.tR.CSS.evtsSpanColor;
				J.register(spanOptions, "click",  function()
				{
					J.tR.func.afficherTableauOptions();
				})
			}catch(e){}
		}
		
		var input=document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("value", J.tR.Lang.getStr("showOptions"));
		input.style.textAlign="center";
		tdOptions.appendChild(input);
		J.register(input, "click", J.tR.func.createTableOptionsTr);

		
		return {tdEvenements:tdEvenements, spanJOG:spanJOG, spanExtensions:spanExtensions, spanOptions:spanOptions, tdOptions:tdOptions};
	//		spanExtensions.innerHTML="Ressources - Options";
		
	},

	
	createTableOptionsTr:function()
	{
		var createTextboxOption=function(table, optionName, optionTitle, varToUpdate)
		{
			var th2=J.factory.createTh(J.tR.Lang.getStr(optionTitle));
			th2.style.cursor="pointer";
			var chkbx=document.createElement('input');
			chkbx.type="input";
			chkbx.value=J.tR.getOption(optionName);
//			chkbx.title=J.tR.Lang.getStr(optionTitle);
//			chkbx.style.padding=chkbx.style.margin=0;
//			chkbx.style.height="14px";
			J.register(chkbx, "change", function()
			{
				J.tR.setOption(optionName, this.value);
				if(!J.undef(varToUpdate))eval(varToUpdate+"=this.value");
				var div=document.getElementById("div_totalResources");
				div.parentNode.removeChild(div);
				J.tR.func.startDisplayTable();
			});
			var th1=J.factory.createTh(chkbx);
			J.register(th2, "click", function(){chkbx.focus()});
			var tr=J.factory.createFilledTrWith([th2, th1]);
			table.appendChild(tr);
		}
		var createTextboxIntOption=function(table, optionName, optionTitle, varToUpdate)
		{
			var th2=J.factory.createTh(J.tR.Lang.getStr(optionTitle));
			th2.style.cursor="pointer";
			var chkbx=document.createElement('input');
			chkbx.type="input";
			chkbx.value=J.tR.getOption(optionName);
//			chkbx.title=J.tR.Lang.getStr(optionTitle);
//			chkbx.style.padding=chkbx.style.margin=0;
//			chkbx.style.height="14px";
			J.register(chkbx, "change", function()
			{
				if(isNaN(parseInt(this.value)))return;
				J.tR.setOption(optionName, parseInt(this.value));
				if(!J.undef(varToUpdate))eval(varToUpdate+"=parseInt(this.value)");
				var div=document.getElementById("div_totalResources");
				div.parentNode.removeChild(div);
				J.tR.func.startDisplayTable();
			});
			var th1=J.factory.createTh(chkbx);
			J.register(th2, "click", function(){chkbx.focus()});
			var tr=J.factory.createFilledTrWith([th2, th1]);
			table.appendChild(tr);
		}
		var createChkbxOption=function(table, optionName, optionTitle, varToUpdate, funcToExecute)
		{
			var th2=J.factory.createTh(J.tR.Lang.getStr(optionTitle));
			th2.style.cursor="pointer";
			var chkbx=document.createElement('input');
			chkbx.type="checkbox";
			chkbx.checked=J.tR.getOption(optionName);
			chkbx.title=J.tR.Lang.getStr(optionTitle);
			chkbx.style.padding=chkbx.style.margin=0;
			chkbx.style.height="14px";
			J.register(chkbx, "change", function()
			{
				J.tR.setOption(optionName, this.checked);
				if(!J.undef(varToUpdate) &&varToUpdate!=null)eval(varToUpdate+"=this.checked");
				var div=document.getElementById("div_totalResources");
				if(div !=null)div.parentNode.removeChild(div);
				J.tR.func.displayTable();
				if(!J.undef(funcToExecute)) funcToExecute(this.checked);
			});
			var th1=J.factory.createTh(chkbx);
			J.register(th2, "click", function(){chkbx.click()});
			var tr=J.factory.createFilledTrWith([th1, th2]);
			table.appendChild(tr);
			return chkbx;
		}
		
		
		var createRadioLangOption=function(table, texte, strCheminAcces)
		{
			var updateLang=function ()
			{
				if(!this.checked)return;
				J.tR.setOption("lang", this.getAttribute("valeur"));
				J.tR.Lang.actualLang = this.getAttribute("valeur");
			}
			function getLabel(langue, text)
			{
				if(typeof(text)=="undefined")text=langue;
				
				var label=document.createElement("label");
				var radio=document.createElement("input");
				label.appendChild(radio);
				radio.type="radio";
				radio.checked=(J.tR.getOption("lang")==langue);
				radio.setAttribute("valeur", langue);
				radio.setAttribute("name",name);
				var txt=document.createTextNode(text);
				J.register(txt,"click", function(){this.parentNode.firstChild.click(); return false;});
				label.appendChild(txt);
				J.register(radio, "click",  updateLang);
				J.register(radio, "change", updateLang);
				return label;
			}
			var td=J.factory.createTd();//J.Css.tableRessources.entetes.tdTh);
//			td.className="Option radioOption";
			var tr=J.factory.createTr();
			tr.appendChild(td)
//			var txt=document.createTextNode(J.tR.Lang.getStr(texte);
//			td.appendChild(txt);
//			var name=J.getId(td)+"Radio";
			var label;
//			td.appendChild(getLabel("", "Serveur"));
			for(var langue in J.tR.Lang.str)
			{
				label=getLabel(langue, J.tR.Lang.getStr("lang", langue));
				td.appendChild(label);
			}
			table.appendChild( tr);
		}

	
		var createResetButton=function(table, btTxt,btTitle, funcToExecute)
		{
			var bt=document.createElement('input');
			bt.setAttribute("type", "button");
			bt.style.fontWeight="bold";
			bt.style.cursor="pointer";
			bt.style.borderColor="red";	
			bt.setAttribute("value",btTxt);
			bt.setAttribute("title", btTitle);
			var th=J.factory.createTh(bt);
			th.setAttribute("colspan", 2);
			var tr=J.factory.createFilledTrWith([th]);
			table.appendChild(tr);
			J.register(bt, "click", funcToExecute);
			return bt;
		}
	
		// if(confirm("Reset options for Og Total Resources ?\n(Real options coming soon :) )"))
		// {
			// J.tR.options=J.tR.defaultOptions;
			// J.set(J.tR.GM_Variables.options, serialize(J.tR.options));
		// }

		
		var prev=document.getElementById("trTableauOptionsJog");
		if(J.tR.func.afficherTableau("trOptionsOgTotalResources", "tdOptionsOgTotalResources", prev)==null)return;
		var tdOpt=document.getElementById("tdOptionsOgTotalResources");
		tdOpt.style.textAlign="center";
		
		
		var table=J.factory.createTable();
		table.style.fontWeight="bold";
		table.style.margin="auto";
		tdOpt.appendChild(table);
		
		var tr=J.factory.createFilledTr(["Options"]);
		table.appendChild(tr);
		
		createResetButton(table,"Reset options for Og Total Resources", "",function(){J.set(J.tR.GM_Variables.options, serialize(J.tR.defaultOptions), false);});
		createResetButton(table,"Reset all stored variables by Og Total Resources", "(refresh the page right after for full effect)",
			function(){for(var vari in J.tR.GM_Variables){ J.set(J.tR.GM_Variables[vari],"", false);};});
		
		
		// Panneau movible
		var td=J.factory.createTd(J.tR.Lang.getStr("movingPanel"));
		td.className="c"
		td.setAttribute("colspan", 3);
		var tr=J.factory.createFilledTrWith([td]);
		table.appendChild(tr);
		createResetButton(table,"Reset position", "",
			function(){J.tR.setOption("panelX",J.tR.defaultOptions.panelX);J.tR.setOption("panelY",J.tR.defaultOptions.panelY);
			
			}
			);
		
		createChkbxOption(table, "displayPanel","displayPanel" , null, 
			function(checked) {if(!checked)delete J.tR.tableIdsToRefresh.tbodyMoveDefault; })
		createChkbxOption(table, "displayPanelOv","displayPanelOv")
		createChkbxOption(table, "displayPanelB","displayPanelB")
		createChkbxOption(table, "displayPanelRes","displayPanelRes")
		createChkbxOption(table, "displayPanelLab","displayPanelLab")
		createChkbxOption(table, "displayPanelCS","displayPanelCS")
		createChkbxOption(table, "displayPanelFl","displayPanelFl")
		createChkbxOption(table, "displayPanelF2","displayPanelF2")
		createChkbxOption(table, "displayPanelF3","displayPanelF3")
		createChkbxOption(table, "displayPanelGal","displayPanelGal")
		createChkbxOption(table, "displayPanelDef","displayPanelDef")
		
		createChkbxOption(table, "panelDockTop","panelDockTop")
		createChkbxOption(table, "panelDockLeft","panelDockLeft")
		createChkbxOption(table, "planetExpanded","planetExpanded" , "J.tR.tableIdsToRefresh.tbodyMoveDefault.planets")
		createChkbxOption(table, "resourcesExpanded","resourcesExpanded" , "J.tR.tableIdsToRefresh.tbodyMoveDefault.resources")
		createTextboxIntOption(table, "totalsLimit","totalsLimit" )
		createTextboxOption(table, "styleOverflow","styleOverflow" )
		createTextboxIntOption(table, "updaterInterval","updateInterval" )
		////
		
		// Static panels
		var td=J.factory.createTd(J.tR.Lang.getStr("staticPanels"));
		td.className="c"
		td.setAttribute("colspan", 3);
		var tr=J.factory.createFilledTrWith([td]);
		table.appendChild(tr);
		createChkbxOption(table, "displayStaticPanel","displayStaticPanel")
		createChkbxOption(table, "displaySPFleets","displaySPDefenses")
		createChkbxOption(table, "displaySPBuildings","displaySPDefenses")
		createChkbxOption(table, "displaySPDefenses","displaySPDefenses")
		
		
		
		// Resources panels
		var td=J.factory.createTd(J.tR.Lang.getStr("resourcesPanel"));
		td.className="c"
		td.setAttribute("colspan", 3);
		var tr=J.factory.createFilledTrWith([td]);
		table.appendChild(tr);
		createChkbxOption(table, "dispSPBottom","dispSPBottom")
		createChkbxOption(table, "displayMoons","dispMoons" , "J.tR.tableIdsToRefresh.tbodyMoveDefault.displayMoons")
		createChkbxOption(table, "displayTotal","displayTotal", "J.tR.tableIdsToRefresh.tbodyMoveDefault.displayTotal")
		createChkbxOption(table, "displayTransit","displayTransit" , "J.tR.tableIdsToRefresh.tbodyMoveDefault.displayTransit")
		createChkbxOption(table, "displayTotals","displayTotals" , "J.tR.tableIdsToRefresh.tbodyMoveDefault.displayTotals")
		createChkbxOption(table, "dispTimeFull","dispTimeFull")
		createChkbxOption(table, "siloFilling","siloFilling")
		
		// Static panels
		var td=J.factory.createTd(J.tR.Lang.getStr("buildingsDefensesFleetsPanel"));
		td.className="c"
		td.setAttribute("colspan", 3);
		var tr=J.factory.createFilledTrWith([td]);
		table.appendChild(tr);
		var td=J.factory.createTd(J.tR.Lang.getStr("buildings"));
		td.setAttribute("colspan", 3);
		var tr=J.factory.createFilledTrWith([td]);
		table.appendChild(tr);
		createChkbxOption(table, "displayBuildingsPlanet","displayBuildingsPlanet")
		createChkbxOption(table, "dispBPBottom","dispBPBottom")
		createChkbxOption(table, "dispBNotConstr","dispBNotConstr")
		
		var td=J.factory.createTd(J.tR.Lang.getStr("fleetsPanel"));
		td.setAttribute("colspan", 3);
		var tr=J.factory.createFilledTrWith([td]);
		table.appendChild(tr);
		createChkbxOption(table, "dispFPBottom","dispFPBottom")
		createChkbxOption(table, "dispEmptyShip","dispEmptyShip")
		createChkbxOption(table, "dispShipTotal","dispShipTotal")

		var td=J.factory.createTd(J.tR.Lang.getStr("defensesPanel"));
		td.setAttribute("colspan", 3);
		var tr=J.factory.createFilledTrWith([td]);
		table.appendChild(tr);
		createChkbxOption(table, "displayDefensesPlanet","displayDefensesPlanet")
		createChkbxOption(table, "dispDPBottom","dispDPBottom")
		createChkbxOption(table, "dispDefTotal","dispDefTotal")
		createChkbxOption(table, "dispDNotConstr","dispDNotConstr")



		

		
		
//	lang:"fr",
//	orientation:"vertical",
	

		
//		createRadioLangOption(table)
	},

	dispLinks:function()
	{
		var spans=J.tR.func.prepareTdEvt();
		
		J.tools.addSpan("", J.tR.Lang.getStr("Ressources"), J.tR.func.afficherTableauRecap, spans.spanOptions, J.tR.CSS.evtsSpanColor, J.tR.Lang.getStr("RessourcesTitle"))

		// var spanRess=document.createElement("span");
		// spanRess.innerHTML=J.tR.Lang.getStr("Ressources");
		// spans.spanJOG.insertBefore(spanRess, spans.spanOptions);
		// spanRess.style.cursor="pointer";
		// spans.spanJOG.insertBefore(J.factory.createTxt(" - "), spans.spanOptions);
		// spanRess.style.color=J.tR.CSS.evtsSpanColor;
		// J.register(spanRess, "click",  J.tR.func.afficherTableauRecap)

		// var spanMisc=document.getElementById("jogMisc");
		// if(spanMisc==null)
		// {
			// var spanMisc=J.tools.addSpan("jogMisc", "B", J.tR.func.afficherTableauMisc, spans.spanOptions, J.tR.CSS.evtsSpanColor, "Buildings");
		// }
		var tdMisc=document.getElementById("tdTableauJogBuildings");
		if(tdMisc==null)
		{
			tdMisc=J.tR.func.creerTableauMisc();
		}
		var tdDef=document.getElementById("tdTableauJogDefenses");
		if(tdDef==null)
		{
			tdDef=J.tR.func.creerTableauDefenses();
		}
		
		J.tools.addSpan("", "F2", J.tR.func.afficherTableauAllFleet, spans.spanOptions, J.tR.CSS.evtsSpanColor, J.tR.Lang.getStr("showAllFleet"));
		J.tools.addSpan("", "B", J.tR.func.afficherTableauBuildings, spans.spanOptions, J.tR.CSS.evtsSpanColor, J.tR.Lang.getStr("showBuildings"));
		J.tools.addSpan("", "B2", J.tR.func.afficherTableauBuildingsPlanets, spans.spanOptions, J.tR.CSS.evtsSpanColor, J.tR.Lang.getStr("showBuildingsPlanets"));
		J.tools.addSpan("", "D", J.tR.func.afficherTableauDefenses, spans.spanOptions, J.tR.CSS.evtsSpanColor, J.tR.Lang.getStr("showDefenses"));
		J.tools.addSpan("", "D2", J.tR.func.afficherTableauDefensesPlanets, spans.spanOptions, J.tR.CSS.evtsSpanColor, J.tR.Lang.getStr("showDefensesPlanets"));
		J.tools.addSpan("", "T", J.tR.func.afficherTableauTechnologies, spans.spanOptions, J.tR.CSS.evtsSpanColor, J.tR.Lang.getStr("showTechnologies"));
		J.tools.addSpan("", "T2", J.tR.func.afficherTableauTechnologiesPlanets, spans.spanOptions, J.tR.CSS.evtsSpanColor, J.tR.Lang.getStr("showTechnologiesPlanets"));
/*			
		var input=document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("value", J.tR.Lang.getStr("showBuildings"));
		input.style.textAlign="center";
		tdMisc.appendChild(input);
		J.register(input, "click", J.tR.func.afficherTableauBuildings);
		
		var input=document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("value", J.tR.Lang.getStr("showBuildingsPlanets"));
		input.style.textAlign="center";
		tdMisc.appendChild(input);
		J.register(input, "click", J.tR.func.afficherTableauBuildingsPlanets);
		*/
		
	},
	
	afficherTableauAllFleet:function()
	{
		var prevTr= document.getElementById("tdEvenements").parentNode;
			
		var buildingsTr=document.getElementById("trFleetJog");
		if(buildingsTr!=null)
		{
			buildingsTr.parentNode.removeChild(buildingsTr);
			return;
		}
		
		try { // OG Overview fleet
			var spanFleet=document.getElementById("JOG_spanFleet");
			if(spanFleet!=null)
			{
				var evt = document.createEvent("MouseEvents"); // créer un évennement souris
				evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); // intiailser l'évennement déja crée par un click
				spanFleet.dispatchEvent(evt); 
				var evt = document.createEvent("MouseEvents"); // créer un évennement souris
				evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); // intiailser 
				spanFleet.dispatchEvent(evt); 
			}
		}catch(e){}
		
		buildingsTr=J.factory.createTr();
		buildingsTr.id="trFleetJog";
		if(J.tR.getOption("dispFPBottom"))
			prevTr.parentNode.appendChild(buildingsTr);
		else prevTr.parentNode.insertBefore(buildingsTr, prevTr.nextSibling);
		buildingsTh=J.factory.createTh();
		buildingsTh.setAttribute("colspan", 5);
		buildingsTr.appendChild(buildingsTh);
		var table=J.factory.createTable();
		table.style.margin="auto";
		buildingsTh.appendChild(table);

		
		var tr=J.factory.createTr();
		
		var a=document.createElement("a");
		a.innerHTML="OG Total Resources "+J.tR.Lang.getStr("MAJ");
		a.setAttribute("href", "http://userscripts.org/scripts/source/53190.user.js");
		a.setAttribute('title',J.tR.Lang.getStr("lastVersion"));
		a.setAttribute('target',"blank");
		a.style.fontSize="10px";
		a.style.height="14px";
		if(J.tR.update && J.tR.update.need)
		{
			a.style.color="#ff0000";
			a.style.fontWeight="bold";
			a.style.backgroundColor="#fff";
			a.setAttribute('title',J.tR.Lang.getStr("lastVersion")+ " : "+J.tR.update.version);
		}
		a.style.cursor="pointer";

		
		var td=J.factory.createTh(a);
		
		
		tr.appendChild(td);
		try{
			for(var cp in  J.tR.planetsSession)
			{
				if(cp=="lastUpdate")continue;
				var td=J.factory.createTh(J.tools.createAPlanet(J.tR.planets[cp]));
				
				tr.appendChild(td);
			}
		}catch(e){}
		
		
		try {
			var buildingsNames=unserialize(J.get(J.tR.GM_Variables.shipsName, serialize({"202":"Petit transporteur"})));
			var shipss=[];
			var shipsNames=[];
			for(var bat in buildingsNames)
				shipss.push(bat);
			shipss.sort();
			for(var i=0;i<shipss.length;i++)
				shipsNames.push(buildingsNames[shipss[i]]);

		}catch(e){}

		
		try
		{
			if(unserialize(J.getPartage(J.overview.GM_Variables.version))>0.977)
			{
				var flyingShips=unserialize(J.getPartage(J.overview.GM_Variables.flyingShips));
				// {nom:nb}
				var flying={}

				for(var i=0;i<shipsNames.length;i++)
				{
					if(!J.undef(flyingShips[shipsNames[i]]))
						flying[shipss[i]]=flyingShips[shipsNames[i]];
					else 
						flying[shipss[i]]=0;
				}
			}
		}catch(e){}
		if(!J.undef(flying))
			tr.appendChild(J.factory.createTh(J.tR.Lang.getStr("flying")))
		
		var dispShipTotal=J.tR.getOption("dispShipTotal");
		if(dispShipTotal)
			tr.appendChild(J.factory.createTh(J.tR.Lang.getStr("total")))
		
		
		table.appendChild(tr);
		

		
		
		var shiCosts  = unserialize(J.get(J.tR.GM_Variables.shipsCosts, serialize({})));
		var totalCosts = new J.resources(0,0,0);
		
		var planetsShips={}
		try
		{
			

			
			var nbTot=0;
			for(var i=0;i<shipss.length; i++)
			{
				nbTot=0;
				try{
					var ship=shipss[i];
					var tr=J.factory.createTr();
					var td=J.factory.createMagicTh(buildingsNames[ship]);
					td.style.textAlign="left";
					td.setAttribute("nowrap", "true");
					tr.appendChild(td);

					for(var cp in  J.tR.planetsSession)
					{
						if(cp=="lastUpdate")continue;
						if(J.undef(planetsShips[cp]))planetsShips[cp]=unserialize(J.get(J.tR.GM_Variables.planetS+cp, serialize({
																								"F202":0})));
						var planetShips=planetsShips[cp];
						
						var nb;
						if(J.undef(planetShips[ship]))
							nb=0;
						else
							nb=planetShips[ship];
						nbTot+=nb;
						var td=J.factory.createTh(''+nb);
						if(nb!="0")td.style.color="#FF7777";
						if(cp == J.tR.activePlanet)td.style.backgroundColor="#384D8B";
						tr.appendChild(td);
					}
					try {
					if(!J.undef(flying))
					{
						if(J.undef(flying[ship]))
							tr.appendChild(J.factory.createTh('0'));
						else
						{
							tr.appendChild(J.factory.createTh(''+flying[ship]));
							nbTot+=flying[ship];
						}
					}
					}catch(e){}
					if(dispShipTotal)
						tr.appendChild(J.factory.createTh(''+nbTot));
						
					try {
//					alert(shiCosts[ship+"M"]+" "+shiCosts[ship+"C"]+" "+shiCosts[ship+"D"]) 
						totalCosts = totalCosts.plus(new J.resources(shiCosts[ship+"M"],shiCosts[ship+"C"],shiCosts[ship+"D"] ).multiply(nbTot));
					}catch(e){}
						
					if(nbTot>0||J.tR.getOption("dispEmptyShip"))
						table.appendChild(tr);
				}catch(e){}
			}
			var th=J.factory.createTh(J.tR.Lang.getStr("clickFToShow"));
			th.setAttribute("colspan", 25);
			var tr=J.factory.createFilledTrWith([th]);
			tr.className="noExport"
			table.appendChild(tr);
			

			tr=J.tR.func.addExportButtons(table,"boxExportFleet" );
			try
			{			
				if(totalCosts.total()>0)
				{
				
					var th = J.factory.createTh("Total pts : "+J.tR.getString(parseInt((totalCosts.M+totalCosts.C+totalCosts.D)/1000)));
					th.innerHTML+="<br/>Total spent : "+J.tR.getString(totalCosts.M)+" M &nbsp; "+J.tR.getString(totalCosts.C)+" C &nbsp; "+J.tR.getString(totalCosts.D)+" D ";
					
					th.setAttribute("colspan", 14);
					tr.appendChild(th);
				}
			}catch(e){alert(e)}

		}catch(e){}
	},
	
	addExportButtons:function(table, idBox)
	{
				var tr=J.factory.createTr();
				var tr1=tr;
				var th=J.factory.createTh();
				tr.appendChild(th);
				table.appendChild(tr);
				tr.className="noExport";
				th.setAttribute("colspan","10");
				var input=document.createElement("input");
				input.setAttribute("type", "button");
				input.setAttribute("value", "Export for forum");
				input.style.textAlign="center";
				input.style.display="inline"
				input.style.height="13px"
				input.style.fontSize="9px";
				input.style.margin=input.style.padding=th.style.padding=0
				th.appendChild(input);
				J.register(input, "click", function(){
					try {var b=document.getElementById(idBox);
					b.innerHTML="";
					var ta=document.createElement("Textarea");
					b.appendChild(ta);
					ta.style.height="350px";
					ta.value=J.tools.exportToForum(table)}catch(e){alert(e.message)
					}});
				var input=document.createElement("input");
				input.setAttribute("type", "button");
				input.setAttribute("value", "Export short (no color)");
				input.style.textAlign="center";
				input.style.display="inline"
				input.style.height="13px"
				input.style.fontSize="9px";
				input.style.margin=input.style.padding=th.style.padding=0
				th.appendChild(input);
				J.register(input, "click", function(){
					try {var b=document.getElementById(idBox);
					b.innerHTML="";
					var ta=document.createElement("Textarea");
					b.appendChild(ta);
					ta.style.height="350px";
					ta.value=J.tools.exportToForum(table, true)}catch(e){alert(e.message)
					}});
				var tr=J.factory.createTr();
				var th=J.factory.createTh();
				th.setAttribute("colspan",25);
				tr.appendChild(th);
				tr.className="noExport";
				table.appendChild(tr);
				th.id=idBox;
				return tr1;
	},
	
	afficherTableauBuildingsPlanets:function()
	{
		var prevTr=document.getElementById("trTableauJogBuildings");
		

		var buildingsTr=document.getElementById("trBuildingsJog");
		if(buildingsTr!=null)
		{
			buildingsTr.parentNode.removeChild(buildingsTr);
			return;
		}
		buildingsTr=J.factory.createTr();
		buildingsTr.id="trBuildingsJog";
		if(J.tR.getOption("dispBPBottom"))
			prevTr.parentNode.appendChild(buildingsTr);
		else prevTr.parentNode.insertBefore(buildingsTr, prevTr.nextSibling);
		buildingsTh=J.factory.createTh();
		buildingsTh.setAttribute("colspan", 5);
		buildingsTr.appendChild(buildingsTh);
		var table=J.factory.createTable();
		table.style.margin="auto";
		buildingsTh.appendChild(table);

		var dispBNotConstr=true;
		try{
		dispBNotConstr=J.tR.getOption('dispBNotConstr')
		}catch(e){}
		var tr=J.factory.createTr();
		
		var a=document.createElement("a");
		a.innerHTML="OG Total Resources "+J.tR.Lang.getStr("MAJ");
		a.setAttribute("href", "http://userscripts.org/scripts/source/53190.user.js");
		a.setAttribute('title',J.tR.Lang.getStr("lastVersion"));
		a.setAttribute('target',"blank");
		a.style.fontSize="10px";
		a.style.height="14px";
		if(J.tR.update && J.tR.update.need)
		{
			a.style.color="#ff0000";
			a.style.fontWeight="bold";
			a.style.backgroundColor="#fff";
			a.setAttribute('title',J.tR.Lang.getStr("lastVersion")+ " : "+J.tR.update.version);
		}
		a.style.cursor="pointer";

		
		var td=J.factory.createTh(a);
		
		
		tr.appendChild(td);
			try{
		for(var cp in  J.tR.planetsSession)
		{
			if(cp=="lastUpdate")continue;
			var td=J.factory.createTh(J.tools.createAPlanet(J.tR.planets[cp]));
			
			tr.appendChild(td);
		}
		}catch(e){}
		table.appendChild(tr);
		
		var buildingsNames=unserialize(J.get(J.tR.GM_Variables.buildingsName, serialize({"B1":"Mine de métal", "B2":"Mine de cristal", B3:"Mine de deutérium"})));

		var totalCosts = new J.resources(0,0,0);

		var planetsBuildings={}
		try
		{
		for(var bat in buildingsNames)
		{
			var batNum=parseInt(bat.substring(1));
			var tr=J.factory.createTr();
			var td=J.factory.createMagicTh(buildingsNames[bat]);
			td.style.textAlign="left";
			td.setAttribute("nowrap", "true");
			tr.appendChild(td);
var totLvl=0;

			for(var cp in  J.tR.planetsSession)
			{
			if(cp=="lastUpdate")continue;
				if(J.undef(planetsBuildings[cp]))planetsBuildings[cp]=unserialize(J.get(J.tR.GM_Variables.planetB+cp, serialize({
																						lvl1: 0, // Metal
																						lvl1U:false, 
																						lvl2: 0, // Cri
																						lvl2U: false,
																						lvl3: 0, // Deut
																						lvl3U: false,
																					})));
				var planetBuildings=planetsBuildings[cp];
				var lvl;
				if(planetBuildings["lvl"+batNum+"U"])
				    lvl=''+planetBuildings["lvl"+batNum]+"("+(planetBuildings["lvl"+batNum]+1)+")";
				else
				    lvl=J.undef(planetBuildings["lvl"+batNum])?"0":''+planetBuildings["lvl"+batNum];
				var td=J.factory.createTh(lvl);
				if(lvl!="0") {td.style.color="#FF7777";
				totLvl=1;}
				
				if(cp == J.tR.activePlanet)td.style.backgroundColor="#384D8B";
				if(planetBuildings["lvl"+batNum+"U"])
				{
					td.style.color="#FF7722";	
					try
					{
						if(new Date().getTime()>planetBuildings["lvl"+batNum+"UF"].getTime())
						{
							td.style.color="#000000";
							td.style.backgroundColor="#FF0000";
						}
						else 
						{
							var dt=new Date();
							dt.setTime(planetBuildings["lvl"+batNum+"UF"].getTime()- new Date().getTime());
							
							var min=dt.getUTCMinutes();
							var hou=dt.getUTCHours();
							var s=""+parseInt(dt.getTime()/(24*3600000))+"d "+hou+"h "+(min>9?min:"0"+min)+"m";

							td.setAttribute("title",s)
						}
					}catch(e){}
				}
				else 
				{
					try{
						var cost=J.Costs.getCost(bat, (planetBuildings["lvl"+batNum]||"0")+"+1");
						
						if(cost!=null)
						{
							td.setAttribute("title","Lvl "+((planetBuildings["lvl"+batNum]||0)+1)+" : "+J.tR.Lang.getStr("metal")+": "+ J.tR.getString(cost.M)+"\n"+J.tR.Lang.getStr("cristal")+": "+J.tR.getString(cost.C)+"\n"+J.tR.Lang.getStr("deuterium")+": "+J.tR.getString(cost.D));
							J.savedCosts["P"+cp+"_"+batNum]=cost;
							//td.cost=cost;
							td.setAttribute("tag", "P"+cp+"_"+batNum);
							td.setAttribute("cp", ""+cp);
							var chgEvent=function(elt)
							{
								var evObj = document.createEvent('HTMLEvents');
								evObj.initEvent( 'change', true, true);
								elt.dispatchEvent(evObj);
							}
							td.style.cursor="pointer"
							J.register(td, "click", 
							function()
							{
								try {
								var cost=J.savedCosts[this.getAttribute("tag")];
								var spanResourcesTransit=document.getElementById("spanSpanRessourcesTransit");
								if(spanResourcesTransit==null)return;
								if(document.getElementById("inputShowCalcul")==null)
								{ // expand transit resources panel
									var evt = document.createEvent("MouseEvents"); // créer un évennement souris
									evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); // intiailser l'évennement déja crée par un click
									spanResourcesTransit.dispatchEvent(evt); 
								}
								if(document.getElementById("inputCalculMetal")==null)
								{ // expand calcul resources panel
									var evt = document.createEvent("MouseEvents"); // créer un évennement souris
									evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); // intiailser l'évennement déja crée par un click
									document.getElementById("inputShowCalcul").dispatchEvent(evt); 
								}

								var inputCalculMetal=document.getElementById("inputCalculMetal");
								inputCalculMetal.value=cost.M;//.setAttribute("value",''+ cost.M);
								chgEvent(inputCalculMetal);
								
								var inputCalculCristal=document.getElementById("inputCalculCristal")
								inputCalculCristal.value=cost.C;//.setAttribute("value",''+ cost.C)
								chgEvent(inputCalculCristal)

								
								var inputCalculDeut=document.getElementById("inputCalculDeut");
								inputCalculDeut.value=cost.D
								chgEvent(inputCalculDeut);
								var dest=document.getElementById("inputCoordUniquementVers");
								dest.value= J.tR.planets[this.getAttribute("cp")].coordinates;
								chgEvent(dest);
								}catch(e){}
								
							});
						}
					}catch(e){}
				}
				try {
					var cost=J.Costs.getTotalCost(bat, (planetBuildings["lvl"+batNum]||"0")+"");
					totalCosts=totalCosts.plus(cost);
				}catch(e){}

				tr.appendChild(td);
			}
			if(totLvl>0 || dispBNotConstr)
			table.appendChild(tr);
						
		}

			var tr=J.factory.createTr();
			var th=J.factory.createTh();
			tr.appendChild(th);
			table.appendChild(tr);
			tr.className="noExport";
			th.setAttribute("colspan","4");
			var input=document.createElement("input");
			input.setAttribute("type", "button");
			input.setAttribute("value", "Export for forum");
			input.style.textAlign="center";
			input.style.display="inline"
			input.style.height="13px"
			input.style.fontSize="9px";
			input.style.margin=input.style.padding=th.style.padding=0
			th.appendChild(input);
			J.register(input, "click", function(){
				try {var b=document.getElementById("boxExportBuildings");
				b.innerHTML="";
				var ta=document.createElement("Textarea");
				b.appendChild(ta);
				ta.style.height="350px";
				ta.value=J.tools.exportToForum(table)}catch(e){alert(e.message)
				}});
			var input=document.createElement("input");
			input.setAttribute("type", "button");
			input.setAttribute("value", "Export short (no color)");
			input.style.textAlign="center";
			input.style.display="inline"
			input.style.height="13px"
			input.style.fontSize="9px";
			input.style.margin=input.style.padding=th.style.padding=0
			th.appendChild(input);
			J.register(input, "click", function(){
				try {var b=document.getElementById("boxExportBuildings");
				b.innerHTML="";
				var ta=document.createElement("Textarea");
				b.appendChild(ta);
				ta.style.height="350px";
				ta.value=J.tools.exportToForum(table, true)}catch(e){alert(e.message)
				}});
			try
			{			
				if(totalCosts.total()>0)
				{
				
					var th = J.factory.createTh("Total pts : "+J.tR.getString(parseInt((totalCosts.M+totalCosts.C+totalCosts.D)/1000)));
					th.innerHTML+="<br/>Total spent : "+J.tR.getString(totalCosts.M)+" M &nbsp; "+J.tR.getString(totalCosts.C)+" C &nbsp; "+J.tR.getString(totalCosts.D)+" D ";
					
					th.setAttribute("colspan", 14);
					tr.appendChild(th);
				}
			}catch(e){alert(e)}

			var tr=J.factory.createTr();
			var th=J.factory.createTh();
			th.setAttribute("colspan",25);
			tr.appendChild(th);
			tr.className="noExport";
			table.appendChild(tr);
			th.id="boxExportBuildings"

		}catch(e){}
	},

	afficherTableauTechnologiesPlanets:function()
	{
		var prevTr=document.getElementById("trTableauJogBuildings");
		

		var buildingsTr=document.getElementById("trTechnosJog");
		if(buildingsTr!=null)
		{
			buildingsTr.parentNode.removeChild(buildingsTr);
			return;
		}
		buildingsTr=J.factory.createTr();
		buildingsTr.id="trTechnosJog";
		if(J.tR.getOption("dispBPBottom"))
			prevTr.parentNode.appendChild(buildingsTr);
		else prevTr.parentNode.insertBefore(buildingsTr, prevTr.nextSibling);
		buildingsTh=J.factory.createTh();
		buildingsTh.setAttribute("colspan", 5);
		buildingsTr.appendChild(buildingsTh);
		var table=J.factory.createTable();
		table.style.margin="auto";
		buildingsTh.appendChild(table);

		
		var tr=J.factory.createTr();
		
		var a=document.createElement("a");
		a.innerHTML="OG Total Resources "+J.tR.Lang.getStr("MAJ");
		a.setAttribute("href", "http://userscripts.org/scripts/source/53190.user.js");
		a.setAttribute('title',J.tR.Lang.getStr("lastVersion"));
		a.setAttribute('target',"blank");
		a.style.fontSize="10px";
		a.style.height="14px";
		if(J.tR.update && J.tR.update.need)
		{
			a.style.color="#ff0000";
			a.style.fontWeight="bold";
			a.style.backgroundColor="#fff";
			a.setAttribute('title',J.tR.Lang.getStr("lastVersion")+ " : "+J.tR.update.version);
		}
		a.style.cursor="pointer";

		
		var td=J.factory.createTh(a);
		
		
		tr.appendChild(td);
			try{
		for(var cp in  J.tR.planetsSession)
		{
			if(cp=="lastUpdate")continue;
			var td=J.factory.createTh(J.tools.createAPlanet(J.tR.planets[cp]));
			
			tr.appendChild(td);
		}
		}catch(e){}
		table.appendChild(tr);
		
		var buildingsNames=unserialize(J.get(J.tR.GM_Variables.technologiesName, serialize({})));

		var totalCosts = new J.resources(0,0,0);

		var planetsBuildings={}
		try
		{
		for(var bat in buildingsNames)
		{
			var batNum=parseInt(bat.substring(1));
			var tr=J.factory.createTr();
			var td=J.factory.createMagicTh(buildingsNames[bat]);
			td.style.textAlign="left";
			td.setAttribute("nowrap", "true");
			tr.appendChild(td);
				var maxLvl=0;

			for(var cp in  J.tR.planetsSession)
			{
			if(cp=="lastUpdate")continue;
				if(J.undef(planetsBuildings[cp]))planetsBuildings[cp]=unserialize(J.get(J.tR.GM_Variables.planetT+cp, serialize({
																					})));
				var planetBuildings=planetsBuildings[cp];
				var lvl;
				if(planetBuildings["lvl"+batNum+"U"])
				    lvl=''+planetBuildings["lvl"+batNum]+"("+(planetBuildings["lvl"+batNum]+1)+")";
				else
				    lvl=J.undef(planetBuildings["lvl"+batNum])?"0":''+planetBuildings["lvl"+batNum];
				var td=J.factory.createTh(lvl);
				if(lvl!="0")td.style.color="#FF7777";
				if(cp == J.tR.activePlanet)td.style.backgroundColor="#384D8B";
				if(planetBuildings["lvl"+batNum+"U"])
				{
					td.style.color="#FF7722";	
					try
					{
						if(new Date().getTime()>planetBuildings["lvl"+batNum+"UF"].getTime())
						{
							td.style.color="#000000";
							td.style.backgroundColor="#FF0000";
						}
						else 
						{
							var dt=new Date();
							dt.setTime(planetBuildings["lvl"+batNum+"UF"].getTime()- new Date().getTime());
							
							var min=dt.getUTCMinutes();
							var hou=dt.getUTCHours();
							var s=""+parseInt(dt.getTime()/(24*3600000))+"d "+hou+"h "+(min>9?min:"0"+min)+"m";

							td.setAttribute("title",s)
						}
					}catch(e){}
				}
				else 
				{
					try{
						var cost=J.Costs.getCost(bat, (planetBuildings["lvl"+batNum]||"0")+"+1");
						
						if(cost!=null)
						{
							td.setAttribute("title","Lvl "+((planetBuildings["lvl"+batNum]||0)+1)+" : "+J.tR.Lang.getStr("metal")+": "+ J.tR.getString(cost.M)+"\n"+J.tR.Lang.getStr("cristal")+": "+J.tR.getString(cost.C)+"\n"+J.tR.Lang.getStr("deuterium")+": "+J.tR.getString(cost.D));
							J.savedCosts["P"+cp+"_"+batNum]=cost;
							//td.cost=cost;
							td.setAttribute("tag", "P"+cp+"_"+batNum);
							td.setAttribute("cp", ""+cp);
							var chgEvent=function(elt)
							{
								var evObj = document.createEvent('HTMLEvents');
								evObj.initEvent( 'change', true, true);
								elt.dispatchEvent(evObj);
							}
							td.style.cursor="pointer"
							J.register(td, "click", 
							function()
							{
								try {
								var cost=J.savedCosts[this.getAttribute("tag")];
								var spanResourcesTransit=document.getElementById("spanSpanRessourcesTransit");
								if(spanResourcesTransit==null)return;
								if(document.getElementById("inputShowCalcul")==null)
								{ // expand transit resources panel
									var evt = document.createEvent("MouseEvents"); // créer un évennement souris
									evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); // intiailser l'évennement déja crée par un click
									spanResourcesTransit.dispatchEvent(evt); 
								}
								if(document.getElementById("inputCalculMetal")==null)
								{ // expand calcul resources panel
									var evt = document.createEvent("MouseEvents"); // créer un évennement souris
									evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); // intiailser l'évennement déja crée par un click
									document.getElementById("inputShowCalcul").dispatchEvent(evt); 
								}

								var inputCalculMetal=document.getElementById("inputCalculMetal");
								inputCalculMetal.value=cost.M;//.setAttribute("value",''+ cost.M);
								chgEvent(inputCalculMetal);
								
								var inputCalculCristal=document.getElementById("inputCalculCristal")
								inputCalculCristal.value=cost.C;//.setAttribute("value",''+ cost.C)
								chgEvent(inputCalculCristal)

								
								var inputCalculDeut=document.getElementById("inputCalculDeut");
								inputCalculDeut.value=cost.D
								chgEvent(inputCalculDeut);
								var dest=document.getElementById("inputCoordUniquementVers");
								dest.value= J.tR.planets[this.getAttribute("cp")].coordinates;
								chgEvent(dest);
								}catch(e){}
								
							});
						}
					}catch(e){}
				}

				if(typeof(planetBuildings["lvl"+batNum])!="undefined" )
					maxLvl=Math.max(maxLvl,planetBuildings["lvl"+batNum]);
				tr.appendChild(td);
			}
			try {
				var cost=J.Costs.getTotalCost(bat, (maxLvl||"0")+"");
				totalCosts=totalCosts.plus(cost);
			}catch(e){}
			table.appendChild(tr);
						
		}

			var tr=J.factory.createTr();
			var th=J.factory.createTh();
			tr.appendChild(th);
			table.appendChild(tr);
			tr.className="noExport";
			th.setAttribute("colspan","4");
			var input=document.createElement("input");
			input.setAttribute("type", "button");
			input.setAttribute("value", "Export for forum");
			input.style.textAlign="center";
			input.style.display="inline"
			input.style.height="13px"
			input.style.fontSize="9px";
			input.style.margin=input.style.padding=th.style.padding=0
			th.appendChild(input);
			J.register(input, "click", function(){
				try {var b=document.getElementById("boxExportTechnos");
				b.innerHTML="";
				var ta=document.createElement("Textarea");
				b.appendChild(ta);
				ta.style.height="350px";
				ta.value=J.tools.exportToForum(table)}catch(e){alert(e.message)
				}});
			var input=document.createElement("input");
			input.setAttribute("type", "button");
			input.setAttribute("value", "Export short (no color)");
			input.style.textAlign="center";
			input.style.display="inline"
			input.style.height="13px"
			input.style.fontSize="9px";
			input.style.margin=input.style.padding=th.style.padding=0
			th.appendChild(input);
			J.register(input, "click", function(){
				try {var b=document.getElementById("boxExportTechnos");
				b.innerHTML="";
				var ta=document.createElement("Textarea");
				b.appendChild(ta);
				ta.style.height="350px";
				ta.value=J.tools.exportToForum(table, true)}catch(e){alert(e.message)
				}});
			try
			{			
				if(totalCosts.total()>0)
				{
				
					var th = J.factory.createTh("Total pts : "+J.tR.getString(parseInt((totalCosts.M+totalCosts.C+totalCosts.D)/1000)));
					th.innerHTML+="<br/>Total spent : "+J.tR.getString(totalCosts.M)+" M &nbsp; "+J.tR.getString(totalCosts.C)+" C &nbsp; "+J.tR.getString(totalCosts.D)+" D ";
					
					th.setAttribute("colspan", 14);
					tr.appendChild(th);
				}
			}catch(e){alert(e)}

			var tr=J.factory.createTr();
			var th=J.factory.createTh();
			th.setAttribute("colspan",25);
			tr.appendChild(th);
			tr.className="noExport";
			table.appendChild(tr);
			th.id="boxExportTechnos"

		}catch(e){}
	},

	afficherTableauDefensesPlanets:function()
	{
		var prevTr=document.getElementById("trTableauJogDefenses");
			
		var buildingsTr=document.getElementById("trDefensesJog");
		if(buildingsTr!=null)
		{
			buildingsTr.parentNode.removeChild(buildingsTr);
			return;
		}
		buildingsTr=J.factory.createTr();
		buildingsTr.id="trDefensesJog";
		if(J.tR.getOption("dispDPBottom"))
			prevTr.parentNode.appendChild(buildingsTr);
		else prevTr.parentNode.insertBefore(buildingsTr, prevTr.nextSibling);
		buildingsTh=J.factory.createTh();
		buildingsTh.setAttribute("colspan", 5);
		buildingsTr.appendChild(buildingsTh);
		var table=J.factory.createTable();
		table.style.margin="auto";
		buildingsTh.appendChild(table);

		
		var tr=J.factory.createTr();
		
		var a=document.createElement("a");
		a.innerHTML="OG Total Resources "+J.tR.Lang.getStr("MAJ");
		a.setAttribute("href", "http://userscripts.org/scripts/source/53190.user.js");
		a.setAttribute('title',J.tR.Lang.getStr("lastVersion"));
		a.setAttribute('target',"blank");
		a.style.fontSize="10px";
		a.style.height="14px";
		if(J.tR.update && J.tR.update.need)
		{
			a.style.color="#ff0000";
			a.style.fontWeight="bold";
			a.style.backgroundColor="#fff";
			a.setAttribute('title',J.tR.Lang.getStr("lastVersion")+ " : "+J.tR.update.version);
		}
		a.style.cursor="pointer";

		
		var td=J.factory.createTh(a);
		
		
		tr.appendChild(td);
			try{
		for(var cp in  J.tR.planetsSession)
		{
			if(cp=="lastUpdate")continue;
			var td=J.factory.createTh(J.tools.createAPlanet(J.tR.planets[cp]));
			
			tr.appendChild(td);
		}
		}catch(e){}
		
		var dispDefTotal=J.tR.getOption("dispDefTotal");
		if(dispDefTotal)
			tr.appendChild(J.factory.createTh(J.tR.Lang.getStr("total")))

		
		table.appendChild(tr);
		
		var defensesNames=unserialize(J.get(J.tR.GM_Variables.defensesName, serialize({})));

		var planetsDefenses={}

		var defCosts  = unserialize(J.get(J.tR.GM_Variables.defensesCosts, serialize({})));
		var totalCosts = new J.resources(0,0,0);
		
		
		try
		{
		for(var bat in defensesNames)
		{
			var tot=0;
			var batNum=parseInt(bat.substring(1));
			var tr=J.factory.createTr();
			var td=J.factory.createMagicTh(defensesNames[bat]);
			td.style.textAlign="left";
			td.setAttribute("nowrap", "true");
			tr.appendChild(td);

			for(var cp in  J.tR.planetsSession)
			{
			if(cp=="lastUpdate")continue;
				if(J.undef(planetsDefenses[cp]))planetsDefenses[cp]=unserialize(J.get(J.tR.GM_Variables.planetD+cp, serialize({
																					})));
				var planetDefenses=planetsDefenses[cp];
				var lvl;
				var def=J.undef(planetDefenses["NB"+batNum])?0:planetDefenses["NB"+batNum];
				if(planetDefenses["NB"+batNum+"U"])
				    lvl=''+def+"("+(planetDefenses["NB"+batNum]+1)+")";
				else
				    lvl=''+def;
				tot+=def;
				var td=J.factory.createTh(lvl);
				if(lvl!="0")td.style.color="#FF7777";
				if(cp == J.tR.activePlanet)td.style.backgroundColor="#384D8B";
				// if(planetDefenses["lvl"+batNum+"U"])
				// {
					// td.style.color="#FF7722";	
					// try
					// {
						// if(new Date().getTime()>planetDefenses["lvl"+batNum+"UF"].getTime())
						// {
							// td.style.color="#000000";
							// td.style.backgroundColor="#FF0000";
						// }
					// }catch(e){}
				// }
				tr.appendChild(td);
			}
			if(dispDefTotal)
				tr.appendChild(J.factory.createTh(''+tot));

			try {
				totalCosts = totalCosts.plus(new J.resources(defCosts[bat+"M"],defCosts[bat+"C"],defCosts[bat+"D"] ).multiply(tot));
			}catch(e){}
			if(tot>0||J.tR.getOption("dispDNotConstr"))
				table.appendChild(tr);
						
		}

			var tr=J.factory.createTr();
			var th=J.factory.createTh();
			tr.appendChild(th);
			table.appendChild(tr);
			tr.className="noExport";
			th.setAttribute("colspan","4");
			var input=document.createElement("input");
			input.setAttribute("type", "button");
			input.setAttribute("value", "Export for forum");
			input.style.textAlign="center";
			input.style.display="inline"
			input.style.height="13px"
			input.style.fontSize="9px";
			input.style.margin=input.style.padding=th.style.padding=0
			th.appendChild(input);
			J.register(input, "click", function(){
				try {var b=document.getElementById("boxExportDefenses");
				b.innerHTML="";
				var ta=document.createElement("Textarea");
				b.appendChild(ta);
				ta.style.height="350px";
				ta.value=J.tools.exportToForum(table)}catch(e){alert(e.message)
				}});
			var input=document.createElement("input");
			input.setAttribute("type", "button");
			input.setAttribute("value", "Export short (no color)");
			input.style.textAlign="center";
			input.style.display="inline"
			input.style.height="13px"
			input.style.fontSize="9px";
			input.style.margin=input.style.padding=th.style.padding=0
			th.appendChild(input);
			J.register(input, "click", function(){
				try {var b=document.getElementById("boxExportDefenses");
				b.innerHTML="";
				var ta=document.createElement("Textarea");
				b.appendChild(ta);
				ta.style.height="350px";
				ta.value=J.tools.exportToForum(table, true)}catch(e){alert(e.message)
				}});
			
			try
			{			
				if(totalCosts.total()>0)
				{
					var th = J.factory.createTh("Total pts : "+J.tR.getString(parseInt((totalCosts.M+totalCosts.C+totalCosts.D)/1000)));
					th.innerHTML+="<br/>Total spent : "+J.tR.getString(totalCosts.M)+" M &nbsp; "+J.tR.getString(totalCosts.C)+" C &nbsp; "+J.tR.getString(totalCosts.D)+" D ";
					
					th.setAttribute("colspan", 14);
					tr.appendChild(th);
				}
			}catch(e){alert(e)}
			
			var tr=J.factory.createTr();
			var th=J.factory.createTh();
			th.setAttribute("colspan",25);
			tr.appendChild(th);
			tr.className="noExport";
			table.appendChild(tr);
			th.id="boxExportDefenses"

			
			
		}catch(e){}
	},

	afficherTableauBuildings:function()
	{
		var prevTr=document.getElementById("trTableauJogBuildings");
			
		var buildingsTr=document.getElementById("trBuildingsJog");
		if(buildingsTr!=null)
		{
			buildingsTr.parentNode.removeChild(buildingsTr);
			return;
		}
		buildingsTr=J.factory.createTr();
		buildingsTr.id="trBuildingsJog";
		if(J.tR.getOption("dispBPBottom"))
			prevTr.parentNode.appendChild(buildingsTr);
		else prevTr.parentNode.insertBefore(buildingsTr, prevTr.nextSibling);
		buildingsTh=J.factory.createTh();
		buildingsTh.setAttribute("colspan", 5);
		buildingsTr.appendChild(buildingsTh);
		var table=J.factory.createTable();
		table.style.margin="auto";
		buildingsTh.appendChild(table);
		
		var planetBuildings=unserialize(J.get(J.tR.GM_Variables.planetB+J.tR.activePlanet, serialize({
																					lvl1: 0, // Metal
																					lvl1U:false, 
																					lvl2: 0, // Cri
																					lvl2U: false,
																					lvl3: 0, // Deut
																					lvl3U: false,
																				})));
		var buildingsNames=unserialize(J.get(J.tR.GM_Variables.buildingsName, serialize({"B1":"Mine de métal", "B2":"Mine de cristal", B3:"Mine de deutérium"})));
		
		var createBuildingTr=function(table,i)
		{
			var tr=J.factory.createTr();
			var td=J.factory.createTh(buildingsNames["B"+i]);
			td.style.textAlign="left";
			tr.appendChild(td);
			var td=J.factory.createTh(''+planetBuildings["lvl"+i]+(planetBuildings["lvl"+i+"U"]?"("+(planetBuildings["lvl"+i]+1)+")":""));
			tr.appendChild(td);
			if(J.tR.getOption('dispBNotConstr') || planetBuildings["lvl"+i]>0)
				table.appendChild(tr);
		}
		
		for(var i=0;i<100;i++)
		{
			if(!J.undef(planetBuildings["lvl"+i]))
			{
				createBuildingTr(table,i);
			}
		}
	},

	afficherTableauTechnologies:function()
	{
		try{
		var prevTr=document.getElementById("tdEvenements").parentNode;
		var buildingsTr=document.getElementById("trTechnologiesJog");
		if(buildingsTr!=null)
		{
			buildingsTr.parentNode.removeChild(buildingsTr);
			return;
		}
		buildingsTr=J.factory.createTr();
		buildingsTr.id="trTechnologiesJog";
		if(J.tR.getOption("dispTPBottom")) 
			prevTr.parentNode.appendChild(buildingsTr);
		else prevTr.parentNode.insertBefore(buildingsTr, prevTr.nextSibling);
		buildingsTh=J.factory.createTh();
		buildingsTh.setAttribute("colspan", 5);
		buildingsTr.appendChild(buildingsTh);
		var table=J.factory.createTable();
		table.style.margin="auto";
		buildingsTh.appendChild(table);
		
		var planetBuildings=unserialize(J.get(J.tR.GM_Variables.planetT+J.tR.activePlanet, serialize({})));
		var buildingsNames=unserialize(J.get(J.tR.GM_Variables.technologiesName, serialize({})));

		
		var createBuildingTr=function(table,i)
		{
			var tr=J.factory.createTr();
			var td=J.factory.createTh(buildingsNames["T"+i]);
			td.style.textAlign="left";
			tr.appendChild(td);
			var td=J.factory.createTh(''+planetBuildings["lvl"+i]+(planetBuildings["lvl"+i+"U"]?"("+(planetBuildings["lvl"+i]+1)+")":""));
			tr.appendChild(td);
			if(J.tR.getOption('dispTNotConstr') || planetBuildings["lvl"+i]>0)
				table.appendChild(tr);
		}
		
		for(var i=100;i<200;i++)
		{
			if(!J.undef(planetBuildings["lvl"+i]))
			{
				createBuildingTr(table,i);
			}
		}
		}catch(e){alert(e.message)};
	},

	afficherTableauDefenses:function()
	{
		var prevTr=document.getElementById("trTableauJogDefenses");
			
		var buildingsTr=document.getElementById("trDefensesJog");
		if(buildingsTr!=null)
		{
			buildingsTr.parentNode.removeChild(buildingsTr);
			return;
		}
		buildingsTr=J.factory.createTr();
		buildingsTr.id="trDefensesJog";
		if(J.tR.getOption("dispDPBottom"))
			prevTr.parentNode.appendChild(buildingsTr);
		else prevTr.parentNode.insertBefore(buildingsTr, prevTr.nextSibling);
		buildingsTh=J.factory.createTh();
		buildingsTh.setAttribute("colspan", 5);
		buildingsTr.appendChild(buildingsTh);
		var table=J.factory.createTable();
		table.style.margin="auto";
		buildingsTh.appendChild(table);
		var planetDefenses=unserialize(J.get(J.tR.GM_Variables.planetD+J.tR.activePlanet, serialize({})));
		var defensesName=unserialize(J.get(J.tR.GM_Variables.defensesName, serialize({})));
		var createBuildingTr=function(table,i)
		{
			var tr=J.factory.createTr();
			var td=J.factory.createTh(''+defensesName["D"+i]);
			td.style.textAlign="left";
			tr.appendChild(td);
			var td=J.factory.createTh(''+planetDefenses["NB"+i])//+(planetDefenses["lvl"+i+"U"]?"("+(planetBuildings["lvl"+i]+1)+")":""));
			tr.appendChild(td);
			if(J.tR.getOption('dispDNotConstr') || planetDefenses["NB"+i]>0)
				table.appendChild(tr);
		}
		for(var i=400;i<600;i++)
		{
			if(!J.undef(planetDefenses["NB"+i]))
			{
				createBuildingTr(table,i);
			}
		}
	},


	afficherTableauRecap:function()
	{
		var tr=document.getElementById("trTableauRessourcesStatique");
		if(tr!=null)
		{
			delete J.tR.tableIdsToRefresh.tbodyStaticDefault;
			tr.parentNode.removeChild(tr);
			return;
		}
		
		var evts=document.getElementById("tdEvenements").parentNode;
		var td;
		
		// tr=J.factory.createTr();
		// td=J.factory.createTd();
		// td.setAttribute("colspan", 5);
		// td.id="tdOptionsRessourcesStatique";
		// td.style.display="none";
		// td.style.textAlign="center";
		// tr.appendChild(td);
		// evts.parentNode.insertBefore(tr, evts.nextSibling);
		

		// tr=J.factory.createTr();
		// td=J.factory.createTd();
		// td.setAttribute("colspan", 5);
		// td.id="tdBtOptionsRessourcesStatique";
		// td.style.textAlign="center";
		// tr.appendChild(td);
		// evts.parentNode.insertBefore(tr, evts.nextSibling);

		tr=J.factory.createTr();
		td=J.factory.createTd();
		td.setAttribute("colspan", 5);
		td.id="tdTableauRessourcesStatique";
	//	td.style.textAlign="center";
		var tbl=J.factory.createTable();
		tbl.style.margin="auto";
		td.appendChild(tbl);
		tr.appendChild(td);
		tr.id="trTableauRessourcesStatique";
		if(J.tR.getOption("dispSPBottom"))
			evts.parentNode.appendChild(tr);
		else
			evts.parentNode.insertBefore(tr, evts.nextSibling);
			
		

		
		var thead=J.factory.createTHead();
		tbl.appendChild(thead);
		var tr=document.createElement("tr");
		var td=document.createElement("td");
		td.className="c";
//		tete.style.width="100%";
//		tr.style.width=td.style.width="100%";
		td.setAttribute("colspan", 5);
		td.style.height="15px";
		var a=document.createElement("a");
		a.innerHTML=" "+J.tR.Lang.getStr("MAJ");
		a.setAttribute("href", "http://userscripts.org/scripts/source/53190.user.js");
		a.setAttribute('title',J.tR.Lang.getStr("lastVersion"));
		a.setAttribute('target',"blank");
		a.style.display='block';
		a.style.fontSize="9px";
		a.style.height="14px";
		if(J.tR.update && J.tR.update.need)
		{
			a.style.color="#ff0000";
			a.style.fontWeight="bold";
			a.style.backgroundColor="#fff";
			a.setAttribute('title',J.tR.Lang.getStr("lastVersion")+ " : "+J.tR.update.version);
		}
//		a.style.float='right';
		a.style.position='relative';
		a.style.top='2px';
//		a.style.right='3px';
		a.style.cursor="pointer";
		td.style.textAlign="right";
		tr.style.textAlign="right";
		td.style.padding=0;
		td.appendChild(a);
		tr.appendChild(td);
		thead.appendChild(tr);

		
		var tr=J.factory.createTr();
		var th=J.factory.createTh();
		th.innerHTML=J.tR.Lang.getStr('Planet');
		tr.appendChild(th);
		
		th=J.factory.createTh();
		th.innerHTML=J.tR.Lang.getStr('metal');
		tr.appendChild(th);
		th=J.factory.createTh();
		th.innerHTML=J.tR.Lang.getStr('cristal');
		tr.appendChild(th);
		th=J.factory.createTh();
		th.innerHTML=J.tR.Lang.getStr('deut');
		tr.appendChild(th);
		th=J.factory.createTh();
		th.innerHTML=J.tR.Lang.getStr('total');
		tr.appendChild(th);
		thead.appendChild(tr);
		var tbody=J.factory.createTBody();
		tbl.appendChild(tbody);
		var ress=J.tR.func.getEmpireResources();

		var trs=J.tR.func.createResourcesTrs(ress, "vertical", true, true, true, true, true);
		for(var i=0;i<trs.length;i++)
			tbody.appendChild(trs[i]);
			
		tbody.id="tbodyStaticDefault";
			
		J.tR.tableIdsToRefresh.tbodyStaticDefault = 
		{
			orientation:"vertical",
			resources:true, 
			planets:true
		}
		
		var tfoot=J.factory.createTFoot();
		tbl.appendChild(tfoot);

		var tr=J.factory.createTr();
		var th=J.factory.createTh(J.tR.Lang.getStr("totalProd"));
		tr.appendChild(th);
		
		var totalProd=J.tR.func.getTotalProd();
		th=J.factory.createTh(J.tR.getString(totalProd.M*24));
		tr.appendChild(th);
		th=J.factory.createTh(J.tR.getString(totalProd.C*24));
		tr.appendChild(th);
		th=J.factory.createTh(J.tR.getString(totalProd.D*24));
		tr.appendChild(th);
		th=J.factory.createTh(J.tR.getString(totalProd.total()*24));
		tr.appendChild(th);
		tfoot.appendChild(tr);
		
		try
		{
			J.tR.session.lastUpdate=new Date();
			J.tR.sessions[J.session]=J.tR.session;	
			J.setPartage(J.tR.GM_Variables.sessions, serialize(J.tR.sessions)); 
		} catch(e){}

	},

	creerTableauOptions:function()
	{
		if(document.getElementById("trTableauOptionsJog")==null)
			J.tR.func.afficherTableau(
					"trTableauOptionsJog", 
					"tdTableauOptionsJog", 
					document.getElementById("tdEvenements").parentNode);
		return document.getElementById("tdTableauOptionsJog");
	},
	creerTableauMisc:function()
	{
		if(document.getElementById("trTableauJogBuildings")==null)
		{
			J.tR.func.afficherTableau(
					"trTableauJogBuildings", 
					"tdTableauJogBuildings", 
					document.getElementById("tdEvenements").parentNode);
			document.getElementById("trTableauJogBuildings").style.display="none";
			document.getElementById("tdTableauJogBuildings").style.textAlign="center";
		}
		return document.getElementById("tdTableauJogBuildings");
	},
	creerTableauDefenses:function()
	{
		if(document.getElementById("trTableauJogDefenses")==null)
		{
			J.tR.func.afficherTableau(
					"trTableauJogDefenses", 
					"tdTableauJogDefenses", 
					document.getElementById("tdEvenements").parentNode);
			document.getElementById("trTableauJogDefenses").style.display="none";
			document.getElementById("tdTableauJogDefenses").style.textAlign="center";
		}
		return document.getElementById("tdTableauJogDefenses");
	},

	afficherTableauOptions:function()
	{
		var tr=document.getElementById("trTableauOptionsJog");
		if(tr.style.display=="none") tr.style.display="";
		else tr.style.display="none";
	},

	/*
	afficherTableauMisc:function()
	{
		var tr=document.getElementById("trTableauJogBuildings");
		if(tr.style.display=="none") tr.style.display="";
		else tr.style.display="none";
	},
	afficherTableauDefenses:function()
	{
		var tr=document.getElementById("trTableauJogDefenses");
		if(tr.style.display=="none") tr.style.display="";
		else tr.style.display="none";
	},
*/

	afficherTableau:function(trId, tdId, previousSibling)
	{
		var tr=document.getElementById(trId);
		if(tr!=null)
		{
			tr.parentNode.removeChild(tr);
			return null;
		}
		var td;
		tr=J.factory.createTr();
		td=J.factory.createTd();
		td.setAttribute("colspan", 5);
		td.id=tdId;
		var tbl=J.factory.createTable();
		tbl.style.margin="auto";
		td.appendChild(tbl);
		tr.appendChild(td);
		tr.id=trId;
		previousSibling.parentNode.insertBefore(tr, previousSibling.nextSibling);
		return tbl;
	},
}

J.tR.loadPlanet=function(cp)
{
	var planet=unserialize(J.get(J.tR.GM_Variables.planet+cp, "a:0:{}"));
	J.tR.planets[cp]=planet;
	return planet;
}


J.tR.isLune=function(planet)
{
	return (planet.name.toLowerCase().indexOf("("+J.tR.getRepere("moon").toLowerCase()+")")!=-1 || planet.name.toLowerCase()==J.tR.getRepere("moon").toLowerCase());
}


J.tR.getString=function (nb) 
{

	function addDots (n)
	{ // From Oliver Jensen
		n += '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test (n))
			n = n.replace (rgx, '$1' + '.' + '$2');
		return n;
	}
	return addDots(nb);
	// var nbr=""+nb;
	// var m="";
	// while(nbr.length>3)
	// {
		// m=nbr.substring(nbr.length-3)+(m.length>0?'.'+m:'');
		// nbr=nbr.substring(0, nbr.length-3);
	// }
	// m=nbr+(m.length>0?'.'+m:'');
	// return m;
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


J.tR.start = function()
{
	var times={}
	J.tR.dontUpdate=false;
	if(J.checkPageFleet4())return;

	J.tools.initPartage();

	times.initPartage=new Date();
	// Loads options
	try 
	{
		J.tR.options=unserialize(J.get(J.tR.GM_Variables.options, serialize(J.tR.options)));
	}
	catch(e){}
	times.openOptions=new Date();

	
	// Checks compatibility
	try
	{
		var old_version=parseFloat(J.get(J.tR.GM_Variables.version, ""));
		if(parseFloat(old_version)<parseFloat(J.tR.version))
			GM_setValue(J.tR.GM_Variables.update, serialize({need:false, version:''+J.tR.version, lastCheck:new Date()}));
			
		if(parseFloat(old_version)<0.968)
		{
			alert("OG Total Resources :\n"+
			"Many new options available on option page. "+
			"You can now decide on which page you want the resources panel.\n"+
			"Try getting your mouse on a building level, you will see its cost or the time left for its construction\n"+
			"Or on the resources panel, it shows the number of transporters required\n"+
			"You may click on a building name to highlight the line.\n\n"+
			"Nouvelles options : "+
			"Vous pouvez à présent choisir sur quelles pages afficher le panneau des ressources flottant\n"+
			"Vous pouvez obtenir le cout nécessaire d'un batiment en laissant la souris sur son niveau\n"+
			"Ou le nombre de transporteurs nécessaires sur le panneau des ressources"+
			"Vous pouvez aussi surligner une ligne d'un tableau en cliquant sur son titre.")
		}
		if(parseFloat(old_version)<0.90)
		{
			J.set(J.tR.GM_Variables.deleteDefenses,true);
		}
		if(parseFloat(old_version)<0.91)
		{
			J.tR.setOption("updaterInterval", 3);
		}
		if(parseFloat(old_version)<0.62)
		{
			try {delete J.tR.options.panel;}catch(e){}
		}
		if(parseFloat(old_version)<0.36)
		{
			try {delete J.tR.options.style;}catch(e){}
			J.tR.options=J.tR.defaultOptions;
			J.set(J.tR.GM_Variables.options, serialize(J.tR.defaultOptions), false);
		}
		if(parseFloat(old_version)==0)
		{
			J.set(J.tR.GM_Variables.planetsSessions, "a:0:{}", false);
		}
//		J.set(J.tR.GM_Variables.planetsSessions, null);
	}catch(e){}
	
	times.compatibility=new Date();

	try{
		J.tools.checkUpdate()
	}catch(e){}
	J.tR.update=unserialize(J.get(J.tR.GM_Variables.update, "a:0:{}"));
	try
	{
		J.set(J.tR.GM_Variables.version,  J.tR.version);
	} catch(e) {}

	times.updates=new Date();
	
	try {
		J.tools.addStyle("th."+J.tR.getOption("classThFull")+"{"+J.tR.getOption("styleThFull")+"}")
		J.tools.addStyle("th."+J.tR.getOption("classOverflow")+"{"+J.tR.getOption("styleOverflow")+"}")
	}catch(e){}
	try {J.getServerLang()}catch(e){}

	J.tR.Lang.actualLang=(J.serverLang=="fr")?"fr":"en";
	
	times.lang=new Date();

	// Activates moving capabilities
	J.register(document, 'mouseup', J.tools.stoppe);
	J.register(document, 'click', J.tools.stoppe);

	// Tries to recover page and session
	try 
	{
		J.tR.func.parseUrl();
	} catch(e){}

	times.url=new Date();

//	if(J.checkPageOverview())
//		J.tR.getServerDate();

/* 
	try 
	{
//		J.tR.planets=unserialize(J.get("J.tR.planets", "a:0:{}"));
	}
	catch(e)
	{
		if(confirm("Erreur lors de la récupération des données des planètes, réinitialiser?\nSi le script ne fonctionne pas sur ce serveur, désactivez ce serveur par GreaseMonkey"))
		{
			J.set(J.tR.GM_Variables.planets , "a:0:{}");
			J.tR.planets=unserialize(J.get(J.tR.GM_Variables.planets, "a:0:{}"));
		}
		else return;
	}
	*/
	
	var differe=function()
	{
		// Loads planets associated to sessions, delete old sessions
		try 
		{
			J.tR.sessions= unserialize(J.getPartage(J.tR.GM_Variables.sessions, null) ||J.get(J.tR.GM_Variables.sessions, "a:0:{}"));
			for(var session in J.tR.sessions)
			{
				var aSession=J.tR.sessions[session];
				try 
				{
					if(new Date().getTime()- aSession.lastUpdate.getTime()>24*3600000)
					{
						delete J.tR.sessions[session];
						continue;
					}
				}catch(e){}
			}
			if(J.undef(J.tR.sessions[J.session])) {J.tR.sessions[J.session]={}}
			if(J.undef(J.tR.sessions[J.session].planets)) {J.tR.sessions[J.session].planets={}}
			J.tR.session=J.tR.sessions[J.session];
		}
		catch(e) {}
		times.sessions=new Date();


		// Tries to get planet list from the page, fails if the current page is galaxy
		try
		{
			if(J.undef(J.page) || J.page != "galaxy")
				J.tR.func.getPlanets();
			else throw "galaxy page";
		}
		catch(e)
		{
			try
			{
				J.tR.planetsSession=J.tR.sessions[J.session].planets;
				var planet;
				for(var cp in J.tR.planetsSession)
				{
					planet=J.tR.loadPlanet(cp);
					if(J.tR.planetsSession[cp]) J.tR.activePlanet=cp;
				}
			}
			catch(e){}
		}

		try 
		{
			if(J.get(J.tR.GM_Variables.deleteDefenses,false))
			{
				J.set(J.tR.GM_Variables.defensesName,serialize({}));
				for(var cp in J.tR.planetsSession)
				{
					J.set(J.tR.GM_Variables.planetD+cp,serialize({}));
				}
				J.set(J.tR.GM_Variables.deleteDefenses,false);
			}
		}catch(e){}
		
		times.planetsList=new Date();

		try 
		{
				if(J.undef(J.page)||J.page!="galaxy")
					J.tR.func.getResourcesActivePlanete();
		}catch(e){}
	
		if(J.checkPageResources())
		{
			J.tR.func.parseResourcesPage();
		}
		if(J.checkPageBuildings())
		{
			try{
			J.tR.func.parseBuildingsPage();
			}catch(e){}
		}
		if(J.checkPageDefenses())
		{
			try{
			J.tR.func.parseDefensesPage();
			}catch(e){}
		}
		if(J.checkPageFleet())
		{
			try {
				J.tR.func.parseFleetPage();
			}catch(e){}
		}
		
		if(J.checkPageCS())
		{
			try {
				J.tR.func.parseChantierSpatialPage();
			}catch(e){}
		}

		if(J.checkPageTechno())
		{
			try {
				J.tR.func.parseTechnologyPage();
			}catch(e){}
		}
			

		
		times.galaxyAndResources=new Date();

		J.set(J.tR.GM_Variables.planet +J.tR.activePlanet, serialize(J.tR.planets[J.tR.activePlanet]));
		J.set(J.tR.GM_Variables.planets, serialize(J.tR.planets));
	//	for(var cp in J.tR.planets)
	//		J.set("J.tR.planet_"+cp, serialize(J.tR.planets[cp]));

		times.savePlanets=new Date();
		
		// Saving session
		try
		{
			J.tR.session.lastUpdate=new Date();
			J.tR.sessions[J.session]=J.tR.session;	
			J.set(J.tR.GM_Variables.sessions, serialize(J.tR.sessions), false); 
		} catch(e){}
		
		times.saveSession=new Date();
		

		if(J.checkPageOverview())
			J.tR.func.dispLinks();
		times.dispLinks=new Date();
		
		
		if(J.tR.getOption("displayStaticPanel"))
			J.tR.func.afficherTableauRecap();
		if(J.tR.getOption("displayBuildingsPlanet"))
			J.tR.func.afficherTableauBuildings();
			
		setTimeout(J.tR.func.startDisplayTable, 20)
			

			
		// var str="";
		// for(var etape in times)
		// {
			// str+=etape+":"+(t0.getTime()-times[etape].getTime())+"\n";
		// }
		// alert(''+(new Date().getTime()-t0.getTime())+"\n"+str);
	//	J.tR.debugPlanets();
	}
	setTimeout(differe, 30)
//differe();
}
 
 
 J.tR.debugPlanets=function()
 {
	var txt="";
	for(var i in J.tR.planets)
	{
	  var planet=J.tR.planets[i];
	  txt+=J.tR.tools.planetToString(planet)+"\n";//"<br/>";
	}
	alert(txt);
 }
 
 
var bodys=document.getElementsByTagName("body");
if(checkPage())
	if(bodys.length==0) // Opera
		J.register(document, "load", J.tR.start);
	else
		J.tR.start();
 		
