// ==UserScript==
// @name           PI good'ol comments
// @namespace      pi-commenti
// @description    Commenti vecchio stile sia su home page che su pagine delle notizie. By suoranciata http://www.piforum.it/b.aspx?i=3318879&m=3318894#p3318894 
// @include        http://punto-informatico.it/*
// ==/UserScript==
Array.prototype.slice.call(document.querySelectorAll('a')).filter(function(elem) {
    return elem.href.indexOf('#headercommenti') != -1
}).forEach(function(elem) {
    var news_id = ''
    if (window.location.href === 'http://punto-informatico.it/') {
        //home page
        news_id = elem.href.match(/i=(\d+)/)[1]
    } else if (window.location.href.match(/\/(\d+)\/PI/)) {
        //pagina di notizie
        news_id = window.location.href.match(/\/(\d+)\/PI/)[1]
    }
    elem.href = 'http://punto-informatico.it/b.aspx?i=' + news_id
})
