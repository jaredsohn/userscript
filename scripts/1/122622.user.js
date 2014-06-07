// ==UserScript==
// @name           VU_Terkapu
// @namespace      vegzetur
// @version        1.33
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @include        http://*.vegzetur.hu/index.php?m=szovetseg&sub=terkapu*
// @include        http://*.vegzetur.hu/index.php?m=karakterlap*
// @include        http://*.vegzetur.hu/index.php
// @include        http://*.vegzetur.hu/index.php?m=csataleiras&csata=*
// @include        http://*.vladcaosudu.sk/index.php?m=szovetseg&sub=terkapu*
// @include        http://*.vladcaosudu.sk/index.php?m=karakterlap*
// @include        http://*.vladcaosudu.sk/index.php
// @include        http://*.vladcaosudu.sk/index.php?m=csataleiras&csata=*
// @include        http://*.doomlord.ru/index.php?m=szovetseg&sub=terkapu*
// @include        http://*.doomlord.ru/index.php?m=karakterlap*
// @include        http://*.doomlord.ru/index.php
// @include        http://*.doomlord.ru/index.php?m=csataleiras&csata=*
// @include        http://*.doomlord.eu/index.php?m=szovetseg&sub=terkapu*
// @include        http://*.doomlord.eu/index.php?m=karakterlap*
// @include        http://*.doomlord.eu/index.php
// @include        http://*.doomlord.eu/index.php?m=csataleiras&csata=*
// ==/UserScript==

var version = "1.33";

var ver_check = GM_getValue("ver_check",0);
var now = Math.floor(new Date().getTime()/1000/3600/24);
var force_host_nyelv = -1; // Amennyiben fordító scriptet használsz és magyarul akarod, hogy működjön a script, állítsd át 0-ra.

// Nyelvi szövegek
	var script_nyelv=0; // 0 - Magyar, 1 - Szlovák, 2 - Angol, 3 - Orosz, 4 - Francia
	
	var dis_1=['Van újabb térkapu script verzió!\nHozzá tartozó lapot megnyitottam!','Existuje nová verzia scriptu časopriestorovej brány!\nK tomu patriacu stránku som otvoril!'];
	var dis_2=['A megadott feltételeknek megfelelően végzet a script!\n$1 csatában $2 tárgyat találtál!','Script ukončil činnosť podľa zadaných kritérií!\nNašiel si $2 predmetov a použil si $1 bodov časopriestorovej brány.'];
	var dis_3=['A script még $1 alkalommal , vagy $2 tárgyig térkapuzik.','Vstúp do časopriestorovej brány $1 krát alebo kým nenájdeš $2 predmetov.'];
	var dis_4=['Közben őskő, majd csp felhasználásával gyorsít 2-5 másodpercenként!','Popritom pomocou prakameňov, potom pomocou AB zrýchli každých 2-5 sekúnd!'];
	var dis_5=['Közben csp felhasználásával gyorsít 2-5 másodpercenként!','Popritom pomocou AB zrýchli každých 2-5 sekúnd!'];
	var dis_6=['Közben őskő felhasználásával gyorsít 2-5 másodpercenként!','Popritom pomocou prakameňov zrýchli každých 2-5 sekúnd!'];
	var dis_7=['Valamint ha csata előtt életpontod $1% alatt van, úgy $2 felhasználásával gyógyít!','Ak máš pred súbojom menej ako $1% HP, použiješ liečivý nápoj $2.'];
	var dis_8=['Sajnos elfogyott a $1 készleted, így a script leáll!','Je nám ľúto, vybehol tvoj $1 sklad, script skončí!'];
	var dis_9=['Sajnos elfogytak a térkapu pontjid, így a script leáll!','Je nám ľúto, tvoje časobránové body vybehli, script skončí!'];
	var dis_10=[' ','Vstúp do časopriestorovej brány '];
	var dis_11=[' alkalommal vagy ',' krát alebo kým nenájdeš '];
	var dis_12=[' tárgyig térkapuzok, és ',' predmetov. Ak máš pred súbojom menej ako '];
 	var dis_13=[' iszok ',' % HP, použiješ liečivý nápoj '];
 	var dis_14=[' % ÉP alatt!',' '];
	var dis_15=[' Őskőből gyorsítok, valamint ',' Zrýchlujem z prakameňov a '];
	var dis_16=[' CSP-ből, ha hijján vagyok/elfogy.',' z AB, ak nemám dostatok.'];
	var dis_17=['START','ŠTART'];
	var dis_18=['STOP','STOP'];
	var dis_19=['nem','nič'];
	var dis_20=['$1 csatában $2 tárgyat találtál!','Našiel si $2 predmetov v $1 subojoch.'];
	var dis_21=['Teljesült egy küldetés, leáll a script.','Úloha bola splnená, skript končí.'];
	var dis_22=['Térkapu beállítások','Nastavenie Časopriestorovej brány'];
	var dis_23=['',''];
	var dis_24=['',''];

// Kereső szövegek
	var host_nyelv=0; // 0 - Magyar, 1 - Szlovák

	var ker_1=['Gyógyitalok','Liečivé nápoje'];
	var ker_2=['térkapu pontod van','Počet bodov do časopriestorovej brány'];
	var ker_3=['múlva használhatod','Ešte musí uplynúť'];
	var ker_4=['Belépés a térkapuba','Vstup do časopriestorovej brány'];
	var ker_5=['ÉP-d 15% alatt v','lebo máš menej života ako 15%'];
	var ker_6=['1/3 őskőért aktiválom, és belépek a térkapuba','Použijem 1/3 prakameňov na vstup do časopriestorovej brány'];
	var ker_7=['1 cselekvéspontért aktiválom, és belépek a térkapuba','Použijem 1 akčný bod na vstup do časopriestorovej brány'];
	var ker_8=['Az ellenfelednél kincset','U tvojho protivníka si našiel poklad'];
//	var ker_9=['Tárgylista - ','Inventár predmetov - '];
	var ker_10=['Megittad a gyógyitalt, gyógyultál','Vypil si liečivý nápoj, uzdravil si'];
	var ker_11=['',''];
	var ker_12=['',''];

function GetUrl(method, url, data, callback){
  GM_xmlhttpRequest({
    method: method,
    url: url,
    data: data,
    headers: { 'Content-type':'application/x-www-form-urlencoded', },
    onload: callback
  });
}

function getFirstByClass(tag, classname){
	items = getByClass(tag, classname);
	return items[0];
}

function getByClass(tag, classname){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
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

function strcut(from, to, str){
	start = str.indexOf(from);
	if (to=='') {
		end = str.length;
	} else {
		end = str.indexOf(to);
	}
	return str.substring(start+from.length, end);
}

function strpos(needle, hay){
	return hay.indexOf(needle)!=-1;
}

function id(elem){
	return document.getElementById(elem);
}

var hostnev = strcut('//','',window.location.href).substring(0,strcut('//','',window.location.href).indexOf('/'));
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
var username = id('welcome').getElementsByTagName('strong')[0].innerHTML;
var vilag = strcut('//','.',window.location.href);
if (vilag == 'www' && orszag == 'hu') {vilag = 'vilag1';}
if (vilag == 'www' && orszag == 'sk') {vilag = 'svet1';}
if (vilag == 'www' && orszag == 'eu') {vilag = 'world1';}
if (vilag == 'www' && orszag == 'ru') {vilag = 'mir1';}
if (vilag == 'www' && orszag == 'fr') {vilag = 'monde1';}
azonosito = vilag + "_" + username;
var start = GM_getValue(azonosito+"_start",false);
var kuldetes = GM_getValue(azonosito+"_kuldetes",true);
script_nyelv = GM_getValue(azonosito+"_nyelv",-1);
if (script_nyelv == -1) {
	script_nyelv = host_nyelv;
}
var tkoldalrol = GM_getValue(azonosito+"_tkoldalrol",false);

//Thnx to Jerikó a kóddarabért!
if (now > ver_check) {
var url = 'http://userscripts.org/scripts/source/122622';
   GetUrl('GET', url, '', function (res) {
     pattern = /version\s+([\d\.]+)/img;
	 if (version != pattern.exec(res.responseText)[1]){
		GM_openInTab('http://userscripts.org/scripts/show/122622');
		alert (dis_1[script_nyelv]);
	 }	
   });
   GM_setValue("ver_check", Math.round(now));
}

//if ((document.title.indexOf(username)>-1) && !strpos(ker_9[host_nyelv],id('header').textContent)) {
if (strpos('karakterlap',window.location.href)) {
	maxok = getByClass('span','csik_szoveg');
	if (maxok && maxok.length > 0) {
		maxe = maxok[0].textContent.match(/\/ [\.\d]+/g);
		maxep = parseInt(maxe[0].substring(2).replace( /\./, "" ));
		GM_setValue(azonosito+"_maxep", maxep);
	}
}

function tlink(){
	window.location.href = 'http://'+hostnev+'/index.php?m=szovetseg&sub=terkapu';
}	

var kategoria, divek, targylistak;
if(strpos('targylista',window.location.href)){
	targylistak = getByClass('div','targylista_tipus');
		for (i=0; i<targylistak.length; i++){
			divek = targylistak[i].getElementsByTagName('div');
			kategoria = getByClass2(targylistak[i],'div', 'h4_out')[0];
			if (kategoria && divek.length>1 && ker_1.indexOf(kategoria.textContent) >= 0){ 
				var gyogyitalok = [];
				gyogyitalok.push({db: 0, nev: dis_19[script_nyelv], id: '0'});
				for (j=1; j<divek.length; j++){
					matches = divek[j].innerHTML.match(/\d+ \w+ (.*)/);
					id = divek[j].innerHTML.match(/targy_over\((\d+)\)/)[1];
					if (matches && matches.length > 1) {
						nev = divek[j].innerHTML.match(/\d+ \w+ (.*)/)[1];
						db = divek[j].innerHTML.match(/(\d+)/)[1];
					} else {
						db = 1;
						nev = divek[j].innerHTML;
					}
					gyogyitalok.push({db: db, nev: nev, id: id}); 
				}				
				GM_setValue(azonosito+"_gyogyitalok",gyogyitalok.toSource());
			}
		}
}


function click_start(){
	etosko = document.getElementById('etosko_csekk').checked;
	GM_setValue(azonosito+"_etosko", etosko);
	etcsp = document.getElementById('etcsp_csekk').checked;
	GM_setValue(azonosito+"_etcsp", etcsp);
	etalkalom = document.getElementById('etalkalom').value;
	GM_setValue(azonosito+"_etalkalom", etalkalom);
	GM_setValue(azonosito+"_etalkalomnum", 0);
	ettargy = document.getElementById('ettargy').value;
	GM_setValue(azonosito+"_ettargy", ettargy);
	GM_setValue(azonosito+"_ettargynum", 0);
	etital = document.getElementById('etital').value;
	GM_setValue(azonosito+"_etital", etital);
	etszazalek = document.getElementById('etszazalek').value;
	GM_setValue(azonosito+"_etszazalek", etszazalek);
	GM_setValue(azonosito+"_start", true);
	window.location.href = window.location.href;
}

function csplink(){
	window.location.href = "http://"+hostnev+"/index.php?m=szovetseg&sub=terkapu&tev=ujrahasznal_cselekvespont";
}

function kolink(){
	window.location.href = "http://"+hostnev+"/index.php?m=szovetseg&sub=terkapu&tev=ujrahasznal_osko";
}

function click_stop(){
	GM_setValue(azonosito+"_start", false);
	window.location.href = window.location.href;
}

var etosko = GM_getValue(azonosito+"_etosko",false);
var etcsp = GM_getValue(azonosito+"_etcsp",false);
var etalkalom = GM_getValue(azonosito+"_etalkalom",0);
var etalkalomnum = GM_getValue(azonosito+"_etalkalomnum",0);
var ettargy = GM_getValue(azonosito+"_ettargy",0);
var ettargynum = GM_getValue(azonosito+"_ettargynum",0);
var etital = GM_getValue(azonosito+"_etital",0);
var etszazalek = GM_getValue(azonosito+"_etszazalek",15);
var tkp = 0;

function eplink(){
	GM_setValue(azonosito+"_tkoldalrol", true);
	window.location.href = "http://"+hostnev+"/index.php?m=karakterlap&sub=targylista&tev=visel&targy="+etital;
}

function tklink(){
	window.location.href = window.location.href+"&tev=terkapu_belepes";
}

if ((etalkalom==0 || ettargy==0) && start) {
	GM_setValue(azonosito+"_start", false); 
	alert((dis_2[script_nyelv]).replace('$1', etalkalomnum).replace('$2', ettargynum));
} 

start = GM_getValue(azonosito+"_start",false);
uzik = getByClass('div','message_center');
for (i=0; i<uzik.length; i++){
	if (uzik[i].innerHTML.match(ker_2[host_nyelv])){
		tkp = parseInt(uzik[i].innerHTML.match(/(\d+)/)[1]);
	}
}

if (strpos('terkapu',window.location.href) && start && !strpos('csataleiras',window.location.href)){
	var ido=0;
	for (i=0; i<uzik.length; i++){
		if (uzik[i].innerHTML.match(ker_3[host_nyelv])){
			timercontent = uzik[i].getElementsByTagName("span")[0].textContent;
			ido = (parseInt(timercontent.split(':')[0])*60+parseInt(timercontent.split(':')[1]));
		}	
	}
	if (ido>15*60){
		setTimeout('window.location.reload(true)',10*60*1000+Math.round(Math.random()*180000));
	}
	div = document.createElement('div'); 
	div.className = "message_center";
	form = document.createElement('form');
	form.setAttribute('style','display: inline');
	div.appendChild(form);
	szoveg1 = document.createElement('szoveg1'); 
	dis_3[script_nyelv]
	szoveg1.innerHTML = (dis_3[script_nyelv]).replace('$1',etalkalom).replace('$2',ettargy);
	if(etosko && etcsp){szoveg1.innerHTML += '<BR>'+dis_4[script_nyelv];}
	if(!etosko && etcsp){szoveg1.innerHTML += '<BR>'+dis_5[script_nyelv];}
	if(etosko && !etcsp){szoveg1.innerHTML += '<BR>'+dis_6[script_nyelv];}
	if(etital != 0){
		var italdb = 0; 
		var gyogyitalok = eval(GM_getValue(azonosito+"_gyogyitalok",[]));
		for (i=0; i<gyogyitalok.length; i++) {
			if (gyogyitalok[i].id==etital){
				var italnev = gyogyitalok[i].nev; italdb = gyogyitalok[i].db;
			}
		}
		szoveg1.innerHTML += ('<BR>'+dis_7[script_nyelv]).replace('$1',etszazalek).replace('$2',italnev);
		if(italdb==0){
			GM_setValue(azonosito+"_start", false);
			alert((dis_8[script_nyelv]).replace('$1',italnev)+'\n'+(dis_20[script_nyelv]).replace('$1',etalkalomnum).replace('$2', ettargynum));
			window.location.href = window.location.href;
		}
	}
	if(tkp==0){
		GM_setValue(azonosito+"_start", false);
		alert(dis_9[script_nyelv]+'\n'+(dis_20[script_nyelv]).replace('$1',etalkalomnum).replace('$2', ettargynum));
		window.location.href = window.location.href;
	}	
	/* Most szépen megnézzük, hogy pirosodott-e a küldetés gomb. Ha igen, akkor leáll a script. dis_21 */
	if (kuldetes) {
		menugombok = document.getElementById('fomenu').getElementsByTagName('li');
		for (i=0; i<menugombok.length; i++){
			if (!menugombok[i].innerHTML.match(/fomenu_sor/) && menugombok[i].innerHTML.match(/kuldetesek/)) {
				if(menugombok[i].getAttribute('class')) {
					GM_setValue(azonosito+"_start", false);
					alert(dis_21[script_nyelv]+'\n'+(dis_20[script_nyelv]).replace('$1',etalkalomnum).replace('$2', ettargynum));
					window.location.href = window.location.href;
				}
			}
		}
	}
	form.appendChild(szoveg1);
	a = document.createElement('a'); 
	a.addEventListener('click', click_stop, true);
	a.className='gomblink';
	a.setAttribute('style','margin-top: 10px; cursor: pointer');
	form.appendChild(a);
	aspan = document.createElement('span'); 
	aspan.innerHTML = dis_18[script_nyelv];
	a.appendChild(aspan);
	getFirstByClass('div', 'szovetseg_reszletes').insertBefore(div, getFirstByClass('div', 'h3_out'));
	var maxep = GM_getValue(azonosito+"_maxep",0);
	karilap = id('welcome').innerHTML;
	var matches = document.getElementById('karakter_ep').innerHTML;
	ep = parseInt(matches.replace(".","").replace(".","").replace(".",""));
	epsz = Math.round(ep/maxep*10000)/100;
	if (epsz<etszazalek && etital>0) {
		setTimeout(eplink, 2000+Math.round(Math.random()*5000));
	}
	else {
		gombok = getByClass('div','terkapu');
		if (gombok[0].innerHTML.match(ker_4[host_nyelv])){
			setTimeout(tklink, 2000+Math.round(Math.random()*5000));
		}
		if (!gombok[0].innerHTML.match(ker_5[host_nyelv])){
			if (gombok[0].innerHTML.match(ker_6[host_nyelv]) && etosko){
				setTimeout(kolink, 2000+Math.round(Math.random()*5000));
			}	
			if (gombok[0].innerHTML.match(ker_7[host_nyelv]) && etcsp){
				setTimeout(csplink, 2000+Math.round(Math.random()*5000));
			}
		}
	}
}

if (strpos('&tipus=terkapu',window.location.href) && start && strpos('index.php?m=csataleiras&csata=',window.location.href)){
	nyertcsata = getByClass('div','result_win');
	if(nyertcsata.length>0){
		etalkalom=etalkalom-1;
		GM_setValue(azonosito+"_etalkalom", etalkalom);
		GM_setValue(azonosito+"_etalkalomnum", ++etalkalomnum);
	}
	targytalal = getByClass('div','message_center');
	if(targytalal.length>0){
		for (i=0; i<targytalal.length; i++){
			if (targytalal[i].innerHTML.match(ker_8[host_nyelv])){
				ettargy=ettargy-1;
				GM_setValue(azonosito+"_ettargy", ettargy);
				GM_setValue(azonosito+"_ettargynum", ++ettargynum);
			}
		}
	}
	setTimeout(tlink,2000+Math.round(Math.random()*5000)); 
}

if (strpos('terkapu',window.location.href) && !start && tkp>0 ){
	
	div = document.createElement('div'); 
	div.className = "message_center";

	form = document.createElement('form');
	form.setAttribute('style','display: inline');
	div.appendChild(form);

	szoveg0 = document.createElement('szoveg0'); 
	szoveg0.innerHTML = dis_10[script_nyelv];

	input0 = document.createElement('input');
	input0.size = 1;
	input0.id = "etalkalom";
	input0.value = 25;

	szoveg1 = document.createElement('szoveg1'); 
	szoveg1.innerHTML = dis_11[script_nyelv];

	input1 = document.createElement('input');
	input1.size = 1;
	input1.id = "ettargy";
	input1.value = 25;

	szoveg2 = document.createElement('szoveg2'); 
	szoveg2.innerHTML = dis_12[script_nyelv];
	
	select = document.createElement('select');
	select.id = "etital";
	
	var gyogyitalok = [];
	gyogyitalok.push({db: 0, nev: dis_19[script_nyelv], id: '0'});
	if (eval(GM_getValue(azonosito+"_gyogyitalok",[]))) {
		var gyogyitalok = eval(GM_getValue(azonosito+"_gyogyitalok",[]));
		}
	for (i=0; i<gyogyitalok.length; i++){
		option = document.createElement('option');
		option.value=gyogyitalok[i].id;
		if (gyogyitalok[i].db==0) {option.innerHTML=gyogyitalok[i].nev;}
		else option.innerHTML=gyogyitalok[i].nev + ' (' + gyogyitalok[i].db +')';
		select.appendChild(option);
	}
	
	szoveg3 = document.createElement('szoveg3'); 
	szoveg3.innerHTML = dis_13[script_nyelv];
	
	input2 = document.createElement('input');
	input2.size = 1;
	input2.id = "etszazalek";
	input2.value = 15;
	
	szoveg4 = document.createElement('szoveg4'); 
	szoveg4.innerHTML = dis_14[script_nyelv]+ '<BR>';
	
	szoveg5 = document.createElement('szoveg5'); 
	chval = ' checked="checked" ';
	szoveg5.innerHTML = '<input type="checkbox"'+(etosko?chval:'')+' id="etosko_csekk">'+dis_15[script_nyelv]+'<input type="checkbox"'+(etcsp?chval:'')+' id="etcsp_csekk">'+dis_16[script_nyelv];

	if (script_nyelv == 0 || script_nyelv == 2 || script_nyelv == 3) {
		form.appendChild(szoveg0);
		form.appendChild(input0);
		form.appendChild(szoveg1);
		form.appendChild(input1);
		form.appendChild(szoveg2);
		form.appendChild(select);
		form.appendChild(szoveg3);
		form.appendChild(input2);
		form.appendChild(szoveg4);
		form.appendChild(szoveg5);
	} else if (script_nyelv == 1) {
		form.appendChild(szoveg0);
		form.appendChild(input0);
		form.appendChild(szoveg1);
		form.appendChild(input1);
		form.appendChild(szoveg2);
		form.appendChild(input2);
		form.appendChild(szoveg3);
		form.appendChild(select);
		form.appendChild(szoveg4);
		form.appendChild(szoveg5);
	}
	
	a = document.createElement('a'); 
	a.addEventListener('click', click_start, true);
	a.className='gomblink';
	a.setAttribute('style','margin-top: 10px; cursor: pointer');
	form.appendChild(a);
	aspan = document.createElement('span'); 
	aspan.innerHTML = dis_17[script_nyelv];
	a.appendChild(aspan);
	script = document.createElement('script');  
    script.innerHTML = 'function checkbox_convert(elem){}'; 
    document.getElementsByTagName('body')[0].appendChild(script);
		
	getFirstByClass('div', 'szovetseg_reszletes').insertBefore(div, getFirstByClass('div', 'h3_out'));
}

if(strpos('karakterlap&sub=targylista',window.location.href) && tkoldalrol){
	if (document.getElementById('reszletes_targylista').innerHTML.match(ker_10[host_nyelv])){
		setTimeout(tlink, 2000+Math.round(Math.random()*5000));
	}
	GM_setValue(azonosito+"_tkoldalrol", false);
}

//  MENÜ FUNKCIÓK

function configure(){
	window.scrollBy(0,150);
	style = document.createElement('style');
	style.innerHTML = '#terkapulayer {display: block; opacity: .85; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background-color: #202; z-index: 9; text-align: center;} #terkapulayer div {background-color: #101; text-align: left; padding: 20px; border: double gray 4px; position: relative; top: 5%; margin-right: auto; margin-left: auto; width: 730px;} #terkapulayer h1 {margin: 25px} #terkapulayer label {width: 100px; display: block; float: left; line-height: 20px;} #terkapulayer input {float: left; width: 30px; margin: 3px 0px;} #terkapulayer br {clear: both} #terkapulayer #bezaras {cursor: pointer; position: absolute; right: 0px; top: -2px; width: 20px; height: 20px; border: solid gray 1px; line-height: 20px; background-color: #d00; color: silver} .testreszab {cursor: pointer}';
	document.getElementsByTagName('body')[0].appendChild(style);

	terkapulayer = document.createElement('div');
	terkapulayer.id = 'terkapulayer';
	terkapulayer.style.overflow='auto';
	belsodiv = document.createElement('div');
	cim = document.createElement('h2');
	cim.innerHTML = dis_22[script_nyelv];
		
	document.getElementsByTagName('body')[0].appendChild(terkapulayer);
	terkapulayer.appendChild(belsodiv);
	belsodiv.appendChild(cim);
	
	chval = ' checked="checked" ';
	if (script_nyelv == 0 || script_nyelv == 2 || script_nyelv == 3) {
	belsodiv.innerHTML += '<br /><input type="checkbox"'+(kuldetes?chval:'')+' id="kuldetes_csekk"> A script leáll, ha teljesült egy küldetés';
	} else if (script_nyelv == 1) {
	belsodiv.innerHTML += '<br /><input type="checkbox"'+(kuldetes?chval:'')+' id="kuldetes_csekk"> Skript bude ukončený po splnení úlohy.';
	}
	belsodiv.innerHTML += '<P><TABLE WIDTH=100%><TR><TD WIDTH=25% ALIGN=center><input type="radio" name="script_nyelv" value="0"'+(script_nyelv == 0 ? ' checked':'')+' id="langhu_csekk"> Magyar </TD><TD WIDTH=25% ALIGN=center><input type="radio" name="script_nyelv" value="1"'+(script_nyelv == 1 ? ' checked':'')+' id="langsk_csekk"> Slovenský </TD><TD WIDTH=25% ALIGN=center><input type="radio" name="script_nyelv" value="2"'+(script_nyelv == 2 ? ' checked':'')+' id="langen_csekk"> English </TD><TD WIDTH=25% ALIGN=center><input type="radio" name="script_nyelv" value="3"'+(script_nyelv == 3 ? ' checked':'')+' id="langru_csekk"> русский </TD></TR>'; 

	bezargomb = document.createElement('input');
	bezargomb.type = 'button';
	bezargomb.value = 'X';
	bezargomb.title = dis_3[script_nyelv];
	bezargomb.id = 'bezaras';
	bezargomb.addEventListener('click',function(){
		terkapulayer.style.display='none';
		kuldetes = document.getElementById('kuldetes_csekk').checked;
		if (document.getElementById('langhu_csekk').checked) {
			script_nyelv = 0;
		} else if (document.getElementById('langsk_csekk').checked) {
			script_nyelv = 1;
		} if (document.getElementById('langen_csekk').checked) {
			script_nyelv = 2;
		} if (document.getElementById('langru_csekk').checked) {
			script_nyelv = 3;
		} 
		
		GM_setValue(azonosito+"_kuldetes", kuldetes);
		GM_setValue(azonosito+"_nyelv", script_nyelv);
		window.location.reload();
	}, false);
	belsodiv.appendChild(bezargomb);
}

GM_registerMenuCommand(dis_22[script_nyelv], configure);