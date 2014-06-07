// ==UserScript==
// @name       Geiger Edelmetalle - Wertverlust bei Kauf
// @namespace  https://www.geiger-edelmetalle.de/edelmetalle.php
// @version    0.1
// @description  add loss information to geiger-edelmetalle.de
// @match      https://www.geiger-edelmetalle.de/edelmetalle.php*
// @copyright  2012+, Jonas Brekle
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
var rows = $('#warentabelle tbody tr:nth-of-type(3n-2)');
rows.each(function(){
  var row = $(this);
  var grossValue = parseFloat(row.children().eq(4).children().first().text().trim().replace('.', '').replace(',', '.').replace(' ', ''));
  var rebuyRow = row.next().next();
  var rebuyValue = parseFloat(rebuyRow.text().trim().replace('.', '').replace(',', '.').replace(' ', ''));
  var lossPercent = 100 - ( rebuyValue * 100 / grossValue);
    rebuyRow.children().eq(1).append($('<div class="tax">Verlust: '+lossPercent.toFixed(2).replace('.', ',')+'%</div>'))
});