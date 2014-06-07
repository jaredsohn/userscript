// ==UserScript==
// @name           Virtonomica: расчет производства
// @namespace      yatul
// @description    Цена за единицу качества + влияние на качество конечного продукта http://virtonomica.ru/olga/main/unit/view/4692831/manufacture
// @include        http://virtonomic*.*/*/main/unit/view/*/manufacture
// @version        0.2
// ==/UserScript==






var run = function() {

    var requiredCountIndex = 3;
	var priceIndex = 8;
	var qualityIndex = 7;
    
    var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
    $ = win.$;
    
    var totalPrice = 0;
    var totalRequired = 0;
    var medianQulityTotal = 0;
 
    $("form[name='materialRequiredStorageData'] td").closest("tr").each(function() {
      
        var cels = $('td', this);
        var price = parseFloat($(cels[priceIndex]).text().replace(/ /g, ''));
        var qual = parseFloat($(cels[qualityIndex]).text().replace(/ /g, ''));
        var requiredCount = parseFloat($(cels[requiredCountIndex]).text().replace(/ /g, ''));

        if (isNaN(price) || isNaN(qual)) { return; }

        var qp = (price / qual).toFixed(2);
        
        totalRequired += requiredCount;
        medianQulityTotal += qual * requiredCount;
        
        var productPrice = requiredCount*price;
        totalPrice += productPrice;
        $(cels[requiredCountIndex]).html(requiredCount + '<br/><span style="color: #aaa" >(' + (productPrice).toFixed(2) + '$)</span> ');
         
    });
    
   
    
    $("form[name='materialRequiredStorageData'] td").closest("tr").each(function() {
      
        var cels = $('td', this);
        var price = parseFloat($(cels[priceIndex]).text().replace(/ /g, ''));
        var qual = parseFloat($(cels[qualityIndex]).text().replace(/ /g, ''));
        var requiredCount = parseFloat($(cels[requiredCountIndex]).text().replace(/ /g, ''));

        if (isNaN(price) || isNaN(qual)) { return; }

        var qp = (price / qual).toFixed(2);
        
        var productPrice = requiredCount*price;
        
        $(cels[priceIndex]).html(price + '<br /><span style="color: #aaa">' + Math.round(productPrice/totalPrice*100) + '%</span> ');
        $(cels[qualityIndex]).html(qual + '<br /><span style="color: #aaa">' + Math.round(qual*requiredCount/medianQulityTotal*100) + '%</span> ');
         
    });
    
    
 

}

// Хак, что бы получить полноценный доступ к DOM
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);


/*
 * 
 * Константы
 * 
 */


var maxQualityFromTechLevel=[
    0
    ,1
    ,2.46
,4.17
,6.06
,8.1
,10.27
,12.55
,14.93
,17.4
,19.95
,22.58
,25.29
,28.06
,30.90
,33.80
,36.76
,39.77
,42.84
,45.96
,49.13
,52.35
,55.61
,58.92
,62.27
,65.66
,69.10
,72.57
,76.09
,79.64
];