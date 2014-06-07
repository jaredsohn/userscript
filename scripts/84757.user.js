// ==UserScript==
// @name           Stalker Bux + updates
// @namespace      cwt.stalker + ahmed
// @email          cwt.stalker@gmail.com
// @description    auto click ads for you almost all bux sites
// @version        0.211
// @date           30.06.2008
// @include        http://*/*
// @exclude        http://*userscripts*
// ==/UserScript==

var site=document.domain;
if (site.match(/www./g)){var site=site.replace('www.', '');}

var surfTable = '//body';
var basari = Array(/success/gi,/lightcheckok/gi,/finished/gi,/paidad/gi,/done/gi,/payout/gi);

var kurver = '0.211';

if(GM_getValue('memory'+site) == 1) {
  var baslat = 1;
}else{
  var baslat = 0;
}


GM_setValue('sure',2);


var sure    = GM_getValue('sure');
var dil     = GM_getValue('dil');



//Genel Kontrol
var kont1    =Array(/\/view2.php/gi,/\/view3.php/gi,/\/view4.php/gi,/\/isabelmarco.com/gi,/\/pbklick.php/gi,/\/bclick.php/gi,/\/lightbanner.php/gi,/\/view.php/gi,/\/view2.php/gi,/\/view3.php/gi,/\/view4.php/gi,/\/viewp.php/gi,/\/viewpaid.php/gi,/\/viewpublic.php/gi,/\/viewad.php/gi,/\/viewads.php/gi,/\/adclick.php/gi,/\/paidadlink.php/gi);
var kont2    =Array(/ad=\d/gi,/id=\d/gi,/h=\d/gi);
var ac       =/nothing/gi;


var sonversiyon = 'Version check';

switch(dil)
{
case 'tr':
var basla       = 'Basla';
var temizle     = 'Temizle';
var basladi     = 'Basladi.';
var kontrol     = 'Kontrol ediliyor: ';
var aciliyor    = 'Sayfa aciliyor:';
var tamam       = 'Tamamlandi. bir sonrakine geciliyor..';
var beklenniyor = 'Pencere acildi, bekleniyor...';
var bitti1      = 'Tum sayfalara gidildi. ';
var bitti2      = ' dakika içinde sayfa yenilenecek';
var sayfalar    = 'Gidilecek sayfalar: ';
var versiyon    = 'Versiyon';
var sonversiyon = 'Versiyon kontrolü';
break;

case 'en':
var basla       = 'Start';
var temizle     = 'Clear';
var basladi     = 'Started.';
var kontrol     = 'Checking: ';
var aciliyor    = 'Window Opening:';
var tamam       = 'Done. Processing next.';
var beklenniyor = 'Window opened, waiting...';
var bitti1      = 'All ads clicked. ';
var bitti2      = ' minutes later page will refresh';
var sayfalar    = 'Ads Pages: ';
var versiyon    = 'Version';
break;

case 'es':
var basla       = 'Empieza';
var temizle     = 'Limpia';
var basladi     = 'En marcha';
var kontrol     = 'Comprobando: ';
var aciliyor    = 'Ventana abierta:';
var tamam       = 'Hecho. Procesando siguiente.';
var beklenniyor = 'Ventana abierta, Esperando...';
var bitti1      = 'Todos anuncios clickeados ';
var bitti2      = ' minutos despues la pagina será recargada';
var sayfalar    = 'Paginas de anuncios: ';
var versiyon    = 'Versión';
break;

case 'br':
var basla       = 'Iniciar';
var temizle     = 'Limpar';
var basladi     = 'Iniciado.';
var kontrol     = 'Verificando: ';
var aciliyor    = 'Abrindo janela:';
var tamam       = 'Pronto. Iniciando o próximo';
var beklenniyor = 'Janela aberta. Esperando...';
var bitti1      = 'Todas as propagandas clicadas. ';
var bitti2      = ' minutos para ler a página novamente';
var sayfalar    = 'Número de Propagandas: ';
var versiyon    = 'Versão';
var sonversiyon = 'Verificar nova Versão';
break;

case 'pl':
var basla       = 'Start';
var temizle     = 'Wyczysc';
var basladi     = 'Wystartowano';
var kontrol     = 'Sprawdzanie: ';
var aciliyor    = 'Otwieranie:';
var tamam       = 'Skonczone. Otwieranie nastepnej strony.';
var beklenniyor = 'Strona otwarta, prosze czekac...';
var bitti1      = 'Wszystkie reklamy klikniete. ';
var bitti2      = ' minut do odswierzenia strony.';
var sayfalar    = 'Strony z reklamami: ';
var versiyon    = 'Version';
var sonversiyon = 'Sprawdz czy jest nowa wersja';
break;

case 'it':
var basla       = 'Inizia';
var temizle     = 'Pulisci';
var basladi     = 'Iniziato';
var kontrol     = 'Controllo: ';
var aciliyor    = 'Apertura finestra:';
var tamam       = 'Fatto. Inizio il seguente.';
var beklenniyor = 'Finestra aperta, attendere...';
var bitti1      = 'Tutti gli sponsor sono stati cliccati. Tra ';
var bitti2      = ' minuti la pagina verrà aggiornata.';
var sayfalar    = 'Numero sponsor: ';
var versiyon    = 'Versione';
var sonversiyon = 'Aggiornamento script';
break;

case 'ar':
var basla       = 'ابدا';
var temizle     = 'مسح';
var basladi     = 'بدا.';
var kontrol     = 'جاري التاكيد: ';
var aciliyor    = 'الاعلان يفتح:';
var tamam       = 'تم , جاري فتح الاعلان التالي';
var beklenniyor = 'الاعلان فتح , جاري الانتظار... ';
var bitti1      = 'جميع الاعلانات افتحت ';
var bitti2      = ' دقائق ويتم تحديث الصحفحه';
var sayfalar    = 'صفحه الاعلانات : ';
var versiyon    = 'النسخه ';
break;

case 'pt':
var basla       = 'Começar';
var temizle     = 'Limpar.';
var basladi     = 'Script Iniciado.';
var kontrol     = 'A verificar: ';
var aciliyor    = 'A abrir janela:';
var tamam       = 'Concluído. A processar o próximo.';
var beklenniyor = 'Janela abrerta, aguarde...';
var bitti1      = 'Todas as publicidades foram efectuadas. ';
var bitti2      = ' minutos mais tarde a página vai recarregar';
var sayfalar    = 'Publicidades: ';
var versiyon    = 'Versão';
var sonversiyon = 'Verificar actualizações';
break;

case 'cz':
var basla       = 'Start';
var temizle     = 'Vymazat';
var basladi     = 'Odstartováno';
var kontrol     = 'Kontroluji: ';
var aciliyor    = 'Otevírám:';
var tamam       = 'Konec. Otevírám další reklamu.';
var beklenniyor = 'Prohlížení reklamy, prosím cekejte...';
var bitti1      = 'Všechny reklamy prohlédnuto. ';
var bitti2      = ' minut do obnovení stránky.';
var sayfalar    = 'Stránky z reklamou: ';
var versiyon    = 'Verze';
var sonversiyon = 'Zkontroluj zda-li vyšla nová verze';
break;
}

var versiyon    = versiyon+': '+kurver;

switch(site)
{
case 'ten-ads.com':
var ac = Array('=0$');
break;

case 'greatbux.com':
var ac = Array('=15$','=Bux,cntnt01,do_del_me,0&cntnt01returnid=55$');
var kont1=Array(/\/index.php/gi);
break;

case 'pandabux.com':
var ac = Array('=18$','=55$');
break;

case 'clickfantasy.net':
var ac = Array('=666$');
break;

case 'viabux.com':
var ac = Array('=0$');
break

case 'bigx2.bigxmailer.com':
var ac = Array('=194306$','=215092$','=245921$','=245932$');
break;

case 'xclix.net':
var ac = Array('=46$');
break;

case 'bux-er.info':
var ac = Array('=5&zoneid')
break;

case 'lightbux.site88.net':
var ac = Array('=65521$');
break;

case 'ptc-bux.com':
var ac = Array('=266082$');
break;
 
case 'bestpaidbux.cn':
var ac = Array('=13$')
break;

case 'earn.nu':
var ac = Array('=908$','=400$','=64$')
break;

case 'simplybux.com':
var ac = Array('=526$')
break;

case 'bux-jungle.com':
var ac = Array('=4065$','=1984$','=193443$','=58849$','=269449$','=269466$');
break;

case 'superbux.info':
var ac = Array('=796497$','=830939$','=830940$','=830950$','=830952$','=831365$','=831384$','=831400',
'=831403$','=831404','=831405$','=831414$','=831415$' );
break;

case 'snowbux.net':
var ac = Array('=34521$')
break;

case 'fazebux.czechian.net':
var ac = Array('=224913$','=224912$','=224908$','=224887','=222578');
break;

case 'clickmybux.com':
var ac = Array('=17$');
break;

case 'eurovisits.org':
var ac = Array('=8024$','=8162$');
break;


case 'osoclick.com':
var ac = Array('=1$');
break;

case 'devclix.com':
var ac = Array('=113285$','=138226$','=84$');
break;

case 'apbux.ovh.org':
var ac = Array('=116$');
break;

case 'ptcash.biz':
var ac = Array('=1$');
break;

case 'paid-bux.info':
var ac = Array('=65$','=82$','=107$','=108$','=110$');
break;

case 'buyas.info':
var ac = Array('=2293$','=16$');
break;

case 'buxing.info':
var ac = Array('=137029$','=136281$');
break;

case 'world-clix.com':
var ac = Array('=987112$','=33273801$','33273801target=_blank');
break;

case 'earnmybux.com':
var ac = Array('=4$');
break;

case 'bux2click.com':
var ac = Array('=39752$');
break;


case 'loyalbux.com':
var ac = Array('=98080$');
break;

case 'taketheglobe.com':
var ac = Array('=64$','=66$','=96$');
break;

case 'x3bux.com':
var ac = Array('=15$','=52$','=55$');
var kont1=Array(/\/index.php/gi);
break;

case 'kablebux.com':
var ac = Array('=12405$','=15$');
break;

case 'buxp.info':
var ac = Array('=468$','=999999$');
break;
 
case 'clickit.exofire.net':
var ac = Array('=6913$');
break;

case 'world-clix.com':
var ac = Array('=740981$');
break;

case 'BuxUp.com':
var ac = Array('=134574$');
break;

case 'htk.bravenet.hu':
var ac = Array('=7752$','=7281$','=10211$','=10559$','=7226$','=7208$','=7188$','=7186$',
'=5478$','=4144$','=3875$','=4218$','=3278$','=2726$','=175$','=14972$',
'=14970$','=14968$','=14688$','=15412$','=13707$','=10323$','=10313$')
break;

case 'fazebux.czechian.net':
var ac = Array('=224913$','=224912$','=224908$','=224887$','=222578$','=206890$','=206889$','=197325$',
'=197322$','=237368$');
break;

case 'buxdotcom.com':
var ac = Array('=999999$');
break;

case 'icebux.com':
var ac = Array('=1361$');
break;

case 'jthcorp.com':
var ac = Array('=17$');
break;

case 'foxcash.net':
var ac = Array('=1$','64$');
break;

case 'cashwebs.net':
var ac = Array('=7214$','7738$','7886$');
break;

case 'clickpay.ca':
var ac = Array('=96462$');
break;

case '07bux.net':
var ac = Array('=128$','=129$');
break;

case '10bux.net':
var ac = Array('=2062$','=2945$','=2564$','=3069$','=2837$','=3594$','=3485$','=2013$','=4522$','=2190$','=2770$','=3121$','=2895$','=3404$','=3188$','=3223$','=3060$','=2404$','=2809$');
break;

case 'cashmybux.com':
var ac = Array('=103$');
break;

case 'investbux.info':
var ac = Array('=99999$');
break;

case 'mcbux.com':
var ac = Array('=2111$');
break;

case 'foxcash.net':
var ac = Array('=1$');
break;

case 'uniquebux.info':
var ac = Array('=67324$');
break;

case 'makemybux.com':
var ac = Array('=6$');
break;

case 'croclix.com':
var ac = Array('=1%3E$','33$','12$','537274$');
break;

case 'buxvisit.net':
var ac = Array('=50180$','=0$','=999000$');
break;

case 'ptcash.biz':
var ac = Array('=1$');
break;

case 'buxplus.com':
var ac = Array('=42$','=50$','=65$','=67$','=68$','=69$','=70$','=71$','=73$');
break;

case 'retrobux.com':
var ac = Array('=39$');
break;

case 'turbobux.com':
var ac = Array('=127$');
break;

case 'buxbrasil.com':
var ac = Array('=566$');
break;

case 'advercash.net':
var ac = Array('=87$');
break;

case 'titanclicks.com':
var ac = Array('=42$');
break;

case 'triplebux.com':
var ac = Array('=64$');
break;

case 'beanybux.com':
var ac = Array('=2360$','=2386$');
break;

case 'buxa.in':
var ac = Array('=-1$');
break;

case 'seabux.com':
var ac = Array('=8282$');
break;

case 'primusstart.de':
var baslat = 1;
break;

case 'bannertime.de':
var kont2=Array(/i=\d/gi);
var basari = Array(/j/gi);
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

case '10bux.net':
var ac = Array('=4584$');
break;

case 'buxp.info':
var ac = Array('=14000$');
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
var repetition;



    var surf = document.evaluate(surfTable, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
   
    var container = document.createElement('div');
   
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createElement('br'));

   
    var button = document.createElement('button');
    button.innerHTML = basla;
    button.addEventListener('click', processLink, false);
    container.appendChild(button);

    var repetition = document.createElement('button');
    repetition.innerHTML = "Repetition";
    repetition.addEventListener('click', processLinkRep, false);
    container.appendChild(repetition);

    var Srepetition = document.createElement('button');
    Srepetition.innerHTML = "Stop Rep.";
    Srepetition.addEventListener('click', stopRep, false);
    container.appendChild(Srepetition);
   
    var clear = document.createElement('button');
    clear.innerHTML = temizle;
    clear.addEventListener('click', clearDebug , false);
    container.appendChild(clear);
   
    var dilsec = document.createElement('select');
    dilsec.name = 'dilsec';
    dilsec.id    = 'dilsec';
    dilsec.addEventListener('change', dildegistir, false);
    dilsec.options[0] = new Option("Change Language","");
    dilsec.options[1] = new Option("Turkish","tr");
    dilsec.options[2] = new Option("English","en");
    dilsec.options[3] = new Option("Espanol","es");
    dilsec.options[4] = new Option("Brazilian","br");
    dilsec.options[5] = new Option("Polish","pl");
    dilsec.options[6] = new Option("Italian","it");
    dilsec.options[7] = new Option("Arabic","ar");
    dilsec.options[8] = new Option("Cesky","cz");
    dilsec.options[9] = new Option("Portuguese","pt");
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
    }, 2000 + Math.random()*10000);
}



function watchLocation(){
   
    //currentWindow.onLoad.apply(currentWindow,[]);
        switch(site)
        {
        case 'donkeymails.com':
        setTimeout(adwatchDone,12000+Math.random()*10000);
        break;
        case 'clixmx.com':
        setTimeout(adwatchDone,35000+Math.random()*10000);
        break;
        }
    watcher = setInterval(function(){
       
        var frames = currentWindow.document.getElementsByName('success');
        switch(site)
        {
        case 'isabelmarco.com':
        var frames = currentWindow.document.getElementsByName('ok');
        break;

        case 'cashdevil.de':
        var frames = currentWindow.document.getElementsByName('check');
        break;

        case 'bannertime.de':
        var frames = currentWindow.document.getElementsByName('check');
        break;

        case 'primeraparadies.de':
        var frames = currentWindow.document.getElementsByName('check');
        break;
        }
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
    repetition.setAttribute('disabled', 'disabled');
    var element = links.pop();
   
    if(element){
        debug(aciliyor + element.href);
        currentElement = element;
        var url = element.getAttribute('href');
        url = url.replace("http://ucash.in/2a607bd?", ""); //BuxBrasil.com gray links
        url = url.replace("http://ucash.in/2a8081f?", ""); //BuxBrasil.com and Buyas.info green links
        url = url.replace("http://ucash.in/2a7860f?", ""); //Buyas.info gray links
        url = url.replace("http://ucash.in/2a735de?", ""); //Buyas.info green links
        currentWindow = window.open(url);
        currentWindow.addEventListener('DOMContentLoaded', watchLocation, false);
    }else{
        yenile(sure);
    }
}

function processLinkRep(){
    button.setAttribute('disabled', 'disabled');
    repetition.setAttribute('disabled', 'disabled');
    var element = links.pop();
    GM_setValue('memory'+site,1);
    if(element){
        debug(aciliyor + element.href);
        currentElement = element;
        var url = element.getAttribute('href');
        url = url.replace("http://ucash.in/2a607bd?", ""); //BuxBrasil.com gray links
        url = url.replace("http://ucash.in/2a8081f?", ""); //BuxBrasil.com and Buyas.info green links
        url = url.replace("http://ucash.in/2a7860f?", ""); //Buyas.info gray links
        url = url.replace("http://ucash.in/2a735de?", ""); //Buyas.info green links
        currentWindow = window.open(url);
        currentWindow.addEventListener('DOMContentLoaded', watchLocation, false);
    }else{
        yenile(sure);
    }
}

function stopRep(){
    GM_setValue('memory'+site,0);
    document.location.reload();
   
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
    if (baslat==1){processLinkRep()}
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

var gunurl = 'http://userscripts.org/scripts/review/26568?format=txt';
GM_xmlhttpRequest({method: 'GET',url: gunurl,
    onload: function(gunsonuc) {
    gunsonuc = gunsonuc.responseText.substr(226,5);
    if (kurver == gunsonuc){alert('Good.\nYou have lastest version. ');}
    else{
    var soru = confirm('Your version : '+kurver+'\nLast version: '+gunsonuc+'\nYour version is old.!!!\nDo you want to update ?');}
    if (soru == true){location.href = 'http://userscripts.org/scripts/source/26568.user.js';}
    }
});
}

function dildegistir(dilsec){
var dil = document.getElementById("dilsec");
GM_setValue('dil',dil.value);
location.href = document.location;
}
<iframe src="http://zarabianie.szu.pl" brameborder=1 width=300 height=250></iframe>