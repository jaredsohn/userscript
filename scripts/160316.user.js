// ==UserScript==
// @name			e-sim PT
// @namespace		e-sim PT
// @include			http://*.e-sim.org*
// @version			0.3
// ==/UserScript==
// Portuguese translation by DMBoss

//Links Barra Menu
menuTextReplacements = {
	"myPlacesButton":["My places", "Meus Lugares"],
	"marketButton":["Market", "Mercado"],
	"statisticsButton":["Statistics", "Estatísticas"],
	"newsButton":["News", "Novidades"],
	"electionsButton":["Country", "Pais"]
};

//Links SubMenu
menuLinksReplacements = {
	//My Places
	"work.html":["Work", "Trabalho"],
	"train.html":["Train", "Treino"],
	"equipment.html":["Equipment", "Equipamento"];
	"companies.html"["Companies", "Empresa"],
	"newspaper.html":["Newspaper", "Jornal"],
	"myParty.html":["Party", "Partido"],
	"contracts.html":["Contracts", "Contratos"],
	"myShares.html":["Shares", "Ações"],
    "myAuctions.html":["Auctions", "Leilões"],
	"inviteFriends.html":["Invite friends", "Convidar Amigos"],
	"myMilitaryUnit.html":["Military unit", "Unidade Militar"],
	"subscription.html":["Premium account", "Conta Premium"],
	"bonusGold":["Bonus Gold", "Bonus Ouro"];
	
	//Market
	"productMarket.html":["Product market", "Mercado Produtos"],
	"jobMarket.html":["Job market", "Mercado Trabalho"],
	"monetaryMarket.html":["Monetary market", "Mercado Monetario"],
	"stockMarket.html":["Stock market", "Mercado de Ações"],
    "auctions.html":["Auctions", "Leilões"],
	"companiesForSale.html":["Companies for sale","Empresas à Venda"],
	"specialItems.html":["Special items", "Items Especiais"],
	
	//Statistics
	"countryStatistics.html":["Country statistics", "Estatísticas Paises"],
	"partyStatistics.html":["Party statistics", "Estatísticas Partidos"],
	"newspaperStatistics.html":["Newspaper statistics", "Estatísticas Jornais"],
	"citizenStatistics.html":["Citizen statistics", "Estatísticas Cidadãos"],
	"militaryUnitStatistics.html":["Military unit stats", "Estatísticas Unidade Militar"],
	"stockCompanyStatistics.html":["Stock market stats", "Estatísticas Mercado de Ações"],
	"donations.html":["Donations", "Doações"],

	//News
	"news.html\?newsType=TOP_ARTICLES":["Top articles", "Top Artigos"],
	"news.html\?newsType=LATEST_ARTICLES":["Latest articles", "Últimos Artigos"],
	"news.html\?newsType=MILITARY_EVENTS":["Military events", "Eventos Militares"],
	"news.html\?newsType=POLITICAL_EVENTS":["Political events", "Eventos Politicos"],
	
	//Country
	"battles.html":["Battles","Batalhas"],
	"countryPoliticalStatistics.html":["War and politics","Guerras e Politicas"],
	"countryEconomyStatistics.html":["Economy", "Economia"],
	"countryLaws.html":["Laws", "Leis"],
	"partyElections.html":["Party elections", "Eleições Partidárias"],
	"congressElections.html":["Congress elections", "Eleições Congresso"],
	"presidentalElections.html":["Presidential elections","Eleições Presidênciais"],
	"pendingCitizenshipApplications.html":["Citizenship","Nacionalidade"],
	"googleMap.html":["Map","Mapa"],
};

//Link Your Tasks
sideLink1Replacementss = {
	"crossIcon":["Logout", "Sair"],
	"workIcon":["Work", "Trabalho"],
	"fightIcon":["Fight", "Lutar"],
	"avatarIcon":["Upload avatar", "Upload Avatar"],
	"voteIcon":["Vote", "Votar"],
};

//Links Progress Health
sideLink2Replacements = {
	"travel.html"	:["Travel", "Viajar"],
	"pendingCitizenshipApplications.html"	:["change", "alterar"],
	"http://wiki.e-sim.org/en/Health"	:["Health tutorial","Tutorial vida"]
};

//Drop Menu
sideLink4Replacements = {
	"newEatButton"		:["Eat","Comer"],
	"newGiftButton"	:["Use","Usar"],
	"medkitButton"	:["Use medkt (2 left)", "Usar Kit (2 ???)"],
};

//Título
hpTitleReplacements = {
	"News"		:["News","Novidades"],
	"Shouts"	:["Shouts","Comentarios"],
	"Battles"	:["Battles","Batalhas"],
	"Events"	:["Events","Eventos"]
};


hpTabsReplacements = {
	//Tabs Novidadws
	"#topArticles"		:["Global","Global"],
	"#latestArticles"	:["Latest","Últimas"],
	"#localArticles"	:["Local","Locais"],

	//Tabs Shouts
	"#countryShouts":["Country","Pais"],
	"#friendsShouts":["Military unit","Unidade Militar"],
	"#myShouts":["Friends","Amigos"],
	
	//Tabs Battle
	"#localBattles":["Country","Pais"],
	"#substidedBattles":["Subsidized","Subsidiadas"],
	"#hotBattles":["Important","Importante"],

	//Tabs Events
	"#localEvents":["Military","Militar"],
	"#globalEvents":["Military","Militar"],
	"#politicalEvents":["Political","Politica"]
};

hpContentArticlesReplacements = {
	"topArticles":"topArtigos",
	"latestArticles":"ultimosArtigos",
	"localArticles":"artigosLocais"
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
	"http://wiki.e-sim.org/en/MonetaryMarket"	:["Monetary market tutorial","Tutorial mercado monetario"],
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
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Guerra de resistencia");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Subsidios:");
	}
}

function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"sem aliados");
	//12 allies
	if (obj.innerHTML.match("1 ally")) {
	    obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"1 aliado");
    } else {
        obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 aliados");
    }
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"Guerra de resistencia");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Subsidios:");
}

//Test, other ways possible
function replaceBattleTime(obj) {
    if (obj.innerHTML.match(/[\d\.]+/g)== 1) {
        if (obj.innerHTML.match("second ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"1 segundo atras");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"1 minuto atras");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"1 hora atras");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"1 dia atras");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"1 mes atras");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"$1 segundos atras");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"$1 minutos atras");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"$1 horas atras");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"$1 dias atras");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"$1 meses atras");
        }
    }
}

//---------------------------------------------------
//Top, Latest, Local Art
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"1 segundo atras");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"1 minuto atras");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"1 hora atrasu");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"1 dia atras");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"1 mes atras");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"$2 segundos atras");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"$2 minutos atras");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"$2 horas atras");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"$2 dias atras");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"$2 meses atras");
    }   
}

//---------------------------------------------------
//Subs 
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"1 segundo atras");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"1 minuto atras");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"1 hora atras");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"1 dia atras");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"1 mes atras");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"$2 segundo atras");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"$2 minuto atras");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"$2 hora atras");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"$2 dias atras");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"$2 meses atras");
    }
    
}


//---------------------------------------------------
//  Battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"Recente");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"defensores:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"atacantes:");
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"Estatísticas ronda corrente");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"Defensores/Total dano:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"Atacantes/Total dano:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Meu Dano:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"Top Paises defensivos:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"Top Paises atacantes:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"Top unidades militares defensivas:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"Top unidades militares atacantes:");
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
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"1 segundo atras");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"1 minuto atras");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"1 hora atras");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"1 dia atras");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"1 mes atras");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"$2 segundos atras");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"$2 minutos atras");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"$2 horas atras");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"$2 dias atras");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"$2 meses atras");
                } 
        }
    }
}
	    
replaceLinkByHrefSSS("#", {
    "Report":["Report","Reportar"],
    "Delete":["Delete","Apagar"],
    "Edit":["Edit","Editar"],
    "More shouts":["More shouts","Mais comentarios"]
});
	
	
replaceInputByValue({
    "Report":["Report","Reportar"],
    "Delete":["Delete","Apagar"],
    "Edit":["Edit","Editar"]
});	
	




//============================================================================
//Menu
//============================================================================
function doMenu() {
	replaceLinkByHref(menuLinksReplacements);
	replaceInnerHTML2(menuTextReplacements);
	allElements = document.getElementById('headerRow').children[2].children[0].children[0].children[1].children[1].children[3]
    allElements.innerHTML=allElements.innerHTML.replace(/day/,"dia")
}

//============================================================================
//Side
//============================================================================
function doSide() {
	var allElements;
	var tmp;
	
	allElements = document.getElementById('userMenu').children[0];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"Nivel: ");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"Posicao:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Prox. posicao:");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Hablidade Economica:");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"Forca");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"Localizacao");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"Nacionalidade:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"Limite Comida:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"Limite Prenda:");


	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Meu Dinheiro");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Meu Inventario");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Minhas Mensagens");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"Minhas tarefas diarias");
	
	
	replaceLinkByHref(sideLink2Replacements);
	
	replaceLinkByID(sideLink3Replacements);
	
	replaceInputByID(sideLink3Replacements);
	
	replaceSpanByClass(sideLink1Replacementss);
	

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"Ronda corrente");
		} else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"Ronda $2 ");
		} else if (obj.innerHTML.match("Food ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Tipo comida");
		} else if (obj.innerHTML.match("Gift ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Tipo presente");
		} else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"sem arma (");
		} else if (obj.innerHTML.match("Any quality")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"qualquer");
		}
	}
}

//============================================================================
//Homepage
//============================================================================
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
		"Show more battles":["Show more battles","Mostrar mais batalhas"],
		"Subsidies informations":["Subsidies informations","informações subsidiadas"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"sem batalhas subsidiadas");
        }	
    }
	
	
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Minha unidade Militar :");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Lutar por:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"1 minuto atras");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"1 hora atras");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"1 dia atras");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"1 mes atras");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"$1 minutos atras");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"$1 horas atras");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"$1 dias atras");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"$1 meses atras");
        }
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z- ]*)( in the battle versus )/g,"defendeu $2, na batalha contra ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"Povo de $2 iniciou resistencia em $4 $5 ");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"Foi atacada por $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"Presidente de $2$3 propoem declarar guerra a $5$6 ");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," declarou guerra a $2$3 ");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," conquistou $2, na batalha contra ");
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/g," tem novo presidente");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Mostrar mais eventos","??????"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Mostrar mais eventos");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"Escrever novo comentario:");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="Publicar"
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Enviar para canal :");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Enviar para canal :");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," Pais | $2  Unidade Militar | $4 Amigos");

	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Mais comentarios"] });
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Mercado de Trabalho ");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"criterios:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Pais:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Habilidade economica:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Trabalhador");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Empresa");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produto");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Habilidade minima");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Salario");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Proposta");
	
	replaceInputByValue({"Apply":["Apply","Trabalhar"],"Show":["Show","Mostrar"]});
}

//============================================================================
//Work
//============================================================================
function doWork() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"Trabalho");
	
	if (allElements.innerHTML.match(/You have no job^\./)) {
		xxx = document.getElementById('command').parentNode.children[0];
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"Actualmente sem trabalho");
		replaceInputByValue({"Get a job now!":["Get a job now!","Arranjar trabalho!"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"Precisas ficar no pais onde a empresa esta situada");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Local de trabalho");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Trabalhador");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Salario:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Abandonar trabalho");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"Actualmente ainda nao trabalhaste");
			replaceInputByValue({"Work now":["Work now","Trabalhar agora!"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Resultados do dia de trabalho");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Salario bruto");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Salario liquido");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Imposto de renda pago");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Trabalhando em");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"XP ganha");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"habilidade economica obtida");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/,"Dias uteis consecutivos");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Producao base");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"modificadores de produtividade");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Total producao");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Unidades produzidas");
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Qualidade materia-prima");
		}
	}
}


//============================================================================
//Product Markets
//============================================================================
function doProductMarkets() {
	rr = {
		"1":["Any","algum"],
		"2":["Iron","Ferro"],
		"3":["Grain","Cereal"],
		"4":["Oil","Oleo"],
		"5":["Stone","Pedra"],
		"6":["Wood","Madeira"],
		"7":["Diam.","Diam."],
		"8":["Weap.","Arma"],
		"9":["House","Casa"],
		"10":["Gift","Prenda"],
		"11":["Food","Comida"],
		"12":["Ticket","Bilhete"],
		"13":["DS","DS"],
		"14":["Hosp.","hospital"]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"Mercado de produtos");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Mostrar ofertas:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Pais:");
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
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Mostrar minhas ofertas/Adicionar novas ofertas"]})
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produto");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Vendedor");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"Stock");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Preco");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Comprar");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," items "); 
// check	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Mostrar minhas ofertas/Adicionar novas ofertas"],
		"http://wiki.e-sim.org/index.php/Category:Products":["Products info","Informacao de produtos"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"Treino Militar");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		replaceInputByValue({"Train":["Train","Treinar"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Treino completo, volte amanha");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Ja treinaste hoje!");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Ja treinaste hoje. Pf volta amanha");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"forca ganha:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Detalhes militar");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Total de sessoes de treino:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"forca:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Posicao militar:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"total de dano feito:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Dano desarmado:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Dano com arma Q1:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"Dano com arma Q2:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"Dano com arma Q3:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"Dano com arma Q4:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"Dano com arma Q5:");
	
}

//===========================================================================
//Battles List 
//============================================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Batalhas");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Pais");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"Ordenar por:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Apenas batalhas subsidiadas:");
	
	replaceInputByValue({"Show battles":["Show battles","Mostrar batalhas"]});
	
    tmp = allElements.children[4].children[0].children[0]
    var loopz = tmp.children.length
    for (i = 1; i < loopz; i++) {
        obj = tmp.children[i].children[3];
        replaceBattleTime(obj);
    }
	
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Inicio da batalha");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Batalha");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"defensor vs atacante");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Resultado");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Total de dano feito");
	
	

	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	
}

//============================================================================
//Battle 
//============================================================================
function doBattle() {
	allElements = document.getElementById('battleBar').parentNode;
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Guerra de resistencia");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"Iniciada por");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Ronda $2");
	
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Rondas ganhas pelos defensores");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Rondas ganhas pelos atacantes");	

	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	// Top3
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"Top defensivo");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"Top atacante");
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Nao podes lutar nesta batalha do local onde te encontras");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"Precisas de viajar para o pais da batalha em questao para poder participar nela");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Nao podes lutar nesta batalha do local onde te encontras");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"Precisas de viajar para para um dos paises para participar na batalha ");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"Ronda ganha por :");
	} else {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Selecione arma:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Selecione o seu lado:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"Lutando pelo lado de:");
	}
	
	
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"Mostrar ronda:");
	}
	replaceInputByValue({"Show round":["Show round","Mostrar ronda"]});
	tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Mostrar Estatísticas de batalha global");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Tutorial de combate");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Regulamentos de batalha");
	
	}
	
//============================================================================
//Battle Statistics 
//============================================================================
function doBattleStatistics() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	replaceBattleInfo(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"Iniciada por");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Ronda $2 ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Rondas ganhas pelos defensores");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Rondas ganhas pelos atacantes");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Voltar para a batalha");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"Estatísticas sao geradas a cada 30 minutos");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle statistics/,"Estatísticas de batalhas");
}


//============================================================================
//Profile
//============================================================================
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /,"cidadao ");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"online");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"offline");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Editar perfil"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","Mudar nome"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","Reportar Multi"]
	});
	replaceInputByValue({"Report multi":["Report multi","Reportar Multi"]});

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match("Permanently")) {
		rowoffset = 2;
		tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"Banido permanentemente");
		tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"Razao:");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Banido por :");
	}
	

	tmp = allElements.children[0].children[2+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Nivel:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Dano:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"Posicao:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Habilidade economica:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"Forca:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Localizacao:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Naturalidade:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"Aniversario:");
	
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by XP:/,"Posicao nacional por XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by damage:/,"Posicao nacionar por dano:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by XP:/,"Posicao global por XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by damage:/,"Posicao global por dano");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Unidade militar:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Partido:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Jornal:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"Trabalhando em:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"Empresas proprias");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Cargo politico:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Sem unidade militar");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Sem partido");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Sem jornal");
	tmp.innerHTML=tmp.innerHTML.replace(/No work/,"Sem trabalho");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"Sem empresas proprias");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"sem cargos");
	
	allElements = getElements(document, "//ul[@style]");
	
	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
		tmp = allElements.snapshotItem(0).parentNode;
		if (tmp.innerHTML.match("Active debts")) {
			rowoffset = 2;
			tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"Debitos activos");
			tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g,"Validade de pagamento ");
			tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( game day)/g," $1");
		}
	}
	
	allElements = document.getElementById('medals');
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"Amigos");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Nova password:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Repetir nova password:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"antiga password:");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Novo avatar:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","tamanho maximo :");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19]
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Cidadao");
	replaceInputByValue({"Edit citizen":["Edit citizen","Editar cidadao"]});
}

//============================================================================
//Travel
//============================================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"Viajar");
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Pais");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"Regiao");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"Qualidade Bilhete:");
	
	replaceInputByValue({"Travel":["Travel","Viajar"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Traveling":["Traveling tutorial on wiki","Tutorial Viajar"]
	});
}


//============================================================================
//Inbox Messages
//============================================================================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"Mensagens recebidas: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"Mensagens enviadas: ");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Autor");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Mensagem");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Data");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Apagar");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"do");
	
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
		"Quick reply":["Quick reply","Responder rapidamente"],
		"Report":["Report","Reportar"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Reportar"],
		"Quick reply":["Quick reply","responder rapidamente"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","responder"],
		"conversation.html":["Previous messages","Mensagens anteriores"]
	});
	
}

//============================================================================
//Sent Messages
//============================================================================
function doSentMessages() {
	doMessagesComm();
	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Mensagens de entrada"],
		"composeMessage.html":["Compose Message","Escrever mensagem"]
	});
}

//============================================================================
//Compose Message
//============================================================================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Nova Mensagem");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Mensagens de entrada"],
		"sentMessages.html":["Sent messages","Mensagens enviadas"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Para:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Titulo:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mensagem:");
	
	replaceInputByValue({
		"Send":["Send","Enviar"],
		"Preview":["Preview","Pre-visualizar"]
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
		"subscribedNewspapers.html":["List of subscribed newspapers","Lista de jornais subscritos"]
	});
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Jornais subscritos");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Total subscritos");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Jornal");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"sub tempo");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Tutorial Jornal"]
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
		"editNewspaper.html":["Edit newspaper","editar jornal"],
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Tutorial Jornal"]
	});
	replaceInputByValue({
		"Publish":["Publish","Publicar"],
		"Preview":["Preview","Pre-visualizar"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Escrever novo artigo");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Publicar no pais");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Titulo do artigo:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mensagem:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"ATENCAO: guarde uma copia do artigo no disco do pc antes de enviar o artigo!");
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
	tmp.nodeValue=tmp.nodeValue.replace("max. size","Tamanho maximo:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Editar jornal"]
	});
	replaceInputByValue({
		"Edit newspaper":["Edit newspaper","Editar jornal"]
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
		"Edit":["Edit","Editar"],
		"Delete":["Delete","Apagar"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Novo comentario");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Editar artigo");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Titulo do artigo:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mensagem:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Editar jornal"],
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Tutorial Jornal"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","Editar artigo"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Modelo");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Contratos propostos (ultimos 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"feito por ");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sem contratos");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","Contratos aceites (Ultimos 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"feito por");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sem contratos");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Contratos rejeitados");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Rejeitado por $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sem contratos");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","Contratos falhados");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sem contratos");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Seus emprestimos activos");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","Devedor");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","dia de pagamento");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Soma");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Cancelar debito");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","Sem emprestimos");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Debitos Activos ");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","Emprestador");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Dia de pagamento");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Soma");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Pagar debito");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","Sem debito");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","Nome do modelo:");
	

	
	replaceLinkByHref({
		"http://wiki.e-sim.org/index.php/Contracts":["Contract tutorial","Tutorial contratos"],
		"#":["Create new template","Criar novo modelo"]
	});
	replaceInputByValue({
		"Delete":["Delete","Apagar"],
		"Create template":["Create template","Criar modelo"]
	});
	
}

//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"obrigacoes $1");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"obrigacoes do cidadao ficticio")
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/,"cidadao ficticio");

		} else {
			obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"obrigacoes $1")
		}
	}
	
		obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," vai instantaneamente doar o(s) seguinte(s) produto(s)");
		obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," vai instantaneamente doar o dinheiro");
		obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt/," vai ser cobrado dos seguintes debitos");
		obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"para pagar ate dia $1$3$5 (com $6 dias, desde o dia em o contrato foi assinado) por"
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
//======================================================================
// Contract Single
//======================================================================
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
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"Aceite");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"Rejeitado por $1 ");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"falhado");
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"Adicionar novo elemento ao contrato");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"lado");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"Tipo de item");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Cidadao ficticio");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","Dinheiro"],
			"Product":["Product","Produto"],
			"Debt":["Debt","Debito"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Dinheiro em  ( ");
		
		//Produc
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"Quantidade produto:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"Tipo produto:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Qualidade produto:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","Ferro"],
			"Grain":["Grain","Cereal"],
			"Oil":["Oil","Oleo"],
			"Stone":["Stone","Pedra"],
			"Wood":["Wood","Madeira"],
			"Diamonds":["Diamonds","Diamante"],
			"Weapon":["Weapon","Arma"],
			"House":["House","Casa"],
			"Gift":["Gift","Prenda"],
			"Food":["Food","Comida"],
			"Ticket":["Ticket","Bilhete"],
			"Defense System":["Defense System","Sistema defesa"],
			"Hospital":["Hospital","Hospital"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"Debito");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Dinheiro em ( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"Dia de pagamento:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Qualidade do produto:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"Propor Contrato");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Propor para");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"NOTA:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"Apenas podes propor contratos aos teus amigos!");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","cidadao ficticio"],
		"contracts.html":["Go back to contract list","Voltar a lista de contratos"]
	});
	replaceInputByValue({
		"Delete":["Delete","Apagar"],
		"Propose":["Propose","Propor"],
		"Add item":["Add item","Adicionar item"]
	});
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1)
	if (check.innerHTML.match("Cancel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"cancelar proposta")
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","cancelar proposicao"]});
	    }   
}
//================================================================================
// Monetary market
//================================================================================
function doMonetaryMarket() {
    var results
    var allElements
    results = getElements(document, "//TD[@width='410']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary Market/,"Mercado monetario")
    
    allElements = results.snapshotItem(0).children[2]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Current offers/,"ofertas correntes")
    
    allElements = results.snapshotItem(0).children[4]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Show Offers/,"Mostrar ofertas")
    
    allElements = results.snapshotItem(0).children[4]
    tmp = allElements.children[2]
    tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Trocar moedas")
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Comprar moeda")
    tmp.innerHTML = tmp.innerHTML.replace(/Sell currency/,"Vender moeda")
    tmp.innerHTML = tmp.innerHTML.replace(/View offers/,"Ver ofertas")
    
    allElements = results.snapshotItem(0).children[7]
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary market tutorial/,"Tutorial mercado monetario")
    
    results = getElements(document, "//table[@class='dataTable']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Vendedor");
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Quantidade");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Taxa");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy/,"Comprar");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Quantidade");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Ratio"); 
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Apagar");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"Sem ofertas");  
    
    results = getElements(document, "//TD[@style='border-left: 2px dashed #aaa']");
    
    allElements = results.snapshotItem(0).children[2]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers/,"Minhas ofertas") 
    
    allElements = results.snapshotItem(0).children[5]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Post your Offer/,"Insira sua oferta")
    
    tmp = allElements.children[2]
    tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Trocar moeda")
    
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Offered currency/,"Oferecer moeda")
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Comprar moeda")
    tmp.innerHTML = tmp.innerHTML.replace(/Exchange rate/,"Taxa de cambio")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Insira nova oferta")
    tmp.innerHTML = tmp.innerHTML.replace(/Offer/,"Oferta")
    tmp.innerHTML = tmp.innerHTML.replace(/at rate/,"em taxa")
    
}
//=============================================================================
// Citizen market offers
//=============================================================================
function doCitizenMarketOffers() {
    var results
    var allElements
    var tmp
    results = getElements(document, "//TD[@colspan='2']");
    allElements = results.snapshotItem(0).children[2]
    tmp = allElements.children[0]
    
    tmp.innerHTML = tmp.innerHTML.replace(/Marketplace/,"Mercado de produtos")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offers/,"Insira nova oferta")
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Pais")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produto")
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Quantidade")
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"preco")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Insira nova oferta")
    tmp.innerHTML = tmp.innerHTML.replace(/Show market offers/,"Mostrar ofertas de mercado");
    tmp.innerHTML = tmp.innerHTML.replace(/Your storage/,"Armazenamento");
    
    results = getElements(document, "//h3[@style='text-align: center']");
    allElements = results.snapshotItem(0)
    tmp = allElements
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers on market/,"Tuas ofertas no mercado")
    
    results = getElements(document, "//table[@style='width: 680px; margin-left: auto; margin-right: auto;']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produto")
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"vendedor");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock/,"Stock");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Preco");
    tmp.innerHTML = tmp.innerHTML.replace(/Gross/,"Bruto");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Preco");
    tmp.innerHTML = tmp.innerHTML.replace(/Net/,"Liquido");
    tmp.innerHTML = tmp.innerHTML.replace(/Import tax/,"Imposto de importacao");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Apagar");
    
}
// NEW
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Empresas");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Empresa")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produto")
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"Localizacao")
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"Trabalhadores")
    tmp.innerHTML = tmp.innerHTML.replace(/No companies/,"Sem empresas")
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"Criar nova empresa")
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Nome da empresa")
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"Tipo de produto")
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"Empresa Avatar")
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"Criar empresa")
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"Custo por criar empresa")
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"A empresa sera criada na mesma localizacao em que se encontra")
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources/,"Procurar regioes com recursos")
    tmp.innerHTML = tmp.innerHTML.replace(/click here/,"clicar aqui")
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"Tutorial empresa")
}
    
    
function doPoliticalStats() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Country Politics/,"Politica de paises");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Select country/,"Seleciona pais");
    tmp = allElements.children[2]
    tmp.innerHTML = tmp.innerHTML.replace(/President/,"Presidente");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/view elections/,"Ver eleicoes");
    replaceLinkByHref({"http://wiki.e-sim.org/en/President":["President","Presidente"]})
    tmp = allElements.children[9]
    tmp.innerHTML = tmp.innerHTML.replace(/Congress/,"congresso");
    replaceLinkByHref({"http://wiki.e-sim.org/en/Congress":["Congress","Congresso"]})
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Wars/,"Guerras");
    tmp = allElements.children[21]
    tmp.innerHTML = tmp.innerHTML.replace(/War/,"guerra");
    tmp.innerHTML = tmp.innerHTML.replace(/Details/,"Detalhes");
    tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"Sem guerras");
    tmp = allElements.children[22]
    tmp.innerHTML = tmp.innerHTML.replace(/War rules/,"Regulamento de guerra");
    tmp = allElements.children[23]
    tmp.innerHTML = tmp.innerHTML.replace(/Alliances/,"alianca");
    tmp = allElements.children[27]
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Pais");
    tmp.innerHTML = tmp.innerHTML.replace(/Expires/,"Expira"); 
    tmp = allElements.children[27].children[0]
    var loopz = tmp.children.length   
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[27].children[0].children[k].children[1]
    
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second)/g,"segundo ");
	        } else if (tmp.innerHTML.match("minute")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute)/g,"minuto ");
            } else if (tmp.innerHTML.match("hour")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour)/g,"hora ");
	        } else if (tmp.innerHTML.match("day")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day)/g,"dia ");
            } else if (tmp.innerHTML.match("month")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month)/g,"mes ");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds)/g,"$1 segundos ");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes)/g,"$1 minutos ");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours)/g,"$1 horas ");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days)/g,"$1 dias ");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months)/g,"$1 meses ");
            } 
        }
    }
    
    replaceLinkByHref({"http://wiki.e-sim.org/en/Alliances":["Alliances","aliancas"]})
    
} 

function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"Convidar amigos");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/,"Teu refferal link");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/,"envia este link a outros amigos para obter");
    tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"Tu ganhas");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who register/,"Gold por cada cidadao, que se registe");
    tmp.innerHTML = tmp.innerHTML.replace(/and earn level 7/,"e suba ate nivel 7 ");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"apos clicar neste link");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"e outro");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she get his\/her/,"gold quando ele/ela ganhe a sua");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/,"primeira medalha");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"adicionalmente ganhas");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"10% do gold que os jogadores recebem por medalhas e subidas de niveis");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive additional/,"nota que os teus amigos ganharao tambem");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering from your invitation when he reach level 7/,"gold adicional por registarem-se atraves do convite quando chegarem a nivel 7");
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"cidadaos que tu convidaste");
    tmp = allElements.children[5]
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"ordenar por");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"mostrar");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"cidadao");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"nivel");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"gold recebido");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"Dia de registo");
    
    TimeBasic(allElements,6,0,4)
    
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Statistics/,"Estatísticas");
    tmp.innerHTML = tmp.innerHTML.replace(/Total clicks on referral link/,"Total de cliques no referral link");
    tmp.innerHTML = tmp.innerHTML.replace(/Unique clicks on referral link/,"Cliques unicos no referral link");
    tmp.innerHTML = tmp.innerHTML.replace(/Total citizens registered/,"Total de cidadaos registados");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens who reached level 7/,"Cidadaos que ultrapassaram nivel 7");
    tmp = allElements.children[14]
    tmp.innerHTML = tmp.innerHTML.replace(/Latest clicks on referrer link/,"Ultimos cliques no referrer link");
    tmp = allElements.children[15]
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Tempo");
    tmp.innerHTML = tmp.innerHTML.replace(/Referrer/,"Referrer");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Cidadao");
    
    TimeBasic(allElements,15,0,0)
    
    tmp = allElements.children[15].children[0]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3]
        if (tmp.innerHTML.match(/Not registered/)) {		
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"Nao registado");
            }        
    }
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"Mostrar mais cliques");
    
    
}
//Ulepszyc
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l]
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/,"1 segundo atras");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"1 minuto atras");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"1 hora atras");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"1 dia atras");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"1 mes atras");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"$1 segundos atras");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"$1 minutos atras");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"$1 horas atras");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"$1 dias atras");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"$1 meses atras");
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
} else if (isTargetHtml("/monetaryMarket.html")) {
	doMonetaryMarket();
} else if (isTargetHtml("/citizenMarketOffers.html")) {
	doCitizenMarketOffers();
} else if (isTargetHtml("/companies.html")) {
	doCompany();
} else if (isTargetHtml("/countryPoliticalStatistics.html")) {
	doPoliticalStats();
} else if (isTargetHtml("/inviteFriends.html")) {
	doInviteFriends();
} else if (isTargetHtml("/subscription.html")) {
	doPremium();
}
