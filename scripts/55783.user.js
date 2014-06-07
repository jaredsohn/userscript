// ==UserScript==
// @name           VkSound
// @namespace      http://vkontakte.ru/audio
// @include        http://vkontakte.ru/*
// ==/UserScript==

i18n = {0: 'Скачать', 1: 'Завантажити', 2: 'Загрузіць', 3: 'Download', 777: 'Схоронить'};
window.download_i18n = i18n[document.cookie.match( /remixlang=(\d+)/ )[1]];

window.dowork = function() {
    elements = document.getElementsByClassName('playimg');
    if ( !elements[0].className.match( 'downloadable' ) )
        for ( i=0; i<elements.length; i++ )
        {
            e = elements[i];
            r = e.getAttribute('onclick').match( /ate(?:Wall)?\((\d+)\,(\d+)\,(\d+)\,'([\d\w]+)'\,(\d+)/ );
            if ( !r ) continue;
            c = e.parentNode.parentNode.childNodes[2] ? 2 : 1; //opera hack
            e.parentNode.parentNode.childNodes[c].innerHTML += '<br/><a href="http://cs'+r[2]+'.vkontakte.ru/u'+r[3]+'/audio/'+r[4]+'.mp3">'+window.download_i18n+'</a>';
            e.className += ' downloadable';
        }
    setTimeout( function(){ window.dowork(); }, 1000 );
}
window.dowork();