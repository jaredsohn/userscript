// ==UserScript==
// @name           OgamePlanetDef
// @namespace      Ogame
// @include        http://*.ogame.ru/game/index.php?page=buildings&*
// ==/UserScript==
var form = document.getElementsByTagName( 'form' )[ 0 ];
var As = form.getElementsByTagName( 'a' );

var resources = document.getElementById( 'resources' ).getElementsByTagName( 'tr' )[ 2 ];
var metall = parseInt( resources.getElementsByTagName( 'td' )[ 0 ].firstChild.textContent.replace( /\./g, "" ) );
var crystall = parseInt( resources.getElementsByTagName( 'td' )[ 1 ].firstChild.textContent.replace( /\./g, "" ) );
var deitery = parseInt( resources.getElementsByTagName( 'td' )[ 2 ].firstChild.textContent.replace( /\./g, "" ) );

function getCnt( a ) {
    var cnt = a.nextSibling.nodeValue.match( /([0-9.]+)\)$/ )[ 1 ].replace( "." , "" );

    return cnt;
}

var plasma_cnt = 0;
for ( var i = 0, len = As.length; i < len; i++ ) {
    if ( As[ i ].textContent == 'Плазменное орудие' ) {
        plasma_cnt = getCnt( As[ i ] );
    }
}

for ( var i = 0, len = As.length; i < len; i++ ) {
//    var cnt = getCnt( As[ i ] );
    var needed = null;

    switch ( As[ i ].textContent ) {
        case 'Плазменное орудие' :
            var needed = parseInt( ( metall + crystall + deitery ) / 100000 ) * 3;
        break;
        case 'Пушка Гаусса' :
            var needed = plasma_cnt / 3 * 5;
        break;
        case 'Тяжёлый лазер' :
            var needed = plasma_cnt / 3 * 18;
        break;
        case 'Лёгкий лазер' :
            var needed = plasma_cnt / 3 * 42;
        break;
    }

    if ( needed ) { 
        var cnt = getCnt( As[ i ] );
        As[ i ].nextSibling.nodeValue = ' (в наличии ' + cnt + ' / ' + needed + ')';
    }
}