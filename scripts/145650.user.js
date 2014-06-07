// ==UserScript==
// @name            Reporting Tools
// @version         0.0
// @description     Makes reporting topics a lot simpler with drop down menus.
// @author          Der Flatulator6
// @contributor	    The Little Moa
// @homepage        http://halo.xbox.com/
// @include	    https://forums.halo.xbox.com/yaf_reportpost.aspx*
// @namespace	    namespace
// @compatible      Greasemonkey
// ==/UserScript==

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
	<option value=\"[userlink][/userlink]\">Default</option>\
    	<option value=\"[userlink]Alisonst[/userlink]\">Alisonst</option>\
	<option value=\"[userlink]bs angel[/userlink]\">bs angel</option>\
    	<option value=\"[userlink]Frankie[/userlink]\">Frankie</option>\
	<option value=\"[userlink]MM Systems Team[/userlink]\">MM Systems Team</option>\
    	<option value=\"[userlink]Total Sellout[/userlink]\">Total Sellout</option>\
    	<option value=\"[userlink]WaypointWeb[/userlink]\">WaypointWeb</option>\
	<option value=\"[userlink]crazybydefault[/userlink]\">crazybydefault</option>\
	<option value=\"[userlink]CruelLEGACEY[/userlink]\">CruelLEGACEY</option>\
	<option value=\"[userlink]Das Kalk[/userlink]\">Das Kalk</option>\
    	<option value=\"[userlink]DavidJCobb[/userlink]\">DavidJCobb</option>\
	<option value=\"[userlink]DeepCee[/userlink]\">DeepCee</option>\
    	<option value=\"[userlink]Der Flatulator6[/userlink]\">Der Flatulator6</option>\
	<option value=\"[userlink]ElusiveEagle[/userlink]\">ElusiveEagle</option>\
	<option value=\"[userlink]Greenskull[/userlink]\">Greenskull</option>\
	<option value=\"[userlink]GrimBrother One[/userlink]\">GrimBrother One</option>\
	<option value=\"[userlink]II The Bouk II[/userlink]\">II The Bouk II</option>\
	<option value=\"[userlink]Kalamari[/userlink]\">Kalamari</option>\
	<option value=\"[userlink]Ka Five[/userlink]\">Ka Five</option>\
	<option value=\"[userlink]Link1201[/userlink]\">Link1201</option>\
    	<option value=\"[userlink]mendicantbias00[/userlink]\">mendicantbias00</option>\
	<option value=\"[userlink]rukizzel[/userlink]\">rukizzel</option>\
    <option value=\"[userlink]sarcasmbully[/userlink]\">sarcasmbully</option>\
	<option value=\"[userlink]Schatten Blitze[/userlink]\">Schatten Blitze</option>\
	<option value=\"[userlink]SirPwn4g3[/userlink]\">SirPwn4g3</option>\
	<option value=\"[userlink]snickerdoodle[/userlink]\">snickerdoodle</option>\
	<option value=\"[userlink]Toa Freak[/userlink]\">Toa Freak</option>\
	<option value=\"[userlink]UNSC Warhead[/userlink]\">UNSC Warhead</option>\
</select>\
<span style=\"color:black\"> &nbsp;Forum Link: </span>\
<select onChange=\"thisButton=document.getElementById('insertForumLink');\
		var textbox=document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor');\
		var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd;\
		inserttext=document.getElementById('forumlinks').options[document.getElementById('forumlinks').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length);\
		document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor').focus(); caretPos=startPos+inserttext.length;\
		textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"text-transform:none\" id=\"forumlinks\">\
	<option value=\"\">Default</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics5_Announcements.aspx]Announcements[/url]\">Announcements</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics6_Roll-Call.aspx]Roll Call[/url]\">Roll Call</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics7_Community-Creations.aspx]Community Creations[/url]\">Community Creations</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics8_Recruiting.aspx]Recruiting[/url]\">Recruiting</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics9_Halo-Universe.aspx]Halo Universe[/url]\">Halo Universe</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics10_Matchmaking.aspx]Matchmaking[/url]\">Matchmaking</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics21_Polling-Booth.aspx]Polling Booth[/url]\">Polling Booth</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics22_Halo-Waypoint.aspx]Halo Waypoint[/url]\">Halo Waypoint</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics11_General-Discussion.aspx]General Discussion[/url]\">General Discussion</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics12_Halo-4.aspx]Halo 4[/url]\">Halo 4</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics13_Halo--Combat-Evolved-Anniversary.aspx]Halo Combat Evolved Anniversary[/url]\">Halo CE Anniversary</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics14_Halo--Reach.aspx]Halo Reach[/url]\">Halo Reach</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics15_Halo-3--ODST.aspx]Halo 3: ODST[/url]\">Halo 3: ODST</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics16_Halo-Wars.aspx]Halo Wars[/url]\">Halo Wars</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics17_Halo-3.aspx]Halo 3 [/url]\">Halo 3</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics18_Halo-2.aspx]Halo 2 [/url]\">Halo 2</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_topics19_Halo--Combat-Evolved.aspx]Halo CE [/url]\">Halo CE</option>\
 </select>\
<span style=\"color:black\"> &nbsp;Topic Link: </span>\
<select onChange=\"thisButton=document.getElementById('insertThreadLink');\
		var textbox=document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor');\
		var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd;\
		inserttext=document.getElementById('threadlinks').options[document.getElementById('threadlinks').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length);\
		document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor').focus(); caretPos=startPos+inserttext.length;\
		textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"text-transform:none\" id=\"threadlinks\">\
	<option value=\"\">Default</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst38648_WAYPOINT-FORUMS-GUIDELINES-v1-0.aspx]Waypoint Forums Guidelines[/url]\">Forums Guidelines</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst1423_Halo-Waypoint-Forum-Rules.aspx]Halo Waypoint Forum Rules[/url]\">Forum Rules</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst37332_Halo--Reach-Playlist-Feedback-Master-Thread.aspx]Playlist Feedback Master Topic[/url]\">Playlist Feedback</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst37228_Halo--Reach-Map-Feedback-Master-Thread.aspx]Map Feedback Master Topic[/url]\">Map Feedback</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst39860_Halo--Reach-Matchmaking-Update-Changelists.aspx]Matchmaking Update Changelists[/url]\">MM Changelists</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst22731_Title-Update-Feedback-Thread.aspx]Title Update Feedback Topic[/url]\">TU Feedback</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst36788_Forum-Bugs-and-Suggestions.aspx]Forum Bugs and Suggestions Topic[/url]\">Bugs/Suggestions</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst40141_Forum-BBCode.aspx]Forum BBCode Topic[/url]\">BBCode</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst40649_K-Y-A---Anniversary-Info--Guides--FAQs-and-More.aspx]KYA: Halo Anniversary Guides/Info/FAQs[/url]\">Anniversary Info</option>\
	<option value=\"[url=http://halo.xbox.com/Forums/yaf_postst20947_Why-Did-I-Get-Banned--The-Official-Thread.aspx]Why did I get banned? The Official Topic[/url]\">Y I GET BANNED?!</option>\
	<option value=\"[url=http://halo.xbox.com/forums/yaf_postst44979.aspx]Halo Waypoint Forum Rankings[/url]\">Ranks & Roles</option>\
	<option value=\"[url=https://forums.halo.xbox.com/yaf_postsm1158182_343-Industries-Sparkasts---Master-Topic.aspx]343 Industries Sparkasts - Master Topic[/url]\">343 Sparkasts</option>\
    <option value=\"[url=https://forums.halo.xbox.com/yaf_postst55410_HALO-WAYPOINT-FORUM-MEDALS.aspx]Halo Waypoint Forum Medals Information[/url]\">Forum Medals</option>\
 </select>\
</div>\
</div>\
</span>";

document.getElementById('bbcodeFeatures').innerHTML += "<div style=\"color:green;\">&nbsp;<span id=\"spanDisplay\">7499 Characters Remaining</span></div>";
var txtInput = document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor');
txtInput.addEventListener ("keydown", function () {counter()}, false);
txtInput.addEventListener ("keydown", function () {counter()}, false);
function counter() {
    var spanDisplay = document.getElementById('spanDisplay');
	if (txtInput.value.length >  7499) {
	spanDisplay.innerHTML = "<span style=\"color:#E00;text-decoration:underline;text-transform:uppercase;font-weight:bolder;\">Maximum Character Count Exceeded by " + (-7499 + txtInput.value.length) + " Characters</span>";
	} else {
    spanDisplay.innerHTML = 7499 - txtInput.value.length + "&nbsp;Characters Remaining";
		var alpha = txtInput.value.length/7499;
		var rgbg = alpha * 55 + (1-alpha) * 200;
		var rgbr = alpha * 200 + (1-alpha) * 55;
		spanDisplay.style.color = "rgb("+Math.floor(rgbr)+", "+Math.floor(rgbg)+", 50)";
	}
	// Reset the drop downs.
	document.getElementById('userlinks').selectedIndex=0;
	document.getElementById('threadlinks').selectedIndex=0;
	document.getElementById('forumlinks').selectedIndex=0;
}