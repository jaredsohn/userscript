// ==UserScript==
// @name           osm
// @namespace      osm
// @include        http://www.onlinesoccermanager.nl/*
// @include        http://onlinesoccermanager.nl/*
// @copyright      Jordy Kroeze
// @Author         Jordy Kroeze
// ==/UserScript==

var tableAdStandard = document.getElementById('tableAdStandard');
if (tableAdStandard) {
    tableAdStandard.parentNode.removeChild(tableAdStandard);
}

var divSideBar = document.getElementById('divSideBar');
if (divSideBar) {
    divSideBar.parentNode.removeChild(divSideBar);
}

var mainmenu = document.getElementById('mainmenu');
if (mainmenu) {
    mainmenu.parentNode.removeChild(mainmenu);
}

var divFooterInfo = document.getElementById('divFooterInfo');
if (divFooterInfo) {
    divFooterInfo.parentNode.removeChild(divFooterInfo);
}

var divAdBannerTop = document.getElementById('divAdBannerTop');
if (divAdBannerTop) {
    divAdBannerTop.parentNode.removeChild(divAdBannerTop);
}

var teldiv = document.getElementsByTagName('div').length;

for(teller = '0'; teller<teldiv; teller++){

if(document.getElementsByTagName('div')[teller].style.width == '554px'){
document.getElementsByTagName('div')[teller].style.width = '775px';
}

if(document.getElementsByTagName('div')[teller].style.width == '520px'){
document.getElementsByTagName('div')[teller].style.width = '750px';
}

if(document.getElementsByTagName('div')[teller].className == 'renderInfo'){
document.getElementsByTagName('div')[teller].style.display = 'none';
}
}

var domein = document.domain;

var menu = '<div id="divTitleBar">Menu</div>'
+'<div style="width: 206px;" class="frameContent">'
+'<div class="frameContentImages">'
+'<div class="frameContentTopLeft blue">&nbsp;</div>'
+'<div style="width: 172px; color: yellow;" class="frameContentTopMiddle blue"></div>'
+'<div class="frameContentTopRight blue">&nbsp;</div>'
+'</div>'
+'<div style="" class="frameContentHolder">'
+'<input type="hidden" id="nl"/>'

+'<b>Manager</b><br />'
+'<li><a href="main.asp">Startpunt</a></li>'
+'<li><a href="profile.asp">Profiel</a></li>'
+'<li><a href="resign.asp">Ontslag nemen</a></li>'
+'<li><a href="ticketstatus.asp">Mijn seizoenskaarten</a></li>'
+'<li><a href="tickets/offers.asp?gratis">Gratis kaarten</a></li>'
+'<li><a href="ticketbox.asp">Voordelen</a></li>'
+'<li><a href="faq.asp?section=2">Vragen & Antwoorden</a></li>'
+'<li><a href="crews.asp">Crew ranking</a></li>'
+'<li><a href="crew.asp">Mijn crew</a></li>'
+'<li><a href="faq.asp?section=7">Vragen & Antwoorden</a></li>'
+'<li><a href="logout.aspt">Uitloggen</a></li><br />'

+'<b>Resultaten</b><br />'
+'<li><a href="results.asp">Uitslagen</a></li>'
+'<li><a href="choose_commentator.asp">Scorebord</a></li>'
+'<li><a href="newspaper.asp">Krant</a></li>'
+'<li><a href="compevents.asp">Gebeurtenissen</a></li>'
+'<li><a href="tickets/offers.asp?gratis">Mijn team</a></li>'
+'<li><a href="transfers.asp">Deze competitie</a></li><br />'

+'<b>Team</b><br />'
+'<li><a href="squad.asp">Mijn team</a></li>'
+'<li><a href="formation.asp">Formatie</a></li>'
+'<li><a href="lineup.asp">Opstelling</a></li>'
+'<li><a href="specialists.asp">Specialisten</a></li>'
+'<li><a href="tactic.asp">Tactiek</a></li>'
+'<li><a href="trainsecret.asp">Besloten training</a></li>'
+'<li><a href="trainingcamp.asp">Trainingskamp</a></li><br />'

+'<b>Spelers</b><br />'
+'<li><a href="squadreport.asp">Beoordelingen</a></li>'
+'<li><a href="offers.asp">Aanbiedingen</a></li>'
+'<li><a href="scout.asp">Scout</a></li>'
+'<li><a href="trainingindividual.asp">Training</a></li>'
+'<li><a href="transfer.asp">Transferlijst</a></li><br />'

+'<b>Club</b><br />'
+'<li><a href="board.asp">Het bestuur</a></li>'
+'<li><a href="finance.asp">Financiën</a></li>'
+'<li><a href="medic.asp">Medische staf</a></li>'
+'<li><a href="staff.asp">Personeel</a></li>'
+'<li><a href="sponsors.asp">Sponsors</a></li>'
+'<li><a href="stadium.asp">Stadion</a></li><br />'

+'<b>Overzichten</b><br />'
+'<li><a href="league.asp">Competitie tussenstand</a></li>'
+'<li><a href="cup.asp">Bekertoernooi</a></li>'
+'<li><a href="schedule.asp">Wedstrijdschema</a></li>'
+'<li><a href="fixtures.asp">Volgende speeldag</a></li>'
+'<li><a href="countries.asp">Actieve competities</a></li>'
+'<li><a href="tblcountries.asp">Landenlijst</a></li>'
+'<li><a href="statsteam.asp">Team statistieken</a></li>'
+'<li><a href="topscorers.asp">Competitie statistieken</a></li>'
+'<li><a href="ranking.asp">Manager Top-100</a></li>'
+'<li><a href="rankcountries.asp">Top-100 per land</a></li>'
+'<li><a href="records.asp">Records</a></li><br />'


+'<b>Communicatie</b><br />'
+'<li><a href="pm.asp">Berichten</a></li>'
+'<li><a href="forums">Forums</a></li>'
+'<li><a href="managers.asp">Managerlijst</a></li>'
+'<li><a href="cheaters.asp">Cheater melden</a></li>'
+'<li><a href="searchman.asp">Manager zoeken</a></li><br />'

+'<b>Help</b><br />'
+'<li><a href="faq.asp">Vragen & Antwoorden</a></li>'
+'<li><a href="terms.asp">Regels</a></li>'
+'<li><a href="http://www.osmwiki.nl/Handleiding">Handleiding</a></li>'
+'<li><a href="http://www.osmwiki.nl/OSM_VoetbalManager_Wiki">OSM Wiki</a></li>'
+'<li><a href="http://www.osmwiki.nl/Mobiel">OSM Mini</a></li><br />'

+'<b>Overig</b><br />'
+'<li><a href="newsupdates.asp">Nieuws & Updates</a></li>'
+'<li><a href="downloads.asp">Downloads</a></li>'
+'<li><a href="shop/?section=shirts-all">OSM T-Shirts</a></li>'
+'<li><a href="tellafriend.asp">Vrienden uitnodigen</a></li><br />'

+'<br class="clear">'
+'</div>'
+'<div class="frameContentImages">'
+'<div class="frameContentBottomLeft blue">&nbsp;</div>'
+'<div style="width: 172px;" class="frameContentBottomMiddle blue">&nbsp;</div>'
+'<div class="frameContentBottomRight blue">&nbsp;</div>'
+'</div>'
+'</div><br class="clear">';

var menudiv = document.createElement("div");
menudiv.id = 'menu';
var tekst = menu;
menudiv.innerHTML = tekst;
var voor = document.getElementById('divTitleBar');
voor.parentNode.insertBefore(menudiv,voor);