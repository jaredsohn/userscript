// ==UserScript==
// @name           _TMB_ Tools_v1
// @namespace      _TMB_ tips
// @description    Ferramentas para a aliança _TMB_, Ikariam, Mundo ZETA - Versão 1
// @include        http://s6.ikariam.*/*
// @author         Leandro Marques
// @version        20090112 2045 13 
// ==/UserScript==

var tagsAModificar = new Array("A","SPAN");
var diaLimite = 2;
var cookieName = 'Adg';
var cookie_SEPARA = '|';
var css_String = '#menu {'+
'align:left;'+
'margin-left:680px;'+
'margin-top: -16.5px;'+
'color:white;'+
'cursor: pointer;'+
'}'+
'#menu ul {'+
'text-align:center;'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 13em;'+
'}'+
'#menu span {'+
'color:#FFFF00;'+
'}'+
'#menu a, #menu h2 {'+
'font: bold 11px/16px arial, helvetica, sans-serif;'+
'display: block;'+
'margin: 0;'+
'padding: 2px 3px;'+
'cursor: pointer;'+
'}'+
'#menu h2:hover {'+
'text-decoration:underline;'+
'}'+
'#menu a {'+
'color: RGB(84,44,15);'+
//Colores menu normal.
'background: RGB(246,235,188);'+
'border: double 3px RGB(84,44,15);'+
'border-left: double 3px RGB(84,44,15);'+
'border-right: double 3px RGB(84,44,15);'+
'text-decoration: none;'+
'}'+
'#menu a:hover {'+
'color: RGB(84,44,15);'+
//Color menu seleccionado.
'background: RGB(222,180,120);'+
'border: double 3px RGB(84,44,15);'+
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
'{display: block;}';

//NOTA EXPLICATIVA: Esta função é praticamente standard sendo usado em praticamente todos os scripts do Greasemonkey
if(!window.add_Global_Style){
	function add_Global_Style(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
}

function getAlltagsAModificar(){
	var arrResult = new Array();
	var xTags     = null;
	for (tagX = 0; tagX<tagsAModificar.length; tagX++) {
		xTags = document.getElementsByTagName(tagsAModificar[tagX]);
		for(i=0;i<xTags.length;i++){arrResult[arrResult.length-1] = xTags[i];}
	}
	return arrResult;
}

// cookie
unsafeWindow.setFontIka = function () {
	var FamilyIndex = document.getElementById("Family").selectedIndex;
	var FI = document.getElementById("Family").options[FamilyIndex].text;
	changeAllFamily(FI);
	var SizeIndex = document.getElementById("Size").selectedIndex;
	var SI = document.getElementById("Size").options[SizeIndex].text;
	changeAllSize(SI);
	var ColorIndex = document.getElementById("Color").selectedIndex;
	var CI = document.getElementById("Color").options[ColorIndex].text;
	changeAllColor(CI);
	createCookie(cookieName,FI+cookie_SEPARA+SI+cookie_SEPARA+CI,diaLimite);
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(c_name) {
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1) {
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
    return "";
}
function initFont(){
	var rC = readCookie(cookieName);
	if (rC){
		var myFont = rC.split(cookie_SEPARA);
		changeAllFamily(myFont[0]);
		changeAllSize(myFont[1]);
		changeAllColor(myFont[2]);
	}
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}
function changeAllFamily(valueOfSelect){
	var dataToChange = getAlltagsAModificar();
	for (i=0;i<dataToChange.length;i++){
		dataToChange[i].style.fontFamily = valueOfSelect;
	}
}
function changeAllSize(valueOfSelect){
	var dataToChange = getAlltagsAModificar();
	for (i=0;i<dataToChange.length;i++){
		dataToChange[i].style.fontSize = valueOfSelect;
	}
}
function changeAllColor(valueOfSelect){
	var dataToChange = getAlltagsAModificar();
	for (i=0;i<dataToChange.length;i++){
		dataToChange[i].style.color = valueOfSelect;
	}
}

unsafeWindow.clearFont = function(){
	eraseCookie(cookieName);
	window.location.reload();
}
function addMenu(){
	var xTags = document.getElementsByTagName('li');
	var xLi   = null;
	var liEl = document.createElement('li');
	liEl.setAttribute('id', '_TMB_ Tools');

	for(i=0;i<xTags.length;i++){
		xLi = xTags[i];
		if (xLi.className == 'help') {
			xLi.parentNode.appendChild(liEl,xLi);
			add_Global_Style(css_String);
			liEl.innerHTML =
			'<div id="menu">'
			+ '<ul>'
			+ '<li><h2><span>_TMB_ Tools</span></h2>'
			+ '<ul>'
			+ '<li><center><a target="_self" href="http://s6.ikariam.com.pt/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&watch=4&id=59890&position=3&type=50" title="Enviar mensagem a todos os membros">Mensagem Circular</a></li>'
			+ '<li><center><a target="_blank" href="http://metabarons.forums-free.com/" title="Fórum da Aliança _TMB_">Fórum</a></li>'
			+ '<li><center><a target="_blank" href="http://ikcomp.260mb.com/index.php" title="Compactador de batalhas para publicar no fórum">Compactador de batalhas</a></li>'
			+ '<li><center><a target="_blank" href="http://ikariamlibrary.com/?content=IkaFight" title="Comprova que ganhas uma batalha">Simulador de batalhas</a></li>'
			+ '<li><center><a target="_blank" href="http://ikariam.ogame-world.com/pt/suche.php?view=suche_spieler" title="Procura as cidades e coordenadas em que se encontra um jogador">Procurar Jogador</a></li>'
			+ '<li><center><a target="_blank" href="http://ikariam.ogame-world.com/pt/suche.php?view=suche_stadt&land_i=37" title="Procura cidades">Procurar Cidade</a></li>'
			+ '<li><center><a target="_blank" href="http://ikariam.ogame-world.com/pt/suche.php?view=suche_insel" title="Procura as coordenadas de uma ilha">Procurar Ilha</a></li>'
			+ '<li><center><a target="_blank" href="http://userscripts.org/scripts/search?q=ikariam" title="Scripts">Buscar Scripts</a></li>'
			+'</ul></li>'
			+'</ul>'
			+'</div>';
			break;
		}
	}
}

addMenu();