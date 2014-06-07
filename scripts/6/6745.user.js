// kanjikoohiistorywithlinebreaks.user.js! user script for Firefox's GreaseMonkey extension
// version 0.5 BETA! Copyright (c) 2006-2009, Ricardo Mendonga Ferreira
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// 1.4 2009.11.02  woelpad  Adapted to the new site look
// 1.3 2009.04.03  woelpad  Don't touch links and signatures or already marked words.
// 1.2 2008.08.21  woelpad  Added Script Update Checker
// 1.1 2008.04.07  woelpad  Bugfix for the story alert, caused by too many backslashes in regexp.
// 1.0 2008.01.13  woelpad  Bugfix for if the keyword itself is a tag word
// 0.9 2007.12.06  woelpad  Changed the include line
// 0.8 2007.09.08  woelpad  Rewrote the check size alert code
// 0.7 2007.07.08  Ricardo  Fix compatibility issue with "Copy Story"
// 0.6 2007.06.07  woelpad  Fix to cope with the new position of the 
//          Learned button inside the storyview
// 0.5 2007.05.28  Ricardo  Bugfix for the alert below
// 0.4 2007.05.01  Ricardo  Alert when story is > 512 bytes
//          (not sure if it will work on all platforms though...)
// 0.3 2007.01.10  woelpad  Recognize multiple keywords
// 0.2 2006.12.14  woelpad  Added keyword boldening and the like
// 0.1 2006.08.09  Ricardo  First release
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.5 (?) or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Kanji.Koohii: Story with Line Breaks", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Kanji.Koohii: Story with Line Breaks
// @namespace     http://userscripts.org/scripts/show/6745
// @description   Preserves line breaks for the stories you entered.
// @include       http://kanji.koohii.com/study/kanji/*
// @exclude       
// ==/UserScript==
//
// Used to be:
// @namespace     http://sites.mpc.com.br/ric/nihongo

// References: http://developer.mozilla.org/en/docs/DOM:element
//             http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference
//             http://www.regular-expressions.info/javascript.html

// [Script Update Checker] (http://userscripts.org/scripts/show/20145) written by Jarett (http://userscripts.org/users/38602)
var version_scriptNum = 6745; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1257206586755; // Used to differentiate one version of the script from an older one. Will be automatically updated each time you alter the script and release it on userscripts.org.
if(version_timestamp){function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, "").replace(/&#x000A;/gi, "\n"); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false)};
// [/Script Update Checker]

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function xpathi(query) {
	return xpath(query).snapshotItem(0);
}

String.prototype.addSlashes = function(){
	return this.replace(/(["\\\.\|\[\]\^\*\+\?\$\(\)])/g, '\\$1');
}
String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};

function manipulateStory(story, reKeyword) {
	if (/^(\s*(\[\S+]\s*)?[#*]*\s*)([a-z])/.test(story)) {
		story = RegExp["$1"] + RegExp["$3"].toUpperCase() + RegExp["$'"];
	}
	if (/(\w)(\s*[#*]*\s*)$/.test(story)) {
		story = RegExp["$`"] + RegExp["$1"] + "." + RegExp["$2"];
	}
	if (reKeyword) {
		var ar;
		var tail = story;
		story = '';
		while (ar = /\*[^*]*\*|#[^#]*#/.exec(tail)) {
			story += tail.substr(0, ar.index).replace(reKeyword, '<strong>$&</strong>') + ar[0];
			tail = tail.substr(ar.index + ar[0].length);
		}
		story += tail.replace(reKeyword, '<strong>$&</strong>');
	}
	story = story
		.replace(/\*(.+?)\*/g, '<em>$1</em>')
		.replace(/\#(.+?)\#/g, '<strong>$1</strong>');
	return story;
}

var storyedit = document.getElementById('storyedit');
if (storyedit == null) return;

//-- Verify story size limit
var sizeLimit = 512;
var updateButton = document.getElementById('btnUpdate');
if (updateButton) {
	var txtStory = xpathi('//textarea[@name="txtStory"]');
	updateButton.addEventListener('click', function(e) {
		var v=txtStory.value;
		var s=v.length;
		var m1=v.match(/\n/g);
		var m2=escape(v).match(/%u\d{4}/g); 
		if (m1!=null) s+=m1.length; 
		if (m2!=null) s+=2*m2.length; 
		if (s > sizeLimit) {
			var total = s + ' bytes';
			var excess;
			if (s == sizeLimit + 1) excess = '1 byte';
			else excess = (s - sizeLimit) + ' bytes';
			alert('Story too long: ' + total + ' (max. ' + sizeLimit + '). Remove ' + excess + '.');
			e.stopPropagation();
			e.preventDefault();
		};
	}, true);
}

//-- Line Breaks
var keyword = xpathi('//div[@class="keyword"]').firstChild.nodeValue.trim();
var textarea  = storyedit.getElementsByTagName('textarea')[0];
var story = textarea.innerHTML;
if (story == '') return;
var storyview = document.getElementById('sv-textarea');
var frames_array = storyview.innerHTML.match(
   /<em>[^<]+?<\/em>\s+\(<a\s+href="(\/study\/kanji\/|(\/study)?\?(search|framenum)=)?\d+">FRAME\s+\d+<\/a>\)/ig);

var stories = story.split('\n');
var reKeyword = new RegExp(keyword.addSlashes().replace(/\//g, '|'), 'gi');
for (var i = 0; i < stories.length; i++) {
	if (!stories[i]) continue;
	var ar;
	var tail = stories[i];
	stories[i] = '';
	// Don't touch links and signatures.
	while (ar = /\([a-zA-Z0-9_:]+,\d+-\d+-\d+\)|(http|ftp|https):\/\/[\]\[\-\w\/?#%@!$&'()*+,;:=._~]*[\w\/?#]/i.exec(tail)) {
		stories[i] += manipulateStory(tail.substr(0, ar.index), reKeyword) + ar[0];
		tail = tail.substr(ar.index + ar[0].length);
	}
	stories[i] += manipulateStory(tail, reKeyword);
}
story = stories.join('<br>');

if (frames_array) {
	for (var i = 0; i < frames_array.length; i++) {
		story = story.replace(/\{\d+\}/, frames_array[i]);
	}
}

storyview.innerHTML = story;
