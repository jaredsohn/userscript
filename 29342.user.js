// ==UserScript==
// @name           UserScripts QP Script Manager
// @version        0.5
// @author         QP
// @namespace      QP
// @description    Shows update of comments and downloads
// @include        http://userscripts.org/scripts
// @include        http://userscripts.org/scripts/*
// @include        http://userscripts.org/tags/*
// @include        http://userscripts.org/users/*/scripts
// @include        http://userscripts.org/users/*/favorites
// ==/UserScript==



/** Presentation info
----- Small description -----
Shows script progress of Comments / Installs / Last Updated<br>
Highlights favorites and own scripts
----- Full description -----
<h3>Features</h3>
<h2>Shows script progress of Comments / Installs / Last Updated</h2>
<ul>
	<li>Shows how many Comments / Installs were made since you last seen the script in a listing</li>
</ul>
</ul>

<h3>Instruction details</h3>
<ul>
	<li>Own scripts
		<ul>
			<li>Visit your own scripts page to update your scripts list known by this script</li>
		</ul>
	</li>
	<li>Favorites scripts
		<ul>
			<li>Visit your favorites scripts page to update your favorites scripts list known by this script</li>
		</ul>
	</li>
</ul>

<h3>To Do</h3>
<ul>
	<li>Possible future features
		<ul>
			<li>Possibly add a new category of scripts to highlight without it being a favorite</li>
			<li>Possibly add a configuration to only follow the highlithed scripts</li>
		</ul>
	</li>
	<li>Features to be added
		<ul>
			<li>Unsure...</li>
		</ul>
	</li>
	<li>Requests
		<ul>
			<li>--- Currently none ---</li>
		</ul>
	<li>Known bugs
		<ul>
			<li>--- Currently none ---</li>
		</ul>
	</li>
</ul>

<h3>History</h3>
<ul>
	<li>0.5.0 - 08-06-28
		<ul>
			<li>added: Favorites and Own scripts highlighting</li>
		</ul>
	</li>
	<li>0.3.0 - 08-06-??
		<ul>
			<li>added: Scripts Comments / Intalls / Last Date progress</li>
			<li>create: Created script</li>
		</ul>
	</li>
	<li>Previous history inside script</li>
</ul>

<h3>Generic script goals</h3>
<ul>
	<li>Some changes to UserScript.Org user interface in order to simplify common and constant script progress monitoring</li>
	<li>no support for other browsers - using of firefox GM_set/GM_get to save permanent info</li>
</ul>

<h3>Script problems?</h3>
<ul>
	<li>Instructions for newbies
		<ul>
			<li>Install <a href="http://www.mozilla.com/en-US/firefox/all.html">FireFox</a>'s most recent stable version</li>
			<li>Install <a href="https://addons.mozilla.org/en-US/firefox/addon/748">Greasemonkey</a> Addon for FireFox</li>
			<li>Install <a href="http://userscripts.org/scripts/show/29342">UserScripts QP Script Manager</a>'s most recent version</li>
		</ul>
	</li>
	<li>Bugs / problems / etc...
		<ul>
			<li>Try the following:
				<ul>
					<li>Disable other GM scripts (for incompatibilities)</li>
					<li>Check the Error Console - Tools, Error Console (for added info)</li>
				</ul>
			</li>
			<li>If the problem still exists please give me the following information:
				<ul>
					<li>Browser used, including version</li>
					<li>Script version</li>
					<li>Describe the problem the best you can</li>
					<li>Information from the Error Console you believe can help</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>

<h3>Read above please!</h3>
<ul>
	<li>You are responsible for reading all this text above</li>
	<li>Asking something that is already answered above probably won't get you the answer you wanted...</li>
</ul>

*/




/**
* handleSpecificScripts
*/
function handleSpecificScripts() {
	
	var scriptIds = new Array();
	for(var i=0; i<array.length; i++) {
		// http://userscripts.org/scripts/show/15943
		var scriptRow = xpEval('//a[contains(@href, "/scripts/show/'+scriptIds[i]+'"]/../..');
		for(var j=0; j<scriptRow.snapshotLength; j++) {
			
		}
	}
}


/**
* main
*/
function main() {
	GM_log("[main]");
	
	var userLoggedIn = isUserLoggedIn();
	if (userLoggedIn != null) {									GM_log("[-][userLoggedIn]");

		if (isThisPageMyFavorites(userLoggedIn)) {				GM_log("[--][isThisPageMyFavorites]");
			retrievePageMyFavorites_scriptIds();

		} else if (isThisPageMyScripts(userLoggedIn)) {			GM_log("[--][isThisPageMyScripts]");
			retrievePageMyScripts_scriptIds();

		}
	}

	var scriptRow = xpEval('//a[contains(@href, "/scripts/show/")]/../..');
	var myScripts = gmLoad_scripts(DEF_PARTKEY_OWNSCRIPTS_SCRIPT_IDS);
	var myFavorites = gmLoad_scripts(DEF_PARTKEY_FAVORITE_SCRIPT_IDS);
	for(var j=0; j<scriptRow.snapshotLength; j++) {
		handleScript(scriptRow.snapshotItem(j), myScripts, myFavorites);
	}
}

var DEF_PARTKEY_FAVORITE_SCRIPT_IDS = "favorites";
var DEF_PARTKEY_OWNSCRIPTS_SCRIPT_IDS = "ownscripts";

/** retrievePageMyFavoritesOrMyScripts_scriptIds */
function retrievePageMyFavorites_scriptIds() { retrievePageMyFavoritesOrMyScripts_scriptIds(DEF_PARTKEY_FAVORITE_SCRIPT_IDS); }
function retrievePageMyScripts_scriptIds() { retrievePageMyFavoritesOrMyScripts_scriptIds(DEF_PARTKEY_OWNSCRIPTS_SCRIPT_IDS); }
function retrievePageMyFavoritesOrMyScripts_scriptIds(key) {
	GM_log("[retrievePageMyFavoritesOrMyScripts_scriptIds] 1");
	var scripts = xpEval('//body/div[@id="container"]/div[@id="content"]/table[@class="wide forums"]/tbody/tr/td[@class="script-meat"]/a[@class="title"]');
	GM_log("[retrievePageMyFavoritesOrMyScripts_scriptIds] 2");
	var scriptIds = new Array();
	GM_log("[retrievePageMyFavoritesOrMyScripts_scriptIds] 3");
	for(var i=0; i<scripts.snapshotLength; i++) {
		var currentScriptId = /\d+/.exec(scripts.snapshotItem(i))[0];
		scriptIds.push(currentScriptId);
	}
	GM_log("[retrievePageMyFavoritesOrMyScripts_scriptIds] 4 scriptIds " + scriptIds);
	gmSave_scripts(key, scriptIds);
}


/** save, reset, load, createKey, exists - DiplomacyLang - <server>_lang_diplomacy  (confederacy,nap,war) */
function gmSave_scripts(extraKey, scriptIds) { GM_setValue(extraKey, "" + scriptIds); }
function gmReset_scripts(extraKey) { gmSave_scripts(extraKey, ""); }
function gmLoad_scripts(extraKey) { return gmLoad_UndefinedIsEmptyString(extraKey); }
function gmExists_scripts(extraKey) { return (gmLoad_scripts(extraKey) != ""); }

/** gmLoad_UndefinedIsEmptyString - if it is undefined then return empty string: "" */
function gmLoad_UndefinedIsEmptyString(key) { var val = GM_getValue(key); return ((val==undefined)?"":val); }







/** isUserLoggedIn */
function isUserLoggedIn() {
	GM_log("[userLoggedIn] 1");
	var user = xpEvalFirst('//body/div[@id="header"]/ul[@id="mainmenu"]/li[@class="login"]/a[contains(@href,"/users/")]');
	GM_log("[userLoggedIn] 2 user " + user);
	if (user) {
	GM_log("[userLoggedIn] 3");
		return /\d+/.exec(user.href)[0];
	}
	GM_log("[userLoggedIn] 4");
	return null;
}

/** isPageFavorites */
function isThisPageFavorites() { return (isPageFavorites(document.location.pathname)); }
function isPageFavorites(url) { return (url.search(/users\/\d+\/favorites/) != -1); }
function isThisPageMyFavorites(user) {
	if (isThisPageFavorites()) {
		var favoritesUser = /\d+/.exec(document.location.pathname)[0];
		return (favoritesUser == user);
	}
	return false;
}

/** isPageScripts */
function isThisPageScripts() { return (isPageScripts(document.location.pathname)); }
function isPageScripts(url) { return (url.search(/users\/\d+\/scripts/) != -1); }
function isThisPageMyScripts(user) {
	if (isThisPageScripts()) {
		var scriptsUser = /\d+/.exec(document.location.pathname)[0];
		return (scriptsUser == user);
	}
	return false;
}


/**
* handleScript
*/
function handleScript(row, myScripts, myFavorites) {
	GM_log("[handleScript] 1 myScripts " + myScripts + " myFavorites " + myFavorites);
	// get current values
	var scriptLink = xpEvalContextFirst(row, 'td[@class="script-meat"]/a[contains(@href, "/scripts/show/")]');
	var scriptId = /\/scripts\/show\/(\d+)/.exec(scriptLink.href)[1];

	// ROW COLORING
	if (myScripts.indexOf(scriptId) >= 0) {
		GM_log("[handleScript] MINE myScripts " + myScripts + " scriptId " + scriptId);
		row.style.backgroundColor = "#DFF5FD";	// blue
	} else if (myFavorites.indexOf(scriptId) >= 0) {
		GM_log("[handleScript] FAVORITE myFavorites " + myFavorites + " scriptId " + scriptId);
		row.style.backgroundColor = "#E0FFE0";	// green
	}


	var currentComments = xpEvalContextFirst(row, 'td[@class="inv lp"][1]');
	var currentInstalls = xpEvalContextFirst(row, 'td[@class="inv lp"][2]');
	var currentLastUpdateDate = xpEvalContextFirst(row, 'td[@class="inv lp"][3]/abbr');

	var cComments = parseInt(currentComments.textContent);
	var cInstalls = parseInt(currentInstalls.textContent);
	var cDate = parseInt(currentLastUpdateDate.title);
	
	GM_log("[handleScript] 2 - "
		+ " scriptId " + scriptId
		+ " cComments " + cComments
		+ " cInstalls " + cInstalls
		+ " cDate " + cDate
		);
	// transform row
	var values = GM_getValue("scriptId_a"+scriptId);
	GM_log("[handleScript] 3 values  - " + values);
	if (values) {
		var values = values.split(",");
		var commentsSpan = document.createElement("span");
		commentsSpan.innerHTML = cComments - values[0];
		currentComments.appendChild(document.createElement("br"));
		currentComments.appendChild(commentsSpan);
	
		var installsSpan = document.createElement("span");
		installsSpan.innerHTML = cInstalls - values[1];
		currentInstalls.appendChild(document.createElement("br"));
		currentInstalls.appendChild(installsSpan);
	
		var dateSpan = document.createElement("span");
		dateSpan.innerHTML = cDate - values[2];
		currentLastUpdateDate.appendChild(document.createElement("br"));
		currentLastUpdateDate.appendChild(dateSpan);
	}
	
	// save new values
	GM_setValue("scriptId_a"+scriptId, "" + cComments + "," + cInstalls + "," + cDate);
}


/** xpEval - Returns an ordered snapshot of the matched nodes. */
function xpEval(xpathExpr) { return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); }
/** xpEvalFirst - Returns the first matched node. */
function xpEvalFirst(xpathExpr) { return document.evaluate(xpathExpr, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
/** xpEvalContext - Returns an ordered snapshot of the matched nodes in the given context. */
function xpEvalContext(context, xpathExpr) { return document.evaluate(xpathExpr, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); }
/** xpEvalContext - Returns the first matched node in the given context. */
function xpEvalContextFirst(context, xpathExpr) { return document.evaluate(xpathExpr, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }


main();


