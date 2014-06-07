// ==UserScript==
// @name           Travian: Normalize of production (extended) / Нормализация производства (расширенный).
// @namespace      http://ttwa.mybb.ru/
// @author         Alex PГ©rez, r0ute, Mike_Sh
// @version 	   1.2 bilingual
// @description    Помогает сбалансировать выработку ресурсов в зависимости от игровой расы и производимых юнитов всех видов войск / 
Helps balance the production of resources depending from game's race and produced units of all types of troops. 
// @include        http://s*.travian.*/dorf1.php*
// ==/UserScript==

var offset = 4;
var vProduccion = new Array(4);
var vProduccionNormalizada = new Array(4);

var vNormal = new Array(10,12,8,6);	  // нормальное развитие (производство ресов)/
                                             normal development (production resources)                                                                                                    
// РИМЛЯНЕ / ROMANS //
//var vNormal = new Array(6,5,8,2);	  // легионеры / Legionnaire
//var vNormal = new Array(10,13,16,7);    // преторианцы / Praetorian
//var vNormal = new Array(15,16,21,8);	  // империанцы / Imperian
//var vNormal = new Array(7,8,1,2);       // конныe разведчики / Equites Legati
//var vNormal = new Array(55,44,32,10);   // конница императора / Equites Imperatoris
//var vNormal = new Array(55,64,80,18);   // конница Цезаря / Equites Caesaris
//var vNormal = new Array(90,36,50,7);    // тараны / Battering Ram
//var vNormal = new Array(95,135,60,9);   // огненные катапульты / Fire Catapult
                              
// ГЕРМАНЦЫ / TEUTONS // 
//var vNormal = new Array(19,15,8,8);	  // дубинщики / Clubswinger
//var vNormal = new Array(29,14,17,8);    // копейщики / Spearman
//var vNormal = new Array(13,12,17,7);    // топорщики / Axeman
//var vNormal = new Array(16,10,5,5);     // скауты / Scout
//var vNormal = new Array(74,54,58,15);   // паладины / Paladin
//var vNormal = new Array(90,103,96,16);  // тевтоны / Teutonic Knight
//var vNormal = new Array(100,30,35,7);   // стенобитные орудия / Battering Ram 
//var vNormal = new Array(45,60,30,3);    // катапульты / Catapult

// ГАЛЛЫ / GAULS //
//var vNormal = new Array(20,26,11,6);	  // фаланги / Phalanx
//var vNormal = new Array(28,30,37,12);   // мечники / Swordsman
//var vNormal = new Array(17,15,2,4);     // следопыты / Pathfinder
//var vNormal = new Array(35,45,23,6);    // громы / Theutates Thunder
//var vNormal = new Array(36,33,28,12);   // друиды / Druidrider
//var vNormal = new Array(100,124,135,34);// эдуи / Haeduan
//var vNormal = new Array(190,111,66,15); // тараны / Battering Ram
//var vNormal = new Array(96,145,63,9);   // требушеты / Trebuchet

var colorLimitante = '#FF6A6A';
var colorExcedente = '#66CD00';



/*
localizar la tabla de produccion
*/




var allDivs, thisDiv;allDivs = document.evaluate("//table[@id='production']/tbody/tr",document,
												null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);									
var token;
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);   
	token= thisDiv.textContent.split(':')[1].split(' ')[0];
	token = parseInt(token); //.substring(0,token.length-offset);
	vProduccion[i]  = token;
	}

/*
Normalizamos
*/
for ( i=0; i<vProduccion.length;i++){
	vProduccionNormalizada[i] = vProduccion[i] / vNormal[i];
}

/*
Buscamos el mГnimo
*/