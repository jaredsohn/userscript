// ==UserScript==
// @name        Bypass YouTube age verification
// @id          DelvinFox.Userscript.Bypass-YouTube-age-verification
// @namespace   delvin@userscripts.org
// @description A script that bypasses YouTube age verification without logging in.
// @author      DelvinFox
// @licence     GNU General Public License version 3 or any later version; https://www.gnu.org/licenses/gpl-3.0.html
// @copyright   2011 DelvinFox
// @homepageURL https://userscripts.org/users/117689
// @version     1.5
// @updateURL   https://userscripts.org/scripts/source/94184.meta.js
// @domain      youtube.com
// @domain      www.youtube.com
// @include     http://youtube.com/verify_age*
// @include     http://www.youtube.com/verify_age*
// @include     https://youtube.com/verify_age*
// @include     https://www.youtube.com/verify_age*
// ==/UserScript==

var url = decodeURIComponent( window.location.search.match( /[^?&]*next_url=([^&]*)/ )[1] );
if( url && url.match( /^\/|(https?:\/\/(www\.)?youtube\.com\/)/ ) && document.getElementById( "verify" ) ) {
 GM_xmlhttpRequest({
  method: "GET",
  headers: {
   "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
  },
  url: url,
  onload: function( response ) {
   if ( response.status == 200 ) {
    if( response.finalUrl.match( "/verify_controversy" ) ) {
     window.location.href = url + "&skipcontrinter=1";
    } else {
     document.open( "text/html", "replace" );
     document.write( response.responseText );
     document.close();
    }
   }
  }
 });
} 
