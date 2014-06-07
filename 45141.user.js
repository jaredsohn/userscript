// ==UserScript==
// @name        Facebook Fixer Danish
// @namespace   http://userscripts.org/people/14536
// @description Enhancements for Facebook: bigger profile pictures and photos, easier viewing of albums, links to download videos, showing people's age and sign, google calendar integration, keyboard shortcuts & more. Compatible with new Facebook and fully customizable!
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @exclude     *facebook.com/logout.php*
// @exclude     *facebook.com/*logged_out*
// @author      Vaughan Chandler and translated by Mads Thomsen
// ==/UserScript==

// Last updated on 2009-03-24

(function() {
	
if (self != top) { return; }

///////////////////////////////////////////////////////////////////
//                                                               //
//  THIS SECTION CONTAINS VARIABLES THAT CAN BE EDITED BY USERS  //
//                                                               //
///////////////////////////////////////////////////////////////////

// Set the colour of the border used when the "Show a border around small pictures that have bigger available" option is enabled
// You can use standard web colours by name (eg. red, blue) or specify hex values (eg. #ff0000, #0000ff). Default is blue
var popupIdentifierBorderColor = 'blue';

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
//  SETTINGS BELOW HERE SHOULD NOT BE CHANGED UNLESS YOU KNOW WHAT YOU'RE DOING  //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////

var version_timestamp = 1237666490308; // javascript:window.alert(new Date().getTime());

var loc;
var page = '';
var lastPage = '';
var listening = false;
var homePageNotModified = true;

//
// Enable profile-specific settings
//
var id = 0;
try {
	var profileLink = document.evaluate("//a[contains(@href,'ref=profile')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
	if (m = profileLink.href.match(/id=(\d+)\b/)) { id = m[1]; }
} catch(x) {}
var buf = 'ProfilePicPopup,PhotoPopup,PopupAutoClose,BigAlbumPictures,AutoBigAlbumPictures,!AutoLoadFullAlbum,!SmallPicBorder,Age,Sign,iCalendar,GoogleCalendar,CalendarFullName,CalendarBirthDate,!GoogleApps,HomeFilterList,HomeRightColumn,HomeHighlights,HomePokes,HomePeopleYouMayKnow,HomeFindFriends,RoundedProfilePics,DownloadVideo,ErrorPageReload,PageTitle,Updates,Redirects,ProtocolLinks,!TopBarFixed,Shortcuts';
var booleanOptions = buf.split(',');
var prefs = {
	'PopupPosition': GM_getValue(id+'-PopupPosition', 'Auto'),
	'GoogleAppsDomain': GM_getValue(id+'-GoogleAppsDomain', ''),
	'TopBarOpacity': GM_getValue(id+'-TopBarOpacity', '1.0'),
	'BottomBarOpacity': GM_getValue(id+'-BottomBarOpacity', '0.9')
}
for (var i=0; i<booleanOptions.length; i++) {
	bool = true;
	if (booleanOptions[i].charAt(0)=='!') {
		booleanOptions[i] = booleanOptions[i].replace('!','');
		bool = false;
	}
	prefs[booleanOptions[i]] = GM_getValue(id+'-'+booleanOptions[i], bool)
}


//
// Add styles used by script
//
GM_addStyle(
	'.fbfPopup { background:#f6f6f6; border:3px double #666666; }'+
	'.fbfPopupContainer { display:none; position:absolute; top:0; right:0; bottom:0; left:0; }'+
	'#FBPPdiv { display:none; position:fixed !important; top:2px !important; padding:2px 4px; min-width:130px; z-index:99999 !important;}'+
	'.FBPPdivLeft { left:2px !important; right:auto !important; }'+
	'.FBPPdivRight { right:2px !important; left:auto !important; }'+
	'#FBPPheader, #FBPPloading { text-align:center; color:#3366cc; font-variant:small-caps; font-weight:bold !important; }'+
	'#FBPPclose { text-align:right; color:#ffaaaa; cursor:pointer; font-weight:bold; height:1px; }'+
	'#FBPPclose:hover { color:#aa6666; }'+
	'#FBPPimg { text-align:center; }'+
	'#FBPPimg img { color:white; }'+
	'#FBFBigAlbumContainer { padding:0 0 40px; }'+
	'#FBFBigAlbum { padding:3px 3px 20px; margin:35px 15px 0px; text-align:center; }'+
	'#FBFBigAlbum img { padding:1px; }'+
	'.FBFBigAlbumClose { float:right; color:red; cursor:pointer; font-weight:bold; background:#fff9f9; padding:0 10px; border:1px solid #f6f6f0; }'+
	'#FBFConfigContainer { z-index:1001; }'+
	'#FBFConfig { width:700px; padding:10px; margin:20px auto 0; }'+
	'#FBFConfig label, #FBFConfig .fbfLabel { color:#666666; font-weight:normal; } '+
	'#FBFConfig .fbfHeader { font-weight:bold; }'+
	'#FBFConfigShadow, #fbfShadow { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:black; opacity:0.6; }'+
	'#fbfKeyboardShortcutsList { display:none; }'+
	'#fbfUpdatePopup { max-width:450px; margin:100px auto; padding:10px; }'+
	'.fbfImportant { font-weight:bold; }'+
	'.fbfNote { color:#777777; }'+
	'.fbfRight { text-align:right; }'
);

//
// Add div for showing big profile pics
//
var div = document.createElement('div');
div.id = 'FBPPdiv';
div.className = 'fbfPopup FBPPdiv' + (prefs['PopupPosition']=='Auto' ? 'Left' : prefs['PopupPosition']);
div.innerHTML = '<div id="FBPPclose" title="Close">x</div><div id="FBPPheader">Facebook Fixer</div><div id="FBPPimg"><span></span></div>';
document.body.insertBefore(div, document.body.lastChild.nextSibling);
document.getElementById('FBPPclose').addEventListener('click', function() { document.getElementById('FBPPdiv').style.display='none'; }, false);

//
// Add div for popups and shadows
//
var popupDiv = document.createElement('div');
popupDiv.id = 'fbfPopupContainer';
popupDiv.className = 'fbfPopupContainer';
appendChild(popupDiv, document.body);
var shadowDiv = document.createElement('div');
shadowDiv.id = 'fbfShadow';
appendChild(shadowDiv, document.body);

processPage();

//
// Misc. Small Functions
//

// Get element by id
function $(id){return document.getElementById(id);}

// Add a child node
function appendChild(child,parent){parent.insertBefore(child,parent.lastChild.nextSibling);}

// XPath an ordered node snapshot type
function $x(xpath,root){return document.evaluate(xpath,(root?root:document),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}

// XPath a first ordered node type
function $x1(xpath,root){return document.evaluate(xpath,(root?root:document),null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;}

// Pad with a 0
function $0(x) { return x<10 ? '0'+x : ''+x; }

// Add 'click' event listener
function onClick(id,func){$(id).addEventListener('click',func,false);}

// Click on an element
function click(elm) {
	var evt = document.createEvent('MouseEvents');
	evt.initMouseEvent( 'click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null );
	elm.dispatchEvent(evt);
}

// Show a popup div with a shadow background
function showPopup(content,onTop) {
	$('fbfPopupContainer').innerHTML = content;
	if (onTop) {
		$('fbfShadow').style.zIndex = '1000';
		$('fbfPopupContainer').style.zIndex = '1001';
	} else {
		$('fbfShadow').style.zIndex = '1';
		$('fbfPopupContainer').style.zIndex = '2';
	}
	$('fbfShadow').style.display = 'block';
	$('fbfPopupContainer').style.display = 'block';
	window.scroll(0,0);
}

// Hide popups created with showPopup()
function hidePopup() {
	if ($('fbfPopupContainer')) {
		$('fbfPopupContainer').style.display = 'none';
		$('fbfShadow').style.display = 'none';
	}
}

// Figure out the month from a string containing a date
function $m(str) {
	// Supports: English (UK,US), Spanish, French, German, Dutch, Italian, Portuguese (Brazil,Portugal), Swedish, Greek
	str = str.toLowerCase();
	var months = new Array (/^(.*\s)?(jan(uar[iy]?)?|enero|janvier|gennaio|janeiro|ιανουαρίου)(\s.*)?$/,
							/^(.*\s)?(feb(ruar[iy]?)?|febrero|février|febbraio|fevereiro|φεβρουαρίου)(\s.*)?$/,
							/^(.*\s)?(mar(ch)?|marzo|mars|märz|maart|março|μαρτίου)(\s.*)?$/,
							/^(.*\s)?(apr(ile?)?|abril|avril|απριλίου)(\s.*)?$/,
							/^(.*\s)?(ma(yo?|i|j)|mei|maggio|maio|μαΐου)(\s.*)?$/,
							/^(.*\s)?(june?|junio?|juin|giugno|junho|ιουνίου)(\s.*)?$/,
							/^(.*\s)?(jul[iy]?|julio|juillet|luglio|julho|ιουλίου)(\s.*)?$/,
							/^(.*\s)?(aug(ust(i|us)?)?|agosto|août|αυγούστου)(\s.*)?$/,
							/^(.*\s)?(sep(tember)?|septiembre|se[pt]tembre|setembro|σεπτεμβρίου)(\s.*)?$/,
							/^(.*\s)?(o[ck]t(ober)?|oct[ou]bre|ottobre|outubro|οκτωβρίου)(\s.*)?$/,
							/^(.*\s)?(nov(ember)?|noviembre|novembre|novembro|νοεμβρίου)(\s.*)?$/,
							/^(.*\s)?(de[cz](ember)?|dici?embre|décembre|dezembro|δεκεμβρίου)(\s.*)?$/);
	for (var i=0; i<months.length; i++) {
		if (str.match(months[i])) { return i; }
	}
	return -1;
}


// Parse a date
function $d(str) {
	str = ' ' + str.toLowerCase() + ' ';
	var m;
	var date = new Date();
	if (str.indexOf('tomorrow')!=-1) { date = date.getNextDay(); }
	else if (str.indexOf('today')==-1) {
		var month = $m(str);
		if (month==-1) return null;
		date.setMonth(month);
		if (m = str.match(/\s(\d\d?)[\s,]/)) { if (m[1]<32) { date.setDate(m[1]); } }
		if (m = str.match(/\b(\d{4})\b/)) { date.setYear(m[1]); }
	}
	if (m = str.match(/\b(\d\d?):(\d\d)( (a|p)m)?/i)) {
		date.setHours(m[4]=='p' ? m[1]-0+12 : m[1]);
		date.setMinutes(m[2]);
		date.setSeconds(0);
	}
	//GM_log('=> '+date.toISOString()); // DEBUG ONLY
	return date;
}

// Pause listening when typing messages so we don't slow things down
function handleAutoGrower(elm) {
	if (elm.className.indexOf('handled') == -1) {
		elm.addEventListener('focus', function(e) {
			listening = false;
			document.getElementById('content').removeEventListener('DOMNodeInserted', processPage, false);
		}, false);	
		elm.addEventListener('blur', function(e) {
			processPage();
		}, false);
		elm.className = elm.className + ' handled';
	}
}


//
// Keyboard shortcuts
//
if (prefs['Shortcuts']) {
	window.addEventListener('keydown', function(e) {
		//GM_log(String.fromCharCode(e.keyCode) + ' - ' + e.keyCode + ' - ' + e.ctrlKey + ' - ' + e.altKey + ' - ' + e.metaKey); // DEBUG ONLY
		if ((e.target.type && e.target.type!='checkbox' && e.target.type!='select') || e.ctrlKey || e.altKey || e.metaKey) { return; }
		function clickLink(filter) {
			var link;
			if (filter.charAt(0) == ':') {
				filter = filter.replace(/^./,'');
				link = document.evaluate("//a[contains(@href,'"+filter+"')][1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
			} else {
				link = document.evaluate("//a[contains(string(),'"+filter+"')][1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
			}
			if (!link) { return -1; }
			click(link);
		}
		if (e.keyCode==27) {
			if (document.getElementById('fbfPopupContainer')) { document.getElementById('fbfPopupContainer').style.display = 'none'; }
			if (document.getElementById('fbfShadow')) { document.getElementById('fbfShadow').style.display = 'none'; }
			if (prefs['PhotoPopup'] || prefs['ProfilePicPopup']) { document.getElementById('FBPPdiv').style.display='none'; }
		}
		else if (e.keyCode==16 || e.keyCode==17 || e.keyCode==18) {}
		else if (e.keyCode==191) { if (e.shiftKey) { window.alert('Facebook Fixer Debug Info:\n\nid: ' + id + '\npage: ' + page); } } // ?
		else if (e.shiftKey) {
			switch(e.keyCode) {
				case 37: clickLink('First'); break; // Left Arrow
				case 39: clickLink('Last'); break; // Right Arrow
				case 65: window.location.href = 'http://www.facebook.com/photos/?ref=sb'; break; // A
				case 66: click(document.getElementById('buddy_list_tab')); break; // B
				case 67: showConfig(); break; // C
				case 70: window.location.href = 'http://www.facebook.com/friends/?ref=tn'; break; // F
				case 72: window.location.href = 'http://www.facebook.com/home.php?ref=home'; break; // H
				case 73: window.location.href = 'http://www.facebook.com/inbox/?ref=mb'; break; // I
				case 78: window.location.href = 'http://www.facebook.com/notifications.php'; break; // N
				case 80: window.location.href = 'http://www.facebook.com/profile.php?id='+id+'&ref=profile'; break // P
				case 83: e.stopPropagation(); e.preventDefault(); document.getElementById('q').focus(); break // S
			}
		}
		else {
			if (window.location.href.indexOf('/photos/')!=-1) {
				switch(e.keyCode) {
					case 65: // a
					case 82: window.location.href = 'http://www.facebook.com/photos/?ref=sb&view=recent'; break; // r
					case 77: // m
					case 85: window.location.href = 'http://www.facebook.com/photos/?ref=sb&view=mobile'; break; // u
					case 84: // t
					case 70: window.location.href = 'http://www.facebook.com/photos/?ref=sb&view=tagged'; break; // f
					case 67: clickLink('Photo Comments'); break; // c
					case 79: clickLink('Photos of Me'); break; // o
					case 80: clickLink('My Photos'); break; // p
				}
			}
			else if (page.match(/^home.php/)) {
				switch(e.keyCode) {
					case 73: clickLink(':home.php?tab=5'); break; // i
					case 70: // f
					case 76: clickLink(':home.php?tab=2'); break; // l
					case 78: clickLink(':home.php?tab=1'); break; // n
					case 80: clickLink(':home.php?tab=4'); break; // p
					case 83: // s
					case 85: clickLink(':home.php?tab=3'); break; // u
				}
			}
			else {
				switch(e.keyCode) {
					case 66: clickLink('Show Big Pictures'); break; // b
					case 67: if (clickLink('View Comments')==-1) { if (clickLink('Photo Comments')==-1) { clickLink('Comments on Photos'); } } break; // c
					case 73: clickLink(':v=info'); break; // i
					case 80: if (clickLink('s Profile')==-1) { clickLink(':v=photos'); } break; // p
					case 87: clickLink(':v=feed'); break; // w
					case 88: clickLink('Boxes'); break; // x
				}
			}
			if (page.match(/^profile\.php\?.*photos/) && e.keyCode==77) { clickLink('and Me ('); }
			switch(e.keyCode) {
				case 37: if (clickLink('Prev')==-1) { clickLink('prev'); }  break; // Left Arrow
				case 39: if (clickLink('Next')==-1) { clickLink('next'); } break; // Right Arrow
				case 65: clickLink('Back to '); break; // a
			}
		}
	}, false);
}


//
// Allow script configuration
//
GM_registerMenuCommand('Facebook Fixer indstillinger', showConfig);
if ($('fb_menu_settings_dropdown')) {
	var configLink = document.createElement('div');
	configLink.className = 'fb_menu_item';
	configLink.innerHTML = '<a id="fbfConfigMenuLink" href="#" onclick="return false;"><small style="background-image: url(http://static.ak.fbcdn.net/images/app_icons/edit_applications.gif);"> </small>Facebook Fixer</a>';
	appendChild(configLink, $('fb_menu_settings_dropdown'));
	$('fbfConfigMenuLink').addEventListener('click', showConfig, false);
}
function showConfig() {
	showPopup('<div id="FBFConfig" class="fbfPopup">'+
		'<div style="text-align:center;"><span class="fbfImportant">Facebook Fixer Indstillinger</span> <span class="fbfNote">(' + id + ' - ' + version_timestamp + ')</span></div><br />'+
		'Alle rettelser gemmes med det samme, Men nogen rettelser vil ikke fungere før siden genindlæses<br />'+
		'<br /><span class="fbfHeader">Stor Billede</span><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfProfilePicPopup" /><label for="fbfConfProfilePicPopup">Popup stor profil billede ved mouse over.</label><br />' +
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfPhotoPopup" /><label for="fbfConfPhotoPopup">Popup stor billede ved mouse over.</label><br />' +
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfPopupAutoClose" /><label for="fbfConfPopupAutoClose">Luk popup billede automatisk.</label><br />' +
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfBigAlbumPictures" /><label for="fbfConfBigAlbumPictures">Tilføj link på album sider så der vises store billeder på siden.</label><br />' +
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfAutoBigAlbumPictures" /><label for="fbfConfAutoBigAlbumPictures">Automatisk vis store album billeder når siden åbnes.</label><br />' +
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfAutoLoadFullAlbum" /><label for="fbfConfAutoLoadFullAlbum">Automatisk indlæs thumnbnails for alle billeder i et album på den enkelte side, istedetfor 20 pr side.<br />' +
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfSmallPicBorder" /><label for="fbfConfSmallPicBorder">Vis en ramme omkring små billeder hvor større billede er muligt.</label><br />' +
		' &nbsp; &nbsp; &nbsp; <span class="fbfLabel">Placering for popup billeder: </span><input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPositionAuto" value="auto" /><label for="fbfConfPopupPositionAuto">Automatisk</label> <input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPositionLeft" value="left" /><label for="fbfConfPopupPositionLeft">Venstre</label> <input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPositionRight" value="right" /><label for="fbfConfPopupPositionRight">Højre</label><br />'+
		'<br /><span class="fbfHeader">Forsiden</span><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfHomeFilterList" /><label for="fbfConfHomeFilterList">Vis filter liste.</label><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfHomeRightColumn" /><label for="fbfConfHomeRightColumn">Vis højre kolonne.</label><br />'+
		' &nbsp; &nbsp; &nbsp; &nbsp; <input type="checkbox" id="fbfConfHomeHighlights" /><label for="fbfConfHomeHighlights">Vis Højdepunkter.</label><br />'+
		' &nbsp; &nbsp; &nbsp; &nbsp; <input type="checkbox" id="fbfConfHomePokes" /><label for="fbfConfHomePokes">Vis Pokes.</label><br />'+
		' &nbsp; &nbsp; &nbsp; &nbsp; <input type="checkbox" id="fbfConfHomePeopleYouMayKnow" /><label for="fbfConfHomePeopleYouMayKnow">Vis personer du kender.</label><br />'+
		' &nbsp; &nbsp; &nbsp; &nbsp; <input type="checkbox" id="fbfConfHomeFindFriends" /><label for="fbfConfHomeFindFriends">Vis forbindelse med venner.</label><br />'+
		'<br /><span class="fbfHeader">Fødeselsdage/Begivenheder</span><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfAge" /><label for="fbfConfAge">Vis personers alder på profilen (hvis de har oplyst fødselsdag).</label><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfSign" /><label for="fbfConfSign">Vis stjernetegn på profilen (hvis de har oplyst fødselsdag).</label><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfiCalendar"/><label for="fbfConfiCalendar">Tilføj links til download af <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> fil med alle fødselsdage.</label><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfGoogleCalendar"/><label for="fbfConfGoogleCalendar">Tilføj links til tilføj fødselsdage og begivenheder til <a href="http://en.wikipedia.org/wiki/Google_calendar" target="_blank">Google Calendar</a>.</label><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfCalendarFullName"/><label for="fbfConfCalendarFullName">Brug personens fulde navn som titel ved fødselsdage (istedetfor fornavn).</label><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfCalendarBirthDate"/><label for="fbfConfCalendarBirthDate">Brug personens fødselsdag i begivenhedens beskrivelse.</label><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfGoogleApps"/><label for="fbfConfGoogleApps">Opret Google Calendar link kompatibel med Google Apps.</label><br />'+
		' &nbsp; &nbsp; &nbsp; &nbsp; Domæne: <input id="fbfConfGoogleAppsDomain"></input><br />'+
		'<br /><span class="fbfHeader">Andre indstillinger</span><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfRoundedProfilePics"/><label for="fbfConfRoundedProfilePics">Vis runde hjørner på profil billeder.</label><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfDownloadVideo"/><label for="fbfConfDownloadVideo">Tilføj link til download af videoer fra video sider. (du skal muligvis bruge <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)</label><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfProtocolLinks"/><label for="fbfConfProtocolLinks">Brug messenger IDs på profiler som links der starter en samtale (Google Talk, Windows Live etc).</label><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfErrorPageReload"/><label for="fbfConfErrorPageReload">Automatisk genindlæs application error sider efter 5 sekunder.</label><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfPageTitle"/><label for="fbfConfPageTitle">Fjern "Facebook |" fra titel på alle sider.</label><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfUpdates"/><label for="fbfConfUpdates">Check Userscripts.org dagligt for opdateringer til Facebook Fixer. eller <a href="#" id="fbfUpdateLink" onclick="return false;">check nu</a> .</label><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfRedirects"/><label for="fbfConfRedirects">Fjern "redirects" fra externe links.</label><br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfTopBarFixed"/><label for="fbfConfTopBarFixed">Behold top menu på skærmen, selv når du scroller ned.</label><br />'+
		' &nbsp; &nbsp; &nbsp; <span class="fbfLabel" style="line-height:20px !important;">Top menu gennemsigtig: </span><br />'+
		' &nbsp; &nbsp; &nbsp; <input type="radio" name="fbfConfTopBarOpacity" id="fbfConfTopBarOpacity10" value="1.0" /><label for="fbfConfTopBarOpacity10">Ingen</label> <input type="radio" name="fbfConfTopBarOpacity" id="fbfConfTopBarOpacity09" value="0.9" /><label for="fbfConfTopBarOpacity09">Lav</label> <input type="radio" name="fbfConfTopBarOpacity" id="fbfConfTopBarOpacity075" value="0.75" /><label for="fbfConfTopBarOpacity075">Medium</label> <input type="radio" name="fbfConfTopBarOpacity" id="fbfConfTopBarOpacity05" value="0.5" /><label for="fbfConfTopBarOpacity05">Høj</label> <input type="radio" name="fbfConfTopBarOpacity" id="fbfConfTopBarOpacity03" value="0.3" /><label for="fbfConfTopBarOpacity03">Meget Høj</label> <input type="radio" name="fbfConfTopBarOpacity" id="fbfConfTopBarOpacity00" value="0.0" /><label for="fbfConfTopBarOpacity00">Usynlig</label> <br />'+
		' &nbsp; &nbsp; &nbsp; <span class="fbfLabel" style="line-height:20px !important;">Bund menu gennemsigtig: </span><br />'+
		' &nbsp; &nbsp; &nbsp; <input type="radio" name="fbfConfBottomBarOpacity" id="fbfConfBottomBarOpacity10" value="1.0" /><label for="fbfConfBottomBarOpacity10">Ingen</label> <input type="radio" name="fbfConfBottomBarOpacity" id="fbfConfBottomBarOpacity09" value="0.9" /><label for="fbfConfBottomBarOpacity09">Lav</label> <input type="radio" name="fbfConfBottomBarOpacity" id="fbfConfBottomBarOpacity075" value="0.75" /><label for="fbfConfBottomBarOpacity075">Medium</label> <input type="radio" name="fbfConfBottomBarOpacity" id="fbfConfBottomBarOpacity05" value="0.5" /><label for="fbfConfBottomBarOpacity05">Høj</label> <input type="radio" name="fbfConfBottomBarOpacity" id="fbfConfBottomBarOpacity03" value="0.3" /><label for="fbfConfBottomBarOpacity03">Meget Høj</label> <input type="radio" name="fbfConfBottomBarOpacity" id="fbfConfBottomBarOpacity00" value="0.0" /><label for="fbfConfBottomBarOpacity00">Usynlig</label> <br />'+
		' &nbsp; &nbsp; <input type="checkbox" id="fbfConfShortcuts"/><label for="fbfConfShortcuts">Tilføj tastatur genveje. (Se <a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">listen</a>)<div id="fbfKeyboardShortcutsList"><br /><b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - Facebook Fixer configuration<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by Facebook Fixer<br /><br /><i>From the home page</i>:<br />&nbsp;<b>f</b> or <b>l</b> - Live feed<br />&nbsp;<b>i</b> - Posted items<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Back to album<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends<br /></div></label><br />'+
		'<br /><hr /><div style="text-align:right;"><input type="button" id="fbfCloseConfig" value="Gem" /></div>'+
		'</div>', true
	);
	for (var i=0; i<booleanOptions.length; i++) {
		if (prefs[booleanOptions[i]]) { $('fbfConf'+booleanOptions[i]).checked='checked'; }
		onClick('fbfConf'+booleanOptions[i], function(e) {
			GM_setValue(id+'-'+e.target.id.replace('fbfConf',''), e.target.checked);
			prefs[e.target.id.replace('fbfConf','')] = e.target.checked;
		});
	}
	$('fbfConfPopupPosition' + prefs['PopupPosition']).checked='checked';
	var positions = new Array('Auto','Left','Right');
	for (var i=0; i<positions.length; i++) {
		onClick('fbfConfPopupPosition'+positions[i], function(e) {
			GM_setValue(id+'-PopupPosition', e.target.id.replace('fbfConfPopupPosition',''));
			e.target.blur();
		});
	}
	
	$('fbfConfBottomBarOpacity' + prefs['BottomBarOpacity'].replace('.','')).checked='checked';
	$('fbfConfTopBarOpacity' + prefs['TopBarOpacity'].replace('.','')).checked='checked';
	var opacities = new Array('10','09','075','05','03','00');
	for (var i=0; i<opacities.length; i++) {
		onClick('fbfConfBottomBarOpacity'+opacities[i], function(e) { GM_setValue(id+'-BottomBarOpacity', e.target.value); e.target.blur(); });
		onClick('fbfConfTopBarOpacity'+opacities[i], function(e) { GM_setValue(id+'-TopBarOpacity', e.target.value); e.target.blur(); });
	}
	
	$('fbfConfGoogleAppsDomain').value = prefs['GoogleAppsDomain'];
	$('fbfConfGoogleAppsDomain').addEventListener('keyup', function(e) {
			GM_setValue(id+'-GoogleAppsDomain', e.target.value);
			prefs['GoogleAppsDomain'] = e.target.value;
	}, false);
	onClick('fbfUpdateLink', function() { GM_log('checking for update'); FBFUpdateCheck(true); });
	onClick('fbfCloseConfig', function() { hidePopup(); for (var i=0; i<booleanOptions.length; i++) { GM_log(booleanOptions[i] + ' - ' + prefs[booleanOptions[i]]); } });
	onClick('fbfKeyboardShortcutsLink', function() { $('fbfKeyboardShortcutsList').style.display = $('fbfKeyboardShortcutsList').style.display == 'block' ? 'none' : 'block'; });
	window.scroll(0,0);
}

//
// Check for Updates (originally based on code by Jarett - http://userscripts.org/users/38602)
//
function FBFUpdateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/45141?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {showUpdatePopup();} else if (forced) {alert("Ingen opdateringer til Facebook Fixer.");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}}
if (prefs['Updates']) { FBFUpdateCheck(false); }
function showUpdatePopup() {
	showPopup(''+
		'<div id="fbfUpdatePopup" class="fbfPopup"><div class="fbfImportant">Der er en opdatering til facebook fixer</div>Vil du opdatere nu?<br /><br /><div class="fbfNote">(Opdatering kan deaktiveres i indstillingerne)</div><br /><div class="fbfRight">'+
		'<input type="button" value="Opdater nu" id="fbfUpdateInstall" /> '+
		'<input type="button" value="Gå til hjemmeside" id="fbfUpdateHomepage" /> '+
		'<input type="button" value="Påmindelse i morgen" id="fbfUpdateTomorrow" /></div></div>', true
	);
	onClick('fbfUpdateInstall', function() { GM_openInTab('http://userscripts.org/scripts/source/45141.user.js'); hidePopup(); });
	onClick('fbfUpdateHomepage', function() { window.open('http://userscripts.org/scripts/show/45141'); hidePopup(); });
	onClick('fbfUpdateTomorrow', hidePopup);
}

//
// Add thumbnails from the specified page in an album
//
function appendPhotos(pageNumber) {
	var req = new XMLHttpRequest();
	req.open("GET", (page.indexOf('page=')!=-1 ? page.replace(/page=\d+/,'page='+pageNumber) : page+'&page='+pageNumber) + '&quickling', true);
	req.send(null);
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				albumPagesLoaded++;
				GM_log('albumPagesLoaded increased to ' + albumPagesLoaded);
				GM_log('loaded ' + albumPagesLoaded + ' out of ' + totalAlbumPages);
				var sub = req.responseText.match(/UIPhotoGrid_Table[^>]+>(.*?)<\\\/table>/)[1];
				var buf = sub.replace(/\\/g,'').split(/<tr>/g);
				var table = document.createElement('table');
				table.className="UIPhotoGrid_Table";
				html = '';
				for (var i=1; i<buf.length; i++) { html = html + '<tr>' + buf[i]; }
				var tbody = document.getElementsByClassName('UIPhotoGrid_Table')[0].firstChild;
				tbody.innerHTML = tbody.innerHTML.replace(/ fbf/g,'') + html; // need to add mouseover listeners again
				if (albumPagesLoaded==totalAlbumPages) { document.getElementById('fbf_photo_pagination').innerHTML = 'full album loaded'; }
				if (prefs['AutoBigAlbumPictures']) { click(document.evaluate("//a[contains(string(),'Show Big Pictures')][1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue); }
			}
		}
	}
}

//
// Un-Round profile pictures
//
if (!prefs['RoundedProfilePics']) { GM_addStyle('.UIRoundedImage_Corners { display:none ! important; }'); }

//
// Top Bar Positioning
//
if (prefs['TopBarFixed']) { GM_addStyle(' #menubar_container { background:none !important; position:fixed !important; width:100% !important; } #fb_menubar { position:relative !important; margin:0 auto !important; }'); }

//
// Top Bar Transparency
//
if (prefs['TopBarOpacity']!='1.0') {
	if (prefs['TopBarOpacity'] == '0.0') { GM_addStyle(' #menubar_container { display:none; } #content > div { padding-top:10px; }'); }
	else { GM_addStyle(' #menubar_container { opacity:' + prefs['TopBarOpacity'] + '; }'); }
}

//
// Bottom Bar Transparency
//
if (prefs['BottomBarOpacity']!='1.0') {
	if (prefs['BottomBarOpacity'] == '0.0') { GM_addStyle(' #presence { display:none; }'); }
	else { GM_addStyle(' #presence { opacity:' + prefs['BottomBarOpacity'] + '; }'); }
}

//
// Check if anything needs to be done
//
function processPage() {
	
	if (true) {
		
		//
		// Check for "auto growers" and handle them - don't let things slow down
		//
		var autoGrows = document.evaluate("//textarea[contains(@class,'DOMControl_placeholder')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
		if (autoGrows.snapshotLength > 0) {
			for (i=0; i<autoGrows.snapshotLength; i++) {
				handleAutoGrower(autoGrows.snapshotItem(i));
			}
		}
		var autoGrows = document.evaluate("//textarea[contains(@class,'UIComposer_TextArea')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
		if (autoGrows.snapshotLength > 0) {
			for (i=0; i<autoGrows.snapshotLength; i++) {
				handleAutoGrower(autoGrows.snapshotItem(i));
			}
		}
		if ($('message')) { handleAutoGrower($('message')); }
		
		
		//
		// Make sure we're listening
		//
		if (!listening) {
			Date.prototype.getNextDay=function(){var nextDay=new Date(); nextDay.setTime(this.getTime()+86400000); return nextDay; }
			Date.prototype.before=function(date){if(!date)date=new Date(); return this.getTime()<date.getTime();}
			Date.prototype.past=function(date){if(!date)date=new Date(); date.setYear(this.getFullYear()); return this.getTime()<date.getTime();}
			Date.prototype.getAge=function(){var now=new Date(); return this.past(new Date())?now.getFullYear()-this.getFullYear():now.getFullYear()-this.getFullYear()-1;}
			Date.prototype.toISOString=function(includeTime){return ''+this.getFullYear()+$0(this.getMonth()-0+1)+$0(this.getDate())+(includeTime?'T'+$0(this.getHours())+$0(this.getMinutes())+$0(this.getSeconds()):'');}
			Date.prototype.getSign=function(){var signs=new Array("Capricorn","Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius"); var endDates=new Array(19,18,20,19,20,21,22,22,22,22,21,21); return signs[this.getDate()>endDates[this.getMonth()]?(this.getMonth()+1)%12:this.getMonth()];}
			Date.prototype.format = function() {
				var monthNames = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
				return monthNames[this.getMonth()] + ' ' + this.getDate() + ', ' + this.getFullYear();
			}
			try {
				document.getElementById('content').addEventListener('DOMNodeInserted', processPage, false);
				listening = true;
			}
			catch(x) {}
		}

		//
		// Figure out what page we're looking at
		//
		loc = window.location.href.toLowerCase();
		page = loc.split('facebook.com/')[1];
		if (page.indexOf('#')!=-1) { page = page.split('#/')[1]; }
		if (page != lastPage && prefs['PopupAutoClose'] && $('FBPPdiv')) {
			$('FBPPdiv').style.display = 'none';
			lastPage = page;
		}
		//GM_log('Page => ' + page); // DEBUG ONLY
		
		//
		// Customize Home Page
		//
		if (page.indexOf('home.php')!=-1) {
			try {
				if (homePageNotModified) {
					var style = '';
					var style2 = '';
					if (!prefs['HomeFilterList']) {
						style = style + '#home_filter_list { display:none; } #home_stream { padding-left:0; }';
						style2 = '#home_stream { width:' + (document.defaultView.getComputedStyle($('home_stream'), null).width.replace('px','')-0+143) + 'px; }';
					}
					if (!prefs['HomeRightColumn']) {
						style = style + '#home_sidebar { display:none; } #home_stream { padding-right:0; }';
						style2 = '#home_stream { width:' + (document.defaultView.getComputedStyle($('home_stream'), null).width.replace('px','')-0+270) + 'px; } #home_left_column { width:100%; }';
					}
					if (!prefs['HomeFilterList'] && !prefs['HomeRightColumn']) { style2 = '#home_left_column, #home_stream { width:100%; }'; }
					if (!prefs['HomeHighlights']) { style = style + ' #home_sidebar .UIHotStream { display:none; }'; }
					if (!prefs['HomePokes']) { style = style + ' #home_sidebar .pokes { display:none; }'; }
					if (!prefs['HomePeopleYouMayKnow']) { style = style + ' #home_sidebar .pymk { display:none; }'; }
					if (!prefs['HomeFindFriends']) { style = style + ' #home_sidebar .findfriends { display:none; }'; }
					if (style) {
						style = style + style2 + ' .UIIntentionalStory_Message { width:96%; }';
						GM_addStyle(style.replace(/;/g,' ! important'));
					}
					homePageNotModified = false;
				}
				if (!prefs['HomeHighlights']) {
					$x1('//div[@id="home_sidebar"]//span[contains(string(),"Highlights")][1]').parentNode.parentNode.parentNode.style.display="none";
				}
				if (!prefs['HomePeopleYouMayKnow']) {
					$x1('//div[@id="home_sidebar"]//span[contains(string(),"People You May Know")][1]').parentNode.parentNode.parentNode.style.display="none";
				}
			} catch(x) { GM_log('HOME Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
		}

		//
		// Fix redirecting links
		//
		if (prefs['Redirects']) {
			for (i=0; i<document.links.length; i++) {
				if (document.links[i].className.match(/\bfbf\b/)) { continue; }
				if (m = document.links[i].href.match(/\/(note|share)_redirect\.php\?.*url=([^&]+)/)) {
					document.links[i].href = unescape(m[2]);
					document.links[i].className = document.links[i].className + ' fbf';
				}
				if (m = document.links[i].href.match(/\/share.php\?.*sid=/) && document.links[i].title.match(/^http:\/\//)) {
					document.links[i].href = document.links[i].title;
					document.links[i].className = document.links[i].className + ' fbf';
				}
			}
		}

		//
		// Show popup pictures
		//
		if (prefs['ProfilePicPopup'] || prefs['PhotoPopup']) {
			try {
				function addListeners(node) {
					node.className = node.className + ' fbf';
					if (prefs['SmallPicBorder']) { node.style.border = '1px solid ' + popupIdentifierBorderColor; }
					node.addEventListener('mouseover', function(e) {
						if (e.shiftKey || e.ctrlKey || e.altKey) { return; }
						var oldSrc;
						var newSrc;
						if (node.tagName.toLowerCase() == 'div') { oldSrc = this.style.backgroundImage.match(/url\((.*)\)/)[1]; }
						else if (node.tagName.toLowerCase() == 'span') { oldSrc = node.firstChild.src; }
						else  { oldSrc = this.src; }
						newSrc = oldSrc.replace(/\/[aqst]([\d_]+)\.jpg/, "/n$1.jpg").replace(/\/([\d_]+)[aqst]\.jpg/, "/$1n.jpg");
						if (m = newSrc.match(/\/n(\d+)_\d+\.jpg/)) { profileLink = 'http://www.facebook.com/profile.php?id=' + m[1]; }
						else if (node.parentNode.href) { profileLink = node.parentNode.href; }
						else if (node.parentNode.parentNode.href) { profileLink = node.parentNode.parentNode.href; }
						$('FBPPimg').innerHTML = '<a href="' + profileLink + '"><img src="' + newSrc + '" alt="Loading Pic..." /></a>';
						$('FBPPdiv').style.display = 'block';
						$('FBPPdiv').className = 'fbfPopup FBPPdiv' + (prefs['PopupPosition'] == 'Auto' ? (e.pageX>document.body.clientWidth/2 ? 'Left' : 'Right') : prefs['PopupPosition']);
					}, false);
					if (prefs['PopupAutoClose']) {
						node.addEventListener('mouseout', function(e) {
							if (!e.shiftKey && !e.ctrlKey && !e.altKey) { document.getElementById('FBPPdiv').style.display = 'none'; }
						}, false);
					}
				}
				var images = document.getElementById('content').getElementsByTagName('img');
				for (i=0; i<images.length; i++) {
					if ((images[i].src.match(/\/[aqst]|_[aqst]\.jpg/) && images[i].className.indexOf('fbf')==-1 && images[i].className.indexOf('UIRoundedImage')==-1) // The UIRoundedImage part is for the new layout
						&& ((images[i].src.indexOf('://profile.')!=-1 && prefs['ProfilePicPopup'])
							|| (prefs['PhotoPopup'] && images[i].src.indexOf('://photos-')!=-1 && ((images[i].parentNode.href && images[i].parentNode.href.indexOf('/photos.php?')==-1) || (images[i].parentNode.parentNode.href && images[i].parentNode.parentNode.href.indexOf('/photos.php?')==-1))))) {
						addListeners(images[i]);
					}
				}
				if (prefs['PhotoPopup']) {
					var divs = document.evaluate("//div[@class='UIMediaItem_ImageBackground']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
					for (i=0; i<divs.snapshotLength; i++) {
						addListeners(divs.snapshotItem(i));
					}
				}
				if (prefs['ProfilePicPopup']) {
					var spans = document.evaluate("//span[contains(@class,'UIRoundedImage')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
					for (i=0; i<spans.snapshotLength; i++) {
						if (spans.snapshotItem(i).className.indexOf('fbf')==-1 && spans.snapshotItem(i).className.indexOf('UIRoundedImage_Corners')==-1) { addListeners(spans.snapshotItem(i)); }
					}
					images = document.evaluate("//img[contains(@class,'photo_story_primary')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
					for (i=0; i<images.snapshotLength; i++) {
						if (images.snapshotItem(i).className.indexOf('fbf')==-1) { addListeners(images.snapshotItem(i)); }
					}
					var divs = document.evaluate("//div[@class='status_image']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
					for (i=0; i<divs.snapshotLength; i++) {
						addListeners(divs.snapshotItem(i));
					}
				}
			} catch(x) { GM_log('BPP Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
		}
		
		//
		// Show big album pictures
		//
		function addBigAlbumPicLinks(x, parent, className, container, showPipe) {
			// x allows multiple links on a page, link is added to parent with a class of className, images are found in container
			if (document.getElementById('fbfbaplink'+x)) { return; }
			var albumLink = document.createElement('a');
			albumLink.id = 'fbfbaplink'+x;
			appendChild(albumLink, parent);
			albumLink.innerHTML = 'Show Big Pictures';
			if (className!='') { albumLink.className = className; }
			albumLink.addEventListener('click', function() {
				var images = container.getElementsByTagName('img');
				var buf = '';
				for (i=0; i<images.length; i++) {
					buf+= '<a href="' + images[i].parentNode.href + '">'+
						'<img src="' + images[i].src.replace(/\/s([\d_]+)\.jpg/, '/n$1.jpg').replace(/\/([\d_]+)s\.jpg/, '/$1n.jpg') + '"' + (images[i].getAttribute('title')!=null ? ' title="' + images[i].getAttribute('title') + '"' : '') + ' />'+
						'</a>';
				}
				hidePopup();
				showPopup('<div id="FBFBigAlbumContainer"><div id="FBFBigAlbum" class="fbfPopup"><div id="FBFBigAlbumClose1" class="FBFBigAlbumClose">close</div>' + buf + '<div id="FBFBigAlbumClose2" class="FBFBigAlbumClose">close</div></div></div>', false);
				onClick('FBFBigAlbumClose1', hidePopup);
				onClick('FBFBigAlbumClose2', hidePopup);
			}, false);
			if (showPipe) {
				var pipe = document.createElement('span');
				pipe.id = 'fbfbappipe'+x;
				pipe.className = 'pipe';
				pipe.innerHTML = '|';
				albumLink.parentNode.insertBefore(pipe, albumLink);
			}
			if (prefs['AutoBigAlbumPictures']) { click(albumLink); }
		}
		if (prefs['BigAlbumPictures']) {
			if (page.match(/^album.php/) || page.match(/^photo_search.php/) || page.match(/^profile.php\?.*\bv=photos/) || page.match(/^pages\/.*\?.*\bv=photos/)) {
				try {
					var parents;
					if (page.indexOf('album.php')!=-1) {
						parents = document.evaluate("//div[@id='content']//div[@class='summary'][1]/*[1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
						addBigAlbumPicLinks(0, parents, '', document.getElementById('album_container'), true);
					} else if (page.indexOf('profile.php')!=-1) {
						parents = document.evaluate("//div[@id='tab_canvas']//h3[1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
						var container = document.getElementById('photosofme_wrapper') ? document.getElementById('photosofme_wrapper') : document.getElementById('photos_of_wrapper');
						addBigAlbumPicLinks(0, parents, 'normal_size', container, true);
					} else if (page.indexOf('pages/')!=-1) {
						parents = document.evaluate("//div[contains(@class,'photos_header_actions')][contains(string(),'Fan Photos')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
						var container = document.getElementById('photos_of_wrapper');
						addBigAlbumPicLinks(0, parents, 'normal_size', container, true);
					} else {
						parents = document.evaluate("//div[contains(@class,'sectiontype')]/h3",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE ,null);
						if (parents.snapshotLength>0) {
							for (i=0; i<parents.snapshotLength; i++) { addBigAlbumPicLinks(i, parents.snapshotItem(i), '', parents.snapshotItem(i).parentNode.nextSibling, true); }
						} else {
							parents = document.evaluate("//div[contains(@class,'summary_bar')][1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
							addBigAlbumPicLinks(0, parents, '', document.getElementById('album'), false);
						}
					}
				} catch(x) { GM_log('BAP Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
			} else if (page.match(/^profile.php\?.*\bv=info/) && document.getElementById('fbfbaplink0')) {
				document.getElementById('fbfbaplink0').parentNode.removeChild(document.getElementById('fbfbaplink0'));
				document.getElementById('fbfbappipe0').parentNode.removeChild(document.getElementById('fbfbappipe0'));
			}
		}
		
		//
		// Add calendar features to Events pages
		//
		if ((prefs['GoogleCalendar'] || prefs['iCalendar']) && page.indexOf('events.php')==0) {
			//var months = {'January':'01', 'February':'02', 'March':'03', 'April':'04', 'May':'05', 'June':'06', 'July':'07', 'August':'08', 'September':'09', 'October':'10', 'November':'11', 'December':'12'};
			if (prefs['iCalendar'] && page.indexOf('events.php?bday=1')==0) {
				try {
					var elm = document.evaluate("//div[contains(@class,'summary_bar')][1]/div[@class='summary'][1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
					if (elm!=null) {
						if (elm.className.indexOf('fbfcal')!=-1) { return; }
						elm.className = elm.className + ' fbfcal';
						elm.innerHTML = elm.innerHTML + ' | <a href="#" id="fbfical">Export iCalendar file</a> (This will take a while if you have a lot of friends)';
						document.getElementById('fbfical').addEventListener('click', function(e) {
							if (e.target.href.match(/#$/)) {
								var now = new Date();
								var day = now.getDate();
								var month = now.getMonth()+1;
								var year = now.getFullYear();
								var divs = document.evaluate("//div[@class='bdaycal_month_section']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE ,null);
								var ical = 'BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0APRODID:Facebook Fixer%0D%0A';
								var eventMonth;
								var date;
								var days;
								var bdays;
								for (i=0; i<divs.snapshotLength; i++) {
									//eventMonth = months[divs.snapshotItem(i).id]; // OBSOLETE
									eventMonth = $m(divs.snapshotItem(i).id)+1+'';
									if (eventMonth<10) { eventMonth = '0' + eventMonth; }
									days = divs.snapshotItem(i).innerHTML.replace(/.*<\/table>/,'').split(/<br[^>]*>/g);
									for (j=0; j<days.length; j++) {
										if (m = days[j].match(/^(\d+)/)) {
											bdays = days[j].split(',');
											for (k=0; k<bdays.length; k++) {
												if (n = bdays[k].match(/[^>]+>([^<]+)/)) {
													date = ((eventMonth < month || (eventMonth == month && m[1] < day)) ? year-0+1 : year) + eventMonth + m[1];
													ical = ical + 'BEGIN:VEVENT%0D%0ASUMMARY:' + (prefs['CalendarFullName'] ? n[1] : n[1].split(' ')[0]) + '\'s Birthday%0D%0ADESCRIPTION:' + n[1] + '\'s Birthday%0D%0ADTSTART:' + date + '%0D%0ADTEND:' + date + '%0D%0ARRULE:FREQ=YEARLY%0D%0AEND:VEVENT%0D%0A';
												}
											}
										}
									}
								}
								e.target.href = 'data:text/calendar;charset=US-ASCII,' + ical + 'END:VCALENDAR';
							}
						}, false);
						document.getElementById('fbfical').addEventListener('nothing', function(e) {
						}, false);
					}
				} catch(x) { GM_log('CAL Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
			} else if (prefs['GoogleCalendar'] && page.indexOf('events.php?archive=1')!=0) {
				var divs = $x("//div[contains(@class,'partyrow')]");
				var now = new Date();
				var year = now.getFullYear();
				var div;
				if (divs.snapshotLength>0) {
					for (var i=0; i<divs.snapshotLength; i++) {
						div = divs.snapshotItem(i);
						var tds = div.getElementsByTagName('td');
						for (var j=0; j<tds.length; j++) {
							if (tds[j].className == 'actions' && tds[j].innerHTML.indexOf('class="calLink"')==-1) {
								h = div.innerHTML;
								title = h.match(/class="etitle">([^<]+)</i)[1];
								where = h.match(/Where:<\/td><td>(.+?)<\/td/i)[1];
								when = h.match(/When:<\/td><td>(.+?)<\/td/i)[1];
								host = h.match(/Hosted by:<\/td><td>(.+?)<\/td/i)[1];
								var startDate, endDate;
								if (m = when.match(/^(.*)<.+?>(.*)$/)) {
									startDate = $d(m[1]);
									endDate = $d(m[2]);
								}
								else if (m = when.match(/(.*)( \d\d?:\d\d ?(am|pm)?).*( \d\d?:\d\d ?(am|pm)?)/)) {
									startDate = $d(m[1]+m[2]);
									endDate = $d(m[1]+m[4]);
									if (endDate!=null && endDate.before(startDate)) { endDate=endDate.getNextDay(); }
								}
								if (startDate==null || endDate==null) return;
								var calLink = document.createElement('a');
								calLink.innerHTML = 'Add to Calendar';
								calLink.className = 'calLink';
								calLink.href = 'http://www.google.com/calendar/' + (prefs['GoogleApps'] && prefs['GoogleAppsDomain']!='' ? 'hosted/'+prefs['GoogleAppsDomain']+'/' : '') + 'event?action=TEMPLATE&text=' + title + '&dates=' + startDate.toISOString(true) + '/' + endDate.toISOString(true) + '&location=' + where + '&details=Hosted by ' + host;
								appendChild(calLink, tds[j]);
								break;
							}
						}
					}
				}
			}
		}
		
		//
		// Show birthday info and Google Calendar link
		//
		if ((prefs['Age'] || prefs['Sign'] || prefs['GoogleCalendar']) && page.match(/^profile.php/)) {
			try {
				var bdayNode = document.evaluate("//div[@class='birthday'][1]/dd",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
				if (bdayNode != null) {
					if (bdayNode.className!='fbfbday') {
						bdayNode.className='fbfbday';
						var info = '';
						var now = new Date();
						var bday = $d(bdayNode.innerHTML);
						if (bday!=null)  {
							var past = bday.past();
							if (prefs['Age']) { if (now.getFullYear()!=bday.getFullYear()) { info = info + '<br />' + bday.getAge() + ' years old'; } }
							if (prefs['Sign']) { info = info + '<br /><span id="FBFsign">' + bday.getSign() + '</span>'; }
							if (prefs['GoogleCalendar']) {
								var thisYearBday = new Date();
								thisYearBday.setTime(bday.getTime());
								thisYearBday.setYear(past ? now.getFullYear()-0+1 : now.getFullYear());
								var name = document.getElementById('profile_name').innerHTML;
								info = info + '<br /><a href="http://www.google.com/calendar/' + (prefs['GoogleApps'] && prefs['GoogleAppsDomain']!='' ? 'hosted/'+prefs['GoogleAppsDomain']+'/' : '') + 'event?action=TEMPLATE&text=' + (prefs['CalendarFullName'] ? name : name.split(' ')[0]) + '\'s Birthday&dates=' + thisYearBday.toISOString() + '/' + thisYearBday.getNextDay().toISOString() + '&details=' + name + '\'s Birthday' + (prefs['CalendarBirthDate'] && now.getFullYear()!=bday.getFullYear() ? ' - ' + bday.format() : '') + '">Add to Google Calendar</a>';
							}
							bdayNode.innerHTML = bdayNode.innerHTML + info;
						}
					}
				}
			} catch(x) { GM_log('AGE/CAL Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
		}
		
		//
		// Show video download link
		//
		if (prefs['DownloadVideo'] && page.match(/^video\/video.php\?.*v=/)) {
			try {
				var parent = document.evaluate("//div[@id='video_actions']/ul[@class='actionspro'][1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
				if (parent.innerHTML.indexOf('Download Video')==-1) {
					var embed = document.evaluate("//div[@class='mvp_holder'][1]/embed[1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
					var link = document.createElement('li');
					link.innerHTML = '<a href="' + unescape(embed.getAttribute('flashvars')).match(/video_src=([^&]*)/)[1] + '" title="Download this video" />Download Video</a>';
					parent.insertBefore(link, parent.lastChild.nextSibling);
				}
			} catch(x) { GM_log('VID Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
		}
		
		//
		// Change page title
		//
		if (prefs['PageTitle'] && document.title.indexOf('Facebook |')!=-1) { document.title = document.title.replace('Facebook |', ''); }
		
		
		//
		// Reload Error Page
		//
		if (prefs['ErrorPageReload'] && $('content') && $('content').innerHTML.toLowerCase().indexOf('error while loading page from')!=-1 && $('try_again_button')) {
			tryAgainButton=$('try_again_button');
			if (tryAgainButton.className.indexOf('autoreload')==-1) {
				tryAgainButton.className = tryAgainButton.className + ' autoreload';
				tryAgainButton.value = 'Click to Try Again, or wait 5 seconds';
				setTimeout("if (document.getElementById('try_again_button')) { window.location.reload(); }", 5000);
			}
		}
		
		//
		// Add Protocol Links
		//
		if (prefs['ProtocolLinks'] && page.match(/profile\.php\?id=.*&v=info/) && $('info_section_info_contact') && $('info_section_info_contact').className.indexOf('fbfhandled')==-1) {
			try {
				$('info_section_info_contact').className = $('info_section_info_contact').className + ' ' + 'fbfhandled';
				var dds = $('info_section_info_contact').getElementsByTagName('dd');
				var dts = $('info_section_info_contact').getElementsByTagName('dt');
				for (var i=0; i<dds.length; i++) {
					if (dts[i].innerHTML == 'Skype:') { dds[i].innerHTML = '<a href="skype:' + dds[i].innerHTML + '?call" title="Call ' + dds[i].innerHTML + ' using Skype">' + dds[i].innerHTML + '</a>'; }
					if (dts[i].innerHTML == 'Windows Live:') { dds[i].innerHTML = '<a href="msnim:chat?contact=' + dds[i].innerHTML + '" title="Chat with ' + dds[i].innerHTML + ' using Windows Live">' + dds[i].innerHTML + '</a>'; }
					if (dts[i].innerHTML == 'Yahoo:') { dds[i].innerHTML = '<a href="ymsgr:sendIM?' + dds[i].innerHTML + '" title="Chat with ' + dds[i].innerHTML + ' using Yahoo Messenger">' + dds[i].innerHTML + '</a>'; }
					if (dts[i].innerHTML == 'Google Talk:') { dds[i].innerHTML = '<a href="xmpp:' + dds[i].innerHTML + '" title="Chat with ' + dds[i].innerHTML + ' using Google Talk">' + dds[i].innerHTML + '</a>'; }
				}
			} catch(x) { GM_log('PROTO Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
		}
		
		//
		// Load thumbnails for entire album
		//
		function loadFullAlbum() {
			try {
				var pages = document.evaluate("//div[@class='pagerpro_container'][1]//a",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE ,null);
				if (pages.snapshotLength>2) {
					pages.snapshotItem(0).parentNode.parentNode.id = 'fbf_photo_pagination';
					pages.snapshotItem(0).parentNode.parentNode.innerHTML = 'loading full album...';
					albumPagesLoaded = 0;
					totalAlbumPages = 0;
					if (m=page.match(/page=(\d)/)) { thisPageNumber=m[1]; } else { thisPageNumber=1; }
					for (i=0; i<pages.snapshotLength; i++) {
						if ((!pages.snapshotItem(i).className.match(/\bfbf\b/)) && (m=pages.snapshotItem(i).innerHTML.match(/(\d)/)) && m[1]!=thisPageNumber) {
							totalAlbumPages++;
							GM_log('totalAlbumPages increased to ' + totalAlbumPages);
							pages.snapshotItem(i).className = pages.snapshotItem(i).className + ' fbf';
							appendPhotos(m[1]);
						}
					}
				}
			} catch(x) { GM_log('LOADFULL Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
		}
		if (page.match(/^album.php?.*aid=[^-]/)) {
			if (prefs['AutoLoadFullAlbum']) {
				loadFullAlbum();
			} else {
				try {
					var pager = $x1("//ul[@class='pagerpro'][1]");
					if (pager && pager.className.indexOf(' fbfhandled')==-1) {
						pager.className = pager.className + ' fbfhandled';
						var loadAlbumLink = document.createElement('li');
						loadAlbumLink.innerHTML = '<a id="FBFLoadFullAlbum" href="#">all</a>';
						pager.insertBefore(loadAlbumLink, pager.lastChild.nextSibling);
						onClick('FBFLoadFullAlbum', function(e) {
							loadFullAlbum();
							e.stopPropagation();
							e.preventDefault();
						});
					}
				} catch(x) { GM_log('FULL Error! => ' + x.message + (x.description!=null ? '\n' + x.description : '')); }
			}
		}
	}
	
}


}) ();

// There are only 10 types of people in the world — those who understand ternary, those who don't, and those who mistake it for binary :)
