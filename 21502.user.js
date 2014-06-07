// ==UserScript==
// @name           PetersBux
// @namespace      Piotr1
// @email          pzduniak@o2.pl
// @description    Bux AutoClicker and CounterDown in one
// @version        0.0.2
// @date           26.01.2008
// @include        http://*/*surf*
// @include        http://*/*adverts*
// @include        http://*/*viewads*
// ==/UserScript==

var site=document.domain;
if (site.match(/www./g)){var site=site.replace('www.', '');}

var surfTable = '//body';
var basari = /success/gi;
var basari2= /finished/gi;

GM_setValue('baslat',0);
GM_setValue('sure',5);
GM_setValue('dil','en');

var baslat	= GM_getValue('baslat');
var sure	= GM_getValue('sure');
var dil		= GM_getValue('dil');



//Genel Kontrol
var kont1=/view/;
var kont2=/ad/;
var kont3=/=\d/;
var ac	 =/nothing/;

switch(dil)
{
case 'tr':
var basla	    = 'Basla';
var temizle     = 'Temizle';
var basladi     = 'Basladi.';
var kontrol     = 'Kontrol ediliyor: ';
var aciliyor    = 'Sayfa aciliyor:';
var tamam	    = 'TamamlandĹ. bir sonrakine geciliyor..';
var beklenniyor = 'Pencere acildi, bekleniyor...';
var bitti1   	= 'Tum sayfalara gidildi. ';
var bitti2      = ' dakika içinde sayfa yenilenecek';
var sayfalar    = 'Gidilecek sayfalar: ';
var versiyon    = 'Versiyon 0.02';
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
var versiyon    = 'Version 0.02';
break;

case 'es':
var basla = 'Empieza';
var temizle = 'Limpia';
var basladi = 'En marcha';
var kontrol = 'Comprobando: ';
var aciliyor = 'Ventana abierta:';
var tamam = 'Hecho. Procesando siguiente.';
var beklenniyor = 'Ventana abierta, Esperando...';
var bitti1 = 'Todos anuncios clickeados ';
var bitti2 = ' minutos despues la pagina serå recargada';
var sayfalar = 'Paginas de anuncios: ';
var versiyon = 'Versión 0.02';
break;
}

switch(site)
{
case 'turbobux.com':
var ac = '517';
break;

case 'advercash.net':
var ac = '87';
break;

case 'titanclicks.com':
var ac = '42';
break;

case 'earn-in.info':
var kont1=/adclick/;
break;

case 'buxa.in':
var ac = '-1'
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
	
	//var dilsec = document.createE

	var ver = document.createElement('button');
	ver.innerHTML = versiyon;
	ver.setAttribute('disabled', 'disabled');
	container.appendChild(ver);
		
	container.appendChild(document.createElement('br'));
	
	var progress = document.createElement('textarea');
	progress.style.width = "100%";
	progress.style.height = "20em";
	progress.setAttribute('readonly', 'true');
	container.appendChild(progress);

	surf.parentNode.insertBefore(container,surf);

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
		if(frame.contentWindow.location.href.match(basari) || frame.contentWindow.location.href.match(basari2))
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
	if (links ==''){yenile(sure);}
	else
	{
	debug(sayfalar +'('+ links.length +') ');
	for(var i=0;i<links.length;i++){
	s=i+1;
	debug('('+s+') '+links[i]);
	}
	links.reverse();
	if (baslat==1){
	processLink();}
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
		
	var kon1=new RegExp(kont1);
	var kon2=new RegExp(kont2);
	var kon3=new RegExp(kont3);
	var k1=kon1.test(baglanti);
	var k2=kon2.test(baglanti);
	var k3=kon3.test(baglanti);

	if (k1 && k2 && k3){return true;}
	else {return false;}
}

function aac(baglanti){
	var konaac=new RegExp(ac);
	var kaac=konaac.test(baglanti);
	if(kaac){return false;}
	else {return true;}
}
unsafeWindow.x = 1;