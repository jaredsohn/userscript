// ==UserScript==
// @name			     Jappy Navigator - Beta
// @namespace		   Autor: OMG
// @namespace		   http://www.jappy.de/user/OMG
// @description	   Fuegt ein alternatives Navigationsmenue ein
// @version			   2.2
// @include			   *.jappy.*
// @exclude		     *.jappy.*/chat/
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
if (url.indexOf("jappy.tv")>=0) {
var MainUrl = "http://www.jappy.tv"
}

// angaben fuer Updatefunktion
var CurrentScriptVersion = '2.2';
var xmlurl = 'http://userscripts.org/scripts/show/75519';
var downloadurl = 'http://userscripts.org/scripts/source/75519.user.js';

// http://www.jappy.de/user/DEIN-USER-NAME/gifts/donate/category/0

HTTP_REQ(xmlurl,'GET',update_pruefung,CurrentScriptVersion,xmlurl,downloadurl);
function update_pruefung(resp1,CurrentScriptVersion,xmlurl,downloadurl) {
	try{
	var neueversion = resp1.responseText.split('<p>Malacla:')[1].split('</p>')[0];
	}
	catch(err){
	var neueversion = ""+CurrentScriptVersion+""
	}
	HTTP_REQ(url,'GET',jappy_infos,neueversion,CurrentScriptVersion,xmlurl,downloadurl);
}

function jappy_infos(resp2,neueversion,CurrentScriptVersion,xmlurl,downloadurl) {
	var Name = resp2.responseText.split('User.nickname = "')[1].split('"')[0];
	var kontostand = resp2.responseText.split('User.credits = "')[1].split('";')[0];
	var ImgServerUrl = resp2.responseText.split('Jpy.picurl = "')[1].split('";')[0];
	var UserRang = resp2.responseText.split('User.rank = "')[1].split('";')[0];
	var userNewMail = resp2.responseText.split('User.newMails = ')[1].split(';')[0];
	
	create_menue(Name,kontostand,ImgServerUrl,UserRang,userNewMail,neueversion,CurrentScriptVersion,xmlurl,downloadurl);
}			

function create_menue(Name,kontostand,ImgServerUrl,UserRang,userNewMail,neueversion,CurrentScriptVersion,xmlurl,downloadurl) {

// css erstellen
addGlobalStyle('#acc {width:160px; list-style:none; float:left;}')
addGlobalStyle('.main_point {width:154px; padding:6px 0px 8px 6px; font-weight:bold; font-size:12px; margin-top:8px; cursor:pointer; background:white; z-index:10000;}')
addGlobalStyle('.acc-content {width:160px; border-top:none; background:#3b89cb;}')
addGlobalStyle('.acc-content a {text-decoration:none; color:white; display:block; padding:3px 0px 3px 15px;}')
addGlobalStyle('.acc-content a:hover {text-decoration:none; color:white; display:block; background:#3980be;}')
addGlobalStyle('#Hilfe_Fixierung, #Hilfe_StatusBox { cursor:pointer; color:blue; }')
// css fuer suchfeld
addGlobalStyle('#rs input:focus.enter1 { background:#fffee0;border:2px solid #ebdeb9 }')
addGlobalStyle('#rs input.active { border:1px solid #DDDDDD }')
addGlobalStyle('#rs .enter1 { height:23px;padding:3px 0 2px 5px;margin:0;float:left;font-size:12px;width:130px;border:1px solid #e5e5e5;background:#FFFFFF;-moz-border-radius:5px }')
// css fuer suchbutton
addGlobalStyle('.find1 {background:url('+ImgServerUrl+'/i/icG10.gif) no-repeat;-moz-border-radius:5px;background-color:#ebebeb;background-position:6px -1138px;border:1px solid #dedede;height:20px;margin-top:3px;margin-bottom:5px;width:130px;cursor:pointer}')
// css fuer select-box (statuswechsel)
addGlobalStyle('.JappyStatusWechsel { width:130px; background:#3b89cb; color:#FFFFFF; border:1px dotted #FFFFFF; -moz-border-radius:5px; } ')
// css fuer updatelink
addGlobalStyle('a#JappyUpdate:hover { cursor:pointer; }')
addGlobalStyle('#JappyUpdate img { position:relative; top:3px; }')
// css support
addGlobalStyle('#jpy_n_support { padding:4px 0px 7px 10px; background:#3b89cb; height:20px; }')
addGlobalStyle('#cjsb { cursor:move; }')
addGlobalStyle('a.jn_sb_ic { padding:3px; }')
addGlobalStyle('a.jn_sb_ic:hover { background:#ffffff; }')

// icons in auswahlliste
var stat_img = "before { content:url(http://suspended.bplaced.net/status/";
addGlobalStyle('option[id=\"1\"]:'+stat_img+'/st_online.gif); }')
addGlobalStyle('option[id=\"2\"]:'+stat_img+'/st_abwesend.gif); }')
addGlobalStyle('option[id=\"3\"]:'+stat_img+'/st_kurzweg.gif); }')
addGlobalStyle('option[id=\"4\"]:'+stat_img+'/st_nichtstoeren.gif); }')
addGlobalStyle('option[id=\"5\"]:'+stat_img+'/st_profilarbeiten.gif); }')
addGlobalStyle('option[id=\"6\"]:'+stat_img+'/st_gutelaune.gif); }')
addGlobalStyle('option[id=\"7\"]:'+stat_img+'/st_down.gif); }')
addGlobalStyle('option[id=\"8\"]:'+stat_img+'/st_traurig.gif); }')
addGlobalStyle('option[id=\"9\"]:'+stat_img+'/st_love.gif); }')
addGlobalStyle('option[id=\"10\"]:'+stat_img+'/st_herzschmerz.gif); }')

addGlobalStyle('option[id=\"11\"]:'+stat_img+'/st_groovin.gif); }')
addGlobalStyle('option[id=\"12\"]:'+stat_img+'/st_party.gif); }')
addGlobalStyle('option[id=\"13\"]:'+stat_img+'/st_langweilig.gif); }')
addGlobalStyle('option[id=\"14\"]:'+stat_img+'/st_krank.gif); }')
addGlobalStyle('option[id=\"15\"]:'+stat_img+'/st_regenbogen.gif); }')
addGlobalStyle('option[id=\"16\"]:'+stat_img+'/st_stress.gif); }')
addGlobalStyle('option[id=\"17\"]:'+stat_img+'/st_gleichweg.gif); }')
addGlobalStyle('option[id=\"18\"]:'+stat_img+'/st_daheim.gif); }')
addGlobalStyle('option[id=\"19\"]:'+stat_img+'/st_arbeit.gif); }')
addGlobalStyle('option[id=\"20\"]:'+stat_img+'/st_studieren.gif); }')

addGlobalStyle('option[id=\"21\"]:'+stat_img+'/st_schreiben.gif); }')
addGlobalStyle('option[id=\"22\"]:'+stat_img+'/st_lesen.gif); }')
addGlobalStyle('option[id=\"23\"]:'+stat_img+'/st_neuesbild.gif); }')
addGlobalStyle('option[id=\"24\"]:'+stat_img+'/st_kaffee.gif); }')
addGlobalStyle('option[id=\"25\"]:'+stat_img+'/st_sauer.gif); }')
addGlobalStyle('option[id=\"26\"]:'+stat_img+'/st_gereizt.gif); }')
addGlobalStyle('option[id=\"27\"]:'+stat_img+'/st_inetcafe.gif); }')
addGlobalStyle('option[id=\"28\"]:'+stat_img+'/st_fernsehen.gif); }')
addGlobalStyle('option[id=\"29\"]:'+stat_img+'/st_essen.gif); }')
addGlobalStyle('option[id=\"30\"]:'+stat_img+'/st_pause.gif); }')

addGlobalStyle('option[id=\"31\"]:'+stat_img+'/st_spielen.gif); }')
addGlobalStyle('option[id=\"32\"]:'+stat_img+'/st_planschen.gif); }')
addGlobalStyle('option[id=\"33\"]:'+stat_img+'/st_muede.gif); }')
addGlobalStyle('option[id=\"34\"]:'+stat_img+'/st_telefon.gif); }')
addGlobalStyle('option[id=\"35\"]:'+stat_img+'/st_schlafen.gif); }')
addGlobalStyle('option[id=\"36\"]:'+stat_img+'/st_besuch.gif); }')
addGlobalStyle('option[id=\"37\"]:'+stat_img+'/st_sporteln.gif); }')
addGlobalStyle('option[id=\"38\"]:'+stat_img+'/st_shoppen.gif); }')
addGlobalStyle('option[id=\"39\"]:'+stat_img+'/st_wc.gif); }')
addGlobalStyle('option[id=\"40\"]:'+stat_img+'/st_gassi.gif); }')

addGlobalStyle('option[id=\"41\"]:'+stat_img+'/st_sonnen.gif); }')
addGlobalStyle('option[id=\"42\"]:'+stat_img+'/st_urlaub.gif); }')
addGlobalStyle('option[id=\"43\"]:'+stat_img+'/st_hausarbeit.gif); }')
addGlobalStyle('option[id=\"44\"]:'+stat_img+'/st_rauchen.gif); }')
addGlobalStyle('option[id=\"45\"]:'+stat_img+'/st_garten.gif); }')
addGlobalStyle('option[id=\"46\"]:'+stat_img+'/st_chillen.gif); }')
addGlobalStyle('option[id=\"47\"]:'+stat_img+'/st_stylen.gif); }')
addGlobalStyle('option[id=\"48\"]:'+stat_img+'/st_handarbeit.gif); }')
addGlobalStyle('option[id=\"49\"]:'+stat_img+'/st_kochen.gif); }')
addGlobalStyle('option[id=\"50\"]:'+stat_img+'/st_nachdenklich.gif); }')
addGlobalStyle('option[id=\"51\"]:'+stat_img+'/st_gluecklich.gif); }')
addGlobalStyle('option[id=\"52\"]:'+stat_img+'/st_surfen.gif); }')
addGlobalStyle('option[id=\"53\"]:'+stat_img+'/st_verwirrt.gif); }')
		
// angaben fuer statuswechsel
var status1 = "<option id=\"1\" value=\"1\"> Online</option>";
var status19 = "<option id=\"19\" value=\"19\"> Arbeiten</option>";
var status2 = "<option id=\"2\" value=\"2\"> Abwesend</option>";
var status3 = "<option id=\"3\" value=\"3\"> Kurz weg</option>";
var status4 = "<option id=\"4\" value=\"4\"> Nicht st&ouml;ren!</option>";
var status5 = "<option id=\"5\" value=\"5\"> Profilarbeiten</option>";
var status17 = "<option id=\"17\" value=\"17\"> Gleich weg</option>";
var status18 = "<option id=\"18\" value=\"18\"> Bin daheim</option>";
var status23 = "<option id=\"23\" value=\"23\"> Neues Bild!</option>";
var status27 = "<option id=\"27\" value=\"27\"> Im I-Netcafe</option>";
var status33 = "<option id=\"33\" value=\"33\"> Bin M&uuml;de</option>";
var status35 = "<option id=\"35\" value=\"35\"> Schlafen</option>";
var status36 = "<option id=\"36\" value=\"36\"> Habe Besuch</option>";
var status42 = "<option id=\"42\" value=\"42\"> Urlaub</option>";
var status_option_1 = ""+status1+status19+status2+status3+status4+status5+status17+status18+status23+status27+status33+status35+status36+status42+"";

var status6 = "<option id=\"6\" value=\"6\"> Gute Laune</option>";
var status7 = "<option id=\"7\" value=\"7\"> Bin down</option>";
var status8 = "<option id=\"8\" value=\"8\"> Bin traurig</option>";
var status9 = "<option id=\"9\" value=\"9\"> Love</option>";
var status10 = "<option id=\"10\" value=\"10\"> Herzschmerz</option>";
var status11 = "<option id=\"11\" value=\"11\"> Groovin</option>";
var status12 = "<option id=\"12\" value=\"12\"> Party!</option>";
var status13 = "<option id=\"13\" value=\"13\"> Langweilig!</option>";
var status14 = "<option id=\"14\" value=\"14\"> Krank</option>";
var status15 = "<option id=\"15\" value=\"15\"> Regenbogen</option>";
var status16 = "<option id=\"16\" value=\"16\"> Stress</option>";
var status25 = "<option id=\"25\" value=\"25\"> Sauer</option>";
var status26 = "<option id=\"26\" value=\"26\"> Gereizt</option>";
var status50 = "<option id=\"50\" value=\"50\"> Nachdenklich</option>";
var status51 = "<option id=\"51\" value=\"51\"> Gl&uuml;cklich</option>";
var status_option_2 = ""+status6+status7+status8+status9+status10+status11+status12+status13+status14+status15+status16+status25+status26+status50+status51+"";

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
var status52 = "<option id=\"52\" value=\"52\"> Mobil Surfen</option>";
var status53 = "<option id=\"53\" value=\"53\"> Verwirrt</option>";
var status_option_3 = ""+status20+status21+status22+status24+status28+status29+status30+status31+status32+status34+status37+status38+status39+status40+status41+status43+status44+status45+status46+status47+status48+status49+status52+status53+"";


var overview_oc = GM_getValue('overview_oc', true);
var myjpy_oc = GM_getValue('myjpy_oc', true);
var mehr_oc = GM_getValue('mehr_oc', true);
var info_oc = GM_getValue('info_oc', true);


// css klapfunktion mein-jappy
if (overview_oc == true) {
addGlobalStyle('#overview_block_div { display:block; }')
var ov_class = "spClosed";
} else {
addGlobalStyle('#overview_block_div { display:none; }')
var ov_class = "spOpen";
}

// css klapfunktion mein-jappy
if (myjpy_oc == true) {
addGlobalStyle('#myjpy_block_div { display:block; }')
var my_class = "spClosed";
} else {
addGlobalStyle('#myjpy_block_div { display:none; }')
var my_class = "spOpen";
}

// css klapfunktion mehr-block
if (mehr_oc == true) {
addGlobalStyle('#mehr_block_div { display:block; }')
var me_class = "spClosed";
} else {
addGlobalStyle('#mehr_block_div { display:none; }')
var me_class = "spOpen";
}

// css klapfunktion info-block
if (info_oc == true) {
addGlobalStyle('#info_block_div { display:block; }')
var in_class = "spClosed";
} else {
addGlobalStyle('#info_block_div { display:none; }')
var in_class = "spOpen";
}

// menuestandart
// Menuefixierung (fixed = feststehend / absolute = scrollbar)
var JN_AbsoluteFixed = GM_getValue("JN_AbsoluteFixedIn");
if (JN_AbsoluteFixed == null){JN_AbsoluteFixed = "absolute";};

// standartanzeige menuepunkte
// Uebersicht
// Uebersichtblock anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_UebersichtBlock = GM_getValue("JN_UebersichtBlockIn");
if (JN_UebersichtBlock == null){JN_UebersichtBlock = "true";};
// Startseite anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Startseite = GM_getValue("JN_StartseiteIn");
if (JN_Startseite == null){JN_Startseite = "true";};
// Coms anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Coms = GM_getValue("JN_ComsIn");
if (JN_Coms == null){JN_Coms = "false";};
// Event anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Event = GM_getValue("JN_EventIn");
if (JN_Event == null){JN_Event = "true";};
// Flog anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Flog = GM_getValue("JN_FlogIn");
if (JN_Flog == null){JN_Flog = "false";};
// Around anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Around = GM_getValue("JN_AroundIn");
if (JN_Around == null){JN_Around = "true";};

// Mein Jappy
// Mein Jappy anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_MyJappyBlock = GM_getValue("JN_MyJappyBlockIn");
if (JN_MyJappyBlock == null){JN_MyJappyBlock = "true";};
// Profil anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Profil = GM_getValue("JN_ProfilIn");
if (JN_Profil == null){JN_Profil = "true";};
// Mail anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Mail = GM_getValue("JN_MailIn");
if (JN_Mail == null){JN_Mail = "true";};
// Termin anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Termin = GM_getValue("JN_TerminIn");
if (JN_Termin == null){JN_Termin = "false";};
// Freunde anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Freunde = GM_getValue("JN_FreundeIn");
if (JN_Freunde == null){JN_Freunde = "false";};
// Geburtstag anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Geburtstag = GM_getValue("JN_GeburtstagIn");
if (JN_Geburtstag == null){JN_Geburtstag = "true";};
// Haustier anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Haustier = GM_getValue("JN_HaustierIn");
if (JN_Haustier == null){JN_Haustier = "false";};

// haustier 1 anzeigen & adresse, name
var haustier_1 = GM_getValue('haustier_1', false);
var haustier_1_url = GM_getValue('haustier_1_url', '/user/'+Name+'/pet/home/');
var haustier_1_name = GM_getValue('haustier_1_name', 'Stall');
// haustier 2 anzeigen & adresse, name
var haustier_2 = GM_getValue('haustier_2', false);
var haustier_2_url = GM_getValue('haustier_2_url', '/user/'+Name+'/pet/home/');
var haustier_2_name = GM_getValue('haustier_2_name', 'Stall');

// Mehr
// Mehr anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_MooreBlock = GM_getValue("JN_MooreBlockIn");
if (JN_MooreBlock == null){JN_MooreBlock = "true";};
// Statuswechsel anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Statuswechsel = GM_getValue("JN_StatuswechselIn");
if (JN_Statuswechsel == null){JN_Statuswechsel = "false";};
// StatusBox anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_StatusBox = GM_getValue("JN_StatusBoxIn");
if (JN_StatusBox == null){JN_StatusBox = "true";};
// Anzahl auswahl statusbox (5)
var JN_StatusBoxAnz = GM_getValue("JN_StatusBoxAnzIn");
if (JN_StatusBoxAnz == null){JN_StatusBoxAnz = "5";};
// Forum anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Forum = GM_getValue("JN_ForumIn");
if (JN_Forum == null){JN_Forum = "true";};
// Abo anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Abo = GM_getValue("JN_AboIn");
if (JN_Abo == null){JN_Abo = "false";};
// Chat anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Chat = GM_getValue("JN_ChatIn");
if (JN_Chat == null){JN_Chat = "true";};
// Einstellungen anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Einst = GM_getValue("JN_EinstIn");
if (JN_Einst == null){JN_Einst = "true";};
// Suche anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Suche = GM_getValue("JN_SucheIn");
if (JN_Suche == null){JN_Suche = "false";};

// Info
// Info anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_InfoBlock = GM_getValue("JN_InfoBlockIn");
if (JN_InfoBlock == null){JN_InfoBlock = "true";};
// Rang anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Rang = GM_getValue("JN_RangIn");
if (JN_Rang == null){JN_Rang = "true";};
// Konto anzeigen (true = anzeigen | false = nicht anzeigen)
var JN_Konto = GM_getValue("JN_KontoIn");
if (JN_Konto == null){JN_Konto = "true";};

// funktionsangaben
// mailsound lautstaerke (100)
var soundVolume = GM_getValue("soundVolumeIn");
if (soundVolume == null){soundVolume = "100";};
// mailcheck an/aus (true = an | false = aus)
var JN_MailCheck = GM_getValue("JN_MailCheckIn");
if (JN_MailCheck == null){JN_MailCheck = "false";};

// besucherbilder funktion (true = anzeigen | false = nicht anzeigen)
var JN_besucherbilder = GM_getValue("JN_besucherbilderIn");
if (JN_besucherbilder == null){JN_besucherbilder = "false";};

// mailcheck
if (JN_MailCheck == "true"){

if (userNewMail == 0)
{var newMail = "";}
else
{var newMail = "<object data=\"http://bazie.spacequadrat.de/jappy_sound/email_01.wav\"  type=\"application/x-ms-wmp\"><param name=\"hidden\" value=\"true\"><param name=\"loop\" value=\"false\"><param name=\"autostart\" value=\"true\"><param name=\"volume\" value=\"50\"></object>";}

}else
{var newMail = "";}

// menuepunkte erstellen
// start linkkette1
if (JN_UebersichtBlock == "true") {
var CJappyOverview = "<div class=\"main_point\" id=\"overview_block\">&Uuml;bersicht<span id=\"ov_span\" class=\""+ov_class+"\">&nbsp;</span></div>";
} else {
var CJappyOverview = "<div class=\"main_point\" id=\"overview_block\" style=\"display:none;\">&Uuml;bersicht</div>";
}
// Startseite
if (JN_Startseite == "true")
{var CJappyStart = "<a href=\""+MainUrl+"/\" title=\"Startseite\"><span class=\"icJpy\">&nbsp;</span> Startseite</a>";}
else{var CJappyStart = "";};
// Coms
if (JN_Coms == "true")
{var CJappyCom = "<a href=\"/com/\" title=\"Coms\"><span class=\"icComs\">&nbsp;<span> Coms</a>";}
else{var CJappyCom = "";};
// Event
if (JN_Event == "true")
{var CJappyEvent = "<a href=\"/event/\" title=\"Events\"><span class=\"icEvents\">&nbsp;</span> Events</a>";}
else{var CJappyEvent = "";};
// Flog
if (JN_Flog == "true")
{var CJappyFlog = "<a href=\"/flog/\" title=\"Flogs\"><span class=\"icFlog\">&nbsp;</span> Flogs</a>";}
else{var CJappyFlog = "";};
// Around
if (JN_Around == "true")
{var CJappyAround = "<a href=\"/start/feed/\" title=\"Rund um Mich\"><span class=\"icRum\">&nbsp;</span> Rund um Mich</a>";}
else{var CJappyAround = "";};
// ende linkkette1

// start linkkette2
if (JN_MyJappyBlock == "true") {
var CJappyMyJappy = "<div class=\"main_point\" id=\"myjpy_block\">Mein Jappy<span id=\"my_span\" class=\""+my_class+"\">&nbsp;</span></div>";
} else {
var CJappyMyJappy = "<div class=\"main_point\" id=\"myjpy_block\" style=\"display:none;\">Mein Jappy</div>";
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
{var CJappyBirthday = "<a href=\"/myjappy/friends/0?displayStyle=3\" title=\"Geburtstage\"><span class=\"icBirthday\">&nbsp;</span> Geburtstage</a>";}
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
// ende linkkette2

// start linkkette3
if (JN_MooreBlock == "true") {
var CJappyMore = "<div class=\"main_point\" id=\"mehr_block\">Mehr<span id=\"me_span\" class=\""+me_class+"\">&nbsp;</span></div>";
} else {
var CJappyMore = "<div class=\"main_point\" id=\"mehr_block\" style=\"display:none;\">Mehr</div>";
}
// statuswechsel
if (JN_Statuswechsel == "true")
{var CJappyStatuswechsel = "<a href=\"/infos/statusSelect\"><span class=\"icHelp\">&nbsp;</span> Statusauswahl</a>";}
else{var CJappyStatuswechsel = "";};
// statusbox
if (JN_StatusBox == "true")
{var CJappyStatusAuswahl = "<a><form name=\"statuswechsel\"><select size=\""+JN_StatusBoxAnz+"\" class=\"JappyStatusWechsel\" onChange=\"OnlineStatus.setStatus(this.value)\" name=\"statuswechsel\">"+status_option_1+status_option_2+status_option_3+"</select></form></a>";}
else{var CJappyStatusAuswahl = "";};
// forum
if (JN_Forum == "true")
{var CJappyForum = "<a href=\"/forum/\" title=\"Forum\"><span class=\"icForumTopic\">&nbsp;</span>Forum</a>";}
else{var CJappyForum = "";};
// forum
if (JN_Abo == "true")
{var CJappyAbo = "<a href=\"/myjappy/observer/\" title=\"Abos\"><span class=\"icAbos\">&nbsp;</span>Abos</a>";}
else{var CJappyAbo = "";};
// Chat
if (JN_Chat == "true")
{var CJappyChat = "<a href=\"/chat/\" title=\"Chat\" onclick=\"Twaddler.enterMultiUserChat(User.id); return false;\" class=\"cp\"><span class=\"icChat fs14\">&nbsp;</span> Chat</a>";}
else{var CJappyChat = "";};
// forum
if (JN_Einst == "true")
{var CJappySettings = "<a href=\"/settings\" title=\"Einstellungen\"><span class=\"icSt5\">&nbsp;</span> Einstellungen</a>";}
else{var CJappySettings = "";};
// suche
if (JN_Suche == "true"){
var CJappySearch1 = "<a><form method=\"get\" action=\"/search\" accept-charset=\"UTF-8\"><input name=\"name\" class=\"enter1\" value=\"\" title=\"Mitgliedsname\" alt=\"Name\"></a>";
var CJappySearch2 = "<a><input value=\"Suchen\" class=\"find1\" type=\"submit\"></form></a>";
}else{
var CJappySearch1 = "";
var CJappySearch2 = "";
};
// ende linkkette3

// start linkkette4
if (JN_InfoBlock == "true") {
var CJappyInfo = "<div class=\"main_point\" id=\"info_block\">Infos<span id=\"in_span\" class=\""+in_class+"\">&nbsp;</span></div>";
} else {
var CJappyInfo = "<div class=\"main_point\" id=\"info_block\" style=\"display:none;\">Infos</div>";
}
// rang
if (JN_Rang == "true")
{var CJappyExp = "<a href=\"/myjappy/experience/\" title=\"Erfahrungsverlauf\"><b><span class=\"icXp\">&nbsp;</span> Rang & Co. <img src=\""+ImgServerUrl+"/i/r/"+UserRang+".gif\"/></a>";}
else{var CJappyExp = "";};
// rang
if (JN_Konto == "true")
{var CJappyKonto = "<a href=\"/shop/\" title=\"Credits ausgeben\"><span class=\"icCredit fwB\">&nbsp;</span> Kontostand:<b> "+kontostand+"</b></a>";}
else{var CJappyKonto = "";};
// ende linkkette4

// start linkkette 0
var CJappySupport = "<div id=\"cjsb\" class=\"main_point\">Jappy-Navigator "+CurrentScriptVersion+"</div>";

var CJappyNaviCom = "<a class=\"jn_sb_ic\" id=\"cjnc\" href=\"/com/245032\" target=\"_self\"><span class=\"icComs\"></span></a>";

var CJappyMailto = "<a class=\"jn_sb_ic\" id=\"cjmt\" href=\"/mailbox/new?to=OMG\" onclick=\"MessageSystem.message.compose.start(null, 'OMG');return false\"><span class=\"icMailNew\"></span></a>";

var CJappyGorgon = "<a class=\"jn_sb_ic\" id=\"cjpg\" href=\"/user/OMG/\"><span class=\"icBuddyCode\"></span></a>";

var CJappyHome = "<a class=\"jn_sb_ic\" id=\"cjhp\" href=\"http://crazyfont.net\" target=\"_blank\"><span class=\"icSt18\"></span></a>";

var test_1 = "<span id=\"overview_block_span\"></span>"
// updatelink
if (CurrentScriptVersion != neueversion){
var CJappyUpdate = "<a class=\"jn_sb_ic\" id=\"JappyUpdate\"><img src=\"http://suspended.bplaced.net/status/update.png\"></a>";
}else{
var CJappyUpdate = "<a id=\"JappyUpdate\" style=\"display:none;\"></a>";
}
// ende linkkette 0

// menuepunkte zu linkketten zusammenfassen
if (JN_UebersichtBlock == "true")
{var Linkkette1 = "<li>"+CJappyOverview+"<div class=\"acc-content\" id=\"overview_block_div\">"+ newMail + CJappyStart + CJappyCom + CJappyEvent + CJappyFlog + CJappyAround +"</div></li>"}
else{var Linkkette1 = CJappyOverview;};

if (JN_MyJappyBlock == "true")
{var Linkkette2 = "<li>"+CJappyMyJappy+"<div class=\"acc-content\" id=\"myjpy_block_div\">" + CJappyProfil + CJappyMail + CJappyKalender + CJappyFriends + CJappyBirthday + CJappyHaustier + CJappyPet_1 + CJappyPet_2 +"</div></li>"}
else{var Linkkette2 = CJappyMyJappy;};

if (JN_MooreBlock == "true")
{var Linkkette3 = "<li>"+CJappyMore+"<div class=\"acc-content\" id=\"mehr_block_div\">" + CJappyStatuswechsel + CJappyStatusAuswahl + CJappyForum + CJappyAbo + CJappyChat + CJappySettings + CJappySearch1 + CJappySearch2 +"</div></li>"}
else{var Linkkette3 = CJappyMore;};

if (JN_InfoBlock == "true")
{var Linkkette4 = "<li>"+CJappyInfo+"<div class=\"acc-content\" id=\"info_block_div\">" + CJappyExp + CJappyKonto +"</div></li>"}
else{var Linkkette4 = CJappyInfo;};

var Linkkette0 = ""+CJappySupport+"<div id=\"jpy_n_support\">"+CJappyNaviCom+" "+CJappyMailto+" "+CJappyGorgon+" "+CJappyHome+" "+CJappyUpdate+"</div>"

// menue bilden
document.getElementById("rs").innerHTML += "<div id=\"acc\" style=\"position:"+JN_AbsoluteFixed+"; top:"+JN_TopBottomPx+"px; left:"+JN_RightLeftPx+"px;\">"+ Linkkette0 + Linkkette1 + Linkkette2 + Linkkette3 + Linkkette4 +"</div>";

// meldung bei klick auf update
if (CurrentScriptVersion != neueversion){

document.getElementById("JappyUpdate").addEventListener("click", function Oeffnen () {
updateinstall = window.confirm ("Updateversion: "+neueversion+"\nInfos siehe Scripthomepage\n\nUpdate Installieren?");

// bei ok klick installieren
if (updateinstall == true){
self.location.href = downloadurl
// ansonnsten nicht
}else{}
},false);

}else{}

// optionsmenue auf settings-seite
if(window.location.href == ""+MainUrl+"/settings"){
var JNOptionen1Kopf = "<tr><td colspan=\"3\" class=\"head\">Jappy-Navigator Einstellungen</td></tr>";
var JNOptionen1Link = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td width=\"350\"><a style=\"cursor:pointer;\" id=\"JN_Settings_Open\" class=\"setting\">Zu den Einstellungen</a></td><td>&nbsp;</td></tr>";
document.getElementById("se").innerHTML += ""+JNOptionen1Kopf+JNOptionen1Link+"";

// eigentlichens optionsmenue nach klick aufrufen      
document.getElementById("JN_Settings_Open").addEventListener('click', function JN_Settings_Open () {

// oben in px
var JN_O_TopBottomPx = "<input id=\"jn_pvo\" name=\"JN_TopBottomPxIn\" size=\"6\" type=\"text\" value=\""+JN_TopBottomPx+"\" />";

// links in px
var JN_O_RightLeftPx = "<input id=\"jn_pvl\" name=\"JN_RightLeftPxIn\" type=\"text\" size=\"6\" value=\""+JN_RightLeftPx+"\" />";

if(JN_AbsoluteFixed == "absolute"){
var Select_scroll = "<option selected value=\"absolute\">Scrollbar</option>";
var Select_fix = "<option value=\"fixed\">Fixiert</option>";
}else{
var Select_scroll = "<option value=\"absolute\">Scrollbar</option>";
var Select_fix = "<option selected value=\"fixed\">Fixiert</option>";
};
var JN_O_AbsoluteFixed = "<select name=\"JN_AbsoluteFixedIn\">"+Select_scroll+Select_fix+"</select>";

var JN_Option_Ausrichtung = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">Vertikal: "+JN_O_TopBottomPx+" Pixel von Oben | Horizontal: "+JN_O_RightLeftPx+" Pixel von Links</td></tr>";
var JN_Option_Fixierung = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">Men&uuml;fixierung: "+JN_O_AbsoluteFixed+" <span id=\"Hilfe_Fixierung\" class=\"icHelp\">Info</span></td></tr>";

// abschnitt zusammenfassen
var JN_MenuePunkt_Ausrichtung = "<tr class=\"line\"><td colspan=\"3\" class=\"head\" width=\"100%\">Ausrichtung &#38; Fixierung des Men&uuml;s:</td></tr>";
var JN_MenueBlock_Ausrichtung = ""+JN_MenuePunkt_Ausrichtung+JN_Option_Ausrichtung+JN_Option_Fixierung+"";

// optionsmenue menuepunkte ein-/ausblenden
// option uebersichtblock anzeigen ja/nein
if (JN_UebersichtBlock == "true")
{var JN_O_UebersichtBlock = "<input name=\"JN_UebersichtBlockIn\" type=\"checkbox\"  checked=\"checked\" />";}
else{var JN_O_UebersichtBlock = "<input name=\"JN_UebersichtBlockIn\" type=\"checkbox\" />";};
// option Startseite
if (JN_Startseite == "true")
{var JN_O_Startseite = "<input name=\"JN_StartseiteIn\" type=\"checkbox\"  checked=\"checked\" /><span class=\"icJpy\" style=\"color:#000000;\">Startseite</span>";}
else{var JN_O_Startseite = "<input name=\"JN_StartseiteIn\" type=\"checkbox\" /><span class=\"icJpy\" style=\"color:#999999;\">Startseite</span>";};
// option Coms
if (JN_Coms == "true")
{var JN_O_Coms = "<input name=\"JN_ComsIn\" type=\"checkbox\"  checked=\"checked\" /><span class=\"icComs\" style=\"color:#000000;\">Coms</span>";}
else{var JN_O_Coms = "<input name=\"JN_ComsIn\" type=\"checkbox\" /><span class=\"icComs\" style=\"color:#999999;\">Coms</span>";};
// option Event
if (JN_Event == "true")
{var JN_O_Event = "<input name=\"JN_EventIn\" type=\"checkbox\"  checked=\"checked\" /><span class=\"icEvents\" style=\"color:#000000;\">Events</span>";}
else{var JN_O_Event = "<input name=\"JN_EventIn\" type=\"checkbox\" /><span class=\"icEvents\" style=\"color:#999999;\">Events</span>";};
// option Flog
if (JN_Flog == "true")
{var JN_O_Flog = "<input name=\"JN_FlogIn\" type=\"checkbox\"  checked=\"checked\" /><span class=\"icFlog\" style=\"color:#000000;\">Flogs</span>";}
else{var JN_O_Flog = "<input name=\"JN_FlogIn\" type=\"checkbox\" /><span class=\"icFlog\" style=\"color:#999999;\">Flogs</span>";};
// option Around
if (JN_Around == "true")
{var JN_O_Around = "<input name=\"JN_AroundIn\" type=\"checkbox\"  checked=\"checked\" /><span class=\"icRum\" style=\"color:#000000;\">Rund um Mich</span>";}
else{var JN_O_Around = "<input name=\"JN_AroundIn\" type=\"checkbox\" /><span class=\"icRum\" style=\"color:#999999;\">Rund um Mich</span>";};

// abschnitt zusammenfassen
var JN_MenuePunkt_Uebersicht = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">Men&uuml;punkte <u>&Uuml;bersicht</u> anzeigen? "+JN_O_UebersichtBlock+" Wenn JA welche:</td></tr>";
var JN_O_Uebersicht = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">"+JN_O_Startseite+" | "+JN_O_Coms+" | "+JN_O_Event+" | "+JN_O_Flog+" | "+JN_O_Around+"</td></tr>";
var JN_MenueBlock_Uebersicht = ""+JN_MenuePunkt_Uebersicht+JN_O_Uebersicht+"";

// option mein jappy block anzeigen ja/nein
if (JN_MyJappyBlock == "true")
{var JN_O_MyJappyBlock = "<input name=\"JN_MyJappyBlockIn\" type=\"checkbox\"  checked=\"checked\" />";}
else{var JN_O_MyJappyBlock = "<input name=\"JN_MyJappyBlockIn\" type=\"checkbox\" />";};
// option Profil
if (JN_Profil == "true")
{var JN_O_Profil = "<input name=\"JN_ProfilIn\" type=\"checkbox\"  checked=\"checked\" /><span class=\"icSt1\" style=\"color:#000000;\">Mein Profil</span>";}
else{var JN_O_Profil = "<input name=\"JN_ProfilIn\" type=\"checkbox\" /><span class=\"icSt1\" style=\"color:#999999;\">Mein Profil</span>";};
// option Mail
if (JN_Mail == "true")
{var JN_O_Mail = "<input name=\"JN_MailIn\" type=\"checkbox\"  checked=\"checked\" /><span class=\"icMailbox\" style=\"color:#000000;\">Mailbox</span>";}
else{var JN_O_Mail = "<input name=\"JN_MailIn\" type=\"checkbox\" /><span class=\"icMailbox\" style=\"color:#999999;\">Mailbox</span>";};
// option Kalnder
if (JN_Termin == "true")
{var JN_O_Termin = "<input name=\"JN_TerminIn\" type=\"checkbox\"  checked=\"checked\" /><span class=\"icAlmanac\" style=\"color:#000000;\">Termine</span>";}
else{var JN_O_Termin = "<input name=\"JN_TerminIn\" type=\"checkbox\" /><span class=\"icAlmanac\" style=\"color:#999999;\">Termine</span>";};
// option Freunde
if (JN_Freunde == "true")
{var JN_O_Freunde = "<input name=\"JN_FreundeIn\" type=\"checkbox\"  checked=\"checked\" /><span class=\"icBuddy\" style=\"color:#000000;\">Freunde</span>";}
else{var JN_O_Freunde = "<input name=\"JN_FreundeIn\" type=\"checkbox\" /><span class=\"icBuddy\" style=\"color:#999999;\">Freunde</span>";};
// option Geburtstag
if (JN_Geburtstag == "true")
{var JN_O_Geburtstag = "<input name=\"JN_GeburtstagIn\" type=\"checkbox\"  checked=\"checked\" /><span class=\"icBirthday\" style=\"color:#000000;\">Geburtstage</span>";}
else{var JN_O_Geburtstag = "<input name=\"JN_GeburtstagIn\" type=\"checkbox\" /><span class=\"icBirthday\" style=\"color:#999999;\">Geburtstage</span>";};
// option Haustier
if (JN_Haustier == "true")
{var JN_O_Haustier = "<input name=\"JN_HaustierIn\" type=\"checkbox\"  checked=\"checked\" /><span class=\"icSt40\" style=\"color:#000000;\"> Stall</span>";}
else{var JN_O_Haustier = "<input name=\"JN_HaustierIn\" type=\"checkbox\" /><span class=\"icSt40\" style=\"color:#999999;\"> Stall</span>";};

var JN_O_Pet_1_search = "<input id=\"search_pet_1\" type=\"button\" value=\"Auto\">";
var JN_O_Pet_1_reset = "<input id=\"reset_pet_1\" type=\"button\" value=\"Reset\">";
// option pet 1
if (haustier_1 == "true")
{var JN_O_pet1 = "<input name=\"haustier_1\" type=\"checkbox\"  checked=\"checked\" /><span class=\"icSt40\" style=\"color:#000000;\"> Haustier 1</span>";}
else {var JN_O_pet1 = "<input name=\"haustier_1\" type=\"checkbox\" /><span class=\"icSt40\" style=\"color:#999999;\"> Haustier 1</span>";};
var JN_O_pet1_url = "<input id=\"haustier_1_url\" name=\"haustier_1_url\" type=\"text\" size=\"30\" value=\""+haustier_1_url+"\" />";
var JN_O_pet1_name = "<input id=\"haustier_1_name\" name=\"haustier_1_name\" type=\"text\" size=\"10\" value=\""+haustier_1_name+"\" />";

var JN_O_Pet_2_search = "<input id=\"search_pet_2\" type=\"button\" value=\"Auto\">";
var JN_O_Pet_2_reset = "<input id=\"reset_pet_2\" type=\"button\" value=\"Reset\">";
// option pet 2
if (haustier_2 == "true")
{var JN_O_pet2 = "<input name=\"haustier_2\" type=\"checkbox\"  checked=\"checked\" /><span class=\"icSt40\" style=\"color:#000000;\"> Haustier 2</span>";}
else {var JN_O_pet2 = "<input name=\"haustier_2\" type=\"checkbox\" /><span class=\"icSt40\" style=\"color:#999999;\"> Haustier 2</span>";};
var JN_O_pet2_url = "<input id=\"haustier_2_url\" name=\"haustier_2_url\" type=\"text\" size=\"30\" value=\""+haustier_2_url+"\" />";
var JN_O_pet2_name = "<input id=\"haustier_2_name\" name=\"haustier_2_name\" type=\"text\" size=\"10\" value=\""+haustier_2_name+"\" />";


// abschnitt zusammenfassen
var JN_MenuePunkt_MeinJappy = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">Men&uuml;punkte <u>Mein Jappy</u> anzeigen? "+JN_O_MyJappyBlock+" Wenn JA welche:</td></tr>";
var JN_O_MeinJappy = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">"+JN_O_Profil+" | "+JN_O_Mail+" | "+JN_O_Termin+" | "+JN_O_Freunde+" | "+JN_O_Geburtstag+"</td></tr>";
var JN_O_MeinJappy_2 = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">"+JN_O_Haustier+"</td></tr>";
var JN_O_MeinJappy_3 = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">"+JN_O_pet1+" "+JN_O_Pet_1_search+JN_O_Pet_1_reset+" "+JN_O_pet1_url+" "+JN_O_pet1_name+"</td></tr>";
var JN_O_MeinJappy_4 = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">"+JN_O_pet2+" "+JN_O_Pet_2_search+JN_O_Pet_2_reset+" "+JN_O_pet2_url+" "+JN_O_pet2_name+"</td></tr>";
var JN_MenueBlock_MeinJappy = ""+JN_MenuePunkt_MeinJappy+JN_O_MeinJappy+JN_O_MeinJappy_2+JN_O_MeinJappy_3+JN_O_MeinJappy_4+"";

// option mehr block anzeigen ja/nein
if (JN_MooreBlock == "true")
{var JN_O_MooreBlock = "<input name=\"JN_MooreBlockIn\" type=\"checkbox\" checked=\"checked\" />";}
else{var JN_O_MooreBlock = "<input name=\"JN_MooreBlockIn\" type=\"checkbox\" />";};
// option Statuswechsel
if (JN_Statuswechsel == "true")
{var JN_O_Statuswechsel = "<input name=\"JN_StatuswechselIn\" type=\"checkbox\" checked=\"checked\" /><span class=\"icEdit\" style=\"color:#000000;\">Statusauswahl</span>";}
else{var JN_O_Statuswechsel = "<input name=\"JN_StatuswechselIn\" type=\"checkbox\" /><span class=\"icEdit\" style=\"color:#999999;\">Statusauswahl</span>";};
// option Statusbox
if (JN_StatusBox == "true")
{var JN_O_StatusBox = "<input name=\"JN_StatusBoxIn\" type=\"checkbox\" checked=\"checked\" /><span class=\"icEdit\" style=\"color:#000000;\">StatusBox</span>";}
else{var JN_O_StatusBox = "<input name=\"JN_StatusBoxIn\" type=\"checkbox\" /><span class=\"icEdit\" style=\"color:#999999;\">StatusBox</span>";};
// option Forum
if (JN_Forum == "true")
{var JN_O_Forum = "<input name=\"JN_ForumIn\" type=\"checkbox\" checked=\"checked\" /><span class=\"icForumTopic\" style=\"color:#000000;\">Forum</span>";}
else{var JN_O_Forum = "<input name=\"JN_ForumIn\" type=\"checkbox\" /><span class=\"icForumTopic\" style=\"color:#999999;\">Forum</span>";};
// option Abo
if (JN_Abo == "true")
{var JN_O_Abo = "<input name=\"JN_AboIn\" type=\"checkbox\" checked=\"checked\" /><span class=\"icAbos\" style=\"color:#000000;\">Abos</span>";}
else{var JN_O_Abo = "<input name=\"JN_AboIn\" type=\"checkbox\" /><span class=\"icAbos\" style=\"color:#999999;\">Abos</span>";};
// option Chat
if (JN_Chat == "true")
{var JN_O_Chat = "<input name=\"JN_ChatIn\" type=\"checkbox\" checked=\"checked\" /><span class=\"icChat\" style=\"color:#000000;\">Chat</span>";}
else{var JN_O_Chat = "<input name=\"JN_ChatIn\" type=\"checkbox\" /><span class=\"icChat\" style=\"color:#999999;\">Chat</span>";};
// option Einstellungen
if (JN_Einst == "true")
{var JN_O_Einst = "<input name=\"JN_EinstIn\" type=\"checkbox\" checked=\"checked\" /><span class=\"icChat\" style=\"color:#000000;\">Einst.</span>";}
else{var JN_O_Einst = "<input name=\"JN_EinstIn\" type=\"checkbox\" /><span class=\"icChat\" style=\"color:#999999;\">Einst.</span>";};
// option Suche
if (JN_Suche == "true")
{var JN_O_Suche = "<input name=\"JN_SucheIn\" type=\"checkbox\" checked=\"checked\" /><span class=\"icChat\" style=\"color:#000000;\">Suche</span>";}
else{var JN_O_Suche = "<input name=\"JN_SucheIn\" type=\"checkbox\" /><span class=\"icChat\" style=\"color:#999999;\">Suche</span>";};


// anzahl eintraege statusbox
if(JN_StatusBoxAnz == 1){
var Select_1 = "<option selected value=\"1\">1</option>";
}else{
var Select_1 = "<option value=\"1\">1</option>";
};
if(JN_StatusBoxAnz == 2){
var Select_2 = "<option selected value=\"2\">2</option>";
}else{
var Select_2 = "<option value=\"2\">2</option>";
};
if(JN_StatusBoxAnz == 3){
var Select_3 = "<option selected value=\"3\">3</option>";
}else{
var Select_3 = "<option value=\"3\">3</option>";
};
if(JN_StatusBoxAnz == 4){
var Select_4 = "<option selected value=\"4\">4</option>";
}else{
var Select_4 = "<option value=\"4\">4</option>";
};
if(JN_StatusBoxAnz == 5){
var Select_5 = "<option selected value=\"5\">5</option>";
}else{
var Select_5 = "<option value=\"5\">5</option>";
};
var JN_O_StatusSelect = "<select name=\"JN_StatusBoxAnzIn\">"+Select_1+Select_2+Select_3+Select_4+Select_5+"</select>";

var JN_O_StatusBoxAnz = "<span class=\"icEdit \" style=\"color:#000000;\">Anzahl eintr&auml;ge StatusBox: </span>"+JN_O_StatusSelect+" <span id=\"Hilfe_StatusBox\" class=\"icHelp\">Info</span>";
var JN_O_StatusSelectBox = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">"+JN_O_StatusBox+" | "+JN_O_StatusBoxAnz+"</td></tr>";

// abschnitt zusammenfassen
var JN_MenuePunkt_Moore = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">Men&uuml;punkte <u>Mehr</u> anzeigen? "+JN_O_MooreBlock+" Wenn JA welche:</td></tr>";
var JN_O_Moore = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">"+JN_O_Statuswechsel+" | "+JN_O_Forum+" | "+JN_O_Abo+" | "+JN_O_Chat+" | "+JN_O_Einst+" | "+JN_O_Suche+"</td></tr>";
var JN_MenueBlock_Moore = ""+JN_MenuePunkt_Moore+JN_O_Moore+JN_O_StatusSelectBox+"";

// option info block anzeigen ja/nein
if (JN_InfoBlock == "true")
{var JN_O_InfoBlock = "<input name=\"JN_InfoBlockIn\" type=\"checkbox\" checked=\"checked\" />";}
else{var JN_O_InfoBlock = "<input name=\"JN_InfoBlockIn\" type=\"checkbox\" />";};
// option Rang
if (JN_Rang == "true")
{var JN_O_Rang = "<input name=\"JN_RangIn\" type=\"checkbox\" checked=\"checked\" /><span class=\"icXp\" style=\"color:#000000;\">Rang &#38; Co</span>";}
else{var JN_O_Rang = "<input name=\"JN_RangIn\" type=\"checkbox\" /><span class=\"icXp\" style=\"color:#999999;\">Rang &#38; Co</span>";};
// option Konto
if (JN_Konto == "true")
{var JN_O_Konto = "<input name=\"JN_KontoIn\" type=\"checkbox\" checked=\"checked\" /><span class=\"icCredit\" style=\"color:#000000;\">Kontostand</span>";}
else{var JN_O_Konto = "<input name=\"JN_KontoIn\" type=\"checkbox\" /><span class=\"icCredit\" style=\"color:#999999;\">Kontostand</span>";};

// abschnitt zusammenfassen
var JN_MenuePunkt_Info = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">Men&uuml;punkte <u>Info</u> anzeigen? "+JN_O_InfoBlock+" Wenn JA welche:</td></tr>";
var JN_O_Info = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">"+JN_O_Rang+" | "+JN_O_Konto+"</td></tr>";
var JN_MenueBlock_Info = ""+JN_MenuePunkt_Info+JN_O_Info+"";

var JN_MenueBlock_LinkOpionen = "<tr><td colspan=\"3\" class=\"head\" width=\"100%\">Men&uuml;punkte Ein- &#38; Ausblenden:</td></tr>"+JN_MenueBlock_Uebersicht+JN_MenueBlock_MeinJappy+JN_MenueBlock_Moore+JN_MenueBlock_Info+"";

// optionen funktionen anzeigen ja/nein
if (JN_MailCheck == "true")
{var JN_O_MailcheckBox = "<input name=\"JN_MailCheckIn\" type=\"checkbox\" checked=\"checked\" />";}
else{var JN_O_MailcheckBox = "<input name=\"JN_MailCheckIn\" type=\"checkbox\" />";};

// sound lautstaerke
if(soundVolume == 10){
var volume_1 = "<option selected value=\"10\">10</option>";
}else{var volume_1 = "<option value=\"10\">10</option>";};

if(soundVolume == 20){
var volume_2 = "<option selected value=\"20\">20</option>";
}else{var volume_2 = "<option value=\"20\">20</option>";};

if(soundVolume == 30){
var volume_3 = "<option selected value=\"30\">30</option>";
}else{var volume_3 = "<option value=\"30\">30</option>";};

if(soundVolume == 40){
var volume_4 = "<option selected value=\"40\">40</option>";
}else{var volume_4 = "<option value=\"40\">40</option>";};

if(soundVolume == 50){
var volume_5 = "<option selected value=\"50\">50</option>";
}else{var volume_5 = "<option value=\"50\">50</option>";};

if(soundVolume == 60){
var volume_6 = "<option selected value=\"60\">60</option>";
}else{var volume_6 = "<option value=\"60\">60</option>";};

if(soundVolume == 70){
var volume_7 = "<option selected value=\"70\">70</option>";
}else{var volume_7 = "<option value=\"70\">70</option>";};

if(soundVolume == 80){
var volume_8 = "<option selected value=\"80\">80</option>";
}else{var volume_8 = "<option value=\"80\">80</option>";};

if(soundVolume == 90){
var volume_9 = "<option selected value=\"90\">90</option>";
}else{var volume_9 = "<option value=\"90\">90</option>";};

if(soundVolume == 100){
var volume_10 = "<option selected value=\"100\">100</option>";
}else{var volume_10 = "<option value=\"100\">100</option>";};

// mailcheck an/aus
var JN_MenuePunkt_Mailcheck = "<span class=\"icEdit \"><u>Mailcheck</u> Einschalten? </span>"+JN_O_MailcheckBox+"";
var JN_Plugin_Info = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">Um den Mailwarner nutzen zu k&ouml;nnen muss das <a href=\"http://port25.technet.com/pages/windows-media-player-firefox-plugin-download.aspx\" target=\"_blank\">\"Microsoft Windows Media Player Firefox Plugin\"</a> installiert werden.</br>Linux Nutzer haben dadurch leider das nachsehen. Es wird an einer alternatieve mit VLC gearbeitet.</td></tr>";

// mailsound select
var JN_O_VolumeSelect = "<select name=\"soundVolumeIn\">"+volume_1+volume_2+volume_3+volume_4+volume_5+volume_6+volume_7+volume_8+volume_9+volume_10+"</select>";
var JN_O_VolumeSelectBox = "<span class=\"icSt11 \" style=\"color:#000000;\">Lautstärke Mailsound: </span>"+JN_O_VolumeSelect+"";
var JN_O_Mailcheck_punkt = ""+JN_MenuePunkt_Mailcheck+JN_O_VolumeSelectBox+"";

// besucherbilder
if(JN_besucherbilder == "true")
{var JN_O_besucherbilder = "<input name=\"JN_besucherbilderIn\" type=\"checkbox\" checked=\"checked\"/><span class=\"icSt23\" style=\"color:#000000;\">Besucherbilder</span>";}
else { var JN_O_besucherbilder = "<input name=\"JN_besucherbilderIn\" type=\"checkbox\"/><span class=\"icSt23\" style=\"color:#999999;\">Besucherbilder</span>"; }

// abschnitt zusammenfassen
var JN_O_funktionen = "<tr class=\"line\" onmouseover=\"Jpy.css.hoverClass(this, 'bgY7')\"><td class=\"ti5\" width=\"100%\">"+JN_O_Mailcheck_punkt+" | "+JN_O_besucherbilder+"</td></tr>";
var JN_MenueBlock_funk = ""+JN_O_funktionen+"";

var JN_MenueBlock_funktionen = "<tr><td colspan=\"3\" class=\"head\" width=\"100%\">Men&uuml;funktionen:</td></tr>"+JN_MenueBlock_funk+"";

// buttons auf einstellungseite
var JN_Optionen_Bottom = "<div class=\"liG8\"><div class=\"pd10 fs12 taR\"><a href=\"/settings\" class=\"inCo rb5\">Alle Einstellungen</a> <a href=\"/user/"+Name+"\" class=\"inCo rb5\">Zum Profil</a> <button value=\"submit\" type=\"submit\" accesskey=\"s\" id=\"JN_Settings_Save\" class=\"inAc rb5 cp\">Speichern</button></div></div>";

// optionsmenue bilden
document.getElementById("se").innerHTML = "<table id=\"se\" class=\"boG1\"><tbody>"+JN_MenueBlock_Ausrichtung+JN_MenueBlock_LinkOpionen+JN_MenueBlock_funktionen+"</tbody></table>"+JN_Optionen_Bottom+"";

// Wurde Speichern geklickt dann...
document.getElementById('JN_Settings_Save').addEventListener('click', function speichern () {


// fixierung des menues
GM_setValue("JN_AbsoluteFixedIn", document.getElementsByName('JN_AbsoluteFixedIn')[0].value);
// menuepunkte
// uebersichtblock
if (document.getElementsByName('JN_UebersichtBlockIn')[0].checked == true)
{GM_setValue("JN_UebersichtBlockIn", "true");}else{GM_setValue("JN_UebersichtBlockIn", "false");}
// startseite
if (document.getElementsByName('JN_StartseiteIn')[0].checked == true)
{GM_setValue("JN_StartseiteIn", "true");}else{GM_setValue("JN_StartseiteIn", "false");}
// coms
if (document.getElementsByName('JN_ComsIn')[0].checked == true)
{GM_setValue("JN_ComsIn", "true");}else{GM_setValue("JN_ComsIn", "false");}
// event
if (document.getElementsByName('JN_EventIn')[0].checked == true)
{GM_setValue("JN_EventIn", "true");}else{GM_setValue("JN_EventIn", "false");}
// flog
if (document.getElementsByName('JN_FlogIn')[0].checked == true)
{GM_setValue("JN_FlogIn", "true");}else{GM_setValue("JN_FlogIn", "false");}
// around
if (document.getElementsByName('JN_AroundIn')[0].checked == true)
{GM_setValue("JN_AroundIn", "true");}else{GM_setValue("JN_AroundIn", "false");}

// mein jappy block
if (document.getElementsByName('JN_MyJappyBlockIn')[0].checked == true)
{GM_setValue("JN_MyJappyBlockIn", "true");}else{GM_setValue("JN_MyJappyBlockIn", "false");}
// profil
if (document.getElementsByName('JN_ProfilIn')[0].checked == true)
{GM_setValue("JN_ProfilIn", "true");}else{GM_setValue("JN_ProfilIn", "false");}
// mail
if (document.getElementsByName('JN_MailIn')[0].checked == true)
{GM_setValue("JN_MailIn", "true");}else{GM_setValue("JN_MailIn", "false");}
// termin
if (document.getElementsByName('JN_TerminIn')[0].checked == true)
{GM_setValue("JN_TerminIn", "true");}else{GM_setValue("JN_TerminIn", "false");}
// freunde
if (document.getElementsByName('JN_FreundeIn')[0].checked == true)
{GM_setValue("JN_FreundeIn", "true");}else{GM_setValue("JN_FreundeIn", "false");}
// geburtstag
if (document.getElementsByName('JN_GeburtstagIn')[0].checked == true)
{GM_setValue("JN_GeburtstagIn", "true");}else{GM_setValue("JN_GeburtstagIn", "false");}
// haustier
if (document.getElementsByName('JN_HaustierIn')[0].checked == true)
{GM_setValue("JN_HaustierIn", "true");}else{GM_setValue("JN_HaustierIn", "false");}

// pet 1 anzeige speichern
if (document.getElementsByName('haustier_1')[0].checked == true)
{GM_setValue("haustier_1", "true");}else{GM_setValue("haustier_1", "false");}
// pet 1 adresse speichern
GM_setValue("haustier_1_url", document.getElementById('haustier_1_url').value);
// pet 1 name speichern
GM_setValue("haustier_1_name", document.getElementById('haustier_1_name').value);
// pet 2 anzeige speichern
if (document.getElementsByName('haustier_2')[0].checked == true)
{GM_setValue("haustier_2", "true");}else{GM_setValue("haustier_2", "false");}
// pet 2 adresse speichern
GM_setValue("haustier_2_url", document.getElementById('haustier_2_url').value);
// pet 2 name speichern
GM_setValue("haustier_2_name", document.getElementById('haustier_2_name').value);

// mehr block
if (document.getElementsByName('JN_MooreBlockIn')[0].checked == true)
{GM_setValue("JN_MooreBlockIn", "true");}else{GM_setValue("JN_MooreBlockIn", "false");}
// statuswechsel
if (document.getElementsByName('JN_StatuswechselIn')[0].checked == true)
{GM_setValue("JN_StatuswechselIn", "true");}else{GM_setValue("JN_StatuswechselIn", "false");}
// statusbox
if (document.getElementsByName('JN_StatusBoxIn')[0].checked == true)
{GM_setValue("JN_StatusBoxIn", "true");}else{GM_setValue("JN_StatusBoxIn", "false");}
// anzahl eintreage
GM_setValue("JN_StatusBoxAnzIn", document.getElementsByName('JN_StatusBoxAnzIn')[0].value);
// forum
if (document.getElementsByName('JN_ForumIn')[0].checked == true)
{GM_setValue("JN_ForumIn", "true");}else{GM_setValue("JN_ForumIn", "false");}
// abo
if (document.getElementsByName('JN_AboIn')[0].checked == true)
{GM_setValue("JN_AboIn", "true");}else{GM_setValue("JN_AboIn", "false");}
// chat
if (document.getElementsByName('JN_ChatIn')[0].checked == true)
{GM_setValue("JN_ChatIn", "true");}else{GM_setValue("JN_ChatIn", "false");}
// einstellungen
if (document.getElementsByName('JN_EinstIn')[0].checked == true)
{GM_setValue("JN_EinstIn", "true");}else{GM_setValue("JN_EinstIn", "false");}
// suche
if (document.getElementsByName('JN_SucheIn')[0].checked == true)
{GM_setValue("JN_SucheIn", "true");}else{GM_setValue("JN_SucheIn", "false");}

// info block
if (document.getElementsByName('JN_InfoBlockIn')[0].checked == true)
{GM_setValue("JN_InfoBlockIn", "true");}else{GM_setValue("JN_InfoBlockIn", "false");}
// rang
if (document.getElementsByName('JN_RangIn')[0].checked == true)
{GM_setValue("JN_RangIn", "true");}else{GM_setValue("JN_RangIn", "false");}
// konto
if (document.getElementsByName('JN_KontoIn')[0].checked == true)
{GM_setValue("JN_KontoIn", "true");}else{GM_setValue("JN_KontoIn", "false");}

// mailcheck
// an / aus
if (document.getElementsByName('JN_MailCheckIn')[0].checked == true)
{GM_setValue("JN_MailCheckIn", "true");}else{GM_setValue("JN_MailCheckIn", "false");}
// sound lautstaerke
GM_setValue("soundVolumeIn", document.getElementsByName('soundVolumeIn')[0].value);
// besucherbilder
if (document.getElementsByName('JN_besucherbilderIn')[0].checked == true)
{GM_setValue("JN_besucherbilderIn", "true");}else{GM_setValue("JN_besucherbilderIn", "false");}


// angabe fuer pixelpruefung auslesen
var top_pixel = document.getElementsByName('JN_TopBottomPxIn')[0].value;
var left_pixel = document.getElementsByName('JN_RightLeftPxIn')[0].value;

// css falsche pixel von oben
if ( isNaN(top_pixel) || top_pixel < 0 ) {
addGlobalStyle('#jn_pvo { background:red; }')
}
// css falsche pixel von links
if ( isNaN(left_pixel) || left_pixel < 0 ) {
addGlobalStyle('#jn_pvl { background:red; }')
}

// pixelpruefung durchfuehren
if ( isNaN(top_pixel) || isNaN(left_pixel)  || top_pixel < 0  || left_pixel < 0 ) {
// fehlermeldung bei falscher eingabe fuer pixel
error_message = window.confirm ('Fehlerhafte angaben in den einstellungen (Pixelangaben)\n\n Trotzdem speichern? (Pixelangaben werden NICHT \u00fcbernommen!)');
// wenn mit ok bestatigt ...
if (error_message == true){
// meldung ausgeben ...
alert(unescape('Einstellungen erfolgreich \U00fcbernommen.\nSeite wird neu geladen.'))
// und seite neu laden.
window.location.reload();
// beim klick auf abbrechen ...
} else { /*hier passiert nix*/ }

// wenn angaben fuer pixel ok ...
} else {
// angaben speichern ...
GM_setValue("JN_TopBottomPxIn", document.getElementsByName('JN_TopBottomPxIn')[0].value);
GM_setValue("JN_RightLeftPxIn", document.getElementsByName('JN_RightLeftPxIn')[0].value);
// meldung ausgeben ...
alert(unescape('Einstellungen erfolgreich \u00fcbernommen.\nSeite wird neu geladen.'))
// seite neu laden.
window.location.reload();
}

},false);


document.getElementById('Hilfe_Fixierung').addEventListener('click', function Hilfe_Fixierung () {
alert('Scrollbar = Men\u00fc scrollt mit der seite mit.\nFixiert = Men\u00fc ist feststehend.\n\nFixiert ist NICHT zu empfehlen wen viele Men\u00fcpunkte aktiviert sind da manche Men\u00fcpunkte sonst nicht mehr erreichbar sind!')
},false);

document.getElementById('Hilfe_StatusBox').addEventListener('click', function Hilfe_StatusBox () {
alert('1 = Dropdownbox\n2-5 = Auswahlliste')
},false);

// name und id des ersten haustiers auslesen
document.getElementById('search_pet_1').addEventListener('click', function haustier_suche_1() {
HTTP_REQ(MainUrl+"/user/"+Name,'GET',pet_1,Name);
},false);
// name und id des zweiten haustiers auslesen
document.getElementById('search_pet_2').addEventListener('click', function haustier_suche_2() {
HTTP_REQ(MainUrl+"/user/"+Name,'GET',pet_2,Name);
},false);

// haustier 1 reset
document.getElementById('reset_pet_1').addEventListener('click', function haustier_reset_1() {
var pet_1_link = "/user/"+Name+"/pet/home";
var pet_1_name = "Stall";
// pet 1 adresse speichern
GM_setValue("haustier_1_url", pet_1_link);
// pet 1 name speichern
GM_setValue("haustier_1_name", pet_1_name);
document.getElementById("haustier_1_url").value = pet_1_link;
document.getElementById("haustier_1_name").value = pet_1_name;
addGlobalStyle('#haustier_1_url, #haustier_1_Name {background:white; color:black;}')
},false);
// haustier 2 reset
document.getElementById('reset_pet_2').addEventListener('click', function haustier_reset_2() {
var pet_2_link = "/user/"+Name+"/pet/home";
var pet_2_name = "Stall";
// pet 2 adresse speichern
GM_setValue("haustier_2_url", pet_2_link);
// pet 2 name speichern
GM_setValue("haustier_2_name", pet_2_name);
document.getElementById("haustier_2_url").value = pet_2_link;
document.getElementById("haustier_2_name").value = pet_2_name;
addGlobalStyle('#haustier_2_url, #haustier_2_Name {background:white; color:black;}')
},false);

},false);

}

// funktion besucherbilder
if(JN_besucherbilder == "true") {
besucherbilder()
} else {}

// drag and drop initialisieren
int_jn_drag()

// "hover" funktion initialisieren
mouse_over_out()

klapp_mich(info_oc,mehr_oc,myjpy_oc,overview_oc)

}

function klapp_mich(info_oc,mehr_oc,myjpy_oc,overview_oc) {

// klapfunktion uebersicht
document.getElementById("overview_block").addEventListener("click", function anzeige () {
if (overview_oc == true) { overview_oc = false }
else { overview_oc = true }
klap_mich_overview_oc(overview_oc)
},false);

function klap_mich_overview_oc(overview_oc) {
if (overview_oc == true) {
document.getElementById("overview_block_div").style.display = "block";
document.getElementById("ov_span").setAttribute('class', 'spClosed');
GM_setValue('overview_oc', true);
} else {
document.getElementById("overview_block_div").style.display = "none";
document.getElementById("ov_span").setAttribute('class', 'spOpen');
GM_setValue('overview_oc', false);
}}

// klapfunktion my-jpy
document.getElementById("myjpy_block").addEventListener("click", function anzeige () {
if (myjpy_oc == true) { myjpy_oc = false }
else { myjpy_oc = true }
klap_mich_myjpy_oc(myjpy_oc)
},false);

function klap_mich_myjpy_oc(myjpy_oc) {
if (myjpy_oc == true) {
document.getElementById("myjpy_block_div").style.display = "block";
document.getElementById("my_span").setAttribute('class', 'spClosed');
GM_setValue('myjpy_oc', true);
} else {
document.getElementById("myjpy_block_div").style.display = "none";
document.getElementById("my_span").setAttribute('class', 'spOpen');
GM_setValue('myjpy_oc', false);
}}

// klapfunktion mehr
document.getElementById("mehr_block").addEventListener("click", function anzeige () {
if (mehr_oc == true) { mehr_oc = false }
else { mehr_oc = true }
klap_mich_mehr_oc(mehr_oc)
},false);

function klap_mich_mehr_oc(mehr_oc) {
if (mehr_oc == true) {
document.getElementById("mehr_block_div").style.display = "block";
document.getElementById("me_span").setAttribute('class', 'spClosed');
GM_setValue('mehr_oc', true);
} else {
document.getElementById("mehr_block_div").style.display = "none";
document.getElementById("me_span").setAttribute('class', 'spOpen');
GM_setValue('mehr_oc', false);
}}

// klapfunktion infoblock
document.getElementById("info_block").addEventListener("click", function anzeige () {
if (info_oc == true) { info_oc = false }
else { info_oc = true }
klap_mich_info_oc(info_oc)
},false);

function klap_mich_info_oc(info_oc) {
if (info_oc == true) {
document.getElementById("info_block_div").style.display = "block";
document.getElementById("in_span").setAttribute('class', 'spClosed');
GM_setValue('info_oc', true);
} else {
document.getElementById("info_block_div").style.display = "none";
document.getElementById("in_span").setAttribute('class', 'spOpen');
GM_setValue('info_oc', false);
}}

}

// mouse over/out funktionen fuer "hover-efekt" im support-block
function mouse_over_out() {

// mouse over/out scriptcom
document.getElementById("cjnc").addEventListener("mouseover", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Crazyfont Com';
},false);
document.getElementById("cjnc").addEventListener("mouseout", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Jappy Navigator '+CurrentScriptVersion+'';
},false);

// mouse over/out mail gorgon
document.getElementById("cjmt").addEventListener("mouseover", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Mail an OMG';
},false);
document.getElementById("cjmt").addEventListener("mouseout", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Jappy Navigator '+CurrentScriptVersion+'';
},false);

// mouse over/out profil gorgon
document.getElementById("cjpg").addEventListener("mouseover", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Jappy Profil von OMG';
},false);
document.getElementById("cjpg").addEventListener("mouseout", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Jappy Navigator '+CurrentScriptVersion+'';
},false);

// mouse over/out script hp
document.getElementById("cjhp").addEventListener("mouseover", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Homepage';
},false);
document.getElementById("cjhp").addEventListener("mouseout", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Jappy Navigator '+CurrentScriptVersion+'';
},false);

// mouse over/out updatelink
document.getElementById("JappyUpdate").addEventListener("mouseover", function anzeige () {
document.getElementById('cjsb').innerHTML = '<font style=\"color:red;\">Update Verf&uuml;gbar !!</font>';
},false);
document.getElementById("JappyUpdate").addEventListener("mouseout", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Jappy-Navigator '+CurrentScriptVersion+'';
},false);

// mouse over/out drag u. drop
document.getElementById("cjsb").addEventListener("mouseover", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Drag &#38; Drop';
},false);
document.getElementById("cjsb").addEventListener("mouseout", function anzeige () {
document.getElementById('cjsb').innerHTML = 'Jappy-Navigator '+CurrentScriptVersion+'';
},false);

}

// drag and drop funktion
if(!GM_getValue("JN_TopBottomPxIn")||GM_getValue("JN_TopBottomPxIn")=='')
JN_TopBottomPx = 110;
else
JN_TopBottomPx = GM_getValue("JN_TopBottomPxIn");

if(!GM_getValue("JN_RightLeftPxIn")||GM_getValue("JN_RightLeftPxIn")=='')
JN_RightLeftPx = 980;
else
JN_RightLeftPx = GM_getValue("JN_RightLeftPxIn");

var dragspendenobjekt = null;
var dragx = 0;
var dragy = 0;
var posx = 0;
var posy = 0;

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
	if(jn_drag_objekt != null) {
	
		JN_RightLeftPx = posx - dragx;//left
		JN_TopBottomPx = posy - dragy;//top
		
		jn_drag_objekt.style.left = JN_RightLeftPx + "px";
		jn_drag_objekt.style.top = JN_TopBottomPx + "px";
		
		document.getElementById("acc").style.left = JN_RightLeftPx + "px";
		document.getElementById("acc").style.top = JN_TopBottomPx + "px";
		
		GM_setValue("JN_RightLeftPxIn", JN_RightLeftPx);
		GM_setValue("JN_TopBottomPxIn", JN_TopBottomPx);
		
		document.getElementById("JN_RightLeftPxIn").value = JN_RightLeftPx;
		document.getElementById("JN_TopBottomPxIn").value = JN_TopBottomPx;	
	}
}

// vergroesserung der besucherbilder
function besucherbilder() {

if (url.indexOf(MainUrl+"/user/")>=0) {

for(i=0;i<7;i++){

before_visitors = document.getElementsByClassName("visitors cf")[0];

// besucherbilder vergroessern
visitors_pic = before_visitors.getElementsByTagName("img")[i];
visitors_pic.removeAttribute('width', 0);
visitors_pic.setAttribute('style', 'width:100px; height:100px;');

}

// funktionsaufruf zum einfügen eines <br> tags sodas die bilder untereinander angezeigt werden
insertBehind()

} else {}


// <br> tag einfuegen
function insertBehind() {

for(i=0;i<7;i++){

before_visitors = document.getElementsByClassName("visitors cf")[0];

   var visitors_a_tag = before_visitors.getElementsByTagName("a")[i];
   visitors_a_tag.setAttribute('style', 'width:100px; height:120px;');
   
   nick = visitors_a_tag.getAttribute("href").replace("/user/","");
   
   if (visitors_a_tag.getAttribute('title')) {
   
      var br = document.createElement('br');
      
      if (visitors_a_tag.nextSibling) {
         visitors_a_tag.parentNode.insertBefore(br, visitors_a_tag.nextSibling);
      } else {
         visitors_a_tag.parentNode.appendChild(br);
      }
   }

}}}

// haustier 1 auslesen
function pet_1(resp3,Name) {

try {

var pre_split = "/user/"+Name+"/pet/";

var pet_1_id = resp3.responseText.split(pre_split)[2].split('"')[0];
var pet_1_name = resp3.responseText.split('class="pet fs12 ldN coB3">')[1].split('</a>')[0];

var pet_1_link = "/user/"+Name+"/pet/"+pet_1_id;

GM_setValue("haustier_1_url", pet_1_link);
GM_setValue("haustier_1_name", pet_1_name);

set_value_pet_1(pet_1_link,pet_1_name)

} catch(err) { alert('Fehler beim auslesen!\n\nEntweder ist kein Haustier vorhanden oder es trat ein Fehler beim auslesen auf.\nSollte ein Haustier vorhanden sein dan bitte den Link und den Namen manuell eintragen.') }

}
function set_value_pet_1(pet_1_link,pet_1_name) {
document.getElementById("haustier_1_url").value = pet_1_link;
document.getElementById("haustier_1_name").value = pet_1_name;
addGlobalStyle('#haustier_1_url, #haustier_1_Name {background:green; color:white;}')
}

// haustier 2 auslesen
function pet_2(resp4,Name) {

try {

var pre_split = "/user/"+Name+"/pet/";

var pet_2_id = resp4.responseText.split(pre_split)[3].split('"')[0];
var pet_2_name = resp4.responseText.split('class="pet fs12 ldN coB3">')[2].split('</a>')[0];

var pet_2_link = "/user/"+Name+"/pet/"+pet_2_id;

GM_setValue("haustier_2_url", pet_2_link);
GM_setValue("haustier_2_name", pet_2_name);

set_value_pet_2(pet_2_link,pet_2_name)

} catch(err) { alert('Fehler beim auslesen!!\n\nEntweder ist kein 2tes Tier vorhanden oder es trat ein Fehler beim auslesen auf.\nIst ein 2tes Tier vorhanden dann bitte den Link und den Namen manuell eintragen.') }

}
function set_value_pet_2(pet_2_link,pet_2_name) {
document.getElementById("haustier_2_url").value = pet_2_link;
document.getElementById("haustier_2_name").value = pet_2_name;
addGlobalStyle('#haustier_2_url, #haustier_2_Name {background:green; color:white;}')
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