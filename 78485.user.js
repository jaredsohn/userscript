// ==UserScript==
// @name           EbayLVConverter
// @namespace      su.gornostaev
// @description    Convert GBP\USD to RUR
// @version        1.4
// @author         Sergey TheDeadOne Gornostaev
// @license        BSD
// @include        http://www.ebay.co.uk/*
// @include        http://www.ebay.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js
// @require        http://gornostaev.su/libs/js/gmxhr.js
// ==/UserScript==

$.ajaxSetup({
  xhr: function(){return new GM_XHR;}
});

var xmlCurData;
var retryCount = 0;
var strReqDate = $.datepicker.formatDate('dd/mm/yyyy', new Date());

$.get(
  "http://www.cbr.ru/scripts/XML_daily.asp?date_req=" + strReqDate,
  function(data) {
    xmlCurData = data;
  }
);

window.setTimeout(asyncStub, 1000);

function getCurrency(valSymbol) {
  if(valSymbol == '£') {
    var strCur;
    $(xmlCurData).find('Valute').each(
      function() {
        var valuteID = $(this).attr('ID');
        if(valuteID == 'R01035') {
          strCur = $(this).find('Value').text();
        }
      }
    );
    return strCur;    
  }
  else if(valSymbol == '$') {
    var strCur;
    $(xmlCurData).find('Valute').each(
      function() {
        var valuteID = $(this).attr('ID');
        if(valuteID == 'R01235') {
          strCur = $(this).find('Value').text();
        }
      }
    );
    return strCur;
  }
  else {
    return false;
  }
}

function changePrices() {
  $('td.prc.g-b').add('td.prices.g-b').add('td.prc > div').add('td.prices > div').each(function () {
      var strPrice = $(this).html();
      var strValSymb = strPrice.substring(0,1);
      strPrice = strPrice.substring(1).replace(',', '');
      var strCur = getCurrency(strValSymb);
      if(strCur) {
        var strNewPrice = Math.round((parseFloat(strPrice) * parseFloat(strCur)) * 100) / 100;
        $(this).html("RUR " + strNewPrice);
      }
  });
  $('td.ship > span.ukf > span.fee').each(function() {
      var strPrice = $.trim($(this).html());
      var strValSymb = strPrice.substring(1,2);
      strPrice = strPrice.substring(2).replace(',', '');
      var strCur = getCurrency(strValSymb);
      if(strCur) {
        var strNewPrice = Math.round((parseFloat(strPrice) * parseFloat(strCur)) * 100) / 100;
        $(this).html("+" + strNewPrice);
      }
  });
}

function asyncStub() {
  if(xmlCurData) {
    changePrices();
  }
  else {
    if(retryCount < 3) {
      retryCount++;
      window.setTimeout(asyncStub, 1000);
    }
  }
}
