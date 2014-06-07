// ==UserScript==
// @name           NERDZ Message Saver
// @namespace      tag: nerdz,message,saver
// @description    Saves NERDZ message in the localstorage/cookies, to avoid losing when the floodcheck of NERDZ is triggered.
// @include        http://www.nerdz.eu/*
// ==/UserScript==

// VERSION : 1.1.1
// Changelog
/*
 * Version 1.1.1 - minor release
 * @ released on 07/12/11
 * - Graphic fixes and version display
 * Version 1.1
 * @ released on 07/12/11
 * - Fixed the problems with Chrome (even in projects)
 * - Fixed the double "Msg. History" button in user's profile
 * - Fixed the regexes in func.js (remote file, no change here)
 * - Fixed some urldecoding issues in the GUI
 * - Fixed timestamps displaying one-digit numbers (ex. 0:2:3 instead of 00:02:03)
 * Version 1.0
 * - Initial release
 */

var interval;
var lazyness;
var executed = 0;
var busy = 0;

// the content of the following function is executed
// in NERDZ page, so we can use window and other shit
function ProInjector (qval, mcval, formId)
{
	if (typeof (CookiesHelper) !== "object")
	{
		alert ("There was an error while posting: we can't find CookiesHelper object, please try to post again when the page is fully loaded");
		return;
	}
	this.message = document.getElementById (formId);
	writeMsg (this.message.value, getUserFromUrl (true)); // functions defined in func.js
	eval (qval);
	this.message.value = "";
	eval (mcval);
	// tip: now the form is refreshed, so we need to handle the forms with findForms() again :o
	// the best way to do this is to set something like a div with an id like page_refreshed
	// an interval of the greasemonkey script will check for this div every tot seconds
	// and it will handle forms correctly when it finds that id.
	// then removes that div
	// let's do this
	// * fix 06/12/11@23.49
	// * we don't need to refresh the div
	// * when we are in an user's profile
	// * so exclude the profiles from the refreshing.
	if (!document.location.href.match (/\.$/) && !document.location.href.match (/\.\d+(\#c\d+)?$/))
	{
		// prepare div
		var tehdiv = document.createElement ("div");
		tehdiv.style.display = "none";
		tehdiv.id            = "form_refreshed";
		// push div to the body
		document.body.appendChild (tehdiv);
		// now we just wait for the interval
	}
}

function sHH_Injector()
{
	// executed in the page
	// get random messagesbox id
	var _id = "msgbox_" + Math.floor (Math.random() * 999999);
	// prepare HTML to display
	var html = "<h3 style='line-height:0 !important;'>NERDZ Message History</h3>\n";
	html    += "<h3 style='font-size:17px !important;line-height:15px;'><em>by <span style='color:#ff5544'>Robertof</span></em><br /><em style='font-size:14px;'>script version: <span style='color:#ff5544'>1.1.1</span>, <a href='http://userscripts.org/scripts/show/119824'>info &amp; changelog</a></h3>\n";
	html    += "<p>\n";
	if (isNMSDisabled()) // see func.js
		html+= "<a href='javascript:' style='color:#6187ff !important;' onclick='this.innerHTML = this.innerHTML.replace ( (isNMSDisabled() ? \"Enable\" : \"Disable\" ) , (isNMSDisabled() ? \"Disable\" : \"Enable\" )  );toggleNMS();'>Enable NERDZ Message History</a>";
	else
		html+= "<a href='javascript:' style='color:#6187ff !important;' onclick='this.innerHTML = this.innerHTML.replace ( (isNMSDisabled() ? \"Enable\" : \"Disable\" ) , (isNMSDisabled() ? \"Disable\" : \"Enable\" )  );toggleNMS();'>Disable NERDZ Message History</a>";
	html    += "&nbsp;&#124;&nbsp;<a href='javascript:' style='color:#6187ff !important;' onclick='purgeMessages();document.getElementById(\"" + _id + "\").innerHTML=\"None\";'>Purge all messages</a>\n";
	html    += "<div id='" + _id + "' style='word-wrap: break-word'>\n";
	var messages = getMessages();
	String.prototype.escapeChars = function ()
	{
		return this.replace (/</g, "&lt;").replace (/>/g, "&gt;");
	}
	if (!messages || messages.length < 1)
	{
		html += "None\n";
	}
	else
	{
		// log timestamps
		var timestamps = [];
		var _idtable   = {};
		for (var j = 0; j < messages.length; j++)
		{
			timestamps.push ( messages[j][3] );
			_idtable [messages[j][3]] = j;
		}
		// sort timestamps (descending order)
		timestamps.sort (function (a, b) { return (b - a); });
		// output
		for (var i = 0; i < timestamps.length; i++)
		{
			var msg = messages[_idtable[timestamps[i]]][0];
			var realid = _idtable[timestamps[i]];
			html += "<div id='msg_container" + realid + "'>Posted " + 
			        utf8_decode (unescape (messages[realid][1].escapeChars()).replace (/\+/g, " ")) +
			        " on " + messages[realid][2] +
			        " <sup>[<a href='javascript:' onclick='deleteMs" +
			        "g("+realid+");document.getElementById(\"" + _id + "\")" +
			        ".removeChild (document.getElementById(\"msg_container" +
			        realid + "\"))'>delete</a>]</sup><br /><span id='msg_content" +
			        realid + "'>" + msg.substr (0, 255).escapeChars() + 
			        ((msg.length > 255 || msg.indexOf ("\n") !== -1)
			        ? 
			          "<a href='javascript:' onclick='document.getElementById(\"msg_content"+
			          realid+"\").innerHTML=(getMsgContent("+
			          realid+"))[0].escapeChars().replace(/\\n/g, \"<br />\")." +
			          "replace(/\\t/g, \"&nbsp;&nbsp;&nbsp;&nbsp;\");' " +
			          "style='color:#6187ff !important;'>...</a>" 
			        : 
			          "")
			        + "</span>" + ((i != (timestamps.length - 1)) ? "<hr />" : "") + "</div>\n";
		}
	}
	html    += "</div>";
	html    += "</p>\n";
	
	// display
	$.modal (html);
}

function showHideHistory()
{
	// pass-through for the second injector
	var script = document.createElement ("script");
	script.appendChild (document.createTextNode ("(" + sHH_Injector + ")();"));
	(document.body || document.head || document.documentElement).appendChild (script);
}

function onSubmit (event, onSub, isProject)
{
	event.preventDefault(); // trick to prevent form submit-ing
	var textareas = event.target.getElementsByTagName ("textarea");
	if (textareas.length > 1)
	{
		alert ("Something went terribly wrong (textareas count > 1)");
		return 0;
	}
	var textarea = textareas[0];
	textarea.id = gimmerandomstring (10);
	// get query() and mainContent() values
	var _qValues = /query\([^;]+;/.exec (onSub);
	if (!_qValues) { alert ("no query func"); return; }
	var qval = _qValues[0];
	
	var _mValues;
	//   setTimeout('query(\'/pages/profile/refresh.php?id=1136&limit=10\',false,\'board\',L)',500); return false;
	//   setTimeout('query(\'/pages/profile/refresh.php?id=1136&limit=10\',false,\'board\',L)',500); return false;
	//alert (onSub);
	if (!isProject && document.location.href.indexOf ("home.php") !== -1)
		_mValues = /setTimeout\([^;]+;',\d+\)/.exec (onSub);
	else
		_mValues = /setTimeout\([^;]+;/.exec (onSub);
	//alert (_mValues);
	if (!_mValues) { alert ("no mc func"); return; }
	var mcval = _mValues[0];
	// inject script (thx 2 Max Shawabkek && nice alert authors for the method)
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ ProInjector +')("' + qval.replace (/\\/g, "\\\\") + '", "' + mcval.replace (/\\/g, "\\\\") + '","' + textarea.id + '");'));
	(document.body || document.head || document.documentElement).appendChild(script);
}

function doBadThings (formcontainer)
{
	// kill timer
	clearInterval (interval);
	executed = 0;
	var forms = formcontainer.getElementsByTagName ("form");
	if (forms.length > 1)
	{
		alert ("Something went terribly wrong (formcount > 1)");
		return 0;
	}
	var form = forms[0];
	// create new button
	// we need different procedures because chrome is gay
	// Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.121 Safari/535.2
	if (navigator.userAgent.indexOf ("WebKit") !== -1)
	{
		// for chrome and webkit based browsers, manually insert HTML
		var rnd = gimmerandomstring (3);
		form.innerHTML += "<input type='button' style='float:right;margin-right:"+( ( document.location.href.indexOf ("home.php") !== -1 ) ? "-4px" : "-1px" )+";' value='Msg. History' id='msghst"+rnd+"'/>";
		document.getElementById("msghst" + rnd).addEventListener ("click", showHideHistory, false);
	}
	else
	{
		var button = document.createElement ("input");
		button.setAttribute ("type", "button");
		button.style.cssFloat = "right";
		button.style.marginRight = ( ( document.location.href.indexOf ("home.php") !== -1 ) ? "-4px" : "-1px" );
		button.setAttribute ("value", "Msg. History");
		button.addEventListener ("click", showHideHistory, false);
		form.appendChild (button);
	}
	// set onsubmit
	var saveTheChildren = form.getAttribute ("onsubmit");
	form.removeAttribute ("onsubmit");
	form.addEventListener ("submit", function (e) { onSubmit (e, saveTheChildren, 0); }, false);
}

function doBadThingsForProjects (formElements)
{
	// kill timer
	clearInterval (interval);
	executed = 0;
	var form = formElements[0];
	// create new button
	// we need different procedures because chrome is gay
	// Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.121 Safari/535.2
	if (navigator.userAgent.indexOf ("WebKit") !== -1)
	{
		// for chrome and webkit based browsers, manually insert HTML
		var rnd = gimmerandomstring (3);
		form.innerHTML += "<input type='button' style='float:right;margin-right:1px;' value='Msg. History' id='msghst"+rnd+"'/>";
		document.getElementById("msghst" + rnd).addEventListener ("click", showHideHistory, false);
	}
	else
	{
		var button = document.createElement ("input");
		button.setAttribute ("type", "button");
		button.style.cssFloat = "right";
		button.style.marginRight = "1px";
		button.setAttribute ("value", "Msg. History");
		button.addEventListener ("click", showHideHistory, false);
		form.appendChild (button);
	}
	var saveTheChildren = form.getAttribute ("onsubmit");
	form.removeAttribute ("onsubmit");
	form.addEventListener ("submit", function (e) { onSubmit (e, saveTheChildren, 1); }, false);
}

function gimmerandomstring ( length )
{
	var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split ("");
	var str = "";
	for (var i = 0; i < length; i++)
	{
		str += letters[Math.floor (Math.random() * letters.length)];
	}
	return str;
}

function findForms()
{
	// matches: profile || post || homepage
	// also matches the projects
	if (document.location.href.match (/\.$/) || document.location.href.match (/\.\d+(\#c\d+)?$/) || document.location.href.indexOf ("home.php") !== -1)
	{
		interval = setInterval (function() {
			if (executed) { /* wait for the timer to be killed */ return; }
			lazyness = document.getElementById ("stdform");
			if (lazyness)
			{
				executed = 1;
				doBadThings (lazyness);	
			}
		}, 1000);
	}
	else if (document.location.href.match (/:\d+(\#c\d+)?$/) || document.location.href.match (/:$/))
	{
		interval = setInterval (function() {
			if (executed) { return; }
			if (document.getElementById ("content"))
			{
				lazyness = document.getElementById ("content").getElementsByTagName ("form");
				if (lazyness.length >= 1 && lazyness[0].getAttribute ("onsubmit").indexOf ("board.ajax.action.php") !== -1)
				{
					executed = 1;
					doBadThingsForProjects (lazyness);
				}
			}
		}, 1000);
	}
}

/* simplemodal shit (csses and scripts) && funcs */
var ohyeahappendme = document.createElement ("link");
ohyeahappendme.setAttribute ("type", "text/css");
ohyeahappendme.setAttribute ("href", "http://robertof.mooo.com/~robertof/downloads/nerdz/css.css");
ohyeahappendme.setAttribute ("rel", "stylesheet");
ohyeahappendme.setAttribute ("media", "screen");
(document.body || document.head || document.documentElement).appendChild(ohyeahappendme);
ohyeahappendme = document.createElement('script');
ohyeahappendme.setAttribute ("src", "http://robertof.mooo.com/~robertof/downloads/nerdz/simplemodal1.4.1.js");
(document.body || document.head || document.documentElement).appendChild(ohyeahappendme);
ohyeahappendme = document.createElement ("script");
ohyeahappendme.setAttribute ("src", "http://robertof.mooo.com/~robertof/downloads/nerdz/func.js");
//ohyeahappendme.setAttribute ("src", "http://localhost/func.js");
(document.body || document.head || document.documentElement).appendChild(ohyeahappendme);

findForms();

// interval which checks if the form is refreshed (see line 27-33)
setInterval (function() {
	if (busy) return;
	busy = 1; // interval busy
	// check if we find the div
	var div = document.getElementById ("form_refreshed");
	if ( div )
	{
		// found the div :o
		// let's run findForms() again and remove the div
		document.body.removeChild (div);
		findForms();
	}
	busy = 0; // interval no more busy
}, 1000); // iterates every second
