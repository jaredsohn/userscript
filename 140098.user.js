// ==UserScript==
// @name			Jappy Navigator
// @namespace		Autor: gorgon
// @namespace		http://www.jappy.de/user/gorgon
// @description		Fuegt ein alternatives Navigationsmenue ein
// @version			2.3.31
// @include			*jappy.de*
// @include			*jappy.at*
// @include         *jappy.com*
// @exclude			*jappy.tv*
// @exclude			*popup*
// ==/UserScript==

// css-style in html einfuegen
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var url = document.location.href;

if (url.indexOf("jappy.de")>=0) {
var MainUrl = "http://www.jappy.de"
}
if (url.indexOf("jappy.at")>=0) {
var MainUrl = "http://www.jappy.at"
}
if (url.indexOf("jappy.com")>=0) {
var MainUrl = "http://www.jappy.com"
}

load_navigator(url,MainUrl)

function load_navigator(url,MainUrl) {
// angaben fuer Updatefunktion
var CurrentScriptVersion = '2.3.31';
var xmlurl = 'http://userscripts.org/scripts/show/59727';
var downloadurl = 'http://userscripts.org/scripts/source/59727.user.js';

HTTP_REQ(url,'GET',jappy_infos,CurrentScriptVersion,downloadurl,xmlurl);
function jappy_infos(resp2,CurrentScriptVersion) {
	var Name = resp2.responseText.split('User.nickname = "')[1].split('"')[0];
	var UserId = resp2.responseText.split('User.id = "')[1].split('"')[0];
	var ImgServerUrl = resp2.responseText.split('Jpy.picurl = "')[1].split('";')[0];
	var userNewMail = resp2.responseText.split('User.newMails = ')[1].split(';')[0];
	
	create_menue(Name,UserId,MainUrl,ImgServerUrl,userNewMail,CurrentScriptVersion,downloadurl,xmlurl);
}			
}

function create_menue(Name,UserId,MainUrl,ImgServerUrl,userNewMail,CurrentScriptVersion,downloadurl,xmlurl) {

// farbangaben laden
// hintergruende
// menuekoepfe
var head_bg_color = GM_getValue('head_bg_color' + UserId, 'white');
// menuepunkte
var body_bg_color = GM_getValue('body_bg_color' + UserId, '#3b89cb');
// menuepunkte hover
var body_bg_color_hov = GM_getValue('body_bg_color_hov' + UserId, '#3980be');

// schrift
// menuekoepfe
var head_txt_color = GM_getValue('head_txt_color' + UserId, 'black');
// menuepunkte
var body_txt_color = GM_getValue('body_txt_color' + UserId, 'white');
// menuepunkte hover
var body_txt_color_hov = GM_getValue('body_txt_color_hov' + UserId, 'white');

// css erstellen
addGlobalStyle('#acc {width:160px; list-style:none; float:left; text-align:left;}')
addGlobalStyle('.main_point {width:154px; padding:6px 0px 8px 6px; font-size:12px; font-weight:bold; margin-top:12px; color:'+head_txt_color+'; background:'+head_bg_color+'; z-index:10000;}')
addGlobalStyle('.acc-content {width:160px; background:'+body_bg_color+';}')
addGlobalStyle('.acc-content a {text-decoration:none; color:'+body_txt_color+'; display:block; padding:3px 0px 3px 15px;}')
addGlobalStyle('.acc-content a:hover {text-decoration:none; color:'+body_txt_color_hov+'; display:block; background:'+body_bg_color_hov+';}')
addGlobalStyle('#Hilfe_StatusBox { cursor:help; color:blue; }')
// schattenefeckt
addGlobalStyle('.jn_box_shadow {-moz-box-shadow: 10px 10px 5px grey;}')
// css fuer select-box (statuswechsel)
addGlobalStyle('.JappyStatusWechsel { width:130px; background:'+body_bg_color+'; color:'+body_txt_color+'; border:1px dotted '+body_txt_color+'; -moz-border-radius:5px; } ')
addGlobalStyle('.JappyStatusWechsel:hover { background:'+body_bg_color_hov+'; color:'+body_txt_color_hov+'; }')
// css fuer updatelink
addGlobalStyle('a#JappyUpdate:hover { cursor:pointer; }')
addGlobalStyle('#JappyUpdate img { position:relative; top:3px; }')
// css supportblock
addGlobalStyle('#jpy_n_support { padding:4px 0px 5px 0px; background:'+body_bg_color+'; }')
addGlobalStyle('#cjsb { cursor:move; }')
addGlobalStyle('a.jn_sb_ic { padding:3px; }')
addGlobalStyle('a.jn_sb_ic:hover { background:#ffffff; }')
addGlobalStyle('#cjnc { margin-left:12px; }')
// css timeranzeige
addGlobalStyle('#jpy_n_support li {width:160px;}')
addGlobalStyle('#jpy_n_support li a {text-decoration:none; color:'+body_txt_color+'; display:block; padding:3px 0px 3px 15px;}')
addGlobalStyle('#jpy_n_support li a:hover {text-decoration:none; color:'+body_txt_color_hov+'; background:'+body_bg_color_hov+'; cursor:pointer;}')
// einstellungs icons in menuebloecken
addGlobalStyle('.block_set_icon { float:right; margin:4px; z-index:20000; cursor:pointer; }');
addGlobalStyle('.block_set_icon:hover { background-color:#3b89cb; }');
// klapfunktions icons
addGlobalStyle('.oc_cursor { cursor:s-resize; float:right; }');


// angaben fuer statuswechsel
var status1 = "<option id=\"status1\" value=\"1\"> Online</option>";
var status19 = "<option id=\"status19\" value=\"19\"> Arbeiten</option>";
var status2 = "<option id=\"status2\" value=\"2\"> Abwesend</option>";
var status3 = "<option id=\"status3\" value=\"3\"> Kurz weg</option>";
var status4 = "<option id=\"status4\" value=\"4\"> Nicht st&ouml;ren!</option>";
var status5 = "<option id=\"status5\" value=\"5\"> Profilarbeiten</option>";
var status17 = "<option id=\"status17\" value=\"17\"> Gleich weg</option>";
var status18 = "<option id=\"status18\" value=\"18\"> Bin daheim</option>";
var status23 = "<option id=\"status23\" value=\"23\"> Neues Bild!</option>";
var status27 = "<option id=\"status27\" value=\"27\"> Im I-Netcafe</option>";
var status33 = "<option id=\"status33\" value=\"33\"> Bin M&uuml;de</option>";
var status35 = "<option id=\"status35\" value=\"35\"> Schlafen</option>";
var status36 = "<option id=\"status36\" value=\"36\"> Habe Besuch</option>";
var status42 = "<option id=\"status42\" value=\"42\"> Urlaub</option>";
var status_option_1 = "<optgroup label=\"Status\">"+status1+status19+status2+status3+status4+status5+status17+status18+status23+status27+status33+status35+status36+status42+"</optgroup>";

var status6 = "<option id=\"status6\" value=\"6\"> Gute Laune</option>";
var status7 = "<option id=\"status7\" value=\"7\"> Bin down</option>";
var status8 = "<option id=\"status8\" value=\"8\"> Bin traurig</option>";
var status9 = "<option id=\"status9\" value=\"9\"> Love</option>";
var status10 = "<option id=\"status10\" value=\"10\"> Herzschmerz</option>";
var status11 = "<option id=\"status11\" value=\"11\"> Groovin</option>";
var status12 = "<option id=\"status12\" value=\"12\"> Party!</option>";
var status13 = "<option id=\"status13\" value=\"13\"> Langweilig!</option>";
var status14 = "<option id=\"status14\" value=\"14\"> Krank</option>";
var status15 = "<option id=\"status15\" value=\"15\"> Regenbogen</option>";
var status16 = "<option id=\"status16\" value=\"16\"> Stress</option>";
var status25 = "<option id=\"status25\" value=\"25\"> Sauer</option>";
var status26 = "<option id=\"status26\" value=\"26\"> Gereizt</option>";
var status50 = "<option id=\"status50\" value=\"50\"> Nachdenklich</option>";
var status51 = "<option id=\"status51\" value=\"51\"> Gl&uuml;cklich</option>";
var status53 = "<option id=\"status51\" value=\"53\"> Verwirrt</option>";
var status54 = "<option id=\"status54\" value=\"54\"> Aua!</option>";
var status55 = "<option id=\"status55\" value=\"55\"> Trauer</option>";
var status_option_2 = "<optgroup label=\"Gef&uuml;hl\">"+status6+status7+status8+status9+status10+status11+status12+status13+status14+status15+status16+status25+status26+status50+status51+status53+status54+status55+"</optgroup>";

var status20 = "<option id=\"20\" value=\"20\"> Studieren</option>";
var status21 = "<option id=\"21\" value=\"21\"> Schreiben</option>";
var status22 = "<option id=\"22\" value=\"22\"> Lesen</option>";
var status24 = "<option id=\"24\" value=\"24\"> Kaffe trinken</option>";
var status28 = "<option id=\"28\" value=\"28\"> Fernsehen</option>";
var status29 = "<option id=\"29\" value=\"29\"> Essen</option>";
var status30 = "<option id=\"30\" value=\"30\"> Pause</option>";
var status31 = "<option id=\"31\" value=\"31\"> Spielen</option>";
var status32 = "<option id=\"32\" value=\"32\"> Planschen</option>";
var status34 = "<option id=\"34\" value=\"34\"> Telefonieren</option>";
var status37 = "<option id=\"37\" value=\"37\"> Sporteln</option>";
var status38 = "<option id=\"38\" value=\"38\"> Shoppen</option>";
var status39 = "<option id=\"39\" value=\"39\"> WC</option>";
var status40 = "<option id=\"40\" value=\"40\"> Gassi gehen</option>";
var status41 = "<option id=\"41\" value=\"41\"> Sonnen</option>";
var status43 = "<option id=\"43\" value=\"43\"> Hausarbeit</option>";
var status44 = "<option id=\"44\" value=\"44\"> Rauchen</option>";
var status45 = "<option id=\"45\" value=\"45\"> Im Garten</option>";
var status46 = "<option id=\"46\" value=\"46\"> Chillen</option>";
var status47 = "<option id=\"47\" value=\"47\"> Stylen</option>";
var status48 = "<option id=\"48\" value=\"48\"> Handarbeiten</option>";
var status49 = "<option id=\"49\" value=\"49\"> Kochen</option>";
var status_option_3 = "<optgroup label=\"T&auml;tigkeit\">"+status20+status21+status22+status24+status28+status29+status30+status31+status32+status34+status37+status38+status39+status40+status41+status43+status44+status45+status46+status47+status48+status49+"</optgroup>";


var overview_oc = GM_getValue('overview_oc' + UserId, true);
var myjpy_oc = GM_getValue('myjpy_oc' + UserId, true);
var mehr_oc = GM_getValue('mehr_oc' + UserId, true);
var info_oc = GM_getValue('info_oc' + UserId, true);

// css klapfunktion mein-jappy
if (overview_oc == true) {
addGlobalStyle('#overview_block_div { display:block; }')
var ov_class = "icMenueHide oc_cursor";
} else {
addGlobalStyle('#overview_block_div { display:none; }')
var ov_class = "icShowMenue oc_cursor";
}

// css klapfunktion mein-jappy
if (myjpy_oc == true) {
addGlobalStyle('#myjpy_block_div { display:block; }')
var my_class = "icMenueHide oc_cursor";
} else {
addGlobalStyle('#myjpy_block_div { display:none; }')
var my_class = "icShowMenue oc_cursor";
}

// css klapfunktion mehr-block
if (mehr_oc == true) {
addGlobalStyle('#mehr_block_div { display:block; }')
var me_class = "icMenueHide oc_cursor";
} else {
addGlobalStyle('#mehr_block_div { display:none; }')
var me_class = "icShowMenue oc_cursor";
}

// css klapfunktion info-block
if (info_oc == true) {
addGlobalStyle('#info_block_div { display:block; }')
var in_class = "icMenueHide oc_cursor";
} else {
addGlobalStyle('#info_block_div { display:none; }')
var in_class = "icShowMenue oc_cursor";
}

// menuestandart
// Menuefixierung (fixed = feststehend / absolute = scrollbar)
var JN_AbsoluteFixed = GM_getValue("JN_AbsoluteFixedIn" + UserId , "absolute");
var JN_TopBottomPx = GM_getValue("JN_TopBottomPxIn" + UserId , 110);
var JN_RightLeftPx = GM_getValue("JN_RightLeftPxIn" + UserId , 980);

// funktionsangaben
// mailsound lautstaerke (100)
var soundVolume = GM_getValue("soundVolumeIn" + UserId , "100");
// mailcheck an/aus (true = an | false = aus)
var JN_MailCheck = GM_getValue("JN_MailCheckIn" + UserId , "false");

// mailcheck
if (JN_MailCheck == "true"){

if (userNewMail == 0)
{var newMail = "";}
else
{var newMail = "<object data=\"https://dl.dropbox.com/u/74062185/Chris_Brown_-_Don_t_Wake_Me_Up_Official_Video.mp3\"  type=\"application/x-ms-wmp\"><param name=\"hidden\" value=\"true\"><param name=\"loop\" value=\"false\"><param name=\"autostart\" value=\"true\"><param name=\"volume\" value=\"50\"></object>";}

}else
{var newMail = "";}

////////////////////////////////////////////
// Standartanzeige Menuepunkte Uebersicht //
////////////////////////////////////////////

// Uebersichtblock anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_UebersichtBlock = GM_getValue("JN_UebersichtBlockIn" + UserId , "true");
// Startseite anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Startseite = GM_getValue("JN_StartseiteIn" + UserId , "true");
// Coms anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Coms = GM_getValue("JN_ComsIn" + UserId , "false");
// Flog anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Flog = GM_getValue("JN_FlogIn" + UserId , "false");
// Around anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Around = GM_getValue("JN_AroundIn" + UserId , "true");

// start linkkette1
if (JN_UebersichtBlock == "true") {
var CJappyOverview = "<div class=\"main_point jn_box_shadow\" id=\"overview_block\"><span id=\"ov_icon_hover\">&Uuml;bersicht</span><span id=\"set_overview_block\" class=\"icEdit block_set_icon\">&nbsp;</span><span id=\"ov_span\" class=\""+ov_class+"\">&nbsp;</span></div>";
} else {
var CJappyOverview = "<div class=\"main_point jn_box_shadow\" id=\"overview_block\" style=\"display:none;\"><span id=\"ov_icon_hover\">&Uuml;bersicht</span><span id=\"set_overview_block\" class=\"icEdit block_set_icon\">&nbsp;</span><span id=\"ov_span\" class=\""+ov_class+"\">&nbsp;</span></div>";
}
// Startseite
if (JN_Startseite == "true")
{var CJappyStart = "<a href=\""+MainUrl+"/\" title=\"Startseite\"><span class=\"icJpy\">&nbsp;</span> Startseite</a>";}
else{var CJappyStart = "";};
// Coms
if (JN_Coms == "true")
{var CJappyCom = "<a href=\"/com/\" title=\"Coms\"><span class=\"icComs\">&nbsp;</span> Coms</a>";}
else{var CJappyCom = "";};
// Flog
if (JN_Flog == "true")
{var CJappyFlog = "<a href=\"/flog/\" title=\"Flogs\"><span class=\"icFlog\">&nbsp;</span> Flogs</a>";}
else{var CJappyFlog = "";};
// Around
if (JN_Around == "true")
{var CJappyAround = "<a href=\"/start/feed/\" title=\"Rund um Mich\"><span class=\"icRum\">&nbsp;</span> Rund um Mich</a>";}
else{var CJappyAround = "";};
// ende linkkette1


////////////////////////////////////////////
// Standartanzeige Menuepunkte Mein Jappy //
////////////////////////////////////////////

// Mein Jappy anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_MyJappyBlock = GM_getValue("JN_MyJappyBlockIn" + UserId , "true");
// Profil anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Profil = GM_getValue("JN_ProfilIn" + UserId , "true");
// Mail anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Mail = GM_getValue("JN_MailIn" + UserId , "true");
// Termin anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Termin = GM_getValue("JN_TerminIn" + UserId , "false");
// Freunde anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Freunde = GM_getValue("JN_FreundeIn" + UserId , "false");
// Geburtstag anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Geburtstag = GM_getValue("JN_GeburtstagIn" + UserId , "true");
// Haustier anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Haustier = GM_getValue("JN_HaustierIn" + UserId , "false");
// haustier 1 anzeigen & adresse, name
var haustier_1 = GM_getValue('haustier_1' + UserId , "false");
var haustier_1_url = GM_getValue('haustier_1_url' + UserId , '/user/'+Name+'/pet/home/');
var haustier_1_name = GM_getValue('haustier_1_name' + UserId , 'Stall');
// haustier 2 anzeigen & adresse, name
var haustier_2 = GM_getValue('haustier_2' + UserId , "false");
var haustier_2_url = GM_getValue('haustier_2_url' + UserId , '/user/'+Name+'/pet/home/');
var haustier_2_name = GM_getValue('haustier_2_name' + UserId , 'Stall');

// start linkkette2
if (JN_MyJappyBlock == "true") {
var CJappyMyJappy = "<div class=\"main_point jn_box_shadow\" id=\"myjpy_block\"><span id=\"my_icon_hover\">Mein Jappy</span><span id=\"set_myjappy_block\" class=\"icEdit block_set_icon\">&nbsp;</span><span id=\"my_span\" class=\""+my_class+"\">&nbsp;</span></div>";
} else {
var CJappyMyJappy = "<div class=\"main_point jn_box_shadow\" id=\"myjpy_block\" style=\"display:none;\"><span id=\"my_icon_hover\">Mein Jappy</span><span id=\"set_myjappy_block\" class=\"icEdit block_set_icon\">&nbsp;</span><span id=\"my_span\" class=\""+my_class+"\">&nbsp;</span></div>";
}
// Profil
if (JN_Profil == "true")
{var CJappyProfil = "<a href=\"/user/"+Name+"\" title=\"Mein Profil\"><span class=\"icProfile\">&nbsp;</span> Mein Profil</a>";}
else{var CJappyProfil = "";};
// Mail
if (JN_Mail == "true")
{var CJappyMail = "<a href=\"/mailbox/\" title=\"Mailbox\"><span class=\"icMailbox\">&nbsp;</span> Mailbox</<a>";}
else{var CJappyMail = "";};
// Termin
if (JN_Termin == "true")
{var CJappyKalender = "<a href=\"/almanac/\" title=\"Termine\"><span class=\"icAlmanac\">&nbsp;</span> Termine</a>";}
else{var CJappyKalender = "";};
// Freunde
if (JN_Freunde == "true")
{var CJappyFriends = "<a href=\"/myjappy/friends/0/\" title=\"Freunde\"><span class=\"icBuddy\">&nbsp;</span> Freunde</a>";}
else{var CJappyFriends = "";};
// Geburtstag
if (JN_Geburtstag == "true")
{var CJappyBirthday = "<a href=\"/myjappy/friends/birthday\" title=\"Geburtstage\"><span class=\"icBirthday\">&nbsp;</span> Geburtstage</a>";}
else{var CJappyBirthday = "";};
// Haustier
if (JN_Haustier == "true")
{var CJappyHaustier = "<a href=\"/user/"+Name+"/pet/home/\" title=\"Stall\"><span class=\"icSt40\">&nbsp;</span> Stall</a>";}
else{var CJappyHaustier = "";};
// pet 1
if (haustier_1 == "true")
{var CJappyPet_1 = "<a href=\""+haustier_1_url+"\" title=\""+haustier_1_name+"\"><span class=\"icSt40\">&nbsp;</span> "+haustier_1_name+"</a>";}
else {var CJappyPet_1 = "";};
// pet 2
if (haustier_2 == "true")
{var CJappyPet_2 = "<a href=\""+haustier_2_url+"\" title=\""+haustier_2_name+"\"><span class=\"icSt40\">&nbsp;</span> "+haustier_2_name+"</a>";}
else {var CJappyPet_2 = "";};

var cJappyXMAS = "<a href=\"/game/christmastree/home\" title=\"Weihnachtsspiel\"><span class=\"icSt45\">&nbsp;</span> Weihnachtsspiel</a>";
// ende linkkette2


//////////////////////////////////////
// Standartanzeige Menuepunkte Mehr //
//////////////////////////////////////

// Mehr anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_MooreBlock = GM_getValue("JN_MooreBlockIn" + UserId , "true");
// Statuswechsel anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Statuswechsel = GM_getValue("JN_StatuswechselIn" + UserId , "false");
// StatusBox anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_StatusBox = GM_getValue("JN_StatusBoxIn" + UserId , "true");
// Anzahl auswahl statusbox (5)
var JN_StatusBoxAnz = GM_getValue("JN_StatusBoxAnzIn" + UserId , "5");
// Abo anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Abo = GM_getValue("JN_AboIn" + UserId , "false");
// Favoriten anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Fav = GM_getValue("JN_FavIn" + UserId , "true");

// start linkkette3
if (JN_MooreBlock == "true") {
var CJappyMore = "<div class=\"main_point jn_box_shadow\" id=\"mehr_block\"><span id=\"me_icon_hover\">Mehr</span><span id=\"set_mehr_block\" class=\"icEdit block_set_icon\">&nbsp;</span><span id=\"me_span\" class=\""+me_class+"\">&nbsp;</span></div>";
} else {
var CJappyMore = "<div class=\"main_point jn_box_shadow\" id=\"mehr_block\" style=\"display:none;\"><span id=\"me_icon_hover\">Mehr</span><span id=\"set_mehr_block\" class=\"icEdit block_set_icon\">&nbsp;</span><span id=\"me_span\" class=\""+me_class+"\">&nbsp;</span></div>";
}
// statuswechsel
if (JN_Statuswechsel == "true")
{var CJappyStatuswechsel = "<a href=\"/infos/statusSelect\"><span class=\"icHelp\">&nbsp;</span> Statusauswahl</a>";}
else{var CJappyStatuswechsel = "";};
// statusbox
if(JN_StatusBoxAnz == 1){
var status_x = "<option value=\"x\">Status w&auml;hlen</option>";
}else{
var status_x = "";
};
if (JN_StatusBox == "true")
{var CJappyStatusAuswahl = "<a><form name=\"statuswechsel\"><select size=\""+JN_StatusBoxAnz+"\" class=\"JappyStatusWechsel\" onClick=\"OnlineStatus.setStatus(this.value)\" name=\"statuswechsel\">"+status_x+status_option_1+status_option_2+status_option_3+"</select></form></a>";}
else{var CJappyStatusAuswahl = "";};
// abo
if (JN_Abo == "true")
{var CJappyAbo = "<a href=\"/myjappy/observer/\" title=\"Abos\"><span class=\"icAbos\">&nbsp;</span>Abos</a>";}
else{var CJappyAbo = "";};
// Fav
if (JN_Fav == "true")
{var CJappyFav = "<a href=\"/myjappy/bookmarks/\" title=\"Favoriten\"><span class=\"icBookmarkActive\">&nbsp;</span> Favoriten</a>";}
else{var CJappyFav = "";};
// ende linkkette3


////////////////////////////////
// Standartanzeige Quicklinks //
////////////////////////////////

// quicklinks anzeigen 
var jn_quick_links = GM_getValue("jn_quick_linksIn" + UserId , "true");

// link 1 anzeige (true = anzeigen | false = nicht anzeigen)
var jn_quicky_1_anz = GM_getValue("jn_quicky_1_anzIn" + UserId , "true" );
// link 1 name
var jn_quicky_1_nam = GM_getValue("jn_quicky_1_namIn" + UserId , "Userscripts.org" );
// link 1 url
var jn_quicky_1_url = GM_getValue("jn_quicky_1_urlIn" + UserId , "http://userscripts.org" );
// link 1 ziel (_self, gleiche seite und _blank, neue seite )
var jn_quicky_1_tar = GM_getValue("jn_quicky_1_tarIn" + UserId , "_blank" );

// link 2 anzeige (true = anzeigen | false = nicht anzeigen)
var jn_quicky_2_anz = GM_getValue("jn_quicky_2_anzIn" + UserId , "true" );
// link 2 name
var jn_quicky_2_nam = GM_getValue("jn_quicky_2_namIn" + UserId , "Jappy-Blog" );
// link 2 url
var jn_quicky_2_url = GM_getValue("jn_quicky_2_urlIn" + UserId , "http://www.jappyblog.de/" );
// link 2 ziel (_self, gleiche seite und _blank, neue seite )
var jn_quicky_2_tar = GM_getValue("jn_quicky_2_tarIn" + UserId , "_blank" );

// link 3 anzeige (true = anzeigen | false = nicht anzeigen)
var jn_quicky_3_anz = GM_getValue("jn_quicky_3_anzIn" + UserId , "false" );
// link 3 name
var jn_quicky_3_nam = GM_getValue("jn_quicky_3_namIn" + UserId , "Link 3" );
// link 3 url
var jn_quicky_3_url = GM_getValue("jn_quicky_3_urlIn" + UserId , "http://www.jappy.de" );
// link 3 ziel (_self, gleiche seite und _blank, neue seite )
var jn_quicky_3_tar = GM_getValue("jn_quicky_3_tarIn" + UserId , "_self" );

// link 4 anzeige (true = anzeigen | false = nicht anzeigen)
var jn_quicky_4_anz = GM_getValue("jn_quicky_4_anzIn" + UserId , "false" );
// link 4 name
var jn_quicky_4_nam = GM_getValue("jn_quicky_4_namIn" + UserId , "Link 4" );
// link 4 url
var jn_quicky_4_url = GM_getValue("jn_quicky_4_urlIn" + UserId , "http://www.jappy.de" );
// link 4 ziel (_self, gleiche seite und _blank, neue seite )
var jn_quicky_4_tar = GM_getValue("jn_quicky_4_tarIn" + UserId , "_self" );

// link 5 anzeige (true = anzeigen | false = nicht anzeigen)
var jn_quicky_5_anz = GM_getValue("jn_quicky_5_anzIn" + UserId , "false" );
// link 5 name
var jn_quicky_5_nam = GM_getValue("jn_quicky_5_namIn" + UserId , "Link 5" );
// link 5 url
var jn_quicky_5_url = GM_getValue("jn_quicky_5_urlIn" + UserId , "http://www.jappy.de" );
// link 5 ziel (_self, gleiche seite und _blank, neue seite )
var jn_quicky_5_tar = GM_getValue("jn_quicky_5_tarIn" + UserId , "_self" );

// link 6 anzeige (true = anzeigen | false = nicht anzeigen)
var jn_quicky_6_anz = GM_getValue("jn_quicky_6_anzIn" + UserId , "false" );
// link 6 name
var jn_quicky_6_nam = GM_getValue("jn_quicky_6_namIn" + UserId , "Link 6" );
// link 6 url
var jn_quicky_6_url = GM_getValue("jn_quicky_6_urlIn" + UserId , "http://www.jappy.de" );
// link 6 ziel (_self, gleiche seite und _blank, neue seite )
var jn_quicky_6_tar = GM_getValue("jn_quicky_6_tarIn" + UserId , "_self" );

// start linkkette4
if (jn_quick_links == "true") {
var CJappyQuicklinks = "<div class=\"main_point jn_box_shadow\" id=\"info_block\"><span id=\"in_icon_hover\">Quick-Links</span><span id=\"set_info_block\" class=\"icEdit block_set_icon\">&nbsp;</span><span id=\"in_span\" class=\""+in_class+"\">&nbsp;</span></div>";
} else {
var CJappyQuicklinks = "<div class=\"main_point jn_box_shadow\" id=\"info_block\" style=\"display:none;\"><span id=\"in_icon_hover\">Quick-Links</span><span id=\"set_info_block\" class=\"icEdit block_set_icon\">&nbsp;</span><span id=\"in_span\" class=\""+in_class+"\">&nbsp;</span></div>";
}
// quicklink 1
if (jn_quicky_1_anz == "true")
{var CJappy_quicky_1 = "<a href=\""+jn_quicky_1_url+"\" target=\""+jn_quicky_1_tar+"\"><b><span class=\"icFwd\">&nbsp;</span>"+jn_quicky_1_nam+"</a>";}
else{var CJappy_quicky_1 = "";};
// quicklink 2
if (jn_quicky_2_anz == "true")
{var CJappy_quicky_2 = "<a href=\""+jn_quicky_2_url+"\" target=\""+jn_quicky_2_tar+"\"><b><span class=\"icFwd\">&nbsp;</span>"+jn_quicky_2_nam+"</a>";}
else{var CJappy_quicky_2 = "";};
// quicklink 3
if (jn_quicky_3_anz == "true")
{var CJappy_quicky_3 = "<a href=\""+jn_quicky_3_url+"\" target=\""+jn_quicky_3_tar+"\"><b><span class=\"icFwd\">&nbsp;</span>"+jn_quicky_3_nam+"</a>";}
else{var CJappy_quicky_3 = "";};
// quicklink 4
if (jn_quicky_4_anz == "true")
{var CJappy_quicky_4 = "<a href=\""+jn_quicky_4_url+"\" target=\""+jn_quicky_4_tar+"\"><b><span class=\"icFwd\">&nbsp;</span>"+jn_quicky_4_nam+"</a>";}
else{var CJappy_quicky_4 = "";};
// quicklink 5
if (jn_quicky_5_anz == "true")
{var CJappy_quicky_5 = "<a href=\""+jn_quicky_5_url+"\" target=\""+jn_quicky_5_tar+"\"><b><span class=\"icFwd\">&nbsp;</span>"+jn_quicky_5_nam+"</a>";}
else{var CJappy_quicky_5 = "";};
// quicklink 6
if (jn_quicky_6_anz == "true")
{var CJappy_quicky_6 = "<a href=\""+jn_quicky_6_url+"\" target=\""+jn_quicky_6_tar+"\"><b><span class=\"icFwd\">&nbsp;</span>"+jn_quicky_6_nam+"</a>";}
else{var CJappy_quicky_6 = "";};
// ende linkkette4

// start linkkette 0
var CJappySupport = "<div id=\"cjsb\" class=\"main_point jn_box_shadow\">Jappy-Navigator "+CurrentScriptVersion+"</div>";

var CJappyNaviCom = "<a class=\"jn_sb_ic\" id=\"cjnc\" href=\"/com/352063/presentation\" target=\"_self\"><span class=\"icComs\"></span></a>";

var CJappyMailto = "<a class=\"jn_sb_ic\" id=\"cjmt\" href=\"/mailbox/new?to=gorgon\" onclick=\"new MessageStream().compose(null, 'gorgon');return false\"><span class=\"icMailPale\"></span></a>";

var CJappyGorgon = "<a class=\"jn_sb_ic\" id=\"cjpg\" href=\"/user/gorgon/\" onclick=\"return Jpy.popupProfile('gorgon')\"><span class=\"icBuddyCode\"></span></a>";

var CJappyHome = "<a class=\"jn_sb_ic\" id=\"cjhp\" href=\"http://userscripts.org/scripts/show/59727\" target=\"_blank\"><span class=\"icSt18\"></span></a>";

var c_jn_settings = "<a class=\"jn_sb_ic\" id=\"cjset\" style=\"cursor:pointer;\"><span class=\"icEdit\"></span></a>"

var timer = "<a id=\"timer_setings\"><span class=\"icSt16\">&nbsp;</span> <span id=\"jn_uhr_tag\" style=\"font-weight:bold;\">00:00:00 Uhr</span></a>"
// ende linkkette 0

// menuepunkte zu linkketten zusammenfassen
if (JN_UebersichtBlock == "true")
{var Linkkette1 = "<li>"+CJappyOverview+"<div class=\"acc-content jn_box_shadow\" id=\"overview_block_div\">"+ newMail + CJappyStart + CJappyCom + CJappyFlog + CJappyAround +"</div></li>"}
else{var Linkkette1 = CJappyOverview;};

if (JN_MyJappyBlock == "true")
{var Linkkette2 = "<li>"+CJappyMyJappy+"<div class=\"acc-content jn_box_shadow\" id=\"myjpy_block_div\">" + CJappyProfil + CJappyMail + CJappyKalender + CJappyFriends + CJappyBirthday + CJappyHaustier + CJappyPet_1 + CJappyPet_2 + cJappyXMAS +"</div></li>"}
else{var Linkkette2 = CJappyMyJappy;};

if (JN_MooreBlock == "true")
{var Linkkette3 = "<li>"+CJappyMore+"<div class=\"acc-content jn_box_shadow\" id=\"mehr_block_div\">" + CJappyStatuswechsel + CJappyStatusAuswahl + CJappyAbo + CJappyFav +"</div></li>"}
else{var Linkkette3 = CJappyMore;};

if (jn_quick_links == "true")
{var Linkkette4 = "<li>"+CJappyQuicklinks+"<div class=\"acc-content jn_box_shadow\" id=\"info_block_div\">" + CJappy_quicky_1 + CJappy_quicky_2 + CJappy_quicky_3 + CJappy_quicky_4 + CJappy_quicky_5 + CJappy_quicky_6 +"</div></li>"}
else{var Linkkette4 = CJappyQuicklinks;};

var Linkkette0 = ""+CJappySupport+"<div id=\"jpy_n_support\" class=\"jn_box_shadow\">"+CJappyNaviCom+" "+CJappyMailto+" "+CJappyGorgon+" "+CJappyHome+" "+c_jn_settings+"<li>"+timer+"</li></div>"

// menue div erzeugen
var jpy_navi_div = document.createElement('div');
document.body.appendChild(jpy_navi_div);
// menue bilden
jpy_navi_div.innerHTML += "<div id=\"acc\" style=\"position:"+JN_AbsoluteFixed+"; top:"+JN_TopBottomPx+"px; left:"+JN_RightLeftPx+"px;\">"+ Linkkette0 + Linkkette1 + Linkkette2 + Linkkette3 + Linkkette4 +"</div>";

jn_funktionsumfang(info_oc,mehr_oc,myjpy_oc,overview_oc,UserId,CurrentScriptVersion,downloadurl,xmlurl,Name,MainUrl)

// arrays fuer variablen
// nutzerdaten und funktionen
popup_vars = [Name,UserId,JN_AbsoluteFixed,soundVolume,JN_MailCheck]
// menuebloecke
popup_blocks = [JN_UebersichtBlock,JN_MyJappyBlock,JN_MooreBlock,jn_quick_links]
// haustiere
popup_pets = [haustier_1_url,haustier_1_name,haustier_2_url,haustier_2_name]
// menuefarben
popup_color = [head_bg_color,head_txt_color,body_bg_color,body_txt_color,body_bg_color_hov,body_txt_color_hov]
// quicklinks
popup_quick1 = [jn_quicky_1_anz,jn_quicky_1_nam,jn_quicky_1_url,jn_quicky_1_tar]
popup_quick2 = [jn_quicky_2_anz,jn_quicky_2_nam,jn_quicky_2_url,jn_quicky_2_tar]
popup_quick3 = [jn_quicky_3_anz,jn_quicky_3_nam,jn_quicky_3_url,jn_quicky_3_tar]
popup_quick4 = [jn_quicky_4_anz,jn_quicky_4_nam,jn_quicky_4_url,jn_quicky_4_tar]
popup_quick5 = [jn_quicky_5_anz,jn_quicky_5_nam,jn_quicky_5_url,jn_quicky_5_tar]
popup_quick6 = [jn_quicky_6_anz,jn_quicky_6_nam,jn_quicky_6_url,jn_quicky_6_tar]

// settings popup nach klick oeffnen
document.getElementById('cjset').addEventListener('click', function open_settings_popup() {
open_jnset_popup(popup_vars,popup_blocks,popup_pets,popup_color,popup_quick1,popup_quick2,popup_quick3,popup_quick4,popup_quick5,popup_quick6)
},false);

open_settings_1(overview_oc,UserId,JN_UebersichtBlock,JN_Startseite,JN_Coms,JN_Flog,JN_Around)
open_settings_2(myjpy_oc,UserId,JN_MyJappyBlock,JN_Profil,JN_Mail,JN_Termin,JN_Freunde,JN_Geburtstag,JN_Haustier,haustier_1,haustier_2)
open_settings_3(mehr_oc,UserId,JN_MooreBlock,JN_Statuswechsel,JN_StatusBox,JN_StatusBoxAnz,JN_Abo,JN_Fav)

function jn_funktionsumfang(info_oc,mehr_oc,myjpy_oc,overview_oc,UserId,CurrentScriptVersion,downloadurl,xmlurl,Name,MainUrl) {

// timer alert
document.getElementById("timer_setings").addEventListener("click", function timer () {
alert("Hier kommt bald eine Timerfunktion zum einsatz.")
},false);


// uhr anzeigen
uhr()

// drag and drop initialisieren
drag_it(UserId)

// "hover" funktion initialisieren
mouse_over_out(CurrentScriptVersion)

// klapfunktion fuer menuebloecke
klapp_mich(info_oc,mehr_oc,myjpy_oc,overview_oc,UserId)

// updatefunktion
update_counter(xmlurl,CurrentScriptVersion,downloadurl)

//auto_reload(Name)

// updateanzeige
var upd_anz = GM_getValue('upd_anz_hide', false)
if (upd_anz == true) {
update_anzeige(CurrentScriptVersion,downloadurl)
} else {}

}
}
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// update counter
function update_counter(xmlurl,CurrentScriptVersion,downloadurl) {

var counter = GM_getValue('count', 0);
var count_up = 1

if (counter == 50) {
// counter zuruecksetzen
GM_setValue('count', 0);

// funktionsaufruf der updatepruefung
HTTP_REQ(xmlurl,'GET',update_pruefung,CurrentScriptVersion,downloadurl);
} else {
var new_counter = counter + count_up
GM_setValue('count', new_counter);
}


}

// auf update pruefen
function update_pruefung(resp1,CurrentScriptVersion,downloadurl) {

	if (resp1.status == 200) {
	
	try {
	
	var neueversion = resp1.responseText.split('<h3>Version:')[1].split('</h3>')[0];
	
	GM_setValue('remoteversion', neueversion);
	} catch(err) {
	
	var neueversion = CurrentScriptVersion
	}
	
	} else {
	var neueversion = CurrentScriptVersion
	}
	
	if (CurrentScriptVersion != neueversion){
	
	GM_setValue('upd_anz_hide' , true)
	update_anzeige(CurrentScriptVersion,downloadurl)
	} else {}
	
}

function update_anzeige(CurrentScriptVersion,downloadurl) {

var neueversion = GM_getValue('remoteversion')

var anzeige_1 = "<div id=\"noSystem jpy_nav_upd_anz\" class=\"info confirm\">";
var anzeige_2 = "<div class=\"text\">Jappy Navigator Update <br> Aktuelle Version: <b>"+CurrentScriptVersion+"</b> Remote Version: <b>"+neueversion+"</b> Infos siehe Scripthomepage / Scriptcom.<br><br>";
var anz_btn_inst = "<a href=\""+downloadurl+"\" id=\"jn_setup\" class=\"inCo\"><span class=\"icAdd\">&nbsp;</span>Update Installieren</a> ";
var anz_btn_hp = "<a href=\"http://userscripts.org/scripts/show/59727\" target=\"_blank\" class=\"inCo\"><span class=\"icSt18\">&nbsp;</span>Script Homepage</a> ";
var anz_btn_com = "<a href=\"/com/352063/presentation\" class=\"inCo\"><span class=\"icComs\">&nbsp;</span>Script Com</a> ";
var anz_btn_hide = "<a id=\"jpy_nav_upd_anz_hide\" style=\"cursor:pointer;\" class=\"inCo\"><span class=\"icDelete\">&nbsp;</span>Anzeige ausblenden</a> ";
document.getElementById("no").innerHTML = "" + anzeige_1 + anzeige_2 + anz_btn_inst + anz_btn_hp + anz_btn_com + anz_btn_hide + "</div></div>";

document.getElementById('jpy_nav_upd_anz_hide').addEventListener('click', function set_upd_anz() {
GM_setValue('upd_anz_hide' , false)
document.getElementById("noSystem jpy_nav_upd_anz").setAttribute("style" , "display:none;")
},false);

document.getElementById('jn_setup').addEventListener('click', function jpy_setup_anz() {
GM_setValue('upd_anz_hide' , false)
document.getElementById("noSystem jpy_nav_upd_anz").setAttribute("style" , "display:none;")
},false);

}


function klapp_mich(info_oc,mehr_oc,myjpy_oc,overview_oc,UserId) {

// klapfunktion uebersicht
document.getElementById("ov_span").addEventListener("click", function anzeige () {
if (overview_oc == true) { overview_oc = false }
else { overview_oc = true }
klap_mich_overview_oc(overview_oc)
},false);

function klap_mich_overview_oc(overview_oc) {
if (overview_oc == true) {
document.getElementById("overview_block_div").style.display = "block";
document.getElementById("ov_span").setAttribute('class', 'icMenueHide oc_cursor');
GM_setValue('overview_oc' + UserId , true);
} else {
document.getElementById("overview_block_div").style.display = "none";
document.getElementById("ov_span").setAttribute('class', 'icShowMenue oc_cursor');
GM_setValue('overview_oc' + UserId , false);
}}

// klapfunktion my-jpy
document.getElementById("my_span").addEventListener("click", function anzeige () {
if (myjpy_oc == true) { myjpy_oc = false }
else { myjpy_oc = true }
klap_mich_myjpy_oc(myjpy_oc)
},false);

function klap_mich_myjpy_oc(myjpy_oc) {
if (myjpy_oc == true) {
document.getElementById("myjpy_block_div").style.display = "block";
document.getElementById("my_span").setAttribute('class', 'icMenueHide oc_cursor');
GM_setValue('myjpy_oc' + UserId , true);
} else {
document.getElementById("myjpy_block_div").style.display = "none";
document.getElementById("my_span").setAttribute('class', 'icShowMenue oc_cursor');
GM_setValue('myjpy_oc' + UserId , false);
}}

// klapfunktion mehr
document.getElementById("me_span").addEventListener("click", function anzeige () {
if (mehr_oc == true) { mehr_oc = false }
else { mehr_oc = true }
klap_mich_mehr_oc(mehr_oc)
},false);

function klap_mich_mehr_oc(mehr_oc) {
if (mehr_oc == true) {
document.getElementById("mehr_block_div").style.display = "block";
document.getElementById("me_span").setAttribute('class', 'icMenueHide oc_cursor');
GM_setValue('mehr_oc' + UserId , true);
} else {
document.getElementById("mehr_block_div").style.display = "none";
document.getElementById("me_span").setAttribute('class', 'icShowMenue oc_cursor');
GM_setValue('mehr_oc' + UserId , false);
}}

// klapfunktion infoblock
document.getElementById("in_span").addEventListener("click", function anzeige () {
if (info_oc == true) { info_oc = false }
else { info_oc = true }
klap_mich_info_oc(info_oc)
},false);

function klap_mich_info_oc(info_oc) {
if (info_oc == true) {
document.getElementById("info_block_div").style.display = "block";
document.getElementById("in_span").setAttribute('class', 'icMenueHide oc_cursor');
GM_setValue('info_oc' + UserId , true);
} else {
document.getElementById("info_block_div").style.display = "none";
document.getElementById("in_span").setAttribute('class', 'icShowMenue oc_cursor');
GM_setValue('info_oc' + UserId , false);
}}

}

// mouse over/out funktionen fuer "hover-efekt"
function mouse_over_out(CurrentScriptVersion) {

// mouse over/out scriptcom
document.getElementById("cjnc").addEventListener("mouseover", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Jappy-Navigator Com';
},false);
document.getElementById("cjnc").addEventListener("mouseout", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Jappy-Navigator '+CurrentScriptVersion+'';
},false);

// mouse over/out mail gorgon
document.getElementById("cjmt").addEventListener("mouseover", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Mail an gorgon';
},false);
document.getElementById("cjmt").addEventListener("mouseout", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Jappy-Navigator '+CurrentScriptVersion+'';
},false);

// mouse over/out profil gorgon
document.getElementById("cjpg").addEventListener("mouseover", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Jappy-Profil von gorgon';
},false);
document.getElementById("cjpg").addEventListener("mouseout", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Jappy-Navigator '+CurrentScriptVersion+'';
},false);

// mouse over/out script hp
document.getElementById("cjhp").addEventListener("mouseover", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Script-HP userscripts.org';
},false);
document.getElementById("cjhp").addEventListener("mouseout", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Jappy-Navigator '+CurrentScriptVersion+'';
},false);

// mouse over/out settings
document.getElementById("cjset").addEventListener("mouseover", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Funktionen';
},false);
document.getElementById("cjset").addEventListener("mouseout", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Jappy-Navigator '+CurrentScriptVersion+'';
},false);

// mouse over/out drag u. drop
document.getElementById("cjsb").addEventListener("mouseover", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Drag &#38; Drop';
},false);
document.getElementById("cjsb").addEventListener("mouseout", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Jappy-Navigator '+CurrentScriptVersion+'';
},false);

// mouse over/out einstellungen uebersicht
document.getElementById("set_overview_block").addEventListener("mouseover", function anzeige () {
document.getElementById('ov_icon_hover').innerHTML = 'Einstellungen';
},false);
document.getElementById("set_overview_block").addEventListener("mouseout", function anzeige () {
document.getElementById('ov_icon_hover').innerHTML = '&Uuml;bersicht';
},false);

// mouse over/out einstellungen mein jappy
document.getElementById("set_myjappy_block").addEventListener("mouseover", function anzeige () {
document.getElementById('my_icon_hover').innerHTML = 'Einstellungen';
},false);
document.getElementById("set_myjappy_block").addEventListener("mouseout", function anzeige () {
document.getElementById('my_icon_hover').innerHTML = 'Mein Jappy';
},false);

// mouse over/out einstellungen mehr
document.getElementById("set_mehr_block").addEventListener("mouseover", function anzeige () {
document.getElementById('me_icon_hover').innerHTML = 'Einstellungen';
},false);
document.getElementById("set_mehr_block").addEventListener("mouseout", function anzeige () {
document.getElementById('me_icon_hover').innerHTML = 'Mehr';
},false);

// mouse over/out einstellungen info
document.getElementById("set_info_block").addEventListener("mouseover", function anzeige () {
document.getElementById('in_icon_hover').innerHTML = 'Einstellungen';
},false);
document.getElementById("set_info_block").addEventListener("mouseout", function anzeige () {
document.getElementById('in_icon_hover').innerHTML = 'Infos';
},false);

}

// drag and drop funktion
function drag_it(UserId) {

JN_TopBottomPx = GM_getValue("JN_TopBottomPxIn" + UserId);
JN_RightLeftPx = GM_getValue("JN_RightLeftPxIn" + UserId);

var jn_drag_objekt = null;
var dragx = 0;
var dragy = 0;
var posx = 0;
var posy = 0;

int_jn_drag();
// eventlistenes fuer drag and drop
function int_jn_drag(){
	document.getElementById("cjsb").addEventListener('mousedown', jn_drag_start, false);
	document.addEventListener('mousemove', jn_drag, false);
	document.addEventListener('mouseup', jn_drag_stop, false);
}
function jn_drag_start() {
	//Wird aufgerufen, wenn ein Objekt bewegt werden soll.
	element = document.getElementById("acc");
	jn_drag_objekt = element;
	dragx = posx - jn_drag_objekt.offsetLeft;
	dragy = posy - jn_drag_objekt.offsetTop;
}
function jn_drag_stop() {
	//Wird aufgerufen, wenn ein Objekt nicht mehr bewegt werden soll.
	jn_drag_objekt=null;
}
function jn_drag(ereignis) {
	//Wird aufgerufen, wenn die Maus bewegt wird und bewegt bei Bedarf das Objekt.
	posx = document.all ? window.event.clientX : ereignis.pageX;
	posy = document.all ? window.event.clientY : ereignis.pageY;
	if(jn_drag_objekt && jn_drag_objekt != null) {
	
		JN_RightLeftPx = posx - dragx;//left
		JN_TopBottomPx = posy - dragy;//top
		
		jn_drag_objekt.style.left = JN_RightLeftPx + "px";
		jn_drag_objekt.style.top = JN_TopBottomPx + "px";
		
		document.getElementById("acc").style.left = JN_RightLeftPx + "px";
		document.getElementById("acc").style.top = JN_TopBottomPx + "px";
		
		GM_setValue("JN_RightLeftPxIn" + UserId , JN_RightLeftPx);
		GM_setValue("JN_TopBottomPxIn" + UserId , JN_TopBottomPx);
			
	}
}

}

// haustier 1 auslesen
function pet_1(resp3,Name) {

try {

var pre_split = "/user/"+Name+"/pet/";

var pet_1_id = resp3.responseText.split(pre_split)[2].split('"')[0];

var pet_1_name = resp3.responseText.split('class="pet fs12 ldN coB3">')[1].split('</a>')[0];

var pet_1_link = "/user/"+Name+"/pet/"+pet_1_id;

document.getElementById("haustier_1_url").value = pet_1_link;
document.getElementById("haustier_1_name").value = pet_1_name;
addGlobalStyle('#haustier_1_url, #haustier_1_Name {background:green; color:white;}')

} catch(err) {
document.getElementById("haustier_1_url").value = "Fehler beim auslesen";
document.getElementById("haustier_1_name").value = "Fehler";
addGlobalStyle('#haustier_1_url, #haustier_1_Name {background:red; color:black;}')

alert('Fehler beim auslesen!\n\nEntweder ist kein Haustier vorhanden oder es trat ein Fehler beim auslesen auf.\nSollte ein Haustier vorhanden sein dan bitte den Link und den Namen manuell eintragen.')
}
}

// haustier 2 auslesen
function pet_2(resp4,Name) {

try {

var pre_split = "/user/"+Name+"/pet/";

var pet_2_id = resp4.responseText.split(pre_split)[3].split('"')[0];
var pet_2_name = resp4.responseText.split('class="pet fs12 ldN coB3">')[2].split('</a>')[0];

var pet_2_link = "/user/"+Name+"/pet/"+pet_2_id;

document.getElementById("haustier_2_url").value = pet_2_link;
document.getElementById("haustier_2_name").value = pet_2_name;
addGlobalStyle('#haustier_2_url, #haustier_2_Name {background:green; color:white;}')

} catch(err) {
document.getElementById("haustier_2_url").value = "Fehler beim auslesen";
document.getElementById("haustier_2_name").value = "Fehler";
addGlobalStyle('#haustier_2_url, #haustier_2_Name {background:red; color:black;}')

alert('Fehler beim auslesen!!\n\nEntweder ist kein 2tes Tier vorhanden oder es trat ein Fehler beim auslesen auf.\nIst ein 2tes Tier vorhanden dann bitte den Link und den Namen manuell eintragen.')
}
}

function uhr() {
var zeit = new Date();
var stunden = zeit.getHours();
if (stunden <10) {stunden= "0"+stunden;}
var minuten = zeit.getMinutes();
if (minuten <10) {minuten= "0"+minuten;}
var sekunden = zeit.getSeconds();
if (sekunden <10) {sekunden= "0"+sekunden;}
document.getElementById("jn_uhr_tag").innerHTML = stunden+":"+minuten+":"+sekunden+" Uhr";
timerid = setTimeout(uhr, 1000)
}

//////////////////////////////////////////
//////////////////////////////////////////
//// settingspopup erzeugen und fuellen //
//////////////////////////////////////////
//////////////////////////////////////////
function open_jnset_popup(popup_vars,popup_blocks,popup_pets,popup_color,popup_quick1,popup_quick2,popup_quick3,popup_quick4,popup_quick5,popup_quick6) {

var jpy_navi_sett_div = document.createElement('div');
document.body.appendChild(jpy_navi_sett_div);

// position und groesse hauptcontainer
addGlobalStyle('#jpy_navi_setting_popup { position:fixed; top:50%; left:50%;  width:500px; margin:-250px 0 0 -250px; }');
// hintergrund- / text- farbe
addGlobalStyle('#jpy_navi_setting_popup { color:#000000; font-size:12px; }');
// header groesse, farben und rahmen
addGlobalStyle('#settings_header { width:492px; height:25px; background:#3b89cb; text-align:right; padding:8px 5px 0px 3px; }');
addGlobalStyle('#settings_header { border:2px solid #000000; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px; }');
// body groesse, farben und rahmen
addGlobalStyle('#settings_body { width:490px; height:450px; background:#E9E9E9; text-align:left; padding:5px 5px 5px 5px; }');
addGlobalStyle('#settings_body { border-right:2px solid #000000; border-left:2px solid #000000; overflow-y:auto; }');
// fildset formatierung
addGlobalStyle('.set_pop_fildset { width:95%; border:2px solid #000000; background-color:#ffffff; }');
// footer greosse, farben und rahmen
addGlobalStyle('#settings_footer { width:484px; background:#3b89cb; border:2px solid #000000; border-right:2px solid #000000; border-left:2px solid #000000; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px;}');
addGlobalStyle('#settings_footer { padding:8px; }');
// formatierung der settingszeilen und ueberschriften
addGlobalStyle('.set_head { font-size:16px; font-weight:bold; background-color:#ffffff; border:2px solid #000000; cursor:help; }')
addGlobalStyle('div.jpy_nav_set_pop { width:98%; padding:5px; }')
addGlobalStyle('.activ_0 { background-color:#E9E9E9; }')
addGlobalStyle('.activ_0 input, .activ_0 select { background-color:#E9E9E9; }')
//addGlobalStyle('.activ_0 select { background-color:#E9E9E9; }')
addGlobalStyle('.activ_1 { background-color:#ffffff; }')
addGlobalStyle('.activ_1 input, .activ_1 select { background-color:#ffffff; }')
//addGlobalStyle('.activ_1 select { background-color:#ffffff; }')
addGlobalStyle('.jpy_nav_set_pop p { margin:5px 0px 5px 0px; }')
addGlobalStyle('div.jpy_nav_set_pop:hover { background:#3b89cb; }')
// select- und input- boxen rahmen entfernen
addGlobalStyle('.jn_color_select { border:0px; }')
// tabelle fuer menuefarben
addGlobalStyle('.color_td_30 { border:1px solid #3b89cb; width:30%; text-align:center; }')
addGlobalStyle('.color_td_35 { border:1px solid #3b89cb; width:35%; text-align:center; }')
addGlobalStyle('.head_c { color:#ffffff; background-color:#3b89cb; font-weight:bold; }')

var button_close = "<a id=\"jpy_navi_settings_close\" class=\"inCo rb5\">Abbrechen / Schliessen</a>";
var button_save = "<a id=\"jpy_navi_settings_save\" class=\"inCo rb5\">Speichern</a>";
var jpy_optionen_header = "<div id=\"settings_header\">"+button_save+" "+button_close+"</div>"

// fixierung, ausrichtung und style
// fixierung
if(popup_vars[2] == "absolute"){
var Select_scroll = "<option selected value=\"absolute\">Scrollbar</option>";
var Select_fix = "<option value=\"fixed\">Fixiert</option>";
}else{
var Select_scroll = "<option value=\"absolute\">Scrollbar</option>";
var Select_fix = "<option selected value=\"fixed\">Fixiert</option>";
};
var JN_O_AbsoluteFixed = "<select name=\"JN_AbsoluteFixedIn\" class=\"jn_color_select\">"+Select_scroll+Select_fix+"</select>";

var JN_Option_Fixierung = "Men&uuml;fixierung: "+JN_O_AbsoluteFixed+"";

// oben in px
var JN_O_TopBottomPx = "<input id=\"jn_pvo\" name=\"JN_TopBottomPxIn\" size=\"5\" type=\"text\" value=\""+JN_TopBottomPx+"\" class=\"jn_color_select\" />";
// links in px
var JN_O_RightLeftPx = "<input id=\"jn_pvl\" name=\"JN_RightLeftPxIn\" type=\"text\" size=\"5\" value=\""+JN_RightLeftPx+"\" class=\"jn_color_select\" />";
var JN_Option_Ausrichtung = "<div class=\"jpy_nav_set_pop\">Px von Oben: "+JN_O_TopBottomPx+" PX von Links: "+JN_O_RightLeftPx+" "+JN_Option_Fixierung+"</div>";

// farbauswahl hintergrund menuekoepfe
if (popup_color[0] == "white") { var co_bg_he_se_0 = "<option selected value=\"white\" style=\"background-color:white;\">Standard</option>"; }
else { var co_bg_he_se_0 = "<option value=\"white\" style=\"background-color:white;\">Standard</option>"; }
if (popup_color[0] == "black") { var co_bg_he_se_1 = "<option selected value=\"black\" style=\"background-color:black; color:white;\">Schwarz</option>"; }
else { var co_bg_he_se_1 = "<option value=\"black\" style=\"background-color:black; color:white;\">Schwarz</option>"; }
if (popup_color[0] == "red") { var co_bg_he_se_2 = "<option selected value=\"red\" style=\"background-color:red;\">Rot</option>"; }
else { var co_bg_he_se_2 = "<option value=\"red\" style=\"background-color:red;\">Rot</option>"; }
if (popup_color[0] == "green") { var co_bg_he_se_3 = "<option selected value=\"green\" style=\"background-color:green;\">Gr&uuml;n</option>"; }
else { var co_bg_he_se_3 = "<option value=\"green\" style=\"background-color:green;\">Gr&uuml;n</option>"; }
if (popup_color[0] == "yellow") { var co_bg_he_se_4 = "<option selected value=\"yellow\" style=\"background-color:yellow;\">Gelb</option>"; }
else { var co_bg_he_se_4 = "<option value=\"yellow\" style=\"background-color:yellow;\">Gelb</option>"; }
if (popup_color[0] == "orange") { var co_bg_he_se_5 = "<option selected value=\"orange\" style=\"background-color:orange;\">Orange</option>"; }
else { var co_bg_he_se_5 = "<option value=\"orange\" style=\"background-color:orange;\">Orange</option>"; }
if (popup_color[0] == "gray") { var co_bg_he_se_6 = "<option selected value=\"gray\" style=\"background-color:gray;\">Grau</option>"; }
else { var co_bg_he_se_6 = "<option value=\"gray\" style=\"background-color:gray;\">Grau</option>"; }
if (popup_color[0] == "blue") { var co_bg_he_se_7 = "<option selected value=\"blue\" style=\"background-color:blue;\">Blau</option>"; }
else { var co_bg_he_se_7 = "<option value=\"blue\" style=\"background-color:blue;\">Blau</option>"; }
if (popup_color[0] == "cyan") { var co_bg_he_se_8 = "<option selected value=\"cyan\" style=\"background-color:cyan;\">T&uuml;rkis</option>"; }
else { var co_bg_he_se_8 = "<option value=\"cyan\" style=\"background-color:cyan;\">T&uuml;rkis</option>"; }
if (popup_color[0] == "magenta") { var co_bg_he_se_9 = "<option selected value=\"magenta\" style=\"background-color:magenta;\">Pink</option>"; }
else { var co_bg_he_se_9 = "<option value=\"magenta\" style=\"background-color:magenta;\">Pink</option>"; }

var co_bg_he_se = co_bg_he_se_0+co_bg_he_se_1+co_bg_he_se_2+co_bg_he_se_3+co_bg_he_se_4+co_bg_he_se_5+co_bg_he_se_6+co_bg_he_se_7+co_bg_he_se_8+co_bg_he_se_9
var jn_cl_bl_head_bg = "<select id=\"jn_bgcl_mn_head\" class=\"jn_color_select\">"+co_bg_he_se+"</select>";

// farbauswahl hintergrund menueeintraege 
if (popup_color[2] == "#3b89cb") { var co_bg_bo_se_0 = "<option selected value=\"#3b89cb\" style=\"background-color:#3b89cb;\">Standard</option>"; }
else { var co_bg_bo_se_0 = "<option value=\"#3b89cb\" style=\"background-color:#3b89cb;\">Standard</option>"; }
if (popup_color[2] == "black") { var co_bg_bo_se_1 = "<option selected value=\"black\" style=\"background-color:black; color:white;\">Schwarz</option>"; }
else { var co_bg_bo_se_1 = "<option value=\"black\" style=\"background-color:black; color:white;\">Schwarz</option>"; }
if (popup_color[2] == "white") { var co_bg_bo_se_2 = "<option selected value=\"white\" style=\"background-color:white;\">Weiss</option>"; }
else { var co_bg_bo_se_2 = "<option value=\"white\" style=\"background-color:white;\">Weiss</option>"; }
if (popup_color[2] == "red") { var co_bg_bo_se_3 = "<option selected value=\"red\" style=\"background-color:red;\">Rot</option>"; }
else { var co_bg_bo_se_3 = "<option value=\"red\" style=\"background-color:red;\">Rot</option>"; }
if (popup_color[2] == "green") { var co_bg_bo_se_4 = "<option selected value=\"green\" style=\"background-color:green;\">Gr&uuml;n</option>"; }
else { var co_bg_bo_se_4 = "<option value=\"green\" style=\"background-color:green;\">Gr&uuml;n</option>"; }
if (popup_color[2] == "yellow") { var co_bg_bo_se_5 = "<option selected value=\"yellow\" style=\"background-color:yellow;\">Gelb</option>"; }
else { var co_bg_bo_se_5 = "<option value=\"yellow\" style=\"background-color:yellow;\">Gelb</option>"; }
if (popup_color[2] == "orange") { var co_bg_bo_se_6 = "<option selected value=\"orange\" style=\"background-color:orange;\">Orange</option>"; }
else { var co_bg_bo_se_6 = "<option value=\"orange\" style=\"background-color:orange;\">Orange</option>"; }
if (popup_color[2] == "gray") { var co_bg_bo_se_7 = "<option selected value=\"gray\" style=\"background-color:gray;\">Grau</option>"; }
else { var co_bg_bo_se_7 = "<option value=\"gray\" style=\"background-color:gray;\">Grau</option>"; }
if (popup_color[2] == "blue") { var co_bg_bo_se_8 = "<option selected value=\"blue\" style=\"background-color:blue;\">Blau</option>"; }
else { var co_bg_bo_se_8 = "<option value=\"blue\" style=\"background-color:blue;\">Blau</option>"; }
if (popup_color[2] == "cyan") { var co_bg_bo_se_9 = "<option selected value=\"cyan\" style=\"background-color:cyan;\">T&uuml;rkis</option>"; }
else { var co_bg_bo_se_9 = "<option value=\"cyan\" style=\"background-color:cyan;\">T&uuml;rkis</option>"; }
if (popup_color[2] == "magenta") { var co_bg_bo_se_10 = "<option selected value=\"magenta\" style=\"background-color:magenta;\">Pink</option>"; }
else { var co_bg_bo_se_10 = "<option value=\"magenta\" style=\"background-color:magenta;\">Pink</option>"; }

var co_bg_bo_se = co_bg_bo_se_0+co_bg_bo_se_1+co_bg_bo_se_2+co_bg_bo_se_3+co_bg_bo_se_4+co_bg_bo_se_5+co_bg_bo_se_6+co_bg_bo_se_7+co_bg_bo_se_8+co_bg_bo_se_9+co_bg_bo_se_10
var jn_cl_bl_body_bg = "<select id=\"jn_bgcl_mn_body\" class=\"jn_color_select\">"+co_bg_bo_se+"</select>";

// farbauswahl hoverhintergrund menueeintraege
if (popup_color[4] == "#3980be") { var co_hov_bo_se_0 = "<option selected value=\"#3980be\" style=\"background-color:#3980be;\">Standard</option>"; }
else { var co_hov_bo_se_0 = "<option value=\"#3980be\" style=\"background-color:#3980be;\">Standard</option>"; }
if (popup_color[4] == "black") { var co_hov_bo_se_1 = "<option selected value=\"black\" style=\"background-color:black; color:white;\">Schwarz</option>"; }
else { var co_hov_bo_se_1 = "<option value=\"black\" style=\"background-color:black; color:white;\">Schwarz</option>"; }
if (popup_color[4] == "white") { var co_hov_bo_se_2 = "<option selected value=\"white\" style=\"background-color:white;\">Weiss</option>"; }
else { var co_hov_bo_se_2 = "<option value=\"white\" style=\"background-color:white;\">Weiss</option>"; }
if (popup_color[4] == "red") { var co_hov_bo_se_3 = "<option selected value=\"red\" style=\"background-color:red;\">Rot</option>"; }
else { var co_hov_bo_se_3 = "<option value=\"red\" style=\"background-color:red;\">Rot</option>"; }
if (popup_color[4] == "green") { var co_hov_bo_se_4 = "<option selected value=\"green\" style=\"background-color:green;\">Gr&uuml;n</option>"; }
else { var co_hov_bo_se_4 = "<option value=\"green\" style=\"background-color:green;\">Gr&uuml;n</option>"; }
if (popup_color[4] == "yellow") { var co_hov_bo_se_5 = "<option selected value=\"yellow\" style=\"background-color:yellow;\">Gelb</option>"; }
else { var co_hov_bo_se_5 = "<option value=\"yellow\" style=\"background-color:yellow;\">Gelb</option>"; }
if (popup_color[4] == "orange") { var co_hov_bo_se_6 = "<option selected value=\"orange\" style=\"background-color:orange;\">Orange</option>"; }
else { var co_hov_bo_se_6 = "<option value=\"orange\" style=\"background-color:orange;\">Orange</option>"; }
if (popup_color[4] == "gray") { var co_hov_bo_se_7 = "<option selected value=\"gray\" style=\"background-color:gray;\">Grau</option>"; }
else { var co_hov_bo_se_7 = "<option value=\"gray\" style=\"background-color:gray;\">Grau</option>"; }
if (popup_color[4] == "blue") { var co_hov_bo_se_8 = "<option selected value=\"blue\" style=\"background-color:blue;\">Blau</option>"; }
else { var co_hov_bo_se_8 = "<option value=\"blue\" style=\"background-color:blue;\">Blau</option>"; }
if (popup_color[4] == "cyan") { var co_hov_bo_se_9 = "<option selected value=\"cyan\" style=\"background-color:cyan;\">T&uuml;rkis</option>"; }
else { var co_hov_bo_se_9 = "<option value=\"cyan\" style=\"background-color:cyan;\">T&uuml;rkis</option>"; }
if (popup_color[4] == "magenta") { var co_hov_bo_se_10 = "<option selected value=\"magenta\" style=\"background-color:magenta;\">Pink</option>"; }
else { var co_hov_bo_se_10 = "<option value=\"magenta\" style=\"background-color:magenta;\">Pink</option>"; }

var co_hov_bo_se = co_hov_bo_se_0+co_hov_bo_se_1+co_hov_bo_se_2+co_hov_bo_se_3+co_hov_bo_se_4+co_hov_bo_se_5+co_hov_bo_se_6+co_hov_bo_se_7+co_hov_bo_se_8+co_hov_bo_se_9+co_hov_bo_se_10
var jn_cl_bl_body_hov = "<select id=\"jn_hovcl_mn_body\" class=\"jn_color_select\">"+co_hov_bo_se+"</select>";

// farbauswahl text menuekoepfe
if (popup_color[1] == "black") { var co_txt_he_se_0 = "<option selected value=\"black\" style=\"background-color:black; color:white;\">Standard</option>"; }
else { var co_txt_he_se_0 = "<option value=\"black\" style=\"background-color:black; color:white;\">Standard</option>"; }
if (popup_color[1] == "white") { var co_txt_he_se_1 = "<option selected value=\"white\" style=\"background-color:white;\">Weiss</option>"; }
else { var co_txt_he_se_1 = "<option value=\"white\" style=\"background-color:white;\">Weiss</option>"; }
if (popup_color[1] == "red") { var co_txt_he_se_2 = "<option selected value=\"red\" style=\"background-color:red;\">Rot</option>"; }
else { var co_txt_he_se_2 = "<option value=\"red\" style=\"background-color:red;\">Rot</option>"; }
if (popup_color[1] == "green") { var co_txt_he_se_3 = "<option selected value=\"green\" style=\"background-color:green;\">Gr&uuml;n</option>"; }
else { var co_txt_he_se_3 = "<option value=\"green\" style=\"background-color:green;\">Gr&uuml;n</option>"; }
if (popup_color[1] == "yellow") { var co_txt_he_se_4 = "<option selected value=\"yellow\" style=\"background-color:yellow;\">Gelb</option>"; }
else { var co_txt_he_se_4 = "<option value=\"yellow\" style=\"background-color:yellow;\">Gelb</option>"; }
if (popup_color[1] == "orange") { var co_txt_he_se_5 = "<option selected value=\"orange\" style=\"background-color:orange;\">Orange</option>"; }
else { var co_txt_he_se_5 = "<option value=\"orange\" style=\"background-color:orange;\">Orange</option>"; }
if (popup_color[1] == "gray") { var co_txt_he_se_6 = "<option selected value=\"gray\" style=\"background-color:gray;\">Grau</option>"; }
else { var co_txt_he_se_6 = "<option value=\"gray\" style=\"background-color:gray;\">Grau</option>"; }
if (popup_color[1] == "blue") { var co_txt_he_se_7 = "<option selected value=\"blue\" style=\"background-color:blue;\">Blau</option>"; }
else { var co_txt_he_se_7 = "<option value=\"blue\" style=\"background-color:blue;\">Blau</option>"; }
if (popup_color[1] == "cyan") { var co_txt_he_se_8 = "<option selected value=\"cyan\" style=\"background-color:cyan;\">T&uuml;rkis</option>"; }
else { var co_txt_he_se_8 = "<option value=\"cyan\" style=\"background-color:cyan;\">T&uuml;rkis</option>"; }
if (popup_color[1] == "magenta") { var co_txt_he_se_9 = "<option selected value=\"magenta\" style=\"background-color:magenta;\">Pink</option>"; }
else { var co_txt_he_se_9 = "<option value=\"magenta\" style=\"background-color:magenta;\">Pink</option>"; }

var co_txt_he_se = co_txt_he_se_0+co_txt_he_se_1+co_txt_he_se_2+co_txt_he_se_3+co_txt_he_se_4+co_txt_he_se_5+co_txt_he_se_6+co_txt_he_se_7+co_txt_he_se_8+co_txt_he_se_9
var jn_cl_bl_head_txt = "<select id=\"jn_txtcl_mn_head\" class=\"jn_color_select\">"+co_txt_he_se+"</select>";

// farbauswahl text menueeintraege
if (popup_color[3] == "white") { var co_txt_bo_se_0 = "<option selected value=\"white\" style=\"background-color:white;\">Standard</option>"; } 
else { var co_txt_bo_se_0 = "<option value=\"white\" style=\"background-color:white;\">Standard</option>"; }
if (popup_color[3] == "black") { var co_txt_bo_se_1 = "<option selected value=\"black\" style=\"background-color:black; color:white;\">Schwarz</option>"; }
else { var co_txt_bo_se_1 = "<option value=\"black\" style=\"background-color:black; color:white;\">Schwarz</option>"; }
if (popup_color[3] == "red") { var co_txt_bo_se_2 = "<option selected value=\"red\" style=\"background-color:red;\">Rot</option>"; }
else { var co_txt_bo_se_2 = "<option value=\"red\" style=\"background-color:red;\">Rot</option>"; }
if (popup_color[3] == "green") { var co_txt_bo_se_3 = "<option selected value=\"green\" style=\"background-color:green;\">Gr&uuml;n</option>"; }
else { var co_txt_bo_se_3 = "<option value=\"green\" style=\"background-color:green;\">Gr&uuml;n</option>"; }
if (popup_color[3] == "yellow") { var co_txt_bo_se_4 = "<option selected value=\"yellow\" style=\"background-color:yellow;\">Gelb</option>"; }
else { var co_txt_bo_se_4 = "<option value=\"yellow\" style=\"background-color:yellow;\">Gelb</option>"; }
if (popup_color[3] == "orange") { var co_txt_bo_se_5 = "<option selected value=\"orange\" style=\"background-color:orange;\">Orange</option>"; }
else { var co_txt_bo_se_5 = "<option value=\"orange\" style=\"background-color:orange;\">Orange</option>"; }
if (popup_color[3] == "gray") { var co_txt_bo_se_6 = "<option selected value=\"gray\" style=\"background-color:gray;\">Grau</option>"; }
else { var co_txt_bo_se_6 = "<option value=\"gray\" style=\"background-color:gray;\">Grau</option>"; }
if (popup_color[3] == "blue") { var co_txt_bo_se_7 = "<option selected value=\"blue\" style=\"background-color:blue;\">Blau</option>"; }
else { var co_txt_bo_se_7 = "<option value=\"blue\" style=\"background-color:blue;\">Blau</option>"; }
if (popup_color[3] == "cyan") { var co_txt_bo_se_8 = "<option selected value=\"cyan\" style=\"background-color:cyan;\">T&uuml;rkis</option>"; }
else { var co_txt_bo_se_8 = "<option value=\"cyan\" style=\"background-color:cyan;\">T&uuml;rkis</option>"; }
if (popup_color[3] == "magenta") { var co_txt_bo_se_9 = "<option selected value=\"magenta\" style=\"background-color:magenta;\">Pink</option>"; }
else { var co_txt_bo_se_9 = "<option value=\"magenta\" style=\"background-color:magenta;\">Pink</option>"; }

var co_txt_bo_se = co_txt_bo_se_0+co_txt_bo_se_1+co_txt_bo_se_2+co_txt_bo_se_3+co_txt_bo_se_4+co_txt_bo_se_5+co_txt_bo_se_6+co_txt_bo_se_7+co_txt_bo_se_8+co_txt_bo_se_9
var jn_cl_bl_body_txt = "<select id=\"jn_txtcl_mn_body\" class=\"jn_color_select\">"+co_txt_bo_se+"</select>";

// farbauswahl hovertext menueeintraege
if (popup_color[5] == "white") { var co_txt_hov_se_0 = "<option value=\"white\" style=\"background-color:white;\">Standard</option>"; }
else { var co_txt_hov_se_0 = "<option value=\"white\" style=\"background-color:white;\">Standard</option>"; }
if (popup_color[5] == "black") { var co_txt_hov_se_1 = "<option value=\"black\" style=\"background-color:black; color:white;\">Schwarz</option>"; }
else { var co_txt_hov_se_1 = "<option value=\"black\" style=\"background-color:black; color:white;\">Schwarz</option>"; }
if (popup_color[5] == "red") { var co_txt_hov_se_2 = "<option value=\"red\" style=\"background-color:red;\">Rot</option>"; }
else { var co_txt_hov_se_2 = "<option value=\"red\" style=\"background-color:red;\">Rot</option>"; }
if (popup_color[5] == "green") { var co_txt_hov_se_3 = "<option value=\"green\" style=\"background-color:green;\">Gr&uuml;n</option>"; }
else { var co_txt_hov_se_3 = "<option value=\"green\" style=\"background-color:green;\">Gr&uuml;n</option>"; }
if (popup_color[5] == "yellow") { var co_txt_hov_se_4 = "<option value=\"yellow\" style=\"background-color:yellow;\">Gelb</option>"; }
else { var co_txt_hov_se_4 = "<option value=\"yellow\" style=\"background-color:yellow;\">Gelb</option>"; }
if (popup_color[5] == "orange") { var co_txt_hov_se_5 = "<option value=\"orange\" style=\"background-color:orange;\">Orange</option>"; }
else { var co_txt_hov_se_5 = "<option value=\"orange\" style=\"background-color:orange;\">Orange</option>"; }
if (popup_color[5] == "gray") { var co_txt_hov_se_6 = "<option value=\"gray\" style=\"background-color:gray;\">Grau</option>"; }
else { var co_txt_hov_se_6 = "<option value=\"gray\" style=\"background-color:gray;\">Grau</option>"; }
if (popup_color[5] == "blue") { var co_txt_hov_se_7 = "<option value=\"blue\" style=\"background-color:blue;\">Blau</option>"; }
else { var co_txt_hov_se_7 = "<option value=\"blue\" style=\"background-color:blue;\">Blau</option>"; }
if (popup_color[5] == "cyan") { var co_txt_hov_se_8 = "<option value=\"cyan\" style=\"background-color:cyan;\">T&uuml;rkis</option>"; }
else { var co_txt_hov_se_8 = "<option value=\"cyan\" style=\"background-color:cyan;\">T&uuml;rkis</option>"; }
if (popup_color[5] == "magenta") { var co_txt_hov_se_9 = "<option value=\"magenta\" style=\"background-color:magenta;\">Pink</option>"; }
else { var co_txt_hov_se_9 = "<option value=\"magenta\" style=\"background-color:magenta;\">Pink</option>"; }

var co_txt_hov_se = co_txt_hov_se_0+co_txt_hov_se_1+co_txt_hov_se_2+co_txt_hov_se_3+co_txt_hov_se_4+co_txt_hov_se_5+co_txt_hov_se_6+co_txt_hov_se_7+co_txt_hov_se_8+co_txt_hov_se_9
var jn_cl_bl_body_txt_hov = "<select id=\"jn_txtcl_mn_body_hov\" class=\"jn_color_select\">"+co_txt_hov_se+"</select>";

// tabelle fuer farben erstellen
var tabelle_zeile_1 = "<tr><td class=\"color_td_30 head_c\">Men&uuml;farben</td><td class=\"color_td_35 head_c\">Hintergrund</td><td class=\"color_td_35 head_c\">Text</td></tr>";
var tabelle_zeile_2 = "<tr><td class=\"color_td_30 head_c\">Men&uuml;k&ouml;pfe</td><td id=\"set_prev_head_col_bg\" class=\"color_td_35\" style=\"background-color:"+popup_color[0]+"\">"+jn_cl_bl_head_bg+"</td><td id=\"set_prev_head_col_txt\" class=\"color_td_35\" style=\"background-color:"+popup_color[1]+"\">"+jn_cl_bl_head_txt+"</td></tr>";
var tabelle_zeile_3 = "<tr><td class=\"color_td_30 head_c\">Men&uuml;punkte</td><td id=\"set_prev_body_col_bg\" class=\"color_td_35\" style=\"background-color:"+popup_color[2]+"\">"+jn_cl_bl_body_bg+"</td><td id=\"set_prev_body_col_txt\" class=\"color_td_35\" style=\"background-color:"+popup_color[3]+"\">"+jn_cl_bl_body_txt+"</td></tr>";
var tabelle_zeile_4 = "<tr><td class=\"color_td_30 head_c\">Men&uuml;punkte Hover</td><td id=\"set_prev_body_col_bg_hv\" class=\"color_td_35\" style=\"background-color:"+popup_color[4]+"\">"+jn_cl_bl_body_hov+"</td><td id=\"set_prev_body_col_txt_hov\" class=\"color_td_35\" style=\"background-color:"+popup_color[5]+"\">"+jn_cl_bl_body_txt_hov+"</td></tr>";

var tabelle_gesamt = "<table style=\"width:100%; border:0; cellpadding:2; cellspacing:2;\">"+tabelle_zeile_1+tabelle_zeile_2+tabelle_zeile_3+tabelle_zeile_4+"</table>";

var jn_set_afs = "<fieldset class=\"set_pop_fildset\"><legend id=\"help_style\" class=\"jpy_nav_set_pop set_head\">Ausrichtung, Fixierung und Style</legend>"+JN_Option_Ausrichtung+tabelle_gesamt+"</fieldset>";

// menuebloecke
// option uebersichtblock anzeigen ja/nein
if (popup_blocks[0] == "true")
{var JN_O_UebersichtBlock = "<input name=\"JN_UebersichtBlockIn\" type=\"checkbox\"  checked=\"checked\" /><u>&Uuml;bersicht</u>";}
else{var JN_O_UebersichtBlock = "<input name=\"JN_UebersichtBlockIn\" type=\"checkbox\" /><u>&Uuml;bersicht</u>";};
// option mein jappy block anzeigen ja/nein
if (popup_blocks[1] == "true")
{var JN_O_MyJappyBlock = "<input name=\"JN_MyJappyBlockIn\" type=\"checkbox\"  checked=\"checked\" /><u>Mein Jappy</u>";}
else{var JN_O_MyJappyBlock = "<input name=\"JN_MyJappyBlockIn\" type=\"checkbox\" /><u>Mein Jappy</u>";};
// option mehr block anzeigen ja/nein
if (popup_blocks[2] == "true")
{var JN_O_MooreBlock = "<input name=\"JN_MooreBlockIn\" type=\"checkbox\" checked=\"checked\" /><u>Mehr</u>";}
else{var JN_O_MooreBlock = "</u> <input name=\"JN_MooreBlockIn\" type=\"checkbox\" /><u>Mehr</u>";};
// option quick-links anzeigen ja/nein
if (popup_blocks[3] == "true")
{var jn_o_Quicklinks = "<input name=\"jn_quick_linksIn\" type=\"checkbox\" checked=\"checked\" /><u>Quick-Links</u>";}
else{var jn_o_Quicklinks = "<input name=\"jn_quick_linksIn\" type=\"checkbox\" /><u>Quick-Links</u>";};

var jn_set_bloecke = "<fieldset class=\"set_pop_fildset\"><legend id=\"help_blocks\" class=\"jpy_nav_set_pop set_head\">Men&uuml;bl&ouml;cke</legend><div class=\"jpy_nav_set_pop\">"+JN_O_UebersichtBlock+" "+JN_O_MyJappyBlock+" "+JN_O_MooreBlock+" "+jn_o_Quicklinks+"</div></fieldset>";

// quick-links
// link 1
if (popup_quick1[0] == "true")
{var JN_O_quicky_1 = "<input name=\"jn_quicky_1In\" type=\"checkbox\" checked=\"checked\" /><span class=\"icFwd\">&nbsp;</span>#1";}
else{var JN_O_quicky_1 = "<input name=\"jn_quicky_1In\" type=\"checkbox\" /><span class=\"icFwd\">&nbsp;</span>#1";};
var quicky_1_name = "Name: <input id=\"quicky_1_nameIn\" MAXLENGTH=\"18\" size=\"18\" type=\"text\" value=\""+popup_quick1[1]+"\" class=\"jn_color_select\" />"
var quicky_1_url = "URL: <input id=\"quicky_1_urlIn\" size=\"46\" type=\"text\" value=\""+popup_quick1[2]+"\" class=\"jn_color_select\" />"
if (popup_quick1[3] == "_blank") {
var link_1_new = "<option selected value=\"_blank\">Neue Seite</option>";
var link_1_self = "<option value=\"_self\">Gleiche Seite</option>";
} else {
var link_1_new = "<option value=\"_blank\">Neue Seite</option>";
var link_1_self = "<option selected value=\"_self\">Gleiche Seite</option>";
}
var quicky_1_target = "Ziel: <select id=\"quicky_1_targetIn\" class=\"jn_color_select\">"+link_1_new+link_1_self+"</select>"
// linkoptionen zusamensetzen
var quick_link_1 = "<p>"+JN_O_quicky_1+" "+quicky_1_name+" "+quicky_1_target+"</p><p>"+quicky_1_url+"</p>";
if (popup_quick1[0] == "true") {
var jn_set_quick_1 = "<div class=\"jpy_nav_set_pop activ_1\">"+quick_link_1+"</div>";
} else {
var jn_set_quick_1 = "<div class=\"jpy_nav_set_pop activ_0\">"+quick_link_1+"</div>";
}

// link 2
if (popup_quick2[0] == "true")
{var JN_O_quicky_2 = "<input name=\"jn_quicky_2In\" type=\"checkbox\" checked=\"checked\" /><span class=\"icFwd\">&nbsp;</span>#2";}
else{var JN_O_quicky_2 = "<input name=\"jn_quicky_2In\" type=\"checkbox\" /><span class=\"icFwd\">&nbsp;</span>#2";};
var quicky_2_name = "Name: <input id=\"quicky_2_nameIn\" MAXLENGTH=\"18\" size=\"18\" type=\"text\" value=\""+popup_quick2[1]+"\" class=\"jn_color_select\" />"
var quicky_2_url = "URL: <input id=\"quicky_2_urlIn\" size=\"46\" type=\"text\" value=\""+popup_quick2[2]+"\" class=\"jn_color_select\" />"
if (popup_quick2[3] == "_blank") {
var link_2_new = "<option selected value=\"_blank\">Neue Seite</option>";
var link_2_self = "<option value=\"_self\">Gleiche Seite</option>";
} else {
var link_2_new = "<option value=\"_blank\">Neue Seite</option>";
var link_2_self = "<option selected value=\"_self\">Gleiche Seite</option>";
}
var quicky_2_target = "Ziel: <select id=\"quicky_2_targetIn\" class=\"jn_color_select\">"+link_2_new+link_2_self+"</select>"
// linkoptionen zusamensetzen
var quick_link_2 = "<p>"+JN_O_quicky_2+" "+quicky_2_name+" "+quicky_2_target+"</p><p>"+quicky_2_url+"</p>";
if (popup_quick2[0] == "true") {
var jn_set_quick_2 = "<div class=\"jpy_nav_set_pop activ_1\">"+quick_link_2+"</div>";
} else {
var jn_set_quick_2 = "<div class=\"jpy_nav_set_pop activ_0\">"+quick_link_2+"</div>";
}

// link 3
if (popup_quick3[0] == "true")
{var JN_O_quicky_3 = "<input name=\"jn_quicky_3In\" type=\"checkbox\" checked=\"checked\" /><span class=\"icFwd\">&nbsp;</span>#3";}
else{var JN_O_quicky_3 = "<input name=\"jn_quicky_3In\" type=\"checkbox\" /><span class=\"icFwd\">&nbsp;</span>#3";};
var quicky_3_name = "Name: <input id=\"quicky_3_nameIn\" MAXLENGTH=\"18\" size=\"18\" type=\"text\" value=\""+popup_quick3[1]+"\" class=\"jn_color_select\" />"
var quicky_3_url = "URL: <input id=\"quicky_3_urlIn\" size=\"46\" type=\"text\" value=\""+popup_quick3[2]+"\" class=\"jn_color_select\" />"
if (popup_quick3[3] == "_blank") {
var link_3_new = "<option selected value=\"_blank\">Neue Seite</option>";
var link_3_self = "<option value=\"_self\">Gleiche Seite</option>";
} else {
var link_3_new = "<option value=\"_blank\">Neue Seite</option>";
var link_3_self = "<option selected value=\"_self\">Gleiche Seite</option>";
}
var quicky_3_target = "Ziel: <select id=\"quicky_3_targetIn\" class=\"jn_color_select\">"+link_3_new+link_3_self+"</select>"
// linkoptionen zusamensetzen
var quick_link_3 = "<p>"+JN_O_quicky_3+" "+quicky_3_name+" "+quicky_3_target+"</p><p>"+quicky_3_url+"</p>";
if (popup_quick3[0] == "true") {
var jn_set_quick_3 = "<div class=\"jpy_nav_set_pop activ_1\">"+quick_link_3+"</div>";
} else {
var jn_set_quick_3 = "<div class=\"jpy_nav_set_pop activ_0\">"+quick_link_3+"</div>";
}

// link 4
if (popup_quick4[0] == "true")
{var JN_O_quicky_4 = "<input name=\"jn_quicky_4In\" type=\"checkbox\" checked=\"checked\" /><span class=\"icFwd\">&nbsp;</span>#4";}
else{var JN_O_quicky_4 = "<input name=\"jn_quicky_4In\" type=\"checkbox\" /><span class=\"icFwd\">&nbsp;</span>#4";};
var quicky_4_name = "Name: <input id=\"quicky_4_nameIn\" MAXLENGTH=\"18\" size=\"18\" type=\"text\" value=\""+popup_quick4[1]+"\" class=\"jn_color_select\" />"
var quicky_4_url = "URL: <input id=\"quicky_4_urlIn\" size=\"46\"\" type=\"text\" value=\""+popup_quick4[2]+"\" class=\"jn_color_select\" />"
if (popup_quick4[3] == "_blank") {
var link_4_new = "<option selected value=\"_blank\">Neue Seite</option>";
var link_4_self = "<option value=\"_self\">Gleiche Seite</option>";
} else {
var link_4_new = "<option value=\"_blank\">Neue Seite</option>";
var link_4_self = "<option selected value=\"_self\">Gleiche Seite</option>";
}
var quicky_4_target = "Ziel: <select id=\"quicky_4_targetIn\" class=\"jn_color_select\">"+link_4_new+link_4_self+"</select>"
// linkoptionen zusamensetzen
var quick_link_4 = "<p>"+JN_O_quicky_4+" "+quicky_4_name+" "+quicky_4_target+"</p><p>"+quicky_4_url+"</p>";
if (popup_quick4[0] == "true") {
var jn_set_quick_4 = "<div class=\"jpy_nav_set_pop activ_1\">"+quick_link_4+"</div>";
} else {
var jn_set_quick_4 = "<div class=\"jpy_nav_set_pop activ_0\">"+quick_link_4+"</div>";
}

// link 5
if (popup_quick5[0] == "true")
{var JN_O_quicky_5 = "<input name=\"jn_quicky_5In\" type=\"checkbox\" checked=\"checked\" /><span class=\"icFwd\">&nbsp;</span>#5";}
else{var JN_O_quicky_5 = "<input name=\"jn_quicky_5In\" type=\"checkbox\" /><span class=\"icFwd\">&nbsp;</span>#5";};
var quicky_5_name = "Name: <input id=\"quicky_5_nameIn\" MAXLENGTH=\"18\" size=\"18\" type=\"text\" value=\""+popup_quick5[1]+"\" class=\"jn_color_select\" />"
var quicky_5_url = "URL: <input id=\"quicky_5_urlIn\" size=\"46\"\" type=\"text\" value=\""+popup_quick5[2]+"\" class=\"jn_color_select\" />"
if (popup_quick5[3] == "_blank") {
var link_5_new = "<option selected value=\"_blank\">Neue Seite</option>";
var link_5_self = "<option value=\"_self\">Gleiche Seite</option>";
} else {
var link_5_new = "<option value=\"_blank\">Neue Seite</option>";
var link_5_self = "<option selected value=\"_self\">Gleiche Seite</option>";
}
var quicky_5_target = "Ziel: <select id=\"quicky_5_targetIn\" class=\"jn_color_select\">"+link_5_new+link_5_self+"</select>"
// linkoptionen zusamensetzen
var quick_link_5 = "<p>"+JN_O_quicky_5+" "+quicky_5_name+" "+quicky_5_target+"</p><p>"+quicky_5_url+"</p>";
if (popup_quick5[0] == "true") {
var jn_set_quick_5 = "<div class=\"jpy_nav_set_pop activ_1\">"+quick_link_5+"</div>";
} else {
var jn_set_quick_5 = "<div class=\"jpy_nav_set_pop activ_0\">"+quick_link_5+"</div>";
}

// link 6
if (popup_quick6[0] == "true")
{var JN_O_quicky_6 = "<input name=\"jn_quicky_6In\" type=\"checkbox\" checked=\"checked\" /><span class=\"icFwd\">&nbsp;</span>#6";}
else{var JN_O_quicky_6 = "<input name=\"jn_quicky_6In\" type=\"checkbox\" /><span class=\"icFwd\">&nbsp;</span>#6";};
var quicky_6_name = "Name: <input id=\"quicky_6_nameIn\" MAXLENGTH=\"18\" size=\"18\" type=\"text\" value=\""+popup_quick6[1]+"\" class=\"jn_color_select\" />"
var quicky_6_url = "URL: <input id=\"quicky_6_urlIn\" size=\"46\" type=\"text\" value=\""+popup_quick6[2]+"\" class=\"jn_color_select\" />"
if (popup_quick6[3] == "_blank") {
var link_6_new = "<option selected value=\"_blank\">Neue Seite</option>";
var link_6_self = "<option value=\"_self\">Gleiche Seite</option>";
} else {
var link_6_new = "<option value=\"_blank\">Neue Seite</option>";
var link_6_self = "<option selected value=\"_self\">Gleiche Seite</option>";
}
var quicky_6_target = "Ziel: <select id=\"quicky_6_targetIn\" class=\"jn_color_select\">"+link_6_new+link_6_self+"</select>"
// linkoptionen zusamensetzen
var quick_link_6 = "<p>"+JN_O_quicky_6+" "+quicky_6_name+" "+quicky_6_target+"</p><p>"+quicky_6_url+"</p>";
if (popup_quick6[0] == "true") {
var jn_set_quick_6 = "<div class=\"jpy_nav_set_pop activ_1\">"+quick_link_6+"</div>";
} else {
var jn_set_quick_6 = "<div class=\"jpy_nav_set_pop activ_0\">"+quick_link_6+"</div>";
}

// optionsmenue punkte quicklinks zusamensetzen
var jn_set_quicklinks = "<fieldset class=\"set_pop_fildset\"><legend id=\"help_quickies\" class=\"jpy_nav_set_pop set_head\">Quick-Links</legend>"+jn_set_quick_1+jn_set_quick_2+jn_set_quick_3+jn_set_quick_4+jn_set_quick_5+jn_set_quick_6+"</fieldset>";

// haustiere
var JN_O_Pet_1_search = "<input id=\"search_pet_1\" type=\"button\" value=\"Auto\">";
var JN_O_Pet_1_reset = "<input id=\"reset_pet_1\" type=\"button\" value=\"Reset\">";
// option pet 1
var JN_O_pet1_url = "<input class=\"jn_color_select\" id=\"haustier_1_url\" name=\"haustier_1_url\" type=\"text\" size=\"30\" value=\""+popup_pets[0]+"\" />";
var JN_O_pet1_name = "<input class=\"jn_color_select\" id=\"haustier_1_name\" name=\"haustier_1_name\" type=\"text\" size=\"10\" value=\""+popup_pets[1]+"\" />";

var JN_O_Pet_2_search = "<input id=\"search_pet_2\" type=\"button\" value=\"Auto\">";
var JN_O_Pet_2_reset = "<input id=\"reset_pet_2\" type=\"button\" value=\"Reset\">";
// option pet 2
var JN_O_pet2_url = "<input class=\"jn_color_select\" id=\"haustier_2_url\" name=\"haustier_2_url\" type=\"text\" size=\"30\" value=\""+popup_pets[2]+"\" />";
var JN_O_pet2_name = "<input class=\"jn_color_select\" id=\"haustier_2_name\" name=\"haustier_2_name\" type=\"text\" size=\"10\" value=\""+popup_pets[3]+"\" />";

var jn_pet_1 = "<div class=\"jpy_nav_set_pop\">Haustier 1:</br>"+JN_O_Pet_1_search+JN_O_Pet_1_reset+" "+JN_O_pet1_url+" "+JN_O_pet1_name+"</div>";
var jn_pet_2 = "<div class=\"jpy_nav_set_pop\">Haustier 2:</br>"+JN_O_Pet_2_search+JN_O_Pet_2_reset+" "+JN_O_pet2_url+" "+JN_O_pet2_name+"</div>";

var jn_set_pets = "<fieldset class=\"set_pop_fildset\"><legend id=\"help_pets\" class=\"jpy_nav_set_pop set_head\">Haustiere</legend>"+jn_pet_1+jn_pet_2+"</fieldset>";

// funktionen
// sound lautstaerke
if(popup_vars[3] == 10) { var volume_1 = "<option selected value=\"10\">10</option>"; } else { var volume_1 = "<option value=\"10\">10</option>";};
if(popup_vars[3] == 20) { var volume_2 = "<option selected value=\"20\">20</option>"; } else { var volume_2 = "<option value=\"20\">20</option>";};
if(popup_vars[3] == 30) { var volume_3 = "<option selected value=\"30\">30</option>"; } else { var volume_3 = "<option value=\"30\">30</option>";};
if(popup_vars[3] == 40) { var volume_4 = "<option selected value=\"40\">40</option>"; } else { var volume_4 = "<option value=\"40\">40</option>";};
if(popup_vars[3] == 50) { var volume_5 = "<option selected value=\"50\">50</option>"; } else { var volume_5 = "<option value=\"50\">50</option>";};
if(popup_vars[3] == 60) { var volume_6 = "<option selected value=\"60\">60</option>"; } else { var volume_6 = "<option value=\"60\">60</option>";};
if(popup_vars[3] == 70) { var volume_7 = "<option selected value=\"70\">70</option>"; } else { var volume_7 = "<option value=\"70\">70</option>";};
if(popup_vars[3] == 80) { var volume_8 = "<option selected value=\"80\">80</option>"; } else { var volume_8 = "<option value=\"80\">80</option>";};
if(popup_vars[3] == 90) { var volume_9 = "<option selected value=\"90\">90</option>"; } else { var volume_9 = "<option value=\"90\">90</option>";};
if(popup_vars[3] == 100) { var volume_10 = "<option selected value=\"100\">100</option>"; } else { var volume_10 = "<option value=\"100\">100</option>";};
// mailsound select
var jn_set_vol_box = "<select class=\"jn_color_select\" name=\"soundVolumeIn\">"+volume_1+volume_2+volume_3+volume_4+volume_5+volume_6+volume_7+volume_8+volume_9+volume_10+"</select>";
var jn_set_volume = "Lautstärke Mailsound:"+jn_set_vol_box+"";
// optionen funktionen anzeigen ja/nein
if (popup_vars[4] == "true")
{var JN_O_MailcheckBox = "<input name=\"JN_MailCheckIn\" type=\"checkbox\" checked=\"checked\" />";}
else{var JN_O_MailcheckBox = "<input name=\"JN_MailCheckIn\" type=\"checkbox\" />";};
var JN_Plugin_Info = "Um den Mailwarner nutzen zu k&ouml;nnen muss das <a href=\"http://port25.technet.com/pages/windows-media-player-firefox-plugin-download.aspx\" target=\"_blank\">\"Microsoft Windows Media Player Firefox Plugin\"</a> installiert werden.</br>Linux Nutzer haben dadurch leider das nachsehen. Es wird an einer alternatieve mit VLC gearbeitet.";
// mailcheck an/aus
var jn_set_mailcheck_onof = "<div class=\"jpy_nav_set_pop\"><span class=\"icEdit \">&nbsp;</span><u>Mailcheck</u> Einschalten? "+JN_O_MailcheckBox+" "+jn_set_volume+"</div><div class=\"jpy_nav_set_pop\">"+JN_Plugin_Info+"</div>";

var jn_set_funktionen = "<fieldset class=\"set_pop_fildset\"><legend id=\"help_functions\" class=\"jpy_nav_set_pop set_head\">Men&uuml;funktionen</legend>"+jn_set_mailcheck_onof+"</fieldset>";

var jpy_optionen_body = "<div id=\"settings_body\">"+jn_set_afs+"</br>"+jn_set_bloecke+"</br>"+jn_set_quicklinks+"</br>"+jn_set_pets+"</br>"+jn_set_funktionen+"</div>";

// settings popup erzeugen und fuellen
jpy_navi_sett_div.innerHTML = "<div id=\"jpy_navi_setting_popup\">"+jpy_optionen_header+jpy_optionen_body+"<div id=\"settings_footer\"><b>Informationen</b></div></div>"

// liveaenderung hintergrundfarbe menuekoepfe
document.getElementById("jn_bgcl_mn_head").addEventListener("change", function change_bg_head_color () {
var head_bg_color = document.getElementById("jn_bgcl_mn_head").value;
document.getElementById("set_prev_head_col_bg").setAttribute("style" , "background-color:"+head_bg_color+"")
addGlobalStyle('.main_point { background-color:'+head_bg_color+' }')
},true);
// liveaenderung schriftfarbe menuekoepfe
document.getElementById("jn_txtcl_mn_head").addEventListener("change", function change_txt_head_color () {
var head_txt_color = document.getElementById("jn_txtcl_mn_head").value;
document.getElementById("set_prev_head_col_txt").setAttribute("style" , "background-color:"+head_txt_color+"")
addGlobalStyle('.main_point { color:'+head_txt_color+' }')
},true);

// liveaenderung hintergrundfarbe menueinhalt
document.getElementById("jn_bgcl_mn_body").addEventListener("change", function change_bg_body_color () {
var body_bg_color = document.getElementById("jn_bgcl_mn_body").value;
document.getElementById("set_prev_body_col_bg").setAttribute("style" , "background-color:"+body_bg_color+"")
addGlobalStyle('.acc-content { background-color:'+body_bg_color+' }')
addGlobalStyle('#jpy_n_support { background-color:'+body_bg_color+' }')
},true);
// liveaenderung schriftfarbe menueinhalt
document.getElementById("jn_txtcl_mn_body").addEventListener("change", function change_txt_body_color () {
var body_txt_color = document.getElementById("jn_txtcl_mn_body").value;
document.getElementById("set_prev_body_col_txt").setAttribute("style" , "background-color:"+body_txt_color+"")
addGlobalStyle('.acc-content a { color:'+body_txt_color+' }')
addGlobalStyle('#jpy_n_support li a { color:'+body_txt_color+' }')
},true);

// liveaenderung hoverhintergrundfarbe menueinhalt
document.getElementById("jn_hovcl_mn_body").addEventListener("change", function change_bg_body_color_hov () {
var body_bg_color_hov = document.getElementById("jn_hovcl_mn_body").value;
document.getElementById("set_prev_body_col_bg_hv").setAttribute("style" , "background-color:"+body_bg_color_hov+"")
addGlobalStyle('.acc-content a:hover { background-color:'+body_bg_color_hov+' }')
addGlobalStyle('#jpy_n_support li a:hover { background-color:'+body_bg_color_hov+' }')
},true);
// liveaenderung hoverschriftfarbe menueinhalt
document.getElementById("jn_txtcl_mn_body_hov").addEventListener("change", function change_txt_body_color_hov () {
var body_txt_color_hov = document.getElementById("jn_txtcl_mn_body_hov").value;
document.getElementById("set_prev_body_col_txt_hov").setAttribute("style" , "background-color:"+body_txt_color_hov+"")
addGlobalStyle('.acc-content a:hover { color:'+body_txt_color_hov+' }')
addGlobalStyle('#jpy_n_support li a:hover { color:'+body_txt_color_hov+' }')
},true);


// mouse over/out menuefixierung
document.getElementById("help_style").addEventListener("mouseover", function anzeige () {
document.getElementById('settings_footer').innerHTML = '<b><u>Info Men&uuml;fixierung</u><br/>Scrollbar = Men&uuml; scrollt mit der Seite mit.<br/>Fixiert = Men&uuml; ist feststehend.</br>Fixiert ist bei kleinen aufl&ouml;sungen bzw Displays NICHT zu empfehlen wen viele Men&uuml;punkte aktiv sind da sonst die unteren Men&uuml;punkte nicht mehr erreichbar sind!!</b>';
document.getElementById('settings_footer').setAttribute('style','background-color:green;')
},false);
document.getElementById("help_style").addEventListener("mouseout", function anzeige () {
document.getElementById('settings_footer').innerHTML = '<b>Informationen</b>';
document.getElementById('settings_footer').removeAttribute('style','background-color:green;')
},false);

// mouse over/out menuebloecke
document.getElementById("help_blocks").addEventListener("mouseover", function anzeige () {
document.getElementById('settings_footer').innerHTML = '<b>Gew&uuml;nschte Men&uuml;bl&ouml;cke ein- bzw ausblenden</b>';
document.getElementById('settings_footer').setAttribute('style','background-color:green;')
},false);
document.getElementById("help_blocks").addEventListener("mouseout", function anzeige () {
document.getElementById('settings_footer').innerHTML = '<b>Informationen</b>';
document.getElementById('settings_footer').removeAttribute('style','background-color:green;')
},false)

// mouse over/out quicklinks
document.getElementById("help_quickies").addEventListener("mouseover", function anzeige () {
document.getElementById('settings_footer').innerHTML = '<b>Der Linkname ist auf <u>18</u> Zeichen begrenzt da sonst der angezeigte Name &uuml;ber den Men&uuml;rand herrausragen w&uuml;rde.<br/>Inaktive Links werden zur besseren unterscheidung grau hinterlegt angezeigt.</b>';
document.getElementById('settings_footer').setAttribute('style','background-color:green;')
},false);
document.getElementById("help_quickies").addEventListener("mouseout", function anzeige () {
document.getElementById('settings_footer').innerHTML = '<b>Informationen</b>';
document.getElementById('settings_footer').removeAttribute('style','background-color:green;')
},false);

// mouse over/out haustiere
document.getElementById("help_pets").addEventListener("mouseover", function anzeige () {
document.getElementById('settings_footer').innerHTML = '<b>AUTO: Liest die nötigen Daten zur erzeugung des Haustierlinks automatisch aus.<br/>RESET: Stellt den Link zurück auf Standart.</br>Bei erfolgreichem auslesen werden die Daten eingetragen und die Felder gr&uuml;n hinterlegt.</br>Sollte das auslesen fehlschlagen kann man die n&ou,ml;tigen Daten manuell in die Felder eintragen.</b>';
document.getElementById('settings_footer').setAttribute('style','background-color:green;')
},false);
document.getElementById("help_pets").addEventListener("mouseout", function anzeige () {
document.getElementById('settings_footer').innerHTML = '<b>Informationen</b>';
document.getElementById('settings_footer').removeAttribute('style','background-color:green;')
},false)

// mouse over/out funktionen
document.getElementById("help_functions").addEventListener("mouseover", function anzeige () {
document.getElementById('settings_footer').innerHTML = '<b>Diverse funktionelle erweiterungen.</b>';
document.getElementById('settings_footer').setAttribute('style','background-color:green;')
},false);
document.getElementById("help_functions").addEventListener("mouseout", function anzeige () {
document.getElementById('settings_footer').innerHTML = '<b>Informationen</b>';
document.getElementById('settings_footer').removeAttribute('style','background-color:green;')
},false)

// name und id des ersten haustiers auslesen
document.getElementById('search_pet_1').addEventListener('click', function haustier_suche_1() {
HTTP_REQ(MainUrl+"/user/"+popup_vars[0],'GET',pet_1,popup_vars[0]);
},false);
// haustier 1 reset
document.getElementById('reset_pet_1').addEventListener('click', function haustier_reset_1() {
var pet_1_link = "/user/"+popup_vars[0]+"/pet/home";
var pet_1_name = "Stall";
document.getElementById("haustier_1_url").value = pet_1_link;
document.getElementById("haustier_1_name").value = pet_1_name;
addGlobalStyle('#haustier_1_url, #haustier_1_Name {background:white; color:black;}')
},false);

// name und id des zweiten haustiers auslesen
document.getElementById('search_pet_2').addEventListener('click', function haustier_suche_2() {
HTTP_REQ(MainUrl+"/user/"+popup_vars[0],'GET',pet_2,popup_vars[0]);
},false);
// haustier 2 reset
document.getElementById('reset_pet_2').addEventListener('click', function haustier_reset_2() {
var pet_2_link = "/user/"+popup_vars[0]+"/pet/home";
var pet_2_name = "Stall";
document.getElementById("haustier_2_url").value = pet_2_link;
document.getElementById("haustier_2_name").value = pet_2_name;
addGlobalStyle('#haustier_2_url, #haustier_2_Name {background:white; color:black;}')
},false);

// klick auf speichern
document.getElementById("jpy_navi_settings_save") .addEventListener('click', function save_settings () {

// fixierung des menues
GM_setValue("JN_AbsoluteFixedIn" + popup_vars[1] , document.getElementsByName('JN_AbsoluteFixedIn')[0].value);
// pet 1 adresse speichern
GM_setValue("haustier_1_url" + popup_vars[1] , document.getElementById('haustier_1_url').value);
// pet 1 name speichern
GM_setValue("haustier_1_name" + popup_vars[1] , document.getElementById('haustier_1_name').value);
// pet 2 adresse speichern
GM_setValue("haustier_2_url" + popup_vars[1] , document.getElementById('haustier_2_url').value);
// pet 2 name speichern
GM_setValue("haustier_2_name" + popup_vars[1] , document.getElementById('haustier_2_name').value);

// hintergrundfarben speichern
// menuekoepfe bg
GM_setValue("head_bg_color" + popup_vars[1] , document.getElementById('jn_bgcl_mn_head').value);
// menuepunkte bg
GM_setValue("body_bg_color" + popup_vars[1] , document.getElementById('jn_bgcl_mn_body').value);
// menuepunkte hover bg
GM_setValue("body_bg_color_hov" + popup_vars[1] , document.getElementById('jn_hovcl_mn_body').value);

// schriftfarben speichern
// menuekoepfe txt
GM_setValue("head_txt_color" + popup_vars[1] , document.getElementById('jn_txtcl_mn_head').value);
// menuepunkte txt
GM_setValue("body_txt_color" + popup_vars[1] , document.getElementById('jn_txtcl_mn_body').value);
// menuepunkte hover txt
GM_setValue("body_txt_color_hov" + popup_vars[1] , document.getElementById('jn_txtcl_mn_body_hov').value);

// uebersicht block
if (document.getElementsByName('JN_UebersichtBlockIn')[0].checked == true)
{GM_setValue("JN_UebersichtBlockIn" + popup_vars[1] , "true");}else{GM_setValue("JN_UebersichtBlockIn" + popup_vars[1] , "false");}
// mein jappy block
if (document.getElementsByName('JN_MyJappyBlockIn')[0].checked == true)
{GM_setValue("JN_MyJappyBlockIn" + popup_vars[1] , "true");}else{GM_setValue("JN_MyJappyBlockIn" + popup_vars[1] , "false");}
// mehr block
if (document.getElementsByName('JN_MooreBlockIn')[0].checked == true)
{GM_setValue("JN_MooreBlockIn" + popup_vars[1] , "true");}else{GM_setValue("JN_MooreBlockIn" + popup_vars[1] , "false");}
// info block
if (document.getElementsByName('jn_quick_linksIn')[0].checked == true)
{GM_setValue("jn_quick_linksIn" + popup_vars[1] , "true");}else{GM_setValue("jn_quick_linksIn" + popup_vars[1] , "false");}

// quicklinks speichern
// link 1 anzeigen
if (document.getElementsByName('jn_quicky_1In')[0].checked == true)
{GM_setValue("jn_quicky_1_anzIn" + popup_vars[1] , "true");}else{GM_setValue("jn_quicky_1_anzIn" + popup_vars[1] , "false");}
// link 1 url
GM_setValue("jn_quicky_1_urlIn" + popup_vars[1] , document.getElementById('quicky_1_urlIn').value);
// link 1 name
GM_setValue("jn_quicky_1_namIn" + popup_vars[1] , document.getElementById('quicky_1_nameIn').value);
// link 1 ziel
GM_setValue("jn_quicky_1_tarIn" + popup_vars[1] , document.getElementById('quicky_1_targetIn').value);

// link 2 anzeigen
if (document.getElementsByName('jn_quicky_2In')[0].checked == true)
{GM_setValue("jn_quicky_2_anzIn" + popup_vars[1] , "true");}else{GM_setValue("jn_quicky_2_anzIn" + popup_vars[1] , "false");}
// link 2 url
GM_setValue("jn_quicky_2_urlIn" + popup_vars[1] , document.getElementById('quicky_2_urlIn').value);
// link 2 name
GM_setValue("jn_quicky_2_namIn" + popup_vars[1] , document.getElementById('quicky_2_nameIn').value);
// link 2 ziel
GM_setValue("jn_quicky_2_tarIn" + popup_vars[1] , document.getElementById('quicky_2_targetIn').value);

// link 3 anzeigen
if (document.getElementsByName('jn_quicky_3In')[0].checked == true)
{GM_setValue("jn_quicky_3_anzIn" + popup_vars[1] , "true");}else{GM_setValue("jn_quicky_3_anzIn" + popup_vars[1] , "false");}
// link 3 url
GM_setValue("jn_quicky_3_urlIn" + popup_vars[1] , document.getElementById('quicky_3_urlIn').value);
// link 3 name
GM_setValue("jn_quicky_3_namIn" + popup_vars[1] , document.getElementById('quicky_3_nameIn').value);
// link 3 ziel
GM_setValue("jn_quicky_3_tarIn" + popup_vars[1] , document.getElementById('quicky_3_targetIn').value);

// link 4 anzeigen
if (document.getElementsByName('jn_quicky_4In')[0].checked == true)
{GM_setValue("jn_quicky_4_anzIn" + popup_vars[1] , "true");}else{GM_setValue("jn_quicky_4_anzIn" + popup_vars[1] , "false");}
// link 4 url
GM_setValue("jn_quicky_4_urlIn" + popup_vars[1] , document.getElementById('quicky_4_urlIn').value);
// link 4 name
GM_setValue("jn_quicky_4_namIn" + popup_vars[1] , document.getElementById('quicky_4_nameIn').value);
// link 4 ziel
GM_setValue("jn_quicky_4_tarIn" + popup_vars[1] , document.getElementById('quicky_4_targetIn').value);

// link 5 anzeigen
if (document.getElementsByName('jn_quicky_5In')[0].checked == true)
{GM_setValue("jn_quicky_5_anzIn" + popup_vars[1] , "true");}else{GM_setValue("jn_quicky_5_anzIn" + popup_vars[1] , "false");}
// link 5 url
GM_setValue("jn_quicky_5_urlIn" + popup_vars[1] , document.getElementById('quicky_5_urlIn').value);
// link 5 name
GM_setValue("jn_quicky_5_namIn" + popup_vars[1] , document.getElementById('quicky_5_nameIn').value);
// link 5 ziel
GM_setValue("jn_quicky_5_tarIn" + popup_vars[1] , document.getElementById('quicky_5_targetIn').value);

// link 6 anzeigen
if (document.getElementsByName('jn_quicky_6In')[0].checked == true)
{GM_setValue("jn_quicky_6_anzIn" + popup_vars[1] , "true");}else{GM_setValue("jn_quicky_6_anzIn" + popup_vars[1] , "false");}
// link 6 url
GM_setValue("jn_quicky_6_urlIn" + popup_vars[1] , document.getElementById('quicky_6_urlIn').value);
// link 6 name
GM_setValue("jn_quicky_6_namIn" + popup_vars[1] , document.getElementById('quicky_6_nameIn').value);
// link 6 ziel
GM_setValue("jn_quicky_6_tarIn" + popup_vars[1] , document.getElementById('quicky_6_targetIn').value);

// mailcheck
// an / aus
if (document.getElementsByName('JN_MailCheckIn')[0].checked == true)
{GM_setValue("JN_MailCheckIn" + popup_vars[1] , "true");}else{GM_setValue("JN_MailCheckIn" + popup_vars[1] , "false");}
// sound lautstaerke
GM_setValue("soundVolumeIn" + popup_vars[1] , document.getElementsByName('soundVolumeIn')[0].value);

// angabe fuer pixelpruefung auslesen
var top_pixel = document.getElementsByName('JN_TopBottomPxIn')[0].value;
var left_pixel = document.getElementsByName('JN_RightLeftPxIn')[0].value;

// css falsche pixel von oben und link
if ( isNaN(left_pixel) && isNaN(top_pixel) ) {
addGlobalStyle('#jn_pvo, #jn_pvl { background:red; }')
document.getElementById('settings_footer').setAttribute('style','background-color:red;')
document.getElementById('settings_footer').innerHTML = '<b>Fehlerhafte Pixelangaben. Bitte Korrigieren. (Pixel von Oben & Links)</b>';
} else {
// css falsche pixel von oben
if ( isNaN(top_pixel) || top_pixel < 0 ) {
addGlobalStyle('#jn_pvo { background:red; }')
document.getElementById('settings_footer').setAttribute('style','background-color:red;')
document.getElementById('settings_footer').innerHTML = '<b>Fehlerhafte Pixelangaben. Bitte Korrigieren. (Pixel von Oben)</b>';
} else {
addGlobalStyle('#jn_pvo { background:green; }')
}
// css falsche pixel von links
if ( isNaN(left_pixel) || left_pixel < 0 ) {
addGlobalStyle('#jn_pvl { background:red; }')
document.getElementById('settings_footer').setAttribute('style','background-color:red;')
document.getElementById('settings_footer').innerHTML = '<b>Fehlerhafte Pixelangaben. Bitte Korrigieren. (Pixel von Links)</b>';
} else {
addGlobalStyle('#jn_pvl { background:green; }')
}

}

// pixelpruefung durchfuehren
if ( isNaN(top_pixel) || isNaN(left_pixel)  || top_pixel < 0  || left_pixel < 0 ) {
// fehlermeldung bei falscher eingabe fuer pixel
error_message = window.confirm ('Fehlerhafte angaben in den einstellungen (Pixelangaben)\n\n Trotzdem speichern? (Pixelangaben werden NICHT \u00fcbernommen!)');
// wenn mit ok bestatigt ...
if (error_message == true){
// meldung ausgeben ...
document.getElementById('settings_footer').innerHTML = '<b>Einstellungen erfolgreich &uuml;bernommen. Seite wird neu geladen.</b>';
document.getElementById('settings_footer').setAttribute('style','background-color:green;')
setTimeout(window.location.reload(), 3000)
} else { /*hier passiert nix*/ }

// wenn angaben fuer pixel ok ...
} else {
// angaben speichern ...
GM_setValue("JN_TopBottomPxIn" + popup_vars[1] , document.getElementsByName('JN_TopBottomPxIn')[0].value);
GM_setValue("JN_RightLeftPxIn" + popup_vars[1] , document.getElementsByName('JN_RightLeftPxIn')[0].value);
// meldung ausgeben ...
document.getElementById('settings_footer').innerHTML = '<b>Einstellungen erfolgreich &uuml;bernommen. Seite wird neu geladen.</b>';
document.getElementById('settings_footer').setAttribute('style','background-color:green;')
setTimeout(window.location.reload(), 3000)
}

},false);

// klick auf schliessen
document.getElementById("jpy_navi_settings_close").addEventListener('click', function close_settings () {
document.getElementById('settings_footer').innerHTML = "<b>Alle &Auml;nderungen wurden verworfen. Seite wird neu geladen.</b>";
document.getElementById('settings_footer').setAttribute('style','background-color:green;')
setTimeout(window.location.reload(), 3000)
},false);

}

////////////////////////////////////////////
////////////////////////////////////////////
//// einstellungsmenue block 1 uebersicht //
////////////////////////////////////////////
////////////////////////////////////////////
function open_settings_1(overview_oc,UserId,JN_UebersichtBlock,JN_Startseite,JN_Coms,JN_Flog,JN_Around) {

// settings uebersicht anzeigen
document.getElementById("set_overview_block").addEventListener('click', function open_set () {

if (overview_oc == false) { document.getElementById("overview_block_div").style.display = "block"; }

// icons ausblenden und ueberschrift aendern
document.getElementById("set_overview_block").setAttribute('style', 'display:none;');
document.getElementById("ov_span").setAttribute('style', 'display:none;');
addGlobalStyle('.icOk, .icDelete { cursor:pointer; float:right; }');
addGlobalStyle('.set_hover_cursor { cursor:pointer; }');
document.getElementById("overview_block").innerHTML += "<span id=\"ov_set_save\" class=\"icOk\">&nbsp;</span>";
document.getElementById("overview_block").innerHTML += "<span id=\"ov_set_cancel\" class=\"icDelete\">&nbsp;</span>";

// hover efekt fuer icons
document.getElementById("ov_set_save").addEventListener("mouseover", function anzeige () {
document.getElementById('ov_icon_hover').innerHTML = 'Speichern';
},false);
document.getElementById("ov_set_save").addEventListener("mouseout", function anzeige () {
document.getElementById('ov_icon_hover').innerHTML = 'Einstellungen';
},false);
document.getElementById("ov_set_cancel").addEventListener("mouseover", function anzeige () {
document.getElementById('ov_icon_hover').innerHTML = 'Abbrechen';
},false);
document.getElementById("ov_set_cancel").addEventListener("mouseout", function anzeige () {
document.getElementById('ov_icon_hover').innerHTML = 'Einstellungen';
},false);

// menuepunkte
// option Startseite
if (JN_Startseite == "true")
{var JN_O_Startseite = "<a class=\"set_hover_cursor\"><input name=\"JN_StartseiteIn\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icJpy\">&nbsp;</span><span style=\"color:#ffffff;\">Startseite</span></a>";}
else{var JN_O_Startseite = "<a class=\"set_hover_cursor\"><input name=\"JN_StartseiteIn\" type=\"checkbox\" /> <span class=\"icJpy\">&nbsp;</span><span style=\"color:#000000;\">Startseite</span></a>";};
// option Coms
if (JN_Coms == "true")
{var JN_O_Coms = "<a class=\"set_hover_cursor\"><input name=\"JN_ComsIn\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icComs\">&nbsp;</span><span style=\"color:#ffffff;\">Coms</span></a>";}
else{var JN_O_Coms = "<a class=\"set_hover_cursor\"><input name=\"JN_ComsIn\" type=\"checkbox\" /> <span class=\"icComs\">&nbsp;</span><span style=\"color:#000000;\">Coms</span></a>";};
// option Flog
if (JN_Flog == "true")
{var JN_O_Flog = "<a class=\"set_hover_cursor\"><input name=\"JN_FlogIn\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icFlog\">&nbsp;</span><span style=\"color:#ffffff;\">Flogs</span></a>";}
else{var JN_O_Flog = "<a class=\"set_hover_cursor\"><input name=\"JN_FlogIn\" type=\"checkbox\" /> <span class=\"icFlog\">&nbsp;</span><span style=\"color:#000000;\">Flogs</span></a>";};
// option Around
if (JN_Around == "true")
{var JN_O_Around = "<a class=\"set_hover_cursor\"><input name=\"JN_AroundIn\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icRum\">&nbsp;</span><span style=\"color:#ffffff;\">Rund um Mich</span></a>";}
else{var JN_O_Around = "<a class=\"set_hover_cursor\"><input name=\"JN_AroundIn\" type=\"checkbox\" /> <span class=\"icRum\">&nbsp;</span><span style=\"color:#000000;\">Rund um Mich</span></a>";};

document.getElementById("overview_block_div").innerHTML = ""+ JN_O_Startseite + JN_O_Coms + JN_O_Flog + JN_O_Around +"";

// klick auf speichern
document.getElementById("ov_set_save").addEventListener("click", function save_set () {

// startseite
if (document.getElementsByName('JN_StartseiteIn')[0].checked == true)
{GM_setValue("JN_StartseiteIn" + UserId , "true");}else{GM_setValue("JN_StartseiteIn" + UserId , "false");}
// coms
if (document.getElementsByName('JN_ComsIn')[0].checked == true)
{GM_setValue("JN_ComsIn" + UserId , "true");}else{GM_setValue("JN_ComsIn" + UserId , "false");}
// flog
if (document.getElementsByName('JN_FlogIn')[0].checked == true)
{GM_setValue("JN_FlogIn" + UserId , "true");}else{GM_setValue("JN_FlogIn" + UserId , "false");}
// around
if (document.getElementsByName('JN_AroundIn')[0].checked == true)
{GM_setValue("JN_AroundIn" + UserId , "true");}else{GM_setValue("JN_AroundIn" + UserId , "false");}

document.getElementById("overview_block_div").innerHTML = "<a class=\"set_hover_cursor\" style=\"background-color:#ffffff; color:green; font-weight:bold;\">Gespeichert</a>";

window.setTimeout(refresh, 3000);
function refresh() { location.reload() }

},false);

// nach abbrechen klick neuladen (3 sek)
document.getElementById("ov_set_cancel").addEventListener("click", function close_set () {
document.getElementById("overview_block_div").innerHTML = "<a class=\"set_hover_cursor\" style=\"background-color:#ffffff; color:red; font-weight:bold;\">Abgebrochen</a>";
window.setTimeout(refresh, 3000);
function refresh() { location.reload() }
},false);

},false);

}

////////////////////////////////////////////
////////////////////////////////////////////
//// einstellungsmenue block 2 mein jappy //
////////////////////////////////////////////
////////////////////////////////////////////
function open_settings_2(myjpy_oc,UserId,JN_MyJappyBlock,JN_Profil,JN_Mail,JN_Termin,JN_Freunde,JN_Geburtstag,JN_Haustier,haustier_1,haustier_2) {

// settings uebersicht anzeigen
document.getElementById("set_myjappy_block").addEventListener('click', function open_set () {

if (myjpy_oc == false) { document.getElementById("myjpy_block_div").style.display = "block"; }

// icons ausblenden und ueberschrift aendern
document.getElementById("set_myjappy_block").setAttribute('style', 'display:none;');
document.getElementById("my_span").setAttribute('style', 'display:none;');
addGlobalStyle('.icOk, .icDelete { cursor:pointer; float:right; }');
addGlobalStyle('.set_hover_cursor { cursor:pointer; }');
document.getElementById("myjpy_block").innerHTML += "<span id=\"my_set_save\" class=\"icOk\">&nbsp;</span>";
document.getElementById("myjpy_block").innerHTML += "<span id=\"my_set_cancel\" class=\"icDelete\">&nbsp;</span>";

// hover efekt fuer icons
document.getElementById("my_set_save").addEventListener("mouseover", function anzeige () {
document.getElementById('my_icon_hover').innerHTML = 'Speichern';
},false);
document.getElementById("my_set_save").addEventListener("mouseout", function anzeige () {
document.getElementById('my_icon_hover').innerHTML = 'Einstellungen';
},false);
document.getElementById("my_set_cancel").addEventListener("mouseover", function anzeige () {
document.getElementById('my_icon_hover').innerHTML = 'Abbrechen';
},false);
document.getElementById("my_set_cancel").addEventListener("mouseout", function anzeige () {
document.getElementById('my_icon_hover').innerHTML = 'Einstellungen';
},false);

// menuepunkte
// option Profil
if (JN_Profil == "true")
{var JN_O_Profil = "<a class=\"set_hover_cursor\"><input name=\"JN_ProfilIn\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icProfile\">&nbsp;</span><span style=\"color:#ffffff;\">Profil</span></a>";}
else{var JN_O_Profil = "<a class=\"set_hover_cursor\"><input name=\"JN_ProfilIn\" type=\"checkbox\" /> <span class=\"icProfile\">&nbsp;</span><span style=\"color:#000000;\">Profil</span></a>";};
// option Mail
if (JN_Mail == "true")
{var JN_O_Mail = "<a class=\"set_hover_cursor\"><input name=\"JN_MailIn\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icMailbox\">&nbsp;</span><span style=\"color:#ffffff;\">Mail</span></a>";}
else{var JN_O_Mail = "<a class=\"set_hover_cursor\"><input name=\"JN_MailIn\" type=\"checkbox\" /> <span class=\"icMailbox\">&nbsp;</span><span style=\"color:#000000;\">Mail</span></a>";};
// option Termin
if (JN_Termin == "true")
{var JN_O_Termin = "<a class=\"set_hover_cursor\"><input name=\"JN_TerminIn\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icAlmanac\">&nbsp;</span><span style=\"color:#ffffff;\">Termine</span></a>";}
else{var JN_O_Termin = "<a class=\"set_hover_cursor\"><input name=\"JN_TerminIn\" type=\"checkbox\" /> <span class=\"icAlmanac\">&nbsp;</span><span style=\"color:#000000;\">Termine</span></a>";};
// option Freunde
if (JN_Freunde == "true")
{var JN_O_Freunde = "<a class=\"set_hover_cursor\"><input name=\"JN_FreundeIn\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icBuddy\">&nbsp;</span><span style=\"color:#ffffff;\">Freunde</span></a>";}
else{var JN_O_Freunde = "<a class=\"set_hover_cursor\"><input name=\"JN_FreundeIn\" type=\"checkbox\" /> <span class=\"icBuddy\">&nbsp;</span><span style=\"color:#000000;\">Freunde</span></a>";};
// option Geburtstag
if (JN_Geburtstag == "true")
{var JN_O_Geburtstag = "<a class=\"set_hover_cursor\"><input name=\"JN_GeburtstagIn\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icBirthday\">&nbsp;</span><span style=\"color:#ffffff;\">Geburtstage</span></a>";}
else{var JN_O_Geburtstag = "<a class=\"set_hover_cursor\"><input name=\"JN_GeburtstagIn\" type=\"checkbox\" /> <span class=\"icBirthday\">&nbsp;</span><span style=\"color:#000000;\">Geburtstage</span></a>";};
// option Haustier
if (JN_Haustier == "true")
{var JN_O_Haustier = "<a class=\"set_hover_cursor\"><input name=\"JN_HaustierIn\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icSt40\">&nbsp;</span><span style=\"color:#ffffff;\">Stall</span></a>";}
else{var JN_O_Haustier = "<a class=\"set_hover_cursor\"><input name=\"JN_HaustierIn\" type=\"checkbox\" /> <span class=\"icSt40\">&nbsp;</span><span style=\"color:#000000;\">Stall</span></a>";};
// option Pet1
if (haustier_1 == "true")
{var JN_O_pet1 = "<a class=\"set_hover_cursor\"><input name=\"haustier_1\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icSt40\">&nbsp;</span><span style=\"color:#ffffff;\">Haustier 1</span></a>";}
else{var JN_O_pet1 = "<a class=\"set_hover_cursor\"><input name=\"haustier_1\" type=\"checkbox\" /> <span class=\"icSt40\">&nbsp;</span><span style=\"color:#000000;\">Haustier 1</span></a>";};
// option Around
if (haustier_2 == "true")
{var JN_O_pet2 = "<a class=\"set_hover_cursor\"><input name=\"haustier_2\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icSt40\">&nbsp;</span><span style=\"color:#ffffff;\">Haustier 2</span></a>";}
else{var JN_O_pet2 = "<a class=\"set_hover_cursor\"><input name=\"haustier_2\" type=\"checkbox\" /> <span class=\"icSt40\">&nbsp;</span><span style=\"color:#000000;\">Haustier 2</span></a>";};

document.getElementById("myjpy_block_div").innerHTML = ""+ JN_O_Profil + JN_O_Mail + JN_O_Termin + JN_O_Freunde + JN_O_Geburtstag + JN_O_Haustier + JN_O_pet1 + JN_O_pet2 +"";

// klick auf speichern
document.getElementById("my_set_save").addEventListener("click", function save_set () {

// startseite
if (document.getElementsByName('JN_ProfilIn')[0].checked == true)
{GM_setValue("JN_ProfilIn" + UserId , "true");}else{GM_setValue("JN_ProfilIn" + UserId , "false");}
// coms
if (document.getElementsByName('JN_MailIn')[0].checked == true)
{GM_setValue("JN_MailIn" + UserId , "true");}else{GM_setValue("JN_MailIn" + UserId , "false");}
// event
if (document.getElementsByName('JN_TerminIn')[0].checked == true)
{GM_setValue("JN_TerminIn" + UserId , "true");}else{GM_setValue("JN_TerminIn" + UserId , "false");}
// flog
if (document.getElementsByName('JN_FreundeIn')[0].checked == true)
{GM_setValue("JN_FreundeIn" + UserId , "true");}else{GM_setValue("JN_FreundeIn" + UserId , "false");}
// around
if (document.getElementsByName('JN_GeburtstagIn')[0].checked == true)
{GM_setValue("JN_GeburtstagIn" + UserId , "true");}else{GM_setValue("JN_GeburtstagIn" + UserId , "false");}
// haustier
if (document.getElementsByName('JN_HaustierIn')[0].checked == true)
{GM_setValue("JN_HaustierIn" + UserId , "true");}else{GM_setValue("JN_HaustierIn" + UserId , "false");}
// pet1
if (document.getElementsByName('haustier_1')[0].checked == true)
{GM_setValue("haustier_1" + UserId , "true");}else{GM_setValue("haustier_1" + UserId , "false");}
// pet2
if (document.getElementsByName('haustier_2')[0].checked == true)
{GM_setValue("haustier_2" + UserId , "true");}else{GM_setValue("haustier_2" + UserId , "false");}

document.getElementById("myjpy_block_div").innerHTML = "<a class=\"set_hover_cursor\" style=\"background-color:#ffffff; color:green; font-weight:bold;\">Gespeichert</a>";

window.setTimeout(refresh, 3000);
function refresh() { location.reload() }

},false);

// nach abbrechen klick neuladen (3 sek)
document.getElementById("my_set_cancel").addEventListener("click", function close_set () {
document.getElementById("myjpy_block_div").innerHTML = "<a class=\"set_hover_cursor\" style=\"background-color:#ffffff; color:red; font-weight:bold;\">Abgebrochen</a>";
window.setTimeout(refresh, 3000);
function refresh() { location.reload() }
},false);

},false);

}

////////////////////////////////////////////
////////////////////////////////////////////
//// einstellungsmenue block 3 mehr ////////
////////////////////////////////////////////
////////////////////////////////////////////
function open_settings_3(mehr_oc,UserId,JN_MooreBlock,JN_Statuswechsel,JN_StatusBox,JN_StatusBoxAnz,JN_Abo,JN_Fav) {

// settings uebersicht anzeigen
document.getElementById("set_mehr_block").addEventListener('click', function open_set () {

if (mehr_oc == false) { document.getElementById("mehr_block_div").style.display = "block"; }

// icons ausblenden und ueberschrift aendern
document.getElementById("set_mehr_block").setAttribute('style', 'display:none;');
document.getElementById("me_span").setAttribute('style', 'display:none;');
addGlobalStyle('.icOk, .icDelete { cursor:pointer; float:right; }');
addGlobalStyle('.set_hover_cursor { cursor:pointer; }');
document.getElementById("mehr_block").innerHTML += "<span id=\"me_set_save\" class=\"icOk\">&nbsp;</span>";
document.getElementById("mehr_block").innerHTML += "<span id=\"me_set_cancel\" class=\"icDelete\">&nbsp;</span>";

// hover efekt fuer icons
document.getElementById("me_set_save").addEventListener("mouseover", function anzeige () {
document.getElementById('me_icon_hover').innerHTML = 'Speichern';
},false);
document.getElementById("me_set_save").addEventListener("mouseout", function anzeige () {
document.getElementById('me_icon_hover').innerHTML = 'Einstellungen';
},false);
document.getElementById("me_set_cancel").addEventListener("mouseover", function anzeige () {
document.getElementById('me_icon_hover').innerHTML = 'Abbrechen';
},false);
document.getElementById("me_set_cancel").addEventListener("mouseout", function anzeige () {
document.getElementById('me_icon_hover').innerHTML = 'Einstellungen';
},false);

// menuepunkte
// option status
if (JN_Statuswechsel == "true")
{var JN_O_Statuswechsel = "<a class=\"set_hover_cursor\"><input name=\"JN_StatuswechselIn\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icEdit\">&nbsp;</span><span style=\"color:#ffffff;\">Statusauswahl</span></a>";}
else{var JN_O_Statuswechsel = "<a class=\"set_hover_cursor\"><input name=\"JN_StatuswechselIn\" type=\"checkbox\" /> <span class=\"icEdit\">&nbsp;</span><span style=\"color:#000000;\">Statusauswahl</span></a>";};
// option statusbox
if (JN_StatusBox == "true")
{var JN_O_StatusBox = "<a class=\"set_hover_cursor\"><input name=\"JN_StatusBoxIn\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icEdit\">&nbsp;</span><span style=\"color:#ffffff;\">StatusBox</span></a>";}
else{var JN_O_StatusBox = "<a class=\"set_hover_cursor\"><input name=\"JN_StatusBoxIn\" type=\"checkbox\" /> <span class=\"icEdit\">&nbsp;</span><span style=\"color:#000000;\">StatusBox</span></a>";};

// anzahl eintraege statusbox
if(JN_StatusBoxAnz == 1){ var Select_1 = "<option selected value=\"1\">1</option>"; } else{ var Select_1 = "<option value=\"1\">1</option>"; };
if(JN_StatusBoxAnz == 2){ var Select_2 = "<option selected value=\"2\">2</option>"; } else{ var Select_2 = "<option value=\"2\">2</option>"; };
if(JN_StatusBoxAnz == 3){ var Select_3 = "<option selected value=\"3\">3</option>"; } else{ var Select_3 = "<option value=\"3\">3</option>"; };
if(JN_StatusBoxAnz == 4){ var Select_4 = "<option selected value=\"4\">4</option>"; } else{ var Select_4 = "<option value=\"4\">4</option>"; };
if(JN_StatusBoxAnz == 5){ var Select_5 = "<option selected value=\"5\">5</option>"; } else{ var Select_5 = "<option value=\"5\">5</option>"; };
if(JN_StatusBoxAnz == 6){ var Select_6 = "<option selected value=\"6\">6</option>"; } else{ var Select_6 = "<option value=\"6\">6</option>"; };
if(JN_StatusBoxAnz == 7){ var Select_7 = "<option selected value=\"7\">7</option>"; } else{ var Select_7 = "<option value=\"7\">7</option>"; };
if(JN_StatusBoxAnz == 8){ var Select_8 = "<option selected value=\"8\">8</option>"; } else{ var Select_8 = "<option value=\"8\">8</option>"; };
if(JN_StatusBoxAnz == 9){ var Select_9 = "<option selected value=\"9\">9</option>"; } else{ var Select_9 = "<option value=\"9\">9</option>"; };
if(JN_StatusBoxAnz == 10){ var Select_10 = "<option selected value=\"10\">10</option>"; } else{ var Select_10 = "<option value=\"10\">10</option>"; };

var JN_O_StatusSelect = "<select name=\"JN_StatusBoxAnzIn\">"+Select_1+Select_2+Select_3+Select_4+Select_5+Select_6+Select_7+Select_8+Select_9+Select_10+"</select>";
if (JN_StatusBox == "true") {
var JN_O_StatusBoxAnz = "<a class=\"set_hover_cursor\"><span class=\"icEdit \">&nbsp;</span><span style=\"color:#ffffff;\">Anzahl: </span>"+JN_O_StatusSelect+" <span id=\"Hilfe_StatusBox\" class=\"icHelp\">&nbsp;</span></a>";
} else {
var JN_O_StatusBoxAnz = "<a class=\"set_hover_cursor\"><span class=\"icEdit \">&nbsp;</span><span style=\"color:#000000;\">Anzahl: </span>"+JN_O_StatusSelect+" <span id=\"Hilfe_StatusBox\" class=\"icHelp\">&nbsp;</span></a>";
}
// option abo
if (JN_Abo == "true")
{var JN_O_Abo = "<a class=\"set_hover_cursor\"><input name=\"JN_AboIn\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icAbos\">&nbsp;</span><span style=\"color:#ffffff;\">Abos</span></a>";}
else{var JN_O_Abo = "<a class=\"set_hover_cursor\"><input name=\"JN_AboIn\" type=\"checkbox\" /> <span class=\"icAbos\">&nbsp;</span><span style=\"color:#000000;\">Abos</span></a>";};
// option Fav
if (JN_Fav == "true")
{var JN_O_Fav = "<a class=\"set_hover_cursor\"><input name=\"JN_FavIn\" type=\"checkbox\"  checked=\"checked\" /> <span class=\"icBookmarkActive\">&nbsp;</span><span style=\"color:#ffffff;\">Favoriten</span></a>";}
else{var JN_O_Fav = "<a class=\"set_hover_cursor\"><input name=\"JN_FavIn\" type=\"checkbox\" /> <span class=\"icBookmarkActive\">&nbsp;</span><span style=\"color:#000000;\">Favoriten</span></a>";};

document.getElementById("mehr_block_div").innerHTML = ""+ JN_O_Statuswechsel + JN_O_StatusBox + JN_O_StatusBoxAnz + JN_O_Abo + JN_O_Fav +"";

document.getElementById('Hilfe_StatusBox').addEventListener('click', function Hilfe_StatusBox () {
alert('1 = Dropdownbox\n2-10 = Auswahlliste')
},false);

// klick auf speichern
document.getElementById("me_set_save").addEventListener("click", function save_set () {

// status
if (document.getElementsByName('JN_StatuswechselIn')[0].checked == true)
{GM_setValue("JN_StatuswechselIn" + UserId , "true");}else{GM_setValue("JN_StatuswechselIn" + UserId , "false");}
// statusbox
if (document.getElementsByName('JN_StatusBoxIn')[0].checked == true)
{GM_setValue("JN_StatusBoxIn" + UserId , "true");}else{GM_setValue("JN_StatusBoxIn" + UserId , "false");}
// anzahl eintreage
GM_setValue("JN_StatusBoxAnzIn" + UserId , document.getElementsByName('JN_StatusBoxAnzIn')[0].value);
// abo
if (document.getElementsByName('JN_AboIn')[0].checked == true)
{GM_setValue("JN_AboIn" + UserId , "true");}else{GM_setValue("JN_AboIn" + UserId , "false");}
// fav
if (document.getElementsByName('JN_FavIn')[0].checked == true)
{GM_setValue("JN_FavIn" + UserId , "true");}else{GM_setValue("JN_FavIn" + UserId , "false");}

document.getElementById("mehr_block_div").innerHTML = "<a class=\"set_hover_cursor\" style=\"background-color:#ffffff; color:green; font-weight:bold;\">Gespeichert</a>";

window.setTimeout(refresh, 3000);
function refresh() { location.reload() }

},false);

// nach abbrechen klick neuladen (3 sek)
document.getElementById("me_set_cancel").addEventListener("click", function close_set () {
document.getElementById("mehr_block_div").innerHTML = "<a class=\"set_hover_cursor\" style=\"background-color:#ffffff; color:red; font-weight:bold;\">Abgebrochen</a>";
window.setTimeout(refresh, 3000);
function refresh() { location.reload() }
},false);

},false);

}


// abfrage function
function HTTP_REQ(adresse,method,callback,id1,id2,id3,id4,id5,id6,id7,id8,id9) {
   GM_xmlhttpRequest({
      url:adresse,
      method:method,
      onload: function (responseDetails) {
         callback(responseDetails,id1,id2,id3,id4,id5,id6,id7,id8,id9);
      }
   });
}

function auto_reload(Name) {

var url = "http://www.jappy.de/";

timeout(Name);

function timeout(Name) {

	
	
   var zeit_max = 10;
   var zeit = Math.floor(Math.random()*zeit_max);
   var zeit = zeit - 1;
   if(zeit < 0) zeit = 1;
   
   GM_log('JappyRandomReload Log #Zufallszeit Generiert ('+zeit+' Minuten) ...#');

   //window.setTimeout (adresse, zeit*60000);
   window.setTimeout (adresse, 3000);
   
}

function adresse(Name) {

	GM_log('JappyRandomReload Log #Weahle Zufaelligen Link ...#');

   var seiten = new Array();
   seiten[0] = "";
   seiten[1] = "user/"+Name+"";
   seiten[2] = "user/"+Name+"/details";
   seiten[3] = "myjappy/friends";
   seiten[4] = "myjappy/rank";
   seiten[5] = "myjappy/experience";
   seiten[6] = "myjappy/transactions";
   seiten[7] = "infos/games";
   seiten[8] = "myjappy/friends/birthday";
   seiten[9] = "com/";

   var zaehler = seiten.length;
   var zufall = Math.floor(Math.random()*zaehler);
   zufall = zufall - 1;
   if(zufall < 0) zufall = 0;

   var random_url = url+seiten[zufall];
   
   GM_log('JappyRandomReload Log #Link ausgewaehlt ('+random_url+') ...#');
   
   document.location.href = random_url;
   
};

}