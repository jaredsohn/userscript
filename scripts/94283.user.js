// ==UserScript==
// @name           Bypass YouTube age verification
// @description    This script bypasses YouTube age verification without an Account.
// @author         Delvin
// @licence        GNU General Public License version 3 or any later version; http://www.gnu.org/licenses/gpl-3.0.html
// @copyright      2010 Delvin
// @homepage       http://userscripts.org/users/117689
// @include        http://youtube.com/verify_age*
// @include        http://www.youtube.com/verify_age*
// @include        https://youtube.com/verify_age*
// @include        https://www.youtube.com/verify_age*
// ==/UserScript==

if ( document.getElementById( "verify-age" ) ) {
GM_xmlhttpRequest({
method: "GET",
headers: {
"User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
},
url: decodeURIComponent( window.location.search.match( /[^?&]*next_url=([^&]*)/ )[1] ),
onload: function( response ) {
if ( response.status == 200 ) {
document.open( "text/html", "replace" );
document.write( response.responseText );
document.close();

var ow = unsafeWindow.document.write;
unsafeWindow.document.write = function( data ) {
if ( data.search( "id=\"movie_player\"" ) != "-1" ) { // sanity check
document.addEventListener( "DOMContentLoaded", function() {
document.getElementById( "watch-player" ).innerHTML += data;
if ( unsafeWindow.document.write != ow ) {
unsafeWindow.document.write = ow;
}
}, false );
} else {
document.addEventListener( "DOMContentLoaded", function() {
if ( unsafeWindow.document.write != ow ) {
unsafeWindow.document.write = ow;
}
}, false );
}
};

}
}
});
}