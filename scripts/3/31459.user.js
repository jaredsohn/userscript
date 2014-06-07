// ==UserScript==
// @name           Rapidshare.com Autodownloader / RapidShare.com - nie czekaj na wyświetlenie linku do pobierania pliku
// @description    Auto "Free" click, skip Rapidshare.com counter / Wyświetla bezpośredni link do pobrania pliku bez oczekiwania na upłynięcie czasu licznika
// @namespace      http://wrzutube.pl/
// @include        http://*rapidshare.com/files/*/*
// ==/UserScript==

(function (){

document.getElementById("ff").action += "#dlt";

if (free = document.getElementById("ff")) {
    free.submit();

    return
}

else if ((free = document.getElementsByName("dl.start")) && free[1]) {
    free[1].click();

    return;
}

// alert("Download ready!");
// alert("Please visit Wrzutube.pl! Thanks ;)");

})();