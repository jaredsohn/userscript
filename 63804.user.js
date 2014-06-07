// ==UserScript==
// @name           NewEgg: Censor Products From Fucked Companies
// @namespace      http://userscripts.org/users/121260
// @include        http://www.newegg.com/Product/ProductList.aspx?*
// ==/UserScript==

// http://joanpiedra.com/jquery/greasemonkey/
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
  else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
  $('div#bodyCenterArea form table.comboCell tr').each(function(){
    var tr = this; var prod = 0;
    $(tr).find('td.midCol h3 a').each(function(){
      if ($(this).text().indexOf('Microsoft ') >= 0) prod= 1; // Fuck Microsoft!
      if ($(this).text().indexOf('Rosewill ') >= 0) prod = 1; // http://stephenfung.net/rosewill-and-newegg-ridin-a-little-dirty
      // Does anyone know of any other Fucked Companies not to buy from that have products available on NewEgg?
      if (prod == 1) {
        $(this).parent().parent().parent().hide();
	$(this).parent().parent().parent().next('tr').hide();
	$(this).parent().parent().parent().next('tr').next('tr').hide();
      }
    });
  });
}