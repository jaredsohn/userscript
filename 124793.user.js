// ==UserScript==
// @name           e-sim Hebrew
// @namespace      e-sim Hebrew
// @include        *e-sim.org*
// @version        1.15v
// ==/UserScript==
//Hebrew translation by Swifty

menuLinkReplacements = {
	"work.html"				:["Work","עבודה"],
	"train.html"			:["Train","אימון"],
	"companies.html"		:["Companies","חברות"],
	"newspaper.html"		:["Newspaper","עיתון"],
	"myParty.html"			:["Party","מפלגה"],
	"contracts.html"		:["Contracts","חוזים"],
	"inviteFriends.html"	:["Invite friends","הזמן חברים"],
	"myMilitaryUnit.html"	:["Military unit","יחידה צבאית"],
	"subscription.html"     :["Premium account","חשבון פרימיום"],
	
	"productMarket.html"	:["Product market","שוק מוצרים"],
	"jobMarket.html"		:["Job market","שוק עבודה"],
	"monetaryMarket.html"	:["Monetary market","שוק המטבעות"],
	"companiesForSale.html"	:["Companies for sale","חברות למכירה"],
	
	"countryStatistics.html"		:["Country statistics","לפי מדינות"],
	"partyStatistics.html"			:["Party statistics","לפי מפלגות"],
	"newspaperStatistics.html"		:["Newspaper statistics","לפי עיתונים"],
	"citizenStatistics.html"		:["Citizen statistics","לפי אזרחים"],
	"militaryUnitStatistics.html"	:["Military unit stats","לפי יחידות צבאיות"],
	"donations.html"		:["Donations","תרומות"],
	"fundRaising.html?id=2"		:["New modules","מודלים חדשים"],

	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","כתבות ראשיות"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","כתבות אחרונות"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","אירועים צבאיים"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","אירועים פוליטיים"],
	
	"battles.html"							:["Battles","קרבות"],
	"countryPoliticalStatistics.html"		:["War and politics","מלחמה ופוליטיקה"],
	"countryEconomyStatistics.html"			:["Economy","כלכלה"],
	"countryLaws.html"						:["Laws","חוקים"],
	"partyElections.html"					:["Party elections","בחירות למפלגה"],
	"congressElections.html"				:["Congress elections","בחירות לקונגרס"],
	"presidentalElections.html"				:["Presidential elections","בחירות לנשיאות"],
	"pendingCitizenshipApplications.html"	:["Citizenship","אזרחות"],
	"googleMap.html"						:["Map","מפה"]
};


menuTextReplacements = {
	"myPlacesButton":["My places","המקום שלי"],
	"marketButton":["Market","שוק"],
	"statisticsButton":["Statistics","סטטיסטיקה"],
	"newsButton":["News","חדשות"],
	"electionsButton":["Country","מדינה"]
};


sideLink1Replacements = {
	"crossIcon"	:["Logout","התנתקות"],
	"workIcon"	:["Work","עבודה"],
	"fightIcon"	:["Fight","לחימה"],
	"avatarIcon":["Upload avatar","העלה תמונה"],
	"voteIcon"	:["Vote","הצבעה"]
};

sideLink2Replacements = {
	"travel.html"	:["Travel","טיסה"],
	"pendingCitizenshipApplications.html"	:["change","שינוי"],
	"http://wiki.e-sim.org/en/Health"	:["Health tutorial","מדריך בריאות"]
};

sideLink3Replacements = {
	"eatLink"	:["Eat food","לאכול אוכל"],
	"useGiftLink":["Use gifts","להשתמש במתנות"]
};

sideLink4Replacements = {
	"eatButton":["Eat Food","לאכול"],
	"useGiftButton":["Use gift","להשתמש"] 
};


hpTitleReplacements = {
	"News":["News","חדשות"],
	"Shouts":["Shouts","צעקות"],
	"Battles":["Battles","קרבות"],
	"Events":["Events","אירועים"]
};


hpTabsReplacements = {
	"#topArticles":["Global","עולמי"],
	"#latestArticles":["Latest","אחרונים"],
	"#localArticles":["Local","מקומי"],
	
	"#countryShouts":["Country","מדינה"],
	"#friendsShouts":["Military unit","יחידה צבאית"],
	"#myShouts":["Friends","חברים"],
	
	"#localBattles":["Country","מדינה"],
	"#substidedBattles":["Subsidized","מסובסדים"],
	"#hotBattles":["Important","חשובים"],

	"#localEvents":["Military","צבאי"],
	"#globalEvents":["Military","צבאי"],
	"#politicalEvents":["Political","פוליטי"]
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
	"http://wiki.e-sim.org/en/MonetaryMarket"	:["Monetary market tutorial","מדריך: שוק הכסף"]
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
							left = -76,
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
							newLabel.innerHTML = 'תשתולל: 5 התקפות';
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

function replaceAlliesLinkComm(k) {
	var results;
	var obj;
	results = getElements(document, "//a[@class='" + k + "']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 בעלי ברית");
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
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"אין בעלי ברית");
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
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"מרד");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"סבסוד:");
	}
}

function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"אין בעלי ברית");
	//12 allies
	if (obj.innerHTML.match("1 ally")) {
	    obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"1 בעל ברית");
    } else {
        obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 בעלי ברית");
    }
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"מרד");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"סבסוד:");
}

//Test, other ways possible
function replaceBattleTime(obj) {
    if (obj.innerHTML.match(/[\d\.]+/g)== 1) {
        if (obj.innerHTML.match("second ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"לפני שניה");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"לפני דקה");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"לפני שעה");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"אתמול");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"לפני חודש");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"$1 לפני שניות");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"$1 לפני דקות");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"$1 לפני שעות");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"$1 לפני ימים");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"$1 לפני חודשים");
        }
    }
}
//---------------------------------------------------
//Top, Latest, Local Art
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"לפני שניה");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"לפני דקה");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"לפני שעה");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"אתמול");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"לפני חודש");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"$2 לפני שניות");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"$2 לפני דקות");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"$2 לפני שעות");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"$2 לפני ימים");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"$2 לפני חודשים");
    }   
}

//---------------------------------------------------
//Subs 
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"לפני שניה");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"לפני דקה");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"לפני שעה");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"אתמול");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"לפני חודש");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"$2 לפני שניות");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"$2 לפני דקות");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"$2 לפני שעות");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"$2 לפני ימים");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"$2 לפני חודשים");
    }
    
}


//---------------------------------------------------
//  battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"נלחמו");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"בהגנה:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"בהתקפה:");
	results = getElements(document, "//div[@style]");
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"סטטיסטיקה לסיבוב הנוכחי");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"סך הנזק של המגנים:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"סך הנזק של התוקפים:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"הנזק שלך:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"המדינות המגנות:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"המדינות התוקפות:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"יחידות ההגנה הראשיות:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"יחידות ההתקפה הראשיות:");
	obj.innerHTML=obj.innerHTML.replace(/(Rounds won by attacker)/,"בסבובים אלה נצחו התוקפים");	
	obj.innerHTML=obj.innerHTML.replace(/(Rounds won by defender)/,"בסבובים אלה נצחו המגנים");
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
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"לפני שניה");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"לפני דקה");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"לפני שעה");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"אתמול");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"לפני חודש");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"$2 שניות לפני");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"$2 דקות לפני");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"$2 שעות לפני");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"$2 ימים לפני");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"$2 חודשים לפני");
                } 
        }
    }
}
	    
replaceLinkByHrefSSS("#", {
    "Report":["Report","דווח"],
    "Delete":["Delete","מחיקה"],
    "Edit":["Edit","עריכה"],
    "More shouts":["More shouts","עוד צעקות"]
});
	
	
replaceInputByValue({
    "Report":["Report","דווח"],
    "Delete":["Delete","מחיקה"],
    "Edit":["Edit","עריכה"]
});	
	

//==============================================
//Menu
//==============================================
function doMenu() {
	replaceLinkByHref(menuLinkReplacements);
	replaceInnerHTML2(menuTextReplacements);
	allElements = document.getElementById('headerRow').children[2].children[0].children[0].children[1].children[1].children[3];
    allElements.innerHTML=allElements.innerHTML.replace(/day/,"יום");
}

//=============================================
//Side
//=============================================
function doSide() {
	var allElements;
	var tmp;
	
	allElements = document.getElementById('userMenu').children[0];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"רמה: ");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"דרגה:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"דרגה הבאה:");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"מיומנות כלכלית:");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"כוח:");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"מיקום:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"אזרחות:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"הגבלת אוכל:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"הגבלת מתנות:");


	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"הכסף שלך");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"החפצים שלך");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"ההודעות שלך");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"המטלות היומיות שלך");
	
	
	replaceLinkByHref(sideLink2Replacements);
	
	replaceLinkByID(sideLink3Replacements);
	
	replaceInputByID(sideLink4Replacements);
	
	replaceSpanByClass(sideLink1Replacements);
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Any")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any)/,"הכל");
		}
		else if (obj.innerHTML.match("Poland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Poland)/,"פולין");
		}
		else if (obj.innerHTML.match("Indonesia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Indonesia)/,"אינדונזיה");
		}
		else if (obj.innerHTML.match("Lithuania")) {
			obj.innerHTML=obj.innerHTML.replace(/(Lithuania)/,"ליטא");
		}
		else if (obj.innerHTML.match("Serbia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Serbia)/,"סרביה");
		}
		else if (obj.innerHTML.match("Bulgaria")) {
			obj.innerHTML=obj.innerHTML.replace(/(Bulgaria)/,"בולגריה");
		}
		else if (obj.innerHTML.match("Israel")) {
			obj.innerHTML=obj.innerHTML.replace(/(Israel)/,"ישראל");
		}
		else if (obj.innerHTML.match("Russia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Russia)/,"רוסיה");
		}
		else if (obj.innerHTML.match("Slovenia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Slovenia)/,"סלובניה");
		}
		else if (obj.innerHTML.match("Turkey")) {
			obj.innerHTML=obj.innerHTML.replace(/(Turkey)/,"טורקיה");
		}
		else if (obj.innerHTML.match("Greece")) {
			obj.innerHTML=obj.innerHTML.replace(/(Greece)/,"יוון");
		}
		else if (obj.innerHTML.match("Italy")) {
			obj.innerHTML=obj.innerHTML.replace(/(Italy)/,"איטליה");
		}
		else if (obj.innerHTML.match("China")) {
			obj.innerHTML=obj.innerHTML.replace(/(China)/,"סין");
		}
		else if (obj.innerHTML.match("Romania")) {
			obj.innerHTML=obj.innerHTML.replace(/(Romania)/,"רומניה");
		}
		else if (obj.innerHTML.match("Hungary")) {
			obj.innerHTML=obj.innerHTML.replace(/(Hungary)/,"הונגריה");
		}
		else if (obj.innerHTML.match("Republic of Macedonia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Republic of Macedonia)/,"מקדוניה");
		}
		else if (obj.innerHTML.match("Croatia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Croatia)/,"קרואטיה");
		}
		else if (obj.innerHTML.match("France")) {
			obj.innerHTML=obj.innerHTML.replace(/(France)/,"צרפת");
		}
		else if (obj.innerHTML.match("Sweden")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sweden)/,"שוודיה");
		}
		else if (obj.innerHTML.match("Ukraine")) {
			obj.innerHTML=obj.innerHTML.replace(/(Ukraine)/,"אוקראינה");
		}
		else if (obj.innerHTML.match("Latvia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Latvia)/,"לטביה");
		}
		else if (obj.innerHTML.match("Spain")) {
			obj.innerHTML=obj.innerHTML.replace(/(Spain)/,"ספרד");
		}
		else if (obj.innerHTML.match("Brazil")) {
			obj.innerHTML=obj.innerHTML.replace(/(Brazil)/,"ברזיל");
		}
		else if (obj.innerHTML.match("USA")) {
			obj.innerHTML=obj.innerHTML.replace(/(USA)/,"ארצות הברית");
		}
		else if (obj.innerHTML.match("United Kingdom")) {
			obj.innerHTML=obj.innerHTML.replace(/(United Kingdom)/,"בריטניה");
		}
		else if (obj.innerHTML.match("Portugal")) {
			obj.innerHTML=obj.innerHTML.replace(/(Portugal)/,"פורטוגל");
		}
		else if (obj.innerHTML.match("Argentina")) {
			obj.innerHTML=obj.innerHTML.replace(/(Argentina)/,"ארגנטינה");
		}
		else if (obj.innerHTML.match("India")) {
			obj.innerHTML=obj.innerHTML.replace(/(India)/,"הודו");
		}
		else if (obj.innerHTML.match("Netherlands")) {
			obj.innerHTML=obj.innerHTML.replace(/(Netherlands)/,"הולנד");
		}
		else if (obj.innerHTML.match("Bosnia and Herzegovina")) {
			obj.innerHTML=obj.innerHTML.replace(/(Bosnia and Herzegovina)/,"בוסניה והרצגובינה");
		}
		else if (obj.innerHTML.match("Iran")) {
			obj.innerHTML=obj.innerHTML.replace(/(Iran)/,"איראן");
		}
		else if (obj.innerHTML.match("Finland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Finland)/,"פינלנד");
		}
		else if (obj.innerHTML.match("Germany")) {
			obj.innerHTML=obj.innerHTML.replace(/(Germany)/,"גרמניה");
		}
		else if (obj.innerHTML.match("Mexico")) {
			obj.innerHTML=obj.innerHTML.replace(/(Mexico)/,"מקסיקו");
		}
		else if (obj.innerHTML.match("Canada")) {
			obj.innerHTML=obj.innerHTML.replace(/(Canada)/,"קנדה");
		}
		else if (obj.innerHTML.match("Taiwan")) {
			obj.innerHTML=obj.innerHTML.replace(/(Taiwan)/,"טייוואן");
		}
		else if (obj.innerHTML.match("Ireland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Ireland)/,"אירלנד");
		}
		else if (obj.innerHTML.match("Australia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Australia)/,"אוסטרליה");
		}
		else if (obj.innerHTML.match("South Korea")) {
			obj.innerHTML=obj.innerHTML.replace(/(South Korea)/,"דרום קוריאה");
		}
		else if (obj.innerHTML.match("Switzerland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Switzerland)/,"שוויץ");
		}
		else if (obj.innerHTML.match("All countries")) {
			obj.innerHTML=obj.innerHTML.replace(/(All countries)/,"כל המדינות");
		}
		else if (obj.innerHTML.match("Select product...")) {
			obj.innerHTML=obj.innerHTML.replace(/(Select product...)/,"בחר מוצר...");
		}
		else if (obj.innerHTML.match("Iron")) {
			obj.innerHTML=obj.innerHTML.replace(/(Iron)/,"ברזל");
		}
		else if (obj.innerHTML.match("Grain")) {
			obj.innerHTML=obj.innerHTML.replace(/(Grain)/,"חיטה");
		}
		else if (obj.innerHTML.match("Oil")) {
			obj.innerHTML=obj.innerHTML.replace(/(Oil)/,"נפט");
		}
		else if (obj.innerHTML.match("Stone")) {
			obj.innerHTML=obj.innerHTML.replace(/(Stone)/,"אבנים");
		}
		else if (obj.innerHTML.match("Wood")) {
			obj.innerHTML=obj.innerHTML.replace(/(Wood)/,"עצים");
		}
		else if (obj.innerHTML.match("Diamonds")) {
			obj.innerHTML=obj.innerHTML.replace(/(Diamonds)/,"יהלומים");
		}
		else if (obj.innerHTML.match("Weapon")) {
			obj.innerHTML=obj.innerHTML.replace(/(Weapon)/,"נשק");
		}
		else if (obj.innerHTML.match("House")) {
			obj.innerHTML=obj.innerHTML.replace(/(House)/,"בית");
		}
		else if (obj.innerHTML.match("Gift")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift)/,"מתנות");
		}
		else if (obj.innerHTML.match("Food")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food)/,"אוכל");
		}
		else if (obj.innerHTML.match("Ticket")) {
			obj.innerHTML=obj.innerHTML.replace(/(Ticket)/,"כרטיסים");
		}
		else if (obj.innerHTML.match("Defense System")) {
			obj.innerHTML=obj.innerHTML.replace(/(Defense System)/,"מערכת הגנה");
		}
		else if (obj.innerHTML.match("Hospital")) {
			obj.innerHTML=obj.innerHTML.replace(/(Hospital)/,"בית חולים");
		}
		else if (obj.innerHTML.match("All parties")) {
			obj.innerHTML=obj.innerHTML.replace(/(All parties)/,"כל המפלגות");
		}
		else if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"סיבוב נוכחי");
		} else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"סיבוב $2 ");
		} else if (obj.innerHTML.match("Food ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"סוג אוכל");
		} else if (obj.innerHTML.match("Gift ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"סוג מתנות");
		} else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"בלי נשק");
		} else if (obj.innerHTML.match("Any quality")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"כל איכות");
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
		"Show more battles":["Show more battles","הראה קרבות נוספים"],
		"Subsidies informations":["Subsidies informations","פרטי הסבסוד"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"אין קרבות מסובסדים");
        }	
    }
	
	
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"הוראות הקרב של יחידתך:");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"הלחם עבור:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"לפני דקה");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"לפני שעה");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"אתמול");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"לפני חודש");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"$1 דקות לפני");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"$1 שעות לפני");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"$1 ימים לפני");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"$1 חודשים לפני");
        }
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z- ]*)( in the battle versus )/g,"$2 נכשלה בהתקפה על ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"$2 נפתח מרד על ידי $5 $4");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"תקפה את $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"נשיא $2$3 הציע להכריז מלחמה על $5$6 ");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," הכריזה מלחמה על $2$3 ");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," בקרב נגד $2 הפסידה את ");
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/g," יש נשיא חדש");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","הראה עוד אירועים"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"הראה עוד אירועים");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"כתוב צעקה חדשה:");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="שלח!";
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"שלח ל:");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"שלח ל:");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," חברים | $2  יחידה צבאית| $4 מדינה");

	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","עוד צעקות"] });
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"שוק עבודה");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"בחר תחום:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"מדינה:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"מיומנות עבודה:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"מעסיק");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"חברה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"מוצר");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"מיומנות מינימלית");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"משכורת");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"אישור");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"עבודה");
	
	if (allElements.innerHTML.match(/You have no job^\./)) {
		xxx = document.getElementById('command').parentNode.children[0];
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"אין לך עבודה");
		replaceInputByValue({"Get a job now!":["Get a job now!","כנס לעבודה עכשיו!"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"אתה חייב להיות במדינה שבה נמאת החברה כדי לעבוד בה");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"מקום העבודה שלך");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"מעסיק");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"משכורת:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"להתפטר");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"לא עבדת היום");
			replaceInputByValue({"Work now":["Work now","תעבוד עכשיו"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"תוצאות עבודה");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"משכורת ברוטו");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"משכורת נטו");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"מס הכנסה ששולם");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"עבדת אצל");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"ניסיון שהושג");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"מיומנות כלכלית שהושגה");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/,"מספר ימי עבודה רצופים");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"הייצור הבסיסי שלך");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"בונוס לייצור");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"סך הייצור שלך");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"מספר יחידות שיוצרו");
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"איכות חברה");
		}
	}
}


//====================
//Product Markets
//====================
function doProductMarkets() {
	rr = {
		"1":["Any","כלשהו"],
		"2":["Iron","ברזל"],
		"3":["Grain","חיטה"],
		"4":["Oil","נפט"],
		"5":["Stone","אבנים"],
		"6":["Wood","עץ"],
		"7":["Diam.","יהלומים"],
		"8":["Weap.","נשק"],
		"9":["House","בתים"],
		"10":["Gift","מתנות"],
		"11":["Food","אוכל"],
		"12":["Ticket","כרטיסים"],
		"13":["DS","מ.הגנה"],
		"14":["Hosp.","ב.חולים"]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"שוק");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","הצעות:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","מדינה:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","איכות:");
	
	replaceInputByValue({"View offers":["View offers","הצעות"],"Buy":["Buy","קנה"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","הראה הצעות שלי/ שלח הצעה חדשה"]});
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"מוצר");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"מוכר");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"כמות");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"מחיר");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"קנה");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," מוצרים"); 
// check	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","הראה הצעות שלי/ שלח הצעה חדשה"],
		"http://wiki.e-sim.org/en/Category:Products":["Products info","מידע על המוצרים"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"אימון צבאי");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		replaceInputByValue({"Train":["Train","אימון"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"האימון הושלם. בבקשה תחזור מחר");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"כבר התאמנת היום");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"כבר התאמנת היום. בבקשה תחזור מחר.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"כוח שהושג:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"נתונים צבאיים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"מספר ימי אימונים:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"כוח:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"דרגה צבאית:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"סך הנזק שגרמת:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"נזק בלי נשק:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"נזק עם נשק רמה 1:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"נזק עם נשק רמה 2:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"נזק עם נשק רמה 3:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"נזק עם נשק רמה 4:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"נזק עם נשק רמה 5:");
	
}

//=================
//Battles List 
//=================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"קרבות");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"מדינה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"מיון:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"רק קרבות מסובסדים:");
	
	replaceInputByValue({"Show battles":["Show battles","הראה קרבות"]});

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Sorting by start time")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sorting by start time)/,"לפי זמן פתיחה");
		} else if (obj.innerHTML.match("Sorting by subsidy size")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sorting by subsidy size)/,"לפי גודל סבסוד");
		} else if (obj.innerHTML.match("Sorting by total damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sorting by total damage)/,"לפי נזק כולל");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"התחלת הקרב");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"קרב");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"תוקפים נגד מגנים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"תוצאה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"סך הנזק שנעשה");
	
	

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
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"מרד");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"התחיל את במרד");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"סיבוב $2");

	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	// Top3
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"המגנים המובילים");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"התוקפים המובילים");
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"אתה לא יכול להלחם בקרב זה מהמיקום הנוכחי שלך.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"אתה חייב לטוס למדינה הכובשת כדי להשתתף בקרב זה");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"אתה לא יכול להלחם בקרב זה מהמיקום הנוכחי שלך.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"אתה צריך לטוס לאחת מהמדינות המשתתפות בקרב כדי להלחם.");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"בסיבוב זה נצחו :");
	} else {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"בחר נשק:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"בחר צד:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"אתה נלחם לצד:");
	}
	
	
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"הראה סיבוב:");
	}
	replaceInputByValue({"Show round":["Show round","הראה סיבוב"]});
	replaceInputByValue({"Fight (1 hit)":["Fight (1 hit)","תקוף: התקפה 1 "]});
	//replaceInputByValue({"Berserk! (5 hits)":["Berserk! (5 hits)","תשתולל! 5 התקפות"]}); 
	replaceBerserk()

	tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"סטטיסטיקה של כל הקרב");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show military units supporting this battle)/,"הראה את היחידות התומכות בקרב זה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"מדריך: לחימה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"חוקי הקרב");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buildings active during this round)/,"מבנים פעילים בסבוב זה");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"התחיל את המרד");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"סיבוב $2 ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"בסיבוב זה נצחו המגנים ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"בסיבוב זה נצחו התוקפים ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"חזרה לקרב");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"הסטטיסטיקה מתעדכנת כל 30 דקות");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle statistics/,"סטטיסטיקת הקרב");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"התחיל את המרד");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"סיבוב $2 ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"בסיבוב זה נצחו המגנים ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"בסיבוב זה נצחו התוקפים ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"חזרה לקרב");

	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Supporting military units/,"היחידות התומכות");
	tmp.innerHTML=tmp.innerHTML.replace(/(Defender's supporters)/,"תומכים בהגנה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Attacker's supporters)/,"תומכים בהתקפה");
}


//=============
//Profile
//=============
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /," האזרח ");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"מחובר");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"לא מחובר");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","ערוך פרופיל"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","שנה שם"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","דווח על מולטי"]
	});
	replaceInputByValue({"Report multi":["Report multi","דווח על מולטי"]});

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match("Permanently")) {
		rowoffset = 2;
		tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"באן תמידי");
		tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"סיבה:");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"נותן הבאן:");
	}
	

	tmp = allElements.children[0].children[2+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"רמה:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"ניסיון:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"נזק:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"דרגה:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"מיומנות כלכלית:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"כוח:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"מיקום:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"אזרחות:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"יום הולדת:");
	
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by XP:/,"מיקום במדינה לפי ניסיון:");
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by damage:/,"מיקום במדינה לפי נזק:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by XP:/,"מיקום עולמי לפי ניסיון:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by damage:/,"מיקום עולמי לפי נזק:");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"יחידה צבאית:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"מפלגה:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"עיתון:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"מקום עבודה:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"חברות בבעלותו");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"משרה פוליטית:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"אין יחידה צבאית");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"אין מפלגה");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"אין עיתון");
	tmp.innerHTML=tmp.innerHTML.replace(/No work/,"אין עבודה");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"אין חברות");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"אין משרה פוליטית");
	
	allElements = getElements(document, "//ul[@style]");
	
	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
		tmp = allElements.snapshotItem(0).parentNode;
		if (tmp.innerHTML.match("Active debts")) {
			rowoffset = 2;
			tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"חובות פעילים");
			tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g,"יום ההחזר");
			tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( game day)/g," $1");
		}
	}
	
	allElements = document.getElementById('medals');
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"חברים");
	
	doShoutsComm();
	
}


//===================
//Edit Citizen
//===================
function doEditCitizen() {
	allElements = document.getElementById('editCitizenForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Mail:/,"אי-מייל:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"ססמה חדשה:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"ססמה חדשה שוב:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"ססמה ישנה:");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"תמונה חדשה:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","גודל מקסימלי:");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"אזרח");
	replaceInputByValue({"Edit citizen":["Edit citizen","עריכת אזרח"]});
}

//=============
//Travel
//=============
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"טיסה");
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"מדינה");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"אזור:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"איכות הכרטיס:");
	
	replaceInputByValue({"Travel":["Travel","טוס"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Traveling":["Traveling tutorial on wiki","מדריך: טיסה"]
	});
}


//==================
//Inbox Messages
//==================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"ההודעה מ: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"הודעות שנשלחו: ");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"מחבר");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"הודעה");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"תאריך");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"מחק");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"ל");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		replaceBattleTime(tmp.children[i].children[2]);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","הודעות שנשלחו"],
		"composeMessage.html":["Compose message","הודעה חדשה"]
	});
	replaceInputByValue({
		"Delete":["Delete","מחק"],
		"Quick reply":["Quick reply",",תגובה מהירה"],
		"Report":["Report","דווח"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","דווח"],
		"Quick reply":["Quick reply","תגובה מהירה"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","תגובה"],
		"conversation.html":["Previous messages","הודעות קודמות"]
	});
	
}

//=================
//Sent Messages
//=================
function doSentMessages() {
	doMessagesComm();
	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","הודעות נכנסות"],
		"composeMessage.html":["Compose Message","הודעה חדשה"]
	});
}

//===================
//Compose Message
//===================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"הודעה חדשה");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","הודעות נכנסות"],
		"sentMessages.html":["Sent messages","הודעות שנשלחו"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"מקבל:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"כותרת:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"הודעה:");
	
	replaceInputByValue({
		"Send":["Send","שלח"],
		"Preview":["Preview","תצוגה מקדימה"]
	});
}


//=================
//Subscriptions
//=================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"מנויים");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"מנויים");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","רשימה של המנויים לעיתונים"]
	});
}

//==========================
//Subscribed Newspapers
//==========================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"מנויים לעיתונים");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"מספר המנויים");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"עיתון");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"זמן המינוי");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","מדריך: עיתונים"]
	});
}

//===============
//Newspaper
//===============
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"עיתון");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"כתבות אחרונות");
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","עריכת עיתון"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","מדריך: עיתונים"]
	});
	replaceInputByValue({
		"Publish":["Publish","פרסם"],
		"Preview":["Preview","תצוגה מקדימה"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"כתוב כתבה חדשה");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"לפרסם במדינה");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"כותרת הכתבה:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"כתבה:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"בבקשה תשמור את הכתבה על המחשב לפני הפרסום!!!");
	}
}

//===================
//Edit Newspaper
//===================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"שם העיתון:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"תמונה חדשה:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","גודל מקסימלי:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","ערוך עיתון"]
	});
	replaceInputByValue({
		"Delete":["Edit newspaper","ערוך עיתון"]
	});
}

//===============
//Article
//===============
function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"כתבה");
	
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","ערוך כתבה"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","ערוך עיתון"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","דווח"],
		"Edit":["Edit","ערוך"],
		"Delete":["Delete","מחק"]
	});
	replaceInputByValue({
		"Publish":["Publish","פרסם"],
		"Report":["Report","דווח"],
		"Edit":["Edit","ערוך"],
		"Delete":["Delete","מחק"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"תגובה חדשה");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"הודעה:");
}

//=================
//Edit Article
//=================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"עיתון");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"ערוך כתבה");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"כותרת כתבה:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"הודעה:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","ערוך עיתון"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","מדריך: עיתונים"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","ערוך כתבה"]
	});
}

//=================
//Contracts List
//=================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"חוזים");
	
	tmp = allElements.children[2].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"תבניות");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","חוזים שהוצעו (20 אחרונים)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"הוצע ל");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"אין חוזים");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","חוזים שאושרו (20 אחרונים)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"הוצע ל");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"אין חוזים");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","חוזים שנדחו");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"נדחה על ידי $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"אין חוזים");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","חוזים שנכשלו");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"אין חוזים");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","ההלוואות הפעילות שלך");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","לווה");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","יום ההחזר");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","סכום");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","ביטול הלוואה");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","אין הלוואה");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","החובות הפעילים שלך");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","מלווה");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","יום ההחזר");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","סכום");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","שלם חוב");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","אין חובות");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","שם התבנית:");
	

	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Contracts":["Contract tutorial","מדריך: חוזים"],
		"#":["Create new template","צור תבנית חדשה"]
	});
	replaceInputByValue({
		"Delete":["Delete","מחק"],
		"Create template":["Create template","צור תבנית"]
	});
	
}

//=================
//Contract detail
//=================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"התחייבות $1");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"התחייבות של הצד השני");
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/,"הצד השני");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"התחייבות $1");
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," יתרום מיידית את המוצרים הבאים");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," יתרום מיידית את סכום הכסף הבא");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt/," יחוייב בחוב הבא");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"חייב להיות משולם $1$3$5 יום במשחק ($6 ימים מרגע חתימת החוזה "
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
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"חוזים");
	allElements = allElements.children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"חוזה");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"מצב החוזה: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"אושר");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"נדחה על ידי $1 ");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"נכשל");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"תבנית");
	
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"להוסיף מרכיב נוסף לחוזה");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"צד");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"סוג מוצר");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"הצד השני");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","כסף"],
			"Product":["Product","מוצר"],
			"Debt":["Debt","חוב"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"כסף ב ( ");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"כמות:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"סוג המוצר:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"איכות המוצר:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","ברזל"],
			"Grain":["Grain","חיטה"],
			"Oil":["Oil","נפט"],
			"Stone":["Stone","אבנים"],
			"Wood":["Wood","עצים"],
			"Diamonds":["Diamonds","יהלומים"],
			"Weapon":["Weapon","נשק"],
			"House":["House","בית"],
			"Gift":["Gift","מתנות"],
			"Food":["Food","אוכל"],
			"Ticket":["Ticket","כרטיסים"],
			"Defense System":["Defense System","מערכת הגנה"],
			"Hospital":["Hospital","בית חולים"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"חוב");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"כסף ב ( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"יום ההחזר:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"איכות המוצר:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"הצע חוזה");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"הצע ל");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"הערה:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"אתה יכול להציע חוזה רק לחברים שלך");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","הצד השני"],
		"contracts.html":["Go back to contract list","חזור לרשימת החוזים"]
	});
	replaceInputByValue({
		"Delete":["Delete","מחק"],
		"Propose":["Propose","הצע"],
		"Add item":["Add item","הוסף"]
	});
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1);
	if (check.innerHTML.match("Cancel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"בטל הצעה");
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","בטל הצעה"]});
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
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary Market/,"שוק המטבעות");
    
    allElements = results.snapshotItem(0).children[2];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Current offers/,"הצעות נוכחיות");
    
    allElements = results.snapshotItem(0).children[4];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Show Offers/,"הראה הצעות");
    
    allElements = results.snapshotItem(0).children[4];
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"החלף בין המטבעות");
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"קנה מטבע");
    tmp.innerHTML = tmp.innerHTML.replace(/Sell currency/,"מכור מטבע");
    tmp.innerHTML = tmp.innerHTML.replace(/View offers/,"ראה הצעות");
    
    allElements = results.snapshotItem(0).children[7];
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary market tutorial/,"מדריך: שוק המטבעות");
    
    results = getElements(document, "//table[@class='dataTable']");
    allElements = results.snapshotItem(0).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"מוכר");
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"כמות");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"יחס");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy/,"קנה");
    
    allElements = results.snapshotItem(1).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"כמות");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"יחס"); 
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"מחק");
    
    allElements = results.snapshotItem(1).children[0];
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"אין הצעות");  
    
    results = getElements(document, "//TD[@style='border-left: 2px dashed #aaa']");
    
    allElements = results.snapshotItem(0).children[2];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers/,"ההצעות שלך") ;
    
    allElements = results.snapshotItem(0).children[5];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Post your Offer/,"שלח הצעה שלך");
    
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"החלף בין המטבעות");
    
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Offered currency/,"הצעות");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"קנה מטבע");
    tmp.innerHTML = tmp.innerHTML.replace(/Exchange rate/,"יחס חליפין");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"שלח הצעה חדשה");
    tmp.innerHTML = tmp.innerHTML.replace(/Offer/,"הצעה");
    tmp.innerHTML = tmp.innerHTML.replace(/at rate/,"לפי יחס");
    
}

//===============
//MilitaryUnit
//===============

function doMilitaryUnit() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit)/,"יחידה צבאית");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(You are not in any military unit)/,"אתה לא נמצא בשום יחידה צבאית");
	tmp.innerHTML=tmp.innerHTML.replace(/(Join existing one)/,"הצטרף ליחידה צבאית");
	tmp.innerHTML=tmp.innerHTML.replace(/(Create military unit)/,"צור יחידה צבאית");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(You need to have level)/,"אתה צריך להיות ברמה");
	tmp.innerHTML=tmp.innerHTML.replace(/(to join military unit)/,"כדי להצטרף ליחידה צבאית");
		
	tmp = allElements.children[4];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"מחסן");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"תרומות");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"ערוך יחידה צבאית");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"הרשאות");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"חשבון יחידה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"הצעות עבודה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"גיוס");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"בקשות ממתינות");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"הצג רשומות");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"מדינה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"דרגה צבאית");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"מספר חברים");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"מקסימום חברים");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"סך נזק בקרבות");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"נזק היום");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"מפקד");
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"מחסן");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"תרומות");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%9E%D7%97%D7%A1%D7%9F)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%AA%D7%A8%D7%95%D7%9E%D7%95%D7%AA)/,"Donations");
	replaceInputByValue({"Leave military unit":["Leave military unit","צא מהיחידה הצבאית"]});
	
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(Description)/,"תאור");
	
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Current orders)/,"הוראות יחידה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle:)/,"קרב:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"מרד");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"סבסוד:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Side:)/,"צד:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Briefing:)/,"תדריך:");
	tmp.innerHTML=tmp.innerHTML.replace(/(visible for members only)/,"נראה לחברים בלבד");
	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	replaceAlliesLinksss();
//	for( var i=0; i<2;i++){
//	tmp.innerHTML=tmp.innerHTML.replace(/(: none)/,": אין");
	//tmp.innerHTML=tmp.innerHTML.replace(/(no allies)/,"אין בעלי ברית");
	//}
	tmp.innerHTML=tmp.innerHTML.replace(/(battle won by)/,"המנצח בקרב");
	replaceInputByValue({"Edit_orders":["Edit_orders","ערוך הוראות"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Set today's battle)/,"קבע הוראות להיום");
	tmp.innerHTML=tmp.innerHTML.replace(/(No battles at this moment)/,"אין קרבות ברגע זה");
	
	
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"חברים");
	tmp.innerHTML=tmp.innerHTML.replace(/(View)/,"ראה");
	tmp.innerHTML=tmp.innerHTML.replace(/(manage members)/,"נהל חברים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies)/,"חברות");
	tmp.innerHTML=tmp.innerHTML.replace(/(No companies)/,"אין חברות");
	
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/(Latest clicks on referrer link)/,"לחיצות  אחרונות על הקישור");
	
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace(/(Time)/,"זמן");
	tmp.innerHTML=tmp.innerHTML.replace(/(Referrer)/,"מפנה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen)/,"אזרח");
	
	tmp = allElements.children[17];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show more clicks)/,"הראה עוד לחיצות");
	
}

//================
//CompanyMarket
//================

function doCompMarket() {
	var allElements;

	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies for sale)/,"חברות למכירה");
	
	rr = {
		"1":["Any","הכל"],
		"2":["Iron","ברזל"],
		"3":["Grain","חיטה."],
		"4":["Oil","נפט"],
		"5":["Stone","אבנים"],
		"6":["Wood","עצים"],
		"7":["Diam.","יהלומים"],
		"8":["Weap.","נשק."],
		"9":["House","בית"],
		"10":["Gift","מתנות"],
		"11":["Food","אוכל"],
		"12":["Ticket","כרטיסים"],
		"13":["DS","מ.הגנה"],
		"14":["Hosp.","ב.חולים"]
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
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","הראה הצעות:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","מדינה:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","איכות:");
	tmp.innerHTML=tmp.innerHTML.replace("No offers","אין הצעות");
	
	replaceInputByValue({"View offers":["View offers","ראה הצעות"],"Buy":["Buy","קנה"]});
	
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Company","חברה");
	tmp.innerHTML=tmp.innerHTML.replace("Product","מוצר");
	tmp.innerHTML=tmp.innerHTML.replace("Location","מיקום");
	tmp.innerHTML=tmp.innerHTML.replace("Seller","מוכר");
	tmp.innerHTML=tmp.innerHTML.replace("Price","מחיר");
	tmp.innerHTML=tmp.innerHTML.replace("Buy","קנה");
	for (var i = 0; i < 10; i++) {
	tmp.innerHTML=tmp.innerHTML.replace("Employer","מעסיק");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Country statistics)/,"סטטיסטיקה של המדינות");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"סוג הסטטיסטיקה:");
	replaceInputByValue({"Show":["Show","הראה"]});
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total:)/,"סך הכל:");
	tmp = allElements.children[6];
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"מס");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"מדינה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens)/,"אזרחים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage)/,"נזק כולל");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage today)/,"נזק היום");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/,"ניסיון");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength)/,"כוח");
	tmp.innerHTML=tmp.innerHTML.replace(/(New citizens today)/,"אזרחים חדשים היום");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens online)/,"אזרחים מחוברים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Productivity)/,"יצור");
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Citizens")) {
			obj.innerHTML=obj.innerHTML.replace(/(Citizens)/,"אזרחים");
		} else if (obj.innerHTML.match("Total damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Total damage)/,"נזק כולל");
		} else if (obj.innerHTML.match("Damage today")) {
			obj.innerHTML=obj.innerHTML.replace(/(Damage today)/,"נזק היום");
		} else if (obj.innerHTML.match("xp")) {
			obj.innerHTML=obj.innerHTML.replace(/(xp)/,"ניסיון");
		} else if (obj.innerHTML.match("Strength")) {
			obj.innerHTML=obj.innerHTML.replace(/(Strength)/,"כוח");
		} else if (obj.innerHTML.match("New citizens today")) {
			obj.innerHTML=obj.innerHTML.replace(/(New citizens today)/,"אזרחים חדשים היום");
		} else if (obj.innerHTML.match("Citizens online")) {
			obj.innerHTML=obj.innerHTML.replace(/(Citizens online)/,"אזרחים מחוברים");
		} else if (obj.innerHTML.match("Productivity")) {
			obj.innerHTML=obj.innerHTML.replace(/(Productivity)/,"יצור");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Party statistics)/,"סטטיסטיקה של המפלגות");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"מדינה");
	replaceInputByValue({"Show":["Show","הראה"]});
	replaceInputByValue({"Leave party":["Leave party","עזוב מפלגה"]});
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"מס");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"מדינה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"מפלגה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"חברים");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Newspaper statistics)/,"סטטיסטיקה של העיתונים");
	
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"מס");
	tmp.innerHTML=tmp.innerHTML.replace(/(Redactor)/,"מחבר");
	tmp.innerHTML=tmp.innerHTML.replace(/(Newspaper)/,"עיתון");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subs)/,"מנויים");

	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen statistics)/,"סטטיסטיקה של האזרחים");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"סוג הסטטיסטיקה:");
	replaceInputByValue({"Show":["Show","הראה"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"מדינה");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"מס");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen)/,"אזרח");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"מדינה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage)/,"נזק");
	tmp.innerHTML=tmp.innerHTML.replace(/(Today damage)/,"נזק כולל");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/,"ניסיון");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength)/,"כוח");
	tmp.innerHTML=tmp.innerHTML.replace(/(Achievements)/,"השגים");
	obj = results.snapshotItem(i);
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Damage)/,"נזק");
		} else if (obj.innerHTML.match("Today damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Today damage)/,"נזק היום");
		} else if (obj.innerHTML.match("xp")) {
			obj.innerHTML=obj.innerHTML.replace(/(xp)/,"ניסיון");
		} else if (obj.innerHTML.match("Strength")) {
			obj.innerHTML=obj.innerHTML.replace(/(Strength)/,"כוח");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit statistics)/,"סטטיסטיקה של היחידות");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"סוג הסטטיסטיקה:");
	replaceInputByValue({"Show":["Show","הראה"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"מדינה");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"מס");
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"חברים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Name)/,"שם");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank)/,"דרגה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"מדינה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage)/,"נזק כולל");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage today)/,"נזק היום");
	tmp.innerHTML=tmp.innerHTML.replace(/(Value)/,"שווי");

	obj = results.snapshotItem(i);
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Total damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Total damage)/,"נזק כולל");
		} else if (obj.innerHTML.match("Damage today")) {
			obj.innerHTML=obj.innerHTML.replace(/(Damage today)/,"נזק היום");
		} else if (obj.innerHTML.match("Total members")) {
			obj.innerHTML=obj.innerHTML.replace(/(Total members)/,"מספר חברים");
		} else if (obj.innerHTML.match("Gold value")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gold value)/,"שווי בזהב");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(News)/,"חדשות");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show News:)/,"הראה חדשות:");
	tmp.innerHTML=tmp.innerHTML.replace(/(News Type)/,"סוג החדשות");
	replaceInputByValue({"View news":["View news"," הראה חדשות"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"מדינה");

	var results;
	results = getElements(document, "//table[@class='dataTable paddedTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Top articles)/,"חדשות מוביליות");
	tmp.innerHTML=tmp.innerHTML.replace(/(Latest articles)/,"חדשות אחרונות");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military events)/,"אירועים צבאיים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Political events)/,"אירועים פוליטיים");

		
		obj = results.snapshotItem(i);
	}
		for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	
		allElements = results.snapshotItem(i);
		for (var i = 0; i < 10; i++) {
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( minute[s]* ago)/g,"לפני $1 דקות");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( hour[s]* ago)/g,"לפני $1 שעות");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( day[s]* ago)/g,"לפני $1 ימים");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( month[s]* ago)/g,"לפני $1 חודשים");
		allElements.innerHTML=allElements.innerHTML.replace(/(Posted)/g," ");
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z ]*)( in the battle versus )/g,"$2 נכשלה בהתקפה על");
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )/g,"בהתקפה על");
		allElements.innerHTML=allElements.innerHTML.replace(/( in the battle versus )/g," כבשה את ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"$2 נפתח מרד על ידי $5 $4");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"תקפה את $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"נשיא $2$3 הציע להכריז מלחמה על $5$6");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g,"הכריזה מלחמה על $2$3");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )/,"בקרב נגד ");
	allElements.innerHTML=allElements.innerHTML.replace(/( in the battle versus )/,"  בקרב נגד");
	allElements.innerHTML=allElements.innerHTML.replace(/(Money donation of)/,"תרומה של");
	allElements.innerHTML=allElements.innerHTML.replace(/(was accepted)/,"אושרה בקונגרס");
	allElements.innerHTML=allElements.innerHTML.replace(/(was proposed in congress)/,"הוצעה להצבעה");
	allElements.innerHTML=allElements.innerHTML.replace(/(Issuing)/,"הדפסה");
	allElements.innerHTML=allElements.innerHTML.replace(/(wurde akzeptiert by congress)/,"zu drucken wurde vom Kongress akzeptiert");
	allElements.innerHTML=allElements.innerHTML.replace(/(Hospital was deployed in)/,"בית חולים נבנה ב:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Defense System was deployed in)/,"מערכת הגנה נבנתה ב:");
	allElements.innerHTML=allElements.innerHTML.replace(/(New taxes for)/,"מסים חדשים ל");
	allElements.innerHTML=allElements.innerHTML.replace(/(President of)/,"הנשיא של");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed to deploy)/,"הציע לבנות");
	allElements.innerHTML=allElements.innerHTML.replace(/(Defense System in)/,"מערכת הגנה ב:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Hospital in)/,"בית חולים ב:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Impeachment of president of)/,"הדחה של הנשיא");
	allElements.innerHTML=allElements.innerHTML.replace(/(was proposed)/,"הוצעה");
	allElements.innerHTML=allElements.innerHTML.replace(/(signed MPP with)/,"חתמה ברית עם:");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed mutual protection pact to)/,"הציעה לעשות ברית עם :");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed a peace treaty to)/,"הציעה לעשות שלום עם:");
	allElements.innerHTML=allElements.innerHTML.replace(/(were accepted in)/,"אושר ב:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Import tax)/,"מס הכנסה");
	allElements.innerHTML=allElements.innerHTML.replace(/(Food)/,"אוכל");
	allElements.innerHTML=allElements.innerHTML.replace(/(Gift)/,"מתנות");
	allElements.innerHTML=allElements.innerHTML.replace(/(Weapon)/,"נשק");
	allElements.innerHTML=allElements.innerHTML.replace(/(Ticket)/,"כרטיסים");
	allElements.innerHTML=allElements.innerHTML.replace(/(Stone)/,"אבנים");
	allElements.innerHTML=allElements.innerHTML.replace(/(Wood)/,"עצים");
	allElements.innerHTML=allElements.innerHTML.replace(/(Grain)/,"חיטה");
	allElements.innerHTML=allElements.innerHTML.replace(/(Iron)/,"ברזל");
	allElements.innerHTML=allElements.innerHTML.replace(/(Oil)/,"נפט");
	allElements.innerHTML=allElements.innerHTML.replace(/(House)/,"בית");
	allElements.innerHTML=allElements.innerHTML.replace(/(Diamonds)/,"יהלומים");
	}
	}
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Top articles")) {
			obj.innerHTML=obj.innerHTML.replace(/(Top articles)/,"כתבות מובילות");
		} else if (obj.innerHTML.match("Latest articles")) {
			obj.innerHTML=obj.innerHTML.replace(/(Latest articles)/,"כתבות אחרונות");
		} else if (obj.innerHTML.match("Military events")) {
			obj.innerHTML=obj.innerHTML.replace(/(Military events)/,"ארועים צבאיים");
		} else if (obj.innerHTML.match("Political events")) {
			obj.innerHTML=obj.innerHTML.replace(/(Political events)/,"ארועים פוליטיים");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Country Economy)/,"כלכלת המדינה");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select country)/,"בחר מדינה");
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Population)/,"אוכלוסיה");
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total active citizens)/,"מספר אזרחים פעילים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens online)/,"אזרחים מחוברים");
	tmp.innerHTML=tmp.innerHTML.replace(/(New citizens today)/,"מספר אזרחים חדשים היום");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total residents)/,"מספר תושבים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Who is online)/,"מי מחובר");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show details)/,"הראה פרטים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show details)/,"הראה פרטים");
	
	
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Regions)/,"אזורים");
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Resources)/,"משאבים");
		tmp.innerHTML=tmp.innerHTML.replace(/(Region)/,"אזורים");
	for ( var j=0;j < 20;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No resources)/,"אין משאבים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Capital of)/,"בירת");
	tmp.innerHTML=tmp.innerHTML.replace(/(HIGH)/,"גבוה");
	tmp.innerHTML=tmp.innerHTML.replace(/(MEDIUM)/,"בינוני");
	}
	obj = results.snapshotItem(i);
	}
	
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/(Taxes)/,"מסים");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"משאב");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Import Tax)/,"מס יבוא");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income Tax)/,"מס הכנסה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat)/,"מעמ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Iron)/,"ברזל");
	tmp.innerHTML=tmp.innerHTML.replace(/(Grain)/,"חיטה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Oil)/,"נפט");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Stone)/,"אבנים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Wood)/,"עצים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Diamonds)/,"יהלומים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Weapon)/,"נשק");
	tmp.innerHTML=tmp.innerHTML.replace(/(House)/,"בית");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Gift)/,"מתנות");
	tmp.innerHTML=tmp.innerHTML.replace(/(Food)/,"אוכל");
	tmp.innerHTML=tmp.innerHTML.replace(/(Ticket)/,"כרטיסים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Defense System)/,"מערכת הגנה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Hospital)/,"בית חולים");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%91%D7%A8%D7%96%D7%9C.png)/,"Iron.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%97%D7%99%D7%98%D7%94.png)/,"Grain.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%A0%D7%A4%D7%98.png)/,"Oil.png");	
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%90%D7%91%D7%A0%D7%99%D7%9D.png)/,"Stone.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%A2%D7%A6%D7%99%D7%9D.png)/,"Wood.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%D7%99%D7%94%D7%9C%D7%95%D7%9E%D7%99%D7%9D.png)/,"Diamonds.png");
	}
	
	tmp = allElements.children[19];
	tmp.innerHTML=tmp.innerHTML.replace(/(Treasury)/,"אוצר");
	
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Treasury)/,"אוצר");
	
	}
	tmp = allElements.children[24];
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"מלאי מבנים");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No buildings)/,"אין מבנים");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"הצעות חוק");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select country)/,"בחר מדינה");
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"הצעות חוק");
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Type)/,"סוג");
	tmp.innerHTML=tmp.innerHTML.replace(/(Results)/,"תוצאות");
	tmp.innerHTML=tmp.innerHTML.replace(/(Yes:No)/,"לא:כן");
	tmp.innerHTML=tmp.innerHTML.replace(/(Time)/,"זמן");
	for(var j=0;j<15;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Accepted)/,"אושר");
	tmp.innerHTML=tmp.innerHTML.replace(/(but failed)/,"אבל נכשל");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rejected)/,"נדחה");
	tmp.innerHTML=tmp.innerHTML.replace(/(hours ago)/,"שעות לפני");
	tmp.innerHTML=tmp.innerHTML.replace(/(days ago)/,"ימים לפני");
	tmp.innerHTML=tmp.innerHTML.replace(/(months ago)/,"חודשים לפני");
	tmp.innerHTML=tmp.innerHTML.replace(/(hour ago)/,"לפני שעה");
	tmp.innerHTML=tmp.innerHTML.replace(/(day ago)/,"אתמול");
	tmp.innerHTML=tmp.innerHTML.replace(/(month ago)/,"לפני חודש");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"תרום כסף");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cease Fire)/,"הפסקת אש");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change tax)/,"שנה מסים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Impeach)/,"הדחה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change welcome message)/,"שנה הודעת ברוך הבא");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/,"הדפסת כסף");
	tmp.innerHTML=tmp.innerHTML.replace(/(Elect president)/,"בחירת נשיא");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"הקמת מבנה");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"הצעת ברית");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/,"הכרזת מלחמה");
	
	}
	}
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"הצעות חוק");
	tmp = allElements.children[18];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress actions)/,"בחירות לקונגרס");
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposal left )/,"הצעות חוק שנשארו");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"תרום כסף");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cease Fire)/,"הפסקת אש");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change taxes)/,"שינוי מסים");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose impeach)/,"הצע הדחה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose welcome message)/,"הצע הודעת ברוך הבא");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/,"הדפסת כסף");
	tmp.innerHTML=tmp.innerHTML.replace(/(Elect president)/,"בחירת נשיא");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"הקמת מבנה");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"הצעת ברית");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/,"הכרזת מלחמה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country treasure)/,"אוצר המדינה");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"מלאי מבנים");
	tmp.innerHTML=tmp.innerHTML.replace(/(No buildings)/,"אין מבנים");
	replaceInputByValue({"Leave congress":["Leave congress","לעזוב את הקונגרס"]});
	
	tmp = allElements.children[21];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate buildings to national treasury)/,"תרום מבנים למדינה");
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(You have no buildings in your inventory)/,"אין לך מבנים במלאי");
	}
	
	tmp = allElements.children[26];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money to national treasury)/,"תרום כסף למדינה");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Select item to donate:)/,"בחר מטבע לתרומה:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Donate item:)/,"תרום:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Sum:)/,"סכום:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Reason:)/,"סיבה:");
		replaceInputByValue({"Donate":["Donate","תרום"]});
	}
	results = getElements(document, "//a[@target='_blank']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposals)/,"הצעוצ חוק");
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Party Elections)/,"בחירות למפלגה");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party:)/,"מפלגה:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"תאריך:");	
	replaceInputByValue({"Show":["Show","הראה"]});
	}replaceInputByValue({"Vote":["Vote","הצבע"]});
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"מס.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"מועמד");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"מפלגה");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"מספר הצבעות");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"מצע");
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"אין מצע");
	}
}
//=======================
//Congress Elections
//=======================

function doCongressElec() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","הראה"]});
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress Elections)/,"בחירות לקונגרס");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Elected candidates)/,"מועמדים שנבחרו");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Not elected candidates)/,"מועמדים שלא נבחרו");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party:)/,"מפלגה:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"תאריך:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"מדינה");	
	}
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"מס.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"מועמד");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"מצע");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"מפלגה");
	
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"מספר הצבעות");
	for(j=0;j<30;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"אין מצע");
	}
	for(j=0;j<20;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"מצע");
	}}
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/en/Congress elections']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress elections tutorial)/,"מדריך: בחירות לקונגרס");
	
	}
}
//=======================
//President elections
//=======================

function doPresiElec() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","הראה"]});
	replaceInputByValue({"Candidate for president":["Candidate for president","שלח מועמדות לנשיאות"]});
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential Elections)/,"בחירות לנשיאות");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(Link to presentation:)/,"קישור למצע");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidating for president costs)/,"מועמדות לנשיאות עולה");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party:)/,"מפלגה:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"תאריך:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"מדינה");	
	}
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"מס.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"מועמד");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"מפלגה");
	for(j=0;j<5;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"מצע");
	}
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"מספר נצבעות");
	tmp.innerHTML=tmp.innerHTML.replace(/(No candidates )/,"אין מועמדים");
	for(j=0;j<5;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"אין מצע");
	}}
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/en/Presidental elections']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential elections tutorial)/,"מדריך: בחירות לנשיאות");
	
	}
}
//==========================
//citizenship Application
//==========================

function doCSappli() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","הראה"]});
	replaceInputByValue({"Apply for citizenship":["Apply for citizenship","הגש בקשה לאזרחות"]});
	var tmp;
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Pending citizenship applications)/,"בקשות אזרחות שמחכות");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show accepted citizenship)/,"הראה בקשות לאזרחות שאושרו");
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Your application for citizenship in)/,"בקשת האזרחות שלך ב");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Your citizenship)/,"האזרחות שלך");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"מדינה:");
	tmp.innerHTML=tmp.innerHTML.replace(/(The application will be revised by)/,"הבקשה תבדק על ידי:");		
	tmp.innerHTML=tmp.innerHTML.replace(/(congress members of)/,"חבר קונגרס ב");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Pending applications)/,"בקשות שמחכות");
	tmp.innerHTML=tmp.innerHTML.replace(/(No applications)/,"אין בקשות");	
	obj=results.snapshotItem(i);
	}
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/en/Citizenship']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizenships on wiki)/,"מדריך: אזרחות");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(World map)/,"מפת עולם");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Browse territories)/,"בדוק אזורים");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Map Type:)/,"סוג המפה:");
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizenship:)/,"אזרחות:");
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
    
    tmp.innerHTML = tmp.innerHTML.replace(/Marketplace/,"שוק");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offers/,"שלח הצעה חדשה");
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"מדינה");
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"מוצר");
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"כמות");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"מחיר");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"שלח הצעה חדשה");
    tmp.innerHTML = tmp.innerHTML.replace(/Show market offers/,"הראה הצעות שוק");
    tmp.innerHTML = tmp.innerHTML.replace(/Your storage/,"המחסן שלך");
    
    results = getElements(document, "//h3[@style='text-align: center']");
    allElements = results.snapshotItem(0);
    tmp = allElements;
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers on market/,"ההצעות שלך בשוק");
    
    results = getElements(document, "//table[@style='width: 680px; margin-left: auto; margin-right: auto;']");
    allElements = results.snapshotItem(0).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"מוצר");
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"מוכר");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock/,"כמות");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"מחיר");
    tmp.innerHTML = tmp.innerHTML.replace(/Gross/,"ברוטו");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"מחיר");
    tmp.innerHTML = tmp.innerHTML.replace(/Net/,"נטו");
    tmp.innerHTML = tmp.innerHTML.replace(/Import tax/,"מס יבוא");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"מחק");
    
}
// NEW
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"חברות");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"חברה");
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"מוצר");
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"מיקום");
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"עובדים");
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"הקמת חברה חדשה");
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"שם החברה");
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"סוג המוצר");
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"לוגו החברה");
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"צור חברה");
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"מחיר הקמת החברה");
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"החברה תוקם במיקום הנוכחי שלך - האזור בו אתה נמצא");
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources/,"לבדוק אזורים עם משאבים");
    tmp = allElements.children[4];
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"מדריך: חברות");
}
    
    
function doPoliticalStats() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Country Politics/,"הפוליטיקה במדינה");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Select country/,"בחר מדינה");
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/President/,"נשיא");
    tmp = allElements.children[6];
    tmp.innerHTML = tmp.innerHTML.replace(/view elections/,"ראה בחירות");
    replaceLinkByHref({"http://wiki.e-sim.org/en/President":["President","נשיא"]});
    tmp = allElements.children[9];
    tmp.innerHTML = tmp.innerHTML.replace(/Congress/,"קונגרס");
    replaceLinkByHref({"http://wiki.e-sim.org/en/Congress":["Congress","קונגרס"]});
    tmp = allElements.children[17];
    tmp.innerHTML = tmp.innerHTML.replace(/Wars/,"מלחמות");
    tmp = allElements.children[21];
    tmp.innerHTML = tmp.innerHTML.replace(/War/,"מלחמה");
    tmp.innerHTML = tmp.innerHTML.replace(/Details/,"פרטים");
    tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"אין מלחמה");
    tmp = allElements.children[22];
    tmp.innerHTML = tmp.innerHTML.replace(/War rules/,"חוקי המלחמה");
    tmp = allElements.children[23];
    tmp.innerHTML = tmp.innerHTML.replace(/Alliances/,"בעלי ברית");
    tmp = allElements.children[27];
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"מדינה");
    tmp.innerHTML = tmp.innerHTML.replace(/Expires/,"פג תוקף"); 
    tmp = allElements.children[27].children[0];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[27].children[0].children[k].children[1];
    
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second)/g,"שניה");
	        } else if (tmp.innerHTML.match("minute")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute)/g,"דקה");
            } else if (tmp.innerHTML.match("hour")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour)/g,"שעה");
	        } else if (tmp.innerHTML.match("day")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day)/g,"אתמול");
            } else if (tmp.innerHTML.match("month")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month)/g,"חודש");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds)/g,"$1 שניות");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes)/g,"$1 דקות");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours)/g,"$1 שעות");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days)/g,"$1 ימים");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months)/g,"$1 חודשים");
            } 
        }
    }
    
    replaceLinkByHref({"http://wiki.e-sim.org/en/Alliances":["Alliances","בעלי ברית"]});
    
} 

function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"הזמן חברים");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/,"קישור ההפניה שלך");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/,"שלח קישור זה לאנשים אחרים כדי לקבל");
    tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"אתה תרוויח");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who register/,"זהב על כל שחקן שנרשם");
    tmp.innerHTML = tmp.innerHTML.replace(/and earn level 7/,"ומגיע לרמה 7");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"אחרי שלחץ על הקישור שלך");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"ובנוסף");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she get his\/her/,"אחרי שהוא יקבל את");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/,"המדליה הראשונה שלו");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"ולא רק זה");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"תקבל גם 10% מכל הזהב שהשחקן יקבל ממדליות או עליית רמה");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive additional/,"שים לב שגם מי שהזמנת יקבל ");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering from your invitation when he reach level 7/,"זהב נוספים כשיגיע לרמה 7");
    tmp = allElements.children[4];
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"שחקנים שהזמנת");
    tmp = allElements.children[5];
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"מיון לפי");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"הראה");
    tmp = allElements.children[6];
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"אזרח");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"רמה");
    tmp.innerHTML = tmp.innerHTML.replace(/XP/,"ניסיון");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"זהב שהתקבל");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"זמן ההרשמה");

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Gold received")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gold received)/,"זהב שהתקבל");
		} else if (obj.innerHTML.match("Register time")) {
			obj.innerHTML=obj.innerHTML.replace(/(Register time)/,"זמן הרשמה");
		} else if (obj.innerHTML.match("Citizen name")) {
			obj.innerHTML=obj.innerHTML.replace(/(Citizen name)/,"שם האזרח");
		} else if (obj.innerHTML.match("By experience")) {
			obj.innerHTML=obj.innerHTML.replace(/(By experience)/,"ניסיון");
		} else if (obj.innerHTML.match("By nationality")) {
			obj.innerHTML=obj.innerHTML.replace(/(By nationality)/,"אזרחות");
    		}
    		}
    TimeBasic(allElements,6,0,4);
    
    tmp = allElements.children[11];
    tmp.innerHTML = tmp.innerHTML.replace(/Statistics/,"סטטיסטיקה");
    tmp.innerHTML = tmp.innerHTML.replace(/Total clicks on referral link/,"סך לחיצות על הקישור");
    tmp.innerHTML = tmp.innerHTML.replace(/Unique clicks on referral link/,"סך לחיצות ייחודיות על הקישור");
    tmp.innerHTML = tmp.innerHTML.replace(/Total citizens registered/,"סך האזרחים שנרשמו");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens who reached level 7/,"אזרחים שהגיעו לרמה 7");
    tmp = allElements.children[14];
    tmp.innerHTML = tmp.innerHTML.replace(/Latest clicks on referrer link/,"לחיצות אחרונות על הקישור");
    tmp = allElements.children[15];
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"זמן");
    tmp.innerHTML = tmp.innerHTML.replace(/Referrer/,"מפנה");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"אזרח");
    
    TimeBasic(allElements,15,0,0);
    
    tmp = allElements.children[15].children[0];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3];
        if (tmp.innerHTML.match(/Not registered/)) {		
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"לא נרשם");
            }        
    }
    tmp = allElements.children[17];
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"הראה עוד לחיצות");
    
    
}
//Ulepszyc
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l];
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/,"לפני שניה");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"לפני דקה");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"לפני שעה");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"אתמול");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"לפני חודש");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"$1 לפני שניות");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"$1 לפני דקות");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"$1 לפני שעות");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"$1 לפני ימים");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"$1 לפני חודשים");
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