// ==UserScript==
// @name           script NETeg Chat with rank version 1.30
// @namespace      NEteg
// @include        http://s*.ae.ikariam.com/index.php?view=*
// ==/UserScript==

//pour recuperer le nom de la page où on se trouve
var test = document.location.href;
var testSplit =  test.split('=');
var testSplit2 =  testSplit[1].split('&');
// alert(testSplit2[0]);
/* Nom des variables de chaques vue
ville = city
ile = island
monde = worldmap_iso
conseille_ville = tradeAdvisor
conseille_general = militaryAdvisorMilitaryMovements
conseil_recherche = researchAdvisor
conseil_diplomatie = diplomacyAdvisor
deplacment_bateau_marchand = merchantNavy
detail_finance = finances
*/
var domain = getIkaDomain(top.location.host);
var server = getIkaServer(top.location.host);

GM_setValue('server', document.domain);
//	IkaTools.init({trackData:false});

var serdom = server+domain;
var lblShowStatus = "ss"+serdom;
var lblUser = "u"+serdom;
var lblAlly = "a"+serdom;
var lblRank = "r"+serdom;
var lblLatest = "l"+serdom;
var lblTypePass = "tp"+serdom;
// custom channel save and custom passwd save
var lblCChan = "cc"+serdom;
var lblCPass = "cp"+serdom;
var lblCLock = "lk"+serdom;

var playerName = "";

// find username and allyname - if possible...
	var playerName = GM_getValue(lblUser,'');
	var playerAllay = GM_getValue(lblAlly,'');
	var playerRank = GM_getValue(lblRank,'');
	
if (document.getElementById('options')!=null) {
		var userdata = document.getElementById("options_userData");		
		var f = userdata.getElementsByTagName("input");
		for (var i=0; i<f.length; i++) {
			if (f[i].name=="name") {
				playerName = f[i].value;
				GM_setValue(lblUser, playerName);
			}
		}
	}

	getElementsByClass = function(inElement, className) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) {
  	  // alert(all[e].className);
    if (all[e].className == className) {
      elements[elements.length] = all[e];
    }
  }
  return elements;
};


if (document.getElementById('embassy')!=null) {
		// I'm in the embassy
		// If I've not joined any alliance...
		if (document.getElementById("embassyMenu")==null) {
			playerAllay = '-';
			playerRank = '-';
			GM_setValue(lblAlly, playerAllay);
			GM_setValue(lblRank, playerRank);
		} else {
			// usuarios en la alianza
			var mainview = document.getElementById("mainview");		
			var content = getElementsByClass(mainview,"content")[0];
			var f = content.getElementsByTagName("td")[0];
			if (f.innerHTML="["+f.title+"]:") { // ridondante
				playerAllay = f.title;
				GM_setValue(lblAlly, playerAllay);
			}
			var content1 = getElementsByClass(mainview,"content")[0];
			var f1 = content1.getElementsByTagName("td")[15];
				playerRank = f1.title;
				GM_setValue(lblRank, playerRank);
			
		}
	}
	
if (testSplit2[0]=="city") {

var chat =   '<iframe src=\'http://neteg.net/tagboard/a.php?name=' + playerName + '&allay=' + playerAllay + '&rank=' + playerRank + '\' width=\'230\' height=\'520\' frameborder=\'1\' allowTransparency=\'true\'></iframe>';
var newElementcity = document.createElement("div"); // On cr�e un nouvelle �l�ment div
newElementcity.innerHTML = chat; // On met la variable chat dans cet �l�ment
document.getElementById('information').insertBefore(newElementcity, document.getElementById('button'));

}

if (testSplit2[0]=="worldmap_iso") {

var chat =   '<iframe src=\'http://neteg.net/tagboard/a.php?name=' + playerName + '&allay=' + playerAllay + '&rank=' + playerRank + '\' width=\'230\' height=\'520\' frameborder=\'1\' allowTransparency=\'true\'></iframe>';

var newElementworldmap = document.createElement("div"); // On cr�e un nouvelle �l�ment div
newElementworldmap.innerHTML = chat; // On met la variable chat dans cet �l�ment
document.getElementById('navigation').insertBefore(newElementworldmap, document.getElementById('cityresource'));

}

if (testSplit2[0]=="island") {

var chat =   '<iframe src=\'http://neteg.net/tagboard/a.php?name=' + playerName + '&allay=' + playerAllay + '&rank=' + playerRank + '\' width=\'230\' height=\'520\' frameborder=\'1\' allowTransparency=\'true\'></iframe>';

var newElementIsland = document.createElement("div"); // On cr�e un nouvelle �l�ment div
newElementIsland.innerHTML = chat; // On met la variable chat dans cet �l�ment
document.getElementById('actioncontainer').insertBefore(newElementIsland, document.getElementById('accesshint'));

}

if (testSplit2[0]=="tradeAdvisor") { //vue du conseiller de la ville  

var chat =   '<iframe src=\'http://neteg.net/tagboard/a.php?name=' + playerName + '&allay=' + playerAllay + '&rank=' + playerRank + '\' width=\'230\' height=\'520\' frameborder=\'1\' allowTransparency=\'true\'></iframe>';

var newElementtradeAdvisor = document.createElement("div"); // On cr�e un nouvelle �l�ment div
newElementtradeAdvisor.innerHTML = chat; // On met la variable chat dans cet �l�ment
document.getElementById('viewCityImperium').insertBefore(newElementtradeAdvisor, document.getElementById('button'));

}

if (testSplit2[0]=="militaryAdvisorMilitaryMovements") {

var chat =   '<iframe src=\'http://neteg.net/tagboard/a.php?name=' + playerName + '&allay=' + playerAllay + '&rank=' + playerRank + '\' width=\'230\' height=\'520\' frameborder=\'1\' allowTransparency=\'true\'></iframe>';

var newElementMilitaryAdvisor = document.createElement("div"); // On cr�e un nouvelle �l�ment div
newElementMilitaryAdvisor.innerHTML = chat; // On met la variable chat dans cet �l�ment
document.getElementById('viewMilitaryImperium').insertBefore(newElementMilitaryAdvisor, document.getElementById('button'));

}

if (testSplit2[0]=="researchAdvisor") {

var chat =   '<iframe src=\'http://neteg.net/tagboard/a.php?name=' + playerName + '&allay=' + playerAllay + '&rank=' + playerRank + '\' width=\'230\' height=\'520\' frameborder=\'1\' allowTransparency=\'true\'></iframe>';

var newElementResearchAdvisor = document.createElement("div"); // On cr�e un nouvelle �l�ment div
newElementResearchAdvisor.innerHTML = chat; // On met la variable chat dans cet �l�ment
document.getElementById('viewResearchImperium').insertBefore(newElementResearchAdvisor, document.getElementById('button'));

}

if (testSplit2[0]=="diplomacyAdvisor") {

var chat =   '<iframe src=\'http://neteg.net/tagboard/a.php?name=' + playerName + '&allay=' + playerAllay + '&rank=' + playerRank + '\' width=\'230\' height=\'520\' frameborder=\'1\' allowTransparency=\'true\'></iframe>';

var newElementDiplomacyAdvisor = document.createElement("div"); // On cr�e un nouvelle �l�ment div
newElementDiplomacyAdvisor.innerHTML = chat; // On met la variable chat dans cet �l�ment
document.getElementById('viewDiplomacyImperium').insertBefore(newElementDiplomacyAdvisor, document.getElementById('button'));

}

function getIkaDomain(s) {
	// I must get XX - there are 4 cases
	// 1) sNN.XX.ikariam.com
	// 2) sNN.ikariam.com.XX
	// 3) sNN.ikariam.co.XX
	// 4) sNN.ikariam.XX
	var ss = s.toLowerCase();
	var spl = ss.split(".");
	// quick & dirty... :)
	return (spl[1]!='ikariam' ? spl[1] : spl[spl.length-1]);
}

function getIkaServer(s) {
	return s.toLowerCase().split(".")[0];
}
/*
idée ecrire les noms en dessous de la box
reprendre la liste des noms, les séparer suivant la virgule (methode split) en afficher 3 par lignes séparer par un <br/>
*/