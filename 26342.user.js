// ==UserScript==
// @name           Travian Notes
// @version        1.0
// @namespace      traviannotes
// @description    Add notes to the villages
// @include        http://*.travian*.*/*.php*
// @exclude        http://*.travian*.*/hilfe.php*
// @exclude        http://*.travian*.*/log*.php*
// @exclude        http://*.travian*.*/index.php*
// @exclude        http://*.travian*.*/anleitung.php*
// @exclude        http://*.travian*.*/impressum.php*
// @exclude        http://*.travian*.*/anmelden.php*
// @exclude        http://*.travian*.*/gutscheine.php*
// @exclude        http://*.travian*.*/spielregeln.php*
// @exclude        http://*.travian*.*/links.php*
// @exclude        http://*.travian*.*/geschichte.php*
// @exclude        http://*.travian*.*/tutorial.php*
// @exclude        http://*.travian*.*/manual.php*
// @exclude        http://*.travian*.*/ajax.php*
// @exclude        http://*.travian*.*/ad/*
// @exclude        http://*.travian*.*/chat/*
// @exclude        http://forum.travian*.*
// @exclude        http://board.travian*.*
// @exclude        http://shop.travian*.*
// ==/UserScript==

var server = location.hostname;
var lang = new Array();
var dom = new DOMUtils();
var data = null;

var isKarte = location.pathname == '/karte.php';
var isLandPage = isKarte && (location.search.indexOf('d=') != -1);
var isMap = isKarte && !isLandPage;


window.addEventListener('load', main, false);

function main() {
	loadLanguage();
	loadNotes();

	if (isKarte) {
		setImagesCSS();
	}

	if (isMap) {
		containerNotes();
		registerUpdateFunction();
		updateMapTile();
	}
	
	if (isLandPage) {
		createNoteLink();
	}
}

function loadNotes() {
	data = new CodeMap(GM_getValue('tn_data_' + server, '<!-- -->'));

	var old = dom.id('tn_info');
	if (old) old.parentNode.removeChild(old);
	
	// If others scripts wants to access this data easily
	// just look on CodeMap.decode().
	var span = dom.cn('span', data.encode());
	span.id = 'tn_info';

	document.body.appendChild(span);
}


function setImagesCSS() {
	var icon = loadImages();

	var cssText;
	cssText  = '.noteicon { width:16px;height:16px;position:absolute;z-index:1000;cursor:help;background:transparent url(data:image/png;base64,' + icon['Note'] + ') no-repeat scroll left top; }';
	cssText += '.notebutton { width:16px;height:16px;display:block;float:left;text-indent:-1000px;overflow:hidden;outline:0; }';
	cssText += '.notetext {font-family:Arial,Helvetica,sans-serif;font-size:12px;width:100%;height:150px;margin:3px 0;padding:0;border:0;background-color:transparent; }';
	cssText += '.btSaveNote { background:transparent url(data:image/png;base64,' + icon['Save'] + ') no-repeat scroll left top;float:right; }';
	cssText += '.btCloseNote { background:transparent url(data:image/png;base64,' + icon['Close'] + ') no-repeat scroll left top;float:right; }';
	cssText += '#tn_note { width:150px;padding:3px;border:1px solid #efefef;background-color:#ffffe1;z-index:3000;position:absolute;display:block;cursor:move; }';

	var style = dom.cn('style', cssText);
	style.setAttribute('type','text/css');
	style.setAttribute('media','screen');
	dom.tag('head')[0].appendChild(style);
}

function containerNotes() {
	var container = dom.cn('div');
	container.id = 'tn_container';
	dom.id('map_content').appendChild(container);
}

function registerUpdateFunction() {
	var shiftTile = unsafeWindow.lf;
	unsafeWindow.lf = function(x, y, i, j) {
		shiftTile(x, y, i, j);
		try { updateTile(i, j); } catch (e) { GM_log(e); };
	};
	var infoTile = unsafeWindow.ve;
	unsafeWindow.ve = function(i, j, inf) {
		infoTile(i, j, inf);
		try { updateTile(i, j); } catch (e) { GM_log(e); };
	};
}

function updateTile(i, j) {
	clearNote();
	var area = dom.id('a_' + i + '_' + j);
	var nid = getLandId(area.href);
	var txt = data.get(nid);
	if (txt) createNote(nid, txt);

	function clearNote() {
		var nt = dom.id('note_' + i + '_' + j);
		if (!nt) return;
		
		var ct = dom.id('tn_container');
		ct.removeChild(nt);
	}

	function createNote(nid, txt) {
		var p = posKarte(i, j);
		var iconDiv = dom.cn('div');
		iconDiv.id = 'note_' + i + '_' + j;
		iconDiv.setAttribute('style','left:' + p.x + 'px;top:' + p.y + 'px;');
		iconDiv.className = 'noteicon';
		iconDiv.title = txt;
		iconDiv.setAttribute('nid', nid);
		iconDiv.addEventListener('click', displayNote, false); 
	//	iconDiv.setAttribute('title',note);
		dom.id('tn_container').appendChild(iconDiv);
	}

	function posKarte() {
		var y = 6 - j;
		var x = i;

		var px = (263 - 36 * y) + 37 * x;
		var py = (112 + 20 * y) + 20 * x;
		return { x: px, y: py };
	}
}

function updateMapTile() {
	for (var i = 0; i < 7; i++)
		for (var j = 0; j < 7; j++)
			updateTile(i, j);
}

function createNoteLink() {
	var tbody = dom.xs('//div[@class="map_details_actions"]/table/tbody');
	if (!tbody) return;

	var id = getLandId(document.location.href);
	
	var addButton = dom.cn('a', '\u00BB ' + lang['Note']);
	addButton.setAttribute('nid', id);
	addButton.href = 'javascript:void(0)';
	addButton.addEventListener('click', displayNote, true);
	
	var row = dom.cn('tr');
	var cell = dom.cn('td');
	cell.appendChild(addButton);
	row.appendChild(cell);
	tbody.appendChild(row);
}

function displayNote() {
	// this: reffers to <a>
	var nid = this.getAttribute('nid');
	var old = dom.id('tn_note');

	if (old && old.getAttribute('nid') == nid)
		return;
	else if (old)
		document.body.removeChild(old);

	var pos = GM_getValue('tn_pos_' + server, '215px_215px').split('_');
	var noteDiv = dom.cn('div');
	noteDiv.id = 'tn_note';
	noteDiv.style.left = pos[0];
	noteDiv.style.top = pos[1];
	noteDiv.setAttribute('nid', nid);
	noteDiv.addEventListener('mousedown', mouseDownEvent, false);

	var a;
	a = dom.cn('a', lang['Save']);
	a.className = 'notebutton btSaveNote';
	a.title = lang['Save'];
	a.href = 'javascript:void(0)';
	a.addEventListener('click', saveNote, false);
	noteDiv.appendChild(a);

	a = dom.cn('a', lang['Close']);
	a.className = 'notebutton btCloseNote';
	a.title = lang['Close'];
	a.href = 'javascript:void(0)';
	a.addEventListener('click', cancelNote, false);
	noteDiv.appendChild(a);

	var text = dom.cn('textarea');
	text.name = 'notecontent';
	text.className = 'notetext';
	text.cols = 40;
	text.rows = 20;
	if (data.get(nid)) text.value = data.get(nid);
	noteDiv.appendChild(text);

	document.body.appendChild(noteDiv);
	text.focus();

	/** Buttons **/
	function saveNote() {
		var nid = this.parentNode.getAttribute('nid');
		data.put(nid, this.parentNode.lastChild.value);
		GM_setValue('tn_data_' + server, data.encode());
		loadNotes();
		if (isMap) updateMapTile();
		document.body.removeChild(this.parentNode);
	}

	function cancelNote() {
		document.body.removeChild(this.parentNode);
	}

	/*** Drag & Drop ***/
	var onMouseMove;
	var onMouseUp;
	function mouseDownEvent(e) {
		if (e.target.id != 'tn_note')
			return;
		
		// this: reffers to noteDiv
		this.setAttribute('offsetX', e.pageX - this.offsetLeft);
		this.setAttribute('offsetY', e.pageY - this.offsetTop);

		onMouseMove = createMouseMoveEvent(this);
		onMouseUp = createMouseUpEvent(this);
		document.addEventListener('mousemove', onMouseMove, false);
		document.addEventListener('mouseup', onMouseUp, false);
	}

	function createMouseUpEvent(target) {
		return function(e) {
			GM_setValue('tn_pos_' + server, target.style.left + '_' + target.style.top);
			document.removeEventListener('mousemove', onMouseMove, false);
			document.removeEventListener('mouseup', onMouseUp, false);
		}
	}

	function createMouseMoveEvent(target) {
		return function(e) {
			var offsetX = target.getAttribute('offsetX') * 1;
			var offsetY = target.getAttribute('offsetY') * 1;
			target.style.left = (e.pageX - offsetX) + 'px';
			target.style.top = (e.pageY - offsetY) + 'px';
		};
	}
}

function getLandId(ref) {
	var reg = /karte.php\?[d|z]=([0-9]*)[\S]*/;
	ref.match(reg);
	return RegExp.$1;
}

function CodeMap(txt) {
	this.put = function(key, val) {
		if (vk(key)) return;
		this.data['_' + key] = rsc(val);
	}
	
	this.get = function(key) {
		return this.data['_' + key];
	}

	this.remove = function(key) {
		if (vk(key)) return;
		this.data['_' + key] = null;
	}

	this.decode = function(txt) {
		this.data = new Array();
		txt = txt.substring(5, txt.length - 4); // Remove comments
		var res = txt.split('_@_').map(function(e) {return e.split('_._')});
		for each (var el in res) {
			this.put(el[0], el[1]);
		}
	}
	
	this.encode = function() {
		var txt = '<!-- ';
		var first = true;
		for (var i in this.data) {
			if (this.data[i]) {
				if (!first) txt += '_@_';
				first = false;
				txt += i.substring(1) + '_._' + this.data[i];
			}
		}
		txt += ' -->';
		return txt;
	}

	function vk(key) {
		// Check if the key is not a valid village id
		return (key * 1 == 0) || isNaN(key * 1);
	}
	
	function rsc(txt) {
		// Replace specia characters used in the encoding decoding phase
		if (txt == '') return null;
		return txt.replace('_._', '_ . _', 'g').replace('_@_', '_ @ _', 'g').
			replace('<!--', '<! --', 'g').replace('-->', '-- >', 'g');
	}
	
	this.data = new Array();
	if (txt) this.decode(txt);
}

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

function loadImages() {
	var icon = new Array();
	icon['Note']  = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK5SURBV' +
			'BgZBcFPaJZ1HADwz+95n3e6uTnREGdljRKtGCYiHTLxkIUmQeeCOnXzVnQIoi5BQV08TMo6GIiHiKI6ZEWgszzEmtpqSDP7s9ycm9NN977vnuf37fNJEWH/G6df6l' +
			'676vki2YXVSCAhEpFVOU8uzMX36daNV88MH+oApIhw8O2zZz45vOuhokjrgoYAIALC7NKKEz8vmP67fee3XyfWjwwfakMJRSNt6yob68avaRQpkYhMHVlVheWV2r6' +
			'tffYPjNi4eLyncWCodf7jI1Jr6sUSUkq9EdHoajQkIZALZOpEIWlPf27r4jndQy/oH9xp4c9tJk4de7eEIEGBlAgJREqKRP/yKXVcsH7r4+Ynf9eVOvrWbtK7YUt/' +
			'CRBB2SBJIiW5Doqkd3nEllWj+gef1r56UldP8tfYhJt3UhTtuR0FRBAoU6FISYFGkaxePG1LfKv/gYNa/30oNW9o9vbpzvOOXj+wsvvwZ5cKCGSkRJGSIiWtK19af' +
			'/uU/gef1ZoaVjRXdG7db+bMed173zJVD2QoIFdEkBG4fflrPYs/2vjIMzrTxzS6QvvWfWZGRs3tGZY2bFdnoICcQ0QQTI+e1L3wk5W82dWLR2Qtt+fvNnNuwuLeo1' +
			'LvgNXNpK4CFFBn6iAysxc/8vCel636Z8SlL84a+2be+Hdjlh57R9WzWaDZKFSdCpSQq5AjvPlLx9DkrM74VwZ3POHm7JzJsUk/7PvU9Sv3yipwYlPTSjuDEqqqVtc' +
			'MrG0a/+Oa9z8Ytnv7oOXNOyw9edyjffeIIIIL1yqRw0qrAiVU7ZyrnKNTS+te/9flFCYlkJdIS5UcRJEUOSnLlKs6V1DCSqueWdPVuOu1oc6aiCgEGdDfXYIIuptJ' +
			'SnKzkRbrKk9BCSnFe0+9cvq5lNLOED0AgkAIIEAr5zxaFk7A/5IUWNTkV3l/AAAAAElFTkSuQmCC';
	icon['Save']  = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKfSURBV' +
			'DjLpZPrS1NhHMf9O3bOdmwDCWREIYKEUHsVJBI7mg3FvCxL09290jZj2EyLMnJexkgpLbPUanNOberU5taUMnHZUULMvelCtWF0sW/n7MVMEiN64AsPD8/n83uucQ' +
			'Di/id/DBT4Dolypw/qsz0pTMbj/WHpiDgsdSUyUmeiPt2+V7SrIM+bSss8ySGdR4abQQv6lrui6VxsRonrGCS9VEjSQ9E7CtiqdOZ4UuTqnBHO1X7YXl6Daa4yGq7' +
			'vWO1D40wVDtj4kWQbn94myPGkCDPdSesczE2sCZShwl8CzcwZ6NiUs6n2nYX99T1cnKqA2EKui6+TwphA5k4yqMayopU5mANV3lNQTBdCMVUA9VQh3GuDMHiVcLCS' +
			'3J4jSLhCGmKCjBEx0xlshjXYhApfMZRP5CyYD+UkG08+xt+4wLVQZA1tzxthm2tEfD3JxARH7QkbD1ZuozaggdZbxK5kAIsf5qGaKMTY2lAU/rH5HW3PLsEwUYy+Y' +
			'CcERmIjJpDcpzb6l7th9KtQ69fi09ePUej9l7cx2DJbD7UrG3r3afQHOyCo+V3QQzE35pvQvnAZukk5zL5qRL59jsKbPzdheXoBZc4saFhBS6AO7V4zqCpiawuptw' +
			'QG+UAa7Ct3UT0hh9p9EnXT5Vh6t4C22QaUDh6HwnECOmcO7K+6kW49DKqS2DrEZCtfuI+9GrNHg4fMHVSO5kE7nAPVkAxKBxcOzsajpS4Yh4ohUPPWKTUh3PaQEpt' +
			'IOr6BiJjcZXCwktaAGfrRIpwblqOV3YKdhfXOIvBLeREWpnd8ynsaSJoyESFphwTtfjN6X1jRO2+FxWtCWksqBApeiFIR9K6fiTpPiigDoadqCEag5YUFKl6Yrciw' +
			'0VOlhOivv/Ff8wtn0KzlebrUYwAAAABJRU5ErkJggg==';
	icon['Close'] = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJdSURBV' +
			'DjLpZP7S1NhGMf9W7YfogSJboSEUVCY8zJ31trcps6zTI9bLGJpjp1hmkGNxVz4Q6ildtXKXzJNbJRaRmrXoeWx8tJOTWptnrNryre5YCYuI3rh+8vL+/m8PA/Pkw' +
			'Ig5X+y5mJWrxfOUBXm91QZM6UluUmthntHqplxUml2lciF6wrmdHriI0Wx3xw2hAediLwZRWRkCPzdDswaSvGqkGCfq8VEUsEyPF1O8Qu3O7A09RbRvjuIttsRbT6' +
			'HHzebsDjcB4/JgFFlNv9MnkmsEszodIIY7Oaut2OJcSF68Qx8dgv8tmqEL1gQaaARtp5A+N4NzB0lMXxon/uxbI8gIYjB9HytGYuusfiPIQcN71kjgnW6VeFOkgh3' +
			'XcHLvAwMSDPohOADdYQJdF1FtLMZPmslvhZJk2ahkgRvq4HHUoWHRDqTEDDl2mDkfheiDgt8pw340/EocuClCuFvboQzb0cwIZgki4KhzlaE6w0InipbVzBfqoK/q' +
			'RH94i0rgokSFeO11iBkp8EdV8cfJo0yD75aE2ZNRvSJ0lZKcBXLaUYmQrCzDT6tDN5SyRqYlWeDLZAg0H4JQ+Jt6M3atNLE10VSwQsN4Z6r0CBwqzXesHmV+BeoyA' +
			'Uri8EyMfi2FowXS5dhd7doo2DVII0V5BAjigP89GEVAtda8b2ehodU4rNaAW+dGfzlFkyo89GTlcrHYCLpKD+V7yeeHNzLjkp24Uu1Ed6G8/F8qjqGRzlbl2H2dzj' +
			'pMg1KdwsHxOlmJ7GTeZC/nesXbeZ6c9OYnuxUc3fmBuFft/Ff8xMd0s65SXIb/gAAAABJRU5ErkJggg==';
	return icon;
}

function loadLanguage() {
	var ext = server.substring(server.lastIndexOf('.') + 1);

	lang['Note'] = 'Note';
	lang['Save'] = 'Save';
	lang['Close'] = 'Close';

	switch(ext){
	case "at":
	case "de":
	case "org":
		lang['Note'] = 'Notiz';
		lang['Save'] = 'Speichern';
		lang['Del'] = 'Löschen';
		lang['Close'] = 'Schließen';
		break;
	case "net":
	case "ar":
		lang['Note'] = 'Nota';
		lang['Save'] = 'Guardar';
		lang['Del'] = 'Suprimir';
		lang['Close'] = 'Cerrar';
		break;
	case "bg":
		lang['Note'] = 'Бележка';
		lang['Save'] = 'Запази';
		lang['Del'] = 'Изтрии';
		lang['Close'] = 'Затвори';
		break;
	case "cz":
		lang['Note'] = 'Poznámka';
		lang['Save'] = 'Uložit';
		lang['Del'] = 'Smazat';
		lang['Close'] = 'Zavřít';
		break;
	case "hu":
		lang['Note'] = 'Jegyzet';
		lang['Save'] = 'Mentés';
		lang['Del'] = 'Törlés';
		lang['Close'] = 'Bezárás';
		break;
	case "nl":
		lang['Note'] = 'Kladblok';
		lang['Save'] = 'Opslaan';
		lang['Del'] = 'Verwijder';
		lang['Close'] = 'Sluit';
		break;
	case "no":
		lang['Note'] = 'Huskelapp';
		lang['Save'] = 'Lagre';
		lang['Del'] = 'Slett';
		lang['Close'] = 'Lukk';
		break;
	case "pl":
		lang['Note'] = 'Notes';
		lang['Save'] = 'Zapisz';
		lang['Del'] = 'Usuń';
		lang['Close'] = 'Zamknij';
		break;
	case "pt":
	case "br":
		lang['Note'] = 'Nota';
		lang['Save'] = 'Guardar';
		lang['Del'] = 'Remover';
		lang['Close'] = 'Fechar';
		break;
	case "se":
		lang['Note'] = 'Notering';
		lang['Save'] = 'Spara';
		lang['Del'] = 'Ta bort';
		lang['Close'] = 'Stäng';
		break;
	case "sk":
		lang['Note'] = 'Poznámka';
		lang['Save'] = 'Uložiť';
		lang['Del'] = 'Zmazať';
		lang['Close'] = 'Zavrieť';
		break;
	case "tr":
		lang['Note'] = 'Not Bırak';
		lang['Save'] = 'Kaydet';
		lang['Del'] = 'Sil';
		lang['Close'] = 'Kapat';
		break;
	case "hk":
		lang['Note'] = '筆記';
		lang['Save'] = '儲存筆記';
		lang['Del'] = '刪除筆記';
		lang['Close'] = '關閉';
		break;
	}
}
