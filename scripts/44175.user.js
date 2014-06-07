// ==UserScript==
// @name           SVZ Homies
// @namespace      svzhomies
// @description    Macht dein SVZ auf Gangster-Style!
// @include        http://www.schuelervz.net/*
// @include        https://secure.schuelervz.net/*
// @include        http://www.studivz.net/*
// @include        https://secure.studivz.net/*
// @author         Eric + Tom
// @version        3.1
// @resource       jQueryUI             http://svzhomies.bplaced.de/jquery-ui.js
// ==/UserScript==

//This solves (almost) all of our problems!!
$ = unsafeWindow.$;

//Default settings
var settings = {
  feedback : 10,
  visitorsplus : 0,
  toldEveryone : false,
  h : -312,
	s : 0,
	b : 0,
	changeColor : true,
	replace : true,
  updateVersion : false,
  updateChangelog : false
};

//Load settings
for (setting in settings) {
  if (GM_getValue(setting) === undefined) {
    GM_setValue(setting, settings[setting]); }
  else {
    settings[setting] = GM_getValue(setting); }
}

settings.h = parseFloat(settings.h);
settings.s = parseFloat(settings.s);
settings.b = parseFloat(settings.b);

function saveSettings() {
  for (setting in settings) {
		if (GM_getValue(setting) != settings[setting]) {
			GM_setValue(setting, settings[setting]);
			console.log('Stored value ' + settings[setting] + ' in ' + setting);
		}
  }
}

setInterval(saveSettings, 40);

$('head').append('<script>' + GM_getResourceText('jQueryUI') + '</script>');

//Testing vars
var start = new Date();
var stops = { };

//Resources start
var version = '3.1';
var host = 'http://svzhomies.bplaced.de/';

//Feedback form html
var feedbackFormHtml = '<form id="Messages_WriteForm" class="obj-form" method="post" action=""><fieldset><div class="form-row"><label for="svzhomies-name">Name:</label><input type="text" maxlength="100" class="text" id="svzhomies-name" /> <br/> </div><div class="form-row"><label class="floatL" for="svzhomies-body">Nachricht:</label><textarea name="message" title="" cols="16" rows="8" id="svzhomies-body" style="height: auto;"/><br/> </div><p style="padding-left:137px; width:300px">Ein Link zu deinem Profil wird mitgesendet, damit ich dir antworten kann. Dieser ist aber nicht öffentlich sichtbar.</p><div id="write-message-buttonArea" class="form-buttons"><div><a class="link-face-button" id="svzhomies-sendfeedback">Abschicken!</a><a class="link-face-button" id="svzhomies-cancel">Abbrechen</a></div></div><br class="no-float"/></fieldset></form>';

var feedbackPromptHtml = '<p>Wie gefällt dir SVZ Homies? Hast du Verbesserungsvorschläge oder hast du Fehler gefunden? Schreib mir doch!</p><div><a href="javascript:;" class="link-face-button" id="svzhomies-yesfeedback">Jetzt schreiben!</a><a href="javascript:;" class="link-face-button" id="svzhomies-cancel">Nö :P</a></div><br class="no-float"/>';

var spreadPromptHtml = '<p>Du findest SVZ Homies cool? Erzähl doch deinen Freunden davon! Klick einfach eine Nachricht an, die du über den Buschfunk verschicken willst:</p>';

var spreadMessages = [
	'Mach dein SVZ auf Gangster-Style: http://svzhomies.bplaced.de',
	'Pink ist hässlich? Änder jetzt die Farbe im SVZ mit http://svzhomies.bplaced.de',
	'Homies statt Freunde, Küssen statt Gruscheln? Kein Problem: http://svzhomies.bplaced.de',
	'Gruscheln ist dir zu langweilig? Werde zum Küsser mit http://svzhomies.bplaced.de',
	'Sehr geehrte Damen und Herren! Bitte begeben Sie sich sofort auf http://svzhomies.bplaced.de!',
	'Ey du cooler Typ: Klick mal http://svzhomies.bplaced.de an!',
	'Willst du auch cool sein? Geh auf http://svzhomies.bplaced.de',
	'Schaut euch mal http://svzhomies.bplaced.de an!',
	'Deine Mudda benutzt SVZ Homies: http://svzhomies.bplaced.de'
]

//Replacements
var data = {
  navi: {
    home: 'Mein Block',
    mypage: 'Meine Seite',
    friends: 'Meine Homies',
    groups: 'Meine Gangs',
    privacy: 'Mein Intimbereich',
    search: 'homies schnüffeln',
    invite: 'homies rekrutieren',
    help: 'sos',
    logout: 'block verlassen',
    forpupils: 'Für die Insider',
    forparents: 'Für die Outsider',
    forpress: 'Fürn Postmann'
  },
  general: [{
    search: 'Freundes',
    replacement: 'Homies'
  },
  {
    search: 'Freunden',
    replacement: 'Homies'
  },
  {
    search: 'Freunde',
    replacement: 'Homies'
  },
  {
    search: new RegExp('Freund(?!in)'),
    replacement: 'Homie'
  },
  {
    search: 'Gruppenmitglied',
    replacement: 'Gangmitglied'
  },
  {
    search: 'Gruppen',
    replacement: 'Gangs'
  },
  {
    search: 'Gruppe',
    replacement: 'Gang'
  },
  {
    search: 'plaudern',
    replacement: 'labern'
  },
  {
    search: 'Plaudern',
    replacement: 'Labern'
  },
  {
    search: 'Freundes',
    replacement: 'Homies'
  },
  {
    search: 'Freundes',
    replacement: 'Homies'
  },
	{
    search: 'gruscheln',
    replacement: 'küssen'
  },
  {
    search: 'Gruscheln',
    replacement: 'Küssen'
  },
  {
    search: 'gegruschelt',
    replacement: 'geküsst'
  }],
  cancel: 'Scherz :P',
  searchfield: 'Schnüffeln',
  plauderkasten: 'Laberkasten',
  didyouknow: 'Diese Leute lieben dich',
  home: {
    title: 'Mein Block',
    welcome: 'Das ist dein Block! Hier bist du Gott! Außerdem siehst du, was deine Homies gerade hinterm Busch treiben und welche Trottel deine Seite angeschielt haben.'
  },
  buschfunk: {
    pagetitle: 'Ghettofunk',
    title: 'Ghettofunk',
    subtitle: 'Hier siehst du, was im Ghetto gefunkt wird..'
  },
  visitors: {
    title: 'Wer zuletzt deine Seite angeschielt hat',
    visitors: 'Schieler',
    visited: 'angeschielt'
  },
  friends: {
    pagetitle: 'Meine Homies',
    title: 'Alle Homies',
    search: 'Homies schnüffeln',
    online: 'Nur online Homies anzeigen'
  },
  delete_friend: {
    ok: 'Kein Homie mehr',
    cancel: 'Scherz :P'
  },
  groups: {
    pagetitle: 'Meine Gangs',
    title: 'Meine Gangs',
    search: 'Gangs schnüffeln'
  },
  group_leave: {
    ok: 'Scheiß auf die Gang!',
    cancel: 'Scherz :P',
    title : 'Gang verlassen'
  },
  profile: {
    microblog: 'chillt gerade bei',
    microblog_i: 'chill gerade bei'
  },
  pinboard: {
    post: 'Senf',
    title: 'Leute die unbedingt ihren Senf abgeben wollten:',
    write: 'Senf abgeben',
    posts: 'kg Senf'
  },
  privacy: {
    title: 'Mein Intimbereich'
  },
  pro_label: 'SVZ Homies Profi',
	gruschel_ok: 'Mit Zunge!',
	gruschel: 'Küssen'
};

//JS Replacements
if (settings.replace) {
	unsafeWindow.i18n._def.de.report_group = 'Diese Gang melden';
	unsafeWindow.i18n._def.de.error_microblog_limit = 'Stop! Der Ghettofunk ist kein Chat – Du hast Dein Limit für diese Stunde erreicht. Wenn Du mehr zu sagen hast, kannst Du den <a href="/Chat" >Laberkasten</a> oder den <a href="/Messages/WriteMessage" >Nachrichtendienst</a> nutzen.';
	unsafeWindow.i18n._def.de.gruscheln_head = 'Küssen';
	unsafeWindow.i18n._def.de.agree_gruscheln = 'Mit Zunge!';
	unsafeWindow.i18n._def.de.photos_no_more_friends_to_link_avz = 'Du hast keine Homies mehr zum Verlinken oder Deine Homies haben die Verlinkung noch nicht bestätigt.';
	unsafeWindow.i18n._def.de.photos_no_more_friends_to_link_svz = 'Du hast keine Homies mehr zum Verlinken oder Deine Homies haben die Verlinkung noch nicht bestätigt.';
	unsafeWindow.i18n._def.de.photos_no_more_friends_to_link_pvz = 'Du hast keine Homies mehr zum Verlinken oder Deine Homies haben die Verlinkung noch nicht bestätigt.';
	unsafeWindow.i18n._def.de.photos_unlink_album_message_svz = 'Möchtest Du die Verknüpfung zwischen Album und Gang wirklich aufheben?';
	unsafeWindow.i18n._def.de.photos_unlink_album_message_avz = 'Möchtest Du die Verknüpfung zwischen Album und Gang wirklich aufheben?';
	unsafeWindow.i18n._def.de.photos_unlink_album_message_pvz = 'Möchtest du die Verknüpfung zwischen Album und Gang wirklich aufheben?';
	unsafeWindow.i18n._def.de.photos_link_album_message_svz = 'Möchtest Du das Album wirklich mit der Gang verknüpfen?';
	unsafeWindow.i18n._def.de.photos_link_album_message_avz = 'Möchtest Du das Album wirklich mit der Gang verknüpfen?';
	unsafeWindow.i18n._def.de.photos_link_album_message_pvz = 'Möchtest du das Album wirklich mit der Gang verknüpfen?';
	unsafeWindow.i18n._def.de.error_recipient_not_found = 'Du hast keinen Homie, in dessen Namen ein „%%“ vorkommt.';
	unsafeWindow.i18n._def.de.chat_user_offline_input_avz = 'Dein Status ist "Offline".<br/>Wenn Du mit Homies labern möchtest,<br/>ändere Deinen Status auf "Online".';
	unsafeWindow.i18n._def.de.chat_user_offline_input_pvz = 'Dein Status ist "Offline".<br/>Wenn du mit Homies labern möchtest,<br/>ändere deinen Status auf "Online".';
	unsafeWindow.i18n._def.de.chat_user_offline_input_svz = 'Dein Status ist "Offline".<br/>Wenn Du mitHomies labern möchtest,<br/>ändere Deinen Status auf "Online".';
	unsafeWindow.i18n._def.de.chat_user_timeout_input_avz = 'Deine Sitzung ist abgelaufen.<br/>Bitte schließe den Laberkasten und<br/> logge Dich erneut ein.';
	unsafeWindow.i18n._def.de.chat_user_timeout_input_pvz = 'Deine Sitzung ist abgelaufen.<br/>Bitte schließe den Laberkasten und<br/> logge dich erneut ein.';
	unsafeWindow.i18n._def.de.chat_user_timeout_input_svz = 'Deine Sitzung ist abgelaufen.<br/>Bitte schließe den Laberkasten und<br/> logge Dich erneut ein.';
	unsafeWindow.i18n._def.de.chat_friends_nobody_online = 'Es sind keine Homies zum Labern online.';
	unsafeWindow.i18n._def.de.chat_initiate_msg_head = 'Mit einem Homie labern';
	unsafeWindow.i18n._def.de.chat_initiate_msg_useroffline = 'Dein Status ist "Offline". Um mit Homies plaudern zu können, wähle bitte den Status "Online".';
	unsafeWindow.i18n._def.de.chat_logout_msg_text_avz = 'Du hast noch ungelesene Nachrichten in Deinem Laberkasten. <br/>Wenn Du Dich jetzt abmeldest, wird der Laberkasten geschlossen<br/>und die Nachrichten gehen verloren.<br/>Möchtest Du Dich trotzdem abmelden?';
	unsafeWindow.i18n._def.de.chat_logout_msg_text_pvz = 'Du hast noch ungelesene Nachrichten in deinem Laberkasten. <br/>Wenn du dich jetzt abmeldest, wird der Laberkasten geschlossen<br/>und die Nachrichten gehen verloren.<br/>Möchtest du dich trotzdem abmelden?';
	unsafeWindow.i18n._def.de.chat_logout_msg_text_svz = 'Du hast noch ungelesene Nachrichten in Deinem Laberkasten. <br/>Wenn Du Dich jetzt abmeldest, wird der Laberkasten geschlossen<br/>und die Nachrichten gehen verloren.<br/>Möchtest Du Dich trotzdem abmelden?';
	unsafeWindow.i18n._def.de.chat_header_msg_friendOnline = 'Homie drin';
	unsafeWindow.i18n._def.de.chat_header_msg_friendsOnline = 'Homies drin';
	unsafeWindow.i18n._def.de.friendslists_delete_confirm_pvz = 'Möchtest du die Liste „%%“ wirklich löschen?<br />Die Homieschaften sind davon nicht betroffen – nur die Liste selbst wird gelöscht.';
	unsafeWindow.i18n._def.de.friendslists_delete_confirm_svz = 'Möchtest Du die Liste „%%“ wirklich löschen?<br />Die Homieschaften sind davon nicht betroffen – nur die Liste selbst wird gelöscht.';
	unsafeWindow.i18n._def.de.friendslists_delete_confirm_avz = 'Möchtest Du die Liste „%%“ wirklich löschen?<br />Die Homieschaften sind davon nicht betroffen – nur die Liste selbst wird gelöscht.';
	unsafeWindow.i18n._def.de.friendslists_create_title = 'Homiesliste erstellen';
	unsafeWindow.i18n._def.de.friendslists_rename_title = 'Homiesliste umbenennen';
	unsafeWindow.i18n._def.de.friendslists_one_remaining_list = 'Du kannst noch eine Homiesliste %%[erstellen]%%.';
	unsafeWindow.i18n._def.de.friendslists_two_remaining_lists = 'Du kannst noch %% Homieslisten %%[erstellen]%%.';
	unsafeWindow.i18n._def.de.friendslists_manage_title = 'Freunde in Liste „%%“ einordnen';
	unsafeWindow.i18n._def.de.friendslists_details_delete_title = 'Freund aus Homiesliste entfernen';
	unsafeWindow.i18n._def.de.friendslists_details_delete_confirm_pvz = 'Möchtest du %% wirklich aus der Homiesliste „%%“ entfernen?';
	unsafeWindow.i18n._def.de.friendslists_details_delete_confirm_svz = 'Möchtest Du %% wirklich aus der Homiesliste „%%“ entfernen?';
	unsafeWindow.i18n._def.de.friendslists_details_delete_confirm_avz = 'Möchtest Du %% wirklich aus der Homiesliste „%%“ entfernen?';
	unsafeWindow.i18n._def.de.friendslists_remaningFriendsInfo_single = 'Du kannst noch <span id="Mod-Friendslists-Data-RemainingFriends">%%</span> Homie hinzufügen.';
	unsafeWindow.i18n._def.de.friendslists_remaningFriendsInfo_multi = 'Du kannst noch <span id="Mod-Friendslists-Data-RemainingFriends">%%</span> Homies hinzufügen.';
	unsafeWindow.i18n._def.de.buschfunk_tabs_FRIEND_NEW = 'Homieschaften';
	unsafeWindow.i18n._def.de.buschfunk_noentries = 'Der Buschfunk schweigt: Im Moment liegen keine Einträge vor.';
	unsafeWindow.i18n._def.de.buschfunk_action_gruschel = 'labern';
	unsafeWindow.i18n._def.de.buschfunk_action_plauder = 'anlabern';
	unsafeWindow.i18n._def.de.groups_settings_albumdisable_title = 'Gangalben deaktivieren';
	unsafeWindow.i18n._def.de.groups_settings_albumdisable_message_svz = 'Möchtest Du wirklich, dass keine Fotoalben mit dieser Gang verknüpft werden können? Alle bereits verknüpften Alben werden dann aus der Gang entfernt.';
	unsafeWindow.i18n._def.de.groups_settings_albumdisable_message_avz = 'Möchtest Du wirklich, dass keine Fotoalben mit dieser Gang verknüpft werden können? Alle bereits verknüpften Alben werden dann aus der Gang entfernt.';
	unsafeWindow.i18n._def.de.groups_settings_albumdisable_message_pvz = 'Möchtest du wirklich, dass keine Fotoalben mit dieser Gang verknüpft werden können? Alle bereits verknüpften Alben werden dann aus der Gang entfernt.';
	unsafeWindow.i18n._def.de.gruscheln_content_avz = 'Möchtest Du %% küssen? %% bekommt dann beim nächsten Einloggen eine Kuss-Mitteilung.';
	unsafeWindow.i18n._def.de.gruscheln_content_svz = 'Möchtest Du %% küssen? %% bekommt dann beim nächsten Einloggen eine Kuss-Mitteilung.';
	unsafeWindow.i18n._def.de.gruscheln_content_pvz = 'Möchtest du %% küssen? %% bekommt dann beim nächsten Einloggen eine Kuss-Mitteilung.';
	unsafeWindow.i18n._def.de.gruschel_hide_all_content_avz = 'Möchtest Du wirklich alle Küsse ausblenden?';
	unsafeWindow.i18n._def.de.gruschel_hide_all_content_svz = 'Möchtest Du wirklich alle Küsse ausblenden?';
	unsafeWindow.i18n._def.de.gruschel_hide_all_content_pvz = 'Möchtest du wirklich alle Küsse ausblenden?';
	unsafeWindow.i18n._def.de.friendslists_delete_title = 'Homiesliste löschen';
	unsafeWindow.i18n._def.de.friendslists_create_title = 'Homiesliste erstellen';
	unsafeWindow.i18n._def.de.friendslists_rename_title = 'Homiesliste umbenennen';
	unsafeWindow.i18n._def.de.friendslists_addFriendToLists_title = '%% in Listen einordnen';
}

//Colors to replace
var origColors = [
	'c000000',
	'cffe0e0',
	'cdc1e64',
	'c0f8600',
	'c777777',
	'ccccccc',
	'ceeeeee',
	'c666666',
	'caaaaaa',
	'cff90b0',
	'cffffff',
	'cf8f8f8',
	'c999999',
	'cffc6c6',
	'cff8080',
	'cf7f7f7',
	'cff4070',
	'cff7799',
	'caa0000',
	'cf5f6f7',
	'ce5e5e5',
	'ce8e8e8',
	'c888888',
	'c228b22',
	'cffb0b0',
	'cf2f2f2',
	'ce5ecf9',
	'cd07070',
	'c904040',
	'c907070',
	'ce04060',
	'cfccaca',
	'cffffb2',
	'ce4ffcc',
	'cd00e0a',
	'ca9000a',
	'cee790f',
	'cbb4d04',
	'cdd1a71',
	'cbb0500',
	'cd8090d',
	'cf1393c',
	'cda6703',
	'cffa150',
	'cd7026a',
	'cfc3195',
	'cee0000',
	'ce6e6e6',
	'cb9b9b9',
	'cffe1e1',
	'cdddddd',
	'cff0000',
	'c9c9c9c',
	'cfffbe2',
	'cffe222',
	'cfff0f0',
	'c333333',
	'cbfb7bc',
	'c111111',
	'c555555',
	'c222222',
	'cffffcc',
	'ca04040',
	'cf0f0f0',
	'cffffee',
	'cffeecc',
	'cd4d82d',
	'c444444',
	'cfafafa',
	'cf7c2db',
	'cbb0500',
	'ccf90b0'
];

//Load colors
if (settings.changeColor) { 
	var colors = [];
	
	for (var i = 0; i < origColors.length; ++i) {
		var origColor = origColors[i].substring(1);
		var newColor = modifyColor(origColor, settings.h, settings.s / 100, settings.b / 100);
		colors['c' + origColor] = newColor;
	}

	colors['c000000'] = '000';
	colors['cffffff'] = 'fff';
	
	//Color css
	var colorCss = '#Grid-Page { border:none !important; } #Grid-Page-Left { left: auto !important; }#Grid-Page-Center-Footer ul { height: 70px; }#Account_CN_Reason div.highlight h3{border-bottom:1px solid #'+colors.c000000+'!important;color:#'+colors.c000000+'!important;}#Mod-Account-DeleteConfirmed .teaser,.ac_over,div#Chat_Main div#Chat_Conversation div.Chat_History_Header,div#Chat_Main div#Chat_Partners .ChatPartnerActive,div#Chat_Main div.Chat_Input_Disabled .Chat_Message_Status,div#Chat_Nimbuzz_Reference,.obj-festsubbar,.forummHNavi,.friendsSearchBox,#FriendsList .pagerCont,.friendsWrap,#resultboxSearchAutosuggest .selected,.groupsmHNavi,.groupsWrap,#Invitation-Importer-Pagelet-Internalinvite .obj-searchresults ul li.marked,#Invitation-Importer-Pagelet-Externalinvite .obj-searchresults ul li.marked,#Grid-Page-Center-Header #Chat-Status-Dropdown ul li.activated,div.opened .col4,#resultbox .selected,.namebox,.ui-datepicker-header,.ui-datepicker-header select,table.obj-table thead,table.obj-usertable thead,.obj-subbar,div.obj-box div.info,div.obj-box.underlay div.innercontent,div.obj-box div.infoBar,.obj-pagecounter,.obj-context-content ul li a:hover,ul.obj-suggest li.selected,ul.obj-suggest li:hover,.obj-invitation-box,#List-Manager-Movearea ul li:hover,#List-Manager-Movearea ul li:focus,div.Snipplet-Photos-PhotoDetail div.photo-tagging span.user-delete,.photosmHNavi,.AlbumCont,#PhotoAlbums_EditPhotos form .clearFix,#PhotoAlbums_User .thumb,#photoUploader,#PhotoAlbums_MovePhotos div.highlighted,#accordion h2,#ProfileEditGeneral #FutureUniSortable .sortablefutureUniElement .choose-box,#resultboxAutosuggest .selected,.resultsRow,#Search_Results #GroupList,#Mod-Suggest-Form{background-color:#'+colors.cffe0e0+'!important;}span.highlight-improved{color:#'+colors.c0f8600+'!important;}#resultbox,#resultboxSearchAutosuggest,#resultboxAutosuggest{border:1px solid #'+colors.c666666+'!important;}#resultbox div dl,.ac_results li{border-bottom:1px solid #'+colors.caaaaaa+'!important;}#resultbox .selected dl,h2,.MessageList .MessageListHeader,table.ui-datepicker tr.ui-datepicker-title-row,table.ui-datepicker td.ui-datepicker-days-cell a:hover,table.ui-datepicker td.ui-datepicker-today a:hover,ul.obj-tabbar li a:hover,ul.obj-tabbar li a:focus,.obj-list-header,#resultbox div.selected{background-color:#'+colors.cff90b0+'!important;}#resultbox .selected dl,div#Chat_Header .Chat_Box_Link_Area a,div#Chat_Main div#Chat_Topbar span.Chat_TopbarTitle,div#Chat_Main div#Chat_Topbar span.Chat_TopbarTool,div#Chat_Header #Chat_Box_Link,div.Chat_Header_Message_Help a:link,div.Chat_Header_Message_Help a:visited,div.Chat_Header_Message_Help a:active,#resultboxSearchAutosuggest .selected,ol.obj-progressbar.mod-invitation-contactimporter-progressbar li.selected,#Grid-Page-Center-Top-Navigation li a,#Grid-Page-Center-Header h1,#Grid-Page-Center-Header #Chat-Friends-Online a,#Grid-Page-Center-Header #Chat-Show a,#Grid-Page-Center-Header #Chat-Message-Dropdown div.help a,#Grid-Page-Center-Footer ul li a,#Grid-Page-Center-Footer ul li a:hover,h1,#resultbox .selected,table.ui-datepicker td.obj-datepicker-current-day a,table.ui-datepicker td.obj-datepicker-marked-day a,ul.obj-linklist li a:hover,ul.obj-linklist li a:focus,ul.obj-tabbar li.selected a,ul.obj-tabbar li.selected a:hover,ul.obj-tabbar li.selected a:focus,div.obj-accordion h2,div.obj-accordion h3,.Butt,#accordion h1,#resultboxAutosuggest .selected,#resultbox div.selected{color:#'+colors.cffffff+'!important;}#resultbox .unselected dl,.ac_results,#resultboxSearchAutosuggest,#resultboxSearchAutosuggest .unselected,#resultbox,#resultbox .unselected,ul.obj-suggest,#resultboxAutosuggest,#resultboxAutosuggest .unselected,#invitebox{background-color:#'+colors.cf8f8f8+'!important;}#resultbox .unselected dl,#resultboxSearchAutosuggest dd,#resultboxSearchAutosuggest .unselected,#GroupMemberVisibility span.currentGroupVisibility,h2 span.ad,form#Messages_WriteForm #historyContent ul#Message-History li span,#resultbox dd,#resultbox .unselected,div.obj-searchresults ul .uniName,.obj-list-manager .uni-name,#resultboxAutosuggest dd,#resultboxAutosuggest .unselected,#resultbox div.unselected,p#invite-header,div#AdLinkMyPhotobook span.anzeige{color:#'+colors.c666666+'!important;}#resultbox dl.friendslist,div#Chat_Main_Container,div#Chat_Main div#Chat_Advertising_On,#Feeds-Post-Form #Feeds-Post-Form,#GroupAdmin .deleteGroup,#CreateGroup h2,input.button-face-link:hover,input.btnLikeLink:hover,h4,.MessageList,ul.obj-tabbar,div.obj-dialog-overlay div.dialog-title,.phxDialogTitle,.tipsWrap h2,Overwriting default selectorsul#tabBar,#vcard-choose-list div.box-vcard{border-bottom:1px solid #'+colors.cdc1e64+'!important;}#Create-Form-Autocomplete div.invalid,input.invalidNested,div.itunes-code-box,div.codegenarator-box,div.autocompleteContainerInvalid,div.obj-box input.text.invalid,div.obj-box input.zip.invalid,div.obj-box textarea.invalid,div.obj-box select.invalid,div.obj-dialog-overlay input.text.invalid,div.obj-dialog-overlay input.zip.invalid,div.obj-dialog-overlay textarea.invalid,div.obj-dialog-overlay select.invalid,div.Snipplet-Photos-PhotoComments textarea.invalid,.Butt.disabled{background:#'+colors.cffc6c6+'!important;}/*a.fieldBtn:link,a.fieldBtn:visited,a.fieldBtn:hover,a.fieldBtn:focus,a.fieldBtn:active,input.button,button,input.FieldBtnSubmit,input.fieldBtnSubmit,a.link-face-button,a.link-face-button:link,a.link-face-button:visited,a.link-face-button:hover,a.link-face-button:focus,a.link-face-button:active,a.FieldBtnSubmit,a.FieldBtnSubmit:link,a.FieldBtnSubmit:visited,a.FieldBtnSubmit:hover,a.FieldBtnSubmit:focus,a.FieldBtnSubmit:active,a.FieldBtnCancel,a.FieldBtnCancel:link,a.FieldBtnCancel:visited,a.FieldBtnCancel:hover,a.FieldBtnCancel:focus,a.FieldBtnCancel:active,.phxDialogContent a.fieldBtn:link,.phxDialogContent a.fieldBtn:visited,.phxDialogContent a.fieldBtn:hover,.phxDialogContent a.fieldBtn:focus,.phxDialogContent a.fieldBtn:active{color:#'+colors.cf7f7f7+'!important;}*/a.fieldBtn:link,a.fieldBtn:visited,a.fieldBtn:hover,a.fieldBtn:focus,a.fieldBtn:active,a.link-face-button,a.link-face-button:link,a.link-face-button:visited,a.link-face-button:hover,a.link-face-button:focus,a.link-face-button:active,a.FieldBtnSubmit,a.FieldBtnSubmit:link,a.FieldBtnSubmit:visited,a.FieldBtnSubmit:hover,a.FieldBtnSubmit:focus,a.FieldBtnSubmit:active,a.FieldBtnCancel,a.FieldBtnCancel:link,a.FieldBtnCancel:visited,a.FieldBtnCancel:hover,a.FieldBtnCancel:focus,a.FieldBtnCancel:active,.Butt,.phxDialogContent a.fieldBtn:link,.phxDialogContent a.fieldBtn:visited,.phxDialogContent a.fieldBtn:hover,.phxDialogContent a.fieldBtn:focus,.phxDialogContent a.fieldBtn:active{background:#'+colors.cff4070+'!important;} a.fieldBtn:link,a.fieldBtn:visited,a.fieldBtn:hover,a.fieldBtn:focus,a.fieldBtn:active,a.link-face-button,a.link-face-button:link,a.link-face-button:visited,a.link-face-button:hover,a.link-face-button:focus,a.link-face-button:active,a.FieldBtnSubmit,a.FieldBtnSubmit:link,a.FieldBtnSubmit:visited,a.FieldBtnSubmit:hover,a.FieldBtnSubmit:focus,a.FieldBtnSubmit:active,a.FieldBtnCancel,a.FieldBtnCancel:link,a.FieldBtnCancel:visited,a.FieldBtnCancel:hover,a.FieldBtnCancel:focus,a.FieldBtnCancel:active,.phxDialogContent a.fieldBtn:link,.phxDialogContent a.fieldBtn:visited,.phxDialogContent a.fieldBtn:hover,.phxDialogContent a.fieldBtn:focus,.phxDialogContent a.fieldBtn:active{border-top:1px solid #'+colors.cff7799+'!important;border-left:1px solid #'+colors.cff7799+'!important;border-right:1px solid #'+colors.caa0000+'!important;border-bottom:1px solid #'+colors.caa0000+'!important;}.ac_results,ul.obj-suggest{border:1px solid #'+colors.caaaaaa+'!important;}div#Chat_Main_Container,#vcard-choose-list div.box-vcard{border-left:1px solid #'+colors.cdc1e64+'!important;border-right:1px solid #'+colors.cdc1e64+'!important;}div#Chat_Main div#Chat_History,div#Chat_Main div#Chat_Partners_List,div#Chat_Main div.Chat_Input_Enabled #Chat_Message{scrollbar-face-color:#'+colors.cff90b0+'!important;scrollbar-track-color:#'+colors.cf5f6f7+'!important;}div#Chat_Main div#Chat_Conversation div.Chat_History_Header,div#Chat_Main div.Chat_History_Header span.Chat_History_Header_Control,div#Chat_Main div#Chat_History .Chat_Message_Other .Chat_Message_Sender,.error-message,.markedRecipientMatch,#Mod-Groups-Snipplet ul,#MyGroups_Table div.groupNoble,#MyGroups_Table span.groupClosed,div.groupActions,div#mod-invitation-invitation form div.error,a,input.button-face-link,input.btnLikeLink,#Grid-Page-Center-Header #Chat-Status-Dropdown ul li,#microblogPresetsToggler,table.ui-datepicker td.obj-datepicker-unmarked-day a,table.ui-datepicker td.ui-datepicker-days-cell a:hover,div.obj-pager a:link,div.obj-pager a:visited,ul.obj-threadList li h3,div.obj-box div.invalid,div.obj-dialog-overlay div.invalid,div.phxDialogButtons div.invalid,div.obj-dialog-overlay div.dialog-title,div.obj-accordion dt,.match,.phxDialogTitle,div.Snipplet-Photos-PhotoComments form .hint,#PhotoAlbums_AddOverview .newUploader h3,#accordion h2,#Privacy_Seal #Not_Connected h2,#Privacy_Seal #Connected h2,#Mod-Profile-View h3 a:hover{color:#'+colors.cdc1e64+'!important;}div#Chat_Main div#Chat_Partners,div#Chat_Main div#Chat_History .Chat_Message_Offline,div#Chat_Main div#Chat_History .Chat_Message_Online,#Grid-Page-Center-Header #Chat-Message-Dropdown,#Grid-Page-Center-Header #Chat-Status-Dropdown ul li,.ui-datepicker-links,.obj-sponsored-link,div.box-hint,#Vcard-MyServices td.vz-vcard{background-color:#'+colors.cf5f6f7+'!important;}div#Chat_Header .Chat_Box_Link_Area,div.Chat_State_LB_Line3,#Grid-Page-Center-Header #Chat-Status,#Grid-Page-Center-Header #Chat-Show{border-left:1px solid #'+colors.cff90b0+'!important;}div#Chat_Main div#Chat_History .Chat_Message{border-bottom:1px dotted #'+colors.ccccccc+'!important;}div#Chat_Main div.Chat_Input_Enabled #Chat_Message{border:0 solid #'+colors.cffffff+'!important;}div.Chat_Header_Message_Help,#Grid-Page-Center-Header #Chat-Message-Dropdown div.help{background-color:#'+colors.cff7799+'!important;}div#noFriendsLoaded,div.gadgets-gadget-chrome form,.agendMode,.MessageHeader,#MicroBlog_Edit .microblogPresets li a:hover,div.obj-shoutbox,div.obj-box fieldset.choose-box,div.obj-dialog-overlay fieldset.choose-box,.obj-invitation-box p,.noalbums{background-color:#'+colors.ceeeeee+'!important;}.PhxCancelButton{background-color:#'+colors.ce5e5e5+'!important;}#Feeds-Post-Form textarea:focus,.voting-poll-container,#poll-results,#poll-history{border:solid 1px #'+colors.cdc1e64+'!important;}#Mod-Feedbox-Snipplet .feeds-lastentry{border-bottom:solid 1px #'+colors.cdc1e64+'!important;}#Mod-Feeds-Home-Pagelet ul li,.groupStartSnipplets .floatR ul li,#startLeft div.teaserbox div.text ul li{border-bottom:1px dotted #'+colors.cff90b0+'!important;}.obj-festsubbar,.forummHNavi,.friendsSearchBox,.groupsmHNavi,h2,table.obj-table,table.obj-usertable,table.obj-table thead,table.obj-usertable thead,.obj-subbar,div.obj-box div.info,div.obj-box.underlay div.innercontent,div.obj-box div.infoBar,.photosmHNavi,.AlbumCont,#photoUploader,#Mod-Kdk-Snipplet{border-bottom:1px solid #'+colors.cff8080+'!important;}.friendsListLinks,.ThumbsOverview{background:#'+colors.cffe0e0+'!important;}.confirmInvite li,#GroupSettings,div.write-pannel{background:#'+colors.cf7f7f7+'!important;}#FriendsList .Details span,#Profile_InformationSnipplet .accountStatusOnline{color:#'+colors.c228b22+'!important;}#Mod-Friendslists-Overview-Table td.mod-friendlist-numberoffriends,#MyGroups_Table td.members,#MyGroups_Table td.updated,.obj-privacy-login-animator{background:#'+colors.cf5f6f7+'!important;}#Mod-Friendslists-Overview-Table td.mod-friendlist-numberoffriends,#MyGroups_Table td.members,#MyGroups_Table td.updated{border-bottom-color:#'+colors.cffffff+'!important;}#Mod-Friendslists-Overview-Table h3 img{border-right:1em solid #'+colors.cffffff+'!important;}#resultboxSearchAutosuggest div,#resultbox div,ul.obj-suggest li,#resultboxAutosuggest div,#invitebox{border-top:1px solid #'+colors.caaaaaa+'!important;}#resultboxSearchAutosuggest .selected,.obj-list-manager .selected,#resultboxAutosuggest .selected{background-color:#'+colors.cffb0b0+'!important;}.Friends-FriendsPagelet .obj-invitation-box{border-bottom:1px solid #'+colors.cff7799+'!important;}#AddFriend .ellipsis{background:#'+colors.cf2f2f2+'!important;}#AddFriend .ellipsis,.obj-expedit li{border:solid 1px #'+colors.ccccccc+'!important;}#AddFriend ul li:last-child,.poll-vertical li{border-bottom:solid 1px #'+colors.ccccccc+'!important;}.gadgets-gadget-user-prefs-dialog{background-color:#'+colors.ce5ecf9+'!important;}div.gadgets-gadget-chrome form,div.Snipplet-Photos-PhotoDetail table.photo-metainfo td,#startLeft div.def_teaserbox div.text h2{border-bottom:1px solid #'+colors.ccccccc+'!important;}div.gadgets-gadget-chrome form,div.Snipplet-Photos-PhotoDetail table.photo-metainfo td.action{border-right:1px solid #'+colors.ccccccc+'!important;}div.gadgets-gadget-chrome form{border-left:1px solid #'+colors.ccccccc+'!important;}.groupsColumn h2 a{color:#'+colors.c907070+'!important;}.groupSettingsLeave{border-top:1px solid #'+colors.cdc1e64+'!important;}#GroupSettings,div.obj-overlay-inline div.body,div.write-pannel{border:3px solid #'+colors.cdc1e64+'!important;}#CreateGroup h2,h3,.dialog-title{color:#'+colors.ce04060+'!important;}#GroupMemberVisibility th,#GroupMemberVisibility td,table.obj-usertable,table.obj-table caption,table.obj-usertable caption,table.obj-table thead,table.obj-usertable thead,div.obj-box.underlay div.innercontent,.obj-navigation,.AlbumCont,#photoUploader{border-top:1px solid #'+colors.cff8080+'!important;}#GroupMemberVisibility select.selectRed{background-color:#'+colors.cfccaca+'!important;}#GroupMemberVisibility select.selectYellow{background-color:#'+colors.cffffb2+'!important;}#GroupMemberVisibility select.selectGreen{background-color:#'+colors.ce4ffcc+'!important;}html div#mod-invitation-invitation{height:1%;}textarea#mod-invitation-invitation-form-adresses{background:url(../Img/bg_invitation_textarea.gif) #'+colors.cffffff+'!important;}#Invitation-Importer-Pagelet-Login h2,#Invitation-Importer-Pagelet-Internalinvite h2,#Invitation-Importer-Pagelet-Externalinvite h2,#Invitation-Importer-Pagelet-Complete h2,#startLeft h2{border-bottom-color:#'+colors.cdc1e64+'!important;}input.button,button,input.FieldBtnSubmit,input.fieldBtnSubmit{background-color:#'+colors.cff4070+'!important;border-color:#'+colors.cff7799+' #'+colors.caa0000+' #'+colors.caa0000+' #'+colors.cff7799+' !important;}input.button:active,button:activeinput.FieldBtnSubmit:active,input.fieldBtnSubmit:active{border-color:#'+colors.caa0000+' #'+colors.cff7799+' #'+colors.cff7799+' #'+colors.caa0000+' !important;}button.button-disabled,input.button-disabled,input.button-disabled:active,input.button.disabled,input.button.disabled:active,a.link-face-button.button-disabled,a.link-face-button.button-disabled:link,a.link-face-button.button-disabled:visited,a.link-face-button.button-disabled:hover,a.link-face-button.button-disabled:focus,a.link-face-button.button-disabled:active,a.link-face-button.disabled,a.link-face-button.disabled:link,a.link-face-button.disabled:visited,a.link-face-button.disabled:hover,a.link-face-button.disabled:focus,a.link-face-button.disabled:active{background-color:#'+colors.c999999+'!important;border-color:#'+colors.ccccccc+' #'+colors.c777777+' #'+colors.c777777+' #'+colors.ccccccc+' !important;}#Grid-Page-Center-Top-Navigation li a:hover,#Grid-Page-Center-Header,html div.obj-searchresults ul li.selected{background-color:#'+colors.ce04060+'!important;}#Grid-Page-Center-Header,#Grid-Page-Center-Content,.obj-list-header,.obj-list-manager .selected,div.obj-photo-slider .slider ul li a:hover,div.obj-nobleprofile-slider .slider ul li a:hover{border-color:#'+colors.cff8080+'!important;}body.svz #Grid-Page-Center-Footer{border:solid 1px #'+colors.ca9000a+'!important;}body.avz #Grid-Page-Center-Footer{border:solid 1px #'+colors.cbb4d04+'!important;}body.pvz #Grid-Page-Center-Footer{border:solid 1px #'+colors.cbb0500+'!important;}body.svz #Grid-Page-Center-Footer ul{border-right:solid 1px #'+colors.cd8090d+'!important;border-left:solid 1px #'+colors.cf1393c+'!important;}body.avz #Grid-Page-Center-Footer ul{border-right:solid 1px #'+colors.cda6703+'!important;border-left:solid 1px #'+colors.cffa150+'!important;}body.pvz #Grid-Page-Center-Footer ul{border-right:solid 1px #'+colors.cd7026a+'!important;border-left:solid 1px #'+colors.cfc3195+'!important;}.error,.obj-invitation-box p.error{color:#'+colors.cee0000+'!important;}#Grid-Page-Left #LeftsideBox{background:#'+colors.ce6e6e6+'!important;border:solid 1px #'+colors.cb9b9b9+'!important;}.MessageList li.hi{background-color:#'+colors.cffe1e1+'!important;}.Message_Container{order-bottom:1px solid #'+colors.cdddddd+'!important;}.MessageContent{border-bottom:1px solid #'+colors.cdddddd+'!important;}#writeMsgError{color:#'+colors.cff0000+'!important;}.messages-list-header{background-color:#'+colors.cff90b0+'!important;border:solid 1px #'+colors.cff8080+'!important;}.namebox,div.Snipplet-Photos-PhotoDetail div.photo-tagging span.user-delete{border:1px solid #'+colors.c9c9c9c+'!important;}#MicroBlog #historyEntries .microblogHistory{border-top:1px dotted #'+colors.cff90b0+'!important;}#microblogPresetsToggler{border-top:1px dotted #'+colors.cdc1e64+'!important;}.pinboard-write,div.Snipplet-Photos-PhotoComments textarea{border-color:#'+colors.ccccccc+'!important;}table.obj-table tbody th,table.obj-table tbody td,table.obj-usertable tbody th,table.obj-usertable tbody td{border-bottom:3px solid #'+colors.cf5f6f7+'!important;}ul.obj-linklist{border:1px solid #'+colors.cffffff+'!important;}div.obj-accordion dd dt{background-color:#'+colors.cfff0f0+'!important;}.obj-fakedscrolling{border:1px solid #'+colors.c333333+'!important;}.obj-context-content{border:1px solid #'+colors.cbfb7bc+'!important;}.obj-context-content ul li a,.CancelButt{border-top:1px solid #'+colors.cffffff+'!important;}.obj-context-content ul li a{border-bottom:1px solid #'+colors.cffffff+'!important;}.obj-context-content ul li a:hover{border-top:1px solid #'+colors.cbfb7bc+'!important;}.obj-context-content ul li a:hover,.DeleteButt{border-bottom:1px solid #'+colors.cbfb7bc+'!important;}.obj-context-content ul li.firstChild a:hover{border-top:1px solid #'+colors.cffe0e0+'!important;}.obj-context-content ul li.lastChild a:hover{border-bottom:1px solid #'+colors.cffe0e0+'!important;}.obj-invitation-box{border:1px solid #'+colors.cff7799+'!important;}div.Snipplet-Photos-PhotoDetail table.photo-metainfo td.action,.CancelButt{border-left:1px solid #'+colors.cffffff+'!important;}div.obj-photo-slider .slider ul li.selected a,div.obj-nobleprofile-slider .slider ul li.selected a{border:2px solid #'+colors.cdc1e64+'!important;}div.Snipplet-Photos-Diashow .control{background:#'+colors.c111111+'!important;}div.Snipplet-Photos-Diashow .control,div.Snipplet-Photos-Diashow .control a:hover{color:#'+colors.c555555+'!important;}div.Snipplet-Photos-Diashow .control hr{border-bottom:1px solid #'+colors.c222222+'!important;}.ThumbsOverview{border-bottom:0 solid #'+colors.cff8080+'!important;}.thumb p .grey,#Mod-Profile-View h3 a{color:#'+colors.ccccccc+'!important;}#PhotoAlbums_EditPhotos form .clearFix{border-top:1px solid #'+colors.ce04060+'!important;border-bottom:1px solid #'+colors.ce04060+'!important;}.editPhotoBox,.fn-area-blackborder{border:1px solid #'+colors.ce04060+'!important;}#PhotoAlbums_SingleView .pagerCont{border-top:1px dotted #'+colors.cff8080+'!important;}#taggedUsers span:hover a,#taggedUsers span.highlight a{background-color:#'+colors.cffffcc+'!important;}.fieldBtnSubmit.disabled{background-color:#'+colors.caa0000+'!important;}.sortHelper{background-color:#'+colors.cf0f0f0+'!important;border:2px dashed #'+colors.cff90b0+'!important;}html #photo-number{right:20px;}#PhotoAlbums_MovePhotos .obj-fakedscrolling .photoentry{border-top:1px solid #'+colors.ccccccc+'!important;}.fn-area-whiteborder{border:1px solid #'+colors.cffffee+'!important;}.fn-area-inner{border:1px solid #'+colors.c000000+'!important;}.fn-note-edit,.fn-note-edit-select input,.fn-note-edit-select select,.fn-note-text,.fn-note-edit textarea{border:1px solid #'+colors.c777777+'!important;}.fn-note-edit,.fn-note-text{background:#'+colors.cfffbe2+'!important;}.fn-note-edit-text{background-color:#'+colors.cffeecc+'!important;border:1px solid #'+colors.cd4d82d+'!important;}.fn-note-edit TEXTAREA{background:#'+colors.ceeeeee+'!important;}.Butt,.Butt.disabled{border-color:#'+colors.cff7799+' #'+colors.caa0000+' #'+colors.caa0000+' #'+colors.cff7799+' !important;}.Butt.disabled{color:#'+colors.cff7799+'!important;}.CancelButt{background:##'+colors.c777777+'!important;border-right:1px solid #'+colors.c999999+'!important;border-bottom:1px solid #'+colors.c999999+'!important;border-top-color:#'+colors.cffffff+'!important;border-right-color:#'+colors.c999999+'!important;border-bottom-color:#'+colors.c999999+'!important;}.DeleteButt,div.invalid,input.invalidNested{background:#'+colors.ccccccc+'!important;}.DeleteButt{border-top:1px solid #'+colors.cf5f6f7+'!important;border-right:1px solid #'+colors.cbfb7bc+'!important;border-left:1px solid #'+colors.cf5f6f7+'!important;}.isFestival,.unknownVZ #Grid-Page-Center-Header{background-color:#'+colors.ccccccc+'!important;}#accordion li{border-left:1px solid #'+colors.cffc6c6+'!important;border-right:1px solid #'+colors.cffc6c6+'!important;}.miniAccordion{border-bottom:1px solid #'+colors.cffc6c6+'!important;}.tipsWrap h2{color:#'+colors.c444444+'!important;}#GroupCategories{border-bottom:1px solid #'+colors.cee0000+'!important;}#startLeft .teaserbox-meta{border-top:dotted 1px #'+colors.cff90b0+'!important;}#startLeft div.def_teaserbox div.text{background-color:#'+colors.cfafafa+'!important;}#Mod-Kdk-Snipplet{border-left:1px solid #'+colors.cff8080+'!important;}.unknownVZ #Grid-Page-Center-Header,.unknownVZ #Grid-Page-Center-Content,.unknownVZ #Grid-Page-Center-Footer{border-color:#'+colors.cbfb7bc+'!important;}.unknownVZ #Grid-Page-Center-Footer{background-color:#'+colors.cdddddd+'!important;}div#Chat_Main_Container,div#Chat_Main div#Chat_Conversation,div#Chat_Main div#Chat_Advertising_On{border-color:#'+colors.cdc1e64+'!important;}#Account_Delete_Reason form label,div.Chat_State_LB_Line2,div.Chat_State_LB_Line3,#Mod-Feedbox-Snipplet #advertisement-feeds,#Mod-Feedbox-Snipplet #advertisement-feeds:hover,.obj-festsubbar,#resultboxSearchAutosuggest dt,div.obj-box form div.ageRestriction label,#GroupMembership,#Table_Legend .groupNoble,#Table_Legend .groupClosed,#Table_Legend div.nobleProfile,#Invitation-Importer-Pagelet-Login h2,#Invitation-Importer-Pagelet-Internalinvite h2,#Invitation-Importer-Pagelet-Externalinvite h2,#Invitation-Importer-Pagelet-Complete h2,#Grid-Page-Left #Quicksearch form input,#Grid-Page-Center-Header #Chat-Status-Dropdown ul li.status,#Grid-Page-Center-Header #Chat-Status-Dropdown ul li.activated,h1.alternate,h2.alternate,form#Messages_WriteForm p.hint,#resultbox dt,.namebox,table.ui-datepicker tr.ui-datepicker-title-row td a,div.obj-pager a,ul.obj-threadList li h3 span,.obj-subbar,div.obj-shoutbox,div.dialog-wrapper,div.obj-accordion.light h2,div.obj-accordion.light h3,div.obj-accordion.light dl dd h4,.obj-sponsored-link a,.phxDialog,div.photo-list h2,div.photo-list h3,div.photo-list ul li h4,div.Snipplet-Photos-PhotoDetail div.photo-tagging span.user-delete,div.Snipplet-Photos-PhotoDetail div.photo-tagging span.user-delete a.text,div.Snipplet-Photos-PhotoDetail div.photo-tagging span.user-delete span,div.Snipplet-Photos-PhotoDetail div.photo-tagging span.user-delete a.text:hover,div.Snipplet-Photos-PhotoDetail table.photo-metainfo th,div.Snipplet-Photos-PhotoDetail table.photo-metainfo td,.AlbumText h2,#PhotoAlbums_Tags .buttonArea,.CancelButt,.DeleteButt,#accordion li,#accordion h3,#Privacy_Seal h3,#Privacy_Seal #Not_Connected h3,#resultboxAutosuggest dt,#startLeft h2,div#mod-invitation-invitation label{color:#'+colors.c000000+'!important;}#Mod-Account-DeleteConfirmed .teaser,div.obj-box.full.frame{border:1px solid #'+colors.cdc1e64+'!important;}#Mod-AccuseIgnore-AccuseIgnore div#reasons fieldset.choose-box p.label,div.obj-dialog-overlay form div#reasons fieldset.choose-box p.label,div#Chat_Main div.Chat_History_Header span.Chat_History_Header_Name,div#Chat_Main div#Chat_Partners .ChatPartner,div#Chat_Main div#Chat_Partners .ChatPartnerActive,div#Chat_Main div#Chat_Partners .ChatPartnerOffline,div#Chat_Main div#Chat_Partners_Header,div#Chat_Nimbuzz_Reference,div#Chat_Header_Online_Dropdown_Container,div.Chat_Header_Message_Dropdown_List,div#noFriendsLoaded,#Feeds-Post-Form div#Feeds-Max-Chars,.feeds-prev-entry,#Feeds-Post-Form #Feeds-Buttons div,#Mod-Feedbox-Snipplet .feeds-meta span,#Mod-Feeds-Home-Pagelet .feeds-meta span,.platform,.microblog-age,#GroupAdminImage div.obj-box.onethird p,label,input.checkbox,input.radio,input.button,#Grid-Page-Center-Header #Chat-Message-Dropdown,.inactive,#MicroBlog .microblogMeta,#MicroBlog_Edit div.microblogMaxChars,#MicroBlog_Edit span#microblogCharsCount,#MicroBlog_Edit .sms-invitation,p.sponsored,table.obj-usertable .lastUpdateTypeName,table.obj-usertable .microblog-age,dl.obj-keyValueList dt,table.obj-keyValueTable tbody th,form .hint,.type-sub,.obj-invitation-box input.text,div.box-hint,div#AdLinkMyPhotobook span.anzeige,div.photo-list ul.photoalbums li div.caption span,div.Snipplet-Photos-PhotoDetail div.photo-navi div.counter,.noalbums,.PhotoCount,#Mod-Profile-EditImage div.obj-box.onethird p,#startLeft div.teaserbox div.text h2 span.advertising,#Mod-Suggest-Form #SuggestForm #counter,.unknownVZ #Grid-Page-Center-Footer ul li a,.feeds-meta-inbound,#ShopLink p,.createGroupRestriction,#MicroBlog_Edit .microblogVisibility{color:#'+colors.c777777+'!important;}#AccuseIgnore .highlightBox,div.box-hint,#PhotoAlbums_AddOverview img,div#noFriendsLoaded,.agendMode,img.profile,.obj-border,.frame,table.ui-datepicker td.ui-datepicker-days-cell,img.obj-profileImage,div.obj-box.underlay div.innerbox img.obj-profileImage,ul.obj-thumbnaillist .imageContainer img,div.obj-shoutbox,div.obj-box fieldset.choose-box,div.obj-dialog-overlay fieldset.choose-box,.obj-invitation-box p,#List-Manager-Movearea ul,div.photo-list ul li,div.Snipplet-Photos-PhotoDetail div.photo-tagging,div.Snipplet-Photos-PhotoDetail div.photo,div.Snipplet-Photos-PhotoDetail table.photo-metainfo,div.Snipplet-Photos-PhotoDetail table.photo-metainfo th,div.obj-photo-slider .slider ul li a,div.obj-nobleprofile-slider .slider ul li a,div.Snipplet-Photos-PhotoComments,.noalbums,#PhotoAlbums_TitlePhoto .editPhotoBox,.Mod-Feed-Iframe,#startLeft div.def_teaserbox div.text{border:1px solid #'+colors.ccccccc+'!important;}#resultbox .unselected dl.friendslist,div#Chat_Main,div#Chat_Main_Container,div#Chat_Main div#Chat_History,div#Chat_Main div#Chat_Selectors,div#Chat_Main div#Chat_Partners_List,div#Chat_StorageContainer,div.Chat_Emoticons_Dropdown_List,div.Chat_State_Dropdown_List,#adBackground,.groupsWrap ul li.clearFix,#Grid-Page,#Grid-Page-Center-Header #Chat-Status-Dropdown ul li.status,.MessageList li.lo,span.namebox.friendslist,#MicroBlog_Edit .microblogPresets li a,div.datePicker-inline,div#obj-datepicker,table.ui-datepicker td.obj-datepicker-unmarked-day a,div.obj-box.underlay div.innerbox,div.obj-overlay-inline div.body,div.obj-accordion dd,div.obj-accordion.light h2,div.obj-accordion.light h3,.obj-context-content,div.Snipplet-Photos-PhotoDetail div.photo-tagging,div.Snipplet-Photos-PhotoDetail div.photo,div.Snipplet-Photos-PhotoDetail table.photo-metainfo th,div.Snipplet-Photos-PhotoDetail table.photo-metainfo td,div.obj-photo-slider .slider ul li,div.obj-nobleprofile-slider .slider ul li,div.Snipplet-Photos-PhotoComments,.thumb,.AlbumCont .clearFix,.editPhotoBox,#PhotoAlbums_User .ThumbsOverview,#PhotoAlbums_User .nofotos,#accordion li,#suggestbox,#resultbox div.unselected,#Grid-Page-Center-Header #Chat-Status-Dropdown,.fn-area-inner,.fn-note-edit textarea{background-color:#'+colors.cffffff+'!important;}div.autocompleteContainer,.phxDialogContent #Messages_WriteForm div.autocompleteContainer,div.autocompleteContainer,div.autocompleteContainerInvalid,div#Chat_Main div#Chat_History,div#Chat_Main div#Chat_Partners_List,div#Chat_Main div#Chat_Input,div.Chat_Emoticons_Dropdown_List,div.Chat_State_Dropdown_List,div.Chat_Header_Message_Dropdown_List,input.text,input.fieldText,input.zip,input.town,textarea,select,#Grid-Page-Center-Header #Chat-Message-Dropdown,#Grid-Page-Center-Header #Chat-Status-Dropdown,.emoticons td,div.datePicker-inline,div#obj-datepicker{border:1px solid #'+colors.c999999+'!important;}#Create-Form-Autocomplete div.invalid,.groupsWrap ul li.clearFix,div.autocompleteContainerInvalid,div.obj-box.underlay div.innerbox,div.obj-box input.text.invalid,div.obj-box input.zip.invalid,div.obj-box textarea.invalid,div.obj-box select.invalid,div.obj-dialog-overlay input.text.invalid,div.obj-dialog-overlay input.zip.invalid,div.obj-dialog-overlay textarea.invalid,div.obj-dialog-overlay select.invalid,div.photo-list ul li:hover,div.Snipplet-Photos-PhotoComments textarea.invalid,.thumb,.AlbumCont .clearFix,.PhotoComment,#PhotoAlbums_AddOverview .newUploader,#PhotoAlbums_AddOverview .oldUploader,#PhotoAlbums_SingleView .ThumbsOverview #tagBar{border:1px solid #'+colors.cff8080+'!important;}div#Chat_Main div.Chat_History_Header.Chat_User_Offline span.Chat_History_Header_Name a,div#Chat_Main div#Chat_History .Chat_Message_Own .Chat_Message_Sender,div#Chat_Main div#Chat_History .Chat_Message_Own .Chat_Message_Time,div#Chat_Main div#Chat_History .Chat_Message_Other .Chat_Message_Time,div#Chat_Main div.Chat_Input_Disabled .Chat_Message_Status,div.Snipplet-Photos-Diashow .control a,div.Snipplet-Photos-Diashow .title,.Photos_hiddenFriendsHint{color:#'+colors.c999999+'!important;}div#Chat_Main div#Chat_Topbar,#Grid-Page-Center-Footer ul li a:hover,table.ui-datepicker td.obj-datepicker-current-day a,table.ui-datepicker td.obj-datepicker-marked-day a,ul.obj-linklist li a:hover,ul.obj-linklist li a:focus,ul.obj-tabbar li.selected a,ul.obj-tabbar li.selected a:hover,ul.obj-tabbar li.selected a:focus,div.obj-accordion h2,div.obj-accordion h3,#accordion h1{background:#'+colors.cdc1e64+'!important;}div.Chat_State_LB_Line4,#Grid-Page-Center-Header #Chat-Status-Dropdown ul li,div.obj-accordion.light dl,.obj-comment-list div.comments-summary{border-top:1px solid #'+colors.cff90b0+'!important;}.obj-festsubbar,#Mod-NobleProfiles-Snipplet .obj-subbar,h2,.obj-comment-list li .comment-metainfo,div#Mod-Photos-Overview div.overview-friends-snipplet div.Snipplet-Photos-OverviewAlbums,div.obj-subbar,div.Snipplet-Photos-PhotoList div#Snipplet-Photos-Slider{border-top:solid 1px #'+colors.cdc1e64+'!important;}#AttachPhoto,#AttachVideo,div.obj-box form div.groupAdminChangeName{background-color:#'+colors.ce8e8e8+'!important;}.friendsDetails div,.hiddenGroupName,.hiddenGroupName a,.groupSettingsColumn,.groupAdminGroupname,input.preset,textarea.preset,#Grid-Page-Left #Quicksearch form input.preset,#QuickFormSearch input.preset{color:#'+colors.c888888+'!important;}#GroupsLeft .gadgets-gadget-content,#Grid-Page-Left #Quicksearch,#MicroBlog_Edit .microblogPresets,.obj-comment-list .comment-image,#ProfileEditGeneral #FutureUniSortable .sortablefutureUniElement .choose-box,div.obj-accordion dt,div.obj-accordion dd{border:1px solid #'+colors.cff90b0+'!important;}div.gadgets-gadget-chrome h2 a,#Mod-Profile-View h2 a{color:#'+colors.cd07070+'!important;}div.gadgets-gadget-chrome h2 a:hover,#Mygroups_Search_Result .resultText,div.Search_Groups #GroupMembership.resultText,p#nohits-notice,h2,h2.obj-subbar,div.obj-subbar h2,#Mod-Photos-Overview div.obj-subbar,#Mod-Photos-Album div.obj-subbar,#Snipplet-Photos-PhotoDetail div.obj-subbar,.photoTitle,#Mod-Profile-View h2 a:hover,#vcard-choose-list label,.obj-pagecounter{color:#'+colors.c904040+'!important;}div#mod-invitation-invitation,ul.obj-threadList li h3,.obj-comment-list li .comment-metainfo,div.obj-searchresults ul li,div.Snipplet-Photos-PhotoDetail,.pinboard-write{background-color:#'+colors.cf7f7f7+'!important;}body,#Grid-Page-Center-Footer #Policy-Footer img,.obj-border,.frame,#Grid-Page-Left #LeftsideBox div,div.autocompleteContainer,div.autocompleteContainerInvalid,#Mod-NobleProfile-Newsletter,.obj-context-content ul,.expedit-meta,#ProfileEditGeneral #FutureUniSortable .availableFutureElement,#PhotoAlbums_SingleView .ThumbsOverview #tagBar{background:#'+colors.cffffff+'!important;}.messages-list-content .tr,.messages-list-content .line,#MicroBlog_Edit .microblogPresets li,ul.obj-threadList li h3,.obj-comment-list li .comment-metainfo,.visitorsNavi,#Mod-Suggest-Snipplet .obj-comment-list li.comment-item,#Mod-Suggest-Pagelet .obj-comment-list li.comment-item,ul.obj-linklist li{border-bottom:1px solid #'+colors.cff90b0+'!important;}table.obj-table caption,table.obj-usertable caption,.photoTitle{background:#'+colors.cff90b0+'!important;}div.highlight,.bg-highlight{background-color:#'+colors.cfffbe2+'!important;border:1px solid #'+colors.cffe222+'!important;}h2#Fast-Register{color:white !important; border:none !important; background-color:transparent !important}.text h2{border-top:none !important; background:transparent !important;}a.link-face-button,input[type=submit],input[type=button],input[type=reset],button[type=submit],.btnLikeLink,#Grid-Page-Center-Footer > ul > li > a { color: black !important; }.obj-invitation-box h2{background:transparent !important; border:none !important;}';
	colorCss += '#Grid-Page-Center-Top { background:#' + colors.cdc1e64 + ' url(' + host + 'images/mask.png) !important; -moz-border-radius-topright:20px; } #Grid-Page-Center-Top h1 { width:auto !important; padding:10px !important; text-indent:0 !important; background:transparent !important; } #Grid-Page-Center-Footer { background:#' + colors.cdd1a71 + ' !important; } #Policy-Footer { display:none; }';
	colorCss += 'body.pvz #Mini-Loginbox { background-color:#'+colors.cf7c2db+' !important; border:1px solid #'+colors.cbb0500+' !important;} .phxDialogTop, .phxDialogBottom, .dialog-top, .dialog-bottom { display:none; } .phxDialogBody, .dialog-body { width:auto !important; padding:10px; background:#'+colors.cf7f7f7+' !important; border:solid 3px #'+colors.cdc1e64+' !important; } .phxDialog, .dialog-wrapper { -moz-border-radius:7px; border:solid 10px gray; } #recipientError { background:none !important; } .confirmInvite li { border-color:#'+colors.cdc1e64+' !important; } a#uservoice-feedback-tab { background-color:#'+colors.ccf90b0+' !important; border-color:#'+colors.ccf90b0+' #'+colors.ccf90b0+' #'+colors.ccf90b0+' -moz-use-text-color !important; }';
	GM_addStyle(colorCss);
}

//General css
var css = '#svzhomies-hue .ui-slider-handle { opacity:0.8; } #svzhomies-hue .ui-slider-handle:hover { opacity:1; } .ui-slider { margin: 5px; } #svzhomies-hue { background:url(' + host + 'color-slider.jpg); }.ui-state-default, .ui-widget-content .ui-state-de1fault { border: 1px solid #cccccc; background: #f6f6f6 url(images/ui-bg_glass_100_f6f6f6_1x400.png) 50% 50% repeat-x; font-weight: bold; color: #1c94c4; outline: none; }.ui-state-default a, .ui-state-default a:link, .ui-state-default a:visited { color: #1c94c4; text-decoration: none; outline: none; }.ui-state-hover, .ui-widget-content .ui-state-hover, .ui-state-focus, .ui-widget-content .ui-state-focus { border: 1px solid #fbcb09; background: #fdf5ce url(images/ui-bg_glass_100_fdf5ce_1x400.png) 50% 50% repeat-x; font-weight: bold; color: #c77405; outline: none; }.ui-state-hover a, .ui-state-hover a:hover { color: #c77405; text-decoration: none; outline: none; }.ui-state-active, .ui-widget-content .ui-state-active { border: 1px solid #fbd850; background: #ffffff url(images/ui-bg_glass_65_ffffff_1x400.png) 50% 50% repeat-x; font-weight: bold; color: #eb8f00; outline: none; }.ui-state-active a, .ui-state-active a:link, .ui-state-active a:visited { color: #eb8f00; outline: none; text-decoration: none; }.ui-corner-all { -moz-border-radius: 4px; -webkit-border-radius: 4px; }.ui-widget { font-family: Trebuchet MS, Tahoma, Verdana, Arial, sans-serif; font-size: 1.1em; }.ui-widget input, .ui-widget select, .ui-widget textarea, .ui-widget button { font-family: Trebuchet MS, Tahoma, Verdana, Arial, sans-serif; font-size: 1em; }.ui-widget-content { border: 1px solid #dddddd; background: #eeeeee url(images/ui-bg_highlight-soft_100_eeeeee_1x100.png) 50% top repeat-x; color: #333333; }.ui-widget-content a { color: #333333; }.ui-widget-header { border: 1px solid #e78f08; background: #f6a828 url(images/ui-bg_gloss-wave_35_f6a828_500x100.png) 50% 50% repeat-x; color: #ffffff; font-weight: bold; }.ui-widget-header a { color: #ffffff; }.ui-slider { position: relative; text-align: left; }.ui-slider .ui-slider-handle { position: absolute; z-index: 2; width: 9px; height: 1.2em; cursor: pointer; }.ui-slider .ui-slider-range { position: absolute; z-index: 1; font-size: .7em; display: block; border: 0; }.ui-slider-horizontal { height: .8em; }.ui-slider-horizontal .ui-slider-handle { top: -.3em; margin-left: -.6em; }.ui-slider-horizontal .ui-slider-range { top: 0; height: 100%; }.ui-slider-horizontal .ui-slider-range-min { left: 0; }.ui-slider-horizontal .ui-slider-range-max { right: 0; }.ui-slider-vertical { width: .8em; height: 100px; }.ui-slider-vertical .ui-slider-handle { left: -.3em; margin-left: 0; margin-bottom: -.6em; }.ui-slider-vertical .ui-slider-range { left: 0; width: 100%; }.ui-slider-vertical .ui-slider-range-min { bottom: 0; }.ui-slider-vertical .ui-slider-range-max { top: 0; } #svzhomies-spreadmsgs { list-style:none; padding:0; } #svzhomies-spreadmsgs a { display:block; margin-bottom:10px; } #svzhomies-link.expanded { background:' + getColor('dc1e64') + ' !important; color:white !important; } #svzhomies-showfeedback { margin-top:20px; } #svzhomies-name, #svzhomies-body { width:300px !important; } #svzhomies-settings { color:' + getColor('000000') + '; border:1px solid ' + getColor('dc1e64') + ';   border-top:none;   background:' + getColor('ff90b0') + ';   margin:1px;   margin-top:-12px;   padding:2px;   padding-bottom:5px;   display:none; } #svzhomies-version { text-align:right; color:gray; } #svzhomies-save { margin-top:3px; } #svzhomies-info, #svzhomies-changelog { background:' + getColor('e04060') + '; font-size:13px;  padding:5px;position:fixed;  } #svzhomies-info { text-align:center; border-bottom:solid 1px ' + getColor('ff8080') + '; font-weight:bold; width:100%; z-index:2; top:0; } #svzhomies-changelog { z-index:10; width:400px; border:solid 1px ' + getColor('ff8080') + '; border-top:none; display:none; } #svzhomies-changelog h2, #svzhomies-changelog h3 { font-size:13px; font-weight:bold; border:none; background:transparent; color:black; } #svzhomies-changelog h3 { font-size: 11px; margin-top:10px; margin-bottom:3px; }   #svzhomies-info a { color:black !important; text-decoration:underline; } #Grid-Wrapper { margin-top:30px; }';

if (document.documentElement.clientHeight > 582 && document.documentElement.clientWidth > 821) css += " #Grid-Page-Left { position:fixed; }";

GM_addStyle(css);

function getColor(color) {
  if (settings.changeColor) {
		if (colors['c' + color] !== undefined)
			return '#' + colors['c' + color];
		else
			return '#' + modifyColor(color, settings.h, settings.s / 100, settings.b / 100);
  } else {
    return '#' + color; }
}

function replaceMulti(input, replacements) {
  if (input.toggle !== undefined) {
    if (input.length == 0) { return; }
    var element = input[0]; }
  else {
    var element = input; }

  if (element.nodeType == 3) {
    for (var i = 0; i < replacements.length; ++i) {
      element.data = element.data.replace(replacements[i].search, replacements[i].replacement);
    }
  }
  else if (element.hasChildNodes) {
    for (i = 0; i < element.childNodes.length; ++i) {
      var subElement = element.childNodes[i];
      replaceMulti(subElement, replacements);
    }
  }
}

var postsToDo = [ ];

setInterval(function() {
	for (var i = 0; i < postsToDo.length; ++i)
		post(postsToDo[i].uri, postsToDo[i].params, postsToDo[i].success, postsToDo[i].fail);
		
	postsToDo = [ ];
}, 40);

function postFix(uri, params, success, fail) {
	postsToDo.push({ uri: uri, params: params, success: success, fail: fail });
}

function post(uri, params, success, fail) {
  var data = '';
  
  for (key in params)
    data += escape(key) + '=' + escape(params[key]) + '&';
    
  GM_xmlhttpRequest({
    method: 'POST',
    url: uri.concat(/\?/.test(uri) ? "&": "?", "noCache=", (new Date()).getTime(), ".", Math.random() * 1234567),
    data: data,
    headers : { 'Content-Type' : 'application/x-www-form-urlencoded' },
    onload: function(response) {
      if (response.status == 200)
        success(response);
      else
        fail(response);
    },
    onerror: function(response) {
      fail(response);
    }
  });
}

function get(params) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: params.uri.concat(/\?/.test(params.uri) ? "&": "?", "noCache=", (new Date()).getTime(), ".", Math.random() * 1234567),
    onload: function(response) {
      if (response.status == 200) {
        params.success(response); }
      else {
        GM_log('HTTP-GET request to ' + params.url + ' failed. Status code: ' + response.status);
        GM_log('Response: ' + response.responseText);
        params.fail(response);
      }
      
      if (params['after'] != undefined) {
        params.after(response); }
    },
    onerror: function(response) {
      GM_log('HTTP-GET request to ' + params.url + ' failed. Status code: ' + response.status);
      params.fail(response);
      
      if (params['after'] != undefined) {
        params.after(response); }
    }
  });
}

function replace(element, search, replacement) {
  var obj = {
    search: search,
    replacement: replacement
  };

  replaceMulti(element, [obj]);
}

[].contains || (Array.prototype.contains = function(x) {
	for (var i = 0; i < this.length; ++i)
		if (this[i] == x) return true;
	return false;
});

//Color functions
function hexToRgb(hex) {
	if (hex[0] == '#') hex = hex.substring(1);
	
	var r, g, b;

	if (hex.length == 6) {
		r = hex.substring(0, 2);
		g = hex.substring(2, 4);
		b = hex.substring(4, 6);
	}
	else if (hex.length == 3) {
		r = hex[0] + hex[0];
		g = hex[1] + hex[1];
		b = hex[2] + hex[2];
	}

	return {
		r: parseInt(r, 16),
		g: parseInt(g, 16),
		b: parseInt(b, 16)
	};
}

function rgbToHex(rgb) {
	var r = rgb.r.toString(16);
	var g = rgb.g.toString(16);
	var b = rgb.b.toString(16);
	
	if (r.length == 1) r = '0' + r;
	if (g.length == 1) g = '0' + g;
	if (b.length == 1) b = '0' + b;
	
	return r + g + b;
}

function rgbToHsb(rgb) {
	var h, s, b;
	
	var max = Math.max(rgb.r, Math.max(rgb.g, rgb.b));
	var min = Math.min(rgb.r, Math.min(rgb.g, rgb.b));
	
	if (max == min) h = 0;
	else if (max == rgb.r) h = 60 * (0 +(rgb.g - rgb.b) / (max - min));
	else if (max == rgb.g) h = 60 * (2 + (rgb.b - rgb.r) / (max - min));
	else if (max == rgb.b) h = 60 * (4 + (rgb.r - rgb.g) / (max - min));
	
	if (h < 0) h += 360;
	
	if (max == 0) s = 0;
	else s = (max - min) / max;
	
	b = max / 255;
	
	return {
		h: h,
		s: s,
		b: b
	};
}

function hsbToRgb(hsb) {
	var rgb = {};
	
	var hi = Math.floor(hsb.h / 60);
	var f = hsb.h / 60 - hi;
	
	var p = hsb.b * (1 - hsb.s);
	var q = hsb.b * (1 - hsb.s * f);
	var t = hsb.b * (1 - hsb.s * (1 - f));
	
	if (hi == 0 || hi == 6) rgb = { r: hsb.b, g: t, b: p };
	else if (hi == 1) rgb = { r: q, g: hsb.b, b: p };
	else if (hi == 2) rgb = { r: p, g: hsb.b, b: t };
	else if (hi == 3) rgb = { r: p, g: q, b: hsb.b };
	else if (hi == 4) rgb = { r: t, g: p, b: hsb.b };
	else if (hi == 5) rgb = { r: hsb.b, g: p, b: q };
	
	rgb.r = Math.round(rgb.r * 255);
	rgb.g = Math.round(rgb.g * 255);
	rgb.b = Math.round(rgb.b * 255);
	
	return rgb;
}

function modifyColor(hex, h, s, b) {
	var rgb = hexToRgb(hex);
	var hsb = rgbToHsb(rgb);
	
	hsb.h += h;
	hsb.s += s;
	hsb.b += b;
	
	if (hsb.h < 0) hsb.h += 360;
	else if (hsb.h > 360) hsb.h -= 360;
	
	if (hsb.s < 0) hsb.s = 0;
	else if (hsb.s > 1) hsb.s = 1;
	
	if (hsb.b < 0) hsb.b = 0;
	else if (hsb.b > 1) hsb.b = 1;
	
	rgb = hsbToRgb(hsb);
	
	return rgbToHex(rgb);
}

function replaceColors(css) {
	var colors = [ ];
	var regex = /#([0-9A-F]{3,6})/gi;
	var match;
	var result = css;
	
	while (match = regex.exec(css) != null) {
		var color = match[1].toLowerCase();
		if (!colors.contains(color)) colors.push(color);
	}
	
	for (var color in colors) {
		regex = new RegExp('#' + color, 'gi');
		result = result.replace(regex, '#' + modifyColor(color));
	}
	
	return result;
}

function compareVersion(x, y) {
  x = x.split('.');
  y = y.split('.');

	while (x.length < y.length) {
		x.push(0); }
	
	while (y.length < x.length) {
		y.push(0); }
		
	for (var i = 0; i < x.length; ++i) {
		if (x[i] > y[i]) {
			return 1; }
		else if (x[i] < y[i]) {
			return -1; }
  }
	
	return 0;
}

function checkVersion() {
  if (!settings.updateVersion) {
    get({ //Check for update
      uri: 'http://userscripts.org/scripts/source/44175.meta.js',
      success: function(response) { 
        //Extract version
        var newVersion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(response.responseText);
        newVersion = newVersion[1];
        
        //Compare versions
        if (compareVersion(version, newVersion) < 0) {
          settings.updateVersion = newVersion;
          
          get({ //Get changelog
            uri: host + 'changelog-ajax?version=' + version,
            success: function(response) {
                var changelog = eval('( ' + response.responseText + ' )');
                var html = '';
              
                for (versionKey in changelog) {
                  html += '<h3>' + versionKey + '</h3><ul>';
                  for (var i = 0; i < changelog[versionKey].length; ++i)
                    html += '<li>' + changelog[versionKey][i] + '</li>';
                  html += '</ul>';
                }

                settings.updateChangelog = html;
            },
            fail: function(response) {
              settings.updateChangelog = '<a href="http://userscripts.org/scripts/show/44175">Siehe hier</a>';
            },
            after: function(response) {
              showUpdateBar();
            }
          });
        }
      },
      fail: function(response) {
        GM_log('SVZ Homies update fail');
      }
    });
  }
  else if (settings.updateVersion != false)
    if (compareVersion(version, settings.updateVersion) != -1)
      settings.updateVersion = false;
    else 
      showUpdateBar();
}

function showInfoBar(content) {  
	$('body').css('padding', 0);
  $('body').prepend(
    '<div id="svzhomies-info">' +
       content +
    '</div>'
    );
}

function showUpdateBar() {
	$('#svzhomies-info').remove();
	
  showInfoBar('Eine neue SVZ Homies-Version ist verfügbar! ' + 
      '<a href="' + host + 'script-update.user.js" title="Mit 2 Klicks die neue Version installieren!">Jetzt installieren</a> ' +
      '<a id="svzhomies-show-changelog" href="">Änderungen anzeigen</a>');

	$('#svzhomies-info').after('<div id="svzhomies-changelog">' +
      '<h2>Änderungen von Version ' + version + ' auf Version ' + settings.updateVersion + '</h2>' +
      settings.updateChangelog +
    '</div>');

  var showLog = $('#svzhomies-show-changelog');
  var log = $('#svzhomies-changelog');
  
  showLog.click(function() {
    if (log.is(':hidden'))
      log.css('left', showLog.position().left - 200 + showLog.width() / 2)
         .css('top', ($('#svzhomies-info').outerHeight() - 1) + 'px');
    log.slideToggle();
		return false;
  });
  
  log.click(function() {
    log.slideUp();
  });
}

function svzhomies() {
  document.getElementById('installed').innerHTML = 'Du hast SVZ Homies!';
}

function svz_set_title(title) {
  if (document.URL.match(/www.schuelervz.net/)) {
    document.title = 'schuelerVZ | ' + title; }
  else {
    document.title = 'studiVZ | ' + title; }
}

function svz_popup(title, content) {
	$('body').append(
		'<div id="PhxCover" style="width: 100%; height: 1443px; display: block;"/>' +
		'<div id="PhxDialog0" class="obj-dialog-overlay" style="top: 100px;">' +
			'<div class="dialog-wrapper">' +
				'<div class="dialog-body">' +
					'<div class="dialog-title">' + title + '</div>' +
					'<div class="dialog-content">' + content + '</div>' +
				'</div>' +
			'</div>' +
		'</div>'
	);
	
	$('#PhxCover, #PhxDialog0').hide().fadeIn('fast', function() {
		$('#svzhomies-cancel').click(svz_hide_popup);
	});
}

function svz_hide_popup() {
	$('#PhxCover, #PhxDialog0').fadeOut('fast', function() {
		$(this).remove();
	});
}

function svz_send_feedback() {
	svz_popup('SVZ Homies - Feedback', feedbackFormHtml);
	
  $('#svzhomies-sendfeedback').click(function() { 
    var id = new RegExp('/Profile/([0-9a-zA-Z_-]{43})(/|$)', 'i').exec($('#Grid-Navigation-Main li:eq(1) a.left').attr('href'));
    id = id[1];
		
    postFix(host + 'feedback.php',
        {
          name: $('#svzhomies-name').val(),
          content: $('#svzhomies-body').val(),
          svzid: id
        },
        function(response) {
          var data = eval('(' + response.responseText + ')');
					
          if (data.success === true) {
            $('#PhxDialog0 .dialog-content').html('<p>Feedback abgeschickt!</p>'  +
							'<a href="' + host + 'guestbook" class="link-face-button" target="_blank">Eintrag zeigen</a>' +
							'<a href="javascript:;" class="link-face-button" id="svzhomies-cancelfeedback">Schließen</a>' +
							'<br class="no-float" />'
						);

            $('#svzhomies-cancelfeedback').click(function() {
              $('#PhxDialog0, #PhxCover').remove();
            });
          }
          else {
						var message = '';

            for (var i = 0; i < data.errors.length; ++i)
              message += data.errors[i] + '\r\n';
							
						alert(message);
          }
        },
        function(response) {
          alert('Sry, das läuft gerade nicht. Versuchs doch später noch mal.');
        }
      );
			
			return false;
  });

	$('#svzhomies-name').focus();
}

function svz_ask_feedback() {
	svz_popup('SVZ Homies - Feedback', feedbackPromptHtml);
  
  $('#svzhomies-yesfeedback').click(function() {
    svz_hide_popup();
    svz_send_feedback();
  });
}

function svz_spread() {
	var html = spreadPromptHtml + '<ul id="svzhomies-spreadmsgs">';
	for (var i = 0; i < spreadMessages.length; ++i) 
		html += '<li><a href="">' + spreadMessages[i] + '</a></li>';
	html += '</ul><div></div>';
	
	svz_popup('Erzähl allen von SVZ Homies!', html);
	$('#svzhomies-spreadmsgs a').click(function() {
		svz_hide_popup();
		$('#Mod-Feedbox-Textarea').val($(this).text());
		$('#Feeds-Post-Form').submit();
		
		settings.toldEveryone = true;
		
		return false;
	});
	return false;
}

function svz_settings() {
  //HTML-Code für Einstellungen
  var html = '<div id="svzhomies-settings">';
  html += '<div id="svzhomies-version">Version ' + version + '</div>';
	html += '<input id="svzhomies-replace" type="checkbox" /> Ersetzungen aktivieren<br />';
	html += '<input id="svzhomies-changecolor" type="checkbox" /> Farbe ändern<br />';
	html += '<div id="svzhomies-color">';
	html += 'Farbton: <div id="svzhomies-hue"></div>';
	html += 'Sättigung: <div id="svzhomies-saturation"></div>';
	html += 'Helligkeit: <div id="svzhomies-brightness"></div>';
	html += '</div>';
  html += '<input id="svzhomies-save" type="button" value="Speichern" /><br />';
  html += '<a href="' + host + '">Homepage</a> / ';
  html += '<a href="http://www.schuelervz.net/Groups/Overview/9873d8341d2b97a4">Gruppe</a>';
  html += '</div>';
  
  //Box und Link einfügen
  $('#LeftsideBox').before(html);
	
	$('#Grid-Navigation-Main')
		.append('<li><a id="svzhomies-showfeedback" href="#">Wie gefällt dir SVZ Homies?</a></li>');
	
	if (svz_checkpage('Start'))
		$('#Grid-Navigation-Main').append('<li><a id="svzhomies-spread" href="#">Erzähl allen von SVZ Homies!</a></li>');
		
  $('#Grid-Navigation-Main')
		.append('<li><a id="svzhomies-link" href="#">SVZ Homies einstellen</a></li>');
	
  
  //Einstellungen laden
	$('#svzhomies-replace').attr('checked', settings.replace);
	$('#svzhomies-changecolor').attr('checked', settings.changeColor);
	var h = settings.h;
	if (h > 22) h -= 360;
	if (h < -338) h += 360;
  $('#svzhomies-hue').slider({ max: 22, min: -338, value: h });
  $('#svzhomies-saturation').slider({max: 100, min: -100, value: settings.s });
	$('#svzhomies-brightness').slider({max: 100, min: -100, value: settings.b });
  
  //Einstellungen anzeigen/verstecken
  $('#svzhomies-link').click(function() {
    $('#svzhomies-settings').slideToggle('fast', function() {
      if ($('#svzhomies-settings').is(':hidden'))
        $('#svzhomies-link').removeClass('expanded');
      else 
        $('#svzhomies-link').addClass('expanded');
    });
  });
  
  //Einstellung für Farbe anzeigen/vestecken
  $('#svzhomies-changecolor').change(function() {
    if ($(this).attr('checked'))
      $('#svzhomies-color').slideDown('fast');
    else
      $('#svzhomies-color').slideUp('fast');
  });
	
  //Eintellungen speichern
  $('#svzhomies-save').click(function() {
		settings.replace = $('#svzhomies-replace').is(':checked');
		settings.changeColor = $('#svzhomies-changecolor').is(':checked');
		settings.h = $('#svzhomies-hue').slider('option', 'value');
		settings.s = $('#svzhomies-saturation').slider('option', 'value');
		settings.b = $('#svzhomies-brightness').slider('option', 'value');

    $('#svzhomies_settings').slideUp('fast');
    location.reload();
  });
  
  //Feedback senden
  $('#svzhomies-showfeedback').click(svz_send_feedback);
	$('#svzhomies-spread').click(svz_spread);
}

function svz_navi() {
  if (svz_checkpage('(Default)?$') || svz_checkpage('Login') || svz_checkpage('Logout')) {
    return;
  }
  
  //Navi (links)
  var navi = $('#Grid-Navigation-Main > li > a');
  navi.eq(0).text(data.navi.home);
  navi.eq(1).text(data.navi.mypage);
  navi.eq(3).text(data.navi.friends);
  navi.eq(5).text(data.navi.groups);
  navi.eq(9).text(data.navi.privacy);

  //Navi (oben rechts)
  var topNavi = $('#Grid-Page-Center-Top-Navigation > li > a');
  topNavi.eq(0).text(data.navi.search);
  topNavi.eq(3).text(data.navi.invite);
  topNavi.eq(4).text(data.navi.help);
  topNavi.eq(6).text(data.navi.logout);

  //Navi (unten)
  var bottomNavi = $('#Grid-Page-Center-Footer > ul > li > a');
  
  if (new RegExp('schuelervz', 'i').exec(document.URL) !== null) {
    bottomNavi.eq(0).text(data.navi.forpupils);
    bottomNavi.eq(3).text(data.navi.forparents);
    bottomNavi.eq(9).text(data.navi.forpress);
  } else {
    bottomNavi.eq(1).text(data.navi.forpress);
  }
}

function svz_replace() {
  replaceMulti($("#Grid-Page-Center-Content"), data.general);
  replaceMulti($("#Grid-Page-Center-Header"), data.general);
}

function svz_colors() {
	$('#Grid-Page-Center-Top h1').text('SchülerVZ');
}

function svz_general() {
  //Plauderkasten-Online-Leute
  $link = $('#Chat_Online_Link');
  if ($link.length > 0) {
    $link[0].childNodes[0].nodeValue = data.plauderkasten + ' ('; }
    
  //Werbung und Rahmen entfernen
  $('#Grid-Advertising-Top, #Grid-Advertising-Right').remove();
  $('#Policy-Footer').remove();
  
  //Plauderkasten-Titel
  $('#Chat_Topbar .Chat_TopbarTitle').text(data.plauderkasten);
}

function svz_home() {
  //Titel
  svz_set_title(data.home.title);
  
  //Kennst du schon
  $('#Mod-Kdk-Snipplet h2').text(data.didyouknow + ':');
  
  //Besucher auf deiner Seite
  replace($('#Visitors .text h2'), 'angesehen', data.visitors.visited);
  
  var visitorsCounter = $('#Visitors .visitorsCounter');
  replace(visitorsCounter, 'Besucher', data.visitors.visitors);
  replace($('#Grid-Page-Center-Content > #pvzWebSlice > div:eq(0) >  #Visitors > .text > .visitorsNavi > a'), 'Leute', data.visitors.visitors);
  
  //Besucherzahl
  var updateVisitors = function(add) { //Besucherzahl um beliebige Anzahl erhöhen
    var regex = new RegExp('\\d+');
    var match = regex.exec(visitorsCounter.text());
    if (match != null) {
      var visitors = parseInt(match[0]);
      var newVisitors = visitors + add;
      visitorsCounter.text(visitorsCounter.text().replace(visitors, newVisitors));
    }
  };
  
  //Links hinzufügen
  $('#Grid-Page-Center-Footer .last').attr('class', 'third');
  $('#Grid-Page-Center-Footer').append(
    '<ul class="last">' +
      '<li><a id="svzhomies_visitorsplus100" href="" onclick="return false;">' + data.visitors.visitors + ' +100</a></li>' +
      '<li><a id="svzhomies_visitorsreset" href="" onclick="return false;">Zurücksetzen</a></li>' +
    '</ul>'
    );
    
  $('#svzhomies_visitorsplus100').click(function() { //Um 100 erhöhen
		settings.visitorsplus += 100;
    updateVisitors(100);
  });
  
  $('#svzhomies_visitorsreset').click(function() { //Zurücksetzen
    updateVisitors(-settings.visitorsplus);
		settings.visitorsplus = 0;
  });
  
  updateVisitors(GM_getValue('visitorsplus')); //Auf Einstellung updaten

  //Buschfunk (DOM nötig weil sonst der Ausblenden-Link entfernt wird)
  ($('#Mod-Feedbox-Snipplet div:eq(1) h2')[0]).childNodes[2].data = data.buschfunk.title;
	
	//Info-Bar
	if (!settings.toldEveryone) {
		showInfoBar('Gefällt dir SVZ Homies? <a id="svzhomies-spread-top" href="">Erzähl deinen Homies doch davon!</a>');
		$('#svzhomies-spread-top').click(svz_spread);
	}
}

function svz_buschfunk() {
  svz_set_title(data.buschfunk.pagetitle);
  $('h1').text(data.buschfunk.title);
  $('h2').text(data.buschfunk.subtitle);
}

function svz_visitors() {
  replace($('h1'), 'angesehen', data.visitors.visited);
  svz_set_title(data.visitors.title);
}

function svz_friends() {
  //Titel
  svz_set_title(data.friends.pagetitle);

  //Titel
  $('#Grid-Page-Center-Header h1').text(data.friends.title);

  //Suchfeld
  $('#Grid-Page-Center-Content > . Friends-FriendsPagelet > #friendlistSearchFrom > #Friends_name').val(data.friends.search);

  //Nur online Leute anzeigen
  $('label[for=onlineOnly]').text(data.friends.online);
}

function svz_delete_friend() {
  //Buttons
  $('input[type=submit]').val(data.delete_friend.ok);
  $('form > a').text(data.delete_friend.cancel);
}

function svz_gruscheln() {
  svz_set_title(data.gruschel);
  //Buttons
  $('input[type=submit]').val(data.gruschel_ok);
  $('form > a').text(data.cancel);
}

function svz_groups() {
  //Titel
  svz_set_title(data.groups.pagetitle);

  //Titel
  $('#Grid-Page-Center-Header h1').text(data.groups.title);
  $('Grid-Page-Center > #Grid-Page-Center-Content #Groups_s').val(data.groups.search);
}

function svz_group_leave() {
  svz_set_title(data.group_leave.title);
  $('input[type=submit]').val(data.group_leave.ok);
  $('form > a').text(data.group_leave.cancel);
}

function svz_profile() {
stops.profilestart = new Date();
  //Ist-gerade
  // var microblog = $('#MicroBlog h2');
  // var replacements = [{
    // search: 'ist gerade',
    // replacement: data.profile.microblog
  // },
  // {
    // search: 'bin gerade',
    // replacement: data.profile.microblog_i
  // }];

  // replaceMulti(microblog, replacements);

  //Pinnwand
  var title = $('#Mod-Pinboard-Snipplet h2 span');
  if (title.length == 0) {
    title = $('#Mod-Pinboard-Snipplet h2'); }
    
  title.text(data.pinboard.title);

  $('#Mod-Pinboard-Snipplet a.showForm').text(data.pinboard.write);

  var counter = $('#Grid-Page-Center #Mod-Pinboard-Snipplet .obj-subbar-info a');
  var final = counter.text().replace('Einträgen', data.pinboard.posts);
  
  counter.text(final);

  $('a.pinboard_DeleteItemLink').text(data.pinboard.del);

  //Freundschaft beenden
  if ($('#Friends-Connection li').length == 2) {
    var id = (new RegExp('Profile/([0-9a-zA-Z_-]{43})').exec(document.URL))[1];
    $('#profileLeft .obj-linklist').append('<li><a href="/Friends/Delete/' + id + '">Freundschaft beenden</a></li>');
  }
}

function svz_pinboard() {
  $('#Pinboard_list a.showForm').text(data.pinboard.write);
}

function svz_privacy() {
  //Titel
  svz_set_title(data.privacy.title);

  //Titel
  $('#Grid-Page-Center-Header h1').text(data.privacy.title);
}

function svz_pros() {
  $('#Profile_InformationSnipplet h2').after('<div class="accountStatus clearFix">' + data.pro_label + '</div>');
}

function svz_didyouknow() {
  svz_set_title(data.didyouknow);
  $('h1').text(data.didyouknow);
};

function svz_photo() {
  var link = $('#PhotoContainer img').attr('src');
  $('.photo-actions').prepend('<a href="' + link + '" title="Rechtsklick-&gt;Ziel speichern unter zum Abspeichern">Foto speichern</a>');
}

function svz_dopeyoursvz() {
  $('#GroupsInformation dt:eq(1)').text('Gruppe + Ideen:');
	$('#GroupsInformation dd:eq(1)').after('<dt>Script-Programmierung:</dt><dd class="overflow-hidden"><a href="/Profile/ph37NTKm8zdetjajzMkdNvH_Qb8tsMiGc4lZ8j_-2hY">Eric W.</a></dd>');
  $('#GroupsInformation dd:eq(4)').html('<a href="http://svzhomies.bplaced.de/">SVZ Homies Webseite</a>');
}

function svz_gadgetinstall() {
  if (settings.color > 0) {
    $('#Mod-Gadgets-InstallPagelet').css({
      'background-image': 'url(' + host + 'svz-header/header-gadget-' + color + '.png)',
      'border-color': getColor('ff8080')
    });
  }
}

function svz_checkpage(page) {
  return document.URL.match(new RegExp('^https?://www\.(secure\.)?(schueler|studi)vz\.net/' + page, 'i'));
}

function svz() {
  checkVersion();
  
	if (settings.changeColor) svz_colors();
	if (settings.replace) {
		stops.svzstart = new Date();
		
		svz_general();
		
		stops.general = new Date();
		
		if (svz_checkpage('Start')) {
			svz_home(); }

		if (svz_checkpage('Feeds')) {
			svz_buschfunk(); }

		if (svz_checkpage('Visitors/LongList')) {
			svz_visitors(); }

		if (svz_checkpage('Friends/All/')) {
			svz_friends(); }

		if (svz_checkpage('Friends/Delete/')) {
			svz_delete_friend(); }

		if (svz_checkpage('Gruscheln/DialogGruscheln/')) {
			svz_gruscheln(); }

		if (svz_checkpage('Groups/Leave/')) {
			svz_group_leave(); }

		if (svz_checkpage('Profile')) {
			svz_profile(); }

		if (svz_checkpage('Pinboard/')) {
			svz_pinboard(); }

		if (svz_checkpage('Groups($|/$|/tid)')) {
			svz_groups(); }

		if (svz_checkpage('Privacy')) {
			svz_privacy(); }

		if (svz_checkpage('Profile/(ph37NTKm8zdetjajzMkdNvH_Qb8tsMiGc4lZ8j_-2hY|ph37NTKm8zdetjajzMkdNlpGmBxzTdxGiizFlsmGceU)')) {
			svz_pros(); }
		
		if (svz_checkpage('Groups/Overview/9873d8341d2b97a4')) {
			svz_dopeyoursvz(); }
		
		if (svz_checkpage('Kds/Kdk')) {
			svz_didyouknow(); }
			
		if (svz_checkpage('Photos/View/')) {
			svz_photo(); }
			
		if (svz_checkpage('Gadgets/Install/')) {
			svz_gadgetinstall(); }
			
		stops.page = new Date();
		svz_replace();
		stops.replace = new Date();
		svz_navi();
		stops.navi = new Date();
		
		stops.settings = new Date();
	}
	
	svz_settings();
}

stops.parse = new Date();
stops.vcheck = new Date();

var countdown = GM_getValue('feedback');
if (countdown > 1) {
  GM_setValue('feedback', countdown - 1);
}
else if (countdown == 1) {
  GM_setValue('feedback', -1);
  svz_ask_feedback();
}

if (document.URL.match(new RegExp('^https?://(www\.)?(secure\.)?(schueler|studi)vz\.net/', 'i'))) {
  svz();
}