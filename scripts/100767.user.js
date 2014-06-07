// ==UserScript==
// @name           Happy Pets Hack
// @version        1.10
// @namespace      Happy Pets Hack
// @include        http://*.vegzetur.hu*
// ==/UserScript==

//Config rész
var sormax = 10; 	//Hány soros legyen a táblázat ami megjelenik
var datamax = 100;	//Maximálisan hány kémlelést tároljon 

//Innentől ne piszkáld, ha nem tudod mi micsoda!

var version = "1.10";
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
		if (elem.textContent == "GY.I.K."){
			elem.innerHTML='<a href="http://'+strcut('//','.',window.location.href)+'.vegzetur.hu/index.php?m=gyik">Kémkedések</a>';
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

if (strpos('sub=kemkedes',window.location.href)) {
	kep = tag('img');
	var vilag = strcut('//','.',window.location.href);
	if (vilag=='www'){vilag='V1'};
	if (vilag=='vilag2'){vilag='V2'};
	if (vilag=='vilag3'){vilag='V3'};
	if (vilag=='vilag4'){vilag='V4'};
	if (vilag=='vilag5'){vilag='V5'};
	var username = kep[7].getAttribute('alt');
	if (username == 'Kémgömb') {
		username = kep[8].getAttribute('alt');
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

	csikok = getByClass('span','csik_szoveg');
	ep = csikok[0].textContent.substring(0,(csikok[0].textContent.length-6)/2);
	//ep = csikok[0].textContent.substring(0,csikok[0].textContent.length-2);
	tp = 'NaN';
	if (csikok[2]) { 
		//tp = csikok[2].textContent.substring(0,(csikok[2].textContent.length-6)/2);
		tp = csikok[2].textContent.substring(0,csikok[2].textContent.length-3);
	}
	now = new Date().toLocaleString();

	azonosito = vilag + "_" + username;
	siker = getByClass('div','success');
	var kemlelesek = eval(GM_getValue('kemlelesek',[]));
	if (siker.length>0) {kemlelesek.push({
		nev: azonosito,
		ep: ep,
		tp: tp,
		tul: tul,
		szaki: szaki,
		epites: epites, 
		ido: now
	});
	if (kemlelesek.length>datamax) kemlelesek.splice(0, kemlelesek.length-datamax);
	GM_setValue("kemlelesek",kemlelesek.toSource());
	}
		
	var ok = eval(GM_getValue('ok',[]));
	for (var i=0; i<kemlelesek.length; i++){
		if (kemlelesek[i].nev == azonosito) {
			ok.push({id: i});
			if (ok.length>sormax) ok.splice(0, ok.length-sormax);
		}
	}

	style = document.createElement('style');
	style.innerHTML = '.mytable, .mytable td, .mytable th {border-collapse: collapse; border-width: 1px; border-style: solid; border-color: gray; margin: 0px; padding: 0px;}';
	document.getElementsByTagName('body')[0].appendChild(style);
	scriptbox = document.createElement('div');
	scriptbox.setAttribute("style", "display: none; text-align: center; color: silver; font-weight: normal");
	fejlec = '<table class="mytable" WIDTH=100%><thead><TR style="color:green"><TH>Karakternév</TH><TH>ÉP</TH><TH>TP</TH><TH>Tul</TH><TH>Szaki</TH><TH>Építés</TH><TH WIDTH=27%>Kémlelés ideje</TH></TR></thead>';
	var tabla = ""
	for (var j=0; j<ok.length; j++){
		k = ok[j].id;
		tabla = tabla+'<TR><TD>'+username+'</TD><TD>'+kemlelesek[k].ep+'</TD><TD>'+kemlelesek[k].tp+'</TD><TD>'+kemlelesek[k].tul+'</TD><TD>'+kemlelesek[k].szaki+'</TD><TD>'+kemlelesek[k].epites+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
	}
	lezaras = '</table>';
	scriptbox.innerHTML = fejlec + tabla + lezaras;
	getByClass('div','message_center')[0].style.position = "relative";

	gomb = document.createElement('a');
	gomb.setAttribute('class','gomblink');
	gomb.setAttribute('style','cursor:pointer');
	gomb.innerHTML = '<span style="color: yellow">Előző kémkedések!</span>';
	gomb.addEventListener('mouseover',function(){ scriptbox.style.display = 'block'; }, true);
	gomb.addEventListener('mouseout', function(){ scriptbox.style.display = 'none';  }, true);
	/*gomb.addEventListener('click',function(){
		scriptbox.style.display= scriptbox.style.display == "block" ? "none" : "block";
	}, true);*/
	getByClass('div','message_center')[0].appendChild(gomb);
	getByClass('div','message_center')[0].appendChild(scriptbox);
	}

if (strpos('m=gyik',window.location.href)) {
	style = document.createElement('style');
	style.innerHTML = '.mytable, .mytable td, .mytable th {border-collapse: collapse; text-align: center; border-width: 1px; border-style: solid; border-color: gray; margin: 3px; padding: 1px;}';
	document.getElementsByTagName('body')[0].appendChild(style);
	gyik = getByClass('div','jobb_content');
	//gyik[0].setAttribute("style", "display: none; text-align: center; color: silver; font-weight: normal");
	fejlec = '<br /><table class="mytable" WIDTH=100%><thead><caption style="color:lightgreen; font-weight:bold">JELENLEG TÁROLT KÉMLELÉSEK</caption><TR style="color:green"><TH>id</TH><TH>Karakternév</TH><TH>ÉP</TH><TH>TP</TH><TH>Tul</TH><TH>Szaki</TH><TH>Építés</TH><TH WIDTH=27%>Kémlelés ideje</TH></TR></thead>';
	var tabla = ""
	var kemlelesek = eval(GM_getValue('kemlelesek',[]));
	for (var k=0; k<kemlelesek.length; k++){
		tabla = tabla+'<TR><TD style="text-align:right">'+k+'.</TD><TD style="text-align:left">'+kemlelesek[k].nev+'</TD><TD>'+kemlelesek[k].ep+'</TD><TD>'+kemlelesek[k].tp+'</TD><TD style="text-align:right">'+kemlelesek[k].tul+'</TD><TD style="text-align:right">'+kemlelesek[k].szaki+'</TD><TD style="text-align:right">'+kemlelesek[k].epites+'</TD><TD>'+kemlelesek[k].ido+'</TD></TR>';
	}
	lezaras = '</table>';
	gyik[0].innerHTML = fejlec + tabla + lezaras;
}