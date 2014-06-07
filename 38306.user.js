// ==UserScript==
// @name           RedBux
// @namespace      Brujoscuro
// @web            visitasbux.webcindario.com
// @description    AutoClick for all Bux!
// @version        2.5
// @date           08.12.2008
// @include        http://*view*.php*
// @include        http://*adclick.php*
// @include        http://*vad?k=*
// @include        http://*Paidadlink.php*
// @include        http://*pages/clickads*
// @include        http://*v/?a=*
// @include        http://*clickads?h=*
// @include        http://*cks.php?k=*
// @include        http://*viewp.php*
// @exclude        http://*bux.to/view.php*
// @exclude        http://*userscripts*
// @exclude        http://*visitasbux.webcindario*
// ==/UserScript==

//
var i, v = document.getElementsByTagName('iframe');
for(i= v.length-1;i >= 1; i-- ) {
 v[i].parentNode.removeChild(v[i]);}

//
unsafeWindow.x = 1;
//
var site=document.domain;
if (site.match(/www./g)){var site=site.replace('www.', '');}

var surfTable = '//body';
var basari = Array(/success/gi,/finished/gi,/paidad/gi,/done/gi);

var kurver = '2.5';

GM_setValue('baslat',0);
GM_setValue('sure',5);

var baslat	= GM_getValue('baslat');
var sure	= GM_getValue('sure');
var dil		= GM_getValue('dil');



//Genel Kontrol
var kont1=Array(/\/view.php/gi,/\/viewp.php/gi,/\/viewpaid.php/gi,/\/viewpublic.php/gi,/\/viewad.php/gi,/\/viewads.php/gi,/\/adclick.php/gi,/\/paidadlink.php/gi);
var kont2=Array(/ad=\d/gi,/id=\d/gi,/h=\d/gi)
var ac	 =/nothing/gi;


var sonversiyon = 'Version';

switch(dil)
{
case 'tr':
var basla	    = 'Basla';
var temizle     = 'Temizle';
var basladi     = 'Basladi.';
var kontrol     = 'Kontrol ediliyor: ';
var aciliyor    = 'Sayfa aciliyor:';
var tamam	    = 'Tamamlandı. bir sonrakine geciliyor..';
var beklenniyor = 'Pencere acildi, bekleniyor...';
var bitti1   	= 'Tum sayfalara gidildi. ';
var bitti2      = ' dakika içinde sayfa yenilenecek';
var sayfalar    = 'Gidilecek sayfalar: ';
var versiyon    = 'Versiyon';
var sonversiyon = 'Versiyon kontrolü';
break;

case 'en':
var basla	    = 'Start';
var temizle     = 'Clear';
var basladi     = 'Started.';
var kontrol     = 'Checking: ';
var aciliyor    = 'Window Opening:';
var tamam	    = 'Done. Processing next.';
var beklenniyor = 'Window ppened, waiting...';
var bitti1   	= 'All ads clicked. ';
var bitti2      = ' minutes later page will refresh';
var sayfalar    = 'Ads Pages: ';
var versiyon    = 'Versiyon';
break;

case 'es':
var basla 		= 'Empieza';
var temizle		= 'Limpia';
var basladi 	= 'En marcha';
var kontrol 	= 'Comprobando: ';
var aciliyor 	= 'Ventana abierta:';
var tamam 		= 'Hecho. Procesando siguiente.';
var beklenniyor = 'Ventana abierta, Esperando...';
var bitti1 		= 'Todos anuncios clickeados ';
var bitti2 		= ' minutos despues la pagina será recargada';
var sayfalar 	= 'Paginas de anuncios: ';
var versiyon 	= 'Versión';
break;

case 'br':
var basla 		= 'Iniciar';
var temizle		= 'Limpar';
var basladi 	= 'Iniciado.';
var kontrol 	= 'Verificando: ';
var aciliyor	= 'Abrindo janela:';
var tamam 		= 'Pronto. Iniciando o próximo';
var beklenniyor = 'Janela aberta. Esperando...';
var bitti1		= 'Todas as propagandas clicadas. ';
var bitti2 		= ' minutos para ler a página novamente';
var sayfalar 	= 'Número de Propagandas: ';
var versiyon 	= 'Versão';
var sonversiyon = 'Verificar nova Versão';
break;

case 'pl':
var basla	 	= 'Start';
var temizle 	= 'Wyczyść';
var basladi 	= 'Wystartowano';
var kontrol 	= 'Sprawdzanie: ';
var aciliyor 	= 'Otwieranie:';
var tamam 		= 'Skończone. Otwieranie następnej strony.';
var beklenniyor = 'Strona otwarta, proszę czekać...';
var bitti1 		= 'Wszystkie reklamy kliknięte. ';
var bitti2 		= ' minut do odświerzenia strony.';
var sayfalar 	= 'Strony z reklamami: ';
var versiyon 	= 'Version';
var sonversiyon = 'Sprawdź czy jest nowa wersja';
break;

case 'it':
var basla	= 'Inizia';
var temizle 	= 'Pulisci';
var basladi 	= 'Iniziato';
var kontrol 	= 'Controllo: ';
var aciliyor    = 'Apertura finestra:';
var tamam	= 'Fatto. Inizio il seguente.';
var beklenniyor = 'Finestra aperta, attendere...';
var bitti1   	= 'Tutti gli sponsor sono stati cliccati. ';
var bitti2      = ' minuti per aggiornare la pagina';
var sayfalar    = 'Numero sponsor: ';
var versiyon 	= 'Version';
var sonversiyon = 'Aggiornamento script';
break;

case 'ar':
var basla = 'ابدأ';
var temizle = 'مسح';
var basladi = 'بدأ.';
var kontrol = 'جاري التأكيد: ';
var aciliyor = 'النافذه تفتح:';
var tamam = 'تم , جاري البدء بالتالي';
var beklenniyor = 'الاعلان مفتوح , جاري الانتظار.....';
var bitti1 = 'جميع الاعلانات ضغطت ';
var bitti2 = ' دقائق ثم سيتم تحديث الصفحه';
var sayfalar = 'عدد الاعلانات : ';
var versiyon = 'النسخه';
break;
}

var versiyon 	= versiyon+': '+kurver;

switch(site)
{
case 'cashwebs.net':
var ac = Array('=7214$','7738$','7886$');
break;

case 'turbobux.com':
var ac = Array('=127$');
break;

case 'advercash.net':
var ac = Array('=87$');
break;

case 'titanclicks.com':
var ac = Array('=42$');
break;

case 'buxa.in':
var ac = Array('=-1$');
break;

case 'ibux.ca':
var ac = Array('=69$');
break;

case 'bux3.com':
var ac = Array('=64$');
break;

case 'paidclicks.ws':
var ac = Array('=69$');
break;

case 'devclix.com':
var ac = Array('=113285$');
break;
}

var linksx = "//a"; 

var currentWindow;
var currentElement;
var links;
var watcher;



	var surf = document.evaluate(surfTable, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	var container = document.createElement('div');
	
	container.appendChild(document.createElement('br'));
	container.appendChild(document.createElement('br'));
	container.appendChild(document.createElement('br'));

	
	var button = document.createElement('button');
	button.innerHTML = basla;
	button.addEventListener('click', processLink, false);
	container.appendChild(button);
	
	var clear = document.createElement('button');
	clear.innerHTML = temizle;
	clear.addEventListener('click', clearDebug , false);
	container.appendChild(clear);
	
	var dilsec = document.createElement('select');
	dilsec.name = 'dilsec';
	dilsec.id	= 'dilsec';
	dilsec.addEventListener('change', dildegistir, false);
	dilsec.options[0] = new Option("Change Language","");
	dilsec.options[1] = new Option("Turkish","tr");
	dilsec.options[2] = new Option("English","en");
	dilsec.options[3] = new Option("Espanol","es");
	dilsec.options[4] = new Option("Brazilian","br");
	dilsec.options[5] = new Option("Polish","pl");
	dilsec.options[6] = new Option("Italian","it");
	dilsec.options[6] = new Option("Arabic","ar");
	container.appendChild(dilsec);

	var ver = document.createElement('button');
	ver.innerHTML = versiyon;
	ver.setAttribute('disabled', 'disabled');
	container.appendChild(ver);
	
	var sonver = document.createElement('button');
	sonver.innerHTML = sonversiyon;
	sonver.addEventListener('click', guncelle , false);
	container.appendChild(sonver);
		
	container.appendChild(document.createElement('br'));
	
	var progress = document.createElement('textarea');
	progress.style.width = "100%";
	progress.style.height = "20em";
	progress.setAttribute('readonly', 'true');
	container.appendChild(progress);

	startSurf();
	
	
//Fonksiyonlar

/*
function insertAfter(parent, node, referenceNode)
{
parent.insertBefore(node, referenceNode.nextSibling);
}
*/

function yenile(dakika)
{
window.setTimeout('document.location.reload();', dakika * 60 * 1000);
debug(bitti1 + dakika + bitti2)
}

function adwatchDone(){
	debug(tamam);
	
	var strike = document.createElement('strike');
	strike.innerHTML = currentElement.innerHTML;
	currentElement.parentNode.replaceChild(strike, currentElement);
	
	setTimeout(function(){
		currentWindow.close();
		processLink();
	}, 2000);
}



function watchLocation(){
	
	//currentWindow.onLoad.apply(currentWindow,[]);
	
	watcher = setInterval(function(){
		
		var frames = currentWindow.document.getElementsByName('success');
		var frame = frames[0];
		debug(kontrol + frame.contentWindow.location.href);
		
		for (var x=0;x<basari.length;x++){
		if (basarili){break;}
		var basarili = frame.contentWindow.location.href.match(basari[x]);
		}
		if(basarili)
		{
			adwatchDone();
			clearInterval(watcher);
		}
	}, 5000);

	
	
	currentWindow.currentElement = currentElement;
}


function processLink(){
	button.setAttribute('disabled', 'disabled');
	var element = links.pop();
	
	if(element){
		debug(aciliyor + element.href);
		currentElement = element;
		var url = element.getAttribute('href');
		currentWindow = window.open(url);
		currentWindow.addEventListener('DOMContentLoaded', watchLocation, false);
		debug(bekleniyor);
	}else{
		yenile(sure);
	}
}

function getLinks(){
	var links = document.evaluate(linksx, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var work = [];
	
	for(var i=0;i<links.snapshotLength;i++){
		var item = links.snapshotItem(i);
	//Anti Anti Cheat
	if (aac(item) && filtre(item)){work.push(item);}
	}
	
	return work;
}

function startSurf(){
	debug(basladi);
	links = getLinks();
	if(links != "")
	{
	surf.parentNode.insertBefore(container,surf);
	debug(sayfalar +'('+ links.length +') ');
	for(var i=0;i<links.length;i++){
	s=i+1;
	if (s<10){debug(' ('+s+') '+links[i]);}
	else {debug('('+s+') '+links[i]);}
	}
	links.reverse();
	if (baslat==1){processLink()}
	}
}

function clearDebug(){
	progress.value = "";
}

function debug(str){
	if(progress.value.length >= 1){
		progress.value += "\n" + str;
	}else{
		progress.value = str;
	}
	progress.scrollTop = progress.scrollHeight;

}

function yenile(dakika){
window.setTimeout("document.location.reload();", dakika * 60 * 1000);
button.setAttribute('disabled', 'disabled');
debug(bitti1 + dakika + bitti2)
}

function filtre(baglanti){
		
	
	for (var x=0;x<kont1.length;x++){
	var kon1=new RegExp(kont1[x]);
	if (k1){break;}	
	var k1=kon1.test(baglanti);
	}
	
	for (var x=0;x<kont2.length;x++){
	var kon2=new RegExp(kont2[x]);
	if (k2){break;}
	var k2=kon2.test(baglanti);
	}
	
	if (k1 && k2){return true;}
	else {return false;}
}

function aac(baglanti){
	
	for (var x=0;x<ac.length;x++){
	if (kaac){break;}
	var konaac=new RegExp(ac[x]);
	var kaac=konaac.test(baglanti);
}
	if(kaac){return false;}
	else {return true;}
}

function guncelle(){

var gunurl = 'http://userscripts.org/scripts/review/38306?format=txt';
GM_xmlhttpRequest({method: 'GET',url: gunurl,
    onload: function(gunsonuc) {
	gunsonuc = gunsonuc.responseText.substr(208,5);
	if (kurver == gunsonuc){alert('Good.\nYou have lastest version. ');}
	else{
	var soru = confirm('Your version : '+kurver+'\nLast version: '+gunsonuc+'\nYour version is old.!!!\nDo you want to update ?');}
	if (soru == true){location.href = 'http://userscripts.org/scripts/source/38306.user.js';}
	}
});
}

function dildegistir(dilsec){
var dil = document.getElementById("dilsec");
GM_setValue('dil',dil.value);
location.href = document.location;
}