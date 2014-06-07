// ==UserScript==
// @name           vu_portya_elemzo
// @namespace      vegzetur
// @version        3.21
// @include        http://*.vegzetur.hu/index.php?m=csataleiras*
// @include        http://*.vegzetur.hu/index.php?m=eddigi_csatak*
// @include		   http://*.vegzetur.hu/index.php?m=nyilvanos_csataleiras*
// @include		   http://*.vegzetur.hu/index.php?m=szovetseg&sub=tamadasok&csata*
// ==/UserScript==

var version = "3.21";

var ver_check = GM_getValue("ver_check",0);
var now = Math.floor(new Date().getTime()/1000/3600/24);

//Thnx to Jerikó a kóddarabért!
if (now > ver_check) {
var url = 'http://userscripts.org/scripts/source/90864';
   GetUrl('GET', url, '', function (res) {
     pattern = /version\s+([\d\.]+)/img;
	 if (version != pattern.exec(res.responseText)[1]){
		GM_openInTab('http://userscripts.org/scripts/show/90864');
		alert ("Van újabb portya elemző verzió!\nHozzá tartozó lapot megnyitottam!");
	 }	
   });
   GM_setValue("ver_check", Math.round(now));
}

function GetUrl(method, url, data, callback){
  GM_xmlhttpRequest({
    method: method,
    url: url,
    data: data,
    headers: { 'Content-type':'application/x-www-form-urlencoded', },
    onload: callback
  });
}

function id(elem){
	return document.getElementById(elem);
}

var username = id('welcome').getElementsByTagName('strong')[0].innerHTML;
var drain = 0;
var spans = document.getElementsByTagName( "span" );


for ( var i = 0; i < spans.length; i++ ) {
	if ( spans[i].getAttribute( "class" ) == "drain" ) {
		drain += parseInt( spans[i].innerHTML.replace( /.*?([+-]\d+) .*/, "$1" ));
	}
}

if ( drain != 0 ) {
	var divs = document.getElementsByTagName( "div" );
	for ( var i = 0; i < divs.length; i++ ) {
		if ((( divs[i].getAttribute( "class" ) == "result_win" ) || ( divs[i].getAttribute( "class" ) == "result_loss" ))){
		divs[i].innerHTML = divs[i].innerHTML.replace(/\([+-]\d+\)/g,"");
		divs[i].innerHTML = divs[i].innerHTML.replace( /(.*? \d+) (.*)/, "$1 (" + ( drain > 0 ? "+" : "" ) + drain + ") $2" );
		}
	}
}


function getByClass(tag, classname){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].className==classname) {
			items.push(elems[i]);
		}
	}
	return items;
}

le = 0;
vle = 0;
tp = 0;
portyak = 0;
vportyak = 0;
portyaszam = 0;

if(strpos('eddigi_csatak',window.location.href)){
lista = document.getElementById('csatalistaform').innerHTML;
portyak = lista.match(/A jutalmad \d+ lélekenergia és \d+ TP./g);
vportyak = lista.match(/Elszívott tőled \d+ lélekenergiát./g);

if (portyak){
	portyaszam += portyak.length;
	for (i=0; i<portyak.length; i++){
		szoveg = portyak[i].split(' ');
		le += parseInt(szoveg[2]);
		tp += parseInt(szoveg[5]);
	}
}	

if (vportyak){
	portyaszam += vportyak.length;
	for (i=0; i<vportyak.length; i++){
	szoveg = vportyak[i].split(' ');
	vle -= parseInt(szoveg[2]);
	}
}
}

function getFirstByClass(tag, classname){
	items = getByClass(tag, classname);
	return items[0];
}

function strpos(needle, hay){
	return hay.indexOf(needle)!=-1;
}

function getCsata(href){
	var leszivas = '';
	var csata_id = href.substring(href.indexOf("csata=")+6);
	for (var i=0; i<csatak.length; i++){
		if (parseInt(csatak[i].id) == parseInt(csata_id)) {
			leszivas = csatak[i].le;
			break;
		}
	}
	return leszivas;
}

function getCsataTargy(href){
	var targy = '';
	var csata_id = href.substring(href.indexOf("csata=")+6);
	for (var i=0; i<targyak.length; i++){
		if (parseInt(targyak[i].id) == parseInt(csata_id)) {
			targy = targyak[i].targy;
			break;
		}
	}
	return targy;
}

var now = new Date().getTime()/1000;
var csata_id = window.location.href.substring(window.location.href.indexOf("csata=")+6);
var csatak = eval(GM_getValue("csatak",[]));
var targyak = eval(GM_getValue("targyak",[]));
var leszivas = false;
var targy = false;

if (getByClass('div','result_win').length>0){
	leszivas = getFirstByClass('div','result_win').textContent.match(/\([+-]\d+\)/g);
	if(strpos('tipus=terkapu',window.location.href) || strpos('csataleiras&csata=',window.location.href)){
		uzik = getByClass('div','message_center');
		for (i=0; i<uzik.length; i++){
			if(uzik[i].innerHTML.match('Az ellenfelednél kincset találtál:')){
				targy = uzik[i].innerHTML.replace('Az ellenfelednél kincset találtál: ','').replace('!','');
				if(targy.match('1 aranydukát')){
					targy = 'aranydukát';
				}
			}
		}
	}
}

if (getByClass('div','result_loss').length>0){
	leszivas = getFirstByClass('div','result_loss').textContent.match(/\([+-]\d+\)/g);
}

if (leszivas) csatak.push({
	id: parseInt(csata_id),
	le: leszivas,
	ido: now
});

if (targy) targyak.push({
	id: parseInt(csata_id),
	targy: targy,
	ido: now
});

sordrain = 0;
lapdrain = 0;
pp=0;
if (getByClass('table','csatalista').length>0){
	csatalista = getFirstByClass('table','csatalista');
	sorok = csatalista.getElementsByTagName('tr');
	for (i=2; i<sorok.length; i++){
		if (strpos('csata=',sorok[i].innerHTML)){
			sorok[i].childNodes[5].innerHTML = sorok[i].childNodes[5].innerHTML.replace('lélekenergi', getCsata(sorok[i].childNodes[0].childNodes[0].href) + ' lélekenergi').replace('TP.',  'TP.<BR><font style="color: orange">' + getCsataTargy(sorok[i].childNodes[0].childNodes[0].href) + '</font>');;
			if (sorok[i].childNodes[3].innerHTML==username){pp++}
			if (getCsata(sorok[i].childNodes[0].childNodes[0].href)){
				sordrain = getCsata(sorok[i].childNodes[0].childNodes[0].href);
				sordrain = sordrain.toString().replace('(','');
				sordrain = sordrain.toString().replace(')','');
				lapdrain += parseInt(sordrain);
			}
		}
	}
}

if (csatak.length>300) csatak.splice(0, csatak.length-300);
GM_setValue("csatak",csatak.toSource());

if (targyak.length>50) targyak.splice(0, targyak.length-50);
GM_setValue("targyak",targyak.toSource());

scriptbox = document.createElement('div');

if(!strpos('baratsagos',window.location.href) && !strpos('csataleiras',window.location.href) && !strpos('epikus',window.location.href) && !strpos('arena',window.location.href) && !strpos('viadalok',window.location.href)){
	scriptbox.setAttribute('class', 'message_center');
	scriptbox.setAttribute('style', 'margin: 5px;');
	if(strpos('eddigi_csatak',window.location.href) || strpos('eddigi_csatak&sub=terkapu',window.location.href) && !strpos('eddigi_csatak&sub=terkapu',window.location.href) && !strpos('eddigi_csatak&sub=portya',window.location.href)){
	scriptbox.innerHTML += 'Össz: &nbsp;&nbsp;<font color="#0f0">'+(le+lapdrain+vle)+'</font> LE és &nbsp;&nbsp;<font color="#0f0">'+tp+'</font> TP;&nbsp;&nbsp; Ebből lélekszívás: &nbsp;&nbsp;<font color="#0f0">'+lapdrain+'</font> LE;&nbsp;&nbsp; Eredmény: &nbsp;&nbsp;<font color="#0f0">'+Math.round((le+vle+lapdrain)/tp*10)/10+'</font> LE/TP';
	}
	if(strpos('eddigi_csatak&sub=portya',window.location.href)){
	scriptbox.innerHTML += '<hr />Portya LE/csata: &nbsp;&nbsp;<font color="#0f0">'+Math.round((le+vle)/portyaszam*10)/10+'</font> LE;&nbsp;&nbsp; Lélekszívás/csata: &nbsp;&nbsp;<font color="#0f0">'+Math.round(lapdrain/(portyaszam)*10)/10+'</font> LE;&nbsp;&nbsp; Eredmény: &nbsp;&nbsp;<font color="#0f0">'+Math.round((le+vle+lapdrain)/pp*10)/10+'</font> LE/PP';
	}	
}	

jobb_content = getByClass('div','jobb_content')[getByClass('div','jobb_content').length-1];
jobb_content.insertBefore(scriptbox, jobb_content.firstChild) ;