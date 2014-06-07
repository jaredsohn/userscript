// ==UserScript==

// @name		Liga del Mar Tools

// @version 		47

// @namespace 	GBoz

// @author  GBoz
// do not edit this, its not your work is it???

// @description	Corsair Tools - Modified to fit Liga del Mar Alliance (Delta Universe). Original script created by GBoz, used with permission (after apology accepted by GBoz for misuse of the script... :)

// @include		http://s*.ikariam.*/*

// ==/UserScript==
// ===========================================================================
var version=47;
var queryserver=getserverindex();//get the servers for ogame option box
var serverindex=queryserver[1];
var world = /([0-9]+)/.exec(location.host);//find world
	world = RegExp.$1;
var country=queryserver[0];//get the server country
var alliancefullnm;var alliancenm;var alliance;var chaturl;var forumurl;var forumurlnew;var Alliance;var Allies;var NoAlliance;var Enemies;var corsairmenu;var legend;var TreatyYes;var TreatyNo;var updatenotification;var maplegend;var txtplswait;var txtmap;var txtrefresh;var txtcoorddata;var txtmapdata;var txtmapdata2;var txtpagedata;var txtinfodata;var txtsorting;var txtchkplayer;
var getbody=document.getElementsByTagName('body')[0];
// ==================================================================================================================================================================================
// ==================================================================================================================================================================================
//no editing before this
// ==================================================================================================================================================================================
// ==================================================================================================================================================================================
// ==================================================================================================================================================================================
var scriptlocation="http://userscripts.org/scripts/source/34532.user.js";

// Set the highlight colors for every case
//can e red, green, blue etc
//also #123 or #112233 (#rrggbb) for example Alliance = [	'Blue'	,'#000000' ];
//or rgb(100,100,100)  with a max of 255 for example Alliance = [	'rgb(100,255,255)'	,'Blue'	];
//if u still dont understand google for html style color
Alliance	=	[	'Blue'	,'Blue'	];
Allies		=	[	'Cyan'	,'Green'];
NoAlliance	=	[	'Yellow','Brown'];
Enemies		=	[	'Red'	,'Red'	];

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='La Liga del Mar';
		alliancenm='CORSA';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['COR 2'		, Alliance	],
					['ΒΑΝΚ'			, Allies	],
					['RAMPAGE-=+'	, Enemies 	]  ];
		chaturl='';
		forumurl='http://ligadelmar.mforos.com';
		forumurlnew='';
		break;
}

//######################################################################################################################################################
//######################################################################################################################################################
//######################################################################################################################################################
// no more editing after this
//######################################################################################################################################################
//######################################################################################################################################################
//######################################################################################################################################################

switch (country) {
	case 'gr':
		ogameLink='http://ikariam.ogame-world.com/gr';
		corsairmenu=[
		//this one is for the title of the Tools menu
		['Εργαλεία Κουρσάρων' , '', '',''],
		//    URL , Info, Button Text, OnClick event in javascript,   '-' for spacer
		['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'Κυκλικό μήνυμα προς όλους τους Σύμμαχους', 'Αποστολή Κυκλικού Μήνυματος','','-'],
		[forumurl, ' Προς το Forum Συμμαχίας ','Forum '+alliancefullnm ,''],
		[forumurlnew, ' Προς το Forum Συμμαχίας, νέες καταχωρήσεις ',' Forum '+alliancefullnm +' <br> νέες καταχωρήσεις','','-'],
		[chaturl , ' Το Chat της Συμμαχίας, ανοίγει σε νέο παράθυρο' , 'Chatbox(Νέο Παράθυρο)' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		['', ' Το Chat της Συμμαχίας, ανοίγει στο ίδιο παράθυρο στο κάτω μέρος ','Chatbox(Διχοτόμηση)','makeframes(\''+chaturl+'\');' ,'-'],
		['http://ikariamlibrary.com/?content=IkaFight' , ' Εργαλείο για τους υπολογισμούς των στρατευμάτων ... ', 'Υπολογιστής Μάχης','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		[ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Εργαλείο εύρεσης πόλεων ενός παίχτη.', 'Αναζήτηση Πόλης',''],
		[ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world , ' Εργαλείο εύρεσης νησιών ενός παίχτη.', 'Αναζήτηση Νησιού','','-'],
		[scriptlocation , 'Αναβάθμιση των εργαλείων στην τελευταία έκδοση', ' Αναβάθμιση Εργαλείων Κουρσάρων ','']];
		//Island view Map Legend
		legend ='<table style="cursor:default"><TR style="color:'+Alliance[0]+';font-size:small;font-weight:900;"><TD><font size=5>҉</font></TD><TD>Ҝōŭϱσᾆϱōỉ</TD>'+
				'<TR style="color:'+Allies[0]+';font-size:x-small;font-weight:200;"><TD><font size=2>&nbsp;&nbsp;Ϡ</font></TD><TD>&nbsp;Σύμμαχοι</TD>'+
				'<TR style="color:'+NoAlliance[0]+';font-size:xx-small;font-weight:200"><TD>&nbsp;&nbsp;&nbsp;&nbsp;•</TD><TD>&nbsp;&nbsp;Χωρίς Συμμαχία</TD>'+
				'<TR style="color:'+Enemies[0]+';font-size:xx-small;font-weight:200"><TD>&nbsp;&nbsp;&nbsp;&nbsp;•</TD><TD>&nbsp;&nbsp;Εχθροί</TD></TR><table>';
		TreatyYes="Έχετε ήδη πολιτισμική συμφωνία με τον παίχτη αυτόν.\n\n Στα απλά Ελληνικά:\n Την έκατσες μάστορα!!";
		TreatyNo="Δεν βρέθηκε καμία πολιτισμική συμφωνία με τον παίχτη αυτόν. \n\n Στα απλά Ελληνικά:\n Δώστου να καταλάβει ρε παιδί μου!!";
		updatenotification='Υπάρχει μια νέα έκδοση των Εργαλείων των Κουρσάρων.\n Κάνετε αναβάθμιση από το μενού.';
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
		['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'Envoyer un message à tous les membres', 'Envoyer un message','','-'],
		[ forumurl, 'Forum des '+alliancenm ,'Forum',''],
		[ forumurlnew, 'Voir les derniers posts '+alliancenm, 'Nouveaux posts' ,'','-'],
		[ chaturl , 'Discuter avec les autres membres' , 'Chatbox' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		['', ' Discuter avec les autres membres ','Chatbox(Frame)','makeframes(\''+chaturl+'\');' ,'-'],
		['http://ikariamlibrary.com/?content=IkaFight' , 'Simulateur de bataille', 'Simulateur de bataille','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		[ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Chercher une ville ', 'Chercher une ville',''],
		[ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world, ' Chercher une île ', 'Chercher une île','','-'],
		[scriptlocation , 'Le dernier script', ' Update du script des '+alliancenm ,'']];
		//Island view Map Legend
		legend ='<font color="'+Alliance[0]+'" size=1>• '+alliancefullnm+'</font><br>'+
				'<font color="'+Allies[0]+'" size=1>• Allies</font><br>'+
				'<font color="'+NoAlliance[0]+'" size=1>• Sans Alliance</font><br>'+
				'<font color="'+Enemies[0]+'" size=1>• Enemies</font><br>';
		TreatyYes="You already have a cultural Treaty with this Player";
		TreatyNo="No cultural treaties found for this player.";
		updatenotification='Il y a une nouvelle version du script des '+alliancefullnm+'.\n Mettez à jour le script en utilisant le menu '+alliancefullnm+'.';
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
		['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , 'Bütün üyelere mesaj gönder', 'Sirküler Mesaj','','-'],
		[ forumurl, ' İttifak Forumu ',alliancenm+' Forum ',''],
		[ forumurlnew, ' İttifak Forumu, son eklenenler ',alliancenm +' yeni forum mesajları','','-'],
		[ chaturl , ' İttifak Sohbet, yeni pencerede gösterim' , 'Sohbet (Yeni Pencere)' ,'window.open(this.href, this.target, \'width=1070,height=800\'); return false;'],
		['', ' İttifak Sohbet, çerçeve içinde gösterim ','Sohbet (Çerçeve)','makeframes(\''+chaturl+'\');','-' ],
		['http://ikariamlibrary.com/?content=IkaFight' , 'Savaş hesaplamaları ... ', 'Savaş Hesaplayıcı','window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		[ogameLink+'/suche.php?view=suche_stadt&land_i='+serverindex+'&welt='+world, ' Şehir bulma sayfası ', 'Şehir Arama',''],
		[ogameLink+'/suche.php?view=suche_insel&land_i='+serverindex+'&welt='+world, ' Ada bulma sayfası ', 'Ada Arama','','-'],
		[scriptlocation , 'Eklenti güncelleme', alliancenm+' Araçları Güncelle ','']];
		//Island view Map Legend
		legend ='<table style="cursor:default"><TR style="color:'+Alliance[0]+';font-size:small;font-weight:900;"><TD><font size=5>∆&nbsp;</font></TD><TD> '+alliancefullnm+'</TD>'+
				'<TR style="color:'+Allies[0]+';font-size:small;font-weight:200;"><TD><font size=2>&nbsp;∑</font></TD><TD>Dost</TD>'+
				'<TR style="color:'+NoAlliance[0]+';font-size:small;font-weight:200"><TD><font size=2>&nbsp;Φ</font></TD><TD>İttifaksız</TD>'+
				'<TR style="color:'+Enemies[0]+';font-size:small;font-weight:200"><TD><font size=2>&nbsp;Ψ</font></TD><TD>Düşman</TD></TR><table>';
		TreatyYes="Bu oyuncu ile zaten kültürel antlaşmanız var";
		TreatyNo="Bu oyuncu ile kültürel antlaşmanız yok.";
		updatenotification=alliancenm+' Araçlarının yeni sürümü var.\n Lütfen '+alliancenm+' menüsünü kullanarak güncelleyin.';
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
		[scriptlocation , 'Gets the latest script', ' Update '+alliancefullnm+' Tools ','']];
		//Island view Map Legend
		legend ='<font color="'+Alliance[0]+'" size=1>• '+alliancefullnm+'</font><br>'+
				'<font color="'+Allies[0]+'" size=1>• Allies</font><br>'+
				'<font color="'+NoAlliance[0]+'" size=1>• No Alliance</font><br>'+
				'<font color="'+Enemies[0]+'" size=1>• Enemies</font><br>';
		TreatyYes="You already have a cultural Treaty with this Player";
		TreatyNo="No cultural treaties found for this player.";
		updatenotification='There is a newer version of '+alliancefullnm+' Tools.\n Please update your script using the '+alliancefullnm+' menu.';
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
	if (version<newversion) alert(updatenotification);
}

if(GM_getValue("LastUpdateMe")){
	var lastSearch;
	lastSearch = parseInt(GM_getValue("LastUpdateMe"));
	//check time elapsed from last update
	var now = parseInt(new Date().getTime());
	var searchFreq = 86400+1000; //
	//check update
	if(now - lastSearch > searchFreq){
		GM_setValue("LastUpdateMe", ""+now);
		get(scriptlocation,checkupdate);
	}
} else GM_setValue("LastUpdateMe", ""+new Date().getTime());

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
'tbody {'+
		'display:table-row-group;'+
		'vertical-align:middle;'+
'}'+
'table#nfotable {'+
				'-moz-box-sizing:border-box;'+
				'-moz-outline: red ridge 5px;-moz-outline-radius: 10px 10px 10px 10px;-moz-outline-offset:0px;'+
				'border-collapse:separate;'+
				'border-spacing:0px;'+
				'display:table;'+
				'margin-bottom:0;'+
				'margin-top:0;'+
				'text-indent:0;'+
				'color:#542C0F;'+
				'font-size:11px;}'+
				'tbody {'+
				'display:table-row-group;'+
				'vertical-align:middle;'+
'}'+
'table#nfotable2 {'+
				'-moz-box-sizing:border-box;'+
				'-moz-outline: brown ridge 2px;-moz-outline-radius: 10px 10px 10px 10px;-moz-outline-offset:0px;'+
				'border-collapse:separate;'+
				'border-spacing:0px;'+
				'display:table;'+
				'margin-bottom:0;'+
				'margin-top:0;'+
				'text-indent:0;'+
				'color:#542C0F;'+
				'font-size:11px;}'+
'tbody {'+
		'display:table-row-group;'+
		'vertical-align:middle;'+
'}'+
'tr {'+
	'display:table-row;'+
	'vertical-align:inherit;'+
'}'+
'td {'+
	'display:table-cell;'+
	'padding:0px;'+
	'text-align:inherit;'+
	'vertical-align:inherit;'+
	'float:none;'+
'}'+
'td.head {'+
		'background-color:#E0B16D;'+
		'border:1px solid #BB9765;'+
		'font-size:13px;'+
		'text-align:center;'+
'}'+
'td.body {'+
		'background-color:#F6EBBC;'+
		'border-color:#000000;'+
		'padding-left:1px;'+
		'padding-right:1px;'+
'}'+
'td.body_number {'+
				'background-color:#F6EBBC;'+
				'border-color:#000000;'+
				'text-align:right;'+
'}'+
'td.inseln {background-color: rgb(30, 60, 220);'+
			'height:5px;'+
			'width:5px;'+
			''+
'}'+
"#chatbar { background:black; padding-top:33px; width:1010px; position:fixed; left:-1016px; top:400px; bottom:0px; border:1px black solid; z-index:50;cursor:pointer;font-size:7px;}"+
"#chattab { background:url("+chatimg+"); width:24px; height:90px; position:absolute; right:-28px; top:0px; } "+
"#chattab:click { left: 0px; } "+
"#corsairprogress { position:fixed; z-index:60}"+
"#nfoframe{z-index:55;background:#DBBE8C;font:normal 12px Arial, Helvetica, sans-serif;text-align:center;color:#542c0f;position:absolute;}"+
"#nfoplayer,#nfoalliance,#seite{background:white;font-size:10px;padding:1px 1px 1px 1px;margin:3px 5px 3px 5px;-moz-outline: red inset 3px;-moz-outline-radius: 12px 1px 12px 1px;}"+
".gameplay,.questowner,.questally,.checktreaty,.seite_change,.seite_changep ,#nfomapbutton,#nfomapbuttona{background:yellow;text-decoration:none;cursor:pointer;font-size:9px;padding:1px 1px 1px 1px;margin:3px 5px 3px 5px;-moz-outline: red ridge 3px;-moz-outline-radius: 12px 1px 12px 1px;}"+
".gameplay:hover,.questowner:hover,.questally:hover,.checktreaty:hover,#nfomapbutton:hover,#nfomapbuttona:hover,.seite_change:hover,.seite_changep:hover {background:orange;text-decoration:none;-moz-outline: red ridge 3px;-moz-outline-radius: 8px 1px 8px 1px;}"+
".gameplay:active,.questowner:active,.questally:active,.checktreaty:active,#nfomapbutton:active,#nfomapbuttona:active,.seite_change:active,.seite_changep:active {background:red;-moz-outline: red inset 3px;-moz-outline-radius: 12px 1px 12px 1px;}"+
"#nfoframeclose{background:gray;text-decoration:none;cursor:pointer;font-size:9px;padding:1px 1px 1px 1px;margin:3px 5px 3px 5px;-moz-outline: red ridge 3px;-moz-outline-radius: 12px 1px 12px 1px;}"+
"#nfoframeclose:hover {background:lightgray;text-decoration:none;-moz-outline: red ridge 3px;-moz-outline-radius: 10px 1px 10px 1px;}"+
"#nfoframeclose:active {background:black;-moz-outline: red inset 3px;-moz-outline-radius: 12px 1px 12px 1px;}"+
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

function ProgressCreate(end,tag) {
	_progressEnd = end;
	_progressAt = 0;
	if (!tag) tag='';
	getbody.appendChild(node('div','corsairprogress','','left:'+parseInt((window.innerWidth/2)-200)+'px; top:'+parseInt(pageYOffset+(window.innerHeight/2) - 40)+'px;','<FORM name=dialog id=dialog><TABLE border=2  bgcolor="#FFFFCC" id="cor"><TR><TD ALIGN="center">'+txtplswait+'&nbsp;'+tag+'<BR><input type=text name="corsairbar" id="corsairbar" size="' + _progressWidth/2 + '" style="color:navy;"></TD></TR></TABLE></FORM>'));
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
			case '':
				tempmenu+='<li><center><a target="_blank" title="'+corsairmenu[i][1]+'" onclick="'+corsairmenu[i][3]+'" style="cursor:pointer">'+corsairmenu[i][2]+'</a></center></li>';
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
	getbody.appendChild(node('div','chatbar','','',
		'<div id="chattab" ondblclick="this.parentNode.style.left=\'0px\';" onclick="this.parentNode.style.left=\'-1016px\';"><a href="http://'+location.host+'/index.php?view=diplomacyAdvisor&oldView=diplomacyAdvisor&watch=4" style="height:75%;width:80%;"><br>'+alliancenm+'</a></div>'
	+	'<div id="chatframe" style="position:absolute;top:1px;bottom:1px;left:0px;width:1010px;" onmouseover="displaychat()">Mouse over this area to load the chatbox</div>'
	+	'<div style="width:1010px;position:absolute;bottom:0px;left:0px;height:2px;background:black"></div>'
	));
}

function islandview(){
	getbody.appendChild(node('div',null,null,'color:white;font-size:7px;position:absolute;top:310px;left:30px;z-index:100','C'+'o'+'r'+'s'+'a'+'i'+'r'+' T'+'o'+'o'+'l'+'s '+'I'+'n'+'s'+'i'+'d'+'e'));
	var paNode=$('breadcrumbs').parentNode;
	if (paNode) paNode.appendChild(node('li','corlegend','','position:absolute;top:193px;left:270px;width:200px;height:100px;z-index:54',legend));
	forall("//ul[@class='cityinfo']", null, function(obj,i){
		var ally=XX(".//li[@class='ally']/a",XPFirst,obj);
		var owner=XX(".//a/span",XPFirst,obj.parentNode);
		if (ally) {
			for (var j=1;j<alliance.length;j++) 
				if (ally.innerHTML==alliance[j][0]) {
					setCityColors(ally, owner, alliance[j][1][1], alliance[j][1][0],'opacity:0.8;');break;
				} 
		} else	setCityColors(null, owner, alliance[0][1][1], alliance[0][1][0],'text-decoration:blink;');
	});
}

function setCityColors(ally,owner,col,bcol,extrastyle){
	if (ally) ally.style.color=col;
	if (owner) owner.setAttribute('style', ';color:'+col+';-moz-outline: '+bcol+' outset 6px;-moz-outline-radius: 7px 7px 7px 7px;-moz-outline-offset:-2px;'+extrastyle);
}

//player info hax
function smallimages(obj){
	forall('//img', obj, function(obj,i){
		obj.width=12;obj.height=12;
	});
};

function deleteLastRow(tbl,rows){
	for (var i=0; i < rows; i++) tbl.deleteRow(tbl.rows.length-1);
}

function informpost(text,tag){
	var fake=node('div','','','',text);
	ProgressStepIt();
	smallimages(fake);
	ProgressStepIt();
	switch (tag) {
		case 'player':
			nfoframe=$("nfoframe");
			buf=XX('//input[@name="spieler"]', XPFirst,fake);
			if (buf) {
				player=buf.value;
				buftable=XX('//table/following-sibling::table', XPFirst,fake);
				if (buftable) {
					deleteLastRow(buftable,2);
					nfoframe.innerHTML='<table id="nfotable" cellspacing="0" cellpadding="0" border="1">'+buftable.innerHTML+'</table>';
					ProgressStepIt();
					bufrow=XX('.//tr', XPFirst,nfoframe,'<td colspan='+(buftable.rows[2].cells.length-8)+'><div id="nfoframeclose2" class="dragclass"><Font size=4>'+corsairmenu[0][0]+'</font></div></td><td colspan=7><input id="nfoplayer" name="nfoplayer" type="text" value="'+player+'"><a id="seite_change" class="seite_changep">'+txtrefresh+'</a><a id="nfomapbutton" class="nfomapbuttonp">'+txtmap+'</a></td><td><input id="nfoframeclose" name="nfoframeclose" type="button" value="X" onClick="document.getElementById(\'nfoframe\').parentNode.removeChild(document.getElementById(\'nfoframe\'));"></td>');
					forall('//a[@class="seite_change"]', nfoframe, function(obj,i){
						clickTo(obj,showplayernfo,1);
						ProgressStepIt();
					});
					clickTo($('nfomapbutton'),showplayernfo,1);
				}
			}
		break;
		case 'ally':
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
					butts.parentNode.innerHTML+='<a id="seite_changeb" class="seite_change">«</a><a id="seite_changef" class="seite_change">»</a>';
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
		case 'map':
			nfoframe=$("nfoframe");
			buf=XX('//table', XPFirst,fake);
			if (buf) {
				nfoframe.innerHTML='<table border=1 id="nfotable"><tr><td><div id="nfoframeclose2" class="dragclass" style="border:brown outset 5px;"><Font size=4>'+corsairmenu[0][0]+' - '+txtmap+'</font><hr>'+
									'<font color="black" size=1>• '+maplegend[0]+'</font>&nbsp;'+
									'<font color="Green" size=1>• '+maplegend[1]+'</font>&nbsp;'+
									'<font color="red" size=1>• '+maplegend[2]+'</font><br>'+
									'<font color="Orange" size=1>• '+maplegend[3]+'</font>&nbsp;'+
									'<font color="Blue" size=1>• '+maplegend[4]+'</font>'+
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
		var nfo=node('div','nfoframe',null,"left:"+parseInt((window.innerWidth/2)-400)+"px;top:"+parseInt(pageYOffset+(window.innerHeight/2) - 240)+"px;");
		getbody.appendChild(nfo);
		dragger();
	}
	var srcEl=mapevt(e);
	if (srcEl) {
		switch (srcEl.className) {
			case 'questowner':
				ProgressCreate(10,txtinfodata);
				post(ogameLink+'/suche.php?view=suche_stadt','land_i='+serverindex+'&wunder=0&welt='+world+'&highscoreType=0&spieler='+srcEl.title+'&allianz=&insel_name=&stadt=&x_sc_i=0&x=&x2_sc_i=0&x2=&y_sc_i=0&y=&y2_sc_i=0&y2=&holz_sc_i=0&holz_level=&luxus_i=0&luxus_sc_i=0&luxusgut_level=&rathaus_sc_i=0&rathaus=&besiedelt_sc_i=0&besiedelt=&asc_desc=&sortierung_i=0&asc_desc_2_i=0&sortierung_2_i=0&submit=Search',informpost,'player');
				break;
			case 'questally':
				ProgressCreate(10,txtinfodata);
				nfo.style.top='30px';
				post(ogameLink+'/suche.php?view=suche_stadt','seite=1&land_i='+serverindex+'&wunder=0&welt='+world+'&highscoreType=0&spieler=&allianz='+srcEl.title+'&insel_name=&stadt=&x_sc_i=0&x=&x2_sc_i=0&x2=&y_sc_i=0&y=&y2_sc_i=0&y2=&holz_sc_i=0&holz_level=&luxus_i=0&luxus_sc_i=0&luxusgut_level=&rathaus_sc_i=0&rathaus=&besiedelt_sc_i=0&besiedelt=&asc_desc=&sortierung_i=0&asc_desc_2_i=0&sortierung_2_i=0&submit=Search',informpost,'ally');
				break;
			case 'inseln':
				ProgressCreate(10,txtcoorddata);
				var coord=srcEl.title.split(',')[0];
				post(ogameLink+'/suche.php?view=suche_stadt','seite=&land_i='+serverindex+'&wunder=0&welt='+world+'&highscoreType=0&spieler=&allianz=&insel_name=&stadt=&x_sc_i=0&x='+coord.split(':')[0]+'&x2_sc_i=0&x2=&y_sc_i=0&y='+coord.split(':')[1]+'&y2_sc_i=0&y2=&holz_sc_i=0&holz_level=&luxus_i=0&luxus_sc_i=0&luxusgut_level=&rathaus_sc_i=0&rathaus=&besiedelt_sc_i=0&besiedelt=&asc_desc=&sortierung_i=0&asc_desc_2_i=0&sortierung_2_i=0&submit=Search',informpost,'mapisland');
			case 'nfomapbuttona':
				var alliance=XX('//input[@id="nfoalliance"]',XPFirst,nfo);
				if (alliance) {
					ProgressCreate(10,txtmapdata2);
					get(ogameLink+'/suche.php?view=weltkarte&old_view=ikariam_spieler&land='+country+'&welt='+world+'&wunder=0&insel_name=&x=&y=&x2=&y2=&y=&holz_level=&besiedelt=&x_sc==&y_sc==&holz_sc==&besiedelt_sc==&luxus=luxusgut&luxus_sc==&luxusgut_level=&spieler=&allianz='+alliance.value+'&stadt=&rathaus=&rathaus_sc==',informpost,'map');
				}
				break;
			case 'nfomapbuttonp':
				var player=XX('//input[@id="nfoplayer"]',XPFirst,nfo);
				if (player){
					ProgressCreate(10,txtmapdata);
					get(ogameLink+'/suche.php?view=weltkarte&old_view=ikariam_spieler&land='+country+'&welt='+world+'&wunder=0&insel_name=&x=&y=&x2=&y2=&y=&holz_level=&besiedelt=&x_sc==&y_sc==&holz_sc==&besiedelt_sc==&luxus=luxusgut&luxus_sc==&luxusgut_level=&spieler='+player.value+'&allianz=&stadt=&rathaus=&rathaus_sc==',informpost,'map');
				}
				break;
			case 'seite_changep':
				var player=XX('//input[@id="nfoplayer"]',XPFirst,nfo);
				if (player) {
					ProgressCreate(10,txtpagedata);
					post(ogameLink+'/suche.php?view=suche_stadt','seite=&land_i='+serverindex+'&wunder=0&welt='+world+'&highscoreType=0&spieler='+player.value+'&allianz=&insel_name=&stadt=&x_sc_i=0&x=&x2_sc_i=0&x2=&y_sc_i=0&y=&y2_sc_i=0&y2=&holz_sc_i=0&holz_level=&luxus_i=0&luxus_sc_i=0&luxusgut_level=&rathaus_sc_i=0&rathaus=&besiedelt_sc_i=0&besiedelt=&asc_desc=&sortierung_i=0&asc_desc_2_i=0&sortierung_2_i=0&submit=Search',informpost,'player');
				}
				break;
			case 'seite_change':
				var getpage=XX('//input[@name="seite"]',XPFirst,nfo);
				if (getpage) {
					ProgressCreate(10,txtpagedata);
					var page=number(getpage.value);
					if (srcEl.innerHTML=='»') page=page+1;
					if (srcEl.innerHTML=='«') page=page-1;
					var getalliance=XX('//input[@id="nfoalliance"]',XPFirst,nfo);
					if (getalliance) {
						var alliance=getalliance.value;
						ProgressStepIt();
						post(ogameLink+'/suche.php?view=suche_stadt','seite='+page+'&land_i='+serverindex+'&wunder=0&welt='+world+'&highscoreType=0&spieler=&allianz='+alliance+'&insel_name=&stadt=&x_sc_i=0&x=&x2_sc_i=0&x2=&y_sc_i=0&y=&y2_sc_i=0&y2=&holz_sc_i=0&holz_level=&luxus_i=0&luxus_sc_i=0&luxusgut_level=&rathaus_sc_i=0&rathaus=&besiedelt_sc_i=0&besiedelt=&asc_desc=&sortierung_i=0&asc_desc_2_i=0&sortierung_2_i=0&submit=Search',informpost,'ally');
					}
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
		ProgressCreate(2,txtsorting);
		ProgressStepIt();
		forallrows(table,1,function(tbl,i){	tbl.rows[i].cells[4].innerHTML=tbl.rows[i].cells[4].innerHTML.replace(',','.');});
		ProgressStepIt();
		forallrows(table,1,function(tbl,i){
			var max;
			max = findmax(i, tbl);
			mswap(tbl.rows[i],tbl.rows[max]);
			tbl.rows[i].cells[0].innerHTML=i+"."+tbl.rows[i].cells[0].innerHTML;
			btn(tbl.rows[i].cells[tbl.rows[i].cells.length-2],'questowner'+i,'questowner','?',tbl.rows[i].cells[2].innerHTML,showplayernfo,'5');		
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
	forall('//td[@class="player"]', fake, function(obj,i){
		ProgressStepIt();
		if (obj.innerHTML==musplayer) found=1;
	});
	ProgressDestroy();
	if (found==1) 
		alert(TreatyYes);
	 else 
		alert(TreatyNo);
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
	if (tbl) 
		for (i=1; i<tbl.rows.length -3; i=i+3) {
			btn(tbl.rows[i].cells[1],'questowner'+i,'questowner','?',trim(tbl.rows[i].cells[2].textContent),showplayernfo,'5');
			btn(tbl.rows[i].cells[0],'chktreaty'+i,'checktreaty','Ѻ',trim(tbl.rows[i].cells[2].textContent),checkplayer,'5');
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

function showgames(){
	btn(getbody,'marioplay','gameplay','Play Mario Bros','Opens mini Mario bros game, its better than Ikariam. trust me.',playmario,'5','position:absolute;top:160px;left:40px;width:60px;z-index:99;');
	btn(getbody,'bobleplay','gameplay','Buble Boble','Opens mini Buble Boble game, some action to ikariam players. weeeeeeeeeeh.',playboble,'5','position:absolute;top:190px;left:40px;width:60px;z-index:99;');
	btn(getbody,'tetrisplay','gameplay','Tetris','Opens mini Tetris game, for the brains among u.',playtetris,'5','position:absolute;top:220px;left:40px;width:60px;z-index:99;');
	btn(getbody,'slotplay','gameplay','Slot Machine','Opens mini slot machine, viva Las Vegas.',playslot,'5','position:absolute;top:250px;left:40px;width:60px;z-index:99;');
}

ToolsMenu();
sortAllies();
fixmessages();
fixtreaties();
showgames();
showchat();

switch (getbody.id){
	case "island":
		islandview();
		var playerlookup=cityinfoPanelIsland();
		if (playerlookup) clickTo(playerlookup,showplayernfo,1);
		forall('//ul[@class="cityinfo"]/li[@class="owner"]', null, function(obj,i){ btn(obj,'questowner'+i,'questowner','?',trim(obj.textContent.split(':')[1]),null,'30');});
		forall('//ul[@class="cityinfo"]/li[@class="ally"]', null, function(obj,i){ btn(obj,'questally'+i,'questally','?',trim(obj.textContent.split(':')[1]),null,'30');});
		break;
	case "city":
		btn(getItem('owner'),'questowner','questowner','?',trim(getItem('owner').textContent.split(':')[1]),showplayernfo);
		btn(getItem('ally'),'questally','questally','?',trim(getItem('ally').textContent.split(':')[1]),showplayernfo);
		break;
	case "highscore":
		forall('.//td[@class="name"]', null, function(obj,i){	btn(XX('.//td[@class="action"]',XPFirst,obj.parentNode),'questowner'+i,'questowner','?',obj.innerHTML,showplayernfo,'5');});
		break;
	case "branchOffice":
		var table=XX('//table[@class="tablekontor"]', XPList).snapshotItem(1);
		if (table) {
			forallrows(table, 1, function(tbl,i){
				var nm=tbl.rows[i].cells[0].textContent.split('(')[1];
				if (nm) {
					nm=nm.split(')')[0];
					btn(tbl.rows[i].cells[tbl.rows[i].cells.length-1],'questowner'+i,'questowner','?',nm,showplayernfo,'5');
				}
			});
		}
		break;
}
