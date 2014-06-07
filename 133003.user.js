// ==UserScript==
// @name           Travian Auto-Attack
// @namespace      http://userscripts.org/scripts/show/67686 by Sholto
// @include        http://travianxiper.in/TravianXiper/a2b.php*
// @include        http://travianxiper.in/TravianXiper/dorf1.php*
// @include        http://travianxiper.in/TravianXiper/build.php?gid=16*
// ==/UserScript==
var TropasAtaque = new Array();
	TropasAtaque['1'] = 5 ;
	TropasAtaque['2'] = 0 ;
	TropasAtaque['3'] = 0 ;
	TropasAtaque['4'] = 0 ;
	TropasAtaque['5'] = 0 ;
	TropasAtaque['6'] = 0 ;
	TropasAtaque['7'] = 0 ;
	TropasAtaque['8'] = 0 ;

var ciudad = new Array();
ciudad[1] = 0;
ciudad[2] = 0;
ciudad[3] = 0;
ciudad[4] = 0;

var ciudadn = new Array();
	ciudadn['1'] = 1;
	ciudadn['2'] = 1;
	ciudadn['3'] = 1;
	ciudadn['4'] = 1;
	ciudadn['5'] = 1;
	ciudadn['6'] = 1;
	ciudadn['7'] = 1;
// *** No more setup ***
var travianpage = "http://" + window.location.host + "/" ;
function atacar(Tataque,Ctropa1,Ctropa2,Ctropa3,Ctropa4,Ctropa5,Ctropa6,Ctropa7,Ctropa8,Ctropa9,Ctropa10) { 
	var tropa = new Array();
		tropa['1'] = Ctropa1 ;
		tropa['2'] = Ctropa2 ;
		tropa['3'] = Ctropa3 ;
		tropa['4'] = Ctropa4 ;
		tropa['5'] = Ctropa5 ;
		tropa['6'] = Ctropa6 ;
		tropa['7'] = Ctropa7 ;
		tropa['8'] = Ctropa8 ;
		tropa['9'] = Ctropa9 ;
		tropa['10'] = Ctropa10 ;
	var allInbox, thisInbox, allOk, thisOk, thisRadio, allRadio;
	
	for (var i = 1; i < 11; i++) {
		allInbox = document.evaluate( //Busca la tropa Atropa y Pone numero Ctropa
		    '//input[@name="t' + i + '"]',
	    	document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
		thisInbox = allInbox.snapshotItem(0) ;
		thisInbox.value = tropa[i] ;
	 }
	allRadio = document.evaluate( //Selecciona tipo de ataque (Tataque)
	    '//td[@class="sel"]//label//input[@type="radio"]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < allRadio.snapshotLength; i++) {
	    thisRadio = allRadio.snapshotItem(i);
	    if ( thisRadio.value == Tataque ) {
	    	    thisRadio.checked = 'checked';
	    }
	}
	
	allOk = document.evaluate( //Hace click en Okey
	    '//input[@value="ok"]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	thisOk = allOk.snapshotItem(0) ;
	thisOk.click();
};

function comptropas() {
	var allTable, thisTable, theTable, allTroop, thisTroop, allTb, thisTb, allTr, theTr;
	allTable = document.evaluate( 
		    '//table[@class="troop_details"]',
		    document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
	for (var i = 0; i < allTable.snapshotLength; i++) {
		thisTable = removertexto(allTable.snapshotItem(i).innerHTML,"spieler.php") ;
		if (thisTable == "spieler.php") {
			theTable = allTable.snapshotItem(i) ;
		}
	}
	if (theTable) {
		allTb = theTable.getElementsByTagName("tbody");
		thisTb = allTb[0] ;
		allTr = thisTb.getElementsByTagName("tr");
		theTr = allTr[1];
		allTroop = theTr.getElementsByTagName("td");
		var TropasHay = new Array();
		for (var i = 0; i < allTroop.length; i++) {
			thisTroop = allTroop[i] ;

			var b = i + 1;
			TropasHay[b] = thisTroop.innerHTML ;
		}
		var atacar = "si" ;
		for (var i = 1; i < 9; i++) {
			if (TropasHay[i] < TropasAtaque[i]) {
				setTimeout("location.reload()",300000);
				atacar = "no";	
			}
		}
	}
	return atacar ;
};

function compmovtrop() {
	var allDiv, thisDiv, retorno, attacks, maxattacks;
	allDiv = document.evaluate(
		    '//div[@class="slots"]',
		    document,
		    null,
		    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		    null);
	thisDiv = allDiv.snapshotItem(0);
	attacks = thisDiv.getElementsByTagName("span")[0].innerHTML * 1; // Comprobar que la 
	maxattacks = thisDiv.getElementsByTagName("span")[1].innerHTML * 1; // variable sea numero 
	if ( attacks < maxattacks )
		retorno = true;
	else
		retorno = false;
	return retorno
};

function comptroperror() {
	var pError, retorno;
	pError = document.evaluate(
		'//p[@class="error"]',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	if (pError.snapshotLength == 0)
		retorno = true;
	else
		retorno = false;
	return retorno
};

function removertexto(texto,palabra) {
	var Ipos, Fpos;
	Ipos = texto.indexOf(palabra);
	if (Ipos > -1) {
		Fpos = Ipos + palabra.length ;
		texto = texto.substring(Ipos, Fpos);
	}
	return texto ;
};
	
//------- No more functions
if ( window.location == travianpage + "dorf1.php" ) {
	var answer = confirm ("Start auto-attack?")
	if (answer) {
		var answerb = confirm ("Start from last city?")
		if (!answerb) {	GM_setValue("cityat", 1); }
		window.location = travianpage + "build.php?gid=16" ;
	}
	else
	GM_setValue("cityat", "");	
}
if (GM_getValue("cityat")) {
	if ( window.location == travianpage + "build.php?gid=16" ) {
		if ( GM_getValue("cityat") >= ciudad.length - 1) {
			GM_setValue("cityat", 1);
		}
		if ( comptropas() == "si" ) {
			window.location = travianpage + 'a2b.php?z=' + ciudad[GM_getValue("cityat")] ;
		}
	}
	if ( removertexto(window.location.href,"a2b.php") == "a2b.php" ) {
		if ( compmovtrop() && comptroperror()) {
			atacar(4,TropasAtaque['1'],TropasAtaque['2'],TropasAtaque['3'],TropasAtaque['4'],TropasAtaque['5'],TropasAtaque	['6'],TropasAtaque['7'],TropasAtaque['8'],0,0)
			var newcityat = GM_getValue("cityat") + 1 ;
		}
		if (!compmovtrop()) {
			var newcityat = GM_getValue("cityat") ;
			setTimeout("window.location = 'http://' + window.location.host + '/' + 'build.php?gid=16'",60000);
		}
		else {
			if (!comptroperror()) {
				var newcityat = GM_getValue("cityat") ;
				window.location = travianpage + 'build.php?gid=16' ;
			}	
		}
		GM_setValue("cityat", newcityat)
	}
}