// ==UserScript==
// @name           GmailFbookPicImporter
// @namespace      http://www.joshlange.net/
// @description    Import facebook thumbnails into gmail contacts
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @exclude        *ui=*
// @exclude        */ui*
// @version       23 Aug 2009
// ==/UserScript==

//VARIABLES ================================
var facebookDebug = false;
var googleDebug = false;

//SCRIPT VERSION ===========================
//updates were copied from:
//http://userscripts.org/scripts/show/13333
//if you use it, give him credit.

// Current script version (release date), last update check and last remote version seen
//this is unix epoch time
var scriptVersion = 1251060997; // 23 Aug 2009

// URLs related to the script
var scriptFileURL = "http://userscripts.org/scripts/source/56203.user.js";
var scriptHomepageURL = "http://userscripts.org/scripts/show/56203";

var sSt = unsafeWindow.sessionStorage;

//versioning style
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

};
// Adds styles for the script "new version" message and its anchors
[
	"#gsscriptVersionMessage {background-color: #C00040; color: white; outline: black solid thin; overflow: auto; " +
		"padding: 5px; position: fixed; z-index: 2000; top: 0px; right: 0px; width: 250px; font-size: .75em; text-align: center",
	"#gsscriptVersionMessage a {margin: 0px 5px}"
].forEach(function(s) {GM_addStyle(s.makeImportant());});

var scriptLastCheck = parseInt(GM_getValue("scriptLastCheck", "0"), 10);
if (isNaN(scriptLastCheck)) scriptLastCheck = 0;

var scriptLastRemoteVersion = parseInt(GM_getValue("scriptLastRemoteVersion", scriptVersion.toString()), 10);
if (isNaN(scriptLastRemoteVersion)) scriptLastRemoteVersion = scriptVersion;




//FACEBOOK GLOBALS =========================
var facebookWindowName = false;
var facebookWindow = false;
var facebookDiv = false;
var facebookDom = false;

//GOOGLE GLOBALS ===========================
var googleDiv = false;
var googleInnerDiv = false;
var googleResultDiv = false;
var googleFoundWebUrlBox = false;
var googleFoundWebButton = false;
var googleDocument = false;
var googleSubDocument = false;
var googlePictureUploadDocument = false;
var googleClickSelectButton = false;
var googleOnLoadDocument = false;
var googleOnLoadCanvas = false;
var googleOnLoadSubDoc = false;
var googleOnLoadPictureFrame = false;

//SEARCH GLOBALS ===========================
var searchQueue = new Array();
var resultQueue = new Array();

var debugWindow;
var useDebugWindow = true;
var debugLineCount = 1;

//thanks to http://www.phpbuilder.com/board/showthread.php?t=10318476
function urlencode(str) {
str = escape(str);
str = str.replace('+', '%2B');
str = str.replace('%20', '+');
str = str.replace('*', '%2A');
str = str.replace('/', '%2F');
str = str.replace('@', '%40');
return str;
}

//VERSIONING ==================================
function $(id) {
	return document.getElementById(id);
}
function createNode(type, attributes, props) {
	var node = document.createElement(type);
	if (attributes) {
		for (var attr in attributes) {
			node.setAttribute(attr, attributes[attr]);
		}
	}
	if (props) {
		for (var prop in props) {
			if (prop in node) node[prop] = props[prop];
		}
	}
	return node;
}

// Checks if there is a new script version according to the version information in the script homepage
// The version information is in a line in the full description of the script: "<p>#[V:00000000]#</p>" (00000000 is the version number)
// If the request is successful and there is a new version available, a message to the user is displayed
// Shows/hides an update notice to the user (according to the boolean parameter scriptShowMessage)
// The scriptNewVersion parameters is used to display the new version number/date in Date.prototype.getTime() format
function scriptShowUpdateMessage(scriptShowMessage, scriptNewVersion) {

	// Gets the notice box and the script new version date in UTC format
	var messageDiv = $("gsscriptVersionMessage");
	var scriptNewVersionDate = (new Date(scriptNewVersion*1000)).toUTCString();

	// Shows/creates/hides the update notice
	if (scriptShowMessage == false) {
		// Hides the notice if it exists
		if (messageDiv) messageDiv.style.display = "none";
	}
	else {
		// The notice shouldn't be shown/created if the user has chosen to hide it for this session
		if (sSt.gsscriptFbookGmailVersionNoticeHide) return;

		if (messageDiv) {
			// Shows the notice
			messageDiv.style.display = "";
		}
		else {

			// Creates the notice
			messageDiv = createNode("div", {id: "gsscriptVersionMessage", title: "A new GmailFbookPicImporter version is available"});
			messageDiv.innerHTML = "A new version of GmailFbookPicImporter (" + scriptNewVersionDate + ") is available<br><br>" +
				"<a id='gsscriptVersionMessageInstall' href='" + scriptFileURL + "' title='Install the script update'>Install</a>" +
				"<a href='" + scriptHomepageURL + "' target='_blank' title='Go to GmailFbookPicImporter homepage'>Go to web page</a>" +
				"<a id='gsscriptVersionMessageHide' href='javascript:void(null)' title='Hide the notice for this session'>Hide</a>";
			document.body.appendChild(messageDiv);

			// Adds an event listener to the hide notice link
			$("gsscriptVersionMessageHide").addEventListener("click", function(evt) {
				sSt.gsscriptFbookGmailVersionNoticeHide = "1"; // Sets a sessionStorage variable to prevent the notice to be shown for this session
				scriptShowUpdateMessage(false, null);
			}, false);

			// Adds an event listener to the install link to hide the notice
			$("gsscriptVersionMessageInstall").addEventListener("click", function(evt) {scriptShowUpdateMessage(false, null);}, false);

		}
	}
}

function scriptCheckVersion() {
	GM_xmlhttpRequest({
		method: "GET",
		url: scriptHomepageURL,
		onload: function(evt) {
			if ((evt.readyState == 4) && (evt.status == 200)) {

				// Gets the remote version from the response and makes sure it is a number
				var responseMatch = evt.responseText.match(/<p>#\[V:(\d+)]#<\/p>/);
				var remoteVersion = (responseMatch === null) ? NaN : parseInt(responseMatch[1], 10);
				if (isNaN(remoteVersion)) return;

				// Saves the more recent version according to the server and shows the update notice if the server version is newer
				GM_setValue("scriptLastRemoteVersion", remoteVersion.toString());
				if (remoteVersion > scriptVersion) scriptShowUpdateMessage(true, remoteVersion);

			}
		}
	});
}

// DEBUG WINDOW ===============================
if (!debugWindow && useDebugWindow && (facebookDebug || googleDebug)) {
	var v_Bars = 'directories=no, location=no, menubar=no, status=no,titlebar=no,toolbar=no';
	var v_Options = 'scrollbars=yes,resizable=no,Height=200,Width=200,left=100,top=100';
	var options = v_Bars + ',' + v_Options;
	debugWindow = window.open('', 'FacebookGmailDebug', options);
	if (debugWindow) {
		debugWindow.document.body.innerHTML = 'Debug Log<br>----------<br>';
	}
}

function logDebug(str, doLog) {
	if (doLog) {
		if (debugWindow) {
			try {
				debugWindow.document.writeln(debugLineCount+':  '+str+'<br>');
				debugWindow.document.body.scrollTop = debugWindow.document.body.scrollHeight;
				debugWindow.focus();
				debugLineCount++;
			} catch(e) {
				//in some cases this happens, wtf!?!?
				alert(e+'\n'+str);
			}
		} else {
			alert(str);
		}
	}
}

//FACEBOOK STUFF================================
var facebookProcessQueue = function() {
	var nextSearch = searchQueue.pop();
	if (nextSearch)
		facebookExecuteRequest(nextSearch);
	else {
		facebookCloseWindow();
		googleHandleResults();
	}
}

var facebookOnLoad = function(response) {
	var html = response.responseText;

	//remove javascript from facebook.
	// s invalid modifier? wtf!
	var pattern = /<script(.|\n|\r)*?<\/script>/ig;
	var pattern2 = /<noscript(.|\n|\r)*?<\/noscript>/ig;
	//var pattern = /<script.*?<\/script>/igs;
	html = html.replace(pattern, '');
	html = html.replace(pattern2, '');
	
	//strip the body tag
	var pattern3 = /(.|\n|\r)*<body ?(.|\n|\r)*?>/;
	var pattern4 = /<\/body>(.|\n|\r)*/;
	html = html.replace(pattern3, '');
	html = html.replace(pattern4, '');

	logDebug(html, facebookDebug);

	//insert response into window so it gets parsed (DOMParser is useless)
	//facebookWindow.contentDocument.writeln(html);
	if (!facebookOpenWindow())
		return;

	facebookDiv.innerHTML = html;
	
	//make sure the user is logged in
	if (facebookDom.getElementById('pass')) {
		alert('Please log in to facebook before trying again.');
		
		//returns whatever results we have so far
		searchQueue = new Array();
		facebookProcessQueue();
		return;
	}
	
	//we are logged in
	logDebug('logged in', facebookDebug);
	
	//get the pictures
	//http://static.ak.fbcdn.net/pics/s_default.jpg
	//http://static.ak.fbcdn.net/pics/s_silhouette.jpg
	var genericPicRegex = /http:\/\/static.ak.fbcdn.net\/pics\/[^\/]*/;
	var elements = facebookDom.getElementsByClassName('UIFullListing_Pic');
	logDebug('found='+elements.length, facebookDebug);
	for (var i = 0; i < elements.length; i++) {
		var picture = elements[i].getElementsByTagName('img')[0];
		if (picture) {
			var picPath = picture.src;
			if (picPath && !picPath.match(genericPicRegex)) {
				resultQueue.push(picPath);
				logDebug('picture='+picPath,facebookDebug);
			}
		}
			
	}

	facebookProcessQueue();
};

var facebookOnError = function(response) {
	//make sure the user is logged in
	alert('Errror contacting facebook: '+response.statusText);
	
	//returns whatever results we have so far
	searchQueue = new Array();
	facebookProcessQueue();
};

function facebookOpenWindow() {
	if (!facebookWindow)
	{
		if (!facebookWindowName) {
			var dateObject = new Date();
			facebookWindowName = 'FbookGmailWindow-'+dateObject.getTime();
		}

		//iframe causes infinite loop
		var v_Bars = 'directories=no, location=no, menubar=no, status=no,titlebar=no,toolbar=no';
		var v_Options = 'scrollbars=yes,resizable=no,Height=10,Width=10,left=100,top=100,visible=false,alwaysLowered=yes';
		var options = v_Bars + ',' + v_Options;
		//var options = '';
		facebookWindow = window.open('', facebookWindowName, options);

		if (!facebookWindow) {
			//popup blocker
			alert('please unblock popups for gmail!');
			return false;
		}
		
		//set up the divs
		if (!facebookDebug) {
			var instrNode = facebookWindow.document.createElement('div');
			instrNode.innerHTML = 'Do not close this window!';
			facebookWindow.document.body.appendChild(instrNode);
		}
		
		facebookDiv = facebookWindow.document.createElement('div');
		facebookWindow.document.body.appendChild(facebookDiv);
		if (!facebookDebug)
			facebookDiv.style.display = 'none';
		
		
		//set up the dom and focus the parent window
		facebookDom = facebookWindow.document;
		window.focus();
	}
	
	return true;
}

function facebookCloseWindow() {
	if (facebookWindow)
	{
		facebookWindow.close();
		facebookWindow = false;
		facebookDiv = false;
	}
}

function facebookExecuteRequest(emailAddr) {
	var address = 'http://www.facebook.com/search/?init=quick&q='+urlencode(emailAddr);

	var requestData = new Object();
	requestData.method = 'GET';
	requestData.headers = {
		headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml,text/html'}
	};
	requestData.url = address;
	requestData.onload = facebookOnLoad;
	requestData.onerror = facebookOnError;
	GM_xmlhttpRequest(requestData);
}

//GOOGLE STUFF======================================
function googleGatherAndSearch() {
	var element;

	var contactLinks = googleSubDocument.getElementsByClassName('cmgr-link');
	var emailRegex = /@.+\..+/;
	for (var i = 0; i < contactLinks.length; i++) {
		var contact = ''+contactLinks[i].innerHTML;
		if (contact.match(emailRegex)) {
			logDebug('add email='+contact, googleDebug);
			searchQueue.push(contact);
		}
	}

	var names = googleSubDocument.getElementById('contact-name');
	if (names) {
		var classRegex = /name/;
		var nameTextRegex = /&nbsp;/g;
		var nameTextRegex2 = / (?= )/g;
		var name = names.firstChild;
		while (name) {
			var className = ''+name.className;
			var nameText = name.innerHTML;
			nameText.replace(nameTextRegex, ' '); //strip out crap
			nameText.replace(nameTextRegex2, ''); //strip out extra spaces
			if (className.match(classRegex) && nameText.length > 1) {
				logDebug('add search='+nameText, googleDebug);
				searchQueue.push(nameText);
			}
			name = name.nextSibling;
		}
	}
	
	logDebug('numToSearch='+searchQueue.length, googleDebug);

	if (searchQueue.length > 0) {
		googleShowDiv();
		googleResultDiv.innerHTML = 'Searching...';
		resultQueue = new Array(); //clear the results
		facebookProcessQueue();
	}
}
function googleShowDiv() {
	if (!googleDiv) {
		googleDiv = document.createElement('div');
		googleDiv.style.position = 'absolute';
		googleDiv.style.zIndex = 1000;
		googleDiv.style.background = '#C1D9FF';
		googleDiv.style.border = '#555';
		googleDiv.style.borderWidth = '1px';
		googleDiv.style.padding = '6px';
		googleDiv.style.borderStyle = 'solid';
		googleDiv.style.width = "60%";
		googleDiv.style.left = "20%";
		googleDiv.style.top = "20%";
		googleDiv.style.height = "60%";
		googleDiv.style.overflow = 'hidden';
		document.body.appendChild(googleDiv);
		
		googleInnerDiv = document.createElement('div');
		googleInnerDiv.style.margin = '0px';
		googleInnerDiv.style.padding = '8px';
		googleInnerDiv.style.height = "95%";
		//googleInnerDiv.style.overflow = 'hidden';
		googleInnerDiv.style.background = '#FFF';
		googleDiv.appendChild(googleInnerDiv);
		
		googleResultDiv = document.createElement('div');

		var closeButtonDiv = document.createElement('div');
		closeButtonDiv.style.cssFloat = 'right';
		googleInnerDiv.appendChild(closeButtonDiv);
		googleInnerDiv.appendChild(googleResultDiv);

		var closeButton = document.createElement('a');
		closeButton.innerHTML = 'Hide';
		closeButton.setAttribute('href', '#contacts');
		closeButton.addEventListener('click', googleHideDiv, false);
		closeButtonDiv.appendChild(closeButton);
	}
	googleResultDiv.innerHTML = '';
	googleDiv.style.display = '';
}

function googleHandleResults() {
	googleShowDiv();
	logDebug('got numresults= '+resultQueue.length, googleDebug);
	
	//remove dups
	var results = new Array();
	for (var i = 0; i < resultQueue.length; i++) {
		if (resultQueue[i] != '')
			results.push(resultQueue[i]);
		for (var j = i + 1; j < resultQueue.length; j++) {
			if (resultQueue[i] == resultQueue[j]) {
				resultQueue[j] = '';
			}
		}
	}
	
	logDebug('got num unique results='+results.length, googleDebug);
	googleResultDiv.innerHTML = 'Found '+results.length+' results.';
	var numPerRow = 6;
	var table = document.createElement('table');
	googleResultDiv.appendChild(table);
	var row;
	for (var i = 0; i < results.length; i++) {
		logDebug('add image url= '+results[i], googleDebug);
		var thisImage = results[i];
		var handleFunc = function(evt) {
			logDebug('evt='+evt+' evt.target='+evt.target, googleDebug);
			googleSelectImage(evt.target.src);
		};

		if (i % numPerRow == 0) {
			row = document.createElement('tr');
			table.appendChild(row);
		}
		var cell = document.createElement('td');
		row.appendChild(cell);
		var img = document.createElement('img');
		img.addEventListener('click', handleFunc, false);
		img.src = results[i];
		cell.appendChild(img);
	}
}

//https://developer.mozilla.org/en/DOM/event.initKeyEvent
//http://www.w3.org/TR/2003/NOTE-DOM-Level-3-Events-20031107/events.html#Events-DocumentEvent-createEvent
function googleSelectImage(imageUrl) {
	googleHideDiv();
	logDebug('set image='+imageUrl, googleDebug);
	var urlInput = googlePictureUploadDocument.getElementById('mp_url_input');
	if (urlInput && imageUrl.length > 0) {
		var lastChar = imageUrl.charCodeAt(imageUrl.length-1);

		urlInput.setAttribute('value', imageUrl);
		var evt = googlePictureUploadDocument.createEvent("KeyboardEvent");

		
		evt.initKeyEvent('input', true, true, null, false, false, false, false, 0, 0);
		urlInput.focus();
		var canceled = !urlInput.wrappedJSObject.dispatchEvent(evt);
		logDebug('canceled='+canceled, googleDebug)
		
		//click the button when it shows up
		googleClickSelectButton = true;
	}
}
function googleHideDiv() {
	if (googleDiv)
		googleDiv.style.display = 'none';
}

//https://developer.mozilla.org/en/DOM/document.createEvent
function googleClickWebUrl() {
	if (googlePictureUploadDocument) {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var webLink = googlePictureUploadDocument.getElementById("mp_sourcePanel_8"); 
		if (webLink) {
			var canceled = !webLink.dispatchEvent(evt);
			return true;
		}
	}
	return false;
}

function googleClickSelectImageButton() {
	if (googlePictureUploadDocument) {
		var selectButton = googlePictureUploadDocument.getElementById("mp_select_button"); 
		if (selectButton && googleClickSelectButton) {
			googleClickSelectButton = false;
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window,
			0, 0, 0, 0, 0, false, false, false, false, 0, null);
			var canceled = !selectButton.dispatchEvent(evt);
			return true;
		}
	}
	return false;
}

function googleInjectLink() {
	var tables = googlePictureUploadDocument.getElementsByClassName('mp_sourcePanel');
	var table;
	if (tables && tables.length > 0)
		table = tables[0];
	logDebug('inject link, table='+table, googleDebug);

	if (table) {
		var rows = table.getElementsByTagName('tr');
		logDebug('numrows='+rows.length,googleDebug);
		if (rows && rows.length > 3) {
			var webRow = rows[3]; //Web Address (URL)
			var newRow = document.createElement('tr');
			var newCell = document.createElement('td');
			newCell.className = 'mp_unselected';
			newCell.style.display = 'block';
			newCell.innerHTML = 'Facebook Search';
			newRow.appendChild(newCell);
			webRow.parentNode.insertBefore(newRow, webRow.nextSibling);
			newCell.addEventListener('click', googleOnFacebookClick, false);
		}
	}
}
function googleOnFacebookClick(event) {
	googleGatherAndSearch();
	googleClickWebUrl();
}


//update the nodes we know about
function googleFindDocumentNodes(event) {
	var nodes;
	var contentDocument1, contentDocument2, contentDocument3;
	var node1, node2, node3; //poor implementation of closures
	var onLoadFunction;
	
	if (event && event.relatedNode && googleDebug) {
		logDebug('googleFindDocumentNodes id='+event.relatedNode.id, googleDebug);
	} else {
		logDebug('googleFindDocumentNodes', googleDebug);
	}

	//googleDocument
	if (!googleDocument) {
		node1 = document.getElementById('canvas_frame');
		if (node1) {
			logDebug('canvas_frame', googleDebug);
			contentDocument1 = node1.contentDocument;
			googleOnLoadCanvas = function (a_evt) {
				logDebug('googleOnLoadCanvas', googleDebug);
				googleRemoveEventListeners(contentDocument1);
				googleDocument = node1.contentDocument;
				googleOnIframeLoad(node1);
				googleFindDocumentNodes(false);
			};
			googleDocument = node1.contentDocument;
			googleAddEventListeners(contentDocument1);
			node1.addEventListener('load', googleOnLoadCanvas, false);
		}
	}
	if (!googleDocument) return;
	
	//googleSubDocument
	if (!googleSubDocument) {
		nodes = googleDocument.getElementsByTagName('iframe');
		if (nodes.length > 0) {
			logDebug('googleSubDocument', googleDebug);
			node2 = nodes[0];
			contentDocument2 = node2.contentDocument;
			googleOnLoadSubDoc = function (a_evt) {
				logDebug('googleOnLoadSubDoc', googleDebug);
				googleRemoveEventListeners(contentDocument2);
				googleSubDocument = node2.contentDocument;
				googleOnIframeLoad(node2);
				googleFindDocumentNodes(false);
			};
			googleSubDocument = node2.contentDocument;
			googleAddEventListeners(contentDocument2);
			node2.addEventListener('load', googleOnLoadSubDoc, false);
		}
	}
	if (!googleSubDocument) return;
	
	//googlePictureUploadDocument
	if (!googlePictureUploadDocument) {
		node3 = googleSubDocument.getElementById('photopicker.PhotoPicker-iframe');
		if (node3) {
			logDebug('photopicker.PhotoPicker-iframe', googleDebug);
			contentDocument3 = node3.contentDocument;
			googleOnLoadPictureFrame = function (a_evt) {
				logDebug('googleOnLoadPictureFrame', googleDebug);
				googleRemoveEventListeners(contentDocument3);
				googlePictureUploadDocument = node3.contentDocument;
				googleOnIframeLoad(node3);
				googleFindDocumentNodes(false);
			};
			googlePictureUploadDocument = node3.contentDocument;
			googleAddEventListeners(contentDocument3);
			node3.addEventListener('load', googleOnLoadPictureFrame, false);
			googleDebug('end pictureDocument', googleDebug);
		}
	}
	if (!googlePictureUploadDocument) return;
	
	var alreadyFound = googleFoundWebUrlBox && googleFoundWebButton;
	if (!alreadyFound) {
		//search for anything we are interested in
		if (!googleFoundWebUrlBox && googlePictureUploadDocument.getElementById('mp_url_input')) {
			googleFoundWebUrlBox = true;
			logDebug('Found url box',googleDebug);
		}

		if (!googleFoundWebButton && googlePictureUploadDocument.getElementById('mp_sourcePanel_8')) {
			googleFoundWebButton = true;
			logDebug('Found button', googleDebug);
		}
	}

	if (!alreadyFound && googleFoundWebButton && googleFoundWebUrlBox) {
		logDebug('injecting link', googleDebug);
		googleInjectLink();
	}
	
	if (alreadyFound && googleClickSelectButton) {
		googleClickSelectImageButton();
	}
}

function googleRemoveDocumentNodes(event) {
	var node, nodes;

	if (event && event.relatedNode) {
		logDebug('googleRemoveDocumentNodes id='+event.relatedNode.id, googleDebug);
	} else {
		logDebug('googleRemoveDocumentNodes', googleDebug);
	}
	//googlePictureUploadDocument
	if (googleSubDocument && googlePictureUploadDocument) {
		node = googleSubDocument.getElementById('photopicker.PhotoPicker-iframe');
		if (!node) {
			logDebug('remove picture', googleDebug);
			googlePictureUploadDocument.removeEventListener('load', googleOnLoadPictureFrame, false);
			googlePictureUploadDocument = false;
			googleFoundWebButton = googleFoundWebUrlBox = false;			
		}
	}
	
	if (googleDocument && googleSubDocument) {
		nodes = googleDocument.getElementsByTagName('iframe');
		if (nodes.length <= 0) {
			logDebug('remove sub doc');
			googleSubDocument.removeEventListener('load', googleOnLoadSubDocument, false);
			googleSubDocument = false;
		}
	}
	
	if (googleDocument) {
		node = document.getElementById('canvas_frame');
		if (!node) {
			logDebug('remove canvas_frame');
			googleDocument.removeEventListener('load', googleOnLoadCanvas, false);
			googleDocument = false;
		}
	}
}

function googleAddEventListeners(node) {
	logDebug('add listeners='+node, googleDebug);
	node.addEventListener('DOMNodeInserted', googleFindDocumentNodes, false);
	node.addEventListener('DOMAttrModified', googleFindDocumentNodes, false);
	node.addEventListener('DOMNodeRemoved', googleRemoveDocumentNodes, false);
}

function googleRemoveEventListeners(node) {
	logDebug('remove listeners='+node, googleDebug);
	node.removeEventListener('DOMNodeInserted', googleFindDocumentNodes, false);
	node.removeEventListener('DOMAttrModified', googleFindDocumentNodes, false);
	node.removeEventListener('DOMNodeRemoved', googleRemoveDocumentNodes, false);	
}

function googleOnIframeLoad(node) {
	if (node && node.contentDocument) {
		logDebug('googleOnIframeLoad id='+node.id, googleDebug);
		googleAddEventListeners(node.contentDocument);
	} else {
		logDebug('googleOnIframeLoad [NULL NODE]', googleDebug);
	}
}


//check for updates ;-)
// Checks for script updates
if (Date.now() - scriptLastCheck >= (86400000 * 2)) { // 2 days
	// At least a day has passed since the last check. Sends a request to check for a new script version
	GM_setValue("scriptLastCheck", Date.now().toString());
	scriptCheckVersion();
}
else {
	// If a new version was previously detected the notice will be shown to the user
	// This is to prevent that the notice will only be shown once a day (when an update check is scheduled)
	if (scriptLastRemoteVersion != scriptVersion) { //support for rollbacks
		scriptShowUpdateMessage(true, scriptLastRemoteVersion);
	}
}


//run the app
googleAddEventListeners(document);
googleFindDocumentNodes();