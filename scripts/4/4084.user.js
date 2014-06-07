// Naltrexone's KoL Scripts
// 
// ==UserScript==
// @name           Naltrexone's KoL Scripts - MonsterStats
// @namespace      http://batmantis.com/kol
// @include        *kingdomofloathing.com/fight.php*
// @include        *kingdomofloathing.com/main.php*
// @include        *kingdomofloathing.com/charpane.php*
// @include        *kingdomofloathing.com/inventory.php*
// @include        *kingdomofloathing.com/familiar.php*
// @include        *kingdomofloathing.com/barrel.php*
// @include        *127.0.0.1:600*/fight.php*
// @include        *127.0.0.1:600*/main.php*
// @include        *127.0.0.1:600*/charpane.php*
// @include        *127.0.0.1:600*/inventory.php*
// @include        *127.0.0.1:600*/familiar.php*
// @include        *127.0.0.1:600*/barrel.php*
// @description    Version 2.4
// 
// ==/UserScript==


/********************************** Recent Changes **********************************************
Recent Updates:

IMPORTANT!IMPORTANT!IMPORTANT!IMPORTANT!IMPORTANT!IMPORTANT!IMPORTANT!IMPORTANT!
*************************************************************************************************
*** If you get "double" stat boxes, GreaseMonkey has installed two copies of the script.  Go to *
*** Tools->Manage User Scripts and uninstall the OLDER version.  Sorry for the inconvenience!   *
*************************************************************************************************
IMPORTANT!IMPORTANT!IMPORTANT!IMPORTANT!IMPORTANT!IMPORTANT!IMPORTANT!IMPORTANT!           

2.4 Handles multiple Rings of Aggravate Monster correctly.
    Meat drop data and some item drop data from Ragnok / Subjunctive.
    Differentiated support for Elemental Attack vs Defense in Kittiwake's data.
    Detects HP impact of Mosquito "suck" attack.
    Detects Boss Bat's MP->HP suck attack. (Adds HP to Boss Bat based on MP sucked.)
    Moved monsterstats box to the end of the tab order.
    Lots of code cleanup.
2.3 Better handling for simultaneously logged-in mulis
    Round counter
    Support for kolmafia relay browser (per macman104)
   
********************************************************************************************/
GM_setValue("scriptVer","2.4");
GM_setValue("scriptName","MonsterStats");
GM_setValue("scriptURL","http://batmantis.com/kol/MonsterStats.user.js");

const wikiWrapperPre = '<font size=1>&nbsp;<sup><a tabindex="-1" href="http://kol.coldfront.net/thekolwiki/index.php/';
const wikiWrapperPost = '" TARGET="_blank">w</a></sup></font>&nbsp;';      

const elementalTypes = [["HOT","<font color=red>Hot</font>"],["FIRE","<font color=red>Hot</font>"],["COLD","<font color=blue>Cold</font>"],["SLEAZE","<font color=pink>Sleaze</font>"],["SLEAZY","<font color=pink>Sleaze</font>"],["STENCH","<font color=green>Stench</font>"],["STINKY","<font color=gren>Stench</font>"],["SPOOKY","<font color=grey>Spooky</font>"]];


const itemMLModifiers = [["hockey stick of furious angry rage",30],["stainless steel scarf",20],["ice sickle",15],["hippo whip",10],["giant needle",5],["annoying pitchfork",5],["goth kid t-shirt",5],["ring of aggravate monster",5]];

// NOTE:  ALL of the delevelers below are still works-in-progress and aren't fully (if at all) supported.  They're very high on the to-do list, though.
// TODO:  GPOaS (delevels difficult, perhaps impossible to track accurately), Personal Raincloud (like I have one with which to test), Spooky Pirate Skeleton "Arr" Attack.
// Familiar Attack Delevelers format: [[familiar name, text to match, weight divisor to get levels dropped],[familiar name 2...
const familiarAttackDelevelers = [["Ninja Pirate Zombie Robot","and bites him on the head",2],["Cocoabo","runs in a circle around your opponent",4],["Barrrnacle","latches onto him and slows him down",4]];
// combatMLModifiers format: [[item name, text to match, minDelevel, maxDelevel],[item name 2...
//const combatMLModifiers = [
const discoBanditDelevelers = [["Disco Eye-Poke", 1, "You poke your opponent in the eye."],["Disco Dance of Doom",3,"You disco dance all up out the joint."],["Disco Dance II: Electric Boogaloo",5,"You bust an extremely adept disco move"],["Disco Face Stab",7,"Needless to say, this throws"]];
// weaponStrikeDelevelers
const weaponStrikeDelevelers = ["7-Foot Dwarven mattock","yak whip", "Unionize The Elves sign"];
// AtkDelevelers
//const atkOnlyDelevelers = [["spider web",3,""],["Cloaca grenade",2,""],[Dyspepsi grenade,2,""]];


function wikify(EntryName)
{
  return wikiWrapperPre + EntryName + wikiWrapperPost;
}

function getCookieValue(cookieName) {
	var rawCookies = document.cookie;
	var cookieBase = cookieName + "=";
	// See if it's any stored cookie for this page other than the first
	var cookieStartIndex = rawCookies.indexOf("; " + cookieBase);
	if (cookieStartIndex == -1) {	
	    // It wasn't, so check to see if it's the first cookie.
	    cookieStartIndex = rawCookies.indexOf(cookieBase);	
	    if (cookieStartIndex != 0) 
	      return null;
	} else {
	   cookieStartIndex = cookieStartIndex + 2;
	}
	   
	// Find the beginning of the next cookie after the requested one, if there is one
	var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex);
	if (cookieEndIndex == -1) {
	  // Must have been the last cookie, so go for the gusto.
	    cookieEndIndex = rawCookies.length;
	}
        return unescape(rawCookies.substring(cookieStartIndex + cookieName.length+1, cookieEndIndex));
};

function updateScriptBox() {
  if (needUpdate) {
    mainPageBody.innerHTML = addedHTML + '</table></center>' + oldHTML;
  } 
// Only adding the box if there's a problem-- people were complaining about it.
//  else {
//    mainPageBody.innerHTML = oldHTML + addedHTML + '</table></center>';	  	
//  }
}

function trimString(targetString) {
  targetString = targetString.replace( /^\s+/g, "" );
  targetString = targetString.replace( /\s+$/g, "" );
  return targetString;
}

function harvestElements(sourceLine) {
                  var resultText = '';
                  var elementParts = sourceLine.split("<");
                  
                  for (elementIndex in elementParts) {
                    for(elementalIndex in elementalTypes) {
                      if (elementParts[elementIndex].indexOf('ALT=\"' + elementalTypes[elementalIndex] [0]) != -1) {
                      	if (resultText == '') {
                          resultText = elementalTypes[elementalIndex] [1];
                        } else {
                          resultText = resultText + ', ' + elementalTypes[elementalIndex] [1];                        	
                        }
                        
                        if (elementParts[elementIndex].indexOf('(') != -1) {
                          resultText = resultText + ' ' + elementParts[elementIndex].substring(elementParts[elementIndex].indexOf('('),elementParts[elementIndex].indexOf(')')+1);
                        } else { resultText = resultText + ' (TBD%)'; }
                      }
                    }
                  }                               
                  
                  return resultText;
}


function storeMonsterLevelItems(charPageBody) {
  
  var totalLevelModifier = 0;
  var modifierItems = '';
  var charName = GM_getValue('CurCharName-' + location.host,'');
  var lastFoundIndex = -1;
  
  for (itemMLModifierIndex in itemMLModifiers) {  	
  	lastFoundIndex = 0;
  	while (charPageBody.indexOf(itemMLModifiers[itemMLModifierIndex] [0], lastFoundIndex) != -1)	 {
  	  totalLevelModifier = totalLevelModifier + itemMLModifiers[itemMLModifierIndex] [1];
  	  modifierItems = modifierItems + '   ' + itemMLModifiers[itemMLModifierIndex] [0] + ' (+' + itemMLModifiers[itemMLModifierIndex] [1] + ');\\n';
  	  lastFoundIndex = charPageBody.indexOf(itemMLModifiers[itemMLModifierIndex] [0], lastFoundIndex) + 1;
  	}
  }
  
  GM_setValue(charName + '-MLItemsModifier', totalLevelModifier);
  GM_setValue(charName + '-MLItems', modifierItems);  
}

function storeMonsterLevelEffects(charPaneBody) {
  
  var totalLevelModifier = 0;
  var modifierEffects = '';
  var charName = GM_getValue('CurCharName-' + location.host,'');

  if (charPaneBody.indexOf('Ur-Kel\'s Aria of Annoyance') != -1)	 { 	
  	var curLevelModifier = (2 * GM_getValue(charName + '-Level',1));
  	modifierEffects = modifierEffects + '   Ur-Kels Aria of Annoyance (+' + curLevelModifier + ');\\n';
  	totalLevelModifier = totalLevelModifier + curLevelModifier;
  }

  GM_setValue(charName + '-MLEffects', modifierEffects);
  GM_setValue(charName + '-MLEffectsModifier',totalLevelModifier);
}

function checkCharPage() {
	GM_xmlhttpRequest({
	  method: 'GET',
	  url: 'http://'+location.host+'/' + 'charsheet.php',
	  headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html',},
	  onload: function(responseDetails) {
			if (responseDetails.status == "200") {
				storeMonsterLevelItems(responseDetails.responseText);
			}
	  }
	});	
}

function checkForUpdate() {
	// If possible, grab the latest version of this script from Batmantis
	// and see if it's newer than this version.
	GM_xmlhttpRequest({
	  method: 'GET',
	  url: GM_getValue("scriptURL"),
	  headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html',},
	  onload: function(responseDetails) {
			if (responseDetails.status == "200") {
				var strHTML = responseDetails.responseText;
				var newVer = strHTML.match(/description\s*Version \w+\.\w+/);
				if (newVer.length > 0) {
				  newVer[0] = newVer[0].substring(newVer[0].indexOf('Version') + 8);
				  GM_setValue("scriptWebVer",newVer[0]);
				} else {
				  GM_setValue("scriptWebVer","Error");		  
				}
			} else {
	                  GM_setValue("scriptWebVer","Error");		  
			}
	  }
	});
}

// If the player your equipped items or tinkered with your familiars, reparse all the items. 
if ((window.location.pathname == "/inventory.php") || (window.location.pathname == "/familiar.php")) {
  var pageBody = document.getElementsByTagName("body")[0].innerHTML;
  if (pageBody.indexOf("Results:") != -1) {
    checkCharPage();	
  }
}


if (window.location.pathname == "/main.php") {

  var curDate = new Date();
  var oneDay = 1000*2*60*60*24; // one day in milliseconds;
  
  var checkedDateKW = GM_getValue("KW3_Last_Checked", '');
  var checkedDateY = GM_getValue("Y_Last_Checked", '');
  var checkedDateR = GM_getValue("R_Last_Checked", '');

  checkForUpdate();
  var needUpdate = ((GM_getValue("scriptWebVer","Error") != "Error") && ((GM_getValue("scriptWebVer")+0.0) > (GM_getValue("scriptVer") + 0.0)));
  
  if (needUpdate) {
    var boxColor = 'red';	
  } else {
    var boxColor = 'blue';
  }
  
  var mainPageBody= document.getElementsByTagName("body")[0];
  var oldHTML = mainPageBody.innerHTML;
  var addedHTML = '<center><table style="border: 1px solid ' + boxColor + '; margin-bottom: 4px;" width=95% cellpadding=1 cellspacing=0>' +
      '<tr><td bgcolor=' + boxColor + '><font color=white size=-2><b>' + GM_getValue("scriptName") + '</b> Script ' + GM_getValue("scriptVer") + ':</font></td></tr>' +
      '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Installed and active.</font></td></tr>';
  if (GM_getValue("scriptWebVer","Error") == "Error") {
    addedHTML = addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Failed to check website for updated version of script.</font></td></tr>';	
    updateScriptBox();
  } else {
    if (needUpdate) {
      addedHTML = addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Checked website-- script is out-of-date. Click <a href="' + GM_getValue("scriptURL") + '" TARGET="_blank">here</a> for Version ' + GM_getValue("scriptWebVer") + '</font></td></tr>';	  	
      updateScriptBox();
    } else {
      addedHTML = addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Checked website-- script is latest version.</font></td></tr>';		
      updateScriptBox();    
    }	
  }

  if ((checkedDateKW.length == 0) || (curDate.getTime() > (Date.parse(checkedDateKW) + oneDay))) {
    
  addedHTML = addedHTML +       
      '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Statistical data is missing or more than one day old.  Checking OxygeNation Forums for latest version of Kittiwake&#8217;s data.</font></td></tr>';
  updateScriptBox();
  
   // Get Kittiwake's latest data
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://forums.hardcoreoxygenation.com/viewtopic.php?t=218',
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html',},
    onload: function(responseDetails) {
	if (responseDetails.status == "200") {
	  GM_setValue("KW3_Last_Checked", curDate.toString());
 
	  var strHTML = responseDetails.responseText;
	  
          var firstPart = strHTML.substring(strHTML.indexOf('Without further crap, the list!') + 31);
          firstPart = firstPart.substring(0,firstPart.indexOf('</tr>'));
          var secondPart = strHTML.substring(strHTML.indexOf('Return to Part 1'));
          secondPart = secondPart.substring(0,secondPart.indexOf('Monsters of Interest'));
          var linesToProcess = firstPart + '<BR />' + secondPart;
          linesToProcess = linesToProcess.toUpperCase();
          
          linesToProcess = linesToProcess.split('<BR />');
  
          var debugOutput = '';
  
          for (var i = 0; i < linesToProcess.length; i++) {
            var curLine = trimString(linesToProcess[i]);
            if ((curLine != '') && (curLine.indexOf(' HP ') > 0)) {
              var originalLine = curLine;

              var curMonster = '';
              var monsterName = '';
              
              if (curLine.indexOf('ATK') > 0) {
              	if ((curLine.indexOf(' -') < 0) || (curLine.indexOf(' -') > curLine.indexOf(' <'))) {
                  monsterName = trimString(curLine.substring(0, curLine.indexOf(' <')));  // Monster Name        	
                } else {
                  monsterName = trimString(curLine.substring(0, curLine.indexOf(' -')));  // Monster Name
                }
                curLine = curLine.substring(curLine.indexOf('>')+1);
                curMonster = trimString(curLine.substring(0, curLine.indexOf(' HP'))); // Monster HP
                curLine = curLine.substring(curLine.indexOf('">')+2);
                if (curLine.indexOf(' XP') > 0) {
                  curMonster = curMonster + ';' + trimString(curLine.substring(0, curLine.indexOf(' XP'))); // Monster XP
                } else {
                  curMonster = curMonster + ';' + trimString(curLine.substring(0, curLine.indexOf('XP'))); // Monster XP                  	
                }
                if (curMonster.indexOf('<') > 0) { curMonster = curMonster.substring(0,curMonster.indexOf('<')); }
                
                curLine = curLine.substring(curLine.indexOf('">')+2);
                curMonster = curMonster + ';' + curLine.substring(0, curLine.indexOf(' DEF')); // Monster Def
                curLine = curLine.substring(curLine.indexOf('">')+2);
                curMonster = curMonster + ';' + curLine.substring(0, curLine.indexOf(' ATK')); // Monster Atk
                curLine = curLine.substring(curLine.indexOf('">')+2);
                curMonster = curMonster + ';' + curLine.substring(0, curLine.indexOf(' HIT')); // To Hit
                curLine = curLine.substring(curLine.indexOf('">')+2);
                curMonster = curMonster + ';' + curLine.substring(0, curLine.indexOf(' EVADE')); // To Evade
                curMonster = curMonster + ';';
       
                var elementalDefenses = '';
                var elementalAttacks = '';
                // And Elemental Damage Indicators
                if (curLine.indexOf(" E: ") != -1) { //Same element(s) for attack and defense.  Handle that.
                  if (curLine.indexOf(" ED: ") != -1) {
                  	var endIndex = curLine.indexOf(" ED: ");
                  } else {
                  	if (curLine.indexOf(" EA: ") != -1) {
                  	  var endIndex = curLine.indexOf(" EA: ");	
                  	} else { endIndex = curLine.length; }
                  }
                  elementalDefenses = harvestElements(curLine.substring(curLine.indexOf(" E: ") + 3, endIndex));
                  elementalAttacks = elementalDefenses;
                }
                  
                if (curLine.indexOf(" ED: ") != -1) { //Differentiated elemental attack and defense.  Handle defense.
                	if (curLine.indexOf(" EA: ",curLine.indexOf(" ED: ")) != -1) {
                 	  var endIndex = curLine.indexOf(" EA: ",curLine.indexOf(" ED: "));	
                 	} else { endIndex = curLine.length; }
                 	var edResult = harvestElements(curLine.substring(curLine.indexOf(" ED: ") + 4, endIndex));            
                 	if (elementalDefenses == '') {elementalDefenses = edResult;} else {elementalDefenses = elementalDefenses + ', ' + edResult;}
                }
                if (curLine.indexOf(" EA: ") != -1) { 
                	if (curLine.indexOf(" ED: ",curLine.indexOf(" EA: ")) != -1) {
                 	  var endIndex = curLine.indexOf(" ED: ",curLine.indexOf(" EA: "));	
                 	} else { endIndex = curLine.length; }
                 	var eaResult = harvestElements(curLine.substring(curLine.indexOf(" EA: ") + 4, endIndex));                            	
                 	if (elementalAttacks == '') {elementalAttacks = eaResult;} else {elementalAttacks = elementalAttacks + ', ' + eaResult;}
                }
                curMonster = curMonster + elementalDefenses + ';' + elementalAttacks + ';';
                
              } else {
                monsterName = trimString(curLine.substring(0, curLine.indexOf(' -')));  // Monster Name
                curLine = curLine.substring(curLine.indexOf('">')+2);
                curMonster = trimString(curLine.substring(0, curLine.indexOf(' HP'))); // Monster HP
                curLine = curLine.substring(curLine.indexOf('">')+2);
                curMonster = curMonster + ';' + trimString(curLine.substring(0, curLine.indexOf(' XP'))); // Monster XP
                curLine = curLine.substring(curLine.indexOf('>-')+2);
                curMonster = curMonster + ';;;;' + trimString(curLine.substring(0, curLine.indexOf(' EVADE'))) + ';;'; // To Evade
              }

              GM_setValue('KW3-' + monsterName, curMonster);
          
              debugOutput = debugOutput + '\n' +monsterName + ': ' + curMonster;// + '    (' + originalLine + ')';                   
            }
          }
          addedHTML = addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Successfully updated statistical data from OxygeNation Forums.</font></td></tr>';
          updateScriptBox();                   
        }
        else {
          var strHTML = 'Error: ' + responseDetails.status;	
          addedHTML = addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Failed to update statistical data from OxygeNation Forums (' + strHTML + ').<BR>Using cached data if available.</font></td></tr>';
          updateScriptBox();
          
        }
    }
  });
  
 
  }
  else {
    addedHTML = addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Statistical data (from Kittiwake / Hardcore Oxygenation Forums) &#60; 1 day old. Using cached data.</font></td></tr>';
    updateScriptBox();
  }

if ((checkedDateY.length == 0) || (curDate.getTime() > (Date.parse(checkedDateY) + oneDay))) {
	
  addedHTML = addedHTML +       
      '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Item-drop data is missing or more than one day old.  Checking Yiab&#8217;s page in the KoLWiki for latest version.</font></td></tr>';
  updateScriptBox();
	
  // Get Yiab's latest item-drop data
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://kol.coldfront.net/thekolwiki/index.php/Parseable_Item_Statistics',
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html',},
    onload: function(responseDetails) {
      if (responseDetails.status == "200") {
        GM_setValue("Y_Last_Checked", curDate.toString());

        var strHTML = responseDetails.responseText;
        var rawData = strHTML.substring(strHTML.indexOf('<p>')+3,strHTML.indexOf('</p>')-1);
        var itemChunks = rawData.split('||');
      
        for (var i = 0; i < itemChunks.length; i++) {

          var curMonsterName = trimString(itemChunks[i].substring(0,itemChunks[i].indexOf(':')).toUpperCase());
          var curDropInfo = itemChunks[i].substring(itemChunks[i].indexOf(':')+1);
        
          GM_setValue('Y1-' + curMonsterName, curDropInfo);              
        }      
        addedHTML = addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Successfully updated Item-Drop data from KoL Wiki.</font></td></tr>';
        updateScriptBox();            
        
      }
    }
  }); 
} else {
  addedHTML = addedHTML +       
      '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Item-drop data (from KoL Wiki / Yiab) &#60; 1 day old. Using cached data.</font></td></tr>';
  updateScriptBox();
}

if ((checkedDateR.length == 0) || (curDate.getTime() > (Date.parse(checkedDateR) + oneDay))) {
	
  addedHTML = addedHTML +       
      '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Meat-drop data is missing or more than one day old.  Checking Ragnok&#8217;s page at Subjunctive for latest version.</font></td></tr>';
  updateScriptBox();
	
  // Get Ragnok's latest meat-drop data
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://subjunctive.net/kol/AdventureSpoiler.html',
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html',},
    onload: function(responseDetails) {
	if (responseDetails.status == "200") {
	  GM_setValue("Last_Checked", curDate.toString());

	  var strHTML = responseDetails.responseText;
	  
	  var listItemElements = strHTML.split("<li>");
          for (var i=0; i < listItemElements.length; i++ ) { 
            var curListItem = listItemElements[i];

            if (curListItem.indexOf('ONCE ONLY:') != -1) { curListItem = curListItem.substring(curListItem.indexOf('ONCE ONLY:')+10); }            
  
            if ((curListItem.indexOf('Monster:') != -1) && (curListItem.indexOf('(as above)') == -1)) {             
              var curMonster = new Array();
              
              if (curListItem.indexOf(')') > curListItem.indexOf('HP')) {
                curMonster[0] = curListItem.substring(curListItem.indexOf('Monster:') + 9, curListItem.indexOf('(')-1);
                curMonster[1] = curListItem.substring(curListItem.indexOf('(') + 1, curListItem.indexOf('HP'));
                curMonster[0] = curMonster[0].replace(/\"/g,".");                  
                curMonster[0] = curMonster[0].replace(/\(/g,".");                  
                curMonster[0] = curMonster[0].replace(/\)/g,".");                  
                curMonster[0] = curMonster[0].replace(/\&ntilde\;/g,"ñ");                  
              } else {
                curMonster[0] = curListItem.substring(curListItem.indexOf('Monster:') + 9, curListItem.indexOf(')')+1);               	
                curMonster[1] = curListItem.substring(curListItem.indexOf(')'));                
                curMonster[1] = curMonster[1].substring(curMonster[1].indexOf('(') + 1, curMonster[1].indexOf('HP'));
                curMonster[0] = curMonster[0].replace(/\"/g,".");                
                curMonster[0] = curMonster[0].replace(/\(/g,".");                  
                curMonster[0] = curMonster[0].replace(/\)/g,".");                  
                curMonster[0] = curMonster[0].replace(/\&ntilde\;/g,"ñ");                  
              }              
                           
              if (curListItem.indexOf('XP') != -1) {
                curMonster[curMonster.length] = curListItem.substring(curListItem.indexOf(',') + 2, curListItem.indexOf('XP'));
              	
                var innerSection = curListItem.substring(curListItem.indexOf('XP') + 3);

                if (innerSection.indexOf(';') > 0) {
                  innerSection = innerSection.substring(innerSection.indexOf(';')+1);    	
                }
                else {
                  curMonster[curMonster.length] = curListItem.substring(curListItem.indexOf(',') + 2, curListItem.indexOf('XP'));
                  curMonster[curMonster.length] = innerSection.substring(1,innerSection.indexOf(';'));                  
                }

              } else {
                var innerSection = curListItem.substring(curListItem.indexOf(';') + 1);
                curMonster[curMonster.length] = 'None or Unknown';              	
              }
              
              if (innerSection.indexOf(';') > 0) {
                curMonster[curMonster.length] = innerSection.substring(1,innerSection.indexOf(';'));
                innerSection = innerSection.substring(innerSection.indexOf(';')+1);    	
              }
              else {
                curMonster[curMonster.length] = 'None or Unknown';
              }
              
              // Get Meat Drop Info
              if (innerSection.indexOf('meat') != -1) {
                var endPoint = innerSection.indexOf('meat');
              } else {
                if (innerSection.indexOf('Meat') != -1) {
                  var endPoint = innerSection.indexOf('Meat');
                }
                else {
                	var endPoint = innerSection.length;
                }
              }              
              curMonster[curMonster.length] = innerSection.substring(innerSection.indexOf('+')+1, endPoint);    
              curMonster[0] = curMonster[0].toUpperCase();
              GM_setValue('R2-' + curMonster[0], curMonster[1] + ';' + curMonster[2] + ';' + curMonster[3] + ';' + curMonster[4]);
            }            
          }
          addedHTML = addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Successfully updated statistical data from subjunctive.net.</font></td></tr>';
          updateScriptBox();            
        }
        else {
          var strHTML = 'Error: ' + responseDetails.status;	
          addedHTML = addedHTML + '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Failed to update statistical data from subjunctive.net (' + strHTML + ').<BR>Using cached data if available.</font></td></tr>';
          updateScriptBox();
          
        }
    }
  });
} else {
  addedHTML = addedHTML +       
      '<tr><td><font size=-2>&nbsp;&#42;&nbsp;Meat-drop data (from Subjunctive / Ragnok) &#60; 1 day old. Using cached data.</font></td></tr>';
  updateScriptBox();
}

checkCharPage();
}  
  
// Read the buffed stats from the character pane (on the left)
if (window.location.pathname == "/charpane.php") {
	
  // Make an attempt to correctly handle multis
  var bodyHTML = document.getElementsByTagName("body")[0].innerHTML;
  var charName = document.getElementsByTagName("b")[0].innerHTML;
  if (charName.indexOf('>') != -1) { charName = charName.substring(charName.indexOf('>')+1); }
  if (charName.indexOf('<') != -1) { charName = charName.substring(0,charName.indexOf('<')); }
  
  GM_setValue("CurCharName-" + location.host,charName);
  var curLevel = bodyHTML.match(/Level \d+/g);
  if (curLevel) {
    curLevel = curLevel[0].substring(6);	
  } else { 
    curLevel = bodyHTML.match(/Lvl. \d+/g);
    if (curLevel) {
      curLevel = curLevel[0].substring(5);
    } else {
     curLevel = 1; 
    }
  }
  GM_setValue(charName + '-Level', curLevel);
  
  var mcdPos = bodyHTML.indexOf("canadia.php?place=machine");
  if (mcdPos != -1) {
    var beginModifier = bodyHTML.indexOf("<b>",mcdPos);
    var endModifier = bodyHTML.indexOf("</b>",beginModifier);
    var mcdLevel = Number(bodyHTML.substring(beginModifier+3,endModifier));
  } else {
    var mcdLevel = 0;	
  }
  GM_setValue(charName + '-MCDLevel', mcdLevel);
  
  storeMonsterLevelEffects(document.getElementsByTagName("body")[0].innerHTML);

  var rowsToProcess = document.getElementsByTagName("tr");
  
  for (var i = 0; i < rowsToProcess.length; i++) {
    curRow = rowsToProcess[i];
    if ((curRow.innerHTML.indexOf('Mysticality:') > 0) || (curRow.innerHTML.indexOf('Mys:') > 0)) {
      var curFontElement = curRow.getElementsByTagName("font")[0];
      if (curFontElement) {
        var curMysticality = curFontElement.innerHTML;
      } else {
        var curBoldElement = curRow.getElementsByTagName("b")[0];
        var curMysticality = curBoldElement.innerHTML;	
      }
      GM_setValue(charName + "-BuffedMysticality",curMysticality);
    }
    if ((curRow.innerHTML.indexOf('Muscle:') > 0) || (curRow.innerHTML.indexOf('Mus:') > 0)) {
      var curFontElement = curRow.getElementsByTagName("font")[0];
      if (curFontElement) {
        var curMuscle = curFontElement.innerHTML;
      } else {
        var curBoldElement = curRow.getElementsByTagName("b")[0];
        var curMuscle = curBoldElement.innerHTML;	      	
      }
      GM_setValue(charName + "-BuffedMuscle",curMuscle);
    }
    if ((curRow.innerHTML.indexOf('Moxie:') > 0) || (curRow.innerHTML.indexOf('Mox:') > 0)) {
      var curFontElement = curRow.getElementsByTagName("font")[0];
      if (curFontElement) {
        var curMoxie = curFontElement.innerHTML;
      } else {
        var curBoldElement = curRow.getElementsByTagName("b")[0];
        var curMoxie = curBoldElement.innerHTML;	      	
      }
      GM_setValue(charName + "-BuffedMoxie",curMoxie);
    }
  }  
}

if (window.location.pathname == "/fight.php") {

    var charName = GM_getValue("CurCharName-" + location.host,'');
    var midFight = GM_getValue(charName + '-MidFight',0);
    var roundCounter = GM_getValue(charName + '-RoundCounter',1);
    var lastMonster = GM_getValue(charName + '-LastMonster','');
    
    if (midFight == 0) { roundCounter=1; } else { roundCounter += 1; }
	   
    var fpMonsterName = document.getElementsByTagName("span")[0].innerHTML;
    if (fpMonsterName.indexOf('The') < 0) {
      fpMonsterName = fpMonsterName.substring(fpMonsterName.indexOf(' ')+1);
    }
    if (fpMonsterName.indexOf('<') > 0) {
      fpMonsterName = fpMonsterName.substring(0,fpMonsterName.indexOf('<'));
    }

    fpMonsterName = fpMonsterName.toUpperCase();
    // Handle special cases-- mostly places where more than one monster has the same name but
    // different attributes.
    if (fpMonsterName == '7-FOOT DWARF') {
      if (document.getElementsByTagName("body")[0].innerHTML.indexOf("moil") > 0) { fpMonsterName = fpMonsterName + ' (MOIL)'; } 
      else {
        if (document.getElementsByTagName("body")[0].innerHTML.indexOf("Royale") > 0) { fpMonsterName = fpMonsterName + ' (ROYALE)'; }
        else {
          if (lastMonster.indexOf('DWARF') != -1) {  fpMonsterName = lastMonster; }
        }
      } 
      	      
    }
    if (fpMonsterName == 'ORCISH FRAT BOY') {
      if (document.getElementsByTagName("body")[0].innerHTML.indexOf("paddling") > 0) { fpMonsterName = fpMonsterName + ' (PADDLING)'; }
      else {
        if (document.getElementsByTagName("body")[0].innerHTML.indexOf("French Maid") > 0) { fpMonsterName = fpMonsterName + " (FRENCH MAID)"; }	      
        else {
          if (document.getElementsByTagName("body")[0].innerHTML.indexOf("Sorority Orcs") > 0) { fpMonsterName = fpMonsterName + ' (SORORITY ORCS)'; }	            
          else { if (lastMonster.indexOf('ORCISH FRAT BOY') != -1) {  fpMonsterName = lastMonster; } }
        }
      }    
    }
    if (((fpMonsterName == 'NINJA SNOWMAN') && (document.getElementsByTagName("body")[0].innerHTML.indexOf("lunch") > 0)) ||
       ((midFight == 1) && (lastMonster.indexOf('RICEBOWL') != -1)) ) { 
    	    fpMonsterName = fpMonsterName + ' (RICEBOWL)'; 
    }
    

    var storedMonster = GM_getValue('KW3-' + fpMonsterName, '');
    var storedDrops = GM_getValue('Y1-' + fpMonsterName, '');
    if (storedDrops != '') {
      storedDrops = storedDrops.replace( /[|]/g, "%)<BR>" );
      storedDrops = storedDrops.replace( /[=]/g, " (" );
      storedDrops = storedDrops + '%)';
     }
    var storedMeatDrops = GM_getValue('R2-' + fpMonsterName,'');
    if (storedMeatDrops != '') {
      var ragnokParts = storedMeatDrops.split(";");
      storedMeatDrops = ragnokParts[3];	
      
      if (storedDrops == '') {
        storedDrops = ragnokParts[2];	
        storedDrops = storedDrops.replace( /[,]/g, " (TBD%)<BR>" );
        if (storedDrops != '') {
          storedDrops = storedDrops + ' (TBD%)';	
        }
      }
    }
      
    if (storedMonster.length > 0) {
    	
      var storedMonsterParts = storedMonster.split(";");    	
    	
      var itemsMLModifier = GM_getValue(charName + '-MLItemsModifier',0);
      var effectsMLModifier = GM_getValue(charName + '-MLEffectsModifier',0);
      var mcdMLModifier = GM_getValue(charName + '-MCDLevel', 0);
      var totalMLModifier = itemsMLModifier + effectsMLModifier + mcdMLModifier;
      var listMLItems = GM_getValue(charName + '-MLItems', '');
      var listMLEffects = GM_getValue(charName + '-MLEffects', '');  
      storedMonsterParts[0] = Number((storedMonsterParts[0] * 1) + totalMLModifier);
      storedMonsterParts[2] = Number((storedMonsterParts[2] * 1) + totalMLModifier);
      storedMonsterParts[3] = Number((storedMonsterParts[3] * 1) + totalMLModifier);
      storedMonsterParts[4] = Number((storedMonsterParts[4] * 1) + totalMLModifier);
      storedMonsterParts[5] = Number((storedMonsterParts[5] * 1) + totalMLModifier);
      storedMonsterParts[1] = Math.round(((storedMonsterParts[1] * 1.0) + (0.2 * totalMLModifier))*100)/100;    

      // Get the current HP for the monster-- across rounds if we're mid-fight.
      if ((midFight == 1) && (fpMonsterName == lastMonster)) {
        var curMonsterHP = GM_getValue(charName + '-CurMonsterHP',-1);
      } else {
        var curMonsterHP = storedMonsterParts[0];	
      }      
      if (curMonsterHP == -1) {
        var curMonsterHP = storedMonsterParts[0];	      	
      }
      
      // Get which rows should be visible from the cookie if it exists.
      var rowVisibility = getCookieValue("MonsterStats-" + charName + "-VisibleRows");
      if (!rowVisibility) {
        rowVisibility = 1;	
      }
      
      
      // Reduce curMonsterHP by any damage done to the monster this round
      var pageBodyText = document.getElementsByTagName("body")[0].innerHTML;
      var damageAmount = 0;

      // Handle elemental SPELL damage dealt by the player.
      var damageText = pageBodyText.match(/\<font color\=[\"]?\w+[\"]?\>\<b\>[\+]?\d+\<\/b\>\<\/font\> damage/g);     
      if (damageText) {
        for (var i = 0; i < damageText.length; i++) {
          var curDamageAmount = damageText[i].substring(damageText[i].indexOf('b>')+2);          	
          damageAmount = curDamageAmount.substring(0,curDamageAmount.indexOf('<'));
          curMonsterHP = curMonsterHP - damageAmount;
        }
      }

      // Handle other elemental damage dealt by player
      var damageText = pageBodyText.match(/\(\<font color\=[\"]?\w+[\"]?\>\<b\>\+\d+\<\/b\>\<\/font\>\)/g);     
      if (damageText) {
        for (var i = 0; i < damageText.length; i++) {
          var curDamageAmount = damageText[i].substring(damageText[i].indexOf('>+')+2);
          damageAmount = curDamageAmount.substring(0,curDamageAmount.indexOf('<'));
          curMonsterHP = curMonsterHP - damageAmount;
        }
      }

      // First NON-elemental damage MAY be fumble damage to the player.  Skip it if so.
      if (pageBodyText.indexOf('FUMBLE!') != -1) {
        var firstElementIndex = 1;
      } else {
        var firstElementIndex = 0;	
      }
      
      // Since the elemental damage is mixed into the regular damage message, we have to work around
      // it for calculating regular damage.  So we optionally match on it but parse around it if it exists.
      var damageText = pageBodyText.match(/\d+ (\(.+\) )?(points of \w+ )?damage/g);
//      var damageText = pageBodyText.match(/\d+ (\(.+\) )?damage/g);
      if (damageText) {
        for (var i = firstElementIndex; i < damageText.length; i++) {
          if (damageText[i].indexOf('(') != -1) {
            damageAmount = damageText[i].substring(0, damageText[i].indexOf(' ('));
          } else {
            if (damageText[i].indexOf('points of') != -1) {
              damageAmount = damageText[i].substring(0, damageText[i].indexOf(' points'));            	
            } else {
              damageAmount = damageText[i].substring(0, damageText[i].indexOf(' damage'));
            }
          }
          curMonsterHP = curMonsterHP - damageAmount;
        }
      }
      var damageText = pageBodyText.match(/\d+ additional damage/g);
      if (damageText) {
        for (var i = 0; i < damageText.length; i++) {
          damageAmount = damageText[i].substring(0, damageText[i].indexOf(' additional damage'));
          curMonsterHP = curMonsterHP - damageAmount;
        }
      }
      var damageText = pageBodyText.match(/\d+ extra damage/g);
      if (damageText) {         
        for (var i = 0; i < damageText.length; i++) {
          damageAmount = damageText[i].substring(0, damageText[i].indexOf(' extra damage'));
          curMonsterHP = curMonsterHP - damageAmount;
        }
      }

      // Weird special cases that don't matchthe usual "damage" text pattern.

      // Handle damage dealt by Mosquito...
      if (pageBodyText.indexOf('sucks some blood out of your opponent and injects it into you.') != -1) {
        var bodyAfterMessage = 	pageBodyText.substring(pageBodyText.indexOf('sucks some blood out of your opponent and injects it into you.')+1);
        var damageText = bodyAfterMessage.match(/You gain \d+ hit point/);
        if (damageText) { 
          damageAmount = damageText[0].substring(9,	damageText[0].indexOf('hit point'));
          curMonsterHP = curMonsterHP - damageAmount;
        }
      }  

      // Handle MP Suck by boss bat-- gets converted into MP for the Boss Bat...
      if (pageBodyText.indexOf('until he disengages, two goofy grins on his faces.') != -1) {
        var bodyAfterMessage = 	pageBodyText.substring(pageBodyText.indexOf('until he disengages, two goofy grins on his faces.')+1);
        var damageText = bodyAfterMessage.match(/You lose \d+/);
        if (damageText) { 
          damageAmount = Number(damageText[0].substring(9));
          curMonsterHP = curMonsterHP + damageAmount;
          if (curMonsterHP  > storedMonsterParts[0]) { curMonsterHP = storedMonsterParts[0]; } 
        }
      }

      if (pageBodyText.indexOf('WINWINWIN') > 0) {
        curMonsterHP = 0;
        GM_setValue(charName + '-MidFight',0);	
        GM_setValue(charName + '-RoundCounter', 0);
      } else {
      	if ((pageBodyText.indexOf('You lose.') != -1) || (pageBodyText.indexOf('You run away, like a sissy little coward.') != -1)) {
      	  GM_setValue(charName + '-MidFight',0);
      	  GM_setValue(charName + '-RoundCounter', 0);
      	} else {  
          GM_setValue(charName + '-MidFight',1);
          GM_setValue(charName + '-LastMonster',fpMonsterName);
          GM_setValue(charName + '-RoundCounter', roundCounter);
        }
      }      
      
      GM_setValue(charName + '-CurMonsterHP', curMonsterHP);
      
      if (storedMonsterParts[6] == '') { storedMonsterParts[6] = 'None'; } // Set Elemental type to None if needed.
      if (storedMonsterParts[7] == '') { storedMonsterParts[7] = 'None'; } // Set Elemental type to None if needed.      


      var evadePercent = ((GM_getValue(charName + "-BuffedMoxie",0)-storedMonsterParts[3]) / 18) * 100 + 50;
      evadePercent = Math.round(evadePercent * 10) / 10; // Round to one decimal place
      var evadeColor = 'black';
      if (evadePercent < 0) { evadePercent = 0; evadeColor= 'red'; }
      if (evadePercent > 100) { evadePercent = 100; evadeColor= 'green'; }
   
      var hitMeleePercent = ((GM_getValue(charName + "-BuffedMuscle",0)-storedMonsterParts[2]) / 18) * 100 + 50;
      hitMeleePercent = Math.round(hitMeleePercent * 10) / 10; // Round to one decimal place
      var hitMeleeColor = 'black';
      if (hitMeleePercent < 0) { hitMeleePercent = 0; hitMeleeColor= 'red'; }
      if (hitMeleePercent > 100) { hitMeleePercent = 100; hitMeleeColor= 'green'; }

      var hitMysPercent = ((GM_getValue(charName + "-BuffedMysticality",0)-storedMonsterParts[2]) / 18) * 100 + 50;
      hitMysPercent = Math.round(hitMysPercent * 10) / 10; // Round to one decimal place
      var hitMysColor = 'black';
      if (hitMysPercent < 0) { hitMysPercent = 0; hitMysColor= 'red'; }
      if (hitMysPercent > 100) { hitMysPercent = 100; hitMysColor= 'green'; }

      var hitRangedPercent = ((GM_getValue(charName + "-BuffedMoxie",0)-storedMonsterParts[2]) / 18) * 100 + 50;
      hitRangedPercent = Math.round(hitRangedPercent * 10) / 10; // Round to one decimal place
      var hitRangedColor = 'black';
      if (hitRangedPercent < 0) { hitRangedPercent = 0; hitRangedColor= 'red'; }
      if (hitRangedPercent > 100) { hitRangedPercent = 100; hitRangedColor= 'green'; }
      
      var modifiersText = 'Items Impacting ML:\\n' + listMLItems +'\\n\\nEffects Impacting ML:\\n\\n' + listMLEffects +'\\n\\nCandian Mind Control Device: ' + mcdMLModifier;

      if ((rowVisibility & 1) != 0) { var hitChanceRowVisibility = 'table-row;'; var hitChanceLinkStyle = 'line-through;';} else { var hitChanceRowVisibility = 'none;'; var hitChanceLinkStyle = 'underline;';} 
      if ((rowVisibility & 2) != 0) { var playerStatsRowVisibility = 'table-row;'; var playerStatsLinkStyle = 'line-through;';} else { var playerStatsRowVisibility = 'none;'; var playerStatsLinkStyle = 'underline;';} 
      if ((rowVisibility & 4) != 0) { var monsterInfoRowVisibility = 'table-row;'; var monsterInfoLinkStyle = 'line-through;';} else { var monsterInfoRowVisibility = 'none;'; var monsterInfoLinkStyle = 'underline;';} 
      if ((rowVisibility & 8) != 0) { var itemDropRowVisibility = 'table-row;'; var itemDropLinkStyle = 'line-through;';} else { var itemDropRowVisibility = 'none;'; var itemDropLinkStyle = 'underline;';} 
      
      setTimeout(
        'setCookieValue = function(cookieName,cookieValue) {var today = new Date().valueOf();var t = new Date(today+14*86400000);document.cookie = cookieName + "=" + escape(cookieValue) + "; expires=" + t + "; domain=\\"kingdomofloathing.com\\"";}; ' +
        'storeRowVisibility = function() { var rowVisibility = 0; if(document.getElementById("HitChance1Row").style.display=="table-row"){ rowVisibility = rowVisibility + 1;} if(document.getElementById("PlayerStats1Row").style.display=="table-row"){ rowVisibility = rowVisibility + 2;} if(document.getElementById("MonsterInfoRow").style.display=="table-row"){ rowVisibility = rowVisibility + 4;} if(document.getElementById("ItemDropRow").style.display=="table-row"){ rowVisibility = rowVisibility + 8;} setCookieValue("MonsterStats-' + charName + '-VisibleRows",rowVisibility); }; ' +
        'toggleRow = function (rowId,linkId) { if(document.getElementById(rowId).style.display=="table-row"){document.getElementById(rowId).style.display="none"; if (document.getElementById(linkId)) {document.getElementById(linkId).style.textDecoration="underline;";} } else{ document.getElementById(rowId).style.display="table-row"; if(document.getElementById(linkId)) {document.getElementById(linkId).style.textDecoration="line-through;";}} storeRowVisibility(); };',10);

      document.getElementsByTagName("span")[0].innerHTML = document.getElementsByTagName("span")[0].innerHTML + '<BR><BR>' +
          '<span style="float:right;">' +
          '<table style="border: 1px solid blue; border-collapse: collapse; border-bottom: 1px solid blue; border-right: 1px solid blue; font-size: 75%;" id="MonsterStats">' +
          '<tr><th style="color: white;" colspan=2 bgcolor=blue>' + charName + ' vs ' + fpMonsterName + ' (<a tabIndex="-1" href="javascript:alert(\'' + modifiersText + '\');"><font color=white>+' + totalMLModifier + ' ML</font></a>) (Round ' + roundCounter + ')</th></tr>' +
          '<tr style=""><td><strong>HP:</strong></td><td> ' + curMonsterHP + ' / ' + storedMonsterParts[0] + ' </td></tr>' +
          '<tr><td><strong>Chance to Dodge</strong> (Mox):</td><td> ' + evadePercent + '% </td></tr>' +          
          '<tr style="display: ' + hitChanceRowVisibility + '" id="HitChance1Row"><td><strong>Chance to Hit</strong> (Mus / Melee):</td><td> ' + hitMeleePercent + '% </td></tr>' +
          '<tr style="display: ' + hitChanceRowVisibility + '" id="HitChance2Row"><td><strong>Chance to Hit</strong> (Mys / SSG+Staff):</td><td> ' + hitMysPercent  + '% </td></tr>' +
          '<tr style="display: ' + hitChanceRowVisibility + '" id="HitChance3Row"><td><strong>Chance to Hit</strong> (Mox / Ranged):</td><td> ' + hitRangedPercent + '% </td></tr>' +
          '<tr style="display: ' + playerStatsRowVisibility + '" id="PlayerStats1Row"><td><strong>Req. to Always Hit</strong></td><td> ' + storedMonsterParts[4] + ' </td></tr>' +
          '<tr style="display: ' + playerStatsRowVisibility + '" id="PlayerStats2Row"><td><strong>Req. to Always Evade</strong></td><td> ' + storedMonsterParts[5] + ' Mox</td></tr>' +
          '<tr style="display: ' + monsterInfoRowVisibility + '" id="MonsterInfoRow"><td><strong>Atk:</strong>  ' + storedMonsterParts[3] + ' &nbsp;&nbsp;&nbsp;&nbsp;<strong>Def:</strong> ' + storedMonsterParts[2] + ' </td><td><strong>XP:</strong> ' + storedMonsterParts[1] + ' </td></tr>' +
          '<tr style="display: ' + monsterInfoRowVisibility + '" id="ElementRow1"><td><strong>Elemental Defense:</strong></td><td> ' + storedMonsterParts[6] + ' </td></tr>' +
          '<tr style="display: ' + monsterInfoRowVisibility + '" id="ElementRow2"><td><strong>Elemental Attack:</strong></td><td> ' + storedMonsterParts[7] + ' </td></tr>' +          
          '<tr style="display: ' + itemDropRowVisibility + '" id="ItemDropRow"><td><strong>Item Drops:</strong></td><td> ' + storedDrops + ' </td></tr>' +
          '<tr style="display: ' + itemDropRowVisibility + '" id="MeatDropRow"><td><strong>Meat Drops:</strong></td><td> ' + storedMeatDrops + ' </td></tr>' +
          '<tr><td style="color: white;" bgcolor=blue colspan=2><span id="MonsterInfoLink" style="text-decoration: ' + monsterInfoLinkStyle +'" onClick="javascript:toggleRow(\'MonsterInfoRow\',\'MonsterInfoLink\'); toggleRow(\'ElementRow1\',\'\'); toggleRow(\'ElementRow2\',\'\');">Monster&nbsp;Info</span>&nbsp;&nbsp;&nbsp;<span id="PlayerStatsLink" style="text-decoration: ' + playerStatsLinkStyle + '" onClick="javascript:toggleRow(\'PlayerStats1Row\',\'PlayerStatsLink\');toggleRow(\'PlayerStats2Row\',\'\');">Player&nbsp;Stats</span>&nbsp;&nbsp;&nbsp;<span id="HitChancesLink" style="text-decoration: ' + hitChanceLinkStyle +'" onClick="javascript:toggleRow(\'HitChance1Row\',\'HitChancesLink\'); toggleRow(\'HitChance3Row\',\'\'); toggleRow(\'HitChance2Row\',\'\');">Hit&nbsp;Chances</span>&nbsp;&nbsp;&nbsp;<span id="ItemDropLink" style="text-decoration: ' + itemDropLinkStyle +'" onClick="javascript:toggleRow(\'ItemDropRow\',\'ItemDropLink\');toggleRow(\'MeatDropRow\',\'\');">Drops</span></td></tr>' +          
          '</table>'+
          '<font size=-3>(Note: These values include ML Modifiers, but not Item Drop Modifiers)</font>' +
          '</span>';
  }
}        
	
