// ==UserScript==
// @name			e-Sim teste PT-BR
// @namespace		
// @description		Este script traduz o jogo de browser e-Sim para Português do Brasil em versão de tetes.
// @include			http://e-sim.org*
// @version			1.3
// ==/UserScript==

menuLinkReplacements = {
	"work.html"				:["Work","Trabalhar"],
	"train.html"			:["Train","Treinar"],
	"companies.html"		:["Companies","Empresas"],
	"newspaper.html"		:["Newspaper","Jornal"],
	"myParty.html"			:["Party","Partido"],
	"contracts.html"		:["Contracts","Contratos"],
	"inviteFriends.html"	:["Invite friends","Convidar amigos"],
	"myMilitaryUnit.html"	:["Military unit","Unidade Militar"],
	"subscription.html"     :["Premium account","Conta Premium"],
	
	"productMarket.html"	:["Product market","Mercado"],
	"jobMarket.html"		:["Job market","Mercado de Emp."],
	"monetaryMarket.html"	:["Monetary market","Mercado Monetário"],
	"companiesForSale.html"	:["Companies for sale","Venda de Emp."],
	
	"countryStatistics.html"		:["Country statistics","Est. do País"],
	"partyStatistics.html"			:["Party statistics","Est. do Partido"],
	"newspaperStatistics.html"		:["Newspaper statistics","Est. do Jornal"],
	"citizenStatistics.html"		:["Citizen statistics","Est. do Cidadão"],
	"militaryUnitStatistics.html"	:["Military unit stats","Est. da Un. Militar"],
	"donations.html"		:["Donations","Doações"],
	"fundRaising.html?id=2"		:["New modules","Novos módulos"],

	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Melhores artigos"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Últimos artigos"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Eventos militares"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Eventos políticos"],
	
	"battles.html"							:["Battles","Guerras"],
	"countryPoliticalStatistics.html"		:["War and politics","Guerras e política"],
	"countryEconomyStatistics.html"			:["Economy","Economia"],
	"countryLaws.html"						:["Laws","Leis"],
	"partyElections.html"					:["Party elections","Eleições partidárias"],
	"congressElections.html"				:["Congress elections","Eleições congressistas"],
	"presidentalElections.html"				:["Presidential elections","Eleições presidenciais"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Cidadania"],
	"googleMap.html"						:["Map","Mapa"]
};


menuTextReplacements = {
	"myPlacesButton":["My places","Meus Lugares"],
	"marketButton":["Market","Mercado"],
	"statisticsButton":["Statistics","Estatísticas"],
	"newsButton":["News","Notícias"],
	"electionsButton":["Country","País"]
};


sideLink1Replacements = {
	"crossIcon"	:["Logout","Sair"],
	"workIcon"	:["Work","Trabalhar"],
	"fightIcon"	:["Fight","Lutar"],
	"avatarIcon":["Upload avatar","Enviar avatar"],
	"voteIcon"	:["Vote","Votar"]
};

sideLink2Replacements = {
	"travel.html"	:["Travel","Viajar"],
	"pendingCitizenshipApplications.html"	:["change","Mudar"],
	"http://wiki.e-sim.org/index.php/Health"	:["Health tutorial","Mais sobre Saúde"]
};

sideLink3Replacements = {
	"eatLink"	:["Eat food","Comer"],
	"useGiftLink":["Use gifts","Usar Pres."]
};

sideLink4Replacements = {
	"eatButton":["Eat Food","Comer"],
	"useGiftButton":["Use gift","Usar Pres."] 
};


hpTitleReplacements = {
	"News":["News","Noticias"],
	"Shouts":["Shouts","Gritos"],
	"Battles":["Battles","Batallas"],
	"Events":["Events","Eventos"]
};


hpTabsReplacements = {
	"#topArticles":["Global","Global"],
	"#latestArticles":["Latest","Últimos"],
	"#localArticles":["Local","Local"],
	
	"#countryShouts":["Country","País"],
	"#friendsShouts":["Military unit","Unidade Militar"],
	"#myShouts":["Friends","Amigos"],
	
	"#localBattles":["Country","País"],
	"#substidedBattles":["Subsidized","Patrocinado"],
	"#hotBattles":["Important","Importante"],

	"#localEvents":["Military","Militar"],
	"#globalEvents":["Military","Militar"],
	"#politicalEvents":["Political","Política"]
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

MonetaryMarketRemplacement = {
	"http://wiki.e-sim.org/index.php/MonetaryMarket"	:["Monetary market tutorial","Mais sobre Mercado Monetário"]
};




//---------------------------------------------------
//FireFox
//---------------------------------------------------
var isFF = navigator.userAgent.toLowerCase().match("firefox") ? true : false;


function getElements(obj, k) {
	return document.evaluate(k, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

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

function replaceInnerHTML2(replacements) {
	var obj;
	for (k in replacements) {
		obj = document.getElementById(k);
		obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
	}
}

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


function replaceSpanByClass(replacements) {
	replaceCommon(document, replacements, "//span[@class='", "']");
}


function replaceLinkByHref(replacements) {
	replaceCommon(document, replacements, "//a[@href='", "']");
}

function replaceLinkSSS(replacements) {
	replaceCommonSSS(document, "" ,replacements, "//a[@href", "]");
}

function replaceLinkByHrefSSS(kk, replacements) {
	replaceCommonSSS(document, kk, replacements, "//a[@href='", "']");
}

function replaceLinkByStyleSSS(kk, replacements) {
	replaceCommonSSS(document, kk, replacements, "//a[@style='", "']");
}


function replaceLinkByID(replacements) {
	replaceCommon(document, replacements, "//a[@id='", "']");
}


function replaceInputByID(replacements) {
	var obj;
	for (k in replacements) {
		obj = document.getElementById(k);
		obj.value = obj.value.replace(replacements[k][0], replacements[k][1]);
	}
}

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


function replaceInputByClassSSS(kk, replacements) {
	results = getElements(document, "//input[@class='" + kk + "']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		for (k in replacements) {
			if (obj.value.match(k)) {
				obj.value = obj.value.replace(replacements[k][0], replacements[k][1]);
			}
		}
	}
}

function replaceAlliesLinkComm(k) {
	var results;
	var obj;
	results = getElements(document, "//a[@class='" + k + "']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 aliados");
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
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"sem aliados");
	}
}


function replaceAlliesLinksss() {
	results = getElements(document, "//div[@class='battleDiv']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp=results.snapshotItem(i).children[0];
		replaceNoAlliesComm(tmp);
		tmp=results.snapshotItem(i).children[2];
		replaceNoAlliesComm(tmp);

		tmp=results.snapshotItem(i).children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Guerra de resistência");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Patrocínio:");
	}
}

function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"Sem aliados");
	//12 allies
	if (obj.innerHTML.match("1 ally")) {
	    obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"1 aliado");
    } else {
        obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 aliado(s)");
    }
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"Guerra de resistência");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Patrocínio:");
}

//Test, other ways possible
function replaceBattleTime(obj) {
    if (obj.innerHTML.match(/[\d\.]+/g)== 1) {
        if (obj.innerHTML.match("second ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"segundos atrás");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"minutos atrás");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"horas atrás");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"días atrás");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"meses atrás");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"$1 segundos atrás");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"$1 minutos atrás");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"$1 horas atrás");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"$1 dias atrás");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"$1 meses atrás");
        }
    }
}
//---------------------------------------------------
//Top, Latest, Local Art
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"À 1 segundo");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"À 1 minuto");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"À 1 hora");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"À 1 dia");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"À 1 mês");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"$2 segundos atrás");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"$2 minutos atrás");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"$2 horas atrás");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"$2 dias atrás");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"$2 meses atrás");
    }   
}

//---------------------------------------------------
//Subs 
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"segundo atrás");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"minuto atrás");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"hora atrás");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"dia atrás");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"meses atrás");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"$2 segundos atrás");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"$2 minutos atrás");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"$2 horas atrás");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"$2 dias atrás");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"$2 meses atrás");
    }
    
}


//---------------------------------------------------
//  battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"Recente");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"defensores:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"atacantes:");
	results = getElements(document, "//div[@style]");
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"Estatísticas da rodada atual");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"Dano total dos defensores:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"Dano total dos atacantes:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Seu dano:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"Melhores países defensores:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"Melhores países atacantes:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"Melhores unidades militares defensoras:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"Melhores unidades militares atacantes:");
	obj.innerHTML=obj.innerHTML.replace(/(Rounds won by attacker)/,"Rodadas ganhas pelos atacantes");	
	obj.innerHTML=obj.innerHTML.replace(/(Rounds won by defender)/,"Rodadas ganhas pelos defensores");
	}
}

//---------------------------------------------------
//  Shouts
//---------------------------------------------------

//OK
function doShoutsComm() {
	results = getElements(document, "//b[@style='color: #222']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match(/[\d\.]+/g)== 1) {		
		    if (obj.innerHTML.match("second")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"À 1 segundo");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"À 1 minuto");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"À 1 hora");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"À 1 dia");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"À 1 mês");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"À $2 segundos");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"À $2 minutos");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"À $2 horas");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"À $2 dias");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"À $2 meses");
                } 
        }
    }
}
	    
replaceLinkByHrefSSS("#", {
    "Report":["Report","Reportar"],
    "Delete":["Delete","Apagar"],
    "Edit":["Edit","Editar"],
    "More shouts":["More shouts","Mais anúncios"]
});
	
	
replaceInputByValue({
    "Report":["Report","Reportar"],
    "Delete":["Delete","Apagar],
    "Edit":["Edit","Editar"]
});	
	

//==============================================
//Menu
//==============================================
function doMenu() {
	replaceLinkByHref(menuLinkReplacements);
	replaceInnerHTML2(menuTextReplacements);
	allElements = document.getElementById('headerRow').children[2].children[0].children[0].children[1].children[1].children[3];
    allElements.innerHTML=allElements.innerHTML.replace(/day/,"dia");
}

//=============================================
//Side
//=============================================
function doSide() {
	var allElements;
	var tmp;
	
	allElements = document.getElementById('userMenu').children[0];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"Nível: ");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"Rank:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Prox. rank:");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Nível Econômico:");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"Força:");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"Localização:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"Nacionalidade:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"Lim. de comi.:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"Lim. de pres.:");


	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Seu dinheiro");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Seu inventário");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Mensagens");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"Suas tarefas de hoje:");
	
	
	replaceLinkByHref(sideLink2Replacements);
	
	replaceLinkByID(sideLink3Replacements);
	
	replaceInputByID(sideLink4Replacements);
	
	replaceSpanByClass(sideLink1Replacements);
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Any")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any)/,"Qualquer");
		}
		else if (obj.innerHTML.match("Poland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Poland)/,"Polônia");
		}
		else if (obj.innerHTML.match("Indonesia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Indonesia)/,"Indonésia");
		}
		else if (obj.innerHTML.match("Lithuania")) {
			obj.innerHTML=obj.innerHTML.replace(/(Lithuania)/,"Lituânia");
		}
		else if (obj.innerHTML.match("Serbia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Serbia)/,"Sérvia");
		}
		else if (obj.innerHTML.match("Bulgaria")) {
			obj.innerHTML=obj.innerHTML.replace(/(Bulgaria)/,"Bulgária");
		}
		else if (obj.innerHTML.match("Israel")) {
			obj.innerHTML=obj.innerHTML.replace(/(Israel)/,"Israel");
		}
		else if (obj.innerHTML.match("Russia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Russia)/,"Rússia");
		}
		else if (obj.innerHTML.match("Slovenia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Slovenia)/,"Eslovênia");
		}
		else if (obj.innerHTML.match("Turkey")) {
			obj.innerHTML=obj.innerHTML.replace(/(Turkey)/,"Turquia");
		}
		else if (obj.innerHTML.match("Greece")) {
			obj.innerHTML=obj.innerHTML.replace(/(Greece)/,"Grécia");
		}
		else if (obj.innerHTML.match("Italy")) {
			obj.innerHTML=obj.innerHTML.replace(/(Italy)/,"Itália");
		}
		else if (obj.innerHTML.match("China")) {
			obj.innerHTML=obj.innerHTML.replace(/(China)/,"China");
		}
		else if (obj.innerHTML.match("Romania")) {
			obj.innerHTML=obj.innerHTML.replace(/(Romania)/,"Romênia");
		}
		else if (obj.innerHTML.match("Hungary")) {
			obj.innerHTML=obj.innerHTML.replace(/(Hungary)/,"Hungria");
		}
		else if (obj.innerHTML.match("Republic of Macedonia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Republic of Macedonia)/,"Macedônia");
		}
		else if (obj.innerHTML.match("Croatia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Croatia)/,"Croácia");
		}
		else if (obj.innerHTML.match("France")) {
			obj.innerHTML=obj.innerHTML.replace(/(France)/,"França");
		}
		else if (obj.innerHTML.match("Sweden")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sweden)/,"Suécia");
		}
		else if (obj.innerHTML.match("Ukraine")) {
			obj.innerHTML=obj.innerHTML.replace(/(Ukraine)/,"Ucrânia");
		}
		else if (obj.innerHTML.match("Latvia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Latvia)/,"Letônia");
		}
		else if (obj.innerHTML.match("Spain")) {
			obj.innerHTML=obj.innerHTML.replace(/(Spain)/,"Espanha");
		}
		else if (obj.innerHTML.match("Brazil")) {
			obj.innerHTML=obj.innerHTML.replace(/(Brazil)/,"Brasil");
		}
		else if (obj.innerHTML.match("USA")) {
			obj.innerHTML=obj.innerHTML.replace(/(USA)/,"Estados Unidos da América");
		}
		else if (obj.innerHTML.match("United Kingdom")) {
			obj.innerHTML=obj.innerHTML.replace(/(United Kingdom)/,"Inglaterra");
		}
		else if (obj.innerHTML.match("Portugal")) {
			obj.innerHTML=obj.innerHTML.replace(/(Portugal)/,"Portugal");
		}
		else if (obj.innerHTML.match("Argentina")) {
			obj.innerHTML=obj.innerHTML.replace(/(Argentina)/,"Argentina");
		}
		else if (obj.innerHTML.match("India")) {
			obj.innerHTML=obj.innerHTML.replace(/(India)/,"Índia");
		}
		else if (obj.innerHTML.match("Netherlands")) {
			obj.innerHTML=obj.innerHTML.replace(/(Netherlands)/,"Holanda");
		}
		else if (obj.innerHTML.match("Bosnia and Herzegovina")) {
			obj.innerHTML=obj.innerHTML.replace(/(Bosnia and Herzegovina)/,"Bósnia e Herzegovina");
		}
		else if (obj.innerHTML.match("Iran")) {
			obj.innerHTML=obj.innerHTML.replace(/(Iran)/,"Irã");
		}
		else if (obj.innerHTML.match("Finland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Finland)/,"Finlândia");
		}
		else if (obj.innerHTML.match("Germany")) {
			obj.innerHTML=obj.innerHTML.replace(/(Germany)/,"Alemanha");
		}
		else if (obj.innerHTML.match("Mexico")) {
			obj.innerHTML=obj.innerHTML.replace(/(Mexico)/,"México");
		}
		else if (obj.innerHTML.match("Canada")) {
			obj.innerHTML=obj.innerHTML.replace(/(Canada)/,"Canadá");
		}
		else if (obj.innerHTML.match("Taiwan")) {
			obj.innerHTML=obj.innerHTML.replace(/(Taiwan)/,"Taiwan");
		}
		else if (obj.innerHTML.match("Ireland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Ireland)/,"Irlanda");
		}
		else if (obj.innerHTML.match("Australia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Australia)/,"Austrália");
		}
		else if (obj.innerHTML.match("South Korea")) {
			obj.innerHTML=obj.innerHTML.replace(/(South Korea)/,"Coréia do Sul");
		}
		else if (obj.innerHTML.match("Switzerland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Switzerland)/,"Suiça");
		}
		else if (obj.innerHTML.match("All countries")) {
			obj.innerHTML=obj.innerHTML.replace(/(All countries)/,"Todos países");
		}
		else if (obj.innerHTML.match("Select product...")) {
			obj.innerHTML=obj.innerHTML.replace(/(Select product...)/,"Escolher produto...");
		}
		else if (obj.innerHTML.match("Iron")) {
			obj.innerHTML=obj.innerHTML.replace(/(Iron)/,"Ferro");
		}
		else if (obj.innerHTML.match("Grain")) {
			obj.innerHTML=obj.innerHTML.replace(/(Grain)/,"Grãos");
		}
		else if (obj.innerHTML.match("Oil")) {
			obj.innerHTML=obj.innerHTML.replace(/(Oil)/,"Óleo");
		}
		else if (obj.innerHTML.match("Stone")) {
			obj.innerHTML=obj.innerHTML.replace(/(Stone)/,"Pedra");
		}
		else if (obj.innerHTML.match("Madera")) {
			obj.innerHTML=obj.innerHTML.replace(/(Wood)/,"Madeira");
		}
		else if (obj.innerHTML.match("Diamonds")) {
			obj.innerHTML=obj.innerHTML.replace(/(Diamonds)/,"Diamante");
		}
		else if (obj.innerHTML.match("Weapon")) {
			obj.innerHTML=obj.innerHTML.replace(/(Weapon)/,"Armas");
		}
		else if (obj.innerHTML.match("House")) {
			obj.innerHTML=obj.innerHTML.replace(/(House)/,"Casa");
		}
		else if (obj.innerHTML.match("Gift")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift)/,"Presentes");
		}
		else if (obj.innerHTML.match("Food")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food)/,"Comida");
		}
		else if (obj.innerHTML.match("Ticket")) {
			obj.innerHTML=obj.innerHTML.replace(/(Ticket)/,"Passagens");
		}
		else if (obj.innerHTML.match("Defense System")) {
			obj.innerHTML=obj.innerHTML.replace(/(Defense System)/,"Sistema de defesa");
		}
		else if (obj.innerHTML.match("Hospital")) {
			obj.innerHTML=obj.innerHTML.replace(/(Hospital)/,"Hospital");
		}
		else if (obj.innerHTML.match("All parties")) {
			obj.innerHTML=obj.innerHTML.replace(/(All parties)/,"Todos os partidos");
		}
		else if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"Rodada atual");
		} else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"$2ª Rodada ");
		} else if (obj.innerHTML.match("Food ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Tipo de Comida");
		} else if (obj.innerHTML.match("Gift ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Tipo de Presente");
		} else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"Sem Arma");
		} else if (obj.innerHTML.match("Any quality")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"Qualquer qualidade");
		}
	}
}

//==============================
//Homepage
//==============================
function doHP() {
	//hp title
	replaceInnerHTML(getElements(document, "//div[@class='rightTabGrey']"), hpTitleReplacements);
	
	//index tabs
	replaceLinkByHref(hpTabsReplacements);
	
	//Articles content
	for (kk in hpContentArticlesReplacements) {
		allElements = document.getElementById(kk);
		replacNewspaperTimeWithAuthor(allElements);
	}

	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	
	replaceLinkSSS({
		"Show more battles":["Show more battles","Mais Guerras"],
		"Subsidies informations":["Subsidies informations","Informação dos patrocinadores"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"Guerras sem patrocínio");
        }	
    }
	
	
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/," Ordens da sua unidade militar:");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Lutar por:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"minuto atrás");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"hora atrás");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"dia atrás");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"mês atrás");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"$1 minutos atrás");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"$1 horas atrás");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"$1 dias atrás");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"$1 meses atrás");
        }
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z- ]*)( in the battle versus )/g,"$2 na batalha contra ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"$2 começou uma resistência em $5 $4");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"foi atacado(a) por $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"propôs uma guerra contra $5$6 ");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," declarou guerra à $2$3 ");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," na batalha contra ");
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/g," tem um novo presidente");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","Mostrar mais eventos"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Mostrar mais eventos");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"escrever novo anúncio:");
	//
	allDivs = getElements(allElements, "//input[@value='Anunciar!']");
	allDivs.snapshotItem(0).value="valor!";
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Enviar para:");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Enviar para:");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," País $2  Unidade Militar $4 Amigos");

	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Mais anúncios"] });
}

//=====================
//Job Market
//=====================
function doJobMarket() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Mercado de Emprego");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Escolher critério:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"País:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Nível Econômico:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Empresário");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Empresa");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produto");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Nível Militar");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Salário");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Aplicar");
	
	replaceInputByValue({"Apply":["Apply","Aplicar"],"Show":["Show","Mostrar"]});
}

//===============
//Work
//===============
function doWork() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"Trabalhar");
	
	if (allElements.innerHTML.match(/You have no job^\./)) {
		xxx = document.getElementById('command').parentNode.children[0];
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"Você não tem emprego");
		replaceInputByValue({"Get a job now!":["Get a job now!","Procurar emprego!"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/," Você precisa estar estar no país da empresa para trabalhar ");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Local de trabalho");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Patrão");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Salário:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Abandonar emprego");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"Você não trabalhou hoje");
			replaceInputByValue({"Work now":["Work now","Trabalhar agora"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Resultado do trabalho de hoje");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Salário bruto");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Salario líquido");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Impostos pagos");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Trabalhou em");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"XP ganho");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Nível econômico");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/," Dias trabalhados seguidos ");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Base de produtividade");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Bônus de produtividade");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Total produzido");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Unidades produzidas");
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Qualidade empresarial bruta");
		}
	}
}


//====================
//Product Markets
//====================
function doProductMarkets() {
	rr = {
		"1":["Any","Qualquer"],
		"2":["Iron","Ferro"],
		"3":["Grain","Grãos"],
		"4":["Oil","Óleo"],
		"5":["Stone","Pedra"],
		"6":["Wood","Madeira"],
		"7":["Diam.","Diam."],
		"8":["Weap.","Armas"],
		"9":["House","Casas"],
		"10":["Gift","Pres."],
		"11":["Food","Comida"],
		"12":["Ticket","Passag."],
		"13":["DS","Sis. Def."],
		"14":["Hosp.","Hospital"]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"Mercado");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Ofertas:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","País:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Qualidade:");
	
	replaceInputByValue({"View offers":["View offers","Ver ofertas"],"Buy":["Buy","Comprar"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Minhas ofertas/ Nova oferta"]});
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produto");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Vendedor");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"Disponível");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Preço");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Comprar");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g,"itens"); 
// check	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Minhas ofertas/Nova oferta"],
		"http://wiki.e-sim.org/index.php/Category:Products":["Products info","Informação sobre Produtos"]
	});
}

//==============
//Train
//==============
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
		replaceInputByValue({"Train":["Train","Treinar"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Treinamento completo, volte amanhã");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Você já treinou hoje");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Você já treinou hoje. Por favor volte amnhã.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Aumento de força:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Detales militares");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Total de sessões de treinamentos:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Força:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Rango:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Total de dano realizado:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Dano sem armas::");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Dano com armas Q1:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/," Dano com armas Q2:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/," Dano com armas Q3:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/," Dano com armas Q4:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/," Dano com armas Q5:");
	
}

//=================
//Battles List 
//=================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Guerras");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"Classificação:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Somente guerras patrocinadas:");
	
	replaceInputByValue({"Show battles":["Show battles","Mostrar guerras"]});

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Sorting by start time")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sorting by start time)/,"Organizar por começo da guerra");
		} else if (obj.innerHTML.match("Sorting by subsidy size")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sorting by subsidy size)/,"Organizar por tamanho do patrocinio");
		} else if (obj.innerHTML.match("Sorting by total damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sorting by total damage)/,"Organizar por dano total");
		}
		}
	
    tmp = allElements.children[4].children[0].children[0];
    var loopz = tmp.children.length;
    for (i = 1; i < loopz; i++) {
        obj = tmp.children[i].children[3];
        replaceBattleTime(obj);
    }
	
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Començo da guerra");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Batalla");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"defensor contra atacante");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Puntuación");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Dano total realizado");
	
	

	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();

}

//==============
//Battle 
//==============
function doBattle() {
	allElements = document.getElementById('battleBar').parentNode;
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Guerra de Resistência");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"começada por");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"$2ª rodada");

	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	// Top3
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"Top Defensores");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"Top Atacantes");
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/," Você não pode lutar nesta guerra do seu local atual.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/," Você tem que viajar para o país ocupante para participar da guerra");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/," Você não pode lutar nesta guerra do seu local atual.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/," Você tem que viajar para um dos países participantes da guerra");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"Esta rodada foi ganha por:");
	} else {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Escolher arma:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Escolher lado:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"Você está lutando por:");
	}
	
	
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"Mostrar rodada:");
	}
	replaceInputByValue({"Show round":["Show round","Mostrar rodada"]});
	replaceInputByValue({"Fight (1 hit)":["Fight (1 hit)","Lutar (1 golpe)"]});
	replaceInputByValue({"Berserk! (5 hits)":["Berserk! (5 hits)","Fúria! (5 golpes)"]});
	
tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Mostrar as estatísticas gerais da guerra");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show military units supporting this battle)/,"Mostrar as unidades militares que apoiam esta guerra");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Mais sobre Guerras");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Regras da guerra");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buildings active during this round)/,"Edifícios ativos durante esta rodada");
	
	}
	
//=========================
//Battle Statistics 
//=========================
function doBattleStatistics() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	replaceBattleInfo(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"començada por");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"$2ª rodada");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Rodadas ganhas pelo defensor");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Rodadas ganhas pelo atacante");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Voltar para a guerra");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"Estatísticas geradas uma vez cada 30 minutos");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle statistics/,"Estatísticas da guerra");
}

//=======================
//Battle MU Statistics 
//=======================
function doBattleMUStatistics() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	replaceBattleInfo(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"començada por");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"$2ª rodada");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Rodadas ganhas pelo defensor");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Rodadas ganhas pelo atacante");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Voltar para a guerra");

	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Supporting military units/,"Apoio das unidades militares");
	tmp.innerHTML=tmp.innerHTML.replace(/(Defender's supporters)/,"Apoiantes do defensor");
	tmp.innerHTML=tmp.innerHTML.replace(/(Attacker's supporters)/,"Apoiantes do atacante");
}


//=============
//Profile
//=============
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /,"Cidadão");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"On-line");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"Off-line");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Editar Perfil"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","Mudar Nombre"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","Multi Reportada"]
	});
	replaceInputByValue({"Report multi":["Report multi","Multi Reportada"]});

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match("Permanently")) {
		rowoffset = 2;
		tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"Banido permanentemente");
		tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"Razão:");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Banido por:");
	}
	

	tmp = allElements.children[0].children[2+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Nível:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Dano");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"Rank:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Nível Econôm.:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"Força:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Localização:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Nacionalidade:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"Aniversário:");
	
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by XP:/,"Ranking nacional por XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by damage:/,"Ranking nacional por dano:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by XP:/," Ranking mundial por XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by damage:/,"Ranking mundial por dano:");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Unidade Militar:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Partido:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Jornal:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"Trabalha em:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"Empresas adquiridas");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Cargo político:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Sem unidade militar");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Sem partido");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Sem jornal");
	tmp.innerHTML=tmp.innerHTML.replace(/No work/,"Sem trabalho");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"Sem empresas");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"Sem mercadorias");
	
	allElements = getElements(document, "//ul[@style]");
	
	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
		tmp = allElements.snapshotItem(0).parentNode;
		if (tmp.innerHTML.match("Active debts")) {
			rowoffset = 2;
			tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"Dívida ativas");
			tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g,"dia de pagamento ");
			tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( game day)/g," $1ª dia do e-Sim");
		}
	}
	
	allElements = document.getElementById('medals');
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"Amigos");
	
	doShoutsComm();
	
}


//===================
//Edit Citizen
//===================
function doEditCitizen() {
	allElements = document.getElementById('editCitizenForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Mail:/,"E-mail:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Nova senha:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Repetir nova senha:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"Senha antiga:");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Novo avatar:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","Tamanho máximo:");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Cidadão");
	replaceInputByValue({"Edit citizen":["Edit citizen","Editar cidadão"]});
}

//=============
//Travel
//=============
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"Viajar");
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"País");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"Região:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"Qualidade da passagem:");
	
	replaceInputByValue({"Travel":["Travel","Viajar"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/index.php/Traveling":["Traveling tutorial on wiki","Mais sobre Viagens"]
	});
}


//==================
//Inbox Messages
//==================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"Mensagens recibidas: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"Mensagens enviadas: ");
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
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","Mensagens enviadas"],
		"composeMessage.html":["Compose message","Escrever mensagem"]
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
		"conversation.html":["Previous messages","Mensagens anteriores"]
	});
	
}

//=================
//Sent Messages
//=================
function doSentMessages() {
	doMessagesComm();
	replaceLinkByHref({
		"inboxMessages.html":[" inbox Messages ","Caixa de Entrada"],
		"composeMessage.html":["Compose Message","Escrever Mensagem"]
	});
}

//===================
//Compose Message
//===================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Nova Mensagem");

	replaceLinkByHref({
		"inboxMessages.html":[" inbox Messages ","Caixa de Entrada"],
		"composeMessage.html":["Compose Message","Escrever Mensagem"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Para:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Assunto:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mensagem:");
	
	replaceInputByValue({
		"Send":["Send","Enviar"],
		"Preview":["Preview","Pré-visualizar"]
	});
}


//=================
//Subscriptions
//=================
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
		"subscribedNewspapers.html":["List of subscribed newspapers","Lista de jornais assinados"]
	});
}

//==========================
//Subscribed Newspapers
//==========================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Jornais assinados");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Total de assinaturas");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Jornal");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"Ass./Data");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Mais sobre Jornais"]
	});
}

//===============
//Newspaper
//===============
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
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Mais sobre Jornais"]
	});
	replaceInputByValue({
		"Publish":["Publish","Publicar"],
		"Preview":["Preview","Pré-visualizar"]
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
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"Por favor, salva uma cópia do artigo antes de envia-lo");
	}
}

//===================
//Edit Newspaper
//===================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Nome do jornal:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Novo avatar:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","Tamanho máx.:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Editar jornal"]
	});
	replaceInputByValue({
		"Delete":["Edit newspaper","Editar jornal"]
	});
}

//===============
//Article
//===============
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
		"Edit":["Edit","Editar"],
		"Delete":["Delete","Apagar"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Novo comentário");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mensagem:");
}

//=================
//Edit Article
//=================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Jornal");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Editar artigo");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Título do artigo:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mensagem:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Editar jornal"],
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Mais sobre Jornais"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","Editar artigo"]
	});
}

//=================
//Contracts List
//=================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Contratos");
	
	tmp = allElements.children[2].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Temas");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Contratos propostos (últimos 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"Ofecido para");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sem contratos");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)"," Contratos aceitos (últimos 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"Ofecido para");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sem contratos");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Contratos rejeitados");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Rejeitado por $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sem contratos");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","Contratos com falha");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sem contratos");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Seus empréstimos ativos");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","Devedor");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Cancelamento");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Soma");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Cancelar dívida");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","Sem empréstimos");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Dívidas ativas");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","Emprestado por");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Cancelamento");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Soma");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Pagar dívida");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","Sem dívidas");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","Nome do tema:");
	

	
	replaceLinkByHref({
		"http://wiki.e-sim.org/index.php/Contracts":["Contract tutorial","Mais sobre Contratos"],
		"#":["Create new template","Criar novo tema"]
	});
	replaceInputByValue({
		"Delete":["Delete","Apagar"],
		"Create template":["Create template","Criar tema"]
	});
	
}

//=================
//Contract detail
//=================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"$1 obrigações");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"Obrigações do cidadão");
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/,"Ciudadão");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"$1 obrigações");
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," os seguintes produtos serão doados imediatamente");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," a seguinte soma de dinheiro será doada imediatamente");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt/," será cobrada a seguinte dívida");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"deve pagar $1$3$5 por dia ($6 dias após a assinatura do contrato "
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
//==================
// Contract Single
//==================
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
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"Falhido");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"Tema");
	
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"Adicionar novo elemento para o contrato");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"Secundário");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"Tipo de item");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Cidadão");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","Dinheiro"],
			"Product":["Product","Produto"],
			"Debt":["Debt","Dívida"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Dinheiro ( ");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"Quantidade de produtos.:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"Tipo de produtos:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Qualidade do produto:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","Ferro"],
			"Grain":["Grain","Grãos"],
			"Oil":["Oil","Óleo"],
			"Stone":["Stone","Pedra"],
			"Wood":["Wood","Madeira"],
			"Diamonds":["Diamonds","Diamante"],
			"Weapon":["Weapon","Armas"],
			"House":["House","Casa"],
			"Gift":["Gift","Presentes"],
			"Food":["Food","Comida"],
			"Ticket":["Ticket","Passagem"],
			"Defense System":["Defense System","Sistema de defesa"],
			"Hospital":["Hospital","Hospital"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"Dívida");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Dinheiro ( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"Dia para pagar:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Qualidade:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"Proposta de contrato");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Proposto para");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"Nota:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"contratos só podem ser propostos aos amigos");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","Cidadão"],
		"contracts.html":["Go back to contract list","Voltar para lista de contratos"]
	});
	replaceInputByValue({
		"Delete":["Delete","Apagar"],
		"Propose":["Propose","Propor"],
		"Add item":["Add item","Adicionar item"]
	});
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1);
	if (check.innerHTML.match("Cancel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"Cancelar proposta");
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","Cancelar proposição"]});
	    }   
}
//====================
// Monetary market
//====================
function doMonetaryMarket() {
    var results;
    var allElements;
    results = getElements(document, "//TD[@width='410']");
    allElements = results.snapshotItem(0).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary Market/,"Mercado monetário");
    
    allElements = results.snapshotItem(0).children[2];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Current offers/,"Ofertas atuais");
    
    allElements = results.snapshotItem(0).children[4];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Show Offers/,"Mostrar ofertas");
    
    allElements = results.snapshotItem(0).children[4];
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Trocar moedas");
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Comprar moeda");
    tmp.innerHTML = tmp.innerHTML.replace(/Sell currency/,"Vender moeda");
    tmp.innerHTML = tmp.innerHTML.replace(/View offers/,"Ver ofertas");
    
    allElements = results.snapshotItem(0).children[7];
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary market tutorial/,"Tutorial do  Mercado Monetário");
    
    results = getElements(document, "//table[@class='dataTable']");
    allElements = results.snapshotItem(0).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Vendedor");
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Quantidade");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Proporção");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy/,"Comprar");
    
    allElements = results.snapshotItem(1).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Quantidade");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Proporção"); 
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Apagar");
    
    allElements = results.snapshotItem(1).children[0];
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"Sem ofertas");  
    
    results = getElements(document, "//TD[@style='border-left: 2px dashed #aaa']");
    
    allElements = results.snapshotItem(0).children[2];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers/,"Suas ofertas") ;
    
    allElements = results.snapshotItem(0).children[5];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Post your Offer/,"Publicar oferta");
    
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Trocar moedas");
    
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Offered currency/,"Moeda oferecida");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Comprar moeda");
    tmp.innerHTML = tmp.innerHTML.replace(/Exchange rate/,"Tipo de câmbio");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Publicar nova oferta");
    tmp.innerHTML = tmp.innerHTML.replace(/Offer/,"Oferta");
    tmp.innerHTML = tmp.innerHTML.replace(/at rate/,"Alterar");
    
}

//===============
//MilitaryUnit
//===============

function doMilitaryUnit() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit)/,"Unidade militar");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(You are not in any military unit)/,"Você não pertence a uma unidade militar");
	tmp.innerHTML=tmp.innerHTML.replace(/(Join existing one)/,"Entrar em uma");
	tmp.innerHTML=tmp.innerHTML.replace(/(Create military unit)/,"Criar unidade militar");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(You need to have level)/,"Necessita ter nível");
	tmp.innerHTML=tmp.innerHTML.replace(/(to join military unit)/,"para entrar na unidade militar");
		
	tmp = allElements.children[4];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Armazem");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Doações");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Editar unidade militar");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Privilégios");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Conta de dinheiro");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Ofecer trabalho");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Recrutar");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"Aplicações pendentes");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Ver logs");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Rank militar");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Total de membros");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Max. de membros");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Dano total em guerras");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Dano de hoje");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Líder");
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Armazem");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Doações");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%9E%D7%97%D7%A1%D7%9F)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%AA%D7%A8%D7%95%D7%9E%D7%95%D7%AA)/,"Donations");
	replaceInputByValue({"Leave military unit":["Leave military unit","Deixar unidade militar"]});
	
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(Description)/,"Descrição");
	
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Current orders)/,"Ordens atuais");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle:)/,"Guerra:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Guerra de resistencia");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Patrocinadores:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Side:)/,"Lado:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Briefing:)/,"Informação:");
	tmp.innerHTML=tmp.innerHTML.replace(/(visible for members only)/,"visível somente para membros");
	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	replaceAlliesLinksss();
//	for( var i=0; i<2;i++){
//	tmp.innerHTML=tmp.innerHTML.replace(/(: none)/,": nada");
	//tmp.innerHTML=tmp.innerHTML.replace(/(no allies)/,"Sem aliados");
	//}
	tmp.innerHTML=tmp.innerHTML.replace(/(battle won by)/,"Guerra ganha por");
	replaceInputByValue({"Edit_orders":["Edit_orders","Editar ordens"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Set today's battle)/,"Selecionar guerra de hoje");
	tmp.innerHTML=tmp.innerHTML.replace(/(No battles at this moment)/,"Sem guerras neste momento");
	
	
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Membros");
	tmp.innerHTML=tmp.innerHTML.replace(/(View)/,"Ver");
	tmp.innerHTML=tmp.innerHTML.replace(/(manage members)/,"Controlar membros");
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies)/,"Empresas");
	tmp.innerHTML=tmp.innerHTML.replace(/(No companies)/,"Sem empresas");
	
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/(Latest clicks on referrer link)/,"Últimos cliques em links de indicação");
	
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace(/(Time)/,"Dias");
	tmp.innerHTML=tmp.innerHTML.replace(/(Referrer)/,"Referido");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen)/,"Cidadão");
	
	tmp = allElements.children[17];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show more clicks)/,"Mostrar mais cliques");
	
}

//================
//CompanyMarket
//================

function doCompMarket() {
	var allElements;

	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies for sale)/,"Empresas à venda");
	
	rr = {
		"1":["Any","Qualquer"],
		"2":["Iron","Ferro"],
		"3":["Grain","Grãos"],
		"4":["Oil","Óleo"],
		"5":["Stone","Pedra"],
		"6":["Wood","Madeira"],
		"7":["Diam.","Diam."],
		"8":["Weap.","Armas"],
		"9":["House","Casa"],
		"10":["Gift","Pres."],
		"11":["Food","Comida"],
		"12":["Ticket","Pass."],
		"13":["DS","S.D."],
		"14":["Hosp.","Hospital"]
	};
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
	
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Mostrar ofertas:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","País:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Qualidade:");
	tmp.innerHTML=tmp.innerHTML.replace("No offers","Sem ofertas");
	
	replaceInputByValue({"View offers":["View offers","Ver ofertas"],"Buy":["Buy","Comprar"]});
	
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Company","Empresa");
	tmp.innerHTML=tmp.innerHTML.replace("Product","Produto");
	tmp.innerHTML=tmp.innerHTML.replace("Location","Localização");
	tmp.innerHTML=tmp.innerHTML.replace("Seller","Vendedor");
	tmp.innerHTML=tmp.innerHTML.replace("Price","Preço");
	tmp.innerHTML=tmp.innerHTML.replace("Buy","Comprar");
	for (var i = 0; i < 10; i++) {
	tmp.innerHTML=tmp.innerHTML.replace("Employer","Patrão");
	}
	
	obj = allElements.children[6];
   }

//=======================
//Country Stats
//=======================

function doCountryStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country statistics)/,"Estatísticas país");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Tipo de estatísticas:");
	replaceInputByValue({"Show":["Show","Mostrar"]});
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total:)/,"Total:");
	tmp = allElements.children[6];
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Não");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens)/,"Cidadãos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage)/,"Dano total");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage today)/,"Dano de hoje");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/,"XP");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength)/,"Força");
	tmp.innerHTML=tmp.innerHTML.replace(/(New citizens today)/,"Novos cidadãos de hoje");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens online)/,"Cidadãos on-line");
	tmp.innerHTML=tmp.innerHTML.replace(/(Productivity)/,"Produtividade");
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Citizens")) {
			obj.innerHTML=obj.innerHTML.replace(/(Citizens)/,"Cidadãos");
		} else if (obj.innerHTML.match("Total damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Total damage)/,"Dano total");
		} else if (obj.innerHTML.match("Damage today")) {
			obj.innerHTML=obj.innerHTML.replace(/(Damage today)/,"Dano de hoje");
		} else if (obj.innerHTML.match("xp")) {
			obj.innerHTML=obj.innerHTML.replace(/(xp)/,"EX");
		} else if (obj.innerHTML.match("Strength")) {
			obj.innerHTML=obj.innerHTML.replace(/(Strength)/,"Força");
		} else if (obj.innerHTML.match("New citizens today")) {
			obj.innerHTML=obj.innerHTML.replace(/(New citizens today)/,"Novos cidadãos de hoje");
		} else if (obj.innerHTML.match("Citizens online")) {
			obj.innerHTML=obj.innerHTML.replace(/(Citizens online)/,"Cidadãos on-line");
		} else if (obj.innerHTML.match("Productivity")) {
			obj.innerHTML=obj.innerHTML.replace(/(Productivity)/,"Produtividade");
		}
		}
}
//=================
//Party Stats
//=================

function doPartyStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Party statistics)/,"Estatísticas partidárias");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");
	replaceInputByValue({"Show":["Show","Mostrar"]});
	replaceInputByValue({"Leave party":["Leave party","Deixar partido"]});
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Nãס");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partido");
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Membros");
	obj = results.snapshotItem(i);
}
	
}
//====================
//Newspaper Stat
//====================

function doNewsStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Newspaper statistics)/,"Estatísticas do jornal");
	
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Nãס");
	tmp.innerHTML=tmp.innerHTML.replace(/(Redactor)/,"Redator");
	tmp.innerHTML=tmp.innerHTML.replace(/(Newspaper)/,"Jornal");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subs)/,"Assin.");

	
	}
	}
//=================
//Citizen Stats
//=================

function doCitiStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen statistics)/,"Estatísticas dos cidadãos");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Tipo de estatística:");
	replaceInputByValue({"Show":["Show","Mostrar"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Nãס");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen)/,"Cidadão");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage)/,"Dano");
	tmp.innerHTML=tmp.innerHTML.replace(/(Today damage)/,"Dano total");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/,"EX");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength)/,"Força");
	tmp.innerHTML=tmp.innerHTML.replace(/(Achievements)/,"Conquistas");
	obj = results.snapshotItem(i);
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Damage)/,"Dano");
		} else if (obj.innerHTML.match("Today damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Today damage)/,"Dano total");
		} else if (obj.innerHTML.match("xp")) {
			obj.innerHTML=obj.innerHTML.replace(/(xp)/,"XP");
		} else if (obj.innerHTML.match("Strength")) {
			obj.innerHTML=obj.innerHTML.replace(/(Strength)/,"Força");
		}	
	}
}

//===============
//Mu Stats
//===============

function doMuStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit statistics)/,"Estatísticas da unidade militar");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Tipo de estatísticas:");
	replaceInputByValue({"Show":["Show","Mostrar"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Nסã");
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Membros");
	tmp.innerHTML=tmp.innerHTML.replace(/(Name)/,"Nome");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank)/,"Rank");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage)/,"Dano total");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage today)/,"Dano de hoje");
	tmp.innerHTML=tmp.innerHTML.replace(/(Value)/,"Valor");

	obj = results.snapshotItem(i);
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Total damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Total damage)/,"Dano total");
		} else if (obj.innerHTML.match("Damage today")) {
			obj.innerHTML=obj.innerHTML.replace(/(Damage today)/,"Dano de hoje");
		} else if (obj.innerHTML.match("Total members")) {
			obj.innerHTML=obj.innerHTML.replace(/(Total members)/,"Total de membros");
		} else if (obj.innerHTML.match("Gold value")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gold value)/,"Valor em Gold");
		} 
		
	}
}
//================
//News
//================

function doNews() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(News)/,"Notícias");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show News:)/,"Mostrar Notícias:");
	tmp.innerHTML=tmp.innerHTML.replace(/(News Type)/,"Tipo de notícias");
	replaceInputByValue({"View news":["View news"," Ver notícias"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");

	var results;
	results = getElements(document, "//table[@class='dataTable paddedTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Top articles)/,"Melhores artigos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Latest articles)/,"Últimos artigos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military events)/,"Eventos militares");
	tmp.innerHTML=tmp.innerHTML.replace(/(Political events)/,"Eventos políticos");

		
		obj = results.snapshotItem(i);
	}
		for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	
		allElements = results.snapshotItem(i);
		for (var i = 0; i < 10; i++) {
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( minute[s]* ago)/g,"$1 minuto(s) atrás");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( hour[s]* ago)/g,"$1 hora(s) atrás");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( day[s]* ago)/g,"$1 dia(s) atrás");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( month[s]* ago)/g,"$1 mes(es) atrás");
		allElements.innerHTML=allElements.innerHTML.replace(/(Posted)/g," ");
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z ]*)( in the battle versus )/g," $2 na guerra contra ");
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )/g," assegurou ");
		allElements.innerHTML=allElements.innerHTML.replace(/( in the battle versus )/g," na guerra contra ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"$2 começou uma guerra em $5 $4");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"foi atacado(a) por $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"propôs declarar uma guerra à $5$6");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g,"declarou uma guerra à $2$3");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )/,"conquistado");
	allElements.innerHTML=allElements.innerHTML.replace(/( in the battle versus )/," na guerra contra ");
	allElements.innerHTML=allElements.innerHTML.replace(/(Money donation of)/,"A doação de dinheiro de");
	allElements.innerHTML=allElements.innerHTML.replace(/(was accepted)/,"foi aceita");
	allElements.innerHTML=allElements.innerHTML.replace(/(was proposed in congress)/,"foi proposto no congresso");
	allElements.innerHTML=allElements.innerHTML.replace(/(Issuing)/,"Emitido");
	allElements.innerHTML=allElements.innerHTML.replace(/(wurde akzeptiert by congress)/,"a emição foi aceita pelo Congresso");
	allElements.innerHTML=allElements.innerHTML.replace(/(Hospital was deployed in)/,"Hospital foi colocado em:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Defense System was deployed in)/,"Sistema de defesa foi colocado em:");
	allElements.innerHTML=allElements.innerHTML.replace(/(New taxes for)/,"Novas taxas para");
	allElements.innerHTML=allElements.innerHTML.replace(/(President of)/,"Presidente de");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed to deploy)/,"propôs instalar um");
	allElements.innerHTML=allElements.innerHTML.replace(/(Defense System in)/,"Sitema de Defesa em:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Hospital in)/,"Hospital em:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Impeachment of president of)/,"Desinstituição do presidente de");
	allElements.innerHTML=allElements.innerHTML.replace(/(was proposed)/,"foi proposta");
	allElements.innerHTML=allElements.innerHTML.replace(/(signed MPP with)/,"associação de MPP com");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed mutual protection pact to)/,"propôs um pacto de proteção mútua para");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed a peace treaty to)/,"propôs um tratado de paz à");
	allElements.innerHTML=allElements.innerHTML.replace(/(were accepted in)/,"foram aceitas em");
	allElements.innerHTML=allElements.innerHTML.replace(/(Import tax)/,"Taxa de importação");
	allElements.innerHTML=allElements.innerHTML.replace(/(Food)/,"Comida");
	allElements.innerHTML=allElements.innerHTML.replace(/(Gift)/,"Presente");
	allElements.innerHTML=allElements.innerHTML.replace(/(Weapon)/,"Arma");
	allElements.innerHTML=allElements.innerHTML.replace(/(Ticket)/,"Passagem");
	allElements.innerHTML=allElements.innerHTML.replace(/(Stone)/,"Pedra");
	allElements.innerHTML=allElements.innerHTML.replace(/(Wood)/,"Madeira");
	allElements.innerHTML=allElements.innerHTML.replace(/(Grain)/,"Grano");
	allElements.innerHTML=allElements.innerHTML.replace(/(Iron)/,"Ferro");
	allElements.innerHTML=allElements.innerHTML.replace(/(Oil)/,"Óleo");
	allElements.innerHTML=allElements.innerHTML.replace(/(House)/,"Casa");
	allElements.innerHTML=allElements.innerHTML.replace(/(Diamonds)/,"Diamante");
	}
	}
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Top articles")) {
			obj.innerHTML=obj.innerHTML.replace(/(Top articles)/,"Melhores artigos");
		} else if (obj.innerHTML.match("Latest articles")) {
			obj.innerHTML=obj.innerHTML.replace(/(Latest articles)/,"Últimos Artigos");
		} else if (obj.innerHTML.match("Military events")) {
			obj.innerHTML=obj.innerHTML.replace(/(Military events)/,"Eventos Militares");
		} else if (obj.innerHTML.match("Political events")) {
			obj.innerHTML=obj.innerHTML.replace(/(Political events)/,"Eventos Políticos");
		} 
		
	}
	
}

//=================
//Country Economy
//=================

function doCountryEco() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country Economy)/,"Econômia do País");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select country)/,"Escolha um País");
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Population)/,"População");
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total active citizens)/,"Total de cidadãos ativos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens online)/,"Cidadãos on-line");
	tmp.innerHTML=tmp.innerHTML.replace(/(New citizens today)/,"Novos cidadãos hoje");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total residents)/,"Total de residentes");
	tmp.innerHTML=tmp.innerHTML.replace(/(Who is online)/,"Quem está online");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show details)/,"Mostrar detalhes");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show details)/,"Mostrar detalhes");
	
	
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Regions)/,"Regiões");
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Resources)/,"Recursos");
		tmp.innerHTML=tmp.innerHTML.replace(/(Region)/,"Região");
	for ( var j=0;j < 20;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No resources)/,"Sem recursos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Capital of)/,"Capital");
	tmp.innerHTML=tmp.innerHTML.replace(/(HIGH)/,"ALTO");
	tmp.innerHTML=tmp.innerHTML.replace(/(MEDIUM)/,"MÉDIOי");
	}
	obj = results.snapshotItem(i);
	}
	
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/(Taxes)/,"Taxas");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"Recurso");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Import Tax)/,"Taxa de importação");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income Tax)/,"Impostos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat)/,"Inposto sobre valor total");
	tmp.innerHTML=tmp.innerHTML.replace(/(Iron)/,"Ferro");
	tmp.innerHTML=tmp.innerHTML.replace(/(Grain)/,"Grãos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Oil)/,"Óleo");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Stone)/,"Pedra");
	tmp.innerHTML=tmp.innerHTML.replace(/(Wood)/,"Madeira");
	tmp.innerHTML=tmp.innerHTML.replace(/(Diamonds)/,"Diamantes");
	tmp.innerHTML=tmp.innerHTML.replace(/(Weapon)/,"Armas");
	tmp.innerHTML=tmp.innerHTML.replace(/(House)/,"Casas");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Gift)/,"Presentes");
	tmp.innerHTML=tmp.innerHTML.replace(/(Food)/,"Comida");
	tmp.innerHTML=tmp.innerHTML.replace(/(Ticket)/,"Passagem");
	tmp.innerHTML=tmp.innerHTML.replace(/(Defense System)/,"Sistema de Defesa");
	tmp.innerHTML=tmp.innerHTML.replace(/(Hospital)/,"Hospital");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%91%D7%A8%D7%96%D7%9C.png)/,"Iron.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%97%D7%99%D7%98%D7%94.png)/,"Grain.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%A0%D7%A4%D7%98.png)/,"Oil.png");	
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%90%D7%91%D7%A0%D7%99%D7%9D.png)/,"Stone.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%A2%D7%A6%D7%99%D7%9D.png)/,"Wood.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%99%D7%94%D7%9C%D7%95%D7%9E%D7%99%D7%9D.png)/,"Diamonds.png");
	}
	
	tmp = allElements.children[19];
	tmp.innerHTML=tmp.innerHTML.replace(/(Treasury)/,"Tesouro");
	
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Treasury)/,"Tesouro");
	
	}
	tmp = allElements.children[24];
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"Edifícios disponíveis");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No buildings)/,"Sem edifícios");
	}
}
//================
//Country Laws
//================

function doCountryLaws() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Leis propostas");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select country)/,"Selecionar país");
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Leis propostas");
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Type)/,"Tipo");
	tmp.innerHTML=tmp.innerHTML.replace(/(Results)/,"Resultados");
	tmp.innerHTML=tmp.innerHTML.replace(/(Yes:No)/,"Sim:Não");
	tmp.innerHTML=tmp.innerHTML.replace(/(Time)/,"Data");
	for(var j=0;j<15;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Accepted)/,"Aceito");
	tmp.innerHTML=tmp.innerHTML.replace(/(but failed)/,"Falhadas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rejected)/,"Rejeitado");
	tmp.innerHTML=tmp.innerHTML.replace(/(hours ago)/,"horas atrás");
	tmp.innerHTML=tmp.innerHTML.replace(/(days ago)/,"días atrás");
	tmp.innerHTML=tmp.innerHTML.replace(/(months ago)/,"meses atrás");
	tmp.innerHTML=tmp.innerHTML.replace(/(hour ago)/,"hora atrás");
	tmp.innerHTML=tmp.innerHTML.replace(/(day ago)/,"dia atrás");
	tmp.innerHTML=tmp.innerHTML.replace(/(month ago)/,"mes atrás");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Doar dinhero");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cease Fire)/,"Cessar fogo");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change tax)/,"Taxas de câmbio");
	tmp.innerHTML=tmp.innerHTML.replace(/(Impeach)/,"Destituição");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change welcome message)/,"Mudar mensagem de boas-vindas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/,"Imprimir dinheiro");
	tmp.innerHTML=tmp.innerHTML.replace(/(Elect president)/,"Eleger presidente");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"Construir edifício");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"Proposta de MPP");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/,"Declarar guerra");
	
	}
	}
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Propostas de Lei");
	tmp = allElements.children[18];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress actions)/,"Ações do congresso");
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposal left )/,"Propostas de leis restantes");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Doar dinhero");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cease Fire)/,"Cessar fogo");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change taxes)/,"Taxas de câmbio");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose impeach)/,"Proposta desinstitução");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose welcome message)/,"Proposta de mensagem de boas-vindas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/,"Imprimir dinhero");
	tmp.innerHTML=tmp.innerHTML.replace(/(Elect president)/,"Eleger Presidente");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"Construir edifício");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"Proposta de MPP");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/,"Declarar a guerra");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country treasure)/,"Tesouro do país");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"Edifícios construidos");
	tmp.innerHTML=tmp.innerHTML.replace(/(No buildings)/,"Sem edifícios");
	replaceInputByValue({"Leave congress":["Leave congress","Deixar o congresso"]});
	
	tmp = allElements.children[21];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate buildings to national treasury)/,"Doar edifícios ao tesouro nacional");
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(You have no buildings in your inventory)/,"Você não tem edifícios no seu inventário");
	}
	
	tmp = allElements.children[26];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money to national treasury)/,"Doar dinheiro ao tesouro nacional");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Select item to donate:)/,"Escolher item para doar:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Donate item:)/,"Doar item:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Sum:)/,"Soma:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Reason:)/,"Motivo:");
		replaceInputByValue({"Donate":["Donate","Doar"]});
	}
	results = getElements(document, "//a[@target='_blank']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposals)/,"Leis propostas");
	}
}

//=================
//Party Elections
//=================

function doPartyElec() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Party Elections)/,"Eleições partidárias");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party:)/,"Partido:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"Data:");	
	replaceInputByValue({"Show":["Show","Mostrar"]});
	}replaceInputByValue({"Vote":["Vote","Votar"]});
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nº.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Candidato");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partido");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Total de votos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Apresentação");
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"Sem apresentação");
	}
}
//=======================
//Congress Elections
//=======================

function doCongressElec() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","Mostrar"]});
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress Elections)/,"Eleições do congres.");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Elected candidates)/,"Candidatos eleitos");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Not elected candidates)/,"Candidatos não eleitos");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party:)/,"Partido:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"Data:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"País:");	
	}
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nº.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Candidato");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Apresentação");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partido");
	
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Total de votos");
	for(j=0;j<30;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"Sem apresentação");
	}
	for(j=0;j<20;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Apresentação");
	}}
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/index.php/Congress elections']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress elections tutorial)/,"Mais sobre Eleições do Congresso");
	
	}
}
//=======================
//President elections
//=======================

function doPresiElec() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","Exibir"]});
	replaceInputByValue({"Candidate for president":["Candidate for president","Candidato a presidente"]});
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential Elections)/,"Eleições Presidenciais");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(Link to presentation:)/,"Link da apresentação");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidating for president costs)/,"Custos de candidatura à presidente");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party:)/,"Partido:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"Data:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"País");	
	}
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nס.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Candidato");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partido");
	for(j=0;j<5;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Apresentação");
	}
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Total de votos");
	tmp.innerHTML=tmp.innerHTML.replace(/(No candidates )/,"Sem candidatos");
	for(j=0;j<5;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"Sem apresentação");
	}}
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/index.php/Presidental elections']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential elections tutorial)/,"Mais sobre Eleições Presidenciais");
	
	}
}
//==========================
//citizenship Application
//==========================

function doCSappli() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","הראה"]});
	replaceInputByValue({"Apply for citizenship":["Apply for citizenship","Conceder nacionalidade"]});
	var tmp;
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Pending citizenship applications)/,"Pedidos pendentes de cidadania");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show accepted citizenship)/,"Mostrar alterações de nacionalidade aceitas");
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Your application for citizenship in)/,"Sua solicitação de nacionalidade em");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Your citizenship)/,"Sua nacionalidade");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"País:");
	tmp.innerHTML=tmp.innerHTML.replace(/(The application will be revised by)/,"Sua solicitação será revisada por");		
	tmp.innerHTML=tmp.innerHTML.replace(/(congress members of)/,"membros do congresso de");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Pending applications)/,"Solicitações pendentes");
	tmp.innerHTML=tmp.innerHTML.replace(/(No applications)/,"Sem solicitações");	
	obj=results.snapshotItem(i);
	}
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/index.php/Citizenship']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizenships on wiki)/,"Mais sobre Nacionalidade");
	
	}
}
//=============
//World Map
//=============

function doWorldmap() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	var tmp;
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(World map)/,"Mapa");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Browse territories)/,"Buscar territórios");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Map Type:)/,"Tipo de Mapa:");
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizenship:)/,"Nacionalidade:");
}
//========================
// Citizen market offers
//========================
function doCitizenMarketOffers() {
    var results;
    var allElements;
    var tmp;
    results = getElements(document, "//TD[@colspan='2']");
    allElements = results.snapshotItem(0).children[2];
    tmp = allElements.children[0];
    
    tmp.innerHTML = tmp.innerHTML.replace(/Marketplace/,"Mercado");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offers/,"Publicar nova oferta");
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"País");
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produtividade");
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Quantidade");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Preço");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Publicar nova oferta");
    tmp.innerHTML = tmp.innerHTML.replace(/Show market offers/,"Mostrar ofertas do mercado");
    tmp.innerHTML = tmp.innerHTML.replace(/Your storage/,"Seu inventário");
    
    results = getElements(document, "//h3[@style='text-align: center']");
    allElements = results.snapshotItem(0);
    tmp = allElements;
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers on market/,"Suas ofertas no mercado");
    
    results = getElements(document, "//table[@style='width: 680px; margin-left: auto; margin-right: auto;']");
    allElements = results.snapshotItem(0).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produto");
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Vendedor");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock/,"Estoque");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Preço");
    tmp.innerHTML = tmp.innerHTML.replace(/Gross/,"Bruto");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Preço");
    tmp.innerHTML = tmp.innerHTML.replace(/Net/,"Líquido");
    tmp.innerHTML = tmp.innerHTML.replace(/Import tax/,"Taxa importação");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Apagar");
    
}
// NEW
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Empresas");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Empresa");
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produto");
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"Localização");
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"Empregados");
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"Criar nova empresa");
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Nome da empresa");
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"Tipo de produto");
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"Avatar da empresa");
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"Criar empresa");
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"Custo de criação da empresa");
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"A empresa será criada na sua localização-regiaão atual ");
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources/,"Buscar regiões com recursos");
    tmp = allElements.children[4];
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"Mais sobre Empresas");
}
    
    
function doPoliticalStats() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Country Politics/,"Política do país");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Select country/,"Eescolher país");
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/President/,"Presidente");
    tmp = allElements.children[6];
    tmp.innerHTML = tmp.innerHTML.replace(/view elections/,"ver eleições");
    replaceLinkByHref({"http://wiki.e-sim.org/index.php/President":["President","Mais sobre a Presidência"]});
    tmp = allElements.children[9];
    tmp.innerHTML = tmp.innerHTML.replace(/Congress/,"Congresso");
    replaceLinkByHref({"http://wiki.e-sim.org/index.php/Congress":["Congress","Mais sobre o Congresso"]});
    tmp = allElements.children[17];
    tmp.innerHTML = tmp.innerHTML.replace(/Wars/,"Guerras");
    tmp = allElements.children[21];
    tmp.innerHTML = tmp.innerHTML.replace(/War/,"Guerra");
    tmp.innerHTML = tmp.innerHTML.replace(/Details/,"Detalhes");
    tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"Sem guerras");
    tmp = allElements.children[22];
    tmp.innerHTML = tmp.innerHTML.replace(/War rules/,"Regras de guerra");
    tmp = allElements.children[23];
    tmp.innerHTML = tmp.innerHTML.replace(/Alliances/,"Alianças");
    tmp = allElements.children[27];
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"País");
    tmp.innerHTML = tmp.innerHTML.replace(/Expires/,"Expiração"); 
    tmp = allElements.children[27].children[0];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[27].children[0].children[k].children[1];
    
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second)/g,"segundo");
	        } else if (tmp.innerHTML.match("minute")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute)/g,"minuto");
            } else if (tmp.innerHTML.match("hour")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour)/g,"hora");
	        } else if (tmp.innerHTML.match("day")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day)/g,"dia");
            } else if (tmp.innerHTML.match("month")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month)/g,"mes");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds)/g,"$1 segundos");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes)/g,"$1 minutos");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours)/g,"$1 horas");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days)/g,"$1 dias");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months)/g,"$1 meses");
            } 
        }
    }
    
    replaceLinkByHref({"http://wiki.e-sim.org/en/Alliances":["Alliances","Alianças"]});
    
} 

function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"Convidar amigos");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/,"Seu link de convite");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/," Envie este link a outras pessonas para obter mais");
    tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"Você ganha");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who register/,"Gold por cada usuário que se registrar");
    tmp.innerHTML = tmp.innerHTML.replace(/and earn level 7/,"e alcançar o nível 7");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"após clicar neste link");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"e outros");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she get his\/her/,"Ouro quando ele/ela ganhar sua");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/,"primeira medalha");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"Além disso é obtido");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"10% de ouro recebido pelo jogador por cada medalla recebida e por subir de nível");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive additional/,"Por favor note que seus amigos também vão receber mais");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering from your invitation when he reach level 7/,"Gold para o registro através do seu link de convite para o jogo quando ele atingir o nível 7");
    tmp = allElements.children[4];
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"Cidadãos convidados por você");
    tmp = allElements.children[5];
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"Tipo de classificação");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"Mostrar");
    tmp = allElements.children[6];
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Cidadão");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"Nível");
    tmp.innerHTML = tmp.innerHTML.replace(/XP/,"XP");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"Gold recibido");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"Data de registro");

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Gold received")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gold received)/,"Gold recibido");
		} else if (obj.innerHTML.match("Register time")) {
			obj.innerHTML=obj.innerHTML.replace(/(Register time)/,"Data de registro");
		} else if (obj.innerHTML.match("Citizen name")) {
			obj.innerHTML=obj.innerHTML.replace(/(Citizen name)/,"Nome");
		} else if (obj.innerHTML.match("By experience")) {
			obj.innerHTML=obj.innerHTML.replace(/(By experience)/,"Por experiência");
		} else if (obj.innerHTML.match("By nationality")) {
			obj.innerHTML=obj.innerHTML.replace(/(By nationality)/,"Por nacionalidade");
    		}
    		}
    TimeBasic(allElements,6,0,4);
    
    tmp = allElements.children[11];
    tmp.innerHTML = tmp.innerHTML.replace(/Statistics/,"Estadisticas");
    tmp.innerHTML = tmp.innerHTML.replace(/Total clicks on referral link/,"Total de cliques em seu link de convite");
    tmp.innerHTML = tmp.innerHTML.replace(/Unique clicks on referral link/,"Cliques exclusivos no link de convite");
    tmp.innerHTML = tmp.innerHTML.replace(/Total citizens registered/,"Total de cidadãos registrados");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens who reached level 7/,"Cidadãos que atingiram o nível 7");
    tmp = allElements.children[14];
    tmp.innerHTML = tmp.innerHTML.replace(/Latest clicks on referrer link/,"Últimos cliques no link de convite");
    tmp = allElements.children[15];
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Data");
    tmp.innerHTML = tmp.innerHTML.replace(/Referrer/,"Referidos");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Cidadão");
    
    TimeBasic(allElements,15,0,0);
    
    tmp = allElements.children[15].children[0];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3];
        if (tmp.innerHTML.match(/Not registered/)) {		
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"Nenhum registrado");
            }        
    }
    tmp = allElements.children[17];
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"Mostrar mais cliques");
    
    
}
//Ulepszyc
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l];
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/,"segundo atrás");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"minuto atrás");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"hora atrás");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"dia atrás");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"mes atrás");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"À $1 segundo(s)");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"À $1 minuto(s)");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"À $1 hora(s)");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"À $1 dia(s)");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"À $1 mes(es)");
            } 
        }
    }
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
//} else if (isTargetHtml("/notifications.html")) {
//	doNotifications(); TODO
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
} else if (isTargetHtml("/inviteFriends.html")) {
	doInviteFriends();
} else if (isTargetHtml("/myMilitaryUnit.html")) {
	doMilitaryUnit();
} else if (isTargetHtml("/citizenMarketOffers.html")) {
	doCitizenMarketOffers();
} else if (isTargetHtml("/monetaryMarket.html")) {
	doMonetaryMarket();
}else if (isTargetHtml("/companiesForSale.html")) {
	doCompMarket();
}else if (isTargetHtml("/countryStatistics.html")) {
	doCountryStat();
}else if (isTargetHtml("/partyStatistics.html")) {
	doPartyStat();
}else if (isTargetHtml("/newspaperStatistics.html")) {
	doNewsStat();
}else if (isTargetHtml("/citizenStatistics.html")) {
	doCitiStat();
}else if (isTargetHtml("/militaryUnitStatistics.html")) {
	doMuStat();
}else if (isTargetHtml("/news.html")) {
	doNews();
}else if (isTargetHtml("/countryEconomyStatistics.html")) {
	doCountryEco();
}else if (isTargetHtml("/countryLaws.html")) {
	doCountryLaws();
}else if (isTargetHtml("/partyElections.html")) {
	doPartyElec();
}else if (isTargetHtml("/congressElections.html")) {
	doCongressElec();
}else if (isTargetHtml("/presidentalElections.html")) {
	doPresiElec();
}else if (isTargetHtml("/pendingCitizenshipApplications.html")) {
	doCSappli();
}else if (isTargetHtml("/googleMap.html")) {
	doWorldmap();
}else if (isTargetHtml("/companies.html")) {
	doCompany();
}else if (isTargetHtml("/countryPoliticalStatistics.html")) {
	doPoliticalStats();
}else if (isTargetHtml("/militaryUnitsStats.html")) {
	doBattleMUStatistics();
}