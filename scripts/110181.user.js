// ==UserScript==
// @name           VU_idomitas
// @version        3.31
// @namespace      vegzetur
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_deleteValue
// @include        http://*.vegzetur.hu/index.php*
// @include        http://*.vladcaosudu.sk/index.php*
// @include        http://*.doomlord.ru/index.php*
// @include        http://*.doomlord.eu/index.php*
// ==/UserScript==

var version = "3.31";
var minLE = 100;
var force_host_nyelv = -1; // Amennyiben fordító scriptet használsz és magyarul akarod, hogy működjön a script, állítsd át 0-ra.
var script_nyelv=0; // 0 - Magyar, 1 - Szlovák, 2 - Angol, 3 - Orosz, 4 - Francia
var host_nyelv=0; // 0 - Magyar, 1 - Szlovák, 2 - Angol, 3 - Orosz, 4 - Francia

// Nyelvi szövegek
var dis_1=['Van újabb idomítás verzió!\nHozzá tartozó lapot megnyitottam!', 'Existuje nová verzia krotenie!\nK tomu patriacu stránku som otvoril!'];
var dis_2=['Idomítás vége.', 'Koniec krotenia'];
var dis_3=['Folytatnám az idomítást, de $1 LE alatt vagy!', 'Tvoja DE na krotenie je menej ako $1 DE.'];
var dis_4=['Idomítás leállítása', 'Ukonči krotenie'];
var dis_5=['Idomítható állatok:', 'Zvieratá na krotenie:'];
var dis_6=['Összes állat', 'Všetky zvieratá'];
var dis_7=['Folyamatos idomítás', 'Začni nepretržité krotenie'];
var dis_8=['Idomítás folyamatban!', 'Prebieha krotenie!'];
var dis_9=['Idomítás beállítások', 'Nastavenia krotenia'];
var dis_10=['Mentés','Uložiť'];
var dis_11=['', ''];

// Kereső szövegek
var ker_1=['idomítás','krotenia'];
var ker_2=['Nem megfelel', 'Nevhodn'];
var ker_3=['Idomítottság', 'Stav skrotenia'];
var ker_4=['Idomítod', 'Krotíš'];
var ker_5=['', ''];
var ker_6=['', ''];
var ker_7=['', ''];
var ker_8=['', ''];


//Thnx to Jerikó a kóddarabért!
function GetUrl(method, url, data, callback){
  GM_xmlhttpRequest({
    method: method,
    url: url,
    data: data,
    headers: { 'Content-type':'application/x-www-form-urlencoded', },
    onload: callback
  });
}
function pad(n){return n<10 ? '0'+n : n};

var currentTime = new Date();
var month = currentTime.getMonth() + 1;
var day = currentTime.getDate();
var year = currentTime.getFullYear();
var today = ""+year+pad(month)+pad(day);

//var hostnev = strcut('//','',window.location.href).substring(0,strcut('//','',window.location.href).indexOf('/'));
var hostnev = window.location.hostname;
var orszag = hostnev.substring(hostnev.lastIndexOf('.')+1 ,hostnev.length);
if (force_host_nyelv == -1) {
	if (orszag == 'hu') {
		host_nyelv = 0;
	} else if (orszag == 'sk') {
		host_nyelv = 1;
	}else if (orszag == 'eu') {
		host_nyelv = 2;
	}else if (orszag == 'ru') {
		host_nyelv = 3;
	}else if (orszag == 'fr') {
		host_nyelv = 4;
	}
} else {
	host_nyelv = force_host_nyelv;
}
var vilag = strcut('//','.',window.location.href);
if (vilag == 'www' && orszag == 'hu') {vilag = 'vilag1';}
if (vilag == 'www' && orszag == 'sk') {vilag = 'svet1';}
if (vilag == 'www' && orszag == 'eu') {vilag = 'world1';}
if (vilag == 'www' && orszag == 'ru') {vilag = 'mir1';}
if (vilag == 'www' && orszag == 'fr') {vilag = 'monde1';}
script_nyelv = GM_getValue(vilag+"_nyelv",-1);
if (script_nyelv == -1) {
	script_nyelv = host_nyelv;
}
var ver_check = GM_getValue("ver_check",0);
if (today > ver_check) {
var url = 'http://userscripts.org/scripts/source/110181';
   GetUrl('GET', url, '', function (res) {
     pattern = /version\s+([\d\.]+)/img;
	 if (version != pattern.exec(res.responseText)[1]){
		GM_openInTab('http://userscripts.org/scripts/show/110181');
		alert (dis_1[script_nyelv]);
	 }	
   });
   GM_setValue("ver_check", today);
}

var now = (new Date()).getTime();
var namespace = 'idomitas';

function id(elem) {
	return document.getElementById(elem);
}

function tag(tagname) {
	return document.getElementsByTagName(tagname);
}
	
function getByClass(tag, classname) {
	items = [];
	elems = document.getElementsByTagName(tag);
	for (var i=0; i<elems.length; i++){
		if (elems[i].className==classname) items.push(elems[i]);
	}
	return items;
}

function getByClass2(where, tag, classname){
	items = [];
	elems = where.getElementsByTagName(tag);
	for (var i=0; i<elems.length; i++){
		if (elems[i].className==classname) {
			items.push(elems[i]);
		}
	}
	return items;
}

function strpos(needle, hay) { 
     if (!hay) return false; 
     return hay.indexOf(needle)!=-1;
}

function getFirstByClass(tag, classname) {
	items = getByClass(tag, classname);
	return items[0];
}

function strcut(from, to, str) {
	start = str.indexOf(from);
	if (to=='') {
		end = str.length;
	} else {
		end = str.indexOf(to);
	}
	return str.substring(start+from.length, end);
}

function click_idomit() {
	this.style.display='none';
	if (select[select.selectedIndex].value == 'Mind') {
		idomit = {
			url: select[select.selectedIndex+1].value,
			nextrun: 0,
			ok: true,
			mind: true,
			end: false
		};
	} else {
		idomit = {
			url: select[select.selectedIndex].value,
			nextrun: 0,
			ok: true,
			mind: false,
			end: false
		};
	}
	var sendurl = idomit.url;
	for (i=0; i<idomithatok.length; i++){
		if (idomithatok[i].url == idomit.url) {
			if (((idomithatok[i].maxLE - idomithatok[i].minLE) == idomithatok[i].idomLE) 
				&& idomit.mind ) {
				if (idomithatok[i+1] && idomithatok[i+1].url) {
					idomit.url = idomithatok[i+1].url;
				} else {
					idomit.ok = false;
					idomit.end = true;
				}
			}
			break;
		}
	}
	GM_setValue(vilag+'_idomit', idomit.toSource());
	if (LE>minLE){
		for (i=0; i<idomithatok.length; i++){
			if (idomithatok[i].url == idomit.url) {
				break;
			}
		}
		if (idomithatok[i].idomLE < LE) {
			//alert('AL1: '+sendurl);
			window.location.assign(sendurl);
		} else {
			setTimeout(windowReload,2000);
		}	
		//GM_xmlhttpRequest({method: 'GET', url: idomit.url});
	} else {
		setTimeout(windowReload,2000);
	}
}

function click_stop() {
	idomit = {
		url: idomit.url,
		nextrun: 0,
		ok: false,
		mind: false,
		end: false
	};
	GM_setValue(vilag+'_idomit', idomit.toSource());
	setTimeout(windowReload,2000);
}

function windowReload() {
window.location.reload();
}

function windowAssign(url) {
	//alert('AL2: '+url);
	window.location.assign(url);
}

allatpage = strpos('allatok',window.location.href);
idomit = eval(GM_getValue(vilag+'_idomit', '({ok: false, mind: false, end: false})'));

var matches = document.getElementById('karakter_le').innerHTML;
LE = matches.replace(/\./g,"");

if (strpos('szakertelmek',window.location.href)) {
	idomitas = 0;
	matches = document.body.innerHTML.match(new RegExp ('<tr class="link_sor" onmouseover="szakertelem_szoveg\\('+"'<strong>"+ker_1[host_nyelv]+'.*\n.*<td class="center">\(\\d+\)<span class="turbo">\\+\(\\d+\)<\\/span><\\/td>'));
	if (matches) {
		idomitas = parseInt(matches[1]) + parseInt(matches[2]);
	}
	matches = document.body.innerHTML.match(new RegExp ('<tr class="link_sor" onmouseover="szakertelem_szoveg\\('+"'<strong>"+ker_1[host_nyelv]+'.*\n.*<td class="center">\(\\d+\)<\\/td>'));
	if (matches) {
		idomitas = parseInt(matches[1]);
	}
	GM_setValue(vilag+"_idomitas", idomitas);
}

//intkedvLE = GM_getValue(vilag+"_idomítás",1)*100;
idomLE = GM_getValue(vilag+"_idomitas",1)*100;

/* Ez itt az adatgyűjtés. */
jobb = document.getElementById('jobb');
var allatok = [];
var idomithatok = [];
var tbody;
var frissidomitas = -1;
var idomtimer = 0;
if (allatpage) {
	allatok = getByClass2(jobb, 'div', 'allatok')[0];
	var taglista = allatok.getElementsByTagName('td');
	for (i in taglista) {
		if (taglista[i].innerHTML == ker_3[host_nyelv]) {
			tbody = taglista[i].parentNode.parentNode;
			break;
		}
	}
	if (tbody && tbody.childNodes.length > 0) {
		for (i=0; i<tbody.childNodes.length; i++){
			if (tbody.childNodes[i].className) { continue; }
			var idomitLE = -1;
			var lhref = null;
			var ltimer = null;
			var timeto = -1;
			var timerstring = "";
			if (tbody.childNodes[i].childNodes[3].childNodes[0] && tbody.childNodes[i].childNodes[3].innerHTML.match('onclick=')) {
				idomitLE = parseInt(tbody.childNodes[i].childNodes[3].innerHTML.match(/onclick=".*/)[0].match(/([\d\.]+)/)[1].replace(/\./g,""));
				lhref = tbody.childNodes[i].childNodes[3].childNodes[0].href;
			} else if (tbody.childNodes[i].childNodes[3].childNodes[0] && tbody.childNodes[i].childNodes[3].childNodes[0].childNodes[1]) {
				timerstring = tbody.childNodes[i].childNodes[3].childNodes[0].childNodes[2].textContent;
				timeto = (parseInt(timerstring.split(':')[0]*60)+parseInt(timerstring.split(':')[1]));
			}
			egyallat = {
				url: lhref,
				minLE: parseInt(tbody.childNodes[i].childNodes[2].childNodes[0].childNodes[2].innerHTML.match(/^([\d\.]+)\s/)[1].replace(/\./g,"")),
				maxLE: parseInt(tbody.childNodes[i].childNodes[2].childNodes[0].childNodes[2].innerHTML.match(/\/\s([\d\.]+)/)[1].replace(/\./g,"")),
				idomLE: idomitLE,
				nev: tbody.childNodes[i].childNodes[1].innerHTML,
				timer: timeto
			};
			//alert(egyallat.toSource());
			idomithatok.push(egyallat);
		}
		//alert(allatok.childNodes[0].innerHTML);
		if (allatok.childNodes[0] && allatok.childNodes[0].className && 
		    allatok.childNodes[0].className == "success" && allatok.childNodes[0].innerHTML.match(/[\d\.]+/) &&
		    allatok.childNodes[0].innerHTML.match(ker_4[host_nyelv])) {
			frissidomitas = parseInt(allatok.childNodes[0].innerHTML.match(/([\d\.]+)/)[1].replace(/\./g,""));
			for (i=0; i<idomithatok.length; i++) {
				if (idomithatok[i].timer > 0) {
					idomtimer = Math.ceil(idomithatok[i].timer / 60) * 60;
					break;
				}
			}
			idomit.nextrun = now+idomtimer*1000;
			if (idomithatok[i].maxLE - idomithatok[i].minLE == frissidomitas) {
				idomit.url = idomit.url.substring(0,idomit.url.indexOf('&'));
			}
			GM_setValue(vilag+'_idomit', idomit.toSource());
			reload = (idomtimer+Math.round(Math.random()*7))*1000;			
			setTimeout(windowReload,reload);
			//alert('Friss: '+frissidomitas+', timer: '+idomtimer+', reload: '+reload);
		}
	}
}

/* Bárhol vagyok, érzékeljük az idomítás végét. */
if (idomit.ok && idomit.nextrun<now && LE>minLE && LE>=idomLE && !allatpage && !GM_getValue(vilag+"_nyilik", false)){
	GM_setValue(vilag+"_nyilik", true);
	GM_openInTab(idomit.url);
}

if (idomit.ok && strpos(ker_2[host_nyelv],document.body.innerHTML)) {
	idomit.ok = false;
	GM_setValue(vilag+'_idomit', idomit.toSource());
	GM_deleteValue(vilag+'_idomit');
	alert(dis_2[script_nyelv]);
}

if (idomit.end && allatpage && idomithatok.length > 0 && idomithatok[0].url) {
	idomit.ok = false;
	idomit.end = false;
	GM_setValue(vilag+'_idomit', idomit.toSource());
	GM_deleteValue(vilag+'_idomit');
	alert(dis_2[script_nyelv]);
}

if ((idomit.ok || idomit.end) && allatpage && idomithatok.length == 0) {
	idomit.ok = false;
	idomit.end = false;
	GM_setValue(vilag+'_idomit', idomit.toSource());
	GM_deleteValue(vilag+'_idomit');
	alert(dis_2[script_nyelv]);
}	

/* Mi a következő idomítandó? */
if (idomit.ok && allatpage && idomithatok.length > 0 && idomithatok[0].url) {
	var found = false;
	for (i=0; i<idomithatok.length; i++){
		if (idomithatok[i].url == idomit.url) {
			found = true;
			break;
		}
	}
	if (!found && !idomit.mind) {
		idomit.ok = false;
		GM_setValue(vilag+'_idomit', idomit.toSource());
		GM_deleteValue(vilag+'_idomit');
		alert(dis_2[script_nyelv]);
	}
	if (!found && idomit.mind) {
		idomit.url = idomithatok[0].url;
		idomit.nextrun = 0;
		GM_setValue(vilag+'_idomit', idomit.toSource());
		setTimeout(windowAssign,2000+Math.round(Math.random()*7)*1000, idomit.url);
	}
	var sendurl = idomit.url;
	if (idomit.ok && found) {
		if (idomit.mind) {
			if ((idomithatok[i].maxLE - idomithatok[i].minLE) == idomithatok[i].idomLE) {
				if (idomithatok[i+1] && idomithatok[i+1].url) {
					idomit.url = idomithatok[i+1].url;
					idomit.nextrun = 0;
					GM_setValue(vilag+'_idomit', idomit.toSource());
				} else {
					idomit.ok = false;
					idomit.end = true;
					GM_setValue(vilag+'_idomit', idomit.toSource());
				}
			}
		} else {
			if ((idomithatok[i].maxLE - idomithatok[i].minLE) == idomithatok[i].idomLE) {
				idomit.ok = false;
				idomit.end = true;
				GM_setValue(vilag+'_idomit', idomit.toSource());
			}
		}
		setTimeout(windowAssign,2000+Math.round(Math.random()*7)*1000, sendurl);
	}
}

/* force reload */
if (allatpage && idomithatok.length > 0 && idomithatok[0].url == null && idomtimer == 0) {
	for (i=0; i<idomithatok.length; i++) {
		if (idomithatok[i].timer > 0) {
			reload = (idomithatok[i].timer+Math.round(Math.random()*7))*1000;			
			setTimeout(windowReload,reload);
			//alert('AL3: '+reload);
			break;
		}
	}
}

/* Ez itt a képernyő design. */
if (allatpage) {
	if (idomithatok.length > 0) {
		// Van idomítandó
		div = document.createElement('div'); 
		div.className = "message_center";
		span = document.createElement('span'); 

		if (idomithatok[0].url) {
			// Nincs idomítás
			if (idomit.ok && LE<minLE){
				span.innerHTML = dis_3[script_nyelv].replace('$1', minLE);
				div.appendChild(span);
				a = document.createElement('a'); 
				a.addEventListener('click', click_stop, true);
				a.className='gomblink';
				a.setAttribute('style','margin-top: 10px; cursor: pointer');
				div.appendChild(a);
				aspan = document.createElement('span'); 
				aspan.innerHTML = dis_4[script_nyelv];
				a.appendChild(aspan);
			}	else {
				if (!idomit.ok && !idomit.end) {
					span.innerHTML = dis_5[script_nyelv];
					div.appendChild(span);
		
					form = document.createElement('form');
					form.setAttribute('style','display: inline');
					div.appendChild(form);
		
					select = document.createElement('select');
					form.appendChild(select);
		
					if (idomithatok.length>1) {
						option = document.createElement('option');
						option.value='Mind';
						option.innerHTML=dis_6[script_nyelv];
						select.appendChild(option);
					}
					for (i=0; i<idomithatok.length; i++){
						option = document.createElement('option');
						option.value=idomithatok[i].url;
						option.innerHTML=idomithatok[i].nev;
						select.appendChild(option);
					}
				}
				if (!idomit.ok) {
					a = document.createElement('a'); 
					a.addEventListener('click', click_idomit, true);
					a.className='gomblink';
					a.setAttribute('style','margin-top: 10px; cursor: pointer; width: 250px');
					div.appendChild(a);
					aspan = document.createElement('span'); 
					aspan.innerHTML = dis_7[script_nyelv];
					a.appendChild(aspan);
				}
				if (idomit.ok) {
					a = document.createElement('a'); 
					a.addEventListener('click', click_stop, true);
					a.className='gomblink';
					a.setAttribute('style','margin-top: 10px; cursor: pointer');
					div.appendChild(a);
					aspan = document.createElement('span'); 
					aspan.innerHTML = dis_4[script_nyelv];
					a.appendChild(aspan);
				}
			}
		} else {
			// Van idomítás
			span.innerHTML = dis_8[script_nyelv];
			div.appendChild(span);
			if (idomit.ok) {
				a = document.createElement('a'); 
				a.addEventListener('click', click_stop, true);
				a.className='gomblink';
				a.setAttribute('style','margin-top: 10px; cursor: pointer');
				div.appendChild(a);
				aspan = document.createElement('span'); 
				aspan.innerHTML = dis_4[script_nyelv];
				a.appendChild(aspan);
			}
		}
		getFirstByClass('div', 'allatok').insertBefore(div, getFirstByClass('div', 'text'));
	}
}
//  MENÜ FUNKCIÓK

function configure(){
	window.scrollBy(0,150);
	style = document.createElement('style');
	style.innerHTML = '#idomitaslayer {display: block; opacity: .85; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background-color: #202; z-index: 9; text-align: center;} #idomitaslayer div {background-color: #101; text-align: left; padding: 20px; border: double gray 4px; position: relative; top: 5%; margin-right: auto; margin-left: auto; width: 730px;} #idomitaslayer h1 {margin: 25px} #idomitaslayer label {width: 100px; display: block; float: left; line-height: 20px;} #idomitaslayer input {float: left; width: 30px; margin: 3px 0px;} #idomitaslayer br {clear: both} #idomitaslayer #bezaras {cursor: pointer; position: absolute; right: 0px; top: -2px; width: 20px; height: 20px; border: solid gray 1px; line-height: 20px; background-color: #d00; color: silver} .testreszab {cursor: pointer}';
	document.getElementsByTagName('body')[0].appendChild(style);

	idomitaslayer = document.createElement('div');
	idomitaslayer.id = 'idomitaslayer';
	idomitaslayer.style.overflow='auto';
	belsodiv = document.createElement('div');
	cim = document.createElement('h2');
	cim.innerHTML = dis_9[script_nyelv];
		
	document.getElementsByTagName('body')[0].appendChild(idomitaslayer);
	idomitaslayer.appendChild(belsodiv);
	belsodiv.appendChild(cim);
	
	chval = ' checked="checked" ';
	belsodiv.innerHTML += '<P><TABLE WIDTH=100%><TR><TD WIDTH=25% ALIGN=center><input type="radio" name="script_nyelv" value="0"'+(script_nyelv == 0 ? ' checked':'')+' id="langhu_csekk"> Magyar </TD><TD WIDTH=25% ALIGN=center><input type="radio" name="script_nyelv" value="1"'+(script_nyelv == 1 ? ' checked':'')+' id="langsk_csekk"> Slovenský </TD><TD WIDTH=25% ALIGN=center><input type="radio" name="script_nyelv" value="2"'+(script_nyelv == 2 ? ' checked':'')+' id="langen_csekk"> English </TD><TD WIDTH=25% ALIGN=center><input type="radio" name="script_nyelv" value="3"'+(script_nyelv == 3 ? ' checked':'')+' id="langru_csekk"> русский </TD></TR>'; 

	bezargomb = document.createElement('input');
	bezargomb.type = 'button';
	bezargomb.value = 'X';
	bezargomb.title = dis_10[script_nyelv];
	bezargomb.id = 'bezaras';
	bezargomb.addEventListener('click',function(){
		idomitaslayer.style.display='none';
		if (document.getElementById('langhu_csekk').checked) {
			script_nyelv = 0;
		} else if (document.getElementById('langsk_csekk').checked) {
			script_nyelv = 1;
		} if (document.getElementById('langen_csekk').checked) {
			script_nyelv = 2;
		} if (document.getElementById('langru_csekk').checked) {
			script_nyelv = 3;
		} 
		
		GM_setValue(vilag+"_nyelv", script_nyelv);
		window.location.reload();
	}, false);
	belsodiv.appendChild(bezargomb);
}

GM_registerMenuCommand(dis_9[script_nyelv], configure);

GM_deleteValue(vilag+'_nyilik');
