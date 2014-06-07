// ==UserScript==
// @name           Biblioteka funkcji - Dark Throne Gold
// @version        1.51
// @namespace      http://crashh.webd.pl/greasemonkey/js/a-funkcje.user.js
// @author         klonczak && Nanaki
//
// @description    Biblioteka funkcji do pozostałych skryptów DT, sama w sobie usuwa z paska tytułu tekst "Dark Throne", ustawia focusa na pola wpisywania ilości tur/szpiegów/złota w banku.
//
// @include        http://www.darkthrone.com/*
// @include        http://gold.darkthrone.com/*
// @include        http://darkthrone.com/*
// ==/UserScript==
var version = 1.51;

if(typeof unsafeWindow == 'undefined') {
	if(window.wrappedJSObject) var unsafeWindow = window.wrappedJSObject;
	else var unsafeWindow = window;
}
if(window.navigator.vendor && window.navigator.vendor.match(/Google/)) {
    var div = document.createElement("div");
    div.setAttribute("onclick", "return window;");
    unsafeWindow = div.onclick();
}

var DT = {
	scripts: 'http://crashh.webd.pl/forum/viewtopic.php?t=1242',
	labels: ["Name","offense","defense","spy offense","spy defense","life","Citizens","Workers","Soldiers","Knights","Berserkers","Warriors","Guards","Archers","Royal Guards","Elite Archers","Spies","Infiltrators","Assassins","Sentries","Sentinels","Inquisitors"],
	
	server: function() { return "http://crashh.webd.pl/greasemonkey/" },
	//============= COOKIES =============//
		createCookie: function(name,value,days) {
		if (days != -1) {
			localStorage.setItem(name,value);
		}
		else localStorage.removeItem(name);
		return value;
	},
	readCookie: function(name) {
		return localStorage.getItem(name);
	},
	//============= KONTAKT Z SERWEREM =============//
	odszyfruj: function(str) {
		var start = str.indexOf('<request>')+9;
		var end = str.lastIndexOf('</request>');
		return str.substr(start,(end-start));
	},
	request: function(url,post,func) {
		if(post === undefined || !post) post = null;
		if(url.search(/darkthrone\.com/ig) != -1) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open(post?'POST':'GET', url, true);
			xmlhttp.onreadystatechange = function (aEvt) { if (xmlhttp.readyState == 4 && xmlhttp.status == 200) func(xmlhttp.responseText); };
			xmlhttp.send(post); 
		} else if(typeof GM_xmlhttpRequest == 'function') {
			GM_xmlhttpRequest({
				method: post?'POST':'GET',
				headers: { "Content-type" : "application/x-www-form-urlencoded" },
				url: url,
				data: encodeURI(post),
				onload: function(responseDetails) { func(responseDetails.responseText); }
			});
		} else if (typeof opera.XMLHttpRequest == 'function') {
			var xmlhttp = new opera.XMLHttpRequest();
			xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xmlhttp.open(post?'POST':'GET',url,true);
			xmlhttp.onload = function(){ func(xmlhttp.responseText) }
			xmlhttp.send(post);
		}
	},
	//============= LICZBOWO/TEKSTOWE =============//
	tonumber: function(tekst) {
		if (typeof(tekst) == 'number') {
		return parseInt(tekst);
		} else {
			if (tekst == '') {
				return 0;
			} else {
				tekst = tekst.replace(/(,|\.| )/ig,'');
				return parseInt(tekst);
			}
		}
	},
	tostring: function(liczba) {
		var znak = ''
		if(liczba<0) var znak = '-';
		liczba = Math.abs(liczba)+'';
		
		var result='';
		var pom;
		for(var i=0; i<liczba.length; i++){
			result += liczba.charAt(i);
			pom = liczba.length-1-i;
			if(pom && !(pom % 3))
				result += ',';
		}
		return znak+result;
	},
	read_number: function(str) {
		var start = str.lastIndexOf('/')+1;
		if(start) {
			var end = str.indexOf('?');
			if(end == -1) end = str.length;
			return parseInt(str.substring(start,end));
		}
		return false;
	},
	//============= SPRAWDZANIE WERSJI =============//
	version_check: function(plik,wersja) {
		kuki = this.readCookie('DT-VerCheck-'+plik);
		if(!kuki) this.request(this.server()+'version_check.php',"plik="+plik, function(text) { DT.version_check2(text,plik,wersja); });
	},
	version_check2: function(odp,plik,wersja) {
		odp = this.odszyfruj(odp);
		this.createCookie('DT-VerCheck-'+plik,'checked',1);
		var script = odp.split('|');
		if(wersja < parseFloat(script[1])) {
			var go = confirm('Dostepna jest nowa wersja skryptu:\n\n'+script[0]+' v.'+script[1]+'\n\nChcesz przejsc do strony sciagania? (nowe okno)');
			if(go) {
				window.open(this.scripts);
			} else {
				this.createCookie('new-'+plik+'-notice','seen',1);
			}
		} else {
			this.createCookie('new-'+plik+'-notice',"",-1);
		}
	},
	//============= DEBUG =============//
	props: function(obj) {
		var x = '';
		for(prop in obj) {
			x += prop+' - '+(typeof obj[prop])+'\n';
		}
		alert(x);
	},
}
unsafeWindow.DT = DT;

//============= ODPALANE NA WSZYSTKICH STRONACH =============//
function update_float_cookie(obj) {
	attach = 'http://crashh.webd.pl/greasemonkey/img/attach.png';
	no_attach = 'http://crashh.webd.pl/greasemonkey/img/noattach.png';
	
	kuki = DT.readCookie('DT-floats');
	if(kuki) {
		float_menu = kuki.split('|')[0]==1?true:false;
		float_advisor = kuki.split('|')[1]==1?true:false;
	} else {
		float_menu = false;
		float_advisor = false;
	}
	
	if(obj.getAttribute('id') == 'advisor_attach') {
		DT.createCookie('DT-floats',(float_menu?1:0)+'|'+(!float_advisor?1:0),365);
		if(float_advisor) {
			obj.src = attach;
		} else {
			obj.src = no_attach;
		}
	} else if(obj.getAttribute('id') == 'menu_attach') {
		DT.createCookie('DT-floats',(!float_menu?1:0)+'|'+(float_advisor?1:0),365);
		if(float_menu) {
			obj.src = attach;
		} else {
			obj.src = no_attach;
		}
	}
}
function floating_objects(flag) {
	kuki = DT.readCookie('DT-floats');
	if(kuki) {
		float_menu = kuki.split('|')[0]==1?true:false;
		float_advisor = kuki.split('|')[1]==1?true:false;
	} else {
		float_menu = false;
		float_advisor = false;
	}
	new_bg = 'http://crashh.webd.pl/greasemonkey/img/sidebaradvisor.png';
	attach = 'http://crashh.webd.pl/greasemonkey/img/attach.png';
	no_attach = 'http://crashh.webd.pl/greasemonkey/img/noattach.png';
	
	header = document.getElementById('header');
	h1 = document.getElementById('header-nav');
	h2 = document.getElementById('header-subnav');
	advisor = document.getElementById('advisor');
	
	if(flag) {
		advisor.style.background = 'none';
		adv_content = advisor.getElementsByClassName('bottom')[0];
		adv_content.innerHTML = adv_content.innerHTML.replace(/<h4.*Advisor.*<\/h4>/i,'');
		adv_content.style.background = "transparent url('"+new_bg+"') repeat-y -322px 0px";
		adv_content.style.paddingTop = "0px";
		adv_content.style.paddingBottom = "0px";
		
		adv_content.getElementsByClassName('sbl-advisor')[0].style.paddingTop = "0px";
		adv_content.getElementsByClassName('sbl-time')[0].style.paddingBottom = "14px";
		
		var top = document.createElement('div');
			top.style.background = "transparent url('"+new_bg+"') no-repeat 0px 0px";
			top.style.height = "42px";
		var bottom = document.createElement('div');
			bottom.style.background = "transparent url('"+new_bg+"') no-repeat -161px bottom";
			bottom.style.height = "25px";
			//bottom.innerHTML = '<img src="'+(float_advisor?no_attach:attach)+'" alt="" title="Przypnij" id="advisor_attach" onclick="update_float_cookie(this);" />';
			bottom.innerHTML = '<div style="float: left; color: #fc6; font-family: verdana; font-size: 8px; padding: 1px 0px 0px 2px;"><img src="'+(float_advisor?no_attach:attach)+'" alt="" title="Przypnij" id="advisor_attach" onclick="update_float_cookie(this);" onmouseover="document.getElementById(\'advisor_attach_hint\').style.display=\'inline\';" onmouseout="document.getElementById(\'advisor_attach_hint\').style.display=\'none\';"/>&nbsp;&nbsp;<span style="display: none; background-color: rgba(0,0,0,0.4); padding: 2px 4px;" id="advisor_attach_hint">Przypnij doradc&#281;</span></div>';
		
			header.innerHTML = '<div style="float: left; color: #fc6; font-size: 8px; padding: 80px 0px 0px 2px;"><img src="'+(float_menu?no_attach:attach)+'" alt="" title="Przypnij" id="menu_attach" onclick="update_float_cookie(this);" onmouseover="document.getElementById(\'menu_attach_hint\').style.display=\'inline\';" onmouseout="document.getElementById(\'menu_attach_hint\').style.display=\'none\';"/>&nbsp;&nbsp;<span style="display: none; background-color: rgba(0,0,0,0.4); padding: 2px 4px;" id="menu_attach_hint">Przypnij menu nawigacyjne</span></div>'+header.innerHTML;
			
		advisor.appendChild(top);
		advisor.appendChild(adv_content);
		advisor.appendChild(bottom);
	}
	
	scroll =  window.pageYOffset;
	posY =  h1.offsetTop;	
	
	if ((scroll > 95 && float_menu) || (scroll > 153 && float_advisor)) {
		if(h1.style.position != 'fixed') {
			if(float_menu) {
				h1.style.position = 'fixed';
				h1.style.top = '0px';
				h1.style.width = '100%';
				h1.style.zIndex = '100';
				h2.style.position = 'fixed';
				h2.style.top = '33px';
				h2.style.width = '100%';
				h2.style.zIndex = '100';
			} else {
				if(h1.style.position != 'static') {
					h1.style.position = 'static';
					h1.style.top = '';
					h1.style.width = '100%';
					h1.style.zIndex = '100';
					h2.style.position = 'static';
					h2.style.top = '';
					h2.style.width = '100%';
					h2.style.zIndex = '100';
				}
			}
		}
		if(advisor.style.position != 'fixed') {
			if(float_advisor) {
				advisor.style.position = 'fixed';
				advisor.style.top = float_menu?'58px':'0px';
				advisor.style.zIndex = '100';
			} else {
				if(advisor.style.position != 'static') {
					advisor.style.position = 'static';
					advisor.style.top = '';
					advisor.style.zIndex = '100';
				}
			}
		}
	} else {
		if(h1.style.position != 'static') {
				h1.style.position = 'static';
				h1.style.top = '';
				h1.style.width = '100%';
				h1.style.zIndex = '100';
				h2.style.position = 'static';
				h2.style.top = '';
				h2.style.width = '100%';
				h2.style.zIndex = '100';
		}
		if(advisor.style.position != 'static') {
				advisor.style.position = 'static';
				advisor.style.top = '';
				advisor.style.zIndex = '100';
		}
	}
    setTimeout('floating_objects(0)', 10);
}
function hide_ads() {
	document.getElementById('wrap_right').style.width = "5px";
	document.getElementById('wrap_right_dn').style.width = "5px";
	
	var logout = document.getElementById('sidebar-right').getElementsByTagName('a')[0];
	logout.style.display = 'block';
	logout.style.width = '60px';
	logout.style.cssFloat = 'right';
	logout.style.margin = '-20px 0px 0px -60px';
	
	var elems = ['sidebar-banner','sidebar_img_right'];
	for(x in elems) {
		var elem = document.getElementById(elems[x])
		if(elem) elem.style.display="none";
	}
}
function redir_to_www() {
	var dom = document.domain
	if(dom == 'www.darkthrone.com') return;
	
	var cook = DT.readCookie('DT-bypassredir');
	
	if(cook === null)
		if(confirm('Czy chcesz włączyć przekierowanie \nz [http://'+dom+'/]\nna [http://www.darkthrone.com/] ?'))
			cook = DT.createCookie('DT-bypassredir','OFF',365);
		else
			cook = DT.createCookie('DT-bypassredir','ON',365);
	if(cook == 'ON') return
	
	var adres = window.location.href;
	var new_adres = adres.replace(/http:\/\/(gold\.)*darkthrone.com\//ig,'http://www.darkthrone.com/');
	if(adres != new_adres)
		window.location.href = new_adres;
}
function DT_funkcje() {
	redir_to_www();
	document.title = document.title.replace(/Dark Throne[-\s]*/i,'');
	var input;
	if(input = document.getElementById('amount')) input.focus();
	else if(input = document.getElementById('spies')) input.focus();
	else if(input = document.getElementById('turns')) input.focus();
	
	if(navigator.appName=="Opera"){
		flagg = false;

		var linkNodes = document.getElementsByTagName('link');
		for(x in linkNodes) {
			if(linkNodes[x].getAttribute('type') == 'text/css') {
				if(linkNodes[x].href.indexOf('/new/') != -1) {
					flagg = true;
					break;
				}
			}
		}
		if(flagg) {
			setTimeout('floating_objects(1)', 20);
		}
	}
	
	kuki = DT.readCookie('DT-Debug');
	if(kuki) {
		debug_win = window.open('','DT_DEBUGGER','height=500,width=300',true);
		debug_win.document.body.innerHTML = '';
		debug_win.document.title = 'DEBUGGER';
	}
	hide_ads();
}
//============= URUCHOMIENIE SKRYPTU =============//
DT_funkcje();
DT.version_check('a-funkcje.user.js',version);
