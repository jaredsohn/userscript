// ==UserScript==
// @name            Halo Waypoint Posting Tools
// @require 	http://sizzlemctwizzle.com/updater.php?id=120263
// @version         1.5.0
// @description     Designed to make forum linking easier by adding some preset userlinks and preset hyperlinks.
// @author          Der Flatulator6
// @contributor		The Little Moa
// @homepage        http://halo.xbox.com/
// @license         Creative Commons Attribution License
// @include			https://halo.xbox.com/Forums/*
// @include			http://halo.xbox.com/Forums/*
// @include			http://forums.halo.xbox.com/*
// @include			https://forums.halo.xbox.com/*
// @namespace		namespace
// @released        12/12/11
// @compatible      Greasemonkey
// ==/UserScript==


/* 
 * This file is a Greasemonkey user script. To install it, you need 
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select 
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * Creative Commons Attribution License (--> or Public Domain)
 * http://creativecommons.org/licenses/by/2.5/
*/
function addGlobalStyle(css) {
    var head, style;
	head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//script:
var feature = document.getElementById("bbcodeFeatures");
var splitter ="|";

feature.innerHTML = feature.innerHTML + "<span style=\"text-transform:none\"><span style=\"color:black\"> &nbsp;User Link: </span>\
<select onChange=\"thisButton=document.getElementById('insertUserLink');\
		var textbox=document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor');\
		var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd;\
		inserttext=document.getElementById('userlinks').options[document.getElementById('userlinks').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length);\
		document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor').focus(); caretPos=startPos+inserttext.length;\
		textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\"style=\"text-transform:none\" id=\"userlinks\">\
	<option value=\"[userlink][/userlink]\">DEFAULT</option>\
	<option value=\"[userlink]bs angel[/userlink]\">bs angel</option>\
	<option value=\"[userlink]Alisonst[/userlink]\">Alisonst</option>\
	<option value=\"[userlink]MM Systems Team[/userlink]\">MM Systems Team</option>\
	<option value=\"[userlink]Total Sellout[/userlink]\">Total Sellout</option>\
	<option value=\"[userlink]Veronica[/userlink]\">Veronica</option>\
	<option value=\"[userlink]CruelLEGACEY[/userlink]\">CruelLEGACEY</option>\
	<option value=\"[userlink]Das Kalk[/userlink]\">Das Kalk</option>\
	<option value=\"[userlink]DeepCee[/userlink]\">DeepCee</option>\
	<option value=\"[userlink]ElusiveEagle[/userlink]\">ElusiveEagle</option>\
	<option value=\"[userlink]GrimBrother One[/userlink]\">GrimBrother One</option>\
	<option value=\"[userlink]II The Bouk II[/userlink]\">II The Bouk II</option>\
	<option value=\"[userlink]Kalamari[/userlink]\">Kalamari</option>\
	<option value=\"[userlink]rukizzel[/userlink]\">rukizzel</option>\
	<option value=\"[userlink]SirPwn4g3[/userlink]\">SirPwn4g3</option>\
	<option value=\"[userlink]UNSC Warhead[/userlink]\">UNSC Warhead</option>\
	<option value=\"[userlink]Der Flatulator6[/userlink]\">Der Flatulator6</option>\
	<option value=\"[userlink]Link1201[/userlink]\">Link1201</option>\
	<option value=\"[userlink]snickerdoodle[/userlink]\">snickerdoodle</option>\
</select>\
<span style=\"color:black\"> &nbsp;Forum Link: </span>\
<select onChange=\"thisButton=document.getElementById('insertForumLink');\
		var textbox=document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor');\
		var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd;\
		inserttext=document.getElementById('forumlinks').options[document.getElementById('forumlinks').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length);\
		document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor').focus(); caretPos=startPos+inserttext.length;\
		textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"text-transform:none\" id=\"forumlinks\">\
	<option value=\"\">DEFAULT</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics5_Announcements.aspx]Announcements Forum[/url]\">Announcements</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics6_Roll-Call.aspx]Roll Call Forum[/url]\">Roll Call</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics7_Community-Creations.aspx]Community Creations Forum[/url]\">Community Creations</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics8_Recruiting.aspx]Recruiting Forum[/url]\">Recruiting</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics9_Halo-Universe.aspx]Halo Universe Forum[/url]\">Halo Universe</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics10_Matchmaking.aspx]Matchmaking Forum[/url]\">Matchmaking</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics21_Polling-Booth.aspx]Polling Booth Forum[/url]\">Polling Booth</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics22_Halo-Waypoint.aspx]Halo Waypoint Forum[/url]\">Halo Waypoint</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics11_General-Discussion.aspx]General Discussion Forum[/url]\">General Discussion</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics12_Halo-4.aspx]Halo 4 Forum[/url]\">Halo 4</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics13_Halo--Combat-Evolved-Anniversary.aspx]Halo Combat Evolved Anniversary Forum[/url]\">Halo CE Anniversary</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics14_Halo--Reach.aspx]Halo Reach Forum[/url]\">Halo Reach</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics15_Halo-3--ODST.aspx]Halo 3: ODST Forum[/url]\">Halo 3: ODST</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics16_Halo-Wars.aspx]Halo Wars Forum[/url]\">Halo Wars</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics17_Halo-3.aspx]Halo 3 Forum[/url]\">Halo 3</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics18_Halo-2.aspx]Halo 2 Forum[/url]\">Halo 2</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics19_Halo--Combat-Evolved.aspx]Halo CE Forum[/url]\">Halo CE</option>\
 </select>\
<span style=\"color:black\"> &nbsp;Thread Link: </span>\
<select onChange=\"thisButton=document.getElementById('insertThreadLink');\
		var textbox=document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor');\
		var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd;\
		inserttext=document.getElementById('threadlinks').options[document.getElementById('threadlinks').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length);\
		document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor').focus(); caretPos=startPos+inserttext.length;\
		textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"text-transform:none\" id=\"threadlinks\">\
	<option value=\"\">DEFAULT</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst38648_WAYPOINT-FORUMS-GUIDELINES-v1-0.aspx]Waypoint Forums Guidelines[/url]\">Forums Guidelines</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst1423_Halo-Waypoint-Forum-Rules.aspx]Halo Waypoint Forum Rules[/url]\">Forum Rules</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst37332_Halo--Reach-Playlist-Feedback-Master-Thread.aspx]Playlist Feedback Master Thread[/url]\">Playlist Feedback</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst37228_Halo--Reach-Map-Feedback-Master-Thread.aspx]Map Feedback Master Thread[/url]\">Map Feedback</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst39860_Halo--Reach-Matchmaking-Update-Changelists.aspx]Matchmaking Update Changelists[/url]\">MM Changelists</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst22731_Title-Update-Feedback-Thread.aspx]Title Update Feedback Thread[/url]\">TU Feedback</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst36788_Forum-Bugs-and-Suggestions.aspx]Forum Bugs and Suggestions Thread[/url]\">Bugs/Suggestions</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst40141_Forum-BBCode.aspx]Forum BBCode Thread[/url]\">BBCode</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst40649_K-Y-A---Anniversary-Info--Guides--FAQs-and-More.aspx]KYA: Halo Anniversary Guides/Info/FAQs[/url]\">Anniversary Info</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst20947_Why-Did-I-Get-Banned--The-Official-Thread.aspx]Why did I get banned? The Official Thread[/url]\">Y I GET BANNED?!</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst13748_T-U-R-F-S--Matchmaking-Files--11-23.aspx]T.U.R.F.S. Matchmaking Files[/url]\">T.U.R.F.S.</option>\
 </select>\
<div style=\"position:absolute\">\
	<div style=\"position:relative;top:-4.6em;left:29em;z-index:9000;\">\
<span style=\"color:black\"> &nbsp;Hierarchy: </span>\
<select id=\"hierarchy\" onChange=\"var thisButton=document.getElementById('hierarchy');\
var textbox=document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor');\
var startPos = textbox.selectionStart;\
var endPos = textbox.selectionEnd; \
var stringVal = thisButton.value.toString();\
var pref = stringVal.split('`')[0]; \
var suff = stringVal.split('`')[1];\
/*  alert(pref);\
alert(suff);  */\
if(endPos-startPos>0) \
{ \
	var extratext=textbox.value.substring(startPos, endPos);\
}else\
{\
	var extratext= '';\
};\
textbox.value = textbox.value.substring(0, startPos) + pref + extratext + suff + textbox.value.substring(endPos, textbox.value.length);\
document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor').focus();\
if(endPos-startPos>0) \
{ \
	caretPos=endPos+thisButton.value.length -1;\
}else\
{\
	caretPos=endPos+pref.length;\
};\
textbox.setSelectionRange(caretPos, caretPos);\">\
<option value=\"`\">DEFAULT\</option>\
<option value=\"[font=HaloWaypoint][center][b][size=9]`[/size][/b][/center][/font]\" >Title\</option>\
<option value=\"[u][b][size=7]`[/size][/b][/u]\" >Heading\</option>\
<option value=\"[b][size=6]`[/size][/b]\" >Sub-Heading\</option>\
<option value=\"[size=5]`[/size]\" >Paragraph\</option>\
<option value=\"[quote][i]`[/i][/quote]\" >Extract\</option>\
<option value=\"[u][i]`[/i][/u]\" >Citation\</option>\
<option value=\"[modalurl]`[/modalurl]\" >Modal Link\</option>\
</select>\
</div>\
</div>\
</span>";

document.getElementById('bbcodeFeatures').innerHTML += "<div style=\"color:green;\">&nbsp;<span id=\"spanDisplay\">7500 Characters Remaining</span></div>";
var txtInput = document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor');
txtInput.addEventListener ("keydown", function () {counter()}, false);
txtInput.addEventListener ("keydown", function () {counter()}, false);
function counter() {
    var spanDisplay = document.getElementById('spanDisplay');
	if (txtInput.value.length >  7500) {
	spanDisplay.innerHTML = "<span style=\"color:#E00;text-decoration:underline;text-transform:uppercase;font-weight:bolder;\">Maximum Character Count Exceeded by " + (-7500 + txtInput.value.length) + " Characters</span>";
	} else {
    spanDisplay.innerHTML = 7500 - txtInput.value.length + "&nbsp;Characters Remaining";
		var alpha = txtInput.value.length/7500;
		var rgbg = alpha * 55 + (1-alpha) * 200;
		var rgbr = alpha * 200 + (1-alpha) * 55;
		spanDisplay.style.color = "rgb("+Math.floor(rgbr)+", "+Math.floor(rgbg)+", 50)";
	}
	// Reset the drop downs.
	document.getElementById('hierarchy').selectedIndex=0;
	document.getElementById('userlinks').selectedIndex=0;
	document.getElementById('threadlinks').selectedIndex=0;
	document.getElementById('forumlinks').selectedIndex=0;
}