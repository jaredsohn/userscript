// ==UserScript==
// @name        Ponyhoof
// @namespace   http://www.facebook.com/ponyhoof
// @run-at      document-start
// @version     1.337
// @icon        http://hoof.little.my/files/app32.png
// @description	Ponify Facebook and make it 20% cooler!
// @author      The Ponyhoof Team
// @homepage    http://ponyhoof.little.my
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// @include http://cdn-ponyhoof.netdna-ssl.com/*
// @include https://cdn-ponyhoof.netdna-ssl.com/*
// @include http://*.little.my/*
// @include https://*.little.my/*
// @match http://*.facebook.com/*
// @match https://*.facebook.com/*
// @match http://cdn-ponyhoof.netdna-ssl.com/*
// @match https://cdn-ponyhoof.netdna-ssl.com/*
// @match http://*.little.my/*
// @match https://*.little.my/*
// @exclude http://*.facebook.com/ai.php*
// @exclude http://*.facebook.com/l.php*
// @exclude http://*.channel.facebook.com/*
// @exclude http://static.*.facebook.com/*
// @exclude http://graph.facebook.com/*
// @exclude https://*.facebook.com/ai.php*
// @exclude https://*.facebook.com/l.php*
// @exclude https://*.channel.facebook.com/*
// @exclude https://s-static.*.facebook.com/*
// @exclude https://graph.facebook.com/*
// ==/UserScript==

/******************************************************************************
*  Please visit http://jointheherd.lttle.my for the official install!
*  
*  For Firefox: Please make sure you have installed Greasemonkey and it
*               is ACTIVE and RESTART your browser after installing
*  
*  For Opera: Please follow these instructions:
*             http://ponyhoof.little.my/opera
*  
*  For Safari: Please follow these instructions:
*              http://ponyhoof.little.my/safari
******************************************************************************/


(function() {
	if (window.location.hostname.indexOf('facebook.com') == -1 && window.location.hostname.indexOf('cdn-ponyhoof.netdna-ssl.com') == -1 && window.location.hostname.indexOf('little.my') == -1) {
		return;
	}
	
	/**
 * Hoof Framework
 * 
 * @author ngyikp (http://www.facebook.com/ngyikp)
 */
var d = document, w = window;
d.head = d.head || d.getElementsByTagName('head')[0];

var SIG = '[Hoof Framework]';
var FRIENDLYNAME = 'Hoof Framework';
var CANLOG = true;

var userSettings = {};

var USERAGENT = w.navigator.userAgent.toLowerCase();
var ISCHROME = /chrome/i.test(USERAGENT);
var ISFIREFOX = /firefox/i.test(USERAGENT);
var ISOPERA = /opera/i.test(USERAGENT);
var ISSAFARI = !ISCHROME && /safari/i.test(USERAGENT);
var ISMOBILE = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(USERAGENT);

if (typeof opera != 'undefined') {
	ISOPERA = ISOPERA || !!opera;
}

if (typeof unsafeWindow == 'undefined') {
	if (!ISFIREFOX) {
		// Breaks on Firefox <= 8
		var unsafeWindow = (function() {
			var div = d.createElement('div');
			div.setAttribute('onclick', 'return window;');
			return div.onclick();
		})();
	} else {
		// This is for Firefox bookmarklet users just in case
		var unsafeWindow = w;
	}
}
function log(msg) {
	//if (typeof GM_log == 'function') {
	//	GM_log(SIG + ' ' + msg);
	if (CANLOG) {
		if (typeof console !== 'undefined' && console.log) {
			console.log(SIG + ' ' + msg);
		}
	}
}

function dir(msg) {
	if (CANLOG) {
		if (typeof console !== 'undefined' && console.dir) {
			console.dir(msg);
		}
	}
}

function $(id) {
	return d.getElementById(id);
}

function randNum(min, max) {
	return min + Math.floor(Math.random() * (max - min + 1));
}

function hasClass(ele, c) {
	var regex = new RegExp("(^|\\s)"+c+"(\\s|$)");
	return (ele.className && regex.test(ele.className));
}

function addClass(ele, c) {
	if (!hasClass(ele, c)) {
		ele.className += ' '+c;
	}
}

function removeClass(ele, c) {
	ele.className = ele.className.replace(new RegExp('(^|\\s)'+c+'(?:\\s|$)','g'),'$1').replace(/\s+/g,' ').replace(/^\s*|\s*$/g,'');
}

function toggleClass(ele, c) {
	if (hasClass(ele, c)) {
		removeClass(ele, c);
	} else {
		ele.className += ' ' + c;
	}
}

function clickLink(el) {
	if (!el) {
		return false;
	}
	
	try {
		var evt = d.createEvent('MouseEvents');
		evt.initMouseEvent('click', true, true, w, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		el.dispatchEvent(evt);
		return true;
	} catch (e) {
		return false;
	}
}

function cookie(n) {
	try {
		return unescape(document.cookie.match('(^|;)?'+n+'=([^;]*)(;|$)')[2]);
	} catch (e) {
		return null;
	}
}

function injectManualStyle(css, id) {
	if ($('ponyhoof_style_'+id)) {
		return $('ponyhoof_style_'+id);
	}
	
	var n = d.createElement('style');
	n.type = 'text/css';
	n.id = 'ponyhoof_style_'+id;
	n.textContent = '/* '+SIG+' */'+css;
	d.head.appendChild(n);
	
	return n;
}

function fadeOut(ele, callback) {
	addClass(ele, 'ponyhoof_fadeout');
	
	w.setTimeout(function() {
		ele.style.display = 'none';
		
		if (callback) {
			callback(ele);
		}
	}, 250);
}

function getFbDomain() {
	if (w.location.hostname == 'beta.facebook.com') {
		return w.location.hostname;
	}
	return 'www.facebook.com';
}

function onPageReady(callback) {
	var _loop = function() {
		if (/loaded|complete/.test(d.readyState)) {
			callback();
		} else {
			setTimeout(_loop, 100);
		}
	};
	_loop();
}

function injectScriptByText(script) {
	var s = d.createElement('script');
	s.type = 'text/javascript';
	s.textContent = script;
	d.body.appendChild(s);
}

var loopClassName = function(name, func) {
	var l = d.getElementsByClassName(name);
	if (l) {
		for (var i = 0; i < l.length; i++) {
			func(l[i]);
		}
	}
};

function $$(parent, query, func) {
	var l = parent.querySelectorAll(query);
	if (l) {
		for (var i = 0; i < l.length; i++) {
			func(l[i]);
		}
	}
}

// Hacky code from http://www.javascripter.net/faq/browsern.htm
function getBrowserVersion() {
	var ua = navigator.userAgent;
	var fullVersion  = ''+parseFloat(navigator.appVersion); 
	var majorVersion = parseInt(navigator.appVersion, 10);
	var nameOffset, offset, ix;

	if (ua.indexOf('Opera') != -1) {
		// In Opera, the true version is after 'Opera' or after 'Version'
		offset = ua.indexOf('Opera');
		fullVersion = ua.substring(offset + 6);

		if (ua.indexOf('Version') != -1) {
			offset = ua.indexOf('Version');
			fullVersion = ua.substring(offset + 8);
		}
	} else if (ua.indexOf('MSIE') != -1) {
		// In MSIE, the true version is after 'MSIE' in userAgent
		offset = ua.indexOf('MSIE');
		fullVersion = ua.substring(offset + 5);
	} else if (ua.indexOf('Chrome') != -1) {
		// In Chrome, the true version is after 'Chrome'
		offset = ua.indexOf('Chrome');
		fullVersion = ua.substring(offset + 7);
	} else if (ua.indexOf('Safari') != -1) {
		// In Safari, the true version is after 'Safari' or after 'Version' 
		offset = ua.indexOf('Safari');
		fullVersion = ua.substring(offset + 7);

		if (ua.indexOf('Version') != -1) {
			offset = ua.indexOf('Version');
			fullVersion = ua.substring(offset + 8);
		}
	} else if (ua.indexOf('Firefox') != -1) {
		// In Firefox, the true version is after 'Firefox' 
		offset = ua.indexOf('Firefox');
		fullVersion = ua.substring(offset + 8);
	} else {
		throw "Unsupported browser";
	}

	if ((ix = fullVersion.indexOf(';')) != -1) {
		fullVersion = fullVersion.substring(0, ix);
	}
	if ((ix = fullVersion.indexOf(' ')) != -1) {
		fullVersion = fullVersion.substring(0, ix);
	}

	majorVersion = parseInt(''+fullVersion,10);
	if (isNaN(majorVersion)) {
		fullVersion = ''+parseFloat(navigator.appVersion); 
		majorVersion = parseInt(navigator.appVersion,10);
	}

	return {
		 major: majorVersion
		,full: fullVersion
	};
}

// Menu
var MENUS = {};
var Menu = function(id, p) {
	var k = this;
	
	k.id = id;
	MENUS['ponyhoof_menu_'+k.id] = k;
	k.menu = null;
	k.button = null;
	k.p = p;
	k.wrap = null;
	k.menuInner = null;
	k.afterClose = function() {};
	
	k.createButton = function(startText) {
		if (!startText) {
			startText = '';
		}
		
		var c = '<a href="#" class="uiButton ponyhoof_button_menu" role="button" aria-haspopup="1"><span class="uiButtonText">'+startText+'</span></a>';
		
		k.wrap = d.createElement('div');
		k.wrap.className = 'ponyhoof_menu_wrap';
		k.wrap.innerHTML = c;
		k.p.appendChild(k.wrap);
		
		k.button = k.wrap.getElementsByClassName('ponyhoof_button_menu')[0];
		
		return k.button;
	}
	
	k.createMenu = function() {
		if ($('ponyhoof_menu_'+k.id)) {
			k.menu = $('ponyhoof_menu_'+k.id);
			k.menuInner = k.menu.getElementsByClassName('uiMenuInner')[0];
			return k.menu;
		}
		
		k.injectStyle();
		
		k.menu = d.createElement('div');
		k.menu.className = 'ponyhoof_menu uiSelectorMenuWrapper';
		k.menu.id = 'ponyhoof_menu_'+k.id;
		k.menu.setAttribute('role', 'menu');
		//k.menu.style.display = 'none';
		k.menu.addEventListener('click', function(e) {
			e.stopPropagation();
			return false;
		}, false);
		k.wrap.appendChild(k.menu);
		
		var t = d.createElement('div');
		t.className = 'uiMenu uiSelectorMenu';
		k.menu.appendChild(t);
		
		k.menuInner = d.createElement('div');
		k.menuInner.className = 'uiMenuInner';
		t.appendChild(k.menuInner);
		
		/*d.body.addEventListener('keydown', function(e) {
			if (e.which == 27 && hasClass(k.wrap, 'openToggler')) { // esc
				k.close();
				e.stopPropagation();
				e.cancelBubble = true;
			}
		}, false);*/
		
		return k.menu;
	};
	
	k.attachButton = function() {
		k.button.addEventListener('click', function(e) {
			e.stopPropagation();
			
			k.toggle();
			
			return false;
		}, false);
	};
	
	k.createSeperator = function() {
		var sep = d.createElement('div');
		sep.className = 'uiMenuSeparator';
		k.menuInner.appendChild(sep);
	};
	
	k.createMenuItem = function(param) {
		var menuItem = new MenuItem(k);
		menuItem._create(param);
		
		k.menuInner.appendChild(menuItem.menuItem);
		
		return menuItem;
	};
	
	k.injectStyle = function() {
		var css = '';
		css += 'html .ponyhoof_dialog .ponyhoof_button_menu, .ponyhoof_menuitem_checked {background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAADdCAYAAABNAoDAAAADbElEQVR42u3Xv06aARTG4XN93oYm7eDgakw7OXsD3oBpByevBhRKVVSooIDrKR9TGxOhSRM5n8+T/MKf8C1neUMkAFBeLF5eUpIk1S4W80VKkqTaxXw+T0mSVLuYzeYpSZJqF7PnWUqSpNrF0/NTSpKk2sX0aZqSJKl2MZ0u30iSpHdtZ+90bW89H5PJJCVJ0vu3e3iWRycXr2q+X/dsPD7+SkmStB19/vr9rzFvPm/yXIzH45QkSdvTwfH5asyb102fifFo+UaSJG1VqzH/h9/HaPSQkiSpdvFwf5+SJKl2cXd3l5IkqXYxHA5TkiTVLm5vb1OSJNUurm9uUpIk1S6ur3+mJEmqXQwGg5QkSbWLH/1+SpKk2kW/30tJklS76F31UpIk1S6uLi9TkiTVLrrdbkqSpNpFp9NJSZJUO4MuSZJBlyRJBl2SJBl0SZJk0CVJMuiSJMmgS5Ikgy5Jkgy6JEkGXZIkGXRJkmTQJUmSQZckyaBLkiSDLkmSDLokSTLokiQZdEmSZNAlSZJBlyRJBl2SpPYPOgAAAAAAAAAAAAAAAAAAAAAAAAD/WW7AlQCg+Ki7DgAUH3VXAYDio+4aAFB81F0BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4cHb2TnNdrgQABewenuXRycWrmu9dBwAK+fTl2+TPMW8+uwoAFHRwfL4a8+bVNQCg+Ki7AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAW29/fz9dAQCKj7lBB4AWjLlBB4BC423MAaAl/8aNOQC0YNCNOQC0aNRdAwCKj7orAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwBq55AoAUHzMDToAtGDMDToAFBpvYw4ALfk3bswBoAWDbswBoEWj7hoAUHzUXQEAAAAAAN7yG6s7d/s7eB9vAAAAAElFTkSuQmCC") !important;background-repeat:no-repeat;}';
		
		css += 'html .ponyhoof_dialog .ponyhoof_button_menu {background-position:right 0;padding-right:23px;}';
		css += 'html .ponyhoof_button_menu:active, html .ponyhoof_button_menu:focus {background-position:right -98px;}';
		css += 'html .openToggler .ponyhoof_button_menu {background-color:#6D84B4;background-position:right -49px;border-color:#3B5998;border-bottom-color:#6D84B4;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;}';
		css += 'html .openToggler .ponyhoof_button_menu .uiButtonText {color:#fff;}';
		
		css += '.ponyhoof_menu_label {padding:7px 4px 0 0;}';
		css += '.ponyhoof_menu_label, .ponyhoof_menu_withlabel, .ponyhoof_menu_withlabel .ponyhoof_menu_wrap {display:inline-block;}';
		css += '.ponyhoof_menu_withlabel {margin-bottom:8px;}';
		css += '.ponyhoof_menu_withlabel .ponyhoof_button_menu {margin-top:-3px;}';

		css += '.ponyhoof_menu_wrap {position:relative;}';
		css += '.ponyhoof_menu {z-index:1999;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none;display:none;}';
		css += '.ponyhoof_menu_wrap.openToggler .ponyhoof_menu {display:block;}';
		css += '.ponyhoof_menu .uiMenu {background:#fff;border:1px solid #777;border-bottom:2px solid #293E6A;color:#000;position:absolute;overflow:auto;overflow-x:hidden;}';//max-height:214px;
		css += '.ponyhoof_menu .uiMenu.overflow {resize:vertical;height:214px;min-height:214px;}';
		//css += '.ponyhoof_menu .uiMenuInner {}';
		css += '.ponyhoof_menuitem {border:solid #fff;border-width:1px 0;color:#111;display:block;font-weight:normal;line-height:16px;padding:1px 22px;text-decoration:none;outline:none;-webkit-user-drag:none;resize:none;}';
		css += '.ponyhoof_menu .ponyhoof_menuitem {color:#111;}';
		css += '.ponyhoof_menuitem:hover, .ponyhoof_menuitem:active, .ponyhoof_menuitem:focus {background-color:#6d84b4;border-color:#3b5998;color:#fff;text-decoration:none;}';
		css += '.ponyhoof_menuitem_checked {background-position:0 -146px;font-weight:bold;}';
		css += '.ponyhoof_menuitem_checked:hover, .ponyhoof_menuitem_checked:active, .ponyhoof_menuitem_checked:focus {background-position:0 -206px;}';
		css += '.ponyhoof_menuitem .ponyhoof_menuitem_span {white-space:nowrap;text-overflow:ellipsis;display:inline-block;overflow:hidden;padding-right:16px;max-width:400px;}';
		
		injectManualStyle(css, 'menu');
	};
	
	k.open = function() {
		addClass(k.wrap, 'openToggler');
		
		if (k.menuInner.parentNode.offsetHeight >= 224) {
			addClass(k.menuInner.parentNode, 'overflow');
		} else {
			removeClass(k.menuInner.parentNode, 'overflow');
		}
	};
	
	k.close = function() {
		removeClass(k.wrap, 'openToggler');
		k.afterClose();
	};
	
	k.toggle = function() {
		if (hasClass(k.wrap, 'openToggler')) {
			k.close();
		} else {
			k.open();
		}
	};
	
	k.changeChecked = function(menuItem) {
		var already = k.menu.getElementsByClassName('ponyhoof_menuitem_checked');
		if (already.length) {
			removeClass(already[0], 'ponyhoof_menuitem_checked');
		}
		addClass(menuItem.menuItem, 'ponyhoof_menuitem_checked');
	};
};

var MenuItem = function(menu) {
	var k = this;
	
	k.menuItem = null;
	k.menu = menu;
	k.onclick = null;
	
	k._create = function(param) {
		k.menuItem = d.createElement('a');
		k.menuItem.className = 'ponyhoof_menuitem';
		k.menuItem.setAttribute('role', 'menuitemradio');
		
		if (param.check) {
			k.menuItem.className += ' ponyhoof_menuitem_checked';
		}
		
		if (param.data) {
			k.menuItem.setAttribute('data-ponyhoof-menu-data', param.data);
		}
		
		if (param.title) {
			k.menuItem.title = param.title;
			k.menuItem.setAttribute('data-hover', 'tooltip');
			//k.menuItem.setAttribute('data-tooltip-position', 'below');
		}
		
		k.menuItem.innerHTML = '<span class="ponyhoof_menuitem_span">'+param.html+'</span>';
		
		if (param.onclick) {
			k.onclick = param.onclick;
		}
		k.menuItem.addEventListener('click', function(e) {
			e.stopPropagation();
			if (k.onclick) {
				k.onclick(k, k.menu);
			}
			
			return false;
		}, false);
		k.menuItem.addEventListener('dragstart', function() {
			return false;
		}, false);
		
		return k.menuItem;
	};
	
	k.getText = function() {
		return k.menuItem.getElementsByClassName('ponyhoof_menuitem_span')[0].innerHTML;
	};
};

var menuBodyLoaded = false;
var menuBodyLoad = function() {
	if (menuBodyLoaded) {
		return;
	}
	
	menuBodyLoaded = true;
	d.body.addEventListener('click', function() {
		var a = d.querySelectorAll('.ponyhoof_menu_wrap.openToggler');
		for (var i = 0; i < a.length; i++) {
			var m = a[i].getElementsByClassName('ponyhoof_menu')[0];
			MENUS[m.id].close();
		}
	}, false);
};
onPageReady(menuBodyLoad);
d.addEventListener('DOMContentLoaded', menuBodyLoad, true);

// Dialog
var DIALOGS = {};
var DIALOGCOUNT = 0;
var Dialog = function(id) {
	var k = this;
	
	k.dialog = null;
	k.generic_dialogDiv = null;
	k.popup_dialogDiv = null;
	k.id = id;
	
	k.alwaysModal = false;
	
	k.canCardspace = true;
	k.cardSpaceTimer = null;
	k.cardspaced = false;
	
	k.canDrag = true;
	
	k.skeleton = '';
	
	k.create = function() {
		if (DIALOGS[k.id]) {
			log("Attempting to recreate dialog ID \""+k.id+"\"");
			return DIALOGS[k.id];
		}
		
		DIALOGS[k.id] = k;

		log("Creating "+k.id+" dialog...");
		
		k.injectStyle();
		
		DIALOGCOUNT++;
		k.skeleton  = '<!-- '+SIG+' Dialog -->';
		k.skeleton += '<div class="generic_dialog pop_dialog" style="z-index:'+(400+DIALOGCOUNT)+';">';
		k.skeleton += '  <div class="generic_dialog_popup">';
		k.skeleton += '	   <div class="popup">';
		k.skeleton += '	     <div class="wrap">';
		k.skeleton += '		   <h3 title="This dialog is sent from '+FRIENDLYNAME+'"></h3>';
		k.skeleton += '		   <div class="body">';
		k.skeleton += '		       <div class="content clearfix"></div>';
		k.skeleton += '		       <div class="bottom"></div>';
		k.skeleton += '		   </div>'; // body
		k.skeleton += '	     </div>'; // wrap
		k.skeleton += '	   </div>'; // popup
		k.skeleton += '  </div>'; // generic_dialog_popup
		k.skeleton += '</div>';
		
		INTERNALUPDATE = true;
		
		k.dialog = d.createElement('div');
		k.dialog.className = 'ponyhoof_dialog';
		k.dialog.id = 'ponyhoof_dialog_'+k.id;
		k.dialog.innerHTML = k.skeleton;
		d.body.appendChild(k.dialog);
		
		INTERNALUPDATE = false;
		
		/*d.body.addEventListener('keydown', function(e) {
			if (e.which == 27 && k.dialog.style.display != 'none') { // esc
				k.close();
				e.stopPropagation();
				e.cancelBubble = true;
			}
		}, false);*/
		
		k.generic_dialogDiv = k.dialog.getElementsByClassName('pop_dialog')[0];
		k.popup_dialogDiv = k.dialog.getElementsByClassName('popup')[0];
		
		if (k.alwaysModal) {
			addClass(k.generic_dialogDiv, 'generic_dialog_modal');
		}
		
		k.show();
		
		return k.dialog;
	};
	
	k.injectStyle = function() {
		var css = '';
		css += '.ponyhoof_message .wrap {margin-top:4px;background:transparent !important;display:block;}';

		css += '.ponyhoof_dialog, .ponyhoof_dialog body {font-size:11px;}';
		css += '.ponyhoof_dialog iframe {-webkit-user-select:none;-moz-user-select:none;user-select:none;}';
		css += '.ponyhoof_dialog .generic_dialog {z-index:250;}';
		css += '.ponyhoof_dialog .generic_dialog_popup {margin-top:80px;}';
		css += '.ponyhoof_dialog .popup {background:#525252;background:rgba(82,82,82,.7);padding:10px;width:465px;margin:0 auto;			-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;cursor:default;}';
		css += '.ponyhoof_dialog .wrap {background:#fff;color:#000;}';
		css += '.ponyhoof_dialog h3 {background-color:#6D84B4;border:1px solid #3B5998;border-bottom:0;color:#fff;font-size:14px;font-weight:bold;padding:5px 5px 5px 10px;cursor:help;min-height:17px;}';
		css += '.ponyhoof_dialog h3:before {background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+UlEQVQ4y6XTsSuFYRTH8fd6MZBcg0npFrGQsprEpAwGZTIYLGKxYlBKMcnkDzBYDBaibpnkvzAwSVEWxcfg3Hp7c9/Lvb/tec75fc85T+dJkgbCQtKs0IUHtDcLmPaj+WYB2wE4L0qaxCam0BFtD0TsKgAfGMFQPUgFl3jDBarYi3NNj1jBLk5xjbkspIRlPGusW1R+66SEUdwXmO8whjRvTmOUHXwVAJ6wgVl05qtv4TMSXwogZ+jOmntxEoE1jGMC7xnTMY6wiH0coFwD9KCUG2kGq2F+RVs8cv9flyhFX+xANXNf/u823uCwlQ+1jqVWAIMYrhf/BtKetwmo/LAjAAAAAElFTkSuQmCC");background-repeat: no-repeat;display:inline-block;float:right;content:" ";width:16px;height:16px;opacity:.713;}';
		css += '.ponyhoof_dialog .body {border:1px solid #555;border-top:0;}';
		css += '.ponyhoof_dialog .content {padding:10px;}';
		css += '.ponyhoof_dialog .bottom {background:#F2F2F2;border-top:1px solid #ccc;padding:8px 10px 8px 10px;text-align:right;}';
		css += '.ponyhoof_dialog .bottom .lfloat {line-height:17px;margin-top:4px;}';
		
		css += '.ponyhoof_dialog_header {background:#F2F2F2;border:solid #E2E2E2;border-width:1px 0;padding:4px 5px 5px;color:#333;font-size:11px;margin-bottom:8px;display:block;font-weight:bold;}';
		css += '.ponyhoof_tabs {padding:4px 10px 0;background:#F2F2F2;border-bottom:1px solid #ccc;margin:-10px -10px 10px;}';
		css += '.ponyhoof_tabs a {margin:3px 10px 0 0;padding:5px 8px;float:left;}';
		css += '.ponyhoof_tabs a.active {color:#333;padding:4px 7px 5px;background:#fff;border:1px solid #ccc;border-bottom:1px solid #fff;margin-bottom:-1px;text-decoration:none;}';
		css += '.ponyhoof_tabs_section {display:none;}';
		
		if (ISMOBILE) {
			css += '@import url("//s-static.ak.fbcdn.net/rsrc.php/v1/ye/r/-PtvDv6-9hz.css");';
			css += '#ponyhoof_welcome_scenery {background-image:none !important;}';
			css += '.ponyhoof_dialog .generic_dialog {position:absolute;}';
			css += '.ponyhoof_menu .uiMenu.overflow {resize:none !important;height:auto !important;}';
		}
		
		injectManualStyle(css, 'dialog');
	};
	
	k.show = function() {
		removeClass(k.dialog, 'ponyhoof_fadeout');
		removeClass(k.generic_dialogDiv, 'ponyhoof_fadeout');
		k.dialog.style.display = 'block';
		k.generic_dialogDiv.style.display = 'block';
		
		if (ISMOBILE) {
			k.canCardspace = false;
		}
		
		if (k.canCardspace) {
			w.addEventListener('resize', k.onBodyResize, false);
			k.cardSpaceTick();
		}
	};
	
	k.close = function(callback) {
		if (!userSettings.disable_animation) {
			fadeOut(k.dialog, callback);
			if (ISOPERA) {
				fadeOut(k.generic_dialogDiv, callback);
			}
		} else {
			k.dialog.style.display = 'none';
			if (callback) {
				callback();
			}
		}
		
		k._close();
	};

	k.hide = function() {
		k.dialog.style.display = 'none';

		k._close();
	};

	k._close = function() {
		w.removeEventListener('resize', k.onBodyResize, false);
		clearInterval(k.cardSpaceTimer);
		
		if (k.cardspaced) {
			removeClass(d.documentElement, 'generic_dialog_overflow_mode');
		}
	};
	
	k.changeTitle = function(title) {
		INTERNALUPDATE = true;
		k.dialog.getElementsByTagName('h3')[0].innerHTML = title;
		INTERNALUPDATE = false;
	};
	
	k.changeContent = function(c) {
		INTERNALUPDATE = true;
		k.dialog.querySelector('.content').innerHTML = c;
		INTERNALUPDATE = false;
	};
	
	k.changeBottom = function(bottom) {
		INTERNALUPDATE = true;
		k.dialog.querySelector('.bottom').innerHTML = bottom;
		INTERNALUPDATE = false;
	};
	
	k.addCloseButton = function(callback) {
		var text = "Close";
		if (typeof CURRENTLANG != 'undefined') {
			text = CURRENTLANG.close;
		}

		var close = '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button"><span class="uiButtonText">'+text+'</span></a>';
		k.changeBottom(close);
		
		k.dialog.querySelector('.bottom .uiButton').addEventListener('click', function() {
			k.close(function() {
				if (callback) {
					callback();
				}
			});
			
			return false;
		}, false);
	};
	
	k.onBodyResize = function() {
		if (k.canCardspace) {
			var dialogHeight = k.popup_dialogDiv.clientHeight + 80 + 40;
			var windowHeight = w.innerHeight;
			
			if (!k.cardspaced) {
				if (dialogHeight > windowHeight) {
					addClass(d.documentElement, 'generic_dialog_overflow_mode');
					if (!k.alwaysModal) {
						addClass(k.generic_dialogDiv, 'generic_dialog_modal');
					}
					addClass(k.generic_dialogDiv, 'generic_dialog_fixed_overflow');
					
					k.cardspaced = true;
				}
			} else {
				if (dialogHeight < windowHeight) {
					removeClass(d.documentElement, 'generic_dialog_overflow_mode');
					if (!k.alwaysModal) {
						removeClass(k.generic_dialogDiv, 'generic_dialog_modal');
					}
					removeClass(k.generic_dialogDiv, 'generic_dialog_fixed_overflow');
					
					k.cardspaced = false;
				}
			}
		}
	};
	
	k.cardSpaceTick = function() {
		if (k.canCardspace) {
			k.onBodyResize();
			k.cardSpaceTimer = w.setTimeout(k.cardSpaceTick, 500);
		} else {
			clearInterval(k.cardSpaceTimer);
		}
	};
};

function createSimpleDialog(id, title, message) {
	if (DIALOGS[id]) {
		DIALOGS[id].show();
		return DIALOGS[id];
	}

	var di = new Dialog(id);
	di.create();
	di.changeTitle(title);
	di.changeContent(message);
	di.addCloseButton();
	
	return di;
};

function injectSystemStyle() {
	var css = '';
	css += '.ponyhoof_show_if_injected {display:none;}';
	css += '.ponyhoof_hide_if_injected {display:block;}';
	css += '.ponyhoof_hide_if_injected.inline {display:inline;}';
	css += 'html.ponyhoof_injected .ponyhoof_show_if_injected {display:block;}';
	css += 'html.ponyhoof_injected .ponyhoof_hide_if_injected {display:none;}';
	css += '.ponyhoof_show_if_loaded {display:none;}';
	css += '.ponyhoof_updater_latest, .ponyhoof_updater_newVersion, .ponyhoof_updater_error, .ponyhoof_updater_opera {display:none;}';
	
	css += '.ponyhoof_fadeout {opacity:0;-webkit-transition:opacity .25s linear;-moz-transition:opacity .25s linear;-o-transition:opacity .25s linear;transition:opacity .25s linear;}';
	css += '.ponyhoof_message {padding:10px;color:#000;font-weight:bold;overflow:hidden;}';
	
	css += '.ponyhoof_loading {background:url("data:image/gif;base64,R0lGODlhEAALALMMAOXp8a2503CHtOrt9L3G2+Dl7vL0+J6sy4yew1Jvp/T2+e/y9v///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCwAMACwAAAAAEAALAAAEK5DJSau91KxlpObepinKIi2kyaAlq7pnCq9p3NZ0aW/47H4dBjAEwhiPlAgAIfkECQsADAAsAAAAAAQACwAABA9QpCQRmhbflPnu4HdJVAQAIfkECQsADAAsAAAAABAACwAABDKQySlSEnOGc4JMCJJk0kEQxxeOpImqIsm4KQPG7VnfbEbDvcnPtpINebJNByiTVS6yCAAh+QQJCwAMACwAAAAAEAALAAAEPpDJSaVISVQWzglSgiAJUBSAdBDEEY5JMQyFyrqMSMq03b67WY2x+uVgvGERp4sJfUyYCQUFJjadj3WzuWQiACH5BAkLAAwALAAAAAAQAAsAAAQ9kMlJq73hnGDWMhJQFIB0EMSxKMoiFcNQmKjKugws0+navrEZ49S7AXfDmg+nExIPnU9oVEqmLpXMBouNAAAh+QQFCwAMACwAAAAAEAALAAAEM5DJSau91KxlpOYSUBTAoiiLZKJSMQzFmjJy+8bnXDMuvO89HIuWs8E+HQYyNAJgntBKBAAh+QQFFAAMACwMAAIABAAHAAAEDNCsJZWaFt+V+ZVUBAA7") no-repeat;display:inline-block;width:16px;height:11px;margin:6px 0 0 6px;}';
	css += '.ponyhoof_loading.ponyhoof_show_if_injected {display:none;}';
	css += 'html.ponyhoof_injected .ponyhoof_loading_pony {display:inline-block;}';

	css += '.uiHelpLink {background:url("data:image/gif;base64,R0lGODlhDAALAJEAANvb26enp////wAAACH5BAEAAAIALAAAAAAMAAsAAAIblI8WkbcswAtAwWVzwoIbSWliBzWjR5abagoFADs=") no-repeat 0 center;display:inline-block;height:9px;width:12px;}';
	
	injectManualStyle(css, 'system');
}

/*eof*/	
	var VERSION = 1.337;
	var FRIENDLYNAME = 'P'+'onyh'+'oof';
	var SIG = '['+FRIENDLYNAME+' v'+VERSION+']';
	
	var runMe = true;
	var STORAGEMETHOD = 'none';
	var INTERNALUPDATE = false;
	
	var PONIES = [{"code":"trixie","name":"Trixie","users":["trixie","sethisto","equestria daily"],"menu_title":"The Great and Powerful Trixie demands your attention!","color":["6e98b4","3b7297"],"loadingText":"Performing magic..."},{"code":"twilight","name":"Twilight Sparkle","users":["twilight","spark","tw\u0131l\u0131ght","twilite","twi light","\u0162wilight"],"color":["9b6eb4","753b97"],"mane6":true,"loadingText":"Studying friendship..."},{"code":"dash","name":"Rainbow Dash","users":["rainbow","dash"],"color":["6ea1b4","3b7c97"],"soundNotif":"dash\/notif","mane6":true,"loadingText":"Loading... in ten seconds flat!","successText":"Aww yeah!"},{"code":"pinkie","name":"Pinkie Pie","users":["pink"],"color":["b46e8f","973b65"],"soundNotif":"pinkie\/notif2","mane6":true,"loadingText":"Come on everypony!"},{"code":"applej","name":"Applejack","users":["apple j","applej"],"color":["b4966e","976f3b"],"soundNotif":"applej\/notif2","mane6":true,"loadingText":"Hold on there sugarcube!","successText":"Yeehaw!"},{"code":"flutter","name":"Fluttershy","users":["flutter","flut ter"],"color":["b4b46e","97973b"],"soundNotif":"flutter\/notif2","mane6":true,"loadingText":"Screaming...","successText":"Yay!"},{"code":"rarity","name":"Rarity","users":["rarity"],"color":["966eb4","6f3b97"],"mane6":true,"loadingText":"Whining...","seperator":true},{"code":"applebloom","name":"Apple Bloom","users":["appleb","apple b"],"color":["b46e8e","973b64"],"loadingText":"Getting her cutie mark..."},{"code":"berry","name":"Berry Punch","users":["berry"],"color":["a56eb4","833b97"]},{"code":"bigmac","name":"Big Macintosh","users":["bigmac","big mac"],"color":["b46e75","973b44"],"soundNotif":"bigmac\/notif","loadingText":"Saying eeyup..."},{"code":"bonbon","name":"Bon Bon","users":["bon bon","bonbon","bon-bon"],"color":["6e89b4","3b5e97"]},{"code":"braeburn","name":"Braeburn","users":["braeburn"],"color":["b4a96e","97873b"]},{"code":"cadance","name":"Cadance","users":["cadance"],"color":["b46e96","973b6f"]},{"code":"carrot","name":"Carrot Top","users":["golden","carrot"],"menu_title":"Also known as Golden Harvest","color":["b2b46e","93973b"]},{"code":"celestia","name":"Celestia","users":["celestia","trollestia","molestia"],"color":["b46e98","973b72"],"loadingText":"Raising the sun..."},{"code":"cheerilee","name":"Cheerilee","users":["cheerilee"],"color":["b46e96","973b6f"]},{"code":"colgate","name":"Colgate","users":["colgate"],"menu_title":"Also known as Minuette","color":["6e9ab4","3b7397"],"soundNotif":"colgate\/notif","loadingText":"Brushing..."},{"code":"cloudchaser","name":"Cloudchaser","users":["cloudch","cloud ch"],"color":["7d6eb4","4e3b97"]},{"code":"daring","name":"Daring Do","users":["daring"],"color":["b4a86e","97863b"]},{"code":"derpy","name":"Derpy","users":["derpy"],"color":["6e80b4","3b5297"],"fbIndex_swf":"derpy\/fbIndex.swf","loadingText":"Wondering what went wrong!"},{"code":"discord","name":"Discord","users":["discord"],"color":["b46f6e","973c3b"],"stack":"villian","norandom":true,"loadingText":"CHAOS"},{"code":"whooves","name":"Doctor Whooves","users":["whooves"],"color":["b4a16e","977c3b"],"menu_title":"Also known as Time Turner"},{"code":"flimflam","name":"Flim and Flam","users":["flim","flam"],"color":["b1b46e","92973b"],"loadingText":"You got opportunity!"},{"code":"luna","name":"Luna","users":["luna"],"color":["6e7fb4","3b5097"],"soundNotif":"luna\/notif","loadingText":"Doubling the fun...","successText":"Huzzah!"},{"code":"lyra","name":"Lyra","users":["lyra"],"color":["6eb49d","3b9778"]},{"code":"octavia","name":"Octavia","users":["octavia"],"color":["b4a86e","97863b"]},{"code":"chrysalis","name":"Queen Chrysalis","users":["chrysalis"],"color":["7fb46e","50973b"],"stack":"chrysalis","loadingText":"Feeding...","norandom":true},{"code":"rose","name":"Rose","users":["rose"],"menu_title":"Also known as Roseluck","color":["b46e8d","973b62"]},{"code":"scootaloo","name":"Scootaloo","users":["scootaloo"],"color":["b49a6e","97733b"],"loadingText":"Getting her cutie mark..."},{"code":"shiningarmor","name":"Shining Armor","users":["shining armor"],"color":["6e7bb4","3b4b97"]},{"code":"soarin","name":"Soarin'","users":["soarin"],"color":["6e9db4","3b7897"]},{"code":"spike","name":"Spike","users":["spike"],"color":["a36eb4","803b97"]},{"code":"spitfire","name":"Spitfire","users":["spitfire"],"color":["b4af6e","978f3b"]},{"code":"sweetieb","name":"Sweetie Belle","users":["sweetieb","sweetie b"],"color":["a16eb4","7c3b97"],"loadingText":"Getting her cutie mark..."},{"code":"vinyl","name":"Vinyl Scratch","users":["vinyl","vinyx"],"menu_title":"Also known as DJ Pon-3","color":["6eaab4","3b8997"],"loadingText":"Let's spin this!"},{"code":"zecora","name":"Zecora","users":["zecora"],"color":["b4b06e","97903b"]},{"code":"blank","name":"(Blank)","color":["b46e6e","973b3b"],"hidden":true,"norelease":true},{"code":"bloomberg","name":"Bloomberg","color":["9fb46e","7b973b"],"hidden":true},{"code":"mono","name":"Mono","color":["b46e6e","973b3b"],"stack":"mono","hidden":true},{"code":"taugeh","name":"Taugeh","color":["b4b46e","97973b"],"hidden":true}];
	var CURRENTPONY = null;
	var REALPONY = CURRENTPONY;
	var BRONYNAME = '';
	var USERID = 0;
	var UILANG = 'en_US';
	var LANG = {"cs_CZ":[],"da_DK":{"fb_composer_lessons":"Hvilke lektioner i venskab har du l\u00e6rt idag?"},"de_DE":{"fb_composer_lessons":"Welche Lektionen \u00fcber Freundschaft hast Du heute gelernt?"},"en_US":{"fb_composer_lessons":"What lessons in friendship have you learned today?","fb_comment_box":"Write a friendship letter...","fb_search_box":"Search for ponies, places and things","close":"Close","options_title":"Ponyhoof Options","fb_composer_ponies":"Ponies!","fb_composer_ponies_caps":"PONIES!!!","settings_extras_login_bg":"Use alternate background"},"es_LA":{"fb_composer_lessons":"\u00bfQue has aprendido hoy sobre la amistad?","fb_comment_box":"Escribe un reporte de amistad..."},"fb_LT":{"fb_composer_lessons":"W|-|47 \u00a33550|\\|5 !|\\| |=|2!3|\\||)5|-|!|* |-|4\\\/3 '\/0|_| \u00a334|2|\\|3|) 70|)4'\/?","fb_comment_box":"W|2!73 4 |=|2!3|\\||)5|-|!|* \u00a33773|2...","fb_search_box":"S34|2(|-| |=0|2 |*0|\\|!35, |*\u00a34(35 4|\\||) 7|-|!|\\|95","close":"C\u00a3053","options_title":"P0|\\|'\/|-|00|= O|*7!0|\\|5","fb_composer_ponies":"P0|\\|!35!","fb_composer_ponies_caps":"PONIES!!!","settings_extras_login_bg":"U53 4\u00a373|2|\\|473 84(k9|20|_||\\||)"},"fi_FI":{"fb_composer_lessons":"Mit\u00e4 oppeja yst\u00e4vyydest\u00e4 olet oppinut t\u00e4n\u00e4\u00e4n?"},"fr_CA":{"fb_composer_lessons":"Quelles le\u00e7ons sur l'amiti\u00e9 avez-vous appris aujourd'hui ?"},"fr_FR":{"fb_composer_lessons":"Quelles le\u00e7ons sur l'amiti\u00e9 avez-vous appris aujourd'hui ?"},"ga_IE":{"fb_composer_lessons":"cad ceachtanna i cairdeas ad'fhoghlaim t\u00fa inniu?"},"he_IL":{"fb_composer_lessons":"\u05d0\u05d9\u05dc\u05d5 \u05dc\u05e7\u05d7\u05d9\u05dd \u05d1\u05d9\u05d3\u05d9\u05d3\u05d5\u05ea \u05dc\u05de\u05d3\u05ea \u05d4\u05d9\u05d5\u05dd?"},"hu_HU":{"fb_composer_lessons":"Mit tanult\u00e1l ma a bar\u00e1ts\u00e1gr\u00f3l?"},"id_ID":{"fb_composer_lessons":"Apa pelajaran yang kalian dapat tentang persahabatan hari ini?"},"it_IT":{"fb_composer_lessons":"Che cosa hai imparato oggi sull'amicizia?"},"ja_JP":{"fb_composer_lessons":"\u4eca\u65e5\u306f\u53cb\u60c5\u306b\u3069\u306e\u3088\u3046\u306a\u6559\u8a13\u3092\u5b66\u3073\u307e\u3057\u305f\u304b\uff1f"},"ko_KR":{"fb_composer_lessons":"\uc6b0\uc815\uc5d0 \uad00\ud574\uc11c \uc624\ub298 \ubb34\uc5c7\uc744 \ubc30\uc6e0\ub098\uc694?"},"lt_LT":{"fb_composer_lessons":"Kokias \u017einias apie draugyst\u0119 i\u0161mokote \u0161iandien?"},"mk_MK":{"fb_composer_lessons":"\u041a\u043e\u0438 \u043b\u0435\u043a\u0446\u0438\u0438 \u0437\u0430 \u043f\u0440\u0438\u0458\u0430\u0442\u0435\u043b\u0441\u0442\u0432\u043e\u0442\u043e \u0434\u043e\u0437\u043d\u0430\u0432\u0442\u0435 \u0434\u0435\u043d\u0435\u0441?"},"ms_MY":{"fb_composer_lessons":"Apakah pelajaran tentang persahabatan yang telah anda pelajari hari ini?","fb_comment_box":"Tuliskan surat persahabatan...","close":"Tutup","options_title":"Opsyen Ponyhoof"},"nb_NO":{"fb_composer_lessons":"Hva har du l\u00e6rt om vennskap i dag?"},"nl_NL":{"fb_composer_lessons":"Wat heb je vandaag geleerd over vriendschap?"},"pl_PL":{"fb_composer_lessons":"Czego si\u0119 dzisiaj nauczy\u0142e\u015b o przyja\u017ani?"},"pt_BR":{"fb_composer_lessons":"Quais li\u00e7\u00f5es sobre amizade voc\u00ea aprendeu hoje?"},"pt_PT":{"fb_composer_lessons":"Que li\u00e7\u00f5es de amizade voc\u00ea aprendeu hoje?"},"ro_RO":{"fb_composer_lessons":"Ce lec\u0163ii despre prietenie ai \u00eenv\u0103\u0163at ast\u0103zi?"},"ru_RU":{"fb_composer_lessons":"\u041a\u0430\u043a\u0438\u0435 \u0443\u0440\u043e\u043a\u0438 \u0434\u0440\u0443\u0436\u0431\u044b \u0432\u044b \u0432\u044b\u0443\u0447\u0438\u043b\u0438 \u0441\u0435\u0433\u043e\u0434\u043d\u044f?"},"sk_SK":{"fb_composer_lessons":"Ak\u00e9 lekcie priate\u013estva si sa nau\u010dil dnes?"},"sl_SI":{"fb_composer_lessons":"Kaj si se o prijateljstvu nau\u010dil\/-a danes?"},"sr_RS":[],"sv_SE":{"fb_composer_lessons":"Vilka l\u00e4rdomar i v\u00e4nskap har du l\u00e4rt dig idag?"},"tl_PH":{"fb_composer_lessons":"Anong mga aralin sa pagkakaibigan ang natutunan mo ngayon?"},"tr_TR":{"fb_composer_lessons":"Bug\u00fcn arkada\u015fl\u0131kla ilgili neler \u00f6\u011frendin?"},"uk_UA":{"fb_composer_lessons":"\u042f\u043a\u0456 \u0443\u0440\u043e\u043a\u0438 \u0432 \u0434\u0440\u0443\u0436\u0431\u0456 \u0432\u0438 \u0434\u0456\u0437\u043d\u0430\u043b\u0438\u0441\u044f \u0441\u044c\u043e\u0433\u043e\u0434\u043d\u0456?"},"zh_CN":{"fb_composer_lessons":"\u4f60\u4eca\u5929\u4ece\u53cb\u60c5\u91cc\u9762\u5b66\u5230\u4e86\u4ec0\u9ebd\uff1f"},"zh_TW":{"fb_composer_lessons":"\u4f60\u4eca\u5929\u5f9e\u53cb\u60c5\u88e1\u9762\u5b78\u5230\u4e86\u4ec0\u9ebc\uff1f"}};
	var CURRENTLANG = {};
	
	var HTMLCLASS_SETTINGS = ['login_bg', 'show_messages_other', 'disable_animation', 'pinkieproof'];
	var STACKS_LANG = [
		 {
			 'stack': 'pony'
			,'people': 'ponies'
			,'friend': 'pal'
			,'friends': 'pals'
			,'friends_logic': 'pals'
			
			,'like': 'brohoof'
			,'likes': 'brohoofs'
			,'unlike': 'unbrohoof'
			,'like_past': 'brohoof'
			,'likes_past': 'brohoofs'
			,'liked': 'brohoof\'d'
		}
		,{
			 'stack': 'chrysalis'
			,'people': 'changelings'
			,'friend': 'prey'
			,'friends': 'prey'
			,'friends_logic': 'changelings'
			
			,'like': 'feed'
			,'likes': 'feeds'
			,'unlike': 'unfeed'
			,'like_past': 'fed on'
			,'likes_past': 'fed on'
			,'liked': 'fed on' // @TODO liked_button
		}
	];
	var CURRENTSTACK = STACKS_LANG[0];
	
		var THEMEURL = w.location.protocol + '//hoof.little.my/files/';
	var THEMECSS = THEMEURL;
	var THEMECSS_EXT = '.css?userscript_version='+VERSION;
	var UPDATEURL = w.location.protocol + '//hoof.little.my/files/update_check.js?' + (+new Date());
	var UPDATEJS = 'https://hoof.little.my/files/updatejs.js?' + (+new Date());
	
	var PONYHOOF_PAGE = '197956210325433';
	var PONYHOOF_URL = '//'+getFbDomain()+'/Ponyhoof';
	var PONYHOOF_README = '//hoof.little.my/files/readme.htm';
	
	if (ISCHROME) {
		var chrome_getValue = function(name, callback) {
			chrome.extension.sendRequest({'command':'getValue', 'name':name}, function(response) {
				if (response && typeof response.val != 'undefined') {
					callback(response.val);
				} else {
					callback(null);
				}
			});
		};
		
		var chrome_setValue = function(name, val) {
			chrome.extension.sendRequest({'command':'setValue', 'name':name, 'val':val});
		};
		
		var chrome_clearStorage = function(name, val) {
			chrome.extension.sendRequest({'command':'clearStorage'});
		};
	}
	
	if (ISOPERA) {
		var opera_messageId = 0;
		var opera_messageCallback = {};
		if (opera.extension) {
			opera.extension.onmessage = function(message) {
				if (message.data) {
					var response = message.data;
					var callback = opera_messageCallback[response.messageid];
					if (callback) {
						callback(response.val);
					}
				}
			}
		}

		var opera_getValue = function(name, callback) {
			opera_messageCallback[opera_messageId] = callback;
			opera.extension.postMessage({'command':'getValue', 'messageid':opera_messageId, 'name':name});
			opera_messageId++;
		};
		
		var opera_setValue = function(name, val) {
			opera.extension.postMessage({'command':'setValue', 'name':name, 'val':val});
		};
		
		var opera_clearStorage = function(name, val) {
			opera.extension.postMessage({'command':'clearStorage'});
		};
	}
	
	function ajax(obj) {
		if (typeof GM_xmlhttpRequest == 'function') {
			return GM_xmlhttpRequest(obj);
		}
		
		throw {
			 responseXML:''
			,responseText:''
			,readyState:4
			,responseHeaders:''
			,status:-100
			,statusText:'No GM_xmlhttpRequest support'
		};
	}
	
	function isPonyhoofPage(id) {
		if (id == PONYHOOF_PAGE) {
			return true;
		}
				return false;
	}
	
	function capitaliseFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	// Settings
	var DEFAULTSETTINGS = {'theme': CURRENTPONY, 'customcss': '', 'debug_dominserted_console':false, 'disableDomNodeInserted':false, 'debug_slow_load':false, 'sounds':false, 'chatSound':false, 'commentBrohoofed':true, 'randomSetting':'most', 'forceEnglish':false, 'allowLoginScreen':true, 'debug_disablelog':false};
	for (var i in HTMLCLASS_SETTINGS) {
		if (!DEFAULTSETTINGS[HTMLCLASS_SETTINGS[i]]) {
			DEFAULTSETTINGS[HTMLCLASS_SETTINGS[i]] = false;
		}
	}
	DEFAULTSETTINGS.show_messages_other = true;
	if (ISMOBILE) {
		DEFAULTSETTINGS.disable_animation = true;
	}
	
	function getValueError(extra) {
		createSimpleDialog('localStorageError_getValue', "Ponyhoof derp'd", "Ponyhoof can't load your settings. Please try again later."+extra);
	}
	
	function saveValueError(extra) {
		createSimpleDialog('localStorageError_saveValue', "Ponyhoof derp'd", "Ponyhoof can't save your settings. Either your browser's local storage is full or there is a conflict with another extension installed in your browser."+extra);
	}
	
	function ponyhoofError(extra) {
		createSimpleDialog('ponyhoofError', "Ponyhoof derp'd", "Ponyhoof encountered an internal error. Please try again later and update to the latest version of Ponyhoof if available."+extra);
	}
	
	function getValue(name, callback) {
		switch (STORAGEMETHOD) {
			case 'greasemonkey':
				callback(GM_getValue(name));
				break;
			
			case 'chrome':
				chrome_getValue(name, callback);
				break;
			
			case 'opera':
				opera_getValue(name, callback);
				break;
			
			case 'localstorage':
			default:
				name = 'ponyhoof_'+name;
				callback(w.localStorage.getItem(name));
				break;
		}
	}
	
	function saveValue(name, v) {
		switch (STORAGEMETHOD) {
			case 'greasemonkey':
				GM_setValue(name, v);
				break;
			
			case 'chrome':
				chrome_setValue(name, v);
				break;
			
			case 'opera':
				opera_setValue(name, v);
				break;
			
			case 'localstorage':
			default:
				name = 'ponyhoof_'+name;
				w.localStorage.setItem(name, v);
				break;
		}
		//if (e.toString().indexOf('QUOTA_EXCEEDED_ERR')>-1) {
		//}
	}
	
	function loadSettings(callback) {
		try {
			userSettings = {};
			getValue('settings', function(s) {
				if (s) {
					s = JSON.parse(s);
				} else {
					s = {};
				}
				for (var i in DEFAULTSETTINGS) {
					if (!s.hasOwnProperty(i)) {
						s[i] = DEFAULTSETTINGS[i];
					}
				}
				userSettings = s;
				
				callback();
			});
		} catch (e) {
			ponyhoofError("<br><br><code>[Debug]<br>"+e.toString());
			callback();
			return false;
		}
	}
	
	function saveSettings() {
		try {
			saveValue('settings', JSON.stringify(userSettings));
			return true;
		} catch (e) {
			saveValueError("<br><br><code>[Debug]<br>"+e.toString());
			return false;
		}
	}

	function statTrack(stat) {
		var i = d.createElement('iframe');
		i.style.position = 'absolute';
		i.style.top = '-9999px';
		i.style.left = '-9999px';
		i.src = '//hoof.little.my/files/_htm/stat_'+stat+'.htm?version='+VERSION;
		d.body.appendChild(i);
	}
	
	// Pony selector
	var PonySelector = function(p, param) {
		var k = this;
		
		if (param) {
			k.param = param;
		} else {
			k.param = {};
		}
		k.p = p;
		k.wrap = null;
		k.button = null;
		
		k.oldPony = CURRENTPONY;
		k.allowNone = false;
		k.customClick = function() {};
		
		k.menu = null;
		k.createSelector = function() {
			if (k.menu) {
				return k.menu;
			}
			
			k.injectStyle();
			
			var currentPonyData = convertCodeToData(CURRENTPONY);
			var name = "(Nopony)";
			if (currentPonyData) {
				name = currentPonyData.name;
			} else if (CURRENTPONY == 'RANDOM') {
				name = "(Random)";
			}
			
			INTERNALUPDATE = true;
			
			k.menu = new Menu('ponies_'+p.id, k.p/*, {checkable:true}*/);
			k.button = k.menu.createButton(name);
			k.menu.createMenu();
			k.menu.attachButton();
			
			/*if (k.allowNone) {
				var check = false;
				if (CURRENTPONY == 'NONE') {
					check = true;
				}
				
				k.menu.createMenuItem({
					 html: "(Nopony)"
					,title: "Disable Ponyhoof"
					,check: check
					,onclick: function(menuItem, menuClass) {
						CURRENTPONY = 'NONE';
						
						menuClass.button.getElementsByClassName('uiButtonText')[0].innerHTML = "(Nopony)";
						changeThemeSmart('NONE');
						userSettings.theme = 'NONE';
						saveSettings();
						
						menuClass.changeChecked(menuItem);
						menuClass.close();
						
						if (k.customClick) {
							k.customClick(menuItem, menuClass);
						}
					}
				});
			}*/
			
			if (k.allowRandom) {
				var check = false;
				if (CURRENTPONY == 'RANDOM') {
					check = true;
				}
				
				k.menu.createMenuItem({
					 html: "(Random)"
					,title: "To choose who to randomize, go to the Extras tab"
					,check: check
					,onclick: function(menuItem, menuClass) {
						CURRENTPONY = 'RANDOM';
						
						menuClass.button.getElementsByClassName('uiButtonText')[0].innerHTML = "(Random)";
						changeThemeSmart('RANDOM');
						userSettings.theme = 'RANDOM';
						saveSettings();
						
						menuClass.changeChecked(menuItem);
						menuClass.close();
						
						if (k.customClick) {
							k.customClick(menuItem, menuClass);
						}
					}
				});
			}
			
			if (k.allowNone || k.allowRandom) {
				k.menu.createSeperator();
			}
			
			if (k.param.feature && k.param.feature != -1) {
				k._createItem(PONIES[k.param.feature], true);
				k.menu.createSeperator();
			}
			
			for (var i = 0; i < PONIES.length; i++) {
				if (k.param.feature && k.param.feature != -1 && PONIES[k.param.feature].code == PONIES[i].code) {
					if (PONIES[i].seperator) {
						k.menu.createSeperator();
					}
					continue;
				}
				
				var check = false;
				if (PONIES[i].code == CURRENTPONY) {
					check = true;
				}
				
				k._createItem(PONIES[i], check);
				
				if (PONIES[i].seperator) {
					k.menu.createSeperator();
				}
			}
			
			var img = d.createElement('span');
			img.className = 'ponyhoof_loading ponyhoof_show_if_injected ponyhoof_loading_pony';
			k.menu.wrap.appendChild(img);
			
			INTERNALUPDATE = false;
		};
		
		k._createItem = function(ponyData, check) {
			var menuItem = k.menu.createMenuItem({
				 html: ponyData.name
				,title: ponyData.menu_title
				,data: ponyData.code
				,check: check
				,onclick: function(menuItem, menuClass) {
					var code = menuItem.menuItem.getAttribute('data-ponyhoof-menu-data');
					CURRENTPONY = code;
					
					menuClass.button.getElementsByClassName('uiButtonText')[0].innerHTML = menuItem.getText();
					changeThemeSmart(code);
					userSettings.theme = code;
					saveSettings();

					menuClass.changeChecked(menuItem);
					menuClass.close();
					
					if (k.customClick) {
						k.customClick(menuItem, menuClass);
					}
				}
			});
			if (ponyData.hidden) {
				addClass(menuItem.menuItem, 'ponyhoof_pony_hidden');
			}
		};
		
		k.injectStyle = function() {
			var css = '';
			css += 'html .ponyhoof_pony_hidden {display:none;}';
			for (var i = 0; i < PONIES.length; i++) {
				css += 'html .ponyhoof_menuitem[data-ponyhoof-menu-data="'+PONIES[i].code+'"]:hover, html .ponyhoof_menuitem[data-ponyhoof-menu-data="'+PONIES[i].code+'"]:active, html .ponyhoof_menuitem[data-ponyhoof-menu-data="'+PONIES[i].code+'"]:focus {background-color:#'+PONIES[i].color[0]+' !important;border-top-color:#'+PONIES[i].color[1]+' !important;border-bottom-color:#'+PONIES[i].color[1]+' !important;}';
			}
			
			injectManualStyle(css, 'ponySelector');
		};
	};
	
	// Sounds
	var _soundCache = {};
	var PonySound = function(id) {
		var k = this;
		k.id = id;
		
		k.sound = d.createElement('audio');
		
		// Don't loop sounds for 3 seconds
		k.wait = 3;
		k.respectSettings = true;
		
		k._time = 0;
		
		k.changeSource = function(source) {
			k.sound.src = source;
		};
		
		k.play = function() {
			if (k.respectSettings) {
				if (!userSettings.sounds) {
					return;
				}
			}
			
			// Make sure we aren't playing it on another page already
			k._time = Math.floor(Date.now() / 1000);
			
			//try {
				getValue('soundCache', function(s) {
					if (typeof s != 'undefined') {
						try {
							_soundCache = JSON.parse(s);
						} catch (e) {
							_soundCache = {};
						}
						
						if (_soundCache == null) {
							_soundCache = {};
						}

						if (_soundCache[k.id]) {
							if (_soundCache[k.id]+k.wait <= k._time) {
							} else {
								return;
							}
						}
					}

					k.continuePlaying();
				});
			//} catch (e) {
			//	k.continuePlaying();
			//}
		};
		
		k.continuePlaying = function() {
			_soundCache[k.id] = k._time;
			saveValue('soundCache', JSON.stringify(_soundCache));

			k.sound.play();
		};
		
		// http://html5doctor.com/native-audio-in-the-browser/
		k.audioTagSupported = function() {
			return !!(k.sound.canPlayType);
		};
		
		k.canPlayMp3 = function() {
			return !!k.sound.canPlayType && '' != k.sound.canPlayType('audio/mpeg');
		};
		
		k.canPlayOgg = function() {
			return !!k.sound.canPlayType && '' != k.sound.canPlayType('audio/ogg; codecs="vorbis"');
		};
	};
	
	var ponySounds = {};
	function initPonySound(id, source) {
		if (!ponySounds[id]) {
			ponySounds[id] = new PonySound(id);
		}
		
		if (!ponySounds[id].audioTagSupported()) {
			throw new Exception('No <audio> tag support');
		}
		
		if (ponySounds[id].canPlayMp3()) {
			source = source.replace(/\.EXT/, '.mp3');
		} else if (ponySounds[id].canPlayOgg()) {
			source = source.replace(/\.EXT/, '.ogg');
		} else {
			throw new Exception("No supported audio formats");
		}
		
		ponySounds[id].changeSource(source);
		
		return ponySounds[id];
	}
	
	// Updater
	var Updater = function() {
		var k = this;
		
		k.classChecking = 'ponyhoof_updater_checking';
		k.classLatest = 'ponyhoof_updater_latest';
		k.classError = 'ponyhoof_updater_error';
		k.classNewVersion = 'ponyhoof_updater_newVersion';
		k.classVersionNum = 'ponyhoof_updater_versionNum';
		k.classUpdateButton = 'ponyhoof_updater_updateNow';
		
		k.update_url = UPDATEURL;
		k.checkForUpdates = function() {
			loopClassName(k.classUpdateButton, function(ele) {
				if (ISSAFARI) {
					// Ninjakit is bugged and only listens to install script requests on page load, no DOMNodeInserted, so we plan to open a new window
					ele.target = '_blank';
				}
				
				ele.addEventListener('click', k._updateNowButton, false);
			});

			log("Checking for updates...");
			try {
				ajax({
					 method: 'GET'
					,url: k.update_url
					,onload: function(response) {
						if (response.status != 200) {
							k._onError(response);
							return;
						}
						
						try {
							var json = JSON.parse(response.responseText);
						} catch (e) {
							k._onError(response);
							return;
						}
						
						if (json.version > VERSION) {
							k._newVersion(json);
						} else {
							k._noNewVersion();
						}
					}
					,onerror: function(response) {
						k._onError(response);
					}
				});
			} catch (e) {
				if (e.status == -100) {
					// No GM_xmlhttpRequest()
					var s = d.createElement('script');
					s.type = 'text/javascript';
					s.src = UPDATEJS;
					d.body.appendChild(s);
					return;
				}
				k._onError(e);
			}
		};
		
		k._noNewVersion = function() {
			// Hide checking for updates
			loopClassName(k.classChecking, function(ele) {
				ele.style.display = 'none';
			});

			// Show yay
			loopClassName(k.classLatest, function(ele) {
				ele.style.display = 'block';
			});
		};
		k._newVersion = function(json) {
			// Hide checking for updates
			loopClassName(k.classChecking, function(ele) {
				ele.style.display = 'none';
			});

			// Show version number
			loopClassName(k.classVersionNum, function(ele) {
				ele.textContent = json.version;
			});
			// Show that we have a new version
			loopClassName(k.classNewVersion, function(ele) {
				ele.style.display = 'block';
			});
			// Change the update now button to point to the new link
			loopClassName(k.classUpdateButton, function(ele) {
				if (ISSAFARI) {
					ele.href = json.safari;
					return;
				}
				
				ele.href = json.update_url;
			});
		};
		k._onError = function(response) {
			// Hide checking for updates
			loopClassName(k.classChecking, function(ele) {
				ele.style.display = 'none';
			});

			// Show derp
			loopClassName(k.classError, function(ele) {
				ele.style.display = 'block';
			});

			log("Error checking for updates.");
			dir(response);
		};

		k.updateDialog = null;
		k._updateNowButton = function() {
			if (this.getAttribute('data-ponyhoof-updater-buttonOk') == 'false') {
				return false;
			}

			if (STORAGEMETHOD == 'chrome') {
				k._cws();
				return false;
			}

			if (STORAGEMETHOD == 'opera') {
				k._opera();
				return false;
			}
			
			if (DIALOGS.updater_dialog) {
				k.updateDialog.show();
				return;
			}

			var c = "The update will load after you reload Facebook.";
			if (ISCHROME) {
				c = "Click Continue on the bottom of this window and click Add to finish updating. The update will load after you reload Facebook.";
			}
			if (ISSAFARI) {
				c = "Follow the instructions in the new window and reload Facebook when you are done.";
			}
			if (ISOPERA) {
				c = "Follow the instructions in the new window and reload Facebook when you are done.";
			}
			
			var bottom = '';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button" id="ponyhoof_updater_dialog_reload"><span class="uiButtonText">Reload now</span></a>';
			bottom += '<a href="#" class="uiButton uiButtonLarge" role="button" id="ponyhoof_updater_dialog_notnow"><span class="uiButtonText">Not now</span></a>';
			
			k.updateDialog = new Dialog('updater_dialog');
			k.updateDialog.alwaysModal = true;
			k.updateDialog.create();
			k.updateDialog.changeTitle("Ponyhoof Update");
			k.updateDialog.changeContent(c);
			k.updateDialog.changeBottom(bottom);
			
			$('ponyhoof_updater_dialog_reload').addEventListener('click', function() {
				addClass(this, 'uiButtonDisabled');
				addClass($('ponyhoof_updater_dialog_notnow'), 'uiButtonDisabled');
				w.location.reload();
				return false;
			});
			
			$('ponyhoof_updater_dialog_notnow').addEventListener('click', function() {
				k.updateDialog.close();
				return false;
			});
			
			return false;
		};

		k.cwsDialog = null;
		k._cws = function() {
			if ($('ponyhoof_dialog_update_cws')) {
				k.cwsDialog.show();
				return;
			}

			var newversion = d.documentElement.getAttribute('data-ponyhoof-update-current');
			var c = "<strong>Ponyhoof automatically updates from the Chrome Web Store.</strong><br><br>To update now, open Extensions, enable Developer mode at the top-right and click the &quot;Update extensions now&quot; button.";
			if (newversion) {
				c += " Verify that the version changes from "+VERSION+" to "+parseFloat(newversion)+" and reload Facebook.";
			}
			
			var bottom = '';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button" id="ponyhoof_updater_cws_openExtensions"><span class="uiButtonText">Open Extensions</span></a>';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm reloadNow" role="button"><span class="uiButtonText">Reload now</span></a>';
			bottom += '<a href="#" class="uiButton uiButtonLarge notNow" role="button"><span class="uiButtonText">Not now</span></a>';
			
			k.cwsDialog = new Dialog('update_cws');
			k.cwsDialog.alwaysModal = true;
			k.cwsDialog.create();
			k.cwsDialog.changeTitle("Ponyhoof Update");
			k.cwsDialog.changeContent(c);
			k.cwsDialog.changeBottom(bottom);
			
			var openExtensionsButton = $('ponyhoof_updater_cws_openExtensions');

			openExtensionsButton.addEventListener('click', function() {
				if (!hasClass(this, 'uiButtonDisabled')) {
					chrome.extension.sendRequest({'command':'openExtensions'});
				}
				return false;
			});

			k._initReloadButtons(k.cwsDialog);
		};

		k.operaDialog = null;
		k._opera = function() {
			if ($('ponyhoof_dialog_update_opera')) {
				k.operaDialog.show();
				return;
			}

			var c = '';
			c += "If you get this security prompt, check <strong>Always allow installation from this location</strong> and click <strong>OK</strong>.<br><br><img src='"+THEMEURL+"_welcome/installv2/install_opera_1.png' alt='' width='385' height='170' class='ponyhoof_image_shadow'><br><br>";
			c += "Click <strong>Install</strong>. The update will load after you reload Facebook.<br><br><img src='"+THEMEURL+"_welcome/installv2/install_opera_2.png' alt='' width='316' height='201' class='ponyhoof_image_shadow'>";
			
			var bottom = '';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm reloadNow" role="button"><span class="uiButtonText">Reload now</span></a>';
			bottom += '<a href="#" class="uiButton uiButtonLarge notNow" role="button"><span class="uiButtonText">Not now</span></a>';
			
			k.operaDialog = new Dialog('update_opera');
			k.operaDialog.alwaysModal = true;
			k.operaDialog.create();
			k.operaDialog.changeTitle("Ponyhoof Update");
			k.operaDialog.changeContent(c);
			k.operaDialog.changeBottom(bottom);

			k._initReloadButtons(k.operaDialog);
		};

		k._initReloadButtons = function(dialog) {
			$$(dialog.dialog, '.reloadNow', function(ele) {
				ele.addEventListener('click', function() {
					if (!hasClass(this, 'uiButtonDisabled')) {
						$$(dialog.dialog, '.button', function(ele) {
							addClass(ele, 'uiButtonDisabled');
						});
						w.location.reload();
					}
					return false;
				});
			});

			$$(dialog.dialog, '.notNow', function(ele) {
				ele.addEventListener('click', function() {
					if (!hasClass(this, 'uiButtonDisabled')) {
						dialog.close();
					}
					return false;
				});
			});
		};
	};
	
	var BrowserPoniesHoof = function() {
		var k = this;
		
		k.dialog = null;
		k.url = '//hoof.little.my/_browserponies/';
		k.script = '(function (srcs,cfg) { var cbcount = 1; var callback = function () { -- cbcount; if (cbcount === 0) { BrowserPonies.setBaseUrl(cfg.baseurl); if (!BrowserPoniesBaseConfig.loaded) { BrowserPonies.loadConfig(BrowserPoniesBaseConfig); BrowserPoniesBaseConfig.loaded = true; } BrowserPonies.loadConfig(cfg); if (!BrowserPonies.running()) BrowserPonies.start(); } }; if (typeof(BrowserPoniesConfig) === "undefined") { window.BrowserPoniesConfig = {}; } if (typeof(BrowserPoniesBaseConfig) === "undefined") { ++ cbcount; BrowserPoniesConfig.onbasecfg = callback; } if (typeof(BrowserPonies) === "undefined") { ++ cbcount; BrowserPoniesConfig.oninit = callback; } var node = (document.body || document.documentElement || document.getElementsByTagName(\'head\')[0]); for (var id in srcs) { if (document.getElementById(id)) continue; if (node) { var s = document.createElement(\'script\'); s.type = \'text/javascript\'; s.id = id; s.src = srcs[id]; node.appendChild(s); } else { document.write(\'\u003cscript type="text/javascript" src="\'+ srcs[id]+\'" id="\'+id+\'"\u003e\u003c/script\u003e\'); } } callback();})({"browser-ponies-script":"'+k.url+'browserponies.js","browser-ponies-config":"'+k.url+'basecfg.js"},{"baseurl":"'+k.url+'","fadeDuration":500,"volume":1,"fps":25,"speed":3,"audioEnabled":false,"showFps":false,"showLoadProgress":true,"speakProbability":0.1,"spawn":{},"spawnRandom":1});void(0)';
		
		k.run = function() {
			injectScriptByText(k.script);
		};
		
		k.createDialog = function() {
			if ($('ponyhoof_dialog_browserponies')) {
				k.dialog.show();
				return;
			}
			
			k.injectStyle();
			
			var c = '';
			c += '<a href="#" class="uiButton uiButtonConfirm" role="button" id="ponyhoof_bp_more"><span class="uiButtonText">Add more</span></a><br>';
			c += '<a href="#" class="uiButton" role="button" id="ponyhoof_bp_close"><span class="uiButtonText">Hide this</span></a><br>';
			c += '<a href="#" class="uiButton" role="button" id="ponyhoof_bp_remove"><span class="uiButtonText">Clear all</span></a>';
			
			k.dialog = new Dialog('browserponies');
			k.dialog.canCardspace = false;
			k.dialog.create();
			k.dialog.changeContent(c);
			k.dialog.show();
			
			$('ponyhoof_bp_more').addEventListener('click', k.morePonies, false);
			$('ponyhoof_bp_close').addEventListener('click', k.closeDialog, false);
			$('ponyhoof_bp_remove').addEventListener('click', k.clearAll, false);
		};
		
		k.injectStyle = function() {
			var css = '';
			css += '#ponyhoof_dialog_browserponies h3, #ponyhoof_dialog_browserponies .bottom {display:none;}';
			css += '#ponyhoof_dialog_browserponies .generic_dialog {z-index:100000000 !important;}';
			css += '#ponyhoof_dialog_browserponies .generic_dialog_popup {margin:46px 8px 0 auto;}';
			css += '.sidebarMode #ponyhoof_dialog_browserponies .generic_dialog_popup {margin-right:213px;}';
			css += '#ponyhoof_dialog_browserponies .popup {width:100px;margin:0 0 0 auto;opacity:.6;-webkit-transition:opacity .3s linear;-moz-transition:opacity .3s linear;-o-transition:opacity .3s linear;transition:opacity .3s linear;}';
			css += '#ponyhoof_dialog_browserponies .popup:hover {opacity:1;}';
			css += '#ponyhoof_dialog_browserponies .content {background:#F2F2F2;text-align:center;padding-bottom:0;}';
			css += '#ponyhoof_dialog_browserponies .uiButton {margin-bottom:10px;}';
			css += '#browser-ponies img {-moz-user-select:none;-webkit-user-select:none;}';
			injectManualStyle(css, 'browserponies');
		};
		
		k.copyrightDialog = function() {
			createSimpleDialog('browserponies_copyright', "Browser Ponies", "To add more ponies, click the &quot;Add more&quot; button on the top-right of the screen.<br><br><a href='http://panzi.github.com/Browser-Ponies/' target='_blank'>Browser Ponies</a> created by Mathias Panzenb&ouml;ck, which is based on <a href='http://desktopponies.com/' target='_blank'>Desktop Ponies</a> written by <a href='mailto:random.anonymous.pony@gmail.com'>random.anonymous.pony@gmail.com</a>");
		};

		k.morePonies = function() {
			k.run();
			return false;
		};

		k.closeDialog = function() {
			k.dialog.close();
			return false;
		};

		k.clearAll = function() {
			k.closeDialog();
			injectScriptByText('BrowserPonies.stop();');
			return false;
		};
	};
	
	// Options
	var Options = function() {
		var k = this;
		
		k.dialog = null;
		k.saveButton = null;
		
		k.needToSaveLabel = false;
		k.needToRefresh = false;
		k.customCssChanged = false;
		
		k.browserPonies = null;
		k._stack = CURRENTSTACK;
		
		k.create = function() {
			// Did we create our Options interface already?
			if ($('ponyhoof_dialog_options')) {
				k._refreshDialog();
				return false;
			}
			
			k.injectStyle();
			
			if (!runMe) {
				var extra = '';
				/*if (ISCHROME) {
					extra = '<br><br><a href="http://jointheherd.little.my" target="_top">Please install the update of Ponyhoof from the Chrome Web Store here.</a>';
				}*/
				
				k.dialog = new Dialog('options_force_run');
				k.dialog.create();
				k.dialog.changeTitle("Ponyhoof does not run on "+w.location.hostname);
				k.dialog.changeContent("Unfortunately, your browser stores settings seperately for each domain ("+w.location.protocol+"//www.facebook.com is different from "+w.location.protocol+"//"+w.location.hostname+")"+extra);
				k.dialog.addCloseButton();
				return;
			}
			
			var c = '';
			c += '<div class="ponyhoof_tabs clearfix">';
				c += '<a href="#" class="active" data-ponyhoof-tab="main">General</a>';
				c += '<a href="#" data-ponyhoof-tab="extras">Extras</a>';
				c += '<a href="#" data-ponyhoof-tab="advanced">Debug</a>';
				c += '<a href="#" data-ponyhoof-tab="about">About</a>';
			c += '</div>';
			
			c += '<div class="ponyhoof_tabs_section" id="ponyhoof_options_tabs_main" style="display:block;">';
			//c += '<div class="ponyhoof_tabs_section" id="ponyhoof_options_tabs_main">';
				c += '<div class="clearfix">';
				/*if (ISCHROME && STORAGEMETHOD == 'localstorage') {
					c += '<div class="ponyhoof_message uiBoxYellow ponyhoof_options_cwsmessage"><a href="http://jointheherd.little.my" class="uiButton uiButtonConfirm rfloat" role="button" target="_blank"><span class="uiButtonText">Get it now</span></a><span class="wrap">Ponyhoof is now available from the Chrome Web Store.</span></div><br>';
				}*/
				c += '<a href="/ajax/sharer/?s=18&amp;p[]='+PONYHOOF_PAGE+'" rel="dialog" class="uiButton uiButtonSpecial rfloat ponyhoof_noShareIsCare" role="button" data-hover="tooltip" data-tooltip-alignh="right" title="Remember! You gotta share... You gotta care..."><span class="uiButtonText">Share with your pals!</span></a>';
				
				c += '<div class="ponyhoof_show_if_injected">Select your favorite character:</div>';
				c += '<div class="ponyhoof_hide_if_injected">Select your favorite character to re-enable Ponyhoof:</div>';
				c += '<div id="ponyhoof_options_pony"></div>';
				c += '<div id="ponyhoof_options_likebox_div"><iframe src="about:blank" id="ponyhoof_options_likebox" scrolling="no" frameborder="0" allowTransparency="true" class="ponyhoof_options_framerefresh"></iframe></div>';
				c += '<a href="'+w.location.protocol+PONYHOOF_URL+'" class="ponyhoof_options_linkclick ponyhoof_options_fatlink" data-hovercard="/ajax/hovercard/page.php?id='+PONYHOOF_PAGE+'">Visit the Ponyhoof page for support</a>';
				c += '<a href="#" class="ponyhoof_options_fatlink" id="ponyhoof_browserponies" data-hover="tooltip" title="Run Desktop Ponies on this page for MOAR ponies!!">Run Browser Ponies</a>';
				c += '<div class="ponyhoof_show_if_injected"><a href="#" class="ponyhoof_options_fatlink" id="ponyhoof_options_disable">Disable Ponyhoof</a></div>';
				
					c += '<div class="ponyhoof_message uiBoxYellow ponyhoof_updater_newVersion">';
						c += '<a href="#" class="uiButton uiButtonSpecial rfloat ponyhoof_updater_updateNow" role="button"><span class="uiButtonText">Update now</span></a>';
						c += '<span class="wrap">An update (v<span class="ponyhoof_updater_versionNum"></span>) for Ponyhoof is available.</span>';
					c += '</div>';
					c += '<div class="ponyhoof_message uiBoxRed ponyhoof_updater_error">Ponyhoof can\'t check for updates automatically. <a href="'+w.location.protocol+PONYHOOF_URL+'" class="ponyhoof_options_linkclick">Go to the Ponyhoof page for the latest news.</a></div>';
				c += '</div>';
			c += '</div>';
			
			c += '<div class="ponyhoof_tabs_section" id="ponyhoof_options_tabs_extras">';
				c += '<div class="ponyhoof_show_if_injected">';
					c += k.generateCheckbox('login_bg', CURRENTLANG.settings_extras_login_bg);
					// "When other people who aren't in your friend list and not a mutual friend send messages to you, Facebook will send that message to the Other section. Facebook does not send any notifications or indicators that this has happened. Ponyhoof can expand the Messages section to always show the Other section so you won't miss a message. (If you lock your message feature to only allow Pals or Pals of Pals, then you can safely disable this)"
					c += k.generateCheckbox('show_messages_other', "Always show Other messages", {tip:"Facebook sends messages that aren't from your friends or mutual friends to the Other messages section. Ponyhoof can expand the Messages section to always show the Other section so you won't miss a message.<br><br><img src='"+THEMEURL+"_help/other_messages.png' alt='' width='190' height='142' class='ponyhoof_image_shadow'>"});
					c += k.generateCheckbox('pinkieproof', "Strengthen the fourth wall", {title:"Prevents Pinkie Pie from breaking the fourth wall"});
					c += k.generateCheckbox('commentBrohoofed', "Change the icon for "+CURRENTSTACK.liked+" comments", {customFunc:k.commentBrohoofed});
					c += k.generateCheckbox('forceEnglish', "Always use Ponyhoof in English", {title:"Ponyhoof tries to use your Facebook language, but you can force Ponyhoof to always use English", refresh:true});
					c += k.generateCheckbox('allowLoginScreen', "Ponify Facebook login screen");
					c += '<div id="ponyhoof_options_randomSetting" class="ponyhoof_menu_withlabel"><span class="ponyhoof_menu_label">Randomize: </span></div>';
					c += '<br>';

					c += '<span class="ponyhoof_dialog_header" data-hover="tooltip" title="Sounds are experimental, they might derp from time to time">Sounds <a href="#" class="uiHelpLink"></a></span>';
					c += k.generateCheckbox('sounds', "Play sounds (e.g. notifications)", {title:"Notification sounds are only available for Rainbow Dash, Pinkie Pie, Applejack, Fluttershy, Big Macintosh, Colgate and Luna"}); // Firefox/Safari/Opera is glitchy, need to find out why
					c += k.generateCheckbox('chatSound', "Change chat sound", {refresh:true});
					c += '<br>';

					c += '<span class="ponyhoof_dialog_header">Performance</span>';
					c += k.generateCheckbox('disable_animation', "Disable all animations");
					c += k.generateCheckbox('disableDomNodeInserted', "Disable HTML detection", {title:"Disables Ponyhoof from ponifying certain stuff that is not possible to do with styling alone such as notifications and dialogs (Some features require this to be enabled)", refresh:true, customFunc:k.disableDomNodeInserted});
					c += '<br>';
				c += '</div>';
				
				c += '<a href="#" class="ponyhoof_options_fatlink" id="ponyhoof_options_clearLocalStorage" data-hover="tooltip" title="Reset all Ponyhoof settings and show the welcome screen">Reset settings</a>';
				c += '<a href="http://ponyhoof.little.my/faq" class="ponyhoof_options_fatlink" target="_blank" data-hover="tooltip" title="View frequently asked questions, such as how to uninstall or update">View the Ponyhoof FAQ</a>';
				//c += '<a href="https://docs.google.com/spreadsheet/viewform?formkey=dGZVUTNFRXhtN215Q0xPdEVzQ3ZXSVE6MQ" target="_blank">Uninstall Ponyhoof</a>';
			c += '</div>';
			
			c += '<div class="ponyhoof_tabs_section" id="ponyhoof_options_tabs_advanced">';
				c += '<div class="ponyhoof_message uiBoxYellow" style="margin-bottom:8px;">These features are unsupported and used for debugging. This should be used by advanced users only.</div>';
				c += '<textarea id="ponyhoof_options_technical" READONLY spellcheck="false"></textarea><br><br>';
				
				//c += '<span class="ponyhoof_dialog_header">Linked CSS</span>';
				//c += '<textarea id="ponyhoof_options_linkedcss" READONLY spellcheck="false"></textarea><br><br>';
				
				if (STORAGEMETHOD == 'localstorage') {
					c += '<span class="ponyhoof_dialog_header">localStorage dump</span>';
					c += '<textarea id="ponyhoof_options_dump" READONLY spellcheck="false"></textarea><br><br>';
				}
				
				c += '<div class="ponyhoof_show_if_injected">';
					c += '<span class="ponyhoof_dialog_header">Custom CSS</span>';
					c += '<textarea id="ponyhoof_options_customcss" placeholder="Enter any custom CSS to load after Ponyhoof is loaded." title="Enter any custom CSS to load after Ponyhoof is loaded." spellcheck="false"></textarea><br>';
					c += '<a href="#" class="uiButton" role="button" id="ponyhoof_options_customcss_preview"><span class="uiButtonText">Preview</span></a><br><br>';
				c += '</div>';
				
				c += '<span class="ponyhoof_dialog_header">Settings</span>';
				c += '<textarea id="ponyhoof_options_debug_settings" spellcheck="false"></textarea>';
				c += '<a href="#" class="uiButton" role="button" id="ponyhoof_options_debug_settings_saveall"><span class="uiButtonText">Import settings</span></a><br><br>';
				c += 'Raw: <input type="text" id="ponyhoof_options_debug_settingsKey" placeholder="Key" title="Key" class="inputtext" spellcheck="false"> <input type="text" id="ponyhoof_options_debug_settingsValue" placeholder="Value" title="Value" class="inputtext" spellcheck="false"> <a href="#" class="uiButton" role="button" id="ponyhoof_options_debug_settings_saveValue"><span class="uiButtonText">Save raw value</span></a><br><br>';
				
				c += '<div class="ponyhoof_show_if_injected">';
					c += '<span class="ponyhoof_dialog_header">Other</span>';
					c += k.generateCheckbox('debug_dominserted_console', "Dump DOMNodeInserted data to console");
					c += k.generateCheckbox('debug_slow_load', "Disable fast load");
					c += k.generateCheckbox('debug_disablelog', "Disable console logging", {customFunc:k.debug_disablelog});
					c += '<a href="#" id="ponyhoof_options_tempRemove" class="ponyhoof_options_fatlink">Remove style</a>';
					c += '<a href="#" id="ponyhoof_options_sendSource" class="ponyhoof_options_fatlink">Send page source</a>';
				c += '</div>';
				
				c += '<div class="ponyhoof_hide_if_injected">';
					c += '<span class="ponyhoof_dialog_header">Other</span>';
					c += 'You must enable Ponyhoof to use custom CSS or dump debug data.';
				c += '</div>';
			c += '</div>';
			
			c += '<div class="ponyhoof_tabs_section" id="ponyhoof_options_tabs_about">';
				c += '<div class="clearfix">';
				c += '<div class="top">';
				c += '<div class="rfloat"><a href="'+w.location.protocol+PONYHOOF_URL+'" class="ponyhoof_options_linkclick" data-hovercard="/ajax/hovercard/page.php?id='+PONYHOOF_PAGE+'" id="ponyhoof_options_devpic"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEQAACxEBf2RfkQAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAEoUlEQVRoQ9WZa2gUVxTHNz6roiKUWqW0omCtYlsjtfii0hgMQkQtVakPSinRL/0QU1i22OIHEWMXUVdsE1SI8YGIpoIvKMgKEZJU8qHdZLc0TUxMt+lmn4776m52/J/xJLk7GYXE3UnuH35k7rl37vmfzc7cO7MWM+Rfb/+ID+UWCjkBJnNTXqEIJ1jDTTmFAggvsHFITqGAmaAP3OGQnEIBy4EKwmACh+UTzO/gQojlHJZPMP+DUEg5h+UTzF8QCrnOYfkE801CIT4wjrvkEUwTdJH3F0Is4W55BNOzdUUQ+7jbfCH5RD4clnDeWqGAfi5xt8VqtfKRSULyJeA4WAE4mq3KysohawTGfgX0hTwGBdTf2NhYqA00U0j+MaDveyPYA17jLk1ut7uwt7d3GTc1YcwRoC+EmO/1ehdh/C4eaq5gYDV4wmb+A4fBO9RXXV1tURTlfDgcLtIGQ+i7zmP1fBmPx2+3trZq5xoJYwrAfPAuh3IrTPwJiIJ+UylAhov+edS1IJVKhSKRyA4e6+IxWQQqLnsSiUQbFd8vxCeDlaACXAO00aTzZ/GQ3AuTF4EY0JtsiZy939L3NNGnBML70TYao4b2nFGjf/9LZreAH8EDEKc+gW7wNqfMn5CkBCQ4aRaBTSdV5citIfEsig1ig9C1+AGnyr+QrBQkOXmuoA9n4DozTUi6FfzPJl6VDNjJU5svJN8O6KI3MjccTF4hDQQTu0BaMDVcHIBnG2XBCK3k9FhrZPSF+D47df/xhqPjeZrRUU1NzQSXyzXP5/MVRQKhvb2lJ/40Mvsiwt9cVDOJlJpMJtuj0ajD7/eXOJ3OKTx9/uVwOKahgE+xzbDBQBVW6l+UKqdiZPZlBHdWq5lITBWFxdLf09NzoK6ubganM08wRYsb3XUMDb+MiPVqOqY8rcKO4Ouurq5ltbW1k3hacwUzi0FENDcCvufpRkcwQO+tPIKhkUJ3vGKe1lwh8Thwg43kAnqmf4unN09IelAwkYWv5FhbcNtPhn3+kmPG8efQBtK8awTJNgH9mkF3rXNgVUd7x1Ll6B2xb4DY3d+TqT+61UD5JXq53a7vB8c5TX6FRIuA+HbkN7AXDNwuA4HA5nhds2hukNO/fpvJZNKxWKwGbXqAKgSHQIvW//zu9zlPlR8hwQzQCoLgFPgQcO+g8LRYEX/YQd/5oYWst8/F2nMynU4/aWpqmsanaELfe+A7cA8s5HBuhYnp0ysHu8FUDhsKn/bpUFv3PozT77/oYWu8x+OZjqfJzlAo9AWfkiWMIUb/xyEsblcaGhqmwgz998RCPDzEEgwGS7EjuMXNsSmv17uf/sK4+O6XuKsNgLDNoa/gBbfbPZtDY0t2u31Sc3Oz9moUxunZXSzkZ20Qq7Oz803sq3Zzc2yprKysAGjHML5OV8iQh6f6+vr3TX/rOFzB+CwgrjfbuWtANpvN/NenIxHM/yUUsoLD8gnmrwiFvMFh+QTzVi6CtjDaC2wpBfPFXIiLQ3IKBbwOaP90k0NyCgUQj4CDQ/IKRdAb+wpuyisUcQBs5aa8QhEbgfk/teVaKGIOyNOPNhbLM4HQ8sK9y3wCAAAAAElFTkSuQmCC" alt="" width="50" height="50"></a>';
				c += '</div>';
				c += '<strong>Ponyhoof v'+VERSION+'</strong> <span class="ponyhoof_show_if_loaded inline"><em>(style v<span class="ponyhoof_VERSION_CSS"></span>)</em></span><br>';
				c += 'By <a href="'+w.location.protocol+'//'+getFbDomain()+'/ngyikp" class="ponyhoof_options_linkclick" data-hovercard="/ajax/hovercard/user.php?id=100000971648506">Ng Yik Phang</a> <a href="'+w.location.protocol+PONYHOOF_URL+'?sk=app_363739923646048" class="ponyhoof_options_linkclick">(View full credits)</a>';
				c += '</div>';

				c += '<a href="https://twitter.com/ponyhoof" target="_blank" class="ponyhoof_options_fatlink">Follow us on Twitter</a>';
				if (ISCHROME || STORAGEMETHOD == 'chrome') {
					//c += '<a href="https://chrome.google.com/webstore/detail/efjjgphedlaihnlgaibiaihhmhaejjdd/reviews" target="_blank" class="ponyhoof_options_fatlink">Rate us 5 stars and write a review on the Chrome Web Store</a>';
					//c += '<div id="ponyhoof_options_plusone"><div class="g-plusone" data-size="medium" data-annotation="inline" data-width="443" data-href="https://chrome.google.com/webstore/detail/efjjgphedlaihnlgaibiaihhmhaejjdd"></div></div>';
				}
				c += '<a href="http://ponyhoof.little.my/donate" target="_blank" class="ponyhoof_options_fatlink">Help us a hoof and support our development!</a>';

				c += '<div class="ponyhoof_options_aboutsection"><div class="inner">The Ponyhoof extension for Facebook is not affiliated or endorsed by Facebook and/or Hasbro in any way. MY LITTLE PONY, FRIENDSHIP IS MAGIC and all related characters are trademarks of Hasbro. &copy; '+(new Date().getFullYear())+' Hasbro. All Rights Reserved.</div></div>';
				c += '</div>';
			c += '</div>';
			
			var successText = '';
			var ponyData = convertCodeToData(CURRENTPONY);
			if (ponyData.successText) {
				successText = ponyData.successText+' ';
			}
			var bottom = '';
			bottom += '<div class="lfloat"><span class="ponyhoof_updater_checking">Checking for updates...</span><span class="ponyhoof_updater_latest">'+successText+'Ponyhoof is up-to-date.</span></div>';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button" id="ponyhoof_options_save"><span class="uiButtonText">'+CURRENTLANG.close+'</span></a>';
			
			k.dialog = new Dialog('options');
			k.dialog.create();
			k.dialog.changeTitle(CURRENTLANG.options_title);
			k.dialog.changeContent(c);
			k.dialog.changeBottom(bottom);
			
			// After
			k.saveButton = $('ponyhoof_options_save');
			
			k.dialog.dialog.getElementsByClassName('ponyhoof_noShareIsCare')[0].addEventListener('click', function() {
				k.dialog.close();
			}, false);
			
			setTimeout(function() {
				$('ponyhoof_options_likebox').src = '//'+getFbDomain()+'/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fprofile.php?id='+PONYHOOF_PAGE+'&send=false&layout=standard&show_faces=true&action=like&colorscheme=light#ponyhoof_runme';
			}, 500);
			
			var l = k.dialog.dialog.getElementsByClassName('ponyhoof_options_linkclick');
			for (i = 0; i < l.length; i++) {
				l[i].addEventListener('click', function() {
					k.dialog.close();
				}, false);
			}
			
						
			// Pony selector
			var ponySelector = new PonySelector($('ponyhoof_options_pony'), {});
			//ponySelector.allowNone = true;
			ponySelector.allowRandom = true;
			ponySelector.customClick = function(menuItem, menuClass) {
				if (ponySelector.oldPony == 'NONE' || CURRENTPONY == 'NONE') {
					if (ponySelector.oldPony == 'NONE' && CURRENTPONY != 'NONE') {
						extraInjection();
						runDOMNodeInserted();
					}
				}
				if (ponySelector.oldPony != 'NONE' && CURRENTPONY == 'NONE') {
					k.needsToRefresh = true;
				}
				if (k._stack != CURRENTSTACK) {
					k.needsToRefresh = true;
				}
				k.needToSaveLabel = true;
				k.updateCloseButton();
				
				var f = k.dialog.dialog.getElementsByClassName('ponyhoof_options_framerefresh');
				for (var i = 0; i < f.length; i++) {
					(function() {
						var iframe = f[i];
						fadeOut(iframe, function() {
							setTimeout(function() {
								iframe.style.display = 'block';
								removeClass(iframe, 'ponyhoof_fadeout');
								
								iframe.src = iframe.src.replace(/\href\=/, '&href=');
							}, 250);
						});
					})();
				}
			};
			ponySelector.createSelector();
			
			// Updater
			setTimeout(function() {
				var update = new Updater();
				update.checkForUpdates();
			}, 500);
			
			// Save button
			k.saveButton.addEventListener('click', k.saveButtonClick, false);
			
			k.checkboxInit();
			k.tabsInit();
			k.randomInit();
			
			// Disable Ponyhoof
			$('ponyhoof_options_disable').addEventListener('click', k.disablePonyhoof, false);

			// Browser Ponies
			$('ponyhoof_browserponies').addEventListener('click', function() {
				k.dialog.close();
				
				if (!k.browserPonies) {
					k.browserPonies = new BrowserPoniesHoof();
					k.browserPonies.copyrightDialog();
				}
				k.browserPonies.run();
				k.browserPonies.createDialog();
				
				return false;
			}, false);
			
			// Reset settings
			$('ponyhoof_options_clearLocalStorage').addEventListener('click', function() {
				if (STORAGEMETHOD == 'localstorage') {
					if (confirm(SIG+" localStorage must be cleared in order to reset settings. Doing this may cause other extensions (e.g. Unfriend Finder) to lose their settings.")) {
						try {
							localStorage.clear();
						} catch (e) {
							alert(e.toString());
						}
					}
				}
				
				if (typeof GM_listValues != 'undefined') {
					try {
						var keys = GM_listValues();
						for (i = 0, key = null; key = keys[i]; i++) {
							GM_deleteValue(key);
						}
					} catch (e) {
						alert(e.toString());
					}
				}
				
				if (STORAGEMETHOD == 'chrome') {
					chrome_clearStorage();
				}
				
				k.dialog.close();
				w.location.reload();
				return false;
			}, false);
			
			k._refreshDialog();
		};
		
		k._refreshDialog = function() {
			k.ki();
			k.disableDomNodeInserted();
			
			if (k.debugLoaded) {
				$('ponyhoof_options_technical').textContent = k.techInfo();
				//$('ponyhoof_options_linkedcss').textContent = k.linkedCss();
			}
		};
		
		k.debugLoaded = false;
		k.techInfo = function() {
			var tech = SIG + " " + new Date().toString() + "\n";
			tech += "USERID: " + USERID + "\n";
			tech += "CURRENTPONY: " + CURRENTPONY + "\n";
			tech += "REALPONY: " + REALPONY + "\n";
			tech += "CURRENTSTACK: " + CURRENTSTACK.stack + "\n";
			tech += "STORAGEMETHOD: " + STORAGEMETHOD + "\n";
			if (STORAGEMETHOD == 'localstorage') {
				tech += "localStorage.length: " + localStorage.length + "\n";
			}
			tech += "\n";
			tech += "navigator.userAgent: " + w.navigator.userAgent + "\n";
			tech += "window.location.href: " + w.location.href + "\n";
			tech += "document.documentElement.className: " + d.documentElement.className + "\n";
			tech += "document.body.className: " + d.body.className + "\n";
			tech += "\n";
			tech += k.linkedCss();
			tech += "\n";
			tech += k.linkedScript();
			tech += "\n";
			if ($('bfb_options_button')) {
				tech += "Social Fixer is detected.\n";
				if ($('bfb_theme')) {
					tech += "[CONFLICT] Social Fixer theme is detected.\n";
				}
			}
			if (d.getElementsByClassName('rg3fbpz-tooltip').length) {
				tech += "FB Photo Zoom is detected.\n";
			}
			if ($('fbpoptslink')) {
				tech += "FB Purity is detected.\n";
			}
			if (w.navigator.userAgent.match(/Mozilla\/4\.0 \(compatible\; MSIE 7\.0\; Windows/)) {
				tech += "[WARNING] IE 7 user-agent spoofing is detected.\n";
			}
			if ($('fbfPopupContainer')) {
				tech += "FFixer is detected.\n";
			}
			if ($('unfriend_finder')) {
				tech += "Unfriend Finder is detected.\n";
			}
			if ($('socialplus')) {
				tech += "SocialPlus! is detected.\n";
				if ($('mycssstyle')) {
					tech += "[CONFLICT] SocialPlus! theme is detected.\n";
				}
			}
			if ($('ColourChanger')) {
				tech += "[CONFLICT] Facebook Colour Changer is detected.\n";
			}
			if ($('window-resizer-tooltip')) {
				tech += "Window Resizer is detected.\n";
			}
			
			return tech;
		};
		
		k.linkedCss = function() {
			var css = d.getElementsByTagName('link');
			var t = '';
			for (var i = 0; i < css.length; i++) {
				if (css[i].rel == 'stylesheet') {
					t += css[i].href + "\n";
				}
			}
			
			return t;
		};
		
		k.linkedScript = function() {
			var script = d.getElementsByTagName('script');
			var t = '';
			for (var i = 0; i < script.length; i++) {
				if (script[i].src) {
					t += script[i].src + "\n";
				}
			}
			
			return t;
		};
		
		k.debugInfo = function() {
			if (k.debugLoaded) {
				return;
			}
			k.debugLoaded = true;
			
			// Custom CSS
			var customcss = $('ponyhoof_options_customcss');
			if (userSettings.customcss) {
				customcss.value = userSettings.customcss;
			}
			customcss.addEventListener('input', function() {
				if (!k.needsToRefresh) {
					k.needsToRefresh = true;
					k.customCssChanged = true;
					k.updateCloseButton();
				}
			}, false);
			$('ponyhoof_options_customcss_preview').addEventListener('click', function() {
				if (!$('ponyhoof_style_customcss')) {
					injectManualStyle('', 'customcss');
				}
				
				$('ponyhoof_style_customcss').textContent = '/* '+SIG+' */'+customcss.value;
			}, false);
			
			// Technical info
			var techFirstHover = false;
			$('ponyhoof_options_technical').addEventListener('click', function() {
				if (!techFirstHover) {
					techFirstHover = true;
					this.focus();
					this.select();
				}
			}, false);
			
			if (STORAGEMETHOD == 'localstorage') {
				var dump = '';
				for (i in localStorage) {
					dump += i+": "+localStorage[i]+"\n";
				}
				$('ponyhoof_options_dump').value = dump;
			}
			
			// Settings
			var settingsTextarea = $('ponyhoof_options_debug_settings');
			var settingsKey = $('ponyhoof_options_debug_settingsKey');
			var settingsValue = $('ponyhoof_options_debug_settingsValue');
			settingsTextarea.value = JSON.stringify(userSettings);

			$('ponyhoof_options_debug_settings_saveall').addEventListener('click', function() {
				try {
					JSON.parse(settingsTextarea.value);
				} catch (e) {
					createSimpleDialog('debug_settingsKey_error', "Derp'd", "Invalid JSON. ("+e.toString()+")");
					return false;
				}

				if (confirm(SIG+" Are you sure you want to overwrite your settings? Facebook will be reloaded immediately after saving.")) {
					saveValue('settings', settingsTextarea.value);
					w.location.reload();
				}
				return false;
			}, false);

			$('ponyhoof_options_debug_settings_saveValue').addEventListener('click', function() {
				if (!settingsKey.value || settingsKey.value == "Key") {
					createSimpleDialog('debug_settingsKey_error', "Setting key blank", "Please enter the setting key.");
					return false;
				}

				if (settingsKey.value == "Value") {
					createSimpleDialog('debug_settingsKey_error', "Setting value blank", "Please enter the setting value.");
					return false;
				}

				saveValue(settingsKey.value, settingsValue.value);

				createSimpleDialog('debug_settingsKey_yay', "Yay", "Setting key has been added.");
				return false;
			}, false);

			// Misc
			$('ponyhoof_options_tempRemove').addEventListener('click', function() {
				changeThemeSmart('NONE');
				
				k.dialog.close();
				return false;
			}, false);
			
			$('ponyhoof_options_sendSource').addEventListener('click', function() {
				if (confirm(SIG+" Are you sure you want to send the page source for debugging? Only the Ponyhoof developers can view the page. Please send the page source only when necessary.\n\nNote that it will take some time to upload, don't close the browser window until it is finished.")) {
					k.dialog.hide();

					if ($('ponyhoof_sourceSend_input')) {
						$('ponyhoof_sourceSend_input').value = '';
						var sourceSend = $('ponyhoof_sourceSend_input').parentNode;
					}
					var t = d.documentElement.innerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
					var t = '<!DOCTYPE html><html class="'+d.documentElement.className+'" id="'+d.documentElement.id+'"><!-- '+k.techInfo()+' -->'+t+'</html>';
					if (!$('ponyhoof_sourceSend_input')) {
						var sourceSendTxt = d.createElement('input');
						sourceSendTxt.type = 'hidden';
						sourceSendTxt.id = 'ponyhoof_sourceSend_input';
						sourceSendTxt.name = 'post';
						sourceSendTxt.value = t;

						var sourceSend = d.createElement('form');
						sourceSend.method = 'POST';
						sourceSend.action = 'https://paste.little.my/post/';
						sourceSend.target = '_blank';
						sourceSend.appendChild(sourceSendTxt);
						d.body.appendChild(sourceSend);
					}

					sourceSend.submit();
				}
				return false;
			}, false);
			
			$('ponyhoof_options_technical').textContent = k.techInfo();
			//$('ponyhoof_options_linkedcss').textContent = k.linkedCss();
		};

		k.donateLoaded = false;
		k.loadDonate = function() {
			if (k.donateLoaded) {
				return;
			}

			k.donateLoaded = true;
			statTrack('aboutclicked');

			(function() {
			    var s = document.createElement('script'), t = document.getElementsByTagName('script')[0];
			    s.type = 'text/javascript';
			    s.async = true;
			    s.src = '//api.flattr.com/js/0.6/load.js?mode=auto';
			    t.parentNode.insertBefore(s, t);
			})();

			if (ISCHROME || STORAGEMETHOD == 'chrome') {
				/*(function() {
					var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
					po.src = 'https://apis.google.com/js/plusone.js';
					var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
				})();*/
			}
		};
		
		k.checkboxStore = {};
		k.generateCheckbox = function(id, label, data) {
			data = data || {};
			var ex = '';
			var checkmark = '';

			if (userSettings[id]) {
				checkmark += ' CHECKED';
			}
			if (data.title) {
				label += ' <a href="#" class="uiHelpLink"></a>';
				ex += ' data-hover="tooltip" title="'+data.title+'"';
			}
			if (data.tip) {
				label += ' <a href="#" class="uiHelpLink ponyhoof_tip_trigger"><div class="ponyhoof_tip_wrapper"><span class="ponyhoof_tip"><span class="ponyhoof_tip_body">'+data.tip+'</span><span class="ponyhoof_tip_arrow"></span></span></div></a>';
			}

			k.checkboxStore[id] = data;

			return '<div class="uiInputLabel"'+ex+'><input type="checkbox" class="uiInputLabelCheckbox" id="ponyhoof_options_'+id+'" data-ponyhoof-checkmark="'+id+'" '+checkmark+'><label for="ponyhoof_options_'+id+'">'+label+'</label></div>';
		};
		
		k.checkboxInit = function() {
			var extras = $('ponyhoof_dialog_options').querySelectorAll('input[type="checkbox"]');
			for (var i = 0; i < extras.length; i++) {
				var checkmark = extras[i].getAttribute('data-ponyhoof-checkmark');
				var data = {};
				if (k.checkboxStore[checkmark]) {
					data = k.checkboxStore[checkmark];
				}
				if (data.tooltipPosition) {
					extras[i].parentNode.setAttribute('data-tooltip-position', data.tooltipPosition);
				}

				extras[i].addEventListener('click', function() {
					var checkmark = this.getAttribute('data-ponyhoof-checkmark');
					userSettings[checkmark] = this.checked;
					saveSettings();
					
					if (this.checked) {
						addClass(d.documentElement, 'ponyhoof_settings_'+checkmark);
					} else {
						removeClass(d.documentElement, 'ponyhoof_settings_'+checkmark);
					}

					var data = {};
					if (k.checkboxStore[checkmark]) {
						data = k.checkboxStore[checkmark];
					}
					if (data.refresh) {
						k.needsToRefresh = true;
					}
					if (data.customFunc) {
						data.customFunc();
					}
					
					k.needToSaveLabel = true;
					k.updateCloseButton();
				}, true);
			}
		};
		
		k.tabsInit = function() {
			var tabs = k.dialog.dialog.querySelectorAll('.ponyhoof_tabs a');
			for (i = 0; i < tabs.length; i++) {
				tabs[i].addEventListener('click', function() {
					var tabName = this.getAttribute('data-ponyhoof-tab');
					removeClass(k.dialog.dialog.querySelector('.ponyhoof_tabs a.active'), 'active');
					addClass(this, 'active');
					
					// @todo move this out or so?
					switch (tabName) {
						case 'advanced':
							k.debugInfo();
							break;

						case 'about':
							k.loadDonate();
							break;

						default:
							break;
					}

					var sections = k.dialog.dialog.querySelectorAll('.ponyhoof_tabs_section');
					for (i = 0; i < sections.length; i++) {
						sections[i].style.display = 'none';
					}
					$('ponyhoof_options_tabs_'+tabName).style.display = 'block';
					
					return false;
				}, false);
			}
		};
		
		k.saveButtonClick = function() {
			k.dialog.close(function() {
				k.saveButton.getElementsByClassName('uiButtonText')[0].innerHTML = CURRENTLANG.close;
			});
			d.removeEventListener('keydown', k.kf, true);
			
			if (k.debugLoaded) {
				// I had to check to make sure I'm not saving the placeholder text, not sure if this is a Chrome bug
				if ($('ponyhoof_options_customcss').value == "Enter any custom CSS to load after Ponyhoof is loaded.") {
					userSettings.customcss = '';
				} else {
					userSettings.customcss = $('ponyhoof_options_customcss').value;
				}
			}
			saveSettings();
			
			if (k.needsToRefresh) {
				w.location.reload();
			}
			
			return false;
		};
		
		k.randomMenu = null;
		k.randomButton = null;
		k.randomDesc = {
			'mane6': {name:"Mane 6", title:"Twilight Sparkle, Rainbow Dash, Pinkie Pie, Applejack, Fluttershy, Rarity"},
			'most': {name:"Most characters", title:"Randomize most characters, except villians (Discord or Queen Chrysalis)"},
			'all': {name:"All characters"}
		};
		k.randomInit = function() {
			var desc = k.randomDesc[userSettings.randomSetting].name;

			k.randomMenu = new Menu('random', $('ponyhoof_options_randomSetting'));
			k.randomButton = k.randomMenu.createButton(desc);
			k.randomMenu.createMenu();
			k.randomMenu.attachButton();

			for (var code in k.randomDesc) {
				if (k.randomDesc.hasOwnProperty(code)) {
					var check = false;
					if (userSettings.randomSetting == code) {
						check = true;
					}

					k.randomMenu.createMenuItem({
						 html: k.randomDesc[code].name
						,title: k.randomDesc[code].title
						,data: code
						,check: check
						,onclick: function(menuItem, menuClass) {
							var code = menuItem.menuItem.getAttribute('data-ponyhoof-menu-data');
							
							menuClass.button.getElementsByClassName('uiButtonText')[0].innerHTML = menuItem.getText();
							menuClass.changeChecked(menuItem);
							menuClass.close();
							
							userSettings.randomSetting = code;
							saveSettings();

							k.needToSaveLabel = true;
							k.updateCloseButton();
						}
					});
				}
			}
		};

		k.commentBrohoofed = function() {
			if ($('ponyhoof_options_commentBrohoofed').checked) {
				domNodeHandlerMain.commentBrohoofed({target: d.body});
			} else {
				var comments = d.getElementsByClassName('ponyhoof_comment_liked');
				for (var i = 0; i < comments.length; i++) {
					removeClass(comments[i], 'ponyhoof_comment_liked');
				}
			}
		};

		k.disableDomNodeInserted = function() {
			var affectedOptions = ['sounds', 'commentBrohoofed', 'debug_dominserted_console'];
			if ($('ponyhoof_options_disableDomNodeInserted').checked) {
				for (var i = 0; i < affectedOptions.length; i++) {
					$('ponyhoof_options_'+affectedOptions[i]).disabled = true;
					$('ponyhoof_options_'+affectedOptions[i]).checked = false;
				}
			} else {
				for (var i = 0; i < affectedOptions.length; i++) {
					$('ponyhoof_options_'+affectedOptions[i]).disabled = false;
					if (userSettings[affectedOptions[i]]) {
						$('ponyhoof_options_'+affectedOptions[i]).checked = true;
					}
				}
			}
		};

		k.debug_disablelog = function() {
			if ($('ponyhoof_options_debug_disablelog').checked) {
				CANLOG = false;
			} else {
				CANLOG = true;
			}
		};

		k.disableDialog = null;
		k.disablePonyhoof = function() {
			if ($('ponyhoof_dialog_disable')) {
				k.dialog.hide();
				k.disableDialog.show();
				$('ponyhoof_disable_ok').focus();
				return false;
			}

			var c = '';
			c += "<strong>Are you sure you want to disable Ponyhoof?</strong><br><br>";
			c += "You can re-enable Ponyhoof at any time by going back to Ponyhoof Options and re-select a character.";
			
			var bottom = '';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button" id="ponyhoof_disable_ok"><span class="uiButtonText">Disable</span></a>';
			bottom += '<a href="#" class="uiButton uiButtonLarge" role="button" id="ponyhoof_disable_no"><span class="uiButtonText">Cancel</span></a>';
			
			k.dialog.hide();
			k.disableDialog = new Dialog('disable');
			k.disableDialog.alwaysModal = true;
			k.disableDialog.create();
			k.disableDialog.changeTitle("Disable Ponyhoof");
			k.disableDialog.changeContent(c);
			k.disableDialog.changeBottom(bottom);
			k.disableDialog.show();

			$('ponyhoof_disable_ok').focus();
			$('ponyhoof_disable_ok').addEventListener('click', function() {
				userSettings.theme = 'NONE';
				saveSettings();

				$('ponyhoof_disable_ok').className += ' uiButtonDisabled';
				$('ponyhoof_disable_no').className += ' uiButtonDisabled';
				w.location.reload();

				return false;
			}, false);

			$('ponyhoof_disable_no').addEventListener('click', function() {
				k.dialog.show();
				k.disableDialog.close();

				return false;
			}, false);
			
			return false;
		};

		k.updateCloseButton = function() {
			var button = k.saveButton.getElementsByClassName('uiButtonText')[0];
			var text = CURRENTLANG.close;
			
			if (k.needToSaveLabel) {
				text = "Save & Close";
			}
			
			if (k.needsToRefresh) {
				text = "Save & Reload";
			}
			
			button.innerHTML = text;
		};
		
		k.injectStyle = function() {
			var css = '';
			//css += '#ponyhoof_options_tabs_main .clearfix {margin-bottom:10px;}';
			css += '#ponyhoof_options_likebox_div {height:80px;}';
			css += '#ponyhoof_options_likebox {border:none;overflow:hidden;width:100%;height:80px;}';
			css += '#ponyhoof_options_pony {margin:8px 0 16px;}';
			css += '.ponyhoof_options_fatlink {display:block;margin-top:10px;}';
			
			css += '#ponyhoof_dialog_options .uiHelpLink {margin-left:2px;}';
			css += '#ponyhoof_dialog_options textarea, #ponyhoof_dialog_options input[type="text"] {cursor:text;font-family:Consolas,"Andale Mono WT","Andale Mono","Lucida Console","Lucida Sans Typewriter","DejaVu Sans Mono","Bitstream Vera Sans Mono","Liberation Mono","Nimbus Mono L",Monaco,"Courier New",Courier,monospace;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}';
			css += '#ponyhoof_dialog_options textarea {resize:vertical;width:100%;height:60px;min-height:60px;}';

			css += '#ponyhoof_options_tabs_main .ponyhoof_message {margin-top:10px;}';
			css += '.ponyhoof_options_aboutsection {border-top:1px solid #ccc;margin:10px -10px 0;}';
			css += '.ponyhoof_options_aboutsection > .inner {border-top:1px solid #E9E9E9;padding:10px 10px 0;}';
			css += '#ponyhoof_options_devpic {display:block;}';
			css += '#ponyhoof_options_devpic img {width:50px !important;height:50px !important;}';
			css += '#ponyhoof_options_plusone {margin-top:10px;height:23px;}';

			css += '.ponyhoof_tip_wrapper {position:relative;z-index:10;}';
			css += '.ponyhoof_tip_trigger:hover .ponyhoof_tip {display:block;}';
			css += '.ponyhoof_tip_trigger .ponyhoof_tip:hover {display:none;}';
			css += '.ponyhoof_tip {text-align:left;position:absolute;z-index:-1;display:none;top:11px;padding:4px 0 0;right:-7px;color:#000;font-weight:normal;}';
			css += '.ponyhoof_tip_body {line-height:15px;width:300px;white-space:normal;background:#fff;border:1px solid;border-color:#888 #999;display:block;left:0;padding:6px 8px;-webkit-box-shadow:0 1px 0 rgba(0,0,0,.1);-moz-box-shadow:0 1px 0 rgba(0,0,0,.1);box-shadow:0 1px 0 rgba(0,0,0,.1);}';
			css += '.ponyhoof_image_shadow {-webkit-box-shadow:0 3px 8px rgba(0,0,0,.3);-moz-box-shadow:0 3px 8px rgba(0,0,0,.3);box-shadow:0 3px 8px rgba(0,0,0,.3);margin:0 auto;display:block;margin-bottom:3px;}';
			css += '.ponyhoof_tip_arrow {position:absolute;top:0;right:10px;border:solid transparent;border-width:0 3px 5px 4px;border-bottom-color:#888;}';

			/*css += '#ponyhoof_donate, #ponyhoof_options_donatepaypal {background:#EDEFF4;border:1px solid #D2DBEA;color:#9CADCF;font-family:Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;}';
			css += '#ponyhoof_donate .inner, #ponyhoof_options_donatepaypal {background:#EDEFF4;display:block;font-size:16px;font-weight:bold;height:75px;line-height:75px;text-align:center;float:left;width:50%;}';
			css += '#ponyhoof_options_donatepaypal {width:100%;border:0;cursor:pointer;padding:0;border-right:1px solid #D2DBEA;}';
			css += '#ponyhoof_donate .inner:hover, #ponyhoof_options_donatepaypal:hover {background:#DEDFE7;color:#3B5998;}';
			css += '#ponyhoof_donate .inner .FlattrButton {margin-top:6px;}';*/
			
			injectManualStyle(css, 'options');
		};
		
		k.showOptions = function() {
			k.create();
			k.dialog.show();
		};
		
		k.kr = false;
		k.ks = [];
		k.kc = '\x33\x38\x2C\x33\x38\x2C\x34\x30\x2C\x34\x30\x2C\x33\x37\x2C\x33\x39\x2C\x33\x37\x2C\x33\x39\x2C\x36\x36\x2C\x36\x35';
		k.kf = function(e) {
			if (k.kr) {
				return;
			}
			
			k.ks.push(e.which);
			if (k.ks.join(',').indexOf(k.kc) > -1) {
				k.kr = true;
				k.dialog.close();
				
				var width = 720;
				var height = 405;
				
				injectManualStyle('#ponyhoof_dialog_ky .generic_dialog_popup,#ponyhoof_dialog_ky .popup{width:740px;}#ponyhoof_dialog_ky .generic_dialog{z-index:250 !important;}#ponyhoof_kc_align{margin:8px auto 0;text-align:center;}', 'kx');
				var di = new Dialog('ky');
				di.alwaysModal = true;
				di.create();
				di.changeTitle("\x54\x48\x45\x20\x55\x4C\x54\x49\x4D\x41\x54\x45\x20\x42\x52\x4F\x4E\x59\x20\x43\x48\x41\x4C\x4C\x45\x4E\x47\x45");
				di.changeContent('<iframe src="//hoof.little.my/files/b8kBYSoRDdg.htm" width="100%" height="405" scrolling="auto" frameborder="0" allowTransparency="true"></iframe><div id="ponyhoof_kc_align"><a href="#" class="uiButton uiButtonSpecial ponyhoof_noShareIsCare" id="ponyhoof_kc_share" role="button" data-hover="tooltip" title="\x53\x4F\x20\x4D\x55\x43\x48\x20\x50\x4F\x4E\x59" data-tooltip-alignh="center"><span class="uiButtonText">\x53\x48\x41\x52\x45\x20\x57\x49\x54\x48\x20\x59\x4F\x55\x52\x20\x50\x41\x4C\x53\x21</span></a></div>');
				di.addCloseButton(function() {
					di.changeContent('');
				});
				
				$('ponyhoof_kc_share').addEventListener('click', function() {
					var width = 657;
					var height = 412;
					w.open('//'+getFbDomain()+'/sharer/sharer.php?u=http://www.youtube.com/watch?v=b8kBYSoRDdg', 'ponyhoof_kc_sharer', 'left='+((screen.width-width)/2)+',top='+(((screen.height-height)/2)-50)+',width='+width+',height='+height);
					return false;
				}, false);
			}
		};
		
		k.ki = function() {
			d.addEventListener('keydown', k.kf, true);
		};
	};
	
	var optionsGlobal = null;
	function optionsOpen() {
		log("Opening options...");
		
		if (!optionsGlobal) {
			optionsGlobal = new Options();
		}
		optionsGlobal.showOptions();
	}
	
	// Welcome
	var WelcomeUI = function(param) {
		var k = this;
		
		if (param) {
			k.param = param;
		} else {
			k.param = {};
		}
		k.dialogFirst = null;
		k.dialogPinkie = null;
		k.dialogFinish = null;
		
		k._stack = '';
		
		k.start = function() {
			k.injectStyle();
			k.createScenery();
			addClass(d.documentElement, 'ponyhoof_welcome_html');
			statTrack('install');
			
			if (STORAGEMETHOD == 'localstorage' && w.location.protocol == 'http:') {
				k.warnInsecure();
			} else {
				k.showWelcome();
			}
		};
		
		k.warnInsecure = function() {
			var c = '';
			c += "You are using Facebook in non-HTTPS. Due to technical limitations in your browser, switching to HTTPS at any time (e.g. going to Account Settings) will cause you to re-select your settings. (http://"+getFbDomain()+" is different from https://"+getFbDomain()+")<br><br>";
			c += "<strong>Would you like to enable secure browsing now?</strong>";
			
			var bottom = '';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button" id="ponyhoof_welcome_insecure_yes"><span class="uiButtonText">Enable Secure Browsing</span></a>';
			bottom += '<a href="#" class="uiButton uiButtonLarge" role="button" id="ponyhoof_welcome_insecure_skip"><span class="uiButtonText">Skip</span></a>';
			
			var dialog = new Dialog('welcome_insecure');
			dialog.canCardspace = false;
			dialog.create();
			dialog.generic_dialogDiv.className += ' generic_dialog_fixed_overflow';
			dialog.changeTitle("Please enable Secure Browsing (HTTPS)");
			dialog.changeContent(c);
			dialog.changeBottom(bottom);
			
			$('ponyhoof_welcome_insecure_yes').addEventListener('click', function() {
				dialog.close();
				
				var bottom = '';
				bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button" id="ponyhoof_welcome_insecure_reload"><span class="uiButtonText">Reload</span></a>';
				
				dialog = new Dialog('welcome_secure_waiting');
				dialog.create();
				dialog.changeTitle("Waiting...");
				dialog.changeContent("Once you enabled secure browsing, click the Reload button.");
				dialog.changeBottom(bottom);
				
				width = 1000;
				height = 220;
				w.open('https://'+getFbDomain()+'/settings?tab=security&section=browsing', 'ponyhoof_welcome_secure', 'left='+((screen.width-width)/2)+',top='+(((screen.height-height)/2)-50)+',width='+width+',height='+height);
				
				$('ponyhoof_welcome_insecure_reload').addEventListener('click', function() {
					this.className += ' uiButtonDisabled';
					w.location.reload();
				});

				return false;
			}, false);
			
			$('ponyhoof_welcome_insecure_skip').addEventListener('click', function() {
				dialog.close();
				
				k.showWelcome();

				return false;
			}, false);
		};
		
		k.showWelcome = function() {
			if ($('ponyhoof_dialog_welcome')) {
				return;
			}
			
			addClass(d.documentElement, 'ponyhoof_welcome_html_scenery_loaded');
			
			var co = '';
			co += '<div class="uiBoxYellow ponyhoof_message ponyhoof_updater_newVersion">';
				co += '<a href="#" class="uiButton uiButtonSpecial rfloat ponyhoof_updater_updateNow" role="button"><span class="uiButtonText">Update now</span></a>';
				co += '<span class="wrap">An update (v<span class="ponyhoof_updater_versionNum"></span>) for Ponyhoof is available.</span>';
			co += '</div>';
			
			co += '<strong>Select your favorite character to get started:</strong>';
			co += '<div id="ponyhoof_welcome_pony"></div>';
			co += '<div id="ponyhoof_welcome_afterClose">You can re-select your character in Ponyhoof Options at the Account menu.</div>';
			
			var bottom = '';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm uiButtonDisabled" role="button" id="ponyhoof_welcome_next"><span class="uiButtonText">Eeyup</span></a>';
			
			k.dialogFirst = new Dialog('welcome');
			k.dialogFirst.canCardspace = false;
			k.dialogFirst.create();
			k.dialogFirst.generic_dialogDiv.className += ' generic_dialog_fixed_overflow';
			if (BRONYNAME) {
				k.dialogFirst.changeTitle("Welcome to Ponyhoof, "+BRONYNAME+"!");
			} else {
				k.dialogFirst.changeTitle("Welcome to Ponyhoof!");
			}
			k.dialogFirst.changeContent(co);
			k.dialogFirst.changeBottom(bottom);
			
			var menuClosed = false;
			var ponySelector = new PonySelector($('ponyhoof_welcome_pony'), k.param);
			ponySelector.createSelector();
			setTimeout(function() {
				ponySelector.menu.open();
			}, 1);
			ponySelector.menu.afterClose = function() {
				if (!menuClosed) {
					menuClosed = true;
					addClass($('ponyhoof_welcome_afterClose'), 'show');
					
					addClass(d.documentElement, 'ponyhoof_welcome_showmedemo');
					addClass($('navAccount'), 'openToggler');
					//addClass($('ponyhoof_account_options'), 'active');
					
					setTimeout(function() {
						removeClass($('ponyhoof_welcome_next'), 'uiButtonDisabled');
					}, 200);
				}
			};
			
			changeThemeSmart(CURRENTPONY);
			k._stack = CURRENTSTACK;
			
			var update = new Updater();
			update.checkForUpdates();
			
			$('ponyhoof_welcome_next').addEventListener('click', function(e) {
				if (hasClass(this, 'uiButtonDisabled')) {
					e.stopPropagation();
					return false;
				}
				
				k.dialogFirst.close();
				fadeOut($('ponyhoof_welcome_scenery'));
				
				setTimeout(function() {
					removeClass(d.documentElement, 'ponyhoof_welcome_showmedemo');
					removeClass($('navAccount'), 'openToggler');
					removeClass($('ponyhoof_account_options'), 'active');
				}, 100);
				
				userSettings.theme = CURRENTPONY;
				
				userSettings.survivedTheNight = true;

				// Detect Social Fixer
				if ($('bfb_options_button')) {
					userSettings.show_messages_other = false;
				}
				
				saveSettings();
				
				if (CURRENTPONY == 'pinkie') {
					k.pinkieWelcome();
				} else {
					k.createFinalDialog();
				}

				return false;
			}, false);
		};
		
		k.pinkieWelcome = function() {
			var width = 720;
			var height = 405;
			
			var bottom = '';
			bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button" id="ponyhoof_welcome_pinkie_next"><span class="uiButtonText">Stop being silly, Pinkie</span></a>';
			
			k.dialogPinkie = new Dialog('welcome_pinkie');
			k.dialogPinkie.alwaysModal = true;
			k.dialogPinkie.create();
			k.dialogPinkie.changeTitle("\x59\x4F\x55\x20\x43\x48\x4F\x4F\x53\x45\x20\x50\x49\x4E\x4B\x49\x45\x21\x3F\x21");
			k.dialogPinkie.changeContent('<iframe src="//hoof.little.my/files/aEPDsG6R4dY.htm" width="100%" height="405" scrolling="auto" frameborder="0" allowTransparency="true"></iframe>');
			k.dialogPinkie.changeBottom(bottom);
			
			$('ponyhoof_welcome_pinkie_next').addEventListener('click', function() {
				k.dialogPinkie.close(function() {
					k.dialogPinkie.changeContent('');
				});
				fadeOut($('ponyhoof_welcome_scenery'));
				
				k.createFinalDialog();
				return false;
			}, false);
		};
		
		k.createFinalDialog = function() {
			var c = '';
			//c += 'Many Facebook terms have been ponified just for fun. Likes are now brohoofs, pages are now landmarks, and timelines are now journals.<br><br>';
			c += capitaliseFirstLetter(CURRENTSTACK['like'])+' us to receive updates and support for Ponyhoof!';
			c += '<iframe src="//'+getFbDomain()+'/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fprofile.php?id='+PONYHOOF_PAGE+'&amp;width=292&amp;height=62&amp;colorscheme=light&amp;show_faces=false&amp;stream=false&amp;header=false#ponyhoof_runme" id="ponyhoof_welcome_like" scrolling="no" frameborder="0" allowTransparency="true"></iframe>';
			c += 'Got somepony else that you want to suggest? Want to leave some feedback? <a href="'+w.location.protocol+PONYHOOF_URL+'" target="_top" id="ponyhoof_welcome_posttowall">Let us know!</a>';
			
			var successText = '';
			var ponyData = convertCodeToData(CURRENTPONY);
			if (ponyData.successText) {
				successText = ponyData.successText;
			} else {
				successText = "The fun has been doubled!";
			}

			k.dialogFinish = new Dialog('welcome_final');
			if (k._stack != CURRENTSTACK) {
				k.dialogFinish.alwaysModal = true;
			}
			k.dialogFinish.create();
			k.dialogFinish.changeTitle(successText);
			k.dialogFinish.changeContent(c);
			
			if (k._stack != CURRENTSTACK) {
				var bottom = '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button" id="ponyhoof_welcomefinal_ok"><span class="uiButtonText">Finish</span></a>';
				k.dialogFinish.changeBottom(bottom);
				
				$('ponyhoof_welcomefinal_ok').addEventListener('click', function(e) {
					if (hasClass(this, 'uiButtonDisabled')) {
						e.stopPropagation();
						return false;
					}
					
					addClass(this, 'uiButtonDisabled');
					w.location.reload();
					return false;
				}, false);
				
			} else {
				k.dialogFinish.addCloseButton();
			}
			
			removeClass(d.documentElement, 'ponyhoof_welcome_html');
			removeClass(d.documentElement, 'ponyhoof_welcome_html_scenery_loaded');
			
			$('ponyhoof_welcome_posttowall').addEventListener('click', function() {
				k.dialogFinish.close();
			}, false);
		};
		
		k.createScenery = function() {
			if ($('ponyhoof_welcome_scenery')) {
				$('ponyhoof_welcome_scenery').style.display = 'block';
				return;
			}
			
			var n = d.createElement('div');
			n.id = 'ponyhoof_welcome_scenery';
			d.body.appendChild(n);
			
			return n;
		};
		
		k.injectStyle = function() {
			var css = '';
			css += 'html.ponyhoof_welcome_html {overflow:hidden;}';
			css += 'html #ponyhoof_dialog_welcome_insecure .generic_dialog_fixed_overflow, html #ponyhoof_dialog_welcome .generic_dialog_fixed_overflow {background:transparent !important;}';
			css += '#ponyhoof_welcome_scenery {width:100%;height:100%;position:fixed;top:0;left:0;background-color:#fff;background-color:rgba(252,252,252,.9);background-repeat:no-repeat;background-position:center center;z-index:400;}';
			
			css += '#ponyhoof_dialog_welcome .generic_dialog {z-index:500 !important;}';
			css += '#ponyhoof_dialog_welcome .generic_dialog_popup, #ponyhoof_dialog_welcome .popup {width:475px !important;}';
			
			css += '#ponyhoof_welcome_newVersion {display:none;margin:0 0 10px;}';
			css += '#ponyhoof_welcome_pony {margin:8px 0;}';
			css += '#ponyhoof_welcome_afterClose {visibility:hidden;opacity:0;}';
			css += '#ponyhoof_welcome_afterClose.show {visibility:visible;opacity:1;-webkit-transition:all .3s linear;-moz-transition:all .3s linear;-o-transition:all .3s linear;transition:all .3s linear;}';
			
			css += 'html.ponyhoof_welcome_html_scenery_loaded #blueBar.fixed_elem {opacity:0;-webkit-transition:opacity .3s linear;-moz-transition:opacity .3s linear;-o-transition:opacity .3s linear;transition:opacity .3s linear;}';
			css += 'html.ponyhoof_welcome_showmedemo {cursor:not-allowed;}';
			css += 'html.ponyhoof_welcome_showmedemo .popup {cursor:default;}';
			css += 'html.ponyhoof_welcome_showmedemo #blueBar #pageHead {width:981px !important;}';
			css += 'html.sidebarMode.ponyhoof_welcome_showmedemo #pageHead, html.sidebarMode.ponyhoof_welcome_showmedemo .sidebarMode #globalContainer {left:0 !important;}';
			css += 'html.ponyhoof_welcome_showmedemo #blueBar.fixed_elem {position:fixed !important;z-index:401;opacity:1;}';
			
			css += '#ponyhoof_dialog_welcome_pinkie .generic_dialog_popup, #ponyhoof_dialog_welcome_pinkie .popup {width:740px;}';
			
			css += '#ponyhoof_welcome_like {border:none;overflow:hidden;width:292px;height:62px;margin:8px 0;display:block;}';
			
			injectManualStyle(css, 'welcome');
		};
	};
	
	// Theme
	function getFaviconTag() {
		var l = d.getElementsByTagName('link');
		for (var i = 0; i < l.length; i++) {
			if (l[i].getAttribute('rel') == 'shortcut icon') {
				return l[i];
			}
		}
		
		return false;
	}
	
	function changeFavicon(character) {
		var favicon = getFaviconTag();
		
		if (!favicon) {
			favicon = document.createElement('link');
			favicon.rel = 'shortcut icon';
			d.head.appendChild(favicon);
		}
		
		if (character != 'NONE') {
			favicon.type = 'image/png';
			favicon.href = THEMEURL+character+'/icon16.png';
		} else {
			favicon.type = 'image/x-icon';
			favicon.href = 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAX0lEQVQ4jWP4//8/AyUYTFhHzjgDxP9JxGeQDSBVMxgTbUBCxer/r999+Q8DJBuArJksA9A10s8AXIBoA0B+R/Y/jD+EwoBoA1yT5v3PbdmCE8MAshhID/UMoDgzUYIBj0Cgi7ar4coAAAAASUVORK5CYII=';
		}
	}
	
	function changeStack(character) {
		var pony = convertCodeToData(character);
		CURRENTSTACK = STACKS_LANG[0];
		if (pony.stack) {
			for (var i = 0; i < STACKS_LANG.length; i++) {
				if (STACKS_LANG[i].stack == pony.stack) {
					CURRENTSTACK = STACKS_LANG[i];
					break;
				}
			}
		}
	}
	
	function changeTheme(character) {
		addClass(d.documentElement, 'ponyhoof_injected');
		
		REALPONY = character;
		d.documentElement.setAttribute('data-ponyhoof-character', character);

		changeFavicon(character);
		changeStack(character);
		buildStackLang();
		
		// Did we injected our theme already?
		if ($('ponyhoof_userscript_style')) {
			$('ponyhoof_userscript_style').href = THEMECSS+character+THEMECSS_EXT;
			return;
		}
		
		var n = d.createElement('link');
		n.href = THEMECSS+character+THEMECSS_EXT;
		n.type = 'text/css';
		n.rel = 'stylesheet';
		n.id = 'ponyhoof_userscript_style';
		d.head.appendChild(n);
	}
	
	function getRandomPony() {
		while (1) {
			var r = randNum(0, PONIES.length-1);
			if (!PONIES[r].hidden) {
				return PONIES[r].code;
			}
		}
	}
	
	function getRandomMane6() {
		while (1) {
			var r = randNum(0, PONIES.length-1);
			if (PONIES[r].mane6) {
				return PONIES[r].code;
			}
		}
	}
	
	function convertCodeToData(code) {
		for (var i = 0; i < PONIES.length; i++) {
			if (PONIES[i].code == code) {
				return PONIES[i];
			}
		}
		
		return false;
	}
	
	function changeThemeSmart(theme) {
		switch (theme) {
			case 'NONE':
				removeClass(d.documentElement, 'ponyhoof_injected');
				changeFavicon('NONE');
				
				if ($('ponyhoof_userscript_style')) {
					$('ponyhoof_userscript_style').parentNode.removeChild($('ponyhoof_userscript_style'));
				}
				break;

			case 'RANDOM':
				// mane6, most, all
				switch (userSettings.randomSetting) {
					case 'mane6':
					case 'most':
					case 'all':
						break;

					default:
						userSettings.randomSetting = 'most';
						break;
				}

				var done = false;
				while (1) {
					var random = getRandomPony();
					var data = convertCodeToData(random);
					switch (userSettings.randomSetting) {
						case 'mane6':
							if (data.mane6) {
								changeTheme(random);
								done = true;
							}
							break;
							
						case 'all':
							changeTheme(random);
							done = true;
							break;

						case 'most':
						default:
							if (!data.norandom) {
								changeTheme(random);
								done = true;
							}
							break;
					}

					if (done) {
						break;
					}
				}
				break;

			default:
				changeTheme(theme);
				break;
		}
	}

	function getBronyName() {
		try {
			BRONYNAME = d.getElementsByClassName('headerTinymanName')[0].innerHTML;
		} catch (e) {}

		return BRONYNAME;
	}

	function getDefaultUiLang() {
		var classes = d.body.className.split(' ');
		for (var i = 0; i < classes.length; i++) {
			if (classes[i].indexOf('Locale_') == 0) {
				return classes[i].substring('Locale_'.length);
			}
		}

		return false;
	}
	
	// Screen saver
	var screenSaverTimer = null;
	var screenSaverActive = false;
	var screenSaverInactivity = function() {
		if (!screenSaverActive) {
			addClass(d.body, 'ponyhoof_screensaver');
		}
		screenSaverActive = true;
	};
	var screenSaverActivity = function() {
		if (screenSaverActive) {
			removeClass(d.body, 'ponyhoof_screensaver');
		}
		screenSaverActive = false;
		
		clearInterval(screenSaverTimer);
		screenSaverTimer = setTimeout(screenSaverInactivity, 30000);
	};
	var screenSaverActivate = function() {
		var mousemoveX = 0;
		var mousemoveY = 0;
		
		d.addEventListener('click', screenSaverActivity, true);
		d.addEventListener('mousemove', function(e) {
			if (mousemoveX == e.clientX && mousemoveY == e.clientY) {
				return;
			}
			mousemoveX = e.clientX;
			mousemoveY = e.clientY;
			
			screenSaverActivity();
		}, true);
		d.addEventListener('keydown', screenSaverActivity, true);
		d.addEventListener('contextmenu', screenSaverActivity, true);
		d.addEventListener('mousewheel', screenSaverActivity, true);
		
		screenSaverActivity();
	};
	
	// DOMNodeInserted
	var domReplaceText = function(ele, cn, deeper, regex, text) {
		var t = '';
		if ((cn == '' && deeper == '') || (cn && hasClass(ele, cn)) || (cn && ele.id == cn)) {
			t = ele.innerHTML;
			t = t.replace(regex, text);
			ele.innerHTML = t;
			
			return;
		}
		
		if (deeper) {
			var query = ele.querySelectorAll(deeper);
			if (query) {
				for (var i = 0; i < query.length; i++) {
					t = query[i].innerHTML;
					t = t.replace(regex, text);
					query[i].innerHTML = t;
				}
			}
		}
	};
	
	var domChangeTextbox = function(ele, cn, text) {
		var query = ele.querySelectorAll(cn);
		if (query) {
			for (var i = 0; i < query.length; i++) {
				var t = '';
				if (typeof text == 'function') {
					t = text(query[i]);
				} else {
					t = text;
				}
				
				query[i].title = t;
				query[i].setAttribute('placeholder', t);
				
				if (query[i].value != '' && hasClass(query[i], 'DOMControl_placeholder')) {
					query[i].value = t;
				}
			}
		}
	};
	
	var domReplaceFunc = function(ele, cn, deeper, func) {
		if (!ele || (cn == '' && deeper == '')) {
			return;
		}
		
		if ((cn && hasClass(ele, cn)) || (cn && ele.id == cn)) {
			func(ele);
			return;
		}
		
		if (deeper) {
			var query = ele.querySelectorAll(deeper);
			if (query) {
				for (var i = 0; i < query.length; i++) {
					func(query[i]);
				}
			}
		}
	};
	
	var replaceText = function(arr, t) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i][0] instanceof RegExp) {
				t = t.replace(arr[i][0], arr[i][1]);
			} else {
				if (arr[i][0].toLowerCase() == t.toLowerCase()) {
					t = arr[i][1];
					break;
				}
			}
		}
		
		return t;
	};

	var loopChildText = function(ele, func) {
		for (var i = 0; i < ele.childNodes.length; i++) {
			func(ele.childNodes[i]);
		}
	};
	
	var buttonTitles = [];
	var dialogTitles = [];
	var tooltipTitles = [];
	var headerTitles = [];
	function buildStackLang() {
		var ponyData = convertCodeToData(CURRENTPONY);

		buttonTitles = [
			 ["Done", "Eeyup"]
			,["Okay", "Eeyup"]
			//,["Close", "Eeyup"]
			,["Done Editing", "Eeyup"]
			,["Save Changes", "Eeyup"]
			
			,[/everyone/i, "Everypony"] // for Everyone (Most Recent)
			,["Public", "Everypony"]
			,["Friends of Friends", capitaliseFirstLetter(CURRENTSTACK['friends'])+" of "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Friends", capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Only Me", "Alone"]
			,["No One", "Alone"]
			
			,["Add Friend", "Add "+capitaliseFirstLetter(CURRENTSTACK['friend'])]
			,["Friend Request Sent", "Friendship Request Sent"]
			,["Respond to Friend Request", "Respond to Friendship Request"]
			,["Like", capitaliseFirstLetter(CURRENTSTACK['like'])]
			,["Liked", capitaliseFirstLetter(CURRENTSTACK['liked'])]
			,["Unlike", capitaliseFirstLetter(CURRENTSTACK['unlike'])]
			,["Suggest Friends", "Suggest "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			
			,["Likes", capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Friends' Posts", capitaliseFirstLetter(CURRENTSTACK['friends'])+"' Posts"]
			
			,["Photos", "Pony Pics"]
			,["People", capitaliseFirstLetter(CURRENTSTACK['people'])]
			//,["Pages", "Landmarks"]
			,["Banned", "Banished to Moon"]
			,["People who like this", CURRENTSTACK.people+" who "+CURRENTSTACK.like_past+" this"]
			,["Pages who like this", "Pages who "+CURRENTSTACK.like_past+" this"]
			
			,["Delete and Ban User", "Nuke and Banish to Moon"]
			,["Remove from Friends", "Banish to Moon"]
			,["Delete", "Nuke"]
			,["Delete Photo", "Nuke Pony Pic"]
			//,["Delete Page", "Nuke Landmark"]
			,["Delete All", "Nuke All"]
			,["Delete Selected", "Nuke Selected"]
			,["Delete Conversation", "Nuke Conversation"]
			,["Delete Message", "Nuke Friendship Letter"]
			,["Delete Messages", "Nuke Friendship Letters"]
			,["Delete Post", "Nuke Post"]
			,["Remove", "Nuke"]
			
			,["Messages", "Trough"]
			,["New Message", "Write a Friendship Letter"]
			,["Other Messages", "Other Friendship Letters"]
			
			//,["Share Page", "Share Landmark"]
			,["Share Photo", "Share Pony Pic"]
			,["Share Application", "Share Magic"]
			,["Share Note", "Share Scroll"]
			,["Share Question", "Share Query"]
			
			,["Add Friends", "Add "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Go to App", "Use Magic"]
			,["Back to Timeline", "Back to Journal"]
			//,["View Page", "View Landmark"]
			,["Add App", "Add Magic"]
			//,["Add Page Tab", "Add Landmark Tab"]
			//,["Choose Facebook Pages", "Choose Facebook Landmarks"]
			//,["Create Page", "Start a Landmark"]
			//,["Promote Your Page", "Promote Your Landmark"]
			//,["Advertise Page", "Advertise Landmark"]
			,["Get More Likes", "Get More "+capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Advertise Your App", "Advertise Your Magic"]
			//,["Create a Page", "Start a Landmark"]
			,["Leave App", "Leave Magic"]

			,["Events", "Adventures"]
			//,["Page Events", "Landmark Adventures"]
			,["Suggested Events", "Suggested Adventures"]
			,["Past Events", "Past Adventures"]
			,["Declined Events", "Declined Adventures"]
			,["Create Event", "Plan an Adventure"]
			,["Save Event", "Save Adventure"]
			,["Back to Event", "Back to Adventure"]

			,["Friend Activity", "Pal Activity"]
			//,["Posts by Page", "Posts by Landmark"]
			,["Activity Log", "Adventure Log"]
			//,["Edit Page", "Edit Landmark"]

			,["Invite More Friends", "Invite More Pals"]
			,["Find Friends", "Find Friendship"]
			//,["Pages I Like", "Landmarks I "+capitaliseFirstLetter(CURRENTSTACK['like_past'])]
			,["Pages I Like", "Pages I "+capitaliseFirstLetter(CURRENTSTACK['like_past'])]
			//,["Pages I Admin", "Landmarks I Admin"]
			,["Find My Friends", "Find Friendship"]
			
			,["Leave Group", "Leave Herd"]
			,["Set Up Group Email", "Set Up Herd Email"]
			,["Change Group Photo", "Change Herd Pony Pic"]
			,["Notifications", "Sparks"]
			,["Start Chat", "Start Whinny Chat"]
			,["Create Group", "Create Herd"]
			
			,["Move photo", "Move pony pic"]
			,["Delete Photos", "Nuke Pony Pics"]
			,["Keep Photos", "Keep Pony Pics"]
			,["Save Photo", "Save Pony Pic"]
			,["Tag Photos", "Tag Pony Pics"]
			,["Add Photos", "Add Pony Pics"]
			,["Upload Photos", "Upload Pony Pics"]
			,["Tag Photo", "Tag Pony Pic"]
			
			,["On your own timeline", "On your own journal"]
			,["On a friend's timeline", "On a "+CURRENTSTACK['friend']+"'s journal"]
			,["In a group", "In a herd"]
			//,["On your Page", "On your Landmark"]
			,["In a private Message", "In a private Friendship Letter"]

			,["Create List", "Create Directory"]
			,["See All Friends", "See All "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Manage List", "Manage Directory"]
			,["Timeline", "Journal"]
			,["Notes", "Scrolls"]
			,["Write a Note", "Write a Scroll"]
		];
		
		dialogTitles = [
			 [/People who like /gi, capitaliseFirstLetter(CURRENTSTACK['people'])+" who "+CURRENTSTACK['like_past']+" "]
			,[/Friends who like /gi, capitaliseFirstLetter(CURRENTSTACK['friends_logic'])+" who "+CURRENTSTACK['like_past']+" "]
			,["People who voted for this option", capitaliseFirstLetter(CURRENTSTACK['people'])+" who voted for this option"]
			
			,["Share this Profile", "Share this Journal"]
			,["Share this Photo", "Share this Pony Pic"]
			//,["Share this Album", ""]
			,["Share this Note", "Share this Scroll"]
			,["Share this Group", "Share this Herd"]
			,["Share this Event", "Share this Adventure"]
			//,["Share this Ad", ""]
			,["Share this Application", "Share this Magic"]
			//,["Share this Video", ""]
				//,["Share this Page", "Share this Landmark"]
				,["Share this Page", "You gotta share!"]
			//,["Share this Job", ""]
				,["Share this Status", "You gotta share!"]
			,["Share this Question", "Share this Query"]
				,["Share this Link", "You gotta share!"]
				,["Share", "You gotta share!"]
			//,["Share this Help Content", ""]
			
			,["Timeline and Tagging", "Journal and Tagging"]
			,["Timeline Review", "Journal Review"]
			//,["Friends Can Check You Into Places", capitaliseFirstLetter(CURRENTSTACK['friends_logic'])+" Can Check You Into Landmarks"]
			,["Limit The Audience for Old Posts on Your Timeline", "Limit The Audience for Old Posts on Your Journal"]
			,["How people bring your info to apps they use", "How "+CURRENTSTACK['people']+" bring your info to magic they use"]
			,["Turn off Apps, Plugins and Websites", "Turn off Magic, Plugins and Websites"]
			
			,["Likes", capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Edit Featured Likes", "Edit Featured "+capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Change Date", "Time Travel"]
			,["Date Saved", "Time Traveled"]
			
			,["Delete", "Nuke"]
			,["Delete Comment", "Nuke Comment"]
			,["Delete Photo", "Nuke Pony Pic"]
			,["Remove Picture?", "Nuke Pony Pic?"]
			,["Delete Video?", "Nuke Video?"]
			,["Delete Milestone", "Nuke Milestone"]
			//,["Delete Page?", "Nuke Landmark?"]
			,["Delete this Friendship Letter?", "Nuke this Friendship Letter?"]
			,["Delete This Entire Conversation?", "Nuke This Entire Conversation?"]
			,["Delete These Messages?", "Nuke These Friendship Letters?"]
			,["Delete Post", "Nuke Post"]
			,["Delete Post?", "Nuke Post?"]
			//,["Delete Page Permanently?", "Nuke Landmark Permanently?"]
			,["Unlike", capitaliseFirstLetter(CURRENTSTACK['unlike'])]
			
			,["Report and/or Block This Person", "Report and/or Block This Pony"]
			,["Report This Photo", "Report This Pony Pic"]
			,["Report This Event", "Report This Adventure"]
			
			,["New Message", "Write a Friendship Letter"]
			,["Forward Message", "Forward this Friendship Letter"]
			,["Delete This Message?", "Nuke this Friendship Letter?"]
			,["Message Not Sent", "Friendship Letter Not Sent"]
			
			,["Create New Group", "Create New Herd"]
			,[/Create New Event/, "Plan an Adventure"]
			,["Notification Settings", "Spark Settings"]
			,["Create Group Email Address", "Create Herd Email Address"]
			,["Mute Chat?", "Mute Whinny Chat?"]
			,["Add Friends to Group", "Add "+capitaliseFirstLetter(CURRENTSTACK['friends_logic'])+" to the Herd"]

			,["Cancel Event?", "Cancel Adventure?"]
			,["Change Event Photo", "Change Pony Pic for Adventure"]
			,["Add Event Photo", "Add Adventure Pony Pic"]

			,["Hide all recent profile changes?", "Hide all recent journal changes?"]
			,["Edit your profile story settings", "Edit your journal story settings"]
			,["Edit your timeline recent activity settings", "Edit your journal recent activity settings"]

			,["Edit News Feed Settings", "Edit Feed Bag Settings"]
			,["Create New List", "Create New Directory"]
			,["Invite Friends", "Invite "+capitaliseFirstLetter(CURRENTSTACK['friends_logic'])]
			,["Advanced Chat Settings", "Advanced Whinny Chat Settings"]
			,["Notifications Updated", "Sparks Updated"]
			,["Move photo to another album?", "Move pony pic to another album?"]
			,["Group Muted", "Herd Muted"]
			,["Block App?", "Block Magic?"]
			//,["Add Page Tab", "Add Landmark Tab"]
			,["List Notification Settings", "Directory Spark Settings"]
			,["Like This Photo?", "Like This Pony Pic?"]
			,["Friends", capitaliseFirstLetter(CURRENTSTACK['friends'])]
			//,["Other Pages You Like", "Other Landmarks You "+capitaliseFirstLetter(CURRENTSTACK['like_past'])]
			,[/People Connected to /, capitaliseFirstLetter(CURRENTSTACK['people'])+" Connected to "]
		];
		if (CURRENTSTACK.stack == 'pony') {
			dialogTitles.push(["Are you sure you want to leave this page?", "Oh, hello!"]);
		}
		if (ponyData.successText) {
			dialogTitles.push(["Success", ponyData.successText]);
			dialogTitles.push(["Success!", ponyData.successText]);
		}
		
		tooltipTitles = [
			 [/everyone/gi, "Everypony"]
			,[/\bpublic\b/gi, "Everypony"]
			,[/friends of friends/gi, capitaliseFirstLetter(CURRENTSTACK['friends'])+" of "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,[/\bfriends\b/gi, capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Only Me", "Alone"]
			,["No One", "Alone"]
			,["Only you", "Alone"]
				,[/cover photos are everypony/i, "Everypony can see your cover photos"]
				,[/any other information you made Everypony/i, "any other information that everypony can see"]
				,["Anyone can see this Everypony comment", "Everypony can see this public comment"]
			
			,["Show comments", "Show friendship letters"]
			,[/Comments/, "Friendship Letters"]
			,[/Comment/, "Friendship Letter"]
			
			,["Remove", "Nuke"]
			,["Edit or Delete", "Edit or Nuke"]
			,["Edit or Remove", "Edit or Nuke"]
			,["Delete Post", "Nuke Post"]
			,["Remove or Report", "Nuke or Report"]

			,["Shown on Timeline", "Shown on Journal"]
			,["Allow on Timeline", "Allow on Journal"]
			,["Highlighted on Timeline", "Highlighted on Journal"]
			,["Allowed on Timeline", "Allowed on Journal"]
			,["Hidden from Timeline", "Hidden from Journal"]
			
			//,[/likes? this/g, "brohoof'd this"]
			
			//,[/\bpeople\b/gi, "ponies"]
			,[/See who likes this/gi, "See who "+CURRENTSTACK['likes']+" this"]
			,[/like this\./gi, CURRENTSTACK['like_past']+" this."]
			,[/likes this\./gi, CURRENTSTACK['likes_past']+" this."]
		];
		if (ponyData.loadingText) {
			tooltipTitles.push(["Loading...", ponyData.loadingText]);
		}

		headerTitles = [
			 ["List Suggestions", "Directory Suggestions"]
			,["People You May Know", "Ponies You May Know"]
			,["Sponsored", "Cupcake Money"]
			,["Pokes", "Nuzzles"]
			,["People To Subscribe To", "Ponies To Subscribe To"]
			//,["Recommended Pages", "Recommended Landmarks"]
			,["Poke Suggestions", "Nuzzle Suggestions"]
			,["Suggested Groups", "Suggested Herds"]
			//,["Find More Friends", "Find More "+capitaliseFirstLetter(CURRENTSTACK['friends'])]
			,["Find More Friends", "Find Friendship"]
			,["Rate Recently Used Apps", "Rate Recently Used Magic"]
			,["Friends' Photos", "Pals' Pony Pics"]
			,["Add a Location to Your Photos", "Add a Location to Your Pony Pics"]

			,["Notifications", "Sparks"]
			,["New Likes", "New "+capitaliseFirstLetter(CURRENTSTACK['likes'])]
			//,["Page Tips", "Landmark Tips"]
			,["Invite Friends", "Invite "+capitaliseFirstLetter(CURRENTSTACK['friends'])]

			,["Messages", "Trough"]
			,["Other Messages", "Other Friendship Letters"]
			,["Unread Messages", "Unread Friendship Letters"]
			,["Sent Messages", "Sent Friendship Letters"]
			,["Archived Messages", "Archived Friendship Letters"]

			,["Groups", "Herds"]
			//,["Pages and Ads", "Landmarks and Ads"]
			,["Apps", "Magic"]
			,[/Friends who like /gi, capitaliseFirstLetter(CURRENTSTACK['friends_logic'])+" who "+CURRENTSTACK['like_past']+" "]
			,["Favorites", capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Likes", capitaliseFirstLetter(CURRENTSTACK['likes'])]
			,["Events", "Adventures"]
			,["Friends", capitaliseFirstLetter(CURRENTSTACK['friends'])]

			,["Notes", "Scrolls"]
			,["My Notes", "My Scrolls"]
			,["Notes About Me", "Scrolls About Me"]
			,["Write a Note", "Write a Scroll"]

			,["Timeline and Tagging", "Journal and Tagging"]
			,["Ads, Apps and Websites", "Ads, Magic and Websites"]
			,["Blocked People and Apps", "Banished "+capitaliseFirstLetter(CURRENTSTACK['people'])+" and Magic"]
			,["Notifications Settings", "Sparks Settings"]
			,["App Settings", "Magic Settings"]
			,["Friend Requests", "Friendship Requests"]
		];
	}
	
	var snowliftPinkie = false;
	var CSB_sound = false;
	
	var DOMNodeInserted = function(dom) {
		domNodeHandlerMain.run(dom);
	};

	var domNodeHandler = function() {
		var k = this;
		k.snowliftPinkieInjected = false;

		k.run = function(dom) {
			if (INTERNALUPDATE) {
				return;
			}

			if (k.shouldIgnore(dom)) {
				return;
			}
			
			k.dumpConsole(dom);
			
			// Start internal update
			var iu = INTERNALUPDATE;
			INTERNALUPDATE = true;
			
			injectOptionsLink();
			
			k.snowliftPinkie(dom);
			
			// Text nodes
			if (dom.target.nodeType == 3) {
				try {
					var buttonText = dom.target.parentNode;
					var button = buttonText.parentNode;
					if (hasClass(buttonText, 'uiButtonText')) {
						var orig = dom.target.textContent;
						var replaced = replaceText(buttonTitles, orig);
						if (hasClass(button, 'uiButton')) {
							//if (button.getAttribute('data-ponyhoof-button-orig') != '') {
								//if (button.getAttribute('data-ponyhoof-button-orig') != replaced) {
									if (button.title == '' && orig != replaced) {
										button.title = orig;
									}
									button.setAttribute('data-ponyhoof-button-orig', orig);
									button.setAttribute('data-ponyhoof-button-text', replaced);
								//}
							//}
						}
						buttonText.textContent = replaced;

						INTERNALUPDATE = iu;
						return;
					}
				} catch (e) {}
				
				try {
					if (hasClass(dom.target.parentNode.parentNode, 'dialog_title')) {
						var title = dom.target.parentNode.parentNode;
						if (title) {
							var orig = dom.target.textContent;
							var replaced = replaceText(dialogTitles, orig);

							dom.target.textContent = replaced;
							addClass(title, 'ponyhoof_fbdialog_title');
							if (orig != replaced) {
								title.title = orig;
							}

							k.getParent(title, function(ele) {
								return hasClass(ele, 'generic_dialog');
							}, function(ele) {
								if (hasClass(ele, 'fbQuestionsPopup')) {
									return;
								}

								addClass(ele, 'ponyhoof_fbdialog');
								ele.setAttribute('data-ponyhoof-dialog-title', replaced);
								ele.setAttribute('data-ponyhoof-dialog-orig', orig);

								var body = ele.getElementsByClassName('dialog_body')[0];
								if (body) {
									addClass(body, 'ponyhoof_fbdialog_body');
								}
							});
							
						}

						INTERNALUPDATE = iu;
						return;
					}
				} catch (e) {}
				
				INTERNALUPDATE = iu;
				return;
			}
			
			domReplaceFunc(dom.target, '', '.inCommonSectionList', k.textBrohoof);
			domReplaceFunc(dom.target.parentNode, 'placePageStats', '.placePageStats', k.textBrohoof);
			domReplaceFunc(dom.target, '', '#fbTimelineHeadline .name h2 > div', k.textBrohoof);
			
			/*var poke = function(ele) {
				var t = ele.innerHTML;
				t = t.replace(/\bpoke\b/g, "nuzzle");
				t = t.replace(/\bpokes\b/g, "nuzzles");
				t = t.replace(/\bPoke\b/g, "Nuzzle");
				t = t.replace(/\bPokes\b/g, "Nuzzles");
				t = t.replace(/\b poked \b/g, " nuzzled ");
				ele.innerHTML = t;
			};
			domReplaceFunc(dom.target.parentNode, 'pagelet_pokes', '#pagelet_pokes', poke);
			domReplaceFunc(dom.target.parentNode, 'pagelet_pysp', '#pagelet_pysp', poke);*/

			domReplaceFunc(dom.target, '', '.uiButtonText, .uiButton input', function(ele) {
				if (ele.tagName.toUpperCase() == 'INPUT') {
					var t = ele.value;
				} else {
					var t = ele.textContent;
				}
				var button = ele.parentNode;
				if (hasClass(button, 'uiButton') && button.getAttribute('data-ponyhoof-button-orig') == null) {
					button.setAttribute('data-ponyhoof-button-orig', t);
					var replaced = replaceText(buttonTitles, t);
					if (button.title == '' && t != replaced) {
						button.title = t;
					}
					k.changeButtonText(ele, replaced);
					button.setAttribute('data-ponyhoof-button-text', replaced);
				}
			});
			
			domReplaceFunc(dom.target, 'uiUfiLike', '.uiUfiLike, .UFILikeSentence', function(ele) {
				var t = ele.innerHTML;
				//t = t.replace(/likes? this\./g, "brohoof'd this.");
				t = t.replace(/like this\./g, CURRENTSTACK['like_past']+" this.");
				t = t.replace(/likes this\./g, CURRENTSTACK['likes_past']+" this.");
				t = t.replace(/\bpeople\b/g, CURRENTSTACK['people']); // search public posts is broken
				//t = t.replace(/(^|\\W|_)people(^|\\W|_)/g, "ponies");
				/*if (CURRENTSTACK == 'pony') {
					t = t.replace(/\<3 7h\!5/g, '/) 7h!5');
					t = t.replace(/\<3 7h15/g, '/) 7h!5');
				}*/
				
				ele.innerHTML = t;
				
				var inner = ele.querySelector('.UIImageBlock_Content, .-cx-PRIVATE-uiImageBlockDeprecated__content');
				if (inner) {
					var form = ele;
					while (form) {
						//if (form.tagName.toUpperCase() == 'FORM') {
						if (hasClass(form, 'uiUfi')) {
							break;
						}
						form = form.parentNode;
					}
					if (form) {
						var l = inner.textContent.toLowerCase();
						if (l.indexOf('you ') == 0 || l.indexOf('you, ') == 0) {
							addClass(form, 'ponyhoof_brohoofed');
						} else {
							removeClass(form, 'ponyhoof_brohoofed');
						}
					}
				}
			});
			if (dom.target.id == 'uiUfiLike') {
				INTERNALUPDATE = iu;
				return;
			}

			if (k.ticker(dom)) {
				INTERNALUPDATE = iu;
				return;
			}
			
			domReplaceFunc(dom.target, '', '.uiUfiViewAll, .uiUfiViewPrevious, .uiUfiViewMore', function(ele) {
				var button = ele.querySelector('input[type="submit"]');
				var t = button.value;
				t = t.replace(/comments/g, "friendship letters");
				t = t.replace(/comment/g, "friendship letter");
				button.value = t;
			});
			
			domReplaceFunc(dom.target, 'notification', '.notification', function(ele) {
				var info = ele.getElementsByClassName('info')[0];
				var gt = JSON.parse(ele.getAttribute('data-gt'));

				for (var i = 0; i < info.childNodes.length; i++) {
					var node = info.childNodes[i];
					if (hasClass(node, 'metadata')) {
						continue;
					}

					if (node.nodeType == 3) {
						// XYZ commented on your Wall post: "I like it"

						// Allow for likes:
						// {"alert_id":"XXXXXXXX","app_id":"2409997254","unread":"0","context_id":"XXXXXXXXXXXXXXX","notif_subtype":"comment-group_message","notif_type":"like"}
						if (!gt || gt.notif_type != 'like') {
							if (node.textContent.indexOf('"') != -1) {
								break;
							}
						}
					}
					
					var t = node.textContent;
					t = k.textNotification(t);
					node.textContent = t;
				}
			});
			
			domReplaceFunc(dom.target, 'UIBeep', '', function(ele) {
				var info = ele.getElementsByClassName('UIBeep_Title')[0];
				var gt = JSON.parse(ele.getAttribute('data-gt'));
				ele.setAttribute('data-ponyhoof-beeper-orig', info.textContent);
				
				for (var i = 0; i < info.childNodes.length; i++) {
					var node = info.childNodes[i];
					if (node.nodeType == 3) {
						// XYZ commented on your Wall post: "I like it"
						if (!gt || gt.notif_type != 'like') {
							if (node.textContent.indexOf('"') != -1) {
								break;
							}
						}
					}
					var t = node.textContent;
					t = k.textNotification(t);
					node.textContent = t;
				}
				
				if (userSettings.sounds) {
					try {
						var gt = JSON.parse(ele.getAttribute('data-gt'));
						if (gt.app_id == '183217215062060') {
							if (CURRENTSTACK.stack == 'pony') {
								var ps = initPonySound('poke', THEMEURL+'_sound/pokeSound.EXT');
								ps.wait = 15;
								ps.play();
							}
						} else {
							var data = convertCodeToData(REALPONY);
							if (data.soundNotif) {
								var ps = initPonySound('notif', THEMEURL+data.soundNotif+'.EXT');
								ps.wait = 10;
								ps.play();
							}
						}
					} catch (e) {}
				}
				
				ele.setAttribute('data-ponyhoof-beeper-message', info.textContent);
			});
			
			domReplaceFunc(dom.target, '', '.tooltipContent', function(ele) {
				// <div class="tooltipContent"><div class="tooltipText"><span>xy</span></div></div>
				// <div class="tooltipContent">xy</div>

				// <div class="tooltipContent"><div>Edit or Delete</div></div>
				var io = ele.getElementsByClassName('tooltipText');
				if (io.length) {
					var target = io[0];
				} else {
					var target = ele;
				}
				io = target.getElementsByTagName('div');
				if (io.length) {
					target = io[0];
				}
				io = target.getElementsByTagName('span');
				if (io.length) {
					target = io[0];
				}
				
				var t = target.innerHTML;
				t = replaceText(tooltipTitles, t);
				target.innerHTML = t;
			});
			
			domReplaceFunc(dom.target, 'egoProfileTemplate', '.egoProfileTemplate', function(ele) {
				var div = ele.getElementsByTagName('div');
				if (div.length) {
					for (var i = 0; i < div.length; i++) {
						var t = div[i].innerHTML;
						t = k.textStandard(t);
						div[i].innerHTML = t;
					}
				}
				
				div = ele.querySelector('.uiIconText');
				if (div) {
					div.innerHTML = div.innerHTML.replace(/Like/g, capitaliseFirstLetter(CURRENTSTACK['like']));
				}
			});
			
			domReplaceFunc(dom.target, '', '.uiInterstitial', function(ele) {
				var title = ele.getElementsByClassName('uiHeaderTitle')[0].textContent;
				ele.setAttribute('data-ponyhoof-inters-title', title);

				if (CURRENTSTACK.stack == 'pony' && REALPONY != 'discord') { // FIXME
					if (title == "The page you requested was not found.") {
						addClass(ele, 'ponyhoof_404revamp');

						var content = ele.getElementsByClassName('uiInterstitialContent')[0];

						var n = d.createElement('div');
						n.id = 'ponyhoof_404revamp_desc';
						n.innerHTML = '<div>Feel free to enjoy the nothingness.</div><a href="#" id="ponyhoof_404revamp_clicktoplay"><span></span></a>';
						content.insertBefore(n, content.firstChild);

						$('ponyhoof_404revamp_clicktoplay').addEventListener('click', function() {
							this.style.display = 'none';

							var frame = d.createElement('iframe');
							frame.src = '//hoof.little.my/files/_htm/404revamp.htm';
							frame.width = '896';
							frame.height = '504';
							frame.setAttribute('scrolling', 'no');
							frame.setAttribute('frameborder', '0');
							frame.setAttribute('allowTransparency', 'true');
							content.appendChild(frame);
						}, false);
					}
				}
			});

			domReplaceFunc(dom.target, 'uiLayer', '', function(ele) {
				// .dialogTitle, .cx-uiDialog__title, .-cx-uiDialog__title,
				var title = ele.querySelector('.-cx-PRIVATE-uiDialog__title, .-cx-PUBLIC-uiDialog__title');
				if (title) {
					var orig = title.innerHTML;
					var replaced = replaceText(dialogTitles, orig);

					title.innerHTML = replaced;
					addClass(title, 'ponyhoof_fbdialog_title');
					if (orig != replaced) {
						title.title = orig;
					}

					addClass(ele, 'ponyhoof_fbdialog');
					ele.setAttribute('data-ponyhoof-dialog-title', replaced);
					ele.setAttribute('data-ponyhoof-dialog-orig', orig);

					var body = ele.querySelector('.-cx-PRIVATE-uiDialog__body');
					if (body) {
						addClass(body, 'ponyhoof_fbdialog_body');
					}
				}
			});

			domReplaceFunc(dom.target, '', 'a[href^="/ajax/sharer/"][rel="dialog"], a[ajaxify^="/ajax/sharer/"][rel="dialog"]', function(ele) {
				if (CURRENTSTACK.stack == 'pony') {
					ele.setAttribute('data-hover', 'tooltip');
					ele.setAttribute('title', 'Remember! You gotta share... You gotta care...');
				}
			});
			
			domReplaceFunc(dom.target, '', '.uiHeaderTitle', function(ele) {
				var imgwrap = ele.querySelector('.-cx-PRIVATE-uiImageBlock__content, .adsCategoryTitleLink');
				if (imgwrap) {
					ele = imgwrap;
				};

				loopChildText(ele, function(child) {
					if (!child.children || !child.children.length) {
						var t = replaceText(headerTitles, child.textContent);
						child.textContent = t;
					}
				});
			});

			if (userSettings.commentBrohoofed) {
				k.commentBrohoofed(dom);
			}

			domChangeTextbox(dom.target, '.commentArea textarea, .UFIAddComment textarea', function(textbox) {
				try {
					var form = textbox;
					while (form) {
						if (form.tagName.toUpperCase() == 'FORM' && form.getAttribute('action') == '/ajax/ufi/modify.php') {
							break;
						}
						form = form.parentNode;
					}
					if (form) {
						var feedback_params = JSON.parse(form.querySelector('input[name="feedback_params"]').value);
						if (feedback_params.target_profile_id == '223682217679925') {
							textbox.addEventListener('focus', function() {
								if (CSB_sound) {
									return;
								}
								
								CSB_sound = true;
								
								var ps = initPonySound('223682217679925', THEMEURL+'_sound/223682217679925.EXT');
								ps.play();
							}, false);
							return "Write a cool story...";
						} else if (feedback_params.assoc_obj_id == '140792002656140') {
							return "Tuliskan surat persahabatan...";
						}
					}
				} catch (e) {}
				
				return "Write a friendship letter...";
			});
			k.changeComposer(dom);

			domChangeTextbox(dom.target, '.MessagingComposerForm textarea', "Dear Princess Celestia...");
			domChangeTextbox(dom.target, '.groupAddMemberTypeaheadBox .inputtext', "Add Pals to the Herd");
			domChangeTextbox(dom.target, '.MessagingSearchFilter .inputtext', "Search Friendship Letters");
			domChangeTextbox(dom.target, '.fbChatTypeahead .inputtext', "Pals on Whinny Chat");
			
			//domChangeTextbox(dom.target, '.uiComposer textarea', "What lessons in friendship have you learned today?");
			//domChangeTextbox(dom.target, '.uiComposerMessageBox textarea', "Share your friendship stories...");
			//domChangeTextbox(dom.target, '.uiMetaComposerMessageBox textarea', "What lessons in friendship have you learned today?");
			domChangeTextbox(dom.target, '.groupsMemberFlyoutWelcomeTextarea', "Welcome him/her to the herd...");
			domChangeTextbox(dom.target, '#q', CURRENTLANG.fb_search_box);
			
			INTERNALUPDATE = iu;
			
					};

		k.snowliftPinkie = function(dom) {
			if (!k.snowliftPinkieInjected) {
				if (dom.target.id == 'fbPhotoSnowlift') {
					k.snowliftPinkieInjected = true;
					addClass(dom.target, 'ponyhoof_snowlift_haspinkiediv');
					
					var n = d.createElement('div');
					n.id = 'ponyhoof_snowlift_pinkie';
					dom.target.appendChild(n);
				}
			}
		};

		k._likeCount = function(ufiitem) {
			var likecount = ufiitem.getElementsByClassName('comment_like_button');
			if (likecount.length) {
				likecount = likecount[0];
				var t = likecount.innerHTML;
				//t = t.replace(/likes? this\./g, "brohoof'd this.");
				t = t.replace(/like this/g, CURRENTSTACK['like_past']+" this");
				t = t.replace(/likes this/g, CURRENTSTACK['likes_past']+" this");
				likecount.innerHTML = t;
			}
		};

		k.commentBrohoofed = function(dom) {
			domReplaceFunc(dom.target, '', '.cmnt_like_link', function(ele) {
				if (ele.name.match(/unlike_comment_/)) {
					k.getParent(ele, function(ufiitem) {
						return hasClass(ufiitem, 'uiUfiComment');
					}, function(ufiitem) {
						addClass(ufiitem, 'ponyhoof_comment_liked');
						k._likeCount(ufiitem);
					});
				} else {
					if (!ele.parentNode.className.match(/comment_like_/)) {
						return;
					}
					k.getParent(ele, function(ufiitem) {
						return hasClass(ufiitem, 'uiUfiComment');
					}, function(ufiitem) {
						removeClass(ufiitem, 'ponyhoof_comment_liked');
						k._likeCount(ufiitem);
					});
				}
			});
		};

		k.composerPonies = new RegExp(['pony', 'ponies', 'mlp', 'brony', 'bronies', 'pegasister', 'pega sister', 'pega-sister', 'twilight sparkle', 'rainbow dash', 'pinkie', 'applejack', 'fluttershy', 'rarity', 'celestia', 'derpy', 'equestria', 'canterlot', 'dashie', 'apple jack', 'flutter shy'].join('|'), 'i');
		k.changeComposer = function(dom) {
			domChangeTextbox(dom.target, '.uiComposer textarea', function(ele) {
				var defaultText = CURRENTLANG.fb_composer_lessons;
				var specialPages = {
					 '140792002656140': LANG['ms_MY'].fb_composer_lessons
					,'346855322017980': LANG['ms_MY'].fb_composer_lessons
				};

				try {
					var form = ele;
					var inputContainer;
					while (form) {
						if (hasClass(form, 'uiComposer')) {
							break;
						}
						if (hasClass(form, 'inputContainer')) {
							inputContainer = form;
						}
						form = form.parentNode;
					}

					if (!form) {
						return defaultText;
					}

					var pageid = form.querySelector('input[name="xhpc_targetid"]');
					if (!pageid) {
						return defaultText;
					}
					pageid = pageid.value;

					form.setAttribute('data-ponyhoof-xhpc_targetid', pageid);

					var button = form.querySelector('.uiComposerMessageBoxControls .submitBtn input, .uiComposerMessageBoxControls .submitBtn .uiButtonText');
					var ponified = false;
					if (button) {
						ele.addEventListener('input', function(e) {
							if (k.composerPonies.test(ele.value)) {
								if (ele.value.toUpperCase() == ele.value) {
									k.changeButtonText(button, CURRENTLANG.fb_composer_ponies_caps);
								} else {
									k.changeButtonText(button, CURRENTLANG.fb_composer_ponies);
								}
							} else {
								k.changeButtonText(button, button.parentNode.getAttribute('data-ponyhoof-button-text'));
							}
						});
					}

					if (isPonyhoofPage(pageid)) {
						return "Write a review or suggest something for Ponyhoof...";
					}
					if (specialPages[pageid]) {
						return specialPages[pageid];
					}
				} catch (e) {}
				
				/*if (isPonyhoofPage(pageid)) {
					textbox.addEventListener('focus', function() {
						if (!$('ponyhoof_page_readme')) {
							n = d.createElement('iframe');
							n.id = 'ponyhoof_page_readme';
							n.className = 'showOnceInteracted';
							n.scrolling = 'auto';
							n.frameborder = '0';
							n.allowtransparency = 'true';
							n.src = PONYHOOF_README;
							inputContainer.parentNode.insertBefore(n, inputContainer.nextSibling);
						}
					}, true);
				}*/

				return defaultText;
			});
		};

		k.ticker = function(dom) {
			domReplaceFunc(dom.target, 'fbFeedTickerStory', '.fbFeedTickerStory', function(ele) {
				var div = ele.getElementsByClassName('uiStreamMessage')[0];
				if (div) {
					loopChildText(div, function(child) {
						if (child.nodeType == 3) {
							var t = child.textContent;
							t = k.textStandard(t);
							child.textContent = t;
						}
					});
				}
			});
			if (dom.target.id == 'fbFeedTickerStory') {
				return true;
			}
			return false;
		};

		// Utilities
		k.getParent = function(ele, iffunc, func) {
			var outer = ele.parentNode;
			while (outer) {
				if (iffunc(outer)) {
					break;
				}
				outer = outer.parentNode;
			}
			
			func(outer);
		};

		k.changeButtonText = function(button, t) {
			if (button.tagName.toUpperCase() == 'INPUT') {
				button.value = t;
			} else {
				button.textContent = t;
			}
		};

		// Ignore irrelevant tags and some classes
		k.shouldIgnore = function(dom) {
			if (dom.target.nodeType != 3) {
				var tn = dom.target.tagName.toUpperCase();
				if (tn == 'SCRIPT' || tn == 'STYLE' || tn == 'LINK' || tn == 'INPUT' || tn == 'BR' || tn == 'META') {
					return true;
				}
			}

			if (/(DOMControl_shadow|highlighterContent)/.test(dom.target.className)) {
				return true;
			}

			return false;
		};

		k.dumpConsole = function(dom) {
			if (userSettings.debug_dominserted_console) {
				if (dom.target.nodeType == 3) {
					console.dir(dom.target);
				} else {
					console.log(dom.target.outerHTML);
				}
			}
		};

		k.textBrohoof = function(ele) {
			var t = ele.innerHTML;
			t = t.replace(/like this/g, CURRENTSTACK['like']+" this");
			t = t.replace(/likes this/g, CURRENTSTACK['likes']+" this");
			t = t.replace(/likes/g, CURRENTSTACK['likes']);
			t = t.replace(/talking about this/g, "blabbering about this");
			ele.innerHTML = t;
		};
		
		k.textStandard = function(t) {
			t = t.replace(/\bpeople\b/g, " "+CURRENTSTACK['people']);
			t = t.replace(/\bfriends\b/g, " "+CURRENTSTACK['friends_logic']);
			t = t.replace(/\blikes\b/g, " "+CURRENTSTACK['likes_past']);
			t = t.replace(/\blike\b/g, " "+CURRENTSTACK['like_past']);
			return t;
		};
		
		k.textNotification = function(t) {
			if (t.indexOf('"') == -1) {
				t = t.replace(/\bpeople\b/g, " "+CURRENTSTACK['people']);
				t = t.replace(/\bfriends\b/g, " "+CURRENTSTACK['friends_logic']);
				t = t.replace(/\blikes\b/g, " "+CURRENTSTACK['likes_past']);
				t = t.replace(/\blike\b/g, " "+CURRENTSTACK['like_past']);
			} else {
				t = t.replace(/\blikes your comment\b/g, " "+CURRENTSTACK['likes_past']+" your comment");
				t = t.replace(/\blike your comment\b/g, " "+CURRENTSTACK['like_past']+" your comment");
				t = t.replace(/\blikes your reply\b/g, " "+CURRENTSTACK['likes_past']+" your reply");
				t = t.replace(/\blike your reply\b/g, " "+CURRENTSTACK['like_past']+" your reply");
				t = t.replace(/\blikes your link\b/g, " "+CURRENTSTACK['likes_past']+" your link");
				t = t.replace(/\blike your link\b/g, " "+CURRENTSTACK['like_past']+" your link");
				t = t.replace(/\blikes your status\b/g, " "+CURRENTSTACK['likes_past']+" your status");
				t = t.replace(/\blike your status\b/g, " "+CURRENTSTACK['like_past']+" your status");
			}

			t = t.replace(/\bpoked you/g, " nuzzled you");
			return t;
		};
	};
	var domNodeHandlerMain = new domNodeHandler();
	
	var _optionsLinkInjected = false;
	var injectOptionsLink = function() {
		if (_optionsLinkInjected) {
			return;
		}
		
		if ($('logout_form')) {
			_optionsLinkInjected = true;
			
			var optionsLink = d.createElement('a');
			optionsLink.href = '#';
			optionsLink.id = 'ponyhoof_account_options';
			optionsLink.className = 'navSubmenu submenuNav'; // submenuNav is for developers.facebook.com
			optionsLink.innerHTML = CURRENTLANG.options_title+" <span class='ponyhoof_hide_if_injected inline'>(Disabled)</span>";
			optionsLink.addEventListener('click', function() {
				optionsOpen();
				
				try {
					clickLink($('navAccountLink'));
				} catch (e) {}
				try {
					clickLink($('accountNavArrow'));
				} catch (e) {}
				
				return false;
			}, false);
			
			var optionsLinkLi = d.createElement('li');
			optionsLinkLi.appendChild(optionsLink);
			
			var logout = $('logout_form');
			logout.parentNode.parentNode.insertBefore(optionsLinkLi, logout.parentNode);
			
			//var _devSiteNav = d.querySelector('.devsitePage .menu .nav');
			//if (_devSiteNav) {
			//	_devSiteNav.style.width = '160px';
			//}
		}
	};
	
	var ranDOMNodeInserted = false;
	var runDOMNodeInserted = function() {
		if (ranDOMNodeInserted) {
			return false;
		}
		
		ranDOMNodeInserted = true;
		
		onPageReady(function() {
			DOMNodeInserted({target: d.body});
		});
		d.addEventListener('DOMNodeInserted', DOMNodeInserted, true);
	};
	
	var ranExtraInjection = false;
	var extraInjection = function() {
		if (ranExtraInjection) {
			return false;
		}
		ranExtraInjection = true;
		
		for (var x in HTMLCLASS_SETTINGS) {
			if (userSettings[HTMLCLASS_SETTINGS[x]]) {
				addClass(d.documentElement, 'ponyhoof_settings_'+HTMLCLASS_SETTINGS[x]);
			}
		}
		
		var globalcss = '';
		globalcss += 'html.ponyhoof_settings_show_messages_other #navItem_app_217974574879787 > ul {display:block !important;}';
		globalcss += '#ponyhoof_page_readme {width:100%;height:300px;border:1px solid #B4BBCD;margin-top:4px;box-sizing:border-box;}';
		globalcss += '.uiMetaComposerMessageBoxTable #ponyhoof_page_readme {border-width:1px 0;}';
		globalcss += '#fbIndex_swf {position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;}';
		injectManualStyle(globalcss, 'global');
		
		if (userSettings.customcss) {
			injectManualStyle(userSettings.customcss, 'customcss');
		}
		
		INTERNALUPDATE = true;
		for (var i = 0; i < 10; i++) {
			var n = d.createElement('div');
			n.id = 'ponyhoof_extra_'+i;
			d.body.appendChild(n);
		}
		
		var timeShift = function() {
			var now = new Date();
			
			d.documentElement.setAttribute('data-ponyhoof-year', now.getFullYear());
			d.documentElement.setAttribute('data-ponyhoof-month', now.getMonth());
			d.documentElement.setAttribute('data-ponyhoof-date', now.getDate());
			d.documentElement.setAttribute('data-ponyhoof-hour', now.getHours());
			d.documentElement.setAttribute('data-ponyhoof-minute', now.getMinutes());
		};
		timeShift();
		setInterval(timeShift, 60*1000);
		
		if (userSettings.chatSound) {
			onPageReady(function() {
				var chatSound = '/* '+SIG+' */';
				chatSound += 'try {';
				chatSound += '	window.requireLazy(["ChatConfig"], function(ChatConfig) {';
				chatSound += '		ChatConfig.set("sound.notif_ogg_url", "'+THEMEURL+'_sound/grin.ogg");';
				chatSound += '		ChatConfig.set("sound.notif_mp3_url", "'+THEMEURL+'_sound/grin.mp3");';
				chatSound += '	});';
				chatSound += '} catch (e) {}';

				injectScriptByText(chatSound);
			});
		}

		//var pingback = new Image();
		//pingback.src = THEMEURL + 'pingback.gif?userscript_version='+VERSION;
		
				INTERNALUPDATE = false;
	};
	
	// Wait for the current page to complete
	var scriptStarted = false;
	function startScript() {
		if (scriptStarted) {
			return;
		}
		scriptStarted = true;
		
		// Are we running in a special Ponyhoof page?
		if (d.documentElement.id == 'ponyhoof_page') {
			// Modify the <html> tag
			addClass(d.documentElement, 'ponyhoof_userscript');
			d.documentElement.setAttribute('data-ponyhoof-userscript-version', VERSION);
			
			var v = d.getElementsByClassName('ponyhoof_VERSION');
			for (i = 0; i < v.length; i++) {
				v[i].textContent = VERSION;
			}
			
			try {
				if (d.documentElement.getAttribute('data-ponyhoof-update-current') > VERSION) {
					addClass(d.documentElement, 'ponyhoof_update_outdated');
				} else {
					addClass(d.documentElement, 'ponyhoof_update_newest');
				}
			} catch (e) {}
		}
		
		// Inject the system style so we can do any error trapping
		injectSystemStyle();

		// Determine what storage method to use
		STORAGEMETHOD = 'none';
		try {
			if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
				// Chrome lies about GM_getValue support
				// Solution: Tampermonkey
				GM_setValue("ponies", "awesome");
				if (GM_getValue("ponies") === "awesome") {
					STORAGEMETHOD = 'greasemonkey';
				}
			}
		} catch (e) {}
		
		if (STORAGEMETHOD == 'none') {
			try {
				if (ISCHROME && chrome.extension && typeof GM_getValue == 'undefined') {
					STORAGEMETHOD = 'chrome';
				}
			} catch (e) {}
		}
		
		if (STORAGEMETHOD == 'none') {
			try {
				if (ISOPERA && opera.extension) {
					STORAGEMETHOD = 'opera';
				}
			} catch (e) {}
		}
		
		if (STORAGEMETHOD == 'none') {
			STORAGEMETHOD = 'localstorage';
		}
		
		if (d.documentElement.id == 'ponyhoof_page') {
			addClass(d.documentElement, 'ponyhoof_storagemethod_'+STORAGEMETHOD);
			return;
		}

		loadSettings(function() {
			if (userSettings.debug_slow_load) {
				onPageReady(settingsLoaded);
				return;
			}
			
			settingsLoaded();
		});
	};
	
	function settingsLoaded() {
		// If we haven't set up Ponyhoof, don't log
		if (userSettings.theme == null || userSettings.debug_disablelog) {
			CANLOG = false;
		}

		// Run ONLY on #facebook
		if (d.documentElement.id != 'facebook') {
			log("Ponyhoof does not run on "+w.location.href+" (html id is not #facebook)");
			return;
		}
		
		// Did we already run our script?
		if (hasClass(d.documentElement, 'ponyhoof_userscript')) {
			log("Style already injected at "+w.location.href);
			return;
		}
		
		// Don't run in frames
		runMe = true;
		try {
			var href = w.location.href.toLowerCase();
			
			if ((href.indexOf('/plugins/like.php') != -1 || href.indexOf('/plugins/likebox.php') != -1 || href.indexOf('/plugins/subscribe.php') || href.indexOf('/plugins/facepile.php') != -1) && (href.indexOf('login/plugin_roadblock.php') == -1 && href.indexOf('#ponyhoof_runme') != -1)) {
				// Allow like boxes for the Ponyhoof page (yeah, a bit cheating)
			} else if (hasClass(d.body, 'chrmxt')) {
				// Allow for Facebook Notifications for Chrome
			} else {
				if (w.self != w.top) {
					throw 1;
				}
			}
		} catch (e) {
			log("Framed");
			runMe = false;
		}
		
		// Special instructions for browsers that needs localStorage (Chrome/Opera)
		if (STORAGEMETHOD == 'localstorage') {
			// Don't run on non-www :(
			if (userSettings.force_run) {
				log("Force running on "+w.location.href);
			} else {
				if (w.location.hostname != 'www.facebook.com') {
					log("w.location.hostname = "+w.location.hostname);
					runMe = false;
				}
			}
			
			// Don't run if there's no theme AND we're in Account Security Settings
			if (userSettings.theme == null && (w.location.href.indexOf('/settings?tab=security') != -1 ||w.location.href.indexOf('/login/roadblock.php') != -1)) {
				log("Ponyhoof does not run when there is no theme selected and running on Account Settings.");
				return;
			}
		}
		
		if (!runMe) {
			log("Ponyhoof style is not injected on "+w.location.href);
			//return;
		}
		
		// Modify the <html> tag
		addClass(d.documentElement, 'ponyhoof_userscript');
		addClass(d.documentElement, 'ponyhoof_storagemethod_'+STORAGEMETHOD);
		addClass(d.documentElement, 'ponyhoof_initial');
		d.documentElement.setAttribute('data-ponyhoof-userscript-version', VERSION);

		w.setTimeout(function() {
			removeClass(d.documentElement, 'ponyhoof_initial');
		}, 1000);

		// Grab the pony
		var luckyGuess = -1;
		CURRENTPONY = userSettings.theme;
		if (!CURRENTPONY) {
			// If we are on Chrome, check if we already have settings previously
			if (STORAGEMETHOD == 'chrome') {
				try {
					var _settings = w.localStorage.getItem('ponyhoof_settings');
					if (_settings) {
						_settings = JSON.parse(_settings);
						if (_settings) {
							userSettings = _settings;
							saveSettings();
							CURRENTPONY = userSettings.theme;
							
							delete w.localStorage['ponyhoof_settings'];
						}
					}
				} catch (e) {
					log("Failed to read previous settings");
				}
			}
		}
		
		if (!CURRENTPONY) {
			// If we have a "special" name, load the peferred theme for that character if we're in one
			try {
				getBronyName();
				for (var i = 0; i < PONIES.length; i++) {
					if (PONIES[i].users) {
						for (var j = 0; j < PONIES[i].users.length; j++) {
							if (BRONYNAME.toLowerCase().indexOf(PONIES[i].users[j]) != -1) {
								// We got a match!
								CURRENTPONY = PONIES[i].code;
								luckyGuess = i;
							}
						}
					}
				}
			} catch (e) {
				log("Failed to get brony name");
			}
		}
		
		// If we still don't have one, then assume none
		if (!CURRENTPONY) {
			CURRENTPONY = 'NONE';
		}
		
		// If we don't have an old setting and not logged in, DON'T load the theme
		USERID = cookie('c_user');

		CURRENTLANG = LANG['en_US'];
		if (!userSettings.forceEnglish) {
			UILANG = getDefaultUiLang();
			if (!UILANG) {
				UILANG = 'en_US';
			} else {
				for (var i in LANG[UILANG]) {
					CURRENTLANG[i] = LANG[UILANG][i];
				}
			}
		}
		
		if (!USERID && !userSettings.allowLoginScreen) {
			return;
		}

		// FIXME: Stop running at RockMelt login
		if (userSettings.theme == null) {
			if (!USERID) {
				// Special exception at home page
				if (!hasClass(d.body, 'fbIndex')) {
					log("Ponyhoof does not run for logged out users.");
					return;
				}
			}
		}
		
		if (hasClass(d.body, 'plugin') || hasClass(d.body, 'transparent_widget')) {
			if (runMe) {
				addClass(d.documentElement, 'ponyhoof_fbplugin');
				changeThemeSmart(CURRENTPONY);
			}
		} else {
			// Inject Ponyhoof Options in the Account dropdown
			// even when DOMNodeInserted is disabled
			onPageReady(injectOptionsLink);
			
			if (runMe) {
				// Are we on homepage?
				if (hasClass(d.body, 'fbIndex') && userSettings.allowLoginScreen) {
					// Activate screen saver
					screenSaverActivate();
					
					onPageReady(function() {
						// Add a Register link in the footer
						var nav = $('footerContainer').getElementsByClassName('navigation')[0];
						
						var regSpan = d.createElement('span');
						regSpan.innerHTML = " &middot; ";
						
						var regLink = d.createElement('a');
						regLink.href = '//'+getFbDomain()+'/r.php';
						regLink.innerHTML = "Sign Up";
						regLink.title = "Sign up for Facebook.";
						
						nav.insertBefore(regSpan, nav.children[0]);
						nav.insertBefore(regLink, regSpan);
					});
				}
				
				// No theme?
				if (userSettings.theme == null) {
					// No theme AND logged out
					if (!USERID) {
						if (STORAGEMETHOD != 'chrome') {
							changeTheme('login');
							log("Homepage is default to login.");
							extraInjection();
							if (!userSettings.disableDomNodeInserted) {
								runDOMNodeInserted();
							}
						}
						return;
					}
					
					if (luckyGuess == -1) {
						CURRENTPONY = getRandomMane6();
					}

					//onPageReady(function() {
						var welcome = new WelcomeUI({feature: luckyGuess});
						welcome.start();
					//});
				} else {
					if (hasClass(d.body, 'fbIndex')) {
						if (CURRENTPONY == 'RANDOM') {
							log("On login page and theme is RANDOM, choosing 'login'");
							changeThemeSmart('login');
						} else {
							changeThemeSmart(CURRENTPONY);
						}

						var dat = convertCodeToData(REALPONY);
						if (dat.fbIndex_swf && !userSettings.disable_animation) {
							addClass(d.documentElement, 'ponyhoof_fbIndex_hasswf');

							swf = d.createElement('div');
							swf.innerHTML = '<object type="application/x-shockwave-flash" id="fbIndex_swf" width="100%" height="100%" data="'+THEMEURL+dat.fbIndex_swf+'"><param name="movie" value="'+THEMEURL+dat.fbIndex_swf+'"><param name="wmode" value="opaque"><param name="menu" value="false"></object>';
							d.body.appendChild(swf);
						}
					} else {
						changeThemeSmart(CURRENTPONY);

						// Notices for the user
						/*if (ISCHROME && STORAGEMETHOD == 'localstorage') {
							if (!userSettings.shownChromeCwsWarning) {
								userSettings.shownChromeCwsWarning = true;
								saveSettings();
								
								var bottom = '';
								bottom += '<a href="#" class="uiButton uiButtonLarge uiButtonConfirm" role="button" id="ponyhoof_ChromeCwsWarning_open"><span class="uiButtonText">Install</span></a>';
								bottom += '<a href="#" class="uiButton uiButtonLarge" role="button" id="ponyhoof_ChromeCwsWarning_close"><span class="uiButtonText">Ignore anyway</span></a>';
								
								var di = new Dialog('ChromeCwsWarning');
								di.alwaysModal = true;
								di.create();
								di.changeTitle("Hey there long-time user! Please re-install Ponyhoof from the Chrome Web Store");
								di.changeContent("It looks like you are still installing Ponyhoof using the old method. Please note that newer versions of Chrome will <strong>block</strong> extensions that are not installed from the Chrome Web Store. Don't worry, we are already there a long time ago ;)");
								di.changeBottom(bottom);
								
								$('ponyhoof_ChromeCwsWarning_open').addEventListener('click', function() {
									di.close();
									top.location.href = 'http://jointheherd.little.my';
								});
								
								$('ponyhoof_ChromeCwsWarning_close').addEventListener('click', function() {
									di.close();
								});
							}
						}*/

						/* Remember this day, little ponies, for it was your last. From this moment forth, the night will last... forever! */
						if (STORAGEMETHOD == 'chrome' && !userSettings.allowLoginScreen && !userSettings.survivedTheNight) {
							userSettings.survivedTheNight = true;
							userSettings.allowLoginScreen = true;
							saveSettings();
						}
					}
				}
			}
		}
		
		if (runMe && CURRENTPONY != 'NONE' && !userSettings.disableDomNodeInserted) {
			runDOMNodeInserted();
		}
		
		if (runMe && CURRENTPONY != 'NONE') {
			extraInjection();
		}
	}
	
	onPageReady(startScript);
	d.addEventListener('DOMContentLoaded', startScript, true);
	
	var _loop = function() {
		if (d.body) {
			if (!scriptStarted) {
				startScript();
			}
			return;
		} else {
			setTimeout(_loop, 100);
		}
	};
	_loop();
})();

/*eof*/