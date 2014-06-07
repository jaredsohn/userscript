// ==UserScript==
// @name Inforge++
// @description A better Inforge experience
// @namespage inforge.net
// @match http://inforge.net/community/*
// @match http://www.inforge.net/community/*
// @require https://code.jquery.com/jquery-latest.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js
// @version 0.2.6.2
// @updateURL http://userscripts.org/scripts/source/416849.user.js
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @run-at document-end
// ==/UserScript==


/* CONSTANTS & VARS*/

const BUTTON_ICON = "http://www.somnet.co.in/images/icon/ico_download_driver.png";
const HOMEPAGE = "http://www.inforge.net/community/";
const SCRIPT_VERSION = GM_info.script.version;

var $SettingsDiv;
var $ButtonSettings;
var $HighNickColor;
var $ButtonSave;
var $RemoveSidebar;
var $RemoveSocialButtons;
var $RemoveShoutbox;
var $AnonymRedirects;

// Prevent to run on other scripts load

if((!window.jQuery))
	return;
	
main();


/* MAIN FUNCTION */

function main () {
	loadGraphics();
	
	if(getSetting("isFirstTime") == null)
		initializeFirstTime();
	if(SCRIPT_VERSION != getSetting("scriptVersion"))
		updateNotify();
	
	start();
}

function initializeFirstTime() {
	resetSettings();
	
	alert("Benvenuto in Inforge++!\n"+
		"\n" + 
		"Da qui sembra che sia la tua prima volta con questo script!\n" +
		"Questa Ã¨ ancora una versione beta, se trovi dei bugs segnalali a v0k3@inventati.org\n"+
		"#KISS #NAR #paranoici #3l33t\n" +
		"\n" +
		"Versione dello script: " + SCRIPT_VERSION + "\n"+
		"\n" +
		"Created by V0K3, 2014 Copyleft (C).");
}

function start() {
	addButton();	
	
	// If this is the main page and the user want to remove the shoutbox we have to wait to the page being full load
	if(document.URL == HOMEPAGE && getSetting("removeShoutbox"))
		window.addEventListener ("load", work);
	else
		work();
}

function work() {
	highNickColor(getSetting("highNickColor"));
	
	if (getSetting("removeSidebar"))
		removeSidebar();
	if(getSetting("removeShoutbox"))
		removeShoutbox();
	if(getSetting("removeSocialButtons"))
		removeSocialButtons();
	if(getSetting("anonymRedirects"))
		$("a").click(anonymRedirects);
	else
		$("a").click(null);
}

function highNickColor(color) {
	$("li.welcomelink").children().css("color", color);
}

function removeSidebar() {
	if(document.URL == HOMEPAGE && $("div#sidebar_container")) {
		$("div#sidebar_container").remove();
		$("div#content").css("margin-right", "0px");
	}
}

function removeSocialButtons() {
	if($("UL.searchBox_advanced_search"))
		$("UL.searchBox_advanced_search").remove();
}

function removeShoutbox() {
	if($("FORM#s9_shout.block.s9_shoutmax"))
		$("FORM#s9_shout.block.s9_shoutmax").remove();
}

function anonymRedirects() {
	var pattInforge = new RegExp("^(http(s)?:\\/\\/)?(www\\.)?inforge\\.net", "i");
	var pattHTTP = new RegExp("^http(s)?:\\/\\/", "i");
	var pattAnonymz = new RegExp("^http(s)?:\\/\\/(www\\\.)?anonymz\\.com", "i");
	var url = $(this).attr("href");
		
	if(!pattInforge.test(url) && pattHTTP.test(url) && !pattAnonymz.test(url))
		$(this).attr("href", "http://anonymz.com/?" + url);	
}

function loadCSS(url) {
	$("head").append($("<link/>", {rel: "stylesheet", type: "text/css", href: url}));
}

/* SETTINGS FUNCTIONS */

function loadGraphics() {
	loadCSS("https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css");
	
	$SettingsDiv = $("<div/>", {id: "ifppsettingsdiv"}).css("width", "300px").css("display", "none");
	$HighNickColor = $("<input/>", { type:"text"}).css("width", "50px");
	$RemoveSidebar = $("<input/>", {type: "checkbox"});
	$RemoveSocialButtons = $("<input/>", {type: "checkbox"});
	$RemoveShoutbox = $("<input/>", {type: "checkbox"});
	$AnonymRedirects = $("<input/>", {type: "checkbox"});
	$ButtonSave = $("<input/>", {type: "submit", value: "Salva!"});
	$ButtonSave.click(saveSettings);
	
	$SettingsDiv.append($("<legend>Impostazioni Inforge++</legend><br/>").css("color", "red").css("font-size","12pt"));
	$SettingsDiv.append("<font>Colore preferito nella barra superiore:&nbsp;&nbsp;</font>");
	$SettingsDiv.append($HighNickColor);
	$SettingsDiv.append("<br/><br/>");
	$SettingsDiv.append($RemoveSidebar);
	$SettingsDiv.append("<font>  Rimuovi la sidebar!</font><br/>");
	$SettingsDiv.append($RemoveSocialButtons);
	$SettingsDiv.append("<font>  Rimuovi i pulsanti social!</font><br/>");
	$SettingsDiv.append($RemoveShoutbox);
	$SettingsDiv.append("<font>  Rimuovi la shoutbox (100% piÃ¹ veloce)!</font><br/>");
	$SettingsDiv.append($AnonymRedirects);
	$SettingsDiv.append("<font>  Redirects esterni anonimi con <a href='http://anonymz.com/' target=_blank>Anonymz.com</a>!</font><br/>");
	$SettingsDiv.append("<br/><br/><br/>");
	$SettingsDiv.append($("<p/>", {align:"center"}).append($ButtonSave));
	
	$("body").append($SettingsDiv);
}

function addButton() {
	$ButtonSettings = $("<a/>", {href:"#" + $SettingsDiv.attr("id"),id:"ifppsettingsbutton", title:"Impostazioni Inforge++"}).css("background-image", 'url("'+ BUTTON_ICON +'")').css("width", "15px").css("height", "15px");
	$("ul#notifications1").append($("<li />").append($ButtonSettings));
	$ButtonSettings.fancybox();
	$ButtonSettings.click(loadSettings);
}

function saveSettings() {
	setSetting("highNickColor",  $HighNickColor.val());
	setSetting("removeSidebar", $RemoveSidebar.is(":checked"));
	setSetting("removeSocialButtons", $RemoveSocialButtons.is(":checked"));
	setSetting("removeShoutbox", $RemoveShoutbox.is(":checked"));
	setSetting("anonymRedirects", $AnonymRedirects.is(":checked"));
	
	work();
	$(".fancybox-close").click();
}

function loadSettings() {
	$HighNickColor.val(getSetting("highNickColor"));
	$RemoveSidebar.attr("checked", getSetting("removeSidebar"));
	$RemoveSocialButtons.attr("checked", getSetting("removeSocialButtons"));
	$RemoveShoutbox.attr("checked", getSetting("removeShoutbox"));
	$AnonymRedirects.attr("checked", getSetting("anonymRedirects"));
}

function resetSettings() {
	setSetting("isFirstTime", false);
	setSetting("highNickColor", "yellow");
	setSetting("removeSidebar", true);
	setSetting("removeSocialButtons", true);
	setSetting("removeShoutbox", false);
	setSetting("anonymRedirects", true);
	setSetting("scriptVersion", SCRIPT_VERSION);
}

function updateSettings() {
	if(getSetting("highNickColor") == null)
		setSetting("highNickColor", "yellow");
	if(getSetting("removeSidebar") == null)
		setSetting("removeSidebar", true);
	if(getSetting("removeSocialButtons") == null)
		setSetting("removeSocialButtons", true);
	if(getSetting("removeShoutbox") == null)
		setSetting("removeShoutbox", false);
	if(getSetting("anonymRedirects") == null)
		setSetting("anonymRedirects", true);
	
	setSetting("scriptVersion", SCRIPT_VERSION);
}

function updateNotify() {
	updateSettings();
	
	alert("Lo script Ã¨ stato aggiornato alla versione: " + SCRIPT_VERSION + ".\n"  +
		"\n" +
		"CHANGELOGS:\n" +
		"\n" +
		"0.2.6.2\n"+
		"Fixed Settings bug\n" +
		"0.2.6.1\n" +
		"* Fixed HideSidebar bug\n" +
		"0.2.6" +
		"* Now update won't reset the settings!\n"+
		"* Fixed minor bugs\n"+
		"* Fixed major bug on AnonymRedirect\n"+
		"* Minor code refaction\n");
}

function getSetting (name) {
	return GM_getValue(name, null);
}

function setSetting (name, value) {
	GM_setValue(name, value);
}

function removeSetting(name) {
	GM_deleteValue(name);
}