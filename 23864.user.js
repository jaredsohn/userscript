// ==UserScript==
// @name          YouTube+
// @namespace     http://userscripts.org/scripts/show/23864
// @description   Optimizes YouTube for bigger resolutions and gives you the opportunity to hide various sections of the video playback page, disable autoplay, enable HD and download videos. All this and more can be utilized through a built-in configuration menu.
// @include       http://youtube.tld/watch*
// @include       http://*.youtube.tld/watch*
// @include       http://broadcastyoutube.tld/watch*
// @include       http://*.broadcastyoutube.tld/watch*
// ==/UserScript==

/*
Author: Attach
Based on ETcelera and Mineyes's YousableTube userscripts as of 10 Mar 2008. All the credit to them!
*/

////////////////////////// START OF HELPER FUNCTIONS //////////////////////////

// Shortcut to document.getElementById
function $(id) {
	return document.getElementById(id);
}

// Deletes a node from its id or a reference to it
function delNode(idRef) {
	var iNode = (typeof(idRef) == "string") ? $(idRef) : idRef;
	if (iNode) return iNode.parentNode.removeChild(iNode);
	return null;
}

// Runs a particular XPath expression p against the context node context (or the document, if not provided)
// If a document (docObj) is provided, its evaluate method is used instead of document.evaluate (and it's also the default context)
// Returns the results as an array
function $x(p, context, docObj) {
	if (!docObj) docObj = document;
	if (!context) context = docObj;
	var item, arr = [], xpr = docObj.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

// Returns only the first element of the array returned by $x
function $x1(p, context, docObj) {
	var nodeArray = $x(p, context, docObj);
	if (nodeArray.length > 0) return nodeArray[0];
	return null;
}

// Creates a new node with the given attributes
function createNode(type, attributes) {
	var node = document.createElement(type);
	for (var attr in attributes) {
		node.setAttribute(attr, attributes[attr]);
	}
	return node;
}

// Inserts the specified node as a sibling AFTER the reference element
function insertAfter(newNode, node) {
	return node.parentNode.insertBefore(newNode, node.nextSibling);
}

// Find the absolute location in pixels for a provided element
// Returns an object with .x and .y properties
function findXY(elt) {
	var x = 0, y = 0;
	while (elt !== null) {
		x += elt.offsetLeft - elt.scrollLeft;
		y += elt.offsetTop - elt.scrollTop;
		elt = elt.offsetParent;
	}
	return {x: x, y: y};
}

// Returns true if the video is substituted by an icon
function isVideoIcon() {
	return ($("gssubsIcon") === null) ? false: true;
}

// Reloads the player by removing it from the DOM tree and inserting it again in the same position
// If the video is substituted by an icon, it won't do anything (a reload isn't necessary)
function reloadPlayer() {
	if (isVideoIcon()) return;
	var playerParent = player.parentNode;
	var playerNextSibling = player.nextSibling;
	playerParent.removeChild(player);
	playerParent.insertBefore(player, playerNextSibling);
}

// Gets a Flash string variable from the player
// Returns null if the variable isn't found
function getFlashVar(varName) {

	// Gets the flashvars from the player
	var flashVars = String(player.getAttribute("flashvars"));

	// Searchs for the varName (encoded) in the flashvars
	varName = escape(varName);
	var queryRE = new RegExp("(?:^|&)" + varName + "=([^&]*)");
	var queryRet = queryRE.exec(flashVars);

	// Returns the corresponding value (decoded) or null (if not found)
	return (queryRet === null) ? null : unescape(queryRet[1]);

}

// Sets a Flash string variable to the player
// If doReloadPlayer is true it also reloads the player
function setFlashVar(varName, varNewValue, doReloadPlayer) {

	// Gets varName value now and the flashvars from the player
	var varValue = getFlashVar(varName);
	var flashVars = String(player.getAttribute("flashvars"));

	// Encodes varName y varNewValue
	varName = escape(varName);
	varNewValue = escape(varNewValue);

	// If varName isn't set, just adds it
	// If varName is set, replaces its value with varNewValue
	if (varValue === null) {
		player.setAttribute("flashvars", flashVars + "&" + varName + "=" + varNewValue);
	}
	else {
		varValue = escape(varValue); // Encodes varValue
		var replaceRE = new RegExp("(^|&)" + varName + "=" + varValue);
		flashVars = flashVars.replace(replaceRE, "$1" + varName + "=" + varNewValue);
		player.setAttribute("flashvars", flashVars);
	}

	// Reloads the player
	if (doReloadPlayer) reloadPlayer();

}

// Deletes a Flash string variable from the player
// If doReloadPlayer is true it also reloads the player
function deleteFlashVar(varName, doReloadPlayer) {

	// Gets varName value now and the flashvars from the player
	var varValue = getFlashVar(varName);
	var flashVars = String(player.getAttribute("flashvars"));

	// Deletes varName if it's set
	if (varValue !== null) {

		// Encodes varName y varValue
		varName = escape(varName);
		varValue = escape(varValue);

		// Searchs for varName and deletes it
		var replaceRE = new RegExp("(^|&)" + varName + "=" + varValue + "(&?)");
		flashVars = flashVars.replace(replaceRE, lambdaReplacer);
		player.setAttribute("flashvars", flashVars);
	}

	// Reloads the player
	if (doReloadPlayer) reloadPlayer();

	// Lambda function to remove varName in all scenarios
	// It is a nested function
	function lambdaReplacer(str, p1, p2, soffset, s) {
		return (p1 == "") ? p1 : p2; // p1 ==  "" if (^|&) matches ^ (start of string)
	}

}

// Fires a click event on targetNode (an id of a node or a reference to it)
// Returns null if the node isn't found, otherwise it returns the return value of dispatchEvent
function fireClickEvent(targetNode) {

	var iNode = (typeof(targetNode) == "string") ? $(targetNode) : targetNode;

	if (iNode) {
		var clickEvt = document.createEvent("MouseEvent");
		clickEvt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
		return iNode.dispatchEvent(clickEvt);
	}
	else {
		return null;
	}

}

// Extends the String object with a trim funcion
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, "");
}

// Adds !important to CSS rules of any type
String.prototype.makeImportant = function() {

	var Selector, DeclarationBlock, CssArray = this.match(/([^{]+)({[^{}]+})/);
	if (CssArray === null) {
		// Inline CSS rule (e.g. "display: none") or scripting rule (e.g. element.style.display = "none")
		Selector = "";
		DeclarationBlock = this;
	}
	else {
		// Complete CSS rule (e.g. ".nd {display: none}")
		Selector = CssArray[1];
		DeclarationBlock = CssArray[2];
	}

	// Adds !important to each rule
	if (DeclarationBlock.indexOf(":") != -1) {
		DeclarationBlock = DeclarationBlock.replace(/[^:;{}]+:[^:;{}]+/g, "$& !important");
	}
	else {
		// No estructure could be recognized, so we'll just add !important
		DeclarationBlock += " !important";
	}
	// Remove any !important duplicates
	DeclarationBlock = DeclarationBlock.replace(/(?:\s*!important\s*){2,}/gi, " !important");

	return Selector + DeclarationBlock;

}

// Transforms a number into a valid CSS dimension (in pixels)
Number.prototype.toCSS = function() {
	return String(Math.round(this)) + "px";
}

/////////////////////////// END OF HELPER FUNCTIONS ///////////////////////////

///////////////////////////// START OF CSS STYLES /////////////////////////////


GM_addStyle("#baseDiv {width: 1580px; top: -85px; margin: 0 auto}".makeImportant());
GM_addStyle(".user-info {position: relative; top: 124px; left: 497px; z-index: 300; height: 22px; width: 550px}".makeImportant());
GM_addStyle("#commentsDiv {position: relative; top: -10px}".makeImportant());
GM_addStyle("#playerDiv {position: absolute; left: 500px; width: 700px; height: 558px; z-index: 700}".makeImportant());
GM_addStyle("#ratingAndStatsDiv {position: absolute; top: 755px; left: 610px; width: 480px; z-index: 200}".makeImportant());
GM_addStyle("#actionsAreaDiv {position: absolute; top: 712px; left: 610px; width: 480px; z-index: 250}".makeImportant());
GM_addStyle("embed {height: 100%; width: 100%; position: inherit}".makeImportant());
GM_addStyle("#footer {margin: 0 auto;}".makeImportant());
GM_addStyle("#copyright {margin: 0 auto;}".makeImportant());
GM_addStyle("body {height: 95%}".makeImportant());
GM_addStyle("#video-quality-setting {display: none;}".makeImportant());



GM_addStyle("#thisVidCell {padding-right: 740px}".makeImportant());
GM_addStyle(".highlightRacyBox {width: 400px; position: absolute; left: 645px; top: 455px; z-index: 60}".makeImportant());
GM_addStyle("textarea {width: 480px}".makeImportant());



// Adds a class to set elements without text decoration, overriding the original style
// Descendant nodes are also affected (text-decoration isn't automatically inherited)
GM_addStyle(".noDec, .noDec * {text-decoration: none}".makeImportant());

// Adds a style for the icon which substitutes the video (if appropriate)
GM_addStyle("#gssubsIcon {margin: 267px auto; display: block; cursor: pointer}".makeImportant());

// Adds a class for the character counters
GM_addStyle((".gscharCounter {font-weight: bold; font-size: large; cursor: default; " +
						 "vertical-align: middle; margin-left: 30px}").makeImportant());

// Adds styles for the ajax wrapper div and its contents
GM_addStyle("#gsajaxWrapper {margin: 100px auto; cursor: default; text-align: center}".makeImportant());
GM_addStyle("#gsajaxWrapper * {vertical-align: middle}".makeImportant()); // vertical-align isn't automatically inherited
GM_addStyle("#gsloadingIcon {margin: 5px}".makeImportant());
GM_addStyle("#gsprogressMeter {font-variant: small-caps}".makeImportant());
GM_addStyle("#gsabortButton {margin: 5px auto; display: block}".makeImportant());

// Adds styles and classes for the configuration layers and its contents
GM_addStyle(("#gsmaskLayer {background-color: black; opacity: 0.5; z-index: 900; " +
						 "position: fixed; left: 0px; top: 0px; width: 100%; height: 100%}").makeImportant());
GM_addStyle(("#gsdialogLayer {background-color: #ffffdb; overflow: auto; padding: 5px; z-index: 901; " +
						 "outline: #f6e4b8 solid thin; position: fixed; left: 30%; top: 15%; width: 35%; height: 68%}").makeImportant());
GM_addStyle("#gsdialogLayer > * {margin: 20px 0px}".makeImportant());
GM_addStyle("#gsdialogLayer li {margin: 15px 0px 7px; font-weight: bold; list-style-type: none;}".makeImportant());
GM_addStyle("#gsdialogLayer input {vertical-align: middle}".makeImportant());
GM_addStyle("#gsconfTitle {cursor: default; font-size: 150%; font-weight: bold; text-align: center}".makeImportant());
GM_addStyle("#gsconfButDiv {text-align: center}".makeImportant());
GM_addStyle("#gsconfButDiv input {margin: 5px}".makeImportant());

////////////////////////////// END OF CSS STYLES //////////////////////////////

///////////////////////// START OF USER CONFIGURATION /////////////////////////

/*
	Use "YousableTubeFix configuration" menu command to configure the script
	The menu is under "Tools" / "Greasemonkey" / "User Script Commands"
*/

// Default video player size (a floating point number or either "fill" or "max")
var videoSize = GM_getValue("videoSize", "fill");

// Optional junk removal (either "true" or "false", without quotes)
var removeBrand = GM_getValue("removeBrand", true);
var removeAlsoWatching = GM_getValue("removeAlsoWatching", true);
var removeEmbed = GM_getValue("removeEmbed", false);
var removeURL = GM_getValue("removeURL", true);
var removeRatings = GM_getValue("removeRatings", false);
var removeActions = GM_getValue("removeActions", false);
var removeMore = GM_getValue("removeMore", true);
var removeRelated = GM_getValue("removeRelated", false);
var removeFooter = GM_getValue("removeFooter", true);
var removeCopyright = GM_getValue("removeCopyright", true);
var removeComments = GM_getValue("removeComments", false);

// Automatically expand the video info, hide collapse link
var expandInfo = GM_getValue("expandInfo", true);
var hideCollapse = GM_getValue("hideCollapse", true);

// Substitutes the video with an icon, preventing autoplay and autodownload
var videoToIcon = GM_getValue("videoToIcon", true);

// Adds a character counter to the Post Comment sections
var addCharCounter = GM_getValue("addCharCounter", true);

// Makes the page size of the comments in the video page bigger (500 comments per page)
var biggerComments = GM_getValue("biggerComments", false);

// Forces the change to HD mode
var forceHDMode = GM_getValue("forceHDMode", true);

// Function to validate video size input. Returns a valid videoSize string or null (if input isn't valid)
function valVideoSize(vs) {

	var cs = String(vs).toLowerCase().trim();

	if ((cs === "fill") || (cs === "max")) return cs;
	if (!isNaN(parseFloat(cs))) return Math.abs(parseFloat(cs)).toString();
	return null;

}

// Configuration function
function configureScript(e) {

	// Gets the layers
	var maskLayer = $("gsmaskLayer");
	var dialogLayer = $("gsdialogLayer");

	// Checks the layers state
	// Creates the layers if they don't exist or displays them if they are hidden
	if ((maskLayer) && (dialogLayer)) {
		if ((maskLayer.style.display == "none") && (dialogLayer.style.display == "none")) {
			setDialogInputState(true); // Makes sure the input fields are enabled
			maskLayer.style.display = "";
			dialogLayer.style.display = "";
		}
		dialogLayer.focus();
	}
	else {
		createLayers();
	}

	return; // Exit function


	// Creates the configuration layers
	// It is a nested function
	function createLayers() {

		// Creates a layer to mask the page during configuration
		maskLayer = createNode("div", {id: "gsmaskLayer", title: "Click here to return to the page"});


		// Creates a layer for the configuration dialog
		dialogLayer = createNode("div", {id: "gsdialogLayer"});

		// Creates the configuration dialog HTML
		dialogLayer.innerHTML = "<div id='gsconfTitle'>YouTube+ Configuration</div>" +
		"<ul>" +      		
		"<li style='display:none'>Select the default video size. Enter a floating point number or either \"fill\" or \"max\":</li>" +
      	"<input style='display:none' type='text' id='gsconfvideoSize' value='" + videoSize + "'>" +
		"<li>Hide sections:</li>" +
		"<input type='checkbox' id='gsconfremoveBrand'" + (removeBrand ? " checked='checked'" : "") + ">Channel brand<br>" +
		"<input type='checkbox' id='gsconfremoveAlsoWatching'" + (removeAlsoWatching ? " checked='checked'" : "") + ">Also Watching Now<br>" +
		"<input type='checkbox' id='gsconfremoveRatings'" + (removeRatings ? " checked='checked'" : "") + ">Stats and ratings<br>" +
		"<input type='checkbox' id='gsconfremoveActions'" + (removeActions ? " checked='checked'" : "") + ">Actions<br>" +
		"<input type='checkbox' id='gsconfremoveEmbed'" + (removeEmbed ? " checked='checked'" : "") + ">Embed<br>" +
		"<input type='checkbox' id='gsconfremoveURL'" + (removeURL ? " checked='checked'" : "") + ">URL<br>" +
		"<input type='checkbox' id='gsconfremoveMore'" + (removeMore ? " checked='checked'" : "") + ">More From<br>" +
		"<input type='checkbox' id='gsconfremoveRelated'" + (removeRelated ? " checked='checked'" : "") + ">Related<br>" +
		"<input type='checkbox' id='gsconfremoveFooter'" + (removeFooter ? " checked='checked'" : "") + ">Footer<br>" +
		"<input type='checkbox' id='gsconfremoveCopyright'" + (removeCopyright ? " checked='checked'" : "") + ">Copyright" +
		"<li>About This Video:</li>" +
		"<input type='checkbox' id='gsconfexpandInfo'" + (expandInfo ? " checked='checked'" : "") + ">Automatically expanded<br>" +
		"<input type='checkbox' id='gsconfhideCollapse'" + ((hideCollapse && expandInfo) ? " checked='checked'" : "") + ">Hide collapse link" +
		"<li>Text comments:</li>" +
		"<input type='radio' id='gsconfcommentsNormal' name='gsconfcommentsChoice'" + ((!removeComments && !biggerComments) ? " checked='checked'" : "") + ">Normal<br>" +
		"<input type='radio' id='gsconfcommentsBigger' name='gsconfcommentsChoice'" + ((!removeComments && biggerComments) ? " checked='checked'" : "") + ">More comments<br>" +
		"<input type='radio' id='gsconfcommentsNone' name='gsconfcommentsChoice'" + (removeComments ? " checked='checked'" : "") + ">None" +
		"<li><input type='checkbox' id='gsconfvideoToIcon'" + (videoToIcon ? " checked='checked'" : "") + ">Disable autoplay</li>" +
		"<li><input type='checkbox' id='gsconfaddCharCounter'" + (addCharCounter ? " checked='checked'" : "") + ">Add a comment character counter</li>" +
		"<li><input type='checkbox' id='gsconfforceHDMode'" + (forceHDMode ? " checked='checked'" : "") + ">Force high quality videos</li>" +
		"</ul>" +
		"<div id='gsconfButDiv'>" +
		"<input type='button' id='gsconfOKBut' value='OK' title='Save the current configuration'>" +
		"<input type='button' id='gsconfCancelBut' value='Cancel' title='Return to the page without saving'>" +
		"</div>";

		// Appends the layers to the document
		document.body.appendChild(maskLayer);
		document.body.appendChild(dialogLayer);

		// Adds the necessary event listeners
		maskLayer.addEventListener("click", hideLayers, false);
		$("gsconfexpandInfo").addEventListener("click", videoInfoLogic, false);
		$("gsconfOKBut").addEventListener("click", saveConfiguration, false);
		$("gsconfCancelBut").addEventListener("click", hideLayers, false);

	}

	// Changes the enabled state of all input fields of the dialog layer. If newState is undefined or not boolean, it does nothing
	// It is a nested function
	function setDialogInputState(newState) {
		if (typeof(newState) != "boolean") return;
		var allInputs = dialogLayer.getElementsByTagName("input");
		for (var i = 0; i < allInputs.length; i++) allInputs[i].disabled = !newState;
	}


	// Checks the logic of the video information choices
	// It is called by the expand info checkbox event listener
	// It is a nested function
	function videoInfoLogic(evt) {
		var infoState = $("gsconfexpandInfo").checked;
		var confhideCollapse = $("gsconfhideCollapse");
		if (infoState === false) confhideCollapse.checked = false;
		confhideCollapse.disabled = !infoState;
	}

	// Exits the configuration by hiding the layers
	// It is called by the Cancel button and the maskLayer event listeners
	// It is a nested function
	function hideLayers(evt) {
		dialogLayer.style.display = "none";
		maskLayer.style.display = "none";
	}

	// Checks and saves the configuration to the configuration variables
	// It is called by the Ok button event listener
	// It is a nested function
	function saveConfiguration(evt) {

		// Disables the input fields
		setDialogInputState(true);

		// Checks default video size
		var valvs = valVideoSize($("gsconfvideoSize").value);
		if (valvs === null) {
			window.alert("Invalid default video size");
			setDialogInputState(true); // Re-enables the input fields
			$("gsconfvideoSize").focus();
			return;
		}
		GM_setValue("videoSize", valvs);

		// Sets other configuration variables
		GM_setValue("removeMore", $("gsconfremoveMore").checked);
		GM_setValue("removeRelated", $("gsconfremoveRelated").checked);
		GM_setValue("removeBrand", $("gsconfremoveBrand").checked);
		GM_setValue("removeAlsoWatching", $("gsconfremoveAlsoWatching").checked);
		GM_setValue("removeEmbed", $("gsconfremoveEmbed").checked);
		GM_setValue("removeURL", $("gsconfremoveURL").checked);
		GM_setValue("removeRatings", $("gsconfremoveRatings").checked);
		GM_setValue("removeActions", $("gsconfremoveActions").checked);
		GM_setValue("removeFooter", $("gsconfremoveFooter").checked);
		GM_setValue("removeCopyright", $("gsconfremoveCopyright").checked);
		GM_setValue("expandInfo", $("gsconfexpandInfo").checked);
		GM_setValue("hideCollapse", ($("gsconfexpandInfo").checked ? $("gsconfhideCollapse").checked : false));
		GM_setValue("biggerComments", $("gsconfcommentsBigger").checked ? true : false);
		GM_setValue("removeComments", $("gsconfcommentsNone").checked ? true : false);
		GM_setValue("videoToIcon", $("gsconfvideoToIcon").checked);
		GM_setValue("addCharCounter", $("gsconfaddCharCounter").checked);
		GM_setValue("forceHDMode", $("gsconfforceHDMode").checked);

		// Reloads page and script
		window.location.reload();

	}

}

// Register configuration menu command
GM_registerMenuCommand("YouTube+ Configuration", configureScript, null, null, "Y");

////////////////////////// END OF USER CONFIGURATION //////////////////////////

// YouTube Video URL:    http://(Youtube hostname)/watch?v=(videoId)
// YouTube Download URL: http://(Youtube hostname)/get_video?video_id=(videoId)&t=(tId)[&fmt=(videoFormat)]

// Removes More
if (removeMore)	delNode("more-from-panel");

// Removes Related
if (removeRelated)	delNode("related-videos-panel");

// Removes "New on Youtube" ads (search results page)
delNode("sideContentWithPVA");

// Removes footer
if (removeFooter) delNode("footer");

// Removes copyright
if (removeCopyright) delNode("copyright");

// Gets video download URL and adds link to title
var player = $("movie_player");
if (!player) return;

var videoId = getFlashVar("video_id");
if (videoId === null) return;
var tId = getFlashVar("t");
if (tId === null) return;

var MIMEString, videoFormatMatch = null, videoFormat = getFlashVar("fmt_map");
if (videoFormat !== null) videoFormatMatch = videoFormat.match(/^(\d+)(?:\/\d+){4}$/);
if ((videoFormat === null) || (videoFormatMatch === null)) {
	// Video is LD (its fmt_map isn't set or doesn't match the regex)
	videoFormat = "";
	MIMEString = "video/x-flv";
}
else {
	// Video is HD
	videoFormat = "&fmt=" + videoFormatMatch[1];
	MIMEString = "video/mp4";
}

var ytHost = window.location.protocol + "//" + window.location.host;
var videoURL = ytHost + "/get_video?video_id=" + videoId + "&t=" + tId + videoFormat;

var vidTitle = $("vidTitle");
if (!vidTitle) return;
vidTitle.innerHTML = "<div style='vertical-align:text-bottom; float: left; margin-right: 10px'><a href='/' title='Click here to return home'><img src='http://i30.tinypic.com/mhyqmr.jpg' /></a></div><a id='gsvidTitleLink' style='color: #0033cc; font-size: 17px' title='Click here to download the video' " +
	"href='" + videoURL + "' type='" + MIMEString + "' class='noDec'>" + vidTitle.innerHTML + " <img src='http://s.ytimg.com/yt/img/icn_toolbox_postproduction_23x23-vfl23627.gif' style='vertical-align:text-bottom; margin-left: 5px' /></a><a href='http://userscripts.org/scripts/show/23864' title='Click here to update YouTube+'><img src='http://s.ytimg.com/yt/img/icn_toolbox_sound_23x23-vfl23627.gif' style='vertical-align:text-bottom; margin-left: 5px' /></a>";

// Removes top ad (or empty space left by adblock)
delNode("leaderboardAd");


// Removes "Promoted videos" ads (and its parent wrapper)
delNode($("promotedVidsContainer").parentNode);

// Removes Channel Brand
if (removeBrand) {
	delNode("channelBrandCap");
	delNode("channelBrandDiv");
}

// Removes "Also Watching Now" section
if (removeAlsoWatching) delNode("asDiv");

// Removes Ratings and Stats section
if (removeRatings) delNode("ratingAndStatsDiv");

// Removes Actions section ("Share", "Favorite", "Add to Playlist" and "Flag")
if (removeActions) delNode("actionsAreaDiv");

// Removes "Embed" section
if (removeEmbed) delNode("embedDiv");

// Removes URL section
if (removeURL) delNode("urlDiv");

// Removes comments section
if (removeComments) delNode("commentsDiv");

// Expands the video information
if (expandInfo) {
	var expandLink = $x1("//div[@class='videoDescDiv collapse-content']//a[@class='smallText eLink']");
	if (expandLink) {
		// Fires a click event on expandLink
		fireClickEvent(expandLink);
		if (hideCollapse) {
			var expandedDiv = $x1("//div[@class='videoDescDiv expand-content']");
			delNode($x1(".//a[@class='smallText eLink']", expandedDiv)); // Deletes the "(less)" link
			expandedDiv.textContent = expandedDiv.textContent.replace(/\(\)(\s*)$/, "$1"); // Removes the parenthesis left behind
		}
	}
}

// Saves original video dimensions and aspect ratio for resizeVideo's use
var oSize = {width: player.clientWidth, height: player.clientHeight,
						 AR: player.clientWidth / player.clientHeight};

// Substitutes the video with an icon
var playerDiv = $("playerDiv");
if (!playerDiv) return;
if (videoToIcon) {
	var subsIcon = createNode("img", {id: "gssubsIcon", alt: "Video",
																		title: "Click here to play the video",
																		src: "http://s.ytimg.com/yt/img/icn_toolbox_directing_23x23-vfl23627.gif"});
	playerDiv.replaceChild(subsIcon, player); //Replaces the player with the icon
	subsIcon.addEventListener("click", restoreVideo, false); //Adds an event listener to the icon
}

// Function to remove the icon and restore the video
// It is called by subsIcon event listener
function restoreVideo(evt) {
	playerDiv.replaceChild(player, subsIcon);
	if (videoSize) resizeVideo(videoSize);
}

// Moves player below title
insertAfter(playerDiv, vidTitle);

// Creates the "change video definition" (CVD) link properties objects
var linkHDProps = {text: "HD", title: "High Definition (experimental, could be unavailable)"};
var linkLDProps = {text: "LD", title: "Low Definition (normal)"};

// Adds the CVD link
if (videoFormat === "") {
	// Adds the H.264/MPEG-4 AVC HD link
	linkDiv.innerHTML += "- <a id='gsresizeLink9' title='" + linkHDProps.title + "' href='javascript:void(null)'>" + linkHDProps.text + "</a>";
}
else {
	// Adds the normal no-HD link
	linkDiv.innerHTML += "- <a id='gsresizeLink9' title='" + linkLDProps.title + "' href='javascript:void(null)'>" + linkLDProps.text + "</a>";
}

insertAfter(linkDiv, playerDiv);
linkDiv.addEventListener("click", resizeClick, false); // Adds an event listener to the div for the resize links
var videoDefLink = $("gsresizeLink9");
videoDefLink.addEventListener("click", toggleLinkDef, false); // Adds an event listener to the CVD link

// Forces the HD mode by firing a click event on the CVD link
if (forceHDMode) {
	if (videoFormat === "") fireClickEvent(videoDefLink);
}


// Function to toggle the CVD link, the player and the video download link between HD and LD
// It is called by the CVD link event listener
function toggleLinkDef(evt) {

	if (videoFormat === "") {
		// Changes from LD to HD (CVD link set to go back to LD)
		videoDefLink.textContent = linkLDProps.text;
		videoDefLink.title = linkLDProps.title;
		setFlashVar("fmt_map", "18/0/9/0/115", true);
		videoFormat = "&fmt=18";
		MIMEString = "video/mp4";
	}
	else {
		// Changes from HD to LD (CVD link set to go back to HD)
		videoDefLink.textContent = linkHDProps.text;
		videoDefLink.title = linkHDProps.title;
		deleteFlashVar("fmt_map", true);
		videoFormat = "";
		MIMEString = "video/x-flv";
	}

	// Updates the download video link
	videoURL = ytHost + "/get_video?video_id=" + videoId + "&t=" + tId + videoFormat;
	var vidTitleLink = $("gsvidTitleLink");
	vidTitleLink.href = videoURL;
	vidTitleLink.type = MIMEString;

}

// Function used to resize video
function resizeVideo(aSize) {

	var newH, newW;
	// Gets viewport dimensions without scrollbars (in Strict mode)
	var vh = document.documentElement.clientHeight, vw = document.documentElement.clientWidth;

	// If the video is substituted by an icon, only scroll up/down to get the video title on top
	if (isVideoIcon()) {
		window.scrollTo(0, findXY(vidTitle).y);
		return; // Exit function
	}

	switch(aSize) {
		case "fill":
			// Fill the space available in the parent div, preserving the aspect ratio
			newW = playerDiv.clientWidth;
			newH = newW / oSize.AR;
			break;
		case "max":
			// Fill the viewport dimensions completely, preserving the aspect ratio
			if (vw > vh) {
				newH = vh;
				newW = newH * oSize.AR;
			}
			else {
				newW = vw;
				newH = newW / oSize.AR;
			}
			break;
		default:
			// Multiply the original dimensions by the aSize factor
			newW = oSize.width * aSize;
			newH = oSize.height * aSize;
	}

	// Resizes the player
	player.style.width = newW.toCSS();
	player.style.height = newH.toCSS();

	// Centers the player, video title and resize links horizontally
	player.style.position = "relative"; // Enables CSS relative positioning
	player.style.left = ((playerDiv.clientWidth - newW) / 2).toCSS(); // Calculates the offset
	vidTitle.style.position = "relative";
	vidTitle.style.left = player.style.left;
	linkDiv.style.position = "relative";
	linkDiv.style.left = player.style.left;

	// Scrolls up/down to get the video title (or the player if aSize is "max") on top
	var scrollPos = findXY((aSize == "max") ? player : vidTitle);
	window.scrollTo(0, scrollPos.y);

}

// Funtion used to call resizeVideo with the appropriate aSize parameter
// It is called by the resize links event listener when a click on a child element (or on the div itself) bubbles up to the resize links div
function resizeClick(evt) {

	var linkId = evt.target.id; // Gets the id of the element clicked
	if (!linkId || (evt.target.nodeName.toUpperCase() != "A")) return;  // Only A links with id will be handled
	if (linkId.search(/^gsresizeLink[0-6]$/) == -1) return; // Only resize links from 0 to 6 will be handled

	var linkSize = valVideoSize(evt.target.textContent); // Gets a valid video size
	if (linkSize !== null) resizeVideo(linkSize);

}

// Resize the video to default size
if (videoSize) resizeVideo(videoSize);

// Registers the listeners needed by the character counters
// The listeners are registered at the div level because the form and its contents are dinamically generated by a Youtube script
// The "focus" and "blur" listeners are capturing ones because these events don't bubble
if (addCharCounter) {
	var postCommentDiv1 = $("div_main_comment");
	var postCommentDiv2 = $("div_main_comment2");
	if (postCommentDiv1) {
		postCommentDiv1.addEventListener("keyup", charCounterListener, false);
		postCommentDiv1.addEventListener("focus", charCounterListener, true);
		postCommentDiv1.addEventListener("blur", charCounterListener, true);
	}
	if (postCommentDiv2) {
		postCommentDiv2.addEventListener("keyup", charCounterListener, false);
		postCommentDiv2.addEventListener("focus", charCounterListener, true);
		postCommentDiv2.addEventListener("blur", charCounterListener, true);
	}
}

// Event listener function for the character counters' events
function charCounterListener(evt) {

	// Common listener code
	var commentTA = $x1(".//form/textarea[@name='comment']", evt.currentTarget); // Searchs for the comment textarea (evt.currentTarget will be the postCommentDiv[1/2] div)
	if ((!commentTA) || (commentTA != evt.target)) return; // Only events in commentTA textarea will be handled (if commentTA is undefined the function won't continue)

	var commentCharCounter = $(evt.currentTarget.id + "_gscounter"); // Searchs for the counter (it has to have the div id plus "_gscounter")

	// Redirects the flow to the appropiate subfunction
	switch(evt.type) {
		case "keyup":
			charCounterKeyListener(evt);
			break;
		case "focus":
		case "blur":
			charCounterFocusListener(evt);
			break;
	}
	return; // Exit function

	// Function to create or update the character counters
	// It is called by the postCommentDiv[1/2] event listeners when a key pressed on a child element (or on the div itself) bubbles up to the postCommentDiv[1/2] divs
	// It is a nested function
	function charCounterKeyListener(evt) {

		// If the counter doesn't exists, it has to be created
		if (!commentCharCounter) {
			commentCharCounter = createNode("span", {id: evt.currentTarget.id + "_gscounter", class: "gscharCounter"});
			insertAfter(commentCharCounter, commentTA); // Inserts the counter after the textarea
			commentTA.style.verticalAlign = "middle".makeImportant(); // Necessary to align the boxes correctly
		}

		var charsLeft = 500 - commentTA.value.length;
		commentCharCounter.style.color = (charsLeft < 0) ? "red" : ""; // The counter will be red if the character limit is exceeded
		commentCharCounter.textContent = charsLeft; // Updates the counter

	}

	// Function to show or hide the character counters
	// It is called by the postCommentDiv[1/2] event listeners when a focus/blur event on a child element (or on the div itself) is captured by the postCommentDiv[1/2] divs
	// It is a nested function
	function charCounterFocusListener(evt) {
		if (commentCharCounter) commentCharCounter.style.display = (evt.type == "focus") ? "inline" : "none";
	}

}

// Substitutes the original page size of comments in video page (10) for the bigger one used in the view all comments page (500)
// Other page sizes can't be easily used because Youtube ajax page only accepts those values in the pagesize parameter (others seem to default to 10)
if (biggerComments) {

	// Gets necessary data from the page
	var recentComments = $("recent_comments");
	var commentThreshold = $x1("//div[@id='commentsDiv']//form//select[@name='commentthreshold']");

	if ((recentComments) && (commentThreshold)) {

		// Creates the elements that will indicate that the comments are being loaded
		var loadingIcon = createNode("img", {id: "gsloadingIcon", alt: "Loading...",
																				 src: ytHost + 

"/img/icn_loading_animated.gif"});
		var progressMeter = createNode("span", {id: "gsprogressMeter"});
		var abortButton = createNode("input", {id: "gsabortButton", title: "Abort the transaction", type: "button", value: "Abort"});
		var ajaxWrapper = createNode("div", {id: "gsajaxWrapper", title: "The comments are being loaded..."});

		// Inserts the contents within the wrapper
		ajaxWrapper.appendChild(loadingIcon);
		ajaxWrapper.appendChild(progressMeter);
		ajaxWrapper.appendChild(abortButton);

		// Select the original comments with a range and extracts them from the DOM tree into a document fragment
		var recentCommentsRange = document.createRange();
		recentCommentsRange.selectNodeContents(recentComments);
		var recentCommentsFrag = recentCommentsRange.extractContents();
		recentCommentsRange.detach();

		// Inserts the wrapper within the now empty div
		recentComments.appendChild(ajaxWrapper);

		// Adds an event listener to the abort button
		abortButton.addEventListener("click", abortAjax, false);

		// Gets the XML data from Youtube
		// GM_xmlhttpRequest's privileged features aren't necessary and it doesn't support responseXML without using DOMParser
		var xhr = new XMLHttpRequest();
		xhr.onload = function(evt) {

			// Checks for errors
			if ((this.readyState != 4) || (this.status != 200) || (!this.responseXML)) {
				restoreComments();
				return;
			}

			// The data was received. It is now used to fill the recent comments div
			var xmlData = $x1("//html_content", null, this.responseXML);
			if ((xmlData) && (xmlData.textContent)) {
				recentComments.innerHTML = xmlData.textContent;
			}
			else {
				restoreComments();
				return;
			}

			// Change the commentThreshold combobox so it won't restore the old pagesize
			if (commentThreshold.hasAttribute("onchange")) {
				commentThreshold.setAttribute("onchange", commentThreshold.getAttribute("onchange").replace("&page_size=10", "&page_size=500"));
			}

		}
		xhr.onprogress = function(evt) {
			progressMeter.textContent = Math.round(((evt.position / evt.totalSize) * 100)) + "% completed";
		}
		xhr.onerror = function(evt) {
			restoreComments();
		}
		xhr.open("GET", ytHost + "/watch_ajax?v=" + videoId + "&action_get_comments=1&p=1&commentthreshold=" + commentThreshold.value + "&page_size=500", true);
		xhr.send(null);

	}

}

// Function to remove the ajax wrapper (with the loading icon, etc...) and restore the original comments
// It is called if the ajax transaction fails or is aborted
function restoreComments() {
	recentComments.replaceChild(recentCommentsFrag, ajaxWrapper);
}

// Function to abort the ajax transaction
// It is called by the ajax abort button event listener
function abortAjax(evt) {
	abortButton.disabled = true;
	if (xhr) xhr.abort();
	restoreComments();
}