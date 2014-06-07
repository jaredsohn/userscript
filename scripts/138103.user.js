// ==UserScript==
// @name           e-Sim PT-BR
// @description    Este script traduz o jogo de browser e-sim para Portugûes do Brasil.
// @include        http://e-sim.org*
// @version        1.0
// @updateURL      https://userscripts.org/scripts/source/138103.meta.js
// @downloadURL    https://userscripts.org/scripts/source/138103.user.js
// ==/UserScript==

menuLinkReplacements = {
	"work.html"				:["Work","Trabalho"],
	"train.html"			:["Train","Treinar"],
	"companies.html"		:["Companies","Empresas"],
	"newspaper.html"		:["Newspaper","Jornal"],
	"myParty.html"			:["Party","Partido político"],
	"contracts.html"		:["Contracts","Contratos"],
	"inviteFriends.html"	:["Invite friends","Convidar amigos"],
	"myMilitaryUnit.html"	:["Military unit","Unidade Militar"],
	
	"productMarket.html"	:["Product market","Mercado de produtos"],
	"jobMarket.html"		:["Job market","Ofertas de empregos"],
	"monetaryMarket.html"	:["Monetary market","Mercado Monetário"],
	"companiesForSale.html"	:["Companies for sale","Empresas à venda"],
	
	"countryStatistics.html"		:["Country statistics","País"],
	"partyStatistics.html"			:["Party statistics","Partidos"],
	"newspaperStatistics.html"		:["Newspaper statistics","Jornais"],
	"citizenStatistics.html"		:["Citizen statistics","Cidadãos"],
	"militaryUnitStatistics.html"	:["Military unit stats","Unidades Militares"],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Melhores artigos"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Últimos artigos"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Eventos militares"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Eventos políticos"],
	
	"battles.html"							:["Battles","Batalhas"],
	"countryPoliticalStatistics.html"		:["War and politics","Guerra e política"],
	"countryEconomyStatistics.html"			:["Economy","Economia"],
	"countryLaws.html"						:["Laws","Leis"],
	"partyElections.html"					:["Party elections","Eleições partidárias"],
	"congressElections.html"				:["Congress elections","Eleições do congresso"],
	"presidentalElections.html"				:["Presidential elections","Eleições presidenciais"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Nacionalidade"],
	"googleMap.html"						:["Map","Mapa"],
};


//?? ??
menuTextReplacements = {
	"myPlacesButton":["My places","Meus lugares"],
	"marketButton":["Market","Mercado"],
	"statisticsButton":["Statistics","Estatísticas"],
	"newsButton":["News","Notícias"],
	"electionsButton":["Country","País"]
};

//---------------------------------------------------
//????
//---------------------------------------------------
//????1 <span class='key' ...>
sideLink1Replacements = {
	"crossIcon"	:["Logout","Sair"],
	"workIcon"	:["Work","Trabalhar"],
	"fightIcon"	:["Fight","Combater"],
	"avatarIcon":["Upload avatar","Enviar um avatar"],
	"voteIcon"	:["Vote","Votar"],
};
//????2 <a href='key' ...>
sideLink2Replacements = {
	"travel.html"	:["Travel","Viajar"],
	"pendingCitizenshipApplications.html"	:["change","escolher"],
	"http://wiki.e-sim.org/index.php/Health"	:["Health tutorial","Tutorial de Saúde"],
};
//????3 <a id='key' href="" ...>
sideLink3Replacements = {
	"eatLink"	:["Eat food","Comer"],
	"useGiftLink":["Use gifts","Usar presentes"]
};
//????4 <input id='key' value="Eat Food" ...>
sideLink4Replacements = {
	"eatButton":["Eat Food","Utilisar"],
	"useGiftButton":["Use gift","Utilisar"]
};

//?? ??
hpTitleReplacements = {
	"News":["News","Novidades"],
	"Shouts":["Shouts","Gritar"],
	"Battles":["Battles","Batalhas"],
	"Events":["Events","Eventos"]
};

//?? tabs All
hpTabsReplacements = {
	"#topArticles":["Global","Global"],
	"#latestArticles":["Latest","Recente"],
	"#localArticles":["Local","Local"],
	
	"#countryShouts":["Country","País"],
	"#friendsShouts":["Military unit","Unidade militar"],
	"#myShouts":["Friends","Amigos"],
	
	"#localBattles":["Country","País"],
	"#substidedBattles":["Subsidized","Patrocinar"],
	"#hotBattles":["Important","Importante"],

	"#localEvents":["Military","Militar"],
	"#globalEvents":["Military","Militar"],
	"#politicalEvents":["Political","Político"]
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
//???FireFox???
//---------------------------------------------------
var isFF = navigator.userAgent.toLowerCase().match("firefox") ? true : false;
//alert(isFF);


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
//private
//????objs??evaluate??????k?????
//---------------------------------------------------
function replaceCommonSSS(objs, kk, replacements, pre, aft) {
	results = getElements(objs, pre + kk + aft);
//	alert(pre + kk + aft + "____" + results.snapshotLength);
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		for (k in replacements) {
			if (obj.innerHTML.match(k)) {
				obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
			}
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
//  <a href='???' ...>  key????link??
//---------------------------------------------------
function replaceLinkSSS(replacements) {
	replaceCommonSSS(document, "" ,replacements, "//a[@href", "]");
}

//---------------------------------------------------
//??????????????,
//  <a href='key' ...>  key????
//
//	key="#"
//	{ "Report":["Report","??"],"More shouts":["More shouts","??????"] }
//---------------------------------------------------
function replaceLinkByHrefSSS(kk, replacements) {
	replaceCommonSSS(document, kk, replacements, "//a[@href='", "']");
//	results = getElements(document, "//a[@href='" + kk + "']");
//	for (var i = 0; i < results.snapshotLength; i++) {
//		obj = results.snapshotItem(i);
//		for (k in replacements) {
//			if (obj.innerHTML.match(k)) {
//				obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
//			}
//		}
//	}
}

//---------------------------------------------------
//??????????????,
//  <a style='key' ...>  key????
//
//	key="font-weight: bold"
//	{ "More shouts":["More shouts","????????"]] }
//---------------------------------------------------
function replaceLinkByStyleSSS(kk, replacements) {
	replaceCommonSSS(document, kk, replacements, "//a[@style='", "']");
//	results = getElements(document, "//a[@href='" + kk + "']");
//	for (var i = 0; i < results.snapshotLength; i++) {
//		obj = results.snapshotItem(i);
//		for (k in replacements) {
//			if (obj.innerHTML.match(k)) {
//				obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
//			}
//		}
//	}
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
//??????????????,
//  <input value="key" class="kk">
//
//	key="fightButton"
//	{ "Fight (1 hit)":["Fight (1 hit)","xxxx"]] }
//---------------------------------------------------
function replaceInputByClassSSS(kk, replacements) {
	results = getElements(document, "//input[@class='" + kk + "']");
//	alert(results.snapshotLength);
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
//		alert(obj.value);
		for (k in replacements) {
//				alert(obj.value);
//				alert(k);
//				alert(obj.value.match("hit"));
			if (obj.value.match(k)) {
//				alert(obj.value);
				obj.value = obj.value.replace(replacements[k][0], replacements[k][1]);
			}
		}
	}
}

//---------------------------------------------------
//replace common
//  Allies link
//---------------------------------------------------
function replaceAlliesLinkComm(k) {
	var results;
	var obj;
	results = getElements(document, "//a[@class='" + k + "']");
//	alert(results.snapshotLength);
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 aliado(s)");
	}
}
function replaceAlliesLink() {
	replaceAlliesLinkComm("alliesLink");
}
function replaceAlliesLink2() {
	replaceAlliesLinkComm("alliesLink2");
}
function replaceNoAlliesComm(obj) {
	if (obj.innerHTML.match("no allies")) {
		obj=obj.childNodes[3];
//		alert(obj.nodeValue);
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"Não aliados");
	}
}
//function replaceNoAlliesChildren(obj) {
//	if (obj.innerHTML.match("no allies")) {
//		obj=tmp.childNodes[3];
//		obj.nodeValue=tmp.nodeValue.replace(/(no allies)/,"???");
//	}
//}
function replaceAlliesLinksss() {
	results = getElements(document, "//div[@class='battleDiv']");
//	alert(results.snapshotLength);
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp=results.snapshotItem(i).children[0];
		replaceNoAlliesComm(tmp);
//		if (tmp.innerHTML.match("no allies")) {
//			tmp=tmp.childNodes[3];
////			alert(tmp.nodeValue);
//			tmp.nodeValue=tmp.nodeValue.replace(/(no allies)/,"???");
//		}
		tmp=results.snapshotItem(i).children[2];
		replaceNoAlliesComm(tmp);
//		if (tmp.innerHTML.match("no allies")) {
//			tmp=tmp.childNodes[3];
////			alert(tmp.nodeValue);
//			tmp.nodeValue=tmp.nodeValue.replace(/(no allies)/,"???");
//		}
//		alert(results.snapshotItem(i).children[3].innerHTML);
		tmp=results.snapshotItem(i).children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Guerre de résistance");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Subventions:");
//		obj = results.snapshotItem(i);
////		alert(obj.innerHTML);
//		obj.innerHTML=obj.innerHTML.replace(/(no allies)/,"???");
//		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/g,"$1 ??");
//		obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/,"????");
//		obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/,"??:");
	}
}


//---------------------------------------------------
//replace common
//  battle info
//---------------------------------------------------
function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"Não aliados");
	//12 allies
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 aliados");
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"Guerra de Resistência");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Patrocinadores:");
//	//: none
//	allElements.innerHTML=allElements.innerHTML.replace(/(: none)/g,":?");
//	//: 0.02 USD for 1.000 dmg
//	allElements.innerHTML=allElements.innerHTML.replace(/(: )([0-9.]+) (\w*)( for )/g,":$2 $3" ?);
}

//---------------------------------------------------
//replace common
//  ??????
//  ????
//---------------------------------------------------
function replaceBattleTime(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( second[s]* ago)/g,"À $1 segundo(s) ");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( minute[s]* ago)/g,"À $1 minuto(s)");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( hour[s]* ago)/g,"À $1 hora(s)");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( day[s]* ago)/g,"À $1 dia(s)");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( month[s]* ago)/g,"À $1 mês(es)");
}

//---------------------------------------------------
//replace common
//  ?? ???????? by
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( second[s]* ago by)/g,"Postado à $2 segundo(s) por ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( minute[s]* ago by)/g,"Postado à y a $2 minuto(s) por ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( hour[s]* ago by)/g,"Postado à $2 hora(s) por ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( day[s]* ago by)/g,"Postado à $2 dia(s) por ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( month[s]* ago by)/g,"Postado à $2 mês(es) por ");
}

//---------------------------------------------------
//replace common
//  ?????????
//---------------------------------------------------
function replacNewspaperTime(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( second[s]* ago)/g,"Postado à $2 segundo(s)");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( minute[s]* ago)/g,"Postado à y a $2 minuto(s)");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( hour[s]* ago)/g,"Postado à $2 hora(s)");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( day[s]* ago)/g,"Postado à $2 dia(s)");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( month[s]* ago)/g,"Postado à $2 mês(es)");
}


//---------------------------------------------------
//replace common
//  battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"Recente");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"defensores:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"atacantes:");
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"Estatísticas da rodada atual");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"Dano causado pela defesa:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"Danos causados ​​pelo ataque:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Seu dano:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"Ranking de defesa:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"Ranking de ataque:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/," Principais unidades militares na defesa:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"Principais unidades militares no ataque");
}





//---------------------------------------------------
//replace common
//  battle Statistics
//---------------------------------------------------
function doShoutsComm() {
	results = getElements(document, "//b[@style='color: #222']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("second")) {
			obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"À $2 segundo(s)");
		} else if (obj.innerHTML.match("minute")) {
			obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"À $2 minuto(s)");
		} else if (obj.innerHTML.match("hour")) {
			obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"À $2 hora(s)");
		} else if (obj.innerHTML.match("day")) {
			obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"À $2 dia(s)");
		} else if (obj.innerHTML.match("month")) {
			obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"À $2 mês(es)");
		} 
	}
//		alert("1-2");
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Reportar"],
		"Delete":["Delete","Apagar"],
		"Edit":["Edit","Editar"],
		"More shouts":["More shouts","Mais gritos"]
	});
	
	
	replaceInputByValue({
		"Report":["Report","Reportar"],
		"Delete":["Delete","Apagar"],
		"Edit":["Edit","Editar"]
	});	
	
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
	
	allElements = document.getElementById('userMenu').children[0];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"Nível: ");
	//	tmp.innerHTML=tmp.innerHTML.replace(/(XP:)/,"???:");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"Rank:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Próximo rank:");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Habilidade econômica:");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"Força:");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"Localização:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"Nacionalidade:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"Limite de alimentação:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"Limite de Presentes:");


	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Seu dinheiro");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Seu inventário");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Suas mensagens");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"Suas tarefas de hoje");
	
	//?? ?? ????
	replaceLinkByHref(sideLink2Replacements);
	//?? ??
	replaceLinkByID(sideLink3Replacements);
	//??-2 ??-2
	replaceInputByID(sideLink4Replacements);
	//?? ?? ?? ??
	replaceSpanByClass(sideLink1Replacements);
	

	results = getElements(document, "//option[@value]");
//	alert(results.snapshotLength);
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"Rodade atual");
		} else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"$2ª Rodada ");
		} else if (obj.innerHTML.match("Food ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Tipo de alimentos");
		} else if (obj.innerHTML.match("Gift ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Tipo de presentes");
		} else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"Sem arma (");
		} else if (obj.innerHTML.match("Any quality")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"Todos");
		}
	}
}

//============================================================================
//Homepage
//============================================================================
function doHP() {
	//hp title
//	allElements = document.getElementById('contentRow');
	replaceInnerHTML(getElements(document, "//div[@class='rightTabGrey']"), hpTitleReplacements);
	
	//index tabs
	replaceLinkByHref(hpTabsReplacements);
	
	//Articles content
	for (kk in hpContentArticlesReplacements) {
		allElements = document.getElementById(kk);
		replacNewspaperTimeWithAuthor(allElements);
//		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( minute[s]* ago by)/g,"??? $2 ??? ");
//		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( hour[s]* ago by)/g,"??? $2 ??? ");
//		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( day[s]* ago by)/g,"??? $2 ?? ");
//		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( month[s]* ago by)/g,"??? $2 ?? ");
	}
	
//	alert(1);
	//Shouts content
//	for (kk in hpContentShoutsReplacements) {
//		allElements = document.getElementById(kk);
//		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"??? $2 ???");
//		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"??? $2 ???");
//		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"??? $2 ??");
//		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"??? $2 ??");
		
//	}
	
//	alert(2);
	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	
	replaceLinkSSS({
		"Show more battles":["Show more battles","Exibir mais batalhas"],
		"Subsidies informations":["Subsidies informations","Nenhuma batalha patrocinada"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		//"No subsidized battles":["No subsidized battles","?????"],
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"Nenhuma batalha patrocinada");
		}
		
		
//		replaceBattleInfo(allElements);
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more battles":["Show more battles","??????"] });
//		allElements.innerHTML=allElements.innerHTML.replace(/(Show more battles)/g,"??????");
//		allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"?????");
//		allElements.innerHTML=allElements.innerHTML.replace(/(Subsidies informations)/,"?????????");
		
	}
	
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"O valor nominal de sua unidade militar:");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Luta por:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( minute[s]* ago)/g,"À $1 minuto(s)");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( hour[s]* ago)/g,"À $1 hora(s)");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( day[s]* ago)/g,"À $1 dia(s)");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( month[s]* ago)/g,"À $1 mês(es)");
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z ]*)( in the battle versus )/g,"garantiu $2, contra ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"A população $2 de $4 $5 começou a resistência");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"foi atacado por $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"O presidente do(a) $2$3 propôs guerra à $5$6 ");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," guerra declarada à $2$3 ");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," $2 conquitado na batalha contra ");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","??????"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Exibir mais eventos");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"Escrever um novo grito:");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="Envoyer"
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Enviar para:");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Enviar para:");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," País | $2  Unidade militar | $4 Amigos");
	//Characters remaining: 100
	//alert(allElements.innerHTML);
	//allElements.innerHTML=allElements.innerHTML.replace(/(Characters remaining:)/,"???????:");
	//alert(allElements.innerHTML);
	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Mais gritos"] });
}

//============================================================================
//Job Market
//============================================================================
function doJobMarket() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Ofertas de Empregos");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Critérios de seleção:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"País:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Habilidade econômica:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Chefe");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Empresa");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produto");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Habilidade mínima");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Salário");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Aplicar");
	
	replaceInputByValue({"Apply":["Apply","Aplicar"],"Show":["Show","Exibir"]});
}

//============================================================================
//Work
//============================================================================
function doWork() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"Trabalhar");
	
	
//	tmp = allElements.children[4];
	
	if (allElements.innerHTML.match(/You have no job^\./)) {
		xxx = document.getElementById('command').parentNode.children[0];
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"Você não tem um emprego");
		replaceInputByValue({"Get a job now!":["Get a job now!","Encontre um emprego agora!"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"Você deve estar em países onde a empresa está pronta para trabalhar. ");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Seu local de trabalho");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Chefe");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Salário:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Deixar trabalho");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"Você não trabalhou hoje");
			replaceInputByValue({"Work now":["Work now","Trabalhe"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Resultados de hoje");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Seu salário bruto");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Seu salário líquido");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Imposto sobre o seu salário");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Você trabalhou em");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"Experiência adquirida");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Habilidade econômica adquirida");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/,"Número de dias úteis");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Sua produtividade básica");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Modificador de produtividade");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Produtividade total");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Unidades produzidas");
			//+60% Raw company quality 
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Qualidade empresarial bruta");
		}
	}
}


//============================================================================
//Product Markets
//============================================================================
function doProductMarkets() {
	rr = {
		"1":["Any","Qualquer"],
		"2":["Iron","Ferro"],
		"3":["Grain","Grão"],
		"4":["Oil","Óleo"],
		"5":["Stone","Pedra"],
		"6":["Wood","Madeira"],
		"7":["Diam.","Diam."],
		"8":["Weap.","Arma"],
		"9":["House","Casa"],
		"10":["Gift","Pres."],
		"11":["Food","Comi."],
		"12":["Ticket","Ticket"],
		"13":["DS","SD"],
		"14":["Hosp.","Hosp."]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"Mercado");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Exibir ofertas:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","País:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Qualidade:");
	
	replaceInputByValue({"View offers":["View offers","Ver ofertas"],"Buy":["Buy","Comprar"]});
	
	results = getElements(document, "//label[@for]");
//	alert(results.snapshotLength);
//	alert(results.snapshotItem(0).htmlFor);
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
//		alert(obj.htmlFor);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
//			alert(obj.innerHTML);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Mostrar minhas ofertas/Postar nova oferta"]})
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produto");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Vendedor");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"Estoque");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Preço");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Comprar");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," itens ");
	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Mostrar minhas ofertas/Postar nova oferta"],
		"http://wiki.e-sim.org/index.php/Category:Products":["Products info","Informações sobre produtos"]
	});
}

//============================================================================
//Train
//============================================================================
function doTrain() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"Treinamento militar");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		replaceInputByValue({"Train":["Train","Treinamento"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Treinamento realizado. Por favor, volte amanhã");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Você já treinou hoje!");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Você já treinou hoje. Por favor, volte amanhã");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Força adquirida:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Detalhes militares");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Número de treinamentos seguidos:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Força:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Rank militar:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Dano total:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Danos sem uma arma:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Danos com uma arma Q1:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"Danos com uma arma Q2:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"Danos com uma arma Q3:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"Danos com uma arma Q4:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"Danos com uma arma Q5:");
	
}

//============================================================================
//Battles List ????
//============================================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Batalhas");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"Classificando:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Somente batalhas:");
	
	replaceInputByValue({"Show battles":["Show battles","Ver batalhas"]});
	
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
//	alert(tmp.innerHTML);
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Começar");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Batalha");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"defensor vs atacante");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Pontuação");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Dano total");
	
	tmp = allElements.children[0];
//	alert(tmp.children.length);
	
	for (i = 1; i < tmp.children.length; i++) {
		obj = tmp.children[i].children[3];
		replaceBattleTime(obj);
	}
//	replaceBattleInfo(tmp);
//	replaceBattleTime(tmp);

	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	
}

//============================================================================
//Battle ??????
//============================================================================
function doBattle() {
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	//???? ?? ????
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
//	var allElements;
//	allElements = document.getElementById('contentRow').children[1];
	allElements = document.getElementById('battleBar').parentNode;
	
//	tmp = allElements.children[1].children[0].children[2];
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Guerra de Resistência");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"iniciada por");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
//	alert(allElements.children[7].innerHTML);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"$2ª rodada");
	
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Rodadas ganhas pela defesa");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Rodadas ganhas pelo ataque");	

	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	//???? Top3
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"Melhores defensores");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"Melhores atacantes");
	
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	//????
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	
//	tmp = allElements.children[3];
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];
//	alert(allElements.innerHTML);
	//?? ???????
	//?? ???????
	//????
	//????
	//????

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Você não pode vencê-lo nesta batalha de sua localização atual");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"Terá de se deslocar para o país ocupante para participar da batalha");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Você não pode vencê-lo nesta batalha de sua localização atual");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"Você tem que se mover para um país participante da batalha");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"Essa rodada foi vencida pelo(a):");
	} else {
//		if (isFF) {
//			//fight button
//			replaceInputByClassSSS("fightButton", 
//				{
//					"1 hit":["Fight (1 hit)","????"],
//					"5 hits":["Berserk! (5 hits)","????! (5??)"]
//				}
//			);
//		}
		
		//text
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Selecionar arma:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Escolha seu lado:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"Você luta pelo(a):");
	}
	
	
	//????
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"Exibir rodada:");
	}
	replaceInputByValue({"Show round":["Show round","Exibir"]});
	
//	tmp.innerHTML=tmp.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"??????????????,");
//	tmp.innerHTML=tmp.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"???????????????????????????");
//	tmp.innerHTML=tmp.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"???????????????????????????");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Show round:)/,"????????:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Current round)/,"?????");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/g,"? $2 ??");
//	replaceInputByValue({"Show round":["Show round","??????"]});
//	tmp.innerHTML=tmp.innerHTML.replace(/(This round was won by:)/g,"???????:");
//	
//	tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"????:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"????:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"????:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Fight (1 hit))/,"????");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Berserk! (5 hits))/,"????! (5??)");
//	replaceInputByValue({"Fight (1 hit)":["Fight (1 hit)","????"],"Berserk! (5 hits)":["Berserk! (5 hits)","????! (5??)"]});
	
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	//????
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Veja as estatísticas da batalha");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Tutorial de combates na wiki");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Batalhas em execução");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"começou por");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"$2ª rodada ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Rodadas ganhas pela defesa");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Rodadas ganhas pelo ataque");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Voltar para a batalha");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"As estatísticas são atualizadas a cada 30 minutos");
}


//============================================================================
//Profile
//============================================================================
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /,"Cidadãos ");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"On-line");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"Off-line");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Editar perfil"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","Relatório múltiplo"]
	});
	replaceInputByValue({"Report multi":["Report multi","Relatório múltiplo"]});

//	results = getElements(document, "//table[@class='attributesTable']");
//	if (results.snapshotLength > 0) {
//		obj = results.snapshotItem(0);
//		obj.innerHTML=obj.innerHTML.replace(/Level:/,"??:");
//		obj.innerHTML=obj.innerHTML.replace(/XP:/,"???:");
//		obj.innerHTML=obj.innerHTML.replace(/Damage:/,"????:");
//		obj.innerHTML=obj.innerHTML.replace(/Rank:/,"??:");
//		obj.innerHTML=obj.innerHTML.replace(/Economy skill:/,"????:");
//		obj.innerHTML=obj.innerHTML.replace(/Strength:/,"??:");
//		obj.innerHTML=obj.innerHTML.replace(/location:/,"???:");
//		obj.innerHTML=obj.innerHTML.replace(/Citizenship:/,"??:");
//	}

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match("Permanently")) {
		rowoffset = 2;
		tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"Banido permanentemente");
		tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"Rasão:");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Banido por:");
	}
	
//	alert(allElements.innerHTML);
	tmp = allElements.children[0].children[2+rowoffset];
//	alert(tmp.innerHTML);
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Nível:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"Xp:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Dano:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"Rank:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Habilidade econômica:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"Força:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Localisação:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Nacionalidade:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"Nascimento:");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Unidade militar:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Partido:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Jornal:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"Trabalha em:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"Proprietário da empresa");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Gabinete político:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Nenhuma unidade militar");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Nenhum partido");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Nenhum jornal");
	tmp.innerHTML=tmp.innerHTML.replace(/No work/,"Sem trabalho");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"Nenhuma empresa");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"Nenhum escritório");
	
//	allElements = document.getElementById('contentRow').children[2];
//	tmp = allElements.children[0].children[0];
	allElements = getElements(document, "//ul[@style]");
//	alert(allElements.snapshotLength);
	
	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
		tmp = allElements.snapshotItem(0).parentNode;
		if (tmp.innerHTML.match("Active debts")) {
			rowoffset = 2;
			tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"Dívida(s) a pagar");
			//tmp.innerHTML=tmp.innerHTML.replace(/(payback time )(\d*)( game day)/,"Remboursement $2 jours de jeu");
			tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g," antes de ");
			tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( game day)/g," $1.");
		}
	}
	
	allElements = document.getElementById('medals');
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"Amigos");
	
//	alert(allElements.snapshotItem(0).parentNode.children[0].innerHTML);
	
	
	allElements = document.getElementById('countryShouts');
	allElements.parentNode.children[0].innerHTML=allElements.parentNode.children[0].innerHTML.replace(/Shouts:/,"Mensagens:");
	
	doShoutsComm();
}


//============================================================================
//Edit Citizen
//============================================================================
function doEditCitizen() {
	allElements = document.getElementById('editCitizenForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Mail:/,"Email:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Nova senha:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Repita sua nova senha:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"Senha antiga:");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Novo avatar:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","Tamanho máximo:");
	
	replaceInputByValue({"Edit citizen":["Edit citizen","Editar cidadão"]});
}

//============================================================================
//Travel
//============================================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"Deslocamento");
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"País");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"Região:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"Ticket de qualidade:");
	
	replaceInputByValue({"Travel":["Travel","Viajar"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/index.php/Traveling":["Traveling tutorial on wiki","Movendo tutorial na Wiki"]
	});
}


//============================================================================
//Inbox Messages
//============================================================================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"Mensagem de ");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Autor");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Mensagem");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Data");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Apagar");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"Para");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		replaceBattleTime(tmp.children[i].children[2]);
//		alert(i);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","Enviar mensagem"],
		"composeMessage.html":["Compor mensagem",""]
	});
	replaceInputByValue({
		"Delete":["Delete","Apagar"],
		"Quick reply":["Quick reply","Resposta rápida"],
		"Report":["Report","Reportar"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Reportar"],
		"Quick reply":["Quick reply","Resposta rápida"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","Responder"],
		"conversation.html":["Previous messages","Mensagem anterior"]
	});
	
}

//============================================================================
//Sent Messages
//============================================================================
function doSentMessages() {
	doMessagesComm();
//
	replaceLinkByHref({
		"inboxMessages.html":["Mensagens recebidas",""],
		"composeMessage.html":["Compose Message","Escrever uma mensagem"]
	});
}

//============================================================================
//Compose Message
//============================================================================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Nova mensagem");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Caixa de entrada"],
		"sentMessages.html":["Sent messages","Mensagem enviadas"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Destinatário:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Título:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mensagem:");
	
	replaceInputByValue({
		"Send":["Send","Envoyer"],
		"Preview":["Preview","Pré-visualisar"]
	});
}


//============================================================================
//Subscriptions
//============================================================================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"Assinaturas");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"Assinaturas");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","Lista de jornais assinanados"]
	});
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Jornais assinados");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Total<br>de assinaturas");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Jornal");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"????");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length - 1; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/index.php/Newspaper/":["Newspaper tutorial on wiki","Tutorial sobre Jornal na Wiki"]
	});
}

//============================================================================
//Newspaper
//============================================================================
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Jornal");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"Artigos recentes");
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Editar jornal"],
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Tutorial sobre Jornal na Wiki"]
	});
	replaceInputByValue({
		"Publish":["Publish","Publicar"],
		"Preview":["Preview","Pré-visualisar"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Escrever novo artigo");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Publicar no país");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Título do artigo:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mensagem:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"Por favor, faça um backup dos seus artigos no seu disco rígido antes de enviar!!!!");
	}
}

//============================================================================
//Edit Newspaper
//============================================================================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Nome do jornal:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Novo avatar:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","tamanho máximo:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Editar Jornal"]
	});
	replaceInputByValue({
		"Delete":["Edit newspaper","Editar Jornal"]
	});
}

//============================================================================
//Article
//============================================================================
function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"Artigo");
	
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","Editar artigo"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Editar jornal"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Reportar"],
		"Edit":["Edit","Editar"],
		"Delete":["Delete","Apagar"]
	});
	replaceInputByValue({
		"Publish":["Publish","Publicar"],
		"Report":["Report","Reportar"],
		"Edit":["Edit","Editarr"],
		"Delete":["Delete","Apagar"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Novo comentário");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mensagem:");
}

//============================================================================
//Edit Article
//============================================================================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Jornal");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Editar");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Título do artigo:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mensagem:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Editar jornal"],
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Tutorial sobre Jornal na Wiki"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","Editar jornal"]
	});
}

//============================================================================
//Contracts List
//============================================================================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Contratos");
	
	tmp = allElements.children[2].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Modelos");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Contratos propostos (20 últimos)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"oferecido para");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sem contratos");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","Contratos aceitos (20 últimos)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"oferecido para");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sem contratos");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Contratos rejeitados");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Rejeitado por $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sem contratos");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","contratos retidos");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sem contratos");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Seus empréstimos ativos");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","Devedor");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Restituição de vencimento");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Quantia");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Cancelar dívida");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","Ainda não está pronto");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Suas dívidas ");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","Credor");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Restituição de vencimento");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Quantia");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Pagar dívida");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","Nenhuma dívida");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","Nome do modelo:");
	
//	allElements = document.getElementById('command');
//	tmp = allElements.parentNode.children[0];
//	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"????");
//	tmp = allElements.children[1];
//	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"????:");
//	tmp = allElements.children[6];
//	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"??:");
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/index.php/Contracts":["Contract tutorial","Tutorial de contrato"],
		"#":["Create new template","Criar novo modelo"]
	});
	replaceInputByValue({
		"Delete":["Delete","Apagar"],
		"Create template":["Create template","Criar modelo"]
	});
	
//	objs = getElements(document, "//input[@value='Delete']");
//	for (var i = 0; i < objs.snapshotLength; i++) {
//		obj = objs.snapshotItem(i);
////		obj.value = obj.value.replace("Delete", "??");
//		if(i==0){alert(obj.getAttributeNS("contracts.html","getAttributeNS"));}
//	}
}

//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/(>[\w ]* )obligations:</,"$1 obrigação(ões):<");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations:/,"Obrigações padrões do cidadão:")
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/g,"Cidadão padrão");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/(>[\w ]* )obligations:</,"$1 obrigação(ões):<")
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products:/," fornece diretamente os seguintes produtos:");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money:/," fornece diretamente a seguinte quantidade de dinheiro:");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt:/," será responsável pela dívida a seguir :");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"deve ser pago antes do $1$3$5º dia de jogo ($6 dia(s) após a assinatura do contrato) para"
	);
}

function replaceOptionTxt(objs, replacements) {
	for (i = 0; i < objs.children.length; i++) {
		obj = objs.children[i];
		for (k in replacements) {
			if (obj.innerHTML.match(k)) {
				obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
			}
		}
	}
}

function doContract() {
	allElements = document.getElementById('contentRow').children[1];
	//head
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Contratos");
	allElements = allElements.children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"Contrato");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"Estado do contrato: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"Aceito");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"Rejeitado por $1 ");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"Fracassado");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"Modelo");

	
	//list
	allElements = allElements.children[8].children[0].children[0];
	tmp = allElements;
	replaceContractComm(tmp.children[0],1);
	allElements.innerHTML.match("Dummy citizen") ? isDummy=true : isDummy=false;
	replaceContractComm(tmp.children[2],isDummy?2:3);
	
	if (isDummy) {
		//add
		allElements = document.getElementById('contentRow').children[1].children[3];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"Adicionado um novo elemento ao contrato");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"Lado");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"Tipo de item");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Cidadão padrão");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","Dinheiro"],
			"Product":["Product","Produtos"],
			"Debt":["Debt","Dívida"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Dinheiro em ( ");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"Quantidade de produtos:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"Tipo de produto:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Qualidade do produto:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","Ferro"],
			"Grain":["Grain","Grãos"],
			"Oil":["Oil","Óleo"],
			"Stone":["Stone","Pedra"],
			"Wood":["Wood","Madeira"],
			"Diamonds":["Diamonds","Diamantes"],
			"Weapon":["Weapon","Arma"],
			"House":["House","Casa"],
			"Gift":["Gift","Presente"],
			"Food":["Food","Comida"],
			"Ticket":["Ticket","Ticket"],
			"Defense System":["Defense System","Sistema de defesa"],
			"Hospital":["Hospital","Hospital"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"Dívida");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Dinheiro em ( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"Restituição de vencimento:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Qualidade do produto:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"Propor contrato");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Propor paraà");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"Nota:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"você pode oferecer contratos que seu amigo");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","Cidadão padrão"],
		"contracts.html":["Go back to contract list","Voltar à lista de contratos"]
	});
	replaceInputByValue({
		"Delete":["Delete","Apagar"],
		"Propose":["Propose","Oferecer"],
		"Add item":["Add item","Adicionar item"]
	});
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
} else if (isTargetHtml("/jobMarket.html")) {
	doJobMarket();
} else if (isTargetHtml("/work.html")) {
	doWork();
} else if (isTargetHtml("/productMarket.html")) {
	doProductMarkets();
} else if (isTargetHtml("/train.html")) {
	doTrain();
} else if (isTargetHtml("/battles.html")) {
	doBattlesList();
} else if (isTargetHtml("/battle.html")) {
	doBattle();
} else if (isTargetHtml("/battleStatistics.html")) {
	doBattleStatistics();
} else if (isTargetHtml("/profile.html")) {
	doProfile();
} else if (isTargetHtml("/editCitizen.html")) {
	doEditCitizen();
} else if (isTargetHtml("/travel.html")) {
	doTravel();
} else if (isTargetHtml("/inboxMessages.html")) {
	doInboxMessages();
} else if (isTargetHtml("/sentMessages.html")) {
	doSentMessages();
} else if (isTargetHtml("/composeMessage.html")) {
	doComposeMessage();
} else if (isTargetHtml("/notifications.html")) {
	doNotifications();
} else if (isTargetHtml("/subs.html")) {
	doSubs();
} else if (isTargetHtml("/subscribedNewspapers.html")) {
	doSubscribedNewspapers();
} else if (isTargetHtml("/newspaper.html")) {
	doNewspaper();
} else if (isTargetHtml("/editNewspaper.html")) {
	doNewspaperEdit();
} else if (isTargetHtml("/article.html")) {
	doArticle();
} else if (isTargetHtml("/editArticle.html")) {
	doArticleEdit();
} else if (isTargetHtml("/contracts.html")) {
	doContractsList();
} else if (isTargetHtml("/contract.html")) {
	doContract();
}



//alert(navigator.userAgent.toLowerCase());
//if (!navigator.userAgent.toLowerCase().match("firefox")){alert(navigator.userAgent);}
//else{alert(navigator.userAgent);}
//obj="resource11"
//alert(obj.substring(8,obj.length));