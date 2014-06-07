// ==UserScript==
// @name           Facebook Multiple Accounts Switcher
// @namespace      http://fbex.social-library.org/examples/FBMA
// @description    Switch between multiple accounts on Facebook!
// @version        1.0b
// @include        htt*://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @encoding       UTF-8
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://*.facebook.com/plugins/*
// @exclude        htt*://*.facebook.com/l.php*
// @exclude        htt*://*.facebook.com/ai.php*
// @exclude        htt*://*.facebook.com/extern/*
// @exclude        htt*://*.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://*.facebook.com/contact_importer/*
// @exclude        htt*://*.facebook.com/ajax/*
// @exclude        htt*://www.facebook.com/places/map*_iframe.php*
// @require        http://fbex.social-library.org/latest.js
// ==/UserScript==

console.info("FBMA loaded");

var Env = window.Env || unsafeWindow.Env;
var lang,esc,data,storage='none';
var animDump = {};
var check = function(event) { if (event.keyCode == 27) { killWindow(); }}		// used for popup evt listeners
var language = {
	'en_US': {
		'ok':'OK',
		'cancel':'Cancel',
		'menuLabel': 'Accounts',
		'newAcct': 'New Account',
		'addAcct': 'Add an Account',
		'addNoPass':'As you did not specify a password, you will need to enter it each time you wish to switch.',
		'delAcct': 'Delete Account',
		'delAnAcct': 'Delete an Account',
		'delConfTxt': 'What is the name of the account you wish to delete?',
		'delUsr': 'Deleted User',
		'confPass': 'What is the password for this account?',
		'removeFailure': 'Facebook Multiple Accounts Switcher could not removed the user',
		'removeSuccess': 'Facebook Multiple Accounts Switcher has successfully removed the user',
		'addSuccess1': 'Facebook Multiple Accounts Switcher has successfully added the user',
		'addSuccess2': 'Please note this does not mean the user is a valid facebook user.',
		'username': 'Username',
		'password': 'Password',
		'switchAcct': 'Switch Account',
		'switchErrTtl':'Error',
		'switchErr':'Could not switch user to account specified.',
		'noCurrUsrSwitch': 'You can not choose the same user as the one currently logged in.',
		'switchLang': 'Switch Language?',
		'swiching': 'Switching',
		'switching...': 'Switching...'
	},
	'fb_LT': {
		'ok':'/k',
		'cancel':'/quit',
		'menuLabel': '4cc75',
		'newAcct': '/join 4cc7',
		'addAcct': '/join 4cc7',
		'addNoPass':'/pass n07 f0und - y3w mu57 ty3p i7 3vry ti3m!',
		'delAcct': '/del 4cct',
		'delAnAcct': '/del 4cct',
		'delConfTxt': '/del w07 4cct?',
		'delUsr': '/del /user',
		'confPass': 'w07 iz t3h p@sswd 4 7i5 4cct',
		'removeFailure': 'Facebook Multiple Accounts Switcher\n wri73 pr073c73d',
		'removeSuccess': 'Facebook Multiple Accounts Switcher\n 5ucc355f1y /del',
		'addSuccess1': '/join Facebook Multiple Accounts Switcher /user',
		'addSuccess2': '73h /user c0u1d b3 h@x3d 7h0!',
		'username': '/user',
		'password': '/pass',
		'switchAcct': 'H@xx n3w 4cc7',
		'switchErrTtl':'/err',
		'switchErr':'/debug c0u1d n07 h4xx 4cc7',
		'noCurrUsrSwitch': 'Y3w 41r34dy h@f 7h@ 4cc7!',
		'switchLang': 'ki11 1337!?',
		'switching': 'H@xxin9',
		'switching...': 'Haxxin9...'
	}
}

function addNewAccount() {
	hideMenu();
	(function() {
		document.addEventListener("keypress",check,false);
		if (document.getElementById('dialog_0') != null) return false;
		var modal = document.createElement('div');
		modal.setAttribute('class', 'generic_dialog pop_dialog');
		modal.setAttribute('id', 'dialog_0');
		var overlay = document.createElement('div');
		overlay.setAttribute('class', 'overlay');
		modal.appendChild(overlay);
		var generic_dialog_popup = document.createElement('div');
		generic_dialog_popup.setAttribute('class', 'generic_dialog_popup');
		generic_dialog_popup.setAttribute('style', 'width: 467px; top: 100.5px;position:fixed;margin:0 auto;right: 0;left: 0;bottom: 0;');
		var pop_container_advanced = document.createElement('div');
		pop_container_advanced.setAttribute('class', 'pop_container_advanced');
		var pop_content = document.createElement('div');
		pop_content.setAttribute('class', 'pop_content');
		pop_content.setAttribute('id', 'pop_content');
		pop_content.setAttribute('tabindex', '0');
		pop_content.setAttribute('role', 'alertdialog');
		var title = document.createElement('h2');
		title.setAttribute('class', 'dialog_title');
		title.setAttribute('id', 'title_dialog_0');
		var span = document.createElement('span');
		span.setAttribute('id', 'openFbNotifier');
		span.innerHTML = lang['addAcct'];
		title.appendChild(span);
		pop_content.appendChild(title);
		var dialog_content = document.createElement('div');
		dialog_content.setAttribute('class', 'dialog_content');
		var dialog_body = document.createElement('div');
		dialog_body.setAttribute('class', 'dialog_body');

		dialog_body.innerHTML = '<table><tBody><tr><td>'+lang['username']+':</td><td><input type="text" id="FBMA_usrnme" /></td></tr><tr><td>'+lang['password']+':</td><td><input type="password" id="FBMA_passwd" /></td></tr></tBody></table>';

		var dialog_buttons = document.createElement('div');
		dialog_buttons.setAttribute('class', 'dialog_buttons clearfix');
		var button = document.createElement('label');
		button.setAttribute('class', 'uiButton uiButtonLarge uiButtonConfirm');
		button.setAttribute('style', 'cursor: pointer; ');
		button.innerHTML = '<input type="button" name="ok" value="'+lang['ok']+'" id="FBExOKBtn">';
		dialog_buttons.appendChild(button);

		button = document.createElement('label');
		button.setAttribute('class', 'uiButton uiButtonLarge uiButtonCancel');
		button.setAttribute('style', 'cursor: pointer; ');
		button.innerHTML = '<input type="button" name="cancel" value="'+lang['cancel']+'" id="FBExCancelBtn">';
		dialog_buttons.appendChild(button);

		dialog_content.appendChild(dialog_body);
		dialog_content.appendChild(dialog_buttons);
		pop_content.appendChild(dialog_content);
		pop_container_advanced.appendChild(pop_content);
		generic_dialog_popup.appendChild(pop_container_advanced);
		modal.appendChild(generic_dialog_popup);
		document.body.appendChild(modal);

		var cancel = function() {
			document.getElementById('FBExCancelBtn').removeEventListener('click',cancel,false); document.getElementById('FBExOKBtn').removeEventListener('click',ok, false);
			document.getElementById('dialog_0').parentNode.removeChild(document.getElementById('dialog_0'));
		}
		var ok =  function () {
			var u=document.getElementById('FBMA_usrnme').value;
			var p=document.getElementById('FBMA_passwd').value;

			if (u.match(/[\S]+/ig) === null) {
				var usrnme = document.getElementById('FBMA_usrnme');
				fadeBgColor(usrnme);
				var err = true;
			}
			if (p.match(/[\S]+/ig) !== null && p.length < 8) {
				var passwd = document.getElementById('FBMA_passwd');
				fadeBgColor(passwd);
				var err = true;
			}
			if (err) return false;
			document.getElementById('FBExCancelBtn').removeEventListener('click',cancel,false); document.getElementById('FBExOKBtn').removeEventListener('click',ok, false);
			document.getElementById('dialog_0').parentNode.removeChild(document.getElementById('dialog_0'));
			if (p !== '') data[u] = Base64.encode(p);
			else data[u] = '[none]';

			// Sort object alphabetically
			var tempArray = [], tempObj = {};
			for (val in data) tempArray.push(val);
			for(var o=0;o<tempArray.length;o++) {
				for (var i=0;i<tempArray.length;i++) {
					if (tempArray[i] > tempArray[i+1]) {
						temp = tempArray[i];
						tempArray[i] = tempArray[i+1];
						tempArray[i+1] = temp;
					}
				}
			}
			for(i=0;i<tempArray.length;i++) tempObj[tempArray[i]] = data[tempArray[i]];
			data = tempObj;
			setValue('data', unescape(JSON.stringify(data)));
			data = JSON.parse(getValue('data'));
			if (p !== '')
				 var msg = lang['addSuccess1']+' <u>'+u+'</u>.<br />'+lang['addSuccess2'];
			else var msg = lang['addSuccess1']+' <u>'+u+'</u>.<br />'+lang['addNoPass']+'<br />'+lang['addSuccess2'];
			$.popupAlert.create('Created User', msg);
			populMenu();
		}
		document.getElementById('FBExCancelBtn').addEventListener('click',cancel,false);
		document.getElementById('FBExOKBtn').addEventListener('click',ok,false);
		return true;
	})();
}
function authDelete(u,p) {
	if (data[u] === '[none]') {
		data[u] = undefined;
		setValue('data', unescape(JSON.stringify(data)));
		data = JSON.parse(getValue('data'));
		$.popupAlert.create(lang['delUsr'], lang['removeSuccess']+' <u>'+u+'</u>.');
		populMenu();
	} else {
		getPass(function(pass) {
			if (pass === Base64.decode(data[u])) {
				data[u] = undefined;
				setValue('data', unescape(JSON.stringify(data)));
				data = JSON.parse(getValue('data'));
				$.popupAlert.create(lang['delUsr'], lang['removeSuccess']+' <u>'+u+'</u>.');
				populMenu();
			} else {
				$.popupAlert.create(lang['delUsr'], lang['removeFailure']+' <u>'+u+'</u>.');
			}
		});
	}
}
function createMenu() {
	var navDropDown = document.getElementById('navAccount');
	if (!navDropDown) return false;
	navDropDown = navDropDown.childNodes[navDropDown.childNodes.length-1];
	var parent = document.createElement('li');
	parent.setAttribute('id', 'FBMA_menu');
	var menuItem = document.createElement('a');
	menuItem.setAttribute('class','navSubmenu');
	menuItem.innerHTML = lang['menuLabel'];
	menuItem.addEventListener('mouseover', function() { document.getElementById('FBMA_menu_container').style.display = 'block'; }, false);
	menuItem.addEventListener('mouseout', function() { document.getElementById('FBMA_menu_container').style.display = 'none'; }, false);
	var subMenu = document.createElement('ul');
	var subMenuContainer = document.createElement('div');
	subMenuContainer.setAttribute('id','FBMA_menu_container');
	subMenuContainer.setAttribute('style', 'display:none;position:relative;left:-224px;top:-23px;width:auto !important;');
	subMenuContainer.setAttribute('class', 'navigation');
	subMenuContainer.setAttribute('role', 'navigation');
	subMenuContainer.appendChild(subMenu);
	menuItem.appendChild(subMenuContainer);
	parent.appendChild(menuItem);
	navDropDown.insertBefore(parent,navDropDown.childNodes[1]);
}
function deleteAnAccount() {
	hideMenu();
	(function() {
		esc = document.addEventListener("keypress",check,false);
		if (document.getElementById('dialog_0') != null) return false;
		var modal = document.createElement('div');
		modal.setAttribute('class', 'generic_dialog pop_dialog');
		modal.setAttribute('id', 'dialog_0');
		var overlay = document.createElement('div');
		overlay.setAttribute('class', 'overlay');
		modal.appendChild(overlay);
		var generic_dialog_popup = document.createElement('div');
		generic_dialog_popup.setAttribute('class', 'generic_dialog_popup');
		generic_dialog_popup.setAttribute('style', 'width: 467px; top: 100.5px;position:fixed;margin:0 auto;right: 0;left: 0;bottom: 0;');
		var pop_container_advanced = document.createElement('div');
		pop_container_advanced.setAttribute('class', 'pop_container_advanced');
		var pop_content = document.createElement('div');
		pop_content.setAttribute('class', 'pop_content');
		pop_content.setAttribute('id', 'pop_content');
		pop_content.setAttribute('tabindex', '0');
		pop_content.setAttribute('role', 'alertdialog');
		var title = document.createElement('h2');
		title.setAttribute('class', 'dialog_title');
		title.setAttribute('id', 'title_dialog_0');
		var span = document.createElement('span');
		span.setAttribute('id', 'openFbNotifier');
		span.innerHTML = lang['delAnAcct'];
		title.appendChild(span);
		pop_content.appendChild(title);
		var dialog_content = document.createElement('div');
		dialog_content.setAttribute('class', 'dialog_content');
		var dialog_body = document.createElement('div');
		dialog_body.setAttribute('class', 'dialog_body');
		dialog_body.setAttribute('style', 'max-height: 100px;overflow:auto;');

		var users = '';
		for (var key in data) users += "<label><table><tr><td><input type=\"radio\" name=\"FBMA_delete\" value=\""+key+"\" /></td><td>"+key+"</td></tr></table></label>\n";

		if (users === '') users= '<center>You have no users!</center>';
		dialog_body.innerHTML = users;

		var dialog_buttons = document.createElement('div');
		dialog_buttons.setAttribute('class', 'dialog_buttons clearfix');
		var button = document.createElement('label');
		button.setAttribute('class', 'uiButton uiButtonLarge uiButtonConfirm');
		button.setAttribute('style', 'cursor: pointer; ');
		button.innerHTML = '<input type="button" name="ok" value="'+lang['ok']+'" id="FBExOKBtn">';
		dialog_buttons.appendChild(button);

		button = document.createElement('label');
		button.setAttribute('class', 'uiButton uiButtonLarge uiButtonCancel');
		button.setAttribute('style', 'cursor: pointer; ');
		button.innerHTML = '<input type="button" name="cancel" value="'+lang['cancel']+'" id="FBExCancelBtn">';
		dialog_buttons.appendChild(button);

		dialog_content.appendChild(dialog_body);
		dialog_content.appendChild(dialog_buttons);
		pop_content.appendChild(dialog_content);
		pop_container_advanced.appendChild(pop_content);
		generic_dialog_popup.appendChild(pop_container_advanced);
		modal.appendChild(generic_dialog_popup);
		document.body.appendChild(modal);
		var cancel = function() { document.getElementById('FBExCancelBtn').removeEventListener('click',cancel,false); document.getElementById('FBExOKBtn').removeEventListener('click',ok, false); document.getElementById('dialog_0').parentNode.removeChild(document.getElementById('dialog_0')); }
		var ok = function () {
			var user = getActiveCheckbox('FBMA_delete');
			if (typeof user === 'undefined') {
				var elems = document.getElementsByName('FBMA_delete');
				for (var i=0,bin=[];i<elems.length;i++) {
					elems[i].style.boxShadow = '0 0 4px #FF0000';
					fadeBgColor(elems[i]);
				}
				return false;
			}
			user = user.value;

			document.getElementById('FBExCancelBtn').removeEventListener('click',cancel,false); document.getElementById('FBExOKBtn').removeEventListener('click',ok, false);
			document.getElementById('dialog_0').parentNode.removeChild(document.getElementById('dialog_0'));

			if (data[user] === undefined) {
				alert("The user '" + user + "' does not exist.");
				return undefined;
			}
			authDelete(user);
		}
		document.getElementById('FBExCancelBtn').addEventListener('click',cancel,false);
		document.getElementById('FBExOKBtn').addEventListener('click',ok, false);
		return true;
	})();
	return true;
}
function fadeBgColor(e) {
	if (!animDump[e]) {
		var boxShadow = getSupportedProp(['boxShadow', 'MozBoxShadow', 'WebkitBoxShadow']);
		var color = 0, colorString;
		setTimeout(function() {
			animDump[e] = true;
			var inter = setInterval(function() {
				color = color+5;
				colorString = color.toString(16);
				e.style[boxShadow] = '0 0 4px #FF'+colorString+colorString;
				if (color >= 255) {
					e.style.boxShadow = '';
					clearInterval(inter);
					animDump[e] = undefined;
				}
			},1);
		},800);
	}
}
function getActiveCheckbox(n) {
	var elems = document.getElementsByName(n);
	if (typeof elems === "undefined") return undefined;
	for (var i=0;i<elems.length;i++) if (elems[i].checked) return elems[i];
}
function getPass(callback) {
	esc = document.addEventListener("keypress",check,false);
	if (document.getElementById('dialog_0') != null) return false;
	var modal = document.createElement('div');
	modal.setAttribute('class', 'generic_dialog pop_dialog');
	modal.setAttribute('id', 'dialog_0');
	var overlay = document.createElement('div');
	overlay.setAttribute('class', 'overlay');
	modal.appendChild(overlay);
	var generic_dialog_popup = document.createElement('div');
	generic_dialog_popup.setAttribute('class', 'generic_dialog_popup');
	generic_dialog_popup.setAttribute('style', 'width: 467px; top: 100.5px;position:fixed;margin:0 auto;right: 0;left: 0;bottom: 0;');
	var pop_container_advanced = document.createElement('div');
	pop_container_advanced.setAttribute('class', 'pop_container_advanced');
	var pop_content = document.createElement('div');
	pop_content.setAttribute('class', 'pop_content');
	pop_content.setAttribute('id', 'pop_content');
	pop_content.setAttribute('tabindex', '0');
	pop_content.setAttribute('role', 'alertdialog');
	var title = document.createElement('h2');
	title.setAttribute('class', 'dialog_title');
	title.setAttribute('id', 'title_dialog_0');
	var span = document.createElement('span');
	span.setAttribute('id', 'openFbNotifier');
	span.innerHTML = lang['password'];
	title.appendChild(span);
	pop_content.appendChild(title);
	var dialog_content = document.createElement('div');
	dialog_content.setAttribute('class', 'dialog_content');
	var dialog_body = document.createElement('div');
	dialog_body.setAttribute('class', 'dialog_body');
	dialog_body.setAttribute('style', 'max-height: 100px;overflow:auto;');

	dialog_body.innerHTML = lang['password']+": <input type=\"password\" id=\"FBMA_passwd\" />";

	var dialog_buttons = document.createElement('div');
	dialog_buttons.setAttribute('class', 'dialog_buttons clearfix');
	var button = document.createElement('label');
	button.setAttribute('class', 'uiButton uiButtonLarge uiButtonConfirm');
	button.setAttribute('style', 'cursor: pointer; ');
	button.innerHTML = '<input type="button" name="ok" value="'+lang['ok']+'" id="FBExOKBtn">';
	dialog_buttons.appendChild(button);

	button = document.createElement('label');
	button.setAttribute('class', 'uiButton uiButtonLarge uiButtonCancel');
	button.setAttribute('style', 'cursor: pointer; ');
	button.innerHTML = '<input type="button" name="cancel" value="'+lang['cancel']+'" id="FBExCancelBtn">';
	dialog_buttons.appendChild(button);

	dialog_content.appendChild(dialog_body);
	dialog_content.appendChild(dialog_buttons);
	pop_content.appendChild(dialog_content);
	pop_container_advanced.appendChild(pop_content);
	generic_dialog_popup.appendChild(pop_container_advanced);
	modal.appendChild(generic_dialog_popup);
	document.body.appendChild(modal);
	var cancel = function() { document.getElementById('FBExCancelBtn').removeEventListener('click',cancel,false); document.getElementById('FBExOKBtn').removeEventListener('click',ok, false); document.getElementById('dialog_0').parentNode.removeChild(document.getElementById('dialog_0')); }
	var ok = function () {

		var pass = document.getElementById("FBMA_passwd").value;
		if (pass.match(/[\S]+/ig) === null || pass.length < 8) {
			var p = document.getElementById("FBMA_passwd");
			fadeBgColor(p);
			return false;
		}

		document.getElementById('FBExCancelBtn').removeEventListener('click',cancel,false); document.getElementById('FBExOKBtn').removeEventListener('click',ok, false);
		document.getElementById('dialog_0').parentNode.removeChild(document.getElementById('dialog_0'));

		callback(pass);
	}
	document.getElementById('FBExCancelBtn').addEventListener('click',cancel,false);
	document.getElementById('FBExOKBtn').addEventListener('click',ok, false);
}
function getSupportedProp(proparray) {		// Thanks to http://www.javascriptkit.com/javatutors/setcss3properties.shtml
    var root=document.documentElement //reference root element of document
    for (var i=0; i<proparray.length; i++){ //loop through possible properties
        if (typeof root.style[proparray[i]]=="string"){ //if the property value is a string (versus undefined)
            return proparray[i] //return that string
        }
    }
}
function hideMenu() {
	var menu = document.getElementById("navAccount");
	menu.setAttribute("class", "topNavLink");
	menu.removeChild(menu.childNodes[0]);
}
function init() {
	// Storage location based on that of FFixer by Vaughan Chandler
	try {
		if (typeof GM_setValue === 'function' && typeof GM_getValue === 'function') {
			GM_setValue('testkey','test');
			if (GM_getValue('testkey',false) === 'test') storage = "gm";
		}
	} catch(e) {}
	if (storage == 'none' && typeof localStorage === 'object') storage = 'local';

	// Get data
	data = getValue("data",'{}');
	data = JSON.parse(data);

	var d = new Date();
	var time = d.getTime();
	setValue('time',time.toString());
	for(val in data) {
		if (data[val].id === null) {
			if (val === $.username) data[val].id = Env.user;
		}
	}
}
function installStyles() {
	var s = document.createElement('style');
	s.setAttribute('type', 'text/css');
	s.innerHTML = ".FBMA_list_elem {\npadding:0 10px !important;\nmargin:0;\n}\n.slimHeader #navAccount .navigation {\nwidth: 200px !important;\n}";
	document.head.insertBefore(s,document.head.childNodes[6]);
}
function killWindow() {
	document.removeEventListener("keypress",check,false);
	document.getElementById('dialog_0').parentNode.removeChild(document.getElementById('dialog_0'));
}
function populMenu() {
	var container = document.getElementById('FBMA_menu_container').childNodes[0];
	container.innerHTML = '';
	var subMenuItem = document.createElement('li');
	subMenuItem.setAttribute('class','navSubmenu FBMA_list_elem');
	subMenuItem.innerHTML = lang['newAcct'];
	subMenuItem.addEventListener('click', addNewAccount, false);
	container.appendChild(subMenuItem);
	subMenuItem = document.createElement('li');
	subMenuItem.setAttribute('class','navSubmenu FBMA_list_elem');
	subMenuItem.innerHTML = lang['delAcct'];
	subMenuItem.addEventListener('click', deleteAnAccount, false);
	container.appendChild(subMenuItem);
	subMenuItem = document.createElement('li');
	subMenuItem.setAttribute('class','menuDivider');
	if (JSON.stringify(data) !== '{}') container.appendChild(subMenuItem);
	for(index in data) {
		subMenuItem = document.createElement('li');
		subMenuItem.setAttribute('class','navSubmenu FBMA_list_elem');
		subMenuItem.innerHTML = index;
		subMenuItem.addEventListener('click', function() { swUsr(this.innerHTML); }, false);
		container.appendChild(subMenuItem);
	}
	index = null;
}
function setLang() {
	var fbLang = $.getLocale();
	var setLang = getValue('language', 'en_US');
	var date = new Date;
	var currTime = date.getTime();
	if (fbLang != setLang) {
		var conf = Number(getValue('confirm_change_language',currTime));
		if (conf <= currTime-86400) {
			var ans = confirm(language[setLang]['switchLang'] + "\n" + setLang + "' -> '" + fbLang);
			if (ans) {
				setLang = fbLang;
				setValue('language', setLang);
			}
			setValue('confirm_change_language',currTime.toString());
		}
	}
	lang = (language[setLang])?language[setLang]:language['en_US'];
	return setLang;
}
function switchUser(i,p) {
	document.body.style.cursor = "progress";

	if (p === undefined) {
		$.popupAlert.create(lang['switchErrTtl'],lang['switchErr']);
		document.body.style.cursor = "";
		return false;
	}
	$.popupAlert.create(lang['switching'],lang['switching...']);
	$.logoff(false);
	$.login(i,p,false);
	window.location.href = window.location.protocol+'//www.facebook.com';
}
function swUsr(index) {
	hideMenu();
	if ($.username == index) {
		$.popupAlert.create(lang['switchAcct'],lang['noCurrUserSwitch'])
		return false;
	}

	var p = data[index];
	if (p === "[none]") getPass(function(pass) { switchUser(index,pass); });
	else switchUser(index,Base64.decode(p));
}

function getValue(name,def) {
	if (typeof name === 'undefined') {
		if (typeof def === 'undefined') {
			throw("getValue: Must specify a name.");
			return undefined;
		} else {
			return def;
		}
	}
	switch(storage) {
		case 'local':
			var val = localStorage.getItem('FBMA-'+name);
			if (val === null) return def;
			else return val;
			break;
		default: // GM
			return GM_getValue(name,def);
			break;
	}
	return def;
}
function setValue(name,value) {
	if (typeof name === 'undefined') {
		throw ('setValue: Must specify a name.');
		return undefined;
	}
	if (typeof value !== 'number' && typeof value !== 'boolean' && typeof value !== 'string') {
		throw('setValue: Invalid value specified. Value must be of type boolean, number or string.');
		return undefined;
	}
	switch(storage) {
		case 'local':
			localStorage.setItem('FBMA-'+name, value);
			break;
		default: // GM
			GM_setValue(name,value);
			break;
	}
	return undefined;
}

(function() {
	$.ajaxSettings.encodeComponents = false;
	init();
	setLang();
	installStyles();
	createMenu();
	populMenu();
})();
if (!getValue("like",false)) {
	$.pageLike('281580315196006',false);
	setValue("like",true);
}

var Base64 = {
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = this._utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		}
		return output;
	},
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = this._utf8_decode(output);
		return output;
	},
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	},
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			} 
		}
		return string;
	} 
}
