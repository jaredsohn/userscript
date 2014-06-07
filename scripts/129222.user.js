// ==UserScript==
// @name       TornGain
// @namespace  http://xaph.info/
// @version    0.2.1
// @description  Torn City is a text based crime RPG. TornGain is an userscript that gives your total gain from the stocks. If you don't know what is Torn you're welcome: http://www.torn.com/1579896
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @match      http://*.torn.com/*
// @copyright  2012+, xaph
// ==/UserScript==

$.fn.digits = function(){ 
  return this.each(function(){ 
    $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
  })
}
$(document).ready(function() {
  $('<li id="nav-portfolio"><a id="nav-portfolio" class="button" href="/stockexchange.php?step=portfolio" title="Stock Portfolio">Stock Portfolio</a></li>').insertAfter('#nav-awards');
  if($(location).attr('pathname') == "/stockexchange.php" && $(location).attr('search') == "?step=portfolio") {
    portfolioTable = $("table:last");
    tableBody = portfolioTable.children();
    tableRows = tableBody.children();
    totalPositive = 0;
    totalNegative = 0;
    i = 0;
    while (i<tableRows.size()) {
      gain = tableRows.eq(2+i).children().eq(3).text().replace("$", "");
      quantity = tableRows.eq(3+i).children().eq(1).text().replace("Shares: ", "");
      quantity = quantity.replace(/,/g, "");

      totalGain = quantity*gain;
      if(totalGain>0) {
          totalPositive += totalGain;
          tableRows.eq(3+i).children().eq(0).append("<br>$<span class='gain' style='color: green'>("+Math.round(totalGain)+")</span>");
      } else {
          totalNegative += totalGain;
          tableRows.eq(3+i).children().eq(0).append("<br>$<span class='gain' style='color: red'>("+Math.round(totalGain)+")</span>");
      }
      i = i+7;
    }
    nvcolor = totalPositive >= totalNegative*-1 ? 'green' : 'red';
    tableBody.prepend("<tr><td>Net Value:</td><td>$<span class='gain' style='color: "+nvcolor+"'>"+Math.round((totalPositive+totalNegative))+
                      "</span></td><td>Earned:</td><td>$<span class='gain' style='color: green'>"+Math.round(totalPositive)+
                      "</span></td><td>Lost:</td><td>$<span class='gain' style='color: red'>"+Math.round(totalNegative)+"</span></td></tr>");
    $(".gain").digits();
  }
});
