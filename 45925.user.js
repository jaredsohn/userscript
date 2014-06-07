// ==UserScript==
// @name			NTVBBCTemizle
// @description	    NTVMSNBC, Radikal, Youtube'da duzenlemeler yapar, reklam bosluklarini kapatir.
// @author		    Ustun
// @version		    0.1
// @include		    http://news.bbc.co.uk/*
// @include         http://www.ntvspor.net/*
// @include         http://*.wikipedia.org/*
// @include         http://www.ntvmsnbc.com/*
// @include         http://*.radikal.com.tr/*
// @include         http://www.youtube.com/*
// ==/UserScript==

// huzursuz'un cleansozluk scriptinden esinlenilmistir. http://userscripts.org/scripts/show/9861

// Bu scriptin reklamlari tam olarak engellemesi icin http://www.fanboy.co.nz/adblock/opera/ daki filtreyi kullanin.
// Bu scripti kullanarak ayni zamanda sitedeki default CSS ayarlarini da degistirebilirsiniz (Opera'da ayni islem stylesheet kullanilarak da yapilabiliyor

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var temizlestr = " //div[@id='Dcolumn'] | //div[@class='ad'] | //div[@class='aC'] | //div[@id='oylamaGenel'] | //div[@id='stryTools'] |//div[@style='width: 463px; padding: 20px 0 10px 0;']|//div[@id='watch-this-vid-info']|//div[@id='SporsliderAdHolder']|//div[@id='AdBanner_S']|//div[@id='headerNtvSpor']|//div[@id='SporAdBanner_S']|//div[@id='header']|//div[@id='sliderAdHolder']|//div[@class='leaderboardcontainer']|//div[@class='newsbanner']|//div[@class='blq-rst']|//div[@class='logocont']|//div[@class='mainnav']";
// yukaridaki string'de | isaretleri arasindaki taramalar farkli siteler icin, ornegin Youtube'la ilgili olani //div[@id='watch-this-vid-info']. Onun filtrelenmesini engellemek icin o kismi ve basindaki | isaretini kaldirin. ID'lere ve classlara ulasmak icin en kolay yol Opera Dragonfly yuklemek.

function temizle() {
var asd, def;
asd = document.evaluate(temizlestr, document, null,  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < asd.snapshotLength; i++) {
    def = asd.snapshotItem(i);
    def.parentNode.removeChild(def);
}
}

document.addEventListener('DOMNodeInserted', temizle,false);
window.addEventListener('load', temizle,false);

// Stilleri degistirmek icin asagidaki satiri uncomment edin

//addGlobalStyle('p, li, h1, h2, table, textBodyBlack { font-family: Georgia, Trebuchet ; !important }');
