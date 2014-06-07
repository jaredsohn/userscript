// ==UserScript==
// @name           Pennergame Lets fight suche und Autoversenden von pm nachrichten 
// @namespace      Bastis lets fight gegner suche mit pm aufforderung by basti1012  (http://pennerhack.foren-city.de).version 6 Ueberarbeitet von NewMan (http://ego-shooters.net)
// @description    Sucht gegner in deinen Punktebereich und und fordert sie per pm zum fight auf.Man muss nur noch seinen text zum auffordern des kampfes eingeben dann such geschwindigkeit und der rest macht das Script fuer euch.
// @include        http://*pennergame.de/overview/*
// @include        http://*berlin.pennergame.de/overview/*
// @include        http://*menelgame.pl/overview/*
// @include        http://*dossergame.co.uk/overview/*
// ==/UserScript==

var content = document.getElementById('content');
var mytable = document.createElement('table');
mytable.innerHTML = "<span style='font-size:medium'><b>Lets Fight Gegner suche</b></span>";
content.appendChild(mytable);

var mytra = document.createElement('tr');
mytra.innerHTML = "<hr><span style='font-size:small'><u>Start:</u></span><input type='button' id ='suchestart' value='Start'><span style='font-size:small'><u>Stopp:</u></span><input type='button' id ='suchestopp' value='Stopp'><br>Start oder Stopp um die Suche zu steuern";
mytable.appendChild(mytra);

var mytr0 = document.createElement('tr');
mytr0.innerHTML = "<span style='font-size:small'><u>Id Start:</u></span><input type='text' value='"+GM_getValue("vonr")+"' id = 'auswahl' size='10'><input type='button' name ='suche' value='Suchen'><br>Id Eingeben und start klicken um Anfangs Id zu &auml;ndern";
mytable.appendChild(mytr0);

var mytr41 = document.createElement('tr');
mytr41.innerHTML = "<span style='font-size:small'><u>Relod Time:</u></span><input type='text' value='"+GM_getValue("azztime")+"' id ='namea' size='10'><input type='button' id ='idklick' value='save'><br>Sekunden x 1000 Eingeben um Schneller zu suchen.";
mytable.appendChild(mytr41);

var mytrb = document.createElement('tr');
mytrb.innerHTML = "<hr>";
mytable.appendChild(mytrb);

var mytr1 = document.createElement('tr');
mytr1.innerHTML = "<span style='float:right; font-size:small'>Name:</span>";
mytable.appendChild(mytr1);

var mytd1 = document.createElement('td');
mytr1.appendChild(mytd1);

var mytr2 = document.createElement('tr');
mytr2.innerHTML = "<span style='float:right; font-size:small'>Punkte Api:</span>";
mytable.appendChild(mytr2);

var mytd2 = document.createElement('td');
mytr2.appendChild(mytd2);

var mytr4 = document.createElement('tr');
mytr4.innerHTML = "<span style='float:right; font-size:small'>Geld:</span>";
mytable.appendChild(mytr4);

var mytd4 = document.createElement('td');
mytr4.appendChild(mytd4);

var mytr5 = document.createElement('tr');
mytr5.innerHTML = "<span style='float:right; font-size:small'>Bande:</span>";
mytable.appendChild(mytr5);

var mytd5 = document.createElement('td');
mytr5.appendChild(mytd5);

var mytr6 = document.createElement('tr');
mytr6.innerHTML = "<span style='float:right; font-size:small'>ID:</span>";
mytable.appendChild(mytr6);

var mytd6 = document.createElement('td');
mytr6.appendChild(mytd6);

var mytr7 = document.createElement('tr');
mytr7.innerHTML = "<span style='float:right; font-size:small'>Nachrichten gesendet:</span>";
mytable.appendChild(mytr7);

var mytd7 = document.createElement('td');
mytr7.appendChild(mytd7);

var mytr8 = document.createElement('tr');
mytr8.innerHTML = "<span style='float:right; font-size:small'>Meine Punkte:</span>";
mytable.appendChild(mytr8);

var mytd8 = document.createElement('td');
mytr8.appendChild(mytd8);

var mytr9 = document.createElement('tr');
mytr9.innerHTML = "<span style='float:right; font-size:small'>Min Punkte:</span>";
mytable.appendChild(mytr9);

var mytd9 = document.createElement('td');
mytr9.appendChild(mytd9);

var mytr10 = document.createElement('tr');
mytr10.innerHTML = "<span style='float:right; font-size:small'>Max Punkte:</span>";
mytable.appendChild(mytr10);

var mytd10 = document.createElement('td');
mytr10.appendChild(mytd10);

var mytr11 = document.createElement('tr');
mytr11.innerHTML = "<span style='float:right; font-size:small'>Promille:</span>";
mytable.appendChild(mytr11);

var mytd11 = document.createElement('td');
mytr11.appendChild(mytd11);

var mytr12 = document.createElement('tr');
mytr12.innerHTML = 'Betreff eingeben:<br><textarea rows="1" cols="20" id="textbetreff">'+GM_getValue("betreff")+'</textarea>';
mytable.appendChild(mytr12);


var mytr13 = document.createElement('tr');
mytr13.innerHTML = 'Nachricht Eingeben:<br><textarea rows="5" cols="50" id="texttext">'+GM_getValue("text")+'</textarea>';
mytable.appendChild(mytr13);


var mytr14 = document.createElement('tr');
mytr14.innerHTML = "<span style='font-size:small'><u>Nachrichten Text Speichern:</u></span><input type='button' name ='textbutton' value='Speichern'><br>";
mytable.appendChild(mytr14);


var mytr15 = document.createElement('tr');
mytr15.innerHTML = '<form name="formel"><input type=checkbox name=a><br>1<input type=radio name=b><br>2<input type=radio name=b><br><input type=button value="Test" onClick="test()"></form>';
mytable.appendChild(mytr15);

//###########################  suche an aus ######################################################


document.getElementById('suchestart').addEventListener('click', function stopp() {
alert("suche an");
}, false);

document.getElementById('suchestopp').addEventListener('click', function stopp() {
alert("suche an");
}, false);

//der start geht weil das false ganz unten ist aber stopp geht nicht ist ja auch klar
// habe alle versucht mkit check boxen mit buttons weis aber nicht wie das geht 
// alles was ich versucht habe und versucht habe aus anderen scripten abzukucken
// geht irgendwie nicht oder passt nicht hier zu .
// zb check box immer wen ich anklick ist sie an egal ob an oder aus ist ist immer an
// kriege ich nicht aus.
// dasw hier jetzt kriege ich auch nur an aber nichzt mehr aus.
// das false von den start ist ganz unten zu finden.

// EDIT habe das false gerade hochgeholt weil sonst bei neu instalation keine werte da sind

// ######################  location afrage welche stadt gesucht wird ############################

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var pgurl = 'http://berlin.pennergame.de/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
var pgurl = 'http://www.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var pgurl = 'http://dossergame.co.uk/';
};

// ################# speichern ##################################

var gesend = GM_getValue("gesend");
if (gesend == null){gesend = 1;};

var azztime = GM_getValue("azztime");
if (azztime == null){azztime = "6000000";};

var vonr = GM_getValue("vonr");
if (vonr == null){vonr = 1;};

// ########################################### betreff speichern und betreff standart text##########
var betreff = GM_getValue("betreff");
if (betreff == null){
betreff = "Bitte Angreifen Danke";
GM_setValue("betreff" , betreff);
};
// ######################################### text speichern und standart text #####################
var text = GM_getValue("text");
if (text == null){
text = "Habe dich durch das Lets Fight Gegner suche Script gefunden,du liegst in meinen Punktebereich und könntest mich Runterfighten.Also wenn du lust und Zeit hast Fighte mich bitte runter Danke.(Das Script ist Geil solltest du dir auch holen zum Gegner suchen ,sehr zu empfehlen.) mfg ich";
GM_setValue("text" , text);
};

// ###################### min max eigener punktestand abfragen#################################

GM_xmlhttpRequest({
	method:"GET",
	url: ''+pgurl+'/fight/overview/',
   	onload:function(responseDetails) {
     	content = responseDetails.responseText;
      	ziea = content.split('Dein Ziel muss ')[1];
       	mins = ziea.split('bis ')[0];
        ziec = content.split('bis ')[1];
        maxs = ziec.split('Punkte haben.')[0];
        mypoints = Math.round(mins*1.25)// original punkte von mir
mytd9.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:green; font-size:100%;\"><b>" + mins + "</b></span></span>";
mytd10.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:red; font-size:100%;\"><b>" + maxs + "</b></span></span>";
mytd8.innerHTML = "<span style='float:left; font-size:small'><span style=\"color:yellow; font-size:100%;\"><b>" + mypoints + "</b></span></span>";
		start();
	}
});
//##################### abfrage der ganzen lets fight werte #####################################

var save;
function suchen(){
	save = 0;
	vonr++;
	GM_setValue("vonr",vonr);
	mytd6.innerHTML = "<span style='float:left; font-size:small'>" + vonr + "</span>";
	
	// afrage der werte die man bei lets fight brauch ####
	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+pgurl+'/dev/api/user.'+vonr+'.xml',
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			ausgabe(dom);
		}
	});
}
function ausgabe(dom){
	try{
		var band1 = dom.getElementsByTagName('name')[1].textContent;
		mytd5.innerHTML = "<span style='float:left; font-size:small'>" + band1 + "</span>";
	
		var points1 = dom.getElementsByTagName('points')[0].textContent;
		mytd2.innerHTML = "<span style='float:left; font-size:small'>" + points1 + "</span>";
	
		var name1 = dom.getElementsByTagName('name')[0].textContent;
		var id = dom.getElementsByTagName('id')[0].textContent;
		mytd1.innerHTML = "<a style='font-size:small' href='http://www.pennergame.de/profil/id:" + id + "/'>" + name1 + "</a><a href='http://www.pennergame.de/fight/?to=" + name1 + "'><img src='http://media.pennergame.de/img/att.gif' border='0'></img></a><a href='http://www.pennergame.de/messages/write/?to=" + id + "'><img src='http://media.pennergame.de/img/overview/new_msg.gif' border='0'></img></a>";
	}catch(e){
		mytd1.innerHTML = "<span style='float:left; font-size:small'>Spieler geloescht</span>";
		mytd2.innerHTML = "<span style='float:left; font-size:small'>Spieler geloescht</span>";
		mytd5.innerHTML = "<span style='float:left; font-size:small'>Spieler geloescht</span>";
	}
	try{
		var cash1 = dom.getElementsByTagName('cash')[0].textContent / 100;
		mytd4.innerHTML = "<span style='float:left; font-size:small'>" + cash1 + "&euro</span>";
	
		var promille = "<div style='overflow: hidden; width: 40px; height: 15px;'><img style='position: relative; top: -40px; left: -120px;' src='http://img.pennergame.de/cache/de_DE/signaturen/" + id + ".jpg'></div>";
		mytd11.innerHTML = "<span style='float:left; font-size:small'>" +  promille + "</span>"; 
	}catch(e){
		mytd4.innerHTML = "<span style='float:left; font-size:small'> no cash </span>";
		mytd11.innerHTML = "<span style='float:left; font-size:small'> no promille </span>";
	}
// ##################### if abfrage alle buttons senden und cvo ###################################

mytd7.innerHTML = "<span style='float:left; font-size:small'>" + gesend + "</span>";
	if(points1<=Number(maxs) && points1>=Number(mins)) {
		var box=window.confirm("Name : "+name1+" \nGeld : "+cash1+" Euros\nPunkte : "+points1+" \nBande : "+band1+" \nUm eine Kampf aufforderung zu schicken\n klicke auf OK oder klicke Abrechen f&uuml;r Weitersuchen\n mfg Basti");
	  	if(box==true){
			senden(pgurl, vonr);
					
		} 
	} 
}

function start(){// Diese Funktion wird erst aufgerufen wenn der erste Request fertig ist somit stehen die Variablen dann auch zur verf?gen. Andernfalls w?rde der Request und die Funktion senden sofort ausgef?hrt werden und mins sowie maxs noch garnicht existieren.
//############################ relod  auswal button einstellu7ngen #############################

	document.getElementById('idklick').addEventListener('click', function idklicker() {
		var azztime = document.getElementById('namea').value;
		GM_setValue("azztime", azztime);
		blbl = Math.round(3600000/azztime)
		alert("du hast "+azztime+" ausgeesucht das sind ca "+blbl+" penner in der stunde die durch gescannt werden");
		location.reload();
	},false);
	
// #######################  speichern text betreff button##########################################
	
	document.getElementsByName('textbutton')[0].addEventListener('click', function start() {
		var betreff = document.getElementById('textbetreff').value;
		
		GM_setValue("betreff" , betreff);

		var text = document.getElementById('texttext').value;

GM_setValue("text" , text);

		location.reload();
		alert("Deine Gegner kriegt nunb Folgtenen text von dir zu geschickt\n Betreff:\n\n ("+betreff+")\nDein Nachrichten text :\n "+text+" \nMfg Basti1012\nBei fragen und Probleme bin ich in meinen Forum zu finden\nhttp://pennerhack.foren-city.de");
	}, false);


	
// #######################  id direkt wahl button ##########################################
	
	document.getElementsByName('suche')[0].addEventListener('click', function start() {
		var vonr = document.getElementById('auswahl').value;
		
		GM_setValue("vonr" , vonr);
		location.reload();
		alert("Deine neue Angabe ("+vonr+")ist als neue Start ID Festgesetzt worden.\nUm wieder von vorne Anfangen zu k?nnen gebe einfach neue Start ID an.\nMfg Basti1012\nDieses ist noch eine Test Version \nUm m?glichst schnell eine Vollversion zu erhalten helft mir Bitte um dieses Programm zu Moderniesieren und Fehler zu finden \n\nhttp://pennerhack.foren-city.de");
	}, false);
	
	
// ######################### innterwall ############################################
	var abcd = GM_getValue("azztime");
	window.setInterval(suchen, abcd);
}
// #########################  funktion sms versenden ############################################

function senden(pgurl, vonr){
	gesend++;
	GM_setValue("gesend",gesend);
			 		
	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+pgurl+'/messages/write/send/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('f_toname=id:'+vonr+'&f_subject='+betreff+'&f_text='+text+'&f_did=&submit=Nachricht+verschicken'),
		onload: function(responseDetails){}
	
	});      
}	
// klammer von start button listener

// Diese ist eine Test version biitte darum dies zu beachten fals fehler auftauchen danke
// copyright by basti1012 ?berarbeitet von NewMan

