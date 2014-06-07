// URL Shortener
//
// Copyright 2008 Glendon Solsberry
// Released under the Apache license 
// http://www.apache.org/licenses/LICENSE-2.0
//
// ==UserScript==
// @name			URL Shortener
// @namespace			http://www.dp.cx/userscripts/
// @description			Submit any page to a url shortening service
// @version			1.1
// @date			2008-12-12
// @include			*
// @exclude			http://www.google.com/reader/*
// ==/UserScript==

var version_scriptNum = 22029; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1229119690067; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.

var services = {
	"None" : { },
	"TinyURL" : {
		"url" : 'http://tinyurl.com/create.php?url='+location.href,
		"regexp" : '(http:\/\/tinyurl.com\/[a-z0-9]+)',
	},
	"ln-s.net" : {
		"url" : 'http://ln-s.net/home/api.jsp?url='+encodeURIComponent(location.href),
		"regexp" : '(http:\/\/ln-s.net\/[$+-:_A-Za-z0-9]+)',
	},
	"MetaMark.net" : {
		"url" : 'http://metamark.net/api/rest/simple?long_url='+encodeURIComponent(location.href),
		"regexp" : '(http:\/\/xrl.us/.*)',
	},
	"lnk.nu" : {
		"url" : 'http://minilink.org/?url='+encodeURIComponent(location.href)+'&xml=1',
		"regexp" : '<minilink>(http:\/\/.*?)<\/minilink>',
	},
	"twirl.at" : {
		"url" : 'http://twirl.at/api.php?url='+encodeURIComponent(location.href),
		"regexp" : '(http:\/\/twirl.at\/[A-Za-z0-9]+)',
	},
};

function getshortlink() {
	var url = services[GM_getValue("service", "None")]["url"];
	var regexp = services[GM_getValue("service", "None")]["regexp"];
	
	if (!url || !regexp) { alert("Failure!"); return false; }
	if (!requestInProgress) {
		requestInProgress = true;
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function(response) {
				if (response.status == 200) {
					if (linkhref = response.responseText.match(regexp)) {
						if (linkhref.length > 1) {
							setclip(linkhref[linkhref.length-1]);
						} else {
							setclip(linkhref[0]);
						}
					}
					requestInProgress = false;
				} else {
					reportError(response);
					requestInProgress = false;
				}
			},
			onerror: function(response) {
				reportError(response);
				requestInProgress = false;
			}
		});
	}
}

// Reports an error to the user.
function reportError(response) {
	GM_log('Error: ' + response.responseText);
	window.status = "Error with action: " + response.responseText;
}

function setclip(text) {
	// you have to sign the code to enable this, or see notes below
	try {
		unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
		var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		str.data= text;

		// make transferable
		var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
		if (!trans) return;

		// specify data type; TEXT
		trans.addDataFlavor('text/unicode');
		trans.setTransferData("text/unicode",str,text.length*2);

		// make interface clipboard
		var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
		if (!clip) return;
		var clipid=Components.interfaces.nsIClipboard;
		clip.setData(trans,null,clipid.kGlobalClipboard);
		unsafeWindow.status("URL successfully shortened.  It's in your clipboard!");
	} catch (e) {
		var show_prompt = GM_getValue("show_prompt", 1);
		if (show_prompt) {
			var prompt_res = prompt("Here is your link.\nIf you would like this to be automatically copied in the future, visit 'about:config' the address bar.  Search for 'signed.applets.codebase_principal_support' and set its value to true.\n\nIf you would not like to see this text any more, simply type a '0' (zero) in this box, and press OK.  You'll be alerted instead of prompted.", text);
			if (prompt_res == 0) { GM_setValue("show_prompt", 0); }
		} else {
			alert(location.href + "\n\nhas been shortened to\n\n" + text);
		}
	}
}


// this allows us to only send one request at a time.
// multiple keypresses will not send more than once
var requestInProgress = false;

document.addEventListener('keypress', function(event) {

	if (!event.shiftKey) { return false; }
	if (event.ctrlKey || event.metaKey || event.altKey) { return false; }
	if (event.target.type && (event.target.tagName.match(/text|input|select/i))) { return false; }

	var e = event.target;
	if (e.tagName.toLowerCase() == 'html') {
		e = frameElement; // have to step out of iframes
		while (e && e.parentNode) {
			if ((e.id && e.id.match(/mceEditor|wys/i) || (e.className && e.className.match(/mceEditor|wys/i)))) { return false; break; }
			e = e.parentNode;
		}
	}

	// Shift+T

	if (event.charCode == 84) {

		event.preventDefault();
		getshortlink();

	}

}, false);

function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} updateCheck(false);

function editPref() {
	var div = document.createElement('div');
	div.className = 'gm-pref';
	var css = ".gm-pref {display: none; position: absolute; z-index: 99; left: 200px; top: 200px; overflow: visible; background-color: white; border: 1px solid green; padding: 10px; min-width: 200px; min-height: 100px}";
	GM_addStyle(css);

	/* Setting title */
	div.innerHTML = '<h2>Script Preferences</h2>';

	/* Rule */
	var rule = document.createElement('hr');
	rule.id = 'gm-rule';
	div.appendChild(rule);

	/* Building form */
	var form = document.createElement('form');
	form.action = '';
	form.method = '';
	form.id = 'gm-pref';

	div2 = document.createElement('div');
	div2.innerHTML = '<label for="servicelist">Service to use: </label>';
	var select = document.createElement('select');
	var option = '';
	select.id = 'servicelist';
	for (service in services) {
		option += '<option value="'+service+'"';
		if (service == GM_getValue("service", "None")) { option += ' selected'; }
		option += '>'+service+'</option>';
	}
	select.innerHTML = option;
	div2.appendChild(select);
	form.appendChild(div2);
	div.appendChild(form);

	/* Submit button */
	button = document.createElement('button');
	button.type = 'button';
	button.id = 'pref_submit';
	button.innerHTML = "Update preferences";
	form.appendChild(button);
	document.getElementsByTagName('body')[0].appendChild(div);

	div.style.display = 'block';
	div.scrollIntoView(false);

	/* Add event listener */
	button.addEventListener('click', eventListener(), true);
	form.addEventListener('submit', eventListener(), true);
}

function eventListener() {
	var prefs = this;
	return function(ev) {
		var reload = false;
		// Prevent submitting the form to the server
		ev.preventDefault();
		// Execute all handlers
		GM_setValue("service", document.getElementById('servicelist').value);
		location.reload();
	}
}

GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); 
GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Edit Preferences", function() {editPref();}); 
