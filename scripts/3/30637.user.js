// ==UserScript==
// @name           Travian QP Pub
// @version        0.5.2
// @author         QP
// @namespace      QP
// @description    Handles Publicity inside Travian Game
// @include        http://www.travian.org/*.php*
// @include        http://speed.travian.de/*.php*
// @include        http://welt*.travian.de/*.php*
// ==/UserScript==



/** Presentation info
----- Small description -----
Handles Publicity inside Travian Game
----- Full description -----
<h3>Features</h3>
<h2>Handles Publicity in some Travian Servers</h2>
<ul>
	<li>For now simply removes the publicity and allows the server to look like any non-Pub server</li>
	<li>(the only know servers to have PUB are german servers, please post more if they also have pub)</li>
</ul>


<h3>To Do</h3>
<ul>
	<li>Possible future features
		<ul>
			<li>Possibly from time to time open one of the Pub in a new Tab or even just in background
			so that Travian gets something for the Pub that is there</li>
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
	<li>0.5.2 - 08-08-10
		<ul>
			<li>improved: Include rule: all pages with params included now</li>
			<li>improved: Include rule: added more servers</li>
		</ul>
	</li>
	<li>0.5.0 - 08-07-26
		<ul>
			<li>added: Removes Publicity and shows the page as if this was a non publicity server</li>
			<li>create: Created script</li>
		</ul>
	</li>
	<li>Previous history inside script</li>
</ul>

<h3>Generic script goals</h3>
<ul>
	<li>Make servers that have Pub seem like normal non-Pub servers</li>
</ul>

<h3>Script problems?</h3>
<ul>
	<li>Instructions for newbies
		<ul>
			<li>Install <a href="http://www.mozilla.com/en-US/firefox/all.html">FireFox</a>'s most recent stable version</li>
			<li>Install <a href="https://addons.mozilla.org/en-US/firefox/addon/748">Greasemonkey</a> Addon for FireFox</li>
			<li>Install <a href="http://userscripts.org/scripts/show/30637">Travian QP Pub</a>'s most recent version</li>
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





/** Anonymous function - everything should be inside this and this is loaded on "DOMContentLoaded" event*/
(function () {



/**
* main - This is the starting point of everything
*/
function main() {
	GM_log("[ - MAIN - ]");
	if (hasThisPagePublicity()) {							GM_log("[-][hasThisPagePublicity]");
		removePublicity();
	}
}



/** removePublicity */
function removePublicity() {
	var publicityDivBackground = xpEvalFirst('//body/div[contains(@style, "img/un/l/bigsize_bg.jpg")]');
	document.body.removeChild(publicityDivBackground);

	var publicityFrame = getPublicityDiv();
	document.body.removeChild(publicityFrame);

	var upperOffsetDiv = xpEvalFirst('//body/div');
	document.body.removeChild(upperOffsetDiv);

	var divLtop2 = xpEvalFirst('//body/div[@id="ltop2"]');
	divLtop2.id = "ltop1";

	var divLRes2 = xpEvalFirst('//body/div[@id="lres2"]');
	divLRes2.id = "lres0";
}

/** hasThisPagePublicity - Checks if this page has publicity */
function hasThisPagePublicity() { return getPublicityDiv(); }

/** getPublicityDiv */
function getPublicityDiv() { return xpEvalFirst('//body/div/iframe[contains(@src, "ads.travian")]/..'); }




//===========================================================================================================
//===========================================================================================================
//===================================  Document XPath Evalute Functions  ====================================
//===========================================================================================================
//===========================================================================================================


/** xpEval - Returns an ordered snapshot of the matched nodes. */
function xpEval(xpathExpr) { return document.evaluate(xpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); }

/** xpEvalFirst - Returns the first matched node. */
function xpEvalFirst(xpathExpr) { return document.evaluate(xpathExpr, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }



main();

})();
