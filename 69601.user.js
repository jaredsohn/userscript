// ==UserScript==
// @name           Ikariam Detailed Combat Report Extender
// @namespace      Ikariam-Detailed-Combat-Report-Extender
// @description    Extends detailed combat report to one page
// @include        http://s*.ikariam.*/*view=militaryAdvisorDetailedReportView*
// @include        http://s*.ikariam.*/*view=militaryAdvisorReportView*
// @include        http://s*.ikariam.*/*view=militaryAdvisorMilitaryMovements*
// @include        http://s*.ikariam.*/*view=militaryAdvisorCombatReports*
// @author			salomone
// @version			0.2.1
// ==/UserScript==
// History:
// v.0.1.0 - 04/12/2009
// * Some base functionality
// v.0.1.2 - 06/12/2009
// * Added onMouseOver and onMouseOut event handling on additional pages to display unit stats
// v.0.1.3 - 08/12/2009
// * Hopefully fixed additional page display in pending battles 
// v.0.1.4 - 13/12/2009
// * Added localized dateformat supporting and menu command to switch on / off the feature
// * Extended include pages to increase menu command availability
// v.0.1.5 - 14/12/2009
// * event.target replaced with event.currentTarger
// * And yess!! additional page display in pending battles works well :D
// v.0.1.6 - 15/12/2009
// * Hopefully fixed reserved units paging when more than one player fight on the attacker and/or defender side
// v.0.1.7 - 16/12/2009
// * Hotfix, morale displaying slipped left on the last page 
// v.0.1.8 - 02/01/2010
// * Fixed defender diving boat details on first round (invisible back button covered the center section of the unit picture) 
// v.0.1.9 - 21/01/2010
// * Fixed reserved unit paging on extended pages
// v.0.2.0 - 26/01/2010
// * Starting approvation
// v.0.2.1 - 27/01/2010
// * Temporaly added maximum 90 rounds soft cap    


$ = document.getElementById;
var gameServer = top.location.host;
var url = self.location.href;
var langList = { en: 'English', hu: 'Magyar' };

var trimEverythingExceptNumbers = new RegExp('[\\D]', 'g');
var trimWhiteSpaceCharsRegexp = new RegExp('[\\s]', 'g');
var combatRoundRegexp = new RegExp('combatRound=\\d{1,4}');
var trimEverythingForDate = new RegExp('[^\:^\\.^\\d^ ]', 'g');
var regexpForMilitaryView = new RegExp('view=militaryAdvisor[DetailedReportView|ReportView|MilitaryMovements|CombatReports]');

var baseCombatPage = null;
var numberOfAllRounds = 1;
var infoBox = null;
var htmlCodes = new Object();
var needLocalDft = false;
var currentAttackerMaxPageValues = null;
var currentDefenderMaxPageValues = null;
var currentAttackerPageValues = null;
var currentDefenderPageValues = null;

var LOCALIZED_DFT_VAR_NAME = 'LOCALIZED_DATEFORMAT';
var SCRIPT_NAME = 'Ikariam Detailed Combat Report Extender';
var SWITCH_LOCAL_DFT_ON = '';
var SWITCH_LOCAL_DFT_OFF = '';

function getGM_Value( variableName )	{
	return GM_getValue ( variableName );
}

function setGM_Value ( variableName, variableValue )	{
	GM_setValue ( variableName, variableValue );
}

function myGM_Log(strToLog)	{
	GM_log(strToLog);
}
function myGM_registerMenuCommand( menuText, callbackFunction )	{
	GM_registerMenuCommand(menuText, callbackFunction);
}

function addEvent(obj, evType, fn, bubble)	{
	if (obj.addEventListener)	{
		obj.addEventListener(evType, fn, bubble);
		return true;
	} 
	else if (obj.attachEvent)	{
		var r = obj.attachEvent('on'+evType, fn);
		return r;
	} 
	else {
		return false;
	}
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
        result.push( next );
      return result;
  }
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function removeRecursively( parentElement, childElement )	{
	if ( childElement.firstChild )	{
		removeRecursively( childElement, childElement.firstChild );
	}	
	parentElement.removeChild( childElement );
}

function requestAdditionalCombatPages(dataStr, fn) {
    GM_xmlhttpRequest({
        method:'POST',
        url:'http://' + gameServer + '/index.php',
        data:dataStr,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + gameServer + '/index.php',
            'Cookie': document.cookie
        },
        onload:function(xhr) { fn(xhr.responseText); }
    } );
}

function createHiddenDiv( divId, divContent )	{
	var hiddenDiv = document.createElement('div');
	hiddenDiv.style.display = 'none';
	hiddenDiv.style.visibility = 'hidden';
	hiddenDiv.id = 'undefined' == divId || null == divId ? 'hiddenDiv' + ( Math.random() * 100 ) : divId ;
	
	if (divContent)	{
		hiddenDiv.innerHTML = 'string' == typeof divContent ? divContent : divContent.toXMLString();
	}
	
	return hiddenDiv;
}

function createHiddenInput(val)	{
	var res = null;
	res = document.createElement('input');
	res.type = 'hidden';
	res.id = 'hidden_input_for_battle_page_indexing';
	res.value = val;	
	return res;
}

if ( regexpForMilitaryView.test(url) )	{
	registerCommands();
	if ( url.indexOf('view=militaryAdvisorDetailedReportView') > 0 )	{
		extendCombatReports();
	}
}

function extendCombatReports()	{	
	var baseCombatPages = $x(".//*[@id='mainview']/div");
	baseCombatPage = getDivWithId( baseCombatPages, 'rounds' );	
	numberOfAllRounds = getNumberOfAllRounds( baseCombatPage );
	
	if ( numberOfAllRounds == 1 )	{
		return;
	}
	
	// TODO Remove soft cap when new paging is available
	if ( numberOfAllRounds > 90 )	{
		numberOfAllRounds = 90;
	}
	
	if ( getGM_Value(LOCALIZED_DFT_VAR_NAME) && getGM_Value(LOCALIZED_DFT_VAR_NAME) != null && getGM_Value(LOCALIZED_DFT_VAR_NAME) != 'undefined' )	{
		needLocalDft = getGM_Value(LOCALIZED_DFT_VAR_NAME);
	}
	
	currentAttackerPageValues = new Array(numberOfAllRounds);
	currentDefenderPageValues = new Array(numberOfAllRounds);
	currentAttackerMaxPageValues = new Array(numberOfAllRounds);
	currentDefenderMaxPageValues = new Array(numberOfAllRounds);
	
	var actualPageIdx = getNumberOfActualRound( baseCombatPage );
	
	if ( actualPageIdx != 1 )	{
		var attackerDiv = getDivWithId( baseCombatPages, 'attacker' );
		attackerDiv.insertBefore(  createHiddenInput( actualPageIdx ), attackerDiv.firstChild );
	}
	
	
	/*
	// Ez csak a magyar szervereken nyerő..
	// This only good on hungarian servers..
	var eventsDiv = getDivWithId( baseCombatPages, 'events' );
	if ( eventsDiv && eventsDiv != 'undefined' && eventsDiv != null )	{
		eventsDiv.innerHTML = eventsDiv.innerHTML.replace('<h2>Events</h2>', '<h2>Események</h2>' );
	}
	*/
	
	var paramStr = (String)(url.split('?')[1]);	
	var node = document.getElementById('militaryAdvisorDetailedReportView');    
	infoBox = document.createElement('div');
	infoBox.setAttribute('id','infoBox');
	node.appendChild(infoBox);

	removeArrows( $X("./ul", baseCombatPage ) );
	if ( baseCombatPage.style )	{
		baseCombatPage.style.position = 'relative';
		baseCombatPage.style.top = '0px';
		baseCombatPage.style.width = 'auto';
	}
	
	processBackButton(baseCombatPage, actualPageIdx);
	
	var i = 0;	
	var finalDataStr = '';	

	while ( i != numberOfAllRounds )	{
		i++;
		if ( i != actualPageIdx )	{			
			finalDataStr = paramStr.replace( combatRoundRegexp , 'combatRound=' + i );
			requestAdditionalCombatPages(finalDataStr, getBattlefield );
		}
	}

}

function getNumberOfAllRounds(roundsDiv)	{
	var roundLi = $X("./ul/li[@class='roundNo']", roundsDiv);
	var roundLiStr = (String)(roundLi.innerHTML);
	var trimmedStr = roundLiStr.substring( roundLiStr.indexOf('/') ).replace( trimEverythingExceptNumbers , '');	
	return parseInt( trimmedStr , 0);	
}

function getNumberOfActualRound(roundsDiv)	{
	var roundLi = $X("./ul/li[@class='roundNo']", roundsDiv);
	var roundLiStr = (String)(roundLi.innerHTML);
	var trimmedStr = roundLiStr.substring(0, roundLiStr.indexOf('/') ).replace( trimEverythingExceptNumbers , '');	
	return parseInt( trimmedStr , 0);	
}

function getBattlefield( page )	{
	if ( page )	{
		var battleFieldDiv = $x(".//*[@id='mainview']/div[not(@class='buildingDescription')]", createHiddenDiv('hidden_bf_div_id', page));
		
		var actualPageIdx = getNumberOfActualRound( $X("./../div[@id='rounds']", battleFieldDiv[0]) );
		
		var xPathToFindNextDiv = "./..//*[@id='hidden_input_for_battle_page_indexing' and @value>" + actualPageIdx + "]/..";
		var insertBefore = $X(xPathToFindNextDiv, baseCombatPage);
		
		processBattlafieldDivElements(battleFieldDiv, actualPageIdx);		
		processBackButton(battleFieldDiv[0], actualPageIdx);		

		(battleFieldDiv[0]).insertBefore(  createHiddenInput( actualPageIdx ), (battleFieldDiv[0]).firstChild );		
		var i = 0;		

		if (!insertBefore || insertBefore == null || insertBefore == undefined ) {
			insertBefore = $X(".//*[@id='mainview']/script");
		}
		
		i = battleFieldDiv.length;
		while ( i != 0 )	{
			insertBefore = baseCombatPage.parentNode.insertBefore(battleFieldDiv[--i], insertBefore);
		}
	}
}

function processBattlafieldDivElements(battleFieldDiv, actualPageIdx)	{
	var i = 0;
	var battleFieldDivElement = null;
	while ( i != battleFieldDiv.length )	{		
		battleFieldDivElement = battleFieldDiv[i++];
		
		var id = battleFieldDivElement.getAttribute('id');		
		var listRoot = null;
		
		if ( id == 'battlefield' )	{
			
			var jsText = $X("./../script", battleFieldDivElement).innerHTML;			
			
			var idxOfNeededVariable = jsText.indexOf('maxAttackerPages');
			var idxOfNeededSemiColon = jsText.indexOf(';', idxOfNeededVariable );
			var numOfMaxAttackerPages =  parseInt( jsText.substring( idxOfNeededVariable, idxOfNeededSemiColon ).replace( trimEverythingExceptNumbers, '' ) );
			
			idxOfNeededVariable = jsText.indexOf('maxDefenderPages');
			idxOfNeededSemiColon = jsText.indexOf(';', idxOfNeededVariable );
			var numOfMaxDefenderPages = parseInt( jsText.substring( idxOfNeededVariable, idxOfNeededSemiColon ).replace( trimEverythingExceptNumbers, '' ) );			
			
			processReservePagers(battleFieldDivElement, numOfMaxAttackerPages, numOfMaxDefenderPages, actualPageIdx);
			
			var unitSlots = $x("./div[@id='fieldAttacker' or @id='fieldDefender']//*[starts-with(@id,'slot')]", battleFieldDivElement);
			var unitSlot = null;
			var oldId = '';
			var newId = '';
			var idx = 0;
			j = 0;
			
			while ( j != unitSlots.length )	{
				unitSlot = unitSlots[j++];
				oldId = unitSlot.getAttribute('id');
				shortId = oldId.replace(/slot/, '');
				idx = jsText.indexOf( shortId );
				newId = oldId.replace(/slot/, 'slot'+actualPageIdx);				
				var htmlCode = jsText.substring( idx, jsText.indexOf(';', idx) );
				
				var firstIdx = htmlCode.indexOf('table');
				if ( firstIdx<0 )	{
					continue;
				}
				var lastIdx = htmlCode.lastIndexOf('table');
				htmlCode = htmlCode.substring( firstIdx-1, lastIdx+6 );
				htmlCodes[newId] = htmlCode;				
				unitSlot.setAttribute('id', newId );				
				addEvent( unitSlot, 'mouseover', function(event){showInfoBox(event);}, true );
				addEvent( unitSlot, 'mouseout', function(){document.getElementById('infoBox').style.display = "none";}, true );
			}
			
			continue;
		}
		
		if ( id == 'rounds' )	{			
			listRoot = $X("./ul", battleFieldDivElement);
			removeArrows(listRoot);
			if ( battleFieldDivElement.style )	{
				battleFieldDivElement.style.position = 'relative';
				battleFieldDivElement.style.top = '0px';
				battleFieldDivElement.style.width = 'auto';
			}
			continue;	
		}	
		
		if ( id == 'events' )	{
			battleFieldDivElement.innerHTML = battleFieldDivElement.innerHTML.replace('<h2>Events</h2>', '<h2>Események</h2>' );
			continue;
		}
	}
}

function processReservePagers(bfDiv, numOfMaxAttackerPages, numOfMaxDefenderPages, actualPageIdx)	{
	var pagers = null;
	var reserveUnitPages = null;
	var j = 0;
	var pager = null;
	var reserveUnitPage = null;
	currentAttackerPageValues[actualPageIdx] = 1;
	currentDefenderPageValues[actualPageIdx] = 1;
	currentAttackerMaxPageValues[actualPageIdx] = numOfMaxAttackerPages;
	currentDefenderMaxPageValues[actualPageIdx] = numOfMaxDefenderPages;
	
	myGM_Log( 'numOfMaxAttackerPages: ' + numOfMaxAttackerPages );
	myGM_Log( 'numOfMaxDefenderPages: ' + numOfMaxDefenderPages );
	
	pagers = $x("./div[@id='resAttacker']/div[@class='nav']/ul/li[not(@class)]/a", bfDiv);	
	if ( numOfMaxAttackerPages < 2 )	{
		while ( j != pagers.length )	{
			pager = pagers[j++];		
			pager.style.visibility = 'hidden';
		}
	}	
	else	{
		while ( j != pagers.length )	{
			pager = pagers[j++];
			myGM_Log( 'pager: ' + pager.getAttribute('id') );
			pager.setAttribute('id', ( pager.getAttribute('id') + '_' + actualPageIdx ) );
			addEvent(pager, 'click', function(event){ reservePagerClicked(event); }, false);
			myGM_Log( 'pager: ' + pager.getAttribute('id') );
		}	
		
		j = 0;
		reserveUnitPages = $x("./div[@id='resAttacker']/div[@class='units' or @class='units ' or @class='units ships']/ul[starts-with(@id,'attackerPage')]", bfDiv);
		while ( j != reserveUnitPages.length )	{
			reserveUnitPage = reserveUnitPages[j++];
			myGM_Log( 'reserveUnitPage: ' + reserveUnitPage.getAttribute('id') );
			reserveUnitPage.setAttribute('id', ( reserveUnitPage.getAttribute('id') + actualPageIdx ) );
			myGM_Log( 'reserveUnitPage: ' + reserveUnitPage.getAttribute('id') );
		}
	}
	
	pagers = $x("./div[@id='resDefender']/div[@class='nav']/ul/li[not(@class)]/a", bfDiv);
	if ( numOfMaxDefenderPages < 2 )	{
		j = 0;
		while ( j != pagers.length )	{
			pager = pagers[j++];		
			pager.style.visibility = 'hidden';
		}
	}		
	else	{
		j = 0;
		while ( j != pagers.length )	{
			pager = pagers[j++];
			pager.setAttribute('id', ( pager.getAttribute('id') + '_' + actualPageIdx ) );
			addEvent(pager, 'click', function(event){ reservePagerClicked(event); }, false);
		}
		j = 0;
		reserveUnitPages = $x("./div[@id='resDefender']/div[@class='units' or @class='units ' or @class='units ships']/ul[starts-with(@id,'defenderPage')]", bfDiv);
		while ( j != reserveUnitPages.length )	{
			reserveUnitPage = reserveUnitPages[j++];
			reserveUnitPage.setAttribute('id', ( reserveUnitPage.getAttribute('id') + actualPageIdx ) );
		}
	}	
}

function reservePagerClicked(event)	{
	var trg = event.currentTarget;
	var trgIdElements = trg.getAttribute('id').split('_');
	var pageIdx = parseInt( trgIdElements[1] );
	var trgOriginalId = trgIdElements[0];
	if ( 'attBack' == trgOriginalId && currentAttackerPageValues[pageIdx] > 1 )	{
		document.getElementById( 'attackerPage' + currentAttackerPageValues[pageIdx] + pageIdx ).style.display = 'none';
		currentAttackerPageValues[pageIdx]--;
		document.getElementById( 'attackerPage' + currentAttackerPageValues[pageIdx] + pageIdx ).style.display = 'block';
	}
	else if ( 'attFore' == trgOriginalId && currentAttackerPageValues[pageIdx] < currentAttackerMaxPageValues[pageIdx] )	{
		document.getElementById( 'attackerPage' + currentAttackerPageValues[pageIdx] + pageIdx ).style.display = 'none';
		currentAttackerPageValues[pageIdx]++;
		document.getElementById( 'attackerPage' + currentAttackerPageValues[pageIdx] + pageIdx ).style.display = 'block';
	} 
	else if ( 'defBack' == trgOriginalId && currentDefenderPageValues[pageIdx] > 1 )	{
		document.getElementById( 'attackerPage' + currentDefenderPageValues[pageIdx] + pageIdx ).style.display = 'none';
		currentDefenderPageValues[pageIdx]--;
		document.getElementById( 'attackerPage' + currentDefenderPageValues[pageIdx] + pageIdx ).style.display = 'block';
	}
	else if ( 'defFore' == trgOriginalId && currentDefenderPageValues[pageIdx] < currentDefenderMaxPageValues[pageIdx] )	{
		document.getElementById( 'attackerPage' + currentDefenderPageValues[pageIdx] + pageIdx ).style.display = 'none';
		currentDefenderPageValues[pageIdx]++;
		document.getElementById( 'attackerPage' + currentDefenderPageValues[pageIdx] + pageIdx ).style.display = 'block';
	}
}

function removeArrows(listRoot)	{
	var listElements = $x("./li[@class='arrow']", listRoot);
	var j = 0;
	var listElement = null;
	while ( j != listElements.length )	{
		listElement = listElements[j++];
		listRoot.removeChild( listElement );
	}			
	return;
}

function processBackButton(combatPage, actualPageIdx)	{
	
	var backButtonDiv = $X("./../div[@id='back']", combatPage);
	
	if ( numberOfAllRounds != actualPageIdx )	{		
		removeRecursively(backButtonDiv.parentNode, backButtonDiv);
	}
	else if ( backButtonDiv.style && numberOfAllRounds != 1 )	{		
		var previousDivList = $x("./preceding-sibling::*", backButtonDiv);
		
		var previousDiv = previousDivList[previousDivList.length-1];
		
		var backButtonRef = $X("./a", backButtonDiv ); 
		
		var myBackLink = document.createElement('a');
		myBackLink.setAttribute('href', backButtonRef.getAttribute('href') );
		myBackLink.setAttribute('class', backButtonRef.getAttribute('class') );
		myBackLink.innerHTML = backButtonRef.innerHTML;
		
		var myBackButtonDiv = document.createElement('div');		
		myBackButtonDiv.style.display = 'inherit';
		myBackButtonDiv.style.width = backButtonDiv.style.width;
		myBackButtonDiv.style.height = backButtonDiv.style.height;
		myBackButtonDiv.style.float = 'right';
		myBackButtonDiv.style.textAlign = 'right';
		myBackButtonDiv.appendChild( myBackLink );
		previousDiv.appendChild( myBackButtonDiv );

		backButtonDiv.style.width = '1px';
		backButtonDiv.style.right = '1px';
		backButtonDiv.style.top = '1px';

		removeRecursively(backButtonDiv.parentNode, backButtonDiv);
	}	
	
	if ( needLocalDft )	{
		var dateDiv = $X("./../div[@id='rounds']/ul/li[@class='roundTime']", combatPage);
		dateDiv.innerHTML = getFormattedDate( dateDiv.innerHTML.replace(trimEverythingForDate, '' ) );
	}
}

function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}	while (obj = obj.offsetParent);		
	}
	return [curleft,curtop];	
}

function showInfoBox(event)	{
	try	{		
		var trg = event.currentTarget;
		var position = findPos(trg);		
		var infoBox = document.getElementById('infoBox');
		infoBox.style.left = position[0]+'px';
		infoBox.style.top = (position[1]+36)+'px';		
		infoBox.innerHTML = htmlCodes[trg.getAttribute('id')];
		infoBox.style.display = "block";									
	}
	catch ( err )	{
		myGM_Log( err );
	}
}

function getDivWithId( divArray, divIdStr )	{
	var c = divArray.length;
	var found = false;
	var i = 0;
	var res = null;
	while ( !found && i != c )	{
		res = divArray[i++];
		found = divIdStr == res.getAttribute('id');
	}
	return res;
}

function getFormattedDate( oldDate )	{
	var day = oldDate.split(' ')[0].split('.');
	var time = oldDate.split(' ')[1].split(':');
	
	if ( day.length != 3 && time.length < 2 )	{
		return oldDate;
	}
	
	var d = new Date(
		parseInt(day[2].replace(/^[0]/g,"")),
		parseInt(day[1].replace(/^[0]/g,"")) - 1,
		parseInt(day[0].replace(/^[0]/g,"")),
		parseInt(time[0]),
		parseInt(time[1].replace(/^[0]/g,"")),
		time.length == 3 ? parseInt(time[2].replace(/^[0]/g,"")) : 0,
	0
	);	
	return d.toLocaleString();
}

function setLocaDateFormat(needLocalDft)	{
	setGM_Value(LOCALIZED_DFT_VAR_NAME, needLocalDft);
}

function setLocaleDateFormatOn()	{
	setLocaDateFormat(true);
}

function setLocaleDateFormatOff()	{
	setLocaDateFormat(false);
}

function registerCommands()	{
	setMenuText();
	myGM_registerMenuCommand(SCRIPT_NAME + ': ' + SWITCH_LOCAL_DFT_ON, setLocaleDateFormatOn );
	myGM_registerMenuCommand(SCRIPT_NAME + ': ' + SWITCH_LOCAL_DFT_OFF, setLocaleDateFormatOff );
}

// Function to get language based on url and set menu variables

function setMenuText()	{	
	var urlString = self.location.href;	
	var urlPartsByDivChar = urlString.split('\/');
	var urlParts = urlPartsByDivChar[2].split('\.');
	var lang = urlParts[urlParts.length - 1];	
	if (lang == "com" && urlParts.length == 4) { //for example: http://s1.ba.ikariam.com
		lang = urlParts[1];
	}
	if (lang == "net" && urlParts.length == 3) { //for example: http://s1.ikariam.net/
		lang = "tr";
	}
	var langVal = langList[lang];
	if ( langVal == 'undefined' )	{
		lang = 'en';
	}
	
	switch (lang) {
	case 'hu' : 
		SWITCH_LOCAL_DFT_ON = 'Helyi dátumformátum bekapcsolása';
		SWITCH_LOCAL_DFT_OFF = 'Helyi dátumformátum kikapcsolása';
	break;
/*	
	case 'xx' : 
		SWITCH_LOCAL_DFT_ON = 'xx';
		SWITCH_LOCAL_DFT_OFF = 'xx';
	break;
*/	
	default : 
		SWITCH_LOCAL_DFT_ON = 'Switch on localized date format';
		SWITCH_LOCAL_DFT_OFF = 'Switch off localized date format';
	break;
	}	
}