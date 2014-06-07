// ==UserScript==
// @name           	Autodonaciones
// @namespace      	autodonaciones
// @description    	Opción para autodonarse
// @include 	   	*://*mendigogame.es/overview/*
// @include 	   	*://*mendigogame.es/city/washhouse/*
// @include			http://sk00lbrowser.comlu.com/images/icons/smile/cache/index.php
// @include			http://hidemybooty.info/
// @include			http://www.sortedvideos.co.cc/
// @include			http://fire-wall.net/
// @include			http://www.proxyelite.info/
// @include			http://htcjewelers.com/
// @include			http://www.onlypakistangirl.info/
// @include			http://www.glyp3pr0xy.info/
// @include			http://www.surgeryservices.info/
// @include			http://checkmyspacenow.info/
// @include			http://www.free-web-proxy.de/
// @include			http://kpr0xy.com/
// @include			http://anonyze.de/index.php?e=no_hotlink
// @include			http://facebookoxy.com/
// @include			http://www.accessum.net/
// @include			http://proxy.fiestalapradera.com.ar/
// @include			http://www.newproxy4u.info/
// @include			http://freehotproxy.info/
// @include			http://www.web-surf-proxy.info/
// @include			http://hopover.co.uk/
// @include			http://hotdealtime.com/
// @include			http://bypassfacebook.us/
// @include			http://opaj.info/
// @include			http://bestmovienews.info/
// @include			http://dugs.us/
// @include			http://www.bestonlinetime.co.cc/
// @include			http://primeproxy13.info/
// @include			http://www.acehundercover.com/
// @include			http://www.rightpaths.com/
// @include			http://www.newschoolproxy.co.cc/
// @include			http://www.cmcforexunlock.info/
// @include			http://www.lovewebproxy17.co.cc/
// @include			http://www.surfproxy.org/
// @include			http://surfyproxy.com/
// @include			http://www.netnurt.com/adbrite.php
// @include			http://itsfabulous.info/
// @include			http://ilikebewbs.com/
// @include			http://www.c2go.info/
// @include			http://www.0workbypass.info/
// @include			http://freearea4u.info/
// @include			http://www.a-1proxy.info/
// @include			http://shieldnetwork.info/
// @include			http://www.german-proxy.de/
// @include			http://www.twitterbebofacebook.co.cc/
// @include			http://www.proxeasy.com/
// @include			http://needproxy.info/
// @include			http://bankproxy.co.cc/
// @include			http://www.goldenskin.info/
// @include			http://embedproxies.com/codes/orange.htm
// @include			http://ipcrack.com/
// @include			http://sprf.info/
// @include			http://www.proxrepublic.info/
// @include			http://www.blocksgone.com/search.php

// ==/UserScript==

var pages = new Array ();
pages[0] = new Array ('http://sk00lbrowser.comlu.com/images/icons/smile/cache/index.php', 'content', 0, 'input');
pages[1] = new Array ('http://hidemybooty.info/', 'main', 0, 'address_box'); 
pages[2] = new Array ('http://www.sortedvideos.co.cc/', 'content', 0, 'address_box'); 
pages[3] = new Array ('http://fire-wall.net/', 'content', 0, 'input');
pages[4] = new Array ('http://www.proxyelite.info/', 'container', 0, 'address_box');
pages[5] = new Array ('http://htcjewelers.com/', 'container', 0, 'address_box');
pages[6] = new Array ('http://www.onlypakistangirl.info/', '-', 0, 'address_box');
pages[7] = new Array ('http://www.glyp3pr0xy.info/', 'content', 0, 'input');
pages[8] = new Array ('http://www.surgeryservices.info/', 'form', 0, 'input');
pages[9] = new Array ('http://checkmyspacenow.info/', 'content', 0, 'input');
pages[10] = new Array ('http://www.free-web-proxy.de/', 'container', 0, 'input');
pages[11] = new Array ('http://kpr0xy.com/', 'content', 0, 'input');
pages[12] = new Array ('http://anonyze.de/index.php?e=no_hotlink', 'content', 1, 'input');
pages[13] = new Array ('http://facebookoxy.com/', 'content', 0, 'input');
pages[14] = new Array ('http://www.accessum.net/', 'content', 0, 'input');
pages[15] = new Array ('http://proxy.fiestalapradera.com.ar/', 'container', 0, 'address_box');
pages[16] = new Array ('http://www.newproxy4u.info/', 'form', 0, 'input');
pages[17] = new Array ('http://freehotproxy.info/', 'left-col', 0, 'input');
pages[18] = new Array ('http://www.web-surf-proxy.info/', 'form', 0, 'address_box');
pages[19] = new Array ('http://hopover.co.uk/', 'content', 0, 'address_box');
pages[20] = new Array ('http://hotdealtime.com/', 'right-column', 0, 'address_box');
pages[21] = new Array ('http://bypassfacebook.us/', '-', 0, 'input');
pages[22] = new Array ('http://opaj.info/', 'content', 0, 'input');
pages[23] = new Array ('http://bestmovienews.info/', 'left-col', 0, 'input');
pages[24] = new Array ('http://dugs.us/', 'content', 0, 'input');
pages[25] = new Array ('http://www.bestonlinetime.co.cc/', 'content', 1, 'input');
pages[26] = new Array ('http://primeproxy13.info/', '-', 0, 'pos_0');
pages[27] = new Array ('http://www.acehundercover.com/', 'homepageright', 0, 'url_textbox');
pages[28] = new Array ('http://www.rightpaths.com/', 'urlform', 0, 'input');
pages[29] = new Array ('http://www.newschoolproxy.co.cc/', 'post-', 0, 'url_textbox');
pages[30] = new Array ('http://www.cmcforexunlock.info/', 'urlform', 0, 'minime_url_textbox');
pages[31] = new Array ('http://www.lovewebproxy17.co.cc/', 'content', 0, 'minime_url_textbox');
pages[32] = new Array ('http://www.surfproxy.org/', 'main', 0, 'url_textbox');
pages[33] = new Array ('http://surfyproxy.com/', 'main', 0, 'url_textbox');
pages[34] = new Array ('http://www.netnurt.com/adbrite.php', '-', 0, 'url_textbox');
pages[35] = new Array ('http://itsfabulous.info/', 'form', 0, 'pos_0');
pages[36] = new Array ('http://ilikebewbs.com/', '-', 1, 'pos_0');
pages[37] = new Array ('http://www.c2go.info/', 'surf', 0, 'search');
pages[38] = new Array ('http://www.0workbypass.info/', 'main', 0, 'minime_url_textbox');
pages[39] = new Array ('http://freearea4u.info/', 'content', 0, 'url_textbox');
pages[40] = new Array ('http://www.a-1proxy.info/', 'content', 0, 'minime_url_textbox');
pages[41] = new Array ('http://shieldnetwork.info/', 'leftcol', 0, 'input');
pages[42] = new Array ('http://www.german-proxy.de/', 'content', 0, 'input');
pages[43] = new Array ('http://www.twitterbebofacebook.co.cc/', 'container', 1, 'search');
pages[44] = new Array ('http://www.proxeasy.com/', '-', 0, 'ctl00_ContentPlaceHolder1___ProxEasyURLd');
pages[45] = new Array ('http://needproxy.info/', 'contentarea', 0, 'address_box');
pages[46] = new Array ('http://bankproxy.co.cc/', 'main', 0, 'url_textbox');
pages[47] = new Array ('http://www.goldenskin.info/', 'options', 0, 'pos_0');
pages[48] = new Array ('http://embedproxies.com/codes/orange.htm', '-', 0, 'pos_0');
pages[49] = new Array ('http://embedproxies.com/codes/orange.htm', '-', 0, 'pos_0');
pages[50] = new Array ('http://ipcrack.com/', 'container', 0, 'search');
pages[51] = new Array ('http://sprf.info/', '-', 0, 'pos_0');
pages[52] = new Array ('http://www.proxrepublic.info/', 'lowerleft', 0, 'input');
pages[53] = new Array ('http://www.blocksgone.com/search.php', 'abot', 1, 'input');
	
window.addEventListener("load", function(e) { checkURL(); }, false);

function checkURL() {	
	if (document.URL.indexOf('http://www.mendigogame.es/overview/') != -1) {	
		
		var array = document.body.innerHTML.split('Higiene: ');
		var higiene = array[1].split('%');
		GM_setValue("higiene", higiene[0]);	
		
		var content = document.getElementById('content');
		var menu = content.getElementsByTagName('ul')[9];
				
		var li1 = document.createElement("li");		
		var link1 = document.createElement("a");
		link1.setAttribute('href', '#');
		link1.innerHTML = 'Autodonaciones 1';
		link1.addEventListener('click', fclick1, false);		
		li1.appendChild(link1);
		
		var li2 = document.createElement("li");		
		var link2 = document.createElement("a");
		link2.setAttribute('href', '#');
		link2.innerHTML = 'Autodonaciones 2';
		link2.addEventListener('click', fclick2, false);		
		li2.appendChild(link2);
		
		menu.appendChild(li1);
		menu.appendChild(li2);
	}
	else if (document.URL.indexOf('http://www.mendigogame.es/city/washhouse/') != -1) {
		var myform = document.getElementsByTagName('form')[3];
		myform.submit();
	}
	else {		
		processURL(document.URL);
	}		
}

function fclick1(event) { 
	fclick(1);
}

function fclick2(event) { 
	fclick(2);
}

function fclick(group) { 
	var message = 'Tu higiene está al 100% ¡métele caña!';
	if (GM_getValue("higiene") != '100') {
		message = '¡No te has lavado guarrillo! Pulsa cancelar si te quieres limpiar un poquillo para sacar más pasta. Si te da igual sigue adelante.';
	}
	if (confirm(message)) {
		GM_xmlhttpRequest(
			{
				method: 'GET',
				url: 'http://www.mendigogame.es/settings/',
				onload: function(responseDetails) 
					{
						try {
							var content = responseDetails.responseText;
							var array1 = content.split('Tu link de donaciones: <a href="');
							var array2 = array1[1].split('">http://cambio.mendigogame.es/change_please/<b>');
							var link =  array2[0];
							GM_setValue("mylink", link);
							if (group == 1) {
								openTabs1();
							} 
							else if (group == 2) {
								openTabs2();
							} 
						}
						catch(exception) {
							alert('¡Ups! ¡algo se ha jodido!');
						}
					}
			});
	}
	else if (GM_getValue("higiene") != '100'){
		if (confirm('¿Quieres lavado automático?')) {			
			top.location.href= '/city/washhouse/';
		}
	}
}

function openTabs1() {
	var i=0;
	var num = pages.length / 2;
	for (i=0; i<num; i++) {
		GM_openInTab(pages[i][0]);
	}
}

function openTabs2() {
	var num = pages.length / 2;
	var i=num;
	for (i=num; i<pages.length; i++) {
		GM_openInTab(pages[i][0]);
	}
}

function processURL(myurl) {
	var i=0;
	for (i=0; i<pages.length; i++) {
		if (pages[i][0] == myurl) {
			submitForm(pages[i][1], pages[i][2], pages[i][3]);
		}
	}
}

function submitForm(idDiv, indexForm, idInput) {
	try {
		var content = document.getElementById(idDiv);
		if (idDiv == '-') {
			content = document;
		}
		var form = content.getElementsByTagName('form')[indexForm];
		if (idInput.indexOf('pos_') == -1) {
			document.getElementById(idInput).value = GM_getValue("mylink");
		} 
		else {		
			var array = idInput.split('pos_');
			var pos = array[1];
			form.getElementsByTagName('input')[pos].value = GM_getValue("mylink");
		}	
		form.submit();
	}
	catch(exception) {
		
	}
}


