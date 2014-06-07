// ==UserScript==  Breith
// @name           e-sim France
// @namespace      e-sim-france
// @include        http://primera.e-sim.org*
// ==/UserScript==
//============================================================================
//????
//============================================================================
//---------------------------------------------------
//??
//---------------------------------------------------
//?? ??

menuLinkReplacements = {
        "work.html"                             :["Work","Travailler"],
        "train.html"                    :["Train","S'entrainer"],
        "companies.html"                :["Companies","Entreprises"],
        "newspaper.html"                :["Newspaper","Journal"],
        "myParty.html"                  :["Party","Parti politique"],
        "contracts.html"                :["Contracts","Contrats"],
        "inviteFriends.html"    :["Invite friends","Inviter des amis"],
        "myMilitaryUnit.html"   :["Military unit","Unité Militaire"],
	  "subscription.html"   :["Premium account","Compte Premium"],
        
        "productMarket.html"    :["Product market","Marché des produits"],
        "jobMarket.html"                :["Job market","Offres d'emploi"],
        "monetaryMarket.html"   :["Monetary market","Marche Monétaire"],
	  "stockMarket.html"   :["Stock market","Marché d'Actions"],
        "companiesForSale.html" :["Companies for sale","Entreprises en vente"],
	  "specialsItems.html"   :["Special items","Améliorations"],
        
        "countryStatistics.html"                :["Country statistics","Pays"],
        "partyStatistics.html"                  :["Party statistics","Partis"],
        "newspaperStatistics.html"              :["Newspaper statistics","Journaux"],
        "citizenStatistics.html"                :["Citizenstatistics","Citoyens"],
        "militaryUnitStatistics.html"   :["Military unit stats","Unités Militaires"],
	   "stockCompanyStatistics.html"   :["Stock market stats","Stats Marché d'Actions"],
        
        "news.html\?newsType=TOP_ARTICLES"              :["Top articles","Top articles"],
        "news.html\?newsType=LATEST_ARTICLES"   :["Latest articles","Derniers articles"],
        "news.html\?newsType=MILITARY_EVENTS"   :["Military events","Événements militaire"],
        "news.html\?newsType=POLITICAL_EVENTS"  :["Political events","Événements politique"],
        
        "battles.html"                                                  :["Battles","Batailles"],
        "countryPoliticalStatistics.html"               :["War and politics","Guerre et politique"],
        "countryEconomyStatistics.html"                 :["Economy","Economie"],
        "countryLaws.html"                                              :["Laws","Lois"],
        "partyElections.html"                                   :["Party elections","Élections de parti"],
        "congressElections.html"                                :["Congress elections","Élections du congrès"],
        "presidentalElections.html"                             :["Presidential elections","Présidentielles"],
        "pendingCitizenshipApplications.html"   :["Citizenship","Nationalité"],
        "googleMap.html"                                                :["Map","Carte"],
};


//?? ??
menuTextReplacements = {
        "myPlacesButton":["My places","Mon citoyen"],
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
        "crossIcon"     :["Logout","Déconnexion"],
        "workIcon"      :["Work","Travailler"],
        "fightIcon"     :["Fight","Combattre"],
        "avatarIcon":["Upload avatar","Modifier l'avatar"],
        "voteIcon"      :["Vote","Voter"],
};
//????2 <a href='key' ...>
sideLink2Replacements = {
        "travel.html"   :["Travel","Se déplacer"],
        "pendingCitizenshipApplications.html"   :["change","changer"],
        "http://wiki.e-sim.org/index.php/Health/France"       :["Health tutorial","Tutoriel santé"],
};
//????3 <a id='key' href="" ...>
sideLink3Replacements = {
        "eatLink"       :["Eat food","Utiliser nourriture"],
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
//      alert(pre + kk + aft + "____" + results.snapshotLength);
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
//      key="#"
//      { "Report":["Report","??"],"More shouts":["More shouts","??????"] }
//---------------------------------------------------
function replaceLinkByHrefSSS(kk, replacements) {
        replaceCommonSSS(document, kk, replacements, "//a[@href='", "']");
//      results = getElements(document, "//a[@href='" + kk + "']");
//      for (var i = 0; i < results.snapshotLength; i++) {
//              obj = results.snapshotItem(i);
//              for (k in replacements) {
//                      if (obj.innerHTML.match(k)) {
//                              obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
//                      }
//              }
//      }
}

//---------------------------------------------------
//??????????????,
//  <a style='key' ...>  key????
//
//      key="font-weight: bold"
//      { "More shouts":["More shouts","????????"]] }
//---------------------------------------------------
function replaceLinkByStyleSSS(kk, replacements) {
        replaceCommonSSS(document, kk, replacements, "//a[@style='", "']");
//      results = getElements(document, "//a[@href='" + kk + "']");
//      for (var i = 0; i < results.snapshotLength; i++) {
//              obj = results.snapshotItem(i);
//              for (k in replacements) {
//                      if (obj.innerHTML.match(k)) {
//                              obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
//                      }
//              }
//      }
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
//      replaceCommon(document, replacements, "//input[@id='", "']");
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
//      key="fightButton"
//      { "Fight (1 hit)":["Fight (1 hit)","xxxx"]] }
//---------------------------------------------------
function replaceInputByClassSSS(kk, replacements) {
        results = getElements(document, "//input[@class='" + kk + "']");
//      alert(results.snapshotLength);
        for (var i = 0; i < results.snapshotLength; i++) {
                obj = results.snapshotItem(i);
//              alert(obj.value);
                for (k in replacements) {
//                              alert(obj.value);
//                              alert(k);
//                              alert(obj.value.match("hit"));
                        if (obj.value.match(k)) {
//                              alert(obj.value);
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
//      alert(results.snapshotLength);
        for (var i = 0; i < results.snapshotLength; i++) {
                obj = results.snapshotItem(i);
                obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 allié(s)");
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
//              alert(obj.nodeValue);
                obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"Pas d'alliés");
        }
}
//function replaceNoAlliesChildren(obj) {
//      if (obj.innerHTML.match("no allies")) {
//              obj=tmp.childNodes[3];
//              obj.nodeValue=tmp.nodeValue.replace(/(no allies)/,"???");
//      }
//}
function replaceAlliesLinksss() {
        results = getElements(document, "//div[@class='battleDiv']");
//      alert(results.snapshotLength);
        for (var i = 0; i < results.snapshotLength; i++) {
                tmp=results.snapshotItem(i).children[0];
                replaceNoAlliesComm(tmp);
//              if (tmp.innerHTML.match("no allies")) {
//                      tmp=tmp.childNodes[3];
////                    alert(tmp.nodeValue);
//                      tmp.nodeValue=tmp.nodeValue.replace(/(no allies)/,"???");
//              }
                tmp=results.snapshotItem(i).children[2];
                replaceNoAlliesComm(tmp);
//              if (tmp.innerHTML.match("no allies")) {
//                      tmp=tmp.childNodes[3];
////                    alert(tmp.nodeValue);
//                      tmp.nodeValue=tmp.nodeValue.replace(/(no allies)/,"???");
//              }
//              alert(results.snapshotItem(i).children[3].innerHTML);
                tmp=results.snapshotItem(i).children[3];
                tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Guerre de résistance");
                tmp=results.snapshotItem(i).children[4];
                tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Subventions:");
//              obj = results.snapshotItem(i);
////            alert(obj.innerHTML);
//              obj.innerHTML=obj.innerHTML.replace(/(no allies)/,"???");
//              obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/g,"$1 ??");
//              obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/,"????");
//              obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/,"??:");
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
        obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 alliés");
        //Resistance war
        obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"Guerre de résistance");
        //Subsidies:
        obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Subventions:");
//      //: none
//      allElements.innerHTML=allElements.innerHTML.replace(/(: none)/g,":?");
//      //: 0.02 USD for 1.000 dmg
//      allElements.innerHTML=allElements.innerHTML.replace(/(: )([0-9.]+) (\w*)( for )/g,":$2 $3" ?);
}

//---------------------------------------------------
//replace common
//  ??????
//  ????
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
//  ?? ???????? by
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
        obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( second[s]* ago by)/g,"Posté ,il y a $2 seconde(s) par ");
        obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( minute[s]* ago by)/g,"Posté ,il y a $2 minute(s) par ");
        obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( hour[s]* ago by)/g,"Posté ,il y a $2 heure(s) par ");
        obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( day[s]* ago by)/g,"Posté ,il y a $2 jours(s) par ");
        obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( month[s]* ago by)/g,"Posté ,il y a $2 mois par ");
}

//---------------------------------------------------
//replace common
//  ?????????
//---------------------------------------------------
function replacNewspaperTime(obj) {
        obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( second[s]* ago)/g,"Posté ,il y a $2 seconde(s)");
        obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( minute[s]* ago)/g,"Posté ,il y a $2 minute(s)");
        obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( hour[s]* ago)/g,"Posté ,il y a $2 heure(s)");
        obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( day[s]* ago)/g,"Posté ,il y a $2 jours(s)");
        obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( month[s]* ago)/g,"Posté ,il y a $2 mois");
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





//---------------------------------------------------
//replace common
//  battle Statistics
//---------------------------------------------------
function doShoutsComm() {
        results = getElements(document, "//b[@style='color: #222']");
        for (var i = 0; i < results.snapshotLength; i++) {
                obj = results.snapshotItem(i);
                if (obj.innerHTML.match("second")) {
                        obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"Il y a $2 seconde(s)");
                } else if (obj.innerHTML.match("minute")) {
                        obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"Il y a $2 minute(s)");
                } else if (obj.innerHTML.match("hour")) {
                        obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"Il y a $2 heure(s)");
                } else if (obj.innerHTML.match("day")) {
                        obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"Il y a $2 jour(s)");
                } else if (obj.innerHTML.match("month")) {
                        obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"Il y a $2 mois");
                } 
        }
//              alert("1-2");
        replaceLinkByHrefSSS("#", {
                "Report":["Report","Signaler"],
                "Delete":["Delete","Supprimer"],
                "Edit":["Edit","Editer"],
                "More shouts":["More shouts","Plus de shout(s)"]
        });
        
        
        replaceInputByValue({
                "Report":["Report","Signaler"],
                "Delete":["Delete","Supprimer"],
                "Edit":["Edit","Editer"]
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
        tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"Niveau: ");
        //      tmp.innerHTML=tmp.innerHTML.replace(/(XP:)/,"???:");
        tmp = allElements.children[7];
        tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"Rang:");
        tmp = allElements.children[10];
        tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Prochain:");
        tmp = allElements.childNodes[25];
        tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Skill:");
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
        
        //?? ?? ????
        replaceLinkByHref(sideLink2Replacements);
        //?? ??
        replaceLinkByID(sideLink3Replacements);
        //??-2 ??-2
        replaceInputByID(sideLink4Replacements);
        //?? ?? ?? ??
        replaceSpanByClass(sideLink1Replacements);
        

        results = getElements(document, "//option[@value]");
//      alert(results.snapshotLength);
        for (var i = 0; i < results.snapshotLength; i++) {
                obj = results.snapshotItem(i);
                if (obj.innerHTML.match("Current")) {
                        obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"Round en cours");
                } else if (obj.innerHTML.match("Round ")) {
                        obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"Round $2 ");
                } else if (obj.innerHTML.match("Food ")) {
                        obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Catégorie nourriture");
                } else if (obj.innerHTML.match("Gift ")) {
                        obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Catégorie cadeau");
                } else if (obj.innerHTML.match("Unarmed ")) {
                        obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"sans arme (");
                } else if (obj.innerHTML.match("Any quality")) {
                        obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"Toute");
                }
        }
}

//============================================================================
//Homepage
//============================================================================
function doHP() {
        //hp title
//      allElements = document.getElementById('contentRow');
        replaceInnerHTML(getElements(document, "//div[@class='rightTabGrey']"), hpTitleReplacements);
        
        //index tabs
        replaceLinkByHref(hpTabsReplacements);
        
        //Articles content
        for (kk in hpContentArticlesReplacements) {
                allElements = document.getElementById(kk);
                replacNewspaperTimeWithAuthor(allElements);
//              allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( minute[s]* ago by)/g,"??? $2 ??? ");
//              allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( hour[s]* ago by)/g,"??? $2 ??? ");
//              allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( day[s]* ago by)/g,"??? $2 ?? ");
//              allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( month[s]* ago by)/g,"??? $2 ?? ");
        }
        
//      alert(1);
        //Shouts content
//      for (kk in hpContentShoutsReplacements) {
//              allElements = document.getElementById(kk);
//              allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"??? $2 ???");
//              allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"??? $2 ???");
//              allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"??? $2 ??");
//              allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"??? $2 ??");
                
//      }
        
//      alert(2);
        replaceAlliesLink();
        replaceAlliesLink2();
        replaceAlliesLinksss();
        
        replaceLinkSSS({
                "Show more battles":["Show more battles","Afficher plus de batailles"],
                "Subsidies informations":["Subsidies informations","Pas de bataille subventionnée"]
        });
        //Battles content
        for (kk in hpContentBattlesReplacements) {
                allElements = document.getElementById(kk);
                
                //"No subsidized battles":["No subsidized battles","?????"],
                if (allElements.innerHTML.match("No subsidized battles")) {
                        allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"Pas de bataille subventionnée");
                }
                
                
//              replaceBattleInfo(allElements);
                
                //replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more battles":["Show more battles","??????"] });
//              allElements.innerHTML=allElements.innerHTML.replace(/(Show more battles)/g,"??????");
//              allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"?????");
//              allElements.innerHTML=allElements.innerHTML.replace(/(Subsidies informations)/,"?????????");
                
        }
        
        allElements = document.getElementById('contentRow').children[2].children[0];
        if (allElements.innerHTML.match("Your military unit orders:")) {
                tmp = allElements.children[0];
                tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"La consigne de votre Military unit :");
                tmp = allElements.children[3];
                tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Combattre pour:");
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
                allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"La population $2 de $4 $5 a débuté la résistance");
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
        allDivs.snapshotItem(0).value="Envoyer"
        //Send to channels: 
        if (isFF) {
                allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Envoyer à :");
        } else {
                allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Envoyer à :");
        }
        // - Country  -  Military Unit - Friends 
        allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," Pays | $2  Military unit | $4 Amis");
        //Characters remaining: 100
        //alert(allElements.innerHTML);
        //allElements.innerHTML=allElements.innerHTML.replace(/(Characters remaining:)/,"???????:");
        //alert(allElements.innerHTML);
        
        doShoutsComm();
        
        replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Plus de shout(s)"] });
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
        tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Offres d'emploi");
        
        tmp = allElements.children[2];
        tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Critéres de sélection:");
        tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Pays:");
        tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Skill:");
        
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
        
        
//      tmp = allElements.children[4];
        
        if (allElements.innerHTML.match(/You have no job^\./)) {
                xxx = document.getElementById('command').parentNode.children[0];
                xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"Vous n'avez pas d'emploi");
                replaceInputByValue({"Get a job now!":["Get a job now!","Trouvez vous un emploi!"]});
        } else if (allElements.innerHTML.match("Your workplace")) {
                idxoffset = 0;
                if (allElements.innerHTML.match("stay in a country")) {
                        tmp = allElements.children[1];
                        tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"Vous devez être dans le pays, où la compagnie est installée pour travailler. ");
                        idxoffset = 2;
                }
                
                tmp = allElements.children[1+idxoffset];
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
//Product Markets
//============================================================================
function doProductMarkets() {
        rr = {
                "1":["Any","Tout"],
                "2":["Iron","Iron"],
                "3":["Grain","Grain"],
                "4":["Oil","Oil"],
                "5":["Stone","Stone"],
                "6":["Wood","Wood"],
                "7":["Diam.","Diam."],
                "8":["Weap.","Weap."],
                "9":["House","House"],
                "10":["Gift","Gift"],
                "11":["Food","Food"],
                "12":["Ticket","Ticket"],
                "13":["DS","DS"],
                "14":["Hosp.","Hosp."]
        };
        
        var allElements;
        allElements = document.getElementById('contentRow').children[1];
        
        var tmp;
        tmp = allElements.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"Marché des produits");
        
        tmp = allElements.children[2];
        tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Montrer Offres:");
        tmp.innerHTML=tmp.innerHTML.replace("Country:","Pays:");
        tmp.innerHTML=tmp.innerHTML.replace("Quality:","Qualité:");
        
        replaceInputByValue({"View offers":["View offers","Voir offre"],"Buy":["Buy","Acheter"]});
        
        results = getElements(document, "//label[@for]");
//      alert(results.snapshotLength);
//      alert(results.snapshotItem(0).htmlFor);
        for (var i = 0; i < results.snapshotLength; i++) {
                obj = results.snapshotItem(i);
//              alert(obj.htmlFor);
                
                if (obj.htmlFor.match("resource")) {
                        idx = obj.htmlFor.substring(8,obj.htmlFor.length);
//                      alert(obj.innerHTML);
                        obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
                }
        }
        replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Montrer mes offres / Poster nouvelle offre"]})
        
        tmp = allElements.children[5];
        tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produit");
        tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Vendeur");
        tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"Stock");
        tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Prix");
        tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Acheter");
        tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," objets ");
        
        replaceLinkByHref({
                "citizenMarketOffers.html":["Show my offers/post new offer","Montrer mes offres / Poster nouvelle offre"],
                "http://wiki.e-sim.org/en/Category:Products":["Products info","Produits informations"]
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
        tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"Entrainement militaire");
        
        tmp = allElements.children[1];
        var rowoffset = 0;
        //not train
        if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
                replaceInputByValue({"Train":["Train","S'entrainer"]});
                tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Entrainement effectué. Revenez demain svp");
                rowoffset = 2;
        //already trained
        } else if (tmp.innerHTML.match("You have already trained today^\.")) {
                tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Vous vous êtes déjà entrainé aujourd'hui!");
                rowoffset = 2;
        }
        
        tmp = allElements.children[1+rowoffset];
        tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Vous vous êtes déjà entrainé aujourd'hui. Revenez demain svp");
        tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Force gagnée:");
        
        tmp = allElements.children[4+rowoffset];
        tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Détails Militaires");
        tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Nombre d'entrainements suivis:");
        tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Force:");
        tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Grade Militaire:");
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
        
        allElements = document.getElementById('battlesTable');
        tmp = allElements.children[0].children[0];
//      alert(tmp.innerHTML);
        tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Début");
        tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Bataille");
        tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"defenseur vs attaquant");
        tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Score");
        tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Total de dommages infligés");
        
        tmp = allElements.children[0];
//      alert(tmp.children.length);
        
        for (i = 1; i < tmp.children.length; i++) {
                obj = tmp.children[i].children[3];
                replaceBattleTime(obj);
        }
//      replaceBattleInfo(tmp);
//      replaceBattleTime(tmp);

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
//      var allElements;
//      allElements = document.getElementById('contentRow').children[1];
        allElements = document.getElementById('battleBar').parentNode;
        
//      tmp = allElements.children[1].children[0].children[2];
        tmp = allElements.children[2];
        tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Guerre de Résistance");
        tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"Lancée par");
        
        tmp = allElements.children[4];
        replaceNoAlliesComm(allElements.children[4]);
        replaceNoAlliesComm(allElements.children[7]);
//      alert(allElements.children[7].innerHTML);
        replaceAlliesLink();
        
        tmp = allElements.children[6].children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Round $2");
        
        tmp = allElements.children[11];
        tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Rounds remportés par la défense");
        tmp = allElements.children[12];
        tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Rounds remportés par l'attaque");       

        //+++++++++++++++++++++++++++++++++++++++++++++++++++
        //???? Top3
        //+++++++++++++++++++++++++++++++++++++++++++++++++++
        tmp = document.getElementById('topDefender1').parentNode.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"Top défense");
        tmp = document.getElementById('topAttacker1').parentNode.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"Top attaque");
        
        //+++++++++++++++++++++++++++++++++++++++++++++++++++
        //????
        //+++++++++++++++++++++++++++++++++++++++++++++++++++
        
//      tmp = allElements.children[3];
        allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];
//      alert(allElements.innerHTML);
        //?? ???????
        //?? ???????
        //????
        //????
        //????

        if (allElements.innerHTML.match("occupant country to")) {
                allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Vous ne pouvez pas vous battre dans cette bataille depuis votre lieu actuel");
                allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"Vous devez vous déplacer dans le pays occupant pour participer à la bataille");
        } else if (allElements.innerHTML.match("countries participating")) {
                allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Vous ne pouvez pas vous battre dans cette bataille depuis votre lieu actuel");
                allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"Vous devez vous déplacer dans un des pays participant à la bataille");
        } else if (allElements.innerHTML.match("was won by")) {
                allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"Ce round a été remporté par :");
        } else {
//              if (isFF) {
//                      //fight button
//                      replaceInputByClassSSS("fightButton", 
//                              {
//                                      "1 hit":["Fight (1 hit)","????"],
//                                      "5 hits":["Berserk! (5 hits)","????! (5??)"]
//                              }
//                      );
//              }
                
                //text
                tmp = allElements.children[1];
                tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Selectionner arme:");
                tmp = allElements.children[5];
                tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Selectionner votre coté:");
                tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"Vous combattez pour:");
        }
        
        
        //????
        if (isFF) {
                allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"Afficher round:");
        }
        replaceInputByValue({"Show round":["Show round","Afficher"]});
        
//      tmp.innerHTML=tmp.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"??????????????,");
//      tmp.innerHTML=tmp.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"???????????????????????????");
//      tmp.innerHTML=tmp.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"???????????????????????????");
//      tmp.innerHTML=tmp.innerHTML.replace(/(Show round:)/,"????????:");
//      tmp.innerHTML=tmp.innerHTML.replace(/(Current round)/,"?????");
//      tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/g,"? $2 ??");
//      replaceInputByValue({"Show round":["Show round","??????"]});
//      tmp.innerHTML=tmp.innerHTML.replace(/(This round was won by:)/g,"???????:");
//      
//      tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"????:");
//      tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"????:");
//      tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"????:");
//      tmp.innerHTML=tmp.innerHTML.replace(/(Fight (1 hit))/,"????");
//      tmp.innerHTML=tmp.innerHTML.replace(/(Berserk! (5 hits))/,"????! (5??)");
//      replaceInputByValue({"Fight (1 hit)":["Fight (1 hit)","????"],"Berserk! (5 hits)":["Berserk! (5 hits)","????! (5??)"]});
        
        //+++++++++++++++++++++++++++++++++++++++++++++++++++
        //????
        //+++++++++++++++++++++++++++++++++++++++++++++++++++
        tmp = document.getElementById('contentRow').children[1].children[4];
        replaceBattleStatistics(tmp);
        tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Afficher les statistiques de toute la bataille");
        tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Tutoriel de combat sur le wiki");
        tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Fonctionnement batailles");
        
//      allElements = document.getElementById('fightStatus');
//      tmp = allElements.children[0];
//      tmp.innerHTML=tmp.innerHTML.replace(/(Waiting for results...)/,"??????:");
//      tmp = allElements.children[1];
//      tmp.innerHTML=tmp.innerHTML.replace(/(Damage done:)/,"????:");
//      tmp.innerHTML=tmp.innerHTML.replace(/(XP gained:)/,"?????:");
//      tmp.innerHTML=tmp.innerHTML.replace(/(Health:)/,"??:");
//      tmp.innerHTML=tmp.innerHTML.replace(/(Location bonus:)/,"????:");
//      tmp.innerHTML=tmp.innerHTML.replace(/(Fight bonuses)/,"??????");
//      tmp.innerHTML=tmp.innerHTML.replace(/(Your total damage:)/,"????:");
//      tmp.innerHTML=tmp.innerHTML.replace(/(Damage required for next rank:)/,"????????:");
//      tmp.innerHTML=tmp.innerHTML.replace(/(Your health:)/,"????:");
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
//Profile
//============================================================================
function doProfile() {
        allElements = document.getElementById('contentRow').children[1];
        
        //name
        tmp = allElements.children[0].children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/Citizen /,"Citoyens ");
        //on-off line
        tmp = allElements.children[0].children[1];
        if (tmp.innerHTML.match("Online")) {
                tmp.innerHTML=tmp.innerHTML.replace(/Online/,"En Ligne");
        } else {
                tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"Hors-Ligne");
        }
        
        replaceLinkByHrefSSS("editCitizen.html", {
                "Edit profile":["Edit profile","Editer profil"]
        });
        replaceLinkByHrefSSS("#", {
                "Report multi":["Report multi","Signaler Multi"]
        });
        replaceInputByValue({"Report multi":["Report multi","Signaler Multi"]});

//      results = getElements(document, "//table[@class='attributesTable']");
//      if (results.snapshotLength > 0) {
//              obj = results.snapshotItem(0);
//              obj.innerHTML=obj.innerHTML.replace(/Level:/,"??:");
//              obj.innerHTML=obj.innerHTML.replace(/XP:/,"???:");
//              obj.innerHTML=obj.innerHTML.replace(/Damage:/,"????:");
//              obj.innerHTML=obj.innerHTML.replace(/Rank:/,"??:");
//              obj.innerHTML=obj.innerHTML.replace(/Economy skill:/,"????:");
//              obj.innerHTML=obj.innerHTML.replace(/Strength:/,"??:");
//              obj.innerHTML=obj.innerHTML.replace(/location:/,"???:");
//              obj.innerHTML=obj.innerHTML.replace(/Citizenship:/,"??:");
//      }

        
        allElements = allElements.children[2].children[0].children[0];
        tmp = allElements.children[0].children[0];
        rowoffset = 0;
        if (tmp.innerHTML.match("Permanently")) {
                rowoffset = 2;
                tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"Bannisement permanent");
                tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"Raison:");
                tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Bannis par :");
        }
        
//      alert(allElements.innerHTML);
        tmp = allElements.children[0].children[2+rowoffset];
//      alert(tmp.innerHTML);
        tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Niveau:");
        tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"Xp:");
        tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Dommage:");
        tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"Rang:");
        tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Skill:");
        tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"Force:");
        tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Localisation:");
        tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Nationalité:");
        tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"Naissance:");
        
        tmp = allElements.children[0].children[5+rowoffset];
        tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Military unit:");
        tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Parti:");
        tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Journal:");
        tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"Travail pour:");
        tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"Propriétaire d'entreprise");
        tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Bureau politique:");
        //no
        tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Pas military unit");
        tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Pas de parti");
        tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Pas de journal");
        tmp.innerHTML=tmp.innerHTML.replace(/No work/,"Pas de travail");
        tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"Pas de compagnie");
        tmp.innerHTML=tmp.innerHTML.replace(/No office/,"Pas de bureau");
        
//      allElements = document.getElementById('contentRow').children[2];
//      tmp = allElements.children[0].children[0];
        allElements = getElements(document, "//ul[@style]");
//      alert(allElements.snapshotLength);
        
        rowoffset = 0;
        if (allElements.snapshotLength > 0) {
                tmp = allElements.snapshotItem(0).parentNode;
                if (tmp.innerHTML.match("Active debts")) {
                        rowoffset = 2;
                        tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"Dette(s) à payer");
                        //tmp.innerHTML=tmp.innerHTML.replace(/(payback time )(\d*)( game day)/,"Remboursement $2 jours de jeu");
                        tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g," avant le ");
                        tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( game day)/g," $1.");
                }
        }
        
        allElements = document.getElementById('medals');
        tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"Amis");
        
//      alert(allElements.snapshotItem(0).parentNode.children[0].innerHTML);
        
        
        allElements = document.getElementById('countryShouts');
        allElements.parentNode.children[0].innerHTML=allElements.parentNode.children[0].innerHTML.replace(/Shouts:/,"Messages:");
        
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
        tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Nouveau mot de passe:");
        tmp = allElements.children[8];
        tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Confirmer le mot de passe:");
        tmp = allElements.children[12];
        tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"Ancien Mot de passe :");
        tmp = allElements.children[16];
        tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Nouvel avatar:");
        tmp = allElements.childNodes[30];
        tmp.nodeValue=tmp.nodeValue.replace("max. size","Taille max. :");
        
        replaceInputByValue({"Edit citizen":["Edit citizen","Editer citoyen"]});
}

//============================================================================
//Travel
//============================================================================
function doTravel() {
        allElements = document.getElementById('contentRow').children[1];
        
        tmp = allElements.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"Déplacement");
        
        allElements = document.getElementById('citizenTravelForm');
        tmp = allElements.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Pays");
        tmp = allElements.children[4];
        tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"Région:");
        tmp = allElements.children[8];
        tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"Qualité ticket:");
        
        replaceInputByValue({"Travel":["Travel","Se déplacer"]});
        
        replaceLinkByHref({
                "http://wiki.e-sim.org/index.php/Traveling/France":["Traveling tutorial on wiki","Déplacement :tutoriel sur le Wiki"]
        });
}


//============================================================================
//Inbox Messages
//============================================================================
function doMessagesComm() {
        allElements = document.getElementById('contentRow').children[1];
        tmp = allElements.children[1];
        tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"Message de ");
        allElements = document.getElementById('inboxTable').children[0];
        
        tmp = allElements.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Auteur");
        tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Message");
        tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Date");
        tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Supprimer");
        tmp.innerHTML=tmp.innerHTML.replace(/To/,"à");
        
        tmp = allElements;
        for (i = 1; i < tmp.children.length - 1; i++) {
                replaceBattleTime(tmp.children[i].children[2]);
//              alert(i);
        }
}

function doInboxMessages() {
        doMessagesComm();

        replaceLinkByHref({
                "sentMessages.html":["Sent messages","Envoyer messages"],
                "composeMessage.html":["Compose message",""]
        });
        replaceInputByValue({
                "Delete":["Delete","Supprimer"],
                "Quick reply":["Quick reply","Réponse rapide"],
                "Report":["Report","Signaler"]
        });
        replaceLinkByHrefSSS("#", {
                "Report":["Report","Signaler"],
                "Quick reply":["Quick reply","Réponse rapide"]
        });
        replaceHerf(getElements(document, "//a[@href]"), {
                "composeMessage.html":["Reply","Répondre"],
                "conversation.html":["Previous messages","Message précédent"]
        });
        
}

//============================================================================
//Sent Messages
//============================================================================
function doSentMessages() {
        doMessagesComm();
//
        replaceLinkByHref({
                "inboxMessages.html":["Messages Reçus",""],
                "composeMessage.html":["Compose Message","Ecrire un message"]
        });
}

//============================================================================
//Compose Message
//============================================================================
function doComposeMessage() {
        allElements = document.getElementById('contentRow').children[1];
        
        tmp = allElements.children[1];
        tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Nouveau message");

        replaceLinkByHref({
                "inboxMessages.html":["Inbox messages","Boîte de réception"],
                "sentMessages.html":["Sent messages","Messages envoyés"]
        });
        
        allElements = document.getElementById('sendMessageForm');
        tmp = allElements.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Destinataire:");
        tmp = allElements.children[2];
        tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Titre:");
        tmp = allElements.children[6];
        tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Message :");
        
        replaceInputByValue({
                "Send":["Send","Envoyer"],
                "Preview":["Preview","Prévisualiser"]
        });
}


//============================================================================
//Subscriptions
//============================================================================
function doSubs() {
        allElements = document.getElementById('contentRow').children[1];
        tmp = allElements.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"Abonnements");
        
        results = getElements(document, "//table[@class='dataTable']");
        if (results.snapshotLength > 0) {
                obj = results.snapshotItem(0);
                
                obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"Abonnements");
                
                replacNewspaperTime(obj);
        }

        replaceLinkByHref({
                "subscribedNewspapers.html":["List of subscribed newspapers","Liste des journaux abonnés"]
        });
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
        allElements = document.getElementById('contentRow').children[1];
        tmp = allElements.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Journaux abonnés");
        
        results = getElements(document, "//table[@class='dataTable']");
        if (results.snapshotLength > 0) {
                allElements = results.snapshotItem(0).children[0];
                
                tmp = allElements.children[0];
                tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Total<br>des abonnès");
                tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Journal");
                tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"????");
                
                tmp = allElements;
                for (i = 1; i < tmp.children.length - 1; i++) {
                        replaceBattleTime(tmp.children[i].children[2]);
                }
        }
        
        replaceLinkByHref({
                "http://wiki.e-sim.org/index.php/Newspaper/France":["Newspaper tutorial on wiki","Journal :tutoriel sur le wiki"]
        });
}

//============================================================================
//Newspaper
//============================================================================
function doNewspaper() {
        allElements = document.getElementById('contentRow').children[1];
        tmp = allElements.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Journal");
        
        results = getElements(document, "//table[@class='dataTable']");
        if (results.snapshotLength > 0) {
                allElements = results.snapshotItem(0).children[0];
                
                tmp = allElements.children[0];
                tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"Articles récents");
                replacNewspaperTime(allElements);
        }
        
        replaceLinkByHref({
                "editNewspaper.html":["Edit newspaper","Editer journal"],
                "http://wiki.e-sim.org/index.php/Newspaper/France":["Newspaper tutorial on wiki","Journal :tutoriel sur le wiki"]
        });
        replaceInputByValue({
                "Publish":["Publish","Publier"],
                "Preview":["Preview","Prévisualiser"]
        });
        
        //my newspaper
        allElements = document.getElementById('writeArticleForm');
        if (allElements) {
                tmp = allElements.parentNode.children[0];
                tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Ecrire un nouvel article");
                tmp = allElements.children[0];
                tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Publier dans le pays");
                tmp = allElements.children[4];
                tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Titre de l'article:");
                tmp = allElements.children[10];
                tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Message:");
                tmp = allElements.children[allElements.children.length-1];
                tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"SVP , faites une sauvegarde de votre article sur votre disque dur avant de l'envoyer!!!!");
        }
}

//============================================================================
//Edit Newspaper
//============================================================================
function doNewspaperEdit() {
        allElements = document.getElementById('editNewspaperForm');
        
        tmp = allElements.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Nom du journal:");
        tmp = allElements.children[4];
        tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Nouveau avatar:");
        tmp = allElements.childNodes[9];
        tmp.nodeValue=tmp.nodeValue.replace("max. size","poids maximun :");
        
        replaceLinkByHref({
                "editNewspaper.html":["Edit newspaper","Editer Journal"]
        });
        replaceInputByValue({
                "Delete":["Edit newspaper","Editer Journal"]
        });
}

//============================================================================
//Article
//============================================================================
function doArticle() {
        allElements = document.getElementById('contentRow').children[1];
        tmp = allElements.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/Article/,"Article");
        
        replaceHerf(getElements(document, "//a[@href]"), {
                "editArticle.html":["Edit article","Editer article"]
        });
        replaceLinkByHref({
                "editNewspaper.html":["Edit newspaper","Editer Journal"]
        });
        replaceLinkByHrefSSS("#", {
                "Report":["Report","Signaler"],
                "Edit":["Edit","Editer"],
                "Delete":["Delete","Supprimer"]
        });
        replaceInputByValue({
                "Publish":["Publish","Publier"],
                "Report":["Report","signaler"],
                "Edit":["Edit","Editer"],
                "Delete":["Delete","Supprimer"]
        });
        
        allElements = document.getElementById('command');
        tmp = allElements.parentNode.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Nouveau commentaire");
        
        tmp = allElements.children[1];
        tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Message:");
}

//============================================================================
//Edit Article
//============================================================================
function doArticleEdit() {
        allElements = document.getElementById('contentRow').children[1];
        tmp = allElements.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Journal");
        
        allElements = document.getElementById('command');
        tmp = allElements.parentNode.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Editer");
        tmp = allElements.children[1];
        tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Titre de l'article:");
        tmp = allElements.children[6];
        tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Message:");
        
        replaceLinkByHref({
                "editNewspaper.html":["Edit newspaper","Editer journal"],
                "http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Journal tutoriel sur le wiki"]
        });
        replaceInputByValue({
                "Edit article":["Edit article","Editer journal"]
        });
}

//============================================================================
//Contracts List
//============================================================================
function doContractsList() {
        allElements = document.getElementById('contentRow').children[1];
        tmp = allElements.children[0];
        tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Contrats");
        
        tmp = allElements.children[2].children[4];
        tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Modèle");
        tmp = allElements.children[4];
        tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Contrats proposés(20 derniers)");
        tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"offert à");
        tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Pas de contrats");
        tmp = allElements.children[6];
        tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","Contrats acceptés (20 derniers)");
        tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"offert à");
        tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Pas de contrats");
        tmp = allElements.children[8];
        tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Contrats refusés");
        tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Refuser par $1");
        tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Pas de contrats");
        tmp = allElements.children[10];
        tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","Contrats échoués");
        tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Pas de contrats");
        tmp = allElements.children[12];
        tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Votre prêts actifs");
        tmp.innerHTML=tmp.innerHTML.replace("Borrower","Emprunteur");
        tmp.innerHTML=tmp.innerHTML.replace("Payback time","Echéance remboursement");
        tmp.innerHTML=tmp.innerHTML.replace("Sum","Montant");
        tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Annuler dette");
        tmp.innerHTML=tmp.innerHTML.replace("No loans","Pas de prêts");
        tmp = allElements.children[14];
        tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Vos dettes actives ");
        tmp.innerHTML=tmp.innerHTML.replace("Lender","Prêteur");
        tmp.innerHTML=tmp.innerHTML.replace("Payback time","Echéance remboursement");
        tmp.innerHTML=tmp.innerHTML.replace("Sum","Montant");
        tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Payer la dette");
        tmp.innerHTML=tmp.innerHTML.replace("No debt","Pas de dette");
        
        
        allElements = document.getElementById('command');
        tmp = allElements.children[0];
        tmp.innerHTML=tmp.innerHTML.replace("Template name:","Nom du modéle:");
        
//      allElements = document.getElementById('command');
//      tmp = allElements.parentNode.children[0];
//      tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"????");
//      tmp = allElements.children[1];
//      tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"????:");
//      tmp = allElements.children[6];
//      tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"??:");
        
        replaceLinkByHref({
                "http://wiki.e-sim.org/en/Contracts":["Contract tutorial","Contrat tutoriel"],
                "#":["Create new template","Créer nouveau modéle"]
        });
        replaceInputByValue({
                "Delete":["Delete","Supprimer"],
                "Create template":["Create template","Créer modéle"]
        });
        
//      objs = getElements(document, "//input[@value='Delete']");
//      for (var i = 0; i < objs.snapshotLength; i++) {
//              obj = objs.snapshotItem(i);
////            obj.value = obj.value.replace("Delete", "??");
//              if(i==0){alert(obj.getAttributeNS("contracts.html","getAttributeNS"));}
//      }
}

//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
        if (kbn==1) {
                obj.innerHTML=obj.innerHTML.replace(/(>[\w ]* )obligations:</,"$1 obligation(s):<");
        } else {
                if (kbn==2) {
                        obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations:/,"Citoyen par défaut obligation:")
                        obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/g,"Citoyen par défaut");
                } else {
                        obj.innerHTML=obj.innerHTML.replace(/(>[\w ]* )obligations:</,"$1 obligation(s):<")
                }
        }
        
        obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products:/," donne directement les produits suivants:");
        obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money:/," donne directement la somme en argent suivants::");
        obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt:/," sera chargé de la dette suivante :");
        obj.innerHTML=obj.innerHTML.replace(
                /must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
                "doit être payé avant le $1$3$5 éme jour de jeu ($6 jour(s) après la signature du contrat) à"
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
        tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Contrats");
        allElements = allElements.children[1];
        tmp = allElements.children[4];
        tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"Contrat");
        tmp = allElements.children[6];
        tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"Status contrat: ");
        tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"Accepté");
        tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"Rejeté par $1 ");
        tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"Echec");
        tmp.innerHTML=tmp.innerHTML.replace(/Template/,"Modéle");
        
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
                tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"Ajouté un nouveau élément au contrat");
                
                allElements = document.getElementById('contractsForm');
                tmp = allElements.children[3];
                tmp.innerHTML=tmp.innerHTML.replace(/Side/,"Pour");
                tmp = allElements.children[7];
                tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"Catégorie d'objet");
                
                allElements = document.getElementById('offererSide');
                tmp = allElements.children[1];
                tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Citoyen par défaut");
                
                //money
                allElements = document.getElementById('itemTypeList');
                replaceOptionTxt(allElements, {
                        "Money":["Money","Argent"],
                        "Product":["Product","Produits"],
                        "Debt":["Debt","Dette"]
                });
                
                allElements = document.getElementById('MONEYParameters');
                tmp = allElements.children[0].childNodes[0];
                tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Argent en ( ");
                
                //Product
                allElements = document.getElementById('PRODUCTParameters');
                tmp = allElements.children[0];
                tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"Quantité de produit:");
                tmp = allElements.children[2];
                tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"Type de produit:");
                tmp = allElements.children[5];
                tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Qualité produit:");
                
                allElements = document.getElementById('resource');
                replaceOptionTxt(allElements, {
                        "Iron":["Iron","Iron"],
                        "Grain":["Grain","Grain"],
                        "Oil":["Oil","Oil"],
                        "Stone":["Stone","Stone"],
                        "Wood":["Wood","Wood"],
                        "Diamonds":["Diamonds","Diamonds"],
                        "Weapon":["Weapon","Weapon"],
                        "House":["House","House"],
                        "Gift":["Gift","Gift"],
                        "Food":["Food","Food"],
                        "Ticket":["Ticket","Ticket"],
                        "Defense System":["Defense System","Defense System"],
                        "Hospital":["Hospital","Hospital"]
                });
                
                //Debt
                allElements = document.getElementById('DEBTParameters');
                tmp = allElements.children[1];
                tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"Dette");
                tmp = allElements.children[3].childNodes[0];
                tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Argent en( ");
                tmp = allElements.children[5];
                tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"Echéance remboursement:");
                tmp = allElements.children[5];
                tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Qualité produit:");
                
                //propose
                allElements = document.getElementById('contentRow').children[1].children[5];
                tmp = allElements.children[0];
                tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"Proposer contrat");
                tmp = allElements.children[2].children[3];
                tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Proposer à");
                tmp = allElements.children[5];
                tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"Note:");
                tmp = allElements.childNodes[12];
                tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"vous ne pouvez proposer des contrats qu'à vos amis");
        }
        
        replaceLinkByHref({
                "profile.html?id=0":["Dummy citizen","Citoyen par défaut"],
                "contracts.html":["Go back to contract list","Retour à la liste des contrats"]
        });
        replaceInputByValue({
                "Delete":["Delete","Supprimer"],
                "Propose":["Propose","Proposer"],
                "Add item":["Add item","Ajouter objets"]
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