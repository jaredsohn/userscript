// Gmail: Random Signature
// version 0.4 BETA
// 2006-04-26
// Copyright (c) 2005-2006, Robson Braga Araujo
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Gmail: Random Signature", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Gmail: Random Signature
// @namespace     http://valfenda.cjb.net/~robson/userscripts
// @description   Insert a random tagline at the end of your email sent through gmail.
// @include       http://gmail.google.com/*
// @include       https://gmail.google.com/*
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @author        Robson Braga Araujo (robsonbraga at gmail dot com)
//
/////////////////////////////////////////////////////////////
//
// 26 April     2006
// - Fix finding username in new gmail layout
// 22 March     2006
// - Only add newline if we have both parts of the signature.
// 09 March     2006
// - Workaround for bug in Firefox 1.5.0.1. A break inside the for caused
//   Firefox to crash.
// - New Gmail layout may put the username in a different tag.
// - Make it faster when loading Gmail.
// 23 January   2006
// - Updated to work with new version of Gmail.
// 09 December  2005
// - Updated to work with new Greasemonkey for Firefox 1.5.
// 15 September 2005
// - Make the configuration per username, so that everybody can have their own
//   signature and taglines.
// - TODO: Store configuration on server.
// 13 September 2005
// - No ugly editing anymore. The script adds a box to your preferences so you
//   can edit your taglines and signature.
// 12 September 2005
// - Removed lots of unnecessary stuff.
// - Corrected a bug where the sig wouldn't change if you clicked in 
//   "Compose Mail".
// 11 September 2005
// - First Release: must edit the tagline array in the script.
//
// ==/UserScript==

(function(){

var username;
init();

var UpdateGmailVariable = null;
 
function init()
{
	// Get the current username to retrieve the correct preferences
	username = getUsername();
	if (username && username == "") return;

	// For some reason, the Gmail data function (top.js.P) now invalidates the page. I couldn't understand
	// why, so I'll just find the function that updates the variables and use that.
	var js = unsafeWindow.top.document.getElementsByName('js')[0].contentWindow;
	if (js.wrappedJSObject) js = js.wrappedJSObject;
	for (var propName in js) {
		var propValue = js[propName];
    
		if (typeof(propValue) != "function") {
			continue;
		}
    
		var functionBody = propValue.toString();

		// This if is just for performance reasons
		if (functionBody.indexOf('a[b][0]') != -1) {
			// This is to make sure we have the right function
			if (functionBody.match(/\w\[\w\[\w\]\[\w\]\]\s*=\s*\w\[\w\]\[\w\]/)) {
				UpdateGmailVariable = propValue;
				// TODO This break makes Firefox 1.5.0.1 crash
				//break;
			}
		}
	}

	// Edit the preference to allow the user to change her taglines
	var sig_input = document.getElementById('sx_sg_1val');
	if (sig_input)
	{
		// Gmail may think it has a signature because we are using just a tagline
		var enabled = GM_getValue(username + ".enabled");
		if (typeof enabled != 'undefined' && !enabled)
		{
			document.getElementById("sx_sg_0").checked = true;
		}
		var signature = GM_getValue(username + ".signature", sig_input.value);
		var taglines = GM_getValue(username + ".taglines", "Dummy tagline 1\n%\nDummy tagline 2\n%\nTwo line\ndummy tagline\n");
		var tag_enabled = GM_getValue(username + ".tag_enabled", false);

		sig_input.value = signature;

		var html;

		// Add the radio buttons to select whether the user wants the tagline
		// We use the _PR_OnPrefStringRadio and _PR_OnPrefStringKeyUp defined by the
		// GMail API to control if Save Changes button is enabled
		html = '<td valign="top"><input type="radio" value="0" id="signature_tagline_0" name="signature_tagline" onClick="top.js._PR_OnPrefStringRadio(window, this);" ' + (tag_enabled ? '' : 'checked') + '></td><td class="s" style="padding-top: 2px"><b>No taglines</b></td>';
		addHTML(document.getElementById("sx_sg_0").parentNode.parentNode, html);

		html = '<td valign="top"><input type="radio" value="1" id="signature_tagline_1" name="signature_tagline" onClick="top.js._PR_OnPrefStringRadio(window, this);" ' + (tag_enabled ? 'checked' : '') + '></td>';
		html += '<td class="s"><textarea id="signature_tagline_1val" name="signature_tagline_input" cols="40" rows="3" wrap="off" onkeyup="top.js._PR_OnPrefStringKeyUp(this, event);">' + taglines + '</textarea></td>';
		addHTML(document.getElementById("sx_sg_1").parentNode.parentNode, html);

		document.getElementById("sx_sg_0").parentNode.parentNode.parentNode.appendChild(document.getElementById("sx_sg_1").parentNode.parentNode);

		// Redefine the onclick for the Save Changes button so that we can store the
		// values selected by the user
		var button = document.getElementById('ps');
		button_onclick = function(){
			GM_setValue(username + ".enabled", document.getElementById("sx_sg_1").checked);
			GM_setValue(username + ".signature", sig_input.value);
			GM_setValue(username + ".tag_enabled", document.getElementById("signature_tagline_1").checked);
			GM_setValue(username + ".taglines", document.getElementById("signature_tagline_1val").value);

			// Mask the value of the taglines text because it can be too big
			// and gmail will complain about the size of the url parameters
			var radio = document.getElementById("signature_tagline_0");
			var old_check = radio.checked;
			radio.checked = true;
			top.js._PR_OnPrefStringRadio(window, radio);
			if (!old_check) document.getElementById("signature_tagline_1").checked = true;

			var textarea = document.getElementById("signature_tagline_1val");
			old_text = textarea.value;
			textarea.value = "";
			top.js._PR_OnPrefStringKeyUp(textarea, null);
			textarea.value = old_text;

			return false;
		};
		button.addEventListener('click', button_onclick, true);
	}

	changeSignature();
}

function getUsername()
{
	user_tag = document.getElementById('prf_g').parentNode.childNodes[0];
	return user_tag.data ? user_tag.data : user_tag.childNodes[0].data;
}

// function copied from http://www.faqts.com/knowledge_base/view.phtml/aid/11698
function addHTML (ele, html) {
	if (document.all)
		ele.insertAdjacentHTML('beforeEnd', html);
	else if (document.createRange) {
		var range = document.createRange();
		range.setStartAfter(ele.lastChild);
		var docFrag = range.createContextualFragment(html);
		ele.appendChild(docFrag);
	}
	else if (document.layers) {
		var l = new Layer(window.innerWidth);
		l.document.open();
		l.document.write(html);
		l.document.close();
		l.top = document.height;
		document.height += l.document.height;
		l.visibility = 'show';
	}
}

function changeSignature()
{
	var enabled = GM_getValue(username + ".enabled", false);
	var static_part = enabled ? GM_getValue(username + ".signature", "") : "";

	var tag_enabled = GM_getValue(username + ".tag_enabled", false);
	var dynamic_part = "";
	if (tag_enabled)
	{
		var taglines = GM_getValue(username + ".taglines", "");
		var tagline_array = taglines.split('\n%\n');
		dynamic_part = tagline_array[Math.floor(Math.random()*tagline_array.length)];
	}

	if (UpdateGmailVariable && (enabled || tag_enabled))
		UpdateGmailVariable(['p', ['sx_sg', static_part + (enabled ? "\n" : "") + dynamic_part]]);
}

})();




