// ==UserScript==
// @name           Detector
// @namespace      Lame noire
// @description    Statistique d'espionnage
// @include        http:/*.ogame.*/game/index.php?page=*
// ==/UserScript==


// ==UserScript==
// @name           Terminator
// @namespace      Lame noire
// @description    Générateur de statistique de raids
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

var version = "0.0 BETA";

/**Options*/
var lineColor = ["#4040FF", "#408040"];
var tableColor = "black";

/**Messages Contantes*/

var MAJ = "Mise à jour";
var URL = "http://userscripts.org/scripts/show/80548";//
var URLS = "http://userscripts.org/scripts/source/80548.user.js";//
var first = true;
var upDateButton = document.createElement("span");
var buttonsText = ["Espionnage", "Options"];
var buttons = ["", ""];
var VIEW = {
	SPY : 0,
	SETTINGS : 1
};
var title = "Titre";
var sessionTitle = "Liste des espionnages";
var spyTitle = "Activité d`espionnage";
var PLANET = "planète";
var NB = "__Number__";
var SPY = "__SpyReport__";

var playerName;
var server = location.href.split('/')[2];

/**************************************************************
 *                                                            *
 *                          Objects                           *
 *                                                            *
 **************************************************************/
function SpyReport (){
	this.hisCoordonate = [0,0,0];
	this.myCoordonate = [0,0,0];
	this.hisName;
	this.myName;
	this.date;
}
SpyReport.prototype.toString = function(){
	var end = "|";
	var text = "";
	text += this.hisCoordonate[0] + end;
	text += this.hisCoordonate[1] + end;
	text += this.hisCoordonate[2] + end;
	text += this.myCoordonate[0] + end;
	text += this.myCoordonate[1] + end;
	text += this.myCoordonate[2] + end;
	text += this.hisName + end;
	text += this.myName + end;
	text += this.date;
	return text;
}
SpyReport.prototype.fromString = function(text){
	var splits = text.split("|");
	this.hisCoordonate[0] = splits[0];
	this.hisCoordonate[1] = splits[1];
	this.hisCoordonate[2] = splits[2];
	this.myCoordonate[0] = splits[3];
	this.myCoordonate[1] = splits[4];
	this.myCoordonate[2] = splits[5];
	this.hisName = splits[6];
	this.myName = splits[7];
	this.date = splits[8];	
}
/**************************************************************
 *                                                            *
 *                     Fonction principale.                   *
 *                                                            *
 **************************************************************/

function mainFunction(){
	if(!first)return;
	if(isSpyReport())
		registerSpyReport(readReport());
	else if(isSpyPage())
		initInterface();
	else 
		addSpyButton();
}
function getIdentifier(){
	if(document.getElementById("playerName"))
		playerName = document.getElementById("playerName").getElementsByTagName("span")[0].innerHTML;
	else
		playerName = getElementsByList("wrapper", ["div", "table", "tbody", "tr", "td"], [1,0,0,1,0]).innerHTML;
}
function isSpyReport(){
	var tmp;
	first = false;
	if(!(tmp=getElementsByList("wrapper",["div", "table", "tbody", "tr", "td"],[1,0,0,2,0]))) return false;
	if(!strContains(tmp.innerHTML, spyTitle)) return false;
	//if(!(getElementsByList("wrapper",["div", "table", "tbody", "tr", "td", "span"],[1,0,0,0,0,2]))) return false;
	return true;
}
function isSpyPage(){first = false;return strContains(document.location.toString(), "&Detector");}
function readReport(){
	var spy = new SpyReport();
	var text = getElementsByList("wrapper",["div", "div"],[4,0]).innerHTML;

	var begin, end, splits;
	begin = text.indexOf(PLANET) + PLANET.length +1;
	end = text.indexOf("<a") -1;
	spy.hisName = text.substring(begin, end);
	
	begin = text.indexOf(">[") +2;
	end = text.indexOf("</a>") -1;
	splits = text.substring(begin, end).split(":");
	spy.hisCoordonate = splits;
		
	begin = text.lastIndexOf(PLANET) + PLANET.length +1;
	end = text.lastIndexOf("<a") -1;
	spy.myName = text.substring(begin, end);
	
	begin = text.lastIndexOf(">[") +2;
	end = text.lastIndexOf("</a>") -1;
	splits = text.substring(begin, end).split(":");
	spy.myCoordonate = splits;
	
	var str = getElementsByList("wrapper",["div", "table", "tbody", "tr", "td"],[1,0,0,3,0]).innerHTML;
	splits = str.split(" ");
	var day = splits[0];
	var hours = splits[1];
	splits = day.split(".");
	var date = new Date("Tue, " + splits[1] + " " + splits[0] + " " + splits[2] + " " + hours);
	spy.date = date.getTime();
	
	return spy;
}
function registerSpyReport(spy){
	getIdentifier();
	var number;
	var tmp = cookies.get(server + "_" + playerName + NB, "")
	if (tmp =="") number = 0;
	else number = parseInt(tmp);
	
	cookies.set(server + "_" + playerName + SPY + number, spy.toString());
	cookies.set(server + "_" + playerName + NB, (++number));
}
function initInterface(){
	addSpyButton();
	checkUpDate();
	switchDisplay(VIEW.SPY);
	document.getElementById("box").insertBefore(upDateButton, document.getElementById("inhalt"));
}
function initButtons(){
	var text = "<center><h2 id=SpyTitle><font color=orange>" + title + "</font><br\><br\></h2></center>"
	document.getElementById("inhalt").innerHTML = text;
	for(var i = buttons.length-1; i >= 0 ; --i){
		buttons[i] = document.createElement("input");
		buttons[i].type="submit";
		buttons[i].setAttribute("style", "width: 150px");
		buttons[i].setAttribute("id", "button" + i);
		buttons[i].value = buttonsText[i];
		insertAfter(buttons[i], document.getElementById("SpyTitle"));
		if(i!=0)
			insertAfter(makeSpaces(10), document.getElementById("SpyTitle"));
	}
}
function switchDisplay(digit){
	var text = "";
	switch(digit){
		case VIEW.SETTINGS:
			text = makeSettings();
			break;
		case VIEW.SPY:
			text = makeSpySummary();
			break;
		default:
			break;
	}
	initButtons();
	document.getElementById("inhalt").innerHTML += text;
	document.getElementById("button0").addEventListener("click", function(event){switchDisplay(0);},true);
	document.getElementById("button1").addEventListener("click", function(event){switchDisplay(1);},true);
}
function addSpyButton(){
	var buttonAccess = document.getElementById("links");
	if(!buttonAccess) return;
	buttonAccess = buttonAccess.getElementsByTagName("ul")[0].getElementsByTagName("li")[7];
	var button = document.createElement("li");
	button.innerHTML = '<a target="_self" accesskey="" href="' + buttonAccess.getElementsByTagName("a")[0].href + "&Detector" + '" class="menubutton "><span class="textlabel">Detector</span></a>';
	buttonAccess = document.getElementById("links").getElementsByTagName("ul")[0].getElementsByTagName("li")[10];
	insertAfter(button, buttonAccess);
}
function checkUpDate(){
	GM_xmlhttpRequest({
		method: 'GET', url: URL, onload: 
		function(answers){
			var page = answers.responseText;
			var versionOfScript = page.substring(page.indexOf('<b>Version</b> : ')+17, page.length);
			versionOfScript = versionOfScript.substring(1, versionOfScript.indexOf("]"));
			if(version != versionOfScript)
				upDateButton.innerHTML = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='" + URLS + "'><font color=orange> " + MAJ + "</font></a><br><br>";	
		}
	});
}
function makeSpySummary(){
	//lire tout les rapports
	//effacer tout les rapports
	//effacer de la mémoire les rapports trop anciens
	//sauver tout
	//crée une liste avec occurence quand hisCoordonate et myCoordonate ==
	//
}
function makeSettings(){
	//temps
	//seuil aff
	//seuil highlight
}
/**************************************************************
 *                                                            *
 *                   Pack utilitaires  0.3                    *
 *                                                            *
 **************************************************************/

/**
 * Atteint un élément à partir d'un chemin de tags.
 * @param id L'identifier de l'objet de départ
 * @param tags Liste de tags àsuivre
 * @param index Liste des index associés au tags
 * @return l'objet correspondant ou null si il n'est pas trouvé
 */
function getElementsByList(id, tags, index){
	if(tags.length != index.length)return; //donnée invalide
	var elem;
	for(var i = 0, elem = document.getElementById(id) ; elem && i < tags.length; elem = elem.getElementsByTagName(tags[i])[index[i]], ++i);
	return (elem ? elem : null);
}

/**
 * Objet permettant l'utilisation des scripts sur Firefox, Opera et Chrome
 * @param author L'auteur du script
 * @param scriptName Le nom du script
 * @return Un objet cookies initialisé pour la type de navigateur détecté
 * 
 * Fonctions :
 * - set : Modifie une valeur, param : Clé et valeur
 * - get : Récupère une valeur, param : Clé et valeur par défaut dans le cas ou la clé ne correspond a rien
 * - erase : Supprime la valeur, param : Clé de la valeur a supprimer
 * - eraseAll : Permet de supprimer plusieurs valeurs en une fois, param : string que dois contenir les clés à supprimer
 * - xmlhttpRequest : Recupère le contenu d'un page, param : l'url de la page et la fonction à appliquer
 * - popUp : crée une petite fenêtre d'alert  
 */
function Cookies (author, scriptName){
	//Namespace pour les navigateur sans GM
	 var namespace = author + "/" + scriptName + "/";
	
	//Firefox
	if(navigator.userAgent.indexOf('Firefox')>-1){
		this.set = function (key, value){GM_setValue(key, value);};
		this.get = function (key, defaultValue){return GM_getValue(key, defaultValue);};
		this.erase = function (key){GM_deleteValue(key);};
		this.eraseAll =
		function(str){	
			var keys = GM_listValues();
			for (var i=0, key=null; key=keys[i]; i++){
				if(key.indexOf(str)!=-1)
					GM_deleteValue(key);
			}
		};
		this.xmlhttpRequest = function (URL, function_) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: URL,
				onload: function_
			});
		};
		this.popup = 
		function popUp(message, failed, time){
			unsafeWindow.tb_remove();
			if (failed)	unsafeWindow.$("#fadeBoxStyle").attr("class", "failed");
			else unsafeWindow.$("#fadeBoxStyle").attr("class", "success");
			unsafeWindow.$("#fadeBoxContent").html(message);
			unsafeWindow.$("#fadeBox").stop(false, true).show().fadeOut(time);
		};	
	}
	
	//Autres navigateurs
	else{
		this.set = function (key, value){localStorage.setItem(namespace + key, value);};
		this.get = function (key, defaultValue){var res = localStorage.getItem(namespace + key); return (res ? res : defaultValue);};
		this.erase = function (key){localStorage.removeItem(namespace + key);};
		this.eraseAll = function(key){};
		this.xmlhttpRequest = function(URL, function_){alert("Not yet Implemented");};
		this.popup = function(){alert("Not yet Implemented");};
	}
}

/**
 * Objet vecteur, contient un Array.
 * Les elements d'un vector doivent impérativement avoir une fonction equals
 * 
 * Fonctions :
 * - contains : Renvoit vrai si le vecteur contient l'objet
 * - indexOf : Renvoit l'indice de l'élément dans le vecteur, -1 s'il n'est pas présent
 * - fromArray : Converti un array en vecteur
 * - toArray : Converti un vecteur en array
 * - size : Renvoit la taille du vecteur
 */
function Vector(){this.vector = new Array();}
Vector.prototype.contains = function (elem){return (this.indexOf(elem) != -1);};
Vector.prototype.indexOf = function (elem){for(var i = 0; i < vector.length; ++i)	if(vector[i].equals(elem))return i;	return -1;};
Vector.prototype.fromArray = function (array){for(var i = 0; i < array.length; ++i)this.vector.push(array[i]);};
Vector.prototype.toArray = function(){return this.vector;};
Vector.prototype.size = function(){return this.vector.length;};

/**
 * Fonction de convertion
 * @todo : permettre de changer de separateur
 */

function addPoints(nombre){
	var signe = '';
	if (nombre<0){
		nombre = Math.abs(nombre);
		signe = '-';
	}
	nombre=parseInt(nombre);
	var str = nombre.toString(), n = str.length;
	if (n <4){return signe + nombre;} 
	return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
}


/** Fonction HTML*/

function insertAfter(element, after) {
	var dad = after.parentNode;
	if(dad.lastchild == after)
		dad.appendChild(element);
	else 
		dad.insertBefore(element, after.nextSibling);
}
function makeSpaces(nbr){
	var spaces = "";
	for(var i=0; i<nbr; i++) spaces += '\u00a0';
	return document.createTextNode(spaces);
}

function makeLineBreak(){return document.createElement("br");}

function insertAfter(elem, after) {
	var dad = after.parentNode;
	if(dad.lastchild == after)
		dad.appendChild(elem);
	else 
		dad.insertBefore(elem, after.nextSibling);
}
function show(elem){elem.style.display = "";}
function hide(elem){elem.style.display = "none";}
	
/**
 * Object Element
 * 
 * Fonctions : 
 * - create : Crée un élément
 * - show : Montre l'objet
 * - hide : Cache l'objet
 * - addSpaces : Ajoute des espaces
 * - addLineBreak : Ajoute un saut de ligne
 * - clear : Efface tout le contenu de l'objet
 * - insertAfter : Insert après le paramètre
 * - insertBefore : Insert avant le paramètre
 */
function Element(type){this.element = this.create(type);}
Element.prototype.create = function (type){element = document.createElement(type);};
Element.prototype.show = function (){element.style.display = "";};
Element.prototype.hide = function (){element.style.display = "none";};
Element.prototype.addSpaces = function (number){for(var i=0; i<number; i++) element.innerHTML += '\u00a0';};
Element.prototype.addLineBreak = function (){element.innerHTML += "<br>";};
Element.prototype.clear = function () {element.innerHTML = "";};
Element.prototype.setContent = function (text) {element.innerHTML = text;};
Element.prototype.getContent = function () {return element.innerHTML;};
Element.prototype.insertAfter = function(after){insertAfter(this.element, after);};
Element.prototype.insertBefore = 
	function (before) {
		var dad = before.parentNode;
		dad.insertBefore(element, before);
	}

/**Fonction sur les strings*/
/**
 * String compare
 * 1 : a > b (ex bbb > aaa)
 * -1 : b > a
 * 0 : a==b
 */
function strcmp(str1, str2){
	var a = str1.toLowerCase();
	var b = str2.toLowerCase();
	if (a == b) return 0;
	return (a>b?1:-1);
}
function strContains(text, str){return (text.indexOf(str)!=-1);}


////////////////////////////////////////////////////////////////////////
var cookies = new Cookies("Lame noire", "Detector");
mainFunction();
