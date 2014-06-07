// ==UserScript==
// @name           Ogame Easy Login
// @namespace      Ogame Login
// @description    Easy  Login To Your Universe
// @include        http://ogame.*/home.php
// @include        http://www.ogame.*/home.php
// @author Mundo
// ==/UserScript==

/*//		changelog::start
V 1.1
Added http://www.ogame
V 1.0
LANG : FR/ORG/IT
//		changelog::end*/

var LANG = new Array();
LANG["fr"] = new Array(
	"Quel est votre univers préféré ?",
	"Numéro de l'univers"
);
LANG["org"] = new Array(
	"What's your favorite Universe ?",
	"Numéro de l'univers"
);
LANG["it"] = new Array(
	"Qual è il tuo preferito universo?",
	"Numero di l'universo"
);


var adresse = document.location;
var RElangue = new RegExp("ogame.([a-z]{2,3})/","g");
var langue = RElangue.exec(adresse)[1];

//on vérifie si l'utilisateur a dèjà donné son univers préféré
if (GM_getValue("OQL_Fav_1_"+langue)) {
	var Uni = GM_getValue("OQL_Fav_1_"+langue);
	SetUniverse(Uni);
}
else {
	// on demande a l'utilisateur de donner son univers préféré
	var Uni = eval('prompt("'+LANG[langue][0]+'","'+LANG[langue][1]+'")');
	var REUni = new RegExp("[0-9]{1,2}","g");
	var j = REUni.exec(Uni);
	Uni = j.toString();
	GM_setValue('OQL_Fav_1_'+langue,Uni);
	SetUniverse(Uni);
}

function SetUniverse(uni) {
	document.getElementsByName("universe")[0].options[uni].selected ="selected";
}

// 2nd univers favori

function CreateButton(Uni) {
	var ligne = '<tr><td><a style="font-size:15px;" name="ShortCut">'+Uni+'</a></td></tr>';
	return ligne;
}

function CreateFavorites() {
	var temp = document.createElement('div');
	var FAV_tab = '<div id="OQL" style="min-width: 50px;min-height:40px;background : black;outline : 1px solid #292A2C;position : absolute; top : 8px; left : -54px;z-index: 100;"><table><tr><td><table><tr><td><img name="OEL_Config1" src="http://img117.imageshack.us/img117/9641/icoconfigwv3.gif"></td></tr><tr><td><img name="OEL_Config2" src="http://img117.imageshack.us/img117/9641/icoconfigwv3.gif"></td></tr></table></td><td><table>';
	if (GM_getValue("OQL_Fav_1_"+langue)) {
		var Fav1 = GM_getValue("OQL_Fav_1_"+langue);
		FAV_tab += CreateButton(Fav1);
	}
	
	if (GM_getValue("OQL_Fav_2_"+langue)) {
		var Fav2 = GM_getValue("OQL_Fav_2_"+langue);
		FAV_tab += CreateButton(Fav2);
	}
	else { FAV_tab +=CreateButton(0);}
	FAV_tab += '</table></td></tr></table></div>';
	
	var content = document.getElementById('login');
	temp.innerHTML = FAV_tab;
	
	content.insertBefore(temp,content.firstChild);
	
	document.getElementsByName("ShortCut")[0].addEventListener('click', 
	function(event) {
		var CurrentUni = this.innerHTML;
		SetUniverse(CurrentUni);
	},
	false);
	document.getElementsByName("ShortCut")[1].addEventListener('click', 
	function(event) {
		var CurrentUni = this.innerHTML;
		SetUniverse(CurrentUni);
	},
	false);

	document.getElementsByName("OEL_Config1")[0].addEventListener('click', 
	function(event) {
		var Uni = eval('prompt("'+LANG[langue][0]+'","'+LANG[langue][1]+'")');
		var REUni = new RegExp("[0-9]{1,2}","g");
		var j = REUni.exec(Uni);
		Uni = j.toString();
		GM_setValue('OQL_Fav_1_'+langue,Uni);
		SetUniverse(Uni);
	},
	false);
	document.getElementsByName("OEL_Config2")[0].addEventListener('click', 
	function(event) {
		var Uni = eval('prompt("'+LANG[langue][0]+'","'+LANG[langue][1]+'")');
		var REUni = new RegExp("[0-9]{1,2}","g");
		var j = REUni.exec(Uni);
		Uni = j.toString();
		GM_setValue('OQL_Fav_2_'+langue,Uni);
		SetUniverse(Uni);
	},
	false);
}

CreateFavorites();
