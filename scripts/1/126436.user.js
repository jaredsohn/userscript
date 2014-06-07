// ==UserScript==
// @name           index-hojko
// @namespace      hojko
// @include        http://www.hojko.com/
// @version    1.0
// @description  for hojko.com
// @copyright  2012+, Aiden
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$(document).ready(function() {
   
    var i = 0;
   
    $('tr').each(function() {
        $(this).attr('id', 'trow_'+ ++i);
        if((i >= 18 && i<=23) || (i >= 32 && i<=38) ){
          $(this).hide();
          $('#trow_'+i+' td').each(function() {
              j = (i >= 32 && i<=38) ? 7 : 6;
              $('#trow_'+(i-j)).append(this);
          });
        }
    });
           
    $('#trow_11 th').each(function() {
            $(this).clone().appendTo('#trow_11');
    });
   
    $('#trow_24 th').each(function() {
            $(this).clone().appendTo('#trow_24');
    });
   
    $('#trow_11 th:first-child').attr('width','500px');
    $('#trow_24 th:first-child').attr('width','500px');
   
});