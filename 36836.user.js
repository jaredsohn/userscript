// ==UserScript==
// @name		TPC Tools
// @description	  
// ==/UserScript==

﻿// Ika-core, a collection of modules(sripts) to beutify and assist web page interaction.
//    Copyright (C) 2008 GBozouris
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
//
//    You are not allowed to offer this programm for download or redistribute it 
//    in any way except directions stated at the www.ika-core.org website.
//    This programm is offered for download only at www.ika-core.org.
//     If you downloaded this programm from another location please report it 
//     at the www.ika-core.org website.
//     This programm maybe downloaded automatically by You but only form the location 
//     mentioned above.
//     The code remains as is, no alteration or modification should be done without the 
//     written permission of the auhtor.
//     This script is not permited to be incorporated into any of your program/s or 
//     any proprietary programs.
//     This script will comunicate with www.ika-core.org to check for upgrades,
//     or for any other means. Any damage by usage of bandwidth by this programm
//     is considered your expense and fault and not the auhtors.
//     In other means , you know what you are doing.
//     Any damage inflicted in general to others (Companies, individuals etc) by use of 
//     this code is your responsibility. 
 

var queryserver=getserverindex();
var serverindex=queryserver[1];
var world = /([0-9]+)/.exec(location.host);
	world = RegExp.$1;
var country=queryserver[0];
var alliancefullnm;var alliancenm;var alliance;var chaturl;var forumurl;var forumurlnew;var Alliance;var Allies;var NoAlliance;var Enemies;var corsairmenu;var legend;var TreatyYes;var TreatyNo;var updatenotification;var maplegend;var txtplswait;var txtmap;var txtrefresh;var txtcoorddata;var txtmapdata;var txtmapdata2;var txtpagedata;var txtinfodata;var txtsorting;var txtchkplayer;var scheduler=[[0,0]];var bubbles=0;var timelapse=0;
var getbody=document.getElementsByTagName('body')[0];
var core_vers=26;
var ika="http://www.ika-core.org/search";

function lang() {
	//used to check if a lang is working
	//country='en';
	//default chat provided by ika-core.org
	if 	(chaturl=='.') chaturl='http://www.ika-core.org/chat/';	
	switch (country) {
   case 'gr':
      ogameLink='http://ikariam.ogame-world.com/gr';
      corsairmenu=[
      //this one is for the title of the Tools menu
      ['Εργαλεία συμμαχίας' +alliancefullnm , '', '',''],
      //    URL , Info, Button Text, OnClick event in javascript,   '-' for spacer
      ['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'Κυκλικό μήνυμα προς όλους τους Σύμμαχους', 'Αποστολή Κυκλικού<br> Μήνυματος','','-'],
      [forumurl, ' Προς το Forum Συμμαχίας ','Forum '+alliancefullnm ,''],
      [forumurlnew, ' Προς το Forum Συμμαχίας, νέες καταχωρήσεις ',' Forum '+alliancefullnm +' <br> νέες καταχωρήσεις','','-'],
      [chaturl , ' Το Chat της Συμμαχίας, ανοίγει σε νέο παράθυρο' , 'Chatbox(Νέο Παράθυρο)' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
      ['', ' Το Chat της Συμμαχίας, ανοίγει στο ίδιο παράθυρο στο κάτω μέρος ','Chatbox(Διχοτόμηση)','makeframes(\''+chaturl+'\');' ,'-'],
      ['http://ikariamlibrary.com/?content=IkaFight' , ' Εργαλείο για τους υπολογισμούς των στρατευμάτων ... ', 'Υπολογιστής Μάχης','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
      [ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Εργαλείο εύρεσης πόλεων ενός παίχτη.', 'Αναζήτηση Πόλης',''],
      [ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world , ' Εργαλείο εύρεσης νησιών ενός παίχτη.', 'Αναζήτηση Νησιού','','-'],
      ['http://www.ika-core.com' , 'Αναβάθμιση των εργαλείων στην τελευταία έκδοση', ' Αναβάθμιση Εργαλείων συμμαχίας'+alliancefullnm,'']];
      //Island view Map Legend
      legend ='<font color="'+Alliance[0]+'" size=1>• ' +alliancefullnm+ '</font><br>'+
            '<font color="'+Allies[0]+'" size=1>• Σύμμαχοι</font><br>'+
            '<font color="'+NoAlliance[0]+'" size=1>• Χωρίς συμμαχία</font><br>'+
            '<font color="'+Enemies[0]+'" size=1>• Εχθροί</font><br>';
      TreatyYes="Έχετε ήδη πολιτισμική συμφωνία με τον παίχτη αυτόν.";
      TreatyNo="Δεν βρέθηκε καμία πολιτισμική συμφωνία με τον παίχτη αυτόν.";
      updatenotification='Υπάρχει μια νέα έκδοση των Εργαλείων της συμμαχίας'+alliancefullnm+'.\n Εάν θέλετε να κάνετε αναβάθμιση πιέστε ΟΚ για να μεταβείτε στην σελίδα αναβαθμισης www.ika-core.org.';
      txtplswait="Παρακαλώ Περιμένετε";
      txtmap="Χάρτης";
      txtrefresh="Ανανέωση";
      maplegend=['Τα νησιά σου','Νησιά Αναζήτησης','Δικά σου νησιά και της αναζήτησης','Νησιά','Θάλασσα','Πιέστε σε οποιοδήποτε νησί για να δείτε πληροφορίες για αυτό.'];
      txtcoorddata='- Εύρεση στοιχείων για Συντεταγμένες ';
      txtmapdata='- Εύρεση χάρτη για παίχτη';
      txtmapdata2='- Εύρεση χάρτη για Συμμαχία';
      txtpagedata='- Εύρεση σελίδας';
      txtinfodata='- Εύρεση Παίχτη';
      txtsorting='- Σορτάρισμα Παιχτών';
      txtchkplayer='- Έλεγχος Παίχτη';
      CultureTreaties='Πολιτιστική'; //magic word for treaties fix
      CultureTreatiesCancel=" Ακύρωση Πολιτιστικής συμφωνίας περιουσιακών στοιχείων";
      CultureTreatiesRequest=" Αίτηση Πολιτιστικής συμφωνίας περιουσιακών στοιχείων";
      break;
	case 'fr':
		ogameLink='http://ikariam.ogame-world.com/fr';
		corsairmenu=[
		//this one is for the title of the Tools menu
		[ alliancefullnm+' Tools'  , '', '',''],
		//    URL , Info, Button Text, OnClick event,   '-' for spacer
		['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'Envoyer un message à tous les membres', 'Envoyer un<br> message','','-'],
		[ forumurl, 'Forum des '+alliancenm ,'Forum',''],
		[ forumurlnew, 'Voir les derniers posts '+alliancenm, 'Nouveaux posts' ,'','-'],
		[ chaturl , 'Discuter avec les autres membres' , 'Chatbox' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		['', ' Discuter avec les autres membres ','Chatbox(Frame)','makeframes(\''+chaturl+'\');' ,'-'],
		['http://ikariamlibrary.com/?content=IkaFight' , 'Simulateur de bataille', 'Simulateur de bataille','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		[ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Chercher une ville ', 'Chercher une ville',''],
		[ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world, ' Chercher une île ', 'Chercher une île','','-'],
		['http://www.ika-core.com' , 'Le dernier script', ' Update du script des '+alliancenm ,'']];
		//Island view Map Legend
		legend ='<font color="'+Alliance[0]+'" size=1>• '+alliancefullnm+'</font><br>'+
				'<font color="'+Allies[0]+'" size=1>• Allies</font><br>'+
				'<font color="'+NoAlliance[0]+'" size=1>• Sans Alliance</font><br>'+
				'<font color="'+Enemies[0]+'" size=1>• Enemies</font><br>';
		TreatyYes="You already have a cultural Treaty with this Player";
		TreatyNo="No cultural treaties found for this player.";
		updatenotification='Il y a une nouvelle version du script des '+alliancefullnm+'.\n Mettez à jour le script en www.ika-core.org?';
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
		[	alliancefullnm+' Araçları' , '', '',''],
		//    URL , Info, Button Text, OnClick event,   '-' for spacer
		['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'Bütün üyelere mesaj gönder', 'Sirküler<br> Mesaj','','-'],
		[ forumurl, ' İttifak Forumu ',alliancenm+' Forum ',''],
		[ forumurlnew, ' İttifak Forumu, son eklenenler ',alliancenm +' yeni forum mesajları','','-'],
		[ chaturl , ' İttifak Sohbet, yeni pencerede gösterim' , 'Sohbet (Yeni Pencere)' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		['', ' İttifak Sohbet, çerçeve içinde gösterim ','Sohbet (Çerçeve)','makeframes(\''+chaturl+'\');','-' ],
		['http://ikariamlibrary.com/?content=IkaFight' , 'Savaş hesaplamaları ... ', 'Savaş Hesaplayıcı','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		[ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Şehir bulma sayfası ', 'Şehir Arama',''],
		[ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world, ' Ada bulma sayfası ', 'Ada Arama','','-'],
		['http://www.ika-core.com' , 'Eklenti güncelleme', alliancenm+' Araçları Güncelle ','']];
		//Island view Map Legend
		legend ='<table style="cursor:default"><TR style="color:'+Alliance[0]+';font-size:small;font-weight:900;"><TD><font size=5>∆&nbsp;</font></TD><TD> '+alliancefullnm+'</TD>'+
				'<TR style="color:'+Allies[0]+';font-size:small;font-weight:200;"><TD><font size=2>&nbsp;∑</font></TD><TD>Dost</TD>'+
				'<TR style="color:'+NoAlliance[0]+';font-size:small;font-weight:200"><TD><font size=2>&nbsp;Φ</font></TD><TD>İttifaksız</TD>'+
				'<TR style="color:'+Enemies[0]+';font-size:small;font-weight:200"><TD><font size=2>&nbsp;Ψ</font></TD><TD>Düşman</TD></TR><table>';
		TreatyYes="Bu oyuncu ile zaten kültürel antlaşmanız var";
		TreatyNo="Bu oyuncu ile kültürel antlaşmanız yok.";
		updatenotification=alliancenm+' Araçlarının yeni sürümü var.\n www.ika-core.org.';
		txtplswait="Lütfen Bekleyin";
		txtmap="Harita";
		txtrefresh="Yenile";
		maplegend=['Sizin Adalarınız','Aranan Adalar','Sizin ve Aranan Adalar','Uymayan','Deniz','Bilgi için adaya tıklayın.'];
		txtcoorddata='- Koordinat Verisi Alınıyor';
		txtmapdata='- Harita Alınıyor(Oyuncu)';
		txtmapdata2='- Harita Alınıyor(İttifak)';
		txtpagedata='- Sayfa Alınıyor';
		txtinfodata='- Bilgi Alınıyor';
		txtsorting='- Oyuncular Sıralanıyor';
		txtchkplayer='- Oyuncu Kontrol Ediliyor';
		CultureTreaties='ültür'; //magic word for treaties fix, does it work??? please post on userscripts
		CultureTreatiesCancel=" Kültürel Anlaşmayı İptal Et";
		CultureTreatiesRequest=" Kültürel Anlaşma Teklif Et";
		break;
	case 'de':
		ogameLink='http://ikariam.ogame-world.de';
		corsairmenu=[
		//this one is for the title of the Tools menu
		[ alliancefullnm+' Tools' , '', '',''],
		// URL , Info, Button Text, OnClick event, '-' for spacer
		['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'Sende Mail an alle Allianzmitglieder ', 'Allianz<br> Rundmail','','-'],
		[ forumurl, ' Zum Allianz-Forum ','Forum: '+alliancefullnm ,''],
		[ forumurlnew, ' Neue Beiträge im Forum ',alliancefullnm +': Forum News','','-'],
		[ chaturl , ' Allianz Chat, in neuem Fenster ' , 'Chatbox(New Window)' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		['', ' Allianz Chat, in einem Frame ','Chatbox(Frame)','makeframes(\''+chaturl+'\');','-' ],
		['http://ikariamlibrary.com/?content=IkaFight' , ' Calculates a battle ... ', 'Battle Calc','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		[ogameLink+'/suche.php?view=suche_deluxe&land_i='+serverindex+'&welt='+world, ' DELUXE ', 'Suche DELUXE',''],
		[ogameLink+'/suche.php?view=suche_spieler&land_i='+serverindex+'&welt='+world , ' Tool zum suchen eines Spielers ', 'Suche Spieler',''],
		[ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Tool zum suchen von Städten eines Spielers ', 'Suche Stadt',''],
		[ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world , ' Tool zum suchen von Inseln eines Spielers ', 'Suche Insel','','-'],
		['http://www.ika-core.com' , 'Gets the latest script', ' Update '+alliancefullnm+' Tools ','']];
		//Island view Map Legend
		legend ='<font color="'+Alliance[0]+'" size=1>• '+alliancefullnm+'</font><br>'+
		'<font color="'+Allies[0]+'" size=1>• Freunde</font><br>'+
		'<font color="'+NoAlliance[0]+'" size=1>• FREIWILD :)</font><br>'+
		'<font color="'+Enemies[0]+'" size=1>• Feinde</font><br>';
		TreatyYes="Es besteht bereits ein Kulturgüterabkommen mit diesem Spieler.";
		TreatyNo="Es besteht kein Kulturgüterabkommen mit diesem Spieler.";
		updatenotification='Es gibt eine neue Version vom '+alliancefullnm+' Tools.\n Jezt das Script updaten auf www.ika-core.org?';
		maplegend=['Deine Inseln','Gesuchte Inseln','Übereinstimmende Inseln','Keine Übereinstimmung','Sea','Click für mehr Infos.'];
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
		CultureTreatiesCancel=" Kulturgüterabkommen kündigen";
		CultureTreatiesRequest=" Kulturgüterabkommen anbieten";
		break;
	case 'es':
		ogameLink='http://ikariam.ogame-world.com';
		corsairmenu=[
		//this one is for the title of the Tools menu
		[ 'Herramientas ' + alliancefullnm  , '', '',''],
		// URL , Info, Button Text, OnClick event, '-' for spacer
		['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' ,'Enviar mensaje a todos los aliados', 'Mensaje a la<br> Alianza','','-'],
		[ forumurl, ' Al Foro de la Alianza ','Foro '+alliancefullnm ,''],
		[ forumurlnew, ' A los mensajes no leídos del Foro de la Alianza ', 'Foro ' + alliancefullnm +'	mensajes no leídos','','-'],
		[ chaturl , ' Chat de la Alianza, abre en nueva ventana' , 'Chatbox(Nueva Ventana)','window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		['', ' Chat de la Alianza, muestra en chat en frames sin recargarse','Chatbox(Frame)','makeframes(\''+chaturl+'\');','-' ],
		['http://ikariamlibrary.com/?content=IkaFight' , ' Calcula una batalla ... ', 'Calculadora de Batallas','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		[ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Buscar ciudades de un jugador ', 'Buscar Ciudad',''],
		[ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world , ' Buscar islas de un jugador ', 'Buscar Islas','','-'],
		['http://www.ika-core.com' , 'Obtener el último script', ' Actualizar Herramientas'+alliancefullnm,'']];
		//Island view Map Legend
		legend ='<font color="'+Alliance[0]+'" size=1>• '+alliancefullnm+'</font><br>'+
		'<font color="'+Allies[0]+'" size=1>• Aliados</font><br>'+
		'<font color="'+NoAlliance[0]+'" size=1>• No Aliados</font><br>'+
		'<font color="'+Enemies[0]+'" size=1>• Enemigos</font><br>';
		TreatyYes="Tú tienes actualmente un tratado cultural con este jugador";
		TreatyNo="No tienes tratados culturales con este jugador.";
		updatenotification='Existe una nueva versión de las Herramientas '+alliancefullnm+' .\n Oprime OK si deseas ir a www.ika-core.org y actualizarlas ahora.';
		maplegend=['Tus Islas','Resultado de Islas','Tus Islas y Resultados','No encontrado','Mar','Oprime en cualquier coordenada para ver información.'];
		txtplswait="Espere por favor";
		txtmap="Mapa";
		txtrefresh="Refrescar";
		txtcoorddata='- Obteniendo Datos de Coordenadas';
		txtmapdata='- Obteniendo Mapa(jugador)';
		txtmapdata2='- Obteniendo Mapa(aliado)';
		txtpagedata='- Obteniendo Página';
		txtinfodata='- Obteniendo Información';
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
            ['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'שלח הודעה לכל חברי הברית', 'שלח הודעת שרשרת','','-'],
            [ forumurl, ' כניסה לפורום ','Forum '+alliancefullnm ,''],
            [ forumurlnew, ' מציג את כל ההודעות החדשות מאז ביקורך האחרון בפורום ',alliancefullnm +' הודעות חדשות','','-'],
            [ chaturl , ' התכתבות, פותח את ההתכתבות בחלון חדש' , 'התכתבות (חלון חדש)' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
            ['', ' התכתבות, מציג את ההתכתבות בתוך מסגרת ','התכתבות(מסגרת)','makeframes(\''+chaturl+'\');','-' ],
            [ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' כלי בכדי למצוא את הערים של השחקן ', 'חפש עיר',''],
            [ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world , ' כלי בכדי למצוא את האי של השחקן ', 'חיופש איים','','-'],
            ['http://www.ika-core.com'  , 'מעשכן את הסקריפט', ' עידכון '+alliancefullnm+' Tools ','']];
            //Island view Map Legend
            legend ='<font>â€¢ '+alliancefullnm+'</font>'+
            '<font>â€¢ חבר ברית</font>'+
            '<font>â€¢ חסר ברית</font>'+
            '<font>â€¢ אוייבים</font>';
            TreatyYes="כבר יש לך חוזה נכסי תרבות עם שחקן זה";
            TreatyNo="לא נמצאו שום חוזי נכסי תרבות בשביל שחקן זה.";
            updatenotification='ישנה גירסא חדשה של '+alliancefullnm+' Tools.\n לחץ על OK אם ברצונך לעדכן עכשיו.';
            maplegend=['האיים שלך','מקבל תוצאות מהאיים','האיים שלך והתוצאות','אין התאמה','ים','לחץ על כל נקודת ציון בכדי לקבל מידע.'];
            txtplswait="המתן בבקשה";
            txtmap="מפה";
            txtrefresh="רענן";
            txtcoorddata='- טוען נקודות ציון';
            txtmapdata='- טוען מפה(שחקן)';
            txtmapdata2='- טוען מפה(ברית)';
            txtpagedata='- טוען דף';
            txtinfodata='- טוען מידע';
            txtsorting='- ממיין שחקנים';
            txtchkplayer='- בודק שחקן';
            CultureTreaties='ultur'; //magic word for treaties fix
            CultureTreatiesCancel=" בטל חוזה נכסי תרבות";
            CultureTreatiesRequest=" בקש חוזה נכסי תרבות";
            break;
	       case 'tw'||'hk'||'cn':
              ogameLink='http://ikariam.ogame-world.com';
              corsairmenu=[
              //this one is for the title of the Tools menu
              [ alliancefullnm+' Tools' , '', '',''],
              // URL , Info, Button Text, OnClick event, '-' for spacer
              ['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , ' 傳訊息給所有聯盟成員 ', ' 發送盟內訊息','','-'],
              [ forumurl, ' 聯盟論壇 ',alliancefullnm+' 的論壇' ,''],
              [ forumurlnew, ' 聯盟論壇的新發言 ',alliancefullnm +' 論壇的新帖 ','','-'],
              [ chaturl , ' 在新視窗開啟盟內及時通 ' , '盟內及時通(新視窗)' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
              ['', ' 在同一頁顯示盟內及時通(無法自動更新) ','盟內及時通(同頁)','makeframes(\''+chaturl+'\');','-' ],
              ['http://ikariamlibrary.com/?content=IkaFight' , ' 戰力的計算 ', '戰鬥模擬器','window.open(this.href, this.target,\'width=1070,height=800\'); return false;','-'],
              [ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' 尋找某玩家城鎮的工具 ', '找玩家城鎮',''],
              [ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world , ' 尋找某玩家所處的島 ', '找玩家島嶼','','-'],
              ['http://www.ika-core.com' , '更新至最新的腳本', alliancefullnm+' Tools 的腳本更新','']];
              //Island view Map Legend
              legend ='<font color="'+Alliance[0]+'" size=2>• '+alliancefullnm+'</font><br>'+
              '<font color="'+Allies[0]+'" size=2>• 聯盟</font><br>'+
              '<font color="'+NoAlliance[0]+'" size=2>• 無聯盟</font><br>'+
              '<font color="'+Enemies[0]+'" size=2>• 敵對勢力</font><br>';
              TreatyYes="此玩家已和你簽署過文化條約";
              TreatyNo="無文化條約";
              updatenotification=' 偵測到新版的 '+alliancefullnm+' Tools.\n 按確定將連結到 www.ika-core.org 更新';
              maplegend=['你所在的島','目標所在的島','目標與你共處的島','沒有符合的結果','海洋','點選任何座標查詢島嶼資料'];
              txtplswait="處理中, 請耐心等待";
              txtmap="地圖";
              txtrefresh="資料更新";
              txtcoorddata='- 取得座標資料';
              txtmapdata='- 取得地圖 (玩家)';
              txtmapdata2='- 取得地圖 (聯盟)';
              txtpagedata='- 取得頁面';
              txtinfodata='- 取得資料';
              txtsorting='- 編排玩家順序';
              txtchkplayer='- 調查玩家';
              CultureTreaties='ultur'; //magic word for treaties fix
              CultureTreatiesCancel=" 取消文化條約";
              CultureTreatiesRequest=" 簽署文化條約";
             break;
	case 'pt':
			ogameLink='http://ikariam.com.pt';
			corsairmenu=[
			//this one is for the title of the Tools menu
			[ alliancefullnm+' Tools' , '', '',''],
			// URL , Info, Button Text, OnClick event, '-' for spacer
			['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'Enviar mensagem para todos os aliados', 'Enviar mensagem<br> circular','','-'],
			[ forumurl, ' Para o Forum da aliança ','Forum '+alliancefullnm ,''],
			[ forumurlnew, ' TPara os ultimos posts no forum da aliança ',alliancefullnm +' Novos Posts','','-'],
			[ chaturl , ' Chat da aliança, abre numa nova janela' , 'Chatbox(Nova Janela)' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
			['', ' Chat da Aliança, mostra o chat em frames sem recarregar ','Chatbox(Frame)','makeframes(\''+chaturl+'\');','-' ],
			['http://ikariamlibrary.com/?content=IkaFight' , ' Simulador de batalha ... ', 'Simulador','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
			[ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Ferramenta para encontrar cidades de um jogador ', 'Procurar Cidade',''],
			[ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world , ' Ferramenta para procurar as ilhas de um jogador ', 'Procurar Ilhas','','-'],
			['http://www.ika-core.com' , 'Descarregar última versão do script', ' Update '+alliancefullnm+' Tools ','']];
			//Island view Map Legend
			legend ='<font color="'+Alliance[0]+'" size=1>• '+alliancefullnm+'</font><br>'+
			'<font color="'+Allies[0]+'" size=1>• Aliados</font><br>'+
			'<font color="'+NoAlliance[0]+'" size=1>•Sem Aliança</font><br>'+
			'<font color="'+Enemies[0]+'" size=1>• Inimigos</font><br>';
			TreatyYes="Já tens tratado cultural com este jogador";
			TreatyNo="Sem tratados culturais com este jogador.";
			updatenotification='Existe uma nova versão do '+alliancefullnm+' Tools.\n Clicque em OK se pretende ir para to www.ika-core.org e actualizar agora.';
			maplegend=['Tuas ilhas','Ilha procurada','Tuas ilhas e resultados','Sem resultados','Oceano','Clique em qualquer coordenada para mais informações.'];
			txtplswait="por Favor, espere";
			txtmap="Mapa";
			txtrefresh="Recarregar";
			txtcoorddata='- A pesquisar coordenadas';
			txtmapdata='- A pesquisar Mapa(jogador)';
			txtmapdata2='- A pesquisar Mapa(aliado)';
			txtpagedata='- A pesquisar página';
			txtinfodata='- A pesquisar informação';
			txtsorting='- A ordenar jogadores';
			txtchkplayer='- A verificar Jogador';
			CultureTreaties='ultur'; //magic word for treaties fix
			CultureTreatiesCancel=" Cancelar tratado cultural";
			CultureTreatiesRequest=" Pedir tratado cultural";
	default:
		ogameLink='http://ikariam.ogame-world.com';
		corsairmenu=[
		//this one is for the title of the Tools menu
		[	alliancefullnm+' Tools' , '', '',''],
		//    URL , Info, Button Text, OnClick event,   '-' for spacer
		['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'Send message to all the allies', 'Send Alliance<br> Message','','-'],
		[ forumurl, ' To the Forum of the Alliance ','Forum '+alliancefullnm ,''],
		[ forumurlnew, ' To the Forum of the Alliance, latest posts ',alliancefullnm +' new forum posts','','-'],
		[ chaturl , ' Alliance Chat, opens in a new window' , 'Chatbox(New Window)' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		['', ' Alliance Chat, displays chat in frames with no reload ','Chatbox(Frame)','makeframes(\''+chaturl+'\');','-' ],
		['http://ikariamlibrary.com/?content=IkaFight' , ' Calculates a battle ... ', 'Battle Calc','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		[ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Tool to find cities of a player ', 'Search City',''],
		[ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world , ' Tool to find island of a player ', 'Search Islands','','-'],
		['http://www.ika-core.com' , 'Gets the latest script', ' Update '+alliancefullnm+' Tools ','']];
		//Island view Map Legend
		legend ='<font color="'+Alliance[0]+'" size=1>• '+alliancefullnm+'</font><br>'+
				'<font color="'+Allies[0]+'" size=1>• Allies</font><br>'+
				'<font color="'+NoAlliance[0]+'" size=1>• No Alliance</font><br>'+
				'<font color="'+Enemies[0]+'" size=1>• Enemies</font><br>';
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
	'ikariam.ph':['en','1'],
	'ikariam.ph':['ph','1'],
	'ae.ikariam.com':['ae','2'],
	'ar.ikariam.com':['ae','3'],
	'ba.ikariam.com':['ba','4'],
	'ikariam.bg':['bg','5'],
	'ikariam.com.br':['br','6'],
	'by.ikariam.ph':['by','7'],
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
	'ikariam.ph':['ph','36'],
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
	addsbubble('diplomat','I checked for a new version , there is none at the moment.',9);
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

//CSS used for menus and player info tables
GM_addStyle("\
table#cor {\
			-moz-box-sizing:border-box;\
			-moz-outline: #ff9900 ridge 5px;-moz-outline-radius: 10px 10px 10px 10px;-moz-outline-offset:0px;\
			border-collapse:separate;\
			border-spacing:0px;\
			display:table;\
			margin-bottom:0;\
			margin-top:0;\
			text-indent:0;\
			color:#542C0F;\
			font-size:11px;}\
tbody#cor {\
		display:table-row-group;\
		vertical-align:middle;\
}\
#corsairprogress { position:fixed; z-index:500;padding:3px 3px 3px 3px;margin:0px 0px 0px 0px;}\
#nfoframe{z-index:55;background-color:#FDF7DD;;font:normal 12px Arial, Helvetica, sans-serif;text-align:center;color:#542c0f;position:fixed;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px; -moz-outline: #ff9900 ridge 2px;-moz-outline-radius: 10px 10px 10px 10px;-moz-outline-offset:0px;}\
#nfoplayer,#nfoalliance,#seite{background:white;font-size:10px;padding:1px 1px 1px 1px;margin:3px 5px 3px 5px;-moz-outline: #ff9900 inset 3px;-moz-outline-radius: 12px 1px 12px 1px;}\
.savenotes,.gameplay,.questowner,.questally,.checktreaty,.plunderbash ,#nfomapbutton,#nfomapbuttona{background:#F6EBBC;text-decoration:none;cursor:pointer;font-size:9px;padding:1px 1px 1px 1px;margin:3px 5px 3px 5px;-moz-outline: #ff9900 ridge 3px;-moz-outline-radius: 12px 1px 12px 1px;}\
.savenotes::hover,.gameplay:hover,.questowner:hover,.questally:hover,.checktreaty:hover,#nfomapbutton:hover,#nfomapbuttona:hover,.plunderbash:hover {background:orange;text-decoration:none;-moz-outline: #ff9900 ridge 3px;-moz-outline-radius: 8px 1px 8px 1px;}\
.savenotes:active,.gameplay:active,.questowner:active,.questally:active,.checktreaty:active,#nfomapbutton:active,#nfomapbuttona:active,.plunderbash:active {background:red;-moz-outline: red inset 3px;-moz-outline-radius: 12px 1px 12px 1px;}\
#nfoframeclose,.search_player,.mapview,.search_alliance,.page,.pagebar {background:gray;text-decoration:none;cursor:pointer;font-size:9px;padding:1px 1px 1px 1px;margin:3px 5px 3px 5px;-moz-outline: #ff9900 ridge 3px;-moz-outline-radius: 12px 1px 12px 1px;}\
#nfoframeclose:hover,.search_player:hover,.mapview:hover,.search_alliance:hover,.page:hover,.pagebar:hover {background:lightgray;text-decoration:none;-moz-outline: lightbrown ridge 3px;-moz-outline-radius: 10px 1px 10px 1px;}\
#nfoframeclose:active,.search_player:active,.mapview:active,.search_alliance:active,.page:active,.pagebar:active {background:black;-moz-outline: #ff9900 inset 3px;-moz-outline-radius: 12px 1px 12px 1px;}\
.dragclass{ position : relative; cursor : move;}\
#embassy #container #mainview .contentBox01h .content table#memberList td.action { margin:0 auto; float: none}\
#sidemenu {\
width:70px;\
background: transparent;\
z-index:500;\
position:fixed;\
}\
#sidemenu ul {\
list-style: none;\
margin: 0;\
padding: 0;\
}\
#sidemenu a, #sidemenu h2 {\
font: bold 10px/11px arial, helvetica, sans-serif;\
display: block;\
margin: 0;\
padding: 2px 3px;\
}\
#sidemenu h2 {\
background: #EDB76D;\
text-transform: uppercase;\
-moz-outline:#EDA76D outset 2px;\
-moz-outline-radius:0px 10px 10px 0px;\
font-size:9px;\
height:13px;\
width:60px;\
}\
#sidemenu a {\
color: #542C0F;\
width:60px;\
background: #dD975D;\
text-decoration: none;\
-moz-outline:#FF9900 outset 2px;\
-moz-outline-radius:0px 10px 10px 0px;\
margin: 4px 0px 4px 0px;\
}\
#sidemenu a:hover {\
background: #EDB76D;\
-moz-outline-radius:0px 0px 0px 0px;\
}\
#sidemenu li {position: relative;}\
#sidemenu ul ul ul {\
position: absolute;\
top: 0;\
left: 100%;\
width: 100%;\
-moz-outline:brown outset 2px;-moz-outline-radius:10px 10px 10px 10px;\
}\
div#sidemenu ul ul ul,\
div#sidemenu ul ul li:hover ul ul\
{display: none;}\
div#sidemenu ul ul li:hover ul,\
div#sidemenu ul ul ul li:hover ul\
{display: block;}\
.elisthead { background:#EDB76D;-moz-outline:#EDA76D outset 2px;-moz-outline-radius:0px 10px 0px 0px;} \
.elistmain { background:#F6EBBC;-moz-outline:#FF9900 inset 1px;margin:0px 0px 0px 0px;}\
.elistfoot { height:5px; background:brown;-moz-outline:#FF9900 outset 1px;-moz-outline-radius:0px 0px 20px 20px;}\
.menulist {\
text-align:left;\
color:brown;\
text-decoration:none;\
-moz-outline-radius:10px 10px 10px 10px;\
width:220px\
}\
.blevels,.clevels {\
background:#000;\
font-size:9px;\
margin:0;\
padding:0px 0px 0px 0px;\
color:#fff;-moz-outline: black ridge 3px;\
-moz-outline-radius: 8px 8px 8px 8px;\
text-align:center;\
}\
");

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
/*
function fmtNumber(n) {
	n += "";
	for (var i = n.length - 3; i > 0; i -= 3)
		n = n.slice(0, i) +","+ n.slice(i);
	return n;
}
*/
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
/*
function time(t) {
	t = t || Date.now();
	return Math.floor(t / 6e4) - 2e7; // ~minute precision is enough
}
*/

var n = 500;
var dragok = false;
var y,x,d,dy,dx;
var xaxismove=false;
var yaxismove=false;

	function move(e){
		if (!e) e = window.event;
		if (dragok){			
			if (xaxismove) d.style.left = dx + e.clientX - x + "px";
			if (yaxismove) d.style.top  = dy + e.clientY - y + "px";
			return false;
		}
	}

	function down(e){
		if (!e) e = window.event;
		var temp = (typeof e.target != "undefined")?e.target:e.srcElement;
		if (temp.tagName != "HTML"|"BODY" && temp.className != "dragclass"){
			temp = (typeof temp.parentNode != "undefined")?temp.parentNode:temp.parentElement;
		}
		switch (temp.className){
			case "dragclass":
				var obj=$(temp.title);
				xaxismove=true;
				yaxismove=true;
			break;
			case "dragsidemenu":
				var obj=$("sidemenu");
				xaxismove=false;
				yaxismove=true;
				//alert(obj.innerHTML);
				//var obj=temp.parentNode.parentNode.parentNode.parentNode.parentNode;
			break;
				
		}
		if (obj){ 
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
		if(d)
		switch (d.id){			
			case "sidemenu":
				if (parseInt(d.style.top)<0) d.style.top="0px";
				GM_setValue("SideBarTop",d.style.top);
			break;				
		}
	}
	
document.addEventListener('mousedown',down,false);
document.addEventListener('mouseup',up,false); 


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
	getbody.appendChild(node('div','corsairprogress','','left:'+parseInt((window.innerWidth/2)-200)+'px; top:'+parseInt((window.innerHeight/2) - 40)+'px;','<FORM name=dialog id=dialog><TABLE border=2  bgcolor="#F6EBBC" id="cor"><TR><TD ALIGN="center">'+txtplswait+'&nbsp;'+tag+'<BR><input type=text name="corsairbar" id="corsairbar" size="' + _progressWidth/2 + '" style="color:navy;"></TD></TR></TABLE></FORM>'));
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

//used to make chat displayed in a frame
unsafeWindow.makeframes = function(elm) {    
	if (parent != self) 
		top.location.href = location.href;
	else {
		var frameset = document.createElement("frameset");
		var loc=location.href;
		frameset.cols = null;
		frameset.rows = "50%, 40%";
		frameset.setAttribute('style','overflow-y: hidden !important;overflow-x: hidden !important;margin:0px;padding:0px;');
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
		document.body.parentNode.setAttribute("style","overflow-y: hidden !important;overflow-x: hidden !important;margin:0px;padding:0px;");
	}
}
function showchat(){
}
/*
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
*/

function twitch(gmvar){
	if(!GM_getValue(gmvar)) GM_setValue(gmvar, "1");
}

function togglevar(gmvar){
	if (GM_getValue(gmvar)=='1') {
		GM_setValue(gmvar, "0");
	} else {
		GM_setValue(gmvar, "1");
	}
}

function testvar(gmvar){
	twitch(gmvar);
	if (GM_getValue(gmvar)=='1') return true;
	return false;
}	

var resgoods={'wine':1,'marble':2,'crystal':3,'sulfur':4};
function islandview(){	
	culttreaties=GM_getValue("CultTtreaties");
	if (testvar("IslandInVac")) {
		GM_addStyle(".vacation {text-decoration:line-through}");
		GM_addStyle(".inactivity {text-decoration:underline;}");
	}
	if (testvar("IslandInactiveBlink")) {
		GM_addStyle(".inactivity {text-decoration:blink;}");	
	}
	var paNode=$('breadcrumbs').parentNode;
	if (paNode) {
		if (testvar("IslandLegend")) {paNode.appendChild(node('li','corlegend','','position:absolute;top:193px;left:270px;width:120px;height:100px;z-index:49',legend));}
		if (GM_getValue('IslandToggleButtons', '1') == '1') {
			btn(paNode, 'shownamestoggle', 'gameplay', 'N', 'Hides or shows the player names under the Cities.', function(){
				togglevar("IslandPlayerNames");
				location.href = location.href;
			}, 5, 'position:absolute;top:155px;left:640px;width:5px;z-index:54;');
			btn(paNode, 'shownamesextratoggle', 'gameplay', 'E', 'Strikes through players on vacation and underlines inactives.', function(){
				togglevar("IslandInVac");
				location.href = location.href;
			}, 5, 'position:absolute;top:155px;left:655px;width:5px;z-index:54;');
			btn(paNode, 'showlegendtoggle', 'gameplay', '§', 'Show or hide the Highlight Legend.', function(){
				togglevar("IslandLegend");
				location.href = location.href;
			}, 5, 'position:absolute;top:155px;left:670px;width:5px;z-index:54');
			btn(paNode, 'showlevlesislandtoggle', 'gameplay', 'L', 'Show or hide the City Levels.', function(){
				togglevar("IslandLevels");
				location.href = location.href;
			}, 5, 'position:absolute;top:155px;left:685px;width:5px;z-index:54');
		}
	}
	try {
	var wood=XX('//ul[@id="islandfeatures"]/li[contains(@class,"wood")]',XPFirst);
	var woodlvl=wood.className.split('level')[1];
	var res=XX('//ul[@id="islandfeatures"]/li[not(contains(@class,"wood")) and not(@id)]',XPFirst);
	var reslvl=res.className.split(' level')[1];
	res.setAttribute('style','z-index:0;');			
	if (testvar("IslandLevels")) {
		var as = node('a', 'clevels', 'clevels', 'position:absolute;background:#743C1F;top:20px;left:12px;width:12px;height:12px;', woodlvl);
		wood.appendChild(as);
		var as = node('a', 'clevels', 'clevels', 'position:absolute;background:#743C1F;top:15px;left:48px;width:12px;height:12px;', reslvl);
		res.appendChild(as);
	}

	var friendslist=GM_getValue("Friends","").split('#,#');
	var enemieslist=GM_getValue("Enemies","").split('#,#');
	forall("//li[contains(@class,'cityLocation')]", null, function(objpar,i){
		var iconleft=-10;
		var p=i+'=';
		var obj=XX(".//ul[@class='cityinfo']",XPFirst,objpar);
		if (obj){
			var ally=XX(".//li[@class='ally']/a",XPFirst,obj);
			var owner=XX(".//li[@class='owner']/span/following::text()[1]",XPFirst,obj).textContent;
			var city=XX(".//a/span",XPFirst,obj.parentNode);
			var cityimage=XX(".//div",XPFirst,obj.parentNode);
			var citylvl=XX(".//li[@class='citylevel']/span/following::text()[1]",XPFirst,obj).textContent;
			var spy=XX(".//li[@class='spy']",XPFirst,obj);
			if (testvar("IslandFriends")) for (var q=0;q<friendslist.length-1;q++){
				if (friendslist[q]==trim(owner)) {				
				var spynode=node('span',null,null,'background:transparent url(http://www.ika-core.org/forum/images/smilies/romance/heartbeating.gif) no-repeat scroll 0px center;position:absolute;height:15px;width:15px;top:45px;left:'+iconleft+'px;z-index:800;margin:0;padding:0px 0px 0px 0px;');
				spynode.title="He is your friend!";
				iconleft+=16;
				city.parentNode.appendChild(spynode);
				}
			}
			if (testvar("IslandCultTreaties")&&culttreaties)
				 if (culttreaties.indexOf(","+trim(owner)+",") != -1) {		
					var spynode=node('span',null,null,'background:transparent url(http://www.ika-core.org/forum/images/smilies/angelic/sunshine.gif) no-repeat scroll 0px center;position:absolute;height:23px;width:42px;top:41px;left:'+iconleft+'px;z-index:800;margin:0;padding:0px 0px 0px 0px;');
					spynode.title="You have a cultural treaty with this player!";
					iconleft+=43;
					city.parentNode.appendChild(spynode);
				//cityimage.style.backgroundImage = getComputedStyle(city, "").backgroundImage.replace("red.gif", "green.gif");
			}			
			if (testvar("IslandEnemies")) for (var q=0;q<enemieslist.length-1;q++){
				if (enemieslist[q]==trim(owner)) {				
				var spynode=node('span',null,null,'background:transparent url(http://www.ika-core.org/forum/images/smilies/violence/smack.gif) no-repeat scroll 0px center;position:absolute;height:20px;width:50px;top:42px;left:'+iconleft+'px;z-index:800;margin:0;padding:0px 0px 0px 0px;');
				spynode.title="He is your enemy!";
				iconleft+=50;
				city.parentNode.appendChild(spynode);
				}
			}
			if (testvar("IslandSpies")) if (spy) {
				var spynode=node('span',null,null,'background:transparent url(http://www.ika-core.org/forum/images/smilies/icon_e_ugeek.gif) no-repeat scroll 0px center;position:absolute;height:18px;width:20px;top:45px;left:'+iconleft+'px;z-index:800;margin:0;padding:0px 0px 0px 0px;');
				spynode.title="We have a Spy(007 James Bond etc.) in this City!";
				city.parentNode.appendChild(spynode);
			}
			if (testvar("IslandHighlight")) {
				if (ally) {
					if (testvar("IslandPlayerNames")) {
						var extranames = node('span', null, 'textLabel cornames', 'left: -10px; top: 84px; cursor: pointer;font-size:8px;', '<span class="before"></span>' + owner + '(' + ally.textContent + ')<span class="after"></span>');
						city.parentNode.appendChild(extranames);
					}
					for (var j = 1; j < alliance.length; j++) 
						if (ally.innerHTML == alliance[j][0]) {
							setCityColors(ally, city,cityimage, alliance[j][1][1], alliance[j][1][0], 'opacity:0.9;');
							break;
						}
				}
				else {
					if (testvar("IslandPlayerNames")) {
						var extranames = node('span', null, 'textLabel cornames', 'left: -10px; top: 84px; cursor: pointer;font-size:9px;', '<span class="before"></span>' + owner + '<span class="after"></span>');
						city.parentNode.appendChild(extranames);
					}
					setCityColors(null, city,cityimage, alliance[0][1][1], alliance[0][1][0], '');
				}
			}
			if (testvar("IslandLevels")) {
				var as = node('a', 'clevels', 'clevels', 'top:30px;left:25px;width:12px;height:12px;', citylvl);
				city.parentNode.appendChild(as);
			}
		} else {
		}
	});
		} catch(e){}
}
 
function setCityColors(ally,city,cityimage,col,bcol,extrastyle){
//	if (ally) ally.style.color=col;
//	if (city) city.setAttribute('style', ';opacity:1;color:' + col + ';-moz-outline: ' + bcol + ' outset 5px;-moz-outline-radius: 7px 7px 7px 7px;-moz-outline-offset:-2px;' + extrastyle);
	if (city) {
		cityimage.setAttribute('style', 'opacity:0.8');
		var nd=node("canvas",null,null,"position:relative;left:-30px;top-140px;width:130px;height:130px;background:transparent;z-index:-500;opacity:1");
		if (nd.getContext) {
			var ctx = nd.getContext('2d');
			ctx.scale(2,1);
			var radgrad = ctx.createRadialGradient(75, 55, 25, 75, 70, 55);
			radgrad.addColorStop(0.0, bcol);
			radgrad.addColorStop(1, 'rgba(255,255,255,0)');
			ctx.fillStyle = radgrad;
			ctx.fillRect(0, 0, 150, 150);			
		}
		city.parentNode.parentNode.appendChild(nd);
	}
}

var islandsearch;
var islandsearchs=0;
var rand=Math.floor(Math.random()*65535)
var tm=120000;
if(!GM_getValue("GlobRand")) GM_setValue("GlobRand", Math.floor(Math.random()*65535));
var globrand=GM_getValue("GlobRand");
var debug=0;
if (debug==1){
  tm=5000;
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
			var pst=0;
			var stvac=XX(".//span[@class='vacation']",XPFirst,city);
			var stina=XX(".//span[@class='inactivity']",XPFirst,city);
			if (stvac) pst=1;
			if (stina) pst=2;
			var citynm=XX(".//li[@class='name']/span/following::text()[1]",XPFirst,obj).textContent;
			var citylvl=XX(".//li[@class='citylevel']/span/following::text()[1]",XPFirst,obj).textContent;
			if (ally) {
				data+='&cid'+p+city.parentNode.id.split('city_')[1]+'&pst'+p+pst+'&p'+p+trim(owner)+'&c'+p+citynm+'&a'+p+ally.innerHTML+'&t'+p+citylvl+'&po'+p+objpar.id.split('cityLocation')[1];
			} else	{
				data+='&cid'+p+city.parentNode.id.split('city_')[1]+'&pst'+p+pst+'&p'+p+trim(owner)+'&c'+p+citynm+'&a'+p+'-&t'+p+citylvl+'&po'+p+objpar.id.split('cityLocation')[1];
			}
		} else {
				data+='&cid'+p+'0&pst'+p+'0&p'+p+'&c'+p+'&a'+p+'&t'+p+'0&po'+p+objpar.id.split('cityLocation')[1];	
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
//		if (runs==0) get( col+'robdebug.php?s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=0",servresponse,'req');
//		else get( col+'robdebug.php?s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=1",servresponse,'req');
		if (debug==1) debugwin.innerHTML+='Starting with tm='+tm+'<br>';
		if (runs==0) post( col+'rob.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=0",servresponse,'req');
		else post( col+'rob.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=1",servresponse,'req');
	} else {
		if (runs==0) post( col+'rob.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=0",servresponse,'req');
		else post( col+'rob.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=1",servresponse,'req');
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
	ProgressStepIt();
	switch (tag) {
		case 'player':
			ProgressStepIt();
			nfoframe=$("nfoframe");
			nfoframe.innerHTML=text;
			ProgressStepIt();
			clickTo(XX('//a[@class="search_player"]',XPFirst, nfoframe),showplayernfo,1);
		break;
		case 'ally':
			ProgressStepIt();
			nfoframe=$("nfoframe");
			nfoframe.innerHTML=text;
			ProgressStepIt();
			clickTo(XX('//a[@class="search_alliance"]',XPFirst, nfoframe),showplayernfo,1);
			forall('//a[@class="page"]', nfoframe, function(obj,i){
					clickTo(obj,showplayernfo,1);
					ProgressStepIt();
			});

		break;
		case 'searchbar':
			ProgressStepIt();
			nfoframe=$("nfoframe");
			nfoframe.innerHTML=text;
			ProgressStepIt();
			forall('//a[@class="pagebar"]', nfoframe, function(obj,i){
					clickTo(obj,showplayernfo,1);
					ProgressStepIt();
			});

		break;
	}
	ProgressDestroy();
}

function showplayernfo(e){
	var nfo=$("nfoframe");
	if (!nfo) {
		var nfo=node('div','nfoframe',null,"left:"+parseInt((window.innerWidth/2)-200)+"px;top:"+parseInt((window.innerHeight/2) - 200)+"px;");
		getbody.appendChild(nfo);
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
				nfo.setAttribute('style','top:60px;left:'+parseInt((window.innerWidth/2)-200)+'px;');
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
			case 'pagebar':
				var page=srcEl.title;
				var stable=$('searchtable');
				if (stable){
					ProgressCreate(10,txtinfodata);
					nfo.setAttribute('style','top:60px;left:'+parseInt((window.innerWidth/2)-200)+'px;');
					post(ika+'/searchbar.php','s='+serverindex+'&w='+world+'&p='+XX('//input[@name="SearchPlayer"]',XPFirst,stable).value+'&a='+XX('//input[@name="SearchAlliance"]',XPFirst,stable).value+'&rad='+XX('//input[@name="SearchRadius"]',XPFirst,stable).value+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+'&pg='+page,informpost,'searchbar');
				}
				break;
		}
	}
}

function Embassy() {
	var table = XX('//table[@id="memberList"]',XPFirst);
	if (table) {
		var lastcell=table.rows[i].cells.length-2;		
		if (testvar("EmbassyCheckTreaties")) {
			btn(table.rows[0].cells[lastcell],'chktreatyall','checktreaty','Ѻ','Check all Players.',checkplayer,5);
			forallrows(table,1,function(tbl,i){
				var player=tbl.rows[i].cells[1].innerHTML;
				btn(tbl.rows[i].cells[lastcell],'chktreaty'+i,'checktreaty','Ѻ',player,checkplayer,5);
			});
		}
		if (testvar("EmbassyPlayerSearch")) 
			forallrows(table,1,function(tbl,i){
				var player=tbl.rows[i].cells[1].innerHTML;
				btn(tbl.rows[i].cells[lastcell],'questowner'+i,'questowner','?',player,showplayernfo,5);		
			});
	}
}

//check the message senders for museum stuff
function checkculturetreaty(text,musplayer){
	var fake=node("div",'','','',text);
	ProgressStepIt();
	var found=0;
	var mplayers="";
			forall('//td[@class="player"]', fake, function(obj,i){				
				mplayers+=obj.innerHTML+",";
			});
			mplayers=mplayers.substr(0,mplayers.length-1);
	GM_setValue("CultTtreaties",mplayers);
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

function Messages(){
	var tbl=XX('//table[@id="messages"]',XPFirst);
	if (tbl) {
		if (testvar("MessageCheckTreaties")) {
			btn(tbl.rows[0].cells[0], 'chktreatyall', 'checktreaty', 'Ѻ', 'Check all Players.', checkplayer, 5);
			for (i = 1; i < tbl.rows.length - 3; i = i + 3) {
				var player = trim(tbl.rows[i].cells[2].textContent);
				btn(tbl.rows[i].cells[0], 'chktreaty' + i, 'checktreaty', 'Ѻ', player, checkplayer, 5);
			}
		}
		
		if (testvar("MessagePlayerSearch")) 
			for (i=1; i<tbl.rows.length -3; i=i+3) {
				var player=trim(tbl.rows[i].cells[2].textContent);
				if (testvar("MessagePlayerSearch")) btn(tbl.rows[i].cells[1],'questowner'+i,'questowner','?',player,showplayernfo,5);
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

function playgames(e){
	var srcEl=mapevt(e);
	if (srcEl) {
		switch (srcEl.id) {
			case 'marioplay':
				if ($("mario")) {
					remove($("mario"));
					return;
				}
				var mydiv = node('iframe', 'mario', null, 'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:275px;height:225px; z-index:99;top:200px;left:420px;', null)
				mydiv.src = 'http://www.nihilogic.dk/labs/mario8kb/';
				getbody.appendChild(mydiv);
				break;
			case 'bobleplay':
				if ($("boble")) {
					remove($("boble"));
					return;
				}
				var mydiv = node('div', 'boble', null, 'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:275px;height:225px; z-index:99;top:200px;left:420px;', null)
				mydiv.innerHTML = '<embed height="400" width="400" align="" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" menu="false" name="BubbleBobbleTheRevival.swf" bgcolor="#FFFFFF" quality="high" src="http://www.fititis.gr/fititis2/components/flash/BubbleBobbleTheRevival.swf"/><noembed/>';
				getbody.appendChild(mydiv);
				break;
			case 'tetrisplay':
				if ($("tetris")) {
					remove($("tetris"));
					return;
				}
				var mydiv = node('iframe', 'tetris', null, 'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:325px;height:325px; z-index:99;top:200px;left:420px;', null)
				mydiv.src = 'http://code.gosu.pl/dl/JsTetris/demo/JsTetris.html';
				getbody.appendChild(mydiv);
				break;
			case 'slotplay':
				if ($("slot")) {
					remove($("slot"));
					return;
				}
				var mydiv = node('iframe', 'slot', null, 'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:765px;height:365px; z-index:99;top:200px;left:320px;', null)
				mydiv.src = 'http://slotmachine.braincast.nl';
				getbody.appendChild(mydiv);
				break;
		}
	}
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


addsbubble('mayor','Check out tipidpc.com', 175);
addsbubble('scientist','Yeah Baby', 177);
addsbubble('general','Attack!!!', 180);
addsbubble('general','Alak pa!', 181);
addsbubble('diplomat','Sige lang?', 188);

function extrapost(url, data, reqvalue, c, hiturl) {
	GM_xmlhttpRequest({	method: "POST",
						url: url,
						headers:{'Content-type':'application/x-www-form-urlencoded'},
						data:encodeURI('actionRequest='+reqvalue+'&'+data),
						onload: function(xhr) { 
							ProgressStepIt();
							GM_xmlhttpRequest({method: "GET",url: hiturl,onload: function(xhr) {							
								var getactionreq=node("div",null,null,null,xhr.responseText);
								var actionreq=XX('//form[@id="plunderForm"]//input[@name="actionRequest"]',XPFirst,getactionreq);
								c--;
								if (actionreq) {
									if (c>0){
										setTimeout(function() { extrapost('http://'+location.host+'/index.php',data,actionreq.value,c,hiturl); }, 2000);																						
									} else {
										location.href=hiturl;
									}
								} else {
									alert("Could not do "+c+" attacks.");
									location.href=hiturl;
								}
								}});						
						}});
}

function actionshandler(e){
	var srcEl=mapevt(e);
	if (srcEl) {
		switch (srcEl.className) {
			   case 'plunderbash':
		            var postdata='';
		            var reqvalue='';
		            forall('//form[@id="plunderForm"]//input',null,function(obj,i){
		            if(obj.name)
		               if (obj.name=="actionRequest") {
		                  reqvalue=obj.value;
		               } else {
		                  postdata+=obj.name+'='+obj.value+'&';
		               }
		            else
		               postdata+='submit='+obj.value;
		            });
		            
		            if (srcEl.id=='plunderbash2') {
		        var c=2;
		        ProgressCreate(2,"Attacking x"+c);
		        }
		            if (srcEl.id=='plunderbash3') {
		        var c=3;
		        ProgressCreate(3,"Attacking x"+c);
		        }
		        if (srcEl.id=='plunderbash4') {
		        var c=4;
		        ProgressCreate(4,"Attacking x"+c);
		        }
		        if (srcEl.id=='plunderbash5') {
		        var c=5;
		        ProgressCreate(5,"Attacking x"+c);
		        }
		        if (srcEl.id=='plunderbash6') {
		        var c=6;
		        ProgressCreate(6,"Attacking x"+c);
		        }
		            //else var c=6;
		            //ProgressCreate(7,"Attacking x"+c);
		            setTimeout(function() { extrapost('http://'+location.host+'/index.php',postdata,reqvalue,c,location.href); }, 2000);                                    
		         break;
			case 'schedule':
			alert('lala');
			break;
		}
	}
}

//sidebar
function sidemenu(){
	var top=GM_getValue("SideBarTop","300px");	
	if (parseInt(top)<10) top='10px';
	if (parseInt(top)>600) top='600px';
	var sidebarnode = node("div","sidemenu",null,"left:0px;top:"+top+";",'<ul id="sidebarrow"></ul>');	
	getbody.appendChild(sidebarnode);
	clickTo(sidebarnode,sidebarevents,1);
}

function sidetab(nm,title,width,height,initfunc,tag){
	var sidebarnode=$("sidebarrow");
	switch (tag){
		case "mover":
			sidebarnode.innerHTML += '\
				<li><ul><li class="dragsidemenu"><div style="cursor : move;width:12px;height:18px;background: #EDB76D;-moz-outline:#EDA76D outset 4px;-moz-outline-radius:10px 10px 10px 10px;font-size:14px;">↕</div>\
			    </li></ul></li>';
		break;
		case "menu":
			sidebarnode.innerHTML += '\
				<li><ul><li><a href="#" Title="' + title + '">' + nm + '</a>\
				' +	initfunc(width,title) +	'\
	     		</li></ul></li>';
		break;
		default:			
			sidebarnode.innerHTML += '\
			<li><ul><li><a href="#" Title="' + title + '">' + nm + '</a>\
		    <ul><li><div class="elisthead" style="width:'+width+'px;">'+title+'</div>\
					<div class="elistmain" style="width:'+width+'px;height:'+height+'px;" id="'+nm+'main"></div>\
					<div class="elistfoot" style="width:'+width+'px;"></div>\
			</li></ul></li></ul></li>';
	}
	if (initfunc) initfunc();
}

function sidebarevents(e){
	var srcEl=mapevt(e);
	if (srcEl) {
		switch (srcEl.className) {
			case "questally":
				showplayernfo(e);
			break;
			case "questowner":
				showplayernfo(e);
			break;
			case "savenotes":
				GM_setValue('ikanotes',$('sidenotes').value);
			break;
			case "playgames":
				playgames(e);
			break;
			case "addfriend":
				if ($('friendname').value=='') {
					alert("Please type in your Friends Name!");
					return
				}
				GM_setValue("Friends",GM_getValue("Friends","")+$('friendname').value+'#,#');
				friends();
			break;
			case "delfriend":
				GM_setValue("Friends",GM_getValue("Friends","").replace(srcEl.title+'#,#',''));
				friends();
			break;
			case "addenemy":
				if ($('Enemiesname').value=='') {
					alert("Please type in your Enemies Name!");
					return
				}
				GM_setValue("Enemies",GM_getValue("Enemies","")+$('Enemiesname').value+'#,#');
				enemies();
			break;
			case "delenemy":
				GM_setValue("Enemies",GM_getValue("Enemies","").replace(srcEl.title+'#,#',''));
				enemies();
			break;
			case "savesettings":
				forall('.//input',$('ikacoresettings'),function(obj,i){ 
					
					if (obj.type=="checkbox"){
						if (obj.checked==true)	GM_setValue(obj.name,'1') 
						else GM_setValue(obj.name,'0');
					}
					if (obj.type == "text") {
						GM_setValue(obj.name,obj.value);
					}
				});		
			

				GM_setValue("Enemies",GM_getValue("Enemies","").replace(srcEl.title+'#,#',''));
				enemies();
			break;
			case "SearchMainQuickSearch":
				forall('.//input',$('ikasearch'),function(obj,i){ 					
					if (obj.type == "text") {
						GM_setValue(obj.name,obj.value);
					}
				});	
				var nfo=$("nfoframe");
				if (!nfo) {
					var nfo=node('div','nfoframe',null,"left:"+parseInt((window.innerWidth/2)-200)+"px;top:"+parseInt((window.innerHeight/2) - 200)+"px;");
					getbody.appendChild(nfo);
				}	
				var stable=$('searchtable');
				if (stable){
					ProgressCreate(10,txtinfodata);
					nfo.setAttribute('style','top:60px;left:'+parseInt((window.innerWidth/2)-200)+'px;');
					post(ika+'/searchbar.php','s='+serverindex+'&w='+world+'&p='+XX('//input[@name="SearchPlayer"]',XPFirst,stable).value+'&a='+XX('//input[@name="SearchAlliance"]',XPFirst,stable).value+'&rad='+XX('//input[@name="SearchRadius"]',XPFirst,stable).value+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1],informpost,'searchbar');
				}
			break;
		}
	}
}

function sidetabs(){
	sidemenu();
	sidetab("", "Hold and Drag to move the SideBar", 0,0 ,null,"mover");
	if (GM_getValue("SideBarSearch",1)==1)  sidetab("Search", "Search player/alliance", "400%;", "100%;",search);
	if (GM_getValue("SideBarNotes",1)==1) 	sidetab("Notes", "Quick Notes", 400, 400,notesinit);
	if (GM_getValue("SideBarAllies",1)==1) 	sidetab("Allies", "Allies - List", 100, 200, alliancelist,"menu");
	if (GM_getValue("SideBarEnemies",1)==1) sidetab("Enemies", "Enemy Players", 150, 340, enemies);
	if (GM_getValue("SideBarFriends",1)==1) sidetab("Friends", "Friends List", 150, 270,friends);
	if (GM_getValue("SideBarGames",1)==1) 	sidetab("Games", "Games Menu", 100, 160, gameslist,"menu");
	if (GM_getValue("SideBarTools",1)==1) 	sidetab("Tools", "Alliance Tools/Links", 200, 230,tools,"menu");
	if (GM_getValue("SideBarIndexing",1)==1) sidetab("Indexing", "Indexing Progress", 350, 0,indexing,"menu");
	sidetab("Settings", "Settings - General Configuration ", 350, 310,settings);	
	if (chaturl!='.'&&GM_getValue("SideBarChat",1)==1) sidetab("Chat", "Global Chat", GM_getValue("ChatWidth",1000), GM_getValue("ChatHeight",300),chat);	
}

function tools(width,title){	
		var tempmenu='<li><div class="elisthead" style="width:'+width+'px;border-bottom:brown outset 2px">'+title+'</div>';
		var style=' style="width:'+width+'px;cursor:pointer;margin:0px 0px 0px -2px;padding:2px 2px 2px 2px;-moz-outline:none;border-bottom:brown dotted 1px" ';
		for (i=1;i<corsairmenu.length;i++) {
			switch (corsairmenu[i][0]) {
			case '.':
				break;
			case '':
				if (corsairmenu[i][3]!="makeframes('.');") tempmenu+='<li><center><a '+style+' target="_blank" title="'+corsairmenu[i][1]+'" onclick="'+corsairmenu[i][3]+'">'+corsairmenu[i][2]+'</a></center></li>';
				break;
			default:
				tempmenu+='<li><center><a '+style+' target="_blank" href="'+corsairmenu[i][0]+'" title="'+corsairmenu[i][1]+'" onclick="'+corsairmenu[i][3]+'">'+corsairmenu[i][2]+'</a></center></li>';
				break;
			}
		}
   return '<ul>'+tempmenu+'</ul>';
}

function indexing(width,title){
	var maplink=ika+'/world.php?sx=3.4&sy=2.8&s='+serverindex+'&w='+world+'&perc=1';
	var style=' style="width:'+width+'px;cursor:pointer;margin:0px 0px 0px -2px;padding:2px 2px 2px 2px;-moz-outline:none;border-bottom:brown dotted 1px" ';			
	return "<ul><li><div class='elisthead' style='width:"+width+"px;border-bottom:brown outset 2px'>"+title+"</div><li><a href='#' onclick='document.getElementById(\"progmap\").src=\""+maplink+"\"' "+style+">Get Map</a></li><li><a href='http://www.ika-core.org' target='_blank' "+style+">Data by ika-core.org</span><br><img id='progmap' src=''/></a></li></ul>";
}

function chat(){
	var masternode=$("Chatmain");
	masternode.innerHTML+="<center><div style='width:100%;height:100%;'><br><br><b>Move your mouse over here to enable the ika-core.org GLOBAL Chat.</b><br>";
	masternode.innerHTML+="<b>The best chat expierence is to have the chat in a frame. Go to Left-Sidebar:Tools and select Chat(Frame).</b><br><br>";
	masternode.innerHTML+="If you do not have a chat server for your Alliance you can simply use the one provided by ika-core.org .";
	masternode.innerHTML+="In order to use the chat you simply have to register.";
	masternode.innerHTML+="You also can have private conversations with others or create Rooms for multiple players to join.";
	masternode.innerHTML+="The rooms will auto expire after 30 minutes of inactivity.";
	masternode.innerHTML+="If you would like to have a private room that is also password protected and never expires, you need to apply for it on our forum.";
	masternode.innerHTML+="Generally people that donated can have this kind of rooms, in those rooms you will be granted Operator status (can kick , ban etc).</div></center>";
	masternode.setAttribute("onmousemove","	if (!document.getElementById('chatframei')) this.innerHTML=\"<iframe id='chatframei' width='100%' border='0' frameborder='0' height='100%' src='"+chaturl+"' style='margin-left:0px;'/>\";if (this.parentNode.style.left!=\'0px\') this.parentNode.style.left=\'0px\';");
}

function alliancelist(width,title){	
   var style=' style="width:'+width+'px;cursor:pointer;margin:0px 0px 0px -2px;padding:2px 2px 2px 2px;-moz-outline:none;border-bottom:brown dotted 1px" ';
   var tempmenu='<li><div class="elisthead" style="width:'+width+'px;border-bottom:brown outset 2px;">'+title+'</div>';
   for (var i=0;i<alliance.length;i++){
		if (alliance[i][1]==Alliance){
		    tempmenu+='<li><a id="questally" class="questally" title="'+alliance[i][0]+'" '+style+'>'+alliance[i][0]+'</a></li>';
		}
	}
   for (var i=0;i<alliance.length;i++){
		if (alliance[i][1]==Allies){
		    tempmenu+='<li><a id="questally" class="questally" title="'+alliance[i][0]+'" '+style+'>'+alliance[i][0]+'</a></li>';
		}
	}
	return '<ul>'+tempmenu+'</ul>';
}

function notesinit(){
	var masternode=$("Notesmain");
	var notes=GM_getValue("ikanotes","Empty.");
	var injct='<textarea id="sidenotes" cols="57" wrap="soft" rows="21">'+notes+'</textarea><br>';
	var style=' style="display: inline;width:40px;cursor:pointer;margin:5px 5px 5px 5px;padding:2px 2px 2px 2px;-moz-outline:brown ridge 2px;-moz-outline-radius:5px 5px 5px 5px;" ';
	injct+='<a id="savenotes" class="savenotes" title="Click to save notes" '+style+'>Save</a>';
	masternode.innerHTML=injct;
}

function enemies(){
	var masternode=$("Enemiesmain");
	var style=' style="display: inline;width:40px;height:10px;cursor:pointer;margin:0px 3px 0px 3px;padding:0px 1px 1px 0px;-moz-outline:brown ridge 2px;-moz-outline-radius:5px 5px 5px 5px;" ';
	var enemieslist=GM_getValue("Enemies","").split('#,#');
	var injct='\
<div style="height:210px;  overflow: -moz-scrollbars-vertical; overflow-x: auto; overflow-y: auto;">\
<table id="enemiestable" cellpading=2 cellmargin=2 border=0><tbody>';
	for (var i=0;i<enemieslist.length-1;i++){
		injct+='<tr><td style="width:120px;border-bottom:brown dotted 1px;color:red;">'+enemieslist[i]+'</td><td><a id="questowner" class="questowner" title="'+enemieslist[i]+'" '+style+'>?</a><a '+style+' class="delenemy" title="'+enemieslist[i]+'">X</a></td></tr>';		
	}
	injct+='</tbody></table></div><br>';
    injct+='<input id="Enemiesname" type="text" title="Type in Enemy Name" value="" size=18/><br>';
	injct+='<a id="add" class="addenemy" title="Click to add a new Enemy " '+style+'>Add Enemy</a>';
	var style=' style="width:149px;cursor:pointer;margin:0px 0px 0px -2px;padding:2px 2px 2px 2px;-moz-outline:none;border-bottom:brown dotted 1px" ';
    var tempmenu='<br><br><div class="elisthead" style="width:149px;border-bottom:brown outset 2px;">Enemy Alliances</div>';
    for (var i=0;i<alliance.length;i++){
	 	if (alliance[i][1]==Enemies){
	 	    tempmenu+='<a id="questally" class="questally" title="'+alliance[i][0]+'" '+style+'>'+alliance[i][0]+'</a>';
	 	}
	}
	masternode.innerHTML=injct+tempmenu;
	
}

function friends(){
	var masternode=$("Friendsmain");
	var style=' style="display: inline;width:40px;height:10px;cursor:pointer;margin:0px 3px 0px 3px;padding:0px 1px 1px 0px;-moz-outline:brown ridge 2px;-moz-outline-radius:5px 5px 5px 5px;" ';
	var friendslist=GM_getValue("Friends","").split('#,#');
	var injct='\
<div style="height:210px;  overflow: -moz-scrollbars-vertical; overflow-x: auto; overflow-y: auto;">\
<table id="friendstable" cellpading=2 cellmargin=2 border=0><tbody>';
	for (var i=0;i<friendslist.length-1;i++){
		injct+='<tr><td style="width:120px;border-bottom:brown dotted 1px;color:green;">'+friendslist[i]+'</td><td><a id="questowner" class="questowner" title="'+friendslist[i]+'" '+style+'>?</a><a '+style+' class="delfriend" title="'+friendslist[i]+'">X</a></td></tr>';		
	}
	injct+='</tbody></table></div><br>';
    injct+='<input id="friendname" type="text" title="Type in Friend Name" value="" size=18/><br>';
	injct+='<a id="add" class="addfriend" title="Click to add a new Friends " '+style+'>Add Friend</a>';
	masternode.innerHTML=injct;
}

function iscrow(label,gmval,br){
	var out='';
	var configvalue=GM_getValue(gmval,'1');
	if (configvalue=='1') {
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td style="padding:10px 10px 10px 10px;"><input type="checkbox" checked name="'+gmval+'"/></td>';
	}else{
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td style="padding:10px 10px 10px 10px;"><input type="checkbox" name="'+gmval+'"/></td>';
	}	
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out; 
}

function istrow(label,sz,gmval,defval,br){
	var out='';
	var configvalue=GM_getValue(gmval,defval);
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td style="padding:10px 10px 10px 10px;"><input type="text" value="'+configvalue+'" size="'+sz+'" name="'+gmval+'"/></td>';
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out; 
}
function isbrow(label,cls,title,br){
	var out='<td style="padding:10px 10px 10px 10px;" colspan=2><input type="button" value="'+label+'" name="'+label+'" class="'+cls+'" style="cursor:pointer;"/></td>';
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out; 
}
function settings(){
	var masternode=$("Settingsmain");
	masternode.innerHTML+='\
<div id="ikacoresettings" style="height:290px;cursor:default;overflow: -moz-scrollbars-vertical; overflow-x: none; overflow-y: auto;border-bottom:1px solid brown;">\
<table id="settingstable" class="table01">\
<thead><tr><td colspan=4><h3><b><u>Side Bar Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">'
+iscrow('Search','SideBarSearch')
+iscrow('Notes','SideBarNotes',1)
+iscrow('Allies','SideBarAllies')
+iscrow('Enemies','SideBarEnemies',1)
+iscrow('Friends','SideBarFriends')
+iscrow('Games','SideBarGames',1)
+iscrow('Tools','SideBarTools')
+iscrow('Indexing','SideBarIndexing',1)
+iscrow('Chat','SideBarChat')
+'</tr></tbody><thead><tr><td colspan=4><h3><b><u>City View Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">'
+iscrow('Toggle buttons','CityToggleButtons')
+iscrow('Building Levels','CityBuildingLevels')
+'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Island View Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">'
+iscrow('Toggle Buttons','IslandToggleButtons')
+iscrow('City/Resource Levels','IslandLevels',1)
+iscrow('Player Names under Cities','IslandPlayerNames')
+iscrow('Text Effects for Inactives<br> and Players on Vacation','IslandInVac',1)
+iscrow('Make Inactives text blink','IslandInactiveBlink')
+iscrow('Show Highlight Legend','IslandLegend',1)
+iscrow('Highlight Cities based<br> on Alliance','IslandHighlight')
+iscrow('Heart next to<br> Friends Cities','IslandFriends',1)
+iscrow('Icon next to<br> Enemies Cities','IslandEnemies')
+iscrow('Icon next to Cities <br> with Spies','IslandSpies',1)
+iscrow('Icon next to Cities <br> with signed Cultural Treaty.','IslandCultTreaties')
+'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Messsages View</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">'
+iscrow('Check treaty buttons','MessageCheckTreaties')
+iscrow('Find player Cities button','MessagePlayerSearch')
+'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Embassy View</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">'
+iscrow('Check treaty buttons','EmbassyCheckTreaties')
+iscrow('Find player Cities button','EmbassyPlayerSearch',1)
+'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Highscore View</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">'
+iscrow('Find Alliance Cities Button','HighscoreAllianceSearch')
+iscrow('Find Player Cities Button','HighscorePlayerSearch',1)
+'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Chat Sidebar</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">'
+istrow('Width',3,'ChatWidth',1009)
+istrow('Height',3,'ChatHeight',400,1)
+'</tr></tbody></table></div>\
<a id="savesettings" class="savesettings" title="Click to save settings" style="display: inline;width:40px;height:10px;cursor:pointer;margin:0px 3px 0px 3px;padding:0px 1px 1px 0px;-moz-outline:brown ridge 2px;-moz-outline-radius:5px 5px 5px 5px;">Save</a>\
';
}
function search(){
	var masternode=$("Searchmain");
	masternode.innerHTML+='\
<div id="ikasearch" style="cursor:default;">\
<table id="searchtable" class="table01">\
<thead><tr><td colspan=2><h3><b><u>Quick Search</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">'
+istrow('Player',12,'SearchPlayer','',1)
+istrow('Alliance',1,'SearchAlliance','',1)
+istrow('Radius',1,'SearchRadius','',1)
+isbrow('Search','SearchMainQuickSearch',"Click to start Search")
+'</tr>\
<thead><tr><td colspan=2><h3><b><u>Tip</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">\
<td colspan=2><dd>\
Tip: The % symbol acts as a wild card, <br>for example if your search for pet% \
it will return all players starting with pet.<br> If you search for p%ter it will match all players \
like pater, peter, etc. If you search for %er , it will find all players ending with er. Same goes for alliance.\
<BR><BR>To lookup players with no alliance only, just fill in the alliance box the minus (-) symbol.\
<BR><BR>Radius must be a number, it defines how far away the results should be (leave blank for all).\
</dd></td></tr>\
<thead><tr><td colspan=2><h3><b><u>Advanced Search</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">\
<td colspan=2>\
<dd>NOT READY YET.</dd></td></tr>\
</tbody></table></div>';
/*<hr>\
<h3><b><u>Advanced Search</u></b></h3>\
Radius&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
X&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Y&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Island&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Island resource type&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Townhall Level&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Limit results&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Player Status&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
<hr>\
</div>\
';*/
}
function gameslist(width,title){	
	var style=' style="width:'+width+'px;cursor:pointer;margin:0px 0px 0px -2px;padding:2px 2px 2px 2px;-moz-outline:none;border-bottom:brown dotted 1px" ';
	var tempmenu='<li><div class="elisthead" style="width:'+width+'px;border-bottom:brown outset 2px">'+title+'</div>\
	<li><a id="marioplay" class="playgames" '+style+' title="Opens mini Mario bros game, its better than Ikariam. trust me.">Play Mario Bros</a></li>\
	<li><a id="bobleplay" class="playgames" '+style+' title="Opens mini Buble Boble game, some action to ikariam players. weeeeeeeeeeh.">Buble Boble</a></li>\
	<li><a id="tetrisplay" class="playgames" '+style+' title="Opens mini Tetris game, for the brains among u.">Tetris</a></li>\
	<li><a id="slotplay" class="playgames" '+style+' title="Opens mini slot machine, viva Las Vegas.">Slot Machine</a></li>';
	return '<ul>'+tempmenu+'</ul>';
}
function Highscores(){
	var magic=XX('//select[@name="highscoreType"]',XPFirst);
	if (magic){
		var magic=XX('//td[@class="allytag"]',XPFirst);
		if (magic) {
		if (testvar('HighscorePlayerSearch'))
			forall('.//td[@class="name"]',$('mainview') , function(obj,i){;
				btn(XX('.//td[@class="action"]',XPFirst,obj.parentNode),'questowner'+i,'questowner','?',obj.innerHTML,showplayernfo,5);});
		if (testvar('HighscoreAllianceSearch'))
			forall('.//td[@class="allytag"]', null, function(obj, i){
				btn(obj, 'questally' + i, 'questally', '?', obj.textContent, showplayernfo, 5);
			});			
		} else {
		if (testvar('HighscoreAllianceSearch'))
		forall('.//td[@class="name"]',$('mainview') , function(obj,i){;
				var ally=obj.textContent.split('(')[1];
					ally=ally.split(')')[0];					
				btn(XX('.//td[@class="action"]',XPFirst,obj.parentNode),'questally'+i,'questally','?',ally,showplayernfo,5);});	
		}
	}
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
			forall('//ul[@class="cityinfo"]/li[@class="owner"]', null, function(obj,i){ btn(obj,'questowner'+i,'questowner','?',trim(obj.textContent.split(':')[1]),null,10);});
			forall('//ul[@class="cityinfo"]/li[@class="ally"]', null, function(obj,i){ btn(obj,'questally'+i,'questally','?',trim(obj.textContent.split(':')[1]),null,30);});
		break;
		case "city":
			btn(getItem('owner'),'questowner','questowner','?',trim(getItem('owner').textContent.split(':')[1]),showplayernfo);
			btn(getItem('ally'),'questally','questally','?',trim(getItem('ally').textContent.split(':')[1]),showplayernfo);
			if (GM_getValue('CityToggleButtons','1')=='1'){
				var paNode=$('breadcrumbs').parentNode;
				if (paNode) btn(paNode,'ShowLevelsCityToggle','gameplay','L','Hides or shows the Buildings Levels.',function(){ togglevar("CityBuildingLevels");location.href=location.href;},5,'position:absolute;top:155px;left:655px;width:5px;z-index:54;');
			}
			if(GM_getValue('CityBuildingLevels','1')=='1'){
					forall('//ul[@id="locations"]/li[contains(@id,"position")]/a', null, function(obj,i){ 
						var lvl = obj.title.replace(/[^\d-]+/g, "");
						if (lvl.length>0) {
							var as=node('a','blevels','blevels',"width:12px;height:12px;top:10px;left:25px;",lvl);
							obj.parentNode.appendChild(as);}
					});		
			};
		break;
		case "museum":
			var mplayers="";
			forall('//td[@class="player"]', null, function(obj,i){				
				mplayers+=","+obj.innerHTML+",";
			});
			mplayers=mplayers.substr(0,mplayers.length-1);
			GM_setValue("CultTtreaties",mplayers);
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
		 case "plunder":
         var form=XX('//form[@id="plunderForm"]//input[@type="submit"]',XPFirst).parentNode;
         btn(form,'plunderbash2','plunderbash','x2 Attack','Attack the city 2 times.',actionshandler,80,';color:#542C0F;font-size:11px;');
         btn(form,'plunderbash3','plunderbash','x3 Attack','Attack the city 3 times.',actionshandler,20,';color:#542C0F;font-size:11px;');
         btn(form,'plunderbash4','plunderbash','x4 Attack','Attack the city 4 times.',actionshandler,20,';color:#542C0F;font-size:11px;');
         btn(form,'plunderbash5','plunderbash','x5 Attack','Attack the city 5 times.',actionshandler,20,';color:#542C0F;font-size:11px;');
         btn(form,'plunderbash6','plunderbash','x6 Attack','Attack the city 6 times.',actionshandler,20,';color:#542C0F;font-size:11px;');
         btn(form,'schedule','plunderbash','Schedule Attack(not yet working)','Attack the city at a specified time.',actionshandler,20,';color:#542C0F;font-size:11px;');
      break;
	}
	setInterval ( schedulerhandler, 1000 );
	sidetabs();	
	Embassy();
	Messages();
	Highscores();

}
function ToolsMenu(){}
function sortAllies(){}
