// ==UserScript==
// @name           Starfleet NAP Sorter
// @namespace      http://bergfall.com
// @description    Make the relation list (NAP/War) sortable...at least somewhat
// @include        http://playstarfleetextreme.com/alliances*
// @version        0.001
// ==/UserScript==

(function(){

var scripts = ['http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js','http://tablesorter.com/jquery.tablesorter.min.js'];

for (i in scripts) {
    var script = document.createElement('script');
    script.src = scripts[i];
    document.getElementsByTagName('head')[0].appendChild(script);
}
// Let's just give it a little time to settle....
setTimeout(function(){ 
  jQuery = unsafeWindow['jQuery'];
  jQuery.noConflict();
  if(jQuery('#relations_table'))
  {
  jQuery('#relations_table').prepend(jQuery('<thead></thead>').append(jQuery('#relations_table tr:first').remove()));
  jQuery('#relations_table').tablesorter();
  }
  
}, 1000);
})();