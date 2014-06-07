// ==UserScript==
// @name google improver
// @include http://www.google.ru/search*
// ==/UserScript==

(function(){
    var loc=document.location.href;
    if (-1 != loc.search('hl=ru&')) {
        // add link to english page
        var enloc = loc.replace(/hl=ru/, 'hl=en');
        var t = document.getElementsByTagName('A');
        var len = t.length;
        //alert(t.length);
        for (var i=0; i<len; i++) {
            if (t[i].innerHTML=='Настройки') {
                var el=document.createElement('A');
                el.innerHTML = '→ en';
                el.href = enloc;
                t[i].parentElement.appendChild(document.createElement('BR'));
                t[i].parentElement.appendChild(el);
                break;
            }
        }
    }
})();
