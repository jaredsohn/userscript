// ==UserScript==
// @name           EbayLVConverter2
// @namespace      su.gornostaev
// @description    Convert GBP\USD\EUR\CHF to RUR
// @version        2.7
// @author         Sergey TheDeadOne Gornostaev
// @license        GPL
// @include        http://www.ebay.co.uk/*
// @include        http://www.ebay.com/*
// @include        http://www.ebay.de/*
// @include        http://www.ebay.it/*
// @include        http://www.ebay.ie/*
// @include        http://www.ebay.at/*
// @include        http://*.ebay.be/*
// @include        http://www.ebay.nl/*
// @include        http://www.ebay.ch/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @downloadURL    https://userscripts.org/scripts/source/138757.user.js
// @updateURL      https://userscripts.org/scripts/source/138757.user.js
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  function getCurrency(xmlCurData, valSymbol) {
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
      return strCur.replace(',', '.');    
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
      return strCur.replace(',', '.');
    }
    else if(valSymbol == '€') {
      var strCur;
      $(xmlCurData).find('Valute').each(
        function() {
          var valuteID = $(this).attr('ID');
          if(valuteID == 'R01239') {
            strCur = $(this).find('Value').text();
          }
        }
      );
      return strCur.replace(',', '.');
    }
    else if(valSymbol == '₣') {
      var strCur;
      $(xmlCurData).find('Valute').each(
        function() {
          var valuteID = $(this).attr('ID');
          if(valuteID == 'R01775') {
            strCur = $(this).find('Value').text();
          }
        }
      );
      return strCur.replace(',', '.');
    }
    else {
      return false;
    }
  }

  function changePrices(xmlCurData) {
    $('td.prc.g-b').add('td.prices.g-b').add('td.prc > div').add('td.prices > div').add('div.pd > span.pdbg').add('div.pd > b').each(function () {
      var strPrice = $.trim($(this).html());
      if(strPrice.indexOf(" ") != -1) {
        var strValSymb = strPrice.split(" ")[0];
        if(strValSymb == "EUR") strValSymb = "€";
        if(strValSymb == "CHF") strValSymb = "₣";
        strPrice = strPrice.split(" ")[1].replace(',', '.');
      }
      else {
        var strValSymb = strPrice.substring(0,1);
        strPrice = strPrice.substring(1).replace(',', '');
      }
      var strCur = getCurrency(xmlCurData, strValSymb);
      if(strCur) {
        var strNewPrice = Math.round((parseFloat(strPrice) * parseFloat(strCur)) * 100) / 100;
        $(this).html("RUR " + strNewPrice);
      }
    });
    $('span.fee').add('td.fee').each(function() {
      var strPrice = $.trim($(this).html());
      if(strPrice.indexOf(" ") != -1) {
        var shipTokensArray = strPrice.split(" ");
        if(shipTokensArray[0] == '+') {
          strValSymb = shipTokensArray[1];
          strPrice = shipTokensArray[2].replace(',', '.');
        }
        else {
          strValSymb = shipTokensArray[0].substring(1);
          strPrice = shipTokensArray[1].replace(',', '.');
        }
        if(strValSymb == "EUR") strValSymb = "€";
        if(strValSymb == "CHF") strValSymb = "₣";
      }
      else {
        var strValSymb = strPrice.substring(1,2);
        strPrice = strPrice.substring(2).replace(',', '');
      }
      var strCur = getCurrency(xmlCurData, strValSymb);
      if(strCur) {
        var strNewPrice = Math.round((parseFloat(strPrice) * parseFloat(strCur)) * 100) / 100;
        $(this).html("+" + strNewPrice);
      }
    });
    $('td.prc > span.ship').add('td.prc > span.ship > span.fee').each(function() {
      var strPrice = $.trim($(this).html());
      if(strPrice.indexOf('Free') == -1) {
        if(strPrice.indexOf(" ") != -1) {
          var shipTokensArray = strPrice.split(" ");
          if(shipTokensArray[0] == '+') {
            strValSymb = shipTokensArray[1].substring(0,1);
            strPrice = shipTokensArray[1].substring(1).replace(',', '.');
          }
          else {
            strValSymb = shipTokensArray[0].substring(1,2);
            strPrice = shipTokensArray[0].substring(2).replace(',', '.');
          }
          if(strValSymb == "EUR") strValSymb = "€";
          if(strValSymb == "CHF") strValSymb = "₣";
        }
        else {
          var strValSymb = strPrice.substring(1,2);
          strPrice = strPrice.substring(2).replace(',', '');
        }
        var strCur = getCurrency(xmlCurData, strValSymb);
        if(strCur) {
          var strNewPrice = Math.round((parseFloat(strPrice) * parseFloat(strCur)) * 100) / 100;
          $(this).html("+" + strNewPrice);
        }
      }
    });
  }

  $.get(
    "http://gornostaev.su/api/getCurrency/cbr/",
    function(data) {
      changePrices(data);
    }
  );
}

addJQuery(main);