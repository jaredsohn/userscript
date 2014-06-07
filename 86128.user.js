scr_meta=<><![CDATA[ 
// ==UserScript==
// @name 	Travian AutoTask CPD FX
// @namespace   Travian
// @author 	congxz6688,deFox,Tuga, v_kir, ptitfred06, Rhayader
// @version 	2.0.1
// @description Functions: AutoResourceUpgrade, AutoTransport, AutoNewBuild, AutoDemolish, AutoAttack, AutoTrain, CustomTransport, AutoParty. Languages Pt/Br/Fr/Vn/Ru/Uk/Au/Ba/Ir/Ae/It/Se/Us/Tr/Pl/De/Rs/Mx/Cl/Net.
// @license 	GNU General Public License
// @include 	http://*.travian*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*fl
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*/*log
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==
]]></>.toString();

var crtVersion="Ver CPD FX 2.0.1";

/**
 * Date:
 *   30 Jun 2009 - 01 Avril 2010
 * Authors:
 *   Original version by congxz6688.
 *   Some modifications and fixups by deFox, ptitfred06.
 *   Translations integration by Tuga.
 * Copying and copyrights: 
 *     This program is free software; you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation; either version 2 of the License, or
 *     (at your option) any later version.
 * Changelog:
 *  
 *  02/06/2010 Ver 2.0.1 Forking from CPD by Rhayader, fixed autotrain issue
 *  02/06/2010 Ver 2.0.0d Case "us" language change by shadowx360
 *  23/05/2010 Ver 1.2.0 AUtotransport work again . Thanks to Rhayader / change value line 3164 concerning ID villages.
 *  05/05/2010 Ver 1.1.4d Add ligne from shadowx360 concerning village master.
 *  28/04/2010 Ver 1.1.4a Update for FR "Bûcherons change by Bûcheron"
 *  25/04/2010   Ver 1.1.4 Update for Fr "update Écurie no display".
 *  16/04/2010  Ver 1.1.3 Update LV languague
 *  02/04/2010  Ver 1.1.2 Add US language by shadowx360
 *  31 Mar 2010 Ver 1.1.1 ID village on 2 digit  by Rhayader
 *  30 Mar 2010 Ver 1.1.0
 *     - replace text for START / STOP task list. in AlllangTaskOfText The : (".",".","START","STOP")
 *     - modify the format time in attack task. (Replace -> "Fois", " Mois", " Jour" by "Fois", "/", " ")
 *     - correct the full time in windows attack define.
 *
 *  27 Mar 2010 , update "Ttr" language by SARLAK
 *
 *  25 Mar 2010, ptitfred06
 *     - auto party no work need check.
 *     - unlock the NEW BUILD option.
 *     - add comment in script for all poeple can personnalize. (what can be change / what can't be change)
 *     - Change text in TASK list to have display more easy.
 *     - changement des texts dans la zone de taches. 
 *
 * 25 Mar 2010 ------------------------------------------------------- Update and change is managed by ptitfred06
 *
 *  01 Feb 2010, v_kir:
 *     - Fixed some names in "rs" (by rsinisa)
 *     - Fixed error in Russian
 *   30 Jan 2010, v_kir:
 *     - Fixed some names in Russian (by MMX)
 *   24-28 Jan 2010, v_kir:
 *     - Adapted for FireFox 3.6
 *   01 Oct 2009, deFox:
 *     - Fixed some names in all languages
 *     - Replaced auto-login code with more complex one
 *     - Prepared to unify XPath requests
 *   30 Sep 2009, Tuga:
 *     - Added "mx,cl,net" servers support
 *   30 Sep 2009, deFox:
 *     - Added "rs" servers support
 *     - Fixed bug in "send troops" attack type
 *   27 Sep 2009, deFox:
 *     - Added LohoC's german language support
 *     - Modified Xlang variable names to be more unique
 *     - Some cosmetic changes in code
 *   25 Sep 2009, deFox:
 *     - Fixed troops sending code due to Travian T3.5 update
 *   OLD Script : Earlier changes log: http://userscripts.org/scripts/show/67160
 */

// Basic constants
const XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
const XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
const XPOrdList = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
const XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
const XPOrdItert = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
const XPNumber = XPathResult.NUMBER_TYPE;
const XPAny = XPathResult.ANY_TYPE;
const XPSnap = 6;//XPathResult.UNORDERED_SNAPSHOT_TYPE;
const XPOrdSnap = 7;//XPathResult.ORDERED_SNAPSHOT_TYPE;
const XPString = XPathResult.STRING_TYPE;
const XPBool = XPathResult.BOOLEAN_TYPE;

// Configuration

// Determines if the script should automatically 'press' login button if logged out
var autoLogin = true;

// Logging - for debugging purposes.
var logDebugMesages = true;

// Selecting language
Xlang="com";
checkLang();

// Preparing visual style for script's GUI
var cssStyle = "";
cssStyle += "table#tasklisttable th {border:0px !important;font-weight:bolder; margin:10px;padding-top:8px; }";
cssStyle += "table#tasklisttable tr td,table#mytablee tr td{border:0px !important;margin:20px;}";
cssStyle += ".floatClose {float:right; padding:2px 4px; color:white; margin:-5px -15px 0 0;}";
cssStyle += "#closeautran {position:relative;top:1px;left:150px}"
cssStyle += "#autoResdiv,#translimit,#resremain {padding:0px 3px; }";
cssStyle += "#createnewurl {margin: 0px 0px 0px 0px; position:relative; top:6px; border-style: ridge; border-width:2px; color:green;}";
cssStyle += "#createUrl,#partylnk {margin: 0px 0px 0px 0px; position:relative; top:-5px; border-style: ridge; border-width:2px; color:green;}";
cssStyle += "#partylnk { position:relative; top:-1px; border-style: ridge; border-width:2px; color:green;}";
cssStyle += "#autotransbtn,#attackbtn,#trainlnk,#customtransbtn {margin: 0px 0px 0px  20px; position:relative; top:-4px; border-style: ridge; border-width:2px; color:green;}";
cssStyle += "#autotransbtn:active,#attackbtn:active,#demolishlnk:active,#createUrl:active,#createnewurl:active,#trainlnk:active,#customtransbtn:active,#partylnk:active {border-style: groove; border-width:3px; }";
cssStyle += "#updataform, #printmsg,#transform,#translimitform,#demolistform,#attackform,#trainform,#customtransform,#resremainform,#partyform {padding:10px 30px; }";
cssStyle += "#resremain {padding:0px 3px 15px 3px;}";
cssStyle += "#mytablee {margin:10px 0px 10px 0px;}";
cssStyle += "#crtvill,#hero {margin:0px 0px 10px 0px;}";
cssStyle += "#demolishdiv {padding:10px 3px 3px 3px;}";
cssStyle += "#taskForm_wrapper,#MSG_wrapper,#tranForm_wrapper,#tranlmtform_wrapper,#demolistform_wrapper,#attackform_wrapper,#trainform_wrapper,#customtransform_wrapper,#resremainform_wrapper,#partyform_wrapper {position:fixed; max-width:900px !important; min-width:260px !important; min-height:50px !important; background-color:RGB(225, 255, 225); margin:0; color:black; border:1px #000000 solid; z-index:100; -moz-border-radius:5px;}";
cssStyle += "#tasklisttable_wrapper,#improveform_wrapper {position:fixed; padding:10px 20px 10px 20px;min-width:260px !important; min-height:50px !important; background-color:RGB(180, 220, 220); margin:0; color:black; border:1px #000000 solid; z-index:100; -moz-border-radius:5px;}";
cssStyle += ".handle {cursor: move;}";
cssStyle +="#autoResform1,#changeit,#changeit2,#deletealltask,#clicktostart,#verdisp {color:green;}";
cssStyle +="#autoResform2,#clicktopause {color:DarkGoldenRod;}";
cssStyle +="#demolishlnk {color:red;border-style: ridge; border-width:2px;}";
GM_addStyle(cssStyle);

// Definitions of images
var deleteBtn = "data:image/gif;base64,R0lGODlhDAAMANU2AN4ZCtAgFNAgHdsgA9waCs4cDMwkHPNfHcspJ9oYCsoYDc8pINAYCvg0AORNOeFFPtA7O+c+QNRTU8BMSb4gHN5lTNooGsc1N+g+PuEkJOhOKLlVWOwxD9MlGtUiFMwjFcI7LtcfDPY9ANs5L+JMSOxhJLRDO+YfDdYEAPdvHORZRMkZC9EcDcwXE8ssLtonG9gbG+M8EOEZGdkZDNwVCb0pKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAAMAAwAQAZJQNNgYisajzZVDHRMBJC2TEvxOY40HNfRsEJGYBKS51gS1aA2gCXVQEApDONDBikuCmgMioV2vC5FMx1GFQchG0g0BDYnAmhFQQA7";
var movedownBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAIAAABbzbuTAAAABmJLR0QAAAAAAAD5Q7t%2FAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACXklEQVR42p2S20vTYRjH%2FTuCiEBLWwepoC4kLSWdxZrImBeri7IjokS6eaFikGCZHaxBB5DWPNVwREKm2GSz1FKHXghFsYFaJnP%2B3Obv9B6ep3ezgsKbenkv3ovv5%2F0%2Bz%2Fd50vAfT9p%2FARwRgHPKASmg%2FdZQY%2FuHGmfAfn%2F4Skt%2Fb2BBp2tCw1BFDn8AjAPh6BqRL7S%2BPX97vKJt%2FM7Lrx7%2FHGHyxgBloFG8ObBqaRq1NgfLmt%2FXdnx55gtTrmwAADBhIQBHz%2FzxhjFjfbC4fuzio9keX3hjh9%2BAEBXWvjtin8y3%2B22tY52Dn%2F920IQWOCMqIbJCFdvd2QOXBnMqRw9d9p%2B4Nu4eCQMhqCmUIVCeclAlVYcE4CrHmI6lTVM7T3r3nHq193RfQc2bdv%2FiMkcJMMqRMzkJgK5OhyN55W2mmtcWe8BcN2mwegyW3l1lvXkVQ6bq4eLq%2FlJH91Wnh2KqJAYYB%2BybiRQ7BjaXeDPNXZnm7vW7zdSZWeI5XBU41%2FBCJZigqcEBEd1IVI8%2F9s4UVPnSC93pRU%2B2H3NlGF0ZRe59Zzz5lc9VikiiMvBfKXEmnNYAG53e%2FWf9Weanu00Pth51Zlm92UV1UV1kmBDpiFrSfqaKYsq6iEsGtFa6cmxdm3Ifbim4l21uiWrJmpFzBE7Xd4kgUmEBmhiDpqnilVt6Y4fJbTBe%2F7SoMK4AASESRVDUUz0kd46rlMTi0tL8XOjjdGAilH6w3NkxPBGcCoVmI0uRRFxlVCApACkBjgSAUE5kRqm2EpOicenb9%2FnlpYWVhKKQpIKLjxn8ABAenc7LXVdbAAAAAElFTkSuQmCC";
var moveupBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAIAAADdWck9AAAABmJLR0QAAAAAAAD5Q7t%2FAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACbElEQVR42pVT70tTURj2f4joexGrT0XfggqGrabUIrLol4FiOiiwMCxZzQyMROzDqMD8gShCiLQNdQi2cc1tZrrmls1i1lzLLFzzunbv7r3nx9u5Zw360Jdd7j3ncN7nOe97n%2Bc9ZVDiU1Y6gRI2Uf6yL5fbyGHoHhbSEs3kRAoEA%2BBitJhBh1OdSQhDj05F4yJ09npEzDeBFKC0kIFT2UGIYoIw9UbWfXGp6dns2JJ8xzGGCA9ixCb8D4Ew9KYC75KZ0ZDY4JirfrxgfRpxL%2BOO%2FilRBU3T8%2BDiP7A1wQQ%2BpdV7g4GLDwTL%2FZljbcGqzojFLjhjuNcVUhA%2FFAjPkJcVTVtH5OYT4VJ7qKI1YLLNmO2zZnuQrc0t4%2B3OzPD0SlZDNC%2FqhDyGtErqWp22odSNgbX6nsRxW8B463X57elznYt1PcvW59GWvmA4kVZ4TWUYlNjKdyGUmpj%2F6gonr%2FWnDjf6jE3BQ43eK45YlzsxFln1vF32BZdQUdYMgEQJxpTKCFm7Px%2BoGd9fPbmv2n2%2BYyGwKCuACdW4FyonEF1WShVCqapAreODoWpk75nxPWdHTrf5%2FXMIQZ5QmYmKQCmq9FcpYLuX26OGkwMGy9DuE%2F2nmv3CQjYPTJ%2BcPmD4D%2BHC3cjOo327TINsrLg%2B7XvzQ2UhKgF3nMvK7GcaU8yagBEqmye3Gx%2FtMHZtO%2FLw4NUXr%2FxfkE6QQYdRTtDNp5qm%2FM7KP9e3ymtcphpPZb3XVOupbPC8nJgVJVHTcgyGeHPoJbFqVDW%2FtSX92pDDH1fno8m5SDIUS72Pf1vbUDezaVWR9O4pOF3qffgDH4Xh0bQHBfwAAAAASUVORK5CYII%3D";
var sCloseBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";

// Xlang specific declarations
var aLangAllBuildWithId, aLangAllResInDorf1, aLangAddTaskText, aLangTaskKind, maxlevel;
var aLangGameText, aLangRaceName, aLangTaskOfText, aLangErrorText, aLangOtherText;
var allsourceString, aLangResources, allbuildString, aLangAttackType;
var aLangTroops = new Array(3);
// =============================================================================
// VAR FOR beyond
// =============================================================================
var crtPage = window.location.href;
var TB3O = new Object();
	TB3O.TBStartTime = new Date().getTime();
	TB3O.version = '3.8.8.9.6.1';
	TB3O.TBEndTime = TB3O.TBStartTime;
	TB3O.usoL = 'http://userscripts.org/scripts/';
	TB3O.usoNo = '28129';
	TB3O.url = TB3O.usoL + 'source/' + TB3O.usoNo + '.user.js';
	TB3O.shN = 'TB3-ML&CN';
	TB3O.sn = 'Waiting for the storm';
	TB3O.usoA = TB3O.usoL + 'show/' + TB3O.usoNo;
	TB3O.origMap = true;
	TB3O.BrT = "";
	TB3O.TBTRT = function() {return TB3O.TBEndTime - TB3O.TBStartTime;};
	TB3O.versionText = function() {return TB3O.version + " - " + TB3O.sn;};
	TB3O.nTARbT = '';
	TB3O.nTASb = '';
	TB3O.nTAUb = '';
	TB3O.nTANb = '';
	TB3O.FmapServer = '';
	TB3O.FmapLanguage = '';
	TB3O.boolIsThisNPC = false;
	TB3O.boolIsNPCExluded = false;
	TB3O.T35 = false;
	TB3O.M35 = 0;
	TB3O.avBKS = false;
	TB3O.boolShowNPCLink = crtPage.indexOf(".org") == -1;
	TB3O.gServer;
	TB3O.fullServerName;
	TB3O.UserID = '0';
	TB3O.plAc = false;
	TB3O.AVP = 0;
	TB3O.Mcap = 0;
	TB3O.VillageRes = '';
	TB3O.hOffBonus = 0;
	TB3O.speed = false;
	TB3O.tPpH = [0, 0, 0, 0, 0];//total production per hour for all villages -> requires to open all villages on a regular basis to get current data
	TB3O.d2spB = [0, 0, 0, 0, 0, 0, 0, 0, 0];//cpbuilding, barracks, big barracks, workshop, stable, big stable, tournament square, townhall, horse drinking through
	//crt coords
	TB3O.xCrt = -1000;
	TB3O.yCrt = -1000;
	//CN colors (CN_COL_TXT, CN_COL_NEUTRAL, CN_COL_MAX_LVL, CN_COL_NO_UPG, CN_COL_UPG_VIA_NPC)
	TB3O.CNc = ['#000000', '#FDF8C1', '#7DFF7D', '#FF9696', '#FFC84B'];
	TB3O.DFc = ['#000000', 'white'];

	TB3O.wH = window.innerHeight;
	TB3O.wW = window.innerWidth;
	
	TB3O.isTtB = false;
	
	TB3O.lng = 'fr';
	var ddX = '680';
	//doc direction
	var docDir = ['left', 'right'];
	if (document.defaultView.getComputedStyle(document.body, null).getPropertyValue("direction") == 'rtl') {docDir = ['right', 'left']; ddX = '100';};
	

	TB3O.OD = [
	'0', '0', '1', '0', '1', '1', '1', '1', '1', '1',
	'0', '0', '1', '1', '1', '1', '1', '1', '1', '1',
	'1', '1', '1', '1', '0', '0', '1', '0', '1', '0',
	'1', '1', '1', '1', '1', '1', '0', '1', '1', '1',
	'1', '1', '0', '1', '1', '1', '1', '0', '0', '0',
	'3', '0', '0', '1', '1', '0', '1', '1', '0', '0', 
	'1', '1', '0', '1', '0', '',  '',  '',  '',  '0',
	'1', '1', '1', '1', '1', ddX + '|150', ddX + '|170', ddX + '|210', ddX + '|190', ddX + '|220',
	'1', '1', '1', '1', '1', '1', '1', '0', ddX + '|500', ddX + '|500', ddX + '|500'];
	
	TB3O.O = TB3O.OD;
	//link to the profile
	var spLnk = '';
	//link to the barracks
	var bksLnk = 'build.php?gid=19';
	//available races
	avRace = ['Romans', 'Teutons', 'Gauls'];
	//merchants speed (normal servers)
	var mts = {'Romans': 16, 'Teutons': 12, 'Gauls': 24};
	//user information: username(0), race(1), disprace(2), capital name(3), capital vid(4), capital newdid (5), capitalxy(6), deltaRaceImg (7)
	TB3O.U = ['', '', '', '', '', '', '', 1];
	//available languages
	var arAvLang = ['Server language', 'ae', 'ar', 'ba', 'bg', 'br', 'cl', 'cn', 'cz', 'de', 'dk', 'el', 'en', 'es', 'fi', 'fr', 'gr', 'hk', 'hr', 'hu', 'id', 'il', 'ir', 'it', 'jp', 'kr', 'lt', 'lv', 'mx', 'my', 'nl', 'no', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'vn'];

var vNames = '';
	//link to the profile
	var spLnk = '';
	//link to the barracks
	var bksLnk = 'build.php?gid=19';
	//available races
	avRace = ['Romans', 'Teutons', 'Gauls'];
	//merchants speed (normal servers)
	var mts = {'Romans': 16, 'Teutons': 12, 'Gauls': 24};
	//user information: username(0), race(1), disprace(2), capital name(3), capital vid(4), capital newdid (5), capitalxy(6), deltaRaceImg (7)
	TB3O.U = ['', '', '', '', '', '', '', 1];
	//available languages
	var arAvLang = ['Server language', 'ae', 'ar', 'ba', 'bg', 'br', 'cl', 'cn', 'cz', 'de', 'dk', 'el', 'en', 'es', 'fi', 'fr', 'gr', 'hk', 'hr', 'hu', 'id', 'il', 'ir', 'it', 'jp', 'kr', 'lt', 'lv', 'mx', 'my', 'nl', 'no', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'vn'];
	//village information
	function xVillage(aName, vID, newdid, x, y, vLink) {this.vName = aName;this.vID = vID;this.vNewdid = newdid;this.vx = x;this.vy = y;this.vLink = vLink; return this;};
	//a building being upgraded
	function xBiP(aName, tEnd) {var txtLvl = aName[1].replace(")", "");var lvl = txtLvl.split(" ");this.name = aName[0];this.txtLvl = txtLvl;this.lvl = lvl[1];this.endTime = tEnd; return this;};
	function xTiT(aType, aName, t1) {this.type = aType;this.name = aName;this.t1 = t1;var aD = new Date();aD.setTime(aD.getTime());this.crtDate = aD; return this;};
	function yTiT(tType, intNo, strName) {this.tType = tType;this.intNo = intNo;this.strName = strName; return this;};
	//a troop movement (from dorf1.php)
	function xTrMov(iT, no, fT) {this.type = iT;this.no = no;this.fT = fT; return this;};
	function xTtT(tType, necRes, tTime, aRes) {this.necRes = necRes;this.tType = tType;this.tTime = tTime;this.aRes = aRes; return this;};
	
	var vList = new Array();
	//active village
	var actV = new xVillage('', 0, 0, -1000, -1000, '');
	
	var arrTtT = new Array();
	var vNames = '';
	var defaultMF = [5, 5, 4, 2, 4];
	var marketFilters;
	var localGP = "";
	var wsSName;
	var wsURLCropFinderLinkV2 = "http://crop-finder.com/";
	var wsAnalyser =	[["World Analyser", "http://www.travian.ws/analyser.pl?s="], ["Travian Utils", "http://travian-utils.com/?s="], ["Travianbox.com", "http://travianbox.com/stats/"]];
	var mapAnalyser =	[["Travmap", "http://travmap.shishnet.org/"], ["Flash map", "http://travian.org.ua/"]];
	var repSite =		[["Travilog", "http://travilog.org.ua/"], ["T-Reports.net", "http://travian-reports.net/"]];
	var warsimLink = 	["warsim.php", "http://travian.kirilloid.ru/warsim.php"];
	
	var wsURLTravianBox = "http://travianbox.com";
	var urlNow = window.location.pathname + window.location.search;
	jsVoid = 'javaScript:void(0)';
	xGIF = "a/x.gif";
	dlright1 = 'lright1';
	dmid = 'lmidall';
	dTop5 = 'ltop5';
	dTop1 = 'ltop1';
	dmid2 = 'lmid2';
	dleft = 'lleft';
	dmid1 = 'lmid1';
	dmap = 'map1';
	gIc = new Array();

	crtResUnits = new Array(5);//current resource units
	capacity = new Array(4);//capacity of the warehouse/granary
	prodPerHour = new Array(7);//production per hour for the four resource types
	timeToFill = [[-1, ""], [-1, ""], [-1, ""], [-1, ""]];//time to fill the warehouse/granary
	
	NPCResources = 'npcResources';
	NPCbacklinkName = 'npcBackLink';
	NPCURL = '/build.php?gid=17&t=3';


var bCost = [[0],//dummy
[//lumberCost gid = 1
[0,0,0,0,0,0],
[40,100,50,60,1,2],
[65,165,85,100,1,3],
[110,280,140,165,2,4],
[185,465,235,280,2,5],
[310,780,390,465,2,6],
[520,1300,650,780,3,8],
[870,2170,1085,1300,4,10],
[1450,3625,1810,2175,4,12],
[2420,6050,3025,3630,5,14],
[4040,10105,5050,6060,6,16],//10
[6750,16870,8435,10125,7,18],
[11270,28175,14090,16905,9,20],
[18820,47055,23525,28230,11,22],
[31430,78580,39290,47150,13,24],
[52490,131230,65615,78740,15,26],
[87660,219155,109575,131490,18,29],
[146395,365985,182995,219590,22,32],
[244480,611195,305600,366715,27,35],
[408280,1020695,510350,612420,32,38],
[681825,1704565,852280,1022740,38,41],//20
[1138650,2846620,1423310,1707970,38,44],
[1901540,4753855,2376925,2852315,38,47],
[3175575,7938935,3969470,4763360,38,50],
[5303210,13258025,6629015,7954815,38,53],
[8856360,22140900,11070450,13284540,38,56]//25
],
[//clayCost gid = 2
[0,0,0,0,0,0],
[80,40,80,50,1,2],
[135,65,135,85,1,3],
[225,110,225,140,2,4],
[375,185,375,235,2,5],
[620,310,620,390,2,6],
[1040,520,1040,650,3,8],
[1735,870,1735,1085,4,10],
[2900,1450,2900,1810,4,12],
[4840,2420,4840,3025,5,14],
[8080,4040,8080,5050,6,16],//10
[13500,6750,13500,8435,7,18],
[22540,11270,22540,14090,9,20],
[37645,18820,37645,23525,11,22],
[62865,31430,62865,39290,13,24],
[104985,52490,104985,65615,15,26],
[175320,87660,175320,109575,18,29],
[292790,146395,292790,182995,22,32],
[488955,244480,488955,305600,27,35],
[816555,408280,816555,510350,32,38],
[1363650,681825,1363650,852280,38,41],//20
[2277295,1138650,2277295,1423310,38,44],
[3803085,1901540,3803085,2376925,38,47],
[6351150,3175575,6351150,3969470,38,50],
[10606420,5303210,10606420,6629015,38,53],
[17712720,8856360,17712720,11070450,38,56]//25
],
[//ironCost gid = 3
[0,0,0,0,0,0],
[100,80,30,60,1,3],
[165,135,50,100,1,5],
[280,225,85,165,2,7],
[465,375,140,280,2,9],
[780,620,235,465,2,11],
[1300,1040,390,780,3,13],
[2170,1735,650,1300,4,15],
[3625,2900,1085,2175,4,17],
[6050,4840,1815,3630,5,19],
[10105,8080,3030,6060,6,21],//10
[16870,13500,5060,10125,7,24],
[28175,22540,8455,16905,9,27],
[47055,37645,14115,28230,11,30],
[78580,62865,23575,47150,13,33],
[131230,104985,39370,78740,15,36],
[219155,175320,65745,131490,18,39],
[365985,292790,109795,219590,22,42],
[611195,488955,183360,366715,27,45],
[1020695,816555,306210,612420,32,48],
[1704565,1363650,511370,1022740,38,51],//20
[2846620,2277295,853985,1707970,38,54],
[4753855,3803085,1426155,2852315,38,57],
[7938935,6351150,2381680,4763360,38,60],
[13258025,10606420,3977410,7954815,38,63],
[22140900,17712720,6642270,13284540,38,66]//25
],
[//cropCost gid = 4
[0,0,0,0,0,0],
[70,90,70,20,1,0],
[115,150,115,35,1,0],
[195,250,195,55,2,0],
[325,420,325,95,2,0],
[545,700,545,155,2,0],
[910,1170,910,260,3,1],
[1520,1950,1520,435,4,2],
[2535,3260,2535,725,4,3],
[4235,5445,4235,1210,5,4],
[7070,9095,7070,2020,6,5],//10
[11810,15185,11810,3375,7,6],
[19725,25360,19725,5635,9,7],
[32940,42350,32940,9410,11,8],
[55005,70720,55005,15715,13,9],
[91860,118105,91860,26245,15,10],
[153405,197240,153405,43830,18,12],
[256190,329385,256190,73195,22,14],
[427835,550075,427835,122240,27,16],
[714485,918625,714485,204140,32,18],
[1193195,1534105,1193195,340915,38,20],//20
[1992635,2561960,1992635,569325,38,22],
[3327700,4278470,3327700,950770,38,24],
[5557255,7145045,5557255,1587785,38,26],
[9280620,11932225,9280620,2651605,38,28],
[15498630,19926810,15498630,4428180,38,30]//25
],
[//sawmillCost gid = 5
[0,0,0,0,0,0],
[520,380,290,90,1,4],
[935,685,520,160,1,6],
[1685,1230,940,290,2,8],
[3035,2215,1690,525,2,10],
[5460,3990,3045,945,2,12]
],
[//brickyardCost gid = 6
[0,0,0,0,0,0],
[440,480,320,50,1,3],
[790,865,575,90,1,5],
[1425,1555,1035,160,2,7],
[2565,2800,1865,290,2,9],
[4620,5040,3360,525,2,11]
],
[//ironFoundryCost gid = 7
[0,0,0,0,0,0],
[200,450,510,120,1,6],
[360,810,920,215,1,9],
[650,1460,1650,390,2,12],
[1165,2625,2975,700,2,15],
[2100,4725,5355,1260,2,18]
],
[//grainMillCost gid = 8
[0,0,0,0,0,0],
[500,440,380,1240,1,3],
[900,790,685,2230,1,5],
[1620,1425,1230,4020,2,7],
[2915,2565,2215,7230,2,9],
[5250,4620,3990,13015,2,11]
],
[//bakeryCost gid = 9
[0,0,0,0,0,0],
[1200,1480,870,1600,1,4],
[2160,2665,1565,2880,1,6],
[3890,4795,2820,5185,2,8],
[7000,8630,5075,9330,2,10],
[12595,15535,9135,16795,2,12]
],
[//warehouseCost gid = 10
[0,0,0,0,0,0],
[130,160,90,40,1,1],
[165,205,115,50,1,2],
[215,260,145,65,2,3],
[275,335,190,85,2,4],
[350,430,240,105,2,5],
[445,550,310,135,3,6],
[570,705,395,175,4,7],
[730,900,505,225,4,8],
[935,1155,650,290,5,9],
[1200,1475,830,370,6,10],//10
[1535,1890,1065,470,7,12],
[1965,2420,1360,605,9,14],
[2515,3095,1740,775,11,16],
[3220,3960,2230,990,13,18],
[4120,5070,2850,1270,15,20],
[5275,6490,3650,1625,18,22],
[6750,8310,4675,2075,22,24],
[8640,10635,5980,2660,27,26],
[11060,13610,7655,3405,32,28],
[14155,17420,9800,4355,38,30]//20
],
[//granaryCost gid = 11
[0,0,0,0,0,0],
[80,100,70,20,1,1],
[100,130,90,25,1,2],
[130,165,115,35,2,3],
[170,210,145,40,2,4],
[215,270,190,55,2,5],
[275,345,240,70,3,6],
[350,440,310,90,4,7],
[450,565,395,115,4,8],
[575,720,505,145,5,9],
[740,920,645,185,6,10],//10
[945,1180,825,235,7,12],
[1210,1510,1060,300,9,14],
[1545,1935,1355,385,11,16],
[1980,2475,1735,495,13,18],
[2535,3170,2220,635,15,20],
[3245,4055,2840,810,18,22],
[4155,5190,3635,1040,22,24],
[5315,6645,4650,1330,27,26],
[6805,8505,5955,1700,32,28],
[8710,10890,7620,2180,38,30]//20
],
[//blacksmithCost gid = 12
[0,0,0,0,0,0],
[170,200,380,130,2,4],
[220,255,485,165,3,6],
[280,330,625,215,3,8],
[355,420,795,275,4,10],
[455,535,1020,350,5,12],
[585,685,1305,445,6,15],
[750,880,1670,570,7,18],
[955,1125,2140,730,9,21],
[1225,1440,2740,935,10,24],
[1570,1845,3505,1200,12,27],//10
[2005,2360,4485,1535,15,30],
[2570,3020,5740,1965,18,33],
[3290,3870,7350,2515,21,36],
[4210,4950,9410,3220,26,39],
[5390,6340,12045,4120,31,42],
[6895,8115,15415,5275,37,46],
[8825,10385,19730,6750,44,50],
[11300,13290,25255,8640,53,54],
[14460,17015,32325,11060,64,58],
[18510,21780,41380,14155,77,62]//20
],
[//armouryCost gid = 13
[0,0,0,0,0,0],
[130,210,410,130,2,4],
[165,270,525,165,3,6],
[215,345,670,215,3,8],
[275,440,860,275,4,10],
[350,565,1100,350,5,12],
[445,720,1410,445,6,15],
[570,925,1805,570,7,18],
[730,1180,2310,730,9,21],
[935,1515,2955,935,10,24],
[1200,1935,3780,1200,12,27],//10
[1535,2480,4840,1535,15,30],
[1965,3175,6195,1965,18,33],
[2515,4060,7930,2515,21,36],
[3220,5200,10150,3220,26,39],
[4120,6655,12995,4120,31,42],
[5275,8520,16630,5275,37,46],
[6750,10905,21290,6750,44,50],
[8640,13955,27250,8640,53,54],
[11060,17865,34880,11060,64,58],
[14155,22865,44645,14155,77,62]//20
],
[//tournamentSquareCost gid = 14
[0,0,0,0,0,0],
[1750,2250,1530,240,1,1],
[2240,2880,1960,305,1,2],
[2865,3685,2505,395,2,3],
[3670,4720,3210,505,2,4],
[4700,6040,4105,645,2,5],
[6015,7730,5255,825,3,6],
[7695,9895,6730,1055,4,7],
[9850,12665,8615,1350,4,8],
[12610,16215,11025,1730,5,9],
[16140,20755,14110,2215,6,10],//10
[20660,26565,18065,2835,7,12],
[26445,34000,23120,3625,9,14],
[33850,43520,29595,4640,11,16],
[43330,55705,37880,5940,13,18],
[55460,71305,48490,7605,15,20],
[70990,91270,62065,9735,18,22],
[90865,116825,79440,12460,22,24],
[116305,149540,101685,15950,27,26],
[148875,191410,130160,20415,32,28],
[190560,245005,166600,26135,38,30]//20
],
[//mainBuildingCost gid = 15
[0,0,0,0,0,0],
[70,40,60,20,2,2],
[90,50,75,25,3,3],
[115,65,100,35,3,4],
[145,85,125,40,4,5],
[190,105,160,55,5,6],
[240,135,205,70,6,8],
[310,175,265,90,7,10],
[395,225,340,115,9,12],
[505,290,430,145,10,14],
[645,370,555,185,12,16],//10
[825,470,710,235,15,18],
[1060,605,905,300,18,20],
[1355,775,1160,385,21,22],
[1735,990,1485,495,26,24],
[2220,1270,1900,635,31,26],
[2840,1625,2435,810,37,29],
[3635,2075,3115,1040,44,32],
[4650,2660,3990,1330,53,35],
[5955,3405,5105,1700,64,38],
[7620,4355,6535,2180,77,41]//20
],
[//rallyPointCost gid = 16
[0,0,0,0,0,0],
[110,160,90,70,1,1],
[140,205,115,90,1,2],
[180,260,145,115,2,3],
[230,335,190,145,2,4],
[295,430,240,190,2,5],
[380,550,310,240,3,6],
[485,705,395,310,4,7],
[620,900,505,395,4,8],
[795,1155,650,505,5,9],
[1015,1475,830,645,6,10],//10
[1300,1890,1065,825,7,12],
[1660,2420,1360,1060,9,14],
[2130,3095,1740,1355,11,16],
[2725,3960,2230,1735,13,18],
[3485,5070,2850,2220,15,20],
[4460,6490,3650,2840,18,22],
[5710,8310,4675,3635,22,24],
[7310,10635,5980,4650,27,26],
[9360,13610,7655,5955,32,28],
[11980,17420,9800,7620,38,30]//20
],
[//marketplaceCost gid = 17
[0,0,0,0,0,0],
[80,70,120,70,4,4],
[100,90,155,90,4,6],
[130,115,195,115,5,8],
[170,145,250,145,6,10],
[215,190,320,190,7,12],
[275,240,410,240,9,15],
[350,310,530,310,11,18],
[450,395,675,395,13,21],
[575,505,865,505,15,24],
[740,645,1105,645,19,27],//10
[945,825,1415,825,22,30],
[1210,1060,1815,1060,27,33],
[1545,1355,2320,1355,32,38],
[1980,1735,2970,1735,39,41],
[2535,2220,3805,2220,46,44],
[3245,2840,4870,2840,55,48],
[4155,3635,6230,3635,67,52],
[5315,4650,7975,4650,80,56],
[6805,5955,10210,5955,96,60],
[8710,7620,13065,7620,115,64]//20
],
[//embassyCost gid = 18
[0,0,0,0,0,0],
[180,130,150,80,5,3],
[230,165,190,100,6,5],
[295,215,245,130,7,7],
[375,275,315,170,8,9],
[485,350,405,215,10,11],
[620,445,515,275,12,13],
[790,570,660,350,14,15],
[1015,730,845,450,17,17],
[1295,935,1080,575,21,19],
[1660,1200,1385,740,25,21],//10
[2125,1535,1770,945,30,24],
[2720,1965,2265,1210,36,27],
[3480,2515,2900,1545,43,30],
[4455,3220,3715,1980,51,33],
[5705,4120,4755,2535,62,36],
[7300,5275,6085,3245,74,39],
[9345,6750,7790,4155,89,42],
[11965,8640,9970,5315,106,45],
[15315,11060,12760,6805,128,48],
[19600,14155,16335,8710,153,51]//20
],
[//barracksCost gid = 19
[0,0,0,0,0,0],
[210,140,260,120,1,4],
[270,180,335,155,1,6],
[345,230,425,195,2,8],
[440,295,545,250,2,10],
[565,375,700,320,2,12],
[720,480,895,410,3,15],
[925,615,1145,530,4,18],
[1180,790,1465,675,4,21],
[1515,1010,1875,865,5,24],
[1935,1290,2400,1105,6,27],//10
[2480,1655,3070,1415,7,30],
[3175,2115,3930,1815,9,33],
[4060,2710,5030,2320,11,36],
[5200,3465,6435,2970,13,39],
[6655,4435,8240,3805,15,42],
[8520,5680,10545,4870,18,46],
[10905,7270,13500,6230,22,50],
[13955,9305,17280,7975,27,54],
[17865,11910,22120,10210,32,58],
[22865,15245,28310,13065,38,62]//20
],
[//stableCost gid = 20
[0,0,0,0,0,0],
[260,140,220,100,2,5],
[335,180,280,130,3,8],
[425,230,360,165,3,11],
[545,295,460,210,4,14],
[700,375,590,270,5,17],
[895,480,755,345,6,20],
[1145,615,970,440,7,23],
[1465,790,1240,565,9,26],
[1875,1010,1585,720,10,29],
[2400,1290,2030,920,12,32],//10
[3070,1655,2595,1180,15,36],
[3930,2115,3325,1510,18,40],
[5030,2710,4255,1935,21,44],
[6435,3465,5445,2475,26,48],
[8240,4435,6970,3170,31,52],
[10545,5680,8925,4055,37,56],
[13500,7270,11425,5190,44,60],
[17280,9305,14620,6645,53,64],
[22120,11910,18715,8505,64,68],
[28310,15245,23955,10890,77,72]//20
],
[//workshopCost gid = 21
[0,0,0,0,0,0],
[460,510,600,320,4,3],
[590,655,770,410,4,5],
[755,835,985,525,5,7],
[965,1070,1260,670,6,9],
[1235,1370,1610,860,7,11],
[1580,1750,2060,1100,9,13],
[2025,2245,2640,1405,11,15],
[2590,2870,3380,1800,13,17],
[3315,3675,4325,2305,15,19],
[4245,4705,5535,2950,19,21],//10
[5430,6020,7085,3780,22,24],
[6950,7705,9065,4835,27,27],
[8900,9865,11605,6190,32,30],
[11390,12625,14855,7925,39,33],
[14580,16165,19015,10140,46,36],
[18660,20690,24340,12980,55,39],
[23885,26480,31155,16615,67,42],
[30570,33895,39875,21270,80,45],
[39130,43385,51040,27225,96,48],
[50090,55535,65335,34845,115,51]//20
],
[//academyCost gid = 22
[0,0,0,0,0,0],
[220,160,90,40,5,4],
[280,205,115,50,6,6],
[360,260,145,65,7,8],
[460,335,190,85,8,10],
[590,430,240,105,10,12],
[755,550,310,135,12,15],
[970,705,395,175,14,18],
[1240,900,505,225,17,21],
[1585,1155,650,290,21,24],
[2030,1475,830,370,25,27],//10
[2595,1890,1065,470,30,30],
[3325,2420,1360,605,36,33],
[4255,3095,1740,775,43,36],
[5445,3960,2230,990,51,39],
[6970,5070,2850,1270,62,42],
[8925,6490,3650,1625,74,46],
[11425,8310,4675,2075,89,50],
[14620,10635,5980,2660,106,54],
[18715,13610,7655,3405,128,58],
[23955,17420,9800,4355,153,62]//20
],
[//crannyCost gid = 23
[0,0,0,0,0,0],
[40,50,30,10,1,0],
[50,65,40,15,1,0],
[65,80,50,15,2,0],
[85,105,65,20,2,0],
[105,135,80,25,2,0],
[135,170,105,35,3,1],
[175,220,130,45,4,2],
[225,280,170,55,4,3],
[290,360,215,70,5,4],
[370,460,275,90,6,5]//10
],
[//townhallCost gid = 24
[0,0,0,0,0,0],
[1250,1110,1260,600,6,4],
[1600,1420,1615,770,7,6],
[2050,1820,2065,985,9,8],
[2620,2330,2640,1260,10,10],
[3355,2980,3380,1610,12,12],
[4295,3815,4330,2060,15,15],
[5500,4880,5540,2640,18,18],
[7035,6250,7095,3380,21,21],
[9005,8000,9080,4325,26,24],
[11530,10240,11620,5535,31,27],//10
[14755,13105,14875,7085,37,30],
[18890,16775,19040,9065,45,33],
[24180,21470,24370,11605,53,36],
[30950,27480,31195,14855,64,39],
[39615,35175,39930,19015,77,42],
[50705,45025,51110,24340,92,46],
[64905,57635,65425,31155,111,50],
[83075,73770,83740,39875,133,54],
[106340,94430,107190,51040,160,58],
[136115,120870,137200,65335,192,62]//20
],
[//residenceCost gid = 25
[0,0,0,0,0,0],
[580,460,350,180,2,1],
[740,590,450,230,3,2],
[950,755,575,295,3,3],
[1215,965,735,375,4,4],
[1555,1235,940,485,5,5],
[1995,1580,1205,620,6,6],
[2550,2025,1540,790,7,7],
[3265,2590,1970,1015,9,8],
[4180,3315,2520,1295,11,9],
[5350,4245,3230,1660,12,10],//10
[6845,5430,4130,2125,15,12],
[8765,6950,5290,2720,18,14],
[11220,8900,6770,3480,21,16],
[14360,11390,8665,4455,26,18],
[18380,14580,11090,5705,31,20],
[23530,18660,14200,7300,37,22],
[30115,23885,18175,9345,44,24],
[38550,30570,23260,11965,53,26],
[49340,39130,29775,15315,64,28],
[63155,50090,38110,19600,77,30]//20
],
[//palaceCost gid = 26
[0,0,0,0,0,0],
[550,800,750,250,6,1],
[705,1025,960,320,7,2],
[900,1310,1230,410,9,3],
[1155,1680,1575,525,10,4],
[1475,2145,2015,670,12,5],
[1890,2750,2575,860,15,6],
[2420,3520,3300,1100,18,7],
[3095,4505,4220,1405,21,8],
[3965,5765,5405,1800,26,9],
[5075,7380,6920,2305,31,10],//10
[6495,9445,8855,2950,37,12],
[8310,12090,11335,3780,45,14],
[10640,15475,14505,4835,53,16],
[13615,19805,18570,6190,64,18],
[17430,25355,23770,7925,77,20],
[22310,32450,30425,10140,92,22],
[28560,41540,38940,12980,111,24],
[36555,53170,49845,16615,133,26],
[46790,68055,63805,21270,160,28],
[59890,87110,81670,27225,192,30]//20
],
[//treasuryCost gid = 27
[0,0,0,0,0,0],
[2880,2740,2580,990,7,4],
[3630,3450,3250,1245,9,6],
[4570,4350,4095,1570,10,8],
[5760,5480,5160,1980,12,10],
[7260,6905,6505,2495,15,12],
[9145,8700,8195,3145,18,15],
[11525,10965,10325,3960,21,18],
[14520,13815,13010,4990,26,21],
[18295,17405,16390,6290,31,24],
[23055,21930,20650,7925,37,27],//10
[29045,27635,26020,9985,45,30],
[36600,34820,32785,12580,53,33],
[46115,43875,41310,15850,64,36],
[58105,55280,52050,19975,77,39],
[73210,69655,65585,25165,92,42],
[92245,87760,82640,31710,111,46],
[116230,110580,104125,39955,133,50],
[146450,139330,131195,50340,160,54],
[184530,175560,165305,63430,192,58],
[232505,221205,208285,79925,230,62]//20
],
[//tradeOfficeCost gid = 28
[0,0,0,0,0,0],
[1400,1330,1200,400,4,3],
[1790,1700,1535,510,4,5],
[2295,2180,1965,655,5,7],
[2935,2790,2515,840,6,9],
[3760,3570,3220,1075,7,11],
[4810,4570,4125,1375,9,13],
[6155,5850,5280,1760,11,15],
[7880,7485,6755,2250,13,17],
[10090,9585,8645,2880,15,19],
[12915,12265,11070,3690,19,21],//10
[16530,15700,14165,4720,22,24],
[21155,20100,18135,6045,27,27],
[27080,25725,23210,7735,32,30],
[34660,32930,29710,9905,39,33],
[44370,42150,38030,12675,46,36],
[56790,53950,48680,16225,55,39],
[72690,69060,62310,20770,67,42],
[93045,88395,79755,26585,80,45],
[119100,113145,102085,34030,96,48],
[152445,144825,130670,43555,115,51]//20
],
[//greatBarrackCost gid = 29
[0,0,0,0,0,0],
[630,420,780,360,1,4],
[805,540,1000,460,1,6],
[1030,690,1280,590,2,8],
[1320,880,1635,755,2,10],
[1690,1125,2095,965,2,12],
[2165,1445,2680,1235,3,15],
[2770,1845,3430,1585,4,18],
[3545,2365,4390,2025,4,21],
[4540,3025,5620,2595,5,24],
[5810,3875,7195,3320,6,27],//10
[7440,4960,9210,4250,7,30],
[9520,6345,11785,5440,9,33],
[12185,8125,15085,6965,11,36],
[15600,10400,19310,8915,13,39],
[19965,13310,24720,11410,15,42],
[25555,17035,31640,14605,18,46],
[32710,21810,40500,18690,22,50],
[41870,27915,51840,23925,27,54],
[53595,35730,66355,30625,32,58],
[68600,45735,84935,39200,38,62]//20
],
[//greatStableCost gid = 30
[0,0,0,0,0,0],
[780,420,660,300,2,5],
[1000,540,845,385,3,8],
[1280,690,1080,490,3,11],
[1635,880,1385,630,4,14],
[2095,1125,1770,805,5,17],
[2680,1445,2270,1030,6,20],
[3430,1845,2905,1320,7,23],
[4390,2365,3715,1690,9,26],
[5620,3025,4755,2160,10,29],
[7195,3875,6085,2765,12,32],//10
[9210,4960,7790,3540,15,36],
[11785,6345,9975,4535,18,40],
[15085,8125,12765,5805,21,44],
[19310,10400,16340,7430,26,48],
[24720,13310,20915,9505,31,52],
[31640,17035,26775,12170,37,56],
[40500,21810,34270,15575,44,60],
[51840,27915,43865,19940,53,64],
[66355,35730,56145,25520,64,68],
[84935,45735,71870,32665,77,72]//20
],
[//citywallCost gid = 31
[0,0,0,0,0,0],
[70,90,170,70,1,0],
[90,115,220,90,1,0],
[115,145,280,115,2,0],
[145,190,355,145,2,0],
[190,240,455,190,2,0],
[240,310,585,240,3,1],
[310,395,750,310,4,2],
[395,505,955,395,4,3],
[505,650,1225,505,5,4],
[645,830,1570,645,6,5],//10
[825,1065,2005,825,7,6],
[1060,1360,2570,1060,9,7],
[1355,1740,3290,1355,11,8],
[1735,2230,4210,1735,13,9],
[2220,2850,5390,2220,15,10],
[2840,3650,6895,2840,18,12],
[3635,4675,8825,3635,22,14],
[4650,5980,11300,4650,27,16],
[5955,7655,14460,5955,32,18],
[7620,9800,18510,7620,38,20]//20
],
[//earthwallCost gid = 32
[0,0,0,0,0,0],
[120,200,0,80,1,0],
[155,255,0,100,1,0],
[195,330,0,130,2,0],
[250,420,0,170,2,0],
[320,535,0,215,2,0],
[410,685,0,275,3,1],
[530,880,0,350,4,2],
[675,1125,0,450,4,3],
[865,1440,0,575,5,4],
[1105,1845,0,740,6,5],//10
[1415,2360,0,945,7,6],
[1815,3020,0,1210,9,7],
[2320,3870,0,1545,11,8],
[2970,4950,0,1980,13,9],
[3805,6340,0,2535,15,10],
[4870,8115,0,3245,18,12],
[6230,10385,0,4155,22,14],
[7975,13290,0,5315,27,16],
[10210,17015,0,6805,32,18],
[13065,21780,0,8710,38,20]//20
],
[//palisadeCost gid = 33
[0,0,0,0,0,0],
[160,100,80,60,1,0],
[205,130,100,75,1,0],
[260,165,130,100,2,0],
[335,210,170,125,2,0],
[430,270,215,160,2,0],
[550,345,275,205,3,1],
[705,440,350,265,4,2],
[900,565,450,340,4,3],
[1155,720,575,430,5,4],
[1475,920,740,555,6,5],//10
[1890,1180,945,710,7,6],
[2420,1510,1210,905,9,7],
[3095,1935,1545,1160,11,8],
[3960,2475,1980,1485,13,9],
[5070,3170,2535,1900,15,10],
[6490,4055,3245,2435,18,12],
[8310,5190,4155,3115,22,14],
[10635,6645,5315,3990,27,16],
[13610,8505,6805,5105,32,18],
[17420,10890,8710,6535,38,20]//20
],
[//stonemasonCost gid = 34
[0,0,0,0,0,0],
[155,130,125,70,1,2],
[200,165,160,90,1,3],
[255,215,205,115,2,4],
[325,275,260,145,2,5],
[415,350,335,190,2,6],
[535,445,430,240,3,8],
[680,570,550,310,4,10],
[875,730,705,395,4,12],
[1115,935,900,505,5,14],
[1430,1200,1155,645,6,16],//10
[1830,1535,1475,825,7,18],
[2340,1965,1890,1060,9,20],
[3000,2515,2420,1355,11,22],
[3840,3220,3095,1735,13,24],
[4910,4120,3960,2220,15,26],
[6290,5275,5070,2840,18,29],
[8050,6750,6490,3635,22,32],
[10300,8640,8310,4650,27,35],
[13185,11060,10635,5955,32,38],
[16880,14155,13610,7620,38,41]//20
],
[//breweryCost gid = 35
[0,0,0,0,0,0],
[1460,930,1250,1740,5,6],
[2045,1300,1750,2435,6,9],
[2860,1825,2450,3410,7,12],
[4005,2550,3430,4775,8,15],
[5610,3575,4800,6685,10,18],
[7850,5000,6725,9360,12,22],
[10995,7000,9410,13100,14,26],
[15390,9805,13175,18340,17,30],
[21545,13725,18445,25680,21,34],
[30165,19215,25825,35950,25,38]//10
],
[//trapperCost gid = 36
[0,0,0,0,0,0],
[100,100,100,100,1,4],
[130,130,130,130,1,6],
[165,165,165,165,2,8],
[210,210,210,210,2,10],
[270,270,270,270,2,12],
[345,345,345,345,3,15],
[440,440,440,440,4,18],
[565,565,565,565,4,21],
[720,720,720,720,5,24],
[920,920,920,920,6,27],//10
[1180,1180,1180,1180,7,30],
[1510,1510,1510,1510,9,33],
[1935,1935,1935,1935,11,36],
[2475,2475,2475,2475,13,39],
[3170,3170,3170,3170,15,42],
[4055,4055,4055,4055,18,46],
[5190,5190,5190,5190,22,50],
[6645,6645,6645,6645,27,54],
[8505,8505,8505,8505,32,58],
[10890,10890,10890,10890,38,62]//20
],
[//herosMansionCost gid = 37
[0,0,0,0,0,0],
[700,670,700,240,1,2],
[930,890,930,320,1,3],
[1240,1185,1240,425,2,4],
[1645,1575,1645,565,2,5],
[2190,2095,2190,750,2,6],
[2915,2790,2915,1000,3,8],
[3875,3710,3875,1330,4,10],
[5155,4930,5155,1765,4,12],
[6855,6560,6855,2350,5,14],
[9115,8725,9115,3125,6,16],//10
[12125,11605,12125,4155,7,18],
[16125,15435,16125,5530,9,20],
[21445,20525,21445,7350,11,22],
[28520,27300,28520,9780,13,24],
[37935,36310,37935,13005,15,24],
[50450,48290,50450,17300,18,27],
[67100,64225,67100,23005,22,30],
[89245,85420,89245,30600,27,33],
[118695,113605,118695,40695,32,36],
[157865,151095,157865,54125,37,39]//20
],
[//greatWarehouseCost gid = 38
[0,0,0,0,0,0,0],
[650,800,450,200,1,1],
[830,1025,575,255,1,2],
[1065,1310,735,330,2,3],
[1365,1680,945,420,2,4],
[1745,2145,1210,535,2,5],
[2235,2750,1545,685,3,6],
[2860,3520,1980,880,4,7],
[3660,4505,2535,1125,4,8],
[4685,5765,3245,1440,5,9],
[5995,7380,4150,1845,6,10],//10
[7675,9445,5315,2360,7,12],
[9825,12090,6800,3020,9,14],
[12575,15475,8705,3870,11,16],
[16095,19805,11140,4950,13,18],
[20600,25355,14260,6340,15,20],
[26365,32450,18255,8115,18,22],
[33750,41540,23365,10385,22,24],
[43200,53170,29910,13290,27,26],
[55295,68055,38280,17015,32,28],
[70780,87110,49000,21780,38,30]//20
],
[//greatGranaryCost gid = 39
[0,0,0,0,0,0],
[400,500,350,100,1],
[510,640,450,130,1,2],
[655,820,575,165,2,3],
[840,1050,735,210,2,4],
[1075,1340,940,270,2,5],
[1375,1720,1205,345,3,6],
[1760,2200,1540,440,4,7],
[2250,2815,1970,565,4,8],
[2880,3605,2520,720,5,9],
[3690,4610,3230,920,6,10],//10
[4720,5905,4130,1180,7,12],
[6045,7555,5290,1510,9,14],
[7735,9670,6770,1935,11,16],
[9905,12380,8665,2475,13,18],
[12675,15845,11090,3170,15,20],
[16225,20280,14200,4055,18,22],
[20770,25960,18175,5190,22,24],
[26585,33230,23260,6645,27,26],
[34030,42535,29775,8505,32,28],
[43555,54445,38110,10890,38,30]//20
],
[//WWCost gid = 40
[0,0,0,0,0,0],
[66700,69050,72200,13200,0,1],
[68535,70950,74185,13565,0,2],
[70420,72900,76225,13935,0,3],
[72355,74905,78320,14320,0,4],
[74345,76965,80475,14715,0,5],
[76390,79080,82690,15120,0,6],
[78490,81255,84965,15535,0,7],
[80650,83490,87300,15960,0,8],
[82865,85785,89700,16400,0,9],
[85145,88145,92165,16850,0,10],//10
[87485,90570,94700,17315,0,12],
[89895,93060,97305,17790,0,14],
[92365,95620,99980,18280,0,16],
[94905,98250,102730,18780,0,18],
[97515,100950,105555,19300,0,20],
[100195,103725,108460,19830,0,22],
[102950,106580,111440,20375,0,24],
[105785,109510,114505,20935,0,26],
[108690,112520,117655,21510,0,28],
[111680,115615,120890,22100,0,30],//20
[114755,118795,124215,22710,0,33],
[117910,122060,127630,23335,0,36],
[121150,125420,131140,23975,0,39],
[124480,128870,134745,24635,0,42],
[127905,132410,138455,25315,0,45],
[131425,136055,142260,26010,0,48],
[135035,139795,146170,26725,0,51],
[138750,143640,150190,27460,0,54],
[142565,147590,154320,28215,0,57],
[146485,151650,158565,28990,0,60],//30
[150515,155820,162925,29785,0,64],
[154655,160105,167405,30605,0,68],
[158910,164505,172010,31450,0,72],
[163275,169030,176740,32315,0,76],
[167770,173680,181600,33200,0,80],
[172380,178455,186595,34115,0,84],
[177120,183360,191725,35055,0,88],
[181995,188405,197000,36015,0,92],
[186995,193585,202415,37005,0,96],
[192140,198910,207985,38025,0,100],//40
[197425,204380,213705,39070,0,105],
[202855,210000,219580,40145,0,110],
[208430,215775,225620,41250,0,115],
[214165,221710,231825,42385,0,120],
[220055,227805,238200,43550,0,125],
[226105,234070,244750,44745,0,130],
[232320,240505,251480,45975,0,135],
[238710,247120,258395,47240,0,140],
[245275,253915,265500,48540,0,145],
[252020,260900,272800,49875,0,150],//50
[258950,268075,280305,51245,0,156],
[266070,275445,288010,52655,0,162],
[273390,283020,295930,54105,0,168],
[280905,290805,304070,55590,0,174],
[288630,298800,312430,57120,0,180],
[296570,307020,321025,58690,0,186],
[304725,315460,329850,60305,0,192],
[313105,324135,338925,61965,0,198],
[321715,333050,348245,63670,0,204],
[330565,342210,357820,65420,0,210],//60
[339655,351620,367660,67220,0,217],
[348995,361290,377770,69065,0,224],
[358590,371225,388160,70965,0,231],
[368450,381435,398835,72915,0,238],
[378585,391925,409800,74920,0,245],
[388995,402700,421070,76985,0,252],
[399695,413775,432650,79100,0,259],
[410685,425155,444550,81275,0,266],
[421980,436845,456775,83510,0,273],
[433585,448860,469335,85805,0,280],//70
[445505,461205,482240,88165,0,288],
[457760,473885,495505,90590,0,296],
[470345,486920,509130,93080,0,304],
[483280,500310,523130,95640,0,312],
[496570,514065,537520,98270,0,320],
[510225,528205,552300,100975,0,328],
[524260,542730,567490,103750,0,336],
[538675,557655,583095,106605,0,344],
[553490,572990,599130,109535,0,352],
[568710,588745,615605,112550,0,360],//80
[584350,604935,632535,115645,0,369],
[600420,621575,649930,118825,0,378],
[616930,638665,667800,122090,0,387],
[633895,656230,686165,125450,0,396],
[651330,674275,705035,128900,0,405],
[669240,692820,724425,132445,0,414],
[687645,711870,744345,136085,0,423],
[706555,731445,764815,139830,0,432],
[725985,751560,785850,143675,0,441],
[745950,772230,807460,147625,0,450],//90
[766460,793465,829665,151685,0,460],
[787540,815285,852480,155855,0,470],
[809195,837705,875920,160140,0,480],
[831450,860745,900010,164545,0,490],
[854315,884415,924760,169070,0,500],
[877810,908735,950190,173720,0,510],
[901950,933725,976320,178495,0,520],
[926750,959405,1000000,183405,0,530],
[952235,985785,1000000,188450,0,540],
[1000000,1000000,1000000,193630,0,550]//100
],
[//horsedtCost gid = 41
[0,0,0,0,0,0],
[780,420,660,540,4,5],
[1000,540,845,690,4,8],
[1280,690,1080,885,5,11],
[1635,880,1385,1130,6,14],
[2095,1125,1770,1450,7,17],
[2680,1445,2270,1855,9,20],
[3430,1845,2905,2375,11,23],
[4390,2365,3715,3040,13,26],
[5620,3025,4755,3890,15,29],
[7195,3875,6085,4980,19,31],//10
[9210,4960,7790,6375,22,35],
[11785,6345,9975,8160,27,39],
[15085,8125,12765,10445,32,43],
[19310,10400,16340,13370,39,47],
[24720,13310,20915,17115,46,51],
[31640,17035,26775,21905,55,55],
[40500,21810,34270,28040,67,59],
[51840,27915,43865,35890,80,63],
[66355,35730,56145,45940,96,67],
[84935,45735,71870,58800,115,71]//20
]
];
var imP = 'data:image/gif;base64,';
var imPNG = 'data:image/png;base64,';
//base64 coded images
var image = {
"igm":			imP + 'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAICAYAAAAvOAWIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QsKFws6qttDxQAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAkUlEQVQY05XQTUpDQRAE4K8yz9BuPEduEH8C2Tw8haeT3CQbPZEiIeNmhLdIAvamqerqaqqDdxxwcr0mvAWv+MYHfi4I13hErXCuqmOSp9batFS11qYk26o64gzzmCXJPsl64DvskYHn1cKo995PvfdnPOBl5OjLa/PY3qEGtxm9Bh/MfwG/8Hkj4Bb3+c/rfgHKwRzhskmMfQAAAABJRU5ErkJggg==',
"imgo":		imP + 'R0lGODlhCwAPAPcAAEBAQAAm/4CAgP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAACwAPAAAIRwAHABhIkOAAgQcTHgSwcECAhw8RSlQokSHEiAwnKsxo8SLCgRQXAhAgwKFHkiVLKkypUuWAljBRHiT5kiJLlysFjETJU2dAADs=',
"underline":	imP + 'R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs=',
"globe":		imP + 'R0lGODlhDAANAPcAAAAAAAVrEwB0CgB4DQB7DQByHwplPQF+MRZlNxJwOQdcRAZYagRkTwFuTRhiUAFjditgawM/pQBHmxVHlx9UgwFApwNGqABGrQJJrwBQtQBUuwBevBJCpxREqRdFqxdWsgFrpQB1tAF4uitcgShOtCJXtjdXpDddvjhXuDtdvTxltQBcwgBrzQFuzQ1oxxxsxRV41EFdiUdemkRerVxsk1lsmkZxvgGCNiSoLDSxLgGGQQGETAGJWQyTcB6beD6NdSWkfky/LEK3RljFNWfNRWzPQ2LKU2/QVHTTan7YdQGAjQiHjw2Xgx6KnQKIoQiEohyilTazjQGJyQKD3AaS2AGG7QmY5BKe+xehxzSd6DCw+meBkHqJmHKQmHaIqnmGo06Qz0mj3kq+/nam2nbNrGfL13rU1JyisqOotKistqW6va6yuYir1pWnwY3YkIjcq4LStZDhkZPhpJ3mpJzlrqTpoqTjtpvV0p3K66rL0qHZ0KLH5qfjzabow7XwxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAMAA0AAAifAP8J/McHDpk7AwfaeSMnyRAgWfAMdINkjh86RqBMaZLnnx4hReLU6VMGi5MDP/6F8RGEyBEzYqzwIJBADYwnOHJE0XJFyo0CBrq4aLGkBxMqVZQMCOBgy4sVLETo2BECBAMEELiAwaBhQwMBDzJYGBEDzZ4PFS4sUCAhAgcTNASOKdGBwgQPJFDIWDOQjQ0VJ1LMqJEmocA2Xr6cSRgQADs=',
"usethempr":	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAntJREFUSEuVlU1ME1EQx1dOHD169OjRo0eP3rTGLV5Mjdui3lCaQEy01bAtfiDRlIgEwbYkxBAwVVGCgZqI8WsNcjBNlYMJoYRaWNq1ZVtWVv6bvGa7fbv7mOSlzb7Z/29m3szbA5yLtQnR43DZbeGMXztr2eXeYa9VUz/F4zdVN92G/ZO+0MGuWyNjiYm5yvLvnIyluxjxm3z1Yfua+HSa9905xAQ9I0ROTL5YyGvav5obxGn/9ZxUuHClP+AI7RZHn6ys5l2zYQ2kIJe2eu6Pp6jQQOeDc+t5eZNVjNWvXFH/Xu4aCDdAUe+Xs1/W7ERyuZwuSZKezWapLtjDsrOPUmbjdLt4pA4N3x2b0TSNemapVEoXBMEQFEVRDwaDTboej0dHUE52e2Bi0QD6fKFWdJadM8TMZhUnwbiVeGZeUtH9HObMqe2tQGRJyheLxXQsFgPDmGneHz1fLJUVpwwJQFEUnQSAZ7Ty2umo1Zrq9Uc69oCRS3udVHaKEsJYKB8axwzGe25NA58dTdvhBbGbw6Dvd/aQJcBoFPxPp9N6MpmsZ08Lfm1d3vK2i6c4jMT8+++OGZoFkCnEYcjY3J14TvasUDDq113f4FSG5eDJiBBfa0OR0aFpDSXe/KnPIe/vOfpt6VfBCQoxKwDZmLvUmjHRw5Hh6Bpum6uh4XuVbZXarTgvwGjlAhAgLFTAavgI3OhNTDXdp7gA+oeeL1WrNdtLgKXsZh/A4s/eZoyBpxmgndcfP8z8XJH3K271RxmRmS3MHIDX33vs0ej06sLnHwramRW+sVkqfl3MFkfGZ4tNZ8byNW67GD2M2eED0TDL8gbEsw1fBQrkP6+jTExmIuLUAAAAAElFTkSuQmCC',
"usethemeq":	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAflJREFUSEtjZCAAwpPbHUBK/jExgGlcgOkfwwGQHMefHycWLmz8QchcFHn/+HqB8qZ5Sxat3vvtzoNn70H4PwEAU7d2y9HvVa0LtobGd0kQZWlIcpvH2k1HXv358/cXIUvwyW/be+ZNUmF/Kl5LK1rnz3389BVB3xDrkDfvP31o6Vu+EaulqcUTY1++ev+OWMOIVff1248vmeVTG1AsBYX35l2nnhNrCKnqjp+5/jYorVUDbmlD95Idf/78oSjOCDmic+rq82AL4+PrOUApi5AGSuV37DvzA5T6GUD5jJhkP2XKlP9nzpzBijdu3Pj/5s2beN0EsgOcp0NT2hM+fvr6mZAPAgMD/9vY2ODEIMfgAz9+/voRltJWALSwLQOYkr4SsvDzZ4JuwmvE7z9/focmt1YwgDI6MXmP0iB9/vL9h7C01gAGUJbYd/gCQR9SGqQgO+DFXe+MdddpHaSzFm1/Dc+HoSktBmcv3n5DyFJy5UFRBoo6lNKmqH5Oz7fvPyhLGVhcBKoE6joWrcMoT0EFQP+s9Rd//vxFtUIAZNnClbuvgzM8NgCytLh25qTrtx5TXGOAghHkM5yWITsgLKXDYvr8rU+PnLz6GZSciY27t+8+fTx9/ubHect3fcSIM2Jq4/D0dgVQ3glNbW8gBoeltkag1ApYLAEAIKtp4+xd+jMAAAAASUVORK5CYII=',
"usethem1h":	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAA8FJREFUSEudlUtsG2UQx01PPXLkyJEjR46coPQCQjjlgoJIUtITLRWkQoIEVCflWYFUAVEfJKpUoZICgUBUlAqJIkobmkdBVuq68Wu9tnfX6/V6n971n5kPOfL60USMtLI8+3l+8/jP54diu9ihkZkn+UhrX0x8DrJ9rdiv/G5/4N6Ym3vX3S1u5P2zw5MPT7x3/uL85RX7Xqao84NdrH1u4cffnbcSXy3Fhz94ZE/QF0amDywsXq8EQeh3Mnzfh240IFd05IsaspKKgqyhrNbQsBy0WmEkpZ9WVtVXjp0eeyD0ROLCubxEETssDANUdR3ZfAkFqYJyWYWqaNAUFUpFRVGuIEPvJPq0bTsCVfV67eQnl77vCx07/ulL5Ype7fxFMwgooILtrARN0+HZFkLXRmA16DHFZ+jY5Lchl1SktyXqghmBWrbbODJxZioC5X7/cPWm3Hmy1QIUzaDsZXiOg3q9TnAZDaOGgMBNhhLMNk2Uya8pClRKKp2lM9TiTvtjNak9fzjx2A506sOLy0EQRGbmek1kCxXU9BpavicC5wsScvkCfAK2PBeuZWErlcbt9Q1oqgoaJM1XodmqCDnjDnv/zOU1ARwentzPyuoWoWE6YjauWUeTAFyN2yDRyGWRhGs7oqJCsQSTkmmLpkotvU9V+n4zEnL52qrL6o/xnvWTvW5YAugxkNonoK6DkKrNFSvYTKZQNxs9y1IzLaQzNIYuIDPETsdHZ1426qSALmvYHrZzJZqZge8WvgE1A/dTdxE2faFGnapkXzabjfyypFSRKZRBaxXxu57vDo1OHyXg9DgpyeoGBmEIqVTFa0ePIXnnjgi+nb6HkJTLs2LrBtqOR6Ipgtahp3JSfDM+kjgR40Xv3r32advxhXBk2r3/gmcigdi3uLiI8fFxPHPwIJaWVyhJDZxst8llvTZ0OPFcjFfi2m/rPRXuQF1f3CgcfH3zb9iOC78ZUMsC4XvjzQlKSMPsuTk89fSBnla24zBj57r7+IsryZ6UOhycMQe/dXtTyD5HN05OUoTvxs01VOh629pKie+DbHb+Z2VnD+OjJx//ayNFizTY+gmk08fiGQTkkfHoIrfN65NnP6J29ai1ncL/BfKfwDun5q/03Kd8AZye/XbD8/zIJcCg7qe9CrtVyLC5r39JioXvZww9/vaXnyXv5vUHtXcv77iNXNlAWGcCQ6Onnvj8wpJ0/c9/TJbzXgB8RqvWjVtrW8b5S1eNnpn1LbHLeejVmUd5d+JjM1N7eYbGEi9G/hX6QP4F7nAoMfND3esAAAAASUVORK5CYII=',
"bDel":		imP + 'R0lGODlhLQAUAPcAAAAAAHHQAJoIBZQ2LZ8xKZw+NqMDAa0NCaEVDqkfGbwFArsKB7oPCrIVC7IUDbgSDrcYEqslGq8iHb8kFrgkHKYvJKc1LLU+Lb4/MLBFM5hKQZVWT55gWaRMQqpZSaNjWrpgUqxyZqlyaqV9d8IHBcwEA80GBM8KBcMVDc8bD8YbEdQOD9MSCdURD9YREdUSEdYYEtQeFNkWE9oYEtgeFdkfFtwcFMElGtAjFd0gFt4jF90mFd4rHcIyIOAjF+ElGOEnGeIoGeIpGuIrG+AtG+MvG+QpGuQrGuUsGuYvGuYuG+MwHOcwGuc0HugxHOgyHek1Huo2H+w5H+Q1Iuk7I+w4IO46Ie89IfA/IshHKc9LK8JJOsVNO8tONsxIMdJCKeBHJelFJO1BI+9FJO5JMfBAIvFBI/FCI/NEJPFFJvRHJfdNJ/hNKPpSKfpTK8JcTclcRsxcSM1pVsN9dtB+cK6Jg7aQiM+ZktSViNWjmcOrp8S2s8i4tNanodqxqNqxqtqxrOC+ucrKyszMzM/Pz9PFw9LS0tnS0NjY2Nra2tzc3OTKxebQyujSzuPd2+Pe3enV0ODg4OLi4uTk5OXm5Obm5ufn5+ro5+jo6Onp6evr6+zs7O7t7e7v7e/v7/Hk4fHx8fPy8fPz8/T09PX19fb29vf29/n08vj4+Pn5+fr6+vz8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAtABQAAAj/AP8J/BegoMGDCBMqXBhg4MCCriJKnEixosWLrgo+xMhx4h86eBh1jMiqIcGRrvzEkZPn1MQ+KKi40YLSVMMArXLq3LnTC5k0Y+B8yhmIAQs2bbLwXNqKVSlOBZuymkq16tQLU7CYOdMFUiMIJ9CsAWPHqtmppCwVZLWqrdu3bvlU2GHlCpYvFEpIURMmhCm4gNuOmlSwrarDiBMjPlQgRZQqVpgkKSPGAyfFmBGDklRQVSpUoEOLFn2JQ4MlUB5byfBotGvRniIV/Gyqtu3buE0NEEDEyZMmIHILtx27IKpSpJIrX858joEDQo4gUVLkDfPryzfJDmBqlKjv4MOH2r+jgEQOHzhUBDEyZIv49+A1KSpIShSo+/jz4we0oMQMGzF8sIEDOvwABAb6JXhfJokUNAoonkQo4YQRLnKDCS3IAEMHnIQyAgI05DABhSRGiAkiBYHSySYstugii1zw0IILL1jgSIt7aBCBCC/2uIkmkxhSECeaZGLkkUga2UMNK6wgQSFJRimlkZMgIiRBmFRCSSVcdullHQQ8kIAeXnaJZJldUhJJIoSYFEAkisQp55x01mnnnVYOMohJBAVgCCF6Biqonn8OauihegoiiEYO9cnQo5Ai5FBAADs=',
"bSave":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAC4AAAAUCAMAAADFhv/OAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAIDBAMDBgMDhwMEBAQDhwUFBQUFhwUGBwEDigMDigIECgIEiwMECgMEiwMFCwQDiAQECAQEiQUEiQQECgQEiwUFCgUFCwUFiwYFiwYGiAaWqOYHiAcHiQQFDAUFjAUGDAYGDAYGjAYGDQYGjQcGjQcHDQcHjQcHjgcdAAcICQgHjQgHjggIDggIjwkIjgkIjwkJDgkJDwkJD/oJjgoJj/sLjAoKDwoKD/oKjwsKjwsKj/sLDwsLD/sLjwsLj/wLj/ysrKzMzMz8/PwMDQwMjQ0tLS2NjY2tra3NzcwMjgwMD/wNDg0Njw0ODw4ODg4uLi5OTk5ebk5ubm5+fn6Ojo6enp6+vr7Ozs7e3t7u/t7+/v4ODw4Ojw8PDw8fHx8/Pz9PT09fX19vb29/f38Pj/+Pj4+fn5+vr6/Pz8/f39/v7+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfr7zJgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAFpSURBVDhPlZNrUwFRGIBVJGldFosuNsVqY4mEaimUS5uE3JLWPbb+/1e9i+qcaZrR8+3M88x75sycVzEF2KWQS4UcfywFy8r5kjFMlNjfeSLB8xfRcDAY4LweBrt2ADn7jsMLp4tmSNvtqJP6TRZyCYMXTub58NWxasNU7wlyaYJxLnCLuq33UZjqliCfTMYoUeFoPrtd0DEUpsRHyMdvI5SwIL9Pru+1LgpTrSLkb6MBSlBwLeo7jdOEqVk+6vdQAtdXh/u0Q6/Tapw0iamGnA+6HRQuHo+F/JyPcTtpK4mpeh7yXkdE8V7GQmpgY5u2WoyYquUg74otFA/MViuUhYddi8VsxFQ1C7n43EBhzvycWrn30j4mzIQBNfVSBvJmvYbiDnFbK5HIze06QWyqUFPKQj5lq5Vy5YedAxtFUSaSNBoMqrXKtysXc+nZjyzm/wI12UwqJeewHpl0CgE/fYlkcr4e/1q+T12HLuCJR4bvAAAAAElFTkSuQmCC',
"bOK":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAC8AAAAWCAYAAABQUsXJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAgVJREFUWEfdl0urQVEUx93Bnd4PcL/lnXlMFMmAiZGUx4SBlDLwKJFHXhERoSiSkMhAKWld/1Vnd06329U+k3PuqT/rbNZev7VaZ7WPxfKfrq+BhYyqX+usAJOBLxXjm0gEi4/HwzQCrwb+fr+TWSTgYdxuN9OJE8DH9XrVrcvlQtvtls7ns+69XuER8Agsq8PhQLFYjGw2G1mtVlY4HKbNZsN7DodDXut0Ony/2+3I5/ORw+GgwWAgHVfAn04nkpUCns/naTabUbPZJJfLRX6/n47HIwMCvtVq0X6/p0AgwIkiGdmY8BPwqJ6MVqsVgyUSCY1/vV4XwL1ej22sBYNBYcvEU/sIePSqjLrdLsOUy2WN/3w+5/VMJsMVhu3xePjb6XTScrmUiqdmFPDr9Zpk1G63GahYLGr8J5MJr6fTaW4j5VmIx+Nso9Vk4ql9BPxisSAZjcdj7t9oNKrxLxQKDFkqlahWq7GdSqX4P6FQiO8rlYpUTIVTwE+nU5JVJBJhmGQyyVXO5XLcGl6vl5AcWgq/IyHEQKth0rjdbhqNRtJxBTw2kRWmCRKw2+2iPTBRMF2wJ1oK8NlsVsRQt49sXAHf7/dJr1BRTBQ8oHr3esVfwCOg2cTwzxPwO4xGo2Ea/ThVVqtVMos08M/qfygHfUwHo0ph/PONyoivgs8if/6bV+5vVrsE+rT9pU4AAAAASUVORK5CYII=',
"bClose":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABMZJREFUSEu1lXtQlFUYxg+jIIXoBMw04vpH2i6sOoIkDgTeYBAFC2uhsBKScNcJqqGRSwiKEitXEa8tStSMOYOQkaloIFPCtGDo4AUQBANUZIGNm6i7sDy956yidvurvtlnzvu9531+z5z9vtm12BXoBVuryczG0oqNjBrFOtVqErOxsmTTabW1tmTiAn1gIQpYgJnGLdj4OJjRNMYM4+PswZiJ3Tea2LBxlN0zjhFjsljvEZPFrvTG6OgoxsbGJlZe/1cK91sBlrTKG0MXtejS5EB/rBD9pCHSSMmXeFBSCMO3hTCSRo//SY/6Bpq5T7pH80PFZr++qFDw+s+dQrjPUrDtq5dMhPTQRl9+NgZIw4ezcZ/0sCDnH2UoyBl5SDMjpCES93E/5zwOCVvuBZYW8OQkui+y0KfJQr8mE8P5mdBsjkXw26oJaWJjYSzIQn5s3LN9mhuiee7rI4buYNZEyPqlHmBqChmsqcKt3FTc3Z2KnrxU6PfswODeHVC8pYTJZMI4PWEuHqiJifnb/gB5uI/7u4hzO/dz6E8fx3uei8AyVnuhv/oc2tPicUsdjy5Sz854/J4ejwPR0QLMXwIexld+z18Ufs8VErpJzPXRvI58Xeo4dBKrXZ2A3tKjeNfdFSzd3wN9FafQHKdEW7wKHQlK3PlMCV2iEoPJKhxQKQXYYDDAaDROrLzmAfuVGzGQpEQ3zd8mXzv5OaclToW73xxGqIucvi5fd9w9WYL6SAXqw9eg4f1ANJNuRgSiN0qBvqhg7AsPE0Hd3d3Q6XRCPGAv9Xs/5DMKtG0w+66FB6I+bA0uE689PxfBzrPBUjzlaNifjWNSO5QtdEQF6bzbDNS+MgPXFkxDIylz5QrxHJ4O4aEZ1G+gfS4tzXMf9592dUSx9AVoYyLhN20KhXg442peOo5IrPHd7Odxcs5zKH/ZGuel1rgsnYRMX28R0N7eic7OJ+ro6KTTKZHh4y3mfqL5H+dYC/9x4hydNQXV0WHwtZn06CQHslAkm4bv59qibJ4tKufboHqBDTJWLRMBLS2taG01KyRUiRs3zDVfRRDNVdH8OfJxfylxiomn/TQCftOtwLZ5yXH90C6ULnRA2WIHVHja47yXPWqW2omAhsYmNDWZxQMyg3wEuPFRv5H6/F67xE74KjzsBeeEmwPqElXwd7Cmn5VX5Wg9sgdnfGahcpUE1YES1AZJcOnNmcgKXSkAj8Xvm99xRPa6v/YvvjETta9JUBUgQaW/BOX+L6F+ZwxenzkVbIv3XHSUHESVwhk165xQF+aEyx/I0LBJhuaPZGiLkf6rWj+R4nqUDFdVMtRHyFC33gla4mg3LMbFfdsQNv9FOsmyebhzQoNfI91Qt9ENlzYtRFOCC1qSXNCR7YLf0l1wM80FrSnmHt9riHXF1RjXZ+orH7uiPnoRrmz2FRzO4yGcz75WeGPk9FfoLdqKntIU9P6QAv2pbeg/m4z+ymQMVpFqkzB8KRFDF5Iw+EsyBn6mvXLqP1Xrz2yF/qxa+AWHeJzL+Wx3gDuKQ5fg0Fp3JCyXYouPFNtXO0GtkCMjRI70YLmo1WvlSAtyRuoaZ7G/1V/2TJ3kJ0Wir1mcw3mcy/nmf73/4bqQlzr1MfYPNcKdTI8iX3wAAAAASUVORK5CYII=',
"bMin":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABHtJREFUSEu1lXlQlGUcxx+PGM0jO8WybMILddnFpnTAtDSnpqZj0tGZnI6xEq0YrzxQIWkByxQQMQSVAIHFRUUOFS8OWUDQRZCFZV1CXOISnClvOfbT82zWTH/pH/nOfPd53t/z+32+7/udnXn7zI7Kwm3wY8Jt8FDhNmiw6DdgoOjTt7/o26+/kD/igS5nr3A6ewS9PcJ5947ounlDdN24Jq63NAq3IcOEmDXnE7q7u+np6XkoUnwx/cMFlF7qYG/5ZVLPOkg1N2OsaMVY1cbBqg4OVXeQWd1JtkWq9io5NZ3kqPWesuV9luUqmRc6XP3pF9rYd74VQ0ULRfUdKL6Y9v7H/5vJgcor/zE5bb+C4guf9+Y/NBP1JoovprwzD9PFdnad/o09RQ0kljaSVOYg5VyLjK4FY2WbjO4KRhmHUUaXLqMzSqXL+FQtXdWr2jFUtpMiY04pb2bvGYeLc6quHcUXk2d/RL61le35dewosBFTYCdOmu0ubiShtImk8haSpWGKuZXUirZ7anetKWalVtd5Ylkz8aUO15ya31lYT66lDcUXk974gKMXmvnxcDWbj1jYkltL+HErkXl2ovLr2VHYQEzRJWKLL0s5iFMqaSK2xOG6jzU18os8j5Z9qn/bKRsRJ+rYeqyWjIomFF+Mfu1djGUNrEwtY5WhnDX7zKzbX8H6jCqCsqoJzrEQcqSGsFwrYcfq2HTMxqbjNsKk1Loptw790VqCD9cQlG0hMKNSzp9nrdFMosmO4ouBnjNYlWJixOIERvon8sKyZDy+S2Ps2nTe9Atlzny/B9LsJaFoAjMZJ+c8VqYxankyX+4qQPHFI+Om821CIY9+FsuQhbsY5hfP098k4b7MwJx5i+jt7cXpdN5Xc+XDPB9wkBHLUnlGzj++OJ4F0SdRfOE2fgZLk0wMXbiHJ7/6leFfJ8rGNJ5bf9BlYrfXU19/f82dv4iRodmMDJRGK9Jwl0afxuSh+GKA5+usNpQw3C8B9yUqLgOj1h7gxZAcl0ltrRWr9f5SJi9FnMQjNIdRAQdkXAa+2JmP4ouh2rcIkiZjlhvxWJ7GGPnK46XBBDkwc+XPqOEH0cw14XjuKWJi5Ek89YcZuy6DJfHFKL4Y4TOPrfuL8QnOQRNwCK/gI3hvPYV3XAneqefQZZ1He7waTb6VicU2JpTa8DwrVWZjYpHNVdedsOCdWYl3mpmXd5vQReSh0x9l6d4yFF9MX7jhb5OIQt6OKMA3Uir2DD7JZnzl33dK3kVeNTXwirkRncWBrqYJL+vv6Gqb0FU7XHV1PjXfztScaqbJB/ONk/OSt3pfJYrvMomt6SDmUidRzX+QXNdGvNzHyv22zpvo/7yN763bjO7qwr2ni6d6uxnk7MZNapDcPyFrz969w2jZ43vtFj90XndxFE9xXSaen2/gH032j0Djp0frH4Z2xWa8A8LRbYhEG7QN3cYoNPrtaEKkQqOZFBKNlz4K7feReAWG4xWwBe2qn9D4hzLJb+O/TMV2ffiW5lrlZ/DhXX8BmUnqCVosKVcAAAAASUVORK5CYII=',
"bMax":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABERJREFUSEu1lQ9MlGUcxx/UmBqRWy1iBi0NFeE4IBMGAVZjbbX+LAqbzdpoglYIlvw5SSwk/v8RiBk5To4/h5z8BwEPkAMhhAPiBO84OP6GcQdSyUToDvj2PK+DDWeDrflu3/f3Pu/v+X2+v+d533evkWdqOYxNnibGJqbE+EkTsnHzFkKIETHauIls2LCJ0BMdr3FgiWBxgSwtUf0zTwz3Z8nS4iLR35uhukvIm16HYTAYsLCw8FjE+MT9g0/ROjyFnPZRiOVjEHfexuWOCRQptChR6FDSM4WKW3dwRck0jSrVNCpUf3KRid2rpPnynjsoU0yimNax+oLOcTRqJsH45LX3Dj1WE8YnLu8e/E+TU/GZ+Oig37oURucur6SwU7uyEsYnTm97o7lfhwtNg8i8PgRR6wiy239Hrnycg+v1eu6ZrSU2N79rAnm0LofWi1qHca1vAoxPHD0/RINqAmkNfUiXqXFeNsCZCVuGOZP1vhRsbvaNUVxsGUFm8xAymgZQc/MPMD6xff19VN+8jZgrPYir6kVCjRJJUjVSr6lXmXz8ydFHbttyE8wkXTZI6/qRXKtG0lUliumLxPjkZbd3IGkbwrfiNgTltyOkoBOniroRXtLNQbVaLXQ6HXcdK1UhlgJipP2Io408nI+ovIXwUgXCirshkHRARFfD+GSLtQeC8pphfjQLL/iLYBmYC6ugAtgILsPLe7WJW4wUbnF1cI+vh1tsHbweasLxTDlsBYXYHSzBDso5klEPxidP7HbH11mN2Pp5Bp7yuYBtfkKYHc+BxclLnMno6BjGxsZo174cdJW8fVflrUKLaJNimPvn4llfIQ6lXQXjE+M9HgjIboapTyaeOXIRZl+KsD2kAJaR5RxwYEADjUbDxUeJ5ZhYE1YRZdgZXASLADG2HxPhcHotGJ9stj6A4PxfYeaXhedpwjIwHy9GVGBHcjVnolSqoFKtLWayN7Yae06X0e0uxEvHxfD5RQbGJ6b8txBOTaxOSLDzxCVYCYqxK1EK658b8EZoEtfheuQZlAB+WgN40TWwDa+A9ckiHBPSHaJ8Yu7ijcTCFuyjCZ6gFHY/VMHhfBMc8uRwKO2CvbQXdg0q2FxXY29bH6zlDyIb28v68EpdL/ZVKuAk6YKT8AacU2XYH1XL8QJzWsH4xN3nO87ENboWbilNcD0ng3OOHE7lCjjXq+HUPIhXO0Zg3zMGvnIcfBUVjWy8v3MELvTLdmnUwKNKCQ+JAgeE8gccyguW/AbG50yiuqeRPjSFc+N/I3RyBgm6GQT/NQvXe/dhNTcHC4Mezy3osW3RgK1LBhhTscjGZjRnOT+PXbNzcLs7y9UzDuMx7oqJo38ylsXzOwu7gCjwg+PBFySCfzoZ9t+ngBeRBl7kT+D9SBVJr8+mgU/vszw/LAn2IXTuN9HgfxUJ2y/OwOaz0BWRlC6tyVo/vv+b/xcAf9f/4T3A6wAAAABJRU5ErkJggg==',
"info":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAhpJREFUKFM1kd1Lk3EUxx/pQijqD/C+29qFBt7kosILQzFKijBKqSwpp6IVlClWhgjzLV2aMTOn5dRe1AUuc2K+ZeJcMVm2R1eTfC2VMt3z+31amh84FwfO93w55xui/Oezb1E39mVJv3NHqHFuOaBIQpRd27cpSyvr6bvDQrsj94SNbs0qvSPf9K0On1ppm8HUtcobt8ZLp0bR6zXyrXPU2HxqvW1cvyGY+PpD12CfVAtfzJHTJrnVruGZFTj9gqxWQUYzXKlborhFVe2DkzqltMltuFw9RZpVcvGZ5FKTpMQRoLBL43ywT26EpHpJQsk02Q9cBqWmw0tM8QIJZsHZRklKs6DHq2EbF5x5KklskJx8Iomv+kOO2Y2Sfn+UqNI1IsokR2ol51oCeOYFrhnJaavgeAPE10HsI8mx2yMoqSUfCDeusrcc9lXDqX+CBYFnUZDZKTgRvCH6seTgQ0Fc3hBKabObiHvfCa+SHAhaZ9g1Jn9KppYlhYOC5A7Yb5ZEli2TWRl0uGnqNxzOd6I3B4ixQn6/wL8imf0NtW5J2ls4ZBFE3XGTdNdhUN67/LobpkE1tnicxPZ1cgcEw9Man+Y1LB7Jtd4AR01eUo19amPHR91GFpZXY/rs8j41umA4+Bk/OY4VjMO/uGqbJc7o5ELROzWvomczuC26h7y6lAK74XrVAAm59mB1klXRx3PHBJY21+bmIH8BLUeFBNafPYwAAAAASUVORK5CYII=',
"help":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAhVJREFUKFM1kU9Ik3Ecxl/pIBTR3XvX2sECL7mo8GAoRgw6SP8OHSSbRFb0B8WyjGpumi3N0LRZ6bSotkBFZzp1M3NaTVD36sRaDf9Mo6nv7/19GpofeG7f53n48iQp/5kILxhGp2LGnTuSLdFlTZEkKbu2b1OWVtYLdqckd6ftSRnZulV6h2eNbZ6wanf/oqY7zushQZNPYO1Yo6QlSq07rDrc48YNw+TsoqGpY1q99zbKw06Bf1onEpP8TMgbEhS7dPIbYpS3qmrH4LRBsTUHzedrZrjQImn0CxbjEs+UwDcj0HRwBjROv5CYrD8ofDJmVmpdITLL5zHV61xzC2yfNPLadOz9GnFN4h4XnGiU5FSvcrMuiFLwaIR02xqpFZKj9ZKTzYLWb4LIimRpVVLWI8hpgKxnkuO3hlHyrJ9JtcTZWwn7ayC3TTCxIJmN6TzoT6Q7JRnPJYee6mQX+1BsziD77kZIrZYcTFTnt0s6E493hXXKBiRnXXCgTpJWsczFx4mGG/Z+85GSAMY6jcwWKPJK/BGdQFRS/x3MXXDYoZN+O8iZUo9Z8Y/NGa7bB9Ws8nFyP6xT6tcJzutMLuk4JiRXejWO2UPkWbzqS9dXw8YWjnejxsJKr5pxZ4hTr+Yo7ftD5Ze/XHb/JtsS4Nz9PrW4qmdzuC26fSHDR6/K1eoBTEXtG7pU5eWNZxLH+7HN5AT/AFV8jI8kgcGCAAAAAElFTkSuQmCC',
"alliance":		imP + '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',
"alliancegs":	imP + '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',
"mercado":		imP + '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',
"mercadogs":	imP + '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',
"militar":		imP + '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',
"militargs":	imP + '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',
"militar2":		imP + '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',
"militar2gs":	imP + 'R0lGODlhRgBkAOdsAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAPwALAAAAABGAGQAAAj+APkJHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzpk2Gijz5Yobt3LlV57xhY0YLE0E1MD0xs+fv379+/fbtwwMVqtN6x/TsmaOHpaNfid6Vc4evrFl8U87iy7p1j1tCH7kg4fLFICZv/+xNQvQHnNqyac2+wzPHrds/iJgp6lilC5YsV+jyc4S3X9lEk/54+4vWbDxMvPQUNryn1D7FGqdg4cIlSxYsWK6sWXWMHb57oY7F49wZXzpHlpBhWkP6Txlf/ex5wkinihbXWbRweez6CZdMv2KVs8c78KQ0pnj+IVMz58+cNU1+vcO37x8ziNChi7lShTWX59LvZ9GvpUmUTN2VFQ8rtiBDzSplrPGHIjhwZ9Y/54ihByrDtEJHfBjao6GG9fxRxWNd5Mfac/tFJ4UauEQxTVn3tMheFfuUxYopBVKDySqyDILDOWbZA44rqEBCxyPBiNLJhkgmec8vWHwYXXT5YZjFE52g0okV6KhzDTG40EILDl7iYgkryPBCjTfBYBIGB+uhc8wpsyDTiiSy2ILKL5iAk6SG7/T5jjdcVBEdf1o8N91rWlShBy6dPFLDH7T4gkw024DTBDjbRMOgKcgYaMofeqwRyimo0HJLMcWgApqdv7wCjJ/+sCKZiRT7YdFFa6vhJ110T+ihhn+4IPEMO+/EQ089U9RDTzyTvBDHM2U+IsotwyzTqTDABFNMJ5gEY0snt+xyCj57+vlLFc61xtpr67omXRVTqLEBACfggsgY7MCjLzxQ7GuKF5J4g0wphfxBBR20DBPMwsPQooYndaISzDChoAMrrO2s8YStWjxmaGvQtfYEKqg8AAASjCJRyr786vsOKLZQE8wzp9TByBB86EEtw7cU0ogtpnQyDDKocHPxn950E8oaXDzhXKFQdvxkr8VMAgAAUeCCCx0nHOPN10d87Q3ECz8Tih5jRDEGG48Us7AwvbTyCCShtCJMMbQAI/b+3l+vMsleajjdBbsev1ZFJ4wC8ADKk+CwAR3bgC22J6wEQw0uhWBSJiZorAGMwgsDA8wuvyg8jC+o8O0NJqwTQk0fOIzRxxpTPPFkdI3VgEYmiMQeRRRKRIEGIaxjgkPxfLAi3i+D0AiKLGaLUky2wQhj/du97PJI8cUz430o1HSywQOdIGJ+7VgU6twak6AhRhtiSKHFF1EQ4r33Q9w/iSmWr6IHL5hogheQYYtQ7KIVoLvexG7xClTg4n4QZEYowoGIE2yAGpM4QRQQQYfaOY0LkxiDEuzwhT58gQ5fkAImIHiE+1niedTIhB5kwQg+cAAUz3jEK0QBDOv14hf+wqheK3Rxi0ZE8H6rwOAJHrCtebEBFX2YXRP6MIk24AEPbSBEG7bYCSPer4Xes0R4gpEIOmCCD3EAQHBKIQpd9MJ6uqBFEKuHDGA8YidHTGIGmYiKJU7iHV/YgBUmsQYqdqIYynCFK5RxOTrY4ov3w4QsQNG8KzQhDrYYBB+CwYo7Jqx6v5gYMnTRiVCsYhVHlGD4qBCCVC0REe+gg8nKh4pw9AkVTWgCLt6xtUVA0nuYAIUpBmEJSTSPGqyQhCk8oYZb6OJtqPrFIzohiV9gQycRPEYmivEOV+CBZPPqwzv6YDJcoIoavPzBD5Cwhlh+IRG/ZIYYg8GIQTBCEvj+FCYfBiEFUQzjc7+4BSaQgANLBIMWyqHF/bCBjV/8jZvUwOARHiBOWT7AnH1ABDXogIQaVKEJ1OjjH6RxjWscoaTXeCEyTFFDRliCEXGQRBMkcYVCdCoYp8hEIwDAgUEggxb9WAUtpMFQhjJjH+6wxSTQGQ5cEKIRgCxnMWaHCg9KAaSlEIMYbFHSk5Y0mJzERByGkAY02pMXfECEL1oxCFpQwxQciIMsWEGN06yCqEXFxT/K8g5bbPMd1CgGNdpwBABorQ8brMITkHBVXNwCgJnoKkqb4QhesOKMcYiDF1iKiUwOJwRDkIW3+AeKaLBndTzBxteksVcWJbUT6Hz+RzFWEQcH0oGKTvvBVSeRCDysghuS+1o3riHWQXghDmmIAz0tAcBnhAEAQ1BeMEyBC7KURTm+EJs08HKWFpUjE7B9R1NxQY0vIIEOT5DCD/6wCmR0g29hE9s2JIHcsT6gCTniFCiQ4YUX+FQWq4jGPc5ij1X4QrXeYAZ3/+ILXIQivLKlghiU8ARHvld13ojv165BJlbwIQ1X8AIjoMAIyyIDFJUDBS0G/JdTIpgZ57CMWu5Bi2h44xqlQEVEbRGMNoSiGRgWm4a9wQ1cgIIRk6jvcfkQTGRwUqG+iJFa9kGLu3rjHDCWsVpw4Q1zeHkbfluFJFbRDW54+cxoNkf+E9JsDnCAoxwpFU4wJCFGVvy2HNyI8l/24YtV9ATL75DyWfg8jjSf48zlKAeb0bxmNoOj0LiwBSiCI7BnKNoc5PCFP/7Sjz5fwye+CDSnfXHpRZua0ac2R6JVvehy6Fkt/WCGJ6Rxjncggw/wmoKudV2FIUDh17+mghSoAOxiG/vYyE52sYeQ611PoQqTWIU3+kRrLZuFz+pgWTmcAY53sOzbLOsXuMc9bnUgQ9Bn6fO031Htv9yDGOVgGTemAQ5yg1vc42ZHvuxNjqOWxRlmrsc9Trlu1bZ20Mzghr7c4VBHOOIY3ra3vvD9bWcM4hG46Aa5t7GNsnCjyM4wR4H+aVHrewTl4PcYBnnNsQ0NsYO2UIhDKOKxpz1NYU/wYFQwRtmJV3RjT9hoBzu09nFz7OMdOnnHhlhbFnM8YnvTtEU9NGQLXvDCFKugR82TdPMkvSJcpnNyJ0qhJw5Fwx7TGIaXXXSOFb7jHhpiRmtfgUBdtEIUhQAXMr2FCUcofesb6vqGugEuOS5sYssIRic6MQ17tIMZ8ZAFJsxxFmlgAhtIwgZ74IGIYSjsF7rQxS5osT1Z8MITeBjGNGgOeMFr6BS/QODhDz+0YaDiFLYAhyz2uQoH2cMXnjiHhpxiD2/0wxmY0AUQheH5IPZ9pWsoRCvkxg6nWP/6VbB+P1D+4Yte6AJ0h6feMFA1C0jc5RmrKMvRdWKP6/8DG//AhSgS9jnRBWMXdeDDMOneifm/wv3YZ310hwzDMEe0dwulQwu6IAwEOAlOJgtmsTrS0B7Xh3mvQAs/FHtP1wq/IApr0AkBVTSZIAr/B4BOkX1OYQ6hIAq74DazBzfAEHvVAwyvMAm8EAyX0A1l4QuYcA4AaA/bEAoY2DCiIAqY8AiFUAy3ICmP0Ah0wAWFgApNYYIo+A/+sDSQ8Auo8oJw80m0UAiEEDN/oAblgHS4QA8mGA0GNDGYUAeYQAtKoDnMdwuDgAQbMCqQUA8m+A9V6A+YEAvKoAaPQAsEOHvVAzf+AcQInaIIX7AI0eAI2NAPAOgPSkM6SjgvD1ADy+B5wfAIwEAILxALnTAIaEiF1vcLVpAJ5DEHYvAIv4AMBlg6HsgGeMApivAHX0AIq/AOe2gOFNJDtyAKdVADhbAMobcLkPANaHACbEAHpLiHKFgKT/AGscAFXjAHc9AFmTN+C/NMdYAGVGQKoIAJdEAHa/AM93B9SAJ+oeMLvrAwrQAMonBCfxALwEBIzeAONdd1i1AGb/ANeAAAP7AG2NiK0lMMw3ALCkIHNigcdIAIUdAMSXI/v9AJTnZ4xWA9c2hHmQAMrvAIZRCSZaAHiVAKpWALtvBAYFQKc/CPf/AAL1D+A0hQBueRBW+IDPP4B3TgCCgGCrJzPBHkFP4ACbegLcgwPaIwR7/QC7cgBUigBV5Ak2tAkAR5HljwA6HAh04xDHOAA41QCmjwAmJZA1pQlU9QCHXABrjoCLIgC6agBGjQBEhwCeVgfX4yDI+wBk8nCszTQ8EQSq2gBCGAAzJJk+exBl5QBWqACYvgbeI2DXrgCXHgComAAy+ABFZwAuzkBWygDDrZB0oQB6zjCFqgBFwgBkiABvFwMfAgC7GQCTiAA3VQCLpwlMOgC5jwAy9gBSJUAz+wMVzQCMeQDs6wMi0DD8egBvxUCqC4ATiABycQAjXwAI1QD6VAB2ygBJn+EAu3oAzYgAY/IAZe8AoXEw+4cArAoAxKYAViYAXR1wp4Uwg1gAPrOQZjAIpSYAu15g6yEAoTBw/vcA1f4JWxwAY4EAY4YARiGQIA8AftUApsYAVoEAvf8A3Y8A3TwAUhuUsXYwzBgA3A0AZWUJpSEJN1UAdqgAMPgAMfpgWlEJqoJA1BuArq8A5Q8A7qYA6/AAVfqU5agAM/EJsv8AB/AAylIEKJcAtFdaGZ0AQ10JgXUz6hMAi/AAyxOQQvEAKgxQfzAgWyIAknkAhRIAa/sA/2wA6h8EDRcATREA3SgAs4cAkBpFhdMAc18AI4EAJ4oAiNYAVW0AjAYKFFpQz+UfAIrgCgfgIP5okHgwCIYoAHjdAGeco6P3ACu3kFc6AGWaAEdGBdpcANUgEjUXEP1MAHv8BRVYAEWdCVOBCmkcqbmXChS4oNf1AM5Hk03IAjvxAKoeAFWqAMePAH34ALTdAJbzAHhYAEJ7AFc9AJzsAddAkYPcIOinAMhCCTtlIIsRkCVmCScFkK3Vmh2OCdt3cJRwMrAJqbNZBCjdAOrnAFuLAHdTAJbNAHduAWr2Abi1AO0tojAzYYv+kFf3CnG1ADUVAKVkAHt/AHLyAFsTqupfAK6eAnCWEHTzAHv8kF3+AKagBF+VqlpXAEUOAM8IAP+9qv7tYMtFMKioD+BHvwBntgPHQADG0ZBlKgDDhbCg5hBxqKBIXwBotQRqVADfVQFtOAC32ADmaxHSjLGfEgcu9wCW4BCaVwAm0ADM8TB22gpNigsxBBHkjBD/YgDQbmDfYAD9OACAHCG+TCbqugCDCrB41wAkoQC7GgSbeQnpmAEf3wDkQxVOnAYn8RGN1lD38CfI5wV90wDQRhRmGAB2VkBxuBD++ADVWGStjQJ/YwYPsAI237DucgDcCHCZ4wVOuBEC+QBiCRHKHbZ6ckVO54BO54Sp7AOquAC7RmD/2gEFuguiJhpu/QDdLADL7gJWkgVJHCE9OmuzYBvH1iDn6iIfdwE9RbvdYTe73Ym73au73c273e+73gixABAQA7',
"misc":			imP + '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',
"miscgs":		imP + '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',
"setup":		imP + 'R0lGODlhRgDIAPcAAAAAADZKZD5SbUZGRkxMTFJSUlVVVVlZWV1dXUdbdExfeVJlf2JiYmdnZ25ubnV1dXp6en9/f1hrgl9xiGd3jGt9k0GlF1SzKkuURl6ZXmuabWypbn2vfXO2Yna3aHy5bkPFK0XILErPMk/UNlDUN1HWOFfbPFncPlvgP13iQmDeRWTaTG/bWXveZn3bbGDiRGDmRGTmR2LoRWToR2XpSGnmTWjpSm/hVW7sU3/jan/tZXKCmXeHnnmJn3qJoHmKpH2Mon+Opf0BAfsOD/0KCvwUFP0aGv0iIv0zM91mbP5PT/1zc819hN55gYK8eobBeIbedYvde4bldI3seoCAgIWFhYqKioyMjI+Pj5CQkJOTk5SUlJeXl5iYmJqampycnJ6enoKRp4STqYSUqYeWrIqZro6ZqImZso6csY6dtZCfs4GvgYa3hJKhtpWhspSit5SjuJakuZelvZimu5uovZyrv6CgoKKioqSkpKampqioqKqqqqysrK6urqGtvLCwsLKysrW1tbi4uLq6ury8vIifzYqgzo2jz46j0J+twJGm0ZOo0pWq0per1Jqt1J6x1qCtwaSxxam1xam0yau4yqGz16S22Km62qy8266+3Lm0wJDAgo/igJbphpvtip7xjKHMlqHxj7fAzLLC3rbE37zF1LTH7rfJ77jH4LnL77vM8L7N8N6AhtONlN+NksOvvuaMkP6hov6qq/yxscS1wsHBwcTExMbGxsnJyczMzM/Pz8DJ1dLS0tTU1NbW1tnZ2dzc3N7e3sHN5MHR8cTT8sfV88nW88rX9MvY88rY9MzZ883Z9NPa49Lb69Hd9NTf9cjhw9Xg9dji9tvk9t3m993m+PvFxvzU1f/d3fre4eDg4OLi4ubh5uTk5Obm5unn6+jo6Ovr6+zs7O7u7uHn+OHo+OTq+eXs+e3v8+ju+ef35e7w7+7z9uvw++3x+u/0+/Dw8PLy8vT09Pb29vH0+/L0/PT2/Pb4/fj4+Pv7+/n6/fv8/vz8/Pz9/v7+/gAAACH5BAEAAP8ALAAAAABGAMgAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp8+fQIMKHUq0qNGjSJPe7MNnzx49efLguWMHzBcvXbhs0ZKFJh9/YP3xy4dvnrx448SBA+dtG5auMveEnUt37pVxVWTqqQu2lra6Vn7ZygszD19CDXrR5VfFVh8vhF3iARtokK1beQog8DZ3bJUBoEG/tAO2CxVvuAwguNWZ7DxAd7h8fgkG7BcCDhAcYB12LL6yZ8fdGvDSC9hBtw/coRyoT54vWapAcJC2FnGXXfj5AxTIypbaYPn5/zYLL2046y+55OMrNp/rs/DEhQOH3uWW9XX9vo8Xf743Qte1lAU+dSHWC3D8pcVWN4MEyNIe8/hT2WWZbYYPfOP41802gji4EiHrmYaaardcmKCG22gTiIcq7eGLP7fltltZJy6YYjArvvRAFYJsk9wdZQWyR2xXRPBAAwgEA0yOLj2QSxV3gJPHd/MkqJY3G2qj5C9/sJjSA4Q8CcZYZqF1ZZZb/tKHlyF18cCbcD4QyB+1VOFFPmbJk6E3bWkJzC+/+LIHmyA9IIhTffTxB1N74DFIFV3gKU844fSZpi+9DIqSnFHpkWgfe+RhhxeAVPEAPuOs1Y2fgGLKix6Efv/0AGx68JFoqKNucQU8VJQnzoaX9sKLLrBuGoinifKRxx1f6MqrF3q2FeywueARq0cP4JLLtrngYsuUWPCaBz7xeLMHdNI5wIABBHRrx7UdUSHvvPISEi4VX5QFzo1/ujosLri8+xIVg/B6hzzwSAtMv8Lq0i0ut4AB70i9UnHwr9sEs6WrDgN8iy0SD0xFFr/kIkggKC8Kqh5QTVXVF19MLBIVVXDxQGg456yzzEr17PPPQAct9NBEF2300UgnrfTSTDft9NNQRy311FRXbfXVWGet9dZcd+3112CHLfbYZJdt9tlop6322my3jVAkkMRdBx10zBHHG22ogQYaZZT/McYYNEEyVz/66HNPPe60k4455VRDTRiAy5QIe+wFgQ4PMtXBnizX1AUEM6VgDhMdfMVyhDV09eNDKZGkIbpLc4D1Ci2l7OIKEUZkM/g+PATgu+8vwQFWE0pgM8sQRsxCV+H3TCLHGT8E8FIbYLEiBBJGFKH8XPsYbg/i7aAivUtogEXLEkIU0QpYlFASCR1qiMFDBRMoTsr4LZXvjySaJMGEG4PzHvjScY5R4I8lZdgHe/rRvXt8zx3uIGA5DPgSMuiDL5wTIAQlWI1MHHAlY7ggXUxnDX08MILnKEfjMPFBlfjhHv6YXe1ul7vDbfAcjKuGNC7RwpSI4oLEMx7y/2ahD8ShUIU63GEPUbIJaPjDetjTngnfccTGSUMaz7DEEk9igQuAghvoU58JKQGJOJQhCDuggAQUEA1naPElFgjFBdjwDVj8zx70qCI1rthGZ1RiiyaxgA7k+AHCfY+KiyvHHqXRR2U8ApAe6YAFJklJC+DABlO4gAcMVw/EpbAa02CkM5yxDGM4ApIdsUAUWMCCG9TABjSQAQxQIIULdICT5zgHKEVJSmMU45QosQAUVqCCF8yABjOAQQpMMAIXXAAD+kgHEnm5jGMUgxiNQCVHLNCCE7wgBshUpglIIAIQqCMD7CCgDvtYymsOgxHa3IgFcmBMGsQyBScoQTnPycKBeqSDHNT0JTGGsQpFxFMjFvDEJxb6CU90YgUiCME5n6APd5QDEmoYQw/ot4AECGAVqkDEQTOSgZKatKSckGgG1mC4coTyGaRMhjEGCtJUHGKkH8lAFM7pBMS5lJ3ImClBV5GKUxgCpx7JAE/9CcpowHQZQaUpUU9hiqO+pKQbaIYwLnEJS1iiEo94hCMawYhFKAIRhzBEIQqB1I5kQANmoMDv5krXurbVbXjNq173yte++vWvgA2sYAdL2MIaligBAQA7',
"alliance35":	imP + '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',
"alliance35gs":imP + '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',
"mercado35":	imP + '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',
"mercado35gs":	imP + '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',
"militar35":	imP + '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',
"militar35gs":	imP + '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',
"militar235":	imP + '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',
"militar235gs":imP + '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',
"misc35": 		imP + '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',
"misc35gs":		imP + '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',
"setup35":		imP + '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',
"aup":		imP + 'R0lGODlhEAAQAPcAAAAAADFM1jxX0SJa9Cpj6i5m6CVg9yhv/Chy/Cp3/C579yp7/E9Txkla3V5nwVFl4i+D+S2A/C2D/C+F/C2F/y+I/C+L/D6I7zCJ/zKS/zWV/DWW/zWa/zed/Die/zeg/Dii/z2r/zys/Dyv/D2u/z+w/EyH4EKS7UCe91WG6Eag9E+t+UGx/Eu7/Ey9/1C9/FW//GmN02KO/GSP/GSS/GSU/GeZ/Geb/Gee/Gqf/HqC6HyN71/D/IyNzoWH24WJ3YuO04yK2ICW3Y+Q2JWS05WR1pGR2JCT25KU3ZKW3ZWT2JKY3YOK6oiT6oiY74KX8oqd8oqe8ome9JSa4J2a6o6szpChzpauzpmvyYCq5Yui9Iqj94ql946n+Yup+Yur+Y2u/I2w/LCo27Sz07i80aaj7aqq7aqr76qt76ux8quz8quz9Ku19Ku29K229LO54LzF06zB5dfY3dPa6tra6t3c8u3t7eLh8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjIAP8JHEiwoEGBWKocNHhFxYosCwfCOfECBoo4EeWYEAGDR4kLcw7aiaFBRAsXLDqkOGhFAYcQJEaQ6ABBSEEyBSps8ADigwcOFgi8GShHAAIJGDIozWCBQoIAdAQ6GHAgQYQIEyZIiLAAgQEG/8Y0kEHDxo0cOHLcuGGjxowHYnrskLLlCxgwYfKC8cJFyhMfQHQ0cQJFy5YuXbZoieKkCZMfRKiYQaPGzZo2bdi4SYPmTJkgd4oYOZJkyZTTp5MgGaKkTsSDAQEAOw==',
"adn":	imP + 'R0lGODlhEAAQAPcAAAAAADFM1jxX0SJa9Cpj6i5m6CVg9yhv/Chy/Cp3/C579yp7/E9Txkla3V5nwVFl4i+D+S2A/C2D/C+F/C2F/y+I/C+L/D6I7zCJ/zKS/zWV/DWW/zWa/zed/Die/zeg/Dii/z2r/zys/Dyv/D2u/z+w/EyH4EKS7UCe91WG6Eag9E+t+UGx/Eu7/Ey9/1C9/FW//GmN02KO/GSP/GSS/GSU/GeZ/Geb/Gee/Gqf/HqC6HyN71/D/IyNzoWH24WJ3YuO04yK2ICW3Y+Q2JWS05WR1pGR2JCT25KU3ZKW3ZWT2JKY3YOK6oiT6oiY74KX8oqd8oqe8ome9JSa4J2a6o6szpChzpauzpmvyYCq5Yui9Iqj94ql946n+Yup+Yur+Y2u/I2w/LCo27Sz07i80aaj7aqq7aqr76qt76ux8quz8quz9Ku19Ku29K229LO54LzF06zB5dfY3dPa6tra6t3c8u3t7eLh8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjKAP8JHEiw4L86SoYgSTKlYcMlSY4YKXInSJkzaNK4YdOmzRo3atCYoULkB5MmTqJo2dKlyxYtUJw00QHExxMpXLyACcMTDJgvW6Ts6CHmwYwaNm7cyIEjxw0bNGQ0GPOPgQEECyJImDAhQoQEBwY4EEgnQAIKFjKozYBBAgIBcga+IWCBg4cPIDxsqFCATEEhEDqQGEEiBAcFVgz+S9GBhYsWIjTEsKN4zoUSPGCIMBFX8b84KGC8OAHH88AsK1RcMU2wChbWsAUGBAA7',
"speedl":		imP + 'R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8JHEiwoMAzOBpgqGKwoUAiQrAM1FIAAIATDgs+iTFAgAIQN5hYgWARRsaBQDQIsFCCQgABBkQQ6ZCiy8l/QxoAcHHlH5gWBCwGMXOzzAsABnwIDMOiQAEYCSSIGUhGBoqCZDxgYCJwSQYAF4r8swGAh0AnIQBEMAjGi8AcCQqoCCPwCwMGWo4sAOCBYcMpJCxuQAJmoA4AFgocoEHGYZEGAig4eGlhRpR/XiIAeKDE4ZYZTmlwufJjREUFVv4lWTHFoRQNASIYIVjjgAAWUzOO4aEAgAkqA6eI2NzjJhcTAg7sIAhF5wcpN7NUAMCBK8ElE2AQvdkEQQq6BrncAxwYEAA7',
"speedr":		imP + 'R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8J/FcFQwMcZwYqXMhw4AkAAApoGYhFCJGGGGFAhGCFyQ0QCgQMiPEE48IuKToQEWFAQAAKJSwI0ADE5EIzQSASaAHm3xUXABoMaYhCBpmBYiQkgFGgAIswAn0YAPCizMIIAEI4EcgDgI1/RS4AyLBEIBMMHo4qrOIBwIIjWhgw+CIwjIoCCXII9NKTIRkaBwpYAKBjIBgkGyCSmGLzn5IHACJ4+RdlhswADigIaFCk8ZQVSf5ZURBxxI8rXGg0nbGlsUAxLAQcqKHQSIQAGqS4FtgDsgjGAqmYAKCAx5jdUj4EhaJwxwEBJrjsNgNjQlmFTDgAqJBl9z/pDMOkBEDQJCAAOw==',
"capacity":		imP + 'R0lGODlhDwAQAOZ/AKqlmopuQKyMVpqETFdGI3psSqaXe6ySVczJwpWKcqSdjuLf2aWKWWdQLJqUhYRxQ3tjQLy3qtnTzk09IlpVRod9aP38+mFLLMLBtJ2FW/f38qmOXKWKVpd7RpuOaaKGVN7c1vTz7m5bMpODXHdfN////o12QqqPWqOFRaeNV5d9TotzRYtxQmhVLoBnP62PWJl6Sop1Rf7+/f39/aKhmqiGVI9xRaSHUph+TZGAZJyFYWFTP21WOqiLXY9ySuzp5J+MVJF4SZR5SOLh3Z2AVGVOJ722pfHu525iNrCkiLSvoLe3sk1EKcS7ZVlKNF9XPpF0SH59aczIv/n595GCaXdqMW9qUIVpPGFSNI99Tp6LWnJaK2tVMmpfPquKWNTLxMvGuKSRWKuPXefm4u/s6aGLUqSPUDsvGISBb3ttQIJnN7iuYYBsN5iQe4lrPIVwTZF+TIuAXPPz8/b19WJUKKCCUaKMYpmBULCTW5mAVJ2HU2NFJpp8SVZBIZ1+TP///yH5BAEAAH8ALAAAAAAPABAAAAfsgH+CfyFSVkoIDksyQwgWglMRCR5rdDwXbRFoURh/cxUtF2xNdHsuTxVgITQlDg0rKy5VSA8EFAoSMnIyCXYnLCoHYSJnFBgzg0cjQFkiDDEEE1gAMoMWcVVpLSQtRS4kfQDIfwsjbA8PJBB5KgFbBAB/GgZ3dRspH0QMHTZXF0wavmjhAwPPCwEfOJgI4uaCk3kfYLDgIOBFihQDBqjpU0GGDj81fEDhIEaMECE4uEwA8ScDCgE9OJwQw4BFBhc7FghKYubGhwMvDpSBk6YLS0FkPOgxUcfLgBgFHIwZJOiHkRwQ3lBRoJPqn0AAOw==',
"locked":		imP + 'R0lGODlhDAAQAOZ/APvx0qmIUvnqtc2ra//Fk/+bQ/p2Cf6xZvuROvp+HP15CZ6AT/6GHfV1GPRnAP+4ePnpuP54AfGtS/nowu2dFv7Opv/aufvmqu+0DfXEXvGuQPtzAfCvE/RoAf/y6P7Gj+2ZFfeWT/XCQf+RMPTRfvS7X/nqxMOaW/zbw/iQQOeDBumLB/qlZPPFVvK+NP/JmPjmve7PNf2WP/bYkPK/We2dBf+hTv7x6PvKpfydT/TThv2rWP7y6fmNOv/DjvnqwPK2If/Qpvd5GPDAHvbdo//r2Pvfp//hx/K8Yv+1c/25dfDVR/+iUPLTb/+/humQE+mQGfCiHvyFIvrciPz35u+lEeeDCvhuAemOD/+rYP+vaPHKVPO0OPO6PPvhu/CtIvjnuPTHcu/IK/LEb/uTP/+7f//Mn/C6F/zBkvXblvjovu+lBOuUBvh3D//XtPG3Se2dLv+pXP7fwPXYmv+fSvKrF/fSg/fotPRrB/qlQP+oW/9/DfqMNcGZV//z6f///yH5BAEAAH8ALAAAAAAMABAAAAesgH+CFQUMDExHgoosGwoIPQZ7boo4VzIegjxkI0WCKQp+in83Bk6CCTaignxxp1qqfwhZfyhtBRZBLwQEaFJ6fnhcXh9KBwc7eUZyZg5Ldz9qMBMmAgBUPg4xTSQ6AwNzRGAAZQ5iWy00CwtjJGkQDw5DLl1vfSdIYTMC8GdAdVEBAkgoYedCEgcYOFQB8QQKHA0ZptDpsKYGmxUqrGCh8EVEhBANQooUKSRHIAA7',
"unlockedl":	imPNG + 'iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAMAAADDGrRQAAAAAXNSR0IArs4c6QAAAYBQTFRFAAAA/sSU9XQV+4Ym/ta2/d3D9nEN/3kB7qsT/+LI/+ra8LMc/qJS8bti/ePP/4ES/7p+//37/vPq/+HG/c+t/pY8/+XN/eHM9deD9oMv/8CI+3oO/7h5/4MVq4xa9oQwp4ZS9n4n///+/5Mz/7Rx7JwW8MdK9+Kz8a8R/atl//fw+Iw5996g/byI7ak6/uTR+uvI++zP8bAs+ee38Lgc9Kwe78Nw//Tq+KFi+JRJ/30I+eSu/frx+oAg/PTg/+3E7Z8E/6RU6Y4H+HUS99WMuZFU+JxZ7J0t/tGr/u7j7qgE/7Jt/6le920E+9mH/KNZ+n0X+okw//v4/9Cl64MF6oQI8cs+6Y0PpYE8++zJ/+7IqolU88JY9chU765H8bMWzYYdmHtL+u/S++7U/+jU/d/J/9q68L4o88V666YN/4AP76oK17h89duh+XMJ9t2m9r9l//Xt/phA/XkK+3UG++Kn9tKF//v3/6BM8cxa+7F3//Hk8LBO+u3B9slM65cFJqizLQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AsOFwYDc4wxCQAAANVJREFUGNNjYEAA82AeUU1WQSQRpWoZK2npElsRJMFCmeIqcX3dADYWhLI0dkYQ7ZFnCRcLkmLmAtGComxwsXKVQE8wo8iXQYtLTFhYmDNFrMKWFSzGo83gZsTvqCzLnyWr7M0iBBJjFWFQDKuNNLCPMky2s2FMhZojmV4pIZEjl5uvniQlDhWTN1GLjUlUMCvTMRbgg4nFc3Bzyynw8mZYI8Q0uE1No11rClxK4WKS2ZkcHAkR7npxfj4wMUUvh3qnkNBwVaM6K5gdFmxMUODsLwQRAgAIGCOyrkYbMQAAAABJRU5ErkJggg==',
"unlockedr":	imP + 'R0lGODlhEwAQAOZ/AP7ElPV0FfuGJv7Wtv3dw/ZxDf95Ae6rE//iyP/q2vCzHP6iUvG7Yv3jz/+BEv+6fv/9+/7z6v/hxv3Prf6WPP/lzf3hzPXXg/aDL//AiPt6Dv+4ef+DFauMWvaEMKeGUvZ+J////v+TM/+0ceycFvDHSvfis/GvEf2rZf/38PiMOffeoP28iO2pOv7k0frryPvsz/GwLPnnt/C4HPSsHu/DcP/06vihYviUSf99CPnkrv368fqAIPz04P/txO2fBP+kVOmOB/h1EvfVjLmRVPicWeydLf7Rq/7u4+6oBP+ybf+pXvdtBPvZh/yjWfp9F/qJMP/7+P/QpeuDBeqECPHLPumND6WBPPvsyf/uyKqJVPPCWPXIVO+uR/GzFs2GHZh7S/rv0vvu1P/o1P3fyf/auvC+KPPFeuumDf+AD++qCte4fPXboflzCfbdpva/Zf/17f6YQP15Cvt1Bvvip/bShf/79/+gTPHMWvuxd//x5PCwTvrtwfbJTOuXBf///yH5BAEAAH8ALAAAAAATABAAAAfRgH8QBCgUC1I2f4qLjIITPHMaGjkbeiGNjAMFTywuFnlyG3CYizhtR4wABmWXpAUUEIwJAhlRpH9McY1IUCN2tyoLjQQ8dxVjCBLKFQkpEwSMEUUxDkAiHA5pHCJKA5hkIFV8WC8+WTBiPTsAmBYYZngXF2sdbG4mYRmYDR4zJVxbwHyoUWeFjAf7PHg5oEBBhw8MGJzRgbARvxMKaNDQQmTPmyF0KjJqgEENmgMHvlwx0qJLkyXtQCT54SfIFCpWSMTokwNThBsFAggdKlSIk0AAOw==',
"external":		imP + 'R0lGODlhCgAKAKIFAAChAf+AALjogArGASnGAf///wAAAAAAACH5BAEAAAUALAAAAAAKAAoAAAMlWFrRvoMsNsNYAWgQBAZKVwhXxnhCQ5gCkYIXOAaFXE+3su1LAgA7',
"iv":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFADs8ADw8ADw9AD0+AD4/AEdHAEhIAElJAExMAU5OAVFRAVJSAlNTAlRUAlZWWLGzW7O2XbS4Xba99AAA+QAA/wAA/wQE/wYG/wgI/wkJ/xMT/xQU/zk5/z09/0FB/0JC/1NT+Vpa/2Ji+WhqmNPTp9vbq9zcr97etODguOLivOTkwObmyenp7/n57/n7//n5////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKEwUCwAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAHlJREFUGFctzskSgjAURNFnRIIQcAw4zwxRhPv/X2dSZa/6bLpaoM91ksyyDwhr9cKnnqyQXn1Dh0GcmBru+911pEklhqe1dnOBWOZw9LAVmIBDQAmFaHj4vj2DFtPArSpPI87IWw3/6agVltMuyEUL/4Au03mh0xZ+eFQR+TbmyMoAAAAASUVORK5CYII=',
"ov":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAT0HBD8JCD4LFiwSGi0TIC8eJDIiMjMpOjcuPjoxPjszBEgJB08MDEIMCkwNC1MOAH4OAH4PAn4QA34RBH0SBX4SBX8TB34UB38VfXt7I4suIoovII0sIYwtIo0uI40vJIsvJI0wK482LI83KJE0L5A6fLuDfbqEf7qFfbyEg4CAm5aYgbuHg72JhL2Khr+MpKGh1OnW1unY7fXu7/Xv8PXw8ffx8vfy8/n0+Pf3+fn5/Pz8/v7+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/pJ70gAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAIJJREFUGFctjtcSgkAUQ6+9a3btIqKCvQIWLPn/3/LujHlJzkMyETK7rIwJT09SmERdqMwioWSRi07BXc5q7VK5BditLIHO+MNDDpiLFgovklVgKD2g+FaoAX0Jgeb+y6sAEzlaoFGp53VgJ4/Zf9l4qTCeGofWi/UBbxt/NPDXKfkDJWUQtUYbGbQAAAAASUVORK5CYII=',
"centermap":	imP + 'R0lGODlhEAAQAPcAAAAAAAATfwx0FRB3GRZ8Hxh9IRl+IxQu/yQ+/yBG5S9J/0NZ/0Ve/0xj/2B1/xyAJSOELCmJMzCOOTaRPzeSQTuURT+XSE6gVk+gV1alX1ukal+pZmGsaXe4fnizvIC9h5up/5LHmJvLoKXQqbjbvKLjqbj/osvT/8LgxcvlztXq2ODv4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiHAAMs+EewoEGDDgIgOMiwIIMADRo2VBAAhESGBwKc+DeBwkWCAQJoKBDAwoqLI0KaCBCCwAeGKyxIKBEgQQATJi5AQFHwA4EQOD2oxGniwYZ/AirgDMmUKE4OA1JA+OC0Ks4HPP9doGAVZwYJJwuKeGA1QoeGKswSfUDiYwYKGCR8LGjAQMOAADs=',
"distl":		imP + 'R0lGODlhDAAMAPcAAAAAACpIgjJWmTdkqzhstDh0uzh7wEdhklJkiFRmiUNjoUhwsFJwqFZ7t1J/vTiExTiMyTiUzTWn1FmEv0mAwEiGxEeVy0CYzlOUy1aVzFacz06x2FKh0nCWxnyey2+k0X+hzHiq1Hus1VvB317D342pz4q02Jew0pW62qOuxajT5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAMAAwAAAhZAP8JFDiCxMCDAlVIkLAB4cELESJwcDjQAgQIGgZ+CCHCBAoMD0Jm+GegpMmTBioUWMmyZQEK/zp4AFHihAMCOCdQXDBgQAOKCgQIYEAxRYAABygKRJAAYUAAOw==',
"distr":		imP + 'R0lGODlhDAAMANUqADh0uzh7wDhstDiExTWn1DJWmTiUzTdkqypIgjiMyVvB33CWxlacz0eVy0CYzkdhkn+hzG+k0Yq02I2pz6jT5Hiq1FJwqHus1Zew0laVzFRmiVZ7t06x2FKh0lJ/vUiGxFOUy1JkiFmEv0NjoUhwsHyey17D30mAwJW62qOuxf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACoALAAAAAAMAAwAAAZIQJVQaFIMj0IOgUBBCjsGg8OpYiQSDWpmwAWhJJdKRPUJmM/owAnAbrsBKpFg7sFMIKXFcHM4kKhCFgUFI4AqDwgIKYYaIUhBADs=', // Distance Icon - RTL servers
"merchant":		imP + 'R0lGODlhCgAMAPcAAAAAAAAEBQQAAAACCw4GEwARAA8TAg8WDgQZEg8cFRMLAB0WBB0aCRwgHxQ0KSYoGywhHTUvHyInKy0tISwsJC45Kys+PDo1IjM1MjgyNBxFMzNFNzlLMyJMQjZISjxbXj94aU8/L0c6MUZFM1BQTktXY1xkT0V5Y0B4d1B2a2JfQGxeQ2xlS25sXXFsWHl6anR6el+LjmKupFXRyW3NyXLTyoKAZ5GHbpSRcJyXeZ6bfJqRgJ+Xio+hi6eZjq+qjaWikbOti7GtlLiykKamsrvEp8XFoczXt9POsdjUt83Hy+LW2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAKAAwAAAhuAP/9W7HggQqBCIOEgJBBwQ2E/3L4WEJAwA6ISEQoIWKhQhKIPBp4QNGBA8R/G1LQkKGhCEIbBU7MqAGih0AjBgKUiPEhgRCIMAY4QHAA4Y8WGCQcMTEBiEAWESiQ+DfkAgMdAl2MeCGQAQMcAQEAOw==',
"pa":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAEsAAABkCAMAAAD5aj07AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAABYJAREMFBIRBBYQKhk3ACIMByQdAiIaDS0YACwzHjQuBDoqBjsnEzgwHyotJiEtOC1HDCNSCD9bFChhAixyBDhsBjxuGzh/CEAkBUcsAEIwAEY+E048GVY8BFA8DlU4FUEvMWU3BGM7AktCAUBFElNBBUxGL0pTOFdPKF9ENlRbJ1pTOUh9FkJiLkp7KFp0LlN+OmxLAGpKEWJRAGRTDW9cBmNUGXNJDH5OBX1HEHlWCHRWGWlPJmVXJWVbNHdnDn9mD2NkIHtrLXxqOUhMQEVPUF11QV9qemNiRmBpWG5oUXdtRXZmXXtrUnJzV2BqaW51ZXJjekaSCVSMJV+bM1CoAlKhGFOzC1+/FmGxHGWSQG+QSnWKV32FdHavSH+LiotrAYdjEoVzA4RyGphjCJR/Dp18AJt6D5p7H4JmKYNmPoxoMJN+IKx9A6N1G651HLZwAIl/WKl/X4qCF5eIApCFOZqBOaeGBq2aHLePDrOUFayLKqOPMLqcO7qhAJaCSJGMT4KDZYqdbIGTcpGFe5mRZpOSc4eiXoKqYZGqdLSbW7enQ7yjVqulYLCofpXNbcWQBMCbAcWtFM6qFNSkEdq4Cs2rMcWyOOOxBcquSNe+WeDFTImWgZGThIKApZmlhZimkJ67hqWOl6WhhKSkk6q0h6q3lreylaqusai2oaq4o6CysbS0o6Cy0LfVjrjSnq/Mo7HNpb7Io7jIqLXGubnHsK/G2qjawLHJxrzFxcfIi87Hm8fQn8fBoMbEsMXHvs7Yss3butHKodnVrd3Wtdrtufb0lOnpu/bqtvTqvP3xvPz9vcTXyc3ZwcXb2c/X2dXYztjVwMHd6sXa+dfnzdnmxtzkzN3vx93k08vl+c/s99Ts59Dq79Dj/dXp9dLt/9b0/9z3++Duzuroxevsz+Ts2Ovl0eH02u321vHpwf3zxPvyzPr4wPn5yvzx1fny3fv41ebq5ubv+ur16eH39eDy++f+/f7n4/D34PL18fH2+ff68Pb7/v3//AAAANncWdcAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAAEeBJREFUWEftmXtUk2e2hweZgsrFSkFAIGiLIN7lkmABISJt4ShIEUERJAGTYCUoRU1CQEUUoVJKJGhEnIQRgxlsdRKjeLyRAzaGEqyYEAiRXIAGCNGoQDkzZ5z9UWsJ2rXadea/mS+LtbisPPnt/e533/jDy3/d84d/Herlvznrh4GBAb0Mnk65QPBb3Pqr/gJSv66zXy5qarp8q7Z0++rV22sFUoGUL+3se/J28q+x+vWyAZlMLpM3XblcW3J89eqVK1dvL63lcvkt4j6xZOhttF9hyfrlcpkOWE2XS0p27EhYudLZeeXK5JLjR7gtQxKDwTD0FtxbWbJ+oMjkcoCJvinZkZAYv9l5tbPz5sT4hO2l/D6jeAihiadrextrAGHJ5SLFPXB8bUJi0rZEp9Ufr3COT9yWmHD8VovBKDYMGYZu3Z4GewurEwhAEgmu3FN06RXJCUDYnJK6eGX8tqQt25L/u6WpWSw2iZv4R7jmsDdYXV1SKcBEAoFQINJ3/V12Gdzu/M6FTUWrl7skxi/ffuFCSuktsaGfzxZI5WawaazvHwqFPK5IBO6SKfR62VNh14vrc9LORfvMiROlvOPg/F55lIPT3KVGcTFXKuqXd06FmbG6pG1XeXXnajhSuU6nk+ufDVxetWq1Q+KKmUeL7WKMd5Y8LOeC3+a5zCtaNVcAHygSsKfAprK6vm+7VFfX0JAWzZHBGeo79Xp+skt8UpJD6uyURR9vD9tgWLXKwcEp3snBIcHF+TI4lR37X7/AprC6pMKrDRcbblxMS02VynQ6vU6hT3FK2ro1ySnFIcFxs8tyh+TNiS7x8dscXbZsTUosFUp5sWGYt7EAxau7cePBA4B9xOmU9St0g1xHODt4OW7eEp+0dUuCSyKQtyY6xm/dujW+RMgBFJr0GvZal1Qq5HA4gOp9cGPTpjihfmBQPpCyfGuSS2JS/LyErVsQfS7bkoC1LcFx23Inp9VF0T5r0VjiGyyhUMDl1NQgFqbFbUqN5MjB9/rrjolJW+LjHT92iI+Pd5nn7JiQuAX52dl5roPDishlawNxpDd0XaktrWUDKy46Li46msfhSnW6fr1OsMLRZbOzw9xLxQ5z4f1L5zqvjHda7uhQ1FUYNXuxT2g4lkSk/KTrHy9f5Wh5bUnJhStcLlcgFEKcSkVyhWJQz770d1HtqsX2l27+2P/NqrnvFC7x4Tk4z3NwKBx8rq+N9HHH4olEEm2ajZe/KimpvdIkalKAaTqdQiGf6KrbFNliMBSvKo3ZKPnxqUkcGsN3Z8fGchq+5z8bFHw02x4TnI4jEimvdAFx0vcvvvlqR/LxKxB8kBsGO2V6mV4UW1z/1PAkxXnzygsbP/j80P4v13tEbmzx4fCOl2xvUsRdLPTGIgZS6OasCcU3X321o6RUJtMP6KUTE3ohZ6Cfbxo2mMTLE7c5vRe1O8gfs+vD911DQxe9tzl+S2IKxzpqbTiBBCwy0dz3+nuA2pFcCldZPzAhS3146bzJZDAaR542L09MSnSMFZta7vjv2bMH90WK87atSUnvRLp7B2QSSfCiZNLN/KUHWdsQlmxCKL0Uxe4EkEEyfH/Y0Pqlk8u894on7ly6u2DP3opDBuEKBydnhxkzwwk4XB6JTKSTsg6Zsa6Du3YkJJc2nYuqqy9m95tajcPDRoPJMGIUp6x+b6n4YjRnojyb7FesG23krHjH0tIdTSDi8ojwZB04ZsZqmszoyRfE52/3g3GmIePIsARwQyPDBoNYwY89yh+cOJK5J7jIqHiRahPm4Z9PxFOIeWQynb7/MJv3Mww5x+slyZs3r9x+CzhDhuFhyQhSHIZB2nfwTUv507sKo+JZ/c69a4peSMN8rULxBAodRyExKHnErEPFXDPWlZLk5JXJx1uMBoNEMgxa7gNweLgVZD39IapmQten109wdu7dWbhpvk0wAZ9NptB2ErOZtLwDh8vZgqtTdQmABbXPaHgCskCRBF6IMIOpvLi/6wfdoEIvm6jbm70m7N38yCw0On1fODE9dx9tX9b+Y2xeY5sZqxTK6AV++XkwrbV12PCkdXhY/MRkui3PKeyHRK0b0CsmOHuCXT3nzJphN9PSwsvCzs7Swy7scPl53tV25VSWsDSl9EJ9TEDopJfgS2w0GvuK6+L65JAQISvK9Iq++j2es6g2u6ytTyy0WeeG8bVE2UbX1/OuNrarzFhHUi4013uciDAB7D74e9h4U8wv7nyhGxzUDergRsnuDR7bY2WLtv7AOsA7kGpbkG5jm+kfXQOqVCozXVeL2Dcl9UuoBwwGiAREmuGm+Kbo3PcTMp0cbru+s+te14a9tp6VHqfcqbidFYEsim0wEx1Vc7UdWGa67sQV3pY021GDW8A2I5CAaRS3LBZ2yQYhb4hk8of37obtdcdXBlS4nQzGkf1ZJEscExPd0N4BKO1UG+/G5tw23LOn7+abEF0Ia8hobIpNjayB+iGXSptuX24MrZifyXif4V0VTCevA9a+St+idiWglL1mrJxjzU9N9gRyPRwjIgoJMmgYjtVZxwmlQkiR9byYnXtnUbChRC+WF5OEZ+2yZNIWN6pUGqVWaeavhznFLcPfRWLIdU8kwBpuRaLMMGQy9bEL44QCDpvNLvTZkzmThvOnBDC9WFhcVYhFJS66XasB2HRdG449NHxim3cUssNP4QUXqBVCzWSUC9k1NUXsxbMxGAsazo+IBscHk1ghblXBcSqtBlQp1VNtbPk8Y1foxo3W1BwTKEKCHlitIyMjrSPGvsLFIKuUU3Ms2pqZHozD0TCVfqQq/8CqgDStVqvR9Jrruv1FFik7xM2CkmN4YhiaJCEHajTevz9i5LNrooHF4US7sXA4NI4cUulHrEKhWagGrRJoveruqbrulJHI5LxcqzzPnHpQBnaC95HUIxmGVrL5dnHREahym8JZaGDhAqpwNNb89EqbRg3IUiuVHVNZN8sI2WQywYq0dpZPCxIVRpPJ1FK87OgPkDgM95uH6o+18QSRaBaeGEjB+VXh81goKjOyY0wDrO5uc11fZJLIBKoVfu1M6x8McLmN4vJCH4sZltZ1T5AsJDHcu5Eq8iGxsORQCj4YdDH8TzI2ap+Dv95gHQvH48j57gsyfO2bISYMkugwD6uFMyKWWhx9+m3rtz9KWr+912FHr0JR/E6SgqpIFcwPT+775IUGAqL7ca/ZOd4p3hAR6Odv6bH/z5HNUDYOW8w4nBFOmDl/ls3Mm8YRA5yAtO6ovRfWwtoiI9DKM9fT28Jr3afjk6qUvWb38S6nMGeDm8Vi97xPj94bvLnQHWPpRcil2Z5y87K/Y+ozjkx86eGZEerjE3fxT4tnf7op8pNPPomOvqZUK8FZyrHRqb5v43GOFEfZ82fTPuvSpy6ysPPzzq1AMWyZKMwsG7Zp5Gn5utPVZ/I3CtqUcG6jEKGIdeNarbpb/bexUbP72M6D8Cm2Ec1h7KqbPeOwmxsrOI/mR7bNC8qyW2f9XfPGgupTefT8/P2cnp5HmnGVWqPsGdX0gIla7eiYxpx1vYjDLlwknxOIsYi2CiSEs4IYeHyGNyXopNss6/NhudX0EBy24OzusHNj40h8aoGDiNOOacd6e81YDzicGnbsMt4cC8uZga6nSASWPzOchg7B46pO/NHW6sBZfCgh+MDp0OAM/6MPENM0msdaTbd2TDM26f1p/mIXxlgAasZS6vvMNRRmAGtdhQcet+ZggE2E2wF8BDWg7AtXv1y/01/GXdPotWNgXI8GHKd+3N3daxb3d3nnauJ8/miTS3Mjn/Jk4WlUfGVQpRcxHI3HnXaznJlLRZdlzo+gogoq/Q+EszXq55rxnnHgqRFVSrOY+P5SatwyX18slunFzENV4SqJkKAqbbLRwcFEqtuchV7rT2Van8hzpVfb4ahL9+eAgaOQBNXKx48RVPvPBRLpAe6ei4vyDThNCWJiWAQ/Jr4yHccIrnKjBOL80lEW9vbuZw9Z0fM986u9d+0PQFd7bWjQasfhMDtAlRpQf3nlMIQFcb82kFCViaNBDshiYSsJZBqu0obhR/AmzbJwm7kWa0vPtM0/5YGhLomguq47vY77/LFWq4I0qNW0twmn+v72sYgMLKUKTa7AVmH3MbGsdBqRxLA+iMF50Wa5nV5ki6FkeZw5vSCEhsEdmoXNzC/wTnus6VAqIWpVMEGZscoO4EjkKnQeEcdC51VgWThadl6eLQNF8qZ6uB30wpzKCK2muEbQP6Cecc1Id82ilIVGN46rIOWMtvF4fPP8lU8i0VhYJpEIBlaEI6xKon3lfHIAw86V4RWeG3omP4xA8y2jL8klWGXRywLCD4U1jGm04y94bO4VcxadRKqoyGCRiUw0owLNQlOyD+60OLlg5zqKG4ppEVpw9hDqTFbAmQzb9PVWGTT6InT1GXzMRc3Ysxo2VyCaymouo5MyGQxcVTaVEVxJ21lVQfNe5+OTjsLjCWh/5uxIzIm8TDz2xCFUAW7+ISoJhT+bERG+K+TzS3GRHIHQjHUTWGQmjcQMZjA+ZBBxlSy8Z1xN3ULUPnwGNqBi9sVDGzDhoAR/Nt91d0EEhlr9mV+6d/4XhNlRhTU8c13/U1ZAIDKyySz8wcqdlVXUWaglxWkXn/8pMMuPEIgmv9tw8c/L9p9A46pPenxGzfSvrg4P3BWShaWme9TXx7J5r/czk3NHGYVGZJBpzDWMKmpIgNfGmxfSGlTa3o9s0ynzKdh3G7/+uiHHbXf1WW9SQUTg6TMh+3P9d0ecjlg/1NLHZbOnsQpoCK0SS6WmL4y51CVgd/Qou/Vfe55luDJwkdeuAS16PR0fQj0QlFftTY/A7EedCIsxGoeG+m7eNouJl2WAopGoBwOsbH0LhTI1pM/r3Y+U1+3RFfMZ6MWPGoH1daxXBPWzwPyywBNldpjA0wgKWcU0N5v19y/L6AgrMNw+ctWK0mvtGr36EaSAR2Nf2zAxzAXR2g4VAqtZFFhA3+V5Js/zs/Un3GOM30GfLZGIJeasL+kwcGW4xxQXldZe79Co1R0A06h7lJEfeFW5p2lVjx5da2xsSPNbvzvrbH5oZsYJt5wRI4wlEonk/jRWWWZ6RnhEYf2FokZIlI8ePeqG1Ikk4Wsz/E7ObESucfc1eNIWhZ/NDirbt97tGNiHtH2SIck01suItWtzCtlFvEYVCOrWICSkwI93z8gizO6Azgg6kGvXbhRF+2Lyqw+4eZYboYNEeiLouV+b+GpGzskpPF/HaWhXweV/RUJYGs1HNtZpUAc16t7eZ403io7W2Qdm2MZIoCD3ISSku53OusTh8BrbH3R3KCcJkMknH622I+2cVtuNVJweWT077X9rfBbZ5AxBFwRbK5i/oJH5BfVKl5Bzta0XUhuCguQ7Ds9PHuvRjGu06l7laFcbJ5b9bPBeU2qq6TuYAyabd+i2jW+weqBP12qBNFmTx/4xPva8G2oDCEMK2Og4pCk2lwv7NZ2CzzWKYaBDxiVkApuCeqVrTKOCJg8aWeTd2rFxtfrxY7V2XAO61OPqFy/aeEVFCoVOATOIQnEltgg6PuQQh385Q4T50w7mb4BRKQGFHN7/jT8H1PMxpMprR3tUPSIeu4h7S4GssWBjp5AJbvPLhyAYoNGbKuvnfTTYp1RpYYYYRXQ9VqvViLnwi/arPKQnF4rkfbD7E8F2E+EJuHxFH0wAZqjXu23oraEWqLRjY71Qqbp7ocBrVT1tVzlHYzdEFbEFMBkBo1MkgokGdmh8Lp/f3GKO+mVPDk2GUgWNBqC6lRBmIKn9KocdG+br7usbzYWF64QM1rcAgp2yrOkKf9ri8bW/kA+ARh1wz7t7ezt6Vcr2B40NNUWFUb6enqj5C5bVSMFPAzr55LIU9nEy0V+niTJjvXwJtnWArN6ODlU7kKCY+7q7o/yDUKFhxXc6wUiYS39ime8vp9aO15/wuANA7SqlqqP9Rl1MqH+ohyfKf01wELCEok5kO93ZKe+UyqRvavolJn7+G+KvjnZ4GhuKN4T4BX3gjwpag/fzj8mB0gUsEXj/7ZreZL39837rb//N/9/xW91kXjt+97t+S0z8/6D/Ocff57//+Ov3+eufMR+ffyxvnpIAAAAASUVORK5CYII=',
"cw":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAEsAAABkCAMAAAD5aj07AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAAkFBA8OAxkIDBoZCBwZFhQxACYTAyofAC4lGSspFCkpGiwyETEpDT0hACgnITsoKzg1JjI3MDs0MSRQBDRdEzxTGjdCKCtsBjltCjl/CUYoAEEzBUA2GFw9H00+LFtKFUdEKENJO0hFMUhFOkdUKlJLJ1RUIFVSPVtTOkJvH0x6GUZrK0x8KlZ8OlpyOGBBD21KCHxTDXZeInFfL2lmL0NESFxLTVNSRVZUT1xlRFlnVGBeTmliR2JhXmpnV213VHRoQX1gWndwVWp0YW9xbH1tY3JxYHtxZXt+a0aAF0SUBU2SG1WNJVaLLVCmDli5E1+hMWSNQGuJTnqKUnGeTX6WTXmbXWiIc3eHYX6BeHysVnu9SnXCOn6DgoRXCYZpC4BoH4plH5NmEp57E4BvPIxwNJV8Kox/ToB9YZiFFK6DAK6NKLGbIoeEX4iDWIuEaoaBcoSIdYmbaoeWcZeRbJyRZ5SSdZKSfZaseZCydJ6xd62bWaWWf6ekd6akfbWteY/CbpjQcIOahI6UhYmTlJmNgJWShZSpg52khZqljpamlp+npKCfkaekhqWjjqyihamnmqG5haO6kK62l6u2nrCyibu2iLe0lraznruylKa2paKyu6i1s7Ozpa/ckrzEjLDImLTemL/GrLzJornJrbzFtLjHvbzbqLXGybrR3ci+i8S2mMnKi8DHls3El8jDntHDntLOmcPAqcXIo8XEvcnFs8fXucrXsMjVv8rZvdnEs9PUrdjSrNnbq9DTu9vUvuDRrujivPLqu/r1vcvYzsPY2s3T19fTxNbVzdDdwdjcw8Pb+dfnzdrnx93lzdvsw93k0t3m3M/k6Mvm+c3q9NPn9NHj/NXu8tzs8dTx/Njz/t74++Hvzunpz+Hm0uPj3eLu1Obu3Ozm0+rq3Oj22fLrxP3nxvfzzPz0xf3wzfnz3P781fj43uXt4uzt6eLu8eHu/+fw4erx4+vx6ePy+O/09/Xz4/Hz6v397fX38/X6/fn79/3//AAAAAAAAK5rAZkAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAAEg9JREFUWEftmXtU09eWx+8vBCtSqwGtj6sXeUgTFIU+LGBC9EIIKIpWLeID66uWtmoS0KBWsCUQHoYkkgghkKkTAdGphgZ+4Y7yCogxNA/KQ5SQMWaCCb/EmU7HG3JrF/f84oNotdO71l1r/un5wS+PlXzWd++zz9ln7/xh4p83/vDPQ038zpqYuGc03vutLn21v8bHzRMT/2Ey6Uy6iYl/bz53JjN1U+qvYl/FuufsNZp0uhGNxqRWN5+7cPz48Q+WhYcvSz1eVvYq4MtY/wlMA2p0JpNGq9VqAOr49u0b168PDw8LX78lNTXzbPNLcS9hIffu9ep0Oo1Gq1aDm1bdjKI2Jq8PX7p03vzkjes+OHZNaX0J7Res/9WYdBoA0mnUarVCrdZr9RfObd+YsjZ5/bKti8PWpqSkbPzwcuvoaOcvaC+yfjTptFqdpqdH3aNRK5oVgKZoPvMlkLUufPPWOeFrUzakbNzy9bVrra3XXoS9wPpRZ+oFDIBQqN2sZrVG0Vx2fMsH4eFL0+K3LluzJjl5zYfHMlNPfP3t+bPP015g9QLTFG21UqEQVYQCweuyM8dTly1fFYf3T+zZPGX2kuWZ7y0NX775RE5WfJwn7XnWj/d6ND2KGnFJMau4BrhKq9foFOeAqvVrluKptACSHf5TB680JmzevCVhy5bH4KkZHrDnWOO9Go2iVsw5zT/Niheq1SAgwBvHtqxLTlkbFj9t0+vLU9+Ks24OmzVr3pK5s2cvnpPBpHko82Q9Gtehok5XV9+oSk/fVosGhFZfkzo/ZcOGlDWbZq1bsmb+mtnLlqSkzF+7IWxeGPbQpYYC3+xnyiZZP/9tvBegJCVN9Tdu3KjaFluiUJu0I4oz65PB3G1ImQviAjCTUfKGnSlvvjnlUIfsyGt8sNKejGesn38e1ygUNYK8x6x6CmVlrcY0MqI5tj4lJXltysZZyYCxYcNcN2tDypRppR0NNCyTksj4BWv8XnNZWVlhMYtVUl2dn09ZuW1lsVqrGdGUAUEpa9fO2hSWvG7j/LCwuTtBuK6ZEkov4NG8JXYzkf0ia9wElu+xM4LCPFY2gxG/cmVJSaFmZMSksSiWzp2/LmzWm9y0WW/OnoLBQFOmLJ2CiZHxOPipEqdJlZT91GNPbBw3/ctX2zemHisTCgRCoRBElVqt049YLHmicfWJ5YvniK7cdZ2YgpnzfsIKfywExV5t/DrUt6lUZo4Xsen0x8qe+uvCVzt3bNx+rKwGjXmNemREr9dadBxKSAdizFyeRfpzx33zzOCsUt6ps5JoCMr9Vj4NxyHi6GRxBpe+7XnWVzt27tix/XhZswI4yWTRmSwaizqeJnUg9s1h65ZcToj45M8Qnsbjnc3AesdCFbm+uF6Ew5GYRUVcVnrBc7q+2rlz547t249dANGp0VjumeqKjcZmq92GtC5Zu2HuLNLH7wZgcVOxr+GhxJsqbz8syexEiFQ83N7DzaaffoG1A+jacrwGLENdb2+eurTUYR+1dXU5OpeA4Fq6atSKx1UUxQVD/k7EDPnEuhAVHifhZPPZLAZL4sn6V7eNO7aknpe2SaUCAlNnB6PT2mmzd344b83c2UeQdpwvL7ecR8QZrfC0u9ESLgM2q+jA8fRsPuzBuvDlV4CE7pjnhQKpvLTI4eiyddns4AJj87LZi5Vy8oyQ0pyccirB5SiarqLK2bBKDkD8JAb4impyHs+BzQ6M9R+caZQ39Iw67MA8m60TZXXZx+7bOpupDHUStrQ8N5dKVLG9o7bRaWR6CJ1NbmMn8YXSNrUHK3XLunXr1iz58LJSaVRaUTGjY7bOzq5O4LH79iu5RlhvaoJCD/FEeAiM05xtKi6cbSaqOEligVRa46Gr7IPwJfOXhK//sNU6dt8MXA60jI6NIYBktyNGfLHFYtH8LQoTSCB6+VLhaH8VgjCQNlUSO6hI3tgor7s+qatwWdi88PBNX57Rj3Za7491AQQ6h+DBais/YjQ5NCa9qdcvroIWAPFdLom/E86mwXiiBEuT18iFtZ6srGVLw8I2nWltPMWzgrnr6uoEFICy2Sutq5gOE1jieosam1FayvOWIwg/pI3G5FJdfEySTtYoFNfduP1M11+yls9euizzGkza/S6YPpRhlh0JxvjT+YwRPcjdFpNFb7r3OjMnt9KXbkQ4CU5mm/zR91G+GmWjsKS6u6/vGas2bfnypZvKW68GHNwP3G4d4ya8jw2kR3tDIeQay4hlRDsCbFRjmeU5R3wYDgeRIppe6lDh4hGdtIJ7fahvaFJXbdrixYszG5UdPgcPAJb9KsbLK5sna5QJEjHYWotWOzKi1Y/0zsnKyeVh2I5enwKViGPGxut6aori64aGBoaGnulqO/zOotDDDZ0tAQcjlSCoeD54HwjCEkrj5kCYEgvQpdaOaNSkopwcnjfHlYhpGk/y880waq8JYuoNBsOQB6v2iwMfLVotU7biPj8gt3bZmQRjTiIOxFEQXOMd69To9WAnqmkKWn22nOc/M8QXSr+JhTia1lZBsfiOewxPxsQXBw98fOTbUeXUA5/x7FZrRpzsyhUZEctpMzv9oSTAEQrKCoVBkA8twwuKd7Ihv9eL269dk5bUDw+7dXmyPv/046MyZRdu0WcnraN2EqHxUnlLIs5lQmCIlbGqRigsLhQmYSBMUDREdSBNkF9ehaCiVGowDA8Po7Im/TXxxef7dq8+2qKMXfh5Adgd8HGNly7JiHjEiMihNntrTVFWVl7xHL8mPjEKA1sRiXd2cZEgg/XAMHwHsIaG7kzO48QXB/bt3r17Pz126qe0UZvdJwG+dKkhgORQjl59rcHWeTimuLAkCBty9xF/xowe5agZk5Sbm1XSB0QBGhiDdzz8deCjj/bt2xe5wOvzT2xdVpxPoqhFRqQ5jA4YarF3ni/KisnD+PoSKVEYr7uIo3JaVmaaeMjQPzw8NGwArP7+SdbR3Sjrs88+9Tq46D1Z6VQc5rUjcirf4eBEY3u6OpUtjZmMaaUZBK5R4k83twfi09KqDUNAlttbA2B4sPbvfsx6bd970yHfuBa5vxfOlyMmQhBdbrPdv69slU/jtfAINERFx02LF1dfNwwAzvCdh+B/oN9TV9GqtwDss08PzgRmvp+Q8035TJAEMVB0OhREWK0cU47ZHKG5DVdkNLzcIY8KOm0YAvY9HqiFnizWqphF70R+9OlHWGghrV3kEzAjFvbzwwiQcYjjIh2y20bvj4Xyco6e+vYUKU71KH1F/g+o3w2GASAPkAY9/FWyNSbmrUUL3vBa+F5LRylhWpTExQ+g+zocsDdFRQu0j9lsZgKPFkdjyhpoAdmPbsRS6t0zaAAmoiyPmBBv3RofE7pweoI8I4OMDW5HEKcvLjHKiEgwEI5KzlDaR6O9/H18cD50WYtsNQF2wZT0PuCxIQPq+aFhT1be1pV4YsY331ylQHg+yKJGGtk/muhAVN40csI4i8yc478tOkQiYUeFEnjtvIU0+wNWUHo3WD4DA4PDD28/nJzHvK1bV5KZMhnT14fvNJMdcnyRCLcixIHQZ6L+bgK7Hp8cIkmUsKkh5GA89yqJIHep4/2qqmPzL96+/dAzVvNWkqlxdMZML5rjKuxKCqb+xSXBxZJdcgx06koDD0+/y/dlcJJYvhxJ9M2bfHKwqJJAUrmq/Wbkx/pV9/UNDk7qYjBO0kn+/hQV4qDjneZ2M1fOx/rjerhR0FGZTNZBwsvNSXg+lePirFjhX8CH8bQOGoHm2hY17oRjq55j0Y4cIuLiYIfdgZBETnMvWfKADk5teMTsTWsov1TecCSA7uSQ+duiAYgdQkS4Mas7KolUUYAIMUflXxzwWI9UKp4uMYq4IMPQEbOTykQQCpGObXO0eed8e6UBXJcCCL3fExlwZTQM4zhRUU4WsaIjjpAYEu3nB1geew6ZyocRJxNPpjYhiBnhtZtdCcQMstPYjokjEOMSabyWloxAuYtBYRN9vKPu9iZyblJDeR2VpAB6kDflYp8Hq6C9l0N1mbmwcxxpRxw0ktKVQA8ku8xyCKyjdEps0MoM+dnQOMfN9xMkBUSiZFswkSMPqKxsYfpSKIClmPR9k6qdTefCRrNZIjeCOxM2hvACE/7LpfJmXW+qrq4W51OCTrasDpD8lZ7IJzaxqdelTKQioEF2Kepeenq3pmaS1Qtz6HQGtwfm0ulmY7vD4TAG0IITxtvxMyqkFRIJKEWqTwfFddCm4p1wVAE5pICiSqJKgjNkp4LHKfnXawonWSIOm82B1e3yOLoITiKJ2swOXHYwJR+LZZ3LLRLWVZ8+XQXikiw/uxCnMvvGUjAUBpkMqxfKjhBdQXl5We4a/PE5ms3hcyQw3NNeKuLTWYzsJKfTD4uB/LLOCvLEJfn1dUBXVVU9JUgmI+K4wZJHEkjyiCFxEWk06gO/+KxCD39JJBI+nwub1T1wNqziSPhmhjcjyK9Jkbl4AN03L3ZXicVVVVXpwZVXRURvLD3du0DFCGIUhCRQ72Ljz2u1k7pgEVAll4vgNrmovb1SzpjhXWO51tIhLCkBrEGw4V2sA8KqqvJXXL7UEOflv2IGTA+G4cToaO49LMuhtUyybsIwfFXOPcmF+RIVzAnB5X/f09ImK6oF+QFkLTD6u+tRVlV6YENDA3tFNERu4ojkWJwPuwkT9QB0IZ756yYqiisSccCNQ4mlq5StcAc3vgTsnCjo4U/DwwMX6+tRaUG0qw2VIOfG8tXTpvLg6T4ECi7es+4ww7CIWyGXcPl8KpUub5NeK28QM6oHBsC+6c6B4H6xux6Vlh9c2ZCBH99WcJcQ2Gi3y0iVbYK8Wg9dd1WwSA5LRVxWfFKx+nxOZnNPW143mvjuABI6wP4+VF9Xf7GqKvrklUPBTnZCMEFpB0d2a6dS2eip66ZKIpLIRZx4EkfafPnEiTLF0HXDMJqr0BwBSG6ndV+sB1c6QZYR44qFSGDjRs+QnZ2drZ6su7BExOcyMhgC6fnzmZvz6sDu6057zzIXSBQg4QCfVVUHVpDILn8mYgcHW/T03vm0g/K05hNxWNlMbqP02tfHskrq0ET13TPS45lE7wMX66rqiEwc2xzQ4S4numygGfMii8VliWRysIeWFdWBLPXdd9/1AyXPjTv9A0N93aymYEawSOV7Hz21gwuY+NjCyVqUwxcIai43FmeXoKhb/YAEUp97Gp+IAk8HB7uv55ND6DgVjAOpvBPYB5z/FPWsrhWJhXKhtJhV190HWG6Dntj19Cl47Lt9o4mVFETG9WYTRoGJXVZwR37BEotgobS2rht1uDumHkepxwBJ+vb3En6aaStIBCQEdfoY8NboM9Rkf7VWLK67Dk54bjeBPwB7Qnvy0D/8oC5vVZFFqxHi8OC07R5W2yTKo1dbV9/djR6p7qDfNQw/Mjzsv4U+efxy+IeH3eLCsrN6DSizagQO4xgIiTHbmAfKk9XdNzCAagKhfsfw0PDDrVu3+tH1A0CAOK4WphXq9XoT6Mvo9c2riqzWych6fh7Bq4EBFIaaaDD89OiH/luoLEBBYUMDhWlZZ86NaB6YTAClb64RSM+26j1VTcYE+i56YkFVAZRh+Duwen56bN1f70ovf11YqAAFiOUB2mID3Quj9nzh5edRL/S2h0FlMzRkeDiMRhg4ErkLgb6mRHwgIU1h0ei1JtBwADBQBGrV7tzzcn+53x0Ep3UQk4DUD0xDRV44U7Z4ARhTXwcVm9JiGjGaNHoj6PS8YKBH3D/lD94eHBxEFzV6Ruurrxcz01ZNX/DHiDfegEosWosJtLG0RlCaatw7/K/qmpjoH0Bhg/2A1F3NohICAqcviIyMjIj4EwfthoGeMijZQL/ul6iX/BbwsL+/bxBMaV9fPScudFHEHxdERO7duysilNkDCkkT2kPUanQvQb30d4XBvotAVHe3OHt/BFC0IOJtlEVgShWAAjT1uLsRv8FG90f+G5Dq6jhH9+/ZtevtyMhde/e+HbH6kEABYEDT/7wc9crfO+rqasUnD3+8Z++uXZERgLU3cnWGoEahUet+fAXp+Vh9/kPiUtonHwPIrojId/bs2fPu/izAUve8kvRrLPClyn/bs3fPnncWvbN///7Dh4sENb2/Qvo/WL/6zd/q+38Q8uTjv//W9I/57Xd//f/56++xnVoVrt6RBwAAAABJRU5ErkJggg==',
"ew":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAEYAAABkCAMAAAAMlLaLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAABUKBR0TAi8TIiggACE3HzEmDTAuGT0rHz86HS0vNTY2KitGFjVNDzlCGTZaFD1cKTBkDj1xFUUnAEQ0CWM9B0xFGFJHAVhFGk5HKkdGM1dVNlBbMkl5Ek9/JUl8LlxuLVN3Mll0P2FECGpMH3RaCn9TCnFZG2RYIGNbLW1aK31xLnxwPEtPS1hIT1hVQUxgR1x1ZWhURmZkSml0TWR1W3RvTHxmXnhwRHFxWWhtYWtxcECAEEqPFkqaDFiQLlqtHVGzAGKHOGSpM2q+KmmNSW2XRXGJWX6QUXidV2iRfHyGbXWOcH+DfW+nSHOpTX+2o4xsGZlnEolsLY9/KoJwN618EbN1Cqd8J4t/XJJ+S4mBGImiMqeFDaGLEr6eG4uDSoKDXomBUZmORp2TWYSCb4OeZYaZbo6YfpOUbZmSYZ2RbZaTfoOrWIO8WpmoWJSqeJCybpq4e6efbaWTeKugTayhWrWoR72rVLyxX6+nbKezcbuvZ7CjfbG+ary0doHJTZ7KfpLVZZ7Zd6XCVqnCX6PCabfDY9i3ZNG/debSFMrBbcfCdsTYasfVetLEYt7ReoKPgpOVlIe3mZumiJimkJ69h52oq5u0pa2ag6OlgKWlkKe7j662nKq5mbq0gLSznbi1kaKooKS6oq23tJvOo6jPiq7Glazfi7PJmLvLpbvKrLXIur7Jt7nYoYvXwLbLx7zO1MrFic7IntTTgtjWl8HFrMjGpMrcq8LQs8fctM7cvN7WrtLYv9rXtePOgujciPbXjOLOqufVv+jWt+bpu/XqvPvyu8DHw8PSyczdwsPa1M/Z2NHayN7Yytba0MXb48be9dbnzNnnx97ly9npwt7l1Mvl/tju7NLr99n0/fHc3uroxeDl2+ft0+Xu2+nu1uDw0Oj32vLpwfzmwfnsy/Xr1PDs3f3wxfz3zf/6yvT81vr31vjz3ebq4+Ht7enu4+jr6Or04+v26uX39/Tz6vjz5PT28vH2+fT4+vr8+QAAAAAAAAAAAAAAAAAAAFb4MNMAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAAD8pJREFUWEftmG1YU2eax0dGQYwSUFAJCKLyDgKCGN4UoYqCMKIVC7MC4UUQUXBZMoIIbLcGWWgILAgDiIKOuxIZDSB0TAIpDYGN0GIIIWFC2CSESUJ2VYjS+qV7n5MEwbZz9ZqrH3tHDpJczy//+/U85/nN97+I/eYXoXz/K+an4/h3YrP05ueH/ycxr19NT08LBMgP2Ci9/cGDKw9y793+cfSPY5beoAyBgMkFY/JHue23rhy/dPT8iSi/I0d/90PUDzHv3r1+82r6m9HRHiaXDsZFUO3NV44fdziyy29/xJGwQ2FHPwR9gPnu3bu/vnkzLRjt6Lh3uwfWA4bH5FKbzx8/au+wy8/WNyriWFhY2JEPOKswS+/evFn82ysBv6Pj/t22ujoqd3x8nMfnccGjmEP2DuZ+trYREcccHMLswlZzVmJGBdNvpmdgVUdHXVtbW3X17R4eiqHfOhoScjDEfpf5rp07jxwJC7MDW8VZgflLS3s7ly/gcjvu3kesJrq6g8+TSqXj7ecPHQwNDQ+2x9rtCNmxw27HjpDgkODgFaBlzF+ac69caabSmXRqQ9v9YRqNVh/t2cDnAYefax8SGnr4YPiOYBB1MAQMua7kGDD/efz48aOXrtyiUqm11W3DI7Rh2v3ooMAOiUQ6vng++HDoQVi5A5aHhsJ6lBMcvHlZjx7zrzExhw7FxFy60tzckuEDHHApyKfau25iXCqV/ckCgQRbONgBIHizxWb4BRR7e3sDR4f5r9LQ8JDw8PCYo+ebWzIz9/sEBgb6eLdl1tGlMt6CjGu+Gb7aYuf1DAfsZotNtpsc0L8ddpmvxpSGgoWX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',
"rap":			imPNG + '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',
"upgr0":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAABo0ByQtFCk9CyY6FTI9Hx9FBSNCBiRBCiVMBClEDitLCSxFEitAGipIEi9MGC1SDjVKGjVeCjdYGDZJJD1TKDhlCjZgEEFdHU1PLERWKENXNVVIJl1QKVpaN0VqHFFvHVd8HkVkJEtlM010JVFnN1V5KltzPl99M21HKGNYLGxZPHVdKmhmOGF/P3hiK3lkM05ZRlZUQ1BlQlxqSV1kVVp0RF9zS2RhSGRiU2Z4SWV6UHZsR3pzTHt3Vnx8Z1eKH0+AIVqIKlqBNF2SJ2eLOWGTLGOUMmiVNmuTPmqaOW6hOXOnO3izNmWDQ2mBTmiJRmyEVm+cSHuCWHGTTHaaS3qbTHeSW3aJZHmFYXiNYnqNanuFcX6QZHekQ4RZK4VqNYNwPIV4SYV6VoK2PYiCV4iTXZSFVYmKa42PcIWVaIeddI2VcYybdIybfJWNZJSTa5iaeIavW4O7QoajZ4uheJagbpWleJqzfqKZeKGsfIbFPobRO4vIRY3UQZbUToiLh5Odg5WcjJmdgp6fipWXk5agiZWqgpyhh56nj56thpuri52zjqOnh6OukaKonKKziqS8gqW2kKSwnKa8kqyxk6y2nam7lK27nbCvj7aulLa6l6q0oq+1rK+/orO8orW7qbq9ori/qry+s7u9uKzDlKzBmrbEnK3AobnHpbzDtr7DvLzLsb3UqcPEn8TIqcTLtMHLu8vOscPUrMTUtMfVusbZssrSssnUvMvbtM3avNHKo9fYrtPaus7jv9jkv/Drtvz4ucPGwcbJwcnPwsvOyszSw83Qy87cxNHVwtLWztLcw9TazNjexNjczNXW0tXZ0trb1drb2M3iw9jlyNbh0dfr0t3h2d3q093w1ejoyeDh0OHj2eHs0+fu3OLw0+Xx2uny1Ojx3P34wvr53AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADlQ5SkAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABEdJREFUOE+NlP9fE3Ucx8+iogIVh0hLtxpzmF8CF9lO8VZDmMhGGRkWMhdrsahwFy4qGkWkFnmAmc08E9FgnUY3BAU2FpvUHG4q6scci4vZ+j8+fY4N2MN4PPL9wz3uy/Pz/vJ63+OFwXsM7B45+H/gWT5R0AfnBa9dRx/3xUp9BuEkPPrh0Lxg22kIb+RBeOn3Ud/64KTvzIEdh7j5Stfuh7A35ayvrTfyXSobafJ1F79/IRH8ka91EcLS7N8CtYubpio67uQlV3DPnThRWmhPAEeVPLjvcq80o4PbvuQZf9brkfTkpT+n7bq1XbY3ATyed+PiqdufK3GF6DH82YyFFonwq+QHU/Hkx90vqlZh0Hf6GgPh+KXrmzJPjikVSoodjnpokpCnLElJffThRxaIk47+VCbEztRkZ8l+ILOEwsXLXsNNx/6JovB4o1GSwAULFj50/7K6pLbIYD5m2SGT6pIksifTMjJwkxcR0Sh/8XqHzQrBIpWg6NOXy78NEFjhVk2RWLJULEjNwMkwj02T6IQnTOLqRuvWLdqGV9sN2Da1RleiEoi1KiXhiuWKs9Gom2i0NtTVvVlUXFmFqZ8v0WlUArXVKqdjheNJ0YOXljd80tioKSpvJ7FiXZFULBFkipWEJxGc7sCrtFobrdJSBrixArWmUCYTqDQ4NVM1oTiltGpKXqjg0N9Tn/3AffL0Qq0ORx3OpvTE69MKrVqr2ggQ6GSI9YclKrVU7p5rcPbOI9I+oVp1EK0WC0VM8ne2abaoRbwkM+rEqqMXItnyTRYwhUCOqzYAsU6jlvPruCs8Hjmp990J8T1OhKqrBpZn6mSox/+GC/8+58qpiTBAPdrWrbOYn5YskjTPTj13wKx4O4f+YpdjDGL+ATvbz6xUNCcZwvHOEhITIlMuDUhqEmIH7CAcAgaDPU1KxQWMT4QkOoavIVa3+DuPBCG2t/xrWwSBNULBxsQueQlcxLsr3rPfdJ7rvAqxrlcKXroAAkNHVmxIN8d1jv0VXg+pqF1N/hr6spNFU9+q1xX2+bm/mKeYNaK3EInWE9vQsFlkatljYx00G+ANwN/FhAAA5t3te4y5ZfTsJJSR0FsYN0XSvoDjNm8AAEwB4CQNlnoqP19oJF3RcNhFldUcMuoV7TQ1yIWAf9pSQk6Gam6q7aSOU7kmcneZQoTCmGPuoz6iKbo/AtBeYt5zvrWZbGUDU4BdS5iI+jcMtuqWj/XGHjc30UszHFp0HBzvaKU6zgcHnfbczT2sXV81NGT/YK2hiwGc/ZeOiZhbTRtA8OT+yrJaBoz0jUwAe9XmHnCTYfsATV1hB4KTCSC8fHjnyqyd/eCPEDfSTZj6wd9oPpZ20X/O+mzcUkYPVhZssA2BQV4pFIHA8LDbkejGM94z7vimprvPCQASA5xjOll2Ltlcj7GT44EAr0TQMcbSg3dh81szhFcTi8bu/wUUhzueP53uUwAAAABJRU5ErkJggg==',
"upgr1":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAABULBykVDC4lCEwiBkMsFks2G1cnDVQuEk09J1U+K2MsBno+Ck1PLFpaN0NoHVhjHVFzKG9OEXRGCnNCG3lXCnJSG29MKGddNn5IKHlVJnJaOmR9KXltP3txN1ZTQVBRXFVMclFaZF1eeVtgWlpjfWRba2ViSGRjU250Snx4THx4WWdofn59aFVcmVtkiVlho2Nqjmx1g2p0mHN6nmBqrVuHLWiVNHKqN2iCSG2TRHqDVXOaR3mcUX+AaHuBfX+cYX63QX7EOX+Ih3iBlnuGxoM+CohGFIdcBphLD5FaA59XGIBPKYBUOpdZK5NcNoxhCY9qH5hlB5plF4RtN5FmKJplNphzOqVOCqlRC6ZYG7lYC7hbFaNcKKJnBKx2CalkJadoNaN4ObJlKbRpNbNyO4l7Q4h3U5RrQZh1SJV5Wod4aa9sQKx2TL14Q7h9UMRYCcdiFd1mDdhnEsp5O+RlCsF7RpaGPISpOIqES4yKW4iTXZGDSpWKVJKUXoeJaYuTaYuZdZiGbZWWZ5uad4KoWYK/RYinaJWlepi3dq+HR6uBWLyASLiDVbmXRKeOZ6iPcKOZaqOXdryTaqmneYXHRIzTR5DXTc6dOcmCTMeHVNeJTdiMV9uSW8iUaMOadduVZMehSteoSdOkUeiWWfCVVuaYYeOsXOe4TO+1U/G5V+OhcoCKlZmahoiSvJmlipqol52xh5iloqacgKWnhKismaS3iae1lLWrhraulLa0irm5laiuoKyttai0pau3sLa5pLi9tK2zyKvDjrPDm7jRmbjJpr3FtrrQorzHxcSrl8y2lti8pOargemxh+u5lcbFp8XMt8HTp8nYttHKo9LOtdrbrtXVu9TlvPLGqfDSvPDrtvz4ucPKzczYw83R2NTZxdjc1tfmyd3q0t7w1uDfzejnyeLr1eLyyuLx1/34wvr53Orr5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ7PC0EAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABHdJREFUOE+FlI9fE2Ucx68faGVOJ1kZ2fqlO1sght6dDrGygsxwzoDyJxiNgCx+JAZiiJsKxqgZmIwNJx1XmQTWYMJyLsNBYXVjs1Eb63gON7b6H67nbmMs6/Xq+3rd3XPPvZ/P98fz3BfhoubsaVAfLnqiRkffCNyYmYx7IsKYdY07HGMjDguk1RcHR697PJ6baB4EtMPlAiwbmpoC42P9hw+qdbwNupmbFHlqeirEAkdfPQPv/Q3vV6tqDx3StdDXYyjCsX4wHQIMbdaptikVdDAIXEMtalVNdW0tRK0zqggHAAiZ71ds26Tcrdy9NfnK+Y19ll5Lj6amWqWqVg+6opoIC4LTzqUnFEoeVCqTvlqd9vCjy9I2WCyamoyGIdc4wwoo4rcPT0ibP8/KUkBMuSffbAd258TzK23A73IygLF09wnekSupax7Z+8W5vVmboOYeZVZ3BioVzUcfX9Vrs122/VB6bxI6IICXlpfe92nnudMKpWLx4sRkaYaZ9oS9Vo1MkpKSuuaxRVuXr1o9wYPXjG3ZBxLOfpaz6NY5SWjdwJ/hsC/s9YXDGhlq670zcenXK9Oem4Tgb4YlmXkJZzubEm55AK3zQYIn4eXzqFFNndQVZM6n/QHBHw0vb86943Rnc8JtqCbAYwIJV3gDGrTkiJ3963LKJQhebCKNb7yZ19w0J1nm5rUEzcjDIyON+04Gv03ZMMkhZyiSNBmrCnLvklgjjqMgfPFZJSRVAmypT37HIR0kb0aSSpZ540FB1VdKaukgWPZUA4fktgkk2Y6a/+E28mLO0IVCQX/9eheypcAAgywszEdhhDFJb9S/VVps9YDQhfVjyDt6kqx6tXx/pcQzG2Bs5BVRen2R1fH0EPIlSVKFO3e8mCjiSxLLOFJPX1gEP1MljsYR5BeYdcHc2+dlSqLu4nW9Xgl1oNg0am+8ivxugmvatmy+m4/xX87daG7rewtl645eRbifSKjZZcyeq4llPcurpfipVgLH079HuJ8pQzskTW8VBSKS8bqy4mPHMAyS/RCM1BveYCHjzAdjHkBVBNH6DIGv40EjX28Kkivc8RwUdstMDz37SStBYDx47UyHCSbU3lZVpY5P3OfzaqSmvPTWUwSG8TF6aNo9CnccHgzRQUjC7Yns0K9qkZE0iHECE2N81hwLWOZj6Ny066VMuTXm3SzXw01rWoiLFywQH3fxYJC18yfj3bKyF3LnyzXucCDgNstJUvt2m/4VHBNDa+SE3sM6i7TajtcrK7fPu8cgl4qg1RgpyqSvynmQICCKWQSQAxznZ6z5+yvKXsvcZRKqAK0Lxl2MEzyZPhwBoQU8BRUVFeVl25foig0R0KDV7itZATkCP87EQGDNK9+xMz8nWzPyDUV1kSa99qOWPqenHsNx/KgD/lwRQZYFIzRNwwYIQN8HBlL/Ic2wLJxuwHDxWsjNgJMMG5hphaz1ZFE34PjexLIX5GuldfD/j7kW5qPqsREssd/S0zMs9J7Z2f8aAdbl5/X+F5xd/DckPzbTuvnomAAAAABJRU5ErkJggg==',
"upgr2":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAC5KFzVMGDlXGENbHE1PLERfI1tXOlpeNUVmH0pnKE1lM051JFdtOlJ4Kld3MlZ6MlxzPV58OmtkOFZTQVtgWmNgSGNhUmxsWWZ3R2p3UnZ6Unx4WWRpb2txbWxwdX9+ZH58bHV5fHp+gV6ELWCLMmiZLmWTMWyTPGydNGuZOnWnOWSDQWSATGiGSmyKTW+HU2+KUm+aQHCNT3uCV3GXTnWcTHmWWnmAaXyWZXehSH2Bg4B0TIiTXYuLb4iYbIWTfIuecYueepWSaZSdbZ2bcpybfoWkXImlaI2oc5GhfJGucJOrepird5i1eKGrfqPDfIyNjoWLkYmNkY2ThoyQlo+UmpSbjZ2fgpeck5qdnpuepJ6eq5argZuhi5ynl5yomp22g6CeoqCmh6Sphairgamrk6G0hqCyi6K9hKS7iqm3lraulLO0lLO2mrC7lbi1nb69k6CipKKmq6WspaWpraqtrq22oKywq6u8pa2wsrG2prK7o7a/rLm7p7u9q7W6tLW6vLa2wLS6wrm+xby/yKjGh63HkrLNjrfDn7HMk7TNnLvNm7nWmrbMprjEoLnCrbvPpbrDsr3Eu7PSoLzUor3cor3aqL/Xs77gpMXNm8HbncHJpcDLrcLLs8TKvMLco8PTs8XRusTZssvWtsvUusjbs8vZu9HKo9rbrtXTvtLbtdLfvcLhncLgpMvhtc/gv9LjvPHrs/Drv//xtv35tfz4u8XHxsDEyMTJysjLyMbM1MnN0szVws/dxczR1c/V3NLXxNDVy9LexNPZy9ncz9HU1tLV29Tb0tPZ3tHU4dXa4djc4tvd69TixNrly9rozOLiwe/nxuLs1P31wP/2yP76w/v5yPr53OPl4+Hl6unt4+rs6u/v8Ory4/H06/L08gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKBcQJYAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABAZJREFUOE+NlP9fE3UcxzHRrZMm2NpJLeOLFSpB2XIBRSmNDl2L0LKyb7NZsdMSjEr7JpGfzcnH/NKdzZV9+CKOjDMHXJmUGiZhNBDvS9oq/pP1vtsYNvjBz+Nxt8c+99zr/Xq/Prt3Rvz/a2LjU7G0rcTXjLTdocaCxusCm34oLLgucMPIjoILE7Hz0+C00rHGqwNNdzz3c4I7pl1bzs3gMVZYcfpsy9OLjr67D57+tK49/t1njq0zgE3bbq8bGjq9dlHFOnh6cO36+OBuz5bp4MSG4ea6luHhlmdeeP5oPL6zpa6iva1TM5AWz5UdV39fn09bDHPoW16Ot709cuqVe1YdmSHHC815ljzPl91qpMFhNUcP7jxQsqRk9Yud0xR/pCs3/ykrkhSRJNlhpS93rbjrzuwHvOng33RlX5+kKIooSZIodVfRg6vvK1laNA2kq8cBkzRUEUUlMl5Nx9vbXI/vT1PMt4Y1SAIUPkBV/cY6dUBTJ3PF3CCKmpp+SSJo9jWYEycEnafAgXxrr9g/icmqpi2KeU6u6yT7bPXHKTBWuNCjiv0Jg4mbCDdPnpvrWPVm5Ucp8PttC8OSDuos5KNLNlhqnHs8r742pfjOGfNxNammM7Iqq4oaMTBl9Y+wL304qRhrPGOQ+8UkqjetquBRNaxh3E/cms9Ogu9v/MTcKyo6mNBVNReRXrPdVsMsLlqZBI88+F4zDR6TDjUswYdpxNiZ5eXOBDj46KenRs5WQ61Ujpo28FUWl99bb1/h1cG/fNt3XfxjxNqraono4ciyJq7K1twFSFv7Afx34oMA+e3iAOv1yAAmNaGRiCpvpqlZuQi5EAbw1+1c8JBv7xc4lBtOWoNwFLFflMPWHCqLcqFaxAG4j8UCL/A8xrgqkigtKbIKZx1xWCiTiZrFoNpWAL/CAoHF+TAxPhxRQQoWdKV2VxnnUTdmU3OLkcsH4DEeCwLieZ6EyP22BlWW4UhkRd1ko3JmF2XNnZfrQijQlhGPkh5C6nlewCQwf+kcmyMsj4+HN9lw2U0UY7evAQxh3JERH+0KhQjBLhQQuNK7ly2xWQxGo9GGCXYHEPYHMEI9mBuEHKMEihLeFxAEp2lZeSlPnAwnkKBAtAYxrkF4T6ce+NgJATYFsFBGZea49957Q6bbT0gwCO7BETrE7j6f+j8KUBnzn6Obn3TbM+ebFizHQogIIAB5IPaaV+Ey7PXA7x96rDibMmXNXswAFQT32PsGq02s1DvzT/QEwQK+zcaUUlSWqRiByxCPA6+z7IFf0mbPSYKxq96HfVR5LYNDHDQSeIvd+vUMY4+0+v2Y49wQHE9Ia+hw57nJ2Zs2cY+Tw+Tb0bGxjo7o6OilS9cM6P8AlcpIworLO5cAAAAASUVORK5CYII=',
"upgr3":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAMAAABKdvqKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAE1PLFVMKlpaN39aFGVdOHJZNGpjLXJqNVZTQVtgWmBZRWNgSGphTm9sR2RiU250Snh6Rnx4WX59Z3F+gHF8iX2AVniCi3iCk4V7OoZ9Q4V4Yo2BPpSFP4uFRoaHVouTWpaKR5KJV5mVWIiKaY2JcoiRY4STfYaYcoiadp+PeJWSaZmVZJuWbZ2aYpydap2ceJikapumcZqrf6KTS6SXVKOgXqmiXLWmWqakaaOqaq2jYa+tb6akd6eqea6sdKqtfLiuZb2yabW0c7e2eb20c7m1er25f8G1ZMKyasW4b8y+bcK8csS+e8q+c8zAb8XBe8rEfdXGbNXJdNTKe9nHetjJdNnLfN7Se+LVeuTZeuvcfPDdfe/iffPjffXoffnof4OHiYyRgYqSn4yckJWcjJWlg5Kjjp+rhpysiZ6ulp6xiaaohaGzhKO2iqW5iquxjqq5hqm7jKK3kaaynKS4kqm8k6q9mraulLS6hLG9jbi3g7q7grm5jrC9kbC9m769k6Sqsqu6oKzBk6/EnbfCkLLDm7TKlrTJnLrJmrzVn7PEoLbKorjHpLrEqrnMo7zMq77Ft77NsLzSo7zQqcHBgcPGi8LIis/LgcfNns3UndbHidXUi93ThN3Rid7ak97bmsLKpMjMt8TTrMHZpcjXtdHKo9jarNPYuc7hvOLWguTZhOvcguzci+rbl/HegvDei+7hhe7gi+7jkPPjg/Pki/bqhPbpifjlhfjljPvshfvri/Pkk/Tlm/TplPTomvnmlPjnnPnrkfnqnfzxi/zwkvbnoPDrtvz4ucTFycTKxMfKzs7JwsvVws7cw9TbxtXU19TY2M3hwdPjxNrlxNvizNvqy9vj0tzq097q2Ozox+Hm2uHs1OPt2+Px2f34wvr53AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+2p9wAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xTuc4+QAABDNJREFUOE91lI1fE3Ucx8+W6YI6HTULaHAbUobh1F3NqBQztDKKWMk4WI9W1AClACujGYRDlqOGPRGUEYPgYEI3Hu53x8M52GXFSknmGq3/5Prdw2CQfV+vu9c9vO/z/f4+39/3EEGK30/dVuH0uN1tn7hcNVXVLlfT2x9VVDa89dr3v83LBAKPP34+teXuxjZny8fvHnjowLlHn9q7o8HpPuPxeE5v23bP7rrW5s/+EsFLr9yx5XWnu/ucxWItJQjCZqOsh08+8l5DveeMu7nWWdPYWN26iAi/vnT7q/WumoOWch+kCIIap2DYbGT/MwX7qrrboXBTdZ0bEe696eX5Ky3f0lDHDwmCAoAGYAye6dmBLz4/7oRkdaML+SXtxlvfbNv3QClNPUtRo9yhwouTDMNOsQwAozQY/ubB0+0/eJwe5NKH+luytiatx8gACADAdQ3NTc1NTbIdHUPsBFQF3P76nh97epCr0bP5pf1562/YWAzEYFmWYfzDnfj+oZ8Y3zh84ivqDYejyLWrJ8fAGF2St+FOagKMU0dT0CTVOvRmy+CFwQskBclZcHghvIREQ3upYZKgKEshSVFpSSn2832xoMOoUQ+QPrL8BbgwruRrqDgfKrCVW80lZJmPItCtJ/6JwQjG+JhRg5LEkWGYm6YHvvobeaengB61PtFPlpURaBbPi5x44vneHNSa95zoFQ2+u4J8GjoIF0tRL9oI9GhE4kQSfhGMGNGSUWmF4Es3shh6P3ARusb4UzTeuJyi2qcR/RGTFzUjS6EdAQ56wg6qHXJiRRTe8A41AH7oJthTiyxFj3HAz86wKZpgIiiJ8ymwPwAEBjJakXDYDm+mmU7ULr5RSozXYE9joN4IJoJL9k5oFZhCvXFO8kf+wpFcAgLFJmxXNyJEzz42OQ3ogLpvpcDlq6DKHxjAdbq6Bbhxw6ldM1BftSIIC5D95GOq0cdTTZsrLkujkGFgOECr4yYmCAcjajwdy62TZ+aafWMRB4BY43+Se1Fct/mN+HCF9AUQ9BmVhIl0TrIhs3V5Chfv0wVgAzQRpbIEUqPPbloZV6FNL/UJGpkQPLToBJol68lzLYS2S53fJPU6oYVeTYZL4WTwz1wJHMlRfJbN5oPG5No4p4BGChZJj6gyIclLAcneHFXVMieD0YcHaZrzD7Ks1rGc267NPr7CKaD9SRpMT3Ls3Nw6rdEbi0S8di2WWZnAyaBw/hDcQAAwzExXhzZZBUOry65J5BRwAafE2QDcJDPCcVYzjt2fUb2Kk8HFy3gx/NkQftigAHjebDLl7qpsvw4oCB/o8idmrQQA5BGzCcfxzErPak5JLfRo081PF1ryzSYMw3HDzjV5452BBh1LxdJ1ELoL12XuXL2MhBaKlwY9ZoJimC6jZU3SNaBg3643GPbsrr8upmyK/3m36vG/k4AtntEwBKYAAAAASUVORK5CYII=',
"reload":		imP + 'R0lGODlhEAAQAPcAAAAAAB82YSlGfTBTlDZgpjhqsjhwuDh3vTh+wjiHxjiOyjeXzjSo1TK12pqmv7CytLKztpKrzp2rx5G726Cyz6u40r/AwqLH4aPL46zM4qHS58rKzMrKzcvMzszMzsLH0MbM2N3e38ze683n7uDh4eDh4uLi4uHi4+Pj5OXl5ubm5+bn6Ozs7e/v7+/v8PDw8PDw8fLy8vLy8/T09AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiVAP8JFDhjBouBCBPKaNBgxImECVVoYBBjBcSEIhZgSHERoYkLCjKEGIgCBoqBJFy4SJBggsoSJV4kePHwXwsEOHMiUJnTRYl/HFQcGDpUhVCiB1QI7LDCgFOjTqM+FehhRYEVHDisUBGhQAGjHAZW7TDQQgUCFMJ2FMhBwgAQD9YCVSHAgdqOED4ECKBU7lwVG/yuDQgAOw==',
"smap":			imP + 'R0lGODlhDAAMAPcAAAB/DgAm//8AAP/YAICAgP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAMAAAIPgAJCBxIcKAAAQQKKEy4kMBBhgUgClyoMGKBAAEmWqSIUaPEih5BgmSYcMAAiSQLmEQJAMDHhi1fRixIk0BAADs=',
"addbookmark":	imP + 'R0lGODlhEAAQAOZ/APV+AfaRA/748/qdVfvKpvl0CvV6APunC/54AvZ8JP/7+P/t3f/9/P/49PijB/2rDv/59P3Dk/7z6v/ewP/HaPeBAvx7DP/u4P62OPzBVv+xSfidBv3o2f/Kc/eQRf/z6fyiM//cr/7q2fSPAfuwKvzQsP/FYvuLBf2uDv+xa//69fuLDv++T//9+/V1Fv+4cP25QvR2APmwJv/VkPSDAPWgAvyqDf/Kmv67RvecBf/lzf/w4v/KcfRpAf/37/iPQf/MlPaEBv/Vp//dpP/gxPipB/q0gP/YtfvJo/eiDvzLpf/isf/Nof/XsvzUtv/IbP+mRP2pEf6sE/+vF/iaVfyfUv+TJf+vGPqoGP/17P717v/VmPusbvmLNPytbv2safaCLf+9dfuZJPhvAf+jU/+mV//DXP/RhvWUAv/Xk/WBAP/38vehBvmmCf2pDvV5H//Lnf/8+fy6RP2XP//+/fafBP7AV//lz/+ybf+/U/++Uf7CWPx9CvRpBP/27v///yH5BAEAAH8ALAAAAAAQABAAAAezgH+Cg39ZO4SIiE0piY0QeAgijYgTYSBck4MKEVsZBReIDAo+C3dHQkMUYnM3RAt+cUxlZC9AIUtpT3saUFZ8BV4qVSswHTNnPCZmdnIyQT9afwwDFVgYLHl6OCRJAD8Ngy0DYwdSU1dRGz0e4IQfFm4PNg8HOX0ciToIKG1sDg51YjhJBOdEETQGDASoQcNIoi8B1CQgUAIMgBFUEnVxEUGAIAVI3iSgQ0iBEgmJ1hBoFwgAOw==',
"addbmthispage":imP + 'R0lGODlhFwAQAOZ/AP/69v+rQ/l8GPV+AfaEMf/RlfqKL/2qDP3Zvf/Kmv6SMvuuI/738f/x5v/kzf/m0vacBP/48v/PgPlxBfumZf/v4f717fu7i/dxCv/27//HlP/BivWRAv/GZv/59faEA/mscf/8+vmlCP16CfyMBf+1MvzHnv/BW/ZsBP/Fkf6ubf/Ytf+DFfulYvuzef26RP7n1fypZv///v/s3f7q2fqhWv/9/P57B//Sqv+zb/mAIf/fwv/69f/+/f+6ff7dwv6mWv2HIf6zLP/VsPvLqP+sYv/Oif2taf+fSfZ/JvigBvR4APicWPqpGf+LJP6/VPuWB//UpPmna//coP/frP/79/mvef7r3feNQPSMAf/juPy3gPhzCPeTSfyWQv+aQPyhL/7z6vmeDPvBl/qpbfusbviECf2qaPeiEvqmH/2pYv/AdP/o1f+uZ/6jNP+oWv+zXP/hx/zRsfuTHP7Xtf/Ylv/Lc//Ej//NoP/Ibf+/eft5DP58DPq4h/+9gv///yH5BAEAAH8ALAAAAAAXABAAAAf/gH9/PAkbgocAFRmHgkM4EYdVGgqQjBU+OIx/AG13kD0rLJWMO3pHNpo8RRshGUgqmn8NGkYCP7EJCjMafAiHMiFVO1F1YDEVHj2HcSxnTgYwIQ8PDjsreFp1JyNfPikadCFsBjojLX8efgFwawVUUxIdTwFuc2ZlkGoYNzWCHlsT0rzIY6fDiRcL0HwAwUAQkAn8EPVBIWZBiRJCmkAYYKWhoDdcbpxD5ILEgZMHlHyQ4lFQDi5BDDxglMCkiJtKBlywpEDHGQy+BFXJAUUEhwEcIGRhEubQjj0UZqAgc6iBl41YxnRZwoEAjUMqUFwJAUKAB0EOMCQhYuFPBjkEKZbc+lNFAIgQbikYOEvDRANNFkzAoKuAwiJBFlzs/IMqlg1lG1y0/RMIADs=',
"addbmspacer":	imP + 'R0lGODlhEwAQAOZrAP/+/f/8+vZrAPumZP/59f/7+P/JmP+SMf57B/x0APhuAPmAIf7r3fuiWvlvAP/69f/Gkvy0ef/BivqCIv727/+rYf/Ej/3ZvP/Ci/2qZ/dyDPdxCPqRPvumYv56CP/s3f6RMvytbPulYv58DP/t3f95AfqmZ/+JIP/9/Py8iv6nWv2NLvp+F/mIL/+EFvmKMv/hxv+aQPuxeP+uZ/VrBPqtcf/Sqv/GlPyqaP/69v+oWvhxB/uyef/Aiv/48//17f61ePxzAP/p1f/27/mrcf2QMf+MJv/27v7s3f57CP+LJPqpbf/Ytv/48vdtBP/9+/dsAPhyB/3Kov/79//59P/Wsv+CFP7n1f3YvPqILv/t3Pd4F//ewf3l0/+fSPyUPvt5DP/VsP/48f2pYv6vbfhzCP2HIf+IH/+mVv717f+wa////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGsALAAAAAATABAAAAengGtrDwYSgoeIYTZihwU3RVSIkjkzFk1rAEwuPpKdDxUYAUdeIZ2mBgcfECMXpp0wVjhKWVcorodPQisLHiKYt4hjGwgNaydnQUBVMSUJJGhGCV9rKjvEaw4KAjJSDlACDBPaHGs6UUkdwJJqZWYtXeqCWgcLGRpY8WtcYCZINEv5yDhhEKDGFgLqprAgEmDNkAEvEAIwVQDEAAqHfvBIcatHhDSCAgEAOw==',
"editbookmark": imP + 'R0lGODlhEAAQAOZ/AP/x5P7z6v7t3/SdBv/8+fq3hv/lzv/69P/cvP/17PiYUffYS/VuCfpzBfhuAfV5HfVqAffZhf/Fkfq8jvmqcf/7+f7p2PZ/KfV2Gf+3d/K/NvVqBPeuKP738fu+j//+/fZyEP/38f/Djv+cRfngqP/38PVzE/nplfbcb/+zb/isMf/Hlv+9hPXaZvTCSPTRYfnWZfeCKvXHWf+4efq6jPffefp+HP+gS/WcEfXTav/o0/jhiPbcaf+MJ/7IkvrbofVxEP/GkvXUJP/Qpv/TrPyrVfLMJf+uZvfQPPfhZvmwevz03P7v5P7m1P/Ytf7ox/PCQvadIvzJovLLQvjNTvnaafjWUvveqvjaU/G4Hf/XtO/DHP1+EPixNf2gUfu5XP+oW//jyv/kyvzln/2xcfZxEPdvBv+SMvqdMPSYFPafF/u9jPjUX/XMLf53Af+8f/qHKvnnifvqw/SeCv7q3P+JIP/u3/+fS/nWbPnfo/vuzP7uz//Il//LnP/o1P///yH5BAEAAH8ALAAAAAAQABAAAAfYgH+CgwRBd3aDiX8fJYs6TiIsBH8Jk4IJWnxhRAgAe24jK2deAoIARwB9Fno5UzVPEmNmTYNDGSdQUSBlaRpJHBSJGWIaGxMBARMbWW0xlwYpcg4TiR4OLQ5rATdvBi8gHYkhXBFVag82aFRbQOGDB3URC3MmAVIMRhAeiQg9KBAFLAiCg8dFAxEhDhiQ8IPNhURkvsSRUQTMDB9XlqhQMshPgwUckPDIQ2IHjC5CMAj8I0DBAwoXIGCxguMCBQYKSgkiwORPhQIDBtCo8IeOJUUsMTxwlygQADs=',
"del":			imP + 'R0lGODlhEAAQAPcAAAAAAJoIBZQ2LZ8xKZw+NqMDAa0NCaEVDqkfGbwFArsKB7oPCrIVC7IUDbgSDrcYEqslGq8iHb8kFrgkHKYvJKc1LLU+Lb4/MLBFM5hKQZVWT55gWaRMQqpZSaNjWrpgUqxyZqlyaqV9d8IHBcwEA80GBM8KBcMVDc8bD8YbEdQOD9MSCdURD9YREdUSEdYYEtQeFNkWE9oYEtgeFdkfFtwcFMElGtAjFd0gFt4jF90mFd4rHcIyIOAjF+ElGOEnGeIoGeIpGuIrG+AtG+MvG+QpGuQrGuUsGuYvGuYuG+MwHOcwGuc0HugxHOgyHek1Huo2H+w5H+Q1Iuk7I+w4IO46Ie89IfA/IshHKc9LK8JJOsVNO8tONsxIMdJCKeBHJelFJO1BI+9FJO5JMfBAIvFBI/FCI/NEJPFFJvRHJfdNJ/hNKPpSKfpTK8JcTclcRsxcSM1pVsN9dtB+cK6Jg7aQiM+ZktSViNWjmcOrp8S2s8W9u8i4tNanodqxqNqxqtqxrOC+udPFw9nS0NjT0t/c2+TKxebQyujSzuPd2+Pe3enV0O3e2+vj4ezl4+ro5+7o5+zr6+/t7fHk4fDs6/bt6vTt7PXu7fPy8fXy8fX19Pf29/n08vr29fr6+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjcAP8JHEjw3585dw4J9AMnDh5OBPucmNImyyVLXcagEfNmksBAC1asYYMFEiULUq6UMcNlEaIHJs6o+VJHIB8KOqpYueJlAokoacCA2DRwEAEUUKhUWYKETJgOkgo+2sBAyZOkVTAoKigwk4AAQ5o4YfKBq0A5BQwEMXIkCRE3lQraSTACR48bKYAUEaKF0UBACkjIqAHDg4YGOXz8uCDQkI0SLGK84CAJk4gDM3BIaNRpyw4WLVxUSDRQTwYIIf454kFDhYoIggpqKiTQE50BDhDkMVsw0h5CvAcGBAA7',
"bau": 			imP + 'R0lGODlhCgAQALMJAJyfokhLU5xmNlRXXl0xCnN2fMzNzX9LHY6RlP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAKABAAAAQwMMlJq73i4ENs7tV3cVdCludkAEiaGMWADAUyxUENGNKcI7ve4BeUDGsG3oSGUFIiADs=',
"ww":			imP + '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',
"pop":			imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAAYAAAAOCAYAAAAMn20lAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAOFJREFUKFNNUEELAWEQnc2WC32/wJbyAxxwdXGS8gfsyUH8Bcqd3OVAFDflorg6bHKU4m+QtNoY84avbE07vTfvvZmP6PeVyhVOJJOczRdYocP74c6CnYKD4YSbnbb2tI/umfF2wynP4zB6KoGegvDmYBJT7UGf07ksV31fCRe+IGyJqkij+bIIAHJJ5a6UKA3ZMIBaLdIcgg2mVXH5ElhdFQBhZ61UEYTXzP9xGKjVG0zn98vBmnZd/EVhKIiuDnJAri9n8+sNrU5HFxkyFZdeCbE21FtMjT1MborJ8+ER+QOubZgWE4PrQAAAAABJRU5ErkJggg==',
"search":		imPNG + 'iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAASxJREFUOE9jYBiaoHlTw//Qxf7/zWcaAenA/zuO7fy/89gOHpy+yViV9t94mh4GBolj1di0vuG/0WTd//mrcsGmg0wG0QVAvuFkHbgYio2B8wL+G03U/b/9yDawBhjYeWTHfwOgOEgew4mmfYb/9ft0MCWAKg36dP+D5DE0+c/0+6/bCXTGEYjTYGDbwW1gcf+Z/piaQO7Xbtf+n704B64RpCFrQdZ/rRYt7H7ymOj937bH/r9Wkw4GTp2X/n/HwR0WKM7z6vP5r1Wv89+63fZ/+eLK/34TA/7r1huA6foVjf93HdmNrsH3v2aNzn+bFgeQJNaAQLWhx/e/do3hf7t2l/97ju0lrMG/L/S/TpXRf/t21//7Tx4krAFk3eLty/47tXgAbdhPnAagHgBQL7l6a7VQzwAAAABJRU5ErkJggg==',
"vmkls":		imPNG + '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'
};


// =============================================================================
//  end ---- var fOR beyon.
// =============================================================================

switch (Xlang) {
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
// - The 03/02/2010 ------------- by Ptitfred06
// Modification : small word to have good view in tasklist
// - Small modification on word (translation).
// - comment what can be personnalise / and what can't 
// -----------------------------------------------------------------------
	case "fr": // thanks Tuga
// Texte détécté dans les page Travian (NE PAS CHANGER / No CHANGE !!!)
		aLangAllBuildWithId = ["Bûcheron", "Carrière de terre", "Mine de fer", "Ferme", "", "Scierie", "Usine de poteries", "Fonderie", "Moulin", "Boulangerie", "Dépôt de ressources", "Silo de céréales", "Armurerie", "Usine d'armures", "Place du tournoi", "Bâtiment principal", "Place de rassemblement", "Place du Marché", "Ambassade", "Caserne", "Écurie", "Atelier", "Académie", "Cachette", "Hôtel de ville", "Résidence", "Palais", "Chambre aux trésors", "Comptoir de commerce", "Grande Caserne", "Grande Écurie", "Mur d'enceinte", "Mur de terre", "Palissade", "Tailleur de Pierres", "Brasserie", "Fabricant de pièges","Manoir du héros", "Grand dépôt de ressources", "Grand silo de céréales", "Merveille du monde", "Abreuvoir"];
// a tester original 		aLangAllResInDorf1=["Bûcheron", "Carrière de Terre", "Mine de fer", "Ferme de céréales"]
		aLangAllResInDorf1=["Bois", "Terre", "Fer", "Cécé"]

// <-- Peu être modifié / can be personnalize
		aLangAddTaskText = ["Ajouter tache", "Type", "Village actif", "Cible", "Vers", "Mode", "Aide Const.", "Quantité de ress.", "Bouger vers le haut", "Bouger vers le bas", "Effacer", "&#160;&#160;&#160;Taches", "Bouger ", "Eliminer toutes les tâches"];
		aLangTaskKind = ["Évol ", "N Cons ", "Att ", "Rech ", "Entrai ", "Trans ", "NPC", "Dém ", "Fête"];
//  -->
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];

// <-- Peu être modifié / can be personnalize
		aLangGameText = ["Niv", "Marchands", "Id", "Capitale", "Temps début", "this timeseting is unuseful now.", "Vers", "Village", "Transport", "de", "Transport vers", "Transport de", "Retour de", "Ressources", "Bâtiment", "Construire un nouveau bâtiment", "Vide", "Niveau"];
// original 	aLangGameText = ["Niveau", "Marchands", "Identification", "Capitale", "Inicio", "this timeseting is unuseful now.", "Vers", "Village", "Transport", "de", "Transport vers", "Transport de", "Retour de", "Ressources", "Bâtiment", "Construire un nouveau bâtiment", "Vazio", "Niveau"];
// -->	fin	

		aLangRaceName = ["Romains", "Germains","Gaulois"];
// <-- Peu être modifié
		aLangTaskOfText = ["Planifier evolution", "Planifier nouvelle construction", "RessUpD", "OFF", "Comencer", "ON", "Arreter", "La distribution des champs de ce village est ", "AutoT", "Auto transport n est pas ouvert", "Ouvert", "Transport avec succès", "Taches", "Limit", "Defaut", "Modifier", "Bois/Terre/Fer", "Céréales", "Planification de demolition", "Planif.Attaque", "Type d´attaque", "Temps de voyage", "Repeter numero de fois", "Temps de intervales","00:00:00","Cible catapulte","Aléatoire", "Inconnu", " Fois", "/", " ", "Troupes envoyées", "Planification d´entrainement","Train ubication","Planification d´entrainement fini","TransP","Setup Interval Time of Reload","This is the interval of page reload ,\n default sont 20 minutes, Insérer nouveau temps:\n\n","Remain","Planifier fête","petite fête","grande fête","Set Interval of Ressources concentration","minutes",".",".","START","STOP","Planifier entrainement","Augmenter Attaque","Augmenter Defense"];
// -->> fin
// < ne pas change / no change !!! Detected for the feedback error.
		aLangErrorText = ["Pas assez de ressources", "Les ouvriers sont déjà au travail", "Construction complète", "Début de la construction", "Dans développement", "Son Dépôt de ressources est petit. Évolue son Dépôt de ressources pour continuer sa construction", "Son silo de céréales est petit. Évolue son Silo de céréales pour continuer sa construction", "Ressources suffisantes","Une fête est déjà organisée"];
// -->> fin
		aLangOtherText = ["Il remarque important", "Seulement les champs de ressources du capitale <br/>peuvent être élevés à niveau 20. Son capital <br/> n'est pas décelable. S'il vous plaît il visite son profil.", "Raccourci ici ^_^", "Installation conclue", "Annulé", "Initier les tâches", "Upgrade avec succès", "Exécuter avec succès", "Sa race est inconnue, et son type de troupe aussi. <br/>Il visite son profil pour déterminer la race.<br/>", "S'il vous plaît il visite sa Manoir du héros pour déterminer<br/>la vitesse et le type de héros."];
		allsourceString = "BûcheronCarrière de TerreMine de ferFerme de céréales"
		aLangResources=["Bois","Terre","Fer","Céréales"];
		allbuildString = "ScierieUsine de poteriesFonderieMoulinBoulangerieDépôt de ressourcesSilo de céréalesArmurerieUsine d'armuresPlace de tournoiBâtiment principalPlace de rassemblementPlace du MarchéAmbassadeCaserneEcurieAtelierAcadémieCachetteHôtel de villeRésidencePalaisChambre aux trésorsComptoir de commerceGrande CaserneGrande ÉcurieMur d'enceinteMur de terrePalissadeTailleur de PierresBrasserieFabricant de piègesManoir du hérosGrand dépôt de ressourcesGrand silo de céréalesMerveille du mondeAbreuvoir"
		aLangTroops[0] = ["Légionnaire", "Prétorien", "Impérian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Bélier", "Catapulte de feu", "Sénateur", "Colon", "Héros"];
		aLangTroops[1] = ["Combattant au gourdin", "Combattant à la lance", "Combattant à la hache", "Eclaireur", "Paladin", "Cavalier Teuton", "Bélier", "Catapulte", "Chef de tribu", "Colon", "Héros"];

// <-- NE PAS modifier // Utilisé dans plannification d'attaque, dans recherche de niveau suppèrieur / NO CHANGE !!
		aLangTroops[2] = ["Phalange", "Combattant à l'épée", "Eclaireur", "Eclair de Toutatis", "Cavalier druide", "Hédouin", "Bélier", "Catapulte de Guerre", "Chef", "Colon", "Héros"];
// original	aLangTroops[2] = ["Phalange", "Combattant à l'épée", "Eclaireur", "Eclair de Toutatis", "Cavalier druide", "Hédouin", "Bélier", "Catapulte de Guerre", "Chef", "Colon", "Héros"];

// <-- Peu être modifié // Label des taches / CAN BE CHANGE
// original	aLangAttackType = ["Assistance", "Attaque", "Pillage"];
		aLangAttackType = ["Ass.", "Att.", "Pill."];
// -->		
		break;
// -------------------------------------------------------------------------------------------------------------------------------

	case "cn":
		aLangAllBuildWithId = ["伐木场", "黏土矿", "铁矿场", "农场", "", "木材厂", "砖块厂", "铸造厂", "磨坊", "面包房", "仓库", "粮仓", "铁匠铺", "军械库", "竞技场", "村中心大楼", "集结点", "市场", "大使馆", "兵营", "马厩", "工场", "研发所", "山洞", "市政厅", "行宫", "皇宫", "宝库", "交易所", "大兵营", "大马厩", "罗马城墙", "日尔曼城墙", "高卢城墙", "石匠铺", "酿酒厂", "陷阱机", "英雄园", "大仓库", "大粮仓", "世界奇观", "饮马槽"];
		aLangAllResInDorf1=["伐木场", "黏土矿", "铁矿场", "农场"];
		aLangAddTaskText = ["添加任务", "任务类型", "所在村", "任务对象", "目标", "模式", "支援建设", "资源集中", "上移", "下移", "删除", "任务内容", "移动", "清除所有任务"];
		aLangTaskKind = ["升级", "新建", "攻击", "研发", "训练", "运输", "活动", "拆除", "定制运输"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["等级", "商人", "坑号", "主村", "执行时间", "此时间设置目前无效", "到", "村庄", "运送", "回来", "向", "来自于", "从", "资源", "建筑", "建造新的建筑", "空", "等级"];
		aLangRaceName = ["罗马人", "日尔曼人", "高卢人"];
		aLangTaskOfText = ["预定升级", "预定新建", "资源自动升级", "尚未开启", "马上开启", "已经开启", "点击关闭", "该村资源田分布", "自动运输", "自动运输尚未设定", "已设定", "运送成功", "任务列表", "资源输入限额", "默认", "更改", "木/泥/铁", "粮食", "预定拆除",
			"预定发兵", "攻击类型", "到达所需时间", "重复次数", "间隔时间", "00:00:00", "投石目标", "随机", "未知", "次", "月", "日", "部队已发出","预定训练","训练设施","训练任务已执行","定制运输","设定页面刷新间隔","页面刷新的间隔时间，是指隔多久执行一次页面的自动载入。\n此时间过短，会增加被系统侦测到的危险，过长则影响任务执行的效率。\n默认为20分钟，请输入新的时间间隔：\n\n","资源输出保留","预定活动","小型活动","大型活动","资源集中模式的运输间隔",
			"分钟","暂停中","开启中","开启","暂停","预定改良","改良攻击","改良防御"];
		aLangErrorText = ["资源不足", "已经有建筑在建造中", "建造完成", "将马上开始全部建造", "在开发中", "建造所需资源超过仓库容量上限,请先升级你的仓库", "建造所需资源超过粮仓容量上限,请先升级你的粮仓", "资源何时充足时间提示","粮食产量不足: 需要先建造一个农场","一个活动正在举行中"];
		aLangOtherText = ["重要提示", "只有主村的资源田可以升级到20，<br/>目前主村尚未识别，点击个人资料<br/>页面可以解决这一问题", "五星级传送门^_^", "已经设置完成", "已经取消", "开始执行任务", "升级成功", "已顺利执行", "种族尚未确认，兵种也就无法确定，<br/>请点击个人资料页面，以便侦测种族", "然后，请顺便访问英雄园，以便确认<br/>英雄的种类和速度。<br/>"];
		allsourceString = "伐木场黏土矿铁矿场农场";
		aLangResources=["木材","泥土","铁块","粮食"];
		allbuildString = "木材厂砖块厂铸造厂磨坊面包房仓库粮仓铁匠铺军械库竞技场中心大楼集结点市场大使馆兵营马厩工场研发所山洞市政厅行宫皇宫宝库交易所大兵营大马厩罗马城墙日尔曼城墙高卢城墙石匠铺酿酒厂陷阱机英雄园大仓库大粮仓世界奇观饮马槽";
		aLangTroops[0] = ["古罗马步兵", "禁卫兵", "帝国兵", "使节骑士", "帝国骑士", "将军骑士", "冲撞车", "火焰投石器", "参议员", "拓荒者", "英雄"];
		aLangTroops[1] = ["棍棒兵", "矛兵", "斧头兵", "侦察兵", "圣骑士", "日耳曼骑兵", "冲撞车", "投石器", "执政官", "拓荒者", "英雄"];
		aLangTroops[2] = ["方阵兵", "剑士", "探路者", "雷法师", "德鲁伊骑兵", "海顿圣骑士", "冲撞车", "投石器", "首领", "拓荒者", "英雄"];
		aLangAttackType = ["支援", "攻击", "抢夺"];
		break;
		
	case "hk": // 感谢sean3808
		aLangAllBuildWithId = ["伐木場", "泥坑", "鐵礦場", "農場","", "鋸木廠", "磚廠", "鋼鐵鑄造廠", "麵粉廠", "麵包店", "倉庫", "穀倉", "鐵匠", "盔甲廠", "競技場", "村莊大樓", "集結點", "市場", "大使館", "兵營", "馬棚", "工場", "研究院", "山洞", "村會堂", "行宮", "皇宮", "寶物庫", "交易所", "大兵營", "大馬棚", "城牆", "土牆", "木牆", "石匠鋪", "釀酒廠", "陷阱機", "英雄宅", "大倉庫", "大穀倉", "世界奇觀", "放牧水槽"];
		aLangAllResInDorf1=["伐木場", "泥坑", "鐵礦場", "農場"]
		aLangAddTaskText = ["添加任務", "任務類型", "所在村", "任務對象", "目標", "模式", "支援建設", "資源集中", "上移", "下移", "刪除", "任務內容", "移動", "清除所有任務"];
		aLangTaskKind = ["升級", "新建", "攻擊", "研發", "訓練", "運輸", "平倉", "拆除", "活動"];
		maxlevel = ["10", "10", "10", "10", "10", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["等級", "商人", "坑號", "主村", "執行時間", "該時間設置尚未啟用", "到", "村莊", "運送", "回來", "運輸到", "從", "由", "資源", "建築", "建造新的建築物", "empty", "等級"];
		aLangRaceName = ["羅馬人", "條頓人", "高盧人"];
		aLangTaskOfText = ["預定升級", "預定建築", "資源自動升級", "尚未開啟", "馬上開啟", "已經開啟", "點擊關閉", "該村資源分布", "自動運輸", "自動運輸尚未設定", "已設定", "運送成功", "任務列表", "資源輸入限額", "默認", "更改", "木/磚/鐵", "穀物", "預定拆除",
			"預定發兵", "攻擊類型", "到達所需時間", "重複次數", "間隔時間", "00:00:00", "投石目標", "隨機", "未知", "次", "月", "日", "部隊已發出","預定訓練","訓練設施","訓練任務已執行","定制運輸","設定頁面刷新間隔","頁面刷新的間隔時間，是指隔多久執行一次頁面的自動載入。\n此時間過短，會增加被系統偵測到的危險，過長則影響任務執行的效率。\n默認為20分鐘，請輸入新的時間間隔：\n\n","資源輸出保留","預定活動","小型活動","大型活動","資源集中模式的間隔時間",
			"分鐘","暫停中","開啟中","開啟","暫停","預定改良","改良攻擊","改良防御"];
		aLangErrorText = ["資源不足", "工作者已經在工作", "完全地開發", "將馬上開始全部建造", "在開發中", "倉庫需要升級", "糧倉需要升級", "資源何時充足時間提示","粮食产量不足: 需要先建造一个农场","派對進行中"];
		aLangOtherText = ["重要提示", "只有主村的資源田可以升級到20，<br/>目前主村尚未識別，點擊個人資料<br/>頁面可以解決這一問題", "五星級傳送門^_ ^", "已經設置完成", "已經取消", "開始執行任務", "升級成功", "已順利執行", "種族尚未確認，兵種也就無法確定，<br/>請點擊個人資料頁面，以便偵測種族", "然後，請順便訪問英雄園，以便確認<br/>英雄的種類和速度。<br/>"];
		allsourceString = "伐木場泥坑鐵礦場農場";
		aLangResources=["木材","磚塊","鋼鐵","穀物"];
		allbuildString = "鋸木廠磚廠鋼鐵鑄造廠麵粉廠麵包店倉庫穀倉鐵匠盔甲廠競技場村莊大樓集結點市場大使館兵營馬棚工場研究院山洞城鎮廳行宮皇宮寶物庫交易所大兵營大馬棚城牆土牆木牆石匠鋪釀酒廠陷阱機英雄宅大倉庫大穀倉世界奇觀放牧水槽";
		aLangTroops[0] = ["古羅馬步兵", "禁衛兵", "帝國兵", "使者騎士", "帝國騎士", "將軍騎士", "衝撞車", "火焰投石機", "參議員", "開拓者", "英雄"];
		aLangTroops[1] = ["棍棒兵", "矛兵", "斧頭兵", "偵察兵", "遊俠", "條頓騎士", "衝撞車", "投石車", "司令官", "開拓者", "英雄"];
		aLangTroops[2] = ["方陣兵", "劍士", "探路者", "雷法師", "德魯伊騎兵", "海頓聖騎", "衝撞車", "投石車", "族長", "開拓者", "英雄"];
		aLangAttackType = ["支援", "攻擊", "搶奪"];
		break;

	case "tw": // 感谢adobe、魎皇鬼、ieyp
		aLangAllBuildWithId = ["伐木場", "泥坑", "鐵礦場", "農場", "農田", "鋸木廠", "磚廠", "鋼鐵鑄造廠", "麵粉廠", "麵包店", "倉庫", "穀倉", "鐵匠", "盔甲廠", "競技場", "村莊大樓", "集結點", "市場", "大使館", "兵營", "馬廄", "工場", "研究院", "山洞", "村會堂", "行宮", "皇宮", "寶物庫", "交易所", "大兵營", "大馬廄", "城牆", "土牆", "木牆", "石匠舖", "釀酒廠", "陷阱機", "英雄宅", "大倉庫", "大穀倉", "世界奇觀", "放牧水槽"];
		aLangAllResInDorf1=["伐木場", "泥坑", "鐵礦場", "農場"]
		aLangAddTaskText = ["添加任務", "任務類型", "所在村", "任務對象", "目標", "模式", "支援建設", "資源集中", "上移", "下移", "刪除", "任務內容", "移動", "清除所有任務"];
		aLangTaskKind = ["升級", "新建", "攻擊", "研發", "訓練", "運輸", "平倉", "拆除", "活動"];
		maxlevel = ["10", "10", "10", "10", "10", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["等級", "商人", "坑號", "主村", "執行時間", "該時間設置尚未啟用", "到", "村莊", "運送", "回來", "運送到", "從", "由", "資源", "建築", "建造新的建築物", "empty", "等級"];
		aLangRaceName = ["羅馬人", "條頓人", "高盧人"];
		aLangTaskOfText = ["預定升級", "預定建築", "資源自動升級", "尚未開啟", "馬上開啟", "已經開啟", "點擊關閉", "該村資源分布", "自動運輸", "自動運輸尚未設定", "已設定", "運送成功", "任務列表", "資源輸入限額", "默認", "更改", "木/磚/鐵", "穀物", "預定拆除",
			"預定發兵", "攻擊類型", "到達所需時間", "重複次數", "間隔時間", "00:00:00", "投石目標", "隨機", "未知", "次", "月", "日", "部隊已發出","預定訓練","訓練設施","訓練任務已執行","定制運輸","設定頁面刷新間隔","頁面刷新的間隔時間，是指隔多久執行一次頁面的自動載入。\n此時間過短，會增加被系統偵測到的危險，過長則影響任務執行的效率。\n默認為20分鐘，請輸入新的時間間隔：\n\n","資源輸出保留","預定活動","小型活動","大型活動","資源集中模式的間隔時間",
			"分鐘","暫停中","開啟中","開啟","暫停","預定改良","改良攻擊","改良防御"];
		aLangErrorText = ["資源不足", "已經有建築在建造中", "建造完成", "將馬上開始全部建造", "在開發中", "建造所需資源超過倉庫容量上限,請先升級你的倉庫", "建造所需資源超過糧倉容量上限,請先升級你的糧倉", "資源何時充足時間提示","粮食产量不足: 需要先建造一个农场","派對進行中"];
		aLangOtherText = ["重要提示", "只有主村的資源田可以升級到20，<br/>目前主村尚未識別，點擊個人資料<br/>頁面可以解決這一問題", "五星級傳送門^_ ^", "已經設置完成", "已經取消", "開始執行任務", "升級成功", "已順利執行", "種族尚未確認，兵種也就無法確定，<br/>請點擊個人資料頁面，以便偵測種族", "然後，請順便訪問英雄園，以便確認<br/>英雄的種類和速度。<br/>"];
		allsourceString = "伐木場泥坑鐵礦場農場";
		aLangResources=["木材","磚塊","鋼鐵","穀物"];
		allbuildString = "鋸木廠磚廠鋼鐵鑄造廠麵粉廠麵包店倉庫穀倉鐵匠盔甲廠競技場村莊大樓集結點市場大使館兵營馬棚工場研究院山洞城鎮廳行宮皇宮寶物庫交易所大兵營大馬廄城牆土牆木牆石匠舖釀酒廠陷阱機英雄宅大倉庫大穀倉世界奇觀放牧水槽";
		aLangTroops[0] = ["古羅馬步兵", "禁衛兵", "帝國兵", "使者騎士", "帝國騎士", "將軍騎士", "衝撞車", "火焰投石機", "參議員", "開拓者", "英雄"];
		aLangTroops[1] = ["棍棒兵", "矛兵", "斧頭兵", "偵察兵", "遊俠", "條頓騎士", "衝撞車", "投石車", "司令官", "開拓者", "英雄"];
		aLangTroops[2] = ["方陣兵", "劍士", "探路者", "雷法師", "德魯伊騎兵", "海頓聖騎", "衝撞車", "投石車", "族長", "開拓者", "英雄"];
		aLangAttackType = ["支援", "攻擊", "搶奪"];
		break;

	case "fi": // thanks Christer82
		aLangAllBuildWithId = ["Puunhakkaaja", "Savimonttu", "Rautakaivos", "Viljapelto", "", "Saha", "Tiilitehdas", "Rautavalimo", "Mylly", "Leipomo", "Varasto", "Viljasiilo", "Aseseppä", "Haarniskapaja", "Turnausareena", "Päärakennus", "Kokoontumispiste", "Tori", "Lähetystö", "Kasarmi", "Talli", "Työpaja", "Akatemia", "Kätkö", "Kaupungintalo", "Virka-asunto", "Palatsi", "Aarrekammio", "Kauppavirasto", "Suuri kasarmi", "Suuri talli", "Kaupungin muuri", "Maamuuri", "Paaluaita", "Kivenhakkaaja", "Panimo", "Ansoittaja","Sankarin kartano", "Suuri varasto", "Suuri viljasiilo", "Maailmanihme", "Hevostenjuottoallas"];
		aLangAllResInDorf1=["Puunhakkaaja", "Savimonttu", "Rautakaivos", "Viljapelto"]
		aLangAddTaskText = ["Lisää tehtävä", "Tyyli", "Kohdistettu kylä", "Tehtävän kohde", "Minne:", "Tyyppi", "Rakennustuki", "Resurssien keskittäminen", "Siirry ylös", "Siirry alas", "Poista", "&#160;&#160;&#160;Tehtävän sisältö", "Siirry ", "Poista kaikki tehtävät"];
		aLangTaskKind = ["Päivitä", "Uusi rakennus", "Hyökkäys", "Tutkimus", "Koulutus", "Kuljetus", "NPC", "Hajotus", "Juhla"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Taso", "Kauppiaat", "ID", "Pääkaupunki", "Aloitusaika", "Tätä aika-asetusta ei voi nyt käyttää.", "minne:", "Kylä", "kuljetus", "mistä", "Kuljeta kylään", "Kuljeta kylästä", "Palaa kylästä", "Resurssit", "rakennus", "Rakenna uusi rakennus", "tyhjä", "taso"];
		aLangRaceName = ["Roomalaiset", "Teutonit", "Gallialaiset"];
		aLangTaskOfText = ["Aseta kentän päivitys", "Aseta uusi rakennuskohde", "Automaattinen resurssipäivitys", "Ei toimintaa", "Aloita", "Aloitettu", "Keskeytä", "Tämän kylän resurssikenttien jakauma on ", "Automaattikuljetus", "automaattikuljetusta ei ole avattu", "Avattu", "Kuljetus onnistui", "Tehtäväluettelo", "Trans_In_limit", "Perusasetus", "Muokkaa", "Puu/Savi/Rauta", "vilja", "Tehtävälistan poisto",
			"Schedule attack", "Hyökkäystyyppi", "Kuljetusaika", "toistokerrat", "Hyökkäysaikaväli","00:00:00","Katapultin kohde","Satunnainen", "Tuntematon", "kertaa", "Kuukausi", "Päivä", "Joukot on lähetetty","Aseta koulutustehtävä","Koulutuskohde","Koulutustehtävä suoritettu","waitForTranslate","setup Hyökkäysaikaväli of reload","this is the interval of page reload ,\n default is 20 minutes, please insert new time:\n\n","Trans_Out_Rmn","ScheduleParty","small party","big party","setInterval of Resources concentration",
			"minutes","pausing","running","run","pause","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Liian vähän resursseja", "Työntekijät ovat jo töissä.", "Rakennuskohde valmis", "Aloitetaan rakentaminen", "Työ kesken", "Varastosi on liian pieni. Suurenna varastoa aloittaaksesi rakentamisen", "Viljasiilosi on liian pieni. Suurenna viljasiiloa aloittaaksesi rakentamisen", "Riittävästi resursseja"];
		aLangOtherText = ["Tärkeä huomautus", "Vain pääkaupungin resurssikenttiä voidaan <br/>päivittää tasolle 20. Nyt pääkaupunkia<br/> ei voida todentaa. Päivitä profiiliasi, kiitos.", "Pikalinkki tähän ^_^", "Asennus valmis", "Peruttu", "Aloita tehtävät", "Päivitys valmis", "Tehty onnistuneesti", "Heimosi on määrittämätön, siksi joukkojesi tyyppiä <br/>Päivitä profiiliasi heimon määrittämiseksi.<br/>", "Käy Sankarin kartanossa määrittääksesi<br/> sankarisi tyypin ja nopeuden."];
		allsourceString = "PuunhakkaajaSavimonttuRautakaivosviljapelto"
		aLangResources=["waitTranslate","waitTranslate","waitTranslate","waitTranslate"];
		allbuildString = "SahaTiilitehdasRautavalimoMyllyLeipomoVarastoViljasiiloAseseppäHaarniskapajaTurnausareenaPäärakennusKokoontumispisteToriLähetystöKasarmiTalliTyöpajaAkatemiaKätköKaupungintaloVirka-asuntoPalatsiAarrekammioKauppavirastoSuuri kasarmiSuuri talliKaupungin muuriMaamuuriPaaluaitaKivenhakkaajaPanimoAnsoittajaSankarin kartanoSuuri varastoSuuri viljasiiloMaailmanihmeHevostenjuottoallas"
		aLangTroops[0] = ["Legioonalainen", "Pretoriaani", "Imperiaani", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Muurinmurtaja", "Tulikatapultti", "Senaattori", "Uudisasukas", "Sankari"];
		aLangTroops[1] = ["Nuijamies", "Keihäsmies", "Kirvessoturi", "Tiedustelija", "Paladiini", "Teutoniritari", "Muurinmurtaja", "Katapultti", "Päällikkö", "Uudisasukas", "Sankari"];
		aLangTroops[2] = ["Falangi", "Miekkasoturi", "Tunnustelija", "Teutateksen salama", "Druidiratsastaja", "Haeduaani", "Muurinmurtaja", "Heittokone", "Päällikkö", "Uudisasukas", "Sankari"];
		aLangAttackType = ["Vahvistus", "Hyökkäys", "Ryöstö"];
		break;

	case "us": // by shadowx360
		aLangAllBuildWithId = ["Woodcutter", "Clay Pit", "Iron Mine", "Wheat Field", "", "Sawmill", "Brickworks", "Iron Foundry", "Flour Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armory", "Tournament Square", "Main Building", "Rally Point", "Marketplace", "Embassy", "Barracks", "Stable", "Siege Workshop", "Academy", "Cranny", "Town Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason's Lodge", "Brewery", "Trapper","Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder Of The World", "Horse Drinking Pool"];
		aLangAllResInDorf1 = ["Woodcutter", "Clay Pit", "Iron Mine", "Wheat Field"];
		aLangAddTaskText = ["Add task", "Style", "Active village", "Task target", "To", "Mode", "Construction support", "Resources concentration", "Move up", "Move down", "Del", "   Task contents", "Move ", "Delete all the tasks"];
		aLangTaskKind = ["Upgrade", "NewBuild", "Attack", "Research", "Train", "Transport", "NPC", "Demolish", "Celebration"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Lvl", "Merchants", "ID", "Capital", "Start time", "this timeseting is notuseful now.", "to", "Village", "transport", "from", "Transport to", "Transport from", "Return from", "resources", "building", "Construct new building", "empty", "level"];
		aLangRaceName = ["Romans", "Teutons", "Gauls"];
		aLangTaskOfText = ["Schedule Upgrade", "Schedule NewBuild", "Auto ResUpD", "Not_run", "Start", "Started", "Suspend", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Task list", "Trans In limit", "Default", "Modify", "Wood/Clay/Iron", "Wheat", "Schedule demolition",
			"Schedule attack", "Attack type", "Travel time", "repeat times", "interval time","00:00:00","Catapult target","Random", "Unknown", "times", "Month", "Day", "Troops sent",
			"Schedule Train", "Train site", "TrainTask done", "customTransport", "setup interval time of reload","this is the interval of page reload ,\n default is 20 minutes, please insert new time:\n\n","Trans Out Rmn","ScheduleParty","small party","big party","setInterval of Resources concentration",
			"minutes", ".",".","START","STOP","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Too few resources.", "The workers are already at work.", "Construction completed", "Starting construction", "In development", "Your Warehouse is too small. Please upgrade your Warehouse to continue your construction", "Your Granary is too small. Please upgrade your Granary to continue your construction", "Enough resources","Lack of food: extend cropland first!","There is already a celebration going on"];
		aLangOtherText = ["Important note", "Only the resource fields of the capital can <br/>be upgraded to level 20. Now your capital<br/> is not detected. Visit your Profile please.", "Shortcut here ^_^", "Setup completed", "Cancelled", "Start the tasks", "Upgrade successfully", "Run successfully", "Your race is unknown, therefore your troop type. <br/>Visit your Profile to determine your race.<br/>", "Please also visit your Hero's Mansion to determine<br/> the speed and the type of your hero."];
		allsourceString = "WoodcutterClay PitIron MineWheat Field";
		aLangResources=["lumber","clay","iron","wheat"];
		allbuildString = "SawmillBrickworksIron FoundryFlour MillBakeryWarehouseGranaryBlacksmithArmoryTournament SquareMain BuildingRally PointMarketplaceEmbassyBarracksStableWorkshopAcademyCrannyTown HallResidencePalaceTreasuryTrade OfficeGreat BarracksGreat StableCity WallEarth WallPalisadeStonemason's LodgeBreweryTrapperHero's MansionGreat WarehouseGreat GranaryWonderHorse Drinking Pool";
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];
		aLangAttackType = ["Reinforce", "Attack", "Raid"];
		break;
	case "au":	
	case "uk":	
	case "in": 
	case "com": // thanks  ieyp
	default:
		aLangAllBuildWithId = ["Woodcutter", "Clay Pit", "Iron Mine", "Cropland", "", "Sawmill", "Brickyard", "Iron Foundry", "Grain Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armoury", "Tournament Square", "Main Building", "Rally point", "Marketplace", "Embassy", "Barracks", "Stable", "Workshop", "Academy", "Cranny", "Town Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason's Lodge", "Brewery", "Trapper","Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder Of The World", "Horse Drinking Pool"];
		aLangAllResInDorf1 = ["Woodcutter", "Clay Pit", "Iron Mine", "Cropland"];
		aLangAddTaskText = ["Add task", "Style", "Active village", "Task target", "To", "Mode", "Construction support", "Resources concentration", "Move up", "Move down", "Del", "&#160;&#160;&#160;Task contents", "Move ", "Delete all the tasks"];
		aLangTaskKind = ["Upgrade", "NewBuild", "Attack", "Research", "Train", "Transport", "NPC", "Demolish", "Celebration"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Lvl", "Merchants", "ID", "Capital", "Start time", "this timeseting is unuseful now.", "to", "Village", "transport", "from", "Transport to", "Transport from", "Return from", "resources", "building", "Construct new building", "empty", "level"];
		aLangRaceName = ["Romans", "Teutons", "Gauls"];
		aLangTaskOfText = ["Schedule Upgrade", "Schedule NewBuild", "Auto ResUpD", "Not_run", "Start", "Started", "Suspend", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Task list", "Trans In limit", "Default", "Modify", "Wood/Clay/Iron", "Crop", "Schedule demolition",
			"Schedule attack", "Attack type", "Travel time", "repeat times", "interval time","00:00:00","Catapult target","Random", "Unknown", "times", "Month", "Day", "Troops sent",
			"Schedule Train", "Train site", "TrainTask done", "customTransport", "setup interval time of reload","this is the interval of page reload ,\n default is 20 minutes, please insert new time:\n\n","Trans Out Rmn","ScheduleParty","small party","big party","setInterval of Resources concentration",
			"minutes", ".",".","START","STOP","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Too few resources.", "The workers are already at work.", "Construction completed", "Starting construction", "In development", "Your Warehouse is too small. Please upgrade your Warehouse to continue your construction", "Your Granary is too small. Please upgrade your Granary to continue your construction", "Enough resources","Lack of food: extend cropland first!","There is already a celebration going on"];
		aLangOtherText = ["Important note", "Only the resource fields of the capital can <br/>be upgraded to level 20. Now your capital<br/> is not detected. Visit your Profile please.", "Shortcut here ^_^", "Setup completed", "Cancelled", "Start the tasks", "Upgrade successfully", "Run successfully", "Your race is unknown, therefore your troop type. <br/>Visit your Profile to determine your race.<br/>", "Please also visit your Hero's Mansion to determine<br/> the speed and the type of your hero."];
		allsourceString = "WoodcutterClay PitIron MineCropland";
		aLangResources=["lumber","clay","iron","crop"];
		allbuildString = "SawmillBrickyardIron FoundryGrain MillBakeryWarehouseGranaryBlacksmithArmouryTournament SquareMain BuildingRallypointMarketplaceEmbassyBarracksStableWorkshopAcademyCrannyTown HallResidencePalaceTreasuryTrade OfficeGreat BarracksGreat StableCity WallEarth WallPalisadeStonemason's LodgeBreweryTrapperHero's MansionGreat WarehouseGreat GranaryWonderHorse Drinking Pool";
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];
		aLangAttackType = ["Reinforce", "Attack", "Raid"];
		break;

	case "pl": // partial translation by deFox
		aLangAllBuildWithId = ["Las", "Kopalnia gliny", "Kopalnia żelaza", "Pole zboża", "", "Tartak", "Cegielnia", "Huta stali", "Młyn", "Piekarnia", "Magazyn surowców", "Spichlerz", "Zbrojownia", "Kuźnia", "Plac turniejowy", "Główny budynek", "Miejsce zbiórki", "Rynek", "Ambasada", "Koszary", "Stable", "Workshop", "Academy", "Cranny", "Town Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason's Lodge", "Brewery", "Trapper","Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder Of The World", "Horse Drinking Pool"];
		aLangAllResInDorf1 = ["Las", "Kopalnia gliny", "Kopalnia żelaza", "Pole zboża"];
		aLangAddTaskText = ["Add task", "Style", "Active village", "Task target", "To", "Mode", "Construction support", "Resources concentration", "Move up", "Move down", "Del", "&#160;&#160;&#160;Task contents", "Move ", "Delete all the tasks"];
		aLangTaskKind = ["Upgrade", "NewBuild", "Attack", "Research", "Train", "Transport", "NPC", "Demolish", "Celebration"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Lvl", "Merchants", "ID", "Capital", "Start time", "this timeseting is unuseful now.", "to", "Village", "transport", "from", "Transport to", "Transport from", "Return from", "resources", "building", "Construct new building", "empty", "level"];
		aLangRaceName = ["Rzymianie", "Germanie", "Galowie"];
		aLangTaskOfText = ["Zaplanuj Upgrade", "Zaplanuj Budowę", "Auto ResUpD", "Not_run", "Start", "Started", "Suspend", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Lista zadań", "Trans In limit", "Domyśl.", "Zmień", "Drewno/Glina/Żelazo", "Zboże", "Schedule demolition",
			"Zaplanuj atak", "Typ Ataku", "Czas podróży", "repeat times", "odstęp czasu", "00:00:00","Cel dla katapult", "Losowy", "Nieznany", "times", "Mies.", "Dzień", "Troops sent",
			"Zaplanuj szkolenie", "Train site", "TrainTask done", "customTransport", "setup interval time of reload","this is the interval of page reload,\n default is 20 minutes, please insert new time:\n\n","Trans Out Rmn","ScheduleParty","small party","big party","setInterval of Resources concentration",
			"minut", ".",".","START","STOP","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Zbyt mało surowców.", "The workers are already at work.", "Construction completed", "Starting construction", "In development", "Your Warehouse is too small. Please upgrade your Warehouse to continue your construction", "Your Granary is too small. Please upgrade your Granary to continue your construction", "Enough resources","Lack of food: extend cropland first!","There is already a celebration going on"];
		aLangOtherText = ["Ważna wiadomość", "Tylko w stolicy można rozbudować teren do poz. 20.<br/>Aktywna wioska nie została rozpoznana jako stolica.<br/>Wejdź w Ustawienia by wywołać aktualizację.", "Szybki link ^_^", "Setup completed", "Cancelled", "Start the tasks", "Upgrade successfully", "Run successfully", "Nie udało się określić twojej rasy, stąd typy jednostek<br/>nie są znane. Wejdź w Ustawienia by skrypt wykrył twoją rasę.<br/>", "Please also visit your Hero's Mansion to determine<br/> the speed and the type of your hero."];
		allsourceString = "LasKopalnia glinyKopalnia żelazaPole zboża";
		aLangResources = ["drewno", "glina", "żelazo", "zboże"];
		allbuildString = "SawmillBrickyardIron FoundryGrain MillBakeryWarehouseGranaryBlacksmithArmouryTournament SquareMain BuildingRallypointMarketplaceEmbassyBarracksStableWorkshopAcademyCrannyTown HallResidencePalaceTreasuryTrade OfficeGreat BarracksGreat StableCity WallEarth WallPalisadeStonemason's LodgeBreweryTrapperHero's MansionGreat WarehouseGreat GranaryWonderHorse Drinking Pool"
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];
		aLangTroops[2] = ["Falanga", "Miecznik", "Tropiciel", "Grom Teutatesa", "Jeździec druidzki", "Haeduan", "Taran", "Trebusz", "Herszt", "Osadnicy", "Bohater"];
		aLangAttackType = ["Posiłki", "Atak normalny", "Grabież"];
		break;

	case "ua":
		aLangAllBuildWithId = ["Лісоповал", "Глиняний кар'єр", "Залізна копальня", "Ферма", "", "Деревообробний завод", "Цегляний завод", "Чавуноливарний завод", "Млин", "Пекарня", "Склад", "Зернова комора", "Кузня зброї", "Кузня обладунків", "Арена", "Головна будівля", "Пункт збору", "Ринок", "Посольство", "Казарма", "Стайня", "Майстерня", "Академія", "Схованка", "Ратуша", "Резиденція", "Палац", "Скарбниця", "Торгова палата", "Велика казарма", "Велика стайня", "Міська стіна", "Земляний вал", " Огорожа", "Каменяр", "Пивна", "Капканщик","Таверна", "Великий склад", "Велика Зернова комора", "Чудо світу", "Водопій"];
		aLangAllResInDorf1=["Лісоповал", "Глиняний кар'єр", "Залізна копальня", "Ферма"]
		aLangAddTaskText = ["Додати завдання", "Спосіб", "Активне поселення", "Ціль завдання", "| Ціль", "Тип", "Підтримка будівництва", "Концентрація ресурсів", "Вверх", "Вниз", "", "", "", "Видалити усі завдання"];
		aLangTaskKind = ["Покращити:", "Нове завдання:", "Атакувати:", "Розвідати:", " наняти:", "Відправити ресурси:", "NPC:", "Зруйнувати:", "Урочистість:"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = [" Рівень ", "Торговці", "ID", "Столиця", "Час початку", "(тимчасово не працює)", "в", "Поселення", "Транспортування", "з", "Транспортування в", "Транспортування из", "Повернення з", "ресурси", "будівля", "Побудувати нову будівлю", "пусто", "рівень"];
		aLangRaceName = ["Римляни", "Тевтонці", "Галли"];
		aLangTaskOfText = ["Запланувати удосконалення", "Запланувати нове завдання", "Качати реурси", "Викл", "Старт", "Вкл", "стоп", "Розполілення полів в поселенні: ", "Автовідправлення", "Автовідправлення викл.", "Вкл.", "Успішно відправленно", "* Задачі *", "Обмеження ввозу", "Ні", "Змінити ", "Дерево/Глина/Залізо", "Зерно", "Запланувати зруйнування",
			"Запланувати атаку", "Тип атаки", "Час в дорозі", "повтори", "проміжок","00:00:00","Ціль катов","Випадково", "Невідомо", " раз", "/", " :дата/час: ", "Війска",
			"Запланувати найм","Train site","Навчання військ завершено","цілеве відправлення","Інтервал оновлення","Це інтервал оновлення сторінки ,\n по замовчуванню - 20 хвилин, Введіть новоий час:\n\n","Обмеження вивозу","Запланувати святкування","Малий праздник","Великий праздник","Встановлення інтервала концентрації ресурсів",
			"хвилини","зупинено","працює","старт","пауза","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Недостатньо сировини", "Всі будівельники зараз зайняті", "Це завдання зупинено повністю", "Починаю будівництво", "Процес розвитку", "Недостатня місткість складу", "Недостатня місткість Зернової комори", "Достатньо ресурсів","","Проводится урочистість"];
		aLangOtherText = ["Важливі замітки", "Тільки в столиці поля можуть бути до рівня 20. Столиця не визначена.Зайдіть в профіль будьласка", "Ссилка тут ^_^", "Настройка завершена", "Відмінено", "Почати завдання", "Удосконалення пройшло успішно", "Успішно", "Ваш народ невизначений.Будьласка зайдіть в профіль.", "Також будьласка зайдіть в таверну для визначення типу та скорості героя"];
		allsourceString = "ЛісоповалГлиняний кар'єрЗалізна копальняФерма"
		aLangResources=["Деревина","Глина","Залізо","Зерно"];
		allbuildString = "Деревообробний заводЦегляний заводЧавуноливарний заводМлинПекарняСкладЗернова комораКузня зброїКузня обладунківАренаГоловна будівляПункт зборуРинокПосольствоКазармаСтайняМайстерняАкадеміяСхованкаРатушаРезиденціяПалацСкарбницяТоргова палатаВелика казармаВелика стайняМіська стінаЗемляний валОгорожаКаменярПивнаКапканщикТавернаВеликий складВелика Зернова комораЧудо світуВодопій"
		aLangTroops[0] = ["Легіонер", "Преторіанець", "Імперіанець", "Кінний розвідник", "Кіннота імператора", "Кіннота Цезаря", "Таран", "Вогняна катапульта", "Сенатор", "Поселенець", "Герой"];
		aLangTroops[1] = ["Дубинник", "Списник", "Сокирник", "Скаут", "Паладин", "Тевтонський вершник", "Стінобитне знаряддя", "Катапульта", "Ватажок", "Поселенець", "Герой"];
		aLangTroops[2] = ["Фаланга", "Мечник", "Слідопит", "Тевтацький грім", "Друїд-вершник", "Едуйська кіннота", "Таран", "Катапульта", "Лідер", "Поселенець", "Герой"];
		aLangAttackType = ["Підкріплення", "Напад", "Набіг"];
		break;

	case "tr": // by karambol update the 27 Mar 2010 by SARLAK
    aLangAllBuildWithId = ["Oduncu", "Tuğla Ocağı", "Demir Madeni", "Tarla", "", "Kereste Fabrikası", "Tuğla Fırını", "Demir Dökümhanesi", "Değirmen", "Ekmek Fırını", "Hammadde deposu", "Tahıl Ambarı", "Silah Dökümhanesi", "Zırh Dökümhanesi", "Turnuva Yeri", "Merkez Binası", "Askeri Üs", "Pazar Yeri", "Elçilik", "Kışla", "Ahır", "Tamirhane", "Akademi", "Sığınak", "Belediye", "Köşk", "Saray", "Hazine", "Ticari Merkez", "Büyük Kışla", "Büyük Ahır", "Sur", "Toprak Siper", "Çit", "Taşçı", "İçecek Fabrikası", "Tuzakçı","Kahraman Kışlası", "Büyük Hammadde deposu", "Büyük Tahıl Ambarı", "Dünya Harikası", "Yalak"];  
    aLangAllResInDorf1=["Oduncu", "Tuğla Ocağı", "Demir Madeni", "Tarla"];  
    aLangAddTaskText = ["Görev Ekle", "Stil", "Aktif Köy", "Görev Hedefi", "Hedef", "Türü", "İnşaat Desteği", "Hammadde karışımı", "Yukarı Taşı", "Aşağı Taşı", "Sil", "Görev İçeriği", "Sırala", "Tüm görevleri sil"];  
    aLangTaskKind = ["Geliştirilen Bina :", "Yeni Bina :", "Hücum", "Araştır", "Yetiştir", "Gönder", "NPC", "Yıkılan Bina :", "Festival"];  
    maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];  
    aLangGameText = ["Seviye ", "Tüccar", "ID", "Başkent", "Başlangıç zamanı", "Değiştirilemez.", "buraya", "Aktif Köy", "gönder", "buradan", "Gönderiliyor", "Gönderildi", "Dönüş", "hammadde", "bina", "Yeni bina kur", "boş", "Seviye "];  
    aLangRaceName = ["Romalılar", "Cermenler", "Galyalılar"];  
    aLangTaskOfText = ["Geliştirme Zamanla", "Yeni Bina Kurulumu", "Otomatik hammadde güncelle", "Çalışmıyor", "Başlat", "Çalışıyor", "Durdur", "Bu köyün kaynak alanları dağılımıdır ", "Otomatik Gönderme", "Otomatik gönderme açılmadı", "Açıldı", "Gönderme Tamamladı", "", "Gönderme limiti", "Varsayılan", "Değiştir", "Odun/Tuğla/Demir", "Tahıl", "Yıkımı zamanla",  
        "Hücum zamanla", "Hücum Şekli", "Varış zamanı", "Tekrar Sayısı", "Tekrar Aralığı","00:00:00","Mancınık hedef","Rastgele", "Bilinmeyen", "kere", "Ay", "Gün", "Asker gönder", "Asker Yetiştir","Yetiştirilme Noktası","Eğitim görevi tamamlandı","Hammadde Gönderimi Zamanla","Gerçekleşmeyen Kurulumu Tekrarlama Süresi","Tekrar deneme süresini giriniz.\n(Varsayılan Değer: 20 Dakika)","Trans Out Rmn","Festivalzamanla","Küçük festival","Büyük festival","Hammadde Toplama Aralığı",  
        "dakikalar","Pasif","Aktif","Aktif Et","Pasif Et","Asker Gelişimi Zamanla","Silah Gelişimi","Zırh Gelişimi","saati"];  
    aLangErrorText = ["Çok az kaynak.", "Işçi zaten iş başında.", "İnşaat tamamlandı", "İnşaat başlatılıyor", "Araştırma yapılıyor", "İnşaata Hammadde deposunu geliştirip devam ediniz.", "İnşaata Tahıl ambarını geliştirip devam ediniz.", "Yeterli hammadde","Kaynak eksikliği: önce Tarlanı geliştir!","Şu anda bir festival yapılıyor zaten"];  
    aLangOtherText = ["Önemli not", "Sadece başkent için hammadde üretebilirsiniz <br/>be Güncellendi seviye 20. Şimdi Başkentin<br/> tesbit edilemedi. Profilinizi ziyaret ediniz.", "Buraya kısa yol ^_^", "Kurulum tamamlandı", "Vazgeçildi", "Görevleri başlat", "Güncelleme tamamlandı", "Çalışma tamam", "Irkınız bilinmediğinden asker türünüz belilenemedi <br/>Profilinizi ziyaret edip ırkınızı belirleyin<br/>", "Ayrıca kahraman kışlasınıda ziyaret edin<br/> Kahramanınızın hızı ve tipi."];  
    allsourceString = "OrmanTuğla OcağıDemir MadeniTarla";  
    aLangResources=["Odun","Tuğla","Demir","Tahıl"];  
    allbuildString = "Kereste FabrikasıTuğla FırınıDemir DökümhanesiDeğirmenEkmek FırınıHammadde deposuTahıl AmbarıSilah DökümhanesiZırh DökümhanesiTurnuva YeriMerkez BinasıAskeri ÜsPazar YeriElçilikKışlaAhırTamirhaneAkademiSığınakBelediyeKöşkSarayHazineTicari MerkezBüyük KışlaBüyük AhırSurToprak SiperPalisadeTaşçıİçecek FabrikasıTuzakçıKahraman KışlasıBüyük Hammadde deposuBüyük Tahıl AmbarıDünya HarikasıYalak"  
    aLangTroops[0] = ["Lejyoner", "Pretoryan", "Emperyan", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Koçbaşı", "Ateş Mancınığı", "Senatör", "Göçmen", "Kahraman"];  
    aLangTroops[1] = ["Tokmak Sallayan", "Mızrakçı", "Balta Sallayan", "Casus", "Paladin", "Toyton", "Koçbaşı", "Mancınık", "Reis", "Göçmen", "Kahraman"];  
    aLangTroops[2] = ["Phalanx", "Kılıçlı", "Casus", "Toytatın Şimşeği", "Druyid", "Heduan", "Koçbaşı", "Mancınık", "Kabile Reisi", "Göçmen", "Kahraman"];  
    aLangAttackType = ["Destek", "Saldırı: Normal", "Saldırı: Yağma"];  
    break;
		
	case "br":
		aLangAllBuildWithId = ["Bosque", "Poço de Barro", "Mina de Ferro", "Campo de Cereais", "", "Serraria", "Alvenaria", "Fundição", "Moinho", "Padaria", "Armazém", "Celeiro", "Ferreiro", "Fábrica de Armaduras", "Praça de torneios", "Edifício principal", "Ponto de reunião militar", "Mercado", "Embaixada", "Quartel", "Cavalaria", "Oficina", "Academia", "Esconderijo", "Casa do Povo", "Residência", "Palácio", "Tesouraria", "Companhia do Comércio", "Grande Quartel", "Grande Cavalaria", "Muralha", "Barreira", "Paliçada", "Pedreiro", "Cervejaria", "Fábrica de Armadilhas","Mansão do Herói", "Grande armazém", "Grande Celeiro", "Maravilha do Mundo", "Bebedouro para cavalos"];
		aLangAllResInDorf1=["Bosque", "Poço de Barro", "Mina de Ferro", "Campo de Cereal"]
		aLangAddTaskText = ["Adicionar tarefa", "Estilo", "Aldeia Activa", "Alvo", "Para", "Modo", "Ajuda na Construção", "Quantidade de recursos", "Mover para cima", "Mover para baixo", "Apagar", "&#160;&#160;&#160;Tarefas", "Mover ", "Eliminar todas as tarefas"];
		aLangTaskKind = ["Evolução", "Novo construção", "Ataque", "Pesquisa", "Treino", "Transporte", "NPC", "Demolição", "Celebração"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Lvl", "Mercadores", "Identificação", "Capital", "Inicio", "this timeseting is unuseful now.", "Para", "Aldeia", "Transporte", "de", "Transporte para", "Transporte de", "A regressar de", "Recursos", "Edificio", "Construir novo edifício", "Vazio", "Nivel"];
		aLangRaceName = ["Romanos", "Teutões", "Gauleses"];
		aLangTaskOfText = ["Agendar Evolução", "Agendar nova construção", "ResourcesUpD", "OFF", "Iniciar", "ON", "Parar", "A distribuição dos campos desta aldeia é ", "Autotransporte", "Autotransporte não está aberto", "Aberto", "Transporte com sucesso", "Lista de agendamento", "Limit", "Default", "Alterar", "madeira/barro/ferro", "cereal", "Agendamento de demolição",
			"Agendamento de ataque", "Tipo de ataque", "Tempo de viagem", "Repetir número de vezes", "Tempo de intervalo","00:00:00","Alvo catapulta","Aleatório", "Desconhecido", "Vezes", " Mês", " Dia", "Tropas enviadas",
			"Agendamento de treino","localização de tropas","Agendamento de treino feito","Transporte personalizado","Setup Interval Time of Reload","This is the interval of page reload ,\n default são 20 minutos, Insira novo tempo:\n\n","Remain","Agendar Celebração","pequena celebração","grande celebração","Set Interval of Resources concentration",
			"minutos","parado","ligado","ligar","parar","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Poucos recursos.", "Os trabalhadores já estão a trabalhar.", "Construção completa", "Inicio da construção", "Em desenvolvimento", "Seu Armazém é pequeno. Evolua o seu armazém para continuar a sua construção", "Seu Celeiro é pequeno. Evolua o seu Celeiro para continuar a sua construção", "Recursos suficientes","Já se encontra uma celebração em curso"];
		aLangOtherText = ["Nota importante", "Apenas os campos de recursos da capital <br/>podem ser elevados a nivel 20 . A sua capital <br/> nao está detectavel. Por favor visite o seu perfil.", "Atalho aqui ^_^", "Instalação concluída", "Cancelado", "Iniciar as tarefas", "Upgrade com sucesso", "Executar com sucesso", "Sua raça é desconhecida, e o seu tipo de tropa também. <br/>Visite o seu perfil para determinar as raça.<br/>", "Por favor visite a sua mansão do heroi para determinar<br/> a velocidade e o tipo de heroi."];
		allsourceString = "BosquePoço de BarroMina de FerroCampo de Cereais"
		aLangResources=["Madeira","Barro","Ferro","Cereais"];
		allbuildString = "SerrariaAlvenariaFundiçãoMoinhoPadariaArmazémCeleiroFerreiroFábrica de ArmadurasPraça de torneiosEdifício principalPonto de reunião militarMercadoEmbaixadaQuartelCavalariaOficinaAcademiaEsconderijoCasa do PovoResidênciaPalácioTesourariaCompanhia do ComércioGrande QuartelGrande CavalariaMuralhaBarreiraPaliçadaPedreiroCervejariaFábrica de ArmadilhasMansão do HeróiGrande ArmazémGrande CeleiroMaravilha do MundoBebedouro para cavalos"
		aLangTroops[0] = ["Legionário", "Pretoriano", "Imperiano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Aríete", "Catapulta de Fogo", "Senador", "Colonizador", "Heroi"];
		aLangTroops[1] = ["Salteador", "Lanceiro", "Bárbaro", "Espião", "Paladino", "Cavaleiro Teutão", "Aríete", "Catapulta", "Chefe", "Colonizador", "Heroi"];
		aLangTroops[2] = ["Falange", "Espadachim", "Batedor", "Trovão Theutate", "Cavaleiro Druida", "Haeduano", "Aríete", "Trabuquete", "Chefe de Clã", "Colonizador", "Heroi"];
		aLangAttackType = ["Reforço", "Ataque", "Assalto"];
		break;

           
       case "pt": // thanks RASCO and Tuga
		aLangAllBuildWithId = ["Bosque", "Poço de Barro", "Mina de Ferro", "Campo de Cereais", "", "Serração", "Alvenaria", "Fundição", "Moinho", "Padaria", "Armazém", "Celeiro", "Ferreiro", "Fábrica de Armaduras", "Praça de torneios", "Edifício principal", "Ponto de reunião militar", "Mercado", "Embaixada", "Quartel", "Cavalariça", "Oficina ", "Academia", "Esconderijo", "Casa do Povo", "Residência", "Palácio", "Tesouraria", "Companhia do Comércio", "Grande Quartel", "Grande Cavalariça", "Muralha", "Barreira", "Paliçada", "Pedreiro", "Cervejaria", "Fábrica de Armadilhas","Mansão do Herói", "Grande armazém", "Grande Celeiro", "Maravilha do Mundo", "Bebedouro para cavalos"];
		aLangAllResInDorf1=["Bosque", "Poço de barro", "Mina de ferro", "Campo de cereais"]
		aLangAddTaskText = ["Adicionar tarefa", "Estilo", "Aldeia Activa", "Alvo", "Para", "Modo", "Ajuda na Construção", "Quantidade de recursos", "Mover para cima", "Mover para baixo", "Apagar", "&#160;&#160;&#160;Tarefas", "Mover ", "Eliminar todas as tarefas"];
		aLangTaskKind = ["Evolução", "Novo construção", "Ataque", "Pesquisa", "Treino", "Transporte", "NPC", "Demolição", "Celebração"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Lvl", "Mercadores", "Identificação", "Capital", "Inicio", "this timeseting is unuseful now.", "Para", "Aldeia", "Transporte", "de", "Transporte para", "Transporte de", "A regressar de", "Recursos", "Edificio", "Construir novo edifício", "Vazio", "Nivel"];
		aLangRaceName = ["Romanos", "Teutões", "Gauleses"];
		aLangTaskOfText = ["Agendar Evolução", "Agendar nova construção", "ResourcesUpD", "OFF", "Iniciar", "ON", "Parar", "A distribuição dos campos desta aldeia é ", "Autotransporte", "Autotransporte não está aberto", "Aberto", "Transporte com sucesso", "Lista de agendamento", "Limit", "Default", "Alterar", "madeira/barro/ferro", "cereal", "Agendamento de demolição",
			"Agendamento de ataque", "Tipo de ataque", "Tempo de viagem", "Repetir número de vezes", "Tempo de intervalo","00:00:00","Alvo catapulta","Aleatório", "Desconhecido", "Vezes", " Mês", " Dia", "Tropas enviadas", "Agendamento de treino","localização de tropas","Agendamento de treino feito","Transporte personalizado","Setup Interval Time of Reload","This is the interval of page reload ,\n default são 20 minutos, Insira novo tempo:\n\n","Remain","Agendar Celebração","pequena celebração","grande celebração","Set Interval of Resources concentration","minutos",".",".","START","STOP","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Poucos recursos.", "Os trabalhadores já estão a trabalhar.", "Construção completa", "Inicio da construção", "Em desenvolvimento", "Seu Armazém é pequeno. Evolua o seu armazém para continuar a sua construção", "Seu Celeiro é pequeno. Evolua o seu Celeiro para continuar a sua construção", "Recursos suficientes","Já se encontra uma celebração em curso"];
		aLangOtherText = ["Nota importante", "Apenas os campos de recursos da capital <br/>podem ser elevados a nivel 20 . A sua capital <br/> nao está detectavel. Por favor visite o seu perfil.", "Atalho aqui ^_^", "Instalação concluída", "Cancelado", "Iniciar as tarefas", "Upgrade com sucesso", "Executar com sucesso", "Sua raça é desconhecida, e o seu tipo de tropa também. <br/>Visite o seu perfil para determinar as raça.<br/>", "Por favor visite a sua mansão do heroi para determinar<br/> a velocidade e o tipo de heroi."];
		allsourceString = "BosquePoço de BarroMina de FerroCampo de Cereais"
		aLangResources = ["Madeira","Barro","Ferro","Cereais"];
		allbuildString = "SerraçãoAlvenariaFundiçãoMoinhoPadariaArmazémCeleiroFerreiroFábrica de ArmadurasPraça de torneiosEdifício principalPonto de reunião militarMercadoEmbaixadaQuartelCavalariçaOficinaAcademiaEsconderijoCasa do PovoResidênciaPalácioTesourariaCompanhia do ComércioGrande QuartelGrande CavalariçaMuralhaBarreiraPaliçadaPedreiroCervejariaFábrica de ArmadilhasMansão do HeróiGrande ArmazémGrande CeleiroMaravilha do MundoBebedouro para cavalos"
		aLangTroops[0] = ["Legionário", "Pretoriano", "Imperiano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Aríete", "Catapulta de Fogo", "Senador", "Colonizador", "Heroi"];
		aLangTroops[1] = ["Salteador", "Lanceiro", "Bárbaro", "Espião", "Paladino", "Cavaleiro Teutão", "Aríete", "Catapulta", "Chefe", "Colonizador", "Heroi"];
		aLangTroops[2] = ["Falange", "Espadachim", "Batedor", "Trovão Theutate", "Cavaleiro Druida", "Haeduano", "Aríete", "Trabuquete", "Chefe de Clã", "Colonizador", "Heroi"];
		aLangAttackType = ["Reforço", "Ataque", "Assalto"];
		break;
        
                case "my":
		aLangAllBuildWithId = ["Kawasan Pembalakan", "Kuari Tanat Liat", "Lombong Bijih Besi", "Ladang", "", "Kilang Papan", "Kilang Bata", "Faundri Besi", "Pengisar Bijian", "Kilang Roti", "Gudang", "Jelapang", "Kedai Senjata", "Kedai Perisai", "Gelanggang Latihan", "Bangunan Utama", "Titik Perhimpunan", "Pasar", "Kedutaan", "Berek", "Kandang Kuda", "Bengkel", "Akademi", "Gua", "Dewan Perbandaran", "Residen", "Istana", "Perbendaharaan", "Pejabat Dagangan", "Berek Besar", "Kandang Kuda Besar", "Tembok Bandar", "Tembok Tanah", "Pagar Kubu", "Kedai Tukang Batu", "Kilang Bir", "Pemerangkap","Rumah Agam Wira", "Gudang Besar", "Jelapang Besar", "Dunia Keajaiban", "Palung Kuda"];
		aLangAllResInDorf1=["Kawasan Pembalakan", "Kuari Tanat Liat", "Lombong Bijih Besi", "Ladang"]
		aLangAddTaskText = ["Add task", "Style", "Active village", "Task target", "To", "Mode", "Construction support", "Resources concentration", "Move up", "Move down", "Del", "   Task contents", "Move ", "Delete all the tasks"];
		aLangTaskKind = ["Tingkatkan", "Bina bangunan", "Serang", "Selidik", "latih", "Angkut", "NPC", "musnah", "Perayaan"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Tahap", "Pedagang", "ID", "Ibu Kota", "Waktu mula", "this timeseting is unuseful now.", "ke", "Kampung", "angkut", "dari", "Angkut ke", "Angkut dari", "Balik dari", "sumber", "bangunan", "Bina bangunan", "Kosong", "tahap"];
		aLangRaceName = ["Rom", "Teuton", "Gaul"];
		aLangTaskOfText = ["Schedule Upgrade", "Schedule NewBuild", "AutoResUpD", "Not_run", "Start", "Started", "Suspend", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Task list", "Trans_In_limit", "Default", "Modify", "Wood/Clay/Iron", "Crop", "Schedule demolition", "Schedule attack", "Attack type", "Travel time", "repeat times", "interval time","00:00:00","Catapult target","Random", "Unknown", "times", "Month", "Day", "Troops sent", "Schedule Train","Train site","TrainTask done","customTransport","setup interval time of reload","this is the interval of page reload ,\n default is 20 minutes, please insert new time:\n\n","Trans_Out_Rmn","ScheduleParty","small party","big party","setInterval of Resources concentration","minutes",".",".","START","STOP"];
		aLangErrorText = ["Terlalu sedikit sumber", "Para pekerja sedang bekerja", "Construction completed", "Starting construction", "In development", "Your Warehouse is too small. Please upgrade your Warehouse to continue your construction", "Your Granary is too small. Please upgrade your Granary to continue your construction", "Enough resources","Lack of food: extend cropland first!","There is already a celebration going on"];
		aLangOtherText = ["Important note", "Only the resource fields of the capital can be upgraded to level 20. Now your capital is not detected. Visit your Profile please.", "Shortcut here ^_^", "Setup completed", "Cancelled", "Start the tasks", "Upgrade successfully", "Run successfully", "Your race is unknown, therefore your troop type. Visit your Profile to determine your race.", "Please also visit your Hero's Mansion to determine the speed and the type of your hero."];
		allsourceString = "Kawasan PembalakanKuari Tanah LiatLombong Bijih BesiLadang";
		aLangResources=["kayu","tanah liat","besi","tanaman"];
		allbuildString = "Kilang PapanKilang BataFaundri Besi Foundry Pengisar BijianKilang RotiGudangJelapangKedai SenjataKedai PerisaiGelanggang LatihanBangunan UtamaTitik PerhimpunanPasarKedutaanBerekKandang KudaBengkelAkademiGuaDewan PerbandaranResidenIstanaPerbendaharaanPejabat DaganganBerek BesarGKandang Kuda BesarTembok BandarTembok TanahPagar KubuKedai Tukang BatuKilang BirPemerangkapRumah Agam WiraGudang BesarJelapang BesarDunia KeajaibanPalung Kuda";
		aLangTroops[0] = ["Askar Legion", "Pengawal Pertahanan", "Askar Empayar", "Kesatria Diplomatik", "Kesatria Empayar", "Kesatria Jeneral", "Kereta Pelantak", "Tarbil Api", "Senator", "Peneroka", "Wira"];
		aLangTroops[1] = ["Askar Belantan", "Askar Lembing", "Askar Kapak", "Peninjau", "Kesatria Santo","Kesatria Teutonik", "Kereta Pelantak", "Tarbil", "Penghulu", "Peneroka", "Wira"];
		aLangTroops[2] = ["Falanks", "Askar Pedang", "Penjelajah", "Guruh Theutates", "Penunggang Druid", "Haeduan", "Kereta Pelantak", "Tarbil", "Pemimpin", "Peneroka", "Wira"];
		aLangAttackType = ["Bantuan", "Serangan: Normal", "Serangan: Serbuan"];
		break;


                case "nl":
                                aLangAllBuildWithId = ["Houthakker", "Klei-afgraving", "IJzermijn", "Graanakker", "", "Zaagmolen", "Steenbakkerij", "Ijzersmederij", "Korenmolen", "Bakkerij", "Pakhuis", "Graansilo", "Wapensmid", "Uitrustingssmederij", "Toernooiveld", "Hoofdgebouw", "Verzamelenplaats", "Marktplaats", "Ambassade", "Barakken", "Stal", "Werkplaats", "Acedemie", "Schuilplaats", "Raadhuis", "Residentie", "Paleis", "Schatkamer", "Handelskantoor", "Grote Barakken", "Grote Stal", "Stadsmuur", "Muur van aarde", "Palissade", "Steenhouwerij", "Brouwerij", "Vallenzetter","Heldenhof", "Groot Pakhuis", "Grote Graansilo", "Wereldwonder", "Drinkplaats"];  
                                aLangAllResInDorf1 = ["Houthakker", "Klei-afgraving", "IJzermijn", "Graanakker"];  
                                aLangAddTaskText = ["Taak toevoegen", "Type", "Gekozen dorp", "Taakdoel", "Naar", "Modus", "Bouwhulp", "Grondstofconcentratie", "Naar boven", "Naar benenden", "Del", "&#160;&#160;&#160;Doelen", "Bewegen ", "Verwijder alle taken"];  
                                aLangTaskKind = ["Verbeteren", "Gebouw bouwen", "Aanvallen", "Onderzoeken", "Trainen", "Handel", "NPC", "Slopen", "Vieren"];  
                                maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];  
                                aLangGameText = ["Niveau", "Handelaren", "ID", "Hoofddorp", "Start tijd", "Deze tijdsinstelling is onbruikbaar op dit moment.", "Naar", "Dorp", "transport", "Van", "Transporteren naar", "Transporteren van", "Terugkeren van", "Grondstoffen", "Gebouw", "Nieuw gebouw bouwen", "Leeg", "Niveau"];  
                                aLangRaceName = ["Romeinen", "Germanen", "Galliërs"];  
                                aLangTaskOfText = ["Upgrade plannen", "Nieuwbouw plannen", "Auto ResUpD", "Inactief", "Start", "Bezig", "Stop", "De grondverdeling van dit dorp is ", "Autotransport", "Autotransport is niet gestart", "Gestart", "Transport succesvol", "Takenlijst", "Trans In limit", "Standaard", "Aanpassen", "Hout/Klei/Ijzer", "Graan", "Slopen plannen",  
        "Aanval plannen", "Aanvalssoort", "Tijdsduur", "Herhalen", "tussentijd","00:00:00","Katapult doel","Random", "Onbekend", "keren", "Maand", "Dag", "Troepen verstuurd",  
        "Training plannen", "Trainingkant", "Trainingstaak voltooid", "Handmatig Transport", "Stel de tussentijd in","Dit is de tussentijd van de pagina herladen ,\n standaard is 20 minuten, stel a.u.b. een nieuwe tijd in:\n\n","Trans Out Rmn","Feest plannen","Klein Feest","Groot Feest","Stel tussentijd in voor grondstofconcentratie",  
        "minuten", ".",".","START","STOP","Verbetering plannen","Verbeter aanval","Verbeter uitrusting"];  
                                aLangErrorText = ["Te weinig grondstoffen.", "Je bouwvakkers zijn al aan het werk.", "Bouwopdracht voltooid", "Bouwopdracht begint", "Bezig", "Je pakhuis is te klein. Verbeter je pakhuis om de bouwopdracht voort te zetten.", "Je graansilo is te klein. Verbeter je graansilo om de bouwopdracht voort te zetten", "Genoeg grondstoffen","Te weinig graanproductie: Verbeter eerst een graanveld!","Er is al een feest gaande"];  
                                aLangOtherText = ["Belangrijk bericht", "Alleen de grondstofvelden van het hoofddorp kunnen <br/>verbeterd worden tot niveau 20. Nu is je hoofddorp<br/> niet vastgesteld. Bezoek je profiel a.u.b.", "Afkorting hier ^_^", "Instellingen succesvol", "Geannuleerd", "Start de taken", "Verbetering succesvol", "Start succesvol", "Je ras is onbekend, daardoor ook je troeptype. <br/>Bezoek je profiel om je ras vast te stellen<br/>", "Bezoek a.u.b. ook je heldenhof om <br/> de snelheid en type van je held vast te stellen."];  
                                allsourceString = "HouthakkerKlei AfgravingIjzer MijnGraanakker";  
                                aLangResources=["Hout","Klein","Ijzer","Graan"];  
                                allbuildString = "ZaagmolenKleiafgravingIjzer DrinkplaatsGraan MolenBakkerijPakhuisGraansiloWapensmidUitrustingToernooi VeldHoofd GebouwVerzamelplaatsMarktplaatsAmbassadeBarakkenStalWerkplaatsAcedemieSchuilplaatsDorp HuisResidentiePaleisSchatkamerHandelen KantoorGrote BarakkenGrote StalDorps MuurAarde MuurPalissade SteenhouwerijBrouwerijVallenzetterHeldenhofGroot PakhuisGrote GraansiloWereldwonderDrinkplaats";  
                                aLangTroops[0] = ["Legionair", "Praetoriaan", "Imperiaan", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ram", "Vuurkatapult", "Senator", "Kolonist", "Held"];  
                                aLangTroops[1] = ["Knuppelvechter", "Speervechter", "Bijlvechter", "Verkenner", "Paladijn", "Germaanse Ridder", "Ram", "Katapult", "Leider", "Kolonist", "Held"];  
                                aLangTroops[2] = ["Phalanx", "Zwaardvechter", "Padvinder", "Toetatis donder", "Druideruiter", "Haeduaan", "Ram", "Trebuchet", "Onderleider", "Kolonist", "Held"];  
                                aLangAttackType = ["Versterking", "Aanval", "Overval"];  
                                break;


case "hu": //Harrerp

		aLangAllBuildWithId = ["Favágó", "Agyagbánya", "Vasércbánya", "Búzafarm", "", "Fűrészüzem", "Agyagégető", "Vasöntöde", "Malom", "Pékség", "Raktár", "Magtár", "Fegyverkovács", "Páncélkovács", "Gyakorlótér", "Főépület", "Gyülekezőtér", "Piac", "Követség", "Kaszárnya", "Istálló", "Műhely", "Akadémia", "Rejtekhely", "Tanácsháza", "Rezidencia", "Palota", "Kincstár", "Kereskedelmi központ", "Nagy Kaszárnya", "Nagy Istálló", "Kőfal", "Földfal", "Cölöpfal", "Kőfaragó", "Sörfőzde", "Csapdakészítő", "Hősök háza", "Nagy Raktár", "Nagy Magtár", "Világcsoda","Lóitató"];
		aLangAllResInDorf1 = ["Favágó", "Agyagbánya", "Vasércbánya", "Búzafarm"]
		aLangAddTaskText = ["Feladat hozzáadása", "Feladat", "Aktív falu", "Feladat célja", "Ide", "Mode", "Construction support", "Resources concentration", "Fel", "Le", "Törlés", "   Feladatok", "Sorrend", "Összes feladat törlése"];
		aLangTaskKind = ["Kiépítés", "Új épület", "Támadás", "Fejlesztés", "Kiképzés", "Szállítás", "NPC", "Bontás", "Ünnep"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Szint", "Kereskedők", "ID", "Capital", "Indítási idő", "az időbeállítás nem szükséges.", "ide", "Falu", "szállítás", "innen", "Szállítás ide", "Szállítás innen", "Visszaérkezés", "nyersanyag", "épület", "Új épület építése", "empty", "szint"];
		aLangRaceName = ["Római", "Germán", "Gall"];
		aLangTaskOfText = ["Időzített kiépítés", "Időzített építés", "AutoResUpD", "Not_run", "Start", "Started", "Suspend", "The resource fields distribution of this village is ", "Auto szállítás", "Autotransport is not opened", "Opened", "Szállítás kész", "Feladat lista", "Trans_In_limit", "Default", "Módosítás", "Fa/Agyag/Vasérc", "Búza", "Időzített bontás",
			"Időzítet támadás", "Támadás típus", "Utazási idő", "Ismétlés", "Idő intervallum","00:00:00","Katapult célpont","Véletlen", "Ismeretlen", "ismétlés", "Hónap", "Nap", "Egységek küldése",
			"Időzített kiképzés","Kiképzőhely","Kiképzés befejezve","Egyedi szállítás","Frissítési időintervallum beállítás","Ez az oldalfrissítési időintervallum,\n az alap 20 perc, írd be az új időt:\n\n","Trans_Out_Rmn","Időzített ünnepség","Kis ünnepség","Nagy ünnepség","setInterval of Resources concentration",
			"perc","áll","fut","indulj","állj","Időzített fejlesztés","Fegyver fejlesztés","Páncél fejlesztés"];
		aLangErrorText = ["Too few resources.", "The workers are already at work.", "Építés kész", "Építés indul", "Fejlesztés folyamatban", "A raktárad túl kicsi. Építsd tovább a raktárt, hogy folytathasd az építést!", "A magtárad túl kicsi. Építsd tovább a magtárt, hogy folytathasd az építést!", "Elég nyersanyag","Élelemhiány: Előtte egy búzafarmot kell építened ","Jelenleg is ünnepelnek","There is already research going on"];
		aLangOtherText = ["Important note", "Only the resource fields of the capital can be upgraded to level 20. Now your capital is not detected. Visit your Profile please.", "Shortcut here ^_^", "Beállítás kész", "Cancelled", "Start the tasks", "Kiépítés kész", "Run successfully", "Your race is unknown, therefore your troop type. Visit your Profile to determine your race.", "Please also visit your Hero's Mansion to determine the speed and the type of your hero."];
		allsourceString = "FavágóAgyagbányaVasércbányaBúzafarm";
		aLangResources= ["fa","agyag","vasérc","búza"];
		allbuildString = "FűrészüzemAgyagégetőVasöntödeMalomPékségRaktárMagtárFegyverkovácsPáncélkovácsGyakorlótérFőépületGyülekezőtérPiacKövetségKaszárnyaIstállóMűhelyAkadémiaRejtekhelyTanácsházaRezidenciaPalotaKincstárKereskedelmi központNagy KaszárnyaNagy IstállóKőfalFöldfalCölöpfalKőfaragóSörfőzdeCsapdakészítőHősök házaNagy RaktárNagy MagtárVilágcsodaLóitató";
		aLangTroops[0] = ["Légiós", "Testőr", "Birodalmi", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Faltörő kos", "Tűzkatapult", "Szenátor", "Telepes", "Hős"]; //Római
		aLangTroops[1] = ["Buzogányos", "Lándzsás", "Csatabárdos", "Felderítő", "Paladin", "Teuton lovag", "Faltörő kos", "Katapult", "Törzsi vezető", "Telepes", "Hős"]; //Germán
		aLangTroops[2] = ["Phalanx", "Kardos", "Felderítő", "Theutat villám", "Druida lovas", "Haeduan", "Falromboló", "Harci-katapult", "Főnök", "Telepes", "Hős"]; //Gall
		aLangAttackType = ["Támogatás", "Támadás", "Rablás"];
		break;		


case "lv": //by sultāns updated the 16/04/2010
		aLangAllBuildWithId = ["Cirsma", "Māla Karjers", "Dzelzs Raktuves", "Labības Lauks", "", "Kokzāģētava", "Ķieģelu Fabrika", "Dzelzs Lietuve", "Dzirnavas", "Maiznīca", "Noliktava", "Klēts", "Ieroču kaltuve", "Bruņu kaltuve", "Turnīru laukums", "Galvenā ēka", "Pulcēšanās Vieta", "Tirgus laukums", "Vēstniecība", "Kazarmas", "Stallis", "Darbnīca", "Akadēmija", "Paslēptuve", "Rātsnams", "Rezidence", "Pils", "Dārgumu glabātuve", "Tirdzniecības Birojs", "Lielās Kazarmas", "Lielais Stallis", "Pilsētas Mūris", "Zemes Mūris", " Palisāde", "Akmeņlauztuve", "Alus Darītava", "Mednieku māja","Varoņu Savrupmāja", "Lielā Noliktava", "Liela Klēts", "Pasaules Brīnums"];
		aLangAllResInDorf1=["Cirsma", "Māla Karjers", "Dzelzs Raktuves", "Labības Lauks"]
		aLangAddTaskText = ["Izveidot uzdevumu", "Veids", "Aktīvais ciems", "Uzdevuma mērķis", "| Mērķis", "Tips", "Celtniecības atbalsts", "Resursu koncentrācija", "Uz augšu", "Uz leju", "Izdzēst", "   Uzdevuma stāvoklis", "Pārvietot", "Dzēst visus uzdevumus"];
		aLangTaskKind = ["Uzlabot", "Jauna ēka", "Uzbrukt", "Izpētīt", "Apmācīt", "Nosūtīt resursus", "NPC", "Nojaukt", "Svinības"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Līmenis", "Tirgotāji", "ID", "Galvaspilsēta", "Sākuma laiks", "Īslaicīgi nestrādā", "uz", "Ciems", "Transportēt", "no", "Transportēt uz", "Transportēt no", "Atgriezties no", "resursi", "ēka", "Būvēt jaunu ēku", "tukšs", "līmenis"];
		aLangRaceName = ["Romieši", "Ģermāņi", "Galli"];
		aLangTaskOfText = ["Ieplānot uzlabojumus", "Ieplānot jaunas ēkas celtniecību", "Uzlabot resursu laukus", "Izslēgt", "Uzsākt", "Ieslēgts", "Stop", "Resursu lauku izvietojums šajā ciemā", "Automātiska nosūtīšana", "Automātiska nosutīšana atslēgta", "Ieslēgts", "Veiksmīgi nosūtīts", "* Uzdevumi *", "Ienākošais limits", "Default", "Izmainīt", "Koks/Māls/Dzelzis", "Labība", "Ieplānot nojaukšanu",
			"Ieplānot uzbrukumu", "Uzbrukuma veids", "Laiks ceļā", "Atkartošanas laiks", "laika intervāls","00:00:00","Ar katapultām massēt","Pofig pa ko", "Nezināms", "laiki", "Mēnesis", "Diena", "Kareivji nosūtīti",
			"Ieplānot apmācību","Train site","Kareivju apmācība pabeigta","optimizēt transportēšanu","Ievadīt laiku pēc kura atkārtot iekraušanu","Šis ir intervāls lapas parlādēšanai ,\n pēc noklusējuma - 20 min., Lūdzu ievadiet jaunu laiku:\n\n","Izejošais limits","Ieplānot svinības","mazās svinības","lielās svinības","Uzstādīt laika intervālu resursu sūtīšanai",
			"minūtes", ".",".","Start", "Stop", "Ieplānot uzdevumus","Ieplānot uzbrukumus","Ieplanot aizsardzību"];
		aLangErrorText = ["Nepietiek resursu", "Strādnieki jau strādā", "Būvniecība pabeigta", "Ir uzsākta būvniecība", "Attīstības stadija", "Nepietiek vietas noliktavā, lūdzu paplašiniet to", "Nepietiek vietas klētī, ludzu paplašinoiet to", "Pietiekoši resursu","","Svinības jau notiek"];
		aLangOtherText = ["Svarīgi", "Tikai galvaspilsētā resursu laukus var uzlabot uz 20Lvl. Galvaspilsāta nav noteikta. Ieejiet lūdzu savā profilā", "Shortcut here ^_^", "Iestatījumi pabeigti", "Atcelts", "Sākt uzdevumus", "Uzlabots veiksmīgi", "Viss notiek", "Jūsu rase ir unknown. Lūdzu ieejiet profilā.", "Kā arī, lūdzu ieejiet varoņu majā, lai noteiktu varoņa veidu un ātrumu"];
		allsourceString = "CirsmaMāla KarjersDzelzs RaktuvesLabības Lauks";
		aLangResources=["Koks","Māls","Dzelzs","Labība"];
		allbuildString = "KokzāģētavaĶieģelu FabrikaDzelzs LietuveDzirnavasMaiznīcaNoliktavaKlētsIeroču kaltuveBruņu kaltuveTurnīru laukumsGalvenā ēkaPulcēšanās VietaTirgus laukumsVēstniecībaKazarmasStallisDarbnīcaAkadēmijaPaslēptuveRātsnamsRezidencePilsDārgumu glabātuveTirdzniecības BirojsLielās KazarmasLielais StallisPilsētas MūrisZemes MūrisPalisādeAkmeņlauztuveAlus DarītavaMednieku mājaVaroņu SavrupmājaLielā NoliktavaLielā KlētsPasaules Brīnums"
		aLangTroops[0] = ["Leģionārs", "Pretorietis", "Iekarotājs", "Ziņnesis", "Romas Jātnieks", "Romas Bruņinieks", "Mūra Brucinātājs", "Uguns Katapulta", "Senators", "Kolonists", "Varonis"];
		aLangTroops[1] = ["Rungas Vēzētājs", "Šķēpnesis", "Karacirvja Vēzētājs", "Izlūks", "Bruņinieks", "Ģermāņu Bruņinieks", "Postītājs", "Katapultas", "Virsaitis", "Kolonists", "Varonis"];
		aLangTroops[2] = ["Falanga", "Zobenbrālis", "Pēddzinis", "Zibens Jātnieks", "Priesteris - Jātnieks", "Edujs", "Tarāns", "Trebušets", "Barvedis", "Kolonists", "Varonis"];
		aLangAttackType = ["Papildspēki", "Uzbrukums", "Iebrukums"];
		break;
	case "cl":
	case "mx":
	case "net": // thanks Renzo
		aLangAllBuildWithId = ["Leñador", "Barrera", "Mina", "Granja", "", "Serrería", "Ladrillar", "Fundición de Hierro", "Molino", "Panadería", "Almacén", "Granero", "Herrería", "Armería", "Plaza de torneos", "Edif. principal", "Plaza reuniones", "Mercado", "Embajada", "Cuartel", "Establo", "Taller", "Academia", "Escondite", "Ayuntamiento", "Residencia", "Palacio", "Tesoro", "Oficina de Comercio", "Cuartel Grande", "Establo Grande", "Muralla", "Terraplén", "Empalizada", "Cantero", "Cervecería", "Trampero","Hogar del héroe", "Almacén Grande", "Granero Grande", "Maravilla", "Abrevadero"];
		aLangAllResInDorf1 = ["Leñador", "Barrera", "Mina de Hierro", "Granja"];
		aLangAddTaskText = ["Añadir tarea", "Estilo", "Aldea activa", "Objetivo de Tarea", "Para", "Modo", "Soporte de Construcción", "Concentración de Recursos", "Ir arriba", "Ir abajo", "Borrar", "   Contenido de tarea", "Mover ", "Borrar todas las tareas"];
		aLangTaskKind = ["Subir", "Construir edificio nuevo", "Atacar", "Mejorar", "Entrenar", "Transportar", "NPC", "Demoler", "Fiesta"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Nivel", "Comerciantes", "ID", "Capital", "Tiempo de Inicio", "esta prueba de tiempo no es útil.", "para", "Aldea", "transportar", "de", "Transportar a", "Transporte de", "Regreso de", "recursos", "edificio", "Construir nuevo edificio", "vacío", "nivel"];
		aLangRaceName = ["Romanos", "Germanos", "Galos"];
		aLangTaskOfText = ["Programar subida", "Programar nueva Construcción", "AutoResUpD", "OFF", "Empezar", "ON", "Suspender", "La distribución de campos de recursos de esta aldea es ", "Autotransporte", "Autotransporte no está abierto", "Abierto", "Transporte exitoso", "Lista de Tareas", "Trans_In_limit", "Por Defecto", "Modificar", "Madera/Barro/Hierro", "Cereal", "Programar demolición","Programar ataque", "Tipo de Ataque", "Tiempo de Viaje", "Número de Repeticiones", "Tiempo de intervalo","00:00:00","Objetivo de Catapulta","Al Azar", "Desconocido", "Veces", "Mes", "Día", "Tropas enviadas", "Programar Cadena","Sitio de Cadena","Tarea de Cadena completada","Transporte Custom","Establecer tiempo de intervalo de la recarga","este es el tiempo de intervalo entre cada recarga de la página,\n Por defecto es 20 minutos, por favor introduza el nuevo tiempo:\n\n","Trans_Out_Rmn","Programar Fiesta","fiesta pequeña","fiesta grande","Establecer intervalo de concentración de recursos","minutos",".",".","START","STOP", "Programar Mejora", "Mejorar Ataque", "Mejorar Defensa"];
		aLangErrorText = ["Muy pocos recursos.", "Los aldeanos ya están trabajando.", "Construcción completa", "Empezando construcción", "En desarrollo", "Su almacén es muy pequeño. Por favor amplíe su almacén para continuar su construcción", "Su almacén es muy pequeño. Por favor amplíe su almacén para continuar su construcción", "Suficientes Recursos","Falta de Alimento: Amplíe una granja primero!","Ya hay una fiesta en progreso","Ya hay una exploración en progreso"];
		aLangOtherText = ["Nota importante", "Solo los campos de recurso de la capital pueden ser ampliados a nivel 20. Su capital no ha sido detectada. Por favor visite su perfil.", "Atajo aquí ^_^", "Configuración completada", "Cancelado", "Empezar tareas", "Mejora Exitosa", "Ejecución exitosa", "Su raza es desconocida, asimismo su tipo de tropas. Visite su Perfil para determinar su raza.", "Por favor visite su Hogar del Heroe para determinar la velocidad y tipo de su heroe."];
		allsourceString = "WoodcutterClay PitIron MineCropland";
		aLangResources = ["madera", "barro", "hierro", "cereal"];
		allbuildString = "SerreríaLadrillarFundición de HierroMolinoPanaderíaAlmacénGraneroHerreríaArmeríaPlaza de TorneosEdif. principalPlaza reunionesMercadoEmbajadaCuartélEstabloTallerAcademiaEsconditeAyuntamientoResidenciaPalacioTesoroOficina de ComercioCuartél GrandeEstablo GrandeMurallaTerraplénEmpalizadaCanteroCerveceríaTramperoHogar del héroeAlmacén GrandeGranero GrandeMaravillaAbrevadero";
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Carnero", "Catapulta de Fuego", "Senador", "Colono", "Héroe"];
		aLangTroops[1] = ["Luchador de Porra", "Lancero", "Luchador de Hacha", "Emisario", "Paladín", "Jinete Teutón", "Ariete", "Catapulta", "Cabecilla", "Colono", "Héroe"];
		aLangTroops[2] = ["Falange", "Luchador de Espada", "Batidor", "Rayo de Teutates", "Jinete Druida", "Jinete Eduo", "Ariete", "Catapulta de Guerra", "Cacique", "Colono", "Héroe"];
		aLangAttackType = ["Refuerzo", "Ataque", "Atraco"];
		break;

	case "se": // thanks to Arias
		aLangAllBuildWithId = ["Skogshuggare", "Lergrop", "Järngruva", "Vetefält", "", "Sågverk", "Murbruk", "Järngjuteri", "Vetekvarn", "Bageri", "Magasin", "Silo", "Smedja", "Vapenkammare", "Tornerplats", "Huvudbyggnad", "Samlingsplats", "Marknadsplats", "Ambassad", "Baracker", "Stall", "Verkstad", "Akademi", "Grotta", "Stadshus", "Residens", "Palats", "Skattkammare", "Handelskontor", "Stor barack", "Stort stall", "Stadsmur", "Jordvall", "Palisad", "Stenmurare", "Bryggeri", "Fälla", "Hjältens egendom", "Stort magasin", "Stor silo", "Världsunder", "Vattenbrunn"];
		aLangAllResInDorf1 = ["Skogshuggare", "Lergrop", "Järngruva", "Vetefält"];
		aLangAddTaskText = ["Lägg till uppgift", "Stil", "Aktiv by", "Task target", "Till", "Läge", "Kontruktions stöd", "Råvaro koncentration", "Flytta upp", "Flytta ner", "Radera", "Uppgifter", "Flytta ", "Radera alla uppgifterna"];
		aLangTaskKind = ["Uppgradering:", "Ny byggnad:", "Attack:", "Forskning:", "Träning:", "Transport:", "NPC:", "Demolish:", "Celebration:"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Nivå ", "Handel", "ID", "Capital", "Start time", "this timesetting is unuseful now.", "till", "By", "Transport", "från", "Transport till", "Transport från", "Återvänder från", "Råvaror", "Byggnad", "Konstruera en ny byggnad", "Tom", "Nivå"];
		aLangRaceName = ["Romare", "Germaner", "Galler"];
		aLangTaskOfText = ["Schemalägg uppgradering", "Schemalägg ny byggnad", "Uppgradera fält", "Ej Aktiv", "Starta", "Startad", "Avbryt", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport lyckades", "Uppgifter", "Trans_In_limit", "Standard", "Ändra ", "Trä/Lera/Järn", "Vete", "Schemalägg demolition",
			"Schemalägg attack", "Attack type", "Res tid", "antal upprepningar", "interval time","00:00:00","Catapult target","Random", "Okänd", "times", "Månad", "Dag", "Trupper skickade", "Schemalägg Träning","Tränings plats","Träningen klar","Anpassad transport","Sätt intervallen för omladdning av sidan","Detta är intevallen för omladdning av sida,\n standard är 20 minuter, vänligen ange ny intervall:\n\n","Trans_Out_Rmn","Schemalägg fest","Liten fest","Stor fest","Sätt intervall av råvarukoncentration",
			"minuter",".",".","START","STOP","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["För få råvaror", "Dina arbetare är redan ute på jobb", "Byggnad klar", "Påbörjar byggnad", "Under utveckling", "Ditt magasin är för litet. Vänligen uppgradera ditt magasin för att fortsätta ditt byggnadsarbete.", "Din silo är för liten. Vänligen uppgradera din silo för att fortsätta ditt byggnadsarbete.", "Tillräckligt med resurser", "Brist på mat: utöka vetefälten först!", "En fest pågår redan."];
		aLangOtherText = ["Important note", "Only the resource fields of the capital can <br/>be upgraded to level 20. Now your capital<br/> is not detected. Visit your Profile please.", "Shortcut here ^_^", "Setup klar", "Avbruten", "Starta uppgifterna", "Upgrade successfully", "Run successfully", "Your race is unknown, therefore your troop type. <br/>Visit your Profile to determine your race.<br/>", "Please also visit your Hero's Mansion to determine<br/> the speed and the type of your hero."];
		allsourceString = "SkogshuggareLergropJärngruvaVetefält";
		aLangResources=["Trä","Lera","Järn","Vete"];
		allbuildString = "SkogshuggareLergropJärngruvaVetefältSågverkMurbrukJärngjuteriVetekvarnBageriMagasinSiloSmedjaVapenkammareTornerplatsHuvudbyggnadSamlingsplatsMarknadsplatsAmbassadBarackerStallVerkstadAkademiGrottaStadshusResidens PalatsSkattkammareHandelskontorStor barackStort stallStadsmurJordvallPalissadStenhuggareBryggeriFällaHjältens egendom";
		aLangTroops[0] = ["Legionär", "Praetorian", "Imperiesoldat", "Spårare", "Imperieriddare", "Ceasarriddare", "Murbräcka", "Eld Katapult", "Senator", "Nybyggare", "Hjälte"];
		aLangTroops[1] = ["Klubbman", "Spjutman", "Yxman", "Scout", "Paladin", "Germansk Knekt", "Murbräcka", "Katapult", "Stamledare", "Nybyggare", "Hjälte"];
		aLangTroops[2] = ["Falanx", "Svärdskämpe", "Spårare", "Theutates Blixt", "Druidryttare", "Haeduan", "Murbräcka", "Krigskatapult", "Hövding", "Nybyggare", "Hjälte"];
		aLangAttackType = ["Förstärkning", "Normal", "Plundring"];
		break;

	case "it": // thanks Hamkrik 
		aLangAllBuildWithId = ["Segheria", "Pozzo d'argilla", "Miniera di ferro", "Campo di grano", "", "Falegnameria", "Fabbrica di Mattoni", "Fonderia", "Mulino", "Forno", "Magazzino", "Granaio", "Fabbro", "Armeria", "Arena", "Centro del villaggio", "Caserma", "Mercato", "Ambasciata", "Campo d'addestramento", "Scuderia", "Officina", "Accademia", "Deposito Segreto", "Municipio", "Residence", "Castello", "Camera del tesoro", "Ufficio commerciale", "Grande caserma", "Grande scuderia", "Mura Cittadine", "Fortificazioni", "Palizzata", "Genio civile", "Birrificio", "Esperto di trappole", "Circolo degli eroi", "Grande Magazzino", "Grande Granaio", "Meraviglia", "Fonte Equestre"]; 
		aLangAllResInDorf1=["Segheria", "Pozzo d'argilla", "Miniera di ferro", "Campo di grano"] 
		aLangAddTaskText = ["Aggiungere Compito", "Stilo", "Villaggio Attivo", "Obiettivo del Compito", "Alla", "Mode", "Supporto di Costruzione", "Resource concentration", "SU", "JU", "Cancella", "   Contenuto di Compito", "Movere", "Cancella tutti i Compiti"]; 
		aLangTaskKind = ["Amplia", "Nuovo Edificio", "Attacco", "Ricerca", "Addestra", "Trasporto", "NPC", "Demolire", "Festa"]; 
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"]; 
		aLangGameText = ["Livelo", "Mercanti", "ID", "Capitala", "Tempo di Inizio", "questa impostazione di timpo non si usa.", "alla", "Villaggio", "transporto", "dalla", "Transporto alla", "Transporto dalla", "Retorno dalla", "risorse", "edifici", "Costruisci nuovo edificio", "vuoto", "livelo"]; 
		aLangRaceName = ["Romani", "Teutoni", "Galli"]; 
		aLangTaskOfText = ["Programma Ampliamento", "Programma Nuovo Efificio", "AutoResUpD", "Non_attivo", "Start", "Iniziato", "Sospeso", "The resource fields distribution of this village is ", "Autotransporto", "Autotransporto non e aperto", "Aperto", "Transportato successo", "Lista Compiti", "Trans_In_limit", "Default", "Modificare", "Legno/Argilla/Ferro", "Grano", "Demolire",
			"Programma Attacco", "Tipo Attacco", "Tempo Percorso", "ripeti", "intervalo di tempo","00:00:00","Obiettivo Catapulta", "Random", "Scunosciuto", "volte", "Mese", "Giorno", "Truppe Inviate", "Programma Addestramento", "Addestra site", "Addestramento Finito","Transporto Diverso","ripeti numero volte","questo è intervalo di ricarica pagina,\n default è 20 minute, per favore inserisce nuovo tempo:\n\n","Trans_Out_Rmn","Programma la Festa","festa picola","festa grande","Imposta il Intervalo di Concentrazione di Resurse",
			"minute","in attesa","corrente","fare","pausa","Schedule Improve","Improve Attack","Improve defence"]; 
		aLangErrorText = ["Mancano le resurce.", "I Lavoratori Sono Pronti per Lavorare", "Edificio Completo", "Inizia Edificio", "Nella Ricerca", "Il tuo Magazzino e Picolo. Per favore Amplia il Magazzino per continuare la costructione", "Il tuo Granaio e Picolo. Per favore Amplia il Granaio per continuare la costructione", "Resurse sufficientemente","Mancanza di Cibo: Amplia Campo di grano!","Pronta la Fiesta"]; 
		aLangOtherText = ["Nota Importante ", "Solo i Campi della Capitale possono essere ampliate al livelo 20. La tua capitale non è determinata. Visita il tuo Profile per favore.", "Shortcut here ^_^", "Setup compiuto", "Cancellato", "Inizia i Compiti", "Ampliamento con successo", "Iniziato con successo", "La tua rasa è sconosciuta, anche il tipo di truppe.Visita il tuo Profile per determinare la rasa.", "Per favore visita Circolo degli eroi per determinare la velocita e tipo di eroe."];
		allsourceString = "SegheriaPozzo d'argillaMiniera di ferroCampo di grano" 
		aLangResources=["legno","argilla","ferro","grano"]; 
		allbuildString = "FalegnameriaFabbrica di MattoniFonderiaMulinoFornoMagazzinoGranaioFabbroArmeriaArenaCentro del villaggioCasermaMercatoAmbasciataCampo d'addestramentoScuderiaOfficinaAccademiaDeposito SegretoMunicipioResidenceCastelloCamera del tesoroUfficio commercialeGrande casermaGrande scuderiaMura CittadineFortificazioniPalizzataGenio civileBirrificioEsperto di trappoleCircolo degli eroiGrande MagazzinoGrande GranaioMeravigliaFonte Equestre" 
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperiano", "Legionario a cavallo", "Imperiano a cavallo", "Cavalleria Romana", "Ariete da sfondamento", "Catapulta", "Senatore", "Decurione", "Eroe"]; 
		aLangTroops[1] = ["Combattente", "Lanciere", "Combattente con ascia", "Esploratore", "Paladino", "Cavalleria Teutonica", "Ariete", "Catapulta", "Comandante", "Decurione", "Eroe"]; 
		aLangTroops[2] = ["Lanciere", "Combattente con spada", "Esploratore", "Cavalleria Gallica", "Cavalleria di difesa", "Cavalleria avanzata", "Ariete", "Catapulta", "Capo tribù", "Decurione", "Eroe"]; 
		aLangAttackType = ["Rinforzi", "Attacco", "Raid"];
		break;
                
		
	case "si": // thanks Bananana and Tuga
		aLangAllBuildWithId = ["Gozdar", "Glinokop", "Rudnik železa", "Žitno polje", "", "Žaga", "Opekarna", "Talilnica železa", "Mlin", "Pekarna", "Skladišče", "Žitnica", "Izdelovalec orožja", "Izdelovalec oklepov", "Vadbišče", "Gradbeni ceh", "Zbirališče", "Tržnica", "Ambasada", "Barake", "Konjušnica", "Izdelovalec oblegovalnih naprav", "Akademija", "Špranja", "Mestna hiša", "Rezidenca", "Palača", "Zakladnica", "Trgovski center", "Velike barake", "Velika konjušnica", "Mestno obzidje", "Zemljen zid", "Palisada", "Kamnosek", "Pivnica", "Postavljalec pasti", "Herojeva rezidenca", "Veliko skladišče", "Velika žitnica", "Čudež sveta"];
		aLangAllResInDorf1=["Gozdar", "Glinokop", "Rudnik železa", "Žitno polje"];
		aLangAddTaskText = ["Dodaj nalogo", "Style", "Aktivna vas", "Nadgradi", "Na", "Mode", "Construction support", "Resources concentration", "Prestavi gor", "Prestavi dol", "Izbriši", "   Naloge", "Premakni ", "Izbriši vse naloge"];
		aLangTaskKind = ["Nadgradi", "Zazidljiva parcela", "Napad", "Razišči", "Uri", "Transport", "NPC", "Demolish", "Festival"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Stopnja", "Merchants", "ID", "Prestolnica", "Začetek ob", "Nastavitev časa ni pomembna.", "to", "Vas", "transport", "from", "Transport to", "Transport from", "Return from", "resources", "building", "Postavi nov objekt", "empty", "level"];
		aLangRaceName = ["Rimljani", "Tevtoni", "Galci"];
		aLangTaskOfText = ["Nadgradi kasneje", "Postavi nov objekt", "Surovine gor", "Pauza", "Začetek", "Začeto", "Prekliči", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Naloge", "Trans_In_limit", "Osnovno", "Spremeni", "Les/Glina/Železo", "Crop", "Podri kasneje",
			"Napadi kasneje", "Tip napada", "Do napada", "Ponovi", "Vrnitev čez","00:00:00","Tarča katapultov","Naključno", "Unknown", "times", "Month", "Day", "Enote poslane", "Uri kasneje","Mesto urjenja","Urjenje končano","customTransport","setup interval time of reload","this is the interval of page reload ,\n default is 20 minutes, please insert new time:\n\n","Trans_Out_Rmn","ScheduleParty","mali festival","veliki festival","setInterval of Resources concentration",
			"minute",".",".","START","STOP","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Primankljaj surovin.", "Delavci so že na delu.", "Zgrajeno", "Začnem z gradnjo", "V razvoju", "Seu Armazém é pequeno. Evolua o seu armazém para continuar a sua construção", "Seu Celeiro é pequeno. Evolua o seu Celeiro para continuar a sua construção", "Recursos suficientes","Já se encontra uma celebração em curso"];
		aLangOtherText = ["Pomembno!", "Samo polja v prestolnicigredo do stopnje 20 . A sua capitalnao está detectavel. Por favor visite o seu perfil.", "Atalho aqui ^_^", "Naloga uspešno dodana", "Preklicano", "Začni z nalogo", "Uspešno nadgrajeno", "Executar com sucesso", "Sua raça é desconhecida, e o seu tipo de tropa também.Visite o seu perfil para determinar as raça.", "Por favor visite a sua mansão do heroi para determinara velocidade e o tipo de heroi."];
		allsourceString = "GozdarGlinokopRudnik železaŽitno polje";
		aLangResources=["Les","Glina","Železo","Žito"]; 
		allbuildString = "ŽagaOpekarnaTalilnica železaMlinPekarnaSkladiščeŽitnicaIzdelovalec orožjaIzdelovalec oklepovVadbiščeGradbeni cehZbirališčeTržnicaAmbasadaBarakeKonjušnicaAkademijaŠpranjaMestna hišaRezidencaPalačaZakladnicaTrgovski centerVelikebarakeVelika konjušnicaMestno obzidjeZemljeni zidPalisardaKamnosekPivovarnaPostavljalec pastiHerojeva rezidencaVeliko skladiščeVelika žitnicaČudež svetaNapajališče" 
		aLangTroops[0] = ["Legionar", "Praetorijan", "Imperijan", "Izvidnik", "Equites Imperatoris", "Equites Caesaris", "Oblegovalni oven", "Ognjeni katapult", "Senator", "Kolonist", "Heroj"];
		aLangTroops[1] = ["Gorjačar", "Suličar", "Metalec sekir", "Skavt", "Paladin", "Tevtonski vitez", "Oblegovalni oven", "Mangonel", "Vodja", "Kolonist", "Heroj" ];
		aLangTroops[2] = ["Falanga", "Mečevalec", "Stezosledec", "Theutatesova Strela", "Druid", "Haeduan", "Oblegovalni oven", "Trebušet", "Poglavar", "Kolonist", "Heroj"];
		aLangAttackType = ["Okrepitev", "Napad", "Ropanje"];
		break;
		
	case "vn": // thanks Tuga
		aLangAllBuildWithId = ["Tiều Phu", "Mỏ Đất Sét", "Mỏ sắt", "Ruộng lúa", "", "Xưởng Gỗ", "Lò Gạch", "Lò Rèn", "Nhà Xay Lúa", "Lò Bánh", "Nhà Kho", "Kho Lúa", "Thợ Rèn", "Lò Luyện Giáp", "Võ Đài", "Nhà Chính", "Binh Trường", "Chợ", "Đại Sứ Quán", "Trại Lính", "Chuồng Ngựa", "Xưởng", "Học Viện", "Hầm Ngầm", "Tòa Thị Chính", "Lâu Đài", "Cung Điện", "Kho Bạc", "Phòng Thương Mại", "Doanh Trại Lớn", "Trại Ngựa", "Tường Thành", "Tường Đất", "Tường Rào", "Thợ Xây Đá", "Quán bia", "Hố Bẫy","Lâu đài tướng", "Nhà Kho Lớn", "Kho Lúa Lớn", "Kỳ Quan", "Tàu ngựa"];
		aLangAllResInDorf1=["Tiều phu", "Mỏ Đất Sét", "Mỏ sắt", "Ruộng Lúa"]
		aLangAddTaskText = ["Thêm nhiệm vụ", "Loại", "Tại làng", "Mục tiêu", "Tới", "Phương thức", "Tự động", "Tùy chỉnh", "Di chuyển lên", "Di chuyển xuống", "Xóa", "&#160;&#160;&#160;Nội dung công việc", "Di chuyển", "Xóa tất cả danh mục"];
		aLangTaskKind = ["Nâng cấp", "Kiến Trúc Mới", "Tấn công", "Nghiên cứu", "Huấn luyện", "Vận chuyển", "NPC", "Phá hủy", "ăn mừng"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Cấp ", "Lái Buôn", "Tại vị trí", "Thủ đô", "Bắt đầu tại", "Chưa dùng được chức năng này.", "đến", "Làng", "vận chuyển", "từ", "Vận chuyển đến", "Vận chuyển từ", "Trở về từ", "Tài nguyên", "Kiến trúc", "Xây Kiến Trúc Mới", "không có gì", "Cấp"];
		aLangRaceName = ["Tộc Romans", "Tộc Teutons", "Tộc Gauls"];
		aLangTaskOfText = ["Lên lịch nâng cấp kiến trúc này", "Lên lịch xây kiến trúc này", "Tự động nâng cấp các mỏ", "Chưa kích hoạt", "Kích hoạt", "Đã kích hoạt", "Hủy", "Đây là làng loại ", "Tự động gửi tài nguyên", "Tự động gửi tài nguyên chưa được kích hoạt", "Đã được kích hoạt", "Gủi thành công", "Danh mục", "Tài nguyên bạn muốn nhận", "Mặc định", "Tùy chỉnh ", "Gỗ/Đất sét/Sắt", "Lúa", "Lên lịch phá hủy công trình",
			"Lên lịch tấn công làng này", "Loại tấn công", "Thời gian để đến nơi", "Số lần lặp lại", "Khoảng cách giữa các lần lặp lại","00:00:00","Mục tiêu cata","Ngẫu nhiên", "Chưa biết", "Giờ", "Tháng", "Ngày", "Đã gửi lính", "Lên lịch huấn luyện lính này","Train ubication","Lính đang được huấn luyện","Tùy chỉnh gửi tài nguyên","Thiết lập thời gian tải lại trang web","Đây là khoảng thởi gian tải lại trang web ,\n Mặc định là 20 phút, hãy điền vào số phút bạn muốn thay đổi:\n\n","Tài nguyên bạn muốn chừa lại","Lên lịch ăn mừng","Ăn mừng nhỏ","Ăn mừng lớn","Thiết lập khoảng thời gian bạn muốn gửi tài nguyên",
			"Phút","Đang tạm dừng","Đang thi hanh","Thi hành","Tạm dừng","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Quá ít tài nguyên.", "Công nhân đang làm nhiệm vụ khác.", "Kiến trúc đã hoàn thiên", "Bắt đầu xây dựng", "Đang xây dựng", "Nhà kho quá nhỏ. Hãy nâng cấp nhà kho mới xây dựng được kiến trúc", "Kho lúa quá nhỏ. Hãy nâng cấp kho lúa mới xây được kiến trúc", "Quá ít tài nguyên","","Hiện đang có buổi lễ ăn mừng"];
		aLangOtherText = ["Chú thích quan trọng", "Chỉ thủ đô mới có thể<br/>nâng cấp các mỏ lên level 20. THủ đô của bạn<br/> chưa thấy. hãy vào phần hồ sơ của bạn.", "Click vào đây", "Cài đặt hoàn tất", "Đã hủy", "Bắt đầu công việc", "Nâng cấp thành công", "Kích hoạt thành công", "CHưa biết bạn thuộc tộc nào. <br/>Vì vậy bạn nên vào hồ sơ để cập nhật thông tin.<br/>", "Bạn cũng nên vào Lâu Đài Tướng để cập nhật<br/> tốc đọ và loại tướng."];
		allsourceString = "TiềuPhuMỏ Đất SétMỏ SắtRuộng Lúa"
		aLangResources=["Gỗ","Đất sét","Sắt","Lúa"];
		allbuildString = "Xưởng GỗLò GạchLò RènNhà Xay LúaLò BánhNhà KhoKho LúaThợ RènLò Luyện GiápVõ ĐàiNhà ChínhBinh TrườngChợĐại Sứ QuánTrại LínhChuồng NgựaXưởngHọc ViệnHầm NgầmTòa Thị ChínhLâu ĐàiCung ĐiệnKho BạcPhòng Thương MạiDoanh Trại LớnTrại NgựaTường ThànhTường ĐấtTường RàoThợ Xây ĐáQuán biaHố BẫyLâu đài tướngNhà Kho LớnKho Lúa LớnKỳ QuanTàu ngựa"
		aLangTroops[0] = ["Lính Lê Dương", "Thị Vệ", "Chiến Binh Tinh Nhuệ", "Kỵ Binh Do Thám", "Kỵ Binh", "Kỵ Binh Tinh Nhuệ", "Xe Công Thành", "Máy Phóng Lửa", "Nguyên Lão", "Dân Khai Hoang", "Tướng"];
		aLangTroops[1] = ["Lính Chùy", "Lính Giáo", "Lính Rìu", "Do Thám", "Hiệp Sĩ Paladin", "Kỵ Sĩ Teutonic", "Đội Công Thành", "Máy Bắn Đá", "Thủ Lĩnh", "Dân Khai Hoang", "Tướng"];
		aLangTroops[2] = ["Lính Pha Lăng", "Kiếm Sĩ", "Do Thám", "Kỵ Binh Sấm Sét", "Tu Sĩ", "Kỵ Binh", "Máy Nện", "Máy Bắn Đá", "Tù Trưởng", "Dân Khai Hoang", "Tướng"];
		aLangAttackType = ["Tiếp viện", "Tấn công", "Cướp bóc"];
		break;

	case "ru": // by MMX
		aLangAllBuildWithId = ["Лесопилка", "Глиняный карьер", "Железный рудник", "Ферма", "", "Лесопильный завод", "Кирпичный завод", "Чугунолитейный завод", "Мукомольная мельница", "Пекарня", "Склад", "Амбар", "Кузница оружия", "Кузница доспехов", "Арена", "Главное здание", "Пункт сбора", "Рынок", "Посольство", "Казарма", "Конюшня", "Мастерская", "Академия", "Тайник", "Ратуша", "Резиденция", "Дворец", "Сокровищница", "Торговая палата", "Большая казарма", "Большая конюшня", "Стена", "Земляной вал", "Изгородь", "Каменотес", "Пивная", "Капканщик","Таверна", "Большой склад", "Большой амбар", "Чудо света", "Водопой"];
		aLangAllResInDorf1 = ["Лесопилка", "Глиняный карьер", "Железный рудник", "Ферма"]
		aLangAddTaskText = ["Добавить задание", "Тип задания", "Активная деревня", "Цель задания", " Цель", "Тип", "Поддержка строительства", "Концентрация ресурсов", "Вверх", "Вниз", "", "", "","Снять все задания"];
		aLangTaskKind = ["Улучшить:", "Строим:", "Атаковать:", "Исследовать:", " нанять:", "Отправить ресурсы:", "NPC:", "Разрушить:", "Торжество:"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = [" ", "Торговцы", "ID", "Столица", "Время запуска", "временно не работает", "в", "Деревня", "Транспортировка", "из", "Транспортировка в", "Транспортировка из", "Отправка из", "ресурсы", "здание", "Построить новое здание", "пусто", "уровень"];
		aLangRaceName = ["Римляне", "Германцы", "Галлы"];
		aLangTaskOfText = ["Запланировать улучшение", "Запланировать новое здание", "Качать ресурсы", "Выкл", "(►)", "Вкл", "(■)", "Распределение полей в деревне: ", "Автоотправка", "Автоотправка выкл.", "Вкл.", "Успешно отправлено", "/Задания/", "Лимит ввоза", "Нет", "Правка ", "Дерево/Глина/Железо", "Зерно", "Запланировать разрушение",
			"Запланировать атаку", "Тип атаки", "Време в пути", "повторы", "через", "01:00:00", "Цель катов", "Случайно", "Неизвестно", " раз", "/", " :дата/время: ", "Войска",
			"Запланировать найм","Выбранное здание ", "Обучение войск завершено","Поставки", "Задать интревал обновления", "Это интервал обновления страницы ,\n по умолчанию - 20 минут, Введите новое время:\n\n", "Лимит вывоза", "Запланировать празднование", "Малый праздник", "Большой праздник", "Установка интервала концентрации ресов",
			"минуты", "Выключен", "Включено", "(►)", "(■)","Запланировать улучшение","Улучшить атаку","Улучшить защиту"];
		aLangErrorText = ["Недостаточно сырья", "Все строители сейчас заняты", "Это здание отстроено полностью", "Начинаю строительство", "Процесс развития", "Недостаточна вместимость склада", "Недостаточна вместимость амбара", "Достаточно ресурсов", "Недостаток продовольствия: развивайте фермы.","Проводится торжество"];
		aLangOtherText = ["Важные заметки", "Только в столице поля могут быть до уровня 20.<br/>Столица не определена.Зайдите в профиль", "Ссылка тут ^_^", "<br/>Настройка завершена", "Отменено", "Начать задачи", " Улучшение прошло успешно", "Успешно", "Ваш народ неопределен.Пожалуйста зайдите в профиль.", "Также пожалуйста зайдите в таверну<br/>для определения типа и скорости героя"];
		allsourceString = "ЛесопилкаГлиняный карьерЖелезный рудникФерма";
		aLangResources = ["Древесина","Глина","Железо","Зерно"];
		allbuildString = "Лесопильный заводКирпичный заводЧугунолитейный заводМукомольная мельницаПекарняСкладАмбарКузница оружияКузница доспеховАренаГлавное зданиеПункт сбораРынокПосольствоКазармаКонюшняМастерскаяАкадемияТайникРатушаРезиденцияДворецСокровищницаТорговая палатаБольшая казармаБольшая конюшняСтенаЗемляной валИзгородьКаменотесПивнаяКапканщикТавернаБольшой складБольшой амбарЧудо светаВодопой"
		aLangTroops[0] = ["Легионер", "Преторианец", "Империанец", "Конный разведчик", "Конница императора", "Конница Цезаря", "Таран", "Огненная катапульта", "Сенатор", "Поселенец", "Герой"];
		aLangTroops[1] = ["Дубинщик", "Копьеносец", "Топорщик", "Скаут", "Паладин", "Тевтонская конница", "Стенобитное орудие", "Катапульта", "Вождь", "Поселенец", "Герой"];
		aLangTroops[2] = ["Фаланга", "Мечник", "Следопыт", "Тевтатский гром", "Друид-всадник", "Эдуйская конница", "Таран", "Требушет", "Предводитель", "Поселенец", "Герой"];
		aLangAttackType = ["Подкрепление", "Нападение", "Набег"];
		break;  

	case "rs": // by rsinisa
		aLangAllBuildWithId = ["Дрвосеча", "Рудник глине", "Рудник гвожђа", "Њива", "", "Пилана", "Циглана", "Ливница гвожђа", "Млин", "Пекара", "Складиште", "Силос", "Ковачница оружја", "Ковачница оклопа", "Витешка арена", "Главна зграда", "Место окупљања", "Пијаца", "Амбасада", "Касарна", "Штала", "Радионица", "Академија", "Склониште", "Општина", "Резиденција", "Палата", "Ризница", "Трговачки центар", "Велика касарна", "Велика штала", "Градски зид", "Земљани зид", "Палисада", "Каменорезац", "Пивница", "Постављач замки","Дворац хероја", "Велико складиште", "Велики силос", "Светско чудо", "Појилиште"];
		aLangAllResInDorf1 = ["Дрвосеча", "Рудник глине", "Рудник гвожђа", "Њива"];
		aLangAddTaskText = ["Додај задатак", "Начин", "Активна села", "Задата мета", "на", "Мод", "Подршка изградње", "Концентрација ресурса", "Помери горе", "Помери доле", "Бриши", " Списак задатака", "Помери ", "Обриши све задатке"];
		aLangTaskKind = ["Надогради", "Нова градња", "Напад", "Истраживање", "Обучи", "Транспорт", "НПЦ", "Рушити", "Забава"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["ниво ", "Трговци", "ID", "Главни град", "Време почетка", "ово временско подешавање је бескорисно", " према", "Село", "транспорт", "из", "Пребацивање према", "Пребацивање из", "повратак из", "ресурси", "изградња", "Направи нову зграду", "празно", "ниво"];
		aLangRaceName = ["Римљани", "Тевтонци", "Гали"];
		aLangTaskOfText = ["Распоред за надоградњу", "Направи нови распоред", "Ауто надоградња ресурса", "Неактивно", "Покрени", "Активно", "Заустави", "Дистрибуција ресурсних поља овог села је ", "Аутотранспорт", "Аутотранспорт није отворен", "Отворен", "Транспорт успешан", "Листа задатака", "Транспорт са лимитом", "Подразумевано", "Измени", "Дрво/Гллина/Гвожђе", "Њива", "Листа рушења", "Листа напада", "Врста напада", "Време превоза", "број понављања", "Временски интервал","00:00:00","Мета катапулта","Насумично", "Непознат", " пута", ". месец, ", ". дан, у ", "Слање трупа", "Листа обуке","Место обуке","Тренинг задатак урадити","прилагођен транспорт","подеси време поновног учитавања "," ово је интервал поновног учитавања стране, \n подразумевана вредност је 20 минута, молимо Вас убаците ново време:\n \n","Остатак одлазног транспорта","Листа забава","мала забава","велика забава"," Подесите интервал концентрације ресурса ", "минути", "заустављено", "активно", "покрени", "паузирај","Распоред унапређења","Унапреди напад","Унапреди одбрану"];
		aLangErrorText = ["Премало ресурса.", "Радници су већ на послу.", "Изградња завршена", "Покретање изградње", "У изградњи", "Складиште је премало. Проширите складиште како би наставили са изградњом", "Силос је премали. Проширите силос како би наставили са изградњом", "Довољно ресурса","Премало жита: прошири прво њиве","Прослава је већ у току"];
		aLangOtherText = ["Важна напомена", "Само у главном граду ресурсна поља могу бити проширена на ниво 20. Твој главни град није детектован, погледај свој профил.", "Пречица овде ^_^", "Подешавања готова", "Отказано", "Покрени задатке", "Надоградња успешна", "Покретање успешно", "Ваше племе је непознато, стога и врста трупа. Погледајте свој профил да видите који сте народ.","Такође посетите дворац хероја да сазнате брзину и тип свог хероја "];
		allsourceString = "ДрвосечаРудник ГлинеРудник ГвожђаЊива";
		aLangResources=["дрво","глина","гвожђе","жито"];
		allbuildString = "ПиланаЦигланаЛивница гвожђаМлинПекараСкладиштеСилосКовачница ОружјаКовачница ОклопаВитешка АренаМесто ОкупљањаПијацаАмбасадаКасарнаШталаРадионицаАкадемијаСклоништеОпштинаРезиденцијаПалатаРизницаТрговачки ЦентарВелика КасарнаВелика ШталаГрадски ЗидЗемљани ЗидПалисадаКаменорезацПивницаЗамкаДворац ХеројаВелико СкладиштеВеликиСилосСветско ЧудоПојилиште";
		aLangTroops[0] = ["Легионар", "Преторијанац", "Империјанац", "Извиђач", "Императорова коњица", "Цезарева коњица", "Ован", "Ватрени катапулт", "Сенатор", "Насељеник", "Херој"];
		aLangTroops[1] = ["Батинар", "Копљаник", "Секираш", "Извиђач", "Паладин", "Тевтонски витез", "Ован", "Катапулт", "Поглавица", "Насељеник", "Херој"];
		aLangTroops[2] = ["Фаланга", "Мачевалац", "Извиђач", "Галски витез", "Друид", "Коњаник", "Ован", "Катапулт", "Старешина", "Насељеник", "Херој"];
		aLangAttackType = ["Појачање", "Нормалан", "Пљачка"];
		break;

	case "ba": // thanks  ieyp
		aLangAllBuildWithId = ["Drvosječa", "Rudnik gline", "Rudnik željeza", "Poljoprivredno imanje", "", "Pilana", "Ciglana", "Livnica", "Mlin", "Pekara", "Skladište", "Silos", "Oruzarnica", "Kovacnica oklopa", "Mejdan", "Glavna zgrada", "Mesto okupljanja", "Pijaca", "Ambasada", "Kasarna", "Stala", "Radionica", "Akademija", "Skloniste", "Opstina", "Rezidencija", "Palata", "Riznica", "Trgovacki centar", "Velika kasarna", "Velika stala", "Gradski zid", "Zemljani zid", "Taraba", "Kamenorezac", "Pivnica", "Zamkar","Dvorac heroja", "Veliko skladiste", "Veliki silos", "WW", "Pojiliste"];
		aLangAllResInDorf1 = ["Drvosječa", "Rudnik gline", "Rudnik željeza", "Poljoprivredno imanje"]
		aLangAddTaskText = ["Dodaj zadatak", "Nacin", "Aktivna sela", "Zadata meta", "Prema", "Mod", "Podrska izgradnje", "Koncentracija resursa", "Pomeri gore", "Pomeri dole", "Del", "&#160;&#160;&#160;Task contents", "Pomeri ", "Obrisi sve zadatke"];
		aLangTaskKind = ["Unapredi", "Nova izgradnja", "Napad", "Istrazivanje", "Obuci", "Transport", "NPC", "Rusiti", "Zabava"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Lvl", "Trgovci", "ID", "Glavni grad", "Vreme pocetka", "ovo vremensko podesavanje je beskorisno", "prema", "Selo", "transport", "iz", "Prebacivanje prema", "Prebacivanje iz", "povratak iz", "resursi", "izgradnja", "Napravi novu zgradu", "prazno", "nivo"];
		aLangRaceName = ["Rimljani", "Teutonci", "Gali"];
		aLangTaskOfText = ["Raspored za nadogradnju", "Napravi novi raspored", "AutoResUpD", "Not_run", "Pokreni", "Pokrenuto", "Zaustavi", "Distribucija resursnih polja ovog sela je ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Task list", "Transport sa limitom", "Podrazumevano", "Izmeni", "Drvo/Glina/Gvozdje", "Njiva", "Lista rusenja",
			"Lista napada", "Vrsta napada", "Vreme prevoza", "broj ponavljanja", "Vremenski interval","00:00:00","Meta katapulta","Nasumicno", "Nepoznat", "times", "Mesec", "Dan", "Slanje trupa", "Lista obuke","Mesto obuke","TreningZadatak uraditi","prilagodenTransport","podesi vreme ponovnog ucitavanja "," ovo je interval ponovnog ucitavanja strane, \n podrazumevan vrednost je 20 minuta, molimo vas ubacite novo vreme:\n  \n","Trans_Out_Rmn","Lista zabava","mala zabava","velika zabava"," Podesite interval koncentracie resursa ",
			"minuti", "zaustavljanje", "pokrece se", "pokreni", "pauza","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Premalo resursa. Buahaha :D", "Radnici su vec na poslu :P", "Izgradnja zavrsena", "Pokretanje izgradnje", "U izgradnji", "Skladiste je premalo. Prosirite skladiste kako bi nastavili sa izgradnjom", "Silos je malecak. Prosirite silos kako bi nastavili sa izgradnjom", "Dovoljno resursa","Premalo zita, prvo prosiri njive!","Proslava je u toku"];
		aLangOtherText = ["Vazna napomena", "Samo u glavnom gradu mozete <br/> prosiriti resursna polja preko nivoa 10. Tvoj glavni grad <br/> nije otkriven, poseti svoj profil.", "Precica ovde ^^", "Podesavanja gotova", "Otkazano", "Pokreni zadatke", "Nadogradnja uspesna", "Pokretanje uspesno", "Vase pleme je nepoznato, stoga I tip trupa. Posetite <br/> svoj profil da vidite pleme. <br/>","Posetite dvorac heroja da saznate <br/> brzinu I tip svog heroja "];
		allsourceString = "DrvosecaRudnik glineRudnik gvozjdaNjiva"
		aLangResources=["drvo","glina","gvozdje","zito"];
		allbuildString = "PilanaCiglanaLivnica GvozdjaMlin PekaraSkladišteSilosOruzarnicaKovancina OklopaMejdan ZgradaMesto OkupljanjaPijacaAmbasadaKasarnaStalaRadionicaAkademijaSklonisteOpstinaRezidencijaPalataRiznicaTrgovacki CentarVelika KasarnaVelika StalaGradski ZidZemljani ZidTarabaKamenorezacPivnicaZamkarDvorac HerojaVeliko SkladisteVeliki SilosWWPojiliste"
		aLangTroops[0] = ["Legionar", "Pretorijanac", "Imperijanac", "Izvidjac", "Imperatorova konjica", "Cezareva konjica", "Ovan", "Vatreni katapult", "Senator", "Naseljenik", "Heroj"];
		aLangTroops[1] = ["Batinar", "Kopljanik", "Sekiras", "Izvidjac", "Paladin", "Tetutonski vitez", " Ovan ", "Katapult", "Poglavica", "Naseljenik", "Heroj"];
		aLangTroops[2] = ["Falanga", "Macevalac", "Izvidjac", "Teutateov grom", "Druid", "Heduan", " Ovan ", "Katapult", "Staresina", "Naseljenik", "Heroj"];
		aLangAttackType = ["Pojacanje", "Normalan", "Pljacka"];
		break;

	case "org":
	case "de": // by LohoC
		aLangAllBuildWithId = ["Holzfäller","Lehmgrube","Eisenmine","Getreidefarm","","Sägewerk","Lehmbrennerei","Eisengießerei","Getreidemühle","Bäckerei","Rohstofflager","Kornspeicher","Waffenschmiede","Rüstungsschmiede","Turnierplatz","Hauptgebäude","Versammlungsplatz","Marktplatz","Botschaft","Kaserne","Stall","Werkstatt","Akademie","Versteck","Rathaus","Residenz","Palast","Schatzkammer","Handelskontor","Große Kaserne","Großer Stall","Stadtmauer","Erdwall","Palisade","Steinmetz","Brauerei","Fallensteller","Heldenhof","Großes Rohstofflager","Großer Kornspeicher","Weltwunder","Pferdetränke"];
		aLangAllResInDorf1 = ["Holzfäller","Lehmgrube","Eisenmine","Getreidefarm"];
		aLangAddTaskText = ["Aufgabe hinzufügen","Style","Aktives Dorf","Aufgaben Ziel","nach","Modus","Baubetreuung","Ressourcenkonzentration","Rauf","Runter","Entfernen","   Aufgaben Inhalte","Bewegen ","alle Aufgaben Löschen"];
		aLangTaskKind = ["Upgrade","Neues Gebäude","Angriff","Forschung","ausbilden","Transport","NPC","Zerstören","Fest"];
		maxlevel = ["10","10","10","10","0","5","5","5","5","5","20","20","20","20","20","20","20","20","20","20","20","20","20","10","20","20","20","20","20","20","20","20","20","20","20","10","20","20","20","20","100","20"];
		aLangGameText = ["Lvl","Händler","ID","Hauptdorf","Startzeit","diese Zeiteinstellung ist nicht sinnvoll.","nach","Dorf","Transport","von","Transport nach","Transport von","Zurück von","Rohstoffe","Gebäude","Neues Gebäude errichten","leer","Stufe"];
		aLangRaceName = ["Römer","Germane","Gallier"];
		aLangTaskOfText = ["Zeitplan Upgrade","Zeitplan Neu Bauen","AutoResRauf","Pausiert","Start","Laufend","Unterbrechen","Es wird Gebaut ","Autotransport","Autotransport ist nicht An","AN","Transport Erfolgreich","Aufgabenliste","Transportlimit (-)","Vorgabe","Ändern ","Holz/Lehm/Eisen","G3D","Zeitplan Abriss",
			"Zeitplan Angriff","Angriffsart","Laufzeit","Wiederholungen","Intervalzeit","00:00:00","Katapultziel","Zufall","Unbekannt","mal","Monat","Tag","Truppen senden","Zeitplan Ausbildung","Ausbildungsseite","Ausbildungsauftrag abgeschlossen","Manueller Transport","Setzte Intervalzeit für Reload","Dies ist der Interval zum Seitenreload ,\n Standard sind 20 Minuten, Bitte trage eine neue ein:\n\n","Transportlimit (+)","Partyplanung","Kleine Party","Große Party","Setzte den Interval der Ressourcenkonzentration",
			"Minuten",".",".","START","STOP","Zeitplan Verbessern","Angriff verbessern","Verteidigung verbessern"];
//		aLangErrorText = ["Zuwenig Ressourcen.","Die Arbeiter sind bereits auf Arbeit.","Konstruktion abgeschlossen","Starte Konstruktion","In Entwicklung","Dein Rohstofflager ist zu klein. Bitte baue zuerst das Rohstofflager aus um die Konstruktion fortzusetzten.","Dein Kornspeicher ist zu klein. Bitte baue zuerst das Kornspeicher aus um die Konstruktion fortzusetzten.","Genug Ressourcen","Zuwenig Nahrung: Erweitere deine Getreideproduktion!","Es wird bereits gefeiert."];
		aLangErrorText = ["Zu wenig Rohstoffe","Die Arbeiter sind bereits auf Arbeit.","Konstruktion abgeschlossen","Starte Konstruktion","In Entwicklung","Zuerst Rohstofflager ausbauen","Zuerst Kornspeicher ausbauen","Genug Rohstoffe","Zuwenig Nahrung: Erweitere deine Getreideproduktion!","Es wird bereits gefeiert."];
		aLangOtherText = ["Wichtige Notiz","Nur die Ressourcenfelder der Hauptstadt können<br/>bis Stufe 20 ausgebaut werden. Zur zeit ist deine Hauptstadt<br/>nicht identifiziert. Bitte besuche dein Profil.","Shortcut here ^_^","Setup fertiggestellt","Abgebrochen","Starte die Aufgaben","Upgrade war erfolgreich","Starten war erfolgreich","Deine Rasse ist unbekannt.<br/>Bitte besuche dein Profil.<br/>","Bitte besuche auch deinen Heldenhof um<br/>die Geschwindigkeit und die Art deines Helden zu bestimmen."];
		allsourceString = "HolzfällerLehmgrubeEisenmineGetreidefarm";
		aLangResources = ["Holz","Lehm","Eisen","Getreide"];
		allbuildString = "SägewerkLehmbrennereiEisengießereiGetreidemühleBäckereiRohstofflagerKornspeicherWaffenschmiedeRüstungsschmiedeTurnierplatzHauptgebäudeVersammlungsplatzMarktplatzBotschaftKaserneStallWerkstattAkademieVersteckRathausResidenzPalastSchatzkammerHandelskontorGroße KaserneGroßer StallStadtmauerErdwallPalisadeSteinmetzBrauereiFallenstellerHeldenhofGroßes RohstofflagerGroßer KornspeicherWeltwunderPferdetränke";
		aLangTroops[0] = ["Legionär","Prätorianer","Imperianer","Equites Legati","Equites Imperatoris","Equites Caesaris","Ramme","Feuerkatapult","Senator","Siedler","Held"];
		aLangTroops[1] = ["Keulenschwinger","Speerkämpfer","Axtkämpfer","Kundschafter","Paladin","Teutonenreiter","Ramme","Katapult","Stammesführer","Siedler","Held"];
		aLangTroops[2] = ["Phalanx","Schwertkämpfer","Späher","Theutates Blitz","Druidenreiter","Haeduaner","Ramme","Kriegskatapult","Häuptling","Siedler","Held"];
		aLangAttackType = ["Unterstützung","Angriff: Normal","Angriff: Raubzug"];
		break;

	case "ir": // nekooee
		aLangAllBuildWithId = ["هیزم شکن", "آجرسازی", "معدن آهن", "گندم زار", "", "چوب بری", "آجر پزی", "ذوب آهن", "آسیاب", "نانوایی", "انبار", "انبار غذا", "اسلحه سازی", "زره سازی", "میدان تمرین", "ساختمان اصلی", "اردوگاه", "بازار", "سفارتخانه", "سربازخانه", "اصطبل", "کارگاه", "دارالفنون", "مخفیگاه", "تالار شهر", "اقامتگاه", "قصر", "خزانه", "دفتر تجارت", "سربازخانه بزرگ", "اصطبل بزرگ", "دیوار شهر", "دیوار گلی", "پرچین", "سنگتراشی", "آبجوسازی", "تله ساز","عمارت قهرمان", "انبار بزرگ", "انبار غذای بزگ", "عمارت جادو", "آبخوری اسب ها"];
		aLangAllResInDorf1=["گندم زار", "معدن آهن", "آجر سازی", "هیزم شکن"]
		aLangAddTaskText = ["اضافه کردن وظیفه", "شیوه", "دهکده فعال", "هدف کاری", "به سوی", "روش", "پشتیبانی از سازه ها", "ارسال معمولی (تمرکز منابع)", "بالا بردن", "پایین آوردن", "حذف", "&#160;&#160;&#160;محتوای وظیفه", "حرکت کردن", "پاک کردن تمام وظایف"];
		aLangTaskKind = ["ارتقاء دادن", "بنای جدید", "حمله", "تحقیق", "تربیت کردن", "انتقال دادن", "تعدیل منابع", "تخریب کردن", "برگزاری جشن"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["سطح", "بازرگانان", "شماره", "رئیس", "زمان شروع", "این تنظیم زمان در حال حاضر بی فایده است.", "به سوی", "دهکده", "انتقال دادن", "از", "انتقال به", "انتقال از", "بازگشت از", "منابع", "ساخنمان", "بنای ساختمان جدید", "خالی کردن", "سطح"];
		aLangRaceName = ["رومی ها" ,"توتن ها" ,"گول ها"];
		aLangTaskOfText = ["برنامه ارتقاء", "برنامه ساختمان جدید", "آپدیت اتوماتیک منابع", "در حال اجرا نمی باشد", "شروع", "شروع شده", "معلق کردن", "جدول توزیع منابع در این روستا هست ", "ارسال خودکار منابع", "حمل و نقل خودکار باز نمی باشد", "باز شده", "حمل و نقل با موفقیت", "لیست وظایف", "محدودیت انتقال", "پیشفرض", "اصلاح کردن", "چوب/خشت/آهن", "گندم", "برنامه تخریب",
			"برنامه حمله", "نوع حمله", "زمان سفر", "زمان تکرار", "فاصله زمانی","00:00:00","هدف منجنیق","تصادفی", "نامعلوم", "زمان", "ماه", "روز", "سربازان فرستاده شدند", "برنامه آموزش","محل آموزش","وظیفه آموزش انجام شد","ارسال سفارشی منابع"," فاصله زمانی از زمان راه اندازی مجدد"," این فاصله زمانی از صفحه بارگذاری شده است,\n پیشفرض 20 دقیقه می باشد, لطفا مقدار جدید را وارد کنید زمان:\n\n","Trans_Out_Rmn","برنامه جشن","جشن کوچک","جشن بزرگ"," تنظیم فاصله زمانی حمل معمولی در قسمت ارسال خودکار",
			"دقیقه", "در حال مکث", "در حرکت", "ادامه دادن", "مکث","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["کمبود منابع.", "کارگران مشغول کار می باشند.", "ساخت و ساز پایان یافته", "ساخت و ساز شروع شد", "در حال توسعه", "انبار شما کوچک است لطفا انبار را ارتقاء دهید تا ساخت و ساز ادامه پیدا کند", "انبار غذای شما کوچک است لطفا انبار غذا را ارتقاء دهید تا ساخت و ساز ادامه یابد", "منابع کافی","کمبود مواد غذایی: ابتدا گندم زار را ارتقاء دهید!","در حال حاضر یک جشن در حال برگذاری است"];
		aLangOtherText = ["توجه داشته باشید", "فقط منابع در دهکده پایتخت می توانند <br/>تا سطح 20 ارتقاء یابند. اکنون پایتخت شما<br/> تشخیص داده نشده است. لطفا از پروفایل خود دیدن کنید.", "دسترسی آسان در اینجا ^_^", "تنظیمات کامل شد", "لغو شد", "وظیفه آغاز شد", "ارتقاء با موفقیت انجام شد", "حرکت با موفقیت انجام شد", "نژاد شما معلوم نیست, بنابراین نوع لشکرتون مشخص نیست. <br/>برای مشخص شدن نژادتون از پروفایل خود دیدن کنید.<br/>", "همچنین لطفا دیدن کنید از عمارت قهرمان برای مشخص شدن <br/> سطح و نوع آن."];
		allsourceString = "هیزم شکن آجر سازی معدن آهن گندم زار"
		aLangResources=["گندم","آهن","خشت","چوب"];
		allbuildString = "چوب بری آجرپزی ذوب آهن آسیاب نانوایی انبار انبار غذا اسلحه سازی زره سازی میدان تمرین ساختمان اصلی اردوگاه بازار سفارت سربازخانه اصطبل کارگاه دارالفنون مخفیگاه اقامتگاه قصر خزانه دفتر تجارت سرباز خانه بزرگ اصطبل بزگ دیوار شهر دیوار گلی پرچین سنگ تراشی آبجو سازی تله ساز عمارت قهرمان انبار بزرگ انبار غذای بزرگ عمارت جادو آبخوری اسب ها"
		aLangTroops[0] = ["لژیونر", "محافظ", "شمشیرزن", "خبرچین", "شوالیه", "شوالیه سزار", "دژکوب", "منجنیق آتشین", "سناتور", "مهاجر", "قهرمان"];
		aLangTroops[1] = ["گرزدار", "نیزه دار", "تبرزن", "جاسوس", "دلاور", "شوالیه توتن", "دژکوب", "منجنیق", "رئیس", "مهاجر", "قهرمان"];
		aLangTroops[2] = ["سرباز پیاده", "شمشیرزن", "ردیاب", "رعد", "کاهن سواره", "شوالیه گول", "دژکوب", "منجنیق", "رئیس قبیله", "مهاجر", "قهرمان"];
		aLangAttackType = ["پشتیبانی", "حمله عادی", "حمله غارت"];
		break;

	case "ae": // By Dream1
		aLangAllBuildWithId =  ["الحطاب", "حفرة الطين", "منجم حديد", "حقل القمح", "", "معمل النشارة", "مصنع الطوب", "حديد مسبك", "المطاحن", "مخبز", "المخزن", "مخزن الحبوب", "الحداد", "مستودع الاسلحة", "ساحة البطولة", "المبنى الرئيسي", "نقطة التجمع", "السوق", "السفارة", "الثكنه", "الإسطبل", "المصانع الحربية", "الاكاديميه الحربية", "المخبأ", "البلدية", "السكن", "القصر", "الخزنة", "المكتب التجاري", "الثكنة الكبيرة", "الإسطبل الكبير", "حائط المدينة", "الحائط الأرضي", "الحاجز", "الحجّار", "المعصرة", "الصياد","قصر الأبطال", "المخزن الكبير", "مخزن الحبوب الكبير", "معجزة العالم", "ساقية الخيول"];
		aLangAllResInDorf1=["الحطاب", "حفرة الطين", "منجم حديد", "حقل القمح"]
		aLangAddTaskText = ["أضافة مهمة", "النمط", "القرية النشطة", "المهمة المستهدفة", "الى", "نمط", "دعم للبناء", "تكثيف الموارد", "تحريك للاعلى", "تحريك للاسفل", "حذف", "&#160;&#160;&#160;محتوى المهمه", "تحريك ", "حذف جميع المهام"];
		aLangTaskKind = ["تطوير", "تشييد مبنى", "هجوم", "بحث", "تدريب", "نقل", "تاجر المبادله", "هدم", "الاحتفال"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["مستوى", "التجار", "المعرف", "العاصمة", "بداية الوقت", "هذا الاعداد في الوقت الحالي عديم الفائدة.", " إلى", "القرية", "نقل", "من", "نقل الى", "نقل من", "العودة من", "الموارد", "المباني", "تشييد مبنى جديد", "فارغ", "المستوى"];
		aLangRaceName = ["الرومان", "الجرمان", "الإغريق"];
		aLangTaskOfText = ["الجدول الزمني للترقية", "الجدول الزمني لبناء جديد", "التطوير التلقائي", "لايعمل", "بدأ", "أبتداء", "توقف مؤقتا", "الحقول / المباني توزيع لقرية ", "النقل التلقائي", "لم يتم فتح النقل التلقائي", "فتح", "تم النقل بنجاح", "قائمة المهام", "Trans_In_limit", "أفتراضي", "تعديل", "خشب/طين/حديد", "قمح", "الجدول الزمني للهدم",
			"الجدول الزمني للهجوم", "نوع الهجوم", "وقت الذهاب", "عدد مرات التكرار", "الفاصل الزمني","00:00:00","هدف المقاليع","عشوائي", "غير معروف", "مرات", "شهر", "يوم", "القوات ارسلت", "الجدول الزمني للتدريب","مكان تدريب","مهمة التدريب تمت","الجدول الزمني للنقل","إعداد الفاصل الزمني للتحديث","هذا هو الفاصل الزمني لتحديث الصفحة ,\n الافتراضي هو 20 دقيقة,يرجى وضع فاصل زمني جديد:\n\n","Trans_Out_Rmn","الجدول الزمني للإحتفال","إحتفال صغير","إحتفال كبير","تعيين الفاصل الزمني لتركيز الموارد",
			"دقائق", "متوقف", "يعمل", "تشغيل", "أيقاف","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["الموارد قليلة جداً.", "العمال مشغولون الآن.", "البناء منجز", "بدء البناء", "في التطوير", "يجب رفع مستوى المخزن أولاً ", "يجب رفع مستوى مخزن الحبوب أولاً ", "الموارد كافية","","يوجد احتفال جارية بالفعل"];
		aLangOtherText = ["ملاحظات هامه", "فقط حقول الموارد في العاصمة <br/>يتم ترقيتهم الى مستوى 20 .<br/> لم يتم معرفة العاصمه. يرجاء زيارة بطاقة العضويه.", "الاختصار هنا ^_^", "أكتمال الإعدادات", "ألغي", "بدء المهام", "تم التطوير بنجاح", "تم التشغيل بنجاح", "القبيلة غير معروفه, لابد من معرفة نوع القوات. <br/>يرجاء زيارة بطاقة العضويه لتحديد نوع القبيله.<br/>", "يرجاء ايضاً زيارة قصر الابطال<br/> لتحديد سرعة ونوع بطلك."];
		allsourceString = "الحطابحفرةالطينمنجمحديدحقلالقمح";
		aLangResources=["الخشب","الطين","الحديد","القمح"];
		allbuildString = "الحطابحفرةالطينمنجمحديدحقلالقمحمعملالنشارةمصنعالطوبحديدمسبكالمطاحنمخبزالمخزنمخزنالحبوبالحدادمستودعالاسلحةساحةالبطولةالمبنىالرئيسينقطةالتجمعالسوقالسفارةالثكنهالإسطبلالمصانعالحربيةالاكاديميهالحربيةالمخبأالبلديةالسكنالقصرالخزنةالمكتبالتجاريالثكنةالكبيرةالإسطبلالكبيرحائطالمدينةالحائطالأرضيالحاجزالحجّارالمعصرةالصيادقصرالأبطالالمخزنالكبيرمخزنحبوبكبيرمعجزةالعالمساقيةالخيول";
		aLangTroops[0] = ["جندي أول", " حراس الإمبراطور", "جندي مهاجم", "فرقة تجسس", "سلاح الفرسان", "فرسان القيصر", "الكبش", "المقلاع الناري", "حكيم", "مستوطن", "البطل"]; //الرومان
		aLangTroops[1] = ["مقاتل بهراوة", "مقاتل برمح", "مقاتل بفأس", "الكشاف", "مقاتل القيصر", "فرسان الجرمان", "محطمة الأبواب", "المقلاع", "الزعيم", "مستوطن", "البطل"]; //الجرمان
		aLangTroops[2] = ["الكتيبة", "مبارز", "المستكشف", "رعد الجرمان", "فرسان السلت", "فرسان الهيدوانر", "محطمة الأبواب الخشبية", "المقلاع الحربي", "رئيس", "مستوطن", "البطل"]; //الإغريق
		aLangAttackType = ["مساندة", "هجوم: كامل", "هجوم: للنهب"];
		break;

}
allString = allsourceString + allbuildString;

// Setting game parameters which are not language-specific
var troopspeed = new Array(3);
troopspeed[0] = ["6", "5", "7", "16", "14", "10", "4", "3", "4", "5", ""]; 	// Romain
troopspeed[1] = ["7", "7", "6", "9", "10", "9", "4", "3", "4", "5", ""]; 	// Germain
troopspeed[2] = ["7", "6", "17", "19", "16", "13", "4", "3", "5", "5", ""]; 	// Gaulois

var mts = new Array(3);
mts[0]	= 16;
mts[1]	= 12;
mts[2]	= 24;
myhost = "http://" + window.location.hostname;
var flg = false

  // Auto login code
  if (autoLogin)  loginCheck(document);

  getSingleVillageNum();
  	if (!GM_getValue(myacc() + "_doing")) 
	{
    GM_setValue(myacc() + "_doing", "1");
    TS_debug("can't find doing, set doing = 1");
  	}
  var taskdoing = GM_getValue(myacc() + "_doing");
  if (!GM_getValue(myacc() + "_option")) {
    GM_setValue(myacc() + "_option", "");
  }
  getTaskCookies();
	
  var pagefreshInterval = GM_getValue(myacc() + "_FreshInterval","20");
  var transsInterval = GM_getValue(myacc() + "_TransInterval", "30");
	
  var mybar = document.createElement("div");
  mybar.style.width = "100%";
  mybar.style.backgroundColor = "silver";
  mybar.style.position = "fixed";
  mybar.style.bottom = "0";
  mybar.style.textAlign = "center";
  document.body.insertBefore(mybar, document.body.lastChild.nextSibling);


/***************** Functions adopted from "Travian: Antifarm\Troop saver" script **************************/
  /**
   * XPath wrapper - simplifies searching for items in the document.
   */
  function find(xpath, xpres, startnode)
  {
    if (!startnode) {startnode = document;}
    var ret = document.evaluate(xpath, startnode, null, xpres, null);
    if (ret == null) return null;
    return  xpres == XPFirst ? ret.singleNodeValue : ret;
  }

  /**
   * A function to log debug mesages into Javascript console.
   */
  function TS_debug(text)
  {
    if (logDebugMesages)
			var d = new Date();
			var curr_hour = d.getHours();
			curr_hour = curr_hour + "";
			
			if (curr_hour.length == 1){  curr_hour = "0" + curr_hour; }
			
			var curr_min = d.getMinutes();
			curr_min = curr_min + "";
			
			if (curr_min.length == 1){ curr_min = "0" + curr_min;}
			var curr_sec = d.getSeconds();
			curr_sec = curr_sec + "";
			
			if (curr_sec.length == 1)
			   {
			   curr_sec = "0" + curr_sec;
			   }
			var curr_msec = d.getMilliseconds();
			
//			document.write(curr_hour + ":" + curr_min + ":" 
//			+ curr_sec + ":" + curr_msec);
			
      GM_log(curr_hour + ":" + curr_min + ":" 
			+ curr_sec + "." + curr_msec + " " + text);
  }

  function getFormHidVal(doc, name)
  {
    var ex = ".//input[@type='hidden'][@name='" + name + "']";
    var tag = find(ex, XPFirst, doc);
    if (tag == null)
      return 0;
    return(tag.value);
  }

  /**
   * Returns XPath node of the first form on page, or null if no form.
   */
  function getFormNode(doc)
  {
    var tag;
    tag = find(".//form", XPFirst, doc);
    if (tag == null)
      return null;
    return tag;
  }
  function flag(mess)
  {	
	if (flg){	alert(mess);
	}	
	else { TS_debug(mess);
   }
	}
  /**
   * Sends given 'post' request, with given callback function and data.
   */
  function TS_postRequest(reqUrl,reqData,reqCallback,p1,p2,p3,p4)
  {
    TS_debug("POST: "+reqUrl+" "+reqData);
    GM_xmlhttpRequest({
      method: "POST",
      url: reqUrl,
      headers:{'Content-type':'application/x-www-form-urlencoded',
        },
      data:encodeURI(reqData),
      onload: function(responseDetails) 
      {
        var pulled;
        pulled = document.createElement("div");
        pulled.innerHTML = responseDetails.responseText;
        reqCallback(pulled,p1,p2,p3,p4);
      },
      onerror: function(responseDetails) 
      {
        var pulled;
        pulled = document.createElement("div");
        pulled.innerHTML = responseDetails.responseText;
        reqCallback(pulled,p1,p2,p3,p4);
      }
    });
  }

  /**
   * Sends given 'get' request, with given callback function.
   */
  function TS_getRequest(reqUrl,reqCallback,p1,p2,p3,p4)
  {
    TS_debug("GET REQUEST: "+reqUrl);
    GM_xmlhttpRequest({
      method: "GET",
      url: reqUrl,
      headers: {'Accept': 'application/atom+xml,application/xml,text/xml',
        },
      onload: function(responseDetails) 
      {
        var pulled;
        pulled = document.createElement("div");
        pulled.innerHTML = responseDetails.responseText;
        reqCallback(pulled,p1,p2,p3,p4);
      },
      onerror: function(responseDetails) 
      {
        var pulled;
        pulled = document.createElement("div");
        pulled.innerHTML = responseDetails.responseText;
        reqCallback(pulled,p1,p2,p3,p4);
      }
    });
  }

/*
 * Checks if the player is in login screen.
 * If so, and there's field for name and password, then 'clicks' login button.
 */
function loginCheck(doc)
{
  var loginButton,passButton;
  loginButton = find(".//input[@value='login']", XPFirst, doc);
  passButton = find(".//input[@type='password' and contains(@value, '*')]", XPFirst, doc);
  if((loginButton != null) && (passButton != null))
  {
    TS_debug("loginCheck: login screen detected");
    loginButton.click();
  } else
  {
    TS_debug("loginCheck: not in login screen");
  }
}

/******************* End of "Travian: Antifarm\Troop saver" adoption **************************/

/**
 * Updates the Xlang variable, which is used in language initialization.
 */	
function checkLang()
{
  var host = window.location.hostname;
  hosts = host.split(".");
  Xlang = hosts[hosts.length-1];
}

	function $(id) {return document.getElementById(id);
	}
	
	function h1in() {
		var h1 = document.getElementsByTagName("h1")[0];
		return h1;
	}
		
	function herere() {
		return currentServer() + "_" + getuid() + "_" + currentID();
	}
	
	function myacc() {
		return currentServer() + "_" + getuid();
	}
	
	function currentID() {
		var theboys = document.evaluate("//table[@id='vlist']/descendant::td[@class='dot hl']/following-sibling::td", document, null, XPFirst, null);
//		TS_debug(" resultat evaluate currentID : " + theboys + " --- " + theboys.singleNodeValue);
		if (theboys.singleNodeValue != null) {
			theUrl = theboys.singleNodeValue.innerHTML.match(/newdid=\d{1,}/);
			getit = theUrl.toString().match(/\d{1,}/);
			return getit;
		} else
		{
			return GM_getValue(myacc() + '_singleTownNEWDID');
		}
	}

/**
 * Returns name of the active village.
 */	
function currentVillageName()
{
  var theVillageName = find("//table[@id='vlist']/descendant::a[contains(@href,"+ currentID()+")]", XPFirst);
  if (theVillageName != null)
  {
    return theVillageName.innerHTML;
  } else
  {
    return GM_getValue(myacc() + "_mainvillageName");
  }
}
	
function getuid()
{
//	{v_kir 2010.01.28
//	var tag;
//	tag = find("id('side_navi')/descendant::a[contains(@href,'spieler')]", XPFirst);
    var tag = document.evaluate('//*[@id="side_navi"]//a[contains(@href,"spieler")]', document, null, XPFirst, null);
    if (tag != null)
		tag = tag.singleNodeValue;
	
//	v_kir 2010.01.28}

	if (tag == null)
		tag = find("id('sleft')/descendant::a[contains(@href,'spieler')]", XPFirst);
	if (tag == null) {
		TS_debug("getuid() tag = null: document.documentElement.innerHTML = " + document.documentElement.innerHTML);
	};
	return tag.href.split("uid=")[1];
}

function getAllVillageNewdids()
{
  var allNewdids = new Array();
  var allvillages = find("id('vlist')/descendant::a[@href]", XPSnap);
  if (allvillages.snapshotLength > 0)
  { //multi-villages
    for (var i = 0; i < allvillages.snapshotLength; i++)
    {
      if (allvillages.snapshotItem(i).href.indexOf("newdid") != -1)
      {
        newdiddd = allvillages.snapshotItem(i).href.match(/\d{2,}(?!\.)/); // by Rhayader
        thenewlength = allNewdids.push(newdiddd); //+ ":" + thevillagenum;
      }
    }
  } else
  { // single village
    allNewdids[0] = (GM_getValue(myacc() + '_singleTownNEWDID')) ? GM_getValue(myacc() + '_singleTownNEWDID') : "";
  }
  return allNewdids;
}

function getSingleVillageNum()
{
  if (!GM_getValue(myacc() + '_singleTownNEWDID')) {
  GM_xmlhttpRequest({
				method: 'GET',
				url: myhost + "/dorf3.php",
				onload: function(result){
					var theString = result.responseText.match(/newdid=\d{1,}/);
					var villageNum = theString.toString().match(/\d{1,}/);
					GM_setValue(myacc() + '_singleTownNEWDID', villageNum.toString());
				}
			});
  }
}
	
	
	
function getErrorInfor()
{
  var errors = GM_getValue(herere() + "_currentError");
  return errors;
}
//	TS_debug("======== Start FUNCTION Callback ------------------------------------ getthebuildUrl.readyState : "+getbuildurl.readyState);
//	TS_debug("======== Start FUNCTION Callback ------------------------------------ getthebuildUrl.readyState : "+getbuildurl.status);
//	TS_debug("======== Start ------------------- Village : " + vil + "   getthebuildUrl: Starting, task = "+task);

	function getthebuildUrl(vil, task) {
		TS_debug("getthebuildUrl: Starting, task = "+task + " Village : " + vil);
		var url = myhost + "/build.php?newdid=" + vil + "&id=" + task[1];
		var getbuildurl = new XMLHttpRequest();
		getbuildurl.open('GET', url, false);
		getbuildurl.onreadystatechange = callback;
		getbuildurl.send(null);
		function callback() {
			if (getbuildurl.readyState == 4) {
				if (getbuildurl.status == 200) {
			
//	{v_kir 2010.01.26

					var aDoc = document/*.implementation.createDocument("", "", null)*/;
					var aElem = document.createElement("div");
					aElem.innerHTML = getbuildurl.responseText;
//					aDoc.appendChild(aElem);
					
					switch (task[0]) { // 0_id_level_time_name   upgrade
						case "0":
							TS_debug('========= aDoc.getElementsByTagName("h1")[0].innerHTML = ' + aDoc.getElementsByTagName("h1")[0].innerHTML);
//							var leee=aDoc.getElementsByTagName("h1")[0].innerHTML.split(" ");
							var leee=aDoc.evaluate('//h1', aElem, null, XPFirst, null).singleNodeValue.innerHTML.split(" ");
			
//	v_kir 2010.01.26}

							TS_debug('leee = ' + leee);
							level = leee[leee.length-1];
							GM_setValue(myacc() + "_" + vil + "_crtBuildlevel", level);
							var allanchors = aDoc.evaluate('id("content")//a[contains(@href,"?a=")]', aElem, null, XPFirst, null);
// by shadowx 05/5/2010
							var constructionmasterurl = new String(allanchors.singleNodeValue);
							if(constructionmasterurl.indexOf("&b=") != "-1") 
							{
							TS_debug("Construction Master Enabled, therefore stopping.");
							return false;
							}
							if (allanchors.singleNodeValue) {
								TS_debug("i get the url ,it is " + allanchors.singleNodeValue.href);
								return allanchors.singleNodeValue.href;
							}
							else {
								var errors = aDoc.evaluate('//*[@class="none"]', aElem, null, XPFirst, null); 
								GM_setValue(herere() + "_currentError",errors.singleNodeValue.innerHTML);
								TS_debug("oh No! I can't get the upgrade url, but i get the error info: " + errors.singleNodeValue.innerHTML);
								return false;
							}
							break;
						case "1": // 1_id_level_gid_time_name   newbuild
							var newbdurl = aDoc.evaluate('id("content")//a[contains(@href,"?a='+task[3]+'")]', aElem, null, XPFirst, null);
							if (newbdurl.singleNodeValue) {
								TS_debug("i get the newbuild url ,it is " + newbdurl.singleNodeValue.href);
								return newbdurl.singleNodeValue.href;
							}
							else {
								var h1i = aDoc.getElementsByTagName("h1")[0].innerHTML;
								if (h1i == aLangGameText[15]) {
									var errors = aDoc.evaluate('//*[@class="none"]', aElem, null, XPFirst, null);
									GM_setValue(herere() + "_currentError", errors.singleNodeValue.innerHTML);
									TS_debug("oh No! I can't get the newbuild url, but i get the error info");
									return false;
								}
								else{
									GM_setValue(herere() + "_currentError", "newBuild can't run, something is here.");
									TS_debug("oh No! newBuild can't run, something is here.")
									return false;
								}
							}
							break;
					}
				}
			}
		}
		return callback();
	}

function getcrtlevel() {
	var theTitle = stripHTML(h1in().innerHTML).split(" ");
	if (theTitle.length>2) {
		return theTitle[theTitle.length-1];
	}
}
	
function currentServer() {
	var serverr = window.location.hostname.replace(/\.travian\./, "");
	return serverr;
}
	
function getMainVillageid() {
	TS_debug('come into getMainVillageid()');
	if (window.location.href.split("?uid=")[1] == getuid()) {
		if (window.location.href.indexOf("spieler.php") != -1) {
			var mainvi = document.evaluate('//table[@id="villages"]/descendant::span[@class="none3"]', document, null, XPFirst, null);
			themainv = mainvi.singleNodeValue.parentNode.firstChild.innerHTML;
			mainpos = mainvi.singleNodeValue.parentNode.firstChild.href.match(/\d{2,}(?=&)/);
			GM_setValue(myacc() + "_mainvillageName", themainv);
			GM_setValue(myacc() + "_mainvillageId", getDidFromVillage(themainv));
			for (oo in aLangRaceName) {
				therace = new RegExp(aLangRaceName[oo]);
				if (document.getElementsByTagName("body")[0].innerHTML.match(therace)) {
					GM_setValue(myacc() + "_raceID", oo.toString());
					break;
				}
			}
			coordx=mainvi.singleNodeValue.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.match(/\(-?\d{1,3}/g)[0].match(/-?\d{1,3}/);
			coordy=mainvi.singleNodeValue.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.match(/-?\d{1,3}\)/g)[0].match(/-?\d{1,3}/);
			GM_setValue(myacc() + "_mainVillageCoord", coordx+"/"+coordy);
			GM_setValue(myacc() + "_mainVillagePosition", mainpos.toString());
			GM_deleteValue(myacc() + "_undefined_WarehouseCap");
			GM_deleteValue(myacc() + "_undefined_ResourceNow");
			GM_deleteValue(myacc() + "_undefined_GranaryCap");
		}
	}
}
	
function getResourceCap() {
	resource = [$("l4").innerHTML.split("/")[0], $("l3").innerHTML.split("/")[0], $("l2").innerHTML.split("/")[0], $("l1").innerHTML.split("/")[0]]
	resstring = resource.join("/")
	WarehouseCap = $("l4").innerHTML.split("/")[1];
	GranaryCap = $("l1").innerHTML.split("/")[1];
	GM_setValue(herere() + "_WarehouseCap", WarehouseCap);
	GM_setValue(herere() + "_GranaryCap", GranaryCap);
	GM_setValue(herere() + "_ResourceNow", resstring);
}

function HttpRequire(url, v, ta, k, l){
	TS_debug("come into HttpRequire(), at "+getvillagefromdid(v)+" to build "+ta[ta.length-1]);
	TS_debug("start HttpRequire(" + url + ", " + v + ", " + ta + ", " + k + ", " + l + ")");
	if (url) {
		nurl=url.split(".php?")[0]+".php?newdid="+v+"&"+url.split(".php?")[1];
		TS_debug("GM_xmlhttpRequest url = " + nurl);
		GM_xmlhttpRequest({
			method: 'GET',
			url: nurl,
			headers: "",
			onload: function(){
				switch (k) {
					case "0"://resource updata
						GM_deleteValue(myacc() + "_" + v + "_ResourceUpdataTime");
						GM_setValue(myacc() + "_" + v + "_autoResourceDone", ta[1]);
						if (l >= ta[2]) {
							deleteTaskFromCookie(v, ta);
						}
						break;
					case "1"://build task
						GM_deleteValue(myacc() + "_" + v + "_BuildingUpdataTime");
							switch (ta[0]) {
							case "0"://build updata
								if (l >= ta[2]) {
									deleteTaskFromCookie(v, ta);
								}
								break;
							case "1"://new build
								if (l >= ta[2]) {
									deleteTaskFromCookie(v, ta);
								}
								else {//new build 1_id_level_gid_time_name  to  Updata 0_id_level_time_name
									var changeToUP=new Array();
									changeToUP[0]="0";
									changeToUP[1]=ta[1];
									changeToUP[2]=ta[2];
									changeToUP[3]=ta[4];
									changeToUP[4]=ta[5];
									deleteTaskFromCookie(v, ta,changeToUP);
								}
								break;
						}
						break;
					case "2":
						GM_deleteValue(myacc() + "_" + v + "_UpdataTime");
						GM_setValue(myacc() + "_" + v + "_autoResourceDone", ta[1]);

						switch (ta[0]) {
							case "0":
								if (l >= ta[2]) {
									deleteTaskFromCookie(v, ta);
								}
								break;
							case "1":
								if (l >= ta[2]) {
									deleteTaskFromCookie(v, ta);
								}
								else {//new build 1_id_level_gid_time_name  to  Updata 0_id_level_time_name
									var changeToUP=new Array();
									changeToUP[0]="0";
									changeToUP[1]=ta[1];
									changeToUP[2]=ta[2];
									changeToUP[3]=ta[4];
									changeToUP[4]=ta[5];
									deleteTaskFromCookie(v, ta,changeToUP);
								}
								break;
						}
						break;
				}
				calldoing1()
				printMSG(aLangGameText[7] + getvillagefromdid(v) + aLangOtherText[6]);
				window.location.href=myhost + "/dorf1.php";
				TS_debug("built ok!");
			},
		})
	}
	else {
		var nextt = new Date();
		tt = nextt.getTime()+1800000;
		nextt.setTime(tt);
		switch (k){
			case "0":
				GM_setValue(myacc() + "_" + v + "_ResourceUpdataTime",nextt);
				break;
			case "1":
				GM_setValue(myacc() + "_" + v + "_BuildingUpdataTime",nextt);
				break;
			case "2":
				GM_setValue(myacc() + "_" + v + "_UpdataTime",nextt);
				break;
		}
		calldoing1()
	}
}
		
	function setTaskCookies() { // 1_25_1_undefined_1248453089000_Hero
		taskkindss = $("taskkindss").value;
		crtvillagee = $("crtvillagee").value;
		buildnamee = $("buildNamee").value;
		bidid = $("bidid").value;
		levelselect = $("levelselect").value;
		taskTimee = $("userSetTime").value;
		todday = new Date(taskTimee)
		userSetTime = todday.getTime()
		TS_debug(" setTaskCookies() var = " + taskTimee);
		
		switch (taskkindss) {
			case "0":
				thisTask = taskkindss + "_" + bidid + "_" + levelselect + "_" + userSetTime+"_"+buildnamee
				
				break;
			case "1":
				thisTask = taskkindss + "_" + bidid + "_" + levelselect + "_" + getGidFromName(buildnamee) + "_" + userSetTime+"_"+buildnamee
				break;
		}
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask;
		GM_setValue(herere() + "_waitTask", allTask);
		document.body.removeChild($("taskForm_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"));
		}
		showTaskList();
		getTaskCookies();
	}
	
	
	
	/****************************************************************************/
	var mouseOffset = null;
	var iMouseDown = false;
	var lMouseState = false;
	var dragObject = null;
	var curTarget = null;
	
	
	function setOption(key, value){
		var options = GM_getValue(myacc() + "_option");
		if (options & options != '' & options != null) {
			options = options.split(",");
		}
		else {
			GM_setValue(myacc() + "_option", "");
			options = new Array();
		}
		var myOption = options.indexOf(key);
		if (myOption < 0) {
			options.push(key);
			options.push(value);
		}
		else {
			options[myOption + 1] = value;
		}
		options = options.join(",");
		GM_setValue(myacc() + "_option", options);
	}
	
	function getOption(key, defaultValue, type) {
		var options = GM_getValue(myacc() + "_option");
		options = options.split(",");
		var myOption = options.indexOf(key);
		if (myOption < 0) {
			return defaultValue;
		}
		switch (type) {
			case "boolean":
				var myOption = (options[myOption + 1] == "true") ? true : false;
				break;
			case "integer":
				var myOption = parseInt(options[myOption + 1]);
				break;
			case "string":
			default:
				var myOption = options[myOption + 1];
				break;
		}
		return myOption;
	}
	
	function mouseCoords(ev) {
		return {
			x: ev.pageX,
			y: ev.pageY
		};
	}
	
	function makeClickable(object) {
		object.onmousedown = function() {
			dragObject = this;
		}
	}
	
	function getMouseOffset(target, ev) {
		var docPos = getPosition(target);
		var mousePos = mouseCoords(ev);
		return {
			x: mousePos.x - docPos.x,
			y: mousePos.y - docPos.y
		};
	}
	
	function getPosition(e){
		var left = 0;
		var top = 0;
		while (e.offsetParent) {
			left += e.offsetLeft + (e.currentStyle ? (parseInt(e.currentStyle.borderLeftWidth)).NaN0() : 0);
			top += e.offsetTop + (e.currentStyle ? (parseInt(e.currentStyle.borderTopWidth)).NaN0() : 0);
			e = e.offsetParent;
		}
		left += e.offsetLeft + (e.currentStyle ? (parseInt(e.currentStyle.borderLeftWidth)).NaN0() : 0);
		top += e.offsetTop + (e.currentStyle ? (parseInt(e.currentStyle.borderTopWidth)).NaN0() : 0);
		return {
			x: left,
			y: top
		};
	}
	
	function mouseMove(ev) {
		var target = ev.target;
		var mousePos = mouseCoords(ev);
		
		if (dragObject) {
			dragObject.style.position = 'fixed';
			dragObject.style.top = (mousePos.y - mouseOffset.y) + "px";
			dragObject.style.left = (mousePos.x - mouseOffset.x) + "px";
		}
		lMouseState = iMouseDown;
		return false;
	}
	
	function mouseUp(ev) {
		if (dragObject) {
			switch (dragObject.id) {
				case "demolistform_wrapper":
					var key = "DEMOLISH_POSITION";
					break;
				case "tranlmtform_wrapper":
					var key = "TRANLMT_POSITION";
					break;
				case "tasklisttable_wrapper":
					var key = "TASKLIST_POSITION";
					break;				
				case "taskForm_wrapper":
					var key = "FORM_POSITION";
					break;
				case "tranForm_wrapper":
					var key = "TRAN_POSITION";
					break;
				case "MSG_wrapper":
					var key = "MSG_POSITION";
					break;
				default:
					var key = "LIST_POSITION";
					break;
			}
			setOption(key, dragObject.style.top + "_" + dragObject.style.left);
		}
		dragObject = null;
		iMouseDown = false;
	}
	
	function mouseDown(ev) {
		var mousePos = mouseCoords(ev);
		var target = ev.target;
		iMouseDown = true;
		if (target.getAttribute('DragObj')) {
			return false;
		}
	}
	
	
	function makeDraggable(item) {
		if (!item) 
			return;
		item.addEventListener("mousedown", function(ev){
			dragObject = this.parentNode;
			mouseOffset = getMouseOffset(this.parentNode, ev);
			return false;
		}, false);
	}
	
	document.addEventListener("mousemove", mouseMove, false);
	document.addEventListener("mousedown", mouseDown, false);
	document.addEventListener("mouseup", mouseUp, false);


	/****************************************************************************/

	function createDemolishlnk() {
		var nposi=$("contract");
		var errors = document.evaluate('//p[@class="none"]', document, null, XPFirst, null);
		nextposition=(nposi)?nposi:errors.singleNodeValue;
		var demolishdiv=document.createElement("div");
		demolishdiv.id="demolishdiv";
		var demolishlnk=document.createElement("a");
		demolishlnk.id="demolishlnk";
		demolishlnk.href="#";
		demolishlnk.innerHTML="&#160;&#160;"+aLangTaskOfText[18] +"&#160;&#160;";
		demolishlnk.addEventListener("click", createDemolishFloat, false);
		demolishdiv.appendChild(demolishlnk);
		nextposition.parentNode.insertBefore(demolishdiv,nextposition);
	}
	
//-----------------------------------------------------------------------------------------------
// Create link for option update and other
//-----------------------------------------------------------------------------------------------
	
	
	function createNewbuildLnk() { 
//		flag('START 1 Create New Build Link new build'); 
		TS_debug('FM ----------- Creation d un nouveau batiment');
		crtvillagedid = currentID();
		buildnextlevel="1";
		buildidss = window.location.href.match(/[^d]id=\d{1,2}/);
		buildidid = buildidss.toString().match(/\d{1,2}/);		
		var allnewbuilds = document.evaluate('//div[@id="build"]/table[@class="new_building"]', document, null, XPSnap, null);
		for (var i = 0; i < allnewbuilds.snapshotLength; i++) {
			buildName=allnewbuilds.snapshotItem(i).previousSibling.previousSibling.innerHTML;
			buildName=(buildName.indexOf(aLangAllBuildWithId[10])!=-1)?aLangAllBuildWithId[10]:((buildName.indexOf(aLangAllBuildWithId[11])!=-1)?aLangAllBuildWithId[11]:buildName)
			buildgid=getGidFromName(buildName);
			buildmaxlevel = parseInt(maxlevel[buildgid],10);
			theposition = allnewbuilds.snapshotItem(i).lastChild;
			
			var createUrl = document.createElement("a");
			createUrl.id = "createnewurl";
			createUrl.href = "#";
			createUrl.innerHTML = "&#160;&#160;--> " + aLangTaskOfText[1]+"&#160;&#160;" ;
			createUrl.setAttribute("crtvillage", crtvillagedid);
			createUrl.setAttribute("buildName", buildName);
			createUrl.setAttribute("buildnextlevel", buildnextlevel);
			createUrl.setAttribute("buildmaxlevel", buildmaxlevel);
			createUrl.setAttribute("buildgid", buildgid);
			createUrl.setAttribute("buildidid", buildidid);
			createUrl.addEventListener("click", createUpdateFloat, false);
 			theposition.parentNode.insertBefore(createUrl, theposition.nextSibling);
 			TS_debug('Value : Crtvillageid=' + crtvillagedid+' / BuildName=' + buildName+' / buildnextlevel=' + buildnextlevel+' / buildmaxlevel=' + buildmaxlevel+' / Buildidid=' + buildidid + ' / Buildgid=' + buildgid);
//    			flag('1 --- boucle for '+i+' buildName=');
// FM avant 			theposition.appendChild(createUrl);
		}
 			TS_debug('FM theposition.appendChild(createUrl) =' + createUrl + " The Position.nextSibling=" + theposition.nextSibling);
 			TS_debug('FM Creating NEW Build Link :' + createUrl + ' / Buildidid=' + buildidid + ' / Buildgid=' + buildgid);
//	flag('END 1 Create New Build Link new build'); 
	}

	function stripHTML(){
		var re= /<\S[^><]*>/g
		return arguments[0].replace(re, "");
	}
	
	function createbuildlink() {
		crtvillagedid = currentID();
		TS_debug("START --- function CreateBuiltLink - Upgrade de ELEMENT " + crtvillagedid);
//		TS_debug('for Village: ' + crtvillagedid);
		mainv1 = GM_getValue(myacc() + "_mainvillageId");
//		TS_debug("inner = " + h1in().innerHTML);
//		TS_debug("inner2 = " + stripHTML(h1in().innerHTML));
		h1inner = stripHTML(h1in().innerHTML).split(" ");
		crtlevel = parseInt(h1inner[h1inner.length-1]);
//		TS_debug("h1inner.length = " + h1inner.length);
		switch (h1inner.length) {
			case 3:
				buildName = h1inner[0];
				break;
			case 4:
				buildName = h1inner[0] + " " + h1inner[1];
				break;
			case 5:
				buildName = h1inner[0] + " " + h1inner[1] + " " + h1inner[2];
				break;
			case 6:
				buildName = h1inner[0] + " " + h1inner[1] + " " + h1inner[2] + " " + h1inner[3];
				break;
		}
		buildmaxlevel = -1;
		for (yyy in aLangAllBuildWithId) {
			if (buildName == aLangAllBuildWithId[yyy]) {
				buildmaxlevel = parseInt(maxlevel[yyy]);
				if ((crtvillagedid == mainv1) && (yyy < 5)) {
					buildmaxlevel *= 2; //mainvillage resource level 20
				}
			}
		}
		if (buildmaxlevel == -1) return '';
		if (crtlevel < buildmaxlevel) {
			buildnextlevel = crtlevel + 1;
			if (window.location.href.indexOf("&gid=17") != -1) {
				var rere = document.evaluate('id("textmenu")/descendant::a[@href]', document, null, XPFirst, null);
				buildidid = rere.singleNodeValue.href.split("id=")[1]
			}
			else {
				buildidss = window.location.href.match(/[^dg]id=\d{1,2}/);
				buildidid = buildidss.toString().match(/\d{1,2}/);
			}
			
			if ($("contract")) { // Individual update building
				theposition = $("contract"); //.nextSibling;
				var createUrl = document.createElement("a");
				createUrl.id = "createUrl";
				createUrl.href = "#";
				createUrl.innerHTML = "&#160;&#160;" + aLangTaskOfText[0] + "&#160;&#160;";
				createUrl.setAttribute("crtvillage", crtvillagedid);
				createUrl.setAttribute("buildName", buildName);
				createUrl.setAttribute("buildnextlevel", buildnextlevel);
				createUrl.setAttribute("buildmaxlevel", buildmaxlevel);
				createUrl.setAttribute("buildidid", buildidid);
				createUrl.addEventListener("click", createUpdateFloat, false);
	  			TS_debug('FM S Upgrade batiment commande : theposition.parentNode.insertBefore(createUrl, theposition.nextSibling); ');
				theposition.parentNode.insertBefore(createUrl, theposition.nextSibling);
	  			TS_debug('FM E Upgrade batiment commande : theposition.parentNode.insertBefore(createUrl, theposition.nextSibling); ');
			}
		}
//		flag('END 2 --- CreateBuiltLink - Upgrade de BATIMENT ');
	}
	
	/*
	 * Creates a floating GUI box with demolition parameters.
	 */
	function createDemolishFloat()
	{
		var options=document.evaluate('//select[@name="abriss"]/descendant::option', document, null, XPSnap, null);
		myoptions="";
		for (var i=0; i<options.snapshotLength; i++) {
			if(options.snapshotItem(i).innerHTML.indexOf(aLangGameText[16]) != -1) { continue; }
			myoptions+="<option value='"+options.snapshotItem(i).innerHTML+"'>"+options.snapshotItem(i).innerHTML+"</option>"
		}
		var DemoListForm=document.createElement("form");
		DemoListForm.id="demolistform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"demolistform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		DemoListForm.innerHTML = floatClose;
		DemoListForm.innerHTML += "<br/>" + aLangTaskOfText[18].big() +"<br/><br/>";
		DemoListForm.innerHTML+=  aLangGameText[7] + ":  <select id='crtvillagee' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br/><br/>";
		DemoListForm.innerHTML+=aLangTaskOfText[18]+": <select id='selecteddemo'>"+myoptions+"</select><br/><br/>"

		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setDemoCookies, true);
		DemoListForm.appendChild(tSubmitBtn);
		
		var doWrapper = document.createElement("div");
		doWrapper.id = "demolistform_wrapper";
		doWrapper.appendChild(DemoListForm);
		
		var formCoords = getOption("DEMOLISH_POSITION", "218px_468px");
		formCoords = formCoords.split("_");
		doWrapper.style.top = formCoords[0];
		doWrapper.style.left = formCoords[1];
		
		document.body.appendChild(doWrapper);
		makeDraggable($("demolistform"));		
	}
	/*
	 * Creates a party.
	 */

	function createPartylnk()
	{
	  	flag('FM S creatPartylnk ');
		var thePosi=document.getElementsByClassName("gid24")[0];
		var Partylnk = document.createElement("a");
		Partylnk.id = "partylnk";
		Partylnk.href = "#";
		Partylnk.innerHTML = "&#160;&#160;" + aLangTaskOfText[39] + "&#160;&#160;";
		Partylnk.addEventListener("click", createPartyFloat, false);
		thePosi.appendChild(Partylnk);
	}
//
// investigate
//
	function createPartyFloat()
	{
		flag("creatPartyFloat ----------------- The ID : " + buildidid);
		var partyForm = document.createElement("form");
		partyForm.id = "partyform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"partyform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";

		partyForm.innerHTML = floatClose;
	  	flag("FM S CreatePartyFloat 3 partyid;" + buildidid);
//		var partyid=document.getElementsByTagName("input");// [0]; //.value;
		partyid = buildidid;
		var h1inn = stripHTML(h1in().innerHTML).split(" ");
		bblevel = h1inn[h1inn.length - 1];
		partyForm.innerHTML += "<br/>" + aLangTaskOfText[39].big() + "<br/><br/>";
		partyForm.innerHTML += aLangAddTaskText[2] + ":  <select id='crtvv' disabled=true><option value='" + partyid + "'>" + currentVillageName() + "</option></select><br/>";
  		TS_debug("FM S CreatePartyFloat 7");
		if (parseInt(bblevel)<10){
			TS_debug("FM S CreatePartyFloat : parseInt(bblevel)<10 ");
			partyForm.innerHTML += aLangAddTaskText[1] + ":<select id='partykind'  disabled=true><option value='1'>" + aLangTaskOfText[40] + "</option>";
		}
		else{
			TS_debug('FM S CreatePartyFloat : parseInt(bblevel)<10 ');
			partyForm.innerHTML += aLangAddTaskText[1] + ":<select id='partykind' ><option value='1'>" + aLangTaskOfText[40] + "</option><option value='2'>" + aLangTaskOfText[41] + "</option>";
		}

		partyForm.innerHTML +="</select><br/><br/>";
		
		tod = new Date();
		ye = tod.getFullYear();
		mon = tod.getMonth() + 1;
		dat = tod.getDate();
		hou = tod.getHours();
		if (hou < 10) {hou = "0" + hou;
		}
		minu = tod.getMinutes();
		if (minu < 10) {minu = "0" + minu;
		}
		sec = tod.getSeconds();
		if (sec < 10) {sec = "0" + sec;
		}
		nowtime = ye + "/" + mon + "/" + dat + " " + hou + ":" + minu + ":" + sec;
		partyForm.innerHTML += aLangGameText[4] + ":&#160;&#160;<input type='text' id='startime' style='width:146px' value='" + nowtime + "' /><br/>";
		partyForm.innerHTML += aLangTaskOfText[22] + ":&#160;<input type='text' id='repeat' style='width:30px' value='0' /><br/><br/>";
	  TS_debug('FM_createPartyFloat : ye=' + ye + " mon=" + mon + " dat=" + dat + " hou=" + hou + " minu=" + minu  );
		
		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.name = "submitBtn";
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setPartyCookies, true);
		partyForm.appendChild(tSubmitBtn);
		
		var tWrapper = document.createElement("div");
		tWrapper.id = "partyform_wrapper";
		tWrapper.appendChild(partyForm);
		
		var formCoords = getOption("PARTY_POSITION", "118px_468px");
		formCoords = formCoords.split("_");
		tWrapper.style.top = formCoords[0];
		tWrapper.style.left = formCoords[1];
		
		document.body.appendChild(tWrapper);
		makeDraggable($("partyform"));
	}
	
	
	function setPartyCookies(){
	  	TS_debug("FM ----------------------------------- SetCookiest");
		partyid=$("crtvv").value;
		partykind =$("partykind").value;
		repeat=$("repeat").value;
		var startt=new Date($("startime").value);
		startTime=startt.getTime();
	//------------------------------------------------		//6_1_1000_1245413194000_id
		thisTask = "6_" + partykind + "_" + repeat + "_"+ startTime+"_"+partyid;
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask;
		GM_setValue(herere() + "_waitTask", allTask);
	//---------------------------------------------------------------------------------------------------------------
		document.body.removeChild($("partyform_wrapper"));
		if ($("tasklisttable_wrapper")) {document.body.removeChild($("tasklisttable_wrapper"));
		}
		showTaskList();
		getTaskCookies();
		msg = aLangTaskOfText[39].bold() + " " + aLangOtherText[3];
		printMSG(msg);
	}
	
function createImprovelink() // class="none"
{
  TS_debug('======================= Come into "createImprovelink"');
  if ($("contract"))
  {
//    theposition = $("contract").nextSibling;
    theposition = $("contract")
	  TS_debug('FM regular position');
  } else
  {
    theposition = find("//p[@class='none']", XPFirst);
	  TS_debug('FM lookup position : ' + theposition);
  }
  var createImprove = document.createElement("a");
  createImprove.id = "createImprove";
  createImprove.href = "#";
  createImprove.innerHTML = "&#160;&#160;" + aLangTaskOfText[48] + "&#160;&#160;";
  createImprove.addEventListener("click", createImproveFloat, false);
  theposition.parentNode.insertBefore(createImprove, theposition.nextSibling);
//  theposition.insertBefore(createImprove, theposition.nextSibling);
}
	
	
	function createImproveFloat(){
		flag(" ----------- createImproveFloat()");
		var h1innI = stripHTML(h1in().innerHTML).split(" ");
		switch (h1innI.length) {
			case 3:
				ibName = h1innI[0];
				break;
			case 4:
				ibName = h1innI[0] + " " + h1innI[1];
				break;
			case 5:
				ibName = h1innI[0] + " " + h1innI[1] + " " + h1innI[2];
				break;
			case 6:
				ibName = h1innI[0] + " " + h1innI[1] + " " + h1innI[2] + " " + h1innI[3];
				break;
		}
		iblevel=h1innI[h1innI.length-1]

		var ImproveForm = document.createElement("form");
		ImproveForm.id = "improveform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"improveform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		ImproveForm.innerHTML = floatClose;
		
		ImproveForm.innerHTML += "<br/>" + aLangTaskOfText[48].big() + "<br/><br/>";
		ImproveForm.innerHTML += aLangAddTaskText[2] + ":  <select id='crtv' disabled=true><option value='crtv'>" + currentVillageName() + "</option></select><br/><br/>";

		switch (ibName){
			case aLangAllBuildWithId[12]:
				ImproveForm.innerHTML += aLangAddTaskText[1] + ":<select id='improvekind'  disabled=true><option value='1'>" + aLangTaskOfText[49] + "</option></select><br/><br/>";
			break;
			case aLangAllBuildWithId[13]:
				ImproveForm.innerHTML += aLangAddTaskText[1] + ":<select id='improvekind'  disabled=true><option value='2'>" + aLangTaskOfText[50] + "</option></select><br/><br/>";
			break;
		}
		
		ImproveForm.innerHTML += aLangAddTaskText[3] + ":  " + getImproveTroops(iblevel)+"<br/><br/>";
		ImproveForm.innerHTML += aLangAddTaskText[4] + ":  " + levelselect(1, iblevel)+"<br/><br/><br/>";

		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.name = "submitBtn";
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setImproveCookies, true);
		ImproveForm.appendChild(tSubmitBtn);
		
		var iWrapper = document.createElement("div");
		iWrapper.id = "improveform_wrapper";
		iWrapper.appendChild(ImproveForm);
		
		var formCoords = getOption("IMPRO_POSITION", "118px_468px");
		formCoords = formCoords.split("_");
		iWrapper.style.top = formCoords[0];
		iWrapper.style.left = formCoords[1];
		
		document.body.appendChild(iWrapper);
		makeDraggable($("improveform"));
	}
	
	function setImproveCookies(){
		idss = window.location.href.match(/[^dg]id=\d{1,2}/);
		idid = idss.toString().match(/\d{1,2}/);
		imkind=$("improvekind").value;
		troopkindSN=$("improveTroops").value;
		impTarget=$("levelselect").value;
		var sotime=new Date();
		
		thisTask = "3_" + imkind +"_" + idid + "_" + troopkindSN + "_" +impTarget+"_"+sotime.getTime();
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(herere() + "_waitTask", allTask)
		document.body.removeChild($("improveform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"));
		}
		showTaskList()
		getTaskCookies()
	}
	
	function getImproveTroops(maxlvl) {
		TS_debug(" getImproveTroops(maxlvl) ");
//		var gettroops=document.evaluate('//td[@class="desc"]', document, null, XPSnap, null);
		var gettroops=document.evaluate('//div[@class="tit"]//a', document, null, XPSnap, null);
		TS_debug(" resultat document.evaluate" + gettroops);
		var gettroopslevel=document.evaluate('//td[@class="desc"]/*/span[@class="info"]', document, null, XPSnap, null);
		var myRace1=Number(GM_getValue(myacc() + "_raceID"));
		TS_debug("gettroops.snapshotLength = " + gettroops.snapshotLength);
		var troopsSelect="<select id='improveTroops'>";
			for (var i=0; i<gettroops.snapshotLength; i++) {
				TS_debug(gettroops.snapshotItem(i).innerHTML);
//				var troopname=gettroops.snapshotItem(i).firstChild.nextSibling.innerHTML;
				var troopname=gettroops.snapshotItem(i).innerHTML;
				TS_debug('TroopLevel (' + troopname + ') = ' + gettroopslevel.snapshotItem(i).innerHTML);
//				var trooplevel=gettroops.snapshotItem(i).firstChild.nextSibling.nextSibling.nextSibling.innerHTML.split(" ")[1].split(")")[0];
				var trooplevel0=gettroopslevel.snapshotItem(i).innerHTML.replace(/\s/g," ").split(" ");
				var trooplevel=trooplevel0[trooplevel0.length-1].split(")")[0];
				TS_debug('TroopLevel (' + troopname + ') = ' + trooplevel);
				if (trooplevel==maxlvl) { continue; }
				for (mr in aLangTroops[myRace1]){
//					TS_debug("aLangTroops[myRace1][mr] = " + aLangTroops[myRace1][mr]);;
					if (aLangTroops[myRace1][mr]==troopname){
						troopsSelect += "<option  value='"+troopname+"_"+ (Number(mr)+1) +"'>"+troopname+"</option>";
						break;
					}
				}
			}
			troopsSelect+="</select>";
		return troopsSelect;
	}
	
	function setDemoCookies() {
		selecteddemo = $("selecteddemo").value;
		theID=selecteddemo.split(". ")[0];
		adesa=selecteddemo.split(". ")[1].split(" ");
		crtlevel=adesa[adesa.length-1];
		regexp11=new RegExp(" "+crtlevel);
		theBuild=selecteddemo.split(". ")[1].replace(regexp11,"");
		thisTask = "7_" + theID +"_" + crtlevel + "_" + currentID() + "_" +theBuild
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask;
		GM_setValue(herere() + "_waitTask", allTask);
		document.body.removeChild($("demolistform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"));
		}
		showTaskList();
		getTaskCookies();
	}
	
	function getGidFromName(name){
		for (i in aLangAllBuildWithId) {
			if (aLangAllBuildWithId[i] == name) {
				return i;
			}
		}		
	}
	
	
	function createAutoResLink(){
		var producee = $("production");
		var autoResDiv = document.createElement("div");
		autoResDiv.id = "autoResdiv";
		autoResDiv.innerHTML = aLangTaskOfText[2].bold() + ":&#160;&#160;";
		producee.parentNode.insertBefore(autoResDiv, producee.nextSibling);

		
		var autoResStatus = GM_getValue(herere() + "_autoResource", "0");
		if (autoResStatus == "0") {
			autoResDiv.innerHTML += aLangTaskOfText[3].fontcolor("gray") + "&#160;&#160;";
			var autoResLnk = document.createElement("a");
			autoResLnk.id = "autoResform1";
			autoResLnk.href = "#";
			autoResLnk.innerHTML = aLangTaskOfText[4];
			autoResLnk.addEventListener("click", createAutoResFloat, false);
		}
		else {
			autoResDiv.innerHTML += aLangTaskOfText[5].fontcolor("green") + "&#160;&#160;";
			var autoResLnk = document.createElement("a");
			autoResLnk.id = "autoResform2";
			autoResLnk.href = "#";
			autoResLnk.innerHTML = aLangTaskOfText[6];
			autoResLnk.addEventListener("click", closeAutoRes, false);
		}
		autoResDiv.appendChild(autoResLnk);

/********************************** transport limit here **************************************************/
		var transLimit=document.createElement("div");
		transLimit.id="translimit";
		transLimit.innerHTML=aLangTaskOfText[13].bold() + ":&#160;&#160;";
		autoResDiv.parentNode.insertBefore(transLimit, autoResDiv.nextSibling);
		
		var userTranSetup = GM_getValue(herere() + "_userTranSetup", "false");
		transLimit.innerHTML+=(userTranSetup=="false")?aLangTaskOfText[14]:userTranSetup;
		transLimit.innerHTML+="&#160;&#160;";
		
		var changeIt=document.createElement("a");
		changeIt.id="changeit";
		changeIt.href="#";
		changeIt.innerHTML=aLangTaskOfText[15];
		changeIt.addEventListener("click", createTranLimitFlt, false);
		transLimit.appendChild(changeIt);
/***********************************transport limit here***************************************************/
/***********************************transport remain here***************************************************/
		var resRemain=document.createElement("div");
		resRemain.id="resremain";
		resRemain.innerHTML=aLangTaskOfText[38].bold() + ":&#160;&#160;";
		autoResDiv.parentNode.insertBefore(resRemain, transLimit.nextSibling);
		
		var userRemainSetup = GM_getValue(herere() + "_userRemainSetup", "false");
		resRemain.innerHTML += (userRemainSetup=="false")?aLangTaskOfText[14]:userRemainSetup;
		resRemain.innerHTML += "&#160;&#160;";
		
		var changeIt2=document.createElement("a");
		changeIt2.id="changeit2";
		changeIt2.href="#";
		changeIt2.innerHTML=aLangTaskOfText[15];
		changeIt2.addEventListener("click", createResRemainFlt, false);
		resRemain.appendChild(changeIt2);
/***********************************transport remain here***************************************************/
	} 
	
	function createResRemainFlt(){
		var userRemainSetup = GM_getValue(herere() + "_userRemainSetup", "false");
		usersetup2=(userRemainSetup=="false")?aLangTaskOfText[14]:userRemainSetup;
		var resRemainForm = document.createElement("form");
		resRemainForm.id = "resremainform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"resremainform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		resRemainForm.innerHTML = floatClose;
		resRemainForm.innerHTML += "<br/>" + aLangTaskOfText[15].big() +aLangTaskOfText[38].big()+"<br/><br/>";
		resRemainForm.innerHTML += aLangGameText[7] + ":  <select id='crtvi'><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br/><br/>";
		resRemainForm.innerHTML += aLangTaskOfText[38]+":  <select id='crtremain'><option value='" + usersetup2 + "'>" + usersetup2 + "</option></select><br/><br/>";
		resRemainForm.innerHTML += aLangTaskOfText[15]+aLangGameText[6]+":  <select id='resrrremain'>"+resLimitOption() + "</select>";
		resRemainForm.innerHTML += "  "+"<select id='cropremain'>"+cropLimitOption() + "</select><br/><br/>";

		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setResRmnCookies, true);
		resRemainForm.appendChild(tSubmitBtn);
		
		var tWrapper = document.createElement("div");
		tWrapper.id = "resremainform_wrapper";
		tWrapper.appendChild(resRemainForm);
		
		var formCoords = getOption("RESREMAIN_POSITION", "218px_468px");
		formCoords = formCoords.split("_");
		tWrapper.style.top = formCoords[0];
		tWrapper.style.left = formCoords[1];
		
		document.body.appendChild(tWrapper);
		makeDraggable($("resremainform"));		
	}
	
	function setResRmnCookies(){
		var userSet = new Array()
		userSet[0] = $("resrrremain").value;
		userSet[1] = $("cropremain").value;
		if (userSet[0] == "default" || userSet[1] == "default") {
			GM_deleteValue(herere() + "_userRemainSetup")
		}
		else {
			GM_setValue(herere() + "_userRemainSetup", userSet.join("/"))
		}
		document.body.removeChild($("resremainform_wrapper"));
		$("autoResdiv").parentNode.removeChild($("autoResdiv"))
		$("translimit").parentNode.removeChild($("translimit"))
		$("resremain").parentNode.removeChild($("resremain"))
		createAutoResLink()
		msg = aLangTaskOfText[38].bold() + " " + aLangOtherText[3];
		printMSG(msg)
	}
	
	function createTranLimitFlt() {
		var userTranSetup = GM_getValue(herere() + "_userTranSetup", "false");
		usersetup=(userTranSetup=="false")?aLangTaskOfText[14]:userTranSetup;
		var TransLimitForm = document.createElement("form");
		TransLimitForm.id="translimitform"
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"tranlmtform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		TransLimitForm.innerHTML = floatClose;
		TransLimitForm.innerHTML += "<br/>" + aLangTaskOfText[15].big() +aLangTaskOfText[13].big()+"<br/><br/>";
		TransLimitForm.innerHTML += aLangGameText[7] + ":  <select id='crtvillagee'><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br/><br/>";
		TransLimitForm.innerHTML += aLangTaskOfText[13]+":  <select id='crtlimit'><option value='" + usersetup + "'>" + usersetup + "</option></select><br/><br/>";
		TransLimitForm.innerHTML += aLangTaskOfText[15] + aLangGameText[6] + ":  <select id='reslimitto'>"+resLimitOption() + "</select>";
		TransLimitForm.innerHTML += "  "+"<select id='croplimitto'>"+cropLimitOption() + "</select><br/><br/>";

		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setTranLmtCookies, true);
		TransLimitForm.appendChild(tSubmitBtn);
		
		var tWrapper = document.createElement("div");
		tWrapper.id = "tranlmtform_wrapper";
		tWrapper.appendChild(TransLimitForm);
		
		var formCoords = getOption("TRANLMT_POSITION", "218px_468px");
		formCoords = formCoords.split("_");
		tWrapper.style.top = formCoords[0];
		tWrapper.style.left = formCoords[1];
		
		document.body.appendChild(tWrapper);
		makeDraggable($("translimitform"));		
	}
	
	function setTranLmtCookies(){
		var userSet = new Array()
		userSet[0] = $("reslimitto").value;
		userSet[1] = $("croplimitto").value;
		if (userSet[0] == "default" || userSet[1] == "default") {
			GM_deleteValue(herere() + "_userTranSetup")
		}
		else {
			GM_setValue(herere() + "_userTranSetup", userSet.join("/"))
		}
		document.body.removeChild($("tranlmtform_wrapper"));
		$("autoResdiv").parentNode.removeChild($("autoResdiv"));
		$("translimit").parentNode.removeChild($("translimit"));
		$("resremain").parentNode.removeChild($("resremain"));
		createAutoResLink()
		msg = aLangTaskOfText[13].bold() + " " + aLangOtherText[3];
		printMSG(msg)
	}
	
	function resLimitOption(){
		var WareCap = GM_getValue(herere() + "_WarehouseCap");
		WareCap=parseInt(WareCap)
		var string="<option value='"+WareCap*0.8+"'>"+aLangTaskOfText[16]+"</option><option value='default'>"+aLangTaskOfText[14]+"</option>";
		for(i=10; i<101; i=i+10){
			cnm=(WareCap*i/100).toString();
			string += "<option value='" + cnm + "'>" + cnm + "</option>";
		}
		return string;
	}
	
	
	function cropLimitOption(){
		var GranCap = GM_getValue(herere() + "_GranaryCap");
		GranCap=parseInt(GranCap)
		var string="<option value='"+GranCap*0.8+"'>"+aLangTaskOfText[17]+"</option><option value='default'>"+aLangTaskOfText[14]+"</option>"
		for(i=10;i<101;i=i+10){
			rpy=(GranCap*i/100).toString()
			string += "<option value='" + rpy + "'>" + rpy + "</option>"
		}
		return string
	}
	
	/**
	 * Creates a floating GUI box for sheduling attack.
	 */
	function createAttackFloat()
	{
		// Create the form
		var AttackForm = document.createElement("form");
		AttackForm.id = "attackform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"attackform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		AttackForm.innerHTML = floatClose;

		var tag,subTag;
		if (!GM_getValue(myacc() + "_raceID")) { 
			AttackForm.innerHTML += "<br/>" + aLangOtherText[0].big() + "!!!<br/><br/>" + aLangOtherText[8] + "<br/><br/>";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			privateeee=(privateee.singleNodeValue)?privateee:privatee;
			AttackForm.innerHTML += aLangOtherText[2] + ":    <a href='" + privateeee.singleNodeValue.href + "'>&#160;&#160;&#160;&#160;&#160;" + privateeee.singleNodeValue.innerHTML + "</a><br/><br/>";
			AttackForm.innerHTML += aLangOtherText[9] + "<br/><br/>";
		} else
		{
			AttackForm.innerHTML += "<br/>" + aLangTaskOfText[19].big() + "<br/><br/>";
			AttackForm.innerHTML += aLangAddTaskText[2] + ":  <select id='crtvill' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br/>";
			AttackForm.innerHTML += aLangAddTaskText[4] + ": &#160;&#160;X:&#160;<input type='text' style='width:40px' id='xcoord' value='" + document.getElementsByName("x")[0].value + "' />&#160;Y:&#160;<input type='text' style='width:40px' id='ycoord' value='" + document.getElementsByName("y")[0].value + "'/><br/>"

			// Create attack type selection field
			var attackTse = null;
			var attacktypes = document.evaluate('//table[@ id="coords"]/descendant::input[@type="radio"]', document, null, XPSnap, null);
			for (var i = 0; i < attacktypes.snapshotLength; i++) {
				if (attacktypes.snapshotItem(i).checked) {
					attackTse = i + 2;
				}
			}
			if ((document.getElementsByName("t8")[0].value != "") && (attackTse == 4)) {
				attackTse = 3;
			}
			AttackForm.innerHTML += aLangTaskOfText[20] + ": ";
			tag = document.createElement("select");
			tag.setAttribute("id", "attacktype");
			for (var i = 0; i < attacktypes.snapshotLength; i++) {
				subTag = document.createElement("option");
				subTag.innerHTML = aLangAttackType[i];
				if (attacktypes.snapshotItem(i).checked)
				{
					subTag.setAttribute("value", attackTse);
					subTag.setAttribute("selected", "selected");
				} else {
					subTag.setAttribute("value", (i+2));
				}
				tag.appendChild(subTag);
			}
			AttackForm.appendChild(tag);
			ra = GM_getValue(myacc() + "_raceID");
			ra = parseInt(ra);
			var mytable = document.createElement("table");
			mytable.id = "mytablee"
			mytable.innerHTML += "<tr><td>" + aLangTroops[ra][0] + "</td><td><input type='text' id='tt1' style='width:40px' value='" + document.getElementsByName("t1")[0].value + "' ></td><td>&#160;&#160;" + aLangTroops[ra][1] + "</td><td><input type='text' id='tt2' style='width:40px' value='" + document.getElementsByName("t2")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + aLangTroops[ra][2] + "</td><td><input type='text' id='tt3' style='width:40px' value='" + document.getElementsByName("t3")[0].value + "' ></td><td>&#160;&#160;" + aLangTroops[ra][3] + "</td><td><input type='text' id='tt4' style='width:40px' value='" + document.getElementsByName("t4")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + aLangTroops[ra][4] + "</td><td><input type='text' id='tt5' style='width:40px' value='" + document.getElementsByName("t5")[0].value + "' ></td><td>&#160;&#160;" + aLangTroops[ra][5] + "</td><td><input type='text' id='tt6' style='width:40px' value='" + document.getElementsByName("t6")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + aLangTroops[ra][6] + "</td><td><input type='text' id='tt7' style='width:40px' value='" + document.getElementsByName("t7")[0].value + "' ></td><td>&#160;&#160;" + aLangTroops[ra][7] + "</td><td><input type='text' id='tt8' style='width:40px' value='" + document.getElementsByName("t8")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + aLangTroops[ra][8] + "</td><td><input type='text' id='tt9' style='width:40px' value='" + document.getElementsByName("t9")[0].value + "' ></td><td>&#160;&#160;" + aLangTroops[ra][9] + "</td><td><input type='text' id='tt10' style='width:40px' value='" + document.getElementsByName("t10")[0].value + "' /></td></tr>"
			if(document.getElementsByName("t8")[0].value!="" && (attackTse != 2)){
				mytable.innerHTML += "<tr><td colspan='4'><hr/></td>"
				mytable.innerHTML += "<tr><td colspan='2'>" + aLangTaskOfText[25] + ":</td><td colspan='2'>&#160;&#160;" + aLangTaskOfText[25] + ":</td></tr>"
				mytable.innerHTML += "<tr><td colspan='2'><select id='firetarget1'>" + getFireTarget() + "</select></td><td colspan='2'>&#160;&#160;<select id='firetarget2'><option value='0'>"+aLangGameText[16]+"</option>" + getFireTarget() + "</select></td></tr>"
				mytable.innerHTML += "<tr><td colspan='4'><hr/></td>"
			}
			AttackForm.appendChild(mytable);
			
			if (document.getElementsByName("t11").length>0 && document.getElementsByName("t11")[0].value!="") {
				AttackForm.innerHTML += aLangTroops[ra][10] + "&#160;&#160;<select id='hero'><option value='0'>No</option><option value='1' selected='selected'>Yes</option></select><br/>"
			}
			else {
			AttackForm.innerHTML += aLangTroops[ra][10] + "&#160;&#160;<select id='hero'><option value='0'>No</option><option value='1' >Yes</option></select><br/>"
			}
			
			if(document.getElementsByName("x")[0].value!=""&&document.getElementsByName("y")[0].value!=""){
				AttackForm.innerHTML += aLangTaskOfText[21]+":&#160;&#160;<input type='text' id='troopstime' style='width:120px' readOnly= 'true' value='"+getTroopsTime()+"' /><br/>"
			}
			tod = new Date();
			ye = tod.getFullYear();
			mon = tod.getMonth()+1;
			dat = tod.getDate();
			hou = tod.getHours();
			if(hou<10){hou="0"+hou}
			minu = tod.getMinutes();
			if(minu<10){minu="0"+minu}
			sec = tod.getSeconds();
			if(sec<10){sec="0"+sec}
			nowtime = ye + "/" + mon + "/" + dat + " " + hou + ":" + minu + ":" + sec
			AttackForm.innerHTML += aLangGameText[4]+":&#160;&#160;<input type='text' id='startime' style='width:146px' value='"+nowtime+"' /><br/>"
			
			AttackForm.innerHTML += aLangTaskOfText[22]+":&#160;<input type='text' id='repeat' style='width:20px' value='0' />&#160;&#160;"+aLangTaskOfText[23]+":&#160;<input type='text' id='interval' style='width:60px' value='"+aLangTaskOfText[24]+"' /><br/><br/>"
	  TS_debug('FM_createAttackFloat : ye=' + ye + " mon=" + mon + " dat=" + dat + " hou=" + hou + " minu=" + minu  );
			
			var tSubmitBtn = document.createElement("input");
			tSubmitBtn.name = "submitBtn";
			tSubmitBtn.value = "OK";
			tSubmitBtn.type = "button";
			tSubmitBtn.addEventListener('click', setAttackCookies, true);
			AttackForm.appendChild(tSubmitBtn);
		}
		var aWrapper = document.createElement("div");
		aWrapper.id = "attackform_wrapper";
		aWrapper.appendChild(AttackForm);
		
		var formCoords = getOption("ATTACK_POSITION", "118px_468px");
		formCoords = formCoords.split("_");
		aWrapper.style.top = formCoords[0];
		aWrapper.style.left = formCoords[1];
		
		document.body.appendChild(aWrapper);
		makeDraggable($("attackform"));
		if($("troopstime")){
			$("interval").value=doublee($("troopstime").value)
		}
	}
	
//-----------------------------------------------------------------------------------------------
// Ptitfred06 - Affichage de l'ecran de saisie de attaque 	
//-----------------------------------------------------------------------------------------------

	function doublee(t){
		if (t == aLangTaskOfText[27]) {
			return aLangTaskOfText[27];
		}
	  flag('FM_doublee : t ' + t);
		hh=Number(t.split(":")[0]);
		mm=Number(t.split(":")[1]);
		ss=Number(t.split(":")[2]);
		all=hh*3600000+mm*60000+ss*1000;
//	  TS_debug('FM_doublee temps en miliseconde: all ' + all);
// FM 30/03/2010 aTime=all*2+10000; Necessaire pour les temps perdu de depart et synchronisation du retour
		aTime=all*2+10000;
		hh=Math.floor(aTime/3600000);
		if(hh<10){hh="0"+hh}
		mm=Math.floor((aTime-hh*3600000)/60000);
		if(mm<10){mm="0"+mm}
		ss=Math.ceil((aTime-hh*3600000-mm*60000)/1000);
//		ss=Math.floor((aTime-hh*3600000-mm*60000)/1000);
		if(ss<10){ss="0"+ss}
	  flag('FM_doublee : hh=' + hh + " mm=" + mm + " ss=" + ss);
		return hh+":"+mm+":"+ss		
	}

	
	function getFireTarget(){
		var thetarget="<option value='99'>"+aLangTaskOfText[26]+"</option>";
		for (i in aLangAllBuildWithId){
			if (i==4){continue;}
			thetarget+="<option value='"+i+"'>"+aLangAllBuildWithId[i]+"</option>";
		}
		return thetarget;
	}
// ------------------------------------------------------------------------------
/// Calcul de la vitesse en fonction de la troupe selectionné.	
// ------------------------------------------------------------------------------
	function getTroopsTime(){
		flag('START gettroopstime');
		theSlow = 30;
		for (u = 0; u < 10; u++) {
			x = u + 1;
			if (document.getElementsByName("t" + x)[0].value == "") {
				continue;
			}
			theSlow = Math.min(theSlow, parseInt(troopspeed[ra][u]))
			flag('ra ='+ra+' u='+u);
		}

		flag('GetTroopsTime : the slow ' + theSlow);
		// Gestion du heros
		if (document.getElementsByName("t11").length >0 && document.getElementsByName("t11")[0].value!="") {
			herosp = GM_getValue(myacc() + "_heroSpeed", "false")
			if (herosp != "false") {
				theSlow = Math.min(theSlow, parseInt(herosp))
			}
			else {
				printMSG(aLangOtherText[9] + "<br/><br/>")
			}
		}
		flag('GetTroopsTime  Heros : the slow ' + theSlow);
		if(theSlow==30){
		flag('GetTroopsTime Slow = 30 : the slow ' + theSlow);	
			return aLangTaskOfText[27]
		}
		flag('GetTroopsTime Slow dif 30  : the slow ' + theSlow);		
		posi1 = getPosFromVill(currentVillageName()); 
		sx1 = getXfromCoord(posi1)
		sy1 = getYfromCoord(posi1)
		sx2 = document.getElementsByName("x")[0].value
		sy2 = document.getElementsByName("y")[0].value

		qDist = getDistance(sx1, sy1, sx2, sy2)
		var aTime = Math.round(qDist * 3600000 / theSlow);
		hh=Math.floor(aTime/3600000);
		if(hh<10){hh="0"+hh}
		mm=Math.floor((aTime-hh*3600000)/60000);
		if(mm<10){mm="0"+mm}
		ss=Math.ceil((aTime-hh*3600000-mm*60000)/1000);
		if(ss<10){ss="0"+ss}
	  	flag('GetTroopsTime : hh=' + hh + ' mm=' + mm + ' ss=' + ss + ' aLangTaskOfText[27] ' + aLangTaskOfText[27]);
		flag('end get troops time');
		return hh+":"+mm+":"+ss
	}
	
// ------------------------------------------------------------------------------
// 
// ------------------------------------------------------------------------------	
	function getHeroSpeed(){
		if (stripHTML(h1in().innerHTML).indexOf(aLangAllBuildWithId[37])!=-1){
			var myhero=document.evaluate('//table[@id="distribution"]/descendant::span[@class="info"]', document, null, XPFirst, null);
			var herokind=myhero.singleNodeValue.innerHTML.split("(")[1].split(")")[0]
			
			var ra=GM_getValue(myacc() + "_raceID");
			ra = parseInt(ra);
			for(i in aLangTroops[ra]){
				if (aLangTroops[ra][i]==herokind){
					GM_setValue(myacc() + "_heroSpeed",troopspeed[ra][i])
					break;
				}
			}
		}
	}

// ------------------------------------------------------------------------------
// Creates a cookie entry with sheduled attack parameters. Takes values from floating form.
// ------------------------------------------------------------------------------
	function setAttackCookies() { //2_targetPosition_kind_repeat_startTime_interval_troops_kata1_kata2

		taskkindss = "2";
	  TS_debug('FM SetAttackCookies :');
	//------------------------------------------------		
		cX = $("xcoord").value;
		cY = $("ycoord").value;
		targetPosition = getCoordfromXY(cX,cY);
	//------------------------------------------------		
		attackkind = $("attacktype").value;
	//------------------------------------------------	
		repeat = $("repeat").value;
	//------------------------------------------------
// Recupèration de la date et heure 	Travian/Travian AutoTask CPD: 01:45:33.283 FM SetAttackCookies : startTime=Tue Mar 30 2010 01:55:27 GMT+0200 (CET)
		var startt=new Date($("startime").value);
		startTime=startt.getTime();
	  TS_debug('FM SetAttackCookies : startt=' + startt);
	//------------------------------------------------		
		interv = $("interval").value;
		if(interv.split(":")[2]!=null){
			hh=interv.split(":")[0]
			mm=interv.split(":")[1]
			ss=interv.split(":")[2]
			interval=Number(hh)*60*60*1000+Number(mm)*60*1000+Number(ss)*1000
	  TS_debug('FM SetAttackCookies : splitt hh=' + hh + " mm=" + mm + " ss=" + ss + " interval=" + interval);
		} else	{
			interval=0;
		}
	//------------------------------------------------		2_241654_3_0_1245413194000_50922000_0,0,21,9,0,12,1,40,0,0,0_99_0
		var troopss=new Array()
			troopss[0]=($("tt1").value=="")?"0":$("tt1").value;
			troopss[1]=($("tt2").value=="")?"0":$("tt2").value;
			troopss[2]=($("tt3").value=="")?"0":$("tt3").value;
			troopss[3]=($("tt4").value=="")?"0":$("tt4").value;
			troopss[4]=($("tt5").value=="")?"0":$("tt5").value;
			troopss[5]=($("tt6").value=="")?"0":$("tt6").value;
			troopss[6]=($("tt7").value=="")?"0":$("tt7").value;
			troopss[7]=($("tt8").value=="")?"0":$("tt8").value;
			troopss[8]=($("tt9").value=="")?"0":$("tt9").value;
			troopss[9]=($("tt10").value=="")?"0":$("tt10").value;
			troopss[10]=($("hero").value=="")?"0":$("hero").value;
		troopsoo=troopss.join(",");
	//------------------------------------------------
		kata1=($("firetarget1"))? $("firetarget1").value : "0"
		kata2=($("firetarget2"))? $("firetarget2").value : "0"
	//---------------------------------------------------------------------------------------------------------------
		thisTask = taskkindss + "_" + targetPosition + "_" + attackkind + "_" + repeat + "_" + startTime + "_" + interval + "_" + troopsoo + "_" + kata1 + "_" +kata2;
	  TS_debug('FM SetAttackCookies : thistask =');

		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(herere() + "_waitTask", allTask)
//	  TS_debug('FM SetAttackCookies : alltask =' + alltask);
	//---------------------------------------------------------------------------------------------------------------
		document.body.removeChild($("attackform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList()
		getTaskCookies()
		msg = aLangTaskOfText[19].bold() + " " + aLangOtherText[3];
		printMSG(msg)
	}
	
	function createAttackBtn() {
		var bposition = document.evaluate('id("btn_ok")', document, null, XPFirst, null);
		AttackBtn = document.createElement("a");
		AttackBtn.id = "attackbtn";
		AttackBtn.href = "#";
		AttackBtn.innerHTML = "&#160;&#160;"+aLangTaskOfText[19]+"&#160;&#160;";
		AttackBtn.addEventListener("click", createAttackFloat, false);
		bposition.singleNodeValue.parentNode.appendChild(AttackBtn);
	}
	
	function createTrainLnk() {
		var bposition = document.evaluate('id("btn_train")', document, null, XPFirst, null);
		if (bposition.singleNodeValue) {
			TrainLnk = document.createElement("a");
			TrainLnk.id = "trainlnk";
			TrainLnk.href = "#";
			TrainLnk.innerHTML = "&#160;&#160;" + aLangTaskOfText[32] + "&#160;&#160;";
			TrainLnk.addEventListener("click", createTrainFloat, false);
			bposition.singleNodeValue.parentNode.appendChild(TrainLnk);
		}
	}
	
	function createTrainFloat(){
		var trainForm = document.createElement("form");
		trainForm.id = "trainform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"trainform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		trainForm.innerHTML = floatClose;
		var buidd=document.getElementsByName("id")[0].value
		var h1inn = stripHTML(h1in().innerHTML).split(" ")
		switch (h1inn.length) {
			case 3:
				bbName = h1inn[0];
				break;
			case 4:
				bbName = h1inn[0] +" "+ h1inn[1]
				break;
		}

		if (!GM_getValue(myacc() + "_raceID")) {
			trainForm.innerHTML += "<br/>" + aLangOtherText[0].big() + "!!!<br/><br/>" + aLangOtherText[8] + "<br/><br/>";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			privateeee=(privateee.singleNodeValue)?privateee:privatee
			trainForm.innerHTML += aLangOtherText[2] + ":    <a href='" + privateeee.singleNodeValue.href + "'>&#160;&#160;&#160;&#160;&#160;" + privateeee.singleNodeValue.innerHTML + "</a><br/><br/>";
		}
		else {
			ra = GM_getValue(myacc() + "_raceID");
			ra = parseInt(ra);
			trainForm.innerHTML += "<br/>" + aLangTaskOfText[32].big() + "<br/><br/>";
			trainForm.innerHTML += aLangAddTaskText[2] + ":  <select id='crtvill' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br/>";
			trainForm.innerHTML += aLangTaskOfText[33]+":<select id='trainid' disabled=true><option value='" + buidd + "'>" + bbName + "</option></select><br/>";
			trainForm.innerHTML += getTraintable()
			
			tod = new Date();
			ye = tod.getFullYear();
			mon = tod.getMonth() + 1;

			dat = tod.getDate();
			hou = tod.getHours();
			if (hou < 10) {
				hou = "0" + hou
			}
			minu = tod.getMinutes();
			if (minu < 10) {
				minu = "0" + minu
			}
			sec = tod.getSeconds();
			if (sec < 10) {
				sec = "0" + sec
			}
			nowtime = ye + "/" + mon + "/" + dat + " " + hou + ":" + minu + ":" + sec
	  TS_debug('FM_createTrainFloat : ye=' + ye + " mon=" + mon + " dat=" + dat + " hou=" + hou + " minu=" + minu  );

			trainForm.innerHTML += aLangGameText[4] + ":&#160;&#160;<input type='text' id='startime' style='width:146px' value='" + nowtime + "' /><br/>"
			trainForm.innerHTML += aLangTaskOfText[22]+":&#160;<input type='text' id='repeat' style='width:30px' value='0' />&#160;&#160;"+aLangTaskOfText[23] + ":&#160;<input type='text' id='interval' style='width:60px' value='" + aLangTaskOfText[24] + "' /><br/><br/>"
			
			var tSubmitBtn = document.createElement("input");
			tSubmitBtn.name = "submitBtn";
			tSubmitBtn.value = "OK";
			tSubmitBtn.type = "button";
			tSubmitBtn.addEventListener('click', setTrainCookies, true);
			trainForm.appendChild(tSubmitBtn);
		}
		var tWrapper = document.createElement("div");
		tWrapper.id = "trainform_wrapper";
		tWrapper.appendChild(trainForm);
		
		var formCoords = getOption("TRAIN_POSITION", "118px_468px");
		formCoords = formCoords.split("_");
		tWrapper.style.top = formCoords[0];
		tWrapper.style.left = formCoords[1];
		
		document.body.appendChild(tWrapper);
		makeDraggable($("trainform"));
	}
	
	
	function getTraintable(){
		ra = GM_getValue(myacc() + "_raceID");
		ra = parseInt(ra);
		stainstring = "<table id = 'mytablee'><tr><td>"+aLangTaskKind[4]+":</td><td>&#160;</td></tr><tr><td colspan='2'><hr/></td></tr>"
		switch (ra) {
			case 0:
				switch (bbName){
					case aLangAllBuildWithId[19]:
					case aLangAllBuildWithId[29]:
						stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][0]+"</td><td><input type='text' id='t1' style='width:40px' value='"+ document.getElementsByName("t1")[0].value+"'</td></tr>";
						if(document.getElementsByName("t2").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][1]+"</td><td><input type='text' id='t2' style='width:40px' value='"+ document.getElementsByName("t2")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t3").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][2]+"</td><td><input type='text' id='t3' style='width:40px' value='"+ document.getElementsByName("t3")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[20]:
					case aLangAllBuildWithId[30]:
						if(document.getElementsByName("t4").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][3]+"</td><td><input type='text' id='t4' style='width:40px' value='"+ document.getElementsByName("t4")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t5").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][4]+"</td><td><input type='text' id='t5' style='width:40px' value='"+ document.getElementsByName("t5")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t6").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][5]+"</td><td><input type='text' id='t6' style='width:40px' value='"+ document.getElementsByName("t6")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[21]:
						if(document.getElementsByName("t7").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][6]+"</td><td><input type='text' id='t7' style='width:40px' value='"+ document.getElementsByName("t7")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t8").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][7]+"</td><td><input type='text' id='t8' style='width:40px' value='"+ document.getElementsByName("t8")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[25]:
					case aLangAllBuildWithId[26]:
						if(document.getElementsByName("t9").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][8]+"</td><td><input type='text' id='t9' style='width:40px' value='"+ document.getElementsByName("t9")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t10").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][9]+"</td><td><input type='text' id='t10' style='width:40px' value='"+ document.getElementsByName("t10")[0].value+"'</td></tr>";
						}
						break;
				}
				break;
			case 1:
				switch (bbName){
					case aLangAllBuildWithId[19]:
					case aLangAllBuildWithId[29]:
						stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][0]+"</td><td><input type='text' id='t1' style='width:40px' value='"+ document.getElementsByName("t1")[0].value+"'</td></tr>";
						if(document.getElementsByName("t2").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][1]+"</td><td><input type='text' id='t2' style='width:40px' value='"+ document.getElementsByName("t2")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t3").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][2]+"</td><td><input type='text' id='t3' style='width:40px' value='"+ document.getElementsByName("t3")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t4").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][3]+"</td><td><input type='text' id='t4' style='width:40px' value='"+ document.getElementsByName("t4")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[20]:
					case aLangAllBuildWithId[30]:
						if(document.getElementsByName("t5").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][4]+"</td><td><input type='text' id='t5' style='width:40px' value='"+ document.getElementsByName("t5")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t6").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][5]+"</td><td><input type='text' id='t6' style='width:40px' value='"+ document.getElementsByName("t6")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[21]:
						if(document.getElementsByName("t7").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][6]+"</td><td><input type='text' id='t7' style='width:40px' value='"+ document.getElementsByName("t7")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t8").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][7]+"</td><td><input type='text' id='t8' style='width:40px' value='"+ document.getElementsByName("t8")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[25]:
					case aLangAllBuildWithId[26]:
						if(document.getElementsByName("t9").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][8]+"</td><td><input type='text' id='t9' style='width:40px' value='"+ document.getElementsByName("t9")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t10").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][9]+"</td><td><input type='text' id='t10' style='width:40px' value='"+ document.getElementsByName("t10")[0].value+"'</td></tr>";
						}
						break;
				}
				break;
			case 2:
				switch (bbName){
					case aLangAllBuildWithId[19]:
					case aLangAllBuildWithId[29]:
						stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][0]+"</td><td><input type='text' id='t1' style='width:40px' value='"+ document.getElementsByName("t1")[0].value+"'</td></tr>";
						if(document.getElementsByName("t2").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][1]+"</td><td><input type='text' id='t2' style='width:40px' value='"+ document.getElementsByName("t2")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[20]:
					case aLangAllBuildWithId[30]:
						if(document.getElementsByName("t3").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][2]+"</td><td><input type='text' id='t3' style='width:40px' value='"+ document.getElementsByName("t3")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t4").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][3]+"</td><td><input type='text' id='t4' style='width:40px' value='"+ document.getElementsByName("t4")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t5").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][4]+"</td><td><input type='text' id='t5' style='width:40px' value='"+ document.getElementsByName("t5")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t6").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][5]+"</td><td><input type='text' id='t6' style='width:40px' value='"+ document.getElementsByName("t6")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[21]:
						if(document.getElementsByName("t7").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][6]+"</td><td><input type='text' id='t7' style='width:40px' value='"+ document.getElementsByName("t7")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t8").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][7]+"</td><td><input type='text' id='t8' style='width:40px' value='"+ document.getElementsByName("t8")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[25]:
					case aLangAllBuildWithId[26]:
						if(document.getElementsByName("t9").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][8]+"</td><td><input type='text' id='t9' style='width:40px' value='"+ document.getElementsByName("t9")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t10").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][9]+"</td><td><input type='text' id='t10' style='width:40px' value='"+ document.getElementsByName("t10")[0].value+"'</td></tr>";
						}
						break;
				}
				break
		}
		stainstring +="<tr><td colspan='2'><hr/></td></tr></table>"
		return stainstring
	}
	
	
	function setTrainCookies(){
		taskkindss = "4"
	//------------------------------------------------	
		trainid=$("trainid").value
	//------------------------------------------------	
		var trooss=new Array();
		trooss[0]=($("t1"))?$("t1").value:"0";
		trooss[1]=($("t2"))?$("t2").value:"0";
		trooss[2]=($("t3"))?$("t3").value:"0";
		trooss[3]=($("t4"))?$("t4").value:"0";
		trooss[4]=($("t5"))?$("t5").value:"0";
		trooss[5]=($("t6"))?$("t6").value:"0";
		trooss[6]=($("t7"))?$("t7").value:"0";
		trooss[7]=($("t8"))?$("t8").value:"0";
		trooss[8]=($("t9"))?$("t9").value:"0";
		trooss[9]=($("t10"))?$("t10").value:"0";
		troopses=trooss.join(",");
	//------------------------------------------------	
		repeat=$("repeat").value;
	//------------------------------------------------	
		var startt=new Date($("startime").value);
		startTime=startt.getTime();
	//------------------------------------------------		
		interv=$("interval").value
		if(interv.split(":")[2]!=null){
			hh=interv.split(":")[0];
			mm=interv.split(":")[1];
			ss=interv.split(":")[2];
			interval=Number(hh)*60*60*1000+Number(mm)*60*1000+Number(ss)*1000;
		}
		else{
			interval=0;
		}
	//------------------------------------------------	
		TrainBuild=bbName;
	//------------------------------------------------	
		thisTask = taskkindss + "_" + trainid + "_" +repeat+ "_" +startTime+ "_" +interval+ "_" + troopses + "_" + TrainBuild;
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask;
		GM_setValue(herere() + "_waitTask", allTask);
	//------------------------------------------------	
		document.body.removeChild($("trainform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"));
		}
		showTaskList();
		getTaskCookies();
		msg = aLangTaskOfText[32].bold() + " " + aLangOtherText[3];
		printMSG(msg);
	}
	
	function createAutoTransBtn(){
		var bposition = document.evaluate('id("btn_ok")', document, null, XPFirst, null);
		flag('Create Auto TransBtn');
		AutoTransBtn = document.createElement("a");
		AutoTransBtn.id = "autotransbtn";
		AutoTransBtn.href = "#";
		AutoTransBtn.innerHTML = "&#160;&#160;"+aLangTaskOfText[8] +"&#160;&#160;";
		AutoTransBtn.addEventListener("click", createAutoTransFloat, false);
		bposition.singleNodeValue.parentNode.appendChild(AutoTransBtn);
		
		customTransBtn= document.createElement("a");
		customTransBtn.id = "customtransbtn";
		customTransBtn.href = "#";
		customTransBtn.innerHTML = "&#160;&#160;"+aLangTaskOfText[35] +"&#160;&#160;";
		customTransBtn.addEventListener("click", customTransFloat, false);
		bposition.singleNodeValue.parentNode.appendChild(customTransBtn);
	}
	
	function customTransFloat(){
		var customTransForm = document.createElement("form");
		customTransForm.id = "customtransform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"customtransform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		customTransForm.innerHTML = floatClose;
		
		customTransForm.innerHTML += "<br/>" + aLangTaskOfText[35].big() + "<br/><br/>";
		customTransForm.innerHTML += aLangAddTaskText[2] + ":  <select id='crtvill' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br/>";
		
		
		var targetPosition = getCoordfromXY(document.getElementsByName("x")[0].value, document.getElementsByName("y")[0].value);
		found = "0";
		allVillagePos=GM_getValue(myacc() + "_allVillagePos").split(",");
		for (i in allVillagePos) {
			if (allVillagePos[i].split(":")[1] == targetPosition) {
				customTransForm.innerHTML += aLangAddTaskText[4] + ":  <select id='targetPosition' disabled=true><option value='" + targetPosition + "'>" + allVillagePos[i].split(":")[0] + "</option></select><br/>"
				found = "1";
				break;
			}
		}
		if (found == "0") {
			customTransForm.innerHTML += aLangAddTaskText[4] + ": &#160;&#160;X:&#160;<input type='text' style='width:40px' id='xcoord' value='" + document.getElementsByName("x")[0].value + "' />&#160;Y:&#160;<input type='text' style='width:40px' id='ycoord' value='" + document.getElementsByName("y")[0].value + "' /><br/>";
		}
		var mytable = document.createElement("table");
		mytable.id = "mytablee";
		mytable.innerHTML += "<tr><td style='width:60px'>" + aLangResources[0] + ":</td><td><input type='text' id='rr1' onclick='this.value=\"\"' style='width:60px' value='" + document.getElementsByName("r1")[0].value + "' ></td></tr>";
		mytable.innerHTML += "<tr><td style='width:60px'>" + aLangResources[1] + ":</td><td><input type='text' id='rr2' onclick='this.value=\"\"' style='width:60px' value='" + document.getElementsByName("r2")[0].value + "' ></td></tr>";
		mytable.innerHTML += "<tr><td style='width:60px'>" + aLangResources[2] + ":</td><td><input type='text' id='rr3' onclick='this.value=\"\"' style='width:60px' value='" + document.getElementsByName("r3")[0].value + "' ></td></tr>";
		mytable.innerHTML += "<tr><td style='width:60px'>" + aLangResources[3] + ":</td><td><input type='text' id='rr4' onclick='this.value=\"\"' style='width:60px' value='" + document.getElementsByName("r4")[0].value + "' ></td></tr>";
		
		customTransForm.appendChild(mytable);
		
		tod = new Date();
		ye = tod.getFullYear();
		mon = tod.getMonth() + 1;

		dat = tod.getDate();
		hou = tod.getHours();
		if (hou < 10) { hou = "0" + hou; }
		minu = tod.getMinutes();
		if (minu < 10) { minu = "0" + minu; }
		sec = tod.getSeconds();
		if (sec < 10) { sec = "0" + sec; }
		nowtime = ye + "/" + mon + "/" + dat + " " + hou + ":" + minu + ":" + sec;
		customTransForm.innerHTML += aLangGameText[4] + ":&#160;&#160;<input type='text' id='startime' style='width:146px' value='" + nowtime + "' /><br/>";
		
		
		if (document.getElementsByName("x")[0].value != "" && document.getElementsByName("y")[0].value != "") {
			aTime = getMerchanTime(currentID(), targetPosition);
			hh = Math.floor(aTime / 3600000);
			if (hh < 10) { hh = "0" + hh; }
			mm = Math.floor((aTime - hh * 3600000) / 60000);
			if (mm < 10) {	mm = "0" + mm;	}
			ss = Math.ceil((aTime - hh * 3600000 - mm * 60000) / 1000);
			if (ss < 10) { ss = "0" + ss; }
			totime=hh + ":" + mm + ":" + ss;
			MerchanTime = doublee(totime);
		}
		else {
			MerchanTime = aLangTaskOfText[24];
		}
		customTransForm.innerHTML += aLangTaskOfText[22] + ":&#160;<input type='text' id='repeat' style='width:30px' value='0' />&#160;&#160;" + aLangTaskOfText[23] + ":&#160;<input type='text'  id='interval' style='width:60px' value='" + MerchanTime + "' /><br/><br/>";
		
	  flag('FM_customTransFloat : ye=' + ye + " mon=" + mon + " dat=" + dat + " hou=" + hou + " minu=" + minu  );
		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.name = "submitBtn";
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setCustomTranCookies, true);
		customTransForm.appendChild(tSubmitBtn);
		
		var aWrapper = document.createElement("div");
		aWrapper.id = "customtransform_wrapper";
		aWrapper.appendChild(customTransForm);
		
		var formCoords = getOption("CUSTOMTRAN_POSITION", "118px_468px");
		formCoords = formCoords.split("_");
		aWrapper.style.top = formCoords[0];
		aWrapper.style.left = formCoords[1];
		
		document.body.appendChild(aWrapper);
		makeDraggable($("customtransform"));
	}
	
	
	function setCustomTranCookies(){
		targetPosition = ($("targetPosition"))?$("targetPosition").value:getCoordfromXY($("xcoord").value,$("ycoord").value)

		repeat=$("repeat").value

		var startt=new Date($("startime").value)
		startTime=startt.getTime()

		interv=$("interval").value
		if(interv.split(":")[2]!=null){
			hh=interv.split(":")[0];
			mm=interv.split(":")[1];
			ss=interv.split(":")[2];
			interval=Number(hh)*60*60*1000+Number(mm)*60*1000+Number(ss)*1000;
		}
		else{
			interval=0;
		}
	//------------------------------------------------		//8_241654_500,500,500,500_0_1245413194000_interval
		var res=new Array()
			res[0]=($("rr1").value=="")?"0":$("rr1").value;
			res[1]=($("rr2").value=="")?"0":$("rr2").value;
			res[2]=($("rr3").value=="")?"0":$("rr3").value;
			res[3]=($("rr4").value=="")?"0":$("rr4").value;
		resourcessss=res.join(",");
	//---------------------------------------------------------------------------------------------------------------
		thisTask = "8_" + targetPosition + "_" + resourcessss + "_" + repeat + "_" + startTime + "_" + interval;
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask;
		GM_setValue(herere() + "_waitTask", allTask);
	//---------------------------------------------------------------------------------------------------------------
		document.body.removeChild($("customtransform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList();
		getTaskCookies();
		msg = aLangTaskOfText[35].bold() + " " + aLangOtherText[3];
		printMSG(msg);
	}
	
	
	function createAutoTransFloat(){
		var TransForm = document.createElement("form");
		TransForm.id = "transform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"tranForm_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		flag('CreatAutoTransFloat');
		TS_debug("Called function createAutoTransFloat()");
		TransForm.innerHTML = floatClose;
		TransForm.innerHTML += "<br/>" + aLangAddTaskText[0].big() + "<br/><br/>";
		TransForm.innerHTML += aLangAddTaskText[1] + ":  <select id='taskkindss' disabled=true><option value='5'>" + aLangTaskKind[5] + "</option></select><br/><br/>";
		TransForm.innerHTML += aLangAddTaskText[2] + ":  <select id='crtvillagee' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br/><br/>";
		TransForm.innerHTML += aLangAddTaskText[5] + ":  <select id='tranmodel'><option value='0'>" + aLangAddTaskText[6] + "</option><option value='1'>" + aLangAddTaskText[7] + "</option></select><br/><br/>"
		TransForm.innerHTML += aLangAddTaskText[3] + ":  <select id='villageposition'>" + VillagePosOption() + "</select><br/><br/>";
		
		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.name = "submitBtn";
		tSubmitBtn.id = "submitBtn";
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setTranCookies, true);
		TransForm.appendChild(tSubmitBtn);
		
		var tWrapper = document.createElement("div");
		tWrapper.id = "tranForm_wrapper";
		tWrapper.appendChild(TransForm);
		
		var formCoords = getOption("TRAN_POSITION", "218px_468px");
		formCoords = formCoords.split("_");
		tWrapper.style.top = formCoords[0];
		tWrapper.style.left = formCoords[1];
		
		document.body.appendChild(tWrapper);
		makeDraggable($("transform"));
	}
	
	function setTranCookies(){
		TS_debug("Called function setTranCookies()");
		taskkindss = "5";
		tranmodel = $("tranmodel").value;
		villageposition = $("villageposition").value;
		targetVid = getVillFromPos(villageposition);
		TS_debug("setTranCookies(): villageposition="+villageposition+"; targetVid="+targetVid+";");
		
		thisTask = taskkindss + "_" + tranmodel + "_" + targetVid + "_" + villageposition;
		TS_debug("setTranCookies(): thisTask="+thisTask);
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(herere() + "_waitTask", allTask)
		allTarget = (GM_getValue(herere() + "_autoTransTo")) ? GM_getValue(herere() + "_autoTransTo") + "|" + targetVid : targetVid;
		GM_setValue(herere() + "_autoTransTo", allTarget);
		document.body.removeChild($("tranForm_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"));
		}
		showTaskList();
		getTaskCookies();
		msg = aLangTaskOfText[8].bold() + " " + aLangOtherText[3];
		printMSG(msg);
	}
	
	
	function VillagePosOption(){
		string = "";
		allVillagePos=GM_getValue(myacc() + "_allVillagePos").split(",")
		for (i = 0; i < allVillagePos.length; i++) {
			if (allVillagePos[i].split(":")[0] == currentVillageName()) {
				continue;
			}
			name = allVillagePos[i].split(":")[0];
			position = allVillagePos[i].split(":")[1];
			string += "<option value='" + position + "'>" + name + "</option>"
		}
		return string
	}
	
	
	function getallVillagePos(){
		if (window.location.href.indexOf("spieler.php?") < 0) {
			allposition = new Array();
			var allX = document.getElementsByClassName("cox");
			var allY = document.getElementsByClassName("coy");
			var allN = document.evaluate('id("vlist")/descendant::a[contains(@href,"newdid")]', document, null, XPSnap, null);
			if (allN.snapshotLength > 0) {
				for (i in allX) {
					xx = (allX[i].innerHTML.split("(")[1]) ? allX[i].innerHTML.split("(")[1] : allX[i].nextSibling.innerHTML
					yy = (allY[i].innerHTML.split(")")[0]) ? allY[i].innerHTML.split(")")[0] : allY[i].previousSibling.innerHTML
					na = allN.snapshotItem(i).innerHTML + ":" + getCoordfromXY(xx, yy)
					gugaga = allposition.push(na)
				}
			}
			else {
				allposition[0] = GM_getValue(myacc() + "_mainvillageName") + ":" + GM_getValue(myacc() + "_mainVillagePosition")
			}
			GM_setValue(myacc() + "_allVillagePos", allposition.join())
		}
	}
	
	
	function getVillFromPos(position){
		TS_debug("Called function getVillFromPos() with position="+position)
		
		a=GM_getValue(myacc())
		allVillagePos=GM_getValue(myacc() + "_allVillagePos").split(",")
		TS_debug("getVillFromPos: allVillagePos="+allVillagePos+";")
		for (i = 0; i < allVillagePos.length; i++) {
			if (allVillagePos[i].split(":")[1] == position) {
				return getDidFromVillage(allVillagePos[i].split(":")[0]);
				break;
			}
		}
	}
	
	function getPosFromVill(vi){
		if (!$("vlist")&&GM_getValue(myacc() + "_mainvillageName")==vi) {
			return GM_getValue(myacc() + "_mainVillagePosition")
		}
		else {
			allVillagePos=GM_getValue(myacc() + "_allVillagePos").split(",")
			for (i = 0; i < allVillagePos.length; i++) {
				if (allVillagePos[i].split(":")[0] == vi) {
					return allVillagePos[i].split(":")[1];
					break;
				}
			}
		}
	}
		
	function getCoordfromXY(x, y){
		x = parseInt(x);
		y = parseInt(y);
		var coordZ = (x + 401) + ((400 - y) * 801);
		return coordZ;
	}
	
	function getXfromCoord(z){
		z = parseInt(z);
		var x = ((z - 1) % 801) - 400;
		return x;
	}
	
	function getYfromCoord(z){
		z = parseInt(z);
		var y = 400 - (parseInt(((z - 1) / 801)));
		return y;
	}
	
	
	function createAutoResFloat(){
		var nowtaskstring = GM_getValue(herere() + "_waitTask", "false");
		var autoTask = "0_50_100"
		if (GM_getValue(myacc() + "_mainvillageId", "false") == "false") {
			msg0 = aLangOtherText[0].big() + "!!!<br/><br/>" + aLangOtherText[1] + "<br/><br/>";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			privateeee=(privateee.singleNodeValue)?privateee:privatee
			msg0 += aLangOtherText[2] + ":    <a href='" + privateeee.singleNodeValue.href + "'>&#160;&#160;&#160;&#160;&#160;" + privateeee.singleNodeValue.innerHTML + "</a><br/><br/>";
			printMSG(msg0);
		}
		else {
			var msg1 = aLangGameText[7].bold() + ":&#160;&#160;" + currentVillageName() + "<br/><br/>" + aLangTaskOfText[2].bold() + ":&#160;&#160;" + aLangOtherText[3] + "<br/><br/>" ;
			if (nowtaskstring != "false" && nowtaskstring.indexOf(autoTask) != -1) {
				GM_setValue(herere() + "_autoResource", "1")
				if ($("tasklisttable_wrapper")) {
					document.body.removeChild($("tasklisttable_wrapper"))
				}
				showTaskList()
				$("autoResdiv").parentNode.removeChild($("autoResdiv"))
				$("translimit").parentNode.removeChild($("translimit"))
				$("resremain").parentNode.removeChild($("resremain"))
				createAutoResLink()
				printMSG(msg1);
			}
			else {
				autoResT = autoTask + "_" + "00000000"
				allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + autoResT : autoResT
				GM_setValue(herere() + "_waitTask", allTask)
				GM_setValue(herere() + "_autoResource", "1")
				if ($("tasklisttable_wrapper")) {
					document.body.removeChild($("tasklisttable_wrapper"))
				}
				showTaskList()
				$("autoResdiv").parentNode.removeChild($("autoResdiv"))
				$("translimit").parentNode.removeChild($("translimit"))
				$("resremain").parentNode.removeChild($("resremain"))
				createAutoResLink()
				printMSG(msg1);
			}
		}
	}
	
	function closeAutoRes(){
		var msg = aLangGameText[7].bold() + ":&#160;&#160;" + currentVillageName() + "<br/><br/>" + aLangTaskOfText[2].bold() + ":&#160;&#160;" + aLangOtherText[4] + "<br/>";
		villaa = currentID();
		Task = new Array();
		Task[0] = "0";
		Task[1] = "50";
		Task[2] = "100";
		Task[3] = "00000000";
		GM_deleteValue(herere() + "_autoResource");
		GM_deleteValue(herere() + "_CorpRemain");
		GM_deleteValue(herere() + "_minLevelId");
		GM_deleteValue(herere() + "_minLevelCropId");
		GM_deleteValue(herere() + "_ResourceUpdataTime");
		deleteTaskFromCookie(villaa, Task)
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList() 
		printMSG(msg);
	}

	
	function printMSG(msg){
		var printmsg = document.createElement("form");
		printmsg.id = "printmsg";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"MSG_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		printmsg.innerHTML = floatClose;
		printmsg.innerHTML += "<br/>";
		printmsg.innerHTML += "<br/>";
		printmsg.innerHTML += msg + "<br/><br/>";
		
		var mWrapper = document.createElement("div");
		mWrapper.id = "MSG_wrapper";
		mWrapper.appendChild(printmsg);
		
		var formCoords = getOption("MSG_POSITION", "300px_500px");
		formCoords = formCoords.split("_");
		mWrapper.style.top = formCoords[0];
		mWrapper.style.left = formCoords[1];
		
		document.body.appendChild(mWrapper);
		makeDraggable($("printmsg"));
//		makeDraggable($("printmsg") + " message");
	}

// ------------------------------------------------------------------------------	
// Creation de la TASK dans la liste des taches.
// ------------------------------------------------------------------------------	
	function createUpdateFloat(eventt){ //this eventt is the "click" on the TaskUrl. it is a event object.
//		flag('FM creation task in tasklist'+eventt);
		myUrl = eventt.target; //by this method, define the event object and get the <a> that call this function. 
		bmaxlevel = 20;
		crtvillagee = myUrl.getAttribute("crtvillage");  //then the Attributes of the <a> are usable.
		buildNamee = myUrl.getAttribute("buildName");
		bnextlevel = parseInt(myUrl.getAttribute("buildnextlevel"));
		bmaxlevel = parseInt(myUrl.getAttribute("buildmaxlevel"));
//		flag('Avant Initialisation buildmaxlevel for Cachette =');
//		if (crtvillagee='2. Cachette') {
//			bmaxlevel = 20;
//			flag('Initialisation buildmaxlevel for Cachette');
//		}
		buildgid=(myUrl.getAttribute("buildgid"))?myUrl.getAttribute("buildgid"):"";
		bidid = myUrl.getAttribute("buildidid");
		TS_debug('Value : Crtvillagee=' + crtvillagee+' / BuildNamee=' + buildNamee+' / bnextlevel=' + bnextlevel+' / bmaxlevel=' + bmaxlevel+' / Bidid=' + bidid + ' / Buildgid=' + buildgid);

		var taskKindUp=(buildgid=="")?"0":"1"
		var updataform = document.createElement("form");
		updataform.id = "updataform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"taskForm_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		updataform.innerHTML = floatClose;
		if ((bidid < 19) && !GM_getValue(myacc() + "_mainvillageId")) {
			updataform.innerHTML += "<br/>" + aLangOtherText[0].big() + "!!!<br/><br/>" + aLangOtherText[1] + "<br/><br/>";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			privateeee=(privateee.singleNodeValue)?privateee:privatee
			updataform.innerHTML += aLangOtherText[2] + ":    <a href='" + privateeee.singleNodeValue.href + "'>&#160;&#160;&#160;&#160;&#160;" + privateeee.singleNodeValue.innerHTML + "</a><br/><br/>";
		}
		else {
			updataform.innerHTML += "<br/>" + aLangAddTaskText[0].big() + "<br/><br/>";
			updataform.innerHTML += aLangAddTaskText[1] + ":  <select id='taskkindss' disabled=true><option value='" + taskKindUp + "'>" + aLangTaskKind[taskKindUp] + "</option></select><br/><br/>";
			updataform.innerHTML += aLangAddTaskText[2] + ":  <select id='crtvillagee' disabled=true><option value='" + crtvillagee + "'>" + getvillagefromdid(crtvillagee) + "</option></select><br/><br/>";
			updataform.innerHTML += aLangAddTaskText[3] + ':  <select id="buildNamee" disabled=true><option value=\"' + buildNamee + "\">" + buildNamee + "</option></select><br/><br/>";
			updataform.innerHTML += aLangGameText[2] + ":  <select id='bidid' disabled=true><option value='" + bidid + "'>" + bidid + "</option></select>&#160;&#160;&#160;";
			updataform.innerHTML += aLangAddTaskText[4] + ":  " + levelselect(bnextlevel, bmaxlevel) + "<br/><br/>";
			tod = new Date();
			ye = tod.getFullYear();
			mon = tod.getMonth() + 1;
			dat = tod.getDate();
			hou = tod.getHours();
			minu = tod.getMinutes();
			sec = tod.getSeconds();
			if(hou<10){hou="0"+hou}
			if(minu<10){minu="0"+minu}
			if(sec<10){sec="0"+sec}
			nowtime = ye + "/" + mon + "/" + dat + " " + hou + ":" + minu + ":" + sec
			updataform.innerHTML += aLangGameText[4] + ":  <input type='text' id='userSetTime' readOnly= 'true' style='width:130px' value='" + nowtime + "' /><br/>";
			updataform.innerHTML += "(" + aLangGameText[5] + ")<br/><br/>"
			
			
			var oSubmitBtn = document.createElement("input");
			oSubmitBtn.name = "submitBtn";
			oSubmitBtn.id = "submitBtn";
			oSubmitBtn.value = "OK";
			oSubmitBtn.type = "button";
			oSubmitBtn.addEventListener('click', setTaskCookies, true);
//			oSubmitBtn.addEventListener('click', addToTasklist, true);
			updataform.appendChild(oSubmitBtn);
		}
		var oWrapper = document.createElement("div");
		oWrapper.id = "taskForm_wrapper";
		oWrapper.appendChild(updataform);
		
		var formCoords = getOption("FORM_POSITION", "218px_468px");
		formCoords = formCoords.split("_");
		oWrapper.style.top = formCoords[0];
		oWrapper.style.left = formCoords[1];
		
		document.body.appendChild(oWrapper);
		makeDraggable($("updataform"));
	}
	
	
	function getvillagefromdid(did){
		TS_debug("Called getvillagefromdid() with did="+did)
		returnval=false
//		var getitit = document.evaluate('id("vlist")//a[contains(@href,"newdid=' + did + '&")]', document, null, XPFirst, null);
		var getitit = document.evaluate('id("vlist")/descendant::a[@href]', document, null, XPSnap, null);
//		TS_debug("getvillagefromdid(): getitit="+getitit.singleNodeValue+";")
		if (getitit.snapshotLength > 0) {
			for (var i = 0; i < getitit.snapshotLength; i++) {
//				TS_debug("getvillagefromdid(): getitit("+i+")="+getitit.snapshotItem(i)+";")
				longstring = getitit.snapshotItem(i).href.match(/newdid=\d{2,}/)
//				TS_debug("getvillagefromdid(): longstring="+longstring+";")
				if (longstring=="newdid="+did) {
					returnval = getitit.snapshotItem(i).innerHTML;
					break;
				}
	
			}

		}
		
		return returnval ? returnval : GM_getValue(myacc() + "_mainvillageName")
//		return (getitit.singleNodeValue) ? getitit.singleNodeValue.innerHTML : GM_getValue(myacc() + "_mainvillageName")
	}
	
	
	function getDidFromVillage(vil){
		TS_debug("Called function getDidFromVillage() with vil="+vil)

		var getfoots = document.evaluate('id("vlist")/descendant::a[@href]', document, null, XPSnap, null);
//		TS_debug("getDidFromVillage(): getfoots="+getfoots+";")
		if (getfoots.snapshotLength > 0) {
			for (var i = 0; i < getfoots.snapshotLength; i++) {
//				TS_debug("getDidFromVillage(): getfoots.snapshotitem("+i+")="+getfoots.snapshotItem(i)+";")
//				TS_debug("getDidFromVillage(): getfoots.snapshotitem("+i+").InnerHTML="+getfoots.snapshotItem(i).innerHTML+";")
				if (getfoots.snapshotItem(i).innerHTML==vil) {
					longstring = getfoots.snapshotItem(i).href.match(/newdid=\d{2,}/); // value change from 3 to 2 by rhayader
					break;
				}
			}
			return longstring.toString().match(/\d{2,}/).toString() // value change from 3 to 2 by rhayader
		}
		else {
			return GM_getValue(myacc() + '_singleTownNEWDID')
		}
	}
	
	
	function levelselect(min, max){
		var levelsel = '<select id="levelselect" name="levelselect">'
		for (min; min <= max; min++) {
			levelsel += '<option value="' + min + '">'  + ' ' + aLangGameText[0] + ' ' + min + '</option>'
		}
		levelsel += '</select>';
		return levelsel
	}
	
	
	function getTaskCookies(){
	flag("ENTER--------------------- getTaskCookies");
		for (e in getAllVillageNewdids()) { //check all villages task cookies
//	flag("FOR check all village --------------------- getTaskCookies");
			whatever = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_waitTask", "false");
			if (whatever != "false"&&taskdoing=="1") {
//	flag("IF doing --------------------- getTaskCookies");
				allTasks = whatever.split("|");
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_");
					
					switch (thisTask[0]) {
					
						case "0":	// 0 is update
							var buildTimepoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_BuildingUpdataTime", "false")
							var resourceTimepoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_ResourceUpdataTime", "false")
							var updataTimepoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_UpdataTime", "false")
							if (GM_getValue(myacc() + "_raceID") == "0") { //Romans double build
								if (thisTask[1] < 19) {//resource
									if (resourceTimepoint == "false") {
										calldoing0();
										taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allsourceString, thisTask);
	flag("-----case 0 ---------------- getTaskCookies--------- taskTime =");
										TS_debug("the taskTime return from startBuildOrSetTime is " + taskTime);
										calldoing1();
									}
								}
								else 
									if (thisTask[1] > 18 && thisTask[1] < 42) { //build in village
										if (buildTimepoint == "false") {
											calldoing0();
											taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allbuildString, thisTask);
	flag("-----else case 0 ---------------- getTaskCookies--------- taskTime =");
											TS_debug("the taskTime return from startBuildOrSetTime is ");
											calldoing1();
										}
									}
									else {//if >=42, it is autoResourceModel
										if (resourceTimepoint == "false") {
											calldoing0();
											taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allsourceString, thisTask);
	flag("----else else case 0----------------- getTaskCookies--------- taskTime =" + taskTime);
											TS_debug("the taskTime return from startBuildOrSetTime is ");
											calldoing1();
										}
									}
							}
							else {// others race single build
								if (updataTimepoint == "false") {
									calldoing0();
									taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allString, thisTask);
	flag("--------------------- getTaskCookies--------- taskTime =" + taskTime);
									TS_debug("the taskTime return from startBuildOrSetTime is ");
									calldoing1()
								}
							}
							break;
								
						case "1"://"1" is new building 
							var buildTimepoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_BuildingUpdataTime", "false")
							var updataTimepoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_UpdataTime", "false")
							if (GM_getValue(myacc() + "_raceID") == "0") { //Romans double build
								if (buildTimepoint == "false") {
									calldoing0()
									taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allbuildString, thisTask)
	flag("------case 1 --------------- getTaskCookies--------- taskTime =");
									TS_debug("the taskTime return from startBuildOrSetTime is ")
									calldoing1()
								}
							}
							else {// others race single build
								if (updataTimepoint == "false") {
									calldoing0()
									taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allString, thisTask)
	flag("--------------------- getTaskCookies--------- taskTime =" );
									TS_debug("the taskTime return from startBuildOrSetTime is ")
									calldoing1()
								}
							}
							break;
							
						case "2":
								TS_debug("have task ID 2??");
	flag("-------case 2-------------- getTaskCookies--------- taskTime =");
					 		break;
							
							
/*					 case aLangTaskKind[3]:
					 break;*/
					
					
					 	case "4"://4_25_0_1248341858000_0_54,21,42,0,0,0,0,0,0,0_兵营
								TS_debug("have task ID 4??");
					 		break;
							
							
							
						case "5"://"5" is auto transport 5_model_toid_toposition//5_2_0_241654_500,500,500,500_0_1245413194000_interval
							var hereRemain=GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_userRemainSetup","0/0")
							var hereResource = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_ResourceNow", "false")
							var tarResource = GM_getValue(myacc() + "_" + thisTask[2] + "_ResourceNow", "false")
							var resTraning = GM_getValue(myacc() + "_" + thisTask[2] + "_ResourceTraning", "0/0/0/0")
							var userTranSetup = GM_getValue(myacc() + "_" + thisTask[2] + "_userTranSetup", "false")
							var WareCap = GM_getValue(myacc() + "_" + thisTask[2] + "_WarehouseCap", "false");
							var GranCap = GM_getValue(myacc() + "_" + thisTask[2] + "_GranaryCap", "false");
							var tranTimePoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_to_" + thisTask[3] + "_autoTransTime", "false")
							if (tarResource == "false" || WareCap == "false" || GranCap == "false") {
								window.location.replace(myhost + "/dorf2.php?newdid=" + thisTask[2])
							}
							if (hereResource == "false") {
								window.location.replace(myhost + "/dorf2.php?newdid=" + getAllVillageNewdids()[e])
							}
							var WareCap = parseInt(WareCap)
							var GranCap = parseInt(GranCap)
							var resnow = tarResource.split("/");
							resnow[0] = parseInt(resnow[0])
							resnow[1] = parseInt(resnow[1])
							resnow[2] = parseInt(resnow[2])
							resnow[3] = parseInt(resnow[3])
							var restran = resTraning.split("/");
							restran[0] = parseInt(restran[0])
							restran[1] = parseInt(restran[1])
							restran[2] = parseInt(restran[2])
							restran[3] = parseInt(restran[3])
							var reshere = hereResource.split("/");
							reshere[0] = parseInt(reshere[0])
							reshere[1] = parseInt(reshere[1])
							reshere[2] = parseInt(reshere[2])
							reshere[3] = parseInt(reshere[3])
							var hereremainn=hereRemain.split("/")
							hereremainn[0]=parseInt(hereremainn[0])
							hereremainn[1]=parseInt(hereremainn[1])
							if (tranTimePoint == "false") {
								if (userTranSetup == "false") {
									switch (thisTask[1]) {
										case "0"://building surport model.
											if (WareCap < 18000 || GranCap < 18000) {//  80%warehouse remain
												var transtarget1 = WareCap * 0.8
												var transtarget2 = GranCap * 0.8
											}
											else {//15000 and 16000 remain
												var transtarget1 = 15000;
												var transtarget2 = 16000;
											}
											break;
											
										case "1":
											var transtarget1 = WareCap * 0.9
											var transtarget2 = GranCap * 0.9
											break;
									}
								}
								else {
									var transtarget1 = parseInt(userTranSetup.split("/")[0]);
									var transtarget2 = parseInt(userTranSetup.split("/")[1]);
								}
								
								if ((resnow[0] + restran[0] + 200) < transtarget1 && (reshere[0] - hereremainn[0]) > 500 || (resnow[1] + restran[1] + 200) < transtarget1 && (reshere[1] - hereremainn[0]) > 500 || (resnow[2] + restran[2] + 200) < transtarget1 && (reshere[2] - hereremainn[0]) > 500 || (resnow[3] + restran[3] + 200) < transtarget2 && (reshere[3] - hereremainn[1]) > 500) {
									calldoing0()
									trantime = startTransOrSetTime(getAllVillageNewdids()[e], thisTask)
									TS_debug("the autotrantime back from startTransOrSetTime() is " + trantime)
									calldoing1()
								}
							}
						break;
							
					/*	
					 case aLangTaskKind[6]:
					 break;*/
					
					
					 case "7"://"7_" + theID +"_" + crtlevel + "_" + currentID() + "_" +theBuild
					 	var demoTime = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_demolishTime", "false");
						if(demoTime=="false"){
							calldoing0()
							demotimee=startDemoOrSetTime(getAllVillageNewdids()[e], thisTask)
							TS_debug("the demotime back from startDemoOrSetTime() is " + demotimee)
							calldoing1()
						}
						 break;
					 
					 
					 case "8":
					 	break;
					/* case aLangTaskKind[9]:
					 break;　　*/
					 default: {
					TS_debug("FM have task ID = " + thisTask[0] + " ??");
					 }
					}
				}
			}
		}
//	flag("-END -------------------- getTaskCookies--------- taskTime =");

	}
	
	function startDemoOrSetTime(vi){
		TS_debug("come into startDemoOrSetTime() at " + getvillagefromdid(vi) )
		var turl= myhost + "/build.php?newdid=" + vi + "&gid=15"
		var getDelayTime = new XMLHttpRequest();
		getDelayTime.open('GET', turl, false);
		getDelayTime.onreadystatechange = callback;
		getDelayTime.send(null);
		function callback(){
			if (getDelayTime.readyState == 4) {
				if (getDelayTime.status == 200) {
					TS_debug("here is startDemoOrSetTime callback function")
					
//	{v_kir 2010.01.25

					var aDoc = document/*.implementation.createDocument("", "", null)*/;
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getDelayTime.responseText;
//					aDoc.appendChild(aElem);
					
					var ddg=new Date();
//					if(aDoc.getElementById("demolish")){
					var snv = aDoc.evaluate('//*[@id="demolish"]', aElem, null, XPFirst, null).singleNodeValue;
					TS_debug("aDoc.evaluate('//*[@id=demolish]', aElem, null, XPFirst, null).singleNodeValue = " + snv);
					if(snv){
//						gettime=aDoc.getElementById("demolish").innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
						gettime=snv.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)

//	v_kir 2010.01.25}

						demot = gettime.toString().split(":")
						endt = ddg.getTime() + Number(demot[0]) * 60 * 60 * 1000 + Number(demot[1]) * 60 * 1000 + Number(demot[2]) * 1000+30000;
						ddg.setTime(endt)
						TS_debug("some demolish is doing, next demo start at "+ddg)
						GM_setValue(myacc() + "_" + vi + "_demolishTime", endt.toString());
						return endt
					}
					else{
						endt = ddg.getTime() +30000;
						ddg.setTime(endt)
						TS_debug("No demolish is doing, next demo start soon, just at "+ddg)
						GM_setValue(myacc() + "_" + vi + "_demolishTime", endt.toString());
						return endt
					}
				}
			}
		}
		return callback()
	}

	
	function startTransOrSetTime(vi, tTask) {
		TS_debug("come into startTransOrSetTime() from " + getvillagefromdid(vi) + " to " + getvillagefromdid(tTask[2]))
		var turl = myhost + "/build.php?newdid=" + vi + "&gid=17"
		var getDelayTime = new XMLHttpRequest();
		getDelayTime.open('GET', turl, false);
		getDelayTime.onreadystatechange = callback;
		getDelayTime.send(null);
		function callback(){
			if (getDelayTime.readyState == 4) {
				if (getDelayTime.status == 200) {
					TS_debug("here is startTransOrSetTime callback function")
								
//	{v_kir 2010.01.24

					var aDoc = document/*.implementation.createDocument("", "", null)*/;
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getDelayTime.responseText;
//					aDoc.appendChild(aElem);
					
//					resource = [aDoc.getElementById("l4").innerHTML.split("/")[0], aDoc.getElementById("l3").innerHTML.split("/")[0], aDoc.getElementById("l2").innerHTML.split("/")[0], aDoc.getElementById("l1").innerHTML.split("/")[0]]
					resource = [
						aDoc.evaluate('//td[@id="l4"]', aElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0],
						aDoc.evaluate('//td[@id="l3"]', aElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0],
						aDoc.evaluate('//td[@id="l2"]', aElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0],
						aDoc.evaluate('//td[@id="l1"]', aElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0]
					];
			
//	v_kir 2010.01.24}

					resstring = resource.join("/")
					GM_setValue(myacc() + "_" + vi + "_ResourceNow", resstring);
					resource[0] = parseInt(resource[0])
					resource[1] = parseInt(resource[1])
					resource[2] = parseInt(resource[2])
					resource[3] = parseInt(resource[3])
					var hereRemain = GM_getValue(myacc() + "_" + vi + "_userRemainSetup", "0/0")
					var hereremainn = hereRemain.split("/")
					hereremainn[0] = parseInt(hereremainn[0])
					hereremainn[1] = parseInt(hereremainn[1])
					
					var ma = "0"//this is just a mark,if transing is found ,it is "1", else "0".
					var transing = [0, 0, 0, 0]
					var Transtime = 1500000000000;
					var gugagaa = new Date()
					var reg111 = aLangGameText[10]; //to
					var reg222 = aLangGameText[12]; //back from
					var alltranTo = aDoc.evaluate('//table//a[contains(@href,"php?d=' + tTask[3] + '")]', aElem, null, XPSnap, null);
					if (alltranTo.snapshotLength > 0) {
						for (var z = 0; z < alltranTo.snapshotLength; z++) {
							if (alltranTo.snapshotItem(z).innerHTML.indexOf(reg111) != -1) {
								var ma = "1"
								ress = alltranTo.snapshotItem(z).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/>\d{1,}(?![:(\d:)])/g)
								
								transing[0] += parseInt(ress[0].split(">")[1])
								transing[1] += parseInt(ress[1].split(">")[1])
								transing[2] += parseInt(ress[2].split(">")[1])
								transing[3] += parseInt(ress[3].split(">")[1])
								
								resttt = alltranTo.snapshotItem(z).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
								restttttt = resttt.toString().split(":")
								gobacktime = gugagaa.getTime() + Number(restttttt[0]) * 60 * 60 * 1000 + Number(restttttt[1]) * 60 * 1000 + Number(restttttt[2]) * 1000;
								Transtime = Math.min(Transtime, gobacktime)
							}
						}
						if (ma == "0") {
							GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
						}
						lastTrantime = (Transtime == 1500000000000) ? 1500000000000 : Transtime + 5000
						GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", lastTrantime.toString())
						var oioi = new Date(lastTrantime)
						TS_debug("the traning will arrive at " + oioi)
						GM_setValue(myacc() + "_" + tTask[2] + "_ResourceTraning", transing.join("/"))
						TS_debug("all resources on transporting are " + transing.join("/"))
					}
					else {
						GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
					}
					
					var tarResource = GM_getValue(myacc() + "_" + tTask[2] + "_ResourceNow")
					var WareCap = GM_getValue(myacc() + "_" + tTask[2] + "_WarehouseCap");
					var GranCap = GM_getValue(myacc() + "_" + tTask[2] + "_GranaryCap");
					var userTranSetup = GM_getValue(myacc() + "_" + tTask[2] + "_userTranSetup", "false")
					
					var WareCap = parseInt(WareCap)
					var GranCap = parseInt(GranCap)
					var resnow = tarResource.split("/");
					resnow[0] = parseInt(resnow[0])
					resnow[1] = parseInt(resnow[1])
					resnow[2] = parseInt(resnow[2])
					resnow[3] = parseInt(resnow[3])
					
					var comm = [0, 0]
//					TS_debug("responsetime is "+getDelayTime.responseText);
					var pp = getDelayTime.responseText.match(/<b>\d{2,4}<\/b>/)
					comm[1] = pp.toString().match(/\d{2,4}/)
					var qq = aDoc.evaluate('//table[@id="target_select"]/descendant::td[@class="mer"]', aElem, null, XPFirst, null);
					comm[0] = qq.singleNodeValue.innerHTML.split(" ")[1].split("/")[0];
					TS_debug("now Merchants at home is " + comm[0] + ", and each Merchants can load " + comm[1]);
					comm[0] = parseInt(comm[0])
					comm[1] = parseInt(comm[1])
					if (userTranSetup == "false") {
						switch (tTask[1]) {
							case "0"://building surport model.
								if (WareCap < 18000 || GranCap < 18000) {//  80%warehouse remain
									var transtarget1 = WareCap * 0.8
									var transtarget2 = GranCap * 0.8
								}
								else {//15000 and 16000 remain
									var transtarget1 = 15000;
									var transtarget2 = 16000;
								}
								break;
								
							case "1":
								var transtarget1 = WareCap * 0.9
								var transtarget2 = GranCap * 0.9
								break;
						}
					}
					else {//user setup
						var transtarget1 = parseInt(userTranSetup.split("/")[0]);
						var transtarget2 = parseInt(userTranSetup.split("/")[1]);
					}
					
					var ddg = new Date();
					if (((resnow[0] + transing[0] + 200) < transtarget1 && (resource[0] - 500) > hereremainn[0]) || ((resnow[1] + transing[1] + 200) < transtarget1 && (resource[1] - 500) > hereremainn[0]) || ((resnow[2] + transing[2] + 200) < transtarget1 && (resource[2] - 500) > hereremainn[0]) || ((resnow[3] + transing[3] + 200) < transtarget2 && (resource[3] - 500) > hereremainn[1])) {
						if (comm[0] > 0) {
							Tasktime = ddg.getTime() + 10000
							GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_autoTransTime", Tasktime.toString())
							var d = new Date(Tasktime)
							TS_debug("============================================== next transport begin from " + d)
							return Tasktime
						}
						else {
							var waitTimee = 1500000000000;
							var allback = aDoc.evaluate('//table//a[contains(@href,"php?d=")]', aElem, null, XPSnap, null);
							if (allback.snapshotLength > 0) {
								for (var j = 0; j < allback.snapshotLength; j++) {
									if (allback.snapshotItem(j).innerHTML.indexOf(reg111) != -1) {
										ttt = allback.snapshotItem(j).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
										tttar = ttt.toString().split(":")
										gotime = Number(tttar[0]) * 60 * 60 * 1000 + Number(tttar[1]) * 60 * 1000 + Number(tttar[2]) * 1000
										alltimeback = gotime + getMerchanTime(vi, tTask[3])
										waitTimee = Math.min(waitTimee, alltimeback)
										TS_debug("the transout will came back after " + waitTimee)
									}
									else 
										if (allback.snapshotItem(j).innerHTML.indexOf(reg222) != -1) {
											ttt = allback.snapshotItem(j).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
											tttar = ttt.toString().split(":")
											gotime = Number(tttar[0]) * 60 * 60 * 1000 + Number(tttar[1]) * 60 * 1000 + Number(tttar[2]) * 1000
											waitTimee = Math.min(waitTimee, gotime)
											TS_debug("the comebacks will come back after..." + waitTimee)
										}
								}
							}
							Tasktime = ddg.getTime() + waitTimee + 10000;
							GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_autoTransTime", Tasktime.toString())
							var d = new Date(Tasktime)
							TS_debug("next transport begin from " + d)
							return Tasktime
						}
					}
					else {
						return "1500000000000"
						GM_deleteValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_autoTransTime")
						TS_debug("resource is enough, delete _autoTransTime in startTransOrSetTime")
					}
				}
			}
		}
		return callback()
	}
	
	
	function fleshTraning(vi, tTask){
		TS_debug("come into fleshTraning in " + getvillagefromdid(vi) + "; to " + getvillagefromdid(tTask[2]))
		var turl = myhost + "/build.php?newdid=" + vi + "&gid=17"
		var getDelayTime = new XMLHttpRequest();
		getDelayTime.open('GET', turl, false);
		getDelayTime.onreadystatechange = callback;
		getDelayTime.send(null);
		function callback(){
			if (getDelayTime.readyState == 4) {
				if (getDelayTime.status == 200) {
					TS_debug("transporting flesh Require callback here")
			
//	{v_kir 2010.01.24

					var aDoc = document/*.implementation.createDocument("", "", null)*/;
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getDelayTime.responseText;
//					aDoc.appendChild(aElem);
			
//	v_kir 2010.01.24}

					var ma = "0"
					var transing = [0, 0, 0, 0]
					var Transtime = 1500000000000;
					var gugagaa = new Date()
					var reg111 = aLangGameText[10]; // to
					var reg222 = aLangGameText[12]; // back from
					var alltranTo = aDoc.evaluate('//table//a[contains(@href,"php?d=' + tTask[3] + '")]', aElem, null, XPSnap, null);
					
					if (alltranTo.snapshotLength > 0) {
						for (var g = 0; g < alltranTo.snapshotLength; g++) {
							if (alltranTo.snapshotItem(g).innerHTML.indexOf(reg111) != -1) {
								var ma = "1"
								ress = alltranTo.snapshotItem(g).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/>\d{1,}(?![:(\d:)])/g)
								transing[0] += parseInt(ress[0].split(">")[1])
								transing[1] += parseInt(ress[1].split(">")[1])
								transing[2] += parseInt(ress[2].split(">")[1])
								transing[3] += parseInt(ress[3].split(">")[1])
								
								resttt = alltranTo.snapshotItem(g).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
								restttttt = resttt.toString().split(":")
								gobacktime = gugagaa.getTime() + Number(restttttt[0]) * 60 * 60 * 1000 + Number(restttttt[1]) * 60 * 1000 + Number(restttttt[2]) * 1000;
								Transtime = Math.min(Transtime, gobacktime)
							}
						}
						if (ma == "0") {
							TS_debug("some transport on road, but no out just back...")
							GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
							GM_setValue(myacc() + "_" + tTask[2] + "_ResourceTraning", "0/0/0/0")
						}
						lastTrantime = (Transtime == 1500000000000) ? 1500000000000 : Transtime + 5000
						GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", lastTrantime.toString())
						var ggr = new Date(lastTrantime)
						TS_debug("next reflesh start at " + ggr)
						GM_setValue(myacc() + "_" + tTask[2] + "_ResourceTraning", transing.join("/"))
						TS_debug("all resources on transporting are " + transing.join("/"))
						getTargetResource(tTask[2])
						return Transtime
					}
					else {
						TS_debug("No transport at all...")
						GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
						GM_setValue(myacc() + "_" + tTask[2] + "_ResourceTraning", "0/0/0/0")
						getTargetResource(tTask[2])
						return "1500000000000"
					}
				}
			}
		}
		return callback()
	}
	
	function getTargetResource(vi){
		TS_debug("come into getTargetResource at "+getvillagefromdid(vi))
		url = myhost + "/build.php" + "?newdid=" + vi
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: "",
			onload: function(response){
				TS_debug("getTargetResource Require callback here")
			
//	{v_kir 2010.01.24

				var auDoc = document/*.implementation.createDocument("", "", null)*/;
				var auElem = document.createElement('div');
				auElem.innerHTML = response.responseText;
//				auDoc.appendChild(auElem);
				
//				resource = [auDoc.getElementById("l4").innerHTML.split("/")[0], auDoc.getElementById("l3").innerHTML.split("/")[0], auDoc.getElementById("l2").innerHTML.split("/")[0], auDoc.getElementById("l1").innerHTML.split("/")[0]]
				resource = [
					auDoc.evaluate('//td[@id="l4"]', auElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0],
					auDoc.evaluate('//td[@id="l3"]', auElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0],
					auDoc.evaluate('//td[@id="l2"]', auElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0],
					auDoc.evaluate('//td[@id="l1"]', auElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0]
				];
				resstring = resource.join("/")
				WarehouseCap = auDoc.evaluate('//td[@id="l4"]', auElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[1];
				GranaryCap = auDoc.evaluate('//td[@id="l1"]', auElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[1];
			
//	v_kir 2010.01.24}

				GM_setValue(myacc() + "_" + vi + "_WarehouseCap", WarehouseCap);
				GM_setValue(myacc() + "_" + vi + "_GranaryCap", GranaryCap);
				GM_setValue(myacc() + "_" + vi + "_ResourceNow", resstring);
				TS_debug("refleshCOOKIE  in getTargetResource() to " + resstring)
				calldoing1()
			}
		})
	}
	
	function getMerchanTime(vi, positionnum){
		xRace = GM_getValue(myacc() + "_raceID")
		posi1 = getPosFromVill(getvillagefromdid(vi));
		sx1 = getXfromCoord(posi1)
		sy1 = getYfromCoord(posi1)
		sx2 = getXfromCoord(positionnum)
		sy2 = getYfromCoord(positionnum)
		qDist = getDistance(sx1, sy1, sx2, sy2)
		xRace=parseInt(xRace);
		var aTime = Math.round(qDist * 3600000 / mts[xRace]);
		return aTime;
	}
	
	
	function getDistance(sx1, sy1, sx2, sy2){
		var x1 = parseInt(sx1);
		var y1 = parseInt(sy1);
		var x2 = parseInt(sx2);
		var y2 = parseInt(sy2);
		var dX = Math.min(Math.abs(x2 - x1), Math.abs(801 - Math.abs(x2 - x1)));
		var dY = Math.min(Math.abs(y2 - y1), Math.abs(801 - Math.abs(y2 - y1)));
		var dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
		return dist;
	}
	
	
	function startBuildOrSetTime(Villageid, str, task){
		TS_debug("come into startBuildOrSetTime() at "+getvillagefromdid(Villageid))
		var turl = myhost + "/dorf1.php?newdid=" + Villageid
		var getDelayTime = new XMLHttpRequest();
		getDelayTime.open('GET', turl, false);
		getDelayTime.onreadystatechange = callback;
		getDelayTime.send(null);
		function callback(){
			if (getDelayTime.readyState == 4) {
				if (getDelayTime.status == 200) {
					TS_debug("startBuildOrSetTime callback here!");
			
//	{v_kir 2010.01.24

					var aDoc = document/*.implementation.createDocument("", "", null)*/;
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getDelayTime.responseText;
//					aDoc.appendChild(aElem);
			
//	v_kir 2010.01.24}

					if (task[0] == "0" && task[1] > 42) {//autoResource date get from here
						var CorpRemain = aDoc.evaluate("id('res')/descendant::td", aElem, null, XPSnap, null);
						hehe = CorpRemain.snapshotLength - 1
						corpcost = CorpRemain.snapshotItem(hehe).innerHTML.split("/")[0]
						corpprod = CorpRemain.snapshotItem(hehe).innerHTML.split("/")[1]
						GM_setValue(myacc() + "_" + Villageid + "_CorpRemain", (corpprod - corpcost))
						
						var mainVI = GM_getValue(myacc() + "_mainvillageId");
						var maxreslevel = (mainVI == Villageid) ? 20 : 10
						var doneID = GM_getValue(myacc() + "_" + Villageid + "_autoResourceDone", "20")
						var allRess = aDoc.evaluate('id("rx")//area[contains(@href,"build.php?id=")]', aElem, null, XPSnap, null);
						var numm = 20;
						var numm2 = 20;
						for (var i = 0; i < allRess.snapshotLength; i++) {//get the min level 
							temppp = allRess.snapshotItem(i).title.split(" ")
							ddq = parseInt(temppp[temppp.length - 1])
							numm = Math.min(numm, ddq);
						}
						sounttt = "0";//this is just a mark....found XXX, change to "1", no found remain "0"
						for (j = 0; j < allRess.snapshotLength; j++) {
							temppp = allRess.snapshotItem(j).title.split(" ")
							if (parseInt(temppp[temppp.length - 1]) == numm && allRess.snapshotItem(j).href.split("id=")[1].toString() != doneID) {
								myid = allRess.snapshotItem(j).href.split("id=")[1];
								GM_setValue(myacc() + "_" + Villageid + "_minLevelId", myid)
								sounttt = "1";
								break;
							}
						}
						if (sounttt == "0") {//the min level is onbuilding one, ok, i search for a higher level one
							if (numm >= maxreslevel - 1) {//all resources updats are finished
								closeAutoRes();
							}
							else {
								for (n = 0; n < allRess.snapshotLength; n++) {
									temppp = allRess.snapshotItem(n).title.split(" ")
									if (parseInt(temppp[temppp.length - 1]) == (numm + 1) && allRess.snapshotItem(n).href.split("id=")[1].toString() != doneID) {
										myid = allRess.snapshotItem(n).href.split("id=")[1];
										GM_setValue(myacc() + "_" + Villageid + "_minLevelId", myid)
										break;
									}
								}
							}
						}
						
						for (k = 0; k < allRess.snapshotLength; k++) {//collect all Crop level ,find the lowest one
							temsps = allRess.snapshotItem(k).title.split(" ")
							switch (temsps.length) {
								case 3:
									resNa = temsps[0]
									break;
								case 4:
									resNa = temsps[0] + " " + temsps[1]
									break;
								case 5:
									resNa = temsps[0] + " " + temsps[1] + " " + temsps[2]
									break;
								case 6:
									resNa = temsps[0] + " " + temsps[1] + " " + temsps[2] + " " + temsps[3]
									break;
							}
							if (resNa == aLangAllResInDorf1[3]) {
								ffq = parseInt(temsps[temsps.length - 1])
								numm2 = Math.min(numm2, ffq);
							}
						}
						mouu = "0"//this is a mark too, to find the minlevel crop
						for (l = 0; l < allRess.snapshotLength; l++) {
							temspp = allRess.snapshotItem(l).title.split(" ")
							switch (temspp.length) {
								case 3:
									resNaa = temspp[0]
									break;
								case 4:
									resNaa = temspp[0] + " " + temspp[1]
									break;
								case 5:
									resNaa = temspp[0] + " " + temspp[1] + " " + temspp[2]
									break;
								case 6:
									resNaa = temspp[0] + " " + temspp[1] + " " + temspp[2] + " " + temspp[3]
									break;
							}
							if (parseInt(temspp[temspp.length - 1]) == numm2 && resNaa == aLangAllResInDorf1[3] && allRess.snapshotItem(l).href.split("id=")[1].toString() != doneID) {
								myids = allRess.snapshotItem(l).href.split("id=")[1];
								GM_setValue(myacc() + "_" + Villageid + "_minLevelCropId", myids)
								mouu = "1";
								break;
							}
						}
						if (mouu == "0") {//the min level is onbuilding one, ok, i search for a higher level one
							if (numm2 < maxreslevel - 1) {
								for (m = 0; m < allRess.snapshotLength; m++) {
									temspsp = allRess.snapshotItem(m).title.split(" ")
									switch (temspsp.length) {
										case 3:
											resNasa = temspsp[0]
											break;
										case 4:
											resNasa = temspsp[0] + " " + temspsp[1]
											break;
										case 5:
											resNasa = temspsp[0] + " " + temspsp[1] + " " + temspsp[2]
											break;
										case 6:
											resNasa = temspsp[0] + " " + temspsp[1] + " " + temspsp[2] + " " + temspsp[3]
											break;
									}
									if (parseInt(temspsp[temspsp.length - 1]) == (numm2 + 1) && resNasa == aLangAllResInDorf1[3] && allRess.snapshotItem(m).href.split("id=")[1].toString() != doneID) {
										myids = allRess.snapshotItem(m).href.split("id=")[1];
										GM_setValue(myacc() + "_" + Villageid + "_minLevelCropId", myids)
										break;
									}
								}
							}
						}
					}//autoResouce data end here
					
					var aValue = aDoc.evaluate('id("building_contract")/descendant::td', aElem, null, XPSnap, null);
					if (aValue.snapshotLength > 0) {
						var testttt = "0"//this is a mark for search result, default is 0 ,if found ,change to 1
						for (var i = 0; i < aValue.snapshotLength; i++) {
							thestring = aValue.snapshotItem(i).innerHTML.split(" (")[0]
							if (thestring!=null &&str.indexOf(thestring) != -1) {//index resource name from the resourcestring
								TS_debug("which in building is = " + thestring)
								testttt = "1"
								var tt = aValue.snapshotItem(i).parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
								TS_debug("i get the building time = "+tt)
								ttar = tt.toString().split(":")
								arriveTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 +  6000
								ddg = new Date()
								Tasktime = ddg.getTime() + arriveTime

								switch (str) {
									case allsourceString:
										GM_setValue(myacc() + "_" + Villageid + "_ResourceUpdataTime", Tasktime.toString())
										TS_debug("startBuildOrSetTime(Villageid):resource is building, will return milsec= " + Tasktime.toString())
										var d = new Date(Tasktime)
										TS_debug("next task begin from " + d)
										return Tasktime
										break;
									case allbuildString:
										GM_setValue(myacc() + "_" + Villageid + "_BuildingUpdataTime", Tasktime.toString())
										TS_debug("startBuildOrSetTime(Villageid):building is building, will return milsec= " + Tasktime.toString())
										var d = new Date(Tasktime)
										TS_debug("next task begin from " + d)
										return Tasktime
										break;
									case allString:
										GM_setValue(myacc() + "_" + Villageid + "_UpdataTime", Tasktime.toString())
										TS_debug("startBuildOrSetTime(Villageid):something is building, will return milsec= " + Tasktime.toString())
										var d = new Date(Tasktime)
										TS_debug("next task begin from " + d)
										return Tasktime
										break;
								}
							}
						}
						if (testttt == "0") {//another kinds of building is building
							TS_debug("oh,another kinds of building is building, i can updata immediately")
							ddg = new Date()
							Tasktime = ddg.getTime() + 6000 //10 seconds later start build.
							switch (str) {
								case allsourceString:
									GM_setValue(myacc() + "_" + Villageid + "_ResourceUpdataTime", Tasktime.toString())
									TS_debug("startBuildOrSetTime(Villageid):resource will build soon, will return milsec= " + Tasktime.toString())
									return Tasktime
									break;
								case allbuildString:
									GM_setValue(myacc() + "_" + Villageid + "_BuildingUpdataTime", Tasktime.toString())
									TS_debug("startBuildOrSetTime(Villageid):building will build soon, will return milsec= " + Tasktime.toString())
									return Tasktime
									break;
								case allString: //it is impossible.
									TS_debug("only if allsourceString or allbuildString is wrong, this will be displayed.")
									break;
							}
						}
					}
					else {
						TS_debug("now,i find no build is building")
						ddg = new Date()
						Tasktime = ddg.getTime() + 5000
						switch (str) {
							case allsourceString:
								GM_setValue(myacc() + "_" + Villageid + "_ResourceUpdataTime", Tasktime.toString())
								TS_debug("startBuildOrSetTime(Villageid):resource will build soon, will return milsec=" + Tasktime.toString())
								return Tasktime
								break;
							case allbuildString:
								GM_setValue(myacc() + "_" + Villageid + "_BuildingUpdataTime", Tasktime.toString())
								TS_debug("startBuildOrSetTime(Villageid):building will build soon, will return milsec=" + Tasktime.toString())
								return Tasktime
								break;
							case allString:
								GM_setValue(myacc() + "_" + Villageid + "_UpdataTime", Tasktime.toString())
								TS_debug("startBuildOrSetTime(Villageid):something will build soon, will return milsec=" + Tasktime.toString())
								return Tasktime
								break;
						}
					}
				}
			}
		}
		return callback()
	}
	
	
	function startBuildnow(vill, kind){
		TS_debug("come into startBuildnow() at " + getvillagefromdid(vill))
		whatever = GM_getValue(myacc() + "_" + vill + "_waitTask", "false")
		allTasks = whatever.split("|")
		switch (kind) {
			case "0"://Romans Resource
				var t = "0"
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_")
					if (thisTask[0] == "0" && thisTask[1] < 19) {
						t = "1";
						b = getthebuildUrl(vill, thisTask);
						if (b) {
			
//	{v_kir 2010.01.24

//							buildurl = myhost + "/" + b
							buildurl = b;
			
//	v_kir 2010.01.24}

							thislevel = parseInt(GM_getValue(myacc() + "_" + vill + "_crtBuildlevel")) + 1
							TS_debug("start Require now")
							HttpRequire(buildurl, vill, thisTask, kind, thislevel)
							break;
						}
						else 
							if (getErrorInfor() == aLangErrorText[8]) {
								GM_deleteValue(myacc() + "_" + vill + "_ResourceUpdataTime")
								calldoing1()
								window.location.href = myhost + "/dorf1.php"
								break;
							}
							else 
								if (getErrorInfor().indexOf(aLangErrorText[2]) != -1) {
									GM_deleteValue(myacc() + "_" + vill + "_BuildingUpdataTime")
									deleteTaskFromCookie(vill, thisTask)
									calldoing1()
									break;
								}
								else {
									var dtime = new Date();
									delaytime = dtime.getTime() + 1800000;
									dtime.setTime(delaytime);
									GM_setValue(myacc() + "_" + vill + "_ResourceUpdataTime", delaytime.toString())
									TS_debug(getErrorInfor() + ", updata delay 30 minutes")
									calldoing1()
									window.location.href = myhost + "/dorf1.php"
									break;
								}
					}
					else 
						if (thisTask[0] == "0" && thisTask[1] > 42) {//Romans autoResource
							t = "1";
							thisTask[1] = getAutoResourceId(vill);
							b = getthebuildUrl(vill, thisTask);
							if (b) {
			
//	{v_kir 2010.01.24

//								buildurl = myhost + "/" + b
								buildurl = b;
			
//	v_kir 2010.01.24}

								thislevel = parseInt(GM_getValue(myacc() + "_" + vill + "_crtBuildlevel")) + 1
								TS_debug("start Require now")
								HttpRequire(buildurl, vill, thisTask, kind, thislevel)
								break;//greasemonkey.scriptvals.userscripts.org/Travian AutoTask.s7cn_23311_116685_minLevelCropId
							}
							else 
								if (getErrorInfor().indexOf(aLangErrorText[2]) != -1) {
									GM_deleteValue(myacc() + "_" + vill + "_autoResourceDone")
									GM_deleteValue(myacc() + "_" + vill + "_minLevelId")
									GM_deleteValue(myacc() + "_" + vill + "_minLevelCropId")
									GM_deleteValue(myacc() + "_" + vill + "_ResourceUpdataTime")
									calldoing1()
								}
								else 
									if (getErrorInfor() == aLangErrorText[5]) {
										GM_deleteValue(myacc() + "_" + vill + "_ResourceUpdataTime")
										calldoing1()
										addtaskbefore(vill, "10", kind);
									}
									else 
										if (getErrorInfor() == aLangErrorText[6]) {
											calldoing1()
											GM_deleteValue(myacc() + "_" + vill + "_ResourceUpdataTime")
											addtaskbefore(vill, "11", kind);
										}
										else 
											if ((getErrorInfor() == aLangErrorText[0]) || (getErrorInfor().indexOf(aLangErrorText[7]) != -1)) {
												var dtime = new Date();
												delaytime = dtime.getTime() + 1800000;
												dtime.setTime(delaytime);
												GM_setValue(myacc() + "_" + vill + "_ResourceUpdataTime", delaytime.toString())
												TS_debug(getErrorInfor() + ", updata delay 30 minutes")
												calldoing1()
												window.location.href = myhost + "/dorf1.php"
												break;
											}
							break;
						}
				}
				if (t == "0") {
					GM_deleteValue(myacc() + "_" + vill + "_ResourceUpdataTime")
					TS_debug("No resource updata task found, delete ResourceUpdataTime in startBuildnow()")
					calldoing1()
					window.location.href = myhost + "/dorf1.php"
				}
				break;
			case "1"://Romans building
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_")
					if (thisTask[0] == "0" && thisTask[1] > 18 && thisTask[1] < 42) {
						b = getthebuildUrl(vill, thisTask);
						if (b) {
			
//	{v_kir 2010.01.24

//							buildurl = myhost + "/" + b
							buildurl = b;
			
//	v_kir 2010.01.24}

							thislevel = parseInt(GM_getValue(myacc() + "_" + vill + "_crtBuildlevel")) + 1
							TS_debug("start Require now")
							HttpRequire(buildurl, vill, thisTask, kind, thislevel)
							break;
						}
						else 
							if (getErrorInfor().indexOf(aLangErrorText[2]) != -1) {
								GM_deleteValue(myacc() + "_" + vill + "_BuildingUpdataTime")
								deleteTaskFromCookie(vill, thisTask)
								calldoing1()
								break;
							}
							else {
								var dtime = new Date();
								delaytime = dtime.getTime() + 1800000;
								dtime.setTime(delaytime);
								GM_setValue(myacc() + "_" + vill + "_BuildingUpdataTime", delaytime.toString())
								TS_debug(getErrorInfor() + ", updata delay 30 minutes")
								calldoing1()
								window.location.href = myhost + "/dorf1.php"
								break;
							}
					}
					else 
						if (thisTask[0] == "1") { // Romans new build
							b = getthebuildUrl(vill, thisTask);
							if (b) {
			
//	{v_kir 2010.01.24

//								buildurl = myhost + "/" + b
								buildurl = b;
			
//	v_kir 2010.01.24}

								thislevel = 1
								TS_debug("start Require now")
								HttpRequire(buildurl, vill, thisTask, kind, thislevel)
								break;
							}
							else 
								if (getErrorInfor() == "newBuild can't run, something is here.") {
									var changeToUP = new Array();
									changeToUP[0] = "0"
									changeToUP[1] = thisTask[1]
									changeToUP[2] = thisTask[2]
									changeToUP[3] = thisTask[4]
									changeToUP[4] = thisTask[5]
									TS_debug("newBuild can't run, something is here. change to upgrade")
									deleteTaskFromCookie(vill, thisTask, changeToUP)
									calldoing1()
									window.location.href = myhost + "/dorf1.php"
									break;
								}
								else {
									var dtime = new Date();
									delaytime = dtime.getTime() + 1800000;
									dtime.setTime(delaytime);
									GM_setValue(myacc() + "_" + vill + "_BuildingUpdataTime", delaytime.toString())
									TS_debug(getErrorInfor() + ", updata delay 30 minutes")
									calldoing1()
									window.location.href = myhost + "/dorf1.php"
									break;
								}
						}
				}
				break;
			case "2"://other race every updata
				var t = "0"
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_");
					if (thisTask[0] == "0" && thisTask[1] < 42) {
						t = "1";
						b = getthebuildUrl(vill, thisTask);
						if (b) {
			
//	{v_kir 2010.01.24

//							buildurl = myhost + "/" + b
							buildurl = b;
			
//	v_kir 2010.01.24}

							thislevel = parseInt(GM_getValue(myacc() + "_" + vill + "_crtBuildlevel")) + 1
							TS_debug("start Require now")
							HttpRequire(buildurl, vill, thisTask, kind, thislevel)
							break;
						}
						else {
							var dtime = new Date();
							delaytime = dtime.getTime() + 1800000;
							dtime.setTime(delaytime);
							GM_setValue(myacc() + "_" + vill + "_UpdataTime", delaytime.toString())
							TS_debug(getErrorInfor() + ", updata delay 30 minutes")
							calldoing1()
							window.location.href = myhost + "/dorf1.php"
							break;
						}
					}
					else 
						if (thisTask[0] == "0" && thisTask[1] > 41) {//autoResource
							t = "1";
							thisTask[1] = getAutoResourceId(vill);
							b = getthebuildUrl(vill, thisTask);
							if (b) {
			
//	{v_kir 2010.01.24

//								buildurl = myhost + "/" + b
								buildurl = b;
			
//	v_kir 2010.01.24}

								thislevel = parseInt(GM_getValue(myacc() + "_" + vill + "_crtBuildlevel")) + 1
								TS_debug("start Require now")
								HttpRequire(buildurl, vill, thisTask, kind, thislevel)
								break;
							}
							else 
								if (getErrorInfor() == aLangErrorText[5]) {
									GM_deleteValue(myacc() + "_" + vill + "_UpdataTime")
									calldoing1()
									addtaskbefore(vill, "10", kind);
								}
								else 
									if (getErrorInfor() == aLangErrorText[6]) {
										GM_deleteValue(myacc() + "_" + vill + "_UpdataTime")
										calldoing1()
										addtaskbefore(vill, "11", kind);
									}
									else 
										TS_debug("aLangErrorText[0] = " + aLangErrorText[0] + ", aLangErrorText[7] = " + aLangErrorText[7] + ", getErrorInfor().indexOf(aLangErrorText[7]) = " + getErrorInfor().indexOf(aLangErrorText[7]));
										if (getErrorInfor() == aLangErrorText[0] || getErrorInfor().indexOf(aLangErrorText[7]) != -1) {
											var dtime = new Date();
											delaytime = dtime.getTime() + 1800000;
											dtime.setTime(delaytime);
											GM_setValue(myacc() + "_" + vill + "_UpdataTime", delaytime.toString())
											TS_debug(getErrorInfor() + ", updata delay 30 minutes")
											calldoing1()
											window.location.href = myhost + "/dorf1.php"
											break;
										}
										else {
											GM_deleteValue(myacc() + "_" + vill + "_UpdataTime")
											TS_debug("No updata task found, delete UpdataTime in startBuildnow()")
											calldoing1()
											window.location.href = myhost + "/dorf1.php"
											break;
										}
						}
						else 
							if (thisTask[0] == "1") {//new build
								t = "1";
								b = getthebuildUrl(vill, thisTask);
								if (b) {
			
//	{v_kir 2010.01.24
//									buildurl = myhost + "/" + b
									buildurl = b;
			
//	v_kir 2010.01.24}
									thislevel = 1;
									TS_debug("start Require now");
									HttpRequire(buildurl, vill, thisTask, kind, thislevel);
									break;
								}
								else 
								if (getErrorInfor() == "newBuild can't run, something is here.") {
									var changeToUP = new Array();
									changeToUP[0] = "0";
									changeToUP[1] = thisTask[1];
									changeToUP[2] = thisTask[2];
									changeToUP[3] = thisTask[4];
									changeToUP[4] = thisTask[5];
									TS_debug("newBuild can't run, something is here. change to upgrade");
									deleteTaskFromCookie(vill, thisTask, changeToUP)
									calldoing1()
									window.location.href = myhost + "/dorf1.php"
									break;
								}
								else {
									var dtime = new Date();
									delaytime = dtime.getTime() + 1800000;
									dtime.setTime(delaytime);
									GM_setValue(myacc() + "_" + vill + "_UpdataTime", delaytime.toString());
									TS_debug(getErrorInfor() + ", updata delay 30 minutes");
									calldoing1();
									window.location.href = myhost + "/dorf1.php";
									break;
								}
							}
				}
				if (t == "0") {
					GM_deleteValue(myacc() + "_" + vill + "_UpdataTime")
					TS_debug("No updata task found, delete UpdataTime in startBuildnow()")
					calldoing1()
					window.location.href = myhost + "/dorf1.php"
				}
				break;
		}
	}
	
	/**
	 * Starts an attack task.
	 */
	function startAttackNow(vi, ATask) { // 2_targetPosition_kind_repeat_startTime_interval_troops_kata1_kata2
		TS_debug("startAttackNow: begin at " + getvillagefromdid(vi));
		var reqUrl = myhost + "/a2b.php" + "?newdid=" + vi;
		TS_getRequest(reqUrl, startAttackNPrepare, vi, ATask);
	}
	
	/**
	 * Attack task phase function.
	 */
	function startAttackNPrepare(a2b_doc, vi, ATask) { // 2_targetPosition_kind_repeat_startTime_interval_troops_kata1_kata2
		var reqData;
		if (ATask == undefined)
		{ TS_debug("startAttackNPrepare: Error - parameter definition missing!"); return; }
		formTag = getFormNode(a2b_doc);
		if (formTag == null)
		{ TS_debug("startAttackNPrepare: Error - no form in the answer area"); return; }
		TS_debug("startAttackNPrepare: Callback starting");
		var reqUrl = myhost + "/a2b.php" + "?newdid=" + vi;
		// Other values stored in form
		var timestamp = getFormHidVal(formTag, "timestamp");
		var timestamp_checksum = getFormHidVal(formTag, "timestamp_checksum");
		// For unknown purposes, a mouse position over button is sent with the form
		var s1xPos = Math.floor(46*Math.random())+1;
		var s1yPos = Math.floor(19*Math.random())+1;
		// Target
		var targetPos = new Array();
		targetPos[0] = getXfromCoord(ATask[1]);
		targetPos[1] = getYfromCoord(ATask[1]);
		// Troop amounts
		var troo = ATask[6].split(",");
		var kata = ATask[7];
		var kata2 = ATask[8];
		// Two versions - with katapults and without them
		if (kata > 0) {
			reqData = "timestamp=" + timestamp + "&timestamp_checksum=" + timestamp_checksum + "&b=" + 1 + "&c=" + ATask[2] + "&kid=" + ATask[1]
			 + "&t1=" + troo[0] + "&t2=" + troo[1] + "&t3=" + troo[2] + "&t4=" + troo[3] + "&t5=" + troo[4] + "&t6=" + troo[5]
			 + "&t7=" + troo[6] + "&t8=" + troo[7] + "&t9=" + troo[8] + "&t10=" + troo[9] + "&t11=" + troo[10]
			 + "&kata=" + kata + "&kata2=" + kata2
			 + "&dname=&x=" + targetPos[0] + "&y=" + targetPos[1] + "&s1.x=" + s1xPos + "&s1.y=" + s1yPos + "&s1=ok&attacks=&cords=";
		}
		else {
			reqData = "timestamp=" + timestamp + "&timestamp_checksum=" + timestamp_checksum + "&b=" + 1 + "&c=" + ATask[2] + "&kid=" + ATask[1]
			 + "&t1=" + troo[0] + "&t2=" + troo[1] + "&t3=" + troo[2] + "&t4=" + troo[3] + "&t5=" + troo[4] + "&t6=" + troo[5]
			 + "&t7=" + troo[6] + "&t8=" + troo[7] + "&t9=" + troo[8] + "&t10=" + troo[9] + "&t11=" + troo[10]
			 + "&dname=&x=" + targetPos[0] + "&y=" + targetPos[1] + "&s1.x=" + s1xPos + "&s1.y=" + s1yPos + "&s1=ok&attacks=&cords=";
		}
                TS_postRequest(reqUrl,reqData,startAttackNAccept, vi, ATask);
	}

	/**
	 * Attack task phase function.
	 */
	function startAttackNAccept(a2b_doc, vi, ATask) {
		var reqData, formTag;
		if (ATask == undefined)
		{ TS_debug("startAttackNAccept: Error - parameter definition missing!"); return; }
		formTag = getFormNode(a2b_doc);
		if (formTag == null)
		{ TS_debug("startAttackNAccept: Error - no form in the answer area"); return; }
		TS_debug("startAttackNAccept: Callback starting");
		var reqUrl = myhost + "/a2b.php" + "?newdid=" + vi;
		// Other values stored in form
		var timestamp = getFormHidVal(formTag, "timestamp");
		var timestamp_checksum = getFormHidVal(formTag, "timestamp_checksum");
		// For unknown purposes, a mouse position over button is sent with the form
		var s1xPos = Math.floor(46*Math.random())+1;
		var s1yPos = Math.floor(19*Math.random())+1;
		// The other parameters from the previous a2b form
		idVal = getFormHidVal(formTag, "id");
		aVal = getFormHidVal(formTag, "a");
		cVal = getFormHidVal(formTag, "c"); // This value determines attack type
		kidVal = getFormHidVal(formTag, "kid");
		if ((formTag.innerHTML.indexOf("m\x65\x66i\x73\x74o") > 0) && (cVal != 2))
		{ startAttackNFinish(a2b_doc, vi, ATask); return; };
		var troo = ATask[6].split(",");
		kata = ATask[7];
		kata2 = ATask[8];
		if (kata > 0)
		{
			reqData = "timestamp=" + timestamp + "&timestamp_checksum=" + timestamp_checksum + "&id=" + idVal + "&a=" + aVal + "&c=" + cVal + "&kid=" + kidVal
			 + "&t1=" + troo[0] + "&t2=" + troo[1] + "&t3=" + troo[2] + "&t4=" + troo[3] + "&t5=" + troo[4] + "&t6=" + troo[5]
			 + "&t7=" + troo[6] + "&t8=" + troo[7] + "&t9=" + troo[8] + "&t10=" + troo[9] + "&t11=" + troo[10]
			 + "&kata=" + kata + "&kata2=" + kata2
			 + "&s1.x=" + s1xPos + "&s1.y=" + s1yPos + "&s1=ok&attacks=&cords=";
		} else
		{
			reqData = "timestamp=" + timestamp + "&timestamp_checksum=" + timestamp_checksum + "&id=" + idVal + "&a=" + aVal + "&c=" + cVal + "&kid=" + kidVal
			 + "&t1=" + troo[0] + "&t2=" + troo[1] + "&t3=" + troo[2] + "&t4=" + troo[3] + "&t5=" + troo[4] + "&t6=" + troo[5]
			 + "&t7=" + troo[6] + "&t8=" + troo[7] + "&t9=" + troo[8] + "&t10=" + troo[9] + "&t11=" + troo[10]
			 + "&s1.x=" + s1xPos + "&s1.y=" + s1yPos + "&s1=ok&attacks=&cords=";
		}
                TS_postRequest(reqUrl, reqData, startAttackNFinish, vi, ATask);
	}
	
	/**
	 * Attack task finalization function.
	 */
	function startAttackNFinish(a2b_doc, vi, ATask) {
		TS_debug("startAttackNFinish: Callback starting");
		if (ATask[3] == "0") {
			deleteTaskFromCookie(vi, ATask);
		} else
		{
			randominter=Math.ceil(Math.random()*300000)
			var newTask = new Array(); // |2_241654_3_0_1248014400000_0_0,0,0,0,0,5,0,0,0,0,0_0_0
			var nowt=new Date();
			newTask[0] = ATask[0];
			newTask[1] = ATask[1];
			newTask[2] = ATask[2];
			temp = Number(ATask[3]) - 1
			newTask[3] = temp.toString();
			if (ATask[5] == "0") {
				temp2 = nowt.getTime() + 24 * 60 * 60 * 1000 + randominter;
			}
			else {
				temp2 = nowt.getTime() + Number(ATask[5]) + randominter;
			}
			newTask[4] = temp2.toString();
			newTask[5] = ATask[5];
			newTask[6] = ATask[6];
			newTask[7] = ATask[7];
			newTask[8] = ATask[8];
			
			deleteTaskFromCookie(vi, ATask,newTask);
		}
		calldoing1();
		printMSG(aLangTaskOfText[31]);
		window.location.replace("dorf1.php?newdid=" + vi);
	}

	function getTrainData(vi, task){
		TS_debug("come into getTrainData(vi,idd), at " + getvillagefromdid(vi))
		var url = myhost + "/build.php?newdid=" + vi + "&id=" + task[1];
		var getbuildurl = new XMLHttpRequest();
		getbuildurl.open('GET', url, false);
		getbuildurl.onreadystatechange = callback;
		getbuildurl.send(null);
		function callback(){
			if (getbuildurl.readyState == 4) {
				if (getbuildurl.status == 200) {
					TS_debug("here is getTrainData() callback function")
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getbuildurl.responseText; // 4_25_0_1248341858000_0_54,21,42,0,0,0,0,0,0,0_兵营
					aDoc.appendChild(aElem);
					
					troo=task[5].split(",");
					var maxx = aDoc.getElementsByClassName("max");
					var texts= aDoc.getElementsByClassName("text");

					for(i in texts){
//					for(var i = 0; i < texts.snapshotLength; i++){
//						maxNum = maxx[i].innerHTML.split("(")[1].split(")")[0];
						maxNum = maxx[i].innerHTML.split("value=")[1].split(";")[0];
						maxNum = Number(maxNum);
						troNum = Number(texts[i].name.split("t")[1])-1;
						troo[troNum]=(troo[troNum]<maxNum)?troo[troNum]:maxNum;
					}
					
					var input = aDoc.getElementsByTagName("input");
					for (var m = 0; m < input.length; m++) {
						if (input[m].getAttribute("name") == "z") {
							z = input[m].getAttribute("value");
							break;
						}
					}
					trainstring = "id="+task[1]+"&z="+z+"&a=2" + "&t1=" + troo[0] + "&t2=" + troo[1] + "&t3=" + troo[2] + "&t4=" + troo[3] + "&t5=" + troo[4] + "&t6=" + troo[5] + "&t7=" + troo[6] + "&t8=" + troo[7] + "&t9=" + troo[8] + "&t10=" + troo[9];
					return trainstring;
				}
			}
		}
		return callback()
	}
	
	function startTrainNow(vi,tTask) { // 4_25_0_1248341858000_0_54,21,42,0,0,0,0,0,0,0_兵营
		TS_debug("come into startTrainNow(), at " + getvillagefromdid(vi))
		url = myhost + "/build.php" + "?newdid=" + vi
		daa =getTrainData(vi,tTask)
		dataa = encodeURI(daa)
		GM_xmlhttpRequest({
			method: 'POST',
			url: url,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: dataa,
			onload: function(response){
				TS_debug("startTrainNow(vi,tTask) Require callback here")
				if (tTask[2] == "0") {
					deleteTaskFromCookie(vi, tTask)
				}
				else {
					var newTask = new Array();//4_25_10_1250261897000_600000_0,0,10,0,0,0,0,0,0,0_兵营
					var nowt=new Date();
					newTask[0] = tTask[0];
					newTask[1] = tTask[1];
					temp = Number(tTask[2]) - 1
					newTask[2] = temp.toString();
					if (tTask[4] == "0") {
						temp2 = nowt.getTime() + 3 * 60 * 60 * 1000
					}
					else {
						temp2 = nowt.getTime() + Number(tTask[4])
					}
					newTask[3] = temp2.toString();
					newTask[4] = tTask[4];
					newTask[5] = tTask[5];

					newTask[6] = tTask[6];
					
					deleteTaskFromCookie(vi, tTask,newTask)
				}
				calldoing1()
				printMSG(aLangTaskOfText[34])
				window.location.replace("dorf1.php?newdid=" + vi)
			}
		})
	}

function startCustomTranNow(vi, task){//8_241654_500,500,500,500_0_1245413194000_interval
	TS_debug("come into startCustomTranNow() at " + getvillagefromdid(vi))
	var turl = myhost + "/build.php?newdid=" + vi + "&gid=17"
	GM_xmlhttpRequest({
		method: 'GET',
		url: turl,
		headers: "",
		onload: function(responseDetails){
			TS_debug("here is startCustomTranNow callback function")
			
//	{v_kir 2010.01.24

			var ssDoc = document/*.implementation.createDocument("", "", null)*/;
			var ssElem = document.createElement('DIV');
			ssElem.innerHTML = responseDetails.responseText;
//			ssDoc.appendChild(ssElem);

//			resource = [ssDoc.getElementById("l4").innerHTML.split("/")[0], ssDoc.getElementById("l3").innerHTML.split("/")[0], ssDoc.getElementById("l2").innerHTML.split("/")[0], ssDoc.getElementById("l1").innerHTML.split("/")[0]]
			resource = [
				ssDoc.evaluate('//td[@id="l4"]', ssElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0],
				ssDoc.evaluate('//td[@id="l3"]', ssElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0],
				ssDoc.evaluate('//td[@id="l2"]', ssElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0],
				ssDoc.evaluate('//td[@id="l1"]', ssElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0]
			];
			
//	v_kir 2010.01.24}

			resource[0] = parseInt(resource[0])
			resource[1] = parseInt(resource[1])
			resource[2] = parseInt(resource[2])
			resource[3] = parseInt(resource[3])
			
			var hereRemain = GM_getValue(myacc() + "_" + vi + "_userRemainSetup", "0/0")
			var hereremainn = hereRemain.split("/")
			hereremainn[0] = parseInt(hereremainn[0])
			hereremainn[1] = parseInt(hereremainn[1])
			
			var ids = ssDoc.evaluate('//div[@id="textmenu"]/a', ssElem, null, XPFirst, null);
			theid = ids.singleNodeValue.href.split("id=")[1];
			var ddg = new Date();
			comm = ["", ""];
			var pp = ssDoc.evaluate('//table[@id="send_select"]/descendant::td[@class="max"]/a', ssElem, null, XPFirst, null);
			comm[1] = pp.singleNodeValue.innerHTML.match(/\d{3,4}/)
			var qq = ssDoc.evaluate('//table[@id="target_select"]/descendant::td[@class="mer"]', ssElem, null, XPFirst, null);
			comm[0] = qq.singleNodeValue.innerHTML.split(" ")[1].split("/")[0]
			TS_debug("now Merchants at home is " + comm[0] + ", and each Merchants can load " + comm[1])
			comm[0] = parseInt(comm[0])
			comm[1] = parseInt(comm[1])
			
			if ((resource[0] - hereremainn[0]) > 500 || (resource[1] - hereremainn[0]) > 500 || (resource[2] - hereremainn[0]) > 500 || (resource[3] - hereremainn[1]) > 500) {
				if (comm[0] > 0) {
					balance = task[2].split(",")
					balance[0] = Number(balance[0])
					balance[1] = Number(balance[1])
					balance[2] = Number(balance[2])
					balance[3] = Number(balance[3])
					baalaa = getTranAmount(balance, resource, hereremainn)
					autoTranRequire(task, baalaa, vi, theid)
				}
				else {
					if (task[3] == "0") {
						calldoing1()
						deleteTaskFromCookie(vi, task)
						TS_debug("No merchant now, deleted the autoTransTime in startTrannow()")
					}
					else {
						var newTask = new Array();
						newTask[0] = task[0];
						newTask[1] = task[1];
						newTask[2] = task[2];
						temp = Number(task[3]) - 1
						newTask[3] = temp.toString();
						if (task[5] == "0") {
							temp2 = ddg.getTime() + 6 * 60 * 60 * 1000
						}
						else {
							temp2 = ddg.getTime() + Number(task[5])
						}
						newTask[4] = temp2.toString();
						newTask[5] = task[5];
						
						calldoing1()
						deleteTaskFromCookie(vi, task, newTask)
						TS_debug("No merchant now, delay Transport")
					}
					window.location.href = myhost + "/dorf1.php"
				}
			}
			else {
				var newTask = new Array();
				newTask[0] = task[0];
				newTask[1] = task[1];
				newTask[2] = task[2];
				temp = Number(task[3]) - 1
				newTask[3] = temp.toString();
				if (task[5] == "0") {
					temp2 = ddg.getTime() + 6 * 60 * 60 * 1000;
				}
				else {
					temp2 = ddg.getTime() + Number(task[5]);
				}
				newTask[4] = temp2.toString();
				newTask[5] = task[5];
				
				calldoing1();
				deleteTaskFromCookie(vi, task, newTask);
				TS_debug("No enough resource, delay Transport");
			}
		}
	});
}

function startImproNow(vi, Task) { // 3_2_27_古罗马步兵_1_11_1251616724168
//	TS_debug("come into startImproNow() at "+getvillagefromdid(vi));
	var improveurl=getImproveUrl(vi,Task);
//	TS_debug("improveurl&&Number(improveurl) = "+improveurl&&Number(improveurl));
//	TS_debug("Number(Task[5]) = "+Number(Task[5]));
	if (improveurl) {
	//	we now get the full improve URL, extract the level from it
		var re = /.*\&a=(\d+).*/;
		var improveurlarray = re.exec(improveurl);
		var improvelevel = improveurlarray[1];
		TS_debug("========================  improvelevel = "+improvelevel);
	//	TS_debug("improveurl = "+myhost + "/" + improveurl);
		if (Number(improvelevel)<Number(Task[5])){
	//		url = myhost + "/build.php" + "?newdid=" + vi+"&id="+Task[2]+"&a="+Task[4]
			url = myhost + "/" + improveurl;
			flag("try to improve.. url = "+url);
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				headers: {
					'Accept': 'application/atom+xml,application/xml,text/xml',
					'Content-type': 'application/x-www-form-urlencoded'
				},
				data: "",
				onload: function(responseDetails){
	//			TS_debug("here is startImproNow callback function")
					var ssDoc = document.implementation.createDocument("", "", null);
					var ssElem = document.createElement('DIV');
					ssElem.innerHTML = responseDetails.responseText;
					ssDoc.appendChild(ssElem);	
					ssTime = ssDoc.getElementsByClassName("dur")[0];
					if (ssTime) {
						finiTime=ssDoc.getElementsByClassName("dur")[0].innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
							ttar = finiTime.toString().split(":")
							finTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 +  180000
							ddg = new Date()
							Tasktime = ddg.getTime() + finTime
	
							var newTask = new Array()//3_2_27_帝国骑士_5_14_1251299622897
							newTask[0] = Task[0];
							newTask[1] = Task[1];
							newTask[2] = Task[2];
							newTask[3] = Task[3];
							newTask[4] = Task[4];
							newTask[5] = Task[5];
							newTask[6] = Tasktime.toString();
							TS_debug("Improve now ok!");
							deleteTaskFromCookie(vi, Task, newTask)
			
						calldoing1()
						printMSG(aLangTaskOfText[48]+aLangTaskOfText[5])
					window.location.replace("build.php?newdid=" + vi+"&id="+Task[2])
					} 
					else {
						TS_debug("improve failed: " + url);
						calldoing1()
					}
				}
			})		
		}
		else if(improveurl&&improveurl==Task[5]){
			deleteTaskFromCookie(vi, Task)
			calldoing1()
		}
		else{
			calldoing1()
		}
	}
	else{
		calldoing1()
	}
}

function getImproveUrl(vi,Task){//3_2_27_古罗马步兵_1_11_1251616724168
	TS_debug("======================= come into getImproveUrl() at " + getvillagefromdid(vi));
//	flag("come into getImproveUrl() at " + getvillagefromdid(vi));
	switch (Task[1]) {
		case "1":
//			flag("get improve url case 1");
			var url = myhost + "/build.php?newdid=" + vi + "&gid=12";
//			flag("get improve url case 1 + url = " + url);

			break;
		case "2":
//			flag("get improve url case 2");
			var url = myhost + "/build.php?newdid=" + vi + "&gid=13";
			break;
		default:
			TS_debug("got Task[1] = " + Task[1] + "??");
	}
	TS_debug("url = " + url);
	flag("get improve url continue " + url);
		
	var getbuildurl = new XMLHttpRequest();
	getbuildurl.open('POST', url, false);
	getbuildurl.onreadystatechange = callback;
	getbuildurl.send(null);
	function callback(){
		if (getbuildurl.readyState == 4) {
			if (getbuildurl.status == 200) {
//				TS_debug("here is getImproveUrl callback function");
				flag("here is getImproveUrl callback function");
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = getbuildurl.responseText;
//				TS_debug("with response: " + getbuildurl.responseText);
				flag("with response: " + getbuildurl.responseText);
				aDoc.appendChild(aElem);
				
				var gettroops=aDoc.evaluate('//td[@class="desc"]', aElem, null, XPSnap, null);
//				var gettroops=aDoc.evaluate('//div[@class="tit"]//a', aDoc, null, XPSnap, null);
				var gettroopslevel=aDoc.evaluate('//td[@class="desc"]/*/span[@class="info"]', aDoc, null, XPSnap, null);
				var gettroopslink=aDoc.evaluate('//td[@class="act"]', aDoc, null, XPSnap, null);
				var myRace1 = Number(GM_getValue(myacc() + "_raceID"));
				flag("myacc="+myRace1);
				

				flag("gettroops.snapshotLength = "+gettroops.snapshotLength);
				for (var i = 0; i < gettroops.snapshotLength; i++) {
//					var troopname = gettroops.snapshotItem(i).firstChild.nextSibling.innerHTML
//					var trooplevel = gettroops.snapshotItem(i).firstChild.nextSibling.nextSibling.nextSibling.innerHTML.split(" ")[1].split(")")[0]
					var troopname=gettroops.snapshotItem(i).innerHTML;
//					TS_debug('TroopLevel (' + troopname + ') = ' + gettroopslevel.snapshotItem(i).innerHTML);
//				var trooplevel=gettroops.snapshotItem(i).firstChild.nextSibling.nextSibling.nextSibling.innerHTML.split(" ")[1].split(")")[0];
					var trooplevel0=gettroopslevel.snapshotItem(i).innerHTML.replace(/\s/g," ").split(" ");
//				TS_debug("split elements, first, last" + trooplevel0[0] + " / " + trooplevel0[trooplevel0.length-1] + " / " + trooplevel0.length);
					var trooplevel=trooplevel0[trooplevel0.length-1].split(")")[0];
//					var trooplevel=gettroopslevel.snapshotItem(i).innerHTML.split(" ")[1].split(")")[0];
					flag("If test troopname " + Task[3]);

					if (troopname == Task[3]) {
						flag("try to improve " + troopname + " from level " + trooplevel);
//						theposs = gettroops.snapshotItem(i).firstChild
						theposs = gettroopslink.snapshotItem(i) //.firstChild
						if (theposs.firstChild.href) {
//							TS_debug("improve possible..")
//							return trooplevel
//							TS_debug("improve href = " + theposs.firstChild.href);
							return theposs.firstChild.href;
						}
						else {
//							TS_debug("no improve link found -> improve not possible?");
							var ddg=new Date()
							var improveError = theposs.innerHTML
//							TS_debug("improveError = " + improveError);
//							TS_debug("aLangErrorText[4] = " + aLangErrorText[4]);
							if ((improveError == aLangErrorText[4])
							 || (improveError.substring(0,4).toLowerCase() == "<tab")
							 || (improveError.substring(0,4).toLowerCase() == "<spa")
							 ) { // check for finish time by Travian or TB3  or (improveError.substring(0,4) == "<tab")
//								TS_debug("at " + getvillagefromdid(vi) + "; " + aLangErrorText[4] + ", improve delay to endTime")
								var timer = aDoc.getElementById("timer1");
								if (!timer) {
									//timer = theposs.getElementById("timeouta");
								}
//								finiTime = aDoc.getElementById("timer1").innerHTML;
//								if (!finiTime) { //not building but maybe to few ressources. check TB3
//									finiTime = thepos.getElementById("timeouta").innerHTML;
//								}
//								if (finiTime) {
								if (timer) {
									finiTime = timer.innerHTML;
									ttar = finiTime.split(":");
									finTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 + 180000;
									Tasktime = ddg.getTime() + finTime;
									TS_debug("at " + getvillagefromdid(vi) + ", improve not possible but timer, improve delayed by " + finiTime);
								} else { // no timer found, try again in 5 minutes
									TS_debug("at " + getvillagefromdid(vi) + ", improve not possible but no timer, improve delayed by 5 minutes");
									Tasktime = ddg.getTime() + 5 * 60 * 1000;
								}
							}
							else{
//								TS_debug("at " + getvillagefromdid(vi) + ", some error here (" + improveError + "), improve delay 3 hours")
//								Tasktime = ddg.getTime() + 3 * 60 * 60 * 1000
								TS_debug("at " + getvillagefromdid(vi) + ", some error here (" + improveError + "), improve delay 5 minutes")
								Tasktime = ddg.getTime() + 5 * 60 * 1000
							}
							var newTask = new Array();
							newTask[0] = Task[0];
							newTask[1] = Task[1];
							newTask[2] = Task[2];
							newTask[3] = Task[3];
							newTask[4] = Task[4];
							newTask[5] = Task[5];
							newTask[6] = Tasktime.toString();
							TS_debug("Improve geturl ok!");
							flag("Improve geturl ok!");
							deleteTaskFromCookie(vi, Task, newTask);
							return false;
						}
						break;
					}
				}
			}
		}
	}
	return callback();
}

function startPartyNow(vi, Task) { // 6_1_1000_1245413194000_id
	flag("Start Party Now ="+getvillagefromdid(vi)+ ' / ' + vi);
	TS_debug("FM -------- come into startPartyNow() at vi="+getvillagefromdid(vi));
	TS_debug("FM -------- come into startPartyNow() at vi="+vi);
	TS_debug("FM -------- come into startPartyNow() at vi="+Task[4]);
	url = myhost + "/build.php" + "?newdid=" + vi+"&id="+Task[4]+"&a="+Task[1];
	TS_debug("url="+url);

	var partyurl=getPartyUrl(vi,Task);
	if (partyurl)
	{
		url = myhost + "/build.php" + "?newdid=" + vi+"&id="+Task[4]+"&a="+Task[1];
		flag("url="+url);

		GM_xmlhttpRequest
		({
			method: 'GET',
			url: url,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: "",
			onload: function(responseDetails){
				var ssDoc = document.implementation.createDocument("", "", null);
				var ssElem = document.createElement('DIV');
				ssElem.innerHTML = responseDetails.responseText;
				ssDoc.appendChild(ssElem);	
//				flag('Function responseDetails');
				finiTime=ssDoc.getElementsByClassName("dur")[0].innerHTML.match(/\d{1,2}:\d{2}:\d{2}/);
				
				ttar = finiTime.toString().split(":");
					finTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 +  180000;
					ddg = new Date();
					Tasktime = ddg.getTime() + finTime;
					if (Task[2] == "0") {
						deleteTaskFromCookie(vi, Task);
					}
					else {
						var newTask = new Array(); // 6_1_1000_1245413194000_id
						newTask[0] = Task[0];
						newTask[1] = Task[1];
						temp = Number(Task[2]) - 1
						newTask[2] = temp.toString();
						newTask[3] = Tasktime.toString();
						newTask[4] = Task[4];
						flag("Party hold ok!");
						deleteTaskFromCookie(vi, Task, newTask)
					}
				calldoing1()
				printMSG(aLangTaskOfText[39]+aLangTaskOfText[5])
				window.location.replace("build.php?newdid=" + vi+"&id="+Task[4])
			}
		})		
	}
	flag('Function apres SSDOC finiTime ='+finiTime + " finTime = " + fintime);
}


function getPartyUrl(vi, Task) { // 6_1_1000_1245413194000_id
  TS_debug("come into getPartyUrl() at " + getvillagefromdid(vi))
// come into getPartyUrl() at 13P4-4 Task=6,1,99,1269990268000,[object XPCNativeWrapper [object HTMLCollection]]
// url=http://s2.travian.fr/build.php?newdid=198534&id=[object XPCNativeWrapper [object HTMLCollection]]&a=1

	var url = myhost + "/build.php?newdid=" + vi + "&gid=24";
	var getbuildurl = new XMLHttpRequest();
	getbuildurl.open('GET', url, false);
	getbuildurl.onreadystatechange = callback;
	getbuildurl.send(null);
	TS_debug("getParty : getbuildurl.readystate=" + getbuildurl.readyState);
	TS_debug("getParty : getbuildurl.status=" + getbuildurl.status);
	flag('GetPartyUrl getbuildurl.readyState=' + getbuildurl.readyState + ' getbuildurl.status=' + getbuildurl.status);
	function callback(){
		if (getbuildurl.readyState == 4) {
			if (getbuildurl.status == 200) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				var ddg=new Date();
				aElem.innerHTML = getbuildurl.responseText;
				aDoc.appendChild(aElem);
				theinner = aDoc.getElementsByClassName("act");
				

flag("1=============== gettime test ");
				FiniTime=aDoc.getElementById("timer1").innerHTML.match(/\d{1,2}:\d{2}:\d{2}/);
flag("2=============== gettime test " + FiniTime);
				VFiniTime = FiniTime.toString().split(":");  // Converti les ":" par de virgule ","
flag("3=============== gettime test " + VFiniTime);
				FiniTimeddg = ddg.getTime() + Number(VFiniTime[0]) * 60 * 60 * 1000 + Number(VFiniTime[1]) * 60 * 1000 + Number(VFiniTime[2]) * 1000+30000;
flag("5=============== gettime test timeddg = HH" + VFiniTime[0] + "h" + VFiniTime[1] + "m" + VFiniTime[2] + "s");
flag("5=============== gettime test ddgGetTime = " + ddg.getTime());

				var Tasktime=new Date();
				switch (Task[1]) {
					case "1":
flag(" ________________ getPartyUrl Case 1");
						if (theinner[0].firstChild.href) {
							return theinner[0].firstChild.href
						}
						else {
						  partyError = theinner[0].firstChild.innerHTML
flag(" ________________ getPartyUrl Case 1 ELSE Party ERROR : " + partyError);
						  switch (partyError) {
							case aLangErrorText[9]:
								Tasktime=Tasktime+FiniTime;
								break;
							case aLangErrorText[0]:
								Tasktime = ddg.getTime() + 3 * 60 * 60 * 1000
								break;
							}
							var newTask = new Array(); // 6_1_1000_1245413194000_id
							newTask[0] = Task[0];
							newTask[1] = Task[1];
							newTask[2] = Task[2];
//							newTask[3] = Task[3];
							newTask[3] = Tasktime.toString();
							newTask[4] = Task[4];
flag(" ________________ getPartyUrl Case 1 ELSE NEW VALUE : ");
							
							deleteTaskFromCookie(vi, Task, newTask)
							calldoing1()
							return false
						}
						break;
					case "2":
flag(" ________________ getPartyUrl Case 2");
						if (theinner[1].firstChild.href) {
							return theinner[1].firstChild.href
						}
						else {
flag(" ________________ getPartyUrl Case 2 --- ELSE");
							partyError = theinner[1].firstChild.innerHTML
							switch (partyError) {
								case aLangErrorText[9]:
									FiniTime = aDoc.getElementById("timer1").innerHTML.match(/\d{1,2}:\d{2}:\d{2}/);
									ttar = FiniTime.split(":");
									finTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 + 180000;
									Tasktime = ddg.getTime() + finTime;
									break;
								case aLangErrorText[0]:
									Tasktime = ddg.getTime() + 3 * 60 * 60 * 1000
									break;
							}
							var newTask = new Array(); // 6_1_1000_1245413194000_id
							newTask[0] = Task[0];
							newTask[1] = Task[1];
							newTask[2] = Task[2];
							newTask[3] = Tasktime.toString();
							newTask[4] = Task[4];
							
							deleteTaskFromCookie(vi, Task, newTask)
							calldoing1()
							return false
						}
						break;
				}
			}
		}
	}
	return callback()
}
	
// investigate
function startTrannow(vi, tranTask) { // 8_241654_500,500,500,500_0_1245413194000_interval
// http://s2.travian.fr/build.php?id=35&a=6&c=f0d705
	TS_debug("come into startTrannow() at " + getvillagefromdid(vi));
	var turl = myhost + "/build.php?newdid=" + vi + "&gid=17";
	var tarResource = GM_getValue(myacc() + "_" + tranTask[2] + "_ResourceNow", "false");
	var WareCap = GM_getValue(myacc() + "_" + tranTask[2] + "_WarehouseCap", "false");
	var GranCap = GM_getValue(myacc() + "_" + tranTask[2] + "_GranaryCap", "false");
	var userTranSetup = GM_getValue(myacc() + "_" + tranTask[2] + "_userTranSetup", "false");
	var WareCap = parseInt(WareCap);
	var GranCap = parseInt(GranCap);
	var resnow = tarResource.split("/");
	resnow[0] = parseInt(resnow[0]);
	resnow[1] = parseInt(resnow[1]);
	resnow[2] = parseInt(resnow[2]);
	resnow[3] = parseInt(resnow[3]);
	var hereRemain = GM_getValue(myacc() + "_" + vi + "_userRemainSetup", "0/0");
	var hereremainn = hereRemain.split("/");
	hereremainn[0] = parseInt(hereremainn[0]);
	hereremainn[1] = parseInt(hereremainn[1]);
	GM_xmlhttpRequest({
		method: 'GET',
		url: turl,
		headers: "",
		onload: function(responseDetails){
//			TS_debug("here is startTrannow callback function")

// {v_kir 2010.01.25

			var ssDoc = document/*.implementation.createDocument("", "", null)*/;
			var ssElem = document.createElement('DIV');
			ssElem.innerHTML = responseDetails.responseText;
//			ssDoc.appendChild(ssElem);
			
//			resource = [ssDoc.getElementById("l4").innerHTML.split("/")[0], ssDoc.getElementById("l3").innerHTML.split("/")[0], ssDoc.getElementById("l2").innerHTML.split("/")[0], ssDoc.getElementById("l1").innerHTML.split("/")[0]]
			resource = [
				ssDoc.evaluate('//*[@id="l4"]', ssElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0],
				ssDoc.evaluate('//*[@id="l3"]', ssElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0],
				ssDoc.evaluate('//*[@id="l2"]', ssElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0],
				ssDoc.evaluate('//*[@id="l1"]', ssElem, null, XPFirst, null).singleNodeValue.innerHTML.split("/")[0]
			];

//	v_kir 2010.01.25}

			TS_debug("resource=" + resource)
			
			var transing = [0, 0, 0, 0]
			var reg111 = aLangGameText[10]; // to
			var reg222 = aLangGameText[12]; // back from
			var alltranTo = ssDoc.evaluate('//table//a[contains(@href,"php?d=' + tranTask[3] + '")]', ssElem, null, XPSnap, null);
			if (alltranTo.snapshotLength > 0) {
				for (var i = 0; i < alltranTo.snapshotLength; i++) {
					if (alltranTo.snapshotItem(i).innerHTML.indexOf(reg111) != -1) {
						ress = alltranTo.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/>\d{1,}(?![:(\d:)])/g)
						transing[0] += parseInt(ress[0].split(">")[1])
						transing[1] += parseInt(ress[1].split(">")[1])
						transing[2] += parseInt(ress[2].split(">")[1])
						transing[3] += parseInt(ress[3].split(">")[1])
						TS_debug("in startTrannow(vi,tranTask), transing=" + transing)
					}
				}
			}
			
			var ids = ssDoc.evaluate('//div[@id="textmenu"]/a', ssElem, null, XPFirst, null);
			theid = ids.singleNodeValue.href.split("id=")[1]
			var ddg = new Date();
			comm = ["", ""]
			var pp = ssDoc.evaluate('//table[@id="send_select"]/descendant::td[@class="max"]/a', ssElem, null, XPFirst, null);
			comm[1] = pp.singleNodeValue.innerHTML.match(/\d{3,4}/)
			var qq = ssDoc.evaluate('//table[@id="target_select"]/descendant::td[@class="mer"]', ssElem, null, XPFirst, null);
			comm[0] = qq.singleNodeValue.innerHTML.split(" ")[1].split("/")[0]
			TS_debug("now Merchants at home is " + comm[0] + ", and each Merchants can load " + comm[1])
			comm[0] = parseInt(comm[0])
			comm[1] = parseInt(comm[1])
			
			if (userTranSetup == "false") {
				switch (tranTask[1]) {
					case "0"://building surport model.
						if (WareCap < 18000 || GranCap < 18000) {//  80%warehouse remain
							var transtarget1 = WareCap * 0.8
							var transtarget2 = GranCap * 0.8
						}
						else {//15000 and 16000 remain
							var transtarget1 = 15000;
							var transtarget2 = 16000;
						}
						break;
						
					case "1":
						var transtarget1 = WareCap * 0.9
						var transtarget2 = GranCap * 0.9
						break;
				}
			}
			else {//user setup
				var transtarget1 = parseInt(userTranSetup.split("/")[0]);
				var transtarget2 = parseInt(userTranSetup.split("/")[1]);
			}
			if (((resnow[0] + transing[0] + 200) < transtarget1 && (resource[0] - 500) > hereremainn[0]) || ((resnow[1] + transing[1] + 200) < transtarget1 && (resource[1] - 500) > hereremainn[0]) || ((resnow[2] + transing[2] + 200) < transtarget1 && (resource[2] - 500) > hereremainn[0]) || ((resnow[3] + transing[3] + 200) < transtarget2 && (resource[3] - 500) > hereremainn[1])) {
				if (comm[0] > 0) {
					balance = [0, 0, 0, 0]
					balance[0] = ((transtarget1 - (resnow[0] + transing[0])) > 0) ? (transtarget1 - (resnow[0] + transing[0])) : 0
					balance[1] = ((transtarget1 - (resnow[1] + transing[1])) > 0) ? (transtarget1 - (resnow[1] + transing[1])) : 0
					balance[2] = ((transtarget1 - (resnow[2] + transing[2])) > 0) ? (transtarget1 - (resnow[2] + transing[2])) : 0
					balance[3] = ((transtarget2 - (resnow[3] + transing[3])) > 0) ? (transtarget2 - (resnow[3] + transing[3])) : 0
					
					baalaa = getTranAmount(balance, resource, hereremainn)
					autoTranRequire(tranTask, baalaa, vi, theid)
				}
				else {
					calldoing1()
					GM_deleteValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime")
					TS_debug("No merchant now, deleted the autoTransTime in startTrannow()")
					window.location.href = myhost + "/dorf1.php"
				}
			}
			else {
				calldoing1()
				GM_deleteValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime")
				TS_debug("resource is enough, deleted the autoTransTime in startTrannow()")
				window.location.href = myhost + "/dorf1.php"
			}
		}
	});
}
	
	function startDemonow(vi, demotask){//"7_" + theID +"_" + crtlevel + "_" + currentID() + "_" + theBuild;
		TS_debug("come into startDemonow at "+getvillagefromdid(vi) +", to demolish "+demotask[4]);
		var turl = myhost + "/build.php?newdid=" + vi;
		demodate = "&gid=15&a=" + vi + "&abriss=" + demotask[1];
		dataa = encodeURI(demodate);
		GM_xmlhttpRequest({
			method: 'POST',
			url: turl,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: dataa,
			onload: function(response){
				TS_debug("startDemonow Require callback here")
				var auDoc = document.implementation.createDocument("", "", null);
				var auElem = document.createElement('div');
				auElem.innerHTML = response.responseText;
				auDoc.appendChild(auElem);
				
				var newdemoTask = new Array();
				if (parseInt(demotask[2]) > 1) {
					newdemoTask[0] = demotask[0]
					newdemoTask[1] = demotask[1]
					newdemoTask[2] = (parseInt(demotask[2])-1).toString()
					newdemoTask[3] = demotask[3]
					newdemoTask[4] = demotask[4]
					deleteTaskFromCookie(vi, demotask, newdemoTask)
					
					var ddg = new Date();
					gettime = auDoc.getElementById("demolish").innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
					demot = gettime.toString().split(":")
					endt = ddg.getTime() + Number(demot[0]) * 60 * 60 * 1000 + Number(demot[1]) * 60 * 1000 + Number(demot[2]) * 1000 + 30000;
					ddg.setTime(endt)
					TS_debug("some demolish is doing, next demo start at " + ddg)
					GM_setValue(myacc() + "_" + vi + "_demolishTime", endt.toString());
				}
				else {
					GM_deleteValue(myacc() + "_" + vi + "_demolishTime");
					deleteTaskFromCookie(vi, demotask)
				}
				calldoing1()
				printMSG(aLangTaskKind[7]+" "+demotask[4]+" "+ aLangOtherText[7]+"!");
				window.location.href=myhost + "/dorf1.php"
			},
		})
	}
	
	
	function getWholeNumber(resArray){
		for(xx in resArray){
			resArray[xx]=Math.floor(resArray[xx]/100)*100;
		}
		return resArray;
	}
	
	function getTranAmount(bala,resource,hereremainn){
		TS_debug("come into getTranAmount(),bala=" + bala);
		resource[0] = (parseInt(resource[0])>hereremainn[0])?(parseInt(resource[0])-hereremainn[0]):0;
		resource[1] = (parseInt(resource[1])>hereremainn[0])?(parseInt(resource[1])-hereremainn[0]):0;
		resource[2] = (parseInt(resource[2])>hereremainn[0])?(parseInt(resource[2])-hereremainn[0]):0;
		resource[3] = (parseInt(resource[3])>hereremainn[1])?(parseInt(resource[3])-hereremainn[1]):0;
		bala[0] = (resource[0] >= bala[0]) ? bala[0] : resource[0];
		bala[1] = (resource[1] >= bala[1]) ? bala[1] : resource[1];
		bala[2] = (resource[2] >= bala[2]) ? bala[2] : resource[2];
		bala[3] = (resource[3] >= bala[3]) ? bala[3] : resource[3];
		all = bala[0] + bala[1] + bala[2] + bala[3];
		if (all < comm[0] * comm[1]) {
			return getWholeNumber(bala);
		}
		else {
			balaa = [0, 0, 0, 0];
			maxer = Math.max(bala[0], bala[1], bala[2], bala[3]); // 1st maxer
			if (maxer >= comm[0] * comm[1]) {
				for (i = 0; i < 4; i++) {
					if (bala[i] == maxer) {
						balaa[i] = comm[0] * comm[1];
						break;
					}
				}
				return getWholeNumber(balaa);
			}
			else {
				for (d = 0; d < 4; d++) {
					if (bala[d] == maxer) {
						balaa[d] = bala[d];
						bala[d] = 0;
						remain = comm[0] * comm[1] - balaa[d];
						break;
					}
				}
				maxer = Math.max(bala[0], bala[1], bala[2], bala[3]); // 2th maxer
				if (maxer >= remain) {
					for (j = 0; j < 4; j++) {
						if (bala[j] == maxer) {
							balaa[j] = remain;
							break;
						}
					}
					return getWholeNumber(balaa)
				}
				else {
					for (s = 0; s < 4; s++) {
						if (bala[s] == maxer) {
							balaa[s] = bala[s];
							bala[s] = 0;
							remain = remain - balaa[s]
							break;
						}
					}
					maxer = Math.max(bala[0], bala[1], bala[2], bala[3])//3th maxer
					if (maxer >= remain) {
						for (k = 0; k < 4; k++) {
							if (bala[k] == maxer) {
								balaa[k] = remain;
								break;
							}
						}
						return getWholeNumber(balaa)
					}
					else {
						for (n = 0; n < 4; n++) {
							if (bala[n] == maxer) {
								balaa[n] = bala[n];
								bala[n] = 0;
								remain = remain - balaa[n];
								break;
							}
						}
						maxer = Math.max(bala[0], bala[1], bala[2], bala[3])
						for (l = 0; l < 4; l++) {
							if (bala[l] == maxer) {
								balaa[l] = remain;
								break;
							}
						}
						return getWholeNumber(balaa)
					}
				}
			}
		}
	}
	
	function getRequireData(tranTask, resArray, vi, id){//8_241654_500,500,500,500_0_1245413194000_interval
		TS_debug("come into getRequireData() " + "resArray=" + resArray);
		switch (tranTask[0]) {
			case "5":
				var param = "&id=" + id + "&r1=" + resArray[0] + "&r2=" + resArray[1] + "&r3=" + resArray[2] + "&r4=" + resArray[3] + "&dname=&x=" + getXfromCoord(tranTask[3]) + "&y=" + getYfromCoord(tranTask[3]);
				break;
			case "8":
				var param = "&id=" + id + "&r1=" + resArray[0] + "&r2=" + resArray[1] + "&r3=" + resArray[2] + "&r4=" + resArray[3] + "&dname=&x=" + getXfromCoord(tranTask[1]) + "&y=" + getYfromCoord(tranTask[1]);
				break;
		}
		TS_debug("in getRequireData:   " + param); 
		data = encodeURI(param);
		url = myhost + "/build.php" + "?newdid=" + vi;
// investigate done 25/05/2010
		flag('url : '+url);
		var getTranData = new XMLHttpRequest();
		getTranData.open('POST', url, false); 	//	getTranData.open('POST', url, true);
		getTranData.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		getTranData.setRequestHeader("Content-length", data.length);
		getTranData.setRequestHeader("Connection", "close");
		getTranData.onreadystatechange = callback;
		getTranData.send(data);

		function callback() {
			if (getTranData.readyState == 4) {
				if (getTranData.status == 200) {
					TS_debug("getRequireData callback here!");
			
//	{v_kir 2010.01.24

					var abDoc = document/*.implementation.createDocument("", "", null)*/;
					var abElem = document.createElement('DIV');
					abElem.innerHTML = getTranData.responseText;

					var input = abDoc.evaluate("//input", abElem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var paramm = "";
					for(var i = 0; i < input.snapshotLength; i++){
						var inp = input.snapshotItem(i);
						var paramName = inp.name;

// by Rhayader and Ptitfred06 add parameters "c" the 23/05/2010
						if (/id|a|sz|kid|c|r[1-4]/.test(paramName)) {
							var paramName = "&" + paramName + "=";
							if (paramm.indexOf(paramName) == -1)
								paramm += paramName + inp.value;
						};
					};
					paramm = paramm.slice(1);
					TS_debug("Paramm =" + paramm);
					return paramm;
				}
			}
		}
		return callback()
	}
		
	function autoTranRequire(tranTask, resArray, vi, id) {
		TS_debug("come into autoTranRequire(), the resArray=" + resArray);
		url = myhost + "/build.php" + "?newdid=" + vi;
		flag(" autoTranRequire url = " + url);
		dataa = encodeURI(getRequireData(tranTask, resArray, vi, id));
		GM_xmlhttpRequest({
			method: 'POST',
			url: url,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: dataa,
			onload: function(response){
//				TS_debug("autoTranRequire Require callback here")

				var auDoc = document/*.implementation.createDocument("", "", null)*/;
				var auElem = document.createElement('div');
				auElem.innerHTML = response.responseText;
//				auDoc.appendChild(auElem);

//				TS_debug("tranTask[0] = " + tranTask[0])
				var gugagaa = new Date()				
				switch (tranTask[0]) {
					case "5":
						var ma = "0"
						var transing = [0, 0, 0, 0]
						var Transtime = 1500000000000;
						var reg111 = aLangGameText[10]; // to
						var alltranTo = auDoc.evaluate('//table//a[contains(@href,"php?d=' + tranTask[3] + '")]', auElem, null, XPSnap, null);
						if (alltranTo.snapshotLength > 0) {
							for (var i = 0; i < alltranTo.snapshotLength; i++) {
								if (alltranTo.snapshotItem(i).innerHTML.indexOf(reg111) != -1) {
									var ma = "1"
									ress = alltranTo.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/>\d{1,}(?![:(\d:)])/g)
									transing[0] += parseInt(ress[0].split(">")[1])
									transing[1] += parseInt(ress[1].split(">")[1])
									transing[2] += parseInt(ress[2].split(">")[1])
									transing[3] += parseInt(ress[3].split(">")[1])
									
									resttt = alltranTo.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
									restttttt = resttt.toString().split(":")
									gobacktime = gugagaa.getTime() + Number(restttttt[0]) * 60 * 60 * 1000 + Number(restttttt[1]) * 60 * 1000 + Number(restttttt[2]) * 1000;
									Transtime = Math.min(Transtime, gobacktime)
								}
							}
							if (ma == "0") {
								GM_setValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_TraningTime", "1500000000000")
							}
							lastTrantime = (Transtime == 1500000000000) ? 1500000000000 : Transtime + 5000
							var yyyu = new Date()
							yyyu.setTime(lastTrantime)
							
							GM_setValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_TraningTime", lastTrantime.toString())
							TS_debug("the traning will arrive after " + lastTrantime + ", at " + yyyu)
							GM_setValue(myacc() + "_" + tranTask[2] + "_ResourceTraning", transing.join("/"))
							TS_debug("all resources on transporting are " + transing.join("/"))
						}
						else {
							GM_setValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_TraningTime", "1500000000000")
						}
						
						okk = aLangTaskOfText[8].big() + "<br/><br/>" + aLangGameText[12] + " " + getvillagefromdid(vi) + " " + aLangGameText[6] + " " + getvillagefromdid(tranTask[2]) + "<br/><br/>" + aLangTaskOfText[11] + "!"
						printMSG(okk)
						switch (tranTask[1]) {
						
							case "0":
								GM_deleteValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime")
								break;
								
							case "1":
								var saspa = new Date();
								nextTime = saspa.getTime() + Number(transsInterval)*60*1000;
								GM_setValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime", nextTime.toString())
								saspa.setTime(nextTime)
								TS_debug("next transport start at "+saspa)
								break;
						}
						break;
					case "8"://8_241654_500,500,500,500_0_1245413194000_interval
						if (tranTask[3] == "0") {
							deleteTaskFromCookie(vi, tranTask)
						}
						else {
							var newTask = new Array();
							newTask[0] = tranTask[0];
							newTask[1] = tranTask[1];
							newTask[2] = tranTask[2];
							temp = Number(tranTask[3]) - 1
							newTask[3] = temp.toString();
							if (tranTask[5] == "0") {
								temp2 = gugagaa.getTime() + 6 * 60 * 60 * 1000
							}
							else {
								temp2 = gugagaa.getTime() + Number(tranTask[5])
							}
							newTask[4] = temp2.toString();
							newTask[5] = tranTask[5];
							
							deleteTaskFromCookie(vi, tranTask, newTask)
						}
						okk = aLangTaskOfText[35].bold() + " " + aLangTaskOfText[11] + "!"
						printMSG(okk)
						break;
				}
				calldoing1()
				window.location.replace("dorf1.php")
			}
		})
	}


	function showTaskList(){
		TS_debug("come into showTaskList()");
		tasks = GM_getValue(herere() + "_waitTask", "false");
		if (tasks != "false") {
			aTable = createTaskListTable();
			var tlWrapper = document.createElement("div");
			tlWrapper.id = "tasklisttable_wrapper";
			tlWrapper.appendChild(aTable);
			
			var formCoords = getOption("TASKLIST_POSITION", "120px_930px");
			formCoords = formCoords.split("_");
			tlWrapper.style.top = formCoords[0];
			tlWrapper.style.left = formCoords[1];
			
			document.body.appendChild(tlWrapper);
			makeDraggable($("tasklisttable"));
		}
	}
	
	function createTaskListTable(){
		TS_debug("Called createTaskListTable()")
		taskss = GM_getValue(herere() + "_waitTask", "false")
		TS_debug("createTaskListTable(): taskss="+taskss+";")
		if (taskss != "false") {
			tasks = taskss.split("|")
			var taskListTable = document.createElement("table");
			taskListTable.id = "tasklisttable";
			taskListTable.border = "0"
			taskListTable.innerHTML += "<caption>" + aLangGameText[7].big() + ":  " + currentVillageName().big() + "&#160;&#160;&#160;" + aLangTaskOfText[12].big() + "</caption>"
			taskListTable.innerHTML += "<tr><th colspan='2'>" + aLangAddTaskText[12] + "</th><th>" + aLangAddTaskText[11] + "</th><th>" + aLangAddTaskText[10] + "</th></tr>"
			taskListTable.innerHTML += "<tr><td colspan='4'><hr/></td></tr>"
			for (i in tasks) {
				thisTask = tasks[i].split("_");
				aTr = document.createElement("tr");
				taskListTable.appendChild(aTr);
				
				aTd1 = document.createElement("td");
				aTd1.width = "18px"
				if (i == 0) {
					aTd1.innerHTML = "&#160;"
				}
				else 
					if (i > 0) {
						taskup = document.createElement("a");
						taskup.href = "#"
						taskup.title = aLangAddTaskText[8]
						nimg = document.createElement("img");
						nimg.setAttribute("src", moveupBtn);
						taskup.appendChild(nimg);
						aTd1.appendChild(taskup);
						taskup.addEventListener('click', moveTask(currentID(), i, -1), false);
					}
				aTr.appendChild(aTd1);
				
				aTd2 = document.createElement("td");
				aTd2.width = "28px"
				if (i < tasks.length - 1) {
					taskdown = document.createElement("a");
					taskdown.href = "#"
					taskdown.title = aLangAddTaskText[9] 
					mimg = document.createElement("img")
					mimg.setAttribute("src", movedownBtn);
					taskdown.appendChild(mimg);
					aTd2.appendChild(taskdown);
					taskdown.addEventListener('click', moveTask(currentID(), i, 1), false);
				}
				else 
					if (i == tasks.length - 1) {
						aTd2.innerHTML = "&#160;"
					}
				aTr.appendChild(aTd2);
				
				
				aTd3 = document.createElement("td");
				taskStr = "";
				switch (thisTask[0]) {
					case "0": // 0_id_level_time_name
						if (thisTask[1] < 19) {
							taskStr = aLangTaskKind[0] +"&#160;"+ thisTask[4] + "&#160;&#160;" + aLangGameText[2] + ":" + thisTask[1] + "&#160;&#160;" + aLangAddTaskText[4] + ":" + aLangGameText[0] + thisTask[2];
						}
						else 
							if (thisTask[1] > 18 && thisTask[1] < 42) {
								taskStr = aLangTaskKind[0] +"&#160;"+ thisTask[4] + "&#160;&#160;" + aLangGameText[2] + ":" + thisTask[1] + "&#160;&#160;" + aLangAddTaskText[4] + ":" + aLangGameText[0] + thisTask[2];
							}
							else {
								taskStr = aLangTaskOfText[2]
							}
						break;
					case "1": // 1_id_level_gid_time_name
						taskStr = aLangTaskKind[1] +"&#160;" +aLangAllBuildWithId[parseInt(thisTask[3])] + "&#160;&#160;" + aLangGameText[2] + ":" + thisTask[1] + "&#160;&#160;" + aLangAddTaskText[4] + ":" + aLangGameText[0] + thisTask[2];
						break;
					case "2": // 2_targetPosition_kind_repeat_startTime_interval_troops_kata1_kata2    
						targetcoord="(" + getXfromCoord(thisTask[1])+"|"+getYfromCoord(thisTask[1])+")";
						var starttime= new Date(Number(thisTask[4]))
						month=starttime.getMonth()+1;
						days=starttime.getDate()
						if (Xlang == "com") {
							taskStr = aLangAttackType[thisTask[2] - 2] + targetcoord + "&#160;&#160;" + starttime.toDateString()+" "+starttime.toLocaleTimeString()+ "&#160;&#160;" + (Number(thisTask[3]) + 1) + aLangTaskOfText[28];
						}
						else {
							taskStr = aLangAttackType[thisTask[2] - 2] + targetcoord + "&#160;&#160;" + month + aLangTaskOfText[29] + days + aLangTaskOfText[30] + starttime.toLocaleTimeString() + "&#160;&#160;" + (Number(thisTask[3]) + 1) + aLangTaskOfText[28];
						}
						var troopse=thisTask[6].split(",")
						troopsss="";
						ra = GM_getValue(myacc() + "_raceID");
						ra = parseInt(ra);
						for(w in troopse){
							if(troopse[w]=="0"){continue;}
							troopsss+=aLangTroops[ra][w]+troopse[w]+" ";
						}
						aTd3.title=troopsss;
						break;
					case "3": // 3_kind_id_troop_SN_target//3_2_27_古罗马步兵_1_11_1251616724168
						takind=(thisTask[1]=="1")? aLangTaskOfText[49] : aLangTaskOfText[50]
						taskStr=thisTask[3]+"&#160;&#160;"+ takind +"&#160;&#160;"+ aLangGameText[6]+"&#160;" + aLangGameText[0]+ thisTask[5];
						var starttime= new Date(Number(thisTask[6]))
						month=starttime.getMonth()+1;
						days=starttime.getDate()
						if (Xlang == "com"||Xlang=="fi") {
							titleTime =starttime.toDateString()+" "+starttime.toLocaleTimeString();
						}
						else {
							titleTime = month + aLangTaskOfText[29] + days + aLangTaskOfText[30] + starttime.toLocaleTimeString();
						}
						aTd3.title=titleTime;
						break;
					case "4": // 4_25_0_1248341858000_0_54,21,42,0,0,0,0,0,0,0_兵营
						var starttime = new Date(Number(thisTask[3]));
						month = starttime.getMonth()+1;
						days = starttime.getDate();
						if ((Xlang == "com") || (Xlang == "fi")) {
							taskStr =aLangTaskKind[4] +" in "+ thisTask[6] + "&#160;&#160;" + starttime.toDateString()+" "+starttime.toLocaleTimeString()+ "&#160;&#160;" + (Number(thisTask[2]) + 1) + aLangTaskOfText[28];
						}
						else {
							taskStr = thisTask[6] + aLangTaskKind[4] + "&#160;&#160;" + month + aLangTaskOfText[29] + days + aLangTaskOfText[30] + starttime.toLocaleTimeString() + "&#160;&#160;" + (Number(thisTask[2]) + 1) + aLangTaskOfText[28];
						}
						var troopse = thisTask[5].split(",");
						troopsss="";
						ra = GM_getValue(myacc() + "_raceID");
						ra = parseInt(ra);
						for(w in troopse){
							if(troopse[w]=="0") continue;
							troopsss += aLangTroops[ra][w]+troopse[w]+" ";
						}
						aTd3.title = troopsss;
						break;
					case "5":
						switch(thisTask[1]){
							case "0":
								taskStr = aLangTaskOfText[8] + " " + aLangGameText[6] + " " + getvillagefromdid(thisTask[2]) + "&#160;&#160;" + aLangAddTaskText[5] + ":" + aLangAddTaskText[6];
								break;
							case "1":
								taskStr = aLangTaskOfText[8] + " " + aLangGameText[6] + " " + getvillagefromdid(thisTask[2]) + "&#160;&#160;" + aLangAddTaskText[5] + ":" + aLangAddTaskText[7];
								aTd3.title=aLangTaskOfText[23]+":"+transsInterval+aLangTaskOfText[43];
								break;
						}
						break;
					case "6": // 6_1_1000_1245413194000
						var taskname=(thisTask[1]=="1")?aLangTaskOfText[40]:aLangTaskOfText[41]
						var starttime= new Date(Number(thisTask[3]))
						month=starttime.getMonth()+1;
						days=starttime.getDate()
						if (Xlang == "com"||Xlang=="fi") {
							taskStr =taskname + "&#160;&#160;" + starttime.toDateString()+" "+starttime.toLocaleTimeString()+ "&#160;&#160;" + (Number(thisTask[2]) + 1) + aLangTaskOfText[28];
						}
						else {
							taskStr = taskname + "&#160;&#160;" + month + aLangTaskOfText[29] + days + aLangTaskOfText[30] +"&#160;"+ starttime.toLocaleTimeString() + "&#160;&#160;" + (Number(thisTask[2]) + 1) + aLangTaskOfText[28];
						}
						break;
					case "7": // "7_" + theID +"_" + crtlevel + "_" + currentID() + "_" +theBuild
						taskStr=aLangTaskKind[7]+" "+thisTask[4]+"&#160;&#160;&#160;&#160;"+aLangGameText[17]+thisTask[2]+"&#160;&#160;"+aLangGameText[6]+"&#160;&#160;"+aLangGameText[17]+"0"
						break;
					case "8": // 8_241654_500,500,500,500_0_1245413194000_interval
						tarVil="("+getXfromCoord(thisTask[1])+"/"+getYfromCoord(thisTask[1])+")";
						var starttime= new Date(Number(thisTask[4]));
						month=starttime.getMonth()+1;

						days=starttime.getDate();
						taskStr = aLangTaskOfText[35] + " " + aLangGameText[6] + " " + tarVil +  "&#160;&#160;"  + starttime.toLocaleTimeString() + "&#160;&#160;" + (Number(thisTask[3]) + 1) + aLangTaskOfText[28];
						
						var asTime = parseInt(thisTask[5]);
						hh=Math.floor(asTime/3600000);
						if(hh<10){hh="0"+hh}
						mm=Math.floor((asTime-hh*3600000)/60000);
						if(mm<10){mm="0"+mm}
						ss=Math.ceil((asTime-hh*3600000-mm*60000)/1000);
						if(ss<10){ss="0"+ss}
						intervalt= hh+":"+mm+":"+ss;
						aTd3.title=thisTask[2]+" | "+aLangTaskOfText[23]+" "+intervalt;
						break;
				}
				aTd3.innerHTML = taskStr
				aTr.appendChild(aTd3);
				
				aTd4 = document.createElement("td");
				aTd4.width = "28px"
				aTd4.align="right"
				deleteTaskk = document.createElement("a");
				deleteTaskk.setAttribute("title", aLangAddTaskText[10]);
				deleteTaskk.href = "#"
				limg = document.createElement("img")
				limg.setAttribute("src", deleteBtn);
				deleteTaskk.appendChild(limg);
				deleteTaskk.addEventListener("click", deleteTaskCookie(i), false);
				aTd4.appendChild(deleteTaskk);
				aTr.appendChild(aTd4);
			}
			aTr6 = document.createElement("tr");
			aTd6 = document.createElement("td");
			aTd6.setAttribute("colspan", "4");
			aTd6.innerHTML="<hr/>"
			aTr6.appendChild(aTd6);
			taskListTable.appendChild(aTr6)

			aTr5 = document.createElement("tr");
			aTd5 = document.createElement("td");
			aTd5.setAttribute("colspan", "4");
			
				var enderTable = document.createElement("table");	

				aTr8 = document.createElement("tr");
				aTd8 = document.createElement("td");
				aTd8.align="left"
				deleteAllTask = document.createElement("a");
				deleteAllTask.href = "#"
				deleteAllTask.id="deletealltask"
				deleteAllTask.title = aLangAddTaskText[13]
				deleteAllTask.innerHTML = " "+aLangAddTaskText[13]+"&#160;&#160;"
				aTd8.appendChild(deleteAllTask);
				aTr8.appendChild(aTd8)
				
				aTd9 = document.createElement("td");
				aTd9.align="center"
				pausekey=document.createElement("a");
				pausekey.href = "#"
				switch (taskdoing){
					case "0":
						aTd9.innerHTML="&#160;"+aLangTaskOfText[44].fontcolor("red") +"&#160;"
						pausekey.id="clicktostart"
						pausekey.innerHTML=aLangTaskOfText[46]+"&#160;"
					break;
					case "1":
						aTd9.innerHTML="&#160;"+aLangTaskOfText[45].fontcolor("green")+"&#160;"
						pausekey.id="clicktopause"
						pausekey.innerHTML=aLangTaskOfText[47]+"&#160;"
					break;
				}
				aTd9.appendChild(pausekey);
				aTr8.appendChild(aTd9)

				aTd7 = document.createElement("td");
				aTd7.align="right"
				aTd7.innerHTML="&#160;&#160;"+"<a href='http://userscripts.org/scripts/show/72547' id='verdisp'  target='_blank'>"+crtVersion+"</a>"
				aTr8.appendChild(aTd7);

				enderTable.appendChild(aTr8)

			aTd5.appendChild(enderTable)
			aTr5.appendChild(aTd5);
			taskListTable.appendChild(aTr5)
			deleteAllTask.addEventListener('click', deleteAllTasks, true);
			pausekey.addEventListener("click", pauseandstart, false)
		}
		return taskListTable
	}
	
	function pauseandstart(){
		if ($("clicktostart")) { calldoing1()
		}
		if ($("clicktopause")) { calldoing0()
		}
		document.body.removeChild($("tasklisttable_wrapper"))
		showTaskList()
	}
	
	function deleteTaskCookie(j){
		return function(){
			taskss = GM_getValue(herere() + "_waitTask");
			thisTask = taskss.split("|")[j].split("_")
			switch (thisTask[0]) {
				
				case "0":
					if (thisTask[1] < 42) {
						GM_deleteValue(herere() + "_ResourceUpdataTime")
						GM_deleteValue(herere() + "_BuildingUpdataTime")
						GM_deleteValue(herere() + "_UpdataTime")
					}
					else {//autoResource
						GM_deleteValue(herere() + "_autoResource");
						GM_deleteValue(herere() + "_CorpRemain");
						GM_deleteValue(herere() + "_minLevelId");
						GM_deleteValue(herere() + "_minLevelCropId");
					}
					break;
					
				case "1"://new build
					GM_deleteValue(herere() + "_BuildingUpdataTime")
					GM_deleteValue(herere() + "_UpdataTime")
					break;
					
				case "5"://auto transport
					GM_deleteValue(herere() + "_to_" + thisTask[3] + "_TraningTime")
					GM_deleteValue(herere() + "_to_" + thisTask[3] + "_autoTransTime")
					auTranTo=GM_getValue(herere() + "_autoTransTo")
					auTrans=auTranTo.split("|")
					if (auTrans.length > 1) {
						for (a in auTrans) {
							if (auTrans[a] == thisTask[2]) {
								auTrans.splice(a, 1)
								break;
							}
						}
						GM_setValue(herere() + "_autoTransTo",auTrans.join("|"))
					}
					else {
						GM_deleteValue(herere() + "_autoTransTo")
					}
					break;
					
				case "7"://demolish
					GM_deleteValue(herere() + "_demolishTime");
					break;
					
			}
			deleteTaskFromCookie(currentID(), thisTask)
		}
	}

	function deleteAllTasks(){
		GM_deleteValue(herere() + "_waitTask")
		GM_deleteValue(herere() + "_BuildingUpdataTime")
		GM_deleteValue(herere() + "_ResourceUpdataTime")
		GM_deleteValue(herere() + "_UpdataTime")
		GM_deleteValue(herere() + "_autoTransTime")
		GM_deleteValue(herere() + "_TraningTime")
		GM_deleteValue(herere() + "_autoTransTo")
		GM_deleteValue(herere() + "_autoResource")
		GM_deleteValue(herere() + "_demolishTime")
		GM_setValue(myacc() + "_doing", "1");
		TS_debug("set doing to 1");
		document.body.removeChild($("tasklisttable_wrapper"))
	}
	
	function addtaskbefore(vi, gid, ki){
		//ki="0" is Romans autoResource, ki="2" is other race autoResource
		thebuildid = getbuildfromdorf2(vi, gid)
		addtask = "0_" + thebuildid + "_000000000"
		newTaskstring = addtask + "|" + GM_getValue(myacc() + "_" + vi + "_waitTask");
		GM_setValue(myacc() + "_" + vi + "_waitTask", newTaskstring);
		switch (ki) {
			case "0":
				GM_deleteValue(myacc() + "_" + vi + "_BuildingUpdataTime");
				break;
			case "2":
				GM_deleteValue(myacc() + "_" + vi + "_UpdataTime");
				break;
		}
		window.location.href=myhost + "/dorf1.php";
	}
	
	
	function getbuildfromdorf2(vil, gid){
		var turl = myhost + "/dorf2.php?newdid=" + vil
		var getsomeid = new XMLHttpRequest();
		getsomeid.open('GET', turl, false);
		getsomeid.onreadystatechange = callback;
		getsomeid.send(null);
		function callback(){
			if (getsomeid.readyState == 4) {
				if (getsomeid.status == 200) {
					TS_debug("getbuildfromdorf2_callback is here")
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getsomeid.responseText;
					aDoc.appendChild(aElem);
					
					var thebuild = aDoc.evaluate('id("map2")//area[contains(@title,"' + aLangAllBuildWithId[gid] + '")]', aElem, null, XPFirst, null);
					temmp=thebuild.singleNodeValue.title.split(" ")
					level = parseInt(temmp[temmp.length-1]) + 1
					return thebuild.singleNodeValue.href.split("id=")[1] + "_" + level.toString();
				}
			}
		}
		return callback()
	}

	function getAutoResourceId(vi){
		corpremain = GM_getValue(myacc() + "_" + vi + "_CorpRemain")
		minlevelid = GM_getValue(myacc() + "_" + vi + "_minLevelId")
		minlevelcropid = GM_getValue(myacc() + "_" + vi + "_minLevelCropId")
		if (GM_getValue(myacc() + "_" + vi + "_ResourceRate")== "1:1:1:15") {
			TS_debug("in 15corps mainvillage, just upgrade corpfield, so return id is " + minlevelcropid)
			return minlevelcropid
		}
		else {
			TS_debug("come into getAutoResourceId(vi) and corpremain=" + corpremain)
			if (corpremain < 20) {
				TS_debug("because of corpremain<20, return id is " + minlevelcropid)
				return minlevelcropid
			}
			else {
				TS_debug("because of corpremain>=20, return id is " + minlevelid)
				return minlevelid
			}
		}
	}
	
	 function getResourceRate(){
	 	if (window.location.href.indexOf("dorf1") != -1) {
	 		mydiv = $("rx");
	 		rate = new Array();
	 		for (i = 0; i < 4; i++) {
	 			reg = new RegExp(aLangAllResInDorf1[i], "g");
	 			mysearch = mydiv.innerHTML.match(reg);
				if (mysearch != null)
		 			newlength = rate.push(mysearch.length);
	 		}
	 		GM_setValue(herere()+ "_ResourceRate", rate.join(":"));
	 	}
	 }
	
	function deleteTaskFromCookie(Vii, Taa,newTa){
		TS_debug("come into deleteTaskFromCookie(Vii, Taa)")
		taskcook = GM_getValue(myacc() + "_" + Vii + "_waitTask")
		tasks = taskcook.split("|")
		taaa = Taa.join("_")
		for (x in tasks) {
			if (tasks[x] == taaa) {
				if (newTa) {
					newTa=newTa.join("_")
					tasks.splice(x, 1, newTa)
					break;
				}
				else{
					tasks.splice(x, 1)
					break;					
				}
			}
		}
		if (tasks.length > 0) {
			newCook = tasks.join("|")
			GM_setValue(myacc() + "_" + Vii + "_waitTask", newCook)
			TS_debug("ok,i delete a task")
			if ($("tasklisttable_wrapper")) {
				document.body.removeChild($("tasklisttable_wrapper"))
			}
			showTaskList()
		}
		else {
			GM_deleteValue(myacc() + "_" + Vii + "_waitTask")
			if (GM_getValue(myacc() + "_" + Vii + "_ResourceUpdataTime", "flase") != "false") 
				GM_deleteValue(myacc() + "_" + Vii + "_ResourceUpdataTime")
			if (GM_getValue(myacc() + "_" + Vii + "_BuildingUpdataTime", "flase") != "false") 
				GM_deleteValue(myacc() + "_" + Vii + "_BuildingUpdataTime")
			if (GM_getValue(myacc() + "_" + Vii + "_UpdataTime", "flase") != "false") 
				GM_deleteValue(myacc() + "_" + Vii + "_UpdataTime")
			TS_debug("ok I delete the whole cookie")
			if ($("tasklisttable_wrapper")) {
				document.body.removeChild($("tasklisttable_wrapper"))
			}
			showTaskList()
		}
	}
	
	function moveTask(vi, i, updown){
		return function(){
			updown=parseInt(updown)
			i=parseInt(i)
			var ubC = GM_getValue(myacc() + "_" + vi + "_waitTask");
			var arrUbC = ubC.split("|");
			var tmpUb = arrUbC[i + updown];
			arrUbC[i + updown] = arrUbC[i];
			arrUbC[i] = tmpUb;
			ubC = arrUbC.join("|");
			GM_setValue(myacc() + "_" + vi + "_waitTask", ubC)
			document.body.removeChild($("tasklisttable_wrapper"))
			showTaskList()
		}
	}

	function promptFreshInterval(){
		curentSetup = GM_getValue(myacc() + "_FreshInterval", "20")
		var newSetup = prompt(aLangTaskOfText[37],curentSetup);
		GM_setValue(myacc() + "_FreshInterval", newSetup)
	}

	function promptTranInterval(){
		curentSetup2 = GM_getValue(myacc() + "_TransInterval", "30")
		var newSetup2 = prompt(aLangTaskOfText[42],curentSetup2);
		GM_setValue(myacc() + "_TransInterval", newSetup2)
	}

	function calldoing1(){
		taskdoing = "1"
		GM_setValue(myacc() + "_doing", "1");
//		TS_debug("set doing to 1");
	}

	function calldoing0(){
		taskdoing = "0"
		GM_setValue(myacc() + "_doing", "0");
//		TS_debug("set doing to 0");
	}

	ccclock = 0;
	function eachTimedo(){
		ccclock = ccclock + 6000
		if (ccclock > Number(pagefreshInterval)*60*1000) {
			TS_debug("reload in eachTimedo() ,  each "+pagefreshInterval+" minutes")
			GM_deleteValue(myacc() + "_doing");
			window.location.replace(myhost + "/dorf1.php")
		}
		
		var now = new Date();
		nowmillse = now.getTime();
		
		for (v in getAllVillageNewdids()) {
			whatever = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_waitTask", "false")
			if (whatever != "false"&&taskdoing=="1") {
				allTasks = whatever.split("|")
				allTran = new Array();
				TranT = new Array();
				TraningT = new Array();
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_")
					if (thisTask[0] == "5") {
							ll = allTran.push(thisTask)	
					}
					if(thisTask[0] == "2"){
						attackT=Number(thisTask[4])
						remainA=attackT- nowmillse;
						if((remainA < 1000) && (taskdoing=="1")){
							calldoing0()
							startAttackNow(getAllVillageNewdids()[v],thisTask)
						}
					}
					if(thisTask[0] == "4"){
						TrainT=Number(thisTask[3])
						remainT=TrainT- nowmillse;
						if(remainT<1000&&taskdoing=="1"){
							calldoing0()
							startTrainNow(getAllVillageNewdids()[v],thisTask)
						}
					}
					if(thisTask[0] == "8"){//8_241654_500,500,500,500_0_1245413194000_interval
						customTransT=Number(thisTask[4])
						remainCu=customTransT- nowmillse;
						if(remainCu<1000&&taskdoing=="1"){
							calldoing0()
							startCustomTranNow(getAllVillageNewdids()[v], thisTask)
						}
					}
					if (thisTask[0] == "6"){//6_1_1000_1245413194000
						partyT=Number(thisTask[3])
						 // flag("Party !! = chaque timedo " + partyT);
						remainPa=partyT- nowmillse;
						if(remainPa<1000&&taskdoing=="1"){
							calldoing0()
							startPartyNow(getAllVillageNewdids()[v], thisTask)
						}
					}
					if (thisTask[0] == "3"){//3_kind_id_troop_SN_target//3_2_27_古罗马步兵_1_11_1251616724168
						improveT=Number(thisTask[6])
						remainIm=improveT- nowmillse;
						if(remainIm<1000&&taskdoing=="1"){
							calldoing0()
							startImproNow(getAllVillageNewdids()[v], thisTask)
						}
					}
				}
				if (allTran.length > 0) {
					for (i in allTran) {
						TranT[i] = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_to_" + allTran[i][3] + "_autoTransTime", "1500000000000");
						TraningT[i] = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_to_" + allTran[i][3] + "_TraningTime", "1500000000000")
						
						if ((parseInt(TranT[i]) - nowmillse) < 1000&&taskdoing=="1") {
							calldoing0()
							startTrannow(getAllVillageNewdids()[v], allTran[i])
						}
						if ((parseInt(TraningT[i]) - nowmillse) < 1000&&taskdoing=="1") {
							calldoing0()
							ki = fleshTraning(getAllVillageNewdids()[v], allTran[i])
							TS_debug("here is eachTimedo(), return from Fleshtraning is " + ki)
						}
					}
				}
				
				resT = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_ResourceUpdataTime", "false");
				buiT = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_BuildingUpdataTime", "false");
				upT = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_UpdataTime", "false");
				DemoT = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_demolishTime", "false");
		
				
				if (resT != "false") {
					remainTime1 = parseInt(resT) - nowmillse
					if (remainTime1 < 1000&&taskdoing=="1") {
						calldoing0()
						startBuildnow(getAllVillageNewdids()[v], "0")
						break;
					}
				}
				if (buiT != "false") {
					remainTime2 = parseInt(buiT) - nowmillse
					if (remainTime2 < 1000&&taskdoing=="1") {
						calldoing0()
						startBuildnow(getAllVillageNewdids()[v], "1")
						break;
					}
				}
				if (upT != "false") {
					remainTime3 = parseInt(upT) - nowmillse
					if (remainTime3 < 1000&&taskdoing=="1") {
						calldoing0()
						startBuildnow(getAllVillageNewdids()[v], "2")
						break;
					}
				}
				if (DemoT != "false") {
					remainTime4 = parseInt(DemoT) - nowmillse;
					for (lk in allTasks) {
						mytask = allTasks[lk].split("_");
						if (mytask[0] == "7" && remainTime4 < 1000&&taskdoing=="1") {
							calldoing0()
							startDemonow(getAllVillageNewdids()[v], mytask);
							break;
						}
					}
				}
			}
		}
	}

	function cleartime(){
		ccclock = 0;
	}
/*************************************** main function start **********************************************/
  	TS_debug("-----------------------------  Autotask-Script start...");

	GM_registerMenuCommand(aLangTaskOfText[36], promptFreshInterval);
	GM_registerMenuCommand(aLangTaskOfText[42], promptTranInterval);

	// Check if we know what race we're playing
	if (GM_getValue(myacc() + "_raceID", "false") == "false") {
		// If race is unset, then reload to player's preferences to detect it
		// But first check if we're not already in prefences page
		if (window.location.href.indexOf("spieler.php") < 0) {
			window.location.replace(myhost + "/spieler.php?uid=" + getuid());
		}
	}

//  TS_debug("showTaskList...");
	showTaskList()
//  TS_debug("getMainVillageid...");
	getMainVillageid()
//  TS_debug("getResourceCap...");
	getResourceCap()
//  TS_debug("getResourceRate...");
	getResourceRate()
	
	if (window.location.href.indexOf("&s=4") == -1) {
		getallVillagePos()
	}
	
	if((window.location.href.indexOf("a2b.php") != -1) && (window.location.href.match(/[\?&]d=/)==null)){
		TS_debug('Check CreatAttackBtn');	
		createAttackBtn();
	}
	TS_debug(h1in().innerHTML + "-- " + stripHTML(h1in().innerHTML))
	var h1innerr=stripHTML(h1in().innerHTML).split(" ")
//	TS_debug("h1in().innerHTML = " + h1in().lastChild.innerHTML);
//	TS_debug("FM h1innerr.length =" + h1innerr.length);
	switch (h1innerr.length){
		case 3:
			bName=h1innerr[0];
			TS_debug('FM Case 3 bName =' + bName);	
		break;
		case 4:
			bName=h1innerr[0]+" "+h1innerr[1];
			TS_debug('FM Case 4 bName =' + bName);	
		break;
		case 5:
			bName=h1innerr[0]+" "+h1innerr[1]+" "+h1innerr[2];
			TS_debug('FM Case 5 bName =' + bName);	
		break;
		case 6:
			bName=h1innerr[0]+" "+h1innerr[1]+" "+h1innerr[2]+" "+h1innerr[3];
			TS_debug('FM Case 6 bName =' + bName);	
		break;
		default:
		bName=""
		break;
	}
//	if (bName==aLangAllBuildWithId[24]) {
//		TS_debug('FM --------------------- "CreatePartyLnk" bName = ' + bName);	
//		createPartylnk();
//	}

	if ((bName==aLangAllBuildWithId[12]||bName==aLangAllBuildWithId[13])&& window.location.href.match(/[^gd]id/) != null){
		TS_debug('FM --------------------- "CreateImprove" bName = ' + bName);	
		createImprovelink();
	}
	
	if(stripHTML(h1in().innerHTML).indexOf(aLangAllBuildWithId[15])!=-1&&h1innerr[h1innerr.length-1]>9&&(!$("demolish"))) {
		TS_debug('FM --------------------- "CreateDemolishLink" bName = ' + bName);	
		createDemolishlnk();
	}
	
	if (bName==aLangAllBuildWithId[19]||bName==aLangAllBuildWithId[20]||bName==aLangAllBuildWithId[21]||bName==aLangAllBuildWithId[25]||bName==aLangAllBuildWithId[26]||bName==aLangAllBuildWithId[29]||bName==aLangAllBuildWithId[30]){
		TS_debug('FM --------------------- "CreateTrainLink" bName = ' + bName);	
		createTrainLnk();
	}

//  TS_debug("indexOf('build') = " + window.location.href.indexOf("build"));
//  TS_debug("match(/[^gd]id/) = " + window.location.href.match(/[^gd]id/));
//  TS_debug("h1innerr[h1innerr.length-1] = " + h1innerr[h1innerr.length-1]);
//  TS_debug("isNaN(h1innerr[h1innerr.length-1]) = " + isNaN(h1innerr[h1innerr.length-1]));

	if ((window.location.href.indexOf("build") != -1) && (window.location.href.match(/[^gd]id/) != null) && !isNaN(h1innerr[h1innerr.length-1] && window.location.href.indexOf("&t=") == -1)) { 
		createbuildlink();
	}
  TS_debug("Check for 'new build' page..." + stripHTML(h1in().innerHTML));
	if(stripHTML(h1in().innerHTML) == aLangGameText[15]) {
//		flag('Premier flag');
  		TS_debug("Check for 'CreateNewBuild' page..." + stripHTML(h1in().innerHTML));
		createNewbuildLnk();	// Creation option NEW BUILD.
	}
	
	if (window.location.href.indexOf("dorf1") != -1) {
//  		TS_debug("Check for 'createAutoResLink' page..." + window.location.href));
		createAutoResLink(); 	// Creation option RESSUPD in page
	}
	
	if (bName == aLangAllBuildWithId[17] && window.location.href.indexOf("t=") == -1) {
  		TS_debug("Check for 'createAutoTransBtn' page..." + bName);
		createAutoTransBtn(); 	// Creation option for Transport automatique and personnalise
	}
	
	if (stripHTML(h1in().innerHTML).indexOf(aLangAllBuildWithId[37])!=-1) {
		getHeroSpeed();
	}
	window.addEventListener("keydown", cleartime, false);
	window.addEventListener("mousemove", cleartime, false);

	myower = setInterval(eachTimedo, 6000);

//mybar.innerHTML=getImproveTroops("18");
