// ==UserScript==
// @name           FFXII Revenant Wings Wiki
// @namespace      http://userscripts.org/users/133248
// @description    Translates the FFXII wiki
// @include        *ff12rwwiki.com/*
// @include        http://translate.google.com/translate?hl=en&langpair=ja|en&u=http://ff12rwwiki.com/index.php?%A5%AF%A1%BC%A5%B7%A1%BC%A4%CE%BC%C1%CC%E4
// ==/UserScript==


var el, els;
els = document.getElementsByTagName('td');
for (var i = 0; i < els.length; i++) {
    el = els[i];
    if (el.innerHTML.match(/305-0047|101-8430|261-8545|Four|Force|Magic|Activity|Ma|Early|Tues|Wed|Sat/)) {
      el.innerHTML=el.innerHTML.replace('305-0047','1-2-1').replace('101-8430','2-1-2').replace('261-8545','3-2-2').replace('Four','4').replace('Force','Str').replace('Magic','Mgk').replace('Activity','Sta').replace('Ma','Mnd').replace('Early','Spd').replace('Tues','Fire').replace('Wed','Water').replace('Sat','Earth');
    }
}
