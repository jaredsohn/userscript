// ==UserScript==
// @name           General Bux Script
// @namespace      cwt.stalker
// @email          cwt.stalker@gmail.com
// @description    auto click ads for you in 26bux sites
// @version        0.0551
// @date           25.01.2008
// @sitecounter    26
// @include        http://*advercash.net/adverts.php
// @include        http://*cashwebs.net/adverts.php
// @include        http://*titanclicks.com/adverts.php
// @include        http://*turbobux.com/adverts.php
// @include        http://*bux.to/newsurf.php
// @include        http://*bux3.com/surf.php
// @include        http://*easy.tc/surf.php
// @include        http://*tiserbux.net/surf.php
// @include        http://*earnclick.net/surf.php
// @include        http://*linksbux.com/surf.php
// @include        http://*instantad.org/surf.php
// @include        http://*buxpro.com/surf.php
// @include        http://*daddybux.com/surf.php
// @include        http://*dailyclicks.biz/surf.php
// @include        http://*hits4bux.com/surf.php
// @include        http://*spainbux.com/surf.php
// @include        http://*buxer.org/surf.php
// @include        http://*earn-in.info/viewads.php
// @include        http://*tobux.com/surf.php
// @include        http://*buxa.in/surf.php
// @include        http://*moonbux.com/surf.php
// @include        http://*sebasbux.com/surf.php
// @include        http://*rosebux.com/surf.php
// @include        http://*allstarsbux.com/surf.php
// @include        http://*tugabux.net/surf.php
// @include        http://*masterbux.com/surf.php
// ==/UserScript==

var site=document.domain;
if (site.match(/www./g)){var site=site.replace('www.', '');}


var basari = /success/gi;

GM_setValue('baslat',1);
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
var tamam	    = 'Tamamlandı. bir sonrakine geciliyor..';
var beklenniyor = 'Pencere acildi, bekleniyor...';
var bitti1   	= 'Tum sayfalara gidildi. ';
var bitti2      = ' dakika içinde sayfa yenilenecek';
var sayfalar    = 'Gidilecek sayfalar: ';
var versiyon    = 'Versiyon 0.0551';
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
var versiyon    = 'Version 0.0551';
}

switch(site)
{
case 'advercash.net':
var surfTable = "/html/body/table";
var linksx = '//td/a';
var basari = /finished/gi;
var ac = '87';
break;

case 'titanclicks.com':
var surfTable = "/html/body/table";
var linksx = "//td/center/a";
var basari = /finished/gi;
var ac = '42';
break;

case 'cashwebs.net':
var surfTable = "/html/body/table";
var linksx = "//td/center/a";
var basari = /finished/gi;
break;

case 'turbobux.com':
var surfTable = "/html/body/table";
var linksx = "//td/center/a[@target='_blank']";
var basari = /finished/gi;
break;

case 'bux.to':
var surfTable = "/html/body/table";
var linksx = "//td[@class='class2']/span/a";
break;

case 'bux3.com':
var surfTable = "/html/body/table";
var linksx = '//td[@class="class2"]/span/a';
break;

case 'easy.tc':
var surfTable = "/html/body/center/table";
var linksx = '//td[@class="class2"]/span/a';
break;

case 'tiserbux.net':
var surfTable = "/html/body/div";
var linksx = "//tbody/tr/td/a";
break;

case 'earnclick.net':
var surfTable = "/html/body/center";
var linksx = '//td/font/b/a';
break;

case 'linksbux.com':
var surfTable = "/html/body/center";
var linksx = '//tbody/tr/td/font/a';
break;

case 'instantad.org':
var surfTable = "/html/body/div"; 
var linksx = "//td/font/b/a[@target='_blank']";
break;

case 'buxpro.com':
var surfTable = "/html/body/center";
var linksx = "//a";
break;

case 'daddybux.com':
var surfTable = "/html/body/center";
var linksx = "//a";
break;

case 'dailyclicks.biz':
var surfTable = "/html/body/center";
var linksx = "//td[@width='70%']/font/a";
var linksx2= "//td[@width='70%']/font/b/a";
break;

case 'hits4bux.com':
var surfTable = "/html/body/div";
var linksx = "//th/a";
break;

case 'spainbux.com':
var surfTable = "/html/body/div";
var linksx = "//a[@target='_blank']";
break;

case 'buxer.org':
var surfTable = "/html/body/div";
var linksx = "//a[@target='_blank']";
break;

case 'earn-in.info':
var surfTable = "/html/body/table[@width='100%']";
var linksx = "//td/a[@target='_blank']";
var basari = /finished/gi;
var kont1=/adclick/;
break;

case 'tobux.com':
var surfTable = "/html/body/center";
var linksx = "//a[@target='_blank'] ";
break;

case 'buxa.in':
var surfTable = "/html/body/table";
var linksx = "//a[@target='_blank']";
var ac = '-1'
break;

case 'moonbux.com':
var surfTable = "/html/body/div";
var linksx = "//a[@target='_blank']";
break;

case 'sebasbux.com':
var surfTable = "/html/body/div";
var linksx = "//td/font/b/a";
break;

case 'rosebux.com':
var surfTable = "/html/body/div";
var linksx = "//td/font/b/a";
break;

case 'allstarsbux.com':
var surfTable = "/html/body/div";
var linksx = "//th/b/a";
break;

case 'tugabux.net':
var surfTable = "/html/body/center";
var linksx = "//a[@target='_blank']";
break;

//Evola's Sites

case 'masterbux.com':
var surfTable = "/html/body/div";
var linksx = "//tbody/tr/th/a[@target='_blank']";
break;


case 'paidbux.org':
var surfTable = "/html/body/div/";
var linksx = "//tr/th/a[@target='_blank']";
break;


}

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
	
	surf.parentNode.insertBefore(container, surf);

	startSurf();
	
	
//Fonksiyonlar
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
		if(frame.contentWindow.location.href.match(basari))
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
	
	var links2= document.evaluate(linksx2, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i=0;i<links2.snapshotLength;i++){
		var item = links2.snapshotItem(i);
	//Anti Anti Cheat
	if (aac(item) && filtre(item)){work.push(item);}
	}
	
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
	debug(sayfalar +'('+ links.length +') '+ links);
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