// ==UserScript==
// @name                        kira_evo+
// @version                     2.20.7
// @namespace                   http://www.redalliance.info/red_evo/
// @description                 Enchances evo game :-)
// @include                     http://playevo.com/*
// @author                      ~ravenlord~ (r4v3n10rd@gmail.com) - original 1.0x source
// @author                      HETMAN (kanarinios@gmail.com)
// @author                      mindfox
// @author                      Fire
// @author                      MadFrog (mbfrog@gmail.com)
// @author                      Roland
// @author                      WhyteWolf (whytewolf1@gmail.com)
// @author                      Gavry
// @author                      Jamie
// @author                      Noobishactz
// ==/UserScript==

/*
 * $Id: evoplus.user.js,v 1.11 2006/03/09 11:47:02 madfrog Exp $
 *
 * $Log: evoplus.user.js,v $
 * Revision 1.11  2006/03/09 11:47:02  madfrog
 * added automatic handling ot the evo-dev.neondragon.net URL
 * forgot to credit Hemna for the evo-dev critter stats
 *
 * Revision 1.10  2006/03/09 01:55:06  madfrog
 * added support for evo-dev (5 mns ticks and creature stats - thanks to [BT]Hemna)
 * added support for the Efficient Breeding center on on the create page
 * fixed problems on the news page (NaNs on the BRs. /0 is innocent ;))
 * added average land per alliance member on the alliance ranking page (Gavry)
 *
 * Revision 1.9  2006/02/19 17:13:30  madfrog
 * Corrected a bug in the cost evaluation of losses (it broke with defenses like forts)
 * Removed a couple of NaNs caused by a div by zero (pun intended)
 *
 * Revision 1.8  2006/02/17 18:56:39  madfrog
 * Simplified land ratio on the resources page
 * Disabled land grab stats if defending
 * Added cost evaluation of losses on battle reports
 * Version bump
 *
 * Revision 1.7  2006/02/09 18:35:52  madfrog
 * Adapted to the new user interface
 *
 * Revision 1.6  2006/02/02 13:19:33  whytewolf
 * minor cost fix for OP and MP costs
 * also spelling correction
 *
 * Revision 1.5  2006/02/01 19:56:01  madfrog
 *
 * Implemented Maximum possible boosts (for scans, affected by previous change) separated from the players's boosts (for create and fleets).
 * Hooked the boost configuration to a menu command.
 * A bit of code cleanup in the land ratio display.
 * Better tooltip information in the scans att2/def2 evaluations.
 *
 * Revision 1.4  2006/01/31 22:56:12  whytewolf
 *
 * typo correction and version bump
 * and version change to include magor.minor.bug
 *
 * Revision 1.3  2006/01/31 22:42:36  whytewolf
 *
 * added land ratio function
 * and MaxBoost Configureation
 *
 *
 * $Log: evoplus.user.js,v $
 * Revision 1.2  2006/01/30 16:19:18  madfrog
 * Added land grab stats on the news page (from Roland's)
 *
 * Revision 1.1  2006/01/30 13:21:09  madfrog
 * First 2.0 version. Almost complete rewrite of the 1.x series with some addtional features.
 *
 * Revision 2.2  2006/01/31 Sentinel
 * Added Persistent fleet destination and Launch reminder to fleets page and fleet calc to inventory page
 *
 * Revision 2.3 2006/02/02 Sentinel
 * Added Evo+ config panel to turn off Stats and YouSure propts on Create and Scans pages
 * and the ability to turn Space elevator calculations on or off for the fleet calc on the inventory page.
 *
 * Revision 2.4 2006/02/02 Sentinel
 * Fixed Fleet calc bug where creatures with spaces in name were not counted.
 *
 * Revision 2.5 2006/02/03 Sentinel
 * Added land allocation Calculation to Scans page.
 *
 * Revision 2.6 2006/02/03 Sentinel
 * Added Sorting of Alliance members
 *
 * Revision 2.7 2006/02/03 Sentinel
 * Fixed a regex bug in the above feature
 *
 * Revision 2.8 2006/02/03 Sentinel
 * Added latest revistions from evo madfrog
 * Added ability to grab boost info from development page.
 *
 * Revision 2.9 2006/02/10 Sentinel
 * Added ability to detect new updates 
 *
 * Revision 2.10 2006/02/28 Sentinel
 * Handled changes to inventory page.
 *
 * Revision 2.11 2006/02/28 Sentinel
 * Fixed an error on resource overview when you have no unallocated land.
 * (silly me I almost always have unallocated land)
 *
 * Revision 2.12 2006/03/07 Sentinel
 * Added a histogram of online times for buddies.  The histogram is displayed
 * on all continentBoxs, the stats are gleaned from the overview page where
 * it shows which buddies are online.
 *
 * Revision 2.13 2006/03/07 Sentinel
 * Fixed some accounting errors with the histogram scanner and added a reset function.
 *
 * Revision 2.14 2006/03/08 Sentinel
 * Added scanning of universe pages to the histogram scanner.
 * Also made a change to the update checker that will hopefully
 * prevent false negatives due to cache hits.
 *
 * Revision 2.15 2006/03/08 Sentinel
 * Modularized the config Panel and the auto updater so they are more portable
 * back to the community at large.
 * Merged in Mindfox's Addition of Efficient Breeding Center creature Cost Calculation.
 *
 * Revision 2.16 2006/03/08 Sentinel
 * Changed buildHistogram to output a blue bar for the current tick.
 *
 * Revision 2.17 2006/03/09 Sentinel
 * Merged in revisions to public version
 *
 * Revision 2.18 2006/03/13 Sentinel
 * Fixed UI issue with the config panel that cropped up in dEvo.
 *
 * Revision 2.18 2006/04/26 Sentinel
 * Added %of Score to Universe page and fixed a bug in dEvo with the resource/overview failing
 * to load when one had more than 999 land allocated to any particular resource or in unallocated
 * land (neon added commas to the numbers).
 *
 * Revision 2.19 2006/05/xx Sentinel
 * Added Config switch to turn the Launch reminder on and off.
 * Added some code to help the config panel work in dEvo.
 * replaced occurences of number() with evoString2Number() in case neon adds more comas.
 * Fixed a string escaping issue that was negatively affecting the histogram display.
 * Added Food Launch cost in scans (mindfox)
 *
 * Revision 2.19.3 2006/06 Mefisto
 * Adjusted Defensive calculations to take into account asymetric multipliers.
 * Updated Sector and creature scans.
 * fixed dEvo Creature stats.
 *
 * revision 2.19.4 2006/06/08 Sentinel
 * - Fixed many incompatibilities with dEvo.
 * 
 * revision 2.19.4a 2006/06/09 Mephisto
 * - Corrected Create page defect where max number of available units
 *   was misrepresented (didn't completely take EBC into account).
 *
 * revision 2.19.5 2006/06/12 Sentinel
 * - Minor correction to histogram logic where players with a status of
 *   "Never logged in" were preventing the parsing of latter players on the page.
 * - fixed the xPaths on the overview and news screens.
 *
 * revision 2.19.6 2006/07/13 Sentinel
 * - Revised evo creature specs for next round and made the auto update checker
 *   use a grease monkey cookie to store the location of the official version,
 *   settable via the config EVO+ config panel.
 *
 * Revision 2.20 2006/08/03 Mindfox
 * - Applied HTML code changes
 * - Added base code in News page for posting of news items
 * - Added code for Mass Mail from Alliance-members page
 * - Added xpath() wrapper for the document.evaluate functions
 *
 * Revision 2.20.1 2006/08/20 Mindfox
 * - Completed the Mass Mail function
 * - Created a new object (evoPlayer) with a container for it (evoPlayers).
 * - Added autobuddies function from alliance member page
 * 
 * Revision 2.20.2 2006/08/31 Mindfox
 * - Added download pm function
 * - Added News filtering function
 * - Added Copy to Clipboard (for news posting) function
 * - Added new defence calculations to scans, inventory and news page
 * - Added an external library in order to create a spreadsheet-like block
 *  
 * Revision 2.20.3 2006/12/25 Mindfox
 * - Added ability to handle "unknown" items. *  
 *
 * Revision 2.20.3a 2006/12/25 Mefisto
 * - Fixed maxBoosts for last creatures of ENG paths.
 * 
 * Revision 2.20.4 2007/8/1 kcs2c
 * - Added some error Logging old school using DEBUG_LEVEL to control functionality
 *		- 500 turns on Entry/Exits for Entire Script
 *		- 400 Stuff within helper functions
 *		- 300 Entry Exit for helper functions
 *		- 200 Stuff within pages
 *		- 100 Entry Exit for each Page
 * - Whitespacing
 * - Information Overview
 *		- Added Fleets, Defences and Unallocated % from evo 4.0.5
 * - Expansion/Resources
 *		- Added How much you can allocated from evo 4.0.5
 * - Alliances/Members
 *		- Fixed the Sorts
 *		- Fixed the Score for the targets available, added alliacne score 
 * - Information/Universe
 *		- Added Displayof time gone
 *		- Added Attack this to coords
 *		- Added Code to Capture to Database *Needs work
 * - News 
 *		- Added sums for attacker and defender
 * 
 * Revision 2.20.5 2007/8/15 kcs2c
 * - Added Next to the Universe Page
 * - Corrected display of defenders on attacking news
 * - Added total and delta to fleets page to catch size errors.
 *
 * Revision 2.20.6a 2007/10/25 kcs2c
 * - Basic Planetary News Reporting
 * Revision 2.20.6b 2007/11/21 kcs2c
 * - Advanced Planetary News Reporting with date,time,player and stub for password
 * Revision 2.20.6c 2007/11/23 kcs2c
 * - Fixed error in sending planet info twice
 * - Added ratios to scan amps on scans page
  

 
 */

// ***************************************************************************
// ** Global Variables
// ***************************************************************************
const scriptversion = '2.20.7';
const scriptversionID = 'Kira Evo+ ' + scriptversion;
const scriptTag = 'Kira Strikes Back';
const EVO_DEBUG = true;
const REDFORUM_URL = 'http://playevo.com/_/747968-The-Lords-Kira-Alliance-Forum'; 
//const POST_NEWS = 'red_evo/evo.php?action=post&page=news';
const POST_NEWS = 'modules.php?name=Evolution&action=postNews';
const POST_PM = 'modules.php?name=Evolution&action=postPM';
const DEBUG_LEVEL = 400;


EVO_debug(scriptversionID + " start",499);


function EVO_debug(message, level) {
  if ((EVO_DEBUG) && (level < DEBUG_LEVEL)) {
    GM_log(message);
  }
}


// page handlers
var pageHandlers = new Array();

var units = new Array(); // units :P
var contents = null; // pointer to the 'content' node in the page
//var players = new evoPlayers();

// boosts
const UT_NONE           = 0;
const UT_NATURAL        = 1;
const UT_NAT            = 1;
const UT_ENG            = 2;
const UT_LAST           = 3;

// tech
const ET_BGC = 0; // Basic Gentics Centre
const ET_IGC = 1; // Intermediat Genetics Centre
const ET_IMC = 2; // Improved Genetics Centre
const ET_AGC = 3; // Advanced Genetics Centre
const ET_NAP = 4; // Nanotechnology Plant
const ET_NAW = 5; // Nanotech Weapons Factory
const ET_SEL = 6; // Space Elevator
const ET_EBC = 7; // Efficient Breeding Center


// Discount of natural creatures with Efficient Breeding Center
var EBCdiscount = 0.1;

// max possible boosts
var maxBoosts = new Array();
maxBoosts[UT_NONE]    = 0;
maxBoosts[UT_NATURAL] = 0.3946625;  //max boost for natural
maxBoosts[UT_ENG]     = 0.33126875; //max boost for eng
maxBoosts[UT_LAST]    = 0.21275;    //max boost for eng_last (no nano)

// user current boosts
var boosts = new Array();
boosts[UT_NONE]         = 0;
boosts[UT_NATURAL]      = Number(evoGetCookie('boostNat', maxBoosts[UT_NATURAL]));
boosts[UT_ENG]          = Number(evoGetCookie('boostEng', maxBoosts[UT_ENG]));
boosts[UT_LAST]         = Number(evoGetCookie('boostEng', maxBoosts[UT_LAST]));

var attLevels = new Array();
var defLevels = new Array();
            //Nat,  Eng
attLevels = [[1,    1],    //[0], Basic Gentics Centre (def only)
             [1.1,  1.05], //[1], Intermediat Genetics Centre (att only)
             [1.05, 1.05], //[2], Improved Genetics Centre
             [1.1,  1.1],  //[3], Advanced Genetics Centre
             [1.05, 1.05], //[4], Nanotechnology Plant
             [1.15, 1.15]];//[5], Nanotech Weapons Factory
defLevels = [[1.1,  1.05], //[0], Basic Gentics Centre (def only)
             [1,    1],    //[1], Intermediat Genetics Centre (att only)
             [1.05, 1.05], //[2], Improved Genetics Centre
             [1.1,  1.1],  //[3], Advanced Genetics Centre
             [1.05, 1.05], //[4], Nanotechnology Plant
             [1.15, 1.15]];//[5], Nanotech Weapons Factory
var userTech = new Array();

var pMetal = 0, pMineral = 0, pFood = 0; //player's resources
var pRank = null, pScore = null; // player's ranking and score

var dEvo = /^http:\/\/evo-dev\./.test(document.location.href);


// XPath wrapper (document.evaluate with simplicity)
function xpath(query, domspace, single) {
            if (!single) {
                        return document.evaluate(query, domspace, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            } else {
                        return document.evaluate(query, domspace, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
            }
}


// preload of images
var applicationImages = new Array();
applicationImages[applicationImages.length] = 'http://img241.imageshack.us/img241/4267/foldernewye9.gif';
applicationImages[applicationImages.length] = 'http://img213.imageshack.us/img213/4530/flaggrwj5.gif';
applicationImages[applicationImages.length] = 'http://img213.imageshack.us/img213/5543/plusla0.jpg';
applicationImages[applicationImages.length] = 'http://img213.imageshack.us/img213/9383/plusvk5.png';
applicationImages[applicationImages.length] = '';
applicationImages[applicationImages.length] = '';
applicationImages[applicationImages.length] = '';
applicationImages[applicationImages.length] = '';
applicationImages[applicationImages.length] = '';
applicationImages[applicationImages.length] = '';
applicationImages[applicationImages.length] = '';

img_icn_plus = document.createElement('img');
img_icn_plus.src = 'http://img244.imageshack.us/img244/9884/plusgy2.gif';
img_icn_minus = document.createElement('img');
img_icn_minus.src = 'http://img221.imageshack.us/img221/9049/minusvt8.gif';
img_massmail = document.createElement('img');
img_massmail.src = 'http://img137.imageshack.us/img137/2928/massmail1hm1.gif';
img_btn_massmail = document.createElement('img');
img_btn_massmail.src = 'http://images.neondragon.net/ev5/sectionicons/messages.png';
imagesdiv = document.createElement('div');
imagesdiv.appendChild(img_icn_plus);
imagesdiv.appendChild(img_icn_minus);
imagesdiv.appendChild(img_massmail);
imagesdiv.appendChild(img_btn_massmail);
document.body.appendChild(imagesdiv);
imagesdiv.style.display = 'none';

// overload test

var _continentBox = null;

var showPlayerInfo = function(id,userid,x,y,z,c,ruler,continent,alliances,icons,buddyname,extra,avatar) {
	EVO_debug("ENTER showPlayerInfo",399);

    var argsarray = arguments;
    var args = '';
    for (var i = 0; i < argsarray.length; i++) {
		args +=(argsarray[i] + ', ');
		EVO_debug(argsarray[i],299);
    }
    var argslen = args.substring(0, args.length-2);
	//alert(argsarray.length);
	EVO_debug(argslen,299);
	EVO_debug("EXIT showPlayerInfo",399);
    return _continentBox(id,userid,x,y,z,c,ruler,continent,alliances,icons,buddyname,extra,avatar);
}

var lastitemclicked = null;

function interceptClick (e) {
	EVO_debug("ENTER interceptClick",399);
    alert('You clicked on a ' + e.target + ' with mouse button ' + e.button);
    EVO_debug("EXIT interceptClick",399);
}


// define GM_xmlHTTP default Headers;
var xmlHeaders = new Object;
xmlHeaders['User-Agent'] = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.0.6) Gecko/20060728 Firefox/1.5.0.6';
xmlHeaders['Accept'] = 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5';
xmlHeaders['Accept-Language'] = 'en-us';
xmlHeaders['Accept-Encoding'] = 'gzip,deflate';
xmlHeaders['Accept-Charset'] = 'ISO-8859-1,utf-8;q=0.7,*;q=0.7';
xmlHeaders['Keep-Alive'] = '300';
xmlHeaders['Connection'] = 'keep-alive';



// Insert new functions to javascript objects
/**************************************************/
/**************************************************/

//unsafeWindow.status = 'Testing...';
//alert(unsafeWindow.status);

var p = unsafeWindow;

function createLaunchWin() {
	EVO_debug("ENTER createLaunchWin",399);

	var testcss='div.gridbox{overflow:hidden;}div.gridbox table.hdr td {font-family:arial;font-size:12px;' +
	'color: black;background-color:#D4AFD8;border: 1px solid;border-color : white Gray Gray white;text-align: center;margin:0px;' +
	'padding:5px 0px 5px 0px ;font-weight:normal;-moz-user-select:none;}div.gridbox table.obj td {border: 1px solid;' +
	'border-color : white Gray Gray white;font-family:arial;font-size:12px;-moz-user-select:none;}' +
	'div.gridbox .objbox {background-color:#6E4040;}' +
	'div.gridbox table.obj td span.space, div.gridbox table.obj td img.space{width:18px;}' +
	'div.gridbox table.obj tr.rowselected td.cellselected, div.gridbox table.obj td.cellselected {background-color:#d8d8d8;' +
	'color:black;}div.gridbox table.obj tr.rowselected td{background-color:#e1e0d7;color:black;}' +
	'div.gridbox table.obj td.editable{-moz-user-select:text;color:green;}';

	GM_addStyle(testcss)

	p.dScripts = new Array('/grid/js/dhtmlXCommon.js', '/grid/js/dhtmlXGrid.js', '/grid/js/dhtmlXGridCell.js', '/window/scripts/lib/prototype.js?a12', '/window/scripts/lib/scriptaculous/scriptaculous.js?s1', '/window/scripts/dwt.js?t3');
	p.dScriptStatus = null;
	loadScripts();
	EVO_debug("EXIT createLaunchWin",399);
}

var evoconfwin = '		<div id="pager.window" class="dwtWindow" effect="Appear" style="left: 180px; top: 100px; width: 700px; display: none">' +
'			<div id="pager.window.titleBar" class="dwtWindowTitleBar" minimizedClass="dwtMinimizedWindowTitlebar" inactiveMinimizedClass="dwtInactiveMinimizedWindowTitleBar">' +
'				<table cellspacing="0" cellpadding="0" border="0">' +
'					<tr>' +
'						<td class="dwtWindowTitleBarChromeLeft"><img class="dwtWindowTitleBarChrome" src="images/dwt/blank.gif" /></td>' +
'						<td class="dwtWindowTitleBar" valign="center"><img class="dwtWindowTitleBarIcon" src="images/dwt/blank.gif" /></td>' +
'						<td id="pager.window.titleBar.titleBarText" class="dwtWindowTitleBar"><div class="dwtWindowTitleBarText">Red_Evo+ Preferences</div></td>' +
'						<td class="dwtWindowTitleBar"><img class="dwtWindowTitleBarWhitespace" src="images/dwt/blank.gif" /></td>' +
'						<td class="dwtWindowTitleBar"><img class="dwtWindowTitleBarControl" controlType="minimize" effect="Fade" restoreEffect="Appear" src="images/dwt/minimize.gif" mouseoverSrc="images/dwt/minimize.mouseover.gif" restoreSrc="images/dwt/restore.gif" restoreMouseoverSrc="images/dwt/restore.mouseover.gif" /></td>' +
'						<td class="dwtWindowTitleBar"><img class="dwtWindowTitleBarControl" controlType="close" effect="DropOut" src="images/dwt/close.gif" mouseoverSrc="images/dwt/close.mouseover.gif" /></td>' +
'						<td class="dwtWindowTitleBarChromeRight"><img class="dwtWindowTitleBarChrome" src="images/dwt/blank.gif" /></td>' +
'					</tr>' +
'				</table>' +
'			</div>' +
'			<div class="dwtWindowBorder"> ' +
'				<div class="dwtWindowContents" style="height: 130px; background-color: #ebebe4;" nsResizeTarget="true">' +
'<DIV id="evoConfig" style="display: block; height: 125px; font-size: 12px;">' +
'  <TABLE border="0">' +
'    <TBODY>' +
'      <TR>' +
'        <TD rowspan="3">' +
'          <INPUT type="checkbox" value="true" id="ShowStats"/>Show Stats          <BR/>' +
'          <INPUT type="checkbox" value="true" id="PromptForPurchases"/>Prompt on Submit          <BR/>' +
'          <INPUT type="checkbox" value="true" id="EnableTimer"/>Enable Launch Reminder          <BR/>' +
'          <INPUT type="checkbox" value="true" id="resetHistogram"/>Reset Histograms          <BR/>' +
'Natural Boost:           <INPUT id="boostNat" size="11"/>          <BR/>' +
'Genetic Boost:           <INPUT id="boostEng" size="11"/>          <BR/>' +
'        </TD>' +
'        <TD colspan="2">' +
'          <INPUT type="checkbox" value="true" id="UpdateFromWeb"/>Update From Web          <BR/>' +
'        </TD>' +
'      </TR>' +
'      <TR>' +
'        <TD>' +
'          <INPUT type="checkbox" value="0" id="hasBGC"/>Basic Genetic Centre          <BR/>' +
'          <INPUT type="checkbox" value="1" id="hasIGC"/>Intermediate Genetic Centre          <BR/>' +
'          <INPUT type="checkbox" value="2" id="hasImC"/>Improved Genetic Centre          <BR/>' +
'          <INPUT type="checkbox" value="3" id="hasAGC"/>Advanced Genetic Centre        </TD>' +
'        <TD>' +
'          <INPUT type="checkbox" value="4" id="hasNaP"/>Nanotechnology Plant          <BR/>' +
'          <INPUT type="checkbox" value="5" id="hasNaW"/>Nanotech Weapons Factory          <BR/>' +
'          <INPUT type="checkbox" value="6" id="hasSEl"/>Space Elevator          <BR/>' +
'          <INPUT type="checkbox" value="7" id="hasEBC"/>Efficient breeding        </TD>' +
'      </TR>' +
'      <TR>' +
'        <TD colspan="2">' +
'Master URL:           <INPUT id="masterURL" size="60"/><INPUT type="checkbox" value="false" id="checkNow"/>' +
'        </TD>' +
'      </TR>' +
'    </TBODY>' +
'  </TABLE>' +
'</DIV>' +
'				</div>' +
'			</div>' +
'		</div>';

var testevowincss = 'div.dwtWindow {position: absolute;border: 0px solid #808080;visibility: hidden;}' +
'div.dwtInactiveWindow {position: absolute;border: 0px solid #808080;visibility: hidden;}' +
'div.dwtWindowTitleBar {}' +
'div.dwtInactiveWindowTitleBar {}' +
'div.dwtMinimizedWindowTitleBar {cursor: default;border-width: 0px 0px 1px 0px;border-style: solid;border-color: #808080;}' +
'div.dwtInactiveMinimizedWindowTitleBar {cursor: default;border-width: 0px 0px 1px 0px;border-style: solid;border-color: #808080;}' +
'div.dwtWindowTitleBarText {cursor: default;padding-left: 5px;font-family: "MS Sans Serif", "Arial", "Helvetica", sans-serif;font-size: 8pt;font-weight: bold;color: #ffffff;white-space: nowrap;overflow: hidden;}' +
'div.dwtInactiveWindowTitleBarText {cursor: default;padding-left: 5px;font-family: "MS Sans Serif", "Arial", "Helvetica", sans-serif;font-size: 8pt;font-weight: bold;color: #000000;white-space: nowrap;overflow: hidden;}' +
'td.dwtWindowTitleBarChromeLeft {width: 6px;height: 24px;background: transparent url("http://www.redalliance.info/jscript/window/images/dwt/titleBar.left.gif");}' +
'td.dwtInactiveWindowTitleBarChromeLeft {width: 6px;height: 24px;background: transparent url("http://www.redalliance.info/jscript/window/images/dwt/titleBar.left.inactive.gif");}' +
'img.dwtWindowTitleBarChrome {width: 6px;height: 24px;}' +
'img.dwtWindowTitleBarIcon {width: 24px;height: 24px;}' +
'td.dwtWindowTitleBar {background: transparent url("http://www.redalliance.info/jscript/window/images/dwt/titleBar.background.gif");overflow: hidden;}' +
'td.dwtInactiveWindowTitleBar {background: transparent url("http://www.redalliance.info/jscript/window/images/dwt/titleBar.background.inactive.gif");overflow: hidden;}' +
'img.dwtWindowTitleBarWhitespace {width: 18px;height: 24px;}' +
'img.dwtWindowTitleBarControl {width: 18px;height: 24px;}' +
'td.dwtWindowTitleBarChromeRight {width: 6px;height: 24px;background: transparent url("http://www.redalliance.info/jscript/window/images/dwt/titleBar.traditional.right.gif");}' +
'td.dwtInactiveWindowTitleBarChromeRight {border: 0px solid #808080;width: 6px;height: 24px;background: transparent url("http://www.redalliance.info/jscript/window/images/dwt/titleBar.traditional.right.inactive.gif");}' +
'div.dwtWindowBorder {border-width: 0px 1px 1px 1px;border-style: solid;border-color: #5274ab #808080 #808080 #808080;padding: 2px;background-color: #5274ab;overflow: hidden;}' +
'div.dwtInactiveWindowBorder {border-width: 0px 1px 1px 1px;border-style: solid;border-color: #ebebe4 #808080 #808080 #808080;padding: 2px;background-color: #ebebe4;overflow: hidden;}' +
'div.dwtWindowContents {background-color: #ffffff;padding: 3px;overflow: auto;}' +
'div.dwtInactiveWindowContents {background-color: #ffffff;padding: 3px;overflow: auto;}' +
'div.dwtWindowStatusBar {border-width: 1px 0px 0px 0px;border-style: solid;border-color: #808080;padding: 3px;background-color: #ebebe4;vertical-align: middle;white-space: nowrap;overflow: auto;}' +
'span.dwtWindowStatusBarText {font-family: "Arial", "Helvetica", sans-serif;font-size: 8pt;font-weight: normal;color: #000000;vertical-align: middle;white-space: nowrap;overflow: hidden;}'; //' +
//table {border-collapse: collapse;border-spacing: 0;}' +
//td {padding: 0;}' +
GM_addStyle(testevowincss);



var testwindow = document.createElement("p");
testwindow.innerHTML = evoconfwin;
document.body.appendChild(testwindow);

//	var _pager = document.getElementById("pager.window");
//	var pager = new p.dwt.Window(_pager);
//	var inputs = _pager.getElementsByTagName("input");
//	for (var i = 0; i < inputs.length; i++) {
//		pager.setZIndexOnFocus.push(inputs[i]);
//	}
//	pager.open(pager.effect);


function makeGrid() {
EVO_debug('Creating div');
	var topdiv = document.createElement('div');
	topdiv.style.width='800px';
	topdiv.style.height='200px';
	var headdiv = document.createElement('div');
	headdiv.style.width='800px';
	headdiv.style.height='20px';
	headdiv.style.background = '#555555';
	headdiv.style.color = 'blue';
	headdiv.style.textAlign = 'center';
	headdiv.style.fontWeight = 'bold';
	headdiv.textContent = 'Scheduled Launches';
	topdiv.appendChild(headdiv);
	var testdiv = document.createElement('div');
	testdiv.style.width='800px';
	testdiv.style.height='180px';
	testdiv.setAttribute('id','gridbox');
	topdiv.appendChild(testdiv);
	document.body.appendChild(topdiv);

//alert(p.dhtmlXGridObject);
	mygrid = new p.dhtmlXGridObject('gridbox');

	mygrid.imgURL = "http://www.redalliance.info/jscript/grid/imgs/";
//checkbox, timeofattack, tickofgame, continent, hasattack, hasdefence, reqattack, reqdefence, remainingatt, remainingdef
	mygrid.setHeader("Attack?, Launch Time, Launch Tick, Target Name, Target's Att, Target's Def, Req'd Att, Req'd Def, Needed Att, Needed Def");
	mygrid.setInitWidths("40,120,50,170,70,70,70,70,70,70");
	mygrid.setColAlign("center,right,right,left,right,right,right,right,right,right");
	mygrid.setColTypes("ch,ed,ed,ed,ed,ed,ed,ed,ed,ed");
	mygrid.setColSorting("int,date,int,str,int,int,int,int,int,int")
EVO_debug('Initializing Grid');
	mygrid.init();
EVO_debug('Loading Grid Data');
	mygrid.loadXMLString(tstXML); 
}
var tstXML = '<?xml version="1.0" encoding="UTF-8"?><rows>' +
//            checkbox,             timeofattack,             tickofgame,              continent,                     hasattack,            hasdefence,           reqattack,             reqdefence,        remainingatt,          remainingdef
'<row id="1"><cell>0</cell><cell>21/9/2006 07:59:00</cell><cell>895</cell><cell>(2,5,1:f) test of test</cell><cell>1,000,000</cell><cell>2,000,000</cell><cell>10,000,000</cell><cell>8,000,000</cell><cell>3,500,000</cell><cell>4,000,000</cell></row>' +
'<row id="2"><cell>0</cell><cell>21/9/2006 12:59:00</cell><cell>905</cell><cell>(3,5,9:a) testing of test</cell><cell>2,000,000</cell><cell>3,500,000</cell><cell>10,000,000</cell><cell>8,000,000</cell><cell>3,500,000</cell><cell>4,000,000</cell></row>' +
'<row id="3"><cell>0</cell><cell>21/9/2006 18:59:00</cell><cell>915</cell><cell>(3,7,8:g) test of testing</cell><cell>3,000,000</cell><cell>7,100,000</cell><cell>10,000,000</cell><cell>8,000,000</cell><cell>3,500,000</cell><cell>4,000,000</cell></row>' +
'<row id="4"><cell>0</cell><cell>21/9/2006 23:59:00</cell><cell>935</cell><cell>(2,2,9:d) testing of testing</cell><cell>5,000,000</cell><cell>4,000,000</cell><cell>10,000,000</cell><cell>8,000,000</cell><cell>3,500,000</cell><cell>4,000,000</cell></row>' +
'<row id="5"><cell>0</cell><cell>22/9/2006 08:59:00</cell><cell>955</cell><cell>(4,10,5:g) tst of tst</cell><cell>9,000,000</cell><cell>9,512,000</cell><cell>10,000,000</cell><cell>8,000,000</cell><cell>3,500,000</cell><cell>4,000,000</cell></row>' +
'<row id="6"><cell>0</cell><cell>22/9/2006 14:59:00</cell><cell>965</cell><cell>(2,8,1:d) test of tst</cell><cell>7,000,000</cell><cell>12,876,000</cell><cell>10,000,000</cell><cell>8,000,000</cell><cell>3,500,000</cell><cell>4,000,000</cell></row>' +
'<row id="7"><cell>0</cell><cell>22/9/2006 21:59:00</cell><cell>975</cell><cell>(3,5,3:f) tsting of tst</cell><cell>1,000,000</cell><cell>22,350,000</cell><cell>10,000,000</cell><cell>8,000,000</cell><cell>3,500,000</cell><cell>4,000,000</cell></row>' +
'<row id="8"><cell>0</cell><cell>23/9/2006 09:59:00</cell><cell>985</cell><cell>(3,1,1:f) tstg of testgfg</cell><cell>2,000,000</cell><cell>1,200,000</cell><cell>10,000,000</cell><cell>8,000,000</cell><cell>3,500,000</cell><cell>4,000,000</cell></row>' +
'</rows>';


function waitForScript() {
	if (p.dScriptStatus=='downloading') {
		// set to check every 100 milliseconds if the libary has loaded
EVO_debug('Still Loading, with dScriptStatus = ' + p.dScriptStatus);
	        window.setTimeout(waitForScript, 1000);
	} else {
		// call the rest of your code
EVO_debug('Finished Loading ');
		loadScripts();
	}
}


function loadScripts() {
	// get the script filename
	if (p.dScripts.length == 0) {
		if (p.dhtmlXGridObject && p.dwt.Window) {
alert("Is this the undefined prob?" + Element.getStyle);
			makeGrid();
			_pager = document.getElementById("pager.window");
			pager = new p.dwt.Window(_pager);
			var inputs = _pager.getElementsByTagName("input");
			for (var i = 0; i < inputs.length; i++) {
				pager.setZIndexOnFocus.push(inputs[i]);
			}
		 	pager.open(pager.effect);
//		 	pager.open();
EVO_debug("Creating window");

		} else {
			window.setTimeout(loadScripts, 100);
		}
		return false;
	}
	var dScript = p.dScripts.shift();
EVO_debug('Loading ' + dScript);
	// dynamically creates a script tag
        var dscr = document.createElement('script');
        dscr.type = 'text/javascript';
        dscr.src = 'http://www.redalliance.info/jscript' + dScript;
        document.getElementsByTagName('head')[0].appendChild(dscr);
	p.dScriptStatus = 'downloading';
        waitForScript();
}



/**************************************************/
/**************************************************/




// Functions regarding the Mass PM form
// Copy selected contents from one input list to another (for now used only for the mass messaging system)

picked=[];  // global array to remember selected items
curEmpty=0; // pointer to first empty location in output

// for the massmail procedure
var mmsending = false; 
var mmresults = '';
var mmerrors = 0;
var mmcancel = false;
var messageoptions = new mOptions;

// for the buddy Add procedure
var buddyResults = '';
var buddyErrors = 0;
var buddyCancel = false;



// send a message
function addBuddy(target) {
            var addBuddyDone = function (req) {
//                      if (req.responseHeaders.indexOf("X-Sent") >=0) {
                                    buddyResults = 'success';       
//EVO_debug(req.responseHeaders);
//EVO_debug(req.responseText);
//                      } else {
//                                  buddyResults = 'failure';
                                    response = req.responseText;
//EVO_debug(response);              
//                      }
            }


            if (!GM_xmlhttpRequest) {
                        alert('Please upgrade to the latest version of Greasemonkey.');
                        return;
            }
var thisTag = unescape(window.location.href.match(/\/alliances\/(.*)\/members(.*)$/)[1]);

            postData = "x=" + escape(target.getCoords['dimension']) + 
                        "&y=" + escape(target.getCoords['galaxy']) + 
                        "&z=" + escape(target.getCoords['planet']) + 
                        "&c=" + escape(target.getCoords['continent']) +
                        "&nickname=" + escape(target.UserName) +
                        "&label=!Other!" +
                        "&othertext=" + thisTag; //escape(target.primaryAllianceTag);

            buddyResults = 'adding';

            GM_xmlhttpRequest({
                        method: 'POST',
                        url: 'http://'+document.location.hostname+'/buddies/add',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                    data: postData,
                                    onload: addBuddyDone,
                                    onerror: function(req) {
                                                buddyResults='failure';
                                                EVO_debug('Failure');
                                                EVO_debug(req.responseHeaders);
                                                EVO_debug(req.responseText);
                                    }
                        });
//return false;
}



function checkBuddyAdding () {
//EVO_debug("Checking status of buddy addition");

            if (buddyResults == 'adding') {
                        window.setTimeout(function() { checkBuddyAdding() }, 200);
                        return false;
            }

            var totalReceipients = document.getElementById('list2');

            if (buddyResults == 'success') {
document.getElementById('massresultsp').textContent = 'Succeeded in adding ' + players.Players[totalReceipients[0].value].playerName + ' to buddies list';
                        deleteOption(totalReceipients,0, document.getElementById('totalreceipients'));
                        buddyResults = 'waiting';
                        window.setTimeout(function() { checkBuddyAdding() }, 200);
                        return false;
            } else if (buddyResults == 'failure') {
                        mmerrors++;
document.getElementById('massresultsp').textContent = 'Failed in sending pm to ' + players.Players[totalReceipients[0].value].playerName;
                        buddyResults = 'waiting';
                        window.setTimeout(function() { checkBuddyAdding() }, 200);
                        return false;
            } else {
                        if (buddyCancel) {

/*
                                    var frmstatus = document.getElementById('massfrmstatus');
                                    frmstatus.parentNode.removeChild(frmstatus);
                                    return false;
                                    mmcancel = false;
*/

                                    buddyErrors=0;
                                    buddyResults = '';
                                    document.getElementById('massfrmstatus').style.display = 'none';
                        }
                        document.getElementById('masscurrentnumber').textContent = String(parseInt(document.getElementById('masscurrentnumber').textContent) +1);
                        document.getElementById('massresultsp').textContent = '';


                        if (totalReceipients.options.length == 0) {
                                    buddyErrors=0;
                                    buddyResults = '';
                                    document.getElementById('massfrmstatus').style.display = 'none';
                                    alert('Finished');
                                    return false;
                        }
                        target = players.Players[totalReceipients[buddyErrors].value];

EVO_debug('Adding ' + target.playerName + ' to the buddies list, with label: ' + target.primaryAllianceTag);

                        addBuddy(target);
                        window.setTimeout(function() { checkBuddyAdding() }, 200);

            }
}


/*************************************************************************************************/

function mOptions() {
            this.processTerms = new Array();
            this.processBody = false;
            return this;
}

// send a message
function sendMessage(target, subject, message, options) {
            var sendMessageDone = function (req) {
                        if (req.responseHeaders.indexOf("X-Sent") >=0) {
//                                  mmsending = false;
                                    mmresults = 'success';       
//EVO_debug(req.responseHeaders);
//EVO_debug(req.responseText);
                        } else {
                                    mmresults = 'failure';
                                    response = req.responseText;
EVO_debug(response);              
                        }
            }

            if (options && options.processBody == true) {
                        for (var mmpbcount = 0; mmpbcount < options.processTerms.length; mmpbcount++) {
                                    message = message.replace(options.processTerms[mmpbcount][0], options.processTerms[mmpbcount][1], "g");
                        }
            }

            if (!GM_xmlhttpRequest) {
                        alert('Please upgrade to the latest version of Greasemonkey.');
                        return;
            }
            postData = "totype=coords&msgsubject="+escape(subject)+"&message="+escape(message)+"&x="+escape(target.getCoords['dimension'])+"&y="+escape(target.getCoords['galaxy'])+"&z="+escape(target.getCoords['planet'])+"&c="+escape(target.getCoords['continent']);

            mmresults = 'sending';

            GM_xmlhttpRequest({
                        method: 'POST',
                        url: 'http://'+document.location.hostname+'/send_message',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                    data: postData,
                                    onload: sendMessageDone,
                                    onerror: function(req) {
//                                                          mmsending=false;
                                                mmresults='failure';
                                                EVO_debug('Failure');
                                                EVO_debug(req.responseHeaders);
                                                EVO_debug(req.responseText);
                                    }
                        });
//return false;
}


function checkSending () {
EVO_debug("Checking status of pm sending");

            if (mmresults == 'sending') {
                        window.setTimeout(function() { checkSending() }, 1000);
                        return false;
            }

            var totalReceipients = document.getElementById('list2');

            if (mmresults == 'success') {
document.getElementById('massresultsp').textContent = 'Succeeded in sending pm to ' + players.Players[totalReceipients[0].value].playerName;
                        deleteOption(totalReceipients,0, document.getElementById('totalreceipients'));
                        mmresults = 'waiting';
                        window.setTimeout(function() { checkSending() }, 1000);
                        return false;
            } else if (mmresults == 'failure') {
                        mmerrors++;
document.getElementById('massresultsp').textContent = 'Failed in sending pm to ' + players.Players[totalReceipients[0].value].playerName;
                        mmresults = 'waiting';
                        window.setTimeout(function() { checkSending() }, 1000);
                        return false;
            } else {
                        if (mmcancel) {
/*
                                    var frmstatus = document.getElementById('massfrmstatus');
                                    frmstatus.parentNode.removeChild(frmstatus);
                                    return false;
                                    mmcancel = false;
*/
                                    mmerrors=0;
                                    mmsending = false;
                                    mmresults = '';
                                    document.getElementById('massfrmstatus').style.display = 'none';
                        }
                        document.getElementById('masscurrentnumber').textContent = String(parseInt(document.getElementById('masscurrentnumber').textContent) +1);

                        document.getElementById('massresultsp').textContent = '';

                        var fieldTo = document.getElementById('massmrulername');
                        var fieldSubject = document.getElementById('massmsubject');
                        var fieldMessage = document.getElementById('massmmessage');

                        if (totalReceipients.options.length == 0) {
                                    mmerrors=0;
                                    mmsending = false;
                                    mmresults = '';
                                    document.getElementById('massfrmstatus').style.display = 'none';
                                    alert('Finished');
                                    return false;
                        }
                        target = players.Players[totalReceipients[mmerrors].value];
                        fieldTo.value = target.playerName;

EVO_debug('Sending message with the following info: \nTo: ' + target.playerName +
            '\nSubject: ' + fieldSubject.value + '\nMessage: ' + fieldMessage.value);

                        sendMessage(target, fieldSubject.value, fieldMessage.value, messageoptions);
                        window.setTimeout(function() { checkSending() }, 1000);

            }
}



function createStatusWindow(title, content, css, buttons, windimensions) {

            this.title = title;
            this.content = content;
            this.css = css;
            this.buttons = buttons;
            this.windimensions = windimensions;

            var frmStatusdiv = document.createElement('div');
            
            var frmStatuscontentdiv = document.createElement('div');
            frmStatuscontentdiv.innerHTML = content;
            var frmStatusbuttonsdiv = document.createElement('div');
            return this;
}

function masspmdiv(divtype) {
            if (!divtype) divtype = 'mail';
            var statusdiv = document.createElement('div');
            var statustable = document.createElement('table');
            var statusimg = document.createElement('img');
            var statusmsg = '';
            var statusbutton = document.createElement('input');

            statusimg.border = 0;
            statusimg.style.width = "50%";
            statusimg.style.height = "50%";
            statustable.insertRow(statustable.rows.length);
            statustable.rows[0].insertCell(0);
            statustable.rows[0].cells[0].style.width = "60px";
            statustable.rows[0].insertCell(1);
            statustable.insertRow(statustable.rows.length);
            statustable.rows[1].insertCell(0);
            statustable.rows[1].cells[0].setAttribute('colspan','2');
            statustable.rows[1].cells[0].setAttribute('align', 'center');

            statustable.rows[0].cells[0].appendChild(statusimg);

            if (divtype == 'mail') {
                        statusimg.src = "http://img137.imageshack.us/img137/2928/massmail1hm1.gif";
                        statusmsg = '<p id="massprogressp" style="color: black">Sending message ' +
                                                '<span id="masscurrentnumber"></span>' +
                                                ' out of ' +
                                                '<span id="masstotalnumber"></span>' +
                                                ' total messages.</p>';
            } else if (divtype == 'buddy') {
                        statusimg.src = "http://img137.imageshack.us/img137/2928/massmail1hm1.gif"
                        statusmsg = '<p id="massprogressp" style="color: black">Adding ' +
                                                '<span id="masscurrentnumber"></span>' +
                                                ' out of ' +
                                                '<span id="masstotalnumber"></span>' +
                                                ' selected players.</p>';
            }

            statusmsg += '<p id="massresultsp"></p>';

            statustable.rows[0].cells[1].innerHTML = statusmsg;
            statusbutton.setAttribute('type', 'button');
            statusbutton.value = "Cancel";
            statusbutton.style.background = '#a0a0a0';
            statusbutton.style.color = 'black';

            statustable.border = 0;
            statustable.style.width = "100%";
            statustable.style.height = "100%";
            statusdiv.appendChild(statustable);
            statustable.rows[1].cells[0].setAttribute('colspan',2);
            statustable.rows[1].cells[0].appendChild(statusbutton);
            statusdiv.setAttribute('id', 'massfrmstatus');
            statusdiv.style.position = 'absolute';
            statusdiv.style.opacity = .95;
            statusdiv.style.display = 'block';
            statusdiv.style.background = 'white';
            statusdiv.style.color = 'black';
            statusdiv.style.width = "400px";
            statusdiv.style.height = "120px";

            var frmstatuspos = findPos(document.getElementById('massmessaging'));
            statusdiv.style.top = String(frmstatuspos[1] + 50) + "px";
            statusdiv.style.left = String(frmstatuspos[0] + 100) + "px";

            document.body.appendChild(statusdiv);

            statusbutton.addEventListener('click', function() {
                                                            if(confirm("Are you sure you want to cancel the procedure?")) {
                                                                        mmcancel = true;
                                                                        buddyCancel = true;
                                                            } 
                                                            }, false);
}


function showFiltered(filter,selectnode) {

            if (!selectnode) { selectnode = document.getElementById('list1') }
            selectnode.options.length=0;
            var filtercount = document.getElementById('totalplayers');
            filtercount.textContent = '0';
            if (filter == 'All') {
                        for (var i = 0; i < players.Players.length; i++) {
                                    addOption(selectnode, players.Players[i].playerName, players.Players[i].id, filtercount);
                        }
            } else {
                        var filtered = players.listByRankID(filter);
                        for (var i = 0; i < filtered.length; i++) {
                                    addOption(selectnode, filtered[i].playerName, filtered[i].id, filtercount);
                        }
            }
/*
            if (selectnode.id = 'list1') {
                        document.getElementById('totalplayers').textContent = selectnode.options.length;
            } else {
                        document.getElementById('totalreceipients').textContent = selectnode.options.length;
            }
*/
}


function addOption(theSel, theText, theValue, countingdiv)
{
            var newOpt = new Option(theText, theValue);
            var selLength = theSel.length;
            theSel.options[selLength] = newOpt;
            countingdiv.textContent = String(parseInt(countingdiv.textContent)+1);
}

function deleteOption(theSel, theIndex, countingdiv)
{ 
            var selLength = theSel.length;
            if(selLength>0)
            {
                        theSel.options[theIndex] = null;
                        countingdiv.textContent = String(parseInt(countingdiv.textContent)-1);
            }
}

function moveOptions(theSelFrom, theSelTo, countingdivfrom, countingdivto)
{
 
            var selLength = theSelFrom.length;
            var selectedText = new Array();
            var selectedValues = new Array();
            var selectedCount = 0;
            
            var i;
            
            // Find the selected Options in reverse order
            // and delete them from the 'from' Select.
            for(i=selLength-1; i>=0; i--)
            {
                        if(theSelFrom.options[i].selected)
                        {
                                    selectedText[selectedCount] = theSelFrom.options[i].text;
                                    selectedValues[selectedCount] = theSelFrom.options[i].value;
                                    deleteOption(theSelFrom, i, countingdivfrom);
                                    selectedCount++;
                        }
            }

            // Add the selected text/values in reverse order.
            // This will add the Options to the 'to' Select
            // in the same order as they were in the 'from' Select.
            for(i=selectedCount-1; i>=0; i--)
            {
                        addOption(theSelTo, selectedText[i], selectedValues[i], countingdivto);
            }
}



function add2list(e) {

            var statusAdd;
            if (e.target.id == 'massmailadditem') { statusAdd = true } else { statusAdd = false }
            if (statusAdd) {
                        var source = document.getElementById('list1');
                        var target = document.getElementById('list2');
                        if (source.selectedIndex == -1) {
                                    if (confirm('You have not selected any item from the list. Do you want me to transfer the entire list?')) {
                                                for(var countSelections=source.options.length-1; countSelections>=0; countSelections--) {
                                                            source.options[countSelections].selected = true;
                                                }
                                    } else {
                                                alert('You have not selected any item from the list.');
                                                return false;
                                    }
                        }
                        var countingdivfrom = document.getElementById('totalplayers');
                        var countingdivto = document.getElementById('totalreceipients');
                        moveOptions(source, target, countingdivfrom, countingdivto);
                        var maxSource = source.length;
                        var maxTarget = target.length;

//                      document.getElementById('totalplayers').textContent = maxSource;
//                      document.getElementById('totalreceipients').textContent = maxTarget;
            } else {
                        var source = document.getElementById('list2');
                        var target = document.getElementById('list1');

                        if (source.selectedIndex == -1) {
                                    for(var countSelections=maxSource-1; countSelections>=0; countSelections--) {
                                                source.options[countSelections].selected = true;
                                    }
                        }
                        var countingdivfrom = document.getElementById('totalreceipients');
                        var countingdivto = document.getElementById('totalplayers');
                        moveOptions(source, target);
                        var maxSource = source.length;
                        var maxTarget = target.length;

//                      document.getElementById('totalplayers').textContent = maxTarget;
//                      document.getElementById('totalreceipients').textContent = maxSource;
            }

}



// sending of message finished


function findPos(obj) {
            var curleft = curtop = 0;
            if (obj.offsetParent) {
                        curleft = obj.offsetLeft
                        curtop = obj.offsetTop
                        while (obj = obj.offsetParent) {
                                    curleft += obj.offsetLeft
                                    curtop += obj.offsetTop
                        }
            }
            return [curleft,curtop];
}


// Section for the Mass Messaging system

function createMassMessagePanel(e, sourceitem) {

//var sending = false;
//var results = '';
var frmstatus;



            function beginAddingBuddies() {
EVO_debug('Beginning to add to buddies list');
var tmpbody = document.getElementById('massmmessage');
                        if (!confirm("Are you sure you want to begin adding to the buddies list?")) {     //\n" + encodeURIComponent(tmpbody.value))) {
                                    return false;
                        }
                        
                        var totalReceipients = document.getElementById('list2');
                        
                        if (totalReceipients.options.length == 0) {
                                    alert('The receipient list is empty. Please add some receipients and try again.');
                                    return false;
                        }

//                      var frmStatus = document.getElementById('massfrmstatus');
                        frmstatus.style.display = 'block';

                        target = players.Players[totalReceipients[0].value];

                        var curno = document.getElementById('masscurrentnumber');
                        var totalno = document.getElementById('masstotalnumber');
                        curno.textContent = 1;
                        totalno.textContent = totalReceipients.options.length;

                        addBuddy(target);
                        
                        window.setTimeout(function() { checkBuddyAdding() }, 1000);
                        
            }


            function beginMassMailing() {
EVO_debug('Beginning to send mass pms');
var tmpbody = document.getElementById('massmmessage');
                        if (!confirm("Are you sure you want to begin the mass sending of pms?")) {     //\n" + encodeURIComponent(tmpbody.value))) {
                                    return false;
                        }
                        
                        var totalReceipients = document.getElementById('list2');
                        var fieldTo = document.getElementById('massmrulername');
                        var fieldSubject = document.getElementById('massmsubject');
                        var fieldMessage = document.getElementById('massmmessage');
                        
                        if (totalReceipients.options.length == 0) {
                                    alert('The receipient list is empty. Please add some receipients and try again.');
                                    return false;
                        } else if (String(fieldMessage.value).length = 0) {
                                    alert('There is no message filled in the appropriate field. Please write your message and try again.');
                                    return false;
                        }
//                      var frmStatus = document.getElementById('massfrmstatus');
                        frmstatus.style.display = 'block';

                        target = players.Players[totalReceipients[0].value];
                        fieldTo.value = target.playerName;
                        
                        var curno = document.getElementById('masscurrentnumber');
                        var totalno = document.getElementById('masstotalnumber');
                        curno.textContent = 1;
                        totalno.textContent = totalReceipients.options.length;


/*
 Testing the mOptions object
*/
                        messageoptions.processTerms[messageoptions.processTerms.length] = new Array('+', '&#43;', 'g');
                        messageoptions.processTerms[messageoptions.processTerms.length] = new Array('<%signature%>', '<hr>Warm regards,<br><br>Mindfox', 'g');
                        messageoptions.processTerms[messageoptions.processTerms.length] = new Array('<%SIGNATURE%>', '<hr>Warm regards,<br><br>Mindfox', 'g');
                        messageoptions.processBody = true;

                        sendMessage(target, fieldSubject.value, fieldMessage.value, messageoptions);
                        
                        window.setTimeout(function() { checkSending() }, 1000);
                        
            }




            if (!document.getElementById('massmessaging')) {
                        var quickpmpar = document.getElementById('content');
                        var quickpm = document.createElement('DIV');

                        quickpm.id = 'massmessaging';
                        quickpm.style.background = "black";
                        quickpm.style.opacity= .95;
                        quickpm.innerHTML = '<form name="massmail" id="massmail" method="post">' + 
                        '<table width="100%">' +
                                    '<tr>' +
                                                '<td><strong>To:</strong></td>' +
                                                '<td><input type="text" name="rulername" id="massmrulername" style="width: 100%;" /></td>' +
                                    '<td rowspan="4" width="15">&nbsp;</td>' +
                                                '<td>&nbsp;</td>' +
                                                '<td>&nbsp;</td>' +
                                                '<td>&nbsp;</td>' +
                                    '</tr>' + //<td> rowspan="4">' + 
                                    '<tr>' +
                                                '<td><strong>Subject:</strong></td>' +
                                                '<td><input type="text" id="massmsubject" name="message" style="width: 100%;" /></td>' +
                                                '<td>Players (<span id="totalplayers">0</span>)</td>' + //<br />' +
                                                '<td>&nbsp;</td>' +
                                                '<td>Receipients (<span id="totalreceipients">0</span>)</td>' +
                                    '</tr>' +
                                    '<tr>' +
                                                '<td style="vertical-align: top;"><strong>Message:</strong></td>' +
                                                '<td><textarea id="massmmessage" rows="10" cols="50" style="width: 100%;"></textarea></td>' + //</tr>' +
                                                '<td><select name="playerlist" id="list1" size="13" multiple="multiple">' +
                                                            '</select></td>' +
                                                '<td style="vertical-align: middle;"><input align="center" id="massmailadditem" type="button" value=" --> " />' +
                                                            '<br /><input align="center" id="massmailremoveitem" type="button" value=" <-- " /></td>' +
                                                '<td><select name="receipientlist" id="list2" size="13" style="width:199px" multiple="multiple">' +
                                                '</select></td>' + //</div>' +
                                    '</tr>' +
                                    '<tr>' +
                                                '<td>&nbsp;</td>' +
                                                '<td align="center"><input type="submit" value="Send Messages" /> <input type="button" onclick="document.getElementById(\'massmessaging\').style.display=\'none\';" value="Close Panel" />' +
                                                '<td>Filter:<select style="width: 100;" name="listfilter" id="lstfilter">' + //onchange="alert(\'You selected \' + this.options[this.selectedIndex].value);">' +
                                                            '<option value="All">All</option>' +
                                                            '</select></td>' +
                                                '<td>&nbsp;</td>' +
                                                '<td align="center"><input type="button" id="clearReceipients" value="Clear" />' +
                                                '&nbsp;<input type="button" id="addbuddies" value="Add to Buddies" />' +
                                    '</tr>' +
                        '</table></form>';


                        quickpm.style.position= "absolute";
                        quickpm.style.display = "block";


                        var quickpmpos = findPos(quickpmpar);

                        quickpm.style.top = quickpmpos[1].toString() + "px";
                        quickpm.style.left = quickpmpos[0].toString() + "px";


                        document.body.appendChild(quickpm);
                        masspmdiv();
                        frmstatus = document.getElementById('massfrmstatus');
                        frmstatus.style.display = 'none';

                        var sourcelist = document.getElementById('list1');
                        var receipientlist = document.getElementById('list2');
                        var totalpl = document.getElementById('totalplayers');
                        var mailform = document.getElementById('massmail');
                        var mailformfilter = document.getElementById('lstfilter');

                        var strFilters = xpath(".//h3", contents, false);

                    for( i = 0; strFilter = strFilters.snapshotItem(i); i++ ) {
                                    var filtertext = strFilter.textContent;
                                    addOption(mailformfilter, filtertext, i, document.getElementById('totalplayers'));
                        }

                        mailform.elements[1].focus();

                        totalpl.textContent = sourcelist.length;

                        var frmMasspm = document.getElementById('massmail');

                        var frmAddbutton = document.getElementById('massmailadditem');
                        var frmRemovebutton = document.getElementById('massmailremoveitem');
                        var frmClearReceipientsButton = document.getElementById('clearReceipients');
                        var frmFilterOption = document.getElementById('lstfilter');
                        var frmAddBuddyButton = document.getElementById('addbuddies');

                        frmAddbutton.addEventListener('click', add2list, false);
                        frmRemovebutton.addEventListener('click', add2list, false);
                        mailform.addEventListener('submit', function(e) {
                                                                        e.stopPropagation( );
                                                                        e.preventDefault( );
                                                                        beginMassMailing()
                                                            }, false);
                        frmFilterOption.addEventListener('change', function(e) { showFiltered(e.target.value.toString()); }, false); //Event

var clearReceipients = function(e) {
            try {
                        document.getElementById('list2').options.length = 0;
                        document.getElementById('totalreceipients').textContent = 0;
                        showFiltered(document.getElementById('lstfilter').value); 
            }
            catch (Exception) {
                        alert(Exception.toString());
            }

}

                        frmClearReceipientsButton.addEventListener('click', clearReceipients, false);
                        frmAddBuddyButton.addEventListener('click', function(e) { beginAddingBuddies(); }, false);

EVO_debug('Adding Member list items');
                        showFiltered("All");
            } else {
                        quickpm = document.getElementById('massmessaging');
                        if (quickpm.style.display == "block") {
                                    quickpm.style.display = "none";
                        } else {
                                    quickpm.style.display = "";
                        }
            }
//          return this;
}






// ***************************************************************************
// ** Helper functions
// ***************************************************************************

function gcf(a,b){while(b!=0){t=a%b;a=b;b=t}return a;}

function evoLayoutChanged() {
            alert('Oops.. Page layout was not recognized, Neon probably changed the page :(');
}

function evoNumber2String(num) {
            var re = /(\d+)(\d{3})/g;

            num = String(num);
            var decimalIdx = num.indexOf('.');
            var part1 = '1', part2="";
            if( decimalIdx != -1 ) {
                        part1 = num.substring(0, decimalIdx);
                        part2 = num.substring(decimalIdx + 1, num.length);
            }
            else
                        part1 = num;

            while( re.test(part1) )
                        part1 = part1.replace(re, '$1,$2');

            return part2 == "" ? part1 : part1 + "." + part2;
}

function evoString2Number(num) {
            return Number(num.replace(/,/g,''));
}

function evoFormatNumberZ(num, zeros) {
            var str = "0000" + Math.floor(Math.abs(num));
            return str.substr(-zeros);
}
//

// ***************************************************************************
// ** Objects
// ***************************************************************************
EVO_debug("ENTER setup objects",499);


//evoPlayer Collection

var evoPlayers = function () { // player lists
            this.Players = new Array();
            return this;
}

evoPlayers.prototype.addPlayer = function (player) {
            this.Players[this.Players.length] = player;
}

evoPlayers.prototype.list = function () {
            return this.Players;
}

evoPlayers.prototype.listByRankID = function (rankId) {
            var filteredPlayers = new Array();
            var counting = 0;
//EVO_debug('Called the listByRankID function, with rankId = ' + rankId);
            for (var i = 0; i < this.Players.length; i++) {
                        if (this.Players[i].rankID == rankId) {
                                    filteredPlayers[counting] = this.Players[i];
//EVO_debug(rankId + ': ' + filteredPlayers[counting].playerName + ' :: ' + filteredPlayers[counting].rankID);
                                    counting++;
                        }
            }
//EVO_debug('Returned ' + filteredPlayers.length + ' out of ' + this.Players.length + ' total players.');
            return filteredPlayers;
}

evoPlayers.prototype.listByRankName = function (rankName) {
            var filteredPlayers = new Array();
            var counting = 0;
alert(this.Players.length);
            for (var i = 0; i <= this.Players.length; i++) {
                        if (this.Players[i].rankName == rankName) {
                                    filteredPlayers[counting] = this.Players[i];
                                    counting++;
                        }
            }
EVO_debug('Returned ' + filteredPlayers.length + ' out of ' + this.Players[i].length + ' total players.');
            return filteredPlayers;
}

var players = new evoPlayers();

//evoPlayer
function evoPlayer(id, playerName, coordinates, land, score, rankID, rankName, alliances, unirank, primaryAllianceTag, isBuddy) {
        var __plname = playerName.toString().split(' of ');
            var _plcont = __plname[__plname.length-1];
            __plname.pop();
//          __plname.length = __plname.length-1;
            var _plname = __plname.join(' of ');
            var getCoords = new Array();

            this.playerName = playerName;
            this.UserName = _plname;
            this.continentName = _plcont;
            this.coordinates = coordinates;
            this.land = land;
            this.score = score;
            this.alliances = alliances; //
            this.unirank = parseInt(unirank);
            this.rankID = rankID;
            this.rankName = rankName;
            this.isBuddy = isBuddy;
            this.getCoords = getCoords;
            this.getCoords['dimension'] = this.coordinates.toString().split(',')[0];
            this.getCoords['galaxy'] = this.coordinates.toString().split(',')[1];
            this.getCoords['planet'] = this.coordinates.toString().split(',')[2];
            this.getCoords['continent'] = this.coordinates.toString().split(':')[1];
            this.id = id;
            this.primaryAllianceTag = primaryAllianceTag;
            return this;
}


// evoUnit
function evoUnit(unitName, unitType, ticks, metal, mineral, attack, defense, intel, weight, attdefMult, defdefMult) {
        this.unitName = unitName;
        this.unitType = unitType;
        this.defense = defense;
        this.attack = attack;
        this.metal = metal;
        this.ticks = ticks;
        this.intel = intel;
        this.weight = weight;
        this.mineral = mineral;
        this.attdefMult = attdefMult;            //defence multiplier while attacking
        this.defdefMult = defdefMult;           //defence multiplier while defending
        return this;
}

evoUnit.prototype.getFoodCost = function(count) {
    return (this.unitType!=UT_NONE) ? count*(this.mineral+this.metal)/100 : 0;
}

evoUnit.prototype.getAttackScore = function(count) {
            return count * this.attack * this.attack;
}

evoUnit.prototype.getAttDefScore = function(count) {
            //Changed to reflect correct formula, Thanks to Mefisto
            return count * this.defense * this.defense * this.attdefMult;
}

evoUnit.prototype.getDefDefScore = function(count) {
            //Changed to reflect correct formula, Thanks to Mefisto
            return count * this.defense * this.defense * this.attdefMult * this.defdefMult;
}

evoUnit.prototype.getMetalCost = function(count) {
            // Check for Efficient Breeding center and apply discount if available
    if (evoGetCookie("userTech","0:0:0:0:0:0:0:0").split(":")[ET_EBC]*true && this.unitType == UT_NATURAL) {
                        return this.metal*(1-EBCdiscount) * count;
            } else {
                        return this.metal * count;
            }
}

evoUnit.prototype.getMineralCost = function(count) {
            // Check for Efficient Breeding center and apply discount if available
    if (evoGetCookie("userTech","0:0:0:0:0:0:0:0").split(":")[ET_EBC]*true && this.unitType == UT_NATURAL) {
                        return this.mineral*(1-EBCdiscount) * count;
            } else {
                        return this.mineral * count;
            }
}

evoUnit.prototype.getMaxUnits = function (metal, mineral) {
            return Math.min(Math.floor(metal / this.getMetalCost(1)), Math.floor(mineral / this.getMineralCost(1)));
}

evoUnit.prototype.getMaxBoost = function() {
            return maxBoosts[this.unitType];
}

evoUnit.prototype.getBoost = function() {
            return boosts[this.unitType];
}


EVO_debug("setup Page Handlers hooks");

//
// Page Handler hooks
function pageHandler(urlRegEx, handler) {
            this.urlRegEx = urlRegEx;
            this.handler = handler;
}
function regPageHandler(urlRegEx, handler) {
            pageHandlers.push(new pageHandler(urlRegEx,  handler));
}

//
// ***************************************************************************
// ** MISC
// ***************************************************************************
EVO_debug("setup cookies");

// GM implementation of cookies :)
function evoSetCookie(name, value, hours) {
        var host = document.location.host.split(".")[0];
        GM_setValue(host+'_cv_' + name, value);
        if (hours == null || hours == undefined) {
          GM_setValue(host+'_cx_' + name, 'none');
        } else {
          var expire = new Date();
          expire.setUTCHours(expire.getUTCHours() + hours);
          GM_setValue(host+'_cx_' + name, expire.toGMTString());
        }
}

function evoGetCookie(name, defValue) {
        var host = document.location.host.split(".")[0];
        var value = GM_getValue(host+'_cv_' + name,defValue);
        var expire = GM_getValue(host+'_cx_' + name);
//EVO_debug("Host: " + host + "\nName: " + name + "\nValue: " + value + "\nExpires: " + expire);
        if( value != null && expire != null ) {
                expire = (expire=='none')?(new Date(Date.now()+60000)):(new Date(expire));
                if( expire.valueOf() >= Date.now() ) return value;
        }
        return defValue;
}

//todo: a function that exports data to an external file or a website.
function evoExportData() {

}

//
// ***************************************************************************
// ** Page handlers
// ***************************************************************************
//
regPageHandler(null,  handleConfig);
function handleConfig() {
  EVO_debug("Begin handleConfig");
  node = document.createElement('DIV');
  node.id="MyDiv";
  node.style.color = "#ff1101";
  node.style.fontSize = "8pt"; node.style.fontWeight = "bold";
  node.style.paddingLeft = "3px"; node.style.paddingTop = "3px";
  node.style.position = "absolute";
  //node.style.left = "270px";
  var userinfo = document.getElementById('userinfocontents');
  var evoConfig = document.getElementById('evoConfig');
  if (!evoConfig) {
    evoConfig = document.createElement('div');
    evoConfig.id='evoConfig';
    evoConfig.style.display='none';
    
    var configText = ""
    configText += "<table border=0><tr><td rowspan=3>"
    configText += "<input type='checkbox' id='ShowStats' value='true'>Show Stats<br>"
    configText += "<input type='checkbox' id='PromptForPurchases' value='true'>Prompt on Submit<br>"
    configText += "<input type='checkbox' id='EnableTimer' value='true'>Enable Launch Reminder<br>"
    configText += "<input type='checkbox' id='resetHistogram' value='true'>Reset Histograms<br>"
    configText += "Natural Boost: <input size=11 id='boostNat'><br>"
    configText += "Genetic Boost: <input size=11 id='boostEng'><br>"
    configText += "</td><td colspan=2>"
    configText += "<input type='checkbox' id='UpdateFromWeb' value='true'>Update From Web<br>"
    configText += "</td></tr><tr><td>"
    configText += "<input type='checkbox' id='hasBGC' value='"+ET_BGC+"'>Basic Genetic Centre<br>"
    configText += "<input type='checkbox' id='hasIGC' value='"+ET_IGC+"'>Intermediate Genetic Centre<br>"
    configText += "<input type='checkbox' id='hasImC' value='"+ET_IMC+"'>Improved Genetic Centre<br>"
    configText += "<input type='checkbox' id='hasAGC' value='"+ET_AGC+"'>Advanced Genetic Centre"
    configText += "</td><td>"
    configText += "<input type='checkbox' id='hasNaP' value='"+ET_NAP+"'>Nanotechnology Plant<br>"
    configText += "<input type='checkbox' id='hasNaW' value='"+ET_NAW+"'>Nanotech Weapons Factory<br>"
    configText += "<input type='checkbox' id='hasSEl' value='"+ET_SEL+"'>Space Elevator<br>"
    configText += "<input type='checkbox' id='hasEBC' value='"+ET_EBC+"'>Efficient breeding"
    configText += "</td></tr>"
    configText += "<tr><td colspan=2>Master URL: <input size=60 id='masterURL'>"
    configText += "<input type='checkbox' id='checkNow' value='false'></td></tr></table>"
    evoConfig.innerHTML = configText;
    userinfo.appendChild(evoConfig);
  }
  var HTML;
  HTML = "<a id='openEvoConfig'>"
  HTML += scriptversionID;
  HTML += "</a>"
  node.innerHTML = HTML;
  node.title = scriptTag;
  panel = document.getElementById('userinfo');
  panel.parentNode.insertBefore(node, panel);
  var anchor = unsafeWindow.document.getElementById('openEvoConfig');
  if (anchor) {
    var SaveTech = function(e) {
      userTech[e.target.value]=1*e.target.checked;
      boosts[UT_NATURAL]=boosts[UT_ENG]=1;
      for (iter = 0; iter < attLevels.length; iter++) {
        boosts[UT_NATURAL]*=(1*userTech[iter])?attLevels[iter][0]:1;
        boosts[UT_ENG]*=(1*userTech[iter])?attLevels[iter][1]:1;
      }
      boosts[UT_NATURAL]=Math.round(100000000*boosts[UT_NATURAL])/100000000;
      boosts[UT_ENG]=Math.round(100000000*boosts[UT_ENG])/100000000;
      var boostNat = unsafeWindow.document.getElementById('boostNat');
      var boostEng = unsafeWindow.document.getElementById('boostEng');
      boostNat.value = boosts[UT_NATURAL];
      boostEng.value = boosts[UT_ENG];
      evoSetCookie("userTech",userTech.join(":"),24*365*20);
      evoSetCookie("boostNat",String(boosts[UT_NATURAL]),24*365*20);
      evoSetCookie("boostEng",String(boosts[UT_ENG]),24*365*20);
    }
    var SaveConfig = function(ev) {
      if (ev.type=="click") {
        evoSetCookie(ev.target.id,ev.target.checked);
      } else if (ev.type=="blur") {
        evoSetCookie(ev.target.id,ev.target.value);
      }
    }
    var doResetHistogram = function(e) {
      var now = new Date();
      var lastScan = now.getTime().toString();
      evoSetCookie("ScanReset",lastScan);
      evoSetCookie("ScansCount","0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
    }
    var doResetMasterURL = function(ev) {
      if (ev.type=="blur") {
        evoSetCookie(ev.target.id,ev.target.value);
      }
      //Expire the nEvoUpToDate cookie
      evoSetCookie('nEvoUpToDate',"",0); 
    }
    var RetrieveConfig = function() {
      var ShowStats = unsafeWindow.document.getElementById('ShowStats');
      ShowStats.addEventListener('click',SaveConfig, false);
      ShowStats.checked = evoGetCookie('ShowStats',true);
      var PromptForPurchases = unsafeWindow.document.getElementById('PromptForPurchases');
      PromptForPurchases.addEventListener('click',SaveConfig, false);
      PromptForPurchases.checked = evoGetCookie('PromptForPurchases',true);
      var EnableTimer = unsafeWindow.document.getElementById('EnableTimer');
      EnableTimer.addEventListener('click',SaveConfig, false);
      EnableTimer.checked = evoGetCookie('EnableTimer',true);
      var UpdateFromWeb = unsafeWindow.document.getElementById('UpdateFromWeb');
      UpdateFromWeb.addEventListener('click',SaveConfig, false);
      UpdateFromWeb.checked = evoGetCookie('UpdateFromWeb',true);
      var resetHistogram = unsafeWindow.document.getElementById('resetHistogram');
      resetHistogram.addEventListener('click', doResetHistogram, false);
      resetHistogram.checked = false;
      
      userTech = evoGetCookie('userTech',"0:0:0:0:0:0:0:0").split(":");
      var hasBGC = unsafeWindow.document.getElementById('hasBGC');
      hasBGC.addEventListener('click',SaveTech, false);
      var hasIGC = unsafeWindow.document.getElementById('hasIGC');
      hasIGC.addEventListener('click',SaveTech, false);
      var hasImC = unsafeWindow.document.getElementById('hasImC');
      hasImC.addEventListener('click',SaveTech, false);
      var hasAGC = unsafeWindow.document.getElementById('hasAGC');
      hasAGC.addEventListener('click',SaveTech, false);
      var hasNaP = unsafeWindow.document.getElementById('hasNaP');
      hasNaP.addEventListener('click',SaveTech, false);
      var hasNaW = unsafeWindow.document.getElementById('hasNaW');
      hasNaW.addEventListener('click',SaveTech, false);
      var hasSEl = unsafeWindow.document.getElementById('hasSEl');
      hasSEl.addEventListener('click',SaveTech, false);
      var hasEBC = unsafeWindow.document.getElementById('hasEBC');
      hasEBC.addEventListener('click',SaveTech, false);
      var boostNat = unsafeWindow.document.getElementById('boostNat');
      boostNat.addEventListener('blur',SaveConfig, false);
      boostNat.value = evoGetCookie('boostNat',maxBoosts[UT_NATURAL]);
      var boostEng = unsafeWindow.document.getElementById('boostEng');
      boostEng.addEventListener('blur',SaveConfig, false);
      boostEng.value = evoGetCookie('boostEng',maxBoosts[UT_ENG]);
      var masterURL = unsafeWindow.document.getElementById('masterURL');
      masterURL.addEventListener('blur',doResetMasterURL, false);
      masterURL.value = evoGetCookie('masterURL','');
      var checkNow = unsafeWindow.document.getElementById('checkNow');
      checkNow.addEventListener('click',doResetMasterURL, false);
      
      hasBGC.checked = userTech[ET_BGC]*true;
      hasIGC.checked = userTech[ET_IGC]*true;
      hasImC.checked = userTech[ET_IMC]*true;
      hasAGC.checked = userTech[ET_AGC]*true;
      hasNaP.checked = userTech[ET_NAP]*true;
      hasNaW.checked = userTech[ET_NAW]*true;
      hasSEl.checked = userTech[ET_SEL]*true;         
      hasEBC.checked = userTech[ET_EBC]*true;
    }
    var openEvoConfig = function() {
      EVO_debug("Begin openMyConfig");
      if (unsafeWindow.blockPanelClicks) {
EVO_debug("Panels are blocked");
        return false;
      }
      if (unsafeWindow.panelOpen == "evoConfig") {
EVO_debug("unsafeWindow.panelOpen: " + unsafeWindow.panelOpen);
        unsafeWindow.closePanels(true);
EVO_debug("closePanels(true)");
      } else {
        RetrieveConfig();
        unsafeWindow.closePanels(false);
        if (unsafeWindow.fx) {
          unsafeWindow.panelOpen = "evoConfig";
          var myconfig = document.getElementById('evoConfig');
          var myEffect = new unsafeWindow.fx.Height(myconfig , {duration:500, onComplete: unsafeWindow.expandCompleted});
          myEffect.custom(myEffect.el.offsetHeight, unsafeWindow.originalPanelSize + 100);
EVO_debug("myEffect.custom");
            } else if (unsafeWindow.Rico.Effect) {
          new unsafeWindow.Rico.Effect.Size('userinfo',null,200,600,10,{complete:function() { document.getElementById('evoConfig').style.display='block'; unsafeWindow.panelOpen = "evoConfig"; }});
EVO_debug("Rico.Effect");
        } else if (unsafeWindow.Effect) {
          new unsafeWindow.Effect.Size('userinfo',null,200,600,10,{complete:function() { document.getElementById('evoConfig').style.display='block'; unsafeWindow.panelOpen = "evoConfig"; }});
EVO_debug("Effect.Size");
        }
      }
      EVO_debug("Exit openMyConfig");
      return false;
    }
    anchor.addEventListener('click', openEvoConfig, false)
  }
}

//
// Add stuff to the R&D pages
//
const RD_RESEARCH = 1;
const RD_DEVELOP = 2;
regPageHandler(/^\/rd\/d/i, function () { checkDevelopment() });
function checkDevelopment() {
	EVO_debug("Begin R&D",399);
	var RnD = document.evaluate(".//div[contains(@class,'title') and starts-with(.,'Completed')]/following-sibling::div",
		contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	EVO_debug("R&D HTML: " + RnD.innerHTML,299);
	if (evoGetCookie("UpdateFromWeb",true)) {
		userTech[ET_BGC] = (RnD.textContent.match(/Basic Genetics? Centre/i))?1:0;
		userTech[ET_IGC] = (RnD.textContent.match(/Intermediate Genetics? Centre/i))?1:0;
		userTech[ET_IMC] = (RnD.textContent.match(/Improved Genetics? Centre/i))?1:0;
		userTech[ET_AGC] = (RnD.textContent.match(/Advanced Genetics? Centre/i))?1:0;
		userTech[ET_NAP] = (RnD.textContent.match(/Nanotechnology Plant/i))?1:0;
		userTech[ET_NAW] = (RnD.textContent.match(/Nanotech Weapons Factory/i))?1:0;
		userTech[ET_SEL] = (RnD.textContent.match(/Space Elevator/i))?1:0;
		userTech[ET_EBC] = (RnD.textContent.match(/Efficient breeding center/i))?1:0;
		
		EVO_debug("Values from R&D: \n" + userTech,299);
		
		boosts[UT_NATURAL]=boosts[UT_ENG]=1;
		for (iter = 0; iter < attLevels.length; iter++) {
			boosts[UT_NATURAL]*=(1*userTech[iter])?attLevels[iter][0]:1;
			boosts[UT_ENG]*=(1*userTech[iter])?attLevels[iter][1]:1;
			}
		boosts[UT_NATURAL]=Math.round(100000000*boosts[UT_NATURAL])/100000000;
		boosts[UT_ENG]=Math.round(100000000*boosts[UT_ENG])/100000000;
		evoSetCookie("userTech",userTech.join(":"),24*365*20);
		evoSetCookie("boostNat",String(boosts[UT_NATURAL]),24*365*20);
		evoSetCookie("boostEng",String(boosts[UT_ENG]),24*365*20);
	}
}
//
// Add stuff to the scans and create pages
//	Command Control/Create
//	Command Control/Scans
//
regPageHandler(/^\/create/i, function () { evoCreate(1); evoCreate(2); evoCreate(3); });
regPageHandler(/^\/scans/i,  function () { evoCreate(1); });
// handle each creation table
function evoCreate(tableID) {
	EVO_debug("ENTER evoCreate",399);
        //
        // event handlers
        //
        // refreshes the max numbers when click on "max" or form field change
        function evoUpdateAvailableUnits(table) {
                var tmpMetal = pMetal;
                var tmpMineral = pMineral;
                var rows = table.rows;
                var row, unit, unitsToOrder, maxUnitsAvailable, span;
        
                // keep data between the two passes
                var createDataArray = new Array();
                function createData(unit, unitsToOrder, isTooMuch) {
                        this.unit = unit;
                        this.unitsToOrder = unitsToOrder;
                        this.isTooMuch = isTooMuch;
                }
        
                // first pass
                //      - gather all necessary data for second pass
                //      - adjust metal/mineral amount
                for(var i = 2; i < (rows.length - 1); i++) {
                        row = rows[i];
                        unit = row.cells[1].getElementsByTagName('SPAN')[0].textContent.toLowerCase();
                        if (!units[unit]) {
							// createDataArray[i] = new createData('Unknown', 0, 0);
						} else {
							unit = units[unit];
							unitsToOrder = Number(row.cells[3].getElementsByTagName('INPUT')[0].value);
							if( isNaN(unitsToOrder) ) unitsToOrder = 0;
							createDataArray[i] = new createData(unit, unitsToOrder, unitsToOrder > unit.getMaxUnits(tmpMetal, tmpMineral));
					        
							if(! createDataArray[i].isTooMuch ) {
									tmpMetal = Math.max(tmpMetal - unit.getMetalCost(unitsToOrder), 0);
									tmpMineral = Math.max(tmpMineral - unit.getMineralCost(unitsToOrder), 0);
							}
						}
                }
                // second pass
                //      - ui logic
                for(var i = 2; i < (rows.length - 1); i++) {
					row = rows[i];
					if (createDataArray[i]) {
                        maxUnitsAvailable = createDataArray[i].unit.getMaxUnits(tmpMetal, tmpMineral);
                        span = row.cells[3].getElementsByTagName('SPAN')[0];
                        // have to replace the data of the child text node
                        // span.textContent = html would recreate the child text node and cancel the onclick event
                        span.firstChild.data = 'max: ' + String(createDataArray[i].isTooMuch ? maxUnitsAvailable : (maxUnitsAvailable + createDataArray[i].unitsToOrder));
                        span.style.color = createDataArray[i].isTooMuch ? 'red' : '#CCCCCC';
					}
                }
        }
        
        var onBlur = function() { evoUpdateAvailableUnits(table); };
        
        var onClick = function(e) {
                if( e.target.tagName.toLowerCase() == 'input' ) return;
                this.getElementsByTagName('input')[0].value = /max: (\d+)/m.exec(this.textContent)[1];
                evoUpdateAvailableUnits(table);
        };
        
        //
        // Helper functions 
        //
        function addHeader(cellIndex, label) {
                var cell = table.rows[0].insertCell(cellIndex);
                cell.innerHTML = label;
                cell.align = "center"; cell.vAlign = "bottom"; cell.width = "60px";
                cell = table.rows[1].insertCell(cellIndex); cell.className = "alt1";
        }
        function addStat(row, cellIndex, base, square, value, boost) {
                var cell = row.insertCell(cellIndex);
                cell.className = row.cells[1].className; cell.align = "center";
                cell.innerHTML = '<span title="Unboosted: ' + base + '">' + (base*boost).toFixed(1)
                        + '</span><br /><span class="t_enormous" title="Unboosted: ' + square + '">' + (square*boost*boost).toFixed(0)
                        + '</span><br /><span title="Unboosted: ' + evoNumber2String(value) + '">' + evoNumber2String((value*boost*boost).toFixed(0)) + '</span>';
        }
        //
        // main
        // 
        var unit, cell, unitCost, row;
        var table = document.evaluate(".//div[contains(@class,'title') and starts-with(.,'Order')]["+tableID+"]/following-sibling::table[1]",
                                                          contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
        if(table == null) return;

        var showstats = document.location.pathname != '/scans' && (tableID == 1 || tableID == 2) && evoGetCookie('ShowStats',true);

        // add creatures/items stats
        if( showstats ) {
                // column headers
                addHeader(4, 'Attack/<br /><strong>Attack<sup>2</sup></strong>/<br /><span title="Att2 per 100,000 resources (metal + mineral)">per 100K</span>');
                addHeader(5, 'Defense/<br /><strong>Defense<sup>2</sup></strong>/<br /><span title="Def2 per 100,000 resources (metal + mineral)">per 100K</span>');
                addHeader(6, 'Total/<br /><strong>Total<sup>2</sup></strong>/<br /><span title="Att2+Def2 per 100,000 resources (metal + mineral)">per 100K</span>');
        }
        // display stats for each item
        for( var i = 2; i < (table.rows.length - 1); i++ ) {
                row = table.rows[i];
                if( showstats ) {
                        unit = (row.cells[1].getElementsByTagName('SPAN'))[0].textContent.toLowerCase();
                        if (units[unit]) {
							unit = units[unit];
                        	unitCost = unit.getMetalCost(1) + unit.getMineralCost(1);
                        	var att2 = unit.getAttackScore(1);
                        	var def2 = unit.getAttDefScore(1);
                        	var average = att2 + def2;
                        	var boost = unit.getBoost();
                        	addStat(row, 4, unit.attack,  att2, Math.round(att2*100000/unitCost), boost);
                        	addStat(row, 5, unit.defense, def2, Math.round(def2*100000/unitCost), boost);
                        	addStat(row, 6, (unit.defense + unit.attack), average, Math.round(average*100000/unitCost), boost);
						} else {
							EVO_debug("Found Unknown Evo Item (" + unit + ")");
						}
                }
                // new UI
                cell = document.createElement('SPAN');
                cell.style.display = "block";
                row.cells[3].style.cursor = "pointer";
                cell.textContent = ' '; // forces the creation of a text node
                row.cells[3].appendChild(cell);
                // update hook
                row.cells[3].getElementsByTagName('INPUT')[0].addEventListener('blur', onBlur, false);
                // order max amount hook
                row.cells[3].addEventListener('click', onClick, false);
        }

        // hook up a confirmation dialog on the form
        var youSure = function(e)
        {
          if (!evoGetCookie('PromptForPurchases',true)) return;
          if(! confirm('Are you sure you want to produce these items/creatures?'))
          e.preventDefault();
        }
        var daForm = table.getElementsByTagName('FORM')[0];
        daForm.addEventListener('submit', youSure, false);

            evoUpdateAvailableUnits(table);
	EVO_debug("EXIT evoCreate",399);
}

//
// changes to the overview page
//	Information/Overview
//
regPageHandler(/^\/(overview)?$/i,  evoOverview);
function evoOverview() {
	EVO_debug("ENTER Information/Overview",399);

	var tick = dEvo ? 5 : 60;
	var i, ticks, total;
	var node, match;
	var now = new Date(document.lastModified);
    now.setUTCMinutes(now.getUTCMinutes() - now.getUTCMinutes() % tick);

    // let's try to grab the player's coords
    node = document.evaluate(".//br[preceding-sibling::span[@class='t_medium b' and text()='Status of continent']]/following-sibling::span",
            document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    if( node != null && (match = node.innerHTML.match(/(\d+),(\d+),(\d+):\w/)) ) {
        evoSetCookie('nEvoCoords', match[0]);
    } else {
        GM_log("Unable to find your coordinates :(", 1);
        GM_log(node.textContent);
    }

    // look for the fleets status table and show the ETA
    node = document.evaluate('.//div[@class="title" and contains(., "Fleets\' status")]/following-sibling::div[1]/table', contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    if( node ) {
            node.rows[0].cells[3].textContent = 'Ticks';
            node.rows[0].insertCell(4);
            node.rows[0].cells[4].textContent = 'ETA';
            // let's parse the ETAs...
            for(i = 1; i < node.rows.length; i++) {
                    if( node.rows[i].cells.length == 4 ) {
                            node.rows[i].insertCell(4);
                            if(! isNaN(ticks = parseInt(node.rows[i].cells[3].textContent)) ) {
                                                        var eta = new Date(now.valueOf() + (ticks * tick * 60000));
                                                        node.rows[i].cells[4].textContent = evoFormatNumberZ(eta.getUTCHours(),2) + ":" + evoFormatNumberZ(eta.getUTCMinutes(),2) + " GMT";
                            }
                    }
            }
    }

        // Same for the R&D
        var nodes = document.evaluate(".//div[@class='alt2 t_little' and preceding-sibling::div[contains(@class,'title') and starts-with(.,'Currently')]]",
                        contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for( i = 0; node = nodes.snapshotItem(i); i++ ) {
                node.innerHTML = node.innerHTML.replace(/(\d+)% \((\d+)\/(\d+) ticks\) complete\./,
                                function(str, p1, p2, p3, offset, s) {
                                                            var minutes = (Number(p3) - Number(p2)) * tick;
                                                            var eta = new Date(now.valueOf() + (minutes * 60000));
                                                            return p1 + '% (' + p2 + '/' + p3 + ' ticks) complete - ETA: ' + evoFormatNumberZ(eta.getUTCHours(),2) + ":" + evoFormatNumberZ(eta.getUTCMinutes(),2) + " GMT" + (minutes > 1440 ? ' (+' + Math.floor(minutes/1440) + ' day' + ( minutes >= 2880 ? 's' : '' ) + ')' : '');
                                });
        }

        // same for the creatures and stuff
        nodes = document.evaluate(".//div[@class='alt2 t_little' and preceding-sibling::div[contains(@class,'title') and text()='Current Production']]/table/tbody/tr[count(td)=3]",
                contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for( i = 0; node = nodes.snapshotItem(i); i++ ) {
                // add a column
                node.insertCell(3);     
                if( match = /\d+% complete, (\d+) ticks remain\./.exec(node.cells[2].textContent) ) {
                                    var eta = new Date(now.valueOf() + (Number(match[1]) * tick * 60000));
                                    node.cells[3].textContent = evoFormatNumberZ(eta.getUTCHours(),2) + ":" + evoFormatNumberZ(eta.getUTCMinutes(),2) + " GMT";
                }
        }
        
        // add a link to the continent/planet
        nodes = document.evaluate(".//td[child::span[@class='t_medium b']]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for( i= 0; node = nodes.snapshotItem(i); i++ )
                node.innerHTML = node.innerHTML.replace(/<span class="t_little".*\((\d+,\d+,\d+)(:\w)?\)<\/span>/i, '<a href="/$1" style="text-decoration:none">$&</a>');

        // attackers - defenders
        if( node = document.evaluate(".//div[@class='alt2 t_little']/center/span[@class='t_little']", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue ) {
                    attackers = new Array();
                    defenders = new Array();
                    var j, first = 24, last = 0;
                    nodes = node.getElementsByTagName('font');
                    for(i=0; i < 24; i++) attackers[i] = defenders[i] = 0;
                    for(i = 0; i < nodes.length; i++ ) {
                                if( match = /Incoming (\d+) creatures .* they will be here to (ATTACK|DEFEND) in (\d+) tick/.exec(nodes[i].innerHTML) ) {
                                            var num = parseInt(match[3]);
                                            if( match[2] == 'ATTACK' ) {
                                                        for(j = num; j < num + 3; j++) attackers[j] += parseInt(match[1]);
                                            } else {
                                                        for(j = num; j < num + 6; j++) defenders[j] += parseInt(match[1]);
                                            }
                                            if( j > last ) last = j;
                                            if( num < first ) first = num;
                                } else if( match = /(\d+) creatures (DEFENDING|ATTACKING) .* - (\d+) tick/.exec(nodes[i].innerHTML) ) {
                                            var num = match[3];
                                            if( match[2] == 'ATTACKING' ) {
                                                        for(j = 0; j < num; j++) attackers[j] += parseInt(match[1]);
                                            } else {
                                                        for(j = 0; j < num; j++) defenders[j] += parseInt(match[1]);
                                            }
                                            if( num > last ) last = num;
                                            first = 0;
                                }
                    }
                    var table = document.createElement('table');
                    table.className = 't_little';
                    table.cellSpacing = 1;
                    var rowT = table.insertRow(table.rows.length);
                    var rowA = table.insertRow(table.rows.length);
                    var rowD = table.insertRow(table.rows.length);
                    var cell;
                    rowT.innerHTML = "<td class=\"row1 b\">Tick</td>";
                    rowA.innerHTML = "<td class=\"row1 b\">Attackers</td>";
                    rowD.innerHTML = "<td class=\"row1 b\">Defenders</td>";
                    for( i = first; i < last; i++ ) {
                                (cell = rowT.insertCell(rowT.cells.length)).textContent = i; cell.style.textAlign = "center"; cell.style.padding = "0 2px 0 2px";
                                (cell = rowA.insertCell(rowA.cells.length)).textContent = attackers[i]; cell.style.textAlign = "center"; cell.style.padding = "0 2px 0 2px";
                                (cell = rowD.insertCell(rowD.cells.length)).textContent = defenders[i]; cell.style.textAlign = "center"; cell.style.padding = "0 2px 0 2px";
                    }
                    node.parentNode.insertBefore(table, node.nextSibling);
        }
        
    //
	// Unallocated land percentage
	//

	var landtable = document.evaluate(".//div[@id='cland']/div[@class='alt2']/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	
	var alloc = evoString2Number(landtable.rows[1].cells[1].textContent)+evoString2Number(landtable.rows[2].cells[0].textContent)+evoString2Number(landtable.rows[2].cells[1].textContent);
	var l_min = evoString2Number(landtable.rows[2].cells[1].textContent);
	var l_food = evoString2Number(landtable.rows[1].cells[1].textContent);
	var l_met = evoString2Number(landtable.rows[2].cells[0].textContent);
	var total = alloc+ evoString2Number(landtable.rows[1].cells[0].textContent);
	var metal_per_alloc = Math.round(l_met*100/alloc);
	var mineral_per_alloc = Math.round(l_min*100/alloc);
	var food_per_alloc = Math.round(l_food*100/alloc);
	
	var per = Math.round(( total - alloc ) * 100 / total );
	
	var stMet = "<td style=\"background: #1598FD; height: "+Math.round(50-per*0.5)+"px ;width: "+Math.round(metal_per_alloc*0.5)+"px;\"></td>";
	var stMin = "<td style=\"background: #29D900; height: "+Math.round(50-per*0.5)+"px ;width: "+Math.round(mineral_per_alloc*0.5)+"px;\"></td>";
	var stFood = "<td style=\"background: #FD9315; height: "+Math.round(50-per*0.5)+"px ;width: "+Math.round(food_per_alloc*0.5)+"px;\"></td>";
	landtable.rows[0].cells[1].innerHTML = "<center><div style=\"border: 1px solid rgb(201, 201, 201); float: top; width: 50px; height: 50px;\"><table style=\"background: #C9C9C9; height: "+per+"%; width: 50px;\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr style=\"height : "+Math.round(per*0.5)+"px;\"><td></td></tr><tr>"+stMet+stMin+stFood+"</tr></tbody></table></div></center>"

	var elm = document.createElement('DIV');
	elm.className = 'separator title';
	elm.innerHTML = 'You currently have ' + per + '% Unallocated Land'; 
	landtable.parentNode.appendChild(elm);
	
	//
	// Fleet table
	//
	var cfleettable = document.evaluate(".//div[@id='ccreat']/div[@class='alt2']/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var lfcost = 0, lfpercent = 0;
	for( i = 0; i < cfleettable.rows.length; i++ ) {
		unit = cfleettable.rows[i].cells[0].innerHTML.toLowerCase();
		if( unit != '' ) lfcost = lfcost + evoString2Number(cfleettable.rows[i].cells[1].textContent) * ( (units[unit].metal + units[unit].mineral ) / 100 );
		if( cfleettable.rows[i].cells.length > 2 ) {
			unit = cfleettable.rows[i].cells[2].innerHTML.toLowerCase();
			if( unit != '' ) lfcost = lfcost + evoString2Number(cfleettable.rows[i].cells[3].textContent) * ( (units[unit].metal + units[unit].mineral ) / 100 );
		}
	}
	if(GM_getValue('evo_SE',"no") == "yes") lfcost = lfcost * 0.95;
	var f1 = evoString2Number( cfleettable.rows[0].cells[1].textContent );
	var lastline = document.createElement('DIV');
	var cfp = 24 * ( 800 + l_food * 200 );
	var dif = Math.round( ( lfcost - cfp ) / 4800 + 0.5 );
	var launchratio = 0;
	if( lfcost != 0 ) lfpercent = Math.round(( cfp / lfcost ) * 100 )
	var conc = 'Your food allocation is over your daily needs by '+Math.abs(dif)+' land(s).';
	if( dif > 0 ) conc = '<span style="color: red">You should allocate '+dif+' more food land!</span>';
	lastline.className = 'separator title';
	lastline.innerHTML = 'Food Production / Launch Cost : ' + evoNumber2String(Math.round(cfp)) + ' / ' + evoNumber2String(Math.round(lfcost)) + '<br />You can launch '+ lfpercent + '% of all of your creatures per day.<br />' + conc; 
	cfleettable.parentNode.appendChild(lastline);
	
	//
	// Defences
	//
	var staticDefense = document.evaluate(".//div[@id='cdef']/div[@class='alt2']/table", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var attack, defense, nDef, overallDefense = 0, overallAttack = 0;
	
	for( i = 0; i < staticDefense.rows.length; i++ ){
		for( j = 0; j < staticDefense.rows[i].cells.length; j += 2 ){
			defenseType = staticDefense.rows[i].cells[j].textContent.toLowerCase();
			nDef = parseInt(staticDefense.rows[i].cells[j+1].textContent);
			unit = units[defenseType];
			attack = unit.getAttackScore(nDef);
			defense = unit.getDefenseScore(nDef) * defendersBoost;
			staticDefense.rows[i].cells[j+1].title = 'Individual att2/def2 score: ' + evoNumber2String(attack.toFixed(0)) + ' / ' + evoNumber2String(defense.toFixed(0));
			overallAttack += attack;
			overallDefense += defense;
		}
	}
	var thecell = document.createElement('DIV');
	thecell.className = 'separator title';
	thecell.innerHTML = "Total Att&sup2;: " + evoNumber2String(overallAttack.toFixed(0)) + "<br /> Total Def&sup2;: " + evoNumber2String(overallDefense.toFixed(0));
	staticDefense.parentNode.appendChild(thecell);

	EVO_debug("EXIT Information/Overview",399);
}

//
// restores the land cost display on the resources page
//	Expansion/Resources
//
regPageHandler(/^\/resources\/overview/i,  evoResources);
function evoResources() {
	EVO_debug("ENTER Expansion/Resources",399);

	var resourcetable = document.evaluate(".//div[contains(@class,'title') and starts-with(.,'Land')]/following-sibling::table[contains(.,'Unused Land')]",
		document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
        
    //kcsevoLandRatio();
            
    if( resourcetable ) {
		EVO_debug("Found Resource Table",299);        
        evoLandRatio();

		// Max land that can be allocated	
		// Layout check
		if( resourcetable.rows[0].cells[0].innerHTML == 'Unused Land' ) var z = 1; else var z = 0;
		// get current amount of allocated
		var land = evoString2Number(resourcetable.rows[1+z].cells[1].textContent) + evoString2Number(resourcetable.rows[2+z].cells[1].textContent) + evoString2Number(resourcetable.rows[3+z].cells[1].textContent);

		var totcost = 0;
		var nbr =0; var qrty=0;

		while( totcost < pMetal ) {
			qrty++;
			totcost += ((( land -1 ) * 150 ) + 1000 + ( qrty * 150 ));
			if(totcost < pMetal) { nbr++; }
		}
		
		// We need to have unallocated land
		if( z == 1 ) {
			unallocland = resourcetable.rows[0].cells[1].textContent;
			if( unallocland < nbr ) nbr = unallocland;
		}else{
			nbr = 0;
		}

		// Add the text
		var newRow = resourcetable.insertRow(resourcetable.rows.length);
		newCell = newRow.insertCell(0);
		newCell.colSpan = '5';
		newCell.className = 'alt1 b';
		newCell.textContent = (nbr == 0) ? 'You cannot currently allocate any land' :'You can currently allocate a maximum of '+nbr+' land';
		newCell.style.textAlign ='center';
        
        // do we have the graphic?
        if( resourcetable.rows[0].cells[0].innerHTML == 'Unused Land' ) return;
          
        // get current amount of allocated
        var land = evoString2Number(resourcetable.rows[1].cells[1].innerHTML) + evoString2Number(resourcetable.rows[2].cells[1].innerHTML) + evoString2Number(resourcetable.rows[3].cells[1].innerHTML);

        // onclick function....
        showAllocCost = function(e) {
            var parent = this.parentNode;
            this.style.cursor = 'auto';
            this.style.textDecoration = "none";
            if( parent.nextSibling != null ) return;
            parent = parent.parentNode;
            var elm = document.createElement('IMG');
            elm.src = 'http://ev5.neondragon.net/graphs/land.php?land=' + land;
            parent.appendChild(elm);
            elm = document.createElement('BR');
            parent.appendChild(elm);
            elm = document.createElement('SPAN');
            elm.className = 't_little';
            elm.innerHTML = '<SPAN class="red">Red</SPAN> values are the costs in metal to initiate the number of land on the x axis.';
            parent.appendChild(elm);
        };

        var elm = document.createElement('DIV');
        var span = document.createElement('SPAN');
        elm.className = "title";
        span.innerHTML = 'Land Initiation Cost';
        span.style.textDecoration = "underline";
        span.style.cursor = "pointer";
        span.addEventListener('click',showAllocCost, false);
        elm.appendChild(span);
        resourcetable.parentNode.appendChild(elm);
    }
        
    function evoLandRatio() {
		EVO_debug("ENTER evoLandRatio",299);
        var fields = resourcetable.rows.length;
        var food = resourcetable.rows[fields - 1].cells[1].textContent.split(",").join("");
        var mineral = resourcetable.rows[fields - 2].cells[1].textContent.split(",").join("");
        var metal = resourcetable.rows[fields - 3].cells[1].textContent.split(",").join("");
        if (fields>4) {
                                    var unalloc = resourcetable.rows[fields - 5].cells[1].textContent.split(",").join("");
        } else unalloc=0;
        var gcd = gcf(gcf(metal,mineral),food);
        var landRatio = Math.round(10000*unalloc/(unalloc*1+metal*1+mineral*1+food*1))/100;
        metal = metal / gcd;
        mineral = mineral / gcd;
        food = food / gcd;
        var row = resourcetable.insertRow(fields);
        row.className = 'row2';
        node = row.insertCell(0);
        node.innerHTML = 'Ratio';
        node.className = 'alt1 b';
        node.style.textAlign = 'right';
        node = row.insertCell(1);
        node.colSpan = 2;
        node.innerHTML = metal + ':' + mineral + ':' + food + " - " + landRatio + "% Unallocated";
        node.style.textAlign = 'left';
        // give approx. ratio with: 1 <= food <= 2
        if( food > 2 && food < metal && food < mineral ) {
                    gcd = Math.pow(2, Math.floor(Math.log(food) / Math.log(2))) // divider
                    gcd = food / (food = Math.round(food / gcd)); // refine the divider
                    metal = Math.round(metal / gcd);
                    mineral = Math.round(mineral / gcd);
                    gcd = gcf(gcf(metal,mineral),food);
                    food /= gcd;
                    mineral /= gcd;
                    metal /= gcd;
                    node = row.insertCell(2);
                    node.innerHTML = '(~' + metal + ':' + mineral + ':' + food + ')';
                    node.style.textAlign = 'center';
                    node = row.insertCell(3);
                    node.colSpan = 1;
        } else {
                    node = row.insertCell(2);
                    node.colSpan = 2;
        }
		EVO_debug("EXIT evoLandRatio",299);
    }
    
	EVO_debug("EXIT Expansion/Resources",399);
}

//
// Alliances page
//	Communication/Alliances
//
regPageHandler(/^\/alliances$/i,  evoAlliances);
function evoAlliances() {
	EVO_debug("ENTER Communication/Alliances",399);

	var row;

    var allianceTable = document.evaluate(".//table[contains(.,'Alliance') and contains(.,'Tag') and contains(.,'Score')]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    var newrow = document.createElement('tr');
    newrow.setAttribute('class','row1');
    var newcell = document.createElement('td');
    newcell.setAttribute('colspan', '7');
    newcell.innerHTML = "Testing again";
    newrow.appendChild(newcell);

    //allianceTable.firstChild.removeChild(allianceTable.firstChild.lastChild);

    allianceTable.firstChild.appendChild(newrow);

    var rows = document.evaluate(".//table[contains(.,'Alliance') and contains(.,'Tag') and contains(.,'Score')]/tbody/tr", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i = 2; row = rows.snapshotItem(i); i++) {
		//row.cells[3].textContent = evoNumber2String(row.cells[3].textContent);
        if (row.cells[2] && row.cells[2].textContent.length > 0) {
                    row.cells[3].style.textAlign = "right";
                    row.cells[3].style.padding = "0 2px 0 2px";
                    row.cells[2].style.textAlign = "right";
                    row.cells[2].style.padding = "0 2px 0 2px";
                    row.cells[4].style.textAlign = "right";
                    row.cells[4].style.padding = "0 2px 0 2px";
                    row.cells[5].style.textAlign = "right";
                    row.cells[5].style.padding = "0 2px 0 2px";
                    row.cells[6].style.padding = "0 2px 0 2px";
        }
    }
    
	EVO_debug("EXIT Communication/Alliances",399);
}

//
// Alliance members
//	Communication/Alliances/Members

//
regPageHandler(/^\/alliances(.*)\/members/i,  evoAllianceMembers);
var sortLocation = new Array();
var sortScore = new Array();
var sortName = new Array();
var sortLand = new Array();

var sortByScore = function(e) {
	EVO_debug("ENTER sortByScore",299);

	var clickedNode = e.target.parentNode;
	var tabs = document.evaluate(".//table[contains(@class,'membertable')]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	//var tabs = xpath(".//table[contains(@class,'membertable')]", contents, false);
	var icount = clickedNode.id.toString().substr(9);
	
	tab = tabs.snapshotItem(icount);

	// var tab = document.evaluate(".//table[contains(@class,'membertable')]", // ".//table[contains(@class,'membertable')[tbody/tr/td[text()=' of ']]]", 
	//		containerNode, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var indexArray = new Array();
	var maxLen=0;

	for (index in sortScore[icount]) {
		indexArray[indexArray.length]=index;
		maxLen = (index.length > maxLen)?index.length:maxLen;
	}
	
	var zeros = ""; 
	for (iter = 0; iter < maxLen; iter++) zeros += "0";
	
	for (iter = 0; iter < indexArray.length; iter++) indexArray[iter]= (zeros+indexArray[iter]).substr(-maxLen);
	indexArray = indexArray.sort();


	var sortedScore = new Array();
	for (iter = indexArray.length-1;iter >=0; iter--) {
		sortedScore[indexArray.length-iter] = indexArray[iter].match(/0*(\d*)/)[1];
	}
	for (iter = 1 ; iter <= tab.rows.length; iter++) {
		tab.rows[iter].innerHTML = sortScore[icount][sortedScore[iter]];
	}
	
	EVO_debug("EXIT sortByScore",299);
}

var sortByLand = function(e) {
	EVO_debug("ENTER sortByLand",299);



	var clickedNode = e.target.parentNode;
	var tabs = document.evaluate(".//table[contains(@class,'membertable')]", 
		contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var icount = clickedNode.id.toString().substr(8);


	tab = tabs.snapshotItem(icount);

//  var tab = document.evaluate(".//table[contains(@class,'membertable')]", // ".//table[contains(@class,'membertable')[tbody/tr/td[text()=' of ']]]", 
//      contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

	var indexArray = new Array();
	var maxLen=0;
	for (index in sortLand[icount]) {
		indexArray[indexArray.length]=index;
		maxLen = (index.length > maxLen)?index.length:maxLen;
	}
	var zeros = "";
	for (iter = 0; iter < maxLen; iter++) zeros += "0";
	for (iter = 0; iter < indexArray.length; iter++) indexArray[iter]= (zeros+indexArray[iter]).substr(-maxLen);

	indexArray = indexArray.sort();
	var sortedLand = new Array();
	for (iter = indexArray.length-1;iter >=0; iter--) {
		sortedLand[indexArray.length-iter] = indexArray[iter].match(/0*(\d*)/)[1];
	}
	for (iter = 1 ; iter < tab.rows.length; iter++) {
		tab.rows[iter].innerHTML = sortLand[icount][sortedLand[iter]];
	}
	
	EVO_debug("EXIT sortByLand",299);
}

var sortByName = function(e) {
	EVO_debug("ENTER sortByName",299);

	var clickedNode = e.target.parentNode;
	var tabs = document.evaluate(".//table[contains(@class,'membertable')]", 
		contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var icount = clickedNode.id.toString().substr(8);

	tab = tabs.snapshotItem(icount);

//  var tab = document.evaluate(".//table[contains(@class,'membertable')]", // ".//table[contains(@class,'membertable')[tbody/tr/td[text()=' of ']]]", 
//      contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

	var indexArray = new Array();
	for (index in sortName[icount]) indexArray[indexArray.length]=index;
	indexArray.sort();
	for (iter = 1 ; iter < tab.rows.length; iter++) {
		tab.rows[iter].innerHTML = sortName[icount][indexArray[iter-1]];
	}
	
	EVO_debug("EXIT sortByName",299);
}

var sortByLocation = function(e) {
	EVO_debug("ENTER sortByLocation",299);

	var clickedNode = e.target.parentNode;
	var tabs = document.evaluate(".//table[contains(@class,'membertable')]", 
		contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var icount = clickedNode.id.toString().substr(10);

	tab = tabs.snapshotItem(icount);

//  var tab = document.evaluate(".//table[contains(@class,'membertable')]", // ".//table[contains(@class,'membertable')[tbody/tr/td[text()=' of ']]]", 
//      contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

	var indexArray = new Array();
	for (index in sortLocation[icount]) indexArray[indexArray.length]=index;
	indexArray.sort();
	for (iter = 1 ; iter < tab.rows.length; iter++) {
		tab.rows[iter].innerHTML = sortLocation[icount][indexArray[iter-1]];
	}

	EVO_debug("EXIT sortByLocation",299);	
}


function evoAllianceMembers() {
	EVO_debug("Enter evoAllianceMembers",299);	


	var smin = Math.ceil(pScore * 0.35);
	var tmax = Math.floor(pScore / 0.35);
	var tabs = document.evaluate(".//table[contains(@class,'membertable')]", 
		contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var rankNames = document.evaluate("//h3", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); //div[contains(@class,'alliancememberlist')]/div/form/h3", contents, false);

	EVO_debug('Total Ranks parsed: ' + rankNames.snapshotLength,399);

	// Pinky's changes included
	var totscore=0;
	var stotscore=0;
	var atotscore=0;
	var pnbr=0;
	var snbr=0;

	var thisTag = unescape(window.location.href.match(/\/alliances\/(.*)\/members(.*)$/)[1]);
	var rankNameNode;

	for( var icount = 0; tab = tabs.snapshotItem(icount); icount++ ) {
		rankNameNode = rankNames.snapshotItem(icount);         
		EVO_debug('\nRankID: ' + icount + '\nRankName: ' + rankNameNode.textContent,399); // + 'alliances ' + tab.rows[i].cells[3]);
        sortLocation[icount] = new Array();
        sortScore[icount] = new Array();
        sortName[icount] = new Array();
        sortLand[icount] = new Array();
        
        var nbr = 0;
        var sums1 = 0;
        
        if(tab != null) {
            tab.style.width = '100%';
            tab.rows[0].cells[0].style.width = '400px';
            tab.rows[0].cells[3].style.textAlign = 'right';
            tab.rows[0].style.fontWeight = 'bold';
            
            for(var i=1; i < tab.rows.length; i++) {
                var perTag = (tab.rows[i].cells[0].textContent.match(/\[(.*)\]/) != null) ? tab.rows[i].cells[0].textContent.match(/\[(.*)\]/)[1]: '';
                var isPrimary = (perTag == thisTag ) ? true : false;
                
                // Score variables preparation
                var str = tab.rows[i].cells[2].innerHTML;
                var g2 =  evoString2Number(str);
                var cell2 = tab.rows[i].cells[2];
                
                // Land variables preparation
                var str2 = tab.rows[i].cells[1].innerHTML;
                var g3 =  evoString2Number(str2);
                var cell3 = tab.rows[i].cells[1];
                // apply Number formatting to columns
                tab.rows[i].cells[1].textContent = evoNumber2String(g3);
                tab.rows[i].cells[1].style.textAlign = 'right';
                tab.rows[i].cells[2].textContent = evoNumber2String(g2);
                tab.rows[i].cells[2].style.textAlign = 'right';
                tab.rows[i].cells[3].textContent = evoNumber2String(evoString2Number(tab.rows[i].cells[3].textContent));
                tab.rows[i].cells[3].style.textAlign = 'right';
                // Calculate the sums for Score
                sums1 = sums1 + g2;
                cell2.style.textAlign = 'right';
                
                /* 2.20.4 KCS  if (isPrimary == true){
					totscore = totscore + g2;
                } else {
                    stotscore = stotscore + g2;
                } 
                */
                atotscore = atotscore + g2;
                if( g2 < smin ) {
					cell2.style.color = '#CC4411';
                } else if( g2 > tmax ) {
                    cell2.style.color = '#0000FF';
                    if (isPrimary == true){
                        nbr++;
                        pnbr++;
                        totscore = totscore + g2;
                    }else{
                        snbr++;
                        stotscore = stotscore + g2;
                    }
                } else {
					cell2.style.color = '#00FF00';
                    if (isPrimary == true){
                        nbr++;
						pnbr++;
						totscore = totscore + g2;
					} else {
                        snbr++;
                        stotscore = stotscore + g2;
					}
				}
                    
                var match;
                if (match = tab.rows[i].cells[0].textContent.match(/\((\d*?),(\d*?),(\d*?):(\w)\) \[.*\][+ || ].* \((.*)\)/)) {
                    var tmpname = match[5];
                    var tmpcoords = match[1] + "," + match[2] + "," + match[3] + ":" + match[4];
                    var tmpunirank = tab.rows[i].cells[3].textContent;
                    var tmpid = players.Players.length;
                    players.Players[tmpid] = 
new evoPlayer(tmpid, tmpname, tmpcoords, g3, g2, icount, rankNameNode.textContent, 'alliances', tmpunirank, perTag, 'isBuddy');
                                                sortLocation[icount][match[1]+","+match[2]+","+match[3]+":"+match[4]]=tab.rows[i].innerHTML;
                                                sortScore[icount][g2/*+match[5]*/]=tab.rows[i].innerHTML;
                                                sortLand[icount][g3/*+match[5]*/]=tab.rows[i].innerHTML;
                                                sortName[icount][match[5]]=tab.rows[i].innerHTML;
                } else if (match = tab.rows[i].cells[0].textContent.match(/(\d*?),(\d*?),(\d*?):(\w)\) \[.*\] (.*) alliance leader/i)) {
                    var tmpname = match[5];
                    var tmpcoords = match[1] + "," + match[2] + "," + match[3] + ":" + match[4];
                    var tmpunirank = tab.rows[i].cells[3].textContent;
                    var tmpid = players.Players.length;
                    players.Players[tmpid] = 
new evoPlayer(tmpid, tmpname, tmpcoords, g3, g2, icount, rankNameNode.textContent, 'alliances', tmpunirank, perTag, 'isBuddy');
                                                sortLocation[icount][match[1]+","+match[2]+","+match[3]+":"+match[4]]=tab.rows[i].innerHTML;
                                                sortScore[icount][g2/*+match[5]*/]=tab.rows[i].innerHTML;
                                                sortLand[icount][g3/*+match[5]*/]=tab.rows[i].innerHTML;
                                                sortName[icount][match[5]]=tab.rows[i].innerHTML;
                } else if (match = tab.rows[i].cells[0].textContent.match(/(\d*?),(\d*?),(\d*?):(\w)\) \[.*\] (.*) Senior Member/i)) {
                    var tmpname = match[5];
                    var tmpcoords = match[1] + "," + match[2] + "," + match[3] + ":" + match[4];
                    var tmpunirank = tab.rows[i].cells[3].textContent;
                    var tmpid = players.Players.length;
                    players.Players[tmpid] = 
new evoPlayer(tmpid, tmpname, tmpcoords, g3, g2, icount, rankNameNode.textContent, 'alliances', tmpunirank, perTag, 'isBuddy');
                                                sortLocation[icount][match[1]+","+match[2]+","+match[3]+":"+match[4]]=tab.rows[i].innerHTML;
                                                sortScore[icount][g2/*+match[5]*/]=tab.rows[i].innerHTML;
                                                sortLand[icount][g3/*+match[5]*/]=tab.rows[i].innerHTML;
                                                sortName[icount][match[5]]=tab.rows[i].innerHTML;
                } else if (match = tab.rows[i].cells[0].textContent.match(/(\d*?),(\d*?),(\d*?):(\w)\) \[.*\][+ || ](.*)/)) {
                    var tmpname = match[5];
                    var tmpcoords = match[1] + "," + match[2] + "," + match[3] + ":" + match[4];
                    var tmpunirank = tab.rows[i].cells[3].textContent;
                    var tmpid = players.Players.length;
                    players.Players[tmpid] = 
new evoPlayer(tmpid, tmpname, tmpcoords, g3, g2, icount, rankNameNode.textContent, 'alliances', tmpunirank, perTag, 'isBuddy');
                                                sortLocation[icount][match[1]+","+match[2]+","+match[3]+":"+match[4]]=tab.rows[i].innerHTML;
                                                sortScore[icount][g2/*+match[5]*/]=tab.rows[i].innerHTML;
                                                sortLand[icount][g3/*+match[5]*/]=tab.rows[i].innerHTML;
                                                sortName[icount][match[5]]=tab.rows[i].innerHTML;
                } else if (match = tab.rows[i].cells[0].textContent.match(/(\d*?),(\d*?),(\d*?):(\w)\) (.*)/)) {
                            var tmpname = match[5];
                            var tmpcoords = match[1] + "," + match[2] + "," + match[3] + ":" + match[4];
                            var tmpunirank = tab.rows[i].cells[3].textContent;
                            var tmpid = players.Players.length;
                            players.Players[tmpid] = 
new evoPlayer(tmpid, tmpname, tmpcoords, g3, g2, icount, rankNameNode.textContent, 'alliances', tmpunirank, perTag, 'isBuddy');
                                                sortLocation[icount][match[1]+","+match[2]+","+match[3]+":"+match[4]]=tab.rows[i].innerHTML;
                                                sortScore[icount][g2/*+match[5]*/]=tab.rows[i].innerHTML;
                                                sortLand[icount][g3/*+match[5]*/]=tab.rows[i].innerHTML;
				                                sortName[icount][match[5]]=tab.rows[i].innerHTML;
                }
				var strDebug = 'Player ' + String(players.Players.length-1) + ' attributes dump: \n';
				for (plkey in players.Players[players.Players.length-1]) {
							strDebug += plkey + ' = ' + players.Players[players.Players.length-1][plkey] + '\n';
				}
				EVO_debug(strDebug);
			}
            var g3=evoNumber2String(sums1);
            tab.rows[0].cells[0].innerHTML = "Name (sort by <a id='sortname" + icount + "' onmouseover='this.style.cursor=\"pointer\";'><u>Name</u></a> or <a id='sortcoords" + icount + "' onmouseover='this.style.cursor=\"pointer\";'><u>Coordinates</u></a>)"
            tab.rows[0].cells[1].innerHTML = "<a id='sortland" + icount + "' onmouseover='this.style.cursor=\"pointer\";'><u>Land</u></a>"
            tab.rows[0].cells[2].innerHTML = "<a id='sortscore" + icount + "' onmouseover='this.style.cursor=\"pointer\";'><u>"+tab.rows[0].cells[2].innerHTML +'<font color="#00FF00"> '+ g3 + '</font><BR>Targets for me: <font color="#00FF00">' + nbr + '</font></u></a>';
            tab.rows[0].cells[2].style.textAlign = 'right';
            anchor = document.getElementById('sortcoords' + icount);
            anchor.addEventListener('click', sortByLocation, false);
            anchor = document.getElementById('sortname' + icount);
            anchor.addEventListener('click', sortByName, false);
            anchor = document.getElementById('sortscore' + icount);
            anchor.addEventListener('click', sortByScore, false);
            anchor = document.getElementById('sortland' + icount);
            anchor.addEventListener('click', sortByLand, false);
            } else {
				alert('Doh!');
            }

}
EVO_debug("Total Players Parsed: " + players.Players.length);

// View extra info about the targets (by Pinky)
// changed the code a bit, as it was breaking the attached event listeners. General advice: don't use innerHTML 
// if you don't know what it's doing exactly ;)
//
            var div = document.evaluate(".//div[@id='alliancememberlist']", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
            
            var div1 = document.createElement('div');
            div1.setAttribute('class', 'seperator title');
            div1.style.marginTop = "10px";

            div1.innerHTML = '' + //'<div class="separator title" title="Members having this alliance as primary" style="margin-top: 10px;" >' +
                                                'You currently have ' +
                                                '<span style="color:#00ff00;">'+pnbr+'</span>' +
                                                ' Primary targets in this alliance ('+evoNumber2String(totscore) + '/' +evoNumber2String(atotscore) +')' +
                                    '</div>' +
                                    '<div class="separator title" title="Members that don\'t have this alliance as primary">You currently have ' +
                                                '<span style="color:#00aaff;">'+snbr+'</span>' +
                                                ' Secondary targets in this alliance ('+evoNumber2String(stotscore)+')' +
                                    '</div>' +
                                    '<div class="separator title">Total of '+evoNumber2String(pnbr+snbr)+' Targets ('+evoNumber2String(totscore+stotscore) + '/' +evoNumber2String(atotscore) + ')';
            div.insertBefore(div1, div.firstChild);

// Add items to the Alliance menu bar
            var allianceMenu = document.getElementById('alliancesmenu');
            var mmitem = document.createElement('LI');
            var mmitemlink = document.createElement('A');
            var mmitemimg = document.createElement('img');
            var mmitemtext = document.createTextNode('Mass PM');
            mmitemimg.src='http://images.neondragon.net/ev5/sectionicons/messages.png';
            mmitemimg.width=16;
            mmitemimg.height=16;
            mmitemimg.border=0;
            allianceMenu.appendChild(mmitem);
            mmitemlink.href="#";
            mmitem.appendChild(mmitemlink);
            mmitemlink.appendChild(mmitemimg);
            mmitemlink.appendChild(mmitemtext);
            mmitem.addEventListener('click', function(event) { createMassMessagePanel(event, mmitem); }, false);
/***********************************
 To check
            // Show the info at the top
            var div = document.evaluate(".//div[@id='alliancememberlist']", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
            
            div.innerHTML = '<div class="separator title">You currently have <span style="color:#00ff00;">'+nbr+'</span> Primary targets in this alliance ('+evoNumber2String(totscore)+')</div><div class="separator title">You currently have <span style="color:#00aaff;">'+snbr+'</span> Secondary targets in this alliance ('+evoNumber2String(stotscore)+')</div><div class="separator title">Total of '+evoNumber2String(nbr+snbr)+' Targets ('+evoNumber2String(totscore+stotscore)+')</div>' + div.innerHTML;
            

            // quick buddy
            // This feature makes a direct request to the server which is deemed illegal
            // neon has however kindly accepted to allow it only for this particular feature
            // since it puts less strain on the server than doing it the regular way
            // AGAIN, THIS IS AN EXCEPTION. DON't USE XmlHttpRequest!!! IT IS ILLEGAL!
            function onBuddy(e) {
                        var postData;
                        e.preventDefault();
                        try {
                                    postData = e.target.href.match(/\/buddies\/add\?(.*)$/)[1];
                        } catch ( e ) {
                                    return;
                        }
                        if( count++ ) {
                                    alert("Wow... take it easy! One buddy at a time, will you?");
                                    --count;
                                    return;
                        }
                        e.target.textContent = "Please wait...";
                        e.target.href = '#';
                        GM_xmlhttpRequest({
                                    method: 'POST',
                                    url: 'http://'+document.location.hostname+'/buddies/add',
                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                    data: postData,
                                    onreadystatechange: function(responseDetails) {
                                                if( responseDetails.readyState == 4 && responseDetails.status == 200 ) {
                                                            e.target.parentNode.removeChild(e.target);
                                                            --count;
                                                }
                                    },
                                    onerror: function(responseDetails) {
                                                e.target.href = "/buddies/add?" + postData;
                                                e.target.textContent = ' Add to buddies';
                                                --count;
                                    }
                        });
            }

            var i, match;
            var re = /javascript:return continentBox\(\d+,(\d+),(\d+),(\d+),(\d+),'(\w)','([^']+)','([^']+)','([^']+)','([^']+)','([^']*)',\s*'([^']*)'/;
            var users = document.evaluate(".//a[@class='cleanlink continfo']", contents, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


            for(i = 0; node = users.snapshotItem(i); i++) {
                        if( match = re.exec(node.getAttribute('onclick')) ) {
                                    if( match[11] == '' ) {
                                                var br, td = node.parentNode.parentNode;
                                                var a = document.createElement('a');
                                                a.href = '/buddies/add?x=' + match[2] + '&y=' + match[3] + '&z=' + match[4] + '&c=' + match[5] + '&nickname=' + encodeURIComponent(match[6]) + '&label=' + encodeURIComponent(node.textContent.match(/\[([^\]]+)\]/)[1]);
                                                a.appendChild(document.createTextNode(' Add to buddies'));
                                                a.addEventListener('click', onBuddy, false);
                                                if(! (br = node.parentNode.nextSibling) )
                                                            td.appendChild(document.createElement('br'));
                                                else
                                                            br.nextSibling.textContent += ' ';
                                                td.appendChild(a);
                                    }
                        }
            }
*******************/

}

//
// Add some color to the scores on
// Buddy and Continent rankings
//
regPageHandler(/^\/rankings\/continent/i,  evoContRankings);
regPageHandler(/^\/rankings\/buddies/i,  evoContRankings);
function evoContRankings() {
	EVO_debug("ENTER evoContRankings",399);
	var smin = Math.ceil(pScore * 0.35);
	var tmax = Math.floor(pScore / 0.35);
	var tab = document.evaluate(".//table[tbody/tr/td[text()='Rank']]", 
		contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var nbr = 0;
	var sums1 = 0;

	if(tab != null) {
		for(var i=1; i < tab.rows.length; i++) {
		try {
			var str = tab.rows[i].cells[3].innerHTML;
			var g2 =  evoString2Number(str);
			var cell2 = tab.rows[i].cells[3];
			sums1 = sums1 + g2;
			cell2.style.textAlign = 'right';
			if( g2 < smin ) cell2.style.color = '#CC4411';
			else if( g2 > tmax ) { cell2.style.color = '#0000FF'; nbr++; }
			else { cell2.style.color = '#00FF00'; nbr++; }
		}
		catch (Exception) {
			EVO_debug("Caught an exception at " + i + " " + tab.rows[i].cells.length);
		}    
		}
	} else
		alert('Doh!');
	EVO_debug("EXIT evoContRankings",399);
}

regPageHandler(/^\/(universe\/(home)|(\d+(,\d+)*))$/i,  calcUniverse);
function calcUniverse() {
EVO_debug("Begin Calc universe");
  var tScore = 0;
  var rank = 0;
  var node;
  var coords = evoGetCookie('nEvoCoords').match(/(((\d+),(\d+)),(\d+)):(\w)/)
  var page = document.location.pathname.match(/^\/(universe\/(home)$|(\d+)(,\d+)?(,\d+)?)$/i)
  if (page[2]=="home"||page[1]==coords[1]) {
    var table = table = document.getElementById('cont_list');
    if (table != null) {
      for (var iter=2;iter<table.rows.length;iter++) {
        tScore += evoString2Number(table.rows[iter].cells[3].textContent);
      }
      rank = Math.round(pScore/tScore*10000)/100;
      node = document.createTextNode('Your Rank: '+rank+'%');
      var cell = document.evaluate(".//table[tbody/tr/td[contains(text(),'x,y,z:c')]]/../..", document,null,XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.cells[0];
      cell.appendChild(node);
    }
  } else if (page[1]==coords[2]||page[1]==coords[3]) {
    var table = document.evaluate(".//table[tbody/tr/td[contains(text(),'x,y,z:c')]]/../../../..", document,null,XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    if (table != null) {
      for (var iter=2;iter<table.rows.length;iter++) {
        tScore += evoString2Number(table.rows[iter].cells[4].textContent);
      }
      rank = Math.round(pScore/tScore*10000)/100;
      node = document.createTextNode('Your Rank: '+rank+'%');
      var cell = document.getElementsByName('allianceinf')[0].parentNode
      cell.appendChild(node);
    }
  }
}
regPageHandler(/^\/(universe\/(home|search)|(\d+(,\d+)*))$/i,  evoUniverse);
function evoUniverse() {
	EVO_debug("ENTER evoUniverse",399);
	// KCS Critical Section
	
				// This is a functioning GM_xmlhttpRequestkcs	
			/*GM_xmlhttpRequest({
							method: 'POST',
							url: 'http://64.83.50.74/RedOracle1/Service1.asmx/HelloWorld',                                                
							headers: { 'Content-Type': 'application/x-www-form-urlencoded',
									'Content-Length': 6
									},
							//data: 'http://localhost/RedOracle5/Service1.asmx/HelloWorld2&p_strData=string',
	                        data: 'http://64.83.50.74/RedOracle1/Service1.asmx/HelloWorld',
	                        
							onload: function(responseDetails) {
								alert('Request returned status = ' + responseDetails.status + ' status text = ' + responseDetails.statusText  
									+ ' response headers = ' + responseDetails.responseHeaders 
									+ ' response text = ' + responseDetails.responseText);
								}
							});
	*/


	var smin = Math.ceil(pScore * 0.35);
	var tmax = Math.floor(pScore / 0.35);

	var table = document.getElementById('cont_list');


	table.rows[0].insertCell(4);
	table.rows[0].cells[4].textContent = 'Last Seen'; // New heading

	if( table != null ) {
			// let's add some color and look for potential targets ;)
			for(var i=2; i < table.rows.length; i++) {
					if( table.rows[i].cells.length < 4 )
							continue;

					var cell1 = table.rows[i].cells[1];
					var cell3 = table.rows[i].cells[3];
	                
					var matchr = /Last Seen: (?:(\d+) days )?(\d+) hours ago/.exec(cell1.getElementsByTagName("a")[0].getAttribute('onclick'));
	                
					//Add an "attack this" button			
					var coords = table.rows[i].cells[0].textContent.split(",");
					coords[0] = coords[0].substring(1);
					coords[2] = coords[2].split(":");
					coords[3] = coords[2][1].substring(0,1);
					coords[2] = coords[2][0];
					table.rows[i].cells[0].innerHTML = "<a href = \"/fleets?x=" + coords[0] + "&y=" + coords[1] + "&z=" + coords[2] + "&c=" + coords[3] + "\">" + table.rows[i].cells[0].innerHTML + "</a>";
	//kcsedit
					
	                
					table.rows[i].insertCell(4);
					table.rows[i].cells[4].style.textAlign="left";
					// display player's online/offline status
					if( matchr ) {
						// player is not online
						table.rows[i].cells[4].textContent = matchr[0].split(":")[1];
						
						//var matchdays = /(\d+) days/.exec(cell1.getElementsByTagName("a")[0].getAttribute('onclick'));
						//if ( matchdays  {
						//	alert(table.rows[i].cells[4].textContent + " other way " +matchr[0].split(":")[1].split("days")[0]);
						//}
						table.rows[i].cells[4].textContent = table.rows[i].cells[4].textContent.replace(/( days)|( hours)/g,function(thematch){if(thematch==" days") return "d"; else return "h"});
					} else {
						// player is online right now!
						table.rows[i].cells[4].innerHTML = '<span style="color:orangered"> Online!</span>';
					}
					table.rows[i].cells[4].innerHTML = '&nbsp;' + table.rows[i].cells[4].innerHTML; // insert preceding space for readability

	//Sorting out the data
	//alert("Continent =" + table.rows[i].cells[0].textContent + " Name = " + table.rows[i].cells[1].textContent + " Land = " + table.rows[i].cells[2].textContent + " Score = " + table.rows[i].cells[3].textContent + " days away = " + table.rows[i].cells[4].textContent);
	//string p_strContinent, string p_strPlayer, string p_strLand, string p_strScore, string p_strLastActive



	/*				postData = "http://64.83.50.74/RedOracle1/Service1.asmx/RecordPlanetInfo&p_strContinent=" + table.rows[i].cells[0].textContent
									+ "&p_strPlayer="  + table.rows[i].cells[1].textContent
									+ "&p_strLand="  + table.rows[i].cells[2].textContent
									+ "&p_strScore="  + table.rows[i].cells[3].textContent
									+ "&p_strLastActive="  + table.rows[i].cells[4].textContent;
									
	*/
						postData =  "p_strContinent=" + table.rows[i].cells[0].textContent
									+ "&p_strPlayer="  + table.rows[i].cells[1].textContent
									+ "&p_strLand="  + table.rows[i].cells[2].textContent
									+ "&p_strScore="  + table.rows[i].cells[3].textContent
									+ "&p_strLastActive="  + table.rows[i].cells[4].textContent;
																	
EVO_debug(postData,99);
					
				/*	            postData = "x=" + escape(target.getCoords['dimension']) + 
					"&y=" + escape(target.getCoords['galaxy']) + 
					"&z=" + escape(target.getCoords['planet']) + 
					"&c=" + escape(target.getCoords['continent']) +
					"&nickname=" + escape(target.UserName) +
					"&label=!Other!" +
					"&othertext=" + thisTag; //escape(target.primaryAllianceTag);
				*/
					// This is a functioning GM_xmlhttpRequest	
/*This workskcs					GM_xmlhttpRequest({
						method: 'POST',
						url: 'http://64.83.50.74/RedOracle1/Service1.asmx/RecordPlanetInfo',  
						' 64.83.50.74/RedOracle                                              
						headers: { 'Content-Type': 'application/x-www-form-urlencoded',
								'Content-Length': 6
								},
						data: postData
						/*onload: function(responseDetails) {
							alert('Request returned status = ' + responseDetails.status + ' status text = ' + responseDetails.statusText  
								+ ' response headers = ' + responseDetails.responseHeaders 
								+ ' response text = ' + responseDetails.responseText);
							}
						});
*/
EVO_debug("after universe GMXML",99);				                
					var target = evoString2Number(cell3.innerHTML);

					if( target < smin )
							cell3.style.color = '#CC4411';
					else if( target > tmax )
							cell3.style.color ='#0000FF';
					else
							cell3.style.color = '#00FF00';
			}       
			var git = document.evaluate(".//table[tbody/tr[1]/td[1][text() = 'Key']]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
			if( git != null ) {
					var d = git.insertRow(4);
					d.className = "lightblue_bg_row2";
					d.innerHTML = '<td>Text colours:</td><td colspan="3" align="center"><font color="#FFFFFF">White</font> name of continent shows that this person is online<BR><font color="#C4C4C4">Gray</font> name of continent shows that this person is offline<BR><font color="#646464">Dark gray</font> name shows that person is offline from more than week</td>';
					var c = git.insertRow(5);
					c.className = "lightblue_bg_row1";
					c.innerHTML = '<td>Score colours:</td><td colspan="3" align="center">Player with that <font color="#CC4411">score</font> can attack you, but you can\'t<BR>Player with that <font color="#00FF00">score</font> can attack you, and you can also attack him<BR>Player with that <font color="#0000FF">score</font> can\'t attack you, but you can :D</td>';
			}
		}
		
		evoUniverseNav();
}

// Planet Status Page
// All KCS here :P
regPageHandler(/^\/planet/, evoPlanetStatus);
function evoPlanetStatus(){
	EVO_debug("Begin evoPlanetStatus",99);
	//get the Player
	var strSourcePlayer = document.evaluate("//p[@id='openpanel']/strong", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; // whole sidebar
	strSourcePlayer = strSourcePlayer.textContent;
//EVO_debug(player,99);
	//get the Tick
	var strTick = document.evaluate("//div[@id='tickcount']/span/strong", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; // whole sidebar
	strTick = strTick.textContent;

	//get the Time
	// Month is 0-11, must change to 1-12
	var now = new Date();
	var strCurrentTime = now.getFullYear()+ "/" + (now.getMonth() + 1) + "/" +now.getDate()+ " " + now.getUTCHours()+ ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds();

	
//EVO_debug(strSourcePlayer + " " + strCurrentTime,99);	
	//get the Planet News
	//XXKCS
	var planetNews = document.evaluate("//div[@id='content']/table[2]/tbody", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	//Used to search for news items
	var intSearch	= 19; 
	
	for (var i = 19; i > -1; i--) {
//EVO_debug(i + " " + planetNews.snapshotLength,99);
		var intFirstRow		= 2*i + 1;
		var intSecondRow	= 2*i + 2;
		
		var strEvalString = "//div[@id='content']/table[2]/tbody/tr[" + intFirstRow + "]/td[@class='alt2'][1]";
		// Sample: strEvalString = "//div[@id='content']/table[2]/tbody/tr[1]/td[@class='alt2'][1]";
		var row = document.evaluate(strEvalString, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var strNewsItem = row.textContent;
		
		strEvalString = "//div[@id='content']/table[2]/tbody/tr[" + intFirstRow + "]/td[@class='alt2'][2]";
		row = document.evaluate(strEvalString, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var strNewsTime = row.textContent;
		
		strEvalString = "//div[@id='content']/table[2]/tbody/tr[" + intSecondRow + "]/td";
		row = document.evaluate(strEvalString, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var strNewsDetail= row.textContent;
		
		
		var strKey		= "News" + i;
		var strNewsHash	= strNewsItem + strNewsTime + strNewsDetail;
		
		var blnAlreadySent = false;
		
		for (var iSearch = intSearch ; iSearch > -1; iSearch--){
			var strSearchKey	= "News" + iSearch;
//EVO_debug( iSearch + " iSearch " + strSearchKey,99 );			
			var strOldItem		= GM_getValue(strSearchKey);
// EVO_debug("intsearch = " + intSearch + " iSearch " + iSearch + strSearchKey + " " + strOldItem,99 );			

			if ((strNewsHash	== strOldItem) && !blnAlreadySent) {
				blnAlreadySent	= true;
//EVO_debug(i + " FOUND " + strSearchKey + strOldItem + " " + strNewsHash ,99 );
				intSearch		= iSearch -1;
			}
		}
		
		//save the current News Item
		GM_setValue(strKey, strNewsHash);
	
	
		if (!blnAlreadySent){		
			var strPassword = "Test";
			var postData	= "p_strPlayer=" + strSourcePlayer
								+ "&p_strPassword=" + strPassword
								+ "&p_strTick=" + strTick
								+ "&p_strCurrentTime=" + strCurrentTime
								+ "&p_strNewsItem=" + strNewsItem
								+ "&p_strNewsTime="  + strNewsTime
								+ "&p_strNewsDetail="  + strNewsDetail;

			// This is a functioning GM_xmlhttpRequest	
			GM_xmlhttpRequest({
				method: 'POST',  // 64.83.50.74/ RedOracle1
				url: 'http://64.83.50.74/RedOracle1/Service1.asmx/RecordPlanetaryNews',                                                
				headers: { 'Content-Type': 'application/x-www-form-urlencoded',
						'Content-Length': 6
						},
				data: postData
				});
		}
		else
		{
//			EVO_debug("ALREADY SENT",99 );
		}

//EVO_debug(strNewsItem + " " + strNewsTime + " " + strNewsDetail,99 );
	
	}
	
	/*
	var battleReports = document.evaluate(".//table[tbody/tr/td[position()=2 and starts-with(.,'Attackers')]]",
                document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            var battleReport;
            var rows, html, attDefRow, isAttacker, att, myAtt, def, myDef, idx, idx2,  unit, quantity, boost, landType, land, myLand, summaryRow, cell, j;
            
            var quantityAll, idxAll, quantityAllEnemy, idxEnemyAll, idx2Enemy, attEnemy, defEnemy, htmlEnemy; //2.20.4 New Variables
            
            var ruler = document.evaluate(".//p[@id='openpanel']/strong/text()", document, null, XPathResult.STRING_TYPE, null).stringValue;
            var attPrefixRegex = /.*att<sup>2<\/sup>:\s*/;
   /*         var attSuffixRegex = /<br.*/;
    /*        var defPrefixRegex = /.*def<sup>2<\/sup>:\s*/;
	/*		for (var i = 0; i < battleReports.snapshotLength; i++) {
	
	*/
	
	
//	alert("Test");
	EVO_debug("End evoPlanetStatus",99);
}

//
// Evaluation of att/def on scans
//
regPageHandler(/^\/scans/i, evoScans );
regPageHandler(/^\/scans/i, evoAmpRatio );
function evoAmpRatio() {
EVO_debug("Begin evoAmpRatio",99);

	var scantable = document.evaluate(".//table[@class='t_little' and preceding-sibling::div[@class='separator title'and child::span[text()='Order Scans']]]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

	var land = document.getElementById( 'panelinfo' ).textContent.match( /Land:\s([,?\d]+)/ );

	var curAmps = evoString2Number( scantable.rows[3].cells[2].textContent );
	var curLand = evoString2Number( land[1] );
	var ratio = Math.round(( curAmps / curLand ) * 1000 ) / 1000;
	scantable.rows[3].cells[2].innerHTML = scantable.rows[3].cells[2].innerHTML + '<br /><span style="text-size: 0.8em;color: greenyellow">' + ratio + '</span>';
EVO_debug("End evoAmpRatio",99);
}
function evoScans(){
EVO_debug("Begin scans",99);
	// Get the Current Tick. We are interested in the tick of the scan however
	// KCSTODO: Grab the tick for old scans, also send who and when the data was communicated, and login/password info
	var tick = document.evaluate("//div[@id='tickcount']/span/strong", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; // whole sidebar
	tick = tick.textContent;


    var scan = document.evaluate("//div[@class='helpmessage']/strong", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!scan) return;
    scan = scan.textContent;
    EVO_debug(scan,99);
	
    var table = document.evaluate("//div[@class='helpmessage']/table", document, null, 6, null).snapshotItem(0);
    
	if (scan.indexOf("Sector Scan") != -1){ //Sector Scan
        var defenceData = new Array(
            new Array(8 , 'fort'),
            new Array(9 , 'satellite mark 2'),
            new Array(10, 'nanowire wall')
        );
        var unalloc = 0, land = 0, alloc = new Array();
        var overallAttack = 0, overallDefence = 0, overallDefenceDef = 0;
        var row = document.evaluate("//div[@class='helpmessage']/table/tbody/tr[7]", document, null, 6, null);
        row = row.snapshotItem(0);
        var cells = row.cells;
        land = unalloc = parseInt(cells[1].textContent);
        for (var i = 0; i < defenceData.length; i++){

            var row = document.evaluate("//div[@class='helpmessage']/table/tbody/tr[" + defenceData[i][0] + "]", document, null, 6, null);
            //xxkcs
            row = row.snapshotItem(0);
            if (!row) continue;
            var cells = row.cells;
            var nAlloc = parseInt(cells[1].textContent);
            if (!isNaN(nAlloc)) land += alloc[i] = nAlloc;
            if (!cells[2]) continue;
            var nDef = parseInt(cells[3].innerHTML);
            if (isNaN(nDef)) continue;
            var unit = units[defenceData[i][1]];
            var attack = unit.getAttackScore(nDef);
            var defence = (dEvo) ? unit.getDefDefScore(nDef) : unit.getAttDefScore(nDef);
            var defencedef = unit.getDefDefScore(nDef);
            overallAttack += attack;
            overallDefence += defence;
            overallDefenceDef += defencedef;
            cells[3].title = 'Estimated boosted att2/def2: ' + evoNumber2String(attack.toFixed(0)) + ' / ' + evoNumber2String(defence.toFixed(0));
        }
        var row = table.insertRow(10);
        var newCell = row.insertCell(0);
        newCell.className = "alt1 b";
        newCell.innerHTML = "Land Ratio - unallocated";
        newCell = row.insertCell(1);
        var gcd = gcf(gcf(alloc[0],alloc[1]),alloc[2]);
        var newText=alloc[0]/gcd+":"+alloc[1]/gcd+":"+alloc[2]/gcd+" - ";
        var landratio = Math.round(unalloc/land*10000)/100;
        newText += landratio+"%";
        newCell.innerHTML = newText;
        newCell = row.insertCell(2);
        newCell.className = "alt1 b";
        newCell.innerHTML = "Static att2/def2<sup>*</sup>";
        newCell.title = "This DOES NOT include the creature stats";
        newCell = row.insertCell(3);
        newCell.innerHTML = evoNumber2String(overallAttack.toFixed(0)) + " / " + evoNumber2String(overallDefence.toFixed(0)) + " (" + evoNumber2String(overallDefenceDef.toFixed(0)) + ')';

		// Grab elements of Sector Scan
		//Sector Scan
		var strPlayer		= table.rows[0].cells[0].textContent;
		var strScore		= table.rows[2].cells[1].innerHTML;
		var strMetalRes		= table.rows[2].cells[3].innerHTML;
		var strMineralRes	= table.rows[3].cells[3].innerHTML;
		var strFoodRes		= table.rows[4].cells[3].innerHTML;
		
		var intStartCoords	= strPlayer.indexOf("(");
		var intEndCoords	= strPlayer.indexOf(")");
		
		var strContinent	= strPlayer.substring(intStartCoords+1,intEndCoords);
		var strName			= strPlayer.substring(intEndCoords+2);		
		// KCSTODO: the character ' will kill the send
		// Maybe should iterate through and delete all 's
		// For gramps :P
		intEndCoords		= strName.indexOf("'");
		if (intEndCoords != -1)
		{
			strName			= strName.substring(0,intEndCoords)
		}
		
		var postData		= "p_strContinent=" + strContinent
									+ "&p_strPlayer="  + strName
									+ "&p_intTick="  + tick
									+ "&p_intScore="  + strScore
									+ "&p_intUnallocatedLand="  + unalloc									
									+ "&p_intMetalLand="  + alloc[0]
									+ "&p_intMineralLand="  + alloc[1]
									+ "&p_intFoodLand="  + alloc[2]
									+ "&p_dblMetalReserve="  + strMetalRes
									+ "&p_dblMineralReserve="  + strMineralRes
									+ "&p_dblFoodReserve="  + strFoodRes
									+ "&p_dblStaticAtt2="  + overallAttack.toFixed(0)
									+ "&p_dblStaticDef2="  + overallDefenceDef.toFixed(0);

		// This is a functioning GM_xmlhttpRequest	
		GM_xmlhttpRequest({
			method: 'POST',  // 64.83.50.74/ RedOracle1  localhost /RedOracle4/
			url: 'http://64.83.50.74/RedOracle1/Service1.asmx/RecordSectorScan',                                                
			headers: { 'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': 6
					},
			data: postData
			});
EVO_debug("after request",99);
//http://www.redalliance.info/red_evo/red_evo+: 
//http://localhost/RedOracle5/Service1.asmx/RecordSectorScan&p_strContinent=test&p_strPlayer=Sector Scan of(2,3,1:i) [DAMN]+ Swifty of Merc&p_strTick=1600&p_strScore=7955753&p_strUnallocatedLand=2835&p_strMetalLand=441&p_strMineralLand=226&p_strFoodLand=63&p_strMetalReserve=9318800&p_strMineralReserve=985700&p_strFoodReserve=4261910&p_strStaticAtt2=667008&p_strStaticDef2=4118107

//problems if no crits
    } else if (scan.indexOf("Creature Scan") != -1){
        var rows = table.rows;
        var row, cells, cell, unit, quantity, boost;
        var attack, defdef, attdef, overallAttack = 0, overallDefDef = 0, overallAttDef = 0, launchCost = 0;
        
        // Get the name
        var strPlayer		= table.rows[0].cells[0].textContent;
        var intStartCoords	= strPlayer.indexOf("(");
		var intEndCoords	= strPlayer.indexOf(")");
		
		var strContinent	= strPlayer.substring(intStartCoords+1,intEndCoords);
		var strName			= strPlayer.substring(intEndCoords+2);		
		
		intEndCoords		= strName.indexOf("'");
		if (intEndCoords != -1)
		{
			strName			= strName.substring(0,intEndCoords)
		}
		
		var strResult = strContinent + " " + strName;
		EVO_debug(strResult,99);
		
		
        for (var i = 2; i < rows.length; i++){
            row = rows[i];
            cells = row.cells;
            for (var j = 0; j < cells.length; j += 2) {
EVO_debug(j + " " + cells.length, 00);
				if (cells.length > 1) {
                unit = units[cells[j].textContent.toLowerCase()];
                cell = cells[j + 1];
                quantity = parseInt(cell.innerHTML);
                
                strResult = strContinent + " " + tick + " " + cells[j].textContent + " " + quantity;
				// RecordCreatureScanCreature(string p_strContinent, string p_strPlayer, string p_strTick, string p_strCreatureType, string p_strNumber)        
        
        		postData = "p_strContinent=" + strContinent
									+ "&p_strPlayer="  + strName
									+ "&p_intTick="  + tick
									+ "&p_strCreatureType="  + cells[j].textContent
									+ "&p_intNumber="  + quantity;
				EVO_debug(postData,99)	
				// This is a functioning GM_xmlhttpRequest	
				GM_xmlhttpRequest({
					method: 'POST',
					url: 'http://64.83.50.74/RedOracle1/Service1.asmx/RecordCreatureScanCreature',                                                
					headers: { 'Content-Type': 'application/x-www-form-urlencoded',
							'Content-Length': 6
							},
					data: postData//,
					//onload: function(responseDetails) {
					//	alert('Request returned status = ' + responseDetails.status + ' status text = ' + responseDetails.statusText  
					//		+ ' response headers = ' + responseDetails.responseHeaders 
					//		+ ' response text = ' + responseDetails.responseText);
					//	}
					});
        
                EVO_debug(strResult,99);
                
                boost = 1 + unit.getMaxBoost();
                attack = unit.getAttackScore(quantity) * boost * boost;
                defdef = unit.getDefDefScore(quantity) * boost * boost;
                attdef = unit.getAttDefScore(quantity) * boost * boost;
                overallAttack += attack;
                overallDefDef += defdef;
                overallAttDef += attdef;
                cell.title = (dEvo) ? 'Estimated boosted att2/def2: ' + evoNumber2String(attack.toFixed(0)) + ' / ' + evoNumber2String(attdef.toFixed(0)) + ' (' + evoNumber2String(defdef.toFixed(0)) + ')'
                                    : 'Estimated boosted att2/def2: ' + evoNumber2String(attack.toFixed(0)) + ' / ' + evoNumber2String(attdef.toFixed(0)) + ' (' + evoNumber2String(defdef.toFixed(0)) + ')';
                launchCost += unit.getFoodCost(quantity);
                }
            }
        }
        
		EVO_debug("skipped crits",99);
			var strResult = overallAttack.toFixed(0) + " " + overallAttDef.toFixed(0) + " " + launchCost;
			//RecordCreatureScan(string p_strContinent, string p_strPlayer, string p_strTick, string p_strOverallAtt, string p_strOverallDef, string p_strLaunchCost)        
	        
        postData = "p_strContinent=" + strContinent
					+ "&p_strPlayer="  + strName
					+ "&p_intTick="  + tick
					+ "&p_dblOverallAtt="  + overallAttack.toFixed(0)
					+ "&p_dblOverallDef="  + overallAttDef.toFixed(0)
					+ "&p_dblLaunchCost="  + launchCost;
			
		// This is a functioning GM_xmlhttpRequest	
		GM_xmlhttpRequest({
			method: 'POST',
			//url: 'http://64.83.50.74/RedOracle1/Service1.asmx/RecordCreatureScan',                                                
			
			url: 'http://64.83.50.74/RedOracle1/Service1.asmx/RecordCreatureScan',                                                
			headers: { 'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': 6
					},
			data: postData
			});
					
		EVO_debug(strResult,99);

        var newRow = table.insertRow(rows.length);
        newRow.title = 'Estimation of att2/def2 with max possible boosts';
        var newCell = newRow.insertCell(0);
        newCell.className = "alt1 b";
        newCell.innerHTML = "Fleets att2/def2<sup>*</sup>";
        newCell = newRow.insertCell(1);
        newCell.innerHTML = (dEvo) ? evoNumber2String(overallAttack.toFixed(0)) + " / " + evoNumber2String(overallAttDef.toFixed(0)) + " (" + evoNumber2String(overallDefDef.toFixed(0)) + ")"
                                   : evoNumber2String(overallAttack.toFixed(0)) + " / " + evoNumber2String(overallAttDef.toFixed(0)) + " (" + evoNumber2String(overallDefDef.toFixed(0)) + ")";
        newRow = table.insertRow(rows.length);
        newRow.title = 'Estimation of Launch Cost (not including Space Elevator or Efficent Breeding Center)';
        newCell = newRow.insertCell(0);
        newCell.className = "alt1 b";
        newCell.innerHTML = "Launch Cost<sup>*</sup>";
        newCell = newRow.insertCell(1);
        newCell.innerHTML = evoNumber2String(launchCost.toFixed(0));
    }
}

//
// Fleets page
//
regPageHandler(/^\/fleets/i,  evoFleets );

function evoFleets(){

			function test()
			{
//				alert("test");
			}

//KCS TESTING
 //
 EVO_debug("Start KCS TESTING",99);
 
 //document.createElement('a');
 
 
				//var aTable;
				var row , i ;
				
				//add a Get Targets Button to the Fleets Status Bar
				var titlerows = document.evaluate("//div[@class='separator title']/span", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var titlerow = titlerows.snapshotItem(0)
				//titlerow.innerHTML = ' <input type="button"  id="GetTargets" value="Get Targets" /> &nbsp' + titlerow.innerHTML
				var strTest = "Trying to get Targets";
				// below works because updateETA is defined as a script I think
//				titlerow.innerHTML = ' <input type="button" id="GetTargets" value="Get Targets" onclick="updateETA(1)" /> ' + titlerow.innerHTML
				
//				alert(strTest);
				
				//titlerow.innerHTML = ' <input type="button" id="GetTargets" value="Get Targets" onclick="document.getElementById(\'massmessaging\').style.display=\'none\';" /> ' + titlerow.innerHTML
				//alert("Trying to Get Targets");
				onclick="document.getElementById(\'massmessaging\').style.display=\'none\';"
				
				EVO_debug("Fleet Status\n" + titlerow.innerHTML,99);
				
				//var launchrows = document.evaluate("//tr[@class='red_bg row1']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				
				var launchrows = document.evaluate("//tr[@class='red_bg row1']/td[2]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				
				
				//alert (launchrows.textContent);
				
			var kcsfleetsTable = null;
			var kcscontents = null;
            //if( dEvo )
            //            fleetsTable = document.evaluate(".//table[preceding-sibling::h2[@class='forum' and text()='Fleet Organisation']][1]",contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
            //else
            kcsfleetsTable = document.evaluate(".//table[preceding-sibling::h1[@class='title' and text()='Fleet Organisation']][1]",document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
            
            
			//kcsfleetsTable = document.evaluate(".//table[preceding-sibling::h1[@class='title' and text()='Fleet Organisation']][1]",document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
			//kcsfleetsTable = document.evaluate(".//table[@class='t_little b']",document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;


              //  for( i = 0; row = kcsfleetsTable.snapshotItem(i); i++ ) {
			//		EVO_debug("Row: "+i + "\n" + row.innerHTML,99);
              //  }


			//var row = kcsfleetsTable.insertRow(kcsfleetsTable.rows.length - 2);
            //updateFleetsAddCell(row, 0, "alt1 b", "Boosts Configuration", "BoostTitlekcs", "Totals");
                                    
				
				//var launchrows = document.evaluate("//table[@class='t_little b']", aTable, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				//var tick = document.evaluate("//div[@id='tickcount']/span/strong", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; // whole sidebar
//var launchrows = document.evaluate(".//tr[td[1]/a]", aTable, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); //

//				rows = document.evaluate(".//tr[td[1]/a]", table, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); //
                
                for( i = 0; row = launchrows.snapshotItem(i); i++ ) {
					EVO_debug("Row: "+i + "\n" + row.innerHTML,99);
					EVO_debug("Row: "+i + "\n" + row.textContent,99);
					
//works					row.innerHTML = row.innerHTML + ' <input type="button" id="clearReceipients" value="Clear" />';
//works					var testfleet = document.getElementById('fleetx1').value;
					EVO_debug("Row: "+i + "\n" + row.innerHTML,99);
					
//works					document.getElementById('fleetx1').value = 5; 
					//alert (testfleet);
					//row.textContent = "1,1,1:A";
                    //    if( row.cells[0].rowSpan > 1 ) break;
                    //    unit = units[row.cells[0].textContent.toLowerCase()];
                    //                var tmpindex = fleetNo * 2 + 1;
                    //    quantity = evoString2Number(row.cells[tmpindex].textContent);
                    //    total += quantity;
                    //    if (isAttack) {
                    //                            baseScore = unit.getAttackScore(quantity)
                    //                } else if  (defenceType=='Defence') {
                    //                            baseScore = unit.getDefDefScore(quantity);
                    //                } else {
                    //                            baseScore = unit.getAttDefScore(quantity);
                     //               }
                     //   noBoostScore += baseScore;
                     //   boost = unit.getBoost();
                     //   maxBoostScore += baseScore * boost * boost;
                }
                //row.cells[0].rowSpan = 13;
                

EVO_debug("END KCS TESTING",99);
//END KCS TESTING


/*

		var postData = "";
		var strTargets = "";
				GM_xmlhttpRequest({
					method: 'POST',
					url: 'http://64.83.50.74/RedOracle1/Service1.asmx/GetTargets',                                                
					headers: { 'Content-Type': 'application/x-www-form-urlencoded',
							'Content-Length': 6
							},
					data: postData,
					onload: function(responseDetails) {
						alert('Request returned status = ' + responseDetails.status + ' status text = ' + responseDetails.statusText  
							+ ' response headers = ' + responseDetails.responseHeaders 
							+ ' response text = ' + responseDetails.responseText);
						strTargets = responseDetails.responseText;							
						}
					});

*/


EVO_debug("Begin fleets",99);
// added the "cellID" argument, in order to put it to the DIV
        function updateFleetsAddCell(row, cellIndex, className, scores, cellID, lineType){
EVO_debug("Begin updateFleetsAddCell");
//alert ( " row " + row + " cell " + cellIndex + " class " + className + " score " + scores + " cellID " + cellID + " linetype" + lineType);
                var cell = row.insertCell(cellIndex);
                    cell.className = className;
                        cell.style.textAlign = 'center';
                        cell.colSpan = 2;

                        if (lineType == 'Totals') {
                        if (cellIndex > 0) {
                                cell.id = cellID;
                                cell.style.fontSize = "12px";
                                cell.textContent = evoNumber2String(scores[1]); //kcsnote
                                cell.title = 'Unboosted: ' + evoNumber2String(scores[0]);

                        } else {
                                cell.innerHTML = scores; // cell title actually
                        }
                        } else if (lineType == 'BoostConf') {
                                    if (cellIndex > 0) {
                                            cell.style.fontSize = "12px";
                                                cell.id = cellID;
                                cell.title = 'Fleet ' + cellIndex + ' Boosts Configuration';
                                                var formMode = document.createElement('FORM');
                                                var attackMode = document.createElement('INPUT');
                                                var defenceMode = document.createElement('INPUT');
                                                formMode.name = 'frmFleet' + cellIndex;
                                                attackMode.type = 'radio';
                                                attackMode.label = 'Defence Boosts while Attacking';
                                                attackMode.name = 'DB';
                                                //attackMode.setAttribute('onClick', 'alert(this.form.name + " " + this.value);');
                                                attackMode.setAttribute('checked', 'checked');
                                                attackMode.value = 'Attack';
                                                defenceMode.type = 'radio';
                                                defenceMode.label = 'Defence Boosts while Defending';
                                                defenceMode.name = 'DB';
                                                defenceMode.value = 'Defence';
                                                //defenceMode.setAttribute('onClick', 'alert(this.form.name + " " + this.value);');
                                                cell.appendChild(formMode);
                                                formMode.appendChild(attackMode);
                                                formMode.appendChild(document.createTextNode('Def Boosts (Att)'));
                                                formMode.appendChild(document.createElement('br'));
                                                formMode.appendChild(defenceMode);
                                                formMode.appendChild(document.createTextNode('Def Boosts (Def)'));
                                                defenceMode.addEventListener('click',changeDefenceScore, false);
                                                attackMode.addEventListener('click',changeDefenceScore, false);
                                    } else {
                                cell.innerHTML = scores; // cell title actually
                                    }
                        }
        }

        function getFleetScore(fleetNo, table, isAttack, defenceType){
EVO_debug("Begin getFleetScore");
                var rows, row
                var unit, quantity, total = 0;
                var i, j, baseScore, boost, noBoostScore = 0, maxBoostScore = 0;
                rows = document.evaluate(".//tr[td[1]/a]", table, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); //
                for( i = 0; row = rows.snapshotItem(i); i++ ) {
//EVO_debug("Row: "+i + "\n" + row.innerHTML);
                        if( row.cells[0].rowSpan > 1 ) break;
                        unit = units[row.cells[0].textContent.toLowerCase()];
                                    var tmpindex = fleetNo * 2 + 1;
                        quantity = evoString2Number(row.cells[tmpindex].textContent);
                        total += quantity;
                        if (isAttack) {
                                                baseScore = unit.getAttackScore(quantity)
                                    } else if  (defenceType=='Defence') {
                                                baseScore = unit.getDefDefScore(quantity);
                                    } else {
                                                baseScore = unit.getAttDefScore(quantity);
                                    }
                        noBoostScore += baseScore;
                        boost = unit.getBoost();
                        maxBoostScore += baseScore * boost * boost;
                }
                row.cells[0].rowSpan = 13;
                if (sumRow) {
                  var cell = sumRow.cells[1 + parseInt(fleetNo)];
                  cell.textContent = total;
                  cell.style.textAlign = 'center';
                  cell.style.fontSize = '12px';                  
                }
EVO_debug("Exit updateFleetsAddRow");
                return new Array(Math.round(noBoostScore), Math.round(maxBoostScore))
        }

            function changeDefenceScore() {
                        if( dEvo )
                                    fleetsTable = document.evaluate(".//table[preceding-sibling::h2[@class='forum' and text()='Fleet Organisation']][1]",contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
                        else
                                    fleetsTable = document.evaluate(".//table[preceding-sibling::h1[@class='title' and text()='Fleet Organisation']][1]",contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
                        var fleetno = this.form.name.substring(8);
                        var deftype = this.value;
                        var fleetvals = getFleetScore(fleetno, fleetsTable, false, deftype);
                        var fleetDef = fleetvals[1];
                        var fleetCel = document.getElementById('Fleet' + fleetno + '_Defence');

                        fleetCel.textContent = evoNumber2String(fleetDef);
                        return false;
            }

        function updateFleetsAddRow(fleetsTable, isAttack, lineType){
EVO_debug("Begin updateFleetsAddRow");
                        if (lineType == 'Totals') {
                            var row = fleetsTable.insertRow(fleetsTable.rows.length - 2);
                    updateFleetsAddCell(row, 0, "alt1 b", (isAttack ? "Attack" : "Defence") + '<br /><span id="' + (isAttack ? "Attack" : "Defence") + '_title" style="font-size:smaller; font-weight: normal">(estimation w/ max boost)</span>', "Fleet1_" + (isAttack ? "Attack" : "Defence"), lineType);
                        updateFleetsAddCell(row, 1, "red_bg", getFleetScore(1, fleetsTable, isAttack), 
                                                "Fleet1_" + (isAttack ? "Attack" : "Defence"), lineType);
                        updateFleetsAddCell(row, 2, "yellow_bg", getFleetScore(2, fleetsTable, isAttack), "Fleet2_" + (isAttack ? "Attack" : "Defence"), lineType);
                        updateFleetsAddCell(row, 3, "green_bg", getFleetScore(3, fleetsTable, isAttack), "Fleet3_" + (isAttack ? "Attack" : "Defence"), lineType);
                        } else if (lineType == 'BoostConf') {
                        var row = fleetsTable.insertRow(fleetsTable.rows.length - 2);
                                    updateFleetsAddCell(row, 0, "alt1 b", "Boosts Configuration", "BoostTitle", lineType);
                                    updateFleetsAddCell(row, 1, "red_bg", "test", "Fleet1BoostConf", lineType);
                                    updateFleetsAddCell(row, 2, "yellow_bg", "test", "Fleet2BoostConf", lineType);
                                    updateFleetsAddCell(row, 3, "green_bg", "test", "Fleet3BoostConf", lineType);
                        }
        }

        var fleetsTable = null;
//          var fleetsTable = document.evaluate(".//table[../h2[contains(.,'Fleet Organisation')]]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

            if( dEvo )
                        fleetsTable = document.evaluate(".//table[preceding-sibling::h2[@class='forum' and text()='Fleet Organisation']][1]",contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
            else
                        fleetsTable = document.evaluate(".//table[preceding-sibling::h1[@class='title' and text()='Fleet Organisation']][1]",contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

        // add row for fleet counts
//EVO_debug("Fleets Table: " + fleetsTable.innerHTML);

//kcs

// Counting Fleet Sizes
	// Balancing act
	// This is a huge hack... but oh well, it works :P

	var FleetOne = 0; var FleetTwo = 0; var FleetThree= 0;
	
	for(q=1; q <= fleetsTable.rows.length-13; q++) {
	FleetOne += Number(fleetsTable.rows[q].cells[3].textContent);
	}
	
	for(q=1; q <= fleetsTable.rows.length-13; q++) {
	FleetTwo += Number(fleetsTable.rows[q].cells[5].textContent);
	}
	
	for(q=1; q <= fleetsTable.rows.length-13; q++) {
	FleetThree += Number(fleetsTable.rows[q].cells[7].textContent);
	}
	
	if(FleetOne > FleetTwo) {
		if(FleetOne > FleetThree) maxSize = FleetOne;
		else maxSize = FleetThree;
	}
	else {
		if(FleetTwo > FleetThree) maxSize = FleetTwo;
		else maxSize = FleetThree;
	}


//


        var sumRow = document.evaluate(".//tr[td[position()=1 and text()='Move to']]", fleetsTable, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
        if (sumRow) {
          sumRow = fleetsTable.insertRow(sumRow.rowIndex);
          sumRow.innerHTML = '<td class="alt1 b">Delta</td><td class="alt2" colspan="2"></td><td class="red_bg" colspan="2"></td><td class="yellow_bg" colspan="2"></td><td class="green_bg" colspan="2"></td>';
          
        
			if (sumRow) {
				var cell = sumRow.cells[2];
				cell.textContent = maxSize - FleetOne  ;
				cell.style.textAlign = 'center';
				cell.style.fontSize = '12px';

				var cell = sumRow.cells[3];
				cell.textContent = maxSize - FleetTwo  ;
				cell.style.textAlign = 'center';
				cell.style.fontSize = '12px';

				var cell = sumRow.cells[4];
				cell.textContent = maxSize - FleetThree  ;
				cell.style.textAlign = 'center';
				cell.style.fontSize = '12px';

			}

          sumRow = fleetsTable.insertRow(sumRow.rowIndex+1);
          sumRow.innerHTML = '<td class="alt1 b">Total Crits</td><td class="alt2" colspan="2"></td><td class="red_bg" colspan="2"></td><td class="yellow_bg" colspan="2"></td><td class="green_bg" colspan="2"></td>';


        }
    

    updateFleetsAddRow(fleetsTable, true, 'Totals');
    updateFleetsAddRow(fleetsTable, false, 'Totals');
    updateFleetsAddRow(fleetsTable, false, 'BoostConf');


                

    
    var onBlur = function(e) { evoSetCookie(e.target.name,e.target.value,48); };
    var f_x,f_y,f_z,f_c,f_m,f_sch,f_hr,f_min;
    var alle=true;
        
    for(var j=1; j <= 3;j++) {
        f_x=(f_x=document.getElementsByName("f_x["+j+"]"))?f_x[0]:null;
        f_y=(f_y=document.getElementsByName("f_y["+j+"]"))?f_y[0]:null;
        f_z=(f_z=document.getElementsByName("f_z["+j+"]"))?f_z[0]:null;
        f_c=(f_c=document.getElementsByName("f_c["+j+"]"))?f_c[0]:null;
        f_m=(f_m=document.getElementsByName("f_mission["+j+"]"))?f_m[0]:null;
        if(f_x && f_y && f_z) { 
            alle=true;
            f_x.addEventListener('blur', onBlur, false);
            f_y.addEventListener('blur', onBlur, false);
            f_z.addEventListener('blur', onBlur, false);
            f_c.addEventListener('blur', onBlur, false);
            f_m.addEventListener('blur', onBlur, false);

            f_x.value = evoGetCookie(f_x.name,null);
            f_y.value = evoGetCookie(f_y.name,null);
            f_z.value = evoGetCookie(f_z.name,null);
            f_c.value = evoGetCookie(f_c.name,null);
            f_m.value = evoGetCookie(f_m.name,null);
        } else continue;
        
        if (evoGetCookie('EnableTimer',true)) {
          var spantext = '';
          spantext += ' at <input type=text size=2 maxlength=2 style="width: 20px" id=f_hr['+j+']>';
          spantext += ':';
          spantext += '<input type=text size=2 maxlength=2 style="width: 20px" id=f_min['+j+']>&nbsp;';
  
          var span = document.createElement('SPAN');
          span.innerHTML = spantext;
  
          f_x.parentNode.appendChild(span);
          f_hr=unsafeWindow.document.getElementById("f_hr["+j+"]");
          f_min=unsafeWindow.document.getElementById("f_min["+j+"]");
          f_hr.onblur=f_min.onblur=function(e) {
              evoSetCookie(e.target.id,e.target.value,48);
          }
          f_hr.value = evoGetCookie(f_hr.id,null);
          f_min.value = evoGetCookie(f_min.id,null);
          var span2 = document.createElement('SPAN');
          span2.style.display = 'none';
  
          f_x.parentNode.appendChild(span2);
  
          f_sch = unsafeWindow.document.createElement('INPUT');
          f_sch.type = 'button';
          f_sch.id= 'f_sch[' + j + ']';
          f_sch.value ='Set Alert';
          f_sch.visible = false;
          span.appendChild(f_sch);
  
          f_sch=unsafeWindow.document.getElementById("f_sch[" + j + "]");
          //var l;
          //f_sch.formDispatcher = l;
          f_sch.lIndex = j;
          f_sch.statusBar = span2;
          f_sch.onclick= function(e) {
              var f_sch = e.target;
              var f_hr, f_min;
  
              f_hr=document.getElementById("f_hr["+f_sch.lIndex+"]");
              f_min=document.getElementById("f_min["+f_sch.lIndex+"]");
  
              if(f_hr && f_min)
              {
                  f_hr = parseInt(f_hr.value);
                  f_min = parseInt(f_min.value);
                  if(isNaN(f_hr) || isNaN(f_min))
                  {
                      alert('Please enter the launch time in hh:mm format using GMT');
                      return;
                  }
                  var newDate = new Date();
                  var curDate = new Date();
                  newDate.setHours(f_hr, f_min-newDate.getTimezoneOffset(), 0);
                  if(newDate < curDate) newDate.setDate(newDate.getDate()+1);
                  //if(confirm('Fleet ' + f_sch.lIndex + ' will launch on ' + newDate + '\n\nWarning: Make sure you enter the coordinates and objectives properly.\n\nClick Ok to proceed\nClick Cancel to Abort') == false)return;
  
                  f_sch.fireDate = newDate;
                  f_sch.ticker = setInterval('evoTimer("'+f_sch.lIndex+'")',1000);
                  f_sch.statusBar.style.display = '';
  
                  f_sch.parentNode.style.display = 'none';
              }
              e.cancelBubble = true;e.returnValue=false;
  
              return false;
          } // end f_sch.onclick
        } // end Launch Timer
        
        
    }
}
EVO_debug("Setup Evo Timer");
unsafeWindow.evoTimer = function(idx)
{
    var s=unsafeWindow.document.getElementById("f_sch["+idx+"]");
    var curDate = new Date();
    if (s.fireDate <= curDate)
    {
        s.statusBar.innerHTML = ' Time to Launch...';
        alert("It's Time to Launch fleet "+idx);
        clearInterval(s.ticker);
    }
    else
    {
        var sb = s.statusBar;
        var ld = new Date(s.fireDate); ld.setHours(0,0,0,0);
        var cd = new Date(); cd.setHours(0,0,0,0);
        var dd = (ld-cd)/1000/60/60;
        var dh = (dd + (s.fireDate.getHours() - curDate.getHours()));
        var dm = (s.fireDate.getMinutes() - curDate.getMinutes());
        var ds = (s.fireDate.getSeconds() - curDate.getSeconds());
        if(dm < 0){dh--;dm += 60;}
        //var dif = new Date(s.fireDate - curDate);
        if(dh == 0) {
            if (dm <= 6 && ds < 0) {dm--; ds+=60;}
            if (dm > 5) {
                sb.innerHTML = ' - Should launch in ' + dm + 'm';
            } else {
                sb.innerHTML = ' - Should launch in ' + dm + 'm and '+ds+'s';
            }
        } else {
            sb.innerHTML = ' - Should launch in ' + dh + 'h and '+dm+'m';
        }
    }

    //('-->' + s.fireDate);
    //s.value = 'hola';
    //alert('');
}
//
// Inventory Page
//
regPageHandler(/^\/inventory/i,  FleetCalc );
function FleetCalc()
{
EVO_debug("Begin inventory");
    var Attack = new Array();
    var Defense = new Array();
    var DefenseDef = new Array();
    var Food = new Array();
    allTitles = document.evaluate("//div[contains(@class,'title')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    tCritters = document.evaluate(".//table[@class='t_little']",allTitles.snapshotItem(0).nextSibling,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null)
    Attack[0]=Attack[1]=Attack[2]=Attack[3]=
      Defense[0]=Defense[1]=Defense[2]=Defense[3]=
      DefenseDef[0]=DefenseDef[1]=DefenseDef[2]=DefenseDef[3]=
      Food[0]=Food[1]=Food[2]=Food[3]=0;
EVO_debug("Creature Count: "+tCritters.snapshotLength);
    for (iter = 0; iter < tCritters.snapshotLength; iter++) {
EVO_debug("Creature#: "+iter);
        creature = tCritters.snapshotItem(iter);
        name = creature.rows[0].cells[1].textContent.split("\t").join("").split("\n").join("").split(" ").join("").toLowerCase();
EVO_debug("Name: "+name);
        spans= creature.rows[2].getElementsByTagName('span');
        if (units[name]==undefined) continue;
        unit=units[name];
        for (jter=0;jter<spans.length;jter++) {
EVO_debug("Stat#: "+jter);
            stats = spans[jter].textContent+spans[jter].nextSibling.textContent;
            stats = stats.split(" ").join("").split("%").join("").split(":").join(",").split("x").join(",").split(",");
            if (isNaN(stats[0]-0)) {
                count=creature.rows[1].cells[0].textContent;
                start = 0;
            } else {
                count = stats[0];
                start = 1
            }
            fleet=0;
            offBoost=defBoost=1;
            for (stat=start; stat<stats.length; stat+=2) {
                if (stats[stat]=="Fleet") {
                    fleet = stats[stat+1];
                } else if (stats[stat]=="OffBoost") {
                    offBoost += stats[stat+1]/100;
                } else if (stats[stat]=="DefBoost") {
                    defBoost += stats[stat+1]/100;
                }
            }
            Attack[fleet] += unit.getAttackScore(count)*offBoost*offBoost;
            Defense[fleet] += unit.getAttDefScore(count)*defBoost*defBoost;
            DefenseDef[fleet] += unit.getDefDefScore(count)*defBoost*defBoost;
            Food[fleet]+=unit.getFoodCost(count);
        }
        if (spans.length==0) {
            count =creature.rows[1].cells[0].textContent;
            stats=creature.rows[2].getElementsByTagName('TD')[0]
            if (stats.getElementsByTagName('span').length>0) stats = stats.getElementsByTagName('span')[0];
            stats= stats.textContent.split("\t").join("").split("\n").join("").split(" ").join("").split("%").join("").split(":").join(",").split(",");
            fleet=0;
            offBoost=defBoost=1;
            for (stat=0; stat<stats.length; stat+=2) {
                if (stats[stat]=="Fleet") {
                    fleet = stats[stat+1];
                } else if (stats[stat]=="OffBoost") {
                    offBoost += stats[stat+1]/100;
                } else if (stats[stat]=="DefBoost") {
                    defBoost += stats[stat+1]/100;
                }
            }
            Attack[fleet] += unit.getAttackScore(count)*offBoost*offBoost;
            Defense[fleet] += unit.getAttDefScore(count)*defBoost*defBoost;
            DefenseDef[fleet] += unit.getDefDefScore(count)*defBoost*defBoost;
            Food[fleet]+=unit.getFoodCost(count);
        }
    }
EVO_debug("here");
    tCritters = document.evaluate(".//table[@class='t_little']",allTitles.snapshotItem(1).nextSibling,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null)
    fleet=0;
    for (iter = 0; iter < tCritters.snapshotLength; iter++) {
EVO_debug("Item#: "+iter);
        creature = tCritters.snapshotItem(iter);
        name = creature.rows[0].cells[1].textContent.split("\t").join("").split("\n").join("").split(" ").join("").toLowerCase();
EVO_debug("Name: "+name);
        if (units[name]==undefined) continue;
        unit=units[name];
        count =creature.rows[1].cells[0].textContent;
        Attack[fleet] += unit.getAttackScore(count);
        Defense[fleet] += unit.getAttDefScore(count);
	DefenseDef[fleet] += unit.getDefDefScore(count);
        Food[fleet]+=unit.getFoodCost(count);
    }
EVO_debug("Exit Loops");
    if (evoGetCookie("userTech","0:0:0:0:0:0:0:0").split(":")[ET_SEL]*true) {
      for (iter = 0; iter < Food.length; iter++) {
        Food[iter]*=.95;
      }
    }
    var newspan=document.createElement('SPAN');
    spantext="<DIV class=title>Fleet Status</div>";
    spantext+="<table width=100% cellspacing=2 cellpadding=0 border=0><tbody><tr><td class=row2>";
    spantext+="<table width=100% cellspacing=0 cellpadding=0 border=0 class=t_little><tbody>";
    spantext+="<tr align=right class=row2><td colspan=2><b>Attack</b></td><td><b>Defense(Att)<br>Defence(Def)</b></td><td><b>Food</b></td><td><b>land</b></td></tr>";
    spantext+="<tr align=right class=row1><th align=left>Home</th><td>"+evoNumber2String(Attack[0].toFixed(0))+"</td><td>"+evoNumber2String(Defense[0].toFixed(0))+"<br>"+evoNumber2String(DefenseDef[0].toFixed(0))+"</td><td>"+evoNumber2String(Food[0].toFixed(0))+"</td></tr>";
    spantext+="<tr align=right class=row2><th align=left>Fleet 1</th><td>"+evoNumber2String(Attack[1].toFixed(0))+"</td><td>"+evoNumber2String(Defense[1].toFixed(0))+"<br>"+evoNumber2String(DefenseDef[1].toFixed(0))+"</td><td>"+evoNumber2String(Food[1].toFixed(0))+"</td></tr>";
    spantext+="<tr align=right class=row1><th align=left>Fleet 2</th><td>"+evoNumber2String(Attack[2].toFixed(0))+"</td><td>"+evoNumber2String(Defense[2].toFixed(0))+"<br>"+evoNumber2String(DefenseDef[2].toFixed(0))+"</td><td>"+evoNumber2String(Food[2].toFixed(0))+"</td></tr>";
    spantext+="<tr align=right class=row2><th align=left>Fleet 3</th><td>"+evoNumber2String(Attack[3].toFixed(0))+"</td><td>"+evoNumber2String(Defense[3].toFixed(0))+"<br>"+evoNumber2String(DefenseDef[3].toFixed(0))+"</td><td>"+evoNumber2String(Food[3].toFixed(0))+"</td></tr>";
    spantext+="<tr align=right class=row1><th align=left>All Fleets</th><td>"+evoNumber2String((Attack[1]+Attack[2]+Attack[3]).toFixed(0))
    +"</td><td>"+evoNumber2String((Defense[1]+Defense[2]+Defense[3]).toFixed(0))
    +"<br>"+evoNumber2String((DefenseDef[1]+DefenseDef[2]+DefenseDef[3]).toFixed(0))
    +"</td><td>"+evoNumber2String((Food[1]+Food[2]+Food[3]).toFixed(0))+"</td></tr>";
    spantext+="<tr align=right class=row2><th align=left>Total</th><td>"+evoNumber2String((Attack[0]+Attack[1]+Attack[2]+Attack[3]).toFixed(0))
    +"</td><td>"+evoNumber2String((Defense[0]+Defense[1]+Defense[2]+Defense[3]).toFixed(0))
    +"<br>"+evoNumber2String((DefenseDef[0]+DefenseDef[1]+DefenseDef[2]+DefenseDef[3]).toFixed(0))
    +"</td><td>"+evoNumber2String((Food[0]+Food[1]+Food[2]+Food[3]).toFixed(0))+"</td><td>"+evoNumber2String(Math.ceil((((Food[0]+Food[1]+Food[2]+Food[3]).toFixed(0)/21)-800)/200))+"</td></tr>";
    spantext+="</tbody></table></td></tr></tbody></table>";
    newspan.innerHTML=spantext;
    allTitles.snapshotItem(1).parentNode.appendChild(newspan);
}

//
// News page
//


function removePlayerInfo(plNode) {
	var tmptext;
	tarnodes = xpath('.//a[contains(@onclick, "return continentBox")]', plNode, false);
//alert('Found ' + tarnodes.snapshotLength + ' players.');
	for (i=0; i < tarnodes.snapshotLength; i++) {
		plNode = tarnodes.snapshotItem(i);
		parNode = plNode.parentNode;
		tmptext = plNode.textContent;
		parNode.removeChild(plNode);
		parNode.textContent = tmptext;
	}
}

function removeHeaderInfo(plNode) {
	var tmptext;
	tarnodes = xpath('.//input', plNode, false);
	for (i=0; i < tarnodes.snapshotLength; i++) {
		plNode = tarnodes.snapshotItem(i);
		parNode = plNode.parentNode;
		parNode.removeChild(plNode);
	}
}

// Information/News

regPageHandler(/^\/news/i,  evoNews );
function evoNews() {
	EVO_debug("ENTER evoNews",299);
    function addCell(row, cellIndex, attributes, html) {
                var cell = row.insertCell(cellIndex);
                if (attributes)
                            for (var i = 0; i < attributes.length; i++)
                                        cell.setAttribute(attributes[i][0], attributes[i][1]);
                if (html) cell.innerHTML = html;
                return cell;
    }

// Create the Form
EVO_debug("B4 Create Form ",299);
    // find the Table where news exists
    var newsTable = document.evaluate(".//table[preceding-sibling::h1[@class='title' and text()='Continental News']]", contents, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    newsTable.setAttribute('id', 'newsTable');
    // also the parent element of the news table
    var newsTableParent = newsTable.parentNode;

    // create a clone of the news table
    var newsTableClone = newsTable.cloneNode(true);

    // create the Form and put all the required attributes
    var newsForm = document.createElement('FORM');
    newsForm.name = 'news_posting';
    newsForm.method = 'post';
    newsForm.action = REDFORUM_URL + POST_NEWS;

    // Create the Button
    var formButton = document.createElement('INPUT');
    formButton.type = "submit";
    formButton.value = "Publish News";
    var formButtonTop = formButton.cloneNode(true);
    // Add the News-clone in the Form as a child and the Post Button
    newsForm.appendChild(newsTableClone);
    newsForm.appendChild(formButton);

    // Create a test button
    var btnCopy = document.createElement('input');
    btnCopy.type = "button";
    btnCopy.value = "copy HTML";
//            btnCopy.setAttribute('newsTable', newsTable);
    btnCopy.addEventListener('click', function(e) {
	var newsTable = document.getElementById('newsTable');
	var totalchecked = 0;
	var cloneTable = document.createElement('table');
	var cloneTbody = document.createElement('tbody');
	cloneTable.appendChild(cloneTbody);

	for (i=0; i < newsTable.rows.length; i++) {
		if (newsTable.rows[i].cells.length > 1) {
			if (newsTable.rows[i].cells[0].firstChild.nextSibling.checked) {
				var cloneHeadrow = newsTable.rows[i].cloneNode(true);
				cloneHeadrow.firstChild.removeChild(cloneHeadrow.firstChild.firstChild);
				var cloneBodyrow = newsTable.rows[i+1].cloneNode(true);
				cloneTbody.appendChild(cloneHeadrow);
				cloneTbody.appendChild(cloneBodyrow);
				removePlayerInfo(cloneBodyrow);
				removeHeaderInfo(cloneHeadrow);
				totalchecked++;
			}
		}
	}
	var test = cloneTable.innerHTML;
//		test = test.replace('&', '&amp;', 'g');
//		test = test.replace('<', '&lt;', 'g');
//		test = test.replace('>', '&gt;', 'g');
//		test = test.replace('"', '&quot;' ,'g');
//		test = test.replace("'", '&apos;', 'g');
	test = test.replace('&nbsp;', ' ', 'g');
	test = test.replace('\t', ' ', 'g');
	test = test.replace('\n', ' ', 'g');
	var viewerDiv = document.createElement('div');
	viewerDiv.style.position = 'absolute';
	viewerDiv.style.top = '80px';
	viewerDiv.style.left = '200px';
//		viewerDiv.style.overflow = 'scroll';
	viewerDiv.style.width = '600px';
	viewerDiv.style.height = '402px';
	viewerDiv.style.background = 'black';
	viewerDiv.style.border = '2px';
	var headDiv = document.createElement('div');
	headDiv.style.background = 'grey';
	headDiv.style.height = '18px';
	var btnclose = document.createElement('div');
//			btnclose.type = 'button';
	btnclose.style.width = '20px';
	btnclose.style.position = 'relative';
	btnclose.style.right = '0px';
	btnclose.style.textAlign = 'right';
//			btnclose.style.float = 'right';
//			btnclose.setAttribute('value','[X]');
	btnclose.textContent = '[x]';
	headDiv.appendChild(btnclose);
	viewerDiv.appendChild(headDiv);
	btnclose.setAttribute('onclick', 'this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)');
	btnclose.setAttribute('onmouseover', 'this.style.cursor="pointer";')
	var targetText = document.createElement('textarea');
	viewerDiv.appendChild(targetText);
	targetText.setAttribute('rows','40');
	targetText.setAttribute('cols', '80');
	targetText.style.height = '380px';
	targetText.style.width = '596px;';
	targetText.style.left = '2px';
	targetText.setAttribute('multiline','multiline');
	contents.appendChild(viewerDiv);

	targetText.textContent = "<table width='100%'>" + test + "</table>";
//		alert (test);
//		GM_openInTab("data:text/html;charset=UTF-8," + "<html><head><title>HTML for reporting</title></head><body><table width='100%'>" + test + "</table></body></html>"); //encodeURI(
//		alert ('You have ' + totalchecked + ' items checked.');
	}, false);

            // and replace the News table, with the Form, that has the News table in it
            newsTableParent.replaceChild(newsForm, newsTable);
            newsTableParent=null;
            newsTable = newsTableClone;
            var newsItems = document.evaluate(".//td[position()=1 and starts-with(.,'Subj')]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            var newsItem;

            // add a checkbox which applies to all checkboxes
            var CheckAllRow = newsTable.insertRow(0);
            var ContentCell = CheckAllRow.insertCell(0);
            ContentCell.colSpan = 3;
            var CheckAllCheckbox = document.createElement('INPUT');
            CheckAllCheckbox.type = 'checkbox';
            CheckAllCheckbox.name = 'checkallnews';
            CheckAllCheckbox.checked = false;
            CheckAllCheckbox.setAttribute('title', 'Select/Deselect all items');

            CheckAllCheckbox.addEventListener('click',HandleCheckBoxes, false);

            // add a '-/+' button, which applies to all -/+ buttons
            var showhideCtrlAllimg = document.createElement('img');
            showhideCtrlAllimg.src = img_icn_minus.src; //'http://img221.imageshack.us/img221/9049/minusvt8.gif';
            showhideCtrlAllimg.border = 0;
            showhideCtrlAllimg.style.height = '12px';
            showhideCtrlAllimg.style.width = '12px';
            showhideCtrlAllimg.setAttribute('value', 'visible');
            showhideCtrlAllimg.style.cursor = "pointer";
            showhideCtrlAllimg.setAttribute('alt', 'Show/Hide all items');            
            showhideCtrlAllimg.setAttribute('title', 'Show/Hide all items');          
            showhideCtrlAllimg.setAttribute('visible', 'true');      
            showhideCtrlAllimg.addEventListener('click', ShowHideAll, false);

            // Create a dropdown box for filtering
            var filterBox = document.createElement('select');
            var newOpt = new Option('All News Items', '*');
            var selLength = filterBox.length;
            filterBox.options[selLength] = newOpt;
            var newOpt = new Option('Battle Reports', 'BR');
            var selLength = filterBox.length;
            filterBox.options[selLength] = newOpt;
            var newOpt = new Option('Research Reports', 'RR');
            var selLength = filterBox.length;
            filterBox.options[selLength] = newOpt;
            var newOpt = new Option('Develop Reports', 'DR');
            var selLength = filterBox.length;
            filterBox.options[selLength] = newOpt;
            var newOpt = new Option('Ambassador Reports', 'AR');
            var selLength = filterBox.length;
            filterBox.options[selLength] = newOpt;
EVO_debug("End Create Form ",299);


            // Handler to Show/Hide all news items
            function ShowHideAll(e) {
                        var action = (this.getAttribute('visible') == 'true') ? "hide" : "show";
                        var textConfirm = "Are you sure you want to ";
                        textConfirm += action;
                        textConfirm += " all the News Items?";
                        if(!confirm(textConfirm)) {
                                    return false;
EVO_debug("Cancelled hiding/showing all items",299);
                        } else {
                                    var allnews = xpath('.//tr[@visible]', contents, false);
                                    for (var i = 0; i < allnews.snapshotLength; i++) {
                                                newItem = allnews.snapshotItem(i);
                                                switch(action) {
                                                            case 'show':
                                                                        e.target.setAttribute('alt', 'Show all items');
                                                                        e.target.setAttribute('title', 'Show all items');
                                                                        e.target.src = img_icn_minus.src;
                                                                        e.target.setAttribute('visible', 'true');
                                                                        newItem.setAttribute('visible', 'true');
                                                                        newItem.style.display = '';
                                                                        newItem.previousSibling.firstChild.firstChild.src = e.target.src;
                                                                        newItem.previousSibling.firstChild.firstChild.setAttribute('alt', 'Show this item');
                                                                        newItem.previousSibling.firstChild.firstChild.setAttribute('title', 'Show this item');
                                                                        break;
                                                            case 'hide':
                                                                        e.target.setAttribute('alt', 'Hide all items');
                                                                        e.target.setAttribute('title', 'Hide all items');
                                                                        e.target.src = img_icn_plus.src;
                                                                        e.target.setAttribute('visible', 'false');
                                                                        newItem.setAttribute('visible', 'false');
                                                                        newItem.style.display = 'none';
                                                                        newItem.previousSibling.firstChild.firstChild.src = e.target.src;
//                                                                        newItem.previousSibling.firstChild.firstChild.setAttribute('alt', 'Hide this item');
//                                                                        newItem.previousSibling.firstChild.firstChild.setAttribute('title', 'Hide this item');
                                                                        break;
                                                }
                                    }
                        }
            }                                               


            // Handler to Check/Uncheck all checkboxes created
            function HandleCheckBoxes(e) {
                        // Confirm that the user wanted to check/uncheck the checkboxes
                        var textConfirm = "Are you sure you want to ";
                        textConfirm += (this.checked) ? "select" : "unselect";
                        textConfirm += " all the News Items?";
                        if(!confirm(textConfirm)) {
                                    e.preventDefault();

EVO_debug("Cancelled the Check/Uncheck all action",99);

                        } else {

EVO_debug("Starting the loop, with the checkbox " + this.checked);

                                    for (i = 0; i < this.form.elements.length; i++) {
                                                if (this.form.elements[i].type == 'checkbox' && this.form.elements[i].name != 'checkallnews') {
                                                            //this.form.elements[i].checked = this.checked;
                                                            this.form.elements[i].click();
                                                }
                                    }
                        }
EVO_debug("Exiting the loop, with the checkbox " + this.checked);
            }


            function NewsCheckBox() {
                if (this.checked) {
                    this.form.elements['frmSubject' + this.value].value = this.parentNode.parentNode.childNodes[1].innerHTML;
                    this.form.elements['frmDate' + this.value].value = this.parentNode.parentNode.childNodes[3].innerHTML;
                    var clone = this.parentNode.parentNode.cloneNode(true);
                    clone.firstChild.removeChild(clone.firstChild.firstChild);
                    clone.firstChild.removeChild(clone.firstChild.firstChild);
                    this.form.elements['frmContent' + this.value].value = '<tr class=\'t_little b\'>' + clone.innerHTML + //this.parentNode.parentNode.innerHTML +
						'</tr><tr>' + this.parentNode.parentNode.nextSibling.innerHTML + '</tr>';
                    clone = null;
//                          this.form.elements['frmContent' + this.value].value = + this.parentNode.parentNode.nextSibling.childNodes[0].innerHTML;
                } else {
                    this.form.elements['frmSubject' + this.value].value = "";
                    this.form.elements['frmDate' + this.value].value = "";
                    this.form.elements['frmContent' + this.value].value = "";
                }
                return false;
            }



            ContentCell.appendChild(showhideCtrlAllimg);
            ContentCell.appendChild(CheckAllCheckbox);
//          ContentCell.appendChild(ContentCellText);
            ContentCell.appendChild(formButtonTop);
            ContentCell.appendChild(btnCopy);
            ContentCell.appendChild(filterBox);

EVO_debug("Looping through News Items...",99);
            for (var i = 0; i < newsItems.snapshotLength; i++) {
                        newsItem = newsItems.snapshotItem(i);
                        var newsCheck = document.createElement('INPUT');
                        newsCheck.type = 'checkbox';
                        newsCheck.name = 'news_item';
                        newsCheck.value = i;
                        newsCheck.setAttribute('title', 'Select/Deselect this item');
                        newsCheck.addEventListener('click',NewsCheckBox, false);

                        var newSubjField = document.createElement('INPUT');
                        var newDateField = document.createElement('INPUT');
                        var newContentField = document.createElement('INPUT');
                        newSubjField.type = "hidden";
                        newDateField.type = "hidden";
                        newContentField.type = "hidden";
                        newSubjField.name = "frmSubject" + i;
                        newDateField.name = "frmDate" + i;
                        newContentField.name = "frmContent" + i;
                        newSubjField.value = "";
                        newDateField.value = "";
                        newContentField.value = "";

                        var showhideCtrlimg = document.createElement('img');
                        showhideCtrlimg.src = img_icn_minus.src; //'http://img221.imageshack.us/img221/9049/minusvt8.gif';
                        showhideCtrlimg.border = 0;
                        showhideCtrlimg.style.height = '12px';
                        showhideCtrlimg.style.width = '12px';
                        showhideCtrlimg.style.cursor = "pointer";
                        showhideCtrlimg.setAttribute('alt', 'Hide this item');
                        showhideCtrlimg.setAttribute('title', 'Hide this item');

                        newsItem.insertBefore(newsCheck,newsItem.lastChild);
                        newsItem.insertBefore(showhideCtrlimg, newsCheck);
                        newsItem.appendChild(newSubjField);
                        newsItem.appendChild(newDateField);
                        newsItem.appendChild(newContentField);
                        showhideCtrlimg.addEventListener('click', function(e) {
                            var newsitemrow = e.target.parentNode.parentNode.nextSibling;
                            switch(newsitemrow.getAttribute('visible')) {
                                case 'false':
                                    e.target.setAttribute('alt', 'Show this item');
                                    e.target.setAttribute('title', 'Show this item');
                                    e.target.src = img_icn_minus.src;
                                    newsitemrow.setAttribute('visible', 'true');
                                    newsitemrow.style.display = '';
                                    break;
                                case 'true':
                                    e.target.setAttribute('alt', 'Hide this item');
                                    e.target.setAttribute('title', 'Hide this item');
                                    e.target.src = img_icn_plus.src;
                                    newsitemrow.setAttribute('visible', 'false');
                                    newsitemrow.style.display = 'none';
                                    break;
                            }
                        }, true);
                        newsItem.parentNode.nextSibling.setAttribute('Visible', 'true');
            }

//2.20.4 Extensive Edits Here. Neon removed att^2/def^2 from BR's
 EVO_debug("get info loop " ,299);
            var battleReports = document.evaluate(".//table[tbody/tr/td[position()=2 and starts-with(.,'Attackers')]]",
                document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            var battleReport;
            var rows, html, attDefRow, isAttacker, att, myAtt, def, myDef, idx, idx2,  unit, quantity, boost, landType, land, myLand, summaryRow, cell, j;
            
            var quantityAll, idxAll, quantityAllEnemy, idxEnemyAll, idx2Enemy, attEnemy, defEnemy, htmlEnemy; //2.20.4 New Variables
            
            var ruler = document.evaluate(".//p[@id='openpanel']/strong/text()", document, null, XPathResult.STRING_TYPE, null).stringValue;
            var attPrefixRegex = /.*att<sup>2<\/sup>:\s*/;
            var attSuffixRegex = /<br.*/;
            var defPrefixRegex = /.*def<sup>2<\/sup>:\s*/;
			for (var i = 0; i < battleReports.snapshotLength; i++) {
                        battleReport = battleReports.snapshotItem(i);
                        rows = battleReport.rows;
                        attDefRow = rows[0];
                        isAttacker = attDefRow.cells[1].textContent.toLowerCase().indexOf(ruler.toLowerCase()) != -1;
                        idx = isAttacker ? 1 : 2;
                        //2.20.4 Neon removed the att/def from the BR's
                        //att = attDefRow.cells[idx].innerHTML.replace(attPrefixRegex, "").replace(attSuffixRegex, "");
                        //att = parseInt(att ? att : 0);
                        //def = attDefRow.cells[idx].innerHTML.replace(defPrefixRegex, "");
                        //def = parseInt(def ? def : 0);

						att = 0;
						def = 0;
						attEnemy = 0;
						defEnemy = 0;
                        myAtt = 0;
                        myDef = 0;
                        idx2 = isAttacker ? 1 : 6;
                        idx2Enemy = isAttacker ? 6 : 1; //2.20.4
                        
                        for (j = 3; j < rows.length; j++) {
                                    unit = units[rows[j].cells[0].innerHTML.toLowerCase()];
                                    if (!unit) break;
                                    idx = rows[j].cells[idx2].innerHTML.indexOf("<br>");
                                    idxAll = rows[j].cells[idx2].innerHTML.indexOf(">");
									
                                    quantity = parseInt(rows[j].cells[idx2].innerHTML.substring(idx + 4));
                                    quantityAll = parseInt(rows[j].cells[idx2].innerHTML.substring(idxAll+1, idx-7));
                                    quantityAllEnemy = parseInt(rows[j].cells[idx2Enemy].innerHTML); //2.20.4 Enemy has no html tags
 //kcsxx                                   
 EVO_debug("inside one br " + att ,299);
                                     boost = unit.getBoost();
                    
                                    myAtt += unit.getAttackScore(quantity) * boost * boost;
									att += unit.getAttackScore(quantityAll) * boost * boost;  //2.20.4 		                                    
									attEnemy += unit.getAttackScore(quantityAllEnemy) * boost * boost;  //2.20.4 		                                    							

                                    myDef += unit.getAttDefScore(quantity)  * boost * boost;
                                    def += unit.getAttDefScore(quantityAll) * boost * boost; //2.20.4 		                                    
                                    defEnemy += unit.getAttDefScore(quantityAllEnemy) * boost * boost;  //2.20.4 		                                    						            
                        }
                        summaryRow = battleReport.insertRow(rows.length);
                        cell = addCell(summaryRow, 0, new Array(new Array("colSpan", "11"), new Array("height", "3")));
                        
                        summaryRow = battleReport.insertRow(rows.length);
                        cell = addCell(summaryRow, 0, new Array(new Array("class", "alt1 b")), "Summary");
                        
                        
               EVO_debug("outside loop " + att ,299);                         
                        if (isAttacker) {
                        
                         EVO_debug("Is Attacker" ,299);   
                        html = "Att: " + evoNumber2String(myAtt.toFixed(0)) + " / <b>" + evoNumber2String(att.toFixed(0)) + "</b> (" + (att != 0 ? parseInt(100 * myAtt / att) : 0) + "%)<br/>" +
                                       "Def: " + evoNumber2String(myDef.toFixed(0)) + " / <b>" + evoNumber2String(def.toFixed(0)) + "</b> (" + (def != 0 ? parseInt(100 * myDef / def) : 0) + "%)";
                        htmlEnemy = "Att: " + evoNumber2String(attEnemy.toFixed(0))  + "<br/>" +
                                       "Def: " + evoNumber2String(1.44*defEnemy.toFixed(0));
                        
                                               
                                    cell = addCell(summaryRow, 1, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "5")), html);
                                    html = "";
                                    for (; j < rows.length - 2; j++) {
                                                if (rows[j].cells[0].innerHTML.indexOf("Land Capture") != -1) {
                                                            j++;
                                                            break;
                                                }
                                    }
                                    for (; j < rows.length - 2; j++) {
                                                landType = rows[j].cells[0].innerHTML;
                                                land = rows[j].cells[2].firstChild.innerHTML;
                                                myLand = rows[j].cells[2].innerHTML.replace(/.*<br>/, "");
                                                idx = landType.length + (11 - landType.length) * 6;
                                                landType = (landType + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;").substring(0, idx);
                                                html += landType + ": " + myLand + " / <b>" + land + "</b> (" + parseInt(100 * myLand / land) + "%)<br/>";
                                    }
                                    //cell = addCell(summaryRow, 2, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "3")), html);
                                    //cell = addCell(summaryRow, 3, new Array(new Array("class", "green_bg_row2"), new Array("colSpan", "5")));
            
            //cell = addCell(summaryRow, 4, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "5")));
            cell = addCell(summaryRow, 2, new Array(new Array("class", "green_bg_row2"), new Array("colSpan", "5")), htmlEnemy);
            //cell = addCell(summaryRow, 6, new Array(new Array("class", "green_bg_row2"), new Array("colSpan", "3")));
            
                                    
                        } else {
             //xx
                 EVO_debug("Is Defnderer" ,299);  
             EVO_debug("ATT = " + att + " def " + def ,299);




                        html = "Att: " + evoNumber2String(myAtt.toFixed(0)) + " / <b>" + evoNumber2String(att.toFixed(0)) + "</b> (" + (att != 0 ? parseInt(100 * myAtt / att) : 0) + "%)<br/>" +
                                       "Def: " + evoNumber2String(1.44*myDef.toFixed(0)) + " / <b>" + evoNumber2String(1.44*def.toFixed(0)) + "</b> (" + (def != 0 ? parseInt(100 * myDef / def) : 0) + "%)";
                        htmlEnemy = "Att: " + evoNumber2String(attEnemy.toFixed(0))  + "<br/>" +
                                       "Def: " + evoNumber2String(defEnemy.toFixed(0));
                        
             EVO_debug(html + htmlEnemy ,299);
            
            //cell = addCell(summaryRow, 0, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "1")));
            cell = addCell(summaryRow, 1, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "5")), htmlEnemy);
            //cell = addCell(summaryRow, 2, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "1")));
            
            //cell = addCell(summaryRow, 4, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "5")));
            cell = addCell(summaryRow, 2, new Array(new Array("class", "green_bg_row2"), new Array("colSpan", "5")), html);
            //cell = addCell(summaryRow, 6, new Array(new Array("class", "green_bg_row2"), new Array("colSpan", "3")));
                          
                        
            //cell = addCell(summaryRow, 4, new Array(new Array("class", "red_bg_row2"), new Array("colSpan", "5")));
            //cell = addCell(summaryRow, 5, new Array(new Array("class", "green_bg_row2"), new Array("colSpan", "2")), html);
            //cell = addCell(summaryRow, 6, new Array(new Array("class", "green_bg_row2"), new Array("colSpan", "3")));
                        }
                        //kcsedit

                        // losses evaluation
                        //
                        var total = new Array(), losses = new Array();
                        total[0] = total[1] = losses[0] = losses[1] = 0;
                        function updateLosses(unit, cells, idx, isAtt) {
            var a = cells[idx].firstChild;
            if(! a ) return; // no figures in the BR for defenses on the attacker's side
                                    a = evoString2Number(a.textContent);
                                    var l = evoString2Number(cells[idx+1].firstChild.textContent);
                                    if( a == 0 ) return;
                                    cells[idx+1].title = Math.round(100*l/a) + '% (' + evoNumber2String(Math.abs(l) * (unit.metal + unit.mineral)) + ')';
                                    // take captures into account for the global stats
                                    total[isAtt] += (a + evoString2Number(cells[idx+3].firstChild.textContent)) * (unit.metal + unit.mineral);
                                    losses[isAtt] += (l + evoString2Number(cells[idx+2].firstChild.textContent)) * (unit.metal + unit.mineral);
                        }

                        for (j = 3; j < rows.length; j++) {
                                    unit = rows[j].cells[0].innerHTML.toLowerCase();
                                    if (unit == '') break;
                                    unit = units[unit];
                                    if (!unit) continue; // unknown unit?
                                    updateLosses(unit, rows[j].cells, 1, 0);
                                    updateLosses(unit, rows[j].cells, 6, 1);
                        }

                        battleReport.insertRow(j+2).innerHTML = '<TD class="row1 b"></TD><TD class="red_bg_row1 b">' + evoNumber2String(total[0]) + '</TD><TD class="red_bg_row1 b red" colspan="4">' + evoNumber2String(losses[0]) + ' (' + (losses[0]==0?0:Math.round(100*losses[0]/total[0])) + '%)</TD>'
                                    + '<TD class="green_bg_row1 b">' + (total[1]) + '</TD><TD class="green_bg_row1 b red" colspan="4">' + (losses[1]) + ' (' + (losses[1]==0?0:Math.round(100*losses[1]/total[1])) + '%)</TD>';
            }
}

function buildHistogram(target) {
  //EVO_debug("Begin buildHistogram");
  Height = 20;
  var lastReset = parseInt(evoGetCookie("ScanReset",0));
  lastScan = parseInt(evoGetCookie(target+"_scanned",0));
  if (lastReset>lastScan) {
    evoSetCookie(target,"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
  }
  stats = evoGetCookie(target,"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0").split(",");
  basis = evoGetCookie("ScansCount","0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0").split(",");
  html = "<table border='0' cellspacing='1' width='100%'>";
  html += "<tr height=20 style='vertical-align:bottom'>";
  //EVO_debug(target);
  //EVO_debug(stats);
  //EVO_debug(basis);

  now = new Date();
  curTick = now.getUTCHours();
  for (iter = 0; iter <stats.length; iter++) {
    numer = parseInt(stats[iter]);
    denom = parseInt(basis[iter]);
    //avoid div by zero
    denom += (denom==0)?1:0;
    html += "<td>";
    if (iter == curTick) {
      html += "<div style='font-size:0pt; height:"+Height*numer/denom+"pt; background-color:blue; width:100%'>";
    } else {
      html += "<div style='font-size:0pt; height:"+Height*numer/denom+"pt; background-color:red; width:100%'>";
    }
    html += "</div></td>";
  }
  html += "</tr><tr style='font-size:6pt;'>";
  for (iter = 0; iter <stats.length; iter++) {
    html += "<td>"+iter;
    html += "</td>";
  }
  html += "</tr></table>";
  html = html.split("'");
  html = html.join("&quot;");
  return html;
}

regPageHandler(/^\/(universe\/(home|search)|(\d+(,\d+)*))$/i,  scanUniverse);
function scanUniverse() {
  EVO_debug("Begin scanUniverse");
  var cBoxs = document.evaluate(".//a[@onclick[starts-with(.,'javascript:return continentBox') and contains(.,'Last Seen:')]]/..", 
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var lastReset = parseInt(evoGetCookie("ScanReset",0));
  var now = new Date();
  var curTime = now.getTime();
  var curScan = now.setMinutes(0,0,0);
  EVO_debug("snapshot: "+cBoxs.snapshotLength);
  var monitorset = evoGetCookie("ScansCount","0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0").split(",");
  for (iter = 0; iter < cBoxs.snapshotLength; iter++) {
    var txt = cBoxs.snapshotItem(iter).innerHTML;
    var lastSeen = txt.match(/Last Seen: (((\d+) days )?(\d+) hours ago|Online|Never logged in)/i);
    var lastContact = new Date()
    if (lastSeen[1]!="Online") {
      lastContact.setHours(lastContact.getHours()-(parseInt("0"+lastSeen[3])*24)-parseInt("0"+lastSeen[4]));
    }
    if (lastSeen[1]!="Never logged in") {
      lastContact.setMinutes(0,0,0);      
    } else {
      lastContact = lastReset;
    }
    lastContact.setMinutes(0,0,0);
    lastSeen = lastContact.getTime();
    var info = txt.match(/continentbox\((.*)\)">/i)[1].split(",");
    target = info[2]+"_"+info[3]+"_"+info[4]+"_"+info[5].split("'")[1]
    lastScan = parseInt(evoGetCookie(target+"_scanned",0));
    if (lastReset>lastScan) {
      evoSetCookie(target,"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
      lastScan = 0;
    }
    if (lastSeen>lastScan) {
      ind = lastContact.getUTCHours();
      monitorset[ind] = parseInt(monitorset[ind]);
      EVO_debug(lastSeen+"/"+lastScan+" Scanning ("+target+")"+info[6]+" of "+info[7]);
      dataset = evoGetCookie(target,"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0").split(",");
      dataset[ind] = parseInt(dataset[ind])+1;
      if (monitorset[ind]<dataset[ind]) monitorset[ind]=dataset[ind];
      dataset[ind] = dataset[ind].toString();
      monitorset[ind]=monitorset[ind].toString();
      dataset = dataset.join(",");
      evoSetCookie(target,dataset);
      evoSetCookie(target+"_scanned",curTime.toString());
    } else EVO_debug(lastSeen+"/"+lastScan+" already scanned ("+target+") "+info[6]+" of "+info[7]);
  }
  evoSetCookie("ScansCount",monitorset.join(","));
  EVO_debug("Exit scanUniverse");
}

// evoUniverseNav
// Helper Function for Navigating around Evo - very useful 
//		Adds a Next >> link to speed zipping through the universe
// Copied from evo 4.0.5 (kcs added to red_evo) 2.20.5


function evoUniverseNav() {
	var next = null;
	var i;

	// let's find the select...
	var sel = document.evaluate(".//select[@name='p']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if( sel == undefined ) {
		// we're on the galaxy or dim view, so we should see a list of planets/galaxies, just pick the first from the list :)
		next = document.evaluate(".//tr[@class='row1' or @class='row2'][2]/td[1]/span/text()", document, null, XPathResult.STRING_TYPE, null).stringValue;
	} else {
		// try to get the next one from the planets drop down
		next = document.evaluate(".//select[@name='p']/option[preceding-sibling::*[@selected][2]][1]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if( next == null ) {
			next = document.evaluate(".//select[@name='g']/option[preceding-sibling::*[@selected][2]][1]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
			if( next == null )
				next = document.evaluate(".//select[@name='dimension']/option[preceding-sibling::*[@selected][2]][1]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		}
		if( next != null ) next = next.textContent;
	}
	if( next != null ) {
		var node = document.evaluate("id('content')/h1", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		if( node ) {
			
			var a = document.createElement('a');
			var link = "" + next.match(/(\d+(,\d+)*)/)[0];
			var idx = link.indexOf(',');
			if(idx != -1)
			{
				idx = link.indexOf(',',idx+1);
				if(idx == -1)
				link = link + ",1";
			}
			else
				link = link + ",1,1";
			a.href = '/' + link;
			a.title = next;
			a.textContent = "Next page >>";
			node.appendChild(a);
			a.style.fontSize = "8pt"
			a.style.fontWeight = "bold"
			a.style.marginLeft = "10px";
		}
	}
}



regPageHandler(/^\/overview/i,  monitorBuddies);
function monitorBuddies() {
  EVO_debug("Begin monitorBuddies");
  var lastReset = parseInt(evoGetCookie("ScanReset",0));
  var Buddies = document.evaluate(".//a[@onclick[starts-with(.,'javascript:return continentBox')]]/..", 
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  //get a date
  now = new Date();
  curTime = now.getTime();
  curScan = now.setMinutes(0,0,0);
  ind = now.getUTCHours();
  EVO_debug("snapshot: "+Buddies.snapshotLength);
  var monitorset;
  monitorset = evoGetCookie("ScansCount","0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0").split(",");
  monitorset[ind] = parseInt(monitorset[ind]);
  for (iter = 0; iter < Buddies.snapshotLength; iter++) {
    txt = Buddies.snapshotItem(iter).innerHTML.split("\\").join("");
    var info = txt.match(/continentbox\((.*)\)">/i)[1].split(",");
    target = info[2]+"_"+info[3]+"_"+info[4]+"_"+info[5].split("'")[1]
    lastScan = parseInt(evoGetCookie(target+"_scanned",0));
    if (lastReset>lastScan) {
      evoSetCookie(target,"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0");
      lastScan = 0;
    }
    if (lastScan<curScan) {
      EVO_debug(lastScan+"/"+curScan+" Scanning ("+target+")"+info[6]+" of "+info[7]);
      dataset = evoGetCookie(target,"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0").split(",");
      dataset[ind] = parseInt(dataset[ind])+1;
      if (monitorset[ind]<dataset[ind]) monitorset[ind]=dataset[ind];
      dataset[ind] = dataset[ind].toString();
      dataset = dataset.join(",");
      evoSetCookie(target,dataset);
      evoSetCookie(target+"_scanned",curTime.toString());
    } else EVO_debug(lastScan+"/"+curScan+" already scanned ("+target+") "+info[6]+" of "+info[7]);
  }
  monitorset[ind]=monitorset[ind].toString();
  evoSetCookie("ScansCount",monitorset.join(","));
  EVO_debug("Exit monitorBuddies");
}

regPageHandler(null,  displayHistogram);
function displayHistogram() {
  EVO_debug("Begin displayHistogram");
  var cBoxs = document.evaluate(".//a[@onclick[starts-with(.,'javascript:return continentBox')]]/..", 
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var iter=0; iter < cBoxs.snapshotLength; iter++) {
    txt = cBoxs.snapshotItem(iter).innerHTML;
//    parts = txt.match(/continentbox\((.*)'\)">/i);
    parts = txt.match(/continentBox(.*)\)">/i);
    args = parts[1].split(",");
    target = args[2]+"_"+args[3]+"_"+args[4]+"_"+args[5].split("'")[1];

// Remove the "'" from the string in order to add the histogram
    args[args.length-2]=args[args.length-2].substring(0,args[args.length-2].length-1);
// Append the histogram html code
    args[args.length-2]+=buildHistogram(target);
// Add the previously removed "'" for proper rendering
    args[args.length-2]+="'";
// Finaly, replace the actual HTML code
    cBoxs.snapshotItem(iter).innerHTML = txt.replace(parts[1],args.join(","));

//EVO_debug("Parts: " + parts);
//    parts[1] =  parts[1].replace(/\$/g,"\\$");
//    args = parts[1].split(",");
//    target = args[2]+"_"+args[3]+"_"+args[4]+"_"+args[5].split("'")[1];
//    args[args.length-1]+=buildHistogram(target);
//    cBoxs.snapshotItem(iter).innerHTML = txt.replace(parts[1],args.join(","));

  }
}

//
// Rankings page
//
regPageHandler(/^\/rankings\/alliance$/i, evoRankings);
function evoRankings() {
  EVO_debug("Begin evoRankings");
            var row;
            var score;
            var land;
            var members;
            var rows = document.evaluate(".//table/tbody[tr/td[text()='Alliance Name']]/tr[count(td)=5]", contents, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 2; row = rows.snapshotItem(i); i++ ) {
                        members = row.cells[2].textContent;
                        score = evoString2Number(row.cells[4].textContent);
                        land = evoString2Number(row.cells[3].textContent);
                        row.cells[0].style.textAlign = "center";
                        row.cells[1].style.padding = "0 2px 0 2px";
                        row.cells[2].style.textAlign = "center";
                        row.cells[3].innerHTML = row.cells[3].textContent + "<br><font color='#AAAAFF'>" + evoNumber2String(Math.ceil(land / members)) + "</font>";
                        row.cells[3].style.textAlign = "right";
                        row.cells[3].style.padding = "0 2px 0 2px";
                        row.cells[4].innerHTML = row.cells[4].textContent + "<br><font color='#AAAAFF'>" + evoNumber2String(Math.ceil(score / members)) + "</font>";
                        row.cells[4].style.textAlign = "right";
                        row.cells[4].style.padding = "0 2px 0 2px";
            }
}


regPageHandler(/^\/messages$/i, function() { playerInbox('inbox') });
regPageHandler(/^\/messages\/inbox$/i, function() { playerInbox('inbox') });
regPageHandler(/^\/messages\/sent$/i, function() { playerInbox('sent') });
regPageHandler(/^\/messages\/trash$/i, function() { playerInbox('trash') });


var MailMessages = new Array();
            var keyindex = new Array();

var msgDownloadQueue = new Array();
var msgUploadQueue = new Array();


function findMsg(msgID) {
            for (var i = 0; i < MailMessages.length; i++) {
                        if (MailMessages[i].id == msgID) {
                                    return i;
                                    alert(i)
                        }
            }
            return false;
}

function checkUpload() {
	if (msgUploadQueue.length == 0) {
		var chkAllBoxes = document.getElementById('checkthemall');
		if (chkAllBoxes.checked == true) {
			chkAllBoxes.checked = false;
		}
		alert('Uploading finished');
		return false;
	}
	var thisMessage = MailMessages[findMsg(msgUploadQueue[msgUploadQueue.length-1])];

	switch (thisMessage.status) {
		case 'uploading':
//EVO_debug('Uploading...' + thisMessage.id);
			setTimeout(checkUpload,200);
			return false;
			break;
		case 'ready':
EVO_debug('Finished Uploading...'+ thisMessage.id);
			msgUploadQueue.pop();
			thisMessage.status = '';
			thisMessage.uploaded = true;
			setTimeout(checkUpload,200);
			break;
		case 'failed':
EVO_debug('Failed Uploading...'+ thisMessage.id);
			msgUploadQueue.pop();
			setTimeout(checkUpload,200);
			break;
		case '':
EVO_debug('Starting to upload '+ thisMessage.id);
			thisMessage.upload();
			setTimeout(checkUpload,200);
			break;
	}
}		


function checkDownload() {
	if (msgDownloadQueue.length == 0) {
		var chkAllBoxes = document.getElementById('checkthemall');
		if (chkAllBoxes.checked == true) {
			chkAllBoxes.checked = false;
		}
		alert('Downloading finished');
		return false;
	}
	var thisMessage = MailMessages[findMsg(msgDownloadQueue[msgDownloadQueue.length-1])];

	switch (thisMessage.status) {
		case 'downloading':
//EVO_debug('Downloading...' + thisMessage.id);
			setTimeout(checkDownload,200);
			return false;
			break;
		case 'ready':
EVO_debug('Finished Downloading...'+ thisMessage.id);
			msgDownloadQueue.pop();
			thisMessage.status = '';
			thisMessage.downloaded = true;
			setTimeout(checkDownload,200);
			break;
		case 'failed':
EVO_debug('Failed Downloading...'+ thisMessage.id);
			msgDownloadQueue.pop();
			setTimeout(checkDownload,200);
			break;
		case '':
EVO_debug('Starting to download '+ thisMessage.id);
			thisMessage.download();
			setTimeout(checkDownload,200);
			break;
	}
}		


function MailMessage(id, subject, from, pmtime, chkbox, repository, folder) {
//          if (typeof(id) != number)
            this.id = id;		// ID of the message as it is saved in EVO server
            this.ID = this.id;		// for case-sensitive relief
            this.subject = subject;	// subject of message
            this.time = pmtime;		// date & time the message was sent
            this.repository = (repository) ? repository : "evo"; // is it saved in evo or in red server?
            this.downloaded = false;	// is the message body already downloaded?
            this.uploaded = false;	// is the message body already uploaded to red server?
            this.visible = false;	//
            this.body = '';
            this.msgRow = 'msgHeaders_' + this.id;	// the table row ID (NODE.ID) that holds the message headings (from-subject-date)
            this.status = '';		
            this.checkbox = 'checkbox' + this.id;	// the checkbox ID (ELEMENT.ID)
            this.container = 'msgBody_' + this.id;	// the container (row) id
            this.folder = folder;	// the folder that the message is in (inbox, wasterbasket, etc)
            if (this.folder=='inbox') {	// Find the correct property to put the other player name
		this.from = from;
		this.to = 'Mindfox';
            } else {
		this.to = from;
		this.from = 'Mindfox';
            }
            this.downloadURL = 'http://ev5.neondragon.net/messages/' + folder + '?msg=';
}

//MailMessage.prototype.downloadURL = 'http://ev5.neondragon.net/messages/';
MailMessage.prototype.getURL = 'http://www.redalliance.info/red_evo/messages.php?id=';
MailMessage.prototype.uploadURL = REDFORUM_URL + POST_PM;
MailMessage.prototype.tableColumns = '5';

MailMessage.prototype.removeText = function() {
alert(this.msgRow.cells[2].textContent);
            this.msgRow.cells[2].textContent = '';
}

// Download message from red_alliance server
MailMessage.prototype.get = function() {
	msgDownloadQueue[msgDownloadQueue.length] = this.id;
}

// Download message from Evo server
MailMessage.prototype.download = function() {
	if (this.downloaded) {
		this.status = 'ready';
		return false;
	}
	if (!GM_xmlhttpRequest) {
		alert('Please upgrade to the latest version of Greasemonkey.');
		return false;
	}
	this.status = 'downloading';
	GM_xmlhttpRequest({
		method: 'GET',
		url: this.downloadURL + this.id,
		onload: this.downloadDone,
		onerror: this.downloadFailed
	});

}		

// Upload message to Red server
MailMessage.prototype.upload = function() {
	if (this.uploaded) {
		this.status = 'ready';
		return false;
	}
	if (!GM_xmlhttpRequest) {
		alert('Please upgrade to the latest version of Greasemonkey.');
		return false;
	}
	this.status = 'uploading';
	postData = "pm_id=" + escape(this.id) + 
		"&pm_from=" + escape(this.from) + 
		"&pm_to=" + escape(this.to) + 
		"&pm_time=" + escape(this.time) +
		"&pm_subject=" + escape(this.subject) +
		"&pm_body=" + escape(this.body) +
		"&pm_folder=" + escape(this.folder) +
		"&pm_headhtml=" + escape(document.getElementById(this.msgRow).innerHTML); // +
//		"&pm_id=" + escape(this.id);

	GM_xmlhttpRequest({
		method: 'POST',
		url: this.uploadURL, // + this.id,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		data: postData,
		onload: this.uploadDone,
		onerror: this.uploadFailed
	});

}		

MailMessage.prototype.addBody = function(msg, msgBody) {
	var newrow = document.createElement('tr'); // the table cell (NODE) that holds the message body
	newrow.setAttribute('id', msg.container);
	newrow.style.display = 'none';
	var cell = document.createElement('td');
	cell.setAttribute('colspan', '5');
	newrow.appendChild(cell);
	newrow.firstChild.innerHTML = msgBody;
	document.getElementById(msg.msgRow).parentNode.insertBefore(newrow, document.getElementById(msg.msgRow).nextSibling);
//alert(typeof document.getElementById(msg.msgRow));
//alert(msg.container.innerHTML);
//alert(msg.container.parentNode.pareNode.getAttribute('action'));
}

MailMessage.prototype.downloadDone = function(req) {
//EVO_debug('This is the response: \n' + req.responseText);
		var thisMessage = MailMessages[findMsg(msgDownloadQueue[msgDownloadQueue.length-1])];
		var strtmp = req.responseText
		strtmp = strtmp.substring(strtmp.indexOf('<form action="/messages/' + thisMessage.folder.toLowerCase() + '" method="post">'));
//EVO_debug('Searching for: ' + '<form action="/messages/' + thisMessage.folder.toLowerCase() + '" method="post">');
//EVO_debug(strtmp);
		strtmp = strtmp.substring(0,strtmp.indexOf('</form>')+7);
//EVO_debug(strtmp);
		thisMessage.body = strtmp;
		thisMessage.addBody(thisMessage, strtmp);
		thisMessage.downloaded = true;
		thisMessage.status = 'ready';
		addShowHide(thisMessage.id);
EVO_debug(thisMessage.checkbox)
		document.getElementById(thisMessage.checkbox).checked = false;
EVO_debug('Download Success for ' + thisMessage.id);
	}

MailMessage.prototype.downloadFailed = function(req) {
		var thisMessage = MailMessages[findMsg(msgDownloadQueue[msgDownloadQueue.length-1])];
		thisMessage.downloaded = false;
		thisMessage.status = 'failed';
EVO_debug('Download Failure for ' + thisMessage.id);
EVO_debug(req.responseHeaders);
EVO_debug(req.responseText);
	}

MailMessage.prototype.uploadDone = function(req) {
		var thisMessage = MailMessages[findMsg(msgUploadQueue[msgUploadQueue.length-1])];
EVO_debug(req.responseText);
		if (req.responseText.indexOf('Success') > 0) {
			thisMessage.uploaded = true;
			thisMessage.status = 'ready';
			document.getElementById(thisMessage.checkbox).checked=false;
		} else {
			thisMessage.uploadFailed(req)
		}
	}

MailMessage.prototype.uploadFailed = function(req) {
		var thisMessage = MailMessages[findMsg(msgUploadQueue[msgUploadQueue.length-1])];
		thisMessage.uploaded = false;
		thisMessage.status = 'failed';
EVO_debug('Upload Failure for ' + thisMessage.id);
EVO_debug(req.responseHeaders);
EVO_debug(req.responseText);
	}

function addShowHide(msgID) {
	var msgItem = document.getElementById('msgHeaders_' + msgID);
	var showhideCtrlimg = document.createElement('img');
	showhideCtrlimg.src = img_icn_plus.src;
	showhideCtrlimg.border = 0;
	showhideCtrlimg.style.height = '12px';
	showhideCtrlimg.style.width = '12px';
	showhideCtrlimg.style.cursor = "pointer";
	showhideCtrlimg.setAttribute('alt', 'Show this item');
	showhideCtrlimg.setAttribute('title', 'Show this item');
	showhideCtrlimg.setAttribute('id', 'ShowHide_' + msgID);
EVO_debug('Before Adding the button to Node');
	msgItem.firstChild.insertBefore(showhideCtrlimg, msgItem.firstChild.firstChild);
EVO_debug('After Adding the button to Node');
	showhideCtrlimg.addEventListener('click', function(e) {
		var msgitemrow = e.target.parentNode.parentNode.nextSibling;
		switch(msgitemrow.style.display) {
			case 'none':
				e.target.setAttribute('alt', 'Show this item');
				e.target.setAttribute('title', 'Show this item');
				e.target.src = img_icn_minus.src;
//				msgitemrow.setAttribute('visible', 'true');
				msgitemrow.style.display = '';
				break;
			case '':
			case 'block':
				e.target.setAttribute('alt', 'Hide this item');
				e.target.setAttribute('title', 'Hide this item');
				e.target.src = img_icn_plus.src;
//				msgitemrow.setAttribute('visible', 'false');
				msgitemrow.style.display = 'none';
				break;
			}
	}, true);
}



function playerInbox(msgcontainer) {
EVO_debug("Begin playerInbox in folder " + msgcontainer);
            var msgTable = xpath('.//form/table[contains(., "Subject") and contains(., "Time")]', contents, true); ///tbody/tr', contents, false);
            var msg_checkbox;
            var msg_row;
            var msg_time;
            var msg_from;
            var msg_subject;
            var msg_id;

msgTable.rows[0].cells[4].removeChild(msgTable.rows[0].cells[4].firstChild); // fixing the bug of multiple js libraries

//KCS 2.20.4 I think the creates the Launch Window Commenting out for speed
//createLaunchWin();
var chkAll = document.createElement('input');	// fixing the bug of multiple js libraries
chkAll.setAttribute('type', 'checkbox');	// fixing the bug of multiple js libraries
chkAll.setAttribute('id','checkthemall');	// fixing the bug of multiple js libraries
msgTable.rows[0].cells[4].appendChild(chkAll);	// fixing the bug of multiple js libraries
chkAll.addEventListener('click',p.toggle,true);	// fixing the bug of multiple js libraries

            for (var i=1; i < msgTable.rows.length; i++) {
                        msg_id = parseInt(msgTable.rows[i].cells[4].firstChild.getAttribute('value'));
//EVO_debug('ID: ' + msg.id + ' filled from the cell which had: ' + msgTable.rows[i].cells[4].firstChild.getAttribute('value'));
                        msg_subject = msgTable.rows[i].cells[1].textContent;
                        msg_from = msgTable.rows[i].cells[2].textContent;
                        msg_time = new Date();
			pm_time = msgTable.rows[i].cells[3].textContent;
                        var tmp = msgTable.rows[i].cells[3].textContent.split(' ');
                        msg_time.setDate(tmp[0].split('-')[2]);
                        msg_time.setMonth(tmp[0].split('-')[1]);
                        msg_time.setYear(tmp[0].split('-')[0]);
                        msg_time.setHours(tmp[1].split('-')[0]);
                        msg_time.setMinutes(tmp[1].split('-')[1]);
                        msg_time.setSeconds(tmp[1].split('-')[2]);
                        msg_row = msgTable.rows[i];
			msg_checkbox = msg_row.cells[4].firstChild;
			msg_checkbox.addEventListener('click', function(e) {
					if (e.target.checked) {
//EVO_debug(MailMessages[findMsg(e.target.getAttribute('value'))].msgRow.textContent);
EVO_debug(e.target.getAttribute('value'));
					}
			}, false);

                        var msg = new MailMessage(msg_id, msg_subject, msg_from, pm_time, 
					msg_checkbox.getAttribute('id'), '', msgcontainer);
			msgTable.rows[i].setAttribute('id', msg.msgRow);
                        MailMessages[MailMessages.length] = msg;

            }
	var dButton = document.createElement('input');
	dButton.setAttribute('type', 'button');
	dButton.setAttribute('value', 'Download Messages');
	dButton.addEventListener('click', function() {
			for (var i = 0; i < MailMessages.length; i++) {
				if (document.getElementById(MailMessages[i].checkbox).checked) {
					msgDownloadQueue.push(MailMessages[i].id);
				}
			}
			var alertText = 'You have selected ' + msgDownloadQueue.length;
			alertText += (msgDownloadQueue.length>1) ? ' messages' : ' message';
			alertText += ' to download.';
			alert(alertText);
			checkDownload();
		}, false);

	msgTable.parentNode.insertBefore(dButton, msgTable);

	var uButton = document.createElement('input');
	uButton.setAttribute('type', 'button');
	uButton.setAttribute('value', 'Upload Messages');
	uButton.addEventListener('click', function() {
			for (var i = 0; i < MailMessages.length; i++) {
				if (document.getElementById(MailMessages[i].checkbox).checked) {
					msgUploadQueue.push(MailMessages[i].id);
				}
			}
			var alertText = 'You have selected ' + msgUploadQueue.length;
			alertText += (msgUploadQueue.length>1) ? ' messages' : ' message';
			alertText += ' to upload to Red server.';
			alert(alertText);
			checkUpload();
		}, false);

	msgTable.parentNode.insertBefore(uButton, msgTable);



EVO_debug('Exit playerInbox');
}




//
// Check for Script Updates
//
regPageHandler(null,  autoUpdate);
function autoUpdate() {
  EVO_debug("Begin autoUpdate");
  masterURL = evoGetCookie("masterURL","");
  if ( evoGetCookie('nEvoUpToDate',null) == null && masterURL != "")
  {
    now = new Date();
    masterURL = evoGetCookie("masterURL","");
    GM_xmlhttpRequest({
      method: 'GET',
      url: masterURL+'?ts='+now.getTime(),
      onreadystatechange: function(responseDetails) {
        if( responseDetails.readyState == 4 ) {
          if ( responseDetails.status == 304 ) { // Not Modified
            evoSetCookie('nEvoUpToDate', '', 1);
          } else if ( responseDetails.status == 200 ) { // OK
            evoSetCookie('nEvoUpToDate', '', 1);
            newVer = responseDetails.responseText.match(/\/\/ @version\s+(\d+(\.\d+(\w)?)*)/i)[1].split(".");
            curVer = scriptversion.split(".");
            iter = -1
            do {
              iter++
              if (parseInt('0'+newVer[iter])>parseInt('0'+curVer[iter])) {
                if ( confirm("A newer version of Evo+ is available, click OK to update now.\n\nThis will open the new version in a new tab, you will just have to click on the install button.") ) {
                  // time to update !
                  GM_openInTab(masterURL);
                }
              }
            } while (iter < newVer.length && iter <curVer.length && curVer[iter]==newVer[iter]);
          }
        }
      }
    });
  }
  EVO_debug("Exit autoUpdate");
}

//
// ***************************************************************************
// ** MAIN
// ***************************************************************************
//
function evo_plus() {
EVO_debug("begin main");


  var totalPlayers = null;
  var match;
  var node;
  var panel;

  var profiler = Date.now();


/*******
for (var p in unsafeWindow) {
  GM_log(p + ": " + unsafeWindow[p] + "\n");
}
*******/

  // Initialization
  // -----------------------------------------------------------------------
  // contents node
  contents = document.getElementById("content");
  



_continentBox = unsafeWindow.continentBox;
unsafeWindow.continentBox = showPlayerInfo;
//EVO_debug(showPlayerInfo);
//EVO_debug(unsafeWindow.continentBox);





  // get out of the bloody forums message editor
  if( contents == null ) return;

  // populate the units table
  evoUnitsPopulate();
  // grab player's available resources
  panel = document.getElementById("navstatus");
  if( panel != null ) {
    match = panel.textContent.match(/Metal:\s+([\d,]+)\s+Mineral:\s+([\d,]+)\s+Food:\s+([\d,]+)\s+Gold:\s+([\d,]+)\s+Score:\s+([\d,]+)/);
    pMetal = evoString2Number(match[1]);
    pMineral = evoString2Number(match[2]);
    pFood = evoString2Number(match[3]);
    pGold = evoString2Number(match[4]);
    pScore = evoString2Number(match[5]);
  }
  // ranking
  panel = document.evaluate("//div[@id='panelinfo']/table/tbody/tr/td[2]/p", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  if( panel != null ) {
    if( match = /Current\s+Ranking:\s+([,0-9]+)\s+of\s+([,0-9]+)/.exec(panel.textContent) ) {
      pRank = match[1];
      totalPlayers = match[2];
    }
  }

  // Dispatch
  // -----------------------------------------------------------------------
  for(var i = 0; i < pageHandlers.length; i++ ) {
    if( pageHandlers[i].urlRegEx == null || 
        pageHandlers[i].urlRegEx.test(document.location.pathname) ) {
      try {
        pageHandlers[i].handler();
      }
      catch (Exception) {
        GM_log(Exception + " in page handler[" + i + "]: " + pageHandlers[i].urlRegEx);
      }    
    }
  }



  // THE evo+ bar
  // -----------------------------------------------------------------------
  node = document.createElement('DIV');
  node.style.textAlign="right";
  node.style.marginRight="5px";
  node.style.marginTop="3px";
  node.style.marginBottom="3px";

  function addItemToContent(c, text, className, html, isLastItem) {
    c.appendChild(document.createTextNode(text));
    var span = document.createElement('SPAN');
    span.className = className;
    if (isLastItem) {
      html += "&nbsp;|&nbsp;";
    }
    span.innerHTML = html;
    c.appendChild(span);
  }

  addItemToContent(node, 'Rank: ', 't_normal b', pRank + "/" + totalPlayers, true);
  addItemToContent(node, 'Min. TargetScore: ', 't_normal b', evoNumber2String(Math.ceil(pScore * 0.35)), true);
  addItemToContent(node, 'Max. AttackerScore: ', 't_normal b', evoNumber2String(Math.floor(pScore / 0.35)), false);
  addItemToContent(node, '', 't_normal b', "<br/>", false);
  addItemToContent(node, 'Quick Links: ', 't_normal b', "<a href=\"http://playevo.com/_/747968-The-Lords-Kira-Alliance-Forum">Kira Forum</a>", true);
  addItemToContent(node, '', 't_normal b', "<a href=\"http://www.thejackofclubs.net/evo/irc/\">Java IRC</a>", true);
  addItemToContent(node, '', 't_normal b', "<a href=\"http://revolutionofthegalaxy.com/revolution/main_page.php5?view=overview\">Revolution</a>", true);
  
  contents.parentNode.insertBefore(node, contents);
  profiler = Date.now() - profiler;


}
;

//window.addEventListener("load", function() { loadScripts(); evo_plus(); }, false);  
window.addEventListener("load", function() { evo_plus(); }, false);  

// Evo units stats
//
function evoUnitsPopulate() {
            if(! dEvo ) {
units['monkey']                  = new evoUnit('Monkey',                  UT_NAT,    3,     500,     250,  4,  4,  3,  0, 1.4, 1.44);
//Magical Monkey
units['magical monkey']                  = new evoUnit('Magical Monkey',                  UT_NAT,    3,     500,     250,  4,  4,  3,  0, 1.4, 1.44);
units['vaan']                  = new evoUnit('Vaan',                  UT_NAT,    3,     500,     250,  4,  4,  3,  0, 1.4, 1.44);

                                                                                                                                                                                                            
units['sheep']                   = new evoUnit('Sheep',                   UT_NAT,    4,    1500,     750, 11, 11,  6,  0, 1.4, 1.44);
units['wolf']                    = new evoUnit('Wolf',                    UT_NAT,   10,    8000,    4000, 27, 25, 14,  0, 1.4, 1.44);
units['python']                  = new evoUnit('Python',                  UT_NAT,   12,   12500,    5000, 36, 30,  7,  1, 1.4, 1.44);
units['kangaroo']                = new evoUnit('Kangaroo',                UT_NAT,   15,   15000,    8000, 36, 40,  5,  1, 1.4, 1.44);
units['walrus']                  = new evoUnit('Walrus',                  UT_NAT,   18,   26000,   13000, 52, 51,  4,  2, 1.4, 1.44);
                                                                                                                                                                                                            
units['cow']                     = new evoUnit('Cow',                     UT_NAT,    6,    2500,    1250, 16, 13,  3,  1, 1.4, 1.44);
units['hyena']                   = new evoUnit('Hyena',                   UT_NAT,    9,    8800,    3300, 28, 27,  9,  1, 1.4, 1.44);
units['ostrich']                 = new evoUnit('Ostrich',                 UT_NAT,   12,   18000,    8000, 42, 44,  6,  2, 1.4, 1.44);
units['bear']                    = new evoUnit('Bear',                    UT_NAT,   15,   30000,   15000, 60, 57, 12,  3, 1.4, 1.44);
units['elephant']                = new evoUnit('Elephant',                UT_NAT,   19,   42000,   21000, 72, 75, 22,  4, 1.4, 1.44);
                                                                                                                                                                                                            
units['horse']                   = new evoUnit('Horse',                   UT_NAT,    5,    2000,    1000, 13, 13,  4,  1, 1.4, 1.44);
units['fox']                     = new evoUnit('Fox',                     UT_NAT,    9,    7200,    3200, 24, 25,  8,  0, 1.4, 1.44);
units['puma']                    = new evoUnit('Puma',                    UT_NAT,   13,   11000,    5000, 32, 32,  5,  1, 1.4, 1.44);
units['lynx']                    = new evoUnit('Lynx',                    UT_NAT,   15,   12000,    5500, 35, 31,  8,  1, 1.4, 1.44);
units['lion']                    = new evoUnit('Lion',                    UT_NAT,   15,   12000,    5000, 31, 35,  8,  1, 1.4, 1.44);
units['cheetah']                 = new evoUnit('Cheetah',                 UT_NAT,   16,   14000,    7000, 41, 29,  5,  1, 1.4, 1.44);
units['panther']                 = new evoUnit('Panther',                 UT_NAT,   16,   14000,    8000, 32, 41,  6,  1, 1.4, 1.44);
units['tiger']                   = new evoUnit('Tiger',                   UT_NAT,   20,   18000,    9000, 44, 43, 11,  2, 1.4, 1.44);
units['rhino']                   = new evoUnit('Rhino',                   UT_NAT,   24,   28000,   17000, 66, 51,  3,  3, 1.4, 1.44);
                                                                                                                                                                                                            
                                                                                                                                                                                                            
//SITE OF INTEREST - AVERAGE PATH                                                                                                                                                 
units['centaur']                 = new evoUnit('Centaur',                 UT_ENG,    5,    4800,    2400, 22, 23, 10,  1, 1.4, 1.44);
units['unicorn']                 = new evoUnit('Unicorn',                 UT_ENG,    8,    7500,    3750, 31, 26,  6,  1, 1.4, 1.44);
units['gryphon']                 = new evoUnit('Gryphon',                 UT_ENG,   12,   10500,    5250, 36, 36,  8,  2, 1.4, 1.44);
units['minotaur']                = new evoUnit('Minotaur',                UT_ENG,   18,   19000,    9500, 54, 43, 13,  2, 1.4, 1.44);
units['dragon']                  = new evoUnit('Dragon',                  UT_LAST,  24,   30000,   15000, 76, 67,  9,  3, 1.4, 1.44);
                                                                                                                                                                                                            
//VOLCANO - ATTACK PATH                                                                                                                                                                             
units['fire sprite']             = new evoUnit('Fire Sprite',             UT_ENG,    4,    5000,    2500, 25, 18,  4,  0, 1.4, 1.44);
units['firesprite']              = units['fire sprite'];                                                                                                                     
units['salamander']              = new evoUnit('Salamander',              UT_ENG,    7,    9000,    4500, 36, 26, 10,  1, 1.4, 1.44);
units['phoenix']                 = new evoUnit('Phoenix',                 UT_ENG,   10,   14600,    7300, 44, 37,  6,  1, 1.4, 1.44);
units['wyvern']                  = new evoUnit('Wyvern',                  UT_ENG,   15,   25000,   12500, 64, 43,  7,  2, 1.4, 1.44);
units['demon']                   = new evoUnit('Demon',                   UT_LAST,  20,   34000,   17000, 93, 58,  5,  3, 1.4, 1.44);
                                                                                                                                                                                                            
//FOREST - INTELLIGENCE PATH                                                                                                                                                                      
units['dryad']                   = new evoUnit('Dryad',                   UT_ENG,    7,    3600,    2700, 21, 21, 13,  1, 1.4, 1.44);
units['basilisk']                = new evoUnit('Basilisk',                UT_ENG,   10,    5800,    4350, 29, 24, 21,  1, 1.4, 1.44);
units['medusa']                  = new evoUnit('Medusa',                  UT_ENG,   15,   10000,    7500, 37, 34, 15,  1, 1.4, 1.44);
units['cockatrice']              = new evoUnit('Cockatrice',              UT_ENG,   21,   18000,   13500, 54, 45, 23,  2, 1.4, 1.44);
units['werewolf']                = new evoUnit('Werewolf',                UT_LAST,  28,   26000,   19500, 70, 64, 30,  2, 1.4, 1.44);
                                                                                                                                                                                                            
//EGYPT - EXPENSIVE & LONG-LIVED PATH                                                                                                                                                     
units['scarab beetle']           = new evoUnit('Scarab Beetle',           UT_ENG,    8,    6000,    3000, 25, 25,  7,  0, 1.4, 1.44);
units['scarabbeetle']            = units['scarab beetle'];                                                                                                                      
units['mummy']                   = new evoUnit('Mummy',                   UT_ENG,   12,   12000,    6000, 38, 35,  1,  1, 1.4, 1.44);
units['sta']                     = new evoUnit('Sta',                     UT_ENG,   18,   19000,    9500, 46, 44, 12,  1, 1.4, 1.44);
units['sphinx']                  = new evoUnit('Sphinx',                  UT_ENG,   24,   28000,   14000, 67, 57, 14,  3, 1.4, 1.44);
units['anubis incarnate']        = new evoUnit('Anubis Incarnate',        UT_LAST,  32,   42000,   21000, 93, 78,  7,  3, 1.4, 1.44);
units['anubisincarnate']         = units['anubis incarnate'];                                                                                                                 
                                                                                                                                                                                                            
//PREHISTORIC - CHEAP, QUICK TO BUILD AND DEVELOP                                                                                                                               
units['avimimus']                = new evoUnit('Avimimus',                UT_ENG,    4,    3600,    1800, 22, 17,  2,  1, 1.4, 1.44);
units['therizinosaurus']         = new evoUnit('Therizinosaurus',         UT_ENG,    6,    5300,    2650, 26, 22,  3,  1, 1.4, 1.44);
units['styracosaurus']           = new evoUnit('Styracosaurus',           UT_ENG,    8,    9400,    4700, 33, 35,  8,  2, 1.4, 1.44);
units['carnotaurus']             = new evoUnit('Carnotaurus',             UT_ENG,   11,   15200,    7600, 51, 41,  5,  3, 1.4, 1.44);
units['giganotosaurus']          = new evoUnit('Giganotosaurus',          UT_LAST,  14,   24000,   12000, 75, 56,  4,  4, 1.4, 1.44);
                                                                                                                                                                                                            
                                                                                                                                                                                                            
//STATIC DEFENSES - Remember that the average unit is now weaker, so defenses don't need to be bumped up too much                           
units['fort']                    = new evoUnit('Fort',                    UT_NONE,   4,    2000,    1000, 24, 42,  0,  0, 1.4, 1.44);
units['satellite']               = new evoUnit('Satellite',               UT_NONE,   6,    7000,    3500, 57, 49,  0,  0, 1.4, 1.44);
units['satellite mark 2']        = new evoUnit('Satellite Mark 2',        UT_NONE,   6,    8000,    4000, 57, 65,  0,  0, 1.4, 1.44);
units['satellitemark2']          = units['satellite mark 2'];                                                                                                                    
units['nanowire wall']           = new evoUnit('Nanowire Wall',           UT_NONE,   9,   10000,    4000, 66, 61,  0,  0, 1.4, 1.44);
units['nanowirewall']            = units['nanowire wall'];                                                                                                                       
                                                                                                                                                                                                            
//OTHER TYPES                                                                                                                                                                                               
units['wave reflector']          = new evoUnit('Wave Reflector',          UT_NONE,   4,    2000,    2000,  0,  0,  0,  0, 1.4, 1.44);
                                                                                                                                                                                                            
units['biochemical missile']     = new evoUnit('Biochemical Missile',     UT_NONE,  12,   10000,   20000,  0,  0,  0,  0, 1.4, 1.44);
units['nanovirus missile']       = new evoUnit('Nanovirus Missile',       UT_NONE,  12,   30000,   15000,  0,  0,  0,  0, 1.4, 1.44);
units['bombs']                   = new evoUnit('Bombs',                   UT_NONE,  12,   11000,    7000,  0,  0,  0,  0, 1.4, 1.44);
units['neural reorganiser bomb'] = new evoUnit('Neural Reorganiser Bomb', UT_NONE,  24,   50000,   32000,  0,  0,  0,  0, 1.4, 1.44);
units['poison bombs']            = new evoUnit('Poison Bombs',            UT_NONE,  16,   16000,   12000,  0,  0,  0,  0, 1.4, 1.44);
                                                                                                                                                                                                            
units['land scan']               = new evoUnit('Land Scan',               UT_NONE,   4,    1000,    2000,  0,  0,  0,  0, 1.4, 1.44);
units['scan amplifier']          = new evoUnit('Scan Amplifier',          UT_NONE,   4,    1000,    1000,  0,  0,  0,  0, 1.4, 1.44);
units['sector scan']             = new evoUnit('Sector Scan',             UT_NONE,   8,    2000,    4000,  0,  0,  0,  0, 1.4, 1.44);
units['creature scan']           = new evoUnit('Creature Scan',           UT_NONE,   8,    3000,    6000,  0,  0,  0,  0, 1.4, 1.44);
units['r&d scan']                = new evoUnit('R&D Scan',                UT_NONE,   6,    2000,    3000,  0,  0,  0,  0, 1.4, 1.44);
units['news scan']               = new evoUnit('News Scan',               UT_NONE,  18,   10000,   20000,  0,  0,  0,  0, 1.4, 1.44);
units['military scan']           = new evoUnit('Military Scan',           UT_NONE,  12,    6000,   12000,  0,  0,  0,  0, 1.4, 1.44);
units['microwave pulse']         = new evoUnit('Microwave Pulse',         UT_NONE,  20,  520000, 1040000,  0,  0,  0,  0, 1.4, 1.44);
units['overload pulse']          = new evoUnit('Overload Pulse',          UT_NONE,  24, 1600000, 3200000,  0,  0,  0,  0, 1.4, 1.44);
units['Unknown']                 = new evoUnit('Unknown',                 UT_NONE,   0,       0,       0,  0,  0,  0,  0, 1.0, 1.00);

            } else {
                        units['monkey']           = new evoUnit('Monkey'           ,UT_NATURAL ,3   ,500    ,250    ,5   ,5   ,4   ,0  ,1.4 ,2.25);

                        units['sheep']            = new evoUnit('Sheep'            ,UT_NATURAL ,4   ,1500   ,750    ,11  ,11  ,5   ,0  ,1.4 ,2.25);
                        units['wolf']             = new evoUnit('Wolf'             ,UT_NATURAL ,10  ,8000   ,3500   ,27  ,25  ,14  ,0  ,1.4 ,2.25);
                        units['python']           = new evoUnit('Python'           ,UT_NATURAL ,12  ,12500  ,5000   ,36  ,31  ,7   ,1  ,1.4 ,2.25);
                        units['kangaroo']         = new evoUnit('Kangaroo'         ,UT_NATURAL ,15  ,17000  ,8000   ,37  ,42  ,5   ,1  ,1.4 ,2.25);
                        units['walrus']           = new evoUnit('Walrus'           ,UT_NATURAL ,18  ,28000  ,14000  ,55  ,54  ,4   ,2  ,1.4 ,2.25);

                        units['cow']              = new evoUnit('Cow'              ,UT_NATURAL ,6   ,2500   ,1250   ,16  ,13  ,3   ,1  ,1.4 ,2.25);
                        units['hyena']            = new evoUnit('Hyena'            ,UT_NATURAL ,10  ,8800   ,3600   ,28  ,27  ,8   ,1  ,1.4 ,2.25);
                        units['ostrich']          = new evoUnit('Ostrich'          ,UT_NATURAL ,13  ,18000  ,8000   ,43  ,41  ,6   ,2  ,1.4 ,2.25);
                        units['bear']             = new evoUnit('Bear'             ,UT_NATURAL ,16  ,26000  ,13000  ,57  ,50  ,12  ,3  ,1.4 ,2.25);
                        units['elephant']         = new evoUnit('Elephant'         ,UT_NATURAL ,22  ,40000  ,20000  ,65  ,69  ,21  ,4  ,1.4 ,2.25);

                        units['horse']            = new evoUnit('Horse'            ,UT_NATURAL ,5   ,2000   ,1000   ,13  ,13  ,6   ,1  ,1.4 ,2.25);
                        units['fox']              = new evoUnit('Fox'              ,UT_NATURAL ,9   ,7200   ,3200   ,24  ,25  ,8   ,0  ,1.4 ,2.25);
                        units['puma']             = new evoUnit('Puma'             ,UT_NATURAL ,13  ,11000  ,5000   ,32  ,32  ,6   ,1  ,1.4 ,2.25);
                        units['lynx']             = new evoUnit('Lynx'             ,UT_NATURAL ,15  ,12000  ,5500   ,35  ,31  ,10  ,1  ,1.4 ,2.25);
                        units['lion']             = new evoUnit('Lion'             ,UT_NATURAL ,15  ,12000  ,5000   ,31  ,35  ,10  ,1  ,1.4 ,2.25);
                        units['cheetah']          = new evoUnit('Cheetah'          ,UT_NATURAL ,16  ,14000  ,7000   ,41  ,29  ,5   ,1  ,1.4 ,2.25);
                        units['panther']          = new evoUnit('Panther'          ,UT_NATURAL ,16  ,14000  ,7000   ,30  ,40  ,6   ,1  ,1.4 ,2.25);
                        units['tiger']            = new evoUnit('Tiger'            ,UT_NATURAL ,20  ,18000  ,9000   ,43  ,43  ,11  ,2  ,1.4 ,2.25);
                        units['rhino']            = new evoUnit('Rhino'            ,UT_NATURAL ,24  ,28000  ,17000  ,66  ,53  ,3   ,3  ,1.4 ,2.25);

                        units['centaur']          = new evoUnit('Centaur'          ,UT_ENG     ,5   ,4800   ,2400   ,22  ,23  ,10  ,1  ,1.4 ,2.25);
                        units['unicorn']          = new evoUnit('Unicorn'          ,UT_ENG     ,8   ,7200   ,3600   ,30  ,25  ,6   ,1  ,1.4 ,2.25);
                        units['gryphon']          = new evoUnit('Gryphon'          ,UT_ENG     ,12  ,10800  ,5400   ,36  ,35  ,8   ,2  ,1.4 ,2.25);
                        units['minotaur']         = new evoUnit('Minotaur'         ,UT_ENG     ,18  ,19000  ,9500   ,54  ,43  ,14  ,2  ,1.4 ,2.25);
                        units['dragon']           = new evoUnit('Dragon'           ,UT_LAST    ,24  ,30000  ,15000  ,76  ,67  ,8   ,3  ,1.4 ,2.25);

                        units['fire sprite']      = new evoUnit('Fire Sprite'      ,UT_ENG     ,4   ,5000   ,2500   ,25  ,18  ,4   ,0  ,1.4 ,2.25);
                        units['firesprite']       = units['fire sprite'];
                        units['salamander']       = new evoUnit('Salamander'       ,UT_ENG     ,7   ,9000   ,4500   ,36  ,26  ,10  ,1  ,1.4 ,2.25);
                        units['phoenix']          = new evoUnit('Phoenix'          ,UT_ENG     ,10  ,14600  ,7300   ,44  ,37  ,6   ,1  ,1.4 ,2.25);
                        units['wyvern']           = new evoUnit('Wyvern'           ,UT_ENG     ,15  ,25000  ,17500  ,69  ,45  ,7   ,2  ,1.4 ,2.25);
                        units['demon']            = new evoUnit('Demon'            ,UT_LAST    ,20  ,36000  ,18000  ,96  ,60  ,5   ,3  ,1.4 ,2.25);

                        units['dryad']            = new evoUnit('Dryad'            ,UT_ENG     ,7   ,3600   ,2700   ,21  ,21  ,13  ,1  ,1.4 ,2.25);
                        units['baskilisk']        = new evoUnit('Baskilisk'        ,UT_ENG     ,10  ,6000   ,4500   ,29  ,24  ,21  ,1  ,1.4 ,2.25);
                        units['medusa']           = new evoUnit('Medusa'           ,UT_ENG     ,15  ,10000  ,7500   ,37  ,34  ,15  ,1  ,1.4 ,2.25);
                        units['cockatrice']       = new evoUnit('Cockatrice'       ,UT_ENG     ,21  ,18000  ,13500  ,54  ,45  ,23  ,2  ,1.4 ,2.25);
                        units['werewolf']         = new evoUnit('Werewolf'         ,UT_LAST    ,28  ,28000  ,18500  ,71  ,65  ,30  ,2  ,1.4 ,2.25);

                        units['scarab beetle']    = new evoUnit('Scarab Beetle'    ,UT_ENG     ,8   ,6000   ,3000   ,26  ,23  ,7   ,0  ,1.4 ,2.25);
                        units['scarabbeetle']     = units['scarab beetle'];
                        units['mummy']            = new evoUnit('Mummy'            ,UT_ENG     ,12  ,11000  ,5500   ,36  ,34  ,0   ,1  ,1.4 ,2.25);
                        units['sta']              = new evoUnit('Sta'              ,UT_ENG     ,18  ,18000  ,9000   ,45  ,42  ,12  ,1  ,1.4 ,2.25);
                        units['sphinx']           = new evoUnit('Sphinx'           ,UT_ENG     ,24  ,28000  ,14000  ,67  ,56  ,14  ,3  ,1.4 ,2.25);
                        units['anubis incarnate'] = new evoUnit('Anubis Incarnate' ,UT_LAST    ,32  ,42000  ,21000  ,93  ,78  ,8   ,3  ,1.4 ,2.25);
                        units['anubisincarnate']  = units['anubis incarnate'];

                        units['avimimus']         = new evoUnit('Avimimus'         ,UT_ENG     ,4   ,3700   ,1850   ,22  ,17  ,2   ,1  ,1.4 ,2.25);
                        units['therizinsaurus']   = new evoUnit('Therizinsaurus'   ,UT_ENG     ,6   ,5000   ,2500   ,23  ,22  ,3   ,1  ,1.4 ,2.25);
                        units['styracosaurus']    = new evoUnit('Styracosaurus'    ,UT_ENG     ,8   ,9000   ,4500   ,32  ,33  ,8   ,2  ,1.4 ,2.25);
                        units['carnotaurus']      = new evoUnit('Carnotaurus'      ,UT_ENG     ,11  ,15000  ,7500   ,48  ,41  ,5   ,3  ,1.4 ,2.25);
                        units['giganotosaurus']   = new evoUnit('Giganotosaurus'   ,UT_LAST    ,14  ,24000  ,12000  ,74  ,55  ,4   ,4  ,1.4 ,2.25);

                        units['fort']             = new evoUnit('Fort'             ,UT_NONE    ,4   ,2000   ,1000   ,25  ,55  ,0   ,0  ,1.4 ,2.25);
                        units['satellite']        = new evoUnit('Satellite'        ,UT_NONE    ,6   ,8000   ,4000   ,30  ,40  ,0   ,0  ,1.4 ,2.25);
                        units['nanowire wall']    = new evoUnit('Nanowire wall'    ,UT_NONE    ,10  ,12000  ,4500   ,65  ,85  ,0   ,0  ,1.4 ,2.25);
                        units['nanowirewall']     = units['nanowire wall'];
                        units['satellite mark 2'] = new evoUnit('Satellite Mark 2' ,UT_NONE    ,6   ,8000   ,4000   ,45  ,55  ,0   ,0  ,1.4 ,2.25);
                        units['satellitemark2']   = units['satellite mark 2'];

                        units['wave reflector']   = new evoUnit('Wave Reflector'   ,UT_NONE    ,4   ,2000   ,2000   ,0   ,0   ,0   ,0  ,0   ,0   );

                        units['biochemical missile']=new evoUnit('Biochemical Missile',UT_NONE ,12  ,10000  ,20000  ,0   ,0   ,0   ,0  ,0   ,0   );
                        units['nanovirus missile']= new evoUnit('Nanovirus Missile',UT_NONE    ,12  ,30000  ,15000  ,0   ,0   ,0   ,0  ,0   ,0   );
                        units['bombs']            = new evoUnit('Bombs'            ,UT_NONE    ,12  ,11000  ,7000   ,0   ,0   ,0   ,0  ,0   ,0   );
                        units['neural reorganiser bomb']=new evoUnit('Neural Reorganiser Bomb',UT_NONE,24,50000,32000,0  ,0   ,0   ,0  ,0   ,0   );
                        units['poison bombs']     = new evoUnit('Poison Bombs'     ,UT_NONE    ,16  ,16000  ,12000  ,0   ,0   ,0   ,0  ,0   ,0   );

                        units['land scan']        = new evoUnit('Land Scan'        ,UT_NONE    ,4   ,1000   ,2000   ,0   ,0   ,0   ,0  ,0   ,0   );
                        units['scan amplifier']   = new evoUnit('Scan Amplifier'   ,UT_NONE    ,4   ,1000   ,1000   ,0   ,0   ,0   ,0  ,0   ,0   );
                        units['sector scan']      = new evoUnit('Sector Scan'      ,UT_NONE    ,8   ,2000   ,4000   ,0   ,0   ,0   ,0  ,0   ,0   );
                        units['creature scan']    = new evoUnit('Creature Scan'    ,UT_NONE    ,8   ,3000   ,6000   ,0   ,0   ,0   ,0  ,0   ,0   );
                        units['r&d scan']         = new evoUnit('R&D Scan'         ,UT_NONE    ,6   ,2000   ,3000   ,0   ,0   ,0   ,0  ,0   ,0   );
                        units['news scan']        = new evoUnit('News Scan'        ,UT_NONE    ,18  ,10000  ,20000  ,0   ,0   ,0   ,0  ,0   ,0   );
                        units['military scan']    = new evoUnit('Military Scan'    ,UT_NONE    ,12  ,6000   ,12000  ,0   ,0   ,0   ,0  ,0   ,0   );
                        units['microwave pulse']  = new evoUnit('Microwave Pulse'  ,UT_NONE    ,20  ,520000 ,1040000,0   ,0   ,0   ,0  ,0   ,0   );
                        units['overload pulse']   = new evoUnit('Overload Pulse'   ,UT_NONE    ,24  ,1600000,3200000,0   ,0   ,0   ,0  ,0   ,0   );
            }
}

