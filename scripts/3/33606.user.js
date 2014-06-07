// ==UserScript==
// @name		The almop tool -cosrairs tool mod
// @version 	65
// @namespace 	Gboz
// @author		Gboz
// @description	The Corsairs alliance Tools - ika-core
// @include		http://s*.ikariam.*/*
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched.
// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

// Ika-core, a collection of modules(sripts) to beutify and assist web page interaction.
//    Copyright (C) 2008 GBozouris
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
//
//    You are not allowed to offer this programm for download or redistribute it 
//    in any way except directions steted at the www.ika-core.org website.
//    This programm is offered for download only at www.ika-core.org.
//     If you downloaded this programm from another location please report it 
//     at the www.ika-core.org website.
//     This programm maybe downloaded automatically by You but only form the location 
//     mentioned above.
//     The code remains as is, no alteration or modification should be done without the 
//     written permission of the auhtor..
//      This script is not permited to be incorporated into any your program/s or 
//     any proprietary programs.
//     This script will comunicate with www.ika-core.org to check for upgrades,
//     or for any other means. Any damage by usage of bandwidth by this programm
//     is cosidered your expense and fault and not the auhtors.
//     In other means , you know what you are doing.

var queryserver=getserverindex();
var serverindex=queryserver[1];
var world = /([0-9]+)/.exec(location.host);
	world = RegExp.$1;
var country=queryserver[0];
var alliancefullnm;var alliancenm;var alliance;var chaturl;var forumurl;var forumurlnew;var Alliance;var Allies;var NoAlliance;var Enemies;var corsairmenu;var legend;var TreatyYes;var TreatyNo;var updatenotification;var maplegend;var txtplswait;var txtmap;var txtrefresh;var txtcoorddata;var txtmapdata;var txtmapdata2;var txtpagedata;var txtinfodata;var txtsorting;var txtchkplayer;var scheduler=[[0,0]];var bubbles=0;var timelapse=0;
var getbody=document.getElementsByTagName('body')[0];
var core_vers=14;
var ika="http://www.ika-core.org/search";
function lang() {
	//used to check if a lang is working
	//country='es';
	switch (country) {
	case 'gr':
		ogameLink='http://ikariam.ogame-world.gr';
		corsairmenu=[
		//this one is for the title of the Tools menu
		[ alliancefullnm+' Tools' , '', '',''],
		// URL , Info, Button Text, OnClick event, '-' for spacer
		['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'Στείλε μήνυμα σε σε Almopανιούς ', 'Μήνυμα συμμαχίας','','-'],
		[ forumurl, ' Να τσεκάρω το φόρουμ??','Forum: '+alliancefullnm ,''],
		[ forumurlnew, ' Νέα μαντάτα στο φόρουμ ',alliancefullnm +': Forum News','','-'],
		[ chaturl , ' Τσατ σε νεό παράθυρο ' , 'Chatbox(New Window)' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		['', ' Τσάτ σε νέο frame  ','Chatbox(Frame)','makeframes(\''+chaturl+'\');','-' ],
		['http://ikariamlibrary.com/?content=IkaFight' , ' Calculates a battle ... ', 'Battle Calc','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		[ogameLink+'/suche.php?view=suche_deluxe&land_i='+serverindex+'&welt='+world, ' Άκου που σου λέω ', 'Μην πατήσεις αυτό το κουμπί',''],
		[ogameLink+'/suche.php?view=suche_spieler&land_i='+serverindex+'&welt='+world , ' Ναι ψάξε ', 'Ψάξε παίκτη',''],
		[ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' kαι τη πόλη θέλω να ψάξω ', 'Ψάξε για τις πόλεις ενός παίκτη',''],
		[ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world , ' Ψάξε νησί  ', 'Τα νησιά του παίχτη','','-'],
		['http://userscripts.org/scripts/source/33606.user.js' , 'Gets the latest script', ' Update '+alliancefullnm+' Tools ','']];
		//Island view Map Legend
		legend ='<font color="'+Alliance[0]+'" size=1>Ακρίτες</font><br>'+
		'<font color="'+Allies[0]+'" size=1>--- Φιλαράκια</font><br>'+
		'<font color="'+NoAlliance[0]+'" size=1>---  Ελεύθεροι  </font><br>'+
		'<font color="'+Enemies[0]+'" size=1>---  Οι κακοί της παρέας</font><br>';
		TreatyYes="Έχεις πολιτισμική συμφωνία με αυτό το παίχτη";
		TreatyNo="ΔΕΝ 'εχεις πολιτισμική συμφωνία με αυτό το παίχτη";
		updatenotification='Γεια!! ¨Εχει βγεί νεά έκδοση του script  '+alliancefullnm+' Tools.\n Κανόνισε να το κατεβάσεις';
		maplegend=['Το νησάκι σου','Gesuchte Inseln','Γ?bereinstimmende Inseln','Keine Γ?bereinstimmung','Θάλασσα','Κλίκαρε για περισσότερες πληροφορίες.'];
		txtplswait="Περίεμενε λιγάκι";
		txtmap="Χάρτης";
		txtrefresh="Refresh";
		txtcoorddata='- Τσιμπάω δεδομένα';
		txtmapdata='-Τσιμπάω δεδομένα';
		txtmapdata2='- Τσιμπάω δεδομένα';
		txtpagedata='- Τσιμπάω δεδομένα';
		txtinfodata='- Τσιμπάω δεδομένα';
		txtsorting='- Ταξινομημένοι παίκτες';
		txtchkplayer='- Ελέγχω το παίκτη';
		CultureTreaties='ultur'; //magic word for treaties fix
		CultureTreatiesCancel=" Ακύρωσε πολιτισμική συμφωνία ,έτσι να του τη σπάσεις";
		CultureTreatiesRequest=" Ζήτησησε πολιτιστική συμφωνία";
		break;
	case 'fr':
		ogameLink='http://ikariam.ogame-world.com/fr';
		corsairmenu=[
		//this one is for the title of the Tools menu
		[ alliancefullnm+' Tools'  , '', '',''],
		//    URL , Info, Button Text, OnClick event,   '-' for spacer
		['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'Envoyer un message Γ  tous les membres', 'Envoyer un message','','-'],
		[ forumurl, 'Forum des '+alliancenm ,'Forum',''],
		[ forumurlnew, 'Voir les derniers posts '+alliancenm, 'Nouveaux posts' ,'','-'],
		[ chaturl , 'Discuter avec les autres membres' , 'Chatbox' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		['', ' Discuter avec les autres membres ','Chatbox(Frame)','makeframes(\''+chaturl+'\');' ,'-'],
		['http://ikariamlibrary.com/?content=IkaFight' , 'Simulateur de bataille', 'Simulateur de bataille','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		[ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Chercher une ville ', 'Chercher une ville',''],
		[ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world, ' Chercher une Γ®le ', 'Chercher une Γ®le','','-'],
		['http://www.ika-core.com' , 'Le dernier script', ' Update du script des '+alliancenm ,'']];
		//Island view Map Legend
		legend ='<font color="'+Alliance[0]+'" size=1>β€Ά '+alliancefullnm+'</font><br>'+
				'<font color="'+Allies[0]+'" size=1>β€Ά Allies</font><br>'+
				'<font color="'+NoAlliance[0]+'" size=1>β€Ά Sans Alliance</font><br>'+
				'<font color="'+Enemies[0]+'" size=1>β€Ά Enemies</font><br>';
		TreatyYes="You already have a cultural Treaty with this Player";
		TreatyNo="No cultural treaties found for this player.";
		updatenotification='Il y a une nouvelle version du script des '+alliancefullnm+'.\n Mettez Γ  jour le script en www.ika-core.org?';
		txtplswait="Attendez";
		txtmap="Carte";
		txtrefresh="Consultez";
		maplegend=['Ton ile', 'Recherche ile','Ton ile avec recherche ile','Pas assortiment','Mer','Click on any coordinates to view info.'];
		txtcoorddata='- Information en cours';
		txtmapdata='- Carte en cours(Jouer)';
		txtmapdata2='- Carte en cours(Allies)';
		txtpagedata='- Page en cours';
		txtinfodata='- Information en cours';
		txtsorting='- Classement de joueur';
		txtchkplayer='- Compte de joueur';
		CultureTreaties='ultur'; //magic word
		CultureTreatiesCancel=" Cancel Cultural Treaty";
		CultureTreatiesRequest=" Request Cultural Treaty";
		break;
	case 'tr':
		ogameLink='http://ikariam.ogame-world.com/tr';
		corsairmenu=[
		//this one is for the title of the Tools menu
		[	alliancefullnm+' AraΓ§larΔ±' , '', '',''],
		//    URL , Info, Button Text, OnClick event,   '-' for spacer
		['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'BΓΌtΓΌn ΓΌyelere mesaj gΓ¶nder', 'SirkΓΌler Mesaj','','-'],
		[ forumurl, ' Δ°ttifak Forumu ',alliancenm+' Forum ',''],
		[ forumurlnew, ' Δ°ttifak Forumu, son eklenenler ',alliancenm +' yeni forum mesajlarΔ±','','-'],
		[ chaturl , ' Δ°ttifak Sohbet, yeni pencerede gΓ¶sterim' , 'Sohbet (Yeni Pencere)' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		['', ' Δ°ttifak Sohbet, Γ§erΓ§eve iΓ§inde gΓ¶sterim ','Sohbet (Γ‡erΓ§eve)','makeframes(\''+chaturl+'\');','-' ],
		['http://ikariamlibrary.com/?content=IkaFight' , 'SavaΕ? hesaplamalarΔ± ... ', 'SavaΕ? HesaplayΔ±cΔ±','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		[ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Ε?ehir bulma sayfasΔ± ', 'Ε?ehir Arama',''],
		[ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world, ' Ada bulma sayfasΔ± ', 'Ada Arama','','-'],
		['http://www.ika-core.com' , 'Eklenti gΓΌncelleme', alliancenm+' AraΓ§larΔ± GΓΌncelle ','']];
		//Island view Map Legend
		legend ='<table style="cursor:default"><TR style="color:'+Alliance[0]+';font-size:small;font-weight:900;"><TD><font size=5>β?†&nbsp;</font></TD><TD> '+alliancefullnm+'</TD>'+
				'<TR style="color:'+Allies[0]+';font-size:small;font-weight:200;"><TD><font size=2>&nbsp;β?‘</font></TD><TD>Dost</TD>'+
				'<TR style="color:'+NoAlliance[0]+';font-size:small;font-weight:200"><TD><font size=2>&nbsp;Ξ¦</font></TD><TD>Δ°ttifaksΔ±z</TD>'+
				'<TR style="color:'+Enemies[0]+';font-size:small;font-weight:200"><TD><font size=2>&nbsp;Ξ¨</font></TD><TD>DΓΌΕ?man</TD></TR><table>';
		TreatyYes="Bu oyuncu ile zaten kΓΌltΓΌrel antlaΕ?manΔ±z var";
		TreatyNo="Bu oyuncu ile kΓΌltΓΌrel antlaΕ?manΔ±z yok.";
		updatenotification=alliancenm+' AraΓ§larΔ±nΔ±n yeni sΓΌrΓΌmΓΌ var.\n www.ika-core.org.';
		txtplswait="LΓΌtfen Bekleyin";
		txtmap="Harita";
		txtrefresh="Yenile";
		maplegend=['Sizin AdalarΔ±nΔ±z','Aranan Adalar','Sizin ve Aranan Adalar','Uymayan','Deniz','Bilgi iΓ§in adaya tΔ±klayΔ±n.'];
		txtcoorddata='- Koordinat Verisi AlΔ±nΔ±yor';
		txtmapdata='- Harita AlΔ±nΔ±yor(Oyuncu)';
		txtmapdata2='- Harita AlΔ±nΔ±yor(Δ°ttifak)';
		txtpagedata='- Sayfa AlΔ±nΔ±yor';
		txtinfodata='- Bilgi AlΔ±nΔ±yor';
		txtsorting='- Oyuncular SΔ±ralanΔ±yor';
		txtchkplayer='- Oyuncu Kontrol Ediliyor';
		CultureTreaties='ΓΌltΓΌr'; //magic word for treaties fix, does it work??? please post on userscripts
		CultureTreatiesCancel=" KΓΌltΓΌrel AnlaΕ?mayΔ± Δ°ptal Et";
		CultureTreatiesRequest=" KΓΌltΓΌrel AnlaΕ?ma Teklif Et";
		break;
	case 'de':
		ogameLink='http://ikariam.ogame-world.de';
		corsairmenu=[
		//this one is for the title of the Tools menu
		[ alliancefullnm+' Tools' , '', '',''],
		// URL , Info, Button Text, OnClick event, '-' for spacer
		['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'Sende Mail an alle Allianzmitglieder ', 'Allianz Rundmail','','-'],
		[ forumurl, ' Zum Allianz-Forum ','Forum: '+alliancefullnm ,''],
		[ forumurlnew, ' Neue BeitrΓ¤ge im Forum ',alliancefullnm +': Forum News','','-'],
		[ chaturl , ' Allianz Chat, in neuem Fenster ' , 'Chatbox(New Window)' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		['', ' Allianz Chat, in einem Frame ','Chatbox(Frame)','makeframes(\''+chaturl+'\');','-' ],
		['http://ikariamlibrary.com/?content=IkaFight' , ' Calculates a battle ... ', 'Battle Calc','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		[ogameLink+'/suche.php?view=suche_deluxe&land_i='+serverindex+'&welt='+world, ' DELUXE ', 'Suche DELUXE',''],
		[ogameLink+'/suche.php?view=suche_spieler&land_i='+serverindex+'&welt='+world , ' Tool zum suchen eines Spielers ', 'Suche Spieler',''],
		[ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Tool zum suchen von StΓ¤dten eines Spielers ', 'Suche Stadt',''],
		[ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world , ' Tool zum suchen von Inseln eines Spielers ', 'Suche Insel','','-'],
		['http://www.ika-core.com' , 'Gets the latest script', ' Update '+alliancefullnm+' Tools ','']];
		//Island view Map Legend
		legend ='<font color="'+Alliance[0]+'" size=1>β€Ά '+alliancefullnm+'</font><br>'+
		'<font color="'+Allies[0]+'" size=1>β€Ά Freunde</font><br>'+
		'<font color="'+NoAlliance[0]+'" size=1>β€Ά FREIWILD :)</font><br>'+
		'<font color="'+Enemies[0]+'" size=1>β€Ά Feinde</font><br>';
		TreatyYes="Es besteht bereits ein KulturgΓΌterabkommen mit diesem Spieler.";
		TreatyNo="Es besteht kein KulturgΓΌterabkommen mit diesem Spieler.";
		updatenotification='Es gibt eine neue Version vom '+alliancefullnm+' Tools.\n Jezt das Script updaten auf www.ika-core.org?';
		maplegend=['Deine Inseln','Gesuchte Inseln','Γ?bereinstimmende Inseln','Keine Γ?bereinstimmung','Sea','Click fΓΌr mehr Infos.'];
		txtplswait="Bitte warten!";
		txtmap="Karte";
		txtrefresh="Refresh";
		txtcoorddata='- Hole daten der Koordinaten';
		txtmapdata='- Hole Karte(spieler)';
		txtmapdata2='- Hole Karte(Alianz)';
		txtpagedata='- Hole Seite';
		txtinfodata='- Hole Info';
		txtsorting='- Sortiere Spieler';
		txtchkplayer='- Checke Spieler';
		CultureTreaties='ultur'; //magic word for treaties fix
		CultureTreatiesCancel=" KulturgΓΌterabkommen kΓΌndigen";
		CultureTreatiesRequest=" KulturgΓΌterabkommen anbieten";
		break;
	case 'es':
		ogameLink='http://ikariam.ogame-world.com';
		corsairmenu=[
		//this one is for the title of the Tools menu
		[ 'Herramientas ' + alliancefullnm  , '', '',''],
		// URL , Info, Button Text, OnClick event, '-' for spacer
		['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' ,'Enviar mensaje a todos los aliados', 'Mensaje a la Alianza','','-'],
		[ forumurl, ' Al Foro de la Alianza ','Foro '+alliancefullnm ,''],
		[ forumurlnew, ' A los mensajes no leΓ­dos del Foro de la Alianza ', 'Foro ' + alliancefullnm +'	mensajes no leΓ­dos','','-'],
		[ chaturl , ' Chat de la Alianza, abre en nueva ventana' , 'Chatbox(Nueva Ventana)','window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		['', ' Chat de la Alianza, muestra en chat en frames sin recargarse','Chatbox(Frame)','makeframes(\''+chaturl+'\');','-' ],
		['http://ikariamlibrary.com/?content=IkaFight' , ' Calcula una batalla ... ', 'Calculadora de Batallas','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		[ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Buscar ciudades de un jugador ', 'Buscar Ciudad',''],
		[ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world , ' Buscar islas de un jugador ', 'Buscar Islas','','-'],
		['http://www.ika-core.com' , 'Obtener el ΓΊltimo script', ' Actualizar Herramientas'+alliancefullnm,'']];
		//Island view Map Legend
		legend ='<font color="'+Alliance[0]+'" size=1>β€Ά '+alliancefullnm+'</font><br>'+
		'<font color="'+Allies[0]+'" size=1>β€Ά Aliados</font><br>'+
		'<font color="'+NoAlliance[0]+'" size=1>β€Ά No Aliados</font><br>'+
		'<font color="'+Enemies[0]+'" size=1>β€Ά Enemigos</font><br>';
		TreatyYes="TΓΊ tienes actualmente un tratado cultural con este jugador";
		TreatyNo="No tienes tratados culturales con este jugador.";
		updatenotification='Existe una nueva versiΓ³n de las Herramientas '+alliancefullnm+' .\n Oprime OK si deseas ir a www.ika-core.org y actualizarlas ahora.';
		maplegend=['Tus Islas','Resultado de Islas','Tus Islas y Resultados','No encontrado','Mar','Oprime en cualquier coordenada para ver informaciΓ³n.'];
		txtplswait="Espere por favor";
		txtmap="Mapa";
		txtrefresh="Refrescar";
		txtcoorddata='- Obteniendo Datos de Coordenadas';
		txtmapdata='- Obteniendo Mapa(jugador)';
		txtmapdata2='- Obteniendo Mapa(aliado)';
		txtpagedata='- Obteniendo PΓ΅gina';
		txtinfodata='- Obteniendo InformaciΓ³n';
		txtsorting='- Ordenando Jugadores';
		txtchkplayer='- Verificando Jugador';
		CultureTreaties='ultur'; //magic word for treaties fix
		CultureTreatiesCancel=" Cancelar Tratados Culturales";
		CultureTreatiesRequest=" Solicitar Tratados Culturales";
		break;
      case 'il':
            ogameLink='http://ikariam.ogame-world.com';
            corsairmenu=[
            //this one is for the title of the Tools menu
            [ alliancefullnm+' Tools' , '', '',''],
            // URL , Info, Button Text, OnClick event, '-' for spacer
            ['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'Χ©Χ?Χ— Χ”Χ•Χ“ΧΆΧ” Χ?Χ›Χ? Χ—Χ‘Χ¨Χ™ Χ”Χ‘Χ¨Χ™Χ?', 'Χ©Χ?Χ— Χ”Χ•Χ“ΧΆΧ? Χ©Χ¨Χ©Χ¨Χ?','','-'],
            [ forumurl, ' Χ›Χ Χ™Χ΅Χ” Χ?Χ¤Χ•Χ¨Χ•Χ? ','Forum '+alliancefullnm ,''],
            [ forumurlnew, ' Χ?Χ¦Χ™Χ’ Χ?Χ? Χ›Χ? Χ”Χ”Χ•Χ“ΧΆΧ•Χ? Χ”Χ—Χ“Χ©Χ•Χ? Χ?Χ?Χ– Χ‘Χ™Χ§Χ•Χ¨Χ? Χ”Χ?Χ—Χ¨Χ•Χ? Χ‘Χ¤Χ•Χ¨Χ•Χ? ',alliancefullnm +' Χ”Χ•Χ“ΧΆΧ•Χ? Χ—Χ“Χ©Χ•Χ?','','-'],
            [ chaturl , ' Χ”Χ?Χ›Χ?Χ‘Χ•Χ?, Χ¤Χ•Χ?Χ— Χ?Χ? Χ”Χ”Χ?Χ›Χ?Χ‘Χ•Χ? Χ‘Χ—Χ?Χ•Χ? Χ—Χ“Χ©' , 'Χ”Χ?Χ›Χ?Χ‘Χ•Χ? (Χ—Χ?Χ•Χ? Χ—Χ“Χ©)' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
            ['', ' Χ”Χ?Χ›Χ?Χ‘Χ•Χ?, Χ?Χ¦Χ™Χ’ Χ?Χ? Χ”Χ”Χ?Χ›Χ?Χ‘Χ•Χ? Χ‘Χ?Χ•Χ? Χ?Χ΅Χ’Χ¨Χ? ','Χ”Χ?Χ›Χ?Χ‘Χ•Χ?(Χ?Χ΅Χ’Χ¨Χ?)','makeframes(\''+chaturl+'\');','-' ],
            [ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Χ›Χ?Χ™ Χ‘Χ›Χ“Χ™ Χ?Χ?Χ¦Χ•Χ? Χ?Χ? Χ”ΧΆΧ¨Χ™Χ? Χ©Χ? Χ”Χ©Χ—Χ§Χ? ', 'Χ—Χ¤Χ© ΧΆΧ™Χ¨',''],
            [ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world , ' Χ›Χ?Χ™ Χ‘Χ›Χ“Χ™ Χ?Χ?Χ¦Χ•Χ? Χ?Χ? Χ”Χ?Χ™ Χ©Χ? Χ”Χ©Χ—Χ§Χ? ', 'Χ—Χ™Χ•Χ¤Χ© Χ?Χ™Χ™Χ?','','-'],
            ['http://www.ika-core.com'  , 'Χ?ΧΆΧ©Χ›Χ? Χ?Χ? Χ”Χ΅Χ§Χ¨Χ™Χ¤Χ?', ' ΧΆΧ™Χ“Χ›Χ•Χ? '+alliancefullnm+' Tools ','']];
            //Island view Map Legend
            legend ='<font>ΓΆβ‚¬ΒΆ '+alliancefullnm+'</font>'+
            '<font>ΓΆβ‚¬ΒΆ Χ—Χ‘Χ¨ Χ‘Χ¨Χ™Χ?</font>'+
            '<font>ΓΆβ‚¬ΒΆ Χ—Χ΅Χ¨ Χ‘Χ¨Χ™Χ?</font>'+
            '<font>ΓΆβ‚¬ΒΆ Χ?Χ•Χ™Χ™Χ‘Χ™Χ?</font>';
            TreatyYes="Χ›Χ‘Χ¨ Χ™Χ© Χ?Χ? Χ—Χ•Χ–Χ” Χ Χ›Χ΅Χ™ Χ?Χ¨Χ‘Χ•Χ? ΧΆΧ? Χ©Χ—Χ§Χ? Χ–Χ”";
            TreatyNo="Χ?Χ? Χ Χ?Χ¦Χ?Χ• Χ©Χ•Χ? Χ—Χ•Χ–Χ™ Χ Χ›Χ΅Χ™ Χ?Χ¨Χ‘Χ•Χ? Χ‘Χ©Χ‘Χ™Χ? Χ©Χ—Χ§Χ? Χ–Χ”.";
            updatenotification='Χ™Χ©Χ Χ” Χ’Χ™Χ¨Χ΅Χ? Χ—Χ“Χ©Χ” Χ©Χ? '+alliancefullnm+' Tools.\n Χ?Χ—Χ¥ ΧΆΧ? OK Χ?Χ? Χ‘Χ¨Χ¦Χ•Χ Χ? Χ?ΧΆΧ“Χ›Χ? ΧΆΧ›Χ©Χ™Χ•.';
            maplegend=['Χ”Χ?Χ™Χ™Χ? Χ©Χ?Χ?','Χ?Χ§Χ‘Χ? Χ?Χ•Χ¦Χ?Χ•Χ? Χ?Χ”Χ?Χ™Χ™Χ?','Χ”Χ?Χ™Χ™Χ? Χ©Χ?Χ? Χ•Χ”Χ?Χ•Χ¦Χ?Χ•Χ?','Χ?Χ™Χ? Χ”Χ?Χ?Χ?Χ”','Χ™Χ?','Χ?Χ—Χ¥ ΧΆΧ? Χ›Χ? Χ Χ§Χ•Χ“Χ? Χ¦Χ™Χ•Χ? Χ‘Χ›Χ“Χ™ Χ?Χ§Χ‘Χ? Χ?Χ™Χ“ΧΆ.'];
            txtplswait="Χ”Χ?Χ?Χ? Χ‘Χ‘Χ§Χ©Χ”";
            txtmap="Χ?Χ¤Χ”";
            txtrefresh="Χ¨ΧΆΧ Χ?";
            txtcoorddata='- Χ?Χ•ΧΆΧ? Χ Χ§Χ•Χ“Χ•Χ? Χ¦Χ™Χ•Χ?';
            txtmapdata='- Χ?Χ•ΧΆΧ? Χ?Χ¤Χ”(Χ©Χ—Χ§Χ?)';
            txtmapdata2='- Χ?Χ•ΧΆΧ? Χ?Χ¤Χ”(Χ‘Χ¨Χ™Χ?)';
            txtpagedata='- Χ?Χ•ΧΆΧ? Χ“Χ£';
            txtinfodata='- Χ?Χ•ΧΆΧ? Χ?Χ™Χ“ΧΆ';
            txtsorting='- Χ?Χ?Χ™Χ™Χ? Χ©Χ—Χ§Χ Χ™Χ?';
            txtchkplayer='- Χ‘Χ•Χ“Χ§ Χ©Χ—Χ§Χ?';
            CultureTreaties='ultur'; //magic word for treaties fix
            CultureTreatiesCancel=" Χ‘Χ?Χ? Χ—Χ•Χ–Χ” Χ Χ›Χ΅Χ™ Χ?Χ¨Χ‘Χ•Χ?";
            CultureTreatiesRequest=" Χ‘Χ§Χ© Χ—Χ•Χ–Χ” Χ Χ›Χ΅Χ™ Χ?Χ¨Χ‘Χ•Χ?";
            break;
	default:
		ogameLink='http://ikariam.ogame-world.com';
		corsairmenu=[
		//this one is for the title of the Tools menu
		[	alliancefullnm+' Tools' , '', '',''],
		//    URL , Info, Button Text, OnClick event,   '-' for spacer
		['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'Send message to all the allies', 'Send Alliance Message','','-'],
		[ forumurl, ' To the Forum of the Alliance ','Forum '+alliancefullnm ,''],
		[ forumurlnew, ' To the Forum of the Alliance, latest posts ',alliancefullnm +' new forum posts','','-'],
		[ chaturl , ' Alliance Chat, opens in a new window' , 'Chatbox(New Window)' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		['', ' Alliance Chat, displays chat in frames with no reload ','Chatbox(Frame)','makeframes(\''+chaturl+'\');','-' ],
		['http://ikariamlibrary.com/?content=IkaFight' , ' Calculates a battle ... ', 'Battle Calc','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		[ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Tool to find cities of a player ', 'Search City',''],
		[ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world , ' Tool to find island of a player ', 'Search Islands','','-'],
		['http://www.ika-core.com' , 'Gets the latest script', ' Update '+alliancefullnm+' Tools ','']];
		//Island view Map Legend
		legend ='<font color="'+Alliance[0]+'" size=1>β€Ά '+alliancefullnm+'</font><br>'+
				'<font color="'+Allies[0]+'" size=1>β€Ά Allies</font><br>'+
				'<font color="'+NoAlliance[0]+'" size=1>β€Ά No Alliance</font><br>'+
				'<font color="'+Enemies[0]+'" size=1>β€Ά Enemies</font><br>';
		TreatyYes="You already have a cultural Treaty with this Player";
		TreatyNo="No cultural treaties found for this player.";
		updatenotification='There is a newer version of '+alliancefullnm+' Tools.\n Click on OK if you would like to go to www.ika-core.org and update now.';
		maplegend=['Your Islands','Resulting Island','Your Islands and Results','Not matching','Sea','Click on any coordinates to view info.'];
		txtplswait="Please Wait";
		txtmap="Map";
		txtrefresh="Refresh";
		txtcoorddata='- Getting Coords Data';
		txtmapdata='- Getting Map(player)';
		txtmapdata2='- Getting Map(ally)';
		txtpagedata='- Getting Page';
		txtinfodata='- Getting Info';
		txtsorting='- Sorting Players';
		txtchkplayer='- Checking Player';
		CultureTreaties='ultur'; //magic word for treaties fix
		CultureTreatiesCancel=" Cancel Cultural Treaty";
		CultureTreatiesRequest=" Request Cultural Treaty";
		break;
	}
}

function getserverindex(){
	var servers={
	'ikariam.de':['de','0'],
	'ikariam.org':['en','1'],
	'ae.ikariam.com':['ae','2'],
	'ar.ikariam.com':['ae','3'],
	'ba.ikariam.com':['ba','4'],
	'ikariam.bg':['bg','5'],
	'ikariam.com.br':['br','6'],
	'by.ikariam.org':['by','7'],
	'cl.ikariam.org':['bl','8'],
	'ikariam.cn':['cn','9'],
	'ikariam.cz':['cz','10'],
	'ikariam.dk':['dk','11'],
	'ee.ikariam.org':['ee','12'],
	'eg.ikariam.org':['eg','13'],
	'ikariam.es':['es','14'],
	'fi.ikariam.com':['fi','15'],
	'ikariam.fr':['fr','16'],
	'ikariam.gr':['gr','17'],
	'hr.ikariam.org':['hr','18'],
	'ikariam.hk':['hk','19'],
	'ikariam.hu':['hu','20'],
	'id.ikariam.org':['id','21'],
	'ih.ikariam.org':['ih','22'],
	'ikariam.co.il':['il','23'],
	'in.ikariam.org':['in','24'],
	'ir.ikariam.org':['in','25'],
	'ikariam.it':['it','26'],
	'jp.ikariam.org':['jp','27'],
	'kr.ikariam.org':['kr','28'],
	'ikariam.lt':['lt','29'],
	'ikariam.lv':['lv','30'],
	'me.ikariam.org':['me','31'],
	'ikariam.com.mx':['mx','32'],
	'ikariam.nl':['nl','33'],
	'ikariam.no':['no','34'],
	'ikariam.pe':['pe','35'],
	'ph.ikariam.org':['ph','36'],
	'ikariam.pl':['pl','37'],
	'ikariam.com.pt':['pt','38'],
	'ikariam.ro':['ro','39'],
	'ikariam.ru':['ru','40'],
	'sa.ikariam.org':['sa','41'],
	'ikariam.se':['se','42'],
	'si.ikariam.org':['si','43'],
	'ikariam.sk':['sk','44'],
	'ikariam.net':['tr','45'],
	'ikariam.tw':['tw','46'],
	'ikariam.com':['us','47'],
	'ua.ikariam.org':['ua','48'],
	'ikariam.com.ve':['ve','49'],
	'vn.ikariam.org':['vn','50']
	}
	return servers[location.host.substr(location.host.indexOf('.')+1)];
}

//check for update
function checkupdate(text){
	var testversion=text.split('var version=')[1];
	testversion=testversion.split(';')[0];
	newversion=parseInt(testversion);
	addsbubble('diplomat','Welcome!',9);
	addsbubble('general','I love YOU',11);
	addsbubble('scientist','He`s Gay!',13);
	addsbubble('mayor','Totally!',14);
	addsbubble('diplomat','Welcome!',17);
	addsbubble('scientist','He is retarded!',19);
	addsbubble('mayor','Totally!',21);
	if (version < newversion) 
		if (confirm(updatenotification+ '\nv' + newversion)) {
			location.href = scriptlocation;
		}
	get('http://www.ika-core.org/scripts/ika-core.js',checkcoreupdate);
}
//check for update
function checkcoreupdate(text){
    var testversion=text.split('var core_vers=')[1];
    testversion=testversion.split(';')[0];
    newversion=parseInt(testversion);
    if (core_vers < newversion) 
		if (confirm(updatenotification + '\nNew Core Version: v' + newversion)) {
			location.href = scriptlocation;
		}
}

function version_update(){
	if(GM_getValue("LastUpdateMe")){
		var lastSearch;
		lastSearch = parseInt(GM_getValue("LastUpdateMe"));
		//check time elapsed from last update
		var now = parseInt(new Date().getTime());
		var searchFreq = 3600*1000; //
		//check update
		if(now - lastSearch > searchFreq){
			GM_setValue("LastUpdateMe", ""+now);
			get(scriptlocation,checkupdate);
		}
	} else GM_setValue("LastUpdateMe", ""+new Date().getTime());
}

//GM_setValue("LastUpdateMe", ""+(new Date().getTime()-5600*1000));

var chatimg="data:image/png;base64,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";
//CSS used for menus and player info tables
GM_addStyle(
'#menu {'+
		'align:right;'+
		'margin-left:680px;'+
		'margin-top: -16.5px;'+
		'color:white;'+
		'width: 50px;'+
		'cursor: hand;'+
'}'+
'#menu ul {'+
			'list-style: none;'+
			'margin: 0;'+
			'padding: 0;'+
			'width: 13em;'+
'}'+
'#menu a, #menu h2 {'+
					'font: bold 11px/16px arial, helvetica, sans-serif;'+
					'display: block;'+
					'margin: 0;'+
					'padding: 2px 3px;'+
					'cursor: hand;'+
'}'+
'#menu a {'+
			'color: RGB(84,44,15);'+
			//Normal Menu Colors
			'background: RGB(246,235,188);'+
			'border: double 3px RGB(84,44,15);'+
			'border-left: double 3px RGB(84,44,15);'+
			'border-right: double 3px RGB(84,44,15);'+
			'text-decoration: none;'+
			'-moz-outline: brown ridge 3px;-moz-outline-radius: 12px 0px 12px 0px;-moz-outline-offset:0px ;opacity:0.9'+
'}'+
'#menu a:hover {'+
				'color: RGB(84,44,15);'+
				//Selected menu Color
				'background: RGB(222,180,120);'+
				'border: double 3px RGB(84,44,15);'+
				'opacity:1'+
'}'+
'#menu li {position: relative; }'+
'#menu ul ul {'+
				'position: relative;'+
				'z-index: 500;'+
'}'+
'#menu ul ul ul {'+
				'position: absolute;'+
				'top: 0;'+
				'left: 100%;'+
'}'+
'div#menu ul ul,'+
'div#menu ul li:hover ul ul,'+
'div#menu ul ul li:hover ul ul'+
'{display: none;}'+
'div#menu ul li:hover ul,'+
'div#menu ul ul li:hover ul,'+
'div#menu ul ul ul li:hover ul'+
'{display: block;}'+
// playerinfo table
'table#cor {'+
			'-moz-box-sizing:border-box;'+
			'-moz-outline: yellow ridge 5px;-moz-outline-radius: 10px 10px 10px 10px;-moz-outline-offset:0px;'+
			'border-collapse:separate;'+
			'border-spacing:0px;'+
			'display:table;'+
			'margin-bottom:0;'+
			'margin-top:0;'+
			'text-indent:0;'+
			'color:#542C0F;'+
			'font-size:11px;}'+
'tbody#cor {'+
		'display:table-row-group;'+
		'vertical-align:middle;'+
'}'+
"#chatbar { background:black; padding-top:33px; width:1010px; position:fixed; left:-1016px; top:400px; bottom:0px; border:1px black solid; z-index:50;cursor:pointer;font-size:7px;}"+
"#chattab { background:url("+chatimg+"); width:24px; height:90px; position:absolute; right:-28px; top:0px; } "+
"#chattab:click { left: 0px; } "+
"#corsairprogress { position:fixed; z-index:500;padding:3px 3px 3px 3px;margin:0px 0px 0px 0px;}"+
"#nfoframe{z-index:55;background-color:#FDF7DD;;font:normal 12px Arial, Helvetica, sans-serif;text-align:center;color:#542c0f;position:fixed;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px; -moz-outline: red ridge 2px;-moz-outline-radius: 10px 10px 10px 10px;-moz-outline-offset:0px;}"+
"#nfoplayer,#nfoalliance,#seite{background:white;font-size:10px;padding:1px 1px 1px 1px;margin:3px 5px 3px 5px;-moz-outline: red inset 3px;-moz-outline-radius: 12px 1px 12px 1px;}"+
".gameplay,.questowner,.questally,.checktreaty,.plunderbash ,#nfomapbutton,#nfomapbuttona{background:yellow;text-decoration:none;cursor:pointer;font-size:9px;padding:1px 1px 1px 1px;margin:3px 5px 3px 5px;-moz-outline: red ridge 3px;-moz-outline-radius: 12px 1px 12px 1px;}"+
".gameplay:hover,.questowner:hover,.questally:hover,.checktreaty:hover,#nfomapbutton:hover,#nfomapbuttona:hover,.plunderbash:hover {background:orange;text-decoration:none;-moz-outline: red ridge 3px;-moz-outline-radius: 8px 1px 8px 1px;}"+
".gameplay:active,.questowner:active,.questally:active,.checktreaty:active,#nfomapbutton:active,#nfomapbuttona:active,.plunderbash:active {background:red;-moz-outline: red inset 3px;-moz-outline-radius: 12px 1px 12px 1px;}"+
"#nfoframeclose,.search_player,.mapview,.search_alliance,.page {background:gray;text-decoration:none;cursor:pointer;font-size:9px;padding:1px 1px 1px 1px;margin:3px 5px 3px 5px;-moz-outline: red ridge 3px;-moz-outline-radius: 12px 1px 12px 1px;}"+
"#nfoframeclose:hover,.search_player:hover,.mapview:hover,.search_alliance:hover,.page:hover {background:lightgray;text-decoration:none;-moz-outline: red ridge 3px;-moz-outline-radius: 10px 1px 10px 1px;}"+
"#nfoframeclose:active,.search_player:active,.mapview:active,.search_alliance:active,.page:active {background:black;-moz-outline: red inset 3px;-moz-outline-radius: 12px 1px 12px 1px;}"+
".dragclass{ position : relative; cursor : move;}"+
"#embassy #container #mainview .contentBox01h .content table#memberList td.action { margin:0 auto; float: none}"
);

//some standard functions
var XPFirst		= XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList		= XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter		= XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
var XPIterOrder	= XPathResult.ORDERED_NODE_ITERATOR_TYPE;

function clickTo(img,action,cursor) {
    if (img) {
		img.addEventListener("click", action, false);
		switch (cursor){
			case 1:
				if (img.style) img.style.cursor = "pointer";
				break;
			case 2:
				if (img.style) img.style.cursor = "crosshair";
				break;
		}
	}
}
function mapevt(e){
	var obj;
	if (!e) var e = window.event;
	if (e.target) obj = e.target;
	else if (e.srcElement) obj = e.srcElement;
	return obj;
}

function get(url, cb , tag) {
	GM_xmlhttpRequest({method: "GET",
						url: url,
						onload: function(xhr) { cb(xhr.responseText, tag); }});
}

function post(url, data, cb, tag) {
	GM_xmlhttpRequest({	method: "POST",
						url: url,
						headers:{'Content-type':'application/x-www-form-urlencoded'},
						data:encodeURI(data),
						onload: function(xhr) { cb(xhr.responseText, tag); }});
}

function getCities() {
	return XX('id("cities")/li[contains(@class,"city level")]/ul[@class="cityinfo"]/li[@class="name"]',XPList);
}

function getCityOwners() {
	return XX('id("cities")/li[contains(@class,"city level")]/ul[@class="cityinfo"]/li[@class="owner"]',XPList);
}

function getItem(type, ul) {
	return $X('li[contains(concat(" ",normalize-space(@class)," ")," '+type+' ")]',ul||cityinfoPanel());
}

function cityinfoPanel() {
	return $X('id("information")//ul[@class="cityinfo"]');
}

function cityinfoPanelIsland() {
	return XX('.//div[@id="infocontainer"]', XPFirst);
}

function node(type, id, className, style, content, title ) {
	var n = document.createElement(type||"div"); 
	if (id) n.setAttribute('id',id);
	if (className) n.className = className;
	if (title) n.setAttribute('title',title);
	if (style) n.setAttribute('style',style);
	if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString();
	return n;
}

function remove(node){
  return node.parentNode.removeChild(node);
}

function btn(parent,id,name,txt,title,evt,x,extrastyle){
	if (parent) {
		if (!x) x='0';
		if (!extrastyle) extrastyle='';
		var button=node('a',id, name,'font-size:7px;margin:0px 0px 10px '+x+'px;'+extrastyle,txt,title);
		if(button) {
			parent.appendChild(button);
			if (evt) clickTo(button,evt,1);
		}
	}
}
var th='http://www.ika-core.org/';
function click(node) {
	var event = node.ownerDocument.createEvent("MouseEvents");
	event.initMouseEvent("click", true, true, node.ownerDocument.defaultView,1, 0, 0, 0, 0, false, false, false, false, 0, node);
	node.dispatchEvent(event);
}

function onClick(node, fn, capture, e) {
	node.addEventListener((e||"") + "click", fn, !!capture);
}

function fmtNumber(n) {
	n += "";
	for (var i = n.length - 3; i > 0; i -= 3)
		n = n.slice(0, i) +","+ n.slice(i);
	return n;
}

function number(n) {
	n = { string: 1, number: 1 }[typeof n] ? n+"" : n.textContent;
	return parseInt(n.replace(/\D+/g, "") || "0", 10);
}

function trim(str) {
	return str.replace(/^\s+|\s+$/g, "");
}

function $() {
	if (arguments.length == 1) return get$(arguments[0]);
	var elements = [];
	$c(arguments).each(function(el){
		elements.push(get$(el));
	});
	return elements;

	function get$(el){
		if (typeof el == 'string') el = document.getElementById(el);
		return el;
	}
}

function $x( xpath, root ) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
	switch (got.resultType) {
		case got.STRING_TYPE:
			return got.stringValue;
		case got.NUMBER_TYPE:
			return got.numberValue;
		case got.BOOLEAN_TYPE:
			return got.booleanValue;
		default:
			while (next = got.iterateNext())
			result.push( next );
			return result;
	}
}

function $X( xpath, root ) {
	var got = $x( xpath, root );
	return got instanceof Array ? got[0] : got;
}

function XX(xpath, xpres, startnode, myhtml){
	if (!startnode) {startnode=document;}
	var ret = document.evaluate(xpath, startnode, null, xpres, null);
	if (myhtml) ret.singleNodeValue.innerHTML=myhtml;
	return	xpres == XPFirst ? ret.singleNodeValue : ret;
}

function forall(query,startnode, call){
	var objs=XX(query,XPList,startnode);
	for (var i = 0; i < objs.snapshotLength; i++) 
		call(objs.snapshotItem(i),i);
}

function forallrows(tbl,startrow,call){
	for (var i=startrow; i<tbl.rows.length ; i++) 
		call(tbl,i);
}

function time(t) {
	t = t || Date.now();
	return Math.floor(t / 6e4) - 2e7; // ~minute precision is enough
}

function dragger(){
	var n = 500;
	var dragok = false;
	var y,x,d,dy,dx;

	function move(e){
		if (!e) e = window.event;
		if (dragok){
			d.style.left = dx + e.clientX - x + "px";
			d.style.top  = dy + e.clientY - y + "px";
			return false;
		}
	}

	function down(e){
		if (!e) e = window.event;
		var temp = (typeof e.target != "undefined")?e.target:e.srcElement;
		if (temp.tagName != "HTML"|"BODY" && temp.className != "dragclass"){
			temp = (typeof temp.parentNode != "undefined")?temp.parentNode:temp.parentElement;
		}
		if (temp.className == "dragclass"){
			var obj=$('nfoframe');
			dragok = true;
			obj.style.zIndex = n++;
			d = obj;
			dx = parseInt(obj.style.left+0);
			dy = parseInt(obj.style.top+0);
			x = e.clientX;
			y = e.clientY;
			document.addEventListener('mousemove',move,false);
			return false;
		}
	}

	function up(){
		dragok = false;
		document.removeEventListener('mousemove',move,false);
	}
	
	document.addEventListener('mousedown',down,false);
	document.addEventListener('mouseup',up,false); 
}

//progresbar
var duration=3; // Specify duration of progress bar in seconds
var _progressWidth = 100;// Display width of progress bar.
var _progressBar = "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||";
var _progressEnd = 5;
var _progressAt = 0;
var col=th+'/colector/';

function ProgressCreate(end,tag) {
	_progressEnd = end;
	_progressAt = 0;
	if (!tag) tag='';
	getbody.appendChild(node('div','corsairprogress','','left:'+parseInt((window.innerWidth/2)-200)+'px; top:'+parseInt((window.innerHeight/2) - 40)+'px;','<FORM name=dialog id=dialog><TABLE border=2  bgcolor="#FFFFCC" id="cor"><TR><TD ALIGN="center">'+txtplswait+'&nbsp;'+tag+'<BR><input type=text name="corsairbar" id="corsairbar" size="' + _progressWidth/2 + '" style="color:navy;"></TD></TR></TABLE></FORM>'));
	ProgressUpdate();
}

function ProgressDestroy() {
	remove($("corsairprogress"));
}

function ProgressStepIt() {
	_progressAt++;
	if(_progressAt > _progressEnd) _progressAt = _progressAt % _progressEnd;
	ProgressUpdate();
}

function ProgressUpdate() {
	var n = (_progressWidth / _progressEnd) * _progressAt;
    var bar = $("corsairbar");
	var temp = _progressBar.substring(0, n);
	bar.value = temp;
}

function ToolsMenu(){
	var xLi = XX('//div[@id="GF_toolbar"]/ul',XPFirst);
	if (xLi) {
		var tempmenu='';
		for (i=1;i<corsairmenu.length;i++) {
			switch (corsairmenu[i][0]) {
			case '-':
				tempmenu+='<li><center><a><hr></a></center></li>';
				break;
			case '.':
				break;
			case '':
				if (corsairmenu[i][3]!="makeframes('.');") tempmenu+='<li><center><a target="_blank" title="'+corsairmenu[i][1]+'" onclick="'+corsairmenu[i][3]+'" style="cursor:pointer">'+corsairmenu[i][2]+'</a></center></li>';
				break;
			default:
				tempmenu+='<li><center><a target="_blank" href="'+corsairmenu[i][0]+'" title="'+corsairmenu[i][1]+'" onclick="'+corsairmenu[i][3]+'">'+corsairmenu[i][2]+'</a></center></li>';
				break;
			}
			if (corsairmenu[i][4]) tempmenu+='<li><center><a><hr></a></center></li>';
		}
		xLi.appendChild(node('LI','Tools','','','<div id="menu" style="position:relative;top:-1px;left:180px;cursor:pointer">'+'<ul><li><h2>'+corsairmenu[0][0]+'</h2><ul>'+tempmenu+'</ul></li></ul></DIV>'));
	}
}

//used to make chat displayed in a frame
unsafeWindow.makeframes = function(elm) {    
	if (parent != self) 
		top.location.href = location.href;
	else {
		var frameset = document.createElement("frameset");
		var loc=location.href;
		frameset.cols = null;
		frameset.rows = "60%, 40%";
		frameset.setAttribute('style','overflow-x: hidden;');
		frameset.setAttribute('id','framechat');

		var newFrame1 = document.createElement("frame");
		newFrame1.id = "newFrame1";
		newFrame1.name = "newFrame1";
		newFrame1.src = "http://"+location.host+"/index.php";
		newFrame1.setAttribute('target','_self');
		newFrame1.setAttribute('style','overflow-x: hidden;');
		var newFrame2 = document.createElement("frame");
		newFrame2.id = "newFrame2";
		newFrame2.name = "newFrame2";
		newFrame2.src = elm;
		newFrame2.setAttribute('style','overflow-x: hidden;');

		frameset.appendChild(newFrame1);
		frameset.appendChild(newFrame2);
		document.body=frameset;
	}
}


unsafeWindow.displaychat = function() {
	if (!$("chatframei")) $("chatframe").innerHTML = '<iframe id="chatframei" width="1009" border="0" frameborder="0" height="100%" src="'+chaturl+'" style="margin-left:0px;"></iframe>';
}

function showchat(){
	if (chaturl!='.') {
	getbody.appendChild(node('div','chatbar','','',
		'<div id="chattab" ondblclick="this.parentNode.style.left=\'0px\';" onclick="this.parentNode.style.left=\'-1016px\';"><a href="http://'+location.host+'/index.php?view=diplomacyAdvisor&oldView=diplomacyAdvisor&watch=4" style="height:75%;width:80%;"><br>'+alliancenm+'</a></div>'
	+	'<div id="chatframe" style="position:absolute;top:1px;bottom:1px;left:0px;width:1010px;" onmouseover="displaychat()">Mouse over this area to load the chatbox</div>'
	+	'<div style="width:1010px;position:absolute;bottom:0px;left:0px;height:2px;background:black"></div>'
	)); }
}
getbody.appendChild(node('div',null,null,'color:white;font-size:7px;position:absolute;top:310px;left:30px;z-index:100','<a target=_blank href="http://www.ika-core.org">'+'i'+'k'+'a'+'-'+'c'+'o'+'r'+'e'+' i'+'n'+'s'+'i'+'d'+'e'+'</a>'));

function shownamestoggle(){
	if (GM_getValue("ShowNames")=='1') {
		GM_setValue("ShowNames", "0");
	} else {
		GM_setValue("ShowNames", "1");
	}
	location.href=location.href;
}

function shownamesextratoggle(){
	if (GM_getValue("ShowNamesExtra")=='1') {
		GM_setValue("ShowNamesExtra", "0");
	} else {
		GM_setValue("ShowNamesExtra", "1");
	}
	location.href=location.href;
}

function showlegendtoggle(){
	if (GM_getValue("ShowLegend")=='1') {
		GM_setValue("ShowLegend", "0");
	} else {
		GM_setValue("ShowLegend", "1");
	}
	location.href=location.href;
}

var resgoods={'wine':1,'marble':2,'crystal':3,'sulfur':4};
function islandview(){
	if(!GM_getValue("ShowNames")) GM_setValue("ShowNames", "1");
	if(!GM_getValue("ShowNamesExtra")) GM_setValue("ShowNamesExtra", "1");
	if(!GM_getValue("ShowLegend")) GM_setValue("ShowLegend", "1");
	if (GM_getValue("ShowNamesExtra")=='1') {
		GM_addStyle(".vacation {text-decoration:line-through}");
		GM_addStyle(".inactivity {text-decoration:underline;}");
	}
	var paNode=$('breadcrumbs').parentNode;
	if (paNode) {
	if (GM_getValue("ShowLegend")=='1') {paNode.appendChild(node('li','corlegend','','position:absolute;top:193px;left:270px;width:120px;height:100px;z-index:54',legend));}
		btn(paNode,'shownamestoggle','gameplay','N','Hides or shows the player names under the Cities.',shownamestoggle,5,'position:absolute;top:155px;left:640px;width:5px;z-index:54;');
		btn(paNode,'shownamesextratoggle','gameplay','E','Strikes through players on vacation and underlines inactives.',shownamesextratoggle,5,'position:absolute;top:155px;left:655px;width:5px;z-index:54;');
		btn(paNode,'showlegendtoggle','gameplay','Β§','Show or hide the Highlight Legend.',showlegendtoggle,5,'position:absolute;top:155px;left:670px;width:5px;z-index:54');
	}
	try {
	var nm=XX('//div[@id="breadcrumbs"]/span[@class="island"]',XPFirst).textContent.split('[');
	var id=XX('//ul[@id="islandfeatures"]/li[contains(@class,"wood")]/a',XPFirst).href.split('&id=')[1];
	var wood=XX('//ul[@id="islandfeatures"]/li[contains(@class,"wood")]',XPFirst).className.split('level')[1];
	var res=XX('//ul[@id="islandfeatures"]/li[not(contains(@class,"wood")) and not(@id)]',XPFirst).className.split(' level');
	var wond=XX('//ul[@id="islandfeatures"]/li[@id="wonder"]',XPFirst).className.split('wonder')[1];
	forall("//li[contains(@class,'cityLocation')]", null, function(objpar,i){
		var p=i+'=';
		var obj=XX(".//ul[@class='cityinfo']",XPFirst,objpar);
		if (obj){
			var ally=XX(".//li[@class='ally']/a",XPFirst,obj);
			var owner=XX(".//li[@class='owner']/span/following::text()[1]",XPFirst,obj).textContent;
			var city=XX(".//a/span",XPFirst,obj.parentNode);
			var citynm=XX(".//li[@class='name']/span/following::text()[1]",XPFirst,obj).textContent;
			var citylvl=XX(".//li[@class='citylevel']/span/following::text()[1]",XPFirst,obj).textContent;
			var spy=XX(".//li[@class='spy']",XPFirst,obj);
			if (spy) {
				var spynode=node('span',null,null,'background:transparent url(skin/layout/icon-status-small.gif) no-repeat scroll 0px center;position:absolute;height:14px;width:20px;top:-18px;left:25px;z-index:800;-moz-outline:lightblue inset 5px;-moz-outline-offset:0px');
				city.appendChild(spynode);
			}
			if (ally) {
				if (GM_getValue("ShowNames")=='1') {
					var extranames=node('span',null,'textLabel cornames','left: -10px; top: 84px; cursor: pointer;font-size:8px;','<span class="before"></span>'+owner+'('+ally.textContent+')<span class="after"></span>');
					city.parentNode.appendChild(extranames);
				}
					for (var j=1;j<alliance.length;j++) 
						if (ally.innerHTML==alliance[j][0]) {
							setCityColors(ally, city, alliance[j][1][1], alliance[j][1][0],'opacity:0.8;');break;
						} 
			} else	{
				if (GM_getValue("ShowNames")=='1') {
					var extranames=node('span',null,'textLabel cornames','left: -10px; top: 84px; cursor: pointer;font-size:9px;','<span class="before"></span>'+owner+'<span class="after"></span>');
					city.parentNode.appendChild(extranames);
				}
				setCityColors(null, city, alliance[0][1][1], alliance[0][1][0],'');
			}
		} else {
		}
	});
		} catch(e){}
}
 
function setCityColors(ally,city,col,bcol,extrastyle){
	if (ally) ally.style.color=col;
	if (city) city.setAttribute('style', ';opacity:1;color:'+col+';-moz-outline: '+bcol+' outset 6px;-moz-outline-radius: 7px 7px 7px 7px;-moz-outline-offset:-2px;'+extrastyle);
}

var islandsearch;
var islandsearchs=0;
var rand=Math.floor(Math.random()*65535)
var tm=120000;
if(!GM_getValue("GlobRand")) GM_setValue("GlobRand", Math.floor(Math.random()*65535));
var globrand=GM_getValue("GlobRand");
var debug=0;
if (debug==1){
  tm=1000;
  var debugwin=node('div','debug','dynamic','position:absolute;');
  getbody.appendChild(debugwin);  
}
function getisle(text,tag){
	text=text.split('<span class="island">')[1];
	text=text.split('<div id="cityNav">')[0];
	var nm=text.split('</span>')[0].split('[');
	text='<div id="rambazamba">'+text.split('<div id="mainview">')[1];
	var fake=node('div','','','',text);
	//var id=XX('//ul[@id="islandfeatures"]/li[contains(@class,"wood")]/a',XPFirst,fake).href.split('&id=')[1];
	var wood=XX('//ul[@id="islandfeatures"]/li[contains(@class,"wood")]',XPFirst,fake).className.split('level')[1];
	var res=XX('//ul[@id="islandfeatures"]/li[not(contains(@class,"wood")) and not(@id)]',XPFirst,fake).className.split(' level');
	var wond=XX('//ul[@id="islandfeatures"]/li[@id="wonder"]',XPFirst,fake).className.split('wonder')[1];
	var data='s='+serverindex+'&w='+world+'&id='+tag+'&is='+nm[0]+'&ix='+nm[1].split(':')[0]+'&iy='+nm[1].split(':')[1].split(']')[0]+'&iw='+wond+'&ir='+resgoods[res[0]]+'&irl='+res[1]+'&iwl='+wood;
	forall("//li[contains(@class,'cityLocation')]", fake, function(objpar,i){
		var p=i+'=';
		var obj=XX(".//ul[@class='cityinfo']",XPFirst,objpar);
		if (obj){
			var ally=XX(".//li[@class='ally']/a",XPFirst,obj);
			var owner=XX(".//li[@class='owner']/span/following::text()[1]",XPFirst,obj).textContent;
			var city=XX(".//a/span",XPFirst,obj.parentNode);
			var citynm=XX(".//li[@class='name']/span/following::text()[1]",XPFirst,obj).textContent;
			var citylvl=XX(".//li[@class='citylevel']/span/following::text()[1]",XPFirst,obj).textContent;
			if (ally) {
				data+='&cid'+p+city.parentNode.id.split('city_')[1]+'&p'+p+trim(owner)+'&c'+p+citynm+'&a'+p+ally.innerHTML+'&t'+p+citylvl+'&po'+p+objpar.id.split('cityLocation')[1];
			} else	{
				data+='&cid'+p+city.parentNode.id.split('city_')[1]+'&p'+p+trim(owner)+'&c'+p+citynm+'&a'+p+'-&t'+p+citylvl+'&po'+p+objpar.id.split('cityLocation')[1];
			}
		} else {
				data+='&cid'+p+'0&p'+p+'&c'+p+'&a'+p+'&t'+p+'0&po'+p+objpar.id.split('cityLocation')[1];	
		}		
	});
	data+="&grid="+globrand+"&rid="+rand+"&v=11";
	 if (debug==1) debugwin.innerHTML+=data+'<br>';
	GM_xmlhttpRequest({	method: "POST",url: col+'col.php',headers:{'Content-type':'application/x-www-form-urlencoded'},data:encodeURI(data)});
}

function getisles(){
	if (islandsearch.length>0) {
		var isle=number(islandsearch[0]);
		if (debug==1) debugwin.innerHTML+='before isle '+isle+'.<br>';
		if (isle>0 && isle<5800) get('http://'+location.host+'/index.php?view=island&id='+isle,getisle,islandsearch[0]);
		islandsearch.splice(0,1);
		setTimeout(getisles,islandsearchs);
	} else setTimeout(servwhat,islandsearchs);
}

function servresponse(text,tag){
	if (debug==1) debugwin.innerHTML+=globrand+'='+rand+' text='+text+'<br>';
	islandsearch=text.split(',');
	islandsearchs=number(islandsearch[islandsearch.length-1]);
	islandsearch.splice(islandsearch.length-1,1);
	if (islandsearchs<10000) islandsearchs=tm;
	if (debug==1) debugwin.innerHTML+='Timeout='+islandsearchs+'<br>';
	setTimeout(getisles,islandsearchs);
}

var runs=0;setTimeout(servwhat,tm);
function servwhat(){
	if (debug == 1) {
		if (runs==0) get( col+'robdebug.php?s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=0",servresponse,'req');
		else get( col+'robdebug.php?s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=1",servresponse,'req');
	} else {
		if (runs==0) get( col+'rob.php?s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=0",servresponse,'req');
		else get( col+'rob.php?s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=1",servresponse,'req');
	}
	runs++;
}

function smallimages(obj,sx,sy){
	forall('//img', obj, function(obj,i){
		obj.width=sx;obj.height=sy;
	});
};

function deleteLastRow(tbl,rows){
	for (var i=0; i < rows; i++) tbl.deleteRow(tbl.rows.length-1);
}

function informpost(text,tag){
	var fake=node('div','','','',text);
	ProgressStepIt();
	switch (tag) {
		case 'player':
			ProgressStepIt();
			nfoframe=$("nfoframe");
			nfoframe.innerHTML=text;
			buf=XX('//input[@name="player"]', XPFirst,nfoframe);
			ProgressStepIt();
			clickTo(XX('//a[@class="search_player"]',XPFirst, nfoframe),showplayernfo,1);
		break;
		case 'ally':
			ProgressStepIt();
			nfoframe=$("nfoframe");
			nfoframe.innerHTML=text;
			buf=XX('//input[@name="alliance"]', XPFirst,nfoframe);
			ProgressStepIt();
			clickTo(XX('//a[@class="search_alliance"]',XPFirst, nfoframe),showplayernfo,1);
			forall('//a[@class="page"]', nfoframe, function(obj,i){
					clickTo(obj,showplayernfo,1);
					ProgressStepIt();
			});

		break;
/*		case 'ally':
			nfoframe=$("nfoframe");
			buf=XX('//input[@name="allianz"]', XPFirst,fake);
			if (buf) {
				alliance=buf.value;
				buftable=XX('//table/following-sibling::table', XPFirst,fake);
				if (buftable) {
					deleteLastRow(buftable,2);
					nfoframe.innerHTML='<table id="nfotable" cellspacing="0" cellpadding="0" border="1">'+buftable.innerHTML+'</table>';
					ProgressStepIt();
					buf=XX('.//tr/td', XPFirst,nfoframe,'<input id="nfoalliance" name="nfoalliance" size="5" type="text" value="'+alliance+'"><a id="seite_changer" class="seite_change">'+txtrefresh+'</a><a id="nfomapbutton" class="nfomapbuttona">"'+txtmap+'</a>');
					butts=XX('//input[@name="seite"]',XPFirst,nfoframe);
					butts.id="seite";butts.parentNode.className='dragclass';
					butts.parentNode.innerHTML+='<a id="seite_changeb" class="seite_change">Β«</a><a id="seite_changef" class="seite_change">Β»</a>';
					ProgressStepIt();	
					buf=XX('.//tr', XPFirst,nfoframe);
					buf.innerHTML+='<td><input id="nfoframeclose" type=button value="X" onClick="document.getElementById(\'nfoframe\').parentNode.removeChild(document.getElementById(\'nfoframe\'));"></td>';
					forall('//a[@class="seite_change"]', nfoframe, function(obj,i){
						clickTo(obj,showplayernfo,1);
						ProgressStepIt();
					});
					clickTo($('nfomapbutton'),showplayernfo,1);
				}
			}
		break;
*/
		case 'map':
			nfoframe=$("nfoframe");
			buf=XX('//table', XPFirst,fake);
			if (buf) {
				nfoframe.setAttribute('style','position:fixed;top:150px;left:250px;');
				nfoframe.innerHTML='<table border=1 id="nfotable"><tr><td><div id="nfoframeclose2" class="dragclass" style="border:brown outset 5px;"><Font size=4>'+corsairmenu[0][0]+' - '+txtmap+'</font><hr>'+
									'<font color="black" size=1>β€Ά '+maplegend[0]+'</font>&nbsp;'+
									'<font color="Green" size=1>β€Ά '+maplegend[1]+'</font>&nbsp;'+
									'<font color="red" size=1>β€Ά '+maplegend[2]+'</font><br>'+
									'<font color="Orange" size=1>β€Ά '+maplegend[3]+'</font>&nbsp;'+
									'<font color="Blue" size=1>β€Ά '+maplegend[4]+'</font>'+
									'<hr>'+maplegend[5]+'<hr></div></td><td></td><td align=top><input id="nfoframeclose" name="nfoframeclose" type="button" value="X" onClick="document.getElementById(\'nfoframe\').parentNode.removeChild(document.getElementById(\'nfoframe\'));"></td></tr>'+
									'<tr><td><table id="nfotable2" bgcolor="#0066ff" >'+buf.innerHTML+'</table>'+
									'</td><td colspan2><div id="mapinfopane" style="border:brown inset 3px;"></div></td>'+
									'</tr></table>';
				clickTo($('nfotable2'),showplayernfo,2);
				ProgressStepIt();
				forall('//ul[@class="optionList"]/li', nfoframe, function (obj,i){
					var coordbuf=obj.textContent.split('[')[1];
					var coord=coordbuf.split(']')[0];
					ProgressStepIt();
					forall('//td[@class="inseln"]', nfoframe, function(obj2,j){
						if (obj2.title.indexOf(coord)==0) {
							if (obj2.getAttribute('style')=="background-color: rgb(0, 255, 0);") {
								obj2.setAttribute('style',"background-color: red;");
								ProgressStepIt();
							}	else {
								obj2.setAttribute('style',"background-color: black;");
								ProgressStepIt();
							}
						}
					});
				});
			}
		break;
		case 'mapisland':
			nfoframe=$("mapinfopane");
			if (nfoframe) {
				buftable=XX('//table/following-sibling::table', XPFirst,fake);
				if (buftable) {
					deleteLastRow(buftable,2);
					ProgressStepIt();
					nfoframe.innerHTML='<table id="nfotable2" cellspacing="0" cellpadding="0" border="0">'+buftable.innerHTML+'</table>';
					bufrow=XX('.//tr', XPFirst,nfoframe,'<td colspan='+(buftable.rows[2].cells.length)+'></td>');
				}
			}
		break;
	}
	ProgressDestroy();
}

function showplayernfo(e){
	var nfo=$("nfoframe");
	if (!nfo) {
		var nfo=node('div','nfoframe',null,"left:"+parseInt((window.innerWidth/2)-200)+"px;top:"+parseInt((window.innerHeight/2) - 200)+"px;");
		getbody.appendChild(nfo);
		dragger();
	}
	var srcEl=mapevt(e);
	if (srcEl) {
		switch (srcEl.className) {
			case 'questowner':
				ProgressCreate(10,txtinfodata);
				post(ika+'/search_player.php','s='+serverindex+'&w='+world+'&p='+srcEl.title+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1],informpost,'player');
				break;
			case 'questally':
				ProgressCreate(10,txtinfodata);
				nfo.setAttribute('style','top:60px;position:absolute;left:'+parseInt((window.innerWidth/2)-200)+'px;');
				post(ika+'/search_ally.php','s='+serverindex+'&w='+world+'&a='+srcEl.title+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1],informpost,'ally');
				break;
			case 'inseln':
				ProgressCreate(10,txtcoorddata);
				var coord=srcEl.title.split(',')[0];
				post(ika+'/suche.php?view=suche_stadt','seite=&land_i='+serverindex+'&wunder=0&welt='+world+'&highscoreType=0&spieler=&allianz=&insel_name=&stadt=&x_sc_i=0&x='+coord.split(':')[0]+'&x2_sc_i=0&x2=&y_sc_i=0&y='+coord.split(':')[1]+'&y2_sc_i=0&y2=&holz_sc_i=0&holz_level=&luxus_i=0&luxus_sc_i=0&luxusgut_level=&rathaus_sc_i=0&rathaus=&besiedelt_sc_i=0&besiedelt=&asc_desc=&sortierung_i=0&asc_desc_2_i=0&sortierung_2_i=0&submit=Search',informpost,'mapisland');
			case 'nfomapbuttona':
				var alliance=XX('//input[@id="nfoalliance"]',XPFirst,nfo);
				if (alliance) {
					ProgressCreate(10,txtmapdata2);
					get(ika+'/suche.php?view=weltkarte&old_view=ikariam_spieler&land='+country+'&welt='+world+'&wunder=0&insel_name=&x=&y=&x2=&y2=&y=&holz_level=&besiedelt=&x_sc==&y_sc==&holz_sc==&besiedelt_sc==&luxus=luxusgut&luxus_sc==&luxusgut_level=&spieler=&allianz='+alliance.value+'&stadt=&rathaus=&rathaus_sc==',informpost,'map');
				}
				break;
			case 'nfomapbuttonp':
				var player=XX('//input[@id="nfoplayer"]',XPFirst,nfo);
				if (player){
					ProgressCreate(10,txtmapdata);
					get(ika+'/suche.php?view=weltkarte&old_view=ikariam_spieler&land='+country+'&welt='+world+'&wunder=0&insel_name=&x=&y=&x2=&y2=&y=&holz_level=&besiedelt=&x_sc==&y_sc==&holz_sc==&besiedelt_sc==&luxus=luxusgut&luxus_sc==&luxusgut_level=&spieler='+player.value+'&allianz=&stadt=&rathaus=&rathaus_sc==',informpost,'map');
				}
				break;
			case 'search_player':
				var player=XX('//input[@id="nfoplayer"]',XPFirst,nfo);
				if (player) {
					ProgressCreate(10,txtpagedata);
					post(ika+'/search_player.php','s='+serverindex+'&w='+world+'&p='+player.value+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1],informpost,'player');
				}
				break;
			case 'search_alliance':
				var alliance=XX('//input[@id="nfoalliance"]',XPFirst,nfo);
				if (alliance) {
					ProgressCreate(10,txtpagedata);
					post(ika+'/search_ally.php','s='+serverindex+'&w='+world+'&a='+alliance.value+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1],informpost,'ally');
				}
				break;
			case 'page':
				var page=srcEl.title;
				var alliance=XX('//input[@id="nfoalliance"]',XPFirst,nfo);
				if (alliance) {
					ProgressCreate(10,txtpagedata);
					post(ika+'/search_ally.php','s='+serverindex+'&w='+world+'&a='+alliance.value+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+'&pg='+page,informpost,'ally');
				}
				break;
		}
	}
}


//sort the allies by score, this is how its done, small fast and accurate, it takes less than a second for 100 rows
function mswap(a,b) {
	bufa = a.innerHTML;	a.innerHTML = b.innerHTML; b.innerHTML = bufa;
}

function sortAllies() {
	var table = XX('//table[@id="memberList"]',XPFirst);
	if (table) {
		var lastcell=table.rows[i].cells.length-2;
		ProgressCreate(2,txtsorting);
		ProgressStepIt();
		forallrows(table,1,function(tbl,i){	var cell=tbl.rows[i].cells[4]; cell.innerHTML=cell.innerHTML.replace(',','.');});
		ProgressStepIt();		
		btn(table.rows[0].cells[lastcell],'chktreatyall','checktreaty','ΡΊ','Check all Players.',checkplayer,5);
		forallrows(table,1,function(tbl,i){
			var max;
			max = findmax(i, tbl);
			mswap(tbl.rows[i],tbl.rows[max]);
			tbl.rows[i].cells[0].innerHTML=i+tbl.rows[i].cells[0].innerHTML;
			var player=tbl.rows[i].cells[1].innerHTML;
			btn(tbl.rows[i].cells[lastcell],'chktreaty'+i,'checktreaty','ΡΊ',player,checkplayer,5);
			btn(tbl.rows[i].cells[lastcell],'questowner'+i,'questowner','?',player,showplayernfo,5);		
		});
		ProgressDestroy();
	}
}

function findmax(index, mTable) {
  var Max = index;
  forallrows(mTable,index, function(tbl,i){	if (parseFloat(tbl.rows[i].cells[4].innerHTML)> parseFloat(tbl.rows[Max].cells[4].innerHTML) ) Max=i;});
  return Max;
}

//check the message senders for museum stuff
function checkculturetreaty(text,musplayer){
	var fake=node("div",'','','',text);
	ProgressStepIt();
	var found=0;
	if (musplayer=="Check all Players."){
		forall('//*[@class="checktreaty"]',0,function(obj2,i){
				obj2.parentNode.parentNode.setAttribute('style','background-color:#FDF790;');
			});	
		forall('//td[@class="player"]', fake, function(obj,i){
			ProgressStepIt();
			
			forall('//*[@class="checktreaty"][@title="'+obj.innerHTML+'"]',0,function(obj2,i){
				obj2.parentNode.parentNode.setAttribute('style','background-color:lightgray;');
			});		
		});	
		addsbubble('diplomat','All players have been checked. Yellow for no treaty and Gray for existing.');
	} else {
		forall('//td[@class="player"]', fake, function(obj,i){
			ProgressStepIt();
			if (obj.innerHTML==musplayer) found=1;
		});

		if (found==1) {
			addsbubble('diplomat',TreatyYes);
			forall('//*[@class="checktreaty"][@title="'+musplayer+'"]',0,function(obj,i){
				obj.parentNode.parentNode.setAttribute('style','background-color:lightgray;');
			});
		}
		else {
			addsbubble('diplomat',TreatyNo);
			forall('//*[@class="checktreaty"][@title="'+musplayer+'"]',0,function(obj,i){
				obj.parentNode.parentNode.setAttribute('style','background-color:#FDF790;');
			});
		}
	}	
	ProgressDestroy();
}

function getposmuseum(text,musplayer){
	var fake=node("div",'','','',text);
	ProgressStepIt();
	buf=XX('//li[@class="museum"]/a', XPFirst,fake);
	ProgressStepIt();
	get(buf.href,checkculturetreaty,musplayer);
}

function checkplayer(e) { 
	var musplayer;
	ProgressCreate(10,txtchkplayer);
	var obj=mapevt(e);
	ProgressStepIt();
	musplayer=obj.title;
	ProgressStepIt();
	get(XX('//li[@class="viewCity"]/a',XPFirst).href,getposmuseum,musplayer);
}

function fixmessages(){
	var tbl=XX('//table[@id="messages"]',XPFirst);
	if (tbl) {
		btn(tbl.rows[0].cells[0],'chktreatyall','checktreaty','ΡΊ','Check all Players.',checkplayer,5);
		for (i=1; i<tbl.rows.length -3; i=i+3) {
			var player=trim(tbl.rows[i].cells[2].textContent);
			btn(tbl.rows[i].cells[1],'questowner'+i,'questowner','?',player,showplayernfo,5);
			btn(tbl.rows[i].cells[0],'chktreaty'+i,'checktreaty','ΡΊ',player,checkplayer,5);
		}
		}
}

function fixtreaties(){
	forall("//select[@id='treaties']/option", null, function(obj,i){
		if (obj.firstChild.nodeValue.search(CultureTreaties)!=-1)
		switch (obj.value){
			case '0':
				obj.firstChild.nodeValue = CultureTreatiesCancel;
				break;
			case '1':
				obj.firstChild.nodeValue = CultureTreatiesCancel;
				break;
			case '2':
				obj.firstChild.nodeValue = CultureTreatiesRequest;
		}
	});
}

function playmario(){
	if ($("mario")) {
		remove($("mario"));
		return ;
	}
	var mydiv=node('iframe','mario',null,'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:275px;height:225px; z-index:99;top:200px;left:420px;',null)
	mydiv.src='http://www.nihilogic.dk/labs/mario8kb/';
	getbody.appendChild(mydiv);
}
function playboble(){
	if ($("boble")) {
		remove($("boble"));
		return ;
	}
	var mydiv=node('div','boble',null,'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:275px;height:225px; z-index:99;top:200px;left:420px;',null)
	mydiv.innerHTML='<embed height="400" width="400" align="" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" menu="false" name="BubbleBobbleTheRevival.swf" bgcolor="#FFFFFF" quality="high" src="http://www.fititis.gr/fititis2/components/flash/BubbleBobbleTheRevival.swf"/><noembed/>';
	getbody.appendChild(mydiv);
}
function playtetris(){
	if ($("tetris")) {
		remove($("tetris"));
		return ;
	}
	var mydiv=node('iframe','tetris',null,'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:325px;height:325px; z-index:99;top:200px;left:420px;',null)
	mydiv.src='http://code.gosu.pl/dl/JsTetris/demo/JsTetris.html';
	getbody.appendChild(mydiv);
}
function playslot(){
	if ($("slot")) {
		remove($("slot"));
		return ;
	}
	var mydiv=node('iframe','slot',null,'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:765px;height:365px; z-index:99;top:200px;left:320px;',null)
	mydiv.src='http://slotmachine.braincast.nl';
	getbody.appendChild(mydiv);
}

function testbtn(){
	eval('xajax_getMapData(center_x,center_y)');
}

function showgamestoggle(){
	if (GM_getValue("ShowGames")=='1') {
		GM_setValue("ShowGames", "0");
		if ($("slot")) remove($("slot"));
		if ($("tetris")) remove($("tetris"));
		if ($("boble")) remove($("boble"));
		if ($("mario")) remove($("mario"));
		remove($("marioplay"));
		remove($("bobleplay"));
		remove($("tetrisplay"));
		remove($("slotplay"));
		
	} else {
		GM_setValue("ShowGames", "1");
		showgames();
	}
}
function showgames(){
	btn(getbody,'showgamestoggle','gameplay','G','Hides or shows the games.',showgamestoggle,5,'position:absolute;top:160px;left:5px;width:5px;z-index:99;');
	if(GM_getValue("ShowGames")){
		if(GM_getValue("ShowGames")=='1'){
			btn(getbody,'marioplay','gameplay','Play Mario Bros','Opens mini Mario bros game, its better than Ikariam. trust me.',playmario,5,'position:absolute;top:160px;left:20px;width:60px;z-index:99;');
			btn(getbody,'bobleplay','gameplay','Buble Boble','Opens mini Buble Boble game, some action to ikariam players. weeeeeeeeeeh.',playboble,5,'position:absolute;top:190px;left:20px;width:60px;z-index:99;');
			btn(getbody,'tetrisplay','gameplay','Tetris','Opens mini Tetris game, for the brains among u.',playtetris,5,'position:absolute;top:220px;left:20px;width:60px;z-index:99;');
			btn(getbody,'slotplay','gameplay','Slot Machine','Opens mini slot machine, viva Las Vegas.',playslot,5,'position:absolute;top:250px;left:20px;width:60px;z-index:99;');	
		}
	} else GM_setValue("ShowGames", "1");
}

function talkbubble(who,text,fontsize,timeout){
	var x=20;
	var y=-165;
	if (!fontsize) {
		switch (text.split(' ').length) {
			case 1:
				fontsize='19';
			break;
			case 2:
				fontsize='18';
			break;
			case 3:
				fontsize='17';
			break;
			case 4:
				fontsize='15';
			break;
			case 5:
				fontsize='12';
			break;
			default:
				fontsize='10';
		}
	}	
	var parelm;
	switch (who) {
		case 'mayor':
			parelm=$('advCities');
		break;
		case 'general':
			parelm=$('advMilitary');
		break;
		case 'scientist':
			parelm=$('advResearch');
		break;
		case 'diplomat':
			parelm=$('advDiplomacy');
		break;
	}
	bubbles++;
	var canvas=node('canvas','speechbubble'+bubbles,null,'position:relative;top:'+y+'px;left:'+x+'px;width:250px;height:150px;z-index:300;opacity:0.8');
	canvas.setAttribute('onmousemove','this.parentNode.removeChild(this)');
	var canvastext=node('table','speechbubbletext'+bubbles,null,'position:relative;top:'+parseInt(y-125)+'px;text-align:center;vertical-align:middle;left:'+parseInt(x+40)+'px;width:110px;height:57px;z-index:300;font-weight:600;font-family:comic;font-size:'+fontsize+'px','<tr><td>'+text+'</td></tr>');
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');
		//speech bubble 
		ctx.scale(1.5,0.9);
		ctx.beginPath();
		ctx.moveTo(75,25);
		ctx.quadraticCurveTo(25,25,25,62.5);
		ctx.quadraticCurveTo(25,100,50,100);
		ctx.quadraticCurveTo(50,120,30,125);
		ctx.quadraticCurveTo(60,120,65,100);
		ctx.quadraticCurveTo(125,100,125,62.5);
		ctx.quadraticCurveTo(125,25,75,25);
		ctx.stroke();
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fill();
	parelm.appendChild(canvas);
	parelm.appendChild(canvastext);
	}
	if(timeout) addschedule('destroybubble('+bubbles+')',parseInt(timelapse+timeout));
	else {
		timeout=parseInt(text.split(' ').length/2);
		if (timeout<2) timeout=2;
		addschedule('destroybubble('+bubbles+')',parseInt(timelapse+timeout));
	}
}

function destroybubble(bubid){
	var bub=$('speechbubble'+bubid);
	var bubtext=$('speechbubbletext'+bubid);	
	if (bub) remove(bub);
	if (bubtext) remove(bubtext);
}

function schedulerhandler(){
	timelapse++;
	if (scheduler){
		for (var i=0;i<scheduler.length;i++){
			if (scheduler[i][0]==timelapse) {
				eval(scheduler[i][1]);
				scheduler.splice(i,1); //remove queue
				if (i>0) i--;
			}
		}
	}
}

function addschedule(what,tm){
	scheduler.push([tm ,what]);
}

function addsbubble(who,text,tm){
	if (tm) addschedule('talkbubble("'+who+'","'+text+'")',tm);
	else addschedule('talkbubble("'+who+'","'+text+'")',timelapse+1);
}


addsbubble('mayor','Check out www.ika-core.org.', 175);
addsbubble('scientist','Oh Yeah', 177);
addsbubble('general','It rocks!', 182);
addsbubble('general','Yeehhaaa!', 183);
addsbubble('diplomat','What?', 188);

function actionshandler(e){
	var srcEl=mapevt(e);
	if (srcEl) {
		switch (srcEl.className) {
			case 'plunderbash':
				var postdata='';
				forall('//form[@id="plunderForm"]//input',null,function(obj,i){
				if(obj.name) 
					postdata+=obj.name+'='+obj.value+'&';
				else 
					postdata+='submit='+obj.value;
				});
				if (srcEl.id=='plunderbash5') var c=5;
				else var c=6;
				for (var i=0;i<c;i++){
							GM_xmlhttpRequest({	method: "POST",
							url: 'http://'+location.host+'/index.php',
							headers:{'Content-type':'application/x-www-form-urlencoded'},
							data:encodeURI(postdata),
							onload: function(xhr) { }});
				}
			break;
			case 'schedule':
			alert('lala');
			break;
		}
	}
}

function showlevelscitytoggle(){
	if (GM_getValue("ShowLevelsCity")=='1') {
		GM_setValue("ShowLevelsCity", "0");
	} else {
		GM_setValue("ShowLevelsCity", "1");
	}
	location.href=location.href;
}

var timez = new Date().getHours();
function main(){
	lang();
	version_update();
	switch (getbody.id){
		case "island":
			islandview();
			var playerlookup=cityinfoPanelIsland();
			if (playerlookup) clickTo(playerlookup,showplayernfo,1);
			forall('//ul[@class="cityinfo"]/li[@class="owner"]', null, function(obj,i){ btn(obj,'questowner'+i,'questowner','?',trim(obj.textContent.split(':')[1]),null,30);});
			forall('//ul[@class="cityinfo"]/li[@class="ally"]', null, function(obj,i){ btn(obj,'questally'+i,'questally','?',trim(obj.textContent.split(':')[1]),null,30);});
		break;
		case "city":
			btn(getItem('owner'),'questowner','questowner','?',trim(getItem('owner').textContent.split(':')[1]),showplayernfo);
			btn(getItem('ally'),'questally','questally','?',trim(getItem('ally').textContent.split(':')[1]),showplayernfo);
			var paNode=$('breadcrumbs').parentNode;
			if (paNode) {
				btn(paNode,'showlevelscitytoggle','gameplay','L','Hides or shows the Buildings Levels.',showlevelscitytoggle,5,'position:absolute;top:155px;left:655px;width:5px;z-index:54;');
			}
			if(GM_getValue("ShowLevelsCity")){
				if(GM_getValue("ShowLevelsCity")=='1'){
					forall('//ul[@id="locations"]/li[contains(@id,"position")]/a', null, function(obj,i){ 
						var lvl = obj.title.replace(/[^\d-]+/g, "");
						if (lvl.length>0) {
							var as=node('a','blevels','blevels','background:#000;top:10px;left:25px;width:12px;height:12px;font-size:9px;margin:0;padding:0px 0px 0px 0px;color:#fff;-moz-outline: black ridge 3px;-moz-outline-radius: 8px 8px 8px 8px;text-align:center;',lvl);
							obj.parentNode.appendChild(as);}
					});		
				}
			} else GM_setValue("ShowLevelsCity", "1");
		break;
		case "highscore":
			forall('.//td[@class="name"]', null, function(obj,i){	btn(XX('.//td[@class="action"]',XPFirst,obj.parentNode),'questowner'+i,'questowner','?',obj.innerHTML,showplayernfo,5);});
		break;
		case "branchOffice":
			var table=XX('//table[@class="tablekontor"]', XPList).snapshotItem(1);
			if (table) {
				forallrows(table, 1, function(tbl,i){
					var nm=tbl.rows[i].cells[0].textContent.split('(')[1];
					if (nm) {
						nm=nm.split(')')[0];
						btn(tbl.rows[i].cells[tbl.rows[i].cells.length-1],'questowner'+i,'questowner','?',nm,showplayernfo,5);
					}
				});
			}
		break;
		case "worldmap_iso":
			//var getmap=$('clickMap');
			//clickTo(getmap,showislandnfo,0);
		break;
		case "plunder":
			var form=XX('//form[@id="plunderForm"]//input[@type="submit"]',XPFirst).parentNode;
			btn(form,'plunderbash5','plunderbash','x5 Attack','Attack the city 5 times.',actionshandler,200,';font-size:11px;');
			btn(form,'plunderbash6','plunderbash','x6 Attack','Attack the city 6 times.',actionshandler,20,';font-size:11px;');
			btn(form,'schedule','plunderbash','Schedule Attack(not yet working)','Attack the city at a specified time.',actionshandler,20,';font-size:11px;');
		break;
	}
	setInterval ( schedulerhandler, 1000 );
}







var version=65;
var scriptlocation="http://www.ika-core.org/scripts/the_corsairs_tools.user.js";

// Set the highlight colors for every case
//can be red, green, blue etc
//also #123 or #112233 (#rrggbb) for example Alliance = [	'Blue'	,'#000000' ];
//or rgb(100,100,100)  with a max of 255 for example Alliance = [	'rgb(100,255,255)'	,'Blue'	];
//if u still dont understand google for html style color
Alliance	=	[	'Blue'	,'Blue'	];
Allies		=	[	'Cyan'	,'Green'];
NoAlliance	=	[	'Black','Brown'];
Enemies		=	[	'Red'	,'Red'	];


// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='almop';
		alliancenm='almop';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['ΒΑΝΚ'			, Allies	],
					['RAMPAGE-=+'	, Enemies 	]  ];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://thecorsairs.playogame.com/chatbox_mod/chatbox.forum';
		//forumurl='.';
		forumurl='http://thecorsairs.playogame.com/index.htm';
		//forumurlnew='.';
		forumurlnew='http://thecorsairs.playogame.com/search.forum?search_id=newposts';
		break;
	case 's1.ikariam.gr':
		alliancefullnm='almop';
		alliancenm='almop';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					['AkriS'		, Allies 		],
					['alxer'	, Allies 		],
					['DOL'		, Allies 		],
					['GOI'	, Allies 		],
					['GRF'		, Allies 		],
					['G_5_'	, Allies 		],
					['ION'		, Allies 		],
					['Lions'		, Allies 		],
					['PAO'		, Allies 		],
					['PKeep'		, Allies 		],
					['RoyAL'		, Allies 		],
					['S-F'		, Allies 		],
					['SAMAL'		, Allies 		],
					['SFI'	, Allies 		],
					['U-I-D'		, Allies 		],
					['U-Β-D'		, Allies 		],
					['U-Μ-D'		, Allies 		],
					['VBD'		, Allies 		],
					['XR-GE'	, Allies 		],
					['XXX'	, Allies 		],
					['?DeLe'	, Allies 		]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		chaturl='.';
		//chaturl='http://thecorsairs.playogame.com/chatbox_mod/chatbox.forum';
		forumurl='.';
		//forumurl='http://thecorsairs.playogame.com/index.htm';
		forumurlnew='.';
		//forumurlnew='http://thecorsairs.playogame.com/search.forum?search_id=newposts';
		break;
	//for a friend
	case 's4.ikariam.gr':
		alliancefullnm='almop';
		alliancenm='almop';
		alliance=[	['Χωρίς Συμμαχία', NoAlliance	],
					[alliancenm	, Alliance		],
					['AkriS'		, Allies 		],
					['alxer'	, Allies 		],
					['DOL'		, Allies 		],
					['GOI'	, Allies 		],
					['GRF'		, Allies 		],
					['G_5_'	, Allies 		],
					['ION'		, Allies 		],
					['Lions'		, Allies 		],
					['PAO'		, Allies 		],
					['PKeep'		, Allies 		],
					['RoyAL'		, Allies 		],
					['S-F'		, Allies 		],
					['SAMAL'		, Allies 		],
					['SFI'	, Allies 		],
					['U-I-D'		, Allies 		],
					['U-Β-D'		, Allies 		],
					['U-Μ-D'		, Allies 		],
					['VBD'		, Allies 		],
					['XR-GE'	, Allies 		],
					['XXX'	, Allies 		],
					['?DeLe'	, Allies 		]	];
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://thecorsairs.playogame.com/chatbox_mod/chatbox.forum';
		//forumurl='.';
		forumurl='http://thecorsairs.playogame.com/index.htm';
		//forumurlnew='.';
		forumurlnew='http://thecorsairs.playogame.com/search.forum?search_id=newposts';
		break;
}
	main();
	ToolsMenu();
	sortAllies();
	fixmessages();
	fixtreaties();
	showchat();
	showgames();




































// ==UserScript==

// @name 		Ikariam Chat

// @description	Have a chat in ikariam's game field

// @version		1.0

// @author 		Luca Saba (lucasaba at gmail dot com)

// @namespace	MMXForge

// @include		http://s*.ikariam.*/*

// @exclude		http://board.ikariam.*/*

// ==/UserScript==



var version= '1.0';

var limit = GM_getValue('msg_limit', 30); //Number of messages displayed

var domain = top.location.host.split(".")[2];

var chatURL = GM_getValue('chatURL', 'http://chat.mmxforge.net/');

var locationParts = top.location.href.split("?");

var params = "";



if(locationParts.length > 1) params = locationParts[1].split("&");

var isCityView = (document.getElementById('city') != null);

var isEmbassyView = (document.getElementById('embassy') != null);



/*

 * Words dictionary

 */

var lang={

  cr: {'send': 'slati', 'sh': 'PrikaÅ¾i/Sakrij', 'msg': 'Poruka...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  de: {'send': 'Senden', 'sh': 'Zeigen/Ausblenden', 'msg': 'Nachricht...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  dk: {'send': 'sende', 'sh': 'Vis/Skjul', 'msg': 'Besked...', 'cnf': 'Configuration', 'switch': 'Skift Chatrum', 'dele': 'Slet Chatrum', 'add': 'TilfÃ¸j Chatrum', 'err_noname': 'Tekst er pÃ¥krÃ¦vet!', 'room_alredy_present': 'Chatrummet findes allerede'},

  en: {'send': 'Send', 'sh': 'Show/Hide', 'msg': 'Message...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  es: {'send': 'enviar', 'sh': 'Mostrar/Ocultar', 'msg': 'Mensaje...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  fr: {'send': 'envoyer', 'sh': 'Afficher/Masquer', 'msg': 'Message...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  it: {'send': 'Invia', 'sh': 'Visualizza/Nascondi', 'msg': 'Messaggio...', 'cnf': 'Configurazione', 'switch': 'Cambia Chat Room', 'dele': 'Elimina Chat Room', 'add': 'Aggiungi Chat Room', 'err_noname': 'Testo necessario!', 'room_alredy_present': 'Chat Room giÃ  presente'},

  gr: {'send': 'Στείλε', 'msg': 'Μήνυμα', 'cnf': 'Ρυθμίσεις', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Γράψε κάτι ντε!!!', 'room_alredy_present': 'Το έχεις ήδη'},

  jp: {'send': 'é€ã‚‹', 'sh': 'è¡¨ç¤º/éžè¡¨ç¤º', 'msg': 'ãƒ¡ãƒƒã‚»ãƒ¼ã‚¸...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  no: {'send': 'Sende', 'sh': 'Vise/Skjule', 'msg': 'Melding...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  pl: {'send': 'WysÅ‚aÄ‡', 'sh': 'PokaÅ¼/Ukryj', 'msg': 'WiadomoÅ›Ä‡...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  pt: {'send': 'Emita', 'sh': 'Mostra/couro cru', 'msg': 'Mensagem...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  ro: {'send': 'Trimite', 'sh': 'Vedere/Ascunde', 'msg': 'Mesaj...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  ru: {'send': 'ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ', 'sh': 'ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚ÑŒ/Ð¡ÐºÑ€Ñ‹Ñ‚ÑŒ', 'msg': 'Ð¡Ð¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ...', 'cnf': 'ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸', 'switch': 'Ð˜Ð·Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ Ñ‡Ð°Ñ‚', 'dele': 'Ð£Ð´Ð°Ð»Ð¸Ñ‚ÑŒ Ñ‡Ð°Ñ‚', 'add': 'Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ Ñ‡Ð°Ñ‚', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Ð¢Ð°ÐºÐ¾Ð¹ Ñ‡Ð°Ñ‚ ÑƒÐ¶Ðµ ÑÑƒÑ‰ÐµÐ²ÑÑ‚Ð²ÑƒÐµÑ‚'},

  se: {'send': 'Skicka', 'sh': 'Visa/dÃ¶lj', 'msg': 'Meddelande...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  sf: {'send': 'lÃ¤hettÃ¤Ã¤', 'sh': 'NÃ¤ytÃ¤/Piilota', 'msg': 'Viesti...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

  tr: {'send': 'gÃ¶ndermek', 'sh': 'gÃ¶stermek/gizlemek', 'msg': 'haber...', 'cnf': 'Configuration', 'switch': 'Change Chat Room', 'dele': 'Delete Chat Room', 'add': 'Add Chat Room', 'err_noname': 'Text is mandatory!', 'room_alredy_present': 'Chat Room already present'},

}

var local = 'en'; //For i18n

//If domain id in the dictionary, use domain's dictionary

if(domain in lang) local = domain;



var playerAllyName = GM_getValue('allyname', '');

var playerAllyTag = GM_getValue('allytag', '');

var playerAllyLink = GM_getValue('allylink', '');



var chatrooms = GM_getValue('chatrooms', "Almop").split(',');



var chatroom = GM_getValue('Almop', "Almop");





/*

 *

 * Taken from ikariam-inline-score from here...

 *

 */

getElementsByClass = function(inElement, className) {

  var all = inElement.getElementsByTagName('*');

  var elements = [];

  for (var e = 0; e < all.length; e++) {

    if (all[e].className == className) {

      elements[elements.length] = all[e];

    }

  }

  return elements;

};



var listParts = "";

var playerName = "anonymous";

// Get the player's name

var nameElement = getElementsByClass(document,"owner");

if(nameElement.length > 0) 

{

  listParts = nameElement[0].innerHTML.split(">")

  listParts[2] = listParts[2].split("<")[0];

  playerName = listParts[2].replace(/^\s+|\s+$/g, ''); // trim up the Player Name

}

/* ... to here */ 



/*

  * Get's ally name, ally tag and ally external page when in embassy

  */

function getAllyInfo()

{

  var tb = document.getElementById("allyinfo");

  playerAllyTag = tb.rows[0].cells[0].innerHTML;

	playerAllyName = tb.rows[0].cells[1].innerHTML;

	playerAllyLink = tb.rows[4].cells[1].childNodes[0].href;

	

  GM_setValue('allytag', playerAllyTag);

  GM_setValue('allylink', playerAllyLink);

  GM_setValue('allyname', playerAllyName);

}





/*

  * Definition for base html elements

  */

var baseElements = '<h3 class="header" id="chHeader">';

baseElements += '<span id="chAllayLink" style="margin-right: 2em"><a href="' + playerAllyLink + '" target="_blank">' + playerAllyTag + '</a></span>';

baseElements += '<span id="chScriptName">Ikariam Chat</span>'; 

baseElements += '<span id="chIconify" style="margin-left: 2em">';

baseElements += '<img id="chIconyIcon" style="display: inline; position: absolute; margin-top: 3px; align: right;" src="http://img440.imageshack.us/img440/5046/menobb0.jpg" title="' + lang[local]['sh'] + '">';

baseElements += '</span></h3>';

baseElements += '<input type="text" name="chatbarText" id="chatbarText" value="' + lang[local]['msg'] + '" style="margin-left: 1em; margin-top: 1em;"';

baseElements += ' onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';" ';

baseElements += ' onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;" />';

baseElements += '<input type="button" class="button" id="chSendMessage" value="' + lang[local]['send'] + '">\n';

baseElements += '<div id="chMsgAndCfg">';

baseElements += '<div id="chMessagesListBox" style="width:240px;height:250px; padding:1px 0;font-size:12px; margin-left: 6px;">';

baseElements += '<div id="chMessagesList" style="height: 240px;overflow:auto;margin-right: 2em;border: 1px solid #CB9B6B;"></div></div>';

baseElements += '<h3 class="header" id="chConfigHeader">';

baseElements += '<span id="chScriptName">' + lang[local]['cnf'] + '</span>'; 

baseElements += '<span id="chConfigIconify" style="margin-left: 2em">';

baseElements += '<img id="chConfiCloseIcon" ';

baseElements += 'style="display: inline; position: absolute; margin-top: 3px; align: right;" ';

baseElements += 'src="http://';

if(GM_getValue('show_config', 0) == 0) baseElements += 'img440.imageshack.us/img440/6110/piusr5.jpg"';

else baseElements += 'img440.imageshack.us/img440/5046/menobb0.jpg"';

baseElements += ' title="' + lang[local]['sh'] + '">';

baseElements += '</span></h3><div id="chConfigDiv"';

if(GM_getValue('show_config', 0) == 0) baseElements += ' style="display: none">';

else baseElements += ' style="display: block">';

baseElements += "<select id='chRoomsSelect' style='margin: 1em 1em 1em 1em;'>";

for(i=0; i < chatrooms.length; i++) {

  if(chatrooms[i] != '') 

  {

    var striln = chatrooms[i].length;

    baseElements += "<option";

	if(chatrooms[i] == chatroom)

	{

	  baseElements += " selected";

	}

    baseElements += ">" + chatrooms[i] + "</option>";

  }

}

baseElements += "</select>";

baseElements += "<input type='button' class='button' id='chSwitchToBtn' value='" + lang[local]['switch'] + "' />";

baseElements += "<input type='button' class='button' id='chDeleteBtn' value='" + lang[local]['dele'] + "' /><hr/>";

baseElements += "<input type='text' id='chTxtNewChatRoom' style='margin: 1em 1em 1em 1em;' />";

baseElements += "<input type='button' class='button' id='chAddBtn' value='" + lang[local]['add'] + "'>";

baseElements += "</div></div>";



function getChatData()

{

  GM_xmlhttpRequest({

    'method': 'GET',

    'url': chatURL + 'getChatData.php?limit=' + limit + '&ally=' + chatroom,

    'headers': { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey' },

    'onload': function(responseDetails) { diplayData(responseDetails.responseText); }

  });

}



function postChatData(message)

{

  var postParam = 'n=' + playerName + '&c=' + message + '&ally=' + chatroom;

  GM_xmlhttpRequest({

    'method': 'POST',

    'url': chatURL + 'sendChatData.php',

    'headers': { 'Content-type': 'application/x-www-form-urlencoded' },

    'data': encodeURI(postParam),

	  'onload': function(res) { getChatData(); }

  });

}



function chSendMessage()

{

  var chMessage = document.getElementById("chatbarText");

  if(chMessage.value == "" || chMessage.value == chMessage.defaultValue)

  	return alert(lang[local]['err_noname']);

  postChatData(chMessage.value);

}



function diplayData(chatText)

{

  if(document.getElementById('information') == null) return;

  var results = chatText.split('---');

  //If no message is present... just open and close ul

  var unordList = '<ul></ul>';

  if (results.length > 2) {

  	unordList = '<ul>';

    for(i=0;i < results.length - 2;i=i+2) { //goes through the result one message at a time

      unordList += "<li><b>" + results[i] + ":</b> " + results[i+1] + "</li>\n"; //inserts the new content into the page

    }

    unordList += '</ul>\n';

  }

  if(document.getElementById('ikachat') == null)

  {

    var divContainer = document.createElement('div');

    divContainer.setAttribute('id','ikachat');

    divContainer.innerHTML = baseElements;

	  if(document.getElementById('information') == null) return;

    document.getElementById('information').appendChild(divContainer);

    document.getElementById('chMessagesList').appendChild(document.createElement("p"));

  }

  document.getElementById('chMessagesList').firstChild.innerHTML = unordList;

}



function startChat()

{

  getChatData();

  window.setTimeout(startChat, 10000);

}



if(isCityView) startChat();

else if(isEmbassyView) getAllyInfo();




/*

 * Events handling:

 * chSendMessage button clicked;

 * chIconify link clicked

 * chatbarText input return pressed

 */

document.addEventListener('click',function(event) {

  //Send Message Button

  if (event.target.id=='chSendMessage') {

    var chMessage = document.getElementById("chatbarText");

    if(chMessage.value == "" || chMessage.value == chMessage.defaultValue)

  	  return alert(lang[local]['err_noname']);

    postChatData(chMessage.value);

    document.getElementById("chatbarText").value = document.getElementById("chatbarText").defaultValue;

  }

  //Hide/Show Chat Board

  else if(event.target.id=='chIconyIcon'){

    if(document.getElementById('chMsgAndCfg').style.display != 'none')

    {

      document.getElementById('chMsgAndCfg').style.display = 'none';

      document.getElementById('chIconyIcon').src = "http://img440.imageshack.us/img440/6110/piusr5.jpg";

    }

    else

    {

      document.getElementById('chMsgAndCfg').style.display = 'block';

      document.getElementById('chIconyIcon').src = "http://img440.imageshack.us/img440/5046/menobb0.jpg";

    }

  }

  //Hide/Show Config Board

  else if(event.target.id=='chConfiCloseIcon'){

    if(document.getElementById('chConfigDiv').style.display != 'none')

    {

      document.getElementById('chConfigDiv').style.display = 'none';

      document.getElementById('chConfiCloseIcon').src = "http://img440.imageshack.us/img440/6110/piusr5.jpg";

      GM_setValue('show_config', 0);

    }

    else

    {

      document.getElementById('chConfigDiv').style.display = 'block';

      document.getElementById('chConfiCloseIcon').src = "http://img440.imageshack.us/img440/5046/menobb0.jpg";

      GM_setValue('show_config', 1);

    }

  }

  //Delete ChatRoom

  else if(event.target.id=='chDeleteBtn')

  {

    var slct = document.getElementById('chRoomsSelect');

	  slct.removeChild(slct.options[slct.selectedIndex]);

	  if(slct.selectedIndex >= 0)

	    chatroom = slct.options[slct.selectedIndex];

	  else

	  {

	    //If all chatrooms where deleted, force local chatroom

	    chatroom = "Almop";

	    var slctOpt = document.createElement('option');

	    slctOpt.value=chatroom;

	    slctOpt.text=chatroom;

	    slct.appendChild(slctOpt);

	  }

	  var chatRoomsString = '';

	  for(i=0; i<slct.options.length; i++)

	  {

	    if(i > 0) chatRoomsString += ",";

	    chatRoomsString += slct.options[i].text;

	  }

	  GM_setValue('chatrooms', chatRoomsString);

	  getChatData();

  }

  //Add ChatRoom

  else if(event.target.id=='chAddBtn')

  {

    var newChatInput = document.getElementById('chTxtNewChatRoom');

	  newChatInput.value = newChatInput.value.replace(/^\s+|\s+$/g, '_');

	  if(newChatInput.value=='')

	  {

	    alert(lang[local]['err_noname']);

	    return;

	  }

	  chatroom = newChatInput.value;

	  GM_setValue('selected_chatroom', chatroom);

	  var newSelectedValue = chatrooms.indexOf(chatroom);

	  var slct = document.getElementById('chRoomsSelect');

	  //Check if the name is already present

	  if(newSelectedValue >= 0)

    {

	    alert(lang[local]['room_alredy_present']);

	    return;

	  }

	  //if not... create a new select option

    chatrooms[chatrooms.length] = chatroom;

	  var slctOpt = document.createElement('option');

	  slctOpt.value=chatroom;

	  slctOpt.text=chatroom;

	  slct.appendChild(slctOpt);

	  newSelectedValue = slct.length - 1;

	

	  slct.selectedIndex = newSelectedValue;

	  var chatRoomsString = '';

	  for(i=0; i<chatrooms.length; i++)

	  {

	    if(i > 0) chatRoomsString += ",";

	      chatRoomsString += chatrooms[i];

	  }

	  GM_setValue('chatrooms', chatRoomsString);

	  newChatInput.value='';

	  getChatData();

  }

  //Change ChatRoom

  else if(event.target.id=='chSwitchToBtn')

  {

    var slct = document.getElementById('chRoomsSelect');

  	chatroom = slct.value;

	  getChatData();

	  GM_setValue('selected_chatroom', chatroom);

  }

}, true);



function sendMessageOnReturn(e)

{

  if(e.target.id == 'chatbarText' && e.keyCode == 13)

  {

    chSendMessage();

    document.getElementById('chatbarText').value = '';

  }

}



addEventListener("keyup", sendMessageOnReturn, false);
var baseDivCreated = false;
var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var subDomain = gameServerParts[1];
var domain = gameServerParts[2];

var post = {
    score: "score",
 military: "army_score_main",
     gold: "trader_score_secondary" };
     
var updateCounter =0;
var scoreTypes = {
    0: "score", 
    1: "military", 
    2: "gold" };

var scoreShown = false;

getElementsByClass = function(inElement, className, findIn) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) {
    if (findIn == true) {
        if (all[e].className.indexOf(className) > 0) {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className) {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};

// called using player name, score type, 
function requestScore(playerName, type, onload) {
    GM_xmlhttpRequest({
      method:'POST',
      url:'http://' + gameServer + '/index.php',
      data:"view=highscore&highscoreType=" + post[type] + "&searchUser=" + playerName,
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/atom+xml,application/xml,text/xml',
        'Referer': 'http://' + gameServer + '/index.php'
      },
      onload:onload
    });
}

function fmtNumber(n) {
  n += "";
  for (var i = (n.length - 3); i > 0; i -= 3) {
    n = n.slice(0, i) +","+ n.slice(i);
  }
  return n;
}

function createBaseDiv() {
    baseDivCreated = true;
    
    scoreElement = document.createElement("div");
    
    var scoreDiv = <>
        <li style="margin: 2px 10px;font-size:11px" id="total_score" class="ally">
            <span style="float:left;" class="textLabel">{lang['score']}:</span>
            <div id="score">Unknown</div>
        </li>
        <li style="margin: 2px 10px;font-size:11px" id="army_score_main" class="ally">
            <span style="float:left;" class="textLabel">{lang['military']}:</span>
            <div id="military">Unknown</div>
        </li>
        <li style="margin: 2px 10px;font-size:11px" id="trader_score_secondary" class="ally">
            <span style="float:left;" class="textLabel">{lang['gold']}:</span>
            <div id="gold">Unknown</div>
        </li>
    </>;
    
    scoreElement.innerHTML = scoreDiv;
    
    // get container for Island view
    var informationContainer = document.getElementById('infocontainer');
    if (!informationContainer) { 
        informationContainer = document.getElementById('information'); 
    }
    
    var allyClass = getElementsByClass(informationContainer, "ally") 
    
    insertAfter(scoreElement, allyClass[0]);
    scoreShown = true;
}

function insertAfter(newElement,targetElement) {
	//target is what you want it to go after. Look for this elements parent.
	var parent = targetElement.parentNode;
	
	//if the parents lastchild is the targetElement...
	if(parent.lastchild == targetElement) {
		//add the newElement after the target element.
		parent.appendChild(newElement);
		} else {
		// else the target has siblings, insert the new element between the target and it's next sibling.
		parent.insertBefore(newElement, targetElement.nextSibling);
		}
}

function updateScoreDiv(lang, score, military, gold, lootable) {

    document.getElementById('score').innerHTML = score;
    document.getElementById('military').innerHTML = military;
    
    if (lootable !== "") {
        gold = gold + " (" + lootable + ")"; 
    }
    document.getElementById('gold').innerHTML = gold;
}

function updateScore(type, score) {
    document.getElementById(type).innerHTML = score;
}

function updateDetails(type, playerName, townLevel, responseText) {
    var hiddenDiv = document.createElement("div");
    hiddenDiv.setAttribute("style", "display: none;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;
    var score = getElementsByClass(hiddenDiv, "score", false);
    var pname = getElementsByClass(hiddenDiv, "name", false);
    for (var e = 0; e < pname.length; e++) {
        if (pname[e].innerHTML == playerName) {
            var totalScore = score[e].innerHTML;
        }
    }
    document.body.removeChild(hiddenDiv);

    if (type == "gold") {
        gold = parseInt(totalScore.replace(/,/g, ""),10);
        lootable = Math.round(townLevel * (townLevel - 1) / 10000 * gold);
        totalScore += " (" + fmtNumber(lootable) + ")";
    }
    GM_setValue(type, totalScore);
    document.getElementById(type).innerHTML = totalScore;
}

function cityInformation() {
    createBaseDiv();
    
    // Get the lanugage
    lang = defineLanguage(domain);
    
    var playerScore = -1;
    // Remove the "points" information (as of 0.2.8), and get the value for later
    var infoContainer = document.getElementById("infocontainer");
    if (infoContainer) {
        var pointsLi = getElementsByClass(infoContainer, "name", false);
        if (pointsLi[1]) {
            playerScore = parseInt(pointsLi[1].innerHTML.split(/>/)[2].replace(/,/g, ""),10);
            pointsLi[1].style.display = "none";
        }
    }
    
    // Remove the disabled actions... looks messy when it happens
    var actions = document.getElementById("actions");
    if (actions) {
        textSpans = getElementsByClass(actions, "disabled", true);
        for (var cnt = 0; cnt < textSpans.length;cnt++) {
            //textSpans[cnt].style.display = "none";
        }
    }
    
    // Removes the report player link, again causes a fliker
    var reportPlayer = getElementsByClass(document, "reportPlayer");
    //reportPlayer[0].style.display = "none";
    
    
    updateScore("score", lang.fetch); updateScore("military", lang.fetch); updateScore("gold", lang.fetch); 

    var listParts = "";
    // Get the players name
    listParts = getElementsByClass(document,"owner", false)[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var playerName = listParts[2].replace(/^\s+|\s+$/g, ''); // trim up the Player Name// get the players name
            
    // Get the players town level for gold pillage data
    listParts = getElementsByClass(document,"citylevel", false)[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var townLevel = parseInt(listParts[2].replace(/^\s+|\s+$/g, ''), 10); // trim up the town level
            
    var checkedTime = (new Date().getTime() - (1000*60*10));
    if (playerName != GM_getValue("lastPlayerCheck") || GM_getValue("lastCheckedTimestamp") < checkedTime || GM_getValue("lastServerCheck") != gameServer) {

        if (playerScore > -1) {
            updateScore('score', fmtNumber(playerScore));
        } else {
            requestScore(playerName, 'score', function(responseDetails) {
                updateDetails('score', playerName, townLevel, responseDetails.responseText);
            });
        }
        
        requestScore(playerName, 'military', function(responseDetails) {
            updateDetails('military', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'gold', function(responseDetails) {
            updateDetails('gold', playerName, townLevel, responseDetails.responseText);
        });
        
        GM_setValue("lastCheckedTimestamp", new Date().getTime() + "");
        GM_setValue("lastPlayerCheck", playerName);
        GM_setValue("lastServerCheck", gameServer);
    } else {
        for (var interation = 0;interation < 3; interation++) {
            var type = scoreTypes[interation];
            document.getElementById(type).innerHTML = GM_getValue(type);
        }
    }
}

function defineLanguage(langTDL) {
    switch (langTDL) {
        case "fr":
            language = { inline:"Inline Score",
            fetch:"cargando...",
            score:"Points",
            military:"Troupes",
            gold:"Oro" };
            break;
        case "gr":
            language = { inline:"Inline Score",
            fetch:"τσιμπάω δεδομένα·...",
            score:"σκορ",
            military:"στρατος",
            gold:"χρυσός" };
            break;
        case "de":
            language = { inline:"Inline Score",
            fetch:"Laden...",
            score:"Gesamtpunkte",
            military:"GenerÃƒÂ¤le",
            gold:"Goldbestand" }
            break;
        case "tr":
            language = { inline:"Inline Score",
            fetch:"Yukleniyor...",
            score:"Toplam Puan",
            military:"Askeri Puan",
            gold:"Altin Puani" };
            break;
        case "cz":
            language = { inline:"Inline Score",
            fetch:"naÃ„ÂÃƒÂ­tavam...",
            score:"CelkovÃƒÂ© SkÃƒÂ³re",
            military:"VojenskÃƒÂ½ skÃƒÂ³re",
            gold:"ZlatÃƒÂ¡ zÃƒÂ¡soba" };
            break;
        case "sk":
            language = { inline:"Inline Score",
            fetch:"nahrÃƒÂ¡vam...",
            score:"CelkovÃƒÂ© SkÃƒÂ³re",
            military:"VojenskÃƒÂ© skÃƒÂ³re",
            gold:"ZlatÃƒÂ¡ zÃƒÂ¡soba" };
            break;
        case "tw":
            language = { inline:"Ã¥Ë†â€ Ã¦â€¢Â¸Ã©Â¡Â¯Ã§Â¤Âº",
            fetch:"Ã¨Â®â‚¬Ã¥Ââ€“Ã¤Â¸Â­...",
            score:"Ã§Â¸Â½Ã§Â©ÂÃ¥Ë†â€ ",
            military:"Ã¦Ë†Â°Ã§Ë†Â­Ã¥Â°â€¡Ã¨Â»Â",
            gold:"Ã©Â»Æ’Ã©â€¡â€˜Ã¥Â­ËœÃ©â€¡Â" };
            break;
        case "hu":
            language = { inline:"Inline Score",
            fetch:"TÃƒÂ¶ltÃƒÂ©s...",
            score:"Ãƒâ€“sszpontszÃƒÂ¡m",
            military:"Katonai pont",
            gold:"Arany" };
            break;
        case "se":
            language = { inline:"Inline Score",
            fetch:"hÃƒÂ¤mtar...",
            score:"TotalpoÃƒÂ¤ng",
            military:"GeneralspoÃƒÂ¤ng",
            gold:"GuldmÃƒÂ¤ngd" }
            break;
        case "pl":
            language = { inline:"Inline Score",
            fetch:"Ã…Âadowanie...",
            score:"CaÃ…â€škowity Wynik",
            military:"GeneraÃ…â€šowie",
            gold:"Zapas ZÃ…â€šota" };
            break;
        case "ikariam":
            if (subDomain == "fi") {
                language = { inline:"Inline Score",
                fetch:"haetaan...",
                score:"Kokonaispisteet",
                military:"Sotilaspisteet",
                gold:"Kulta" };
            }
            break;
        default:
            language = { inline:"Inline Score",
            fetch:"fetching...",
            score:"Total Score",
            military:"Military Score",
            gold:"Gold Score" };
            break;
    }
    return language;
}



function init() {
    lang = defineLanguage(domain);
    
    var linkElements = document.getElementsByTagName('a');
    for (var i = 0; i < linkElements.length; i++) {
        if (linkElements[i].id.search(/city_[0-9]*/) != -1) {
            linkElements[i].addEventListener('click', function() { window.setTimeout(cityInformation, 1); }, false);
        }
    }
        
    var informationDiv = document.getElementById('information');
    if (informationDiv) {
        var listElements = informationDiv.getElementsByTagName('li');
        if (listElements.length > 0) {
            cityInformation();
        }
    }
}

init();

