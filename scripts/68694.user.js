// ==UserScript==
// @name           Pardus AP Alert
// @namespace      pardus.at
// @description    Displays an alert box when your APs drop below 750
// @include        http://*.pardus.at/*
// @exclude		   http://*.pardus.at/msgframe.php*
// @author         Rhindon
// @version        1.0
// ==/UserScript==

// ////////////////////////////////////////////////////////////////////////
// Set Cookie and Script Names
// ////////////////////////////////////////////////////////////////////////

var cookieName = "PrevAPAmount";
var scriptName = "Pardus AP Alert";

// ////////////////////////////////////////////////////////////////////////
// Imported -- Rhindon's Standard Cookie Code 
//          -- Stores GreaseMonkey Values instead of actual Cookies
// ////////////////////////////////////////////////////////////////////////

var Preferences = new Array();

var main_frame = top.window.frames[2];
var msg_frame  = top.window.frames[1];
var nav_frame  = top.window.frames[0];

var myframe = window.name;
var myurl = main_frame.document.URL;

function createCookie(name,value) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	GM_setValue(subdomain + '-' + name,value);

}

function readCookie(name) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	try {
		var temp = GM_getValue(subdomain + '-' + name);
		if(temp != '~~~DELETED~~~') return temp;
		return null;
       	} catch(err) {
       		return null;
	}
}

function eraseCookie(name) {
	createCookie(name,"~~~DELETED~~~");
}


function Preference(name, value, inputType, scriptName, description) {
	this.name = name;
	this.value = value;
	this.type = inputType;
	this.description = description;
	this.scriptName = scriptName;
	
	this.getHtmlTableRow = function() {
		html  = "<tr><th>" + this.name + "</th><td><input type='" + this.type + "' id='" + this.name + "_" + this.scriptName + "' ";
		html += (this.type.toUpperCase() == "CHECKBOX" && this.value == true ? "CHECKED='CHECKED' " : "");
		html += "value='" + this.value + "'></td>"
		html += "<td>" + (this.description ? this.description : "&nbsp;") + "</td>";
		html += "</tr>";
		
		return html;
	}
}


function addPreference(name, defaultValue, inputType, scriptName, description) {

	var value = readCookie("pref." + name);
	var desc = readCookie("pref." + name + ".description");
	
	if(!value) value = defaultValue;
	if(!desc) desc = description;

	p = new Preference(name, value, inputType, scriptName, desc);
	
	Preferences.push(p);
}

function addPreferenceDisplay(scriptName) {

	var prefHtml = "";

	for(var i = 0; i < Preferences.length; i++) {
		prefHtml += Preferences[i].getHtmlTableRow();
	}

	var div = document.createElement("div");
	div.innerHTML = "<table id='gm_preferences_" + scriptName + "' style='width: 100%; border-bottom: ridge 3px gray; display: none;"
					+ "background-color: #303030; z-index: 5; position: absolute; top: 0; left: 0;'>"
					+ (scriptName ? "<tr><td colspan='3' style='border-bottom: solid 1px black; text-align: center; '><h2>" 
						+ scriptName + " Preferences</h2></td></tr>" : "")
					+ prefHtml 
					+ "<tr><td colspan='3' style='text-align: center; border-top: solid 1px black;'>"
					+ "<button id='saveGmPrefs_" + scriptName + "'>Save Preferences</button>&nbsp;&nbsp;&nbsp;"
					+ "<button id='cancelGmPrefs_" + scriptName + "'>Cancel</button>"
					+ "</td></tr></table>";
	
	var body = main_frame.document.body;
	
	if(body) {

		body.insertBefore(div, body.firstChild);

		saveButton = document.getElementById("saveGmPrefs_" + scriptName);
		cancelButton = document.getElementById("cancelGmPrefs_" + scriptName);

		saveButton.addEventListener("click", function() {

												preftable = main_frame.document.getElementById('gm_preferences_' + scriptName);

												if(preftable) {
													for(var i = 0; i < Preferences.length; i++) {

														var p = Preferences[i];
														var field = document.getElementById(p.name + "_" + scriptName);
														
														if(field) {

															if(field.type.toUpperCase() == "CHECKBOX") {
																createCookie("pref." + p.name, field.checked);
															} else {
																createCookie("pref." + p.name, field.value);
															}		
														}

													}

													preftable.style.display="none";
													
													alert("Preferences Saved!");

												}
											}
										, true);
		cancelButton.addEventListener("click", function() {
												var preftable = main_frame.document.getElementById('gm_preferences_' + scriptName);
												if(preftable) {
													preftable.style.display = "none";
												}
											 }, true);

	}
	
}

function getPreferenceByName(name) {

	if(!Preferences) return null;

	for(var i = 0; i < Preferences.length; i++) {
		if(Preferences[i].name == name) {
			return Preferences[i];
		}
	}
	
	return null;
}

GM_registerMenuCommand((scriptName ? scriptName + " / " : "") + "Change Preferences", 
					function() {
						if(main_frame.document.getElementById('gm_preferences_' + scriptName)) {
							main_frame.document.getElementById('gm_preferences_' + scriptName).style.display = "";
						}
					});


// ////////////////////////////////////////////////////////////////////////
// End imported code
// ////////////////////////////////////////////////////////////////////////




// ////////////////////////////////////////////////////////////////////////
// Set Up Preferences
// ////////////////////////////////////////////////////////////////////////

addPreference("warningThreshold", 750, "text", scriptName);
addPreference("displayWarningOnlyOnce", true, "checkbox", scriptName, "Set to false to display the error every time a page is loaded if you're under the threshold. Otherwise, it'll only show the first time your APs drop below the threshold.  If your APs rise above the threshold and then drop below again, you'll see another message.");

if(myurl.indexOf("main.php") >= 0) {
	addPreferenceDisplay(scriptName);
}

var warningThreshold = parseInt(getPreferenceByName("warningThreshold").value);
var displayWarningOnlyOnce = getPreferenceByName("displayWarningOnlyOnce").value;

// ////////////////////////////////////////////////////////////////////////
// Beginning of Code
// ////////////////////////////////////////////////////////////////////////


if(myurl.indexOf("main.php") >= 0) {
	addPreferenceDisplay(scriptName);
}

function getAPs() {
	
	var APs = -5000;
	
	if(document.getElementById("apsleft")) {
	
		APs = document.getElementById("apsleft").innerHTML;
		APs = APs.replace('<font color="red">', '').replace('</font>', '');
//		alert("Found 1");
		
	} else {	
		bs = document.getElementsByTagName("b");

		for(var i = 0; i < bs.length; i++) {

			if(bs[i].innerHTML.substr(0, 9) == "Your APs:") {
				APs = bs[i].innerHTML.substr(10);
//				alert("Found 2");
			}
		}
	}

	return parseInt(APs);

	if(APs == -5000) {
	
		APs = readCookie(cookieName);
	
	} else {
	
		createCookie(cookieName, APs);
	
	}
	
//	alert("inside APs: " + APs);
	
	
	
}


function APAlertInit() {

	var APs = getAPs();

//	alert("APs: " + APs);

	if(APs == -5000) return;

	var prevAmt = readCookie(cookieName);
	
//	alert(APs + "\n" + warningThreshold + "\n" + prevAmt);
	
	if(displayWarningOnlyOnce && prevAmt && parseInt(prevAmt) < warningThreshold) {
		createCookie(cookieName, APs);
		return;
	}
	
	createCookie(cookieName, String(APs));
	
	if(APs < warningThreshold) {
	  alert("Warning!  You're running low on APs!");
	}

}


APAlertInit();