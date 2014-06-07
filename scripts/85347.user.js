// ==UserScript==
// @name           Hipotecas Formulawan
// @namespace      Hipotecas Formulawan
// @description    Permite ver info extra en la sección del personal. 
// @include	   http://www.formulawan.es/Fenetre_Staff.php?action=Gestion
// @version	   1.0
// @licence	   GPLv3
// ==/UserScript==




var lvl_ecurie = parseInt(document.getElementsByClassName('table largeTable')[0].getElementsByTagName('td')[3].textContent.replace(new RegExp('Nivel|,| |\t|\n|\r|', 'g'),''));

var cout = {};
cout[1] = 0;
cout[2] = 2500;
for(var i = 3;i < 150 ;i++)
	cout[i] = cout[i-1] + 500 * (i-2);
var mon_cout_total = 0;
for (var j = 1 ; j <= lvl_ecurie ; j++)
	mon_cout_total += cout[j];

function trigger(){
	var lvl_cible = parseInt(document.getElementById("lvlinput").value);
	var gain = mon_cout_total;
	for (var j = 1 ; j <= lvl_cible ; j++)
		gain -= cout[j];
	document.getElementById("moneyinput").value = gain;
	var nb_places = 2 * (lvl_cible - lvl_ecurie);
	var pluriel = "s";
	if (lvl_cible == lvl_ecurie) pluriel = "";
	div_txt.textContent = "(y "+nb_places+" plaza"+pluriel+" de diferencia)";
	
}

function trigger2(){
	var money = parseInt(document.getElementById("moneyinput").value);
	var lvl_cible = document.getElementById("lvlinput");
	if(money > mon_cout_total) {
		lvl_cible.value = "NaN";
	} else if (money >= 0){
		var gain = 0;
		var j = lvl_ecurie;
		while(gain < money) {
			gain += cout[j--];
		}
		lvl_cible.value = j;	
	} else if (money < 0){
		var gain = 0;
		var j = lvl_ecurie;
		while(gain > money) {
			gain -= cout[j++];
		}
		lvl_cible.value = j-1;
	}
	var nb_places = 2 * (lvl_cible.value - lvl_ecurie);
	var pluriel = "s";
	if (lvl_cible.value == lvl_ecurie) pluriel = "";
	div_txt.textContent = "(y "+nb_places+" plaza"+pluriel+" de diferencia)";
}

var addEvent = function(obj_, event_, fct_)
{
    if (obj_.addEventListener) {
        obj_.addEventListener(event_, fct_, true);
    }
    else if (obj_.attachEvent && !(/this\./g.test(fct_.valueOf()))) {
        obj_.attachEvent('on' + event_, fct_);
    }
    else {
        obj_['on' + event_] = fct_;
    }
};


var thead_to_add = document.createElement("thead");
var th_information = document.createElement("th");
th_information.colSpan = 4;
var center_th = document.createElement("center");
center_th.textContent = "Resumen de los gastos y simulación"
var tr_contenu = document.createElement("tr");
var td_gauche = document.createElement("td");
var td_droit = document.createElement("td");
td_gauche.colSpan = 2;
td_droit.colSpan = 2;
var contenu_droit = "<center>Total de gastos: <span class=\"money\" title=\""+
			mon_cout_total + " boulon(s)\">" + mon_cout_total + 
			"<img src=\"/img_fr/icons/tiny_money.gif?version=5\" alt=\"Boulon(s)\"/></span></center>";
td_droit.innerHTML = contenu_droit;

var parent = document.getElementsByClassName('table largeTable')[0];
parent.appendChild(thead_to_add);
thead_to_add.appendChild(th_information);
th_information.appendChild(center_th);
parent.appendChild(tr_contenu);
tr_contenu.appendChild(td_gauche);
tr_contenu.appendChild(td_droit);
var gauche_center = document.createElement("center");
td_gauche.appendChild(gauche_center);
var contenu_gauche = "Nivel " + lvl_ecurie;
gauche_center.innerHTML = contenu_gauche;

/////////// ligne2
var tr_contenu_2 = document.createElement("tr");
var td_gauche_2 = document.createElement("td");
var td_droit_2 = document.createElement("td");
td_gauche_2.colSpan = 2;
td_droit_2.colSpan = 2;

var lvl_input = document.createElement("input");
lvl_input.value = lvl_ecurie;
lvl_input.size = 2;
lvl_input.type = "text";
lvl_input.id = "lvlinput";

var gauche_center_2 = document.createElement("center");
td_gauche_2.appendChild(gauche_center_2);
var contenu_gauche_2 = "Nivel: ";
gauche_center_2.innerHTML = contenu_gauche_2;

gauche_center_2.appendChild(lvl_input);
tr_contenu_2.appendChild(td_gauche_2);

var money_input = document.createElement("input");
money_input.value = "0";
money_input.size = 8;
money_input.type = "text";
money_input.id = "moneyinput";

var droit_center_2 = document.createElement("center");
td_droit_2.appendChild(droit_center_2);
var contenu_droit_2 = "Balance: ";
droit_center_2.innerHTML = contenu_droit_2;

droit_center_2.appendChild(money_input);
var span_boulons = document.createElement("span");
span_boulons.Class= "money";
span_boulons.title = "boulon(s)";
var img_boulons = document.createElement("img");
img_boulons.src = "/img_fr/icons/tiny_money.gif?version=5";
span_boulons.appendChild(img_boulons);
droit_center_2.appendChild(span_boulons);
droit_center_2.appendChild(document.createElement("br"));
var div_txt = document.createElement("div");
div_txt.id = "place_txt";
div_txt.textContent = "(y 0 plazas de diferencia)";
droit_center_2.appendChild(div_txt);
td_droit_2.appendChild(droit_center_2);

tr_contenu_2.appendChild(td_droit_2);
parent.appendChild(tr_contenu_2);
addEvent(lvl_input, 'keyup', function() {trigger()});

addEvent(money_input, 'keyup', function() {trigger2()});


