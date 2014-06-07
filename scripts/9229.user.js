// ==UserScript==
// @name OgameCN-balkan
// @namespace http://ogame.com.cn/
// @author Perberos
// @description  Translate Ogame Chinese beta
// @version  0.6c beta
// @include     http://www.ogame.com.cn/
// @include     http://ogame.com.cn/
// @include     http://222.73.247.132/game/*.php*
// @include     http://61.129.86.97/game/*.php*
// @include     http://61.129.88.114/game/*.php*
// ==/UserScript==

// Copyright (C) 2006, Perberos
// http://www.perberos.com.ar/
// E-Mail: perberos@hotmail.com
//
// Version 0.6c beta [2006.9.1]
// Copyright (c) 2006, Matsurai
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//--------------------------------------------------------------------------------------------------
//Se obtiene el valor
OgameCN_lang = GM_getValue("OgameCN_lang");

//Esta parte es por si se ejecuta por primera vez
{if(!OgameCN_lang){
	GM_setValue("OgameCN_lang", "ba");
	OgameCN_lang = GM_getValue("OgameCN_lang");
}//menu en ingles
GM_registerMenuCommand("Balkan", function() {
	alert("Balkan Activated!");
	GM_setValue("OgameCN_lang", "ba");
})
}
//Arrays Translation Words (Dont touch! Eek!)
{Zahlen = new Array(
	Array(37329, 23646, 30719),//id0
	Array(26230, 20307, 30719),//id1
	Array(37325, 27682, 20998, 31163, 22120),//id2
	Array(22826, 38451, 33021, 21457, 30005, 31449),//id3
	Array(26680, 30005, 31449),//id4
	Array(32435, 31859, 26426, 22120, 20154, 24037, 21378),//id5
	Array(26426, 22120, 20154, 24037, 21378),//id6
	Array(36896, 33337, 21378),//id7
	Array(37329, 23646, 20179, 24211),//id8
	Array(26230, 20307, 20179, 24211),//id9
	Array(37325, 27682, 27133),//id10
	Array(30740, 31350, 23454, 39564, 23460),//id11
	Array(22320, 24418, 25913, 36896, 22120),//id12
	Array(23548, 24377, 21457, 23556, 20117),//id13
		//
	Array(31354, 38388, 25506, 27979, 25216, 26415),//id14
	Array(35745, 31639, 26426, 25216, 26415),//id15
	Array(27494, 22120, 25216, 26415),//id16
	Array(38450, 24481, 30462, 31995, 32479),//id17
	Array(35013, 30002, 25216, 26415),//id18
	Array(33021, 37327, 25216, 26415),//id19
	Array(36229, 31354, 38388, 25216, 26415),//id20
	Array(29123, 28903, 24341, 25806),//id21
	Array(33033, 20914, 24341, 25806),//id22
	Array(36229, 31354, 38388, 24341, 25806),//id23
	Array(28608, 20809, 25216, 26415),//id24
	Array(20013, 23376, 25216, 26415),//id25
	Array(31561, 31163, 23376, 25216, 26415),//id26
	Array(36328, 26143, 31995, 31185, 30740, 32593, 32476),//id27
	Array(24341, 21147, 25216, 26415),//id28
	//
	Array(23567, 22411, 36816, 36755, 33328),//id29
	Array(22823, 22411, 36816, 36755, 33328),//id30
	Array(36731, 22411, 25112, 26007, 26426),//id31
	Array(37325, 22411, 25112, 26007, 26426),//id32
	Array(24033, 27915, 33328),//id33
	Array(25112, 21015, 33328),//id34
	Array(27542, 27665, 33337),//id35
	Array(22238, 25910, 33337),//id36
	Array(25506, 27979, 22120),//id37
	Array(36720, 28856, 26426),//id38
	Array(22826, 38451, 33021, 21355, 26143),//id39
	Array(27585, 28781, 32773),//id40
	Array(27515, 26143),//id41
	//
	Array(28779, 31661, 21457, 23556, 35013, 32622),//id42
	Array(36731, 22411, 28608, 20809, 28846),//id43
	Array(37325, 22411, 28608, 20809, 28846),//id44
	Array(39640, 26031, 28846),//id45
	Array(20013, 23376, 28846),//id46
	Array(31561, 31163, 23376, 27494, 22120),//id47
	Array(23567, 22411, 38450, 25252, 32617),//id48
	Array(22823, 22411, 38450, 25252, 32617),//id49
	Array(25318, 25130, 23548, 24377),//id50
	Array(26143, 38469, 23548, 24377),//id51
	//moon walker :S
	Array(26376, 29699, 22522, 22320),//id52
	Array(24863, 24212, 38453),//id53
	Array(31354, 38388, 20256, 36865, 28857)//id54
	);
//array de ids
Cid = new Array(1,2,3,4,12,15,14,21,22,23,24,31,33,44,106,//14
	108,109,110,111,113,114,115,117,118,120,121,122,123,199,//28
	202,203,204,205,206,207,208,209,210,211,212,213,214,401,//32
	402,403,404,405,406,407,408,502,503,41,42,43);//54
//Defaults
chM=c(37329)+c(23646);
chC=c(26230)+c(20307);
chD=c(37325)+c(27682);
chE=c(33021)+c(37327);
}
//
// U can use this to make you owner lenguage
//

if(OgameCN_lang == "ba"){
	//--[LeftMenu]---------------------------
	Overview = "Pregled";
	Imperium = "Imperij";
	Buildings = "Zgrade";
	Resources = "Resursi";
	Research = "Istrazivanje";
	Shipyard = "Brodogradiliste";
	Fleet = "Flota";
	Technology = "Tehnologija";
	Galaxy = "Galaksija";
	Defence = "Obrana";
	Alliance = "Savez";
	Board = "Forum";
	Statistics = "Statistike";
	Search = "Trazi";
	Help = "Pomoc";
	Messages = "Poruke";
	Notes = "Zapisi";
	Buddylist = "Prijatelji";
	Options = "Postavke";
	Logout = "Logout";
	Rules = "Pravila";
	Legal_Notice = "Impresum";
	//--[Search]-------------------------
	playername = "Ime igraca";
	planetname = "Ime planete";
	allytag = "Tag saveza";
	allyname = "Ime saveza";
	//--[Misc]---------------------------
	Metal = "Metal";
	Crystal = "Kristal";
	Deuterium = "Deuterij";
	Energy = "Energija";
	level = "level";
	Time = "Vrijeme";
	dTime = 'd';
	hTime = "s";
	mTime = "m";
	sTime = "s";
	Requires = 'Potrebno';
	Version = "Verzija";
	Description = "Opis";
	Players = 'Igraci';
	Points = 'Bodovi';
	Requirements = 'Potrebno';
	Ships = 'Brodovi';
	Lunar_Buildings = 'Zgrade na mjesecu';
	Planet = 'Planet';
	Moon = 'Mjesec';
	Debris = 'Rusevina';
	Build = 'Izgraditi';
	Upgrade = "Izgradnja";
	Investigate = 'Istrazivati';
	Planet_menu = "Planet menu";
	No_ships = 'Nijedan brod';
	All_ships = 'Svi brodovi';
	maxShip = 'max';
	Max_resources = 'Max resources';
	Attack = "Napad";
	Transport = "Transport";
	Move = "Move";
	Fleet_Position = "Fleet Position";
	Spy = "Spy";
	Harvest = "Vaditi";
	Destroy = "Unistiti";
	//--[Message]---------------------------
	SpyPorcent = 'Counter survey probability';
	IsApproaches = 'is monitored approaches your star ';
	ARowExternalFleet = 'A row external fleet from star ';
	YourFleet = 'Tvoja flota';
	ComeFrom = 'dolazi sa';
	Returns = 'na';
	ReturnWithoutResources = 'The fleet has returned without bringing resources.';
	Resources_in = 'Resursa u';
	Circular_message = 'Kruzna poruka';
	Fleet_Return = 'Fleet Return';
	Fleet_Order = 'Fleet Orders';
	Spy_Alert = 'Spy Alert';
	Space_Control = 'Space Control';
	Spy_Compact = 'The reconnaissance reported only demonstrates the title';
	Delete_All = 'Delete All';
	Delete_All_Shown = 'Delete All Shown';
	Delete_Non_Marked = 'Delete Non-Marked';
	Delete_Marked = 'Delete Marked';
	//--[id]---------------------------
	gid1 = "Rudnik metala";
	gid2 = "Rudnik kristala";
	gid3 = "Sintizer deuterija";
	gid4 = "Solarna elektrana";
	gid12 = "Fuzijska elektrana";
	gid14 = "Tvornica robota";
	gid15 = "Tvornica nanita";
	gid21 = "Brodogradiliste";
	gid22 = "Spremnik metala";
	gid23 = "Spremnik kristala";
	gid24 = "Spremnik deuterija";
	gid31 = "Istrazivacki laboratorij";
	gid33 = "Terraformer";
	gid34 = "Depo";
	gid41 = "Baza na mjesecu";
	gid42 = "Senzorfalanga";
	gid43 = "Odskocna vrata";
	gid44 = "Silos za rakete";
	gid106 = "Tehnologija za spijunazu";
	gid108 = "Tehnologija za kompjutere";
	gid109 = "Tehnologija za oruzje";
	gid110 = "Tehnologija za stitove";
	gid111 = "Tehnologija za oklop";
	gid113 = "Tehnologija za energiju";
	gid114 = "Tehnologija za hiperzonu";
	gid115 = "Mehanizam sagorijevanja";
	gid117 = "Impulsni pogon";
	gid118 = "Hyperspace pogon";
	gid120 = "Tehnologija za lasere";
	gid121 = "Tehnologija za ione";
	gid122 = "Tehnologija za plazu";
	gid123 = "Intergalakticna znanstvena mreza";
	gid199 = "Tehnologija za gravitone";
	gid202 = "Mali transporter";
	gid203 = "Veliki transporter";
	gid204 = "Mali lovac";
	gid205 = "Veliki lovac";
	gid206 = "Krstarica";
	gid207 = "Borbeni brod";
	gid208 = "Kolonijalni brod";
	gid209 = "Recikler";
	gid210 = "Sonda za spijunazu";
	gid211 = "Bombarder";
	gid212 = "Solarni Satelit";
	gid213 = "Razarac";
	gid214 = "Zvijezda smrti";
	gid401 = "Raketobacac";
	gid402 = "Mali laser";
	gid403 = "Veliki laser";
	gid404 = "Gausov top";
	gid405 = "Ionski top";
	gid406 = "Plazma top";
	gid407 = "Mala stitna kupola";
	gid408 = "Velika stitna kupola";
	gid502 = "Anti-balisticka raketa";
	gid503 = "Interplanetarna raketa";
	//--[Reports]----------------
	Number = 'Broj';
	at = "at";
} 
//Funcion vasica para cambiar los nombre de los links por medio de un id. Ademas
//cambia el nombre de los links sin necesidad de traducir.
function change_links(a){
	x = a.href.indexOf('gid=');
	a.innerHTML = eval('gid'+a.href.substr(a.href.indexOf('gid=')+4));
}
//Traduce los informes de batalla y los informes de espionaje.
//tanto  en la seccion mensajes, como en la de reportes
function ReportsTranslate(tagnames,method){
	if(!method){
		//Mensajes: Color de numeros
		var publi = document.getElementsByTagName (tagnames);
		for (var i = publi.length - 1; i >= 0; i--) {
			if(publi[i].innerHTML){
				htmldentro = publi[i].innerHTML * 1 ;
				if( htmldentro >= 100000 && htmldentro < 5000000) {
					publi[i].style.color="rgb(36,183,0)";
				}
				if( htmldentro >= 500000 && htmldentro < 1000000 ) {
					publi[i].style.color="rgb(239,173,20)";
				}
				if( htmldentro >= 1000000 ) {
					publi[i].style.color="rgb(255,0,0)";
				}
			}
			if(publi[i].innerHTML.indexOf(c(36164)+c(28304)+c(22312)+' ') != -1 && publi[i].innerHTML.indexOf('%') != -1){
				publi[i].style.color="rgb(170,170,0)";
				if(publi[i].parentNode.innerHTML)
					var onTop = publi[i].parentNode;
				else
				 var onTop = publi[i];
				onTop.innerHTML = onTop.innerHTML.replace(c(21453)+c(25506)+c(27979)+c(27963)+c(21160)+c(26426)+c(29575),SpyPorcent);
				onTop.innerHTML = onTop.innerHTML.replace(c(36164)+c(28304)+c(22312),Resources_in);
				onTop.innerHTML = onTop.innerHTML.replace(c(22312),at);
				onTop.innerHTML = onTop.innerHTML.replace(c(33328)+c(38431),Fleet);
				onTop.innerHTML = onTop.innerHTML.replace(c(38450)+c(24481),Defence);
				onTop.innerHTML = onTop.innerHTML.replace(c(24314)+c(31569),Buildings);
				onTop.innerHTML = onTop.innerHTML.replace(c(30740)+c(31350),Research);
				
				onTop.innerHTML = onTop.innerHTML.replace(chM,Metal);
				onTop.innerHTML = onTop.innerHTML.replace(chC,Crystal);
				onTop.innerHTML = onTop.innerHTML.replace(chD,Deuterium);
				onTop.innerHTML = onTop.innerHTML.replace(chE,Energy);
				for(i=0;i<Zahlen.length;i++){
				  //Armamos las palabras temporalmente
					word = '';
					for(x=0;x<Zahlen[i].length;x++){
					  word += c(Zahlen[i][x]);
				  }
					onTop.innerHTML = onTop.innerHTML.replace(word,eval("gid"+Cid[i]));
				}
			}
		}
	}else{
		for(i=0;i<Zahlen.length;i++){
			//Armamos las palabras temporalmente
			word = '';
			for(x=0;x<Zahlen[i].length;x++){
				word += c(Zahlen[i][x]);
			}
			document.body.innerHTML = document.body.innerHTML.replace(word,eval("gid"+Cid[i]));
		}
	}
}
//Esta funcion es similar a la que se encuentra mas abajo. Permite traducir solo
//los textos de las naves de combate, dentro de los mensajes de ordenes de naves.
function translate(txt){
		
		for(i=29;i<41;i++){
			//Armamos las palabras temporalmente
			word = '';
			for(x=0;x<Zahlen[i].length;x++){
				word += c(Zahlen[i][x]);
			}
			txt.innerHTML = txt.innerHTML.replace(word,eval("gid"+Cid[i]));
		}
		txt.innerHTML = txt.innerHTML.replace(chM,Metal,'g');
		txt.innerHTML = txt.innerHTML.replace(chC,Crystal,'g');
		txt.innerHTML = txt.innerHTML.replace(chD,Deuterium,'g');
		txt.innerHTML = txt.innerHTML.replace(chE,Energy,'g');
}
//CharShortFunction
//Permite crear un caracter a partir del codigo decimal
function c(n){
	return String.fromCharCode(n);
}
//Resources in topnav
//Solo cambia los textos de los recursos hubicados en la parte superior.
//Por suerte, la extructura de las paginas no cambian
function resourse(){
	var tds = document.getElementsByTagName('td');
	tds[12].getElementsByTagName('font')[0].innerHTML = Metal;
	tds[13].getElementsByTagName('font')[0].innerHTML = Crystal;
	tds[14].getElementsByTagName('font')[0].innerHTML = Deuterium;
	tds[15].getElementsByTagName('font')[0].innerHTML = Energy;
}
//Start Function
//Aca es donde inicia el codigo a traducir
(function(){
	var hrefer = self.location.href;
	if(OgameCN_lang=='cn') return;
	//Lets start!
	if(hrefer.indexOf('leftmenu.php')!=-1){
	var a = document.getElementsByTagName('a');
	for (var i = a.length - 1; i >= 0; i--) {
		//UUURRGHHH
		if(a[i].href.indexOf('overview')!=-1) {
			a[i].innerHTML = Overview;
		}else
		if(a[i].href.indexOf('imperium.php')!=-1){
			a[i].innerHTML = Imperium;
		}else
		if(a[i].href.indexOf('b_building.php')!=-1){
			a[i].innerHTML = Buildings;
		}else
		if(a[i].href.indexOf('resources.php')!=-1){
			a[i].innerHTML = Resources;
		}else
		if(a[i].href.indexOf('buildings.php')!=-1&&a[i].href.indexOf('&mode=Forschung')!=-1){
			a[i].innerHTML = Research;
		}else
		if(a[i].href.indexOf('buildings.php')!=-1&&a[i].href.indexOf('&mode=Flotte')!=-1){
			a[i].innerHTML = Shipyard;
		}else
		if(a[i].href.indexOf('flotten1.php')!=-1&&a[i].href.indexOf('&mode=Flotte')!=-1){
			a[i].innerHTML = Fleet;
		}else
		if(a[i].href.indexOf('techtree.php')!=-1){
			a[i].innerHTML = Technology;
		}else
		if(a[i].href.indexOf('galaxy.php')!=-1){
			a[i].innerHTML = Galaxy;
		}else
		if(a[i].href.indexOf('buildings.php')!=-1&&a[i].href.indexOf('&mode=Verteidigung')!=-1){
			a[i].innerHTML = Defence;
		}else
		if(a[i].href.indexOf('allianzen.php')!=-1){
			a[i].innerHTML = Alliance;
		}else
		if(a[i].href.indexOf('http://board.ogame.com.cn/')!=-1){
		  a[i].innerHTML = Board;
			a[i].parentNode.innerHTML += " <a href=\""+a[i].href+"\" target=\"Hauptframe\">&gt;</a>";
		}else
		if(a[i].href.indexOf('stat.php')!=-1){
			a[i].innerHTML = Statistics;
		}else
		if(a[i].href.indexOf('suche.php')!=-1){
			a[i].innerHTML = Search;
		}else
		if(a[i].href.indexOf('tutorial.ogame.de')!=-1){
			a[i].innerHTML = Help;
		}else
		if(a[i].href.indexOf('messages.php')!=-1){
			a[i].innerHTML = Messages;
		}else
		if(a[i].href.indexOf('leftmenu.php')!=-1){
			a[i].innerHTML = Notes;
			//a[i].parentNode.innerHTML += " <a href=\""+a[i].getAttribute('onclick').substring(9,41)+"\" target=\"Hauptframe\">&gt;</a>";
		}else
		if(a[i].href.indexOf('buddy.php')!=-1){
			a[i].innerHTML = Buddylist;
		}else
		if(a[i].href.indexOf('options.php')!=-1){
			a[i].innerHTML = Options;
		}else
		if(a[i].href.indexOf('logout.php')!=-1){
			a[i].style.color="rgb(255,0,0)";
			a[i].innerHTML = Logout;
		}else
		if(a[i].href.indexOf('go=rules&lang=cn')!=-1){
			a[i].innerHTML = Rules;
		}else
		if(a[i].href.indexOf('go=contact&lang=cn')!=-1){
			a[i].innerHTML = Legal_Notice;
		}
	}
	}else
	if(hrefer.indexOf('techtree.php')!=-1){
		resourse();
		/* no sirve mas, se utiliza Zahlen para traducir los textos
		var a = document.getElementsByTagName('a');
		for (var i = a.length - 1; i >= 0; i--) {
			if(a[i].href.indexOf('infos.php')!=-1){
				change_links(a[i]);
			}
		}*/
		//... Esto es enteramente manual... xP		
		var tdtg = document.getElementsByTagName('td');
		tdtg[23].innerHTML = Buildings;
		tdtg[24].innerHTML = Requirements;
		tdtg[53].innerHTML = Research;
		tdtg[54].innerHTML = Requirements;
		tdtg[85].innerHTML = Ships;
		tdtg[86].innerHTML = Requirements;
		tdtg[113].innerHTML = Defence;
		tdtg[114].innerHTML = Requirements;
		tdtg[135].innerHTML = Lunar_Buildings;
		tdtg[136].innerHTML = Requirements;
		//Traduce todo el texto
		txt = document.body.innerHTML
		for(i=0;i<Zahlen.length;i++){
			//Armamos las palabras temporalmente
			word = '';
			for(x=0;x<Zahlen[i].length;x++){
				word += c(Zahlen[i][x]);
			}
			txt = txt.replace(word,eval("gid"+Cid[i]),'g');
		}
		txt = txt.replace(chM,Metal,'g');
		txt = txt.replace(chC,Crystal,'g');
		txt = txt.replace(chD,Deuterium,'g');
		txt = txt.replace(chE,Energy,'g');
		txt = txt.replace(c(31561)+c(32423),level,'g');
		document.body.innerHTML = txt;
		
	}else
	if(hrefer.indexOf('b_building.php')!=-1||hrefer.indexOf('buildings.php')!=-1){
		resourse();
		var a = document.getElementsByTagName('a');
		for (var i = a.length - 1; i >= 0; i--) {
			if(a[i].href.indexOf('infos.php')!=-1&&a[i].innerHTML.indexOf('<img')==-1){
				change_links(a[i]);
			}else
			if(a[i].href.indexOf('b_building.php')!=-1&&a[i].href.indexOf('bau')!=-1&&a[i].href.indexOf('unbau')==-1){
			  var font = a[i].getElementsByTagName('font')[0];
			  if(font.innerHTML.length!=4){
				font.innerHTML = Upgrade+"<br>"+level+ font.innerHTML.substr(9);
				}else{font.innerHTML = Build;}
			}else
			if(a[i].href.indexOf('buildings.php')!=-1&&a[i].href.indexOf('bau')!=-1&&a[i].href.indexOf('unbau')==-1){
			  var font = a[i].getElementsByTagName('font')[0];
			  if(font.innerHTML.length!=4){
				font.innerHTML = Upgrade+"<br>"+level+ font.innerHTML.substr(9);
				}else{font.innerHTML = Investigate;}
		  }
		}
		//A pedido de LoLaZo, se muestra el tiempo de construccion y los recursos
		var td = document.getElementsByTagName('td');
		for (var i = td.length - 1; i >= 0; i--) {
			if(td[i].innerHTML.indexOf(c(38656)+c(35201))!=-1){
				//Nivel
				td[i].innerHTML = td[i].innerHTML.replace('('+c(31561)+c(32423)+' ','('+level+' ');
				//Recursos
				td[i].innerHTML = td[i].innerHTML.replace(chM+':',Metal+':');
				td[i].innerHTML = td[i].innerHTML.replace(chC+':',Crystal+':');
				td[i].innerHTML = td[i].innerHTML.replace(chD+':',Deuterium+':');
				td[i].innerHTML = td[i].innerHTML.replace(chE+':',Energy+':');
				//Tiempo
				td[i].innerHTML = td[i].innerHTML.replace(c(24314)+c(36896)+c(26102)+c(38388)+c(65306),Time+': ');
				td[i].innerHTML = td[i].innerHTML.replace(c(38656)+c(35201)+c(65306),Requires+': ');
				td[i].innerHTML = td[i].innerHTML.replace(c(65533),dTime);
				td[i].innerHTML = td[i].innerHTML.replace(c(23567)+c(26102),hTime);
				td[i].innerHTML = td[i].innerHTML.replace(c(20998)+c(38047),mTime);
				td[i].innerHTML = td[i].innerHTML.replace(c(31186),sTime);
			}
		}
	}else
	if(hrefer.indexOf('overview.php')!=-1){
		resourse();
		var a = document.getElementsByTagName('a');
		for (var i = a.length - 1; i >= 0; i--) {
			if(a[i].href.indexOf('renameplanet.php')!=-1){
				a[i].innerHTML = Planet + a[i].innerHTML.substr(2);
				a[i].title = Planet_menu;
			}
		}
		//Coloreado vision general cortesia de http://userscripts.org/scripts/show/2541
		var lng_rownattack = 'return ownattack';
		var lng_rownespionage = 'return ownespionage';
		var lng_owntransport = 'flight owntransport';
		var lng_rowntransport = 'return owntransport';
		var lng_ftransport = 'flight transport';
		
		var publi = document.getElementsByTagName('span');
		for (var i = publi.length - 1; i >= 0; i--){
			if( publi[i].className == lng_rownattack){
				publi[i].style.color="rgb(0,136,0)";
				publi[i].getElementsByTagName('a')[0].innerHTML = Attack;
			}
			if( publi[i].className == lng_rownespionage){
				publi[i].style.color="rgb(176,138,0)";
				publi[i].getElementsByTagName('a')[0].innerHTML = Spy;
			}
			if( publi[i].className == lng_owntransport){
				publi[i].style.color="rgb(71,163,237)";
				publi[i].getElementsByTagName('a')[0].innerHTML = Transport;
			}
			if( publi[i].className == lng_rowntransport){
				publi[i].style.color="rgb(18,114,192)";
				publi[i].getElementsByTagName('a')[0].innerHTML = Transport;
			}
			if( publi[i].className == lng_ftransport){
				publi[i].style.color="rgb(9,187,116)";
				publi[i].getElementsByTagName('a')[0].innerHTML = Transport;
			}
		}
	}else
	if(hrefer.indexOf('renameplanet.php')!=-1){
		resourse();
	}else
	if(hrefer.indexOf('resources.php')!=-1){
		resourse();
	}else
	if(hrefer.indexOf('flotten1.php')!=-1){
		resourse();
		var a = document.getElementsByTagName('a');
		for (var i = a.length - 1; i >= 0; i--) {
			if(a[i].href.indexOf('noShips();')!=-1){
				a[i].innerHTML = No_ships;
			}else
			if(a[i].href.indexOf('maxShips()')!=-1){
				a[i].innerHTML = All_ships;
			}else
			if(a[i].href.indexOf('maxShip(\'')!=-1){
			  var numb = a[i].href.indexOf('\')');
			  var nShip = a[i].href.substring(numb,numb-3);
				a[i].innerHTML = maxShip;
				var aParent = a[i].parentNode.parentNode.getElementsByTagName('th')[0];
				aParent.getElementsByTagName('a')[0].innerHTML = eval('gid'+nShip);
			}
		}
	}else
	if(hrefer.indexOf('flotten2.php')!=-1){
		resourse();
		var option = document.getElementsByTagName('select')[1].getElementsByTagName('option');
		for (var i = option.length - 1; i >= 0; i--) {
			if(option[i].value==1){
        option[i].innerHTML = Planet;
			}else
			if(option[i].value==2){
				option[i].innerHTML = Moon;
			}else
			if(option[i].value==3){
				option[i].innerHTML = Debris;
			}
		}
	}else
	if(hrefer.indexOf('flotten3.php')!=-1){
		resourse();
  	var input = document.getElementsByTagName('input');
    for (var i = input.length - 1; i >= 0; i--) {
      if(input[i].type=="radio"){
			  var dataNode = input[i].parentNode.childNodes[2];
			  if(input[i].value==1){
          dataNode.data = Attack;
			  }else if(input[i].value==3){
			    dataNode.data = Transport;
			  }else if(input[i].value==4){
			    dataNode.data = Move;
			  }else if(input[i].value==5){
			    dataNode.data = Fleet_Position;
			  }else if(input[i].value==6){
			    dataNode.data = Spy;
			  }else if(input[i].value==8){
			    dataNode.data = Harvest;
        }else if(input[i].value==9){
			    dataNode.data = Destroy;
        }
			}
		}
		var a = document.getElementsByTagName('a');
		for (var i = a.length - 1; i >= 0; i--) {
			if(a[i].href.indexOf('maxResources()')!=-1){
				a[i].innerHTML = Max_resources;
			}
		}
	}else
	if(hrefer.indexOf('options.php')!=-1){
		resourse();
		
	}else
	if(hrefer.indexOf('buddy.php')!=-1){
		resourse();
	}else
	if(hrefer.indexOf('messages.php')!=-1){
		resourse();
		var option = document.getElementsByTagName('option');
		for (var i = option.length - 1; i >= 0; i--) {
			if(option[i].value=='deleteall'){
				option[i].innerHTML = Delete_All;
			}else if(option[i].value=='deleteallshown'){
				option[i].innerHTML = Delete_All_Shown;
			}else if(option[i].value=='deletenonmarked'){
				option[i].innerHTML = Delete_Non_Marked;
			}else if(option[i].value=='deletemarked'){
				option[i].innerHTML = Delete_Marked;
			}
		}

		var obj = document.getElementsByTagName('td');
		for (var i = obj.length - 1; i >= 0; i--) {
			if(obj[i].innerHTML.indexOf(c(19968)+c(38431)+c(32)+c(22806)+c(26469)+c(30340)+c(32)+c(33328)+c(38431)+c(20174)+c(26143)+c(29699))!=-1){
				text = obj[i].innerHTML;
				text = text.replace(c(19968)+c(38431)+c(32)+c(22806)+c(26469)+c(30340)+c(32)+c(33328)+c(38431)+c(20174)+c(26143)+c(29699),ARowExternalFleet);//Una flota enemigo del planeta
				text = text.replace(c(34987)+c(30417)+c(27979)+c(21040)+c(38752)+c(36817)+c(20320)+c(30340)+c(26143)+c(29699),IsApproaches);//ha sido detectada cerca de tu planeta
				text = text.replace(c(21453)+c(25506)+c(27979)+c(27963)+c(21160)+c(26426)+c(29575)+c(58),SpyPorcent+': ');//Oportunidad para defenderse del espionaje:
				obj[i].innerHTML = text;
			}else
			if(obj[i].innerHTML.indexOf(c(20320)+c(30340)+c(19968)+c(38431)+c(33328)+c(38431))!=-1){
			  translate(obj[i]);
				text = obj[i].innerHTML;
				text = text.replace(c(20320)+c(30340)+c(19968)+c(38431)+c(33328)+c(38431),YourFleet);//Una de tus flotas
				text = text.replace(c(26469)+c(33258),ComeFrom);//vuelve de
				text = text.replace(c(22238)+c(21040),Returns);//a
				text = text.replace(c(33328)+c(38431)+c(36820)+c(22238)+c(65292)+c(20294)+c(27809)+c(26377)+c(20219)+c(20309)+c(36135)+c(29289)+c(46),ReturnWithoutResources);//La flota ha vuelto sin traer recursos.
				obj[i].innerHTML = text;
			}
			if(obj[i].innerHTML.indexOf(c(32852)+c(30431)+c(36890)+c(30693)+c(20320)+c(65306)) != -1) {
				//obj[i].style.backgroundColor="rgb(20,170,0)";
				obj[i].innerHTML = obj[i].innerHTML.replace(c(32852)+c(30431)+c(36890)+c(30693)+c(20320)+c(65306),':','g');
			}
			
		}
		//Coloreado en mensages by http://userscripts.org/scripts/show/2541
		var publi = document.getElementsByTagName ('th');
		
		var comander= 'Comandante';
		var regex1 = /gratis/gi;			//para poder ver la publicidad , si ofrecen el modo comanante gratis por X dias.
		var lng_battle= 'batalla'; 			// para detectar informes de batalla
		var lng_control= c(22826)+c(31354)+c(30417)+c(25511);//Control del espacio
		var lng_return = c(33328)+c(38431)+c(36820)+c(22238);//Retorno de una flota
		var lng_arrive = c(31227)+c(27665);//Llegada a un planeta
		var lng_spy = c(31354)+c(38388)+c(25506)+c(27979);//Accion de espionaje
		var lng_fleet = c(33328)+c(38431)+c(21629)+c(20196);//Ordenes de la flota
		var lng_ally = c(25776)+c(20889)+c(32676)+c(32452)+c(20449)+c(20214)+c(32)+c(20320)+c(30340)+c(32852)+c(30431);
		var lng_round = Circular_message; 			// resumir el mensage "circular de la alianza XXX por este
		var lng_rownattack = 'return ownattack';
		var lng_rownespionage = 'return ownespionage';
		var lng_owntransport = 'flight owntransport';
		var lng_rowntransport = 'return owntransport';
		var lng_ftransport = 'flight transport';
		
		var regex3= /<[^>]*>/g;
		var regex2= '<span class="combatreport">';
		var tempooo='';
		var htmldentro;
		var htmldentroanterior;
		var ataque = 0;
		var temp3 = new Array();
		var temp2;
		var bol1;
		var bol2;
		var bol3;
		var ataque;
		var temp5;
		var temp6;
		var temp7;
		var primero;
		var segundo;
		
		for (var i = publi.length - 1; i >= 0; i--) {
			htmldentro = publi[i].innerHTML;
			
			if( htmldentro.indexOf(regex2) != -1 && htmldentro.indexOf(lng_battle) != -1  ) {
				tempooo = htmldentro;				
				htmldentro = htmldentro.replace(regex3, "");
				temp2 = htmldentro.substring((htmldentro.lastIndexOf('(') +1 ),(htmldentro.length -2));
				temp3 = temp2.split(',');
				temp6 = temp3[0];
				temp7 = temp3[1];
				primero = 1* temp6.substring(2,temp6.length);
				segundo = 1* temp7.substring(2,temp7.length); 
				ataque = false;
				bol1= false;
				bol2 = false;
				bol3 = (segundo == 0);
				bol1 = (primero - segundo) > 10000;
				bol2 = (primero - segundo) < -10000;
				htmldentroanterior = publi[i-1].innerHTML;
				ataque = htmldentroanterior.search(lng_control) != -1;
			        if ((bol1 && ataque) || ( bol2 && !(ataque)) ){
					tempooo = tempooo.replace(regex2, "<span style=\"color: rgb(235,50,50);\">");
				} else if ((bol3 && !(ataque))||(bol2 && ataque) || (bol1 && !(ataque))) {
					tempooo = tempooo.replace(regex2, "<span style=\"color: rgb(94,204,126);\">");
				} else {
					tempooo = tempooo.replace(regex2, "<span style=\"color: rgb(234,221,64);\">");
				}
				publi[i].innerHTML = tempooo; 
			} 

			if( (htmldentro.indexOf(lng_return) != -1 )) {
				publi[i].style.color="rgb(86,52,248)";
				publi[i].innerHTML = Fleet_Return;
			}
			
			if(htmldentro.indexOf(lng_spy) != -1) {
				publi[i].style.color="rgb(242,204,74)";
				publi[i].innerHTML = Spy_Alert;
			}

			if(htmldentro.search(lng_control) != -1 ) {
				publi[i].style.color="rgb(255,62,62)";
				publi[i].innerHTML = Space_Control;
			}
			if(htmldentro.search(lng_fleet) != -1 || (htmldentro.indexOf(lng_arrive) != -1 )) {
				publi[i].style.color="rgb(101,216,118)";
				publi[i].innerHTML = Fleet_Order;
			}
				
			if(htmldentro.search(lng_ally) != -1 ) {
				publi[i].style.color="rgb(72,227,204)";
				publi[i].innerHTML = lng_round ;//+ publi[i].innerHTML.substr(11)
			}else
			if(htmldentro.indexOf(c(32852)+c(30431)+' [') != -1){
				publi[i].innerHTML = Alliance + publi[i].innerHTML.substr(2);
			}
			//ally =
			if(htmldentro.indexOf('betreff=Re:') != -1) {
				publi[i].style.color="rgb(170,170,0)";
			}
			if(htmldentro.indexOf('betreff=Re:') != -1) {
				publi[i].style.color="rgb(170,170,0)";
			}
			if(htmldentro.indexOf(c(27542)+c(27665)+c(25253)+c(21578)) != -1) {
				publi[i].style.color="rgb(100,100,170)";
				publi[i].innerHTML = 'Colonize Report';
			}
			if(htmldentro.indexOf(c(21040, 36798, 26143, 29699)) != -1) {
				publi[i].style.color="rgb(170,100,100)";
				publi[i].innerHTML = 'Planet Arrives';
			}
			
		}
		//Opcion de no mostrar reportes
		document.getElementsByName('fullreports')[0].parentNode.childNodes[1].data = Spy_Compact;
		ReportsTranslate('td');
	}else
	if(hrefer.indexOf('suche.php')!=-1){
		resourse();
		var option = document.getElementsByTagName('option');
		for (var i = option.length - 1; i >= 0; i--) {
			if(option[i].value=='playername'){
				option[i].innerHTML = playername;
			}else if(option[i].value=='planetname'){
				option[i].innerHTML = planetname;
			}else if(option[i].value=='allytag'){
				option[i].innerHTML = allytag;
			}else if(option[i].value=='allyname'){
				option[i].innerHTML = allyname;
			}
		}
	}else
	if(hrefer.indexOf('stat.php')!=-1){
		resourse();
		var option = document.getElementsByTagName('option');
		for (var i = option.length - 1; i >= 0; i--) {
			if(option[i].value=='player'){
				option[i].innerHTML = Players;
			}else if(option[i].value=='ally'){
				option[i].innerHTML = Alliance;
			}else if(option[i].value=='pts'){
				option[i].innerHTML = Points;
			}else if(option[i].value=='flt'){
				option[i].innerHTML = Fleet;
			}else if(option[i].value=='res'){
				option[i].innerHTML = Research;
			}
		}
	}else
	if(hrefer.indexOf('changelog.php')!=-1){
		resourse();
		var td = document.getElementsByTagName('td');
		td[23].innerHTML = Version;
		td[24].innerHTML = Description;

	}else
	if(hrefer.indexOf('bericht.php')!=-1){
		var text = document.body.innerHTML;
		if(text.indexOf(c(36164)+c(28304)+c(22312)+' ') != -1 && text.indexOf('%') != -1 ){
			ReportsTranslate('td');
		}else if(text.indexOf(c(36827)+c(25915)+c(32773))!=-1){
			//, , 
			txt = document.body.innerHTML
			for(i=0;i<Zahlen.length;i++){
				//Armamos las palabras temporalmente
				word = '';
				for(x=0;x<Zahlen[i].length;x++){
					word += c(Zahlen[i][x]);
				}
				txt = txt.replace(word,eval("gid"+Cid[i]),'g');
			}
			txt = txt.replace(chM,Metal,'g');
			txt = txt.replace(chC,Crystal,'g');
			txt = txt.replace(chD,Deuterium,'g');
			txt = txt.replace(chE,Energy,'g');
			//txt = txt.replace(c(21644),',','g');
			txt = txt.replace(c(27494)+c(22120),'Weapons','g');
			txt = txt.replace(c(38450)+c(25252)+c(30462),Defence,'g');
			txt = txt.replace(c(38450)+c(25252)+c(30462),Defence,'g');
			txt = txt.replace(c(25252)+c(22771),'Shield','g');
			txt = txt.replace(c(22806)+c(22771),'Shield','g');
			txt = txt.replace(c(25968)+c(30446),Number,'g');
			txt = txt.replace(c(31561)+c(32423),level,'g');
			txt = txt.replace(c(36827)+c(25915)+c(32773),'Attacker','g');
			txt = txt.replace(c(38450)+c(24481)+c(32773),'Defenser','g');
			txt = txt.replace(c(19968)+c(20849)+c(25439)+c(22833)+c(20102),'Altogether lost','g');
			txt = txt.replace(c(21333)+c(20301),'Unit','g');
			txt = txt.replace(c(21644),',','g');
			txt = txt.replace(c(22312)+c(36825)+c(20010)+c(31354)+c(38388)+c(22352)+c(26631)+c(19978)+c(26377),'Defris has in this space coordinates','g');
			txt = txt.replace(c(31867)+c(22411),'Type','g');
			txt = txt.replace(c(25703)+c(27585),'Destroys','g');
			txt = txt.replace(c(36194)+c(24471)+c(20102)+c(36825)+c(27425)+c(25112)+c(24441),' Has won this campaign','g');
			txt = txt.replace(c(20182)+c(25504)+c(21462)+c(20102),'He grasped','g');
			txt = txt.replace(c(20934)+c(22791)+c(36827)+c(20837)+c(25112)+c(26007)+c(65306),'The preparation enters the fight','g');
			txt = txt.replace(c(19979)+c(21015)+c(30340)+c(33328)+c(38431)+c(20114)+c(30456)+c(23545)+c(31435),'The following fleet opposes','g');
			//txt = txt.replace(c(21644),',','g');
			document.body.innerHTML = txt;
			//ReportsTranslate('th',true);
		}


	}
})();//Enjoy! (?L???`)

// Created by Perberos. All rights reversed (C) 2006