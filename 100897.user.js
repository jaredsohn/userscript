// ==UserScript==
// @name           MY-Eve
// @namespace      OccamsPineapple
// @include        https://forums.eveonline.com/*
// @include        https://gate.eveonline.com/*
// ==/UserScript==

var embeddedSettings = false;
var configPannel = null;

/**********************************
Helper functions
***********************************/
function $(id) {
	return document.getElementById(id);
}

// Gets the value of the checked radio input in the passed radio named group
// Returns null if the name isn't found in the document
function getRadioValue(radioName) {
	var rValue = null, rInputs = document.getElementsByName(String(radioName));
	for (var i = 0; i < rInputs.length; i++) {
		if (rInputs[i].checked) {
			rValue = rInputs[i].value;
			break;
		}
	}
	return rValue;
}

//add style tag to the page head
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function URLDecode(myurl) {
   // Replace + with ' '
   // Replace %xx with equivalent character
   // Put [ERROR] in output if %xx is invalid.
   var HEXCHARS = "0123456789ABCDEFabcdef"; 
   var encoded = myurl;//document.URLForm.F2.value;
   var plaintext = "";
   var i = 0;
   while (i < encoded.length) {
       var ch = encoded.charAt(i);
	   if (ch == "+") {
	       plaintext += " ";
		   i++;
	   } else if (ch == "%") {
			if (i < (encoded.length-2) 
					&& HEXCHARS.indexOf(encoded.charAt(i+1)) != -1 
					&& HEXCHARS.indexOf(encoded.charAt(i+2)) != -1 ) {
				plaintext += unescape( encoded.substr(i,3) );
				i += 3;
			} else {
				alert( 'Bad escape combination near ...' + encoded.substr(i) );
				plaintext += "%[ERROR]";
				i++;
			}
		} else {
		   plaintext += ch;
		   i++;
		}
	} // while
   return plaintext;
}

function getDivsByClass(classString){
	var allDivs;
	allDivs = document.evaluate(
		"//div[@class='"+classString+"']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	return allDivs;	
}

function removeDivsByClass(classString){
	var allDivs, thisDiv;
	allDivs = getDivsByClass(classString);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		thisDiv.parentNode.removeChild(thisDiv);
	}
	
}
/**********************************
Main functions
***********************************/

function processPage(){

if(GM_getValue("ME_disableLinkWarning", true)) destupifyLinks();


var avatarStyle = "#yafpage_posts .userbox .avatar .avatarimage { width: 64px !important; height: 64px !important; }#yafpage_posts .userbox .avatar { width: 65px !important; height: 65px !important; }#yafpage_posts .userbox .avatar .badge { bottom: 3px !important; left: -50px !important; }#yafpage_posts .contactStandingContainer { left: 54px !important; top: 54px !important; }";
if(GM_getValue("ME_avatarSize", "default") === "small") addGlobalStyle(avatarStyle); 

if(GM_getValue("ME_avatarSize", "default") === "hidden") removeDivsByClass("avatar");

if(GM_getValue("ME_hideLikeButton", false) === true) removeDivsByClass("like-wrapper");

if(GM_getValue("ME_hideLikesRecieved", false) === true) {
	removeDivsByClass("like-count-wrapper");
	allDivs = getDivsByClass("section");
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		if((/^Likes received:/).test(thisDiv.innerHTML)) thisDiv.parentNode.removeChild(thisDiv);
	}
	
}

var hideNewTopicStyle = "#yafpage_posts #forum_ctl00_NewTopic1, #yafpage_posts #forum_ctl00_NewTopic2 { display: none !important; }";
if(GM_getValue("ME_hideNewPostButton", true)) addGlobalStyle(hideNewTopicStyle);

}

function destupifyLinks(){
	var allLinks, thisLink;
	allLinks = document.evaluate(
				 '//a[@href]',
				 document,
				 null,
				 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				 null);
	
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		if (thisLink.href.indexOf("https://forums.eveonline.com/default.aspx?g=warning") != -1)
		{
			var temp = thisLink.href.split("=",3)[2];
			var another = "" + temp.substr(0,temp.indexOf("&domain"));
			thisLink.href = URLDecode(another);
		}
	}
}

function ME_config() {
	
	//Check if the config pannel is already up because we're at the forum settings page, if it is we'll recreate it
	if(!(configPannel==null)){
		closeConfigPannel()
	} 
	
	configPannel = document.createElement("div");
	configPannel.setAttribute("id","ME_configPannel");
	configPannel.innerHTML = '' + 


	'<br>' +
	'<h2>MY-Eve Settings</h2>' +
	'<div style="border-bottom: 1px solid rgb(97, 97, 97); margin: 5px 0pt 19px;"></div>' +
	"<p style='font-weight: bold;'>Avatar size:</p>" +
	"<div style='margin-top: 10px;'>" +

	"<select id='ME_avatarSizeSetting' name='ME_avatarSizeSetting'>" + 
	"<option " + ((GM_getValue("ME_avatarSize", "default") === "default") ? " selected='selected'" : "") + " value='default'>Default</option>" +
	"<option " + ((GM_getValue("ME_avatarSize", "default") === "small") ? " selected='selected'" : "") + " value='small'>Small</option>" +
	"<option " + ((GM_getValue("ME_avatarSize", "default") === "smaller") ? " selected='selected'" : "") + " value='smaller'>Smaller</option>" +
	"<option " + ((GM_getValue("ME_avatarSize", "default") === "hidden") ? " selected='selected'" : "") + " value='hidden'>Hidden</option>" +
	"</select><br><br>" +

	"<input type='checkbox' id='ME_hideNewPostButton'" + ((GM_getValue("ME_hideNewPostButton", true)) ? " checked='checked'" : "") + "><label for='ME_hideNewPostButton'>&nbsp;&nbsp;Hide 'New Post' button in thread view</label><br>" +
	"<br>" +
	"<input type='checkbox' id='ME_disableLinkWarning'" + ((GM_getValue("ME_disableLinkWarning", true)) ? " checked='checked'" : "") +  "><label for='ME_disableLinkWarning'>&nbsp;&nbsp;Disable hyperlink hacker warning redirect</label><br>" +
	"<br>" +
	"<input type='checkbox' id='ME_hideLikeButton'" + ((GM_getValue("ME_hideLikeButton", false)) ? " checked='checked'" : "") + "><label for='ME_hideLikeButton'>&nbsp;&nbsp;Hide 'Like this' button </label><br>" +
	"<br>" +
	"<input type='checkbox' id='ME_hideLikesRecieved'" + ((GM_getValue("ME_hideLikesRecieved", false)) ? " checked='checked'" : "") + "><label for='ME_hideLikesRecieved'>&nbsp;&nbsp;Hide 'Likes Recieved'</label><br>"
		
	if(!embeddedSettings){
		configPannel.innerHTML += "<input type='button' id='ME_ok' value='OK' title='Save the current configuration'>" +
		"<input type='button' id='ME_cancel' value='Cancel' title='Return to the page without saving'>"
	}
	
	
	if(embeddedSettings){
		var lastConfigRow = $("Send").parentNode.parentNode.previousSibling.previousSibling;
		lastConfigRow.parentNode.insertBefore(configPannel, lastConfigRow);
		$("Send").addEventListener("click", saveConfig, false);
	
	} else {
		document.body.insertBefore(configPannel, document.body.firstChild);
		$("ME_ok").addEventListener("click", saveConfig, false);
		$("ME_cancel").addEventListener("click", closeConfigPannel, false);
	}
	
	}
	
	function closeConfigPannel() {
	
	$("ME_configPannel").parentNode.removeChild($("ME_configPannel"));
}



function saveConfig() {
	GM_setValue("ME_avatarSize", $("ME_avatarSizeSetting").options[$("ME_avatarSizeSetting").selectedIndex].value);

	GM_setValue("ME_hideNewPostButton", $("ME_hideNewPostButton").checked);
	GM_setValue("ME_disableLinkWarning", $("ME_disableLinkWarning").checked);
	GM_setValue("ME_hideLikeButton", $("ME_hideLikeButton").checked);
	GM_setValue("ME_hideLikesRecieved", $("ME_hideLikesRecieved").checked);

	if(!embeddedSettings){
		closeConfigPannel();
		window.location.reload();
	} 

}

/**********************************
Main
***********************************/

GM_registerMenuCommand("MY-Eve configuration", ME_config);

//if we're on the forum settings page auto pop the dialog
if(location.pathname =="/Account/SettingsForum"){
embeddedSettings=true;
ME_config();
}

processPage();