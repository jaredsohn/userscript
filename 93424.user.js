// ==UserScript==
// @name           bbs.archlinux.pl.logo
// @namespace      lobotomius.com
// @include        http://bbs.archlinux.pl/*
// ==/UserScript==

function sn(xp, ct) {
	var r = document.evaluate(xp, ct, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	if(r) 
		return r.singleNodeValue
	else 
		return null;
}

function setlogo(url) {
	sn('//div[@id="archnavbarlogo"]', document).setAttribute('style', 'background: url('+url+') no-repeat scroll 0 0 transparent !important;');
};

var d = new Date();
var data=d.getMonth()+'.'+d.getDate();

if(GM_getValue('sync', 0) != data) {

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://lobotomius.com/bbs.archlinux.pl.logo.php",
		onload: function(response) {
			GM_setValue('url', response.responseText);
			GM_setValue('sync', data);
		},
		onerror: function() {
			GM_setValue('url', 'default');
		}
	});
};

if(window.location.href.indexOf('/misc.php?logosettings') != -1) {

	sn('//div[@id="msg"]', document).innerHTML = "\
		<h2>Ustawienia logo</h2>\
		<div style=\"\">Logo zmienia się w wybranych dniach roku. Domyślne logo forum, wyświetlane w pozostałe dni, możesz zastąpić jednym z listy poniżej:</div>\
		<div id=\"loga\"style=\"padding: 20px; background-color: #333; -moz-box-shadow: 3px 3px 3px #666;\"></div><br />\
		<div style=\"width: 200px; float: left; padding: 10px\">Aktualne logo domyślne:<br />\
			<img style=\"background: #333; padding: 10px\" id=\"aktualne\" \
				src=\""+GM_getValue('default', 'http://archlinux.pl/archlogo.png')+"\"></img>\
		</div>\
	";

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://lobotomius.com/bbs.archlinux.pl.logo.php?list",
		onload: function(response) {
			var l = response.responseText.split("\n");
			var box = sn('//div[@id="loga"]', document);
			for(var i in l) {
				var e = document.createElement('img');
				e.setAttribute('src', l[i]);
				e.setAttribute('id', 'logo'+i);
				e.addEventListener('click', function(event) {
					GM_setValue('default', this.src);
					sn('//img[@id="aktualne"]', document).setAttribute('src', this.src);
				}, false);
				box.appendChild(e);
			};
		}
	});


};

GM_registerMenuCommand('Logo: ustawienia', function() { window.location='http://bbs.archlinux.pl/misc.php?logosettings'; });

if(GM_getValue('url', 'default')=='default')
	setlogo(GM_getValue('default', 'http://archlinux.pl/archlogo.png'))
else
	setlogo(GM_getValue('url', 'http://archlinux.pl/archlogo.png'));

//