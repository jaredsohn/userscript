// ==UserScript==
// @name            Kemychan DC navbar
// @description     Aggiunge link delle board di DC alla navbar
// @namespace       kemychan.tk
// @include         http://*kemychan.tk/*
// ==/UserScript==
//
// --------------------------------------------------------------------
// COSA FA:
//
// www.kemychan.tk:
// - aggiunge dei tasti aggiuntivi alla navbar in alto che linkano alle board di diochan
//
// www.diochan.com:
// - qualcosina quando avrò sbatta


var navbar, DCnavbar, DCnavbar2;
navbar = document.getElementsByClassName('navbar').item(1);	//non è che qui mi serve un .item(0) ??
if (navbar) {

DCnavbar = document.createElement("div");
DCnavbar.innerHTML = '<div class="navbar"> ' +
    '[ ' +
    '<a title="International" href="/int/">int</a> /  ' +
    '<a title="Sexy Beautiful Women" href="/s/">s</a> /  ' +
    '<a title="Helpdesk" href="/hd/">hd</a> /  ' +
    '<a title="Hentai" href="/h/">h</a> ' +
    ' ' +
    ' ] ' +
    '[ ' +
    ' ' +
    '<a title="Anime &amp; Manga" href="/a/">a</a> /  ' +
    '<a title="Videogiochi" href="/v/">v</a> /  ' +
    '<a title="8-bit" href="/8bit/">8-bit</a> /  ' +
    '<a title="Fumetti &amp; Cartoni" href="/co/">co</a> /  ' +
    '<a title="Film" href="/film/">film</a> ' +
    ' ' +
    ' ] ' +
    '[ ' +
    '<a title="Cucina" href="/ck/">ck</a> /  ' +
    '<a title="Musica" href="/mu/">mu</a> /  ' +
    '<a title="Scienza &amp; Tecnologia" href="/sci/">sci</a> /  ' +
    '<a title="Politica &amp; Notizie" href="/pol/">pol</a> ' +
    ' ' +
    ' ] ' +
    '[ ' +
    '<a title="Oekaki/disegni" href="/o/">o</a> /  ' +
    '<a title="Scrittura" href="/scr/">scr</a> ' +
    ' ' +
    ' ] ' +
    '[ ' +
    '<a title="RapidShare" href="/rs/">rs</a> ' +
    ' ' +
    ' ] ' +
    ' ' +
    '</div>';
navbar.parentNode.insertBefore(DCnavbar, navbar);
}

navbar = document.getElementsByClassName('navbar').item(0);	//non è che qui mi serve un .item(0) ??
if (navbar) {

DCnavbar2 = document.createElement("div");
DCnavbar2.innerHTML = '<div class="navbar"> ' +
    '[ ' +
    '<a title="International" href="/int/">int</a> /  ' +
    '<a title="Sexy Beautiful Women" href="/s/">s</a> /  ' +
    '<a title="Helpdesk" href="/hd/">hd</a> /  ' +
    '<a title="Hentai" href="/h/">h</a> ' +
    ' ' +
    ' ] ' +
    '[ ' +
    ' ' +
    '<a title="Anime &amp; Manga" href="/a/">a</a> /  ' +
    '<a title="Videogiochi" href="/v/">v</a> /  ' +
    '<a title="8-bit" href="/8bit/">8-bit</a> /  ' +
    '<a title="Fumetti &amp; Cartoni" href="/co/">co</a> /  ' +
    '<a title="Film" href="/film/">film</a> ' +
    ' ' +
    ' ] ' +
    '[ ' +
    '<a title="Cucina" href="/ck/">ck</a> /  ' +
    '<a title="Musica" href="/mu/">mu</a> /  ' +
    '<a title="Scienza &amp; Tecnologia" href="/sci/">sci</a> /  ' +
    '<a title="Politica &amp; Notizie" href="/pol/">pol</a> ' +
    ' ' +
    ' ] ' +
    '[ ' +
    '<a title="Oekaki/disegni" href="/o/">o</a> /  ' +
    '<a title="Scrittura" href="/scr/">scr</a> ' +
    ' ' +
    ' ] ' +
    '[ ' +
    '<a title="RapidShare" href="/rs/">rs</a> ' +
    ' ' +
    ' ] ' +
    ' ' +
    '</div>';
navbar.parentNode.insertBefore(DCnavbar2, navbar);
}