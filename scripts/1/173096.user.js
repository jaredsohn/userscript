// ==UserScript==
// @name        Dota 2 Lounge Percentage Hide
// @namespace   Kaevne
// @description Hide percentages
// @include     http://dota2lounge.com/
// @include     http://*.dota2lounge.com/
// @grant       none
// @version     1.1
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

$('div.match:not(.notaviable)').find('.teamtext i').css( "background-color", "#252525" ).hover(function () {
    $(this).css( "background-color", "" );
  }, 
  function () {
    $(this).css( "background-color", "#252525" );
  }
);