// ==UserScript==
// @name        Cookie Clicker Helper
// @namespace   SteenScripts
// @description "Helpful" things for the Cookie Clicker...
// @include     http://orteil.dashnet.org/cookieclicker/*
// @version     0.3.83
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @grant       GM_addStyle
// ==/UserScript==
// modified: 2013-09-30 20:30
var cch = {
  initialize: function() {
    GM_addStyle('span.cheapest { border: 2px solid #FF0000 }');
    GM_addStyle('span.bestROI { border: 2px solid #00FF00 }');
    GM_addStyle('span.cch_version { font-size: smaller }');
    setInterval(cch.markBuildings, 2000);
  },
  markBuildings: function() {
    var cheapestPrice = Number.POSITIVE_INFINITY;
    var cheapestBuilding;
    var bestROI = Number.POSITIVE_INFINITY;
    var bestBuilding;
    $('div.product').each(function() {
      var price = parseInt($(this).find('span.price').html().replace(/,/g,''));
      if(price < cheapestPrice) {
        cheapestPrice = price;
        cheapestBuilding = this;
      }
      var productID = this.id.substr(7);
      var productInfo = $('div#rowInfoContent' + productID);
      if(productInfo.length) {
        var productSummary = productInfo.html().match(/\d+(?:,\d+)*(?:\.\d)?/g);
        if(productSummary && productSummary.length > 1) {
          var perProduct = parseFloat(productSummary[1].replace(/,/g,''))/parseInt(productSummary[0].replace(/,/g,''));
          var ROI = price/perProduct;
          if(ROI < bestROI) {
            bestROI = ROI;
            bestBuilding = this;
          }
        }
      }
    });
    $(cheapestBuilding).find('div.title').not('.owned').not(':has("span.cheapest")').wrapInner('<span class="cheapest"></span>');
    if(!$(bestBuilding).find('span.bestROI').length) {
      $('span.bestROI').contents().unwrap();
      $(bestBuilding).find('div.title').not('.owned').wrapInner('<span class="bestROI"></span>');
    }
  }
};
$(document).ready(function() {
  var initInterval = setInterval(function() {
    var $vers = $('div#versionNumber');
    if($vers.length > 0) {
      $vers.append(' <span class="cch_version">(cch v.' + GM_info.script.version + '; jq v.' + $.fn.jquery + ')</span>');
      clearInterval(initInterval);
      cch.initialize();
    }
  }, 1000);
});
