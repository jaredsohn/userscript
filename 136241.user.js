// ==UserScript==
// @name           e-sim LT 
// @namespace      e-sim LT 
// @include        http://e-sim.org*
// @version        1
// @description    Lietuviška versija - shvo
// ==/UserScript==
// 
 

//---------------------------------------------------
//Homepage & Menu replacements
//---------------------------------------------------
menuLinkReplacements = {
	"work.html"	:["Work","Darbovietė"],
	"train.html"	:["Train","Treniruotės"],
	"companies.html"	:["Companies","Įmonės"],
	"newspaper.html"	:["Newspaper","Laikraštis"],
	"myParty.html"	:["Party","Politinė partija"],
	"contracts.html"	:["Contracts","Kontraktai"],
  "myShares.html"     :["Shares","Akcijų birža"],
	"inviteFriends.html"	:["Invite friends","Kviesti draugus"],
	"myMilitaryUnit.html"	:["Military unit","Karinis būrys"],
	"subscription.html"     :["Premium account","Premium vartotojas"],
	
	"productMarket.html"	:["Product market","Produktų rinka"],
	"jobMarket.html"	:["Job market","Darbo pasiūla"],
	"monetaryMarket.html"	:["Monetary market","Valiutos keitykla"],
	"companiesForSale.html"	:["Companies for sale","Parduodamos įmonės"],
	
	"countryStatistics.html"	:["Country statistics","Valstybių statistika"],
	"partyStatistics.html"	:["Party statistics","Partijų statistika"],
	"newspaperStatistics.html"	:["Newspaper statistics","Laikraščių statistika"],
	"citizenStatistics.html"	:["Citizen statistics","Piliečių statistika"],
  "militaryUnitStatistics.html"	:["Military unit stats","Būrių statistika"],
  "stockCompanyStatistics.html"  :["Top stock companies","Akcijų statistika"],
	"donations.html"                :["Donations","Parama"],
        "fundRaising.html?id=4"         :["New modules","Nauji moduliai"],
	
	"news.html\?newsType=TOP_ARTICLES"	:["Top articles","Geriausi straipsniai"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Naujausi straipsniai"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Kariniai įvykiai"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Politiniai įvykiai"],
	
	"battles.html"	:["Battles","Mūšiai"],
	"countryPoliticalStatistics.html"	:["War and politics","Karai ir politika"],
	"countryEconomyStatistics.html"	:["Economy","Ekonomika"],
	"countryLaws.html"	:["Laws","Įstatymai"],
	"partyElections.html"	:["Party elections","Partijų rinkimai"],
	"congressElections.html"	:["Congress elections","Kongreso rinkimai"],
	"presidentalElections.html"	:["Presidential elections","Prezidento rinkimai"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Pilietybė"],
	"googleMap.html"	:["Map","Žemėlapis"],
};


menuTextReplacements = {
	"myPlacesButton":["My places","Mano galimybės"],
	"marketButton":["Market","Rinka"],
	"statisticsButton":["Statistics","Statistika"],
	"newsButton":["News","Naujienos"],
	"electionsButton":["Country","Valstybė"]
};

sideLink1Replacements = {
	"crossIcon"	:["Logout","Atsijungti"],
	"workIcon"	:["Work","Dirbti"],
	"fightIcon"	:["Fight","Kovoti"],
	"avatarIcon":["Upload avatar","Įkelti avatar'ą"],
	"voteIcon"	:["Vote","Balsuoti"],
};

sideLink2Replacements = {
	"travel.html"	:["Travel","Keliauti"],
	"pendingCitizenshipApplications.html"	:["change","keisti"],
	"http://wiki.e-sim.org/index.php/Health"	:["Health tutorial","Sveikatos instrukcija"],
};

sideLink3Replacements = {
	"eatLink"	:["Eat food","Valgyti maistą"],
	"useGiftLink":["Use gifts","Vartoti dovanas"]
};

sideLink4Replacements = {
	"eatButton":["Eat Food","Valgyti"],
	"useGiftButton":["Use gift","Vartoti"] 
};

hpTitleReplacements = {
	"News":["News","Naujienos"],
	"Shouts":["Shouts","Šūksniai"],
	"Battles":["Battles","Mūšiai"],
	"Events":["Events","Įvykiai"]
};
hpTabsReplacements = {
	"#topArticles":["Global","Globalios"],
	"#latestArticles":["Latest","Naujos"],
	"#localArticles":["Local","Šalies"],
	
	"#countryShouts":["Country","Valstybė"],
	"#friendsShouts":["Military unit","Karinis būrys"],
	"#myShouts":["Friends","Draugai"],
	
	"#localBattles":["Country","Šalies"],
	"#substidedBattles":["Subsidized","Subidijuojami"],
	"#hotBattles":["Important","Svarbūs"],

	"#localEvents":["Military","Kariniai"],
	"#globalEvents":["Military","Kariniai"],
	"#politicalEvents":["Political","Politiniai"]
};

replaceLinkByHrefSSS("#", {
    "Report":["Report","Pranešti"],
    "Delete":["Delete","Trinti"],
    "Edit":["Edit","Redaguoti"],
    "More shouts":["More shouts","Daugiau šūksnių"]
});
		
replaceInputByValue({
    "Report":["Report","Pranešti"],
    "Delete":["Delete","Trinti"],
    "Edit":["Edit","Redaguoti"]
});	


//---------------------------------------------------
//???
//---------------------------------------------------
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
	"http://wiki.e-sim.org/index.php/MonetaryMarket"	:["Monetary market tutorial","Valiutos keityklos instrukcija"]
};


//---------------------------------------------------
//FireFox
//---------------------------------------------------
var isFF = navigator.userAgent.toLowerCase().match("firefox") ? true : false;


//---------------------------------------------------
//functions definitions
//---------------------------------------------------
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

var replaceBerserk = function() {
			//private section
				function getPrime(objTable){
					var exp = [];
					if(objTable.length){
					for(i=0, y=0; i<objTable.length; i++){

						 if(i%2==0){ 	continue; 	} 

						 	else { 
						 		exp[y] = objTable[i]; 
						 		y++;}  
						 	}
					}
				return exp;
				}

				function setID(tbl){
					var num = 0;
					if(tbl.length){
						for(var i=0; i<tbl.length; i++){
							tbl[i].setAttribute('id', 'beserk'+i);
							num = i;
						}
					}
					return num+1;
				}
				function createLabel(ids, idName, wid){
					ids = (!isNaN(ids)) ? Math.round(ids) : 0;
					idName = (idName.length) ? idName : false;

					for(var i=0; i<ids; i++){
						var btn = document.getElementById(idName+i),
							left = -121,
							top = 49,
							par = btn.parentNode,
							newLabel = document.createElement('label');
							btn.style.display='none';

							console.log(top);
							par.setAttribute('style','position: relative');
							newLabel.setAttribute('style', 'position: absolute; display: block; font-weight: bold;	color: #4477ff;	border: 1px solid #468;	background-color: #FFF;	border-radius: 4px;	box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	-o-box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	-webkit-box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	-moz-box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	color: #000; padding: 4px; width: '+wid+'px;'+' top: '+top+'px; '+'left: '+left+'px; z-index:999;');
							
							newLabel.setAttribute('onmouseover','this.style.borderColor= \'#224488\'; this.style.color = \'#224488\'; this.style.background = \'#FFF\';');

							newLabel.setAttribute('onmouseout', 'this.setAttribute("style", "position: absolute; display: block; font-weight: bold;	color: #4477ff;	border: 1px solid #468;	background-color: #FFF;	border-radius: 4px;	box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	-o-box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	-webkit-box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	-moz-box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	color: #000; padding: 4px; width: '+wid+'px;'+' top: '+top+'px; '+' left: '+left+'px; z-index:999;")');

							newLabel.setAttribute('for', idName+i)
							newLabel.innerHTML = 'Šturmuoti! (x 5)';
							par.appendChild(newLabel);
					}
				return true;
				}

				var btn = document.getElementsByName('side');					
					btn = getPrime(btn),
					len = btn[0].clientWidth;
					var exeC = setID(btn);
					var lb = createLabel(exeC, 'beserk',len);

		return btn;		
}


//---------------------------------------------------
//functions replacements
//---------------------------------------------------
function replaceAlliesLinkComm(k) {
	var results;
	var obj;
	results = getElements(document, "//a[@class='" + k + "']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1  sąj.");
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
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"be sąj.");
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
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Sukilimas");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Subsibijos:");
		tmp.innerHTML=tmp.innerHTML.replace(/(none)/g,"nėra");
	}
}

function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"be sąj.");
	//12 allies
	if (obj.innerHTML.match("1 ally")) {
	    obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"1 sąj.");
    } else {
        obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 sąj.");
    }
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"Sukilimas");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Subsidijos:");
}


//---------------------------------------------------
//??? battle timestamp ???
//---------------------------------------------------
function replaceBattleTime(obj) {
    if (obj.innerHTML.match(/[\d\.]+/g)== 1) {
        if (obj.innerHTML.match("second ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"prieš sek.");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"prieš min.");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"prieš val.");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"vakar");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"prieš mėn.");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"prieš $1 sek. ");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"prieš $1 min ");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"prieš $1 val. ");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"prieš $1 d. ");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"prieš $1 mėn. ");
        }
    }
}


//---------------------------------------------------
//??? Subs timestamp ???
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"Publikuoti prieš sek.");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"Publikuota prieš min.");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"Publikuota prieš val.");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"Publikuota vakar");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"Publikuota prieš mėn.");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"Publikuota prieš $2 sek.");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"Publikuota prieš $2 min.");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"Publikuota prieš $2 val.");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"Publikuota prieš $2 d.");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"Publikuota prieš $2 mėn.");
    }
}


//---------------------------------------------------
//Homepage Articles timestamp
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"Publikuota prieš sek.");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"Publikuota prieš min.");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"Publikuota prieš val.");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"Publikuota vakar");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"Publikuota prieš mėn.");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"Publikuota prieš $2 sek.");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"Publikuota prieš $2 min.");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"Publikuota prieš $2 val.");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"Publikuota prieš $2 d.");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"Publikuota prieš $2 mėn.");
    }
}


//---------------------------------------------------
//Homepage Shouts timestamp
//---------------------------------------------------
function doShoutsComm() {
	results = getElements(document, "//b[@style='color: #222']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match(/[\d\.]+/g)== 1) {		
		    if (obj.innerHTML.match("second")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"prieš sek.");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"prieš min.");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"prieš val.");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"vakar");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"prieš mėn.");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"prieš $2 sek.");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"prieš $2 min.");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"prieš $2 val.");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"prieš $2 d.");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"prieš $2 mėn.");
                } 
        }
    }
}
	  

//---------------------------------------------------
//Battle page statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"Vykstantys");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"besiginantys:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"atakuojantys:");
	results = getElements(document, "//div[@style]");
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"Vykstančio raundo statistika");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"Besiginančiųjų bendra žala:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"Atakuojančiųjų bendra žala:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Tavo žala:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"Geriausiai besiginančios valstybės:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"Geriausiai atakuojančios valstybės:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"Geriausiai besiginantys būriai:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"Geriausiai atakuonatys būriai:");
	obj.innerHTML=obj.innerHTML.replace(/(Rounds won by attacker)/,"Besiginnačiųjų pergalių skaičius");	
	obj.innerHTML=obj.innerHTML.replace(/(Rounds won by defender)/,"Atakuojančiųjų pergalių skaičius");
	}
}


//===================================================
//Clock
//===================================================
function doMenu() {
	replaceLinkByHref(menuLinkReplacements);
	replaceInnerHTML2(menuTextReplacements);
	allElements = document.getElementById('headerRow').children[2].children[0].children[0].children[1].children[1].children[3];
    allElements.innerHTML=allElements.innerHTML.replace(/day/,"Diena:");
}


//===================================================
//Side menu & dropdown lists
//===================================================
function doSide() {
	var allElements;
	var tmp;
	
	allElements = document.getElementById('userMenu').children[0];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"Lygis: ");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"Laipsnis: ");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Laipsnio progresas: ");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Ekonominis pajėgumas: ");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"Galia: ");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"Regionas: ");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"Pilietybė: ");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"Maisto limitas: ");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"Dovanų limitas: ");

	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Tavo pinigai");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Tavo inventorius");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Tavo žinutės");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"Šiandienos užduotys");
	
	replaceLinkByHref(sideLink2Replacements);
	
	replaceLinkByID(sideLink3Replacements);
	
	replaceInputByID(sideLink4Replacements);
	
	replaceSpanByClass(sideLink1Replacements);
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	if (obj.innerHTML.match("Any country")) {
	obj.innerHTML=obj.innerHTML.replace(/(Any country)/,"Bet kuri");
	}
	else if (obj.innerHTML.match("Global")) {
	obj.innerHTML=obj.innerHTML.replace(/(Global)/,"Globalus");
	}
	else if (obj.innerHTML.match("International")) {
	obj.innerHTML=obj.innerHTML.replace(/(International)/,"Tarptautinis");
	}	
	else if (obj.innerHTML.match("Any quality")) {
	obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"Visi");
	}
	else if (obj.innerHTML.match("Food type")) {
	obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Maisto kokybė");
	}
	else if (obj.innerHTML.match("Gift type")) {
	obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Dovanų kokybė");
	}
	else if (obj.innerHTML.match("left")) {
	obj.innerHTML=obj.innerHTML.replace(/left/g,"- likutis");
	}
	else if (obj.innerHTML.match("Any")) {
	obj.innerHTML=obj.innerHTML.replace(/(Any)/,"Visi");
	}
	else if (obj.innerHTML.match("Poland")) {
	obj.innerHTML=obj.innerHTML.replace(/(Poland)/,"Lenkija");
	}
	else if (obj.innerHTML.match("Indonesia")) {
	obj.innerHTML=obj.innerHTML.replace(/(Indonesia)/,"Indonėzija");
	}
	else if (obj.innerHTML.match("Lithuania")) {
	obj.innerHTML=obj.innerHTML.replace(/(Lithuania)/,"Lietuva");
	}
	else if (obj.innerHTML.match("Serbia")) {
	obj.innerHTML=obj.innerHTML.replace(/(Serbia)/,"Serbija");
	}
	else if (obj.innerHTML.match("Bulgaria")) {
	obj.innerHTML=obj.innerHTML.replace(/(Bulgaria)/,"Bulgarija");
	}
	else if (obj.innerHTML.match("Israel")) {
	obj.innerHTML=obj.innerHTML.replace(/(Israel)/,"Izraelis");
	}
	else if (obj.innerHTML.match("Russia")) {
	obj.innerHTML=obj.innerHTML.replace(/(Russia)/,"Rusija");
	}
	else if (obj.innerHTML.match("Slovenia")) {
	obj.innerHTML=obj.innerHTML.replace(/(Slovenia)/,"Slovėnija");
	}
	else if (obj.innerHTML.match("Turkey")) {
	obj.innerHTML=obj.innerHTML.replace(/(Turkey)/,"Turkija");
	}
	else if (obj.innerHTML.match("Greece")) {
	obj.innerHTML=obj.innerHTML.replace(/(Greece)/,"Graikija");
	}
	else if (obj.innerHTML.match("Italy")) {
	obj.innerHTML=obj.innerHTML.replace(/(Italy)/,"Italija");
	}
	else if (obj.innerHTML.match("China")) {
	obj.innerHTML=obj.innerHTML.replace(/(China)/,"Kinija");
	}
	else if (obj.innerHTML.match("Romania")) {
	obj.innerHTML=obj.innerHTML.replace(/(Romania)/,"Rumunija");
	}
	else if (obj.innerHTML.match("Hungary")) {
	obj.innerHTML=obj.innerHTML.replace(/(Hungary)/,"Vengrija");
	}
	else if (obj.innerHTML.match("Republic of Macedonia")) {
	obj.innerHTML=obj.innerHTML.replace(/(Republic of Macedonia)/,"Makedonijos Respublika");
	}
	else if (obj.innerHTML.match("Croatia")) {
	obj.innerHTML=obj.innerHTML.replace(/(Croatia)/,"Kroatija");
	}
	else if (obj.innerHTML.match("France")) {
	obj.innerHTML=obj.innerHTML.replace(/(France)/,"Prancūzija");
	}
	else if (obj.innerHTML.match("Sweden")) {
	obj.innerHTML=obj.innerHTML.replace(/(Sweden)/,"Švedija");
	}
	else if (obj.innerHTML.match("Ukraine")) {
	obj.innerHTML=obj.innerHTML.replace(/(Ukraine)/,"Ukraina");
	}
	else if (obj.innerHTML.match("Latvia")) {
	obj.innerHTML=obj.innerHTML.replace(/(Latvia)/,"Latvija");
	}
	else if (obj.innerHTML.match("Spain")) {
	obj.innerHTML=obj.innerHTML.replace(/(Spain)/,"Ispanija");
	}
	else if (obj.innerHTML.match("Brazil")) {
	obj.innerHTML=obj.innerHTML.replace(/(Brazil)/,"Brazilija");
	}
	else if (obj.innerHTML.match("USA")) {
	obj.innerHTML=obj.innerHTML.replace(/(USA)/,"JAV");
	}
	else if (obj.innerHTML.match("United Kingdom")) {
	obj.innerHTML=obj.innerHTML.replace(/(United Kingdom)/,"Jungtinė Karalystė");
	}
	else if (obj.innerHTML.match("Portugal")) {
	obj.innerHTML=obj.innerHTML.replace(/(Portugal)/,"Portugalija");
	}
	else if (obj.innerHTML.match("Argentina")) {
	obj.innerHTML=obj.innerHTML.replace(/(Argentina)/,"Argentina");
	}
	else if (obj.innerHTML.match("India")) {
	obj.innerHTML=obj.innerHTML.replace(/(India)/,"Indija");
	}
	else if (obj.innerHTML.match("Netherlands")) {
	obj.innerHTML=obj.innerHTML.replace(/(Netherlands)/,"Olandija");
	}
	else if (obj.innerHTML.match("Bosnia and Herzegovina")) {
	obj.innerHTML=obj.innerHTML.replace(/(Bosnia and Herzegovina)/,"Bosnija ir Hercogovina");
	}
	else if (obj.innerHTML.match("Iran")) {
	obj.innerHTML=obj.innerHTML.replace(/(Iran)/,"Iranas");
	}
	else if (obj.innerHTML.match("Finland")) {
	obj.innerHTML=obj.innerHTML.replace(/(Finland)/,"Suomija");
	}
	else if (obj.innerHTML.match("Germany")) {
	obj.innerHTML=obj.innerHTML.replace(/(Germany)/,"Vokietija");
	}
	else if (obj.innerHTML.match("Mexico")) {
	obj.innerHTML=obj.innerHTML.replace(/(Mexico)/,"Meksika");
	}
	else if (obj.innerHTML.match("Canada")) {
	obj.innerHTML=obj.innerHTML.replace(/(Canada)/,"Kanada");
	}
	else if (obj.innerHTML.match("Taiwan")) {
	obj.innerHTML=obj.innerHTML.replace(/(Taiwan)/,"Taivanas");
	}
	else if (obj.innerHTML.match("Ireland")) {
	obj.innerHTML=obj.innerHTML.replace(/(Ireland)/,"Airija");
	}
	else if (obj.innerHTML.match("Australia")) {
	obj.innerHTML=obj.innerHTML.replace(/(Australia)/,"Australija");
	}
	else if (obj.innerHTML.match("South Korea")) {
	obj.innerHTML=obj.innerHTML.replace(/(South Korea)/,"Pietų Korėja");
	}
	else if (obj.innerHTML.match("Colombia")) {
	obj.innerHTML=obj.innerHTML.replace(/(Colombia)/,"Kolumbija");
	}
	else if (obj.innerHTML.match("Chile")) {
	obj.innerHTML=obj.innerHTML.replace(/(Chile)/,"Čilė");
	}
	else if (obj.innerHTML.match("Pakistan")) {
	obj.innerHTML=obj.innerHTML.replace(/(Pakistan)/,"Pakistanas");
	}
	else if (obj.innerHTML.match("Malaysia")) {
	obj.innerHTML=obj.innerHTML.replace(/(Malaysia)/,"Malaizija");
	}
	else if (obj.innerHTML.match("Belgium")) {
	obj.innerHTML=obj.innerHTML.replace(/(Belgium)/,"Belgija");
	}
	else if (obj.innerHTML.match("Switzerland")) {
	obj.innerHTML=obj.innerHTML.replace(/(Switzerland)/,"Šveicarija");
	}
	else if (obj.innerHTML.match("Peru")) {
	obj.innerHTML=obj.innerHTML.replace(/(Peru)/,"Peru");
	}
	else if (obj.innerHTML.match("Norway")) {
	obj.innerHTML=obj.innerHTML.replace(/(Norway)/,"Norvegija");
	}
	else if (obj.innerHTML.match("All countries")) {
	obj.innerHTML=obj.innerHTML.replace(/(All countries)/,"Visos valstybės");
	}
	else if (obj.innerHTML.match("Select product...")) {
	obj.innerHTML=obj.innerHTML.replace(/(Select product...)/,"Pasirinkite produktą...");
	}
	else if (obj.innerHTML.match("Iron")) {
	obj.innerHTML=obj.innerHTML.replace(/(Iron)/,"Geležis");
	}
	else if (obj.innerHTML.match("Grain")) {
	obj.innerHTML=obj.innerHTML.replace(/(Grain)/,"Grūdai");
	}
	else if (obj.innerHTML.match("Oil")) {
	obj.innerHTML=obj.innerHTML.replace(/(Oil)/,"Nafta");
	}
	else if (obj.innerHTML.match("Stone")) {
	obj.innerHTML=obj.innerHTML.replace(/(Stone)/,"Akmuo");
	}
	else if (obj.innerHTML.match("Wood")) {
	obj.innerHTML=obj.innerHTML.replace(/(Wood)/,"Mediena");
	}
	else if (obj.innerHTML.match("Diamonds")) {
	obj.innerHTML=obj.innerHTML.replace(/(Diamonds)/,"Deimantai");
	}
	else if (obj.innerHTML.match("Weapon")) {
	obj.innerHTML=obj.innerHTML.replace(/(Weapon)/,"Ginklai");
	}
	else if (obj.innerHTML.match("House")) {
	obj.innerHTML=obj.innerHTML.replace(/(House)/,"Namai");
	}
	else if (obj.innerHTML.match("Gift")) {
	obj.innerHTML=obj.innerHTML.replace(/(Gift)/,"Dovanos");
	}
	else if (obj.innerHTML.match("Food")) {
	obj.innerHTML=obj.innerHTML.replace(/(Food)/,"Maistas");
	}
	else if (obj.innerHTML.match("Ticket")) {
	obj.innerHTML=obj.innerHTML.replace(/(Ticket)/,"Bilietai");
	}
	else if (obj.innerHTML.match("Defense System")) {
	obj.innerHTML=obj.innerHTML.replace(/(Defense System)/,"Gynybinės sistemos");
	}
	else if (obj.innerHTML.match("Hospital")) {
	obj.innerHTML=obj.innerHTML.replace(/(Hospital)/,"Ligoninės");
	}
	else if (obj.innerHTML.match("All parties")) {
	obj.innerHTML=obj.innerHTML.replace(/(All parties)/,"Visos partijos");
	}
	else if (obj.innerHTML.match("Current")) {
	obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"Vykstantis raundas");
	}
	else if (obj.innerHTML.match("Round ")) {
	obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"$2 raundas ");
	}
	else if (obj.innerHTML.match("Unarmed ")) {
	obj.innerHTML=obj.innerHTML.replace(/(Unarmed)/,"Beginklis");
	}
	else if (obj.innerHTML.match("available")) {
	obj.innerHTML=obj.innerHTML.replace(/available/g,"(turimi)");
	}
	}
}


//===================================================
//Homepage, Shouts, Misc & Events timestamp
//===================================================
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
	"Show more battles":["Show more battles","Rodyti daugiau mūšių"],
	"Subsidies informations":["Subsidies informations","Subsidijų infomacija"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
	allElements = document.getElementById(kk);
	
	if (allElements.innerHTML.match("No subsidized battles")) {
	allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"Subsidijuojamų mūšių nėra");
        }	
    }
	
	
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Tavo karinio būrio nurodymai:");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Kovoti už:");
	}   
	//Military orders & Elections notice
	allElements = document.getElementById('contentRow').children[2];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Tavo karinio būrio nurodymai:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fight for)/,"Kovoti už");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party leader elections are scheduled on 15th day each month. You have time till 14th to)/,"Kiekvieno mėnesio 15-tą diena šalyje vyksta partijos prezidento rinkimai. Iki 14-os dienos galite");
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress elections are scheduled on 25th day each month. You have time till 23rd to )/,"Kiekvieno mėnesio 25-tą diena šalyje vyksta kongreso rinkimai rinkimai. Iki 23-ios dienos galite");
	tmp.innerHTML=tmp.innerHTML.replace(/(Tomorrow are congress elections. Today party leaders are allowed to)/,"Kongreso rinkimai jau rytoj. Šiandien partijų prezidentai gali");
	tmp.innerHTML=tmp.innerHTML.replace(/(edit candidatures)/,"redaguoti kandidatūras");
	tmp.innerHTML=tmp.innerHTML.replace(/(in their parties)/,"savo partijose");
	tmp.innerHTML=tmp.innerHTML.replace(/(submit candidature)/,"paskelti savo kandidatūrą");
	tmp.innerHTML=tmp.innerHTML.replace(/(in your party)/,"savo partijoje");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential elections are scheduled on 5th day each month You have time till 5th to)/,"Kiekvieno mėnesio 5-tą diena šalyje vyksta šalies prezidento rinkimai. Iki 5-os dienos galite");
	tmp.innerHTML=tmp.innerHTML.replace(/(submit your candidature)/,"paskelbti savo kandidatūrą");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Tavo karinio būrio nurodymai:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fight for)/,"Kovoti už");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Fight for)/,"Kovoti už");
	
	//Events timestamp
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš min.");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš val.");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"vakar");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėn.");
        } 
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 d.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
		
		//Events content
		
		//A new referendum was started in
	allElements.innerHTML=allElements.innerHTML.replace(/A new referendum was started in/g,"Naujas referendumas buvo pradėtas");
	
	//Civil unrest has started in Lithuania
	allElements.innerHTML=allElements.innerHTML.replace(/Civil unrest has started in/g,"Pilietinio karo užuomazgos prasidėjo");
	
	//Civil unrest in Lithuania has turned into an open rebellion! 
	allElements.innerHTML=allElements.innerHTML.replace(/has turned into an open rebellion/g,"Pilietinis karas prasidėjo");
	allElements.innerHTML=allElements.innerHTML.replace(/Civil unrest in/g,"Pilietinio karo užuomazgos");
	
	//Loyalists have defeated rebels in a civil war in Lithuania! 
	allElements.innerHTML=allElements.innerHTML.replace(/Loyalists have defeated rebels in a civil war in/g,"Valdžios šalininkai nugalėjo maištininkus ");
	
	//Bulgaria secured Sumadija in the battle versus Serbia
	allElements.innerHTML=allElements.innerHTML.replace(/(secured )([a-zA-Z ]*)(in the battle versus)/g,"apgynė $2 mūšyje prieš");
	allElements.innerHTML=allElements.innerHTML.replace(/(secured)/g,"apgynė");
	allElements.innerHTML=allElements.innerHTML.replace(/(in the battle versus)/g,"mūšyje prieš");
	
	//People of started a resistance in Belgrade
	allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g," $2 piliečiai pradėjo sukilimą $5 $4");
	
	//was attacked by Indonesia
	allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"buvo užpultas $2$3");
	
	//President of Poland proposed to declare war to Lithuania
	allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"pasiūlė paskelbti karą $5$6");
	
	//Poland  has declared war to Lithuania
	allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to)([^<]*)(<[^>]+>)/g,"paskelbė karą $2$3");
	
	//Australia conquered Queensland in the battle versus Argentina 
	allElements.innerHTML=allElements.innerHTML.replace(/(conquered)/,"užkariavo");
	allElements.innerHTML=allElements.innerHTML.replace(/(in the battle versus )/," mūšyje prieš");
		
		//Greece has new president
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/g,"turi naują prezidentą");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","Rodyti daugiau įvykių"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Rodyti daugiau įvykių");
		
		//Money donation
		allElements.innerHTML=allElements.innerHTML.replace(/(Money donation of)/g,"Pinigų siuntimas");
		allElements.innerHTML=allElements.innerHTML.replace(/(was accepted)/g,"buvo priimtas");
		allElements.innerHTML=allElements.innerHTML.replace(/(was proposed in congress)/g,"buvo pasiūlytas kongrese");
		
		//Money issue
		allElements.innerHTML=allElements.innerHTML.replace(/(Issuing)/g,"spausdinimas");
		allElements.innerHTML=allElements.innerHTML.replace(/(by congress)/g,"kongreso");
		
		//Hospital deployment
		allElements.innerHTML=allElements.innerHTML.replace(/(Hospital was deployed in)/g,"Ligoninė buvo pastatyta:");
		allElements.innerHTML=allElements.innerHTML.replace(/(President of)/g,"Prezidentas");
		allElements.innerHTML=allElements.innerHTML.replace(/(proposed to deploy)/g,"Pasiūlė pastatyti");		
		allElements.innerHTML=allElements.innerHTML.replace(/(Hospital in)/g,"Ligoninę regione:");
		
		//DS deployment
		allElements.innerHTML=allElements.innerHTML.replace(/(Defense System was deployed in)/g,"Gynybinė sistema buvo pastatyta:");
		allElements.innerHTML=allElements.innerHTML.replace(/(Defense System in)/g,"Gynybinė sistema regione:");
		
		//New taxes
		allElements.innerHTML=allElements.innerHTML.replace(/(New taxes for)/g,"Nauji mokesčiai");
		allElements.innerHTML=allElements.innerHTML.replace(/(Import tax)/g,"Importo mokestis");
		allElements.innerHTML=allElements.innerHTML.replace(/(were accepted in)/g,"buvo priimtas:");
		
		//Impeachment
		allElements.innerHTML=allElements.innerHTML.replace(/(Impeachment of president of)/g,"Prezidento nušalinimas");
		allElements.innerHTML=allElements.innerHTML.replace(/(was proposed)/g,"buvo pasiūlytas");
		
		//MPP
		allElements.innerHTML=allElements.innerHTML.replace(/(signed MPP with)/g,"pasirašė sąjungos paktą (MPP) su:");
		allElements.innerHTML=allElements.innerHTML.replace(/(proposed mutual protection pact to)/g,"pasiūlė pasirašyti sąjungą (MPP):");
	
		//Peace
		allElements.innerHTML=allElements.innerHTML.replace(/(proposed a peace treaty to)/g,"pasiūlė pasirašyti taiką:");
	}
	
	//Shouts
	allElements = document.getElementById("command");
	
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"Rašyti naują šūksnį:");
	
	//Shout button
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="Šaukti!";
	
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Siųsti į kanalus:");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Siųsti į kanalus:");
	}
	
	//Shout to: Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," Šalis $2  Karinis būrys $4 Draugai");
	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Daugiau šūksnių"] });
}


//===================================================
//Shouts
//===================================================
function doShouts() {
	allElements = document.getElementById('contentRow').children[1]
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country shouts/,"Šalies šūksniai");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Šalis");
	tmp.innerHTML=tmp.innerHTML.replace(/View/,"Žiūrėti");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"sek.");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"min");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"val.");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"d.");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"mėn.");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"sek.");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"min.");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"val.");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"vakar");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"mėn.");
	tmp.innerHTML=tmp.innerHTML.replace(/posted/g,"parašyta prieš");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Atgal");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Pirmyn");
}


//===================================================
//Work
//===================================================
function doWork() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"Darbovietė");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already worked)/,"Šiandien jau dirbote");
	tmp.innerHTML=tmp.innerHTML.replace(/(You have no job and you can't be fired)/,"Neturite jokio darbo, tad negalite būti atleistas");
	tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"Norėdami dirbti, privalote būti valstybėje, kurioje yra įmonė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Tavo darbovietė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Darbdavys");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit)/,"Karinis būrys");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Atlyginimas:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Išeiti iš darbo");
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Tavo darbovietė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Darbdavys");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit)/,"Karinis būrys");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Atlyginimas:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Išeiti iš darbo");
	tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Šiandienos darbo rezultatai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Atlyginimas (brutto)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Atlyginimas (netto)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Sumokėta mokesčių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Dirbta");
	tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"Gauta XP");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Ekonominio pajėgumo padidėjimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/," Dirbta dienų iš eilės: ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Tavo produktyvumas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Produktyvumo modifikatoriai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Bendras produktyvumas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Pagaminta produkcijos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Žaliavų įmonės lygis");
	tmp.innerHTML=tmp.innerHTML.replace(/(none)/,"nėra");

	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have no job)/,"Esate bedarbis");
	replaceInputByValue({"Get a job now!":["Get a job now!","Raskite darbą!"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Šiandienos darbo rezultatai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Atlyginimas (brutto)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Atlyginimas (netto)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Sumokėta mokesčių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Dirbta");
	tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"Gauta XP");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Ekonominio pajėgumo padidėjimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/," Dirbta dienų iš eilės: ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Tavo produktyvumas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Produktyvumo modifikatoriai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Bendras produktyvumas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Pagaminta produkcijos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Žaliavų įmonės lygis");
	tmp.innerHTML=tmp.innerHTML.replace(/(none)/,"nėra");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have no job)/,"Esate bedarbis");
	replaceInputByValue({"Get a job now!":["Get a job now!","Raskite darbą!"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(You have not worked today)/,"Šiandien nedirbote");
	replaceInputByValue({"Work now":["Work now","Dirbti"]});
tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Šiandienos darbo rezultatai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Atlyginimas (brutto)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Atlyginimas (netto)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Sumokėta mokesčių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Dirbta");
	tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"Gauta XP");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Ekonominio pajėgumo padidėjimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/," Dirbta dienų iš eilės: ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Tavo produktyvumas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Produktyvumo modifikatoriai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Bendras produktyvumas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Pagaminta produkcijos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Žaliavų įmonės lygis");
	tmp.innerHTML=tmp.innerHTML.replace(/(none)/,"nėra");
	
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have no job)/,"Esate bedarbis");
	replaceInputByValue({"Get a job now!":["Get a job now!","Raskite darbą!"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(You have not worked today)/,"Šiandien nedirbote");
	replaceInputByValue({"Work now":["Work now","Dirbti"]});
tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Šiandienos darbo rezultatai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Atlyginimas (brutto)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Atlyginimas (netto)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Sumokėta mokesčių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Dirbta");
	tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"Gauta XP");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Ekonominio pajėgumo padidėjimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/," Dirbta dienų iš eilės: ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Tavo produktyvumas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Produktyvumo modifikatoriai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Bendras produktyvumas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Pagaminta produkcijos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Žaliavų įmonės lygis");
	tmp.innerHTML=tmp.innerHTML.replace(/(none)/,"nėra");
}


//===================================================
//Train
//===================================================
function doTrain() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"Karinės treniruotės");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	
	replaceInputByValue({
		"Train":["Train","Treniruotis"]
	});
	
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Treniruotės baigtos. Grįžkite rytoj");
		rowoffset = 2;
		
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Šiandien jau treniravotės");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Šiandien jau treniravotės. Grįžkite rytoj.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Κερδισμένη δύναμη:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Karinė informacija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Bendras treniruočių skaičius:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Galia:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Karinis laipsnis:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Bendra padaryta žala:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Žala be ginklo:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Žala naudojant Q1 ginklą:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"Žala naudojant Q2 ginklą:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"Žala naudojant Q3 ginklą:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"Žala naudojant Q4 ginklą:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"Žala naudojant Q5 ginklą:");
}


//===================================================
//Companies
//===================================================
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Įmonės");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Įmonė");
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produkcija");
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"Regionas");
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"Darbuotojai");
	tmp.innerHTML = tmp.innerHTML.replace(/No companies/,"Įmonių nėra");
	
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"Įkurti naują įmonę");
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Įmonės pavadinimas");
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"Produkcijos rūšis");
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"Įmonės avatar'as");
	tmp.innerHTML = tmp.innerHTML.replace(/max. size/,"mak.s dydis");
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"Įkurtį įmonę");
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"Įmonės įkūrimas kainuoja");
	tmp.innerHTML = tmp.innerHTML.replace(/Gold/,"aukso");
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"Įmonė bus įkurta šiame regione: ");
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources,/,"Peržiūrėti regionus, turinčius resursų:");
	tmp.innerHTML = tmp.innerHTML.replace(/click here/,"Spausti čia");
    tmp = allElements.children[4];
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"Kompanijų wiki");
}

//===================================================
//Company Details
//===================================================
function doCompanyDetails() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Įmonė:");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit/,"Karinis būrys");
    tmp.innerHTML = tmp.innerHTML.replace(/Employer/,"Darbdavys");
    tmp.innerHTML = tmp.innerHTML.replace(/Edit company/,"Redaguoti įmonę");
    tmp = allElements.children[4];
	tmp.innerHTML = tmp.innerHTML.replace(/Salary in/,"Atlyginimo forma");
    tmp.innerHTML = tmp.innerHTML.replace(/Production progress/,"Produkcijos eiga");
    tmp.innerHTML = tmp.innerHTML.replace(/Raw per one product/,"Žaliavos, reikalingos vienam produktui");
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"Darbuotojai");
    tmp.innerHTML = tmp.innerHTML.replace(/Employees who worked today/,"Darbuotojų, dirbusių šiandien, skaičius");
	tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Pilietis");
    tmp.innerHTML = tmp.innerHTML.replace(/Economy skill/,"Ekonominis pajėgumas");
    tmp.innerHTML = tmp.innerHTML.replace(/Salary/g,"Atlyginimas");
	tmp.innerHTML = tmp.innerHTML.replace(/Fire/g,"Atleisti");
    tmp.innerHTML = tmp.innerHTML.replace(/edit/g,"redaguoti");
    tmp.innerHTML = tmp.innerHTML.replace(/view workers productivity/g,"peržiūrėti darbuotojų produktyvumą");
	tmp.innerHTML = tmp.innerHTML.replace(/Productivity info/,"Produktyvumo informacija");
    tmp.innerHTML = tmp.innerHTML.replace(/Upgrade company/,"Patobulinti įmonę");
    tmp.innerHTML = tmp.innerHTML.replace(/Upgrading company costs/,"Įmonės patobulinimas kainuoja");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold/,"aukso");
    tmp.innerHTML = tmp.innerHTML.replace(/Job offers/,"Darbo pasiūlymai");
    tmp.innerHTML = tmp.innerHTML.replace(/Min. skill/,"Min. pajėgumas");
    tmp.innerHTML = tmp.innerHTML.replace(/Offers/,"Pasiūlymai");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Trinti");
    tmp.innerHTML = tmp.innerHTML.replace(/Apply/g,"Dirbti");
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"Pasiūlymų nėra");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new job offer/,"Skelbti naują pasiūlymą");
    tmp.innerHTML = tmp.innerHTML.replace(/Minimal economic skill/,"minimalus ekonominis pajėgumas");
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Kiekis");
    tmp.innerHTML = tmp.innerHTML.replace(/Create job offer/,"Skelbti darbo pasiūlymą");
    tmp.innerHTML = tmp.innerHTML.replace(/Sell company/,"Parduoti įmonę");
    tmp.innerHTML = tmp.innerHTML.replace(/Price in Gold/,"Kaina auksu");
    tmp.innerHTML = tmp.innerHTML.replace(/Post sell offer/,"Skelbti pardavimo pasiūlymą");
}

//===================================================
//Edit Newspaper
//===================================================

function doNewspaperEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Redactor/,"Redaktorius");	
	
	allElements = document.getElementById('editNewspaperForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Laikraščio pavadinimas:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Naujas avatar'as:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","maks. dydis:");
	
	//Not working ?
	replaceLinkByHref({
	"editNewspaper.html":["Edit newspaper","Redaguoti laikraštį"]
	});
	replaceInputByValue({
	"Delete":["Edit newspaper","Redaguoti laikraštį"]
	});
	
	//Another way
	allDivs = getElements(allElements, "//input[@value='Edit newspaper']");
	allDivs.snapshotItem(0).value="Redaguoti laikraštį";
}

 
//===================================================
//Subs List xxx
//===================================================

function doSubsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Your Subs/,"Tavo prenumeratos");	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Total citizens:/,"Viso piliečių:");
	tmp.innerHTML=tmp.innerHTML.replace(/Show more/,"Rodyti daugiau");
	tmp = allElements.childNodes[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Number/,"Skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Time/,"Data");
	tmp.innerHTML=tmp.innerHTML.replace(/User/,"Vartotojas");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Atgal");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Pirmyn");
	if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš min.");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš val.");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"vakar");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėn.");
        } 
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 d.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
    
}

//===================================================
//Edit Company
//===================================================
function doCompanyEdit() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit/,"Karinis būrys");
    tmp.innerHTML = tmp.innerHTML.replace(/Employer/,"Darbdavys");
    tmp.innerHTML = tmp.innerHTML.replace(/You are not owner of this company/,"Nesate šios įmonės savininkas");
    tmp = allElements.children[2];
	tmp.innerHTML = tmp.innerHTML.replace(/Military unit/,"Karinis būrys");
    tmp.innerHTML = tmp.innerHTML.replace(/Employer/,"Darbdavys");
	tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Įmonės pavadinimas");
    tmp.innerHTML = tmp.innerHTML.replace(/New avatar/,"Naujas avatar'as");
    tmp.innerHTML = tmp.innerHTML.replace(/max. size/,"maks. dydis");
    tmp.innerHTML = tmp.innerHTML.replace(/Edit company/,"Redaguoti įmonę");
	tmp = allElements.children[4];
	tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Įmonės pavadinimas");
    tmp.innerHTML = tmp.innerHTML.replace(/New avatar/,"Naujas avatar'as");
    tmp.innerHTML = tmp.innerHTML.replace(/max. size/,"maks. dydis");
    tmp.innerHTML = tmp.innerHTML.replace(/Edit company/,"Redaguoti įmonę");
}


//===================================================
//Company Results
//===================================================
function doCompanyResults() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Įmonė:");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit/,"Karinis būrys");
    tmp.innerHTML = tmp.innerHTML.replace(/Employer/,"Darbdavys");
    tmp.innerHTML = tmp.innerHTML.replace(/Edit company/,"Redaguoti įmonę");
    tmp = allElements.children[5];
	tmp.innerHTML = tmp.innerHTML.replace(/Historical work results/,"Darbo eigos ataskaita");
    tmp.innerHTML = tmp.innerHTML.replace(/Worker/,"Darbuotojas");
    tmp.innerHTML = tmp.innerHTML.replace(/Productivity/,"Produktyvumas");
    tmp.innerHTML = tmp.innerHTML.replace(/units produced/,"pagaminta vienetų");
    tmp.innerHTML = tmp.innerHTML.replace(/Skill/,"Pajėgumas");
    tmp.innerHTML = tmp.innerHTML.replace(/Day/g,"Diena:");
}

//===================================================
//Company Sumamry
//===================================================
function doCompanySummary() {
    allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Company summary/,"Įmonių suvestinė");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/List companies/,"Rūšiuoti įmones");
    tmp.innerHTML = tmp.innerHTML.replace(/Calculate prices using latest/,"Skaičiuoti kainas naudojantis paskutiniais");
    tmp.innerHTML = tmp.innerHTML.replace(/Calculate prices in country/,"Skaičiuoti kainas valstybei");
    tmp.innerHTML = tmp.innerHTML.replace(/Period start/,"Periodo pradža");
    tmp.innerHTML = tmp.innerHTML.replace(/Period end/,"Periodo poabaiga");
    tmp.innerHTML = tmp.innerHTML.replace(/View logs/,"Žiūrėti išklotines");
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit companies/,"Karinio būrio įmonės");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen companies/,"Piliečio įmonės");
    tmp.innerHTML = tmp.innerHTML.replace(/days/g,"dienos");
    tmp.innerHTML = tmp.innerHTML.replace(/Game day/g,"Žaidimo diena:");
    tmp = allElements.children[6];
	tmp.innerHTML = tmp.innerHTML.replace(/Product pricing/,"Produkto įkainis");
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Įmonės");
    tmp.innerHTML = tmp.innerHTML.replace(/Company/g,"Įmonė");
    tmp.innerHTML = tmp.innerHTML.replace(/None/g,"Nėra");
    tmp.innerHTML = tmp.innerHTML.replace(/Summary/,"Suvestinė");
    tmp.innerHTML = tmp.innerHTML.replace(/Production/g,"Produkcija");
    tmp.innerHTML = tmp.innerHTML.replace(/Total production/,"Bendra produkcija");
    tmp.innerHTML = tmp.innerHTML.replace(/Raw Usage/g,"Žaliavų sunaudojimas");
    tmp.innerHTML = tmp.innerHTML.replace(/Raw usage/g,"Žaliavų sunaudojimas");
    tmp.innerHTML = tmp.innerHTML.replace(/Total raw usage/,"Bendras žaliavų sunaudojimas");
    tmp.innerHTML = tmp.innerHTML.replace(/Salaries/g,"Atlyginimai");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Ginklai");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Namai");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Dovanos");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Maistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Bilietai");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Gynybinės sistemos");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Ligoninės");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Geležis");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Grūdai");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Nafta");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Akmuo");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Mediena");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Deimantai");
	tmp.innerHTML=tmp.innerHTML.replace(/net/g,"neto");
	tmp.innerHTML=tmp.innerHTML.replace(/Based on/g,"Priklauso nuo");
	tmp.innerHTML=tmp.innerHTML.replace(/items traded on/g,"produkcijos parduotos,");
	tmp.innerHTML=tmp.innerHTML.replace(/market in the last/g,"rinkoje, per paskutines");
	tmp.innerHTML=tmp.innerHTML.replace(/days/g,"dienas (-ų)");
}
 //===================================================
//Article
//===================================================

function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"Straipsnis");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Redactor/,"Redaktorius");
	tmp.innerHTML=tmp.innerHTML.replace(/View subs/,"Žiūrėti prenumeratas");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/View votes/,"Žiūrėti balsus");
	tmp.innerHTML=tmp.innerHTML.replace(/Posted/,"Publikuota");
	if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš min.");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš val.");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"vakar");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėn.");
        } 
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 d.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
    }
	tmp.innerHTML=tmp.innerHTML.replace(/by/,"από");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous article/,"Προηγούμενο άρθρο");
	tmp.innerHTML=tmp.innerHTML.replace(/next article/,"Επόμενο άρθρο");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Comments/,"Σχόλια");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
		
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","Επεξεργασία άρθρου"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Επεξεργασία εφημερίδας"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Αναφορά"],
		"Edit":["Edit","Επεξεργασία"],
		"Delete":["Delete","Διαγραφή"]
	});
	replaceInputByValue({
		"Publish":["Publish","Δημοσίευση"],
		"Report":["Report","Αναφορά"],
		"Edit":["Edit","Επεξεργασία"],
		"Delete":["Delete","Διαγραφή"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Νέο σχόλιο");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Μήνυμα:");
}


//============================================================================
//Newspaper
//============================================================================
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Laikraštis");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
	allElements = results.snapshotItem(0).children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"Naujausi straipsniai");
	replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
	"editNewspaper.html":["Edit newspaper","Redaguoti laikraštį"],
	"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Laikraščių wiki"]
	});
	replaceInputByValue({
	"Publish":["Publish","Publikuoti"],
	"Preview":["Preview","Peržiūrėti"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Rašyti naują straipsnį");
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Publikuoti savo šalyje");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Straipsnio pavadinimas:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Tekstas:");
	tmp = allElements.children[allElements.children.length-1];
	tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"Išsaugokite straipsnio kopiją kompiuteryje prieš jį publikuodmi");
	}
}

	
	//New article
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Rašyti naują straipsnį");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Publikuoti šalyje:");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Straipsnio pavadinimas:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Tekstas:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"Išsaugokite straipsnio kopiją kompiuteryje, prieš publikuodami jį");
	}
}




//===================================================
//Votes List
//===================================================
function doVotesList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Your Votes/,"Tavo balsai");	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Total citizens:/,"Piliečių skaičius:");
	tmp.innerHTML=tmp.innerHTML.replace(/Show more/,"Rodyti daugiau");
	tmp = allElements.childNodes[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Number/,"Skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Time/,"Data");
	tmp.innerHTML=tmp.innerHTML.replace(/User/,"Vartotojas");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Atgal");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Pirmyn");
	allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš min.");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš val.");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"vakar");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėn.");
        } 
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 d.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
}


//============================================================================
//Edit Article
//============================================================================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Laikraštis");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Redaguoti straipsnį");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Straipsnio pavadinimas:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Žinutė:");
	
	replaceLinkByHref({
	"editNewspaper.html":["Edit newspaper","Redaguoti laikraštį"],
	"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Laikraščio instrukcija"]
	});
	replaceInputByValue({
	"Edit article":["Edit article","Redaguoti straipsnį"]
	});
}

/===================================================
//Party
//===================================================
function doMyParty() {
	allElements = document.getElementById('contentRow').children[1]
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Party/,"Partija");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/You are not in a party/,"Nepriklausote jokiai partijai");
	tmp.innerHTML=tmp.innerHTML.replace(/Join a party/,"Įstoti į partiją");
	tmp.innerHTML=tmp.innerHTML.replace(/Party Leader/,"Partijos prezidentas");
	tmp.innerHTML=tmp.innerHTML.replace(/Members/,"Nariai");
	tmp.innerHTML=tmp.innerHTML.replace(/Leave party/,"Palikti partiją");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Create your own party/,"Įkurti naują partiją");
	tmp.innerHTML=tmp.innerHTML.replace(/Party name/,"Partijos pavadinimas");
	tmp.innerHTML=tmp.innerHTML.replace(/Short description/,"Trumpas aprašymas");
	tmp.innerHTML=tmp.innerHTML.replace(/Party Avatar/,"Partijos avatar'as");
	tmp.innerHTML=tmp.innerHTML.replace(/Create party/,"Įkurti partiją");
	tmp.innerHTML=tmp.innerHTML.replace(/Creating a party costs/,"Partijos įkurimas kainuoja");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/,"aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Members/,"Nariai");
	tmp.innerHTML=tmp.innerHTML.replace(/Member/,"Narys");
	tmp.innerHTML=tmp.innerHTML.replace(/Level\(xp\)/,"Lygis (XP)");
	tmp.innerHTML=tmp.innerHTML.replace(/Joined/,"Įstojo");
	  if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"prieš sekundę");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"prieš minutę");
    }                                           
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"prieš valandą");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"vakar");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"prieš mėnesį");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"prieš $2 sek. ");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"prieš $2 min.");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"prieš $2 val.");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"prieš $2 d.");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"prieš $2 mėn.");
    }
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Atgal");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Pirmyn");
}


//============================================================================
//Contracts List
//============================================================================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Kontraktai");
	
	tmp = allElements.children[2].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Model");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Pasiūlyti kontraktai (20 paskutinių)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"pasiūlyta žaidėjui ");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Kontraktų nėra");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","Priimti kontraktai (20 paskutinių)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"pasiūlyta žaidėjui");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Kontraktų nėra");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Atmesti kontraktai");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Atšaukė $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Kontraktų nėra");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","Nepavykę kontraktai");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Kontraktų nėra");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Tavo galiojančios paskolos");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","Skolininkas");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Grąžinimo data");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Suma");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Atšaukti paskolą");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","Paskolų nėra");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Tavo aktyvios skolos ");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","Skolintojas");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Grąžinimo data");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Suma");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Sumokėti skolą");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","Skolų nėra");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","Ruošinio pavadinimas:");
	

	
	replaceLinkByHref({
	"http://wiki.e-sim.org/en/Contracts":["Contract tutorial","Kontraktų wiki"],
	"#":["Create new template","Sukurti naują ruošinį"]
	});
	replaceInputByValue({
	"Delete":["Delete","Trinti"],
	"Create template":["Create template","Sukurti ruošinį"]
	});
	
}


//===================================================
//Shares
//===================================================
function doShares() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/My shares/,"Mano akcijos");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Owned shares/,"Turimos akcijos");
	tmp.innerHTML=tmp.innerHTML.replace(/Public company/,"Akcinė bendrovė");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares/,"Akcijos");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Apytikrė vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/No stocks/,"Akcijų nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Akcinė bendrovės instrukcija");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/My orders/,"Mano nurodymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Public company/,"Akcinė bendrovė");
	tmp.innerHTML=tmp.innerHTML.replace(/Volume/,"Kiekiai");
	tmp.innerHTML=tmp.innerHTML.replace(/Type/,"Rūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/,"Kaina");
	tmp.innerHTML=tmp.innerHTML.replace(/Delete/,"Trinti");
	tmp.innerHTML=tmp.innerHTML.replace(/No orders/,"Nurodymų nėra");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/My roles/,"Mano pareigos");
	tmp.innerHTML=tmp.innerHTML.replace(/Public company/,"Akcinė bendrovė");
	tmp.innerHTML=tmp.innerHTML.replace(/Role/,"Pareigos");
	tmp.innerHTML=tmp.innerHTML.replace(/No roles/,"Pareigų nėra");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Create new public company/,"Įkurti naują akcinę bendrovę");
	tmp.innerHTML=tmp.innerHTML.replace(/Public company name/,"Akcinės bendrovės pavadinimas");
	tmp.innerHTML=tmp.innerHTML.replace(/Company avatar/,"Bendrovės avatar'as");
	tmp.innerHTML=tmp.innerHTML.replace(/max. size/,"maks. dydis");
	tmp.innerHTML=tmp.innerHTML.replace(/Create public company/,"Įkurti akcinę bendrovę");
	tmp.innerHTML=tmp.innerHTML.replace(/Creating company costs/,"Bendrovės įkūrimas kainuoja");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/,"aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold will become your starting capital/,"Auksas taps Jūsų pradiniu kapitalu");
	tmp.innerHTML=tmp.innerHTML.replace(/The stock company will be located in/,"Akcinės benrovės įkūrimo vieta:");
	tmp.innerHTML=tmp.innerHTML.replace(/Be aware that it's illegal to fraud investors' money/,"Būkite atsargūs. Venkite nelegalių piniginių investicijų");
}




//===================================================
//Stock Company Logs
//===================================================
function doStockCompanyLog() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company logs/,"Akcinės bendrovės ataskaitos");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Valiutos keityklos (MM) pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Produkcijos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Siųsti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Perduoti įmonę");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Ataskaitos");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Pilietybė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Viso akcijų");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Apytikrė vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Detaliau");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Atnaujinti");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Apytikrė akcijos vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Dienos prekybos akcijomis vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Akcininkų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Įmonių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Akcinės bendrovės instrukcija");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Log type)/,"Ataskaitos rūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Importance level)/,"Svarbos lygis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen)/,"Pilietis");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Žiūrėti ataskaitas");
	tmp.innerHTML=tmp.innerHTML.replace(/All logs/,"Visos ataskaitos");
	tmp.innerHTML=tmp.innerHTML.replace(/Money donated/,"Pinigai pervesti");
	tmp.innerHTML=tmp.innerHTML.replace(/Product donated/,"Produktai nusiųsti");
	tmp.innerHTML=tmp.innerHTML.replace(/Company bought/,"Įmonė nupirkta");
	tmp.innerHTML=tmp.innerHTML.replace(/Job offer created/,"Darbo pasiūlymas sukurtas");
	tmp.innerHTML=tmp.innerHTML.replace(/Job offer edited/,"Darbo pasiūlymas pakeistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Post sell company offer/,"Pasiūlyti įmonę pardavimui");
	tmp.innerHTML=tmp.innerHTML.replace(/Edit sell company offer/,"Redaguoti pasiūlymą įmonės pardavimui");
	tmp.innerHTML=tmp.innerHTML.replace(/Worked fired/,"Darbuotojas atleistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Salary edited/,"Atlyginimas pakeistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Company upgraded/,"Įmonė patobulinta");
	tmp.innerHTML=tmp.innerHTML.replace(/Company downgraded/,"Įmonės lygis sumažintas");
	tmp.innerHTML=tmp.innerHTML.replace(/Delete job offer/,"Ištrinti darbo pasiūlymą");
	tmp.innerHTML=tmp.innerHTML.replace(/Company profile edited/,"Įmonės profilis pakeistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Dividend transaction/,"Dividendų sandoris");
	tmp.innerHTML=tmp.innerHTML.replace(/Dividend paid/,"Dividendai sumokėti");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares issued/,"Akcijos išduotos");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality change fee/,"Pilietybės keitimo mokestis");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality change/,"Pilietybės keitimas");
	tmp.innerHTML=tmp.innerHTML.replace(/Issued share bought/,"Išleistos akcijos nupirktos");
	tmp.innerHTML=tmp.innerHTML.replace(/Money bough/,"Pinigai nupirkti");
	tmp.innerHTML=tmp.innerHTML.replace(/Money sold/,"Pinigai parduoti");
	tmp.innerHTML=tmp.innerHTML.replace(/Money put on sale/,"Pinigai įdėti pardavimui");
	tmp.innerHTML=tmp.innerHTML.replace(/Product bought/,"Produktas nupirktas");
	tmp.innerHTML=tmp.innerHTML.replace(/Product put on sale/,"Produktas įdėtas pardavimui");
	tmp.innerHTML=tmp.innerHTML.replace(/Product sold/,"Produktas parduotas");
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary offer deleted/,"Valiutos pasiūlymas ištrintas");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offer deleted/,"Produkto pasiūlymas ištrintas");
	tmp.innerHTML=tmp.innerHTML.replace(/Name and avatar change/,"Vardo ir avatar'o keitimas");
	tmp.innerHTML=tmp.innerHTML.replace(/Money removed by moderator/,"Moderatorius pašalino pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/Products removed by moderator/,"Moderatorius pašalino produktus");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares removed by moderator/,"moderatorius pašalino akcijas");
	tmp.innerHTML=tmp.innerHTML.replace(/Company donated/,"Įmonė perduota");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares split/,"Akcijos padalintos");
	tmp.innerHTML=tmp.innerHTML.replace(/Important/,"Svarbus");
	tmp.innerHTML=tmp.innerHTML.replace(/Moderate/,"Vidutinis");
	tmp.innerHTML=tmp.innerHTML.replace(/Trivial/,"Nesvarbus");
	tmp.innerHTML=tmp.innerHTML.replace(/All citizens/,"Visi piliečiai");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Time/,"Laikas");
	tmp.innerHTML=tmp.innerHTML.replace(/Log/,"Ataskaita");
	tmp.innerHTML=tmp.innerHTML.replace(/Type/,"Rūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/Importance/,"Svarbumas");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Pilietis");
	  if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"prieš sekundę");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"prieš minutę");
    }                                           
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"prieš valandą");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"vakar");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"prieš mėnesį");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"prieš $2 sek. ");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"prieš $2 min.");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"prieš $2 val.");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"prieš $2 d.");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"prieš $2 mėn.");
    }
	tmp.innerHTML=tmp.innerHTML.replace(/Money donated/g,"Pinigai nusiųsti");
	tmp.innerHTML=tmp.innerHTML.replace(/Product donated/g,"Produktai nusiųsti");
	tmp.innerHTML=tmp.innerHTML.replace(/Company bought/g,"Įmonė nupirkta");
	tmp.innerHTML=tmp.innerHTML.replace(/Job offer created/g,"Darbo pasiūlymas sukurtas");
	tmp.innerHTML=tmp.innerHTML.replace(/Job offer edited/g,"Darbo pasiūlymas pakeistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Post sell company offer/,"Pasiūlyti įmonę pardavimui");
	tmp.innerHTML=tmp.innerHTML.replace(/Edit sell company offer/,"Redaguoti pasiūlymą įmonės pardavimui");
	tmp.innerHTML=tmp.innerHTML.replace(/Worked fired/,"Darbuotojas atleistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Salary edited/,"Atlyginimas pakeistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Company upgraded/,"Įmonė patobulinta");
	tmp.innerHTML=tmp.innerHTML.replace(/Company downgraded/,"Įmonės lygis sumažintas");
	tmp.innerHTML=tmp.innerHTML.replace(/Delete job offer/,"Ištrinti darbo pasiūlymą");
	tmp.innerHTML=tmp.innerHTML.replace(/Company profile edited/,"Įmonės profilis pakeistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Dividend transaction/,"Dividendų sandoris");
	tmp.innerHTML=tmp.innerHTML.replace(/Dividend paid/,"Dividendai sumokėti");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares issued/,"Akcijos išduotos");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality change fee/,"Pilietybės keitimo mokestis");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality change/,"Pilietybės keitimas");
	tmp.innerHTML=tmp.innerHTML.replace(/Issued share bought/,"Išleistos akcijos nupirktos");
	tmp.innerHTML=tmp.innerHTML.replace(/Money bough/,"Pinigai nupirkti");
	tmp.innerHTML=tmp.innerHTML.replace(/Money sold/,"Pinigai parduoti");
	tmp.innerHTML=tmp.innerHTML.replace(/Money put on sale/,"Pinigai įdėti pardavimui");
	tmp.innerHTML=tmp.innerHTML.replace(/Product bought/,"Produktas nupirktas");
	tmp.innerHTML=tmp.innerHTML.replace(/Product put on sale/,"Produktas įdėtas pardavimui");
	tmp.innerHTML=tmp.innerHTML.replace(/Product sold/,"Produktas parduotas");
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary offer deleted/,"Valiutos pasiūlymas ištrintas");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offer deleted/,"Produkto pasiūlymas ištrintas");
	tmp.innerHTML=tmp.innerHTML.replace(/Name and avatar change/,"Vardo ir avatar'o keitimas");
	tmp.innerHTML=tmp.innerHTML.replace(/Money removed by moderator/,"Moderatorius pašalino pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/Products removed by moderator/,"Moderatorius pašalino produktus");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares removed by moderator/,"moderatorius pašalino akcijas");
	tmp.innerHTML=tmp.innerHTML.replace(/Company donated/,"Įmonė perduota");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares split/,"Akcijos padalintos");
	tmp.innerHTML=tmp.innerHTML.replace(/Important/,"Svarbus");
	tmp.innerHTML=tmp.innerHTML.replace(/Moderate/,"Vidutinis");
	tmp.innerHTML=tmp.innerHTML.replace(/Trivial/,"Nesvarbus");
}

	
//======


//===================================================
//Stock Company Company Donate
//===================================================
function doStockCompanyDonateC() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Perduoti įmonę");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Valiutos keityklos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Produkcijos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Siųsti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Siųsti produktus");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Ataskaitos");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Pilietybė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Viso akcijų");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Apytikrė vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Detaliau");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Atnaujinti");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Apytikrė akcijos vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Dienos prekybos akcijomis vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Akcininkų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Įmonių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Akcinės bendrovės instrukcija");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select company to transfer)/,"Pasirinkite įmonę perdavimui");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate company)/,"Perduoti įmonę");
	tmp.innerHTML=tmp.innerHTML.replace(/(Select company)/,"Pasirinkti įmonę");
}


//===================================================
//Stock Company Money Donate
//===================================================
function doStockCompanyDonateM() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money to stock company/,"Siųsti pinigus į akcinę bendrovę");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Valiutos keityklos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Produkcijos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Siųsti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Siųsti produktus");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Ataskaitos");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Pilietybė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Viso akcijų");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Apytikrė vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Detaliau");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Atnaujinti");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Apytikrė akcijos vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Dienos prekybos akcijomis vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Akcininkų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Įmonių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Akcinės bendrovės instrukcija");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Donate to/,"Siųsti");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company/,"Akcinė bendrovė");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Your money accounts/,"Tavo pinigų sąskaitos");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/,"Aukso");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Select item to donate/,"Pasirinkite pinigus siuntimui");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate item/,"Siųsti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/Sum/,"Suma");
	tmp.innerHTML=tmp.innerHTML.replace(/Reason/,"Priežastis");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate/,"Siųsti");
}


//===================================================
//Stock Company Storage
//===================================================
function doStockCompanyStorage() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company storage/,"Akcinės bendrovės sandėlis");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Valiutos keityklos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Produkcijos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Siųsti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Siųsti produktus");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Ataskaitos");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Pilietybė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Viso akcijų");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Apytikrė vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Detaliau");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Atnaujinti");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Apytikrė akcijos vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Dienos prekybos akcijomis vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Akcininkų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Įmonių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Akcinės bendrovės instrukcija");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Storage/,"Sandėlis");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Company offers/,"Bendrovės pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/,"Pardavėjas");
	tmp.innerHTML=tmp.innerHTML.replace(/Product/,"Produktai");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock/,"Ištekliai");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/g,"Kaina");
	tmp.innerHTML=tmp.innerHTML.replace(/Gross/,"Brutto");
	tmp.innerHTML=tmp.innerHTML.replace(/Net/,"Netto");
	tmp.innerHTML=tmp.innerHTML.replace(/Vat/,"PVM");
	tmp.innerHTML=tmp.innerHTML.replace(/Import tax/,"Importo mokestis");
	tmp.innerHTML=tmp.innerHTML.replace(/No offers/,"Pasiūlymų nėra");
}
 
//===================================================
//Stock Company Money
//===================================================
function doStockCompanyMoney() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company money accounts/,"Akcinės bendrovės pinigų sąskaitos");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Valiutos keityklos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Produkcijos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Siųsti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Siųsti produktus");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Ataskaitos");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Pilietybė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Viso akcijų");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Apytikrė vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Detaliau");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Atnaujinti");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Apytikrė akcijos vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Dienos prekybos akcijomis vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Akcininkų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Įmonių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Akcinės bendrovės instrukcija");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Money accounts/,"Pinigų sąskaitos");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/,"Aukso");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Company offers/,"Bendrovės pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/,"Pardavėjas");
	tmp.innerHTML=tmp.innerHTML.replace(/Amount/,"Kiekis");
	tmp.innerHTML=tmp.innerHTML.replace(/Ratio/,"Kursas");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy/,"Pirkti");
	tmp.innerHTML=tmp.innerHTML.replace(/No offers/,"Pasiūlymų nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Kitas");
}

//===================================================
//Stock Company Transactions
//===================================================
function doStockCompanyTransactions() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock Company transaction/,"Akcinės bendrovės pervedimai");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Valiutos keityklos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Produkcijos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Siųsti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Siųsti produktus");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Ataskaitos");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Pilietybė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Viso akcijų");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Apytikrė vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Detaliau");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Atnaujinti");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Apytikrė akcijos vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Dienos prekybos akcijomis vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Akcininkų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Įmonių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Akcinės bendrovės instrukcija");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/,"Pardavėjas");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/,"Kaina");
	tmp.innerHTML=tmp.innerHTML.replace(/Volume/,"Sumos");
	tmp.innerHTML=tmp.innerHTML.replace(/Time/,"Laikas");
	tmp.innerHTML=tmp.innerHTML.replace(/Buyer/,"Pirkėjas");
  if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"prieš sekundę");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"prieš minutę");
    }                                           
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"prieš valandą");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"vakar");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"prieš mėnesį");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"prieš $2 sek. ");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"prieš $2 min.");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"prieš $2 val.");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"prieš $2 d.");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"prieš $2 mėn.");
    } 
        
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Kitas");
}


//===================================================
//Stock Company Laws
//===================================================
function doStockCompanyLaws() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company law/,"Akcinės bendrovės įstatymai");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Valiutos keityklos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Produkcijos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Siųsti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Siųsti produktus");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Ataskaitos");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Pilietybė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Viso akcijų");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Apytikrė vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Detaliau");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Atnaujinti");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Apytikrė akcijos vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Dienos prekybos akcijomis vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Akcininkų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Įmonių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Akcinės bendrovės instrukcija");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Act type/,"Akto rūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/Proposed by/,"Pasiūlė");
	  if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"prieš sekundę");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"prieš minutę");
    }                                           
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"prieš valandą");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"vakar");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"prieš mėnesį");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"prieš $2 sek. ");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"prieš $2 min.");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"prieš $2 val.");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"prieš $2 d.");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"prieš $2 mėn.");
    }
	tmp.innerHTML=tmp.innerHTML.replace(/Issue shares/,"Išleisti akcijas");
	tmp.innerHTML=tmp.innerHTML.replace(/Pay dividend/,"Mokėti dividendus");
	tmp.innerHTML=tmp.innerHTML.replace(/Propose/,"Siūlyti");
	tmp.innerHTML=tmp.innerHTML.replace(/Sack/,"Atleisti");
	tmp.innerHTML=tmp.innerHTML.replace(/\?/,"?");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to issue and put on sale/,"Ar sutinkate išleisti ir įdėti pardavimui");
	tmp.innerHTML=tmp.innerHTML.replace(/shares at price/,"akcijų, kurių kaina būtų");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/,"aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/per share/,"už vieną akciją");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to pay/,"Ar sutinkate sumokėti");
	tmp.innerHTML=tmp.innerHTML.replace(/to shareholders/,"akcininkams");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to hire/,"Ar sutinkate pasamdyti");
	tmp.innerHTML=tmp.innerHTML.replace(/as CEO of the company/,"užimti bendrovės Generalinio direktoriaus (CEO) pareigas");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to sack the current CEO/,"Ar sutinkate su dabartinio Generalionio direktoriaus (CEO) atleidimu iš darbo");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/Voting finished/,"Balsavimas baigėsi");
	tmp.innerHTML=tmp.innerHTML.replace(/Fail reason/,"Nesėkmės priežastis");
	tmp.innerHTML=tmp.innerHTML.replace(/Yes/,"Taip");
	tmp.innerHTML=tmp.innerHTML.replace(/No/,"Ne");
	  if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"prieš sekundę");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"prieš minutę");
    }                                           
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"prieš valandą");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"vakar");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"prieš mėnesį");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"prieš $2 sek. ");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"prieš $2 min.");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"prieš $2 val.");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"prieš $2 d.");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"prieš $2 mėn.");
    }
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/Supporting shareholders/,"Pritariantys akcininkai");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholders against/,"Nepritariantys akcininkai");
	tmp.innerHTML=tmp.innerHTML.replace(/Nobody/g,"Niekas");
}


//===================================================
//Stock Company Acts
//===================================================
function doStockCompanyActs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company acts/,"Akcinės bendrovės aktai");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Valiutos keityklos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Produkcijos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Siųsti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Siųsti produktus");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Ataskaitos");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Pilietybė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Viso akcijų");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Apytikrė vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Detaliau");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Atnaujinti");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Apytikrė akcijos vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Dienos prekybos akcijomis vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Akcininkų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Įmonių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Akcinės bendrovės instrukcija");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Acts/,"Aktai");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Type/,"Rūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/Status/,"Būsena");
	tmp.innerHTML=tmp.innerHTML.replace(/Results/,"Rezultatas");
	tmp.innerHTML=tmp.innerHTML.replace(/Yes:No/,"Taip:Ne");
	tmp.innerHTML=tmp.innerHTML.replace(/Time/,"Laikas");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/g,"Detaliau");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/g,"Priimta");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected/g,"Atmesta");
	  if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"prieš sekundę");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"prieš minutę");
    }                                           
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"prieš valandą");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"vakar");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"prieš mėnesį");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"prieš $2 sek. ");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"prieš $2 min.");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"prieš $2 val.");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"prieš $2 d.");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"prieš $2 mėn.");
    }
	tmp.innerHTML=tmp.innerHTML.replace(/Issue shares/g,"Išleisti akcijas");
	tmp.innerHTML=tmp.innerHTML.replace(/Pay dividend/g,"Mokėti dividendus");
	tmp.innerHTML=tmp.innerHTML.replace(/Propose/g,"Siūlyti");
	tmp.innerHTML=tmp.innerHTML.replace(/Sack/g,"Atleisti");
}


//===================================================
//Stock Company
//===================================================
function doStockCompany() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company/,"Akcinė bendrovė");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Valiutos keityklos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Produkcijos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Siųsti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Siųsti produktus");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Ataskaitos");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Pilietybė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Viso akcijų");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Apytikrė vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Detaliau");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Atnaujinti");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Apytikrė akcijos vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Dienos prekybos akcijomis vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Akcininkų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Įmonių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Akcinės bendrovės instrukcija");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Company statute/,"Bendrovės statutai");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Acts/,"Aktai");
	tmp.innerHTML=tmp.innerHTML.replace(/Type/,"Rūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/Status/,"Būsena");
	tmp.innerHTML=tmp.innerHTML.replace(/Time/g,"Laikas");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/g,"Priimta");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/g,"Nepavykę");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"???????????? ????");
	 if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"prieš sekundę");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"prieš minutę");
    }                                           
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"prieš valandą");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"vakar");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"prieš mėnesį");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"prieš $2 sek. ");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"prieš $2 min.");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"prieš $2 val.");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"prieš $2 d.");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"prieš $2 mėn.");
    } 
	tmp.innerHTML=tmp.innerHTML.replace(/More acts/,"Daugiau aktų");
	tmp.innerHTML=tmp.innerHTML.replace(/Issue shares/g,"Išleisti akcijas");
	tmp.innerHTML=tmp.innerHTML.replace(/Pay dividend/g,"Mokėti dividendus");
	tmp.innerHTML=tmp.innerHTML.replace(/Propose/g,"Siūlyti");
	tmp.innerHTML=tmp.innerHTML.replace(/Sack/g,"Atleisti");
	tmp.innerHTML=tmp.innerHTML.replace(/Staff/,"Personalas");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/g,"Pilietis");
	tmp.innerHTML=tmp.innerHTML.replace(/Role/,"Pareigos");
	tmp.innerHTML=tmp.innerHTML.replace(/Company manager/,"Įmonės valdytojas");
	tmp.innerHTML=tmp.innerHTML.replace(/Accountant/,"Buhalteris");
	tmp.innerHTML=tmp.innerHTML.replace(/Supply manager/,"Tiekimo vadybininkas");
	tmp.innerHTML=tmp.innerHTML.replace(/Companies/,"Įmonės");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy orders/,"Pirkimo nurodymai ");
	tmp.innerHTML=tmp.innerHTML.replace(/Buyer/,"Pirkėjas");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares market/,"Akcijų birža");
	tmp.innerHTML=tmp.innerHTML.replace(/Offered shares/,"Siūlomas akcijos ");
	tmp.innerHTML=tmp.innerHTML.replace(/Ask/,"Klausti");
	tmp.innerHTML=tmp.innerHTML.replace(/Volume/g,"Kiekiai");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/g,"Kaina");
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/,"Pardavėjas");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy/g,"Pirkti");
	tmp.innerHTML=tmp.innerHTML.replace(/Bid/,"Statymas");
	tmp.innerHTML=tmp.innerHTML.replace(/Buyer/,"Pirkėjas");
	tmp.innerHTML=tmp.innerHTML.replace(/Sell/g,"Parduoti");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/more offer\(s\)/g,"daugiau pasiūlymų");
	tmp.innerHTML=tmp.innerHTML.replace(/View previous transactions/,"Žiūrėti ansktesnius pervedimus");
	tmp.innerHTML=tmp.innerHTML.replace(/Post buy order/,"Įdėti pirkimo pasiūlymą");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholders/,"Akcininkai");
	tmp.innerHTML=tmp.innerHTML.replace(/Minor shareholders/,"Smulkieji akcininkai");
	tmp.innerHTML=tmp.innerHTML.replace(/Show/g,"Rodyti");
	tmp.innerHTML=tmp.innerHTML.replace(/Put buy offer/,"Patalpinti pirkimo pasiūlymą");
	tmp.innerHTML=tmp.innerHTML.replace(/Latest transactions/,"Vėliausi pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/View more transactions/,"Peržiūrėti daugiau pervedimų");
}




//===================================================
//Stock Company Assets
//===================================================
function doStockCompanyAssets() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company assets/,"Akcinės bendrovės lėšos");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Valiutos keityklos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Produkcijos pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Siųsti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Siųsti produktus");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Ataskaitos");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Pilietybė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Viso akcijų");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Apytikrė vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Detaliau");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Atnaujinti");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Apytikrė akcijos vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Dienos prekybos akcijomis vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Akcininkų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Įmonių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Akcinės bendrovės instrukcija");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Asset)/,"Lėšos");
	tmp.innerHTML=tmp.innerHTML.replace(/(value)/,"vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies)/,"Įmonės");
	tmp.innerHTML=tmp.innerHTML.replace(/Money value in gold/,"Pinigų vertė auksu");
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary offers value in gold/,"Valiutos keityklos pasiūlymų vertė auksu");
	tmp.innerHTML=tmp.innerHTML.replace(/Products/,"Produktai");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers value in gold/,"Siūlomos produkcijos vertė auksu");
	tmp.innerHTML=tmp.innerHTML.replace(/Total value/,"Bendra vertė");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Companies/,"Įmonės");
	tmp.innerHTML=tmp.innerHTML.replace(/Company/,"Įmonė");
	tmp.innerHTML=tmp.innerHTML.replace(/Region/,"Regionas");
	tmp.innerHTML=tmp.innerHTML.replace(/Occupant/,"Okupantas");
	tmp.innerHTML=tmp.innerHTML.replace(/Value/,"Vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"aukso");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/Storage/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/Product/,"Produktas");
	tmp.innerHTML=tmp.innerHTML.replace(/Volume/,"Kiekiai");
	tmp.innerHTML=tmp.innerHTML.replace(/Value/,"Vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Ginklai");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Namai");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Dovanos");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Maistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Bilietai");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Gynybinės sistemos");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Ligoninės");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Geležis");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Grūdai");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Nafta");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Akmuo");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Mediena");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Deimantai");
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/Products on market/,"Produkcija rinkoje");
	tmp.innerHTML=tmp.innerHTML.replace(/Product/,"Produktas");
	tmp.innerHTML=tmp.innerHTML.replace(/Volume/,"Kiekis");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/g,"Kaina");
	tmp.innerHTML=tmp.innerHTML.replace(/gross/,"brutto");
	tmp.innerHTML=tmp.innerHTML.replace(/net/,"netto");
	tmp.innerHTML=tmp.innerHTML.replace(/Value/,"Vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Ginklai");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Namai");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Dovanos");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Maistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Bilietai");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Gynybinės sistemos");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Ligoninės");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Geležis");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Grūdai");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Nafta");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Akmuo");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Mediena");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Deimantai");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"aukso");
	tmp = allElements.children[13];
	tmp.innerHTML=tmp.innerHTML.replace(/Money/g,"Pinigai");
	tmp.innerHTML=tmp.innerHTML.replace(/Value/,"Vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"aukso");
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace(/Money on monetary market/,"Piingai valiutų keitykloje");
	tmp.innerHTML=tmp.innerHTML.replace(/Money/,"Pinigai");
	tmp.innerHTML=tmp.innerHTML.replace(/Exchange rate/,"Keitimo kursas");
	tmp.innerHTML=tmp.innerHTML.replace(/Value/,"Vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/No offers/,"Pasiūlymų nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"aukso");
}

	
//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
	obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"$1 įsipareigojimai");
	} else {
	if (kbn==2) {
	obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"Kito piliečio įsirageigojimai")
	obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/,"Kitas pilietis");
	} else {
	obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"$1 įsipareigojimai")
	}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," tuojau pat atsiųs šiuos produktus");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," tuojau pat atsiųst šią sumą pinigų");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt/," paskola kainuos");
	obj.innerHTML=obj.innerHTML.replace(
	/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
	"turi būti sumokėta iki $1$3$5 žaidimo dienos ( praėjus $6 dienoms nuo kontakto pasirašymo) "
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
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Kontraktai");
	allElements = allElements.children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"Kontraktas");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"Kontrakto būsena: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"Priimtas");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"Atmestas žaidėjo $1 ");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"Nepavykęs");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"Ruošinys");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"Pridėti naują poziciją kontraktui");
	
	allElements = document.getElementById('contractsForm');
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Side/,"Pusė");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"Produkto tipas");
	
	allElements = document.getElementById('offererSide');
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Kitas pilietis");
	
	//money
	allElements = document.getElementById('itemTypeList');
	replaceOptionTxt(allElements, {
	"Money":["Money","Pinigai"],
	"Product":["Product","Produktas"],
	"Debt":["Debt","Skola"]
	});
	
	allElements = document.getElementById('MONEYParameters');
	tmp = allElements.children[0].childNodes[0];
	tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Pinigai  ( ");
	
	//Product
	allElements = document.getElementById('PRODUCTParameters');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"Kiekis:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"Produkto rūšis:");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Produktų kiekis:");
	
	allElements = document.getElementById('resource');
	replaceOptionTxt(allElements, {
	"Iron":["Iron","Geležis"],
	"Grain":["Grain","Grūdai"],
	"Oil":["Oil","Nafta"],
	"Stone":["Stone","Akmuo"],
	"Wood":["Wood","Mediena"],
	"Diamonds":["Diamonds","Deimantai"],
	"Weapon":["Weapon","Ginklai"],
	"House":["House","Namas"],
	"Gift":["Gift","Dovanos"],
	"Food":["Food","Maistas"],
	"Ticket":["Ticket","Bilietas"],
	"Defense System":["Defense System","Gynybinė sistema"],
	"Hospital":["Hospital","Ligoninė"]
	});
	
	//Debt
	allElements = document.getElementById('DEBTParameters');
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"Paskola");
	tmp = allElements.children[3].childNodes[0];
	tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Pinigai ( ");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"Grąžinimo data:");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Produkto kokybė:");
	
	//propose
	allElements = document.getElementById('contentRow').children[1].children[5];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"Pasiūlyti kontraktą");
	tmp = allElements.children[2].children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Pasiūlyti žaidėjui");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"Pastaba:");
	tmp = allElements.childNodes[12];
	tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"Kontraktus galima siųlyti tik draugams");
	}
	
	replaceLinkByHref({
	"profile.html?id=0":["Dummy citizen","Kitas pilietis"],
	"contracts.html":["Go back to contract list","Grįžti į kontraktų sąrašą"]
	});
	replaceInputByValue({
	"Delete":["Delete","Trinti"],
	"Propose":["Propose","Siūlyti"],
	"Add item":["Add item","Pridėti"]
	});
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1)
	if (check.innerHTML.match("Cancel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"Atšaukti pasiūlymą")
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","Atšaukti pasiūlymą"]});
	    }   
}
//===================================================
//Invite friends
//===================================================

function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"Kviesti draugus");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/,"Tavo pakvietimo nuoroda");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/,"Siųskite šią nuorodą draugams ir gausite papildomo");
    tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"Uždirbsite");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who registers/,"aukso už kiekvieną pakvietą žaidėją, kuris prisiregistruos ");
    tmp.innerHTML = tmp.innerHTML.replace(/and reaches level 7/,"ir pasieks 7 lygį");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"naudojantis tavo nuorodo");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"ir dar ");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she gets his\/her/,"aukso, kada jis/ji gaus savo ");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/,"pirmajį medalį");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"Papildomai gausite ");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"10% nuo sumos, kurią Tavo pakvietas žaidėjas gavo už naujus medalius ar naujai pasiektą lygį");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive an additional/,"pakviesti draugai taip pat gaus papildomo");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering through your game invitation link when they reach level 7/,"ausko, užsiregistravę naudojantis Tavo nuoroda ir pasiekę 7 lygį");
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"Pakviesti piliečiai");
    tmp = allElements.children[5]
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"Rūšiavimas pagal");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"Rodyti");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Pilietis");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"Lygis");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"Gauta aukso");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"Registracijos data");
    
    TimeBasic(allElements,6,0,4)
    
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Statistics/,"Statistika");
    tmp.innerHTML = tmp.innerHTML.replace(/Total clicks on referral link/,"Nuorodos paspaudimų skaičius");
    tmp.innerHTML = tmp.innerHTML.replace(/Unique clicks on referral link/,"Unikalių paspaudimų skaičius");
    tmp.innerHTML = tmp.innerHTML.replace(/Total citizens registered/,"Prisiregistravusių žaidėjų");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens who reached level 7/,"7 lygį pasiekę žaidėjai");
    tmp = allElements.children[14]
    tmp.innerHTML = tmp.innerHTML.replace(/Latest clicks on referrer link/,"Naujausi nuorodos paspaudimai");
    tmp = allElements.children[15]
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Laikas");
    tmp.innerHTML = tmp.innerHTML.replace(/Referrer/,"Kvietėjas");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Pilietis");
    
    TimeBasic(allElements,15,0,0)
    
    tmp = allElements.children[15].children[0]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3]
        if (tmp.innerHTML.match(/Not registered/)) {	
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"Neregistruotas");
            }        
    }
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"Rodyti daugiau paspaudimų");
    
 }

//===================================================
//Referrer Clicks
//===================================================
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l]
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {	
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/,"prieš sekundę");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"prieš minutę");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"prieš valandą");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"prieš dieną");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"prieš mėnesį");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"prieš $1 sek. ");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"prieš $1 min.");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"prieš $1 val. ");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"prieš $1 d. ");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"prieš $1 mėn. ");
            } 
        }
    }
}
 
//===================================================
//Military Unit
//===================================================
function doMilitaryUnit() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit)/,"Karinis būrys (MU)");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(You are not in any military unit)/,"Nepriklausote jokiam kariniam būriui");
	tmp.innerHTML=tmp.innerHTML.replace(/(Join existing one)/,"Įstoti!");
	tmp.innerHTML=tmp.innerHTML.replace(/(Create military unit)/,"Sukurti naują karinį būrį");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(You need to have level)/,"Turite būti pasiekęs lygį:");
	tmp.innerHTML=tmp.innerHTML.replace(/(to join military unit)/,", kad galėtumėte įstoti į karinį būrį");
	
	tmp = allElements.children[4];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Redaguoti karinį būrį");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Keisti valstybę");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"PRivilegijos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Pinigų sąskaita");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Darbo pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Naujokų ėmimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"laukiančios paraiškos");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Peržiūrėti išklotines");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Karinis laipsnis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Narių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Maks. narių");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Bendra žala mūšiuose");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Šiandienos žala");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Vadas");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Padidinti narių vietų skaičių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Patobulinti į");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Aukso");
	replaceInputByValue({"Leave military unit":["Leave military unit","Palikti karinį būrį"]});
	
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(Description)/,"Aprašymas");
	
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Current orders)/,"Kariniai nurodymai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle:)/,"Mūšis:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Sukilimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Subsidijos:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Side:)/,"Pusė:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Briefing:)/,"Instruktažas:");
	tmp.innerHTML=tmp.innerHTML.replace(/(visible for members only)/,"matoma tik būrio nariams");
	tmp.innerHTML=tmp.innerHTML.replace(/Set orders/,"Nustatyti nurodymus");
	
	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	replaceAlliesLinksss();
	
	//for( var i=0; i<2;i++){
	//tmp.innerHTML=tmp.innerHTML.replace(/(: none)/,": nėra");
	//tmp.innerHTML=tmp.innerHTML.replace(/(no allies)/,"be sąj.");
	//	}
	
	tmp.innerHTML=tmp.innerHTML.replace(/(battle won by)/,"mūšį laimėjo");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit)/,"Redaguoti");
	tmp.innerHTML=tmp.innerHTML.replace(/(orders)/,"nurodymai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Set today's battle)/,"Nustatyti šiandienos nurodymus");
	tmp.innerHTML=tmp.innerHTML.replace(/(No battles at this moment)/,"Šiuo metu mūšių nėra");
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Nariai");
	tmp.innerHTML=tmp.innerHTML.replace(/(View)/,"Žiūrėti");
	tmp.innerHTML=tmp.innerHTML.replace(/(manage members)/,"koreguoti narius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies)/,"Įmonės");
	tmp.innerHTML=tmp.innerHTML.replace(/(No companies)/,"Įmonių nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/(See all companies)/,"Žiūrėti visas įmones");

	replaceLinkByHref({
	"http://wiki.e-sim.org/index.php/Military_unit":["Military units tutorial","Karinio būrio wiki"]
	});
}

    
//===================================================
//Military Unit Edit
//===================================================
function doMUEdit() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/Edit military unit/,"??????????? ???????????? ???????");
	
	tmp = allElements.children[5];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Redaguoti karinį būrį");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Keisti valstybę");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"PRivilegijos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Pinigų sąskaita");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Darbo pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Naujokų ėmimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"laukiančios paraiškos");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Peržiūrėti išklotines");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Karinis laipsnis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Narių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Maks. narių");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Bendra žala mūšiuose");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Šiandienos žala");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Vadas");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Padidinti narių vietų skaičių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Patobulinti į");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Aukso");
	replaceInputByValue({"Leave military unit":["Leave military unit","Palikti karinį būrį"]});
	
    tmp = allElements.children[7];
	tmp.innerHTML = tmp.innerHTML.replace(/Edit military unit/g,"Redaguoti karinį būrį");
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit name/,"Karinio būrio pavadinimas");
    tmp.innerHTML = tmp.innerHTML.replace(/New avatar/,"Naujas avataras");
    tmp.innerHTML = tmp.innerHTML.replace(/max. size/,"maks. dydis");
    tmp.innerHTML = tmp.innerHTML.replace(/Description/,"Aprašymas");
	
	tmp = allElements.children[10];
    tmp.innerHTML = tmp.innerHTML.replace(/Hand over leadership to other player/,"PPerduoti vado teises kitam žaidėjui");
    tmp.innerHTML = tmp.innerHTML.replace(/Player/,"Žaidėjas");
    tmp.innerHTML = tmp.innerHTML.replace(/Hand over leadership/,"Perduoti vado teises");
    tmp.innerHTML = tmp.innerHTML.replace(/WARNING: this will leave you without any control on your military unit/,"ĮSPĖJIMAS: tai nepaliks Jums jokių būrio valdymo teisių");
}

//===================================================
//Military Unit Nationality
//===================================================
function doMUNationality() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/Edit military unit/,"?????? ??????????? ???????????? ???????");
	
	tmp = allElements.children[5];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Redaguoti karinį būrį");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Keisti valstybę");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"PRivilegijos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Pinigų sąskaita");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Darbo pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Naujokų ėmimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"laukiančios paraiškos");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Peržiūrėti išklotines");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Karinis laipsnis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Narių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Maks. narių");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Bendra žala mūšiuose");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Šiandienos žala");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Vadas");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Padidinti narių vietų skaičių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Patobulinti į");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Aukso");
	replaceInputByValue({"Leave military unit":["Leave military unit","Palikti karinį būrį"]});
	
    tmp = allElements.children[9];
	tmp.innerHTML = tmp.innerHTML.replace(/Issue nationality change/,"Paprašyti būrio pilietybės keitimo");
    tmp.innerHTML = tmp.innerHTML.replace(/New nationality/,"Nauja pilietybė");
    tmp.innerHTML = tmp.innerHTML.replace(/Issue chamge/,"Prašyti keitimo");
    tmp.innerHTML = tmp.innerHTML.replace(/Issuing nationality change cost/,"Pilietybės keitimo prašymas kainuoja");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold and needs to be accepted by congress/,"aukso ir privalo būti patvirtintas kongreso");
}


//===================================================
//Military Unit Privilages
//===================================================
function doMUPriv() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit members/,"???????? ????? ???????????? ???????");
	
	tmp = allElements.children[4];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Redaguoti karinį būrį");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Keisti valstybę");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"PRivilegijos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Pinigų sąskaita");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Darbo pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Naujokų ėmimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"laukiančios paraiškos");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Peržiūrėti išklotines");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Karinis laipsnis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Narių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Maks. narių");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Bendra žala mūšiuose");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Šiandienos žala");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Vadas");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Padidinti narių vietų skaičių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Patobulinti į");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Aukso");
	replaceInputByValue({"Leave military unit":["Leave military unit","Palikti karinį būrį"]});
	
    tmp = allElements.children[6];
	tmp.innerHTML = tmp.innerHTML.replace(/Officers/,"Karininkai");
    tmp.innerHTML = tmp.innerHTML.replace(/Are allowed to change orders/,"Gali keisti nurodymus");
    tmp.innerHTML = tmp.innerHTML.replace(/Add officer/,"Pridėti karininką");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove officer/,"Pašalinti karininką");
    tmp.innerHTML = tmp.innerHTML.replace(/Add/,"Pridėti");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove/,"Pašalinti");
	
	tmp = allElements.children[7];
	tmp.innerHTML = tmp.innerHTML.replace(/Director of personnel/,"Personalo vadovas");
    tmp.innerHTML = tmp.innerHTML.replace(/Allowed to accept\/decline candidatures/,"Gali priimti / atmesti paraiškas");
    tmp.innerHTML = tmp.innerHTML.replace(/Add director of personnel/,"Pridėti personalo vadovą");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove director of personnel/,"Pašalinti personalo vadovą");
    tmp.innerHTML = tmp.innerHTML.replace(/Add/,"pridėti");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove/,"Pašalinti");
	
	tmp = allElements.children[10];
	tmp.innerHTML = tmp.innerHTML.replace(/Storage director/,"Sandėlio valdytojas");
    tmp.innerHTML = tmp.innerHTML.replace(/Allowed to send money and items from unit's storage/,"Turi teisę siųsti produkciją iš būrio sandėlio");
    tmp.innerHTML = tmp.innerHTML.replace(/Add storage director/,"Pridėti sandėlio valdytoją");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove storage director/,"Pašalinti sandėlio valdytoją");
    tmp.innerHTML = tmp.innerHTML.replace(/Add/,"Pridėti");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove/,"Pašalinti");
	
	tmp = allElements.children[11];
	tmp.innerHTML = tmp.innerHTML.replace(/Company Managers/,"Įmonių valdytojai");
    tmp.innerHTML = tmp.innerHTML.replace(/Are allowed to fire\/hire people in companies/,"Gali atleisti / priimti darbuotojus įmonėse");
    tmp.innerHTML = tmp.innerHTML.replace(/Add company manager/,"Pridėti įmonių valdytoją");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove company manager/,"Pašalinti įmonių valdytoją");
    tmp.innerHTML = tmp.innerHTML.replace(/Add/,"Pridėti");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove/,"Pašalinti");
}
 
//===================================================
//Military Unit Storage
//===================================================
function doMUStorage() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit donations/,"Karinio būriu pervedimai");
	
	tmp = allElements.children[5];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Redaguoti karinį būrį");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Keisti valstybę");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"PRivilegijos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Pinigų sąskaita");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Darbo pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Naujokų ėmimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"laukiančios paraiškos");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Peržiūrėti išklotines");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Karinis laipsnis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Narių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Maks. narių");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Bendra žala mūšiuose");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Šiandienos žala");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Vadas");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Padidinti narių vietų skaičių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Patobulinti į");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Aukso");
	replaceInputByValue({"Leave military unit":["Leave military unit","Palikti karinį būrį"]});
	
    tmp = allElements.children[9];
	tmp.innerHTML = tmp.innerHTML.replace(/Storage/,"Sandėlis");
	
	tmp = allElements.children[7];
    tmp.innerHTML = tmp.innerHTML.replace(/Batch donate to members/,"Paketo siuntimas nariams");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate item/,"Siųsti produktus");
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Kiekis");
    tmp.innerHTML = tmp.innerHTML.replace(/per one recipient/,"per vieną gavėją");
    tmp.innerHTML = tmp.innerHTML.replace(/Reason/,"Priežastis");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate to/,"Siųsti");
    tmp.innerHTML = tmp.innerHTML.replace(/tick recipients/,"pažymėti gavėjus");
    tmp.innerHTML = tmp.innerHTML.replace(/Tick all/,"Žymėti visus");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate/,"Siųsti");
	
	allElements = document.getElementById('product');
	replaceOptionTxt(allElements, {
	"available":["available","galimi"],
	})
}



//===================================================
//Military Unit Money
//===================================================
function doMUMoney() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit donations/,"?????????? ??????????? ???????????? ???????");
	
	tmp = allElements.children[5];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Redaguoti karinį būrį");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Keisti valstybę");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"PRivilegijos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Pinigų sąskaita");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Darbo pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Naujokų ėmimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"laukiančios paraiškos");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Peržiūrėti išklotines");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Karinis laipsnis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Narių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Maks. narių");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Bendra žala mūšiuose");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Šiandienos žala");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Vadas");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Padidinti narių vietų skaičių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Patobulinti į");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Aukso");
	replaceInputByValue({"Leave military unit":["Leave military unit","Palikti karinį būrį"]});
	
    tmp = allElements.children[9];
	tmp.innerHTML = tmp.innerHTML.replace(/Military unit money accounts/,"Karinio būrio pinigų sąskaita");
	
	tmp = allElements.children[7];
    tmp.innerHTML = tmp.innerHTML.replace(/Batch donate to members/,"Paketo siuntimas nariams");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate item/,"Siųsti produktus");
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Kiekis");
    tmp.innerHTML = tmp.innerHTML.replace(/per one recipient/,"per vieną gavėją");
    tmp.innerHTML = tmp.innerHTML.replace(/Reason/,"Priežastis");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate to/,"Siųsti");
    tmp.innerHTML = tmp.innerHTML.replace(/tick recipients/,"pažymėti gavėjus");
    tmp.innerHTML = tmp.innerHTML.replace(/Tick all/,"Žymėti visus");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate/,"Siųsti");
}

 
//===================================================
//Military Unit Donations
//===================================================
function doMUDonations() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit donations/,"Karinio būrio pervedimai");
	
	tmp = allElements.children[4];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Redaguoti karinį būrį");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Keisti valstybę");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Privilegijos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Pinigų sąskaita");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Darbo pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Naujokų ėmimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"laukiančios paraiškos");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Peržiūrėti išklotines");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Karinis laipsnis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Narių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Maks. narių");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Bendra žala mūšiuose");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Šiandienos žala");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Vadas");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Padidinti narių vietų skaičių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Patobulinti į");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Aukso");
	replaceInputByValue({"Leave military unit":["Leave military unit","Palikti karinį būrį"]});
	
    tmp = allElements.children[7];
	tmp.innerHTML = tmp.innerHTML.replace(/Storage/,"Sandėlis");
	
	tmp = allElements.children[6];
    tmp.innerHTML = tmp.innerHTML.replace(/Money/,"Pinigai");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold/,"Auksas");
    
	tmp = allElements.children[10];
	tmp.innerHTML = tmp.innerHTML.replace(/Donations history/,"Pervedimų istorija");
	tmp.innerHTML = tmp.innerHTML.replace(/Buyer\/Donator/,"Pirkėjas / Siuntėjas");
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Laikas");
    tmp.innerHTML = tmp.innerHTML.replace(/Action/,"Veiksmas");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate to/,"Siųsti");
    tmp.innerHTML = tmp.innerHTML.replace(/Seller\/Receiver/,"Pardavėjas / Gavėjas");
      if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"prieš sekundę");
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"prieš sekundę");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"prieš minutę");
    }                                           
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"prieš valandą");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"vakar");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"prieš mėnesį");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"prieš $2 sek. ");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"prieš $2 min.");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"prieš $2 val.");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"prieš $2 d.");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"prieš $2 mėn.");
    }
    
	tmp.innerHTML=tmp.innerHTML.replace(/military unit/g,"karinis būrys");
	tmp.innerHTML=tmp.innerHTML.replace(/has sent/g,"nusiuntė");
	tmp.innerHTML=tmp.innerHTML.replace(/ to/g," ");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Kitas");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Ginkų");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Namą");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Dovanų");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Maisto");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Bilietus");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Gynybinę sistemą");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Ligoninę");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Geležies");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Grūdų");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Naftos");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Akmens");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Medienos");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Deimantų");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
}

 
//===================================================
//Military Unit Jobs
//===================================================
function doMUJobs() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Job offers/,"Θέσεις εργασίας");
	
	tmp = allElements.children[3];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Redaguoti karinį būrį");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Pakeisti valstybę");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Privilegijos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Pinigų sąskaita");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Darbo pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Naujokų ėmimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"laukiančios paraiškos");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Peržiūrėti išklotines");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Karinis laipsnis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Narių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Maks. narių");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Bendra žala mūšiuose");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Šiandienos žala");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Vadas");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Padidinti narių vietų skaičių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Patobulintį į");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Aukso");
	replaceInputByValue({"Leave military unit":["Leave military unit","Palikti karinį būrį"]});
	
    tmp = allElements.children[5];
	tmp.innerHTML = tmp.innerHTML.replace(/Job offers available for members of/,"Darbo pasiūlymai galimi tik nariams, priklausantiems");
	tmp.innerHTML = tmp.innerHTML.replace(/Military unit/,"Karinis būrys");
	
 	tmp = allElements.children[8];
    tmp.innerHTML = tmp.innerHTML.replace(/Employer/,"Darbdavys");
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Įmonė");
	tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produktai");
	tmp.innerHTML = tmp.innerHTML.replace(/Minima skill/,"Minimalus pajėgumas");
    tmp.innerHTML = tmp.innerHTML.replace(/Salary/,"Atlyginimas");
    tmp.innerHTML = tmp.innerHTML.replace(/Apply/g,"Dirbti");
	tmp.innerHTML = tmp.innerHTML.replace(/Military unit/g,"Karinis būrys");
}



//===================================================
//Military Unit Recruitment
//===================================================
function doMURecruit() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[2];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Redaguoti karinį būrį");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Pakeisti valstybę");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Privilegijos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Pinigų sąskaita");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Darbo pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Naujokų ėmimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"laukiančios paraiškos");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Peržiūrėti išklotines");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Karinis laipsnis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Narių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Maks. narių");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Bendra žala mūšiuose");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Šiandienos žala");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Vadas");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Padidinti narių vietų skaičių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Patobulintį į");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Aukso");
	replaceInputByValue({"Leave military unit":["Leave military unit","Palikti karinį būrį"]});
	
    tmp = allElements.children[4];
	tmp.innerHTML = tmp.innerHTML.replace(/Recruitment/,"Naujokų ėmimas");
	tmp.innerHTML = tmp.innerHTML.replace(/Enable recruitment/,"Paskelbti naujų narių paiešką");
	tmp.innerHTML = tmp.innerHTML.replace(/Recruitment restricted to/,"Naujų narių ėmimas apribotas iki");
    tmp.innerHTML = tmp.innerHTML.replace(/only/,"tik");
    tmp.innerHTML = tmp.innerHTML.replace(/Recruitment requirements/,"Priėmimo sąlygos");
	
	tmp = allElements.children[6];
	tmp.innerHTML = tmp.innerHTML.replace(/Pending applications/,"Laukiančios paraiškos");
	tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Pilietis");
    tmp.innerHTML = tmp.innerHTML.replace(/XP/,"XP");
    tmp.innerHTML = tmp.innerHTML.replace(/Dmg./,"Žalos");
	tmp.innerHTML = tmp.innerHTML.replace(/Submitted/,"Pateikta");
	tmp.innerHTML = tmp.innerHTML.replace(/Application/,"Paraiška");
	tmp.innerHTML = tmp.innerHTML.replace(/Decision/,"Sprendimas");
	if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"prieš sekundę");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"prieš minutę");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"prieš valandą");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"vakar");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"prieš mėnesį");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"prieš $2 sek.");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"prieš $2 min.");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"prieš $2 val.");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"prieš $2 d.");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"prieš $2 mėn.");
    } 
	tmp.innerHTML=tmp.innerHTML.replace(/Accept/g,"Patvirtinti");
	tmp.innerHTML=tmp.innerHTML.replace(/Decline/g,"Atmesti");
}


 
//===================================================
//Military Unit Logs
//===================================================
function doMULogs() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Military Unit logs/,"Karinio būrio išklotinės");
	tmp = allElements.children[2];
	tmp.innerHTML = tmp.innerHTML.replace(/Back to military unit/,"Atgal į karinį būrį");
	tmp.innerHTML = tmp.innerHTML.replace(/Filter/,"Filtras");
	tmp.innerHTML = tmp.innerHTML.replace(/View logs/,"Žiūrėti išklotines");
    tmp.innerHTML = tmp.innerHTML.replace(/All logs/,"Visos išklotinės");
    tmp.innerHTML = tmp.innerHTML.replace(/Orders changed/,"Nurodymai pakeisti");
    tmp.innerHTML = tmp.innerHTML.replace(/Company put on sale/,"Įmonė parduodama");
    tmp.innerHTML = tmp.innerHTML.replace(/Company donated/,"Įmonė perduota");
    tmp.innerHTML = tmp.innerHTML.replace(/Job market offer added/,"Darbo pasiūlymas paskelbtas");
    tmp.innerHTML = tmp.innerHTML.replace(/Worker fired/,"Darbuotojas atleistas");
    tmp.innerHTML = tmp.innerHTML.replace(/Salary changed/,"Atlyginimas pakeistas");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate received/,"Pervedimas gautas");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate send/,"Siuntimas atliktas");
    tmp.innerHTML = tmp.innerHTML.replace(/Application rejected/,"Paraiška atmesta");
    tmp.innerHTML = tmp.innerHTML.replace(/Application approved/,"Paraiška priimta");
    tmp.innerHTML = tmp.innerHTML.replace(/Leader changed/,"Vadas pakeistas");
    tmp.innerHTML = tmp.innerHTML.replace(/Privilages taken/,"Privilegijos atimtos");
    tmp.innerHTML = tmp.innerHTML.replace(/Privilages given/,"Privilegijos suteiktos");
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit expanded/,"Karins būrys praplėstas");
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit upgraded/,"Karinis būtys patobulintas");
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit downgraded/,"Karinio būrio laipsnis pažemintas");
	
	tmp = allElements.children[5];
	tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Laikas");
	tmp.innerHTML = tmp.innerHTML.replace(/Log/,"Išklotinė");
    tmp.innerHTML = tmp.innerHTML.replace(/Type/,"Rūšis");
	if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"prieš sekundę");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"prieš minutę");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"prieš valandą");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"vakar");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"prieš mėnesį");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"prieš $2 sek.");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"prieš $2 min.");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"prieš $2 val.");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"prieš $2 d.");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"prieš $2 mėn.");
    } 
	tmp.innerHTML=tmp.innerHTML.replace(/the military unit by an additional slot/g,"karinys būrys gavo papildomą vietų skaičių:");
	tmp.innerHTML=tmp.innerHTML.replace(/given leadership to/g,"perdavė vado teises");
	tmp.innerHTML=tmp.innerHTML.replace(/Company donated/g,"Įmonė perduota");
	tmp.innerHTML=tmp.innerHTML.replace(/donated/g,"Perduota");
	tmp.innerHTML=tmp.innerHTML.replace(/ to/g," ");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Ginklai");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Namas");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Davanos");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Maistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Bilietai");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Gynybinės sistemos");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Ligoninės");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Geležis");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Grūdai");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Nafta");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Akmuo");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Mediena");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Deimantai");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Auksas");
	tmp.innerHTML=tmp.innerHTML.replace(/No Logs/g,"Išklotinių nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate send/g,"Siuntimas atliktas");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate received/g,"Pervedimas gautas");
	tmp.innerHTML=tmp.innerHTML.replace(/Leader changed/g,"Vadas pakeistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Job market offer added/g,"Darbo pasiūlymas paskelbtas");
	tmp.innerHTML=tmp.innerHTML.replace(/created job offer for/g,"sukurtas darbo pasiūlymas");
	tmp.innerHTML=tmp.innerHTML.replace(/skill and/g,"pajėgumas ir");
	tmp.innerHTML=tmp.innerHTML.replace(/salary in/g,"alga");
	tmp.innerHTML=tmp.innerHTML.replace(/company/g,"įmonė");
	tmp.innerHTML=tmp.innerHTML.replace(/Orders changed/g,"Nurodymai pakeisti");
	tmp.innerHTML=tmp.innerHTML.replace(/has changed order of the military unit/g,"pakeitė karinio būrio nurodymus");
	tmp.innerHTML=tmp.innerHTML.replace(/the military unit/g,"karinis būrys");
	tmp.innerHTML=tmp.innerHTML.replace(/Application approved/g,"Paraiška priimta");
	tmp.innerHTML=tmp.innerHTML.replace(/accepted/g,"priimtas");
	tmp.innerHTML=tmp.innerHTML.replace(/application/g,"paraiška");
	tmp.innerHTML=tmp.innerHTML.replace(/Worker fired/g,"Darbuotojas atleistas");
	tmp.innerHTML=tmp.innerHTML.replace(/fired/g,"atleistas");
	tmp.innerHTML=tmp.innerHTML.replace(/from the/g,"iš");
	tmp.innerHTML=tmp.innerHTML.replace(/changed/g,"pakeistė");
	tmp.innerHTML=tmp.innerHTML.replace(/salary/g,"atlyginimą");
	tmp.innerHTML=tmp.innerHTML.replace(/from/g,"nuo");
	tmp.innerHTML=tmp.innerHTML.replace(/given leadership to/g,"perdavė vado teises");
	tmp.innerHTML=tmp.innerHTML.replace(/Privilages taken/g,"Privilegijos atimtos");
	tmp.innerHTML=tmp.innerHTML.replace(/taken/g,"atėmė");
	tmp.innerHTML=tmp.innerHTML.replace(/privilegiją/g,"");
	tmp.innerHTML=tmp.innerHTML.replace(/Manage Companies/g,"Valdyti įmones");
	tmp.innerHTML=tmp.innerHTML.replace(/Warehouse Manager/g,"Sandėlio valdytojas");
	tmp.innerHTML=tmp.innerHTML.replace(/Officer/g,"Karininkas");
	tmp.innerHTML=tmp.innerHTML.replace(/Director of personel/g,"Personalo vadovas");
	tmp.innerHTML=tmp.innerHTML.replace(/Privilages given/g,"Privilegijos suteiktos");
	tmp.innerHTML=tmp.innerHTML.replace(/given/g,"suteikė");
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit expanded/g,"Karinis būrys išplėstas");
	tmp.innerHTML=tmp.innerHTML.replace(/spent/g,"išleisti");
	tmp.innerHTML=tmp.innerHTML.replace(/expand/g,"išplėsti");
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit upgraded/,"Karinis būrys patobulintas");
	tmp.innerHTML=tmp.innerHTML.replace(/upgraded military unit/,"patobulinote karinį būrį");
	tmp.innerHTML=tmp.innerHTML.replace(/for/,"kad");
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Kitas");
}

//===================================================
//Military Unit Members
//===================================================
function doMUMembers() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit members)/,"Karinio būrio nariai");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlys");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Redaguoti karinį būrį");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Keisti valstybę");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Privilegijos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Pinigų sąskaita");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Darbo pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Naujokų ėmimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"laukiančios paraiškos");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Žiūrėti išklotines");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"karinis laipsnis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Narių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Maks. narių");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Bendra žala mūšiuose");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Šiandienos žala");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Vadas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlys");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Padidinti narių vietų skaičių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Patobulinti į");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Aukso");
	replaceInputByValue({"Leave military unit":["Leave military unit","Palikti karinį būrį"]});
	
    tmp = allElements.children[6];
	tmp.innerHTML = tmp.innerHTML.replace(/Members/,"Nariai: ");
	tmp.innerHTML = tmp.innerHTML.replace(/Sorting/,"Rūšiavimas");
	tmp.innerHTML = tmp.innerHTML.replace(/Experience/,"Patirtis");
    tmp.innerHTML = tmp.innerHTML.replace(/Login/,"Prisijungti");
    tmp.innerHTML = tmp.innerHTML.replace(/Total damage/g,"Bendra žala");
    tmp.innerHTML = tmp.innerHTML.replace(/Damage today/g,"Šiandienos žala");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"Rodyti");
	tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Pilietis");
	tmp.innerHTML = tmp.innerHTML.replace(/XP/g,"XP");
    tmp.innerHTML = tmp.innerHTML.replace(/Operations/,"Misijos");
    tmp.innerHTML = tmp.innerHTML.replace(/Kick/g,"Išmesti");
	tmp.innerHTML = tmp.innerHTML.replace(/Previous/,"Buvęs");
	tmp.innerHTML = tmp.innerHTML.replace(/Next/,"Kitas");
	tmp.innerHTML = tmp.innerHTML.replace(/%CE%95%CE%BC%CF%80%CE%B5%CE%B9%CF%81%CE%AF%CE%B1/g,"XP");
}
 


//===================================================
//Military Unit Companies
//===================================================
function doMUCompanies() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit companies)/,"Karinio būrio įmonės");
	
	tmp = allElements.children[4];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlys");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Siuntos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Redaguoti karinį būrį");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Keisti valstybę");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Privilegijos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Pinigų sąskaita");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Darbo pasiūlymai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Naujokų ėmimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"laukiančios paraiškos");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Žiūrėti išklotines");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Karinis laipsnis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Narių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Maks. narių");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Bendra žala mūšiuose");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Šiandienos žala");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Vadas");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Sandėlys");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Siuntos");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Padidinti vietų nariams skaičių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Patobulinti į");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Aukso");
	replaceInputByValue({"Leave military unit":["Leave military unit","Palikti karinį būrį"]});
	
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Įmonė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Pruduktai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Location)/,"Regionas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employees)/,"Darduotojai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Side:)/,"Pusė:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Briefing:)/,"Instruktažas:");
	tmp.innerHTML=tmp.innerHTML.replace(/(visible for members only)/,"matoma tik būrio nariams");
	
	replaceLinkByHref({
	"http://wiki.e-sim.org/index.php/Military_unit":["Military units tutorial","Karinio būrio wiki"]
	});
}


//===================================================
//Donate Money (MU)
//===================================================
function doDonateMoneyMU() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money to military unit)/,"Siųsti pinigus kariniam būriui");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate to)/,"Siųsti");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your money accounts)/,"Tavo lėšos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/,"Auksas");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select item to donate)/,"Pasirinkite pinigus siuntimui");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate item)/,"Siųsti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sum)/,"Suma");
	tmp.innerHTML=tmp.innerHTML.replace(/(Reason)/,"Priežastis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate)/,"Sišsti");
	
	allElements = document.getElementById('currencyId');
	replaceOptionTxt(allElements, {
	"Gold":["Gold","Aukso"],
	"Select money":["Select money","Pasirinkite pinigus"]
	})
}
     
//===================================================
//Donate Product (MU)
//===================================================
function doDonateProductMU() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate products to military unit)/,"Siųsti produktus kariniams būriui");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate to)/,"Siųsti");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your storage)/,"Tavo inventorius");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select item to donate)/,"Pasirinkite produktus siuntimui");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate item)/,"Siųsti produktus");
	tmp.innerHTML=tmp.innerHTML.replace(/(Quantity)/,"Kiekis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Reason)/,"Priežastis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate)/,"Siųsti");
	
	allElements = document.getElementById('product');
	replaceOptionTxt(allElements, {
	"available":["available","galimi)"]
	})
}


//===================================================
//Donate Company (MU)
//===================================================
function doDonateCompanyMU() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate company to military unit)/,"Perduoti įmonę kariniam būriui");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donating to)/,"Perduoti");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select company to transfer)/,"Pasirinkite įmonę perdavimui");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate company)/,"Perduoti įmonę");
	tmp.innerHTML=tmp.innerHTML.replace(/(Select company)/,"Pasirinkite įmonę");
}
  


//===================================================
//Military Unit Broadcast
//===================================================
function doMUBroadcast() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(New broadcast message)/,"Naujas nurodymo pranešimas");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Title)/,"Tema");
	tmp.innerHTML=tmp.innerHTML.replace(/(Message)/,"Pranešimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Send)/,"Siųsti");
	tmp.innerHTML=tmp.innerHTML.replace(/(Preview)/,"Peržiūrėti");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Preview)/,"Peržiūrėti");
	tmp.innerHTML=tmp.innerHTML.replace(/(From)/,"Nuo");
	tmp.innerHTML=tmp.innerHTML.replace(/(Message)/,"Pranešimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Date)/,"Data");
	allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš min.");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš val.");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"vakar");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėn.");
        } 
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 d.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
}


//===================================================
//Subscription
//===================================================
function doPremium() {
    allElements = document.getElementById('contentRow').children[1]
    tmp = allElements.children[7];
	tmp.innerHTML="<h2 style='text-align: center'>Premium vartotojas</h2>"
	+ "<i>E-sim</i> yra nemokamas žaidimas visiems. Tačiau siūlomę galimybę užsisakyti Premium vartojo paslaugą ir taip paremti žaidimo vystymasį.<br/><br/>"
	+ "<u>Premium vartotojas</u> suteiks galimybę matyti daugiau įdomius žaidimo informacijos, leis siųsti masines žinutes karinio būrio ar partijos nariams. Taip pat, kiekvienas žaidėjas Jūsų profilyje matys pretižinę žvaigždutę.<br>"
	+ "Kiti žaidėjai galės matyti <i>prestižinę žvaigždutę</i> Jūsų profilyje.<br/>"
	+ "Užsisakydami <u>Premium vartotoją</u> taip pat labai padėsite tolimesnei <i>E-sim</i> plėtrai!."
	+ "<br><br>";
tmp = allElements.children[9]
	tmp.innerHTML = tmp.innerHTML.replace(/Your account status/,"Vartotojo būsena")
	if (tmp.innerHTML.match(/Free account/)) {
        tmp.innerHTML = tmp.innerHTML.replace(/Free account/,"Nemokamas vartotojas")
    } else {
        tmp.innerHTML = tmp.innerHTML.replace(/Premium account/,"Premium vartotojas")
    }
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Jump to/,"Eiti į")
    replaceLinkByHref({
	"#features":["Features","Ypatybės"],
	"#payments":["Payments","Mokėjimai"],
	"#faq":["FAQ","DUK"]
	});
	tmp = allElements.children[13]
	tmp.innerHTML = tmp.innerHTML.replace(/Features/,"Ypatybės")
	tmp.innerHTML = tmp.innerHTML.replace(/Battle monitor/,"Mūšio monitoringas")
        tmp.innerHTML = tmp.innerHTML.replace(/Companies production reports/,"Įmonių produkcijos išklotinės")
	tmp.innerHTML = tmp.innerHTML.replace(/Tax income statistics/,"Mokesčių statistika")
	tmp.innerHTML = tmp.innerHTML.replace(/Historical Monetary Market transactions/,"Valiutos keityklos istorijos išklotinė")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to military unit members/,"Patogesnė galimybė perduoti nurodymus žinutėmis karinio būrio nariams")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to party members/,"Patogesnė galimybė perduoti nurodymus žinutėmis partijos nariams")
	tmp.innerHTML = tmp.innerHTML.replace(/Removed ads/,"Pašalinta reklama")
	tmp.innerHTML = tmp.innerHTML.replace(/Prestigious star icon on your profile view /,"Prestižinė žaidgždutė vartotojo profilyje")	
	tmp = allElements.children[13].children[4]
	tmp.innerHTML="Mūšio metu galėsite stebėti įvairių valstybių piliečių skaičių, stebinčių mūšį."
	
        tmp = allElements.children[13].children[7]
	tmp.innerHTML="Papildomi įrankiai, padėsiantys apskaičiuoti įmonės pelną."
	
	tmp = allElements.children[13].children[11]
	tmp.innerHTML="Valstybės prezidentui ir kongreso nariams - galimybė matyti surenkamų mokesčių statistiką."

        tmp = allElements.children[13].children[14];
	tmp.innerHTML = tmp.innerHTML.replace(/Money supply statistics/,"Pinigų judėjimo statistika")	
	
	tmp = allElements.children[13].children[15]
	tmp.innerHTML="Valstybės prezidentas ir kongreso nariai galės matyti valiutos kiekius šalyje."
	
	tmp = allElements.children[13].children[18]
	tmp.innerHTML="Valiutos keityklos veikos išklotinė. Labai patogus įrankis prekiaujantiems valiuta."
	tmp = allElements.children[13].children[21]
	tmp.innerHTML="Galimybė rašyti masines žinutes savo būrių nariams. Privalote turėti <u>commander</u> statusą, kad naudotis šia privilegija."
	
	tmp = allElements.children[13].children[23]
	tmp.innerHTML="Jei esate parijos prezidentas, galėsi masinėmis žinutėmis informuoti savo partijos narius."
	
	tmp = allElements.children[15].children[0]
	tmp.innerHTML = tmp.innerHTML.replace(/Payments/,"Mokėjimai")
	tmp = allElements.children[15].children[1]
	tmp.innerHTML = tmp.innerHTML.replace(/Duration/,"Trukmė")
	tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Kaina")
	tmp.innerHTML = tmp.innerHTML.replace(/One Month (30 days)/,"Mėnuo (30 dienų)")
	tmp = allElements.children[15].children[3]
	tmp.innerHTML="<b>Yra du būdai padaryti mokėjimą:</b><br>"
	+"<ul>"
	+"<li>Nupirkti Premium vartotoją 30-ies dienų naudojimui</li>"
	+"<li>Užsisakyti paslaugą ir tapti abonentu (mokėjimas bus nuskaičiuojamas kas 30 dienų)</li>"
	+"</ul>"
	
	
	tmp = allElements.children[15].children[4]
	tmp.innerHTML="<b>Vienkartinis mokėjimas</b>"

	tmp = allElements.children[15].children[11]
	tmp.innerHTML="<b>Prenumerata</b>"
	
	tmp = allElements.children[15].children[23]
	tmp.innerHTML="<b>Aktyvios prenumeratos</b>"
	tmp = allElements.children[15].children[24]
	tmp.innerHTML = tmp.innerHTML.replace(/Id/,"Nr.")
	tmp.innerHTML = tmp.innerHTML.replace(/Account/,"Vartotojas")
	tmp.innerHTML = tmp.innerHTML.replace(/Signup/,"Prisjungti")
	tmp.innerHTML = tmp.innerHTML.replace(/Last Payment/,"Paskutinis mokėjimas")
	tmp.innerHTML = tmp.innerHTML.replace(/Next Payment/,"Kitas mokėjimas")
	tmp.innerHTML = tmp.innerHTML.replace(/Status/,"Būsena")
	tmp.innerHTML = tmp.innerHTML.replace(/No active subscriptions/,"Nėra aktyvių užsakymų")
	
	tmp = allElements.children[15].children[27]
	tmp.innerHTML="<b>Mokėjimai</b>"
	tmp = allElements.children[15].children[28]
	tmp.innerHTML = tmp.innerHTML.replace(/Trans. Id/,"Pav. Nr.")
	tmp.innerHTML = tmp.innerHTML.replace(/Subs. Id/,"Užs. Nr.")
	tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Pilietis")
	tmp.innerHTML = tmp.innerHTML.replace(/Sum/,"Suma")
	tmp.innerHTML = tmp.innerHTML.replace(/Charged time/,"Apmokamas laikas")
	tmp.innerHTML = tmp.innerHTML.replace(/No payments/,"Mokėjimų nėra")
	
	//tmp = allElements.children[15].children[29]
	//tmp.innerHTML = tmp.innerHTML.replace(/Payment dates are updated once per 5 minutes/,"Mokėjimai atnaujinami kas 5 minutes")
	
	tmp = allElements.children[17].children[0]
	tmp.innerHTML = tmp.innerHTML.replace(/FAQ/,"FAQ")
	tmp = allElements.children[17].children[1]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Ar įmanoma apmokėti kreditine kortele?;"
	tmp = allElements.children[17].children[2]
	tmp.innerHTML="Taip. Jums tereikia turėti PayPal vartotoją ir susietį savo kreditinę kortelę su juo. Tada tereikės padaryti paprastą mokėjimą naudojantis PayPal."
	tmp = allElements.children[17].children[3]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Ar galiu nupirkti Premium vartotoją savo draugui?"
	tmp = allElements.children[17].children[4]
	tmp.innerHTML="Taip. Premium vartotoją galite užsakyti  neribotam skaičiui piliečių. Tereikia nurodyti jo vardą žaidime darant užsakymą."
	tmp = allElements.children[17].children[5]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Ar prarasiu savo Premium vartotoją, jei atsisakysiu jo prenumeratos?"
	tmp = allElements.children[17].children[6]
	tmp.innerHTML="Ne. Atsisakius prenumeratos Jums tiesiog nebebus nuskaičiuojamas mėnesinis mokestis, o Premium vartotoju galėsite naudotis iki jo galiojimas pasibaigs."
	tmp = allElements.children[17].children[7]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Jei turite kitų klausimų..."
	tmp = allElements.children[17].children[8]
	tmp.innerHTML="Galite klausti  <a href=\"composeMessage.html?id=1\">asmenine žinute</a> arba palikti savo klausimą <a target=\"_blank\" href=\"http://forum.e-sim.org/viewforum.php?f=43\">forume</a>."
}



function doDonations() {
    allElements = document.getElementById('contentRow').children[1]
    tmp = allElements.children[2];
    replaceInputByValue({"Show":["Show","Rodyti"]});
	tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/If you enjoy playing <i>e-sim<\/i> and would like to support development of the game with donation, please use the donate button./,"Jei mėgaujatės žaisdami <i>e-sim</i>, galite paremti šį žaidimą tolimesnei plėtrai paspaudį šį mygtuką ")
	tmp.innerHTML = tmp.innerHTML.replace(/Your donation will be visible to everyone on this page/,"Tavo parama bus matoma visiems šiame puslapyje")
	tmp.innerHTML = tmp.innerHTML.replace(/Donors, who make 2 EUR donations will receive bonus/,"Rėmėjai, paaukoję daugiau nei 2 EU, gaus papildomą ")
	replaceLinkByHref({"achievement.html?type=DONATOR":["donor achievement","pasiekimą 'Rėmėjas'"]});
} 
//============================================================================
//Product Markets
//============================================================================
function doProductMarkets() {
	rr = {
	"1":["Any","Visi"],
	"2":["Iron","Geležis"],
	"3":["Grain","Grūdai"],
	"4":["Oil","Nafta"],
	"5":["Stone","Akmuo"],
	"6":["Wood","Mediena"],
	"7":["Diam.","Deim."],
	"8":["Weap.","Ginklai"],
	"9":["House","Namai"],
	"10":["Gift","Dovan."],
	"11":["Food","Maistas"],
	"12":["Ticket","Bilietai"],
	"13":["DS","Gyn. S."],
	"14":["Hosp.","Ligon."]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"Produktų rinka");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Rodyti pasiūlymus:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Valstybė:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Kokybė:");
  tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace("Previous","Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace("Next","Kitas");
	
	replaceInputByValue({"View offers":["View offers","Žiūrėti pasiūlymus"],"Buy":["Buy","Pirkti"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	
	if (obj.htmlFor.match("resource")) {
	idx = obj.htmlFor.substring(8,obj.htmlFor.length);
	obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
	}
	}
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Rodyti mano pasiūlymus / Įdėti naują pasiūlymą"]})
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produktas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Pardavėjas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"Kiekis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Kaina");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Pirkti");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," kiekis "); 
// check	
	replaceLinkByHref({
	"citizenMarketOffers.html":["Show my offers/post new offer","Rodyti mano pasiūlymus / Įdėti naują pasiūlymą"],
	"http://wiki.e-sim.org/en/Category:Products":["Products info","Produktų wiki"]
	});
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
    
    tmp.innerHTML = tmp.innerHTML.replace(/Marketplace/,"Produktų inka")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offers/,"Įdėti naujus pasiūlymus")
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Vasltybė")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produktas")
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Kiekis")
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Kaina")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Įdėti naują pasiūlymą")
    tmp.innerHTML = tmp.innerHTML.replace(/Show market offers/,"Rodyti turgaus pasiūlymus");
    tmp.innerHTML = tmp.innerHTML.replace(/Your storage/,"Tavo nuosavybė");
    
    results = getElements(document, "//h3[@style='text-align: center']");
    allElements = results.snapshotItem(0)
    tmp = allElements
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers on market/,"Tavo pasiūlymai produktų rinkoje")
    
    results = getElements(document, "//table[@style='width: 680px; margin-left: auto; margin-right: auto;']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produktas")
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Pardavėjas");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock/,"Kiekis");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Kaina");
    tmp.innerHTML = tmp.innerHTML.replace(/Gross/,"Brutto");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Kaina");
    tmp.innerHTML = tmp.innerHTML.replace(/Net/,"Netto");
    tmp.innerHTML = tmp.innerHTML.replace(/Import tax/,"Importo mokestis");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Trinti");
    
}
// NEW
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Įmonės");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Įmonė")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produktas")
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"Regionas")
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"Darbuotojai")
    tmp.innerHTML = tmp.innerHTML.replace(/No companies/,"Įmonių neturite")
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"Įkurti naują įmonę")
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Įmonės pavadinimas")
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"Produkcijos rūšis")
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"Įmonės avataras")
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"Įkurti įmonę")
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"Naujos įmonės įkūrimas kainuoja")
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"Įmonė bus įkurta regione, kuriame dabar esate")
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources,/,"")
    tmp.innerHTML = tmp.innerHTML.replace(/click here/,"Rodyti regionus, turinčius resursų")
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"Įmonių instrukcija wiki")
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Darbo pasiūla ");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Pasirinmimo kriterijai:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Valstybė:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Ekonominis pajėgumas:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Darbdavys");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Įmonė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produkcija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Minimalus pajėgumas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Atlyginimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Dirbti");
  
  tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Atgal");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Pirmyn");
	
	replaceInputByValue({"Apply":["Apply","Dirbti"],"Show":["Show","Rodyti"]});
}
	
	
	
	

//===================================================
//Monetary market
//===================================================
function doMonetaryMarket() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary Market/,"Valiutos keitykla");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Current offers/,"Esami pasiūlymai");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Show Offers/,"Rodyti pasiūlymus");
	tmp.innerHTML=tmp.innerHTML.replace(/Swap currencies/,"Sukeisti valiutas");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy currency/,"Pirkti valiutą");
	tmp.innerHTML=tmp.innerHTML.replace(/Sell currency/,"Parduoti valiutą");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Auksas");
	tmp.innerHTML=tmp.innerHTML.replace(/View offers/,"Žiūrėti pasiūlymus");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Show transactions archive/,"Rodyti pervedimų išklotinę");
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/,"Pardavėjas");
	tmp.innerHTML=tmp.innerHTML.replace(/Amount/,"Kiekis");
	tmp.innerHTML=tmp.innerHTML.replace(/Ratio/,"Kursas");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy/,"Pirkti");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary market tutorial/,"Valiutos keityklos wiki");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/,"Pardavėjas");
	tmp.innerHTML=tmp.innerHTML.replace(/Amount/,"Kiekis");
	tmp.innerHTML=tmp.innerHTML.replace(/Ratio/,"Kursas");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy/,"Pirkti");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary market tutorial/,"Valiutos keityklos wiki");
	tmp = allElements.children[12];	
	tmp.innerHTML=tmp.innerHTML.replace(/Your offers/,"Tavo pasiūlymai");
	tmp = allElements.children[14];	
	tmp.innerHTML=tmp.innerHTML.replace(/Your offers/,"Tavo pasiūlymai");
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace(/Offer deleted/,"Pasiūlymas pašalintas");
	tmp.innerHTML=tmp.innerHTML.replace(/Offer is no longer available/,"Pasiūlymas nebegalioja");
	tmp.innerHTML=tmp.innerHTML.replace(/Post your Offer/,"Įdėti naują pasiūlymą");
	tmp.innerHTML=tmp.innerHTML.replace(/Swap currencies/,"Sukeisti valiutas");
	tmp.innerHTML=tmp.innerHTML.replace(/Offered currency/,"Siūloma valiuta");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy currency/,"Pirkti valiutą");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Exchange rate/,"Keitimo kursas");
	tmp.innerHTML=tmp.innerHTML.replace(/Offer /,"Siūlyti ");
	tmp.innerHTML=tmp.innerHTML.replace(/at rate/,"kursu");
	tmp.innerHTML=tmp.innerHTML.replace(/Post new offer/,"Idėti naują pasiūlymą");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/Offer deleted/,"Pasiūlymas pašalintas");
	tmp.innerHTML=tmp.innerHTML.replace(/Offer is no longer available/,"Pasiūlymas nebegalioja");
	tmp.innerHTML=tmp.innerHTML.replace(/Post your Offer/,"Įdėti naują pasiūlymą");
	tmp.innerHTML=tmp.innerHTML.replace(/Swap currencies/,"Sukeisti valiutas");
	tmp.innerHTML=tmp.innerHTML.replace(/Offered currency/,"Siūloma valiuta");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy currency/,"Pirkti valiutą");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Exchange rate/,"Keitimo kursas");
	tmp.innerHTML=tmp.innerHTML.replace(/Offer /,"Siūlyti ");
	tmp.innerHTML=tmp.innerHTML.replace(/at rate/,"kursu");
	tmp.innerHTML=tmp.innerHTML.replace(/Post new offer/,"Idėti naują pasiūlymą");
	tmp = allElements.children[17];
	tmp.innerHTML=tmp.innerHTML.replace(/Post your Offer/,"Idėti pasiūlymą");
	tmp.innerHTML=tmp.innerHTML.replace(/Swap currencies/,"Sukeisti valiutas");
	tmp.innerHTML=tmp.innerHTML.replace(/Offered currency/,"Siūloma valiuta");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy currency/,"Pirkti valiutą");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Exchange rate/,"Keitimo kursas");
	tmp.innerHTML=tmp.innerHTML.replace(/Offer /,"Siūlyti ");
	tmp.innerHTML=tmp.innerHTML.replace(/at rate/,"kursu");
	tmp.innerHTML=tmp.innerHTML.replace(/Post new offer/,"Įdėti naują pasiūlymą");
	tmp.innerHTML=tmp.innerHTML.replace(/Amount/,"Kiekis");
	tmp.innerHTML=tmp.innerHTML.replace(/Ratio/,"Kursas");
	tmp.innerHTML=tmp.innerHTML.replace(/Delete/g,"Trinti");
	tmp.innerHTML=tmp.innerHTML.replace(/No offers/,"Pasiūlymų nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp = allElements.children[19];
	tmp.innerHTML=tmp.innerHTML.replace(/Amount/,"Kiekis");
	tmp.innerHTML=tmp.innerHTML.replace(/Ratio/,"Kursas");
	tmp.innerHTML=tmp.innerHTML.replace(/Delete/g,"Trinti");
	tmp.innerHTML=tmp.innerHTML.replace(/No offers/,"Pasiūlymų nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
}


//===================================================
//Monetary market transactions
//===================================================
function doMMTransactions() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary Market Transactions/,"Valiutos keityklos pervedimai");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Select currencies/,"Pasirinkite valiutas");
	tmp.innerHTML=tmp.innerHTML.replace(/Currency/g,"Valiuta");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Auksas");
	tmp.innerHTML=tmp.innerHTML.replace(/View Transactions/,"Peržiūrėti pervedimus");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Average/g,"Vidutinis");
	tmp.innerHTML=tmp.innerHTML.replace(/exchange ratio/g,"keitimo kursas");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily/g,"Dieninis");
	tmp.innerHTML=tmp.innerHTML.replace(/volume/g,"kiekis");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold\//g,"Aukso/");
	tmp.innerHTML=tmp.innerHTML.replace(/\/Gold/g,"/Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Sum bought/,"Pirkta suma");
	tmp.innerHTML=tmp.innerHTML.replace(/Currencies/,"Valiutos");
	tmp.innerHTML=tmp.innerHTML.replace(/Time/,"Laikas");
	tmp.innerHTML=tmp.innerHTML.replace(/Ratio/,"Kursas");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš min.");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš val.");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"vakar");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėn.");
        } 
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 d.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Atgal");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Pirmyn");
}


//===================================================
//Company Market
//===================================================
function doCompMarket() {
	rr = {
	"1":["Any","Visi"],
	"2":["Iron","Geležis"],
	"3":["Grain","Grūdai"],
	"4":["Oil","Nafta"],
	"5":["Stone","Akmuo"],
	"6":["Wood","Mediena"],
	"7":["Diam.","Deim."],
	"8":["Weap.","Ginklai"],
	"9":["House","Namai"],
	"10":["Gift","Dovan."],
	"11":["Food","Maistas"],
	"12":["Ticket","Bilietai"],
	"13":["DS","Gyn. S."],
	"14":["Hosp.","Ligon."]
	};
	
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies for sale)/,"Parduodamos kompanijos");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Kitas");
	
	
	results = getElements(document, "//label[@for]");
	
	//	alert(results.snapshotLength);
	//	alert(results.snapshotItem(0).htmlFor);
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	
	//	alert(obj.htmlFor);
	if (obj.htmlFor.match("resource")) {
	idx = obj.htmlFor.substring(8,obj.htmlFor.length);
	
	//	alert(obj.innerHTML);
	obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
	}
	}
	
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Rodyti pasiūlymus:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Valstybė:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Kokybė:");
	tmp.innerHTML=tmp.innerHTML.replace("No offers","Pasiūlymų nėra");
	
	replaceInputByValue({"View offers":["View offers","Žiūrėti pasiūlymus"],"Buy":["Buy","Pirkti"]});
	
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Company","Įmonė");
	tmp.innerHTML=tmp.innerHTML.replace("Product","Pruduktai");
	tmp.innerHTML=tmp.innerHTML.replace("Location","Regionas");
	tmp.innerHTML=tmp.innerHTML.replace("Seller","Pardavėjas");
	tmp.innerHTML=tmp.innerHTML.replace("Price","Kaina");
	tmp.innerHTML=tmp.innerHTML.replace("Buy","Pirkti");
	
	for (var i = 0; i < 10; i++) {
	tmp.innerHTML=tmp.innerHTML.replace("Employer","Darbdavys");
	}
	
	for (var i = 0; i < 10; i++) {
	tmp.innerHTML=tmp.innerHTML.replace("Gold","aukso");
	}
}


//===================================================
//Country Stats
//===================================================
function doCountryStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country statistics)/,"Valstybių statistika");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Statistikos rūšis:");
	replaceInputByValue({"Show":["Show","Rodyti"]});
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total:)/,"Viso:");
	tmp.innerHTML=tmp.innerHTML.replace(/(dmg.)/,"žalos");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/,"xp");
	tmp.innerHTML=tmp.innerHTML.replace(/(strength)/,"galios");	
	tmp = allElements.children[6];
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens online)/,"Prisijungusių piliečių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens)/,"Piliečių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage)/,"Bendra žala");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage today)/,"Šiandienos žala");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/,"xp");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength)/,"Galia");
	tmp.innerHTML=tmp.innerHTML.replace(/(New citizens today)/,"Naujų piliečių skaičius šiandien");
	tmp.innerHTML=tmp.innerHTML.replace(/(Productivity)/,"Produktyvumas");
	tmp.innerHTML=tmp.innerHTML.replace(/(strength)/g,"galios");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/g,"xp");
	tmp.innerHTML=tmp.innerHTML.replace(/(dmg.)/g,"žalos");	
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	if (obj.innerHTML.match("Citizens online")) {
	obj.innerHTML=obj.innerHTML.replace(/(Citizens online)/,"Prisijungusių piliečių");
	} else if (obj.innerHTML.match("Total damage")) {
	obj.innerHTML=obj.innerHTML.replace(/(Total damage)/,"Bendra žala");
	} else if (obj.innerHTML.match("Damage today")) {
	obj.innerHTML=obj.innerHTML.replace(/(Damage today)/,"Šiandieninė žala");
	} else if (obj.innerHTML.match("xp")) {
	obj.innerHTML=obj.innerHTML.replace(/(xp)/,"xp");
	} else if (obj.innerHTML.match("Strength")) {
	obj.innerHTML=obj.innerHTML.replace(/(Strength)/,"Galia");
	} else if (obj.innerHTML.match("New citizens today")) {
	obj.innerHTML=obj.innerHTML.replace(/(New citizens today)/,"Naujų piliečių skaičius šiandien");
	} else if (obj.innerHTML.match("Citizens")) {
	obj.innerHTML=obj.innerHTML.replace(/(Citizens)/,"Piliečių skaičius");
	} else if (obj.innerHTML.match("Productivity")) {
	obj.innerHTML=obj.innerHTML.replace(/(Productivity)/,"Produktyvumas");
	}
	}
}


//===================================================
//Party Stats
//===================================================
function doPartyStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Party statistics)/,"Partijų statistika");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	replaceInputByValue({"Show":["Show","Rodyti"]});
	replaceInputByValue({"Leave party":["Leave party","Palikti partiją"]});
	replaceInputByValue({"Join":["Join","Įstori"]});
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Narių skaičius");
	obj = results.snapshotItem(i);
	}
}
  

//===================================================
//Newspaper Stat
//===================================================
function doNewsStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Newspaper statistics)/,"Laikraščių statistika");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Kitas");
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr");
	tmp.innerHTML=tmp.innerHTML.replace(/(Redactor)/,"Redaktorius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Newspaper)/,"Laikraštis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subs)/,"Prenum.");	
	}
}




//===================================================
//Citizen Stats
//===================================================
function doCitiStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen statistics)/,"Piliečių statistika");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Kitas");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Statistikos rūšis:");
	replaceInputByValue({"Show":["Show","Rodyti"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen)/,"Pilietis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage)/,"Žala");
	tmp.innerHTML=tmp.innerHTML.replace(/(Today damage)/,"Šiandienos žala");
	tmp.innerHTML=tmp.innerHTML.replace(/(dmg.)/g,"žal.");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/g,"xp");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength)/,"Galia");
	tmp.innerHTML=tmp.innerHTML.replace(/(strength)/g,"galios");
	tmp.innerHTML=tmp.innerHTML.replace(/(Achievements)/,"Pasiekimai");
	obj = results.snapshotItem(i);
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	 if (obj.innerHTML.match("Damage")) {
	obj.innerHTML=obj.innerHTML.replace(/(Damage)/,"Žala");
	} else if (obj.innerHTML.match("Today damage")) {
	obj.innerHTML=obj.innerHTML.replace(/(Today damage)/,"Šiandienos žala");
	} else if (obj.innerHTML.match("xp")) {
	obj.innerHTML=obj.innerHTML.replace(/(xp)/,"XP");
	} else if (obj.innerHTML.match("Strength")) {
	obj.innerHTML=obj.innerHTML.replace(/(Strength)/,"Galia");
	} else if (obj.innerHTML.match("Achievements")) {
	obj.innerHTML=obj.innerHTML.replace(/(Achievements)/,"Pasiekimai");
	}
	}
} 


//===================================================
//Mu Stats
//===================================================
function doMuStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit statistics)/,"Karinių būrių statistika");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Kitas");	
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Statistiko rūšis:");
	replaceInputByValue({"Show":["Show","Rodyti"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Narių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Name)/,"Pavadinimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank)/,"Laipsnis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage)/,"Bendra žala");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage today)/,"Šiandienos žala");
	tmp.innerHTML=tmp.innerHTML.replace(/(Value)/,"Vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"aukso");
	obj = results.snapshotItem(i);
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	 if (obj.innerHTML.match("Total damage")) {
	obj.innerHTML=obj.innerHTML.replace(/(Total damage)/,"Bendra žala");
	} else if (obj.innerHTML.match("Damage today")) {
	obj.innerHTML=obj.innerHTML.replace(/(Damage today)/,"Šiandienos žala");
	} else if (obj.innerHTML.match("Total members")) {
	obj.innerHTML=obj.innerHTML.replace(/(Total members)/,"Narių skaičius");
	} else if (obj.innerHTML.match("Gold value")) {
	obj.innerHTML=obj.innerHTML.replace(/(Gold value)/,"Vertė auksu");
	} 
	}
}

//===================================================
//Stock Stats
//===================================================
function doStockStats() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top stock companies)/,"Geriausios akcinės bendrovės");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type)/,"Statistikos rūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show)/,"Rodyti");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total stocks)/,"Viso akcijų");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total value)/,"Bendra vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Daily stock trade volume)/,"Dieninis akcijų prekybos dydis");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock Company)/,"Akcinė Bendrovė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock company)/g,"Akcinė bendrovė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total value)/,"Bendra vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total stocks)/,"Viso akcijų");
	tmp.innerHTML=tmp.innerHTML.replace(/(Daily stock trade volume)/,"Dieninis akcijų prekybos dydis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Aukso");
	obj = results.snapshotItem(i);
	}
}


//===================================================
//Donations
//===================================================
function doDonations() {
	allElements = document.getElementById('contentRow').children[1]
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/May/,"Gegužė");
	tmp.innerHTML=tmp.innerHTML.replace(/donations/,"- parama");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/If you enjoy playing/,"Jei mėgajautės žaisdami");
	tmp.innerHTML=tmp.innerHTML.replace(/and would like to support development of the game with donation, please use the donate button/,"ir norite paremti tolimesnę žaidimo plėtrą, galite paremti mus nuspaudę paramos mygtuką");
	tmp.innerHTML=tmp.innerHTML.replace(/Your donation will be visible to everyone on this page/,"Tavo parama bus matoma visiems šiame puslapyje");
	tmp.innerHTML=tmp.innerHTML.replace(/Donors, who make 2 EUR donations will receive bonus/,"Rėmėjai, paaukoję daugiau nei 2 EU, gaus paipildomą");
	tmp.innerHTML=tmp.innerHTML.replace(/donor achievement/,"'Rėmėjo' pasikimą");
	tmp.innerHTML=tmp.innerHTML.replace(/Show donations period/,"Rodyti rėmimmo periodą");
	tmp.innerHTML=tmp.innerHTML.replace(/Show/,"Rodyti");
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	 if (obj.innerHTML.match("January")) {
	obj.innerHTML=obj.innerHTML.replace(/(January)/,"Sausis");
	} else if (obj.innerHTML.match("February")) {
	obj.innerHTML=obj.innerHTML.replace(/(February)/,"Vasaris");
	} else if (obj.innerHTML.match("March")) {
	obj.innerHTML=obj.innerHTML.replace(/(March)/,"Kovas");
	} else if (obj.innerHTML.match("April")) {
	obj.innerHTML=obj.innerHTML.replace(/(April)/,"Balandis");
	} else if (obj.innerHTML.match("May")) {
	obj.innerHTML=obj.innerHTML.replace(/(May)/,"Gegužė");
	} else if (obj.innerHTML.match("June")) {
	obj.innerHTML=obj.innerHTML.replace(/(June)/,"Birželis");
	} else if (obj.innerHTML.match("July")) {
	obj.innerHTML=obj.innerHTML.replace(/(July)/,"Liepa");
	} else if (obj.innerHTML.match("August")) {
	obj.innerHTML=obj.innerHTML.replace(/(August)/,"Rugpjūtis");
	} else if (obj.innerHTML.match("September")) {
	obj.innerHTML=obj.innerHTML.replace(/(September)/,"Rugsėjis");
	} else if (obj.innerHTML.match("October")) {
	obj.innerHTML=obj.innerHTML.replace(/(October)/,"Spalis");
	} else if (obj.innerHTML.match("November")) {
	obj.innerHTML=obj.innerHTML.replace(/(November)/,"Lapkritis");
	} else if (obj.innerHTML.match("December")) {
	obj.innerHTML=obj.innerHTML.replace(/(December)/,"Gruodis");
	}	
	}
	
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Recent donations/,"Naujausia parama");
	tmp.innerHTML=tmp.innerHTML.replace(/Top donors/,"Dosniausi rėmėjai");
	tmp.innerHTML=tmp.innerHTML.replace(/Top 10 donors/,"Dosniausių rėmėjų 10-ukas");
	tmp.innerHTML=tmp.innerHTML.replace(/this month/,"šį mėnesį");
	tmp.innerHTML=tmp.innerHTML.replace(/all time/,"per visą laiką");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/g,"Pilietis");
	tmp.innerHTML=tmp.innerHTML.replace(/Sum/g,"Viso");
}




//===================================================
//New modules ??? No
//===================================================

//===================================================
//News
//===================================================
function doNews() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(News)/,"Naujienos");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Kitas");	
	
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show News:)/,"Rodyti naujienas:");
	tmp.innerHTML=tmp.innerHTML.replace(/(News Type)/,"Naujienų rūšis");
	replaceInputByValue({"View news":["View news"," Žiūrėti naujienas"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");

	var results;
	results = getElements(document, "//table[@class='dataTable paddedTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Top articles)/,"Geriausi straipsniai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Latest articles)/,"Naujausi straipsniai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military events)/,"Kariniai įvykiai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Political events)/,"Politiniai įvykiai");
	obj = results.snapshotItem(i);
	}
	
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	
	allElements = results.snapshotItem(i);
	for (var i = 0; i < 10; i++) {
	if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"prieš sekundę");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"prieš minutę");
    }                                           
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"prieš valandą");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"vakar");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"prieš mėnesį");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"prieš $2 sek. ");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"prieš $2 min.");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"prieš $2 val.");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"prieš $2 d.");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"prieš $2 mėn.");
    }
	
	//A new referendum was started in
	allElements.innerHTML=allElements.innerHTML.replace(/A new referendum was started in/g,"Naujas referendumas buvo pradėtas");
	
	//Civil unrest has started in Lithuania
	allElements.innerHTML=allElements.innerHTML.replace(/Civil unrest has started in/g,"Pilietinio karo užuomazgos prasidėjo");
	
	//Civil unrest in Lithuania has turned into an open rebellion! 
	allElements.innerHTML=allElements.innerHTML.replace(/has turned into an open rebellion/g,"Pilietinis karas prasidėjo");
	allElements.innerHTML=allElements.innerHTML.replace(/Civil unrest in/g,"Pilietinio karo užuomazgos");
	
	//Loyalists have defeated rebels in a civil war in Lithuania! 
	allElements.innerHTML=allElements.innerHTML.replace(/Loyalists have defeated rebels in a civil war in/g,"Valdžios šalininkai nugalėjo maištininkus ");
	
	//Bulgaria secured Sumadija in the battle versus Serbia
	allElements.innerHTML=allElements.innerHTML.replace(/(secured )([a-zA-Z ]*)(in the battle versus)/g,"apgynė $2 mūšyje prieš");
	allElements.innerHTML=allElements.innerHTML.replace(/(secured)/g,"apgynė");
	allElements.innerHTML=allElements.innerHTML.replace(/(in the battle versus)/g,"mūšyje prieš");
	
	//People of started a resistance in Belgrade
	allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g," $2 piliečiai pradėjo sukilimą $5 $4");
	
	//was attacked by Indonesia
	allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"buvo užpultas $2$3");
	
	//President of Poland proposed to declare war to Lithuania
	allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"pasiūlė paskelbti karą $5$6");
	
	//Poland  has declared war to Lithuania
	allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to)([^<]*)(<[^>]+>)/g,"paskelbė karą $2$3");
	
	//Australia conquered Queensland in the battle versus Argentina 
	allElements.innerHTML=allElements.innerHTML.replace(/(conquered)/,"užkariavo");
	allElements.innerHTML=allElements.innerHTML.replace(/(in the battle versus )/," mūšyje prieš");
	
	allElements.innerHTML=allElements.innerHTML.replace(/(Money donation of)/,"Pinigų siuntimas");
	allElements.innerHTML=allElements.innerHTML.replace(/(was accepted)/,"buvo patvirtintas");
	allElements.innerHTML=allElements.innerHTML.replace(/(in congress)/,"kongreso");
	allElements.innerHTML=allElements.innerHTML.replace(/(Issuing)/,"Spausdinimas");
	allElements.innerHTML=allElements.innerHTML.replace(/(by congress)/,"kongreso");
	allElements.innerHTML=allElements.innerHTML.replace(/(Hospital was deployed in)/,"Ligoninė buvo pastatyta:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Defense System was deployed in)/,"Gynybinė sistema buvo pastatyta:");
	allElements.innerHTML=allElements.innerHTML.replace(/(New taxes for)/,"Nauji mokesčiai");
	allElements.innerHTML=allElements.innerHTML.replace(/(President of)/,"Prezidentas");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed to deploy)/,"pasiūlė pastatyti");
	allElements.innerHTML=allElements.innerHTML.replace(/(has deployed)/,"pastatė");
	allElements.innerHTML=allElements.innerHTML.replace(/(Defense System in)/,"Gynybinę sistemą");
	allElements.innerHTML=allElements.innerHTML.replace(/(Hospital in)/,"Ligoninę");
	allElements.innerHTML=allElements.innerHTML.replace(/(Impeachment of president of)/,"ΗPrezidento nušalinimas");
	allElements.innerHTML=allElements.innerHTML.replace(/(was proposed)/,"buvo pasiūlytas");
	allElements.innerHTML=allElements.innerHTML.replace(/(signed MPP with)/,"pasirašė sąjungą");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed mutual protection pact to)/,"pasiūlė sąjungą ");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed a peace treaty to)/,"pasiūlė taiką");
	allElements.innerHTML=allElements.innerHTML.replace(/(were accepted in)/,"buvo patvirtinti");
	allElements.innerHTML=allElements.innerHTML.replace(/(were accepted in)/,"buvo patvirtinti");
	allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/,"turi naują prezidentą");
	allElements.innerHTML=allElements.innerHTML.replace(/(Import tax)/,"Importo mokestį");
	allElements.innerHTML=allElements.innerHTML.replace(/(Vat)/,"PVM");
	allElements.innerHTML=allElements.innerHTML.replace(/(Income tax)/,"Pajamų mokestį");
	allElements.innerHTML=allElements.innerHTML.replace(/(Food)/,"Maistui");
	allElements.innerHTML=allElements.innerHTML.replace(/(Gift)/,"Dovanoms");
	allElements.innerHTML=allElements.innerHTML.replace(/(Weapon)/,"Ginklams");
	allElements.innerHTML=allElements.innerHTML.replace(/(Ticket)/,"Bilietams");
	allElements.innerHTML=allElements.innerHTML.replace(/(Stone)/,"Akmeniui");
	allElements.innerHTML=allElements.innerHTML.replace(/(Wood)/,"Medžiui");
	allElements.innerHTML=allElements.innerHTML.replace(/(Grain)/,"Grūdams");
	allElements.innerHTML=allElements.innerHTML.replace(/(Iron)/,"Geležiui");
	allElements.innerHTML=allElements.innerHTML.replace(/(Oil)/,"Naftai");
	allElements.innerHTML=allElements.innerHTML.replace(/(House)/,"Namams");
	allElements.innerHTML=allElements.innerHTML.replace(/(Diamonds)/,"Deimantams");
	allElements.innerHTML=allElements.innerHTML.replace(/(Defense System)/,"Gynybinėms sistemoms");
	allElements.innerHTML=allElements.innerHTML.replace(/(were proposed in)/,"buvo pasiūlyti");
	allElements.innerHTML=allElements.innerHTML.replace(/(Citizen)/,"Pilietis");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed a new welcome message )/,"pasiūlė naują pasveikinimo žinutę");
	}
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	 if (obj.innerHTML.match("Top articles")) {
	obj.innerHTML=obj.innerHTML.replace(/(Top articles)/,"Geriausi straipsniai");
	} else if (obj.innerHTML.match("Latest articles")) {
	obj.innerHTML=obj.innerHTML.replace(/(Latest articles)/,"Naujausi straipsniai");
	} else if (obj.innerHTML.match("Military events")) {
	obj.innerHTML=obj.innerHTML.replace(/(Military events)/,"kariniai įvykiai");
	} else if (obj.innerHTML.match("Political events")) {
	obj.innerHTML=obj.innerHTML.replace(/(Political events)/,"Politniai įvykiai");
	} 
	}
}

//===================================================
//Battles List 
//===================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Mūšiai");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Kitas");

	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"Rūšiavimas:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Tik subsidijuojami mūšiai:");
	
	replaceInputByValue({"Show battles":["Show battles","Rodyti mūšius"]});

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	if (obj.innerHTML.match("Sorting by start time")) {
	obj.innerHTML=obj.innerHTML.replace(/(Sorting by start time)/,"Rūšiuoti pagal laiką");
	} else if (obj.innerHTML.match("Sorting by subsidy size")) {
	obj.innerHTML=obj.innerHTML.replace(/(Sorting by subsidy size)/,"Rūšiuoti gala subsidijų dydį");
	} else if (obj.innerHTML.match("Sorting by total damage")) {
	obj.innerHTML=obj.innerHTML.replace(/(Sorting by total damage)/,"Rūšiuot pagal padarytą žalą");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Mūšio pradžia");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Mūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"Besiginantys prieš atakuojančius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Rezultatas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Bendra padaryta žala");
	
	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
}

//===================================================
//Battle 
//===================================================
function doBattle() {
	allElements = document.getElementById('battleBar').parentNode;
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Sukilimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"sukėlė");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"$2 raundas");

	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Defenders' total damage/,"Besiginančiųjų bandra žala");

	tmp = allElements.children[13];
	tmp.innerHTML=tmp.innerHTML.replace(/Attackers' total damage/,"Atakuojančiųjų bendra žala");

	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/Rounds won by defender/,"Besiginančiųjų pergalių skaičius ");
	tmp.innerHTML=tmp.innerHTML.replace(/Total defenders online/,"Prisijungusių besiginantys piliečiai");
	tmp.innerHTML=tmp.innerHTML.replace(/Show details/,"Detaliau");
	tmp.innerHTML=tmp.innerHTML.replace(/Hide details/,"Slėpti detales");
	tmp.innerHTML=tmp.innerHTML.replace(/No one/,"Niekas");
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace(/Rounds won by attacker/,"Atakuojančiųjų pergalių skaičius ");
	tmp.innerHTML=tmp.innerHTML.replace(/Total attackers online/,"Prisijungę atakuojantys piliečiai");
	tmp.innerHTML=tmp.innerHTML.replace(/Show details/,"Detaliau");
	tmp.innerHTML=tmp.innerHTML.replace(/Hide details/,"Slėpti detales");
	tmp.innerHTML=tmp.innerHTML.replace(/No one/,"Niekas");
	tmp = allElements.children[19];
	tmp.innerHTML=tmp.innerHTML.replace(/Total spectators online/,"Mūsį stebinčių žaidėjų skaičius");
	tmp = allElements.children[21];
	tmp.innerHTML=tmp.innerHTML.replace(/Show details/,"Detaliau");
	tmp = allElements.children[22];
	tmp.innerHTML=tmp.innerHTML.replace(/Hide details/,"Slėpti detales");
	
	// Top3
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"Geriausiai besiginantys");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"Geriausiai atakuojantys");

	// Recent
	tmp = document.getElementById('recentDefenders').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Recent)/,"Naujausi");
	tmp.innerHTML=tmp.innerHTML.replace(/(defenders)/,"besiginantys");
	tmp = document.getElementById('recentAttackers').parentNode.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Recent)/,"Naujausi");
	tmp.innerHTML=tmp.innerHTML.replace(/(attackers)/,"atakuojantys");
	
	// Current round stats
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Current round statistics)/,"Vykstančio raundo statistika");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your damage)/,"Tavo žala");
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defending countries)/,"Geriausiai besiginančios valstybės");
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defending military units)/,"Geriausiai besiginantys kariniai būriai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attacking countries)/,"Geriausiai atakuojančios valstybės");
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attacking military units)/,"Geriausiai atakuojantys kariniai būriai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Rodyti viso mūšio statistiką");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show military units supporting this battle)/,"Rodyti mūšyje dalyvaujančius būrius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Mūšio instrukcija wiki");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Mūšio taisyklės");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buildings active during this round)/,"Aktyvūs gynybiniai pastatai");
	
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];
	
	if (allElements.innerHTML.match("occupant country to")) {
	allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Negalite kovoti šiame mūšyje iš regiono, kuriame dabar esate.");
	allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"Norėdami dalyjauti mūšyje, privalote keliauti į valstybę okupantę");
	} else if (allElements.innerHTML.match("countries participating")) {
	allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Negalite kovoti šiame mūšyje iš regiono, kuriame dabar esate.");
	allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"Norėdami dalyvauti mūšyje, keliaukite į vieną iš jame dalyvaujančių valstybių.");
	} else if (allElements.innerHTML.match("was won by")) {
	allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"Raundą laimėjo:");
	allElements.innerHTML=allElements.innerHTML.replace(/(has been conquered by)/g,"buvo užkariautas (-a)");
	allElements.innerHTML=allElements.innerHTML.replace(/(has been secured by)/g,"buvo apgintas (-a)");
  allElements.innerHTML=allElements.innerHTML.replace(/(Loyalists have won the battle and suppressed the rebellion)/g,"Valdžios šalininkai įveikė maištininkų pajėgas");
	} else {
	} else {
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Pasirinkite ginklą:");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Pasirinkite pusę:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"Kovojate už:");
	}
	
	if (isFF) {
	allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"Rodyti raundą:");
	}
	
	replaceInputByValue({"Show round":["Show round","Rodyti raundą"]});
	replaceInputByValue({"Fight (1 hit)":["Fight (1 hit)","Kovoti (x 1)"]});
	//replaceInputByValue({"Berserk! (5 hits)":["Berserk! (5 hits)","Šturmuoti! (x 5)"]});
	replaceBerserk()
	
	tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Rodyti viso mūšio statistiką");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show military units supporting this battle)/,"Rodyti mūšyje dalyvaujančius karinius būrius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Kovojimo instrukcija wiki");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Mūšio taisyklės");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buildings active during this round)/,"Aktyvūs gynybiai pastatai");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"sukėlė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"$2 roundas ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Besiginančiųjų pergalių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Atakuojančiųjų pergalių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Atgal į mūšį");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"Statistika perskaičiuojama kas 30 minučių");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle statistics/,"Mūšio statistika");
}



//===================================================
//Battle MU Statistics 
//===================================================
function doBattleMUStatistics() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	replaceBattleInfo(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"sukėlė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"$2 raundas ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Besiginančiųjų pergalių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Atakuojančiųjų pergalių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Grįžti į mūšį");

	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Supporting military units/,"Dalyvaujantys kariniai būriai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Defender's supporters)/,"Remiančių besiginančius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Attacker's supporters)/,"Remiančių atakuojančius");
}

   

//===================================================
//Country Politics
//===================================================
function doPoliticalStats() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Country Politics/,"Vasltybės politika");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Select country/,"Pasirinkite valstybę");
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/President/,"Prezidentas");
    tmp = allElements.children[6];
    tmp.innerHTML = tmp.innerHTML.replace(/view elections/,"Žiūrėti rinkimų rezultatus");
    replaceLinkByHref({"http://wiki.e-sim.org/index.php/President":["President","Prezidentas"]});
    tmp = allElements.children[9];
    tmp.innerHTML = tmp.innerHTML.replace(/Start civil war/,"Pradėti pilietinį karą");
    tmp.innerHTML = tmp.innerHTML.replace(/Starting/,"Pilietinio karo");
    tmp.innerHTML = tmp.innerHTML.replace(/civil war/,"sukėlimas");
    tmp.innerHTML = tmp.innerHTML.replace(/costs/,"kainuoja");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold/,"aukso");
	tmp = allElements.children[11];
    tmp.innerHTML = tmp.innerHTML.replace(/Congress/,"Kongresas");
    replaceLinkByHref({"http://wiki.e-sim.org/index.php/Congress":["Congress","Kongresas"]});
    tmp = allElements.children[19];
    tmp.innerHTML = tmp.innerHTML.replace(/Wars/,"Karai");
    tmp = allElements.children[23];
    tmp.innerHTML = tmp.innerHTML.replace(/War/,"Karas");
    tmp.innerHTML = tmp.innerHTML.replace(/Details/,"Detaliau");
    tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"Karų nėra");
	tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"Karų nėra");
	tmp.innerHTML = tmp.innerHTML.replace(/allies/g,"sąj.");
	tmp.innerHTML = tmp.innerHTML.replace(/ally/g,"sąj.");
	tmp.innerHTML = tmp.innerHTML.replace(/no allies/g,"be sąj.");
	tmp.innerHTML = tmp.innerHTML.replace(/Show/g,"Rodyti");
    tmp = allElements.children[24];
    tmp.innerHTML = tmp.innerHTML.replace(/War rules/,"Karo taisyklės");
    tmp = allElements.children[25];
    tmp.innerHTML = tmp.innerHTML.replace(/Alliances/,"Sąjungininkai");
    tmp = allElements.children[29];
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Valstybė");
    tmp.innerHTML = tmp.innerHTML.replace(/Expires/,"Liko laiko"); 
    tmp = allElements.children[27].children[0]
    var loopz = tmp.children.length   
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[27].children[0].children[k].children[1]
    
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {	
            if (tmp.innerHTML.match("second")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second)/g,"sekundė ");
	        } else if (tmp.innerHTML.match("minute")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute)/g,"minutė ");
            } else if (tmp.innerHTML.match("hour")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour)/g,"valanda ");
	        } else if (tmp.innerHTML.match("day")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day)/g,"diena ");
            } else if (tmp.innerHTML.match("month")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month)/g,"mėnuo ");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds)/g,"$1 sekundės ");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes)/g,"$1 minutės ");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours)/g,"$1 valandos ");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days)/g,"$1 dienos ");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months)/g,"$1 mėnesiai ");
            } 
        }
    }
    
    replaceLinkByHref({"http://wiki.e-sim.org/Alliances":["Alliances","Sąjungininkai"]})
    
} 

//===================================================
//War Battles
//===================================================
function doWarBattles() {
	allElements = document.getElementById('contentRow').children[1]
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Battles/,"Mūšiai");
	tmp = allElements.children[1].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/War/,"Karas");
	tmp.innerHTML=tmp.innerHTML.replace(/Show/,"Rodyti");
	tmp.innerHTML=tmp.innerHTML.replace(/Greece/g,"Graikija");
	tmp.innerHTML=tmp.innerHTML.replace(/Poland/g,"Lenkija");
	tmp.innerHTML=tmp.innerHTML.replace(/Indonesia/g,"Indonėzija");
	tmp.innerHTML=tmp.innerHTML.replace(/Lithuania/g,"Lietuva");
	tmp.innerHTML=tmp.innerHTML.replace(/Serbia/g,"Serbija");
	tmp.innerHTML=tmp.innerHTML.replace(/Bulgaria/g,"Bulgarija");
	tmp.innerHTML=tmp.innerHTML.replace(/France/g,"Prancūzija");
	tmp.innerHTML=tmp.innerHTML.replace(/Russia/g,"Rusija");
	tmp.innerHTML=tmp.innerHTML.replace(/Slovenia/g,"Slovėnija");
	tmp.innerHTML=tmp.innerHTML.replace(/Turkey/g,"Turkija");
	tmp.innerHTML=tmp.innerHTML.replace(/Italy/g,"Italija");
	tmp.innerHTML=tmp.innerHTML.replace(/China/g,"Kinija");
	tmp.innerHTML=tmp.innerHTML.replace(/Romania/g,"Rumunija");
	tmp.innerHTML=tmp.innerHTML.replace(/Hungary/g,"Vengrija");
	tmp.innerHTML=tmp.innerHTML.replace(/Republic of Macedonia/g,"Makedonijos Respublika");
	tmp.innerHTML=tmp.innerHTML.replace(/Croatia/g,"Kroatija");
	tmp.innerHTML=tmp.innerHTML.replace(/Sweden/g,"Švedija");
	tmp.innerHTML=tmp.innerHTML.replace(/Ukraine/g,"Ukraina");
	tmp.innerHTML=tmp.innerHTML.replace(/Latvia/g,"Latvija");
	tmp.innerHTML=tmp.innerHTML.replace(/Spain/g,"Ispanija");
	tmp.innerHTML=tmp.innerHTML.replace(/Brazil/g,"Brazilija");
	tmp.innerHTML=tmp.innerHTML.replace(/USA/g,"JAV");
	tmp.innerHTML=tmp.innerHTML.replace(/United Kingdom/g,"Jungtinė Karalystė");
	tmp.innerHTML=tmp.innerHTML.replace(/Portugal/g,"Portugalija");
	tmp.innerHTML=tmp.innerHTML.replace(/Argentina/g,"Argentina");
	tmp.innerHTML=tmp.innerHTML.replace(/India/g,"Indija");
	tmp.innerHTML=tmp.innerHTML.replace(/Netherlands/g,"Olandija");
	tmp.innerHTML=tmp.innerHTML.replace(/Bosnia and Herzegovina/g,"Bisnija ir Hercogovina");
	tmp.innerHTML=tmp.innerHTML.replace(/Iran/g,"Iranas");
	tmp.innerHTML=tmp.innerHTML.replace(/Finland/g,"Suomija");
	tmp.innerHTML=tmp.innerHTML.replace(/Germany/g,"Vokietija");
	tmp.innerHTML=tmp.innerHTML.replace(/Mexico/g,"Meksika");
	tmp.innerHTML=tmp.innerHTML.replace(/Canada/g,"Kanada");
	tmp.innerHTML=tmp.innerHTML.replace(/Taiwan/g,"Taivanas");
	tmp.innerHTML=tmp.innerHTML.replace(/Ireland/g,"Airija");
	tmp.innerHTML=tmp.innerHTML.replace(/Australia/g,"Australija");
	tmp.innerHTML=tmp.innerHTML.replace(/South Korea/g,"Pietų Korėja");
	tmp.innerHTML=tmp.innerHTML.replace(/Colombia/g,"Kolumbija");
	tmp.innerHTML=tmp.innerHTML.replace(/Chile/g,"Čilė");
	tmp.innerHTML=tmp.innerHTML.replace(/Pakistan/g,"Pakistanas");
	tmp.innerHTML=tmp.innerHTML.replace(/Malaysia/g,"Malaizija");
	tmp.innerHTML=tmp.innerHTML.replace(/Belgium/g,"Belgija");
	tmp.innerHTML=tmp.innerHTML.replace(/Switzerland/g,"Šveicarija");
	tmp.innerHTML=tmp.innerHTML.replace(/Peru/g,"Peru");
	tmp.innerHTML=tmp.innerHTML.replace(/Norway/g,"Norvegija");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Battle/,"Mūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/defender vs attacker/,"besiginanti prieš atakuojančią");
	tmp.innerHTML=tmp.innerHTML.replace(/Score/,"Rezultatas");
	tmp.innerHTML=tmp.innerHTML.replace(/Total damage done/,"Bendra padaryta žala");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle start/,"Mūšio pradžia");
	tmp.innerHTML=tmp.innerHTML.replace(/battle won by/g,"mūšį laimėjo:");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Atgal");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Pirmyn");
	allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš min.");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš val.");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"vakar");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėn.");
        } 
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 d.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
	
	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
}



//===================================================
//Country Economy
//===================================================
function doCountryEco() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country Economy)/,"Valstybės ekonomika");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select country)/,"Pasirinkite valstybę");
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Population)/,"Populiacija");
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total active citizens)/,"Aktyvių piliečių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens online)/,"Prisijungę piliečiai");
	tmp.innerHTML=tmp.innerHTML.replace(/(New citizens today)/,"Naujų piliečių skaičius šiandien");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total residents)/,"Gyventojų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Who is online)/,"Kas prisijungęs");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show details)/,"Detaliau");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show details)/,"Detaliau");
	
	
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Regions)/,"Regionai");
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Resources)/,"Resursai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Region)/,"Regionas");
	for ( var j=0;j < 20;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No resources)/,"Resursų nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/(Capital of)/,"Sotinė - ");
	tmp.innerHTML=tmp.innerHTML.replace(/(HIGH)/,"AUKŠTAS");
	tmp.innerHTML=tmp.innerHTML.replace(/(MEDIUM)/,"VIDUTINIS");
	}
	obj = results.snapshotItem(i);
	}
	
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/(Taxes)/,"Mokesčiai");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"Resursas");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Import Tax)/,"Importo mokestis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income Tax)/,"Pajamų mokestis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat)/,"PVM");
	tmp.innerHTML=tmp.innerHTML.replace(/(Iron)/,"Geležis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Grain)/,"Grūdai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Oil)/,"nafta");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Stone)/,"Akmuo");
	tmp.innerHTML=tmp.innerHTML.replace(/(Wood)/,"Mediena");
	tmp.innerHTML=tmp.innerHTML.replace(/(Diamonds)/,"Deimantai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Weapon)/,"Ginklai");
	tmp.innerHTML=tmp.innerHTML.replace(/(House)/,"Namai");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Gift)/,"Dovanos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Food)/,"Maistas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Ticket)/,"Bilietai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Defense System)/,"Gynybinės sistemos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Hospital)/,"Ligoninės");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%A3%CE%AF%CE%B4%CE%B7%CF%81%CE%BF%CF%82.png)/,"Iron.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%A3%CE%B9%CF%84%CE%AC%CF%81%CE%B9.png)/,"Grain.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%A0%CE%B5%CF%84%CF%81%CE%AD%CE%BB%CE%B1%CE%B9%CE%BF.png)/,"Oil.png");	
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%A0%CE%AD%CF%84%CF%81%CE%B1.png)/,"Stone.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%9E%CF%85%CE%BB%CE%BF.png)/,"Wood.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CE%B9%CE%B1%CE%BC%CE%AC%CE%BD%CF%84%CE%B9%CE%B1.png)/,"Diamonds.png");
	}
	
	tmp = allElements.children[19];
	tmp.innerHTML=tmp.innerHTML.replace(/(Treasury)/,"Iždas");
	
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Treasury)/,"Iždas");
	}
	
	tmp = allElements.children[24];
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"Pastatų saugykla");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No buildings)/,"Pastatų nėra");
	}
}




//===================================================
//Citizens online
//===================================================
function doOnlineCitizens() {
	allElements = document.getElementById('contentRow').children[1]
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizens online/,"Prisijungę piliečiai");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Select country/,"Pasirinkite valstybę");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Pilietis");
	tmp.innerHTML=tmp.innerHTML.replace(/Level/,"Lygis");
	tmp.innerHTML=tmp.innerHTML.replace(/Experience/,"Patirtis");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage/,"Žala");
	tmp.innerHTML=tmp.innerHTML.replace(/Location/,"Regionas");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Kitas");
}


//===================================================
//New Citizens
//===================================================
function doNewCitizens() {
	allElements = document.getElementById('contentRow').children[1]
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New Citizens/,"Nauji piliečiai");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Select country/,"Pasirinkite valstybę");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Pilietis");
	tmp.innerHTML=tmp.innerHTML.replace(/Level/,"Lygis");
	tmp.innerHTML=tmp.innerHTML.replace(/Experience/,"Patirtis");
	tmp.innerHTML=tmp.innerHTML.replace(/Registered/,"Registravosi");
	tmp.innerHTML=tmp.innerHTML.replace(/Location/,"Regionas");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Kitas");
	tmp.innerHTML=tmp.innerHTML.replace(/No citizens/,"Piliečių nėra");
	if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš minutę");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš valandą");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"prieš dieną");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėnesį");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min.");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 dien.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
}


//===================================================
//Country Laws
//===================================================
function doCountryLaws() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Įstatymų pasiūlymai");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select country)/,"Pasirinkite valstybę");
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Įstatymų siūlymai");
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Type)/,"Rūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Status)/,"Būsena");
	tmp.innerHTML=tmp.innerHTML.replace(/(Results)/,"Rezultatas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Yes:No)/,"Taip:Ne");
	tmp.innerHTML=tmp.innerHTML.replace(/(Time)/,"Laikas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Details)/,"Detaliau");
	for(var j=0;j<15;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Accepted)/,"Priimta");
	tmp.innerHTML=tmp.innerHTML.replace(/(Pending)/,"Laukiama");
	tmp.innerHTML=tmp.innerHTML.replace(/(but failed)/,"(bet neįvykdyta)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rejected)/,"Atmesta");
	if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš minutę");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš valandą");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"prieš dieną");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėnesį");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min.");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 dien.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Siųsti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cease Fire)/,"Taika");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change tax)/,"Mokesčio ketimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Impeach)/,"Nušalinimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change welcome message)/,"pasveikinimo žinutės keitimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/,"Pinigų spausdinimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Elect president)/,"Prezidento rinkimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"Pastato statyba");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"Sąjungos pasiūlymas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/,"Karo skelbimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Details)/,"Detaliau");
	tmp.innerHTML=tmp.innerHTML.replace(/(Nationality change of a military unit )/,"Karinio būrio pilietybės keitimas");
  tmp.innerHTML=tmp.innerHTML.replace(/(Nationality change of a stock company)/,"Akcinės bendrovės pilietybės keitimas");
	
	}
	}
	
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Kitas");
	
	
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Įstatymų siūlymai");
	tmp = allElements.children[18];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress actions)/,"Kongreso narių veiksmai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposal left)/,"Įstatymų siūlymų likutis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Siųsti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cease Fire)/,"Siūlyti taiką");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change taxes)/,"Keisti mokesčius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose impeach)/,"Pasiūlyti nušalinimą");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose welcome message)/,"Pasiūlyti naują pasveiknimo žinutę");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/g,"Spausdinti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/(Elect president)/,"Išrinkti prezidentą");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"Statyti pastatą");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"Siūlyti sąjungą");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/,"Paskelbti karą");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold spent to print money)/,"Aukso kiekis pinigų spausdinimui");
	tmp.innerHTML=tmp.innerHTML.replace(/(Receiver name)/,"Gavėjo vardas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Currency name)/,"Valiuta");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose donation)/,"Siūlyti siuntimą");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"Resursas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat tax)/,"PVM mokestis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax)/,"Importo mokestis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax)/,"Pajamų mokestis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose tax)/,"Siūlyti mokesčio tarifą");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose impeachment)/,"Siūlyti nušalinimą");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose president)/,"Siūlyti naują prezidentą");
	tmp.innerHTML=tmp.innerHTML.replace(/(Message)/,"Žinutė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose message)/,"Siūlyti žinutę");
	tmp.innerHTML=tmp.innerHTML.replace(/(Preview)/,"Peržiūrėti");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/,"Auksas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country treasure)/,"Valstybės iždas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"Pastatų saugykla");
	tmp.innerHTML=tmp.innerHTML.replace(/(No buildings)/,"Pastatų nėra");
	
	replaceInputByValue({"Leave congress":["Leave congress","Palikti kongresą"]});
	
	tmp = allElements.children[21];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate buildings to national treasury)/,"Siųsti pastatus į valstybės iždo saugyklą");
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(You have no buildings in your inventory)/,"Neturite jokių pastatų");
	}
	
	tmp = allElements.children[26];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money to national treasury)/,"Siųsti pinigus į valstybės iždą");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Select item to donate:)/,"Pasirinkite valiutą siuntimui:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate item:)/,"Siųsti pinigus:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sum:)/,"Viso:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Reason:)/,"Priežastis:");
	replaceInputByValue({"Donate":["Donate","Siųsti"]});
	}
	
	results = getElements(document, "//a[@target='_blank']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposals)/,"Įstatymo siūlymai");
	}
}

	
	//Premium account stuff
	tmp = allElements.children[22];
	tmp.innerHTML=tmp.innerHTML.replace(/(Taxes statistics)/,"Mokesčių statistika");
	tmp.innerHTML=tmp.innerHTML.replace(/(data from yesterday)/,"Vakar dienos duomenys");
	tmp = allElements.children[24];
	tmp.innerHTML=tmp.innerHTML.replace(/(Taxes statistics)/,"Mokesčių statistika");
	tmp.innerHTML=tmp.innerHTML.replace(/(data from yesterday)/,"Vakar dienos duomenys");
	tmp = allElements.children[26];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total taxes collected)/,"Surinktų mokesčių suma");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat collected)/,"PVM suma");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax collected)/,"Importo mokesčio suma");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax collected)/,"Pajamų mokesčio suma");
	tmp = allElements.children[28];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total taxes collected)/,"Surinktų mokesčių suma");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat collected)/,"PVM suma");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax collected)/,"Importo mokesčio suma");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax collected)/,"Pajamų mokesčio suma");
	tmp = allElements.children[30];
	tmp.innerHTML=tmp.innerHTML.replace(/(Tax income by products)/,"Mokesčiai pagal produkciją");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produktas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat)/,"PVM");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax)/,"Importo mokestis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax)/,"Pajamų mokestis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total income)/,"Visos pajamos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Weapon)/,"Ginklai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Iron)/,"Geležis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Food)/,"Maistas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gift)/,"Dovanos");
	tmp.innerHTML=tmp.innerHTML.replace(/(House)/,"Namai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Defense System)/,"Gynybinės sistemos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stone)/,"Akmuo");
	tmp.innerHTML=tmp.innerHTML.replace(/(Ticket)/,"Bilietai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Diamonds)/,"Deimantai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Oil)/,"Nafta");
	tmp.innerHTML=tmp.innerHTML.replace(/(Wood)/,"Mediena");
	tmp.innerHTML=tmp.innerHTML.replace(/(Grain)/,"Grūdai");
	tmp = allElements.children[32];
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax by regions)/,"Mokesčių suma pagal regionus");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produkcija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat)/,"PVM");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax)/,"Importo mokestis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax)/,"Pajamų mokestis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total income)/,"Visos pajamos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Weapon)/,"Ginklai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Iron)/,"Geležis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Food)/,"Maistas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gift)/,"Dovanos");
	tmp.innerHTML=tmp.innerHTML.replace(/(House)/,"Namai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Defense System)/,"Gynybinės sistemos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stone)/,"Akmuo");
	tmp.innerHTML=tmp.innerHTML.replace(/(Ticket)/,"Bilietai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Diamonds)/,"Deimantai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Oil)/,"Nafta");
	tmp.innerHTML=tmp.innerHTML.replace(/(Wood)/,"Mediena");
	tmp.innerHTML=tmp.innerHTML.replace(/(Grain)/,"Grūdai");
	tmp = allElements.children[34];
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax by regions)/,"Mokesčių suma pagal regionus");
	tmp.innerHTML=tmp.innerHTML.replace(/(Region)/,"Regionas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax)/,"Pajamų mokestis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Peloponnese)/,"Πελοπόννησος");
	tmp = allElements.children[36];
	tmp.innerHTML=tmp.innerHTML.replace(/(Region)/,"Regionas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax)/,"Pajamų mokestis");
 	tmp.innerHTML=tmp.innerHTML.replace(/(Money supply)/,"Χρηματικό αποθεματικό");
	tmp = allElements.children[38];
	tmp.innerHTML=tmp.innerHTML.replace(/(Money supply)/,"Pinigų atsargos");
	tmp = allElements.children[40];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total money supply)/,"Visos pinigų atsargos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money in country treasures)/,"Iždo pinigai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money in MU's accounts)/,"Karinių būrių turimi pinigai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money in citizen's account)/,"Piliečių turimi pinigai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money on monetary market)/,"Pinigų kiekis valiutos keitykloje");
	tmp = allElements.children[42];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total money supply)/,"Visos pinigų atsargos");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money in country treasures)/,"Iždo pinigai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money in MU's accounts)/,"Karinių būrių turimi pinigai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money in citizen's account)/,"Piliečių turimi pinigai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money on monetary market)/,"Pinigų kiekis valiutos keitykloje");
}

//===================================================
//Law Proposals ???Yes Button problem???
//===================================================
function doLaws() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposal)/,"Įstatymų siūlymai");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already voted in this proposal)/,"Jau balsavote už šį siūlymą");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vote casted)/,"Balsas įrašytas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposal)/,"Įstatymo pasiūlymas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Proposed by)/,"Pasiūlė");
	tmp.innerHTML=tmp.innerHTML.replace(/\?/,"?");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to change nationality of/,"Ar sutinkate pakeisti");
	tmp.innerHTML=tmp.innerHTML.replace(/into/,"pilietybę į");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality change of a military unit /,"Karinio būrio pilietybės keitimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Do you agree to accept)/,"Ar sutinkate ");
	tmp.innerHTML=tmp.innerHTML.replace(/(proposal to sign MPP \(Mutual Protection Pact\))/,"siūlymui pasirašyti sąjungos paktą");
	tmp.innerHTML=tmp.innerHTML.replace(/(Do you agree to change current welcome message to the following one)/,"Ar sutinkate Pasveikinimo žinutę pakeisti į šią");
	tmp.innerHTML=tmp.innerHTML.replace(/(Do you agree to change)/,"Ar sutinkate pakeisti");
	tmp.innerHTML=tmp.innerHTML.replace(/(taxes to)/,"mokestį į");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax)/,"Importo mokestį");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat)/,"PVM");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax)/,"Pajamų mokestį");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/,"Ginklams");
	tmp.innerHTML=tmp.innerHTML.replace(/House/,"Namams");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/,"Dovanoms");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/,"Maistui");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/,"Bilietams");
	tmp.innerHTML=tmp.innerHTML.replace(/Q1 Defense System/,"Q1 Gynybinės sistemos");
	tmp.innerHTML=tmp.innerHTML.replace(/Q2 Defense System/,"Q2 Gynybinės sistemos");
	tmp.innerHTML=tmp.innerHTML.replace(/Q3 Defense System/,"Q3 Gynybinės sistemos");
	tmp.innerHTML=tmp.innerHTML.replace(/Q4 Defense System/,"Q4 Gynybinės sistemos");
	tmp.innerHTML=tmp.innerHTML.replace(/Q5 Defense System/,"Q5 Gynybinės sistemos");
	tmp.innerHTML=tmp.innerHTML.replace(/Q1 Hospital/,"Q1 Ligoninę");
	tmp.innerHTML=tmp.innerHTML.replace(/Q2 Hospital/,"Q2 Ligoninę");
	tmp.innerHTML=tmp.innerHTML.replace(/Q3 Hospital/,"Q3 Ligoninę");
	tmp.innerHTML=tmp.innerHTML.replace(/Q4 Hospital/,"Q4 Ligoninę");
	tmp.innerHTML=tmp.innerHTML.replace(/Q5 Hospital/,"Q5 Ligoninę");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/,"Gynybinėms sistemoms");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/,"Ligininėms");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/,"Geležiui");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/,"Grūdams");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/,"Naftai");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/,"Akmeniui");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/,"Medienai");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/,"Deimantams");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to donate/,"Ar sutinkate siųsti");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to spend/,"Ar sutinkate išleisti");
	tmp.innerHTML=tmp.innerHTML.replace(/to print/,"ir atspausdinti");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to deploy/,"Ar sutinkate su");
	tmp.innerHTML=tmp.innerHTML.replace(/in region/,"statyba regione:");
	tmp.innerHTML=tmp.innerHTML.replace(/Round/,"raunde");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to declare war to/,"Ar sutinkate karo paskelbimui prieš");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to sign peace with/,"ar sutinkate taikos pasirašymui su");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree for an impeachment of president/,"Ar norite iš posto nuversti dabartinį prezidentą");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to elect/,"Ar sutinkate išrinkti");
	tmp.innerHTML=tmp.innerHTML.replace(/for president/,"prezidentu");
	tmp.innerHTML=tmp.innerHTML.replace(/ to /," į ");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposal)/,"Įstatymo siūlymas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Proposed by)/,"Pasiūlė");
	tmp.innerHTML=tmp.innerHTML.replace(/\?/,"?");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to change nationality of/,"Ar sutinkate pakeisti");
	tmp.innerHTML=tmp.innerHTML.replace(/into/,"pilietybę į");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality change of a military unit /,"Karinio būrio pilietybės keitimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Do you agree to accept)/,"Ar sutinkate ");
	tmp.innerHTML=tmp.innerHTML.replace(/(proposal to sign MPP \(Mutual Protection Pact\))/,"siūlymui pasirašyti sąjungos paktą");
	tmp.innerHTML=tmp.innerHTML.replace(/(Do you agree to change current welcome message to the following one)/,"Ar sutinkate Pasveikinimo žinutę pakeisti į šią");
	tmp.innerHTML=tmp.innerHTML.replace(/(Do you agree to change)/,"Ar sutinkate pakeisti");
	tmp.innerHTML=tmp.innerHTML.replace(/(taxes to)/,"mokestį į");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax)/,"Importo mokestį");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat)/,"PVM");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax)/,"Pajamų mokestį");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/,"Ginklams");
	tmp.innerHTML=tmp.innerHTML.replace(/House/,"Namams");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/,"Dovanoms");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/,"Maistui");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/,"Bilietams");
	tmp.innerHTML=tmp.innerHTML.replace(/Q1 Defense System/,"Q1 Gynybinę sistemą");
	tmp.innerHTML=tmp.innerHTML.replace(/Q2 Defense System/,"Q2 Gynybinę sistemą");
	tmp.innerHTML=tmp.innerHTML.replace(/Q3 Defense System/,"Q3 Gynybinę sistemą");
	tmp.innerHTML=tmp.innerHTML.replace(/Q4 Defense System/,"Q4 Gynybinę sistemą");
	tmp.innerHTML=tmp.innerHTML.replace(/Q5 Defense System/,"Q5 Gynybinę sistemą");
	tmp.innerHTML=tmp.innerHTML.replace(/Q1 Hospital/,"Q1 Ligoninę");
	tmp.innerHTML=tmp.innerHTML.replace(/Q2 Hospital/,"Q2 Ligoninę");
	tmp.innerHTML=tmp.innerHTML.replace(/Q3 Hospital/,"Q3 Ligoninę");
	tmp.innerHTML=tmp.innerHTML.replace(/Q4 Hospital/,"Q4 Ligoninę");
	tmp.innerHTML=tmp.innerHTML.replace(/Q5 Hospital/,"Q5 Ligoninę");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/,"Gynybinėms sistemoms");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/,"Ligininėms");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/,"Geležiui");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/,"Grūdams");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/,"Naftai");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/,"Akmeniui");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/,"Medienai");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/,"Deimantams");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to donate/,"Ar sutinkate siųsti");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to spend/,"Ar sutinkate išleisti");
	tmp.innerHTML=tmp.innerHTML.replace(/to print/,"ir atspausdinti");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to deploy/,"Ar sutinkate su");
	tmp.innerHTML=tmp.innerHTML.replace(/in region/,"statyba regione:");
	tmp.innerHTML=tmp.innerHTML.replace(/Round/,"raundui");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to declare war to/,"Ar sutinkate karo paskelbimui prieš");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to sign peace with/,"ar sutinkate taikos pasirašymui su");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree for an impeachment of president/,"Ar norite iš posto nuversti dabartinį prezidentą");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to elect/,"Ar sutinkate išrinkti");
	tmp.innerHTML=tmp.innerHTML.replace(/for president/,"prezidentu");
	tmp.innerHTML=tmp.innerHTML.replace(/ to /," į ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Remaining time)/,"Likęs laikas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Votes casted)/,"Balsų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Voting finished)/,"Balsavimas baigėsi");
	if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš minutę");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš valandą");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"prieš dieną");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėnesį");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min.");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 dien.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
	tmp.innerHTML=tmp.innerHTML.replace(/(Fail reason)/,"Nesekmės priežastis");
	tmp.innerHTML=tmp.innerHTML.replace(/There is currently an active battle in this region/,"Šiame regione šiuo metu vyksta mūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/(One of countries has not enough money)/,"Viena iš valstybių neturi pakankamai pinigų");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vote YES)/,"Balsuoti TAIP");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vote NO)/,"Balsuoti NE");
	tmp.innerHTML=tmp.innerHTML.replace(/(Yes)/,"Taip");
	tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Ne");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Nobody)/g,"Niekas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Remaining time)/,"Likęs laikas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Votes casted)/,"Balsų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Yes)/,"Taip");
	tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Ne");
	tmp.innerHTML=tmp.innerHTML.replace(/(Supporting congressmen)/,"Pritariantys kongreso nariai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Congressmen against)/,"Nepritariantys kongreso nariai");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Supporting congressmen)/,"Pritariantys kongreso nariai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Congressmen against)/,"Nepritariantys kongreso nariai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Nobody)/g,"Niekas");
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Type)/,"Rūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Status)/,"Būsena");
	tmp.innerHTML=tmp.innerHTML.replace(/(Results)/,"Rezultatas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Yes:No)/,"Taip:Ne");
	tmp.innerHTML=tmp.innerHTML.replace(/(Time)/,"Laikas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Details)/,"Detaliau");
	for(var j=0;j<15;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Accepted)/,"Priimta");
	tmp.innerHTML=tmp.innerHTML.replace(/(but failed)/,"(bet neįvykdyta)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rejected)/,"Atmesta");
	if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš minutę");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš valandą");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"prieš dieną");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėnesį");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min.");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 dien.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Siųsti pinigus");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cease Fire)/,"Taika");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change tax)/,"Mokesčio keitimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Impeach)/,"Nušalinimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change welcome message)/,"Sveikinimo žinutės keitimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/,"Pingų spausdinimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Elect president)/,"Prezidento rinkimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"Pastato statyba");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"Sąjungos siūlymas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/,"Karo paskelbimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Details)/,"Detaliau");
	
	}
	}	
}

//===================================================
//Party Elections
//===================================================
function doPartyElec() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Party Elections)/,"Partijos prezidento rinkimai");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party:)/,"Partija:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"Data:");	
	replaceInputByValue({"Show":["Show","Rodyti"]});
	}replaceInputByValue({"Vote":["Vote","Balsuoti"]});
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Kandidatas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partija");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Balsų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/g,"Agitacija");
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/g,"Agitacijos nėra");
	}
	
	results = getElements(document, "//a[@target='_blank']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party elections tutorial)/,"Partijos prezidento rinkimų instrukcija");
	}
	
	allElements = document.getElementById('date');
	replaceOptionTxt(allElements, {
	"January":["January","Sausis"],
	"February":["February","Vasaris"],
	"March":["March","Kovas"],
	"April":["April","Balandis"],
	"May":["May","Gegužė"],
	"June":["June","Birželis"],
	"July":["July","Liepa"],
	"August":["August","Rupjūtis"],
	"September":["September","Rugsėjis"],
	"October":["October","Spalis"],
	"November":["November","Lapkritis"],
	"December":["December","Gruodis"]
	})	
}

//===================================================
//Congress Elections
//===================================================
function doCongressElec() {
	allElements = document.getElementById('date');
	replaceOptionTxt(allElements, {
	"January":["January","Sausis"],
	"February":["February","Vasaris"],
	"March":["March","Kovas"],
	"April":["April","Balandis"],
	"May":["May","Gegužė"],
	"June":["June","Birželis"],
	"July":["July","Liepa"],
	"August":["August","Rupjūtis"],
	"September":["September","Rugsėjis"],
	"October":["October","Spalis"],
	"November":["November","Lapkritis"],
	"December":["December","Gruodis"]
	})
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","Rodyti"]});
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress Elections)/,"Kongreso rinkimai");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Date)/,"Data");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your vote has been casted successfully)/,"Tavo balsas įrašytas");
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already casted your vote)/,"Tu jau balsavai");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress elections tutorial)/,"Kongreso rinkimų instrukcija");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Date)/,"Data");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partija");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress elections tutorial)/,"Kongreso rinkimų instrukcija");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Elected candidates)/,"Išrinkti kandidatai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Election candidates)/,"Rinkimų kandidatai");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Kandidatas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Agitacija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Balsų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/g,"Agitacijos nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/g,"Agitacija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidature removed)/g,"Kandidatūra pašalinta");
	tmp.innerHTML=tmp.innerHTML.replace(/(by party leader)/g,"partijos prezidento");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Election candidates)/,"Rinkimų kandidatai");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(You are a candidate of)/,"Rinkimuose dalyvaujate su");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cancel my candidature)/,"Atšaukti kandidatūrą");
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Kandidatas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Agitacija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Balsų skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/g,"Agitacijos nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/g,"Agitacija");
	tmp.innerHTML=tmp.innerHTML.replace(/(confidential)/g,"slaptas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your vote)/,"Tavo balsas");
	
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Not elected candidates)/,"Nėra išrinktų kandidatų");
	
	allElements = document.getElementById('date');
	replaceOptionTxt(allElements, {
	"January":["January","Sausis"],
	"February":["February","Vasaris"],
	"March":["March","Kovas"],
	"April":["April","Balandis"],
	"May":["May","Gegužė"],
	"June":["June","Birželis"],
	"July":["July","Liepa"],
	"August":["August","Rupjūtis"],
	"September":["September","Rugsėjis"],
	"October":["October","Spalis"],
	"November":["November","Lapkritis"],
	"December":["December","Gruodis"]
	})	
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party:)/,"Partija:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"Data:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Valstybė");	
	}
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Kandidatas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Agitacija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Balsų skaičius");
	for(j=0;j<30;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"Agitacijos nėra");
	}
	for(j=0;j<20;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Agitacija");
	}}
	
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/index.php/Congress elections']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress elections tutorial)/,"Kongreso rinkimų instrukcija");
	}
}


//===================================================
//President elections
//===================================================
function doPresiElec() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential Elections)/,"Prezidento rinkimai");
	
	replaceInputByValue({"Show":["Show","Rodyti"]});
	replaceInputByValue({"Candidate for president":["Candidate for president","kandidatuot į prezidentus"]});
	
	allElements = document.getElementById('date');
	replaceOptionTxt(allElements, {
	"January":["January","Sausis"],
	"February":["February","Vasaris"],
	"March":["March","Kovas"],
	"April":["April","Balandis"],
	"May":["May","Gegužė"],
	"June":["June","Birželis"],
	"July":["July","Liepa"],
	"August":["August","Rupjūtis"],
	"September":["September","Rugsėjis"],
	"October":["October","Spalis"],
	"November":["November","Lapkritis"],
	"December":["December","Gruodis"]
	})
	
	var tmp;
	tmp = allElements.children[1]
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Date)/,"Data");
	tmp = allElements.children[2]
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential elections tutorial)/,"Prezidento rinkimų instrukcija");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(Link to presentation:)/,"Nuoroda į agitaciją");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidating for president costs)/,"Kandidatūra prezidento rinkimams kainuoja");

	allElements = document.getElementById('date');
	replaceOptionTxt(allElements, {
	"January":["January","Sausis"],
	"February":["February","Vasaris"],
	"March":["March","Kovas"],
	"April":["April","Balandis"],
	"May":["May","Gegužė"],
	"June":["June","Birželis"],
	"July":["July","Liepa"],
	"August":["August","Rupjūtis"],
	"September":["September","Rugsėjis"],
	"October":["October","Spalis"],
	"November":["November","Lapkritis"],
	"December":["December","Gruodis"]
	})
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"Data:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Valstybė");	
	}
	
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Kandiddatas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Agitacija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Balsų skaičius");	
	for(j=0;j<5;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No candidates)/,"Kandidatų nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"Agitacijos nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Agitacija");
	}}
	
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/index.php/Presidental elections']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential elections tutorial)/,"Prezidento rinkimų instrukcija");
	}
}


//===================================================
//Citizenship Application
//===================================================
function doCSappli() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","Rodyti"]});
	replaceInputByValue({"Apply for citizenship":["Apply for citizenship","Paprašyti pilietybės"]});
	replaceInputByValue({"Accept":["Accept","Priimti"]});
	var tmp;
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Pending citizenship applications)/,"Laukiančiųjų pilietybės paraiškos");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show accepted citizenship)/,"Rodyti asmenis, kuriems suteiktos pilietybės");
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Valstybė:");
	tmp.innerHTML=tmp.innerHTML.replace(/(As a congress member of)/,"Kadangi esate kongreso narys,");
	tmp.innerHTML=tmp.innerHTML.replace(/(you are allowed to give)/,"galite suteikti");
	tmp.innerHTML=tmp.innerHTML.replace(/(more citizenship)/,"daugiau pilietybių");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your citizenship)/,"Tavo pilietybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your application for citizenship in)/,"Tavo paraiška dėl pilietybės gavimo");	
	tmp.innerHTML=tmp.innerHTML.replace(/(The application will be revised by)/,"Prašymas bus peržiūrėtas:");		
	tmp.innerHTML=tmp.innerHTML.replace(/(congress members of)/,"kongreso narių)");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Pending applications)/,"Laukiančios paraiškos");
	tmp.innerHTML=tmp.innerHTML.replace(/(No applications)/,"Paraiškų nėra");	
	tmp.innerHTML=tmp.innerHTML.replace(/(posted)/g,"parašyta");	
	allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš min.");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš val.");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"vakar");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėn.");
        } 
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 d.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
	obj=results.snapshotItem(i);
	}
	
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/index.php/Citizenship']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizenships on wiki)/,"Pilietybės wiki");
	}
}


//===================================================
//Accepted citizenship
//===================================================
function doCSaccepted() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","Εμφάνισε"]});
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Accepted citizenship applications)/,"Patvirtinti pilietybės paraiškas");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show pending citizenship application)/,"Rodyti laukiančias paraiškas");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(Accepted applications)/,"Patvirtinti prašymai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Accepted by)/g,"Patvirtino");
	tmp.innerHTML=tmp.innerHTML.replace(/(posted)/g,"parašyta");
	allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš min.");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš val.");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"vakar");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėn.");
        } 
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 d.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}

//===================================================
//World Map
//===================================================
function doWorldmap() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	var tmp;
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(World map)/,"Pasaulio žemėlapis");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Browse territories)/,"Naršyti regionus");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Map Type:)/,"Žemėlapio rūšis:");
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizenship:)/,"Pilietybė:");

	allElements = document.getElementById('mapTypeSelect');
	replaceOptionTxt(allElements, {
	"Political":["Political","Politinis"],
	"Battles":["Battles","Mūšių"],
	"Demographics by citizenship":["Demographics by citizenship","Demografija pagal pilietybes"],
	"Demographics":["Demographics","Demografinis"],
	"Companies":["Companies","Įmonių"],
	"Resources":["Resources","Resursų"],
	"Defensive buildings":["Defensive buildings","Gynybinių pastatų"],
	"Productivity":["Productivity","Produkcijos"],
	}	
}


//===================================================
//Map
//===================================================
function doMap() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Map/,"Žemėlapis");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/Resource/,"Resursas");
	tmp.innerHTML=tmp.innerHTML.replace(/All resources/,"Visi resursai");
	tmp.innerHTML=tmp.innerHTML.replace(/Show regions/,"Rodyti regionus");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Region/,"Regionas");
	tmp.innerHTML=tmp.innerHTML.replace(/Owner/,"Savininkas");
	tmp.innerHTML=tmp.innerHTML.replace(/Rightful owner/,"Teisėtas savininkas");
	tmp.innerHTML=tmp.innerHTML.replace(/Resource/,"Resursas");
	tmp.innerHTML=tmp.innerHTML.replace(/Neighbours/,"Kaimynai");
	tmp.innerHTML=tmp.innerHTML.replace(/No resources/g,"Resursų nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/Capital of/g,"Yra sostinė:");
	tmp.innerHTML=tmp.innerHTML.replace(/HIGH/g,"AUKŠTAS");
	tmp.innerHTML=tmp.innerHTML.replace(/MEDIUM/g,"VIDUTINIS");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Atgal");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Pirmyn");
}


//===================================================
//Region
//===================================================
function doRegion() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Region)/,"Regionas:");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Current owner)/,"Dabartinis savininkas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rightful owner)/,"Teisėtas savininkas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"Resursas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Population)/,"Populiacija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies)/,"Įmonės");
	tmp.innerHTML=tmp.innerHTML.replace(/(No resources)/,"Resursų nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/(Capital of)/,"Sostinė - ");
	tmp.innerHTML=tmp.innerHTML.replace(/(HIGH)/,"AUKŠTAS");
	tmp.innerHTML=tmp.innerHTML.replace(/(MEDIUM)/,"VIDUTINIS");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Start a resistance war)/,"Pradėti sukilimą");
	tmp.innerHTML=tmp.innerHTML.replace(/(Start resistance)/,"Pradėti sukilimą");
	tmp.innerHTML=tmp.innerHTML.replace(/(Starting resistance costs)/,"Sukilimo organizavimas kainuoja");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/(Neighbour region)/,"Kaimyninis regionas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"Resursas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Capital of)/g,"Sostinė - ");
	tmp.innerHTML=tmp.innerHTML.replace(/(No resources)/g,"Resursų nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/(HIGH)/g,"AUKŠTAS");
	tmp.innerHTML=tmp.innerHTML.replace(/(MEDIUM)/g,"VIDUTINIS");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance has started)/,"Sukilimas prasidėjo");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Industry)/,"Industrija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total companies value)/,"Bendra įmonių vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Company Type/,"Įmonės rūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/Total/,"Viso");
	tmp.innerHTML=tmp.innerHTML.replace(/Value/,"Vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Ginklai");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Namai");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Dovanos");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Maistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Bilietai");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Gynybinės sistemos");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Ligoninės");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Geležis");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Grūdai");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Nafta");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Akmuo");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Mediena");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Deimantai");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Neighbour region)/,"Kaimyninis regionas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"Resursas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Capital of)/g,"Sostinė - ");
	tmp.innerHTML=tmp.innerHTML.replace(/(No resources)/g,"Resursų nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/(HIGH)/g,"AUKŠTAS");
	tmp.innerHTML=tmp.innerHTML.replace(/(MEDIUM)/g,"VIDUTINIS");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Free building points/,"Galimi pastatų taškai");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Industry)/,"Industrija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total companies value)/,"Bendra įmonių vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/Company Type/,"Įmonės rūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/Total/,"Viso");
	tmp.innerHTML=tmp.innerHTML.replace(/Value/,"Vertė");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Ginklai");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Namai");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Dovanos");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Maistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Bilietai");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Gynybinės sistemos");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Ligoninės");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Geležis");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Grūdai");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Nafta");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Akmuo");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Mediena");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Deimantai");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/Free building points/,"Galimi pastatų taškai");
	tmp.innerHTML=tmp.innerHTML.replace(/Building/,"Pastatas");
	tmp.innerHTML=tmp.innerHTML.replace(/Round/,"Raundas");
	tmp.innerHTML=tmp.innerHTML.replace(/No defensive buildings/,"Gynybinių pastatų nėra");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/Building/,"Pastatas");
	tmp.innerHTML=tmp.innerHTML.replace(/Round/,"Roundas");
	tmp.innerHTML=tmp.innerHTML.replace(/No defensive buildings/,"Gynybinių pastatų nėra");
	
	replaceLinkByHrefSSS("http://wiki.e-sim.org/index.php/Category:Buildings", {
	"Buildings":["Buildings","Pastatai"]
	});
}


//============================================================================
//Profile
//============================================================================
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /,"Pilietis ");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
	tmp.innerHTML=tmp.innerHTML.replace(/Online/,"Prisijungęs");
	} else {
	tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"Neprisijungęs");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
	"Edit profile":["Edit profile","Redaguoti profilį"]
	});
	replaceLinkByHrefSSS("changeName.html", {
	"Change name":["Change name","Keisti vardą"]
	});
	replaceLinkByHrefSSS("transactionLog.html", {
	"Transactions log":["Transactions log","Pervedimų sąrašas"]
	});
	replaceLinkByHrefSSS("#", {
	"Report multi":["Report multi","Pranešti apie multi"]
	});
	replaceInputByValue({"Report multi":["Report multi","Pranešti apie multi"]});

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match("Permanently")) {
	rowoffset = 2;
	tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"Užblokuotas visam laikui");
	tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"Priežastis:");
	tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Užblokavo:");
	}
	

	tmp = allElements.children[0].children[2+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Lygis:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Žala:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"Laipsnis:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Ekonominis pajėgumas:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"Galia:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Regionas:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Pilietybė:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"Gimtadienis:");
  tmp.innerHTML=tmp.innerHTML.replace(/Organization/,"Organizacija");
	
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by XP:/,"Nacionalinis reitingas (XP):");
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by damage:/,"Nacionalinis reitingas (žala):");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by XP:/,"Tarptautinis reitingas (XP):");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by damage:/,"Tarptautinis reitingas (žala):");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Karinis būrys:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Partija:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Laikraštis:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"Darbovietė:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"Valdomos įmonės");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Politinės pareigos:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Nepriklauso kariniam būriui");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Neįstojęs į partiją");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Laikraščio neturi");
	tmp.innerHTML=tmp.innerHTML.replace(/No work/,"Nedirba");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"Įmonių neturi");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"Pareigų neturi");
  
  tmp = allElements.children[1]
	tmp.innerHTML=tmp.innerHTML.replace(/Assets/,"Lėšos");
	tmp.innerHTML=tmp.innerHTML.replace(/Assets are hidden by the citizen/,"Pilietis nerodo savo lėšų");
	tmp.innerHTML=tmp.innerHTML.replace(/None/,"Nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/payback time/g,"grąžinomo data");
	tmp.innerHTML=tmp.innerHTML.replace(/game day/g,"žaidimo diena");
	tmp.innerHTML=tmp.innerHTML.replace(/lent to/g,"paskolinta piliečiui:");
	
	tmp = allElements.children[1].children[5]
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Kitas");
	
	tmp = allElements.children[1].children[7]
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Kitas");
	
	tmp = allElements.children[1].children[9]
	tmp.innerHTML=tmp.innerHTML.replace(/Shouts/,"Šūksniai");
	
	allElements = getElements(document, "//ul[@style]");
	
	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
	tmp = allElements.snapshotItem(0).parentNode;
	if (tmp.innerHTML.match("Active debts")) {
	rowoffset = 2;
	tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"Aktyvios paskolos");
	tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g,"grąžinimo data");
	tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( žaidimo diena)/g," $1");
	}
	}
	
	allElements = document.getElementById('medals');
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"Draugai");
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
	tmp.innerHTML = tmp.innerHTML.replace(/Total achievements/,"Viso pasiekimų")
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Top achievements/,"Geriausi pasiekimai");
	replaceLinkByHref({"achievement.html?type=DONATOR":["donor achievement","'Rėmėjo' pasiekimas"]});
	replaceLinkSSS({
	"See all achievements":["See all achievements","Žiūrėti visus pasiekimus"]
	});
	
	doShoutsComm();
	
}
//===================================================
//Donate Money (Player)
//===================================================
function doDonateMoney() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Siųsti pinigus");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate to)/,"Siųsti kam");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your money accounts)/,"tavo pinigai");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/,"Auksas");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select item to donate)/,"Pasirinkite valiutą siuntimui");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate item)/,"Siųsti produktą");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sum)/,"Viso");
	tmp.innerHTML=tmp.innerHTML.replace(/(Reason)/,"Priežastis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate)/,"Siųsti");
	
	allElements = document.getElementById('currencyId');
	replaceOptionTxt(allElements, {
	"Gold":["Gold","Auksas"],
	"Select money":["Select money","Pasirinkite pinigus"]
	})
}


//===================================================
//Donate Product (Player)
//===================================================
function doDonateProduct() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate products)/,"Siųsti produktus");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate to)/,"Siųsti kam");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your storage)/,"Tavo inventorius");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select item to donate)/,"Pasirinkite produktą siuntimui");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate item)/,"Siųtsi produktus");
	tmp.innerHTML=tmp.innerHTML.replace(/(Quantity)/,"Kiekis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Reason)/,"Priežastis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate)/,"Siųsti");
	
	allElements = document.getElementById('product');
	replaceOptionTxt(allElements, {
	"available":["available","turimi"]
	})
}


//============================================================================
//Edit Citizen
//============================================================================
function doEditCitizen() {
	allElements = document.getElementById('editCitizenForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Mail:/,"Email:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Naujas slaptažodis:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Pakartokite naują slaptažodį:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"Senas slaptažodis:  :");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Naujas avataras:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","maks. dydis; :");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19]
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Pilietis");
	replaceInputByValue({"Edit citizen":["Edit citizen","Redaguoti pilietį"]});
}


//===================================================
//Change Name
//===================================================
function doChangeName() {
	allElements = document.getElementById('contentRow');
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Change name/,"Keisti vardą");
	tmp.innerHTML=tmp.innerHTML.replace(/To discourage players from changing their nicks, this service is/,"Neskatindami žaidėjų keisti savo vardus pranešame, jog ši paslauga");
	tmp.innerHTML=tmp.innerHTML.replace(/not/,"nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/free /,"nemokama");
	tmp.innerHTML=tmp.innerHTML.replace(/Service/,"Paslauga");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/,"Kaina");
	tmp.innerHTML=tmp.innerHTML.replace(/Single name change/,"Viekartinis vardo keitimas");
	tmp.innerHTML=tmp.innerHTML.replace(/Remaining changes/,"Liko kartų");
	tmp.innerHTML=tmp.innerHTML.replace(/Change name into/,"Keisti vardą į");
	tmp.innerHTML=tmp.innerHTML.replace(/Retype your current password/,"Pakartokite dabartinį slaptažodį");
	tmp.innerHTML=tmp.innerHTML.replace(/Change name/,"Keisti vardą");
	tmp.innerHTML=tmp.innerHTML.replace(/After successful name change, please use it as your new login/,"Pakeitę savo vardą, naudokite jį kitame prisijungime");
}


//===================================================
//Transaction Log
//===================================================
function doTransactionsLog() {
	allElements = document.getElementById('contentRow');
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Transactions log/,"Pervedimų išklotinė");
	tmp.innerHTML=tmp.innerHTML.replace(/Log type/,"Išklotinės rūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/Period start/,"Periodo pradžia");
	tmp.innerHTML=tmp.innerHTML.replace(/Period end/,"Periodo pabaiga");
	tmp.innerHTML=tmp.innerHTML.replace(/View logs/,"Žiūrėti išklotines");
	tmp.innerHTML=tmp.innerHTML.replace(/Company transaction/,"Įmonės pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/Donation/,"Pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary market transaction/,"Valiutos keityklos pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/Market transaction/,"Produktų rinkos pervedimai");
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"Kontraktai");
	tmp.innerHTML=tmp.innerHTML.replace(/Debt payment/,"Paskolų apmokėjimai");
	tmp.innerHTML=tmp.innerHTML.replace(/Game day/g,"Žaidimo diena:");
	tmp.innerHTML=tmp.innerHTML.replace(/Buyer\/Donor/,"Pirkėjas / Siuntėjas");
	tmp.innerHTML=tmp.innerHTML.replace(/Time/,"Laikas");
	tmp.innerHTML=tmp.innerHTML.replace(/Action/,"Veiksmas");
	tmp.innerHTML=tmp.innerHTML.replace(/Seller\/Receiver/,"Pirkėjas / Gavėjas");
	tmp.innerHTML=tmp.innerHTML.replace(/No Logs/,"Išklotinių nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/none/g,"nėra");
	allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš min.");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš val.");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"vakar");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėn.");
        } 
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 d.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Atgal");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Pirmyn");
	tmp.innerHTML=tmp.innerHTML.replace(/has transfered company/,"perdavė įmonę");
	tmp.innerHTML=tmp.innerHTML.replace(/to the military unit/,"kariniam būriui");
	tmp.innerHTML=tmp.innerHTML.replace(/has bought company/,"įsigijo įmonę");
	tmp.innerHTML=tmp.innerHTML.replace(/has paid debt of/g,"sumokėjo paskolą");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"aukso");
	tmp.innerHTML=tmp.innerHTML.replace(/obligations/g,"įsipareigojimus");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate/g,"Siųsti");
	tmp.innerHTML=tmp.innerHTML.replace(/Pay/g,"Mokėti");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Ginklai");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Namai");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Dovanos");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Maistas");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Bilietai");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Gynybinės sistemos");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Ligoninės");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Geležis");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Grūdai");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Nafta");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Akmuo");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Mediena");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Deimantai");
	tmp.innerHTML=tmp.innerHTML.replace(/from/g,"iš");
	tmp.innerHTML=tmp.innerHTML.replace(/has bought/g,"įsigijo");
	tmp.innerHTML=tmp.innerHTML.replace(/citizen/g,"pilietis");
	tmp.innerHTML=tmp.innerHTML.replace(/to/g,"-");
	tmp.innerHTML=tmp.innerHTML.replace(/at ratio/g,"kursu");
	tmp.innerHTML=tmp.innerHTML.replace(/has sent/g,"nusiuntė");
	tmp = allElements.children[1].children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/for/g,"-");
}



//============================================================================
//Travel
//============================================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"Keliauti");
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Valstybė");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"Regionas:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"Bilieto kokybė:");
	
	replaceInputByValue({"Travel":["Travel","Keliauti"]});
	
	replaceLinkByHref({
	"http://wiki.e-sim.org/en/Traveling":["Traveling tutorial on wiki","Keliavimo wiki"]
	});
}
	
	allElements = document.getElementById('ticketQuality');
		replaceOptionTxt(allElements, {
			"wellness to restore":["wellness to restore","gyvybių likutis atstatyti"],
		})	
}


//============================================================================
//Inbox Messages
//============================================================================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"gautos žinutės: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"Išsiųstos žinutės: ");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Autorius");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Žinutė");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Data");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Pašalinti");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"Kam");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
	replaceBattleTime(tmp.children[i].children[2]);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
	"sentMessages.html":["Sent messages","Išsiųstos žinutės"],
	"composeMessage.html":["Compose message","Sukurti žinutę"]
	});
	replaceInputByValue({
	"Delete":["Delete","Ištrinti"],
	"Quick reply":["Quick reply","Greitas atskymas"],
	"Report":["Report","Pranešti"]
	});
	replaceLinkByHrefSSS("#", {
	"Report":["Report","Pranešti"],
	"Quick reply":["Quick reply","Greitas atsakymas"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
	"composeMessage.html":["Reply","Atsakyti"],
	"conversation.html":["Previous messages","Ankstesnės žinutės"]
	});
	
}


//============================================================================
//Sent Messages
//============================================================================
function doSentMessages() {
	doMessagesComm();
	replaceLinkByHref({
	"inboxMessages.html":["Inbox messages","Gautos žinutės"],
	"composeMessage.html":["Compose Message","Kurti žinutę"]
	});
}

//===================================================
//Notifications
//===================================================
function doNotifications() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Notifications/,"Pranešimai");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Filter alerts/,"Rūšiuoti pranešimus");
	tmp.innerHTML=tmp.innerHTML.replace(/Show/,"Rodyti");
	tmp.innerHTML=tmp.innerHTML.replace(/Delete All/,"Trinti visus");
	tmp.innerHTML=tmp.innerHTML.replace(/All alerts/,"Visi pranešimai");
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary market alert/g,"Valiutos keityklos pranešimas");
	tmp.innerHTML=tmp.innerHTML.replace(/Company alert/g,"Įmonės pranšimas");
	tmp.innerHTML=tmp.innerHTML.replace(/Subsidy alert/g,"Subsidijų pranšimas");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen progress alert/g,"Piliečio progreso pranešimas");
	tmp.innerHTML=tmp.innerHTML.replace(/Medal alert/g,"Pranešimas apie medalius");
	tmp.innerHTML=tmp.innerHTML.replace(/Election alert/g,"Rinkimų pranešimas");
	tmp.innerHTML=tmp.innerHTML.replace(/Congress alert/g,"Kongreso pranešimas");
	tmp.innerHTML=tmp.innerHTML.replace(/Other alert/g,"Kitas pranešimas");
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/g,"Kontraktai");
	tmp.innerHTML=tmp.innerHTML.replace(/Moderators/g,"Moderatoriai");
	tmp.innerHTML=tmp.innerHTML.replace(/Military Unit/g,"Karinis būrys");
	tmp.innerHTML=tmp.innerHTML.replace(/Premium Account/g,"Premium vertotojas");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock Market/g,"Akcijų birža");
	tmp.innerHTML=tmp.innerHTML.replace(/Tutorial/g,"Mokomasis vadovas");
	tmp.innerHTML=tmp.innerHTML.replace(/Type/,"Rūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Žinutė");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Data");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Pašalinti");
	if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš minutę");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš valandą");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"prieš dieną");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėnesį");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min.");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 dien.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
	tmp.innerHTML=tmp.innerHTML.replace(/New/g,"Naujas");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Atgal");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Pirmyn");
}

//============================================================================
//Compose Message
//============================================================================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Nauja žinutė");

	replaceLinkByHref({
	"inboxMessages.html":["Inbox messages","Gautos žinutės"],
	"sentMessages.html":["Sent messages","Išsiųstos žinutės"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Gavėjas:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Tema:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Žinutė:");
	
	replaceInputByValue({
	"Send":["Send","Siųsti"],
	"Preview":["Preview","Peržiūrėti"]
	});
}

//============================================================================
//Subscriptions
//============================================================================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"Prenumeratos");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
	obj = results.snapshotItem(0);
	
	obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"Prenumeratos");
	
	replacNewspaperTime(obj);
	}

	replaceLinkByHref({
	"subscribedNewspapers.html":["List of subscribed newspapers","Prenumeruojamų laikraščių sąrašas"]
	});
  
  allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Atgal");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Pirmyn");
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Prenumeruojami laikraščiai");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
	allElements = results.snapshotItem(0).children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Prenum. skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Laikraštis");
	tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"Prenumeracijos laikas");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length; i++) {
	replaceBattleTime(tmp.children[i].children[2]);
	}
	}
	
	replaceLinkByHref({
	"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Laikraščių wiki"]
	});

allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Atgal/,"Buvęs");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Pirmyn");  
}


//===================================================
//Search
//===================================================
function doSearch() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Search citizen/,"Piliečio paieška");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Search/,"Ieškoti");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Pilietis");
	tmp.innerHTML=tmp.innerHTML.replace(/Level/,"Lygis");
	tmp.innerHTML=tmp.innerHTML.replace(/XP/,"XP");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage done/,"Padaryta žala");
	tmp.innerHTML=tmp.innerHTML.replace(/No citizens found/,"Piliečių nerasta");
}
//===================================================
//Search e-sim
//===================================================
function doSearchGoogle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Search e-sim/,"Paieška e-sim");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Search for/,"Ieškoti");
	//tmp.innerHTML=tmp.innerHTML.replace(/Search/g,"Ieškoti");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Search results/,"Paieškos rezultatai");
	
	replaceInputByValue({
	"Search":["Search","Ieškoti"]
	});
}
     


//===================================================
//Civil War ???
//===================================================
function doCivil() {
	allElements = document.getElementById('contentRow').children[2];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Civil war/,"Pilietinis karas");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Select civil war/,"Pasirinkite pilietinį karą");
	tmp.innerHTML=tmp.innerHTML.replace(/Show/,"Rodyti");
	tmp.innerHTML=tmp.innerHTML.replace(/Civil war in/g,"Pilietinis karas");
	tmp.innerHTML=tmp.innerHTML.replace(/Won by loyalists/g,"Laimėtas valdančiųjų");
	tmp.innerHTML=tmp.innerHTML.replace(/Won by rebellion/g,"Laimėtas maištininkų");
	tmp.innerHTML=tmp.innerHTML.replace(/Pool in progress/g,"Susivienijimas buriasi");
	tmp.innerHTML=tmp.innerHTML.replace(/Pool failed - not enough supporters/g,"Susivienijimas nepavyko - nepakako rėmėjų");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle in progress/g,"Mūšys vyksta");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Civil war info/,"Civilinio karo informacija");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Status/,"Būsena");
	tmp.innerHTML=tmp.innerHTML.replace(/Civil war leader/,"Pilietinio karo vadas");
	tmp.innerHTML=tmp.innerHTML.replace(/The rebellion is gathering supporters/,"Maištininkai renka rėmėjus");
	tmp.innerHTML=tmp.innerHTML.replace(/Loyalists forces have defeated rebels in the battle/,"Valdantieji įveikė maištininkus mūšyje");
	tmp.innerHTML=tmp.innerHTML.replace(/Rebellion have been suppressed by the government/,"Valdžia nuslopino maištą");
	tmp.innerHTML=tmp.innerHTML.replace(/An open war will start if at least 33.3% participants support the rebellion/,"Sukilimas prasidės, jei sukilėliai surinks bent 33,3% rėmėjų iš visų sukilime besirengiančių dalyvaujanti piliečių");
	tmp.innerHTML=tmp.innerHTML.replace(/Rebels have failed to gather enough supporters and were suppressed by the government/,"maištininkams nepavyko surinkti pakankama skaičių rėmėjų. Valdžia nuslopino sukilimą");
	tmp.innerHTML=tmp.innerHTML.replace(/Rebel forces need a support of 33.33% participants to successfully start a civil war/,"Maištininkų pajėgoms reikia surinkti bent 33,3% rėmėjų, kad pradėti atvirą sukilimą");
	tmp.innerHTML=tmp.innerHTML.replace(/Remaining time to give support/,"Likęs laikas prisijungti prie kurios nors pusės");
	tmp.innerHTML=tmp.innerHTML.replace(/Rebel forces have won the civil war/,"maištininkai laimėjo civilinį karą");
	tmp.innerHTML=tmp.innerHTML.replace(/has overthrown/,"nuvertė");
	tmp.innerHTML=tmp.innerHTML.replace(/from president seat/,"iš prezidento posto");
	tmp.innerHTML=tmp.innerHTML.replace(/The rebellion has gained control of/,"Maištininkai permėmė");
	tmp.innerHTML=tmp.innerHTML.replace(/seats in congress/,"vietų kongrese");
	tmp.innerHTML=tmp.innerHTML.replace(/Congress seats won by rebels/,"Vietų kongresų skaičius, perimtas maištininkų");
	tmp.innerHTML=tmp.innerHTML.replace(/Congress seats lost by loyalists/,"Buvusio valdžios prarastos vietos");
	tmp.innerHTML=tmp.innerHTML.replace(/Rebels are attacking the government forces/,"Maištininkai puola valdžios šalininkus");
	tmp.innerHTML=tmp.innerHTML.replace(/Click/,"Spausk");
	tmp.innerHTML=tmp.innerHTML.replace(/here/,"čia");
	tmp.innerHTML=tmp.innerHTML.replace(/to join the struggle/,"norėdamas prisijungti prie mūšio");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/Supporters/,"Rėmėjai");
	tmp.innerHTML=tmp.innerHTML.replace(/Total rebels/,"Viso sukilėlių");
	tmp.innerHTML=tmp.innerHTML.replace(/Total loyalists/,"Viso valdžios šalininkų");
	tmp.innerHTML=tmp.innerHTML.replace(/Notable rebels/,"Pasižymėję maištininkai");
	tmp.innerHTML=tmp.innerHTML.replace(/Notable loyalists/,"Pasižymėję valdžios šalininkai");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Battle start/,"Mūšis prasidėjo");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle/g,"Mūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/Score/,"Rezultatas");
	tmp.innerHTML=tmp.innerHTML.replace(/Total damage done/,"Viso padaryta žalos");
	tmp.innerHTML=tmp.innerHTML.replace(/no allies/g,"be sąj.");
	tmp.innerHTML=tmp.innerHTML.replace(/Civil war/,"Plietinis karas");
	tmp.innerHTML=tmp.innerHTML.replace(/Subsidies/,"Subsidijos");
	tmp.innerHTML=tmp.innerHTML.replace(/none/,"nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/none/,"nėra");
	tmp.innerHTML=tmp.innerHTML.replace(/battle won by/,"mūšį laimėjo");
	tmp.innerHTML=tmp.innerHTML.replace(/No\./g,"Α/Α");
	tmp.innerHTML=tmp.innerHTML.replace(/Top rebel soldiers/,"Geriausi maištininkai");
	tmp.innerHTML=tmp.innerHTML.replace(/Top loyalists soldiers/,"Geriausi valdžios šalininkai");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage/g,"Žala");
	if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš minutę");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš valandą");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"prieš dieną");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėnesį");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min.");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 d.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
	tmp = allElements.children[13];
	tmp.innerHTML=tmp.innerHTML.replace(/Civil war module was developed thanks to/,"Už pagalbą kuriant Pilietinio karo modulį dėkojame");
	tmp.innerHTML=tmp.innerHTML.replace(/and/,"ir");
	tmp.innerHTML=tmp.innerHTML.replace(/other donors/,"kitiems rėmėjams");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/Civil war module was developed thanks to/,"Už pagalbą kuriant Pilietinio karo modulį dėkojame");
	tmp.innerHTML=tmp.innerHTML.replace(/and/,"ir");
	tmp.innerHTML=tmp.innerHTML.replace(/other donors/,"kitiems rėmėjams");

}

//===================================================
//Maintenance
//===================================================
function doMaint() {
	allElements = document.getElementById('navigationRow').children[0];
	tmp = allElements.children[3].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Maintenance/,"Remontas");
	tmp = allElements.children[3].children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/We are sorry, the game is in maintenance mode/,"Atsiprašome, žaidimas šiuo metu yra tvarkomas");
	tmp = allElements.children[3].children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Maintenance reason/,"Remonto priežastis");
	tmp.innerHTML=tmp.innerHTML.replace(/Maintenance duration/,"Remonto trukmė");
}


//===================================================
//Timebasic timestamp
//===================================================
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l];
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/," prieš sek.");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"prieš min.");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"prieš val.");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"vakar");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"prieš mėn.");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"prieš $1 sek.");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"prieš $1 min");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"prieš $1 val.");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"prieš $1 d.");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"prieš $1 mėn.");
            } 
        }
    }
}
  
   
//===================================================
//Main
//===================================================
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
} else if (isTargetHtml("/donateMoney.html")) {
	doDonateMoney();
} else if (isTargetHtml("/donateProducts.html")) {
	doDonateProduct();
} else if (isTargetHtml("/editCitizen.html")) {
	doEditCitizen();
} else if (isTargetHtml("/changeName.html")) {
	doChangeName();
} else if (isTargetHtml("/transactionLog.html")) {
	doTransactionsLog();
} else if (isTargetHtml("/travel.html")) {
	doTravel();
} else if (isTargetHtml("/inboxMessages.html")) {
	doInboxMessages();
} else if (isTargetHtml("/conversation.html")) {
	doConversation();
} else if (isTargetHtml("/sentMessages.html")) {
	doSentMessages();
} else if (isTargetHtml("/composeMessage.html")) {
	doComposeMessage();
} else if (isTargetHtml("/subscription.html")) {
	doPremium();
} else if (isTargetHtml("/notifications.html")) {
	doNotifications();
} else if (isTargetHtml("/subs.html")) {
	doSubs();
} else if (isTargetHtml("/subscribedNewspapers.html")) {
	doSubscribedNewspapers();
} else if (isTargetHtml("/newspaper.html")) {
	doNewspaper();
} else if (isTargetHtml("/subList.html")) {
	doSubsList();
} else if (isTargetHtml("/editNewspaper.html")) {
	doNewspaperEdit();
} else if (isTargetHtml("/article.html")) {
	doArticle();
} else if (isTargetHtml("/voteList.html")) {
	doVotesList();
} else if (isTargetHtml("/editArticle.html")) {
	doArticleEdit();
} else if (isTargetHtml("/myParty.html")) {
	doMyParty();
} else if (isTargetHtml("/party.html")) {
	doMyParty();	
} else if (isTargetHtml("/contracts.html")) {
	doContractsList();
} else if (isTargetHtml("/contract.html")) {
	doContract();
} else if (isTargetHtml("/stockCompany.html")) {
	doStockCompany();
} else if (isTargetHtml("/stockCompanyActs.html")) {
	doStockCompanyActs();
} else if (isTargetHtml("/stockCompanyAct.html")) {
	doStockCompanyLaws();
} else if (isTargetHtml("/stockCompanyShouts.html")) {
	doStockCompanyShouts();
} else if (isTargetHtml("/stockCompanyTransactions.html")) {
	doStockCompanyTransactions();
} else if (isTargetHtml("/stockCompanyMoney.html")) {
	doStockCompanyMoney();
} else if (isTargetHtml("/stockCompanyProducts.html")) {
	doStockCompanyStorage();
} else if (isTargetHtml("/stockCompanyDonateMoney.html")) {
	doStockCompanyDonateM();
} else if (isTargetHtml("/stockCompanyDonateCompany.html")) {
	doStockCompanyDonateC();
} else if (isTargetHtml("/stockCompanyLogs.html")) {
	doStockCompanyLog();
} else if (isTargetHtml("/myShares.html")) {
	doShares();
} else if (isTargetHtml("/stockCompanyAssets.html")) {
	doStockCompanyAssets();
} else if (isTargetHtml("/inviteFriends.html")) {
	doInviteFriends();
} else if (isTargetHtml("/referrerClicks.html")) {
	doRefClicks();
} else if (isTargetHtml("/myMilitaryUnit.html")) {
	doMilitaryUnit();
} else if (isTargetHtml("/militaryUnit.html")) {
	doMilitaryUnit();
} else if (isTargetHtml("/editMilitaryUnit.html")) {
	doMUEdit();
} else if (isTargetHtml("/changeMUNationality.html")) {
	doMUNationality();
} else if (isTargetHtml("/militaryUnitPrivilages.html")) {
	doMUPriv();
} else if (isTargetHtml("/militaryUnitStorage.html")) {
	doMUStorage();
} else if (isTargetHtml("/militaryUnitMoneyAccount.html")) {
	doMUMoney();
} else if (isTargetHtml("/militaryUnitDonations.html")) {
	doMUDonations();
} else if (isTargetHtml("/militaryUnitJobs.html")) {
	doMUJobs();
} else if (isTargetHtml("/militaryUnitRecrutation.html")) {
	doMURecruit();
} else if (isTargetHtml("/militaryUnitLogs.html")) {
	doMULogs();
} else if (isTargetHtml("/militaryUnitMembers.html")) {
	doMUMembers();
} else if (isTargetHtml("/militaryUnitCompanies.html")) {
	doMUCompanies();
} else if (isTargetHtml("/donateMoneyToMilitaryUnit.html")) {
	doDonateMoneyMU();
} else if (isTargetHtml("/donateProductsToMilitaryUnit.html")) {
	doDonateProductMU();
} else if (isTargetHtml("/donateCompanyToMilitaryUnit.html")) {
	doDonateCompanyMU();
} else if (isTargetHtml("/broadcastToMilitaryUnit.html")) {
	doMUBroadcast();
} else if (isTargetHtml("/citizenMarketOffers.html")) {
	doCitizenMarketOffers();
} else if (isTargetHtml("/monetaryMarket.html")) {
	doMonetaryMarket();
} else if (isTargetHtml("/moneyTransactions.html")) {
	doMMTransactions();
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
}else if (isTargetHtml("/stockCompanyStatistics.html")) {
	doStockStats();
}else if (isTargetHtml("/militaryUnitStatistics.html")) {
	doMuStat();
}else if (isTargetHtml("/donations.html")) {
	doDonations();
}else if (isTargetHtml("/news.html")) {
	doNews();
}else if (isTargetHtml("/countryEconomyStatistics.html")) {
	doCountryEco();
}else if (isTargetHtml("/citizensOnline.html")) {
	doOnlineCitizens();
}else if (isTargetHtml("/newCitizens.html")) {
	doNewCitizens();
}else if (isTargetHtml("/countryLaws.html")) {
	doCountryLaws();
}else if (isTargetHtml("/law.html")) {
	doLaws();
}else if (isTargetHtml("/partyElections.html")) {
	doPartyElec();
}else if (isTargetHtml("/congressElections.html")) {
	doCongressElec();
}else if (isTargetHtml("/presidentalElections.html")) {
	doPresiElec();
}else if (isTargetHtml("/pendingCitizenshipApplications.html")) {
	doCSappli();
}else if (isTargetHtml("/acceptedCitizenshipApplications.html")) {
	doCSaccepted();
}else if (isTargetHtml("/googleMap.html")) {
	doWorldmap();
}else if (isTargetHtml("/region.html")) {
	doRegion();
}else if (isTargetHtml("/map.html")) {
	doMap();
}else if (isTargetHtml("/companies.html")) {
	doCompany();
}else if (isTargetHtml("/editCompany.html")) {
	doCompanyEdit();
}else if (isTargetHtml("/company.html")) {
	doCompanyDetails();
}else if (isTargetHtml("/companyWorkResults.html")) {
	doCompanyResults();
}else if (isTargetHtml("/companySummary.html")) {
	doCompanySummary();
}else if (isTargetHtml("/countryPoliticalStatistics.html")) {
	doPoliticalStats();
}else if (isTargetHtml("/battlesByWar.html")) {
	doWarBattles();
}else if (isTargetHtml("/militaryUnitsStats.html")) {
	doBattleMUStatistics();
}else if (isTargetHtml("/civilWar.html")) {
	doCivil();
}else if (isTargetHtml("/shouts.html")) {
	doShouts();
}else if (isTargetHtml("/search.html")) {
	doSearch();
}else if (isTargetHtml("/googleSearch.html")) {
	doSearchGoogle();
}else if (isTargetHtml("/maintenance.html")) {
	doMaint();
}