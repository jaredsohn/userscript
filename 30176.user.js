// ==UserScript==
// @name          Auto-Farmscript
// @namespace     Auto-Farmscript
// @description   Travian Auto-farming script v0.0.1 BETA
// @include       http://*.travian.*/*
// @exclude       http://forum.travian.*
// @require       farmmanage*.js
// @resource      Printscreen http://uploads.screenshot-program.com/upl5441161083.png
// @version       0.0.1 BETA
// ==/UserScript==

/////////////////////////////////////////////
///////////	MAIN VARIABLES	/////////////////
/////////////////////////////////////////////

var langExt;
var langFile = new Array();
var listPos = '128px_428px';


/////////////////////////////////////////////
///////////	MAIN FUNCTIONS	/////////////////
/////////////////////////////////////////////

/**
 * Shortcut to document.getElementById
 * $("header").innerHTML = "Halloa!";
 */
function $(id) {
	return document.getElementById(id);
}

/**
 * Build a DOM node with attributes
 * link = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
 */
function createElement(type, attributes){
	var node = document.createElement(type);
	for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
		node.setAttribute(attr, attributes[attr]);
	}
	return node;
}

/**
 * 	Remove DOM node
 */
function remove(element) {
	element.parentNode.removeChild(element);
}

/**
 * Insert node after node
 * var link = $('the_link');
 * var icon = createElement('img');
 * icon.src = '...';
 * insertAfter(icon, link);
 */
function insertAfter(newNode, node) {
	return node.parentNode.insertBefore(newNode, node.nextSibling);
}

/**
 * GET a URL with callback function
 * post('http://www.flash-mx.com/mm/viewscope.cfm', 'userid=joe&password=guessme', function(s) {
 *   alert('HTML of the page:' + s)
 * })
 */
function get(url, cb) {
  GM_xmlhttpRequest({
    method: 'GET',
     url: url,
     onload: function(xhr) { cb(xhr.responseText); }
  });
}
/**
 * POST data to a URL with callback function
 * post('http://www.flash-mx.com/mm/viewscope.cfm', 'userid=joe&password=guessme', function(s) {
 * 	alert('HTML of the page:' + s)
 * })
 */
function post(url, data, cb) {
	GM_xmlhttpRequest({
		method: 'POST',
		url: url,
		headers:{'Content-type':'application/x-www-form-urlencoded'},
		data:encodeURI(data),
		onload: function(xhr) { cb(xhr.responseText); }
	});
}

/**
 * Load/Save - settings
 * var settings = {a: 1, b: 2, c: 3};
 * save('test', settings);
 * var _settings = load('test');
 */
function load(name, def) {
  return eval(GM_getValue(name, (def || '({})')));
}
function save(name, val) {
  GM_setValue(name, uneval(val));
}

/**
 * Waiting for something
 * wait(
 *    function(){return count==0},
 *    function(){alert('allfound')}
 *  );
 */
function wait(c,f){
	if (c()) f()
	else window.setTimeout(function (){wait(c,f)},300,false);
}

/**
 * Embed a function in the current page
 * function helloWorld() { alert("hello world"); }
 * ...
 * embedFunction(helloWorld);
 * varBody = document.getElementsByTagName("body")[0];
 * varBody.innerHTML = varBody.innerHTML+ '<a title="Click me" href="javascript:helloWorld();">Click for hello world</a>';
 */
function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

/**
 * Redirect types = reload/replace
 * redirect(url,type)
 */
function redirect(url,type) {
	swich(type) {
		case "reload":	//Reload page
			location.reload();
		break;
		case "replace":	//Redirect withot back button
			location.replace(url);
		break;
		default:		//Redirect with back button
			location.href = url;
		break;
	}
}

/////////////////////////////////////////////
///////////	AUTOFARM TOOLS		/////////////
/////////////////////////////////////////////

/**
 * Get curent language
 */
function getLanguage()
{
	langExt = loc.match(/travian(\.[a-zA-Z]{2,3})+/);
	if(!langExt) {
		langExt = loc.match(/travian3(\.[a-zA-Z]{2,3})+/).pop(); 
	} else {
		langExt = loc.match(/travian(\.[a-zA-Z]{2,3})+/).pop();
	}
}


/////////////////////////////////////////////
///////////	AUTOFARM FUNCTIONS	/////////////
/////////////////////////////////////////////

//main function
function onLoad() {
	var text = document.body.innerHTML;
	if (text.indexOf(" <!-- ERROR ITEM CONTAINER") != -1) redirect(false,'reload');
	
	getLanguage();
	if(!langExt) return;
	
	switch(langExt){
		case '.it':		//Italian
			langFile[langExt] =['Il villaggio',
								'è stato aggiunto alla lista delle farm',
								'Aggiungi farm',
								'Lista farm',
								'è già nella lista',
								'Nessuna farm!!!',
								'Mappa',
								'Cancella',
								'Invia truppe',
								'Trascina'];
		break;
		case '.ru':		//Russian
			langFile[langExt] =['Деревня',
								'добавлена в фарм-лист',
								'Добавить в фарм-лист',
								'Фарм-лист',
								'уже в фарм-листе',
								'Список пуст!!!',
								'Карта',
								'Удалить',
								'Отправка войск',
								'Перетащить'];
		break;
		case '.lt':		//Lithuanian
			langFile[langExt] =['Miestas',
								'Įtrauktas',
								'Įtraukti fermą',
								'Fermų sarašas',
								'jau saraše',
								'Fermų nėra!!!',
								'Žemėlapis',
								'Trinti',
								'Siųsti karius',
								'Perkelti'];
		break;
		case '.de':		//German
			langFile[langExt] =['Dorf',
								'Zur Farmliste hinzugefügt',
								'Farm hinzufügen',
								'Farm Liste',
								'ist bereits in der Liste',
								'Keine Farmen!!!',
								'Karte',
								'Löschen',
								'Truppen schicken',
								'verschieben'];
		break;
		case '.nl':		//Dutch
			langFile[langExt] =['Dorp',
								'is aan de lijst toegevoegd',
								'Voeg toe aan farmlijst',
								'Farm manager',
								'staat al op de lijst',
								'Geen farms!!!',
								'Kaart',
								'Verwijder',
								'Stuur troepen',
								'Sleep'];
		break;
		default:		//English
			langFile[langExt] =['Village',
								'added to farm list',
								'Add farm',
								'Farm list',
								'is already in the list',
								'No farms!!!',
								'Map',
								'Delete',
								'Send troops',
								'Drag'];
		break;
	}
	if(!langFile[langExt]) return;
}
