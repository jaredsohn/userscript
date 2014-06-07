// ==UserScript==
// @name           IMDB De-spoilerize
// @namespace      www.daddy.sk
// @description    Hides common spoilers from IMDB movie pages
// @include        http://www.imdb.com/title/*
// @exclude       http://www.imdb.com/title/*/board
// ==/UserScript==

// ----------------------------------------------------
// SETTINGS:
// Feel free to modify these to your taste.

HIDE_EPISODE_COUNTS	= true;
HIDE_GOOFS			= true;
HIDE_DISCUSSION		= true;

updateCheckFrequency= 7;  // How many days should pass between two checks for updates

// End of the settings. 
// ----------------------------------------------------

scriptName		= 'IMDB De-spoilerize';
versionURL		= "http://gm.daddy.sk/scripts/versions/imdbdespoilerize.txt";	// URL to file containing version number of the script stored on owners server.
sourceURL		= "http://userscripts.org/scripts/source/24116.user.js";		// URL to the source of the scripts latest version
homepageURL		= "http://userscripts.org/scripts/show/24116";					// URL of the scripts homepage.
msgNodeXPath	= "//body"; 						// XPath to element, in which should the 'New script version' be displayed.
currentVersion	= 1;								// Version of the script contained in this file. ALWAYS update along with the information contained in versionURL
checkForUpdatesByDefault	= true;
debugMode		= false;

// Evaluate xPath against the given element or document if no element is given.
function xPath(query, doc) {
    var xResult, arrResult = [];
	if (!doc) {
		doc = document;
	}
	xResult = document.evaluate(query, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);	
	for (i = 0; item = xResult.snapshotItem(i); i++) {
		arrResult.push(item);
	}
	return arrResult;
}

// Executes xpath query on xml  given as text(for example, the result of getUrl function)
function xPathOnText(query, code) {
	var divHelper;
	divHelper = document.createElement('div');
	divHelper.innerHTML = code;
	return xPath("." + query, divHelper);
}

// Get the contents of URL via xhttprequest
function getURL(URL, fOnLoad, fOnError){
    GM_xmlhttpRequest({
        method: 'GET',
        url: URL,
        onload: fOnLoad,
		onerror: fOnError
		});
}

// Log the message to the console if debugging is turned on (debugMode variable)
function log(msg) {
	if (debugMode) {
		GM_log(msg);
	}	
}

// Check whether all required GreaseMonkey functions are available.
function checkGMVersion() {
	if (!GM_xmlhttpRequest || !GM_registerMenuCommand || !GM_setValue || !GM_getValue) {
		msgNode = xPath(msgNodeXPath)[0];
		msg = "<b><a href=\"" + homepageURL + "\" target=\"_blank\">" + scriptName + "</a></b>: Please install latest version of the Greasemonkey. You can get it <a href=\"" + greaseMonkeyURL + "\">here</a>.";
		msgDiv = document.createElement("div");
		msgDiv.className = "gmVersionMsg";
		msgDiv.innerHTML = msg;
		msgNode.insertBefore(msgDiv, msgNode.firstChild);
		return false;
	}
	return true;
}

function daysBetween(date1, date2) {
    var ONE_DAY = 1000 * 60 * 60 * 24
    return Math.round(Math.abs(date1.getTime() - date2.getTime())/ONE_DAY)
}

function checkScriptVersion() {
    var now, lastVersionCheck, daysPassed;
	
	now = new Date();
    lastVersionCheck = GM_getValue('lastVersionCheck', 0);
	daysPassed = daysBetween(now, new Date(lastVersionCheck));
	log('lastVersionCheck:	' + lastVersionCheck);
	log('daysPassed:	' + daysPassed);
	
	if(daysPassed < updateCheckFrequency) {
		return;
    }
	
    getURL( versionURL,
			function(responseDetails) {
				var latestVersion, responseText, msgnode, versionMsg;
				
				responseText = responseDetails["responseText"];
	            log('Obtained version info:	' + responseText);
				latestVersion = parseInt(responseText);
	            GM_setValue('lastVersionCheck', String(now));
				log('latestVersion:	' +latestVersion);
				log('currentVersion:	' +currentVersion);
				if(latestVersion > currentVersion) {
					log('New version available');
	                msgnode = xPath(msgNodeXPath)[0];
					versionMsg = "New version of the <b><a href=\"" + homepageURL + "\" target=\"_blank\">" + scriptName + "</a></b> Greasemonkey Script was released. Click <a href=\"" + sourceURL + "\">here</a> to install it.";
					versionDiv = document.createElement("div");
					versionDiv.className = "gmVersionMsg";
					versionDiv.innerHTML = versionMsg;
					msgnode.insertBefore(versionDiv, msgnode.firstChild);
	            }
			}, 
			function(responseDetails) {
	            log('Version info not obtained.');
			}
		);
}

function checkForUpdatesOff() {
    GM_setValue('checkForUpdates', false);
    document.location.reload();
}

function checkForUpdatesOn() {
    GM_setValue('lastVersionCheck', 0);
	GM_setValue('checkForUpdates', true);
    document.location.reload();
}

function checkForUpdatesOnce() {
    GM_setValue('lastVersionCheck', 0);
	checkScriptVersion();
}

GM_addStyle(
	".gmVersionMsg { margin:10px; color:#545454; font-family:\"Lucida Grande\",Arial,Helvetica,Verdana,sans-serif; font-size:12px; line-height:1.4em; text-align:center; background-color: white; }"
)

if (!checkGMVersion()) {
	return;
}

var checkForUpdates;
checkForUpdates = GM_getValue('checkForUpdates', checkForUpdatesByDefault);

if (checkForUpdates) {
	checkScriptVersion();
	GM_registerMenuCommand(scriptName + ": Stop checking for updates", checkForUpdatesOff);
} else {
	GM_registerMenuCommand(scriptName + ": Check for updates automatically", checkForUpdatesOn);
}

GM_registerMenuCommand(scriptName + ": Check for updates now", checkForUpdatesOnce);

// ---------------------------------- //
//    Episode counts removal    //
// ---------------------------------- //
if (HIDE_EPISODE_COUNTS){
	var characters, pos;

	characters = xPath("//table[@class='cast']/tbody/tr/td[@class ='char']");
	log('Characters: ' + characters.length);

	for (i in characters) {
		log(characters[i].innerHTML);
		pos = characters[i].innerHTML.indexOf('(');
		if ((pos != -1) && (characters[i].innerHTML.indexOf('episod') != -1)) {
			characters[i].innerHTML = characters[i].innerHTML.substring(0, pos - 1);
		}
	}
}

// ---------------------------------- //
//            Goofs hiding             //
// ---------------------------------- //
if (HIDE_GOOFS) {
	var goofDiv;
	goofDiv = xPath("//div[@class='info' and h5/text()='Goofs:']")[0];

	if (goofDiv) {
		goofDiv.innerHTML = goofDiv.innerHTML.substr(0,goofDiv.innerHTML.indexOf('</h5>')+5) + 
			goofDiv.innerHTML.substr(goofDiv.innerHTML.indexOf('<a')).replace('>more<', '>here<');
	}
}

// ---------------------------------- //
//   Discussion titles hiding    //
// ---------------------------------- //
if (HIDE_DISCUSSION) {
	var discTable;
	discTable = xPath("//table[@class='boards']")[0];

	if (discTable) {
		discTable.style.display = 'none';
	}
}