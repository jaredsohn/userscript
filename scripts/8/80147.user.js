// ==UserScript==
// @name           ShopToNetLVConverter
// @namespace      su.gornostaev
// @description    Convert EUR to RUR
// @version        0.1
// @author         Sergey TheDeadOne Gornostaev
// @license        BSD
// @include        http://*.shopto.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js
// @require        http://gornostaev.su/libs/js/gmxhr.js
// ==/UserScript==

String.prototype.trim = function() {
  return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"");
}

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
  if(valSymbol == '€') {
    var strCur;
    $(xmlCurData).find('Valute').each(
      function() {
        var valuteID = $(this).attr('ID');
        if(valuteID == 'R01239') {
          strCur = $(this).find('Value').text();
        }
      }
    );
    return strCur;    
  }
  else if(valSymbol == '£') {
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
  $('p.pricepadded').add('p.price').each(function () {
      var strPrice = $(this).text().trim();
      var strValSymb = strPrice[strPrice.length - 1];
      strPrice = strPrice.substring(0, strPrice.length - 1);
      var strCur = getCurrency(strValSymb);
      if(strCur) {
        var strNewPrice = Math.round((parseFloat(strPrice) * parseFloat(strCur)) * 100) / 100;
        $(this).html("RUR " + strNewPrice);
      }
  });
  $('p.rrp').add('p.saving').add('p.sellto').add('p.was').each(function () {
      var strText = $(this).text().trim();
      if(strText.indexOf(':')) {
        var strPrice = strText.split(':')[1].trim();
        var strValSymb = strPrice[strPrice.length - 1];
        strPrice = strPrice.substring(0, strPrice.length - 1);
        var strCur = getCurrency(strValSymb);
        if(strCur) {
          var strNewPrice = Math.round((parseFloat(strPrice) * parseFloat(strCur)) * 100) / 100;
          strText = strText.split(':')[0].trim();
          $(this).html(strText + ": RUR " + strNewPrice);
        }
      }
  });
  $('p.title').each(function () {
      var strText = $(this).text().trim();
      var strPrice;
      if(strText.indexOf(' ')) {
        strPrice = strText.split(' ')[0].trim();
      }
      else {
        strPrice = strText;
      }
      var strValSymb = strPrice[strPrice.length - 1];
      strPrice = strPrice.substring(0, strPrice.length - 1);
      var strCur = getCurrency(strValSymb);
      if(strCur) {
        var strNewPrice = Math.round((parseFloat(strPrice) * parseFloat(strCur)) * 100) / 100;
        $(this).html("RUR " + strNewPrice);
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
