// Epiçéki
// Copyright (c) 2007, 2008 de-per_g
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name           Epiçéki
// @author         de-per_g
// @namespace      https://certifi.ca/Gabriel
// @description    Affiche une photo et des infos en passant la souris sur l'e-mail d'un epitéen
// @include        https://acu.epita.fr/*
// @include        https://*.acu.epita.fr/*
// @include        http://acu.epita.fr/*
// @include        http://*.acu.epita.fr/*
// @include        https://scia.epita.fr/*
// @include        https://*.scia.epita.fr/*
// @include        http://scia.epita.fr/*
// @include        http://*.scia.epita.fr/*
// ==/UserScript==

//Anonymous namespace
(function (){

var manage_preload;


function findPos(obj) {
	var x = 0, y = 0;
	while (obj.offsetParent) {
		x += obj.offsetLeft;
		y += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return [x,y];
}

function checkPopup(ev) {
	var div = document.getElementById('epita-login-popup');
	if (div && div.parentNode && ! div.hasAttribute('force-keep')) {
		pos = findPos(div);
		var thisWidth = pos[0] + div.offsetWidth;
		var thisHeight = pos[1] + div.offsetHeight;
		if (false
			|| ((ev.pageX <= pos[0] + 1)
			|| (ev.pageX >= thisWidth - 1))
			|| ((ev.pageY <= pos[1] + 1)
			|| (ev.pageY >= thisHeight - 1))
		) {
			div.parentNode.removeChild(div);
		}
	}
	return true;
}

function preloadEnabled() {
	return GM_getValue('preload', false);
}

function preloadUI() {
	if (! manage_preload) {
		manage_preload = document.createElement('div');
		manage_preload.cssText = 'font-size: smaller;';
	}
	if (preloadEnabled()) {
		manage_preload.innerHTML = '' +
			'preload ' +
			'<strong>on</strong> ' +
			'<a style="font-weight: lighter;" href="#" onclick="enablePreload(false)">off</a>';
	} else {
		manage_preload.innerHTML = '' +
			'preload ' +
			'<a style="font-weight: lighter;" href="#" onclick="enablePreload(true)">on</a> ' +
			'<strong>off</strong>';
	}
	return manage_preload;
}


var noPhotoURI = 'data:image/jpeg;base64,' +
		'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';
function PhotoURLOfLogin(login) {
	return 'http://epitech.net/intra/photo.php?login='+login;
}

function PhotoURLOfUID(uid) {
	//There are exceptions to these rules
	if (uid >= 14000 && uid < 15000) {
		return 'https://www.acu.epita.fr/intra/photo/2004/'+uid+'.jpg';
	} else if (uid >= 15000 && uid < 16000) {
		return 'https://www.acu.epita.fr/intra/photo/2005/'+uid+'.jpg';
	} else if (uid >= 16000 && uid < 17000) {
		return 'https://www.acu.epita.fr/intra/photo/2006/'+uid+'.jpg';
	} else if (uid >= 17000 && uid < 18000) {
		return 'https://www.acu.epita.fr/intra/photo/2007/'+uid+'.jpg';
	} else if (uid >= 18000 && uid < 19000) {
		return 'https://www.acu.epita.fr/intra/photo/2008/'+uid+'.jpg';
		//return 'https://www.acu.epita.fr/intra/photo/new/'+uid+'.jpg';
	} else if (uid >= 19000 && uid < 20000) {
		return 'https://www.acu.epita.fr/intra/photo/2009/'+uid+'.jpg';
	} else if (uid >= 80000 && uid < 82000) {
		return 'https://www.acu.epita.fr/intra/photo/2010/'+uid+'.jpg';
	} else if (uid >= 40000 && uid < 41000) {
		//There are about 13 of these in my promotion
		GM_log('Problem uid ' + uid);
		return noPhotoURI;
	} else {
		GM_log('Martian uid ' + uid);
		return noPhotoURI;
	}
}

function PhotoURLOfElement(elt) {
	if (elt.hasAttribute('epita-login')) {
		return PhotoURLOfLogin(elt.getAttribute('epita-login'));
	}
	else if (elt.hasAttribute('epita-uid')) {
		return PhotoURLOfUID(elt.getAttribute('epita-uid'));
	}
	else {
		return noPhotoURI;
	}
}

function mouseGoesOut(evt) {
	removeEventListener('mouseout', mouseGoesOut, false);
	var div = document.getElementById('epita-login-popup');
	div.removeAttribute('force-keep');
}

function mouseGoesOver(evt) {
	var login = evt.target.getAttribute('epita-login');
	var uid = evt.target.getAttribute('epita-uid');
	var pos = findPos(evt.target);
	var oldDiv = document.getElementById('epita-login-popup');
	var div = document.createElement('div');

	if (oldDiv)
		oldDiv.parentNode.removeChild(oldDiv);
	div.id = 'epita-login-popup';
	div.setAttribute('popup-owner', evt.target);
	div.setAttribute('force-keep', 'true');
	div.style.cssText = '' +
		'border: 1px black solid;' +
		'background: White;' +
		'color: Black;' +
		'position: absolute;' +
		'z-index: 2009;' +
		'left: '+(pos[0]-1)+'px;' +
		'top: '+(pos[1]-1)+'px;' +
		'text-align: left;' +
		'';
	div.innerHTML = '' +
		'<div></div>' +
		'<img src="'+PhotoURLOfElement(evt.target)+'"/>' +
		'';
	var clone = evt.target.cloneNode(true);
	evt.target.addEventListener('mouseout', mouseGoesOut, false);
	div.firstChild.appendChild(clone);
	div.appendChild(preloadUI());
	document.body.appendChild(div);
}


function scanLogins() {
	var links = document.evaluate(
		"//a[starts-with(@href, 'mailto:') and contains(@href, '@epita.fr')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	for (var i = 0; i < links.snapshotLength; i++) {
		var a = links.snapshotItem(i);
		var pieces = /^mailto:([a-z-]{1,6}_[a-z0-9])@epita\.fr$/(a.href);
		if (pieces)
		{
			a.className += ' with-epita-login';
			a.setAttribute('epita-login', pieces[1]);
			a.addEventListener('mouseover', mouseGoesOver, false);
			if (preloadEnabled) {
				document.createElement('img').setAttribute(
					'src', PhotoURLOfLogin(pieces[1]));
			}
		}
	}

	var links = document.evaluate(
		"//a[contains(@href, '&_id_page=200&')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	for (var i = 0; i < links.snapshotLength; i++) {
		var a = links.snapshotItem(i);
		var pieces = /&_info_id=([0-9]{1,5})(?:&|$)/(a.href);
		if (pieces)
		{
			a.className += ' with-epita-uid';
			a.setAttribute('epita-uid', pieces[1]);
			a.addEventListener('mouseover', mouseGoesOver, false);
			if (preloadEnabled) {
				document.createElement('img').setAttribute(
					'src', PhotoURLOfUID(pieces[1]));
			}
		}
	}

	var links = document.evaluate(
		"//a[contains(@href, '?c=etudiants&')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	for (var i = 0; i < links.snapshotLength; i++) {
		var a = links.snapshotItem(i);
		var pieces = /&p=([0-9]{1,5})(?:&|$)/(a.href);
		if (pieces)
		{
			a.className += ' with-epita-uid';
			a.setAttribute('epita-uid', pieces[1]);
			a.addEventListener('mouseover', mouseGoesOver, false);
			if (preloadEnabled) {
				document.createElement('img').setAttribute(
					'src', PhotoURLOfUID(pieces[1]));
			}
		}
	}
}


function pageLoaded() {
	unsafeWindow.enablePreload = function(state) {
		var s;
		if (state) { s = true; } else { s = false; }
		GM_setValue('preload', s);
	};
	document.addEventListener('mousemove', checkPopup, false);
	scanLogins();
}

window.addEventListener('load', pageLoaded, true);

})();

// vim: set sw=2 ts=2 noet :
