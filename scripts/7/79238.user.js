// ==UserScript== 
// @name          instantsFunEOL_instants 
// @version       0.1
// @namespace     http://www.elotrolado.net/foro_generales-pruebas_21 
// @description   instantsFun en smileyBox.
// @run-at        document-end
// @include       http://www.elotrolado.net/* 
// @exclude              
// ==/UserScript== 

var listaSmiley = "smiley-list";

InstantsBox = {};

InstantsBox.instants = new Array();

InstantsBox.setInstants = function(element) {

	element.appendChild(document.createElement("br"));

	var title = document.createElement("strong");
	title.appendChild(document.createTextNode("- instantsfun.com -"));
	element.appendChild(title);
	element.appendChild(document.createElement("br"));

	var select = document.createElement("select");
	select.setAttribute("size", "8");
	select.setAttribute("style", "width: " + (element.offsetWidth - 20) + "px");

	for ( var i = 0; i < InstantsBox.instants.length; i++) {
		var option = document.createElement("option");

		var arg0 = "http://instantsfun.es/" + InstantsBox.instants[i].swfLink;
		option.setAttribute("onclick", "insert_text('" + arg0 + "', true)");
		option.appendChild(document.createTextNode(InstantsBox.instants[i].name));

		select.appendChild(option);
	}

	element.appendChild(select);
};

InstantsBox.addInstant = function(name, swfLink) {

	var size = InstantsBox.instants.length;
	InstantsBox.instants[size] = new Object();
	InstantsBox.instants[size].name = name;
	InstantsBox.instants[size].swfLink = swfLink;
};

InstantsBox.staticLoad = function() {

	// lista de instants, puedes añadir más con addInstant(nombre, pagina);
	InstantsBox.addInstant("badumtss", "badumtss");
	InstantsBox.addInstant("ballsofsteel", "ballsofsteel");
	InstantsBox.addInstant("barrelroll", "barrelroll");
	InstantsBox.addInstant("bazinga", "bazinga");
	InstantsBox.addInstant("bennyhill", "bennyhill");
	InstantsBox.addInstant("birdtheword", "birdtheword");
	InstantsBox.addInstant("boomheadshot", "boomheadshot");
	InstantsBox.addInstant("burned", "burned");
	InstantsBox.addInstant("chan", "chan");
	InstantsBox.addInstant("chanchan", "chanchan");
	InstantsBox.addInstant("chewbacca", "chewbacca");
	InstantsBox.addInstant("combobreaker", "combobreaker");
	InstantsBox.addInstant("correct", "correct");
	InstantsBox.addInstant("crickets", "crickets");
	InstantsBox.addInstant("csi", "csi");
	InstantsBox.addInstant("cuek", "cuek");
	InstantsBox.addInstant("doh", "doh");
	InstantsBox.addInstant("drama", "drama");
	InstantsBox.addInstant("dramatic", "dramatic");
	InstantsBox.addInstant("drumroll", "drumroll");
	InstantsBox.addInstant("emergencyodel", "emergencyodel");
	InstantsBox.addInstant("epic", "epic");
	InstantsBox.addInstant("evillaugh", "evillaugh");
	InstantsBox.addInstant("excellent", "excellent");
	InstantsBox.addInstant("falconpunch", "falconpunch");
	InstantsBox.addInstant("fatality", "fatality");
	InstantsBox.addInstant("finishhim", "finishhim");
	InstantsBox.addInstant("fuckoff", "fuckoff");
	InstantsBox.addInstant("gong", "gong");
	InstantsBox.addInstant("haha", "haha");
	InstantsBox.addInstant("hallelujahlong", "hallelujahlong");
	InstantsBox.addInstant("hallelujahshort", "hallelujahshort");
	InstantsBox.addInstant("incorrect", "incorrect");
	InstantsBox.addInstant("inetporn", "inetporn");
	InstantsBox.addInstant("itsatrap", "itsatrap");
	InstantsBox.addInstant("kamehameha", "kamehameha");
	InstantsBox.addInstant("keyboardcat", "keyboardcat");
	InstantsBox.addInstant("khaaan", "khaaan");
	InstantsBox.addInstant("lalalalala", "lalalalala");
	InstantsBox.addInstant("lazor", "lazor");
	InstantsBox.addInstant("legendary", "legendary");
	InstantsBox.addInstant("leroy", "leroy");
	InstantsBox.addInstant("mario", "mario");
	InstantsBox.addInstant("metalgearsolid", "metalgearsolid");
	InstantsBox.addInstant("mlb", "mlb");
	InstantsBox.addInstant("muppets", "muppets");
	InstantsBox.addInstant("murloc", "murloc");
	InstantsBox.addInstant("nooo", "nooo");
	InstantsBox.addInstant("ommmm", "ommmm");
	InstantsBox.addInstant("omnom", "omnom");
	InstantsBox.addInstant("over9000", "over9000");
	InstantsBox.addInstant("penny", "penny");
	InstantsBox.addInstant("r2d2", "r2d2");
	InstantsBox.addInstant("sadtrombone", "sadtrombone");
	InstantsBox.addInstant("sadtuba", "sadtuba");
	InstantsBox.addInstant("shhahh", "shhahh");
	InstantsBox.addInstant("shutup", "shutup");
	InstantsBox.addInstant("swanee", "swanee");
	InstantsBox.addInstant("tada", "tada");
	InstantsBox.addInstant("thisissparta", "thisissparta");
	InstantsBox.addInstant("trollolol", "trollolol");
	InstantsBox.addInstant("tumbleweed", "tumbleweed");
	InstantsBox.addInstant("victoryff", "victoryff");
	InstantsBox.addInstant("wakawaka", "wakawaka");
	InstantsBox.addInstant("wilhelm", "wilhelm");
	InstantsBox.addInstant("wololo", "wololo");
	InstantsBox.addInstant("wrong", "wrong");
	InstantsBox.addInstant("youarepirate", "youarepirate");
	InstantsBox.addInstant("zas", "zas");
	InstantsBox.addInstant("zasca", "zasca");
	InstantsBox.addInstant("zeldaitem", "zeldaitem");
	InstantsBox.addInstant("zeldasecret", "zeldasecret");
};

var smileybox = document.getElementById(listaSmiley);
InstantsBox.staticLoad();

InstantsBox.setInstants(smileybox);
