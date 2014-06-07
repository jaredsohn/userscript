// ==UserScript==
// @name		Penguin Irrigation by Nabi K.A.Z.
// @namespace	http://userscripts.org/users/126399
// @description	I can irrigation throughout your garden about penguin farmer game!
// @version	1.0
// @date		2010-01-11
// @author		Nabi KaramAlizadeh (from Iran)
// @homepage	http://Nabi.ir/
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html 
// @include	http://*ba6rik.com/*
// @include	http://*pinguinfarmer.at/*
// @include	http://*fazendapinguim.com/*
// @include	http://*penguinfarmer.bg/*
// @include	http://*penguinfarmer.com/*
// @include	http://*penguinfarmer.com/*
// @include	http://*fermierpingouin.fr/*
// @include	http://*pinguinfarmer.de/*
// @include	http://*penguinfarmer.gr/*
// @include	http://*pingvinfarmer.hu/*
// @include	http://*polarpengi.com/*
// @include	http://*penguinfarmer.it/*
// @include	http://*penguinfarmer.jp/*
// @include	http://*penguinfarmer.nl/*
// @include	http://*penguinfarmer.no/*
// @include	http://*lodoweogrody.wp.pl/*
// @include	http://*penguinfarmer.ro/*
// @include	http://*sadpingvina.ru/*
// @include	http://*pinguinogranjero.es/*
// @include	http://*penguinfarmer.se/*
// @include	http://*pinguinfarmer.ch/*
// @include	http://*penguinfarmer.net/*
// @include	http://*pingvinfermer.com/*
// ==/UserScript==


// Translations
var lang = new Array();
function loadTranslations(domain) {
	switch (domain) {
		default:
		case 'penguinfarmer.com': //English
			lang['title'] = 'I can irrigation throughout your garden!';
		break;
		case 'polarpengi.com': //Iran
			lang['title'] = 'من ميتونم تمام باغچه‌ات رو آبياري کنم!';
		break;
	}
}


// Find domain
var url = /http:\/\/(www\.)?([^/]*)/.exec(location.href);
var www = url[1];
var domain = url[2];
loadTranslations(domain);
if (!www) var www = '';


// Embedded Images
var helperWater = 'data:image/gif;base64,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';


// Prepare interfce
var helpers = document.getElementById('helpers');
if (helpers) {
	var dd = document.createElement('dd');
	dd.id = "helper-Water2";
	dd.title = lang['title'];
	dd.style.width = "67px";
	dd.style.height = "54px";
	dd.style.top = "-88px";
	dd.style.left = "172px";
	dd.style.cursor = "pointer";
	dd.style.background = "transparent url("+helperWater+") no-repeat scroll 0 0";
	dd.addEventListener("click", buttonHandler, true);
	helpers.appendChild(dd);
}


//Button handler
function buttonHandler() {
		var x = document.getElementById("fields").getElementsByTagName("dd");
		for (i=0;i<x.length;i++)
		{
			var field_id = x[i].id;
			var y = x[i].firstChild;
			if (y && y.nodeName == "IMG" && !document.getElementById("fieldWater"+field_id))
			{
				var z = y.src.match(".*/products/([0-9]+)_[123]\.gif");
				if (z)
				{
					var product_id = z[1];
					postData(field_id, product_id);
				}
			}
		}
}


//Post data
function postData(field_id, product_id) {
	if (!field_id || !product_id) return;
	var req = new XMLHttpRequest();
	req.field_id = field_id;
	req.onreadystatechange = function() {
	    if (req.readyState == 4 && req.status == 200) {
	        document.getElementById(req.field_id).innerHTML = document.getElementById(req.field_id).innerHTML + "<img border=\"0\" id=\"fieldWater"+req.field_id+"\" class=\"wateringField\" src=\"http://33.xs-software.com/penguinfarmer/img/layout/field_watering.gif\"/>";
	    }
	}
	req.open('POST', 'http://'+www+domain+'/index.php?r=game/water&waterForm=true&product_id='+product_id+'&field_id='+field_id, true);
	req.send(null);
}
