// ==UserScript==
// @name           AdeP - AC
// @namespace      AlegriadePobre
// @web            alegriadepobre.hd1.com.br
// @description    AC para lista!
// @version        1.0
// @date           29.06.10
// @include        http://*view*.php*
// @include        http://*adclick.php*
// @include        http://*vad?k=*
// @include        http://*Paidadlink.php*
// @include        http://*pages/clickads*
// @include        http://*v/?a=*
// @include        http://*clickads?h=*
// @include        http://*cks.php?k=*
// @include        http://*viewp.php*
// @include        http://*adverts.php*
// @include        http://*surf2.php*
// @include        http://*surf.php*
// @include        http://*surfpage.php*
// @include        http://*clickads
// @include        http://*option=surf
// @include        http://*u=v
// @include        http://*surfs.php*
// @include        http://*view=ads
// @include        http://*v=v
// @include        http://*clickPTC.php
// @include        http://*surf
// @include        http://*ads.php
// @include        http://*ads
// @include        http://*surf.php
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

var kurver = '1.0';

GM_setValue('baslat',0);
GM_setValue('sure',5);

var baslat	= GM_getValue('baslat');
var sure	= GM_getValue('sure');
var dil		= GM_getValue('dil');



//Genel Kontrol
var kont1=Array(/\/view.php/gi,/\/viewp.php/gi,/\/viewpaid.php/gi,/\/viewpublic.php/gi,/\/viewad.php/gi,/\/viewads.php/gi,/\/adclick.php/gi,/\/paidadlink.php/gi,/\/gpt.php/gi,/\/ads.php/gi,/\/cks.php/gi,/\/v/gi,/\/surfing/gi,/\/viewPTC.php/gi,/\/viewf.php/gi);
var kont2=Array(/ad=\d/gi,/id=\d/gi,/h=\d/gi,/v=\d/gi,/k=\d/gi,/a=\d/gi,/view=surfer&t=\d/gi,/hash=\d/gi)
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
var tamam	    = 'TamamlandÄ±. bir sonrakine geciliyor..';
var beklenniyor = 'Pencere acildi, bekleniyor...';
var bitti1   	= 'Tum sayfalara gidildi. ';
var bitti2      = ' dakika iÃ§inde sayfa yenilenecek';
var sayfalar    = 'Gidilecek sayfalar: ';
var versiyon    = 'Versiyon';
var sonversiyon = 'Versiyon kontrolÃ¼';
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
var bitti2 		= ' minutos despues la pagina serÃ¡ recargada';
var sayfalar 	= 'Paginas de anuncios: ';
var versiyon 	= 'VersiÃ³n';
break;

case 'br':
var basla 		= 'Iniciar';
var temizle		= 'Limpar';
var basladi 	= 'Iniciado.';
var kontrol 	= 'Verificando: ';
var aciliyor	= 'Abrindo janela:';
var tamam 		= 'Pronto. Iniciando o prÃ³ximo';
var beklenniyor = 'Janela aberta. Esperando...';
var bitti1		= 'Todas as propagandas clicadas. ';
var bitti2 		= ' minutos para ler a pÃ¡gina novamente';
var sayfalar 	= 'NÃºmero de Propagandas: ';
var versiyon 	= 'VersÃ£o';
var sonversiyon = 'Verificar nova VersÃ£o';
break;

case 'pl':
var basla	 	= 'Start';
var temizle 	= 'WyczyÅ›Ä‡';
var basladi 	= 'Wystartowano';
var kontrol 	= 'Sprawdzanie: ';
var aciliyor 	= 'Otwieranie:';
var tamam 		= 'SkoÅ„czone. Otwieranie nastÄ™pnej strony.';
var beklenniyor = 'Strona otwarta, proszÄ™ czekaÄ‡...';
var bitti1 		= 'Wszystkie reklamy klikniÄ™te. ';
var bitti2 		= ' minut do odÅ›wierzenia strony.';
var sayfalar 	= 'Strony z reklamami: ';
var versiyon 	= 'Version';
var sonversiyon = 'SprawdÅº czy jest nowa wersja';
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
var basla = 'Ø§Ø¨Ø¯Ø£';
var temizle = 'Ù…Ø³Ø­';
var basladi = 'Ø¨Ø¯Ø£.';
var kontrol = 'Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ£ÙƒÙŠØ¯: ';
var aciliyor = 'Ø§Ù„Ù†Ø§ÙØ°Ù‡ ØªÙØªØ­:';
var tamam = 'ØªÙ… , Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø¨Ø¯Ø¡ Ø¨Ø§Ù„ØªØ§Ù„ÙŠ';
var beklenniyor = 'Ø§Ù„Ø§Ø¹Ù„Ø§Ù† Ù…ÙØªÙˆØ­ , Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø§Ù†ØªØ¸Ø§Ø±.....';
var bitti1 = 'Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø§Ø¹Ù„Ø§Ù†Ø§Øª Ø¶ØºØ·Øª ';
var bitti2 = ' Ø¯Ù‚Ø§Ø¦Ù‚ Ø«Ù… Ø³ÙŠØªÙ… ØªØ­Ø¯ÙŠØ« Ø§Ù„ØµÙØ­Ù‡';
var sayfalar = 'Ø¹Ø¯Ø¯ Ø§Ù„Ø§Ø¹Ù„Ø§Ù†Ø§Øª : ';
var versiyon = 'Ø§Ù„Ù†Ø³Ø®Ù‡';
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