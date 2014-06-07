// ==UserScript==
// @name           [e-Sim] Traduction FR
// @namespace      e-Sim-traduction-fr
// @include        http://e-sim.org*
// ==/UserScript==
//============================================================================
//????
//============================================================================
//---------------------------------------------------
//??
//---------------------------------------------------
//?? ??
menuLinkReplacements = {
	"work.html"				:["Work","Travailler"],
	"train.html"			:["Train","S'entrainer"],
	"companies.html"		:["Companies","Entreprises"],
	"newspaper.html"		:["Newspaper","Journal"],
	"myParty.html"			:["Party","Parti politique"],
	"contracts.html"		:["Contracts","Contrat"],
	"inviteFriends.html"	:["Invite friends","Inviter des amis"],
	"myMilitaryUnit.html"	:["Military unit","Military Unit"],
	
	"productMarket.html"	:["Product market","Marché de produits"],
	"jobMarket.html"		:["Job market","Offres d'emploi"],
	"monetaryMarket.html"	:["Monetary market","Marche Monétaire"],
	"companiesForSale.html"	:["Companies for sale","Entreprises en vente"],
	
	"countryStatistics.html"		:["Country statistics","Pays"],
	"partyStatistics.html"			:["Party statistics","Partis"],
	"newspaperStatistics.html"		:["Newspaper statistics","Journaux"],
	"citizenStatistics.html"		:["Citizen statistics","Citoyens"],
	"militaryUnitStatistics.html"	:["Military unit stats","Military Units"],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Top articles"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Derniers articles"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Événements militaire"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Événements politique"],
	
	"battles.html"							:["Battles","Batailles"],
	"countryPoliticalStatistics.html"		:["War and politics","Guerre et politique"],
	"countryEconomyStatistics.html"			:["Economy","Economie"],
	"countryLaws.html"						:["Laws","Lois"],
	"partyElections.html"					:["Party elections","Élections de parti"],
	"congressElections.html"				:["Congress elections","Élections du congrès"],
	"presidentalElections.html"				:["Presidential elections","Présidentielles"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Nationalité"],
	"googleMap.html"						:["Map","Carte"],
};

//?? ??
menuTextReplacements = {
	"myPlacesButton":["My places","Mon joueur"],
	"marketButton":["Market","Marché"],
	"statisticsButton":["Statistics","Statistiques"],
	"newsButton":["News","Actualité"],
	"electionsButton":["Country","Pays"]
};

//---------------------------------------------------
//????
//---------------------------------------------------
//????1 <span class='key' ...>
sideLink1Replacements = {
	"crossIcon"	:["Logout","Déconnexion"],
	"workIcon"	:["Work","Travailler"],
	"fightIcon"	:["Fight","Combattre"],
	"avatarIcon":["Upload avatar","Uploader un avatar"],
	"voteIcon"	:["Vote","Voter"],
};
//????2 <a href='key' ...>
sideLink2Replacements = {
	"travel.html"	:["Travel","Se déplacer"],
	"pendingCitizenshipApplications.html"	:["change","changer"],
	"http://wiki.e-sim.org/en/Health"	:["Health tutorial","Tutoriel santé"],
};
//????3 <a id='key' href="" ...>
sideLink3Replacements = {
	"eatLink"	:["Eat food","Utiliser nourriture"],
	"useGiftLink":["Use gifts","Utiliser cadeau"]
};
//????4 <input id='key' value="Eat Food" ...>
sideLink4Replacements = {
	"eatButton":["Eat Food","Utiliser"],
	"useGiftButton":["Use gift","Utiliser"]
};

//?? ??
hpTitleReplacements = {
	"News":["News","Presse"],
	"Shouts":["Shouts","Shouts"],
	"Battles":["Battles","Batailles"],
	"Events":["Events","Événements"]
};

//?? tabs All
hpTabsReplacements = {
	"#topArticles":["Global","Global"],
	"#latestArticles":["Latest","Récent"],
	"#localArticles":["Local","Local"],
	
	"#countryShouts":["Country","Pays"],
	"#friendsShouts":["Military unit","Military unit"],
	"#myShouts":["Friends","Amis"],
	
	"#localBattles":["Country","Pays"],
	"#substidedBattles":["Subsidized","Subventionné"],
	"#hotBattles":["Important","Important"],

	"#localEvents":["Military","Militaire"],
	"#globalEvents":["Military","Militaire"],
	"#politicalEvents":["Political","Politique"]
};

hpContentArticlesReplacements = {
	"topArticles":"",
	"latestArticles":"",
	"localArticles":""
};

hpContentShoutsReplacements = {
	"countryShouts":"",
	"friendsShouts":"",
	"myShouts":""
};

hpContentBattlesReplacements = {
	"localBattles":"",
	"substidedBattles":"",
	"hotBattles":""
};

hpContentEventsReplacements = {
	"localEvents":"",
	"globalEvents":"",
	"politicalEvents":""
};




//============================================================================
//????
//============================================================================
//---------------------------------------------------
//??evaluate????obj?????k????
//---------------------------------------------------
function getElements(obj, k) {
	return document.evaluate(k, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//---------------------------------------------------
//evaluate?????
//??????objs?,???????href????????
//---------------------------------------------------
function replaceHerf(objs, replacements) {
	var obj;
	for (var i = 0; i < objs.snapshotLength; i++) {
		obj = objs.snapshotItem(i);
		for (k in replacements) {
			if (obj.href.match(k)) {
				obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
			}
		}
	}
}

//---------------------------------------------------
//evaluate?????
//??????objs?,???????innerHTML????????
//---------------------------------------------------
function replaceInnerHTML(objs, replacements) {
	var obj;
	for (var i = 0; i < objs.snapshotLength; i++) {
		obj = objs.snapshotItem(i);
		for (k in replacements) {
			if (obj.innerHTML.match(k)) {
				obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
			}
		}
	}
}

//---------------------------------------------------
//???replacements?key????document??ID????,??????
//  key=???????ID
//---------------------------------------------------
function replaceInnerHTML2(replacements) {
	var obj;
	for (k in replacements) {
		obj = document.getElementById(k);
		obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
	}
}

//---------------------------------------------------
//private
//????objs??evaluate??????k?????
//---------------------------------------------------
function replaceCommon(objs, replacements, pre, aft) {
	for (k in replacements) {
		var results;
		results = getElements(objs, pre + k + aft);
		for (var i = 0; i < results.snapshotLength; i++) {
			var obj;
			obj = results.snapshotItem(i);
			obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
		}
	}
}

//---------------------------------------------------
//??????????????,
//  <span class='key' ...>  key????
//---------------------------------------------------
function replaceSpanByClass(replacements) {
	replaceCommon(document, replacements, "//span[@class='", "']");
}

//---------------------------------------------------
//??????????????,
//  <a href='key' ...>  key????
//---------------------------------------------------
function replaceLinkByHref(replacements) {
	replaceCommon(document, replacements, "//a[@href='", "']");
}

//---------------------------------------------------
//??????????????,
//  <a id='key' ...>  key????
//---------------------------------------------------
function replaceLinkByID(replacements) {
	replaceCommon(document, replacements, "//a[@id='", "']");
}

//---------------------------------------------------
//??????????????,
//  <input id='key' value="Eat Food" ...>  key????
//---------------------------------------------------
function replaceInputByID(replacements) {
//	replaceCommon(document, replacements, "//input[@id='", "']");
	var obj;
	for (k in replacements) {
		obj = document.getElementById(k);
		obj.value = obj.value.replace(replacements[k][0], replacements[k][1]);
	}
}

//---------------------------------------------------
//??????????????,
//  <input value='key' ...>  key???,?????????
//---------------------------------------------------
function replaceInputByValue(replacements) {
	var objs, obj;
	for (k in replacements) {
		objs = getElements(document, "//input[@value='" + k + "']");
		for (var i = 0; i < objs.snapshotLength; i++) {
			obj = objs.snapshotItem(i);
			obj.value = obj.value.replace(replacements[k][0], replacements[k][1]);
		}
	}
}

//---------------------------------------------------
//replace common
//  Allies link
//---------------------------------------------------
function replaceAlliesLink(obj) {
	var results;
	var obj;
	results = getElements(document, "//a[@class='alliesLink']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		obj.innerHTML = obj.innerHTML.replace(/(no allies)/,"Pas d'alliés");
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 allié(s)");
	}
}


//---------------------------------------------------
//replace common
//  battle info
//---------------------------------------------------
function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"Pas d'alliés");
	//12 allies
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 allié(s)");
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"Guerre de résistance");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Subventions:");
//	//: none
//	allElements.innerHTML=allElements.innerHTML.replace(/(: none)/g,":none");
//	//: 0.02 USD for 1.000 dmg
//	allElements.innerHTML=allElements.innerHTML.replace(/(: )([0-9.]+) (\w*)( for )/g,":$2 $3" ?);
}

//---------------------------------------------------
//replace common
//  battle time
//---------------------------------------------------
function replaceBattleTime(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( second[s]* ago)/g,"Il y a $1 seconde(s) ");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( minute[s]* ago)/g,"Il y a $1 minute(s)");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( hour[s]* ago)/g,"Il y a $1 heure(s)");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( day[s]* ago)/g,"Il y a $1 jour(s)");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( month[s]* ago)/g,"Il y a $1 mois");
}

//---------------------------------------------------
//replace common
//  battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"Derniers");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"défenseurs:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"attaquants:");
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"Statistiques du round en cours");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"Dommages infligés par la défense:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"Dommages infligés par l'attaque:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Vos dommages:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"Classement pays en défense:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"Classement pays en attaque:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/," Top military units en défense:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"Top military units en attaque");
}

//============================================================================
//????(??)
//============================================================================

//alert(window.location.href);
//alert(window.location.host);
//alert(window.location.pathname);

//var allElements;
//var allLinks, thisLink;
//var tmp;
//var allDivs;


//============================================================================
//Menu
//============================================================================
function doMenu() {
	//menu link
	//allElements = document.getElementById('navigationRow');
	//allLinks = getElements(allElements, "//a[@href]");
	//replaceInnerHTML(allLinks, menuLinkReplacements);
	
//	alert(document.getElementById('navigationRow').innerHTML);
	
//	allElements=document.evaluate("//a[@href]", document.getElementById('navigationRow'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//	alert(allElements.snapshotLength);
	
	
//	replaceHerf(getElements(document.getElementById('navigationRow'), "//a[@href]"), menuLinkReplacements);
//	getElementxxxxxxxxxx(document, menuLinkReplacements);

	replaceLinkByHref(menuLinkReplacements);
	
	//menu text
	replaceInnerHTML2(menuTextReplacements);
}
//============================================================================
//Side
//============================================================================
function doSide() {
	var allElements;
	var tmp;
	//allElements = document.getElementById('userMenu');
//	allElements = document.getElementById('contentRow').children[0];
	
	allElements = document.getElementById('userMenu').children[0];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"Niveau: ");
	
//	tmp.innerHTML=tmp.innerHTML.replace(/(XP:)/,"???:");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"Rang:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Prochain:");
	
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Skill économique:");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"Force:");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"Localisation:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"Nationalité:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"Limite nourriture:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"Limite cadeau:");

	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Votre argent");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Votre inventaire");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Vos messages");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"Vos tâches journalières");
	
//	tmp.innerHTML=tmp.innerHTML.replace(/(Travel)/,"Se déplacer");
//	tmp.innerHTML=tmp.innerHTML.replace(/(change)/,"changer");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Health tutorial)/,"Tutoriel Santé");
	replaceLinkByHref(sideLink2Replacements);
	
//	tmp.innerHTML=tmp.innerHTML.replace(/(Eat food)/,"Utiliser nourriture");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Use gifts)/,"Utiliser cadeaux");
	replaceLinkByID(sideLink3Replacements);
	replaceInputByID(sideLink4Replacements);
	
	replaceSpanByClass(sideLink1Replacements);
}

//============================================================================
//Homepage
//============================================================================
function doHP() {
	//hp title
	allElements = document.getElementById('contentRow');
	//allDivs = getElements(allElements, "//div[@class='rightTabGrey']");
	//replaceInnerHTML(allDivs, hpTitleReplacements);
	replaceInnerHTML(getElements(allElements, "//div[@class='rightTabGrey']"), hpTitleReplacements);
	
	//index tabs
	//allDivs = getElements(allElements, "//div[@class='rightTabBlue']");
	//replaceInnerHTML(allDivs, hpTabsReplacements);
	//replaceInnerHTML(getElements(allElements, "//div[@class='rightTabBlue']"), hpTabsReplacements);
//	for (k in hpTabsReplacements) {
//		allLinks = getElements(allElements, "//a[@href='" + k + "']");
//		for (var i = 0; i < allLinks.snapshotLength; i++) {
//			var obj;
//			obj = allLinks.snapshotItem(i);
//			obj.innerHTML = obj.innerHTML.replace(hpTabsReplacements[k][0], hpTabsReplacements[k][1]);
//		}
//	}
	replaceLinkByHref(hpTabsReplacements);
	
	//Articles content
	for (kk in hpContentArticlesReplacements) {
		allElements = document.getElementById(kk);
		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( minute[s]* ago by)/g,"Posté, il y a $2 minute(s) ");
		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( hour[s]* ago by)/g,"Posté, il y a $2 heure(s) ");
		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( day[s]* ago by)/g,"Posté, il y a $2 jour(s) ");
		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( month[s]* ago by)/g,"Posté, il y a $2 mois");
	}
	
	//Shouts content
	for (kk in hpContentShoutsReplacements) {
		allElements = document.getElementById(kk);
		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"Posté, il y a $2 minute(s)");
		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"Posté, il y a $2 heure(s)");
		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"Posté, il y a $2 jour(s)");
		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"Posté, il y a $2 mois");
		
		replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Report":["Report","Signaler"],"More shouts":["More shouts","Plus de shout(s)"] });
	}
	
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		replaceBattleInfo(allElements);
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more battles":["Show more battles","Plus de batailles"] });
		
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more battles)/g,"Afficher plus de batailles");
		allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"Pas de bataille subventionnée");
		allElements.innerHTML=allElements.innerHTML.replace(/(Subsidies informations)/,"Informations Subventions");
		
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( minute[s]* ago)/g,"Il y a $1 minute(s)");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( hour[s]* ago)/g,"Il y a $1 heure(s)");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( day[s]* ago)/g,"Il y a $1 jour(s)");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( month[s]* ago)/g,"Il y a $1 mois");
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z ]*)( in the battle versus )/g,"a sécurisé $2,contre ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"$2 La population de $4 $5 a débuté la résistance en/à");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"a été attaqué par $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"Le président de $2$3 propose de déclarer la guerre à $5$6 ");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," a déclaré la guerre à $2$3 ");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," a conquis $2, dans la bataille contre ");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","??????"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Plus d'événements");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"Écrire un nouveau shout:");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="Shout!"
	//Send to channels: 
	allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"  Envoyer à :");
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," Pays | $2  Military unit | $4 Amis");
	//Characters remaining: 100
	//alert(allElements.innerHTML);
	//allElements.innerHTML=allElements.innerHTML.replace(/(Characters remaining:)/,"???????:");
	//alert(allElements.innerHTML);
}

//============================================================================
//Job Market
//============================================================================
function doJobMarket() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Offres d'emploi");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Critéres de sélection:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Pays:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Skill économique:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Employeur");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Entreprise");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produit");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Skill minimum");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Salaire");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Postuler");
	
	replaceInputByValue({"Apply":["Apply","Postuler"],"Show":["Show","Afficher"]});
}

//============================================================================
//Work
//============================================================================
function doWork() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"Travailler");
	
	
//	tmp = allElements.children[4];
	
	if (allElements.innerHTML.match("You have no job")) {
		xxx = document.getElementById('command').parentNode.children[0];
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"Vous n'avez pas d'emploi");
		replaceInputByValue({"Get a job now!":["Get a job now!","Trouvez vous un emploi!"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Votre lieu de travail");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Employeur");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Salaire:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Démissionner");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"Vous n'avez pas travaillé aujourd'hui");
			replaceInputByValue({"Work now":["Work now","Travailler"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Résultats du jour");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Votre salaire brut");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Votre salaire net");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Taxe sur votre salaire");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Vous travaillez chez");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"Experience gagnée");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Skill économique gagné");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/,"Nombre de jour de travail");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Votre productivité de base");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Modificateur de productivité");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Productivité totale");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Unités produites");
			//+60% Raw company quality 
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Qualité de l'entreprise de Raw");
		}
	}
}

//============================================================================
//Train
//============================================================================
function doTrain() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"Entrainement militaire");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		replaceInputByValue({"Train":["Train","S'entrainer"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Entrainement effectué. Revenez demain svp");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Vous vous êtes déjà entrainé aujourd'hui.");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Vous vous êtes déjà entrainé aujourd'hui. Revenez demain svp");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Force gagnée");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Détails Militaires");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Nombre d'entrainements suivis:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Force:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Rang Militaire:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Total des dommages:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Dommages sans arme:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Dommages avec une arme Q1:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"Dommages avec une arme Q2:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"Dommages avec une arme Q3:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"Dommages avec une arme Q4:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"Dommages avec une arme Q5:");
	
}

//============================================================================
//Battles List ????
//============================================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Batailles");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Pays");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"Tri:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Seulements les batailles subventionnées:");
	
	replaceInputByValue({"Show battles":["Show battles","Afficher batailles"]});
	
	tmp = document.getElementById('battlesTable')
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Débuter");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Bataille");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"defenseur vs attaquant");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Score");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Total de dommages infligés");
	
	replaceBattleInfo(tmp);
	replaceBattleTime(tmp);
}

//============================================================================
//Battle ??????
//============================================================================
function doBattle() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[1].children[0].children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Guerre de Résistance");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"Lancée par ");
	tmp = allElements.children[1].children[0].children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Round $2 ");
	tmp = allElements.children[1].children[0].children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Rounds remportés par la défense");
	tmp = allElements.children[1].children[0].children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Rounds remportés par l'attaque");	
	
	replaceAlliesLink();

	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"Top défense");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"Top attaque");
	
	
//	tmp = allElements.children[3];
	tmp = allElements.children[3].children[0].children[0].children[1].children[0].children[1];
//	alert(tmp.innerHTML);
	
	
	tmp.innerHTML=tmp.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Vous ne pouvez pas vous battre dans cette bataille depuis votre lieu actuel");
	tmp.innerHTML=tmp.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"Vous devez vous déplacer dans le pays occupant pour participer à la bataille");
	tmp.innerHTML=tmp.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"Vous devez vous déplacer dans un des pays participant à la bataille");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show round:)/,"Afficher round:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Current round)/,"Round en cours");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/g,"Round $2 ");
	replaceInputByValue({"Show round":["Show round","Afficher"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(This round was won by:)/g,"Ce round a été remporté par :");
//	
	tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Selectionner arme:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Selectionner votre coté:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"Vous combattez pour:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fight (1 hit))/,"Combattre (1 coup )");
	tmp.innerHTML=tmp.innerHTML.replace(/(Berserk! (5 hits))/,"Bersek ! (5 coups )");
	replaceInputByValue({"Fight (1 hit)":["Fight (1 hit)","Combattre (1 coup) "],"Berserk! (5 hits)":["Berserk! (5 hits)","Berserk! (5 coups)"]});
	
	tmp = allElements.children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Afficher les statistiques de toute la bataille");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Tutoriel de combat sur le wiki");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Fonctionnement batailles");
	
//	allElements = document.getElementById('fightStatus');
//	tmp = allElements.children[0];
//	tmp.innerHTML=tmp.innerHTML.replace(/(Waiting for results...)/,"??????:");
//	tmp = allElements.children[1];
//	tmp.innerHTML=tmp.innerHTML.replace(/(Damage done:)/,"????:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(XP gained:)/,"?????:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Health:)/,"??:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Location bonus:)/,"????:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Fight bonuses)/,"??????");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Your total damage:)/,"????:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Damage required for next rank:)/,"????????:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Your health:)/,"????:");
}

//============================================================================
//Battle Statistics ????????
//============================================================================
function doBattleStatistics() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	replaceBattleInfo(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"débuté par");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Round $2 ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Rounds remportés par la défense");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Rounds remportés par l'attaque");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Retour à la bataille");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"Les statistiques sont actualisées toutes les 30 minutes");
}




//============================================================================
//Main
//============================================================================
function isTargetHtml(targetHtml) {
	if (window.location.pathname.substring(0,targetHtml.length)==targetHtml) {
		return true;
	} else {
		return false;
	}
}

//alert(window.location.href);
//alert(window.location.host);
//alert(window.location.pathname);
//var u;
//u=window.location.pathname

doMenu();
doSide();
if (window.location.pathname=="/" || isTargetHtml("/index.html")) {
	doHP();
}
if (isTargetHtml("/jobMarket.html")) {
	doJobMarket();
}
if (isTargetHtml("/work.html")) {
	doWork();
}
if (isTargetHtml("/train.html")) {
	doTrain();
}
if (isTargetHtml("/battles.html")) {
	doBattlesList();
}
if (isTargetHtml("/battle.html")) {
	doBattle();
}
if (isTargetHtml("/battleStatistics.html")) {
	doBattleStatistics();
}