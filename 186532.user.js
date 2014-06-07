// ==UserScript==
// @name          Actions OVS
// @namespace     http://yopai.hd.free.fr/onvasortir.com
// @description   Ajoute diverses choses à l'interface d'OVS.
// @include       http://*.onvasortir.com/*
// ==/UserScript==

/*
function addScript(src) {
    var script = document.createElement('script');
    script.src = src;
    script.type='text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
}
addScript('https://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js');
*/


function toArray(_enum) {
	return Array.prototype.slice.call(_enum);
}
Function.prototype.curry = function() {
    if (arguments.length<1) {
        return this; //nothing to curry with - return function
    }
    var __method = this;
    var args = toArray(arguments);
    return function() {
        return __method.apply(this, args.concat(toArray(arguments)));
    }
}

var log = function log(a, response) {
	console.log(response.responseText);
}
var xpathResult = document.evaluate('//a',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
var n = xpathResult.snapshotLength;
function decode_city(callback, id_sortie, response) {
	var	patt=[
		/Adresse exacte/g,
		/<td/g,
		/<td ALIGN="center" valign=top>/g,
		/<\/td>/g
	];
	html = response.responseText;
	patt[0].exec(html); html = html.substr(patt[0].lastIndex+1);
	patt[1].exec(html); html = html.substr(patt[1].lastIndex+1);
	patt[2].exec(html); html = html.substr(patt[2].lastIndex+1);
	//
	patt[3].exec(html); html = html.substr(0, patt[3].lastIndex-patt[3].source.length);
	city = html;
	if (localStorage) {
		localStorage['city_'+id_sortie] = city;
	}
	callback(city);
}

var max_load_page = 99999999;
function get_city(id_sortie, href, callback) {
	if (localStorage && typeof(localStorage['city_'+id_sortie]) != 'undefined') {
		city = localStorage['city_'+id_sortie];
	}
	else {
		city = null;
	}
	if (city) {
		callback(city);
	}
	else if (max_load_page) {
		GM_xmlhttpRequest({
			method: "GET",
			url: href,
			onload: decode_city.curry(callback, id_sortie)
		});
		max_load_page--;
	}
}

function set_city(a, city) { 
	a.innerHTML += '<div style="float:left; width:90px; margin-right:5px; border-right:1px solid right">'+city+'</div>';
}

function add_city(a) {
	var patt = /.*-(\d+).html/g;
	r = patt.exec(a.href);
	id_sortie = r[1];
	get_city(id_sortie, a.href, set_city.curry(a));
}

for (var i=0; i<n; i++) {
	var a = xpathResult.snapshotItem(i);
	if (a.href) {
		// liens de profil d'utilisateur, ajoute un [+] pour ajouter aux amis
		if (a.href.match(/profil_read.php\\?/)) {
			var href = a.href.replace(/profil_read.php./, 'ami_action_create.php?Ami=')+'&Comm=';
			var link = document.createElement('a');
			link.href = href;
			link.title = 'Ajouter à mes amis';
			link.target = 'ajout_amis';
			link.addEventListener('click', function(event) {
				w = window.open(this.href, '_blank');
				setTimeout(w.close.bind(w), 2000);
				event.preventDefault();
			}, true);
			link.innerHTML = '[+]';
			a.parentNode.insertBefore(link, a.nextSibling);
		}
		else if (a.href.match(/.*-[0-9]+\.html/)) {
			add_city(a);
		}
	}
}

// document.title = 'script ovs done';

