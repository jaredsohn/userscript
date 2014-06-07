// ==UserScript==
// @name           Travian igm links
// @version        1.1
// @namespace      IL
// @description    web adresses linkables - v1.1
// @include        http://s*.travian*.*/dorf1.php*
// @include        http://s*.travian*.*/dorf2.php*
// @include        http://s*.travian*.*/dorf3.php*
// @include        http://s*.travian*.*/nachrichten.php*
// @include        http://s*.travian*.*/berichte.php*
// @include        http://s*.travian*.*/karte.php*
// @include        http://s*.travian*.*/a2b.php*
// @include        http://s*.travian*.*/allianz.php?s=2&t=*
// @include        http://s*.travian*.*/spieler.php*
// @include        http://s*.travian*.*/build.php*
// @include        http://s*.travian*.*/statistiken.php*
// ==/UserScript==
// Included pages: Dorfs, Msgs, Reports, inside other Villages, sendTroops[Confirmation], Ingame Alliance Forum, Profile Overview, Buildings, Statistics


// event listener starts things off once the page is done loading
window.addEventListener("load", function () {

//===========================================================================================================
//=======================================  Travian QP Timers  ===============================================
//===========================================================================================================
var V = QPcurrentTimeSecs();	// shouldn't this be in MILIS ?????
var l = new Object();
var O = 0;
//===========================================================================================================
//=======================================  Travian QP Timers  ===============================================
//===========================================================================================================




//   ==========   DEBUG STATICS   ==========
// 0 - GM_log ; else NOTHING
var DEBUG_STATE_PRODUCTION = -1;
var DEBUG_STATE_GM_LOG = 0;

var DBG_HIGHEST = 1;
var DBG_HIGH = 2;
var DBG_NORMAL = 3;
var DBG_LOW = 4;
var DBG_LOWEST = 5;

var DEBUG_STATE = DEBUG_STATE_GM_LOG;
var DEBUG_VERBOSITY = DBG_HIGHEST;

GM_log("START: DEBUG_STATE " + DEBUG_STATE + " DEBUG_VERBOSITY " + DEBUG_VERBOSITY);
//   ==========   DEBUG STATICS   ==========


var DEF_CATATARGET_RANDOM = 99;
var DEF_CATATARGET_NONE = 0;

var DEF_ATTACKTYPE_REINFORCE = 2;
var DEF_ATTACKTYPE_ATTACK = 3;
var DEF_ATTACKTYPE_RAID = 4;

var DEF_SCOUTTYPE_RESOURCES = 1;
var DEF_SCOUTTYPE_DEFENSES = 2;

var DEF_UNDERSCORE = "_";
// Keys that depend on villageId or some other info have the underscore, others use the one from the prefix
var DEF_PARTIALPERMANENTMKEY_INSTANTTROOPMOVE = DEF_UNDERSCORE + "instantTroopsMove";
var DEF_PARTIALPERMANENTMKEY_VILLAGEREPORTINFO = DEF_UNDERSCORE + "villageReportInfo";
var DEF_PARTKEY_INFO_DORF1 = DEF_UNDERSCORE + "infoDorf1";
var DEF_PARTKEY_INFO_DORF2 = DEF_UNDERSCORE + "infoDorf2";
var DEF_PARTKEY_UNDER_CONSTRUCTION = DEF_UNDERSCORE + "underConstruction";


/** wood, clay, iron, crop */
var g_res_now = new Array(4);
var g_res_prod = new Array(4);
var g_res_max  = new Array(4);


/** retrieveResourcesInfo */
function retrieveResourcesInfo() {
	for(var i=0; i<4; i++) {
		var resourceNode = document.getElementById("l" + (4-i));
		var resourceNowMaxParts = resourceNode.innerHTML.split("/");
		g_res_now[i] = resourceNowMaxParts[0];
		g_res_max[i] = resourceNowMaxParts[1];
		g_res_prod[i] = resourceNode.title;
	}
}



function main() {
	debug(DBG_HIGHEST, "[-] MAIN ");
	createAllCSSs();

	if (isThisPageTravianTeamMessagePage()) {
		debug(DBG_HIGHEST, "[-][isTravianTeamMessagePage]");
		retrieveTravianTeamMessage();
	}


	retrieveResourcesInfo();



	// All single village and village list creation is inside here
	if (!isVillageListPresent()) {
		debug(DBG_HIGHEST, "[-][!isVillageListPresent]");
		if (isThisPageProfile()) {
			debug(DBG_HIGHEST, "[-][isThisPageProfile]");
			if (isThisPageMyProfile()) {
				debug(DBG_HIGHEST, "[-][isThisPageMyProfile]");
				findAndSaveSingleVillageInfo();
			}
		}
		if (isThisPageDorf3()) {
			debug(DBG_HIGHEST, "[-][isPageDorf3]");
			findAndSaveSingleVillageInfo();
		}
		transformPageAllPages_addVillagesList();
	}



	if (CONFIG_FEATURE_VILLAGE_TARGETS) {
		// QP Targets - created on all pages except...
		if (!	(
					isThisPageSendTroopsConfirmation() ||
					isThisPageRallyPoint() ||
					isThisPageAnyBuildingPage() ||
					isThisPageWWStatistics()
				)
			) {
				debug(DBG_HIGHEST, "[-]NOT: SendTroopsConfirmation, isPageRallyPoint, AnyBuildingPage");
				transformGeneric_findTargetsToCreateTargetLinks();
		}
	}


	if (isThisPageAnyIGMPage()) {
		debug(DBG_HIGHEST, "[-][isThisPageIGM]");
		if (isThisPageIGM()) {
			debug(DBG_HIGHEST, "[-][isThisPageIGM]");
			transformPageIGM_createLinks();
		}
		if (isThisPageIGMList()) {
			debug(DBG_HIGHEST, "[-][isThisPageIGMList]");
			transformPageIGMsList_addSelectAllCheckbox();
			transformGeneric_addAction_spaceShortcutKeyGoesToNextPage();
		}

	} else if (isThisPageAnyReportPage()) {		debug(DBG_HIGHEST, "[-][isThisPageAnyReportPage]");

		if (isThisPageReportReinf()) {			debug(DBG_HIGHEST, "[-][isThisPageReportReinf]");

			retrieveReportReinf_AppendToQPClipboard();
		}

		if (isThisPageReportAttackScout()) {	debug(DBG_HIGHEST, "[-][isPageReportAttackScout]");
			transformPageScoutReport_createQuickFarmInputs();
		}

		if (isThisPageAnyReportList()) {		debug(DBG_HIGHEST, "[-][isPageAnyReportList]");

			transformPageReportList_addSelectAllCheckbox();
			if (isToDeleteReportsOfGivenType()) {
				actionPageReportsTradeList_deleteAllReportsOfGivenType();
			}
			transformPageReportList_addDeleteByReportTypeButtons();
			transformGeneric_addAction_spaceShortcutKeyGoesToNextPage();
		}
		/*if (isPageReportAttack(document.location.href)) {
			debug(DBG_HIGHEST, "[-][isPageReportAttack]");
			getInfoPageAttackReport_getDateInfo();
		}*/

	} else if (isThisPageAnyAlliancePage()) {
		debug(DBG_HIGHEST, "[-][isThisPageAnyAlliancePage]");

		if (isThisPageAllianceForumMsgs()) {
			debug(DBG_HIGHEST, "[-][isPageAllianceForumMsgs]");
			transformPageAllianceForumMsgs_createLinks();
			debug(DBG_HIGHEST, "[-][isPageAllianceForumMsgs] end of");
		}

	} else if (isThisPageAnySendTroopsPage()) {
		debug(DBG_HIGHEST, "[-][isThisPageAnySendTroopsPage]");

		if (isThisPageSendTroops()) {
			debug(DBG_HIGHEST, "[-][isThisPageSendTroops]");

			savePermanentMyTribe();

			if (isToMoveTroopsToThisVillage(document.location.href)) {
				debug(DBG_HIGHEST, "[-][isPageSendTroops][isToMoveTroopsToThisVillage]");
				var ret = actionPageSendTroops_universalTroopsMove();
				if (ret) { return; }
			}

			transformGeneric_addAutoCompleteFromPlus();
		}

		if (isThisPageSendTroopsConfirmation()) {
			debug(DBG_HIGHEST, "[-]isThisPageSendTroopsConfirmation");
			var villageLinks = xpathEvaluate('//a[contains(@href, "karte.php?d=")]');

			if (isToMoveTroopsToThisVillage(villageLinks.snapshotItem(0).href)) {
				debug(DBG_HIGHEST, "[-][isPageSendTroopsConfirmation][isToMoveTroopsToThisVillage]");
				actionPageSendTroopsConfirmation_universalTroopsMove(villageLinks.snapshotItem(0).href);
				return;
			} else {
				// no action, then transform page
				transformPageSendTroopsConfirm_addTimeOffArrivalSync();
			}
		}

	} else if (isThisPageAnyBuildingPage()) {
		debug(DBG_HIGHEST, "[-][isThisPageAnyBuildingPage]");

		if (isThisPageRallyPoint()) {
			debug(DBG_HIGHEST, "[-][isPageRallyPoint]");
			getInfoRallyPoint_ReinforcementsLang();
			getInfoRallyPoint_CreateIncomingAttacksReport();
			transformPageRallyPoint_addOwnTownTotalTroopsTable();
			transformPageRallyPoint_addLinksForTroopGroups();
			transformPageRallyPoint_addCoordsForOwnVillageReinfsAway();

		} else if (isThisPageMarketPlaceSendResources()) {

			debug(DBG_HIGHEST, "[-][isThisPageMarketPlaceSendResources]");
			lang_get_market_sendResources_MerchantGroupTitles();
			transformPageMarketplaceSendResources_addTimeToOverflowOrDepletion();
			transformPageMarketplaceSendResources_addMerchantsUsed();
			transformPageMarketplaceSendResources_addExtraQuantities();
			transformPageMarketplaceSendResources_addCumulativeArrivals();
			transformGeneric_addAutoCompleteFromPlus();

		} else if (isThisPageMarketPlaceSendResourcesConfirmation(true)) {

			debug(DBG_HIGHEST, "[-][isThisPageMarketPlaceSendResourcesConfirmation]");
			transformPageMarketplaceSendResourcesConfirmation_focusOnOkButton();

		} else if (isThisPageHeroMansionPage()) {

			debug(DBG_HIGHEST, "[-][isThisPageHeroMansionPage]");
			transformPageHeroMansion_addHeroLevelInfo();

		} else if (isThisPageTreasuryPage()) {

			debug(DBG_HIGHEST, "[-][isThisPageTreasuryPage]");
			transformPageTreasury_addCoordsForConstructionPlanHolderVillages();

		} else if (isThisPageAnyResidenceOrPalacePage()) {
			
			debug(DBG_HIGHEST, "[-][isThisPageAnyResidenceOrPalacePage]");

			if (isThisPageResidenceOrPalaceCulturePointsPage()) {
				
				debug(DBG_HIGHEST, "[-][isThisPageResidenceOrPalacePageCulturePointsPage]");
				transformPageResidenceOrPalaceCulturePoints_addCPsForVillages();
			}

		}

	} else if (isThisPageDorf2()) {
		debug(DBG_HIGHEST, "[-][isThisPageDorf2]");

		retrievePageDorf1Or2_langLevel();
		retrievePageDorf2_Info();
		transformPageDorf2_addBuildingLevels();

	} else if (isThisPageDorf1()) {
		debug(DBG_HIGHEST, "[-][isThisPageDorf1]");

		retrievePageDorf1Or2_langLevel();
		retrievePageDorf1_FieldsNamesLang();
		retrievePageDorf1_Info();
		transformPageDorf1_addColorsToResourceFieldsLevels();

	} else if (isThisPageVillage()) {
		debug(DBG_HIGHEST, "[-][isThisPageVillage]");

		if (isToMoveTroopsToThisVillage(document.location.href)) {
			debug(DBG_HIGHEST, "[-][isPageVillage][isToMoveTroopsToThisVillage]");
			actionPageGeneric_followFirstSendTroopsLink();
			return;
		}

	} else if (isThisPageAnyStatisticsPage()) {
		debug(DBG_HIGHEST, "[-][isThisPageAnyStatisticsPage]");

		if (isThisPageWWStatistics()) {
			debug(DBG_HIGHEST, "[-][isThisPageWWStatistics]");

			transformPageWWStatistics_addCoordsForWWVillages();
		}

	} else if (isThisPageProfile()) {
		debug(DBG_HIGHEST, "[-][isThisPageProfile]");

		if (isThisPageMyProfile()) {
			debug(DBG_HIGHEST, "[-][isThisPageMyProfile]");

			retrieveMyProfile_Capital();
		}
	}
	
	


	transformGenericPage_fixTitle();
//	transformGeneric_addQPConfigurationMenu();
	if (CONFIG_FEATURE_RESOURCES_INFO) {
		transformGeneric_addOverflowDepleteTimes();
	}

	// Start the timers
	QPTimersCollect();
	QPTimersUpdate();
}


/**
* transformPageGeneric_addBuildTime
*/
function transformPageGeneric_addBuildTime() {


}








//===========================================================================================================
//===========================================================================================================
//========================================  MISCELANEOUS  ===================================================
//===========================================================================================================
//===========================================================================================================







/**
* Adds a style to the page
*/
function addCSS(cssString) {
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = cssString;
	document.getElementsByTagName('head')[0].appendChild(style);
}

/**
* Creates styles to be used throughout this script.
*/
function createAllCSSs() {
	cssString = '.QPpopup{' +
		'background-color:white;' +
//		'border:thin solid #000000;' +
//		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
//		'font-size:8pt;' +
//		'font-weight:bold;' +
		'padding-bottom:3px;' +
		'padding-left:3px;' +
		'padding-right:3px;' +
		'padding-top:3px;' +
		'position:absolute;' +
//		'visibility:hidden;' +
		'display:none' +
		'z-index:200;}';
	addCSS(cssString);
	addCSS('.QPnowrap{white-space:nowrap;}');
	cssString = '.QPsmall{' +
		'background-color:white;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'font-weight:bold;' +
		'padding-bottom:3px;' +
		'padding-left:3px;' +
		'padding-right:3px;' +
		'padding-top:3px;' +
		'}';
	addCSS(cssString);
	cssString = '.QPsmallTxt{' +
		'background-color:white;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'}';
	cssString = '.QPcoords{' +
		'background-color:white;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'color:lightgrey;' +
		'}';
	addCSS(cssString);
	cssString = '.QPcoords2{' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'color:grey;' +
		'}';
	addCSS(cssString);
	var cssString = '.QPbuildingLevel{' +
		'background-color:#FDF8C1;' +
		'border:thin solid #000000;' +
		'-moz-border-radius:2em;' +
		'border-radius:2em;' +
		'padding-top:3px;' +
		'font-family: Verdana, Arial, Helvetica, sans-serif;' +
		'font-size:8pt;' +
		'font-weight:bold;' +
		'color:black;' +
		'text-align:center;' +
		'position:absolute;' +
		'width:18px;' +
		'height:15px;' +
		'cursor:pointer;' +
		'visibility:hidden;' +
		'z-index:50;}';
	addCSS(cssString);
	var cssString = '#QPD1BL{' +
		'position:absolute;' +
		'top:71px;' +
		'left:13px;' +
		'z-index:20;}';
	addCSS(cssString);
	var cssString = '#QPD2BL{' +
		'position:absolute;' +
		'top:60px;' +
		'left:25px;' +
		'z-index:50;}';
	addCSS(cssString);
	var cssString = '.QPdorf1BuildingLevel{' +
		'opacity:0.25;' +
		'-moz-border-radius:4em;' +
		'border-radius:4em;' +
		'position:absolute;' +
		'width:22px;' +
		'height:20px;' +
		'visibility:hidden;' +
		'z-index:50;}';
	addCSS(cssString);
	var cssString = '.QPresources{' +
		'font-size:7pt;' +
		'color:#909090;' +
		'text-align:left;' +
		'position:absolute;' +
		'top:13px;' +
		'height:20px;' +
		'}';
	addCSS(cssString);


}




//===========================================================================================================
//===========================================================================================================
//==============================  Travian Rally Point extra info functions  =================================
//===========================================================================================================
//===========================================================================================================



/**
* getInfoRallyPoint_CreateIncomingAttacksReport
*/
function getInfoRallyPoint_CreateIncomingAttacksReport() {
	var reinfsWord = loadPermanentLang_Reinforcements();
	if (reinfsWord == undefined) { return; }

	debug(DBG_NORMAL, "[getInfoRallyPoint_CreateIncomingAttacksReport]  ");
	var activeVillageCoordZ = getActiveVillageCoordZ();

	debug(DBG_NORMAL, "[getInfoRallyPoint_CreateIncomingAttacksReport] activeVillageCoordZ " + activeVillageCoordZ);

	var txt = "";
	txt += getActiveVillageNameAndCoords() + " ";
	var cropName = xpathEvaluate('//img[@class = "res"][contains(@src, "img/un/r/4.gif")][@title]');
	txt += cropName.snapshotItem(0).title + ": ";

	txt += g_res_now[3] + "/" + g_res_max[3] + " " + ((g_res_prod[3] >= 0) ? "+" : "") + g_res_prod[3];
	txt += "\nhttp://speed.travian.com/karte.php?z=" + activeVillageCoordZ;

	// selects tables for moving troops that aren't from this city (the reinfs are filtered out in the for cycle)
	var incomingAttacksTables = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td/table/tbody/tr/td[1][not(img)]/../../../../../../../tbody/tr[1]/td[1]/a[not(contains(@href, ' + activeVillageCoordZ + '))]/../../..');

	for(var i=0; i<incomingAttacksTables.snapshotLength; i++) {
		var currentTable = incomingAttacksTables.snapshotItem(i);
		var currentTableRow0 = currentTable.rows[0];
		if (currentTableRow0.cells[1].innerHTML.indexOf(reinfsWord) != 0) {
			txt += "\n" + removeAllTags(currentTableRow0.cells[0].innerHTML);
			txt += " " + currentTableRow0.cells[1].innerHTML;
			var currentTableRow3 = currentTable.rows[3];
			txt += "\n" + removeAllTags(currentTableRow3.cells[0].innerHTML);
			txt += " " + removeAllTags(currentTableRow3.cells[1].innerHTML).replace(/(\n|&nbsp;)/g, "");
		}
	}
	debug(DBG_HIGHEST, "[getInfoRallyPoint_CreateIncomingAttacksReport] txt \n" + txt);
	// ??????????????????????????????????

	var overviewSendWarsimParagraph = xpathEvaluate('//div[@id="lmid2"]/p[@class="txt_menue"]').snapshotItem(0);
	overviewSendWarsimParagraph.appendChild(document.createTextNode(" | "));
	var defReport = createElemAppendAndSetInner("a", overviewSendWarsimParagraph, '<img src="img/un/a/def2.gif" />');
	defReport.addEventListener('click',	function() {
		debug(DBG_NORMAL, "[getInfoRallyPoint_CreateIncomingAttacksReport] QPCreateDefReport");
//		savePermanentReportsAction(DEF_ACTION_DELETE_TRADE);
		debug(DBG_NORMAL, "[getInfoRallyPoint_CreateIncomingAttacksReport] tradeLink.snapshotItem(0).href " + tradeLink.snapshotItem(0).href);
//		document.location.href = tradeLink.snapshotItem(0).href;
	}, true);
}




/**
* getInfoRallyPoint_ReinforcementsLang
*/
function getInfoRallyPoint_ReinforcementsLang() {
	debug(DBG_NORMAL, "[getInfoRallyPoint_ReinforcementsLang] ");
	var activeVillageCoordZ = getActiveVillageCoordZ();

	debug(DBG_NORMAL, "[getInfoRallyPoint_ReinforcementsLang] activeVillageCoordZ " + activeVillageCoordZ);

	// selects tables of reinforcements (consuming crop), that are of troops from this town (so own troops away)
	var ownReinfsAwayTables = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td/table/tbody/tr/td/img[@class = "res"]/../../../../../../../../tbody/tr/td/a[contains(@href, ' + activeVillageCoordZ + ')]/../../td[2]/a/span[@class = "c0"]');
	if (ownReinfsAwayTables.snapshotLength > 0) {
		var txt = ownReinfsAwayTables.snapshotItem(0).innerHTML;
		txt = txt.split(" ")[0];
		savePermanentLang_Reinforcements(txt);
	}
}


/**
* savePermanentLang_Reinforcements
*/
function savePermanentLang_Reinforcements(txt) {
	GM_EscapeAndSave(createPermanentKeyForLangReinforcements(), txt);
}

/**
* loadPermanentLang_Reinforcements
*/
function loadPermanentLang_Reinforcements() {
	return GM_LoadAndUnescape(createPermanentKeyForLangReinforcements());
}

/**
* createPermanentKeyForLangReinforcements
* Creates a key for permanent storing the word for reinforcements as used in the Rally Point.
* The key is of this format: <server>_<userId>_lang_reinforcements
*/
function createPermanentKeyForLangReinforcements() {
	return DEF_PARTKEY_PREFIX + DEF_PARTIALPERMANENTMKEY_LANG_REINFORCEMENTS;
}






/**
* transformPageRallyPoint_addOwnTownTotalTroopsTable
* Simplifies rally point page by adding a table with the total troops own'ed by this town, no matter
* where they are currently. This avoids checking multiple locations to see own many troops this town has.
* Troops that go or are already in an oasis owned by the current town, cannot be counted on the oasis because
* they already at the "on the way" or the "in other villages" groups.
*/
function transformPageRallyPoint_addOwnTownTotalTroopsTable() {
	debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] ");
	var activeVillageCoordZ = getActiveVillageCoordZ();

	debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] activeVillageCoordZ " + activeVillageCoordZ);

	// selects tables with troops from current town OR the oasis titles
	var ownTroopsTables = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td/a[contains(@href, ' + activeVillageCoordZ + ')]/../../../..|//div[@id="lmid2"]/p[@class="b f16"]');

	debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] ownTroopsTables.snapshotLength " + ownTroopsTables.snapshotLength);
	if (ownTroopsTables.snapshotLength > 0) {
		var newTable = ownTroopsTables.snapshotItem(0).cloneNode(true);
		var newTableTitleRow = newTable.rows[0];
		var newTableIconsRow = newTable.rows[1];
		var newTableTroopsRow = newTable.rows[2];

		debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] BEfor");
		for(var i=1, len=ownTroopsTables.snapshotLength; i<len; i++) {	// table 0 is the cloned one above
			var currentTable = ownTroopsTables.snapshotItem(i);

			// doesn't count on oasis to not double count
			if (currentTable.nodeName == "P") { break; }

			var currentTroopsCells = xpathEvaluateInContext(currentTable, 'tbody/tr[3]').snapshotItem(0);
			debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] i "+i+" currentTroopsCells.snapshotLength " + currentTroopsCells.snapshotLength);

			// creates the hero column in case it wasn't in the "totals" table but the hero belongs to this town now
			if (currentTroopsCells.cells.length == 12) {
				// clone the hero icon cell
				var currentTroopsHeroIconCell = xpathEvaluateInContext(currentTable, 'tbody/tr[2]/td[12]').snapshotItem(0);
				newTableIconsRow.appendChild(currentTroopsHeroIconCell.cloneNode(true));
				// create the hero amount cell (with 0 amount, it will be added as normal)
				var newHeroAmountCell = currentTroopsCells.cells[11].cloneNode(true);
				newHeroAmountCell.innerHTML = 0;
				newTableTroopsRow.appendChild(newHeroAmountCell);
			}

			debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] adding troops");
			// ADDS UP THE TROOPS
			for(var j=1; j<currentTroopsCells.cells.length; j++) {	// cell 0 has the word "troops"
				newTableTroopsRow.cells[j].innerHTML = parseInt(newTableTroopsRow.cells[j].innerHTML) + parseInt(currentTroopsCells.cells[j].innerHTML);
			}
		}
		debug(DBG_NORMAL, "[transformPageRallyPoint_addOwnTownTotalTroopsTable] greying totals");
		// make the totals 0s greyed out and the non-0s non-grayed out
		for(var j=1; j<newTableTroopsRow.cells.length; j++) {	// cell 0 has the word "troops"
			newTableTroopsRow.cells[j].className = (newTableTroopsRow.cells[j].innerHTML == 0) ? "c" : "";
		}
		// change the title row
		var newTableTitleCell = newTableTitleRow.cells[0];
		newTableTitleRow.innerHTML = "";
		newTableTitleRow.appendChild(newTableTitleCell);
		newTableTitleCell.colSpan = 0;
		// remove all and re-insert the 1st 3 rows - removes the upkeep/arrival row
		newTable.innerHTML = "";
		newTable.appendChild(newTableTitleRow);
		newTable.appendChild(newTableIconsRow);
		newTable.appendChild(newTableTroopsRow);
		// add the newly created table with the totals
		var paragraph = xpathEvaluate('//div[@id="lmid2"]/p[@class="f10"]').snapshotItem(0);
		paragraph.parentNode.insertBefore(newTable, paragraph.nextSibling);
	}
}



/**
* transformPageRallyPoint_addCoordsForOwnVillageReinfsAway
* Adds coordinates of the villages being reinf'ed - very usefull for oasis among others
*/
function transformPageRallyPoint_addCoordsForOwnVillageReinfsAway() {
	var ownReinfsLinks = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr[1]/td[@class="b"]/a');
	for(var i=0; i<ownReinfsLinks.snapshotLength; i++) {
		var currentLink = ownReinfsLinks.snapshotItem(i);
		var coordZ = getParamFromUrl(currentLink.href, "d");
		var readableCoords = coordZToXYReadableString(coordZ);
		currentLink.firstChild.innerHTML += " " + "<span class='QPcoords2'>" + readableCoords + "</span>";
	}
}


/**
* transformPageRallyPoint_addLinksForTroopGroups
* Simplifies rally point page by adding links to each troop group (reinfs, troops going, troops away, ...)
*/
function transformPageRallyPoint_addLinksForTroopGroups() {
	var otherTroopGroups = xpathEvaluate('//div[@id="lmid2"]/p[@class="b"]|//div[@id="lmid2"]/p[@class="b f16"]|//div[@id="lmid2"]/p/b');

	var addedLinks = "";
	var skipNext = false;
	for(var i=0; i<otherTroopGroups.snapshotLength; i++) {
		var currentGroup = otherTroopGroups.snapshotItem(i);
		if (skipNext) {
			skipNext = false;
			continue; // skipping
		} else {
			if (currentGroup.className == "b f16") {
				// oasis - needs to skip the next text which is still refering to the oasis but has no coords
				skipNext = true;
			}
		}
		addedLinks += '<a href="#'+i+'">'+currentGroup.innerHTML+'</a><br/>';
		currentGroup.innerHTML += '<a name="'+i+'" />';
	}

	for(var i=0; i<otherTroopGroups.snapshotLength; i++) {
		var currentGroup = otherTroopGroups.snapshotItem(i);
		if (currentGroup.className == "b f16") {
			continue;	// skip the oasis, put the links in the next description which is still for the oasis
		}
		currentGroup.innerHTML = addedLinks + currentGroup.innerHTML;
	}
}



/**
* createUniversalTroopsMove
*/
function createUniversalTroopsMove(troop1, troop2, troop3, troop4, troop5, troop6,
								troopRams, troopCatas, troopSenator, troopSettler, troopHero,
								attackType, scoutType, catapultTarget1, catapultTarget2) {
	// check validity of attackType/scoutType/catapultTargets
	if ((attackType<2) || (attackType>4)) { GM_log("Invalid attack type"); throw "Invalid attack type"; }
	if ((scoutType<1) || (scoutType>2)) { GM_log("Invalid scout type"); throw "Invalid scout type"; }
	checkValidCatapultTarget(catapultTarget1);
	checkValidCatapultTarget(catapultTarget2);

	var arr = [troop1, troop2, troop3, troop4, troop5, troop6, troopRams, troopCatas, troopSenator,
				troopSettler, troopHero, attackType, scoutType, catapultTarget1, catapultTarget2];

	return arrayToXML(arr);
}

function checkValidCatapultTarget(cataTarget) {
	if ((cataTarget<0) ||  (cataTarget>99)) { throw "Invalid catapult target. id: " + cataTarget; }
	if ((cataTarget>30) &&  (cataTarget<37)) { GM_log("Catapult target not allowed. id: " + cataTarget); }
	if ((cataTarget>37) &&  (cataTarget<99)) { GM_log("Catapult target not allowed. id: " + cataTarget); }
}





//===========================================================================================================
//===========================================================================================================
//==============================  Travian Replace Coords by Links functions  ================================
//===========================================================================================================
//===========================================================================================================


var DEF_GRAPHIC_PACK_ACTIVE;
var DEF_GRAPHIC_PACK_PREFIX;


function transformPageAllianceForumMsgs_createLinks() {
	getGraphicPackPathPrefix();
	var msgTxtFields = xpathEvaluate('//td[@class = "row11"]');
	for(var index=0; index<msgTxtFields.snapshotLength; index++) {
		transformGeneric_replaceAllCoordsByLink(msgTxtFields.snapshotItem(index));
		transformGeneric_replaceUriByLink(msgTxtFields.snapshotItem(index));
	}
}

function transformPageIGM_createLinks() {
//	var msgTxtFields = xpathEvaluate('//td[@background="img/en/msg/underline.gif"]');
	var msgTxtFields = xpathEvaluate('//td[contains(@background, "/msg/underline.gif")]');
	for(var index=0; index<msgTxtFields.snapshotLength; index++) {
		transformGeneric_replaceAllCoordsByLink(msgTxtFields.snapshotItem(index));
		transformGeneric_replaceUriByLink(msgTxtFields.snapshotItem(index));
	}
}


function getGraphicPackPathPrefix() {
	var woodImgUrl = "img/un/r/1.gif";
	var graph = xpathEvaluate('//img[contains(@src, "img/un/r/1.gif")]');
	if (graph.snapshotLength > 0) {
		var imgSrc = graph.snapshotItem(0).src;
		DEF_GRAPHIC_PACK_ACTIVE = imgSrc.length > woodImgUrl.length;
		DEF_GRAPHIC_PACK_PREFIX = imgSrc.replace(woodImgUrl, "").replace("///", "//");
	}
}

function transformGeneric_replaceUriByLink(txtNode) {
	var res = txtNode.innerHTML.replace(/\w+:\/\/[^\s<]+/g, replaceUriByLink);
	txtNode.innerHTML = res;
}
function replaceUriByLink(match) {
	if (DEF_GRAPHIC_PACK_ACTIVE) {
		if (match.indexOf(DEF_GRAPHIC_PACK_PREFIX) > -1) {
			return match;
		}
	}
	return "<a href='" + match + "'>" + match + "</a>";
}



function transformGeneric_replaceAllCoordsByLink(txtNode) {
	var res = txtNode.innerHTML.replace(/-?\d+\|-?\d+/g, replaceCoordsByLink);
	txtNode.innerHTML = res;
}


function replaceCoordsByLink(match) {
	var arrMatch = match.split("|", 2);
	var coord = coordsXYToZ(parseInt(arrMatch[0]), parseInt(arrMatch[1]));
	return "<a href='karte.php?z=" + coord + "'>" + match + "</a>";
}


//===========================================================================================================
//===========================================================================================================
//==========================================  Travian URL functions  ========================================
//===========================================================================================================
//===========================================================================================================





/** isThisPageTravianTeamMessagePage */
function isThisPageTravianTeamMessagePage() {
	//http://speed.travian.com/dorf1.php?ok
	var msgOk = xpathEvaluate('//a[contains(@href, "?ok")]');
	return (msgOk.snapshotLength > 0);
}


/** isThisPageTravianTeamMessagePage_ConstructionPlans */
function isThisPageTravianTeamMessagePage_ConstructionPlans() {
	// UNTESTED - this is hard to test since it only happens once per round
	if (isThisPageTravianTeamMessagePage()) {
		// the image also contained: style="float: right; padding-left: 10px;"
		var treasuryImage = xpathEvaluate('//div[@id="lmid2"]/img[contains(@src, "gid27.gif")]');
		return (treasuryImage.snapshotLength > 0);
	}
	return false;
}




// ========================================================
// =====   Travian URL functions - IGM Pages          =====
// ========================================================

/** Is the page any IGM page (IGM or IGM List) */
function isThisPageAnyIGMPage() { return (isPageAnyIGMPage(document.location.href)); }
function isPageAnyIGMPage(url) { return (url.search(/nachrichten\.php/) != -1); }

/** Is the page a single IGM page */
function isThisPageIGM() { return (isPageIGM(document.location.href)); }
function isPageIGM(url) { return ( (url.search(/nachrichten\.php\?id=/) != -1) || (url.search(/nachrichten\.php\?.+\&id=/) != -1) ); }

/** Is the page the IGM list page */
function isThisPageIGMList() { return (isPageIGMList(document.location.href)); }
function isPageIGMList(url) {
	if (isPageAnyIGMPage(url)) {
		var idParam = getParamFromUrl(url, "id");
		if (!idParam) {
			var tableIGMs = xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]');
			if (tableIGMs.snapshotLength > 0) {
				return true;
			}
		}
	}
	return false;
}


//===========================================================================================================
//===========================================================================================================
//=======================================  Travian Coordinates functions  ===================================
//===========================================================================================================
//===========================================================================================================



/**
* coordsXYToZ
*
* @param {int} x The X coordinate of a map location.
* @param {int} y The Y coordinate of a map location.
*
* @return The absolute coordinate of a town / abandoned valley / oasis.
*/
function coordsXYToZ(x, y) {
	var coordZ = (x + 401) + ((400 - y) * 801);
	return coordZ;
}


/**
* coordZToX
*
* @param {int} z The absolute coordinate of a town / abandoned valley / oasis.
*
* @return The X coordinate of the map location indicated by Z.
*/
function coordZToX(z) {
	var x = ((z - 1) % 801) - 400;
	return x;
}


/**
* coordZToY
*
* @param {int} z The absolute coordinate of a town / abandoned valley / oasis.
*
* @return The Y coordinate of the map location indicated by Z.
*/
function coordZToY(z) {
	var y = 400 - (parseInt(((z - 1) / 801)));
	return y;
}


/**
* coordZToXYReadableString
*
* @param {int} z The absolute coordinate of a town / abandoned valley / oasis.
*
* @return A string containing the normal in-game readable coordinates: "(X|Y)".
*/
function coordZToXYReadableString(z) {
	res = "(" + coordZToX(z) + "|" + coordZToY(z) + ")";
	return res;
}

/**
* globeDistance - indicates the minimum distance between 2 X coordinates or 2 Y coordinates
* taking into account the fact that -400 and 400 are next to each other
*/
function globeDistance(a, b) {
	var dist1 = (a > b) ? Math.abs(a-b) : Math.abs(b-a);
	var dist2 = (a > b) ? (Math.abs(400-a)+Math.abs(-400-b)) : (Math.abs(400-b)+Math.abs(-400-a));
	var distFinal = (dist1 < dist2) ? dist1 : dist2;

	return distFinal;
}


/**
* coordDistXYtoXY - calculates the distance between 2 villages in the map
*/
function coordDistXYtoXY(x1, y1, x2, y2) {
	var distX = globeDistance(x1, x2);
	var distY = globeDistance(y1, y2);
	var dist = Math.sqrt((distX*distX) + (distY*distY));
//	debug(DBG_LOW, "[coordDistXYtoXY] x1 "+x1+" y1 "+y1+" x2 "+x2+" y2 "+y2+" distX "+distX+" distY "+distY+" dist "+dist);

	return dist;
}





//===========================================================================================================
//===========================================================================================================
//=======================================  Travian Generic functions  =======================================
//===========================================================================================================
//===========================================================================================================


/**
* getActiveTownLink
*/
function getActiveTownLink() {
	var activeVillageLink = xpathEvaluate('//a[@class="active_vl"]');
	return activeVillageLink.snapshotItem(0);
}


/**
* getActiveVillageNameAndCoords
*/
function getActiveVillageNameAndCoords() {
	var activeVillageLink = xpathEvaluate('//a[@class="active_vl"]');
	var activeVillageCoords = xpathEvaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td');
	var txt = activeVillageLink.snapshotItem(0).innerHTML + " " +
				activeVillageCoords.snapshotItem(0).innerHTML +
				activeVillageCoords.snapshotItem(1).innerHTML +
				activeVillageCoords.snapshotItem(2).innerHTML;
	return txt;
}


/**
* getActiveTownId
*/
function getActiveTownId() {
	var activeTownLink = getActiveTownLink();
	return getParamFromUrl(activeTownLink.href, "newdid");
}



/**
* isVillageListPresent
*/
function isVillageListPresent() {
	var activeVillageLink = xpathEvaluate('//a[@class="active_vl"]');
	return (activeVillageLink.snapshotLength > 0);
}





/**
* getActiveVillageCoordZ
*/
function getActiveVillageCoordZ() {
	var activeVillageLink = xpathEvaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td');
	var coordXCurrentActiveVillage = -10000;
	var coordYCurrentActiveVillage = -10000;
	if (activeVillageLink.snapshotLength > 0) {
		coordXCurrentActiveVillage = parseInt(activeVillageLink.snapshotItem(0).innerHTML.replace("(", ""));
		coordYCurrentActiveVillage = parseInt(activeVillageLink.snapshotItem(2).innerHTML.replace(")", ""));
	}
	return coordsXYToZ(coordXCurrentActiveVillage, coordYCurrentActiveVillage);
}


/**
* createRightSideVillagesList
* To create the village list in case there is none (1 village accounts).
* Since there are no more villages it is pointless to change village so "newdid" is omitted,
* and the link is to the page where you already are. newdid could be obtained from dorf3 page.
*/
function createRightSideVillagesList(newdid, villageName, coordX, coordY) {
	var DEF_CHAR_SELECTEDVILLAGEBULLET = unescape('%u2022');
	var rightSideVillageList = document.createElement('div');
	rightSideVillageList.id = "lright1";
	rightSideVillageList.innerHTML = '<a href="dorf3.php"><span class="f10 c0 s7 b">Villages:</span></a>' +
	'<table class="f10"><tbody><tr>' +
		'<td class="nbr"><span class="c2">'+DEF_CHAR_SELECTEDVILLAGEBULLET+'</span>&nbsp; <a href="?newdid='+newdid+'" class="active_vl">'+villageName+'</a></td>' +
		'<td class="right"><table class="dtbl" cellpadding="0" cellspacing="0"><tbody><tr>' +
			'<td class="right dlist1">('+coordX+'</td><td class="center dlist2">|</td><td class="left dlist3">'+coordY+')</td>' +
			'</tr></tbody></table>' +
		'</td>' +
		'</tr></tbody>' +
	'</table>';
	return rightSideVillageList;
}







//===========================================================================================================
//===========================================================================================================
//=======================================  Travian QP Timers  ===============================================
//===========================================================================================================
//===========================================================================================================


/** Gets the time in miliseconds */
function QPcurrentTimeMilis() { return new Date().getTime(); }

/** Gets the time in seconds */
function QPcurrentTimeSecs() { return Math.round(QPcurrentTimeMilis()/1000); }



/**
* QPTimersUpdate - Updates the timers.
*/
function QPTimersUpdate() {
//	debug(DBG_LOWEST, "[QPtimerUpdater]");
/*	for(i in m){
		//Calculates the "offset" of the time in the page now and the page when it was loaded... in seconds!!
		o = QPcurrentTimeSecs() - V;
		// stringifies the time PLUS the offset to create the new time
		U = timeInSecondsToColonSeparatedTxt(m[i].D + o);
		// updates the server time
		m[i].ad.innerHTML = U;
	}*/
	for (i in l) {
//		debug(DBG_LOWEST, "[QPtimerUpdater] [for] i " + i);
		//Calculates the "offset" of the time in the page now and the page when it was loaded... in seconds!!
		offsetInSecs = QPcurrentTimeSecs() - V;

		if (l[i].D == DEF_CHAR_INFINITY) { continue; }

		// gets the time of this timer MINUS the offset to create the new time
		ae = l[i].D - offsetInSecs;

		if (ae <= 0) { continue; }	// don't update below 0
		// should change class - style

/*		// O starts at 0, and changes to 1 when the timer reaches 0 to reload the page
		if ((O == 0) && (ae < 1)) {
			O = 1;
			setTimeout("document.location.reload()", 1000);
		} else {}
*/		// stringifies the newly calculated time
		U = timeInSecondsToColonSeparatedTxt(ae);

		// updates the HTML with the new time
		l[i].ad.innerHTML = U;
	}
	// calls back this function in 1 seconds
//	debug(DBG_LOWEST, "[QPtimerUpdater] O " + O);
	if (O == 0) {
		window.setTimeout(QPTimersUpdate, 1000);
	}
}



/**
* Searches for QP timers;
* Creates a struct for each one with: the HTML element found and the time in seconds of the timer
* Calls QPTimersUpdate (which processes each of these timers...)
*/
function QPTimersCollect() {
	debug(DBG_LOWEST, "[QPtimersStartup]");

	c = xpathEvaluate('//*[@id = "QPtimer"]');
	debug(DBG_LOWEST, "[QPtimersStartup] c.snapshotLength " + c.snapshotLength);

	for(i = 0; i < c.snapshotLength; i++) {
		var currentQpTimer = c.snapshotItem(i);
		var currentQpTimerContents = currentQpTimer.innerHTML;
		debug(DBG_LOWEST, "[QPtimersStartup] currentQpTimer " + currentQpTimer);
		debug(DBG_LOWEST, "[QPtimersStartup] currentQpTimerContents [" + currentQpTimerContents+"]");
		l[i] = new Object();
		l[i].ad = currentQpTimer;
		l[i].D = ((currentQpTimerContents == DEF_CHAR_INFINITY)
						? DEF_CHAR_INFINITY
						: timeColonSeparatedToValue(currentQpTimerContents));
	}
//	QPtimerUpdater();
}



//===========================================================================================================
//===========================================================================================================
//==============================  Extended GreaseMonkey Get / Set functions  ================================
//===========================================================================================================
//===========================================================================================================




function GM_QP_getValue(key) {
	var val = GM_getValue(key);
	return (val == undefined) ? false : val;
}


//===========================================================================================================
//===========================================================================================================
//=======================================  Generic helper functions  ========================================
//===========================================================================================================
//===========================================================================================================


/**
* removeAllTags
* Removes all tags, to allow getting similar to what a user copy-paste would get.
*/
function removeAllTags(txt) {
	var strTagStrippedText = txt.replace(/<\/?[^>]+(>|$)/g, "");
	return strTagStrippedText;
}


/**
* dropDownListCreateNumericOptions
* Creates a numeric drop down list from (including) start to (excluding) end.
*/
function dropDownListCreateNumericOptions(start, end) {
	var res = "";
	for(var i=start; i<end; i++) {
		res += '<option value="' + i + '">' + i + '</option>';
	}
	return res;
}



/**
* getParamFromUrl
* @param {String} url The string of the URL
* @param {String} urlParam The param being searched in the URL
*/
function getParamFromUrl(url, urlParam) {
	var res = "&" + url.substring(url.indexOf("?") + 1); //exclude "?" and before that
	var searchStr = "&" + urlParam + "=";
	var pos = res.indexOf(searchStr);
	if (pos != -1) {
		res = res.substring(res.indexOf(searchStr) + searchStr.length);
		var endPos = (res.indexOf("&") > res.indexOf("#")) ? res.indexOf("&") : res.indexOf("#");
		if (endPos != -1) {
		 	res = res.substring(0, endPos);
		}
		return res;
	} else {
		return;
	}
}



/**
* arrayToXML
* @param {Array of primitive types} arr
*/
function arrayToXML(arr) {
	var res = "<array>";
	if (arr) {
		for(var i=0; i<arr.length; i++) {
			res += "<arrayNode>" + arr[i] + "</arrayNode>";
		}
	}
	res += "</array>";

	return res;
}

/**
* xmlToArray - converts the XML string to an array of values
* @param {xml string} xmlString A string of XML nodes with a depth of 2 (1 container + 1 repeatable list of nodes)
*								like this: <globalContainer><node></node>...<node></node></globalContainer>
*/
function xmlToArray(xmlString) {

	if (xmlString) {
		if (window.ActiveXObject) { // code for IE

			var doc = new ActiveXObject("Microsoft.XMLDOM");
			doc.async = "false";
			doc.loadXML(xmlString);

		} else { // code for Mozilla, Firefox, Opera, etc.

			var parser = new DOMParser();
			var doc = parser.parseFromString(xmlString,"text/xml");
		}
		var x = doc.documentElement;

		var res = new Array();
		for(var i=0; i<x.childNodes.length; i++) {
			if (x.childNodes[i].childNodes.length == 0) {
				res.push("");
			} else {
				for(var j=0; j<x.childNodes[i].childNodes.length; j++) {
//					debug(DBG_LOWEST, "[xmlToArray] i["+i+"] j["+j+"] " + x.childNodes[i].childNodes[j].nodeValue);
					res.push(x.childNodes[i].childNodes[j].nodeValue);
				}
			}
		}
		return res;
	} else {
		return null;
	}
}



/**
* stringEndsWith - true if the other string is the final part of the original string (or if both don't exist)
*/
function stringEndsWith(original, other) {
	if (!original && ! other) { // none exists = true
		return true;
	}

	if (original && other) { // both exist check...
		var pos = original.indexOf(other);
		if ((pos + other.length) == original.length) { // pos of other string + it's size == original's string = true
			return true;
		} else { // "other" may or may not exist in "original", but not at the end
			return false;
		}
	} else { // only one exists = false
		return false;
	}
}



/**
* Toggles printing debug info.
* @param {int} verbosity Integer to indicate if a debug message should really be printed or not (like a priority).
* @param {String} txt The text to be printed.
*/
function debug(verbosity, txt) {
 	switch (DEBUG_STATE) {
 		case DEBUG_STATE_GM_LOG: if (verbosity <= DEBUG_VERBOSITY) { GM_log(txt); } break;
 		default: break;
 	}
}

/**
* Toggles printing debug info.
* @param {String} txt The text to be printed.
*/
function debugOLD(txt) {
 	switch (DEBUG_STATE) {
 		case DEBUG_STATE_GM_LOG: GM_log(" ### DEPRECATED DEBUG MESSAGE ### " + txt); break;
 		default: break;
 	}
}


/**
* randomDelay
* @param {int} min
*/
function randomDelay(min, max, callMethod) {
	var rnd = random(min, max);
	debug(DBG_LOWEST, "[TQS][randomDelay] delaying: " + rnd);
	window.setTimeout(function() {callMethod()}, rnd);
}


/**
* randomDelay
* @param {int} min
*/
function random(min, max) {
	var range = max - min + 1;
    var ranNum = Math.floor(Math.random() * range) + min;
    return ranNum;
}


/**
* xpathEvaluate Finds nodes in the HTML DOM using XPath expression.
* @param {String} xpathExpr XPath expression to be evaluated and found in the document.
* @return Node iterator with the nodes that obey the XPath expression.
*/
function xpathEvaluate(xpathExpr) {
	return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}


/**
* xpathEvaluate Finds nodes in the HTML DOM using XPath expression.
* @param {Node} context Node from where to search.
* @param {String} xpathExpr XPath expression to be evaluated and found in the document.
* @return Node iterator with the nodes that obey the XPath expression.
*/
function xpathEvaluateInContext(context, xpathExpr) {
	return document.evaluate(xpathExpr, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}



// ##########   Resource info and counters - true = enables this; false = disables it   ##########
var CONFIG_FEATURE_RESOURCES_INFO = false;

// ##########   Village Targets - true = enables this; false = disables it   ##########
var CONFIG_FEATURE_VILLAGE_TARGETS = false;

// ##########   Title Fix - options 1 to 3 all append the title of current page, any other disables this   ##########
// 1 - Keeps original title and adds the title inside the page
// 2 - Crops original title and adds the title inside the page (eg.: "Travian comx" -> "T com9")
// 3 - Removes original title and adds the title inside the page

var CONFIG_TITLEFIX = 2;


// ##########   Village Targets - true = enables this; false = disables it   ##########
var DEF_TRAVIAN_SERVER_TYPE_2 = 1;
var DEF_TRAVIAN_SERVER_TYPE_3 = 2;
var DEF_TRAVIAN_SERVER_TYPE_SPEED = 3;
var CONFIG_TRAVIAN_SERVER_TYPE = DEF_TRAVIAN_SERVER_TYPE_3;


//#################################################################################################


main();


},false);


