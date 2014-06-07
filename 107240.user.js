// ==UserScript==
// @name        Zpovednice
// @version     2011-07-28
// @description A few improvements of a popular Czech site zpovednice.cz.
// @namespace   zpovednice
// @include     http://zpovednice.cz/*
// @include     http://*.zpovednice.cz/*
// ==/UserScript==

// redirect www.zpovednice.cz to zpovednice.cz
if (location.hostname.substr(0, 4) == 'www.') {
    return location.replace(location.href.replace(/www\./, ''));
}

var page = location.pathname.replace(/^\/*/, '').replace(/^admin\/|\/*$|\.php$/g, '');
var link = 'http://zpovednice.cz/detail.php?statusik=';

// redirect after form processing
form = document.forms.namedItem('formular');

if (page == 'souhlasr' && typeof form != 'undefined') {
    form.action += '?return=' + form.elements.namedItem('ciselko').value;
}
else if (page == 'kontrolr' && location.search.indexOf('return') != -1) {
    return location.replace(link + location.search.match(/return=(\d+)/)[1]);
}

// fix the insane title
document.title = document.title.replace(/\.*ZPOVĚDNICE\.*:*www\.zpovednice\.cz:*\.*/, '— Zpovědnice').replace(/^— /, '');

// improve CSS
var css = '* {font-family: "Trebuchet MS", "Geneva CE", lucida, sans-serif !important;}\
    #search {position: absolute; top: 18px; left: 50%; margin-left: -55px;}\
    #search input[type=text] {width: 250px;}\
    #search input[type=submit] {margin-left: 25px;}';

if (['detail', 'profil', 'souhlasr', 'kontrolr', 'vlastnizp', 'editace2', 'stat', 'prehleds', 'pokladna', 'dotazy', 'kniha', 'online'].indexOf(page) != -1) {
    css += '.absoltext, .conftext, .guesttext {font-size: 100% !important;}\
    .absoltext a, .conftext a, .guesttext a, .confheader a {text-decoration: underline;}\
    .signnick a, .infolmenu a {text-decoration: none;} #search {top: 42px;}\
    tr:first-child .infoblock, .style1, body > div > table:nth-last-of-type(1), body > div > table:nth-of-type(2),\
    body > div > table:nth-of-type(3) > tbody > tr:nth-of-type(1),\
    body > div > table:nth-of-type(3) > tbody > tr:nth-of-type(2) > td:nth-last-of-type(-n+2),\
    body > a, body > div > font, body > div > br, input[type=reset] {display: none;}';
}
else if (['', 'index'].indexOf(page) != -1) {
    css += '#hdrflash, #allhdr, #hdrlogo img:nth-of-type(-n+4),\
    #hdrlogo img:nth-last-of-type(1), #hdrlogo a, #ixlist > div > div:nth-of-type(1),\
    #ixleft > div:nth-of-type(7), #ixleft > div:nth-of-type(8), #ixleft > div:nth-of-type(15),\
    #ixleft > div:nth-of-type(16), #ixleft > div:nth-of-type(17), #ixright > div:nth-last-of-type(1),\
    #ixright > div:nth-last-of-type(2), #ixright > div:nth-last-of-type(3), #ixright > div:nth-last-of-type(6),\
    #ixright > div:nth-last-of-type(7), #ixright > div:nth-last-of-type(10), #ixright > div:nth-last-of-type(11),\
    #ixmidst > font, #ixmidst > div > font, #ixlist > div:nth-of-type(2), #ixlist > div:nth-of-type(3) {display: none;}\
    #hdrlogo {top: 0; width: auto;}\
    #allini font {color: #000000;}\
    #allini font div, #allini font font, #allini a font, #allini .boxinput font, #ixmidst font, .boxheadsp {color: #FFFFCC;}\
    #ixleft, #ixright, #ixmidst {top: 60px;}';
}

GM_addStyle(css);

// Google search
var search = document.createElement('form');

search.id = 'search';
search.action = 'http://www.google.cz/search';
search.innerHTML = '<input type="text" name="search"><input type="submit" value="Hledat na Zpovědnici">';
search.addEventListener('submit',
    function() {
        var q = document.createElement('input');

        q.name = 'q';
        q.type = 'hidden';
        q.value = 'site:zpovednice.cz ' + this.elements.namedItem('search').value;

        if (this.elements.namedItem('q')) {
            this.removeChild(this.elements.namedItem('q'));
        }

        this.appendChild(q);

        return true;
    },
    false);

document.body.appendChild(search);

// open all links in the current window
for (var i = 0; i < document.links.length; i++) {
    document.links[i].target = '_self';
}

// automatic links to the related pages
if (['detail', 'profil'].indexOf(page) != -1) {
    ['conftext', 'confheader', 'absoltext', 'guesttext'].forEach(
        function(c) {
            var x = document.getElementsByClassName(c);

            for (var i = 0; i < x.length; i++) {
                x[i].innerHTML = x[i].innerHTML.replace(/ (\d{5,7})/g, ' <a href="' + link + '$1">$1</a>');
            }
        }
    );
}

// TODO: zahodit mezery mezi dlouhými odkazy (zamyslet se nad spojováním), automatické přihlášení, pouze nová rozhřešení
