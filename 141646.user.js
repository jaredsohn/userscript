// ==UserScript==
// @name            Halo Waypoint Posting Tools
// @version         1.7.14
// @description     Designed to make forum linking easier by adding some preset userlinks and preset hyperlinks.
// @author          Der Flatulator6
// @contributor	    The Little Moa
// @include         https://forums.halowaypoint.com/*
// @released        12/12/11
// @compatible      Greasemonkey
// ==/UserScript==
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

feature.innerHTML = feature.innerHTML + "<span style=\"text-transform:none\"><span style=\"color:black\"> &nbsp;User Links: </span>\
<select onChange=\"thisButton=document.getElementById('insertUserLink');\
		var textbox=document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor');\
		var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd;\
		inserttext=document.getElementById('userlinks').options[document.getElementById('userlinks').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length);\
		document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor').focus(); caretPos=startPos+inserttext.length;\
		textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\"style=\"text-transform:none\" id=\"userlinks\">\
	<option value=\"[userlink][/userlink]\">Default</option>\
	<option value=\"[userlink]The Little Moa[/userlink]\">The Little Moa</option>\
    <option value=\"[userlink]Alisonst[/userlink]\">Alisonst</option>\
    <option value=\"[userlink]B is for Bravo[/userlink]\">B is for Bravo</option>\
	<option value=\"[userlink]bs angel[/userlink]\">bs angel</option>\
    <option value=\"[userlink]Frankie[/userlink]\">Frankie</option>\
	<option value=\"[userlink]Forum Team[/userlink]\">Forum Team</option>\
	<option value=\"[userlink]MM Systems Team[/userlink]\">MM Systems Team</option>\
    <option value=\"[userlink]Total Sellout[/userlink]\">Total Sellout</option>\
    <option value=\"[userlink]WaypointWeb[/userlink]\">WaypointWeb</option>\
	<option value=\"[userlink]Austin7934[/userlink]\">Austin7934</option>\
	<option value=\"[userlink]crazybydefault[/userlink]\">crazybydefault</option>\
	<option value=\"[userlink]Das Kalk[/userlink]\">Das Kalk</option>\
    <option value=\"[userlink]DavidJCobb[/userlink]\">DavidJCobb</option>\
	<option value=\"[userlink]DeepCee[/userlink]\">DeepCee</option>\
    <option value=\"[userlink]Der Flatulator6[/userlink]\">Der Flatulator6</option>\
	<option value=\"[userlink]ElusiveEagle[/userlink]\">ElusiveEagle</option>\
	<option value=\"[userlink]GrimBrother One[/userlink]\">GrimBrother One</option>\
	<option value=\"[userlink]Hypertrooper[/userlink]\">Hypertrooper</option>\
	<option value=\"[userlink]II The Bouk II[/userlink]\">II The Bouk II</option>\
	<option value=\"[userlink]Ka Five[/userlink]\">Ka Five</option>\
	<option value=\"[userlink]Kalamari[/userlink]\">Kalamari</option>\
	<option value=\"[userlink]Link1201[/userlink]\">Link1201</option>\
    <option value=\"[userlink]mendicantbias00[/userlink]\">mendicantbias00</option>\
	<option value=\"[userlink]Ov Thy Demise[/userlink]\">Ov Thy Demise</option>\
	<option value=\"[userlink]Ozzy Onya A2Z[/userlink]\">Ozzy Onya A2Z</option>\
	<option value=\"[userlink]ProximateXBOX[/userlink]\">ProximateXBOX</option>\
	<option value=\"[userlink]rukizzel[/userlink]\">rukizzel</option>\
    <option value=\"[userlink]sarcasmbully[/userlink]\">sarcasmbully</option>\
	<option value=\"[userlink]ShadE09[/userlink]\">ShadE09</option>\
	<option value=\"[userlink]Schatten Blitze[/userlink]\">Schatten Blitze</option>\
	<option value=\"[userlink]SirPwn4g3[/userlink]\">SirPwn4g3</option>\
	<option value=\"[userlink]Smallish Atsumi[/userlink]\">Smallish Atsumi</option>\
	<option value=\"[userlink]snickerdoodle[/userlink]\">snickerdoodle</option>\
	<option value=\"[userlink]The Greybeard[/userlink]\">The Greybeard</option>\
	<option value=\"[userlink]thy ReaperMC[/userlink]\">thy ReaperMC</option>\
	<option value=\"[userlink]Toa Freak[/userlink]\">Toa Freak</option>\
	<option value=\"[userlink]tsassi[/userlink]\">tsassi</option>\
	<option value=\"[userlink]UNSC Warhead[/userlink]\">UNSC Warhead</option>\
	<option value=\"[userlink]WulfwoodsSins[/userlink]\">WulfwoodsSins</option>\
</select>\
<span style=\"color:black\"> &nbsp;Forum Links: </span>\
<select onChange=\"thisButton=document.getElementById('insertForumLink');\
		var textbox=document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor');\
		var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd;\
		inserttext=document.getElementById('forumlinks').options[document.getElementById('forumlinks').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length);\
		document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor').focus(); caretPos=startPos+inserttext.length;\
		textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"text-transform:none\" id=\"forumlinks\">\
	<option value=\"\">Default</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics5.aspx]Announcements[/url]\">Announcements</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics23.aspx]News[/url]\">News</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics22.aspx]Halo Waypoint[/url]\">Halo Waypoint</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics6.aspx]Roll Call[/url]\">Roll Call</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics10.aspx]Matchmaking[/url]\">Matchmaking</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics25.aspx]War Games Feedback[/url]\">War Games Feeback</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics9.aspx]Halo Universe[/url]\">Halo Universe</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics7.aspx]Community Creations[/url]\">Community Creations</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics11.aspx]General Discussion[/url]\">General Discussion</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics8.aspx]Recruiting[/url]\">Recruiting</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics21.aspx]Polling Booth[/url]\">Polling Booth</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics27.aspx]Halo Xbox One[/url]\">Halo Xbox One</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics26.aspx]Spartan Assault[/url]\">Spartan Assault</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics12.aspx]Halo 4[/url]\">Halo 4</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics13.aspx]Halo: Anniversary[/url]\">Halo: Anniversary</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics14.aspx]Halo: Reach[/url]\">Halo: Reach</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics15.aspx]Halo 3: ODST[/url]\">Halo 3: ODST</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics16.aspx]Halo Wars[/url]\">Halo Wars</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics17.aspx]Halo 3[/url]\">Halo 3</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics18.aspx]Halo 2[/url]\">Halo 2</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_topics19.aspx]Halo: Combat Evolved[/url]\">Halo: Combat Evolved</option>\
</select>\
<span style=\"color:black\"> &nbsp;Topic Links: </span>\
<select onChange=\"thisButton=document.getElementById('insertThreadLink');\
		var textbox=document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor');\
		var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd;\
		inserttext=document.getElementById('threadlinks').options[document.getElementById('threadlinks').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length);\
		document.getElementById('ctl00_MainContent_forum_ctl03_YafTextEditor').focus(); caretPos=startPos+inserttext.length;\
		textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"text-transform:none\" id=\"threadlinks\">\
	<option value=\"\">Default</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_postst1423.aspx]Halo Waypoint Forum Rules[/url]\">Forum Rules</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_postst38648.aspx]Waypoint Forums Guidelines[/url]\">Forums Guidelines</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_postst188360.aspx]Halo Waypoint Bugs[/url]\">Waypoint Bugs</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_postst44979.aspx]Halo Waypoint Forum Rankings[/url]\">Ranks & Roles</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_postst195076.aspx]Off-topic Thread[/url]\">Off-topic Thread</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_postst55410.aspx]Halo Waypoint Forum Medals Information[/url]\">Forum Medals</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_postst94930.aspx]Halo Waypoint Forum Member Rankings[/url]\">Member Ranks</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_postst186022.aspx]Halo Waypoint Forum Ban Frequently Asked Questions[/url]\">Forum Ban FAQ</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_postst176596.aspx]Ask a Question for the Halo Bulletin[/url]\">Bulletin Questions</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_postst176596.aspx]WHERE IS MAH BULLETIN?!?[/url]\">Bulletin Wait Room</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_postst35451.aspx]Waypoint Community Modcast[/url]\">Waypoint Modcast</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_postst177459.aspx]Halo Waypoint Forum Userscripts[/url]\">Forum Scripts</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_postst135680.aspx]Halo 4 Ban Topic[/url]\">Halo 4 Bans</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_postst20947.aspx]Halo: Reach Ban Topic[/url]\">Reach Bans</option>\
	<option value=\"[url=http://forums.halowaypoint.com/yaf_postst186192.aspx]Matchmaking Bug Reports[/url]\">MM Bug Reports</option>\
 </select>\
</div>\
</div>\
</span>";