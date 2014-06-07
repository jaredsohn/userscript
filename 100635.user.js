// ==UserScript==
// @name           vu_kemstat
// @version        2.12
// @namespace      vegzetur
// @include        http://*.vegzetur.hu*
// ==/UserScript==

//Config rész
var sormax = 5; 	//Hány soros legyen a táblázat ami megjelenik
var datamax = 500;	//Maximálisan hány kémlelést tároljon 

//Innentől ne piszkáld, ha nem tudod mi micsoda!

var version = "2.12";
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
var ver_check = GM_getValue("ver_check",0);
var most = Math.floor(new Date().getTime()/1000/3600/24);
if (most > ver_check) {
var url = 'http://userscripts.org/scripts/source/100635';
   GetUrl('GET', url, '', function (res) {
     pattern = /version\s+([\d\.]+)/img;
	 if (version != pattern.exec(res.responseText)[1]){
		GM_openInTab('http://userscripts.org/scripts/show/100635');
		alert ("Van újabb kemstat verzió!\nHozzá tartozó lapot megnyitottam!");
	 }	
   });
   GM_setValue("ver_check", Math.round(most));
}

mennyi = document.getElementById('fomenu').getElementsByTagName('li');
for (i=0; i<mennyi.length; i++){
		elem = document.getElementById('fomenu').getElementsByTagName('li')[i];
		if (elem.textContent == "Játékleírás"){
			elem.innerHTML='<a href="http://'+strcut('//','.',window.location.href)+'.vegzetur.hu/index.php?m=gyik">Kémkedéseid</a>';
		}
		if (elem.textContent == "GY.I.K."){
			elem.innerHTML='<a href="http://'+strcut('//','.',window.location.href)+'.vegzetur.hu/index.php?m=jatekleiras">Kém. egyénekre</a>';
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

function strcut(from, to, str){
	start = str.indexOf(from);
	if (to=='') {
		end = str.length;
	} else {
		end = str.indexOf(to);
	}
	return str.substring(start+from.length, end);
}

function tag(tagname){
	return document.getElementsByTagName(tagname);
}

function strpos(needle, hay){
	return hay.indexOf(needle)!=-1;
}

function id(elem){
	return document.getElementById(elem);
}

function getFirstByClass(tag, classname){
	items = getByClass(tag, classname);
	return items[0];
}

if (strpos('sub=kemkedes',window.location.href)) {
	kep = tag('img');
	var vilag = strcut('//','.',window.location.href);
	if (vilag=='www'){vilag='V1'};
	if (vilag=='vilag2'){vilag='V2'};
	if (vilag=='vilag3'){vilag='V3'};
	if (vilag=='vilag4'){vilag='V4'};
	if (vilag=='vilag5'){vilag='V5'};
	for (i=0; i<kep.length; i++ ) {
		if ((strpos('/husvet',kep[i].getAttribute('src')) && !strpos('husveti_vernyul.jpg',kep[i].getAttribute('src')) || strpos('/halloween',kep[i].getAttribute('src')) || strpos('/avatar',kep[i].getAttribute('src'))) && id('welcome').getElementsByTagName('strong')[0].innerHTML != kep[i].getAttribute('alt')) {
			var username = kep[i].getAttribute('alt');
		}
	}
	
	fejlec = getByClass('div','h3_out');
	for (i=0; i<fejlec.length; i++ ) {
		if (fejlec[i].innerHTML.match('. szintű')){szint = parseInt(fejlec[i].textContent.match(/\d+/g));}
	}
	
	var tul = 0;
	var szaki = 0;
	var epites = 0;
	var trs = document.getElementsByTagName('tr');
	for ( var i = 0; i < trs.length; i++ ) {
		if ( ( trs[i].children.length == 2 ) && ( trs[i].firstChild.getAttribute( "width" ) == 200 )) {
			if (trs[i].firstChild.innerHTML.match( /lajdon/i )!=null){
				tul=trs[i].lastChild.innerHTML;
			}
			if (trs[i].firstChild.innerHTML.match( /rtelem/i )!=null){
				szaki=trs[i].lastChild.innerHTML;
			}
			if (trs[i].firstChild.innerHTML.match( /sszes/i )!=null){
				epites=trs[i].lastChild.innerHTML.replace( /\./g, "" );
			}
		}
	}
	td = document.getElementsByTagName('td');
	for (i=0; i<td.length; i++){
		if(td[i].innerHTML.match('Erő:')){ero = td[i+2].innerHTML;}
		if(td[i].innerHTML.match('Támadás:')){tam = td[i+2].innerHTML;}
		if(td[i].innerHTML.match('Védekezés:')){ved = td[i+2].innerHTML;}
		if(td[i].innerHTML.match('Egészség:')){egs = td[i+2].innerHTML;}
		if(td[i].innerHTML.match('IQ:')){iq = td[i+2].innerHTML;}
		if(td[i].innerHTML.match('Mágia:')){mag = td[i+2].innerHTML;}
		if(td[i].innerHTML.match('Taumaturgia:')){tau = td[i+2].innerHTML;}
	}
	szer = 0;
	spec = getByClass('span','szerencse');
	if (spec.length>0){szer = spec[0].innerHTML;}
	csikok = getByClass('span','csik_szoveg');
	ep = csikok[0].textContent.substring(0,(csikok[0].textContent.length-6)/2);
	tp = 'NaN';
	if (csikok[2]) { 
		tp = csikok[2].textContent.substring(0,csikok[2].textContent.length-3);
	}
	now = new Date().toLocaleString();
	nowsec = Math.floor(new Date().getTime()/1000);

	azonosito = vilag + "_" + username;
	siker = getByClass('div','success');
	var kemlelesek = eval(GM_getValue('kemlelesek',[]));
	if (siker.length>0 && siker[0].innerHTML=='Kémkedés sikeres!') {
		kemlelesek.push({
			nev: azonosito,
			ep: ep,
			tp: tp,
			tul: tul,
			szaki: szaki,
			epites: epites, 
			ido: now,
			sec: nowsec,
			ero: ero,
			tam: tam,
			ved: ved,
			egs: egs,
			iq: iq,
			mag: mag,
			tau: tau,
			szer: szer,
			szint: szint
		});
	if (kemlelesek.length>datamax) kemlelesek.splice(0, kemlelesek.length-datamax);
		GM_setValue("kemlelesek",kemlelesek.toSource());
	}
		
	var ok = eval(GM_getValue('ok',[]));
	var okk = eval(GM_getValue('okk',[]));
	for (var i=0; i<kemlelesek.length; i++){
		if (kemlelesek[i].nev == azonosito) {
			ok.push({id: i});
			if (ok.length>sormax) ok.splice(0, ok.length-sormax);
			if (okk.length<1){okk.push({id: i});}
			else{
				if (kemlelesek[i].tul != kemlelesek[okk[okk.length-1].id].tul) {okk.push({id: i});}
				if (okk.length>sormax) okk.splice(0, okk.length-sormax);
			}
		}
	}
	style = document.createElement('style');
	style.innerHTML = '.mytable, .mytable td, .mytable th {border-collapse: collapse; border-width: 1px; border-style: solid; border-color: gray; margin: 0px; padding: 0px;}';
	document.getElementsByTagName('body')[0].appendChild(style);
	scriptbox = document.createElement('div');
	scriptbox.setAttribute("style", "display: none; text-align: center; color: silver; font-weight: normal");
	fejlec = '<table class="mytable" WIDTH=100%><thead><TR style="color:green"><TH>Karakternév</TH><TH>Szint</TH><TH>ÉP</TH><TH>TP</TH><TH>Tul</TH><TH>Szaki</TH><TH>Építés</TH><TH>Kémlelés ideje</TH></TR></thead>';
	lezaras = '</table>';
	var tabla = ""
	if (ok.length==1) {
		for (var j=0; j<ok.length; j++){
			k = ok[j].id;
			tabla = tabla+'<TR><TD>'+username+'</TD><TD>'+kemlelesek[k].szint+'</TD><TD>'+kemlelesek[k].ep+'</TD><TD>'+kemlelesek[k].tp+'</TD><TD>'+kemlelesek[k].tul+'</TD><TD>'+kemlelesek[k].szaki+'</TD><TD>'+kemlelesek[k].epites+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
		}		
	}
	if (ok.length>1) {
		for (var j=0; j<ok.length; j++){
			k = ok[j].id;
			if (j==0){
				tabla = tabla+'<TR><TD>'+username+'</TD><TD>'+kemlelesek[k].szint+'</TD><TD>'+kemlelesek[k].ep+'</TD><TD>'+kemlelesek[k].tp+'</TD><TD>'+kemlelesek[k].tul+'</TD><TD>'+kemlelesek[k].szaki+'</TD><TD>'+kemlelesek[k].epites+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
			}
			else{
				n = ok[j-1].id;
				tabla = tabla+'<TR><TD>'+username+'</TD><TD>'+kemlelesek[k].szint+'</TD><TD>'+kemlelesek[k].ep+'</TD>';
				if (kemlelesek[k].tp != kemlelesek[n].tp){tabla = tabla+'<TD style="color:lightgreen">'+kemlelesek[k].tp+'</TD>'; }
				else { tabla = tabla+'<TD>'+kemlelesek[k].tp+'</TD>'; }
				if (kemlelesek[k].tul != kemlelesek[n].tul){tabla = tabla+'<TD style="color:orange">'+kemlelesek[k].tul+'</TD>'; }
				else { tabla = tabla+'<TD>'+kemlelesek[k].tul+'</TD>'; }
				if (kemlelesek[k].szaki != kemlelesek[n].szaki){tabla = tabla+'<TD style="color:orange">'+kemlelesek[k].szaki+'</TD>'; }
				else { tabla = tabla+'<TD>'+kemlelesek[k].szaki+'</TD>'; }
				if (kemlelesek[k].epites != kemlelesek[n].epites){tabla = tabla+'<TD style="color:orange">'+kemlelesek[k].epites+'</TD>'; }
				else { tabla = tabla+'<TD>'+kemlelesek[k].epites+'</TD>'; }
				tabla = tabla+'<TD>'+kemlelesek[k].ido+'</TD></TR>';
			}
		}
		var idotabla = "";
		past = kemlelesek[k].sec - kemlelesek[n].sec;
		if (past<6000){
			ep1= kemlelesek[n].ep.replace( /\./, "" );
			ep2= kemlelesek[k].ep.replace( /\./, "" );
			maxok = getByClass('span','csik_szoveg');
			maxe = maxok[0].textContent.match(/\/ [\.\d]+/g);
			maxep = parseInt(maxe[0].substring(2).replace( /\./, "" ));
			epsec = past/(ep2-ep1);
			ep15 = Math.floor(maxep*15/100);
			sec15 = kemlelesek[k].sec+Math.floor((ep15-ep2)*epsec);
			var d=new Date();
			d.setTime(sec15*1000);
			if (ep2<ep15 && ep1<ep2) {
			lezaras = '</table><br /><table ALIGN="center" style="color:yellow">Kémkedéseid alapján a 15%-ot megközelítőleg '+d.toLocaleString()+'-kor éri el!</table>';	
			}
		}	
	}
	fejlec2 = '</table><br><table class="mytable" WIDTH=100%><thead><TR style="color:green"><TH>Karakternév</TH><TH>Erő</TH><TH>Tám</TH><TH>Véd</TH><TH>Egs</TH><TH>IQ</TH><TH>Mág</TH><TH>Tau</TH><TH>Szer</TH><TH>Kémlelés ideje</TH></TR></thead>';
	var tabla2 = ""
	if (okk.length==1) {
		for (var j=0; j<okk.length; j++){
			k = okk[j].id;
			tabla2 = tabla2+'<TR><TD>'+username+'</TD><TD>'+kemlelesek[k].ero+'</TD><TD>'+kemlelesek[k].tam+'</TD><TD>'+kemlelesek[k].ved+'</TD><TD>'+kemlelesek[k].egs+'</TD><TD>'+kemlelesek[k].iq+'</TD><TD>'+kemlelesek[k].mag+'</TD><TD>'+kemlelesek[k].tau+'</TD><TD>'+kemlelesek[k].szer+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
		}		
	}
	if (okk.length>1) {
			for (var j=0; j<okk.length; j++){
			k = okk[j].id;
			if (j==0){
				tabla2 = tabla2+'<TR><TD>'+username+'</TD><TD>'+kemlelesek[k].ero+'</TD><TD>'+kemlelesek[k].tam+'</TD><TD>'+kemlelesek[k].ved+'</TD><TD>'+kemlelesek[k].egs+'</TD><TD>'+kemlelesek[k].iq+'</TD><TD>'+kemlelesek[k].mag+'</TD><TD>'+kemlelesek[k].tau+'</TD><TD>'+kemlelesek[k].szer+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
			}
			else{
				n = okk[j-1].id;
				tabla2 = tabla2+'<TR><TD>'+username+'</TD>';
				if (kemlelesek[k].ero != kemlelesek[n].ero){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].ero+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].ero+'</TD>'; }
				if (kemlelesek[k].tam != kemlelesek[n].tam){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].tam+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].tam+'</TD>'; }
				if (kemlelesek[k].ved != kemlelesek[n].ved){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].ved+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].ved+'</TD>'; }
				if (kemlelesek[k].egs != kemlelesek[n].egs){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].egs+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].egs+'</TD>'; }
				if (kemlelesek[k].iq != kemlelesek[n].iq){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].iq+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].iq+'</TD>'; }
				if (kemlelesek[k].mag != kemlelesek[n].mag){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].mag+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].mag+'</TD>'; }
				if (kemlelesek[k].tau != kemlelesek[n].tau){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].tau+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].tau+'</TD>'; }
				if (kemlelesek[k].szer != kemlelesek[n].szer){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].szer+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].szer+'</TD>'; }
				tabla2 = tabla2+'<TD>'+kemlelesek[k].ido+'</TD></TR>';
			}	
		}	
	}
	scriptbox.innerHTML = fejlec + tabla + fejlec2 + tabla2 + lezaras;
	getByClass('div','message_center')[0].style.position = "relative";

	gomb = document.createElement('a');
	gomb.setAttribute('class','gomblink');
	gomb.setAttribute('style','cursor:pointer');
	gomb.innerHTML = '<span style="color: yellow">Előző kémkedések!</span>';
	gomb.addEventListener('mouseover',function(){ scriptbox.style.display = 'block'; }, true);
	gomb.addEventListener('mouseout', function(){ scriptbox.style.display = 'none';  }, true);
	getByClass('div','message_center')[0].appendChild(gomb);
	getByClass('div','message_center')[0].appendChild(scriptbox);
	}

if (strpos('m=gyik',window.location.href)) {
	style = document.createElement('style');
	style.innerHTML = '.mytable, .mytable td, .mytable th {border-collapse: collapse; text-align: center; border-width: 1px; border-style: solid; border-color: gray; margin: 3px; padding: 1px;}';
	document.getElementsByTagName('body')[0].appendChild(style);
	gyik = getByClass('div','jobb_content');
	fejlec = '<br /><table class="mytable" WIDTH=100%><thead><caption style="color:lightgreen; font-weight:bold">JELENLEG TÁROLT KÉMLELÉSEK</caption><TR style="color:green"><TH>id</TH><TH>Karakternév</TH><TH>ÉP</TH><TH>TP</TH><TH>Tul</TH><TH>Szaki</TH><TH>Építés</TH><TH WIDTH=27%>Kémlelés ideje</TH></TR></thead>';
	var tabla = ""
	var kemlelesek = eval(GM_getValue('kemlelesek',[]));
	for (var k=0; k<kemlelesek.length; k++){
		tabla = tabla+'<TR><TD style="text-align:right">'+k+'.</TD><TD style="text-align:left">'+kemlelesek[k].nev+'</TD><TD>'+kemlelesek[k].ep+'</TD><TD>'+kemlelesek[k].tp+'</TD><TD style="text-align:right">'+kemlelesek[k].tul+'</TD><TD style="text-align:right">'+kemlelesek[k].szaki+'</TD><TD style="text-align:right">'+kemlelesek[k].epites+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
	}
	lezaras = '</table>';
	gyik[0].innerHTML = fejlec + tabla + lezaras;
}

function click_start(){
	i = document.getElementById('nevlista').value;
	azonosito = kemlelesek[i].nev;
	var okk = eval(GM_getValue('okk',[]));
	for (var i=0; i<kemlelesek.length; i++){
		if (kemlelesek[i].nev == azonosito) {
			if (okk.length<1){okk.push({id: i});}
			if ((kemlelesek[i].tp != kemlelesek[okk[okk.length-1].id].tp) || (kemlelesek[i].tul != kemlelesek[okk[okk.length-1].id].tul) || (kemlelesek[i].szaki != kemlelesek[okk[okk.length-1].id].szaki) || (kemlelesek[i].epites != kemlelesek[okk[okk.length-1].id].epites)) {okk.push({id: i});}
//			if (okk.length) okk.splice(0, okk.length);
		}
	}
	lezaras = '</table>';
	fejlec = '<table class="mytable" WIDTH=100%><thead><TR style="color:green"><TH>Szint/TP</TH><TH>Erő</TH><TH>Tám</TH><TH>Véd</TH><TH>Egs</TH><TH>IQ</TH><TH>Mág</TH><TH>Tau</TH><TH>Szer</TH><TH>Szaki</TH><TH>Építés</TH><TH>Kémlelés ideje</TH></TR></thead>';
	var tabla2 = "";
	if (okk.length==1) {
		for (var j=0; j<okk.length; j++){
			k = okk[j].id;
			tabla2 = tabla2+'<TR><TD>';
			if(kemlelesek[k].szint){tabla2 = tabla2 + kemlelesek[k].szint+'/'; }
			tabla2 = tabla2 + parseInt(kemlelesek[k].tp.replace('.','')) + '</TD><TD>'+kemlelesek[k].ero+'</TD><TD>'+kemlelesek[k].tam+'</TD><TD>'+kemlelesek[k].ved+'</TD><TD>'+kemlelesek[k].egs+'</TD><TD>'+kemlelesek[k].iq+'</TD><TD>'+kemlelesek[k].mag+'</TD><TD>'+kemlelesek[k].tau+'</TD><TD>'+kemlelesek[k].szer+'</TD><TD>'+kemlelesek[k].szaki+'</TD><TD>'+kemlelesek[k].epites+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
		}		
	}
	if (okk.length>1) {
			for (var j=0; j<okk.length; j++){
			k = okk[j].id;
			if (j==0){
				tabla2 = tabla2+'<TR><TD>';
				if(kemlelesek[k].szint){tabla2 = tabla2 + kemlelesek[k].szint+'/'; }
				tabla2 = tabla2 + parseInt(kemlelesek[k].tp.replace('.','')) + '</TD><TD>'+kemlelesek[k].ero+'</TD><TD>'+kemlelesek[k].tam+'</TD><TD>'+kemlelesek[k].ved+'</TD><TD>'+kemlelesek[k].egs+'</TD><TD>'+kemlelesek[k].iq+'</TD><TD>'+kemlelesek[k].mag+'</TD><TD>'+kemlelesek[k].tau+'</TD><TD>'+kemlelesek[k].szer+'</TD><TD>'+kemlelesek[k].szaki+'</TD><TD>'+kemlelesek[k].epites+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
			}
			else{
				n = okk[j-1].id;
				tabla2 = tabla2+'<TR><TD>';
				if(kemlelesek[k].szint){tabla2 = tabla2 + kemlelesek[k].szint+'/'; }
				tabla2 = tabla2 + parseInt(kemlelesek[k].tp.replace('.','')) + '</TD>';
				if (kemlelesek[k].ero != kemlelesek[n].ero){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].ero+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].ero+'</TD>'; }
				if (kemlelesek[k].tam != kemlelesek[n].tam){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].tam+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].tam+'</TD>'; }
				if (kemlelesek[k].ved != kemlelesek[n].ved){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].ved+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].ved+'</TD>'; }
				if (kemlelesek[k].egs != kemlelesek[n].egs){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].egs+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].egs+'</TD>'; }
				if (kemlelesek[k].iq != kemlelesek[n].iq){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].iq+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].iq+'</TD>'; }
				if (kemlelesek[k].mag != kemlelesek[n].mag){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].mag+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].mag+'</TD>'; }
				if (kemlelesek[k].tau != kemlelesek[n].tau){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].tau+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].tau+'</TD>'; }
				if (kemlelesek[k].szer != kemlelesek[n].szer){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].szer+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].szer+'</TD>'; }
				if (kemlelesek[k].szaki != kemlelesek[n].szaki){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].szaki+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].szaki+'</TD>'; }
				if (kemlelesek[k].epites != kemlelesek[n].epites){tabla2 = tabla2+'<TD style="color:orange">'+kemlelesek[k].epites+'</TD>'; }
				else {tabla2 = tabla2+'<TD>'+kemlelesek[k].epites+'</TD>'; }
				tabla2 = tabla2+'<TD>'+kemlelesek[k].ido+'</TD></TR>';
			}	
		}	
	}
	tablazat.innerHTML = fejlec+tabla2+lezaras;
}
	
if (strpos('m=jatekleiras',window.location.href)) {
	style = document.createElement('style');
	style.innerHTML = '.kemszoveg {color:#34D800; font-size:12px; font-weight:bold;} .jobb_content {text-align: center;} .mytable, .mytable td, .mytable th {border-collapse: collapse; text-align: center; border-width: 1px; border-style: solid; border-color: gray; margin: 3px; padding: 1px;}';
	document.getElementsByTagName('body')[0].appendChild(style);
	jatekleiras = getByClass('div','jobb_content');
	jatekleiras[0].innerHTML = "";

	div = document.createElement('div'); 
	div.className = "kemadatok";

	form = document.createElement('form');
	form.setAttribute('style','display: inline');
	div.appendChild(form);

	szoveg0 = document.createElement('szoveg1');
	szoveg0.className = "kemszoveg";
	szoveg0.innerHTML = ' <br>Az elmentett kémkedéseim közül ';
	form.appendChild(szoveg0);
	
	select = document.createElement('select');
	select.className = "kemszoveg";
	select.id = "nevlista";
	form.appendChild(select);
	
	var kemlelesek = eval(GM_getValue('kemlelesek',[]));
	var nevek = eval(GM_getValue('nevek',[]));
	var van = "";
	for (var i=0; i<kemlelesek.length; i++){
		if(!van.match(kemlelesek[i].nev)){
			van =van+";"+kemlelesek[i].nev;
			nevek.push({id: i, nev: kemlelesek[i].nev});
		}
	}
	for (i=0; i<nevek.length; i++){
		option = document.createElement('option');
		option.value=nevek[i].id;
		option.innerHTML=nevek[i].nev;
		select.appendChild(option);
	}

	szoveg1 = document.createElement('szoveg1'); 
	szoveg1.className = "kemszoveg";
	szoveg1.innerHTML = ' adatait szeretném lelistázni!';
	form.appendChild(szoveg1);
	
	getFirstByClass('div', 'jobb_content').insertBefore(div, getFirstByClass('div', 'h3_out'));
	
	a = document.createElement('a'); 
	a.addEventListener('click', click_start, true);
	a.className='gomblink';
	a.setAttribute('style','margin-top: 10px; cursor: pointer');
	form.appendChild(a);
	aspan = document.createElement('span'); 
	aspan.className = "kemszoveg";
	aspan.innerHTML = "MEGJELENÍT";
	a.appendChild(aspan);
	
	var k=0;
	tablazat = document.createElement('div');
	tablazat.innerHTML = '';
	getByClass('div','kemadatok')[0].appendChild(tablazat);
}