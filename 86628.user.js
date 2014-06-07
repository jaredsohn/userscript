// ==UserScript==
// @name           Agilidade no favelado
// @namespace      Quebra galho
// @description    Toma banho bebe tudo num link facil...
// @version	   1.1
// @author	   Boggler, Basti, Lordclodo
// @include        http://*faveladogame.com.br/*
// @include        http://*bumrise.com/*
// @include        http://www.clodogame.fr/*
// @include        http://marseille.clodogame.fr/*
// @exclude	   http://board.clodogame.fr*
// @exclude	   http://board.faveladogame.com.br*
// @exclude	   http://board.bumrise.com/
// ==/UserScript==


var hoch = '40'; //40
var breit = '87'; //87

//______________________________________________________________
//mendigogame.es (display only the donations)			|
//______________________________________________________________|

if(document.location.href.indexOf('mendigogame.es/')>=0) {

GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.mendigogame.es/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('recibido')[1];
			var text2 = text1.split('donaciones')[0];
if (text2<50) {
	farbe = "#FE0000"
		} else {
	farbe = "#0A9000"
}

document.getElementsByClassName("icon crowncap")[0].innerHTML = '<span name="PlunderInfoScreen" style="position:absolute;top:'+hoch+'px;right:'+breit+'px;font-size:100%;-moz-border-radius:20px;-moz-opacity:1.8;opacity:1.8;"><span style=" color:'+farbe+'"><b>donado:&nbsp</b><br><b>'+text2+' / 50</b></span>';
		}
	 });
};

//______________________________________________________________
//bumrise.USA							|
//______________________________________________________________|

if(document.location.href.indexOf('faveladogame.com.br/')>=0) {
var TASK_URL = 'http://www.faveladogame.com.br/overview/';
var TASK_name = 'Task of the day';
GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.faveladogame.com.br/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('have received')[1];
			var text2 = text1.split('donations')[0];
//Couleur du texte (rouge <50 - vert =50)
if (text2<50) {
	farbe = "#FE0000"
		} else {
	farbe = "#0A9000"
}

document.getElementsByClassName("el1")[2].innerHTML = '<span name="Points" style="position:absolute;top:105px;right:120px;font-size:100%;-moz-border-radius:20px;-moz-opacity:1.8;opacity:1.8;"><span style=" color:'+farbe+'"><b>DONATIONS:&nbsp</b><br></span>';
document.getElementsByClassName("el2")[2].innerHTML = '<span name="Points" style="position:absolute;top:105px;right:80px;font-size:100%;-moz-border-radius:20px;-moz-opacity:1.8;opacity:1.8;"><span style=" color:'+farbe+'"><b>'+text2+' / 50</b><br></span>';
		}
	 });
};


//______________________________________________________________
//clodogame.fr		PARIS					|
//______________________________________________________________|

if(document.location.href.indexOf('www.clodogame.fr/')>=0) {
var TASK_URL = 'http://www.clodogame.fr/overview/';
var TASK_name = 'Tâche du jour';
GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.clodogame.fr/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('as réussi à récolter')[1];
			var text2 = text1.split(',')[0];
if (text2<50) {
	farbe = "#FE0000"
		} else {
	farbe = "#0A9000"
}

document.getElementsByClassName("el1")[2].innerHTML = '<span name="Points" style="position:absolute;top:110px;right:139px;font-size:100%;-moz-border-radius:20px;-moz-opacity:1.8;opacity:1.8;"><span style=" color:'+farbe+'"><b>DONS:&nbsp</b><br></span>';
document.getElementsByClassName("el2")[2].innerHTML = '<span name="Points" style="position:absolute;top:110px;right:81px;font-size:100%;-moz-border-radius:20px;-moz-opacity:1.8;opacity:1.8;"><span style=" color:'+farbe+'"><b>'+text2+' / 50</b><br></span>';
		}
	 });
};

//______________________________________________________________
//clodogame.fr		MARSEILLE				|
//______________________________________________________________|

if(document.location.href.indexOf('marseille.clodogame.fr/')>=0) {
var TASK_URL = 'http://marseille.clodogame.fr/overview/';
var TASK_name = 'Tâche du jour';
GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://marseille.clodogame.fr/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('as réussi à récolter')[1];
			var text2 = text1.split(',')[0];
if (text2<50) {
	farbe = "#FE0000"
		} else {
	farbe = "#0A9000"
}

document.getElementsByClassName("el1")[2].innerHTML = '<span name="Points" style="position:absolute;top:110px;right:139px;font-size:100%;-moz-border-radius:20px;-moz-opacity:1.8;opacity:1.8;"><span style=" color:'+farbe+'"><b>DONS:&nbsp</b><br></span>';
document.getElementsByClassName("el2")[2].innerHTML = '<span name="Points" style="position:absolute;top:110px;right:81px;font-size:100%;-moz-border-radius:20px;-moz-opacity:1.8;opacity:1.8;"><span style=" color:'+farbe+'"><b>'+text2+' / 50</b><br></span>';
		}
	 });
};



//______________________________________________________________
//MAIN								|
//______________________________________________________________|
//Recup image tache
function GetCurrentPlunder(doc) {
var taskbox = doc.getElementsByClassName("k")[5];
var taskimg = taskbox.getElementsByTagName("img")[0].getAttribute('src');
ShowImg('/daily/rewards/', taskimg, TASK_name, '35', '', '885', '60', '101');
				}


//Affichage de l'image babiole
 

function ShowImg(imglink, imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex, imgid) {
	if (imglink != '') {
		var newlink = document.getElementById("wrap").appendChild(document.createElement('a'));
		newlink.setAttribute('href', imglink);
		if (imgid != "") {
			newlink.setAttribute('id', imgid);
		}
		var newimg = newlink.appendChild(document.createElement('img'));

	} else {

		var newimg = document.getElementById("wrap").appendChild(document.createElement('img'));
	}

	newimg.setAttribute('src', imgsource);

	newimg.setAttribute('border', '0');
	if (imgwidth != '') {
		newimg.setAttribute('width', imgwidth);
	}
	if (imgheight != '') {
		newimg.setAttribute('height', imgheight);
	}
	newimg.setAttribute('title', imgtitle);
	newimg.setAttribute('style', 'position:absolute; left:' + imgleft + 'px; top:' + imgtop + 'px; z-index:' + imgzindex);
}





GM_xmlhttpRequest({	method: 'GET', 
			url: TASK_URL,
			onload: function(responseDetails) {

			// Aus dem Responsetext ein Document machen
			var doc = HTML2DOM(responseDetails.responseText);

			// Aktuellen Plunder emitteln und Image und Name speichern
			GetCurrentPlunder(doc);

		} 
	});



function HTML2DOM(content) {

	var host = document.location.host;
	var dummyDiv = document.createElement('div');
	dummyDiv.innerHTML = content;
	return dummyDiv;
}