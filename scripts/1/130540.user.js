// ==UserScript==
// @name           e-sim Español (testing version)
// @namespace      e-sim Español (testing version)
// @include        http://e-sim.org*
// @version        1.21
// ==/UserScript==
//Traducido al español por Bucanero con la colaboración de Krieger

menuLinkReplacements = {
	"work.html"				:["Work","Trabajar"],
	"train.html"			:["Train","Entrenar"],
	"companies.html"		:["Companies","Empresas"],
	"newspaper.html"		:["Newspaper","Periodicos"],
	"myParty.html"			:["Party","Partido"],
	"contracts.html"		:["Contracts","Contratos"],
	"inviteFriends.html"	:["Invite friends","Invitar amigos"],
	"myMilitaryUnit.html"	:["Military unit","Unidad militar"],
	"subscription.html"     :["Premium account","Cuenta premium"],
	
	"productMarket.html"	:["Product market","Mercado"],
	"jobMarket.html"		:["Job market","Mercado laboral"],
	"monetaryMarket.html"	:["Monetary market","Mercado monetario"],
	"companiesForSale.html"	:["Companies for sale","Venta empresas"],
	
	"countryStatistics.html"		:["Country statistics","Est. Pais"],
	"partyStatistics.html"			:["Party statistics","Est. Partido"],
	"newspaperStatistics.html"		:["Newspaper statistics","Est. Periodico"],
	"citizenStatistics.html"		:["Citizen statistics","Est. Ciudadano"],
	"militaryUnitStatistics.html"	:["Military unit stats","Est. Ud. Militar"],
	"donations.html"		:["Donations","Donaciones"],
	"fundRaising.html?id=2"		:["New modules","Nuevos modulos"],

	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Articulos TOP"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Ultimos Articulos"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Eventos Militares"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Eventos Politicos"],
	
	"battles.html"							:["Battles","Batallas"],
	"countryPoliticalStatistics.html"		:["War and politics","Guerras y Politica ופוליטיקה"],
	"countryEconomyStatistics.html"			:["Economy","Economía"],
	"countryLaws.html"						:["Laws","Leyes"],
	"partyElections.html"					:["Party elections","Elecciones Partidos"],
	"congressElections.html"				:["Congress elections","Elecciones Congreso"],
	"presidentalElections.html"				:["Presidential elections","Elecciones Presidente"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Ciudadania"],
	"googleMap.html"						:["Map","Mapa"]
};


menuTextReplacements = {
	"myPlacesButton":["My places","Mis Lugares"],
	"marketButton":["Market","Mercado"],
	"statisticsButton":["Statistics","Estadisticas"],
	"newsButton":["News","Noticias"],
	"electionsButton":["Country","Pais"]
};


sideLink1Replacements = {
	"crossIcon"	:["Logout","Desconectar"],
	"workIcon"	:["Work","Trabajar"],
	"fightIcon"	:["Fight","Luchar"],
	"avatarIcon":["Upload avatar","Cargar Avatar"],
	"voteIcon"	:["Vote","Votar"]
};

sideLink2Replacements = {
	"travel.html"	:["Travel","Viajar"],
	"pendingCitizenshipApplications.html"	:["change","Cambiar"],
	"http://wiki.e-sim.org/en/Health"	:["Health tutorial","Tutorial vida"]
};

sideLink3Replacements = {
	"eatLink"	:["Eat food","Comer"],
	"useGiftLink":["Use gifts","Uso Regalos"]
};

sideLink4Replacements = {
	"eatButton":["Eat Food","Comer"],
	"useGiftButton":["Use gift","Usa Regalos"] 
};


hpTitleReplacements = {
	"News":["News","Noticias"],
	"Shouts":["Shouts","Gritos"],
	"Battles":["Battles","Batallas"],
	"Events":["Events","Eventos"]
};


hpTabsReplacements = {
	"#topArticles":["Global","Mundo"],
	"#latestArticles":["Latest","Ultimas"],
	"#localArticles":["Local","Local"],
	
	"#countryShouts":["Country","Pais"],
	"#friendsShouts":["Military unit","Unidad Militar"],
	"#myShouts":["Friends","Amigos"],
	
	"#localBattles":["Country","Pais"],
	"#substidedBattles":["Subsidized","Suvbención"],
	"#hotBattles":["Important","Importante"],

	"#localEvents":["Military","Militar"],
	"#globalEvents":["Military","Militar"],
	"#politicalEvents":["Political","Politica"]
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
	"http://wiki.e-sim.org/en/MonetaryMarket"	:["Monetary market tutorial","Tutorial Mercado Monetario"]
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
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1  Aliados");
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
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"No Aliados");
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
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Guerra Resistencia");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Suvbención:");
	}
}

function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"No Aliados");
	//12 allies
	if (obj.innerHTML.match("1 ally")) {
	    obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"1 Aliados");
    } else {
        obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 Aliados");
    }
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"Guerra Resistencia");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Suvbención:");
}

//Test, other ways possible
function replaceBattleTime(obj) {
    if (obj.innerHTML.match(/[\d\.]+/g)== 1) {
        if (obj.innerHTML.match("second ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"segundos antes");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"minutos antes");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"horas antes");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"días antes");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"meses antes");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"$1 segundos antes ");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"$1 minutos antes ");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"$1 horas antes");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"$1 dias antes");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"$1 meses antes");
        }
    }
}
//---------------------------------------------------
//Top, Latest, Local Art
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"hace un segundo");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"hace un minuto");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"hace una hora");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"hace un dia");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"hace un mes");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"$2 segundos antes");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"$2 minutos antes");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"$2 horas antes");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"$2 dias antes");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"$2 meses antes");
    }   
}

//---------------------------------------------------
//Subs 
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"segundos antes");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"minutos antes");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"horas antes");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"días antes");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"meses antes");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"$2 segundos antes");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"$2 minutos antes");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"$2 horas antes");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"$2 dias antes");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"$2 meses antes");
    }
    
}


//---------------------------------------------------
//  battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"Reciente");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"defensores:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"atacantes:");
	results = getElements(document, "//div[@style]");
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"Estadísticas ronda actual");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"Daño total defensores:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"Daño total atacantes:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Tu daño:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"Top Paises defensores:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"Top países atacantes:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"Top unidades militares defensoras:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"Top unidades militares atacantes:");
	obj.innerHTML=obj.innerHTML.replace(/(Rounds won by attacker)/,"Rondas ganadas por los atacantes");	
	obj.innerHTML=obj.innerHTML.replace(/(Rounds won by defender)/,"Rondas ganadas por los defensores");
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
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"hace un segundo");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"hace un minuto");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"hace un hora");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"hace un dia");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"hace un mes");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"hace $2 segundos");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"hace $2 minutos");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"hace $2 horas");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"hace $2 dias");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"hace $2 meses");
                } 
        }
    }
}
	    
replaceLinkByHrefSSS("#", {
    "Report":["Report","Reportar"],
    "Delete":["Delete","Delete"],
    "Edit":["Edit","Edita"],
    "More shouts":["More shouts","Mas gritos"]
});
	
	
replaceInputByValue({
    "Report":["Report","Reportar"],
    "Delete":["Delete","Borrar"],
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"Nivel: ");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"Rango:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Prox. Rango:");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Nivel Economico:");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"Fuerza:");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"Localización:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"Ciudadania:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"Límite comida:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"Límite regalos:");


	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Monedas");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Inventario");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Mensajes");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"tareas diarias");
	
	
	replaceLinkByHref(sideLink2Replacements);
	
	replaceLinkByID(sideLink3Replacements);
	
	replaceInputByID(sideLink4Replacements);
	
	replaceSpanByClass(sideLink1Replacements);
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Any")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any)/,"Any");
		}
		else if (obj.innerHTML.match("Poland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Poland)/,"Polonia");
		}
		else if (obj.innerHTML.match("Indonesia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Indonesia)/,"Indonesia");
		}
		else if (obj.innerHTML.match("Lithuania")) {
			obj.innerHTML=obj.innerHTML.replace(/(Lithuania)/,"Lituania");
		}
		else if (obj.innerHTML.match("Serbia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Serbia)/,"Serbia");
		}
		else if (obj.innerHTML.match("Bulgaria")) {
			obj.innerHTML=obj.innerHTML.replace(/(Bulgaria)/,"Bulgaria");
		}
		else if (obj.innerHTML.match("Israel")) {
			obj.innerHTML=obj.innerHTML.replace(/(Israel)/,"Israel");
		}
		else if (obj.innerHTML.match("Russia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Russia)/,"Rusia");
		}
		else if (obj.innerHTML.match("Slovenia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Slovenia)/,"Eslovenia");
		}
		else if (obj.innerHTML.match("Turkey")) {
			obj.innerHTML=obj.innerHTML.replace(/(Turkey)/,"Turquia");
		}
		else if (obj.innerHTML.match("Greece")) {
			obj.innerHTML=obj.innerHTML.replace(/(Greece)/,"Grecia");
		}
		else if (obj.innerHTML.match("Italy")) {
			obj.innerHTML=obj.innerHTML.replace(/(Italy)/,"Italia");
		}
		else if (obj.innerHTML.match("China")) {
			obj.innerHTML=obj.innerHTML.replace(/(China)/,"China");
		}
		else if (obj.innerHTML.match("Romania")) {
			obj.innerHTML=obj.innerHTML.replace(/(Romania)/,"Rumania");
		}
		else if (obj.innerHTML.match("Hungary")) {
			obj.innerHTML=obj.innerHTML.replace(/(Hungary)/,"Hungria");
		}
		else if (obj.innerHTML.match("Republic of Macedonia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Republic of Macedonia)/,"Macedonia");
		}
		else if (obj.innerHTML.match("Croatia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Croatia)/,"Croacia");
		}
		else if (obj.innerHTML.match("France")) {
			obj.innerHTML=obj.innerHTML.replace(/(France)/,"Francia");
		}
		else if (obj.innerHTML.match("Sweden")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sweden)/,"Suecia");
		}
		else if (obj.innerHTML.match("Ukraine")) {
			obj.innerHTML=obj.innerHTML.replace(/(Ukraine)/,"Ucrania");
		}
		else if (obj.innerHTML.match("Latvia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Latvia)/,"latvia");
		}
		else if (obj.innerHTML.match("Spain")) {
			obj.innerHTML=obj.innerHTML.replace(/(Spain)/,"España");
		}
		else if (obj.innerHTML.match("Brazil")) {
			obj.innerHTML=obj.innerHTML.replace(/(Brazil)/,"Brasil");
		}
		else if (obj.innerHTML.match("USA")) {
			obj.innerHTML=obj.innerHTML.replace(/(USA)/,"USA");
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
			obj.innerHTML=obj.innerHTML.replace(/(India)/,"India");
		}
		else if (obj.innerHTML.match("Netherlands")) {
			obj.innerHTML=obj.innerHTML.replace(/(Netherlands)/,"Holanda");
		}
		else if (obj.innerHTML.match("Bosnia and Herzegovina")) {
			obj.innerHTML=obj.innerHTML.replace(/(Bosnia and Herzegovina)/,"Bosnia Herzegovina");
		}
		else if (obj.innerHTML.match("Iran")) {
			obj.innerHTML=obj.innerHTML.replace(/(Iran)/,"Iran");
		}
		else if (obj.innerHTML.match("Finland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Finland)/,"Finlandia");
		}
		else if (obj.innerHTML.match("Germany")) {
			obj.innerHTML=obj.innerHTML.replace(/(Germany)/,"Alemania");
		}
		else if (obj.innerHTML.match("Mexico")) {
			obj.innerHTML=obj.innerHTML.replace(/(Mexico)/,"Mexico");
		}
		else if (obj.innerHTML.match("Canada")) {
			obj.innerHTML=obj.innerHTML.replace(/(Canada)/,"קנדה");
		}
		else if (obj.innerHTML.match("Taiwan")) {
			obj.innerHTML=obj.innerHTML.replace(/(Taiwan)/,"Canada");
		}
		else if (obj.innerHTML.match("Ireland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Ireland)/,"Irlanda");
		}
		else if (obj.innerHTML.match("Australia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Australia)/,"Australia");
		}
		else if (obj.innerHTML.match("South Korea")) {
			obj.innerHTML=obj.innerHTML.replace(/(South Korea)/,"Corea del Sur");
		}
		else if (obj.innerHTML.match("Switzerland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Switzerland)/,"Suiza");
		}
		else if (obj.innerHTML.match("All countries")) {
			obj.innerHTML=obj.innerHTML.replace(/(All countries)/,"Todos los paises");
		}
		else if (obj.innerHTML.match("Select product...")) {
			obj.innerHTML=obj.innerHTML.replace(/(Select product...)/,"Elegir Producto...");
		}
		else if (obj.innerHTML.match("Iron")) {
			obj.innerHTML=obj.innerHTML.replace(/(Iron)/,"Hierro");
		}
		else if (obj.innerHTML.match("Grain")) {
			obj.innerHTML=obj.innerHTML.replace(/(Grain)/,"Grano");
		}
		else if (obj.innerHTML.match("Oil")) {
			obj.innerHTML=obj.innerHTML.replace(/(Oil)/,"Oil");
		}
		else if (obj.innerHTML.match("Stone")) {
			obj.innerHTML=obj.innerHTML.replace(/(Stone)/,"Piedra");
		}
		else if (obj.innerHTML.match("Madera")) {
			obj.innerHTML=obj.innerHTML.replace(/(Wood)/,"Madera");
		}
		else if (obj.innerHTML.match("Diamonds")) {
			obj.innerHTML=obj.innerHTML.replace(/(Diamonds)/,"Diamante");
		}
		else if (obj.innerHTML.match("Weapon")) {
			obj.innerHTML=obj.innerHTML.replace(/(Weapon)/,"Arma");
		}
		else if (obj.innerHTML.match("House")) {
			obj.innerHTML=obj.innerHTML.replace(/(House)/,"Casa");
		}
		else if (obj.innerHTML.match("Gift")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift)/,"Regalo");
		}
		else if (obj.innerHTML.match("Food")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food)/,"Comida");
		}
		else if (obj.innerHTML.match("Ticket")) {
			obj.innerHTML=obj.innerHTML.replace(/(Ticket)/,"Billete");
		}
		else if (obj.innerHTML.match("Defense System")) {
			obj.innerHTML=obj.innerHTML.replace(/(Defense System)/,"Sistema Defensa");
		}
		else if (obj.innerHTML.match("Hospital")) {
			obj.innerHTML=obj.innerHTML.replace(/(Hospital)/,"Hospìtal");
		}
		else if (obj.innerHTML.match("All parties")) {
			obj.innerHTML=obj.innerHTML.replace(/(All parties)/,"Todo");
		}
		else if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"Ronda actual");
		} else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"Ronda $2 ");
		} else if (obj.innerHTML.match("Food ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Tipo Comida");
		} else if (obj.innerHTML.match("Gift ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Tipo Regalo");
		} else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"Sin Arma");
		} else if (obj.innerHTML.match("Any quality")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"Cualquier calidad");
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
		"Show more battles":["Show more battles","Mas Batallas"],
		"Subsidies informations":["Subsidies informations","Información Subvenciones"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"batallas sin subvención");
        }	
    }
	
	
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/," Ordenes Unidad Militar:");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Lucha por:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"minuto antes");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"hora antes");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"dia antes");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"mes antes חודש");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"$1 minutos antes");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"$1 horas antes");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"$1 dias antes");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"$1 meses antes");
        }
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z- ]*)( in the battle versus )/g,"$2 en la batalla contra ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"$2 comenzó una resistencia en $5 $4");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"fue atacada por $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"propuesto declarar la Guerra a $5$6 ");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," Ha declarado la guerra a $2$3 ");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," en la batalla contra ");
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/g," tiene un nuevo Presidente");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","Mostrar más eventos"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Mostrar más eventos");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"escribir nuevo grito:");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="valor!";
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Enviar a:");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Enviar a:");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," Pais $2  Unidad Militar $4 Amigos");

	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Más gritos"] });
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Mercado Laboral");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Criterio de busqueda:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Pais:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Nivel Economico:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Empresario");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Empresa");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Producto");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Nivel Militar");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Salario");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Aplicar");
	
	replaceInputByValue({"Apply":["Apply","אישור"],"Show":["Show","הראה"]});
}

//===============
//Work
//===============
function doWork() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"Trabajar");
	
	if (allElements.innerHTML.match(/You have no job^\./)) {
		xxx = document.getElementById('command').parentNode.children[0];
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"No tienes trabajo");
		replaceInputByValue({"Get a job now!":["Get a job now!","Busca un trabajo ahora!"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/," Necesitas estar en el pais de la empresa para trabajar ");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Lugar de trabajo");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Empresario");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Salario:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Dejar el trabajo");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"Hoy no has trabajado");
			replaceInputByValue({"Work now":["Work now","Trabajar ahora"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Resultados del trabajo de hoy");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Salario bruto");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Salario neto");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Impuestos pagados");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Trabajó en");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"Aumento Exp");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Nivel economico");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/," Dias seguidos trabajados ");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Base de productividad");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Bonus de productividad");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Total producido");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Unidades producidas");
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Calidad empra de RAW");
		}
	}
}


//====================
//Product Markets
//====================
function doProductMarkets() {
	rr = {
		"1":["Any","Any"],
		"2":["Iron","Hierro"],
		"3":["Grain","Grano"],
		"4":["Oil","Oil"],
		"5":["Stone","Piedra"],
		"6":["Wood","Madera"],
		"7":["Diam.","Diam."],
		"8":["Weap.","Armas"],
		"9":["House","Casas"],
		"10":["Gift","Regalos"],
		"11":["Food","Comida"],
		"12":["Ticket","Billete"],
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
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Pais:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Calidad:");
	
	replaceInputByValue({"View offers":["View offers","Ver ofertas"],"Buy":["Buy","Comprar"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Mis ofertas/ Nueva oferta"]});
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Producto");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Vendedor");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"Disponible");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Precio");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Comprar");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g,"Cantidad"); 
// check	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Mis ofertas/ Nueva oferta"],
		"http://wiki.e-sim.org/en/Category:Products":["Products info","Informacion Productos"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"Entrenamiento Militar");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		replaceInputByValue({"Train":["Train","Entrenar"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Entrenamiento terminado, vuelve mañana");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Ya has entrenado hoy");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Ya has entrenado hoy, vuelve mañana.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Aumento fuerza:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Detalles militares");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Total de entrenamientos:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Fuerza:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Rango:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Total daño realizado:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Daño sin armas::");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Daño con armas Q1:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/," Daño con armas Q2:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/," Daño con armas Q3:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/," Daño con armas Q4:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/," Daño con armas Q5:");
	
}

//=================
//Battles List 
//=================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Batallas");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Pais");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"Clasificacion:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Solamente Batallas subvencionadas:");
	
	replaceInputByValue({"Show battles":["Show battles","Mostrar batallas"]});

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Sorting by start time")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sorting by start time)/,"Buscar por comienzo de la batalla");
		} else if (obj.innerHTML.match("Sorting by subsidy size")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sorting by subsidy size)/,"Buscar por importe subvención");
		} else if (obj.innerHTML.match("Sorting by total damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sorting by total damage)/,"Buscar por daño total");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Comienzo de la batalla");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Batalla");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"defensor contra atacante");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Puntuación");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Total daño realizado");
	
	

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
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Guerra de Resistencia");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"Comenzada por");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Ronda $2");

	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	// Top3
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"Top defensores");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"Top atacantes");
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/," No se puede luchar en esta batalla desde su ubicación actual.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/," Debe viajar al país de los ocupantes para participar en la batalla");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/," No se puede luchar en esta batalla desde su ubicación actual.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/," Debe viajar a uno de los países participantes en la batalla.");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"esta ronda fue ganada por :");
	} else {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Elegir arma:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Elegir lado:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"Estás luchando por:");
	}
	
	
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"Mostrar ronda:");
	}
	replaceInputByValue({"Show round":["Show round","Mostrar ronda"]});
	replaceInputByValue({"Fight (1 hit)":["Fight (1 hit)","Luchar: 1 golpe "]});
	replaceInputByValue({"Berserk! (5 hits)":["Berserk! (5 hits)","BerserK (5 golpes)"]}); 
	tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/," Mostrar las estadísticas generales de batalla ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show military units supporting this battle)/," Mostrar las unidades militares que apoyan esta batalla ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Tutorial de luchas en la wiki");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Reglas de batalla");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buildings active during this round)/," Edificios activos durante esta ronda ");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"comenzada por");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Round $2 ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Rondas ganadas por el defensor ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Rondas ganadas por el atacante ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Volver a la batalla");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"Estadisticas generadas una vez cada 30 minutos");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle statistics/,"Estadisticas de la batalla");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"comenzada por");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Ronda $2 ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Rondas ganadas por el defensor ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Rondas ganadas por el atacante ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Volver a la batalla");

	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Supporting military units/,"Apoyo de las unidades militares");
	tmp.innerHTML=tmp.innerHTML.replace(/(Defender's supporters)/,"Partidarios del defensor");
	tmp.innerHTML=tmp.innerHTML.replace(/(Attacker's supporters)/,"Partidarios del atacante");
}


//=============
//Profile
//=============
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /," Ciudadano ");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"Conectado");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"Desconectado");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Editar perfil"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","Cambiar nombre"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","Reportar multi"]
	});
	replaceInputByValue({"Report multi":["Report multi","Reportar multi"]});

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match("Permanently")) {
		rowoffset = 2;
		tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"Baneado permanentemente");
		tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"Razon:");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Baneado por:");
	}
	

	tmp = allElements.children[0].children[2+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Nivel:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"Exp:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Daño");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"Rango:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Nivel economico:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"Fuerza:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Localización:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Ciudadania:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"Nació el:");
	
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by XP:/," Ranking Nacional por EXP:");
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by damage:/," Ranking Nacional por daño:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by XP:/," Ranking Mundial por EXP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by damage:/," Ranking Mundial por daño:");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Unidad militar:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Afiliado a:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Periodico:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"Trabaja en:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"Dueño de empresas");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Cargo politico:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Sin Unidad militar");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Sin afiliacion");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Sin periodico");
	tmp.innerHTML=tmp.innerHTML.replace(/No work/,"Sin trabajo");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"Sin empresas");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"Sin cargo");
	
	allElements = getElements(document, "//ul[@style]");
	
	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
		tmp = allElements.snapshotItem(0).parentNode;
		if (tmp.innerHTML.match("Active debts")) {
			rowoffset = 2;
			tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"Deudas asctivas");
			tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g,"Día de pago,");
			tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( game day)/g," día $1 de e-sim ");
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
	tmp.innerHTML=tmp.innerHTML.replace(/Mail:/,"Email:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Nueva contraseña:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Repita nueva contraseña:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"Contraseña antigua:");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Nuevo avatar:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","Tamaño maximo:");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Ciudadano");
	replaceInputByValue({"Edit citizen":["Edit citizen","Editar ciudadano"]});
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
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Pais");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"Región:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"Calidad billete:");
	
	replaceInputByValue({"Travel":["Travel","Viajar"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Traveling":["Traveling tutorial on wiki","Tutorial viajes en la wiki"]
	});
}


//==================
//Inbox Messages
//==================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"Mensajes recibidos: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"Mensajes enviados: ");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Autor");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Mensage");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Fecha");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Borrar");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"A");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		replaceBattleTime(tmp.children[i].children[2]);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","Mensajes enviados"],
		"composeMessage.html":["Compose message","Redactar mensaje"]
	});
	replaceInputByValue({
		"Delete":["Delete","Borrar"],
		"Quick reply":["Quick reply","Respuesta rápida"],
		"Report":["Report","Reportar"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Reportar"],
		"Quick reply":["Quick reply","Respuesta rápida"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","Responder"],
		"conversation.html":["Previous messages","Mensajes anteriores"]
	});
	
}

//=================
//Sent Messages
//=================
function doSentMessages() {
	doMessagesComm();
	replaceLinkByHref({
		"inboxMessages.html":["Bandeja de entrada","הודעות נכנסות"],
		"composeMessage.html":["Compose Message","Redactar mensaje"]
	});
}

//===================
//Compose Message
//===================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Nuevo mensaje");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Bandeja de entrada"],
		"sentMessages.html":["Sent messages","Mensajes enviados"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Destinatario:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Asunto:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mensaje:");
	
	replaceInputByValue({
		"Send":["Send","Enviar"],
		"Preview":["Preview","Previsualizar"]
	});
}


//=================
//Subscriptions
//=================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"Suscripciones");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/," Suscripciones ");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","Lista de periódicos suscritos"]
	});
}

//==========================
//Subscribed Newspapers
//==========================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Periodicos suscritos");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Total suscritos");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Periodico");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"Sus./desde");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Tutorial periódico en la wiki"]
	});
}

//===============
//Newspaper
//===============
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Periódico");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"Articulos recientes");
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Editar periódico"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Tutorial periódico en la wiki"]
	});
	replaceInputByValue({
		"Publish":["Publish","Publicar"],
		"Preview":["Preview","Vista previa"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Escribir nuevo artículo");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Publicar en el país");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Título articulo:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mensaje:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/," Por favor, guarde una copia del artículo en su disco duro antes de enviarlo!!!");
	}
}

//===================
//Edit Newspaper
//===================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Nombre periodico:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Nuevo avatar:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","Tamaño max.:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Editar periódico"]
	});
	replaceInputByValue({
		"Delete":["Edit newspaper","Editar periódico"]
	});
}

//===============
//Article
//===============
function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"Articulo");
	
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","Editar articulo"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Editar periódico"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Reportar"],
		"Edit":["Edit","Editar"],
		"Delete":["Delete","Borrar"]
	});
	replaceInputByValue({
		"Publish":["Publish","Publicar"],
		"Report":["Report","Reportar"],
		"Edit":["Edit","Editar"],
		"Delete":["Delete","Borrar"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Nuevo comentario");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mensaje:");
}

//=================
//Edit Article
//=================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Periódico");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Editar articulo");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Titulo articulo:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mensaje:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Editar periódico"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Tutorial periodic en la wiki"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","Editar articulo"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Plantillas");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Contratos propuestos (últimos 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"Ofrecido a");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sin contratos");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)"," Contratos aceptados (últimos 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"Ofrecido a");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sin contratos");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Contratos rechazados");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Rechazo por $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sin contratos");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","Contratos fallados");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Sin contratos");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Prestamos activos");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","Deudor");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Cancelación");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Importe");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Cancelar deuda");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","Sin prestamos");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Deudas activas");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","Prestado por");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Cancelación");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Importe");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Pagar deuda");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","Sin deudas");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","Nombre plantilla:");
	

	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Contracts":["Contract tutorial","Tutorial de contratos"],
		"#":["Create new template","Crear plantilla"]
	});
	replaceInputByValue({
		"Delete":["Delete","Borrar"],
		"Create template":["Create template","Crear plantilla"]
	});
	
}

//=================
//Contract detail
//=================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"Obligaciones $1");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"Obligaciones ciudadano");
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/,"Ciudadano");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"obligaciones $1");
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," Donará inmediatamentelos siguientes productos ");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," Donará inmediatamente la siguiente suma de dinero ");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt/," le será cargada la siguiente deuda ");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		" Debe pagar $1$3$5 de día ($6 días después de la firma del contrato "
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
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"Estado contrato: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"Aceptado");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"Rechazado por $1 ");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"Fallado");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"Plantilla");
	
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"Añadir nuevo elemento al contrato");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"צד");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"Tipo articulo");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Ciudadano");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","Moneda"],
			"Product":["Product","Producto"],
			"Debt":["Debt","Deuda"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Moneda ( ");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"Cantidad de Uds.:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"Tipo:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Calidad:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","Hierro"],
			"Grain":["Grain","Grano"],
			"Oil":["Oil","Oil"],
			"Stone":["Stone","Piedra"],
			"Wood":["Wood","Madera"],
			"Diamonds":["Diamonds","Diamante"],
			"Weapon":["Weapon","Arma"],
			"House":["House","Casa"],
			"Gift":["Gift","Regalo"],
			"Food":["Food","Comida"],
			"Ticket":["Ticket","Billete"],
			"Defense System":["Defense System","Sistema defensa"],
			"Hospital":["Hospital","Hospital"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"Deuda");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Moneda ( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"Día pago:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Calidad:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"Propuesta de contrato");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Propuesto a");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"Nota:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/," Solamente puede proponer Contratos a sus amigos ");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","Ciudadano"],
		"contracts.html":["Go back to contract list","Volver a lista contratos"]
	});
	replaceInputByValue({
		"Delete":["Delete","Borrar"],
		"Propose":["Propose","Proponer"],
		"Add item":["Add item","Añadir Producto"]
	});
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1);
	if (check.innerHTML.match("Cancel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"Cancelar propuesta");
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","Cancelar proposición"]});
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
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary Market/,"Mercado monetario");
    
    allElements = results.snapshotItem(0).children[2];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Current offers/,"Ofertas actuales");
    
    allElements = results.snapshotItem(0).children[4];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Show Offers/,"Mostrar ofertas");
    
    allElements = results.snapshotItem(0).children[4];
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Intercambio");
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Comprar moneda");
    tmp.innerHTML = tmp.innerHTML.replace(/Sell currency/,"Vender moneda");
    tmp.innerHTML = tmp.innerHTML.replace(/View offers/,"Ver ofertas");
    
    allElements = results.snapshotItem(0).children[7];
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary market tutorial/,"Tutorial mercado monetario");
    
    results = getElements(document, "//table[@class='dataTable']");
    allElements = results.snapshotItem(0).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Vender");
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Cantidad");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Ratio");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy/,"Comprar");
    
    allElements = results.snapshotItem(1).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Cantidad");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Ratio"); 
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Borrar");
    
    allElements = results.snapshotItem(1).children[0];
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"Sin ofertas");  
    
    results = getElements(document, "//TD[@style='border-left: 2px dashed #aaa']");
    
    allElements = results.snapshotItem(0).children[2];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers/,"Tus ofertas") ;
    
    allElements = results.snapshotItem(0).children[5];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Post your Offer/,"Publicar oferta");
    
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/," Intercambio ");
    
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Offered currency/,"Oferta moneda");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Comprar moneda");
    tmp.innerHTML = tmp.innerHTML.replace(/Exchange rate/,"Tipo de cambio");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Publicar nueva oferta");
    tmp.innerHTML = tmp.innerHTML.replace(/Offer/,"Oferta");
    tmp.innerHTML = tmp.innerHTML.replace(/at rate/,"Al cambio");
    
}

//===============
//MilitaryUnit
//===============

function doMilitaryUnit() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit)/,"Unidad militar");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(You are not in any military unit)/,"No perteneces a una Unidad militar");
	tmp.innerHTML=tmp.innerHTML.replace(/(Join existing one)/,"Entra en una");
	tmp.innerHTML=tmp.innerHTML.replace(/(Create military unit)/,"Crea Unidad militar");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(You need to have level)/,"Necesitas tener nivel");
	tmp.innerHTML=tmp.innerHTML.replace(/(to join military unit)/,"para entrar en la Unidad militar");
		
	tmp = allElements.children[4];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Almacen");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Donaciones");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Editar Unidad militar");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Privilegios");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Cuenta de  monedas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Ofrecer trabajo");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Reclutar");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"Solicitudes pendientes");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"ver logs");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Pais");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Rango militar");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Total de Soldados");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Max Soldados");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Total daño en batallas");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Daño hoy");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Lider");
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Almacen");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Donaciones");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%9E%D7%97%D7%A1%D7%9F)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%AA%D7%A8%D7%95%D7%9E%D7%95%D7%AA)/,"Donations");
	replaceInputByValue({"Leave military unit":["Leave military unit","Abandonar unidad militar"]});
	
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(Description)/,"Descripción");
	
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Current orders)/,"Ordenes actuales");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle:)/,"Batalla:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Guerra de resistencia");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Subvención:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Side:)/,"Lado:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Briefing:)/,"Información:");
	tmp.innerHTML=tmp.innerHTML.replace(/(visible for members only)/,"Solamente visible para soldados");
	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	replaceAlliesLinksss();
//	for( var i=0; i<2;i++){
//	tmp.innerHTML=tmp.innerHTML.replace(/(: none)/,": ninguno");
	//tmp.innerHTML=tmp.innerHTML.replace(/(no allies)/,"Sin aliados");
	//}
	tmp.innerHTML=tmp.innerHTML.replace(/(battle won by)/,"Batalla ganada por");
	replaceInputByValue({"Edit_orders":["Edit_orders","Editar ordenes"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Set today's battle)/,"Seleccionar batalla de hoy");
	tmp.innerHTML=tmp.innerHTML.replace(/(No battles at this moment)/,"Sin batallas en este momento");
	
	
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Soldados");
	tmp.innerHTML=tmp.innerHTML.replace(/(View)/,"Ver");
	tmp.innerHTML=tmp.innerHTML.replace(/(manage members)/,"Control Soldados");
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies)/,"Empresas");
	tmp.innerHTML=tmp.innerHTML.replace(/(No companies)/,"Sin empresas");
	
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/(Latest clicks on referrer link)/,"últimos clicks en enlace de referidos");
	
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace(/(Time)/,"Días");
	tmp.innerHTML=tmp.innerHTML.replace(/(Referrer)/,"Referido");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen)/,"Ciudadano");
	
	tmp = allElements.children[17];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show more clicks)/,"Mostrar más clicks");
	
}

//================
//CompanyMarket
//================

function doCompMarket() {
	var allElements;

	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies for sale)/,"Empresas en venta");
	
	rr = {
		"1":["Any","Any"],
		"2":["Iron","Hierro"],
		"3":["Grain","Grano"],
		"4":["Oil","Oil"],
		"5":["Stone","Piedra"],
		"6":["Wood","Madera"],
		"7":["Diam.","Diam."],
		"8":["Weap.","Armas"],
		"9":["House","Casa"],
		"10":["Gift","Regalo"],
		"11":["Food","Comida"],
		"12":["Ticket","Billete"],
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
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Calidad:");
	tmp.innerHTML=tmp.innerHTML.replace("No offers","Sin ofertas");
	
	replaceInputByValue({"View offers":["View offers","Ver ofertas"],"Buy":["Buy","Comprar"]});
	
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Company","Empresa");
	tmp.innerHTML=tmp.innerHTML.replace("Product","Producto");
	tmp.innerHTML=tmp.innerHTML.replace("Location","Localización");
	tmp.innerHTML=tmp.innerHTML.replace("Seller","Vendedor");
	tmp.innerHTML=tmp.innerHTML.replace("Price","Precio");
	tmp.innerHTML=tmp.innerHTML.replace("Buy","Comprar");
	for (var i = 0; i < 10; i++) {
	tmp.innerHTML=tmp.innerHTML.replace("Employer","Dueño");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Country statistics)/,"Estadisticas País");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Tipo de estadisticas:");
	replaceInputByValue({"Show":["Show","Mostrar"]});
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total:)/,"Total:");
	tmp = allElements.children[6];
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"No");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens)/,"Ciudadanos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage)/,"Daño total");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage today)/,"Daño hoy");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/,"EXP");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength)/,"Fuerza");
	tmp.innerHTML=tmp.innerHTML.replace(/(New citizens today)/,"Nuevos ciudadanos hoy");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens online)/,"Ciudadanos conectados");
	tmp.innerHTML=tmp.innerHTML.replace(/(Productivity)/,"Productividad");
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Citizens")) {
			obj.innerHTML=obj.innerHTML.replace(/(Citizens)/,"Ciudadanos");
		} else if (obj.innerHTML.match("Total damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Total damage)/,"Daño total");
		} else if (obj.innerHTML.match("Damage today")) {
			obj.innerHTML=obj.innerHTML.replace(/(Damage today)/,"Daño hoy");
		} else if (obj.innerHTML.match("xp")) {
			obj.innerHTML=obj.innerHTML.replace(/(xp)/,"EXP");
		} else if (obj.innerHTML.match("Strength")) {
			obj.innerHTML=obj.innerHTML.replace(/(Strength)/,"Fuerza");
		} else if (obj.innerHTML.match("New citizens today")) {
			obj.innerHTML=obj.innerHTML.replace(/(New citizens today)/,"Nuevos ciudadanos hoy");
		} else if (obj.innerHTML.match("Citizens online")) {
			obj.innerHTML=obj.innerHTML.replace(/(Citizens online)/,"Ciudadanos conectados");
		} else if (obj.innerHTML.match("Productivity")) {
			obj.innerHTML=obj.innerHTML.replace(/(Productivity)/,"Productividad");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Party statistics)/,"Estadisticas Partido");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");
	replaceInputByValue({"Show":["Show","Mostrar"]});
	replaceInputByValue({"Leave party":["Leave party","Dejar partido"]});
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Nס");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partido");
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Miembros");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Newspaper statistics)/,"Estadisticas periodico");
	
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Nס");
	tmp.innerHTML=tmp.innerHTML.replace(/(Redactor)/,"Redactor");
	tmp.innerHTML=tmp.innerHTML.replace(/(Newspaper)/,"Periodico");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subs)/,"Suscrip.");

	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen statistics)/,"Estadisticas Ciudadanos");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Tipo estadistica:");
	replaceInputByValue({"Show":["Show","Mostrar"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Nס");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen)/,"Ciudadano");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage)/,"Daño");
	tmp.innerHTML=tmp.innerHTML.replace(/(Today damage)/,"Daño total");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/,"EXP");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength)/,"Fuerza");
	tmp.innerHTML=tmp.innerHTML.replace(/(Achievements)/,"Logros");
	obj = results.snapshotItem(i);
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Damage)/,"Daño");
		} else if (obj.innerHTML.match("Today damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Today damage)/,"Daño total");
		} else if (obj.innerHTML.match("xp")) {
			obj.innerHTML=obj.innerHTML.replace(/(xp)/,"EXP");
		} else if (obj.innerHTML.match("Strength")) {
			obj.innerHTML=obj.innerHTML.replace(/(Strength)/,"Fuerza");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit statistics)/,"Estadisticas UM");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Tipo estadisticas:");
	replaceInputByValue({"Show":["Show","Mostrar"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Pais");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Nס");
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Miembros");
	tmp.innerHTML=tmp.innerHTML.replace(/(Name)/,"Nombre");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank)/,"Rango");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage)/,"Daño total");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage today)/,"Daño hoy");
	tmp.innerHTML=tmp.innerHTML.replace(/(Value)/,"Valor");

	obj = results.snapshotItem(i);
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Total damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Total damage)/,"Daño total");
		} else if (obj.innerHTML.match("Damage today")) {
			obj.innerHTML=obj.innerHTML.replace(/(Damage today)/,"Daño hoy");
		} else if (obj.innerHTML.match("Total members")) {
			obj.innerHTML=obj.innerHTML.replace(/(Total members)/,"Total solados");
		} else if (obj.innerHTML.match("Gold value")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gold value)/,"Valor en Oros");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(News)/,"Noticias");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show News:)/,"Mostrar Noticias:");
	tmp.innerHTML=tmp.innerHTML.replace(/(News Type)/,"Tipo noticias");
	replaceInputByValue({"View news":["View news"," Ver noticias"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"País");

	var results;
	results = getElements(document, "//table[@class='dataTable paddedTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Top articles)/,"Top articulos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Latest articles)/,"Ultimos articulos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military events)/,"Eventos militares");
	tmp.innerHTML=tmp.innerHTML.replace(/(Political events)/,"Eventos politicos");

		
		obj = results.snapshotItem(i);
	}
		for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	
		allElements = results.snapshotItem(i);
		for (var i = 0; i < 10; i++) {
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( minute[s]* ago)/g,"minutos $1 antes");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( hour[s]* ago)/g,"horas $1 antes");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( day[s]* ago)/g,"días $1 antes");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( month[s]* ago)/g,"meses $1 antes");
		allElements.innerHTML=allElements.innerHTML.replace(/(Posted)/g," ");
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z ]*)( in the battle versus )/g,"$2 en la batalla contra");
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )/g,"Asegurado");
		allElements.innerHTML=allElements.innerHTML.replace(/( in the battle versus )/g," En la batalla contra");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"$2 comenzado una resistencia en $5 $4");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"fué atacada por $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"propuesto declarar la guerra a $5$6");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g,"ha declarado la guerra a $2$3");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )/,"conquistado");
	allElements.innerHTML=allElements.innerHTML.replace(/( in the battle versus )/,"  en la batalla contra");
	allElements.innerHTML=allElements.innerHTML.replace(/(Money donation of)/,"Donación de dinero");
	allElements.innerHTML=allElements.innerHTML.replace(/(was accepted)/,"fué aceptada");
	allElements.innerHTML=allElements.innerHTML.replace(/(was proposed in congress)/,"fué propuesto en el congreso");
	allElements.innerHTML=allElements.innerHTML.replace(/(Issuing)/,"Emitido");
	allElements.innerHTML=allElements.innerHTML.replace(/(wurde akzeptiert by congress)/,"emission fué aceptada por el Congreso");
	allElements.innerHTML=allElements.innerHTML.replace(/(Hospital was deployed in)/,"Hospital fué colocado en:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Defense System was deployed in)/,"Sistema de defensa fué colocado en:");
	allElements.innerHTML=allElements.innerHTML.replace(/(New taxes for)/,"Nuevas taxas para");
	allElements.innerHTML=allElements.innerHTML.replace(/(President of)/,"Presidente de");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed to deploy)/,"Propuesta de instalar");
	allElements.innerHTML=allElements.innerHTML.replace(/(Defense System in)/,"Sitema de defensa en:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Hospital in)/,"Hospital en:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Impeachment of president of)/,"destitución del Presidente de");
	allElements.innerHTML=allElements.innerHTML.replace(/(was proposed)/,"Fué propuesta");
	allElements.innerHTML=allElements.innerHTML.replace(/(signed MPP with)/,"Firma de MPP con:");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed mutual protection pact to)/,"propuesta de pacto de mutua protección a :");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed a peace treaty to)/," propuesta de tratado de paz a:");
	allElements.innerHTML=allElements.innerHTML.replace(/(were accepted in)/,"fueron aceptadas en:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Import tax)/,"Taxa de importación");
	allElements.innerHTML=allElements.innerHTML.replace(/(Food)/,"Comida");
	allElements.innerHTML=allElements.innerHTML.replace(/(Gift)/,"Regalo");
	allElements.innerHTML=allElements.innerHTML.replace(/(Weapon)/,"Arma");
	allElements.innerHTML=allElements.innerHTML.replace(/(Ticket)/,"Billete");
	allElements.innerHTML=allElements.innerHTML.replace(/(Stone)/,"Piedra");
	allElements.innerHTML=allElements.innerHTML.replace(/(Wood)/,"Madera");
	allElements.innerHTML=allElements.innerHTML.replace(/(Grain)/,"Grano");
	allElements.innerHTML=allElements.innerHTML.replace(/(Iron)/,"Hierro");
	allElements.innerHTML=allElements.innerHTML.replace(/(Oil)/,"Oil");
	allElements.innerHTML=allElements.innerHTML.replace(/(House)/,"Casa");
	allElements.innerHTML=allElements.innerHTML.replace(/(Diamonds)/,"Diamante");
	}
	}
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Top articles")) {
			obj.innerHTML=obj.innerHTML.replace(/(Top articles)/,"Top articulos");
		} else if (obj.innerHTML.match("Latest articles")) {
			obj.innerHTML=obj.innerHTML.replace(/(Latest articles)/,"Últimos Articulos");
		} else if (obj.innerHTML.match("Military events")) {
			obj.innerHTML=obj.innerHTML.replace(/(Military events)/,"Eventos Militaresיים");
		} else if (obj.innerHTML.match("Political events")) {
			obj.innerHTML=obj.innerHTML.replace(/(Political events)/,"Eventos Politicos");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Country Economy)/,"Economia del País");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select country)/,"Elije País");
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Population)/,"Población");
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total active citizens)/,"Total ciudadanos activos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens online)/,"Ciudadanos conectados");
	tmp.innerHTML=tmp.innerHTML.replace(/(New citizens today)/,"Nuevos ciudadanos hoy");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total residents)/,"Total residentes");
	tmp.innerHTML=tmp.innerHTML.replace(/(Who is online)/,"Quien está conectado");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show details)/,"Mostrar detalles");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show details)/," Mostrar detalles ");
	
	
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Regions)/,"Regiones");
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Resources)/,"Recursos");
		tmp.innerHTML=tmp.innerHTML.replace(/(Region)/,"Region");
	for ( var j=0;j < 20;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No resources)/,"Sin recursos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Capital of)/,"Capital");
	tmp.innerHTML=tmp.innerHTML.replace(/(HIGH)/,"ALTO");
	tmp.innerHTML=tmp.innerHTML.replace(/(MEDIUM)/,"MEDIOי");
	}
	obj = results.snapshotItem(i);
	}
	
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/(Taxes)/,"Taxas");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"Recurso");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Import Tax)/,"Taxa importación");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income Tax)/,"Impuestos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat)/,"IVA");
	tmp.innerHTML=tmp.innerHTML.replace(/(Iron)/,"Hierro");
	tmp.innerHTML=tmp.innerHTML.replace(/(Grain)/,"Grano");
	tmp.innerHTML=tmp.innerHTML.replace(/(Oil)/,"Oil");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Stone)/,"Piedra");
	tmp.innerHTML=tmp.innerHTML.replace(/(Wood)/,"Madera");
	tmp.innerHTML=tmp.innerHTML.replace(/(Diamonds)/,"Diamantes");
	tmp.innerHTML=tmp.innerHTML.replace(/(Weapon)/,"Armas");
	tmp.innerHTML=tmp.innerHTML.replace(/(House)/,"Casas");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Gift)/,"Regalos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Food)/,"Comida");
	tmp.innerHTML=tmp.innerHTML.replace(/(Ticket)/,"Billete");
	tmp.innerHTML=tmp.innerHTML.replace(/(Defense System)/,"Sistema Defensa");
	tmp.innerHTML=tmp.innerHTML.replace(/(Hospital)/,"Hospital");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%91%D7%A8%D7%96%D7%9C.png)/,"Iron.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%97%D7%99%D7%98%D7%94.png)/,"Grain.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%A0%D7%A4%D7%98.png)/,"Oil.png");	
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%90%D7%91%D7%A0%D7%99%D7%9D.png)/,"Stone.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%A2%D7%A6%D7%99%D7%9D.png)/,"Wood.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%99%D7%94%D7%9C%D7%95%D7%9E%D7%99%D7%9D.png)/,"Diamonds.png");
	}
	
	tmp = allElements.children[19];
	tmp.innerHTML=tmp.innerHTML.replace(/(Treasury)/,"Tesoro");
	
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Treasury)/,"Tesoro");
	
	}
	tmp = allElements.children[24];
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"Edificios disponibles");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No buildings)/,"Sin edificios");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Leyes propuestas");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select country)/,"Selección País");
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Leyes propuestas");
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Type)/,"Tipo");
	tmp.innerHTML=tmp.innerHTML.replace(/(Results)/,"Resultados");
	tmp.innerHTML=tmp.innerHTML.replace(/(Yes:No)/,"Si:No");
	tmp.innerHTML=tmp.innerHTML.replace(/(Time)/,"Fecha");
	for(var j=0;j<15;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Accepted)/,"Aceptado");
	tmp.innerHTML=tmp.innerHTML.replace(/(but failed)/,"Falladas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rejected)/,"Rechazado");
	tmp.innerHTML=tmp.innerHTML.replace(/(hours ago)/,"horas antes");
	tmp.innerHTML=tmp.innerHTML.replace(/(days ago)/,"días antes");
	tmp.innerHTML=tmp.innerHTML.replace(/(months ago)/,"meses antes");
	tmp.innerHTML=tmp.innerHTML.replace(/(hour ago)/,"horas antes");
	tmp.innerHTML=tmp.innerHTML.replace(/(day ago)/,"días antes");
	tmp.innerHTML=tmp.innerHTML.replace(/(month ago)/,"mese antes");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Donar dinero");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cease Fire)/,"Alto fuego");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change tax)/,"Cambio taxas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Impeach)/,"Destitución");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change welcome message)/,"cambiar mensaje de bienvenida");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/,"Imprimir moneda");
	tmp.innerHTML=tmp.innerHTML.replace(/(Elect president)/,"Presidente");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"Construir edificio");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"propuesta de MPP");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/,"Declarar la guerra");
	
	}
	}
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Propuestas de Ley");
	tmp = allElements.children[18];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress actions)/,"Acciones del Congreso");
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposal left )/,"Leyes propuestas restantes");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Donar dinero");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cease Fire)/,"Alto el fuego");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change taxes)/,"Cambio de taxas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose impeach)/,"Propuesta destitución");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose welcome message)/,"propuesta mensaje de bienvenida");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/,"Imprimir dinero");
	tmp.innerHTML=tmp.innerHTML.replace(/(Elect president)/,"Elegir Presidente");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"Construir edificio");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"propuesta MPP");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/,"Declarar la guerra");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country treasure)/,"Tesoro del País");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"Edificios construidos");
	tmp.innerHTML=tmp.innerHTML.replace(/(No buildings)/,"Sin edificios");
	replaceInputByValue({"Leave congress":["Leave congress","Dejar el Congreso"]});
	
	tmp = allElements.children[21];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate buildings to national treasury)/,"Donar edificios al Tesoro Nacional");
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(You have no buildings in your inventory)/,"No tienes edificios en tu inventario");
	}
	
	tmp = allElements.children[26];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money to national treasury)/,"Donar moneda al Tesoro Nacional");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Select item to donate:)/,"Elegir ítem a donar:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Donate item:)/,"Donar item:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Sum:)/,"Importe:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Reason:)/,"Motivo:");
		replaceInputByValue({"Donate":["Donate","Donar"]});
	}
	results = getElements(document, "//a[@target='_blank']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposals)/,"Leyes Propuestas");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Party Elections)/,"Elecciones Partido");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party:)/,"Partido:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"Fecha:");	
	replaceInputByValue({"Show":["Show","Mostrar"]});
	}replaceInputByValue({"Vote":["Vote","Votar"]});
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nס.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Candidato");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partido");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Total votos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Presentación");
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"Sin presentación");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress Elections)/,"Elecciones Congreso");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Elected candidates)/,"Candidatos Elegidos");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Not elected candidates)/,"Candidatos No elegidos");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party:)/,"Partido:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"Fecha:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"País");	
	}
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nס.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Candidato");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Presentación");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partido");
	
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Total votos");
	for(j=0;j<30;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"Sin presentación");
	}
	for(j=0;j<20;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Presentación");
	}}
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/en/Congress elections']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress elections tutorial)/,"Tutorial elecciones al Congreso");
	
	}
}
//=======================
//President elections
//=======================

function doPresiElec() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","הראה"]});
	replaceInputByValue({"Candidate for president":["Candidate for president","Candidato a Presidente"]});
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential Elections)/,"Elecciones Presidenciales");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(Link to presentation:)/,"Enlace a la presentación");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidating for president costs)/,"Coste de Candidatura a Presidente");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party:)/,"Partido:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"Fecha:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"País");	
	}
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nס.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Candidato");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partido");
	for(j=0;j<5;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Presentación");
	}
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Total votos");
	tmp.innerHTML=tmp.innerHTML.replace(/(No candidates )/,"Sin candidatos");
	for(j=0;j<5;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"Sin presentación");
	}}
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/en/Presidental elections']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential elections tutorial)/,"Tutorial elecciones Presidenciales");
	
	}
}
//==========================
//citizenship Application
//==========================

function doCSappli() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","הראה"]});
	replaceInputByValue({"Apply for citizenship":["Apply for citizenship","Conceder Ciudadanía"]});
	var tmp;
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Pending citizenship applications)/,"Solicitudes de Ciudadanía pendientes");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show accepted citizenship)/,"Mostrar Ciudadanías aceptadas");
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Your application for citizenship in)/,"Solicitud de ciudadanía en ");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Your citizenship)/,"Ciudadanía");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"País:");
	tmp.innerHTML=tmp.innerHTML.replace(/(The application will be revised by)/,"La solicitud sera revisada por:");		
	tmp.innerHTML=tmp.innerHTML.replace(/(congress members of)/,"Miembros del Congreso");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Pending applications)/,"Solicitudes pendientes");
	tmp.innerHTML=tmp.innerHTML.replace(/(No applications)/,"Sin solicitudes");	
	obj=results.snapshotItem(i);
	}
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/en/Citizenship']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizenships on wiki)/,"Ciudadanías en la wiki");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Browse territories)/,"Buscar territorios");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Map Type:)/,"Tipo de Mapa:");
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizenship:)/,"Ciudadanía:");
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
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offers/,"Publicar nueva oferta");
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"País");
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Productividad");
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Cantidad");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Precio");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Publicar nueva oferta");
    tmp.innerHTML = tmp.innerHTML.replace(/Show market offers/,"Mostrar ofertas del mercado");
    tmp.innerHTML = tmp.innerHTML.replace(/Your storage/,"Inventario");
    
    results = getElements(document, "//h3[@style='text-align: center']");
    allElements = results.snapshotItem(0);
    tmp = allElements;
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers on market/,"Tus ofertas en el mercado");
    
    results = getElements(document, "//table[@style='width: 680px; margin-left: auto; margin-right: auto;']");
    allElements = results.snapshotItem(0).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Producto");
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Vendedor");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock/,"Cantidad");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Precio");
    tmp.innerHTML = tmp.innerHTML.replace(/Gross/,"Bruto");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Precio");
    tmp.innerHTML = tmp.innerHTML.replace(/Net/,"Neto");
    tmp.innerHTML = tmp.innerHTML.replace(/Import tax/,"Taxa importación");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Borrar");
    
}
// NEW
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Empresas");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Empresa");
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Producto");
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"Localización");
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"Empleados");
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"Crear Empresa");
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Nombre Empresa");
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"Tipo");
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"Avatar empresa");
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"Crear empresa");
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"Coste crear empresa");
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"La empresa sera creada en tu localización-región actual");
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources/,"Buscar regiones con recursos");
    tmp = allElements.children[4];
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"Tutorial empresas en la wiki");
}
    
    
function doPoliticalStats() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Country Politics/,"Política País");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Select country/,"Elegir país");
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/President/,"Presidente");
    tmp = allElements.children[6];
    tmp.innerHTML = tmp.innerHTML.replace(/view elections/,"ver elecciones");
    replaceLinkByHref({"http://wiki.e-sim.org/en/President":["President","Presidente"]});
    tmp = allElements.children[9];
    tmp.innerHTML = tmp.innerHTML.replace(/Congress/,"Congreso");
    replaceLinkByHref({"http://wiki.e-sim.org/en/Congress":["Congress","Congreso"]});
    tmp = allElements.children[17];
    tmp.innerHTML = tmp.innerHTML.replace(/Wars/,"Guerras");
    tmp = allElements.children[21];
    tmp.innerHTML = tmp.innerHTML.replace(/War/,"Guerra");
    tmp.innerHTML = tmp.innerHTML.replace(/Details/,"Detalles");
    tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"Sin guerras");
    tmp = allElements.children[22];
    tmp.innerHTML = tmp.innerHTML.replace(/War rules/,"Reglas guerra");
    tmp = allElements.children[23];
    tmp.innerHTML = tmp.innerHTML.replace(/Alliances/,"Alianzas");
    tmp = allElements.children[27];
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"País");
    tmp.innerHTML = tmp.innerHTML.replace(/Expires/,"Caduca"); 
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
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day)/g,"día");
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
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days)/g,"$1 días");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months)/g,"$1 meses");
            } 
        }
    }
    
    replaceLinkByHref({"http://wiki.e-sim.org/en/Alliances":["Alliances","Alianzas"]});
    
} 

function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"Invitar amigos");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/," Enlace para referidos");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/," Envía este link a otras personas para obtener más ");
    tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"ganas");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who register/,"Gold por cada ciudadano que se registre");
    tmp.innerHTML = tmp.innerHTML.replace(/and earn level 7/,"y alcance el nivel 7");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/," despues de hacer click en este enlace ");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/," y otros ");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she get his\/her/," Gold cuando el\/ella gane ");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/," su primera medalla ");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/," Además se obtiene");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/," un 10% del oro recibido por el jugador por cada medalla ganada y por subir de nivel ");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive additional/," Tenga en cuenta que sus amigos también recibirán adicionalmente");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering from your invitation when he reach level 7/," Gold por el registro a través de su enlace de invitación al juego cuando se alcance el nivel 7 ");
    tmp = allElements.children[4];
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"Ciudadanos invitados");
    tmp = allElements.children[5];
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"Tipo de busqueda");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"Mostrar");
    tmp = allElements.children[6];
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Ciudadano");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"Nivel");
    tmp.innerHTML = tmp.innerHTML.replace(/XP/,"EXp");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"Gold recibido");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"Fecha de registro");

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Gold received")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gold received)/,"Gold recibido");
		} else if (obj.innerHTML.match("Register time")) {
			obj.innerHTML=obj.innerHTML.replace(/(Register time)/,"Fecha de registro");
		} else if (obj.innerHTML.match("Citizen name")) {
			obj.innerHTML=obj.innerHTML.replace(/(Citizen name)/,"Nombre");
		} else if (obj.innerHTML.match("By experience")) {
			obj.innerHTML=obj.innerHTML.replace(/(By experience)/,"Por EXP");
		} else if (obj.innerHTML.match("By nationality")) {
			obj.innerHTML=obj.innerHTML.replace(/(By nationality)/,"Por Nacionalidad");
    		}
    		}
    TimeBasic(allElements,6,0,4);
    
    tmp = allElements.children[11];
    tmp.innerHTML = tmp.innerHTML.replace(/Statistics/,"Estadisticas");
    tmp.innerHTML = tmp.innerHTML.replace(/Total clicks on referral link/," Total de clicks en tu enlace de referidos ");
    tmp.innerHTML = tmp.innerHTML.replace(/Unique clicks on referral link/," únicos clicks en tu enlace de referidos ");
    tmp.innerHTML = tmp.innerHTML.replace(/Total citizens registered/,"Total ciudadanos registrados");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens who reached level 7/," Ciudadanos que han llegado al nivel 7 ");
    tmp = allElements.children[14];
    tmp.innerHTML = tmp.innerHTML.replace(/Latest clicks on referrer link/," Ultimos clicks en tu enlace de referidos ");
    tmp = allElements.children[15];
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Fecha");
    tmp.innerHTML = tmp.innerHTML.replace(/Referrer/,"Referidos");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Ciudadano");
    
    TimeBasic(allElements,15,0,0);
    
    tmp = allElements.children[15].children[0];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3];
        if (tmp.innerHTML.match(/Not registered/)) {		
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"No registrados");
            }        
    }
    tmp = allElements.children[17];
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"Mostrar más clicks");
    
    
}
//Ulepszyc
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l];
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/,"segundo antes");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"minuto antes");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"hora antes");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"dia antes");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"mes antes");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"hace $1 segundos");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"hace $1 minutos");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"hace $1 horas");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"hace $1 dias");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"hace $1 meses");
            } 
        }
    }
}
  
//==========
//Main
//==========
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

