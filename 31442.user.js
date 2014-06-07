// ==UserScript==
// @name           Travian: Lista de Ataques
// @version        0.1
// @description    Visualizar toda la lista de ataques de tu alianza.
// @author         Vaskkitto
// @date           2008-08-08
// @namespace      travian
// @include        http://*.travian*.*/*
// @exclude        http://board.travian*.*
// @exclude        http://forum.travian*.*
// @exclude        http://help.travian*.*/*
// @exclude        http://shop.travian*.*
// @exclude        http://www.travian*.*/*
// @exclude        http://*.travian*.*/activate.php*
// @exclude        http://*.travian*.*/ad/*
// @exclude        http://*.travian*.*/ajax.php*
// @exclude        http://*.travian*.*/anleitung.php*
// @exclude        http://*.travian*.*/anmelden.php*
// @exclude        http://*.travian*.*/chat/*
// @exclude        http://*.travian*.*/geschichte.php*
// @exclude        http://*.travian*.*/gutscheine.php*
// @exclude        http://*.travian*.*/hilfe.php*
// @exclude        http://*.travian*.*/impressum.php*
// @exclude        http://*.travian*.*/index.php*
// @exclude        http://*.travian*.*/links.php*
// @exclude        http://*.travian*.*/log*.php*
// @exclude        http://*.travian*.*/manual.php*
// @exclude        http://*.travian*.*/spielregeln.php*
// @exclude        http://*.travian*.*/support.php*
// @exclude        http://*.travian*.*/tutorial.php*
// ==/UserScript==
/* 
 * This script is licensed under the Attribution-Noncommercial-Share Alike 3.0 Unported License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/
 */


//set global variables
var SCRIPT = {
	url: 'http://userscripts.org/scripts/source/30039.user.js',
	version: '0.1'
};
var server = location.hostname;
var suffix;
var lang = new Array();
var image = new Array();
var listDefaultPosition = '2px_2px';  //top_left
var listWidth = 500;
var minListWidth = 200;
var dom = new DOMUtils();

//launch main function after doc is loaded
window.addEventListener('load', main, false);


//main function
function main()
{
	var html = document.body.innerHTML;
	if (html.indexOf(' <!-- ERROR ITEM CONTAINER') != -1) window.location.reload();
	
	//create unique suffix
	var ownerId = getOwnerId();
	if (ownerId) suffix = server+'_'+ownerId;
	else return;
	
	//load languages
	loadLanguage();
	
	//load images
	loadImage();
	
	//create list
	createAttacksList();
	
	//check for updates
	updateScript(SCRIPT);
}


//retrieve owner id
function getOwnerId()
{
	var user = dom.xs('//table[@id="navi_table"]//a[starts-with(@href, "spieler.php?uid=")]');
	var id = (user) ? getParamFromUrl(user.href, 'uid') : '';
	return id;
}


//load language
function loadLanguage()
{
	var ext = server.substring(server.lastIndexOf('.')+1);
	
	
	//Spanish (default)
	lang['EVENTSLOG'] = 'Lista de Ataques';
	lang['DRAG'] = 'Drag';
	lang['MINIMIZE'] = 'Minimizar';
	lang['MAXIMIZE'] = 'Mazimizar';
	lang['NEW_VERSION'] = 'Hay una nueva versión de "Travian: Attacks List"';
	lang['UPDATE_NOW'] = 'Actualizar Ahora';
	
	switch(ext) {
		case 'it': //Italian, translation by dbKiller
			lang['EVENTSLOG'] = 'Lista attacchi';
			lang['DRAG'] = 'Trascina';
			lang['MINIMIZE'] = 'Riduci';
			lang['MAXIMIZE'] = 'Ingrandisci';
			lang['NEW_VERSION'] = 'E\' disponibile una nuova versione di "Travian: Attacks List"';
			lang['UPDATE_NOW'] = 'Aggiornare adesso';
			break;
	}
}


//load images
function loadImage()
{
	image['minimize']='R0lGODlhDAAMAIAAAGBgYP///yH5BAEAAAEALAAAAAAMAAwAAAINjI+py+0PG5hU0RrzKwA7';
	image['maximize']='R0lGODlhDAAMAIAAAGBgYP///yH5BAEAAAEALAAAAAAMAAwAAAIVjI+pCe2N3osKUHZzsPhwLTnLSBoFADs%3D';
}


//create list
function createAttacksList()
{
	//create list-wrapper div
	var listDiv = dom.cn('div');
	listDiv.id = 'attacksList_'+suffix;
	listDiv.style.zIndex = 666;
	listDiv.style.clear = 'both';
	listDiv.style.position = 'relative';
	listDiv.style.width = listWidth+'px';
	listDiv.style.backgroundColor = '#FFFFFF';
	listDiv.style.border = '1px solid #C0C0C0';
	//add list to page
	document.body.appendChild(listDiv);
	
	//create title div
	var titleDiv = dom.cn('div');
	titleDiv.style.height = '18px';
	titleDiv.style.width = (listWidth-12)+'px'; //-12px minDiv width
	titleDiv.style.cssFloat = 'left';
	titleDiv.style.fontWeight = 'bold';
	titleDiv.style.fontSize = '10';
	titleDiv.style.textAlign = 'center';
	titleDiv.style.borderBottom = '1px solid #C0C0C0';
	titleDiv.style.backgroundColor = '#FFFFFF';
	titleDiv.style.backgroundImage = 'url(img/un/a/c2.gif)';
	titleDiv.title = lang['DRAG'];
	titleDiv.style.cursor = 'move';
	titleDiv.style.MozUserSelect = 'none';
	titleDiv.appendChild(dom.ct( lang['EVENTSLOG'] ));
	makeDraggable(listDiv, titleDiv);
	
	//create minimize/maximize list div
	var minDiv = dom.cn('div');
	minDiv.style.height = '18px';
	minDiv.style.width = '12px';
	minDiv.style.cssFloat = 'left';
	minDiv.style.borderBottom = '1px solid #C0C0C0';
	minDiv.style.backgroundColor = '#FFFFFF';
	minDiv.style.backgroundImage = 'url(img/un/a/c2.gif)';
	
	//append bar divs
	listDiv.appendChild(titleDiv);
	listDiv.appendChild(minDiv);
	
	//get list
	var listBody = dom.cn('div');
	listBody.id = 'attacksListBody';
	listBody.style.width = '100%';
	listBody.style.cssFloat = 'left';
	listBody.style.clear = 'both';
	listBody.style.position = 'relative'; 
	listDiv.appendChild(listBody);
	
	//update list position
	var listCoords = GM_getValue('attacksList_'+suffix, '');
	if (!listCoords) {
		listCoords = listDefaultPosition; //default value
		GM_setValue('attacksList_'+suffix, listDefaultPosition);
	}
	listCoords = listCoords.split('_');
	listDiv.style.top = listCoords[0];
	listDiv.style.left = listCoords[1];
	listDiv.style.position = 'absolute';
	listDiv.style.zIndex = 666;
	
	//minimize/maximize list
	var listIsMinimized = GM_getValue('minimize_'+suffix);
	if (!listIsMinimized) {
		listIsMinimized = false; //default value
		GM_setValue('minimize_'+suffix, listIsMinimized);
	}
	if (listIsMinimized) {
		listBody.style.display = 'none';
		listDiv.style.height = '18px';
		listDiv.style.width = minListWidth+'px';
		titleDiv.style.width = (minListWidth-12)+'px'; //-12px minDiv width
		if (dom.id('adressbuch')) listBody.firstChild.style.display = 'none';
		var img = makeEventMaximize(titleDiv);
		minDiv.appendChild(img);
		//remove bar bottom border
		titleDiv.style.borderBottom = 'none';
		minDiv.style.borderBottom = 'none';
	} else {
		listBody.style.display = '';
		// listDiv.style.height = '263px';
		// listDiv.style.width = listWidth+'px';
		if (dom.id('adressbuch')) listBody.firstChild.style.display = '';
		var img = makeEventMinimize(titleDiv);
		minDiv.appendChild(img);
		//populate listBody
		getAttacksList();
	}
}


//get attacks list from allianz.php?s=3 page
function getAttacksList()
{
	var url = document.URL;
	url = url.substring(0, url.lastIndexOf('/')+1);
	url = url+'allianz.php?s=3';
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function (responseDetails)
				{
					if (responseDetails.status != 200) return;
					var response = responseDetails.responseText;
					var div = dom.cn('div', response);
					var ansDoc = document.implementation.createDocument('', '', null);
					ansDoc.onload = ansDoc.appendChild(div);
					//get data
					var lmid2Div = ansDoc.getElementById('lmid2');
					var eventsTable = lmid2Div.getElementsByTagName('table')[0];
					if (eventsTable) eventsTable.deleteRow(0);
					else eventsTable = lmid2Div.getElementsByTagName('p')[0];
					//append data
					var attacksListBody = dom.id('attacksListBody');
					attacksListBody.appendChild(eventsTable);
				}
	});
}


//create minimize event
function makeEventMinimize(titleDiv)
{
	var img = dom.cn('img');
	img.title = lang['MINIMIZE'];
	img.style.width = '12px';
	img.style.height = '12px';
	img.style.paddingTop = '3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,'+image['minimize'];
	img.addEventListener('click', foo=function(){minimizeList();}, false);
	titleDiv.addEventListener('dblclick', bar=function(){minimizeList();}, false);
	return img;
}


//create maximize event
function makeEventMaximize(titleDiv)
{
	var img = dom.cn('img');
	img.title = lang['MAXIMIZE'];
	img.style.width = '12px';
	img.style.height = '12px';
	img.style.paddingTop = '3px';
	img.style.cursor = 'pointer';
	img.src = 'data:image/png;base64,'+image['maximize'];
	img.addEventListener('click', foo=function(){maximizeList();}, false);
	titleDiv.addEventListener('dblclick', bar=function(){maximizeList();}, false);
	return img;
}


//minimize list
function minimizeList()
{
	GM_setValue('minimize_'+suffix, true);
	reloadAddressBook();
}


//maximize list
function maximizeList()
{
	GM_setValue('minimize_'+suffix, false);
	reloadAddressBook();
}


//reload list
function reloadAddressBook()
{
	var oldList = dom.id('attacksList_'+suffix);
	if (oldList) {
		oldList.parentNode.removeChild(oldList);
	}
	createAttacksList();
}


/************************ from Drag n drop******************************/
// by Risi http://userscripts.org/
var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;
function mouseCoords(ev){
	return {x:ev.pageX, y:ev.pageY};
}
function getMouseOffset(target, ev){
	var docPos  = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}
function getPosition(e){
	var left = 0;
	var top = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e   = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	return {x:left, y:top};
}
function mouseMove(ev){
	var target = ev.target;
	var mousePos = mouseCoords(ev);
	if (dragObject){
		dragObject.style.position = 'absolute';
		dragObject.style.top  = (mousePos.y - mouseOffset.y) +'px';
		dragObject.style.left   = (mousePos.x - mouseOffset.x) +'px';
	}
	lMouseState = iMouseDown;
	return false;
}
function mouseUp(ev){
	if (dragObject) {
		setOption(dragObject.id, dragObject.style.top +'_'+ dragObject.style.left);
	}
	dragObject = null;
	iMouseDown = false;
}
function mouseDown(ev){
	var target = ev.target;
	iMouseDown = true;
	if (target.getAttribute('DragObj')){
		return false;
	}
}
function makeDraggable(parent, item){
	document.addEventListener('mousemove', mouseMove, false);
	document.addEventListener('mousedown', mouseDown, false);
	document.addEventListener('mouseup', mouseUp, false);
	if (!parent||!item) return;
	item.addEventListener('mousedown',function(ev){
		dragObject  = parent;
		mouseOffset = getMouseOffset(parent, ev);
		return false;
	}, false);
}
function setOption(key, value) {
	GM_setValue(key, value);
}
/************************ end Drag n drop*******************************/


/************************ from QP Targets*****************************/
// from QP of http://userscripts.org/
/**
* getParamFromUrl
* @param {String} url The string of the URL
* @param {String} urlParam The param being searched in the URL
*/
function getParamFromUrl(url, urlParam) {
	var res = "&" + url.substring(url.indexOf("?") + 1); //exclude "?" and before that
	var searchStr = "&" + urlParam + "=";
	var pos = res.indexOf(searchStr);
	if (pos != -1) {
		res = res.substring(res.indexOf(searchStr) + searchStr.length);
		var endPos = (res.indexOf("&") > res.indexOf("#")) ? res.indexOf("&") : res.indexOf("#");
		if (endPos != -1) {
			res = res.substring(0, endPos);
		}
		return res;
	} else {
		return;
	}
}
/************************ end QP Targets *****************************/


/************************* from FranMod *****************************/
function DOMUtils(doc, ctxt, html) {
	this.cn = function(tag, html) {
		var elem = this.document.createElement(tag);
		if (html) elem.innerHTML = html;
		return elem;
	}

	this.ct = function(text) {
		return this.document.createTextNode(text);
	}

	this.id = function(id) {
		return this.document.getElementById(id);
	}

	this.tag = function(tag) {
		return this.document.getElementsByTagName(tag);
	}

	this.xs = function(xpath) {
		var res = this.document.evaluate(xpath, this.context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return res.singleNodeValue;
	}

	this.xa = function(xpath) {
		var arr = [];
		var xpr = this.document.evaluate(xpath, this.context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; item = xpr.snapshotItem(i); i++)
			arr.push(item);
		return arr.length == 0? null: arr;
	}

	this.xo = function(xpath) {
		var ret = this.document.evaluate(xpath, this.context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		return ret; //no snapshot
	}

	if (!doc) doc = document;
	if (!ctxt) ctxt = doc;
	if (html) {
		this.document = doc.implementation.createDocument('', '', null);
		this.context = doc.createElement('div');
		this.context.innerHTML = html;
	        ansDoc.appendChild(this.context);
	}
	else {
		this.document = doc;
		this.context = ctxt;
	}
}
/************************** end FranMod *****************************/


//update the script
function updateScript(SCRIPT) {

	var d = new Date();
	var t = d.getTime();
	var lastUpdate = parseInt(GM_getValue('lastUpdate',0));
	if (t-lastUpdate >= 1000*60*60*24) {
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: SCRIPT.url + '?source', // don't increase the 'installed' count just for checking
			onload: function(result) {
				if (result.status != 200) return;
				if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
				var theOtherVersion = parseFloat(RegExp.$1);
				if (theOtherVersion <= parseFloat(SCRIPT.version)) {
					return;
				} else {
					if (window.confirm(lang['NEW_VERSION']+' (v'+theOtherVersion+')!\n\n'+lang['UPDATE_NOW']+'?\n')) {
						GM_openInTab(SCRIPT.url);
					}
				}
			}
		});
		
		GM_setValue('lastUpdate',t+'');
	}
}
