// ==UserScript==
// @author      QP
// @namespace	http://userscripts.org/
// @version     2.3.0
// @name		Travian QP Market 2.3
// @description	Travian complete market filters - v2.3.0
// @include     http://s*.travian*.*/build.php*
// @include     http://s*.travian*.*/spieler.php?uid=*
// @include     http://s*.travian*.*/a2b.php*
// @exclude     http://forum.travian*
// @exclude     http://www.travian*
// ==/UserScript==







// #################################################################################################
// #############################      DEFINES FOR CONFIGURATIONS        ############################
// #################################################################################################
var DBG_NONE = 0;	// the "Started" message still appears on this level
var DBG_HIGH = 1;
var DBG_NORM = 2;
var DBG_LOW = 3;
// #################################################################################################
// #############################      /DEFINES FOR CONFIGURATIONS        ###########################
// #################################################################################################


// #################################################################################################
// ######################################      SETTINGS       ######################################
// #################################################################################################
var DEF_RATIOCOLOR_ENABLED = false;	// enables ratio coloring
var DEF_RATIOCOLOR_MINGOOD = 1.1;	// ratios above this value will be marked with the good color
var DEF_RATIOCOLOR_MAXBAD = 0.9;	// ratios above this value will be marked with the bad color
var DEF_RATIOCOLOR_COLORGOOD = "palegreen";
var DEF_RATIOCOLOR_COLORNORMAL = "lightyellow";
var DEF_RATIOCOLOR_COLORBAD = "lightpink";

var DEF_TRIBECOLOR_ENABLED = true;

var DEBUG_VERBOSITY = DBG_NONE;

// ##########   Show alliance column - true = shows alliance column; false = hides it   ##########
var CONFIG_SHOW_ALLIANCE_COLUMN = true;

// #################################################################################################
// ######################################      /SETTINGS      ######################################
// #################################################################################################




/**
 * Initially (very, very initially...) based on the "Travian Market++" script by "usr8472@gmail.com"...
 */

/** Presentation info
----- Small description -----
Market Buy Page Script<ul><li>Permanent filters: resources, ratios (custom/predef), alliances (partial/multiple), ...</li><li>Extra info columns</li><li>Next-page shortcut key, auto next page (on no offers pages), ...</li></ul>All langs & servers
----- Full description -----
<h3>Marketplace <i>Buy Page</i> Features</h3>
<ul>
	<li>filters</li>
	<ul>
		<li>by resources offered (including and/or excluding)</li>
		<li>by resources searched (including and/or excluding)</li>
		<li>by ratio (4 predefined filters: loss, even, even/profit, profit)</li>
		<li>by custom ratio (bigger or equal than)</li>
		<li>by action (acceptable offers only)</li>
		<li>by alliance(s)</li>
		<ul>
			<li>including and/or excluding</li>
			<li>multiple alliances</li>
			<li>partial and/or full match (partial is great for alliance families)</li>
		</ul>
		<li>permanent filters per user/server</li>
		<ul>
			<li>no more pressing next page and setting the filters all over again!!</li>
			<li>side effect: leave market, go to any market (same account), filter is still there</li>
		</ul>
		<li>selected filters easily seen (different cell background color)</li>
	</ul>
	<li>offers table</li>
	<ul>
		<li>new column: "Alliance" - mouseover on player name is too slow</li>
		<li>new column: "Ratio"</li>
		<ul>
			<li>easier to decide on several offers shown</li>
			<li>next/previous page links not just bellow the "Accept Offer" link</li>
			<li>easy script configurable good/normal/bad ratios coloring. Configure:</li>
			<ul>
				<li>enabled/disabled</li>
				<li>good/normal/bad ratios</li>
				<li>good/normal/bad ratio colors</li>
			</ul>
			<li>easy script configurable good/normal/bad ratios colors</li>
		</ul>
		<li>enhanced column: "Duration"</li>
		<ul>
			<li>Title mouseover: "min <-> max" durations of that page (useful when all offers were filtered)</li>
			<li>Cell mouseover: show Round Trip Time (RTT - time your merchants will take to go and return)</li>
			<li>Color coding:</li>
			<ul>
				<li><span style="background-color:palegreen;">Teuton (lowest RTT) - green</span></li>
				<li><span style="background-color:lightyellow">Roman (medium RTT) - yellow</span></li>
				<li><span style="background-color:lightpink;">Gauls (highest RTT) - red</span></li>
				<li><span style="background-color:cyan;">Round Trip Time - cyan</span></li>
			</ul>
			<li>easy script configurable enable/disable tribe coloring</li>
		</ul>
		<li>replace "Accept Offer" text by the Ok button (smaller = saves on double line offers)</li>
	</ul>
	<li>shortcut key "space" - goes to the next page (no need to look for the "»" link)</li>
	<li>no translations needed - all words retrieved from game</li>
	<li>auto next page - if no offers on page (all filtered out) automatically goes to the next page</li>
	<li>Plus filters
		<ul>
			<li>mix QP Market filters with Plus filters</li>
			<li>selected Plus filters easily seen (different cell background color)</li>
		</ul>
	</li>
</ul>

<h3>Instruction details</h3>
<ul>
	<li>General</li>
	<ul>
		<li>press a filter to select it</li>
		<li>select multiple filters at will</li>
		<li>clean the filters by pressing the red cross on the right</li>
	</ul>
	<li>RoundTripTime</li>
	<ul>
		<li>mouseOver the duration cell - a blue background time will appear</li>
		<li>until the script learns your tribe the time shown will be: ??:??:??</li>
		<li>visit the Send Troops Page so that the script knows your tribe</li>
		<li>this time tells you when will your merchants return from this trade</li>
	</ul>
	<li>textboxes</li>
	<ul>
		<li>the "Ok" on any of the textboxes is simply removing focus from it</li>
		<li>(eg.: on the ratio write "1.5" and then press anywhere else in the page)</li>
	</ul>
	<li>alliance filters</li>
	<ul>
		<li>case sensitive</li>
		<li>for multiple alliance just separate them by ";"</li>
		<li>for partial match check the checkbox to the left of the textbox</li>
		<li>partial match checkbox should be set before the alliance(s) - otherwise refresh</li>
		<li>if you already had an alliance set and want to change it - might need refresh</li>
		<li>known bug: searching for empty/space alliance</li>
	</ul>
	<li>shortcut key "space"</li>
	<ul>
		<li>pressing the "space" key almost anywhere will go to the next page</li>
		<li>on last page returns to previous page</li>
		<li>disabled when focus is on alliance textboxes (they can have spaces in their names)</li>
	</ul>
	<li>auto next page (ANP)</li>
	<ul>
		<li>triggered only on new offers page</li>
		<li>"reset" does not reset this back to 9 - I think it's more user friendly this way</li>
		<li>will only go to the next page the amount of configured times</li>
		<li>configurable in the first textbox of action row of the filter table</li>
		<ul>
			<li>enabled text box - configures how many ANP can be done</li>
			<li>disabled textbox - shows how many ANP can still be done before stopping</li>
		</ul>
	</ul>
	<li>configurable ratio coloring</li>
	<ul>
		<li>this is configurable inside the script right at the start of the script</li>
		<li>default is turned off: it is a bit confusing to have duration + ratio coloring turned on</li>
	</ul>
	<li>configurable alliance column</li>
	<ul>
		<li>this is configurable inside the script right at the start of the script</li>
		<li>default is turned on: shows the column</li>
		<li>even without showing the column, the alliance filters can be used</li>
	</ul>
	<li>translations</li>
	<ul>
		<li>before you retrieve the words in your language you will see the english defaults</li>
		<li>visit the following pages to retrieve your language words:</li>
		<ul>
			<li>"Alliance" - retrieved from any player profile page</li>
			<li>"Accept Offer"  - retrieved from any acceptable offer at the market itself</li>
		</ul>
	</ul>
</ul>


<h3>To Do</h3>
<ul>
	<li>Possible future features</li>
	<ul>
		<li>add number of merchants needed for offer (? if unknown)</li>
		<li>improve behavior (eg.: pressing a 2nd time would de-select filter)</li>
	</ul>
	<li>Features to be added</li>
	<ul>
		<li>Re-check RTT</li>
		<li>--- Currently none ---</li>
	</ul>
	<li>Requests</li>
	<ul>
		<li>--- Currently none ---</li>
	</ul>
	<li>Known bugs</li>
	<ul>
		<li>--- Currently none ---</li>
	</ul>
</ul>

<h3>History</h3>
<ul>
	<li>2.3.0 - 08-04-05
		<ul>
			<li>added: Alliance column configurable in script (hide)</li>
			<li>improved: is page Market functions is more restrictive</li>
		</ul>
	</li>
	<li>2.2.0 - 08-01-14
		<ul>
			<li>added: Plus filters shown as selected by background color</li>
		</ul>
	</li>
	<li>Previous history inside the script only</li>
</ul>
<h3>Generic script goals</h3>
<ul>
	<li>simplify some tasks - repetitive tasks; too-many-steps tasks; ... </li>
	<li>no support for other browsers - using of firefox GM_set/GM_get to save permanent info</li>
	<li>no need for language translations - simple new icons OR words/icons from travian</li>
	<li>low priority on Plus support - Plus users already have benefits over others</li>
	<li>ultra low priority on country specific HTML support - some travian servers have changed HTML in the game</li>
</ul>
*/


/**
----- Previous Small description -----
Permanent filters - maintained when going to next page.
Filters: resources, ratios (custom also), alliances (partial/multiple), actions.
Extras: next-page shortcut key, auto next page (on no offers pages), all langs, all servers, ...

<h3>Previous versions history</h3>
<ul>
	<li>2.1.0</li>
	<ul>
		<li>improve: AutoNextPage doesn't go to previous when reaches the end</li>
	</ul>
	<li>2.0.1</li>
	<ul>
		<li>bugfix/improve: apply filters on new page has no timeout now</li>
	</ul>
	<li>2.0.0</li>
	<ul>
		<li>added: easy script configurable tribe coloring (duration cells)</li>
		<li>added: easy script configurable ratio coloring</li>
		<li>improve: RTT hours < 10, only 1 char used: prevents anoying cell resizing on mouseover/out</li>
		<li>improve: internals: added debug levels so the console doesn't have tons of stuff</li>
		<li>bugfix: alliance filter now correctly filters "no alliance" alliances and "space" alliances</li>
	</ul>
	<li>1.8.0</li>
	<ul>
		<li>added: support for servers called "travian3" (in the url)</li>
		<li>bugfix: new instalations get clean filters instead of undefined ones</li>
		<li>bugfix: RoundTripTime now working (missing @include)</li>
	</ul>
	<li>1.7.0</li>
	<ul>
		<li>added RoundTripTime on mouseover for each offer's duration cell</li>
		<li>removed send troops features: decided this should be a MarketPlace Buy Page only script,
		other features will be moved to the other script "QP Targets" (maybe it should be renamed..)</li>
	</ul>
	<li>1.3.0</li>
	<ul>
		<li>added duration mouseover with min and max duration of the offers of page</li>
	</ul>
	<li>1.2.0</li>
	<ul>
		<li>added totals on "Send Resources page"</li>
		<li>changed include rules to allow all marketplace pages (code filters the proper ones)</li>
	</ul>
	<li>1.1.0</li>
	<ul>
		<li>added color coded "Duration" column</li>
	</ul>
	<li>1.0.0</li>
	<ul>
		<li>re-written some internal code (simplified and improved performance)</li>
		<li>history displayed only for the current major version (the rest is still in the script)</li>
	</ul>
	<li>0.9.9a</li>
	<ul>
		<li>bugfix: lang info was not being stored per server and user</li>
		<li>resized the "Ok button" so the browser doesn't need to do it anymore</li>
	</ul>
	<li>0.9.9</li>
	<ul>
		<li>filter by alliance enabled with full behavior (see feature)</li>
		<li>reset will no longer change the auto-next page feature to 9</li>
		<li>if no bugs are found in this version, will re-release this as version 1 (I like round numbers for stable versions)</li>
	</ul>
	<li>0.9.5</li>
	<ul>
		<li>deactivate the next page shortcut key IF focus is on an alliance filter textbox (some alliance tags do have spaces)</li>
	</ul>
	<li>0.9.4</li>
	<ul>
		<li>auto next page is now random delayed (just to seem more human like behavior)</li>
	</ul>
	<li>0.9.3</li>
	<ul>
		<li>auto next page when the page with the filters applied has no offers</li>
	</ul>
	<li>0.9.2</li>
	<ul>
		<li>support for Plus - Plus users can even combine their filters with these QP market filters</li>
		<li>some internal changes (to add the support of Plus cleaned up some code... hope everything else is still ok)</li>
	</ul>
	<li>0.9.1</li>
	<ul>
		<li>escape/unescape for permanent saved info</li>
		<li>bug fix: Ok button now included in script (was a lang dependant relative link)</li>
	</ul>
	<li>0.9</li>
	<ul>
		<li>added fields for auto next page... but they're NOT working yet!</li>
		<li>"Alliance" retrieved from any player profile page</li>
		<li>filter by action - acceptable offers only (no mercs/resources not for now)</li>
		<li>replace "Accept Offer" text by the Ok button - it's smaller, saves on double line offers</li>
	</ul>
	<li>0.8.4</li>
	<ul>
		<li>added filter by custom ratio</li>
		<li>added fields for alliance filters... but they're NOT working yet!</li>
		<li>replace "Reset" by delete cross image</li>
		<li>reorganized filter locations</li>
		<li>langfile improved - still need "Alliance"; replaced "Ratio" by "Offering/Searching" and "O/S" (first letters)</li>
	</ul>
	<li>0.8.3 - added shortcut key "space" to go to the next page (no more looking and pointing for the tiny У�ЏУ�ПУ�Н</li>
	<li>0.8.2 - bug corrected - fixed behavior...</li>
	<li>0.8.1 - bug corrected - had tampered with the params from triggering the filters on next page</li>
	<li>0.8 - first pre-release</li>
</ul>
*/


var isShortcutNextPageActive = true;
function activateNextPageShortcut() { isShortcutNextPageActive = true; }
function deactivateNextPageShortcut() { isShortcutNextPageActive = false; }



/**
* action_goToNextPage
*/
function action_goToNextPage() {
	var DEF_CHAR_RAQUO = unescape('%BB');	// Right Angled Quotes

	var links = document.getElementsByTagName("a");
	var i;
	for(i=0; i<links.length; i++) {
		if (links[i].innerHTML.indexOf(DEF_CHAR_RAQUO) == 0) { break; }
	}
	if (i == links.length) { return; }
	document.location.href = links[i].href;
}


document.addEventListener("keydown", function (e) {
	if (isShortcutNextPageActive) {
		var key = String.fromCharCode(e.keyCode).toLowerCase();
	    if (key == " ") {
	    	action_goToNextPage();
		}
	}
}
, true);




var permanentKeyAlliance = "LANG_Alliance";
var permanentKeyAcceptOffer = "LANG_AcceptOffer";
var permanentKeySingleVillageCoords = "SingleVillageCoords";
var permanentKeyTribe = "Tribe";

function findAndSaveLang_Alliance() {
	var allianceWord = xpathEvaluate('//tr[@class="s7"][2]/td[1]').snapshotItem(0).innerHTML;
	var allianceWordWithoutColon = allianceWord.replace(":", "");
	GM_setValue(getServerName() + "_" + getUserId() + "_" + permanentKeyAlliance, escape(allianceWordWithoutColon));
}

function findAndSaveLang_AcceptOffer() {
	var acceptOfferTxt = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr[not(@class)]/td[7]/a');
	if (acceptOfferTxt.snapshotLength > 0) {
		GM_setValue(getServerName() + "_" + getUserId() + "_" + permanentKeyAcceptOffer, escape(acceptOfferTxt.snapshotItem(0).innerHTML));
	}
}


var eventSource= (navigator.appName == 'Opera') ? document : window; // I use this because I might want to make it cross browser later



var TRIBE_ROMAN = 0;
var TRIBE_GAUL = 1;
var TRIBE_TEUTON = 2;
var TRIBE_NATURE = 3;
var TRIBE_NATAR = 4;
var TRIBE_UNDISCLOSED = 5;

eventSource.addEventListener( 'load', function( e ) {  onLoadAnyPage();  } ,false);  //loads the script on the page load
var loc=window.location.href; // the current page href
var lang = loc.match(/travian(\.[a-zA-Z]{2,3})+/ ).pop(); // thanks to F. S., who emailed me with a update for the regex
var marketc;// the current market table
var orgmarket;//the first loaded market table
var fields=[]; //space for the field name information
var langfile=[];//Offering, Searching, Action, Alliance
var W_OFFER = 1; var W_SEARCH = 2; var W_ACTION = 3; var W_ALLIANCE = 4; var W_ACCEPTOFFER = 5;
var tab;//location of the menu to be inserted after
var res;//the menu to be inserted
var change=false;//do we need to rest the menu
//var imgOkButton = "data:image/gif,GIF89a2%00%14%00%C4%1F%00%D1%F3%A4%B6%C4%A0%F6%FF%E4%D1%FDz%8E%DE-%ED%FD%D2%D6%FC%88%E6%FE%B7%F2%FE%DB%DE%FD%A0%DB%FD%94%B3%EAk%A1%E4I%C3%F0%83%E8%FC%C3%DC%F8%B1%ED%FD%CC%A9%E6Z%B4%F0S%A9%EBF%BF%F5_%CE%FCr%C7%F9j%9E%E69%93%E1%2C%8A%DD!%82%DA%18q%D0%00%7F%D8%14%C0%C0%C0%D0%FDt%FF%FF%FF!%F9%04%01%00%00%1F%00%2C%00%00%00%002%00%14%00%00%05%FF%E0%F7udi%9Eh%AA%AE%9D8%06%5E%2C%CF%F4%60%DB%F1%9D%E3t%1F%07%AD%0E%CC%E73(%8EG%831%B9T%18%06D%1A%B0%13%AD%19%12%87l6%81%DDv%0F%09%05%B4%1A%23%91s%D7CA%C0F8%D4%027%DC%9D%18%93%CD%E7%F4z%C3%DF%20%20%02%7C%05%7B%1B%0Eug%1ExU%03%0Ap%7C%10%08%7C%08%81~%94ob%88%8AQ%8C%07%94%10%07%80%7C%94%9E%60%06%88%89%1D%15%AA%AB%AC%AA%9C%96Y%A3%7D%92%60%03%AD%B7%AB%24%16%BB%BC%BD%BC%8D%91%85X%C1%C1%B3%86%03%BE%C9%BC%24%14%CD%CE%CF%CE%06%0F%C1%0E%0F%D3%92%8F%D4%00%03%D0%DD%CE%24%12%E1%E2%E3%E2%0D%00%05%82%0F%0E%94%D4%E8%1B%05%0F%0D%14%E4%F4%E1%24%13%F8%F9%FA%F9%14%E6%10%92%96%DCY%13%D8%40%C2%BE%83%F8H%5CX%C8%B0!C%06%0B%CC9%98%F5%00%C0%C4%0D%00%2C%F2%01%D0%80%81%C3%8F%0BI%60%18I%B2d%C9%0B%11%16Vd%5C%D9%40e%C6%96%2C%23%5C0Is%24%89%0C8s%EA%DCI%00%E2%82%9F%0B%220H%19t%E8O%8F%3B%93%E6%24%A1%A1%A9%D3%A7P%9B%12%98%3A%15'U%ABU%A3jmJ%22%00%87%AF%60%C3%8A%1DK%B6%ACY%0E%40%5E%9C%5D%CBvmZ%11%2C%E2%CA%9D%2B%22%04%00%3B";
var imgOkButton = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00(%00%00%00%10%08%02%00%00%00%EB%B5%AA%FA%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%03%1FIDATx%9C%ADUMh%5CU%18%3D%F7%E7%BD7%93%E7Lj%D3)%13%92%8C%D3ik%AAAQ%14%B1%5D%B80%A2P%14%C1%AD%A8%C5%7D%5D%B9Q%10%8B%E0%A2%20%AED%B7%15%C1%7DQ%91%82%20%8AZ%EBFmQ%3Ai%93%C9%8F%93db%E7%F7%CD%9B%BC%F7%EE%BB%F7s1%B1T%C3%DC%D9%F4%AC%CE%BD%7C%F7%9C%7B%3E%EE%0F%D3Z%AF%AD%D76%1AU.S%8C%01%BB%83%D3%1D3%FB%F9H%18%25%E7%8A'%EE%2B%95%E5%DAzm%B5y%E5%9E%F9%257%1FZ%3D%85%C0%04%83%D8%5B%0FE%D0%02%99%FD%5C%23%02%F4(%9D%B8%E7%AF.w%00%92%1B%8D%EBc%5D9%5C%87%263%BC8T%07%90R%A8%11yl%0A%40J%7D%8D%F86O%D0%8E%F17%8D%F0%F6%F2!%3B%BA%B4Q%9D%94%5C%EAqY%A5%A4%C9%0C%9B%99%A0R%96%1Ff%10%04%1DQ3a%ED%2C%CD%3A%3C%F3%3F%1E%A2%16%A3i%09%ED%E6%C3Xjn%B1%1C%FA%3A%94%F7Y%D9g%15%95%B2%8F%AE%BF%F0%C9%D2%8B%1F%FE%B9%F8S%E3sW%17ZQ%FD%DD%DF%1F%B8%D6%FA%C6%A7%23%D5%EEw%E7%FFx%B2%DA%FD%F6%BFGa%24%E4%18%5B%08%C1%B2%1E%2B%F4%E3%E0%8B%BF%DE%99%CA%CC%BDTz%7Fk%B0%FCe%FD%1C%18%16%F2%A7%01%12%CC%BD%D1%FB%E1%AB%CDs%8B%D3g%2B%07%1E%19%D0%1A%60%C6%1As%00d%01%08%00%03_%0F%7F%5D%0D%7F9y%E8%D5%94%F5f%FD%07%CB%FE%13%DF7%3E%1EJ%5C%ED%5C%BCX%7F%EB%803%F3%F0%BD%CF%A7%14%26%E8%1AJm%9AD%00%24%C1%C4%26%1E%9D8%F1%B8%06%23%A2%14%00A'%D4%91%2CgH%03%D0P%00j%FD%9F%01(%B3%FBc%E3%C2%A3%87%9F1P%16%C1!%08Fj%A3%C3%A4k)r%9C%83%8342%7B%87%85%2B%95U%E2%F6e5%00N%CF%BC%FD%F8%D4%CB%EF%5D%5D%E8%AA%AD%24qS.v%D3%C0%90%AD%DB%DChiH%07Vc%A6%5B%9Co%FB%CE%C1)%AF%7C3%B8%7C%AA%F0Z%A8Z%CD%B8v%7C%F2%A9%E1n%94%89%06%BA5%9F_l%C6%1BA%BA%13S%26A%BC%9B%0E%2C%9A9%D2R%93%EE%25%1DK%91%E20%22Wp%8F%3F%5D%7C%E3%D2%E6%F9(%0Dn%C5%2B%9E%9C8Ux%5D%99%10%40%A4%FB%9Dd%F3d%E1%95%0B%CBgj%C1%95%A2%7F%AC%1D%F5%12%EA%5B4'H%B3%AF%2F%7F%B62%F3%81-1x%DE)%E6%C5%91io!%D2%03e%22%00%AEt%22%1D%14%DC%F9f%BC%E6%08%19%9B%A0%E0%9E%18%F2%8EZ%DFQ%BFE%DA%96%B8R%7Fs%D8j%5Bb%00A%D2i%89F%90n%7B%3C%B7%D7%86d0%D0%ED%9D%A8%EA%0A%FF_%BE%E4%0A%7F%10%B7vi%BB%1D%ED%D8%05%0Di)t%D6%8D%A6%03g%C5%5E%1A%E90Ho%09%E6%0C%87D)As%E6%ED%E7%CADd%FD*r%AA%22t%96%AD%D4n%5E%DB%BAt%23%F7%E9X%EF%BB%82%BC%AA%1C%0B%CE%3C4%FD%AC%2C%CD%95%89%9Es%EB%87Rn%7B%B1%EF%16%1C%E3%DF%3F%FBXi%AE%FC%0F%F8'%F6%E26%E3%C3%A1%00%00%00%00IEND%AEB%60%82";


filterBackGroundColor = "lightgray";

var resourceImages = new Array();// Images of the different resources, ready to be used. Ordered: wood, clay, iron, crop

// 8 offer (4incl + 4excl), 8 search (4incl + 4excl), 5 ratio (4predef + 1custom)
// 4 alliance, 2 action (acceptable only + autoNextPage + currentAutoNextPage)
qFilterState = new Array (	"false", "false", "false", "false",
								"false", "false", "false", "false",
								"false", "false", "false", "false",
								"false", "false", "false", "false",
								"false", "false", "false", "false", "false",
								"false", " ", "false", " ",
								"false", "9", "9");
if (!qFilterState) {cleanFilterState();}

qFilterCells = new Array();


function cleanFilterState() {
	qFilterState = new Array (	"false", "false", "false", "false",
								"false", "false", "false", "false",
								"false", "false", "false", "false",
								"false", "false", "false", "false",
								"false", "false", "false", "false", "false",
								"false", " ", "false", " ",
								"false", qFilterState[26], qFilterState[27]);
}

var DEF_COLUMN_PLAYER_TITLE = 2;
var DEF_COLUMN_DURATION_TITLE = 3;
var DEF_COLUMN_ACTION_TITLE = 4;

var DEF_COLUMN_PLAYER = 4;
var DEF_COLUMN_DURATION = 5;
var DEF_COLUMN_ACTION = 6;

function transformBuy_showAllianceRatioColumns() {
	// Title that says: "Biddings at the marketplace"
	xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr[@class="rbg"]/td').snapshotItem(0).colSpan = 9;

	// Last row, with the links to the previous and next page
	xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td[@class="rowpic"]').snapshotItem(0).colSpan = 9;
	
	// For the titles row
	var qpTitlesRow = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr[@class="rbg"]/../tr[@class="cbg1"]');
	var durationCell = null;
	for(var i=0; i<qpTitlesRow.snapshotLength; i++) {
		var row = qpTitlesRow.snapshotItem(i);

		// Duration cell
		durationCell = row.cells[DEF_COLUMN_PLAYER_TITLE];

		// Alliance column
		if (CONFIG_SHOW_ALLIANCE_COLUMN) {
			var newCellAllianceTitle = document.createElement("td");
			newCellAllianceTitle.innerHTML = langfile[W_ALLIANCE];
			row.insertBefore(newCellAllianceTitle, row.cells[DEF_COLUMN_PLAYER_TITLE]);
		}

		// Ratio column
		var newCellRatioTitle = document.createElement("td");
		newCellRatioTitle.innerHTML = langfile[W_OFFER].substring(0,1) + "/" + langfile[W_SEARCH].substring(0,1);
		newCellRatioTitle.title = langfile[W_OFFER] + "/" + langfile[W_SEARCH];
		row.appendChild(newCellRatioTitle);
	}

	var activeVillageLink = xpathEvaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td');
	var coordXCurrentActiveVillage = -10000;
	var coordYCurrentActiveVillage = -10000;
	if (activeVillageLink.snapshotLength > 0) {
		coordXCurrentActiveVillage = parseInt(activeVillageLink.snapshotItem(0).innerHTML.replace("(", ""));
		coordYCurrentActiveVillage = parseInt(activeVillageLink.snapshotItem(2).innerHTML.replace(")", ""));
	} else {
		var singleVillageCoords = loadSingleVillageCoordinates();
		coordXCurrentActiveVillage = singleVillageCoords[0];
		coordYCurrentActiveVillage = singleVillageCoords[1];
	}
//	GM_log("[transformBuy_showAllianceRatioColumns] X " + coordXCurrentActiveVillage + " Y " + coordYCurrentActiveVillage);

	// For each row, do the following transformations
	var qpRow = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr[not(@class)]');
	var durationMin = -1;
	var durationMax = -1;
	for(var i=0; i<qpRow.snapshotLength - 1; i++) {
		var row = qpRow.snapshotItem(i);
		var cellPlayer = row.cells[DEF_COLUMN_PLAYER];
		var cellDuration = row.cells[DEF_COLUMN_DURATION];
		var cellAction = row.cells[DEF_COLUMN_ACTION];

		var valueTimeRcv = timeColonSeparatedToValue(cellDuration.innerHTML);
		var valueOffer = parseInt(row.cells[1].innerHTML);
		var valueSearch = parseInt(row.cells[3].innerHTML);
		var valueAlliance = cellPlayer.title;
		var valueCoordZ = getParamFromUrl(cellPlayer.firstChild.href, "d");

		// RoundTripDuration column - add a column with round trip duration and other player tribe
		// Teutons, Romans, Gauls
		var mercColors = new Array();
		mercColors[12] = "palegreen"; mercColors[16] = "lightyellow"; mercColors[24] = "lightpink";
		mercColors[36] = "palegreen"; mercColors[48] = "lightyellow"; mercColors[72] = "lightpink";
		// still unknown is how to get my own tribe
		var dist = coordDistXYtoXY(coordZToX(valueCoordZ), coordZToY(valueCoordZ),
								 coordXCurrentActiveVillage, coordYCurrentActiveVillage);
		var mercSpeed = dist / (valueTimeRcv / 3600);
		var roundMercSpeed = Math.round(mercSpeed);
		debug(DBG_LOW, "[transformBuy_showAllianceRatioColumns] mercSpeed " + mercSpeed + " dist " + dist);

		var mercbgcolor = mercColors[roundMercSpeed];
		if (DEF_TRIBECOLOR_ENABLED == true) {
			cellDuration.style.backgroundColor = mercbgcolor;
		}

		// Duration cell - add a mouseover with the min and max times for that page
		if (i==0) { durationMin = cellDuration.innerHTML; }
		if (i==qpRow.snapshotLength - 2) { durationMax = cellDuration.innerHTML; }

		// Duration column - add mouse-over event to change to the round-trip time
		var speedServer = roundMercSpeed > 30;

		cellDuration.id = cellDuration.innerHTML;
		var tribe = parseInt(unescape(GM_getValue(getServerName() + "_" + getUserId() + "_" + permanentKeyTribe, "-1")));
		debug(DBG_LOW, "[transformBuy_showAllianceRatioColumns] mouse is over \n tribe: " + tribe + " speed: " + speedServer);
		if ((tribe == -1)) {
			debug(DBG_LOW, "[transformBuy_showAllianceRatioColumns] no tribe found");
			cellDuration.id = "??:??:??";
		} else {
			// Teutons, Romans, Gauls
			var merchantSpeed = new Array();
			merchantSpeed[TRIBE_TEUTON] = new Array(); merchantSpeed[TRIBE_ROMAN] = new Array(); merchantSpeed[TRIBE_GAUL] = new Array();
			merchantSpeed[TRIBE_TEUTON][false] = 12; merchantSpeed[TRIBE_ROMAN][false] = 16; merchantSpeed[TRIBE_GAUL][false] = 24;
			merchantSpeed[TRIBE_TEUTON][true] = 36; merchantSpeed[TRIBE_ROMAN][true] = 48; merchantSpeed[TRIBE_GAUL][true] = 72;
			debug(DBG_LOW, "[transformBuy_showAllianceRatioColumns] tribe found calculating new time");
			cellDuration.id = timeInSecondsToColonSeparatedTxt(2 * (valueTimeRcv * mercSpeed / merchantSpeed[tribe][speedServer]));
		}
		cellDuration.id += ";cyan";
		addListener_durationCell_roundTripTime(cellDuration);

		// Alliance column - add a column showing the alliance of the player offering resources
		if (CONFIG_SHOW_ALLIANCE_COLUMN) {
			var newCellAlliance = document.createElement("td");
			newCellAlliance.innerHTML = valueAlliance;
			row.insertBefore(newCellAlliance, cellDuration);
		}


		// Ratio column - add a column with Offer/Search ratio (bigger = better)
		var newCellRatio = document.createElement("td");
		var newRatio = Math.ceil((valueOffer / valueSearch) * 1000) / 1000;
		newCellRatio.innerHTML = newRatio;
		if (DEF_RATIOCOLOR_ENABLED == true) {
			if (newRatio >= DEF_RATIOCOLOR_MINGOOD) {
				newCellRatio.style.backgroundColor = DEF_RATIOCOLOR_COLORGOOD;
			} else if (newRatio <= DEF_RATIOCOLOR_MAXBAD) {
				newCellRatio.style.backgroundColor = DEF_RATIOCOLOR_COLORBAD;
			} else {
				newCellRatio.style.backgroundColor = DEF_RATIOCOLOR_COLORNORMAL;
			}
		}
		row.appendChild(newCellRatio);

		// Action column - replace "Accept Offer" text for "Ok" button
		cellAction.firstChild.innerHTML = '<img src="' + imgOkButton + '" />';
	}
	// Duration cell
	durationCell.title = (durationMin == -1) ? "-" : (durationMin + " <-> " + durationMax);
	debug(DBG_LOW, "[transformBuy_showAllianceRatioColumns] END");
}



/**
* addListener_durationCell_roundTripTime
*/
function addListener_durationCell_roundTripTime(durationColumnCell) {

//	debug(DBG_LOW, "[transformBuy_showAllianceRatioColumns] create mouseover listener");
	durationColumnCell.addEventListener('mouseover', function(ev) {
//		debug(DBG_LOW, "[transformBuy_showAllianceRatioColumns] mouse is over ");
		var rtt = ev.target.id.split(";")[0];
		var bgcolor = ev.target.id.split(";")[1];
		var origDuration = ev.target.innerHTML;
		var origBgcolor = ev.target.style.backgroundColor;

		ev.target.innerHTML = rtt;
		ev.target.style.backgroundColor = bgcolor;
		ev.target.id = origDuration + ";" + origBgcolor;
	}, false);
//	debug(DBG_LOW, "[transformBuy_showAllianceRatioColumns] create mouseout listener");
	durationColumnCell.addEventListener('mouseout', function(ev) {
//		debug(DBG_LOW, "[transformBuy_showAllianceRatioColumns] mouse is out");
		var rtt = ev.target.id.split(";")[0];
		var bgcolor = ev.target.id.split(";")[1];
		var origDuration = ev.target.innerHTML;
		var origBgcolor = ev.target.style.backgroundColor;

		ev.target.innerHTML = rtt;
		ev.target.style.backgroundColor = bgcolor;
		ev.target.id = origDuration + ";" + origBgcolor;
	}, false);
//	debug(DBG_LOW, "[transformBuy_showAllianceRatioColumns] end listener creation");
}









function timeColonSeparatedToValue(txt) { var t = txt.split(":"); return time3ToValue(t[0], t[1], t[2]); }
function time3ToValue(h, m, s) { var v = (3600 * parseFloat(h)) + (60 * parseFloat(m)) + (1 * parseFloat(s)); return v; }

/**
* isPageProfile
* @param {URL} url The URL text string.
*/
function isPageProfile(url) {
	return (url.search(/spieler\.php\?uid=/) != -1);
}

/**
* isThisPageMyProfile
* @param {URL} url The URL text string.
*/
function isThisPageMyProfile() {
	if (isPageProfile(document.location.href)) {
		var linksMyProfilePage = xpathEvaluate('//a[contains(@href, "spieler.php?s=")]');
		return (linksMyProfilePage.snapshotLength > 0);
	}
	return false;
}



/**
* loadSingleVillageCoordinates
*/
function loadSingleVillageCoordinates() {
	var tmp = unescape(GM_getValue(getServerName() + "_" + getUserId() + "_" + permanentKeySingleVillageCoords));
//	debug(DBG_LOW, "load permanent: tmp: " + tmp);
	return xmlToArray(tmp);
}

/**
* findAndSaveOnlyVillageCoordinates
*/
function findAndSaveSingleVillageCoordinates() {
	if (isThisPageMyProfile()) {
		var coordsCells = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr/td[3][not(@class)]');
		if (coordsCells.snapshotLength == 2) {
			var svCoords = coordsCells.snapshotItem(1).innerHTML.split("|");
			svCoords[0] = svCoords[0].replace("(", "");
			svCoords[1] = svCoords[1].replace(")", "");
			GM_setValue(getServerName() + "_" + getUserId() + "_" + permanentKeySingleVillageCoords, escape(arrayToXML(svCoords)));
		}
	}
}



function onLoadAnyPage(){ // calls to the functions and procedure
	debug(-1, "Travian QP Market Started");

	// if it is the profile page get the "Alliance" word and leave the script
	if (location.href.indexOf('/spieler.php?uid=') != -1) {
		debug(DBG_HIGH, "[-] profile page");
		findAndSaveLang_Alliance();
		findAndSaveSingleVillageCoordinates();
		return;
	}
	
	
	if (isPageMarketPlaceBuy()) {
		debug(DBG_HIGH, "[-][isPageMarketPlaceBuy]");
		onMarketplaceBuyLoad();
	}

/*
	if (isPageMarketPlaceSendResources()) {
		debug(DBG_HIGH, "[-][isPageMarketPlaceSendResources]");
//		onMarketPlaceSendResourcesLoad();
	}
*/

	if (isPageSendTroops(document.location.href)) {
		debug(DBG_HIGH, "[-][isPageSendTroops]");
		onPageSendTroops();
	}
}


/**
* getTribeBySettlerTroopsInAnyPage - Gets the my tribe by looking at the gifs of the troops
* @param {boolean} troopsPosition To choose from the troops shown in the page.
*/
function getTribeBySettlerTroopsInAnyPage(troopsPosition) {
	var romanImg = xpathEvaluate('//img[contains(@src, "img/un/u/")][contains(@src, "0.gif")]');

	var imgSrc = romanImg.snapshotItem(troopsPosition).src;
	var imgNumber = parseInt(imgSrc.substr(imgSrc.indexOf("0.gif") - 1, 2));
	
	switch (imgNumber) {
		case 10: return TRIBE_ROMAN;
		case 20: return TRIBE_TEUTON;
		case 30: return TRIBE_GAUL;
		case 40: return TRIBE_NATURE;
		case 50: return TRIBE_NATAR;
		case 60: return TRIBE_UNDISCLOSED;
		default: alert("New tribe?!?!?"); return;
	}
}

/**
* getTribeBySendTroopsPage - Gets the my tribe by looking at the gifs in the send troops page
*/
function getTribeBySendTroopsPage() {
	return getTribeBySettlerTroopsInAnyPage(0);
}

/**
* onPageSendResources
*/
function onPageSendTroops() {
	debug(DBG_NORM, "[onPageSendTroops]");
	var tribe = getTribeBySendTroopsPage()
	debug(DBG_NORM, "[/onPageSendTroops] tribe " + tribe);
	GM_setValue(getServerName() + "_" + getUserId() + "_" + permanentKeyTribe, escape("" + tribe));
	debug(DBG_NORM, "[/onPageSendTroops]");
}



function onMarketPlaceSendResourcesLoad() {
	debug(DBG_NORM, "[onMarketPlaceSendResourcesLoad]");
	
	var sendReceive =
			xpathEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]|//div[@id="lmid2"]/form/p[@class="b"]');

	for(var i=0; i<sendReceive.snapshotLength; i++) {
		debug(DBG_LOW, "[onMarketPlaceSendResourcesLoad] sendReceive.snapshotItem i " + i);
		if (sendReceive.snapshotItem(i).nodeName == "P") {
			//create place to sum the resources
			var sp = document.createElement("span");
			var swood = document.createTextNode("0");
			var sclay = document.createTextNode("0");
			var siron = document.createTextNode("0");
			var scrop = document.createTextNode("0");
//			var stime = document.createTextNode("99:99:99");
			var stime = document.createElement("span");
//<span id="time6">0:45:09</span>
			var img1 = document.createElement("img");	img1.src = "img/un/r/1.gif";
			var img2 = document.createElement("img");	img2.src = "img/un/r/2.gif";
			var img3 = document.createElement("img");	img3.src = "img/un/r/3.gif";
			var img4 = document.createElement("img");	img4.src = "img/un/r/4.gif";
			var img5 = document.createElement("img");	img5.src = "img/un/a/clock.gif";
			sp.appendChild(img1);	sp.appendChild(swood);
			sp.appendChild(img2);	sp.appendChild(sclay);
			sp.appendChild(img3);	sp.appendChild(siron);
			sp.appendChild(img4);	sp.appendChild(scrop);
			sp.appendChild(img5);	sp.appendChild(stime);
			sendReceive.snapshotItem(i).appendChild(sp);
		} else { // table
			// add resources, keep max time
			var tdRes = sendReceive.snapshotItem(i).lastChild.lastChild.lastChild.lastChild;
//			debug(DBG_LOW, "[onMarketPlaceSendResourcesLoad] td res " + tdRes.innerHTML);
			var rwood = parseInt(tdRes.childNodes[1].nodeValue.replace("|", "")); swood.nodeValue = parseInt(swood.nodeValue) + rwood;
			var rclay = parseInt(tdRes.childNodes[3].nodeValue.replace("|", "")); sclay.nodeValue = parseInt(sclay.nodeValue) + rclay;
			var riron = parseInt(tdRes.childNodes[5].nodeValue.replace("|", "")); siron.nodeValue = parseInt(siron.nodeValue) + riron;
			var rcrop = parseInt(tdRes.childNodes[7].nodeValue.replace("|", "")); scrop.nodeValue = parseInt(scrop.nodeValue) + rcrop;
//			stime.nodeValue = sendReceive.snapshotItem(i).lastChild.childNodes[2].childNodes[1].firstChild.innerHTML;
			stime.innerHTML = sendReceive.snapshotItem(i).lastChild.childNodes[2].childNodes[1].firstChild.innerHTML;
//			stime.id = sendReceive.snapshotItem(i).lastChild.childNodes[2].childNodes[1].firstChild.id;
			stime.id = "timeouta";
		}
	}
	debug(DBG_NORM, "[onMarketPlaceSendResourcesLoad] END");

}


function onMarketplaceBuyLoad() {
	findAndSaveLang_AcceptOffer();

	if( loc.indexOf('&t=1')!=-1 && loc.indexOf('build')!=-1 ) {

		tab=getElementsByClassName(document, "p", "txt_menue")[0];//place to put the bar
		if(!tab)tab=getElementsByClassName(document, "p", "f10")[1]; //second guess for the bar place
		if(!tab) return; //return if you can't place the bar
		var linkl=tab.getElementsByTagName('a');
		if(linkl[1].href.indexOf('&t=1')==-1) return;	 // test for troops vs market links
		
		fields[lang]=gatherFields();//gets the name of the resource fields
		if(!fields[lang]){//if we can't find the names use the image names
			fields[lang]=["1.gif", "2.gif", "3.gif", "4.gif"];
		}
		
			createResourceImagesArray();
		
		// Get the original market offers for this page (without the filters applied yet)
		marketc = xpathEvaluate('//div[@id="lmid2"]/table/tbody/tr[@class="rbg"]/../..');
		marketc = marketc.snapshotItem(marketc.snapshotLength - 1);
//		orgmarket = marketc.cloneNode(true);
	
	
		if(!marketc) return;
	
		langfile = gatherInfo();
	
		transformBuy_showAllianceRatioColumns();
		orgmarket = marketc.cloneNode(true);
	
		var thebar=filterbar();
		if(!thebar) return; //if no bar is created return
		tab.appendChild( thebar ); // add the bar

		if (isPlusAccount()) {
			transformPage_MarketBuyPage_addBackgroundSelectedIndicatorPlusFilters();
		}
	} else {
		return;
	}
}

/**
* transformPage_MarketBuyPage_addBackgroundSelectedIndicatorPlusFilters
*/
function transformPage_MarketBuyPage_addBackgroundSelectedIndicatorPlusFilters() {
	if (isPlusAccount()) {
		// &t=1&b=2&s=4&v=1:1
		var plusFilterCells = xpathEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr[@class="cbg1"]/td/a/..');

		var sParam = getParamFromUrl(document.location.href, "s");	// 1-4 cell order
		var bParam = getParamFromUrl(document.location.href, "b");	// 1-4 cell order (+5)
		var vParam = getParamFromUrl(document.location.href, "v");	// 1:1 or nothing

		if (sParam) {
			plusFilterCells.snapshotItem(parseInt(sParam) - 1).style.backgroundColor = filterBackGroundColor;
		}
		if (bParam) {
			plusFilterCells.snapshotItem(parseInt(bParam) + 4).style.backgroundColor = filterBackGroundColor;
		}
		if (vParam) {
			plusFilterCells.snapshotItem(4).style.backgroundColor = filterBackGroundColor;
		} else {
			plusFilterCells.snapshotItem(9).style.backgroundColor = filterBackGroundColor;
		}
	}
}


/**
* isPlusAccount
* Checks if this is a Plus account (at this moment).
*/
function isPlusAccount() {
	return xpathEvaluate('//div[@id="lleft"]/a/img[@class="logo"][contains(@src, "/a/travian1.gif")]').snapshotLength > 0;
}



function createResourceImagesArray() {
				var simg = document.createElement("img");
				simg.className="res";
				simg.src="img/un/r/1.gif";
				simg.style.cursor='pointer';
				simg.title=fields[lang][0];
				resourceImages[0] = simg;

			 simg = document.createElement("img");
				simg.className="res";
				simg.src="img/un/r/2.gif";
				simg.style.cursor='pointer';
				simg.title=fields[lang][1];
				resourceImages[1] = simg;

			 simg = document.createElement("img");
				simg.className="res";
				simg.src="img/un/r/3.gif";
				simg.style.cursor='pointer';
				simg.title=fields[lang][2];
				resourceImages[2] = simg;
				
			 simg = document.createElement("img");
				simg.className="res";
				simg.src="img/un/r/4.gif";
				simg.style.cursor='pointer';
				simg.title=fields[lang][3];
				resourceImages[3] = simg;

			 simg = document.createElement("div");
				simg.style.cursor='pointer';
				simg.innerHTML = '<img src="img/un/r/1.gif"><img style="margin-left:-15px" src="img/un/a/del.gif">';
				resourceImages[4] = simg;

			 simg = document.createElement("div");
				simg.style.cursor='pointer';
				simg.innerHTML = '<img src="img/un/r/2.gif"><img style="margin-left:-15px" src="img/un/a/del.gif">';
				resourceImages[5] = simg;

			 simg = document.createElement("div");
				simg.style.cursor='pointer';
				simg.innerHTML = '<img src="img/un/r/3.gif"><img style="margin-left:-15px" src="img/un/a/del.gif">';
				resourceImages[6] = simg;
				
			 simg = document.createElement("img");
				simg.className="res";
				simg.src="img/un/r/5.gif";
				simg.style.cursor='pointer';
				simg.title=fields[lang][3];
				resourceImages[7] = simg;
}



function gatherInfo(){//gets the words from the table
	if(loc.indexOf('&t=1')==-1) return;
	if(!marketc) return;
	var current=marketc;
	if(current.rows[1].cells.length==1) return;
	var langAlliance = unescape(GM_getValue(getServerName() + "_" + getUserId() + "_" + permanentKeyAlliance, "Alliance"));
	var langAcceptOffer = unescape(GM_getValue(getServerName() + "_" + getUserId() + "_" + permanentKeyAcceptOffer, "Accept Offer"));
	return	[
			current.rows[0].textContent,
			current.rows[1].cells[0].textContent,
			current.rows[1].cells[1].textContent,
			current.rows[1].cells[4].textContent,
			langAlliance,
			langAcceptOffer
			];
}

function gatherFields(){//get the resource names from the page
	var orgbar=returnObjById('lres0');
	if(!orgbar) {orgbar=getElementsByClassName(document, 'div', 'div4')[0];}
	if(!orgbar) {orgbar=returnObjById('lres');}
	if(!orgbar) return;
	var resbar=orgbar.getElementsByTagName('img');
	return [resbar[0].title, resbar[1].title, resbar[2].title, resbar[3].title]
}

function returnObjById( id ){ // I use this because I might want to make it cross browser later
    if (document.getElementById)
        return document.getElementById(id);
    else if (document.all)
        return document.all[id];
    else if (document.layers)
        return document.layers[id];
}

function getElementsByClassName(oElm, strTagName, strClassName){  // searches the oElm for strTagName objects with strClassName class
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];      
        if(oRegExp.test(oElement.className)){
       arrReturnElements.push(oElement);
        }   
    }
    return (arrReturnElements)
}


// select is 0 or 2
function gomarket(select, isInclude){//seacrhc the select column to search for a match of the res varable
	if(loc.indexOf('&t=1')==-1) return;
	if(!marketc) return;
	var current=marketc;
	var market=new Array();
	var end=0;

	if(current.rows[0].textContent.indexOf(langfile[0])!=-1){
		if(current.rows[1].cells.length==1) return;
		end=current.rows.length-1;

		for(var i=2; i<end; i++){
			var cc=current.rows[i].cells[parseInt(select)]
			if(cc){
				cc=cc.innerHTML;
//					debug(DBG_LOW, "[gomarket]res: " + res + " cc: " + cc);
				if (isInclude) {
					if( cc.indexOf(res)!=-1 ) {market.push(current.rows[i].cloneNode(true));}
				} else {
					if( cc.indexOf(res)==-1 ) {market.push(current.rows[i].cloneNode(true));}
				}
			}
		}

		mod(current,end,market);
	} 	else {change=false;}	
}


function mod(current,end,market){//changes the table
	var mymenu = current.cloneNode(false) ;
	mymenu.className = "tbg";
	mymenu.style.width = "500px";
	mymenu.setAttribute('cellspacing', 1);
	mymenu.setAttribute('cellpadding', 2);
	
	mymenu.appendChild(current.rows[0].cloneNode(true) );
	mymenu.appendChild(current.rows[1].cloneNode(true) );
	var tail=current.rows[end].cloneNode(true);
	
	end=market.length;
	for(var i=0; i<end; i++){
		mymenu.appendChild( market[i].cloneNode(true) );
	}
	
	mymenu.appendChild( tail );
	
	var indexCellDuration = 6 - (CONFIG_SHOW_ALLIANCE_COLUMN ? 0 : 1);
	current.innerHTML=mymenu.innerHTML;
	for(var i=2; i<current.rows.length - 1; i++) {
		debug(DBG_LOW, "[mod] current.rows[i].cells["+indexCellDuration+"].innerHTML " + current.rows[i].cells[indexCellDuration].innerHTML);
		addListener_durationCell_roundTripTime(current.rows[i].cells[indexCellDuration]);
	}
	change=true;
}


function x(f, isPredefined){//ratio of offer:search search
	if(loc.indexOf('&t=1')==-1) return;
	if(!marketc) return;
	
	var current=marketc;
	var market=new Array();
	var end=0;

	if(current.rows[0].textContent.indexOf(langfile[0])!=-1){
		if(current.rows[1].cells.length==1) return;
		end=current.rows.length-1;
		var first;
		var second;
		var ratio;
		for(var i=2; i<end; i++){
			if(current.rows[i].cells[3] && current.rows[i].cells[1]){

				first=parseInt( current.rows[i].cells[1].innerHTML);
				second=parseInt( current.rows[i].cells[3].innerHTML);

				if (isPredefined) {
					switch(f){
						case 0: if (first<second)  {market.push(current.rows[i].cloneNode(true));} break;
						case 1: if (first==second) {market.push(current.rows[i].cloneNode(true));} break;    
						case 2: if (first>=second) {market.push(current.rows[i].cloneNode(true));} break;
						case 3: if (first>second)  {market.push(current.rows[i].cloneNode(true));} break;
					}
				} else {
					//debug(DBG_LOW, "[x] not predefined, value: " + f);
					ratio = first/second;
					if (ratio>=f) {
						market.push(current.rows[i].cloneNode(true));
					}
				}

			}
		}
		mod(current,end,market);
	}else {change=false;}
}

function applyFilterOnOffers(column, filterFunction){//search the select column to search for a match of the res varable
	if(loc.indexOf('&t=1')==-1) return;
	if(!marketc) return;
	var current=marketc;
	var market=new Array();
	var end=0;

	if(current.rows[0].textContent.indexOf(langfile[0])!=-1){
		if(current.rows[1].cells.length==1) return;
		end=current.rows.length-1;

		for(var i=2; i<end; i++){
			var cc = current.rows[i].cells[parseInt(column)];
			if (cc) {
				var hasLink = cc.getElementsByTagName('a');
//					debug(DBG_LOW, "[gomarket]cc: " + cc + " hasLink: " + hasLink + " hasLink.length: " + hasLink.length);
				if (hasLink && hasLink.length > 0) {
					market.push(current.rows[i].cloneNode(true));
				}
			}
		}
		mod(current,end,market);
	} 	else {change=false;}	

}






function filterGroupActive(filterValue) {
	//debug(DBG_LOW, "[filterGroupActive] filterValue " + filterValue + " qfilterstate " + qFilterState.toString());
	switch (filterValue) {
		case 0:
		case 1:
		case 2:
		case 3:
			if ((filterValue != 0) && (qFilterState[0] == "true")) return true;
			if ((filterValue != 1) && (qFilterState[1] == "true")) return true;
			if ((filterValue != 2) && (qFilterState[2] == "true")) return true;
			if ((filterValue != 3) && (qFilterState[3] == "true")) return true;
			return false;
		case 8:
		case 9:
		case 10:
		case 11:
			if ((filterValue != 8) && (qFilterState[8] == "true")) return true;
			if ((filterValue != 9) && (qFilterState[9] == "true")) return true;
			if ((filterValue != 10) && (qFilterState[10] == "true")) return true;
			if ((filterValue != 11) && (qFilterState[11] == "true")) return true;
			return false;
		case 16:
		case 17:
		case 18:
		case 19:
		case 20:
			if ((filterValue != 16) && (qFilterState[16] == "true")) return true;
			if ((filterValue != 17) && (qFilterState[17] == "true")) return true;
			if ((filterValue != 18) && (qFilterState[18] == "true")) return true;
			if ((filterValue != 19) && (qFilterState[19] == "true")) return true;
			if ((filterValue != 20) && (qFilterState[20] != "false")) return true;
			return false;
		default:
			break;
	}
}




/**
* offerSearchFilterEventListener
* @param td Reference to the html td node of the filter that was activated
* @param filterIndex The index of the filter in the qFilterState
* @param columnOfferOrSearch The number of the column to filter for, 2 for search, 0 for offer
* @param isInclude Indicates if it is to search for this or to exclude it
*/
function offerSearchFilterEventListener(td, filterIndex, columnOfferOrSearch, isInclude) {
//	debug(DBG_LOW, "[offerSearchFilterEventListener] td: " + td.innerHTML + " filterIndex: " + filterIndex +
//			" columnOfferOrSearch: " + columnOfferOrSearch + " isInclude: " + isInclude);

	if (!qFilterState) {cleanFilterState();}
	if (filterGroupActive(filterIndex) == true) { return; }

	td.style.backgroundColor = filterBackGroundColor;
	qFilterState[filterIndex] = "true";
	savePermanentMarketFilters();
	res = fields[lang][parseInt(filterIndex % 4)];
	gomarket(columnOfferOrSearch, isInclude);
}



function reset() {//using the original market table reset the page

	cleanFilterState();
	savePermanentMarketFilters();
	var filterCells = xpathEvaluate('//td[@class="marketFilterCell"]');
	for(var i=0; i<filterCells.snapshotLength; i++) {
		filterCells.snapshotItem(i).style.backgroundColor = "";
	}
	// checkboxes need to be cleaned up
	for(var i=21; i<25; i++, i++) { qFilterCells[i].lastChild.checked = (qFilterState[i] == "true"); }

	// textboxes can be cleaned up - for now let the value stay there may simplify setting the same value again
	// qFilterCells[20].firstChild.value = 1;
	// for(var i=22; i<25; i++, i++) { qFilterCells[i].firstChild.value = qFilterState[i]; }
	
	if(change){
		marketc.innerHTML=orgmarket.innerHTML;
		var indexCellDuration = 6 - (CONFIG_SHOW_ALLIANCE_COLUMN ? 0 : 1);
		
		for(var i=2; i<marketc.rows.length - 1; i++) {
			debug(DBG_HIGH, "[reset] marketc.rows[i].cells["+indexCellDuration+"].innerHTML " + marketc.rows[i].cells[indexCellDuration].innerHTML);
			addListener_durationCell_roundTripTime(marketc.rows[i].cells[indexCellDuration]);
		}
		
		change=false;
	} 
}



/**
* ratioFilterEventListener
* @param td Reference to the html td node of the filter that was activated
* @param filterIndex The index of the filter in the qFilterState
* @param ratioIndex The index of the ratio function (0=1:1, 1=x:1, 2=x|1:1, 3=1:x)
*/
function ratioFilterEventListener(td, filterIndex, ratioIndex) {
	customRatioFilterEventListener(td, filterIndex, ratioIndex, true);
}

function customRatioFilterEventListener(td, filterIndex, ratioIndex, isPredefined) {
//	debug(DBG_LOW, "[customRatioFilterEventListener] td: " + td.innerHTML + " filterIndex: " + filterIndex +
//			" ratioIndex: " + ratioIndex + " td.firstChild.value: " + td.firstChild.value);

	if (!isPredefined) {
		ratioIndex = parseFloat(ratioIndex);
		if (ratioIndex != td.firstChild.value) { return; }
	}
	
	if (!qFilterState) {cleanFilterState();}
	if (filterGroupActive(filterIndex) == true) { return; }
	
	if (!isNaN(ratioIndex)) {
		td.style.backgroundColor = filterBackGroundColor;
		qFilterState[filterIndex] = (isPredefined) ? "true" : ratioIndex.toString();
		savePermanentMarketFilters();
		x(ratioIndex, isPredefined);
	}
}




















/**
* alliancePartialMatchFilterEventListener
* @param td Reference to the html td node of the filter that was activated
* @param filterIndex The index of the filter in the qFilterState
* @param isInclude Is it to include or to exclude this alliance(s).
*/
function alliancePartialMatchFilterEventListener(td, filterIndex) {
	debug(DBG_LOW, "[alliancePartialMatchFilterEventListener] td: " + td.innerHTML + " filterIndex: " + filterIndex
	 + " td.lastChild.value " + td.lastChild.value);

	if (!qFilterState) {cleanFilterState();}
	if (filterGroupActive(filterIndex) == true) { return; }

	td.style.backgroundColor = filterBackGroundColor;
	debug(DBG_LOW, "[alliancePartialMatchFilterEventListener] before qFilterState " + qFilterState );
	qFilterState[filterIndex] = "" + td.lastChild.checked;
	debug(DBG_LOW, "[alliancePartialMatchFilterEventListener] after qFilterState " + qFilterState );
	savePermanentMarketFilters();
}


/**
* allianceFilterEventListener
* @param td Reference to the html td node of the filter that was activated
* @param filterIndex The index of the filter in the qFilterState
* @param isInclude Is it to include or to exclude this alliance(s).
*/
function allianceFilterEventListener(td, filterIndex, isInclude) {
	var isPartial = (qFilterState[filterIndex - 1] == "true");

	debug(DBG_LOW, "[allianceFilterEventListener] td: " + td.innerHTML + " filterIndex: " + filterIndex +
			" isPartial: " + isPartial + " isInclude: " + isInclude);

	if (!qFilterState) {cleanFilterState();}
	if (filterGroupActive(filterIndex) == true) { return; }

	var alliancesFilter = td.firstChild.value;
	alliancesFilter = alliancesFilter.split(";");

	td.style.backgroundColor = filterBackGroundColor;
	if (td.firstChild.value == "") {
		qFilterState[filterIndex] = "::";
	} else if (td.firstChild.value == " ") {
		qFilterState[filterIndex] = ": :";
	} else {
		qFilterState[filterIndex] = "" + td.firstChild.value;
	}
	savePermanentMarketFilters();

	applyFilterOnOffersAllianceFilter(5, alliancesFilter, isPartial, isInclude);
}



function applyFilterOnOffersAllianceFilter(column, alliancesFilter, isPartial, isInclude) {
	if(loc.indexOf('&t=1')==-1) return;
	if(!marketc) return;
	var current=marketc;
	var market=new Array();
	var end=0;

	var includeThis = false;
	var excludeThis = false;
	debug(DBG_LOW, "[applyFilterOnOffersAllianceFilter] column: " + column + " alliancesFilter: " + alliancesFilter +
			" isPartial: " + isPartial + " isInclude: " + isInclude);

	if(current.rows[0].textContent.indexOf(langfile[0])!=-1){
		if(current.rows[1].cells.length==1) return;
		end=current.rows.length-1;

		for(var i=2; i<end; i++){

			excludeThis = false;
//			var allianceOffer = current.rows[i].cells[column].innerHTML;
			var allianceOffer = current.rows[i].cells[DEF_COLUMN_PLAYER].title;

			// go through all alliances (that were separated by ";")
			for(var j=0; j<alliancesFilter.length; j++) {
				includeThis = false;
				// both partial and complete match need the alliancesFilter[i] to exist in the allianceOffer
				if (allianceOffer.indexOf(alliancesFilter[j]) > -1) {
					if (isPartial) {
						includeThis = true;
						excludeThis = true;
					} else {
						// complete match need the allianceOffer to exist in the alliancesFilter[i]
						if (alliancesFilter[j].indexOf(allianceOffer) > -1) {
							includeThis = true;
							excludeThis = true;
						}
					}
				}
				if ((isInclude) && (includeThis)) {
					market.push(current.rows[i].cloneNode(true));
				}
			}
			if ((!isInclude) && (!excludeThis)) {
				market.push(current.rows[i].cloneNode(true));
			}

		}
		mod(current,end,market);
	} 	else {change=false;}	

}










/**
* createFilterCell
* @param imageIndex Index of the image in the images array
* @param filterIndex Index of the filter in the filter array
* @param row The row of the table where to add the cell
* @param isOffer True indicates offer, false indicates search
* @param isInclude Indicates if it is to search for this or to exclude it
*
* @return The created cell so that it can be used for other purposes
*/
function createFilterCell(imageIndex, filterIndex, row, isOffer, isInclude) {
	var tableColumnToSearch = isOffer ? 0 : 2 ;
	var cell = document.createElement('td');
	cell.appendChild(resourceImages[imageIndex].cloneNode(true));
	cell.addEventListener('click',	function() {
										offerSearchFilterEventListener (cell, filterIndex, tableColumnToSearch, isInclude)
									}, true);
	cell.className = "marketFilterCell";
	row.appendChild(cell);
	qFilterCells.push(cell);
}


/**
* createRatioFilterCell
* @param txt The text to put in the cell
* @param filterIndex Index of the filter in the filter array
* @param ratioIndex Index of the ratio function
* @param row The row of the table where to add the cell
*/
function createRatioFilterCell(txt, filterIndex, ratioIndex, row) {
	var con = document.createElement('a');
	con.appendChild( document.createTextNode(txt) );
	con.href='#';
	var cell = document.createElement('td');
	cell.addEventListener('click',	function() {
										ratioFilterEventListener(cell, filterIndex, ratioIndex)
									}, true);
	cell.className = "marketFilterCell";
	cell.appendChild(con);
	row.appendChild(cell);
	qFilterCells.push(cell);
}

/**
* createCustomRatioFilterCell
* @param filterIndex Index of the filter in the filter array
* @param row The row of the table where to add the cell
*/
function createCustomRatioFilterCell(filterIndex, row, filterValue) {
	var cell = document.createElement('td');
	var newInput = document.createElement("input");
	newInput.className = "fm";
	newInput.type = "text";
	newInput.name = "customRatioFilter";
	newInput.value = filterValue;
	newInput.size = 2;
	newInput.maxLength = 5;	// eg.: "1.345" no more than 3 decimal numbers
	newInput.addEventListener('blur', function() { customRatioFilterEventListener(cell, filterIndex, cell.firstChild.value, false) }, true);
	cell.appendChild(newInput);
	cell.className = "marketFilterCell";
	qFilterCells.push(cell);
	row.appendChild(cell);
}

/**
* createAllianceFilterCell
* @param filterIndex Index of the filter in the filter array
* @param row The row of the table where to add the cell
*/
function createAllianceFilterCell(filterIndex, row, isInclude) {
	var cellCheckbox = document.createElement('td');
	var inputCheckbox = document.createElement("input");
	inputCheckbox.className = "fm";
	inputCheckbox.type = "checkbox";
	inputCheckbox.checked = false;
	inputCheckbox.addEventListener('click', function() { alliancePartialMatchFilterEventListener(cellCheckbox, filterIndex); }, true);
	if (!isInclude) {
		cellCheckbox.innerHTML = '<img src="img/un/a/del.gif">';
		cellCheckbox.appendChild(document.createTextNode(" "));
	}
	cellCheckbox.align="right";
	cellCheckbox.className = "marketFilterCell";
	cellCheckbox.appendChild(inputCheckbox);
	qFilterCells.push(cellCheckbox);
	row.appendChild(cellCheckbox);

	var cell = document.createElement('td');
	var newInput = document.createElement("input");
	newInput.className = "fm";
	newInput.type = "text";
	newInput.name = "allianceFilter";
	newInput.value = "";
	newInput.size = 20;
	newInput.addEventListener('focus', function() { deactivateNextPageShortcut() }, true);
	newInput.addEventListener('blur', function() { activateNextPageShortcut(); allianceFilterEventListener(cell, filterIndex + 1, isInclude) }, true);
	cell.align="left";
	cell.appendChild(newInput);
	cell.className = "marketFilterCell";
	qFilterCells.push(cell);
	row.appendChild(cell);
}


/**
* offerSearchFilterEventListener
* @param td Reference to the html td node of the filter that was activated
* @param filterIndex The index of the filter in the qFilterState
* @param columnOfferOrSearch The number of the column to filter for, 2 for search, 0 for offer
* @param isInclude Indicates if it is to search for this or to exclude it
*/
function actionAcceptOfferOnlyFilterEventListener(td, filterIndex) {
//	debug(DBG_LOW, "[actionAcceptOfferOnlyFilterEventListener] td: " + td.innerHTML + " filterIndex: " + filterIndex);

	if (!qFilterState) {cleanFilterState();}
	if (filterGroupActive(filterIndex) == true) { return; }

	td.style.backgroundColor = filterBackGroundColor;
	qFilterState[filterIndex] = "true";
	savePermanentMarketFilters();
	applyFilterOnOffers(7 - (CONFIG_SHOW_ALLIANCE_COLUMN ? 0 : 1), null);
}

function createActionFilterCell(filterIndex, row) {
	var con = document.createElement('a');
	con.appendChild( document.createTextNode(langfile[W_ACCEPTOFFER]) );
	con.href='#';
	var cell = document.createElement('td');
	cell.addEventListener('click',	function() {
										actionAcceptOfferOnlyFilterEventListener(cell, filterIndex)
									}, true);
	cell.className = "marketFilterCell";
	cell.appendChild(con);
	row.appendChild(cell);
	qFilterCells.push(cell);
}


function createAutoNextPageCell(filterIndex, row) {
	var cell = document.createElement('td');
	var newInput = document.createElement("input");
	newInput.className = "fm";
	newInput.type = "text";
	newInput.name = "autoNextPageFilter";
	newInput.value = qFilterState[filterIndex];
	newInput.size = 1;
	newInput.maxLength = 1;	// eg.: "1.345" no more than 3 decimal numbers
	newInput.addEventListener('blur', function() { autoNextPageEventListener(cell, filterIndex, cell.firstChild.value) }, true);
	cell.appendChild(newInput);
	cell.className = "marketFilterCell";
	qFilterCells.push(cell);
	var anptxt = document.createElement('td'); anptxt.innerHTML = "»»";	// right angle double quotes code
	row.appendChild(anptxt);
	row.appendChild(cell);
	var anptxt = document.createElement('td'); anptxt.innerHTML = "»»";	// right angle double quotes code
	row.appendChild(anptxt);

	var cell2 = document.createElement('td');
	var newInput = document.createElement("input");
	newInput.className = "fm";
	newInput.type = "text";
	newInput.name = "currentAutoNextPageFilter";
	newInput.value = qFilterState[filterIndex + 1];
	newInput.disabled = true;
	newInput.size = 1;
	newInput.maxLength = 1;	// eg.: "1.345" no more than 3 decimal numbers
//	newInput.addEventListener('blur', function() { customRatioFilterEventListener(cell, filterIndex + 1, cell.firstChild.value, false) }, true);
	cell2.appendChild(newInput);
	cell2.className = "marketFilterCell";
	qFilterCells.push(cell2);
	row.appendChild(cell2);
}

/**
* autoNextPageEventListener
* @param td Reference to the html td node of the filter that was activated
* @param filterIndex The index of the filter in the qFilterState
* @param columnOfferOrSearch The number of the column to filter for, 2 for search, 0 for offer
* @param isInclude Indicates if it is to search for this or to exclude it
*/
function autoNextPageEventListener(td, filterIndex, val) {
	debug(DBG_LOW, "[autoNextPageEventListener] td: " + td.innerHTML + " filterIndex: " + filterIndex
	 + " val " + val + " qfilters " + qFilterState);

	if (!qFilterState) {cleanFilterState();}
	if (filterGroupActive(filterIndex) == true) { return; }

	if (!isNaN(val)) {
		td.style.backgroundColor = filterBackGroundColor;
		qFilterState[filterIndex] = val;
		savePermanentMarketFilters();
	}
}



function filterTableCreateFilterNameCell(txt, nodeInsert) {
	var cell = document.createElement('td');
	cell.appendChild(document.createTextNode(txt)); 
	nodeInsert.appendChild(cell);
}


function filterbar(){// create the menu

	var filterTable = document.createElement('table');
	var rowSearch = document.createElement('tr');
	var rowOffer = document.createElement('tr');
	var rowRatios = document.createElement('tr');
	var rowAlliance = document.createElement('tr');
	var rowAction = document.createElement('tr');

	filterTableCreateFilterNameCell(langfile[W_OFFER], rowOffer);
	filterTableCreateFilterNameCell(langfile[W_SEARCH], rowSearch);
	filterTableCreateFilterNameCell(langfile[W_OFFER] + "/" + langfile[W_SEARCH], rowRatios);
	filterTableCreateFilterNameCell(langfile[W_ALLIANCE], rowAlliance);
	filterTableCreateFilterNameCell(langfile[W_ACTION], rowAction);


	// Offers including
	createFilterCell(0, 0, rowOffer, true, true);
	createFilterCell(1, 1, rowOffer, true, true);
	createFilterCell(2, 2, rowOffer, true, true);
	createFilterCell(3, 3, rowOffer, true, true);
	// Offers excluding
	createFilterCell(4, 4, rowOffer, true, false);
	createFilterCell(5, 5, rowOffer, true, false);
	createFilterCell(6, 6, rowOffer, true, false);
	createFilterCell(7, 7, rowOffer, true, false);

	// Search including
	createFilterCell(0, 8, rowSearch, false, true);
	createFilterCell(1, 9, rowSearch, false, true);
	createFilterCell(2, 10, rowSearch, false, true);
	createFilterCell(3, 11, rowSearch, false, true);
	// Search excluding
	createFilterCell(4, 12, rowSearch, false, false);
	createFilterCell(5, 13, rowSearch, false, false);
	createFilterCell(6, 14, rowSearch, false, false);
	createFilterCell(7, 15, rowSearch, false, false);

	// Ratios
	var ratioFilterTable = document.createElement('table');	ratioFilterTable.className="tbg";
	var ratioFilterTableRow = document.createElement('tr');	//ratioFilterTableRow.className="cbg1";
	createRatioFilterCell("1:x",   16, 0, ratioFilterTableRow) ;
	createRatioFilterCell("1:1",   17, 1, ratioFilterTableRow) ;
	createRatioFilterCell("x|1:1", 18, 2, ratioFilterTableRow) ;
	createRatioFilterCell("x:1",   19, 3, ratioFilterTableRow) ;
	createCustomRatioFilterCell(20, ratioFilterTableRow, 1);
	ratioFilterTable.appendChild(ratioFilterTableRow);
	cell = document.createElement('td');
	ratioFilterTable.setAttribute('cellspacing', 0);
	cell.colSpan = 8;
	cell.appendChild(ratioFilterTable);
	rowRatios.appendChild(cell);


	// Alliances
	var allianceFilterTable = document.createElement('table');	allianceFilterTable.className="tbg";
	var allianceFilterTableRow = document.createElement('tr');	//ratioFilterTableRow.className="cbg1";
	createAllianceFilterCell(21, allianceFilterTableRow, true);
	createAllianceFilterCell(23, allianceFilterTableRow, false);
	allianceFilterTable.appendChild(allianceFilterTableRow);
	cell = document.createElement('td');
	allianceFilterTable.setAttribute('cellspacing', 0);
	cell.colSpan = 8;
	cell.appendChild(allianceFilterTable);
	rowAlliance.appendChild(cell);


	// Action
	var actionFilterTable = document.createElement('table');	action